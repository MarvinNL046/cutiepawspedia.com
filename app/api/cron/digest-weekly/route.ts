/**
 * Weekly Digest Cron API
 *
 * GET /api/cron/digest-weekly?secret=XXX
 *
 * Sends weekly digest emails to business owners with their activity summary.
 * Should run once per week (e.g., Sunday evening or Monday morning).
 *
 * Query params:
 * - secret: Revalidation secret (required)
 * - limit: Max businesses to process per run (default: 100)
 * - dryRun: If "true", logs what would be sent without actually sending
 */

import { NextRequest, NextResponse } from "next/server";
import {
  getBusinessesForDigest,
  getBusinessWeeklyStats,
  logNotification,
} from "@/db/queries/notifications";
import { sendNotification } from "@/lib/notifications";
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
    const dryRun = searchParams.get("dryRun") === "true";

    // Get businesses that should receive digest
    const businesses = await getBusinessesForDigest();

    if (businesses.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No businesses to send digest to",
        processed: 0,
        sent: 0,
        skipped: 0,
        dryRun,
        duration: Date.now() - startTime,
      });
    }

    // Process businesses (up to limit)
    const toProcess = businesses.slice(0, limit);
    let processed = 0;
    let sent = 0;
    let skipped = 0;
    let errors = 0;

    const results: Array<{
      businessId: number;
      businessName: string;
      status: "sent" | "skipped" | "error";
      reason?: string;
      stats?: {
        leads: number;
        reviews: number;
      };
    }> = [];

    for (const business of toProcess) {
      try {
        processed++;

        // Get weekly stats for this business
        const stats = await getBusinessWeeklyStats(business.businessId);

        // Skip if no activity
        if (stats.newLeadsCount === 0 && stats.newReviewsCount === 0) {
          skipped++;
          results.push({
            businessId: business.businessId,
            businessName: business.businessName,
            status: "skipped",
            reason: "No activity this week",
          });
          continue;
        }

        const baseUrl = process.env.APP_BASE_URL || "https://cutiepawspedia.com";

        // Send or simulate digest
        if (dryRun) {
          // Log what would be sent
          results.push({
            businessId: business.businessId,
            businessName: business.businessName,
            status: "sent",
            reason: "DRY RUN - would send",
            stats: {
              leads: stats.newLeadsCount,
              reviews: stats.newReviewsCount,
            },
          });
          sent++;
        } else {
          // Actually send the digest
          const result = await sendNotification({
            type: "DIGEST_WEEKLY",
            userId: business.userId,
            userEmail: business.userEmail,
            userName: business.userName || undefined,
            businessId: business.businessId,
            businessName: business.businessName,
            newLeadsCount: stats.newLeadsCount,
            newReviewsCount: stats.newReviewsCount,
            averageRating: stats.averageRating || undefined,
            dashboardUrl: `${baseUrl}/dashboard/business/${business.businessId}`,
            locale: business.locale,
          });

          if (result.success) {
            sent++;
            results.push({
              businessId: business.businessId,
              businessName: business.businessName,
              status: "sent",
              stats: {
                leads: stats.newLeadsCount,
                reviews: stats.newReviewsCount,
              },
            });
          } else {
            errors++;
            results.push({
              businessId: business.businessId,
              businessName: business.businessName,
              status: "error",
              reason: result.error,
            });
          }
        }

        // Small delay to avoid rate limiting
        if (!dryRun) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      } catch (error) {
        console.error(`Failed to send digest to business ${business.businessId}:`, error);
        errors++;
        results.push({
          businessId: business.businessId,
          businessName: business.businessName,
          status: "error",
          reason: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    // Log audit event
    if (db && !dryRun) {
      await db.insert(auditLogs).values({
        actorRole: "system",
        eventType: "DIGEST_WEEKLY_SENT",
        targetType: "business",
        targetId: null,
        metadata: {
          processed,
          sent,
          skipped,
          errors,
          duration: Date.now() - startTime,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: dryRun ? "Dry run completed" : "Weekly digest sent",
      processed,
      sent,
      skipped,
      errors,
      dryRun,
      totalBusinesses: businesses.length,
      results: results.slice(0, 20), // Only return first 20 results for readability
      duration: Date.now() - startTime,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Weekly digest error:", error);
    return NextResponse.json(
      {
        error: "Failed to send weekly digest",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
