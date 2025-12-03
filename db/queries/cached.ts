/**
 * Cached Database Queries
 *
 * PERFORMANCE: Wraps frequently-used database queries with Next.js unstable_cache
 * - Reduces database load by caching results
 * - Uses cache tags for on-demand revalidation
 * - Automatically revalidates based on configured TTL
 *
 * Usage: Import from here instead of the base query files for cached versions.
 */

import { unstable_cache } from "next/cache";
import { CACHE_TIMES, CACHE_TAGS } from "@/lib/cache";

// Import base queries
import {
  getCountries,
  getCountryBySlug,
  getCitiesByCountryId,
  getCitiesByCountrySlug,
  getCityBySlugAndCountry,
} from "./locations";

import {
  getCategories,
  getCategoryBySlug,
  getPlacesByCityAndCategory,
  getPlacesByCitySlugAndCategorySlug,
  getPlaceBySlug,
  getPlacesByCountrySlugAndCategorySlug,
  getTopPlacesByCountrySlugAndCategorySlug,
  getTopPlacesByCitySlugAndCategorySlug,
  getFeaturedPlacesByCity,
  getTopRatedPlacesByCity,
} from "./listings";

// ============================================================================
// CACHED LOCATION QUERIES
// ============================================================================

/**
 * Cached: Get all countries (rarely changes)
 */
export const cachedGetCountries = unstable_cache(
  getCountries,
  ["countries-all"],
  {
    revalidate: CACHE_TIMES.STATIC,
    tags: [CACHE_TAGS.COUNTRIES],
  }
);

/**
 * Cached: Get country by slug
 */
export const cachedGetCountryBySlug = unstable_cache(
  async (slug: string) => getCountryBySlug(slug),
  ["country-by-slug"],
  {
    revalidate: CACHE_TIMES.STATIC,
    tags: [CACHE_TAGS.COUNTRIES],
  }
);

/**
 * Cached: Get cities by country ID
 */
export const cachedGetCitiesByCountryId = unstable_cache(
  async (countryId: number) => getCitiesByCountryId(countryId),
  ["cities-by-country-id"],
  {
    revalidate: CACHE_TIMES.LOCATIONS,
    tags: [CACHE_TAGS.CITIES],
  }
);

/**
 * Cached: Get cities by country slug
 */
export const cachedGetCitiesByCountrySlug = unstable_cache(
  async (countrySlug: string) => getCitiesByCountrySlug(countrySlug),
  ["cities-by-country-slug"],
  {
    revalidate: CACHE_TIMES.LOCATIONS,
    tags: [CACHE_TAGS.CITIES],
  }
);

/**
 * Cached: Get city by slug and country
 */
export const cachedGetCityBySlugAndCountry = unstable_cache(
  async (citySlug: string, countrySlug: string) =>
    getCityBySlugAndCountry(citySlug, countrySlug),
  ["city-by-slug-and-country"],
  {
    revalidate: CACHE_TIMES.LOCATIONS,
    tags: [CACHE_TAGS.CITIES],
  }
);

// ============================================================================
// CACHED LISTING QUERIES
// ============================================================================

/**
 * Cached: Get all categories (rarely changes)
 */
export const cachedGetCategories = unstable_cache(
  getCategories,
  ["categories-all"],
  {
    revalidate: CACHE_TIMES.STATIC,
    tags: [CACHE_TAGS.CATEGORIES],
  }
);

/**
 * Cached: Get category by slug
 */
export const cachedGetCategoryBySlug = unstable_cache(
  async (slug: string) => getCategoryBySlug(slug),
  ["category-by-slug"],
  {
    revalidate: CACHE_TIMES.STATIC,
    tags: [CACHE_TAGS.CATEGORIES],
  }
);

/**
 * Cached: Get places by city and category
 */
export const cachedGetPlacesByCityAndCategory = unstable_cache(
  async (
    cityId: number,
    categoryId: number,
    options?: { limit?: number; offset?: number; premiumFirst?: boolean }
  ) => getPlacesByCityAndCategory(cityId, categoryId, options),
  ["places-by-city-and-category"],
  {
    revalidate: CACHE_TIMES.LISTINGS,
    tags: [CACHE_TAGS.PLACES],
  }
);

/**
 * Cached: Get places by city slug and category slug
 */
export const cachedGetPlacesByCitySlugAndCategorySlug = unstable_cache(
  async (
    citySlug: string,
    countrySlug: string,
    categorySlug: string,
    options?: { limit?: number; offset?: number; premiumFirst?: boolean }
  ) => getPlacesByCitySlugAndCategorySlug(citySlug, countrySlug, categorySlug, options),
  ["places-by-city-slug-and-category-slug"],
  {
    revalidate: CACHE_TIMES.LISTINGS,
    tags: [CACHE_TAGS.PLACES],
  }
);

/**
 * Cached: Get place by slug
 */
export const cachedGetPlaceBySlug = unstable_cache(
  async (placeSlug: string, citySlug: string, countrySlug: string) =>
    getPlaceBySlug(placeSlug, citySlug, countrySlug),
  ["place-by-slug"],
  {
    revalidate: CACHE_TIMES.LISTINGS,
    tags: [CACHE_TAGS.PLACES],
  }
);

/**
 * Cached: Get places by country and category
 */
export const cachedGetPlacesByCountrySlugAndCategorySlug = unstable_cache(
  async (
    countrySlug: string,
    categorySlug: string,
    options?: { limit?: number; offset?: number; premiumFirst?: boolean; topRated?: boolean }
  ) => getPlacesByCountrySlugAndCategorySlug(countrySlug, categorySlug, options),
  ["places-by-country-slug-and-category-slug"],
  {
    revalidate: CACHE_TIMES.LISTINGS,
    tags: [CACHE_TAGS.PLACES],
  }
);

/**
 * Cached: Get top places by country and category
 */
export const cachedGetTopPlacesByCountrySlugAndCategorySlug = unstable_cache(
  async (countrySlug: string, categorySlug: string, limit?: number) =>
    getTopPlacesByCountrySlugAndCategorySlug(countrySlug, categorySlug, limit),
  ["top-places-by-country-slug-and-category-slug"],
  {
    revalidate: CACHE_TIMES.LISTINGS,
    tags: [CACHE_TAGS.PLACES],
  }
);

/**
 * Cached: Get top places by city and category
 */
export const cachedGetTopPlacesByCitySlugAndCategorySlug = unstable_cache(
  async (citySlug: string, countrySlug: string, categorySlug: string, limit?: number) =>
    getTopPlacesByCitySlugAndCategorySlug(citySlug, countrySlug, categorySlug, limit),
  ["top-places-by-city-slug-and-category-slug"],
  {
    revalidate: CACHE_TIMES.LISTINGS,
    tags: [CACHE_TAGS.PLACES],
  }
);

/**
 * Cached: Get featured places by city
 */
export const cachedGetFeaturedPlacesByCity = unstable_cache(
  async (cityId: number, limit?: number) => getFeaturedPlacesByCity(cityId, limit),
  ["featured-places-by-city"],
  {
    revalidate: CACHE_TIMES.LISTINGS,
    tags: [CACHE_TAGS.PLACES],
  }
);

/**
 * Cached: Get top-rated places by city
 */
export const cachedGetTopRatedPlacesByCity = unstable_cache(
  async (cityId: number, limit?: number) => getTopRatedPlacesByCity(cityId, limit),
  ["top-rated-places-by-city"],
  {
    revalidate: CACHE_TIMES.LISTINGS,
    tags: [CACHE_TAGS.PLACES],
  }
);

// ============================================================================
// RE-EXPORT TYPES
// ============================================================================

export type { Country, City, CityList } from "./locations";
export type { Category, Place, PlaceList } from "./listings";
