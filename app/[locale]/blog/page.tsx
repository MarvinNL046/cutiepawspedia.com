/**
 * Blog Listing Page
 *
 * CACHING STRATEGY: ISR with 5-minute revalidation
 * - Blog posts may change frequently (new posts, edits)
 * - revalidate: 300 (5 minutes) balances freshness with performance
 */

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPublishedPosts, getAllBlogCategories, getPublishedPostCount, type Locale } from "@/db/queries";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface BlogPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; page?: string }>;
}

// ISR: Revalidate every 5 minutes
export const revalidate = 300;

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;

  const title = locale === "nl"
    ? "Blog - Tips & Advies voor Huisdiereigenaren | CutiePawsPedia"
    : "Blog - Tips & Advice for Pet Owners | CutiePawsPedia";

  const description = locale === "nl"
    ? "Ontdek de beste tips, adviezen en verhalen voor huisdiereigenaren. Leer meer over verzorging, training, gezondheid en meer."
    : "Discover the best tips, advice and stories for pet owners. Learn about care, training, health and more.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { locale } = await params;
  const { category, page = "1" } = await searchParams;

  const currentPage = Math.max(1, parseInt(page, 10) || 1);
  const postsPerPage = 9;
  const offset = (currentPage - 1) * postsPerPage;

  const [posts, categories, totalPosts] = await Promise.all([
    getPublishedPosts(locale as Locale, {
      limit: postsPerPage,
      offset,
      categorySlug: category,
    }),
    getAllBlogCategories(locale as Locale),
    getPublishedPostCount(),
  ]);

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cpCoral/10 via-cpAmber/5 to-background dark:from-cpCoral/20 dark:via-cpAmber/10 dark:to-cpCharcoal py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 border border-cpCoral/30 text-cpCoral dark:text-cpCoral mb-6">
              <span className="text-lg">📖</span>
              <span className="text-sm font-medium">
                {locale === "nl" ? "Blog & Artikelen" : "Blog & Articles"}
              </span>
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-4">
              {locale === "nl" ? (
                <>Tips & <span className="text-cpCoral">Advies</span></>
              ) : (
                <>Tips & <span className="text-cpCoral">Advice</span></>
              )}
            </h1>

            <p className="text-lg text-muted-foreground dark:text-cpCream/70 max-w-2xl mx-auto">
              {locale === "nl"
                ? "Ontdek nuttige tips, deskundig advies en interessante verhalen voor jou en je huisdier."
                : "Discover helpful tips, expert advice and interesting stories for you and your pet."}
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      {categories.length > 0 && (
        <section className="border-b border-border dark:border-cpAmber/10 bg-card dark:bg-cpSurface/30">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="flex flex-wrap items-center gap-3 py-4 overflow-x-auto">
              <Link
                href={`/${locale}/blog`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  !category
                    ? "bg-cpCoral text-white"
                    : "bg-secondary dark:bg-cpCharcoal text-muted-foreground dark:text-cpCream/70 hover:bg-cpCoral/10 dark:hover:bg-cpCoral/20"
                }`}
              >
                {locale === "nl" ? "Alles" : "All"}
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${locale}/blog?category=${cat.slug}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                    category === cat.slug
                      ? "bg-cpCoral text-white"
                      : "bg-secondary dark:bg-cpCharcoal text-muted-foreground dark:text-cpCream/70 hover:bg-cpCoral/10 dark:hover:bg-cpCoral/20"
                  }`}
                >
                  {cat.icon && <span className="mr-1">{cat.icon}</span>}
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="container mx-auto max-w-6xl px-4 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-2">
              {locale === "nl" ? "Nog geen artikelen" : "No articles yet"}
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/70">
              {locale === "nl"
                ? "We werken aan nieuwe content. Kom snel terug!"
                : "We're working on new content. Check back soon!"}
            </p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group bg-card dark:bg-cpSurface/50 rounded-3xl overflow-hidden border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <Link href={`/${locale}/blog/${post.slug}`}>
                    {/* Featured Image */}
                    <div className="relative h-48 bg-gradient-to-br from-cpCoral/10 to-cpAmber/10 dark:from-cpCoral/20 dark:to-cpAmber/20">
                      {post.featuredImage ? (
                        <Image
                          src={post.featuredImage}
                          alt={post.featuredImageAlt || post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-5xl opacity-50">📰</span>
                        </div>
                      )}
                      {post.categoryName && (
                        <span className="absolute top-3 left-3 px-3 py-1 bg-cpCoral/90 text-white text-xs font-medium rounded-full">
                          {post.categoryName}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      {/* Meta */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground dark:text-cpCream/60 mb-3">
                        {post.publishedAt && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(post.publishedAt)}
                          </span>
                        )}
                        {post.readingTimeMinutes && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readingTimeMinutes} min
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="text-lg font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-muted-foreground dark:text-cpCream/70 text-sm mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Read More */}
                      <span className="inline-flex items-center gap-1 text-cpCoral font-medium text-sm group-hover:gap-2 transition-all">
                        {locale === "nl" ? "Lees meer" : "Read more"}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                {currentPage > 1 && (
                  <Link
                    href={`/${locale}/blog?page=${currentPage - 1}${category ? `&category=${category}` : ""}`}
                    className="px-4 py-2 rounded-lg bg-secondary dark:bg-cpSurface text-foreground dark:text-cpCream hover:bg-cpCoral/10 dark:hover:bg-cpCoral/20 transition-colors"
                  >
                    {locale === "nl" ? "Vorige" : "Previous"}
                  </Link>
                )}

                <span className="px-4 py-2 text-muted-foreground dark:text-cpCream/70">
                  {locale === "nl"
                    ? `Pagina ${currentPage} van ${totalPages}`
                    : `Page ${currentPage} of ${totalPages}`}
                </span>

                {currentPage < totalPages && (
                  <Link
                    href={`/${locale}/blog?page=${currentPage + 1}${category ? `&category=${category}` : ""}`}
                    className="px-4 py-2 rounded-lg bg-secondary dark:bg-cpSurface text-foreground dark:text-cpCream hover:bg-cpCoral/10 dark:hover:bg-cpCoral/20 transition-colors"
                  >
                    {locale === "nl" ? "Volgende" : "Next"}
                  </Link>
                )}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
