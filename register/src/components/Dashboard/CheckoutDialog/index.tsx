"use client";

import { Loader2, X } from "lucide-react";
import { useEffect, useRef } from "react";

const CheckoutDialog: React.FC<Readonly<{
  visitorName: string | null;
  loading: boolean;
  error?: string;
  onConfirm: () => void;
  onOpenChange: (open: boolean) => void;
}>> = ({
  visitorName,
  loading,
  error,
  onConfirm,
  onOpenChange,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (visitorName && !dialog.open) dialog.showModal();
    if (!visitorName && dialog.open) dialog.close();
  }, [visitorName]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="dashboard-checkout-title"
      onClose={() => onOpenChange(false)}
      onCancel={(event) => {
        if (loading) event.preventDefault();
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-lg border bg-card p-0 text-card-foreground shadow-xl backdrop:bg-foreground/40"
    >
      <div className="flex items-start justify-between gap-4 border-b p-5">
        <div>
          <h2 id="dashboard-checkout-title" className="font-display text-lg font-bold">
            Check out visitor
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Confirm that <strong>{visitorName}</strong> is leaving.
          </p>
          {error && <p role="alert" className="mt-2 text-sm text-destructive">{error}</p>}
        </div>
        <button
          type="button"
          aria-label="Close dialog"
          disabled={loading}
          onClick={() => onOpenChange(false)}
          className="grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-50"
        >
          <X aria-hidden="true" className="size-4" />
        </button>
      </div>
      <div className="flex justify-end gap-2 p-5">
        <button
          type="button"
          disabled={loading}
          onClick={() => onOpenChange(false)}
          className="inline-flex h-9 items-center justify-center rounded-md border bg-background px-3 text-sm font-medium hover:bg-muted disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={onConfirm}
          className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-destructive px-3 text-sm font-semibold text-destructive-foreground hover:bg-destructive/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading && <Loader2 aria-hidden="true" className="size-4 animate-spin" />}
          Check out
        </button>
      </div>
    </dialog>
  );
};

export default CheckoutDialog;