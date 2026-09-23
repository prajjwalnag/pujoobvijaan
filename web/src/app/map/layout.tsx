import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interactive Durga Puja Pandal Map — Kolkata",
  description:
    "See every Durga Puja pandal in Kolkata on an interactive map, filter by region and crowd level, and check in as you visit.",
  alternates: { canonical: "/map" },
};

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return children;
}
