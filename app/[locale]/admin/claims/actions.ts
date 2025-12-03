"use server";

import { revalidatePath } from "next/cache";
import { getAdminUser } from "@/lib/auth/admin";
import { approveClaim, rejectClaim } from "@/db/queries/claims";
import { logAuditEvent } from "@/db/queries/auditLogs";

export type ClaimActionResult = {
  success: boolean;
  error?: string;
};

/**
 * Admin action to approve a claim
 */
export async function approveClaimAction(
  claimId: number,
  adminNotes?: string
): Promise<ClaimActionResult> {
  try {
    const adminResult = await getAdminUser();
    if (!adminResult.authorized || !adminResult.user) {
      return { success: false, error: "Unauthorized" };
    }

    await approveClaim(claimId, adminResult.user.id, adminNotes);

    // Log CLAIM_APPROVED audit event
    logAuditEvent({
      actorUserId: adminResult.user.id,
      actorRole: "admin",
      eventType: "CLAIM_APPROVED",
      targetType: "claim",
      targetId: claimId,
      metadata: {
        adminNotes: adminNotes || null,
      },
    });

    revalidatePath("/admin/claims");
    revalidatePath("/admin/businesses");
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error("Error approving claim:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to approve claim",
    };
  }
}

/**
 * Admin action to reject a claim
 */
export async function rejectClaimAction(
  claimId: number,
  adminNotes?: string
): Promise<ClaimActionResult> {
  try {
    const adminResult = await getAdminUser();
    if (!adminResult.authorized || !adminResult.user) {
      return { success: false, error: "Unauthorized" };
    }

    await rejectClaim(claimId, adminResult.user.id, adminNotes);

    // Log CLAIM_REJECTED audit event
    logAuditEvent({
      actorUserId: adminResult.user.id,
      actorRole: "admin",
      eventType: "CLAIM_REJECTED",
      targetType: "claim",
      targetId: claimId,
      metadata: {
        adminNotes: adminNotes || null,
      },
    });

    revalidatePath("/admin/claims");
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error("Error rejecting claim:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to reject claim",
    };
  }
}
