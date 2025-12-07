"use client";

import { useState } from "react";
import { PlaceCard } from "./PlaceCard";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronDown } from "lucide-react";
import type { PlanKey } from "@/lib/plans/config";

interface Place {
  id: number;
  slug: string;
  name: string;
  description?: string | null;
  address?: string | null;
  phone?: string | null;
  avgRating?: string | null;
  reviewCount: number;
  isVerified: boolean;
  isPremium: boolean;
  planKey?: PlanKey | null;
  hasFeaturedStyling?: boolean;
  planBadge?: { text: string; color: string } | null;
  placeCategories?: Array<{
    category: {
      slug: string;
      labelKey: string;
      icon?: string | null;
    };
  }>;
}

interface CityPlacesSectionProps {
  initialPlaces: Place[];
  cityId: number;
  totalPlaces: number;
  locale: string;
  countrySlug: string;
  citySlug: string;
  provinceSlug?: string;
  title: string;
}

export function CityPlacesSection({
  initialPlaces,
  cityId,
  totalPlaces,
  locale,
  countrySlug,
  citySlug,
  provinceSlug,
  title,
}: CityPlacesSectionProps) {
  const [places, setPlaces] = useState<Place[]>(initialPlaces);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialPlaces.length < totalPlaces);

  const loadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/places/by-city?cityId=${cityId}&offset=${places.length}&limit=12`
      );

      if (!response.ok) throw new Error("Failed to load");

      const data = await response.json();
      setPlaces((prev) => [...prev, ...data.places]);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Error loading more places:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const showingText =
    locale === "nl"
      ? `${places.length} van ${totalPlaces} locaties`
      : `${places.length} of ${totalPlaces} locations`;

  const loadMoreText = locale === "nl" ? "Meer laden" : "Load more";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-cpDark">{title}</h2>
        <span className="text-sm text-slate-500">{showingText}</span>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {places.map((place) => (
          <PlaceCard
            key={place.id}
            place={place}
            locale={locale}
            countrySlug={countrySlug}
            citySlug={citySlug}
            provinceSlug={provinceSlug}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={loadMore}
            disabled={isLoading}
            variant="outline"
            size="lg"
            className="min-w-[200px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {locale === "nl" ? "Laden..." : "Loading..."}
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                {loadMoreText}
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
