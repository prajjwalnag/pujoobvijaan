"use client";

import { Polyline, CircleMarker, Tooltip, Popup } from "react-leaflet";
import { railStations, railTracks } from "@/data/railway";

const RAIL_COLOR = "#5A5A5A";

export function RailwayLayer() {
  return (
    <>
      {railTracks.map((segment, i) => (
        <Polyline
          key={i}
          positions={segment}
          pathOptions={{ color: RAIL_COLOR, weight: 2, opacity: 0.6, dashArray: "1,5" }}
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
