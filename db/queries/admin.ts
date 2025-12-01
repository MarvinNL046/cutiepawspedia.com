import { sql, eq, desc, count, gte, and } from "drizzle-orm";
import { db } from "../index";
import {
  countries,
  cities,
  categories,
  places,
  users,
  leads,
  reviews,
} from "../schema";

// ============================================================================
// ADMIN STATISTICS
// ============================================================================

export type AdminStats = {
  countries: number;
  cities: number;
  categories: number;
  places: {
    total: number;
    premium: number;
    verified: number;
    pendingReview: number;
  };
  businesses: {
    total: number;
    active: number;
  };
  leads: {
    total: number;
    last7Days: number;
    last30Days: number;
  };
  reviews: {
    total: number;
  };
};

/**
 * Get comprehensive admin statistics
 */
export async function getAdminStats(): Promise<AdminStats> {
  if (!db) {
    return {
      countries: 0,
      cities: 0,
      categories: 0,
      places: { total: 0, premium: 0, verified: 0, pendingReview: 0 },
      businesses: { total: 0, active: 0 },
      leads: { total: 0, last7Days: 0, last30Days: 0 },
      reviews: { total: 0 },
    };
  }

  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // Run all counts in parallel
  const [
    countriesCount,
    citiesCount,
    categoriesCount,
    placesTotal,
    placesPremium,
    placesVerified,
    placesUnverified,
    businessesTotal,
    businessesWithPlaces,
    leadsTotal,
    leadsLast7Days,
    leadsLast30Days,
    reviewsTotal,
  ] = await Promise.all([
    // Countries count
    db.select({ value: count() }).from(countries),
    // Cities count
    db.select({ value: count() }).from(cities),
    // Categories count
    db.select({ value: count() }).from(categories),
    // Places total
    db.select({ value: count() }).from(places),
    // Places premium
    db.select({ value: count() }).from(places).where(eq(places.isPremium, true)),
    // Places verified
    db.select({ value: count() }).from(places).where(eq(places.isVerified, true)),
    // Places unverified (pending review)
    db.select({ value: count() }).from(places).where(eq(places.isVerified, false)),
    // Business users total
    db.select({ value: count() }).from(users).where(eq(users.role, "business")),
    // Business users with at least one place (active)
    db.selectDistinct({ ownerId: places.ownerId }).from(places).where(sql`${places.ownerId} IS NOT NULL`),
    // Leads total
    db.select({ value: count() }).from(leads),
    // Leads last 7 days
    db.select({ value: count() }).from(leads).where(gte(leads.createdAt, sevenDaysAgo)),
    // Leads last 30 days
    db.select({ value: count() }).from(leads).where(gte(leads.createdAt, thirtyDaysAgo)),
    // Reviews total
    db.select({ value: count() }).from(reviews),
  ]);

  return {
    countries: countriesCount[0]?.value ?? 0,
    cities: citiesCount[0]?.value ?? 0,
    categories: categoriesCount[0]?.value ?? 0,
    places: {
      total: placesTotal[0]?.value ?? 0,
      premium: placesPremium[0]?.value ?? 0,
      verified: placesVerified[0]?.value ?? 0,
      pendingReview: placesUnverified[0]?.value ?? 0,
    },
    businesses: {
      total: businessesTotal[0]?.value ?? 0,
      active: businessesWithPlaces.length,
    },
    leads: {
      total: leadsTotal[0]?.value ?? 0,
      last7Days: leadsLast7Days[0]?.value ?? 0,
      last30Days: leadsLast30Days[0]?.value ?? 0,
    },
    reviews: {
      total: reviewsTotal[0]?.value ?? 0,
    },
  };
}

// ============================================================================
// LATEST ACTIVITY
// ============================================================================

export type LatestPlace = {
  id: number;
  name: string;
  slug: string;
  cityName: string | null;
  isVerified: boolean;
  isPremium: boolean;
  createdAt: Date;
};

/**
 * Get latest places created
 */
export async function getLatestPlaces(limit: number = 10): Promise<LatestPlace[]> {
  if (!db) return [];

  const result = await db
    .select({
      id: places.id,
      name: places.name,
      slug: places.slug,
      cityName: cities.name,
      isVerified: places.isVerified,
      isPremium: places.isPremium,
      createdAt: places.createdAt,
    })
    .from(places)
    .leftJoin(cities, eq(places.cityId, cities.id))
    .orderBy(desc(places.createdAt))
    .limit(limit);

  return result;
}

export type LatestLead = {
  id: number;
  name: string;
  email: string;
  placeName: string | null;
  source: string | null;
  createdAt: Date;
};

/**
 * Get latest leads received
 */
export async function getLatestLeads(limit: number = 10): Promise<LatestLead[]> {
  if (!db) return [];

  const result = await db
    .select({
      id: leads.id,
      name: leads.name,
      email: leads.email,
      placeName: places.name,
      source: leads.source,
      createdAt: leads.createdAt,
    })
    .from(leads)
    .leftJoin(places, eq(leads.placeId, places.id))
    .orderBy(desc(leads.createdAt))
    .limit(limit);

  return result;
}

export type LatestBusiness = {
  id: number;
  email: string;
  name: string | null;
  placesCount: number;
  createdAt: Date;
};

/**
 * Get latest business accounts created
 */
export async function getLatestBusinesses(limit: number = 10): Promise<LatestBusiness[]> {
  if (!db) return [];

  const database = db; // Store reference for use in closure

  // Get business users with their places count
  const result = await database
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.role, "business"))
    .orderBy(desc(users.createdAt))
    .limit(limit);

  // Get places count for each user
  const businessesWithCounts = await Promise.all(
    result.map(async (user) => {
      const placesCount = await database
        .select({ value: count() })
        .from(places)
        .where(eq(places.ownerId, user.id));

      return {
        ...user,
        placesCount: placesCount[0]?.value ?? 0,
      };
    })
  );

  return businessesWithCounts;
}

// ============================================================================
// CONTENT MANAGEMENT QUERIES
// ============================================================================

/**
 * Get all countries with city counts
 */
export async function getCountriesWithStats() {
  if (!db) return [];

  const result = await db
    .select({
      id: countries.id,
      slug: countries.slug,
      code: countries.code,
      name: countries.name,
      cityCount: count(cities.id),
    })
    .from(countries)
    .leftJoin(cities, eq(countries.id, cities.countryId))
    .groupBy(countries.id)
    .orderBy(countries.name);

  return result;
}

/**
 * Get all cities with place counts
 */
export async function getCitiesWithStats(countryId?: number) {
  if (!db) return [];

  const baseQuery = db
    .select({
      id: cities.id,
      slug: cities.slug,
      name: cities.name,
      countryId: cities.countryId,
      countryName: countries.name,
      placeCount: count(places.id),
    })
    .from(cities)
    .leftJoin(countries, eq(cities.countryId, countries.id))
    .leftJoin(places, eq(cities.id, places.cityId))
    .groupBy(cities.id, countries.name)
    .orderBy(cities.name);

  if (countryId) {
    return baseQuery.where(eq(cities.countryId, countryId));
  }

  return baseQuery;
}

/**
 * Get all businesses with their stats
 */
export async function getBusinessesWithStats() {
  if (!db) return [];

  const database = db; // Store reference for use in closure

  const businessUsers = await database
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.role, "business"))
    .orderBy(desc(users.createdAt));

  // Get stats for each business
  const withStats = await Promise.all(
    businessUsers.map(async (user) => {
      const [placesResult, leadsResult] = await Promise.all([
        database.select({ value: count() }).from(places).where(eq(places.ownerId, user.id)),
        database
          .select({ value: count() })
          .from(leads)
          .innerJoin(places, eq(leads.placeId, places.id))
          .where(eq(places.ownerId, user.id)),
      ]);

      return {
        ...user,
        placesCount: placesResult[0]?.value ?? 0,
        leadsCount: leadsResult[0]?.value ?? 0,
      };
    })
  );

  return withStats;
}

/**
 * Get all leads with full details (platform-wide) - Admin version
 */
export async function getAdminLeads(options: {
  limit?: number;
  offset?: number;
  startDate?: Date;
  endDate?: Date;
} = {}) {
  if (!db) return { leads: [], total: 0 };

  const { limit = 50, offset = 0, startDate, endDate } = options;

  // Build conditions
  const conditions = [];
  if (startDate) {
    conditions.push(gte(leads.createdAt, startDate));
  }
  if (endDate) {
    conditions.push(sql`${leads.createdAt} <= ${endDate}`);
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  // Get total count
  const totalResult = await db
    .select({ value: count() })
    .from(leads)
    .where(whereClause);

  // Get leads with place and city info
  const leadsResult = await db
    .select({
      id: leads.id,
      name: leads.name,
      email: leads.email,
      phone: leads.phone,
      message: leads.message,
      source: leads.source,
      createdAt: leads.createdAt,
      placeName: places.name,
      placeSlug: places.slug,
      cityName: cities.name,
      countryName: countries.name,
    })
    .from(leads)
    .leftJoin(places, eq(leads.placeId, places.id))
    .leftJoin(cities, eq(places.cityId, cities.id))
    .leftJoin(countries, eq(cities.countryId, countries.id))
    .where(whereClause)
    .orderBy(desc(leads.createdAt))
    .limit(limit)
    .offset(offset);

  return {
    leads: leadsResult,
    total: totalResult[0]?.value ?? 0,
  };
}

// ============================================================================
// COUNTRY CRUD
// ============================================================================

export async function getCountryById(id: number) {
  if (!db) return null;
  return db.query.countries.findFirst({
    where: eq(countries.id, id),
  });
}

export async function createCountry(data: { name: string; code: string; slug: string }) {
  if (!db) throw new Error("Database not available");
  const [result] = await db.insert(countries).values(data).returning();
  return result;
}

export async function updateCountry(id: number, data: Partial<{ name: string; code: string; slug: string }>) {
  if (!db) throw new Error("Database not available");
  const [result] = await db
    .update(countries)
    .set(data)
    .where(eq(countries.id, id))
    .returning();
  return result;
}

export async function deleteCountry(id: number) {
  if (!db) throw new Error("Database not available");
  await db.delete(countries).where(eq(countries.id, id));
}

// ============================================================================
// CITY CRUD
// ============================================================================

export async function getCityById(id: number) {
  if (!db) return null;
  return db.query.cities.findFirst({
    where: eq(cities.id, id),
    with: {
      country: true,
    },
  });
}

export async function createCity(data: {
  name: string;
  slug: string;
  countryId: number;
  lat?: string | null;
  lng?: string | null;
}) {
  if (!db) throw new Error("Database not available");
  const [result] = await db.insert(cities).values(data).returning();
  return result;
}

export async function updateCity(
  id: number,
  data: Partial<{ name: string; slug: string; countryId: number; lat: string | null; lng: string | null }>
) {
  if (!db) throw new Error("Database not available");
  const [result] = await db
    .update(cities)
    .set(data)
    .where(eq(cities.id, id))
    .returning();
  return result;
}

export async function deleteCity(id: number) {
  if (!db) throw new Error("Database not available");
  await db.delete(cities).where(eq(cities.id, id));
}

// ============================================================================
// CATEGORY CRUD
// ============================================================================

export async function getCategoriesWithStats() {
  if (!db) return [];

  const result = await db
    .select({
      id: categories.id,
      slug: categories.slug,
      labelKey: categories.labelKey,
      icon: categories.icon,
      placeCount: count(sql`DISTINCT ${places.id}`),
    })
    .from(categories)
    .leftJoin(
      sql`place_categories`,
      sql`place_categories.category_id = ${categories.id}`
    )
    .leftJoin(places, sql`${places.id} = place_categories.place_id`)
    .groupBy(categories.id)
    .orderBy(categories.slug);

  return result;
}

export async function getCategoryById(id: number) {
  if (!db) return null;
  return db.query.categories.findFirst({
    where: eq(categories.id, id),
  });
}

export async function createCategory(data: { slug: string; labelKey: string; icon?: string | null }) {
  if (!db) throw new Error("Database not available");
  const [result] = await db.insert(categories).values(data).returning();
  return result;
}

export async function updateCategory(
  id: number,
  data: Partial<{ slug: string; labelKey: string; icon: string | null }>
) {
  if (!db) throw new Error("Database not available");
  const [result] = await db
    .update(categories)
    .set(data)
    .where(eq(categories.id, id))
    .returning();
  return result;
}

export async function deleteCategory(id: number) {
  if (!db) throw new Error("Database not available");
  await db.delete(categories).where(eq(categories.id, id));
}

// ============================================================================
// PLACES ADMIN QUERIES
// ============================================================================

export async function getAdminPlaces(options: {
  limit?: number;
  offset?: number;
  countryId?: number;
  cityId?: number;
  categoryId?: number;
  isVerified?: boolean;
  isPremium?: boolean;
} = {}) {
  if (!db) return { places: [], total: 0 };

  const { limit = 50, offset = 0, countryId, cityId, isVerified, isPremium } = options;

  // Build conditions
  const conditions = [];
  if (cityId) {
    conditions.push(eq(places.cityId, cityId));
  }
  if (isVerified !== undefined) {
    conditions.push(eq(places.isVerified, isVerified));
  }
  if (isPremium !== undefined) {
    conditions.push(eq(places.isPremium, isPremium));
  }
  if (countryId) {
    conditions.push(eq(cities.countryId, countryId));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  // Get total count
  const totalQuery = db
    .select({ value: count() })
    .from(places)
    .leftJoin(cities, eq(places.cityId, cities.id));

  const totalResult = whereClause
    ? await totalQuery.where(whereClause)
    : await totalQuery;

  // Get places with related data
  const placesQuery = db
    .select({
      id: places.id,
      name: places.name,
      slug: places.slug,
      cityId: places.cityId,
      cityName: cities.name,
      countryName: countries.name,
      isVerified: places.isVerified,
      isPremium: places.isPremium,
      premiumUntil: places.premiumUntil,
      avgRating: places.avgRating,
      reviewCount: places.reviewCount,
      ownerId: places.ownerId,
      ownerEmail: users.email,
      createdAt: places.createdAt,
    })
    .from(places)
    .leftJoin(cities, eq(places.cityId, cities.id))
    .leftJoin(countries, eq(cities.countryId, countries.id))
    .leftJoin(users, eq(places.ownerId, users.id))
    .orderBy(desc(places.createdAt))
    .limit(limit)
    .offset(offset);

  const placesResult = whereClause
    ? await placesQuery.where(whereClause)
    : await placesQuery;

  return {
    places: placesResult,
    total: totalResult[0]?.value ?? 0,
  };
}

export async function getPlaceByIdForAdmin(id: number) {
  if (!db) return null;

  return db.query.places.findFirst({
    where: eq(places.id, id),
    with: {
      city: {
        with: {
          country: true,
        },
      },
      owner: true,
      placeCategories: {
        with: {
          category: true,
        },
      },
    },
  });
}

export async function updatePlaceAdmin(
  id: number,
  data: Partial<{
    name: string;
    slug: string;
    description: string | null;
    address: string | null;
    postalCode: string | null;
    phone: string | null;
    website: string | null;
    email: string | null;
    lat: string | null;
    lng: string | null;
    cityId: number;
    ownerId: number | null;
    isVerified: boolean;
    isPremium: boolean;
    premiumUntil: Date | null;
  }>
) {
  if (!db) throw new Error("Database not available");

  const [result] = await db
    .update(places)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(places.id, id))
    .returning();

  return result;
}

export async function togglePlaceVerified(id: number, isVerified: boolean) {
  return updatePlaceAdmin(id, { isVerified });
}

export async function togglePlacePremium(id: number, isPremium: boolean, premiumUntil?: Date | null) {
  return updatePlaceAdmin(id, { isPremium, premiumUntil });
}

// ============================================================================
// REVIEWS ADMIN QUERIES
// ============================================================================

export async function getAdminReviews(options: {
  limit?: number;
  offset?: number;
  placeId?: number;
} = {}) {
  if (!db) return { reviews: [], total: 0 };

  const { limit = 50, offset = 0, placeId } = options;

  const whereClause = placeId ? eq(reviews.placeId, placeId) : undefined;

  // Get total count
  const totalResult = await db
    .select({ value: count() })
    .from(reviews)
    .where(whereClause);

  // Get reviews with related data
  const reviewsResult = await db
    .select({
      id: reviews.id,
      rating: reviews.rating,
      comment: reviews.comment,
      createdAt: reviews.createdAt,
      placeId: reviews.placeId,
      placeName: places.name,
      userId: reviews.userId,
      userEmail: users.email,
      userName: users.name,
    })
    .from(reviews)
    .leftJoin(places, eq(reviews.placeId, places.id))
    .leftJoin(users, eq(reviews.userId, users.id))
    .where(whereClause)
    .orderBy(desc(reviews.createdAt))
    .limit(limit)
    .offset(offset);

  return {
    reviews: reviewsResult,
    total: totalResult[0]?.value ?? 0,
  };
}

export async function deleteReview(id: number) {
  if (!db) throw new Error("Database not available");
  await db.delete(reviews).where(eq(reviews.id, id));
}

// ============================================================================
// TYPES
// ============================================================================

export type CountryWithStats = Awaited<ReturnType<typeof getCountriesWithStats>>[number];
export type CityWithStats = Awaited<ReturnType<typeof getCitiesWithStats>>[number];
export type CategoryWithStats = Awaited<ReturnType<typeof getCategoriesWithStats>>[number];
export type BusinessWithStats = Awaited<ReturnType<typeof getBusinessesWithStats>>[number];
export type LeadWithDetails = Awaited<ReturnType<typeof getAdminLeads>>["leads"][number];
export type AdminPlace = Awaited<ReturnType<typeof getAdminPlaces>>["places"][number];
export type AdminReview = Awaited<ReturnType<typeof getAdminReviews>>["reviews"][number];
