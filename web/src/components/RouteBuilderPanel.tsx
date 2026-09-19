"use client";

import { useState } from "react";
import { Route, X, Sparkles, Wand2, Trash2 } from "lucide-react";
import { haversineKm } from "@/data/graph";
import { tierColor } from "@/data/tiers";
import { POINTS } from "./PointsProvider";
import type { Pandal } from "@/data/types";

export function RouteBuilderPanel({
  open,
  onToggleOpen,
  routeStops,
  onRemove,
  onMove,
  onOptimize,
  onClear,
  onSave,
}: {
  open: boolean;
  onToggleOpen: () => void;
  routeStops: Pandal[];
  onRemove: (id: string) => void;
  onMove: (index: number, dir: -1 | 1) => void;
  onOptimize: () => void;
  onClear: () => void;
  onSave: (title: string) => void;
}) {
  const [title, setTitle] = useState("");

  let totalKm = 0;
  const legs: number[] = [];
  for (let i = 1; i < routeStops.length; i++) {
    const d = haversineKm(routeStops[i - 1].coordinates, routeStops[i].coordinates);
    legs.push(d);
    totalKm += d;
  }

  function handleSave() {
    if (!title.trim() || routeStops.length < 2) return;
    onSave(title.trim());
    setTitle("");
  }

  return (
    <div>
      <button
        onClick={onToggleOpen}
        className="flex w-full items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 py-2 text-sm hover:border-[var(--color-red)]"
      >
        <Route size={16} />
        Route Builder
        {routeStops.length > 0 && (
          <span className="ml-auto rounded-full bg-[var(--color-red)] px-2 py-0.5 text-[10px] font-bold text-white">
            {routeStops.length}
          </span>
        )}
      </button>

      {open && (
        <div className="mt-2 rounded-lg border-2 border-[var(--color-red)] bg-[var(--color-bg-secondary)] p-3">
          <p className="text-xs text-[var(--color-text-secondary)]">
            Click <b>+ Add to route</b> on any pandal popup to build a route here.
          </p>

          {routeStops.length === 0 ? (
            <p className="mt-2 text-xs italic text-[var(--color-text-light)]">No stops yet.</p>
          ) : (
            <>
              <div className="mt-2 flex flex-col gap-1">
                {routeStops.map((p, i) => (
                  <div key={p.id}>
                    <div className="flex items-center gap-1.5 rounded border border-[var(--color-border)] bg-[var(--color-bg-main)] px-2 py-1">
                      <span
                        className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                        style={{ background: tierColor[p.crowdLevel] }}
                      >
                        {i + 1}
                      </span>
                      <span className="flex-1 truncate text-xs text-[var(--color-text-primary)]">
                        {p.name}
                      </span>
                      <button
                        onClick={() => onMove(i, -1)}
                        disabled={i === 0}
                        aria-label="Move up"
                        className="text-[10px] text-[var(--color-text-light)] disabled:opacity-30"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => onMove(i, 1)}
                        disabled={i === routeStops.length - 1}
                        aria-label="Move down"
                        className="text-[10px] text-[var(--color-text-light)] disabled:opacity-30"
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => onRemove(p.id)}
                        aria-label="Remove stop"
                        className="text-[var(--color-text-light)] hover:text-[var(--color-red)]"
                      >
                        <X size={12} />
                      </button>
                    </div>
                    {i < legs.length && (
                      <p className="py-0.5 pl-7 text-[10px] text-[var(--color-text-light)]">
                        {legs[i] < 1 ? `${Math.round(legs[i] * 1000)} m` : `${legs[i].toFixed(1)} km`} to
                        next
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
                Total: <b>{totalKm.toFixed(1)} km</b> straight-line across {routeStops.length} stops
              </p>

              <div className="mt-2 flex gap-2">
                <button
                  onClick={onOptimize}
                  disabled={routeStops.length < 3}
                  className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-[var(--color-gold)] bg-[var(--color-bg-tertiary)] px-2 py-1.5 text-xs font-semibold text-[var(--color-gold-dark)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Wand2 size={12} />
                  Optimize order
                </button>
                <button
                  onClick={onClear}
                  className="flex items-center justify-center gap-1 rounded-lg border border-[var(--color-border)] px-2 py-1.5 text-xs font-semibold text-[var(--color-text-secondary)] hover:border-[var(--color-red)] hover:text-[var(--color-red)]"
                >
                  <Trash2 size={12} />
                  Clear
                </button>
              </div>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Name this route…"
                className="mt-2 h-9 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-main)] px-2 text-xs outline-none focus:border-2 focus:border-[var(--color-red)]"
              />
              <button
                onClick={handleSave}
                disabled={!title.trim() || routeStops.length < 2}
                className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-[var(--color-red)] px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Sparkles size={12} />
                Save as itinerary (+{POINTS.CREATE_ITINERARY} pts)
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
