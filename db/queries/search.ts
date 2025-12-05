import { eq, and, or, ilike, desc, asc } from "drizzle-orm";
import { db } from "../index";
import { places, cities, categories, placeCategories, countries } from "../schema";

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

// Helper to safely extract a non-array relation
function getRelation<T>(rel: T | T[] | null | undefined): T | null {
  if (!rel) return null;
  if (Array.isArray(rel)) return rel[0] || null;
  return rel;
}

// ============================================================================
// SEARCH TYPES
// ============================================================================

export interface SearchOptions {
  query?: string;
  cityId?: number;
  citySlug?: string;
  countrySlug?: string;
  categoryId?: number;
  categorySlug?: string;
  limit?: number;
  offset?: number;
  sortBy?: "relevance" | "rating" | "name" | "newest";
  premiumFirst?: boolean;
}

export interface SearchResult {
  places: Array<{
    id: number;
    slug: string;
    name: string;
    description: string | null;
    address: string | null;
    phone: string | null;
    website: string | null;
    lat: string | null;
    lng: string | null;
    avgRating: string | null;
    reviewCount: number;
    isPremium: boolean;
    isVerified: boolean;
    city: {
      id: number;
      slug: string;
      name: string;
      country: {
        slug: string;
        name: string;
      } | null;
    } | null;
    categories: Array<{
      slug: string;
      labelKey: string;
      icon: string | null;
    }>;
  }>;
  total: number;
  hasMore: boolean;
}

// ============================================================================
// SEARCH FUNCTIONS
// ============================================================================

/**
 * Search places with full-text search and filters
 */
export async function searchPlaces(options: SearchOptions): Promise<SearchResult> {
  if (!db) {
    return { places: [], total: 0, hasMore: false };
  }

  const {
    query,
    cityId,
    citySlug,
    countrySlug,
    categoryId,
    categorySlug,
    limit = 20,
    offset = 0,
    sortBy = "relevance",
    premiumFirst = true,
  } = options;

  // Build conditions array
  const conditions: ReturnType<typeof eq>[] = [];

  // Filter by city if provided
  let resolvedCityId = cityId;
  if (citySlug && !resolvedCityId) {
    // Try to find city by slug first
    let city = await db.query.cities.findFirst({
      where: eq(cities.slug, citySlug),
      with: { country: true },
    });

    // If countrySlug is provided, verify it matches
    if (city && countrySlug) {
      const countryRel = getRelation(city?.country);
      if (countryRel?.slug !== countrySlug) {
        city = undefined; // City doesn't match the country filter
      }
    }

    // If no city found by slug, try searching by name (case-insensitive)
    if (!city) {
      city = await db.query.cities.findFirst({
        where: ilike(cities.name, citySlug.replace(/-/g, " ")),
        with: { country: true },
      });
    }

    if (city) {
      resolvedCityId = city.id;
    }
  }

  if (resolvedCityId) {
    conditions.push(eq(places.cityId, resolvedCityId));
  }

  // Filter by category if provided
  let resolvedCategoryId = categoryId;
  if (categorySlug && !resolvedCategoryId) {
    const category = await db.query.categories.findFirst({
      where: eq(categories.slug, categorySlug),
    });
    if (category) {
      resolvedCategoryId = category.id;
    }
  }

  // Get place IDs that match category filter
  let categoryPlaceIds: number[] | null = null;
  if (resolvedCategoryId) {
    const categoryPlaces = await db
      .select({ placeId: placeCategories.placeId })
      .from(placeCategories)
      .where(eq(placeCategories.categoryId, resolvedCategoryId));
    categoryPlaceIds = categoryPlaces.map((cp) => cp.placeId);

    if (categoryPlaceIds.length === 0) {
      return { places: [], total: 0, hasMore: false };
    }
  }

  // Build the search query
  let results;

  if (query && query.trim()) {
    // Simple ILIKE search (no pg_trgm or full-text search extensions required)
    const searchTerm = `%${query.trim()}%`;

    // Use Drizzle ORM for search - simple and reliable
    results = await db.query.places.findMany({
      where: (places, { and, or, ilike, eq, inArray }) => {
        const searchConditions = or(
          ilike(places.name, searchTerm),
          ilike(places.description, searchTerm),
          ilike(places.address, searchTerm)
        );

        const allConditions = [];
        allConditions.push(searchConditions);

        if (resolvedCityId) {
          allConditions.push(eq(places.cityId, resolvedCityId));
        }
        if (categoryPlaceIds) {
          allConditions.push(inArray(places.id, categoryPlaceIds));
        }

        return and(...allConditions);
      },
      orderBy: (places, { desc, asc }) => {
        const orders = [];
        if (premiumFirst) {
          orders.push(desc(places.isPremium));
        }
        if (sortBy === "rating" || sortBy === "relevance") {
          orders.push(desc(places.avgRating));
        } else if (sortBy === "name") {
          orders.push(asc(places.name));
        } else if (sortBy === "newest") {
          orders.push(desc(places.createdAt));
        }
        orders.push(desc(places.reviewCount));
        return orders;
      },
      limit: limit + 1,
      offset,
      with: {
        city: {
          with: {
            country: true,
          },
        },
        placeCategories: {
          with: {
            category: true,
          },
        },
      },
    });
  } else {
    // No search query - just apply filters
    results = await db.query.places.findMany({
      where: (places, { and, eq, inArray }) => {
        const conds = [];
        if (resolvedCityId) {
          conds.push(eq(places.cityId, resolvedCityId));
        }
        if (categoryPlaceIds) {
          conds.push(inArray(places.id, categoryPlaceIds));
        }
        return conds.length > 0 ? and(...conds) : undefined;
      },
      orderBy: (places, { desc, asc }) => {
        const orders = [];
        if (premiumFirst) {
          orders.push(desc(places.isPremium));
        }
        if (sortBy === "rating") {
          orders.push(desc(places.avgRating));
        } else if (sortBy === "name") {
          orders.push(asc(places.name));
        } else if (sortBy === "newest") {
          orders.push(desc(places.createdAt));
        } else {
          orders.push(desc(places.avgRating));
        }
        return orders;
      },
      limit: limit + 1,
      offset,
      with: {
        city: {
          with: {
            country: true,
          },
        },
        placeCategories: {
          with: {
            category: true,
          },
        },
      },
    });
  }

  // Check if there are more results
  const hasMore = results.length > limit;
  const finalResults = results.slice(0, limit);

  // Transform results
  const transformedResults = finalResults.map((place) => {
    const cityRel = getRelation(place.city);
    const countryRel = cityRel ? getRelation(cityRel.country) : null;
    return {
      id: place.id,
      slug: place.slug,
      name: place.name,
      description: place.description,
      address: place.address,
      phone: place.phone,
      website: place.website,
      lat: place.lat,
      lng: place.lng,
      avgRating: place.avgRating,
      reviewCount: place.reviewCount,
      isPremium: place.isPremium,
      isVerified: place.isVerified,
      city: cityRel
        ? {
            id: cityRel.id,
            slug: cityRel.slug,
            name: cityRel.name,
            country: countryRel
              ? {
                  slug: countryRel.slug,
                  name: countryRel.name,
                }
              : null,
          }
        : null,
      categories: place.placeCategories.map((pc) => ({
        slug: pc.category.slug,
        labelKey: pc.category.labelKey,
        icon: pc.category.icon,
      })),
    };
  });

  return {
    places: transformedResults,
    total: finalResults.length, // For proper total, you'd need a separate count query
    hasMore,
  };
}

/**
 * Autocomplete suggestions for search
 */
export async function getSearchSuggestions(
  query: string,
  limit = 5
): Promise<{
  places: Array<{ id: number; slug: string; name: string; cityName: string }>;
  cities: Array<{ id: number; slug: string; name: string; countrySlug: string }>;
  categories: Array<{ id: number; slug: string; labelKey: string }>;
}> {
  if (!db || !query.trim()) {
    return { places: [], cities: [], categories: [] };
  }

  const searchTerm = `%${query.trim()}%`;

  // Search places
  const placeResults = await db.query.places.findMany({
    where: (places, { ilike }) => ilike(places.name, searchTerm),
    limit,
    with: {
      city: true,
    },
  });

  // Search cities
  const cityResults = await db.query.cities.findMany({
    where: (cities, { ilike }) => ilike(cities.name, searchTerm),
    limit,
    with: {
      country: true,
    },
  });

  // Search categories
  const categoryResults = await db.query.categories.findMany({
    where: (categories, { ilike }) => ilike(categories.labelKey, searchTerm),
    limit,
  });

  return {
    places: placeResults.map((p) => {
      const cityRel = getRelation(p.city);
      return {
        id: p.id,
        slug: p.slug,
        name: p.name,
        cityName: cityRel?.name || "",
      };
    }),
    cities: cityResults.map((c) => {
      const countryRel = getRelation(c.country);
      return {
        id: c.id,
        slug: c.slug,
        name: c.name,
        countrySlug: countryRel?.slug || "",
      };
    }),
    categories: categoryResults.map((c) => ({
      id: c.id,
      slug: c.slug,
      labelKey: c.labelKey,
    })),
  };
}

// ============================================================================
// TYPES
// ============================================================================

export type SearchPlaceResult = SearchResult["places"][number];
