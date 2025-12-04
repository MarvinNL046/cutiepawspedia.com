/**
 * Data Quality Database Queries
 *
 * CRUD operations for place data quality management
 */

import { db } from "@/db";
import { eq, sql, and, or, lt, isNull, desc, asc } from "drizzle-orm";
import { places, reviews, reviewPhotos } from "@/db/schema/directory";
import {
  scorePlace,
  type PlaceDataQualityInput,
  type PlaceDataQualityResult,
  needsRefresh,
  getRefreshPriority,
} from "@/lib/dataQuality";

// ============================================================================
// TYPES
// ============================================================================

export interface PlaceQualityData {
  id: number;
  name: string;
  slug: string;
  dataQualityScore: number;
  dataQualityFlags: string[] | null;
  lastRefreshedAt: Date | null;
  status: string;
  cityName?: string;
  countryName?: string;
}

export interface QualityStats {
  total: number;
  excellent: number; // 85-100
  good: number; // 70-84
  fair: number; // 50-69
  poor: number; // 30-49
  critical: number; // 0-29
  missingOpeningHours: number;
  missingRating: number;
  missingWebsite: number;
  missingPhone: number;
}

// ============================================================================
// QUALITY SCORE UPDATES
// ============================================================================

/**
 * Update data quality score and flags for a single place
 */
export async function updatePlaceDataQuality(
  placeId: number,
  result: PlaceDataQualityResult
): Promise<void> {
  await db
    .update(places)
    .set({
      dataQualityScore: result.score,
      dataQualityFlags: result.flags,
      lastRefreshedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(places.id, placeId));
}

/**
 * Compute and update quality score for a place based on its current data
 */
export async function computeAndUpdatePlaceQuality(placeId: number): Promise<PlaceDataQualityResult> {
  // Get place with all relevant data
  const [place] = await db
    .select({
      id: places.id,
      address: places.address,
      phone: places.phone,
      website: places.website,
      email: places.email,
      openingHours: places.openingHours,
      avgRating: places.avgRating,
      reviewCount: places.reviewCount,
      hasPhotos: places.hasPhotos,
      description: places.description,
      lat: places.lat,
      lng: places.lng,
      lastRefreshedAt: places.lastRefreshedAt,
    })
    .from(places)
    .where(eq(places.id, placeId))
    .limit(1);

  if (!place) {
    throw new Error(`Place not found: ${placeId}`);
  }

  // Build quality input
  const input: PlaceDataQualityInput = {
    hasAddress: !!place.address && place.address.trim().length > 0,
    hasPhone: !!place.phone && place.phone.trim().length > 0,
    hasWebsite: !!place.website && place.website.trim().length > 0,
    hasEmail: !!place.email && place.email.trim().length > 0,
    hasOpeningHours: !!place.openingHours && Object.keys(place.openingHours).length > 0,
    hasRating: parseFloat(place.avgRating?.toString() || "0") > 0,
    hasReviews: (place.reviewCount || 0) > 0,
    hasPhotos: place.hasPhotos,
    hasDescription: !!place.description && place.description.trim().length > 20,
    hasCoordinates: !!place.lat && !!place.lng,
    lastUpdatedAt: place.lastRefreshedAt,
  };

  // Calculate score
  const result = scorePlace(input);

  // Update database
  await updatePlaceDataQuality(placeId, result);

  return result;
}

// ============================================================================
// QUALITY QUERIES
// ============================================================================

/**
 * Get places that need quality scanning
 * - Score < 70
 * - Never refreshed
 * - Refreshed > 30 days ago
 */
export async function getPlacesNeedingQualityScan(limit = 100): Promise<{ id: number }[]> {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  return db
    .select({ id: places.id })
    .from(places)
    .where(
      or(
        lt(places.dataQualityScore, 70),
        isNull(places.lastRefreshedAt),
        lt(places.lastRefreshedAt, thirtyDaysAgo)
      )
    )
    .orderBy(asc(places.dataQualityScore), asc(places.lastRefreshedAt))
    .limit(limit);
}

/**
 * Get quality statistics for all places
 */
export async function getQualityStats(): Promise<QualityStats> {
  const stats = await db
    .select({
      total: sql<number>`count(*)`,
      excellent: sql<number>`count(*) filter (where ${places.dataQualityScore} >= 85)`,
      good: sql<number>`count(*) filter (where ${places.dataQualityScore} >= 70 and ${places.dataQualityScore} < 85)`,
      fair: sql<number>`count(*) filter (where ${places.dataQualityScore} >= 50 and ${places.dataQualityScore} < 70)`,
      poor: sql<number>`count(*) filter (where ${places.dataQualityScore} >= 30 and ${places.dataQualityScore} < 50)`,
      critical: sql<number>`count(*) filter (where ${places.dataQualityScore} < 30)`,
      missingOpeningHours: sql<number>`count(*) filter (where ${places.openingHours} is null)`,
      missingRating: sql<number>`count(*) filter (where ${places.avgRating} = 0 or ${places.avgRating} is null)`,
      missingWebsite: sql<number>`count(*) filter (where ${places.website} is null or ${places.website} = '')`,
      missingPhone: sql<number>`count(*) filter (where ${places.phone} is null or ${places.phone} = '')`,
    })
    .from(places);

  return stats[0] as QualityStats;
}

/**
 * Get places with low quality for admin view
 */
export async function getLowQualityPlaces(
  options: {
    limit?: number;
    offset?: number;
    minScore?: number;
    maxScore?: number;
  } = {}
): Promise<PlaceQualityData[]> {
  const { limit = 50, offset = 0, minScore = 0, maxScore = 100 } = options;

  const result = await db.execute(sql`
    SELECT
      p.id,
      p.name,
      p.slug,
      p.data_quality_score as "dataQualityScore",
      p.data_quality_flags as "dataQualityFlags",
      p.last_refreshed_at as "lastRefreshedAt",
      p.status,
      c.name as "cityName",
      co.name as "countryName"
    FROM places p
    LEFT JOIN cities c ON p.city_id = c.id
    LEFT JOIN countries co ON c.country_id = co.id
    WHERE p.data_quality_score >= ${minScore}
      AND p.data_quality_score <= ${maxScore}
    ORDER BY p.data_quality_score ASC, p.last_refreshed_at ASC NULLS FIRST
    LIMIT ${limit}
    OFFSET ${offset}
  `);

  return result.rows as unknown as PlaceQualityData[];
}

/**
 * Get places by specific quality flag
 */
export async function getPlacesByQualityFlag(
  flag: string,
  limit = 50
): Promise<{ id: number; name: string; slug: string }[]> {
  const result = await db.execute(sql`
    SELECT id, name, slug
    FROM places
    WHERE data_quality_flags @> ${JSON.stringify([flag])}::jsonb
    ORDER BY data_quality_score ASC
    LIMIT ${limit}
  `);

  return result.rows as { id: number; name: string; slug: string }[];
}

// ============================================================================
// BULK OPERATIONS
// ============================================================================

/**
 * Batch update quality scores for multiple places
 */
export async function batchComputeQuality(placeIds: number[]): Promise<{
  processed: number;
  updated: number;
  errors: number;
}> {
  let processed = 0;
  let updated = 0;
  let errors = 0;

  for (const placeId of placeIds) {
    try {
      await computeAndUpdatePlaceQuality(placeId);
      processed++;
      updated++;
    } catch (error) {
      console.error(`Failed to compute quality for place ${placeId}:`, error);
      errors++;
      processed++;
    }
  }

  return { processed, updated, errors };
}
