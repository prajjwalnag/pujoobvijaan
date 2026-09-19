"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import type { Pandal, Area } from "@/data/types";

const areaByIdMap = (areasList: Area[]) => new Map(areasList.map((a) => [a.id, a]));

const tierColor: Record<Pandal["crowdLevel"], string> = {
  high: "#c1272d",
  medium: "#c98a10",
  low: "#8c7b6b",
};
const tierLabel: Record<Pandal["crowdLevel"], string> = {
  high: "Big",
  medium: "Medium",
  low: "Small",
};

function pandalIcon(pandal: Pandal, selected: boolean) {
  const color = tierColor[pandal.crowdLevel];
  const size = pandal.crowdLevel === "high" ? 16 : pandal.crowdLevel === "medium" ? 13 : 11;
  const html = renderToStaticMarkup(
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: pandal.geocoded ? color : "transparent",
        opacity: pandal.geocoded ? 0.95 : 0.9,
        border: pandal.geocoded
          ? `2px solid ${selected ? "#2a1a1a" : "white"}`
          : `2px dashed ${color}`,
        boxShadow: selected ? "0 0 0 3px rgba(212,160,23,0.55)" : "0 1px 4px rgba(0,0,0,0.35)",
      }}
    />
  );
  return L.divIcon({
    html,
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
}

function areaIcon(highlighted: boolean) {
  const size = highlighted ? 26 : 20;
  const html = renderToStaticMarkup(
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "rgba(212,160,23,0.28)",
        border: `1.5px solid ${highlighted ? "#b8860b" : "#d4a017"}`,
      }}
    />
  );
  return L.divIcon({ html, className: "", iconSize: [size, size], iconAnchor: [size / 2, size / 2] });
}

export function AtlasMapView({
  pandalsList,
  areasList,
  selectedAreaId,
  onSelectPandal,
  onSelectArea,
}: {
  pandalsList: Pandal[];
  areasList: Area[];
  selectedAreaId: string | null;
  onSelectPandal: (p: Pandal) => void;
  onSelectArea: (id: string) => void;
}) {
  const areaById = areaByIdMap(areasList);

  return (
    <MapContainer center={[22.565, 88.35]} zoom={12} scrollWheelZoom className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {areasList.map((area) => (
        <Marker
          key={area.id}
          position={[area.center.lat, area.center.lng]}
          icon={areaIcon(area.id === selectedAreaId)}
          eventHandlers={{ click: () => onSelectArea(area.id) }}
          zIndexOffset={-1000}
        >
          <Popup>
            <div className="min-w-[180px]">
              <p className="font-bold text-[#8b0000]">{area.name}</p>
              <p className="text-xs text-gray-600">{area.pandalCount} pandals nearby</p>
            </div>
          </Popup>
        </Marker>
      ))}

      {pandalsList.map((pandal) => {
        const area = pandal.areaId ? areaById.get(pandal.areaId) : undefined;
        return (
          <Marker
            key={pandal.id}
            position={[pandal.coordinates.lat, pandal.coordinates.lng]}
            icon={pandalIcon(pandal, false)}
            eventHandlers={{ click: () => onSelectPandal(pandal) }}
          >
            <Popup>
              <div className="min-w-[200px] max-w-[240px]">
                <p className="font-bold">{pandal.name}</p>
                <p className="text-xs text-gray-600">{pandal.region}</p>
                <p className="text-xs">
                  {tierLabel[pandal.crowdLevel]} ·{" "}
                  {pandal.geocoded ? "geocoded location" : "placeholder location"}
                </p>
                {area && (
                  <div className="mt-2 border-t border-gray-200 pt-2 text-xs">
                    <p className="font-semibold text-[#8b0000]">In {area.name}</p>
                    {!pandal.geocoded && (
                      <p className="italic text-gray-500">
                        Not individually geocoded — clustered near this area.
                      </p>
                    )}
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
