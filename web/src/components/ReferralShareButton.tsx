"use client";

import { useEffect, useState } from "react";
import { Share2, Copy, Check } from "lucide-react";

export function ReferralShareButton({ referralCode }: { referralCode: string }) {
  const [copied, setCopied] = useState(false);
  // Starts false (matches SSR markup) and flips true post-mount only
  // where the Web Share API actually exists — mobile browsers, mostly.
  // Desktop just gets the link + Copy, with no share sheet to open.
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  // Same production-domain rule as ReferralPanel — a shared link should
  // work the same regardless of where it was generated from.
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? (typeof window !== "undefined" ? window.location.origin : "");
  const link = `${siteUrl}/signup?ref=${referralCode}`;

  async function handleCopy() {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleShare() {
    try {
      await navigator.share({
        title: "Pujo Obhijaan",
        text: "Join me on Pujo Obhijaan for Durga Puja 2026 — pandal-hop, check in, and earn points!",
        url: link,
      });
    } catch {
      // user cancelled the share sheet — nothing to do
    }
  }

  return (
    <div className="mt-1 flex flex-wrap items-center gap-1.5">
      <input
        readOnly
        value={link}
        onFocus={(e) => e.currentTarget.select()}
        className="min-w-0 flex-1 basis-24 truncate rounded border border-[var(--color-border)] bg-[var(--color-bg-main)] px-1.5 py-0.5 text-[11px] text-[var(--color-text-secondary)] outline-none"
      />
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy referral link"
        className="flex flex-shrink-0 items-center gap-1 rounded-full bg-[var(--color-red)] px-2 py-0.5 text-[11px] font-semibold text-white transition-transform hover:scale-[1.02]"
      >
        {copied ? <Check size={12} /> : <Copy size={12} />}
        {copied ? "Copied" : "Copy"}
      </button>
      {canShare && (
        <button
          type="button"
          onClick={handleShare}
          aria-label="Share referral link"
          className="flex flex-shrink-0 items-center gap-1 rounded-full border border-[var(--color-red)] px-2 py-0.5 text-[11px] font-semibold text-[var(--color-red)] transition-transform hover:scale-[1.02]"
        >
          <Share2 size={12} />
          Share
        </button>
      )}
    </div>
  );
}
