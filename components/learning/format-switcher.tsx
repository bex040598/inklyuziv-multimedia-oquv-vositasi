"use client";

import { cn } from "@/lib/utils";

export type LessonFormat =
  | "text"
  | "easy"
  | "audio"
  | "video"
  | "visual"
  | "quiz";

type FormatSwitcherProps = {
  value: LessonFormat;
  onChange: (value: LessonFormat) => void;
  options?: Array<{ value: LessonFormat; label: string }>;
};

const defaultOptions: Array<{ value: LessonFormat; label: string }> = [
  { value: "text", label: "Matn" },
  { value: "easy", label: "Oson matn" },
  { value: "audio", label: "Audio" },
  { value: "video", label: "Video" },
  { value: "visual", label: "Rasmli izoh" },
  { value: "quiz", label: "Test" }
];

export function FormatSwitcher({
  value,
  onChange,
  options = defaultOptions
}: FormatSwitcherProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "min-h-11 rounded-full border px-4 py-2 text-sm font-semibold",
            option.value === value
              ? "border-[var(--accent)] bg-[var(--accent)] text-white"
              : "border-[var(--border)] bg-white text-[var(--text)]"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
