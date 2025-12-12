/**
 * City Comparison Queries
 *
 * Query functions for comparing pet services between two cities.
 * Used by the City vs City comparison SEO pages.
 */

import { eq, sql, and, inArray, desc, count, avg } from "drizzle-orm";
import { db } from "../index";
import { places, placeCategories } from "../schema";
import { getCityBySlugAndCountry } from "./locations";
import { getCategoryBySlug } from "./listings";

// ============================================================================
// TYPES
// ============================================================================

export interface CityComparisonStats {
  cityId: number;
  cityName: string;
  citySlug: string;
  provinceSlug: string | null;
  provinceName: string | null;
  totalPlaces: number;
  avgRating: number | null;
  totalReviews: number;
  premiumCount: number;
  verifiedCount: number;
}

export interface CityComparisonPlace {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  avgRating: string | null;
  reviewCount: number;
  isPremium: boolean;
  isVerified: boolean;
  address: string | null;
}

export interface CityComparisonData {
  city1: CityComparisonStats;
  city2: CityComparisonStats;
  city1TopPlaces: CityComparisonPlace[];
  city2TopPlaces: CityComparisonPlace[];
  categoryName: string;
  categorySlug: string;
}

// ============================================================================
// MAIN COMPARISON QUERY
// ============================================================================

/**
 * Get comprehensive comparison data between two cities for a specific category
 */
export async function getCityComparisonData(
  city1Slug: string,
  city2Slug: string,
  countrySlug: string,
  categorySlug: string
): Promise<CityComparisonData | null> {
  if (!db) return null;

  // Get both cities and category in parallel
  const [city1, city2, category] = await Promise.all([
    getCityBySlugAndCountry(city1Slug, countrySlug),
    getCityBySlugAndCountry(city2Slug, countrySlug),
    getCategoryBySlug(categorySlug),
  ]);

  if (!city1 || !city2 || !category) {
    return null;
  }

  // Get stats and top places for both cities in parallel
  const [city1Stats, city2Stats, city1Places, city2Places] = await Promise.all([
    getCityStatsForCategory(city1.id, category.id),
    getCityStatsForCategory(city2.id, category.id),
    getTopPlacesByCityAndCategory(city1.id, category.id, 3),
    getTopPlacesByCityAndCategory(city2.id, category.id, 3),
  ]);

  // Extract province info
  const province1 = Array.isArray(city1.province) ? city1.province[0] : city1.province;
  const province2 = Array.isArray(city2.province) ? city2.province[0] : city2.province;

  return {
    city1: {
      cityId: city1.id,
      cityName: city1.name,
      citySlug: city1.slug,
      provinceSlug: province1?.slug || null,
      provinceName: province1?.name || null,
      ...city1Stats,
    },
    city2: {
      cityId: city2.id,
      cityName: city2.name,
      citySlug: city2.slug,
      provinceSlug: province2?.slug || null,
      provinceName: province2?.name || null,
      ...city2Stats,
    },
    city1TopPlaces: city1Places,
    city2TopPlaces: city2Places,
    categoryName: category.labelKey,
    categorySlug: category.slug,
  };
}

// ============================================================================
// HELPER QUERIES
// ============================================================================

/**
 * Get statistics for a specific city and category
 */
async function getCityStatsForCategory(
  cityId: number,
  categoryId: number
): Promise<{
  totalPlaces: number;
  avgRating: number | null;
  totalReviews: number;
  premiumCount: number;
  verifiedCount: number;
}> {
  if (!db) {
    return {
      totalPlaces: 0,
      avgRating: null,
      totalReviews: 0,
      premiumCount: 0,
      verifiedCount: 0,
    };
  }

  // Get place IDs that have the specified category
  const placeCategoryResults = await db
    .select({ placeId: placeCategories.placeId })
    .from(placeCategories)
    .where(eq(placeCategories.categoryId, categoryId));

  const placeIds = placeCategoryResults.map((pc) => pc.placeId);
  if (placeIds.length === 0) {
    return {
      totalPlaces: 0,
      avgRating: null,
      totalReviews: 0,
      premiumCount: 0,
      verifiedCount: 0,
    };
  }

  // Get aggregated stats
  const stats = await db
    .select({
      totalPlaces: count(places.id),
      avgRating: avg(places.avgRating),
      totalReviews: sql<number>`COALESCE(SUM(${places.reviewCount}), 0)::int`,
      premiumCount: sql<number>`COUNT(CASE WHEN ${places.isPremium} THEN 1 END)::int`,
      verifiedCount: sql<number>`COUNT(CASE WHEN ${places.isVerified} THEN 1 END)::int`,
    })
    .from(places)
    .where(and(eq(places.cityId, cityId), inArray(places.id, placeIds)));

  const result = stats[0];
  return {
    totalPlaces: result?.totalPlaces ?? 0,
    avgRating: result?.avgRating ? parseFloat(String(result.avgRating)) : null,
    totalReviews: result?.totalReviews ?? 0,
    premiumCount: result?.premiumCount ?? 0,
    verifiedCount: result?.verifiedCount ?? 0,
  };
}

/**
 * Get top-rated places for a city and category
 */
async function getTopPlacesByCityAndCategory(
  cityId: number,
  categoryId: number,
  limit: number = 3
): Promise<CityComparisonPlace[]> {
  if (!db) return [];

  // Get place IDs that have the specified category
  const placeCategoryResults = await db
    .select({ placeId: placeCategories.placeId })
    .from(placeCategories)
    .where(eq(placeCategories.categoryId, categoryId));

  const placeIds = placeCategoryResults.map((pc) => pc.placeId);
  if (placeIds.length === 0) return [];

  const results = await db
    .select({
      id: places.id,
      slug: places.slug,
      name: places.name,
      description: places.description,
      avgRating: places.avgRating,
      reviewCount: places.reviewCount,
      isPremium: places.isPremium,
      isVerified: places.isVerified,
      address: places.address,
    })
    .from(places)
    .where(and(eq(places.cityId, cityId), inArray(places.id, placeIds)))
    .orderBy(desc(places.avgRating), desc(places.reviewCount))
    .limit(limit);

  return results;
}

// ============================================================================
// STATIC PARAMS HELPERS
// ============================================================================

/**
 * Get popular city combinations for a country
 * Returns pairs of cities that should have comparison pages generated
 */
export async function getPopularCityCombinations(countrySlug: string): Promise<
  Array<{
    city1Slug: string;
    city2Slug: string;
  }>
> {
  if (!db) return [];

  // Define popular city combinations per country
  const popularCombinations: Record<string, Array<[string, string]>> = {
    netherlands: [
      ["amsterdam", "rotterdam"],
      ["amsterdam", "den-haag"],
      ["amsterdam", "utrecht"],
      ["rotterdam", "den-haag"],
      ["rotterdam", "utrecht"],
      ["utrecht", "den-haag"],
      ["eindhoven", "tilburg"],
      ["groningen", "leeuwarden"],
      ["arnhem", "nijmegen"],
      ["maastricht", "eindhoven"],
    ],
    belgium: [
      ["brussels", "antwerp"],
      ["brussels", "ghent"],
      ["brussels", "bruges"],
      ["antwerp", "ghent"],
      ["liege", "namur"],
      ["leuven", "brussels"],
    ],
    germany: [
      ["berlin", "hamburg"],
      ["berlin", "munich"],
      ["munich", "frankfurt"],
      ["hamburg", "frankfurt"],
      ["cologne", "dusseldorf"],
      ["stuttgart", "munich"],
    ],
  };

  const combinations = popularCombinations[countrySlug] || [];
  return combinations.map(([city1Slug, city2Slug]) => ({
    city1Slug,
    city2Slug,
  }));
}

/**
 * Validate that both cities exist in the country
 */
export async function validateCityComparison(
  city1Slug: string,
  city2Slug: string,
  countrySlug: string
): Promise<boolean> {
  if (!db) return false;

  const [city1, city2] = await Promise.all([
    getCityBySlugAndCountry(city1Slug, countrySlug),
    getCityBySlugAndCountry(city2Slug, countrySlug),
  ]);

  return city1 !== null && city2 !== null && city1.id !== city2.id;
}
