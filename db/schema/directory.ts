import { relations } from "drizzle-orm";
import {
  pgTable,
  pgEnum,
  serial,
  varchar,
  text,
  timestamp,
  date,
  boolean,
  integer,
  decimal,
  primaryKey,
  jsonb,
  index,
} from "drizzle-orm/pg-core";
import type { AnyPgColumn } from "drizzle-orm/pg-core";

// ============================================================================
// ENUMS
// ============================================================================

// Review status enum
export const reviewStatusEnum = pgEnum("review_status", [
  "pending",
  "published",
  "rejected",
  "flagged",
]);

// Review reply author type enum
export const reviewReplyAuthorTypeEnum = pgEnum("review_reply_author_type", [
  "business",
  "admin",
]);

// Review photo status enum
export const reviewPhotoStatusEnum = pgEnum("review_photo_status", [
  "pending",
  "approved",
  "rejected",
  "flagged",
]);

// Place status enum (for closed/moved detection)
export const placeStatusEnum = pgEnum("place_status", [
  "active",
  "temporarily_closed",
  "permanently_closed",
  "unknown",
]);

// Refresh job status enum
export const refreshJobStatusEnum = pgEnum("refresh_job_status", [
  "pending",
  "in_progress",
  "done",
  "failed",
]);

// ============================================================================
// LOCATIONS
// ============================================================================

// Countries table
export const countries = pgTable("countries", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
  code: varchar("code", { length: 3 }).unique().notNull(), // ISO country code
  name: varchar("name", { length: 255 }).notNull(),
});

// Cities table
export const cities = pgTable(
  "cities",
  {
    id: serial("id").primaryKey(),
    countryId: integer("country_id")
      .notNull()
      .references(() => countries.id, { onDelete: "cascade" }),
    slug: varchar("slug", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    lat: decimal("lat", { precision: 10, scale: 7 }),
    lng: decimal("lng", { precision: 10, scale: 7 }),
  },
  (table) => [index("cities_country_id_idx").on(table.countryId)]
);

// ============================================================================
// CATEGORIES
// ============================================================================

// Categories table
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
  icon: varchar("icon", { length: 100 }), // Icon name (e.g., lucide icon)
  labelKey: varchar("label_key", { length: 255 }).notNull(), // i18n key
});

// ============================================================================
// PLACES (LISTINGS)
// ============================================================================

// Places table - the core directory listings
export const places = pgTable(
  "places",
  {
    id: serial("id").primaryKey(),
    ownerId: integer("owner_id").references(() => users.id, { onDelete: "set null" }), // Legacy: direct user owner
    businessId: integer("business_id").references(() => businesses.id, { onDelete: "set null" }), // Business account
    cityId: integer("city_id")
      .notNull()
      .references(() => cities.id, { onDelete: "cascade" }),
    slug: varchar("slug", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    address: varchar("address", { length: 500 }),
    postalCode: varchar("postal_code", { length: 20 }),
    phone: varchar("phone", { length: 50 }),
    website: varchar("website", { length: 500 }),
    email: varchar("email", { length: 255 }),
    lat: decimal("lat", { precision: 10, scale: 7 }),
    lng: decimal("lng", { precision: 10, scale: 7 }),
    openingHours: jsonb("opening_hours"), // JSONB: { mon: "09:00-18:00", tue: "09:00-18:00", ... }
    isVerified: boolean("is_verified").default(false).notNull(),
    isPremium: boolean("is_premium").default(false).notNull(),
    premiumSince: timestamp("premium_since"), // When premium was activated
    premiumUntil: timestamp("premium_until"), // For future subscription support
    premiumLevel: integer("premium_level").default(0).notNull(), // 0 = none, 1 = featured, 2+ = future tiers
    avgRating: decimal("avg_rating", { precision: 2, scale: 1 }).default("0"),
    reviewCount: integer("review_count").default(0).notNull(),
    lastReviewAt: timestamp("last_review_at"), // When the most recent review was posted
    // Trust badges (denormalized for performance)
    hasPhotos: boolean("has_photos").default(false).notNull(), // Has approved review photos
    isTopRated: boolean("is_top_rated").default(false).notNull(), // High rating + sufficient reviews
    isCommunityFavorite: boolean("is_community_favorite").default(false).notNull(), // Popular with many reviews
    // Data quality tracking (D1)
    dataQualityScore: integer("data_quality_score").default(0).notNull(), // 0-100 score
    dataQualityFlags: jsonb("data_quality_flags"), // Array of quality issue flags
    lastRefreshedAt: timestamp("last_refreshed_at"), // When data was last refreshed
    // Scraped enrichment content (for AI content generation)
    scrapedContent: jsonb("scraped_content"), // { aboutUs?: string, googleRating?: number, googleReviewCount?: number, scrapedAt?: string }
    // Place status (for closed/moved detection)
    status: placeStatusEnum("status").default("active").notNull(),
    statusLastCheckedAt: timestamp("status_last_checked_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("places_city_id_idx").on(table.cityId),
    index("places_business_id_idx").on(table.businessId),
  ]
);

// Junction table: places <-> categories (many-to-many)
export const placeCategories = pgTable(
  "place_categories",
  {
    placeId: integer("place_id")
      .notNull()
      .references(() => places.id, { onDelete: "cascade" }),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({ columns: [table.placeId, table.categoryId] }),
    index("place_categories_category_id_idx").on(table.categoryId),
  ]
);

// ============================================================================
// USERS & AUTH
// ============================================================================

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  stackauthId: varchar("stackauth_id", { length: 255 }).unique().notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  name: varchar("name", { length: 255 }),
  role: varchar("role", { length: 50 }).default("user").notNull(), // user, business, admin
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================================================
// USER FAVORITES (P1 - Users & Favorites)
// ============================================================================

// User favorites table - saved places for users
export const userFavorites = pgTable(
  "user_favorites",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    placeId: integer("place_id")
      .notNull()
      .references(() => places.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("user_favorites_user_id_idx").on(table.userId),
    index("user_favorites_place_id_idx").on(table.placeId),
    // Unique constraint: one favorite per user/place combination
    index("user_favorites_unique_idx").on(table.userId, table.placeId),
  ]
);

// User recent views table - recently viewed places
export const userRecentViews = pgTable(
  "user_recent_views",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    placeId: integer("place_id")
      .notNull()
      .references(() => places.id, { onDelete: "cascade" }),
    viewedAt: timestamp("viewed_at").defaultNow().notNull(),
  },
  (table) => [
    index("user_recent_views_user_id_idx").on(table.userId),
    index("user_recent_views_place_id_idx").on(table.placeId),
    index("user_recent_views_viewed_at_idx").on(table.viewedAt),
    // Unique constraint: one view record per user/place (upsert on view)
    index("user_recent_views_unique_idx").on(table.userId, table.placeId),
  ]
);

// ============================================================================
// BUSINESSES (for B2B management)
// ============================================================================

// Businesses table - represents business accounts (customers)
export const businesses = pgTable("businesses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }), // Owner user
  slug: varchar("slug", { length: 255 }).unique(), // For dashboard URLs: /dashboard/my-pet-shop
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"), // Business description
  website: varchar("website", { length: 500 }), // Business website URL
  logo: varchar("logo", { length: 500 }), // Logo image URL
  contactEmail: varchar("contact_email", { length: 255 }),
  contactPhone: varchar("contact_phone", { length: 50 }),
  status: varchar("status", { length: 20 }).default("active").notNull(), // active, pending, suspended
  plan: varchar("plan", { length: 20 }).default("free").notNull(), // free, starter, pro, enterprise
  billingStatus: varchar("billing_status", { length: 20 }).default("trial").notNull(), // trial, paid, overdue, cancelled
  // Stripe integration
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }), // Stripe customer ID
  // Credits system (prepaid balance for leads)
  creditBalanceCents: integer("credit_balance_cents").default(0).notNull(), // Current credit balance
  leadPriceCents: integer("lead_price_cents"), // Custom lead price in cents (optional override)
  autoChargeEnabled: boolean("auto_charge_enabled").default(true).notNull(), // Auto-charge credits for new leads
  notes: text("notes"), // Internal admin notes
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================================================
// REVIEWS
// ============================================================================

// Reviews table - comprehensive UGC reviews with moderation
export const reviews = pgTable(
  "reviews",
  {
    id: serial("id").primaryKey(),
    placeId: integer("place_id")
      .notNull()
      .references(() => places.id, { onDelete: "cascade" }),
    businessId: integer("business_id")
      .references(() => businesses.id, { onDelete: "set null" }), // Optional: linked business (for quick dashboard access)
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    // Review content
    rating: integer("rating").notNull(), // 1-5 stars
    title: varchar("title", { length: 255 }), // Optional review title/headline
    body: text("body").notNull(), // Review content (replaces old 'comment')
    // Localization
    locale: varchar("locale", { length: 10 }).default("en").notNull(), // en, nl, etc.
    // Moderation
    status: reviewStatusEnum("status").default("pending").notNull(), // pending, published, rejected, flagged
    isFeatured: boolean("is_featured").default(false).notNull(), // For highlighting best reviews
    // Additional context
    visitDate: date("visit_date"), // When the reviewer visited (optional)
    ipHash: varchar("ip_hash", { length: 64 }), // SHA-256 hash of IP for spam detection (privacy-safe)
    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("reviews_place_id_idx").on(table.placeId),
    index("reviews_business_id_idx").on(table.businessId),
    index("reviews_user_id_idx").on(table.userId),
    index("reviews_status_idx").on(table.status),
  ]
);

// Review replies table - business/admin responses to reviews
export const reviewReplies = pgTable(
  "review_replies",
  {
    id: serial("id").primaryKey(),
    reviewId: integer("review_id")
      .notNull()
      .references(() => reviews.id, { onDelete: "cascade" }),
    // Author info
    authorType: reviewReplyAuthorTypeEnum("author_type").notNull(), // business or admin
    authorUserId: integer("author_user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    // Reply content
    body: text("body").notNull(),
    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("review_replies_review_id_idx").on(table.reviewId)]
);

// Review photos table - UGC photos attached to reviews
export const reviewPhotos = pgTable(
  "review_photos",
  {
    id: serial("id").primaryKey(),
    reviewId: integer("review_id")
      .notNull()
      .references(() => reviews.id, { onDelete: "cascade" }),
    placeId: integer("place_id")
      .notNull()
      .references(() => places.id, { onDelete: "cascade" }),
    userId: integer("user_id")
      .references(() => users.id, { onDelete: "set null" }), // Uploader (nullable for privacy)
    // Storage info
    storageKey: varchar("storage_key", { length: 500 }).notNull(), // e.g., review_photos/{placeId}/{reviewId}/{uuid}.jpg
    // Image metadata
    width: integer("width"),
    height: integer("height"),
    mimeType: varchar("mime_type", { length: 50 }).notNull(), // image/jpeg, image/png, image/webp
    filesizeBytes: integer("filesize_bytes"),
    // Alt text for accessibility (optional, can be auto-generated later)
    altText: varchar("alt_text", { length: 255 }),
    // Moderation
    status: reviewPhotoStatusEnum("status").default("pending").notNull(),
    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("review_photos_review_id_idx").on(table.reviewId),
    index("review_photos_place_id_idx").on(table.placeId),
    index("review_photos_status_idx").on(table.status),
  ]
);

// ============================================================================
// LEADS (for monetization)
// ============================================================================

// Leads table - pay-per-lead ready
export const leads = pgTable(
  "leads",
  {
    id: serial("id").primaryKey(),
    placeId: integer("place_id")
      .notNull()
      .references(() => places.id, { onDelete: "cascade" }),
    businessId: integer("business_id")
      .references(() => businesses.id, { onDelete: "set null" }), // Denormalized for quick lookups
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 50 }),
    message: text("message"),
    source: varchar("source", { length: 100 }), // where the lead came from
    // Lead lifecycle tracking
    status: varchar("status", { length: 20 }).default("new").notNull(), // new, sent, viewed, converted, spam
    viewedAt: timestamp("viewed_at"), // When business first viewed this lead
    // Charging info
    priceCents: integer("price_cents"), // Price charged for this lead (snapshot at time of creation)
    chargedAt: timestamp("charged_at"), // When credit was deducted
    chargedTransactionId: integer("charged_transaction_id").references((): AnyPgColumn => creditTransactions.id, { onDelete: "set null" }), // FK to credit transaction
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("leads_place_id_idx").on(table.placeId),
    index("leads_business_id_idx").on(table.businessId),
    index("leads_status_idx").on(table.status),
  ]
);

// ============================================================================
// PLACE CLAIMS (ownership claim flow)
// ============================================================================

// Place claims table - for users claiming ownership of places
export const placeClaims = pgTable("place_claims", {
  id: serial("id").primaryKey(),
  placeId: integer("place_id")
    .notNull()
    .references(() => places.id, { onDelete: "cascade" }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  // Claim status workflow: pending → approved/rejected
  status: varchar("status", { length: 20 }).default("pending").notNull(), // pending, approved, rejected
  // Verification documents/proof
  proofDocumentUrl: varchar("proof_document_url", { length: 500 }), // URL to uploaded proof
  businessRole: varchar("business_role", { length: 100 }), // e.g., "owner", "manager", "authorized representative"
  notes: text("notes"), // Claimant's notes/explanation
  // Admin review
  adminNotes: text("admin_notes"), // Internal admin notes
  reviewedBy: integer("reviewed_by").references(() => users.id, { onDelete: "set null" }),
  reviewedAt: timestamp("reviewed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================================
// CREDIT TRANSACTIONS (pay-per-lead & premium billing)
// ============================================================================

// Credit transactions table - tracks all credit movements
export const creditTransactions = pgTable("credit_transactions", {
  id: serial("id").primaryKey(),
  businessId: integer("business_id")
    .notNull()
    .references(() => businesses.id, { onDelete: "cascade" }),
  // Transaction details
  amountCents: integer("amount_cents").notNull(), // Positive = credit added, negative = credit used
  type: varchar("type", { length: 30 }).notNull(), // purchase, lead_charge, refund, bonus, premium_subscription
  description: varchar("description", { length: 500 }), // Human-readable description
  // Stripe integration
  stripePaymentIntentId: varchar("stripe_payment_intent_id", { length: 255 }), // For purchases
  stripeInvoiceId: varchar("stripe_invoice_id", { length: 255 }), // For subscriptions
  // Related entities
  leadId: integer("lead_id").references((): AnyPgColumn => leads.id, { onDelete: "set null" }), // For lead charges
  placeId: integer("place_id").references(() => places.id, { onDelete: "set null" }), // For premium subscriptions
  // Metadata for additional context
  metadata: jsonb("metadata"), // Store leadId, placeId, stripe session info, etc.
  // Balance snapshot (for audit trail)
  balanceAfterCents: integer("balance_after_cents").notNull(), // Balance after this transaction
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================================
// RELATIONS
// ============================================================================

export const countriesRelations = relations(countries, ({ many }) => ({
  cities: many(cities),
}));

export const citiesRelations = relations(cities, ({ one, many }) => ({
  country: one(countries, {
    fields: [cities.countryId],
    references: [countries.id],
  }),
  places: many(places),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  placeCategories: many(placeCategories),
}));

export const placesRelations = relations(places, ({ one, many }) => ({
  owner: one(users, {
    fields: [places.ownerId],
    references: [users.id],
  }),
  business: one(businesses, {
    fields: [places.businessId],
    references: [businesses.id],
  }),
  city: one(cities, {
    fields: [places.cityId],
    references: [cities.id],
  }),
  placeCategories: many(placeCategories),
  reviews: many(reviews),
  reviewPhotos: many(reviewPhotos),
  leads: many(leads),
  claims: many(placeClaims),
  refreshJobs: many(placeRefreshJobs),
  favorites: many(userFavorites),
  recentViews: many(userRecentViews),
}));

export const placeCategoriesRelations = relations(placeCategories, ({ one }) => ({
  place: one(places, {
    fields: [placeCategories.placeId],
    references: [places.id],
  }),
  category: one(categories, {
    fields: [placeCategories.categoryId],
    references: [categories.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  places: many(places),
  reviews: many(reviews),
  reviewReplies: many(reviewReplies),
  businesses: many(businesses),
  placeClaims: many(placeClaims),
  reviewedClaims: many(placeClaims, { relationName: "reviewedClaims" }),
  favorites: many(userFavorites),
  recentViews: many(userRecentViews),
}));

// User favorites relations (P1)
export const userFavoritesRelations = relations(userFavorites, ({ one }) => ({
  user: one(users, {
    fields: [userFavorites.userId],
    references: [users.id],
  }),
  place: one(places, {
    fields: [userFavorites.placeId],
    references: [places.id],
  }),
}));

// User recent views relations (P1)
export const userRecentViewsRelations = relations(userRecentViews, ({ one }) => ({
  user: one(users, {
    fields: [userRecentViews.userId],
    references: [users.id],
  }),
  place: one(places, {
    fields: [userRecentViews.placeId],
    references: [places.id],
  }),
}));

export const businessesRelations = relations(businesses, ({ one, many }) => ({
  owner: one(users, {
    fields: [businesses.userId],
    references: [users.id],
  }),
  places: many(places),
  reviews: many(reviews), // Reviews linked to this business
  leads: many(leads),
  creditTransactions: many(creditTransactions),
}));

export const reviewsRelations = relations(reviews, ({ one, many }) => ({
  place: one(places, {
    fields: [reviews.placeId],
    references: [places.id],
  }),
  business: one(businesses, {
    fields: [reviews.businessId],
    references: [businesses.id],
  }),
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
  replies: many(reviewReplies),
  photos: many(reviewPhotos),
}));

export const reviewRepliesRelations = relations(reviewReplies, ({ one }) => ({
  review: one(reviews, {
    fields: [reviewReplies.reviewId],
    references: [reviews.id],
  }),
  author: one(users, {
    fields: [reviewReplies.authorUserId],
    references: [users.id],
  }),
}));

export const reviewPhotosRelations = relations(reviewPhotos, ({ one }) => ({
  review: one(reviews, {
    fields: [reviewPhotos.reviewId],
    references: [reviews.id],
  }),
  place: one(places, {
    fields: [reviewPhotos.placeId],
    references: [places.id],
  }),
  user: one(users, {
    fields: [reviewPhotos.userId],
    references: [users.id],
  }),
}));

export const leadsRelations = relations(leads, ({ one }) => ({
  place: one(places, {
    fields: [leads.placeId],
    references: [places.id],
  }),
  business: one(businesses, {
    fields: [leads.businessId],
    references: [businesses.id],
  }),
}));

export const placeClaimsRelations = relations(placeClaims, ({ one }) => ({
  place: one(places, {
    fields: [placeClaims.placeId],
    references: [places.id],
  }),
  user: one(users, {
    fields: [placeClaims.userId],
    references: [users.id],
  }),
  reviewer: one(users, {
    fields: [placeClaims.reviewedBy],
    references: [users.id],
    relationName: "reviewedClaims",
  }),
}));

export const creditTransactionsRelations = relations(creditTransactions, ({ one }) => ({
  business: one(businesses, {
    fields: [creditTransactions.businessId],
    references: [businesses.id],
  }),
  lead: one(leads, {
    fields: [creditTransactions.leadId],
    references: [leads.id],
  }),
  place: one(places, {
    fields: [creditTransactions.placeId],
    references: [places.id],
  }),
}));

// ============================================================================
// AUDIT LOGS (General system-wide audit trail)
// ============================================================================

// Audit logs table - tracks all important events for compliance and analytics
export const auditLogs = pgTable(
  "audit_logs",
  {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    // Actor information (who performed the action)
    actorUserId: integer("actor_user_id").references(() => users.id, {
      onDelete: "set null",
    }),
    actorBusinessId: integer("actor_business_id").references(() => businesses.id, {
      onDelete: "set null",
    }),
    actorRole: varchar("actor_role", { length: 30 }).notNull(), // admin, business, system, public
    // Event classification
    eventType: varchar("event_type", { length: 50 }).notNull(), // LEAD_CREATED, LEAD_REFUND, PREMIUM_UPGRADE, etc.
    // Target information (what was affected)
    targetType: varchar("target_type", { length: 30 }).notNull(), // lead, business, place, claim, payment
    targetId: varchar("target_id", { length: 100 }), // ID of the affected entity (as string for flexibility)
    // Additional context
    metadata: jsonb("metadata"), // Additional data as JSON (prices, reasons, etc.)
    ipAddress: varchar("ip_address", { length: 45 }), // IPv4 or IPv6
  },
  (table) => [
    index("audit_logs_event_type_idx").on(table.eventType),
    index("audit_logs_target_type_idx").on(table.targetType),
    index("audit_logs_actor_user_id_idx").on(table.actorUserId),
    index("audit_logs_created_at_idx").on(table.createdAt),
  ]
);

// Audit logs relations
export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
  actorUser: one(users, {
    fields: [auditLogs.actorUserId],
    references: [users.id],
  }),
  actorBusiness: one(businesses, {
    fields: [auditLogs.actorBusinessId],
    references: [businesses.id],
  }),
}));

// ============================================================================
// ADMIN AUDIT LOGS (Legacy - specific to admin actions)
// ============================================================================

// Admin audit logs table - tracks all admin actions for compliance and analytics
export const adminAuditLogs = pgTable("admin_audit_logs", {
  id: serial("id").primaryKey(),
  adminId: integer("admin_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  action: varchar("action", { length: 100 }).notNull(), // e.g., "create", "update", "delete", "impersonate_start"
  entityType: varchar("entity_type", { length: 50 }).notNull(), // e.g., "business", "place", "review"
  entityId: integer("entity_id"), // The ID of the affected entity (nullable for non-entity actions)
  details: text("details"), // JSON string with additional context
  ipAddress: varchar("ip_address", { length: 45 }), // IPv4 or IPv6
  userAgent: varchar("user_agent", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Admin audit logs relations
export const adminAuditLogsRelations = relations(adminAuditLogs, ({ one }) => ({
  admin: one(users, {
    fields: [adminAuditLogs.adminId],
    references: [users.id],
  }),
}));

// ============================================================================
// PLACE REFRESH JOBS (Data quality & refresh queue)
// ============================================================================

// Place refresh jobs table - queue for places that need data refresh
export const placeRefreshJobs = pgTable(
  "place_refresh_jobs",
  {
    id: serial("id").primaryKey(),
    placeId: integer("place_id")
      .notNull()
      .references(() => places.id, { onDelete: "cascade" }),
    status: refreshJobStatusEnum("status").default("pending").notNull(),
    reason: varchar("reason", { length: 50 }).notNull(), // LOW_QUALITY, STALE, MANUAL, CLOSED_CHECK
    priority: integer("priority").default(0).notNull(), // Higher = more urgent
    lastError: text("last_error"), // Error message if failed
    attemptCount: integer("attempt_count").default(0).notNull(), // Number of attempts
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    startedAt: timestamp("started_at"), // When job started processing
    completedAt: timestamp("completed_at"), // When job completed
  },
  (table) => [
    index("place_refresh_jobs_status_idx").on(table.status),
    index("place_refresh_jobs_place_id_idx").on(table.placeId),
    index("place_refresh_jobs_priority_idx").on(table.priority),
  ]
);

// Place refresh jobs relations
export const placeRefreshJobsRelations = relations(placeRefreshJobs, ({ one }) => ({
  place: one(places, {
    fields: [placeRefreshJobs.placeId],
    references: [places.id],
  }),
}));
