import Link from "next/link";
import type { Metadata } from "next";
import { FilterBar } from "@/components/FilterBar";
import { PandalCard } from "@/components/PandalCard";
import { pandals, regions } from "@/data/pandals";
import { PandalsContent } from "@/components/PandalsContent";

export const metadata: Metadata = {
  title: "Browse Pandals",
  description:
    "Browse and filter all 1900+ Durga Puja pandals across Kolkata. Filter by region, crowd level, and theme to find the perfect pandals to visit.",
  alternates: { canonical: "/pandals" },
};

export default function PandalsPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-[var(--color-text-primary)]">
          Pandals
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          Browse and filter Durga Puja pandals across Kolkata
        </p>
        <div className="flex flex-wrap gap-2 text-sm">
          <Link href="/map" className="text-[var(--color-red)] hover:underline">
            View on interactive map →
          </Link>
          <span className="text-[var(--color-border)]">•</span>
          <Link href="/guide" className="text-[var(--color-red)] hover:underline">
            Pandal hopping tips →
          </Link>
        </div>
      </div>

      <PandalsContent regions={regions} pandals={pandals} />
    </div>
  );
}
