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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCountryBySlug, getCitiesByCountrySlug, getCategories } from "@/db/queries";
import { getCountryMetadata } from "@/lib/seo";
import { ChevronRight, MapPin } from "lucide-react";

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

  const [country, cities, categories] = await Promise.all([
    getCountryBySlug(countrySlug),
    getCitiesByCountrySlug(countrySlug),
    getCategories(),
  ]);

  const countryName = country?.name || countrySlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const countryCode = country?.code || "XX";

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-cpAqua/20 to-cpPink/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(41,160,177,0.2),transparent_50%)]" />
        <div className="relative container mx-auto px-4 py-12 md:py-16">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
            <Link href={`/${locale}`} className="hover:text-cpPink">Directory</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-cpDark font-medium">{countryName}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-5xl">{getCountryFlag(countryCode)}</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-cpDark">
                Pet Services in {countryName}
              </h1>
              {!country && <Badge variant="secondary" className="mt-2">Coming Soon</Badge>}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-cpDark mb-6 flex items-center gap-2">
          <MapPin className="h-6 w-6 text-cpPink" />
          Cities in {countryName}
        </h2>

        {cities.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cities.map((city) => (
              <Link key={city.id} href={`/${locale}/${countrySlug}/${city.slug}`}>
                <Card className="group hover:shadow-md hover:border-cpPink/50 transition-all h-full">
                  <CardContent className="p-4 flex items-center justify-between">
                    <span className="font-medium text-cpDark group-hover:text-cpPink transition-colors">
                      {city.name}
                    </span>
                    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-cpPink" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border">
            <p className="text-slate-500">No cities available yet.</p>
          </div>
        )}
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-cpDark mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {(categories.length > 0 ? categories : defaultCategories).map((cat) => (
            <Card key={cat.slug} className="group hover:shadow-md hover:border-cpAqua/50 transition-all cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">{getCategoryIcon(cat.icon)}</div>
                <h3 className="font-medium text-cpDark group-hover:text-cpAqua transition-colors text-sm">
                  {cat.labelKey}
                </h3>
              </CardContent>
            </Card>
          ))}
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

function getCategoryIcon(icon: string | null): string {
  const icons: Record<string, string> = { hotel: "🏨", vet: "🩺", grooming: "✂️", training: "🐕", shop: "🛒", walking: "🚶" };
  return icons[icon || ""] || "🐾";
}

function getCountryFlag(code: string): string {
  const codePoints = code.toUpperCase().split("").map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
