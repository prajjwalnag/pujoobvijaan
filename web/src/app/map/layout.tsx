import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interactive Map",
  description:
    "Explore Durga Puja pandals on an interactive map with route optimization, parking finder, toilet locator, and real-time check-ins for Kolkata.",
  alternates: { canonical: "/map" },
};

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return children;
}
