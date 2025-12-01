import { eq } from "drizzle-orm";
import { db } from "../index";
import { users } from "../schema";

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
}) {
  if (!db) return null;

  const existingUser = await getUserByStackAuthId(data.stackauthId);

  if (existingUser) {
    // Update existing user
    const [updated] = await db
      .update(users)
      .set({
        email: data.email,
        name: data.name,
        updatedAt: new Date(),
      })
      .where(eq(users.stackauthId, data.stackauthId))
      .returning();
    return updated;
  }

  // Create new user
  const [newUser] = await db
    .insert(users)
    .values({
      stackauthId: data.stackauthId,
      email: data.email,
      name: data.name,
      role: "user",
    })
    .returning();
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
