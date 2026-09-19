import Link from "next/link";
import { Trophy, MapPinned } from "lucide-react";
import { leaderboard, currentUser } from "@/data/leaderboard";
import { Badge } from "@/components/Badge";

function rankColor(rank: number) {
  if (rank === 1) return "text-[#FFB700]";
  if (rank === 2) return "text-[#A0A0A0]";
  if (rank === 3) return "text-[#CD7F32]";
  return "text-[var(--color-text-secondary)]";
}

export default function LeaderboardPage() {
  return (
    <div className="mx-auto max-w-[900px] px-4 py-8 sm:px-6">
      <div className="flex items-center gap-2">
        <Trophy className="text-[var(--color-maroon)]" size={28} />
        <h1 className="text-[32px] font-bold text-[var(--color-text-primary)]">
          Leaderboard
        </h1>
      </div>
      <p className="mt-1 text-[var(--color-text-secondary)]">
        Earn points by checking in at pandals on the{" "}
        <Link href="/map" className="text-[var(--color-maroon)] underline">
          map
        </Link>
        . Explore low-crowd pandals for bonus points.
      </p>

      <div className="mt-6 flex items-center justify-between rounded-lg border-2 border-[var(--color-maroon)] bg-[var(--color-bg-secondary)] p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-maroon)] text-sm font-bold text-white">
            {currentUser.avatarInitials}
          </div>
          <div>
            <p className="font-semibold text-[var(--color-text-primary)]">
              You · Rank #{currentUser.rank}
            </p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {currentUser.pandalsVisited} pandals visited
            </p>
          </div>
        </div>
        <p className="text-xl font-bold text-[var(--color-maroon)]">
          {currentUser.points} pts
        </p>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-[var(--color-border)]">
        {leaderboard.map((entry) => (
          <div
            key={entry.userId}
            className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 last:border-b-0"
          >
            <div className="flex items-center gap-4">
              <span className={`w-6 text-center text-lg font-bold ${rankColor(entry.rank)}`}>
                {entry.rank}
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-bg-tertiary)] text-sm font-bold text-[var(--color-text-primary)]">
                {entry.avatarInitials}
              </div>
              <div>
                <p className="font-semibold text-[var(--color-text-primary)]">{entry.name}</p>
                <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
                  <MapPinned size={12} />
                  {entry.pandalsVisited} pandals
                  {entry.badges.map((b) => (
                    <Badge key={b} variant="theme" size="sm">
                      {b}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-lg font-bold text-[var(--color-text-primary)]">
              {entry.points}
              <span className="ml-1 text-xs font-normal text-[var(--color-text-light)]">pts</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
