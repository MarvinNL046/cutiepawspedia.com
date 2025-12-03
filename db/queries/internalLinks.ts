/**
 * Internal Links Query Helpers
 *
 * Database queries for generating internal links based on place/category relationships.
 */

import { eq, sql, desc, and, ne } from "drizzle-orm";
import { db } from "../index";
import {
  places,
  cities,
  countries,
  categories,
  placeCategories,
} from "../schema";
import type {
  CategoryLinkStats,
  CityLinkStats,
  RelatedPlaceLink,
} from "@/lib/internalLinks/types";

// ============================================================================
// TOP CATEGORIES FOR CITY
// ============================================================================

/**
 * Get top categories for a city based on place count
 */
export async function getTopCategoriesForCity(params: {
  citySlug: string;
  countrySlug: string;
  limit?: number;
}): Promise<CategoryLinkStats[]> {
  const { citySlug, countrySlug, limit = 6 } = params;
  if (!db) return [];

  // Get city ID
  const country = await db.query.countries.findFirst({
    where: eq(countries.slug, countrySlug),
    columns: { id: true },
  });
  if (!country) return [];

  const city = await db.query.cities.findFirst({
    where: and(eq(cities.slug, citySlug), eq(cities.countryId, country.id)),
    columns: { id: true },
  });
  if (!city) return [];

  // Count places per category in this city
  const results = await db
    .select({
      categorySlug: categories.slug,
      categoryName: categories.labelKey,
      placesCount: sql<number>`count(${places.id})::int`,
    })
    .from(placeCategories)
    .innerJoin(places, eq(placeCategories.placeId, places.id))
    .innerJoin(categories, eq(placeCategories.categoryId, categories.id))
    .where(eq(places.cityId, city.id))
    .groupBy(categories.id, categories.slug, categories.labelKey)
    .orderBy(desc(sql`count(${places.id})`))
    .limit(limit);

  return results.map((r) => ({
    categorySlug: r.categorySlug,
    categoryName: r.categoryName,
    placesCount: r.placesCount,
  }));
}

// ============================================================================
// TOP CITIES FOR CATEGORY
// ============================================================================

/**
 * Get top cities for a category within a country based on place count
 */
export async function getTopCitiesForCategory(params: {
  countrySlug: string;
  categorySlug: string;
  limit?: number;
}): Promise<CityLinkStats[]> {
  const { countrySlug, categorySlug, limit = 6 } = params;
  if (!db) return [];

  // Get country ID
  const country = await db.query.countries.findFirst({
    where: eq(countries.slug, countrySlug),
    columns: { id: true },
  });
  if (!country) return [];

  // Get category ID
  const category = await db.query.categories.findFirst({
    where: eq(categories.slug, categorySlug),
    columns: { id: true },
  });
  if (!category) return [];

  // Count places per city for this category in this country
  const results = await db
    .select({
      citySlug: cities.slug,
      cityName: cities.name,
      placesCount: sql<number>`count(${places.id})::int`,
    })
    .from(placeCategories)
    .innerJoin(places, eq(placeCategories.placeId, places.id))
    .innerJoin(cities, eq(places.cityId, cities.id))
    .where(
      and(
        eq(placeCategories.categoryId, category.id),
        eq(cities.countryId, country.id)
      )
    )
    .groupBy(cities.id, cities.slug, cities.name)
    .orderBy(desc(sql`count(${places.id})`))
    .limit(limit);

  return results.map((r) => ({
    citySlug: r.citySlug,
    cityName: r.cityName,
    countrySlug,
    placesCount: r.placesCount,
  }));
}

// ============================================================================
// RELATED PLACES
// ============================================================================

/**
 * Get related places in the same city and category
 */
export async function getRelatedPlaces(params: {
  placeId: string;
  citySlug: string;
  categorySlug: string;
  limit?: number;
}): Promise<RelatedPlaceLink[]> {
  const { placeId, citySlug, categorySlug, limit = 4 } = params;
  if (!db) return [];

  // Get city
  const city = await db.query.cities.findFirst({
    where: eq(cities.slug, citySlug),
    columns: { id: true },
  });
  if (!city) return [];

  // Get category
  const category = await db.query.categories.findFirst({
    where: eq(categories.slug, categorySlug),
    columns: { id: true },
  });
  if (!category) return [];

  // Get places in same city and category, excluding current place
  const placeIdNum = parseInt(placeId, 10);
  if (isNaN(placeIdNum)) return [];

  const results = await db
    .select({
      placeSlug: places.slug,
      placeName: places.name,
      avgRating: places.avgRating,
      reviewCount: places.reviewCount,
    })
    .from(placeCategories)
    .innerJoin(places, eq(placeCategories.placeId, places.id))
    .where(
      and(
        eq(placeCategories.categoryId, category.id),
        eq(places.cityId, city.id),
        ne(places.id, placeIdNum)
      )
    )
    .orderBy(desc(places.avgRating), desc(places.reviewCount))
    .limit(limit);

  return results.map((r) => ({
    placeSlug: r.placeSlug,
    placeName: r.placeName,
    citySlug,
    categorySlug,
    avgRating: r.avgRating ? parseFloat(r.avgRating) : undefined,
    reviewCount: r.reviewCount || undefined,
  }));
}

// ============================================================================
// COUNTRY TOP CITIES AND CATEGORIES
// ============================================================================

/**
 * Get top cities and categories for a country
 */
export async function getCountryTopCitiesAndCategories(params: {
  countrySlug: string;
  limitCities?: number;
  limitCategories?: number;
}): Promise<{
  topCities: CityLinkStats[];
  topCategories: CategoryLinkStats[];
}> {
  const { countrySlug, limitCities = 6, limitCategories = 6 } = params;
  if (!db) return { topCities: [], topCategories: [] };

  // Get country
  const country = await db.query.countries.findFirst({
    where: eq(countries.slug, countrySlug),
    columns: { id: true },
  });
  if (!country) return { topCities: [], topCategories: [] };

  // Top cities by place count
  const cityResults = await db
    .select({
      citySlug: cities.slug,
      cityName: cities.name,
      placesCount: sql<number>`count(${places.id})::int`,
    })
    .from(cities)
    .leftJoin(places, eq(places.cityId, cities.id))
    .where(eq(cities.countryId, country.id))
    .groupBy(cities.id, cities.slug, cities.name)
    .orderBy(desc(sql`count(${places.id})`))
    .limit(limitCities);

  const topCities: CityLinkStats[] = cityResults.map((r) => ({
    citySlug: r.citySlug,
    cityName: r.cityName,
    countrySlug,
    placesCount: r.placesCount || 0,
  }));

  // Top categories by place count in this country
  const categoryResults = await db
    .select({
      categorySlug: categories.slug,
      categoryName: categories.labelKey,
      placesCount: sql<number>`count(${places.id})::int`,
    })
    .from(placeCategories)
    .innerJoin(places, eq(placeCategories.placeId, places.id))
    .innerJoin(cities, eq(places.cityId, cities.id))
    .innerJoin(categories, eq(placeCategories.categoryId, categories.id))
    .where(eq(cities.countryId, country.id))
    .groupBy(categories.id, categories.slug, categories.labelKey)
    .orderBy(desc(sql`count(${places.id})`))
    .limit(limitCategories);

  const topCategories: CategoryLinkStats[] = categoryResults.map((r) => ({
    categorySlug: r.categorySlug,
    categoryName: r.categoryName,
    placesCount: r.placesCount,
  }));

  return { topCities, topCategories };
}

// ============================================================================
// ADDITIONAL HELPERS
// ============================================================================

/**
 * Get all categories for a city with place counts
 */
export async function getCategoriesForCity(params: {
  citySlug: string;
  countrySlug: string;
}): Promise<CategoryLinkStats[]> {
  return getTopCategoriesForCity({ ...params, limit: 100 });
}

/**
 * Get all cities for a category in a country with place counts
 */
export async function getCitiesForCategory(params: {
  countrySlug: string;
  categorySlug: string;
}): Promise<CityLinkStats[]> {
  return getTopCitiesForCategory({ ...params, limit: 100 });
}
