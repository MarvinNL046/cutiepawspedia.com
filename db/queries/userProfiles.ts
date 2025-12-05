import { eq, and, ilike, sql } from "drizzle-orm";
import { db } from "../index";
import { users, userBadges, badgeDefinitions, reviews } from "../schema";

// ============================================================================
// USER PROFILE MANAGEMENT (P3)
// ============================================================================

/**
 * Profile data type for public/private profiles
 */
export interface UserProfile {
  id: number;
  name: string | null;
  username: string | null;
  avatarUrl: string | null;
  bio: string | null;
  location: string | null;
  websiteUrl: string | null;
  socialLinks: Record<string, string> | null;
  preferredLocale: string | null;
  isPublic: boolean | null;
  createdAt: Date;
  // Computed stats
  reviewCount?: number;
  badges?: Array<{
    key: string;
    label: string;
    labelNl: string | null;
    icon: string;
    category: string;
    awardedAt: Date;
  }>;
}

/**
 * Get user profile by ID (internal use)
 */
export async function getUserProfile(userId: number): Promise<UserProfile | null> {
  if (!db) return null;

  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
    columns: {
      id: true,
      name: true,
      username: true,
      avatarUrl: true,
      bio: true,
      location: true,
      websiteUrl: true,
      socialLinks: true,
      preferredLocale: true,
      isPublic: true,
      createdAt: true,
    },
    with: {
      badges: {
        with: {
          badge: true,
        },
        orderBy: (userBadges, { desc }) => [desc(userBadges.awardedAt)],
      },
    },
  });

  if (!user) return null;

  // Get review count
  const reviewCountResult = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(reviews)
    .where(and(eq(reviews.userId, userId), eq(reviews.status, "published")));

  const reviewCount = reviewCountResult[0]?.count ?? 0;

  return {
    ...user,
    reviewCount,
    badges: user.badges?.map((ub) => ({
      key: ub.badge.key,
      label: ub.badge.label,
      labelNl: ub.badge.labelNl,
      icon: ub.badge.icon,
      category: ub.badge.category,
      awardedAt: ub.awardedAt,
    })),
  };
}

/**
 * Get user by username (for public profiles /u/[username])
 */
export async function getUserByUsername(username: string): Promise<UserProfile | null> {
  if (!db) return null;

  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
    columns: {
      id: true,
      name: true,
      username: true,
      avatarUrl: true,
      bio: true,
      location: true,
      websiteUrl: true,
      socialLinks: true,
      preferredLocale: true,
      isPublic: true,
      createdAt: true,
    },
    with: {
      badges: {
        with: {
          badge: true,
        },
        orderBy: (userBadges, { desc }) => [desc(userBadges.awardedAt)],
      },
    },
  });

  if (!user) return null;

  // Get review count
  const reviewCountResult = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(reviews)
    .where(and(eq(reviews.userId, user.id), eq(reviews.status, "published")));

  const reviewCount = reviewCountResult[0]?.count ?? 0;

  return {
    ...user,
    reviewCount,
    badges: user.badges?.map((ub) => ({
      key: ub.badge.key,
      label: ub.badge.label,
      labelNl: ub.badge.labelNl,
      icon: ub.badge.icon,
      category: ub.badge.category,
      awardedAt: ub.awardedAt,
    })),
  };
}

/**
 * Update user profile data
 */
export interface UpdateProfileData {
  name?: string;
  username?: string;
  avatarUrl?: string;
  bio?: string;
  location?: string;
  websiteUrl?: string;
  socialLinks?: Record<string, string>;
  preferredLocale?: string;
  isPublic?: boolean;
}

export async function updateUserProfile(
  userId: number,
  data: UpdateProfileData
): Promise<UserProfile | null> {
  if (!db) return null;

  const updateData: Record<string, unknown> = {
    updatedAt: new Date(),
  };

  // Only include defined fields
  if (data.name !== undefined) updateData.name = data.name;
  if (data.username !== undefined) updateData.username = data.username;
  if (data.avatarUrl !== undefined) updateData.avatarUrl = data.avatarUrl;
  if (data.bio !== undefined) updateData.bio = data.bio;
  if (data.location !== undefined) updateData.location = data.location;
  if (data.websiteUrl !== undefined) updateData.websiteUrl = data.websiteUrl;
  if (data.socialLinks !== undefined) updateData.socialLinks = data.socialLinks;
  if (data.preferredLocale !== undefined) updateData.preferredLocale = data.preferredLocale;
  if (data.isPublic !== undefined) updateData.isPublic = data.isPublic;

  await db
    .update(users)
    .set(updateData)
    .where(eq(users.id, userId));

  return getUserProfile(userId);
}

/**
 * Check if username is available
 */
export async function isUsernameAvailable(
  username: string,
  excludeUserId?: number
): Promise<boolean> {
  if (!db) return false;

  // Normalize username
  const normalizedUsername = username.toLowerCase().trim();

  // Check for minimum length
  if (normalizedUsername.length < 3) return false;

  // Check for valid characters (alphanumeric, underscore, hyphen)
  if (!/^[a-z0-9_-]+$/.test(normalizedUsername)) return false;

  // Reserved usernames
  const reserved = [
    "admin", "administrator", "mod", "moderator", "support", "help",
    "api", "app", "www", "mail", "email", "account", "profile",
    "settings", "dashboard", "login", "logout", "signup", "register",
    "cutiepaws", "cutiepawspedia", "cutie", "paws", "test", "demo",
  ];

  if (reserved.includes(normalizedUsername)) return false;

  // Check database
  const existingUser = await db.query.users.findFirst({
    where: excludeUserId
      ? and(eq(users.username, normalizedUsername), sql`${users.id} != ${excludeUserId}`)
      : eq(users.username, normalizedUsername),
    columns: { id: true },
  });

  return !existingUser;
}

/**
 * Get public profile for display (respects privacy settings)
 */
export async function getPublicProfile(username: string): Promise<UserProfile | null> {
  const profile = await getUserByUsername(username);

  if (!profile) return null;

  // If profile is not public, return limited data
  if (!profile.isPublic) {
    return {
      id: profile.id,
      name: profile.name,
      username: profile.username,
      avatarUrl: profile.avatarUrl,
      bio: null,
      location: null,
      websiteUrl: null,
      socialLinks: null,
      preferredLocale: null,
      isPublic: false,
      createdAt: profile.createdAt,
      reviewCount: 0,
      badges: [],
    };
  }

  return profile;
}

// ============================================================================
// TYPES
// ============================================================================

export type { UserProfile, UpdateProfileData };
