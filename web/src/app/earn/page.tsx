import Link from "next/link";
import { Coins, MapPin, Star, Compass, CalendarDays, UserPlus } from "lucide-react";
import { ReferralPanel } from "@/components/ReferralPanel";

const WAYS_TO_EARN = [
  {
    icon: Coins,
    title: "Sign up",
    points: "+50",
    description: "One-time bonus the moment you create your account — email or Google, either works.",
  },
  {
    icon: MapPin,
    title: "Check in to a pandal",
    points: "+10–20",
    description:
      "+10 base, plus a hidden-gem bonus: +5 for Medium pandals, +10 for Small ones. Big, famous pandals pay the base only — exploring beyond the obvious ones pays off more.",
  },
  {
    icon: Star,
    title: "Rate a pandal",
    points: "+5",
    description:
      "Flat, once per pandal. Rate Location, Decoration, Crowd, and Food & Vibe all at once — you don't have to check in first.",
  },
  {
    icon: Compass,
    title: "Check in to a new Area",
    points: "+15",
    description:
      "Bonus the first time you check in anywhere within an Area you haven't visited yet — rewards spreading out across the city instead of clustering in one neighbourhood.",
  },
  {
    icon: CalendarDays,
    title: "Build an itinerary",
    points: "+20",
    description: "Flat, per itinerary you create and save — on the map's Route Builder or the Itinerary page.",
  },
  {
    icon: UserPlus,
    title: "Invite a friend",
    points: "+15",
    description:
      "Paid to you the moment someone actually signs up through your personal referral link below — verified against a real new account, not self-reported.",
  },
];

export default function EarnPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-8 sm:px-6">
      <div className="flex items-center gap-2">
        <Coins className="text-[var(--color-red)]" size={28} />
        <h1 className="text-[32px] font-bold text-[var(--color-text-primary)]">
          How to Earn Points
        </h1>
      </div>
      <p className="mt-1 text-[var(--color-text-secondary)]">
        Every point here is computed and awarded server-side — see your total and rank on the{" "}
        <Link href="/leaderboard" className="text-[var(--color-red)] underline">
          leaderboard
        </Link>
        .
      </p>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {WAYS_TO_EARN.map((way) => {
          const Icon = way.icon;
          return (
            <div
              key={way.title}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-tertiary)] text-[var(--color-red)]">
                  <Icon size={16} />
                </span>
                <p className="font-bold text-[var(--color-text-primary)]">{way.title}</p>
                <span className="ml-auto flex-shrink-0 text-sm font-bold text-[var(--color-red)]">
                  {way.points}
                </span>
              </div>
              <p className="mt-2 text-xs text-[var(--color-text-secondary)]">{way.description}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <ReferralPanel />
      </div>
    </div>
  );
}
