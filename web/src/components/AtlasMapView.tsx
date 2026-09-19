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

// No real address for cafes/restaurants — scatter them deterministically
// around their area's centre, inside the territory circle, using the
// golden angle so points spread evenly instead of radiating in a line.
function offsetLatLng(center: { lat: number; lng: number }, index: number) {
  const angle = index * 137.5 * (Math.PI / 180);
  const distanceM = 350 + index * 160;
  const dLat = (distanceM * Math.cos(angle)) / 111320;
  const dLng = (distanceM * Math.sin(angle)) / (111320 * Math.cos((center.lat * Math.PI) / 180));
  return { lat: center.lat + dLat, lng: center.lng + dLng };
}

function poiIcon(kind: "cafe" | "restaurant") {
  const bg = kind === "cafe" ? "#A9762F" : "#7A1F1F";
  const emoji = kind === "cafe" ? "☕" : "🍽️";
  const html = renderToStaticMarkup(
    <div
      style={{
        width: 24,
        height: 24,
        borderRadius: "50%",
        background: bg,
        border: "2px solid white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
      }}
    >
      {emoji}
    </div>
  );
  return L.divIcon({ html, className: "", iconSize: [24, 24], iconAnchor: [12, 12], popupAnchor: [0, -12] });
}

export function AtlasMapView({
  pandalsList,
  areasList,
  focusedAreaId,
  onSelectPandal,
  onSelectArea,
  showFood = true,
}: {
  pandalsList: Pandal[];
  areasList: Area[];
  focusedAreaId: string | null;
  onSelectPandal: (p: Pandal) => void;
  onSelectArea: (id: string) => void;
  showFood?: boolean;
}) {
  const areaById = areaByIdMap(areasList);

  return (
    <MapContainer center={[22.565, 88.35]} zoom={12} scrollWheelZoom className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {areasList.map((area) => {
        const highlighted = area.id === focusedAreaId;
        return (
          <Circle
            key={area.id}
            center={[area.center.lat, area.center.lng]}
            radius={1700}
            pathOptions={{
              color: "#D4A017",
              weight: highlighted ? 4 : 2,
              fillColor: "#F2C94C",
              fillOpacity: highlighted ? 0.36 : 0.18,
              opacity: highlighted ? 0.95 : 0.6,
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

      {showFood &&
        areasList.flatMap((area) => {
          const cafeMarkers = area.cafes.map((place, i) => {
            const pos = offsetLatLng(area.center, i * 2);
            return (
              <Marker key={area.id + "-cafe-" + i} position={[pos.lat, pos.lng]} icon={poiIcon("cafe")}>
                <Tooltip direction="top" opacity={0.95} className="pandal-tooltip">
                  ☕ {place.name}
                </Tooltip>
                <Popup>
                  <div className="min-w-[180px]">
                    <p className="font-bold">☕ {place.name}</p>
                    {place.note && <p className="text-xs text-gray-600">{place.note}</p>}
                    <p className="mt-1 text-xs italic text-gray-500">
                      Approximate spot within {area.name} — not a geocoded address.
                    </p>
                  </div>
                </Popup>
              </Marker>
            );
          });
          const foodMarkers = area.restaurants.map((place, i) => {
            const pos = offsetLatLng(area.center, i * 2 + 1);
            return (
              <Marker key={area.id + "-food-" + i} position={[pos.lat, pos.lng]} icon={poiIcon("restaurant")}>
                <Tooltip direction="top" opacity={0.95} className="pandal-tooltip">
                  🍽️ {place.name}
                </Tooltip>
                <Popup>
                  <div className="min-w-[180px]">
                    <p className="font-bold">🍽️ {place.name}</p>
                    {place.note && <p className="text-xs text-gray-600">{place.note}</p>}
                    <p className="mt-1 text-xs italic text-gray-500">
                      Approximate spot within {area.name} — not a geocoded address.
                    </p>
                  </div>
                </Popup>
              </Marker>
            );
          });
          return [...cafeMarkers, ...foodMarkers];
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
