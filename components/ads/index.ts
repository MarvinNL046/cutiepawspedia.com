/**
 * Ad Components
 *
 * Exports for Google AdSense integration with auth-based visibility.
 * Part of A1: AdSense Integration + Ad-free Members
 */

// Ad slot components
export {
  AdSlot,
  InFeedAd,
  SidebarAd,
  DetailAd,
  StickyBottomAd,
  BetweenContentAd,
  SponsorAd,
  SmartAdSlot,
  type SponsorAdData,
} from "./AdSlot";

// Sponsor ad with tracking
export {
  SponsorAdWithTracking,
  type SponsorAdData as TrackedSponsorAdData,
  type AdPlacement,
} from "./SponsorAdWithTracking";

// Blog-specific ad components
export { BlogSidebarAd, BlogInlineAd } from "./BlogSidebarAd";

// Search and directory ad components
export { SearchAd, DirectorySidebarAd, HomepageFeaturedAd } from "./SearchAd";

// Visibility context
export {
  AdVisibilityProvider,
  useAdVisibility,
  useShouldShowAds,
  type AdVisibility,
} from "./AdVisibilityContext";
