import { eq, and, or, ilike, desc, asc, sql } from "drizzle-orm";
import { db } from "../index";
import { places, cities, categories, placeCategories, countries, businesses, subscriptionPlans } from "../schema";
import type { PlanKey } from "@/lib/plans/config";

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
  premiumFirst?: boolean; // @deprecated - use planPriorityFirst instead
  planPriorityFirst?: boolean; // Sort by plan priority rank (PRO > STARTER > FREE)
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
    // Plan info (from linked business, if any)
    planKey: PlanKey | null;
    planPriorityRank: number; // 1=FREE, 2=STARTER, 3=PRO, 4=ELITE
    hasFeaturedStyling: boolean;
    planBadge: { text: string; color: string } | null;
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
 * Sorts by plan priority (PRO > STARTER > FREE) when planPriorityFirst is true
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
    premiumFirst = true, // @deprecated
    planPriorityFirst = true, // Default to sorting by plan priority
  } = options;

  // Build conditions array
  const conditions: ReturnType<typeof eq>[] = [];

  // Filter by city if provided
  let resolvedCityId = cityId;
  let resolvedCityName: string | null = null; // Store city name for address validation

  // If cityId is provided directly, fetch the city name for address validation
  if (resolvedCityId && !citySlug) {
    const cityById = await db.query.cities.findFirst({
      where: eq(cities.id, resolvedCityId),
    });
    if (cityById) {
      resolvedCityName = cityById.name;
    }
  }

  if (citySlug && !resolvedCityId) {
    // Try to find city by slug first (exact match)
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

    // If no city found by slug, try searching by name (exact, case-insensitive)
    if (!city) {
      city = await db.query.cities.findFirst({
        where: ilike(cities.name, citySlug.replace(/-/g, " ")),
        with: { country: true },
      });
    }

    // If still no city found, try partial match (starts with)
    if (!city) {
      const searchName = citySlug.replace(/-/g, " ");
      city = await db.query.cities.findFirst({
        where: ilike(cities.name, `${searchName}%`),
        with: { country: true },
      });
    }

    // If still no city found, try contains match
    if (!city) {
      const searchName = citySlug.replace(/-/g, " ");
      city = await db.query.cities.findFirst({
        where: ilike(cities.name, `%${searchName}%`),
        with: { country: true },
      });
    }

    if (city) {
      resolvedCityId = city.id;
      resolvedCityName = city.name; // Store for address validation
    }
  }

  // If citySlug was provided but no city found, and there's no text query,
  // return empty results instead of searching all cities
  const cityNotFound = citySlug && !resolvedCityId;

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

  // If city was specified but not found, return empty results
  // (User searched for a city that doesn't exist in our database)
  if (cityNotFound) {
    return { places: [], total: 0, hasMore: false };
  }

  // Build the search query
  let results;

  // Common query config with business and plan relations
  const withRelations = {
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
    business: {
      with: {
        subscriptionPlan: true,
      },
    },
  } as const;

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
        if (premiumFirst || planPriorityFirst) {
          orders.push(desc(places.isPremium));
        }
        if (sortBy === "rating" || sortBy === "relevance") {
          orders.push(desc(places.avgRating));
        } else if (sortBy === "name") {
          orders.push(asc(places.name));
        } else if (sortBy === "newest") {
          orders.push(desc(places.createdAt));
        } else {
          orders.push(desc(places.avgRating));
        }
        orders.push(desc(places.reviewCount));
        return orders;
      },
      limit: limit + 1,
      offset,
      with: withRelations,
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
        if (premiumFirst || planPriorityFirst) {
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
        orders.push(desc(places.reviewCount));
        return orders;
      },
      limit: limit + 1,
      offset,
      with: withRelations,
    });
  }

  // Re-sort by plan priority if enabled, but respect user's sortBy as secondary sort
  if (planPriorityFirst && results.length > 0) {
    results.sort((a, b) => {
      const aBusiness = getRelation(a.business);
      const bBusiness = getRelation(b.business);
      const aPlan = aBusiness ? getRelation(aBusiness.subscriptionPlan) : null;
      const bPlan = bBusiness ? getRelation(bBusiness.subscriptionPlan) : null;
      const aPriority = aPlan?.priorityRank ?? 1; // Default to FREE (1) if no plan
      const bPriority = bPlan?.priorityRank ?? 1;

      // First compare by plan priority
      if (bPriority !== aPriority) {
        return bPriority - aPriority; // Higher priority first
      }

      // Then apply secondary sort based on user's sortBy preference
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "newest") {
        const aDate = a.createdAt?.getTime() ?? 0;
        const bDate = b.createdAt?.getTime() ?? 0;
        return bDate - aDate;
      } else {
        // Default: rating (for both "rating" and "relevance")
        const aRating = parseFloat(a.avgRating ?? "0");
        const bRating = parseFloat(b.avgRating ?? "0");
        if (bRating !== aRating) return bRating - aRating;
        return b.reviewCount - a.reviewCount;
      }
    });
  }

  // Filter out places that don't actually match the city (data quality fix)
  // Some places have wrong cityId because they were discovered via broad Google searches
  // We filter by checking if the city name appears in the address or if another city is mentioned
  if (resolvedCityName && resolvedCityId) {
    const cityNameLower = resolvedCityName.toLowerCase();

    // Common Dutch/Belgian city names that might appear in addresses
    // This helps detect when a place is actually in a different city
    const otherCityIndicators = [
      "uitgeest", "vreeland", "aalsmeer", "amstelveen", "diemen", "weesp",
      "zaandam", "purmerend", "haarlem", "hilversum", "almere", "hoofddorp",
      "schiphol", "abcoude", "bussum", "naarden", "muiden", "landsmeer",
      "brussel", "bruxelles", "antwerpen", "gent", "brugge", "leuven",
      "mechelen", "hasselt", "luik", "liège", "charleroi", "namur",
      "laarne", "haaltert", "temse", "dilbeek", "zaventem", "grimbergen"
    ];

    results = results.filter((place) => {
      const addressLower = (place.address || "").toLowerCase();

      // Check if the city name appears in the address - strong positive signal
      if (addressLower && addressLower.includes(cityNameLower)) return true;

      // Check if another city name appears in the address - strong negative signal
      // This catches places like "5+ jaar actief ⋅ Uitgeest" in the address field
      for (const otherCity of otherCityIndicators) {
        if (otherCity !== cityNameLower && addressLower.includes(otherCity)) {
          return false; // Place is in a different city
        }
      }

      // If no address but place has specific city in its metadata, trust it
      const cityRel = getRelation(place.city);
      if (cityRel?.name?.toLowerCase() === cityNameLower) return true;

      // For places with no address and no matching city relation,
      // only include if we have no indication it's elsewhere
      return !addressLower;
    });
  }

  // Check if there are more results
  const hasMore = results.length > limit;
  const finalResults = results.slice(0, limit);

  // Get total count for display (separate count query for accuracy)
  let totalCount = finalResults.length;
  try {
    if (query && query.trim()) {
      const searchTerm = `%${query.trim()}%`;
      const countResult = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(places)
        .where(
          and(
            or(
              ilike(places.name, searchTerm),
              ilike(places.description, searchTerm),
              ilike(places.address, searchTerm)
            ),
            resolvedCityId ? eq(places.cityId, resolvedCityId) : undefined,
            categoryPlaceIds ? sql`${places.id} = ANY(${categoryPlaceIds})` : undefined
          )
        );
      totalCount = countResult[0]?.count ?? finalResults.length;
    } else {
      const countResult = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(places)
        .where(
          and(
            resolvedCityId ? eq(places.cityId, resolvedCityId) : undefined,
            categoryPlaceIds ? sql`${places.id} = ANY(${categoryPlaceIds})` : undefined
          )
        );
      totalCount = countResult[0]?.count ?? finalResults.length;
    }
  } catch {
    // Fallback to results length if count query fails
    totalCount = hasMore ? offset + limit + 1 : offset + finalResults.length;
  }

  // Transform results
  const transformedResults = finalResults.map((place) => {
    const cityRel = getRelation(place.city);
    const countryRel = cityRel ? getRelation(cityRel.country) : null;
    const businessRel = getRelation(place.business);
    const planRel = businessRel ? getRelation(businessRel.subscriptionPlan) : null;

    // Get plan info with defaults for unclaimed places (FREE tier)
    const planKey = (businessRel?.planKey as PlanKey) ?? null;
    const planPriorityRank = planRel?.priorityRank ?? 1; // FREE = 1
    const hasFeaturedStyling = planRel?.hasFeaturedStyling ?? false;
    const planBadge = planRel?.showPlanBadge && planRel?.badgeText
      ? { text: planRel.badgeText, color: planRel.badgeColor ?? "gray" }
      : null;

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
      // Plan info
      planKey,
      planPriorityRank,
      hasFeaturedStyling,
      planBadge,
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
    total: totalCount,
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
