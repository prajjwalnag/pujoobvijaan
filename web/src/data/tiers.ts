import type { CrowdLevel } from "./types";

// Red / orange / green intensity scale — reads clearly against OSM's beige map tiles.
export const tierColor: Record<CrowdLevel, string> = {
  high: "#E11D2E",
  medium: "#F5820C",
  low: "#15A34A",
};

export const tierLabel: Record<CrowdLevel, string> = {
  high: "Big",
  medium: "Medium",
  low: "Small",
};
