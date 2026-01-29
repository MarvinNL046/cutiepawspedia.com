/**
 * Top N in Country Page - Top 10 places in a category within a country
 *
 * Route: /{locale}/{countrySlug}/top/{categorySlug}
 * Example: /nl/netherlands/top/veterinary
 *
 * CACHING STRATEGY: Static + ISR (Incremental Static Regeneration)
 * - revalidate: 600s (10 minutes) - Rankings update less frequently
 * - SEO-optimized for "Top 10 {CategoryName} in {CountryName}"
 * - Canonical points to main category page
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  getCountries,
  getCategories,
  getCountryBySlug,
  getCategoryBySlug,
  getTopPlacesByCountrySlugAndCategorySlug,
} from "@/db/queries";
import { getCategoryIcon } from "@/components/directory";
import { getCityName, getCitySlug } from "@/lib/utils/place-helpers";
import { PageHeader, SectionHeader } from "@/components/layout";
import { Trophy, Star, MapPin, ExternalLink } from "lucide-react";
import {
  DEFAULT_SEO_CONFIG,
  buildAlternateUrls,
  buildCanonicalUrl,
  itemListSchema,
  getLocalizedCategoryName,
  getLocalesForCountry,
  type ContentLocale,
} from "@/lib/seo";
import { generateContent } from "@/lib/ai/generateContent";
import Link from "next/link";
import { setRequestLocale, getTranslations } from 'next-intl/server';

interface TopInCountryPageProps {
  params: Promise<{ locale: string; countrySlug: string; categorySlug: string }>;
}

// ISR: Optimized to 1 hour to reduce Vercel costs (was 600s)
// Pages are generated on-demand and cached - no static generation to reduce build time/costs
export const revalidate = 86400;

const TOP_COUNT = 10;

export async function generateMetadata({ params }: TopInCountryPageProps): Promise<Metadata> {
  const { locale, countrySlug, categorySlug } = await params;
  setRequestLocale(locale);

  const [country, category, places] = await Promise.all([
    getCountryBySlug(countrySlug),
    getCategoryBySlug(categorySlug),
    getTopPlacesByCountrySlugAndCategorySlug(countrySlug, categorySlug, TOP_COUNT),
  ]);

  if (!country || !category) {
    return {
      title: `Top 10 ${categorySlug.replace(/-/g, " ")} in ${countrySlug.replace(/-/g, " ")}`.replace(/\b\w/g, (c) => c.toUpperCase()),
    };
  }

  const categoryLabel = getLocalizedCategoryName(categorySlug, locale as ContentLocale);

  // Generate AI-driven content (cached or generated on demand)
  const { content } = await generateContent({
    type: "top",
    locale: locale as ContentLocale,
    data: {
      categoryName: categoryLabel,
      categorySlug,
      countryName: country.name,
      countrySlug,
      topCount: TOP_COUNT,
      highlightedPlaces: places.map((p) => ({
        name: p.name,
        rating: p.avgRating ? parseFloat(p.avgRating) : undefined,
        reviewCount: p.reviewCount || undefined,
        cityName: (() => { const city = Array.isArray(p.city) ? p.city[0] : p.city; return city?.name || ""; })(),
      })),
      year: new Date().getFullYear(),
    },
  });

  const title = locale === "nl"
    ? `Top 10 ${categoryLabel} in ${country.name} (${new Date().getFullYear()}) | CutiePawsPedia`
    : `Top 10 ${categoryLabel} in ${country.name} (${new Date().getFullYear()}) | CutiePawsPedia`;

  // Canonical points to main category page (this is a variant)
  const canonicalUrl = buildCanonicalUrl({
    locale,
    countrySlug,
    categorySlug,
  });

  return {
    title,
    description: content.metaDescription,
    keywords: [
      `top 10 ${categoryLabel.toLowerCase()} ${country.name}`,
      `beste ${categoryLabel.toLowerCase()} ${country.name}`,
      `${categorySlug} ranking ${country.name}`,
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternateUrls(
        { locale, countrySlug, categorySlug },
        DEFAULT_SEO_CONFIG.supportedLocales
      ),
    },
    openGraph: {
      title,
      description: content.metaDescription,
      url: `${DEFAULT_SEO_CONFIG.siteName}/${locale}/${countrySlug}/top/${categorySlug}`,
      siteName: DEFAULT_SEO_CONFIG.siteName,
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: content.metaDescription,
    },
  };
}

export default async function TopInCountryPage({ params }: TopInCountryPageProps) {
  const { locale, countrySlug, categorySlug } = await params;

  const t = await getTranslations("categoryPages");

  const [country, category, places] = await Promise.all([
    getCountryBySlug(countrySlug),
    getCategoryBySlug(categorySlug),
    getTopPlacesByCountrySlugAndCategorySlug(countrySlug, categorySlug, TOP_COUNT),
  ]);

  if (!country || !category) {
    notFound();
  }

  const countryName = country.name;
  const categoryLabel = getLocalizedCategoryName(categorySlug, locale as ContentLocale);
  const categoryIcon = getCategoryIcon(category.icon || categorySlug);

  // Generate AI-driven content for the page (cached or generated on demand)
  const { content } = await generateContent({
    type: "top",
    locale: locale as ContentLocale,
    data: {
      categoryName: categoryLabel,
      categorySlug,
      countryName,
      countrySlug,
      topCount: TOP_COUNT,
      highlightedPlaces: places.map((p) => ({
        name: p.name,
        rating: p.avgRating ? parseFloat(p.avgRating) : undefined,
        reviewCount: p.reviewCount || undefined,
        cityName: (() => { const city = Array.isArray(p.city) ? p.city[0] : p.city; return city?.name || ""; })(),
      })),
      year: new Date().getFullYear(),
    },
  });

  // Generate JSON-LD ItemList for Top 10
  const itemListJsonLd = itemListSchema(
    places.map((place, index) => ({
      name: place.name,
      url: `/${locale}/${countrySlug}/${getCitySlug(place)}/${categorySlug}/${place.slug}`,
      position: index + 1,
      description: place.description || undefined,
    })),
    `Top 10 ${categoryLabel} in ${countryName}`
  );

  return (
    <>
      {/* JSON-LD ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <PageHeader
        title={`Top 10 ${categoryLabel} in ${countryName}`}
        subtitle={
          <span className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-cpYellow" />
            {t("ranking2025")}
          </span>
        }
        icon={<span className="text-3xl">{categoryIcon}</span>}
        variant="gradient-pink"
        breadcrumbs={[
          { label: t("directory"), href: `/${locale}` },
          { label: countryName, href: `/${locale}/${countrySlug}` },
          { label: categoryLabel, href: `/${locale}/${countrySlug}/c/${categorySlug}` },
          { label: t("top10") },
        ]}
      />

      {/* AI-Generated Intro Content */}
      <section className="bg-gradient-to-b from-cpCoral/10 to-white border-b">
        <div className="container mx-auto max-w-6xl px-4 py-6">
          <p className="text-slate-700 mb-2">{content.intro}</p>
          {content.secondary && (
            <p className="text-sm text-muted-foreground">{content.secondary}</p>
          )}
        </div>
      </section>

      {/* Top 10 List */}
      <section className="container mx-auto max-w-4xl px-4 py-8">
        {places.length > 0 ? (
          <div className="space-y-6">
            {places.map((place, index) => (
              <article
                key={place.id}
                className={`relative bg-white rounded-xl border-2 ${
                  index === 0 ? "border-cpYellow shadow-lg" : index < 3 ? "border-cpCoral/30" : "border-slate-200"
                } overflow-hidden`}
              >
                {/* Rank Banner */}
                <div
                  className={`absolute top-0 left-0 px-4 py-2 ${
                    index === 0
                      ? "bg-cpYellow text-white"
                      : index === 1
                      ? "bg-slate-400 text-white"
                      : index === 2
                      ? "bg-amber-600 text-white"
                      : "bg-slate-200 text-slate-600"
                  } font-bold text-lg rounded-br-xl`}
                >
                  #{index + 1}
                </div>

                <div className="p-6 pl-20">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <Link
                        href={`/${locale}/${countrySlug}/${getCitySlug(place)}/${categorySlug}/${place.slug}`}
                        className="text-xl font-bold text-slate-900 hover:text-cpCoral transition-colors"
                      >
                        {place.name}
                      </Link>

                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{getCityName(place)}, {countryName}</span>
                      </div>

                      {place.description && (
                        <p className="mt-3 text-slate-600 line-clamp-2">
                          {place.description}
                        </p>
                      )}

                      {/* Quick Stats */}
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-5 w-5 text-cpYellow fill-current" />
                          <span className="font-semibold">
                            {place.avgRating ? parseFloat(place.avgRating).toFixed(1) : "N/A"}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {place.reviewCount || 0} reviews
                        </span>
                      </div>
                    </div>

                    {/* View Button */}
                    <Link
                      href={`/${locale}/${countrySlug}/${getCitySlug(place)}/${categorySlug}/${place.slug}`}
                      className="flex-shrink-0 inline-flex items-center gap-1 px-4 py-2 bg-cpCoral text-white rounded-lg hover:bg-cpCoral/90 transition-colors text-sm font-medium"
                    >
                      {t("view")}
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <span className="text-6xl block mb-4">🏆</span>
            <h2 className="text-xl font-semibold mb-2">
              {t("noRankingAvailable")}
            </h2>
            <p className="text-muted-foreground">
              {t("notEnoughReviews", { category: categoryLabel.toLowerCase(), location: countryName })}
            </p>
          </div>
        )}
      </section>

      {/* Related Links */}
      <section className="bg-slate-50 py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <SectionHeader title={t("exploreMore")} />
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-cpCoral/10">
              <a href={`/${locale}/${countrySlug}/c/${categorySlug}`}>
                {t("allIn", { category: categoryLabel, location: countryName })}
              </a>
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-cpCoral/10">
              <a href={`/${locale}/${countrySlug}/best/${categorySlug}`}>
                {t("bestIn", { category: categoryLabel, location: "" }).replace(" in ", "")}
              </a>
            </Badge>
          </div>
        </div>
      </section>
    </>
  );
}

