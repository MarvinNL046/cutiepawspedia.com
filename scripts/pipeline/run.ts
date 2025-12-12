#!/usr/bin/env npx tsx
/**
 * Pipeline Orchestrator
 *
 * Master script to run the complete data pipeline for a country:
 * 1. Discovery: Find places via BrightData SERP
 * 2. Enrichment: Generate AI content for each place
 * 3. Validation: Verify data quality
 *
 * Usage:
 *   npx tsx scripts/pipeline/run.ts --country=BE --full
 *   npx tsx scripts/pipeline/run.ts --country=NL --discover-only
 *   npx tsx scripts/pipeline/run.ts --country=DE --enrich-only
 *   npx tsx scripts/pipeline/run.ts --status
 */

import "dotenv/config";
import { parseArgs } from "util";
import { spawn } from "child_process";
import { COUNTRIES, CATEGORIES } from "./config";
import { listActiveProgress, formatProgress } from "./progress";

const { values: args } = parseArgs({
  options: {
    country: { type: "string", short: "c" },
    full: { type: "boolean", short: "f" },
    "discover-only": { type: "boolean", short: "d" },
    "enrich-only": { type: "boolean", short: "e" },
    categories: { type: "string", short: "k" },
    status: { type: "boolean", short: "s" },
    help: { type: "boolean", short: "h" },
  },
});

if (args.help) {
  console.log(`
Pipeline Orchestrator

Run the complete data pipeline for any configured country.

Usage:
  npx tsx scripts/pipeline/run.ts --country=<code> --full
  npx tsx scripts/pipeline/run.ts --status

Options:
  -c, --country <code>   Country code (BE, NL, DE, FR, UK)
  -f, --full             Run full pipeline (discover + enrich)
  -d, --discover-only    Only run discovery
  -e, --enrich-only      Only run enrichment
  -k, --categories <list> Comma-separated category slugs (default: all)
  -s, --status           Show pipeline status
  -h, --help             Show this help

Countries: ${Object.keys(COUNTRIES).join(", ")}
Categories: ${Object.keys(CATEGORIES).join(", ")}

Examples:
  npx tsx scripts/pipeline/run.ts --country=BE --full
  npx tsx scripts/pipeline/run.ts --country=NL --discover-only --categories=veterinary,grooming
  npx tsx scripts/pipeline/run.ts --country=DE --enrich-only
  npx tsx scripts/pipeline/run.ts --status
`);
  process.exit(0);
}

// Show status
if (args.status) {
  console.log("\n" + "=".repeat(60));
  console.log("📊 PIPELINE STATUS");
  console.log("=".repeat(60));

  const activeProgress = listActiveProgress();

  if (activeProgress.length === 0) {
    console.log("\nNo active pipelines running.\n");
  } else {
    console.log("\nActive progress:\n");
    for (const { progress } of activeProgress) {
      console.log(`  ${formatProgress(progress)}`);
    }
    console.log("");
  }

  // Show country statistics
  console.log("\nTo check enrichment status for a country:");
  console.log("  npx tsx scripts/pipeline/enrich.ts --validate --country=BE\n");

  process.exit(0);
}

const COUNTRY_CODE = args.country?.toUpperCase();
const FULL = args.full ?? false;
const DISCOVER_ONLY = args["discover-only"] ?? false;
const ENRICH_ONLY = args["enrich-only"] ?? false;
const CATEGORY_LIST = args.categories?.split(",") || Object.keys(CATEGORIES);

if (!COUNTRY_CODE) {
  console.error("❌ --country is required");
  process.exit(1);
}

if (!COUNTRIES[COUNTRY_CODE]) {
  console.error(`❌ Unknown country: ${COUNTRY_CODE}`);
  process.exit(1);
}

if (!FULL && !DISCOVER_ONLY && !ENRICH_ONLY) {
  console.error("❌ Specify --full, --discover-only, or --enrich-only");
  process.exit(1);
}

// Run a script and wait for completion
function runScript(script: string, args: string[]): Promise<number> {
  return new Promise((resolve, reject) => {
    console.log(`\n🚀 Running: npx tsx ${script} ${args.join(" ")}\n`);

    const proc = spawn("npx", ["tsx", script, ...args], {
      stdio: "inherit",
      cwd: process.cwd(),
    });

    proc.on("close", (code) => {
      resolve(code || 0);
    });

    proc.on("error", (err) => {
      reject(err);
    });
  });
}

async function main() {
  const startTime = Date.now();

  console.log("\n" + "=".repeat(60));
  console.log(`🌍 PIPELINE: ${COUNTRIES[COUNTRY_CODE].name}`);
  console.log("=".repeat(60));

  const modes: string[] = [];
  if (FULL || DISCOVER_ONLY) modes.push("Discovery");
  if (FULL || ENRICH_ONLY) modes.push("Enrichment");

  console.log(`\nModes: ${modes.join(" + ")}`);
  console.log(`Categories: ${CATEGORY_LIST.join(", ")}`);
  console.log("");

  // Discovery phase
  if (FULL || DISCOVER_ONLY) {
    console.log("\n" + "─".repeat(60));
    console.log("📍 PHASE 1: DISCOVERY");
    console.log("─".repeat(60));

    for (const category of CATEGORY_LIST) {
      if (!CATEGORIES[category]) {
        console.warn(`⚠️ Unknown category: ${category}, skipping`);
        continue;
      }

      const code = await runScript("scripts/pipeline/discover.ts", [
        `--country=${COUNTRY_CODE}`,
        `--category=${category}`,
        "--resume",
      ]);

      if (code !== 0) {
        console.error(`❌ Discovery failed for ${category} with exit code ${code}`);
        // Continue with other categories instead of failing completely
      }
    }
  }

  // Enrichment phase
  if (FULL || ENRICH_ONLY) {
    console.log("\n" + "─".repeat(60));
    console.log("🤖 PHASE 2: ENRICHMENT");
    console.log("─".repeat(60));

    const code = await runScript("scripts/pipeline/enrich.ts", [
      `--country=${COUNTRY_CODE}`,
      "--resume",
    ]);

    if (code !== 0) {
      console.error(`❌ Enrichment failed with exit code ${code}`);
    }
  }

  // Validation
  console.log("\n" + "─".repeat(60));
  console.log("✅ PHASE 3: VALIDATION");
  console.log("─".repeat(60));

  await runScript("scripts/pipeline/enrich.ts", [
    `--country=${COUNTRY_CODE}`,
    "--validate",
  ]);

  // Summary
  const elapsed = ((Date.now() - startTime) / 1000 / 60).toFixed(1);

  console.log("\n" + "=".repeat(60));
  console.log("🎉 PIPELINE COMPLETE");
  console.log("=".repeat(60));
  console.log(`   Country: ${COUNTRIES[COUNTRY_CODE].name}`);
  console.log(`   Total time: ${elapsed} minutes`);
  console.log("=".repeat(60) + "\n");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
