/**
 * Business Onboarding Page
 *
 * Multi-step wizard for business registration:
 * 1. Account (sign in/create)
 * 2. Business Details
 * 3. Plan Selection
 * 4. First Place/Location
 */

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId, getBusinessesForUser } from "@/db/queries";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";

interface OnboardingPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ plan?: string; cancelled?: string }>;
}

export async function generateMetadata({ params }: OnboardingPageProps): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    en: "Register Your Pet Business | CutiePawsPedia",
    nl: "Registreer Je Bedrijf | CutiePawsPedia",
    de: "Registriere Dein Unternehmen | CutiePawsPedia",
  };

  const descriptions = {
    en: "Register your pet business on CutiePawsPedia and reach thousands of pet owners.",
    nl: "Registreer je dierenbedrijf op CutiePawsPedia en bereik duizenden huisdiereigenaren.",
    de: "Registriere dein Tiergeschäft bei CutiePawsPedia und erreiche tausende Tierbesitzer.",
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
  };
}

export default async function OnboardingPage({ params, searchParams }: OnboardingPageProps) {
  const { locale } = await params;
  const { plan: initialPlan, cancelled } = await searchParams;

  // Check if user is logged in
  const stackUser = stackServerApp ? await stackServerApp.getUser() : null;
  let dbUser = null;
  let existingBusinesses: { id: number; name: string }[] = [];

  if (stackUser) {
    dbUser = await getUserByStackAuthId(stackUser.id);

    // If user already has businesses, redirect to dashboard
    if (dbUser) {
      existingBusinesses = await getBusinessesForUser(dbUser.id);
      if (existingBusinesses.length > 0) {
        redirect(`/${locale}/dashboard/business/${existingBusinesses[0].id}`);
      }
    }
  }

  const translations = {
    en: {
      title: "Register Your Pet Business",
      subtitle: "Join thousands of pet businesses on CutiePawsPedia",
      steps: {
        account: "Account",
        business: "Business",
        plan: "Plan",
        place: "Location",
      },
    },
    nl: {
      title: "Registreer Je Dierenbedrijf",
      subtitle: "Sluit je aan bij duizenden dierenbedrijven op CutiePawsPedia",
      steps: {
        account: "Account",
        business: "Bedrijf",
        plan: "Abonnement",
        place: "Locatie",
      },
    },
    de: {
      title: "Registriere Dein Tiergeschäft",
      subtitle: "Schließe dich tausenden Tierunternehmen auf CutiePawsPedia an",
      steps: {
        account: "Konto",
        business: "Unternehmen",
        plan: "Abo",
        place: "Standort",
      },
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-cpDark dark:text-white mb-3">
            {t.title}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            {t.subtitle}
          </p>
        </div>

        {/* Cancelled payment notice */}
        {cancelled && (
          <div className="mb-6 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 text-sm">
            {locale === "nl"
              ? "Betaling geannuleerd. Je kunt het opnieuw proberen of een ander plan kiezen."
              : locale === "de"
                ? "Zahlung abgebrochen. Du kannst es erneut versuchen oder einen anderen Plan wählen."
                : "Payment cancelled. You can try again or choose a different plan."}
          </div>
        )}

        {/* Wizard */}
        <OnboardingWizard
          locale={locale}
          stepLabels={t.steps}
          isLoggedIn={!!stackUser}
          userId={dbUser?.id}
          userEmail={stackUser?.primaryEmail || undefined}
          initialPlan={initialPlan as "FREE" | "STARTER" | "PRO" | "ELITE" | undefined}
        />
      </div>
    </div>
  );
}
