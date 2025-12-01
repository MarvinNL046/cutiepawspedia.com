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
  return db.query.categories.findMany({
    orderBy: (categories, { asc }) => [asc(categories.labelKey)],
  });
}

/**
 * Get a category by slug
 */
export async function getCategoryBySlug(slug: string) {
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
 */
export async function getPlaceBySlugAndCity(placeSlug: string, cityId: number) {
  return db.query.places.findFirst({
    where: and(eq(places.slug, placeSlug), eq(places.cityId, cityId)),
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
      reviews: {
        orderBy: [desc(reviews.createdAt)],
        limit: 10,
        with: {
          user: true,
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
// REVIEWS
// ============================================================================

/**
 * Get reviews for a place
 */
export async function getReviewsByPlaceId(placeId: number, limit = 20, offset = 0) {
  return db.query.reviews.findMany({
    where: eq(reviews.placeId, placeId),
    orderBy: (reviews, { desc }) => [desc(reviews.createdAt)],
    limit,
    offset,
    with: {
      user: true,
    },
  });
}

// ============================================================================
// TYPES
// ============================================================================

export type Category = Awaited<ReturnType<typeof getCategoryBySlug>>;
export type Place = Awaited<ReturnType<typeof getPlaceBySlug>>;
export type PlaceList = Awaited<ReturnType<typeof getPlacesByCityAndCategory>>;
