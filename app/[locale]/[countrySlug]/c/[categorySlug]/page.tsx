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
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  getCountries,
  getCategories,
  getCountryBySlug,
  getCategoryBySlug,
  getPlacesByCountrySlugAndCategorySlug,
} from "@/db/queries";
import { PlaceCard, getCategoryIcon } from "@/components/directory";
import { PageHeader, SectionHeader } from "@/components/layout";
import { MapPin } from "lucide-react";
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
import { getTranslations } from "next-intl/server";

interface CountryCategoryPageProps {
  params: Promise<{ locale: string; countrySlug: string; categorySlug: string }>;
  searchParams: Promise<{ sort?: string }>;
}

// ISR: Optimized to 1 hour to reduce Vercel costs (was 600s)
export const revalidate = 3600;

// Pre-generate pages for all country/category combinations
// Each country only gets locales relevant to that market (DE=de, NL=nl/en, BE=nl/en/fr)
export async function generateStaticParams() {
  const [countries, categories] = await Promise.all([
    getCountries(),
    getCategories(),
  ]);

  const params: { locale: string; countrySlug: string; categorySlug: string }[] = [];

  for (const country of countries) {
    // Get only the locales valid for this country
    const countryLocales = getLocalesForCountry(country.slug);

    for (const locale of countryLocales) {
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

export default async function CountryCategoryPage({ params, searchParams }: CountryCategoryPageProps) {
  const { locale, countrySlug, categorySlug } = await params;
  const { sort: sortBy } = await searchParams;

  const t = await getTranslations("categoryPages");

  const [country, category, places] = await Promise.all([
    getCountryBySlug(countrySlug),
    getCategoryBySlug(categorySlug),
    getPlacesByCountrySlugAndCategorySlug(countrySlug, categorySlug, {
      limit: 50,
      premiumFirst: true,
      sortBy: sortBy as "rating" | "name" | "newest" | "reviews" | undefined,
    }),
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
        subtitle={`${places.length} ${t("locationsFound")}`}
        icon={<span className="text-3xl">{categoryIcon}</span>}
        variant="gradient-aqua"
        breadcrumbs={[
          { label: t("directory"), href: `/${locale}` },
          { label: countryName, href: `/${locale}/${countrySlug}` },
          { label: categoryLabel },
        ]}
      />

      {/* AI-Generated Intro Content */}
      <section className="bg-gradient-to-b from-cpAqua/10 to-background dark:from-cpAqua/5 dark:to-cpCharcoal border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-6xl px-4 py-6">
          <p className="text-foreground dark:text-cpCream/90 mb-2">{content.intro}</p>
          {content.secondary && (
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">{content.secondary}</p>
          )}
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-16 z-40 bg-background dark:bg-cpCharcoal border-b border-border dark:border-cpAmber/20 shadow-sm">
        <div className="container mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="inline-flex gap-1 dark:bg-cpAmber/10 dark:text-cpCream">
                <MapPin className="h-3 w-3" />
                {t("nationwide")}
              </Badge>
              <span className="text-sm text-muted-foreground dark:text-cpCream/70">
                {places.length} {t("results")}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground dark:text-cpCream/70 hidden sm:inline">
                {t("sort")}:
              </span>
              {[
                { value: "rating", label: t("rating") },
                { value: "reviews", label: t("reviews") },
                { value: "name", label: t("name") },
                { value: "newest", label: t("newest") },
              ].map((option) => (
                <Badge
                  key={option.value}
                  variant={(!sortBy && option.value === "rating") || sortBy === option.value ? "default" : "outline"}
                  className={
                    (!sortBy && option.value === "rating") || sortBy === option.value
                      ? "bg-cpAmber text-cpCharcoal"
                      : "cursor-pointer hover:bg-cpAmber/10 hover:border-cpAmber/40 dark:border-cpAmber/30 dark:text-cpCream"
                  }
                  asChild
                >
                  <Link
                    href={`/${locale}/${countrySlug}/c/${categorySlug}${option.value !== "rating" ? `?sort=${option.value}` : ""}`}
                    prefetch={false}
                  >
                    {option.label}
                  </Link>
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Places Grid */}
      <section className="bg-background dark:bg-cpCharcoal py-8">
        <div className="container mx-auto max-w-6xl px-4">
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
              <h2 className="text-xl font-semibold text-foreground dark:text-cpCream mb-2">
                {t("noResults")}
              </h2>
              <p className="text-muted-foreground dark:text-cpCream/70">
                {t("notRegisteredYet", { category: categoryLabel.toLowerCase(), location: countryName })}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Related Links */}
      <section className="bg-muted/50 dark:bg-cpCharcoal/80 py-12 border-t border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-6xl px-4">
          <SectionHeader
            title={t("seeAlso")}
          />
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-cpCoral/10 dark:border-cpAmber/30 dark:text-cpCream dark:hover:bg-cpCoral/20">
              <a href={`/${locale}/${countrySlug}/best/${categorySlug}`}>
                {t("bestIn", { category: categoryLabel, location: countryName })}
              </a>
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-cpCoral/10 dark:border-cpAmber/30 dark:text-cpCream dark:hover:bg-cpCoral/20">
              <a href={`/${locale}/${countrySlug}/top/${categorySlug}`}>
                {t("top10In", { category: categoryLabel, location: countryName })}
              </a>
            </Badge>
          </div>
        </div>
      </section>
    </>
  );
}

