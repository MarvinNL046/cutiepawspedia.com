import { eq, desc, and, count } from "drizzle-orm";
import { db } from "../index";
import { leads, places, cities, countries } from "../schema";

// ============================================================================
// TYPES
// ============================================================================

export type LeadStatus = "new" | "sent" | "viewed" | "converted" | "spam";

export type LeadWithPlace = {
  id: number;
  placeId: number;
  businessId: number | null;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  source: string | null;
  status: string;
  viewedAt: Date | null;
  priceCents: number | null;
  createdAt: Date;
  // Place info
  placeName: string | null;
  placeSlug: string | null;
  cityName: string | null;
  countrySlug: string | null;
};

export type LeadStatusCounts = {
  all: number;
  new: number;
  sent: number;
  viewed: number;
  converted: number;
  spam: number;
};

// ============================================================================
// LEAD QUERIES
// ============================================================================

/**
 * Get leads for a business with optional status filter
 * Includes place info for display
 */
export async function getLeadsForBusiness(options: {
  businessId: number;
  status?: LeadStatus;
  limit?: number;
  offset?: number;
}): Promise<{ leads: LeadWithPlace[]; total: number }> {
  if (!db) return { leads: [], total: 0 };

  const { businessId, status, limit = 50, offset = 0 } = options;

  // Build conditions
  const conditions = [eq(places.businessId, businessId)];
  if (status) {
    conditions.push(eq(leads.status, status));
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
      placeId: leads.placeId,
      businessId: leads.businessId,
      name: leads.name,
      email: leads.email,
      phone: leads.phone,
      message: leads.message,
      source: leads.source,
      status: leads.status,
      viewedAt: leads.viewedAt,
      priceCents: leads.priceCents,
      createdAt: leads.createdAt,
      placeName: places.name,
      placeSlug: places.slug,
      cityName: cities.name,
      countrySlug: countries.slug,
    })
    .from(leads)
    .innerJoin(places, eq(leads.placeId, places.id))
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

/**
 * Get lead status counts for a business
 * Used for displaying filter badges
 */
export async function getLeadStatusCounts(businessId: number): Promise<LeadStatusCounts> {
  if (!db) {
    return { all: 0, new: 0, sent: 0, viewed: 0, converted: 0, spam: 0 };
  }

  const results = await Promise.all([
    // All leads
    db
      .select({ value: count() })
      .from(leads)
      .innerJoin(places, eq(leads.placeId, places.id))
      .where(eq(places.businessId, businessId)),
    // By status
    ...["new", "sent", "viewed", "converted", "spam"].map((status) =>
      db!
        .select({ value: count() })
        .from(leads)
        .innerJoin(places, eq(leads.placeId, places.id))
        .where(and(eq(places.businessId, businessId), eq(leads.status, status)))
    ),
  ]);

  return {
    all: results[0][0]?.value ?? 0,
    new: results[1][0]?.value ?? 0,
    sent: results[2][0]?.value ?? 0,
    viewed: results[3][0]?.value ?? 0,
    converted: results[4][0]?.value ?? 0,
    spam: results[5][0]?.value ?? 0,
  };
}

/**
 * Update lead status
 * Also sets viewedAt timestamp when status changes to viewed or converted
 */
export async function updateLeadStatus(options: {
  leadId: number;
  businessId: number;
  status: LeadStatus;
}): Promise<{ success: boolean; error?: string }> {
  if (!db) return { success: false, error: "Database not available" };

  const { leadId, businessId, status } = options;

  // First verify the lead belongs to a place owned by this business
  const leadCheck = await db
    .select({ id: leads.id, placeBusinessId: places.businessId })
    .from(leads)
    .innerJoin(places, eq(leads.placeId, places.id))
    .where(eq(leads.id, leadId))
    .limit(1);

  if (leadCheck.length === 0) {
    return { success: false, error: "Lead not found" };
  }

  if (leadCheck[0].placeBusinessId !== businessId) {
    return { success: false, error: "Unauthorized: Lead does not belong to this business" };
  }

  // Update status and viewedAt
  const updateData: { status: string; viewedAt?: Date } = { status };

  // Set viewedAt when first viewed or converted
  if (["viewed", "converted"].includes(status)) {
    updateData.viewedAt = new Date();
  }

  await db.update(leads).set(updateData).where(eq(leads.id, leadId));

  return { success: true };
}

/**
 * Get a single lead by ID with ownership check
 */
export async function getLeadByIdForBusiness(options: {
  leadId: number;
  businessId: number;
}): Promise<LeadWithPlace | null> {
  if (!db) return null;

  const { leadId, businessId } = options;

  const result = await db
    .select({
      id: leads.id,
      placeId: leads.placeId,
      businessId: leads.businessId,
      name: leads.name,
      email: leads.email,
      phone: leads.phone,
      message: leads.message,
      source: leads.source,
      status: leads.status,
      viewedAt: leads.viewedAt,
      priceCents: leads.priceCents,
      createdAt: leads.createdAt,
      placeName: places.name,
      placeSlug: places.slug,
      cityName: cities.name,
      countrySlug: countries.slug,
    })
    .from(leads)
    .innerJoin(places, eq(leads.placeId, places.id))
    .leftJoin(cities, eq(places.cityId, cities.id))
    .leftJoin(countries, eq(cities.countryId, countries.id))
    .where(and(eq(leads.id, leadId), eq(places.businessId, businessId)))
    .limit(1);

  return result[0] ?? null;
}
