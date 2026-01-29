/**
 * City vs City Comparison Page
 *
 * Compares pet services between two cities for a specific category.
 * Example URL: /nl/netherlands/compare/amsterdam-vs-rotterdam/veterinary
 *
 * CACHING STRATEGY: Static + ISR (Incremental Static Regeneration)
 * - revalidate: 3600s (1 hour) - Comparison data is relatively stable
 * - SEO-focused page with structured data for search engines
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getCityComparisonData,
} from "@/db/queries";
import { getLocalizedCategoryName, type ContentLocale, getBaseUrl } from "@/lib/seo";
import { PageHeader, SectionHeader } from "@/components/layout";
import { getCategoryIcon } from "@/components/directory";
import {
  MapPin,
  Star,
  TrendingUp,
  Trophy,
  CheckCircle2,
  Building2,
  MessageSquare,
  ArrowRight,
  Scale,
} from "lucide-react";

interface ComparisonPageProps {
  params: Promise<{
    locale: string;
    countrySlug: string;
    comparison: string;
    categorySlug: string;
  }>;
}

// ISR: Comparison data doesn't change frequently, 1-hour revalidation
// Pages are generated on-demand and cached - no static generation to avoid build timeouts
export const revalidate = 86400;

/**
 * Parse the city slugs from the URL parameter
 */
function parseCitySlugs(param: string): { city1Slug: string; city2Slug: string } | null {
  const parts = param.split("-vs-");
  if (parts.length !== 2) return null;
  return { city1Slug: parts[0], city2Slug: parts[1] };
}

/**
 * Generate SEO metadata for the comparison page
 */
export async function generateMetadata({ params }: ComparisonPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { locale, countrySlug } = resolvedParams;
  const cityParam = resolvedParams.comparison;
  const categorySlug = resolvedParams.categorySlug;

  const citySlugs = parseCitySlugs(cityParam);
  if (!citySlugs) {
    return { title: "Comparison" };
  }

  const t = await getTranslations({ locale, namespace: "comparison" });
  const categoryName = getLocalizedCategoryName(categorySlug, locale as ContentLocale);
  const year = new Date().getFullYear();

  // Format city names from slugs
  const city1Name = citySlugs.city1Slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  const city2Name = citySlugs.city2Slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const title = t("metaTitle", {
    category: categoryName,
    city1: city1Name,
    city2: city2Name,
    year: year.toString(),
  });

  const description = t("metaDescription", {
    category: categoryName.toLowerCase(),
    city1: city1Name,
    city2: city2Name,
  });

  const canonicalUrl = `${getBaseUrl()}/${locale}/${countrySlug}/compare/${cityParam}/${categorySlug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        nl: `${getBaseUrl()}/nl/${countrySlug}/compare/${cityParam}/${categorySlug}`,
        en: `${getBaseUrl()}/en/${countrySlug}/compare/${cityParam}/${categorySlug}`,
        de: `${getBaseUrl()}/de/${countrySlug}/compare/${cityParam}/${categorySlug}`,
        fr: `${getBaseUrl()}/fr/${countrySlug}/compare/${cityParam}/${categorySlug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "CutiePawsPedia",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ComparisonPage({ params }: ComparisonPageProps) {
  const resolvedParams = await params;
  const { locale, countrySlug } = resolvedParams;
  const cityParam = resolvedParams.comparison;
  const categorySlug = resolvedParams.categorySlug;

  const citySlugs = parseCitySlugs(cityParam);
  if (!citySlugs) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "comparison" });

  // Get comparison data
  const comparisonData = await getCityComparisonData(
    citySlugs.city1Slug,
    citySlugs.city2Slug,
    countrySlug,
    categorySlug
  );

  if (!comparisonData) {
    notFound();
  }

  const { city1, city2, city1TopPlaces, city2TopPlaces } = comparisonData;
  const categoryName = getLocalizedCategoryName(categorySlug, locale as ContentLocale);
  const categoryIcon = getCategoryIcon(categorySlug);
  const year = new Date().getFullYear();

  // Determine winner based on multiple factors
  const city1Score = calculateCityScore(city1);
  const city2Score = calculateCityScore(city2);
  const winner =
    city1Score > city2Score ? "city1" : city2Score > city1Score ? "city2" : "tie";
  const winnerCity = winner === "city1" ? city1 : winner === "city2" ? city2 : null;

  // Generate intro content (static template for now)
  const introContent = generateComparisonIntro({
    locale: locale as ContentLocale,
    categoryName,
    city1Name: city1.cityName,
    city2Name: city2.cityName,
    city1Stats: city1,
    city2Stats: city2,
  });

  // Build JSON-LD structured data
  const jsonLd = buildComparisonJsonLd({
    locale,
    countrySlug,
    categorySlug,
    categoryName,
    city1,
    city2,
    year,
  });

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Page Header */}
      <PageHeader
        title={t("title", {
          category: categoryName,
          city1: city1.cityName,
          city2: city2.cityName,
          year: year.toString(),
        })}
        subtitle={t("subtitle")}
        badge={<Badge className="bg-cpCoral text-white">{t("badge")}</Badge>}
        icon={<Scale className="h-8 w-8 text-cpCoral" />}
        variant="gradient-pink"
        breadcrumbs={[
          { label: "Directory", href: `/${locale}` },
          { label: countrySlug.charAt(0).toUpperCase() + countrySlug.slice(1), href: `/${locale}/${countrySlug}` },
          { label: `${city1.cityName} vs ${city2.cityName}` },
        ]}
      />

      {/* Intro Content */}
      {introContent && (
        <section className="container mx-auto max-w-6xl px-4 py-8">
          <div className="bg-white rounded-xl border p-6 prose prose-slate max-w-none">
            <div dangerouslySetInnerHTML={{ __html: introContent }} />
          </div>
        </section>
      )}

      {/* Stats Comparison Section */}
      <section className="container mx-auto max-w-6xl px-4 py-8">
        <SectionHeader title={t("statistics")} icon={<TrendingUp className="h-6 w-6 text-cpCoral" />} />

        <div className="grid md:grid-cols-2 gap-6">
          {/* City 1 Stats Card */}
          <CityStatsCard
            city={city1}
            t={t}
            isWinner={winner === "city1"}
          />

          {/* City 2 Stats Card */}
          <CityStatsCard
            city={city2}
            t={t}
            isWinner={winner === "city2"}
          />
        </div>
      </section>

      {/* Visual Comparison */}
      <section className="bg-slate-50 dark:bg-cpSurface/50">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <SectionHeader title={t("comparison")} icon={<Scale className="h-6 w-6 text-cpAmber" />} />

          <div className="bg-white dark:bg-cpSurface rounded-xl border overflow-hidden">
            <ComparisonTable city1={city1} city2={city2} t={t} />
          </div>
        </div>
      </section>

      {/* Top Places Side by Side */}
      <section className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* City 1 Top Places */}
          <div>
            <SectionHeader
              title={t("topRated", { count: city1TopPlaces.length, city: city1.cityName })}
              icon={<span className="text-2xl">{categoryIcon}</span>}
            />
            {city1TopPlaces.length > 0 ? (
              <div className="space-y-4">
                {city1TopPlaces.map((place, index) => (
                  <TopPlaceCard
                    key={place.id}
                    place={place}
                    rank={index + 1}
                    locale={locale}
                    countrySlug={countrySlug}
                    citySlug={city1.citySlug}
                    categorySlug={categorySlug}
                  />
                ))}
              </div>
            ) : (
              <EmptyPlaces categoryName={categoryName} t={t} />
            )}
            <div className="mt-4">
              <Link href={`/${locale}/${countrySlug}/${city1.citySlug}/${categorySlug}`}>
                <Button variant="outline" className="w-full">
                  {t("viewAll", { category: categoryName, city: city1.cityName })}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* City 2 Top Places */}
          <div>
            <SectionHeader
              title={t("topRated", { count: city2TopPlaces.length, city: city2.cityName })}
              icon={<span className="text-2xl">{categoryIcon}</span>}
            />
            {city2TopPlaces.length > 0 ? (
              <div className="space-y-4">
                {city2TopPlaces.map((place, index) => (
                  <TopPlaceCard
                    key={place.id}
                    place={place}
                    rank={index + 1}
                    locale={locale}
                    countrySlug={countrySlug}
                    citySlug={city2.citySlug}
                    categorySlug={categorySlug}
                  />
                ))}
              </div>
            ) : (
              <EmptyPlaces categoryName={categoryName} t={t} />
            )}
            <div className="mt-4">
              <Link href={`/${locale}/${countrySlug}/${city2.citySlug}/${categorySlug}`}>
                <Button variant="outline" className="w-full">
                  {t("viewAll", { category: categoryName, city: city2.cityName })}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Verdict Section */}
      <section className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/10">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <Card className="bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Trophy className="h-6 w-6 text-cpAmber" />
                {t("verdictTitle", { category: categoryName.toLowerCase() })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {winner === "tie" ? (
                  <p className="text-lg text-slate-600">
                    {t("verdictTie", { category: categoryName.toLowerCase() })}
                  </p>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-cpCoral text-white text-lg px-4 py-2">
                        {t("winner")}: {winnerCity?.cityName}
                      </Badge>
                    </div>
                    <p className="text-lg text-slate-600">
                      {winner === "city1"
                        ? t("verdictCity1Wins", {
                            city1: city1.cityName,
                            category: categoryName.toLowerCase(),
                          })
                        : t("verdictCity2Wins", {
                            city2: city2.cityName,
                            category: categoryName.toLowerCase(),
                          })}
                    </p>
                    <ul className="space-y-2 mt-4">
                      {getWinReasons(city1, city2, winner, t).map((reason, i) => (
                        <li key={i} className="flex items-center gap-2 text-slate-600">
                          <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto max-w-6xl px-4 py-12">
        <SectionHeader
          title={t("faqTitle", {
            category: categoryName.toLowerCase(),
            city1: city1.cityName,
            city2: city2.cityName,
          })}
        />
        <div className="space-y-4">
          <FaqItem
            question={t("faq1Question", { category: categoryName.toLowerCase() })}
            answer={t("faq1Answer", {
              city1: city1.cityName,
              count1: city1.totalPlaces.toString(),
              city2: city2.cityName,
              count2: city2.totalPlaces.toString(),
              category: categoryName.toLowerCase(),
            })}
          />
          <FaqItem
            question={t("faq2Question", { category: categoryName.toLowerCase() })}
            answer={t("faq2Answer", {
              category: categoryName.toLowerCase(),
              winner: winnerCity?.cityName || city1.cityName,
              rating: (winnerCity?.avgRating || city1.avgRating || 0).toFixed(1),
            })}
          />
          <FaqItem
            question={t("faq3Question", { category: categoryName.toLowerCase() })}
            answer={t("faq3Answer", {
              city1: city1.cityName,
              verified1: city1.verifiedCount.toString(),
              city2: city2.cityName,
              verified2: city2.verifiedCount.toString(),
            })}
          />
        </div>
      </section>
    </>
  );
}

// =============================================================================
// HELPER COMPONENTS
// =============================================================================

interface CityStatsCardProps {
  city: {
    cityName: string;
    citySlug: string;
    totalPlaces: number;
    avgRating: number | null;
    totalReviews: number;
    premiumCount: number;
    verifiedCount: number;
  };
  t: (key: string, values?: Record<string, string>) => string;
  isWinner: boolean;
}

function CityStatsCard({
  city,
  t,
  isWinner,
}: CityStatsCardProps) {
  return (
    <Card className={`relative ${isWinner ? "ring-2 ring-cpCoral" : ""}`}>
      {isWinner && (
        <div className="absolute -top-3 right-4">
          <Badge className="bg-cpCoral text-white">
            <Trophy className="h-3 w-3 mr-1" />
            {t("winner")}
          </Badge>
        </div>
      )}
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-cpCoral" />
          {city.cityName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <StatItem
            icon={<Building2 className="h-4 w-4" />}
            label={t("places")}
            value={city.totalPlaces.toString()}
          />
          <StatItem
            icon={<Star className="h-4 w-4 fill-cpAmber text-cpAmber" />}
            label={t("avgRating")}
            value={city.avgRating ? city.avgRating.toFixed(1) : t("noRating")}
          />
          <StatItem
            icon={<MessageSquare className="h-4 w-4" />}
            label={t("totalReviews")}
            value={city.totalReviews.toString()}
          />
          <StatItem
            icon={<CheckCircle2 className="h-4 w-4 text-green-500" />}
            label={t("verifiedBusinesses")}
            value={city.verifiedCount.toString()}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function StatItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-cpSurface/50 rounded-lg">
      {icon}
      <div>
        <div className="text-sm text-slate-500">{label}</div>
        <div className="font-semibold text-lg">{value}</div>
      </div>
    </div>
  );
}

interface ComparisonTableProps {
  city1: {
    cityName: string;
    totalPlaces: number;
    avgRating: number | null;
    totalReviews: number;
    premiumCount: number;
    verifiedCount: number;
  };
  city2: {
    cityName: string;
    totalPlaces: number;
    avgRating: number | null;
    totalReviews: number;
    premiumCount: number;
    verifiedCount: number;
  };
  t: (key: string) => string;
}

function ComparisonTable({ city1, city2, t }: ComparisonTableProps) {
  const rows = [
    {
      label: t("places"),
      city1Value: city1.totalPlaces,
      city2Value: city2.totalPlaces,
      winner: city1.totalPlaces > city2.totalPlaces ? 1 : city2.totalPlaces > city1.totalPlaces ? 2 : 0,
    },
    {
      label: t("avgRating"),
      city1Value: city1.avgRating?.toFixed(1) || "-",
      city2Value: city2.avgRating?.toFixed(1) || "-",
      winner:
        (city1.avgRating || 0) > (city2.avgRating || 0)
          ? 1
          : (city2.avgRating || 0) > (city1.avgRating || 0)
          ? 2
          : 0,
    },
    {
      label: t("totalReviews"),
      city1Value: city1.totalReviews,
      city2Value: city2.totalReviews,
      winner:
        city1.totalReviews > city2.totalReviews ? 1 : city2.totalReviews > city1.totalReviews ? 2 : 0,
    },
    {
      label: t("premiumBusinesses"),
      city1Value: city1.premiumCount,
      city2Value: city2.premiumCount,
      winner:
        city1.premiumCount > city2.premiumCount ? 1 : city2.premiumCount > city1.premiumCount ? 2 : 0,
    },
    {
      label: t("verifiedBusinesses"),
      city1Value: city1.verifiedCount,
      city2Value: city2.verifiedCount,
      winner:
        city1.verifiedCount > city2.verifiedCount
          ? 1
          : city2.verifiedCount > city1.verifiedCount
          ? 2
          : 0,
    },
  ];

  return (
    <table className="w-full">
      <thead className="bg-slate-100 dark:bg-cpSurface">
        <tr>
          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600 dark:text-cpCream/70">
            Metric
          </th>
          <th className="px-4 py-3 text-center text-sm font-semibold text-slate-600 dark:text-cpCream/70">
            {city1.cityName}
          </th>
          <th className="px-4 py-3 text-center text-sm font-semibold text-slate-600 dark:text-cpCream/70">
            {city2.cityName}
          </th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {rows.map((row, index) => (
          <tr key={index} className="hover:bg-slate-50 dark:hover:bg-cpSurface/30">
            <td className="px-4 py-3 text-sm text-slate-600 dark:text-cpCream/80">{row.label}</td>
            <td
              className={`px-4 py-3 text-center font-medium ${
                row.winner === 1 ? "text-cpCoral bg-cpCoral/10" : ""
              }`}
            >
              {row.city1Value}
              {row.winner === 1 && <Trophy className="inline h-4 w-4 ml-1 text-cpAmber" />}
            </td>
            <td
              className={`px-4 py-3 text-center font-medium ${
                row.winner === 2 ? "text-cpCoral bg-cpCoral/10" : ""
              }`}
            >
              {row.city2Value}
              {row.winner === 2 && <Trophy className="inline h-4 w-4 ml-1 text-cpAmber" />}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

interface TopPlaceCardProps {
  place: {
    id: number;
    slug: string;
    name: string;
    description: string | null;
    avgRating: string | null;
    reviewCount: number;
    isPremium: boolean;
    isVerified: boolean;
    address: string | null;
  };
  rank: number;
  locale: string;
  countrySlug: string;
  citySlug: string;
  categorySlug: string;
}

function TopPlaceCard({
  place,
  rank,
  locale,
  countrySlug,
  citySlug,
  categorySlug,
}: TopPlaceCardProps) {
  return (
    <Link
      href={`/${locale}/${countrySlug}/${citySlug}/${categorySlug}/${place.slug}`}
      className="block"
    >
      <div className="flex items-start gap-4 p-4 bg-white dark:bg-cpSurface rounded-xl border hover:shadow-md transition-shadow">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-cpCoral/10 text-cpCoral font-bold shrink-0">
          #{rank}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-foreground truncate">{place.name}</h3>
            {place.isVerified && (
              <Badge variant="secondary" className="text-xs">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}
            {place.isPremium && (
              <Badge className="bg-cpAmber text-white text-xs">Premium</Badge>
            )}
          </div>
          {place.address && (
            <p className="text-sm text-slate-500 mt-1 truncate">{place.address}</p>
          )}
          <div className="flex items-center gap-2 mt-2">
            {place.avgRating && (
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-cpAmber text-cpAmber" />
                <span className="font-medium">{parseFloat(place.avgRating).toFixed(1)}</span>
              </div>
            )}
            <span className="text-sm text-slate-500">({place.reviewCount} reviews)</span>
          </div>
        </div>
        <ArrowRight className="h-5 w-5 text-slate-400 shrink-0" />
      </div>
    </Link>
  );
}

function EmptyPlaces({
  categoryName,
  t,
}: {
  categoryName: string;
  t: (key: string, values?: Record<string, string>) => string;
}) {
  return (
    <div className="text-center py-8 bg-slate-50 rounded-xl">
      <p className="text-slate-500">{t("noPlaces", { category: categoryName.toLowerCase() })}</p>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="bg-white dark:bg-cpSurface rounded-xl border p-6">
      <h3 className="font-semibold text-foreground mb-2">{question}</h3>
      <p className="text-slate-600 dark:text-cpCream/70">{answer}</p>
    </div>
  );
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function calculateCityScore(city: {
  totalPlaces: number;
  avgRating: number | null;
  totalReviews: number;
  verifiedCount: number;
}): number {
  // Weighted scoring: rating (40%), places (25%), reviews (20%), verified (15%)
  const ratingScore = (city.avgRating || 0) * 8; // Max ~40
  const placesScore = Math.min(city.totalPlaces, 100) * 0.25; // Max 25
  const reviewsScore = Math.min(city.totalReviews, 500) * 0.04; // Max 20
  const verifiedScore = Math.min(city.verifiedCount, 50) * 0.3; // Max 15

  return ratingScore + placesScore + reviewsScore + verifiedScore;
}

function getWinReasons(
  city1: { avgRating: number | null; totalPlaces: number; totalReviews: number; verifiedCount: number },
  city2: { avgRating: number | null; totalPlaces: number; totalReviews: number; verifiedCount: number },
  winner: "city1" | "city2" | "tie",
  t: (key: string) => string
): string[] {
  const reasons: string[] = [];

  if (winner === "tie") return reasons;

  const winnerCity = winner === "city1" ? city1 : city2;
  const loserCity = winner === "city1" ? city2 : city1;

  if ((winnerCity.avgRating || 0) > (loserCity.avgRating || 0)) {
    reasons.push(t("higherRating"));
  }
  if (winnerCity.totalPlaces > loserCity.totalPlaces) {
    reasons.push(t("moreOptions"));
  }
  if (winnerCity.totalReviews > loserCity.totalReviews) {
    reasons.push(t("moreReviews"));
  }
  if (winnerCity.verifiedCount > loserCity.verifiedCount) {
    reasons.push(t("moreVerified"));
  }

  return reasons;
}

// =============================================================================
// JSON-LD SCHEMA
// =============================================================================

interface ComparisonJsonLdParams {
  locale: string;
  countrySlug: string;
  categorySlug: string;
  categoryName: string;
  city1: { cityName: string; totalPlaces: number; avgRating: number | null };
  city2: { cityName: string; totalPlaces: number; avgRating: number | null };
  year: number;
}

function buildComparisonJsonLd(params: ComparisonJsonLdParams): object[] {
  const baseUrl = getBaseUrl();
  const pageUrl = `${baseUrl}/${params.locale}/${params.countrySlug}/compare/${params.city1.cityName.toLowerCase().replace(/ /g, "-")}-vs-${params.city2.cityName.toLowerCase().replace(/ /g, "-")}/${params.categorySlug}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `${params.categoryName} ${params.city1.cityName} vs ${params.city2.cityName}: Comparison ${params.year}`,
      description: `Compare ${params.categoryName.toLowerCase()} in ${params.city1.cityName} and ${params.city2.cityName}`,
      url: pageUrl,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: params.city1.cityName,
            description: `${params.city1.totalPlaces} ${params.categoryName.toLowerCase()} with average rating ${params.city1.avgRating?.toFixed(1) || "N/A"}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: params.city2.cityName,
            description: `${params.city2.totalPlaces} ${params.categoryName.toLowerCase()} with average rating ${params.city2.avgRating?.toFixed(1) || "N/A"}`,
          },
        ],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: params.countrySlug.charAt(0).toUpperCase() + params.countrySlug.slice(1),
          item: `${baseUrl}/${params.locale}/${params.countrySlug}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: `${params.city1.cityName} vs ${params.city2.cityName}`,
          item: pageUrl,
        },
      ],
    },
  ];
}

// =============================================================================
// INTRO CONTENT GENERATOR
// =============================================================================

interface ComparisonIntroParams {
  locale: ContentLocale;
  categoryName: string;
  city1Name: string;
  city2Name: string;
  city1Stats: { totalPlaces: number; avgRating: number | null; totalReviews: number };
  city2Stats: { totalPlaces: number; avgRating: number | null; totalReviews: number };
}

function generateComparisonIntro(params: ComparisonIntroParams): string {
  const { locale, categoryName, city1Name, city2Name, city1Stats, city2Stats } = params;
  const category = categoryName.toLowerCase();

  const totalPlaces = city1Stats.totalPlaces + city2Stats.totalPlaces;
  const totalReviews = city1Stats.totalReviews + city2Stats.totalReviews;

  const introTemplates: Record<ContentLocale, string> = {
    nl: `<p>Ben je op zoek naar de beste ${category} en twijfel je tussen ${city1Name} en ${city2Name}? In deze uitgebreide vergelijking analyseren we het aanbod van beide steden. Met in totaal ${totalPlaces} ${category} en ${totalReviews} reviews hebben we alle informatie verzameld om je te helpen de juiste keuze te maken.</p>
<p>${city1Name} heeft ${city1Stats.totalPlaces} ${category}${city1Stats.avgRating ? ` met een gemiddelde beoordeling van ${city1Stats.avgRating.toFixed(1)}` : ''}, terwijl ${city2Name} ${city2Stats.totalPlaces} ${category}${city2Stats.avgRating ? ` heeft met een gemiddelde van ${city2Stats.avgRating.toFixed(1)}` : ' heeft'}. Hieronder vind je alle details om een weloverwogen beslissing te maken.</p>`,

    en: `<p>Looking for the best ${category} and deciding between ${city1Name} and ${city2Name}? In this comprehensive comparison, we analyze the offerings of both cities. With a total of ${totalPlaces} ${category} and ${totalReviews} reviews, we've gathered all the information to help you make the right choice.</p>
<p>${city1Name} has ${city1Stats.totalPlaces} ${category}${city1Stats.avgRating ? ` with an average rating of ${city1Stats.avgRating.toFixed(1)}` : ''}, while ${city2Name} has ${city2Stats.totalPlaces} ${category}${city2Stats.avgRating ? ` with an average of ${city2Stats.avgRating.toFixed(1)}` : ''}. Below you'll find all the details to make an informed decision.</p>`,

    de: `<p>Suchen Sie die besten ${category} und sind unschlussig zwischen ${city1Name} und ${city2Name}? In diesem umfassenden Vergleich analysieren wir das Angebot beider Stadte. Mit insgesamt ${totalPlaces} ${category} und ${totalReviews} Bewertungen haben wir alle Informationen gesammelt, um Ihnen bei der richtigen Wahl zu helfen.</p>
<p>${city1Name} hat ${city1Stats.totalPlaces} ${category}${city1Stats.avgRating ? ` mit einer Durchschnittsbewertung von ${city1Stats.avgRating.toFixed(1)}` : ''}, wahrend ${city2Name} ${city2Stats.totalPlaces} ${category}${city2Stats.avgRating ? ` mit einem Durchschnitt von ${city2Stats.avgRating.toFixed(1)}` : ''} hat. Unten finden Sie alle Details fur eine fundierte Entscheidung.</p>`,

    fr: `<p>Vous recherchez les meilleurs ${category} et hesitez entre ${city1Name} et ${city2Name} ? Dans cette comparaison complete, nous analysons les offres des deux villes. Avec un total de ${totalPlaces} ${category} et ${totalReviews} avis, nous avons rassemble toutes les informations pour vous aider a faire le bon choix.</p>
<p>${city1Name} compte ${city1Stats.totalPlaces} ${category}${city1Stats.avgRating ? ` avec une note moyenne de ${city1Stats.avgRating.toFixed(1)}` : ''}, tandis que ${city2Name} en compte ${city2Stats.totalPlaces}${city2Stats.avgRating ? ` avec une moyenne de ${city2Stats.avgRating.toFixed(1)}` : ''}. Ci-dessous, vous trouverez tous les details pour prendre une decision eclairee.</p>`,
  };

  return introTemplates[locale] || introTemplates.en;
}
