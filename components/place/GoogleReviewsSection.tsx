/**
 * GoogleReviewsSection - Display Google Reviews from scraped_content
 *
 * Shows top reviews scraped from Google Maps to provide
 * social proof and real customer feedback.
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ThumbsUp, ExternalLink } from "lucide-react";

interface GoogleReview {
  text: string;
  rating: number;
  author: string;
  date?: string | null;
  likes?: number;
}

interface GoogleReviewsSectionProps {
  reviews: GoogleReview[];
  placeName: string;
  googleMapsUrl?: string | null;
  locale?: string;
  className?: string;
}

export function GoogleReviewsSection({
  reviews,
  placeName,
  googleMapsUrl,
  locale = "en",
  className = "",
}: GoogleReviewsSectionProps) {
  // Don't render if no reviews
  if (!reviews || reviews.length === 0) {
    return null;
  }

  // Filter out reviews with very short text
  const validReviews = reviews.filter((r) => r.text && r.text.length > 20);
  if (validReviews.length === 0) {
    return null;
  }

  const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return null;
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString(locale === "nl" ? "nl-NL" : "en-US", {
        year: "numeric",
        month: "short",
      });
    } catch {
      return null;
    }
  };

  return (
    <Card className={`bg-gradient-to-br from-blue-50/50 to-white border-blue-100 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            {locale === "nl" ? "Google Reviews" : "Google Reviews"}
          </CardTitle>
          {googleMapsUrl && (
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
            >
              {locale === "nl" ? "Bekijk alle reviews" : "View all reviews"}
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {validReviews.slice(0, 5).map((review, index) => (
          <div
            key={index}
            className="border-b border-slate-100 pb-4 last:border-0 last:pb-0"
          >
            {/* Header: Stars, Author, Date */}
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {/* Star Rating */}
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-3.5 w-3.5 ${
                      star <= review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-slate-200"
                    }`}
                  />
                ))}
              </div>
              {/* Author */}
              <span className="text-sm font-medium text-slate-700">
                {review.author || (locale === "nl" ? "Anoniem" : "Anonymous")}
              </span>
              {/* Date */}
              {review.date && (
                <span className="text-xs text-slate-400">
                  {formatDate(review.date)}
                </span>
              )}
              {/* Likes */}
              {review.likes && review.likes > 0 && (
                <Badge
                  variant="secondary"
                  className="text-xs gap-1 bg-slate-100 text-slate-500"
                >
                  <ThumbsUp className="h-3 w-3" />
                  {review.likes}
                </Badge>
              )}
            </div>
            {/* Review Text */}
            <p className="text-sm text-slate-600 leading-relaxed">
              {review.text.length > 300
                ? `${review.text.substring(0, 300)}...`
                : review.text}
            </p>
          </div>
        ))}

        {/* Attribution */}
        <p className="text-xs text-slate-400 pt-2 text-center">
          {locale === "nl"
            ? "Reviews van Google Maps"
            : "Reviews from Google Maps"}
        </p>
      </CardContent>
    </Card>
  );
}

export default GoogleReviewsSection;
