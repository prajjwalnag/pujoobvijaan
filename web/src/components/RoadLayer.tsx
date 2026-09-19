"use client";

import { Polyline, Tooltip } from "react-leaflet";
import { roadSegments } from "@/data/roads";

// A blue/indigo family, kept deliberately apart from the red/orange/green
// pandal tiers, gold areas, brown railway and Metro's own line colors.
const CLASS_STYLE = {
  motorway: { color: "#3949AB", weight: 4 },
  trunk: { color: "#5C6BC0", weight: 3 },
  primary: { color: "#8C9EFF", weight: 1.5 },
} as const;

export function RoadLayer() {
  return (
    <>
      {roadSegments.map((seg, i) => (
        <Polyline
          key={i}
          positions={seg.path}
          pathOptions={{ ...CLASS_STYLE[seg.cls], opacity: 0.75 }}
        >
          {seg.name && (
            <Tooltip sticky className="pandal-tooltip">
              {seg.name}
            </Tooltip>
          )}
        </Polyline>
      ))}
    </>
  );
}
