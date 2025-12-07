/**
 * Country Page - Lists cities within a country
 *
 * CACHING STRATEGY: Static + ISR (Incremental Static Regeneration)
 * - revalidate: 3600s (1 hour) - Country/city data changes rarely
 * - High SEO value page, benefits from fast static serving
 * - generateStaticParams could pre-render top countries at build time
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getCountryBySlug, getCitiesByCountrySlug, getProvincesByCountrySlug, getCategories, getPlaceCount } from "@/db/queries";
import {
  getCountryMetadata,
  getLocalizedCategoryName,
  type ContentLocale,
} from "@/lib/seo";
import { generateContent } from "@/lib/ai/generateContent";
import { CityCard, ProvinceCard, CategoryCard, getCategoryIcon, getCountryFlag } from "@/components/directory";
import { PageHeader, SectionHeader } from "@/components/layout";
import { PageIntro } from "@/components/seo";
import { MapPin, Map } from "lucide-react";

interface CountryPageProps {
  params: Promise<{ locale: string; countrySlug: string }>;
}

// ISR: Country data changes infrequently, 1-hour revalidation is sufficient
export const revalidate = 3600;

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const { locale, countrySlug } = await params;
  const [country, cities] = await Promise.all([
    getCountryBySlug(countrySlug),
    getCitiesByCountrySlug(countrySlug),
  ]);

  if (!country) {
    return {
      title: countrySlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    };
  }

  return getCountryMetadata(country, locale, cities.length);
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { locale, countrySlug } = await params;

  const [country, cities, provinces, categories, totalPlaces] = await Promise.all([
    getCountryBySlug(countrySlug),
    getCitiesByCountrySlug(countrySlug),
    getProvincesByCountrySlug(countrySlug),
    getCategories(),
    getPlaceCount(),
  ]);

  const countryName = country?.name || countrySlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const countryCode = country?.code || "XX";

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  // Generate AI content (cached or generated on demand)
  const { content } = await generateContent({
    type: "country",
    locale: locale as ContentLocale,
    data: {
      countryName,
      countrySlug,
      totalCities: cities.length,
      totalPlaces: totalPlaces || cities.length * 10,
      topCategories: categories.slice(0, 5).map((cat) => ({
        slug: cat.slug,
        name: cat.labelKey,
        count: Math.floor((totalPlaces || 100) / categories.length) || 10,
      })),
    },
  });

  return (
    <>
      <PageHeader
        title={locale === "nl" ? `Huisdierdiensten in ${countryName}` : `Pet Services in ${countryName}`}
        icon={<span className="text-4xl">{getCountryFlag(countryCode)}</span>}
        badge={!country ? <Badge variant="secondary">{locale === "nl" ? "Binnenkort" : "Coming Soon"}</Badge> : undefined}
        variant="gradient-aqua"
        breadcrumbs={[
          { label: locale === "nl" ? "Overzicht" : "Directory", href: `/${locale}` },
          { label: countryName },
        ]}
      />

      {/* AI-Generated Intro Content */}
      <PageIntro content={content} variant="aqua" showBullets={false} />

      {/* Provinces Section (if available) */}
      {provinces.length > 0 && (
        <section className="container mx-auto max-w-6xl px-4 py-12">
          <SectionHeader
            title={locale === "nl" ? `Provincies in ${countryName}` : `Provinces in ${countryName}`}
            icon={<Map className="h-5 w-5 text-cpAqua" />}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {provinces.map((province) => (
              <ProvinceCard
                key={province.id}
                href={`/${locale}/${countrySlug}/p/${province.slug}`}
                name={province.name}
                code={province.code}
                cityCount={province.cityCount}
                placeCount={province.placeCount}
              />
            ))}
          </div>
        </section>
      )}

      {/* Cities Section */}
      <section className="container mx-auto max-w-6xl px-4 py-12">
        <SectionHeader
          title={locale === "nl" ? `Steden in ${countryName}` : `Cities in ${countryName}`}
          icon={<MapPin className="h-5 w-5 text-cpPink" />}
        />

        {cities.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cities.map((city) => (
              <CityCard
                key={city.id}
                href={`/${locale}/${countrySlug}/${city.slug}`}
                name={city.name}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border">
            <p className="text-slate-500">{locale === "nl" ? "Nog geen steden beschikbaar." : "No cities available yet."}</p>
          </div>
        )}
      </section>

      <section className="bg-slate-50/50">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <SectionHeader title={locale === "nl" ? "Bekijk per Categorie" : "Browse by Category"} />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {displayCategories.map((cat) => (
              <CategoryCard
                key={cat.slug}
                href={`/${locale}/${countrySlug}/c/${cat.slug}`}
                icon={getCategoryIcon(cat.icon)}
                label={getLocalizedCategoryName(cat.slug, locale as ContentLocale)}
              />
            ))}
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
