"use client";

import { LocateFixed, Route } from "lucide-react";
import { pandalStats } from "@/data/pandals";

interface MapSidebarProps {
  categories: { pandals: boolean; foodStalls: boolean; itinerary: boolean };
  onCategoryToggle: (key: "pandals" | "foodStalls" | "itinerary") => void;
  checkedInCount: number;
}

export function MapSidebar({ categories, onCategoryToggle, checkedInCount }: MapSidebarProps) {
  return (
    <div className="flex h-full w-full flex-col gap-6 overflow-y-auto border-r border-[var(--color-border)] bg-[var(--color-bg-main)] p-4 lg:w-[280px]">
      <div>
        <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-[var(--color-text-secondary)]">
          Categories
        </h3>
        <label className="flex items-center justify-between py-1.5 text-sm">
          <span className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={categories.pandals}
              onChange={() => onCategoryToggle("pandals")}
            />
            Pandals
          </span>
          <span className="text-[var(--color-text-light)]">{pandalStats.total}</span>
        </label>
        <label className="flex items-center justify-between py-1.5 text-sm">
          <span className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={categories.foodStalls}
              onChange={() => onCategoryToggle("foodStalls")}
            />
            Food Stalls
          </span>
          <span className="text-[var(--color-text-light)]">3</span>
        </label>
        <label className="flex items-center justify-between py-1.5 text-sm">
          <span className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={categories.itinerary}
              onChange={() => onCategoryToggle("itinerary")}
            />
            Itinerary
          </span>
          <span className="text-[var(--color-text-light)]">0</span>
        </label>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-[var(--color-text-secondary)]">
          Tools
        </h3>
        <button className="mb-2 flex w-full items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 py-2 text-sm hover:border-[var(--color-red)]">
          <LocateFixed size={16} />
          Find My Location
        </button>
        <button className="flex w-full items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 py-2 text-sm hover:border-[var(--color-red)]">
          <Route size={16} />
          Route Builder
        </button>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-[var(--color-text-secondary)]">
          Quick Stats
        </h3>
        <ul className="space-y-1 text-sm text-[var(--color-text-secondary)]">
          <li className="flex justify-between">
            <span>Total</span>
            <span>{pandalStats.total}</span>
          </li>
          <li className="flex justify-between">
            <span>High</span>
            <span>{pandalStats.highCrowd}</span>
          </li>
          <li className="flex justify-between">
            <span>Medium</span>
            <span>{pandalStats.mediumCrowd}</span>
          </li>
          <li className="flex justify-between">
            <span>Low</span>
            <span>{pandalStats.lowCrowd}</span>
          </li>
          <li className="flex justify-between">
            <span>Metro</span>
            <span>{pandalStats.metroConnected}</span>
          </li>
        </ul>
      </div>

      <div className="rounded-lg bg-[var(--color-bg-tertiary)] p-3">
        <h3 className="mb-1 text-sm font-bold text-[var(--color-red)]">
          Your Pandal Hopping
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Checked in: {checkedInCount} / {pandalStats.total}
        </p>
      </div>
    </div>
  );
}
