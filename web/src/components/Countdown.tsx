"use client";

import { useEffect, useState } from "react";
import { Flame } from "lucide-react";

// Maha Shashthi 2026 — the day pandal-hopping traditionally begins.
const PUJA_START = new Date("2026-10-16T00:00:00+05:30").getTime();

function getRemaining() {
  const diff = Math.max(PUJA_START - Date.now(), 0);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const units: { key: keyof ReturnType<typeof getRemaining>; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Mins" },
  { key: "seconds", label: "Secs" },
];

export function Countdown() {
  const [remaining, setRemaining] = useState<ReturnType<typeof getRemaining> | null>(null);

  useEffect(() => {
    setRemaining(getRemaining());
    const id = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const over = remaining !== null && Object.values(remaining).every((v) => v === 0);

  return (
    <div className="mx-auto mt-10 max-w-lg">
      <div className="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-gold-dark)]">
        <Flame size={14} className="animate-pulse" />
        {over ? "Pujo is here" : "Pujo is coming"}
        <Flame size={14} className="animate-pulse" />
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
        {units.map(({ key, label }, i) => (
          <div
            key={key}
            className="countdown-tile rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] py-3 shadow-[var(--shadow-medium)]"
            style={{ animationDelay: `${i * 0.12}s` }}
          >
            <p className="font-mono text-2xl font-extrabold tabular-nums text-[var(--color-red)] sm:text-3xl">
              {remaining ? String(remaining[key]).padStart(2, "0") : "--"}
            </p>
            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-text-light)]">
              {label}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-[var(--color-text-light)]">
        Until Maha Shashthi · 16 October 2026
      </p>
    </div>
  );
}
