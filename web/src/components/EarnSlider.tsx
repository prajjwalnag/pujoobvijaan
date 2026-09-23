"use client";

import { useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface EarnWay {
  icon: ReactNode;
  title: string;
  points: string;
  description: string;
}

export function EarnSlider({ ways }: { ways: EarnWay[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const amount = (card?.offsetWidth ?? 260) + 12;
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <div className="relative mt-6">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {ways.map((way) => (
          <div
            key={way.title}
            data-card
            className="w-[75%] flex-shrink-0 snap-start rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 sm:w-[280px]"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-tertiary)] text-[var(--color-red)]">
                {way.icon}
              </span>
              <p className="font-bold text-[var(--color-text-primary)]">{way.title}</p>
              <span className="ml-auto flex-shrink-0 text-sm font-bold text-[var(--color-red)]">
                {way.points}
              </span>
            </div>
            <p className="mt-2 text-xs text-[var(--color-text-secondary)]">{way.description}</p>
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Previous"
        onClick={() => scroll(-1)}
        className="absolute left-0 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-1.5 text-[var(--color-text-secondary)] shadow-[var(--shadow-light)] transition-colors hover:text-[var(--color-red)] sm:flex"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={() => scroll(1)}
        className="absolute right-0 top-1/2 hidden translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-1.5 text-[var(--color-text-secondary)] shadow-[var(--shadow-light)] transition-colors hover:text-[var(--color-red)] sm:flex"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
