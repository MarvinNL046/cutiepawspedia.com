#!/usr/bin/env npx tsx
/**
 * A.2: NL Bulk Pipeline Runner
 *
 * Runs the data pipeline for all (or selected) Dutch cities.
 *
 * Usage:
 *   npx tsx scripts/run-pipeline-nl.ts
 *   npx tsx scripts/run-pipeline-nl.ts --cities=rotterdam,utrecht
 *   npx tsx scripts/run-pipeline-nl.ts --max-cities=3 --cheap-mode
 *
 * Options:
 *   --cities=...      Comma-separated list of cities (default: all)
 *   --max-cities=N    Limit number of cities to process
 *   --cheap-mode      Skip Bright Data and Jina AI (OSM + PDOK only)
 *   --skip-seed       Don't seed database (staging only)
 *   --dry-run         Show plan without executing
 *   --force           Overwrite existing data
 */

import { spawn, type ChildProcess } from "child_process";
import { parseArgs } from "util";
import { getAllNlCities, type NlCityConfig } from "./config/nl-cities";
import { getCity } from "./config/cities";

// =============================================================================
// CLI PARSING
// =============================================================================

interface CliArgs {
  cities?: string;
  maxCities?: number;
  cheapMode?: boolean;
  skipSeed?: boolean;
  dryRun?: boolean;
  force?: boolean;
  verbose?: boolean;
  help?: boolean;
}

function parseCliArgs(): CliArgs {
  try {
    const { values } = parseArgs({
      options: {
        cities: { type: "string" },
        "max-cities": { type: "string" },
        "cheap-mode": { type: "boolean" },
        "skip-seed": { type: "boolean" },
        "dry-run": { type: "boolean", short: "d" },
        force: { type: "boolean", short: "f" },
        verbose: { type: "boolean", short: "v" },
        help: { type: "boolean", short: "h" },
      },
      strict: true,
    });

    return {
      cities: values.cities,
      maxCities: values["max-cities"] ? parseInt(values["max-cities"], 10) : undefined,
      cheapMode: values["cheap-mode"],
      skipSeed: values["skip-seed"],
      dryRun: values["dry-run"],
      force: values.force,
      verbose: values.verbose,
      help: values.help,
    };
  } catch (error) {
    console.error("Error parsing arguments:", error);
    printHelp();
    process.exit(1);
  }
}

function printHelp(): void {
  const cities = getAllNlCities();
  const citySlugs = cities.map((c) => c.citySlug).join(", ");

  console.log(`
NL Bulk Pipeline Runner for CutiePawsPedia

Runs the data pipeline for all (or selected) Dutch cities.

Usage:
  npx tsx scripts/run-pipeline-nl.ts
  npx tsx scripts/run-pipeline-nl.ts --cities=rotterdam,utrecht
  npx tsx scripts/run-pipeline-nl.ts --max-cities=3 --cheap-mode
  npx tsx scripts/run-pipeline-nl.ts --help

Options:
  --cities=...       Comma-separated list of cities (default: all)
  --max-cities=N     Limit number of cities to process
  --cheap-mode       Skip Bright Data and Jina AI (faster, no API costs)
  --skip-seed        Don't seed database (staging only)
  -d, --dry-run      Show plan without executing
  -f, --force        Overwrite existing data
  -v, --verbose      Verbose output for each city
  -h, --help         Show this help

Available NL Cities (${cities.length}):
  ${citySlugs}

Examples:
  # Run all NL cities in cheap mode
  npx tsx scripts/run-pipeline-nl.ts --cheap-mode

  # Run specific cities with full pipeline
  npx tsx scripts/run-pipeline-nl.ts --cities=rotterdam,utrecht,den-haag

  # Dry run first 3 cities
  npx tsx scripts/run-pipeline-nl.ts --max-cities=3 --dry-run

  # Staging only (no database)
  npx tsx scripts/run-pipeline-nl.ts --skip-seed --cheap-mode
`);
}

// =============================================================================
// CITY PIPELINE RUNNER
// =============================================================================

interface CityResult {
  city: string;
  cityName: string;
  success: boolean;
  duration: number;
  error?: string;
  skipped: boolean;
}

/**
 * Run pipeline for a single city
 */
function runCityPipeline(
  citySlug: string,
  options: {
    cheapMode: boolean;
    skipSeed: boolean;
    dryRun: boolean;
    force: boolean;
    verbose: boolean;
  }
): Promise<{ success: boolean; duration: number; error?: string }> {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const args = ["tsx", "scripts/run-pipeline-city.ts", "--country=nl", `--city=${citySlug}`];

    if (options.cheapMode) args.push("--cheap-mode");
    if (options.skipSeed) args.push("--skip-seed");
    if (options.dryRun) args.push("--dry-run");
    if (options.force) args.push("--force");
    if (options.verbose) args.push("--verbose");

    const proc: ChildProcess = spawn("npx", args, {
      stdio: options.verbose ? "inherit" : "pipe",
      shell: true,
    });

    let stderr = "";

    if (!options.verbose && proc.stderr) {
      proc.stderr.on("data", (data) => {
        stderr += data.toString();
      });
    }

    proc.on("close", (code) => {
      const duration = Date.now() - startTime;
      if (code === 0) {
        resolve({ success: true, duration });
      } else {
        resolve({
          success: false,
          duration,
          error: stderr || `Exit code: ${code}`,
        });
      }
    });

    proc.on("error", (err) => {
      const duration = Date.now() - startTime;
      resolve({ success: false, duration, error: err.message });
    });
  });
}

// =============================================================================
// MAIN BULK RUNNER
// =============================================================================

async function main(): Promise<void> {
  const args = parseCliArgs();

  if (args.help) {
    printHelp();
    process.exit(0);
  }

  const allCities = getAllNlCities();
  let citiesToProcess: NlCityConfig[] = [];

  // Filter cities
  if (args.cities) {
    const requestedSlugs = args.cities.toLowerCase().split(",").map((s) => s.trim());
    for (const slug of requestedSlugs) {
      const found = allCities.find((c) => c.citySlug === slug);
      if (found) {
        citiesToProcess.push(found);
      } else {
        console.warn(`⚠️  City not found: ${slug}`);
      }
    }
  } else {
    citiesToProcess = [...allCities];
  }

  // Apply max-cities limit
  if (args.maxCities && args.maxCities > 0) {
    citiesToProcess = citiesToProcess.slice(0, args.maxCities);
  }

  if (citiesToProcess.length === 0) {
    console.error("❌ No cities to process");
    process.exit(1);
  }

  // Print plan
  console.log(`\n${"=".repeat(70)}`);
  console.log(`🇳🇱 NL BULK PIPELINE`);
  console.log(`${"=".repeat(70)}`);
  console.log(`Cities to process: ${citiesToProcess.length}`);
  console.log(`Mode: ${args.cheapMode ? "Cheap (OSM + PDOK only)" : "Full (OSM + PDOK + Bright + Jina)"}`);
  console.log(`Database: ${args.skipSeed ? "Skip seeding" : "Will seed"}`);
  if (args.dryRun) console.log(`⚠️  DRY RUN - No changes will be made`);
  console.log(`\nCities: ${citiesToProcess.map((c) => c.citySlug).join(", ")}`);
  console.log(`${"=".repeat(70)}\n`);

  // Run pipeline for each city
  const results: CityResult[] = [];
  const startTime = Date.now();

  for (let i = 0; i < citiesToProcess.length; i++) {
    const city = citiesToProcess[i];
    const progress = `[${i + 1}/${citiesToProcess.length}]`;

    console.log(`\n${progress} 🏙️  Processing ${city.cityName} (${city.citySlug})...`);

    const result = await runCityPipeline(city.citySlug, {
      cheapMode: args.cheapMode || false,
      skipSeed: args.skipSeed || false,
      dryRun: args.dryRun || false,
      force: args.force || false,
      verbose: args.verbose || false,
    });

    const cityResult: CityResult = {
      city: city.citySlug,
      cityName: city.cityName,
      success: result.success,
      duration: result.duration,
      error: result.error,
      skipped: false,
    };

    results.push(cityResult);

    const status = result.success ? "✅" : "❌";
    const time = `${(result.duration / 1000).toFixed(1)}s`;
    console.log(`${progress} ${status} ${city.cityName}: ${time}`);

    if (!result.success && result.error) {
      console.error(`    Error: ${result.error.slice(0, 200)}`);
    }
  }

  // Print summary
  const totalTime = Date.now() - startTime;
  const successful = results.filter((r) => r.success).length;
  const failed = results.filter((r) => !r.success).length;

  console.log(`\n${"=".repeat(70)}`);
  console.log(`NL BULK PIPELINE SUMMARY`);
  console.log(`${"=".repeat(70)}`);
  console.log(`Total cities:    ${citiesToProcess.length}`);
  console.log(`Successful:      ${successful} ✅`);
  console.log(`Failed:          ${failed} ❌`);
  console.log(`Total time:      ${(totalTime / 1000).toFixed(1)}s`);
  console.log(`Avg per city:    ${(totalTime / citiesToProcess.length / 1000).toFixed(1)}s`);
  console.log(`${"=".repeat(70)}`);

  // Detailed results table
  console.log(`\nDetailed Results:`);
  console.log(`${"─".repeat(50)}`);
  for (const result of results) {
    const status = result.success ? "✅ OK" : "❌ FAIL";
    const time = `${(result.duration / 1000).toFixed(1)}s`;
    console.log(`  ${result.cityName.padEnd(20)} ${status.padEnd(10)} ${time}`);
  }
  console.log(`${"─".repeat(50)}`);

  // Exit with error if any failed
  if (failed > 0) {
    console.log(`\n⚠️  ${failed} city/cities failed. Check logs above for details.`);
    process.exit(1);
  }

  console.log(`\n✅ All ${successful} cities processed successfully!`);
}

main().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});
