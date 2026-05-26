"use client";

import { Check } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { AccessibilityState } from "@/types";

type AccessibilityPresetCardProps = {
  title: string;
  description: string;
  active?: boolean;
  onApply: () => void;
  preview: Partial<AccessibilityState>;
};

export function AccessibilityPresetCard({
  title,
  description,
  active,
  onApply,
  preview
}: AccessibilityPresetCardProps) {
  return (
    <button type="button" onClick={onApply} className="text-left">
      <Card
        className={cn(
          "min-h-44 space-y-4 transition-transform hover:-translate-y-0.5",
          active && "border-[var(--accent)] bg-[var(--accent-soft)]"
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-base leading-7 text-[var(--muted)]">{description}</p>
          </div>
          {active ? (
            <span className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-full bg-[var(--accent)] text-white">
              <Check className="h-5 w-5" />
            </span>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(preview).map(([key, value]) => (
            <span
              key={key}
              className="rounded-full border border-[var(--border)] bg-white/70 px-3 py-2 text-sm"
            >
              {key}: {String(value)}
            </span>
          ))}
        </div>
      </Card>
    </button>
  );
}
