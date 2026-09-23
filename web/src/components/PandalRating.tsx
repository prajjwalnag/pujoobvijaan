"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import type { Pandal } from "@/data/types";
import { usePoints, POINTS, type CategoryRating } from "./PointsProvider";
import { usePujaLock } from "./usePujaLock";
import { createClient } from "@/lib/supabase/client";

export const RATING_CATEGORIES: { key: keyof CategoryRating; label: string }[] = [
  { key: "location", label: "Location" },
  { key: "decoration", label: "Decoration" },
  { key: "crowd", label: "Crowd" },
  { key: "foodVibe", label: "Food & Vibe" },
];

// --- Community aggregate (everyone's ratings for a pandal) -------------
export interface RatingSummary {
  location: number;
  decoration: number;
  crowd: number;
  foodVibe: number;
  overall: number;
  count: number;
}

// Fetches the whole pandal_rating_summary view once — cheap (one row per
// rated pandal, a few hundred at most) and avoids a per-marker query on
// every map/atlas pin.
export function usePandalRatingSummaries(): Record<string, RatingSummary> {
  const [summaries, setSummaries] = useState<Record<string, RatingSummary>>({});

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("pandal_rating_summary")
      .select("*")
      .then(({ data }) => {
        const map: Record<string, RatingSummary> = {};
        for (const row of data ?? []) {
          if (!row.pandal_id) continue;
          map[row.pandal_id] = {
            location: row.location_avg ?? 0,
            decoration: row.decoration_avg ?? 0,
            crowd: row.crowd_avg ?? 0,
            foodVibe: row.food_vibe_avg ?? 0,
            overall: row.overall_avg ?? 0,
            count: row.rating_count ?? 0,
          };
        }
        setSummaries(map);
      });
  }, []);

  return summaries;
}

export function CommunityRatingStars({ summary }: { summary?: RatingSummary }) {
  if (!summary || summary.count === 0) {
    return <p className="mt-1 text-[11px] text-gray-500">No ratings yet — be the first!</p>;
  }
  return (
    <div className="mt-1">
      {RATING_CATEGORIES.map((c) => (
        <div key={c.key} className="flex items-center justify-between text-[11px] text-gray-600">
          <span>{c.label}</span>
          <span className="flex items-center gap-0.5 font-semibold text-gray-800">
            <Star size={11} className="text-[#FFB700]" fill="#FFB700" />
            {summary[c.key].toFixed(1)}
          </span>
        </div>
      ))}
      <p className="mt-0.5 text-[10px] text-gray-400">
        from {summary.count} rating{summary.count === 1 ? "" : "s"}
      </p>
    </div>
  );
}

// --- Your own rating (interactive form) ---------------------------------
function MiniStarRow({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          className="p-0.5"
        >
          <Star
            size={13}
            className={(hover || value) >= n ? "text-[#FFB700]" : "text-gray-300"}
            fill={(hover || value) >= n ? "#FFB700" : "none"}
          />
        </button>
      ))}
    </div>
  );
}

export function RatingPanel({ pandal }: { pandal: Pandal }) {
  const { ratings, rate } = usePoints();
  const { locked, unlockLabel } = usePujaLock();
  const saved = ratings[pandal.id];
  const [draft, setDraft] = useState<CategoryRating>(
    saved ?? { location: 0, decoration: 0, crowd: 0, foodVibe: 0 }
  );
  const [editing, setEditing] = useState(!saved);

  const complete = RATING_CATEGORIES.every((c) => draft[c.key] > 0);

  if (locked && !saved) {
    return <p className="mt-1 text-[11px] text-gray-500">Ratings unlock in {unlockLabel}</p>;
  }

  if (saved && !editing) {
    return (
      <div className="mt-1 flex items-center justify-between">
        <span className="text-[11px] text-gray-600">You rated this pandal</span>
        {!locked && (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="text-[10px] font-semibold text-[#8b0000] underline"
          >
            Edit
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="mt-1 rounded border border-gray-200 p-2">
      {RATING_CATEGORIES.map((c) => (
        <div key={c.key} className="flex items-center justify-between py-0.5">
          <span className="text-[11px] text-gray-600">{c.label}</span>
          <MiniStarRow value={draft[c.key]} onChange={(n) => setDraft({ ...draft, [c.key]: n })} />
        </div>
      ))}
      <button
        type="button"
        disabled={!complete || locked}
        onClick={() => {
          rate(pandal, draft);
          setEditing(false);
        }}
        className="mt-1.5 w-full rounded bg-[#8b0000] px-2 py-1 text-[11px] font-semibold text-white disabled:opacity-40"
      >
        {locked
          ? `Unlocks in ${unlockLabel}`
          : saved
            ? "Update rating"
            : `Submit rating (+${POINTS.RATING} pts)`}
      </button>
    </div>
  );
}

export function PandalRatingSection({
  pandal,
  summary,
}: {
  pandal: Pandal;
  summary?: RatingSummary;
}) {
  return (
    <div className="mt-2 border-t border-gray-200 pt-2">
      <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">Ratings</p>
      <CommunityRatingStars summary={summary} />
      <p className="mt-2 text-[10px] font-bold uppercase tracking-wide text-gray-400">
        Your rating
      </p>
      <RatingPanel pandal={pandal} />
    </div>
  );
}
