import Link from "next/link";
import type { Metadata } from "next";
import { Coins } from "lucide-react";
import { ReferralPanel } from "@/components/ReferralPanel";
import { EarnSlider } from "@/components/EarnSlider";
import { WAYS_TO_EARN } from "@/data/waysToEarn";

export const metadata: Metadata = {
  title: "How to Earn Points",
  description:
    "Every way to earn points on Pujo Obhijaan — sign up, check in to pandals, rate them, build itineraries, and refer friends during Durga Puja 2026.",
  alternates: { canonical: "/earn" },
};

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

      <EarnSlider ways={WAYS_TO_EARN} />

      <div className="mt-6">
        <ReferralPanel />
      </div>
    </div>
  );
}
