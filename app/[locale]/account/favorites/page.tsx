import { Metadata } from "next";
import Link from "next/link";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId } from "@/db/queries";
import { getFavoritesForUser } from "@/db/queries/favorites";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Star, CheckCircle, Crown } from "lucide-react";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";

export const metadata: Metadata = {
  title: "Saved Places | CutiePawsPedia",
  description: "View and manage your saved favorite pet care places.",
};

interface FavoritesPageProps {
  params: Promise<{ locale: string }>;
}

export default async function FavoritesPage({ params }: FavoritesPageProps) {
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

  // Fetch favorites with RLS context
  const favorites = await getFavoritesForUser(dbUser);

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-cpCoral/10 rounded-lg">
            <Heart className="h-6 w-6 text-cpCoral" />
          </div>
          <h1 className="text-2xl font-bold text-foreground dark:text-cpCream">Saved Places</h1>
        </div>
        <p className="text-muted-foreground dark:text-cpCream/70">
          {favorites.length === 0
            ? "You haven't saved any places yet. Browse our directory and click the heart icon to save your favorites!"
            : `You have ${favorites.length} saved place${favorites.length === 1 ? "" : "s"}.`}
        </p>
      </div>

      {/* Empty State */}
      {favorites.length === 0 && (
        <Card className="border-dashed border-2 border-border dark:border-cpAmber/20 bg-card dark:bg-cpSurface/50">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="p-4 bg-muted dark:bg-cpSurface rounded-full mb-4">
              <Heart className="h-8 w-8 text-muted-foreground dark:text-cpCream/60" />
            </div>
            <h3 className="text-lg font-semibold text-foreground dark:text-cpCream mb-2">
              No saved places yet
            </h3>
            <p className="text-muted-foreground dark:text-cpCream/70 mb-6 max-w-md">
              Start exploring pet care places and save your favorites by clicking
              the heart icon on any listing.
            </p>
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-cpCoral text-white rounded-lg hover:bg-cpCoral/90 transition-colors font-medium"
            >
              Browse Places
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Favorites Grid */}
      {favorites.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((place) => {
            const firstCategorySlug =
              place.placeCategories[0]?.category?.slug || "all";
            const href = `/${locale}/${place.city.country.slug}/${place.city.slug}/${firstCategorySlug}/${place.slug}`;

            // Premium card styling - Cozy Theme
            const premiumStyles = place.isPremium
              ? "border-cpAmber border-2 bg-gradient-to-br from-cpAmber/5 to-white dark:from-cpAmber/10 dark:to-cpSurface shadow-md ring-1 ring-cpAmber/20"
              : "bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20";

            return (
              <Card
                key={place.id}
                className={`group relative overflow-hidden hover:shadow-lg hover:shadow-cpCoral/10 dark:hover:shadow-cpCoral/20 transition-all duration-300 hover:-translate-y-1 rounded-2xl ${premiumStyles}`}
              >
                {/* Premium Ribbon */}
                {place.isPremium && (
                  <div className="absolute top-0 right-0 z-10">
                    <div className="bg-gradient-to-r from-cpAmber to-amber-400 text-cpCharcoal text-xs font-bold px-3 py-1 flex items-center gap-1 rounded-bl-lg shadow-sm">
                      <Crown className="h-3 w-3" />
                      Featured
                    </div>
                  </div>
                )}

                {/* Favorite Button */}
                <FavoriteButton
                  placeId={place.id}
                  initialIsFavorite={true}
                  variant="card"
                />

                <Link href={href}>
                  <CardContent className="p-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 mb-2 pr-8">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3
                            className={`font-semibold line-clamp-1 group-hover:text-cpCoral transition-colors ${
                              place.isPremium ? "text-amber-900 dark:text-amber-200" : "text-foreground dark:text-cpCream"
                            }`}
                          >
                            {place.name}
                          </h3>
                          {place.isVerified && (
                            <Badge
                              variant="secondary"
                              className="bg-cpCoral/10 text-cpCoral border-cpCoral/30 text-xs gap-0.5"
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
                          <Star className="h-4 w-4 fill-cpAmber text-cpAmber" />
                          <span className="font-medium text-foreground dark:text-cpCream">
                            {Number(place.avgRating).toFixed(1)}
                          </span>
                          <span className="text-muted-foreground dark:text-cpCream/60">
                            ({place.reviewCount})
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    {place.description && (
                      <p className="text-sm text-muted-foreground dark:text-cpCream/70 line-clamp-2 mb-3">
                        {place.description}
                      </p>
                    )}

                    {/* Location */}
                    {place.address && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
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

                    {/* Saved date */}
                    <div className="mt-3 pt-3 border-t border-border dark:border-cpAmber/10 text-xs text-muted-foreground dark:text-cpCream/60">
                      Saved{" "}
                      {new Date(place.favoritedAt).toLocaleDateString(locale, {
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
