/**
 * Data Quality Scanner Cron API
 *
 * GET /api/cron/data-quality?secret=XXX
 *
 * Scans places for data quality issues and enqueues low-quality places
 * for refresh. Should run daily or 2x per week.
 *
 * Query params:
 * - secret: Revalidation secret (required)
 * - limit: Max places to scan per run (default: 100)
 */

import { NextRequest, NextResponse } from "next/server";
import {
  getPlacesNeedingQualityScan,
  computeAndUpdatePlaceQuality,
  getQualityStats,
} from "@/db/queries/dataQuality";
import { enqueuePlaceRefresh, type RefreshReason } from "@/db/queries/refreshJobs";
import { needsRefresh, getRefreshPriority } from "@/lib/dataQuality";
import { db } from "@/db";
import { auditLogs } from "@/db/schema/directory";

const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET;
const CRON_SECRET = process.env.CRON_SECRET;

function verifyCronAuth(request: NextRequest): boolean {
  // Check Vercel cron header (automatic for Vercel crons)
  if (request.headers.get("x-vercel-cron") === "true") {
    return true;
  }
  // Check Authorization header (Bearer token)
  const authHeader = request.headers.get("authorization");
  if (authHeader === `Bearer ${CRON_SECRET}` || authHeader === `Bearer ${REVALIDATION_SECRET}`) {
    return true;
  }
  // Check query param (legacy/manual triggers)
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  if (secret && (secret === REVALIDATION_SECRET || secret === CRON_SECRET)) {
    return true;
  }
  // Allow in development
  if (process.env.NODE_ENV === "development") {
    return true;
  }
  return false;
}

export async function GET(request: NextRequest) {
  const startTime = Date.now();

  try {
    // Authenticate
    if (!verifyCronAuth(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "100", 10);

    // Get places that need scanning
    const placesToScan = await getPlacesNeedingQualityScan(limit);

    if (placesToScan.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No places need scanning",
        scanned: 0,
        enqueued: 0,
        duration: Date.now() - startTime,
      });
    }

    // Process each place
    let scanned = 0;
    let enqueued = 0;
    let errors = 0;

    for (const { id: placeId } of placesToScan) {
      try {
        // Compute and update quality score
        const result = await computeAndUpdatePlaceQuality(placeId);
        scanned++;

        // Enqueue for refresh if low quality
        if (needsRefresh(result.score)) {
          const priority = getRefreshPriority(result.score);
          const reason: RefreshReason = result.score < 30 ? "LOW_QUALITY" : "STALE";

          const { isNew } = await enqueuePlaceRefresh({
            placeId,
            reason,
            priority,
          });

          if (isNew) {
            enqueued++;
          }
        }
      } catch (error) {
        console.error(`Failed to scan place ${placeId}:`, error);
        errors++;
      }
    }

    // Get updated stats
    const stats = await getQualityStats();

    // Log audit event
    if (db) {
      await db.insert(auditLogs).values({
        actorRole: "system",
        eventType: "DATA_QUALITY_SCAN",
        targetType: "place",
        targetId: null,
        metadata: {
          scanned,
          enqueued,
          errors,
          stats,
          duration: Date.now() - startTime,
        },
      });
    }

    return NextResponse.json({
      success: true,
      scanned,
      enqueued,
      errors,
      stats,
      duration: Date.now() - startTime,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Data quality scan error:", error);
    return NextResponse.json(
      {
        error: "Failed to run data quality scan",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
