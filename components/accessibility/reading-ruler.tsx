"use client";

import { useEffect, useState } from "react";

import { useAccessibility } from "@/components/providers/accessibility-provider";

export function ReadingRuler() {
  const { settings } = useAccessibility();
  const [position, setPosition] = useState(220);

  useEffect(() => {
    if (!settings.readingRuler) {
      return;
    }

    const handleMove = (event: MouseEvent) => {
      setPosition(event.clientY);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [settings.readingRuler]);

  if (!settings.readingRuler) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 z-40 hidden md:block"
      style={{ top: Math.max(90, position - 32) }}
    >
      <div className="h-16 border-y border-[rgba(14,103,117,0.35)] bg-[rgba(255,241,173,0.16)] shadow-[0_0_0_100vh_rgba(8,20,24,0.08)]" />
    </div>
  );
}
