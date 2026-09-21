"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Itinerary } from "@/data/types";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "./AuthProvider";

// Supabase-backed — inserting an itinerary row triggers the +20 points
// award server-side (see the itineraries AFTER INSERT trigger in the
// schema), so this hook doesn't award points itself.
export function useMyItineraries() {
  const { user } = useAuth();
  const router = useRouter();
  const [myItineraries, setMyItineraries] = useState<Itinerary[]>([]);

  const refetch = useCallback(async () => {
    if (!user) {
      setMyItineraries([]);
      return;
    }
    const supabase = createClient();
    const { data } = await supabase
      .from("itineraries")
      .select("id, title, description, mode, created_at, itinerary_stops(pandal_id, scheduled_time, position)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setMyItineraries(
      (data ?? []).map((row) => ({
        id: row.id,
        title: row.title,
        description: row.description ?? "",
        mode: row.mode as "walk" | "transit",
        stops: [...row.itinerary_stops]
          .sort((a, b) => a.position - b.position)
          .map((s) => ({ pandalId: s.pandal_id, scheduledTime: s.scheduled_time ?? "" })),
      }))
    );
  }, [user]);

  // refetch() syncs local state from the server (Supabase) on mount/user change.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refetch();
  }, [refetch]);

  async function addItinerary(itinerary: Itinerary) {
    if (!user) {
      router.push("/login");
      return;
    }
    const supabase = createClient();
    const { data: created, error } = await supabase
      .from("itineraries")
      .insert({
        user_id: user.id,
        title: itinerary.title,
        description: itinerary.description,
        mode: itinerary.mode,
      })
      .select("id")
      .single();
    if (error || !created) return;

    await supabase.from("itinerary_stops").insert(
      itinerary.stops.map((s, i) => ({
        itinerary_id: created.id,
        pandal_id: s.pandalId,
        scheduled_time: s.scheduledTime,
        position: i,
      }))
    );

    await refetch();
  }

  async function deleteItinerary(id: string) {
    if (!user) return;
    const supabase = createClient();
    await supabase.from("itineraries").delete().eq("id", id).eq("user_id", user.id);
    setMyItineraries((prev) => prev.filter((it) => it.id !== id));
  }

  return { myItineraries, addItinerary, deleteItinerary };
}
