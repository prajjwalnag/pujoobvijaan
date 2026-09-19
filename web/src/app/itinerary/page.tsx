"use client";

import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import { itineraries } from "@/data/itineraries";
import { ItineraryCard } from "@/components/ItineraryCard";
import { ItineraryBuilder } from "@/components/ItineraryBuilder";
import type { Itinerary } from "@/data/types";

const STORAGE_KEY = "pujo-my-itineraries-v1";

export default function ItineraryPage() {
  const [myItineraries, setMyItineraries] = useState<Itinerary[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setMyItineraries(JSON.parse(raw));
    } catch {
      // ignore — start fresh
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(myItineraries));
    } catch {
      // ignore (private browsing / storage blocked)
    }
  }, [myItineraries, hydrated]);

  function addItinerary(itinerary: Itinerary) {
    setMyItineraries((prev) => [itinerary, ...prev]);
  }

  function deleteItinerary(id: string) {
    setMyItineraries((prev) => prev.filter((it) => it.id !== id));
  }

  return (
    <div className="mx-auto max-w-[800px] px-4 py-8 sm:px-6">
      <div className="flex items-center gap-2">
        <CalendarDays className="text-[var(--color-red)]" size={28} />
        <h1 className="text-[32px] font-bold text-[var(--color-text-primary)]">Itinerary</h1>
      </div>
      <p className="mt-1 text-[var(--color-text-secondary)]">
        Sample routes to get you started — distances are real (straight-line, not walking-path).
        Build your own below and earn points for it.
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
    </div>
  );
}
