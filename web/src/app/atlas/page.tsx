"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { AtlasSidebar } from "@/components/AtlasSidebar";
import { pandals } from "@/data/pandals";
import { areas } from "@/data/areas";
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

export default function AtlasPage() {
  const [search, setSearch] = useState("");
  const [tier, setTier] = useState<"all" | CrowdLevel>("all");
  const [geoOnly, setGeoOnly] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedPandal, setSelectedPandal] = useState<Pandal | null>(null);

  const filtered = useMemo(() => {
    return pandals.filter((p) => {
      if (tier !== "all" && p.crowdLevel !== tier) return false;
      if (geoOnly && !p.geocoded) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedArea && p.areaId !== selectedArea) return false;
      return true;
    });
  }, [tier, geoOnly, search, selectedArea]);

  const stats = useMemo(
    () => ({ total: pandals.length, geocoded: pandals.filter((p) => p.geocoded).length }),
    []
  );

  function handleSelectArea(id: string | null) {
    setSelectedArea((prev) => (prev === id ? null : id));
  }

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col lg:flex-row-reverse">
      <AtlasSidebar
        areasList={areas}
        selectedPandal={selectedPandal}
        selectedArea={selectedArea}
        onSelectArea={handleSelectArea}
        search={search}
        onSearchChange={setSearch}
        tier={tier}
        onTierChange={setTier}
        geoOnly={geoOnly}
        onGeoOnlyChange={setGeoOnly}
        stats={stats}
      />
      <div className="flex-1 p-4">
        <div className="h-full w-full overflow-hidden rounded-lg shadow-[var(--shadow-light)]">
          <AtlasMapView
            pandalsList={filtered}
            areasList={areas}
            selectedAreaId={selectedArea}
            onSelectPandal={setSelectedPandal}
            onSelectArea={handleSelectArea}
          />
        </div>
      </div>
    </div>
  );
}
