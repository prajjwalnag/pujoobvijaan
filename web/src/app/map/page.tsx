"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { MapSidebar } from "@/components/MapSidebar";
import { pandals } from "@/data/pandals";
import { usePoints, POINTS } from "@/components/PointsProvider";
import { useMyItineraries } from "@/components/useMyItineraries";
import { haversineKm } from "@/data/graph";
import type { Pandal, Itinerary } from "@/data/types";

const MapView = dynamic(() => import("@/components/MapView").then((m) => m.MapView), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-[var(--color-text-secondary)]">
      Loading map…
    </div>
  ),
});

// Greedy nearest-neighbor reorder, starting from the first stop the user
// placed — not a true optimal TSP solve, but a genuine real-distance
// heuristic, not a fake shuffle.
// Simple default schedule: first stop 4:00 PM, +1h per stop after,
// wrapping past midnight for long routes.
function nextTime(index: number) {
  const hour24 = (16 + index) % 24;
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  const suffix = hour24 < 12 ? "AM" : "PM";
  return `${hour12}:00 ${suffix}`;
}

function nearestNeighborOrder(stops: Pandal[]): Pandal[] {
  if (stops.length < 3) return stops;
  const remaining = [...stops];
  const ordered = [remaining.shift()!];
  while (remaining.length) {
    const last = ordered[ordered.length - 1];
    let bestIdx = 0;
    let bestDist = Infinity;
    remaining.forEach((p, i) => {
      const d = haversineKm(last.coordinates, p.coordinates);
      if (d < bestDist) {
        bestDist = d;
        bestIdx = i;
      }
    });
    ordered.push(remaining.splice(bestIdx, 1)[0]);
  }
  return ordered;
}

export default function MapPage() {
  const [categories, setCategories] = useState({
    pandals: true,
    foodStalls: false,
    itinerary: false,
    metro: true,
    railway: false,
    roads: false,
  });
  const { checkedIn, award } = usePoints();
  const { addItinerary } = useMyItineraries();
  const [routeStops, setRouteStops] = useState<Pandal[]>([]);

  function toggleCategory(
    key: "pandals" | "foodStalls" | "itinerary" | "metro" | "railway" | "roads"
  ) {
    setCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function addToRoute(pandal: Pandal) {
    setRouteStops((prev) => (prev.some((p) => p.id === pandal.id) ? prev : [...prev, pandal]));
  }

  function removeFromRoute(id: string) {
    setRouteStops((prev) => prev.filter((p) => p.id !== id));
  }

  function moveRouteStop(index: number, dir: -1 | 1) {
    setRouteStops((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function optimizeRoute() {
    setRouteStops((prev) => nearestNeighborOrder(prev));
  }

  function saveRoute(title: string) {
    const itinerary: Itinerary = {
      id: `custom-${Date.now()}`,
      title,
      description: `Built on the map — ${routeStops.length} stops.`,
      mode: "walk",
      stops: routeStops.map((p, i) => ({ pandalId: p.id, scheduledTime: nextTime(i) })),
    };
    addItinerary(itinerary);
    award(POINTS.CREATE_ITINERARY, "Created itinerary");
    setRouteStops([]);
  }

  const visible = categories.pandals ? pandals : [];

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col lg:flex-row">
      <MapSidebar
        categories={categories}
        onCategoryToggle={toggleCategory}
        checkedInCount={checkedIn.size}
        routeStops={routeStops}
        onRouteRemove={removeFromRoute}
        onRouteMove={moveRouteStop}
        onRouteOptimize={optimizeRoute}
        onRouteClear={() => setRouteStops([])}
        onRouteSave={saveRoute}
      />
      <div className="flex-1 p-4">
        <div className="h-full w-full overflow-hidden rounded-lg shadow-[var(--shadow-light)]">
          <MapView
            pandalsList={visible}
            showMetro={categories.metro}
            showRailway={categories.railway}
            showRoads={categories.roads}
            routeStops={routeStops}
            onAddToRoute={addToRoute}
          />
        </div>
      </div>
    </div>
  );
}
