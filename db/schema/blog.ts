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
  index,
  primaryKey,
} from "drizzle-orm/pg-core";
import { users } from "./directory";

// ============================================================================
// BLOG ENUMS
// ============================================================================

export const blogPostStatusEnum = pgEnum("blog_post_status", [
  "draft",
  "published",
  "archived",
]);

// ============================================================================
// BLOG CATEGORIES
// ============================================================================

// Blog categories table - categories for organizing posts
export const blogCategories = pgTable("blog_categories", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 100 }).unique().notNull(),
  // Localized names
  nameEn: varchar("name_en", { length: 100 }).notNull(),
  nameNl: varchar("name_nl", { length: 100 }),
  // Localized descriptions
  descriptionEn: text("description_en"),
  descriptionNl: text("description_nl"),
  // Display
  icon: varchar("icon", { length: 50 }), // Emoji or icon name
  color: varchar("color", { length: 20 }), // Tailwind color class
  sortOrder: integer("sort_order").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  // SEO
  metaTitleEn: varchar("meta_title_en", { length: 60 }),
  metaTitleNl: varchar("meta_title_nl", { length: 60 }),
  metaDescriptionEn: varchar("meta_description_en", { length: 160 }),
  metaDescriptionNl: varchar("meta_description_nl", { length: 160 }),
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================================================
// BLOG TAGS
// ============================================================================

// Blog tags table - tags for filtering and discovery
export const blogTags = pgTable("blog_tags", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 100 }).unique().notNull(),
  // Localized names
  nameEn: varchar("name_en", { length: 100 }).notNull(),
  nameNl: varchar("name_nl", { length: 100 }),
  // Stats
  postCount: integer("post_count").default(0).notNull(),
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================================
// BLOG POSTS
// ============================================================================

// Blog posts table - main content with full i18n support
export const blogPosts = pgTable(
  "blog_posts",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 255 }).unique().notNull(),
    // Author
    authorId: integer("author_id").references(() => users.id, { onDelete: "set null" }),
    authorName: varchar("author_name", { length: 100 }), // Fallback if no user linked
    // Category
    categoryId: integer("category_id").references(() => blogCategories.id, { onDelete: "set null" }),
    // Status
    status: blogPostStatusEnum("status").default("draft").notNull(),
    // Featured image
    featuredImage: varchar("featured_image", { length: 500 }), // URL to image
    featuredImageAlt: varchar("featured_image_alt", { length: 255 }),
    // English content
    titleEn: varchar("title_en", { length: 255 }).notNull(),
    excerptEn: text("excerpt_en"), // Short summary for cards
    contentEn: text("content_en").notNull(), // Full content (markdown)
    // Dutch content
    titleNl: varchar("title_nl", { length: 255 }),
    excerptNl: text("excerpt_nl"),
    contentNl: text("content_nl"),
    // SEO - English
    metaTitleEn: varchar("meta_title_en", { length: 60 }),
    metaDescriptionEn: varchar("meta_description_en", { length: 160 }),
    // SEO - Dutch
    metaTitleNl: varchar("meta_title_nl", { length: 60 }),
    metaDescriptionNl: varchar("meta_description_nl", { length: 160 }),
    // Reading stats
    readingTimeMinutes: integer("reading_time_minutes").default(5),
    viewCount: integer("view_count").default(0).notNull(),
    // Timestamps
    publishedAt: timestamp("published_at"), // When it was/will be published
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("blog_posts_slug_idx").on(table.slug),
    index("blog_posts_status_idx").on(table.status),
    index("blog_posts_category_id_idx").on(table.categoryId),
    index("blog_posts_published_at_idx").on(table.publishedAt),
    index("blog_posts_author_id_idx").on(table.authorId),
  ]
);

// ============================================================================
// BLOG POST TAGS (Junction Table)
// ============================================================================

// Junction table for many-to-many: posts <-> tags
export const blogPostTags = pgTable(
  "blog_post_tags",
  {
    postId: integer("post_id")
      .notNull()
      .references(() => blogPosts.id, { onDelete: "cascade" }),
    tagId: integer("tag_id")
      .notNull()
      .references(() => blogTags.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({ columns: [table.postId, table.tagId] }),
    index("blog_post_tags_tag_id_idx").on(table.tagId),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const blogCategoriesRelations = relations(blogCategories, ({ many }) => ({
  posts: many(blogPosts),
}));

export const blogTagsRelations = relations(blogTags, ({ many }) => ({
  postTags: many(blogPostTags),
}));

export const blogPostsRelations = relations(blogPosts, ({ one, many }) => ({
  author: one(users, {
    fields: [blogPosts.authorId],
    references: [users.id],
  }),
  category: one(blogCategories, {
    fields: [blogPosts.categoryId],
    references: [blogCategories.id],
  }),
  postTags: many(blogPostTags),
}));

export const blogPostTagsRelations = relations(blogPostTags, ({ one }) => ({
  post: one(blogPosts, {
    fields: [blogPostTags.postId],
    references: [blogPosts.id],
  }),
  tag: one(blogTags, {
    fields: [blogPostTags.tagId],
    references: [blogTags.id],
  }),
}));
