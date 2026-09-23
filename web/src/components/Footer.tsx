"use client";

import Link from "next/link";
import { usePartners } from "./usePartners";

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PartnersRow() {
  const { allPartners } = usePartners();
  const hasPartners = allPartners.length > 0;

  return (
    <div className="border-b border-[var(--color-border)] py-8">
      <div className="mx-auto max-w-[1400px] px-4 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-text-light)]">
          Our Partners
        </p>

        {hasPartners ? (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {allPartners.map((partner) => {
              const logo = (
                <img
                  src={partner.logoUrl}
                  alt={partner.name}
                  loading="lazy"
                  className="h-10 w-auto grayscale transition-all duration-300 hover:grayscale-0"
                />
              );
              return partner.website ? (
                <a
                  key={partner.id}
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={partner.name}
                >
                  {logo}
                </a>
              ) : (
                <span key={partner.id} aria-label={partner.name}>
                  {logo}
                </span>
              );
            })}
          </div>
        ) : (
          <p className="mx-auto mt-3 max-w-md text-sm text-[var(--color-text-secondary)]">
            We&apos;re onboarding our first partner brands for Puja 2026 — food spots and jewellery
            brands wanting free early-access visibility, say hello on Instagram or Facebook below.
          </p>
        )}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-[var(--color-bg-main)]">
      <PartnersRow />
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-3 px-4 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm text-[var(--color-text-secondary)]">
          Made with ❤️ by{" "}
          <a
            href="https://mwragency.vercel.app/"
            target="_blank"
            rel="noopener"
            className="font-semibold text-[var(--color-red)] hover:underline"
          >
            MWR Agency
          </a>
        </p>
        <div className="flex items-center gap-4">
          <a
            href="#"
            aria-label="Facebook"
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-red)]"
          >
            <FacebookIcon />
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-red)]"
          >
            <InstagramIcon />
          </a>
        </div>
        <div className="flex flex-col items-center gap-1 sm:items-end">
          <div className="flex items-center gap-3 text-xs text-[var(--color-text-light)]">
            <Link href="/privacy" className="hover:text-[var(--color-red)] hover:underline">
              Privacy Policy
            </Link>
            <span aria-hidden>·</span>
            <Link href="/terms" className="hover:text-[var(--color-red)] hover:underline">
              Terms of Service
            </Link>
          </div>
          <p className="text-sm text-[var(--color-text-light)]">
            Copyright © 2026 Pujo Obhijaan
          </p>
        </div>
      </div>
    </footer>
  );
}
