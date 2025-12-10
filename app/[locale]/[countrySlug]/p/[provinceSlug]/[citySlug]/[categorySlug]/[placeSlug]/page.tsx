/**
 * Place Detail Page (Province Route) - Individual business/place profile
 * URL: /[locale]/[countrySlug]/p/[provinceSlug]/[citySlug]/[categorySlug]/[placeSlug]
 *
 * This is the province-aware version of the place page, showing the full hierarchy.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getCityBySlugAndProvince,
  getProvinceBySlugAndCountry,
} from "@/db/queries";
import { getClaims } from "@/db/queries/claims";
import { getReviewsForPlace } from "@/db/queries/reviews";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId } from "@/db/queries/users";
import {
  getPlaceMetadata,
  localBusinessSchema,
  localBusinessWithReviewsSchema,
  breadcrumbSchema,
  getLocalizedCategoryName,
  buildFaqJsonLd,
  type ContentLocale,
} from "@/lib/seo";
import { generateContent } from "@/lib/ai/generateContent";
import { extractFaqsFromAiContent, generateDefaultFaqs } from "@/lib/ai/faq";
import { getInternalLinksForPage } from "@/lib/internalLinks";
import { JsonLd, PageIntroInline, FaqStatic, InternalLinksSection } from "@/components/seo";
import { StaticMap } from "@/components/directory";
import { LeadForm } from "@/components/forms";
import { ClaimPlaceCTA } from "@/components/claims";
import { CategoryAffiliateBlockLazy as CategoryAffiliateBlock } from "@/components/affiliate";
import { PlaceViewTracker } from "@/components/analytics";
import { Breadcrumbs } from "@/components/layout";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import { isFavorite } from "@/db/queries/favorites";
import { MapPin, Phone, Globe, Mail, Star, CheckCircle, Lock, Shield, Crown, MessageSquare } from "lucide-react";
import { ReviewSection } from "@/components/reviews";
import { AboutSection, ServicesSection, HighlightsSection, BusinessSnapshot, BusinessPhotoGallery, GoogleReviewsSection } from "@/components/place";
import { getActivePhotosByPlaceId } from "@/db/queries/businessPhotos";
import { getBusinessPhotoUrl } from "@/lib/storage/businessPhotos";
import { BetweenContentAd, SidebarAd } from "@/components/ads";
import { getPlaceFeatures, getUpgradeCTA } from "@/lib/plans/getPlaceFeatures";
import { db } from "@/db";
import { places } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { desc } from "drizzle-orm";
import { reviews } from "@/db/schema";

interface PlacePageProps {
  params: Promise<{
    locale: string;
    countrySlug: string;
    provinceSlug: string;
    citySlug: string;
    categorySlug: string;
    placeSlug: string;
  }>;
}

export const revalidate = 300;

/**
 * Get place by slug within a province-aware city
 */
async function getPlaceBySlugWithProvince(
  placeSlug: string,
  citySlug: string,
  provinceSlug: string,
  countrySlug: string
) {
  if (!db) return null;

  const city = await getCityBySlugAndProvince(citySlug, provinceSlug, countrySlug);
  if (!city) return null;

  return db.query.places.findFirst({
    where: and(eq(places.slug, placeSlug), eq(places.cityId, city.id)),
    with: {
      city: {
        with: {
          country: true,
          province: true,
        },
      },
      placeCategories: {
        with: {
          category: true,
        },
      },
      reviews: {
        orderBy: [desc(reviews.createdAt)],
        limit: 10,
        with: {
          user: true,
        },
      },
      business: {
        with: {
          subscriptionPlan: true,
        },
      },
    },
  });
}

export async function generateMetadata({ params }: PlacePageProps): Promise<Metadata> {
  const { locale, countrySlug, provinceSlug, citySlug, categorySlug, placeSlug } = await params;
  const place = await getPlaceBySlugWithProvince(placeSlug, citySlug, provinceSlug, countrySlug);

  if (!place) {
    return {
      title: placeSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    };
  }

  return getPlaceMetadata(place, citySlug, countrySlug, categorySlug, locale);
}

export default async function PlacePage({ params }: PlacePageProps) {
  const { locale, countrySlug, provinceSlug, citySlug, categorySlug, placeSlug } = await params;

  const province = await getProvinceBySlugAndCountry(provinceSlug, countrySlug);
  if (!province) notFound();

  const place = await getPlaceBySlugWithProvince(placeSlug, citySlug, provinceSlug, countrySlug);
  if (!place) notFound();

  const city = Array.isArray(place.city) ? place.city[0] : place.city;
  const cityName = city?.name || citySlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const provinceName = province.name;
  const country = Array.isArray(city?.country) ? city.country[0] : city?.country;
  const countryName = country?.name || countrySlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const primaryCategory = place.placeCategories?.[0]?.category;

  // Get plan-based feature gating
  const placeFeatures = getPlaceFeatures(place);
  const upgradeCTA = getUpgradeCTA(place, locale);

  // Check if current user has a pending claim for this place and if they favorited it
  let hasPendingClaim = false;
  let isPlaceFavorited = false;
  let isUserLoggedIn = false;
  try {
    const stackUser = await stackServerApp?.getUser();
    if (stackUser) {
      isUserLoggedIn = true;
      const dbUser = await getUserByStackAuthId(stackUser.id);
      if (dbUser) {
        const [claimsResult, favoriteStatus] = await Promise.all([
          getClaims({
            placeId: place.id,
            userId: dbUser.id,
            status: "pending",
            limit: 1,
          }),
          isFavorite(dbUser, place.id),
        ]);
        hasPendingClaim = claimsResult.claims.length > 0;
        isPlaceFavorited = favoriteStatus;
      }
    }
  } catch {
    // Silently fail if auth check fails
  }

  // Extract scraped content for personalized AI generation
  const scrapedContent = place.scrapedContent as {
    aboutUs?: string;
    googleRating?: number;
    googleReviewCount?: number;
    scrapedAt?: string;
    googleMapsUrl?: string;
    googleReviews?: Array<{
      text: string;
      rating: number;
      author: string;
      date?: string | null;
      likes?: number;
    }>;
    facts?: {
      foundedYear?: number;
      specializations?: string[];
      awards?: string[];
    };
  } | null;

  // Generate AI content
  const { content } = await generateContent({
    type: "place",
    locale: locale as ContentLocale,
    data: {
      placeName: place.name,
      placeSlug: place.slug,
      cityName,
      citySlug,
      countryName,
      countrySlug,
      categories: place.placeCategories?.map((pc) => pc.category.slug) || [categorySlug],
      rating: place.avgRating ? Number(place.avgRating) : undefined,
      reviewCount: place.reviewCount || undefined,
      description: place.description || undefined,
      address: place.address || undefined,
      aboutUs: scrapedContent?.aboutUs,
      aboutUsFacts: scrapedContent?.facts,
    },
  });

  // Extract FAQs
  const categoryName = getLocalizedCategoryName(categorySlug, locale as ContentLocale);
  const aiFaqs = extractFaqsFromAiContent(content);
  const faqs = aiFaqs.length >= 2 ? aiFaqs : generateDefaultFaqs({
    type: "place",
    locale,
    placeName: place.name,
    categoryName,
    cityName,
    countryName,
  });

  // Get internal links
  const internalLinks = await getInternalLinksForPage({
    pageType: "place",
    locale,
    countrySlug,
    citySlug,
    categorySlug,
    placeId: String(place.id),
    placeName: place.name,
  });

  // Fetch reviews and photos
  const [publishedReviews, businessPhotos] = await Promise.all([
    getReviewsForPlace(place.id, {
      status: "published",
      limit: 10,
      orderBy: "newest",
    }),
    getActivePhotosByPlaceId(place.id),
  ]);

  // Transform photos
  const photosWithUrls = businessPhotos.map((photo) => ({
    id: photo.id,
    url: getBusinessPhotoUrl(photo.storageKey),
    isPrimary: photo.isPrimary,
    altText: photo.altText,
    caption: photo.caption,
    width: photo.width,
    height: photo.height,
  }));

  // Build province-aware URLs
  const BASE_URL = process.env.APP_BASE_URL || "https://cutiepawspedia.com";
  const baseUrl = `/${locale}/${countrySlug}/p/${provinceSlug}/${citySlug}`;

  const breadcrumbsData = [
    { name: locale === "nl" ? "Overzicht" : "Directory", url: `${BASE_URL}/${locale}` },
    { name: countryName, url: `${BASE_URL}/${locale}/${countrySlug}` },
    { name: provinceName, url: `${BASE_URL}/${locale}/${countrySlug}/p/${provinceSlug}` },
    { name: cityName, url: `${BASE_URL}${baseUrl}` },
    { name: primaryCategory?.labelKey || categorySlug, url: `${BASE_URL}${baseUrl}/${categorySlug}` },
    { name: place.name, url: `${BASE_URL}${baseUrl}/${categorySlug}/${place.slug}` },
  ];

  // Prepare reviews for schema
  const reviewsForSchema = publishedReviews.map((r) => {
    const user = Array.isArray(r.user) ? r.user[0] : r.user;
    return {
      id: r.id,
      rating: r.rating,
      title: r.title,
      body: r.body,
      createdAt: r.createdAt,
      author: user ? { name: (user as { name?: string }).name || "Anonymous" } : null,
    };
  });

  return (
    <>
      {/* Analytics Tracker */}
      <PlaceViewTracker
        placeId={place.id}
        placeName={place.name}
        placeSlug={place.slug}
        category={primaryCategory?.labelKey}
        city={cityName}
        country={countryName}
        isPremium={place.isPremium}
        isVerified={place.isVerified}
        avgRating={place.avgRating ? Number(place.avgRating) : undefined}
        reviewCount={place.reviewCount}
      />
      <JsonLd data={[
        reviewsForSchema.length > 0
          ? localBusinessWithReviewsSchema(place, locale, categorySlug, reviewsForSchema)
          : localBusinessSchema(place, locale, categorySlug),
        breadcrumbSchema(breadcrumbsData),
        ...(faqs.length >= 2 ? [buildFaqJsonLd(faqs)] : []),
      ].filter(Boolean)} />

      {/* Hero Header */}
      <section className={`relative overflow-hidden ${
        placeFeatures.hasEnhancedStyling
          ? "bg-gradient-to-br from-purple-100 via-white to-purple-50 dark:from-purple-900/30 dark:via-cpSurface dark:to-purple-900/10 border-b-4 border-purple-400 dark:border-purple-500"
          : placeFeatures.hasFeaturedStyling
            ? "bg-gradient-to-br from-amber-50 via-white to-cpAmber/10 dark:from-cpAmber/20 dark:via-cpSurface dark:to-cpAmber/5 border-b-4 border-cpAmber"
            : "bg-gradient-to-br from-cpCoral/10 via-white to-cpAmber/10 dark:from-cpCoral/20 dark:via-cpSurface dark:to-cpAmber/10"
      }`}>
        <div className={`absolute inset-0 ${
          placeFeatures.hasEnhancedStyling
            ? "bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.25),transparent_50%)]"
            : placeFeatures.hasFeaturedStyling
              ? "bg-[radial-gradient(circle_at_80%_20%,rgba(251,191,36,0.2),transparent_50%)] dark:bg-[radial-gradient(circle_at_80%_20%,rgba(255,209,102,0.2),transparent_50%)]"
              : "bg-[radial-gradient(circle_at_80%_20%,rgba(255,140,115,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_80%_20%,rgba(255,140,115,0.2),transparent_50%)]"
        }`} />
        <div className="relative container mx-auto max-w-6xl px-4 py-8 md:py-12">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: locale === "nl" ? "Overzicht" : "Directory", href: `/${locale}` },
              { label: countryName, href: `/${locale}/${countrySlug}` },
              { label: provinceName, href: `/${locale}/${countrySlug}/p/${provinceSlug}` },
              { label: cityName, href: baseUrl },
              { label: primaryCategory?.labelKey || categorySlug, href: `${baseUrl}/${categorySlug}` },
              { label: place.name },
            ]}
          />

          {/* Place Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground dark:text-cpCream tracking-tight">
                  {place.name}
                </h1>
                {placeFeatures.planBadge && (
                  <Badge className={`gap-1 ${
                    placeFeatures.planBadge.color === "purple"
                      ? "bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-500"
                      : placeFeatures.planBadge.color === "amber"
                        ? "bg-amber-100 text-amber-700 border-amber-300 dark:bg-cpAmber/20 dark:text-cpAmber dark:border-cpAmber/50"
                        : "bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-500"
                  }`}>
                    {placeFeatures.planBadge.color === "purple" ? (
                      <Crown className="h-3 w-3" />
                    ) : (
                      <Star className="h-3 w-3" />
                    )}
                    {placeFeatures.planBadge.text}
                  </Badge>
                )}
                {placeFeatures.hasVerifiedBadge && (
                  <Badge className="bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-500 gap-1">
                    <Shield className="h-3 w-3" />
                    {locale === "nl" ? "Geverifieerd" : "Verified"}
                  </Badge>
                )}
                {place.isVerified && !placeFeatures.hasVerifiedBadge && (
                  <Badge className="bg-cpCoral/10 text-cpCoral border-cpCoral/30 gap-1">
                    <CheckCircle className="h-3 w-3" />Verified
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {place.placeCategories?.map((pc) => (
                  <Badge key={pc.category.slug} variant="secondary" className="dark:bg-cpSurface dark:text-cpCream/80 dark:border-cpAmber/20">
                    {getLocalizedCategoryName(pc.category.slug, locale as ContentLocale)}
                  </Badge>
                ))}
              </div>
              {place.avgRating && Number(place.avgRating) > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${star <= Math.round(Number(place.avgRating)) ? "fill-cpAmber text-cpAmber" : "text-muted-foreground/30 dark:text-cpCream/20"}`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-foreground dark:text-cpCream">{Number(place.avgRating).toFixed(1)}</span>
                  <span className="text-muted-foreground dark:text-cpCream/60">({place.reviewCount} reviews)</span>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2 min-w-[200px]">
              <FavoriteButton placeId={place.id} initialIsFavorite={isPlaceFavorited} variant="default" />
              {place.phone && placeFeatures.canShowPhone ? (
                <Button asChild className="bg-cpCoral hover:bg-cpCoral/90 gap-2">
                  <a href={`tel:${place.phone}`}><Phone className="h-4 w-4" />{locale === "nl" ? "Bel Nu" : "Call Now"}</a>
                </Button>
              ) : place.phone && !placeFeatures.canShowPhone ? (
                <Button variant="outline" className="gap-2 text-muted-foreground dark:text-cpCream/50 dark:border-cpAmber/20" disabled>
                  <Lock className="h-4 w-4" />{locale === "nl" ? "Telefoon verborgen" : "Phone hidden"}
                </Button>
              ) : null}
              <Button asChild variant="outline" className="gap-2 dark:border-cpAmber/30 dark:text-cpCream dark:hover:bg-cpAmber/10">
                <a href="#inquiry-form"><MessageSquare className="h-4 w-4" />{locale === "nl" ? "Stuur Bericht" : "Send Inquiry"}</a>
              </Button>
              {placeFeatures.hasVerifiedBadge && (
                <Badge className="justify-center bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-500 gap-1">
                  <Shield className="h-3 w-3" />
                  {locale === "nl" ? "Geverifieerd Bedrijf" : "Verified Business"}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <AboutSection
              place={{
                name: place.name,
                description: place.description,
                openingHours: place.openingHours as Record<string, string> | undefined,
                avgRating: place.avgRating,
                reviewCount: place.reviewCount,
                dataQualityFlags: place.dataQualityFlags as string[] | undefined,
              }}
              aiContent={{
                intro: content.intro,
                secondary: content.secondary,
                bullets: content.bullets,
              }}
              locale={locale}
            />

            {photosWithUrls.length > 0 && (
              <BusinessPhotoGallery photos={photosWithUrls} placeName={place.name} locale={locale} />
            )}

            <ServicesSection
              categories={place.placeCategories?.map((pc) => pc.category)}
              description={place.description}
              locale={locale}
            />

            <HighlightsSection
              place={{
                name: place.name,
                description: place.description,
                avgRating: place.avgRating,
                reviewCount: place.reviewCount,
                dataQualityFlags: place.dataQualityFlags as string[] | undefined,
              }}
              aiContent={{
                intro: content.intro,
                secondary: content.secondary,
                bullets: content.bullets,
              }}
              locale={locale}
            />

            {/* Google Reviews Section - Show scraped reviews from Google Maps */}
            {scrapedContent?.googleReviews && scrapedContent.googleReviews.length > 0 && (
              <GoogleReviewsSection
                reviews={scrapedContent.googleReviews}
                placeName={place.name}
                googleMapsUrl={scrapedContent.googleMapsUrl || place.googleMapsUrl}
                locale={locale}
              />
            )}

            <BetweenContentAd />

            <ReviewSection
              placeId={place.id}
              placeName={place.name}
              reviews={publishedReviews.map((review) => ({
                id: review.id,
                rating: review.rating,
                title: review.title,
                body: review.body,
                createdAt: review.createdAt,
                user: review.user,
                replies: review.replies,
              }))}
              isLoggedIn={isUserLoggedIn}
              locale={locale}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20">
              <CardHeader>
                <CardTitle className="text-foreground dark:text-cpCream">{locale === "nl" ? "Contactgegevens" : "Contact Information"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {place.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-cpCoral shrink-0 mt-0.5" />
                    <div>
                      <p className="text-muted-foreground dark:text-cpCream/70">{place.address}</p>
                      <p className="text-muted-foreground/80 dark:text-cpCream/60 text-sm">
                        {[place.postalCode, cityName].filter(Boolean).join(" ")}
                      </p>
                    </div>
                  </div>
                )}

                {place.phone && placeFeatures.canShowPhone ? (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-cpCoral" />
                    <a href={`tel:${place.phone}`} className="text-foreground dark:text-cpCream hover:text-cpCoral transition-colors">
                      {place.phone}
                    </a>
                  </div>
                ) : place.phone && !placeFeatures.canShowPhone ? (
                  <div className="flex items-center gap-3 text-muted-foreground dark:text-cpCream/50">
                    <Phone className="h-5 w-5" />
                    <span className="flex items-center gap-1">
                      <Lock className="h-3 w-3" />
                      {locale === "nl" ? "Upgrade voor telefoonnummer" : "Upgrade to see phone"}
                    </span>
                  </div>
                ) : null}

                {place.email && placeFeatures.canShowEmail ? (
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-cpCoral" />
                    <a href={`mailto:${place.email}`} className="text-foreground dark:text-cpCream hover:text-cpCoral transition-colors truncate">
                      {place.email}
                    </a>
                  </div>
                ) : place.email && !placeFeatures.canShowEmail ? (
                  <div className="flex items-center gap-3 text-muted-foreground dark:text-cpCream/50">
                    <Mail className="h-5 w-5" />
                    <span className="flex items-center gap-1">
                      <Lock className="h-3 w-3" />
                      {locale === "nl" ? "Upgrade voor e-mail" : "Upgrade to see email"}
                    </span>
                  </div>
                ) : null}

                {place.website && placeFeatures.canShowWebsite ? (
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-cpCoral" />
                    <a href={place.website} target="_blank" rel="noopener noreferrer" className="text-foreground dark:text-cpCream hover:text-cpCoral transition-colors">
                      {locale === "nl" ? "Bezoek Website" : "Visit Website"}
                    </a>
                  </div>
                ) : place.website && !placeFeatures.canShowWebsite ? (
                  <div className="flex items-center gap-3 text-muted-foreground dark:text-cpCream/50">
                    <Globe className="h-5 w-5" />
                    <span className="flex items-center gap-1">
                      <Lock className="h-3 w-3" />
                      {locale === "nl" ? "Upgrade voor website" : "Upgrade to see website"}
                    </span>
                  </div>
                ) : null}

                {upgradeCTA && (
                  <div className="pt-3 border-t border-border dark:border-cpAmber/10">
                    <p className="text-xs text-muted-foreground dark:text-cpCream/60 mb-2">{upgradeCTA.message}</p>
                    <Button asChild size="sm" variant="outline" className="w-full gap-1 text-cpCoral border-cpCoral/30 hover:bg-cpCoral/5 dark:hover:bg-cpCoral/10">
                      <a href={`/${locale}/for-businesses`}>
                        <Crown className="h-3 w-3" />
                        {locale === "nl" ? "Bekijk Abonnementen" : "View Plans"}
                      </a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <BusinessSnapshot
              place={{
                name: place.name,
                description: place.description,
                openingHours: place.openingHours as Record<string, string> | undefined,
                avgRating: place.avgRating,
                reviewCount: place.reviewCount,
                dataQualityFlags: place.dataQualityFlags as string[] | undefined,
              }}
              locale={locale}
              cutieRating={{
                avgRating: publishedReviews.length > 0
                  ? publishedReviews.reduce((sum, r) => sum + r.rating, 0) / publishedReviews.length
                  : null,
                reviewCount: publishedReviews.length,
              }}
            />

            {place.lat && place.lng && (
              <Card className="bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20">
                <CardHeader>
                  <CardTitle className="text-foreground dark:text-cpCream">{locale === "nl" ? "Locatie" : "Location"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <StaticMap
                    lat={Number(place.lat)}
                    lng={Number(place.lng)}
                    name={place.name}
                    zoom={15}
                    width={400}
                    height={200}
                    className="rounded-lg"
                  />
                  {place.address && (
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 mt-3 text-sm text-cpCoral hover:text-cpCoral/80 transition-colors"
                    >
                      <MapPin className="h-4 w-4" />
                      {locale === "nl" ? "Open in Google Maps" : "Open in Google Maps"}
                    </a>
                  )}
                </CardContent>
              </Card>
            )}

            <div id="inquiry-form">
              <LeadForm
                placeId={place.id}
                placeName={place.name}
                placeSlug={place.slug}
                category={primaryCategory?.labelKey}
                city={cityName}
                country={countryName}
              />
            </div>

            <CategoryAffiliateBlock categorySlug={categorySlug} variant="card" />

            <SidebarAd className="hidden lg:block" />

            <ClaimPlaceCTA
              placeSlug={place.slug}
              businessId={place.businessId}
              hasPendingClaim={hasPendingClaim}
              locale={locale}
              countrySlug={countrySlug}
              citySlug={citySlug}
              categorySlug={categorySlug}
            />
          </div>
        </div>

        {faqs.length > 0 && (
          <FaqStatic faqs={faqs} locale={locale} includeJsonLd={false} className="mt-8" />
        )}

        {internalLinks.groups && internalLinks.groups.length > 0 && (
          <InternalLinksSection result={internalLinks} variant="default" locale={locale} className="mt-8" />
        )}
      </section>
    </>
  );
}
