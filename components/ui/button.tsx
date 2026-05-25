import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "ghost" | "danger";
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
        "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold",
        "border border-transparent shadow-sm",
        variant === "primary" && "bg-accent text-white hover:-translate-y-0.5 hover:shadow-lg",
        variant === "secondary" &&
          "border-border bg-accentSoft text-text hover:border-accent hover:bg-white",
        variant === "ghost" && "border-border bg-transparent text-text hover:bg-white/70",
        variant === "danger" && "bg-danger text-white hover:opacity-90",
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
