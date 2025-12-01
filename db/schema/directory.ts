import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
  decimal,
  primaryKey,
} from "drizzle-orm/pg-core";

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
export const cities = pgTable("cities", {
  id: serial("id").primaryKey(),
  countryId: integer("country_id")
    .notNull()
    .references(() => countries.id, { onDelete: "cascade" }),
  slug: varchar("slug", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  lat: decimal("lat", { precision: 10, scale: 7 }),
  lng: decimal("lng", { precision: 10, scale: 7 }),
});

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
export const places = pgTable("places", {
  id: serial("id").primaryKey(),
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
  isVerified: boolean("is_verified").default(false).notNull(),
  isPremium: boolean("is_premium").default(false).notNull(),
  premiumUntil: timestamp("premium_until"),
  avgRating: decimal("avg_rating", { precision: 2, scale: 1 }).default("0"),
  reviewCount: integer("review_count").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

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
  (table) => [primaryKey({ columns: [table.placeId, table.categoryId] })]
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
// REVIEWS
// ============================================================================

// Reviews table
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  placeId: integer("place_id")
    .notNull()
    .references(() => places.id, { onDelete: "cascade" }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(), // 1-5
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================================
// LEADS (for monetization)
// ============================================================================

// Leads table - pay-per-lead ready
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  placeId: integer("place_id")
    .notNull()
    .references(() => places.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  message: text("message"),
  source: varchar("source", { length: 100 }), // where the lead came from
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
  city: one(cities, {
    fields: [places.cityId],
    references: [cities.id],
  }),
  placeCategories: many(placeCategories),
  reviews: many(reviews),
  leads: many(leads),
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
  reviews: many(reviews),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  place: one(places, {
    fields: [reviews.placeId],
    references: [places.id],
  }),
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
}));

export const leadsRelations = relations(leads, ({ one }) => ({
  place: one(places, {
    fields: [leads.placeId],
    references: [places.id],
  }),
}));
