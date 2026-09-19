"use client";

import { useEffect, useState } from "react";
import { partners as staticPartners } from "@/data/partners";
import type { Partner } from "@/data/types";

const STORAGE_KEY = "pujo-added-partners-v1";

// Partners added through the /partners form live in localStorage — there's
// no backend, so this is a real but per-browser store, not a shared
// database. Combined with the committed data/partners.ts list (real
// signed-on partners) wherever partners are shown.
export function usePartners() {
  const [addedPartners, setAddedPartners] = useState<Partner[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setAddedPartners(JSON.parse(raw));
    } catch {
      // ignore — start fresh
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(addedPartners));
    } catch {
      // ignore (private browsing / storage blocked)
    }
  }, [addedPartners, hydrated]);

  function addPartner(partner: Partner) {
    setAddedPartners((prev) => [partner, ...prev]);
  }

  function removePartner(id: string) {
    setAddedPartners((prev) => prev.filter((p) => p.id !== id));
  }

  return {
    allPartners: [...staticPartners, ...addedPartners],
    addedPartners,
    addPartner,
    removePartner,
  };
}
