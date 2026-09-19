"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { usePoints } from "./PointsProvider";

export function PointsToast() {
  const { lastGain } = usePoints();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!lastGain) return;
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 2400);
    return () => clearTimeout(timer);
  }, [lastGain]);

  if (!lastGain || !visible) return null;

  return (
    <div
      key={lastGain.at}
      className="points-toast fixed top-20 left-1/2 z-[1000] -translate-x-1/2 rounded-full border border-[var(--color-gold)] bg-[var(--color-bg-secondary)] px-4 py-2 shadow-[var(--shadow-heavy)]"
    >
      <span className="flex items-center gap-2 text-sm font-bold text-[var(--color-text-primary)]">
        <Sparkles size={15} className="text-[var(--color-gold)]" />+{lastGain.amount} pts
        <span className="font-normal text-[var(--color-text-secondary)]">· {lastGain.reason}</span>
      </span>
    </div>
  );
}
