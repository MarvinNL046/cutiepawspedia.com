/**
 * Claim Place Page - Business ownership claim form
 */

import { notFound, redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPlaceBySlug } from "@/db/queries";
import { getClaims } from "@/db/queries/claims";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId } from "@/db/queries/users";
import { Breadcrumbs } from "@/components/layout";
import { MapPin, Building2, AlertCircle } from "lucide-react";
import { ClaimForm } from "./ClaimForm";
import type { Metadata } from "next";

interface ClaimPageProps {
  params: Promise<{
    locale: string;
    countrySlug: string;
    citySlug: string;
    categorySlug: string;
    placeSlug: string;
  }>;
}

export async function generateMetadata({ params }: ClaimPageProps): Promise<Metadata> {
  const { placeSlug, locale } = await params;
  const title = locale === "nl"
    ? `Claim ${placeSlug.replace(/-/g, " ")} | CutiePawsPedia`
    : `Claim ${placeSlug.replace(/-/g, " ")} | CutiePawsPedia`;
  return {
    title,
    robots: { index: false, follow: false },
  };
}

export default async function ClaimPage({ params }: ClaimPageProps) {
  const { locale, countrySlug, citySlug, categorySlug, placeSlug } = await params;

  // Get place
  const place = await getPlaceBySlug(placeSlug, citySlug, countrySlug);
  if (!place) notFound();

  // Check if place is already claimed
  if (place.businessId) {
    redirect(`/${locale}/${countrySlug}/${citySlug}/${categorySlug}/${placeSlug}?claimed=true`);
  }

  // Get current user
  const stackUser = await stackServerApp?.getUser();
  if (!stackUser) {
    // Redirect to login
    const returnUrl = `/${locale}/${countrySlug}/${citySlug}/${categorySlug}/${placeSlug}/claim`;
    redirect(`/handler/sign-in?after_auth_return_to=${encodeURIComponent(returnUrl)}`);
  }

  // Get or create database user
  let dbUser = await getUserByStackAuthId(stackUser.id);

  // If user doesn't exist in DB yet, sync them
  if (!dbUser) {
    const syncResponse = await fetch(`${process.env.APP_BASE_URL || 'http://localhost:3000'}/api/auth/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (syncResponse.ok) {
      dbUser = await getUserByStackAuthId(stackUser.id);
    }
  }

  if (!dbUser) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-12">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 text-red-600">
              <AlertCircle className="h-5 w-5" />
              <p>Unable to verify your account. Please try signing out and back in.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check if user already has a pending claim for this place
  const { claims: existingClaims } = await getClaims({
    placeId: place.id,
    userId: dbUser.id,
    status: "pending",
    limit: 1,
  });

  if (existingClaims.length > 0) {
    redirect(`/${locale}/${countrySlug}/${citySlug}/${categorySlug}/${placeSlug}?claim=pending`);
  }

  const cityName = place.city?.name || citySlug;
  const countryName = place.city?.country?.name || countrySlug;

  const labels = {
    en: {
      title: "Claim this business",
      description: "Submit your claim to manage this business listing. Our team will review your request within 2-3 business days.",
      placeInfo: "Business Information",
    },
    nl: {
      title: "Claim dit bedrijf",
      description: "Dien je claim in om deze bedrijfspagina te beheren. Ons team beoordeelt je aanvraag binnen 2-3 werkdagen.",
      placeInfo: "Bedrijfsinformatie",
    },
    de: {
      title: "Diesen Eintrag beanspruchen",
      description: "Reichen Sie Ihren Antrag ein, um diesen Geschäftseintrag zu verwalten. Unser Team wird Ihre Anfrage innerhalb von 2-3 Werktagen prüfen.",
      placeInfo: "Geschäftsinformationen",
    },
  };

  const t = labels[locale as keyof typeof labels] || labels.en;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Directory", href: `/${locale}` },
            { label: countryName, href: `/${locale}/${countrySlug}` },
            { label: cityName, href: `/${locale}/${countrySlug}/${citySlug}` },
            { label: place.name, href: `/${locale}/${countrySlug}/${citySlug}/${categorySlug}/${placeSlug}` },
            { label: t.title },
          ]}
        />

        <div className="mt-6 space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cpPink/10 mb-4">
              <Building2 className="h-8 w-8 text-cpPink" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-cpDark">{t.title}</h1>
            <p className="mt-2 text-slate-600 max-w-md mx-auto">{t.description}</p>
          </div>

          {/* Place Info Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{t.placeInfo}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-cpPink/10 flex items-center justify-center shrink-0">
                  <Building2 className="h-6 w-6 text-cpPink" />
                </div>
                <div>
                  <h3 className="font-semibold text-cpDark">{place.name}</h3>
                  {place.address && (
                    <div className="flex items-center gap-1.5 text-sm text-slate-500 mt-1">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{place.address}, {cityName}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Claim Form */}
          <ClaimForm
            placeId={place.id}
            placeName={place.name}
            userId={dbUser.id}
            userEmail={dbUser.email}
            locale={locale}
            returnUrl={`/${locale}/${countrySlug}/${citySlug}/${categorySlug}/${placeSlug}`}
          />
        </div>
      </div>
    </div>
  );
}
