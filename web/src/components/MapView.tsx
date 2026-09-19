"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import type { Pandal } from "@/data/types";

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
  return (
    <MapContainer
      center={[22.565, 88.35]}
      zoom={12}
      scrollWheelZoom
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {pandalsList.map((pandal) => (
        <Marker
          key={pandal.id}
          position={[pandal.coordinates.lat, pandal.coordinates.lng]}
          icon={pinIcon(checkedIn.has(pandal.id))}
        >
          <Popup>
            <div className="min-w-[180px]">
              <p className="font-bold">{pandal.name}</p>
              <p className="text-xs text-gray-600">{pandal.region}</p>
              <p className="text-xs">
                Crowd: {pandal.crowdLevel} · ⭐ {pandal.rating}
              </p>
              <button
                onClick={() => onCheckIn(pandal.id)}
                disabled={checkedIn.has(pandal.id)}
                className="mt-2 w-full rounded bg-[#8b0000] px-2 py-1 text-xs font-semibold text-white disabled:opacity-50"
              >
                {checkedIn.has(pandal.id) ? "Checked in ✓" : "Check in (+10 pts)"}
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
