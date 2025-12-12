#!/usr/bin/env npx tsx
/**
 * Deduplicate Places Script
 *
 * Removes duplicate places that appear in multiple cities with the same name.
 * Keeps the record with the most complete data (based on scoring).
 *
 * Usage:
 *   npx tsx scripts/deduplicate-places.ts --country=BE --dry-run
 *   npx tsx scripts/deduplicate-places.ts --country=BE
 *   npx tsx scripts/deduplicate-places.ts --country=NL --dry-run
 */
import "dotenv/config";
import { parseArgs } from "util";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL as string);

const { values: args } = parseArgs({
  options: {
    country: { type: "string", short: "c" },
    "dry-run": { type: "boolean", short: "d" },
    help: { type: "boolean", short: "h" },
  },
});

if (args.help) {
  console.log(`
Deduplicate Places Script

Removes duplicate places that appear in multiple cities with the same name.
Keeps the record with the most complete data.

Usage:
  npx tsx scripts/deduplicate-places.ts --country=<code> [options]

Options:
  -c, --country <code>   Country code (BE, NL, DE, etc.) - REQUIRED
  -d, --dry-run          Preview without deleting
  -h, --help             Show this help

Examples:
  npx tsx scripts/deduplicate-places.ts --country=BE --dry-run
  npx tsx scripts/deduplicate-places.ts --country=BE
`);
  process.exit(0);
}

interface DuplicateGroup {
  name: string;
  ids: number[];
  cities: string[];
  review_counts: number[];
  has_opening_hours: boolean[];
  has_about_us: boolean[];
  has_google_reviews: boolean[];
}

/**
 * Calculate completeness score for a place
 * Higher score = more complete data = keep this one
 */
function calculateScore(
  reviewCount: number,
  hasOpeningHours: boolean,
  hasAboutUs: boolean,
  hasGoogleReviews: boolean
): number {
  let score = 0;

  // Review count (most important - real engagement)
  score += Math.min(reviewCount, 1000); // Cap at 1000 to avoid outliers

  // Opening hours (+100 points)
  if (hasOpeningHours) score += 100;

  // About us content (+50 points)
  if (hasAboutUs) score += 50;

  // Google reviews text (+75 points)
  if (hasGoogleReviews) score += 75;

  return score;
}

async function main() {
  console.log("🧹 Deduplicate Places Script\n");
  console.log("━".repeat(60));

  const COUNTRY_CODE = args.country?.toUpperCase();
  const DRY_RUN = args["dry-run"] ?? false;

  if (!COUNTRY_CODE) {
    console.error("❌ --country is required");
    console.error("   Example: --country=BE");
    process.exit(1);
  }

  console.log(`🌍 Country: ${COUNTRY_CODE}`);
  console.log(`🔧 Mode: ${DRY_RUN ? "DRY RUN (no changes)" : "LIVE (will delete!)"}`);
  console.log("");

  // Find all duplicate groups (same name, different cities)
  const duplicates = await sql`
    SELECT
      p.name,
      ARRAY_AGG(p.id ORDER BY p.review_count DESC NULLS LAST, p.id) as ids,
      ARRAY_AGG(c.name ORDER BY p.review_count DESC NULLS LAST, p.id) as cities,
      ARRAY_AGG(COALESCE(p.review_count, 0) ORDER BY p.review_count DESC NULLS LAST, p.id) as review_counts,
      ARRAY_AGG(p.opening_hours IS NOT NULL ORDER BY p.review_count DESC NULLS LAST, p.id) as has_opening_hours,
      ARRAY_AGG(p.scraped_content->>'aboutUs' IS NOT NULL ORDER BY p.review_count DESC NULLS LAST, p.id) as has_about_us,
      ARRAY_AGG(p.scraped_content->>'googleReviews' IS NOT NULL ORDER BY p.review_count DESC NULLS LAST, p.id) as has_google_reviews
    FROM places p
    JOIN cities c ON p.city_id = c.id
    JOIN countries co ON c.country_id = co.id
    WHERE co.code = ${COUNTRY_CODE}
    GROUP BY p.name
    HAVING COUNT(DISTINCT c.id) > 1
    ORDER BY COUNT(*) DESC, p.name
  ` as DuplicateGroup[];

  console.log(`📊 Found ${duplicates.length} duplicate groups\n`);

  if (duplicates.length === 0) {
    console.log("✅ No duplicates found!");
    return;
  }

  let totalToDelete = 0;
  let totalToKeep = 0;
  const idsToDelete: number[] = [];

  // Process each duplicate group
  for (const group of duplicates) {
    console.log(`\n📍 ${group.name}`);

    // Calculate scores for each entry
    const entries = group.ids.map((id, i) => ({
      id,
      city: group.cities[i],
      reviewCount: group.review_counts[i],
      hasOpeningHours: group.has_opening_hours[i],
      hasAboutUs: group.has_about_us[i],
      hasGoogleReviews: group.has_google_reviews[i],
      score: calculateScore(
        group.review_counts[i],
        group.has_opening_hours[i],
        group.has_about_us[i],
        group.has_google_reviews[i]
      ),
    }));

    // Sort by score descending
    entries.sort((a, b) => b.score - a.score);

    // Keep the best one, delete the rest
    const keep = entries[0];
    const toDelete = entries.slice(1);

    console.log(`   ✅ KEEP: ID ${keep.id} (${keep.city}) - Score: ${keep.score}`);
    console.log(`      Reviews: ${keep.reviewCount}, Hours: ${keep.hasOpeningHours ? "✓" : "✗"}, AboutUs: ${keep.hasAboutUs ? "✓" : "✗"}, Reviews: ${keep.hasGoogleReviews ? "✓" : "✗"}`);

    for (const del of toDelete) {
      console.log(`   ❌ DELETE: ID ${del.id} (${del.city}) - Score: ${del.score}`);
      idsToDelete.push(del.id);
    }

    totalToKeep++;
    totalToDelete += toDelete.length;
  }

  console.log("\n" + "━".repeat(60));
  console.log("📊 Summary:\n");
  console.log(`   Duplicate groups: ${duplicates.length}`);
  console.log(`   Records to KEEP: ${totalToKeep}`);
  console.log(`   Records to DELETE: ${totalToDelete}`);

  if (DRY_RUN) {
    console.log("\n⚠️  DRY RUN - No changes made");
    console.log("   Run without --dry-run to delete duplicates");
    return;
  }

  if (idsToDelete.length === 0) {
    console.log("\n✅ Nothing to delete!");
    return;
  }

  // Delete duplicates
  console.log(`\n🗑️  Deleting ${idsToDelete.length} duplicate records...`);

  // First delete from place_categories (foreign key)
  const deletedCategories = await sql`
    DELETE FROM place_categories
    WHERE place_id = ANY(${idsToDelete}::int[])
  `;
  console.log(`   Deleted place_categories links`);

  // Then delete from places
  const deleted = await sql`
    DELETE FROM places
    WHERE id = ANY(${idsToDelete}::int[])
    RETURNING id
  `;

  console.log(`\n✅ Successfully deleted ${deleted.length} duplicate records!`);

  // Show final count
  const finalCount = await sql`
    SELECT COUNT(*) as count
    FROM places p
    JOIN cities c ON p.city_id = c.id
    JOIN countries co ON c.country_id = co.id
    WHERE co.code = ${COUNTRY_CODE}
  `;

  console.log(`\n📊 ${COUNTRY_CODE} now has ${finalCount[0].count} places`);
}

main().catch(console.error);
