import { eq } from "drizzle-orm";
import { db } from "../index";
import { users } from "../schema";
import { sendNotification } from "@/lib/notifications/sendNotification";
import { awardBadge } from "./badges";

// ============================================================================
// USER MANAGEMENT
// ============================================================================

/**
 * Get user by StackAuth ID
 */
export async function getUserByStackAuthId(stackauthId: string) {
  if (!db) return null;
  return db.query.users.findFirst({
    where: eq(users.stackauthId, stackauthId),
  });
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string) {
  if (!db) return null;
  return db.query.users.findFirst({
    where: eq(users.email, email),
  });
}

/**
 * Create or update user from StackAuth
 * Called after successful login/signup to sync user data
 */
export async function upsertUserFromStackAuth(data: {
  stackauthId: string;
  email: string;
  name?: string | null;
  emailVerified?: boolean;
}) {
  if (!db) return null;

  const existingUser = await getUserByStackAuthId(data.stackauthId);

  if (existingUser) {
    // Check if email just became verified
    const justVerified = data.emailVerified === true && !existingUser.emailVerified;

    // Update existing user
    const [updated] = await db
      .update(users)
      .set({
        email: data.email,
        name: data.name,
        emailVerified: data.emailVerified ?? existingUser.emailVerified,
        updatedAt: new Date(),
      })
      .where(eq(users.stackauthId, data.stackauthId))
      .returning();

    // Award verified_user badge if email just became verified
    if (justVerified && updated) {
      awardBadge(updated.id, "verified_user", "system", "Email verified via StackAuth").catch(
        (error) => console.error("Failed to award verified badge:", error)
      );
    }

    return updated;
  }

  // Create new user
  const [newUser] = await db
    .insert(users)
    .values({
      stackauthId: data.stackauthId,
      email: data.email,
      emailVerified: data.emailVerified ?? false,
      name: data.name,
      role: "user",
    })
    .returning();

  if (newUser) {
    // Send welcome email to new user (async, don't await to avoid blocking)
    sendNotification({
      type: "USER_WELCOME",
      userId: newUser.id,
      userEmail: newUser.email,
      userName: newUser.name || undefined,
    }).catch((error) => {
      console.error("Failed to send welcome email:", error);
    });

    // Award verified_user badge if already verified on signup
    if (data.emailVerified) {
      awardBadge(newUser.id, "verified_user", "system", "Email verified via StackAuth").catch(
        (error) => console.error("Failed to award verified badge:", error)
      );
    }
  }

  return newUser;
}

/**
 * Get user by ID
 */
export async function getUserById(userId: number) {
  if (!db) return null;
  return db.query.users.findFirst({
    where: eq(users.id, userId),
  });
}

/**
 * Delete user and all associated data (GDPR compliance)
 * This performs a cascade delete of all user data
 */
export async function deleteUserAccount(userId: number): Promise<{
  success: boolean;
  deletedData: {
    favorites: number;
    recentViews: number;
    reviews: number;
    businesses: number;
    notifications: number;
    badges: number;
    karmaEvents: number;
  };
  error?: string;
}> {
  if (!db) {
    return { success: false, deletedData: { favorites: 0, recentViews: 0, reviews: 0, businesses: 0, notifications: 0, badges: 0, karmaEvents: 0 }, error: "Database not available" };
  }

  const deletedData = {
    favorites: 0,
    recentViews: 0,
    reviews: 0,
    businesses: 0,
    notifications: 0,
    badges: 0,
    karmaEvents: 0,
  };

  try {
    // Import all tables we need to clean up
    const {
      userFavorites,
      userRecentViews,
      reviews,
      businesses,
      notificationSettings,
      notificationLogs,
      businessNotifications,
      userBadges,
      karmaEvents,
      leads,
      messages,
      threads,
    } = await import("../schema");

    // 1. Delete user favorites
    const favoritesResult = await db
      .delete(userFavorites)
      .where(eq(userFavorites.userId, userId))
      .returning({ id: userFavorites.id });
    deletedData.favorites = favoritesResult.length;

    // 2. Delete recent views
    const recentViewsResult = await db
      .delete(userRecentViews)
      .where(eq(userRecentViews.userId, userId))
      .returning({ id: userRecentViews.id });
    deletedData.recentViews = recentViewsResult.length;

    // 3. Delete user's reviews (anonymize instead of delete to keep place stats)
    const reviewsResult = await db
      .update(reviews)
      .set({
        userId: null,
        authorName: "Deleted User",
        updatedAt: new Date(),
      })
      .where(eq(reviews.userId, userId))
      .returning({ id: reviews.id });
    deletedData.reviews = reviewsResult.length;

    // 4. Get user's businesses to clean up related data
    const userBusinesses = await db
      .select({ id: businesses.id })
      .from(businesses)
      .where(eq(businesses.userId, userId));

    for (const business of userBusinesses) {
      // Delete business notifications
      await db
        .delete(businessNotifications)
        .where(eq(businessNotifications.businessId, business.id));

      // Delete leads for this business
      await db
        .delete(leads)
        .where(eq(leads.businessId, business.id));

      // Delete threads and messages for this business
      const businessThreads = await db
        .select({ id: threads.id })
        .from(threads)
        .where(eq(threads.businessId, business.id));

      for (const thread of businessThreads) {
        await db.delete(messages).where(eq(messages.threadId, thread.id));
      }

      if (businessThreads.length > 0) {
        await db
          .delete(threads)
          .where(eq(threads.businessId, business.id));
      }
    }

    // 5. Delete businesses (set to deleted status or actually delete)
    const businessesResult = await db
      .delete(businesses)
      .where(eq(businesses.userId, userId))
      .returning({ id: businesses.id });
    deletedData.businesses = businessesResult.length;

    // 6. Delete notification settings
    await db
      .delete(notificationSettings)
      .where(eq(notificationSettings.userId, userId));

    // 7. Update notification logs (anonymize, don't delete for audit trail)
    await db
      .update(notificationLogs)
      .set({ userId: null })
      .where(eq(notificationLogs.userId, userId));
    deletedData.notifications = 1; // Just mark as processed

    // 8. Delete user badges
    const badgesResult = await db
      .delete(userBadges)
      .where(eq(userBadges.userId, userId))
      .returning({ id: userBadges.id });
    deletedData.badges = badgesResult.length;

    // 9. Delete karma events
    const karmaResult = await db
      .delete(karmaEvents)
      .where(eq(karmaEvents.userId, userId))
      .returning({ id: karmaEvents.id });
    deletedData.karmaEvents = karmaResult.length;

    // 10. Finally, delete the user record
    await db
      .delete(users)
      .where(eq(users.id, userId));

    return { success: true, deletedData };
  } catch (error) {
    console.error("Failed to delete user account:", error);
    return {
      success: false,
      deletedData,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// ============================================================================
// TYPES
// ============================================================================

export type User = Awaited<ReturnType<typeof getUserById>>;
