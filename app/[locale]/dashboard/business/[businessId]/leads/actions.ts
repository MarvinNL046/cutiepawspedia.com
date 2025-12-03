"use server";

import { revalidatePath } from "next/cache";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId, getBusinessByIdForUser, updateLeadStatus } from "@/db/queries";
import { getBusinessById } from "@/db/queries/businesses";
import type { LeadStatus } from "@/db/queries/leads";

export async function updateLeadStatusAction(formData: FormData): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    // Get form values
    const leadId = parseInt(formData.get("leadId") as string, 10);
    const businessId = parseInt(formData.get("businessId") as string, 10);
    const status = formData.get("status") as LeadStatus;
    const locale = (formData.get("locale") as string) || "en";

    if (isNaN(leadId) || isNaN(businessId) || !status) {
      return { success: false, error: "Invalid request parameters" };
    }

    // Validate status
    const validStatuses: LeadStatus[] = ["new", "sent", "viewed", "converted", "spam"];
    if (!validStatuses.includes(status)) {
      return { success: false, error: "Invalid status" };
    }

    // Auth check
    const stackUser = await stackServerApp?.getUser();
    if (!stackUser) {
      return { success: false, error: "Unauthorized" };
    }

    const dbUser = await getUserByStackAuthId(stackUser.id);
    if (!dbUser) {
      return { success: false, error: "User not found" };
    }

    // Verify business ownership (admin bypass)
    let business;
    if (dbUser.role === "admin") {
      business = await getBusinessById(businessId);
    } else {
      business = await getBusinessByIdForUser({ businessId, userId: dbUser.id });
    }

    if (!business) {
      return { success: false, error: "Business not found or access denied" };
    }

    // Update the lead status
    const result = await updateLeadStatus({
      leadId,
      businessId,
      status,
    });

    if (!result.success) {
      return { success: false, error: result.error };
    }

    // Revalidate the leads page
    revalidatePath(`/${locale}/dashboard/business/${businessId}/leads`);

    return { success: true };
  } catch (error) {
    console.error("Error updating lead status:", error);
    return { success: false, error: "Failed to update lead status" };
  }
}
