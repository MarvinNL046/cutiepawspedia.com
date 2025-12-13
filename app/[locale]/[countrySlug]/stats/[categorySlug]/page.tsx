/**
 * Statistics Page - Category Statistics for a Country
 *
 * Route: /{locale}/{countrySlug}/stats/{categorySlug}
 * Example: /nl/netherlands/stats/veterinary
 *
 * Shows comprehensive statistics like:
 * - Total number of places
 * - Distribution per province
 * - Average ratings
 * - Top cities
 * - Fun facts and insights
 *
 * CACHING STRATEGY: Static + ISR (24 hours)
 * - Statistics change slowly, daily refresh is sufficient
 * - High SEO value for "how many X in Y" queries
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import {
  BarChart3,
  TrendingUp,
  MapPin,
  Star,
  Building2,
  Award,
  Lightbulb,
  Share2,
  CheckCircle2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader, SectionHeader } from "@/components/layout";
import { getCategoryIcon } from "@/components/directory";

import {
  getCountryBySlug,
  getCategoryBySlug,
  getCategoryStatistics,
} from "@/db/queries";
import {
  DEFAULT_SEO_CONFIG,
  buildCanonicalUrl,
  buildAlternateUrls,
  getLocalizedCategoryName,
  type ContentLocale,
} from "@/lib/seo";

interface StatsPageProps {
  params: Promise<{ locale: string; countrySlug: string; categorySlug: string }>;
}

// ISR: Statistics change slowly, 24-hour revalidation
// Pages are generated on-demand and cached - no static generation to avoid build timeouts
export const revalidate = 86400;

export async function generateMetadata({ params }: StatsPageProps): Promise<Metadata> {
  const { locale, countrySlug, categorySlug } = await params;

  const [country, category, stats] = await Promise.all([
    getCountryBySlug(countrySlug),
    getCategoryBySlug(categorySlug),
    getCategoryStatistics(countrySlug, categorySlug),
  ]);

  if (!country || !category) {
    return {
      title: "Statistics",
    };
  }

  const categoryLabel = getLocalizedCategoryName(categorySlug, locale as ContentLocale);
  const currentYear = new Date().getFullYear();

  // Localized titles
  const titles: Record<string, string> = {
    nl: `Hoeveel ${categoryLabel} zijn er in ${country.name}? Statistieken & Feiten ${currentYear}`,
    en: `How Many ${categoryLabel} Are There in ${country.name}? Statistics & Facts ${currentYear}`,
    de: `Wie viele ${categoryLabel} gibt es in ${country.name}? Statistiken & Fakten ${currentYear}`,
    fr: `Combien de ${categoryLabel} y a-t-il en ${country.name}? Statistiques & Faits ${currentYear}`,
  };

  const descriptions: Record<string, string> = {
    nl: `Ontdek ${stats.totalPlaces} ${categoryLabel.toLowerCase()} in ${country.name}. Bekijk statistieken per provincie, gemiddelde beoordelingen en meer.`,
    en: `Discover ${stats.totalPlaces} ${categoryLabel.toLowerCase()} in ${country.name}. View statistics by province, average ratings and more.`,
    de: `Entdecken Sie ${stats.totalPlaces} ${categoryLabel.toLowerCase()} in ${country.name}. Statistiken nach Bundesland, durchschnittliche Bewertungen und mehr.`,
    fr: `Decouvrez ${stats.totalPlaces} ${categoryLabel.toLowerCase()} en ${country.name}. Statistiques par region, notes moyennes et plus.`,
  };

  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;

  const canonicalUrl = buildCanonicalUrl({
    locale,
    countrySlug,
    path: `stats/${categorySlug}`,
  });

  return {
    title,
    description,
    keywords: [
      `${categoryLabel.toLowerCase()} ${country.name}`,
      `hoeveel ${categoryLabel.toLowerCase()} ${country.name}`,
      `${categorySlug} statistieken`,
      `${categoryLabel.toLowerCase()} aantal`,
      `pet services ${country.name}`,
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternateUrls(
        { locale, countrySlug, path: `stats/${categorySlug}` },
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

export default async function StatsPage({ params }: StatsPageProps) {
  const { locale, countrySlug, categorySlug } = await params;

  const t = await getTranslations("stats");

  const [country, category, stats] = await Promise.all([
    getCountryBySlug(countrySlug),
    getCategoryBySlug(categorySlug),
    getCategoryStatistics(countrySlug, categorySlug),
  ]);

  if (!country || !category) {
    notFound();
  }

  const categoryLabel = getLocalizedCategoryName(categorySlug, locale as ContentLocale);
  const categoryIcon = getCategoryIcon(category.icon || categorySlug);
  const currentYear = new Date().getFullYear();

  // Calculate some derived statistics
  const provincesWithPlaces = stats.provinceDistribution.filter((p) => p.count > 0);
  const avgPlacesPerProvince = provincesWithPlaces.length > 0
    ? Math.round(stats.totalPlaces / provincesWithPlaces.length)
    : 0;
  const topProvince = stats.provinceDistribution[0];
  const topCity = stats.topCities[0];

  // Rating insights
  const highRatedPlaces = stats.ratingDistribution
    .filter((r) => r.rating >= 4)
    .reduce((sum, r) => sum + r.count, 0);
  const highRatedPercentage = stats.ratedPlaces > 0
    ? Math.round((highRatedPlaces / stats.ratedPlaces) * 100)
    : 0;

  // Generate JSON-LD for statistics page
  const statisticsJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${categoryLabel} ${t("statisticsIn")} ${country.name} ${currentYear}`,
    description: `${t("statisticalOverview")} ${categoryLabel.toLowerCase()} ${t("in")} ${country.name}`,
    url: `${DEFAULT_SEO_CONFIG.baseUrl}/${locale}/${countrySlug}/stats/${categorySlug}`,
    mainEntity: {
      "@type": "Dataset",
      name: `${categoryLabel} ${t("dataIn")} ${country.name}`,
      description: `${t("comprehensiveData")} ${stats.totalPlaces} ${categoryLabel.toLowerCase()} ${t("acrossProvinces", { count: provincesWithPlaces.length })}`,
      temporalCoverage: `${currentYear}`,
      spatialCoverage: {
        "@type": "Country",
        name: country.name,
      },
      variableMeasured: [
        {
          "@type": "PropertyValue",
          name: t("totalPlaces"),
          value: stats.totalPlaces,
        },
        {
          "@type": "PropertyValue",
          name: t("averageRating"),
          value: stats.avgRating.toFixed(1),
        },
        {
          "@type": "PropertyValue",
          name: t("totalReviews"),
          value: stats.totalReviews,
        },
      ],
    },
    isPartOf: {
      "@type": "WebSite",
      name: DEFAULT_SEO_CONFIG.siteName,
      url: DEFAULT_SEO_CONFIG.baseUrl,
    },
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(statisticsJsonLd) }}
      />

      {/* Page Header */}
      <PageHeader
        title={`${categoryLabel} ${t("statisticsIn")} ${country.name}`}
        subtitle={`${t("updatedFor")} ${currentYear}`}
        icon={<span className="text-3xl">{categoryIcon}</span>}
        variant="gradient-yellow"
        breadcrumbs={[
          { label: t("directory"), href: `/${locale}` },
          { label: country.name, href: `/${locale}/${countrySlug}` },
          { label: t("statistics") },
        ]}
      />

      {/* Key Stats Overview */}
      <section className="bg-gradient-to-b from-cpAmber/10 to-background dark:from-cpAmber/5 dark:to-cpCharcoal border-b border-border">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon={<Building2 className="h-5 w-5 text-cpCoral" />}
              value={stats.totalPlaces.toLocaleString(locale)}
              label={t("totalPlaces")}
              highlight
            />
            <StatCard
              icon={<Star className="h-5 w-5 text-cpAmber" />}
              value={stats.avgRating > 0 ? stats.avgRating.toFixed(1) : "-"}
              label={t("averageRating")}
            />
            <StatCard
              icon={<TrendingUp className="h-5 w-5 text-green-600" />}
              value={stats.totalReviews.toLocaleString(locale)}
              label={t("totalReviews")}
            />
            <StatCard
              icon={<CheckCircle2 className="h-5 w-5 text-cpAqua" />}
              value={stats.verifiedPlaces.toLocaleString(locale)}
              label={t("verifiedPlaces")}
            />
          </div>
        </div>
      </section>

      {/* Province Distribution Chart */}
      {provincesWithPlaces.length > 0 && (
        <section className="container mx-auto max-w-6xl px-4 py-12">
          <SectionHeader
            title={t("distributionByProvince")}
            icon={<BarChart3 className="h-5 w-5 text-cpCoral" />}
          />
          <Card className="dark:bg-cpSurface/50">
            <CardContent className="pt-6">
              <div className="space-y-3">
                {stats.provinceDistribution.slice(0, 12).map((province) => {
                  const percentage = stats.totalPlaces > 0
                    ? (province.count / stats.totalPlaces) * 100
                    : 0;
                  return (
                    <div key={province.provinceId} className="group">
                      <div className="flex items-center justify-between mb-1">
                        <Link
                          href={`/${locale}/${countrySlug}/p/${province.provinceSlug}/c/${categorySlug}`}
                          className="text-sm font-medium text-foreground dark:text-cpCream hover:text-cpCoral transition-colors"
                        >
                          {province.provinceName}
                        </Link>
                        <span className="text-sm text-muted-foreground dark:text-cpCream/70">
                          {province.count.toLocaleString(locale)} ({percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="h-3 bg-muted dark:bg-cpCharcoal rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cpCoral to-cpAmber rounded-full transition-all duration-500"
                          style={{ width: `${Math.max(percentage, 2)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Top Cities */}
      {stats.topCities.length > 0 && (
        <section className="bg-slate-50/50 dark:bg-cpCharcoal/50">
          <div className="container mx-auto max-w-6xl px-4 py-12">
            <SectionHeader
              title={t("topCities")}
              icon={<MapPin className="h-5 w-5 text-cpCoral" />}
            />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {stats.topCities.map((city, index) => (
                <Link
                  key={city.cityId}
                  href={`/${locale}/${countrySlug}/${city.citySlug}/c/${categorySlug}`}
                  className="group"
                >
                  <Card className="h-full hover:shadow-md transition-all hover:border-cpCoral/30 dark:bg-cpSurface/50">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-cpCoral mb-1">
                        #{index + 1}
                      </div>
                      <div className="font-medium text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors">
                        {city.cityName}
                      </div>
                      <div className="text-sm text-muted-foreground dark:text-cpCream/70">
                        {city.count.toLocaleString(locale)} {t("places")}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Rating Distribution */}
      {stats.ratedPlaces > 0 && (
        <section className="container mx-auto max-w-6xl px-4 py-12">
          <SectionHeader
            title={t("ratingDistribution")}
            icon={<Star className="h-5 w-5 text-cpAmber" />}
          />
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="dark:bg-cpSurface/50">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {stats.ratingDistribution.map((item) => {
                    const percentage = stats.ratedPlaces > 0
                      ? (item.count / stats.ratedPlaces) * 100
                      : 0;
                    return (
                      <div key={item.rating}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: item.rating }).map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 fill-cpAmber text-cpAmber"
                              />
                            ))}
                            {Array.from({ length: 5 - item.rating }).map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 text-muted-foreground/30"
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground dark:text-cpCream/70">
                            {item.count.toLocaleString(locale)} ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <div className="h-2 bg-muted dark:bg-cpCharcoal rounded-full overflow-hidden">
                          <div
                            className="h-full bg-cpAmber rounded-full transition-all duration-500"
                            style={{ width: `${Math.max(percentage, 1)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Rating Summary */}
            <div className="space-y-4">
              <Card className="dark:bg-cpSurface/50 border-cpAmber/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="h-5 w-5 text-cpAmber" />
                    {t("ratingSummary")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p className="text-foreground dark:text-cpCream">
                      <span className="font-semibold">{highRatedPercentage}%</span>{" "}
                      {t("ofPlacesRated4Plus")}
                    </p>
                    <p className="text-muted-foreground dark:text-cpCream/70">
                      {stats.ratedPlaces.toLocaleString(locale)} {t("placesWithReviews")}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {stats.avgRating > 0 && (
                <Card className="dark:bg-cpSurface/50 bg-gradient-to-br from-cpAmber/10 to-transparent">
                  <CardContent className="pt-6 text-center">
                    <div className="text-5xl font-bold text-cpAmber mb-2">
                      {stats.avgRating.toFixed(1)}
                    </div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.round(stats.avgRating)
                              ? "fill-cpAmber text-cpAmber"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                      {t("averageRatingAcross")} {country.name}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Did You Know / Fun Facts */}
      <section className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/10 dark:from-cpCoral/5 dark:to-cpAmber/5">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <SectionHeader
            title={t("didYouKnow")}
            icon={<Lightbulb className="h-5 w-5 text-cpAmber" />}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topProvince && topProvince.count > 0 && (
              <FactCard
                emoji="🏆"
                title={t("topProvince")}
                fact={t("topProvinceFact", {
                  province: topProvince.provinceName,
                  count: topProvince.count.toLocaleString(locale),
                  category: categoryLabel.toLowerCase(),
                })}
              />
            )}
            {topCity && (
              <FactCard
                emoji="🌆"
                title={t("topCity")}
                fact={t("topCityFact", {
                  city: topCity.cityName,
                  count: topCity.count.toLocaleString(locale),
                  category: categoryLabel.toLowerCase(),
                })}
              />
            )}
            {avgPlacesPerProvince > 0 && (
              <FactCard
                emoji="📊"
                title={t("avgPerProvince")}
                fact={t("avgPerProvinceFact", {
                  avg: avgPlacesPerProvince.toLocaleString(locale),
                  category: categoryLabel.toLowerCase(),
                })}
              />
            )}
            {highRatedPercentage >= 50 && (
              <FactCard
                emoji="⭐"
                title={t("highQuality")}
                fact={t("highQualityFact", {
                  percentage: highRatedPercentage,
                  category: categoryLabel.toLowerCase(),
                })}
              />
            )}
            {stats.verifiedPlaces > 0 && (
              <FactCard
                emoji="✅"
                title={t("verifiedBusinesses")}
                fact={t("verifiedFact", {
                  count: stats.verifiedPlaces.toLocaleString(locale),
                  category: categoryLabel.toLowerCase(),
                })}
              />
            )}
            {stats.premiumPlaces > 0 && (
              <FactCard
                emoji="💎"
                title={t("premiumListings")}
                fact={t("premiumFact", {
                  count: stats.premiumPlaces.toLocaleString(locale),
                })}
              />
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto max-w-6xl px-4 py-12">
        <Card className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/5 dark:from-cpCoral/10 dark:to-cpAmber/5 border-cpCoral/20">
          <CardContent className="py-8 text-center">
            <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-2">
              {t("exploreNow")}
            </h3>
            <p className="text-muted-foreground dark:text-cpCream/70 mb-6 max-w-2xl mx-auto">
              {t("exploreCta", {
                count: stats.totalPlaces.toLocaleString(locale),
                category: categoryLabel.toLowerCase(),
                country: country.name,
              })}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href={`/${locale}/${countrySlug}/c/${categorySlug}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-cpCoral text-white rounded-lg font-medium hover:bg-cpCoral/90 transition-colors"
              >
                <Building2 className="h-4 w-4" />
                {t("browseAll")} {categoryLabel}
              </Link>
              <Link
                href={`/${locale}/${countrySlug}/best/${categorySlug}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-cpSurface border border-border rounded-lg font-medium hover:border-cpCoral/50 transition-colors"
              >
                <Award className="h-4 w-4 text-cpAmber" />
                {t("bestIn")} {country.name}
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Share Section */}
      <section className="bg-muted/30 dark:bg-cpCharcoal/30 py-8 border-t border-border">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <span className="text-sm text-muted-foreground dark:text-cpCream/70">
              {t("shareThisPage")}:
            </span>
            <div className="flex gap-2">
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-cpCoral/10 dark:border-cpAmber/30"
                asChild
              >
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    `${stats.totalPlaces} ${categoryLabel} in ${country.name}! 🐾`
                  )}&url=${encodeURIComponent(
                    `${DEFAULT_SEO_CONFIG.baseUrl}/${locale}/${countrySlug}/stats/${categorySlug}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Share2 className="h-3 w-3 mr-1" />
                  Twitter
                </a>
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-cpCoral/10 dark:border-cpAmber/30"
                asChild
              >
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    `${DEFAULT_SEO_CONFIG.baseUrl}/${locale}/${countrySlug}/stats/${categorySlug}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Share2 className="h-3 w-3 mr-1" />
                  LinkedIn
                </a>
              </Badge>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// =============================================================================
// COMPONENTS
// =============================================================================

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  highlight?: boolean;
}

function StatCard({ icon, value, label, highlight }: StatCardProps) {
  return (
    <Card
      className={`${
        highlight
          ? "bg-cpCoral/10 border-cpCoral/30 dark:bg-cpCoral/10"
          : "dark:bg-cpSurface/50"
      }`}
    >
      <CardContent className="p-4 text-center">
        <div className="flex justify-center mb-2">{icon}</div>
        <div
          className={`text-2xl md:text-3xl font-bold ${
            highlight ? "text-cpCoral" : "text-foreground dark:text-cpCream"
          }`}
        >
          {value}
        </div>
        <div className="text-sm text-muted-foreground dark:text-cpCream/70">
          {label}
        </div>
      </CardContent>
    </Card>
  );
}

interface FactCardProps {
  emoji: string;
  title: string;
  fact: string;
}

function FactCard({ emoji, title, fact }: FactCardProps) {
  return (
    <Card className="dark:bg-cpSurface/50 hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          <span className="text-2xl" role="img" aria-hidden="true">
            {emoji}
          </span>
          <div>
            <h4 className="font-semibold text-foreground dark:text-cpCream mb-1">
              {title}
            </h4>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              {fact}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
