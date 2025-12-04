/**
 * City Page - Lists categories and top-rated places in a city
 *
 * CACHING STRATEGY: Static + ISR (Incremental Static Regeneration)
 * - revalidate: 1800s (30 minutes) - City data + top places change moderately
 * - Important landing page for local SEO
 * - Balance between freshness (new businesses) and performance
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getCityBySlugAndCountry, getCategories, getTopRatedPlacesByCity, getPlaceCountByCity } from "@/db/queries";
import {
  getCityMetadata,
  getLocalizedCategoryName,
  buildFaqJsonLd,
  type ContentLocale,
} from "@/lib/seo";
import { generateContent } from "@/lib/ai/generateContent";
import { extractFaqsFromAiContent, generateDefaultFaqs } from "@/lib/ai/faq";
import { getInternalLinksForPage } from "@/lib/internalLinks";
import { PlaceCard, CategoryCard, getCategoryIcon } from "@/components/directory";
import { PageHeader, SectionHeader } from "@/components/layout";
import { PageIntro, JsonLd, FaqStatic, InternalLinksSection } from "@/components/seo";
import { MapPin, Star } from "lucide-react";

interface CityPageProps {
  params: Promise<{ locale: string; countrySlug: string; citySlug: string }>;
}

// ISR: City pages with top places need moderate freshness, 30-minute revalidation
export const revalidate = 1800;

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { locale, countrySlug, citySlug } = await params;
  const city = await getCityBySlugAndCountry(citySlug, countrySlug);

  if (!city) {
    return {
      title: citySlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    };
  }

  const topPlaces = await getTopRatedPlacesByCity(city.id, 50);
  return getCityMetadata(city, locale, topPlaces.length);
}

export default async function CityPage({ params }: CityPageProps) {
  const { locale, countrySlug, citySlug } = await params;

  const [city, categories] = await Promise.all([
    getCityBySlugAndCountry(citySlug, countrySlug),
    getCategories(),
  ]);

  const topPlaces = city ? await getTopRatedPlacesByCity(city.id, 6) : [];
  const totalPlaces = city ? await getPlaceCountByCity(city.id) : 0;
  const cityName = city?.name || citySlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const country = Array.isArray(city?.country) ? city.country[0] : city?.country;
  const countryName = country?.name || countrySlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  // Generate AI content (cached or generated on demand)
  const { content } = await generateContent({
    type: "city",
    locale: locale as ContentLocale,
    data: {
      cityName,
      citySlug,
      countryName,
      countrySlug,
      totalPlaces: totalPlaces || topPlaces.length,
      categoryStats: categories.slice(0, 6).map((cat) => ({
        slug: cat.slug,
        name: cat.labelKey,
        count: Math.floor((totalPlaces || 10) / categories.length) || 2,
      })),
    },
  });

  // Extract FAQs from AI content or use defaults
  const aiFaqs = extractFaqsFromAiContent(content);
  const faqs = aiFaqs.length >= 2 ? aiFaqs : generateDefaultFaqs({
    type: "city",
    locale,
    cityName,
    countryName,
  });

  // Get internal links for this city page
  const internalLinks = await getInternalLinksForPage({
    pageType: "city",
    locale,
    countrySlug,
    citySlug,
    cityName,
  });

  return (
    <>
      <PageHeader
        title={locale === "nl" ? `Huisdierdiensten in ${cityName}` : `Pet Services in ${cityName}`}
        icon={<MapPin className="h-7 w-7 text-cpPink" />}
        badge={!city ? <Badge variant="secondary">{locale === "nl" ? "Binnenkort" : "Coming Soon"}</Badge> : undefined}
        variant="gradient-pink"
        breadcrumbs={[
          { label: locale === "nl" ? "Overzicht" : "Directory", href: `/${locale}` },
          { label: countryName, href: `/${locale}/${countrySlug}` },
          { label: cityName },
        ]}
      />

      {/* AI-Generated Intro Content */}
      <PageIntro content={content} variant="pink" showBullets={false} />

      <section className="container mx-auto max-w-6xl px-4 py-12">
        <SectionHeader title={locale === "nl" ? "Bekijk per Categorie" : "Browse by Category"} />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {displayCategories.map((cat) => (
            <CategoryCard
              key={cat.slug}
              href={`/${locale}/${countrySlug}/${citySlug}/${cat.slug}`}
              icon={getCategoryIcon(cat.icon)}
              label={getLocalizedCategoryName(cat.slug, locale as ContentLocale)}
            />
          ))}
        </div>
      </section>

      {topPlaces.length > 0 && (
        <section className="bg-slate-50/50">
          <div className="container mx-auto max-w-6xl px-4 py-12">
            <SectionHeader
              title={locale === "nl" ? `Hoogst Beoordeeld in ${cityName}` : `Top Rated in ${cityName}`}
              icon={<Star className="h-5 w-5 text-cpYellow fill-cpYellow" />}
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topPlaces.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  locale={locale}
                  countrySlug={countrySlug}
                  citySlug={citySlug}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {topPlaces.length === 0 && (
        <section className="container mx-auto max-w-6xl px-4 py-12">
          <div className="text-center py-16 bg-white rounded-xl border">
            <p className="text-xl text-slate-600 mb-2">
              {locale === "nl" ? `Nog geen listings in ${cityName}` : `No listings yet in ${cityName}`}
            </p>
            <Link
              href={`/${locale}/for-businesses`}
              className="inline-block px-6 py-3 bg-cpPink hover:bg-cpPink/90 text-white font-medium rounded-lg transition-colors mt-4"
            >
              {locale === "nl" ? "Voeg je Bedrijf Toe" : "Add Your Business"}
            </Link>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="container mx-auto max-w-6xl px-4 py-12">
          <FaqStatic
            faqs={faqs}
            locale={locale}
            includeJsonLd={true}
          />
        </section>
      )}

      {/* Internal Links Section */}
      {internalLinks.groups && internalLinks.groups.length > 0 && (
        <section className="bg-slate-50/50">
          <div className="container mx-auto max-w-6xl px-4 py-12">
            <InternalLinksSection
              result={internalLinks}
              variant="default"
              locale={locale}
            />
          </div>
        </section>
      )}
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
