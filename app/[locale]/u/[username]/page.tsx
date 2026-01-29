/**
 * Public Profile Page (P3)
 *
 * Display public user profiles at /u/[username]
 * Shows:
 * - User info (name, bio, location, website, social links)
 * - Badges
 * - Review count and member since date
 * - Recent reviews (if profile is public)
 */

import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getPublicProfile } from "@/db/queries/userProfiles";
import { db } from "@/db";
import { reviews, places, cities, countries } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  User,
  MapPin,
  Globe,
  Calendar,
  Star,
  MessageSquare,
  Lock,
  ExternalLink,
} from "lucide-react";
import { BadgeDisplay } from "../../account/profile/BadgeDisplay";
import { setRequestLocale, getTranslations } from 'next-intl/server';

interface PublicProfilePageProps {
  params: Promise<{ locale: string; username: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PublicProfilePageProps): Promise<Metadata> {
  const { username, locale } = await params;
  setRequestLocale(locale);
  const profile = await getPublicProfile(username);

  if (!profile) {
    return {
      title: "Profile Not Found",
    };
  }

  const title = profile.name || profile.username || "User";
  const description = profile.bio || `View ${title}'s profile on CutiePawsPedia`;

  return {
    title: `${title} | CutiePawsPedia`,
    description,
    openGraph: {
      title: `${title} | CutiePawsPedia`,
      description,
      type: "profile",
      images: profile.avatarUrl ? [profile.avatarUrl] : undefined,
    },
  };
}

export default async function PublicProfilePage({ params }: PublicProfilePageProps) {
  const { username, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("profile");

  // Get public profile
  const profile = await getPublicProfile(username);

  if (!profile) {
    notFound();
  }

  // If profile is private, show limited view
  if (!profile.isPublic) {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <Card>
            <CardContent className="py-12 text-center">
              <Lock className="h-12 w-12 mx-auto text-slate-400 mb-4" />
              <h1 className="text-xl font-bold text-cpDark mb-2">
                {t("privateProfile")}
              </h1>
              <p className="text-slate-600">{t("privateProfileDesc")}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Get recent reviews for this user
  const recentReviews = db ? await db
    .select({
      id: reviews.id,
      rating: reviews.rating,
      title: reviews.title,
      body: reviews.body,
      createdAt: reviews.createdAt,
      placeId: places.id,
      placeSlug: places.slug,
      placeName: places.name,
      citySlug: cities.slug,
      cityName: cities.name,
      countrySlug: countries.slug,
    })
    .from(reviews)
    .innerJoin(places, eq(reviews.placeId, places.id))
    .innerJoin(cities, eq(places.cityId, cities.id))
    .innerJoin(countries, eq(cities.countryId, countries.id))
    .where(
      and(
        eq(reviews.userId, profile.id),
        eq(reviews.status, "published")
      )
    )
    .orderBy(desc(reviews.createdAt))
    .limit(5) : [];

  // Get initials for avatar fallback
  const initials = (profile.name || profile.username || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        {/* Profile Header Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <Avatar className="h-24 w-24 md:h-32 md:w-32">
                <AvatarImage src={profile.avatarUrl || undefined} alt={profile.name || ""} />
                <AvatarFallback className="text-2xl bg-cpCoral/10 text-cpCoral">
                  {initials}
                </AvatarFallback>
              </Avatar>

              {/* Profile Info */}
              <div className="flex-1 space-y-3">
                <div>
                  <h1 className="text-2xl font-bold text-cpDark">
                    {profile.name || profile.username}
                  </h1>
                  {profile.username && (
                    <p className="text-slate-500">@{profile.username}</p>
                  )}
                </div>

                {profile.bio && (
                  <p className="text-slate-600">{profile.bio}</p>
                )}

                <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                  {profile.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {profile.location}
                    </span>
                  )}
                  {profile.websiteUrl && (
                    <a
                      href={profile.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-cpCoral hover:underline"
                    >
                      <Globe className="h-4 w-4" />
                      Website
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {t("memberSince")}{" "}
                    {new Date(profile.createdAt).toLocaleDateString(
                      locale === "nl" ? "nl-NL" : "en-US",
                      { month: "short", year: "numeric" }
                    )}
                  </span>
                </div>

                {/* Stats */}
                <div className="flex gap-4 pt-2">
                  <Badge variant="secondary" className="gap-1">
                    <MessageSquare className="h-3 w-3" />
                    {profile.reviewCount || 0} {t("reviewsWritten")}
                  </Badge>
                </div>

                {/* Social Links */}
                {profile.socialLinks && Object.keys(profile.socialLinks).length > 0 && (
                  <div className="flex gap-2 pt-2">
                    {profile.socialLinks.instagram && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={`https://instagram.com/${profile.socialLinks.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Instagram
                        </a>
                      </Button>
                    )}
                    {profile.socialLinks.facebook && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={profile.socialLinks.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Facebook
                        </a>
                      </Button>
                    )}
                    {profile.socialLinks.tiktok && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={`https://tiktok.com/@${profile.socialLinks.tiktok}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          TikTok
                        </a>
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        {profile.badges && profile.badges.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t("badges")}</CardTitle>
            </CardHeader>
            <CardContent>
              <BadgeDisplay
                badges={profile.badges.map((b) => ({
                  key: b.key,
                  label: b.label,
                  labelNl: b.labelNl,
                  description: "",
                  descriptionNl: null,
                  icon: b.icon,
                  category: b.category,
                  awardedAt: b.awardedAt,
                }))}
                locale={locale}
                showDates
              />
            </CardContent>
          </Card>
        )}

        {/* Recent Reviews */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t("recentReviews")}</CardTitle>
          </CardHeader>
          <CardContent>
            {recentReviews.length === 0 ? (
              <p className="text-slate-500 text-center py-4">{t("noReviews")}</p>
            ) : (
              <div className="space-y-4">
                {recentReviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-4 bg-slate-50 rounded-lg space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <Link
                          href={`/${locale}/${review.countrySlug}/${review.citySlug}/all/${review.placeSlug}`}
                          className="font-medium text-cpDark hover:text-cpCoral transition-colors"
                        >
                          {review.placeName}
                        </Link>
                        <p className="text-sm text-slate-500">{review.cityName}</p>
                      </div>
                      <div className="flex items-center gap-1 text-cpYellow">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "fill-current" : "fill-none opacity-30"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    {review.title && (
                      <p className="font-medium text-cpDark">{review.title}</p>
                    )}
                    <p className="text-slate-600 text-sm line-clamp-2">
                      {review.body}
                    </p>
                    <p className="text-xs text-slate-400">
                      {new Date(review.createdAt).toLocaleDateString(
                        locale === "nl" ? "nl-NL" : "en-US",
                        { month: "short", day: "numeric", year: "numeric" }
                      )}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
