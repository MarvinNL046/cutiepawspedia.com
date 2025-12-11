import Link from "next/link";

// Wrapper to disable prefetch for performance (prevents 300+ RSC requests)
const OptimizedLink = ({ children, ...props }: React.ComponentProps<typeof Link>) => (
  <Link prefetch={false} {...props}>{children}</Link>
);
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Phone, Crown, CheckCircle, Sparkles } from "lucide-react";
import type { PlanKey } from "@/lib/plans/config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DrizzleRelation<T> = T | T[] | { [x: string]: any } | { [x: string]: any }[] | null | undefined;

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
    // Plan-based features (from search results)
    planKey?: PlanKey | null;
    hasFeaturedStyling?: boolean;
    planBadge?: { text: string; color: string } | null;
    placeCategories?: DrizzleRelation<{
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
  provinceSlug?: string; // Optional: for province-aware URLs
  categorySlug?: string;
  variant?: "default" | "compact" | "featured";
}

export function PlaceCard({ place, locale, countrySlug, citySlug, provinceSlug, categorySlug, variant = "default" }: PlaceCardProps) {
  // Extract categories array safely from Drizzle relation type
  const categoriesArray = (() => {
    const cats = place.placeCategories;
    if (!cats) return [];
    return Array.isArray(cats) ? cats : [cats];
  })();

  const firstCategorySlug = categoriesArray[0]?.category?.slug || "all";

  // Build URL with or without province prefix
  const cityPath = provinceSlug
    ? `/${locale}/${countrySlug}/p/${provinceSlug}/${citySlug}`
    : `/${locale}/${countrySlug}/${citySlug}`;

  const href = categorySlug
    ? `${cityPath}/${categorySlug}/${place.slug}`
    : `${cityPath}/${firstCategorySlug}/${place.slug}`;

  // Use plan-based featured styling (falls back to isPremium for backwards compatibility)
  const isFeatured = place.hasFeaturedStyling ?? place.isPremium;

  // Get plan badge color class
  const getBadgeColorClasses = (color: string) => {
    switch (color) {
      case "amber":
        return "bg-gradient-to-r from-amber-500 to-amber-400 text-white";
      case "blue":
        return "bg-gradient-to-r from-blue-500 to-blue-400 text-white";
      case "purple":
        return "bg-gradient-to-r from-purple-500 to-purple-400 text-white";
      default:
        return "bg-gradient-to-r from-slate-500 to-slate-400 text-white";
    }
  };

  // Featured card styling (PRO and above) - Cozy Theme
  const featuredStyles = isFeatured
    ? "border-cpAmber border-2 bg-gradient-to-br from-cpAmber/5 to-white dark:from-cpAmber/10 dark:to-cpSurface shadow-md ring-1 ring-cpAmber/20"
    : "bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20";

  return (
    <OptimizedLink href={href} className="block">
      <Card className={`group hover-lift hover:shadow-xl hover:shadow-cpCoral/10 dark:hover:shadow-cpCoral/20 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 rounded-2xl ${featuredStyles}`}>
        {/* Plan Badge Ribbon */}
        {place.planBadge && (
          <div className="absolute top-0 right-0 z-10">
            <div className={`text-xs font-bold px-3 py-1 flex items-center gap-1 rounded-bl-lg shadow-sm ${getBadgeColorClasses(place.planBadge.color)}`}>
              {place.planBadge.color === "amber" ? (
                <Crown className="h-3 w-3" />
              ) : (
                <Sparkles className="h-3 w-3" />
              )}
              {place.planBadge.text}
            </div>
          </div>
        )}
        {/* Fallback: Legacy Premium Ribbon (when no planBadge but isPremium) */}
        {!place.planBadge && place.isPremium && (
          <div className="absolute top-0 right-0 z-10">
            <div className="bg-gradient-to-r from-cpAmber to-amber-400 text-cpCharcoal text-xs font-bold px-3 py-1 flex items-center gap-1 rounded-bl-lg shadow-sm">
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
                <h3 className={`font-semibold line-clamp-1 group-hover:text-cpCoral transition-colors ${isFeatured ? "text-amber-900 dark:text-amber-200" : "text-foreground dark:text-cpCream"}`}>
                  {place.name}
                </h3>
                {place.isVerified && (
                  <Badge variant="secondary" className="bg-cpCoral/10 text-cpCoral border-cpCoral/30 text-xs gap-0.5">
                    <CheckCircle className="h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>
            </div>
            {/* Rating - only show if there are actual reviews */}
            {place.avgRating && Number(place.avgRating) > 0 && place.reviewCount > 0 && (
              <div className="flex items-center gap-1 text-sm shrink-0">
                <Star className="h-4 w-4 fill-cpAmber text-cpAmber" />
                <span className="font-medium text-foreground dark:text-cpCream">{Number(place.avgRating).toFixed(1)}</span>
                <span className="text-muted-foreground dark:text-cpCream/60">({place.reviewCount.toLocaleString()})</span>
              </div>
            )}
          </div>

          {/* Description */}
          {place.description && (
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 line-clamp-2 mb-3">
              {place.description}
            </p>
          )}

          {/* Info */}
          <div className="flex flex-col gap-1 text-sm text-muted-foreground dark:text-cpCream/70">
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
          {categoriesArray.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {categoriesArray.slice(0, 3).map((pc) => (
                <Badge key={pc.category?.slug || 'unknown'} variant="outline" className="text-xs">
                  {pc.category?.labelKey || ''}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </OptimizedLink>
  );
}
