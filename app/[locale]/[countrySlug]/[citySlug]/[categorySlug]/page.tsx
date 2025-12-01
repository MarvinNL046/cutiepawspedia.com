import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCityBySlugAndCountry, getCategoryBySlug, getPlacesByCitySlugAndCategorySlug } from "@/db/queries";
import { PlaceCard } from "@/components/directory";
import { ChevronRight, Filter, SlidersHorizontal } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{ locale: string; countrySlug: string; citySlug: string; categorySlug: string }>;
}

export const revalidate = 300;

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { locale, countrySlug, citySlug, categorySlug } = await params;

  const [city, category, places] = await Promise.all([
    getCityBySlugAndCountry(citySlug, countrySlug),
    getCategoryBySlug(categorySlug),
    getPlacesByCitySlugAndCategorySlug(citySlug, countrySlug, categorySlug, { limit: 50, premiumFirst: true }),
  ]);

  const cityName = city?.name || citySlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const countryName = city?.country?.name || countrySlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const categoryName = category?.labelKey || categorySlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const categoryIcon = getCategoryIcon(category?.icon || categorySlug);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-cpYellow/20 to-cpAqua/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,209,102,0.2),transparent_50%)]" />
        <div className="relative container mx-auto px-4 py-12 md:py-16">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-4 flex-wrap">
            <Link href={`/${locale}`} className="hover:text-cpPink">Directory</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/${locale}/${countrySlug}`} className="hover:text-cpPink">{countryName}</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/${locale}/${countrySlug}/${citySlug}`} className="hover:text-cpPink">{cityName}</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-cpDark font-medium">{categoryName}</span>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm text-3xl">{categoryIcon}</div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-cpDark">{categoryName} in {cityName}</h1>
              <p className="text-slate-600 mt-1">{places.length} results found</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sticky top-16 z-40 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2"><Filter className="h-4 w-4" />Filters</Button>
              <Badge variant="secondary" className="hidden sm:inline-flex">Premium First</Badge>
            </div>
            <Button variant="ghost" size="sm" className="gap-2"><SlidersHorizontal className="h-4 w-4" />Sort</Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        {places.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {places.map((place) => (
              <PlaceCard key={place.id} place={place} locale={locale} countrySlug={countrySlug} citySlug={citySlug} categorySlug={categorySlug} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg border">
            <div className="text-5xl mb-4">{categoryIcon}</div>
            <p className="text-xl text-slate-600 mb-2">No {categoryName.toLowerCase()} found in {cityName}</p>
            <Link href={`/${locale}/for-businesses`} className="inline-block px-6 py-3 bg-cpPink hover:bg-cpPink/90 text-white font-medium rounded-lg transition-colors mt-4">
              Add Your Business
            </Link>
          </div>
        )}
      </section>

      <section className="container mx-auto px-4 py-8 pb-16">
        <h2 className="text-xl font-bold text-cpDark mb-4">Other Categories in {cityName}</h2>
        <div className="flex flex-wrap gap-2">
          {defaultCategories.filter((c) => c.slug !== categorySlug).map((cat) => (
            <Link key={cat.slug} href={`/${locale}/${countrySlug}/${citySlug}/${cat.slug}`}>
              <Badge variant="outline" className="hover:bg-cpPink/10 hover:border-cpPink transition-colors cursor-pointer py-2 px-3">
                {getCategoryIcon(cat.icon)} {cat.labelKey}
              </Badge>
            </Link>
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
  const icons: Record<string, string> = { hotel: "🏨", "pet-hotels": "🏨", vet: "🩺", veterinarians: "🩺", grooming: "✂️", training: "🐕", shop: "🛒", "pet-shops": "🛒", walking: "🚶", "dog-walking": "🚶" };
  return icons[icon || ""] || "🐾";
}
