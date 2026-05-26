"use client";

import { keyboardShortcuts } from "@/lib/constants";
import { FocusTrapModal } from "@/components/shared/focus-trap-modal";

type KeyboardShortcutsHelpProps = {
  open: boolean;
  onClose: () => void;
};

export function KeyboardShortcutsHelp({ open, onClose }: KeyboardShortcutsHelpProps) {
  return (
    <FocusTrapModal
      open={open}
      onClose={onClose}
      title="Klaviatura yordami"
      description="Agar sichqoncha noqulay bo‘lsa, shu qisqa yo‘llar sahifada tezroq yurishga yordam beradi."
    >
      <div className="space-y-4">
        {keyboardShortcuts.map((item) => (
          <div
            key={item.keys}
            className="flex flex-col gap-2 rounded-[1.5rem] border border-[var(--border)] bg-white/70 p-4 md:flex-row md:items-center md:justify-between"
          >
            <kbd className="inline-flex w-fit rounded-full bg-[var(--accent-soft)] px-3 py-2 text-sm font-semibold text-[var(--text)]">
              {item.keys}
            </kbd>
            <p className="text-base leading-7 text-[var(--muted)]">{item.action}</p>
          </div>
        ))}
      </div>
    </FocusTrapModal>
  );
}
