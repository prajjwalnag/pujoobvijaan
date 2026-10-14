"use client";

import { useCallback, useEffect, useState } from "react";
import type { CrowdLevel, Pandal, Region } from "@/data/types";
import { createClient } from "@/lib/supabase/client";

// Pandals added through the map (or /admin/pandals) are stored in the
// Supabase `pandals` table and shared with every visitor. The ~335 built-in
// pandals ship with the app, so only rows with the "user-" id prefix that
// add_pandal() generates are loaded here.
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

// Calls the add_pandal() Postgres function (see scripts/pandals_user_added.sql),
// which checks the code inside the database and does the insert — so the
// code never ships in the browser bundle and no server secret is needed.
export async function submitPandal(input: {
  code: string;
  name: string;
  region: Region;
  crowdLevel: CrowdLevel;
  lat: number;
  lng: number;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const { error } = await createClient().rpc("add_pandal", {
    p_code: input.code,
    p_name: input.name,
    p_region: input.region,
    p_crowd_level: input.crowdLevel,
    p_lat: input.lat,
    p_lng: input.lng,
  });
  if (error) {
    if (/incorrect code/i.test(error.message)) return { ok: false, error: "Incorrect code." };
    if (/could not find the function|schema cache/i.test(error.message)) {
      return {
        ok: false,
        error: "Database isn't set up yet — run scripts/pandals_user_added.sql in Supabase.",
      };
    }
    return { ok: false, error: `Couldn't add the pandal: ${error.message}` };
  }
  return { ok: true };
}
