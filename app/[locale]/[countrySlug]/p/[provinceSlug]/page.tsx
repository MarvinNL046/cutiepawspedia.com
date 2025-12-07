/**
 * Province/State/Region Page - Lists cities within a province
 *
 * CACHING STRATEGY: Static + ISR (Incremental Static Regeneration)
 * - revalidate: 3600s (1 hour) - Province/city data changes rarely
 * - High SEO value page, benefits from fast static serving
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  getCountryBySlug,
  getProvinceBySlugAndCountry,
  getCitiesByProvinceId,
  getCategories,
} from "@/db/queries";
import {
  getLocalizedCategoryName,
  type ContentLocale,
} from "@/lib/seo";
import { CityCard, CategoryCard, getCategoryIcon, getCountryFlag } from "@/components/directory";
import { PageHeader, SectionHeader } from "@/components/layout";
import { MapPin, Building2 } from "lucide-react";

interface ProvincePageProps {
  params: Promise<{ locale: string; countrySlug: string; provinceSlug: string }>;
}

// ISR: Province data changes infrequently, 1-hour revalidation is sufficient
export const revalidate = 3600;

export async function generateMetadata({ params }: ProvincePageProps): Promise<Metadata> {
  const { locale, countrySlug, provinceSlug } = await params;

  const [country, province] = await Promise.all([
    getCountryBySlug(countrySlug),
    getProvinceBySlugAndCountry(provinceSlug, countrySlug),
  ]);

  if (!province || !country) {
    return {
      title: provinceSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    };
  }

  const provinceName = province.name;
  const countryName = country.name;

  const labels = {
    en: {
      title: `Pet Services in ${provinceName}, ${countryName} | CutiePawsPedia`,
      description: `Find the best pet services in ${provinceName}, ${countryName}. Browse veterinarians, groomers, pet hotels, and more in ${province.cityCount || "all"} cities.`,
    },
    nl: {
      title: `Huisdierdiensten in ${provinceName}, ${countryName} | CutiePawsPedia`,
      description: `Vind de beste huisdierdiensten in ${provinceName}, ${countryName}. Bekijk dierenartsen, trimmers, dierenpensions en meer in ${province.cityCount || "alle"} steden.`,
    },
    de: {
      title: `Haustierdienste in ${provinceName}, ${countryName} | CutiePawsPedia`,
      description: `Finden Sie die besten Haustierdienste in ${provinceName}, ${countryName}. Durchsuchen Sie Tierärzte, Hundefriseure, Tierpensionen und mehr in ${province.cityCount || "allen"} Städten.`,
    },
  };

  const t = labels[locale as keyof typeof labels] || labels.en;

  return {
    title: t.title,
    description: t.description,
    openGraph: {
      title: t.title,
      description: t.description,
      type: "website",
    },
  };
}

export default async function ProvincePage({ params }: ProvincePageProps) {
  const { locale, countrySlug, provinceSlug } = await params;

  const [country, province, categories] = await Promise.all([
    getCountryBySlug(countrySlug),
    getProvinceBySlugAndCountry(provinceSlug, countrySlug),
    getCategories(),
  ]);

  if (!province || !country) {
    notFound();
  }

  const cities = await getCitiesByProvinceId(province.id);

  const provinceName = province.name;
  const countryName = country.name;
  const countryCode = country.code;

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  const labels = {
    en: {
      citiesTitle: `Cities in ${provinceName}`,
      browseByCategory: "Browse by Category",
      noCities: "No cities available yet.",
      directory: "Directory",
      totalCities: `${cities.length} cities`,
      totalPlaces: `${province.placeCount || 0} places`,
    },
    nl: {
      citiesTitle: `Steden in ${provinceName}`,
      browseByCategory: "Bekijk per Categorie",
      noCities: "Nog geen steden beschikbaar.",
      directory: "Overzicht",
      totalCities: `${cities.length} steden`,
      totalPlaces: `${province.placeCount || 0} locaties`,
    },
    de: {
      citiesTitle: `Städte in ${provinceName}`,
      browseByCategory: "Nach Kategorie durchsuchen",
      noCities: "Noch keine Städte verfügbar.",
      directory: "Verzeichnis",
      totalCities: `${cities.length} Städte`,
      totalPlaces: `${province.placeCount || 0} Orte`,
    },
  };

  const t = labels[locale as keyof typeof labels] || labels.en;

  return (
    <>
      <PageHeader
        title={locale === "nl" ? `Huisdierdiensten in ${provinceName}` : `Pet Services in ${provinceName}`}
        icon={<span className="text-4xl">{getCountryFlag(countryCode)}</span>}
        variant="gradient-aqua"
        breadcrumbs={[
          { label: t.directory, href: `/${locale}` },
          { label: countryName, href: `/${locale}/${countrySlug}` },
          { label: provinceName },
        ]}
      />

      {/* Stats Section */}
      <section className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border">
            <Building2 className="h-4 w-4 text-cpPink" />
            <span className="text-sm font-medium">{t.totalCities}</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border">
            <MapPin className="h-4 w-4 text-cpAqua" />
            <span className="text-sm font-medium">{t.totalPlaces}</span>
          </div>
          {province.code && (
            <Badge variant="outline" className="text-sm">
              {province.code}
            </Badge>
          )}
        </div>
      </section>

      {/* Cities Grid */}
      <section className="container mx-auto max-w-6xl px-4 py-8">
        <SectionHeader
          title={t.citiesTitle}
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
            <p className="text-slate-500">{t.noCities}</p>
          </div>
        )}
      </section>

      {/* Categories Section */}
      <section className="bg-slate-50/50">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <SectionHeader title={t.browseByCategory} />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {displayCategories.map((cat) => (
              <CategoryCard
                key={cat.slug}
                href={`/${locale}/${countrySlug}/p/${provinceSlug}/c/${cat.slug}`}
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
