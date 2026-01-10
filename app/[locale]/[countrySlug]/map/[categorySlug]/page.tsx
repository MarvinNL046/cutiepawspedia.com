/**
 * Country Category Map Page - Interactive map showing places of a specific category in a country
 *
 * Route: /{locale}/{countrySlug}/map/{categorySlug}
 * Example: /nl/netherlands/map/veterinary
 *
 * CACHING STRATEGY: Static + ISR (Incremental Static Regeneration)
 * - revalidate: 600s (10 minutes) - Map data can change with new businesses
 * - SEO-optimized for "Map: {CategoryName} in {CountryName}"
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCountryBySlug,
  getCategoryBySlug,
} from "@/db/queries";
import {
  getPlacesWithCoordinatesByCountry,
  getCountryCenter,
  getCategoriesWithPlacesInCountry,
} from "@/db/queries/map";
import { PageHeader } from "@/components/layout";
import { MapView } from "@/components/map";
import { getCategoryIcon } from "@/components/directory";
import {
  DEFAULT_SEO_CONFIG,
  buildCanonicalUrl,
  buildAlternateUrls,
  getLocalizedCategoryName,
  type ContentLocale,
} from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { Map as MapIcon } from "lucide-react";

interface CountryCategoryMapPageProps {
  params: Promise<{ locale: string; countrySlug: string; categorySlug: string }>;
}

// ISR: Optimized to 1 hour to reduce Vercel costs (was 600s)
// Pages are generated on-demand and cached - no static generation to avoid build timeouts
export const revalidate = 3600;

export async function generateMetadata({ params }: CountryCategoryMapPageProps): Promise<Metadata> {
  const { locale, countrySlug, categorySlug } = await params;

  const [country, category] = await Promise.all([
    getCountryBySlug(countrySlug),
    getCategoryBySlug(categorySlug),
  ]);

  if (!country || !category) {
    return {
      title: `Map: ${categorySlug.replace(/-/g, " ")} in ${countrySlug.replace(/-/g, " ")}`.replace(/\b\w/g, (c) => c.toUpperCase()),
    };
  }

  const t = await getTranslations({ locale, namespace: "mapPages" });
  const categoryLabel = getLocalizedCategoryName(categorySlug, locale as ContentLocale);

  const title = t("countryCategoryMapTitle", { category: categoryLabel, country: country.name });
  const description = t("countryCategoryMapDescription", { category: categoryLabel, country: country.name });

  const canonicalUrl = buildCanonicalUrl({
    locale,
    countrySlug,
    additionalPath: `map/${categorySlug}`,
  });

  return {
    title: `${title} | CutiePawsPedia`,
    description,
    keywords: [
      t("mapKeywords.categoryMap", { category: categoryLabel, location: country.name }),
      t("mapKeywords.findCategory", { category: categoryLabel, location: country.name }),
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternateUrls(
        { locale, countrySlug, additionalPath: `map/${categorySlug}` },
        DEFAULT_SEO_CONFIG.supportedLocales
      ),
    },
    openGraph: {
      title: `${title} | CutiePawsPedia`,
      description,
      url: canonicalUrl,
      siteName: DEFAULT_SEO_CONFIG.siteName,
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | CutiePawsPedia`,
      description,
    },
  };
}

export default async function CountryCategoryMapPage({ params }: CountryCategoryMapPageProps) {
  const { locale, countrySlug, categorySlug } = await params;
  const t = await getTranslations("mapPages");

  const [country, category, places, center, allCategories] = await Promise.all([
    getCountryBySlug(countrySlug),
    getCategoryBySlug(categorySlug),
    getPlacesWithCoordinatesByCountry(countrySlug, { categorySlug, limit: 500 }),
    getCountryCenter(countrySlug),
    getCategoriesWithPlacesInCountry(countrySlug),
  ]);

  if (!country || !category) {
    notFound();
  }

  const countryName = country.name;
  const categoryLabel = getLocalizedCategoryName(categorySlug, locale as ContentLocale);
  const categoryIcon = getCategoryIcon(category.icon || categorySlug);

  // Localize category labels
  const localizedCategories = allCategories.map((cat) => ({
    ...cat,
    labelKey: getLocalizedCategoryName(cat.slug, locale as ContentLocale),
  }));

  // Map translations
  const mapTranslations = {
    allCategories: t("allCategories"),
    searchPlaceholder: t("searchPlaceholder"),
    findNearMe: t("findNearMe"),
    noResults: t("noResults"),
    places: t("places"),
    reviews: t("reviews"),
    viewDetails: t("viewDetails"),
    listView: t("listView"),
    mapView: t("mapView"),
    zoomIn: t("zoomIn"),
    zoomOut: t("zoomOut"),
    resetView: t("resetView"),
    premium: t("premium"),
  };

  // JSON-LD for map page with geo coordinates
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t("countryCategoryMapTitle", { category: categoryLabel, country: countryName }),
    description: t("countryCategoryMapDescription", { category: categoryLabel, country: countryName }),
    url: `${DEFAULT_SEO_CONFIG.baseUrl}/${locale}/${countrySlug}/map/${categorySlug}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: places.slice(0, 20).map((place, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "LocalBusiness",
          name: place.name,
          address: place.address || undefined,
          geo: {
            "@type": "GeoCoordinates",
            latitude: place.lat,
            longitude: place.lng,
          },
          aggregateRating: place.avgRating && Number(place.avgRating) > 0
            ? {
                "@type": "AggregateRating",
                ratingValue: place.avgRating,
                reviewCount: place.reviewCount,
              }
            : undefined,
        },
      })),
    },
    isPartOf: {
      "@type": "WebSite",
      name: DEFAULT_SEO_CONFIG.siteName,
      url: DEFAULT_SEO_CONFIG.baseUrl,
    },
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader
        title={t("countryCategoryMapTitle", { category: categoryLabel, country: countryName })}
        subtitle={t("placesOnMap", { count: places.length })}
        icon={<span className="text-3xl">{categoryIcon}</span>}
        variant="gradient-yellow"
        breadcrumbs={[
          { label: t("directory"), href: `/${locale}` },
          { label: countryName, href: `/${locale}/${countrySlug}` },
          { label: categoryLabel, href: `/${locale}/${countrySlug}/c/${categorySlug}` },
          { label: t("map") },
        ]}
      />

      {/* Map Section */}
      <section className="container mx-auto max-w-7xl px-0 sm:px-4 py-4">
        <MapView
          markers={places}
          center={center || undefined}
          zoom={7}
          locale={locale}
          countrySlug={countrySlug}
          categorySlug={categorySlug}
          categories={localizedCategories}
          selectedCategorySlug={categorySlug}
          translations={mapTranslations}
          className="rounded-none sm:rounded-xl overflow-hidden shadow-lg"
        />
      </section>

      {/* SEO Text Section */}
      <section className="bg-muted/50 dark:bg-cpCharcoal/80 py-8 border-t border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-xl font-semibold text-foreground dark:text-cpCream mb-4">
            {t("exploreCategory", { category: categoryLabel, location: countryName })}
          </h2>
          <p className="text-muted-foreground dark:text-cpCream/70 mb-4">
            {t("categoryMapDescription", { count: places.length, category: categoryLabel, location: countryName })}
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href={`/${locale}/${countrySlug}/map`}
              className="inline-flex items-center gap-1 px-3 py-1 bg-background dark:bg-cpCharcoal border border-border dark:border-cpAmber/30 rounded-full text-sm text-foreground dark:text-cpCream hover:border-cpCoral dark:hover:border-cpCoral transition-colors"
            >
              {t("allCategories")}
            </a>
            {localizedCategories
              .filter((cat) => cat.slug !== categorySlug)
              .slice(0, 5)
              .map((cat) => (
                <a
                  key={cat.slug}
                  href={`/${locale}/${countrySlug}/map/${cat.slug}`}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-background dark:bg-cpCharcoal border border-border dark:border-cpAmber/30 rounded-full text-sm text-foreground dark:text-cpCream hover:border-cpCoral dark:hover:border-cpCoral transition-colors"
                >
                  {cat.labelKey}
                  <span className="text-muted-foreground dark:text-cpCream/60">({cat.count})</span>
                </a>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
