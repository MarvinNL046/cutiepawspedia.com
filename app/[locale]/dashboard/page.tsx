/**
 * Dashboard Index - Redirects to appropriate dashboard
 *
 * - If user has businesses: redirect to first business dashboard
 * - If admin with no businesses: show business selector
 * - Otherwise: show "no businesses" message
 */

import { redirect } from "next/navigation";
import Link from "next/link";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId, getBusinessesForUser } from "@/db/queries";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Plus, Shield, ArrowRight } from "lucide-react";
import { setRequestLocale, getTranslations } from 'next-intl/server';

interface DashboardPageProps {
  params: Promise<{ locale: string }>;
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("dashboard");

  // Get current user
  const stackUser = await stackServerApp?.getUser();
  if (!stackUser) {
    redirect(`/handler/sign-in?after_auth_return_to=/${locale}/dashboard`);
  }

  const dbUser = await getUserByStackAuthId(stackUser.id);
  if (!dbUser) {
    redirect(`/handler/sign-in?after_auth_return_to=/${locale}/dashboard`);
  }

  // Get user's businesses
  const businesses = await getBusinessesForUser(dbUser.id);

  // If user has exactly one business, redirect directly
  if (businesses.length === 1) {
    redirect(`/${locale}/dashboard/business/${businesses[0].id}`);
  }

  // If user has multiple businesses, show selector
  if (businesses.length > 1) {
    return (
      <div className="min-h-screen bg-background dark:bg-cpCharcoal p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground dark:text-cpCream">
              {t("selectBusiness")}
            </h1>
            <p className="text-muted-foreground dark:text-cpCream/70 mt-2">
              {t("selectBusinessDesc")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {businesses.map((business) => (
              <Link key={business.id} href={`/${locale}/dashboard/business/${business.id}`}>
                <Card className="hover:border-cpCoral hover:shadow-md hover:shadow-cpCoral/10 transition-all cursor-pointer bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20">
                  <CardHeader className="flex flex-row items-center gap-4">
                    {business.logo ? (
                      <img
                        src={business.logo}
                        alt={business.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-cpCoral/10 flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-cpCoral" />
                      </div>
                    )}
                    <div className="flex-1">
                      <CardTitle className="text-lg text-foreground dark:text-cpCream">{business.name}</CardTitle>
                      <CardDescription className="capitalize dark:text-cpCream/60">{business.plan} plan</CardDescription>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground dark:text-cpCream/60" />
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>

          {/* Admin link */}
          {dbUser.role === "admin" && (
            <div className="mt-8 pt-8 border-t border-border dark:border-cpAmber/20">
              <Link href={`/${locale}/admin`}>
                <Button variant="outline" className="gap-2 dark:border-cpAmber/30 dark:text-cpCream dark:hover:bg-cpAmber/10">
                  <Shield className="h-4 w-4" />
                  {t("goToAdminPanel")}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  // No businesses - show CTA
  return (
    <div className="min-h-screen bg-background dark:bg-cpCharcoal flex items-center justify-center p-8">
      <Card className="max-w-md w-full bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20">
        <CardHeader className="text-center">
          <div className="w-16 h-16 rounded-full bg-cpCoral/10 flex items-center justify-center mx-auto mb-4">
            <Building2 className="h-8 w-8 text-cpCoral" />
          </div>
          <CardTitle className="text-2xl text-foreground dark:text-cpCream">
            {t("noBusinesses")}
          </CardTitle>
          <CardDescription className="dark:text-cpCream/70">
            {t("noBusinessesDesc")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link href={`/${locale}/onboarding/business`} className="block">
            <Button className="w-full bg-cpCoral hover:bg-cpCoral/90 gap-2">
              <Plus className="h-4 w-4" />
              {t("registerYourBusiness")}
            </Button>
          </Link>

          <Link href={`/${locale}/account/favorites`} className="block">
            <Button variant="outline" className="w-full dark:border-cpAmber/30 dark:text-cpCream dark:hover:bg-cpAmber/10">
              {t("backToMyAccount")}
            </Button>
          </Link>

          {/* Admin link */}
          {dbUser.role === "admin" && (
            <Link href={`/${locale}/admin`} className="block">
              <Button variant="ghost" className="w-full gap-2 text-muted-foreground dark:text-cpCream/70">
                <Shield className="h-4 w-4" />
                {t("adminPanel")}
              </Button>
            </Link>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
