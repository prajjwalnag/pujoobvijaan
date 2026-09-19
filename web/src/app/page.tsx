import Link from "next/link";
import { LayoutGrid, Map, Trophy } from "lucide-react";
import { pandalStats } from "@/data/pandals";
import { Countdown } from "@/components/Countdown";
import { PujaFlashOverlay } from "@/components/PujaFlashOverlay";

const highlights = [
  {
    href: "/pandals",
    icon: LayoutGrid,
    title: "Browse Pandals",
    description: `Explore ${pandalStats.total} pandals across Kolkata with region and crowd filters.`,
  },
  {
    href: "/map",
    icon: Map,
    title: "Interactive Map",
    description: "See every pandal on the map and check in as you visit.",
  },
  {
    href: "/leaderboard",
    icon: Trophy,
    title: "Leaderboard",
    description: "Earn points for every pandal you hop to and climb the ranks.",
  },
];

export default function Home() {
  return (
    <div>
      <div className="mx-auto max-w-[1000px] px-4 py-16 text-center sm:px-6">
        <h1 className="text-4xl font-bold text-[var(--color-red)] sm:text-5xl">
          Pujo <span className="text-[var(--color-gold-dark)]">Obhijaan</span>
        </h1>
        <div className="gold-rule mx-auto mt-3 w-24" />
        <p className="mx-auto mt-4 max-w-xl text-[var(--color-text-secondary)]">
          Plan, explore, and navigate Kolkata&apos;s Durga Puja pandals — with a
          leaderboard that turns pandal hopping into a game.
        </p>

        <Countdown />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 text-left shadow-[var(--shadow-light)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-medium)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-bg-tertiary)] text-[var(--color-red)]">
                  <Icon size={22} />
                </div>
                <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
                  {item.title}
                </h2>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {item.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      <PujaFlashOverlay />
    </div>
  );
}
