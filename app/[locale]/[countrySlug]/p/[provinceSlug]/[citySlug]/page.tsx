/**
 * City Page (Province Route) - Lists categories and top-rated places in a city
 * URL: /[locale]/[countrySlug]/p/[provinceSlug]/[citySlug]
 *
 * This is the province-aware version of the city page, showing the full hierarchy.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  getCityBySlugAndProvince,
  getProvinceBySlugAndCountry,
  getCategories,
  getTopRatedPlacesByCity,
  getPlaceCountByCity,
} from "@/db/queries";
import {
  getCityMetadata,
  getLocalizedCategoryName,
  type ContentLocale,
} from "@/lib/seo";
import { generateContent } from "@/lib/ai/generateContent";
import { extractFaqsFromAiContent, generateDefaultFaqs } from "@/lib/ai/faq";
import { getInternalLinksForPage } from "@/lib/internalLinks";
import { PlaceCard, CategoryCard, getCategoryIcon, CityPlacesSection } from "@/components/directory";
import { PageHeader, SectionHeader } from "@/components/layout";
import { PageIntro, FaqStatic, InternalLinksSection } from "@/components/seo";
import { MapPin, Star } from "lucide-react";
import { BetweenContentAd } from "@/components/ads";

interface CityPageProps {
  params: Promise<{
    locale: string;
    countrySlug: string;
    provinceSlug: string;
    citySlug: string;
  }>;
}

export const revalidate = 1800;

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { locale, countrySlug, provinceSlug, citySlug } = await params;
  const city = await getCityBySlugAndProvince(citySlug, provinceSlug, countrySlug);

  if (!city) {
    return {
      title: citySlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    };
  }

  const topPlaces = await getTopRatedPlacesByCity(city.id, 50);
  return getCityMetadata(city, locale, topPlaces.length);
}

export default async function CityPage({ params }: CityPageProps) {
  const { locale, countrySlug, provinceSlug, citySlug } = await params;

  const [province, categories] = await Promise.all([
    getProvinceBySlugAndCountry(provinceSlug, countrySlug),
    getCategories(),
  ]);

  if (!province) {
    notFound();
  }

  const city = await getCityBySlugAndProvince(citySlug, provinceSlug, countrySlug);

  if (!city) {
    notFound();
  }

  const topPlaces = await getTopRatedPlacesByCity(city.id, 12);
  const totalPlaces = await getPlaceCountByCity(city.id);

  const cityName = city.name;
  const provinceName = province.name;
  const country = Array.isArray(city.country) ? city.country[0] : city.country;
  const countryName = country?.name || countrySlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  // Generate AI content
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

  // Extract FAQs
  const aiFaqs = extractFaqsFromAiContent(content);
  const faqs = aiFaqs.length >= 2 ? aiFaqs : generateDefaultFaqs({
    type: "city",
    locale,
    cityName,
    countryName,
  });

  // Get internal links
  const internalLinks = await getInternalLinksForPage({
    pageType: "city",
    locale,
    countrySlug,
    citySlug,
    cityName,
  });

  // Build province-aware URLs
  const baseUrl = `/${locale}/${countrySlug}/p/${provinceSlug}/${citySlug}`;

  return (
    <>
      <PageHeader
        title={locale === "nl" ? `Huisdierdiensten in ${cityName}` : `Pet Services in ${cityName}`}
        icon={<MapPin className="h-7 w-7 text-cpCoral" />}
        variant="gradient-pink"
        breadcrumbs={[
          { label: locale === "nl" ? "Overzicht" : "Directory", href: `/${locale}` },
          { label: countryName, href: `/${locale}/${countrySlug}` },
          { label: provinceName, href: `/${locale}/${countrySlug}/p/${provinceSlug}` },
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
              href={`${baseUrl}/${cat.slug}`}
              icon={getCategoryIcon(cat.icon)}
              label={getLocalizedCategoryName(cat.slug, locale as ContentLocale)}
            />
          ))}
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4">
        <BetweenContentAd />
      </section>

      {topPlaces.length > 0 && (
        <section className="bg-slate-50/50">
          <div className="container mx-auto max-w-6xl px-4 py-12">
            <CityPlacesSection
              initialPlaces={topPlaces}
              cityId={city.id}
              totalPlaces={totalPlaces}
              locale={locale}
              countrySlug={countrySlug}
              citySlug={citySlug}
              provinceSlug={provinceSlug}
              title={locale === "nl" ? `Alle locaties in ${cityName}` : `All locations in ${cityName}`}
            />
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
              className="inline-block px-6 py-3 bg-cpCoral hover:bg-cpCoral/90 text-white font-medium rounded-lg transition-colors mt-4"
            >
              {locale === "nl" ? "Voeg je Bedrijf Toe" : "Add Your Business"}
            </Link>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="container mx-auto max-w-6xl px-4 py-12">
          <FaqStatic faqs={faqs} locale={locale} includeJsonLd={true} />
        </section>
      )}

      {/* Internal Links Section */}
      {internalLinks.groups && internalLinks.groups.length > 0 && (
        <section className="bg-slate-50/50">
          <div className="container mx-auto max-w-6xl px-4 py-12">
            <InternalLinksSection result={internalLinks} variant="default" locale={locale} />
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
