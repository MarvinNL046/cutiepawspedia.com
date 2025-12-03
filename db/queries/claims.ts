import { eq, desc, and, count } from "drizzle-orm";
import { db } from "../index";
import { placeClaims, places, users, cities, countries, businesses } from "../schema";

// ============================================================================
// TYPES
// ============================================================================

export type ClaimStatus = "pending" | "approved" | "rejected";

export type PlaceClaim = {
  id: number;
  placeId: number;
  userId: number;
  status: string;
  proofDocumentUrl: string | null;
  businessRole: string | null;
  notes: string | null;
  adminNotes: string | null;
  reviewedBy: number | null;
  reviewedAt: Date | null;
  createdAt: Date;
  // Joined data
  placeName: string | null;
  placeSlug: string | null;
  cityName: string | null;
  countryName: string | null;
  userEmail: string | null;
  userName: string | null;
  reviewerEmail: string | null;
};

export type ClaimStats = {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
};

// ============================================================================
// CLAIM QUERIES
// ============================================================================

/**
 * Create a new place claim
 */
export async function createClaim(data: {
  placeId: number;
  userId: number;
  proofDocumentUrl?: string | null;
  businessRole?: string | null;
  notes?: string | null;
}) {
  if (!db) throw new Error("Database not available");

  // Check if user already has a pending claim for this place
  const existing = await db
    .select({ id: placeClaims.id })
    .from(placeClaims)
    .where(
      and(
        eq(placeClaims.placeId, data.placeId),
        eq(placeClaims.userId, data.userId),
        eq(placeClaims.status, "pending")
      )
    )
    .limit(1);

  if (existing.length > 0) {
    throw new Error("You already have a pending claim for this place");
  }

  const [result] = await db
    .insert(placeClaims)
    .values({
      placeId: data.placeId,
      userId: data.userId,
      status: "pending",
      proofDocumentUrl: data.proofDocumentUrl,
      businessRole: data.businessRole,
      notes: data.notes,
    })
    .returning();

  return result;
}

/**
 * Get claims with optional filters
 */
export async function getClaims(options: {
  limit?: number;
  offset?: number;
  status?: ClaimStatus;
  userId?: number;
  placeId?: number;
} = {}): Promise<{ claims: PlaceClaim[]; total: number }> {
  if (!db) return { claims: [], total: 0 };

  const { limit = 50, offset = 0, status, userId, placeId } = options;

  // Build conditions
  const conditions = [];
  if (status) {
    conditions.push(eq(placeClaims.status, status));
  }
  if (userId) {
    conditions.push(eq(placeClaims.userId, userId));
  }
  if (placeId) {
    conditions.push(eq(placeClaims.placeId, placeId));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  // Get total count
  const totalQuery = db.select({ value: count() }).from(placeClaims);
  const totalResult = whereClause
    ? await totalQuery.where(whereClause)
    : await totalQuery;

  // Get claims with joined data
  // Note: Using subquery alias for reviewer to avoid conflicts
  const claimsQuery = db
    .select({
      id: placeClaims.id,
      placeId: placeClaims.placeId,
      userId: placeClaims.userId,
      status: placeClaims.status,
      proofDocumentUrl: placeClaims.proofDocumentUrl,
      businessRole: placeClaims.businessRole,
      notes: placeClaims.notes,
      adminNotes: placeClaims.adminNotes,
      reviewedBy: placeClaims.reviewedBy,
      reviewedAt: placeClaims.reviewedAt,
      createdAt: placeClaims.createdAt,
      placeName: places.name,
      placeSlug: places.slug,
      cityName: cities.name,
      countryName: countries.name,
      userEmail: users.email,
      userName: users.name,
    })
    .from(placeClaims)
    .leftJoin(places, eq(placeClaims.placeId, places.id))
    .leftJoin(cities, eq(places.cityId, cities.id))
    .leftJoin(countries, eq(cities.countryId, countries.id))
    .leftJoin(users, eq(placeClaims.userId, users.id))
    .orderBy(desc(placeClaims.createdAt))
    .limit(limit)
    .offset(offset);

  const claimsResult = whereClause
    ? await claimsQuery.where(whereClause)
    : await claimsQuery;

  // Get reviewer emails for each claim that has a reviewer
  const claimsWithReviewer = await Promise.all(
    claimsResult.map(async (claim) => {
      let reviewerEmail: string | null = null;
      if (claim.reviewedBy) {
        const reviewerResult = await db!
          .select({ email: users.email })
          .from(users)
          .where(eq(users.id, claim.reviewedBy))
          .limit(1);
        reviewerEmail = reviewerResult[0]?.email ?? null;
      }
      return { ...claim, reviewerEmail };
    })
  );

  return {
    claims: claimsWithReviewer,
    total: totalResult[0]?.value ?? 0,
  };
}

/**
 * Get a single claim by ID
 */
export async function getClaimById(id: number): Promise<PlaceClaim | null> {
  if (!db) return null;

  const result = await db
    .select({
      id: placeClaims.id,
      placeId: placeClaims.placeId,
      userId: placeClaims.userId,
      status: placeClaims.status,
      proofDocumentUrl: placeClaims.proofDocumentUrl,
      businessRole: placeClaims.businessRole,
      notes: placeClaims.notes,
      adminNotes: placeClaims.adminNotes,
      reviewedBy: placeClaims.reviewedBy,
      reviewedAt: placeClaims.reviewedAt,
      createdAt: placeClaims.createdAt,
      placeName: places.name,
      placeSlug: places.slug,
      cityName: cities.name,
      countryName: countries.name,
      userEmail: users.email,
      userName: users.name,
    })
    .from(placeClaims)
    .leftJoin(places, eq(placeClaims.placeId, places.id))
    .leftJoin(cities, eq(places.cityId, cities.id))
    .leftJoin(countries, eq(cities.countryId, countries.id))
    .leftJoin(users, eq(placeClaims.userId, users.id))
    .where(eq(placeClaims.id, id))
    .limit(1);

  if (!result[0]) return null;

  const claim = result[0];
  let reviewerEmail: string | null = null;
  if (claim.reviewedBy) {
    const reviewerResult = await db
      .select({ email: users.email })
      .from(users)
      .where(eq(users.id, claim.reviewedBy))
      .limit(1);
    reviewerEmail = reviewerResult[0]?.email ?? null;
  }

  return { ...claim, reviewerEmail };
}

/**
 * Approve a claim - links place to user's business
 */
export async function approveClaim(
  claimId: number,
  adminId: number,
  adminNotes?: string
): Promise<PlaceClaim | null> {
  if (!db) throw new Error("Database not available");

  // Get the claim
  const claim = await getClaimById(claimId);
  if (!claim) throw new Error("Claim not found");
  if (claim.status !== "pending") throw new Error("Claim is not pending");

  // Get or create business for the user
  const existingBusiness = await db
    .select({ id: businesses.id })
    .from(businesses)
    .where(eq(businesses.userId, claim.userId))
    .limit(1);

  let businessId: number;
  if (existingBusiness.length === 0) {
    // Create business for user
    const [newBusiness] = await db
      .insert(businesses)
      .values({
        userId: claim.userId,
        name: claim.userName || claim.userEmail || "My Business",
        status: "active",
        plan: "free",
        billingStatus: "trial",
      })
      .returning();
    businessId = newBusiness.id;
  } else {
    businessId = existingBusiness[0].id;
  }

  // Update the place to link it to the business
  await db
    .update(places)
    .set({
      businessId,
      ownerId: claim.userId,
      isVerified: true,
      updatedAt: new Date(),
    })
    .where(eq(places.id, claim.placeId));

  // Update the claim status
  const [updatedClaim] = await db
    .update(placeClaims)
    .set({
      status: "approved",
      adminNotes,
      reviewedBy: adminId,
      reviewedAt: new Date(),
    })
    .where(eq(placeClaims.id, claimId))
    .returning();

  return getClaimById(updatedClaim.id);
}

/**
 * Reject a claim
 */
export async function rejectClaim(
  claimId: number,
  adminId: number,
  adminNotes?: string
): Promise<PlaceClaim | null> {
  if (!db) throw new Error("Database not available");

  const claim = await getClaimById(claimId);
  if (!claim) throw new Error("Claim not found");
  if (claim.status !== "pending") throw new Error("Claim is not pending");

  const [updatedClaim] = await db
    .update(placeClaims)
    .set({
      status: "rejected",
      adminNotes,
      reviewedBy: adminId,
      reviewedAt: new Date(),
    })
    .where(eq(placeClaims.id, claimId))
    .returning();

  return getClaimById(updatedClaim.id);
}

/**
 * Get claim statistics
 */
export async function getClaimStats(): Promise<ClaimStats> {
  if (!db) return { total: 0, pending: 0, approved: 0, rejected: 0 };

  const [total, pending, approved, rejected] = await Promise.all([
    db.select({ value: count() }).from(placeClaims),
    db
      .select({ value: count() })
      .from(placeClaims)
      .where(eq(placeClaims.status, "pending")),
    db
      .select({ value: count() })
      .from(placeClaims)
      .where(eq(placeClaims.status, "approved")),
    db
      .select({ value: count() })
      .from(placeClaims)
      .where(eq(placeClaims.status, "rejected")),
  ]);

  return {
    total: total[0]?.value ?? 0,
    pending: pending[0]?.value ?? 0,
    approved: approved[0]?.value ?? 0,
    rejected: rejected[0]?.value ?? 0,
  };
}

/**
 * Check if a place can be claimed (not already owned)
 */
export async function canClaimPlace(placeId: number): Promise<{
  canClaim: boolean;
  reason?: string;
}> {
  if (!db) return { canClaim: false, reason: "Database not available" };

  const place = await db
    .select({
      id: places.id,
      businessId: places.businessId,
      ownerId: places.ownerId,
    })
    .from(places)
    .where(eq(places.id, placeId))
    .limit(1);

  if (place.length === 0) {
    return { canClaim: false, reason: "Place not found" };
  }

  if (place[0].businessId || place[0].ownerId) {
    return { canClaim: false, reason: "This place is already claimed" };
  }

  // Check for pending claims
  const pendingClaims = await db
    .select({ id: placeClaims.id })
    .from(placeClaims)
    .where(
      and(eq(placeClaims.placeId, placeId), eq(placeClaims.status, "pending"))
    )
    .limit(1);

  if (pendingClaims.length > 0) {
    return { canClaim: false, reason: "This place has a pending claim" };
  }

  return { canClaim: true };
}
