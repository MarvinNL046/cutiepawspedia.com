/**
 * Place Detail Page - Manage a specific place/listing
 * Includes photo management, description editing, and category selection
 */

import Link from "next/link";
import { notFound } from "next/navigation";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId } from "@/db/queries/users";
import { getBusinessById, getBusinessByIdForUser } from "@/db/queries/businesses";
import { getActivePhotosByPlaceId } from "@/db/queries/businessPhotos";
import { db } from "@/db";
import { eq, and } from "drizzle-orm";
import { places, cities, countries, businesses } from "@/db/schema/directory";
import { DashboardHeader, PhotoManager, CategorySelector, ListingEditForm } from "@/components/dashboard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  MapPin,
  Star,
  MessageSquare,
  ExternalLink,
  Building2,
  CheckCircle,
  Crown,
  FileText,
} from "lucide-react";
import { type PlanKey, getPlanFeatures } from "@/lib/plans/config";
import { getBusinessPhotoUrl } from "@/lib/storage/businessPhotos";
import { generateContent, type ContentLocale } from "@/lib/ai/generateContent";
import { getBestAboutText } from "@/lib/enrichment/ui";

interface PlaceDetailPageProps {
  params: Promise<{ locale: string; businessId: string; placeId: string }>;
}

export default async function PlaceDetailPage({ params }: PlaceDetailPageProps) {
  const { locale, businessId, placeId } = await params;
  const businessIdNum = parseInt(businessId, 10);
  const placeIdNum = parseInt(placeId, 10);

  if (isNaN(businessIdNum) || isNaN(placeIdNum)) {
    notFound();
  }

  // Get current user
  const stackUser = await stackServerApp?.getUser();
  if (!stackUser) return null;

  const dbUser = await getUserByStackAuthId(stackUser.id);
  if (!dbUser) return null;

  // Get business with ownership check (admin bypass)
  let business;
  if (dbUser.role === "admin") {
    business = await getBusinessById(businessIdNum);
  } else {
    business = await getBusinessByIdForUser({ businessId: businessIdNum, userId: dbUser.id });
  }

  if (!business) notFound();

  // Get place and verify it belongs to this business
  const [place] = await db
    .select({
      id: places.id,
      name: places.name,
      slug: places.slug,
      description: places.description,
      address: places.address,
      phone: places.phone,
      website: places.website,
      avgRating: places.avgRating,
      reviewCount: places.reviewCount,
      isVerified: places.isVerified,
      isPremium: places.isPremium,
      cityName: cities.name,
      countryName: countries.name,
      countrySlug: countries.slug,
      citySlug: cities.slug,
    })
    .from(places)
    .leftJoin(cities, eq(places.cityId, cities.id))
    .leftJoin(countries, eq(cities.countryId, countries.id))
    .where(and(eq(places.id, placeIdNum), eq(places.businessId, businessIdNum)))
    .limit(1);

  if (!place) notFound();

  // Get photos for this place
  const photos = await getActivePhotosByPlaceId(placeIdNum);
  const photosWithUrls = photos.map((photo) => ({
    ...photo,
    url: getBusinessPhotoUrl(photo.storageKey),
    createdAt: photo.createdAt.toISOString(),
  }));

  // Generate AI content to use as fallback description (same as public page)
  // This ensures the form shows what's actually displayed on the public page
  const { content: aiContent } = await generateContent({
    type: "place",
    locale: locale as ContentLocale,
    data: {
      placeName: place.name,
      placeSlug: place.slug,
      cityName: place.cityName || "",
      citySlug: place.citySlug || "",
      countryName: place.countryName || "",
      countrySlug: place.countrySlug || "",
      categories: [],
      description: place.description || undefined,
      address: place.address || undefined,
    },
  });

  // Get the best about text (same logic as public page)
  const { text: displayedAboutText } = getBestAboutText(
    { name: place.name, description: place.description },
    { intro: aiContent.intro, secondary: aiContent.secondary, bullets: aiContent.bullets }
  );

  // Get plan features
  const planKey = (business.planKey || "FREE") as PlanKey;
  const planFeatures = getPlanFeatures(planKey);

  const labels = {
    en: {
      title: "Manage Place",
      description: "Edit your listing details and photos",
      back: "Back to Places",
      overview: "Overview",
      location: "Location",
      rating: "Rating",
      reviews: "reviews",
      noReviews: "No reviews yet",
      leads: "Leads",
      verified: "Verified",
      premium: "Premium",
      viewListing: "View Public Listing",
      plan: "Current Plan",
      businessDetails: "Business Details",
      businessDetailsDesc: "Edit your business name, address, contact info and description",
    },
    nl: {
      title: "Locatie Beheren",
      description: "Bewerk je vermelding details en foto's",
      back: "Terug naar Locaties",
      overview: "Overzicht",
      location: "Locatie",
      rating: "Beoordeling",
      reviews: "reviews",
      noReviews: "Nog geen reviews",
      leads: "Leads",
      verified: "Geverifieerd",
      premium: "Premium",
      viewListing: "Bekijk Publieke Vermelding",
      plan: "Huidige Abonnement",
      businessDetails: "Bedrijfsgegevens",
      businessDetailsDesc: "Bewerk je bedrijfsnaam, adres, contactgegevens en beschrijving",
    },
    de: {
      title: "Standort Verwalten",
      description: "Bearbeiten Sie Ihre Eintragsdetails und Fotos",
      back: "Zurück zu Standorten",
      overview: "Übersicht",
      location: "Standort",
      rating: "Bewertung",
      reviews: "Bewertungen",
      noReviews: "Noch keine Bewertungen",
      leads: "Leads",
      verified: "Verifiziert",
      premium: "Premium",
      viewListing: "Öffentlichen Eintrag Ansehen",
      plan: "Aktueller Plan",
      businessDetails: "Geschäftsdetails",
      businessDetailsDesc: "Bearbeiten Sie Ihren Firmennamen, Adresse, Kontaktdaten und Beschreibung",
    },
  };

  const t = labels[locale as keyof typeof labels] || labels.en;

  // Build public listing URL
  const publicUrl = `/${locale}/${place.countrySlug || "unknown"}/${place.citySlug || "unknown"}/business/${place.slug}`;

  return (
    <>
      <DashboardHeader title={place.name} description={t.description} />

      {/* Action buttons below header */}
      <div className="px-6 py-3 border-b bg-slate-50 flex items-center gap-3">
        <Button variant="outline" asChild>
          <Link href={`/${locale}/dashboard/business/${businessId}/places`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t.back}
          </Link>
        </Button>
        <Button asChild>
          <Link href={publicUrl} target="_blank">
            {t.viewListing}
            <ExternalLink className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </div>

      <div className="p-6 space-y-6">
        {/* Overview Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-cpAqua" />
              {t.overview}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Location */}
              <div>
                <p className="text-sm text-slate-500 mb-1">{t.location}</p>
                <div className="flex items-center gap-1 font-medium">
                  <MapPin className="h-4 w-4 text-cpPink" />
                  {place.cityName}, {place.countryName}
                </div>
              </div>

              {/* Rating */}
              <div>
                <p className="text-sm text-slate-500 mb-1">{t.rating}</p>
                {place.avgRating && Number(place.avgRating) > 0 ? (
                  <div className="flex items-center gap-1 font-medium">
                    <Star className="h-4 w-4 fill-cpYellow text-cpYellow" />
                    {Number(place.avgRating).toFixed(1)}
                    <span className="text-slate-500 text-sm">
                      ({place.reviewCount} {t.reviews})
                    </span>
                  </div>
                ) : (
                  <span className="text-slate-400">{t.noReviews}</span>
                )}
              </div>

              {/* Status */}
              <div>
                <p className="text-sm text-slate-500 mb-1">Status</p>
                <div className="flex items-center gap-1">
                  {place.isVerified && (
                    <Badge className="bg-cpAqua/20 text-cpAqua border-cpAqua gap-1">
                      <CheckCircle className="h-3 w-3" />
                      {t.verified}
                    </Badge>
                  )}
                  {place.isPremium && (
                    <Badge className="bg-cpYellow/20 text-cpYellow border-cpYellow gap-1">
                      <Crown className="h-3 w-3" />
                      {t.premium}
                    </Badge>
                  )}
                  {!place.isVerified && !place.isPremium && (
                    <span className="text-slate-400">-</span>
                  )}
                </div>
              </div>

              {/* Plan */}
              <div>
                <p className="text-sm text-slate-500 mb-1">{t.plan}</p>
                <Badge
                  variant="outline"
                  className={
                    planKey === "ELITE"
                      ? "bg-purple-100 text-purple-700 border-purple-300"
                      : planKey === "PRO"
                        ? "bg-amber-100 text-amber-700 border-amber-300"
                        : planKey === "STARTER"
                          ? "bg-blue-100 text-blue-700 border-blue-300"
                          : "bg-slate-100 text-slate-700 border-slate-300"
                  }
                >
                  {planKey}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Details Editor */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-cpAqua" />
              {t.businessDetails}
            </CardTitle>
            <CardDescription>{t.businessDetailsDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <ListingEditForm
              listingId={placeIdNum}
              initialData={{
                name: place.name,
                address: place.address || "",
                website: place.website || "",
                phone: place.phone || "",
                description: displayedAboutText,
              }}
              locale={locale}
            />
          </CardContent>
        </Card>

        {/* Photo Manager */}
        <PhotoManager
          businessId={businessIdNum}
          placeId={placeIdNum}
          photos={photosWithUrls}
          maxPhotos={planFeatures.maxPhotos}
          planKey={planKey}
          locale={locale}
        />

        {/* Category Selector */}
        <CategorySelector
          businessId={businessIdNum}
          placeId={placeIdNum}
          maxCategories={planFeatures.maxCategories}
          planKey={planKey}
          locale={locale}
        />
      </div>
    </>
  );
}
