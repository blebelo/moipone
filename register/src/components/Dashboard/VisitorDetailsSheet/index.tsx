"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";

import { ResidenceType, SexType, SexualityType, VisitReason } from "@/lib/common/data";
import { formatDate, formatTime, labelFor } from "@/lib/common/helper-methods";
import type { IVisit } from "@/providers/VisitProvider/context";
import type { IVisitor } from "@/providers/VisitorProvider/context";
import StatusBadge from "@/components/Dashboard/StatusBadge";
import VisitorDetail from "./VisitorDetail";

const VisitorDetailsSheet: React.FC<Readonly<{
  entry: { visit: IVisit; visitor?: IVisitor } | null;
  onOpenChange: (open: boolean) => void;
}>> = ({
  entry,
  onOpenChange,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const visitor = entry?.visitor;
  const visit = entry?.visit;
  const reason = visit?.visitReason === VisitReason.Other.value && visit.otherReason
    ? `Other — ${visit.otherReason}`
    : labelFor(VisitReason, visit?.visitReason);
  const address = visitor?.visitorAddress
    ? [
        visitor.visitorAddress.street,
        visitor.visitorAddress.suburb,
        visitor.visitorAddress.city,
        visitor.visitorAddress.postalCode,
      ].filter(Boolean).join(", ")
    : "";

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (entry && !dialog.open) dialog.showModal();
    if (!entry && dialog.open) dialog.close();
  }, [entry]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="visitor-details-title"
      onClose={() => onOpenChange(false)}
      className="m-0 ml-auto h-dvh max-h-none w-full max-w-md border-l bg-card p-0 text-card-foreground shadow-xl backdrop:bg-foreground/40"
    >
      <div className="flex h-full flex-col overflow-y-auto">
        <header className="flex items-start justify-between gap-4 border-b px-5 py-4">
          <div className="min-w-0">
            <h2 id="visitor-details-title" className="truncate font-display text-lg font-bold">
              {[visitor?.name, visitor?.surname].filter(Boolean).join(" ") || "Visitor details"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">Visitor and visit details</p>
          </div>
          <button
            type="button"
            aria-label="Close visitor details"
            onClick={() => onOpenChange(false)}
            className="grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </header>

        {entry && visit && (
          <div className="space-y-5 px-5 py-5">
            <section>
              <h3 className="label-caps">Visit</h3>
              <div className="mt-2"><StatusBadge checkedIn={!visit.checkOutDate} /></div>
              <dl className="mt-2 divide-y">
                <VisitorDetail label="Reason" value={reason} />
                <VisitorDetail label="Check-in time" value={formatTime(visit.checkinDate)} />
                <VisitorDetail label="Check-out time" value={formatTime(visit.checkOutDate)} />
              </dl>
            </section>
            <div className="h-px bg-border" aria-hidden="true" />
            <section>
              <h3 className="label-caps">Visitor</h3>
              <dl className="mt-2 divide-y">
                <VisitorDetail label="Name" value={[visitor?.name, visitor?.surname].filter(Boolean).join(" ")} />
                <VisitorDetail label="Contact number" value={visitor?.contactNumber} />
                <VisitorDetail label="Email address" value={visitor?.emailAddress} />
                <VisitorDetail label="Ward number" value={visitor?.wardNumber} />
                <VisitorDetail label="Residence" value={labelFor(ResidenceType, visitor?.residence)} />
                <VisitorDetail label="Sex" value={labelFor(SexType, visitor?.sex)} />
                <VisitorDetail label="Sexuality" value={labelFor(SexualityType, visitor?.sexuality)} />
                <VisitorDetail label="Date of birth" value={formatDate(visitor?.dateOfBirth)} />
                <VisitorDetail label="CSG" value={visitor?.isCsg ? "Yes" : "No"} />
              </dl>
            </section>
            {address && (
              <>
                <div className="h-px bg-border" aria-hidden="true" />
                <section>
                  <h3 className="label-caps">Address</h3>
                  <p className="mt-2 text-sm">{address}</p>
                </section>
              </>
            )}
          </div>
        )}
      </div>
    </dialog>
  );
};

export default VisitorDetailsSheet;