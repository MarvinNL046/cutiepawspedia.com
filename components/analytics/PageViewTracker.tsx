"use client";

/**
 * Page View Tracker Component
 *
 * Tracks page views for analytics. Fires once on mount.
 * Privacy-safe: only records sessionId (no personal data).
 */

import { useEffect, useRef } from "react";

interface PageViewTrackerProps {
  placeId: number;
  businessId?: number | null;
  source?: string;
}

// Generate or retrieve session ID (stored in sessionStorage)
function getSessionId(): string {
  if (typeof window === "undefined") return "";

  let sessionId = sessionStorage.getItem("pv_session_id");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem("pv_session_id", sessionId);
  }
  return sessionId;
}

// Detect device type
function getDeviceType(): string {
  if (typeof window === "undefined") return "unknown";

  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return "mobile";
  return "desktop";
}

export function PageViewTracker({ placeId, businessId, source }: PageViewTrackerProps) {
  const tracked = useRef(false);

  useEffect(() => {
    // Only track once per component mount
    if (tracked.current) return;
    tracked.current = true;

    // Don't track in development or if no placeId
    if (!placeId) return;

    const trackView = async () => {
      try {
        await fetch("/api/analytics/pageview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            placeId,
            businessId,
            sessionId: getSessionId(),
            source: source || "direct",
            referrer: document.referrer || null,
            deviceType: getDeviceType(),
            locale: document.documentElement.lang || "en",
          }),
        });
      } catch (error) {
        // Silently fail - don't break the page for analytics
        console.debug("Failed to track page view:", error);
      }
    };

    trackView();
  }, [placeId, businessId, source]);

  // This component renders nothing
  return null;
}
