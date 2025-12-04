/**
 * Sync Enriched Ratings Script
 *
 * This script syncs the scraped rating data from scraped_content JSONB
 * to the places table's avg_rating and review_count columns.
 *
 * It also reports on data quality issues.
 */

import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const sql = neon(process.env.DATABASE_URL as string);

interface ScrapedContent {
  aboutUs?: string;
  googleRating?: number;
  googleReviewCount?: number;
  ratingSource?: string;
  ratingConfidence?: number;
  platformRatings?: Array<{
    platform: string;
    rating: number;
    reviewCount?: number;
  }>;
}

async function main() {
  console.log("🔄 Syncing Enriched Ratings...\n");

  // Get all places with scraped_content
  const places = await sql`
    SELECT id, name, avg_rating, review_count, scraped_content
    FROM places
    WHERE scraped_content IS NOT NULL
  `;

  let updated = 0;
  let skipped = 0;
  let issues: string[] = [];

  for (const place of places) {
    const content = place.scraped_content as ScrapedContent;

    if (!content) {
      skipped++;
      continue;
    }

    // Extract best rating from scraped data
    let bestRating: number | null = null;
    let bestReviewCount: number | null = null;
    let source = "none";

    // Prefer Schema.org rating, then googleRating, then platformRatings
    if (content.googleRating && content.googleRating > 0) {
      bestRating = content.googleRating;
      bestReviewCount = content.googleReviewCount || null;
      source = content.ratingSource || "unknown";
    }

    // Check platformRatings for better data
    if (content.platformRatings && content.platformRatings.length > 0) {
      for (const pr of content.platformRatings) {
        if (pr.rating > 0) {
          // Prefer Google rating with review count
          if (pr.platform === "google" && pr.reviewCount && pr.reviewCount > 0) {
            bestRating = pr.rating;
            bestReviewCount = pr.reviewCount;
            source = "platform_google";
            break;
          }
        }
      }
    }

    // Check aboutUs quality
    if (content.aboutUs) {
      const aboutLength = content.aboutUs.length;
      const hasOnlyHtml = /^\[?!\[|^#|^\*/.test(content.aboutUs.trim());

      if (aboutLength < 50 || hasOnlyHtml) {
        issues.push(`${place.name}: aboutUs is too short or HTML-only (${aboutLength} chars)`);
      }
    }

    // Update if we have rating data and it differs from current
    if (bestRating !== null) {
      const currentRating = place.avg_rating ? parseFloat(place.avg_rating) : null;
      const currentReviews = place.review_count || null;

      // Check if update needed
      const needsUpdate =
        currentRating !== bestRating ||
        (bestReviewCount !== null && currentReviews !== bestReviewCount);

      if (needsUpdate) {
        await sql`
          UPDATE places
          SET avg_rating = ${bestRating},
              review_count = COALESCE(${bestReviewCount}, review_count),
              updated_at = NOW()
          WHERE id = ${place.id}
        `;
        updated++;
        console.log(`✅ ${place.name}: rating=${bestRating}, reviews=${bestReviewCount || "unchanged"} (source: ${source})`);
      }
    } else {
      skipped++;
    }
  }

  console.log("\n📊 Sync Complete!");
  console.log("================");
  console.log(`Total places:     ${places.length}`);
  console.log(`Updated:          ${updated}`);
  console.log(`Skipped (no data): ${skipped}`);

  if (issues.length > 0) {
    console.log(`\n⚠️  Data Quality Issues (${issues.length}):`);
    issues.slice(0, 10).forEach(i => console.log(`   - ${i}`));
    if (issues.length > 10) {
      console.log(`   ... and ${issues.length - 10} more`);
    }
  }

  // Final stats
  const stats = await sql`
    SELECT
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE avg_rating > 0) as with_rating,
      COUNT(*) FILTER (WHERE review_count > 0) as with_reviews,
      COUNT(*) FILTER (WHERE scraped_content IS NOT NULL) as enriched
    FROM places
  `;

  console.log("\n📈 Final Database Stats:");
  console.log(stats[0]);
}

main().catch(console.error);
