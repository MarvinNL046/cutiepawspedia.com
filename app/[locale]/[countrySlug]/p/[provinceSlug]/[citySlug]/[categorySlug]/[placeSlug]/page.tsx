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
import { MapPin, Phone, Globe, Mail, Star, CheckCircle, MessageSquare, Lock, Shield, Crown } from "lucide-react";
import { AboutSection, ServicesSection, HighlightsSection, BusinessSnapshot, BusinessPhotoGallery } from "@/components/place";
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
  try {
    const stackUser = await stackServerApp?.getUser();
    if (stackUser) {
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
          ? "bg-gradient-to-br from-purple-100 via-white to-purple-50 border-b-4 border-purple-400"
          : placeFeatures.hasFeaturedStyling
            ? "bg-gradient-to-br from-amber-50 via-white to-cpYellow/10 border-b-4 border-cpYellow"
            : "bg-gradient-to-br from-cpPink/10 via-white to-cpAqua/10"
      }`}>
        <div className={`absolute inset-0 ${
          placeFeatures.hasEnhancedStyling
            ? "bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.15),transparent_50%)]"
            : placeFeatures.hasFeaturedStyling
              ? "bg-[radial-gradient(circle_at_80%_20%,rgba(251,191,36,0.2),transparent_50%)]"
              : "bg-[radial-gradient(circle_at_80%_20%,rgba(255,127,161,0.15),transparent_50%)]"
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
                <h1 className="text-3xl md:text-4xl font-bold text-cpDark tracking-tight">
                  {place.name}
                </h1>
                {placeFeatures.planBadge && (
                  <Badge className={`gap-1 ${
                    placeFeatures.planBadge.color === "purple"
                      ? "bg-purple-100 text-purple-700 border-purple-300"
                      : placeFeatures.planBadge.color === "amber"
                        ? "bg-amber-100 text-amber-700 border-amber-300"
                        : "bg-blue-100 text-blue-700 border-blue-300"
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
                  <Badge className="bg-purple-100 text-purple-700 border-purple-300 gap-1">
                    <Shield className="h-3 w-3" />
                    {locale === "nl" ? "Geverifieerd" : "Verified"}
                  </Badge>
                )}
                {place.isVerified && !placeFeatures.hasVerifiedBadge && (
                  <Badge className="bg-cpAqua/20 text-cpAqua border-cpAqua gap-1">
                    <CheckCircle className="h-3 w-3" />Verified
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {place.placeCategories?.map((pc) => (
                  <Badge key={pc.category.slug} variant="secondary">
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
                        className={`h-5 w-5 ${star <= Math.round(Number(place.avgRating)) ? "fill-cpYellow text-cpYellow" : "text-slate-300"}`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-cpDark">{Number(place.avgRating).toFixed(1)}</span>
                  <span className="text-slate-500">({place.reviewCount} reviews)</span>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2 min-w-[200px]">
              <FavoriteButton placeId={place.id} initialIsFavorite={isPlaceFavorited} variant="default" />
              {place.phone && placeFeatures.canShowPhone ? (
                <Button asChild className="bg-cpPink hover:bg-cpPink/90 gap-2">
                  <a href={`tel:${place.phone}`}><Phone className="h-4 w-4" />{locale === "nl" ? "Bel Nu" : "Call Now"}</a>
                </Button>
              ) : place.phone && !placeFeatures.canShowPhone ? (
                <Button variant="outline" className="gap-2 text-slate-400" disabled>
                  <Lock className="h-4 w-4" />{locale === "nl" ? "Telefoon verborgen" : "Phone hidden"}
                </Button>
              ) : null}
              <Button asChild variant="outline" className="gap-2">
                <a href="#inquiry-form"><MessageSquare className="h-4 w-4" />{locale === "nl" ? "Stuur Bericht" : "Send Inquiry"}</a>
              </Button>
              {placeFeatures.hasVerifiedBadge && (
                <Badge className="justify-center bg-purple-100 text-purple-700 border-purple-300 gap-1">
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

            <BetweenContentAd />

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{locale === "nl" ? "Beoordelingen" : "Reviews"}</CardTitle>
                <Button variant="outline" size="sm">
                  {locale === "nl" ? "Schrijf een Review" : "Write a Review"}
                </Button>
              </CardHeader>
              <CardContent>
                {publishedReviews.length > 0 ? (
                  <div className="space-y-4">
                    {publishedReviews.map((review) => (
                      <div key={review.id} className="border-b pb-4 last:border-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${star <= review.rating ? "fill-cpYellow text-cpYellow" : "text-slate-300"}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-slate-500">
                            {(() => {
                              const user = Array.isArray(review.user) ? review.user[0] : review.user;
                              return user?.name || "Anonymous";
                            })()}
                          </span>
                          <span className="text-xs text-slate-400">
                            {new Date(review.createdAt).toLocaleDateString(locale, { year: "numeric", month: "short", day: "numeric" })}
                          </span>
                        </div>
                        {review.title && <p className="font-medium text-cpDark mb-1">{review.title}</p>}
                        {review.body && <p className="text-slate-600">{review.body}</p>}
                        {review.replies && review.replies.length > 0 && (
                          <div className="mt-3 pl-4 border-l-2 border-cpPink/30">
                            {review.replies.map((reply) => (
                              <div key={reply.id} className="bg-slate-50 rounded p-3 mt-2">
                                <p className="text-xs text-cpPink font-medium mb-1">
                                  {reply.authorType === "business" ? (locale === "nl" ? "Reactie van bedrijf" : "Business Response") : (locale === "nl" ? "Reactie van beheerder" : "Admin Response")}
                                </p>
                                <p className="text-sm text-slate-600">{reply.body}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500">
                      {locale === "nl" ? "Nog geen reviews. Wees de eerste!" : "No reviews yet. Be the first!"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{locale === "nl" ? "Contactgegevens" : "Contact Information"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {place.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-cpPink shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-600">{place.address}</p>
                      <p className="text-slate-500 text-sm">
                        {[place.postalCode, cityName].filter(Boolean).join(" ")}
                      </p>
                    </div>
                  </div>
                )}

                {place.phone && placeFeatures.canShowPhone ? (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-cpPink" />
                    <a href={`tel:${place.phone}`} className="text-cpDark hover:text-cpPink transition-colors">
                      {place.phone}
                    </a>
                  </div>
                ) : place.phone && !placeFeatures.canShowPhone ? (
                  <div className="flex items-center gap-3 text-slate-400">
                    <Phone className="h-5 w-5" />
                    <span className="flex items-center gap-1">
                      <Lock className="h-3 w-3" />
                      {locale === "nl" ? "Upgrade voor telefoonnummer" : "Upgrade to see phone"}
                    </span>
                  </div>
                ) : null}

                {place.email && placeFeatures.canShowEmail ? (
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-cpPink" />
                    <a href={`mailto:${place.email}`} className="text-cpDark hover:text-cpPink transition-colors truncate">
                      {place.email}
                    </a>
                  </div>
                ) : place.email && !placeFeatures.canShowEmail ? (
                  <div className="flex items-center gap-3 text-slate-400">
                    <Mail className="h-5 w-5" />
                    <span className="flex items-center gap-1">
                      <Lock className="h-3 w-3" />
                      {locale === "nl" ? "Upgrade voor e-mail" : "Upgrade to see email"}
                    </span>
                  </div>
                ) : null}

                {place.website && placeFeatures.canShowWebsite ? (
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-cpPink" />
                    <a href={place.website} target="_blank" rel="noopener noreferrer" className="text-cpDark hover:text-cpPink transition-colors">
                      {locale === "nl" ? "Bezoek Website" : "Visit Website"}
                    </a>
                  </div>
                ) : place.website && !placeFeatures.canShowWebsite ? (
                  <div className="flex items-center gap-3 text-slate-400">
                    <Globe className="h-5 w-5" />
                    <span className="flex items-center gap-1">
                      <Lock className="h-3 w-3" />
                      {locale === "nl" ? "Upgrade voor website" : "Upgrade to see website"}
                    </span>
                  </div>
                ) : null}

                {upgradeCTA && (
                  <div className="pt-3 border-t border-slate-100">
                    <p className="text-xs text-slate-500 mb-2">{upgradeCTA.message}</p>
                    <Button asChild size="sm" variant="outline" className="w-full gap-1 text-cpPink border-cpPink/30 hover:bg-cpPink/5">
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
            />

            {place.lat && place.lng && (
              <Card>
                <CardHeader>
                  <CardTitle>{locale === "nl" ? "Locatie" : "Location"}</CardTitle>
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
                      className="flex items-center justify-center gap-2 mt-3 text-sm text-cpAqua hover:text-cpPink transition-colors"
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
