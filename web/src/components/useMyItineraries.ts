"use client";

import { useEffect, useState } from "react";
import type { Itinerary } from "@/data/types";

const STORAGE_KEY = "pujo-my-itineraries-v1";

// Shared localStorage-backed store for user-created itineraries, used by
// both /itinerary and the map's Route Builder so an itinerary saved from
// either place shows up in both.
export function useMyItineraries() {
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

  return { myItineraries, addItinerary, deleteItinerary };
}
