"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { MapSidebar } from "@/components/MapSidebar";
import { pandals } from "@/data/pandals";
import { usePoints, POINTS } from "@/components/PointsProvider";
import { useMyItineraries } from "@/components/useMyItineraries";
import { haversineKm } from "@/data/graph";
import type { Pandal, Itinerary, CrowdLevel } from "@/data/types";

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
  const [sizeFilters, setSizeFilters] = useState<Record<CrowdLevel, boolean>>({
    high: true,
    medium: true,
    low: true,
  });
  const { checkedIn, award } = usePoints();
  const { addItinerary } = useMyItineraries();
  const [routeStops, setRouteStops] = useState<Pandal[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Real device GPS via the browser Geolocation API — works on Android and
  // iPhone alike (it's the browser, not this app, that talks to the phone's
  // location hardware). Needs HTTPS in production and an explicit
  // permission grant; localhost is exempt from the HTTPS requirement.
  const locateMe = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation isn't supported on this device/browser.");
      return;
    }
    setLocating(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocating(false);
      },
      (err) => {
        setLocationError(
          err.code === err.PERMISSION_DENIED
            ? "Location permission denied — enable it in your browser/site settings."
            : "Couldn't get your location. Try again."
        );
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, []);

  function toggleCategory(
    key: "pandals" | "foodStalls" | "itinerary" | "metro" | "railway" | "roads"
  ) {
    setCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function toggleSize(level: CrowdLevel) {
    setSizeFilters((prev) => ({ ...prev, [level]: !prev[level] }));
  }

  function toggleAllSizes() {
    const allOn = sizeFilters.high && sizeFilters.medium && sizeFilters.low;
    setSizeFilters({ high: !allOn, medium: !allOn, low: !allOn });
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

  const visible = categories.pandals ? pandals.filter((p) => sizeFilters[p.crowdLevel]) : [];

  return (
    <div className="relative flex h-[calc(100vh-64px)] flex-col overflow-hidden lg:flex-row">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-[1000] bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-[1010] w-[85%] max-w-[300px] transform bg-[var(--color-bg-main)] transition-transform duration-200 lg:static lg:z-auto lg:w-[280px] lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          aria-label="Close filters"
          className="absolute right-3 top-3 z-10 rounded-full bg-[var(--color-bg-secondary)] p-1.5 text-[var(--color-text-secondary)] lg:hidden"
        >
          <X size={16} />
        </button>
        <MapSidebar
          categories={categories}
          onCategoryToggle={toggleCategory}
          sizeFilters={sizeFilters}
          onSizeToggle={toggleSize}
          onSizeToggleAll={toggleAllSizes}
          checkedInCount={checkedIn.size}
          routeStops={routeStops}
          onRouteRemove={removeFromRoute}
          onRouteMove={moveRouteStop}
          onRouteOptimize={optimizeRoute}
          onRouteClear={() => setRouteStops([])}
          onRouteSave={saveRoute}
          onLocate={locateMe}
          locating={locating}
          locationError={locationError}
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
          <MapView
            pandalsList={visible}
            showMetro={categories.metro}
            showRailway={categories.railway}
            showRoads={categories.roads}
            routeStops={routeStops}
            onAddToRoute={addToRoute}
            userLocation={userLocation}
          />
        </div>
      </div>
    </div>
  );
}
