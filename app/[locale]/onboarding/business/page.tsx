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
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId, getBusinessesForUser, upsertUserFromStackAuth } from "@/db/queries";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";

interface OnboardingPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ plan?: string; cancelled?: string }>;
}

export async function generateMetadata({ params }: OnboardingPageProps): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "onboarding.metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function OnboardingPage({ params, searchParams }: OnboardingPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { plan: initialPlan, cancelled } = await searchParams;

  // Check if user is logged in
  const stackUser = stackServerApp ? await stackServerApp.getUser() : null;
  let dbUser = null;
  let existingBusinesses: { id: number; name: string }[] = [];

  if (stackUser) {
    // First try to get existing user
    dbUser = await getUserByStackAuthId(stackUser.id);

    // If Stack Auth user exists but not in our DB, sync them now
    if (!dbUser) {
      dbUser = await upsertUserFromStackAuth({
        stackauthId: stackUser.id,
        email: stackUser.primaryEmail || "",
        name: stackUser.displayName,
        emailVerified: stackUser.primaryEmailVerified,
      });
    }

    // If user already has businesses, redirect to dashboard
    if (dbUser) {
      existingBusinesses = await getBusinessesForUser(dbUser.id);
      if (existingBusinesses.length > 0) {
        redirect(`/${locale}/dashboard/business/${existingBusinesses[0].id}`);
      }
    }
  }

  const t = await getTranslations({ locale, namespace: "onboarding.page" });

  const stepLabels = {
    account: t("steps.account"),
    business: t("steps.business"),
    plan: t("steps.plan"),
    place: t("steps.place"),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-cpDark dark:text-white mb-3">
            {t("title")}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            {t("subtitle")}
          </p>
        </div>

        {/* Cancelled payment notice */}
        {cancelled && (
          <div className="mb-6 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 text-sm">
            {t("cancelledPayment")}
          </div>
        )}

        {/* Wizard */}
        <OnboardingWizard
          locale={locale}
          stepLabels={stepLabels}
          isLoggedIn={!!stackUser}
          userId={dbUser?.id}
          userEmail={stackUser?.primaryEmail || undefined}
          initialPlan={initialPlan as "FREE" | "STARTER" | "PRO" | "ELITE" | undefined}
        />
      </div>
    </div>
  );
}
