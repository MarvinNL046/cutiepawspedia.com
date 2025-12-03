"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { ReviewCard, ReviewData } from "./ReviewCard";
import { ReviewSummary, ReviewStats } from "./ReviewSummary";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type SortOption = "newest" | "oldest" | "highest" | "lowest";

interface ReviewListProps {
  placeId: number;
  initialReviews?: ReviewData[];
  initialStats?: ReviewStats;
  className?: string;
  showSummary?: boolean;
  showSort?: boolean;
  pageSize?: number;
}

export function ReviewList({
  placeId,
  initialReviews = [],
  initialStats,
  className,
  showSummary = true,
  showSort = true,
  pageSize = 10,
}: ReviewListProps) {
  const [reviews, setReviews] = useState<ReviewData[]>(initialReviews);
  const [stats, setStats] = useState<ReviewStats | undefined>(initialStats);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialReviews.length >= pageSize);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [page, setPage] = useState(1);

  // Fetch reviews from API
  const fetchReviews = async (reset = false) => {
    setIsLoading(true);
    const currentPage = reset ? 1 : page;

    try {
      const params = new URLSearchParams({
        placeId: placeId.toString(),
        limit: pageSize.toString(),
        offset: ((currentPage - 1) * pageSize).toString(),
        sortBy,
      });

      const response = await fetch(`/api/reviews?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }

      const data = await response.json();

      if (reset) {
        setReviews(data.reviews);
        setPage(1);
      } else {
        setReviews((prev) => [...prev, ...data.reviews]);
      }

      setStats(data.stats);
      setHasMore(data.reviews.length >= pageSize);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch when sort changes
  useEffect(() => {
    if (initialReviews.length === 0) {
      fetchReviews(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  const handleLoadMore = () => {
    setPage((p) => p + 1);
  };

  // Fetch more when page changes
  useEffect(() => {
    if (page > 1) {
      fetchReviews(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleSortChange = (value: string) => {
    setSortBy(value as SortOption);
    setPage(1);
    fetchReviews(true);
  };

  // Sort client-side for initial data
  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  return (
    <div className={cn("space-y-6", className)}>
      {/* Summary */}
      {showSummary && stats && (
        <ReviewSummary stats={stats} />
      )}

      {/* Sort and Count */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">
          {reviews.length > 0 ? (
            `${stats?.reviewCount || reviews.length} Reviews`
          ) : (
            "Reviews"
          )}
        </h3>
        {showSort && reviews.length > 1 && (
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
              <SelectItem value="highest">Highest rated</SelectItem>
              <SelectItem value="lowest">Lowest rated</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Reviews */}
      {sortedReviews.length === 0 && !isLoading ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No reviews yet.</p>
          <p className="text-sm mt-1">Be the first to share your experience!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More Reviews"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

// Server component wrapper for initial data
export function ReviewListServer({
  reviews,
  stats,
  placeId,
  className,
}: {
  reviews: ReviewData[];
  stats: ReviewStats;
  placeId: number;
  className?: string;
}) {
  return (
    <ReviewList
      placeId={placeId}
      initialReviews={reviews}
      initialStats={stats}
      className={className}
    />
  );
}
