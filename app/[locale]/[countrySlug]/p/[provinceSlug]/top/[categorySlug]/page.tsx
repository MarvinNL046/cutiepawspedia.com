/**
 * Top N in Province Page - Top 10 places in a category within a province
 *
 * Route: /{locale}/{countrySlug}/p/{provinceSlug}/top/{categorySlug}
 * Example: /nl/netherlands/p/noord-holland/top/veterinary
 *
 * CACHING STRATEGY: Static + ISR (Incremental Static Regeneration)
 * - revalidate: 600s (10 minutes) - Rankings update less frequently
 * - SEO-optimized for "Top 10 {CategoryName} in {ProvinceName}"
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  getCountryBySlug,
  getCategoryBySlug,
  getProvinceBySlugAndCountry,
  getTopPlacesByProvinceSlugAndCategorySlug,
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
  type ContentLocale,
} from "@/lib/seo";
import { generateContent } from "@/lib/ai/generateContent";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

interface TopInProvincePageProps {
  params: Promise<{
    locale: string;
    countrySlug: string;
    provinceSlug: string;
    categorySlug: string;
  }>;
}

// ISR: Rankings data, 10-minute revalidation
// Pages are generated on-demand and cached - no static generation to avoid build timeouts
export const revalidate = 600;

const TOP_COUNT = 10;

export async function generateMetadata({ params }: TopInProvincePageProps): Promise<Metadata> {
  const { locale, countrySlug, provinceSlug, categorySlug } = await params;

  const [country, province, category, places] = await Promise.all([
    getCountryBySlug(countrySlug),
    getProvinceBySlugAndCountry(provinceSlug, countrySlug),
    getCategoryBySlug(categorySlug),
    getTopPlacesByProvinceSlugAndCategorySlug(provinceSlug, countrySlug, categorySlug, TOP_COUNT),
  ]);

  if (!country || !province || !category) {
    return {
      title: `Top 10 ${categorySlug.replace(/-/g, " ")} in ${provinceSlug.replace(/-/g, " ")}`.replace(
        /\b\w/g,
        (c) => c.toUpperCase()
      ),
    };
  }

  const categoryLabel = getLocalizedCategoryName(categorySlug, locale as ContentLocale);
  const currentYear = new Date().getFullYear();

  // Generate AI-driven content (cached or generated on demand)
  const { content } = await generateContent({
    type: "top",
    locale: locale as ContentLocale,
    data: {
      categoryName: categoryLabel,
      categorySlug,
      countryName: `${province.name}, ${country.name}`,
      countrySlug,
      topCount: TOP_COUNT,
      highlightedPlaces: places.map((p) => ({
        name: p.name,
        rating: p.avgRating ? parseFloat(p.avgRating) : undefined,
        reviewCount: p.reviewCount || undefined,
        cityName: getCityName(p),
      })),
      year: currentYear,
    },
  });

  const title =
    locale === "nl"
      ? `Top 10 ${categoryLabel} in ${province.name} (${currentYear}) | CutiePawsPedia`
      : locale === "de"
      ? `Top 10 ${categoryLabel} in ${province.name} (${currentYear}) | CutiePawsPedia`
      : locale === "fr"
      ? `Top 10 ${categoryLabel} en ${province.name} (${currentYear}) | CutiePawsPedia`
      : `Top 10 ${categoryLabel} in ${province.name} (${currentYear}) | CutiePawsPedia`;

  // Canonical points to main province category page (this is a variant)
  const canonicalUrl = buildCanonicalUrl({
    locale,
    countrySlug,
    provinceSlug,
    categorySlug,
  });

  return {
    title,
    description: content.metaDescription,
    keywords: [
      `top 10 ${categoryLabel.toLowerCase()} ${province.name}`,
      `beste ${categoryLabel.toLowerCase()} ${province.name}`,
      `${categorySlug} ranking ${province.name}`,
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternateUrls(
        { locale, countrySlug, provinceSlug, categorySlug },
        DEFAULT_SEO_CONFIG.supportedLocales
      ),
    },
    openGraph: {
      title,
      description: content.metaDescription,
      url: `${DEFAULT_SEO_CONFIG.siteName}/${locale}/${countrySlug}/p/${provinceSlug}/top/${categorySlug}`,
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

export default async function TopInProvincePage({ params }: TopInProvincePageProps) {
  const { locale, countrySlug, provinceSlug, categorySlug } = await params;

  const t = await getTranslations("categoryPages");
  const tProvince = await getTranslations("provinceTopPages");

  const [country, province, category, places] = await Promise.all([
    getCountryBySlug(countrySlug),
    getProvinceBySlugAndCountry(provinceSlug, countrySlug),
    getCategoryBySlug(categorySlug),
    getTopPlacesByProvinceSlugAndCategorySlug(provinceSlug, countrySlug, categorySlug, TOP_COUNT),
  ]);

  if (!country || !province || !category) {
    notFound();
  }

  const countryName = country.name;
  const provinceName = province.name;
  const categoryLabel = getLocalizedCategoryName(categorySlug, locale as ContentLocale);
  const categoryIcon = getCategoryIcon(category.icon || categorySlug);
  const currentYear = new Date().getFullYear();

  // Generate AI-driven content for the page (cached or generated on demand)
  const { content } = await generateContent({
    type: "top",
    locale: locale as ContentLocale,
    data: {
      categoryName: categoryLabel,
      categorySlug,
      countryName: `${provinceName}, ${countryName}`,
      countrySlug,
      topCount: TOP_COUNT,
      highlightedPlaces: places.map((p) => ({
        name: p.name,
        rating: p.avgRating ? parseFloat(p.avgRating) : undefined,
        reviewCount: p.reviewCount || undefined,
        cityName: getCityName(p),
      })),
      year: currentYear,
    },
  });

  // Generate JSON-LD ItemList for Top 10
  const itemListJsonLd = itemListSchema(
    places.map((place, index) => ({
      name: place.name,
      url: `/${locale}/${countrySlug}/p/${provinceSlug}/${getCitySlug(place)}/${categorySlug}/${place.slug}`,
      position: index + 1,
      description: place.description || undefined,
    })),
    `Top 10 ${categoryLabel} in ${provinceName}`
  );

  return (
    <>
      {/* JSON-LD ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <PageHeader
        title={`Top 10 ${categoryLabel} in ${provinceName}`}
        subtitle={
          <span className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-cpYellow" />
            {tProvince("ranking", { year: currentYear })}
          </span>
        }
        icon={<span className="text-3xl">{categoryIcon}</span>}
        variant="gradient-pink"
        breadcrumbs={[
          { label: t("directory"), href: `/${locale}` },
          { label: countryName, href: `/${locale}/${countrySlug}` },
          { label: provinceName, href: `/${locale}/${countrySlug}/p/${provinceSlug}` },
          { label: categoryLabel, href: `/${locale}/${countrySlug}/p/${provinceSlug}/c/${categorySlug}` },
          { label: t("top10") },
        ]}
      />

      {/* AI-Generated Intro Content */}
      <section className="bg-gradient-to-b from-cpCoral/10 to-white dark:from-cpCoral/5 dark:to-cpCharcoal border-b dark:border-cpAmber/20">
        <div className="container mx-auto max-w-6xl px-4 py-6">
          <p className="text-slate-700 dark:text-cpCream/90 mb-2">{content.intro}</p>
          {content.secondary && (
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">{content.secondary}</p>
          )}
        </div>
      </section>

      {/* Top 10 List */}
      <section className="container mx-auto max-w-4xl px-4 py-8 dark:bg-cpCharcoal">
        {places.length > 0 ? (
          <div className="space-y-6">
            {places.map((place, index) => (
              <article
                key={place.id}
                className={`relative bg-white dark:bg-cpCharcoal/80 rounded-xl border-2 ${
                  index === 0
                    ? "border-cpYellow shadow-lg dark:shadow-cpYellow/10"
                    : index < 3
                    ? "border-cpCoral/30 dark:border-cpCoral/40"
                    : "border-slate-200 dark:border-cpAmber/20"
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
                      : "bg-slate-200 dark:bg-cpAmber/20 text-slate-600 dark:text-cpCream"
                  } font-bold text-lg rounded-br-xl`}
                >
                  #{index + 1}
                </div>

                <div className="p-6 pl-20">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <Link
                        href={`/${locale}/${countrySlug}/p/${provinceSlug}/${getCitySlug(place)}/${categorySlug}/${place.slug}`}
                        className="text-xl font-bold text-slate-900 dark:text-cpCream hover:text-cpCoral dark:hover:text-cpCoral transition-colors"
                      >
                        {place.name}
                      </Link>

                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground dark:text-cpCream/70">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {getCityName(place)}, {provinceName}
                        </span>
                      </div>

                      {place.description && (
                        <p className="mt-3 text-slate-600 dark:text-cpCream/80 line-clamp-2">
                          {place.description}
                        </p>
                      )}

                      {/* Quick Stats */}
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-5 w-5 text-cpYellow fill-current" />
                          <span className="font-semibold dark:text-cpCream">
                            {place.avgRating ? parseFloat(place.avgRating).toFixed(1) : "N/A"}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground dark:text-cpCream/70">
                          {place.reviewCount || 0} {t("reviews")}
                        </span>
                      </div>
                    </div>

                    {/* View Button */}
                    <Link
                      href={`/${locale}/${countrySlug}/p/${provinceSlug}/${getCitySlug(place)}/${categorySlug}/${place.slug}`}
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
            <span className="text-6xl block mb-4">&#127942;</span>
            <h2 className="text-xl font-semibold mb-2 dark:text-cpCream">{t("noRankingAvailable")}</h2>
            <p className="text-muted-foreground dark:text-cpCream/70">
              {t("notEnoughReviews", { category: categoryLabel.toLowerCase(), location: provinceName })}
            </p>
          </div>
        )}
      </section>

      {/* Ranking Methodology */}
      <section className="bg-muted/50 dark:bg-cpCharcoal/80 py-8 border-t dark:border-cpAmber/20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center text-sm text-muted-foreground dark:text-cpCream/70">
            <p>{tProvince("rankingMethodology")}</p>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="bg-slate-50 dark:bg-cpCharcoal py-12 border-t dark:border-cpAmber/20">
        <div className="container mx-auto max-w-6xl px-4">
          <SectionHeader title={t("exploreMore")} />
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-cpCoral/10 dark:border-cpAmber/30 dark:text-cpCream dark:hover:bg-cpCoral/20"
            >
              <a href={`/${locale}/${countrySlug}/p/${provinceSlug}/c/${categorySlug}`}>
                {t("allIn", { category: categoryLabel, location: provinceName })}
              </a>
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-cpCoral/10 dark:border-cpAmber/30 dark:text-cpCream dark:hover:bg-cpCoral/20"
            >
              <a href={`/${locale}/${countrySlug}/p/${provinceSlug}`}>
                {t("allServices", { location: provinceName })}
              </a>
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-cpCoral/10 dark:border-cpAmber/30 dark:text-cpCream dark:hover:bg-cpCoral/20"
            >
              <a href={`/${locale}/${countrySlug}/top/${categorySlug}`}>
                {tProvince("topInCountry", { category: categoryLabel, country: countryName })}
              </a>
            </Badge>
          </div>
        </div>
      </section>
    </>
  );
}
