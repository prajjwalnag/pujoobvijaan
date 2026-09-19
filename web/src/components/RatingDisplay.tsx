import { Star } from "lucide-react";

export function RatingDisplay({
  rating,
  count,
  size = "md",
}: {
  rating: number;
  count?: number;
  size?: "sm" | "md" | "lg";
}) {
  const px = { sm: 14, md: 16, lg: 20 }[size];
  const textSize = { sm: "text-xs", md: "text-sm", lg: "text-base" }[size];

  return (
    <span className={`inline-flex items-center gap-1 ${textSize} font-semibold`}>
      <Star size={px} className="fill-[#FFB700] text-[#FFB700]" />
      {rating.toFixed(1)}
      {count !== undefined && (
        <span className="text-[var(--color-text-light)] font-normal">({count})</span>
      )}
    </span>
  );
}
