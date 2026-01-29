/**
 * Category Page (Province Route) - Lists places in a specific category within a city
 * URL: /[locale]/[countrySlug]/p/[provinceSlug]/[citySlug]/[categorySlug]
 *
 * This is the province-aware version of the category page, showing the full hierarchy.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getCityBySlugAndProvince,
  getProvinceBySlugAndCountry,
  getCategoryBySlug,
  getPlacesByCityAndCategory,
} from "@/db/queries";
import { getCategoryMetadata, getLocalizedCategoryName, type ContentLocale } from "@/lib/seo";
import { generateContent } from "@/lib/ai/generateContent";
import { extractFaqsFromAiContent, generateDefaultFaqs } from "@/lib/ai/faq";
import { getInternalLinksForPage } from "@/lib/internalLinks";
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PlaceCard, CategoryCard, getCategoryIcon } from "@/components/directory";
import { CategoryAffiliateBlockLazy as CategoryAffiliateBlock } from "@/components/affiliate";
import { PageHeader, SectionHeader } from "@/components/layout";
import { PageIntro, FaqStatic, InternalLinksSection } from "@/components/seo";
import { Filter, SlidersHorizontal } from "lucide-react";
import { InFeedAd, DirectorySidebarAd } from "@/components/ads";
import { getActiveAdForPlacement } from "@/db/queries/ads";

interface CategoryPageProps {
  params: Promise<{
    locale: string;
    countrySlug: string;
    provinceSlug: string;
    citySlug: string;
    categorySlug: string;
  }>;
}

// ISR: Optimized to 1 hour to reduce Vercel costs (was 300s)
export const revalidate = 86400;

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { locale, countrySlug, provinceSlug, citySlug, categorySlug } = await params;
  setRequestLocale(locale);

  const [province, category] = await Promise.all([
    getProvinceBySlugAndCountry(provinceSlug, countrySlug),
    getCategoryBySlug(categorySlug),
  ]);

  if (!province) {
    return {
      title: `${categorySlug.replace(/-/g, " ")} in ${citySlug.replace(/-/g, " ")}`.replace(/\b\w/g, (c) => c.toUpperCase()),
    };
  }

  const city = await getCityBySlugAndProvince(citySlug, provinceSlug, countrySlug);

  if (!city || !category) {
    return {
      title: `${categorySlug.replace(/-/g, " ")} in ${citySlug.replace(/-/g, " ")}`.replace(/\b\w/g, (c) => c.toUpperCase()),
    };
  }

  const places = await getPlacesByCityAndCategory(city.id, category.id, { limit: 1 });
  return getCategoryMetadata(category, city, locale, places.length);
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { locale, countrySlug, provinceSlug, citySlug, categorySlug } = await params;

  const t = await getTranslations("categoryPages");

  const [province, category] = await Promise.all([
    getProvinceBySlugAndCountry(provinceSlug, countrySlug),
    getCategoryBySlug(categorySlug),
  ]);

  if (!province) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-12 text-center">
        <p className="text-slate-500">{t("notFound", { category: "Province", location: "" }).replace(" in ", "")}</p>
      </div>
    );
  }

  const city = await getCityBySlugAndProvince(citySlug, provinceSlug, countrySlug);

  if (!city) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-12 text-center">
        <p className="text-slate-500">{t("notFound", { category: "City", location: "" }).replace(" in ", "")}</p>
      </div>
    );
  }

  const [places, directorySponsorAd] = await Promise.all([
    category
      ? getPlacesByCityAndCategory(city.id, category.id, { limit: 50, premiumFirst: true })
      : Promise.resolve([]),
    getActiveAdForPlacement("directory_sidebar", locale as "en" | "nl"),
  ]);

  const cityName = city.name;
  const provinceName = province.name;
  const country = Array.isArray(city.country) ? city.country[0] : city.country;
  const countryName = country?.name || countrySlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const categoryName = getLocalizedCategoryName(categorySlug, locale as ContentLocale);
  const categoryIcon = getCategoryIcon(category?.icon || categorySlug);

  // Generate AI content
  const { content } = await generateContent({
    type: "combo",
    locale: locale as ContentLocale,
    data: {
      categoryName,
      categorySlug,
      cityName,
      citySlug,
      countryName,
      countrySlug,
      totalPlaces: places.length,
    },
  });

  // Extract FAQs
  const aiFaqs = extractFaqsFromAiContent(content);
  const faqs = aiFaqs.length >= 2 ? aiFaqs : generateDefaultFaqs({
    type: "combo",
    locale,
    categoryName,
    cityName,
    countryName,
  });

  // Get internal links
  const internalLinks = await getInternalLinksForPage({
    pageType: "combo",
    locale,
    countrySlug,
    citySlug,
    categorySlug,
    categoryName,
    cityName,
  });

  // Build province-aware URLs
  const baseUrl = `/${locale}/${countrySlug}/p/${provinceSlug}/${citySlug}`;

  return (
    <>
      <PageHeader
        title={`${categoryName} in ${cityName}`}
        subtitle={`${places.length} results found`}
        icon={<span className="text-3xl">{categoryIcon}</span>}
        variant="gradient-yellow"
        breadcrumbs={[
          { label: t("directory"), href: `/${locale}` },
          { label: countryName, href: `/${locale}/${countrySlug}` },
          { label: provinceName, href: `/${locale}/${countrySlug}/p/${provinceSlug}` },
          { label: cityName, href: baseUrl },
          { label: categoryName },
        ]}
      />

      {/* AI-Generated Intro Content */}
      <PageIntro content={content} variant="yellow" showBullets={false} />

      {/* Sticky Filter Bar */}
      <section className="sticky top-16 z-40 bg-white border-b shadow-sm">
        <div className="container mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <Badge variant="secondary" className="hidden sm:inline-flex">Premium First</Badge>
            </div>
            <Button variant="ghost" size="sm" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Sort
            </Button>
          </div>
        </div>
      </section>

      {/* Sponsor Ad - Featured placement before listings */}
      {directorySponsorAd && (
        <section className="container mx-auto max-w-6xl px-4 pt-6">
          <DirectorySidebarAd sponsorAd={directorySponsorAd} />
        </section>
      )}

      {/* Places Grid */}
      <section className="container mx-auto max-w-6xl px-4 py-8">
        {places.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {places.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                locale={locale}
                countrySlug={countrySlug}
                citySlug={citySlug}
                provinceSlug={provinceSlug}
                categorySlug={categorySlug}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border">
            <div className="text-5xl mb-4">{categoryIcon}</div>
            <p className="text-xl text-slate-600 mb-2">
              {t("notFound", { category: categoryName.toLowerCase(), location: cityName })}
            </p>
            <Link
              href={`/${locale}/for-businesses`}
              className="inline-block px-6 py-3 bg-cpCoral hover:bg-cpCoral/90 text-white font-medium rounded-lg transition-colors mt-4"
            >
              {t("addYourBusiness")}
            </Link>
          </div>
        )}
      </section>

      {/* Affiliate Recommendations */}
      <section className="container mx-auto max-w-6xl px-4 py-6">
        <CategoryAffiliateBlock categorySlug={categorySlug} variant="banner" countrySlug={countrySlug} />
      </section>

      {/* Ad: In-feed (anonymous users only) */}
      <section className="container mx-auto max-w-6xl px-4 py-4">
        <InFeedAd />
      </section>

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="container mx-auto max-w-6xl px-4 py-12">
          <FaqStatic faqs={faqs} locale={locale} includeJsonLd={true} />
        </section>
      )}

      {/* Internal Links Section */}
      {internalLinks.groups && internalLinks.groups.length > 0 && (
        <section className="container mx-auto max-w-6xl px-4 py-8">
          <InternalLinksSection result={internalLinks} variant="default" locale={locale} />
        </section>
      )}

      {/* Other Categories */}
      <section className="bg-slate-50/50">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <SectionHeader title={t("otherCategories", { location: cityName })} />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {defaultCategories
              .filter((c) => c.slug !== categorySlug)
              .map((cat) => (
                <CategoryCard
                  key={cat.slug}
                  href={`${baseUrl}/${cat.slug}`}
                  icon={getCategoryIcon(cat.icon)}
                  label={getLocalizedCategoryName(cat.slug, locale as ContentLocale)}
                  variant="compact"
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
