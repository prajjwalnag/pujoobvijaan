"use client";

import { Polyline, CircleMarker, Tooltip, Popup } from "react-leaflet";
import { metroLines } from "@/data/metro";

export function MetroLayer() {
  return (
    <>
      {metroLines.map((line) => (
        <Polyline
          key={line.id}
          positions={line.path.map((p) => [p.lat, p.lng])}
          pathOptions={{ color: line.color, weight: 4, opacity: 0.85 }}
        >
          <Tooltip sticky className="pandal-tooltip">
            {line.name}
          </Tooltip>
        </Polyline>
      ))}
      {metroLines.map((line) =>
        line.stations.map((station, i) => (
          <CircleMarker
            key={`${line.id}-${i}`}
            center={[station.lat, station.lng]}
            radius={4}
            pathOptions={{
              color: line.color,
              weight: 2,
              fillColor: "#fff",
              fillOpacity: 1,
            }}
          >
            <Tooltip direction="top" className="pandal-tooltip">
              {station.name ?? "Metro station"}
            </Tooltip>
            <Popup>
              <div className="min-w-[160px]">
                <p className="font-bold">{station.name ?? "Unnamed station"}</p>
                <p className="text-xs" style={{ color: line.color }}>
                  {line.name}
                </p>
              </div>
            </Popup>
          </CircleMarker>
        ))
      )}
    </>
  );
}
