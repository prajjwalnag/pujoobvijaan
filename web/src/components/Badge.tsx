import clsx from "clsx";

type BadgeVariant = "theme" | "high" | "medium" | "low" | "neutral";

const variantStyles: Record<BadgeVariant, string> = {
  theme: "bg-[var(--color-status-theme)] text-[var(--color-text-primary)]",
  high: "bg-[var(--color-status-high)] text-white",
  medium: "bg-[var(--color-status-medium)] text-white",
  low: "bg-[var(--color-status-low)] text-white",
  neutral: "bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]",
};

export function Badge({
  variant = "neutral",
  children,
  size = "sm",
}: {
  variant?: BadgeVariant;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  const sizeStyles = {
    sm: "text-xs px-2 py-1",
    md: "text-[13px] px-3 py-1.5",
    lg: "text-sm px-4 py-2",
  }[size];

  return (
    <span
      className={clsx(
        "inline-block rounded font-medium",
        variantStyles[variant],
        sizeStyles
      )}
    >
      {children}
    </span>
  );
}

export function crowdVariant(level: "high" | "medium" | "low"): BadgeVariant {
  return level;
}
