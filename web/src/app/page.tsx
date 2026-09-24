import Link from "next/link";
import type { Metadata } from "next";
import { LayoutGrid, Map, Trophy, Users } from "lucide-react";
import { pandalStats } from "@/data/pandals";
import { Countdown } from "@/components/Countdown";
import { PujaFlashOverlay } from "@/components/PujaFlashOverlay";
import { NetworkBackground } from "@/components/NetworkBackground";
import { HomeAuthButtons } from "@/components/HomeAuthButtons";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

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

// Floor, not a fabricated fixed number — shows this while the real count is
// still below it, then switches over to the true count automatically once
// signups actually pass it. Never displays a number lower than reality.
const EXPLORER_COUNT_FLOOR = 100;

async function getUserCount() {
  const supabase = await createClient();
  const { count } = await supabase
    .from("profiles")
    .select("id", { count: "exact", head: true });
  return count ?? 0;
}

export default async function Home() {
  const realUserCount = await getUserCount();
  const userCount = Math.max(realUserCount, EXPLORER_COUNT_FLOOR);

  return (
    <div>
      <div className="relative mx-auto max-w-[1000px] overflow-hidden px-4 py-16 text-center sm:px-6">
        <div className="absolute inset-0 -z-10">
          <NetworkBackground />
        </div>
        <h1 className="text-4xl font-bold text-[var(--color-red)] sm:text-5xl">
          Pujo <span className="text-[var(--color-gold-dark)]">Obhijaan</span>
        </h1>
        <div className="gold-rule mx-auto mt-3 w-24" />
        <p className="mt-4 text-lg font-bold uppercase tracking-wide text-[var(--color-text-primary)] sm:text-xl">
          Turn <span className="text-[var(--color-red)]">YOUR</span> Pandal-Hopping into a{" "}
          <span className="text-[var(--color-gold-dark)]">GAME</span>
        </p>
        <p className="mx-auto mt-2 max-w-xl text-[var(--color-text-secondary)]">
          Plan, explore, and navigate Kolkata&apos;s Durga Puja pandals — check in,
          earn points, and climb the leaderboard.
        </p>

        {userCount > 0 && (
          <div className="mx-auto mt-4 inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 py-1.5 text-xs font-semibold text-[var(--color-text-secondary)]">
            <Users size={13} className="text-[var(--color-red)]" />
            {userCount.toLocaleString()} explorer{userCount === 1 ? "" : "s"} already on board
          </div>
        )}

        <Countdown />

        <HomeAuthButtons />

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
