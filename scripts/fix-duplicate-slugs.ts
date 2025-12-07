#!/usr/bin/env npx tsx
/**
 * Fix Duplicate Slugs
 *
 * Finds places with duplicate slugs within the same city and updates them
 * with unique slugs using street name or postal code or counter suffix.
 *
 * Usage:
 *   npx tsx scripts/fix-duplicate-slugs.ts --dry-run
 *   npx tsx scripts/fix-duplicate-slugs.ts
 */

import { parseArgs } from "node:util";
import * as fs from "node:fs";
import * as path from "node:path";
import { neon } from "@neondatabase/serverless";

// =============================================================================
// LOAD .env FILE
// =============================================================================

function loadEnvFromFile(envPath: string): void {
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    for (const line of envContent.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIndex = trimmed.indexOf("=");
      if (eqIndex > 0) {
        const key = trimmed.slice(0, eqIndex);
        let value = trimmed.slice(eqIndex + 1);
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    }
  }
}

function loadEnvFiles(): void {
  const cwd = process.cwd();
  loadEnvFromFile(path.join(cwd, ".env.example"));
  loadEnvFromFile(path.join(cwd, ".env"));
  loadEnvFromFile(path.join(cwd, ".env.local"));
}

loadEnvFiles();

// =============================================================================
// CLI PARSING
// =============================================================================

const { values: args } = parseArgs({
  options: {
    "dry-run": { type: "boolean", short: "d", default: false },
    verbose: { type: "boolean", short: "v", default: false },
    help: { type: "boolean", short: "h", default: false },
  },
});

if (args.help) {
  console.log(`
Fix Duplicate Slugs

Finds places with duplicate slugs within the same city and fixes them.

USAGE:
  npx tsx scripts/fix-duplicate-slugs.ts [options]

OPTIONS:
  -d, --dry-run   Preview changes without applying them
  -v, --verbose   Show detailed progress
  -h, --help      Show this help
`);
  process.exit(0);
}

const DRY_RUN = args["dry-run"] ?? false;
const VERBOSE = args.verbose ?? false;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

function log(message: string): void {
  console.log(`[fix-slugs] ${message}`);
}

function verbose(message: string): void {
  if (VERBOSE) {
    console.log(`  ${message}`);
  }
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// =============================================================================
// MAIN
// =============================================================================

async function main(): Promise<void> {
  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL) {
    console.error("Error: DATABASE_URL not set");
    process.exit(1);
  }

  const sql = neon(DATABASE_URL);

  log("Finding duplicate slugs within same city...");
  if (DRY_RUN) log("DRY RUN - no changes will be made");

  // Find all duplicate slugs per city
  const duplicates = await sql`
    SELECT
      p.city_id,
      p.slug,
      c.name as city_name,
      COUNT(*) as count
    FROM places p
    JOIN cities c ON p.city_id = c.id
    GROUP BY p.city_id, p.slug, c.name
    HAVING COUNT(*) > 1
    ORDER BY count DESC
  `;

  if (duplicates.length === 0) {
    log("✅ No duplicate slugs found!");
    return;
  }

  log(`Found ${duplicates.length} duplicate slug patterns`);

  let totalFixed = 0;

  for (const dup of duplicates) {
    log(`\nProcessing: "${dup.slug}" in ${dup.city_name} (${dup.count} occurrences)`);

    // Get all places with this duplicate slug in this city
    const places = await sql`
      SELECT
        id,
        name,
        slug,
        address,
        postal_code,
        city_id
      FROM places
      WHERE city_id = ${dup.city_id} AND slug = ${dup.slug}
      ORDER BY id
    `;

    // Track used slugs for this city to avoid new collisions
    const usedSlugs = new Set<string>();

    // Get all existing slugs for this city to avoid collisions
    const existingSlugs = await sql`
      SELECT slug FROM places WHERE city_id = ${dup.city_id}
    `;
    for (const s of existingSlugs) {
      usedSlugs.add(s.slug);
    }

    // Keep the first one as-is, fix the rest
    let isFirst = true;
    for (const place of places) {
      if (isFirst) {
        verbose(`  Keeping: ${place.name} → ${place.slug}`);
        isFirst = false;
        continue;
      }

      // Generate new unique slug
      let newSlug = place.slug;
      let attempts = 0;

      // Strategy 1: Add street name from address
      if (place.address && attempts === 0) {
        const streetMatch = place.address.match(/^([a-zA-Z]+)/);
        if (streetMatch) {
          const streetSlug = generateSlug(streetMatch[1]);
          const candidate = `${place.slug}-${streetSlug}`;
          if (!usedSlugs.has(candidate)) {
            newSlug = candidate;
            attempts = 1;
          }
        }
      }

      // Strategy 2: Add postal code
      if (place.postal_code && newSlug === place.slug) {
        const postalMatch = place.postal_code.match(/(\d{4})/);
        if (postalMatch) {
          const candidate = `${place.slug}-${postalMatch[1]}`;
          if (!usedSlugs.has(candidate)) {
            newSlug = candidate;
            attempts = 2;
          }
        }
      }

      // Strategy 3: Add counter
      if (newSlug === place.slug) {
        let counter = 2;
        while (usedSlugs.has(`${place.slug}-${counter}`)) {
          counter++;
        }
        newSlug = `${place.slug}-${counter}`;
      }

      usedSlugs.add(newSlug);

      verbose(`  ${place.name}: ${place.slug} → ${newSlug}`);

      if (!DRY_RUN) {
        await sql`
          UPDATE places
          SET slug = ${newSlug}, updated_at = NOW()
          WHERE id = ${place.id}
        `;
      }

      totalFixed++;
    }
  }

  log(`\n✅ Fixed ${totalFixed} duplicate slugs`);
  if (DRY_RUN) {
    log("Run without --dry-run to apply changes");
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
