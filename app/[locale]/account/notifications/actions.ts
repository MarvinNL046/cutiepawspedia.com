"use server";

import { revalidatePath } from "next/cache";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId } from "@/db/queries/users";
import { updateNotificationSettings } from "@/db/queries/notifications";

export type NotificationSettingsUpdate = {
  emailGeneral: boolean;
  emailReviews: boolean;
  emailFavorites: boolean;
  emailLeads: boolean;
  emailBusiness: boolean;
  emailDigest: boolean;
  locale?: string;
};

export type NotificationSettingsResult = {
  success: boolean;
  error?: string;
};

/**
 * Update notification settings for the current user
 */
export async function updateNotificationSettingsAction(
  settings: NotificationSettingsUpdate
): Promise<NotificationSettingsResult> {
  try {
    // Check authentication
    if (!stackServerApp) {
      return { success: false, error: "Authentication not configured" };
    }

    const stackUser = await stackServerApp.getUser();
    if (!stackUser) {
      return { success: false, error: "Not authenticated" };
    }

    // Get internal user
    const user = await getUserByStackAuthId(stackUser.id);
    if (!user) {
      return { success: false, error: "User not found" };
    }

    // Update settings
    await updateNotificationSettings(user.id, {
      emailGeneral: settings.emailGeneral,
      emailReviews: settings.emailReviews,
      emailFavorites: settings.emailFavorites,
      emailLeads: settings.emailLeads,
      emailBusiness: settings.emailBusiness,
      emailDigest: settings.emailDigest,
      locale: settings.locale || null,
    });

    // Revalidate the page
    revalidatePath("/account/notifications");

    return { success: true };
  } catch (error) {
    console.error("Error updating notification settings:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update settings",
    };
  }
}
