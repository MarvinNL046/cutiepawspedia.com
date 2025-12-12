/**
 * Blog Database Queries
 *
 * Query functions for managing blog posts, categories, and tags
 * with full i18n/locale support.
 */

import { db } from "@/db";
import { eq, and, desc, sql, asc, isNotNull, lte } from "drizzle-orm";
import {
  blogPosts,
  blogCategories,
  blogTags,
  blogPostTags,
} from "@/db/schema/blog";
import { users } from "@/db/schema/directory";

// ============================================================================
// TYPES
// ============================================================================

export type Locale = "en" | "nl" | "de" | "fr";

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  featuredImage: string | null;
  featuredImageAlt: string | null;
  authorName: string | null;
  categoryId: number | null;
  categorySlug: string | null;
  categoryName: string | null;
  readingTimeMinutes: number | null;
  viewCount: number;
  publishedAt: Date | null;
  createdAt: Date;
};

export type BlogPostCard = {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  featuredImage: string | null;
  featuredImageAlt: string | null;
  authorName: string | null;
  categorySlug: string | null;
  categoryName: string | null;
  readingTimeMinutes: number | null;
  publishedAt: Date | null;
};

export type BlogCategory = {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  postCount?: number;
};

export type BlogTag = {
  id: number;
  slug: string;
  name: string;
  postCount: number;
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get locale-aware field value with fallback chain: requested locale -> EN -> first available
 */
function getLocalizedField<T>(
  values: {
    en?: T | null;
    nl?: T | null;
    de?: T | null;
    fr?: T | null;
  },
  locale: Locale
): T | null {
  // Try requested locale first
  const localeValue = values[locale];
  if (localeValue !== null && localeValue !== undefined) {
    return localeValue;
  }

  // Fallback to English
  if (values.en !== null && values.en !== undefined) {
    return values.en;
  }

  // Fallback to any available value
  for (const val of Object.values(values)) {
    if (val !== null && val !== undefined) {
      return val as T;
    }
  }

  return null;
}

/**
 * Legacy helper for backwards compatibility (2-locale version)
 * @deprecated Use getLocalizedField with values object instead
 */
function getLocalizedFieldLegacy<T>(
  enValue: T | null | undefined,
  nlValue: T | null | undefined,
  locale: Locale
): T | null {
  return getLocalizedField({ en: enValue, nl: nlValue }, locale);
}

// ============================================================================
// BLOG POST QUERIES
// ============================================================================

/**
 * Get published blog posts for listing pages
 */
export async function getPublishedPosts(
  locale: Locale,
  options: {
    limit?: number;
    offset?: number;
    categorySlug?: string;
  } = {}
): Promise<BlogPostCard[]> {
  const { limit = 10, offset = 0, categorySlug } = options;

  let query = db
    .select({
      id: blogPosts.id,
      slug: blogPosts.slug,
      titleEn: blogPosts.titleEn,
      titleNl: blogPosts.titleNl,
      titleDe: blogPosts.titleDe,
      titleFr: blogPosts.titleFr,
      excerptEn: blogPosts.excerptEn,
      excerptNl: blogPosts.excerptNl,
      excerptDe: blogPosts.excerptDe,
      excerptFr: blogPosts.excerptFr,
      featuredImage: blogPosts.featuredImage,
      featuredImageAlt: blogPosts.featuredImageAlt,
      authorName: blogPosts.authorName,
      categorySlug: blogCategories.slug,
      categoryNameEn: blogCategories.nameEn,
      categoryNameNl: blogCategories.nameNl,
      categoryNameDe: blogCategories.nameDe,
      categoryNameFr: blogCategories.nameFr,
      readingTimeMinutes: blogPosts.readingTimeMinutes,
      publishedAt: blogPosts.publishedAt,
    })
    .from(blogPosts)
    .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
    .where(
      and(
        eq(blogPosts.status, "published"),
        isNotNull(blogPosts.publishedAt),
        lte(blogPosts.publishedAt, new Date())
      )
    )
    .orderBy(desc(blogPosts.publishedAt))
    .limit(limit)
    .offset(offset);

  const results = await query;

  return results.map((row) => ({
    id: row.id,
    slug: row.slug,
    title: getLocalizedField({ en: row.titleEn, nl: row.titleNl, de: row.titleDe, fr: row.titleFr }, locale) ?? row.titleEn,
    excerpt: getLocalizedField({ en: row.excerptEn, nl: row.excerptNl, de: row.excerptDe, fr: row.excerptFr }, locale),
    featuredImage: row.featuredImage,
    featuredImageAlt: row.featuredImageAlt,
    authorName: row.authorName,
    categorySlug: row.categorySlug,
    categoryName: getLocalizedField({ en: row.categoryNameEn, nl: row.categoryNameNl, de: row.categoryNameDe, fr: row.categoryNameFr }, locale),
    readingTimeMinutes: row.readingTimeMinutes,
    publishedAt: row.publishedAt,
  }));
}

/**
 * Get a single blog post by slug
 */
export async function getPostBySlug(
  slug: string,
  locale: Locale
): Promise<BlogPost | null> {
  const results = await db
    .select({
      id: blogPosts.id,
      slug: blogPosts.slug,
      titleEn: blogPosts.titleEn,
      titleNl: blogPosts.titleNl,
      titleDe: blogPosts.titleDe,
      titleFr: blogPosts.titleFr,
      excerptEn: blogPosts.excerptEn,
      excerptNl: blogPosts.excerptNl,
      excerptDe: blogPosts.excerptDe,
      excerptFr: blogPosts.excerptFr,
      contentEn: blogPosts.contentEn,
      contentNl: blogPosts.contentNl,
      contentDe: blogPosts.contentDe,
      contentFr: blogPosts.contentFr,
      featuredImage: blogPosts.featuredImage,
      featuredImageAlt: blogPosts.featuredImageAlt,
      authorName: blogPosts.authorName,
      categoryId: blogPosts.categoryId,
      categorySlug: blogCategories.slug,
      categoryNameEn: blogCategories.nameEn,
      categoryNameNl: blogCategories.nameNl,
      categoryNameDe: blogCategories.nameDe,
      categoryNameFr: blogCategories.nameFr,
      readingTimeMinutes: blogPosts.readingTimeMinutes,
      viewCount: blogPosts.viewCount,
      publishedAt: blogPosts.publishedAt,
      createdAt: blogPosts.createdAt,
      status: blogPosts.status,
    })
    .from(blogPosts)
    .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
    .where(eq(blogPosts.slug, slug))
    .limit(1);

  const row = results[0];
  if (!row) return null;

  // Only return if published (or you can remove this for preview)
  if (row.status !== "published") return null;

  return {
    id: row.id,
    slug: row.slug,
    title: getLocalizedField({ en: row.titleEn, nl: row.titleNl, de: row.titleDe, fr: row.titleFr }, locale) ?? row.titleEn,
    excerpt: getLocalizedField({ en: row.excerptEn, nl: row.excerptNl, de: row.excerptDe, fr: row.excerptFr }, locale),
    content: getLocalizedField({ en: row.contentEn, nl: row.contentNl, de: row.contentDe, fr: row.contentFr }, locale) ?? row.contentEn,
    featuredImage: row.featuredImage,
    featuredImageAlt: row.featuredImageAlt,
    authorName: row.authorName,
    categoryId: row.categoryId,
    categorySlug: row.categorySlug,
    categoryName: getLocalizedField({ en: row.categoryNameEn, nl: row.categoryNameNl, de: row.categoryNameDe, fr: row.categoryNameFr }, locale),
    readingTimeMinutes: row.readingTimeMinutes,
    viewCount: row.viewCount,
    publishedAt: row.publishedAt,
    createdAt: row.createdAt,
  };
}

/**
 * Get SEO metadata for a blog post
 */
export async function getPostSeoBySlug(
  slug: string,
  locale: Locale
): Promise<{
  title: string;
  metaTitle: string | null;
  metaDescription: string | null;
  featuredImage: string | null;
} | null> {
  const results = await db
    .select({
      titleEn: blogPosts.titleEn,
      titleNl: blogPosts.titleNl,
      titleDe: blogPosts.titleDe,
      titleFr: blogPosts.titleFr,
      metaTitleEn: blogPosts.metaTitleEn,
      metaTitleNl: blogPosts.metaTitleNl,
      metaTitleDe: blogPosts.metaTitleDe,
      metaTitleFr: blogPosts.metaTitleFr,
      metaDescriptionEn: blogPosts.metaDescriptionEn,
      metaDescriptionNl: blogPosts.metaDescriptionNl,
      metaDescriptionDe: blogPosts.metaDescriptionDe,
      metaDescriptionFr: blogPosts.metaDescriptionFr,
      featuredImage: blogPosts.featuredImage,
    })
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .limit(1);

  const row = results[0];
  if (!row) return null;

  return {
    title: getLocalizedField({ en: row.titleEn, nl: row.titleNl, de: row.titleDe, fr: row.titleFr }, locale) ?? row.titleEn,
    metaTitle: getLocalizedField({ en: row.metaTitleEn, nl: row.metaTitleNl, de: row.metaTitleDe, fr: row.metaTitleFr }, locale),
    metaDescription: getLocalizedField({ en: row.metaDescriptionEn, nl: row.metaDescriptionNl, de: row.metaDescriptionDe, fr: row.metaDescriptionFr }, locale),
    featuredImage: row.featuredImage,
  };
}

/**
 * Get latest posts for homepage
 */
export async function getLatestPosts(
  locale: Locale,
  limit: number = 3
): Promise<BlogPostCard[]> {
  return getPublishedPosts(locale, { limit });
}

/**
 * Get posts by category
 */
export async function getPostsByCategory(
  categorySlug: string,
  locale: Locale,
  options: { limit?: number; offset?: number } = {}
): Promise<BlogPostCard[]> {
  const { limit = 10, offset = 0 } = options;

  const results = await db
    .select({
      id: blogPosts.id,
      slug: blogPosts.slug,
      titleEn: blogPosts.titleEn,
      titleNl: blogPosts.titleNl,
      titleDe: blogPosts.titleDe,
      titleFr: blogPosts.titleFr,
      excerptEn: blogPosts.excerptEn,
      excerptNl: blogPosts.excerptNl,
      excerptDe: blogPosts.excerptDe,
      excerptFr: blogPosts.excerptFr,
      featuredImage: blogPosts.featuredImage,
      featuredImageAlt: blogPosts.featuredImageAlt,
      authorName: blogPosts.authorName,
      categorySlug: blogCategories.slug,
      categoryNameEn: blogCategories.nameEn,
      categoryNameNl: blogCategories.nameNl,
      categoryNameDe: blogCategories.nameDe,
      categoryNameFr: blogCategories.nameFr,
      readingTimeMinutes: blogPosts.readingTimeMinutes,
      publishedAt: blogPosts.publishedAt,
    })
    .from(blogPosts)
    .innerJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
    .where(
      and(
        eq(blogCategories.slug, categorySlug),
        eq(blogPosts.status, "published"),
        isNotNull(blogPosts.publishedAt),
        lte(blogPosts.publishedAt, new Date())
      )
    )
    .orderBy(desc(blogPosts.publishedAt))
    .limit(limit)
    .offset(offset);

  return results.map((row) => ({
    id: row.id,
    slug: row.slug,
    title: getLocalizedField({ en: row.titleEn, nl: row.titleNl, de: row.titleDe, fr: row.titleFr }, locale) ?? row.titleEn,
    excerpt: getLocalizedField({ en: row.excerptEn, nl: row.excerptNl, de: row.excerptDe, fr: row.excerptFr }, locale),
    featuredImage: row.featuredImage,
    featuredImageAlt: row.featuredImageAlt,
    authorName: row.authorName,
    categorySlug: row.categorySlug,
    categoryName: getLocalizedField({ en: row.categoryNameEn, nl: row.categoryNameNl, de: row.categoryNameDe, fr: row.categoryNameFr }, locale),
    readingTimeMinutes: row.readingTimeMinutes,
    publishedAt: row.publishedAt,
  }));
}

/**
 * Increment view count for a post
 */
export async function incrementPostViewCount(postId: number): Promise<void> {
  await db
    .update(blogPosts)
    .set({
      viewCount: sql`${blogPosts.viewCount} + 1`,
    })
    .where(eq(blogPosts.id, postId));
}

/**
 * Get total post count
 */
export async function getPublishedPostCount(): Promise<number> {
  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(blogPosts)
    .where(
      and(
        eq(blogPosts.status, "published"),
        isNotNull(blogPosts.publishedAt),
        lte(blogPosts.publishedAt, new Date())
      )
    );

  return Number(result[0]?.count ?? 0);
}

/**
 * Get all post slugs (for static generation)
 */
export async function getAllPostSlugs(): Promise<string[]> {
  const results = await db
    .select({ slug: blogPosts.slug })
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"));

  return results.map((r) => r.slug);
}

// ============================================================================
// BLOG CATEGORY QUERIES
// ============================================================================

/**
 * Get all active blog categories
 */
export async function getAllBlogCategories(locale: Locale): Promise<BlogCategory[]> {
  const results = await db
    .select({
      id: blogCategories.id,
      slug: blogCategories.slug,
      nameEn: blogCategories.nameEn,
      nameNl: blogCategories.nameNl,
      nameDe: blogCategories.nameDe,
      nameFr: blogCategories.nameFr,
      descriptionEn: blogCategories.descriptionEn,
      descriptionNl: blogCategories.descriptionNl,
      descriptionDe: blogCategories.descriptionDe,
      descriptionFr: blogCategories.descriptionFr,
      icon: blogCategories.icon,
      color: blogCategories.color,
    })
    .from(blogCategories)
    .where(eq(blogCategories.isActive, true))
    .orderBy(asc(blogCategories.sortOrder));

  return results.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: getLocalizedField({ en: row.nameEn, nl: row.nameNl, de: row.nameDe, fr: row.nameFr }, locale) ?? row.nameEn,
    description: getLocalizedField({ en: row.descriptionEn, nl: row.descriptionNl, de: row.descriptionDe, fr: row.descriptionFr }, locale),
    icon: row.icon,
    color: row.color,
  }));
}

/**
 * Get category by slug
 */
export async function getBlogCategoryBySlug(
  slug: string,
  locale: Locale
): Promise<BlogCategory | null> {
  const results = await db
    .select({
      id: blogCategories.id,
      slug: blogCategories.slug,
      nameEn: blogCategories.nameEn,
      nameNl: blogCategories.nameNl,
      nameDe: blogCategories.nameDe,
      nameFr: blogCategories.nameFr,
      descriptionEn: blogCategories.descriptionEn,
      descriptionNl: blogCategories.descriptionNl,
      descriptionDe: blogCategories.descriptionDe,
      descriptionFr: blogCategories.descriptionFr,
      icon: blogCategories.icon,
      color: blogCategories.color,
    })
    .from(blogCategories)
    .where(eq(blogCategories.slug, slug))
    .limit(1);

  const row = results[0];
  if (!row) return null;

  return {
    id: row.id,
    slug: row.slug,
    name: getLocalizedField({ en: row.nameEn, nl: row.nameNl, de: row.nameDe, fr: row.nameFr }, locale) ?? row.nameEn,
    description: getLocalizedField({ en: row.descriptionEn, nl: row.descriptionNl, de: row.descriptionDe, fr: row.descriptionFr }, locale),
    icon: row.icon,
    color: row.color,
  };
}

/**
 * Get category SEO by slug
 */
export async function getBlogCategorySeoBySlug(
  slug: string,
  locale: Locale
): Promise<{
  name: string;
  metaTitle: string | null;
  metaDescription: string | null;
} | null> {
  const results = await db
    .select({
      nameEn: blogCategories.nameEn,
      nameNl: blogCategories.nameNl,
      nameDe: blogCategories.nameDe,
      nameFr: blogCategories.nameFr,
      metaTitleEn: blogCategories.metaTitleEn,
      metaTitleNl: blogCategories.metaTitleNl,
      metaTitleDe: blogCategories.metaTitleDe,
      metaTitleFr: blogCategories.metaTitleFr,
      metaDescriptionEn: blogCategories.metaDescriptionEn,
      metaDescriptionNl: blogCategories.metaDescriptionNl,
      metaDescriptionDe: blogCategories.metaDescriptionDe,
      metaDescriptionFr: blogCategories.metaDescriptionFr,
    })
    .from(blogCategories)
    .where(eq(blogCategories.slug, slug))
    .limit(1);

  const row = results[0];
  if (!row) return null;

  return {
    name: getLocalizedField({ en: row.nameEn, nl: row.nameNl, de: row.nameDe, fr: row.nameFr }, locale) ?? row.nameEn,
    metaTitle: getLocalizedField({ en: row.metaTitleEn, nl: row.metaTitleNl, de: row.metaTitleDe, fr: row.metaTitleFr }, locale),
    metaDescription: getLocalizedField({ en: row.metaDescriptionEn, nl: row.metaDescriptionNl, de: row.metaDescriptionDe, fr: row.metaDescriptionFr }, locale),
  };
}

/**
 * Get all category slugs (for static generation)
 */
export async function getAllBlogCategorySlugs(): Promise<string[]> {
  const results = await db
    .select({ slug: blogCategories.slug })
    .from(blogCategories)
    .where(eq(blogCategories.isActive, true));

  return results.map((r) => r.slug);
}

// ============================================================================
// BLOG TAG QUERIES
// ============================================================================

/**
 * Get all tags
 */
export async function getAllBlogTags(locale: Locale): Promise<BlogTag[]> {
  const results = await db
    .select({
      id: blogTags.id,
      slug: blogTags.slug,
      nameEn: blogTags.nameEn,
      nameNl: blogTags.nameNl,
      nameDe: blogTags.nameDe,
      nameFr: blogTags.nameFr,
      postCount: blogTags.postCount,
    })
    .from(blogTags)
    .orderBy(desc(blogTags.postCount));

  return results.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: getLocalizedField({ en: row.nameEn, nl: row.nameNl, de: row.nameDe, fr: row.nameFr }, locale) ?? row.nameEn,
    postCount: row.postCount,
  }));
}

/**
 * Get tags for a post
 */
export async function getTagsForPost(
  postId: number,
  locale: Locale
): Promise<BlogTag[]> {
  const results = await db
    .select({
      id: blogTags.id,
      slug: blogTags.slug,
      nameEn: blogTags.nameEn,
      nameNl: blogTags.nameNl,
      nameDe: blogTags.nameDe,
      nameFr: blogTags.nameFr,
      postCount: blogTags.postCount,
    })
    .from(blogTags)
    .innerJoin(blogPostTags, eq(blogPostTags.tagId, blogTags.id))
    .where(eq(blogPostTags.postId, postId));

  return results.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: getLocalizedField({ en: row.nameEn, nl: row.nameNl, de: row.nameDe, fr: row.nameFr }, locale) ?? row.nameEn,
    postCount: row.postCount,
  }));
}

// ============================================================================
// RELATED POSTS
// ============================================================================

/**
 * Get related posts (same category, excluding current post)
 */
export async function getRelatedPosts(
  postId: number,
  categoryId: number | null,
  locale: Locale,
  limit: number = 3
): Promise<BlogPostCard[]> {
  const selectFields = {
    id: blogPosts.id,
    slug: blogPosts.slug,
    titleEn: blogPosts.titleEn,
    titleNl: blogPosts.titleNl,
    titleDe: blogPosts.titleDe,
    titleFr: blogPosts.titleFr,
    excerptEn: blogPosts.excerptEn,
    excerptNl: blogPosts.excerptNl,
    excerptDe: blogPosts.excerptDe,
    excerptFr: blogPosts.excerptFr,
    featuredImage: blogPosts.featuredImage,
    featuredImageAlt: blogPosts.featuredImageAlt,
    authorName: blogPosts.authorName,
    categorySlug: blogCategories.slug,
    categoryNameEn: blogCategories.nameEn,
    categoryNameNl: blogCategories.nameNl,
    categoryNameDe: blogCategories.nameDe,
    categoryNameFr: blogCategories.nameFr,
    readingTimeMinutes: blogPosts.readingTimeMinutes,
    publishedAt: blogPosts.publishedAt,
  };

  const mapRow = (row: typeof selectFields extends Record<string, infer T> ? { [K in keyof typeof selectFields]: any } : never) => ({
    id: row.id,
    slug: row.slug,
    title: getLocalizedField({ en: row.titleEn, nl: row.titleNl, de: row.titleDe, fr: row.titleFr }, locale) ?? row.titleEn,
    excerpt: getLocalizedField({ en: row.excerptEn, nl: row.excerptNl, de: row.excerptDe, fr: row.excerptFr }, locale),
    featuredImage: row.featuredImage,
    featuredImageAlt: row.featuredImageAlt,
    authorName: row.authorName,
    categorySlug: row.categorySlug,
    categoryName: getLocalizedField({ en: row.categoryNameEn, nl: row.categoryNameNl, de: row.categoryNameDe, fr: row.categoryNameFr }, locale),
    readingTimeMinutes: row.readingTimeMinutes,
    publishedAt: row.publishedAt,
  });

  if (!categoryId) {
    // If no category, just get latest posts excluding current
    const results = await db
      .select(selectFields)
      .from(blogPosts)
      .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
      .where(
        and(
          eq(blogPosts.status, "published"),
          isNotNull(blogPosts.publishedAt),
          lte(blogPosts.publishedAt, new Date()),
          sql`${blogPosts.id} != ${postId}`
        )
      )
      .orderBy(desc(blogPosts.publishedAt))
      .limit(limit);

    return results.map(mapRow);
  }

  const results = await db
    .select(selectFields)
    .from(blogPosts)
    .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
    .where(
      and(
        eq(blogPosts.status, "published"),
        eq(blogPosts.categoryId, categoryId),
        isNotNull(blogPosts.publishedAt),
        lte(blogPosts.publishedAt, new Date()),
        sql`${blogPosts.id} != ${postId}`
      )
    )
    .orderBy(desc(blogPosts.publishedAt))
    .limit(limit);

  return results.map(mapRow);
}
