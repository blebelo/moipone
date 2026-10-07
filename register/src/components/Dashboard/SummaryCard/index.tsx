import type { LucideIcon } from "lucide-react";

const SummaryCard: React.FC<Readonly<{
  label: string;
  value: number;
  hint: string;
  icon: LucideIcon;
  loading?: boolean;
}>> = ({
  label,
  value,
  hint,
  icon: Icon,
  loading = false,
}) => {
  return (
    <article className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <p className="label-caps">{label}</p>
        <Icon aria-hidden="true" className="size-4 shrink-0 text-primary" />
      </div>
      {loading ? (
        <div className="mt-3 h-8 w-16 animate-pulse rounded bg-muted" />
      ) : (
        <p className="mt-2 font-display text-2xl font-extrabold tabular-nums">{value}</p>
      )}
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </article>
  );
}

export default SummaryCard;