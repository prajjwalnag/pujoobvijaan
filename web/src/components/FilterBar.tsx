"use client";

import { LayoutGrid, List } from "lucide-react";
import clsx from "clsx";
import type { Region, CrowdLevel } from "@/data/types";

interface FilterBarProps {
  regions: Region[];
  selectedRegion: string;
  selectedCrowdLevel: string;
  viewMode: "grid" | "list";
  searchQuery: string;
  onRegionChange: (value: string) => void;
  onCrowdChange: (value: string) => void;
  onViewChange: (value: "grid" | "list") => void;
  onSearchChange: (value: string) => void;
}

const crowdLevels: CrowdLevel[] = ["high", "medium", "low"];

export function FilterBar({
  regions,
  selectedRegion,
  selectedCrowdLevel,
  viewMode,
  searchQuery,
  onRegionChange,
  onCrowdChange,
  onViewChange,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <input
        type="text"
        placeholder="Search pandals..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="h-10 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 text-sm outline-none focus:border-[var(--color-red)] focus:border-2 sm:w-64"
      />

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={selectedRegion}
          onChange={(e) => onRegionChange(e.target.value)}
          className="h-10 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 text-sm outline-none focus:border-[var(--color-red)] focus:border-2"
        >
          <option value="all">All Regions</option>
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <select
          value={selectedCrowdLevel}
          onChange={(e) => onCrowdChange(e.target.value)}
          className="h-10 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 text-sm outline-none focus:border-[var(--color-red)] focus:border-2"
        >
          <option value="all">All Crowd Levels</option>
          {crowdLevels.map((c) => (
            <option key={c} value={c}>
              {c[0].toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>

        <div className="flex overflow-hidden rounded-lg border border-[var(--color-border)]">
          <button
            aria-label="Grid view"
            onClick={() => onViewChange("grid")}
            className={clsx(
              "flex h-10 w-10 items-center justify-center transition-colors",
              viewMode === "grid"
                ? "bg-[var(--color-red)] text-white"
                : "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]"
            )}
          >
            <LayoutGrid size={16} />
          </button>
          <button
            aria-label="List view"
            onClick={() => onViewChange("list")}
            className={clsx(
              "flex h-10 w-10 items-center justify-center transition-colors",
              viewMode === "list"
                ? "bg-[var(--color-red)] text-white"
                : "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]"
            )}
          >
            <List size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
