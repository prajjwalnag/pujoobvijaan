"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { MapSidebar } from "@/components/MapSidebar";
import { pandals } from "@/data/pandals";
import { usePoints } from "@/components/PointsProvider";

const MapView = dynamic(() => import("@/components/MapView").then((m) => m.MapView), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-[var(--color-text-secondary)]">
      Loading map…
    </div>
  ),
});

export default function MapPage() {
  const [categories, setCategories] = useState({
    pandals: true,
    foodStalls: false,
    itinerary: false,
    metro: true,
  });
  const { checkedIn } = usePoints();

  function toggleCategory(key: "pandals" | "foodStalls" | "itinerary" | "metro") {
    setCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const visible = categories.pandals ? pandals : [];

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col lg:flex-row">
      <MapSidebar
        categories={categories}
        onCategoryToggle={toggleCategory}
        checkedInCount={checkedIn.size}
      />
      <div className="flex-1 p-4">
        <div className="h-full w-full overflow-hidden rounded-lg shadow-[var(--shadow-light)]">
          <MapView pandalsList={visible} showMetro={categories.metro} />
        </div>
      </div>
    </div>
  );
}
