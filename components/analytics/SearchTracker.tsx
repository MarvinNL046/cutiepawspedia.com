"use client";

import { useEffect, useRef } from "react";
import { trackSearch, trackMapToggle } from "@/lib/analytics";

interface SearchTrackerProps {
  query?: string;
  category?: string;
  city?: string;
  country?: string;
  sortBy?: string;
  resultCount: number;
  viewMode: "grid" | "map";
  page: number;
}

/**
 * Client component that tracks search events
 * Place this in the search page to track searches on render
 */
export function SearchTracker({
  query,
  category,
  city,
  country,
  sortBy,
  resultCount,
  viewMode,
  page,
}: SearchTrackerProps) {
  const hasTracked = useRef(false);
  const prevViewMode = useRef(viewMode);

  // Track search on initial render and when search params change
  useEffect(() => {
    // Generate a unique key for this search
    const searchKey = JSON.stringify({ query, category, city, country, sortBy, page });

    // Only track once per unique search
    if (!hasTracked.current) {
      trackSearch({
        query,
        category,
        city,
        country,
        sortBy,
        resultCount,
        hasResults: resultCount > 0,
        viewMode,
        page,
      });
      hasTracked.current = true;
    }

    // Reset tracking when search changes
    return () => {
      hasTracked.current = false;
    };
  }, [query, category, city, country, sortBy, page, resultCount, viewMode]);

  // Track view mode toggle separately
  useEffect(() => {
    if (prevViewMode.current !== viewMode) {
      trackMapToggle({
        from: prevViewMode.current,
        to: viewMode,
        context: "search",
        resultCount,
      });
      prevViewMode.current = viewMode;
    }
  }, [viewMode, resultCount]);

  // This component doesn't render anything
  return null;
}
