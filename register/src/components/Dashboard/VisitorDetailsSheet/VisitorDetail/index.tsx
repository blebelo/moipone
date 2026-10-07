const VisitorDetail: React.FC<Readonly<{ label: string; value?: string | number | null }>> = ({ label, value }) => (
  <div className="flex items-baseline justify-between gap-4 py-2.5">
    <dt className="shrink-0 text-sm text-muted-foreground">{label}</dt>
    <dd className="text-right text-sm font-medium">{value || "—"}</dd>
  </div>
);

export default VisitorDetail;