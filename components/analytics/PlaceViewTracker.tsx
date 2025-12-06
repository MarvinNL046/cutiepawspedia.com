"use client";

import { useEffect, useRef } from "react";
import { trackPlaceView } from "@/lib/analytics";

// Generate or retrieve session ID (stored in sessionStorage)
function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";

  let sessionId = sessionStorage.getItem("pv_session_id");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem("pv_session_id", sessionId);
  }
  return sessionId;
}

// Detect device type from user agent
function getDeviceType(): string {
  if (typeof window === "undefined") return "unknown";

  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return "mobile";
  return "desktop";
}

// Detect traffic source from referrer and URL params
function getTrafficSource(): string {
  if (typeof window === "undefined") return "direct";

  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get("utm_source");
  if (utmSource) return utmSource;

  const referrer = document.referrer;
  if (!referrer) return "direct";

  try {
    const referrerUrl = new URL(referrer);
    const host = referrerUrl.hostname.toLowerCase();

    if (host.includes("google")) return "google";
    if (host.includes("facebook") || host.includes("fb.com")) return "facebook";
    if (host.includes("instagram")) return "instagram";
    if (host.includes("twitter") || host.includes("x.com")) return "twitter";
    if (host.includes("linkedin")) return "linkedin";
    if (host.includes("pinterest")) return "pinterest";
    if (host.includes("tiktok")) return "tiktok";

    return "referral";
  } catch {
    return "direct";
  }
}

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
 *
 * This component does two things:
 * 1. Tracks the view for analytics (Vercel Analytics)
 * 2. Records the view to user's recent history (for logged-in users)
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
      // 1. Track for analytics
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

      // 2. Record to user's recent views history (for logged-in users)
      // This is fire-and-forget - we don't need to wait for the response
      fetch("/api/recent-views", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ placeId }),
      }).catch(() => {
        // Silently ignore errors - this shouldn't break the page
        // The API already handles anonymous users gracefully
      });

      // 3. Record to business analytics (page_views table)
      // This powers the business analytics dashboard
      const sessionId = getOrCreateSessionId();
      fetch("/api/analytics/pageview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          placeId,
          sessionId,
          source: getTrafficSource(),
          referrer: document.referrer || null,
          deviceType: getDeviceType(),
          locale: document.documentElement.lang || "en",
        }),
      }).catch(() => {
        // Silently ignore - analytics shouldn't break the page
      });

      hasTracked.current = true;
    }
  }, [placeId, placeName, placeSlug, category, city, country, isPremium, isVerified, avgRating, reviewCount]);

  // This component doesn't render anything
  return null;
}
