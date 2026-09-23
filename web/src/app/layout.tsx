import type { Metadata } from "next";
import { Geist, Geist_Mono, Abril_Fatface } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider, THEME_INIT_SCRIPT } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { PointsProvider } from "@/components/PointsProvider";
import { PointsToast } from "@/components/PointsToast";
import { SosButton } from "@/components/SosButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const abrilFatface = Abril_Fatface({
  variable: "--font-abril-fatface",
  weight: "400",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.pujoobhijaan.online";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Pujo Obhijaan — Kolkata's Best Pandal Hopping Game",
    template: "%s — Pujo Obhijaan",
  },
  description:
    "Turn your pandal-hopping into a game. Browse 300+ Durga Puja pandals across Kolkata with an interactive map, build an itinerary, and earn points on the leaderboard for Durga Puja 2026.",
  keywords: [
    "Durga Puja",
    "Kolkata pandals",
    "Durga Puja 2026",
    "pandal hopping",
    "Kolkata Durga Puja map",
    "puja pandal guide",
    "Kolkata puja itinerary",
    "Durga Puja Kolkata",
  ],
  authors: [{ name: "Pujo Obhijaan" }],
  category: "travel",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Pujo Obhijaan",
    title: "Turn YOUR Pandal-Hopping into a GAME",
    description:
      "Pujo Obhijaan — an interactive map, itinerary builder, and leaderboard for Durga Puja 2026 in Kolkata.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Turn YOUR Pandal-Hopping into a GAME",
    description:
      "Pujo Obhijaan — an interactive map, itinerary builder, and leaderboard for Durga Puja 2026 in Kolkata.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Pujo Obhijaan",
  url: SITE_URL,
  description: "A guide for planning, exploring, and navigating Kolkata's Durga Puja pandals.",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Pujo Obhijaan",
  url: SITE_URL,
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Durga Puja 2026, Kolkata",
  startDate: "2026-10-16",
  endDate: "2026-10-20",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: "Kolkata",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kolkata",
      addressRegion: "West Bengal",
      addressCountry: "IN",
    },
  },
  description:
    "Durga Puja pandal-hopping across Kolkata, from Maha Shashthi through Vijaya Dashami.",
  organizer: {
    "@type": "Organization",
    name: "Pujo Obhijaan",
    url: SITE_URL,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${abrilFatface.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
        <Script id="ld-organization" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(organizationJsonLd)}
        </Script>
        <Script id="ld-website" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(websiteJsonLd)}
        </Script>
        <Script id="ld-event" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(eventJsonLd)}
        </Script>
        <ThemeProvider>
          <AuthProvider>
            <PointsProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <PointsToast />
              <SosButton />
            </PointsProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
