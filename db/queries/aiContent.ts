/**
 * AI Content Cache Database Queries
 *
 * CRUD operations for the ai_content_cache table.
 * Used by the AI content generator and admin tools.
 */

import { db } from "@/db";
import { aiContentCache, aiGenerationQueue } from "@/db/schema";
import type { AiContentStructure, AiContentType, AiQueueStatus } from "@/db/schema/ai";
import { eq, and, lt, ne, sql, desc, asc, or, isNull } from "drizzle-orm";
import { AI_VERSION, AI_STALENESS_THRESHOLD_DAYS } from "@/lib/ai/version";

// ============================================================================
// CACHE OPERATIONS
// ============================================================================

/**
 * Get cached content by key
 */
export async function getCachedContent(key: string): Promise<{
  content: AiContentStructure;
  version: string;
  isStale: boolean;
  updatedAt: Date;
} | null> {
  if (!db) return null;

  const result = await db
    .select({
      content: aiContentCache.content,
      version: aiContentCache.version,
      isStale: aiContentCache.isStale,
      updatedAt: aiContentCache.updatedAt,
    })
    .from(aiContentCache)
    .where(eq(aiContentCache.key, key))
    .limit(1);

  if (result.length === 0) return null;

  return {
    content: result[0].content as AiContentStructure,
    version: result[0].version,
    isStale: result[0].isStale,
    updatedAt: result[0].updatedAt,
  };
}

/**
 * Upsert content into cache
 */
export async function upsertCachedContent(params: {
  key: string;
  contentType: AiContentType;
  content: AiContentStructure;
  model: string;
  locale: string;
  version: string;
  promptTokens?: number;
  completionTokens?: number;
  generationTimeMs?: number;
}): Promise<void> {
  if (!db) return;

  const now = new Date();

  await db
    .insert(aiContentCache)
    .values({
      key: params.key,
      contentType: params.contentType,
      content: params.content,
      model: params.model,
      locale: params.locale,
      version: params.version,
      promptTokens: params.promptTokens,
      completionTokens: params.completionTokens,
      generationTimeMs: params.generationTimeMs,
      generatedAt: now,
      isStale: false,
      markedStaleAt: null,
      lastError: null,
      errorCount: 0,
      createdAt: now,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: aiContentCache.key,
      set: {
        content: params.content,
        model: params.model,
        version: params.version,
        promptTokens: params.promptTokens,
        completionTokens: params.completionTokens,
        generationTimeMs: params.generationTimeMs,
        generatedAt: now,
        isStale: false,
        markedStaleAt: null,
        lastError: null,
        errorCount: 0,
        updatedAt: now,
      },
    });
}

/**
 * Mark content as having an error
 */
export async function markCacheError(key: string, error: string): Promise<void> {
  if (!db) return;

  await db
    .update(aiContentCache)
    .set({
      lastError: error,
      errorCount: sql`${aiContentCache.errorCount} + 1`,
      updatedAt: new Date(),
    })
    .where(eq(aiContentCache.key, key));
}

/**
 * Mark content as stale for regeneration
 */
export async function markContentStale(key: string): Promise<void> {
  if (!db) return;

  await db
    .update(aiContentCache)
    .set({
      isStale: true,
      markedStaleAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(aiContentCache.key, key));
}

/**
 * Mark all content with outdated version as stale
 */
export async function markOutdatedVersionsStale(): Promise<number> {
  if (!db) return 0;

  const result = await db
    .update(aiContentCache)
    .set({
      isStale: true,
      markedStaleAt: new Date(),
      updatedAt: new Date(),
    })
    .where(and(ne(aiContentCache.version, AI_VERSION), eq(aiContentCache.isStale, false)));

  return result.rowCount || 0;
}

// ============================================================================
// STALE CONTENT QUERIES
// ============================================================================

/**
 * Get stale content for regeneration
 */
export async function getStaleContent(limit: number = 50): Promise<
  Array<{
    id: number;
    key: string;
    contentType: string;
    locale: string;
    version: string;
    updatedAt: Date;
  }>
> {
  if (!db) return [];

  const stalenessDate = new Date();
  stalenessDate.setDate(stalenessDate.getDate() - AI_STALENESS_THRESHOLD_DAYS);

  // Get content that is either:
  // 1. Marked as stale
  // 2. Has outdated version
  // 3. Is older than staleness threshold
  const results = await db
    .select({
      id: aiContentCache.id,
      key: aiContentCache.key,
      contentType: aiContentCache.contentType,
      locale: aiContentCache.locale,
      version: aiContentCache.version,
      updatedAt: aiContentCache.updatedAt,
    })
    .from(aiContentCache)
    .where(
      or(
        eq(aiContentCache.isStale, true),
        ne(aiContentCache.version, AI_VERSION),
        lt(aiContentCache.updatedAt, stalenessDate)
      )
    )
    .orderBy(asc(aiContentCache.updatedAt))
    .limit(limit);

  return results;
}

/**
 * Get content statistics
 */
export async function getContentStats(): Promise<{
  total: number;
  byType: Record<string, number>;
  byLocale: Record<string, number>;
  staleCount: number;
  outdatedVersionCount: number;
  avgGenerationTimeMs: number;
}> {
  if (!db) {
    return {
      total: 0,
      byType: {},
      byLocale: {},
      staleCount: 0,
      outdatedVersionCount: 0,
      avgGenerationTimeMs: 0,
    };
  }

  // Total count
  const [{ count: total }] = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(aiContentCache);

  // Count by type
  const typeResults = await db
    .select({
      contentType: aiContentCache.contentType,
      count: sql<number>`COUNT(*)`,
    })
    .from(aiContentCache)
    .groupBy(aiContentCache.contentType);

  const byType: Record<string, number> = {};
  for (const row of typeResults) {
    byType[row.contentType] = Number(row.count);
  }

  // Count by locale
  const localeResults = await db
    .select({
      locale: aiContentCache.locale,
      count: sql<number>`COUNT(*)`,
    })
    .from(aiContentCache)
    .groupBy(aiContentCache.locale);

  const byLocale: Record<string, number> = {};
  for (const row of localeResults) {
    byLocale[row.locale] = Number(row.count);
  }

  // Stale count
  const [{ count: staleCount }] = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(aiContentCache)
    .where(eq(aiContentCache.isStale, true));

  // Outdated version count
  const [{ count: outdatedVersionCount }] = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(aiContentCache)
    .where(ne(aiContentCache.version, AI_VERSION));

  // Average generation time
  const [{ avg }] = await db
    .select({ avg: sql<number>`AVG(${aiContentCache.generationTimeMs})` })
    .from(aiContentCache)
    .where(sql`${aiContentCache.generationTimeMs} IS NOT NULL`);

  return {
    total: Number(total),
    byType,
    byLocale,
    staleCount: Number(staleCount),
    outdatedVersionCount: Number(outdatedVersionCount),
    avgGenerationTimeMs: Math.round(Number(avg) || 0),
  };
}

// ============================================================================
// MISSING CONTENT QUERIES
// ============================================================================

/**
 * Get list of cities without cached content
 */
export async function getCitiesWithoutContent(
  locale: string,
  limit: number = 100
): Promise<Array<{ citySlug: string; countrySlug: string; cityName: string }>> {
  if (!db) return [];

  // This query finds cities that don't have a corresponding cache entry
  const results = await db.execute(sql`
    SELECT c.slug as city_slug, co.slug as country_slug, c.name as city_name
    FROM cities c
    JOIN countries co ON c.country_id = co.id
    WHERE NOT EXISTS (
      SELECT 1 FROM ai_content_cache acc
      WHERE acc.key = CONCAT('city:', c.slug, ':', co.slug, ':', ${locale})
    )
    LIMIT ${limit}
  `);

  return (results.rows || []).map((row: Record<string, unknown>) => ({
    citySlug: row.city_slug as string,
    countrySlug: row.country_slug as string,
    cityName: row.city_name as string,
  }));
}

/**
 * Get list of places without cached content
 */
export async function getPlacesWithoutContent(
  locale: string,
  limit: number = 100
): Promise<Array<{ placeSlug: string; citySlug: string; countrySlug: string; placeName: string }>> {
  if (!db) return [];

  const results = await db.execute(sql`
    SELECT p.slug as place_slug, c.slug as city_slug, co.slug as country_slug, p.name as place_name
    FROM places p
    JOIN cities c ON p.city_id = c.id
    JOIN countries co ON c.country_id = co.id
    WHERE NOT EXISTS (
      SELECT 1 FROM ai_content_cache acc
      WHERE acc.key = CONCAT('place:', p.slug, ':', c.slug, ':', co.slug, ':', ${locale})
    )
    LIMIT ${limit}
  `);

  return (results.rows || []).map((row: Record<string, unknown>) => ({
    placeSlug: row.place_slug as string,
    citySlug: row.city_slug as string,
    countrySlug: row.country_slug as string,
    placeName: row.place_name as string,
  }));
}

/**
 * Get list of categories without cached content for a country
 */
export async function getCategoriesWithoutContent(
  countrySlug: string,
  locale: string,
  limit: number = 100
): Promise<Array<{ categorySlug: string; categoryName: string }>> {
  if (!db) return [];

  const results = await db.execute(sql`
    SELECT cat.slug as category_slug, cat.label_key as category_name
    FROM categories cat
    WHERE NOT EXISTS (
      SELECT 1 FROM ai_content_cache acc
      WHERE acc.key = CONCAT('category:', cat.slug, ':', ${countrySlug}, ':', ${locale})
    )
    LIMIT ${limit}
  `);

  return (results.rows || []).map((row: Record<string, unknown>) => ({
    categorySlug: row.category_slug as string,
    categoryName: row.category_name as string,
  }));
}

// ============================================================================
// QUEUE OPERATIONS
// ============================================================================

/**
 * Add item to generation queue
 */
export async function addToQueue(params: {
  cacheKey: string;
  contentType: AiContentType;
  locale: string;
  priority?: number;
  contextData?: Record<string, unknown>;
}): Promise<void> {
  if (!db) return;

  // Check if already in queue
  const existing = await db
    .select({ id: aiGenerationQueue.id })
    .from(aiGenerationQueue)
    .where(
      and(
        eq(aiGenerationQueue.cacheKey, params.cacheKey),
        eq(aiGenerationQueue.status, "pending")
      )
    )
    .limit(1);

  if (existing.length > 0) return; // Already queued

  await db.insert(aiGenerationQueue).values({
    cacheKey: params.cacheKey,
    contentType: params.contentType,
    locale: params.locale,
    priority: params.priority || 0,
    status: "pending",
    contextData: params.contextData || null,
  });
}

/**
 * Get next items from queue for processing
 */
export async function getQueueItems(limit: number = 50): Promise<
  Array<{
    id: number;
    cacheKey: string;
    contentType: string;
    locale: string;
    contextData: Record<string, unknown> | null;
  }>
> {
  if (!db) return [];

  const results = await db
    .select({
      id: aiGenerationQueue.id,
      cacheKey: aiGenerationQueue.cacheKey,
      contentType: aiGenerationQueue.contentType,
      locale: aiGenerationQueue.locale,
      contextData: aiGenerationQueue.contextData,
    })
    .from(aiGenerationQueue)
    .where(eq(aiGenerationQueue.status, "pending"))
    .orderBy(desc(aiGenerationQueue.priority), asc(aiGenerationQueue.createdAt))
    .limit(limit);

  return results.map((row) => ({
    ...row,
    contextData: row.contextData as Record<string, unknown> | null,
  }));
}

/**
 * Update queue item status
 */
export async function updateQueueStatus(
  id: number,
  status: AiQueueStatus,
  error?: string
): Promise<void> {
  if (!db) return;

  const updates: Record<string, unknown> = {
    status,
    updatedAt: new Date(),
    lastAttemptAt: new Date(),
    attempts: sql`${aiGenerationQueue.attempts} + 1`,
  };

  if (status === "completed") {
    updates.completedAt = new Date();
  }

  if (error) {
    updates.error = error;
  }

  await db.update(aiGenerationQueue).set(updates).where(eq(aiGenerationQueue.id, id));
}

/**
 * Clean up old completed/failed queue items
 */
export async function cleanupQueue(daysOld: number = 7): Promise<number> {
  if (!db) return 0;

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysOld);

  const result = await db
    .delete(aiGenerationQueue)
    .where(
      and(
        or(
          eq(aiGenerationQueue.status, "completed"),
          eq(aiGenerationQueue.status, "failed")
        ),
        lt(aiGenerationQueue.updatedAt, cutoffDate)
      )
    );

  return result.rowCount || 0;
}

/**
 * Get queue statistics
 */
export async function getQueueStats(): Promise<{
  pending: number;
  processing: number;
  completed: number;
  failed: number;
}> {
  if (!db) {
    return { pending: 0, processing: 0, completed: 0, failed: 0 };
  }

  const results = await db
    .select({
      status: aiGenerationQueue.status,
      count: sql<number>`COUNT(*)`,
    })
    .from(aiGenerationQueue)
    .groupBy(aiGenerationQueue.status);

  const stats: Record<string, number> = {
    pending: 0,
    processing: 0,
    completed: 0,
    failed: 0,
  };

  for (const row of results) {
    stats[row.status] = Number(row.count);
  }

  return stats as { pending: number; processing: number; completed: number; failed: number };
}
