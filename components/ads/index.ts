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
} from "./AdSlot";

// Visibility context
export {
  AdVisibilityProvider,
  useAdVisibility,
  useShouldShowAds,
  type AdVisibility,
} from "./AdVisibilityContext";
