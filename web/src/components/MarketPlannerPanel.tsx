"use client";

import { useState } from "react";
import { ShoppingBag, MapPin, Trash2, Route } from "lucide-react";
import type { MarketPin } from "@/data/types";

const RADIUS_OPTIONS = [1, 2, 3, 5];

export function MarketPlannerPanel({
  market,
  placing,
  onNameChange,
  onPlaceToggle,
  onRemove,
  onPlan,
  message,
}: {
  market: MarketPin | null;
  placing: boolean;
  onNameChange: (name: string) => void;
  onPlaceToggle: () => void;
  onRemove: () => void;
  onPlan: (opts: { radiusKm: number; maxStops: number }) => void;
  message: string | null;
}) {
  const [radiusKm, setRadiusKm] = useState(2);
  const [maxStops, setMaxStops] = useState(5);

  return (
    <div className="mb-1">
      <button
        onClick={onPlaceToggle}
        className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
          placing
            ? "border-[var(--color-red)] bg-[var(--color-bg-tertiary)] font-semibold"
            : "border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-[var(--color-red)]"
        }`}
      >
        <ShoppingBag size={16} />
        {placing ? "Tap the map to drop market… (cancel)" : market ? "Move Market" : "Add Market to Map"}
      </button>

      {market && (
        <div className="mt-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-3">
          <div className="flex items-center gap-1.5">
            <MapPin size={14} className="flex-shrink-0 text-[#7B3FA0]" />
            <input
              type="text"
              value={market.name}
              onChange={(e) => onNameChange(e.target.value)}
              aria-label="Market name"
              placeholder="Market name"
              className="h-8 min-w-0 flex-1 rounded border border-[var(--color-border)] bg-[var(--color-bg-main)] px-2 text-xs outline-none focus:border-[var(--color-red)]"
            />
            <button
              onClick={onRemove}
              aria-label="Remove market"
              className="text-[var(--color-text-light)] hover:text-[var(--color-red)]"
            >
              <Trash2 size={14} />
            </button>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-[var(--color-text-secondary)]">
            <label className="flex flex-col gap-1">
              Within
              <select
                value={radiusKm}
                onChange={(e) => setRadiusKm(Number(e.target.value))}
                className="h-8 rounded border border-[var(--color-border)] bg-[var(--color-bg-main)] px-1"
              >
                {RADIUS_OPTIONS.map((r) => (
                  <option key={r} value={r}>
                    {r} km
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1">
              Max stops
              <select
                value={maxStops}
                onChange={(e) => setMaxStops(Number(e.target.value))}
                className="h-8 rounded border border-[var(--color-border)] bg-[var(--color-bg-main)] px-1"
              >
                {[3, 4, 5, 6, 8].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <button
            onClick={() => onPlan({ radiusKm, maxStops })}
            className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-[var(--color-red)] px-3 py-2 text-xs font-semibold text-white"
          >
            <Route size={12} />
            Plan route near big &amp; medium pujas
          </button>
          {message && <p className="mt-2 text-xs text-[var(--color-text-secondary)]">{message}</p>}
        </div>
      )}
    </div>
  );
}
