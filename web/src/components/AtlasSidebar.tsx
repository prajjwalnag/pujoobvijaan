"use client";

import { ChevronDown, Eye, EyeOff } from "lucide-react";
import clsx from "clsx";
import type { Pandal, Area, CrowdLevel } from "@/data/types";
import { tierColor, tierLabel } from "@/data/tiers";

interface AtlasSidebarProps {
  areasList: Area[];
  selectedPandal: Pandal | null;
  nearbyPandals: { pandal: Pandal; distanceKm: number }[];
  onSelectNearby: (id: string) => void;
  enabledAreas: Set<string>;
  onToggleAreaEnabled: (id: string) => void;
  onSetAllEnabled: (value: boolean) => void;
  showUngrouped: boolean;
  onToggleUngrouped: () => void;
  ungroupedCount: number;
  focusedArea: string | null;
  onToggleFocus: (id: string | null) => void;
  search: string;
  onSearchChange: (v: string) => void;
  tier: "all" | CrowdLevel;
  onTierChange: (v: "all" | CrowdLevel) => void;
  geoOnly: boolean;
  onGeoOnlyChange: (v: boolean) => void;
  showFood: boolean;
  onShowFoodChange: (v: boolean) => void;
  stats: { total: number; geocoded: number };
}

export function AtlasSidebar({
  areasList,
  selectedPandal,
  nearbyPandals,
  onSelectNearby,
  enabledAreas,
  onToggleAreaEnabled,
  onSetAllEnabled,
  showUngrouped,
  onToggleUngrouped,
  ungroupedCount,
  focusedArea,
  onToggleFocus,
  search,
  onSearchChange,
  tier,
  onTierChange,
  geoOnly,
  onGeoOnlyChange,
  showFood,
  onShowFoodChange,
  stats,
}: AtlasSidebarProps) {
  const sorted = [...areasList].sort((a, b) => b.pandalCount - a.pandalCount);
  const selectedAreaData = selectedPandal?.areaId
    ? areasList.find((a) => a.id === selectedPandal.areaId)
    : undefined;
  const allOn = enabledAreas.size === areasList.length && showUngrouped;
  const allOff = enabledAreas.size === 0 && !showUngrouped;

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
          {(["all", "high", "medium", "low"] as const).map((t) => {
            const active = tier === t;
            const color = t === "all" ? "var(--color-red)" : tierColor[t];
            return (
              <button
                key={t}
                onClick={() => onTierChange(t)}
                className="rounded-full border-2 px-3 py-1 text-xs font-bold transition-colors"
                style={
                  active
                    ? { borderColor: color, background: color, color: "#fff" }
                    : { borderColor: color, background: "var(--color-bg-secondary)", color }
                }
              >
                {t === "all" ? "All" : tierLabel[t]}
              </button>
            );
          })}
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
          <button
            onClick={() => onShowFoodChange(!showFood)}
            className={clsx(
              "rounded-full border px-3 py-1 text-xs font-semibold",
              showFood
                ? "border-[#7A1F1F] bg-[#7A1F1F] text-white"
                : "border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]"
            )}
          >
            ☕🍽️ Cafes & food
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

            {nearbyPandals.length > 0 && (
              <div className="mt-2 border-t border-[var(--color-border)] pt-2 text-left">
                <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--color-text-light)]">
                  Nearby pandals
                </p>
                <ul className="mt-1 space-y-1">
                  {nearbyPandals.map(({ pandal, distanceKm }) => (
                    <li key={pandal.id}>
                      <button
                        onClick={() => onSelectNearby(pandal.id)}
                        className="flex w-full items-center justify-between gap-2 rounded px-1.5 py-1 text-left text-xs hover:bg-[var(--color-bg-tertiary)]"
                      >
                        <span className="flex items-center gap-1.5 truncate">
                          <span
                            className="inline-block h-2 w-2 flex-shrink-0 rounded-full"
                            style={{ background: tierColor[pandal.crowdLevel] }}
                          />
                          <span className="truncate text-[var(--color-text-primary)]">{pandal.name}</span>
                        </span>
                        <span className="flex-shrink-0 text-[var(--color-text-light)]">
                          {distanceKm < 1
                            ? `${Math.round(distanceKm * 1000)} m`
                            : `${distanceKm.toFixed(1)} km`}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
                {!selectedPandal.geocoded && (
                  <p className="mt-1 text-[10px] italic text-[var(--color-text-light)]">
                    Approximate — this pandal's own location isn't geocoded yet.
                  </p>
                )}
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
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wide text-[var(--color-text-secondary)]">
            Explore by Area ({areasList.length})
          </h2>
          <button
            onClick={() => onSetAllEnabled(allOn ? false : true)}
            className="flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-2.5 py-1 text-[11px] font-semibold text-[var(--color-text-secondary)] hover:border-[var(--color-red)] hover:text-[var(--color-red)]"
          >
            {allOff ? (
              <>
                <Eye size={12} /> Turn all on
              </>
            ) : (
              <>
                <EyeOff size={12} /> Turn all off
              </>
            )}
          </button>
        </div>
        <div className="space-y-1">
          {sorted.map((area) => {
            const open = focusedArea === area.id;
            const enabled = enabledAreas.has(area.id);
            return (
              <div
                key={area.id}
                className={clsx(
                  "rounded-lg border bg-[var(--color-bg-secondary)] transition-opacity",
                  open ? "border-[var(--color-gold)]" : "border-[var(--color-border)]",
                  !enabled && "opacity-50"
                )}
              >
                <div className="flex items-center gap-1 px-2 py-1.5">
                  <button
                    onClick={() => onToggleAreaEnabled(area.id)}
                    aria-label={enabled ? `Hide ${area.name}` : `Show ${area.name}`}
                    aria-pressed={enabled}
                    className={clsx(
                      "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border-2",
                      enabled
                        ? "border-[var(--color-gold)] bg-[var(--color-gold)] text-white"
                        : "border-[var(--color-border)] bg-transparent text-[var(--color-text-light)]"
                    )}
                  >
                    {enabled ? <Eye size={13} /> : <EyeOff size={13} />}
                  </button>
                  <button
                    onClick={() => onToggleFocus(open ? null : area.id)}
                    className="flex flex-1 items-center justify-between px-1 py-1 text-left text-sm"
                  >
                    <span>
                      {area.name}
                      <span className="ml-1 text-[var(--color-text-light)]">({area.pandalCount})</span>
                    </span>
                    <ChevronDown
                      size={14}
                      className={clsx("text-[var(--color-text-light)] transition-transform", open && "rotate-180")}
                    />
                  </button>
                </div>
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

          <div
            className={clsx(
              "rounded-lg border border-dashed bg-[var(--color-bg-secondary)] transition-opacity",
              showUngrouped ? "border-[var(--color-border)]" : "border-[var(--color-border)] opacity-50"
            )}
          >
            <div className="flex items-center gap-1 px-2 py-1.5">
              <button
                onClick={onToggleUngrouped}
                aria-label={showUngrouped ? "Hide ungrouped pandals" : "Show ungrouped pandals"}
                aria-pressed={showUngrouped}
                className={clsx(
                  "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border-2",
                  showUngrouped
                    ? "border-[var(--color-text-secondary)] bg-[var(--color-text-secondary)] text-white"
                    : "border-[var(--color-border)] bg-transparent text-[var(--color-text-light)]"
                )}
              >
                {showUngrouped ? <Eye size={13} /> : <EyeOff size={13} />}
              </button>
              <span className="flex-1 px-1 py-1 text-sm text-[var(--color-text-secondary)]">
                Ungrouped pandals
                <span className="ml-1 text-[var(--color-text-light)]">({ungroupedCount})</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] p-3">
        <h2 className="mb-2 text-xs font-bold uppercase tracking-wide text-[var(--color-text-secondary)]">
          Map Legend
        </h2>
        <div className="grid grid-cols-3 gap-2 text-xs">
          {(["high", "medium", "low"] as const).map((t) => (
            <div key={t} className="flex items-center gap-1.5">
              <span
                className="inline-block h-3.5 w-3.5 rounded-full border-2 border-white"
                style={{ background: tierColor[t] }}
              />
              <span className="font-semibold text-[var(--color-text-primary)]">{tierLabel[t]}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-xs">
          <span className="inline-block h-3.5 w-3.5 rounded-full border-2 border-dashed border-[var(--color-text-secondary)] bg-white" />
          <span className="text-[var(--color-text-secondary)]">Dashed = placeholder, not a real address yet</span>
        </div>
        <div className="mt-2 flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[#A9762F] text-[10px]">☕</span>
            <span className="text-[var(--color-text-secondary)]">Cafe</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[#7A1F1F] text-[10px]">🍽️</span>
            <span className="text-[var(--color-text-secondary)]">Food</span>
          </span>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-light)]">
          Cafe/food pins are placed approximately within their area, not at a real geocoded
          address. See <b>resource/pandals_missing_coordinates.csv</b> for pandals still needing a
          manual coordinate lookup.
        </p>
      </div>
    </div>
  );
}
