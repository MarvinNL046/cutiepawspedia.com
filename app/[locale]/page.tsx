/**
 * Homepage - Directory Landing Page
 *
 * CACHING STRATEGY: Static + ISR (Incremental Static Regeneration)
 * - revalidate: 300s (5 minutes) - Balances freshness with performance
 * - Data changes infrequently (countries, categories)
 * - First request serves stale, triggers background regeneration
 * - Optimal for SEO and Core Web Vitals (fast TTFB)
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SearchBar, CategoryCard, CountryCard, getCategoryIcon } from "@/components/directory";
import { SectionHeader } from "@/components/layout";
import { PageIntro } from "@/components/seo";
import { getCountries, getCategories, getPlaceCount, getCityCount, getCountryCount } from "@/db/queries";
import {
  generateSeoData,
  DEFAULT_SEO_CONFIG,
  buildHomeUrl,
  buildAlternateUrls,
  generateHomeContent,
  getLocalizedCategoryName,
  type ContentLocale,
} from "@/lib/seo";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

// ISR: Revalidate every 5 minutes for fresh content while maintaining performance
export const revalidate = 300;

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;

  const seo = await generateSeoData("home", { locale });

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonicalUrl,
      languages: buildAlternateUrls({ locale }, DEFAULT_SEO_CONFIG.supportedLocales),
    },
    openGraph: {
      title: seo.openGraph?.title ?? seo.title,
      description: seo.openGraph?.description ?? seo.description,
      url: seo.canonicalUrl,
      siteName: DEFAULT_SEO_CONFIG.siteName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  const [countries, categories, totalPlaces, totalCities] = await Promise.all([
    getCountries(),
    getCategories(),
    getPlaceCount(),
    getCityCount(),
  ]);

  const displayCategories = categories.length > 0 ? categories : defaultCategories;
  const displayCountries = countries.length > 0 ? countries : defaultCountries;

  // Generate AI content for intro
  const content = generateHomeContent({
    locale: locale as ContentLocale,
    totalCountries: countries.length || displayCountries.length,
    totalCities: totalCities || displayCountries.length * 5,
    totalPlaces: totalPlaces || 100,
    topCategories: categories.slice(0, 4).map((cat) => ({
      slug: cat.slug,
      name: cat.labelKey,
      count: Math.floor(totalPlaces / categories.length) || 10,
    })),
  });

  return (
    <>
      {/* Hero with Search */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cpPink/20 via-cpYellow/10 to-cpAqua/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,127,161,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(41,160,177,0.2),transparent_50%)]" />

        <div className="relative container mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4 bg-white/80">
              🐾 {locale === "nl" ? "De #1 Huisdierdiensten Gids" : "The #1 Pet Services Directory"}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-cpDark mb-4 tracking-tight">
              {locale === "nl" ? (
                <>Vind <span className="text-cpPink">Perfecte Zorg</span> voor je Huisdier</>
              ) : (
                <>Find <span className="text-cpPink">Perfect Care</span> for Your Pet</>
              )}
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto">
              {content.secondary || (locale === "nl"
                ? "Ontdek vertrouwde dierenpensions, dierenartsen, trimsalons en trainers bij jou in de buurt."
                : "Discover trusted pet hotels, veterinarians, groomers and trainers in your area.")}
            </p>

            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
              <SearchBar locale={locale} placeholder={locale === "nl" ? "Waar zoek je naar?" : "What are you looking for?"} />
            </div>
          </div>
        </div>
      </section>

      {/* AI-Generated Intro Content */}
      <PageIntro content={content} variant="gradient" showBullets={true} />

      {/* Categories */}
      <section className="container mx-auto max-w-6xl px-4 py-12">
        <SectionHeader title="Popular Categories" />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {displayCategories.map((category) => (
            <CategoryCard
              key={category.slug}
              href={`/${locale}/search?category=${category.slug}`}
              icon={getCategoryIcon(category.icon)}
              label={getLocalizedCategoryName(category.slug, locale as ContentLocale)}
            />
          ))}
        </div>
      </section>

      {/* Countries */}
      <section className="bg-slate-50/50">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <SectionHeader title="Browse by Country" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayCountries.map((country) => (
              <CountryCard
                key={country.slug || country.code}
                href={`/${locale}/${country.slug}`}
                code={country.code}
                name={country.name}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-cpDark py-16 text-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-4 text-center">
            {[
              { value: "10,000+", label: "Listed Businesses" },
              { value: "50+", label: "Countries" },
              { value: "100,000+", label: "Happy Pet Owners" },
              { value: "4.8", label: "Average Rating" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-bold text-cpYellow">{stat.value}</div>
                <div className="mt-2 text-slate-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto max-w-6xl px-4 py-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cpPink to-cpAqua p-8 md:p-12 text-white">
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Own a pet business?
              </h2>
              <p className="text-white/80">
                Get found by thousands of pet owners. List your business today.
              </p>
            </div>
            <Button size="lg" className="bg-white text-cpDark hover:bg-white/90 focus:ring-2 focus:ring-white/50" asChild>
              <Link href={`/${locale}/for-businesses`}>
                List Your Business
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

const defaultCategories = [
  { slug: "pet-hotels", icon: "hotel", labelKey: "Pet Hotels" },
  { slug: "veterinarians", icon: "vet", labelKey: "Veterinarians" },
  { slug: "grooming", icon: "grooming", labelKey: "Grooming" },
  { slug: "training", icon: "training", labelKey: "Training" },
  { slug: "pet-shops", icon: "shop", labelKey: "Pet Shops" },
  { slug: "dog-walking", icon: "walking", labelKey: "Dog Walking" },
];

const defaultCountries = [
  { slug: "netherlands", code: "NL", name: "Netherlands" },
  { slug: "belgium", code: "BE", name: "Belgium" },
  { slug: "germany", code: "DE", name: "Germany" },
  { slug: "france", code: "FR", name: "France" },
  { slug: "united-kingdom", code: "GB", name: "United Kingdom" },
  { slug: "spain", code: "ES", name: "Spain" },
  { slug: "italy", code: "IT", name: "Italy" },
  { slug: "united-states", code: "US", name: "United States" },
];
