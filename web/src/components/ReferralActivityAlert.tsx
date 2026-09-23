"use client";

import { useEffect, useState } from "react";
import { Gift, X } from "lucide-react";

// Cycles through real referral events (who actually referred someone —
// see leaderboard/page.tsx), not fabricated names. Shows one at a time,
// auto-hides, then surfaces a different random one after a pause.
export function ReferralActivityAlert({ names }: { names: string[] }) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    if (names.length === 0 || dismissed) return;

    let showTimer: ReturnType<typeof setTimeout>;
    let hideTimer: ReturnType<typeof setTimeout>;

    function cycle() {
      setCurrent(names[Math.floor(Math.random() * names.length)]);
      setVisible(true);
      hideTimer = setTimeout(() => {
        setVisible(false);
        showTimer = setTimeout(cycle, 12000);
      }, 6000);
    }

    showTimer = setTimeout(cycle, 4000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [names, dismissed]);

  if (!current || !visible || dismissed) return null;

  return (
    <div
      role="status"
      className="fixed bottom-5 right-4 z-[1005] flex max-w-[260px] items-start gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-3 shadow-lg animate-[fade-in_0.2s_ease-out]"
    >
      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-tertiary)] text-[var(--color-red)]">
        <Gift size={16} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-[var(--color-text-primary)]">
          <span className="font-semibold">{current}</span> just earned{" "}
          <span className="font-semibold text-[var(--color-red)]">+15 points</span> for referring a
          friend.
        </p>
        <a
          href="#your-rank"
          className="mt-1 inline-block text-xs font-semibold text-[var(--color-red)] underline"
        >
          Refer your friend too
        </a>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="flex-shrink-0 text-[var(--color-text-light)] hover:text-[var(--color-text-secondary)]"
      >
        <X size={14} />
      </button>
    </div>
  );
}
