import Link from "next/link";
import type { Metadata } from "next";
import { Map as MapIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "Every page on Pujo Obhijaan, in one place.",
  alternates: { canonical: "/sitemap" },
};

const SECTIONS: { heading: string; links: { href: string; label: string }[] }[] = [
  {
    heading: "Explore",
    links: [
      { href: "/", label: "Home" },
      { href: "/pandals", label: "Pandals" },
      { href: "/map", label: "Interactive Map" },
      { href: "/atlas", label: "Atlas" },
      { href: "/network", label: "Network" },
      { href: "/itinerary", label: "Itinerary" },
    ],
  },
  {
    heading: "Play",
    links: [
      { href: "/leaderboard", label: "Leaderboard" },
      { href: "/earn", label: "How to Earn Points" },
      { href: "/contributions", label: "Contributions" },
    ],
  },
  {
    heading: "Account",
    links: [
      { href: "/login", label: "Log In" },
      { href: "/signup", label: "Sign Up" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div className="mx-auto max-w-[720px] px-4 py-10 sm:px-6">
      <div className="flex items-center gap-2">
        <MapIcon className="text-[var(--color-red)]" size={26} />
        <h1 className="text-[28px] font-bold text-[var(--color-text-primary)]">Sitemap</h1>
      </div>
      <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
        Every page on Pujo Obhijaan.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {SECTIONS.map((section) => (
          <div key={section.heading}>
            <h2 className="text-xs font-bold uppercase tracking-wide text-[var(--color-text-light)]">
              {section.heading}
            </h2>
            <ul className="mt-2 flex flex-col gap-2">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-red)] hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
