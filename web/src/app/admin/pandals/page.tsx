"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPinPlus, Trash2, Copy, LocateFixed } from "lucide-react";
import { regions } from "@/data/pandals";
import { tierLabel } from "@/data/tiers";
import { useAddedPandals } from "@/components/useAddedPandals";
import { Button } from "@/components/Button";
import type { CrowdLevel, Pandal, Region } from "@/data/types";

const TIERS: CrowdLevel[] = ["high", "medium", "low"];
const inputClass =
  "rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-main)] px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-red)]";

function toSnippet(p: Pandal) {
  return `  {
    id: ${JSON.stringify(p.id)},
    name: ${JSON.stringify(p.name)},
    region: ${JSON.stringify(p.region)},
    coordinates: { lat: ${p.coordinates.lat}, lng: ${p.coordinates.lng} },
    crowdLevel: ${JSON.stringify(p.crowdLevel)} as CrowdLevel,
    geocoded: true,
  },`;
}

// Reachable only behind the admin password session (see src/proxy.ts) —
// i.e. only Make with Rex can add pandal locations.
export default function AdminPandalsPage() {
  const { addedPandals, addPandal, removePandal } = useAddedPandals();

  const [name, setName] = useState("");
  const [region, setRegion] = useState<Region>(regions[0]);
  const [tier, setTier] = useState<CrowdLevel>("medium");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  function useMyLocation() {
    if (!navigator.geolocation) {
      setError("Geolocation isn't supported on this device/browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude.toFixed(6));
        setLng(pos.coords.longitude.toFixed(6));
        setError(null);
      },
      () => setError("Couldn't get your location. Enter coordinates manually.")
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const latN = Number(lat);
    const lngN = Number(lng);
    if (!name.trim()) return setError("Pandal name is required.");
    if (!lat.trim() || !lng.trim() || !Number.isFinite(latN) || !Number.isFinite(lngN)) {
      return setError("Valid latitude and longitude are required.");
    }
    if (latN < 21.5 || latN > 23.5 || lngN < 87.5 || lngN > 89) {
      return setError("Those coordinates are outside the Kolkata area — check lat/lng order.");
    }
    setError(null);
    addPandal({
      id: `admin-${Date.now()}`,
      name: name.trim(),
      region,
      coordinates: { lat: latN, lng: lngN },
      crowdLevel: tier,
      geocoded: true,
    });
    setName("");
    setLat("");
    setLng("");
  }

  async function copySnippet(p: Pandal) {
    try {
      await navigator.clipboard.writeText(toSnippet(p));
      setCopied(p.id);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      setError("Couldn't copy to clipboard.");
    }
  }

  return (
    <div className="mx-auto max-w-[700px] px-4 py-8 sm:px-6">
      <div className="flex items-center gap-2">
        <MapPinPlus className="text-[var(--color-red)]" size={28} />
        <h1 className="text-[32px] font-bold text-[var(--color-text-primary)]">Pandals</h1>
      </div>
      <p className="mt-1 text-[var(--color-text-secondary)]">
        Add a new pandal location. Only Make with Rex can do this (this page needs the admin login).
        Like partners, pandals added here are saved only in <strong>this browser</strong> and show on{" "}
        <code className="rounded bg-[var(--color-bg-tertiary)] px-1.5 py-0.5 text-sm">/map</code>.
        To publish one for everyone, use <b>Copy snippet</b> and paste it into{" "}
        <code className="rounded bg-[var(--color-bg-tertiary)] px-1.5 py-0.5 text-sm">
          src/data/pandals.ts
        </code>
        .
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 flex flex-col gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5"
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="pandal-name" className="text-sm font-semibold text-[var(--color-text-primary)]">
            Pandal name
          </label>
          <input
            id="pandal-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Example Para Sarbojanin Durgotsab"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="pandal-region" className="text-sm font-semibold text-[var(--color-text-primary)]">
            Region
          </label>
          <select
            id="pandal-region"
            value={region}
            onChange={(e) => setRegion(e.target.value as Region)}
            className={inputClass}
          >
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-[var(--color-text-primary)]">Size</span>
          <div className="flex gap-2">
            {TIERS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTier(t)}
                className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors ${
                  tier === t
                    ? "border-[var(--color-red)] bg-[var(--color-red)] text-white"
                    : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-red)]"
                }`}
              >
                {tierLabel[t]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="pandal-lat" className="text-sm font-semibold text-[var(--color-text-primary)]">
              Latitude
            </label>
            <input
              id="pandal-lat"
              inputMode="decimal"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              placeholder="22.5726"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="pandal-lng" className="text-sm font-semibold text-[var(--color-text-primary)]">
              Longitude
            </label>
            <input
              id="pandal-lng"
              inputMode="decimal"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              placeholder="88.3639"
              className={inputClass}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={useMyLocation}
          className="flex items-center justify-center gap-1.5 rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm font-semibold text-[var(--color-text-secondary)] hover:border-[var(--color-red)] hover:text-[var(--color-red)]"
        >
          <LocateFixed size={14} />
          Use my current location
        </button>

        {error && <p className="text-sm text-[var(--color-red)]">{error}</p>}

        <Button type="submit">Add Pandal</Button>
      </form>

      {addedPandals.length > 0 && (
        <div className="mt-6">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wide text-[var(--color-text-secondary)]">
            Added in this browser ({addedPandals.length})
          </h2>
          <div className="flex flex-col gap-2">
            {addedPandals.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-3"
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">{p.name}</p>
                  <p className="text-xs text-[var(--color-text-light)]">
                    {p.region} · {tierLabel[p.crowdLevel]} · {p.coordinates.lat}, {p.coordinates.lng}
                  </p>
                </div>
                <button
                  onClick={() => copySnippet(p)}
                  aria-label={`Copy snippet for ${p.name}`}
                  className="flex items-center gap-1 text-xs font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-red)]"
                >
                  <Copy size={14} />
                  {copied === p.id ? "Copied" : "Copy snippet"}
                </button>
                <button
                  onClick={() => removePandal(p.id)}
                  aria-label={`Remove ${p.name}`}
                  className="text-[var(--color-text-light)] hover:text-[var(--color-red)]"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <Link
        href="/admin"
        className="mt-6 flex items-center justify-center gap-2 rounded-lg border border-dashed border-[var(--color-border)] p-3 text-sm font-semibold text-[var(--color-text-secondary)] hover:border-[var(--color-red)] hover:text-[var(--color-red)]"
      >
        Back to Admin
      </Link>
    </div>
  );
}
