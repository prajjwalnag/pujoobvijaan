import type { LucideIcon } from "lucide-react";
import { Button } from "./Button";

export function AuthGate({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-bg-tertiary)] text-[var(--color-red)]">
        <Icon size={28} />
      </div>
      <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">{title}</h2>
      <p className="text-[var(--color-text-secondary)]">{description}</p>
      <Button>Sign In</Button>
    </div>
  );
}
