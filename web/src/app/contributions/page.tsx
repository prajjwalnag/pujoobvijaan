import { Users } from "lucide-react";

const CONTRIBUTORS = [
  "Goutam Saha",
  "Dhruba",
  "Arpan Ghosh",
  "Soham Ghosh",
  "Rajdeep Chakroborty",
  "Ananya Sen",
  "Bikram Dutta",
  "Ishaan Roy",
  "Meghna Basu",
  "Nabarun Pal",
  "Oindrila Chatterjee",
  "Pritam Halder",
  "Ruchira Mukherjee",
  "Suvam Biswas",
  "Tanvir Ahmed",
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
    <div className="py-10">
      <div className="mx-auto max-w-[700px] px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <Users className="text-[var(--color-red)]" size={28} />
          <h1 className="text-[32px] font-bold text-[var(--color-text-primary)]">Contributions</h1>
        </div>
        <p className="mt-1 text-[var(--color-text-secondary)]">
          The people who&apos;ve built and shaped Pujo Obhijaan — ideas, features, and everything
          in between.
        </p>
      </div>

      <div className="mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="contrib-ticker-track flex w-max gap-3">
          {[...CONTRIBUTORS, ...CONTRIBUTORS].map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex flex-shrink-0 items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)] py-2 pl-2 pr-4"
            >
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-red)] text-xs font-bold text-white">
                {initials(name)}
              </span>
              <p className="whitespace-nowrap text-sm font-semibold text-[var(--color-text-primary)]">
                {name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-[700px] px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
    </div>
  );
}
