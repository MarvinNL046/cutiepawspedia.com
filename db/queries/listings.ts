import { eq, and, desc } from "drizzle-orm";
import { db } from "../index";
import { places, categories, placeCategories, reviews } from "../schema";
import { getCityBySlugAndCountry } from "./locations";

// ============================================================================
// CATEGORIES
// ============================================================================

/**
 * Get all categories
 */
export async function getCategories() {
  if (!db) return [];
  return db.query.categories.findMany({
    orderBy: (categories, { asc }) => [asc(categories.labelKey)],
  });
}

/**
 * Get a category by slug
 */
export async function getCategoryBySlug(slug: string) {
  if (!db) return null;
  return db.query.categories.findFirst({
    where: eq(categories.slug, slug),
  });
}

// ============================================================================
// PLACES
// ============================================================================

/**
 * Get places by city and category
 */
export async function getPlacesByCityAndCategory(
  cityId: number,
  categoryId: number,
  options?: {
    limit?: number;
    offset?: number;
    premiumFirst?: boolean;
  }
) {
  if (!db) return [];
  const { limit = 20, offset = 0, premiumFirst = true } = options ?? {};

  // Get place IDs that have the specified category
  const placeCategoryResults = await db
    .select({ placeId: placeCategories.placeId })
    .from(placeCategories)
    .where(eq(placeCategories.categoryId, categoryId));

  const placeIds = placeCategoryResults.map((pc) => pc.placeId);
  if (placeIds.length === 0) return [];

  return db.query.places.findMany({
    where: (places, { and, eq, inArray }) =>
      and(eq(places.cityId, cityId), inArray(places.id, placeIds)),
    orderBy: premiumFirst
      ? (places, { desc, asc }) => [desc(places.isPremium), desc(places.avgRating), asc(places.name)]
      : (places, { desc, asc }) => [desc(places.avgRating), asc(places.name)],
    limit,
    offset,
    with: {
      placeCategories: {
        with: {
          category: true,
        },
      },
    },
  });
}

/**
 * Get places by city slug and category slug
 */
export async function getPlacesByCitySlugAndCategorySlug(
  citySlug: string,
  countrySlug: string,
  categorySlug: string,
  options?: { limit?: number; offset?: number; premiumFirst?: boolean }
) {
  const city = await getCityBySlugAndCountry(citySlug, countrySlug);
  if (!city) return [];

  const category = await getCategoryBySlug(categorySlug);
  if (!category) return [];

  return getPlacesByCityAndCategory(city.id, category.id, options);
}

/**
 * Get a place by its slug within a specific city
 * Includes business and plan info for feature gating
 */
export async function getPlaceBySlugAndCity(placeSlug: string, cityId: number) {
  if (!db) return null;
  return db.query.places.findFirst({
    where: and(eq(places.slug, placeSlug), eq(places.cityId, cityId)),
    with: {
      city: {
        with: {
          country: true,
          province: true,
        },
      },
      placeCategories: {
        with: {
          category: true,
        },
      },
      reviews: {
        orderBy: [desc(reviews.createdAt)],
        limit: 10,
        with: {
          user: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
      },
      // Include business with plan for feature gating
      business: {
        with: {
          subscriptionPlan: true,
        },
      },
    },
  });
}

/**
 * Get a place by slug with full location context
 */
export async function getPlaceBySlug(
  placeSlug: string,
  citySlug: string,
  countrySlug: string
) {
  const city = await getCityBySlugAndCountry(citySlug, countrySlug);
  if (!city) return null;

  return getPlaceBySlugAndCity(placeSlug, city.id);
}

/**
 * Get featured/premium places for a city
 */
export async function getFeaturedPlacesByCity(cityId: number, limit = 6) {
  if (!db) return [];
  return db.query.places.findMany({
    where: and(eq(places.cityId, cityId), eq(places.isPremium, true)),
    orderBy: (places, { desc }) => [desc(places.avgRating)],
    limit,
    with: {
      placeCategories: {
        with: {
          category: true,
        },
      },
    },
  });
}

/**
 * Get top-rated places for a city
 */
export async function getTopRatedPlacesByCity(cityId: number, limit = 10) {
  if (!db) return [];
  return db.query.places.findMany({
    where: eq(places.cityId, cityId),
    orderBy: (places, { desc }) => [desc(places.avgRating), desc(places.reviewCount)],
    limit,
    with: {
      placeCategories: {
        with: {
          category: true,
        },
      },
    },
  });
}

// ============================================================================
// COUNTRY-LEVEL CATEGORY QUERIES (for SEO expansion C2)
// ============================================================================

/**
 * Get places in a country for a specific category
 */
export async function getPlacesByCountrySlugAndCategorySlug(
  countrySlug: string,
  categorySlug: string,
  options?: {
    limit?: number;
    offset?: number;
    premiumFirst?: boolean;
    topRated?: boolean;
    sortBy?: "rating" | "name" | "newest" | "reviews";
  }
) {
  if (!db) return [];
  const { limit = 50, offset = 0, premiumFirst = true, topRated = false, sortBy } = options ?? {};

  // Get country
  const country = await db.query.countries.findFirst({
    where: (countries, { eq }) => eq(countries.slug, countrySlug),
  });
  if (!country) return [];

  // Get cities in this country
  const countryCities = await db.query.cities.findMany({
    where: (cities, { eq }) => eq(cities.countryId, country.id),
    columns: { id: true },
  });
  const cityIds = countryCities.map(c => c.id);
  if (cityIds.length === 0) return [];

  // Get category
  const category = await getCategoryBySlug(categorySlug);
  if (!category) return [];

  // Get place IDs that have the specified category
  const placeCategoryResults = await db
    .select({ placeId: placeCategories.placeId })
    .from(placeCategories)
    .where(eq(placeCategories.categoryId, category.id));

  const placeIds = placeCategoryResults.map((pc) => pc.placeId);
  if (placeIds.length === 0) return [];

  // Build orderBy based on sortBy parameter
  const getOrderBy = (places: Parameters<Parameters<typeof db.query.places.findMany>[0]["orderBy"]>[0], { desc, asc }: Parameters<Parameters<typeof db.query.places.findMany>[0]["orderBy"]>[1]) => {
    const orders = [];

    // Premium/featured items first (if enabled)
    if (premiumFirst && !topRated) {
      orders.push(desc(places.isPremium));
    }

    // Apply user's sort preference
    if (sortBy === "name") {
      orders.push(asc(places.name));
    } else if (sortBy === "newest") {
      orders.push(desc(places.createdAt));
    } else if (sortBy === "reviews") {
      orders.push(desc(places.reviewCount));
      orders.push(desc(places.avgRating));
    } else {
      // Default: rating (for both "rating" and undefined)
      orders.push(desc(places.avgRating));
      orders.push(desc(places.reviewCount));
    }

    // Always add name as final tiebreaker
    if (sortBy !== "name") {
      orders.push(asc(places.name));
    }

    return orders;
  };

  return db.query.places.findMany({
    where: (places, { and, inArray }) =>
      and(inArray(places.cityId, cityIds), inArray(places.id, placeIds)),
    orderBy: getOrderBy,
    limit,
    offset,
    with: {
      city: { with: { country: true } },
      placeCategories: { with: { category: true } },
    },
  });
}

/**
 * Get top-rated places in a country for a specific category
 */
export async function getTopPlacesByCountrySlugAndCategorySlug(
  countrySlug: string,
  categorySlug: string,
  limit = 10
) {
  return getPlacesByCountrySlugAndCategorySlug(countrySlug, categorySlug, {
    limit,
    topRated: true,
    premiumFirst: false,
  });
}

// ============================================================================
// PROVINCE-LEVEL CATEGORY QUERIES
// ============================================================================

/**
 * Get places in a province for a specific category
 */
export async function getPlacesByProvinceSlugAndCategorySlug(
  provinceSlug: string,
  countrySlug: string,
  categorySlug: string,
  options?: {
    limit?: number;
    offset?: number;
    premiumFirst?: boolean;
    topRated?: boolean;
  }
) {
  if (!db) return [];
  const { limit = 50, offset = 0, premiumFirst = true, topRated = false } = options ?? {};

  // Get country
  const country = await db.query.countries.findFirst({
    where: (countries, { eq }) => eq(countries.slug, countrySlug),
  });
  if (!country) return [];

  // Get province
  const province = await db.query.provinces.findFirst({
    where: (provinces, { and, eq }) =>
      and(eq(provinces.slug, provinceSlug), eq(provinces.countryId, country.id)),
  });
  if (!province) return [];

  // Get cities in this province
  const provinceCities = await db.query.cities.findMany({
    where: (cities, { eq }) => eq(cities.provinceId, province.id),
    columns: { id: true },
  });
  const cityIds = provinceCities.map(c => c.id);
  if (cityIds.length === 0) return [];

  // Get category
  const category = await getCategoryBySlug(categorySlug);
  if (!category) return [];

  // Get place IDs that have the specified category
  const placeCategoryResults = await db
    .select({ placeId: placeCategories.placeId })
    .from(placeCategories)
    .where(eq(placeCategories.categoryId, category.id));

  const placeIds = placeCategoryResults.map((pc) => pc.placeId);
  if (placeIds.length === 0) return [];

  // Return with appropriate ordering
  if (topRated) {
    return db.query.places.findMany({
      where: (places, { and, inArray }) =>
        and(inArray(places.cityId, cityIds), inArray(places.id, placeIds)),
      orderBy: (places, { desc }) => [desc(places.avgRating), desc(places.reviewCount)],
      limit,
      offset,
      with: {
        city: { with: { country: true, province: true } },
        placeCategories: { with: { category: true } },
      },
    });
  }

  if (premiumFirst) {
    return db.query.places.findMany({
      where: (places, { and, inArray }) =>
        and(inArray(places.cityId, cityIds), inArray(places.id, placeIds)),
      orderBy: (places, { desc, asc }) => [desc(places.isPremium), desc(places.avgRating), asc(places.name)],
      limit,
      offset,
      with: {
        city: { with: { country: true, province: true } },
        placeCategories: { with: { category: true } },
      },
    });
  }

  return db.query.places.findMany({
    where: (places, { and, inArray }) =>
      and(inArray(places.cityId, cityIds), inArray(places.id, placeIds)),
    orderBy: (places, { desc, asc }) => [desc(places.avgRating), asc(places.name)],
    limit,
    offset,
    with: {
      city: { with: { country: true, province: true } },
      placeCategories: { with: { category: true } },
    },
  });
}

/**
 * Get top-rated places in a city for a specific category
 */
export async function getTopPlacesByCitySlugAndCategorySlug(
  citySlug: string,
  countrySlug: string,
  categorySlug: string,
  limit = 10
) {
  const city = await getCityBySlugAndCountry(citySlug, countrySlug);
  if (!city) return [];

  const category = await getCategoryBySlug(categorySlug);
  if (!category) return [];

  // Get place IDs that have the specified category
  const placeCategoryResults = await db!
    .select({ placeId: placeCategories.placeId })
    .from(placeCategories)
    .where(eq(placeCategories.categoryId, category.id));

  const placeIds = placeCategoryResults.map((pc) => pc.placeId);
  if (placeIds.length === 0) return [];

  return db!.query.places.findMany({
    where: (places, { and, eq, inArray }) =>
      and(eq(places.cityId, city.id), inArray(places.id, placeIds)),
    orderBy: (places, { desc }) => [desc(places.avgRating), desc(places.reviewCount)],
    limit,
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

// ============================================================================
// POPULAR PLACES (HOMEPAGE)
// ============================================================================

/**
 * Get most popular places across all locations
 * Ordered by review count (most reviews first), then by rating
 * Used for "Popular Places" section on homepage
 */
export async function getPopularPlaces(limit = 6) {
  if (!db) return [];
  return db.query.places.findMany({
    where: (places, { gt }) => gt(places.reviewCount, 0),
    orderBy: (places, { desc }) => [desc(places.reviewCount), desc(places.avgRating)],
    limit,
    with: {
      city: {
        with: {
          country: true,
          province: true,
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

// ============================================================================
// COUNTS / STATS
// ============================================================================

/**
 * Get total place count
 */
export async function getPlaceCount() {
  if (!db) return 0;
  const result = await db.query.places.findMany({ columns: { id: true } });
  return result.length;
}

/**
 * Get place count for a city
 */
export async function getPlaceCountByCity(cityId: number) {
  if (!db) return 0;
  const result = await db.query.places.findMany({
    where: eq(places.cityId, cityId),
    columns: { id: true },
  });
  return result.length;
}

// ============================================================================
// REVIEWS
// ============================================================================

/**
 * Get reviews for a place
 */
export async function getReviewsByPlaceId(placeId: number, limit = 20, offset = 0) {
  if (!db) return [];
  return db.query.reviews.findMany({
    where: eq(reviews.placeId, placeId),
    orderBy: (reviews, { desc }) => [desc(reviews.createdAt)],
    limit,
    offset,
    with: {
      user: {
        columns: {
          id: true,
          name: true,
        },
      },
    },
  });
}

/**
 * Get a place by its ID with full details
 */
export async function getPlaceById(placeId: number) {
  if (!db) return null;
  return db.query.places.findFirst({
    where: eq(places.id, placeId),
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

// ============================================================================
// TYPES
// ============================================================================

export type Category = Awaited<ReturnType<typeof getCategoryBySlug>>;
export type Place = Awaited<ReturnType<typeof getPlaceBySlug>>;
export type PlaceList = Awaited<ReturnType<typeof getPlacesByCityAndCategory>>;
