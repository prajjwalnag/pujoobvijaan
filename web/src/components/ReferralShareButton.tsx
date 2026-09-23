"use client";

import { useState } from "react";
import { Share2, Copy, Check } from "lucide-react";

export function ReferralShareButton({ referralCode }: { referralCode: string }) {
  const [copied, setCopied] = useState(false);

  // Same production-domain rule as ReferralPanel — a shared link should
  // work the same regardless of where it was generated from.
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? (typeof window !== "undefined" ? window.location.origin : "");
  const link = `${siteUrl}/signup?ref=${referralCode}`;

  async function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Pujo Obhijaan",
          text: "Join me on Pujo Obhijaan for Durga Puja 2026 — pandal-hop, check in, and earn points!",
          url: link,
        });
        return;
      } catch {
        // user cancelled the share sheet — fall through to copy as a backup
      }
    }
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="mt-1 inline-flex items-center gap-1 rounded-full bg-[var(--color-red)] px-2.5 py-1 text-[11px] font-semibold text-white transition-transform hover:scale-[1.02]"
    >
      {copied ? <Check size={12} /> : <Share2 size={12} />}
      {copied ? "Copied" : "Share invite link"}
    </button>
  );
}
