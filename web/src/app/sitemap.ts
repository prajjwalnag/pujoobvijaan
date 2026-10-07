import type { MetadataRoute } from 'next';
import { pandals } from '@/data/pandals';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.pujoobhijaan.online';

export default function sitemap(): MetadataRoute.Sitemap {
  const basePages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/pandals`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/map`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/leaderboard`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/earn`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/auth/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/auth/signup`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Add individual pandal pages (first 500 to avoid sitemap size limits)
  const pandalPages = pandals.slice(0, 500).map((pandal) => ({
    url: `${SITE_URL}/pandals/${pandal.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...basePages, ...pandalPages];
}
