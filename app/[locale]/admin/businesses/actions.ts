"use server";

import { revalidatePath } from "next/cache";
import { getAdminUser } from "@/lib/auth/admin";
import { db } from "@/db";
import { places, businesses, creditTransactions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { logAuditEvent } from "@/db/queries/auditLogs";

export type AdminActionResult = {
  success: boolean;
  error?: string;
};

/**
 * Admin action to toggle premium status for a place
 */
export async function togglePlacePremiumAction(
  placeId: number,
  isPremium: boolean
): Promise<AdminActionResult> {
  try {
    const adminResult = await getAdminUser();
    if (!adminResult.authorized || !adminResult.user) {
      return { success: false, error: "Unauthorized" };
    }

    if (!db) {
      return { success: false, error: "Database not available" };
    }

    await db
      .update(places)
      .set({
        isPremium,
        premiumSince: isPremium ? new Date() : null,
        premiumLevel: isPremium ? 1 : 0,
        updatedAt: new Date(),
      })
      .where(eq(places.id, placeId));

    // Log PREMIUM_TOGGLE_ADMIN audit event
    logAuditEvent({
      actorUserId: adminResult.user.id,
      actorRole: "admin",
      eventType: "PREMIUM_TOGGLE_ADMIN",
      targetType: "place",
      targetId: placeId,
      metadata: {
        action: isPremium ? "enabled" : "disabled",
      },
    });

    revalidatePath("/admin/businesses");
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error("Error toggling premium:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to toggle premium",
    };
  }
}

/**
 * Admin action to manually adjust credits for a business
 */
export async function adminAdjustCreditsAction(data: {
  businessId: number;
  amountCents: number;
  reason: string;
}): Promise<AdminActionResult> {
  try {
    const adminResult = await getAdminUser();
    if (!adminResult.authorized || !adminResult.user) {
      return { success: false, error: "Unauthorized" };
    }

    if (!db) {
      return { success: false, error: "Database not available" };
    }

    const { businessId, amountCents, reason } = data;

    // Get current balance
    const business = await db
      .select({ creditBalanceCents: businesses.creditBalanceCents })
      .from(businesses)
      .where(eq(businesses.id, businessId))
      .limit(1);

    if (business.length === 0) {
      return { success: false, error: "Business not found" };
    }

    const currentBalance = business[0].creditBalanceCents ?? 0;
    const newBalance = currentBalance + amountCents;

    if (newBalance < 0) {
      return { success: false, error: "Cannot set negative balance" };
    }

    // Create transaction record
    await db.insert(creditTransactions).values({
      businessId,
      amountCents,
      type: amountCents > 0 ? "bonus" : "refund",
      description: `Admin adjustment: ${reason} (by ${adminResult.user.email})`,
      balanceAfterCents: newBalance,
      metadata: {
        adminId: adminResult.user.id,
        adminEmail: adminResult.user.email,
        reason,
      },
    });

    // Update business balance
    await db
      .update(businesses)
      .set({
        creditBalanceCents: newBalance,
        updatedAt: new Date(),
      })
      .where(eq(businesses.id, businessId));

    // Log ADMIN_CREDIT_ADJUSTMENT audit event
    logAuditEvent({
      actorUserId: adminResult.user.id,
      actorBusinessId: businessId,
      actorRole: "admin",
      eventType: "ADMIN_CREDIT_ADJUSTMENT",
      targetType: "business",
      targetId: businessId,
      metadata: {
        amountCents,
        reason,
        previousBalanceCents: currentBalance,
        newBalanceCents: newBalance,
      },
    });

    revalidatePath("/admin/businesses");
    revalidatePath("/admin/credits");
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error("Error adjusting credits:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to adjust credits",
    };
  }
}
