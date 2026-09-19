"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import type { Pandal } from "@/data/types";
import { areas } from "@/data/areas";
import { useTheme } from "./ThemeProvider";

const areaById = new Map(areas.map((a) => [a.id, a]));

const TILE_URLS = {
  light: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
};
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

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

export function MapView({
  pandalsList,
  checkedIn,
  onCheckIn,
}: {
  pandalsList: Pandal[];
  checkedIn: Set<string>;
  onCheckIn: (id: string) => void;
}) {
  const { theme } = useTheme();

  return (
    <MapContainer
      center={[22.565, 88.35]}
      zoom={12}
      scrollWheelZoom
      className="h-full w-full"
    >
      <TileLayer key={theme} attribution={TILE_ATTRIBUTION} url={TILE_URLS[theme]} />
      {pandalsList.map((pandal) => {
        const area = pandal.areaId ? areaById.get(pandal.areaId) : undefined;
        return (
          <Marker
            key={pandal.id}
            position={[pandal.coordinates.lat, pandal.coordinates.lng]}
            icon={pinIcon(checkedIn.has(pandal.id))}
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
                  onClick={() => onCheckIn(pandal.id)}
                  disabled={checkedIn.has(pandal.id)}
                  className="mt-2 w-full rounded bg-[#8b0000] px-2 py-1 text-xs font-semibold text-white disabled:opacity-50"
                >
                  {checkedIn.has(pandal.id) ? "Checked in ✓" : "Check in (+10 pts)"}
                </button>

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
    </MapContainer>
  );
}
