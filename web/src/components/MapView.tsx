"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import { LocateFixed } from "lucide-react";
import { Star } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";
import type { Pandal } from "@/data/types";
import { areas } from "@/data/areas";
import { useTheme } from "./ThemeProvider";
import { usePoints, checkinPointsFor, POINTS } from "./PointsProvider";
import { MetroLayer } from "./MetroLayer";
import { RailwayLayer } from "./RailwayLayer";
import { RoadLayer } from "./RoadLayer";

const areaById = new Map(areas.map((a) => [a.id, a]));

const TILE_URLS = {
  light: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  // CARTO's dark basemap now requires a paid-signup API key (as of Sept
  // 2026) or shows an "API KEY REQUIRED" watermark. Esri's Dark Gray
  // Canvas is free and keyless — base (fill) + reference (labels) layered
  // together, same as CARTO's single dark_all tile used to look.
  darkBase:
    "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
  darkLabels:
    "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}",
};
const TILE_ATTRIBUTION_LIGHT =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const TILE_ATTRIBUTION_DARK =
  "Esri, HERE, Garmin, &copy; OpenStreetMap contributors, and the GIS user community";

function pinIcon(checkedIn: boolean) {
  const color = checkedIn ? "#52b788" : "#8b0000";
  const html = renderToStaticMarkup(
    <div
      style={{
        width: 22,
        height: 22,
        borderRadius: "50% 50% 50% 0",
        background: color,
        transform: "rotate(-45deg)",
        border: "2px solid white",
        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
      }}
    />
  );
  return L.divIcon({
    html,
    className: "",
    iconSize: [22, 22],
    iconAnchor: [11, 22],
    popupAnchor: [0, -22],
  });
}

function userLocationIcon() {
  const html = renderToStaticMarkup(
    <div style={{ width: 18, height: 18, position: "relative" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: "#4a90d9",
          opacity: 0.35,
          animation: "pujo-pulse 1.8s ease-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 4,
          borderRadius: "50%",
          background: "#4a90d9",
          border: "2px solid white",
          boxShadow: "0 1px 4px rgba(0,0,0,0.4)",
        }}
      />
    </div>
  );
  return L.divIcon({ html, className: "", iconSize: [18, 18], iconAnchor: [9, 9] });
}

function FlyToLocation({ location }: { location: { lat: number; lng: number } | null }) {
  const map = useMap();
  useEffect(() => {
    if (location) map.flyTo([location.lat, location.lng], 15, { duration: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.lat, location?.lng]);
  return null;
}

function routeMarkerIcon(index: number) {
  const html = renderToStaticMarkup(
    <div
      style={{
        width: 24,
        height: 24,
        borderRadius: "50%",
        background: "#D4A017",
        border: "2.5px solid white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: 800,
        fontSize: 12,
        boxShadow: "0 2px 5px rgba(0,0,0,0.4)",
      }}
    >
      {index + 1}
    </div>
  );
  return L.divIcon({ html, className: "", iconSize: [24, 24], iconAnchor: [12, 12] });
}

function StarRow({ pandal }: { pandal: Pandal }) {
  const { ratings, rate } = usePoints();
  const [hover, setHover] = useState(0);
  const current = ratings[pandal.id] ?? 0;
  const alreadyRated = pandal.id in ratings;

  return (
    <div className="mt-2 flex items-center gap-2">
      <div className="flex" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => rate(pandal, n)}
            onMouseEnter={() => setHover(n)}
            aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
            className="p-0.5"
          >
            <Star
              size={16}
              className={(hover || current) >= n ? "text-[#FFB700]" : "text-gray-300"}
              fill={(hover || current) >= n ? "#FFB700" : "none"}
            />
          </button>
        ))}
      </div>
      <span className="text-[10px] text-gray-500">{alreadyRated ? "rated" : `+${POINTS.RATING} pts`}</span>
    </div>
  );
}

export function MapView({
  pandalsList,
  showMetro = true,
  showRailway = false,
  showRoads = false,
  routeStops = [],
  onAddToRoute,
  userLocation = null,
  onLocate,
  locating = false,
  locationError = null,
}: {
  pandalsList: Pandal[];
  showMetro?: boolean;
  showRailway?: boolean;
  showRoads?: boolean;
  routeStops?: Pandal[];
  onAddToRoute?: (pandal: Pandal) => void;
  userLocation?: { lat: number; lng: number } | null;
  onLocate?: () => void;
  locating?: boolean;
  locationError?: string | null;
}) {
  const { theme } = useTheme();
  const { checkedIn, checkIn } = usePoints();
  const routeIds = new Set(routeStops.map((p) => p.id));

  return (
    <div className="relative h-full w-full">
      {onLocate && (
        <div className="absolute right-3 top-3 z-[1010] flex flex-col items-end gap-1.5">
          <button
            onClick={onLocate}
            disabled={locating}
            aria-label="Find my location"
            title="Find my location"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-bg-secondary)] text-[var(--color-red)] shadow-lg ring-1 ring-[var(--color-border)] transition-transform hover:scale-105 disabled:cursor-wait disabled:opacity-60"
          >
            <LocateFixed size={20} className={locating ? "animate-pulse" : ""} />
          </button>
          {locationError && (
            <p className="max-w-[180px] rounded-md bg-[var(--color-bg-secondary)] px-2 py-1 text-right text-[11px] text-[var(--color-red)] shadow-lg">
              {locationError}
            </p>
          )}
        </div>
      )}
    <MapContainer
      center={[22.565, 88.35]}
      zoom={12}
      scrollWheelZoom
      preferCanvas
      className="h-full w-full"
    >
      {theme === "dark" ? (
        <>
          <TileLayer key="dark-base" attribution={TILE_ATTRIBUTION_DARK} url={TILE_URLS.darkBase} />
          <TileLayer key="dark-labels" url={TILE_URLS.darkLabels} />
        </>
      ) : (
        <TileLayer key="light" attribution={TILE_ATTRIBUTION_LIGHT} url={TILE_URLS.light} />
      )}
      {showRoads && <RoadLayer />}
      {showRailway && <RailwayLayer />}
      {showMetro && <MetroLayer />}
      <FlyToLocation location={userLocation} />
      {userLocation && (
        <Marker
          position={[userLocation.lat, userLocation.lng]}
          icon={userLocationIcon()}
          zIndexOffset={2000}
        >
          <Popup>You are here</Popup>
        </Marker>
      )}

      {routeStops.length > 1 && (
        <Polyline
          positions={routeStops.map((p) => [p.coordinates.lat, p.coordinates.lng])}
          pathOptions={{ color: "#D4A017", weight: 4, opacity: 0.9, dashArray: "8,6" }}
        />
      )}
      {routeStops.map((p, i) => (
        <Marker
          key={`route-${p.id}`}
          position={[p.coordinates.lat, p.coordinates.lng]}
          icon={routeMarkerIcon(i)}
          zIndexOffset={1000}
        />
      ))}
      <MarkerClusterGroup chunkedLoading maxClusterRadius={50} disableClusteringAtZoom={16}>
        {pandalsList.map((pandal) => {
          const area = pandal.areaId ? areaById.get(pandal.areaId) : undefined;
          const visited = checkedIn.has(pandal.id);
          return (
            <Marker
              key={pandal.id}
              position={[pandal.coordinates.lat, pandal.coordinates.lng]}
              icon={pinIcon(visited)}
            >
              <Popup>
                <div className="min-w-[200px] max-w-[240px]">
                  <p className="font-bold">{pandal.name}</p>
                  <p className="text-xs text-gray-600">{pandal.region}</p>
                  <p className="text-xs">
                    Size: {pandal.crowdLevel}
                    {pandal.rating !== undefined ? ` · ⭐ ${pandal.rating}` : ""}
                  </p>
                  <button
                    onClick={() => checkIn(pandal)}
                    disabled={visited}
                    className="mt-2 w-full rounded bg-[#8b0000] px-2 py-1 text-xs font-semibold text-white disabled:opacity-50"
                  >
                    {visited ? "Checked in ✓" : `Check in (+${checkinPointsFor(pandal)} pts)`}
                  </button>

                  <StarRow pandal={pandal} />

                  {onAddToRoute && (
                    <button
                      onClick={() => onAddToRoute(pandal)}
                      disabled={routeIds.has(pandal.id)}
                      className="mt-2 w-full rounded border border-[#D4A017] px-2 py-1 text-xs font-semibold text-[#8B5A00] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {routeIds.has(pandal.id) ? "In route ✓" : "+ Add to route"}
                    </button>
                  )}

                  {area && (
                    <div className="mt-2 border-t border-gray-200 pt-2 text-xs">
                      <p className="font-semibold text-[#8b0000]">In {area.name}</p>
                      {area.thingsToDo[0] && <p>🎯 {area.thingsToDo[0]}</p>}
                      {area.cafes[0] && <p>☕ {area.cafes[0].name}</p>}
                      {area.restaurants[0] && <p>🍽️ {area.restaurants[0].name}</p>}
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MarkerClusterGroup>
    </MapContainer>
    </div>
  );
}
