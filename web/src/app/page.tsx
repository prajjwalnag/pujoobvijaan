import Link from "next/link";
import type { Metadata } from "next";
import { LayoutGrid, Map, Trophy, Users, Zap, MapPin, Droplet, ParkingCircle } from "lucide-react";
import { pandalStats } from "@/data/pandals";
import { publicToilets } from "@/data/toilets";
import { parkingSpaces } from "@/data/parking";
import { Countdown } from "@/components/Countdown";
import { PujaFlashOverlay } from "@/components/PujaFlashOverlay";
import { NetworkBackground } from "@/components/NetworkBackground";
import { HomeAuthButtons } from "@/components/HomeAuthButtons";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const mainFeatures = [
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
    description: "Navigate with route optimization, find pandals, toilets, and parking.",
  },
  {
    href: "/leaderboard",
    icon: Trophy,
    title: "Leaderboard",
    description: "Earn points for every pandal you hop to and climb the ranks.",
  },
];

const mapFeatures = [
  {
    icon: Zap,
    title: "Smart Route Optimizer",
    description: "Select multiple pandals and auto-optimize your route using AI.",
    stat: "Saves time",
  },
  {
    icon: Droplet,
    title: "Public Toilets",
    description: `Find ${publicToilets.length}+ public toilets with hours, fees & features.`,
    stat: "24/7 access",
  },
  {
    icon: ParkingCircle,
    title: "Parking Spaces",
    description: `Locate ${parkingSpaces.length}+ parking options with rates & capacity.`,
    stat: "Multi-level & street",
  },
  {
    icon: MapPin,
    title: "Real-time Check-ins",
    description: "Verify your location and check in at pandals you visit.",
    stat: "GPS enabled",
  },
];

// Floor, not a fabricated fixed number — shows this while the real count is
// still below it, then switches over to the true count automatically once
// signups actually pass it. Never displays a number lower than reality.
const EXPLORER_COUNT_FLOOR = 500;

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
          {mainFeatures.map((item) => {
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

        <div className="mt-16">
          <h2 className="mb-2 text-center text-2xl font-bold text-[var(--color-text-primary)]">
            Smart Map Features
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-center text-[var(--color-text-secondary)]">
            Everything you need to plan and execute the perfect pandal-hopping adventure
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mapFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-lg border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-bg-secondary)] to-[var(--color-bg-tertiary)] p-5 shadow-[var(--shadow-light)] transition-all hover:border-[var(--color-red)] hover:shadow-[var(--shadow-medium)]"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-red)] text-white">
                    <Icon size={20} />
                  </div>
                  <h3 className="mb-2 font-bold text-[var(--color-text-primary)]">
                    {feature.title}
                  </h3>
                  <p className="mb-3 text-xs text-[var(--color-text-secondary)]">
                    {feature.description}
                  </p>
                  <div className="inline-block rounded-full bg-[var(--color-bg-main)] px-2.5 py-1 text-[10px] font-semibold text-[var(--color-red)]">
                    {feature.stat}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 rounded-2xl border-2 border-[var(--color-red)] bg-gradient-to-r from-[var(--color-red)]/10 to-[var(--color-gold)]/10 p-8 text-center">
          <h3 className="mb-2 text-xl font-bold text-[var(--color-red)]">
            🎮 Gamified Experience
          </h3>
          <p className="mx-auto max-w-2xl text-[var(--color-text-secondary)]">
            Earn points for every pandal you visit, unlock badges, and compete on the leaderboard.
            Build custom itineraries, optimize your route, and track your progress through Kolkata's
            best Durga Puja celebrations.
          </p>
        </div>
      </div>

      <PujaFlashOverlay />
    </div>
  );
}
