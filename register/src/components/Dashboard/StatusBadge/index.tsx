const StatusBadge: React.FC<Readonly<{ checkedIn: boolean }>> = ({ checkedIn }) => {
  return (
    <span
      className={
        checkedIn
          ? "inline-flex items-center gap-1.5 rounded-full bg-success-soft px-2.5 py-1 text-xs font-semibold text-success"
          : "inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground"
      }
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {checkedIn ? "On site" : "Checked out"}
    </span>
  );
}

export default StatusBadge;