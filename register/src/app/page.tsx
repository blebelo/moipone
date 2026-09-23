"use client"
import Brand from "@/components/Brand";
import CheckInForm from "@/components/CheckInForm";
import { getTodaysDate } from "@/lib/common/helper-methods";
import { useAttendanceRegisterActions, useAttendanceRegisterState } from "@/providers/AttendanceRegisterProvider";
import { ICreateVisitDto, IVisit } from "@/providers/VisitProvider/context";
import { useVisitActions, useVisitState } from "@/providers/VisitProvider";
import { useVisitorActions, useVisitorState } from "@/providers/VisitorProvider";
import { CalendarDays, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function HomePage() {
  const router = useRouter();
  const registerState = useAttendanceRegisterState();
  const registerActions = useAttendanceRegisterActions();
  const visitActions = useVisitActions();
  const visitState = useVisitState();
  const visitorActions = useVisitorActions();
  const visitorState = useVisitorState();
  const [checkInOpen, setCheckInOpen] = useState(false);
  const registerUnavailable =
    registerState.isPending ||
    !registerState.attendanceRegister ||
    registerState.attendanceRegister.isClosed;
  useEffect(() => {
    void registerActions.getToday().catch(() => undefined);
  }, [registerActions]);

  const checkInVisitor = async (payload: ICreateVisitDto) => {
    const attendanceRegister = registerState.attendanceRegister;
    const attendanceRegisterId = attendanceRegister?.id;

    if (!attendanceRegister || !attendanceRegisterId) {
      throw new Error("Today's attendance register is not available.");
    }

    if (attendanceRegister.isClosed) {
      throw new Error("Today's attendance register is closed.");
    }

    const normalizedPayload: ICreateVisitDto = {
      ...payload,
      attendanceRegisterId,
    };

    if (payload.visitor.id) {
      const existingUserPayload : IVisit = {
          visitReason: normalizedPayload.visitReason,
          otherReason: normalizedPayload.otherReason,
          visitorId: payload.visitor.id,
          attendanceRegisterId,
      }  
      await visitActions.checkIn(existingUserPayload)
      return;
    }
    const visitor = { ...normalizedPayload.visitor };
    delete visitor.id;
    await visitActions.create({ ...normalizedPayload, visitor });

  };

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Brand />

        <button
          type="button"
          onClick={() => router.push("/admin/login")}
          className="inline-flex h-8 items-center justify-center rounded-md px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Staff sign in
        </button>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-xl text-center">
          <p className="label-caps">{getTodaysDate()}</p>

          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Welcome — check in
          </h1>

          <p className="mx-auto mt-4 max-w-md text-base text-muted-foreground sm:text-lg">
            Welcome to Moipone. Let us know you&apos;ve arrived by checking in
            below — it takes about a minute and no account is needed.
          </p>

          <div className="mt-8">
            <button
              type="button"
              onClick={() => setCheckInOpen(true)}
              disabled={registerUnavailable}
              className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-md bg-primary px-8 text-base font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              <LogIn aria-hidden="true" className="size-5" />
              Check In
            </button>
          </div>

          <p
            className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground"
            aria-live="polite"
          >
            <CalendarDays aria-hidden="true" className="size-4" />

          {registerState.isPending ? (
            <span className="h-4 w-44 animate-pulse rounded-md bg-muted" aria-label="Checking today&apos;s register" />
          ) : registerState.attendanceRegister?.isClosed ? (
            <span className="text-sm text-muted-foreground">Register closed</span>
          ) : registerState.attendanceRegister ? (
            <span className="text-sm text-muted-foreground">Register open</span>
          ) : (
            <span className="text-sm text-muted-foreground">Register being prepared</span>
          )}
          </p>
        </div>
      </main>

      <footer className="border-t bg-card py-4">
        <p className="text-center text-xs text-muted-foreground">
          Moipone Attendance · Visitors never need an account
        </p>
      </footer>

      <CheckInForm
        open={checkInOpen}
        onOpenChange={setCheckInOpen}
        checkInVisitor={checkInVisitor}
        lookupVisitor={visitorActions.lookup}
        visitorState={visitorState}
        visitState={visitState}
      />

    </div>
  );
}
 