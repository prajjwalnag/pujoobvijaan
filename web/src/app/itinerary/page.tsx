"use client";

import { CalendarDays, Map } from "lucide-react";
import Link from "next/link";
import { itineraries } from "@/data/itineraries";
import { ItineraryCard } from "@/components/ItineraryCard";
import { ItineraryBuilder } from "@/components/ItineraryBuilder";
import { useMyItineraries } from "@/components/useMyItineraries";

export default function ItineraryPage() {
  const { myItineraries, addItinerary, deleteItinerary } = useMyItineraries();

  return (
    <div className="mx-auto max-w-[800px] px-4 py-8 sm:px-6">
      <div className="flex items-center gap-2">
        <CalendarDays className="text-[var(--color-red)]" size={28} />
        <h1 className="text-[32px] font-bold text-[var(--color-text-primary)]">Itinerary</h1>
      </div>
      <p className="mt-1 text-[var(--color-text-secondary)]">
        Sample routes to get you started — distances are real (straight-line, not walking-path).
        Build your own below, or use the{" "}
        <Link href="/map" className="text-[var(--color-red)] underline">
          Route Builder on the map
        </Link>{" "}
        to build one by clicking pandals directly. Either way earns points.
      </p>

      <div className="mt-6">
        <ItineraryBuilder onCreate={addItinerary} />
      </div>

      {myItineraries.length > 0 && (
        <div className="mt-6">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wide text-[var(--color-text-secondary)]">
            Your Itineraries
          </h2>
          <div className="flex flex-col gap-5">
            {myItineraries.map((itinerary) => (
              <ItineraryCard key={itinerary.id} itinerary={itinerary} onDelete={deleteItinerary} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        <h2 className="mb-3 text-xs font-bold uppercase tracking-wide text-[var(--color-text-secondary)]">
          Sample Routes
        </h2>
        <div className="flex flex-col gap-5">
          {itineraries.map((itinerary) => (
            <ItineraryCard key={itinerary.id} itinerary={itinerary} />
          ))}
        </div>
      </div>

      <Link
        href="/map"
        className="mt-6 flex items-center justify-center gap-2 rounded-lg border border-dashed border-[var(--color-border)] p-3 text-sm font-semibold text-[var(--color-text-secondary)] hover:border-[var(--color-red)] hover:text-[var(--color-red)]"
      >
        <Map size={15} />
        Build a route visually on the map instead
      </Link>
    </div>
  );
}
