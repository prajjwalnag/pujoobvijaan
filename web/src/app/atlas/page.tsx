"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
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
    <div className="flex h-[calc(100vh-64px)] flex-col lg:flex-row-reverse">
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
        stats={stats}
      />
      <div className="flex-1 p-4">
        <div className="h-full w-full overflow-hidden rounded-lg shadow-[var(--shadow-light)]">
          <AtlasMapView
            pandalsList={filtered}
            areasList={visibleAreas}
            focusedAreaId={focusedArea}
            onSelectPandal={setSelectedPandal}
            onSelectArea={toggleFocus}
            showFood={showFood}
          />
        </div>
      </div>
    </div>
  );
}
