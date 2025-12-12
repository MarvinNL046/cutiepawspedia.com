/**
 * Country Map Page - Interactive map showing all pet services in a country
 *
 * Route: /{locale}/{countrySlug}/map
 * Example: /nl/netherlands/map
 *
 * CACHING STRATEGY: Static + ISR (Incremental Static Regeneration)
 * - revalidate: 600s (10 minutes) - Map data can change with new businesses
 * - SEO-optimized for "Map: Pet Services in {CountryName}"
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCountries,
  getCountryBySlug,
} from "@/db/queries";
import {
  getPlacesWithCoordinatesByCountry,
  getCountryCenter,
  getCategoriesWithPlacesInCountry,
} from "@/db/queries/map";
import { PageHeader } from "@/components/layout";
import { MapView } from "@/components/map";
import {
  DEFAULT_SEO_CONFIG,
  buildCanonicalUrl,
  buildAlternateUrls,
  getLocalesForCountry,
  getLocalizedCategoryName,
  type ContentLocale,
} from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { Map as MapIcon } from "lucide-react";
import { getCountryFlag } from "@/components/directory";

interface CountryMapPageProps {
  params: Promise<{ locale: string; countrySlug: string }>;
}

// ISR: Map data, 10-minute revalidation
export const revalidate = 600;

// Pre-generate pages for all countries with relevant locales
export async function generateStaticParams() {
  const countries = await getCountries();

  const params: { locale: string; countrySlug: string }[] = [];

  for (const country of countries) {
    const countryLocales = getLocalesForCountry(country.slug);
    for (const locale of countryLocales) {
      params.push({
        locale,
        countrySlug: country.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: CountryMapPageProps): Promise<Metadata> {
  const { locale, countrySlug } = await params;

  const country = await getCountryBySlug(countrySlug);

  if (!country) {
    return {
      title: `Map: Pet Services in ${countrySlug.replace(/-/g, " ")}`.replace(/\b\w/g, (c) => c.toUpperCase()),
    };
  }

  const t = await getTranslations({ locale, namespace: "mapPages" });

  const title = t("countryMapTitle", { country: country.name });
  const description = t("countryMapDescription", { country: country.name });

  const canonicalUrl = buildCanonicalUrl({
    locale,
    countrySlug,
    additionalPath: "map",
  });

  return {
    title: `${title} | CutiePawsPedia`,
    description,
    keywords: [
      t("mapKeywords.petServicesMap", { location: country.name }),
      t("mapKeywords.findPetServices", { location: country.name }),
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternateUrls(
        { locale, countrySlug, additionalPath: "map" },
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

export default async function CountryMapPage({ params }: CountryMapPageProps) {
  const { locale, countrySlug } = await params;
  const t = await getTranslations("mapPages");

  const [country, places, center, categoriesWithPlaces] = await Promise.all([
    getCountryBySlug(countrySlug),
    getPlacesWithCoordinatesByCountry(countrySlug, { limit: 500 }),
    getCountryCenter(countrySlug),
    getCategoriesWithPlacesInCountry(countrySlug),
  ]);

  if (!country) {
    notFound();
  }

  const countryName = country.name;
  const countryCode = country.code || "XX";

  // Localize category labels
  const localizedCategories = categoriesWithPlaces.map((cat) => ({
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
    name: t("countryMapTitle", { country: countryName }),
    description: t("countryMapDescription", { country: countryName }),
    url: `${DEFAULT_SEO_CONFIG.baseUrl}/${locale}/${countrySlug}/map`,
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
        title={t("countryMapTitle", { country: countryName })}
        subtitle={t("placesOnMap", { count: places.length })}
        icon={<MapIcon className="h-8 w-8 text-cpTeal" />}
        variant="gradient-aqua"
        breadcrumbs={[
          { label: t("directory"), href: `/${locale}` },
          { label: countryName, href: `/${locale}/${countrySlug}` },
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
          categories={localizedCategories}
          translations={mapTranslations}
          className="rounded-none sm:rounded-xl overflow-hidden shadow-lg"
        />
      </section>

      {/* SEO Text Section */}
      <section className="bg-muted/50 dark:bg-cpCharcoal/80 py-8 border-t border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-xl font-semibold text-foreground dark:text-cpCream mb-4">
            {t("exploreOnMap", { location: countryName })}
          </h2>
          <p className="text-muted-foreground dark:text-cpCream/70 mb-4">
            {t("mapDescription", { count: places.length, location: countryName })}
          </p>
          <div className="flex flex-wrap gap-2">
            {localizedCategories.slice(0, 6).map((cat) => (
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
