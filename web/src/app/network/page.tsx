"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { Network, SlidersHorizontal, X } from "lucide-react";
import { buildGraph, buildDistanceLinks, type GraphNode } from "@/data/graph";
import { tierColor, tierLabel } from "@/data/tiers";

const NetworkGraph = dynamic(() => import("@/components/NetworkGraph").then((m) => m.NetworkGraph), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-[var(--color-text-secondary)]">
      Building network…
    </div>
  ),
});

export default function NetworkPage() {
  const { nodes, links: hierarchyLinks } = useMemo(() => buildGraph(), []);
  const distanceLinks = useMemo(() => buildDistanceLinks(), []);
  const links = useMemo(() => [...hierarchyLinks, ...distanceLinks], [hierarchyLinks, distanceLinks]);
  const [showPandals, setShowPandals] = useState(true);
  const [showDistance, setShowDistance] = useState(true);
  const [selected, setSelected] = useState<GraphNode | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const stats = useMemo(
    () => ({
      regions: nodes.filter((n) => n.kind === "region").length,
      areas: nodes.filter((n) => n.kind === "area").length,
      pandals: nodes.filter((n) => n.kind === "pandal").length,
      distanceLinks: distanceLinks.length,
    }),
    [nodes, distanceLinks]
  );

  return (
    <div className="relative flex h-[calc(100dvh-64px)] flex-col overflow-hidden lg:flex-row">
      <div className="flex-1 p-2 sm:p-4">
        <div className="relative h-full w-full overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] shadow-[var(--shadow-light)]">
          <NetworkGraph
            nodes={nodes}
            links={links}
            showPandals={showPandals}
            showDistance={showDistance}
            onSelect={setSelected}
          />

          {selected && (
            <div className="pointer-events-none absolute inset-x-0 top-3 z-[900] flex justify-center px-3 lg:hidden">
              <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-2 shadow-[var(--shadow-medium)]">
                <span
                  className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{
                    background:
                      selected.kind === "region"
                        ? "#8b5a00"
                        : selected.kind === "area"
                          ? "#d4a017"
                          : selected.crowdLevel
                            ? tierColor[selected.crowdLevel]
                            : "#8b0000",
                  }}
                />
                <span className="max-w-[220px] truncate text-sm font-semibold text-[var(--color-text-primary)]">
                  {selected.label}
                </span>
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Clear selection"
                  className="ml-1 text-[var(--color-text-light)]"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => setPanelOpen(true)}
        className="fixed bottom-5 right-4 z-[1005] flex items-center gap-2 rounded-full bg-[var(--color-red)] px-4 py-3 text-sm font-semibold text-white shadow-lg lg:hidden"
      >
        <SlidersHorizontal size={16} />
        Details
      </button>

      {panelOpen && (
        <div
          className="fixed inset-0 z-[1000] bg-black/40 lg:hidden"
          onClick={() => setPanelOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 right-0 z-[1010] flex w-[85%] max-w-[320px] transform flex-col gap-5 overflow-y-auto border-l border-[var(--color-border)] bg-[var(--color-bg-main)] p-4 transition-transform duration-200 lg:static lg:z-auto lg:w-[320px] lg:translate-x-0 ${
          panelOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setPanelOpen(false)}
          aria-label="Close details"
          className="absolute left-3 top-3 z-10 rounded-full bg-[var(--color-bg-secondary)] p-1.5 text-[var(--color-text-secondary)] lg:hidden"
        >
          <X size={16} />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <Network className="text-[var(--color-red)]" size={22} />
            <h1 className="text-xl font-bold text-[var(--color-text-primary)]">Network</h1>
          </div>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Every pandal, connected by real location — region → area → pandal, plus dashed
            links straight between pandals within ~1km of each other. Drag nodes, scroll to
            zoom, click a node to trace its connections.
          </p>
        </div>

        <div className="flex gap-3">
          <div className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-2 text-center">
            <p className="text-lg font-bold text-[var(--color-red)]">{stats.regions}</p>
            <p className="text-[10px] uppercase tracking-wide text-[var(--color-text-light)]">Regions</p>
          </div>
          <div className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-2 text-center">
            <p className="text-lg font-bold text-[var(--color-red)]">{stats.areas}</p>
            <p className="text-[10px] uppercase tracking-wide text-[var(--color-text-light)]">Areas</p>
          </div>
          <div className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-2 text-center">
            <p className="text-lg font-bold text-[var(--color-red)]">{stats.pandals}</p>
            <p className="text-[10px] uppercase tracking-wide text-[var(--color-text-light)]">Pandals</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowPandals((v) => !v)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
              showPandals
                ? "border-[var(--color-red)] bg-[var(--color-red)] text-white"
                : "border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]"
            }`}
          >
            {showPandals ? "Showing all pandal nodes" : "Regions + Areas only"}
          </button>
          <button
            onClick={() => setShowDistance((v) => !v)}
            disabled={!showPandals}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40 ${
              showDistance
                ? "border-[#4a90d9] bg-[#4a90d9] text-white"
                : "border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]"
            }`}
          >
            Distance links ({stats.distanceLinks})
          </button>
        </div>

        <div>
          <h2 className="mb-2 text-xs font-bold uppercase tracking-wide text-[var(--color-text-secondary)]">
            Selected
          </h2>
          {selected ? (
            <div className="rounded-lg border-2 border-[var(--color-red)] bg-[var(--color-bg-secondary)] p-3">
              <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--color-text-light)]">
                {selected.kind}
              </p>
              <p className="font-semibold text-[var(--color-text-primary)]">{selected.label}</p>
              {selected.kind !== "pandal" && (
                <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                  {selected.count} pandal{selected.count === 1 ? "" : "s"} connected
                </p>
              )}
              {selected.kind === "pandal" && selected.crowdLevel && (
                <span
                  className="mt-1.5 inline-block rounded-full px-2 py-0.5 text-[11px] font-bold text-white"
                  style={{ background: tierColor[selected.crowdLevel] }}
                >
                  {tierLabel[selected.crowdLevel]}
                </span>
              )}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-[var(--color-border)] p-3 text-xs text-[var(--color-text-light)]">
              Click a node to see what it's connected to.
            </div>
          )}
        </div>

        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] p-3">
          <h2 className="mb-2 text-xs font-bold uppercase tracking-wide text-[var(--color-text-secondary)]">
            Legend
          </h2>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="inline-block h-3.5 w-3.5 rounded-full border-2 border-white bg-[#8b5a00]" />
              <span className="text-[var(--color-text-secondary)]">Region (8)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full border-2 border-white bg-[var(--color-gold)]" />
              <span className="text-[var(--color-text-secondary)]">Area (16 real clusters)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#E11D2E]" />
              <span className="text-[var(--color-text-secondary)]">Pandal — Big</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#F5820C]" />
              <span className="text-[var(--color-text-secondary)]">Pandal — Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#15A34A]" />
              <span className="text-[var(--color-text-secondary)]">Pandal — Small</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-0 w-4 border-t-2 border-dashed border-[#4a90d9]" />
              <span className="text-[var(--color-text-secondary)]">Distance link (≤1km apart)</span>
            </div>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-light)]">
            A pandal links to its Area when one's been mapped (see /atlas); otherwise it links
            straight to its Region. Dashed lines connect each pandal to its 3 nearest
            neighbours by real haversine distance — on a pandal still using a placeholder
            coordinate (not yet geocoded), that reads as "nearby within the region jitter,"
            not a verified real-world distance. This is the same underlying dataset as the
            rest of the app — nothing here is invented for the graph.
          </p>
        </div>
      </div>
    </div>
  );
}
