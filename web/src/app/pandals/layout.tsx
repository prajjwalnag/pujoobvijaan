import type { Metadata } from "next";
import { pandals } from "@/data/pandals";

export const metadata: Metadata = {
  title: "Browse Durga Puja Pandals in Kolkata",
  description:
    `Browse and filter ${pandals.length}+ Durga Puja pandals across Kolkata by region and crowd level, with ratings, themes, and visiting hours.`,
  alternates: { canonical: "/pandals" },
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Durga Puja Pandals in Kolkata",
  numberOfItems: pandals.length,
  itemListElement: pandals.slice(0, 50).map((pandal, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: pandal.name,
    item: {
      "@type": "TouristAttraction",
      name: pandal.name,
      touristType: "Durga Puja pandal visitor",
      ...(pandal.theme ? { description: pandal.theme } : {}),
      address: {
        "@type": "PostalAddress",
        addressLocality: pandal.region,
        addressRegion: "West Bengal",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: pandal.coordinates.lat,
        longitude: pandal.coordinates.lng,
      },
    },
  })),
};

export default function PandalsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      {children}
    </>
  );
}
