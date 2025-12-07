/**
 * Blog Post Detail Page
 *
 * CACHING STRATEGY: ISR with 5-minute revalidation
 * - Individual posts may be updated
 * - revalidate: 300 (5 minutes) for content freshness
 *
 * FEATURES:
 * - Sidebar with Table of Contents + Ads
 * - In-content ads between paragraphs
 * - Photo credits for Unsplash images
 */

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getPostBySlug,
  getPostSeoBySlug,
  getTagsForPost,
  getRelatedPosts,
  getAllPostSlugs,
  incrementPostViewCount,
  type Locale,
} from "@/db/queries";
import { getActiveAdForPlacement } from "@/db/queries/ads";
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Tag } from "lucide-react";
import { TableOfContents, extractTocItems, PhotoCredit } from "@/components/blog";
import { BlogSidebarAd, BetweenContentAd } from "@/components/ads";

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// ISR: Revalidate every 5 minutes
export const revalidate = 300;

// Generate static paths for all published posts
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  const locales = ["en", "nl"];

  return locales.flatMap((locale) =>
    slugs.map((slug) => ({
      locale,
      slug,
    }))
  );
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  const seo = await getPostSeoBySlug(slug, locale as Locale);

  if (!seo) {
    return {
      title: locale === "nl" ? "Artikel niet gevonden" : "Article not found",
    };
  }

  const title = seo.metaTitle || `${seo.title} | CutiePawsPedia`;
  const description = seo.metaDescription || "";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: seo.featuredImage ? [seo.featuredImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: seo.featuredImage ? [seo.featuredImage] : undefined,
    },
  };
}

// Helper to generate slug from text
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Parse content and add IDs to headings, plus insert ads
function parseContentWithAds(content: string, showAds: boolean = true) {
  const paragraphs = content.split("\n\n");
  const elements: React.ReactNode[] = [];
  let paragraphCount = 0;
  const AD_INTERVAL = 4; // Show ad every 4 paragraphs

  paragraphs.forEach((paragraph, index) => {
    // Check for headings
    if (paragraph.startsWith("## ")) {
      const text = paragraph.replace("## ", "").trim();
      const id = `heading-${slugify(text)}`;
      elements.push(
        <h2
          key={`h2-${index}`}
          id={id}
          className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24"
        >
          {text}
        </h2>
      );
    } else if (paragraph.startsWith("### ")) {
      const text = paragraph.replace("### ", "").trim();
      const id = `heading-${slugify(text)}`;
      elements.push(
        <h3
          key={`h3-${index}`}
          id={id}
          className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24"
        >
          {text}
        </h3>
      );
    } else if (paragraph.startsWith("- ") || paragraph.startsWith("* ")) {
      // List items
      const items = paragraph.split("\n").filter((line) => line.trim());
      elements.push(
        <ul
          key={`ul-${index}`}
          className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80"
        >
          {items.map((item, i) => (
            <li key={i}>{item.replace(/^[-*]\s/, "")}</li>
          ))}
        </ul>
      );
      paragraphCount++;
    } else if (paragraph.trim()) {
      // Regular paragraph
      elements.push(
        <p
          key={`p-${index}`}
          className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4"
        >
          {paragraph}
        </p>
      );
      paragraphCount++;

      // Insert ad after every AD_INTERVAL paragraphs
      if (showAds && paragraphCount > 0 && paragraphCount % AD_INTERVAL === 0) {
        elements.push(
          <BetweenContentAd key={`ad-${index}`} testMode={true} />
        );
      }
    }
  });

  return elements;
}

// Extract TOC items with proper IDs
function extractTocItemsWithIds(content: string) {
  const items: { id: string; text: string; level: 2 | 3 }[] = [];
  const lines = content.split("\n");

  lines.forEach((line) => {
    if (line.startsWith("## ")) {
      const text = line.replace("## ", "").trim();
      const id = `heading-${slugify(text)}`;
      items.push({ id, text, level: 2 });
    } else if (line.startsWith("### ")) {
      const text = line.replace("### ", "").trim();
      const id = `heading-${slugify(text)}`;
      items.push({ id, text, level: 3 });
    }
  });

  return items;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;

  const post = await getPostBySlug(slug, locale as Locale);

  if (!post) {
    notFound();
  }

  // Increment view count (fire and forget)
  incrementPostViewCount(post.id).catch(() => {});

  // Fetch tags, related posts, and sponsor ads in parallel
  const [tags, relatedPosts, sidebarAd] = await Promise.all([
    getTagsForPost(post.id, locale as Locale),
    getRelatedPosts(post.id, post.categoryId, locale as Locale, 3),
    getActiveAdForPlacement("blog_sidebar", locale as "en" | "nl"),
  ]);

  // Extract table of contents
  const tocItems = extractTocItemsWithIds(post.content);

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  // Parse featured image for Unsplash credits
  // Format: https://images.unsplash.com/...?photographer=Name&photographer_url=...
  const parseImageCredits = (url: string | null) => {
    if (!url || !url.includes("unsplash.com")) return null;

    // For demo purposes, extract from URL params or use placeholder
    // In production, store this in database
    try {
      const urlObj = new URL(url);
      const photographer = urlObj.searchParams.get("photographer");
      const photographerUrl = urlObj.searchParams.get("photographer_url");
      return photographer ? { name: photographer, url: photographerUrl } : null;
    } catch {
      return null;
    }
  };

  const imageCredits = parseImageCredits(post.featuredImage);

  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Back Link */}
      <div className="container mx-auto max-w-6xl px-4 pt-8">
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 text-muted-foreground dark:text-cpCream/70 hover:text-cpCoral dark:hover:text-cpCoral transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {locale === "nl" ? "Terug naar blog" : "Back to blog"}
        </Link>
      </div>

      {/* Article Header */}
      <header className="container mx-auto max-w-6xl px-4 py-8">
        {/* Category */}
        {post.categoryName && (
          <span className="inline-block px-3 py-1 bg-cpCoral/10 dark:bg-cpCoral/20 text-cpCoral text-sm font-medium rounded-full mb-4">
            {post.categoryName}
          </span>
        )}

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-6 leading-tight max-w-4xl">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 text-muted-foreground dark:text-cpCream/60">
          {post.authorName && (
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.authorName}
            </span>
          )}
          {post.publishedAt && (
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDate(post.publishedAt)}
            </span>
          )}
          {post.readingTimeMinutes && (
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readingTimeMinutes} min {locale === "nl" ? "leestijd" : "read"}
            </span>
          )}
        </div>
      </header>

      {/* Featured Image with Photo Credit */}
      {post.featuredImage && (
        <div className="container mx-auto max-w-6xl px-4 mb-8">
          <div className="relative aspect-video rounded-3xl overflow-hidden">
            <Image
              src={post.featuredImage}
              alt={post.featuredImageAlt || post.title}
              fill
              className="object-cover"
              priority
            />
            {/* Photo Credit Overlay */}
            <PhotoCredit
              photographerName={imageCredits?.name}
              photographerUrl={imageCredits?.url || undefined}
              source="unsplash"
            />
          </div>
        </div>
      )}

      {/* Main Content with Sidebar */}
      <div className="container mx-auto max-w-6xl px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Article Content - Main Column */}
          <article className="flex-1 min-w-0">
            <div className="bg-card dark:bg-cpSurface/30 rounded-3xl p-6 md:p-10 border border-border dark:border-cpAmber/10">
              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-lg text-foreground dark:text-cpCream font-medium mb-6 pb-6 border-b border-border dark:border-cpAmber/10">
                  {post.excerpt}
                </p>
              )}

              {/* Main Content with In-Content Ads */}
              <div className="prose prose-lg max-w-none dark:prose-invert">
                {parseContentWithAds(post.content, true)}
              </div>
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Tag className="w-4 h-4 text-muted-foreground dark:text-cpCream/60" />
                {tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0 space-y-6">
            {/* Table of Contents */}
            {tocItems.length > 0 && (
              <div className="sticky top-20">
                <TableOfContents items={tocItems} locale={locale} />

                {/* Sidebar Ad */}
                <div className="mt-6">
                  <BlogSidebarAd sponsorAd={sidebarAd} />
                </div>
              </div>
            )}

            {/* If no TOC, just show ad */}
            {tocItems.length === 0 && (
              <div className="sticky top-20">
                <BlogSidebarAd sponsorAd={sidebarAd} />
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-secondary/50 dark:bg-cpSurface/20 py-12">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-8 text-center">
              {locale === "nl" ? "Gerelateerde Artikelen" : "Related Articles"}
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost.id}
                  className="group bg-card dark:bg-cpSurface/50 rounded-2xl overflow-hidden border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-md transition-all"
                >
                  <Link href={`/${locale}/blog/${relatedPost.slug}`}>
                    {/* Image */}
                    <div className="relative h-40 bg-gradient-to-br from-cpCoral/10 to-cpAmber/10 dark:from-cpCoral/20 dark:to-cpAmber/20">
                      {relatedPost.featuredImage ? (
                        <Image
                          src={relatedPost.featuredImage}
                          alt={relatedPost.featuredImageAlt || relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-4xl opacity-50">📰</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors line-clamp-2 mb-2">
                        {relatedPost.title}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-cpCoral text-sm font-medium">
                        {locale === "nl" ? "Lees meer" : "Read more"}
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Blog CTA */}
      <section className="container mx-auto max-w-4xl px-4 py-12">
        <div className="text-center">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-cpCoral text-white rounded-2xl font-medium hover:bg-cpCoral/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {locale === "nl" ? "Bekijk alle artikelen" : "View all articles"}
          </Link>
        </div>
      </section>
    </div>
  );
}
