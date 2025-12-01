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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCityBySlugAndCountry, getCategories, getTopRatedPlacesByCity } from "@/db/queries";
import { getCityMetadata } from "@/lib/seo";
import { PlaceCard } from "@/components/directory";
import { ChevronRight, MapPin, Star } from "lucide-react";

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
  const cityName = city?.name || citySlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const countryName = city?.country?.name || countrySlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-cpPink/20 to-cpYellow/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,127,161,0.2),transparent_50%)]" />
        <div className="relative container mx-auto px-4 py-12 md:py-16">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-4 flex-wrap">
            <Link href={`/${locale}`} className="hover:text-cpPink">Directory</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/${locale}/${countrySlug}`} className="hover:text-cpPink">{countryName}</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-cpDark font-medium">{cityName}</span>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <MapPin className="h-8 w-8 text-cpPink" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-cpDark">Pet Services in {cityName}</h1>
              {!city && <Badge variant="secondary" className="mt-2">Coming Soon</Badge>}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-cpDark mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {(categories.length > 0 ? categories : defaultCategories).map((cat) => (
            <Link key={cat.slug} href={`/${locale}/${countrySlug}/${citySlug}/${cat.slug}`}>
              <Card className="group hover:shadow-md hover:border-cpPink/50 transition-all h-full">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">{getCategoryIcon(cat.icon)}</div>
                  <h3 className="font-medium text-cpDark group-hover:text-cpPink transition-colors text-sm">{cat.labelKey}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {topPlaces.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-2 mb-6">
            <Star className="h-6 w-6 text-cpYellow fill-cpYellow" />
            <h2 className="text-2xl font-bold text-cpDark">Top Rated in {cityName}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} locale={locale} countrySlug={countrySlug} citySlug={citySlug} />
            ))}
          </div>
        </section>
      )}

      {topPlaces.length === 0 && (
        <section className="container mx-auto px-4 py-12">
          <div className="text-center py-16 bg-white rounded-lg border">
            <p className="text-xl text-slate-600 mb-2">No listings yet in {cityName}</p>
            <Link href={`/${locale}/for-businesses`} className="inline-block px-6 py-3 bg-cpPink hover:bg-cpPink/90 text-white font-medium rounded-lg transition-colors mt-4">
              Add Your Business
            </Link>
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

function getCategoryIcon(icon: string | null): string {
  const icons: Record<string, string> = { hotel: "🏨", vet: "🩺", grooming: "✂️", training: "🐕", shop: "🛒", walking: "🚶" };
  return icons[icon || ""] || "🐾";
}
