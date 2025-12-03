import { eq } from "drizzle-orm";
import { db } from "../index";
import { creditTransactions, businesses, places } from "../schema";
import { PREMIUM_UPGRADE_PRICE_CENTS } from "@/lib/pricing/config";
import { logAuditEvent } from "./auditLogs";

// ============================================================================
// TYPES
// ============================================================================

export type PremiumUpgradeResult =
  | { success: true; transaction: typeof creditTransactions.$inferSelect }
  | { success: false; error: string };

// ============================================================================
// PREMIUM UPGRADE FUNCTIONS
// ============================================================================

/**
 * Upgrade a place to premium listing
 *
 * Flow:
 * 1. Verify business owns the place
 * 2. Check business has enough credits
 * 3. Deduct credits via premium_subscription transaction
 * 4. Set place.isPremium = true, premiumSince = now
 * 5. Return transaction or error
 */
export async function upgradeToPremium(
  placeId: number,
  businessId: number
): Promise<PremiumUpgradeResult> {
  if (!db) {
    return { success: false, error: "Database not available" };
  }

  // 1. Verify business owns the place
  const place = await db
    .select({ id: places.id, businessId: places.businessId, isPremium: places.isPremium })
    .from(places)
    .where(eq(places.id, placeId))
    .limit(1);

  if (place.length === 0) {
    return { success: false, error: "Place not found" };
  }

  if (place[0].businessId !== businessId) {
    return { success: false, error: "Business does not own this place" };
  }

  if (place[0].isPremium) {
    return { success: false, error: "Place is already premium" };
  }

  // 2. Check business has enough credits
  const business = await db
    .select({ creditBalanceCents: businesses.creditBalanceCents })
    .from(businesses)
    .where(eq(businesses.id, businessId))
    .limit(1);

  if (business.length === 0) {
    return { success: false, error: "Business not found" };
  }

  const currentBalance = business[0].creditBalanceCents ?? 0;

  if (currentBalance < PREMIUM_UPGRADE_PRICE_CENTS) {
    return {
      success: false,
      error: `Insufficient credits. Balance: €${(currentBalance / 100).toFixed(2)}, Required: €${(PREMIUM_UPGRADE_PRICE_CENTS / 100).toFixed(2)}`,
    };
  }

  // 3. Deduct credits via premium_subscription transaction
  const newBalance = currentBalance - PREMIUM_UPGRADE_PRICE_CENTS;

  const [transaction] = await db
    .insert(creditTransactions)
    .values({
      businessId,
      amountCents: -PREMIUM_UPGRADE_PRICE_CENTS, // Negative = charge
      type: "premium_subscription",
      description: `Premium upgrade for listing`,
      placeId,
      balanceAfterCents: newBalance,
      metadata: {
        action: "upgrade_to_premium",
        placeId,
        priceCents: PREMIUM_UPGRADE_PRICE_CENTS,
      },
    })
    .returning();

  // 4. Update business balance
  await db
    .update(businesses)
    .set({
      creditBalanceCents: newBalance,
      updatedAt: new Date(),
    })
    .where(eq(businesses.id, businessId));

  // 5. Set place as premium
  await db
    .update(places)
    .set({
      isPremium: true,
      premiumSince: new Date(),
      premiumLevel: 1, // Featured level
      updatedAt: new Date(),
    })
    .where(eq(places.id, placeId));

  // Log PREMIUM_UPGRADE audit event
  logAuditEvent({
    actorBusinessId: businessId,
    actorRole: "business",
    eventType: "PREMIUM_UPGRADE",
    targetType: "place",
    targetId: placeId,
    metadata: {
      priceCents: PREMIUM_UPGRADE_PRICE_CENTS,
      transactionId: transaction.id,
    },
  });

  return { success: true, transaction };
}

/**
 * Check if a place is premium
 */
export async function isPlacePremium(placeId: number): Promise<boolean> {
  if (!db) return false;

  const place = await db
    .select({ isPremium: places.isPremium })
    .from(places)
    .where(eq(places.id, placeId))
    .limit(1);

  return place[0]?.isPremium ?? false;
}

/**
 * Get premium status details for a place
 */
export async function getPremiumStatus(placeId: number): Promise<{
  isPremium: boolean;
  premiumSince: Date | null;
  premiumLevel: number;
} | null> {
  if (!db) return null;

  const place = await db
    .select({
      isPremium: places.isPremium,
      premiumSince: places.premiumSince,
      premiumLevel: places.premiumLevel,
    })
    .from(places)
    .where(eq(places.id, placeId))
    .limit(1);

  if (place.length === 0) return null;

  return {
    isPremium: place[0].isPremium,
    premiumSince: place[0].premiumSince,
    premiumLevel: place[0].premiumLevel,
  };
}

/**
 * Downgrade a place from premium (admin use or subscription cancellation)
 */
export async function downgradePremium(placeId: number): Promise<boolean> {
  if (!db) return false;

  await db
    .update(places)
    .set({
      isPremium: false,
      premiumLevel: 0,
      updatedAt: new Date(),
    })
    .where(eq(places.id, placeId));

  return true;
}
