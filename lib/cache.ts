/**
 * Cache Utilities for CutiePawsPedia
 *
 * PERFORMANCE: Application-level caching using Next.js unstable_cache
 * - Reduces database queries for frequently-accessed data
 * - Uses cache tags for on-demand revalidation
 * - Works with ISR (Incremental Static Regeneration)
 */

import { unstable_cache } from "next/cache";

// ============================================================================
// CACHE CONFIGURATION
// ============================================================================

/**
 * Cache duration constants (in seconds)
 */
export const CACHE_TIMES = {
  /** Static data that rarely changes (countries, categories) */
  STATIC: 3600 * 24, // 24 hours

  /** Location data (cities) - changes infrequently */
  LOCATIONS: 3600, // 1 hour

  /** Listing data (places, categories per city) - moderate change rate */
  LISTINGS: 300, // 5 minutes

  /** Dynamic data (reviews, ratings) - changes frequently */
  DYNAMIC: 60, // 1 minute

  /** AI-generated content - expensive to regenerate */
  AI_CONTENT: 3600 * 12, // 12 hours
} as const;

/**
 * Cache tag prefixes for on-demand revalidation
 */
export const CACHE_TAGS = {
  /** All countries */
  COUNTRIES: "countries",
  /** Specific country: `country:${slug}` */
  COUNTRY: (slug: string) => `country:${slug}`,

  /** All cities */
  CITIES: "cities",
  /** Cities in a country: `cities:${countrySlug}` */
  CITIES_BY_COUNTRY: (countrySlug: string) => `cities:${countrySlug}`,
  /** Specific city: `city:${slug}` */
  CITY: (slug: string) => `city:${slug}`,

  /** All categories */
  CATEGORIES: "categories",
  /** Specific category: `category:${slug}` */
  CATEGORY: (slug: string) => `category:${slug}`,

  /** All places */
  PLACES: "places",
  /** Places in a city: `places:${citySlug}` */
  PLACES_BY_CITY: (citySlug: string) => `places:${citySlug}`,
  /** Specific place: `place:${slug}` */
  PLACE: (slug: string) => `place:${slug}`,

  /** AI content: `ai:${contentType}:${key}` */
  AI_CONTENT: (contentType: string, key: string) => `ai:${contentType}:${key}`,
} as const;

// ============================================================================
// CACHE HELPERS
// ============================================================================

/**
 * Create a cached version of a function with proper typing
 *
 * @example
 * const cachedGetCountries = createCachedFunction(
 *   getCountries,
 *   ["countries"],
 *   { revalidate: CACHE_TIMES.STATIC, tags: [CACHE_TAGS.COUNTRIES] }
 * );
 */
export function createCachedFunction<T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T,
  keyParts: string[],
  options: {
    revalidate?: number | false;
    tags?: string[];
  } = {}
): T {
  const { revalidate = 300, tags = [] } = options;

  return unstable_cache(fn, keyParts, { revalidate, tags }) as T;
}

// ============================================================================
// REVALIDATION HELPERS
// ============================================================================

/**
 * Helper to generate revalidation tags for common operations
 */
export function getRevalidationTags(
  type: "country" | "city" | "place" | "category",
  slug: string,
  parentSlug?: string
): string[] {
  switch (type) {
    case "country":
      return [CACHE_TAGS.COUNTRIES, CACHE_TAGS.COUNTRY(slug)];
    case "city":
      return [
        CACHE_TAGS.CITIES,
        CACHE_TAGS.CITY(slug),
        ...(parentSlug ? [CACHE_TAGS.CITIES_BY_COUNTRY(parentSlug)] : []),
      ];
    case "place":
      return [
        CACHE_TAGS.PLACES,
        CACHE_TAGS.PLACE(slug),
        ...(parentSlug ? [CACHE_TAGS.PLACES_BY_CITY(parentSlug)] : []),
      ];
    case "category":
      return [CACHE_TAGS.CATEGORIES, CACHE_TAGS.CATEGORY(slug)];
    default:
      return [];
  }
}
