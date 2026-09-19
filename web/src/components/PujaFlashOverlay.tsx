"use client";

import { useEffect, useState } from "react";

type Phase = "idle" | "showing" | "leaving" | "done";

const SCROLL_TRIGGER_PX = 180;

export function PujaFlashOverlay() {
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    let fired = false;
    function fire() {
      if (fired) return;
      fired = true;
      setPhase("showing");
      window.removeEventListener("scroll", onScroll);
      clearTimeout(fallbackTimer);
    }
    function onScroll() {
      if (window.scrollY > SCROLL_TRIGGER_PX) fire();
    }

    const scrollRoom = document.documentElement.scrollHeight - window.innerHeight;
    // On a page short enough that there's nothing to scroll (or barely
    // anything), scrollY would never cross the threshold — fall back to
    // firing on a short timer instead of silently never showing.
    const fallbackTimer = setTimeout(fire, scrollRoom > SCROLL_TRIGGER_PX ? 6000 : 1200);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(fallbackTimer);
    };
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

  const words = ["Let", "your", "Pujo", "Obhijaan", "begin!!"];

  return (
    <div
      onClick={() => setPhase("leaving")}
      className={`puja-flash-overlay ${phase === "leaving" ? "puja-flash-leaving" : "puja-flash-showing"}`}
    >
      <div className="puja-flash-glow" />
      <p className="puja-flash-text">
        {words.map((word, i) => (
          <span
            key={i}
            className="puja-flash-word"
            style={{ "--i": i } as React.CSSProperties}
            data-gold={word === "Pujo" || word === "Obhijaan" || undefined}
          >
            {word}
          </span>
        ))}
      </p>
      <p className="puja-flash-hint">tap anywhere to continue</p>
    </div>
  );
}
