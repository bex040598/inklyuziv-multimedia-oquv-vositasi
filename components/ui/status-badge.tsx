import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  tone?: "neutral" | "success" | "warning" | "danger";
  children: React.ReactNode;
};

export function StatusBadge({ tone = "neutral", children }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
        tone === "neutral" && "bg-white/80 text-text",
        tone === "success" && "bg-green-100 text-green-800",
        tone === "warning" && "bg-amber-100 text-amber-800",
        tone === "danger" && "bg-rose-100 text-rose-800"
      )}
    >
      {children}
    </span>
  );
}
