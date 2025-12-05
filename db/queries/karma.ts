import { eq, desc, sql, and, gte, lte, asc } from "drizzle-orm";
import { db } from "../index";
import { users, karmaEvents, trustLevelDefinitions } from "../schema";

// ============================================================================
// KARMA POINT VALUES
// ============================================================================

export const KARMA_POINTS = {
  // Positive actions
  REVIEW_CREATED: 10,
  FIRST_REVIEW_BONUS: 25,
  REVIEW_HELPFUL: 5,
  PHOTO_APPROVED: 3,
  BADGE_EARNED: 15,
  BADGE_EARNED_SPECIAL: 50,
  PROFILE_COMPLETED: 10,
  BUSINESS_VERIFIED: 20,

  // Negative actions
  REVIEW_REJECTED: -5,
  REVIEW_FLAGGED: -10,
  PHOTO_REJECTED: -2,
  SPAM_WARNING: -25,
} as const;

export type KarmaEventType = keyof typeof KARMA_POINTS;

// ============================================================================
// KARMA EVENT TYPES
// ============================================================================

export interface KarmaEvent {
  id: number;
  userId: number;
  eventType: string;
  points: number;
  description: string | null;
  reviewId: number | null;
  placeId: number | null;
  badgeKey: string | null;
  createdAt: Date;
}

export interface TrustLevel {
  level: number;
  name: string;
  nameNl: string | null;
  description: string;
  descriptionNl: string | null;
  minKarma: number;
  icon: string | null;
  color: string | null;
  canReview: boolean;
  canUploadPhotos: boolean;
  maxPhotosPerReview: number | null;
  reviewsAutoApproved: boolean;
  canFlagReviews: boolean;
}

// ============================================================================
// KARMA MANAGEMENT
// ============================================================================

/**
 * Award karma points to a user
 */
export async function awardKarma(
  userId: number,
  eventType: KarmaEventType | string,
  customPoints?: number,
  options?: {
    description?: string;
    reviewId?: number;
    placeId?: number;
    badgeKey?: string;
    metadata?: Record<string, unknown>;
  }
): Promise<KarmaEvent | null> {
  if (!db) return null;

  const points = customPoints ?? (KARMA_POINTS as Record<string, number>)[eventType] ?? 0;

  // Insert karma event
  const [event] = await db
    .insert(karmaEvents)
    .values({
      userId,
      eventType,
      points,
      description: options?.description,
      reviewId: options?.reviewId,
      placeId: options?.placeId,
      badgeKey: options?.badgeKey,
      metadata: options?.metadata,
    })
    .returning();

  if (!event) return null;

  // Update user's karma points and trust level
  await recalculateUserKarma(userId);

  return event;
}

/**
 * Recalculate user's total karma and trust level
 */
export async function recalculateUserKarma(userId: number): Promise<{ karmaPoints: number; trustLevel: number } | null> {
  if (!db) return null;

  // Sum all karma events for user
  const result = await db
    .select({ total: sql<number>`COALESCE(SUM(${karmaEvents.points}), 0)::int` })
    .from(karmaEvents)
    .where(eq(karmaEvents.userId, userId));

  const totalKarma = result[0]?.total ?? 0;

  // Determine trust level based on karma
  const trustLevel = await calculateTrustLevel(totalKarma);

  // Update user
  await db
    .update(users)
    .set({
      karmaPoints: totalKarma,
      trustLevel,
      karmaUpdatedAt: new Date(),
    })
    .where(eq(users.id, userId));

  return { karmaPoints: totalKarma, trustLevel };
}

/**
 * Calculate trust level based on karma points
 */
export async function calculateTrustLevel(karmaPoints: number): Promise<number> {
  if (!db) return 0;

  const levels = await db
    .select()
    .from(trustLevelDefinitions)
    .where(lte(trustLevelDefinitions.minKarma, karmaPoints))
    .orderBy(desc(trustLevelDefinitions.level))
    .limit(1);

  return levels[0]?.level ?? 0;
}

/**
 * Get karma events for a user
 */
export async function getKarmaEventsForUser(
  userId: number,
  limit = 20,
  offset = 0
): Promise<KarmaEvent[]> {
  if (!db) return [];

  return db.query.karmaEvents.findMany({
    where: eq(karmaEvents.userId, userId),
    orderBy: [desc(karmaEvents.createdAt)],
    limit,
    offset,
  });
}

/**
 * Get user's karma summary
 */
export async function getUserKarmaSummary(userId: number): Promise<{
  totalKarma: number;
  trustLevel: number;
  trustLevelInfo: TrustLevel | null;
  recentEvents: KarmaEvent[];
  nextLevel: TrustLevel | null;
  karmaToNextLevel: number;
} | null> {
  if (!db) return null;

  // Get user
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
    columns: {
      karmaPoints: true,
      trustLevel: true,
    },
  });

  if (!user) return null;

  // Get current trust level info
  const trustLevelInfo = await db.query.trustLevelDefinitions.findFirst({
    where: eq(trustLevelDefinitions.level, user.trustLevel),
  });

  // Get next trust level
  const nextLevel = await db.query.trustLevelDefinitions.findFirst({
    where: eq(trustLevelDefinitions.level, user.trustLevel + 1),
  });

  // Get recent karma events
  const recentEvents = await getKarmaEventsForUser(userId, 5);

  // Calculate karma to next level
  const karmaToNextLevel = nextLevel ? nextLevel.minKarma - user.karmaPoints : 0;

  return {
    totalKarma: user.karmaPoints,
    trustLevel: user.trustLevel,
    trustLevelInfo: trustLevelInfo || null,
    recentEvents,
    nextLevel: nextLevel || null,
    karmaToNextLevel: Math.max(0, karmaToNextLevel),
  };
}

// ============================================================================
// TRUST LEVEL QUERIES
// ============================================================================

/**
 * Get all trust level definitions
 */
export async function getAllTrustLevels(): Promise<TrustLevel[]> {
  if (!db) return [];

  return db.query.trustLevelDefinitions.findMany({
    orderBy: [asc(trustLevelDefinitions.level)],
  });
}

/**
 * Get trust level by level number
 */
export async function getTrustLevel(level: number): Promise<TrustLevel | null> {
  if (!db) return null;

  return db.query.trustLevelDefinitions.findFirst({
    where: eq(trustLevelDefinitions.level, level),
  });
}

/**
 * Get user's privileges based on trust level
 */
export async function getUserPrivileges(userId: number): Promise<{
  canReview: boolean;
  canUploadPhotos: boolean;
  maxPhotosPerReview: number;
  reviewsAutoApproved: boolean;
  canFlagReviews: boolean;
}> {
  if (!db) {
    return {
      canReview: true,
      canUploadPhotos: true,
      maxPhotosPerReview: 3,
      reviewsAutoApproved: false,
      canFlagReviews: false,
    };
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
    columns: { trustLevel: true },
  });

  if (!user) {
    return {
      canReview: true,
      canUploadPhotos: true,
      maxPhotosPerReview: 3,
      reviewsAutoApproved: false,
      canFlagReviews: false,
    };
  }

  const level = await getTrustLevel(user.trustLevel);

  return {
    canReview: level?.canReview ?? true,
    canUploadPhotos: level?.canUploadPhotos ?? true,
    maxPhotosPerReview: level?.maxPhotosPerReview ?? 3,
    reviewsAutoApproved: level?.reviewsAutoApproved ?? false,
    canFlagReviews: level?.canFlagReviews ?? false,
  };
}

// ============================================================================
// LEADERBOARD QUERIES
// ============================================================================

/**
 * Get karma leaderboard (top users by karma)
 */
export async function getKarmaLeaderboard(limit = 10): Promise<Array<{
  userId: number;
  username: string | null;
  name: string | null;
  avatarUrl: string | null;
  karmaPoints: number;
  trustLevel: number;
  rank: number;
}>> {
  if (!db) return [];

  const results = await db
    .select({
      userId: users.id,
      username: users.username,
      name: users.name,
      avatarUrl: users.avatarUrl,
      karmaPoints: users.karmaPoints,
      trustLevel: users.trustLevel,
    })
    .from(users)
    .where(and(eq(users.isPublic, true), sql`${users.karmaPoints} > 0`))
    .orderBy(desc(users.karmaPoints))
    .limit(limit);

  return results.map((r, i) => ({
    ...r,
    rank: i + 1,
  }));
}

// ============================================================================
// TYPES
// ============================================================================

export type { KarmaEvent, TrustLevel };
