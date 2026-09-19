"use client";

import { useState } from "react";
import { Handshake, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePartners } from "@/components/usePartners";
import { Button } from "@/components/Button";
import type { Partner } from "@/data/types";

const CATEGORIES: { value: Partner["category"]; label: string }[] = [
  { value: "food", label: "Food" },
  { value: "jewellery", label: "Jewellery" },
  { value: "other", label: "Other" },
];

export default function PartnersPage() {
  const { allPartners, addedPartners, addPartner, removePartner } = usePartners();

  const [name, setName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [website, setWebsite] = useState("");
  const [category, setCategory] = useState<Partner["category"]>("food");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !logoUrl.trim()) {
      setError("Name and logo URL are required.");
      return;
    }
    setError(null);
    addPartner({
      id: `local-${Date.now()}`,
      name: name.trim(),
      logoUrl: logoUrl.trim(),
      website: website.trim() || undefined,
      category,
    });
    setName("");
    setLogoUrl("");
    setWebsite("");
    setCategory("food");
  }

  return (
    <div className="mx-auto max-w-[700px] px-4 py-8 sm:px-6">
      <div className="flex items-center gap-2">
        <Handshake className="text-[var(--color-red)]" size={28} />
        <h1 className="text-[32px] font-bold text-[var(--color-text-primary)]">Add a Partner</h1>
      </div>
      <p className="mt-1 text-[var(--color-text-secondary)]">
        Add a partner logo to show in the site footer. There&apos;s no backend behind this app yet,
        so partners added here are saved only in <strong>this browser</strong> (localStorage) — they
        won&apos;t appear for other visitors. To get a brand onboarded for real, for everyone, add
        them to{" "}
        <code className="rounded bg-[var(--color-bg-tertiary)] px-1.5 py-0.5 text-sm">
          src/data/partners.ts
        </code>{" "}
        in the codebase, or reach out via the brand pitch doc.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 flex flex-col gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5"
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="partner-name" className="text-sm font-semibold text-[var(--color-text-primary)]">
            Brand name
          </label>
          <input
            id="partner-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Balaram Mullick & Radharaman Mullick"
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-main)] px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-red)]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="partner-logo" className="text-sm font-semibold text-[var(--color-text-primary)]">
            Logo URL
          </label>
          <input
            id="partner-logo"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            placeholder="https://example.com/logo.png"
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-main)] px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-red)]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="partner-website" className="text-sm font-semibold text-[var(--color-text-primary)]">
            Website <span className="font-normal text-[var(--color-text-light)]">(optional)</span>
          </label>
          <input
            id="partner-website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://example.com"
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-main)] px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-red)]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-[var(--color-text-primary)]">Category</span>
          <div className="flex gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setCategory(c.value)}
                className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors ${
                  category === c.value
                    ? "border-[var(--color-red)] bg-[var(--color-red)] text-white"
                    : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-red)]"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-sm text-[var(--color-red)]">{error}</p>}

        <Button type="submit">Add Partner</Button>
      </form>

      {addedPartners.length > 0 && (
        <div className="mt-6">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wide text-[var(--color-text-secondary)]">
            Added in this browser
          </h2>
          <div className="flex flex-col gap-2">
            {addedPartners.map((partner) => (
              <div
                key={partner.id}
                className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-3"
              >
                <img
                  src={partner.logoUrl}
                  alt={partner.name}
                  className="h-8 w-8 rounded object-contain"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                    {partner.name}
                  </p>
                  <p className="text-xs text-[var(--color-text-light)] capitalize">
                    {partner.category}
                  </p>
                </div>
                <button
                  onClick={() => removePartner(partner.id)}
                  aria-label={`Remove ${partner.name}`}
                  className="text-[var(--color-text-light)] hover:text-[var(--color-red)]"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        <h2 className="mb-3 text-xs font-bold uppercase tracking-wide text-[var(--color-text-secondary)]">
          All Partners ({allPartners.length})
        </h2>
        {allPartners.length === 0 ? (
          <p className="text-sm text-[var(--color-text-secondary)]">
            No partners yet — be the first to add one above.
          </p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {allPartners.map((partner) => (
              <span
                key={partner.id}
                className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text-secondary)]"
              >
                {partner.name}
              </span>
            ))}
          </div>
        )}
      </div>

      <Link
        href="/"
        className="mt-6 flex items-center justify-center gap-2 rounded-lg border border-dashed border-[var(--color-border)] p-3 text-sm font-semibold text-[var(--color-text-secondary)] hover:border-[var(--color-red)] hover:text-[var(--color-red)]"
      >
        Back to home
      </Link>
    </div>
  );
}
