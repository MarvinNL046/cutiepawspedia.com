"use client";

import { useAuth } from "@/lib/auth/use-auth";
import { Button } from "@/components/ui/button";
import { Building2, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

interface ClaimPlaceCTAProps {
  placeSlug: string;
  businessId: number | null;
  hasPendingClaim?: boolean;
  locale: string;
  countrySlug: string;
  citySlug: string;
  categorySlug: string;
}

const labels = {
  en: {
    claim: "Claim this place",
    claimDesc: "Are you the owner? Claim this profile to manage your business listing.",
    pending: "Claim pending",
    pendingDesc: "Your claim is being reviewed. We'll notify you once it's approved.",
    claimed: "Verified business",
    claimedDesc: "This business has been claimed and verified.",
    loginToClaim: "Log in to claim",
  },
  nl: {
    claim: "Claim dit bedrijf",
    claimDesc: "Ben jij de eigenaar? Claim dit profiel om je bedrijfspagina te beheren.",
    pending: "Claim in behandeling",
    pendingDesc: "Je aanvraag wordt beoordeeld. We laten je weten zodra deze is goedgekeurd.",
    claimed: "Geverifieerd bedrijf",
    claimedDesc: "Dit bedrijf is geclaimd en geverifieerd.",
    loginToClaim: "Log in om te claimen",
  },
  de: {
    claim: "Diesen Eintrag beanspruchen",
    claimDesc: "Sind Sie der Inhaber? Beanspruchen Sie dieses Profil, um Ihren Eintrag zu verwalten.",
    pending: "Antrag in Bearbeitung",
    pendingDesc: "Ihr Antrag wird geprüft. Wir benachrichtigen Sie, sobald er genehmigt wurde.",
    claimed: "Verifiziertes Unternehmen",
    claimedDesc: "Dieses Unternehmen wurde beansprucht und verifiziert.",
    loginToClaim: "Zum Beanspruchen anmelden",
  },
};

export function ClaimPlaceCTA({
  placeSlug,
  businessId,
  hasPendingClaim = false,
  locale,
  countrySlug,
  citySlug,
  categorySlug,
}: ClaimPlaceCTAProps) {
  const user = useAuth();
  const t = labels[locale as keyof typeof labels] || labels.en;

  // Place already claimed
  if (businessId) {
    return (
      <div className="flex items-start gap-3 p-4 bg-cpAqua/5 border border-cpAqua/20 rounded-lg">
        <CheckCircle className="h-5 w-5 text-cpAqua shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-cpDark">{t.claimed}</p>
          <p className="text-sm text-slate-500">{t.claimedDesc}</p>
        </div>
      </div>
    );
  }

  // User has pending claim
  if (hasPendingClaim) {
    return (
      <div className="flex items-start gap-3 p-4 bg-cpYellow/5 border border-cpYellow/20 rounded-lg">
        <Clock className="h-5 w-5 text-cpYellow shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-cpDark">{t.pending}</p>
          <p className="text-sm text-slate-500">{t.pendingDesc}</p>
        </div>
      </div>
    );
  }

  const claimUrl = `/${locale}/${countrySlug}/${citySlug}/${categorySlug}/${placeSlug}/claim`;

  // Not logged in - show login redirect
  if (!user) {
    const loginUrl = `/handler/sign-in?after_auth_return_to=${encodeURIComponent(claimUrl)}`;
    return (
      <div className="p-4 border border-slate-200 rounded-lg">
        <div className="flex items-start gap-3 mb-3">
          <Building2 className="h-5 w-5 text-cpPink shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-cpDark">{t.claim}</p>
            <p className="text-sm text-slate-500">{t.claimDesc}</p>
          </div>
        </div>
        <Button asChild className="w-full bg-cpPink hover:bg-cpPink/90">
          <Link href={loginUrl}>
            <Building2 className="h-4 w-4 mr-2" />
            {t.loginToClaim}
          </Link>
        </Button>
      </div>
    );
  }

  // Logged in - show claim button
  return (
    <div className="p-4 border border-slate-200 rounded-lg">
      <div className="flex items-start gap-3 mb-3">
        <Building2 className="h-5 w-5 text-cpPink shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-cpDark">{t.claim}</p>
          <p className="text-sm text-slate-500">{t.claimDesc}</p>
        </div>
      </div>
      <Button asChild className="w-full bg-cpPink hover:bg-cpPink/90">
        <Link href={claimUrl}>
          <Building2 className="h-4 w-4 mr-2" />
          {t.claim}
        </Link>
      </Button>
    </div>
  );
}
