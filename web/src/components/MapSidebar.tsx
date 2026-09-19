"use client";

import { useState } from "react";
import { LocateFixed, ChevronDown } from "lucide-react";
import { pandalStats } from "@/data/pandals";
import { areas } from "@/data/areas";
import { metroLines } from "@/data/metro";
import { railStations } from "@/data/railway";
import { roadSegments } from "@/data/roads";
import { tierColor, tierLabel } from "@/data/tiers";
import { RouteBuilderPanel } from "./RouteBuilderPanel";
import type { Pandal, CrowdLevel } from "@/data/types";

const SIZE_LEVELS: CrowdLevel[] = ["high", "medium", "low"];
const sizeCount: Record<CrowdLevel, number> = {
  high: pandalStats.highCrowd,
  medium: pandalStats.mediumCrowd,
  low: pandalStats.lowCrowd,
};

const sortedAreas = [...areas].sort((a, b) => b.pandalCount - a.pandalCount);
const metroStationCount = metroLines.reduce((sum, l) => sum + l.stations.length, 0);

interface MapSidebarProps {
  categories: {
    pandals: boolean;
    foodStalls: boolean;
    itinerary: boolean;
    metro: boolean;
    railway: boolean;
    roads: boolean;
  };
  onCategoryToggle: (
    key: "pandals" | "foodStalls" | "itinerary" | "metro" | "railway" | "roads"
  ) => void;
  sizeFilters: Record<CrowdLevel, boolean>;
  onSizeToggle: (level: CrowdLevel) => void;
  onSizeToggleAll: () => void;
  checkedInCount: number;
  routeStops: Pandal[];
  onRouteRemove: (id: string) => void;
  onRouteMove: (index: number, dir: -1 | 1) => void;
  onRouteOptimize: () => void;
  onRouteClear: () => void;
  onRouteSave: (title: string) => void;
  onLocate: () => void;
  locating: boolean;
  locationError: string | null;
}

export function MapSidebar({
  categories,
  onCategoryToggle,
  sizeFilters,
  onSizeToggle,
  onSizeToggleAll,
  checkedInCount,
  routeStops,
  onRouteRemove,
  onRouteMove,
  onRouteOptimize,
  onRouteClear,
  onRouteSave,
  onLocate,
  locating,
  locationError,
}: MapSidebarProps) {
  const [openArea, setOpenArea] = useState<string | null>(null);
  const [routeBuilderOpen, setRouteBuilderOpen] = useState(false);

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
        <label className="flex items-center justify-between py-1.5 text-sm">
          <span className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={categories.metro}
              onChange={() => onCategoryToggle("metro")}
            />
            Metro lines
          </span>
          <span className="text-[var(--color-text-light)]">{metroStationCount}</span>
        </label>
        <label className="flex items-center justify-between py-1.5 text-sm">
          <span className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={categories.railway}
              onChange={() => onCategoryToggle("railway")}
            />
            Suburban railway
          </span>
          <span className="text-[var(--color-text-light)]">{railStations.length}</span>
        </label>
        <label className="flex items-center justify-between py-1.5 text-sm">
          <span className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={categories.roads}
              onChange={() => onCategoryToggle("roads")}
            />
            Main roads
          </span>
          <span className="text-[var(--color-text-light)]">{roadSegments.length}</span>
        </label>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-[var(--color-text-secondary)]">
          Size
        </h3>
        <label className="flex items-center justify-between py-1.5 text-sm font-semibold">
          <span className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={SIZE_LEVELS.every((l) => sizeFilters[l])}
              ref={(el) => {
                if (el) {
                  const allOn = SIZE_LEVELS.every((l) => sizeFilters[l]);
                  const allOff = SIZE_LEVELS.every((l) => !sizeFilters[l]);
                  el.indeterminate = !allOn && !allOff;
                }
              }}
              onChange={onSizeToggleAll}
            />
            All
          </span>
          <span className="text-[var(--color-text-light)]">{pandalStats.total}</span>
        </label>
        {SIZE_LEVELS.map((level) => (
          <label key={level} className="flex items-center justify-between py-1.5 text-sm">
            <span className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={sizeFilters[level]}
                onChange={() => onSizeToggle(level)}
              />
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ background: tierColor[level] }}
              />
              {tierLabel[level]}
            </span>
            <span className="text-[var(--color-text-light)]">{sizeCount[level]}</span>
          </label>
        ))}
      </div>

      <div>
        <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-[var(--color-text-secondary)]">
          Tools
        </h3>
        <button
          onClick={onLocate}
          disabled={locating}
          className="mb-1 flex w-full items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 py-2 text-sm hover:border-[var(--color-red)] disabled:cursor-wait disabled:opacity-60"
        >
          <LocateFixed size={16} className={locating ? "animate-pulse" : ""} />
          {locating ? "Locating…" : "Find My Location"}
        </button>
        {locationError && (
          <p className="mb-2 text-xs text-[var(--color-red)]">{locationError}</p>
        )}
        <RouteBuilderPanel
          open={routeBuilderOpen}
          onToggleOpen={() => setRouteBuilderOpen((v) => !v)}
          routeStops={routeStops}
          onRemove={onRouteRemove}
          onMove={onRouteMove}
          onOptimize={onRouteOptimize}
          onClear={onRouteClear}
          onSave={onRouteSave}
        />
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
            <span>Big</span>
            <span>{pandalStats.highCrowd}</span>
          </li>
          <li className="flex justify-between">
            <span>Medium</span>
            <span>{pandalStats.mediumCrowd}</span>
          </li>
          <li className="flex justify-between">
            <span>Small</span>
            <span>{pandalStats.lowCrowd}</span>
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

      <div>
        <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-[var(--color-text-secondary)]">
          Explore by Area
        </h3>
        <div className="space-y-1">
          {sortedAreas.map((area) => {
            const open = openArea === area.id;
            return (
              <div key={area.id} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
                <button
                  onClick={() => setOpenArea(open ? null : area.id)}
                  className="flex w-full items-center justify-between px-3 py-2 text-left text-sm"
                >
                  <span>
                    {area.name}
                    <span className="ml-1 text-[var(--color-text-light)]">({area.pandalCount})</span>
                  </span>
                  <ChevronDown size={14} className={open ? "rotate-180 transition-transform" : "transition-transform"} />
                </button>
                {open && (
                  <div className="space-y-1.5 border-t border-[var(--color-border)] px-3 py-2 text-xs text-[var(--color-text-secondary)]">
                    {area.thingsToDo.length > 0 && (
                      <p>🎯 {area.thingsToDo.join(" · ")}</p>
                    )}
                    {area.cafes.length > 0 && (
                      <p>☕ {area.cafes.map((c) => c.name).join(" · ")}</p>
                    )}
                    {area.restaurants.length > 0 && (
                      <p>🍽️ {area.restaurants.map((r) => r.name).join(" · ")}</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
