import { clamp } from "@/lib/utils";

type ProgressBarProps = {
  value: number;
  label?: string;
  hint?: string;
};

export function ProgressBar({ value, label, hint }: ProgressBarProps) {
  const safeValue = clamp(value, 0, 100);

  return (
    <div className="space-y-2">
      {label ? (
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="font-medium">{label}</span>
          <span className="font-semibold">{safeValue}%</span>
        </div>
      ) : null}
      <div
        className="h-3 overflow-hidden rounded-full bg-[var(--accent-soft)]"
        role="progressbar"
        aria-valuenow={safeValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent),#6cc39d)]"
          style={{ width: `${safeValue}%` }}
        />
      </div>
      {hint ? <p className="text-sm leading-6 text-[var(--muted)]">{hint}</p> : null}
    </div>
  );
}
