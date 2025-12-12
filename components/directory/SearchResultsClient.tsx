"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { PlaceCard } from "./PlaceCard";
import type { SearchResult } from "@/db/queries/search";
import { useTranslations } from "next-intl";

type Place = SearchResult["places"][number];

interface SearchResultsClientProps {
  initialPlaces: Place[];
  initialHasMore: boolean;
  totalCount: number;
  locale: string;
  searchParams: {
    query?: string;
    citySlug?: string;
    countrySlug?: string;
    categorySlug?: string;
    sortBy?: string;
  };
}

export function SearchResultsClient({
  initialPlaces,
  initialHasMore,
  totalCount,
  locale,
  searchParams,
}: SearchResultsClientProps) {
  const [places, setPlaces] = useState<Place[]>(initialPlaces);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [page, setPage] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("search");

  const loadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    const nextPage = page + 1;

    try {
      const params = new URLSearchParams();
      if (searchParams.query) params.set("q", searchParams.query);
      if (searchParams.citySlug) params.set("city", searchParams.citySlug);
      if (searchParams.countrySlug) params.set("country", searchParams.countrySlug);
      if (searchParams.categorySlug) params.set("category", searchParams.categorySlug);
      if (searchParams.sortBy) params.set("sort", searchParams.sortBy);
      params.set("page", String(nextPage));
      params.set("limit", "12");

      const response = await fetch(`/api/search?${params.toString()}`);
      const data = await response.json();

      if (data.places && data.places.length > 0) {
        startTransition(() => {
          setPlaces((prev) => {
            // Deduplicate by ID to prevent React key warnings
            const existingIds = new Set(prev.map((p) => p.id));
            const newPlaces = data.places.filter((p: Place) => !existingIds.has(p.id));
            return [...prev, ...newPlaces];
          });
          setHasMore(data.hasMore);
          setPage(nextPage);
        });
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to load more results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to extract city/country from place
  const getCitySlug = (place: Place) => {
    const city = Array.isArray(place.city) ? place.city[0] : place.city;
    return city?.slug || searchParams.citySlug || "";
  };

  const getCountrySlug = (place: Place) => {
    const city = Array.isArray(place.city) ? place.city[0] : place.city;
    const country = city ? (Array.isArray(city.country) ? city.country[0] : city.country) : null;
    return country?.slug || searchParams.countrySlug || "";
  };

  return (
    <>
      {/* Results count */}
      <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
        {totalCount} {t("results")}
        {searchParams.citySlug && (
          <span> {t("in")} <span className="capitalize">{searchParams.citySlug.replace(/-/g, " ")}</span></span>
        )}
        {searchParams.categorySlug && (
          <span> • <span className="capitalize">{searchParams.categorySlug.replace(/-/g, " ")}</span></span>
        )}
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {places.map((place) => (
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
            countrySlug={getCountrySlug(place)}
            citySlug={getCitySlug(place)}
          />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            onClick={loadMore}
            disabled={isLoading || isPending}
            className="min-w-[200px]"
          >
            {isLoading || isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {t("loading")}
              </>
            ) : (
              t("loadMore")
            )}
          </Button>
        </div>
      )}
    </>
  );
}
