/**
 * Static Rating Badge Component - Server Component
 *
 * PERFORMANCE: No client JS needed for display-only rating badges
 * - Used in place cards, listing cards
 * - Reduces hydration overhead vs full RatingStars component
 */

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingBadgeStaticProps {
  rating: number | string | null;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: {
    icon: "h-3 w-3",
    text: "text-xs",
    gap: "gap-0.5",
  },
  md: {
    icon: "h-4 w-4",
    text: "text-sm",
    gap: "gap-1",
  },
  lg: {
    icon: "h-5 w-5",
    text: "text-base",
    gap: "gap-1.5",
  },
};

export function RatingBadgeStatic({
  rating,
  reviewCount,
  size = "sm",
  className,
}: RatingBadgeStaticProps) {
  const numericRating = typeof rating === "string" ? parseFloat(rating) : rating;

  if (!numericRating || numericRating === 0) {
    return (
      <span className={cn("text-xs text-muted-foreground", className)}>
        No reviews yet
      </span>
    );
  }

  const { icon, text, gap } = sizeClasses[size];

  return (
    <div className={cn("flex items-center", gap, className)}>
      <Star className={cn(icon, "text-yellow-500 fill-yellow-500")} />
      <span className={cn("font-medium", text)}>
        {numericRating.toFixed(1)}
      </span>
      {reviewCount !== undefined && reviewCount > 0 && (
        <span className={cn("text-muted-foreground", text)}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
}

/**
 * Static star display - shows N filled stars out of M total
 * Server component - no client interactivity
 */
export function RatingStarsStatic({
  rating,
  maxRating = 5,
  size = "sm",
  className,
}: {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const { icon, gap } = sizeClasses[size];

  return (
    <div className={cn("flex", gap, className)}>
      {Array.from({ length: maxRating }, (_, i) => {
        const isFilled = i + 1 <= rating;
        const isHalf = !isFilled && i + 0.5 < rating;

        return (
          <Star
            key={i}
            className={cn(
              icon,
              "transition-colors",
              isFilled
                ? "text-yellow-500 fill-yellow-500"
                : isHalf
                  ? "text-yellow-500 fill-yellow-500/50"
                  : "text-gray-300"
            )}
          />
        );
      })}
    </div>
  );
}

export default RatingBadgeStatic;
