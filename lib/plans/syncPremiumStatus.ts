/**
 * Sync Premium Status
 *
 * Automatically sets is_premium on places based on business plan.
 * PRO and ELITE plans get is_premium = true
 */

import { db } from "@/db";
import { places, businesses } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { PlanKey } from "./config";

/**
 * Plans that grant premium status
 */
const PREMIUM_PLANS: PlanKey[] = ["PRO", "ELITE"];

/**
 * Check if a plan grants premium status
 */
export function isPremiumPlan(planKey: PlanKey | string | null): boolean {
  return PREMIUM_PLANS.includes(planKey as PlanKey);
}

/**
 * Sync is_premium status for all places belonging to a business
 * Call this when:
 * - Business plan changes (upgrade/downgrade)
 * - New place is created for a business
 */
export async function syncPremiumStatusForBusiness(businessId: number): Promise<{
  success: boolean;
  placesUpdated: number;
  isPremium: boolean;
}> {
  if (!db) {
    return { success: false, placesUpdated: 0, isPremium: false };
  }

  try {
    // Get business plan
    const [business] = await db
      .select({ planKey: businesses.planKey })
      .from(businesses)
      .where(eq(businesses.id, businessId))
      .limit(1);

    if (!business) {
      return { success: false, placesUpdated: 0, isPremium: false };
    }

    const shouldBePremium = isPremiumPlan(business.planKey);

    // Update all places for this business
    const result = await db
      .update(places)
      .set({
        isPremium: shouldBePremium,
        premiumSince: shouldBePremium ? new Date() : null,
        premiumLevel: shouldBePremium ? 1 : 0,
        updatedAt: new Date(),
      })
      .where(eq(places.businessId, businessId))
      .returning({ id: places.id });

    console.log(
      `[syncPremiumStatus] Business ${businessId}: ${result.length} places updated to isPremium=${shouldBePremium}`
    );

    return {
      success: true,
      placesUpdated: result.length,
      isPremium: shouldBePremium,
    };
  } catch (error) {
    console.error("[syncPremiumStatus] Error:", error);
    return { success: false, placesUpdated: 0, isPremium: false };
  }
}

/**
 * Sync is_premium status for ALL businesses
 * Use this for initial migration or periodic cleanup
 */
export async function syncAllPremiumStatuses(): Promise<{
  success: boolean;
  businessesProcessed: number;
  totalPlacesUpdated: number;
}> {
  if (!db) {
    return { success: false, businessesProcessed: 0, totalPlacesUpdated: 0 };
  }

  try {
    // Get all businesses with their plans
    const allBusinesses = await db
      .select({ id: businesses.id, planKey: businesses.planKey })
      .from(businesses);

    let totalPlacesUpdated = 0;

    for (const business of allBusinesses) {
      const result = await syncPremiumStatusForBusiness(business.id);
      totalPlacesUpdated += result.placesUpdated;
    }

    console.log(
      `[syncAllPremiumStatuses] Processed ${allBusinesses.length} businesses, updated ${totalPlacesUpdated} places`
    );

    return {
      success: true,
      businessesProcessed: allBusinesses.length,
      totalPlacesUpdated,
    };
  } catch (error) {
    console.error("[syncAllPremiumStatuses] Error:", error);
    return { success: false, businessesProcessed: 0, totalPlacesUpdated: 0 };
  }
}
