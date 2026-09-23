import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Durga Puja Pandal-Hopping Itineraries",
  description:
    "Sample and custom Durga Puja pandal-hopping routes across Kolkata, with real distances and suggested visiting times.",
  alternates: { canonical: "/itinerary" },
};

export default function ItineraryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
