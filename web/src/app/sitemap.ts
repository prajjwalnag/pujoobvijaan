import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.pujoobhijaan.online";

const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "daily" },
  { path: "/pandals", priority: 0.9, changeFrequency: "weekly" },
  { path: "/map", priority: 0.9, changeFrequency: "weekly" },
  { path: "/atlas", priority: 0.7, changeFrequency: "weekly" },
  { path: "/network", priority: 0.6, changeFrequency: "weekly" },
  { path: "/itinerary", priority: 0.7, changeFrequency: "weekly" },
  { path: "/leaderboard", priority: 0.6, changeFrequency: "daily" },
  { path: "/contributions", priority: 0.4, changeFrequency: "monthly" },
  { path: "/earn", priority: 0.5, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
