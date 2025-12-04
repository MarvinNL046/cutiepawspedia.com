/**
 * Search Page - Dynamic search results with filters
 *
 * CACHING STRATEGY: Force Dynamic (no caching)
 * - dynamic = "force-dynamic" - Results depend on query parameters
 * - Each search query produces unique results
 * - fetchCache = "default-no-store" - Fresh data for every request
 * - Suspense boundary provides loading state
 */

import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { searchPlaces, getCategories, getCountries } from "@/db/queries";
import { getSearchMetadata, getLocalizedCategoryName, type ContentLocale } from "@/lib/seo";
import { PlaceCard, MapWidgetLazy as MapWidget, type MapMarker } from "@/components/directory";
import { SearchBar } from "@/components/directory";
import { SearchTracker } from "@/components/analytics";
import { ChevronRight, Search, MapPin, Map, LayoutGrid } from "lucide-react";

interface SearchPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    q?: string;
    city?: string;
    country?: string;
    category?: string;
    sort?: string;
    page?: string;
    map?: string;
  }>;
}

// Dynamic: Search results depend on query params, must be fresh
export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

export async function generateMetadata({ params, searchParams }: SearchPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { q: query, city: citySlug, category: categorySlug } = await searchParams;
  return getSearchMetadata(locale, query, citySlug, categorySlug);
}

// Loading skeleton component
function SearchSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardContent className="p-4">
            <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-slate-200 rounded w-1/2 mb-4" />
            <div className="h-20 bg-slate-100 rounded mb-3" />
            <div className="flex gap-2">
              <div className="h-6 bg-slate-200 rounded w-16" />
              <div className="h-6 bg-slate-200 rounded w-16" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// No results component
function NoResults({ query }: { query?: string }) {
  return (
    <div className="text-center py-16 bg-white rounded-lg border">
      <Search className="h-16 w-16 text-slate-300 mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-cpDark mb-2">
        {query ? `No results for "${query}"` : "No results found"}
      </h2>
      <p className="text-slate-500 mb-6 max-w-md mx-auto">
        {query
          ? "Try adjusting your search terms or filters to find what you're looking for."
          : "Try searching for pet services, locations, or categories."}
      </p>
      <div className="flex justify-center gap-3">
        <Button variant="outline" asChild>
          <Link href="/">Browse All</Link>
        </Button>
      </div>
    </div>
  );
}

// Search results component
async function SearchResults({
  locale,
  query,
  citySlug,
  countrySlug,
  categorySlug,
  sortBy,
  page,
  showMap,
}: {
  locale: string;
  query?: string;
  citySlug?: string;
  countrySlug?: string;
  categorySlug?: string;
  sortBy?: string;
  page: number;
  showMap: boolean;
}) {
  const limit = showMap ? 50 : 12; // Load more for map view
  const offset = (page - 1) * limit;

  const results = await searchPlaces({
    query,
    citySlug,
    countrySlug,
    categorySlug,
    limit,
    offset,
    sortBy: (sortBy as "relevance" | "rating" | "name" | "newest") || "relevance",
    premiumFirst: true,
  });

  if (results.places.length === 0) {
    return <NoResults query={query} />;
  }

  // Convert places to map markers
  const markers: MapMarker[] = results.places
    .filter((p) => p.lat !== null && p.lng !== null)
    .map((p) => ({
      id: p.id,
      lat: Number(p.lat),
      lng: Number(p.lng),
      name: p.name,
      slug: p.slug,
      category: p.categories[0]?.labelKey,
      isPremium: p.isPremium,
    }));

  if (showMap) {
    return (
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Analytics Tracker */}
        <SearchTracker
          query={query}
          category={categorySlug}
          city={citySlug}
          country={countrySlug}
          sortBy={sortBy}
          resultCount={results.places.length}
          viewMode="map"
          page={page}
        />
        {/* Map View */}
        <div className="lg:order-2">
          <div className="sticky top-36">
            <MapWidget
              markers={markers}
              height="calc(100vh - 200px)"
              className="rounded-xl shadow-sm border min-h-[400px]"
            />
          </div>
        </div>

        {/* Results List */}
        <div className="lg:order-1 space-y-4">
          <p className="text-sm text-slate-500 mb-4">
            {results.places.length} results{markers.length > 0 && ` (${markers.length} on map)`}
          </p>
          {results.places.map((place) => (
            <PlaceCard
              key={place.id}
              place={{
                id: place.id,
                slug: place.slug,
                name: place.name,
                description: place.description,
                address: place.address,
                avgRating: place.avgRating,
                reviewCount: place.reviewCount,
                isPremium: place.isPremium,
                isVerified: place.isVerified,
                placeCategories: place.categories.map((c) => ({
                  category: { slug: c.slug, labelKey: c.labelKey, icon: c.icon },
                })),
              }}
              locale={locale}
              countrySlug={(() => { const city = Array.isArray(place.city) ? place.city[0] : place.city; const country = Array.isArray(city?.country) ? city.country[0] : city?.country; return country?.slug || countrySlug || ""; })()}
              citySlug={(() => { const city = Array.isArray(place.city) ? place.city[0] : place.city; return city?.slug || citySlug || ""; })()}
            />
          ))}

          {/* Pagination */}
          {results.hasMore && (
            <div className="flex justify-center pt-4">
              <Button variant="outline" asChild>
                <Link
                  href={`/${locale}/search?${new URLSearchParams({
                    ...(query && { q: query }),
                    ...(citySlug && { city: citySlug }),
                    ...(countrySlug && { country: countrySlug }),
                    ...(categorySlug && { category: categorySlug }),
                    ...(sortBy && { sort: sortBy }),
                    map: "true",
                    page: String(page + 1),
                  }).toString()}`}
                >
                  Load More Results
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Analytics Tracker */}
      <SearchTracker
        query={query}
        category={categorySlug}
        city={citySlug}
        country={countrySlug}
        sortBy={sortBy}
        resultCount={results.places.length}
        viewMode="grid"
        page={page}
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.places.map((place) => (
          <PlaceCard
            key={place.id}
            place={{
              id: place.id,
              slug: place.slug,
              name: place.name,
              description: place.description,
              address: place.address,
              avgRating: place.avgRating,
              reviewCount: place.reviewCount,
              isPremium: place.isPremium,
              isVerified: place.isVerified,
              placeCategories: place.categories.map((c) => ({
                category: { slug: c.slug, labelKey: c.labelKey, icon: c.icon },
              })),
            }}
            locale={locale}
            countrySlug={(() => { const city = Array.isArray(place.city) ? place.city[0] : place.city; const country = Array.isArray(city?.country) ? city.country[0] : city?.country; return country?.slug || countrySlug || ""; })()}
            citySlug={(() => { const city = Array.isArray(place.city) ? place.city[0] : place.city; return city?.slug || citySlug || ""; })()}
          />
        ))}
      </div>

      {/* Pagination */}
      {results.hasMore && (
        <div className="flex justify-center mt-8">
          <Button variant="outline" asChild>
            <Link
              href={`/${locale}/search?${new URLSearchParams({
                ...(query && { q: query }),
                ...(citySlug && { city: citySlug }),
                ...(countrySlug && { country: countrySlug }),
                ...(categorySlug && { category: categorySlug }),
                ...(sortBy && { sort: sortBy }),
                page: String(page + 1),
              }).toString()}`}
            >
              Load More Results
            </Link>
          </Button>
        </div>
      )}
    </>
  );
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
  const { locale } = await params;
  const {
    q: query,
    city: citySlug,
    country: countrySlug,
    category: categorySlug,
    sort: sortBy,
    page: pageStr,
    map: mapView,
  } = await searchParams;

  const page = parseInt(pageStr || "1", 10) || 1;
  const showMap = mapView === "true";

  // Fetch filter options
  const [categories, countries] = await Promise.all([getCategories(), getCountries()]);

  // Build search summary
  const searchSummary = [];
  if (query) searchSummary.push(`"${query}"`);
  if (categorySlug) {
    searchSummary.push(getLocalizedCategoryName(categorySlug, locale as ContentLocale));
  }
  if (citySlug) searchSummary.push(citySlug.replace(/-/g, " "));
  if (countrySlug) searchSummary.push(countrySlug.replace(/-/g, " "));

  return (
    <>
      {/* Search Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cpAqua/10 via-white to-cpPink/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(41,160,177,0.1),transparent_50%)]" />
        <div className="relative container mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-4 flex-wrap">
            <Link href={`/${locale}`} className="hover:text-cpPink transition-colors">
              Directory
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-cpDark font-medium">Search</span>
          </div>

          <div className="flex items-start gap-4 mb-8">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <Search className="h-8 w-8 text-cpAqua" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-cpDark tracking-tight">
                {searchSummary.length > 0 ? `Search: ${searchSummary.join(" in ")}` : "Search Pet Services"}
              </h1>
              <p className="text-slate-600 mt-1">Find the best pet services near you</p>
            </div>
          </div>

          {/* Search Form */}
          <div className="max-w-2xl">
            <SearchBar locale={locale} initialQuery={query} />
          </div>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="sticky top-16 z-40 bg-white border-b shadow-sm">
        <div className="container mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Badge
                  variant={!categorySlug ? "default" : "outline"}
                  className={!categorySlug ? "bg-cpPink" : "cursor-pointer hover:bg-cpPink/10"}
                  asChild
                >
                  <Link
                    href={`/${locale}/search?${new URLSearchParams({
                      ...(query && { q: query }),
                      ...(citySlug && { city: citySlug }),
                      ...(countrySlug && { country: countrySlug }),
                      ...(sortBy && { sort: sortBy }),
                    }).toString()}`}
                  >
                    All Categories
                  </Link>
                </Badge>
                {categories.slice(0, 5).map((cat) => (
                  <Badge
                    key={cat.slug}
                    variant={categorySlug === cat.slug ? "default" : "outline"}
                    className={categorySlug === cat.slug ? "bg-cpPink" : "cursor-pointer hover:bg-cpPink/10"}
                    asChild
                  >
                    <Link
                      href={`/${locale}/search?${new URLSearchParams({
                        ...(query && { q: query }),
                        ...(citySlug && { city: citySlug }),
                        ...(countrySlug && { country: countrySlug }),
                        category: cat.slug,
                        ...(sortBy && { sort: sortBy }),
                      }).toString()}`}
                    >
                      {getLocalizedCategoryName(cat.slug, locale as ContentLocale)}
                    </Link>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Sort Options & View Toggle */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">Sort:</span>
                {[
                  { value: "relevance", label: "Relevance" },
                  { value: "rating", label: "Rating" },
                  { value: "name", label: "Name" },
                  { value: "newest", label: "Newest" },
                ].map((option) => (
                  <Badge
                    key={option.value}
                    variant={(sortBy || "relevance") === option.value ? "default" : "outline"}
                    className={
                      (sortBy || "relevance") === option.value
                        ? "bg-cpAqua"
                        : "cursor-pointer hover:bg-cpAqua/10"
                    }
                    asChild
                  >
                    <Link
                      href={`/${locale}/search?${new URLSearchParams({
                        ...(query && { q: query }),
                        ...(citySlug && { city: citySlug }),
                        ...(countrySlug && { country: countrySlug }),
                        ...(categorySlug && { category: categorySlug }),
                        sort: option.value,
                        ...(showMap && { map: "true" }),
                      }).toString()}`}
                    >
                      {option.label}
                    </Link>
                  </Badge>
                ))}
              </div>
              <div className="flex items-center border-l pl-4 gap-1">
                <Button
                  variant={showMap ? "ghost" : "secondary"}
                  size="icon"
                  className="h-8 w-8"
                  asChild
                >
                  <Link
                    href={`/${locale}/search?${new URLSearchParams({
                      ...(query && { q: query }),
                      ...(citySlug && { city: citySlug }),
                      ...(countrySlug && { country: countrySlug }),
                      ...(categorySlug && { category: categorySlug }),
                      ...(sortBy && { sort: sortBy }),
                    }).toString()}`}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant={showMap ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  asChild
                >
                  <Link
                    href={`/${locale}/search?${new URLSearchParams({
                      ...(query && { q: query }),
                      ...(citySlug && { city: citySlug }),
                      ...(countrySlug && { country: countrySlug }),
                      ...(categorySlug && { category: categorySlug }),
                      ...(sortBy && { sort: sortBy }),
                      map: "true",
                    }).toString()}`}
                  >
                    <Map className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="container mx-auto max-w-6xl px-4 py-8">
        <Suspense fallback={<SearchSkeleton />}>
          <SearchResults
            locale={locale}
            query={query}
            citySlug={citySlug}
            countrySlug={countrySlug}
            categorySlug={categorySlug}
            sortBy={sortBy}
            page={page}
            showMap={showMap}
          />
        </Suspense>
      </section>

      {/* Popular Countries */}
      {countries.length > 0 && (
        <section className="container mx-auto max-w-6xl px-4 py-8 pb-16">
          <h2 className="text-xl font-bold text-cpDark mb-4 tracking-tight">Browse by Country</h2>
          <div className="flex flex-wrap gap-2">
            {countries.map((country) => (
              <Link key={country.slug} href={`/${locale}/${country.slug}`}>
                <Badge
                  variant="outline"
                  className="hover:bg-cpPink/10 hover:border-cpPink transition-colors cursor-pointer py-2 px-3"
                >
                  <MapPin className="h-3 w-3 mr-1" />
                  {country.name}
                </Badge>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
