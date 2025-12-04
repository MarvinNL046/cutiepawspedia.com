import { Metadata } from "next";
import Link from "next/link";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId } from "@/db/queries";
import { getRecentViewsForUser } from "@/db/queries/recentViews";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Star, CheckCircle, Crown } from "lucide-react";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import { getFavoritePlaceIdsForUser } from "@/db/queries/favorites";

export const metadata: Metadata = {
  title: "Recently Viewed | CutiePawsPedia",
  description: "View your recently visited pet care places.",
};

interface RecentViewsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function RecentViewsPage({ params }: RecentViewsPageProps) {
  const { locale } = await params;

  // Get authenticated user
  const stackUser = await stackServerApp?.getUser();
  if (!stackUser) {
    return null; // Layout will redirect
  }

  const dbUser = await getUserByStackAuthId(stackUser.id);
  if (!dbUser) {
    return null; // Layout will redirect
  }

  // Fetch recent views and favorites with RLS context
  const [recentViews, favoritePlaceIds] = await Promise.all([
    getRecentViewsForUser(dbUser, 20),
    getFavoritePlaceIdsForUser(dbUser),
  ]);

  const favoriteSet = new Set(favoritePlaceIds);

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-cpAqua/10 rounded-lg">
            <Clock className="h-6 w-6 text-cpAqua" />
          </div>
          <h1 className="text-2xl font-bold text-cpDark">Recently Viewed</h1>
        </div>
        <p className="text-slate-600">
          {recentViews.length === 0
            ? "You haven't viewed any places yet. Start exploring our directory!"
            : `Your ${recentViews.length} most recently viewed place${recentViews.length === 1 ? "" : "s"}.`}
        </p>
      </div>

      {/* Empty State */}
      {recentViews.length === 0 && (
        <Card className="border-dashed border-2 border-slate-200">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="p-4 bg-slate-100 rounded-full mb-4">
              <Clock className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-cpDark mb-2">
              No recent views
            </h3>
            <p className="text-slate-600 mb-6 max-w-md">
              Start exploring pet care places and your viewing history will appear here.
            </p>
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-cpPink text-white rounded-lg hover:bg-cpPink/90 transition-colors font-medium"
            >
              Browse Places
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Recent Views List */}
      {recentViews.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentViews.map((place) => {
            const firstCategorySlug =
              place.placeCategories[0]?.category?.slug || "all";
            const href = `/${locale}/${place.city.country.slug}/${place.city.slug}/${firstCategorySlug}/${place.slug}`;
            const isFavorite = favoriteSet.has(place.id);

            // Premium card styling
            const premiumStyles = place.isPremium
              ? "border-cpYellow border-2 bg-gradient-to-br from-cpYellow/5 to-white shadow-md ring-1 ring-cpYellow/20"
              : "";

            return (
              <Card
                key={place.id}
                className={`group relative overflow-hidden hover:shadow-lg transition-shadow ${premiumStyles}`}
              >
                {/* Premium Ribbon */}
                {place.isPremium && (
                  <div className="absolute top-0 right-0 z-10">
                    <div className="bg-gradient-to-r from-cpYellow to-amber-400 text-white text-xs font-bold px-3 py-1 flex items-center gap-1 rounded-bl-lg shadow-sm">
                      <Crown className="h-3 w-3" />
                      Featured
                    </div>
                  </div>
                )}

                {/* Favorite Button */}
                <FavoriteButton
                  placeId={place.id}
                  initialIsFavorite={isFavorite}
                  variant="card"
                />

                <Link href={href}>
                  <CardContent className="p-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 mb-2 pr-8">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3
                            className={`font-semibold line-clamp-1 group-hover:text-cpPink transition-colors ${
                              place.isPremium ? "text-amber-900" : "text-cpDark"
                            }`}
                          >
                            {place.name}
                          </h3>
                          {place.isVerified && (
                            <Badge
                              variant="secondary"
                              className="bg-cpAqua/20 text-cpAqua border-cpAqua text-xs gap-0.5"
                            >
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
                          <span className="font-medium">
                            {Number(place.avgRating).toFixed(1)}
                          </span>
                          <span className="text-slate-400">
                            ({place.reviewCount})
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    {place.description && (
                      <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                        {place.description}
                      </p>
                    )}

                    {/* Location */}
                    {place.address && (
                      <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        <span className="line-clamp-1">{place.address}</span>
                      </div>
                    )}

                    {/* Categories */}
                    {place.placeCategories.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {place.placeCategories.slice(0, 3).map((pc) => (
                          <Badge
                            key={pc.category?.slug || "unknown"}
                            variant="outline"
                            className="text-xs"
                          >
                            {pc.category?.labelKey || ""}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Viewed date */}
                    <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Viewed{" "}
                      {new Date(place.viewedAt).toLocaleDateString(locale, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
