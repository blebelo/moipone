import { AlertCircle } from "lucide-react";

const ErrorBanner: React.FC<Readonly<{ header: string; message: string; retry?: () => void }>> = ({ header, message, retry }) => {
  return (
    <div role="alert" className="mt-6 flex items-start gap-3 rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
      <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      <div className="min-w-0">
        <p className="font-semibold">{header}</p>
        <p className="mt-1">{message}</p>
        {retry && 
            <button type="button" onClick={retry} className="mt-2 underline underline-offset-2">Try again</button>
        }
      </div>
    </div>
  );
}

export default ErrorBanner;