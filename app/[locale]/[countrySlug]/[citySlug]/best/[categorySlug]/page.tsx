/**
 * Best in City Page - Top-rated places in a category within a city
 *
 * Route: /{locale}/{countrySlug}/{citySlug}/best/{categorySlug}
 * Example: /nl/netherlands/amsterdam/best/veterinary
 *
 * CACHING STRATEGY: Static + ISR (Incremental Static Regeneration)
 * - revalidate: 300s (5 minutes) - City-level data changes more frequently
 * - SEO-optimized for "Best {CategoryName} in {CityName}"
 * - Canonical points to main city+category page
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  getCityBySlugAndCountry,
  getCategoryBySlug,
  getTopPlacesByCitySlugAndCategorySlug,
} from "@/db/queries";
import { getCategoryIcon } from "@/components/directory";
import { PageHeader, SectionHeader } from "@/components/layout";
import { Star, Award, TrendingUp, MapPin, ExternalLink } from "lucide-react";
import {
  DEFAULT_SEO_CONFIG,
  buildAlternateUrls,
  buildCanonicalUrl,
  itemListSchema,
  getLocalizedCategoryName,
  type ContentLocale,
} from "@/lib/seo";
import { generateContent } from "@/lib/ai/generateContent";
import { setRequestLocale, getTranslations } from 'next-intl/server';

interface BestInCityPageProps {
  params: Promise<{ locale: string; countrySlug: string; citySlug: string; categorySlug: string }>;
}

// ISR: Optimized to 1 hour to reduce Vercel costs (was 300s)
// Pages are generated on-demand and cached - no static generation to avoid build timeouts
export const revalidate = 86400;

export async function generateMetadata({ params }: BestInCityPageProps): Promise<Metadata> {
  const { locale, countrySlug, citySlug, categorySlug } = await params;
  setRequestLocale(locale);

  const [city, category, places] = await Promise.all([
    getCityBySlugAndCountry(citySlug, countrySlug),
    getCategoryBySlug(categorySlug),
    getTopPlacesByCitySlugAndCategorySlug(citySlug, countrySlug, categorySlug, 10),
  ]);

  if (!city || !category) {
    return {
      title: `Best ${categorySlug.replace(/-/g, " ")} in ${citySlug.replace(/-/g, " ")}`.replace(/\b\w/g, (c) => c.toUpperCase()),
    };
  }

  const categoryLabel = getLocalizedCategoryName(categorySlug, locale as ContentLocale);
  const country = Array.isArray(city.country) ? city.country[0] : city.country;
  const countryName = country?.name || countrySlug;

  // Generate AI-driven content (cached or generated on demand)
  const { content } = await generateContent({
    type: "best",
    locale: locale as ContentLocale,
    data: {
      categoryName: categoryLabel,
      categorySlug,
      cityName: city.name,
      citySlug,
      countryName,
      countrySlug,
      totalRanked: places.length,
      highlightedPlaces: places.slice(0, 5).map((p) => ({
        name: p.name,
        rating: p.avgRating ? parseFloat(p.avgRating) : undefined,
        reviewCount: p.reviewCount || undefined,
      })),
    },
  });

  const title = locale === "nl"
    ? `Beste ${categoryLabel} in ${city.name} | CutiePawsPedia`
    : `Best ${categoryLabel} in ${city.name} | CutiePawsPedia`;

  // Canonical points to main city+category page (this is a variant)
  const canonicalUrl = buildCanonicalUrl({
    locale,
    countrySlug,
    citySlug,
    categorySlug,
  });

  return {
    title,
    description: content.metaDescription,
    keywords: [
      `beste ${categoryLabel.toLowerCase()} ${city.name}`,
      `top ${categoryLabel.toLowerCase()} ${city.name}`,
      `${categorySlug} ${city.name} reviews`,
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternateUrls(
        { locale, countrySlug, citySlug, categorySlug },
        DEFAULT_SEO_CONFIG.supportedLocales
      ),
    },
    openGraph: {
      title,
      description: content.metaDescription,
      url: `${DEFAULT_SEO_CONFIG.siteName}/${locale}/${countrySlug}/${citySlug}/best/${categorySlug}`,
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

export default async function BestInCityPage({ params }: BestInCityPageProps) {
  const { locale, countrySlug, citySlug, categorySlug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("categoryPages");

  const [city, category, places] = await Promise.all([
    getCityBySlugAndCountry(citySlug, countrySlug),
    getCategoryBySlug(categorySlug),
    getTopPlacesByCitySlugAndCategorySlug(citySlug, countrySlug, categorySlug, 15),
  ]);

  if (!city || !category) {
    notFound();
  }

  const cityName = city.name;
  const countryData = Array.isArray(city.country) ? city.country[0] : city.country;
  const countryName = countryData?.name || countrySlug;
  const categoryLabel = getLocalizedCategoryName(categorySlug, locale as ContentLocale);
  const categoryIcon = getCategoryIcon(category.icon || categorySlug);

  // Generate AI-driven content for the page (cached or generated on demand)
  const { content } = await generateContent({
    type: "best",
    locale: locale as ContentLocale,
    data: {
      categoryName: categoryLabel,
      categorySlug,
      cityName,
      citySlug,
      countryName,
      countrySlug,
      totalRanked: places.length,
      highlightedPlaces: places.slice(0, 5).map((p) => ({
        name: p.name,
        rating: p.avgRating ? parseFloat(p.avgRating) : undefined,
        reviewCount: p.reviewCount || undefined,
      })),
    },
  });

  // Generate JSON-LD ItemList for rankings
  const itemListJsonLd = itemListSchema(
    places.map((place, index) => ({
      name: place.name,
      url: `/${locale}/${countrySlug}/${citySlug}/${categorySlug}/${place.slug}`,
      position: index + 1,
      description: place.description || undefined,
    })),
    `Best ${categoryLabel} in ${cityName}`
  );

  return (
    <>
      {/* JSON-LD ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <PageHeader
        title={t("bestIn", { category: categoryLabel, location: cityName })}
        subtitle={
          <span className="flex items-center gap-2">
            <Award className="h-5 w-5 text-cpYellow" />
            {t("topRanked", { count: places.length })}
          </span>
        }
        icon={<span className="text-3xl">{categoryIcon}</span>}
        variant="gradient-yellow"
        breadcrumbs={[
          { label: t("directory"), href: `/${locale}` },
          { label: countryName, href: `/${locale}/${countrySlug}` },
          { label: cityName, href: `/${locale}/${countrySlug}/${citySlug}` },
          { label: categoryLabel, href: `/${locale}/${countrySlug}/${citySlug}/${categorySlug}` },
          { label: t("best") },
        ]}
      />

      {/* AI-Generated Intro Content */}
      <section className="bg-cpYellow/10 border-b">
        <div className="container mx-auto max-w-6xl px-4 py-6">
          <p className="text-slate-700 mb-2">{content.intro}</p>
          {content.secondary && (
            <p className="text-sm text-muted-foreground">{content.secondary}</p>
          )}
          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-3">
            <TrendingUp className="h-4 w-4 text-cpYellow" />
            <span>
              {t("rankingBased")}
            </span>
          </div>
        </div>
      </section>

      {/* Ranked Places */}
      <section className="container mx-auto max-w-4xl px-4 py-8">
        {places.length > 0 ? (
          <div className="space-y-4">
            {places.map((place, index) => (
              <article
                key={place.id}
                className={`relative bg-white rounded-xl border-2 ${
                  index === 0 ? "border-cpYellow shadow-lg" : index < 3 ? "border-cpCoral/30" : "border-slate-200"
                } overflow-hidden`}
              >
                {/* Rank Badge */}
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

                <div className="p-5 pl-16">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/${locale}/${countrySlug}/${citySlug}/${categorySlug}/${place.slug}`}
                        className="text-lg font-bold text-slate-900 hover:text-cpCoral transition-colors"
                      >
                        {place.name}
                      </Link>

                      {index < 3 && (
                        <Badge variant="secondary" className="ml-2 bg-cpYellow/20 text-cpYellow">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          {t("topPick")}
                        </Badge>
                      )}

                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{place.address || cityName}</span>
                      </div>

                      {place.description && (
                        <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                          {place.description}
                        </p>
                      )}
                    </div>

                    {/* Rating & Action */}
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 text-cpYellow fill-current" />
                        <span className="font-bold text-lg">
                          {place.avgRating ? parseFloat(place.avgRating).toFixed(1) : "N/A"}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {place.reviewCount || 0} reviews
                      </span>
                      <Link
                        href={`/${locale}/${countrySlug}/${citySlug}/${categorySlug}/${place.slug}`}
                        className="mt-2 inline-flex items-center gap-1 px-3 py-1.5 bg-cpCoral text-white rounded-lg hover:bg-cpCoral/90 transition-colors text-sm font-medium"
                      >
                        {t("view")}
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <span className="text-6xl block mb-4">🔍</span>
            <h2 className="text-xl font-semibold mb-2">
              {t("noResults")}
            </h2>
            <p className="text-muted-foreground">
              {t("notEnoughReviews", { category: categoryLabel.toLowerCase(), location: cityName })}
            </p>
          </div>
        )}
      </section>

      {/* Related Links */}
      <section className="bg-slate-50 py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <SectionHeader title={t("seeAlso")} />
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-cpCoral/10">
              <a href={`/${locale}/${countrySlug}/${citySlug}/${categorySlug}`}>
                {t("allIn", { category: categoryLabel, location: cityName })}
              </a>
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-cpCoral/10">
              <a href={`/${locale}/${countrySlug}/best/${categorySlug}`}>
                {t("bestIn", { category: categoryLabel, location: countryName })}
              </a>
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-cpCoral/10">
              <a href={`/${locale}/${countrySlug}/${citySlug}`}>
                {t("allServices", { location: cityName })}
              </a>
            </Badge>
          </div>
        </div>
      </section>
    </>
  );
}

