import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "text";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-red)] text-white hover:bg-[var(--color-red-dark)] disabled:opacity-50",
  secondary:
    "bg-transparent border-2 border-[var(--color-red)] text-[var(--color-red)] hover:bg-[var(--color-red)]/5",
  text: "bg-transparent text-[var(--color-red)] hover:underline px-0",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "rounded-lg font-semibold transition-all duration-300 ease-in-out cursor-pointer",
        variant !== "text" && sizeStyles[size],
        variantStyles[variant],
        "hover:scale-[1.02] active:scale-[0.99]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
