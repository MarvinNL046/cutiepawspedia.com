/**
 * SearchAd Component
 *
 * Client component for search results sponsor ads.
 * High-intent placement - shows at top of search results.
 */

"use client";

import { SponsorAdWithTracking, type SponsorAdData } from "./SponsorAdWithTracking";

interface SearchAdProps {
  sponsorAd: SponsorAdData | null;
  className?: string;
}

/**
 * Search Results Ad
 * Shows as a featured card at top of search results
 */
export function SearchAd({ sponsorAd, className = "" }: SearchAdProps) {
  if (!sponsorAd) {
    return null;
  }

  return (
    <SponsorAdWithTracking
      ad={sponsorAd}
      placement="search_results"
      variant="inline"
      className={className}
    />
  );
}

/**
 * Directory Sidebar Ad
 * Shows in the sidebar of directory/category pages
 */
interface DirectorySidebarAdProps {
  sponsorAd: SponsorAdData | null;
  className?: string;
}

export function DirectorySidebarAd({ sponsorAd, className = "" }: DirectorySidebarAdProps) {
  if (!sponsorAd) {
    return null;
  }

  return (
    <SponsorAdWithTracking
      ad={sponsorAd}
      placement="directory_sidebar"
      variant="sidebar"
      className={className}
    />
  );
}

/**
 * Homepage Featured Ad
 * Premium placement on the homepage
 */
interface HomepageFeaturedAdProps {
  sponsorAd: SponsorAdData | null;
  className?: string;
}

export function HomepageFeaturedAd({ sponsorAd, className = "" }: HomepageFeaturedAdProps) {
  if (!sponsorAd) {
    return null;
  }

  return (
    <SponsorAdWithTracking
      ad={sponsorAd}
      placement="homepage_featured"
      variant="featured"
      className={className}
    />
  );
}
