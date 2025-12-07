/**
 * New Ad Campaign Page
 *
 * Form for creating a new ad campaign with Stripe checkout.
 */

import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { stackServerApp } from "@/lib/auth/stack";
import {
  getUserByStackAuthId,
  getBusinessByIdForUser,
  getAdPackages,
} from "@/db/queries";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Megaphone, Check, Sparkles } from "lucide-react";
import { CampaignForm } from "./CampaignForm";

interface NewCampaignPageProps {
  params: Promise<{ locale: string; businessId: string }>;
  searchParams: Promise<{ package?: string }>;
}

export default async function NewCampaignPage({
  params,
  searchParams,
}: NewCampaignPageProps) {
  const { locale, businessId } = await params;
  const { package: packageKey } = await searchParams;
  const businessIdNum = parseInt(businessId, 10);

  // Auth check
  if (!stackServerApp) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-600">Authentication not configured.</p>
      </div>
    );
  }

  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    redirect(
      `/handler/sign-in?after_auth_return_to=/${locale}/dashboard/business/${businessId}/advertising/new`
    );
  }

  const dbUser = await getUserByStackAuthId(stackUser.id);
  if (!dbUser) {
    redirect(`/handler/sign-in`);
  }

  // Get business (with admin bypass)
  let business;
  if (dbUser.role === "admin") {
    const { getBusinessById } = await import("@/db/queries/businesses");
    business = await getBusinessById(businessIdNum);
  } else {
    business = await getBusinessByIdForUser({
      businessId: businessIdNum,
      userId: dbUser.id,
    });
  }

  if (!business) {
    notFound();
  }

  // Get packages
  const packages = await getAdPackages(locale as "en" | "nl");

  // Find selected package or default to first
  const selectedPackage = packageKey
    ? packages.find((p) => p.key === packageKey)
    : packages[0];

  if (!selectedPackage && packages.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-600">No ad packages available.</p>
      </div>
    );
  }

  const isNl = locale === "nl";

  // Get placement labels
  const placementLabels: Record<string, { en: string; nl: string }> = {
    blog_sidebar: { en: "Blog Sidebar", nl: "Blog Zijbalk" },
    blog_inline: { en: "Blog In-Content", nl: "Blog In-Content" },
    directory_sidebar: { en: "Directory Sidebar", nl: "Directory Zijbalk" },
    search_results: { en: "Search Results", nl: "Zoekresultaten" },
    homepage_featured: { en: "Homepage Featured", nl: "Homepage Uitgelicht" },
  };

  // Format price
  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
    }).format(cents / 100);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <Link
            href={`/${locale}/dashboard/business/${businessId}/advertising`}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-cpCoral mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            {isNl ? "Terug naar adverteren" : "Back to advertising"}
          </Link>

          <h1 className="text-2xl font-bold text-cpDark flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-cpCoral" />
            {isNl ? "Nieuwe Campagne" : "New Campaign"}
          </h1>
          <p className="text-slate-600 mt-1">
            {isNl
              ? "Maak je advertentie en start met promoten"
              : "Create your ad and start promoting"}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Column */}
          <div className="lg:col-span-2">
            <CampaignForm
              businessId={businessIdNum}
              businessName={business.name}
              packages={packages.map((pkg) => ({
                id: pkg.id,
                key: pkg.key,
                name: String(pkg.name),
                description: pkg.description ? String(pkg.description) : null,
                priceCents: pkg.priceCents,
                durationDays: pkg.durationDays,
                includedPlacements: pkg.includedPlacements,
                maxImpressions: pkg.maxImpressions,
                isPopular: pkg.isPopular,
              }))}
              selectedPackageKey={selectedPackage?.key || packages[0]?.key}
              locale={locale}
            />
          </div>

          {/* Selected Package Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border-2 border-cpCoral p-6 sticky top-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-cpCoral" />
                <h3 className="font-semibold text-cpDark">
                  {isNl ? "Geselecteerd Pakket" : "Selected Package"}
                </h3>
              </div>

              {selectedPackage ? (
                <>
                  <p className="text-lg font-bold text-cpDark">
                    {String(selectedPackage.name)}
                  </p>
                  <p className="text-sm text-slate-600 mt-1">
                    {selectedPackage.description ? String(selectedPackage.description) : ""}
                  </p>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-baseline">
                      <span className="text-slate-600">
                        {isNl ? "Prijs" : "Price"}
                      </span>
                      <span className="text-2xl font-bold text-cpDark">
                        {formatPrice(selectedPackage.priceCents)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-slate-500">
                        {isNl ? "Duur" : "Duration"}
                      </span>
                      <span className="text-slate-700">
                        {selectedPackage.durationDays}{" "}
                        {isNl ? "dagen" : "days"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t space-y-2">
                    <p className="text-xs font-medium text-slate-500 uppercase">
                      {isNl ? "Plaatsingen" : "Placements"}
                    </p>
                    {selectedPackage.includedPlacements
                      .split(",")
                      .map((placement) => (
                        <div
                          key={placement}
                          className="flex items-center gap-2 text-sm"
                        >
                          <Check className="w-4 h-4 text-cpCoral" />
                          <span className="text-slate-700">
                            {placementLabels[placement]?.[isNl ? "nl" : "en"] ||
                              placement}
                          </span>
                        </div>
                      ))}
                  </div>

                  {selectedPackage.maxImpressions && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">
                          {isNl ? "Max impressies" : "Max impressions"}
                        </span>
                        <span className="text-slate-700">
                          {selectedPackage.maxImpressions.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-slate-500 text-sm">
                  {isNl
                    ? "Selecteer een pakket hiernaast"
                    : "Select a package from the form"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
