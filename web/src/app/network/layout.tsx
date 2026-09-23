import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pandal Network Graph",
  description: "A visual network of Kolkata's Durga Puja pandals, grouped by region and crowd tier.",
  alternates: { canonical: "/network" },
};

export default function NetworkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
