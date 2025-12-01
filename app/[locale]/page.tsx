import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/directory";
import { getCountries, getCategories } from "@/db/queries";
import { ChevronRight } from "lucide-react";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export const revalidate = 300;

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  const [countries, categories] = await Promise.all([
    getCountries(),
    getCategories(),
  ]);

  return (
    <>
      {/* Hero with Search */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cpPink/20 via-cpYellow/10 to-cpAqua/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,127,161,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(41,160,177,0.2),transparent_50%)]" />

        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4 bg-white/80">
              🐾 The #1 Pet Services Directory
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-cpDark mb-4 tracking-tight">
              Find <span className="text-cpPink">Perfect Care</span> for Your Pet
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto">
              Discover trusted pet hotels, veterinarians, groomers and trainers in your area.
            </p>

            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
              <SearchBar locale={locale} placeholder="What are you looking for?" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-cpDark">Popular Categories</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {(categories.length > 0 ? categories : defaultCategories).map((category) => (
            <Card
              key={category.slug}
              className="group hover:shadow-md hover:border-cpPink/50 transition-all cursor-pointer"
            >
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2">{getCategoryIcon(category.icon)}</div>
                <h3 className="font-medium text-cpDark group-hover:text-cpPink transition-colors text-sm">
                  {category.labelKey}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Countries */}
      <section className="container mx-auto px-4 py-12 bg-slate-50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-cpDark">Browse by Country</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {(countries.length > 0 ? countries : defaultCountries).map((country) => (
            <Link key={country.slug || country.code} href={`/${locale}/${country.slug}`}>
              <Card className="group hover:shadow-md hover:border-cpAqua/50 transition-all">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getCountryFlag(country.code)}</span>
                    <span className="font-medium text-cpDark group-hover:text-cpAqua transition-colors">
                      {country.name}
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-cpAqua transition-colors" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-cpDark py-16 text-white">
        <div className="container mx-auto px-4">
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
      <section className="container mx-auto px-4 py-16">
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
            <Button size="lg" className="bg-white text-cpDark hover:bg-white/90" asChild>
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

function getCategoryIcon(icon: string | null): string {
  const icons: Record<string, string> = {
    hotel: "🏨", vet: "🩺", grooming: "✂️", training: "🐕",
    shop: "🛒", walking: "🚶", boarding: "🏠", daycare: "☀️", emergency: "🚨",
  };
  return icons[icon || ""] || "🐾";
}

function getCountryFlag(code: string): string {
  const codePoints = code.toUpperCase().split("").map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
