/**
 * Place Refresh Jobs Database Queries
 *
 * CRUD operations for the refresh job queue
 */

import { db } from "@/db";
import { eq, sql, and, desc, asc, not, inArray } from "drizzle-orm";
import { placeRefreshJobs, places, cities, countries } from "@/db/schema/directory";

// ============================================================================
// TYPES
// ============================================================================

export type RefreshJobStatus = "pending" | "in_progress" | "done" | "failed";
export type RefreshReason = "LOW_QUALITY" | "STALE" | "MANUAL" | "CLOSED_CHECK" | "INITIAL";

export interface RefreshJob {
  id: number;
  placeId: number;
  status: RefreshJobStatus;
  reason: RefreshReason;
  priority: number;
  lastError: string | null;
  attemptCount: number;
  createdAt: Date;
  updatedAt: Date;
  startedAt: Date | null;
  completedAt: Date | null;
}

export interface RefreshJobWithPlace extends RefreshJob {
  placeName: string;
  placeSlug: string;
  cityName: string | null;
  countryName: string | null;
}

export interface EnqueueOptions {
  placeId: number;
  reason: RefreshReason;
  priority?: number;
}

// ============================================================================
// QUEUE OPERATIONS
// ============================================================================

/**
 * Add a place to the refresh queue
 * Prevents duplicates - if already pending, updates priority if higher
 */
export async function enqueuePlaceRefresh({
  placeId,
  reason,
  priority = 0,
}: EnqueueOptions): Promise<{ id: number; isNew: boolean }> {
  // Check for existing pending job
  const [existing] = await db
    .select({ id: placeRefreshJobs.id, priority: placeRefreshJobs.priority })
    .from(placeRefreshJobs)
    .where(
      and(
        eq(placeRefreshJobs.placeId, placeId),
        eq(placeRefreshJobs.status, "pending")
      )
    )
    .limit(1);

  if (existing) {
    // Update priority if new one is higher
    if (priority > existing.priority) {
      await db
        .update(placeRefreshJobs)
        .set({
          priority,
          reason,
          updatedAt: new Date(),
        })
        .where(eq(placeRefreshJobs.id, existing.id));
    }
    return { id: existing.id, isNew: false };
  }

  // Create new job
  const [newJob] = await db
    .insert(placeRefreshJobs)
    .values({
      placeId,
      reason,
      priority,
      status: "pending",
    })
    .returning({ id: placeRefreshJobs.id });

  return { id: newJob.id, isNew: true };
}

/**
 * Bulk enqueue multiple places
 */
export async function bulkEnqueueRefresh(
  items: EnqueueOptions[]
): Promise<{ enqueued: number; updated: number }> {
  let enqueued = 0;
  let updated = 0;

  for (const item of items) {
    const result = await enqueuePlaceRefresh(item);
    if (result.isNew) {
      enqueued++;
    } else {
      updated++;
    }
  }

  return { enqueued, updated };
}

// ============================================================================
// JOB FETCHING
// ============================================================================

/**
 * Get next batch of jobs to process
 * Ordered by priority (desc) then createdAt (asc)
 */
export async function getNextRefreshBatch(limit = 10): Promise<RefreshJobWithPlace[]> {
  const result = await db.execute(sql`
    SELECT
      j.id,
      j.place_id as "placeId",
      j.status,
      j.reason,
      j.priority,
      j.last_error as "lastError",
      j.attempt_count as "attemptCount",
      j.created_at as "createdAt",
      j.updated_at as "updatedAt",
      j.started_at as "startedAt",
      j.completed_at as "completedAt",
      p.name as "placeName",
      p.slug as "placeSlug",
      c.name as "cityName",
      co.name as "countryName"
    FROM place_refresh_jobs j
    JOIN places p ON j.place_id = p.id
    LEFT JOIN cities c ON p.city_id = c.id
    LEFT JOIN countries co ON c.country_id = co.id
    WHERE j.status = 'pending'
    ORDER BY j.priority DESC, j.created_at ASC
    LIMIT ${limit}
  `);

  return (result.rows as unknown) as RefreshJobWithPlace[];
}

/**
 * Get a single job by ID
 */
export async function getRefreshJobById(id: number): Promise<RefreshJob | null> {
  const [job] = await db
    .select()
    .from(placeRefreshJobs)
    .where(eq(placeRefreshJobs.id, id))
    .limit(1);

  return job as RefreshJob | null;
}

/**
 * Get jobs by place ID
 */
export async function getRefreshJobsByPlaceId(placeId: number): Promise<RefreshJob[]> {
  return db
    .select()
    .from(placeRefreshJobs)
    .where(eq(placeRefreshJobs.placeId, placeId))
    .orderBy(desc(placeRefreshJobs.createdAt)) as Promise<RefreshJob[]>;
}

// ============================================================================
// STATUS UPDATES
// ============================================================================

/**
 * Mark job as in progress
 */
export async function markRefreshJobInProgress(id: number): Promise<void> {
  await db
    .update(placeRefreshJobs)
    .set({
      status: "in_progress",
      startedAt: new Date(),
      updatedAt: new Date(),
      attemptCount: sql`${placeRefreshJobs.attemptCount} + 1`,
    })
    .where(eq(placeRefreshJobs.id, id));
}

/**
 * Mark job as done
 */
export async function markRefreshJobDone(id: number): Promise<void> {
  await db
    .update(placeRefreshJobs)
    .set({
      status: "done",
      completedAt: new Date(),
      updatedAt: new Date(),
      lastError: null,
    })
    .where(eq(placeRefreshJobs.id, id));
}

/**
 * Mark job as failed
 */
export async function markRefreshJobFailed(id: number, error: string): Promise<void> {
  await db
    .update(placeRefreshJobs)
    .set({
      status: "failed",
      completedAt: new Date(),
      updatedAt: new Date(),
      lastError: error,
    })
    .where(eq(placeRefreshJobs.id, id));
}

/**
 * Reset failed jobs back to pending for retry
 */
export async function resetFailedJobs(maxAttempts = 3): Promise<number> {
  const result = await db
    .update(placeRefreshJobs)
    .set({
      status: "pending",
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(placeRefreshJobs.status, "failed"),
        sql`${placeRefreshJobs.attemptCount} < ${maxAttempts}`
      )
    )
    .returning({ id: placeRefreshJobs.id });

  return result.length;
}

// ============================================================================
// QUEUE STATS
// ============================================================================

export interface RefreshQueueStats {
  pending: number;
  inProgress: number;
  done: number;
  failed: number;
  total: number;
}

/**
 * Get queue statistics
 */
export async function getRefreshQueueStats(): Promise<RefreshQueueStats> {
  const stats = await db
    .select({
      pending: sql<number>`count(*) filter (where status = 'pending')`,
      inProgress: sql<number>`count(*) filter (where status = 'in_progress')`,
      done: sql<number>`count(*) filter (where status = 'done')`,
      failed: sql<number>`count(*) filter (where status = 'failed')`,
      total: sql<number>`count(*)`,
    })
    .from(placeRefreshJobs);

  return stats[0] as RefreshQueueStats;
}

/**
 * Get recent refresh activity
 */
export async function getRecentRefreshActivity(
  hours = 24,
  limit = 20
): Promise<RefreshJobWithPlace[]> {
  const since = new Date(Date.now() - hours * 60 * 60 * 1000);

  const result = await db.execute(sql`
    SELECT
      j.id,
      j.place_id as "placeId",
      j.status,
      j.reason,
      j.priority,
      j.last_error as "lastError",
      j.attempt_count as "attemptCount",
      j.created_at as "createdAt",
      j.updated_at as "updatedAt",
      j.started_at as "startedAt",
      j.completed_at as "completedAt",
      p.name as "placeName",
      p.slug as "placeSlug",
      c.name as "cityName",
      co.name as "countryName"
    FROM place_refresh_jobs j
    JOIN places p ON j.place_id = p.id
    LEFT JOIN cities c ON p.city_id = c.id
    LEFT JOIN countries co ON c.country_id = co.id
    WHERE j.updated_at >= ${since}
    ORDER BY j.updated_at DESC
    LIMIT ${limit}
  `);

  return (result.rows as unknown) as RefreshJobWithPlace[];
}

// ============================================================================
// CLEANUP
// ============================================================================

/**
 * Clean up old completed jobs (keep last 30 days)
 */
export async function cleanupOldJobs(daysToKeep = 30): Promise<number> {
  const cutoff = new Date(Date.now() - daysToKeep * 24 * 60 * 60 * 1000);

  const result = await db
    .delete(placeRefreshJobs)
    .where(
      and(
        inArray(placeRefreshJobs.status, ["done", "failed"]),
        sql`${placeRefreshJobs.completedAt} < ${cutoff}`
      )
    )
    .returning({ id: placeRefreshJobs.id });

  return result.length;
}
