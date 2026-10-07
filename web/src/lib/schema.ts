export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

export function generateArticleSchema({
  headline,
  description,
  datePublished,
  dateModified,
  author,
  image,
  url,
}: {
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  author: string;
  image: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline,
    description,
    image,
    datePublished,
    dateModified,
    author: {
      "@type": "Organization",
      name: author,
    },
    url,
  };
}

export function generateReviewSchema({
  name,
  description,
  reviewRating,
  reviewCount,
  image,
}: {
  name: string;
  description: string;
  reviewRating: number;
  reviewCount: number;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    name,
    description,
    ratingValue: reviewRating.toString(),
    ratingCount: reviewCount.toString(),
    image,
  };
}
