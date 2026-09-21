"use client";

import { useMemo, useState } from "react";
import { Plus, X, GripVertical, Footprints, Bus, Sparkles } from "lucide-react";
import { pandals } from "@/data/pandals";
import { tierColor } from "@/data/tiers";
import { usePoints, POINTS } from "./PointsProvider";
import type { Itinerary } from "@/data/types";

// Simple default schedule: first stop 4:00 PM, +1h per stop after,
// wrapping past midnight for long routes.
function nextTime(index: number) {
  const hour24 = (16 + index) % 24;
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  const suffix = hour24 < 12 ? "AM" : "PM";
  return `${hour12}:00 ${suffix}`;
}

export function ItineraryBuilder({ onCreate }: { onCreate: (itinerary: Itinerary) => void }) {
  const { refreshPoints } = usePoints();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [mode, setMode] = useState<"walk" | "transit">("walk");
  const [search, setSearch] = useState("");
  const [stopIds, setStopIds] = useState<string[]>([]);

  const results = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return pandals.filter((p) => p.name.toLowerCase().includes(q) && !stopIds.includes(p.id)).slice(0, 6);
  }, [search, stopIds]);

  const stopPandals = stopIds.map((id) => pandals.find((p) => p.id === id)!).filter(Boolean);

  function addStop(id: string) {
    setStopIds((prev) => [...prev, id]);
    setSearch("");
  }

  function removeStop(id: string) {
    setStopIds((prev) => prev.filter((x) => x !== id));
  }

  function moveStop(index: number, dir: -1 | 1) {
    setStopIds((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function reset() {
    setTitle("");
    setMode("walk");
    setSearch("");
    setStopIds([]);
    setOpen(false);
  }

  async function handleSave() {
    if (!title.trim() || stopIds.length < 2) return;
    const itinerary: Itinerary = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      description: `Your custom route — ${stopIds.length} stops.`,
      mode,
      stops: stopIds.map((pandalId, i) => ({ pandalId, scheduledTime: nextTime(i) })),
    };
    await onCreate(itinerary);
    await refreshPoints();
    reset();
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 text-sm font-semibold text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-red)] hover:text-[var(--color-red)]"
      >
        <Plus size={16} />
        Build your own itinerary (+{POINTS.CREATE_ITINERARY} pts)
      </button>
    );
  }

  return (
    <div className="rounded-xl border-2 border-[var(--color-red)] bg-[var(--color-bg-secondary)] p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[var(--color-text-primary)]">New Itinerary</h2>
        <button
          onClick={reset}
          aria-label="Cancel"
          className="rounded-full p-1 text-[var(--color-text-light)] hover:text-[var(--color-red)]"
        >
          <X size={18} />
        </button>
      </div>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Itinerary name, e.g. My Puja Evening"
        className="mt-3 h-10 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-main)] px-3 text-sm outline-none focus:border-2 focus:border-[var(--color-red)]"
      />

      <div className="mt-2 flex gap-2">
        {(["walk", "transit"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex items-center gap-1.5 rounded-full border-2 px-3 py-1 text-xs font-bold ${
              mode === m
                ? "border-[var(--color-red)] bg-[var(--color-red)] text-white"
                : "border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-text-secondary)]"
            }`}
          >
            {m === "walk" ? <Footprints size={12} /> : <Bus size={12} />}
            {m === "walk" ? "Walking route" : "Needs transit"}
          </button>
        ))}
      </div>

      <div className="relative mt-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search a pandal to add…"
          className="h-10 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-main)] px-3 text-sm outline-none focus:border-2 focus:border-[var(--color-red)]"
        />
        {results.length > 0 && (
          <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] shadow-[var(--shadow-medium)]">
            {results.map((p) => (
              <button
                key={p.id}
                onClick={() => addStop(p.id)}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[var(--color-bg-tertiary)]"
              >
                <span
                  className="inline-block h-2 w-2 flex-shrink-0 rounded-full"
                  style={{ background: tierColor[p.crowdLevel] }}
                />
                <span className="truncate text-[var(--color-text-primary)]">{p.name}</span>
                <span className="ml-auto flex-shrink-0 text-xs text-[var(--color-text-light)]">
                  {p.region}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {stopPandals.length > 0 && (
        <div className="mt-3 flex flex-col gap-1.5">
          {stopPandals.map((p, i) => (
            <div
              key={p.id}
              className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-main)] px-2 py-1.5"
            >
              <GripVertical size={13} className="text-[var(--color-text-light)]" />
              <span
                className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                style={{ background: tierColor[p.crowdLevel] }}
              >
                {i + 1}
              </span>
              <span className="flex-1 truncate text-sm text-[var(--color-text-primary)]">{p.name}</span>
              <button
                onClick={() => moveStop(i, -1)}
                disabled={i === 0}
                className="text-xs text-[var(--color-text-light)] disabled:opacity-30"
                aria-label="Move up"
              >
                ↑
              </button>
              <button
                onClick={() => moveStop(i, 1)}
                disabled={i === stopPandals.length - 1}
                className="text-xs text-[var(--color-text-light)] disabled:opacity-30"
                aria-label="Move down"
              >
                ↓
              </button>
              <button
                onClick={() => removeStop(p.id)}
                aria-label="Remove stop"
                className="text-[var(--color-text-light)] hover:text-[var(--color-red)]"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={!title.trim() || stopIds.length < 2}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-red)] px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Sparkles size={14} />
        Save itinerary (+{POINTS.CREATE_ITINERARY} pts)
      </button>
      {stopIds.length < 2 && (
        <p className="mt-1.5 text-center text-xs text-[var(--color-text-light)]">
          Add at least 2 stops to save.
        </p>
      )}
    </div>
  );
}
