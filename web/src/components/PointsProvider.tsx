"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Pandal } from "@/data/types";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "./AuthProvider";

// --- Point scheme -----------------------------------------------------
// Check-in:      +10 base, plus a "hidden gem" bonus for smaller pandals
//                so exploring beyond the famous ones pays off.
// Rating:        +5 flat, once per pandal (can't farm the same one).
// New area:      +15 the first time you check in anywhere within an
//                Area you haven't visited before — rewards spreading
//                out rather than clustering all your check-ins.
// Itinerary:     +20 flat for building and saving your own itinerary
//                (see /itinerary) — one-time per itinerary created.
// Referral:      +15 flat per friend you bring onto the app, once per
//                name. Self-reported — same honor-system basis as before.
//
// All of the above is now computed and awarded server-side (Postgres
// triggers in the Supabase schema — see award_points()/handle_check_in()
// etc.), not trusted from the client. This provider just reflects that
// server state; it never sets points itself.
export const POINTS = {
  CHECKIN_BASE: 10,
  CHECKIN_BONUS_SMALL: 10,
  CHECKIN_BONUS_MEDIUM: 5,
  CHECKIN_BONUS_BIG: 0,
  RATING: 5,
  NEW_AREA: 15,
  CREATE_ITINERARY: 20,
  REFERRAL: 15,
} as const;

export function checkinPointsFor(pandal: Pandal) {
  const bonus =
    pandal.crowdLevel === "low"
      ? POINTS.CHECKIN_BONUS_SMALL
      : pandal.crowdLevel === "medium"
        ? POINTS.CHECKIN_BONUS_MEDIUM
        : POINTS.CHECKIN_BONUS_BIG;
  return POINTS.CHECKIN_BASE + bonus;
}

interface PointsState {
  points: number;
  checkedIn: Set<string>;
  ratings: Record<string, number>;
  referrals: string[];
  lastGain: { amount: number; reason: string; at: number } | null;
}

interface PointsContextValue extends PointsState {
  checkIn: (pandal: Pandal) => Promise<void>;
  rate: (pandal: Pandal, stars: number) => Promise<void>;
  addReferral: (name: string) => Promise<boolean>;
  // Re-pulls points from the server — call after any action elsewhere
  // (like creating an itinerary) that awards points via a DB trigger this
  // provider doesn't know about directly.
  refreshPoints: () => Promise<void>;
}

const PointsContext = createContext<PointsContextValue | null>(null);

export function usePoints() {
  const ctx = useContext(PointsContext);
  if (!ctx) throw new Error("usePoints must be used within PointsProvider");
  return ctx;
}

const EMPTY_STATE: PointsState = {
  points: 0,
  checkedIn: new Set(),
  ratings: {},
  referrals: [],
  lastGain: null,
};

export function PointsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const [state, setState] = useState<PointsState>(EMPTY_STATE);

  const refetch = useCallback(async () => {
    if (!user) {
      setState(EMPTY_STATE);
      return;
    }
    const supabase = createClient();
    const [{ data: profile }, { data: checkIns }, { data: ratingsRows }, { data: referralsRows }] =
      await Promise.all([
        supabase.from("profiles").select("points").eq("id", user.id).single(),
        supabase.from("check_ins").select("pandal_id").eq("user_id", user.id),
        supabase.from("ratings").select("pandal_id, stars").eq("user_id", user.id),
        supabase.from("referrals").select("referred_name").eq("user_id", user.id),
      ]);
    setState((prev) => ({
      ...prev,
      points: profile?.points ?? 0,
      checkedIn: new Set((checkIns ?? []).map((c) => c.pandal_id)),
      ratings: Object.fromEntries((ratingsRows ?? []).map((r) => [r.pandal_id, r.stars])),
      referrals: (referralsRows ?? []).map((r) => r.referred_name),
    }));
  }, [user]);

  // refetch() syncs local state from the server (Supabase) on mount/user
  // change — the exact case this effect exists for; no data library here.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refetch();
  }, [refetch]);

  const checkIn = useCallback(
    async (pandal: Pandal) => {
      if (!user) {
        router.push("/login");
        return;
      }
      if (state.checkedIn.has(pandal.id)) return;
      const supabase = createClient();
      const { data, error } = await supabase
        .from("check_ins")
        .insert({ user_id: user.id, pandal_id: pandal.id })
        .select("points_awarded")
        .single();
      if (error || !data) return;
      setState((prev) => ({
        ...prev,
        checkedIn: new Set(prev.checkedIn).add(pandal.id),
        points: prev.points + data.points_awarded,
        lastGain: {
          amount: data.points_awarded,
          reason: data.points_awarded >= 25 ? "Check-in + new area" : "Check-in",
          at: Date.now(),
        },
      }));
    },
    [user, state.checkedIn, router]
  );

  const rate = useCallback(
    async (pandal: Pandal, stars: number) => {
      if (!user) {
        router.push("/login");
        return;
      }
      const alreadyRated = pandal.id in state.ratings;
      const supabase = createClient();
      if (alreadyRated) {
        await supabase
          .from("ratings")
          .update({ stars })
          .eq("user_id", user.id)
          .eq("pandal_id", pandal.id);
        setState((prev) => ({ ...prev, ratings: { ...prev.ratings, [pandal.id]: stars } }));
        return;
      }
      const { error } = await supabase
        .from("ratings")
        .insert({ user_id: user.id, pandal_id: pandal.id, stars });
      if (error) return;
      setState((prev) => ({
        ...prev,
        points: prev.points + POINTS.RATING,
        ratings: { ...prev.ratings, [pandal.id]: stars },
        lastGain: { amount: POINTS.RATING, reason: "Rating", at: Date.now() },
      }));
    },
    [user, state.ratings, router]
  );

  const addReferral = useCallback(
    async (name: string) => {
      if (!user) {
        router.push("/login");
        return false;
      }
      const trimmed = name.trim();
      if (!trimmed) return false;
      const supabase = createClient();
      const { error } = await supabase
        .from("referrals")
        .insert({ user_id: user.id, referred_name: trimmed });
      if (error) return false; // unique violation — already referred this name
      setState((prev) => ({
        ...prev,
        points: prev.points + POINTS.REFERRAL,
        referrals: [...prev.referrals, trimmed],
        lastGain: { amount: POINTS.REFERRAL, reason: "Invited a friend", at: Date.now() },
      }));
      return true;
    },
    [user, router]
  );

  return (
    <PointsContext.Provider value={{ ...state, checkIn, rate, addReferral, refreshPoints: refetch }}>
      {children}
    </PointsContext.Provider>
  );
}
