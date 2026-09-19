"use client";

import { Heart, Clock, TrainFront, MapPinned, Navigation } from "lucide-react";
import clsx from "clsx";
import { Badge, crowdVariant } from "./Badge";
import { RatingDisplay } from "./RatingDisplay";
import type { Pandal } from "@/data/types";

const sizeLabel = { high: "Big", medium: "Medium", low: "Small" } as const;

export function PandalCard({
  pandal,
  isWishlisted = false,
  onWishlist,
}: {
  pandal: Pandal;
  isWishlisted?: boolean;
  onWishlist?: (id: string) => void;
}) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${pandal.coordinates.lat},${pandal.coordinates.lng}`;

  return (
    <div className="group relative flex min-h-[220px] flex-col overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 pt-5 shadow-[var(--shadow-light)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-medium)]">
      <div className="absolute inset-x-0 top-0 h-1 bg-[var(--color-gold)]" />
      <div className="flex items-start justify-between">
        {pandal.rating !== undefined ? (
          <RatingDisplay rating={pandal.rating} />
        ) : (
          <span />
        )}
        <button
          aria-label="Toggle wishlist"
          onClick={() => onWishlist?.(pandal.id)}
          className="text-[var(--color-text-light)] transition-transform hover:scale-110 hover:text-[var(--color-red)]"
        >
          <Heart
            size={20}
            className={clsx(isWishlisted && "fill-[var(--color-red)] text-[var(--color-red)]")}
          />
        </button>
      </div>

      <h3 className="mt-2 text-lg font-bold text-[var(--color-text-primary)]">
        {pandal.name}
      </h3>
      <p className="text-sm text-[var(--color-text-secondary)]">{pandal.region}</p>

      <div className="mt-2 flex flex-wrap gap-2">
        {pandal.theme && <Badge variant="theme">{pandal.theme}</Badge>}
        <Badge variant={crowdVariant(pandal.crowdLevel)}>{sizeLabel[pandal.crowdLevel]}</Badge>
      </div>

      <div className="mt-3 space-y-1.5 text-sm text-[var(--color-text-secondary)]">
        {pandal.visitingHours && (
          <div className="flex items-center gap-2">
            <Clock size={14} />
            {pandal.visitingHours.open} - {pandal.visitingHours.close}
          </div>
        )}
        {pandal.nearestMetro && (
          <div className="flex items-center gap-2">
            <TrainFront size={14} />
            {pandal.nearestMetro.station} ({pandal.nearestMetro.line})
          </div>
        )}
        {pandal.accessPoints?.[0] && (
          <div className="flex items-center gap-2">
            <MapPinned size={14} />
            {pandal.accessPoints[0]}
          </div>
        )}
      </div>

      {pandal.description && (
        <p className="mt-3 flex-1 text-sm text-[var(--color-text-secondary)] line-clamp-2">
          {pandal.description}
        </p>
      )}

      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-[var(--color-red)] px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.02] hover:bg-[var(--color-red-dark)]"
      >
        <Navigation size={14} />
        Directions
      </a>
    </div>
  );
}
