import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  tone?: "neutral" | "success" | "warning" | "danger" | "info";
  children: React.ReactNode;
};

export function StatusBadge({ tone = "neutral", children }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-9 items-center rounded-full border px-3 py-1.5 text-sm font-semibold",
        tone === "neutral" && "border-[var(--border)] bg-white text-[var(--text)]",
        tone === "success" && "border-emerald-200 bg-emerald-50 text-emerald-800",
        tone === "warning" && "border-amber-200 bg-amber-50 text-amber-800",
        tone === "danger" && "border-rose-200 bg-rose-50 text-rose-800",
        tone === "info" && "border-sky-200 bg-sky-50 text-sky-800"
      )}
    >
      {children}
    </span>
  );
}
