/**
 * Homepage - Directory Landing Page
 *
 * CACHING STRATEGY: Static + ISR (Incremental Static Regeneration)
 * - revalidate: 300s (5 minutes) - Balances freshness with performance
 * - Data changes infrequently (countries, categories)
 * - First request serves stale, triggers background regeneration
 * - Optimal for SEO and Core Web Vitals (fast TTFB)
 */

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SearchBar, CategoryCard, getCategoryIcon } from "@/components/directory";
import { getCountries, getCategories, getPlaceCount, getCityCount, getLatestPosts, getPopularPlaces, getFeaturedReviewsForHomepage, getTopReviewsForHomepage, type Locale } from "@/db/queries";
import { getActiveAdForPlacement } from "@/db/queries/ads";
import { HomepageFeaturedAd } from "@/components/ads";
import {
  generateSeoData,
  DEFAULT_SEO_CONFIG,
  buildAlternateUrls,
  getLocalizedCategoryName,
  type ContentLocale,
} from "@/lib/seo";
import { Search, Star, CheckCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

// ISR: Revalidate every 5 minutes for fresh content while maintaining performance
export const revalidate = 300;

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;

  const seo = await generateSeoData("home", { locale });

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonicalUrl,
      languages: buildAlternateUrls({ locale }, DEFAULT_SEO_CONFIG.supportedLocales),
    },
    openGraph: {
      title: seo.openGraph?.title ?? seo.title,
      description: seo.openGraph?.description ?? seo.description,
      url: seo.canonicalUrl,
      siteName: DEFAULT_SEO_CONFIG.siteName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations("homepage");

  const [countries, categories, totalPlaces, totalCities, latestPosts, homepageSponsorAd, popularPlaces, featuredReviews] = await Promise.all([
    getCountries(),
    getCategories(),
    getPlaceCount(),
    getCityCount(),
    getLatestPosts(locale as Locale, 2),
    getActiveAdForPlacement("homepage_featured", locale as Locale),
    getPopularPlaces(6),
    getFeaturedReviewsForHomepage(3),
  ]);

  // Fallback to top-rated reviews if no featured reviews
  const testimonialReviews = featuredReviews.length > 0
    ? featuredReviews
    : await getTopReviewsForHomepage(3);

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  return (
    <>
      {/* Hero with Search - Cozy Theme (Light & Dark) */}
      <section className="relative overflow-hidden min-h-[600px] md:min-h-[700px]">
        {/* Background image - Cozy sleeping pets from Unsplash */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop"
            alt="Cozy sleeping pets"
            fill
            className="object-cover"
            priority
          />
          {/* Warm gradient overlay - adapts to theme */}
          <div className="hero-overlay" />
        </div>

        {/* Subtle decorative elements */}
        <div className="absolute top-20 right-20 w-64 h-64 border-2 border-cpAmber/20 dark:border-cpAmber/10 rounded-full hidden lg:block" />
        <div className="absolute bottom-32 left-16 w-32 h-32 border-2 border-cpCoral/20 dark:border-cpCoral/10 rounded-full hidden lg:block" />

        <div className="relative container mx-auto max-w-6xl px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            {/* Blurred background for better text readability */}
            <div className="bg-white/80 dark:bg-cpCharcoal/60 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-cpAmber/20 dark:border-cpAmber/10 shadow-lg dark:shadow-none">
            {/* Badge with cozy glass effect */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 dark:bg-cpCharcoal/60 backdrop-blur-sm border border-cpCoral/30 dark:border-cpAmber/20 mb-6 animate-fade-in">
              <span className="text-lg">🐾</span>
              <span className="text-sm font-medium text-foreground dark:text-cpCream">
                {t("badge")}
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground dark:text-cpCream mb-6 tracking-tight animate-slide-up">
              {t("heroTitlePart1")}<span className="text-cpCoral">{t("heroTitleHighlight")}</span>{t("heroTitlePart2")}
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground dark:text-cpCream/80 mb-10 max-w-xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {t("heroSubtitle")}
            </p>

            {/* Search box with cozy styling */}
            <div className="cozy-card rounded-3xl p-4 md:p-6 shadow-xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <SearchBar locale={locale} placeholder={t("searchPlaceholder")} />
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span>{t("freeToUse")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="w-2 h-2 rounded-full bg-cpCoral" />
                <span>217+ {t("locations")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="w-2 h-2 rounded-full bg-cpAmber" />
                <span>4.8★ {t("averageRating")}</span>
              </div>
            </div>
            </div>
            {/* End blurred background wrapper */}
          </div>
        </div>
      </section>

      {/* Main Content - Consistent Background (Light/Dark) */}
      <div className="bg-background dark:bg-cpCharcoal">
        {/* Categories */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              {t("exploreCategories")}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {displayCategories.map((category) => (
              <CategoryCard
                key={category.slug}
                href={`/${locale}/search?category=${category.slug}`}
                icon={getCategoryIcon(category.icon)}
                label={getLocalizedCategoryName(category.slug, locale as ContentLocale)}
              />
            ))}
          </div>
        </section>

        {/* Stats - Trusted by Thousands */}
        <section className="container mx-auto max-w-6xl px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: totalPlaces.toLocaleString() || "10,000+", label: t("businesses") },
              { value: countries.length.toString() || "50+", label: t("countries") },
              { value: totalCities.toLocaleString() || "500+", label: t("cities") },
              { value: "4.8", label: t("avgRating") },
            ].map((stat, i) => (
              <div key={stat.label} className="bg-card dark:bg-cpSurface/50 rounded-2xl p-4 md:p-6 text-center border border-border dark:border-cpAmber/20 shadow-sm">
                <div className={`text-2xl md:text-3xl font-bold mb-1 ${i % 2 === 0 ? 'text-cpCoral' : 'text-cpAmber'}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground dark:text-cpCream/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Homepage Featured Sponsor Ad */}
        {homepageSponsorAd && (
          <section className="container mx-auto max-w-6xl px-4 py-8">
            <HomepageFeaturedAd sponsorAd={homepageSponsorAd} />
          </section>
        )}

        {/* Countries - Browse by Country */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              {t("browseByCountry")}
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {countries.map((country) => (
                <Link
                  key={country.slug || country.code}
                  href={`/${locale}/${country.slug}`}
                  className="bg-card dark:bg-cpSurface/50 rounded-2xl p-4 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all text-center group shadow-sm hover:shadow-md"
                >
                  <span className="text-3xl mb-2 block">{getFlagEmoji(country.code)}</span>
                  <span className="text-foreground dark:text-cpCream font-medium group-hover:text-cpCoral transition-colors">{country.name}</span>
                </Link>
            ))}
          </div>
        </section>

        {/* Recommended Services */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              {t("recommendedServices")}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🩺",
                title: t("veterinarians"),
                desc: t("veterinariansDesc"),
                href: `/${locale}/search?category=veterinary`
              },
              {
                icon: "✂️",
                title: t("groomers"),
                desc: t("groomersDesc"),
                href: `/${locale}/search?category=grooming`
              },
              {
                icon: "🏠",
                title: t("petHotels"),
                desc: t("petHotelsDesc"),
                href: `/${locale}/search?category=boarding`
              },
            ].map((service) => (
              <Link key={service.title} href={service.href} className="bg-card dark:bg-cpSurface/50 rounded-3xl p-6 text-center border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-lg hover:border-cpCoral/40 transition-all group">
                <div className="category-circle mx-auto mb-4">
                  <span className="text-3xl">{service.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">{service.title}</h3>
                <p className="text-sm text-muted-foreground dark:text-slate-400 mb-4">{service.desc}</p>
                <span className="btn-coral w-full py-2.5 rounded-xl text-sm font-medium inline-block">
                  {t("viewAll")} →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Pet Toxicity Warning Section */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              ⚠️ {locale === "nl" ? "Giftige Stoffen voor Huisdieren" : "Toxic Substances for Pets"}
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/70 max-w-2xl mx-auto">
              {locale === "nl"
                ? "Weet welke stoffen gevaarlijk zijn voor je hond of kat. Onze gidsen helpen je je huisdier te beschermen."
                : "Know which substances are dangerous for your dog or cat. Our guides help you protect your pet."}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: "🍫",
                title: locale === "nl" ? "Chocolade" : "Chocolate",
                desc: locale === "nl" ? "Zeer giftig voor honden door theobromine" : "Highly toxic to dogs due to theobromine",
                href: `/${locale}/is-chocolade-giftig-voor-honden`,
                level: "hoog",
                animal: "🐕",
              },
              {
                icon: "🌸",
                title: locale === "nl" ? "Lelies" : "Lilies",
                desc: locale === "nl" ? "Dodelijk voor katten - alle delen giftig" : "Deadly to cats - all parts toxic",
                href: `/${locale}/is-lelie-giftig-voor-katten`,
                level: "hoog",
                animal: "🐈",
              },
              {
                icon: "💊",
                title: locale === "nl" ? "Paracetamol" : "Paracetamol",
                desc: locale === "nl" ? "DODELIJK voor katten, nooit geven!" : "DEADLY for cats, never give!",
                href: `/${locale}/is-paracetamol-giftig-voor-katten`,
                level: "hoog",
                animal: "🐈",
              },
              {
                icon: "🍇",
                title: locale === "nl" ? "Druiven" : "Grapes",
                desc: locale === "nl" ? "Veroorzaakt acuut nierfalen bij honden" : "Causes acute kidney failure in dogs",
                href: `/${locale}/is-druiven-giftig-voor-honden`,
                level: "hoog",
                animal: "🐕",
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-2xl p-5 border transition-all hover:-translate-y-1 hover:shadow-lg bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-red-200 dark:border-red-800/30 hover:border-red-400"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="text-lg">{item.animal}</span>
                </div>
                <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold mb-2 ${
                  item.level === "hoog"
                    ? "bg-red-500 text-white"
                    : "bg-orange-500 text-white"
                }`}>
                  {item.level === "hoog" ? "HOOG RISICO" : "MIDDEL"}
                </span>
                <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-red-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground dark:text-slate-400 mt-1">
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link
              href={`/${locale}/voedselgids`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-cpCoral text-white rounded-2xl font-medium hover:bg-cpCoral/90 transition-colors"
            >
              {locale === "nl" ? "Complete Voedselgids (80+ pagina's)" : "Complete Food Guide (80+ pages)"}
              <span>→</span>
            </Link>
            <Link
              href={`/${locale}/giftige-stoffen`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded-2xl font-medium hover:bg-red-500/20 dark:hover:bg-red-500/30 transition-colors"
            >
              {locale === "nl" ? "Alle 53 giftige stoffen" : "All 53 toxic substances"}
              <span>→</span>
            </Link>
          </div>
        </section>

        {/* Pet Guide Section */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              {t("petGuideTitle")}
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/70 max-w-2xl mx-auto">
              {t("petGuideSubtitle")}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: "📚",
                title: t("petGuideAll"),
                desc: t("petGuideAllDesc"),
                href: `/${locale}/${locale === "nl" ? "gids" : "guide"}`,
                highlight: false,
              },
              {
                icon: "🛒",
                title: t("petGuideDeals"),
                desc: t("petGuideDealsDesc"),
                href: `/${locale}/gids/dierenwinkel/hondenvoer-aanbiedingen-zooplus`,
                highlight: true,
              },
              {
                icon: "🐕",
                title: t("petGuideDogCare"),
                desc: t("petGuideDogCareDesc"),
                href: `/${locale}/${locale === "nl" ? "gids/hondenverzorging" : "guide/dog-care"}`,
                highlight: false,
              },
              {
                icon: "🐈",
                title: t("petGuideCatCare"),
                desc: t("petGuideCatCareDesc"),
                href: `/${locale}/${locale === "nl" ? "gids/kattenverzorging" : "guide/cat-care"}`,
                highlight: false,
              },
            ].map((guide) => (
              <Link
                key={guide.title}
                href={guide.href}
                className={`group rounded-2xl p-5 border transition-all hover:-translate-y-1 hover:shadow-lg ${
                  guide.highlight
                    ? "bg-gradient-to-br from-[#FF6600]/10 to-cpAmber/10 dark:from-[#FF6600]/20 dark:to-cpAmber/20 border-[#FF6600]/30 hover:border-[#FF6600]/50"
                    : "bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20 hover:border-cpCoral/40"
                }`}
              >
                <span className="text-3xl mb-3 block">{guide.icon}</span>
                <h3 className={`font-bold mb-2 group-hover:text-cpCoral transition-colors ${
                  guide.highlight ? "text-[#FF6600]" : "text-foreground dark:text-cpCream"
                }`}>
                  {guide.title}
                </h3>
                <p className="text-sm text-muted-foreground dark:text-slate-400">
                  {guide.desc}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              {t("howItWorks")}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: 1, icon: Search, title: t("search"), desc: t("searchDesc") },
              { step: 2, icon: Star, title: t("compare"), desc: t("compareDesc") },
              { step: 3, icon: CheckCircle, title: t("book"), desc: t("bookDesc") },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="category-circle mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-cpAmber" />
                </div>
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2 italic">{item.step}. {item.title}</h3>
                <p className="text-sm text-muted-foreground dark:text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tips & Advice - from Blog */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              {t("latestTips")}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {latestPosts.length > 0 ? (
              latestPosts.map((post) => (
                <Link key={post.id} href={`/${locale}/blog/${post.slug}`}>
                  <article className="group bg-card dark:bg-cpSurface/50 rounded-3xl overflow-hidden border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-lg transition-all h-full">
                    <div className="relative h-48">
                      {post.featuredImage ? (
                        <Image src={post.featuredImage} alt={post.featuredImageAlt || post.title} fill className="object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cpCoral/10 to-cpAmber/10 dark:from-cpCoral/20 dark:to-cpAmber/20">
                          <span className="text-5xl opacity-50">📰</span>
                        </div>
                      )}
                      {post.categoryName && (
                        <span className="absolute top-3 left-3 px-3 py-1 bg-cpCoral/90 text-white text-xs font-medium rounded-full">
                          {post.categoryName}
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">{post.title}</h3>
                      {post.excerpt && (
                        <p className="text-sm text-muted-foreground dark:text-slate-400 mb-3 line-clamp-2">{post.excerpt}</p>
                      )}
                      <span className="text-cpCoral text-sm font-medium">{t("readMore")} →</span>
                    </div>
                  </article>
                </Link>
              ))
            ) : (
              // Fallback to placeholder content if no blog posts
              [
                { img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=250&fit=crop", title: t("tipHealthyPuppy"), desc: t("tipHealthyPuppyDesc") },
                { img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&h=250&fit=crop", title: t("tipBestGroomer"), desc: t("tipBestGroomerDesc") },
              ].map((tip) => (
                <article key={tip.title} className="group bg-card dark:bg-cpSurface/50 rounded-3xl overflow-hidden border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-lg transition-all">
                  <div className="relative h-48">
                    <Image src={tip.img} alt={tip.title} fill className="object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-foreground dark:text-cpCream mb-2">{tip.title}</h3>
                    <p className="text-sm text-muted-foreground dark:text-slate-400 mb-3">{tip.desc}</p>
                    <span className="text-cpCoral text-sm font-medium">{t("readMore")} →</span>
                  </div>
                </article>
              ))
            )}
          </div>
          {latestPosts.length > 0 && (
            <div className="text-center mt-8">
              <Link
                href={`/${locale}/blog`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-cpCoral/10 dark:bg-cpCoral/20 text-cpCoral rounded-2xl font-medium hover:bg-cpCoral/20 dark:hover:bg-cpCoral/30 transition-colors"
              >
                {t("viewAllArticles")}
                <span>→</span>
              </Link>
            </div>
          )}
        </section>

        {/* Testimonials - Real reviews from database */}
        {testimonialReviews.length > 0 && (
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              {t("whatOwnersSay")}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonialReviews.slice(0, 2).map((review) => {
              const place = review.place;
              const city = place?.city;
              const country = city?.country;
              const reviewUrl = place && city && country
                ? `/${locale}/${country.slug}/${city.slug}/all/${place.slug}`
                : null;

              return (
                <div key={review.id} className="bg-card dark:bg-cpSurface/50 rounded-3xl p-6 border border-border dark:border-cpAmber/20 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cpCoral to-cpAmber flex items-center justify-center text-white dark:text-cpCharcoal font-bold">
                      {(review.user?.name || "A").charAt(0).toUpperCase()}
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? "fill-cpAmber text-cpAmber" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground dark:text-cpCream/80 mb-4 line-clamp-3">
                    "{review.body}"
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground dark:text-cpCream/60">
                      {review.user?.name || t("anonymous")}
                      {place?.name && <span className="text-cpCoral"> • {place.name}</span>}
                    </span>
                    {reviewUrl && (
                      <Link href={reviewUrl} className="text-cpCoral text-sm font-medium hover:underline">
                        {t("view")} →
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        )}

        {/* Featured Places - Real data from database */}
        {popularPlaces.length > 0 && (
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              {t("popularPlaces")}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {popularPlaces.map((place) => {
              const city = place.city;
              const country = city?.country;
              const province = city?.province;
              const categoriesArray = Array.isArray(place.placeCategories) ? place.placeCategories : place.placeCategories ? [place.placeCategories] : [];
              const firstCategory = categoriesArray[0]?.category;
              const categorySlug = firstCategory?.slug || "all";
              const categoryIcon = getCategoryIcon(firstCategory?.icon || categorySlug);

              // Build URL with province prefix
              const href = province
                ? `/${locale}/${country?.slug || "netherlands"}/p/${province.slug}/${city?.slug || ""}/${categorySlug}/${place.slug}`
                : `/${locale}/${country?.slug || "netherlands"}/${city?.slug || ""}/${categorySlug}/${place.slug}`;

              const locationText = city && country
                ? `${city.name}, ${country.name}`
                : city?.name || "";

              return (
                <Link key={place.id} href={href} className="group" prefetch={false}>
                  <div className="bg-card dark:bg-cpSurface/50 rounded-3xl overflow-hidden border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all shadow-sm hover:shadow-lg">
                    <div className="h-40 bg-gradient-to-br from-cpCoral/10 dark:from-cpCoral/20 to-cpAmber/5 dark:to-cpAmber/10 flex items-center justify-center">
                      <span className="text-5xl">{categoryIcon}</span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-cpAmber font-medium">{getLocalizedCategoryName(categorySlug, locale as ContentLocale)}</span>
                        <span className="flex items-center gap-1 text-cpAmber text-sm">
                          <Star className="w-3 h-3 fill-cpAmber" />
                          {place.avgRating ? parseFloat(place.avgRating).toFixed(1) : "–"}
                        </span>
                      </div>
                      <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors">{place.name}</h3>
                      <p className="text-sm text-muted-foreground dark:text-slate-400">{locationText}</p>
                      <p className="text-xs text-muted-foreground dark:text-slate-500 mt-1">
                        {place.reviewCount} {t("reviews")}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
        )}

        {/* FAQ */}
        <section className="container mx-auto max-w-4xl px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              {t("faq")}
            </h2>
          </div>
          <div className="space-y-4">
            {[
              { question: t("faqFreeQuestion"), answer: t("faqFreeAnswer") },
              { question: t("faqVerifyQuestion"), answer: t("faqVerifyAnswer") },
              { question: t("faqReviewQuestion"), answer: t("faqReviewAnswer") },
              { question: t("faqListQuestion"), answer: t("faqListAnswer") },
              { question: t("faqCountriesQuestion"), answer: t("faqCountriesAnswer") },
            ].map((faq, index) => (
              <details key={index} className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  {faq.question}
                  <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">{faq.answer}</div>
              </details>
            ))}
          </div>
        </section>

      </div>
      {/* End of Main Content wrapper */}

      {/* CTA - Coral gradient card */}
      <section className="bg-secondary dark:bg-cpCharcoal">
        <div className="container mx-auto max-w-6xl px-4 py-20">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          {/* Multi-layer gradient background - warm coral to amber */}
          <div className="absolute inset-0 bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,209,102,0.3),transparent_50%)]" />

          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cpAmber/30 rounded-full blur-2xl" />

          {/* Decorative circles */}
          <div className="absolute top-8 right-16 w-20 h-20 border-2 border-white/20 rounded-full hidden md:block" />
          <div className="absolute bottom-8 left-20 w-12 h-12 border-2 border-white/10 rounded-full hidden md:block" />

          <div className="relative p-8 md:p-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white/90 text-sm font-medium mb-4">
                  🚀 {t("forBusinesses")}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  {t("ownPetBusiness")}
                </h2>
                <p className="text-white/80 text-lg max-w-md">
                  {t("getFoundByOwners")}
                </p>

                {/* Benefits list */}
                <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
                  <div className="flex items-center gap-2 text-white/90 text-sm">
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">✓</span>
                    {t("freeListing")}
                  </div>
                  <div className="flex items-center gap-2 text-white/90 text-sm">
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">✓</span>
                    {t("moreCustomers")}
                  </div>
                  <div className="flex items-center gap-2 text-white/90 text-sm">
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">✓</span>
                    {t("premiumOptions")}
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="bg-white dark:bg-cpCharcoal text-cpCoral dark:text-cpCream hover:bg-white/90 dark:hover:bg-cpCharcoal/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 px-8 py-6 text-lg font-semibold rounded-2xl border border-white/20 dark:border-cpAmber/20"
                asChild
              >
                <Link href={`/${locale}/for-businesses`}>
                  {t("listYourBusiness")} →
                </Link>
              </Button>
            </div>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}

// Helper function to get flag emoji from country code
function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

const defaultCategories = [
  { slug: "pet-hotels", icon: "hotel", labelKey: "Pet Hotels" },
  { slug: "veterinarians", icon: "vet", labelKey: "Veterinarians" },
  { slug: "grooming", icon: "grooming", labelKey: "Grooming" },
  { slug: "training", icon: "training", labelKey: "Training" },
  { slug: "pet-shops", icon: "shop", labelKey: "Pet Shops" },
  { slug: "dog-walking", icon: "walking", labelKey: "Dog Walking" },
];

