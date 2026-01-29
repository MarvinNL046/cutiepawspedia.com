/**
 * New Additions Page - Lists all recently added places in a country
 *
 * Route: /{locale}/{countrySlug}/new
 * Example: /nl/netherlands/new
 *
 * CACHING STRATEGY: Static + ISR (Incremental Static Regeneration)
 * - revalidate: 3600s (1 hour) - New additions change daily
 * - SEO-optimized for "New Pet Services in {CountryName}"
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getCategories,
  getCountryBySlug,
  getRecentlyAddedPlaces,
} from "@/db/queries";
import { PlaceCard, getCategoryIcon } from "@/components/directory";
import { PageHeader, SectionHeader } from "@/components/layout";
import { Sparkles, Calendar, Clock, Bell, ChevronRight } from "lucide-react";
import {
  DEFAULT_SEO_CONFIG,
  buildAlternateUrls,
  buildCanonicalUrl,
  itemListSchema,
  type ContentLocale,
} from "@/lib/seo";
import { setRequestLocale, getTranslations } from 'next-intl/server';

interface NewAdditionsPageProps {
  params: Promise<{ locale: string; countrySlug: string }>;
  searchParams: Promise<{ days?: string }>;
}

// ISR: 1-hour revalidation for fresh content
// Pages are generated on-demand and cached - no static generation to avoid build timeouts
export const revalidate = 86400;
// Enable ISR: return empty array so nothing is pre-built, but on-demand requests are cached
export function generateStaticParams() {
  return [];
}


export async function generateMetadata({ params, searchParams }: NewAdditionsPageProps): Promise<Metadata> {
  const { locale, countrySlug } = await params;
  setRequestLocale(locale);
  const { days: daysParam } = await searchParams;
  const days = daysParam ? parseInt(daysParam, 10) : 30;

  const country = await getCountryBySlug(countrySlug);

  if (!country) {
    return {
      title: `New Pet Services | CutiePawsPedia`,
    };
  }

  // Get current month/year for SEO
  const now = new Date();
  const monthNames = {
    nl: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
    en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    de: ["Januar", "Februar", "M\u00e4rz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
    fr: ["janvier", "f\u00e9vrier", "mars", "avril", "mai", "juin", "juillet", "ao\u00fbt", "septembre", "octobre", "novembre", "d\u00e9cembre"],
  };
  const monthName = (monthNames[locale as keyof typeof monthNames] || monthNames.en)[now.getMonth()];
  const year = now.getFullYear();

  const title = locale === "nl"
    ? `Nieuw Toegevoegd: Huisdierservices ${country.name} | ${monthName} ${year}`
    : locale === "de"
    ? `Neu Hinzugef\u00fcgt: Haustierdienste ${country.name} | ${monthName} ${year}`
    : locale === "fr"
    ? `Nouveaut\u00e9s: Services pour Animaux ${country.name} | ${monthName} ${year}`
    : `New Pet Services in ${country.name} | ${monthName} ${year}`;

  const description = locale === "nl"
    ? `Ontdek de nieuwste huisdierservices in ${country.name}. Bekijk recent toegevoegde dierenartsen, trimsalons, dierenwinkels en meer.`
    : locale === "de"
    ? `Entdecken Sie die neuesten Haustierdienste in ${country.name}. Sehen Sie k\u00fcrzlich hinzugef\u00fcgte Tier\u00e4rzte, Hundesalons und mehr.`
    : locale === "fr"
    ? `D\u00e9couvrez les derniers services pour animaux en ${country.name}. Consultez les v\u00e9t\u00e9rinaires et toiletteurs r\u00e9cemment ajout\u00e9s.`
    : `Discover the newest pet services in ${country.name}. See recently added veterinarians, groomers, pet shops and more.`;

  const canonicalUrl = buildCanonicalUrl({
    locale,
    countrySlug,
    customPath: "new",
  });

  return {
    title,
    description,
    keywords: [
      locale === "nl" ? `nieuwe huisdierservices ${country.name}` : `new pet services ${country.name}`,
      locale === "nl" ? `nieuw geopend ${country.name}` : `newly opened ${country.name}`,
      locale === "nl" ? `recent toegevoegd` : `recently added`,
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternateUrls(
        { locale, countrySlug, customPath: "new" },
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

// Helper to format date relative to now
function formatRelativeDate(date: Date, locale: string): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return locale === "nl" ? "Vandaag" : locale === "de" ? "Heute" : locale === "fr" ? "Aujourd'hui" : "Today";
  } else if (diffDays === 1) {
    return locale === "nl" ? "Gisteren" : locale === "de" ? "Gestern" : locale === "fr" ? "Hier" : "Yesterday";
  } else if (diffDays < 7) {
    return locale === "nl" ? `${diffDays} dagen geleden` : locale === "de" ? `Vor ${diffDays} Tagen` : locale === "fr" ? `Il y a ${diffDays} jours` : `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return locale === "nl" ? `${weeks} ${weeks === 1 ? "week" : "weken"} geleden` : locale === "de" ? `Vor ${weeks} ${weeks === 1 ? "Woche" : "Wochen"}` : locale === "fr" ? `Il y a ${weeks} semaine${weeks > 1 ? "s" : ""}` : `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  } else {
    const months = Math.floor(diffDays / 30);
    return locale === "nl" ? `${months} ${months === 1 ? "maand" : "maanden"} geleden` : locale === "de" ? `Vor ${months} ${months === 1 ? "Monat" : "Monaten"}` : locale === "fr" ? `Il y a ${months} mois` : `${months} ${months === 1 ? "month" : "months"} ago`;
  }
}

// Group places by time period (This Week, This Month, Last 3 Months)
function groupPlacesByTimePeriod(places: any[], locale: string) {
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const thisWeek: typeof places = [];
  const thisMonth: typeof places = [];
  const older: typeof places = [];

  for (const place of places) {
    const createdAt = new Date(place.createdAt);
    if (createdAt >= oneWeekAgo) {
      thisWeek.push(place);
    } else if (createdAt >= oneMonthAgo) {
      thisMonth.push(place);
    } else {
      older.push(place);
    }
  }

  return { thisWeek, thisMonth, older };
}

export default async function NewAdditionsPage({ params, searchParams }: NewAdditionsPageProps) {
  const { locale, countrySlug } = await params;
  setRequestLocale(locale);
  const { days: daysParam } = await searchParams;
  const days = daysParam ? parseInt(daysParam, 10) : 90; // Default to 90 days for more content

  const t = await getTranslations("newAdditions");
  const tCategory = await getTranslations("categoryPages");

  const [country, categories, places] = await Promise.all([
    getCountryBySlug(countrySlug),
    getCategories(),
    getRecentlyAddedPlaces(countrySlug, { days, limit: 100 }),
  ]);

  if (!country) {
    notFound();
  }

  const countryName = country.name;
  const { thisWeek, thisMonth, older } = groupPlacesByTimePeriod(places, locale);

  // Get current month/year for display
  const now = new Date();
  const monthNames = {
    nl: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
    en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    de: ["Januar", "Februar", "M\u00e4rz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
    fr: ["janvier", "f\u00e9vrier", "mars", "avril", "mai", "juin", "juillet", "ao\u00fbt", "septembre", "octobre", "novembre", "d\u00e9cembre"],
  };
  const monthName = (monthNames[locale as keyof typeof monthNames] || monthNames.en)[now.getMonth()];
  const year = now.getFullYear();

  // Generate JSON-LD ItemList
  const itemListJsonLd = itemListSchema(
    places.map((place, index) => ({
      name: place.name,
      url: `/${locale}/${countrySlug}/${(() => { const city = Array.isArray(place.city) ? place.city[0] : place.city; return city?.slug || ""; })()}/${(() => { const cats = place.placeCategories; return cats?.[0]?.category?.slug || ""; })()}/${place.slug}`,
      position: index + 1,
      description: place.description || undefined,
    })),
    t("pageTitle", { country: countryName })
  );

  // Calculate category stats
  const categoryStats = new Map<string, number>();
  for (const place of places) {
    for (const pc of (place.placeCategories || [])) {
      const slug = pc.category?.slug;
      if (slug) {
        categoryStats.set(slug, (categoryStats.get(slug) || 0) + 1);
      }
    }
  }

  return (
    <>
      {/* JSON-LD ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <PageHeader
        title={t("pageTitle", { country: countryName })}
        subtitle={t("pageSubtitle", { count: places.length, month: monthName, year })}
        icon={<Sparkles className="h-8 w-8 text-cpCoral" />}
        variant="gradient-coral"
        breadcrumbs={[
          { label: tCategory("directory"), href: `/${locale}` },
          { label: countryName, href: `/${locale}/${countrySlug}` },
          { label: t("breadcrumb") },
        ]}
      />

      {/* AI-Generated Intro Content */}
      <section className="bg-gradient-to-b from-cpCoral/10 to-background dark:from-cpCoral/5 dark:to-cpCharcoal border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-6xl px-4 py-6">
          <p className="text-foreground dark:text-cpCream/90 mb-2">
            {t("intro", { country: countryName })}
          </p>
          <p className="text-sm text-muted-foreground dark:text-cpCream/70">
            {t("introSecondary", { count: places.length })}
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-16 z-40 bg-background dark:bg-cpCharcoal border-b border-border dark:border-cpAmber/20 shadow-sm">
        <div className="container mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="inline-flex gap-1 dark:bg-cpAmber/10 dark:text-cpCream">
                <Clock className="h-3 w-3" />
                {t("recentlyAdded")}
              </Badge>
              <span className="text-sm text-muted-foreground dark:text-cpCream/70">
                {places.length} {tCategory("results")}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground dark:text-cpCream/70 hidden sm:inline">
                {t("timeframe")}:
              </span>
              {[
                { value: "7", label: t("thisWeek") },
                { value: "30", label: t("thisMonth") },
                { value: "90", label: t("last3Months") },
              ].map((option) => (
                <Badge
                  key={option.value}
                  variant={(days === parseInt(option.value, 10)) || (!daysParam && option.value === "90") ? "default" : "outline"}
                  className={
                    (days === parseInt(option.value, 10)) || (!daysParam && option.value === "90")
                      ? "bg-cpCoral text-white"
                      : "cursor-pointer hover:bg-cpCoral/10 hover:border-cpCoral/40 dark:border-cpAmber/30 dark:text-cpCream"
                  }
                  asChild
                >
                  <Link
                    href={`/${locale}/${countrySlug}/new${option.value !== "90" ? `?days=${option.value}` : ""}`}
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

      {/* Browse by Category */}
      {categories.length > 0 && (
        <section className="bg-muted/30 dark:bg-cpCharcoal/50 py-6 border-b border-border dark:border-cpAmber/20">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-lg font-semibold text-foreground dark:text-cpCream mb-4">
              {t("browseByCategory")}
            </h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const count = categoryStats.get(category.slug) || 0;
                return (
                  <Badge
                    key={category.slug}
                    variant="outline"
                    className="cursor-pointer hover:bg-cpCoral/10 hover:border-cpCoral/40 dark:border-cpAmber/30 dark:text-cpCream"
                    asChild
                  >
                    <Link href={`/${locale}/${countrySlug}/new/${category.slug}`}>
                      <span className="mr-1">{getCategoryIcon(category.icon || category.slug)}</span>
                      {t(`categories.${category.slug}`, { defaultValue: category.labelKey })}
                      {count > 0 && <span className="ml-1 text-xs text-muted-foreground">({count})</span>}
                    </Link>
                  </Badge>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Timeline Content */}
      <section className="bg-background dark:bg-cpCharcoal py-8">
        <div className="container mx-auto max-w-6xl px-4">
          {places.length > 0 ? (
            <div className="space-y-8">
              {/* This Week */}
              {thisWeek.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <h2 className="text-xl font-semibold text-foreground dark:text-cpCream">
                      {t("thisWeek")}
                    </h2>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      {thisWeek.length} {t("new")}
                    </Badge>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {thisWeek.map((place) => (
                      <div key={place.id} className="relative">
                        <div className="absolute -top-2 -right-2 z-10">
                          <Badge className="bg-cpCoral text-white text-xs">
                            {formatRelativeDate(new Date(place.createdAt), locale)}
                          </Badge>
                        </div>
                        <PlaceCard
                          place={place}
                          locale={locale}
                          countrySlug={countrySlug}
                          citySlug={(() => { const city = Array.isArray(place.city) ? place.city[0] : place.city; return city?.slug || ""; })()}
                          categorySlug={(() => { const cats = place.placeCategories; return cats?.[0]?.category?.slug || ""; })()}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* This Month */}
              {thisMonth.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="h-5 w-5 text-cpAmber" />
                    <h2 className="text-xl font-semibold text-foreground dark:text-cpCream">
                      {t("thisMonth")}
                    </h2>
                    <Badge variant="outline" className="dark:border-cpAmber/30 dark:text-cpCream">
                      {thisMonth.length} {t("added")}
                    </Badge>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {thisMonth.map((place) => (
                      <div key={place.id} className="relative">
                        <div className="absolute -top-2 -right-2 z-10">
                          <Badge variant="secondary" className="text-xs">
                            {formatRelativeDate(new Date(place.createdAt), locale)}
                          </Badge>
                        </div>
                        <PlaceCard
                          place={place}
                          locale={locale}
                          countrySlug={countrySlug}
                          citySlug={(() => { const city = Array.isArray(place.city) ? place.city[0] : place.city; return city?.slug || ""; })()}
                          categorySlug={(() => { const cats = place.placeCategories; return cats?.[0]?.category?.slug || ""; })()}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Older */}
              {older.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <h2 className="text-xl font-semibold text-foreground dark:text-cpCream">
                      {t("earlier")}
                    </h2>
                    <Badge variant="outline" className="dark:border-cpAmber/30 dark:text-cpCream">
                      {older.length} {t("added")}
                    </Badge>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {older.map((place) => (
                      <div key={place.id} className="relative">
                        <div className="absolute -top-2 -right-2 z-10">
                          <Badge variant="outline" className="text-xs dark:border-cpAmber/20">
                            {formatRelativeDate(new Date(place.createdAt), locale)}
                          </Badge>
                        </div>
                        <PlaceCard
                          place={place}
                          locale={locale}
                          countrySlug={countrySlug}
                          citySlug={(() => { const city = Array.isArray(place.city) ? place.city[0] : place.city; return city?.slug || ""; })()}
                          categorySlug={(() => { const cats = place.placeCategories; return cats?.[0]?.category?.slug || ""; })()}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <span className="text-6xl block mb-4">🆕</span>
              <h2 className="text-xl font-semibold text-foreground dark:text-cpCream mb-2">
                {t("noNewAdditions")}
              </h2>
              <p className="text-muted-foreground dark:text-cpCream/70 mb-4">
                {t("noNewAdditionsDesc", { country: countryName, days })}
              </p>
              <Button asChild variant="outline">
                <Link href={`/${locale}/${countrySlug}`}>
                  {t("browseAll")}
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-r from-cpCoral to-cpCoral/80 dark:from-cpCoral/90 dark:to-cpCoral/70 py-12">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <div className="flex justify-center mb-4">
            <Bell className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {t("ctaTitle")}
          </h2>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            {t("ctaDescription", { country: countryName })}
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-cpCoral hover:bg-white/90"
          >
            <Link href={`/${locale}/newsletter`}>
              {t("ctaButton")}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Related Links */}
      <section className="bg-muted/50 dark:bg-cpCharcoal/80 py-12 border-t border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-6xl px-4">
          <SectionHeader title={tCategory("seeAlso")} />
          <div className="flex flex-wrap gap-2">
            {categories.slice(0, 6).map((category) => (
              <Badge
                key={category.slug}
                variant="outline"
                className="cursor-pointer hover:bg-cpCoral/10 dark:border-cpAmber/30 dark:text-cpCream dark:hover:bg-cpCoral/20"
                asChild
              >
                <Link href={`/${locale}/${countrySlug}/c/${category.slug}`}>
                  {t(`categories.${category.slug}`, { defaultValue: category.labelKey })} {countryName}
                </Link>
              </Badge>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
