import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kolkata Puja Atlas — Neighbourhoods & Pandal Clusters",
  description:
    "Explore Kolkata's Durga Puja neighbourhoods — pandal clusters, nearby cafes, restaurants, and things to do between pandal hops.",
  alternates: { canonical: "/atlas" },
};

export default function AtlasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
