/**
 * Review Queries & Helpers
 *
 * Comprehensive CRUD operations for the review system.
 * Includes reviews, replies, moderation, and aggregation.
 */

import { eq, and, desc, asc, sql, count } from "drizzle-orm";
import { db } from "../index";
import { reviews, reviewReplies, places } from "../schema";
import { logAuditEvent } from "./auditLogs";

// ============================================================================
// TYPES
// ============================================================================

export type ReviewStatus = "pending" | "published" | "rejected" | "flagged";
export type ReviewAuthorType = "business" | "admin";

export interface CreateReviewInput {
  placeId: number;
  userId: number;
  businessId?: number | null;
  rating: number; // 1-5
  title?: string | null;
  body: string;
  locale?: string;
  visitDate?: Date | null;
  ipHash?: string | null;
  status?: ReviewStatus; // For trusted users: auto-approve
}

export interface UpdateReviewInput {
  title?: string | null;
  body?: string;
  rating?: number;
  visitDate?: Date | null;
  status?: ReviewStatus;
  isFeatured?: boolean;
}

export interface CreateReplyInput {
  reviewId: number;
  authorType: ReviewAuthorType;
  authorUserId: number;
  body: string;
}

export interface ReviewFilterOptions {
  status?: ReviewStatus;
  isFeatured?: boolean;
  minRating?: number;
  maxRating?: number;
  locale?: string;
  limit?: number;
  offset?: number;
  orderBy?: "newest" | "oldest" | "highest" | "lowest";
}

// ============================================================================
// REVIEW CRUD OPERATIONS
// ============================================================================

/**
 * Create a new review
 */
export async function createReview(input: CreateReviewInput) {
  if (!db) throw new Error("Database not initialized");

  const [review] = await db
    .insert(reviews)
    .values({
      placeId: input.placeId,
      userId: input.userId,
      businessId: input.businessId ?? null,
      rating: input.rating,
      title: input.title ?? null,
      body: input.body,
      locale: input.locale ?? "en",
      visitDate: input.visitDate?.toISOString().split("T")[0] ?? null,
      ipHash: input.ipHash ?? null,
      status: input.status ?? "pending", // Trusted users get auto-approved
      isFeatured: false,
    })
    .returning();

  // Log audit event for review creation
  await logAuditEvent({
    actorUserId: input.userId,
    actorRole: "public",
    eventType: "REVIEW_CREATED",
    targetType: "review",
    targetId: review.id,
    metadata: {
      placeId: input.placeId,
      rating: input.rating,
      locale: input.locale ?? "en",
    },
  });

  return review;
}

/**
 * Get a review by ID
 */
export async function getReviewById(id: number) {
  if (!db) return null;
  return db.query.reviews.findFirst({
    where: eq(reviews.id, id),
    with: {
      user: {
        columns: {
          id: true,
          name: true,
          email: true,
        },
      },
      place: true,
      business: true,
      replies: {
        orderBy: [asc(reviewReplies.createdAt)],
        with: {
          author: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
}

/**
 * Update a review
 */
export async function updateReview(id: number, input: UpdateReviewInput) {
  if (!db) throw new Error("Database not initialized");

  const updateData: Record<string, unknown> = {
    updatedAt: new Date(),
  };

  if (input.title !== undefined) updateData.title = input.title;
  if (input.body !== undefined) updateData.body = input.body;
  if (input.rating !== undefined) updateData.rating = input.rating;
  if (input.visitDate !== undefined) {
    updateData.visitDate = input.visitDate?.toISOString().split("T")[0] ?? null;
  }
  if (input.status !== undefined) updateData.status = input.status;
  if (input.isFeatured !== undefined) updateData.isFeatured = input.isFeatured;

  const [updated] = await db
    .update(reviews)
    .set(updateData)
    .where(eq(reviews.id, id))
    .returning();

  return updated;
}

/**
 * Delete a review
 */
export async function deleteReview(id: number) {
  if (!db) throw new Error("Database not initialized");
  await db.delete(reviews).where(eq(reviews.id, id));
}

// ============================================================================
// REVIEW QUERIES
// ============================================================================

/**
 * Get reviews for a place (published only for public display)
 */
export async function getReviewsForPlace(
  placeId: number,
  options: ReviewFilterOptions = {}
) {
  if (!db) return [];
  const {
    status = "published",
    limit = 20,
    offset = 0,
    orderBy = "newest",
    minRating,
    maxRating,
  } = options;

  // Build order clause
  const orderClause = (() => {
    switch (orderBy) {
      case "oldest":
        return [asc(reviews.createdAt)];
      case "highest":
        return [desc(reviews.rating), desc(reviews.createdAt)];
      case "lowest":
        return [asc(reviews.rating), desc(reviews.createdAt)];
      default:
        return [desc(reviews.createdAt)];
    }
  })();

  return db.query.reviews.findMany({
    where: (reviews, { and, eq, gte, lte }) => {
      const conditions = [
        eq(reviews.placeId, placeId),
        eq(reviews.status, status),
      ];
      if (minRating) conditions.push(gte(reviews.rating, minRating));
      if (maxRating) conditions.push(lte(reviews.rating, maxRating));
      return and(...conditions);
    },
    orderBy: () => orderClause,
    limit,
    offset,
    with: {
      user: {
        columns: {
          id: true,
          name: true,
        },
      },
      replies: {
        orderBy: [asc(reviewReplies.createdAt)],
        with: {
          author: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
}

/**
 * Get featured reviews for a place
 */
export async function getFeaturedReviewsForPlace(placeId: number, limit = 3) {
  if (!db) return [];
  return db.query.reviews.findMany({
    where: and(
      eq(reviews.placeId, placeId),
      eq(reviews.status, "published"),
      eq(reviews.isFeatured, true)
    ),
    orderBy: [desc(reviews.rating), desc(reviews.createdAt)],
    limit,
    with: {
      user: {
        columns: {
          id: true,
          name: true,
        },
      },
    },
  });
}

/**
 * Get reviews by user
 */
export async function getReviewsByUser(userId: number, limit = 50, offset = 0) {
  if (!db) return [];
  return db.query.reviews.findMany({
    where: eq(reviews.userId, userId),
    orderBy: [desc(reviews.createdAt)],
    limit,
    offset,
    with: {
      place: true,
    },
  });
}

/**
 * Get reviews for a business (all places owned by business)
 */
export async function getReviewsForBusiness(
  businessId: number,
  options: ReviewFilterOptions = {}
) {
  if (!db) return [];
  const { status, limit = 50, offset = 0, orderBy = "newest" } = options;

  // Build order clause
  const orderClause = (() => {
    switch (orderBy) {
      case "oldest":
        return [asc(reviews.createdAt)];
      case "highest":
        return [desc(reviews.rating), desc(reviews.createdAt)];
      case "lowest":
        return [asc(reviews.rating), desc(reviews.createdAt)];
      default:
        return [desc(reviews.createdAt)];
    }
  })();

  return db.query.reviews.findMany({
    where: status
      ? and(eq(reviews.businessId, businessId), eq(reviews.status, status))
      : eq(reviews.businessId, businessId),
    orderBy: () => orderClause,
    limit,
    offset,
    with: {
      user: {
        columns: {
          id: true,
          name: true,
        },
      },
      place: true,
      replies: {
        orderBy: [asc(reviewReplies.createdAt)],
        with: {
          author: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
}

/**
 * Get reviews pending moderation
 */
export async function getPendingReviews(limit = 50, offset = 0) {
  if (!db) return [];
  return db.query.reviews.findMany({
    where: eq(reviews.status, "pending"),
    orderBy: [asc(reviews.createdAt)], // Oldest first for FIFO moderation
    limit,
    offset,
    with: {
      user: {
        columns: {
          id: true,
          name: true,
          email: true,
        },
      },
      place: true,
    },
  });
}

/**
 * Get flagged reviews for admin review
 */
export async function getFlaggedReviews(limit = 50, offset = 0) {
  if (!db) return [];
  return db.query.reviews.findMany({
    where: eq(reviews.status, "flagged"),
    orderBy: [desc(reviews.createdAt)],
    limit,
    offset,
    with: {
      user: {
        columns: {
          id: true,
          name: true,
          email: true,
        },
      },
      place: true,
    },
  });
}

// ============================================================================
// REVIEW MODERATION
// ============================================================================

/**
 * Approve a review (change status to published)
 */
export async function approveReview(id: number, moderatorUserId?: number) {
  const result = await updateReview(id, { status: "published" });

  // Log audit event for review approval
  await logAuditEvent({
    actorUserId: moderatorUserId ?? null,
    actorRole: moderatorUserId ? "admin" : "system",
    eventType: "REVIEW_APPROVED",
    targetType: "review",
    targetId: id,
  });

  return result;
}

/**
 * Reject a review
 */
export async function rejectReview(id: number, moderatorUserId?: number) {
  const result = await updateReview(id, { status: "rejected" });

  // Log audit event for review rejection
  await logAuditEvent({
    actorUserId: moderatorUserId ?? null,
    actorRole: moderatorUserId ? "admin" : "system",
    eventType: "REVIEW_REJECTED",
    targetType: "review",
    targetId: id,
  });

  return result;
}

/**
 * Flag a review for admin review
 */
export async function flagReview(id: number, reporterUserId?: number) {
  const result = await updateReview(id, { status: "flagged" });

  // Log audit event for review flagging
  await logAuditEvent({
    actorUserId: reporterUserId ?? null,
    actorRole: reporterUserId ? "public" : "system",
    eventType: "REVIEW_FLAGGED",
    targetType: "review",
    targetId: id,
  });

  return result;
}

/**
 * Toggle featured status
 */
export async function toggleFeaturedReview(id: number) {
  const review = await getReviewById(id);
  if (!review) throw new Error("Review not found");
  return updateReview(id, { isFeatured: !review.isFeatured });
}

// ============================================================================
// REPLY OPERATIONS
// ============================================================================

/**
 * Create a reply to a review
 */
export async function createReviewReply(input: CreateReplyInput) {
  if (!db) throw new Error("Database not initialized");

  const [reply] = await db
    .insert(reviewReplies)
    .values({
      reviewId: input.reviewId,
      authorType: input.authorType,
      authorUserId: input.authorUserId,
      body: input.body,
    })
    .returning();

  // Log audit event for reply creation
  await logAuditEvent({
    actorUserId: input.authorUserId,
    actorRole: input.authorType === "business" ? "business" : "admin",
    eventType: "REVIEW_REPLY_CREATED",
    targetType: "review",
    targetId: input.reviewId,
    metadata: {
      replyId: reply.id,
      authorType: input.authorType,
    },
  });

  return reply;
}

/**
 * Update a reply
 */
export async function updateReviewReply(id: number, body: string) {
  if (!db) throw new Error("Database not initialized");

  const [updated] = await db
    .update(reviewReplies)
    .set({
      body,
      updatedAt: new Date(),
    })
    .where(eq(reviewReplies.id, id))
    .returning();

  return updated;
}

/**
 * Delete a reply
 */
export async function deleteReviewReply(id: number) {
  if (!db) throw new Error("Database not initialized");
  await db.delete(reviewReplies).where(eq(reviewReplies.id, id));
}

/**
 * Get replies for a review
 */
export async function getRepliesForReview(reviewId: number) {
  if (!db) return [];
  return db.query.reviewReplies.findMany({
    where: eq(reviewReplies.reviewId, reviewId),
    orderBy: [asc(reviewReplies.createdAt)],
    with: {
      author: {
        columns: {
          id: true,
          name: true,
        },
      },
    },
  });
}

// ============================================================================
// AGGREGATION & STATS
// ============================================================================

/**
 * Get review statistics for a place
 */
export async function getReviewStatsForPlace(placeId: number) {
  if (!db) return null;

  const result = await db
    .select({
      totalCount: count(),
      avgRating: sql<number>`COALESCE(AVG(${reviews.rating}), 0)::numeric(2,1)`,
      rating5: sql<number>`COUNT(*) FILTER (WHERE ${reviews.rating} = 5)`,
      rating4: sql<number>`COUNT(*) FILTER (WHERE ${reviews.rating} = 4)`,
      rating3: sql<number>`COUNT(*) FILTER (WHERE ${reviews.rating} = 3)`,
      rating2: sql<number>`COUNT(*) FILTER (WHERE ${reviews.rating} = 2)`,
      rating1: sql<number>`COUNT(*) FILTER (WHERE ${reviews.rating} = 1)`,
    })
    .from(reviews)
    .where(and(eq(reviews.placeId, placeId), eq(reviews.status, "published")));

  if (!result[0]) return null;

  const stats = result[0];
  return {
    totalCount: Number(stats.totalCount),
    avgRating: Number(stats.avgRating),
    distribution: {
      5: Number(stats.rating5),
      4: Number(stats.rating4),
      3: Number(stats.rating3),
      2: Number(stats.rating2),
      1: Number(stats.rating1),
    },
  };
}

/**
 * Update place aggregation fields after review changes
 */
export async function updatePlaceReviewStats(placeId: number) {
  if (!db) throw new Error("Database not initialized");

  // Calculate new stats
  const stats = await getReviewStatsForPlace(placeId);
  if (!stats) return;

  // Get most recent review date
  const latestReview = await db.query.reviews.findFirst({
    where: and(eq(reviews.placeId, placeId), eq(reviews.status, "published")),
    orderBy: [desc(reviews.createdAt)],
    columns: { createdAt: true },
  });

  // Update place record
  await db
    .update(places)
    .set({
      avgRating: stats.avgRating.toString(),
      reviewCount: stats.totalCount,
      lastReviewAt: latestReview?.createdAt ?? null,
      updatedAt: new Date(),
    })
    .where(eq(places.id, placeId));
}

/**
 * Check if user has already reviewed a place
 */
export async function hasUserReviewedPlace(
  userId: number,
  placeId: number
): Promise<boolean> {
  if (!db) return false;
  const existing = await db.query.reviews.findFirst({
    where: and(eq(reviews.userId, userId), eq(reviews.placeId, placeId)),
    columns: { id: true },
  });
  return !!existing;
}

/**
 * Get total review count for a user (for karma first review bonus)
 */
export async function getUserReviewCount(userId: number): Promise<number> {
  if (!db) return 0;
  const result = await db
    .select({ count: count() })
    .from(reviews)
    .where(eq(reviews.userId, userId));
  return result[0]?.count ?? 0;
}

/**
 * Get review count by status for admin dashboard
 */
export async function getReviewCountsByStatus() {
  if (!db) return { pending: 0, published: 0, rejected: 0, flagged: 0 };

  const result = await db
    .select({
      status: reviews.status,
      count: count(),
    })
    .from(reviews)
    .groupBy(reviews.status);

  const counts = {
    pending: 0,
    published: 0,
    rejected: 0,
    flagged: 0,
  };

  for (const row of result) {
    if (row.status && row.status in counts) {
      counts[row.status as keyof typeof counts] = Number(row.count);
    }
  }

  return counts;
}

// ============================================================================
// HOMEPAGE FEATURED REVIEWS
// ============================================================================

/**
 * Get featured reviews for homepage testimonials section
 * Returns high-rating reviews that are marked as featured
 */
export async function getFeaturedReviewsForHomepage(limit = 3) {
  if (!db) return [];

  return db.query.reviews.findMany({
    where: and(
      eq(reviews.status, "published"),
      eq(reviews.isFeatured, true)
    ),
    orderBy: [desc(reviews.rating), desc(reviews.createdAt)],
    limit,
    with: {
      user: {
        columns: {
          id: true,
          name: true,
        },
      },
      place: {
        columns: {
          name: true,
          slug: true,
        },
        with: {
          city: {
            columns: {
              slug: true,
            },
            with: {
              country: {
                columns: {
                  slug: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

/**
 * Get top-rated reviews for homepage (fallback if no featured reviews)
 * Returns published reviews with rating >= 4
 */
export async function getTopReviewsForHomepage(limit = 3) {
  if (!db) return [];

  return db.query.reviews.findMany({
    where: and(
      eq(reviews.status, "published"),
      sql`${reviews.rating} >= 4`
    ),
    orderBy: [desc(reviews.rating), desc(reviews.createdAt)],
    limit,
    with: {
      user: {
        columns: {
          id: true,
          name: true,
        },
      },
      place: {
        columns: {
          name: true,
          slug: true,
        },
        with: {
          city: {
            columns: {
              slug: true,
            },
            with: {
              country: {
                columns: {
                  slug: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

// ============================================================================
// EXPORTS FOR TYPES
// ============================================================================

export type Review = NonNullable<Awaited<ReturnType<typeof getReviewById>>>;
export type HomepageReview = Awaited<ReturnType<typeof getFeaturedReviewsForHomepage>>[number];
export type ReviewWithUser = Awaited<ReturnType<typeof getReviewsForPlace>>[number];
export type ReviewReply = NonNullable<
  Awaited<ReturnType<typeof getRepliesForReview>>[number]
>;
export type ReviewStats = NonNullable<
  Awaited<ReturnType<typeof getReviewStatsForPlace>>
>;
