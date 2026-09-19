import Link from "next/link";
import { Trophy, MapPinned, Crown } from "lucide-react";
import clsx from "clsx";
import { leaderboard, currentUser } from "@/data/leaderboard";
import { Badge } from "@/components/Badge";
import type { LeaderboardEntry } from "@/data/types";

function rankColor(rank: number) {
  if (rank === 1) return "text-[#FFB700]";
  if (rank === 2) return "text-[#A0A0A0]";
  if (rank === 3) return "text-[#CD7F32]";
  return "text-[var(--color-text-secondary)]";
}

// Row sizes grow 1, 2, 3, 4, ... so rank 1 sits alone at the apex and the
// crowd widens the further down the pyramid you go — fewer people at the
// top makes the ranking read at a glance instead of scanning a long list.
function pyramidRows<T>(items: T[]): T[][] {
  const rows: T[][] = [];
  let i = 0;
  let size = 1;
  while (i < items.length) {
    rows.push(items.slice(i, i + size));
    i += size;
    size++;
  }
  return rows;
}

const TIER_STYLE = [
  { avatar: "h-16 w-16 text-lg", card: "w-full max-w-[260px] p-5", name: "text-base", points: "text-2xl" },
  { avatar: "h-13 w-13 text-base", card: "w-full max-w-[220px] p-4", name: "text-sm", points: "text-xl" },
  { avatar: "h-11 w-11 text-sm", card: "w-full max-w-[190px] p-3.5", name: "text-sm", points: "text-lg" },
  { avatar: "h-10 w-10 text-sm", card: "w-full max-w-[170px] p-3", name: "text-xs", points: "text-base" },
];
function tierStyle(rowIndex: number) {
  return TIER_STYLE[Math.min(rowIndex, TIER_STYLE.length - 1)];
}

function PyramidCard({ entry, rowIndex }: { entry: LeaderboardEntry; rowIndex: number }) {
  const style = tierStyle(rowIndex);
  const isApex = rowIndex === 0;
  return (
    <div
      className={clsx(
        "flex flex-col items-center rounded-xl border bg-[var(--color-bg-secondary)] text-center shadow-[var(--shadow-light)] transition-transform hover:-translate-y-0.5",
        style.card,
        isApex ? "border-2 border-[#FFB700]" : "border-[var(--color-border)]"
      )}
    >
      {isApex && <Crown size={20} className="mb-1 text-[#FFB700]" fill="currentColor" />}
      <span className={clsx("font-bold", rankColor(entry.rank))}>#{entry.rank}</span>
      <div
        className={clsx(
          "mt-1 flex items-center justify-center rounded-full font-bold",
          style.avatar,
          isApex
            ? "bg-[var(--color-red)] text-white"
            : "bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)]"
        )}
      >
        {entry.avatarInitials}
      </div>
      <p className={clsx("mt-2 truncate font-semibold text-[var(--color-text-primary)]", style.name)}>
        {entry.name}
      </p>
      <p className="truncate text-[10px] text-[var(--color-text-light)]">@{entry.username}</p>
      <p className={clsx("mt-1 font-bold text-[var(--color-red)]", style.points)}>
        {entry.points}
        <span className="ml-0.5 text-[10px] font-normal text-[var(--color-text-light)]">pts</span>
      </p>
      <div className="mt-1.5 flex items-center gap-1 text-[10px] text-[var(--color-text-secondary)]">
        <MapPinned size={10} />
        {entry.pandalsVisited} pandals
      </div>
      {isApex && entry.badges.length > 0 && (
        <div className="mt-2 flex flex-wrap justify-center gap-1">
          {entry.badges.map((b) => (
            <Badge key={b} variant="theme" size="sm">
              {b}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

export default function LeaderboardPage() {
  const rows = pyramidRows(leaderboard);

  return (
    <div className="mx-auto max-w-[900px] px-4 py-8 sm:px-6">
      <div className="flex items-center gap-2">
        <Trophy className="text-[var(--color-red)]" size={28} />
        <h1 className="text-[32px] font-bold text-[var(--color-text-primary)]">
          Leaderboard
        </h1>
      </div>
      <p className="mt-1 text-[var(--color-text-secondary)]">
        Earn points by checking in at pandals on the{" "}
        <Link href="/map" className="text-[var(--color-red)] underline">
          map
        </Link>
        . Explore low-crowd pandals for bonus points.
      </p>

      <div className="mt-6 flex items-center justify-between rounded-lg border-2 border-[var(--color-red)] bg-[var(--color-bg-secondary)] p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-red)] text-sm font-bold text-white">
            {currentUser.avatarInitials}
          </div>
          <div>
            <p className="font-semibold text-[var(--color-text-primary)]">
              You · Rank #{currentUser.rank}
            </p>
            <p className="text-xs text-[var(--color-text-light)]">@{currentUser.username}</p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {currentUser.pandalsVisited} pandals visited
            </p>
          </div>
        </div>
        <p className="text-xl font-bold text-[var(--color-red)]">
          {currentUser.points} pts
        </p>
      </div>

      <div className="mt-10 flex flex-col items-center gap-5 sm:gap-6">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex w-full flex-wrap items-start justify-center gap-3 sm:gap-4">
            {row.map((entry) => (
              <PyramidCard key={entry.userId} entry={entry} rowIndex={rowIndex} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
