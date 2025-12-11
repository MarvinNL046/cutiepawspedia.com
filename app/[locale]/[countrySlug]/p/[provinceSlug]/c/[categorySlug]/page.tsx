/**
 * Province Category Page - Lists all places in a category within a province
 *
 * Route: /{locale}/{countrySlug}/p/{provinceSlug}/c/{categorySlug}
 * Example: /nl/netherlands/p/noord-holland/c/veterinary
 *
 * CACHING STRATEGY: Static + ISR (Incremental Static Regeneration)
 * - revalidate: 600s (10 minutes) - Province-level data changes less frequently
 * - SEO-optimized for "{CategoryName} in {ProvinceName}"
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getCategories,
  getCountryBySlug,
  getCategoryBySlug,
  getProvinceBySlugAndCountry,
  getPlacesByProvinceSlugAndCategorySlug,
} from "@/db/queries";
import { PlaceCard, getCategoryIcon } from "@/components/directory";
import { PageHeader, SectionHeader } from "@/components/layout";
import { Filter, SlidersHorizontal, MapPin } from "lucide-react";
import {
  DEFAULT_SEO_CONFIG,
  buildAlternateUrls,
  buildCanonicalUrl,
  itemListSchema,
  getLocalizedCategoryName,
  type ContentLocale,
} from "@/lib/seo";
import { generateContent } from "@/lib/ai/generateContent";

interface ProvinceCategoryPageProps {
  params: Promise<{
    locale: string;
    countrySlug: string;
    provinceSlug: string;
    categorySlug: string;
  }>;
}

// ISR: Province-level data, 10-minute revalidation
export const revalidate = 600;

export async function generateMetadata({ params }: ProvinceCategoryPageProps): Promise<Metadata> {
  const { locale, countrySlug, provinceSlug, categorySlug } = await params;

  const [country, province, category, places] = await Promise.all([
    getCountryBySlug(countrySlug),
    getProvinceBySlugAndCountry(provinceSlug, countrySlug),
    getCategoryBySlug(categorySlug),
    getPlacesByProvinceSlugAndCategorySlug(provinceSlug, countrySlug, categorySlug, { limit: 50 }),
  ]);

  if (!country || !province || !category) {
    return {
      title: `${categorySlug.replace(/-/g, " ")} in ${provinceSlug.replace(/-/g, " ")}`.replace(/\b\w/g, (c) => c.toUpperCase()),
    };
  }

  const categoryLabel = getLocalizedCategoryName(categorySlug, locale as ContentLocale);

  // Count unique cities
  const uniqueCities = new Set(places.map((p) => {
    const city = Array.isArray(p.city) ? p.city[0] : p.city;
    return city?.slug;
  }).filter(Boolean));

  const title = locale === "nl"
    ? `${categoryLabel} in ${province.name}, ${country.name} | CutiePawsPedia`
    : `${categoryLabel} in ${province.name}, ${country.name} | CutiePawsPedia`;

  const description = locale === "nl"
    ? `Vind de beste ${categoryLabel.toLowerCase()} in ${province.name}. ${places.length} locaties in ${uniqueCities.size} steden.`
    : `Find the best ${categoryLabel.toLowerCase()} in ${province.name}. ${places.length} locations in ${uniqueCities.size} cities.`;

  const canonicalUrl = buildCanonicalUrl({
    locale,
    countrySlug,
    provinceSlug,
    categorySlug,
  });

  return {
    title,
    description,
    keywords: [
      `${categoryLabel.toLowerCase()} ${province.name}`,
      `beste ${categoryLabel.toLowerCase()} ${province.name}`,
      `${categorySlug} ${province.name}`,
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
      description,
      url: canonicalUrl,
      siteName: DEFAULT_SEO_CONFIG.siteName,
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ProvinceCategoryPage({ params }: ProvinceCategoryPageProps) {
  const { locale, countrySlug, provinceSlug, categorySlug } = await params;

  const [country, province, category, places] = await Promise.all([
    getCountryBySlug(countrySlug),
    getProvinceBySlugAndCountry(provinceSlug, countrySlug),
    getCategoryBySlug(categorySlug),
    getPlacesByProvinceSlugAndCategorySlug(provinceSlug, countrySlug, categorySlug, { limit: 50, premiumFirst: true }),
  ]);

  if (!country || !province || !category) {
    notFound();
  }

  const countryName = country.name;
  const provinceName = province.name;
  const categoryLabel = getLocalizedCategoryName(categorySlug, locale as ContentLocale);
  const categoryIcon = getCategoryIcon(category.icon || categorySlug);

  // Count unique cities for content generation
  const uniqueCities = new Set(places.map((p) => {
    const city = Array.isArray(p.city) ? p.city[0] : p.city;
    return city?.slug;
  }).filter(Boolean));

  // Generate JSON-LD ItemList
  const itemListJsonLd = itemListSchema(
    places.map((place, index) => {
      const city = Array.isArray(place.city) ? place.city[0] : place.city;
      const citySlug = city?.slug || "";
      return {
        name: place.name,
        url: `/${locale}/${countrySlug}/p/${provinceSlug}/${citySlug}/${categorySlug}/${place.slug}`,
        position: index + 1,
        description: place.description || undefined,
      };
    }),
    `${categoryLabel} in ${provinceName}`
  );

  const labels = {
    en: {
      directory: "Directory",
      locationsFound: `${places.length} locations found`,
      filters: "Filters",
      sort: "Sort",
      provincial: "Provincial",
      noResults: "No results found",
      noResultsDesc: `No ${categoryLabel.toLowerCase()} have been registered in ${provinceName} yet.`,
      seeAlso: "See also",
      bestIn: `Best ${categoryLabel} in ${provinceName}`,
      allCategories: "All categories",
    },
    nl: {
      directory: "Overzicht",
      locationsFound: `${places.length} locaties gevonden`,
      filters: "Filters",
      sort: "Sorteren",
      provincial: "Provinciaal",
      noResults: "Geen resultaten gevonden",
      noResultsDesc: `Er zijn nog geen ${categoryLabel.toLowerCase()} in ${provinceName} geregistreerd.`,
      seeAlso: "Bekijk ook",
      bestIn: `Beste ${categoryLabel} in ${provinceName}`,
      allCategories: "Alle categorieën",
    },
    de: {
      directory: "Verzeichnis",
      locationsFound: `${places.length} Standorte gefunden`,
      filters: "Filter",
      sort: "Sortieren",
      provincial: "Provinziell",
      noResults: "Keine Ergebnisse gefunden",
      noResultsDesc: `Es sind noch keine ${categoryLabel.toLowerCase()} in ${provinceName} registriert.`,
      seeAlso: "Siehe auch",
      bestIn: `Beste ${categoryLabel} in ${provinceName}`,
      allCategories: "Alle Kategorien",
    },
  };

  const t = labels[locale as keyof typeof labels] || labels.en;

  return (
    <>
      {/* JSON-LD ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <PageHeader
        title={`${categoryLabel} in ${provinceName}`}
        subtitle={t.locationsFound}
        icon={<span className="text-3xl">{categoryIcon}</span>}
        variant="gradient-aqua"
        breadcrumbs={[
          { label: t.directory, href: `/${locale}` },
          { label: countryName, href: `/${locale}/${countrySlug}` },
          { label: provinceName, href: `/${locale}/${countrySlug}/p/${provinceSlug}` },
          { label: categoryLabel },
        ]}
      />

      {/* Intro Section */}
      <section className="bg-gradient-to-b from-cpAqua/10 to-background dark:from-cpAqua/5 dark:to-cpCharcoal border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-6xl px-4 py-6">
          <p className="text-foreground dark:text-cpCream/90">
            {locale === "nl"
              ? `Ontdek de beste ${categoryLabel.toLowerCase()} in ${provinceName}, ${countryName}. Vergelijk ${places.length} locaties verspreid over ${uniqueCities.size} steden.`
              : `Discover the best ${categoryLabel.toLowerCase()} in ${provinceName}, ${countryName}. Compare ${places.length} locations across ${uniqueCities.size} cities.`}
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-16 z-40 bg-background dark:bg-cpCharcoal border-b border-border dark:border-cpAmber/20 shadow-sm">
        <div className="container mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2 dark:border-cpAmber/30 dark:text-cpCream dark:hover:bg-cpAmber/10">
                <Filter className="h-4 w-4" />
                {t.filters}
              </Button>
              <Badge variant="secondary" className="hidden sm:inline-flex gap-1 dark:bg-cpAmber/10 dark:text-cpCream">
                <MapPin className="h-3 w-3" />
                {t.provincial}
              </Badge>
            </div>
            <Button variant="ghost" size="sm" className="gap-2 dark:text-cpCream dark:hover:bg-cpAmber/10">
              <SlidersHorizontal className="h-4 w-4" />
              {t.sort}
            </Button>
          </div>
        </div>
      </section>

      {/* Places Grid */}
      <section className="bg-background dark:bg-cpCharcoal py-8">
        <div className="container mx-auto max-w-6xl px-4">
          {places.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {places.map((place) => {
                const city = Array.isArray(place.city) ? place.city[0] : place.city;
                return (
                  <PlaceCard
                    key={place.id}
                    place={place}
                    locale={locale}
                    countrySlug={countrySlug}
                    citySlug={city?.slug || ""}
                    categorySlug={categorySlug}
                    provinceSlug={provinceSlug}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <span className="text-6xl block mb-4">🔍</span>
              <h2 className="text-xl font-semibold text-foreground dark:text-cpCream mb-2">
                {t.noResults}
              </h2>
              <p className="text-muted-foreground dark:text-cpCream/70">
                {t.noResultsDesc}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Related Links */}
      <section className="bg-muted/50 dark:bg-cpCharcoal/80 py-12 border-t border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-6xl px-4">
          <SectionHeader title={t.seeAlso} />
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-cpCoral/10 dark:border-cpAmber/30 dark:text-cpCream dark:hover:bg-cpCoral/20">
              <a href={`/${locale}/${countrySlug}/p/${provinceSlug}`}>
                {t.allCategories}
              </a>
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-cpCoral/10 dark:border-cpAmber/30 dark:text-cpCream dark:hover:bg-cpCoral/20">
              <a href={`/${locale}/${countrySlug}/c/${categorySlug}`}>
                {categoryLabel} in {countryName}
              </a>
            </Badge>
          </div>
        </div>
      </section>
    </>
  );
}
