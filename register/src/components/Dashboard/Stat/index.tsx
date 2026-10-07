const Stat: React.FC<Readonly<{ label: string; value: string; hint: string }>> = ({ label, value, hint }) => {
  return (
    <article className="rounded-lg border bg-card p-4">
      <p className="label-caps">{label}</p>
      <p className="mt-2 font-display text-2xl font-extrabold tabular-nums">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </article>
  );
}

export default Stat;