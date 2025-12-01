"use client";

import { useEffect, useRef, useState } from "react";

// Check if ads are enabled via env
const ADS_ENABLED = process.env.NEXT_PUBLIC_ADS_ENABLED === "true";
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

type AdFormat = "auto" | "fluid" | "rectangle" | "vertical" | "horizontal";
type AdSlotType = "in-feed" | "sidebar" | "detail" | "sticky-bottom" | "header" | "between-content";

interface AdSlotProps {
  slotId: string;
  type: AdSlotType;
  format?: AdFormat;
  className?: string;
  testMode?: boolean;
}

// Slot configurations for different placements
const slotConfig: Record<AdSlotType, { width: string; height: string; responsive: boolean }> = {
  "in-feed": { width: "100%", height: "280px", responsive: true },
  sidebar: { width: "300px", height: "600px", responsive: false },
  detail: { width: "100%", height: "250px", responsive: true },
  "sticky-bottom": { width: "100%", height: "90px", responsive: true },
  header: { width: "100%", height: "90px", responsive: true },
  "between-content": { width: "100%", height: "250px", responsive: true },
};

/**
 * AdSlot Component
 * Renders Google AdSense ads or placeholder in dev mode
 */
export function AdSlot({ slotId, type, format = "auto", className = "", testMode = false }: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const config = slotConfig[type];

  useEffect(() => {
    // Skip if ads not enabled or no client ID
    if (!ADS_ENABLED || !ADSENSE_CLIENT) return;
    if (testMode) return;

    // Load AdSense script if not already loaded
    if (!document.querySelector('script[src*="adsbygoogle"]')) {
      const script = document.createElement("script");
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }

    // Push ad after script loads
    const timer = setTimeout(() => {
      try {
        // @ts-expect-error adsbygoogle is injected by Google
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setIsLoaded(true);
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [slotId, testMode]);

  // Don't render anything if ads are disabled
  if (!ADS_ENABLED && !testMode) {
    return null;
  }

  // Test/development mode - show placeholder
  if (testMode || !ADSENSE_CLIENT) {
    return (
      <div
        className={`bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center text-slate-400 text-sm ${className}`}
        style={{ width: config.width, height: config.height, maxWidth: "100%" }}
      >
        <div className="text-center p-4">
          <div className="font-medium">Ad Placeholder</div>
          <div className="text-xs">{type} • {slotId}</div>
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
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={config.responsive ? "true" : "false"}
      />
      {!isLoaded && (
        <div
          className="bg-slate-50 animate-pulse rounded"
          style={{ width: config.width, height: config.height }}
        />
      )}
    </div>
  );
}

/**
 * In-Feed Ad - appears between content items
 */
export function InFeedAd({ slotId, className = "" }: { slotId: string; className?: string }) {
  return <AdSlot slotId={slotId} type="in-feed" format="fluid" className={className} />;
}

/**
 * Sidebar Ad - vertical banner for sidebars
 */
export function SidebarAd({ slotId, className = "" }: { slotId: string; className?: string }) {
  return <AdSlot slotId={slotId} type="sidebar" format="vertical" className={`sticky top-20 ${className}`} />;
}

/**
 * Detail Page Ad - for place/listing detail pages
 */
export function DetailAd({ slotId, className = "" }: { slotId: string; className?: string }) {
  return <AdSlot slotId={slotId} type="detail" format="rectangle" className={className} />;
}

/**
 * Sticky Bottom Ad - fixed to bottom of viewport
 */
export function StickyBottomAd({ slotId }: { slotId: string }) {
  const ADS_ENABLED = process.env.NEXT_PUBLIC_ADS_ENABLED === "true";

  if (!ADS_ENABLED) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg safe-area-bottom">
      <div className="container mx-auto px-4 py-2">
        <AdSlot slotId={slotId} type="sticky-bottom" format="horizontal" />
      </div>
    </div>
  );
}

/**
 * Between Content Ad - appears between sections
 */
export function BetweenContentAd({ slotId, className = "" }: { slotId: string; className?: string }) {
  return (
    <div className={`my-8 ${className}`}>
      <AdSlot slotId={slotId} type="between-content" format="auto" />
    </div>
  );
}
