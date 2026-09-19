"use client";

import { useEffect, useRef, useState } from "react";
import { Flame } from "lucide-react";

const WORDS = "Let your Pujo Obhijaan be the best in town.".split(" ");

export function RevealTagline() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative mx-auto my-20 flex max-w-3xl flex-col items-center overflow-hidden px-4 py-14 text-center"
    >
      <div
        className={`flame-burst mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-red)] text-[var(--color-gold-light)] ${
          visible ? "flame-burst-on" : ""
        }`}
      >
        <Flame size={26} fill="currentColor" />
      </div>

      <h2 className="flex flex-wrap justify-center gap-x-3 text-3xl font-bold sm:text-4xl">
        {WORDS.map((word, i) => (
          <span
            key={i}
            className="reveal-word inline-block"
            style={{
              transitionDelay: visible ? `${i * 70}ms` : "0ms",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(0.6em)",
              color: word.replace(/[.,]/g, "") === "Obhijaan" ? "var(--color-gold-dark)" : "var(--color-red)",
            }}
          >
            {word}
          </span>
        ))}
      </h2>

      <div
        className="gold-rule mt-5 h-[3px] rounded-full transition-all duration-700 ease-out"
        style={{ width: visible ? "160px" : "0px" }}
      />
    </div>
  );
}
