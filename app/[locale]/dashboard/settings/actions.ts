/**
 * Settings Page Server Actions
 *
 * Server actions for updating user notification settings.
 * Part of N2: Notifications v2 - Advanced Settings
 */

"use server";

import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId } from "@/db/queries";
import { updateNotificationSettings, getOrCreateNotificationSettings } from "@/db/queries/notifications";
import type { NotificationSettingsData } from "@/components/dashboard/NotificationSettings";

/**
 * Get the current user's notification settings
 */
export async function getNotificationSettingsAction(): Promise<{
  success: boolean;
  settings?: NotificationSettingsData;
  error?: string;
}> {
  try {
    const stackUser = await stackServerApp?.getUser();
    if (!stackUser) {
      return { success: false, error: "Not authenticated" };
    }

    const dbUser = await getUserByStackAuthId(stackUser.id);
    if (!dbUser) {
      return { success: false, error: "User not found" };
    }

    const settings = await getOrCreateNotificationSettings(dbUser.id);

    return {
      success: true,
      settings: {
        emailGeneral: settings.emailGeneral,
        emailReviews: settings.emailReviews,
        emailFavorites: settings.emailFavorites,
        emailLeads: settings.emailLeads,
        emailBusiness: settings.emailBusiness,
        emailDigest: settings.emailDigest,
        locale: settings.locale,
        quietHoursEnabled: settings.quietHoursEnabled,
        quietHoursStart: settings.quietHoursStart,
        quietHoursEnd: settings.quietHoursEnd,
        timezone: settings.timezone,
        maxEmailsPerWeek: settings.maxEmailsPerWeek,
      },
    };
  } catch (error) {
    console.error("Error getting notification settings:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get settings",
    };
  }
}

/**
 * Update the current user's notification settings
 */
export async function updateNotificationSettingsAction(
  updates: Partial<NotificationSettingsData>
): Promise<{ success: boolean; error?: string }> {
  try {
    const stackUser = await stackServerApp?.getUser();
    if (!stackUser) {
      return { success: false, error: "Not authenticated" };
    }

    const dbUser = await getUserByStackAuthId(stackUser.id);
    if (!dbUser) {
      return { success: false, error: "User not found" };
    }

    // Validate quiet hours if provided
    if (updates.quietHoursStart !== undefined || updates.quietHoursEnd !== undefined) {
      const start = updates.quietHoursStart ?? 22;
      const end = updates.quietHoursEnd ?? 8;
      if (start < 0 || start > 23 || end < 0 || end > 23) {
        return { success: false, error: "Invalid quiet hours" };
      }
    }

    // Validate max emails per week
    if (updates.maxEmailsPerWeek !== undefined && updates.maxEmailsPerWeek !== null) {
      if (updates.maxEmailsPerWeek < 1 || updates.maxEmailsPerWeek > 1000) {
        return { success: false, error: "Invalid email limit" };
      }
    }

    // Transform null values to undefined for database compatibility
    const dbUpdates = {
      ...updates,
      quietHoursStart: updates.quietHoursStart ?? undefined,
      quietHoursEnd: updates.quietHoursEnd ?? undefined,
    };

    await updateNotificationSettings(dbUser.id, dbUpdates);

    return { success: true };
  } catch (error) {
    console.error("Error updating notification settings:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update settings",
    };
  }
}
