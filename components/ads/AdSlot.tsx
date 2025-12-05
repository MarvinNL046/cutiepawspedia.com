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
