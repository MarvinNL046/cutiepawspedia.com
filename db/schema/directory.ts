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

// Business photo status enum
export const businessPhotoStatusEnum = pgEnum("business_photo_status", [
  "active",
  "deleted",
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

// Plan status enum (for business subscriptions)
export const planStatusEnum = pgEnum("plan_status", [
  "ACTIVE",
  "CANCELLED",
  "TRIAL",
  "PAST_DUE",
  "INACTIVE",
]);

// ============================================================================
// SUBSCRIPTION PLANS
// ============================================================================

// Subscription plans table - plan definitions (single source of truth in DB)
export const subscriptionPlans = pgTable("subscription_plans", {
  key: varchar("key", { length: 20 }).primaryKey(), // FREE, STARTER, PRO, ELITE
  name: varchar("name", { length: 100 }).notNull(),
  nameNl: varchar("name_nl", { length: 100 }),
  description: text("description"),
  descriptionNl: text("description_nl"),
  monthlyPriceCents: integer("monthly_price_cents").default(0).notNull(),
  yearlyPriceCents: integer("yearly_price_cents"), // null = not available
  // Features (denormalized for quick access)
  maxPhotos: integer("max_photos").default(0).notNull(),
  maxCategories: integer("max_categories").default(1).notNull(),
  canShowWebsite: boolean("can_show_website").default(false).notNull(),
  canShowEmail: boolean("can_show_email").default(false).notNull(),
  canShowPhone: boolean("can_show_phone").default(false).notNull(),
  canShowSocialLinks: boolean("can_show_social_links").default(false).notNull(),
  canShowDescription: boolean("can_show_description").default(false).notNull(),
  priorityRank: integer("priority_rank").default(1).notNull(), // Higher = shown first in search
  hasFeaturedStyling: boolean("has_featured_styling").default(false).notNull(),
  hasBasicAnalytics: boolean("has_basic_analytics").default(false).notNull(),
  hasAdvancedAnalytics: boolean("has_advanced_analytics").default(false).notNull(),
  showPlanBadge: boolean("show_plan_badge").default(false).notNull(),
  badgeText: varchar("badge_text", { length: 50 }),
  badgeColor: varchar("badge_color", { length: 20 }),
  // Meta
  isPopular: boolean("is_popular").default(false).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

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

// Provinces/States/Regions table - administrative divisions between country and city
export const provinces = pgTable(
  "provinces",
  {
    id: serial("id").primaryKey(),
    countryId: integer("country_id")
      .notNull()
      .references(() => countries.id, { onDelete: "cascade" }),
    slug: varchar("slug", { length: 255 }).notNull(), // e.g., "noord-holland", "california"
    name: varchar("name", { length: 255 }).notNull(), // e.g., "Noord-Holland", "California"
    code: varchar("code", { length: 10 }), // e.g., "NH", "CA", "BY" (optional ISO 3166-2)
    // Center point for map display
    lat: decimal("lat", { precision: 10, scale: 7 }),
    lng: decimal("lng", { precision: 10, scale: 7 }),
    // SEO metadata
    description: text("description"), // For SEO meta description
    // Statistics (denormalized for performance)
    cityCount: integer("city_count").default(0).notNull(),
    placeCount: integer("place_count").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("provinces_country_id_idx").on(table.countryId),
    index("provinces_slug_country_idx").on(table.slug, table.countryId),
  ]
);

// Cities table
export const cities = pgTable(
  "cities",
  {
    id: serial("id").primaryKey(),
    countryId: integer("country_id")
      .notNull()
      .references(() => countries.id, { onDelete: "cascade" }),
    provinceId: integer("province_id")
      .references(() => provinces.id, { onDelete: "set null" }), // Optional: not all cities have province yet
    slug: varchar("slug", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    lat: decimal("lat", { precision: 10, scale: 7 }),
    lng: decimal("lng", { precision: 10, scale: 7 }),
  },
  (table) => [
    index("cities_country_id_idx").on(table.countryId),
    index("cities_province_id_idx").on(table.provinceId),
  ]
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
  emailVerified: boolean("email_verified").default(false).notNull(), // Synced from StackAuth
  name: varchar("name", { length: 255 }),
  role: varchar("role", { length: 50 }).default("user").notNull(), // user, business, admin
  // P3: User Profile fields
  username: varchar("username", { length: 50 }).unique(), // Unique username for /u/[username]
  avatarUrl: text("avatar_url"), // URL to avatar image
  bio: text("bio"), // User biography/description
  location: varchar("location", { length: 255 }), // City, country
  websiteUrl: varchar("website_url", { length: 500 }), // Personal website
  socialLinks: jsonb("social_links").$type<Record<string, string>>().default({}), // { instagram, facebook, etc. }
  preferredLocale: varchar("preferred_locale", { length: 10 }).default("en"), // Language preference
  isPublic: boolean("is_public").default(true), // Profile visibility
  // P4: Karma & Trust Levels
  karmaPoints: integer("karma_points").default(0).notNull(),
  trustLevel: integer("trust_level").default(0).notNull(),
  karmaUpdatedAt: timestamp("karma_updated_at").defaultNow(),
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
  // Legacy plan fields (deprecated - use planKey/planStatus instead)
  plan: varchar("plan", { length: 20 }).default("free").notNull(), // @deprecated: use planKey
  billingStatus: varchar("billing_status", { length: 20 }).default("trial").notNull(), // @deprecated: use planStatus
  // Subscription plan fields (new)
  planKey: varchar("plan_key", { length: 20 })
    .default("FREE")
    .notNull()
    .references(() => subscriptionPlans.key), // FK to subscription_plans
  planStatus: planStatusEnum("plan_status").default("ACTIVE").notNull(),
  planStartedAt: timestamp("plan_started_at"), // When current plan started
  planValidUntil: timestamp("plan_valid_until"), // When plan expires (null = no expiry for free)
  trialEndsAt: timestamp("trial_ends_at"), // When trial period ends
  // Stripe integration
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }), // Stripe customer ID
  stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }), // Active subscription ID
  // Credits system (prepaid balance for leads) - deprecated: pay-per-lead disabled
  creditBalanceCents: integer("credit_balance_cents").default(0).notNull(), // @deprecated: pay-per-lead disabled
  leadPriceCents: integer("lead_price_cents"), // @deprecated: pay-per-lead disabled
  autoChargeEnabled: boolean("auto_charge_enabled").default(true).notNull(), // @deprecated: pay-per-lead disabled
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
// BUSINESS PHOTOS (uploaded by business owners)
// ============================================================================

// Business photos table - photos uploaded by businesses to their listings
export const businessPhotos = pgTable(
  "business_photos",
  {
    id: serial("id").primaryKey(),
    placeId: integer("place_id")
      .notNull()
      .references(() => places.id, { onDelete: "cascade" }),
    businessId: integer("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    uploadedBy: integer("uploaded_by")
      .references(() => users.id, { onDelete: "set null" }),
    // Storage info
    storageKey: varchar("storage_key", { length: 500 }).notNull(), // e.g., business_photos/{placeId}/{uuid}.jpg
    // Image metadata
    width: integer("width"),
    height: integer("height"),
    sizeBytes: integer("size_bytes"),
    mimeType: varchar("mime_type", { length: 50 }),
    // Display info
    altText: varchar("alt_text", { length: 255 }),
    caption: varchar("caption", { length: 500 }),
    isPrimary: boolean("is_primary").default(false).notNull(), // Primary/cover photo
    sortOrder: integer("sort_order").default(0).notNull(), // Display order
    // Status
    status: businessPhotoStatusEnum("status").default("active").notNull(),
    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("business_photos_place_id_idx").on(table.placeId),
    index("business_photos_business_id_idx").on(table.businessId),
    index("business_photos_status_idx").on(table.status),
  ]
);

// ============================================================================
// PAGE VIEWS (for analytics)
// ============================================================================

// Page views table - tracks views for analytics
export const pageViews = pgTable(
  "page_views",
  {
    id: serial("id").primaryKey(),
    placeId: integer("place_id")
      .notNull()
      .references(() => places.id, { onDelete: "cascade" }),
    businessId: integer("business_id")
      .references(() => businesses.id, { onDelete: "set null" }), // Denormalized for quick lookups
    // Visitor info (privacy-safe)
    sessionId: varchar("session_id", { length: 64 }), // Hashed session identifier
    // Source tracking
    source: varchar("source", { length: 100 }), // search, direct, category, spotlight, etc.
    referrer: varchar("referrer", { length: 500 }),
    // Device/context
    deviceType: varchar("device_type", { length: 20 }), // mobile, tablet, desktop
    locale: varchar("locale", { length: 10 }),
    // Timestamps
    viewedAt: timestamp("viewed_at").defaultNow().notNull(),
  },
  (table) => [
    index("page_views_place_id_idx").on(table.placeId),
    index("page_views_business_id_idx").on(table.businessId),
    index("page_views_viewed_at_idx").on(table.viewedAt),
    // Composite index for time-based analytics queries
    index("page_views_place_date_idx").on(table.placeId, table.viewedAt),
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
  provinces: many(provinces),
  cities: many(cities),
}));

export const provincesRelations = relations(provinces, ({ one, many }) => ({
  country: one(countries, {
    fields: [provinces.countryId],
    references: [countries.id],
  }),
  cities: many(cities),
}));

export const citiesRelations = relations(cities, ({ one, many }) => ({
  country: one(countries, {
    fields: [cities.countryId],
    references: [countries.id],
  }),
  province: one(provinces, {
    fields: [cities.provinceId],
    references: [provinces.id],
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
  businessPhotos: many(businessPhotos),
  pageViews: many(pageViews),
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

export const usersRelations = relations(users, ({ one, many }) => ({
  places: many(places),
  reviews: many(reviews),
  reviewReplies: many(reviewReplies),
  businesses: many(businesses),
  placeClaims: many(placeClaims),
  reviewedClaims: many(placeClaims, { relationName: "reviewedClaims" }),
  favorites: many(userFavorites),
  recentViews: many(userRecentViews),
  notificationSettings: one(notificationSettings),
  notificationLogs: many(notificationLogs),
  badges: many(userBadges), // P3: User badges
  karmaEvents: many(karmaEvents), // P4: Karma events
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
  subscriptionPlan: one(subscriptionPlans, {
    fields: [businesses.planKey],
    references: [subscriptionPlans.key],
  }),
  places: many(places),
  reviews: many(reviews), // Reviews linked to this business
  businessPhotos: many(businessPhotos),
  pageViews: many(pageViews),
  leads: many(leads),
  creditTransactions: many(creditTransactions),
  notificationLogs: many(notificationLogs),
}));

// Business photos relations
export const businessPhotosRelations = relations(businessPhotos, ({ one }) => ({
  place: one(places, {
    fields: [businessPhotos.placeId],
    references: [places.id],
  }),
  business: one(businesses, {
    fields: [businessPhotos.businessId],
    references: [businesses.id],
  }),
  uploader: one(users, {
    fields: [businessPhotos.uploadedBy],
    references: [users.id],
  }),
}));

// Page views relations
export const pageViewsRelations = relations(pageViews, ({ one }) => ({
  place: one(places, {
    fields: [pageViews.placeId],
    references: [places.id],
  }),
  business: one(businesses, {
    fields: [pageViews.businessId],
    references: [businesses.id],
  }),
}));

// Subscription plans relations
export const subscriptionPlansRelations = relations(subscriptionPlans, ({ many }) => ({
  businesses: many(businesses),
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

// ============================================================================
// NOTIFICATION SETTINGS (P2 - Email Notifications & Digests)
// ============================================================================

// Notification settings table - per-user email preferences
export const notificationSettings = pgTable("notification_settings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
    .unique(), // One settings record per user
  // Email preferences
  emailGeneral: boolean("email_general").default(true).notNull(), // General platform emails
  emailReviews: boolean("email_reviews").default(true).notNull(), // Review notifications (new reviews, replies)
  emailFavorites: boolean("email_favorites").default(true).notNull(), // Updates about favorited places
  emailLeads: boolean("email_leads").default(true).notNull(), // Lead notifications (for business owners)
  emailBusiness: boolean("email_business").default(true).notNull(), // Business-related emails (claims, etc.)
  emailDigest: boolean("email_digest").default(true).notNull(), // Weekly digest emails
  // Locale preference for emails
  locale: varchar("locale", { length: 10 }), // e.g., 'nl', 'en', 'de' - null means use user's default
  // Quiet hours (N2 - Smart notification logic)
  quietHoursEnabled: boolean("quiet_hours_enabled").default(false).notNull(), // Enable quiet hours
  quietHoursStart: integer("quiet_hours_start").default(22), // Start hour (0-23), default 10 PM
  quietHoursEnd: integer("quiet_hours_end").default(8), // End hour (0-23), default 8 AM
  timezone: varchar("timezone", { length: 50 }), // e.g., 'Europe/Amsterdam' - null means server timezone
  // Max per week (N2 - Advanced throttling)
  maxEmailsPerWeek: integer("max_emails_per_week").default(50), // Max emails per week (null = no limit)
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Notification settings relations
export const notificationSettingsRelations = relations(notificationSettings, ({ one }) => ({
  user: one(users, {
    fields: [notificationSettings.userId],
    references: [users.id],
  }),
}));

// ============================================================================
// NOTIFICATION LOGS (P2 - Email Notifications & Digests)
// ============================================================================

// Notification log status enum
export const notificationLogStatusEnum = pgEnum("notification_log_status", [
  "sent",
  "failed",
]);

// Notification logs table - audit trail for sent emails
export const notificationLogs = pgTable(
  "notification_logs",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id, { onDelete: "set null" }), // Recipient user (null for system emails)
    businessId: integer("business_id").references(() => businesses.id, { onDelete: "set null" }), // Related business
    // Notification details
    type: varchar("type", { length: 50 }).notNull(), // REVIEW_NEW, REVIEW_REPLY, LEAD_NEW, CLAIM_APPROVED, etc.
    email: varchar("email", { length: 255 }).notNull(), // Actual email address sent to
    status: notificationLogStatusEnum("status").notNull(), // sent, failed
    error: text("error"), // Error message if failed
    // Context metadata
    metadata: jsonb("metadata"), // { reviewId, placeId, leadId, etc. }
    // Timestamp
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("notification_logs_user_id_idx").on(table.userId),
    index("notification_logs_business_id_idx").on(table.businessId),
    index("notification_logs_type_idx").on(table.type),
    index("notification_logs_created_at_idx").on(table.createdAt),
  ]
);

// Notification logs relations
export const notificationLogsRelations = relations(notificationLogs, ({ one }) => ({
  user: one(users, {
    fields: [notificationLogs.userId],
    references: [users.id],
  }),
  business: one(businesses, {
    fields: [notificationLogs.businessId],
    references: [businesses.id],
  }),
}));

// ============================================================================
// IN-APP NOTIFICATIONS (Business Dashboard Bell)
// ============================================================================

// Notification type enum for in-app notifications
export const inAppNotificationTypeEnum = pgEnum("in_app_notification_type", [
  "new_review",      // New review on a place
  "new_lead",        // New lead/inquiry
  "review_reply",    // Business replied to review
  "listing_view",    // Milestone: listing viewed X times
  "claim_approved",  // Claim approved
  "claim_rejected",  // Claim rejected
  "plan_upgraded",   // Plan upgraded
  "plan_expiring",   // Plan about to expire
  "weekly_summary",  // Weekly performance summary
  "system",          // System notifications
]);

// Business notifications table - in-app notifications for the bell dropdown
export const businessNotifications = pgTable(
  "business_notifications",
  {
    id: serial("id").primaryKey(),
    businessId: integer("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    // Notification content
    type: inAppNotificationTypeEnum("type").notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    message: text("message").notNull(),
    // Related entity (optional)
    relatedPlaceId: integer("related_place_id").references(() => places.id, { onDelete: "set null" }),
    relatedReviewId: integer("related_review_id").references(() => reviews.id, { onDelete: "set null" }),
    relatedLeadId: integer("related_lead_id").references(() => leads.id, { onDelete: "set null" }),
    // Link to navigate to when clicked
    actionUrl: varchar("action_url", { length: 500 }),
    // Status
    isRead: boolean("is_read").default(false).notNull(),
    readAt: timestamp("read_at"),
    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("business_notifications_business_id_idx").on(table.businessId),
    index("business_notifications_is_read_idx").on(table.isRead),
    index("business_notifications_created_at_idx").on(table.createdAt),
    index("business_notifications_type_idx").on(table.type),
  ]
);

// Business notifications relations
export const businessNotificationsRelations = relations(businessNotifications, ({ one }) => ({
  business: one(businesses, {
    fields: [businessNotifications.businessId],
    references: [businesses.id],
  }),
  place: one(places, {
    fields: [businessNotifications.relatedPlaceId],
    references: [places.id],
  }),
  review: one(reviews, {
    fields: [businessNotifications.relatedReviewId],
    references: [reviews.id],
  }),
  lead: one(leads, {
    fields: [businessNotifications.relatedLeadId],
    references: [leads.id],
  }),
}));

// ============================================================================
// BADGES (P3 - User Profiles + Badges)
// ============================================================================

// Badge category enum
export const badgeCategoryEnum = pgEnum("badge_category", [
  "general",
  "reviewer",
  "contributor",
  "business",
  "special",
]);

// Badge definitions table - available badge types
export const badgeDefinitions = pgTable("badge_definitions", {
  key: varchar("key", { length: 50 }).primaryKey(), // e.g., 'verified_user', 'top_reviewer'
  label: varchar("label", { length: 100 }).notNull(), // English label
  labelNl: varchar("label_nl", { length: 100 }), // Dutch label
  description: text("description").notNull(), // English description
  descriptionNl: text("description_nl"), // Dutch description
  icon: varchar("icon", { length: 50 }).notNull(), // Emoji or icon name
  category: varchar("category", { length: 50 }).default("general").notNull(), // general, reviewer, contributor, business, special
  sortOrder: integer("sort_order").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// User badges table - badges awarded to users
export const userBadges = pgTable(
  "user_badges",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    badgeKey: varchar("badge_key", { length: 50 })
      .notNull()
      .references(() => badgeDefinitions.key, { onDelete: "cascade" }),
    awardedAt: timestamp("awarded_at").defaultNow().notNull(),
    awardedBy: varchar("awarded_by", { length: 50 }), // 'system', 'admin', or admin user id
    notes: text("notes"),
  },
  (table) => [
    index("user_badges_user_id_idx").on(table.userId),
    index("user_badges_badge_key_idx").on(table.badgeKey),
    index("user_badges_awarded_at_idx").on(table.awardedAt),
  ]
);

// Badge definitions relations
export const badgeDefinitionsRelations = relations(badgeDefinitions, ({ many }) => ({
  userBadges: many(userBadges),
}));

// User badges relations
export const userBadgesRelations = relations(userBadges, ({ one }) => ({
  user: one(users, {
    fields: [userBadges.userId],
    references: [users.id],
  }),
  badge: one(badgeDefinitions, {
    fields: [userBadges.badgeKey],
    references: [badgeDefinitions.key],
  }),
}));

// ============================================================================
// KARMA & TRUST LEVELS (P4)
// ============================================================================

// Karma events table - tracks all karma point changes
export const karmaEvents = pgTable(
  "karma_events",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    eventType: varchar("event_type", { length: 50 }).notNull(), // REVIEW_CREATED, REVIEW_HELPFUL, etc.
    points: integer("points").notNull(), // Positive or negative
    description: varchar("description", { length: 255 }),
    // Related entities
    reviewId: integer("review_id").references(() => reviews.id, { onDelete: "set null" }),
    placeId: integer("place_id").references(() => places.id, { onDelete: "set null" }),
    badgeKey: varchar("badge_key", { length: 50 }).references(() => badgeDefinitions.key, { onDelete: "set null" }),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("karma_events_user_id_idx").on(table.userId),
    index("karma_events_event_type_idx").on(table.eventType),
    index("karma_events_created_at_idx").on(table.createdAt),
  ]
);

// Trust level definitions table
export const trustLevelDefinitions = pgTable("trust_level_definitions", {
  level: integer("level").primaryKey(), // 0-5
  name: varchar("name", { length: 50 }).notNull(),
  nameNl: varchar("name_nl", { length: 50 }),
  description: text("description").notNull(),
  descriptionNl: text("description_nl"),
  minKarma: integer("min_karma").default(0).notNull(),
  icon: varchar("icon", { length: 50 }),
  color: varchar("color", { length: 20 }),
  // Permissions
  canReview: boolean("can_review").default(true).notNull(),
  canUploadPhotos: boolean("can_upload_photos").default(true).notNull(),
  maxPhotosPerReview: integer("max_photos_per_review").default(3),
  reviewsAutoApproved: boolean("reviews_auto_approved").default(false).notNull(),
  canFlagReviews: boolean("can_flag_reviews").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Karma events relations
export const karmaEventsRelations = relations(karmaEvents, ({ one }) => ({
  user: one(users, {
    fields: [karmaEvents.userId],
    references: [users.id],
  }),
  review: one(reviews, {
    fields: [karmaEvents.reviewId],
    references: [reviews.id],
  }),
  place: one(places, {
    fields: [karmaEvents.placeId],
    references: [places.id],
  }),
  badge: one(badgeDefinitions, {
    fields: [karmaEvents.badgeKey],
    references: [badgeDefinitions.key],
  }),
}));

// ============================================================================
// MESSAGING (B7)
// ============================================================================

// Message threads table - conversations between users and businesses
export const messageThreads = pgTable(
  "message_threads",
  {
    id: serial("id").primaryKey(),
    businessId: integer("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    placeId: integer("place_id").references(() => places.id, { onDelete: "set null" }),
    subject: varchar("subject", { length: 255 }),
    status: varchar("status", { length: 20 }).default("open").notNull(), // open, archived, spam
    lastMessageAt: timestamp("last_message_at").defaultNow().notNull(),
    lastMessagePreview: varchar("last_message_preview", { length: 255 }),
    unreadCountBusiness: integer("unread_count_business").default(0).notNull(),
    unreadCountUser: integer("unread_count_user").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("message_threads_business_id_idx").on(table.businessId),
    index("message_threads_user_id_idx").on(table.userId),
    index("message_threads_last_message_at_idx").on(table.lastMessageAt),
  ]
);

// Messages table - individual messages in threads
export const messages = pgTable(
  "messages",
  {
    id: serial("id").primaryKey(),
    threadId: integer("thread_id")
      .notNull()
      .references(() => messageThreads.id, { onDelete: "cascade" }),
    senderType: varchar("sender_type", { length: 20 }).notNull(), // 'user' or 'business'
    senderUserId: integer("sender_user_id").references(() => users.id, { onDelete: "set null" }),
    body: text("body").notNull(),
    isRead: boolean("is_read").default(false).notNull(),
    readAt: timestamp("read_at"),
    deletedBySender: boolean("deleted_by_sender").default(false).notNull(),
    deletedByRecipient: boolean("deleted_by_recipient").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("messages_thread_id_idx").on(table.threadId),
    index("messages_created_at_idx").on(table.createdAt),
  ]
);

// Message attachments table
export const messageAttachments = pgTable(
  "message_attachments",
  {
    id: serial("id").primaryKey(),
    messageId: integer("message_id")
      .notNull()
      .references(() => messages.id, { onDelete: "cascade" }),
    filename: varchar("filename", { length: 255 }).notNull(),
    mimeType: varchar("mime_type", { length: 100 }).notNull(),
    fileSizeBytes: integer("file_size_bytes"),
    storageKey: varchar("storage_key", { length: 500 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("message_attachments_message_id_idx").on(table.messageId)]
);

// Message threads relations
export const messageThreadsRelations = relations(messageThreads, ({ one, many }) => ({
  business: one(businesses, {
    fields: [messageThreads.businessId],
    references: [businesses.id],
  }),
  user: one(users, {
    fields: [messageThreads.userId],
    references: [users.id],
  }),
  place: one(places, {
    fields: [messageThreads.placeId],
    references: [places.id],
  }),
  messages: many(messages),
}));

// Messages relations
export const messagesRelations = relations(messages, ({ one, many }) => ({
  thread: one(messageThreads, {
    fields: [messages.threadId],
    references: [messageThreads.id],
  }),
  sender: one(users, {
    fields: [messages.senderUserId],
    references: [users.id],
  }),
  attachments: many(messageAttachments),
}));

// Message attachments relations
export const messageAttachmentsRelations = relations(messageAttachments, ({ one }) => ({
  message: one(messages, {
    fields: [messageAttachments.messageId],
    references: [messages.id],
  }),
}));
