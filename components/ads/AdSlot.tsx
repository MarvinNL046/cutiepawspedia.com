/**
 * AdSlot Component
 *
 * Google AdSense ad slots with auth-based visibility.
 * Part of A1: AdSense Integration + Ad-free Members
 *
 * Features:
 * - Auth-aware: logged-in users see no ads
 * - Consent-ready: respects GDPR consent (stub for now)
 * - Multiple slot types for different placements
 * - Dev mode placeholders for testing
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { useAdVisibility } from "./AdVisibilityContext";
import { hasAdConsent } from "@/lib/ads/consent";

// Environment configuration
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

// Slot IDs from environment
const SLOT_IDS = {
  inFeed: process.env.NEXT_PUBLIC_AD_SLOT_INFEED,
  sidebar: process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR,
  detail: process.env.NEXT_PUBLIC_AD_SLOT_DETAIL,
  sticky: process.env.NEXT_PUBLIC_AD_SLOT_STICKY,
};

type AdFormat = "auto" | "fluid" | "rectangle" | "vertical" | "horizontal";
type AdSlotType = "in-feed" | "sidebar" | "detail" | "sticky-bottom" | "header" | "between-content";

interface AdSlotProps {
  /** Specific slot ID (overrides type-based default) */
  slotId?: string;
  /** Type of ad placement */
  type: AdSlotType;
  /** Ad format */
  format?: AdFormat;
  /** Additional CSS classes */
  className?: string;
  /** Force show placeholder for testing */
  testMode?: boolean;
}

// Slot configurations for different placements
const slotConfig: Record<AdSlotType, { width: string; height: string; responsive: boolean; defaultSlotKey?: keyof typeof SLOT_IDS }> = {
  "in-feed": { width: "100%", height: "280px", responsive: true, defaultSlotKey: "inFeed" },
  sidebar: { width: "300px", height: "600px", responsive: false, defaultSlotKey: "sidebar" },
  detail: { width: "100%", height: "250px", responsive: true, defaultSlotKey: "detail" },
  "sticky-bottom": { width: "100%", height: "90px", responsive: true, defaultSlotKey: "sticky" },
  header: { width: "100%", height: "90px", responsive: true },
  "between-content": { width: "100%", height: "250px", responsive: true, defaultSlotKey: "inFeed" },
};

/**
 * Core AdSlot Component
 * Renders Google AdSense ads with auth-aware visibility
 */
export function AdSlot({ slotId, type, format = "auto", className = "", testMode = false }: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasConsent, setHasConsent] = useState(() => {
    // Initialize from cookie on client
    if (typeof window !== "undefined") {
      return hasAdConsent();
    }
    return false;
  });
  const { showAds, adsEnabled } = useAdVisibility();
  const config = slotConfig[type];

  // Resolve slot ID (explicit prop > env-based default)
  const resolvedSlotId = slotId || (config.defaultSlotKey ? SLOT_IDS[config.defaultSlotKey] : undefined);

  // Listen for consent changes
  useEffect(() => {
    const handleConsentUpdate = (e: CustomEvent<{ state: string }>) => {
      setHasConsent(e.detail.state === "granted");
    };

    window.addEventListener("consentUpdate", handleConsentUpdate as EventListener);
    return () => window.removeEventListener("consentUpdate", handleConsentUpdate as EventListener);
  }, []);

  // Initialize AdSense when visible and consent is given
  useEffect(() => {
    // Skip if conditions not met
    if (!adsEnabled || !showAds || !hasConsent || testMode) return;
    if (!ADSENSE_CLIENT || !resolvedSlotId) return;

    // Push ad to AdSense
    const timer = setTimeout(() => {
      try {
        // @ts-expect-error adsbygoogle is injected by Google
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setIsLoaded(true);
      } catch (e) {
        console.error("[AdSlot] AdSense error:", e);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [adsEnabled, showAds, hasConsent, resolvedSlotId, testMode]);

  // Don't render if ads disabled or user is logged in
  if (!adsEnabled && !testMode) {
    return null;
  }

  if (!showAds && !testMode) {
    return null;
  }

  // Don't render without consent (GDPR compliance)
  if (!hasConsent && !testMode) {
    return null;
  }

  // Test/development mode - show placeholder
  if (testMode || !ADSENSE_CLIENT || !resolvedSlotId) {
    return (
      <div
        className={`bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center text-slate-400 text-sm ${className}`}
        style={{ width: config.width, height: config.height, maxWidth: "100%" }}
      >
        <div className="text-center p-4">
          <div className="font-medium">Ad Placeholder</div>
          <div className="text-xs mt-1">{type}</div>
          {resolvedSlotId && <div className="text-xs opacity-50">Slot: {resolvedSlotId}</div>}
        </div>
      </div>
    );
  }

  // Production mode - render actual AdSense
  return (
    <div ref={adRef} className={`ad-container ad-${type} ${className}`}>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: config.responsive ? "100%" : config.width,
          height: config.height,
        }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={resolvedSlotId}
        data-ad-format={format}
        data-full-width-responsive={config.responsive ? "true" : "false"}
      />
      {!isLoaded && (
        <div
          className="bg-slate-50 animate-pulse rounded"
          style={{ width: config.width, height: config.height, maxWidth: "100%" }}
        />
      )}
    </div>
  );
}

// ============================================================================
// Convenience Components for Different Placements
// ============================================================================

interface SimpleAdProps {
  slotId?: string;
  className?: string;
  testMode?: boolean;
}

/**
 * In-Feed Ad - appears between content items in lists
 */
export function InFeedAd({ slotId, className = "", testMode }: SimpleAdProps) {
  return <AdSlot slotId={slotId} type="in-feed" format="fluid" className={className} testMode={testMode} />;
}

/**
 * Sidebar Ad - vertical banner for sidebars
 */
export function SidebarAd({ slotId, className = "", testMode }: SimpleAdProps) {
  return <AdSlot slotId={slotId} type="sidebar" format="vertical" className={`sticky top-20 ${className}`} testMode={testMode} />;
}

/**
 * Detail Page Ad - for place/listing detail pages
 */
export function DetailAd({ slotId, className = "", testMode }: SimpleAdProps) {
  return <AdSlot slotId={slotId} type="detail" format="rectangle" className={className} testMode={testMode} />;
}

/**
 * Sticky Bottom Ad - fixed to bottom of viewport (mobile)
 */
export function StickyBottomAd({ slotId, testMode }: { slotId?: string; testMode?: boolean }) {
  const { showAds, adsEnabled } = useAdVisibility();

  if (!adsEnabled || !showAds) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t shadow-lg safe-area-bottom md:hidden">
      <div className="container mx-auto px-2 py-1">
        <AdSlot slotId={slotId} type="sticky-bottom" format="horizontal" testMode={testMode} />
      </div>
    </div>
  );
}

/**
 * Between Content Ad - appears between sections
 */
export function BetweenContentAd({ slotId, className = "", testMode }: SimpleAdProps) {
  return (
    <div className={`my-8 ${className}`}>
      <AdSlot slotId={slotId} type="between-content" format="auto" testMode={testMode} />
    </div>
  );
}

// ============================================================================
// Sponsor Ad Components - For paying business customers
// ============================================================================

export interface SponsorAdData {
  id: string;
  businessName: string;
  businessSlug: string;
  imageUrl: string;
  headline: string;
  description?: string;
  ctaText?: string;
  locale: string;
}

interface SponsorAdProps {
  ad: SponsorAdData;
  variant?: "sidebar" | "inline" | "compact";
  className?: string;
}

/**
 * Sponsor Ad - Premium placement for paying business customers
 * Always shown regardless of ad-free membership (they paid for it!)
 */
export function SponsorAd({ ad, variant = "sidebar", className = "" }: SponsorAdProps) {
  const Link = require("next/link").default;
  const Image = require("next/image").default;

  if (variant === "sidebar") {
    return (
      <Link
        href={`/${ad.locale}/${ad.businessSlug}`}
        className={`block bg-gradient-to-br from-cpCoral/5 to-cpCoral/5 dark:from-cpCoral/10 dark:to-cpCoral/10 rounded-xl border border-cpCoral/20 overflow-hidden hover:border-cpCoral/40 transition-all group ${className}`}
      >
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={ad.imageUrl}
            alt={ad.businessName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 bg-cpCoral/90 text-white text-xs px-2 py-0.5 rounded-full font-medium">
            Sponsor
          </div>
        </div>
        <div className="p-4">
          <h4 className="font-semibold text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors">
            {ad.headline}
          </h4>
          {ad.description && (
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mt-1 line-clamp-2">
              {ad.description}
            </p>
          )}
          <span className="inline-flex items-center gap-1 text-cpCoral text-sm font-medium mt-3">
            {ad.ctaText || "Learn more"} →
          </span>
        </div>
      </Link>
    );
  }

  if (variant === "inline") {
    return (
      <Link
        href={`/${ad.locale}/${ad.businessSlug}`}
        className={`flex gap-4 bg-gradient-to-r from-cpCoral/5 to-cpCoral/5 dark:from-cpCoral/10 dark:to-cpCoral/10 rounded-xl border border-cpCoral/20 p-4 my-6 hover:border-cpCoral/40 transition-all group ${className}`}
      >
        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={ad.imageUrl}
            alt={ad.businessName}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-cpCoral/90 text-white text-xs px-2 py-0.5 rounded-full font-medium">
              Sponsor
            </span>
          </div>
          <h4 className="font-semibold text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors">
            {ad.headline}
          </h4>
          {ad.description && (
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 line-clamp-1 mt-1">
              {ad.description}
            </p>
          )}
        </div>
      </Link>
    );
  }

  // Compact variant
  return (
    <Link
      href={`/${ad.locale}/${ad.businessSlug}`}
      className={`flex items-center gap-3 bg-gradient-to-r from-cpCoral/5 to-cpCoral/5 dark:from-cpCoral/10 dark:to-cpCoral/10 rounded-lg border border-cpCoral/20 p-3 hover:border-cpCoral/40 transition-all group ${className}`}
    >
      <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden">
        <Image
          src={ad.imageUrl}
          alt={ad.businessName}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-[10px] bg-cpCoral/90 text-white px-1.5 py-0.5 rounded-full font-medium">
          Sponsor
        </span>
        <h5 className="font-medium text-sm text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors truncate">
          {ad.headline}
        </h5>
      </div>
    </Link>
  );
}

/**
 * Smart Ad Slot - Shows sponsor ad if available, otherwise falls back to AdSense
 * For logged-in users: shows sponsor ads only (no AdSense)
 */
interface SmartAdSlotProps {
  type: AdSlotType;
  sponsorAd?: SponsorAdData | null;
  slotId?: string;
  className?: string;
  testMode?: boolean;
}

export function SmartAdSlot({ type, sponsorAd, slotId, className = "", testMode }: SmartAdSlotProps) {
  const { showAds, adsEnabled } = useAdVisibility();

  // Priority 1: Always show sponsor ads (they paid for it)
  if (sponsorAd) {
    const variantMap: Record<AdSlotType, "sidebar" | "inline" | "compact"> = {
      sidebar: "sidebar",
      "in-feed": "inline",
      detail: "inline",
      "sticky-bottom": "compact",
      header: "compact",
      "between-content": "inline",
    };
    return <SponsorAd ad={sponsorAd} variant={variantMap[type]} className={className} />;
  }

  // Priority 2: Show AdSense for non-logged-in users
  if (!adsEnabled && !testMode) return null;
  if (!showAds && !testMode) return null;

  return <AdSlot type={type} slotId={slotId} className={className} testMode={testMode} />;
}
