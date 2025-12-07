/**
 * National Category Page - Lists all places in a category within a country
 *
 * Route: /{locale}/{countrySlug}/c/{categorySlug}
 * Example: /nl/netherlands/c/veterinary
 *
 * CACHING STRATEGY: Static + ISR (Incremental Static Regeneration)
 * - revalidate: 600s (10 minutes) - Country-level data changes less frequently
 * - SEO-optimized for "{CategoryName} in {CountryName}"
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getCountries,
  getCategories,
  getCountryBySlug,
  getCategoryBySlug,
  getPlacesByCountrySlugAndCategorySlug,
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

interface CountryCategoryPageProps {
  params: Promise<{ locale: string; countrySlug: string; categorySlug: string }>;
}

// ISR: Country-level data, 10-minute revalidation
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

export async function generateMetadata({ params }: CountryCategoryPageProps): Promise<Metadata> {
  const { locale, countrySlug, categorySlug } = await params;

  const [country, category, places] = await Promise.all([
    getCountryBySlug(countrySlug),
    getCategoryBySlug(categorySlug),
    getPlacesByCountrySlugAndCategorySlug(countrySlug, categorySlug, { limit: 50 }),
  ]);

  if (!country || !category) {
    return {
      title: `${categorySlug.replace(/-/g, " ")} in ${countrySlug.replace(/-/g, " ")}`.replace(/\b\w/g, (c) => c.toUpperCase()),
    };
  }

  const categoryLabel = getLocalizedCategoryName(categorySlug, locale as ContentLocale);

  // Count unique cities
  const uniqueCities = new Set(places.map((p) => { const city = Array.isArray(p.city) ? p.city[0] : p.city; return city?.slug; }).filter(Boolean));

  // Generate AI-driven content (cached or generated on demand)
  const { content } = await generateContent({
    type: "category",
    locale: locale as ContentLocale,
    data: {
      categoryName: categoryLabel,
      categorySlug,
      countryName: country.name,
      countrySlug,
      totalPlaces: places.length,
      totalCities: uniqueCities.size,
    },
  });

  const title = locale === "nl"
    ? `${categoryLabel} in ${country.name} | CutiePawsPedia`
    : `${categoryLabel} in ${country.name} | CutiePawsPedia`;

  const canonicalUrl = buildCanonicalUrl({
    locale,
    countrySlug,
    categorySlug,
  });

  return {
    title,
    description: content.metaDescription,
    keywords: [
      `${categoryLabel.toLowerCase()} ${country.name}`,
      `beste ${categoryLabel.toLowerCase()} ${country.name}`,
      `${categorySlug} ${country.name}`,
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
      url: canonicalUrl,
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

export default async function CountryCategoryPage({ params }: CountryCategoryPageProps) {
  const { locale, countrySlug, categorySlug } = await params;

  const [country, category, places] = await Promise.all([
    getCountryBySlug(countrySlug),
    getCategoryBySlug(categorySlug),
    getPlacesByCountrySlugAndCategorySlug(countrySlug, categorySlug, { limit: 50, premiumFirst: true }),
  ]);

  if (!country || !category) {
    notFound();
  }

  const countryName = country.name;
  const categoryLabel = getLocalizedCategoryName(categorySlug, locale as ContentLocale);
  const categoryIcon = getCategoryIcon(category.icon || categorySlug);

  // Count unique cities for content generation
  const uniqueCities = new Set(places.map((p) => { const city = Array.isArray(p.city) ? p.city[0] : p.city; return city?.slug; }).filter(Boolean));

  // Generate AI-driven content for the page (cached or generated on demand)
  const { content } = await generateContent({
    type: "category",
    locale: locale as ContentLocale,
    data: {
      categoryName: categoryLabel,
      categorySlug,
      countryName,
      countrySlug,
      totalPlaces: places.length,
      totalCities: uniqueCities.size,
    },
  });

  // Generate JSON-LD ItemList
  const itemListJsonLd = itemListSchema(
    places.map((place, index) => ({
      name: place.name,
      url: `/${locale}/${countrySlug}/${(() => { const city = Array.isArray(place.city) ? place.city[0] : place.city; return city?.slug || ""; })()}/${categorySlug}/${place.slug}`,
      position: index + 1,
      description: place.description || undefined,
    })),
    `${categoryLabel} in ${countryName}`
  );

  return (
    <>
      {/* JSON-LD ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <PageHeader
        title={`${categoryLabel} in ${countryName}`}
        subtitle={`${places.length} ${locale === "nl" ? "locaties gevonden" : "locations found"}`}
        icon={<span className="text-3xl">{categoryIcon}</span>}
        variant="gradient-aqua"
        breadcrumbs={[
          { label: "Directory", href: `/${locale}` },
          { label: countryName, href: `/${locale}/${countrySlug}` },
          { label: categoryLabel },
        ]}
      />

      {/* AI-Generated Intro Content */}
      <section className="bg-gradient-to-b from-cpAqua/10 to-white border-b">
        <div className="container mx-auto max-w-6xl px-4 py-6">
          <p className="text-slate-700 mb-2">{content.intro}</p>
          {content.secondary && (
            <p className="text-sm text-muted-foreground">{content.secondary}</p>
          )}
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-16 z-40 bg-white border-b shadow-sm">
        <div className="container mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                {locale === "nl" ? "Filters" : "Filters"}
              </Button>
              <Badge variant="secondary" className="hidden sm:inline-flex gap-1">
                <MapPin className="h-3 w-3" />
                {locale === "nl" ? "Landelijk" : "Nationwide"}
              </Badge>
            </div>
            <Button variant="ghost" size="sm" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              {locale === "nl" ? "Sorteren" : "Sort"}
            </Button>
          </div>
        </div>
      </section>

      {/* Places Grid */}
      <section className="container mx-auto max-w-6xl px-4 py-8">
        {places.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {places.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                locale={locale}
                countrySlug={countrySlug}
                citySlug={(() => { const city = Array.isArray(place.city) ? place.city[0] : place.city; return city?.slug || ""; })()}
                categorySlug={categorySlug}
              />
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
                ? `Er zijn nog geen ${categoryLabel.toLowerCase()} in ${countryName} geregistreerd.`
                : `No ${categoryLabel.toLowerCase()} have been registered in ${countryName} yet.`}
            </p>
          </div>
        )}
      </section>

      {/* Related Links */}
      <section className="bg-slate-50 py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <SectionHeader
            title={locale === "nl" ? "Bekijk ook" : "See also"}
          />
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-cpCoral/10">
              <a href={`/${locale}/${countrySlug}/best/${categorySlug}`}>
                {locale === "nl" ? `Beste ${categoryLabel} in ${countryName}` : `Best ${categoryLabel} in ${countryName}`}
              </a>
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-cpCoral/10">
              <a href={`/${locale}/${countrySlug}/top/${categorySlug}`}>
                {locale === "nl" ? `Top 10 ${categoryLabel} in ${countryName}` : `Top 10 ${categoryLabel} in ${countryName}`}
              </a>
            </Badge>
          </div>
        </div>
      </section>
    </>
  );
}

