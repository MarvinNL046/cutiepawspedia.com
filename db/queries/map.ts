/**
 * Map Database Queries
 *
 * Query functions for fetching places with coordinates for map display.
 */

import { db } from "@/db";
import { eq, and, isNotNull, inArray, desc, asc } from "drizzle-orm";
import { places, cities, countries, provinces, categories, placeCategories } from "@/db/schema/directory";

export interface MapPlace {
  id: number;
  slug: string;
  name: string;
  lat: number;
  lng: number;
  address: string | null;
  isPremium: boolean;
  avgRating: string | null;
  reviewCount: number;
  categorySlug: string | null;
  categoryIcon: string | null;
  citySlug: string;
  cityName: string;
}

/**
 * Get places with coordinates for a specific country
 */
export async function getPlacesWithCoordinatesByCountry(
  countrySlug: string,
  options?: {
    categorySlug?: string;
    limit?: number;
    offset?: number;
  }
): Promise<MapPlace[]> {
  if (!db) return [];

  const { categorySlug, limit = 500, offset = 0 } = options ?? {};

  // Get country
  const country = await db.query.countries.findFirst({
    where: eq(countries.slug, countrySlug),
  });
  if (!country) return [];

  // Get cities in this country
  const countryCities = await db.query.cities.findMany({
    where: eq(cities.countryId, country.id),
    columns: { id: true },
  });
  const cityIds = countryCities.map((c) => c.id);
  if (cityIds.length === 0) return [];

  // If category filter is provided, get place IDs with that category
  let placeIdsWithCategory: number[] | null = null;
  if (categorySlug) {
    const category = await db.query.categories.findFirst({
      where: eq(categories.slug, categorySlug),
    });
    if (!category) return [];

    const placeCategoryResults = await db
      .select({ placeId: placeCategories.placeId })
      .from(placeCategories)
      .where(eq(placeCategories.categoryId, category.id));
    placeIdsWithCategory = placeCategoryResults.map((pc) => pc.placeId);
    if (placeIdsWithCategory.length === 0) return [];
  }

  // Build the query
  const results = await db.query.places.findMany({
    where: (places, { and, inArray, isNotNull }) => {
      const conditions = [
        inArray(places.cityId, cityIds),
        isNotNull(places.lat),
        isNotNull(places.lng),
      ];
      if (placeIdsWithCategory) {
        conditions.push(inArray(places.id, placeIdsWithCategory));
      }
      return and(...conditions);
    },
    orderBy: (places, { desc, asc }) => [desc(places.isPremium), desc(places.avgRating), asc(places.name)],
    limit,
    offset,
    columns: {
      id: true,
      slug: true,
      name: true,
      lat: true,
      lng: true,
      address: true,
      isPremium: true,
      avgRating: true,
      reviewCount: true,
    },
    with: {
      city: {
        columns: {
          slug: true,
          name: true,
        },
      },
      placeCategories: {
        limit: 1,
        with: {
          category: {
            columns: {
              slug: true,
              icon: true,
            },
          },
        },
      },
    },
  });

  return results.map((place) => ({
    id: place.id,
    slug: place.slug,
    name: place.name,
    lat: Number(place.lat),
    lng: Number(place.lng),
    address: place.address,
    isPremium: place.isPremium,
    avgRating: place.avgRating,
    reviewCount: place.reviewCount,
    categorySlug: place.placeCategories[0]?.category?.slug ?? null,
    categoryIcon: place.placeCategories[0]?.category?.icon ?? null,
    citySlug: place.city.slug,
    cityName: place.city.name,
  }));
}

/**
 * Get places with coordinates for a specific city
 */
export async function getPlacesWithCoordinatesByCity(
  citySlug: string,
  countrySlug: string,
  options?: {
    categorySlug?: string;
    limit?: number;
    offset?: number;
  }
): Promise<MapPlace[]> {
  if (!db) return [];

  const { categorySlug, limit = 500, offset = 0 } = options ?? {};

  // Get country first
  const country = await db.query.countries.findFirst({
    where: eq(countries.slug, countrySlug),
  });
  if (!country) return [];

  // Get city
  const city = await db.query.cities.findFirst({
    where: and(eq(cities.slug, citySlug), eq(cities.countryId, country.id)),
  });
  if (!city) return [];

  // If category filter is provided, get place IDs with that category
  let placeIdsWithCategory: number[] | null = null;
  if (categorySlug) {
    const category = await db.query.categories.findFirst({
      where: eq(categories.slug, categorySlug),
    });
    if (!category) return [];

    const placeCategoryResults = await db
      .select({ placeId: placeCategories.placeId })
      .from(placeCategories)
      .where(eq(placeCategories.categoryId, category.id));
    placeIdsWithCategory = placeCategoryResults.map((pc) => pc.placeId);
    if (placeIdsWithCategory.length === 0) return [];
  }

  // Build the query
  const results = await db.query.places.findMany({
    where: (places, { and, eq, inArray, isNotNull }) => {
      const conditions = [
        eq(places.cityId, city.id),
        isNotNull(places.lat),
        isNotNull(places.lng),
      ];
      if (placeIdsWithCategory) {
        conditions.push(inArray(places.id, placeIdsWithCategory));
      }
      return and(...conditions);
    },
    orderBy: (places, { desc, asc }) => [desc(places.isPremium), desc(places.avgRating), asc(places.name)],
    limit,
    offset,
    columns: {
      id: true,
      slug: true,
      name: true,
      lat: true,
      lng: true,
      address: true,
      isPremium: true,
      avgRating: true,
      reviewCount: true,
    },
    with: {
      city: {
        columns: {
          slug: true,
          name: true,
        },
      },
      placeCategories: {
        limit: 1,
        with: {
          category: {
            columns: {
              slug: true,
              icon: true,
            },
          },
        },
      },
    },
  });

  return results.map((place) => ({
    id: place.id,
    slug: place.slug,
    name: place.name,
    lat: Number(place.lat),
    lng: Number(place.lng),
    address: place.address,
    isPremium: place.isPremium,
    avgRating: place.avgRating,
    reviewCount: place.reviewCount,
    categorySlug: place.placeCategories[0]?.category?.slug ?? null,
    categoryIcon: place.placeCategories[0]?.category?.icon ?? null,
    citySlug: place.city.slug,
    cityName: place.city.name,
  }));
}

/**
 * Get country center coordinates for map initialization
 */
export async function getCountryCenter(countrySlug: string): Promise<{ lat: number; lng: number } | null> {
  if (!db) return null;

  // Get country and its cities to calculate center
  const country = await db.query.countries.findFirst({
    where: eq(countries.slug, countrySlug),
  });
  if (!country) return null;

  // Get cities with coordinates to calculate center
  const countryCities = await db.query.cities.findMany({
    where: and(eq(cities.countryId, country.id), isNotNull(cities.lat), isNotNull(cities.lng)),
    columns: { lat: true, lng: true },
    limit: 100,
  });

  if (countryCities.length === 0) {
    // Default centers for known countries
    const defaultCenters: Record<string, { lat: number; lng: number }> = {
      netherlands: { lat: 52.1326, lng: 5.2913 },
      belgium: { lat: 50.8503, lng: 4.3517 },
      germany: { lat: 51.1657, lng: 10.4515 },
      france: { lat: 46.2276, lng: 2.2137 },
    };
    return defaultCenters[countrySlug] ?? { lat: 52.3676, lng: 4.9041 };
  }

  // Calculate center
  const sum = countryCities.reduce(
    (acc, c) => ({
      lat: acc.lat + Number(c.lat),
      lng: acc.lng + Number(c.lng),
    }),
    { lat: 0, lng: 0 }
  );

  return {
    lat: sum.lat / countryCities.length,
    lng: sum.lng / countryCities.length,
  };
}

/**
 * Get city center coordinates for map initialization
 */
export async function getCityCenter(
  citySlug: string,
  countrySlug: string
): Promise<{ lat: number; lng: number } | null> {
  if (!db) return null;

  // Get country first
  const country = await db.query.countries.findFirst({
    where: eq(countries.slug, countrySlug),
  });
  if (!country) return null;

  // Get city
  const city = await db.query.cities.findFirst({
    where: and(eq(cities.slug, citySlug), eq(cities.countryId, country.id)),
    columns: { lat: true, lng: true },
  });

  if (!city || !city.lat || !city.lng) {
    return null;
  }

  return {
    lat: Number(city.lat),
    lng: Number(city.lng),
  };
}

/**
 * Get all categories that have places with coordinates in a country
 */
export async function getCategoriesWithPlacesInCountry(
  countrySlug: string
): Promise<Array<{ slug: string; icon: string | null; labelKey: string; count: number }>> {
  if (!db) return [];

  // Get country
  const country = await db.query.countries.findFirst({
    where: eq(countries.slug, countrySlug),
  });
  if (!country) return [];

  // Get cities in this country
  const countryCities = await db.query.cities.findMany({
    where: eq(cities.countryId, country.id),
    columns: { id: true },
  });
  const cityIds = countryCities.map((c) => c.id);
  if (cityIds.length === 0) return [];

  // Get places with coordinates
  const placesWithCoords = await db.query.places.findMany({
    where: (places, { and, inArray, isNotNull }) =>
      and(inArray(places.cityId, cityIds), isNotNull(places.lat), isNotNull(places.lng)),
    columns: { id: true },
  });
  const placeIds = placesWithCoords.map((p) => p.id);
  if (placeIds.length === 0) return [];

  // Get categories for these places
  const categoriesResult = await db
    .select({
      slug: categories.slug,
      icon: categories.icon,
      labelKey: categories.labelKey,
      placeId: placeCategories.placeId,
    })
    .from(categories)
    .innerJoin(placeCategories, eq(placeCategories.categoryId, categories.id))
    .where(inArray(placeCategories.placeId, placeIds));

  // Count unique places per category
  const categoryMap = new Map<string, { slug: string; icon: string | null; labelKey: string; places: Set<number> }>();
  for (const row of categoriesResult) {
    if (!categoryMap.has(row.slug)) {
      categoryMap.set(row.slug, {
        slug: row.slug,
        icon: row.icon,
        labelKey: row.labelKey,
        places: new Set(),
      });
    }
    categoryMap.get(row.slug)!.places.add(row.placeId);
  }

  return Array.from(categoryMap.values())
    .map((cat) => ({
      slug: cat.slug,
      icon: cat.icon,
      labelKey: cat.labelKey,
      count: cat.places.size,
    }))
    .sort((a, b) => b.count - a.count);
}
