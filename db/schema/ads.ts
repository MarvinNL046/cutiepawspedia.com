/**
 * Advertising Schema
 *
 * Sponsor ad campaigns for businesses with Stripe integration.
 * Features:
 * - Ad campaigns linked to businesses/places
 * - Multiple placement types (sidebar, in-content, banner)
 * - Stripe payment tracking
 * - Impression and click tracking
 * - Campaign scheduling and budgets
 */

import { relations } from "drizzle-orm";
import {
  pgTable,
  pgEnum,
  serial,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
  decimal,
  index,
} from "drizzle-orm/pg-core";
import { businesses, places } from "./directory";

// ============================================================================
// ENUMS
// ============================================================================

// Campaign status
export const adCampaignStatusEnum = pgEnum("ad_campaign_status", [
  "draft",
  "pending_payment",
  "active",
  "paused",
  "completed",
  "cancelled",
]);

// Ad placement type
export const adPlacementTypeEnum = pgEnum("ad_placement_type", [
  "blog_sidebar",      // Sidebar on blog posts
  "blog_inline",       // Between paragraphs in blog posts
  "directory_sidebar", // Sidebar on directory listings
  "search_results",    // In search results
  "homepage_featured", // Featured section on homepage
]);

// ============================================================================
// AD PACKAGES (Pricing tiers)
// ============================================================================

export const adPackages = pgTable("ad_packages", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 50 }).notNull().unique(), // e.g., "basic_week", "pro_month"
  name: varchar("name", { length: 100 }).notNull(),
  nameNl: varchar("name_nl", { length: 100 }),
  description: text("description"),
  descriptionNl: text("description_nl"),
  // Pricing
  priceCents: integer("price_cents").notNull(), // One-time price
  durationDays: integer("duration_days").notNull(), // How long the campaign runs
  // Placements included
  includedPlacements: varchar("included_placements", { length: 255 }).notNull(), // Comma-separated: "blog_sidebar,blog_inline"
  // Limits
  maxImpressions: integer("max_impressions"), // null = unlimited
  // Stripe
  stripePriceId: varchar("stripe_price_id", { length: 255 }), // For Stripe Checkout
  // Display
  isPopular: boolean("is_popular").default(false).notNull(), // Show "Most Popular" badge
  sortOrder: integer("sort_order").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================================================
// AD CAMPAIGNS
// ============================================================================

export const adCampaigns = pgTable(
  "ad_campaigns",
  {
    id: serial("id").primaryKey(),
    // Link to business and place
    businessId: integer("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    placeId: integer("place_id")
      .references(() => places.id, { onDelete: "set null" }), // Optional: specific place to promote
    packageId: integer("package_id")
      .notNull()
      .references(() => adPackages.id, { onDelete: "restrict" }),
    // Campaign details
    name: varchar("name", { length: 255 }).notNull(),
    status: adCampaignStatusEnum("status").default("draft").notNull(),
    // Creative content
    headline: varchar("headline", { length: 100 }).notNull(),
    headlineNl: varchar("headline_nl", { length: 100 }),
    description: varchar("description", { length: 255 }),
    descriptionNl: varchar("description_nl", { length: 255 }),
    imageUrl: varchar("image_url", { length: 500 }),
    ctaText: varchar("cta_text", { length: 50 }).default("Learn More"),
    ctaTextNl: varchar("cta_text_nl", { length: 50 }).default("Meer informatie"),
    destinationUrl: varchar("destination_url", { length: 500 }), // Custom URL or null = place page
    // Scheduling
    startsAt: timestamp("starts_at"),
    endsAt: timestamp("ends_at"),
    // Budget and limits
    totalBudgetCents: integer("total_budget_cents"),
    maxImpressions: integer("max_impressions"),
    // Performance tracking
    impressions: integer("impressions").default(0).notNull(),
    clicks: integer("clicks").default(0).notNull(),
    // Payment
    stripePaymentIntentId: varchar("stripe_payment_intent_id", { length: 255 }),
    stripeCheckoutSessionId: varchar("stripe_checkout_session_id", { length: 255 }),
    paidAt: timestamp("paid_at"),
    amountPaidCents: integer("amount_paid_cents"),
    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    businessIdx: index("ad_campaigns_business_idx").on(table.businessId),
    statusIdx: index("ad_campaigns_status_idx").on(table.status),
    activeIdx: index("ad_campaigns_active_idx").on(table.status, table.startsAt, table.endsAt),
  })
);

// ============================================================================
// AD IMPRESSIONS (Detailed tracking)
// ============================================================================

export const adImpressions = pgTable(
  "ad_impressions",
  {
    id: serial("id").primaryKey(),
    campaignId: integer("campaign_id")
      .notNull()
      .references(() => adCampaigns.id, { onDelete: "cascade" }),
    placement: adPlacementTypeEnum("placement").notNull(),
    // Context
    pageUrl: varchar("page_url", { length: 500 }),
    locale: varchar("locale", { length: 5 }),
    // User info (anonymized)
    sessionId: varchar("session_id", { length: 100 }), // For frequency capping
    userAgent: varchar("user_agent", { length: 500 }),
    ipCountry: varchar("ip_country", { length: 2 }),
    // Actions
    clicked: boolean("clicked").default(false).notNull(),
    clickedAt: timestamp("clicked_at"),
    // Timestamp
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    campaignIdx: index("ad_impressions_campaign_idx").on(table.campaignId),
    dateIdx: index("ad_impressions_date_idx").on(table.createdAt),
  })
);

// ============================================================================
// RELATIONS
// ============================================================================

export const adPackagesRelations = relations(adPackages, ({ many }) => ({
  campaigns: many(adCampaigns),
}));

export const adCampaignsRelations = relations(adCampaigns, ({ one, many }) => ({
  business: one(businesses, {
    fields: [adCampaigns.businessId],
    references: [businesses.id],
  }),
  place: one(places, {
    fields: [adCampaigns.placeId],
    references: [places.id],
  }),
  package: one(adPackages, {
    fields: [adCampaigns.packageId],
    references: [adPackages.id],
  }),
  impressions: many(adImpressions),
}));

export const adImpressionsRelations = relations(adImpressions, ({ one }) => ({
  campaign: one(adCampaigns, {
    fields: [adImpressions.campaignId],
    references: [adCampaigns.id],
  }),
}));
