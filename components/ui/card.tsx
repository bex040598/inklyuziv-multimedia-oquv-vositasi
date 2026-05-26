import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type CardProps = PropsWithChildren<{
  className?: string;
}>;

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/90 p-6 shadow-[0_18px_55px_rgba(23,46,66,0.08)] backdrop-blur-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
