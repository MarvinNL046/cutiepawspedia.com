"use client";

import { useEffect, useRef } from "react";
import { trackPlaceView } from "@/lib/analytics";

interface PlaceViewTrackerProps {
  placeId: number;
  placeName: string;
  placeSlug: string;
  category?: string;
  city?: string;
  country?: string;
  isPremium: boolean;
  isVerified: boolean;
  avgRating?: number;
  reviewCount: number;
}

/**
 * Client component that tracks place detail page views
 * Place this in the place detail page to track views on render
 *
 * This component does two things:
 * 1. Tracks the view for analytics (Vercel Analytics)
 * 2. Records the view to user's recent history (for logged-in users)
 */
export function PlaceViewTracker({
  placeId,
  placeName,
  placeSlug,
  category,
  city,
  country,
  isPremium,
  isVerified,
  avgRating,
  reviewCount,
}: PlaceViewTrackerProps) {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!hasTracked.current) {
      // 1. Track for analytics
      trackPlaceView({
        placeId,
        placeName,
        placeSlug,
        category,
        city,
        country,
        isPremium,
        isVerified,
        avgRating,
        reviewCount,
      });

      // 2. Record to user's recent views history (for logged-in users)
      // This is fire-and-forget - we don't need to wait for the response
      fetch("/api/recent-views", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ placeId }),
      }).catch(() => {
        // Silently ignore errors - this shouldn't break the page
        // The API already handles anonymous users gracefully
      });

      hasTracked.current = true;
    }
  }, [placeId, placeName, placeSlug, category, city, country, isPremium, isVerified, avgRating, reviewCount]);

  // This component doesn't render anything
  return null;
}
