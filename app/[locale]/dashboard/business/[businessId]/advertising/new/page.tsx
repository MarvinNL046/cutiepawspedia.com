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

  // Localization labels
  const labels = {
    en: {
      backToAdvertising: "Back to advertising",
      newCampaign: "New Campaign",
      createAdPromote: "Create your ad and start promoting",
      selectedPackage: "Selected Package",
      price: "Price",
      duration: "Duration",
      days: "days",
      placements: "Placements",
      maxImpressions: "Max impressions",
      selectPackageFromForm: "Select a package from the form",
    },
    nl: {
      backToAdvertising: "Terug naar adverteren",
      newCampaign: "Nieuwe Campagne",
      createAdPromote: "Maak je advertentie en start met promoten",
      selectedPackage: "Geselecteerd Pakket",
      price: "Prijs",
      duration: "Duur",
      days: "dagen",
      placements: "Plaatsingen",
      maxImpressions: "Max impressies",
      selectPackageFromForm: "Selecteer een pakket hiernaast",
    },
    de: {
      backToAdvertising: "Zurück zur Werbung",
      newCampaign: "Neue Kampagne",
      createAdPromote: "Erstellen Sie Ihre Anzeige und starten Sie die Promotion",
      selectedPackage: "Ausgewähltes Paket",
      price: "Preis",
      duration: "Dauer",
      days: "Tage",
      placements: "Platzierungen",
      maxImpressions: "Max. Impressionen",
      selectPackageFromForm: "Wählen Sie ein Paket aus dem Formular",
    },
    fr: {
      backToAdvertising: "Retour à la publicité",
      newCampaign: "Nouvelle Campagne",
      createAdPromote: "Créez votre annonce et commencez à promouvoir",
      selectedPackage: "Forfait Sélectionné",
      price: "Prix",
      duration: "Durée",
      days: "jours",
      placements: "Emplacements",
      maxImpressions: "Impressions max",
      selectPackageFromForm: "Sélectionnez un forfait dans le formulaire",
    },
  };

  const t = labels[locale as keyof typeof labels] || labels.en;

  // Get placement labels
  const placementLabels: Record<string, { en: string; nl: string; de: string; fr: string }> = {
    blog_sidebar: { en: "Blog Sidebar", nl: "Blog Zijbalk", de: "Blog-Seitenleiste", fr: "Barre latérale du blog" },
    blog_inline: { en: "Blog In-Content", nl: "Blog In-Content", de: "Blog Im-Inhalt", fr: "Blog Dans le Contenu" },
    directory_sidebar: { en: "Directory Sidebar", nl: "Directory Zijbalk", de: "Verzeichnis-Seitenleiste", fr: "Barre latérale annuaire" },
    search_results: { en: "Search Results", nl: "Zoekresultaten", de: "Suchergebnisse", fr: "Résultats de recherche" },
    homepage_featured: { en: "Homepage Featured", nl: "Homepage Uitgelicht", de: "Homepage Hervorgehoben", fr: "Page d'accueil en vedette" },
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
            {t.backToAdvertising}
          </Link>

          <h1 className="text-2xl font-bold text-cpDark flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-cpCoral" />
            {t.newCampaign}
          </h1>
          <p className="text-slate-600 mt-1">
            {t.createAdPromote}
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
                  {t.selectedPackage}
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
                        {t.price}
                      </span>
                      <span className="text-2xl font-bold text-cpDark">
                        {formatPrice(selectedPackage.priceCents)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-slate-500">
                        {t.duration}
                      </span>
                      <span className="text-slate-700">
                        {selectedPackage.durationDays} {t.days}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t space-y-2">
                    <p className="text-xs font-medium text-slate-500 uppercase">
                      {t.placements}
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
                            {placementLabels[placement]?.[locale as keyof typeof placementLabels[string]] ||
                              placementLabels[placement]?.en || placement}
                          </span>
                        </div>
                      ))}
                  </div>

                  {selectedPackage.maxImpressions && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">
                          {t.maxImpressions}
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
                  {t.selectPackageFromForm}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
