"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (rating: number) => void;
  showValue?: boolean;
  className?: string;
}

const sizeMap = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

const gapMap = {
  sm: "gap-0.5",
  md: "gap-0.5",
  lg: "gap-1",
};

export function RatingStars({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onChange,
  showValue = false,
  className,
}: RatingStarsProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const displayRating = hoverRating ?? rating;
  const starSize = sizeMap[size];
  const gap = gapMap[size];

  const handleClick = (starIndex: number) => {
    if (interactive && onChange) {
      onChange(starIndex);
    }
  };

  const handleMouseEnter = (starIndex: number) => {
    if (interactive) {
      setHoverRating(starIndex);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(null);
    }
  };

  return (
    <div className={cn("flex items-center", gap, className)}>
      <div className={cn("flex", gap)}>
        {Array.from({ length: maxRating }, (_, i) => {
          const starIndex = i + 1;
          const isFilled = starIndex <= displayRating;
          const isHalf = !isFilled && starIndex - 0.5 <= displayRating;

          return (
            <button
              key={starIndex}
              type="button"
              onClick={() => handleClick(starIndex)}
              onMouseEnter={() => handleMouseEnter(starIndex)}
              onMouseLeave={handleMouseLeave}
              disabled={!interactive}
              className={cn(
                "transition-transform",
                interactive && "cursor-pointer hover:scale-110",
                !interactive && "cursor-default"
              )}
              aria-label={`${starIndex} star${starIndex > 1 ? "s" : ""}`}
            >
              <Star
                className={cn(
                  starSize,
                  "transition-colors",
                  isFilled
                    ? "text-yellow-500 fill-yellow-500"
                    : isHalf
                      ? "text-yellow-500 fill-yellow-500/50"
                      : "text-gray-300",
                  interactive && hoverRating && starIndex <= hoverRating && "text-yellow-400 fill-yellow-400"
                )}
              />
            </button>
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm text-muted-foreground ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}

// Compact display for cards
export function RatingBadge({
  rating,
  reviewCount,
  size = "sm",
  className,
}: {
  rating: number | string | null;
  reviewCount?: number;
  size?: "sm" | "md";
  className?: string;
}) {
  const numericRating = typeof rating === "string" ? parseFloat(rating) : rating;

  if (!numericRating || numericRating === 0) {
    return (
      <span className={cn("text-xs text-muted-foreground", className)}>
        No reviews yet
      </span>
    );
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Star
        className={cn(
          "text-yellow-500 fill-yellow-500",
          size === "sm" ? "h-3 w-3" : "h-4 w-4"
        )}
      />
      <span className={cn("font-medium", size === "sm" ? "text-xs" : "text-sm")}>
        {numericRating.toFixed(1)}
      </span>
      {reviewCount !== undefined && reviewCount > 0 && (
        <span className={cn("text-muted-foreground", size === "sm" ? "text-xs" : "text-sm")}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
