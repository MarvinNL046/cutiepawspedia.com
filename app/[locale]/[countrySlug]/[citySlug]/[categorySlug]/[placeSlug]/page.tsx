/**
 * Place Detail Page - Individual business/place profile
 *
 * CACHING STRATEGY: Static + ISR (Incremental Static Regeneration)
 * - revalidate: 300s (5 minutes) - Reviews and business info can change
 * - Most important page for conversions and SEO
 * - JSON-LD structured data for rich search results
 * - Lead form submission is client-side (doesn't affect caching)
 */

import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPlaceBySlug } from "@/db/queries";
import { getReviewsForPlace } from "@/db/queries/reviews";
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
import { MapPin, Phone, Globe, Mail, Star, CheckCircle, MessageSquare, Lock, Shield, Crown, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { getCityName, getCountryName } from "@/lib/utils/place-helpers";
import { AboutSection, ServicesSection, HighlightsSection, BusinessSnapshot, BusinessPhotoGallery, ContentSections, ServiceHighlightsSection, CTASection, GoogleReviewsSection, PlaceHeroImage } from "@/components/place";
import { EditorialByline } from "@/components/seo";
import { getActivePhotosByPlaceId } from "@/db/queries/businessPhotos";
import { getBusinessPhotoUrl } from "@/lib/storage/businessPhotos";
import { BetweenContentAd, SidebarAd } from "@/components/ads";
import { getPlaceFeatures, getUpgradeCTA } from "@/lib/plans/getPlaceFeatures";

interface PlacePageProps {
  params: Promise<{ locale: string; countrySlug: string; citySlug: string; categorySlug: string; placeSlug: string }>;
}

// ISR: Place details need timely updates for reviews/info, 5-minute revalidation
export const revalidate = 300;

export async function generateMetadata({ params }: PlacePageProps): Promise<Metadata> {
  const { locale, countrySlug, citySlug, categorySlug, placeSlug } = await params;
  const place = await getPlaceBySlug(placeSlug, citySlug, countrySlug);

  if (!place) {
    // Return noindex metadata for non-existent pages to prevent soft 404 issues
    return {
      title: "Page Not Found - CutiePawsPedia",
      description: "This page does not exist or has been moved.",
      robots: {
        index: false,
        follow: false,
        noarchive: true,
      },
    };
  }

  return getPlaceMetadata(place, citySlug, countrySlug, categorySlug, locale);
}

export default async function PlacePage({ params }: PlacePageProps) {
  const { locale, countrySlug, citySlug, categorySlug, placeSlug } = await params;
  const t = await getTranslations("place");

  // Wrap database query in try-catch to handle errors gracefully
  let place;
  try {
    place = await getPlaceBySlug(placeSlug, citySlug, countrySlug);
  } catch (error) {
    // Check if this is a notFound() throw (don't catch those)
    if (error && typeof error === "object" && "digest" in error) {
      throw error;
    }
    // Log the error for debugging
    console.error("Database error in place page:", error);
    // Return 404 for database errors
    notFound();
  }

  if (!place) notFound();

  // SEO Redirect: If city has a province, redirect to province-aware URL
  const city = Array.isArray(place.city) ? place.city[0] : place.city;
  const province = city?.province ? (Array.isArray(city.province) ? city.province[0] : city.province) : null;
  if (province?.slug) {
    redirect(`/${locale}/${countrySlug}/p/${province.slug}/${citySlug}/${categorySlug}/${placeSlug}`);
  }

  const cityName = getCityName(place, citySlug);
  const countryName = getCountryName(place, countrySlug);
  const primaryCategory = place.placeCategories?.[0]?.category;

  // Get plan-based feature gating
  const placeFeatures = getPlaceFeatures(place);
  const upgradeCTA = getUpgradeCTA(place, locale);

  // Note: Auth-dependent features (favorites, claims) are now handled client-side
  // This prevents SSR bailout and allows proper 404 status codes
  // The FavoriteButton component handles its own auth state
  // The ClaimPlaceCTA shows the claim form which handles auth on submission

  // Extract scraped content for personalized AI generation and contact fallback
  const scrapedContent = place.scrapedContent as {
    // Jina+GPT enriched content (high quality, 400+ words)
    aboutUs?: string;
    services?: string[];
    highlights?: string[];
    contentSource?: string;
    contentLanguage?: string;
    contentGeneratedAt?: string;
    writingStyle?: string;
    // Google Maps data
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
    // Image from coordinate enrichment
    photoUrl?: string;
    imageUrl?: string;
    thumbnailUrl?: string;
    // Jina scraped metadata - used as fallback when main columns are empty
    email?: string;
    phone?: string;
    socialMedia?: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
      linkedin?: string;
    };
    foundedYear?: number;
    teamSize?: string;
    jinaMetadataAt?: string;
  } | null;

  // Effective contact info: main columns take priority, scraped data as fallback
  const effectiveEmail = place.email || scrapedContent?.email;
  const effectivePhone = place.phone || scrapedContent?.phone;
  const socialMedia = scrapedContent?.socialMedia;

  // Generate AI content for the place (cached or generated on demand)
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
      // Pass scraped about-us content for personalized AI generation
      aboutUs: scrapedContent?.aboutUs,
      aboutUsFacts: scrapedContent?.facts,
    },
  });

  // Extract FAQs from AI content or use defaults
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

  // Get internal links for this place
  const internalLinks = await getInternalLinksForPage({
    pageType: "place",
    locale,
    countrySlug,
    citySlug,
    categorySlug,
    placeId: String(place.id),
    placeName: place.name,
  });

  // Fetch published reviews and business photos for this place
  const [publishedReviews, businessPhotos] = await Promise.all([
    getReviewsForPlace(place.id, {
      status: "published",
      limit: 10,
      orderBy: "newest",
    }),
    getActivePhotosByPlaceId(place.id),
  ]);

  // Transform photos for the gallery component
  const photosWithUrls = businessPhotos.map((photo) => ({
    id: photo.id,
    url: getBusinessPhotoUrl(photo.storageKey),
    isPrimary: photo.isPrimary,
    altText: photo.altText,
    caption: photo.caption,
    width: photo.width,
    height: photo.height,
  }));

  // Generate JSON-LD structured data
  const BASE_URL = process.env.APP_BASE_URL || "https://cutiepawspedia.com";
  const breadcrumbsData = [
    { name: "Directory", url: `${BASE_URL}/${locale}` },
    { name: countryName, url: `${BASE_URL}/${locale}/${countrySlug}` },
    { name: cityName, url: `${BASE_URL}/${locale}/${countrySlug}/${citySlug}` },
    { name: primaryCategory?.labelKey || categorySlug, url: `${BASE_URL}/${locale}/${countrySlug}/${citySlug}/${categorySlug}` },
    { name: place.name, url: `${BASE_URL}/${locale}/${countrySlug}/${citySlug}/${categorySlug}/${place.slug}` },
  ];

  // Prepare reviews for JSON-LD schema (map to expected format)
  const reviewsForSchema = publishedReviews.map((r) => {
    // Handle potential array type from Drizzle relations
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
        // Use enhanced schema with reviews if available, otherwise basic LocalBusiness
        reviewsForSchema.length > 0
          ? localBusinessWithReviewsSchema(place, locale, categorySlug, reviewsForSchema)
          : localBusinessSchema(place, locale, categorySlug),
        breadcrumbSchema(breadcrumbsData),
        ...(faqs.length >= 2 ? [buildFaqJsonLd(faqs)] : []),
      ].filter(Boolean)} />

      {/* Hero Header - Enhanced styling for PRO/ELITE */}
      <section className={`relative overflow-hidden ${
        placeFeatures.hasEnhancedStyling
          ? "bg-gradient-to-br from-purple-100 via-white to-purple-50 border-b-4 border-purple-400"
          : placeFeatures.hasFeaturedStyling
            ? "bg-gradient-to-br from-amber-50 via-white to-cpYellow/10 border-b-4 border-cpYellow"
            : "bg-gradient-to-br from-cpCoral/10 via-white to-cpAqua/10"
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
              { label: "Directory", href: `/${locale}` },
              { label: countryName, href: `/${locale}/${countrySlug}` },
              { label: cityName, href: `/${locale}/${countrySlug}/${citySlug}` },
              { label: primaryCategory?.labelKey || categorySlug, href: `/${locale}/${countrySlug}/${citySlug}/${categorySlug}` },
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
                {/* Plan badge - show based on subscription */}
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
                {/* Verified business badge - ELITE exclusive */}
                {placeFeatures.hasVerifiedBadge && (
                  <Badge className="bg-purple-100 text-purple-700 border-purple-300 gap-1">
                    <Shield className="h-3 w-3" />
                    {t("verified")}
                  </Badge>
                )}
                {/* Legacy verified badge (admin-set) */}
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
              {/* Favorite Button */}
              <FavoriteButton
                placeId={place.id}
                initialIsFavorite={false}
                variant="default"
              />
              {/* Call button - only show if plan allows phone display */}
              {effectivePhone && placeFeatures.canShowPhone ? (
                <Button asChild className="bg-cpCoral hover:bg-cpCoral/90 gap-2">
                  <a href={`tel:${effectivePhone}`}><Phone className="h-4 w-4" />{t("callNow")}</a>
                </Button>
              ) : effectivePhone && !placeFeatures.canShowPhone ? (
                <Button variant="outline" className="gap-2 text-slate-400" disabled>
                  <Lock className="h-4 w-4" />{t("phoneHidden")}
                </Button>
              ) : null}
              <Button asChild variant="outline" className="gap-2">
                <a href="#inquiry-form"><MessageSquare className="h-4 w-4" />{t("sendInquiry")}</a>
              </Button>
              {/* Plan badge for ELITE */}
              {placeFeatures.hasVerifiedBadge && (
                <Badge className="justify-center bg-purple-100 text-purple-700 border-purple-300 gap-1">
                  <Shield className="h-3 w-3" />
                  {t("verifiedBusiness")}
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
            {/* Google Maps image from SERP API - only show if no business photos */}
            {photosWithUrls.length === 0 && (scrapedContent?.imageUrl || scrapedContent?.thumbnailUrl || scrapedContent?.photoUrl) && (
              <PlaceHeroImage
                imageUrl={scrapedContent.imageUrl || scrapedContent.photoUrl}
                thumbnailUrl={scrapedContent.thumbnailUrl}
                placeName={place.name}
              />
            )}

            {/* Enriched About Section with fallback to AI content */}
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
              scrapedContent={scrapedContent ? {
                aboutUs: scrapedContent.aboutUs,
                services: scrapedContent.services,
                highlights: scrapedContent.highlights,
                contentSource: scrapedContent.contentSource,
                contentLanguage: scrapedContent.contentLanguage,
                contentGeneratedAt: scrapedContent.contentGeneratedAt,
              } : undefined}
              locale={locale}
            />

            {/* Business Photos - only show if business has uploaded photos */}
            {photosWithUrls.length > 0 && (
              <BusinessPhotoGallery
                photos={photosWithUrls}
                placeName={place.name}
                locale={locale}
              />
            )}

            {/* Services Section */}
            <ServicesSection
              categories={place.placeCategories?.map((pc) => pc.category)}
              description={place.description}
              scrapedContent={scrapedContent ? {
                aboutUs: scrapedContent.aboutUs,
                services: scrapedContent.services,
                highlights: scrapedContent.highlights,
                contentSource: scrapedContent.contentSource,
                contentLanguage: scrapedContent.contentLanguage,
                contentGeneratedAt: scrapedContent.contentGeneratedAt,
              } : undefined}
              locale={locale}
            />

            {/* Highlights Section */}
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
              scrapedContent={scrapedContent ? {
                aboutUs: scrapedContent.aboutUs,
                services: scrapedContent.services,
                highlights: scrapedContent.highlights,
                contentSource: scrapedContent.contentSource,
                contentLanguage: scrapedContent.contentLanguage,
                contentGeneratedAt: scrapedContent.contentGeneratedAt,
              } : undefined}
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

            {/* Service Highlights - AI-generated USPs */}
            {content.serviceHighlights && content.serviceHighlights.length > 0 && (
              <ServiceHighlightsSection
                highlights={content.serviceHighlights}
                placeName={place.name}
                locale={locale}
              />
            )}

            {/* AI-Generated Content Sections for richer content */}
            <ContentSections
              content={content}
              placeName={place.name}
              locale={locale}
            />

            {/* CTA Section - AI-generated call-to-action */}
            {content.cta && (
              <CTASection
                cta={content.cta}
                placeName={place.name}
                phone={placeFeatures.canShowPhone ? effectivePhone : null}
                locale={locale}
              />
            )}

            {/* Editorial Byline - E-E-A-T Trust Signal */}
            <div className="py-4">
              <EditorialByline
                updatedAt={place.updatedAt || place.createdAt || undefined}
                locale={locale}
              />
            </div>

            {/* Ad: Between content (anonymous users only) */}
            <BetweenContentAd />

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{t("reviews")}</CardTitle>
                <Button variant="outline" size="sm">
                  {t("writeReview")}
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
                        {review.title && (
                          <p className="font-medium text-cpDark mb-1">{review.title}</p>
                        )}
                        {review.body && <p className="text-slate-600">{review.body}</p>}
                        {/* Show business replies */}
                        {review.replies && review.replies.length > 0 && (
                          <div className="mt-3 pl-4 border-l-2 border-cpCoral/30">
                            {review.replies.map((reply) => (
                              <div key={reply.id} className="bg-slate-50 rounded p-3 mt-2">
                                <p className="text-xs text-cpCoral font-medium mb-1">
                                  {reply.authorType === "business" ? t("businessResponse") : t("adminResponse")}
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
                      {t("noReviewsBeFirst")}
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
                <CardTitle>{t("contactInformation")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Address - always shown */}
                {place.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-cpCoral shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-600">{place.address}</p>
                      <p className="text-slate-500 text-sm">
                        {[place.postalCode, cityName].filter(Boolean).join(" ")}
                      </p>
                    </div>
                  </div>
                )}

                {/* Phone - gated by plan, uses scraped data as fallback */}
                {effectivePhone && placeFeatures.canShowPhone ? (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-cpCoral" />
                    <a href={`tel:${effectivePhone}`} className="text-cpDark hover:text-cpCoral transition-colors">
                      {effectivePhone}
                    </a>
                  </div>
                ) : effectivePhone && !placeFeatures.canShowPhone ? (
                  <div className="flex items-center gap-3 text-slate-400">
                    <Phone className="h-5 w-5" />
                    <span className="flex items-center gap-1">
                      <Lock className="h-3 w-3" />
                      {t("upgradeToSeePhone")}
                    </span>
                  </div>
                ) : null}

                {/* Email - gated by plan, uses scraped data as fallback */}
                {effectiveEmail && placeFeatures.canShowEmail ? (
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-cpCoral" />
                    <a href={`mailto:${effectiveEmail}`} className="text-cpDark hover:text-cpCoral transition-colors truncate">
                      {effectiveEmail}
                    </a>
                  </div>
                ) : effectiveEmail && !placeFeatures.canShowEmail ? (
                  <div className="flex items-center gap-3 text-slate-400">
                    <Mail className="h-5 w-5" />
                    <span className="flex items-center gap-1">
                      <Lock className="h-3 w-3" />
                      {t("upgradeToSeeEmail")}
                    </span>
                  </div>
                ) : null}

                {/* Website - gated by plan */}
                {place.website && placeFeatures.canShowWebsite ? (
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-cpCoral" />
                    <a href={place.website} target="_blank" rel="noopener noreferrer" className="text-cpDark hover:text-cpCoral transition-colors">
                      {t("visitWebsite")}
                    </a>
                  </div>
                ) : place.website && !placeFeatures.canShowWebsite ? (
                  <div className="flex items-center gap-3 text-slate-400">
                    <Globe className="h-5 w-5" />
                    <span className="flex items-center gap-1">
                      <Lock className="h-3 w-3" />
                      {t("upgradeToSeeWebsite")}
                    </span>
                  </div>
                ) : null}

                {/* Social Media Links - from scraped data */}
                {socialMedia && Object.keys(socialMedia).length > 0 && (
                  <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                    <span className="text-sm text-slate-500">{t("followUs")}:</span>
                    <div className="flex gap-2">
                      {socialMedia.facebook && (
                        <a href={socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cpCoral transition-colors" aria-label="Facebook">
                          <Facebook className="h-5 w-5" />
                        </a>
                      )}
                      {socialMedia.instagram && (
                        <a href={socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cpCoral transition-colors" aria-label="Instagram">
                          <Instagram className="h-5 w-5" />
                        </a>
                      )}
                      {socialMedia.twitter && (
                        <a href={socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cpCoral transition-colors" aria-label="Twitter">
                          <Twitter className="h-5 w-5" />
                        </a>
                      )}
                      {socialMedia.linkedin && (
                        <a href={socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cpCoral transition-colors" aria-label="LinkedIn">
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Upgrade CTA for FREE tier */}
                {upgradeCTA && (
                  <div className="pt-3 border-t border-slate-100">
                    <p className="text-xs text-slate-500 mb-2">{upgradeCTA.message}</p>
                    <Button asChild size="sm" variant="outline" className="w-full gap-1 text-cpCoral border-cpCoral/30 hover:bg-cpCoral/5">
                      <a href={`/${locale}/for-businesses`}>
                        <Crown className="h-3 w-3" />
                        {t("viewPlans")}
                      </a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Business Info Snapshot with Rating & Opening Hours */}
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
                  <CardTitle>{t("location")}</CardTitle>
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
                      className="flex items-center justify-center gap-2 mt-3 text-sm text-cpAqua hover:text-cpCoral transition-colors"
                    >
                      <MapPin className="h-4 w-4" />
                      {t("openInGoogleMaps")}
                    </a>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Lead Form */}
            <div id="inquiry-form">
              <LeadForm
                placeId={place.id}
                placeName={place.name}
                placeSlug={place.slug}
                category={primaryCategory?.labelKey}
                city={cityName}
                country={countryName}
                locale={locale}
              />
            </div>

            {/* Affiliate Recommendations */}
            <CategoryAffiliateBlock categorySlug={categorySlug} variant="card" countrySlug={countrySlug} />

            {/* Ad: Sidebar (anonymous users only) */}
            <SidebarAd className="hidden lg:block" />

            {/* Claim this place CTA */}
            <ClaimPlaceCTA
              placeSlug={place.slug}
              businessId={place.businessId}
              false={false}
              locale={locale}
              countrySlug={countrySlug}
              citySlug={citySlug}
              categorySlug={categorySlug}
            />
          </div>
        </div>

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <FaqStatic
            faqs={faqs}
            locale={locale}
            includeJsonLd={false}
            className="mt-8"
          />
        )}

        {/* Internal Links Section */}
        {internalLinks.groups && internalLinks.groups.length > 0 && (
          <InternalLinksSection
            result={internalLinks}
            variant="default"
            locale={locale}
            className="mt-8"
          />
        )}
      </section>
    </>
  );
}
