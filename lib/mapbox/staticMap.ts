/**
 * Mapbox Static Images API utility
 *
 * COST-EFFECTIVE: Uses Mapbox Static Images API instead of interactive maps
 * - Static Images: ~$0.50 per 1,000 requests (vs $5+ for interactive GL JS sessions)
 * - No JavaScript bundle required (mapbox-gl is ~200KB)
 * - Perfect for single-location displays on detail pages
 *
 * API Docs: https://docs.mapbox.com/api/maps/static-images/
 */

export interface StaticMapOptions {
  lat: number;
  lng: number;
  zoom?: number;
  width?: number;
  height?: number;
  style?: string;
  marker?: boolean;
  markerColor?: string;
  markerSize?: "s" | "l"; // small or large
  retina?: boolean; // @2x for high-DPI displays
}

// Environment variables
// NEXT_PUBLIC_MAPBOX_TOKEN is the established convention in this project
// Falls back to NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN for flexibility
const MAPBOX_TOKEN =
  process.env.NEXT_PUBLIC_MAPBOX_TOKEN ||
  process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
const DEFAULT_STYLE =
  process.env.NEXT_PUBLIC_MAPBOX_STYLE_ID || "mapbox/streets-v12";

/**
 * Check if Mapbox is configured
 */
export function isMapboxConfigured(): boolean {
  return Boolean(MAPBOX_TOKEN);
}

/**
 * Get the Mapbox access token
 */
export function getMapboxToken(): string | undefined {
  return MAPBOX_TOKEN;
}

/**
 * Generate a Mapbox Static Images API URL
 *
 * @example
 * // Basic usage
 * const url = getStaticMapUrl({ lat: 52.3676, lng: 4.9041 });
 *
 * // With custom options
 * const url = getStaticMapUrl({
 *   lat: 52.3676,
 *   lng: 4.9041,
 *   zoom: 15,
 *   width: 400,
 *   height: 300,
 *   marker: true,
 *   markerColor: "FF7FA1",
 * });
 */
export function getStaticMapUrl(options: StaticMapOptions): string | null {
  if (!MAPBOX_TOKEN) {
    return null;
  }

  const {
    lat,
    lng,
    zoom = 14,
    width = 400,
    height = 300,
    style = DEFAULT_STYLE,
    marker = true,
    markerColor = "FF7FA1", // cpPink without #
    markerSize = "l",
    retina = true,
  } = options;

  // Validate coordinates
  if (
    !isFinite(lat) ||
    !isFinite(lng) ||
    lat < -90 ||
    lat > 90 ||
    lng < -180 ||
    lng > 180
  ) {
    return null;
  }

  // Clamp dimensions to Mapbox limits (max 1280x1280)
  const clampedWidth = Math.min(Math.max(1, Math.round(width)), 1280);
  const clampedHeight = Math.min(Math.max(1, Math.round(height)), 1280);

  // Build overlay for marker
  // Format: pin-{size}+{color}({lng},{lat})
  // Note: + is for color, - is for labels
  const overlay = marker
    ? `pin-${markerSize}+${markerColor}(${lng.toFixed(6)},${lat.toFixed(6)})`
    : "";

  // Build URL
  // Format: /styles/v1/{style}/static/{overlay}/{lng},{lat},{zoom},{bearing},{pitch}/{width}x{height}{@2x}
  const baseUrl = "https://api.mapbox.com/styles/v1";
  const retinaParam = retina ? "@2x" : "";

  const url = overlay
    ? `${baseUrl}/${style}/static/${overlay}/${lng.toFixed(6)},${lat.toFixed(6)},${zoom},0/${clampedWidth}x${clampedHeight}${retinaParam}`
    : `${baseUrl}/${style}/static/${lng.toFixed(6)},${lat.toFixed(6)},${zoom},0/${clampedWidth}x${clampedHeight}${retinaParam}`;

  return `${url}?access_token=${MAPBOX_TOKEN}`;
}

/**
 * Generate static map URL with custom marker icon (if needed in future)
 * For now, uses default pin marker which is included in the API
 */
export function getStaticMapUrlWithMarker(
  lat: number,
  lng: number,
  options: Partial<Omit<StaticMapOptions, "lat" | "lng">> = {}
): string | null {
  return getStaticMapUrl({
    lat,
    lng,
    marker: true,
    ...options,
  });
}

/**
 * Preload hints for static map images
 * Use this in head to improve LCP for above-the-fold maps
 */
export function getStaticMapPreloadHints(options: StaticMapOptions): {
  href: string | null;
  as: "image";
  type: "image/png";
} {
  return {
    href: getStaticMapUrl(options),
    as: "image",
    type: "image/png",
  };
}
