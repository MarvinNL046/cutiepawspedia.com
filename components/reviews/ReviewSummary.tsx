"use client";

import { Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export interface ReviewStats {
  avgRating: number | string | null;
  reviewCount: number;
  ratingBreakdown?: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

interface ReviewSummaryProps {
  stats: ReviewStats;
  className?: string;
  showBreakdown?: boolean;
}

export function ReviewSummary({
  stats,
  className,
  showBreakdown = true,
}: ReviewSummaryProps) {
  const rating = typeof stats.avgRating === "string"
    ? parseFloat(stats.avgRating)
    : stats.avgRating || 0;

  const breakdown = stats.ratingBreakdown || { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  const total = stats.reviewCount || 0;

  if (total === 0) {
    return (
      <div className={cn("text-center py-6", className)}>
        <div className="flex justify-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="h-6 w-6 text-gray-200" />
          ))}
        </div>
        <p className="text-muted-foreground text-sm">No reviews yet</p>
        <p className="text-xs text-muted-foreground mt-1">
          Be the first to share your experience!
        </p>
      </div>
    );
  }

  return (
    <div className={cn("flex gap-6", className)}>
      {/* Overall Rating */}
      <div className="flex flex-col items-center justify-center">
        <div className="text-4xl font-bold">{rating.toFixed(1)}</div>
        <div className="flex gap-0.5 my-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              className={cn(
                "h-4 w-4",
                i <= Math.round(rating)
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-300"
              )}
            />
          ))}
        </div>
        <div className="text-sm text-muted-foreground">
          {total} {total === 1 ? "review" : "reviews"}
        </div>
      </div>

      {/* Rating Breakdown */}
      {showBreakdown && total > 0 && (
        <div className="flex-1 space-y-1.5">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = breakdown[stars as keyof typeof breakdown] || 0;
            const percentage = total > 0 ? (count / total) * 100 : 0;

            return (
              <div key={stars} className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-3">
                  {stars}
                </span>
                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                <Progress value={percentage} className="h-2 flex-1" />
                <span className="text-xs text-muted-foreground w-8 text-right">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Compact version for cards
export function ReviewSummaryCompact({
  stats,
  className,
}: {
  stats: ReviewStats;
  className?: string;
}) {
  const rating = typeof stats.avgRating === "string"
    ? parseFloat(stats.avgRating)
    : stats.avgRating || 0;
  const total = stats.reviewCount || 0;

  if (total === 0) {
    return (
      <span className={cn("text-xs text-muted-foreground", className)}>
        No reviews
      </span>
    );
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
      <span className="text-sm font-medium">{rating.toFixed(1)}</span>
      <span className="text-xs text-muted-foreground">({total})</span>
    </div>
  );
}
