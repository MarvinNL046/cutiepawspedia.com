import { sql, eq, and, or, ilike, desc, asc } from "drizzle-orm";
import { db } from "../index";
import { places, cities, categories, placeCategories, countries } from "../schema";

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
  if (citySlug && countrySlug && !resolvedCityId) {
    const city = await db.query.cities.findFirst({
      where: eq(cities.slug, citySlug),
      with: { country: true },
    });
    if (city && city.country?.slug === countrySlug) {
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
    // Full-text search with ranking
    const searchQuery = query.trim().split(/\s+/).join(" & ");

    // Use raw SQL for full-text search
    const searchResults = await db.execute(sql`
      SELECT
        p.id,
        p.slug,
        p.name,
        p.description,
        p.address,
        p.phone,
        p.website,
        p.lat,
        p.lng,
        p.avg_rating,
        p.review_count,
        p.is_premium,
        p.is_verified,
        p.city_id,
        ts_rank(
          COALESCE(p.search_vector, to_tsvector('english', COALESCE(p.name, '') || ' ' || COALESCE(p.description, ''))),
          plainto_tsquery('english', ${query})
        ) as rank,
        similarity(p.name, ${query}) as name_sim
      FROM places p
      WHERE (
        p.search_vector @@ plainto_tsquery('english', ${query})
        OR p.name ILIKE ${'%' + query + '%'}
        OR p.description ILIKE ${'%' + query + '%'}
        OR p.address ILIKE ${'%' + query + '%'}
      )
      ${resolvedCityId ? sql`AND p.city_id = ${resolvedCityId}` : sql``}
      ${categoryPlaceIds ? sql`AND p.id = ANY(${categoryPlaceIds})` : sql``}
      ORDER BY
        ${premiumFirst ? sql`p.is_premium DESC,` : sql``}
        ${sortBy === "relevance" ? sql`rank DESC, name_sim DESC,` : sql``}
        ${sortBy === "rating" ? sql`p.avg_rating DESC NULLS LAST,` : sql``}
        ${sortBy === "name" ? sql`p.name ASC,` : sql``}
        ${sortBy === "newest" ? sql`p.created_at DESC,` : sql``}
        p.review_count DESC
      LIMIT ${limit + 1}
      OFFSET ${offset}
    `);

    const placeIds = (searchResults.rows as Array<{ id: number }>).map((r) => r.id);

    if (placeIds.length === 0) {
      return { places: [], total: 0, hasMore: false };
    }

    // Fetch full place data with relations
    results = await db.query.places.findMany({
      where: (places, { inArray }) => inArray(places.id, placeIds.slice(0, limit)),
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

    // Sort results to match the search ranking
    results.sort((a, b) => placeIds.indexOf(a.id) - placeIds.indexOf(b.id));
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
  const transformedResults = finalResults.map((place) => ({
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
    city: place.city
      ? {
          id: place.city.id,
          slug: place.city.slug,
          name: place.city.name,
          country: place.city.country
            ? {
                slug: place.city.country.slug,
                name: place.city.country.name,
              }
            : null,
        }
      : null,
    categories: place.placeCategories.map((pc) => ({
      slug: pc.category.slug,
      labelKey: pc.category.labelKey,
      icon: pc.category.icon,
    })),
  }));

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
    places: placeResults.map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      cityName: p.city?.name || "",
    })),
    cities: cityResults.map((c) => ({
      id: c.id,
      slug: c.slug,
      name: c.name,
      countrySlug: c.country?.slug || "",
    })),
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
