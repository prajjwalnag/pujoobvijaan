"use client";

import { MapPin } from "lucide-react";
import { tileThumbnailUrl } from "@/lib/tileThumbnail";
import { useTheme } from "./ThemeProvider";
import type { Pandal } from "@/data/types";

// No real event photos exist for these pandals, so this shows a real map
// tile at the pandal's actual coordinates instead of faking a photo — same
// honesty rule as the rest of the app's data. Labeled "Map preview" rather
// than left to look like a photo.
export function PandalThumb({ pandal }: { pandal: Pandal }) {
  const { theme } = useTheme();
  const url = tileThumbnailUrl(pandal.coordinates.lat, pandal.coordinates.lng, 15, theme);

  return (
    <div className="relative -mx-4 -mt-5 mb-1 h-28 w-[calc(100%+2rem)] overflow-hidden bg-[var(--color-bg-tertiary)]">
      <img
        src={url}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover"
        style={{ filter: theme === "dark" ? "brightness(0.9)" : undefined }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <MapPin size={22} className="text-[var(--color-red)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]" fill="#8b0000" />
      </div>
      <span className="absolute bottom-1 right-1.5 rounded bg-black/55 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white">
        Map preview
      </span>
    </div>
  );
}
