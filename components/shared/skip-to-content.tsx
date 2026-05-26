"use client";

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-[var(--accent)] focus:px-5 focus:py-3 focus:text-white"
    >
      Asosiy mazmunga o‘tish
    </a>
  );
}
