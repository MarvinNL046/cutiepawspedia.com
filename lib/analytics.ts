/**
 * Analytics Library for CutiePawsPedia
 *
 * Lightweight event tracking with typed helpers.
 * Supports both Vercel Analytics and custom /api/track endpoint.
 *
 * @see docs/analytics-events.md for event documentation
 */

// Event types
export type AnalyticsEvent =
  | PageViewEvent
  | SearchEvent
  | MapToggleEvent
  | PremiumClickEvent
  | AffiliateClickEvent
  | LeadSubmittedEvent
  | PlaceViewEvent
  | CategoryViewEvent
  | OutboundLinkEvent
  | DashboardViewEvent
  | DashboardFilterEvent
  | DashboardExportEvent;

interface BaseEvent {
  timestamp: number;
  url: string;
  referrer?: string;
  userAgent?: string;
  sessionId?: string;
}

export interface PageViewEvent extends BaseEvent {
  event: "page_view";
  properties: {
    path: string;
    title?: string;
    locale: string;
    routeType: "home" | "country" | "city" | "category" | "place" | "search" | "static";
  };
}

export interface SearchEvent extends BaseEvent {
  event: "search";
  properties: {
    query?: string;
    category?: string;
    city?: string;
    country?: string;
    sortBy?: string;
    resultCount: number;
    hasResults: boolean;
    viewMode: "grid" | "map";
    page: number;
  };
}

export interface MapToggleEvent extends BaseEvent {
  event: "map_toggle";
  properties: {
    from: "grid" | "map";
    to: "grid" | "map";
    context: "search" | "category";
    resultCount: number;
  };
}

export interface PremiumClickEvent extends BaseEvent {
  event: "premium_click";
  properties: {
    placeId: number;
    placeName: string;
    placeSlug: string;
    category?: string;
    city?: string;
    country?: string;
    position: number; // Position in list
    context: "search" | "category" | "city" | "related";
  };
}

export interface AffiliateClickEvent extends BaseEvent {
  event: "affiliate_click";
  properties: {
    affiliateType: string;
    affiliateName: string;
    affiliateUrl: string;
    variant: "card" | "inline" | "banner" | "compact";
    categoryContext?: string;
    position: number;
    hasDiscount: boolean;
  };
}

export interface LeadSubmittedEvent extends BaseEvent {
  event: "lead_submitted";
  properties: {
    placeId: number;
    placeName: string;
    placeSlug: string;
    category?: string;
    city?: string;
    country?: string;
    hasMessage: boolean;
    hasPhone: boolean;
    source: string;
  };
}

export interface PlaceViewEvent extends BaseEvent {
  event: "place_view";
  properties: {
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
  };
}

export interface CategoryViewEvent extends BaseEvent {
  event: "category_view";
  properties: {
    category: string;
    city: string;
    country: string;
    resultCount: number;
    hasPremiumListings: boolean;
  };
}

export interface OutboundLinkEvent extends BaseEvent {
  event: "outbound_link";
  properties: {
    url: string;
    linkType: "website" | "phone" | "email" | "directions" | "social";
    placeId?: number;
    placeName?: string;
  };
}

export interface DashboardViewEvent extends BaseEvent {
  event: "dashboard_view";
  properties: {
    page: "overview" | "listings" | "leads" | "settings";
    listingCount?: number;
    leadCount?: number;
  };
}

export interface DashboardFilterEvent extends BaseEvent {
  event: "dashboard_filter";
  properties: {
    filterType: "listing" | "period";
    filterValue: string;
    resultCount: number;
  };
}

export interface DashboardExportEvent extends BaseEvent {
  event: "dashboard_export";
  properties: {
    exportType: "leads_csv";
    filters: {
      listingId?: number;
      period?: string;
    };
    recordCount: number;
  };
}

// Configuration
const TRACK_ENDPOINT = "/api/track";
const DEBUG_MODE = process.env.NODE_ENV === "development";
const ENABLE_TRACKING = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== "false";

// Session ID management
let sessionId: string | null = null;

function getSessionId(): string {
  if (typeof window === "undefined") return "";

  if (!sessionId) {
    // Try to get from sessionStorage
    sessionId = sessionStorage.getItem("analytics_session");

    if (!sessionId) {
      // Generate new session ID
      sessionId = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
      sessionStorage.setItem("analytics_session", sessionId);
    }
  }

  return sessionId;
}

// Core tracking function
async function track(event: AnalyticsEvent): Promise<void> {
  if (!ENABLE_TRACKING) return;

  // Add common properties
  const enrichedEvent = {
    ...event,
    timestamp: Date.now(),
    url: typeof window !== "undefined" ? window.location.href : "",
    referrer: typeof document !== "undefined" ? document.referrer : undefined,
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
    sessionId: getSessionId(),
  };

  if (DEBUG_MODE) {
    console.log("[Analytics]", enrichedEvent.event, enrichedEvent.properties);
  }

  // Send to tracking endpoint
  try {
    if (typeof window !== "undefined") {
      // Use sendBeacon for reliability (doesn't block page unload)
      const blob = new Blob([JSON.stringify(enrichedEvent)], {
        type: "application/json",
      });

      if (navigator.sendBeacon) {
        navigator.sendBeacon(TRACK_ENDPOINT, blob);
      } else {
        // Fallback to fetch
        fetch(TRACK_ENDPOINT, {
          method: "POST",
          body: JSON.stringify(enrichedEvent),
          headers: { "Content-Type": "application/json" },
          keepalive: true,
        }).catch(() => {
          // Silently fail
        });
      }
    }
  } catch {
    // Silently fail - analytics should never break the app
  }
}

// ============================================
// Typed Helper Functions
// ============================================

/**
 * Track a page view
 */
export function trackPageView(properties: PageViewEvent["properties"]): void {
  track({
    event: "page_view",
    properties,
    timestamp: Date.now(),
    url: typeof window !== "undefined" ? window.location.href : "",
  });
}

/**
 * Track a search event
 */
export function trackSearch(properties: SearchEvent["properties"]): void {
  track({
    event: "search",
    properties,
    timestamp: Date.now(),
    url: typeof window !== "undefined" ? window.location.href : "",
  });
}

/**
 * Track map view toggle
 */
export function trackMapToggle(properties: MapToggleEvent["properties"]): void {
  track({
    event: "map_toggle",
    properties,
    timestamp: Date.now(),
    url: typeof window !== "undefined" ? window.location.href : "",
  });
}

/**
 * Track premium listing click
 */
export function trackPremiumClick(properties: PremiumClickEvent["properties"]): void {
  track({
    event: "premium_click",
    properties,
    timestamp: Date.now(),
    url: typeof window !== "undefined" ? window.location.href : "",
  });
}

/**
 * Track affiliate block click
 */
export function trackAffiliateClick(properties: AffiliateClickEvent["properties"]): void {
  track({
    event: "affiliate_click",
    properties,
    timestamp: Date.now(),
    url: typeof window !== "undefined" ? window.location.href : "",
  });
}

/**
 * Track lead form submission
 */
export function trackLeadSubmitted(properties: LeadSubmittedEvent["properties"]): void {
  track({
    event: "lead_submitted",
    properties,
    timestamp: Date.now(),
    url: typeof window !== "undefined" ? window.location.href : "",
  });
}

/**
 * Track place detail view
 */
export function trackPlaceView(properties: PlaceViewEvent["properties"]): void {
  track({
    event: "place_view",
    properties,
    timestamp: Date.now(),
    url: typeof window !== "undefined" ? window.location.href : "",
  });
}

/**
 * Track category page view
 */
export function trackCategoryView(properties: CategoryViewEvent["properties"]): void {
  track({
    event: "category_view",
    properties,
    timestamp: Date.now(),
    url: typeof window !== "undefined" ? window.location.href : "",
  });
}

/**
 * Track outbound link click
 */
export function trackOutboundLink(properties: OutboundLinkEvent["properties"]): void {
  track({
    event: "outbound_link",
    properties,
    timestamp: Date.now(),
    url: typeof window !== "undefined" ? window.location.href : "",
  });
}

/**
 * Track dashboard page view
 */
export function trackDashboardView(properties: DashboardViewEvent["properties"]): void {
  track({
    event: "dashboard_view",
    properties,
    timestamp: Date.now(),
    url: typeof window !== "undefined" ? window.location.href : "",
  });
}

/**
 * Track dashboard filter change
 */
export function trackDashboardFilter(properties: DashboardFilterEvent["properties"]): void {
  track({
    event: "dashboard_filter",
    properties,
    timestamp: Date.now(),
    url: typeof window !== "undefined" ? window.location.href : "",
  });
}

/**
 * Track dashboard export action
 */
export function trackDashboardExport(properties: DashboardExportEvent["properties"]): void {
  track({
    event: "dashboard_export",
    properties,
    timestamp: Date.now(),
    url: typeof window !== "undefined" ? window.location.href : "",
  });
}

// ============================================
// React Hooks for Analytics
// ============================================

/**
 * Hook to track page views automatically
 * Use in layout or page components
 */
export function usePageView(properties: PageViewEvent["properties"]): void {
  if (typeof window === "undefined") return;

  // Track on mount (client-side only)
  // This is a simple implementation - in production you'd use useEffect
  trackPageView(properties);
}

// ============================================
// Utility Functions
// ============================================

/**
 * Determine route type from pathname
 */
export function getRouteType(
  pathname: string
): PageViewEvent["properties"]["routeType"] {
  const segments = pathname.split("/").filter(Boolean);

  // Remove locale segment
  if (segments.length > 0 && segments[0].length === 2) {
    segments.shift();
  }

  if (segments.length === 0) return "home";
  if (segments[0] === "search") return "search";
  if (["about", "contact", "for-businesses", "privacy", "terms"].includes(segments[0])) {
    return "static";
  }
  if (segments.length === 1) return "country";
  if (segments.length === 2) return "city";
  if (segments.length === 3) return "category";
  if (segments.length === 4) return "place";

  return "static";
}

/**
 * Create a click handler that tracks and then navigates
 */
export function createTrackedClick<T extends object>(
  trackFn: (props: T) => void,
  props: T,
  onClick?: () => void
) {
  return () => {
    trackFn(props);
    onClick?.();
  };
}
