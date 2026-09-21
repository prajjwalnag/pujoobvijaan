"use client";

import { useState } from "react";
import { Siren, Phone, X } from "lucide-react";

const SOS_CONTACTS = [
  { label: "Police", number: "100", note: "Crime, theft, or immediate danger" },
  { label: "Fire", number: "101", note: "Fire emergency" },
  { label: "Women's Helpline", number: "1091", note: "Safety emergency / women in distress" },
];

export function SosButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Emergency SOS — police, fire, women's helpline"
        className="fixed bottom-5 left-4 z-[1005] flex items-center gap-2 rounded-full bg-[var(--color-red)] px-4 py-3 text-sm font-semibold text-white shadow-lg"
      >
        <Siren size={16} />
        SOS
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-[1100] bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-x-4 bottom-4 z-[1110] mx-auto max-w-sm rounded-2xl bg-[var(--color-bg-main)] p-5 shadow-lg sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:w-full sm:-translate-x-1/2 sm:-translate-y-1/2">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-bold text-[var(--color-red)]">
                <Siren size={20} />
                Emergency SOS
              </h2>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded-full bg-[var(--color-bg-secondary)] p-1.5 text-[var(--color-text-secondary)]"
              >
                <X size={16} />
              </button>
            </div>
            <p className="mb-4 text-sm text-[var(--color-text-secondary)]">
              Tap a number to call it immediately.
            </p>
            <div className="flex flex-col gap-2">
              {SOS_CONTACTS.map((c) => (
                <a
                  key={c.number}
                  href={`tel:${c.number}`}
                  className="flex items-center justify-between rounded-lg border border-[var(--color-border)] px-4 py-3 transition-colors hover:border-[var(--color-red)] hover:bg-[var(--color-bg-secondary)]"
                >
                  <span>
                    <span className="block font-semibold text-[var(--color-text-primary)]">
                      {c.label}
                    </span>
                    <span className="block text-xs text-[var(--color-text-secondary)]">
                      {c.note}
                    </span>
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full bg-[var(--color-red)] px-3 py-1.5 text-sm font-bold text-white">
                    <Phone size={14} />
                    {c.number}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
