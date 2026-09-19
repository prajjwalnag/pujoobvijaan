import { CalendarDays, Footprints, Bus, MapPin, ArrowDown } from "lucide-react";
import { itineraries } from "@/data/itineraries";
import { pandals } from "@/data/pandals";
import { haversineKm } from "@/data/graph";
import { tierColor, tierLabel } from "@/data/tiers";

const pandalById = new Map(pandals.map((p) => [p.id, p]));

function ItineraryCard({ itinerary }: { itinerary: (typeof itineraries)[number] }) {
  const stopPandals = itinerary.stops
    .map((s) => ({ ...s, pandal: pandalById.get(s.pandalId) }))
    .filter((s) => s.pandal);

  let totalKm = 0;
  const legs: number[] = [];
  for (let i = 1; i < stopPandals.length; i++) {
    const d = haversineKm(stopPandals[i - 1].pandal!.coordinates, stopPandals[i].pandal!.coordinates);
    legs.push(d);
    totalKm += d;
  }

  const ModeIcon = itinerary.mode === "walk" ? Footprints : Bus;

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5 shadow-[var(--shadow-light)]">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]">{itinerary.title}</h2>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{itinerary.description}</p>
        </div>
        <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] px-3 py-1 text-xs font-semibold text-[var(--color-text-secondary)]">
          <ModeIcon size={13} />
          {itinerary.mode === "walk" ? "Walking route" : "Needs transit"}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-xs text-[var(--color-text-light)]">
        <span>{stopPandals.length} stops</span>
        <span>·</span>
        <span>{totalKm.toFixed(1)} km total</span>
      </div>

      <div className="mt-4 flex flex-col">
        {stopPandals.map((stop, i) => (
          <div key={stop.pandalId}>
            <div className="flex items-start gap-3">
              <div className="w-16 flex-shrink-0 pt-0.5 text-right text-xs font-semibold text-[var(--color-text-light)]">
                {stop.scheduledTime}
              </div>
              <div className="flex flex-col items-center">
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white"
                  style={{ background: tierColor[stop.pandal!.crowdLevel] }}
                >
                  {i + 1}
                </span>
              </div>
              <div className="flex-1 pb-1">
                <p className="font-semibold text-[var(--color-text-primary)]">{stop.pandal!.name}</p>
                <p className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)]">
                  <MapPin size={11} />
                  {stop.pandal!.region} · {tierLabel[stop.pandal!.crowdLevel]}
                </p>
              </div>
            </div>
            {i < legs.length && (
              <div className="ml-[76px] flex items-center gap-1.5 py-1 text-[11px] text-[var(--color-text-light)]">
                <ArrowDown size={11} />
                {legs[i] < 1 ? `${Math.round(legs[i] * 1000)} m` : `${legs[i].toFixed(1)} km`} to next stop
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ItineraryPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-8 sm:px-6">
      <div className="flex items-center gap-2">
        <CalendarDays className="text-[var(--color-red)]" size={28} />
        <h1 className="text-[32px] font-bold text-[var(--color-text-primary)]">Itinerary</h1>
      </div>
      <p className="mt-1 text-[var(--color-text-secondary)]">
        Sample routes to get you started — distances are real (straight-line, not walking-path).
        Sign in soon to build and save your own.
      </p>

      <div className="mt-6 flex flex-col gap-5">
        {itineraries.map((itinerary) => (
          <ItineraryCard key={itinerary.id} itinerary={itinerary} />
        ))}
      </div>
    </div>
  );
}
