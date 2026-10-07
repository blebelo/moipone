"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ClipboardList, FileText, Loader2, LogOut, 
  LockKeyhole, RefreshCw, UnlockKeyhole, UserCheck, Users,
} from "lucide-react";
import CheckoutDialog from "@/components/Dashboard/CheckoutDialog";
import StatusBadge from "@/components/Dashboard/StatusBadge";
import SummaryCard from "@/components/Dashboard/SummaryCard";
import { formatRegisterDate, formatTime, getErrorMessage, labelFor } from "@/lib/common/helper-methods";
import { VisitReason } from "@/lib/common/data";
import { useAuthActions, useAuthState } from "@/providers/AuthProvider";
import { useAttendanceRegisterActions, useAttendanceRegisterState } from "@/providers/AttendanceRegisterProvider";
import { useVisitActions, useVisitState } from "@/providers/VisitProvider";
import { useVisitorState } from "@/providers/VisitorProvider";
import { AttendanceEntry } from "@/lib/common/constants";
import ActionButton from "@/components/ActionButton";
import ErrorBanner from "@/components/Dashboard/ErrorBanner";


const Dashboard: React.FC = () => {
  const authState = useAuthState();
  const { logout } = useAuthActions();
  const attendanceState = useAttendanceRegisterState();
  const attendanceActions = useAttendanceRegisterActions();
  const visitState = useVisitState();
  const visitActions = useVisitActions();
  const visitorState = useVisitorState();
  const [checkoutTarget, setCheckoutTarget] = useState<AttendanceEntry | null>(null);
  const [checkOutError, setCheckOutError] = useState<string>();
  const [actionError, setActionError] = useState<string>();
  const [checkedOutLocally, setCheckedOutLocally] = useState<Set<string>>(() => new Set());

  const visitorsById = useMemo(
    () => new Map((visitorState.visitors ?? []).filter((visitor) => visitor.id).map((visitor) => [visitor.id!, visitor])),
    [visitorState.visitors],
  );

  const entries = useMemo(
    () => (attendanceState.attendanceRegister?.visits ?? []).map((visit) => ({
      visit,
      visitor: visit.visitor ?? visitorsById.get(visit.visitorId),
    })),
    [attendanceState.attendanceRegister?.visits, visitorsById],
  );

  const checkedInEntries = entries.filter(
    ({ visit }) => !visit.checkOutDate && !(visit.id && checkedOutLocally.has(visit.id)),
  );
  const checkedOutCount = entries.length - checkedInEntries.length;


  const refreshAttendance = useCallback(async () => {
    try {
      await attendanceActions.getToday();
    } catch {
      return;
    }
  }, [attendanceActions]);

  const refreshAnalytics = async () => {
    try {
      await visitActions.getAll();
    } catch (cause) {
      throw new Error(getErrorMessage(cause, "Unable to load analytics data."));
    }
  };

  useEffect(() => {
    void refreshAttendance();
  }, [refreshAttendance]);

  const openCheckout = (entry: AttendanceEntry) => {
    setCheckOutError(undefined);
    setCheckoutTarget(entry);
  };

  const confirmCheckout = async () => {
    const visitId = checkoutTarget?.visit.id;
    if (!visitId) return;
    setCheckOutError(undefined);
    try {
      await visitActions.checkOut(visitId);
      setCheckedOutLocally((current) => new Set(current).add(visitId));
      setCheckOutError(undefined);
      setCheckoutTarget(null);
      void refreshAttendance();
      void refreshAnalytics();
    } catch (cause) {
      setCheckOutError(getErrorMessage(cause, "Check out failed. Please try again."));
    }
  };


  const changeRegisterStatus = async () => {
    const register = attendanceState.attendanceRegister;
    if (!register?.id) return;
    setActionError(undefined);
    try {
      if (register.isClosed) await attendanceActions.reopen(register.id);
      else await attendanceActions.close(register.id);
    } catch (cause) {
      setActionError(getErrorMessage(cause, "Unable to update the register. Please try again."));
    }
  };

  return (
    <div className="min-h-dvh bg-background">
      <header className="bg-sidebar text-sidebar-foreground">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Image
              src="/moipone-logo.png"
              alt="Moipone Academy"
              width={598}
              height={302}
              priority
              className="h-10 w-auto rounded-sm bg-white px-1 object-contain"
            />
            <div className="hidden border-l border-sidebar-border pl-3 sm:block">
              <p className="text-sm font-semibold">Attendance</p>
              <p className="text-xs text-sidebar-foreground/70">Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden text-sm text-sidebar-foreground/80 sm:inline" aria-label="Signed in as">
              {authState.currentUser?.userName || "Staff"}
            </span>
            <button
              type="button"
              onClick={logout}
              disabled={authState.isPending}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent disabled:opacity-60"
            >
              {authState.isPending ? <Loader2 aria-hidden="true" className="size-4 animate-spin" /> : <LogOut aria-hidden="true" className="size-4" />}
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {actionError && <ErrorBanner header="Action failed" message={actionError} />}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-extrabold tracking-tight">Today&apos;s Attendance</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {formatRegisterDate(attendanceState.attendanceRegister?.date)}
              {attendanceState.attendanceRegister?.isClosed && " · Register closed"}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <ActionButton
              variant={attendanceState.attendanceRegister?.isClosed ? "outline" : "destructive"}
              onClick={() => void changeRegisterStatus()}
              disabled={attendanceState.isPending}
            >
              {attendanceState.isPending 
                ? <Loader2 aria-hidden="true" className="size-4 animate-spin" /> 
                : attendanceState.attendanceRegister?.isClosed ? <UnlockKeyhole aria-hidden="true" className="size-4" /> : <LockKeyhole aria-hidden="true" className="size-4" />}
              {attendanceState.attendanceRegister?.isClosed ? "Reopen register" : "Close register"}
            </ActionButton>

            <button
              type="button"
              disabled
              title="Weekly report generation is not connected yet."
              className="inline-flex h-9 cursor-not-allowed items-center justify-center gap-2 rounded-md border bg-muted/50 px-3 text-sm font-medium text-muted-foreground opacity-70"
            >
              <FileText aria-hidden="true" className="size-4" />
              Generate Report
            </button>

            <ActionButton
              onClick={async () => {
                await refreshAttendance();
              }}
              className="h-9"
            >
              <RefreshCw aria-hidden="true" className={`size-4 ${attendanceState.isPending ? "animate-spin" : ""}`} />
              Refresh
            </ActionButton>
          </div>
        </div>

        {attendanceState.isError ? (
          <ErrorBanner header="Could not load today&apos;s register" message="An error occurred, please contact admin" retry={() => void refreshAttendance()} />
        ) : (
          <>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <SummaryCard label="Currently checked in" value={checkedInEntries.length} hint="Visitors on site right now" icon={UserCheck} loading={attendanceState.isPending} />
              <SummaryCard label="Total visits today" value={entries.length} hint="All visits on today’s register" icon={ClipboardList} loading={attendanceState.isPending} />
              <SummaryCard label="Checked out" value={checkedOutCount} hint="Visits completed today" icon={Users} loading={attendanceState.isPending} />
            </div>

            <section className="mt-8" aria-labelledby="checked-in-heading">
              <h2 id="checked-in-heading" className="label-caps">Currently checked in</h2>
              {attendanceState.isPending && (
                <div className="mt-3 space-y-3" aria-label="Loading attendance">
                  <div className="h-12 animate-pulse rounded-md bg-muted" />
                  <div className="h-12 animate-pulse rounded-md bg-muted" />
                  <div className="h-12 animate-pulse rounded-md bg-muted" />
                </div>
              )}
                <div className="mt-3 hidden overflow-x-auto rounded-lg border bg-card md:block">
                  <table className="w-full min-w-212.5 text-left text-sm">
                    <thead className="bg-muted/60 text-xs text-muted-foreground">
                      <tr>
                        <th scope="col" className="px-4 py-3 font-semibold">Visitor</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Visit reason</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Check-in time</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Status</th>
                        <th scope="col" className="px-4 py-3 text-right font-semibold"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {checkedInEntries.map((entry) => (
                        <tr key={entry.visit.id} className="hover:bg-muted/30">
                          <td className="px-4 py-3 font-medium">{` ${entry.visitor?.name} ${entry.visitor?.surname}`}</td>
                          <td className="px-4 py-3">{entry.visit.visitReason === VisitReason.Other.value ? entry.visit.otherReason || "—" : labelFor(VisitReason, entry.visit.visitReason) ?? "—"}</td>
                          <td className="px-4 py-3 tabular-nums">{formatTime(entry.visit.checkinDate)}</td>
                          <td className="px-4 py-3"><StatusBadge checkedIn /></td>
                          <td className="px-4 py-3">
                              <ActionButton
                                variant="destructive"
                                onClick={() => openCheckout(entry)}
                                className={!entry.visit.id ? "cursor-not-allowed opacity-50" : ""}
                              >
                                <LogOut aria-hidden="true" className="size-4" />Check Out
                              </ActionButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>  
                  {!attendanceState.isPending && checkedInEntries.length === 0 && (
                    <div className="mt-3 rounded-lg  bg-card px-6 py-12 text-center">
                      <Users aria-hidden="true" className="mx-auto size-8 text-muted-foreground" />
                      <p className="mt-3 font-display text-base font-semibold">No visitors currently checked in</p>
                      <p className="mt-1 text-sm text-muted-foreground">Visitors who check in will appear here.</p>
                    </div>
                  )}
                </div>

                <div className="mt-3 space-y-3 md:hidden">
                  {checkedInEntries.map((entry) => (
                    <article key={entry.visit.id} className="rounded-lg border bg-card p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate font-display text-base font-bold">{`${entry.visitor?.name} ${entry.visitor?.surname}`}</p>
                          <p className="mt-0.5 text-sm tabular-nums text-muted-foreground">
                            Checked in at {formatTime(entry.visit.checkinDate)}
                          </p>
                        </div>
                        <StatusBadge checkedIn />
                      </div>
                      <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
                        <div className="min-w-0">
                          <dt className="text-xs text-muted-foreground">Visit reason</dt>
                          <dd className="mt-0.5 wrap-break-word font-medium">{entry.visit.visitReason === VisitReason.Other.value ? entry.visit.otherReason || "—" : labelFor(VisitReason, entry.visit.visitReason) ?? "—"}</dd>
                        </div>
                        <div>
                          <dt className="text-xs text-muted-foreground">Ward</dt>
                          <dd className="mt-0.5 font-medium">{entry.visitor?.wardNumber ?? "—"}</dd>
                        </div>
                      </dl>
                      <div className="mt-4 flex gap-2">
                        <ActionButton variant="destructive" onClick={() => openCheckout(entry)} className="flex-1">
                          <LogOut aria-hidden="true" className="size-4" />Check Out
                        </ActionButton>
                      </div>
                    </article>
                  ))}
                </div>
            </section>

            {/* <AnalyticsSection
              visits={visitState.visits ?? []}
              visitors={visitorState.visitors ?? []}
              loading={analyticsLoading}
              error={analyticsError}
              onRetry={() => void refreshAnalytics()}
            /> */}
          </>
        )}
      </main>

      {/* <VisitorDetailsSheet entry={detailsEntry} onOpenChange={(open) => !open && setDetailsEntry(null)} /> */}

      <CheckoutDialog
        visitorName={checkoutTarget ? `${checkoutTarget.visitor?.name} ${checkoutTarget.visitor?.surname}` : null}
        loading={visitState.isPending}
        error={checkOutError}
        onConfirm={() => void confirmCheckout()}
        onOpenChange={(open) => !open && setCheckoutTarget(null)}
      />
    </div>
  );
};

export default Dashboard;