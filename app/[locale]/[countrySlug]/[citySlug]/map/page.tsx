/**
 * City Map Page - Interactive map showing all pet services in a city
 *
 * Route: /{locale}/{countrySlug}/{citySlug}/map
 * Example: /nl/netherlands/amsterdam/map
 *
 * CACHING STRATEGY: Static + ISR (Incremental Static Regeneration)
 * - revalidate: 600s (10 minutes) - Map data can change with new businesses
 * - SEO-optimized for "Map: Pet Services in {CityName}"
 */

import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import {
  getCountryBySlug,
  getCityBySlugAndCountry,
} from "@/db/queries";
import {
  getPlacesWithCoordinatesByCity,
  getCityCenter,
} from "@/db/queries/map";
import { PageHeader } from "@/components/layout";
import { MapView } from "@/components/map";
import {
  DEFAULT_SEO_CONFIG,
  buildCanonicalUrl,
  buildAlternateUrls,
  type ContentLocale,
} from "@/lib/seo";
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Map as MapIcon } from "lucide-react";

interface CityMapPageProps {
  params: Promise<{ locale: string; countrySlug: string; citySlug: string }>;
}

// ISR: Optimized to 1 hour to reduce Vercel costs (was 600s)
// Pages are generated on-demand and cached - no static generation to avoid build timeouts
export const revalidate = 86400;

export async function generateMetadata({ params }: CityMapPageProps): Promise<Metadata> {
  const { locale, countrySlug, citySlug } = await params;
  setRequestLocale(locale);

  const [country, city] = await Promise.all([
    getCountryBySlug(countrySlug),
    getCityBySlugAndCountry(citySlug, countrySlug),
  ]);

  if (!country || !city) {
    return {
      title: `Map: Pet Services in ${citySlug.replace(/-/g, " ")}`.replace(/\b\w/g, (c) => c.toUpperCase()),
    };
  }

  const t = await getTranslations({ locale, namespace: "mapPages" });

  const title = t("cityMapTitle", { city: city.name });
  const description = t("cityMapDescription", { city: city.name, country: country.name });

  const canonicalUrl = buildCanonicalUrl({
    locale,
    countrySlug,
    citySlug,
    additionalPath: "map",
  });

  return {
    title: `${title} | CutiePawsPedia`,
    description,
    keywords: [
      t("mapKeywords.petServicesMap", { location: city.name }),
      t("mapKeywords.findPetServices", { location: city.name }),
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternateUrls(
        { locale, countrySlug, citySlug, additionalPath: "map" },
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

export default async function CityMapPage({ params }: CityMapPageProps) {
  const { locale, countrySlug, citySlug } = await params;
  const t = await getTranslations("mapPages");

  const [country, city, places, center] = await Promise.all([
    getCountryBySlug(countrySlug),
    getCityBySlugAndCountry(citySlug, countrySlug),
    getPlacesWithCoordinatesByCity(citySlug, countrySlug, { limit: 500 }),
    getCityCenter(citySlug, countrySlug),
  ]);

  if (!country || !city) {
    notFound();
  }

  // SEO Redirect: If city has a province, redirect to province-aware URL
  const province = Array.isArray(city.province) ? city.province[0] : city.province;
  if (province?.slug) {
    redirect(`/${locale}/${countrySlug}/p/${province.slug}/${citySlug}/map`);
  }

  const countryName = country.name;
  const cityName = city.name;

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
    name: t("cityMapTitle", { city: cityName }),
    description: t("cityMapDescription", { city: cityName, country: countryName }),
    url: `${DEFAULT_SEO_CONFIG.baseUrl}/${locale}/${countrySlug}/${citySlug}/map`,
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
        title={t("cityMapTitle", { city: cityName })}
        subtitle={t("placesOnMap", { count: places.length })}
        icon={<MapIcon className="h-8 w-8 text-cpTeal" />}
        variant="gradient-teal"
        breadcrumbs={[
          { label: t("directory"), href: `/${locale}` },
          { label: countryName, href: `/${locale}/${countrySlug}` },
          { label: cityName, href: `/${locale}/${countrySlug}/${citySlug}` },
          { label: t("map") },
        ]}
      />

      {/* Map Section */}
      <section className="container mx-auto max-w-7xl px-0 sm:px-4 py-4">
        <MapView
          markers={places}
          center={center || undefined}
          zoom={12}
          locale={locale}
          countrySlug={countrySlug}
          translations={mapTranslations}
          className="rounded-none sm:rounded-xl overflow-hidden shadow-lg"
        />
      </section>

      {/* SEO Text Section */}
      <section className="bg-muted/50 dark:bg-cpCharcoal/80 py-8 border-t border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-xl font-semibold text-foreground dark:text-cpCream mb-4">
            {t("exploreOnMap", { location: cityName })}
          </h2>
          <p className="text-muted-foreground dark:text-cpCream/70 mb-4">
            {t("mapDescription", { count: places.length, location: cityName })}
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href={`/${locale}/${countrySlug}/map`}
              className="inline-flex items-center gap-1 px-3 py-1 bg-background dark:bg-cpCharcoal border border-border dark:border-cpAmber/30 rounded-full text-sm text-foreground dark:text-cpCream hover:border-cpCoral dark:hover:border-cpCoral transition-colors"
            >
              {t("viewCountryMap", { country: countryName })}
            </a>
            <a
              href={`/${locale}/${countrySlug}/${citySlug}`}
              className="inline-flex items-center gap-1 px-3 py-1 bg-background dark:bg-cpCharcoal border border-border dark:border-cpAmber/30 rounded-full text-sm text-foreground dark:text-cpCream hover:border-cpCoral dark:hover:border-cpCoral transition-colors"
            >
              {t("browseAll", { location: cityName })}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
