"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, LogOut, Search } from "lucide-react";
import { VisitReason } from "@/lib/common/data";
import { PAGE_SIZE } from "@/lib/common/constants";
import type { CheckOutFormProps, ListedVisit } from "@/lib/common/constants";
import { formatCheckInTime, getErrorMessage } from "@/lib/common/helper-methods";


const getReasonLabel = (reason?: number): string | undefined =>
  Object.values(VisitReason).find((option) => option.value === reason)?.label;

const CheckOutForm = ({ open, registerState, visitorState, visitState, checkOutVisitor, onOpenChange }: CheckOutFormProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const activeRegisterId = registerState.attendanceRegister?.id;
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    search: "",
    registerId: activeRegisterId,
  });
  const [checkingOutId, setCheckingOutId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const pending = visitorState.isPending || visitState.isPending;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog || dialog.open) return;

    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, [open]);

  const visitorsById = new Map(
    (visitorState.visitors ?? []).map((visitor) => [visitor.id, visitor]),
  );
  const checkedInVisits: ListedVisit[] = (visitState.visits ?? [])
    .filter(
      (visit) =>
        visit.attendanceRegisterId === activeRegisterId && !visit.checkOutDate,
    )
    .map((visit) => {
      const visitor = visit.visitor ?? visitorsById.get(visit.visitorId);
      const name =
        [visitor?.name, visitor?.surname]
          .filter((part): part is string => Boolean(part?.trim()))
          .join(" ") || "Unknown visitor";
      const searchText = [
        name,
        visitor?.emailAddress,
        visitor?.contactNumber,
      ]
        .filter((value): value is string => Boolean(value?.trim()))
        .join(" ")
        .toLowerCase();

      return { visit, name, searchText };
    });
  const normalizedSearch = search.trim().toLowerCase();
  const filteredVisits = checkedInVisits.filter(({ searchText }) =>
    searchText.includes(normalizedSearch),
  );
  const totalPages = Math.max(1, Math.ceil(filteredVisits.length / PAGE_SIZE));
  const page =
    pagination.search === search && pagination.registerId === activeRegisterId
      ? pagination.page
      : 1;
  const safePage = Math.min(page, totalPages);
  const visibleVisits = filteredVisits.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const changePage = (nextPage: number) => {
    setPagination({
      page: nextPage,
      search,
      registerId: activeRegisterId,
    });
  };

  const handleCheckOut = async (visitId?: string) => {
    if (!visitId) return;
    setCheckingOutId(visitId);
    setError("");
    try {
      await checkOutVisitor(visitId);
    } catch (cause) {
      setError(getErrorMessage(cause, "We could not complete check-out. Please try again."));
    } finally {
      setCheckingOutId(null);
    }
  };

  const closeForm = () => {
    setSearch("");
    setPagination({ page: 1, search: "", registerId: activeRegisterId });
    setError("");
    onOpenChange(false);
  };

  let emptyMessage = "There are no visitors currently checked in.";
  if (search.trim()) emptyMessage = "No checked-in visitors match your search.";
  if (visitState.isError || visitorState.isError) {
    emptyMessage = "We could not load the checked-in visitors. Please close and try again.";
  }

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      onCancel={(event) => {
        event.preventDefault();
        if (checkingOutId === null) closeForm();
      }}
      aria-labelledby="check-out-form-title"
      className="m-0 flex h-dvh w-dvw max-w-none items-center justify-center border-0 bg-black/80 p-3 backdrop-blur-md sm:p-6"
    >
      <section className="relative mx-auto flex max-h-full w-full max-w-xl flex-col overflow-hidden rounded-lg border border-border bg-background shadow-lg">
        <header className="border-b border-border bg-background px-5 py-4 sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="check-out-form-title" className="font-display text-xl font-semibold leading-tight text-foreground">Check out</h2>
              <p className="mt-1 max-w-lg font-body text-sm text-muted-foreground">
                Find your name in the list of visitors currently checked in, then tap Check Out.
              </p>
            </div>
            <button type="button" onClick={closeForm} disabled={checkingOutId !== null} aria-label="Close check-out" className="grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50">
              <span className="material-symbols-outlined" aria-hidden="true">close</span>
            </button>
          </div>
        </header>

        <div className="border-b border-border px-5 py-3 sm:px-6">
          <label className="relative block">
            <Search aria-hidden="true" className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <span className="sr-only">Search visitors</span>
            <input type="search" value={search} onChange={(event) => {
              const nextSearch = event.target.value;
              setSearch(nextSearch);
              setPagination({ page: 1, search: nextSearch, registerId: activeRegisterId });
            }} placeholder="Search your name, email or phone..." className="h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20" />
          </label>
        </div>

        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-background px-5 py-4 sm:px-6">
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          {pending && (
            <output aria-label="Loading checked-in visitors" className="flex justify-center py-8 text-primary">
              <Loader2 aria-hidden="true" className="size-6 animate-spin" />
            </output>
          )}
          {!pending && filteredVisits.length > 0 && (
            visibleVisits.map(({ visit, name }) => {
              const visitId = visit.id;
              const rowPending = checkingOutId === visitId;
              const reason = getReasonLabel(visit.visitReason);
              return (
                <article key={visitId ?? `${visit.visitorId}-${visit.checkinDate}`} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 py-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-medium text-foreground">{name}</h3>
                    <p className="mt-1 truncate text-sm text-muted-foreground">
                      {formatCheckInTime(visit.checkinDate)}{reason ? ` · ${reason}` : ""}
                    </p>
                  </div>
                  <button type="button" onClick={() => void handleCheckOut(visitId)} disabled={!visitId || checkingOutId !== null} className="inline-flex h-9 shrink-0 items-center gap-2 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-60">
                    {rowPending ? <Loader2 aria-hidden="true" className="size-4 animate-spin" /> : <LogOut aria-hidden="true" className="size-4" />}
                    Check Out
                  </button>
                </article>
              );
            })
          )}
          {!pending && filteredVisits.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              {emptyMessage}
            </p>
          )}

          {!pending && filteredVisits.length > PAGE_SIZE && (
            <div className="flex items-center justify-between gap-3 border-t border-border pt-3 text-sm text-muted-foreground">
              <button type="button" onClick={() => changePage(Math.max(1, safePage - 1))} disabled={safePage === 1} className="rounded-md border border-input bg-background px-2.5 py-1.5 font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50">
                Previous
              </button>
              <span>
                Page {safePage} of {totalPages}
              </span>
              <button type="button" onClick={() => changePage(Math.min(totalPages, safePage + 1))} disabled={safePage === totalPages} className="rounded-md border border-input bg-background px-2.5 py-1.5 font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50">
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </dialog>
  );
};

export default CheckOutForm;