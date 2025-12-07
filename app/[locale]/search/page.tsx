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
import { getActiveAdForPlacement } from "@/db/queries/ads";
import { getSearchMetadata, getLocalizedCategoryName, type ContentLocale } from "@/lib/seo";
import { PlaceCard, MapWidgetLazy as MapWidget, type MapMarker, SearchResultsClient } from "@/components/directory";
import { SearchBar } from "@/components/directory";
import { SearchTracker } from "@/components/analytics";
import { ChevronRight, Search, MapPin, Map, LayoutGrid } from "lucide-react";
import { BetweenContentAd, SearchAd } from "@/components/ads";

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
        <Card key={i} className="animate-pulse bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20">
          <CardContent className="p-4">
            <div className="h-4 bg-muted dark:bg-cpSurface rounded w-3/4 mb-2" />
            <div className="h-3 bg-muted dark:bg-cpSurface rounded w-1/2 mb-4" />
            <div className="h-20 bg-muted/50 dark:bg-cpSurface/30 rounded mb-3" />
            <div className="flex gap-2">
              <div className="h-6 bg-muted dark:bg-cpSurface rounded w-16" />
              <div className="h-6 bg-muted dark:bg-cpSurface rounded w-16" />
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
    <div className="text-center py-16 bg-card dark:bg-cpSurface/50 rounded-3xl border border-border dark:border-cpAmber/20 shadow-sm">
      <div className="category-circle mx-auto mb-6">
        <Search className="h-10 w-10 text-cpAmber" />
      </div>
      <h2 className="text-xl font-semibold text-foreground dark:text-cpCream mb-2">
        {query ? `No results for "${query}"` : "No results found"}
      </h2>
      <p className="text-muted-foreground dark:text-slate-400 mb-6 max-w-md mx-auto">
        {query
          ? "Try adjusting your search terms or filters to find what you're looking for."
          : "Try searching for pet services, locations, or categories."}
      </p>
      <div className="flex justify-center gap-3">
        <Button className="btn-coral" asChild>
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
              className="rounded-2xl shadow-sm border border-border dark:border-cpAmber/20 min-h-[400px]"
            />
          </div>
        </div>

        {/* Results List */}
        <div className="lg:order-1 space-y-4">
          <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
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
      {/* Client-side Load More component */}
      <SearchResultsClient
        initialPlaces={results.places}
        initialHasMore={results.hasMore}
        locale={locale}
        searchParams={{
          query,
          citySlug,
          countrySlug,
          categorySlug,
          sortBy,
        }}
      />
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

  // Fetch filter options and sponsor ad
  const [categories, countries, searchAd] = await Promise.all([
    getCategories(),
    getCountries(),
    getActiveAdForPlacement("search_results", locale as "en" | "nl"),
  ]);

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
      {/* Search Header - Cozy Theme */}
      <section className="relative overflow-hidden min-h-[280px] bg-secondary dark:bg-cpCharcoal">
        {/* Decorative elements */}
        <div className="absolute top-12 right-24 w-32 h-32 border-2 border-cpAmber/20 dark:border-cpAmber/10 rounded-full hidden lg:block" />
        <div className="absolute bottom-8 left-16 w-20 h-20 border-2 border-cpCoral/20 dark:border-cpCoral/10 rounded-full hidden lg:block" />

        <div className="relative container mx-auto max-w-6xl px-4 py-12 md:py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-cpCream/70 mb-6 flex-wrap">
            <Link href={`/${locale}`} className="hover:text-cpCoral transition-colors">
              Directory
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground dark:text-cpCream font-medium">Search</span>
          </div>

          <div className="flex items-start gap-4 mb-8">
            {/* Icon with category-circle styling */}
            <div className="category-circle !w-14 !h-14">
              <Search className="h-7 w-7 text-cpAmber" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground dark:text-cpCream tracking-tight">
                {searchSummary.length > 0 ? `Search: ${searchSummary.join(" in ")}` : "Search Pet Services"}
              </h1>
              <p className="text-muted-foreground dark:text-cpCream/70 mt-1">Find the best pet services near you</p>
            </div>
          </div>

          {/* Search Form with cozy styling */}
          <div className="max-w-2xl">
            <div className="cozy-card rounded-3xl p-4 shadow-lg">
              <SearchBar locale={locale} initialQuery={query} initialLocation={citySlug} />
            </div>
          </div>
        </div>
      </section>

      {/* Filters Bar - Cozy Theme */}
      <section className="sticky top-16 z-40 bg-card/95 dark:bg-cpSurface/95 backdrop-blur-lg border-b border-border dark:border-cpAmber/20 shadow-sm">
        <div className="container mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Badge
                  variant={!categorySlug ? "default" : "outline"}
                  className={!categorySlug ? "bg-cpCoral text-white" : "cursor-pointer hover:bg-cpCoral/10 hover:border-cpCoral/40"}
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
                    className={categorySlug === cat.slug ? "bg-cpCoral text-white" : "cursor-pointer hover:bg-cpCoral/10 hover:border-cpCoral/40"}
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
                <span className="text-sm text-muted-foreground dark:text-cpCream/70">Sort:</span>
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
                        ? "bg-cpAmber text-cpCharcoal"
                        : "cursor-pointer hover:bg-cpAmber/10 hover:border-cpAmber/40"
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
              <div className="flex items-center border-l border-border dark:border-cpAmber/20 pl-4 gap-1">
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

      {/* Search Results - Cozy Background */}
      <section className="bg-background dark:bg-cpCharcoal">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          {/* Sponsor Ad - High intent placement */}
          <SearchAd sponsorAd={searchAd} className="mb-6" />

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

          {/* Ad: Between search results and countries (for non-logged-in users) */}
          <BetweenContentAd className="mt-8" />
        </div>
      </section>

      {/* Popular Countries - Cozy Theme */}
      {countries.length > 0 && (
        <section className="bg-secondary dark:bg-cpCharcoal">
          <div className="container mx-auto max-w-6xl px-4 py-12 pb-16">
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-1.5 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 text-cpCoral text-sm font-medium mb-4">
                Explore
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream tracking-tight">Browse by Country</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {countries.map((country) => (
                <Link key={country.slug} href={`/${locale}/${country.slug}`}>
                  <Badge
                    variant="outline"
                    className="hover:bg-cpCoral/10 hover:border-cpCoral dark:hover:bg-cpCoral/20 transition-all duration-300 cursor-pointer py-2.5 px-4 text-sm hover:-translate-y-0.5 border-border dark:border-cpAmber/20"
                  >
                    <MapPin className="h-3.5 w-3.5 mr-1.5 text-cpCoral" />
                    {country.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
