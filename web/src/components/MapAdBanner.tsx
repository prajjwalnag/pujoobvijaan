"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

interface AdSlot {
  badge: string;
  text: string;
  href?: string;
}

// One real ad (the user's own copy) plus a real CTA slot pointing at the
// actual /partners signup flow — not padded out with invented sponsor
// names just to make the rotation look busier than it is.
const AD_SLOTS: AdSlot[] = [
  { badge: "Ad", text: "Feeling hungry or craving a dough kebab? Kitchen is there." },
  { badge: "Sponsor", text: "Want your brand here? Add yourself as a partner — free for now.", href: "/partners" },
];

const ROTATE_MS = 6000;

export function MapAdBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (dismissed || AD_SLOTS.length < 2) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % AD_SLOTS.length);
        setVisible(true);
      }, 200);
    }, ROTATE_MS);
    return () => clearInterval(interval);
  }, [dismissed]);

  if (dismissed) return null;
  const slot = AD_SLOTS[index];

  const content = (
    <>
      <span className="shrink-0 rounded bg-[var(--color-gold)] px-2 py-1 text-[12px] font-bold uppercase tracking-wide text-white">
        {slot.badge}
      </span>
      <p className="flex-1 text-[15px] text-[var(--color-text-primary)]">{slot.text}</p>
    </>
  );

  return (
    <div className="absolute bottom-4 left-4 z-[1010] flex max-w-[calc(100%-5.5rem)] items-center gap-2.5 rounded-xl bg-[var(--color-bg-secondary)] px-4 py-3 shadow-lg ring-1 ring-[var(--color-border)] sm:max-w-[26rem]">
      <div
        className={`flex flex-1 items-center gap-2.5 transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"}`}
      >
        {slot.href ? (
          <Link href={slot.href} className="flex flex-1 items-center gap-2.5">
            {content}
          </Link>
        ) : (
          content
        )}
      </div>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss ad"
        className="shrink-0 text-[var(--color-text-light)] hover:text-[var(--color-red)]"
      >
        <X size={18} />
      </button>
    </div>
  );
}
