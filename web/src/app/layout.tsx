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
    default: "Pujo Obhijaan — Kolkata's Best Pandal Hopping Game | Durga Puja 2026",
    template: "%s — Pujo Obhijaan",
  },
  description:
    "Turn your pandal-hopping into an exciting game! Browse 1900+ Durga Puja pandals across Kolkata with an interactive map, smart route optimization, and a competitive leaderboard. Check in at pandals, earn points, and climb the ranks during Durga Puja 2026.",
  keywords: [
    "Durga Puja",
    "Kolkata pandals",
    "Durga Puja 2026",
    "pandal hopping",
    "pandal hopping game",
    "Kolkata Durga Puja map",
    "puja pandal guide",
    "Kolkata puja itinerary",
    "Durga Puja Kolkata",
    "pandal finder",
    "route optimizer",
    "Kolkata events",
    "cultural events Kolkata",
    "Bengali festivals",
    "Durga Puja celebration",
    "festival app",
    "Kolkata tourism",
    "Durga Puja planning",
  ],
  authors: [{ name: "Pujo Obhijaan" }],
  creator: "Pujo Obhijaan Team",
  category: "travel",
  manifest: "/manifest.json",
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/",
    }
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Pujo Obhijaan",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Pujo Obhijaan",
    title: "Turn YOUR Pandal-Hopping into a GAME | Durga Puja 2026",
    description:
      "Explore 1900+ pandals, optimize your route, find parking & toilets, and earn points on the leaderboard. The ultimate companion app for Durga Puja in Kolkata.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pujo Obhijaan - Interactive Pandal Hopping Game",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pujo Obhijaan — Pandal Hopping Game for Durga Puja 2026",
    description:
      "Turn your pandal-hopping into a game with route optimization, leaderboard rankings, and location-based check-ins across Kolkata's 1900+ pandals.",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
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

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Pujo Obhijaan",
  description:
    "Turn your pandal-hopping into an exciting game! Browse 1900+ Durga Puja pandals across Kolkata with an interactive map, smart route optimization, and a competitive leaderboard.",
  url: SITE_URL,
  applicationCategory: "TravelApplication",
  operatingSystem: "Web, Android, iOS",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "150",
  },
  featureList: [
    "Browse 1900+ Durga Puja pandals across Kolkata",
    "Interactive map with real-time navigation",
    "Smart route optimizer using AI",
    "Public toilet and parking finder",
    "Gamified check-in system with points",
    "Competitive leaderboard",
    "Custom itinerary builder",
  ],
  screenshot: "/og-image.png",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Pujo Obhijaan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pujo Obhijaan is a gamified app that turns pandal-hopping during Durga Puja in Kolkata into an exciting adventure. Browse 1900+ pandals, optimize your route, find facilities, and compete on leaderboards.",
      },
    },
    {
      "@type": "Question",
      name: "How does the route optimizer work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Select multiple pandals you want to visit, and our AI-powered route optimizer will automatically find the most efficient path to visit all of them, saving you time and energy.",
      },
    },
    {
      "@type": "Question",
      name: "Is Pujo Obhijaan free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Pujo Obhijaan is completely free to use. Sign up, browse pandals, optimize routes, check in, and earn points without any subscription fees.",
      },
    },
    {
      "@type": "Question",
      name: "How do I earn points?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You earn points for every pandal you visit and check in at using GPS verification. Climb the leaderboard and compete with other explorers.",
      },
    },
    {
      "@type": "Question",
      name: "Can I find parking and toilets on the map?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Toggle the parking and toilet overlays on the map to find nearby facilities. See information about hours, fees, capacity, and available features.",
      },
    },
  ],
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
        <Script id="ld-software-app" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(softwareApplicationJsonLd)}
        </Script>
        <Script id="ld-faq" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(faqJsonLd)}
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
