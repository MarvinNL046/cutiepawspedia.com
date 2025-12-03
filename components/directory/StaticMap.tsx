/**
 * StaticMap Component - Cost-effective static map image
 *
 * COST OPTIMIZATION:
 * - Uses Mapbox Static Images API instead of mapbox-gl
 * - ~$0.50 per 1,000 requests (vs $5+ for interactive maps)
 * - No JavaScript bundle (saves ~200KB)
 * - Perfect for single-location displays
 *
 * USE CASES:
 * - Place detail pages (single marker)
 * - Small map thumbnails in cards
 * - Any location where interaction is not needed
 *
 * For interactive maps (search page with multiple markers),
 * use MapWidgetLazy instead.
 */

import Image from "next/image";
import { MapPin } from "lucide-react";
import { getStaticMapUrl, isMapboxConfigured } from "@/lib/mapbox";

export interface StaticMapProps {
  lat: number;
  lng: number;
  name?: string;
  zoom?: number;
  width?: number;
  height?: number;
  className?: string;
  markerColor?: string;
  alt?: string;
  priority?: boolean;
  showFallback?: boolean;
}

/**
 * Fallback component when Mapbox is not configured or coordinates are invalid
 */
function MapFallback({
  height,
  className,
  message = "Map not available",
}: {
  height: number;
  className?: string;
  message?: string;
}) {
  return (
    <div
      className={`bg-slate-100 rounded-lg flex items-center justify-center ${className || ""}`}
      style={{ height }}
    >
      <div className="text-center p-4">
        <MapPin className="h-8 w-8 text-slate-400 mx-auto mb-2" />
        <p className="text-sm text-slate-500">{message}</p>
      </div>
    </div>
  );
}

export function StaticMap({
  lat,
  lng,
  name,
  zoom = 14,
  width = 400,
  height = 200,
  className = "",
  markerColor = "FF7FA1", // cpPink without #
  alt,
  priority = false,
  showFallback = true,
}: StaticMapProps) {
  // Check if Mapbox is configured
  if (!isMapboxConfigured()) {
    if (!showFallback) return null;
    return <MapFallback height={height} className={className} />;
  }

  // Validate coordinates
  if (
    !isFinite(lat) ||
    !isFinite(lng) ||
    lat < -90 ||
    lat > 90 ||
    lng < -180 ||
    lng > 180
  ) {
    if (!showFallback) return null;
    return (
      <MapFallback
        height={height}
        className={className}
        message="Invalid location"
      />
    );
  }

  // Generate static map URL
  const mapUrl = getStaticMapUrl({
    lat,
    lng,
    zoom,
    width,
    height,
    marker: true,
    markerColor,
    retina: true, // Always use @2x for sharp images on high-DPI displays
  });

  if (!mapUrl) {
    if (!showFallback) return null;
    return <MapFallback height={height} className={className} />;
  }

  const imageAlt = alt || (name ? `Map showing location of ${name}` : "Location map");

  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-slate-100 ${className}`}
      style={{ height }}
    >
      <Image
        src={mapUrl}
        alt={imageAlt}
        fill
        className="object-cover"
        sizes={`${width}px`}
        priority={priority}
        unoptimized // Mapbox images are already optimized, skip Next.js optimization
      />
    </div>
  );
}

/**
 * StaticMap with link to Google Maps directions
 * Use this for place detail pages where users might want directions
 */
export function StaticMapWithDirections({
  lat,
  lng,
  address,
  name,
  ...mapProps
}: StaticMapProps & { address?: string }) {
  const googleMapsUrl = address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    : `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  return (
    <div className="space-y-2">
      <StaticMap lat={lat} lng={lng} name={name} {...mapProps} />
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 text-sm text-cpAqua hover:text-cpPink transition-colors py-1"
      >
        <MapPin className="h-4 w-4" />
        Open in Google Maps
      </a>
    </div>
  );
}
