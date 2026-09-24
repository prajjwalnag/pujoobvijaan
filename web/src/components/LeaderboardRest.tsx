"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Users } from "lucide-react";
import type { LeaderboardEntry } from "@/data/types";

export function LeaderboardRest({ entries }: { entries: LeaderboardEntry[] }) {
  const [expanded, setExpanded] = useState(false);

  if (entries.length === 0) return null;

  return (
    <div className="mx-auto mt-8 w-full max-w-[500px]">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-3 text-sm font-semibold text-[var(--color-text-primary)] hover:border-[var(--color-red)]"
      >
        <span className="flex items-center gap-2">
          <Users size={16} className="text-[var(--color-red)]" />
          {entries.length} more explorer{entries.length === 1 ? "" : "s"} on the board
        </span>
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {expanded && (
        <div className="mt-2 max-h-[400px] overflow-y-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
          {entries.map((entry) => (
            <div
              key={entry.userId}
              className="flex items-center gap-3 border-b border-[var(--color-border)] px-4 py-2 text-sm last:border-0"
            >
              <span className="w-8 flex-shrink-0 text-xs font-bold text-[var(--color-text-secondary)]">
                #{entry.rank}
              </span>
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-tertiary)] text-[10px] font-bold text-[var(--color-text-primary)]">
                {entry.avatarInitials}
              </span>
              <span className="min-w-0 flex-1 truncate text-[var(--color-text-primary)]">
                @{entry.username}
              </span>
              <span className="flex-shrink-0 text-xs font-bold text-[var(--color-red)]">
                {entry.points} pts
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
