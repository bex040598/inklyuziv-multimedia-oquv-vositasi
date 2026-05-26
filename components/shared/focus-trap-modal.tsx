"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

type FocusTrapModalProps = {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: React.ReactNode;
  side?: "center" | "right";
  className?: string;
};

export function FocusTrapModal({
  open,
  title,
  description,
  onClose,
  children,
  side = "center",
  className
}: FocusTrapModalProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open || !panelRef.current) {
      return;
    }

    const focusables = panelRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    first?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !first || !last) {
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex bg-slate-900/45 backdrop-blur-sm"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="focus-trap-title"
        aria-describedby={description ? "focus-trap-description" : undefined}
        className={cn(
          "relative flex max-h-screen w-full flex-col overflow-hidden border border-white/10 bg-[var(--surface)] text-[var(--text)] shadow-2xl",
          side === "right"
            ? "ml-auto h-screen max-w-xl rounded-none rounded-l-[2rem]"
            : "m-auto max-w-3xl rounded-[2rem]",
          className
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] px-6 py-5">
          <div className="space-y-2">
            <h2 id="focus-trap-title" className="text-2xl font-semibold">
              {title}
            </h2>
            {description ? (
              <p id="focus-trap-description" className="text-base leading-7 text-[var(--muted)]">
                {description}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--border)] bg-white/80"
          >
            <span className="sr-only">Yopish</span>
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
