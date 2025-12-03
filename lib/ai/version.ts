/**
 * AI Content Version Configuration
 *
 * Central versioning for AI-generated content.
 * Bump version when prompts change to trigger regeneration.
 *
 * Versioning Strategy:
 * - Major version (v1 → v2): Complete prompt rewrite
 * - Minor version (v1.0 → v1.1): Significant prompt improvements
 * - Patch version (v1.0.0 → v1.0.1): Small tweaks and fixes
 */

// =============================================================================
// VERSION CONFIGURATION
// =============================================================================

/**
 * Current AI content version
 *
 * IMPORTANT: Bump this when you update prompts!
 * - Old content stays in cache until regenerated
 * - Cron job will gradually regenerate outdated versions
 * - No downtime - stale content served until replaced
 */
export const AI_VERSION = "v1";

/**
 * Version history for tracking changes
 */
export const AI_VERSION_HISTORY = {
  v1: {
    date: "2024-12-03",
    description: "Initial AI content system with structured output",
    changes: ["Initial prompts for all page types", "Multi-locale support (nl, en, de)"],
  },
} as const;

// =============================================================================
// MODEL CONFIGURATION
// =============================================================================

/**
 * AI model to use for content generation
 *
 * Options:
 * - "gpt-4o-mini": Fast and cheap, good for bulk generation
 * - "gpt-4o": Higher quality, more expensive
 * - "claude-3-haiku": Fast Claude model
 * - "claude-3-sonnet": Higher quality Claude
 */
export const AI_MODEL = process.env.AI_MODEL || "gpt-4o-mini";

/**
 * AI provider configuration
 */
export const AI_PROVIDER = process.env.AI_PROVIDER || "openai"; // openai, anthropic

/**
 * Maximum tokens for AI responses
 */
export const AI_MAX_TOKENS = 1500;

/**
 * Temperature for AI responses (0-1)
 * Lower = more focused, Higher = more creative
 */
export const AI_TEMPERATURE = 0.7;

// =============================================================================
// RATE LIMITING CONFIGURATION
// =============================================================================

/**
 * Maximum AI generations per cron run
 */
export const AI_MAX_GENERATIONS_PER_CRON = 50;

/**
 * Maximum AI generations per day (to control costs)
 */
export const AI_MAX_GENERATIONS_PER_DAY = 500;

/**
 * Content staleness threshold in days
 * Content older than this will be queued for regeneration
 */
export const AI_STALENESS_THRESHOLD_DAYS = 14;

// =============================================================================
// CACHE CONFIGURATION
// =============================================================================

/**
 * Enable/disable AI content generation
 * Set to false to use fallback templates only
 */
export const AI_ENABLED = process.env.NEXT_PUBLIC_AI_CONTENT_ENABLED !== "false";

/**
 * Enable caching to database
 */
export const AI_CACHE_ENABLED = process.env.AI_CACHE_ENABLED !== "false";

/**
 * Default cache TTL in seconds (for in-memory cache)
 */
export const AI_MEMORY_CACHE_TTL = 300; // 5 minutes

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Check if a cached version is outdated
 */
export function isVersionOutdated(cachedVersion: string): boolean {
  return cachedVersion !== AI_VERSION;
}

/**
 * Get current configuration summary
 */
export function getAiConfig() {
  return {
    version: AI_VERSION,
    model: AI_MODEL,
    provider: AI_PROVIDER,
    maxTokens: AI_MAX_TOKENS,
    temperature: AI_TEMPERATURE,
    enabled: AI_ENABLED,
    cacheEnabled: AI_CACHE_ENABLED,
    maxGenerationsPerCron: AI_MAX_GENERATIONS_PER_CRON,
    maxGenerationsPerDay: AI_MAX_GENERATIONS_PER_DAY,
    stalenessThresholdDays: AI_STALENESS_THRESHOLD_DAYS,
  };
}
