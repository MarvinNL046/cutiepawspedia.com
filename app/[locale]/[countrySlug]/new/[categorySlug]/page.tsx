/**
 * New Additions by Category Page - Lists recently added places by category
 *
 * Route: /{locale}/{countrySlug}/new/{categorySlug}
 * Example: /nl/netherlands/new/veterinary
 *
 * CACHING STRATEGY: Static + ISR (Incremental Static Regeneration)
 * - revalidate: 3600s (1 hour) - New additions change daily
 * - SEO-optimized for "New {Category} in {CountryName}"
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getCountryBySlug,
  getCategoryBySlug,
  getRecentlyAddedPlacesByCategory,
} from "@/db/queries";
import { PlaceCard, getCategoryIcon } from "@/components/directory";
import { PageHeader, SectionHeader } from "@/components/layout";
import { Sparkles, Calendar, Clock, Bell, ChevronRight, ArrowLeft } from "lucide-react";
import {
  DEFAULT_SEO_CONFIG,
  buildAlternateUrls,
  buildCanonicalUrl,
  itemListSchema,
  getLocalizedCategoryName,
  type ContentLocale,
} from "@/lib/seo";
import { setRequestLocale, getTranslations } from 'next-intl/server';

interface NewCategoryPageProps {
  params: Promise<{ locale: string; countrySlug: string; categorySlug: string }>;
  searchParams: Promise<{ days?: string }>;
}

// ISR: 1-hour revalidation for fresh content
// Pages are generated on-demand and cached - no static generation to avoid build timeouts
export const revalidate = 86400;

export async function generateMetadata({ params, searchParams }: NewCategoryPageProps): Promise<Metadata> {
  const { locale, countrySlug, categorySlug } = await params;
  setRequestLocale(locale);
  const { days: daysParam } = await searchParams;

  const [country, category] = await Promise.all([
    getCountryBySlug(countrySlug),
    getCategoryBySlug(categorySlug),
  ]);

  if (!country || !category) {
    return {
      title: `New Pet Services | CutiePawsPedia`,
    };
  }

  const categoryLabel = getLocalizedCategoryName(categorySlug, locale as ContentLocale);

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
    ? `Nieuw Geopende ${categoryLabel} in ${country.name} | ${monthName} ${year}`
    : locale === "de"
    ? `Neu Er\u00f6ffnete ${categoryLabel} in ${country.name} | ${monthName} ${year}`
    : locale === "fr"
    ? `Nouveaux ${categoryLabel} en ${country.name} | ${monthName} ${year}`
    : `New ${categoryLabel} in ${country.name} | ${monthName} ${year}`;

  const description = locale === "nl"
    ? `Ontdek nieuw geopende ${categoryLabel.toLowerCase()} in ${country.name}. Bekijk recent toegevoegde ${categoryLabel.toLowerCase()} en vind de beste diensten bij jou in de buurt.`
    : locale === "de"
    ? `Entdecken Sie neu er\u00f6ffnete ${categoryLabel} in ${country.name}. Finden Sie k\u00fcrzlich hinzugef\u00fcgte ${categoryLabel} in Ihrer N\u00e4he.`
    : locale === "fr"
    ? `D\u00e9couvrez les nouveaux ${categoryLabel.toLowerCase()} en ${country.name}. Trouvez les ${categoryLabel.toLowerCase()} r\u00e9cemment ajout\u00e9s pr\u00e8s de chez vous.`
    : `Discover newly opened ${categoryLabel.toLowerCase()} in ${country.name}. Find recently added ${categoryLabel.toLowerCase()} near you.`;

  const canonicalUrl = buildCanonicalUrl({
    locale,
    countrySlug,
    customPath: `new/${categorySlug}`,
  });

  return {
    title,
    description,
    keywords: [
      locale === "nl" ? `nieuwe ${categoryLabel.toLowerCase()} ${country.name}` : `new ${categoryLabel.toLowerCase()} ${country.name}`,
      locale === "nl" ? `nieuw geopend ${categoryLabel.toLowerCase()}` : `newly opened ${categoryLabel.toLowerCase()}`,
      locale === "nl" ? `recent toegevoegd ${categoryLabel.toLowerCase()}` : `recently added ${categoryLabel.toLowerCase()}`,
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternateUrls(
        { locale, countrySlug, customPath: `new/${categorySlug}` },
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

export default async function NewCategoryPage({ params, searchParams }: NewCategoryPageProps) {
  const { locale, countrySlug, categorySlug } = await params;
  const { days: daysParam } = await searchParams;
  const days = daysParam ? parseInt(daysParam, 10) : 90; // Default to 90 days for more content

  const t = await getTranslations("newAdditions");
  const tCategory = await getTranslations("categoryPages");

  const [country, category, categories, places] = await Promise.all([
    getCountryBySlug(countrySlug),
    getCategoryBySlug(categorySlug),
    getCategories(),
    getRecentlyAddedPlacesByCategory(countrySlug, categorySlug, { days, limit: 100 }),
  ]);

  if (!country || !category) {
    notFound();
  }

  const countryName = country.name;
  const categoryLabel = getLocalizedCategoryName(categorySlug, locale as ContentLocale);
  const categoryIcon = getCategoryIcon(category.icon || categorySlug);
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
      url: `/${locale}/${countrySlug}/${(() => { const city = Array.isArray(place.city) ? place.city[0] : place.city; return city?.slug || ""; })()}/${categorySlug}/${place.slug}`,
      position: index + 1,
      description: place.description || undefined,
    })),
    t("categoryPageTitle", { category: categoryLabel, country: countryName })
  );

  return (
    <>
      {/* JSON-LD ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <PageHeader
        title={t("categoryPageTitle", { category: categoryLabel, country: countryName })}
        subtitle={t("categoryPageSubtitle", { count: places.length, category: categoryLabel, month: monthName, year })}
        icon={<span className="text-3xl">{categoryIcon}</span>}
        variant="gradient-coral"
        breadcrumbs={[
          { label: tCategory("directory"), href: `/${locale}` },
          { label: countryName, href: `/${locale}/${countrySlug}` },
          { label: t("breadcrumb"), href: `/${locale}/${countrySlug}/new` },
          { label: categoryLabel },
        ]}
      />

      {/* AI-Generated Intro Content */}
      <section className="bg-gradient-to-b from-cpCoral/10 to-background dark:from-cpCoral/5 dark:to-cpCharcoal border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-6xl px-4 py-6">
          <p className="text-foreground dark:text-cpCream/90 mb-2">
            {t("categoryIntro", { category: categoryLabel.toLowerCase(), country: countryName })}
          </p>
          <p className="text-sm text-muted-foreground dark:text-cpCream/70">
            {t("categoryIntroSecondary", { count: places.length, category: categoryLabel.toLowerCase() })}
          </p>
        </div>
      </section>

      {/* Back link and Filter Bar */}
      <section className="sticky top-16 z-40 bg-background dark:bg-cpCharcoal border-b border-border dark:border-cpAmber/20 shadow-sm">
        <div className="container mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-muted-foreground hover:text-foreground"
              >
                <Link href={`/${locale}/${countrySlug}/new`}>
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  {t("allCategories")}
                </Link>
              </Button>
              <Badge variant="secondary" className="inline-flex gap-1 dark:bg-cpAmber/10 dark:text-cpCream">
                <Sparkles className="h-3 w-3" />
                {categoryLabel}
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
                    href={`/${locale}/${countrySlug}/new/${categorySlug}${option.value !== "90" ? `?days=${option.value}` : ""}`}
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

      {/* Other Categories */}
      <section className="bg-muted/30 dark:bg-cpCharcoal/50 py-4 border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-muted-foreground dark:text-cpCream/70 mr-2">
              {t("otherCategories")}:
            </span>
            {categories
              .filter((c) => c.slug !== categorySlug)
              .slice(0, 6)
              .map((cat) => (
                <Badge
                  key={cat.slug}
                  variant="outline"
                  className="cursor-pointer hover:bg-cpCoral/10 hover:border-cpCoral/40 dark:border-cpAmber/30 dark:text-cpCream"
                  asChild
                >
                  <Link href={`/${locale}/${countrySlug}/new/${cat.slug}`}>
                    <span className="mr-1">{getCategoryIcon(cat.icon || cat.slug)}</span>
                    {getLocalizedCategoryName(cat.slug, locale as ContentLocale)}
                  </Link>
                </Badge>
              ))}
          </div>
        </div>
      </section>

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
                          categorySlug={categorySlug}
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
                          categorySlug={categorySlug}
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
                          categorySlug={categorySlug}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <span className="text-6xl block mb-4">{categoryIcon}</span>
              <h2 className="text-xl font-semibold text-foreground dark:text-cpCream mb-2">
                {t("noNewAdditionsCategory", { category: categoryLabel })}
              </h2>
              <p className="text-muted-foreground dark:text-cpCream/70 mb-4">
                {t("noNewAdditionsCategoryDesc", { category: categoryLabel.toLowerCase(), country: countryName, days })}
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button asChild variant="outline">
                  <Link href={`/${locale}/${countrySlug}/new`}>
                    {t("viewAllNew")}
                  </Link>
                </Button>
                <Button asChild variant="default" className="bg-cpCoral hover:bg-cpCoral/90">
                  <Link href={`/${locale}/${countrySlug}/c/${categorySlug}`}>
                    {t("browseAllCategory", { category: categoryLabel })}
                  </Link>
                </Button>
              </div>
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
            {t("ctaTitleCategory", { category: categoryLabel })}
          </h2>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            {t("ctaDescriptionCategory", { category: categoryLabel.toLowerCase(), country: countryName })}
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
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-cpCoral/10 dark:border-cpAmber/30 dark:text-cpCream dark:hover:bg-cpCoral/20"
              asChild
            >
              <Link href={`/${locale}/${countrySlug}/c/${categorySlug}`}>
                {tCategory("allIn", { category: categoryLabel, location: countryName })}
              </Link>
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-cpCoral/10 dark:border-cpAmber/30 dark:text-cpCream dark:hover:bg-cpCoral/20"
              asChild
            >
              <Link href={`/${locale}/${countrySlug}/best/${categorySlug}`}>
                {tCategory("bestIn", { category: categoryLabel, location: countryName })}
              </Link>
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-cpCoral/10 dark:border-cpAmber/30 dark:text-cpCream dark:hover:bg-cpCoral/20"
              asChild
            >
              <Link href={`/${locale}/${countrySlug}/top/${categorySlug}`}>
                {tCategory("top10In", { category: categoryLabel, location: countryName })}
              </Link>
            </Badge>
          </div>
        </div>
      </section>
    </>
  );
}
