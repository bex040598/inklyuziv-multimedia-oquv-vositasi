import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "ghost" | "danger" | "soft";
    fullWidth?: boolean;
  }
>;

export function Button({
  children,
  className,
  variant = "primary",
  fullWidth = false,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-full border px-5 py-3 text-base font-semibold transition-transform",
        variant === "primary" &&
          "border-[var(--accent)] bg-[var(--accent)] text-white shadow-[0_10px_25px_rgba(27,100,135,0.18)] hover:-translate-y-0.5",
        variant === "secondary" &&
          "border-[var(--border)] bg-white text-[var(--text)] hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]",
        variant === "ghost" &&
          "border-transparent bg-transparent text-[var(--text)] hover:border-[var(--border)] hover:bg-white/80",
        variant === "danger" && "border-[var(--danger)] bg-[var(--danger)] text-white",
        variant === "soft" && "border-[var(--border)] bg-[var(--accent-soft)] text-[var(--text)]",
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
