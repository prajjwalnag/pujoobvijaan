"use client";

import { useCallback, useEffect, useState } from "react";
import type { CrowdLevel, Pandal, Region } from "@/data/types";
import { createClient } from "@/lib/supabase/client";

// Pandals added through the map (or /admin/pandals) are stored in the
// Supabase `pandals` table and shared with every visitor. The ~335 built-in
// pandals ship with the app, so only rows with the "user-" id prefix that
// POST /api/pandals generates are loaded here.
export function useAddedPandals() {
  const [addedPandals, setAddedPandals] = useState<Pandal[]>([]);

  const refresh = useCallback(async () => {
    const { data, error } = await createClient()
      .from("pandals")
      .select("id, name, region, crowd_level, lat, lng, geocoded")
      .like("id", "user-%");
    if (error || !data) return;
    setAddedPandals(
      data.map((r) => ({
        id: r.id,
        name: r.name,
        region: r.region as Region,
        coordinates: { lat: r.lat, lng: r.lng },
        crowdLevel: r.crowd_level as CrowdLevel,
        geocoded: r.geocoded,
      }))
    );
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
  }, [refresh]);

  return { addedPandals, refresh };
}

export async function submitPandal(input: {
  code: string;
  name: string;
  region: Region;
  crowdLevel: CrowdLevel;
  lat: number;
  lng: number;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const res = await fetch("/api/pandals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) return { ok: false, error: json.error ?? "Couldn't add the pandal." };
    return { ok: true };
  } catch {
    return { ok: false, error: "Network error — try again." };
  }
}
