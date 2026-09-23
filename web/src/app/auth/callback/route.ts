import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Magic-link landing target — exchanges the emailed code for a session
// cookie (PKCE flow), then sends the user back where they started.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";
  const ref = searchParams.get("ref");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Primary referral-attribution path — `ref` travelled here in the
      // confirmed link/OAuth redirect itself (see AuthProvider's
      // callbackUrl()), so it works even when the magic-link email was
      // opened in a different browser context than the one that has the
      // localStorage fallback. claim_referral() is a no-op for a
      // stale/foreign/already-claimed code.
      if (ref) {
        await supabase.rpc("claim_referral", { p_code: ref });
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`);
}
