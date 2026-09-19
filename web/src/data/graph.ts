import { pandals } from "./pandals";
import { areas } from "./areas";
import { regions as allRegions } from "./pandals";
import type { CrowdLevel } from "./types";

export type GraphNodeKind = "region" | "area" | "pandal";

export interface GraphNode {
  id: string;
  kind: GraphNodeKind;
  label: string;
  crowdLevel?: CrowdLevel;
  count?: number; // for region/area hubs — how many pandals hang off them
}

export interface GraphLink {
  source: string;
  target: string;
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
    links.push({ source: `region:${area.region}`, target: `area:${area.id}` });
    regionCounts.set(area.region, (regionCounts.get(area.region) ?? 0) + area.pandalCount);
  }

  for (const p of pandals) {
    nodes.push({ id: `pandal:${p.id}`, kind: "pandal", label: p.name, crowdLevel: p.crowdLevel });
    if (p.areaId) {
      links.push({ source: `area:${p.areaId}`, target: `pandal:${p.id}` });
    } else {
      links.push({ source: `region:${p.region}`, target: `pandal:${p.id}` });
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
