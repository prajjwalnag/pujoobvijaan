"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Pandal } from "@/data/types";

// --- Point scheme -----------------------------------------------------
// Check-in:      +10 base, plus a "hidden gem" bonus for smaller pandals
//                so exploring beyond the famous ones pays off.
// Rating:        +5 flat, once per pandal (can't farm the same one).
// New area:      +15 the first time you check in anywhere within an
//                Area you haven't visited before — rewards spreading
//                out rather than clustering all your check-ins.
export const POINTS = {
  CHECKIN_BASE: 10,
  CHECKIN_BONUS_SMALL: 10,
  CHECKIN_BONUS_MEDIUM: 5,
  CHECKIN_BONUS_BIG: 0,
  RATING: 5,
  NEW_AREA: 15,
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
  visitedAreas: Set<string>;
  lastGain: { amount: number; reason: string; at: number } | null;
}

interface PointsContextValue extends PointsState {
  checkIn: (pandal: Pandal) => void;
  rate: (pandal: Pandal, stars: number) => void;
}

const PointsContext = createContext<PointsContextValue | null>(null);

export function usePoints() {
  const ctx = useContext(PointsContext);
  if (!ctx) throw new Error("usePoints must be used within PointsProvider");
  return ctx;
}

const STORAGE_KEY = "pujo-points-v1";

export function PointsProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PointsState>({
    points: 0,
    checkedIn: new Set(),
    ratings: {},
    visitedAreas: new Set(),
    lastGain: null,
  });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setState({
          points: parsed.points ?? 0,
          checkedIn: new Set(parsed.checkedIn ?? []),
          ratings: parsed.ratings ?? {},
          visitedAreas: new Set(parsed.visitedAreas ?? []),
          lastGain: null,
        });
      }
    } catch {
      // ignore — start fresh
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          points: state.points,
          checkedIn: [...state.checkedIn],
          ratings: state.ratings,
          visitedAreas: [...state.visitedAreas],
        })
      );
    } catch {
      // ignore (private browsing / storage blocked)
    }
  }, [state, hydrated]);

  const checkIn = useCallback((pandal: Pandal) => {
    setState((prev) => {
      if (prev.checkedIn.has(pandal.id)) return prev;
      let gain = checkinPointsFor(pandal);
      let reason = "Check-in";
      const newAreaBonus = pandal.areaId && !prev.visitedAreas.has(pandal.areaId);
      if (newAreaBonus) {
        gain += POINTS.NEW_AREA;
        reason = "Check-in + new area";
      }
      const nextCheckedIn = new Set(prev.checkedIn);
      nextCheckedIn.add(pandal.id);
      const nextAreas = new Set(prev.visitedAreas);
      if (pandal.areaId) nextAreas.add(pandal.areaId);
      return {
        ...prev,
        points: prev.points + gain,
        checkedIn: nextCheckedIn,
        visitedAreas: nextAreas,
        lastGain: { amount: gain, reason, at: Date.now() },
      };
    });
  }, []);

  const rate = useCallback((pandal: Pandal, stars: number) => {
    setState((prev) => {
      const alreadyRated = pandal.id in prev.ratings;
      const gain = alreadyRated ? 0 : POINTS.RATING;
      return {
        ...prev,
        points: prev.points + gain,
        ratings: { ...prev.ratings, [pandal.id]: stars },
        lastGain: gain > 0 ? { amount: gain, reason: "Rating", at: Date.now() } : prev.lastGain,
      };
    });
  }, []);

  return (
    <PointsContext.Provider value={{ ...state, checkIn, rate }}>{children}</PointsContext.Provider>
  );
}
