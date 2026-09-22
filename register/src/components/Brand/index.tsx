import { mergeClasses } from "@/lib/common/helper-methods";


const Brand : React.FC = ({className,tone = "default",subtitle,}: {
  className?: string; tone?: "default" | "inverted"; subtitle?: string;
}) =>  {
  return (
    <div className={mergeClasses("flex min-w-0 items-center gap-3", className)}>
      <span
        aria-hidden="true"
        className={mergeClasses(
          "grid size-10 shrink-0 place-items-center rounded-md font-display text-base font-extrabold",
          tone === "inverted"
            ? "bg-sidebar-primary text-sidebar-primary-foreground"
            : "bg-primary text-primary-foreground",
        )}
      >
        M
      </span>

      <span className="min-w-0">
        <span
          className={mergeClasses(
            "block truncate font-display text-base font-extrabold tracking-tight",
            tone === "inverted"
              ? "text-sidebar-foreground"
              : "text-foreground",
          )}
        >
          Moipone
        </span>

        <span
          className={mergeClasses(
            "block truncate text-xs",
            tone === "inverted"
              ? "text-sidebar-foreground/70"
              : "text-muted-foreground",
          )}
        >
          {subtitle ?? "Attendance"}
        </span>
      </span>
    </div>
  );
}
export default Brand