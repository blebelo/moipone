
const ActionButton: React.FC<Readonly<{children: React.ReactNode;variant?: "outline" | "destructive" | "ghost"; onClick: () => void; className?: string; disabled?: boolean;
}>> = ({ children, variant = "outline",  onClick, className = "", disabled = false, }) => {
  const styles = {
    outline: "border bg-background text-foreground hover:bg-muted",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
  };
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex h-9 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default ActionButton;
