import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  primaryKey,
  integer,
} from "drizzle-orm/pg-core";

// Pets table
export const pets = pgTable("pets", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  species: varchar("species", { length: 100 }).notNull(),
  breed: varchar("breed", { length: 255 }),
  description: text("description"),
  imageUrl: varchar("image_url", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Categories table
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  imageUrl: varchar("image_url", { length: 500 }),
});

// Tags table
export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
});

// Junction table: pets <-> categories
export const petCategories = pgTable(
  "pet_categories",
  {
    petId: integer("pet_id")
      .notNull()
      .references(() => pets.id, { onDelete: "cascade" }),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.petId, table.categoryId] })]
);

// Junction table: pets <-> tags
export const petTags = pgTable(
  "pet_tags",
  {
    petId: integer("pet_id")
      .notNull()
      .references(() => pets.id, { onDelete: "cascade" }),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.petId, table.tagId] })]
);

// Relations
export const petsRelations = relations(pets, ({ many }) => ({
  petCategories: many(petCategories),
  petTags: many(petTags),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  petCategories: many(petCategories),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  petTags: many(petTags),
}));

export const petCategoriesRelations = relations(petCategories, ({ one }) => ({
  pet: one(pets, {
    fields: [petCategories.petId],
    references: [pets.id],
  }),
  category: one(categories, {
    fields: [petCategories.categoryId],
    references: [categories.id],
  }),
}));

export const petTagsRelations = relations(petTags, ({ one }) => ({
  pet: one(pets, {
    fields: [petTags.petId],
    references: [pets.id],
  }),
  tag: one(tags, {
    fields: [petTags.tagId],
    references: [tags.id],
  }),
}));
