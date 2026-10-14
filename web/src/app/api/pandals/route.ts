import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { regions } from "@/data/pandals";
import type { Database } from "@/lib/supabase/types";

// The code is checked here, on the server — never in the browser bundle —
// and the insert uses the service-role key, so the code is the only way
// to add a pandal (visitors can't write to the pandals table directly).
// Override the default with PANDAL_ADD_CODE in the environment.
const ADD_CODE = process.env.PANDAL_ADD_CODE ?? "1968";

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const { code, name, region, crowdLevel, lat, lng } = body as Record<string, unknown>;

  if (typeof code !== "string" || !constantTimeEqual(code, ADD_CODE)) {
    return NextResponse.json({ error: "Incorrect code." }, { status: 401 });
  }
  if (typeof name !== "string" || !name.trim() || name.length > 120) {
    return NextResponse.json({ error: "A pandal name is required." }, { status: 400 });
  }
  if (typeof region !== "string" || !(regions as string[]).includes(region)) {
    return NextResponse.json({ error: "Invalid region." }, { status: 400 });
  }
  if (crowdLevel !== "high" && crowdLevel !== "medium" && crowdLevel !== "low") {
    return NextResponse.json({ error: "Invalid size." }, { status: 400 });
  }
  if (
    typeof lat !== "number" || typeof lng !== "number" ||
    lat < 21.5 || lat > 23.5 || lng < 87.5 || lng > 89
  ) {
    return NextResponse.json({ error: "Location is outside the Kolkata area." }, { status: 400 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    return NextResponse.json(
      { error: "Server isn't configured to save pandals (SUPABASE_SERVICE_ROLE_KEY missing)." },
      { status: 500 }
    );
  }

  const supabase = createClient<Database>(url, serviceKey);
  const id = `user-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
  const { error } = await supabase.from("pandals").insert({
    id,
    name: name.trim(),
    region,
    crowd_level: crowdLevel,
    lat,
    lng,
    geocoded: true,
  });
  if (error) {
    return NextResponse.json({ error: "Couldn't save the pandal." }, { status: 500 });
  }
  return NextResponse.json({ ok: true, id });
}
