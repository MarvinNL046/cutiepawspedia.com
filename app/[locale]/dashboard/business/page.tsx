/**
 * Business Dashboard Index - Lists user's businesses or redirects to first one
 */

import { redirect } from "next/navigation";
import Link from "next/link";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId, getBusinessesForUser } from "@/db/queries";
import { DashboardHeader } from "@/components/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Plus, ChevronRight } from "lucide-react";

interface BusinessIndexPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BusinessIndexPage({ params }: BusinessIndexPageProps) {
  const { locale } = await params;

  // Get current user
  const stackUser = await stackServerApp?.getUser();
  if (!stackUser) {
    redirect(`/handler/sign-in?after_auth_return_to=/${locale}/dashboard/business`);
  }

  const dbUser = await getUserByStackAuthId(stackUser.id);
  if (!dbUser) {
    redirect(`/handler/sign-in?after_auth_return_to=/${locale}/dashboard/business`);
  }

  // Get user's businesses
  const businesses = await getBusinessesForUser(dbUser.id);

  // If user has exactly one business, redirect directly to it
  if (businesses.length === 1) {
    redirect(`/${locale}/dashboard/business/${businesses[0].id}`);
  }

  // If user has multiple businesses, show selection page
  // If user has no businesses, show "no businesses" state

  const labels = {
    en: {
      title: "My Businesses",
      description: "Select a business to manage",
      noBusiness: "No businesses yet",
      noBusinessDesc: "You don't have any businesses registered. Start the onboarding to get listed!",
      claimListing: "Register Your Business",
      selectBusiness: "Select",
      credits: "credits",
    },
    nl: {
      title: "Mijn Bedrijven",
      description: "Selecteer een bedrijf om te beheren",
      noBusiness: "Nog geen bedrijven",
      noBusinessDesc: "Je hebt nog geen bedrijven geregistreerd. Start de onboarding om vermeld te worden!",
      claimListing: "Registreer Je Bedrijf",
      selectBusiness: "Selecteer",
      credits: "credits",
    },
    de: {
      title: "Meine Unternehmen",
      description: "Wählen Sie ein Unternehmen zur Verwaltung",
      noBusiness: "Noch keine Unternehmen",
      noBusinessDesc: "Sie haben noch keine Unternehmen registriert. Starten Sie das Onboarding, um gelistet zu werden!",
      claimListing: "Unternehmen Registrieren",
      selectBusiness: "Auswählen",
      credits: "Credits",
    },
  };

  const t = labels[locale as keyof typeof labels] || labels.en;

  return (
    <>
      <DashboardHeader
        title={t.title}
        description={t.description}
      />

      <div className="p-6">
        {businesses.length === 0 ? (
          // No businesses state
          <Card className="max-w-md mx-auto mt-12">
            <CardContent className="pt-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cpCoral/10 mb-4">
                <Building2 className="h-8 w-8 text-cpCoral" />
              </div>
              <h3 className="text-xl font-semibold text-cpDark mb-2">{t.noBusiness}</h3>
              <p className="text-slate-600 mb-6">{t.noBusinessDesc}</p>
              <Button asChild className="bg-cpCoral hover:bg-cpCoral/90">
                <Link href={`/${locale}/onboarding/business`}>
                  <Plus className="h-4 w-4 mr-2" />
                  {t.claimListing}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          // Multiple businesses grid
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {businesses.map((business) => (
              <Link
                key={business.id}
                href={`/${locale}/dashboard/business/${business.id}`}
              >
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
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
                        <div>
                          <CardTitle className="text-lg">{business.name}</CardTitle>
                          <Badge
                            variant={business.status === "active" ? "default" : "secondary"}
                            className={business.status === "active" ? "bg-cpAqua/20 text-cpAqua" : ""}
                          >
                            {business.status}
                          </Badge>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-slate-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Plan: {business.plan}</span>
                      {/* Credits feature disabled for now
                      <span className="flex items-center gap-1 text-cpDark font-medium">
                        <CreditCard className="h-4 w-4" />
                        {(business.creditBalanceCents / 100).toFixed(2)} {t.credits}
                      </span>
                      */}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
