"use client";

import { useEffect, useState } from "react";
import { PUJA_START } from "@/data/pujaDate";

function formatRemaining(diffMs: number): string {
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${Math.max(minutes, 1)}m`;
}

// Gates check-ins and ratings until Maha Shashthi — visiting/rating a
// pandal before Puja actually starts doesn't mean anything yet. Updates
// once a minute (a lock label doesn't need second-level precision the way
// the homepage Countdown does).
export function usePujaLock(): { locked: boolean; unlockLabel: string } {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(id);
  }, []);

  if (now === null) return { locked: true, unlockLabel: "…" };
  const diff = PUJA_START - now;
  return { locked: diff > 0, unlockLabel: formatRemaining(Math.max(diff, 0)) };
}
