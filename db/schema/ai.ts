/**
 * AI Content Cache Schema
 *
 * Persistent storage layer for AI-generated SEO content.
 * Enables scalable AI content generation for 100k+ pages.
 *
 * Features:
 * - Versioned content for easy regeneration on prompt updates
 * - Multi-locale support
 * - Structured content storage with JSONB
 * - Staleness tracking for background regeneration
 */

import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
  jsonb,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// ============================================================================
// AI CONTENT CACHE TABLE
// ============================================================================

/**
 * AI Content Cache
 *
 * Stores AI-generated content for all page types.
 * Key format examples:
 * - "country:netherlands:nl"
 * - "city:amsterdam:netherlands:nl"
 * - "category:veterinary:amsterdam:netherlands:nl"
 * - "place:pets-place:amsterdam:netherlands:nl"
 * - "combo:veterinary:amsterdam:netherlands:nl" (category × city)
 * - "best:veterinary:amsterdam:netherlands:nl"
 * - "top:veterinary:netherlands:nl"
 */
export const aiContentCache = pgTable(
  "ai_content_cache",
  {
    id: serial("id").primaryKey(),

    // Unique cache key (e.g., "city:amsterdam:netherlands:nl")
    key: text("key").unique().notNull(),

    // Content type for filtering
    contentType: varchar("content_type", { length: 50 }).notNull(), // country, city, category, place, combo, best, top

    // Structured content (intro, sections, FAQs, etc.)
    content: jsonb("content").notNull(),

    // AI model used for generation
    model: varchar("model", { length: 100 }).notNull(), // e.g., "gpt-4o-mini", "claude-3-haiku"

    // Locale of the content
    locale: varchar("locale", { length: 10 }).notNull(), // nl, en, de

    // Version for invalidation on prompt updates
    version: varchar("version", { length: 50 }).notNull(), // e.g., "v1", "v2"

    // Token usage tracking
    promptTokens: integer("prompt_tokens"),
    completionTokens: integer("completion_tokens"),

    // Generation metadata
    generatedAt: timestamp("generated_at").defaultNow().notNull(),
    generationTimeMs: integer("generation_time_ms"),

    // Staleness tracking
    isStale: boolean("is_stale").default(false).notNull(),
    markedStaleAt: timestamp("marked_stale_at"),

    // Error tracking
    lastError: text("last_error"),
    errorCount: integer("error_count").default(0).notNull(),

    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    // Index for fast lookups by content type
    index("ai_content_cache_content_type_idx").on(table.contentType),
    // Index for staleness queries
    index("ai_content_cache_stale_idx").on(table.isStale, table.updatedAt),
    // Index for version mismatch queries
    index("ai_content_cache_version_idx").on(table.version),
    // Index for locale filtering
    index("ai_content_cache_locale_idx").on(table.locale),
    // Unique key index
    uniqueIndex("ai_content_cache_key_idx").on(table.key),
  ]
);

// ============================================================================
// AI CONTENT STRUCTURE TYPES
// ============================================================================

/**
 * Structured content stored in the content JSONB field
 */
export interface AiContentStructure {
  // Main intro paragraph (HTML/markdown)
  intro: string;

  // Optional secondary paragraph
  secondary?: string;

  // Content sections with headings
  sections?: Array<{
    heading: string;
    content: string;
  }>;

  // FAQ items
  faqs?: Array<{
    question: string;
    answer: string;
  }>;

  // Meta description (max 160 chars)
  metaDescription?: string;

  // H1 heading suggestion
  h1?: string;

  // Schema.org description
  schemaDescription?: string;

  // Call-to-action text
  cta?: string;

  // Bullet points
  bullets?: string[];

  // Internal linking suggestions
  relatedLinks?: Array<{
    text: string;
    href: string;
  }>;
}

/**
 * Content type for the cache
 */
export type AiContentType =
  | "country"
  | "city"
  | "category"
  | "place"
  | "combo" // category × city
  | "best" // best-of pages
  | "top"; // top-N pages

// ============================================================================
// AI GENERATION QUEUE TABLE (for background processing)
// ============================================================================

/**
 * AI Generation Queue
 *
 * Queue for background AI content generation.
 * Used by the cron job to process items in batches.
 */
export const aiGenerationQueue = pgTable(
  "ai_generation_queue",
  {
    id: serial("id").primaryKey(),

    // Cache key to generate/regenerate
    cacheKey: text("cache_key").notNull(),

    // Content type
    contentType: varchar("content_type", { length: 50 }).notNull(),

    // Locale
    locale: varchar("locale", { length: 10 }).notNull(),

    // Priority (higher = more urgent)
    priority: integer("priority").default(0).notNull(),

    // Status
    status: varchar("status", { length: 20 }).default("pending").notNull(), // pending, processing, completed, failed

    // Processing metadata
    attempts: integer("attempts").default(0).notNull(),
    lastAttemptAt: timestamp("last_attempt_at"),
    completedAt: timestamp("completed_at"),
    error: text("error"),

    // Context data for generation (e.g., place info, category info)
    contextData: jsonb("context_data"),

    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    // Index for queue processing (get pending items by priority)
    index("ai_generation_queue_status_priority_idx").on(table.status, table.priority),
    // Index for deduplication
    index("ai_generation_queue_cache_key_idx").on(table.cacheKey),
  ]
);

/**
 * Queue status type
 */
export type AiQueueStatus = "pending" | "processing" | "completed" | "failed";
