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
 * Get locale-aware field value with fallback to English
 */
function getLocalizedField<T>(
  enValue: T | null | undefined,
  nlValue: T | null | undefined,
  locale: Locale
): T | null {
  if (locale === "nl" && nlValue) {
    return nlValue;
  }
  return enValue ?? null;
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
      excerptEn: blogPosts.excerptEn,
      excerptNl: blogPosts.excerptNl,
      featuredImage: blogPosts.featuredImage,
      featuredImageAlt: blogPosts.featuredImageAlt,
      authorName: blogPosts.authorName,
      categorySlug: blogCategories.slug,
      categoryNameEn: blogCategories.nameEn,
      categoryNameNl: blogCategories.nameNl,
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
    title: getLocalizedField(row.titleEn, row.titleNl, locale) ?? row.titleEn,
    excerpt: getLocalizedField(row.excerptEn, row.excerptNl, locale),
    featuredImage: row.featuredImage,
    featuredImageAlt: row.featuredImageAlt,
    authorName: row.authorName,
    categorySlug: row.categorySlug,
    categoryName: getLocalizedField(row.categoryNameEn, row.categoryNameNl, locale),
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
      excerptEn: blogPosts.excerptEn,
      excerptNl: blogPosts.excerptNl,
      contentEn: blogPosts.contentEn,
      contentNl: blogPosts.contentNl,
      featuredImage: blogPosts.featuredImage,
      featuredImageAlt: blogPosts.featuredImageAlt,
      authorName: blogPosts.authorName,
      categoryId: blogPosts.categoryId,
      categorySlug: blogCategories.slug,
      categoryNameEn: blogCategories.nameEn,
      categoryNameNl: blogCategories.nameNl,
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
    title: getLocalizedField(row.titleEn, row.titleNl, locale) ?? row.titleEn,
    excerpt: getLocalizedField(row.excerptEn, row.excerptNl, locale),
    content: getLocalizedField(row.contentEn, row.contentNl, locale) ?? row.contentEn,
    featuredImage: row.featuredImage,
    featuredImageAlt: row.featuredImageAlt,
    authorName: row.authorName,
    categoryId: row.categoryId,
    categorySlug: row.categorySlug,
    categoryName: getLocalizedField(row.categoryNameEn, row.categoryNameNl, locale),
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
      metaTitleEn: blogPosts.metaTitleEn,
      metaTitleNl: blogPosts.metaTitleNl,
      metaDescriptionEn: blogPosts.metaDescriptionEn,
      metaDescriptionNl: blogPosts.metaDescriptionNl,
      featuredImage: blogPosts.featuredImage,
    })
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .limit(1);

  const row = results[0];
  if (!row) return null;

  return {
    title: getLocalizedField(row.titleEn, row.titleNl, locale) ?? row.titleEn,
    metaTitle: getLocalizedField(row.metaTitleEn, row.metaTitleNl, locale),
    metaDescription: getLocalizedField(row.metaDescriptionEn, row.metaDescriptionNl, locale),
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
      excerptEn: blogPosts.excerptEn,
      excerptNl: blogPosts.excerptNl,
      featuredImage: blogPosts.featuredImage,
      featuredImageAlt: blogPosts.featuredImageAlt,
      authorName: blogPosts.authorName,
      categorySlug: blogCategories.slug,
      categoryNameEn: blogCategories.nameEn,
      categoryNameNl: blogCategories.nameNl,
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
    title: getLocalizedField(row.titleEn, row.titleNl, locale) ?? row.titleEn,
    excerpt: getLocalizedField(row.excerptEn, row.excerptNl, locale),
    featuredImage: row.featuredImage,
    featuredImageAlt: row.featuredImageAlt,
    authorName: row.authorName,
    categorySlug: row.categorySlug,
    categoryName: getLocalizedField(row.categoryNameEn, row.categoryNameNl, locale),
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
      descriptionEn: blogCategories.descriptionEn,
      descriptionNl: blogCategories.descriptionNl,
      icon: blogCategories.icon,
      color: blogCategories.color,
    })
    .from(blogCategories)
    .where(eq(blogCategories.isActive, true))
    .orderBy(asc(blogCategories.sortOrder));

  return results.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: getLocalizedField(row.nameEn, row.nameNl, locale) ?? row.nameEn,
    description: getLocalizedField(row.descriptionEn, row.descriptionNl, locale),
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
      descriptionEn: blogCategories.descriptionEn,
      descriptionNl: blogCategories.descriptionNl,
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
    name: getLocalizedField(row.nameEn, row.nameNl, locale) ?? row.nameEn,
    description: getLocalizedField(row.descriptionEn, row.descriptionNl, locale),
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
      metaTitleEn: blogCategories.metaTitleEn,
      metaTitleNl: blogCategories.metaTitleNl,
      metaDescriptionEn: blogCategories.metaDescriptionEn,
      metaDescriptionNl: blogCategories.metaDescriptionNl,
    })
    .from(blogCategories)
    .where(eq(blogCategories.slug, slug))
    .limit(1);

  const row = results[0];
  if (!row) return null;

  return {
    name: getLocalizedField(row.nameEn, row.nameNl, locale) ?? row.nameEn,
    metaTitle: getLocalizedField(row.metaTitleEn, row.metaTitleNl, locale),
    metaDescription: getLocalizedField(row.metaDescriptionEn, row.metaDescriptionNl, locale),
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
      postCount: blogTags.postCount,
    })
    .from(blogTags)
    .orderBy(desc(blogTags.postCount));

  return results.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: getLocalizedField(row.nameEn, row.nameNl, locale) ?? row.nameEn,
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
      postCount: blogTags.postCount,
    })
    .from(blogTags)
    .innerJoin(blogPostTags, eq(blogPostTags.tagId, blogTags.id))
    .where(eq(blogPostTags.postId, postId));

  return results.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: getLocalizedField(row.nameEn, row.nameNl, locale) ?? row.nameEn,
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
  if (!categoryId) {
    // If no category, just get latest posts excluding current
    const results = await db
      .select({
        id: blogPosts.id,
        slug: blogPosts.slug,
        titleEn: blogPosts.titleEn,
        titleNl: blogPosts.titleNl,
        excerptEn: blogPosts.excerptEn,
        excerptNl: blogPosts.excerptNl,
        featuredImage: blogPosts.featuredImage,
        featuredImageAlt: blogPosts.featuredImageAlt,
        authorName: blogPosts.authorName,
        categorySlug: blogCategories.slug,
        categoryNameEn: blogCategories.nameEn,
        categoryNameNl: blogCategories.nameNl,
        readingTimeMinutes: blogPosts.readingTimeMinutes,
        publishedAt: blogPosts.publishedAt,
      })
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

    return results.map((row) => ({
      id: row.id,
      slug: row.slug,
      title: getLocalizedField(row.titleEn, row.titleNl, locale) ?? row.titleEn,
      excerpt: getLocalizedField(row.excerptEn, row.excerptNl, locale),
      featuredImage: row.featuredImage,
      featuredImageAlt: row.featuredImageAlt,
      authorName: row.authorName,
      categorySlug: row.categorySlug,
      categoryName: getLocalizedField(row.categoryNameEn, row.categoryNameNl, locale),
      readingTimeMinutes: row.readingTimeMinutes,
      publishedAt: row.publishedAt,
    }));
  }

  const results = await db
    .select({
      id: blogPosts.id,
      slug: blogPosts.slug,
      titleEn: blogPosts.titleEn,
      titleNl: blogPosts.titleNl,
      excerptEn: blogPosts.excerptEn,
      excerptNl: blogPosts.excerptNl,
      featuredImage: blogPosts.featuredImage,
      featuredImageAlt: blogPosts.featuredImageAlt,
      authorName: blogPosts.authorName,
      categorySlug: blogCategories.slug,
      categoryNameEn: blogCategories.nameEn,
      categoryNameNl: blogCategories.nameNl,
      readingTimeMinutes: blogPosts.readingTimeMinutes,
      publishedAt: blogPosts.publishedAt,
    })
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

  return results.map((row) => ({
    id: row.id,
    slug: row.slug,
    title: getLocalizedField(row.titleEn, row.titleNl, locale) ?? row.titleEn,
    excerpt: getLocalizedField(row.excerptEn, row.excerptNl, locale),
    featuredImage: row.featuredImage,
    featuredImageAlt: row.featuredImageAlt,
    authorName: row.authorName,
    categorySlug: row.categorySlug,
    categoryName: getLocalizedField(row.categoryNameEn, row.categoryNameNl, locale),
    readingTimeMinutes: row.readingTimeMinutes,
    publishedAt: row.publishedAt,
  }));
}
