import { AlertCircle } from "lucide-react";

const DashboardError: React.FC<Readonly<{ message: string; retry: () => void }>> = ({ message, retry }) => (
  <div role="alert" className="mt-6 flex items-start gap-3 rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
    <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
    <div className="min-w-0">
      <p className="font-semibold">Could not load today&apos;s register</p>
      <p className="mt-1">{message}</p>
      <button type="button" onClick={retry} className="mt-2 underline underline-offset-2">
        Try again
      </button>
    </div>
  </div>
);

export default DashboardError;