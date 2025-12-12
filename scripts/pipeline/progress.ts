/**
 * Progress Tracking System
 *
 * Persists progress to disk so scripts can resume after crashes/stops.
 * Stores state in JSON files in the data/pipeline-progress/ directory.
 */

import fs from "fs";
import path from "path";

const PROGRESS_DIR = path.join(process.cwd(), "data", "pipeline-progress");

export interface DiscoveryProgress {
  type: "discovery";
  country: string;
  category: string;
  startedAt: string;
  updatedAt: string;
  completedCities: string[];
  currentCity: string | null;
  stats: {
    totalCities: number;
    processedCities: number;
    totalFound: number;
    totalCreated: number;
    totalSkipped: number;
    totalErrors: number;
  };
  errors: Array<{
    city: string;
    error: string;
    timestamp: string;
  }>;
}

export interface EnrichmentProgress {
  type: "enrichment";
  country: string;
  startedAt: string;
  updatedAt: string;
  lastProcessedId: number;
  stats: {
    totalToProcess: number;
    processed: number;
    enriched: number;
    failed: number;
    skipped: number;
  };
  errors: Array<{
    placeId: number;
    placeName: string;
    error: string;
    timestamp: string;
  }>;
}

export type PipelineProgress = DiscoveryProgress | EnrichmentProgress;

/**
 * Ensure progress directory exists
 */
function ensureProgressDir(): void {
  if (!fs.existsSync(PROGRESS_DIR)) {
    fs.mkdirSync(PROGRESS_DIR, { recursive: true });
  }
}

/**
 * Get progress file path
 */
function getProgressPath(type: string, country: string, category?: string): string {
  const suffix = category ? `-${category}` : "";
  return path.join(PROGRESS_DIR, `${type}-${country}${suffix}.json`);
}

/**
 * Load progress from file
 */
export function loadProgress<T extends PipelineProgress>(
  type: string,
  country: string,
  category?: string
): T | null {
  const filePath = getProgressPath(type, country, category);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(`Failed to load progress from ${filePath}:`, error);
    return null;
  }
}

/**
 * Save progress to file
 */
export function saveProgress(progress: PipelineProgress, category?: string): void {
  ensureProgressDir();

  const cat = progress.type === "discovery" ? (progress as DiscoveryProgress).category : category;
  const filePath = getProgressPath(progress.type, progress.country, cat);

  progress.updatedAt = new Date().toISOString();

  try {
    fs.writeFileSync(filePath, JSON.stringify(progress, null, 2));
  } catch (error) {
    console.error(`Failed to save progress to ${filePath}:`, error);
  }
}

/**
 * Create new discovery progress
 */
export function createDiscoveryProgress(
  country: string,
  category: string,
  totalCities: number
): DiscoveryProgress {
  return {
    type: "discovery",
    country,
    category,
    startedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    completedCities: [],
    currentCity: null,
    stats: {
      totalCities,
      processedCities: 0,
      totalFound: 0,
      totalCreated: 0,
      totalSkipped: 0,
      totalErrors: 0,
    },
    errors: [],
  };
}

/**
 * Create new enrichment progress
 */
export function createEnrichmentProgress(
  country: string,
  totalToProcess: number
): EnrichmentProgress {
  return {
    type: "enrichment",
    country,
    startedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastProcessedId: 0,
    stats: {
      totalToProcess,
      processed: 0,
      enriched: 0,
      failed: 0,
      skipped: 0,
    },
    errors: [],
  };
}

/**
 * Clear completed progress file
 */
export function clearProgress(type: string, country: string, category?: string): void {
  const filePath = getProgressPath(type, country, category);

  if (fs.existsSync(filePath)) {
    // Rename to .completed instead of deleting
    const completedPath = filePath.replace(".json", `-completed-${Date.now()}.json`);
    fs.renameSync(filePath, completedPath);
    console.log(`Progress archived to ${completedPath}`);
  }
}

/**
 * Get all active progress files
 */
export function listActiveProgress(): Array<{ type: string; country: string; category?: string; progress: PipelineProgress }> {
  ensureProgressDir();

  const files = fs.readdirSync(PROGRESS_DIR);
  const results: Array<{ type: string; country: string; category?: string; progress: PipelineProgress }> = [];

  for (const file of files) {
    if (!file.endsWith(".json") || file.includes("-completed-")) continue;

    const match = file.match(/^(discovery|enrichment)-([A-Z]{2})(?:-(.+))?\.json$/);
    if (!match) continue;

    const [, type, country, category] = match;
    const progress = loadProgress(type, country, category);

    if (progress) {
      results.push({ type, country, category, progress });
    }
  }

  return results;
}

/**
 * Format progress as human-readable string
 */
export function formatProgress(progress: PipelineProgress): string {
  if (progress.type === "discovery") {
    const p = progress as DiscoveryProgress;
    const pct = Math.round((p.stats.processedCities / p.stats.totalCities) * 100);
    return `Discovery ${p.country}/${p.category}: ${p.stats.processedCities}/${p.stats.totalCities} cities (${pct}%) | ${p.stats.totalCreated} created`;
  } else {
    const p = progress as EnrichmentProgress;
    const pct = Math.round((p.stats.processed / p.stats.totalToProcess) * 100);
    return `Enrichment ${p.country}: ${p.stats.processed}/${p.stats.totalToProcess} (${pct}%) | ${p.stats.enriched} enriched, ${p.stats.failed} failed`;
  }
}
