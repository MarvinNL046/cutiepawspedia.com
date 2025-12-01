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
      hasTracked.current = true;
    }
  }, [placeId, placeName, placeSlug, category, city, country, isPremium, isVerified, avgRating, reviewCount]);

  // This component doesn't render anything
  return null;
}
