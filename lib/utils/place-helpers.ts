/**
 * Place helper utilities
 *
 * Handles type-safe extraction of nested relations from Drizzle ORM queries
 */

/**
 * Safely extract city data from a place object
 * Handles both array and object types from Drizzle relations
 */
export function getPlaceCity(place: {
  city?: { name?: string; slug?: string; country?: { name?: string; slug?: string } | null } | unknown[] | null;
}) {
  if (!place.city) return null;

  // Handle potential array type from Drizzle
  const city = Array.isArray(place.city) ? place.city[0] : place.city;

  if (!city || typeof city !== "object") return null;

  return city as {
    name?: string;
    slug?: string;
    country?: { name?: string; slug?: string } | null;
  };
}

/**
 * Get city name with fallback
 */
export function getCityName(
  place: { city?: unknown },
  fallback: string = "Unknown"
): string {
  const city = getPlaceCity(place as Parameters<typeof getPlaceCity>[0]);
  return city?.name || fallback;
}

/**
 * Get city slug with fallback
 */
export function getCitySlug(
  place: { city?: unknown },
  fallback: string = ""
): string {
  const city = getPlaceCity(place as Parameters<typeof getPlaceCity>[0]);
  return city?.slug || fallback;
}

/**
 * Get country name with fallback
 */
export function getCountryName(
  place: { city?: unknown },
  fallback: string = "Unknown"
): string {
  const city = getPlaceCity(place as Parameters<typeof getPlaceCity>[0]);
  return city?.country?.name || fallback;
}

/**
 * Get country slug with fallback
 */
export function getCountrySlug(
  place: { city?: unknown },
  fallback: string = ""
): string {
  const city = getPlaceCity(place as Parameters<typeof getPlaceCity>[0]);
  return city?.country?.slug || fallback;
}
