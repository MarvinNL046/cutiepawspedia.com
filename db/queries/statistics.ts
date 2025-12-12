/**
 * Statistics Database Queries
 *
 * Aggregate query functions for generating statistics pages.
 * These queries provide data for SEO-optimized statistics/facts pages.
 */

import { eq, and, sql, desc, count, sum, avg, gt } from "drizzle-orm";
import { db } from "../index";
import { places, categories, placeCategories, cities, provinces, countries, reviews } from "../schema";
import { getCountryBySlug } from "./locations";
import { getCategoryBySlug } from "./listings";

// ============================================================================
// COUNTRY + CATEGORY STATISTICS
// ============================================================================

/**
 * Get total place count for a specific country and category
 */
export async function getPlaceCountByCountryAndCategory(
  countrySlug: string,
  categorySlug: string
): Promise<number> {
  if (!db) return 0;

  const country = await getCountryBySlug(countrySlug);
  if (!country) return 0;

  const category = await getCategoryBySlug(categorySlug);
  if (!category) return 0;

  // Get cities in this country
  const countryCities = await db.query.cities.findMany({
    where: eq(cities.countryId, country.id),
    columns: { id: true },
  });
  const cityIds = countryCities.map((c) => c.id);
  if (cityIds.length === 0) return 0;

  // Get places in these cities with the category
  const result = await db
    .select({ count: count() })
    .from(places)
    .innerJoin(placeCategories, eq(placeCategories.placeId, places.id))
    .where(
      and(
        sql`${places.cityId} IN ${cityIds}`,
        eq(placeCategories.categoryId, category.id)
      )
    );

  return result[0]?.count ?? 0;
}

/**
 * Get place count per province for a country and category
 */
export async function getPlaceCountByProvinceAndCategory(
  countrySlug: string,
  categorySlug: string
): Promise<Array<{ provinceId: number; provinceName: string; provinceSlug: string; count: number }>> {
  if (!db) return [];

  const country = await getCountryBySlug(countrySlug);
  if (!country) return [];

  const category = await getCategoryBySlug(categorySlug);
  if (!category) return [];

  // Get all provinces in this country
  const countryProvinces = await db.query.provinces.findMany({
    where: eq(provinces.countryId, country.id),
    orderBy: desc(provinces.placeCount),
  });

  const results: Array<{ provinceId: number; provinceName: string; provinceSlug: string; count: number }> = [];

  for (const province of countryProvinces) {
    // Get cities in this province
    const provinceCities = await db.query.cities.findMany({
      where: eq(cities.provinceId, province.id),
      columns: { id: true },
    });
    const cityIds = provinceCities.map((c) => c.id);

    if (cityIds.length === 0) {
      results.push({
        provinceId: province.id,
        provinceName: province.name,
        provinceSlug: province.slug,
        count: 0,
      });
      continue;
    }

    // Count places in these cities with the category
    const countResult = await db
      .select({ count: count() })
      .from(places)
      .innerJoin(placeCategories, eq(placeCategories.placeId, places.id))
      .where(
        and(
          sql`${places.cityId} IN ${cityIds}`,
          eq(placeCategories.categoryId, category.id)
        )
      );

    results.push({
      provinceId: province.id,
      provinceName: province.name,
      provinceSlug: province.slug,
      count: countResult[0]?.count ?? 0,
    });
  }

  // Sort by count descending
  return results.sort((a, b) => b.count - a.count);
}

/**
 * Get average rating for places in a country and category
 */
export async function getAverageRatingByCountryAndCategory(
  countrySlug: string,
  categorySlug: string
): Promise<{ avgRating: number; totalReviews: number; ratedPlaces: number }> {
  if (!db) return { avgRating: 0, totalReviews: 0, ratedPlaces: 0 };

  const country = await getCountryBySlug(countrySlug);
  if (!country) return { avgRating: 0, totalReviews: 0, ratedPlaces: 0 };

  const category = await getCategoryBySlug(categorySlug);
  if (!category) return { avgRating: 0, totalReviews: 0, ratedPlaces: 0 };

  // Get cities in this country
  const countryCities = await db.query.cities.findMany({
    where: eq(cities.countryId, country.id),
    columns: { id: true },
  });
  const cityIds = countryCities.map((c) => c.id);
  if (cityIds.length === 0) return { avgRating: 0, totalReviews: 0, ratedPlaces: 0 };

  // Get aggregate stats
  const result = await db
    .select({
      avgRating: avg(places.avgRating),
      totalReviews: sum(places.reviewCount),
      ratedPlaces: count(),
    })
    .from(places)
    .innerJoin(placeCategories, eq(placeCategories.placeId, places.id))
    .where(
      and(
        sql`${places.cityId} IN ${cityIds}`,
        eq(placeCategories.categoryId, category.id),
        gt(places.reviewCount, 0)
      )
    );

  return {
    avgRating: parseFloat(result[0]?.avgRating ?? "0") || 0,
    totalReviews: parseInt(String(result[0]?.totalReviews ?? 0)) || 0,
    ratedPlaces: result[0]?.ratedPlaces ?? 0,
  };
}

/**
 * Get cities with most places for a country and category
 */
export async function getTopCitiesByPlaceCount(
  countrySlug: string,
  categorySlug: string,
  limit = 10
): Promise<Array<{ cityId: number; cityName: string; citySlug: string; count: number }>> {
  if (!db) return [];

  const country = await getCountryBySlug(countrySlug);
  if (!country) return [];

  const category = await getCategoryBySlug(categorySlug);
  if (!category) return [];

  // Get cities in this country with place counts
  const countryCities = await db.query.cities.findMany({
    where: eq(cities.countryId, country.id),
  });

  const results: Array<{ cityId: number; cityName: string; citySlug: string; count: number }> = [];

  for (const city of countryCities) {
    const countResult = await db
      .select({ count: count() })
      .from(places)
      .innerJoin(placeCategories, eq(placeCategories.placeId, places.id))
      .where(
        and(
          eq(places.cityId, city.id),
          eq(placeCategories.categoryId, category.id)
        )
      );

    const placeCount = countResult[0]?.count ?? 0;
    if (placeCount > 0) {
      results.push({
        cityId: city.id,
        cityName: city.name,
        citySlug: city.slug,
        count: placeCount,
      });
    }
  }

  // Sort by count descending and return top N
  return results.sort((a, b) => b.count - a.count).slice(0, limit);
}

/**
 * Get rating distribution for a country and category
 */
export async function getRatingDistribution(
  countrySlug: string,
  categorySlug: string
): Promise<Array<{ rating: number; count: number }>> {
  if (!db) return [];

  const country = await getCountryBySlug(countrySlug);
  if (!country) return [];

  const category = await getCategoryBySlug(categorySlug);
  if (!category) return [];

  // Get cities in this country
  const countryCities = await db.query.cities.findMany({
    where: eq(cities.countryId, country.id),
    columns: { id: true },
  });
  const cityIds = countryCities.map((c) => c.id);
  if (cityIds.length === 0) return [];

  // Get rating distribution (1-5 stars)
  // Non-overlapping buckets: 5★ = [4.5, 5.0], 4★ = [3.5, 4.5), etc.
  const distribution: Array<{ rating: number; count: number }> = [];

  const ratingBuckets = [
    { rating: 5, min: 4.5, max: 5.01 },  // 4.5 - 5.0 inclusive
    { rating: 4, min: 3.5, max: 4.5 },   // 3.5 - 4.49
    { rating: 3, min: 2.5, max: 3.5 },   // 2.5 - 3.49
    { rating: 2, min: 1.5, max: 2.5 },   // 1.5 - 2.49
    { rating: 1, min: 0, max: 1.5 },     // 0 - 1.49
  ];

  for (const bucket of ratingBuckets) {
    const result = await db
      .select({ count: count() })
      .from(places)
      .innerJoin(placeCategories, eq(placeCategories.placeId, places.id))
      .where(
        and(
          sql`${places.cityId} IN ${cityIds}`,
          eq(placeCategories.categoryId, category.id),
          sql`${places.avgRating} >= ${bucket.min}`,
          sql`${places.avgRating} < ${bucket.max}`,
          gt(places.reviewCount, 0)
        )
      );

    distribution.push({
      rating: bucket.rating,
      count: result[0]?.count ?? 0,
    });
  }

  return distribution;
}

/**
 * Get statistics summary for a country and category
 * This is the main function to call for the statistics page
 */
export async function getCategoryStatistics(
  countrySlug: string,
  categorySlug: string
): Promise<{
  totalPlaces: number;
  avgRating: number;
  totalReviews: number;
  ratedPlaces: number;
  topCities: Array<{ cityId: number; cityName: string; citySlug: string; count: number }>;
  provinceDistribution: Array<{ provinceId: number; provinceName: string; provinceSlug: string; count: number }>;
  ratingDistribution: Array<{ rating: number; count: number }>;
  verifiedPlaces: number;
  premiumPlaces: number;
}> {
  const [
    totalPlaces,
    ratingStats,
    topCities,
    provinceDistribution,
    ratingDistribution,
    verifiedPremiumStats,
  ] = await Promise.all([
    getPlaceCountByCountryAndCategory(countrySlug, categorySlug),
    getAverageRatingByCountryAndCategory(countrySlug, categorySlug),
    getTopCitiesByPlaceCount(countrySlug, categorySlug, 10),
    getPlaceCountByProvinceAndCategory(countrySlug, categorySlug),
    getRatingDistribution(countrySlug, categorySlug),
    getVerifiedAndPremiumCount(countrySlug, categorySlug),
  ]);

  return {
    totalPlaces,
    ...ratingStats,
    topCities,
    provinceDistribution,
    ratingDistribution,
    ...verifiedPremiumStats,
  };
}

/**
 * Get count of verified and premium places
 */
async function getVerifiedAndPremiumCount(
  countrySlug: string,
  categorySlug: string
): Promise<{ verifiedPlaces: number; premiumPlaces: number }> {
  if (!db) return { verifiedPlaces: 0, premiumPlaces: 0 };

  const country = await getCountryBySlug(countrySlug);
  if (!country) return { verifiedPlaces: 0, premiumPlaces: 0 };

  const category = await getCategoryBySlug(categorySlug);
  if (!category) return { verifiedPlaces: 0, premiumPlaces: 0 };

  // Get cities in this country
  const countryCities = await db.query.cities.findMany({
    where: eq(cities.countryId, country.id),
    columns: { id: true },
  });
  const cityIds = countryCities.map((c) => c.id);
  if (cityIds.length === 0) return { verifiedPlaces: 0, premiumPlaces: 0 };

  // Count verified places
  const verifiedResult = await db
    .select({ count: count() })
    .from(places)
    .innerJoin(placeCategories, eq(placeCategories.placeId, places.id))
    .where(
      and(
        sql`${places.cityId} IN ${cityIds}`,
        eq(placeCategories.categoryId, category.id),
        eq(places.isVerified, true)
      )
    );

  // Count premium places
  const premiumResult = await db
    .select({ count: count() })
    .from(places)
    .innerJoin(placeCategories, eq(placeCategories.placeId, places.id))
    .where(
      and(
        sql`${places.cityId} IN ${cityIds}`,
        eq(placeCategories.categoryId, category.id),
        eq(places.isPremium, true)
      )
    );

  return {
    verifiedPlaces: verifiedResult[0]?.count ?? 0,
    premiumPlaces: premiumResult[0]?.count ?? 0,
  };
}

// ============================================================================
// TYPES
// ============================================================================

export type CategoryStatistics = Awaited<ReturnType<typeof getCategoryStatistics>>;
export type ProvinceDistribution = Awaited<ReturnType<typeof getPlaceCountByProvinceAndCategory>>;
export type TopCities = Awaited<ReturnType<typeof getTopCitiesByPlaceCount>>;
export type RatingDistribution = Awaited<ReturnType<typeof getRatingDistribution>>;
