"use client";

import { useEffect, useState } from "react";

type Phase = "idle" | "showing" | "leaving" | "done";

const SCROLL_TRIGGER_PX = 180;

export function PujaFlashOverlay() {
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    function onScroll() {
      if (window.scrollY > SCROLL_TRIGGER_PX) {
        setPhase("showing");
        window.removeEventListener("scroll", onScroll);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (phase !== "showing") return;
    const timer = setTimeout(() => setPhase("leaving"), 3200);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "leaving") return;
    const timer = setTimeout(() => setPhase("done"), 700);
    return () => clearTimeout(timer);
  }, [phase]);

  if (phase !== "showing" && phase !== "leaving") return null;

  return (
    <div
      onClick={() => setPhase("leaving")}
      className={`puja-flash-overlay ${phase === "leaving" ? "puja-flash-leaving" : "puja-flash-showing"}`}
    >
      <div className="puja-flash-glow" />
      <p className="puja-flash-text">
        Let your <span>Puja</span> be the best <span>Puja</span>.
      </p>
      <p className="puja-flash-hint">tap anywhere to continue</p>
    </div>
  );
}
