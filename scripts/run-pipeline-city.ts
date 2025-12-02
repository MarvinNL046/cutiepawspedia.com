#!/usr/bin/env npx tsx
/**
 * A.1: Multi-City Pipeline Runner
 *
 * Orchestrates the full data pipeline for a single city:
 * 1. collect-osm    → data/raw/osm/{country}/{city}.json
 * 2. collect-pdok   → data/raw/pdok/{country}/{city}.json (NL only)
 * 3. collect-bright → data/raw/bright/{country}/{city}.json
 * 4. enrich-jina    → data/raw/jina/{country}/{city}.json
 * 5. normalize-merge → data/staged/{country}/{city}.json
 * 6. seed-from-staged → Neon DB
 *
 * Usage:
 *   npx tsx scripts/run-pipeline-city.ts --country=nl --city=rotterdam
 *   npx tsx scripts/run-pipeline-city.ts --country=nl --city=rotterdam --skip-bright --skip-jina
 *   npx tsx scripts/run-pipeline-city.ts --country=de --city=berlin --limit-bright=20
 *
 * Options:
 *   --dry-run         Show plan without executing
 *   --force           Overwrite existing data
 *   --skip-pdok       Skip PDOK collection (auto-skipped for non-NL)
 *   --skip-bright     Skip Bright Data collection
 *   --skip-jina       Skip Jina AI enrichment
 *   --skip-seed       Skip database seeding (staging only)
 *   --limit-bright    Limit Bright Data requests (cost control)
 *   --limit-jina      Limit Jina AI requests (cost control)
 *   --cheap-mode      Alias for --skip-bright --skip-jina
 */

import { spawn, type ChildProcess } from "child_process";
import { parseArgs } from "util";
import { getCity, COUNTRY_NAMES } from "./config/cities";
import { getNlCityConfig } from "./config/nl-cities";

// =============================================================================
// CLI PARSING
// =============================================================================

interface CliArgs {
  country?: string;
  city?: string;
  dryRun?: boolean;
  force?: boolean;
  skipPdok?: boolean;
  skipBright?: boolean;
  skipJina?: boolean;
  skipSeed?: boolean;
  limitBright?: number;
  limitJina?: number;
  cheapMode?: boolean;
  verbose?: boolean;
  help?: boolean;
}

function parseCliArgs(): CliArgs {
  try {
    const { values } = parseArgs({
      options: {
        country: { type: "string", short: "c" },
        city: { type: "string" },
        "dry-run": { type: "boolean", short: "d" },
        force: { type: "boolean", short: "f" },
        "skip-pdok": { type: "boolean" },
        "skip-bright": { type: "boolean" },
        "skip-jina": { type: "boolean" },
        "skip-seed": { type: "boolean" },
        "limit-bright": { type: "string" },
        "limit-jina": { type: "string" },
        "cheap-mode": { type: "boolean" },
        verbose: { type: "boolean", short: "v" },
        help: { type: "boolean", short: "h" },
      },
      strict: true,
    });

    return {
      country: values.country,
      city: values.city,
      dryRun: values["dry-run"],
      force: values.force,
      skipPdok: values["skip-pdok"],
      skipBright: values["skip-bright"],
      skipJina: values["skip-jina"],
      skipSeed: values["skip-seed"],
      limitBright: values["limit-bright"] ? parseInt(values["limit-bright"], 10) : undefined,
      limitJina: values["limit-jina"] ? parseInt(values["limit-jina"], 10) : undefined,
      cheapMode: values["cheap-mode"],
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
  console.log(`
Multi-City Pipeline Runner for CutiePawsPedia

Orchestrates the full data pipeline for a single city.

Usage:
  npx tsx scripts/run-pipeline-city.ts --country=<code> --city=<slug>
  npx tsx scripts/run-pipeline-city.ts --help

Options:
  -c, --country <code>    Country code (nl, be, de)
  --city <slug>           City slug (e.g., rotterdam, berlin)
  -d, --dry-run           Show plan without executing
  -f, --force             Overwrite existing data
  --skip-pdok             Skip PDOK collection (auto for non-NL)
  --skip-bright           Skip Bright Data collection
  --skip-jina             Skip Jina AI enrichment
  --skip-seed             Skip database seeding
  --limit-bright <n>      Limit Bright Data requests
  --limit-jina <n>        Limit Jina AI requests
  --cheap-mode            Skip Bright & Jina (fast dev runs)
  -v, --verbose           Verbose output
  -h, --help              Show this help

Examples:
  # Full pipeline for Rotterdam
  npx tsx scripts/run-pipeline-city.ts --country=nl --city=rotterdam

  # Development run (no API costs)
  npx tsx scripts/run-pipeline-city.ts --country=nl --city=rotterdam --cheap-mode

  # Limited API usage
  npx tsx scripts/run-pipeline-city.ts --country=nl --city=rotterdam --limit-bright=20 --limit-jina=20

  # Belgium city (no PDOK)
  npx tsx scripts/run-pipeline-city.ts --country=be --city=brussels

Pipeline Steps:
  1. collect-osm     - OpenStreetMap POIs
  2. collect-pdok    - PDOK BAG addresses (NL only)
  3. collect-bright  - Bright Data enrichment
  4. enrich-jina     - Jina AI summaries
  5. normalize-merge - Merge all sources
  6. seed-from-staged - Seed Neon database
`);
}

// =============================================================================
// SCRIPT RUNNER
// =============================================================================

interface StepResult {
  step: string;
  success: boolean;
  duration: number;
  skipped: boolean;
  error?: string;
}

/**
 * Run a script and capture output
 */
function runScript(
  script: string,
  args: string[],
  verbose: boolean
): Promise<{ success: boolean; duration: number; error?: string }> {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const fullArgs = ["tsx", script, ...args];

    if (verbose) {
      console.log(`\n  $ npx ${fullArgs.join(" ")}`);
    }

    const proc: ChildProcess = spawn("npx", fullArgs, {
      stdio: verbose ? "inherit" : "pipe",
      shell: true,
    });

    let stderr = "";

    if (!verbose && proc.stderr) {
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
// PIPELINE ORCHESTRATOR
// =============================================================================

interface PipelineConfig {
  country: string;
  city: string;
  cityName: string;
  hasPdok: boolean;
  skipPdok: boolean;
  skipBright: boolean;
  skipJina: boolean;
  skipSeed: boolean;
  limitBright?: number;
  limitJina?: number;
  dryRun: boolean;
  force: boolean;
  verbose: boolean;
}

async function runPipeline(config: PipelineConfig): Promise<void> {
  const startTime = Date.now();
  const results: StepResult[] = [];

  console.log(`\n${"=".repeat(60)}`);
  console.log(`🚀 PIPELINE: ${config.cityName} (${config.country.toUpperCase()})`);
  console.log(`${"=".repeat(60)}`);

  if (config.dryRun) {
    console.log("⚠️  DRY RUN - No scripts will be executed\n");
  }

  // Build common args
  const commonArgs = [`--country=${config.country}`, `--city=${config.city}`];
  if (config.force) commonArgs.push("--force");

  // Step 1: OSM Collection
  console.log(`\n📍 Step 1/6: Collecting OSM data...`);
  if (config.dryRun) {
    results.push({ step: "collect-osm", success: true, duration: 0, skipped: false });
    console.log("   Would run: collect-osm.ts");
  } else {
    const osmResult = await runScript(
      "scripts/collect-osm.ts",
      [...commonArgs, config.verbose ? "--verbose" : ""].filter(Boolean),
      config.verbose
    );
    results.push({
      step: "collect-osm",
      success: osmResult.success,
      duration: osmResult.duration,
      skipped: false,
      error: osmResult.error,
    });
    if (!osmResult.success) {
      console.error(`   ❌ OSM collection failed: ${osmResult.error}`);
      printResults(results, startTime);
      process.exit(1);
    }
    console.log(`   ✅ OSM done (${(osmResult.duration / 1000).toFixed(1)}s)`);
  }

  // Step 2: PDOK Collection (NL only)
  console.log(`\n📍 Step 2/6: Collecting PDOK BAG data...`);
  if (!config.hasPdok || config.skipPdok) {
    const reason = !config.hasPdok ? "not NL" : "skipped";
    console.log(`   ⏭️  Skipped (${reason})`);
    results.push({ step: "collect-pdok", success: true, duration: 0, skipped: true });
  } else if (config.dryRun) {
    results.push({ step: "collect-pdok", success: true, duration: 0, skipped: false });
    console.log("   Would run: collect-pdok.ts");
  } else {
    const pdokResult = await runScript(
      "scripts/collect-pdok.ts",
      [`--city=${config.city}`, config.force ? "--force" : "", config.verbose ? "--verbose" : ""].filter(Boolean),
      config.verbose
    );
    results.push({
      step: "collect-pdok",
      success: pdokResult.success,
      duration: pdokResult.duration,
      skipped: false,
      error: pdokResult.error,
    });
    if (!pdokResult.success) {
      console.warn(`   ⚠️  PDOK collection failed (continuing): ${pdokResult.error}`);
    } else {
      console.log(`   ✅ PDOK done (${(pdokResult.duration / 1000).toFixed(1)}s)`);
    }
  }

  // Step 3: Bright Data Collection
  console.log(`\n📍 Step 3/6: Collecting Bright Data...`);
  if (config.skipBright) {
    console.log(`   ⏭️  Skipped (--skip-bright or --cheap-mode)`);
    results.push({ step: "collect-bright", success: true, duration: 0, skipped: true });
  } else if (config.dryRun) {
    results.push({ step: "collect-bright", success: true, duration: 0, skipped: false });
    console.log("   Would run: collect-bright.ts");
  } else {
    const brightArgs = [...commonArgs];
    if (config.limitBright) brightArgs.push(`--limit=${config.limitBright}`);
    if (config.verbose) brightArgs.push("--verbose");

    const brightResult = await runScript("scripts/collect-bright.ts", brightArgs, config.verbose);
    results.push({
      step: "collect-bright",
      success: brightResult.success,
      duration: brightResult.duration,
      skipped: false,
      error: brightResult.error,
    });
    if (!brightResult.success) {
      console.warn(`   ⚠️  Bright Data collection failed (continuing): ${brightResult.error}`);
    } else {
      console.log(`   ✅ Bright done (${(brightResult.duration / 1000).toFixed(1)}s)`);
    }
  }

  // Step 4: Jina AI Enrichment
  console.log(`\n📍 Step 4/6: Enriching with Jina AI...`);
  if (config.skipJina) {
    console.log(`   ⏭️  Skipped (--skip-jina or --cheap-mode)`);
    results.push({ step: "enrich-jina", success: true, duration: 0, skipped: true });
  } else if (config.dryRun) {
    results.push({ step: "enrich-jina", success: true, duration: 0, skipped: false });
    console.log("   Would run: enrich-jina.ts");
  } else {
    const jinaArgs = [...commonArgs];
    if (config.limitJina) jinaArgs.push(`--limit=${config.limitJina}`);
    if (config.verbose) jinaArgs.push("--verbose");

    const jinaResult = await runScript("scripts/enrich-jina.ts", jinaArgs, config.verbose);
    results.push({
      step: "enrich-jina",
      success: jinaResult.success,
      duration: jinaResult.duration,
      skipped: false,
      error: jinaResult.error,
    });
    if (!jinaResult.success) {
      console.warn(`   ⚠️  Jina AI enrichment failed (continuing): ${jinaResult.error}`);
    } else {
      console.log(`   ✅ Jina done (${(jinaResult.duration / 1000).toFixed(1)}s)`);
    }
  }

  // Step 5: Normalize & Merge
  console.log(`\n📍 Step 5/6: Normalizing & merging data...`);
  if (config.dryRun) {
    results.push({ step: "normalize-merge", success: true, duration: 0, skipped: false });
    console.log("   Would run: normalize-merge.ts");
  } else {
    const mergeArgs = [...commonArgs];
    if (config.verbose) mergeArgs.push("--verbose");

    const mergeResult = await runScript("scripts/normalize-merge.ts", mergeArgs, config.verbose);
    results.push({
      step: "normalize-merge",
      success: mergeResult.success,
      duration: mergeResult.duration,
      skipped: false,
      error: mergeResult.error,
    });
    if (!mergeResult.success) {
      console.error(`   ❌ Normalization failed: ${mergeResult.error}`);
      printResults(results, startTime);
      process.exit(1);
    }
    console.log(`   ✅ Merge done (${(mergeResult.duration / 1000).toFixed(1)}s)`);
  }

  // Step 6: Seed Database
  console.log(`\n📍 Step 6/6: Seeding database...`);
  if (config.skipSeed) {
    console.log(`   ⏭️  Skipped (--skip-seed)`);
    results.push({ step: "seed-from-staged", success: true, duration: 0, skipped: true });
  } else if (config.dryRun) {
    results.push({ step: "seed-from-staged", success: true, duration: 0, skipped: false });
    console.log("   Would run: seed-from-staged.ts");
  } else {
    const seedArgs = [...commonArgs];
    if (config.verbose) seedArgs.push("--verbose");

    const seedResult = await runScript("scripts/seed-from-staged.ts", seedArgs, config.verbose);
    results.push({
      step: "seed-from-staged",
      success: seedResult.success,
      duration: seedResult.duration,
      skipped: false,
      error: seedResult.error,
    });
    if (!seedResult.success) {
      console.error(`   ❌ Database seeding failed: ${seedResult.error}`);
      printResults(results, startTime);
      process.exit(1);
    }
    console.log(`   ✅ Seed done (${(seedResult.duration / 1000).toFixed(1)}s)`);
  }

  // Print summary
  printResults(results, startTime);
}

function printResults(results: StepResult[], startTime: number): void {
  const totalTime = Date.now() - startTime;

  console.log(`\n${"=".repeat(60)}`);
  console.log("PIPELINE SUMMARY");
  console.log(`${"=".repeat(60)}`);

  for (const result of results) {
    const status = result.skipped
      ? "⏭️  SKIPPED"
      : result.success
        ? "✅ SUCCESS"
        : "❌ FAILED";
    const time = result.skipped ? "-" : `${(result.duration / 1000).toFixed(1)}s`;
    console.log(`  ${result.step.padEnd(20)} ${status.padEnd(12)} ${time}`);
  }

  console.log(`${"=".repeat(60)}`);
  console.log(`Total time: ${(totalTime / 1000).toFixed(1)}s`);

  const failed = results.filter((r) => !r.success && !r.skipped);
  if (failed.length > 0) {
    console.log(`\n❌ ${failed.length} step(s) failed`);
  } else {
    console.log(`\n✅ Pipeline completed successfully!`);
  }
}

// =============================================================================
// MAIN
// =============================================================================

async function main(): Promise<void> {
  const args = parseCliArgs();

  if (args.help) {
    printHelp();
    process.exit(0);
  }

  if (!args.country || !args.city) {
    console.error("❌ Error: --country and --city are required");
    console.error("   Use --help for usage information");
    process.exit(1);
  }

  // Validate city exists in config
  const cityConfig = getCity(args.country, args.city);
  if (!cityConfig) {
    console.error(`❌ Error: City "${args.city}" not found in country "${args.country}"`);
    console.error(`   Available countries: nl, be, de`);
    console.error(`   Run: npx tsx scripts/collect-osm.ts --list-cities`);
    process.exit(1);
  }

  // Check if NL city has PDOK config
  const nlConfig = args.country.toLowerCase() === "nl" ? getNlCityConfig(args.city) : null;
  const hasPdok = Boolean(nlConfig);

  // Apply cheap mode
  const skipBright = args.cheapMode || args.skipBright || false;
  const skipJina = args.cheapMode || args.skipJina || false;

  const config: PipelineConfig = {
    country: args.country.toLowerCase(),
    city: args.city.toLowerCase(),
    cityName: cityConfig.name,
    hasPdok,
    skipPdok: args.skipPdok || false,
    skipBright,
    skipJina,
    skipSeed: args.skipSeed || false,
    limitBright: args.limitBright,
    limitJina: args.limitJina,
    dryRun: args.dryRun || false,
    force: args.force || false,
    verbose: args.verbose || false,
  };

  await runPipeline(config);
}

main().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});
