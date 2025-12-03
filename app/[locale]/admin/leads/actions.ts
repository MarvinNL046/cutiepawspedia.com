"use server";

import { revalidatePath } from "next/cache";
import { getAdminUser } from "@/lib/auth/admin";
import { db } from "@/db";
import { leads, businesses, creditTransactions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { logAuditEvent } from "@/db/queries/auditLogs";

export type LeadActionResult = {
  success: boolean;
  error?: string;
};

/**
 * Admin action to mark a lead as spam and refund credits to the business
 */
export async function markLeadAsSpamAction(
  leadId: number,
  reason?: string
): Promise<LeadActionResult> {
  try {
    const adminResult = await getAdminUser();
    if (!adminResult.authorized || !adminResult.user) {
      return { success: false, error: "Unauthorized" };
    }

    if (!db) {
      return { success: false, error: "Database not available" };
    }

    // Get the lead
    const lead = await db
      .select({
        id: leads.id,
        businessId: leads.businessId,
        status: leads.status,
        priceCents: leads.priceCents,
        chargedAt: leads.chargedAt,
      })
      .from(leads)
      .where(eq(leads.id, leadId))
      .limit(1);

    if (lead.length === 0) {
      return { success: false, error: "Lead not found" };
    }

    if (lead[0].status === "spam") {
      return { success: false, error: "Lead is already marked as spam" };
    }

    // Mark lead as spam
    await db
      .update(leads)
      .set({ status: "spam" })
      .where(eq(leads.id, leadId));

    // If the lead was charged, refund the business
    if (lead[0].chargedAt && lead[0].priceCents && lead[0].businessId) {
      const business = await db
        .select({ creditBalanceCents: businesses.creditBalanceCents })
        .from(businesses)
        .where(eq(businesses.id, lead[0].businessId))
        .limit(1);

      if (business.length > 0) {
        const currentBalance = business[0].creditBalanceCents ?? 0;
        const newBalance = currentBalance + lead[0].priceCents;

        // Create refund transaction
        await db.insert(creditTransactions).values({
          businessId: lead[0].businessId,
          amountCents: lead[0].priceCents,
          type: "refund",
          description: `Spam lead refund${reason ? `: ${reason}` : ""} (Lead #${leadId})`,
          leadId: leadId,
          balanceAfterCents: newBalance,
          metadata: {
            adminId: adminResult.user.id,
            adminEmail: adminResult.user.email,
            reason: reason || "Spam lead",
            originalCharge: lead[0].priceCents,
          },
        });

        // Update business balance
        await db
          .update(businesses)
          .set({
            creditBalanceCents: newBalance,
            updatedAt: new Date(),
          })
          .where(eq(businesses.id, lead[0].businessId));
      }
    }

    // Log LEAD_SPAM audit event
    logAuditEvent({
      actorUserId: adminResult.user.id,
      actorRole: "admin",
      eventType: "LEAD_SPAM",
      targetType: "lead",
      targetId: leadId,
      metadata: {
        businessId: lead[0].businessId,
        reason: reason || "Spam lead",
        refundedCents: lead[0].chargedAt ? lead[0].priceCents : 0,
      },
    });

    revalidatePath("/admin/leads");
    revalidatePath("/admin/credits");
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error("Error marking lead as spam:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to mark lead as spam",
    };
  }
}

/**
 * Admin action to refund a lead charge (without marking as spam)
 */
export async function refundLeadAction(
  leadId: number,
  reason: string
): Promise<LeadActionResult> {
  try {
    const adminResult = await getAdminUser();
    if (!adminResult.authorized || !adminResult.user) {
      return { success: false, error: "Unauthorized" };
    }

    if (!db) {
      return { success: false, error: "Database not available" };
    }

    // Get the lead
    const lead = await db
      .select({
        id: leads.id,
        businessId: leads.businessId,
        priceCents: leads.priceCents,
        chargedAt: leads.chargedAt,
      })
      .from(leads)
      .where(eq(leads.id, leadId))
      .limit(1);

    if (lead.length === 0) {
      return { success: false, error: "Lead not found" };
    }

    if (!lead[0].chargedAt || !lead[0].priceCents) {
      return { success: false, error: "Lead was not charged" };
    }

    if (!lead[0].businessId) {
      return { success: false, error: "Lead has no associated business" };
    }

    // Get business balance
    const business = await db
      .select({ creditBalanceCents: businesses.creditBalanceCents })
      .from(businesses)
      .where(eq(businesses.id, lead[0].businessId))
      .limit(1);

    if (business.length === 0) {
      return { success: false, error: "Business not found" };
    }

    const currentBalance = business[0].creditBalanceCents ?? 0;
    const newBalance = currentBalance + lead[0].priceCents;

    // Create refund transaction
    await db.insert(creditTransactions).values({
      businessId: lead[0].businessId,
      amountCents: lead[0].priceCents,
      type: "refund",
      description: `Lead refund: ${reason} (Lead #${leadId})`,
      leadId: leadId,
      balanceAfterCents: newBalance,
      metadata: {
        adminId: adminResult.user.id,
        adminEmail: adminResult.user.email,
        reason,
        originalCharge: lead[0].priceCents,
      },
    });

    // Update business balance
    await db
      .update(businesses)
      .set({
        creditBalanceCents: newBalance,
        updatedAt: new Date(),
      })
      .where(eq(businesses.id, lead[0].businessId));

    // Log LEAD_REFUND audit event
    logAuditEvent({
      actorUserId: adminResult.user.id,
      actorRole: "admin",
      eventType: "LEAD_REFUND",
      targetType: "lead",
      targetId: leadId,
      metadata: {
        businessId: lead[0].businessId,
        reason,
        refundedCents: lead[0].priceCents,
      },
    });

    revalidatePath("/admin/leads");
    revalidatePath("/admin/credits");
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error("Error refunding lead:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to refund lead",
    };
  }
}

/**
 * Admin action to update lead status
 */
export async function updateLeadStatusAction(
  leadId: number,
  status: "new" | "sent" | "viewed" | "converted" | "spam"
): Promise<LeadActionResult> {
  try {
    const adminResult = await getAdminUser();
    if (!adminResult.authorized || !adminResult.user) {
      return { success: false, error: "Unauthorized" };
    }

    if (!db) {
      return { success: false, error: "Database not available" };
    }

    await db
      .update(leads)
      .set({ status })
      .where(eq(leads.id, leadId));

    revalidatePath("/admin/leads");

    return { success: true };
  } catch (error) {
    console.error("Error updating lead status:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update lead status",
    };
  }
}
