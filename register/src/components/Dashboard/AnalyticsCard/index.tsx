import { AnalyticsBreakdownItem } from "@/lib/utils/analytics";

const AnalyticsCard: React.FC<Readonly<{ title: string; rows: AnalyticsBreakdownItem[] }>> = ({ title, rows }) => {
  const total = rows.reduce((sum, row) => sum + row.value, 0) || 1;
  return (
    <article className="rounded-lg border bg-card p-4">
      <h3 className="font-display text-sm font-bold">{title}</h3>
      {rows.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">No data yet.</p>
      ) : (
        <ul className="mt-3 space-y-3">
          {rows.map((row) => (
            <li key={row.name}>
              <div className="flex justify-between gap-3 text-sm">
                <span className="truncate">{row.name}</span>
                <span className="shrink-0 tabular-nums text-muted-foreground">{row.value}</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${Math.round((row.value / total) * 100)}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default AnalyticsCard;