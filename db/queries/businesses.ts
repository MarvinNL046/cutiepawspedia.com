import { sql, eq, desc, count, gte, and, or, ilike } from "drizzle-orm";
import { db } from "../index";
import { businesses, users, places, leads, cities, countries, categories, placeCategories } from "../schema";

// ============================================================================
// TYPES
// ============================================================================

export type BusinessStatus = "active" | "pending" | "suspended";
export type BusinessPlan = "free" | "starter" | "pro" | "enterprise";
export type BillingStatus = "trial" | "paid" | "overdue" | "cancelled";

export type BusinessWithStats = {
  id: number;
  userId: number;
  name: string;
  contactEmail: string | null;
  contactPhone: string | null;
  status: string;
  plan: string;
  billingStatus: string;
  leadPriceCents: number | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  // Relations
  ownerEmail: string | null;
  ownerName: string | null;
  // Stats
  placesCount: number;
  leadsCount: number;
  leadsLast30Days: number;
};

export type BusinessDetails = BusinessWithStats & {
  totalRevenue: number; // Placeholder for billing integration
  conversionRate: number;
  // Additional business info
  slug: string | null;
  description: string | null;
  website: string | null;
  logo: string | null;
};

// ============================================================================
// BUSINESS QUERIES
// ============================================================================

/**
 * Get all businesses with filters and stats
 */
export async function getBusinesses(options: {
  limit?: number;
  offset?: number;
  status?: BusinessStatus;
  plan?: BusinessPlan;
  billingStatus?: BillingStatus;
  search?: string;
} = {}): Promise<{ businesses: BusinessWithStats[]; total: number }> {
  if (!db) return { businesses: [], total: 0 };

  const { limit = 50, offset = 0, status, plan, billingStatus, search } = options;

  // Build conditions
  const conditions = [];
  if (status) {
    conditions.push(eq(businesses.status, status));
  }
  if (plan) {
    conditions.push(eq(businesses.plan, plan));
  }
  if (billingStatus) {
    conditions.push(eq(businesses.billingStatus, billingStatus));
  }
  if (search) {
    conditions.push(
      or(
        ilike(businesses.name, `%${search}%`),
        ilike(users.email, `%${search}%`),
        ilike(businesses.contactEmail, `%${search}%`)
      )
    );
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  // Get total count
  const totalQuery = db
    .select({ value: count() })
    .from(businesses)
    .leftJoin(users, eq(businesses.userId, users.id));

  const totalResult = whereClause
    ? await totalQuery.where(whereClause)
    : await totalQuery;

  // Get businesses with owner info
  const businessesQuery = db
    .select({
      id: businesses.id,
      userId: businesses.userId,
      name: businesses.name,
      contactEmail: businesses.contactEmail,
      contactPhone: businesses.contactPhone,
      status: businesses.status,
      plan: businesses.plan,
      billingStatus: businesses.billingStatus,
      leadPriceCents: businesses.leadPriceCents,
      notes: businesses.notes,
      createdAt: businesses.createdAt,
      updatedAt: businesses.updatedAt,
      ownerEmail: users.email,
      ownerName: users.name,
    })
    .from(businesses)
    .leftJoin(users, eq(businesses.userId, users.id))
    .orderBy(desc(businesses.createdAt))
    .limit(limit)
    .offset(offset);

  const businessesResult = whereClause
    ? await businessesQuery.where(whereClause)
    : await businessesQuery;

  // Get stats for each business
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const withStats = await Promise.all(
    businessesResult.map(async (business) => {
      const [placesResult, leadsResult, leadsLast30DaysResult] = await Promise.all([
        db!.select({ value: count() }).from(places).where(eq(places.businessId, business.id)),
        db!
          .select({ value: count() })
          .from(leads)
          .innerJoin(places, eq(leads.placeId, places.id))
          .where(eq(places.businessId, business.id)),
        db!
          .select({ value: count() })
          .from(leads)
          .innerJoin(places, eq(leads.placeId, places.id))
          .where(
            and(
              eq(places.businessId, business.id),
              gte(leads.createdAt, thirtyDaysAgo)
            )
          ),
      ]);

      return {
        ...business,
        placesCount: placesResult[0]?.value ?? 0,
        leadsCount: leadsResult[0]?.value ?? 0,
        leadsLast30Days: leadsLast30DaysResult[0]?.value ?? 0,
      };
    })
  );

  return {
    businesses: withStats,
    total: totalResult[0]?.value ?? 0,
  };
}

/**
 * Get a single business by ID with full details and stats
 */
export async function getBusinessById(id: number): Promise<BusinessDetails | null> {
  if (!db) return null;

  const result = await db
    .select({
      id: businesses.id,
      userId: businesses.userId,
      slug: businesses.slug,
      name: businesses.name,
      description: businesses.description,
      website: businesses.website,
      logo: businesses.logo,
      contactEmail: businesses.contactEmail,
      contactPhone: businesses.contactPhone,
      status: businesses.status,
      plan: businesses.plan,
      billingStatus: businesses.billingStatus,
      leadPriceCents: businesses.leadPriceCents,
      notes: businesses.notes,
      createdAt: businesses.createdAt,
      updatedAt: businesses.updatedAt,
      ownerEmail: users.email,
      ownerName: users.name,
    })
    .from(businesses)
    .leftJoin(users, eq(businesses.userId, users.id))
    .where(eq(businesses.id, id));

  if (!result[0]) return null;

  const business = result[0];
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  // Get all stats
  const [placesResult, leadsResult, leadsLast30DaysResult] = await Promise.all([
    db.select({ value: count() }).from(places).where(eq(places.businessId, business.id)),
    db
      .select({ value: count() })
      .from(leads)
      .innerJoin(places, eq(leads.placeId, places.id))
      .where(eq(places.businessId, business.id)),
    db
      .select({ value: count() })
      .from(leads)
      .innerJoin(places, eq(leads.placeId, places.id))
      .where(
        and(
          eq(places.businessId, business.id),
          gte(leads.createdAt, thirtyDaysAgo)
        )
      ),
  ]);

  const placesCount = placesResult[0]?.value ?? 0;
  const leadsCount = leadsResult[0]?.value ?? 0;
  const leadsLast30Days = leadsLast30DaysResult[0]?.value ?? 0;

  // Calculate conversion rate (leads / 30 = approximate daily, * 100 for percentage)
  // This is a placeholder - real conversion would need views/impressions data
  const conversionRate = placesCount > 0 ? (leadsCount / placesCount) * 100 : 0;

  return {
    ...business,
    placesCount,
    leadsCount,
    leadsLast30Days,
    totalRevenue: 0, // Placeholder for Stripe integration
    conversionRate: Math.round(conversionRate * 10) / 10,
  };
}

/**
 * Get business by user ID (legacy - returns first/only business)
 */
export async function getBusinessByUserId(userId: number) {
  if (!db) return null;

  return db.query.businesses.findFirst({
    where: eq(businesses.userId, userId),
  });
}

/**
 * Get all businesses for a user
 * Used in business dashboard to show all businesses owned by user
 */
export async function getBusinessesForUser(userId: number): Promise<{
  id: number;
  slug: string | null;
  name: string;
  logo: string | null;
  status: string;
  plan: string;
  creditBalanceCents: number;
  createdAt: Date;
}[]> {
  if (!db) return [];

  const result = await db
    .select({
      id: businesses.id,
      slug: businesses.slug,
      name: businesses.name,
      logo: businesses.logo,
      status: businesses.status,
      plan: businesses.plan,
      creditBalanceCents: businesses.creditBalanceCents,
      createdAt: businesses.createdAt,
    })
    .from(businesses)
    .where(eq(businesses.userId, userId))
    .orderBy(desc(businesses.createdAt));

  return result;
}

/**
 * Get business by ID with user ownership check
 * Returns null if user doesn't own the business (security check)
 */
export async function getBusinessByIdForUser(options: {
  businessId: number;
  userId: number;
}): Promise<BusinessDetails | null> {
  if (!db) return null;

  const { businessId, userId } = options;

  // First verify ownership
  const business = await db
    .select({
      id: businesses.id,
      userId: businesses.userId,
      slug: businesses.slug,
      name: businesses.name,
      description: businesses.description,
      website: businesses.website,
      logo: businesses.logo,
      contactEmail: businesses.contactEmail,
      contactPhone: businesses.contactPhone,
      status: businesses.status,
      plan: businesses.plan,
      billingStatus: businesses.billingStatus,
      leadPriceCents: businesses.leadPriceCents,
      creditBalanceCents: businesses.creditBalanceCents,
      notes: businesses.notes,
      createdAt: businesses.createdAt,
      updatedAt: businesses.updatedAt,
      ownerEmail: users.email,
      ownerName: users.name,
    })
    .from(businesses)
    .leftJoin(users, eq(businesses.userId, users.id))
    .where(and(eq(businesses.id, businessId), eq(businesses.userId, userId)));

  if (!business[0]) return null;

  const biz = business[0];
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  // Get stats
  const [placesResult, leadsResult, leadsLast30DaysResult] = await Promise.all([
    db.select({ value: count() }).from(places).where(eq(places.businessId, businessId)),
    db
      .select({ value: count() })
      .from(leads)
      .innerJoin(places, eq(leads.placeId, places.id))
      .where(eq(places.businessId, businessId)),
    db
      .select({ value: count() })
      .from(leads)
      .innerJoin(places, eq(leads.placeId, places.id))
      .where(
        and(
          eq(places.businessId, businessId),
          gte(leads.createdAt, thirtyDaysAgo)
        )
      ),
  ]);

  const placesCount = placesResult[0]?.value ?? 0;
  const leadsCount = leadsResult[0]?.value ?? 0;
  const leadsLast30Days = leadsLast30DaysResult[0]?.value ?? 0;
  const conversionRate = placesCount > 0 ? (leadsCount / placesCount) * 100 : 0;

  return {
    ...biz,
    placesCount,
    leadsCount,
    leadsLast30Days,
    totalRevenue: 0,
    conversionRate: Math.round(conversionRate * 10) / 10,
  };
}

/**
 * Create a new business
 */
export async function createBusiness(data: {
  userId: number;
  name: string;
  contactEmail?: string | null;
  contactPhone?: string | null;
  status?: BusinessStatus;
  plan?: BusinessPlan;
  billingStatus?: BillingStatus;
  leadPriceCents?: number | null;
  notes?: string | null;
}) {
  if (!db) throw new Error("Database not available");

  const [result] = await db
    .insert(businesses)
    .values({
      userId: data.userId,
      name: data.name,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      status: data.status ?? "active",
      plan: data.plan ?? "free",
      billingStatus: data.billingStatus ?? "trial",
      leadPriceCents: data.leadPriceCents,
      notes: data.notes,
    })
    .returning();

  return result;
}

/**
 * Update a business
 */
export async function updateBusiness(
  id: number,
  data: Partial<{
    name: string;
    contactEmail: string | null;
    contactPhone: string | null;
    status: BusinessStatus;
    plan: BusinessPlan;
    billingStatus: BillingStatus;
    leadPriceCents: number | null;
    notes: string | null;
  }>
) {
  if (!db) throw new Error("Database not available");

  const [result] = await db
    .update(businesses)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(businesses.id, id))
    .returning();

  return result;
}

/**
 * Delete a business
 */
export async function deleteBusiness(id: number) {
  if (!db) throw new Error("Database not available");
  await db.delete(businesses).where(eq(businesses.id, id));
}

// ============================================================================
// BUSINESS LISTINGS (PLACES)
// ============================================================================

export type BusinessListing = {
  id: number;
  name: string;
  slug: string;
  cityName: string | null;
  countryName: string | null;
  categoryName: string | null;
  isVerified: boolean;
  isPremium: boolean;
  avgRating: number | null;
  reviewCount: number;
  leadCount: number;
  createdAt: Date;
};

/**
 * Get all listings (places) for a specific business
 */
export async function getBusinessListings(
  businessId: number,
  options: { limit?: number; offset?: number } = {}
): Promise<{ listings: BusinessListing[]; total: number }> {
  if (!db) return { listings: [], total: 0 };

  const { limit = 50, offset = 0 } = options;

  // Get total count
  const totalResult = await db
    .select({ value: count() })
    .from(places)
    .where(eq(places.businessId, businessId));

  // Get places with city info
  const placesResult = await db
    .select({
      id: places.id,
      name: places.name,
      slug: places.slug,
      cityName: cities.name,
      countryName: countries.name,
      isVerified: places.isVerified,
      isPremium: places.isPremium,
      avgRating: places.avgRating,
      reviewCount: places.reviewCount,
      createdAt: places.createdAt,
    })
    .from(places)
    .leftJoin(cities, eq(places.cityId, cities.id))
    .leftJoin(countries, eq(cities.countryId, countries.id))
    .where(eq(places.businessId, businessId))
    .orderBy(desc(places.createdAt))
    .limit(limit)
    .offset(offset);

  // Get leads count and first category for each place
  const withLeadsAndCategory = await Promise.all(
    placesResult.map(async (place) => {
      // Get leads count
      const leadsResult = await db!
        .select({ value: count() })
        .from(leads)
        .where(eq(leads.placeId, place.id));

      // Get first category slug (categories use labelKey for i18n, slug for display)
      const categoryResult = await db!
        .select({ slug: categories.slug })
        .from(placeCategories)
        .innerJoin(categories, eq(placeCategories.categoryId, categories.id))
        .where(eq(placeCategories.placeId, place.id))
        .limit(1);

      return {
        ...place,
        categoryName: categoryResult[0]?.slug ?? null,
        avgRating: place.avgRating ? parseFloat(place.avgRating) : null,
        leadCount: leadsResult[0]?.value ?? 0,
      };
    })
  );

  return {
    listings: withLeadsAndCategory,
    total: totalResult[0]?.value ?? 0,
  };
}

// ============================================================================
// BUSINESS LEADS
// ============================================================================

export type BusinessLead = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  source: string | null;
  createdAt: Date;
  placeId: number;
  placeName: string | null;
  placeSlug: string | null;
};

/**
 * Get all leads for a specific business
 */
export async function getBusinessLeads(
  businessId: number,
  options: {
    limit?: number;
    offset?: number;
    placeId?: number;
    startDate?: Date;
    endDate?: Date;
  } = {}
): Promise<{ leads: BusinessLead[]; total: number }> {
  if (!db) return { leads: [], total: 0 };

  const { limit = 50, offset = 0, placeId, startDate, endDate } = options;

  // Build conditions
  const conditions = [eq(places.businessId, businessId)];
  if (placeId) {
    conditions.push(eq(leads.placeId, placeId));
  }
  if (startDate) {
    conditions.push(gte(leads.createdAt, startDate));
  }
  if (endDate) {
    conditions.push(sql`${leads.createdAt} <= ${endDate}`);
  }

  const whereClause = and(...conditions);

  // Get total count
  const totalResult = await db
    .select({ value: count() })
    .from(leads)
    .innerJoin(places, eq(leads.placeId, places.id))
    .where(whereClause);

  // Get leads with place info
  const leadsResult = await db
    .select({
      id: leads.id,
      name: leads.name,
      email: leads.email,
      phone: leads.phone,
      message: leads.message,
      source: leads.source,
      createdAt: leads.createdAt,
      placeId: leads.placeId,
      placeName: places.name,
      placeSlug: places.slug,
    })
    .from(leads)
    .innerJoin(places, eq(leads.placeId, places.id))
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
// BUSINESS STATS
// ============================================================================

export type BusinessStats = {
  totalListings: number;
  verifiedListings: number;
  premiumListings: number;
  totalLeads: number;
  leadsLast7Days: number;
  leadsLast30Days: number;
  avgRating: number;
  totalReviews: number;
};

/**
 * Get comprehensive stats for a business
 */
export async function getBusinessStats(businessId: number): Promise<BusinessStats> {
  if (!db) {
    return {
      totalListings: 0,
      verifiedListings: 0,
      premiumListings: 0,
      totalLeads: 0,
      leadsLast7Days: 0,
      leadsLast30Days: 0,
      avgRating: 0,
      totalReviews: 0,
    };
  }

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const [
    totalListingsResult,
    verifiedListingsResult,
    premiumListingsResult,
    totalLeadsResult,
    leadsLast7DaysResult,
    leadsLast30DaysResult,
    ratingsResult,
  ] = await Promise.all([
    // Total listings
    db.select({ value: count() }).from(places).where(eq(places.businessId, businessId)),
    // Verified listings
    db
      .select({ value: count() })
      .from(places)
      .where(and(eq(places.businessId, businessId), eq(places.isVerified, true))),
    // Premium listings
    db
      .select({ value: count() })
      .from(places)
      .where(and(eq(places.businessId, businessId), eq(places.isPremium, true))),
    // Total leads
    db
      .select({ value: count() })
      .from(leads)
      .innerJoin(places, eq(leads.placeId, places.id))
      .where(eq(places.businessId, businessId)),
    // Leads last 7 days
    db
      .select({ value: count() })
      .from(leads)
      .innerJoin(places, eq(leads.placeId, places.id))
      .where(and(eq(places.businessId, businessId), gte(leads.createdAt, sevenDaysAgo))),
    // Leads last 30 days
    db
      .select({ value: count() })
      .from(leads)
      .innerJoin(places, eq(leads.placeId, places.id))
      .where(and(eq(places.businessId, businessId), gte(leads.createdAt, thirtyDaysAgo))),
    // Average rating and total reviews
    db
      .select({
        avgRating: sql<number>`COALESCE(AVG(CAST(${places.avgRating} AS DECIMAL)), 0)`,
        totalReviews: sql<number>`COALESCE(SUM(${places.reviewCount}), 0)`,
      })
      .from(places)
      .where(eq(places.businessId, businessId)),
  ]);

  return {
    totalListings: totalListingsResult[0]?.value ?? 0,
    verifiedListings: verifiedListingsResult[0]?.value ?? 0,
    premiumListings: premiumListingsResult[0]?.value ?? 0,
    totalLeads: totalLeadsResult[0]?.value ?? 0,
    leadsLast7Days: leadsLast7DaysResult[0]?.value ?? 0,
    leadsLast30Days: leadsLast30DaysResult[0]?.value ?? 0,
    avgRating: Math.round((ratingsResult[0]?.avgRating ?? 0) * 10) / 10,
    totalReviews: ratingsResult[0]?.totalReviews ?? 0,
  };
}

// ============================================================================
// LINK PLACE TO BUSINESS
// ============================================================================

/**
 * Link a place to a business (transfer ownership)
 */
export async function linkPlaceToBusiness(placeId: number, businessId: number | null) {
  if (!db) throw new Error("Database not available");

  const [result] = await db
    .update(places)
    .set({
      businessId,
      updatedAt: new Date(),
    })
    .where(eq(places.id, placeId))
    .returning();

  return result;
}

/**
 * Get unassigned places (places without a business)
 */
export async function getUnassignedPlaces(options: { limit?: number; offset?: number } = {}) {
  if (!db) return { places: [], total: 0 };

  const { limit = 50, offset = 0 } = options;

  const whereClause = sql`${places.businessId} IS NULL`;

  const totalResult = await db
    .select({ value: count() })
    .from(places)
    .where(whereClause);

  const placesResult = await db
    .select({
      id: places.id,
      name: places.name,
      slug: places.slug,
      cityName: cities.name,
      ownerEmail: users.email,
      createdAt: places.createdAt,
    })
    .from(places)
    .leftJoin(cities, eq(places.cityId, cities.id))
    .leftJoin(users, eq(places.ownerId, users.id))
    .where(whereClause)
    .orderBy(desc(places.createdAt))
    .limit(limit)
    .offset(offset);

  return {
    places: placesResult,
    total: totalResult[0]?.value ?? 0,
  };
}
