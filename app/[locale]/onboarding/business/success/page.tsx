/**
 * Onboarding Success Page
 *
 * Shown after successful Stripe payment.
 * Creates the business using stored metadata from checkout session.
 */

import { redirect, notFound } from "next/navigation";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId } from "@/db/queries/users";
import Stripe from "stripe";
import { createBusiness } from "@/app/api/onboarding/business/route";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, ArrowRight, Loader2 } from "lucide-react";

interface SuccessPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ session_id?: string }>;
}

// Don't cache this page - needs to process the payment
export const dynamic = "force-dynamic";

export default async function SuccessPage({
  params,
  searchParams,
}: SuccessPageProps) {
  const { locale } = await params;
  const { session_id } = await searchParams;

  if (!session_id) {
    notFound();
  }

  // Get current user
  const stackUser = stackServerApp ? await stackServerApp.getUser() : null;
  if (!stackUser) {
    redirect(`/handler/sign-in?after_auth_return_to=/${locale}/onboarding/business/success?session_id=${session_id}`);
  }

  const dbUser = await getUserByStackAuthId(stackUser.id);
  if (!dbUser) {
    redirect(`/${locale}/onboarding/business`);
  }

  // Initialize Stripe
  const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-11-17.clover" })
    : null;

  if (!stripe) {
    return (
      <ErrorPage
        locale={locale}
        error="Payment processing is not configured"
      />
    );
  }

  try {
    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return (
        <ErrorPage
          locale={locale}
          error="Payment was not completed"
        />
      );
    }

    // Extract business data from metadata
    const metadata = session.metadata;
    if (!metadata) {
      return (
        <ErrorPage
          locale={locale}
          error="Missing business data"
        />
      );
    }

    // Verify user ID matches
    if (metadata.userId !== dbUser.id.toString()) {
      return (
        <ErrorPage
          locale={locale}
          error="User mismatch"
        />
      );
    }

    // Create the business
    const result = await createBusiness(dbUser.id, {
      businessName: metadata.businessName,
      businessDescription: metadata.businessDescription || "",
      businessPhone: metadata.businessPhone || "",
      businessEmail: metadata.businessEmail,
      businessWebsite: metadata.businessWebsite || "",
      countryId: parseInt(metadata.countryId),
      planKey: metadata.planKey as "STARTER" | "PRO" | "ELITE",
      placeName: metadata.placeName || undefined,
      placeDescription: metadata.placeDescription || undefined,
      placeAddress: metadata.placeAddress || undefined,
      cityId: metadata.cityId ? parseInt(metadata.cityId) : undefined,
      categoryIds: metadata.categoryIds ? JSON.parse(metadata.categoryIds) : [],
      claimPlaceId: metadata.claimPlaceId ? parseInt(metadata.claimPlaceId) : undefined,
    });

    if (!result.success || !result.businessId) {
      return (
        <ErrorPage
          locale={locale}
          error={result.error || "Failed to create business"}
        />
      );
    }

    // Show success and redirect
    const translations = {
      en: {
        title: "Welcome to CutiePawsPedia!",
        subtitle: "Your business has been successfully registered",
        description: "Your subscription is now active. You can start managing your business profile, add more locations, and connect with pet owners.",
        button: "Go to Dashboard",
      },
      nl: {
        title: "Welkom bij CutiePawsPedia!",
        subtitle: "Je bedrijf is succesvol geregistreerd",
        description: "Je abonnement is nu actief. Je kunt beginnen met het beheren van je bedrijfsprofiel, meer locaties toevoegen en contact maken met huisdiereigenaren.",
        button: "Naar Dashboard",
      },
      de: {
        title: "Willkommen bei CutiePawsPedia!",
        subtitle: "Dein Unternehmen wurde erfolgreich registriert",
        description: "Dein Abonnement ist jetzt aktiv. Du kannst mit der Verwaltung deines Unternehmensprofils beginnen, weitere Standorte hinzufügen und dich mit Tierbesitzern verbinden.",
        button: "Zum Dashboard",
      },
    };

    const t = translations[locale as keyof typeof translations] || translations.en;

    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-8 pb-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>

            <h1 className="text-2xl font-bold text-cpDark dark:text-white mb-2">
              {t.title}
            </h1>
            <p className="text-lg text-cpPink font-medium mb-4">
              {t.subtitle}
            </p>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              {t.description}
            </p>

            <Button asChild className="bg-cpPink hover:bg-cpPink/90">
              <Link href={`/${locale}/dashboard/business/${result.businessId}`}>
                {t.button}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  } catch (error) {
    console.error("Error processing success:", error);
    return (
      <ErrorPage
        locale={locale}
        error="An error occurred processing your payment"
      />
    );
  }
}

function ErrorPage({ locale, error }: { locale: string; error: string }) {
  const translations = {
    en: {
      title: "Something went wrong",
      tryAgain: "Try Again",
      contact: "If this problem persists, please contact support.",
    },
    nl: {
      title: "Er is iets misgegaan",
      tryAgain: "Opnieuw proberen",
      contact: "Als dit probleem aanhoudt, neem dan contact op met support.",
    },
    de: {
      title: "Etwas ist schief gelaufen",
      tryAgain: "Erneut versuchen",
      contact: "Wenn dieses Problem weiterhin besteht, wenden Sie sich bitte an den Support.",
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-8 pb-8 text-center">
          <h1 className="text-2xl font-bold text-cpDark dark:text-white mb-4">
            {t.title}
          </h1>
          <p className="text-red-600 dark:text-red-400 mb-4">
            {error}
          </p>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            {t.contact}
          </p>
          <Button asChild variant="outline">
            <Link href={`/${locale}/onboarding/business`}>
              {t.tryAgain}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
