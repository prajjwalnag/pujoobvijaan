import { pandals } from "./pandals";
import { areas } from "./areas";
import { regions as allRegions } from "./pandals";
import type { CrowdLevel, Pandal } from "./types";

export type GraphNodeKind = "region" | "area" | "pandal";

export interface GraphNode {
  id: string;
  kind: GraphNodeKind;
  label: string;
  crowdLevel?: CrowdLevel;
  count?: number; // for region/area hubs — how many pandals hang off them
}

export type GraphLinkKind = "hierarchy" | "distance";

export interface GraphLink {
  source: string;
  target: string;
  kind: GraphLinkKind;
  distanceKm?: number;
}

// Every pandal connects to its Area (if it has one) or straight to its
// Region (if not yet clustered); every Area also connects up to its
// Region — so the whole dataset forms one connected network: Region ->
// Area -> Pandal, or Region -> Pandal directly for ungrouped ones.
export function buildGraph(): { nodes: GraphNode[]; links: GraphLink[] } {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];

  const regionCounts = new Map<string, number>();
  for (const r of allRegions) regionCounts.set(r, 0);

  for (const area of areas) {
    nodes.push({ id: `area:${area.id}`, kind: "area", label: area.name, count: area.pandalCount });
    links.push({ source: `region:${area.region}`, target: `area:${area.id}`, kind: "hierarchy" });
    regionCounts.set(area.region, (regionCounts.get(area.region) ?? 0) + area.pandalCount);
  }

  for (const p of pandals) {
    nodes.push({ id: `pandal:${p.id}`, kind: "pandal", label: p.name, crowdLevel: p.crowdLevel });
    if (p.areaId) {
      links.push({ source: `area:${p.areaId}`, target: `pandal:${p.id}`, kind: "hierarchy" });
    } else {
      links.push({ source: `region:${p.region}`, target: `pandal:${p.id}`, kind: "hierarchy" });
      regionCounts.set(p.region, (regionCounts.get(p.region) ?? 0) + 1);
    }
  }

  const regionNodes: GraphNode[] = allRegions.map((r) => ({
    id: `region:${r}`,
    kind: "region",
    label: r,
    count: regionCounts.get(r) ?? 0,
  }));

  return { nodes: [...regionNodes, ...nodes], links };
}

export function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const la1 = (a.lat * Math.PI) / 180;
  const la2 = (b.lat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// Connects each pandal to its K nearest neighbours by real haversine
// distance (its own coordinates, geocoded or placeholder alike — so on
// still-placeholder pandals this reads as "nearby within the same
// region jitter," not a verified real-world walking distance). Capped
// to a max radius so pandals on opposite sides of a wide region don't
// get linked just because they're each other's least-far neighbour.
const K_NEAREST = 3;
const MAX_KM = 1.0;

export function buildDistanceLinks(): GraphLink[] {
  const points = pandals.map((p) => ({ id: `pandal:${p.id}`, lat: p.coordinates.lat, lng: p.coordinates.lng }));
  const seen = new Set<string>();
  const links: GraphLink[] = [];

  for (let i = 0; i < points.length; i++) {
    const candidates: { id: string; d: number }[] = [];
    for (let j = 0; j < points.length; j++) {
      if (i === j) continue;
      const d = haversineKm(points[i], points[j]);
      if (d <= MAX_KM) candidates.push({ id: points[j].id, d });
    }
    candidates.sort((a, b) => a.d - b.d);
    for (const c of candidates.slice(0, K_NEAREST)) {
      const key = [points[i].id, c.id].sort().join("|");
      if (seen.has(key)) continue;
      seen.add(key);
      links.push({ source: points[i].id, target: c.id, kind: "distance", distanceKm: c.d });
    }
  }

  return links;
}

// Powers the "Nearby Pandals" suggestions on the Atlas detail panel:
// given a pandal, return its K closest others by real haversine
// distance. Same caveat as buildDistanceLinks — on a pandal that's
// still on a placeholder coordinate, "nearby" only means nearby within
// its region's jitter spread, not a verified real-world distance.
export function nearestPandals(pandalId: string, k = 5): { pandal: Pandal; distanceKm: number }[] {
  const origin = pandals.find((p) => p.id === pandalId);
  if (!origin) return [];
  return pandals
    .filter((p) => p.id !== pandalId)
    .map((p) => ({ pandal: p, distanceKm: haversineKm(origin.coordinates, p.coordinates) }))
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, k);
}

// Same real-distance ranking as nearestPandals, but from an arbitrary
// point rather than another pandal — powers "suggested pandals near me"
// off the device's actual GPS coordinates (see /map's locate button).
export function nearestPandalsToPoint(
  point: { lat: number; lng: number },
  k = 5
): { pandal: Pandal; distanceKm: number }[] {
  return pandals
    .map((p) => ({ pandal: p, distanceKm: haversineKm(point, p.coordinates) }))
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, k);
}
