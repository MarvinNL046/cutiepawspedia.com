/**
 * BlogSidebarAd Component
 *
 * Client component wrapper for blog sidebar ads.
 * Shows sponsor ad with tracking if available, otherwise shows AdSense or placeholder.
 */

"use client";

import { SponsorAdWithTracking, type SponsorAdData } from "./SponsorAdWithTracking";
import { SidebarAd } from "./AdSlot";
import { useAdVisibility } from "./AdVisibilityContext";

interface BlogSidebarAdProps {
  sponsorAd: SponsorAdData | null;
  className?: string;
}

export function BlogSidebarAd({ sponsorAd, className = "" }: BlogSidebarAdProps) {
  const { showAds, adsEnabled } = useAdVisibility();

  // Priority 1: Show sponsor ad if available (they paid for it!)
  if (sponsorAd) {
    return (
      <SponsorAdWithTracking
        ad={sponsorAd}
        placement="blog_sidebar"
        variant="sidebar"
        className={className}
      />
    );
  }

  // Priority 2: Show AdSense for non-logged-in users
  if (!adsEnabled || !showAds) {
    return null;
  }

  return <SidebarAd className={className} />;
}

/**
 * BlogInlineAd Component
 *
 * For in-content ads between paragraphs
 */
interface BlogInlineAdProps {
  sponsorAd: SponsorAdData | null;
  className?: string;
}

export function BlogInlineAd({ sponsorAd, className = "" }: BlogInlineAdProps) {
  const { showAds, adsEnabled } = useAdVisibility();

  // Priority 1: Show sponsor ad if available
  if (sponsorAd) {
    return (
      <SponsorAdWithTracking
        ad={sponsorAd}
        placement="blog_inline"
        variant="inline"
        className={className}
      />
    );
  }

  // Priority 2: Show AdSense for non-logged-in users
  if (!adsEnabled || !showAds) {
    return null;
  }

  // Return null - let the parent use BetweenContentAd
  return null;
}
