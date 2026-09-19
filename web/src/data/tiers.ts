import type { CrowdLevel } from "./types";

// Vivid, high-contrast trio — chosen to read clearly against OSM's beige/green tiles.
export const tierColor: Record<CrowdLevel, string> = {
  high: "#E11D2E",
  medium: "#F5A300",
  low: "#0EA5A0",
};

export const tierLabel: Record<CrowdLevel, string> = {
  high: "Big",
  medium: "Medium",
  low: "Small",
};
