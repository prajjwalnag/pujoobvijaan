"use client";

import { MapContainer, TileLayer, Marker, Popup, Tooltip, Circle } from "react-leaflet";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import type { Pandal, Area } from "@/data/types";
import { tierColor, tierLabel } from "@/data/tiers";

const areaByIdMap = (areasList: Area[]) => new Map(areasList.map((a) => [a.id, a]));

const tierSize: Record<Pandal["crowdLevel"], number> = {
  high: 34,
  medium: 27,
  low: 21,
};

function pinSvg(color: string, size: number, hollow: boolean) {
  // Classic map-pin (teardrop) shape, bigger + bolder than a plain dot.
  const fill = hollow ? "white" : color;
  const stroke = hollow ? color : "white";
  const strokeWidth = hollow ? 3 : 2.5;
  const dash = hollow ? "3,3" : "0";
  return `
    <svg width="${size}" height="${size * 1.28}" viewBox="0 0 24 30.7" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 3px rgba(0,0,0,0.45));">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 9 12 18.7 12 18.7S24 21 24 12C24 5.37 18.63 0 12 0z"
        fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-dasharray="${dash}" />
      <circle cx="12" cy="12" r="5" fill="${hollow ? color : "white"}" opacity="${hollow ? 1 : 0.95}" />
    </svg>`;
}

function pandalIcon(pandal: Pandal) {
  const color = tierColor[pandal.crowdLevel];
  const size = tierSize[pandal.crowdLevel];
  const html = renderToStaticMarkup(
    <div dangerouslySetInnerHTML={{ __html: pinSvg(color, size, !pandal.geocoded) }} />
  );
  return L.divIcon({
    html,
    className: "",
    iconSize: [size, size * 1.28],
    iconAnchor: [size / 2, size * 1.28],
    popupAnchor: [0, -size * 1.1],
    tooltipAnchor: [0, -size * 0.9],
  });
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

      {areasList.map((area) => {
        const highlighted = area.id === selectedAreaId;
        return (
          <Circle
            key={area.id}
            center={[area.center.lat, area.center.lng]}
            radius={1300}
            pathOptions={{
              color: "#D4A017",
              weight: highlighted ? 3 : 1.5,
              fillColor: "#F2C94C",
              fillOpacity: highlighted ? 0.32 : 0.14,
              opacity: highlighted ? 0.9 : 0.55,
            }}
            eventHandlers={{ click: () => onSelectArea(area.id) }}
          >
            <Tooltip direction="center" permanent className="area-glow-label">
              <span style={{ fontWeight: 800, color: "#8B5A00" }}>{area.name}</span>
            </Tooltip>
            <Popup>
              <div className="min-w-[180px]">
                <p className="font-bold text-[#8b0000]">{area.name}</p>
                <p className="text-xs text-gray-600">{area.pandalCount} pandals nearby</p>
              </div>
            </Popup>
          </Circle>
        );
      })}

      {pandalsList.map((pandal) => {
        const area = pandal.areaId ? areaById.get(pandal.areaId) : undefined;
        return (
          <Marker
            key={pandal.id}
            position={[pandal.coordinates.lat, pandal.coordinates.lng]}
            icon={pandalIcon(pandal)}
            eventHandlers={{ click: () => onSelectPandal(pandal) }}
          >
            <Tooltip direction="top" opacity={0.95} className="pandal-tooltip">
              {pandal.name}
            </Tooltip>
            <Popup>
              <div className="min-w-[200px] max-w-[240px]">
                <p className="font-bold">{pandal.name}</p>
                <p className="text-xs text-gray-600">{pandal.region}</p>
                <p className="text-xs">
                  <span style={{ color: tierColor[pandal.crowdLevel], fontWeight: 700 }}>
                    {tierLabel[pandal.crowdLevel]}
                  </span>{" "}
                  · {pandal.geocoded ? "geocoded location" : "placeholder location"}
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
