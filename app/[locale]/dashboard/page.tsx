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

interface DashboardPageProps {
  params: Promise<{ locale: string }>;
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = await params;

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
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-cpDark">
              {locale === "nl" ? "Kies een bedrijf" : "Select a Business"}
            </h1>
            <p className="text-slate-600 mt-2">
              {locale === "nl"
                ? "Je hebt meerdere bedrijven. Kies welke je wilt beheren."
                : "You have multiple businesses. Choose which one to manage."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {businesses.map((business) => (
              <Link key={business.id} href={`/${locale}/dashboard/business/${business.id}`}>
                <Card className="hover:border-cpPink hover:shadow-md transition-all cursor-pointer">
                  <CardHeader className="flex flex-row items-center gap-4">
                    {business.logo ? (
                      <img
                        src={business.logo}
                        alt={business.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-cpPink/10 flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-cpPink" />
                      </div>
                    )}
                    <div className="flex-1">
                      <CardTitle className="text-lg">{business.name}</CardTitle>
                      <CardDescription className="capitalize">{business.plan} plan</CardDescription>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-400" />
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>

          {/* Admin link */}
          {dbUser.role === "admin" && (
            <div className="mt-8 pt-8 border-t">
              <Link href={`/${locale}/admin`}>
                <Button variant="outline" className="gap-2">
                  <Shield className="h-4 w-4" />
                  {locale === "nl" ? "Ga naar Admin Panel" : "Go to Admin Panel"}
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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="w-16 h-16 rounded-full bg-cpPink/10 flex items-center justify-center mx-auto mb-4">
            <Building2 className="h-8 w-8 text-cpPink" />
          </div>
          <CardTitle className="text-2xl">
            {locale === "nl" ? "Geen bedrijven" : "No Businesses"}
          </CardTitle>
          <CardDescription>
            {locale === "nl"
              ? "Je hebt nog geen bedrijven gekoppeld aan je account."
              : "You don't have any businesses linked to your account yet."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link href={`/${locale}/for-businesses`} className="block">
            <Button className="w-full bg-cpPink hover:bg-cpPink/90 gap-2">
              <Plus className="h-4 w-4" />
              {locale === "nl" ? "Claim je bedrijf" : "Claim Your Business"}
            </Button>
          </Link>

          <Link href={`/${locale}/account/favorites`} className="block">
            <Button variant="outline" className="w-full">
              {locale === "nl" ? "Terug naar Mijn Account" : "Back to My Account"}
            </Button>
          </Link>

          {/* Admin link */}
          {dbUser.role === "admin" && (
            <Link href={`/${locale}/admin`} className="block">
              <Button variant="ghost" className="w-full gap-2 text-slate-500">
                <Shield className="h-4 w-4" />
                {locale === "nl" ? "Admin Panel" : "Admin Panel"}
              </Button>
            </Link>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
