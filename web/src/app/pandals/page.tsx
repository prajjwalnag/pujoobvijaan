"use client";

import { useMemo, useState } from "react";
import { FilterBar } from "@/components/FilterBar";
import { PandalCard } from "@/components/PandalCard";
import { pandals, regions } from "@/data/pandals";

export default function PandalsPage() {
  const [region, setRegion] = useState("all");
  const [crowd, setCrowd] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    return pandals.filter((p) => {
      if (region !== "all" && p.region !== region) return false;
      if (crowd !== "all" && p.crowdLevel !== crowd) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [region, crowd, search]);

  function toggleWishlist(id: string) {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6">
      <h1 className="text-[32px] font-bold text-[var(--color-text-primary)]">
        Pandals
      </h1>
      <p className="mt-1 text-[var(--color-text-secondary)]">
        Browse and filter Durga Puja pandals across Kolkata
      </p>

      <div className="mt-6">
        <FilterBar
          regions={regions}
          selectedRegion={region}
          selectedCrowdLevel={crowd}
          viewMode={viewMode}
          searchQuery={search}
          onRegionChange={setRegion}
          onCrowdChange={setCrowd}
          onViewChange={setViewMode}
          onSearchChange={setSearch}
        />
      </div>

      <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
        Showing {filtered.length} of {pandals.length} pandals
      </p>

      <div
        className={
          viewMode === "grid"
            ? "mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "mt-4 flex flex-col gap-4"
        }
      >
        {filtered.map((pandal) => (
          <PandalCard
            key={pandal.id}
            pandal={pandal}
            isWishlisted={wishlist.has(pandal.id)}
            onWishlist={toggleWishlist}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-[var(--color-text-secondary)]">
          No pandals match your filters.
        </p>
      )}
    </div>
  );
}
