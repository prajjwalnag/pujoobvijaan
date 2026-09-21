import { Users } from "lucide-react";

const CONTRIBUTORS = [
  "Goutam Saha",
  "Dhruba",
  "Arpan Ghosh",
  "Soham Ghosh",
  "Rajdeep Chakroborty",
];

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function ContributionsPage() {
  return (
    <div className="mx-auto max-w-[700px] px-4 py-10 sm:px-6">
      <div className="flex items-center gap-2">
        <Users className="text-[var(--color-red)]" size={28} />
        <h1 className="text-[32px] font-bold text-[var(--color-text-primary)]">Contributions</h1>
      </div>
      <p className="mt-1 text-[var(--color-text-secondary)]">
        The people who&apos;ve built and shaped Pujo Obhijaan — ideas, features, and everything
        in between.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {CONTRIBUTORS.map((name) => (
          <div
            key={name}
            className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-3"
          >
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-red)] text-sm font-bold text-white">
              {initials(name)}
            </span>
            <p className="font-semibold text-[var(--color-text-primary)]">{name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
