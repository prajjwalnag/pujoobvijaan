"use client";

import { useEffect, useState } from "react";
import type { Pandal } from "@/data/types";

const STORAGE_KEY = "pujo-added-pandals-v1";

// Pandal locations added by the admin (Make with Rex) via /admin/pandals.
// Same trade-off as usePartners: there's no shared backend for pandals, so
// these live in this browser's localStorage. To publish one for everyone,
// copy its snippet from /admin/pandals into src/data/pandals.ts.
export function useAddedPandals() {
  const [addedPandals, setAddedPandals] = useState<Pandal[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from localStorage after mount (SSR-safe)
      if (raw) setAddedPandals(JSON.parse(raw));
    } catch {
      // ignore — start fresh
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(addedPandals));
    } catch {
      // ignore (private browsing / storage blocked)
    }
  }, [addedPandals, hydrated]);

  function addPandal(pandal: Pandal) {
    setAddedPandals((prev) => [pandal, ...prev]);
  }

  function removePandal(id: string) {
    setAddedPandals((prev) => prev.filter((p) => p.id !== id));
  }

  return { addedPandals, addPandal, removePandal };
}
