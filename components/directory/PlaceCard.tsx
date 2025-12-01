import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Phone, Crown, CheckCircle } from "lucide-react";

interface PlaceCardProps {
  place: {
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
    placeCategories?: Array<{
      category: {
        slug: string;
        labelKey: string;
        icon?: string | null;
      };
    }>;
  };
  locale: string;
  countrySlug: string;
  citySlug: string;
  categorySlug?: string;
  variant?: "default" | "compact" | "featured";
}

export function PlaceCard({ place, locale, countrySlug, citySlug, categorySlug, variant = "default" }: PlaceCardProps) {
  const href = categorySlug
    ? `/${locale}/${countrySlug}/${citySlug}/${categorySlug}/${place.slug}`
    : `/${locale}/${countrySlug}/${citySlug}/${place.placeCategories?.[0]?.category.slug || "all"}/${place.slug}`;

  // Premium card styling
  const premiumStyles = place.isPremium
    ? "border-cpYellow border-2 bg-gradient-to-br from-cpYellow/5 to-white shadow-md ring-1 ring-cpYellow/20"
    : "";

  return (
    <Link href={href}>
      <Card className={`group hover:shadow-lg transition-all relative overflow-hidden ${premiumStyles}`}>
        {/* Premium Ribbon */}
        {place.isPremium && (
          <div className="absolute top-0 right-0 z-10">
            <div className="bg-gradient-to-r from-cpYellow to-amber-400 text-white text-xs font-bold px-3 py-1 transform rotate-0 flex items-center gap-1 rounded-bl-lg shadow-sm">
              <Crown className="h-3 w-3" />
              Featured
            </div>
          </div>
        )}

        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className={`font-semibold line-clamp-1 group-hover:text-cpPink transition-colors ${place.isPremium ? "text-amber-900" : "text-cpDark"}`}>
                  {place.name}
                </h3>
                {place.isVerified && (
                  <Badge variant="secondary" className="bg-cpAqua/20 text-cpAqua border-cpAqua text-xs gap-0.5">
                    <CheckCircle className="h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>
            </div>
            {/* Rating */}
            {place.avgRating && Number(place.avgRating) > 0 && (
              <div className="flex items-center gap-1 text-sm shrink-0">
                <Star className="h-4 w-4 fill-cpYellow text-cpYellow" />
                <span className="font-medium">{Number(place.avgRating).toFixed(1)}</span>
                <span className="text-slate-400">({place.reviewCount})</span>
              </div>
            )}
          </div>

          {/* Description */}
          {place.description && (
            <p className="text-sm text-slate-600 line-clamp-2 mb-3">
              {place.description}
            </p>
          )}

          {/* Info */}
          <div className="flex flex-col gap-1 text-sm text-slate-500">
            {place.address && (
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" />
                <span className="line-clamp-1">{place.address}</span>
              </div>
            )}
            {place.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5" />
                <span>{place.phone}</span>
              </div>
            )}
          </div>

          {/* Categories */}
          {place.placeCategories && place.placeCategories.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {place.placeCategories.slice(0, 3).map((pc) => (
                <Badge key={pc.category.slug} variant="outline" className="text-xs">
                  {pc.category.labelKey}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
