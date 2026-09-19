"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { AtlasSidebar } from "@/components/AtlasSidebar";
import { pandals } from "@/data/pandals";
import { areas } from "@/data/areas";
import { nearestPandals } from "@/data/graph";
import type { Pandal, CrowdLevel } from "@/data/types";

const AtlasMapView = dynamic(
  () => import("@/components/AtlasMapView").then((m) => m.AtlasMapView),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center text-[var(--color-text-secondary)]">
        Loading atlas…
      </div>
    ),
  }
);

const allAreaIds = new Set(areas.map((a) => a.id));

export default function AtlasPage() {
  const [search, setSearch] = useState("");
  const [tier, setTier] = useState<"all" | CrowdLevel>("all");
  const [geoOnly, setGeoOnly] = useState(false);
  const [focusedArea, setFocusedArea] = useState<string | null>(null);
  const [enabledAreas, setEnabledAreas] = useState<Set<string>>(allAreaIds);
  const [showUngrouped, setShowUngrouped] = useState(true);
  const [selectedPandal, setSelectedPandal] = useState<Pandal | null>(null);
  const [showFood, setShowFood] = useState(true);
  const [showMetro, setShowMetro] = useState(true);
  const [showRailway, setShowRailway] = useState(false);
  const [showRoads, setShowRoads] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const visibleAreas = useMemo(
    () => areas.filter((a) => enabledAreas.has(a.id)),
    [enabledAreas]
  );

  const ungroupedCount = useMemo(() => pandals.filter((p) => !p.areaId).length, []);

  const filtered = useMemo(() => {
    return pandals.filter((p) => {
      if (tier !== "all" && p.crowdLevel !== tier) return false;
      if (geoOnly && !p.geocoded) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      // Grouped pandals follow their area's toggle; ungrouped ones have their own toggle.
      if (p.areaId) {
        if (!enabledAreas.has(p.areaId)) return false;
      } else if (!showUngrouped) {
        return false;
      }
      return true;
    });
  }, [tier, geoOnly, search, enabledAreas, showUngrouped]);

  const stats = useMemo(
    () => ({ total: pandals.length, geocoded: pandals.filter((p) => p.geocoded).length }),
    []
  );

  const nearby = useMemo(
    () => (selectedPandal ? nearestPandals(selectedPandal.id, 5) : []),
    [selectedPandal]
  );

  function selectPandalById(id: string) {
    const p = pandals.find((x) => x.id === id);
    if (p) setSelectedPandal(p);
  }

  function toggleAreaEnabled(id: string) {
    setEnabledAreas((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function setAllEnabled(value: boolean) {
    setEnabledAreas(value ? new Set(allAreaIds) : new Set());
    setShowUngrouped(value);
  }

  function toggleFocus(id: string | null) {
    setFocusedArea((prev) => (prev === id ? null : id));
  }

  return (
    <div className="relative flex h-[calc(100dvh-64px)] flex-col overflow-hidden lg:flex-row-reverse">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-[1000] bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 right-0 z-[1010] w-[85%] max-w-[320px] transform bg-[var(--color-bg-main)] transition-transform duration-200 lg:static lg:z-auto lg:w-[320px] lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          aria-label="Close filters"
          className="absolute left-3 top-3 z-10 rounded-full bg-[var(--color-bg-secondary)] p-1.5 text-[var(--color-text-secondary)] lg:hidden"
        >
          <X size={16} />
        </button>
        <AtlasSidebar
        areasList={areas}
        selectedPandal={selectedPandal}
        nearbyPandals={nearby}
        onSelectNearby={selectPandalById}
        enabledAreas={enabledAreas}
        onToggleAreaEnabled={toggleAreaEnabled}
        onSetAllEnabled={setAllEnabled}
        showUngrouped={showUngrouped}
        onToggleUngrouped={() => setShowUngrouped((v) => !v)}
        ungroupedCount={ungroupedCount}
        focusedArea={focusedArea}
        onToggleFocus={toggleFocus}
        search={search}
        onSearchChange={setSearch}
        tier={tier}
        onTierChange={setTier}
        geoOnly={geoOnly}
        onGeoOnlyChange={setGeoOnly}
        showFood={showFood}
        onShowFoodChange={setShowFood}
        showMetro={showMetro}
        onShowMetroChange={setShowMetro}
        showRailway={showRailway}
        onShowRailwayChange={setShowRailway}
        showRoads={showRoads}
        onShowRoadsChange={setShowRoads}
        stats={stats}
        />
      </div>

      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed bottom-5 right-4 z-[1005] flex items-center gap-2 rounded-full bg-[var(--color-red)] px-4 py-3 text-sm font-semibold text-white shadow-lg lg:hidden"
      >
        <SlidersHorizontal size={16} />
        Filters
      </button>

      <div className="flex-1 p-2 sm:p-4">
        <div className="h-full w-full overflow-hidden rounded-lg shadow-[var(--shadow-light)]">
          <AtlasMapView
            pandalsList={filtered}
            areasList={visibleAreas}
            focusedAreaId={focusedArea}
            onSelectPandal={setSelectedPandal}
            onSelectArea={toggleFocus}
            showFood={showFood}
            showMetro={showMetro}
            showRailway={showRailway}
            showRoads={showRoads}
          />
        </div>
      </div>
    </div>
  );
}
