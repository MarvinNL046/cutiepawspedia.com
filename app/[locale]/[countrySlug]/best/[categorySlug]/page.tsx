/**
 * Best in Country Page - Top-rated places in a category within a country
 *
 * Route: /{locale}/{countrySlug}/best/{categorySlug}
 * Example: /nl/netherlands/best/veterinary
 *
 * CACHING STRATEGY: Static + ISR (Incremental Static Regeneration)
 * - revalidate: 600s (10 minutes) - Rankings update less frequently
 * - SEO-optimized for "Best {CategoryName} in {CountryName}"
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
import { PlaceCard, getCategoryIcon } from "@/components/directory";
import { getCityName, getCitySlug } from "@/lib/utils/place-helpers";
import { PageHeader, SectionHeader } from "@/components/layout";
import { Star, Award, TrendingUp } from "lucide-react";
import {
  DEFAULT_SEO_CONFIG,
  buildAlternateUrls,
  buildCanonicalUrl,
  itemListSchema,
  getLocalizedCategoryName,
  type ContentLocale,
} from "@/lib/seo";
import { generateContent } from "@/lib/ai/generateContent";

interface BestInCountryPageProps {
  params: Promise<{ locale: string; countrySlug: string; categorySlug: string }>;
}

// ISR: Rankings data, 10-minute revalidation
export const revalidate = 600;

// Pre-generate pages for all country/category combinations
export async function generateStaticParams() {
  const [countries, categories] = await Promise.all([
    getCountries(),
    getCategories(),
  ]);

  const params: { locale: string; countrySlug: string; categorySlug: string }[] = [];
  const locales = DEFAULT_SEO_CONFIG.supportedLocales;

  for (const locale of locales) {
    for (const country of countries) {
      for (const category of categories) {
        params.push({
          locale,
          countrySlug: country.slug,
          categorySlug: category.slug,
        });
      }
    }
  }

  return params;
}

export async function generateMetadata({ params }: BestInCountryPageProps): Promise<Metadata> {
  const { locale, countrySlug, categorySlug } = await params;

  const [country, category, places] = await Promise.all([
    getCountryBySlug(countrySlug),
    getCategoryBySlug(categorySlug),
    getTopPlacesByCountrySlugAndCategorySlug(countrySlug, categorySlug, 20),
  ]);

  if (!country || !category) {
    return {
      title: `Best ${categorySlug.replace(/-/g, " ")} in ${countrySlug.replace(/-/g, " ")}`.replace(/\b\w/g, (c) => c.toUpperCase()),
    };
  }

  const categoryLabel = getLocalizedCategoryName(categorySlug, locale as ContentLocale);

  // Generate AI-driven content (cached or generated on demand)
  const { content } = await generateContent({
    type: "best",
    locale: locale as ContentLocale,
    data: {
      categoryName: categoryLabel,
      categorySlug,
      countryName: country.name,
      countrySlug,
      totalRanked: places.length,
      highlightedPlaces: places.slice(0, 5).map((p) => ({
        name: p.name,
        rating: p.avgRating ? parseFloat(p.avgRating) : undefined,
        reviewCount: p.reviewCount || undefined,
        cityName: (() => { const city = Array.isArray(p.city) ? p.city[0] : p.city; return city?.name; })(),
      })),
    },
  });

  const title = locale === "nl"
    ? `Beste ${categoryLabel} in ${country.name} | CutiePawsPedia`
    : `Best ${categoryLabel} in ${country.name} | CutiePawsPedia`;

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
      `beste ${categoryLabel.toLowerCase()} ${country.name}`,
      `top ${categoryLabel.toLowerCase()} ${country.name}`,
      `${categorySlug} ${country.name} reviews`,
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
      url: `${DEFAULT_SEO_CONFIG.siteName}/${locale}/${countrySlug}/best/${categorySlug}`,
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

export default async function BestInCountryPage({ params }: BestInCountryPageProps) {
  const { locale, countrySlug, categorySlug } = await params;

  const [country, category, places] = await Promise.all([
    getCountryBySlug(countrySlug),
    getCategoryBySlug(categorySlug),
    getTopPlacesByCountrySlugAndCategorySlug(countrySlug, categorySlug, 20),
  ]);

  if (!country || !category) {
    notFound();
  }

  const countryName = country.name;
  const categoryLabel = getLocalizedCategoryName(categorySlug, locale as ContentLocale);
  const categoryIcon = getCategoryIcon(category.icon || categorySlug);

  // Generate AI-driven content for the page (cached or generated on demand)
  const { content } = await generateContent({
    type: "best",
    locale: locale as ContentLocale,
    data: {
      categoryName: categoryLabel,
      categorySlug,
      countryName,
      countrySlug,
      totalRanked: places.length,
      highlightedPlaces: places.slice(0, 5).map((p) => ({
        name: p.name,
        rating: p.avgRating ? parseFloat(p.avgRating) : undefined,
        reviewCount: p.reviewCount || undefined,
        cityName: (() => { const city = Array.isArray(p.city) ? p.city[0] : p.city; return city?.name; })(),
      })),
    },
  });

  // Generate JSON-LD ItemList for rankings
  const itemListJsonLd = itemListSchema(
    places.map((place, index) => ({
      name: place.name,
      url: `/${locale}/${countrySlug}/${getCitySlug(place)}/${categorySlug}/${place.slug}`,
      position: index + 1,
      description: place.description || undefined,
    })),
    `Best ${categoryLabel} in ${countryName}`
  );

  return (
    <>
      {/* JSON-LD ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <PageHeader
        title={locale === "nl" ? `Beste ${categoryLabel} in ${countryName}` : `Best ${categoryLabel} in ${countryName}`}
        subtitle={
          <span className="flex items-center gap-2">
            <Award className="h-5 w-5 text-cpYellow" />
            {locale === "nl"
              ? `Top ${places.length} gesorteerd op reviews`
              : `Top ${places.length} sorted by reviews`}
          </span>
        }
        icon={<span className="text-3xl">{categoryIcon}</span>}
        variant="gradient-yellow"
        breadcrumbs={[
          { label: "Directory", href: `/${locale}` },
          { label: countryName, href: `/${locale}/${countrySlug}` },
          { label: categoryLabel, href: `/${locale}/${countrySlug}/c/${categorySlug}` },
          { label: locale === "nl" ? "Beste" : "Best" },
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
              {locale === "nl"
                ? "Ranking gebaseerd op gemiddelde beoordelingen en aantal reviews."
                : "Ranking based on average ratings and number of reviews."}
            </span>
          </div>
        </div>
      </section>

      {/* Ranked Places List */}
      <section className="container mx-auto max-w-6xl px-4 py-8">
        {places.length > 0 ? (
          <div className="space-y-4">
            {places.map((place, index) => (
              <div
                key={place.id}
                className="flex items-start gap-4 p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
              >
                {/* Rank Badge */}
                <div className="flex-shrink-0">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                      index === 0
                        ? "bg-cpYellow"
                        : index === 1
                        ? "bg-slate-400"
                        : index === 2
                        ? "bg-amber-600"
                        : "bg-slate-300"
                    }`}
                  >
                    {index + 1}
                  </div>
                </div>

                {/* Place Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <a
                      href={`/${locale}/${countrySlug}/${getCitySlug(place)}/${categorySlug}/${place.slug}`}
                      className="font-semibold text-lg hover:text-cpCoral transition-colors truncate"
                    >
                      {place.name}
                    </a>
                    {index < 3 && (
                      <Badge variant="secondary" className="bg-cpYellow/20 text-cpYellow">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        {locale === "nl" ? "Top Keuze" : "Top Pick"}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {getCityName(place)}, {countryName}
                  </p>
                  {place.description && (
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {place.description}
                    </p>
                  )}
                </div>

                {/* Rating */}
                <div className="flex-shrink-0 text-right">
                  <div className="flex items-center gap-1 text-cpYellow">
                    <Star className="h-5 w-5 fill-current" />
                    <span className="font-bold text-lg">
                      {place.avgRating ? parseFloat(place.avgRating).toFixed(1) : "N/A"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {place.reviewCount || 0} reviews
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <span className="text-6xl block mb-4">🔍</span>
            <h2 className="text-xl font-semibold mb-2">
              {locale === "nl" ? "Geen resultaten gevonden" : "No results found"}
            </h2>
            <p className="text-muted-foreground">
              {locale === "nl"
                ? `Er zijn nog geen ${categoryLabel.toLowerCase()} in ${countryName} met reviews.`
                : `No ${categoryLabel.toLowerCase()} in ${countryName} have reviews yet.`}
            </p>
          </div>
        )}
      </section>

      {/* Related Links */}
      <section className="bg-slate-50 py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <SectionHeader title={locale === "nl" ? "Bekijk ook" : "See also"} />
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-cpCoral/10">
              <a href={`/${locale}/${countrySlug}/c/${categorySlug}`}>
                {locale === "nl" ? `Alle ${categoryLabel} in ${countryName}` : `All ${categoryLabel} in ${countryName}`}
              </a>
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-cpCoral/10">
              <a href={`/${locale}/${countrySlug}/top/${categorySlug}`}>
                {locale === "nl" ? `Top 10 ${categoryLabel}` : `Top 10 ${categoryLabel}`}
              </a>
            </Badge>
          </div>
        </div>
      </section>
    </>
  );
}

