"use client";

import { useState } from "react";
import { MapPinPlus } from "lucide-react";
import { regions } from "@/data/pandals";
import { nearestPandalsToPoint } from "@/data/graph";
import { tierLabel } from "@/data/tiers";
import type { CrowdLevel, Region } from "@/data/types";

export type PandalDraftInput = (input: {
  code: string;
  name: string;
  region: Region;
  crowdLevel: CrowdLevel;
}) => Promise<{ ok: true } | { ok: false; error: string }>;

const TIERS: CrowdLevel[] = ["high", "medium", "low"];
const fieldClass =
  "h-8 w-full rounded border border-[var(--color-border)] bg-[var(--color-bg-main)] px-2 text-xs outline-none focus:border-[var(--color-red)]";

export function AddPandalPanel({
  placing,
  draft,
  onPlaceToggle,
  onCancel,
  onSave,
}: {
  placing: boolean;
  draft: { lat: number; lng: number } | null;
  onPlaceToggle: () => void;
  onCancel: () => void;
  onSave: PandalDraftInput;
}) {
  const [name, setName] = useState("");
  const [tier, setTier] = useState<CrowdLevel>("medium");
  const [regionOverride, setRegionOverride] = useState<Region | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  // Default the region to that of the closest known pandal, so a pandal
  // dropped in Howrah doesn't silently get filed under North Kolkata.
  const region: Region =
    regionOverride ??
    (draft ? nearestPandalsToPoint(draft, 1)[0]?.pandal.region : undefined) ??
    regions[0];

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return setError("Pandal name is required.");
    if (!code.trim()) return setError("Enter the code.");
    setError(null);
    setSaving(true);
    const result = await onSave({ code: code.trim(), name: name.trim(), region, crowdLevel: tier });
    setSaving(false);
    if (!result.ok) return setError(result.error);
    setName("");
    setCode("");
    setRegionOverride(null);
    setDone(true);
  }

  return (
    <div className="mb-1">
      <button
        onClick={() => {
          setDone(false);
          onPlaceToggle();
        }}
        className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
          placing
            ? "border-[var(--color-red)] bg-[var(--color-bg-tertiary)] font-semibold"
            : "border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-[var(--color-red)]"
        }`}
      >
        <MapPinPlus size={16} />
        {placing ? "Tap the map to place pandal… (cancel)" : "Add Pandal to Map"}
      </button>
      {done && !draft && !placing && (
        <p className="mt-1 text-xs text-[var(--color-text-secondary)]">Pandal added — it&apos;s on the map.</p>
      )}

      {draft && (
        <form
          onSubmit={handleSave}
          className="mt-2 flex flex-col gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-3"
        >
          <p className="text-[11px] text-[var(--color-text-light)]">
            Location: {draft.lat.toFixed(5)}, {draft.lng.toFixed(5)} (drag the pin to adjust)
          </p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Pandal name"
            aria-label="Pandal name"
            className={fieldClass}
          />
          <select
            value={region}
            onChange={(e) => setRegionOverride(e.target.value as Region)}
            aria-label="Region"
            className={fieldClass}
          >
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <div className="flex gap-1.5">
            {TIERS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTier(t)}
                className={`flex-1 rounded-full border px-2 py-1 text-xs font-semibold ${
                  tier === t
                    ? "border-[var(--color-red)] bg-[var(--color-red)] text-white"
                    : "border-[var(--color-border)] text-[var(--color-text-secondary)]"
                }`}
              >
                {tierLabel[t]}
              </button>
            ))}
          </div>
          <input
            type="password"
            inputMode="numeric"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Code"
            aria-label="Code"
            className={fieldClass}
          />
          {error && <p className="text-xs text-[var(--color-red)]">{error}</p>}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-lg bg-[var(--color-red)] px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save pandal"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-xs font-semibold text-[var(--color-text-secondary)]"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
