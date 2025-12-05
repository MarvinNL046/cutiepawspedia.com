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

// ============================================================================
// TYPES
// ============================================================================

export type User = Awaited<ReturnType<typeof getUserById>>;
