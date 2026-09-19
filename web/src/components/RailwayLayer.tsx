"use client";

import { Polyline, CircleMarker, Tooltip, Popup } from "react-leaflet";
import { railStations, railTracks } from "@/data/railway";

// Real Indian Railways maps conventionally use brown for railway lines
// (metro/subway lines get blue/green/etc.) — keeping that convention
// here rather than inventing a division color-split we can't verify
// from the raw OSM track data (no route relations to key off).
const RAIL_COLOR = "#8B4513";

export function RailwayLayer() {
  return (
    <>
      {railTracks.map((segment, i) => (
        <Polyline
          key={i}
          positions={segment}
          pathOptions={{ color: RAIL_COLOR, weight: 3, opacity: 0.85, dashArray: "1,6" }}
        />
      ))}
      {railStations.map((station, i) => (
        <CircleMarker
          key={i}
          center={[station.lat, station.lng]}
          radius={3.5}
          pathOptions={{
            color: RAIL_COLOR,
            weight: 1.5,
            fillColor: "#fff",
            fillOpacity: 1,
          }}
        >
          <Tooltip direction="top" className="pandal-tooltip">
            {station.name}
          </Tooltip>
          <Popup>
            <div className="min-w-[150px]">
              <p className="font-bold">{station.name}</p>
              <p className="text-xs" style={{ color: RAIL_COLOR }}>
                Suburban Railway
              </p>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </>
  );
}
