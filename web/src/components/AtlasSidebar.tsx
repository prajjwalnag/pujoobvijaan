"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import type { Pandal, Area, CrowdLevel } from "@/data/types";

const tierColor: Record<CrowdLevel, string> = {
  high: "var(--color-red)",
  medium: "#c98a10",
  low: "#8c7b6b",
};
const tierLabel: Record<CrowdLevel, string> = { high: "Big", medium: "Medium", low: "Small" };

interface AtlasSidebarProps {
  areasList: Area[];
  selectedPandal: Pandal | null;
  selectedArea: string | null;
  onSelectArea: (id: string | null) => void;
  search: string;
  onSearchChange: (v: string) => void;
  tier: "all" | CrowdLevel;
  onTierChange: (v: "all" | CrowdLevel) => void;
  geoOnly: boolean;
  onGeoOnlyChange: (v: boolean) => void;
  stats: { total: number; geocoded: number };
}

export function AtlasSidebar({
  areasList,
  selectedPandal,
  selectedArea,
  onSelectArea,
  search,
  onSearchChange,
  tier,
  onTierChange,
  geoOnly,
  onGeoOnlyChange,
  stats,
}: AtlasSidebarProps) {
  const sorted = [...areasList].sort((a, b) => b.pandalCount - a.pandalCount);
  const selectedAreaData = selectedPandal?.areaId
    ? areasList.find((a) => a.id === selectedPandal.areaId)
    : undefined;

  return (
    <div className="flex h-full w-full flex-col gap-5 overflow-y-auto border-l border-[var(--color-border)] bg-[var(--color-bg-main)] p-4 lg:w-[320px]">
      <div className="flex gap-3">
        <div className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-2 text-center">
          <p className="text-lg font-bold text-[var(--color-red)]">{stats.total}</p>
          <p className="text-[10px] uppercase tracking-wide text-[var(--color-text-light)]">Pandals</p>
        </div>
        <div className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-2 text-center">
          <p className="text-lg font-bold text-[var(--color-red)]">{areasList.length}</p>
          <p className="text-[10px] uppercase tracking-wide text-[var(--color-text-light)]">Areas</p>
        </div>
        <div className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-2 text-center">
          <p className="text-lg font-bold text-[var(--color-red)]">{stats.geocoded}</p>
          <p className="text-[10px] uppercase tracking-wide text-[var(--color-text-light)]">Geocoded</p>
        </div>
      </div>

      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search a pandal name…"
          className="h-10 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 text-sm outline-none focus:border-2 focus:border-[var(--color-red)]"
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {(["all", "high", "medium", "low"] as const).map((t) => (
            <button
              key={t}
              onClick={() => onTierChange(t)}
              className={clsx(
                "rounded-full border px-3 py-1 text-xs font-semibold",
                tier === t
                  ? "border-[var(--color-red)] bg-[var(--color-red)] text-white"
                  : "border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]"
              )}
            >
              {t === "all" ? "All" : tierLabel[t]}
            </button>
          ))}
          <button
            onClick={() => onGeoOnlyChange(!geoOnly)}
            className={clsx(
              "rounded-full border px-3 py-1 text-xs font-semibold",
              geoOnly
                ? "border-[var(--color-gold)] bg-[var(--color-gold)] text-white"
                : "border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]"
            )}
          >
            Geocoded only
          </button>
        </div>
      </div>

      <div>
        <h2 className="mb-2 text-xs font-bold uppercase tracking-wide text-[var(--color-text-secondary)]">
          Selected
        </h2>
        {selectedPandal ? (
          <div className="rounded-lg border-2 border-[var(--color-red)] bg-[var(--color-bg-secondary)] p-3">
            <p className="font-bold text-[var(--color-text-primary)]">{selectedPandal.name}</p>
            <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">
              {selectedPandal.region} · {selectedPandal.geocoded ? "geocoded" : "placeholder location"}
              {selectedAreaData ? ` · in ${selectedAreaData.name}` : ""}
            </p>
            <span
              className="mt-1.5 inline-block rounded-full px-2 py-0.5 text-[11px] font-bold text-white"
              style={{ background: tierColor[selectedPandal.crowdLevel] }}
            >
              {tierLabel[selectedPandal.crowdLevel]}
            </span>
            {selectedAreaData && (
              <div className="mt-2 space-y-1 border-t border-[var(--color-border)] pt-2 text-xs text-[var(--color-text-secondary)]">
                {!selectedPandal.geocoded && (
                  <p className="italic">Not individually geocoded — clustered near this area.</p>
                )}
                {selectedAreaData.thingsToDo[0] && <p>🎯 {selectedAreaData.thingsToDo[0]}</p>}
                {selectedAreaData.cafes[0] && <p>☕ {selectedAreaData.cafes[0].name}</p>}
                {selectedAreaData.restaurants[0] && <p>🍽️ {selectedAreaData.restaurants[0].name}</p>}
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-[var(--color-border)] p-3 text-xs text-[var(--color-text-light)]">
            Click any dot on the map to see its details here.
          </div>
        )}
      </div>

      <div>
        <h2 className="mb-2 text-xs font-bold uppercase tracking-wide text-[var(--color-text-secondary)]">
          Explore by Area ({areasList.length})
        </h2>
        <div className="space-y-1">
          {sorted.map((area) => {
            const open = selectedArea === area.id;
            return (
              <div
                key={area.id}
                className={clsx(
                  "rounded-lg border bg-[var(--color-bg-secondary)]",
                  open ? "border-[var(--color-gold)]" : "border-[var(--color-border)]"
                )}
              >
                <button
                  onClick={() => onSelectArea(open ? null : area.id)}
                  className="flex w-full items-center justify-between px-3 py-2 text-left text-sm"
                >
                  <span>
                    {area.name}
                    <span className="ml-1 text-[var(--color-text-light)]">({area.pandalCount})</span>
                  </span>
                  <ChevronDown size={14} className={clsx("text-[var(--color-text-light)] transition-transform", open && "rotate-180")} />
                </button>
                {open && (
                  <div className="space-y-1.5 border-t border-[var(--color-border)] px-3 py-2 text-xs text-[var(--color-text-secondary)]">
                    {area.thingsToDo.length > 0 && <p>🎯 {area.thingsToDo.join(" · ")}</p>}
                    {area.cafes.length > 0 && <p>☕ {area.cafes.map((c) => c.name).join(" · ")}</p>}
                    {area.restaurants.length > 0 && <p>🍽️ {area.restaurants.map((r) => r.name).join(" · ")}</p>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <p className="rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-bg-tertiary)] p-3 text-xs leading-relaxed text-[var(--color-text-light)]">
        Dashed/faint dots on the map are placeholder locations, not real addresses — solid dots are
        geocoded via OpenStreetMap. See the <b>resource/pandals_missing_coordinates.csv</b> handoff for
        the ones still needing a manual address.
      </p>
    </div>
  );
}
