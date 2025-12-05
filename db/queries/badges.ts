import { eq, and, desc, asc, sql } from "drizzle-orm";
import { db } from "../index";
import { badgeDefinitions, userBadges, users } from "../schema";

// ============================================================================
// BADGE MANAGEMENT (P3)
// ============================================================================

/**
 * Badge definition type
 */
export interface BadgeDefinition {
  key: string;
  label: string;
  labelNl: string | null;
  description: string;
  descriptionNl: string | null;
  icon: string;
  category: string;
  sortOrder: number;
  isActive: boolean;
}

/**
 * User badge type (awarded badge)
 */
export interface UserBadge {
  id: number;
  userId: number;
  badgeKey: string;
  awardedAt: Date;
  awardedBy: string | null;
  notes: string | null;
  badge: BadgeDefinition;
}

/**
 * Get all active badge definitions
 */
export async function getAllBadgeDefinitions(): Promise<BadgeDefinition[]> {
  if (!db) return [];

  const badges = await db.query.badgeDefinitions.findMany({
    where: eq(badgeDefinitions.isActive, true),
    orderBy: [asc(badgeDefinitions.sortOrder)],
  });

  return badges;
}

/**
 * Get badges grouped by category
 */
export async function getBadgesByCategory(): Promise<Record<string, BadgeDefinition[]>> {
  const badges = await getAllBadgeDefinitions();

  return badges.reduce((acc, badge) => {
    const category = badge.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push(badge);
    return acc;
  }, {} as Record<string, BadgeDefinition[]>);
}

/**
 * Get a single badge definition by key
 */
export async function getBadgeDefinition(key: string): Promise<BadgeDefinition | null> {
  if (!db) return null;

  return db.query.badgeDefinitions.findFirst({
    where: eq(badgeDefinitions.key, key),
  });
}

/**
 * Get all badges for a user
 */
export async function getBadgesForUser(userId: number): Promise<UserBadge[]> {
  if (!db) return [];

  const badges = await db.query.userBadges.findMany({
    where: eq(userBadges.userId, userId),
    with: {
      badge: true,
    },
    orderBy: [desc(userBadges.awardedAt)],
  });

  return badges as UserBadge[];
}

/**
 * Check if user has a specific badge
 */
export async function userHasBadge(userId: number, badgeKey: string): Promise<boolean> {
  if (!db) return false;

  const badge = await db.query.userBadges.findFirst({
    where: and(
      eq(userBadges.userId, userId),
      eq(userBadges.badgeKey, badgeKey)
    ),
  });

  return !!badge;
}

/**
 * Award a badge to a user
 */
export async function awardBadge(
  userId: number,
  badgeKey: string,
  awardedBy: string = "system",
  notes?: string
): Promise<UserBadge | null> {
  if (!db) return null;

  // Check if user already has this badge
  const existing = await userHasBadge(userId, badgeKey);
  if (existing) return null;

  // Check if badge definition exists and is active
  const badgeDef = await getBadgeDefinition(badgeKey);
  if (!badgeDef || !badgeDef.isActive) return null;

  // Award the badge
  const [newBadge] = await db
    .insert(userBadges)
    .values({
      userId,
      badgeKey,
      awardedBy,
      notes,
    })
    .returning();

  if (!newBadge) return null;

  // Return with badge definition
  return {
    ...newBadge,
    badge: badgeDef,
  };
}

/**
 * Remove a badge from a user
 */
export async function removeBadge(userId: number, badgeKey: string): Promise<boolean> {
  if (!db) return false;

  const result = await db
    .delete(userBadges)
    .where(
      and(
        eq(userBadges.userId, userId),
        eq(userBadges.badgeKey, badgeKey)
      )
    );

  return true;
}

/**
 * Get users who have a specific badge
 */
export async function getUsersWithBadge(badgeKey: string, limit = 10): Promise<Array<{
  userId: number;
  username: string | null;
  name: string | null;
  avatarUrl: string | null;
  awardedAt: Date;
}>> {
  if (!db) return [];

  const results = await db
    .select({
      userId: users.id,
      username: users.username,
      name: users.name,
      avatarUrl: users.avatarUrl,
      awardedAt: userBadges.awardedAt,
    })
    .from(userBadges)
    .innerJoin(users, eq(userBadges.userId, users.id))
    .where(eq(userBadges.badgeKey, badgeKey))
    .orderBy(desc(userBadges.awardedAt))
    .limit(limit);

  return results;
}

/**
 * Get badge count for a user
 */
export async function getBadgeCount(userId: number): Promise<number> {
  if (!db) return 0;

  const result = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(userBadges)
    .where(eq(userBadges.userId, userId));

  return result[0]?.count ?? 0;
}

/**
 * Get recent badge awards (for activity feeds)
 */
export async function getRecentBadgeAwards(limit = 20): Promise<Array<{
  userId: number;
  username: string | null;
  name: string | null;
  avatarUrl: string | null;
  badgeKey: string;
  badgeLabel: string;
  badgeIcon: string;
  awardedAt: Date;
}>> {
  if (!db) return [];

  const results = await db
    .select({
      userId: users.id,
      username: users.username,
      name: users.name,
      avatarUrl: users.avatarUrl,
      badgeKey: userBadges.badgeKey,
      badgeLabel: badgeDefinitions.label,
      badgeIcon: badgeDefinitions.icon,
      awardedAt: userBadges.awardedAt,
    })
    .from(userBadges)
    .innerJoin(users, eq(userBadges.userId, users.id))
    .innerJoin(badgeDefinitions, eq(userBadges.badgeKey, badgeDefinitions.key))
    .where(eq(users.isPublic, true)) // Only public profiles
    .orderBy(desc(userBadges.awardedAt))
    .limit(limit);

  return results;
}

// ============================================================================
// BADGE AUTO-AWARD LOGIC
// ============================================================================

/**
 * Check and award badges based on user activity
 * Called after certain actions (reviews, photos, etc.)
 */
export async function checkAndAwardBadges(userId: number): Promise<string[]> {
  if (!db) return [];

  const awarded: string[] = [];

  // Get user stats
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
    with: {
      reviews: {
        where: eq(sql`${true}`, sql`${true}`), // All reviews
      },
    },
  });

  if (!user) return [];

  // Count published reviews
  const publishedReviews = user.reviews?.filter((r) => r.status === "published") || [];
  const reviewCount = publishedReviews.length;

  // Top Reviewer badge: 10+ reviews
  if (reviewCount >= 10) {
    const badge = await awardBadge(userId, "top_reviewer", "system", "Awarded for writing 10+ reviews");
    if (badge) awarded.push("top_reviewer");
  }

  // Helpful Reviewer badge would require tracking "helpful" votes (future feature)

  // More badge checks can be added here based on business logic

  return awarded;
}

// ============================================================================
// TYPES
// ============================================================================

export type { BadgeDefinition, UserBadge };
