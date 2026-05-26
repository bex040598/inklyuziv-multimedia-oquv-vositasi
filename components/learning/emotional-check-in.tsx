"use client";

import { useState } from "react";

import { emotionalStateOptions } from "@/lib/constants";
import { Card } from "@/components/ui/card";

type EmotionalCheckInProps = {
  value?: string | null;
  onSubmit: (value: string) => Promise<void> | void;
};

export function EmotionalCheckIn({ value, onSubmit }: EmotionalCheckInProps) {
  const [selected, setSelected] = useState(value ?? "");
  const [saved, setSaved] = useState(false);

  return (
    <Card className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          Ixtiyoriy check-in
        </p>
        <h3 className="text-xl font-semibold">Bugun o‘zingizni qanday his qilyapsiz?</h3>
        <p className="text-base leading-7 text-[var(--muted)]">
          Bu baho emas. Faqat darsni sizga moslashtirish uchun ishlatiladi.
        </p>
      </div>
      <div className="grid gap-3">
        {emotionalStateOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={async () => {
              setSelected(option.value);
              setSaved(false);
              await onSubmit(option.value);
              setSaved(true);
            }}
            className={`rounded-[1.5rem] border px-4 py-4 text-left ${
              selected === option.value
                ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                : "border-[var(--border)] bg-white/80"
            }`}
          >
            <span className="block text-base font-semibold">{option.label}</span>
            <span className="mt-1 block text-sm leading-6 text-[var(--muted)]">{option.note}</span>
          </button>
        ))}
      </div>
      {saved ? <p className="text-sm text-[var(--muted)]">Holatingiz saqlandi.</p> : null}
    </Card>
  );
}
