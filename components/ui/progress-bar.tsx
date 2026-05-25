type ProgressBarProps = {
  value: number;
  label?: string;
};

export function ProgressBar({ value, label }: ProgressBarProps) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div className="space-y-2">
      {label ? (
        <div className="flex items-center justify-between text-sm">
          <span>{label}</span>
          <span className="font-semibold">{safeValue}%</span>
        </div>
      ) : null}
      <div
        className="h-3 w-full overflow-hidden rounded-full bg-accentSoft"
        role="progressbar"
        aria-valuenow={safeValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-accent transition-all"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}
