/**
 * SponsorAdWithTracking Component
 *
 * Wrapper around SponsorAd that handles:
 * - Automatic impression tracking on view (IntersectionObserver)
 * - Click tracking on ad click
 */

"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

export type AdPlacement =
  | "blog_sidebar"
  | "blog_inline"
  | "directory_sidebar"
  | "search_results"
  | "homepage_featured";

export interface SponsorAdData {
  id: number;
  businessName: string;
  businessSlug: string;
  placeSlug: string | null;
  headline: string;
  description: string | null;
  imageUrl: string | null;
  ctaText: string;
  destinationUrl: string | null;
  locale: string;
}

interface SponsorAdWithTrackingProps {
  ad: SponsorAdData;
  placement: AdPlacement;
  variant?: "sidebar" | "inline" | "compact" | "featured";
  className?: string;
}

export function SponsorAdWithTracking({
  ad,
  placement,
  variant = "sidebar",
  className = "",
}: SponsorAdWithTrackingProps) {
  const adRef = useRef<HTMLAnchorElement>(null);
  const [impressionId, setImpressionId] = useState<number | null>(null);
  const [hasTrackedImpression, setHasTrackedImpression] = useState(false);

  // Get session ID from localStorage or create new one
  const getSessionId = useCallback(() => {
    if (typeof window === "undefined") return undefined;
    let sessionId = sessionStorage.getItem("ad_session_id");
    if (!sessionId) {
      sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem("ad_session_id", sessionId);
    }
    return sessionId;
  }, []);

  // Track impression when ad comes into view
  useEffect(() => {
    if (hasTrackedImpression || !adRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTrackedImpression) {
            // Ad is visible, track impression
            trackImpression();
            setHasTrackedImpression(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 } // 50% of ad must be visible
    );

    observer.observe(adRef.current);

    return () => observer.disconnect();
  }, [hasTrackedImpression]);

  const trackImpression = async () => {
    try {
      const response = await fetch("/api/ads/impression", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignId: ad.id,
          placement,
          pageUrl: window.location.href,
          locale: ad.locale,
          sessionId: getSessionId(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Store impression ID for click tracking
        if (data.impressionId) {
          setImpressionId(data.impressionId);
        }
      }
    } catch (error) {
      console.error("Failed to track impression:", error);
    }
  };

  const handleClick = async () => {
    if (impressionId) {
      try {
        await fetch("/api/ads/click", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            impressionId,
            campaignId: ad.id,
          }),
        });
      } catch (error) {
        console.error("Failed to track click:", error);
      }
    }
  };

  // Determine destination URL
  const href =
    ad.destinationUrl ||
    (ad.placeSlug ? `/${ad.locale}/${ad.placeSlug}` : `/${ad.locale}`);

  // Default image if none provided
  const imageUrl = ad.imageUrl || "/images/placeholder-business.jpg";

  if (variant === "sidebar") {
    return (
      <Link
        ref={adRef}
        href={href}
        onClick={handleClick}
        className={`block bg-gradient-to-br from-cpPink/5 to-cpCoral/5 rounded-xl border border-cpPink/20 overflow-hidden hover:border-cpPink/40 transition-all group ${className}`}
      >
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={imageUrl}
            alt={ad.businessName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 bg-cpPink/90 text-white text-xs px-2 py-0.5 rounded-full font-medium">
            Sponsor
          </div>
        </div>
        <div className="p-4">
          <h4 className="font-semibold text-cpDark group-hover:text-cpPink transition-colors">
            {ad.headline}
          </h4>
          {ad.description && (
            <p className="text-sm text-slate-600 mt-1 line-clamp-2">
              {ad.description}
            </p>
          )}
          <span className="inline-flex items-center gap-1 text-cpPink text-sm font-medium mt-3">
            {ad.ctaText} →
          </span>
        </div>
      </Link>
    );
  }

  if (variant === "inline") {
    return (
      <Link
        ref={adRef}
        href={href}
        onClick={handleClick}
        className={`flex gap-4 bg-gradient-to-r from-cpPink/5 to-cpCoral/5 rounded-xl border border-cpPink/20 p-4 my-6 hover:border-cpPink/40 transition-all group ${className}`}
      >
        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
          <Image src={imageUrl} alt={ad.businessName} fill className="object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-cpPink/90 text-white text-xs px-2 py-0.5 rounded-full font-medium">
              Sponsor
            </span>
          </div>
          <h4 className="font-semibold text-cpDark group-hover:text-cpPink transition-colors">
            {ad.headline}
          </h4>
          {ad.description && (
            <p className="text-sm text-slate-600 line-clamp-1 mt-1">{ad.description}</p>
          )}
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link
        ref={adRef}
        href={href}
        onClick={handleClick}
        className={`block bg-gradient-to-r from-cpPink/10 to-cpCoral/10 rounded-2xl border-2 border-cpPink/30 overflow-hidden hover:border-cpPink/50 transition-all group ${className}`}
      >
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-1/3 aspect-[16/9] md:aspect-auto">
            <Image
              src={imageUrl}
              alt={ad.businessName}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex-1 p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-cpPink text-white text-xs px-3 py-1 rounded-full font-medium">
                ⭐ Featured Sponsor
              </span>
            </div>
            <h3 className="text-xl font-bold text-cpDark group-hover:text-cpPink transition-colors">
              {ad.headline}
            </h3>
            {ad.description && (
              <p className="text-slate-600 mt-2 line-clamp-2">{ad.description}</p>
            )}
            <span className="inline-flex items-center gap-2 text-cpPink font-medium mt-4">
              {ad.ctaText} →
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // Compact variant
  return (
    <Link
      ref={adRef}
      href={href}
      onClick={handleClick}
      className={`flex items-center gap-3 bg-gradient-to-r from-cpPink/5 to-cpCoral/5 rounded-lg border border-cpPink/20 p-3 hover:border-cpPink/40 transition-all group ${className}`}
    >
      <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden">
        <Image src={imageUrl} alt={ad.businessName} fill className="object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-[10px] bg-cpPink/90 text-white px-1.5 py-0.5 rounded-full font-medium">
          Sponsor
        </span>
        <h5 className="font-medium text-sm text-cpDark group-hover:text-cpPink transition-colors truncate">
          {ad.headline}
        </h5>
      </div>
    </Link>
  );
}
