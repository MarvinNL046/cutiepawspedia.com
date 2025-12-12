import { db } from "../index";
import { eq, desc, and, inArray, sql, gt, gte } from "drizzle-orm";
import { places, placeCategories, categories, cities, countries } from "../schema";

// ============================================================================
// AWARDS QUERIES - Get top-rated places per category per country
// ============================================================================

export interface AwardWinner {
  id: number;
  slug: string;
  name: string;
  address: string | null;
  avgRating: string | null;
  reviewCount: number;
  cityName: string;
  citySlug: string;
  countrySlug: string;
  categorySlug: string;
  categoryLabelKey: string;
  isVerified: boolean;
  isPremium: boolean;
}

export interface AwardCategory {
  categorySlug: string;
  categoryLabelKey: string;
  categoryIcon: string | null;
  countrySlug: string;
  countryName: string;
  countryCode: string;
  winners: AwardWinner[];
}

/**
 * Get the top-rated places for a specific category in a specific country
 * Returns winner + 2 runners-up (3 total)
 */
export async function getTopPlacesByCategoryAndCountry(
  categorySlug: string,
  countrySlug: string,
  limit = 3
): Promise<AwardWinner[]> {
  if (!db) return [];

  try {
    // Get country
    const country = await db.query.countries.findFirst({
      where: eq(countries.slug, countrySlug),
    });
    if (!country) return [];

    // Get category
    const category = await db.query.categories.findFirst({
      where: eq(categories.slug, categorySlug),
    });
    if (!category) return [];

    // Get cities in this country
    const countryCities = await db.query.cities.findMany({
      where: eq(cities.countryId, country.id),
      columns: { id: true },
    });
    const cityIds = countryCities.map((c) => c.id);
    if (cityIds.length === 0) return [];

    // Get place IDs that have this category
    const placeCategoryResults = await db
      .select({ placeId: placeCategories.placeId })
      .from(placeCategories)
      .where(eq(placeCategories.categoryId, category.id));

    const placeIds = placeCategoryResults.map((pc) => pc.placeId);
    if (placeIds.length === 0) return [];

    // Get top-rated places (must have at least 1 review and rating >= 3.5)
    const topPlaces = await db.query.places.findMany({
      where: (places, { and: andOp, inArray: inArrayOp, gte: gteOp, gt: gtOp }) =>
        andOp(
          inArrayOp(places.cityId, cityIds),
          inArrayOp(places.id, placeIds),
          gtOp(places.reviewCount, 0),
          gteOp(places.avgRating, "3.5")
        ),
      orderBy: (places, { desc: descOp }) => [
        descOp(places.avgRating),
        descOp(places.reviewCount),
      ],
      limit,
      with: {
        city: {
          with: {
            country: true,
          },
        },
      },
    });

    return topPlaces.map((place) => ({
      id: place.id,
      slug: place.slug,
      name: place.name,
      address: place.address,
      avgRating: place.avgRating,
      reviewCount: place.reviewCount,
      cityName: place.city.name,
      citySlug: place.city.slug,
      countrySlug: place.city.country.slug,
      categorySlug: categorySlug,
      categoryLabelKey: category.labelKey,
      isVerified: place.isVerified,
      isPremium: place.isPremium,
    }));
  } catch (error) {
    console.error("Failed to get top places for awards:", error);
    return [];
  }
}

/**
 * Get all award categories with winners for a specific country and year
 */
export async function getAwardsForCountry(
  countrySlug: string,
  year: number
): Promise<AwardCategory[]> {
  if (!db) return [];

  const awardCategorySlugs = [
    "veterinary",
    "grooming",
    "pet-shop",
    "dog-training",
    "pet-hotel",
    "dog-walking",
  ];

  try {
    // Get country info
    const country = await db.query.countries.findFirst({
      where: eq(countries.slug, countrySlug),
    });
    if (!country) return [];

    const results: AwardCategory[] = [];

    for (const categorySlug of awardCategorySlugs) {
      const category = await db.query.categories.findFirst({
        where: eq(categories.slug, categorySlug),
      });
      if (!category) continue;

      const winners = await getTopPlacesByCategoryAndCountry(
        categorySlug,
        countrySlug,
        3
      );

      // Only include category if it has at least one winner
      if (winners.length > 0) {
        results.push({
          categorySlug,
          categoryLabelKey: category.labelKey,
          categoryIcon: category.icon,
          countrySlug: country.slug,
          countryName: country.name,
          countryCode: country.code,
          winners,
        });
      }
    }

    return results;
  } catch (error) {
    console.error("Failed to get awards for country:", error);
    return [];
  }
}

/**
 * Get all awards data for all supported countries
 */
export async function getAllAwardsData(year: number): Promise<{
  byCountry: Record<string, AwardCategory[]>;
  newcomerOfYear: AwardWinner | null;
  peoplesChoice: AwardWinner | null;
}> {
  if (!db) return { byCountry: {}, newcomerOfYear: null, peoplesChoice: null };

  const supportedCountries = ["nederland", "belgie", "duitsland"];

  try {
    const byCountry: Record<string, AwardCategory[]> = {};

    for (const countrySlug of supportedCountries) {
      const awards = await getAwardsForCountry(countrySlug, year);
      if (awards.length > 0) {
        byCountry[countrySlug] = awards;
      }
    }

    // Get Newcomer of the Year (place created this year with best rating)
    const startOfYear = new Date(year, 0, 1);
    const newcomers = await db.query.places.findMany({
      where: (places, { and: andOp, gte: gteOp, gt: gtOp }) =>
        andOp(
          gteOp(places.createdAt, startOfYear),
          gtOp(places.reviewCount, 0),
          gteOp(places.avgRating, "4.0")
        ),
      orderBy: (places, { desc: descOp }) => [
        descOp(places.avgRating),
        descOp(places.reviewCount),
      ],
      limit: 1,
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

    const newcomerOfYear = newcomers[0]
      ? {
          id: newcomers[0].id,
          slug: newcomers[0].slug,
          name: newcomers[0].name,
          address: newcomers[0].address,
          avgRating: newcomers[0].avgRating,
          reviewCount: newcomers[0].reviewCount,
          cityName: newcomers[0].city.name,
          citySlug: newcomers[0].city.slug,
          countrySlug: newcomers[0].city.country.slug,
          categorySlug: newcomers[0].placeCategories[0]?.category?.slug || "",
          categoryLabelKey:
            newcomers[0].placeCategories[0]?.category?.labelKey || "",
          isVerified: newcomers[0].isVerified,
          isPremium: newcomers[0].isPremium,
        }
      : null;

    // Get People's Choice (highest rated overall with most reviews)
    const peoplesChoiceResults = await db.query.places.findMany({
      where: (places, { and: andOp, gte: gteOp }) =>
        andOp(gteOp(places.reviewCount, 5), gteOp(places.avgRating, "4.5")),
      orderBy: (places, { desc: descOp }) => [
        descOp(places.reviewCount),
        descOp(places.avgRating),
      ],
      limit: 1,
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

    const peoplesChoice = peoplesChoiceResults[0]
      ? {
          id: peoplesChoiceResults[0].id,
          slug: peoplesChoiceResults[0].slug,
          name: peoplesChoiceResults[0].name,
          address: peoplesChoiceResults[0].address,
          avgRating: peoplesChoiceResults[0].avgRating,
          reviewCount: peoplesChoiceResults[0].reviewCount,
          cityName: peoplesChoiceResults[0].city.name,
          citySlug: peoplesChoiceResults[0].city.slug,
          countrySlug: peoplesChoiceResults[0].city.country.slug,
          categorySlug:
            peoplesChoiceResults[0].placeCategories[0]?.category?.slug || "",
          categoryLabelKey:
            peoplesChoiceResults[0].placeCategories[0]?.category?.labelKey || "",
          isVerified: peoplesChoiceResults[0].isVerified,
          isPremium: peoplesChoiceResults[0].isPremium,
        }
      : null;

    return { byCountry, newcomerOfYear, peoplesChoice };
  } catch (error) {
    console.error("Failed to get all awards data:", error);
    return { byCountry: {}, newcomerOfYear: null, peoplesChoice: null };
  }
}

/**
 * Get all supported countries for awards
 */
export async function getAwardCountries(): Promise<
  Array<{ slug: string; name: string; code: string }>
> {
  if (!db) return [];

  try {
    const supportedSlugs = ["nederland", "belgie", "duitsland"];
    const result = await db.query.countries.findMany({
      where: inArray(countries.slug, supportedSlugs),
    });
    return result.map((c) => ({ slug: c.slug, name: c.name, code: c.code }));
  } catch (error) {
    console.error("Failed to get award countries:", error);
    return [];
  }
}
