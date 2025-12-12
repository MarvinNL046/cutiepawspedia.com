"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Loader2,
  CreditCard,
  Image as ImageIcon,
  Link as LinkIcon,
  Type,
  FileText,
  Package,
  Star,
} from "lucide-react";

interface AdPackage {
  id: number;
  key: string;
  name: string;
  description: string | null;
  priceCents: number;
  durationDays: number;
  includedPlacements: string;
  maxImpressions: number | null;
  isPopular: boolean;
}

interface CampaignFormProps {
  businessId: number;
  businessName: string;
  packages: AdPackage[];
  selectedPackageKey: string;
  locale: string;
}

export function CampaignForm({
  businessId,
  businessName,
  packages,
  selectedPackageKey,
  locale,
}: CampaignFormProps) {
  const router = useRouter();

  // Localization labels
  const labels = {
    en: {
      adPackage: "Ad Package",
      selectPackage: "Select package",
      days: "days",
      campaignDetails: "Campaign Details",
      campaignName: "Campaign Name",
      internalOnly: "internal only",
      campaignNamePlaceholder: "e.g. Summer Campaign 2025",
      headlineEnglish: "Headline (English)",
      headlinePlaceholder: "e.g. The best dog groomer!",
      characters: "characters",
      headlineDutch: "Headline (Dutch)",
      headlineNlPlaceholder: "e.g. De beste hondentrimmer!",
      optionalFallback: "Optional - falls back to English",
      description: "Description",
      optional: "optional",
      descriptionEnglish: "Description (English)",
      descriptionPlaceholder: "Short description of your service...",
      descriptionDutch: "Description (Dutch)",
      descriptionNlPlaceholder: "Korte beschrijving...",
      imageAndLink: "Image & Link",
      imageUrl: "Image URL",
      imageRecommended: "Recommended: 300x250px or 728x90px",
      destinationUrl: "Destination URL",
      destinationHint: "Where visitors go when they click",
      ctaEnglish: "CTA (English)",
      ctaDutch: "CTA (Dutch)",
      readyToAdvertise: "Ready to advertise?",
      paymentInfo: "You'll pay {price} for {days} days of advertising",
      loading: "Loading...",
      continueToPayment: "Continue to Payment",
      somethingWentWrong: "Something went wrong",
      campaign: "Campaign",
      learnMore: "Learn More",
    },
    nl: {
      adPackage: "Advertentiepakket",
      selectPackage: "Selecteer pakket",
      days: "dagen",
      campaignDetails: "Campagne Details",
      campaignName: "Campagne Naam",
      internalOnly: "alleen voor jou zichtbaar",
      campaignNamePlaceholder: "Bijv. Zomer Campagne 2025",
      headlineEnglish: "Kop (Engels)",
      headlinePlaceholder: "Bijv. De beste hondentrimmer!",
      characters: "tekens",
      headlineDutch: "Kop (Nederlands)",
      headlineNlPlaceholder: "Bijv. De beste hondentrimmer!",
      optionalFallback: "Optioneel - valt terug op Engelse tekst",
      description: "Beschrijving",
      optional: "optioneel",
      descriptionEnglish: "Beschrijving (Engels)",
      descriptionPlaceholder: "Korte beschrijving van je dienst...",
      descriptionDutch: "Beschrijving (Nederlands)",
      descriptionNlPlaceholder: "Korte beschrijving van je dienst...",
      imageAndLink: "Afbeelding & Link",
      imageUrl: "Afbeelding URL",
      imageRecommended: "Aanbevolen: 300x250px of 728x90px",
      destinationUrl: "Bestemmings URL",
      destinationHint: "Waar bezoekers naartoe gaan als ze klikken",
      ctaEnglish: "CTA (Engels)",
      ctaDutch: "CTA (Nederlands)",
      readyToAdvertise: "Klaar om te adverteren?",
      paymentInfo: "Je betaalt {price} voor {days} dagen adverteren",
      loading: "Laden...",
      continueToPayment: "Doorgaan naar Betaling",
      somethingWentWrong: "Er is iets misgegaan",
      campaign: "Campagne",
      learnMore: "Meer informatie",
    },
    de: {
      adPackage: "Werbepaket",
      selectPackage: "Paket auswählen",
      days: "Tage",
      campaignDetails: "Kampagnendetails",
      campaignName: "Kampagnenname",
      internalOnly: "nur intern sichtbar",
      campaignNamePlaceholder: "z.B. Sommerkampagne 2025",
      headlineEnglish: "Überschrift (Englisch)",
      headlinePlaceholder: "z.B. Der beste Hundefriseur!",
      characters: "Zeichen",
      headlineDutch: "Überschrift (Niederländisch)",
      headlineNlPlaceholder: "z.B. De beste hondentrimmer!",
      optionalFallback: "Optional - greift auf Englisch zurück",
      description: "Beschreibung",
      optional: "optional",
      descriptionEnglish: "Beschreibung (Englisch)",
      descriptionPlaceholder: "Kurze Beschreibung Ihres Services...",
      descriptionDutch: "Beschreibung (Niederländisch)",
      descriptionNlPlaceholder: "Korte beschrijving...",
      imageAndLink: "Bild & Link",
      imageUrl: "Bild-URL",
      imageRecommended: "Empfohlen: 300x250px oder 728x90px",
      destinationUrl: "Ziel-URL",
      destinationHint: "Wohin Besucher beim Klicken gelangen",
      ctaEnglish: "CTA (Englisch)",
      ctaDutch: "CTA (Niederländisch)",
      readyToAdvertise: "Bereit zu werben?",
      paymentInfo: "Sie zahlen {price} für {days} Tage Werbung",
      loading: "Laden...",
      continueToPayment: "Weiter zur Zahlung",
      somethingWentWrong: "Etwas ist schiefgelaufen",
      campaign: "Kampagne",
      learnMore: "Mehr erfahren",
    },
    fr: {
      adPackage: "Forfait Publicitaire",
      selectPackage: "Sélectionner un forfait",
      days: "jours",
      campaignDetails: "Détails de la Campagne",
      campaignName: "Nom de la Campagne",
      internalOnly: "visible uniquement en interne",
      campaignNamePlaceholder: "ex. Campagne Été 2025",
      headlineEnglish: "Titre (Anglais)",
      headlinePlaceholder: "ex. Le meilleur toiletteur pour chiens !",
      characters: "caractères",
      headlineDutch: "Titre (Néerlandais)",
      headlineNlPlaceholder: "ex. De beste hondentrimmer!",
      optionalFallback: "Facultatif - revient à l'anglais",
      description: "Description",
      optional: "facultatif",
      descriptionEnglish: "Description (Anglais)",
      descriptionPlaceholder: "Courte description de votre service...",
      descriptionDutch: "Description (Néerlandais)",
      descriptionNlPlaceholder: "Korte beschrijving...",
      imageAndLink: "Image & Lien",
      imageUrl: "URL de l'image",
      imageRecommended: "Recommandé : 300x250px ou 728x90px",
      destinationUrl: "URL de destination",
      destinationHint: "Où vont les visiteurs lorsqu'ils cliquent",
      ctaEnglish: "CTA (Anglais)",
      ctaDutch: "CTA (Néerlandais)",
      readyToAdvertise: "Prêt à faire de la publicité ?",
      paymentInfo: "Vous paierez {price} pour {days} jours de publicité",
      loading: "Chargement...",
      continueToPayment: "Continuer vers le paiement",
      somethingWentWrong: "Une erreur s'est produite",
      campaign: "Campagne",
      learnMore: "En savoir plus",
    },
  };

  const t = labels[locale as keyof typeof labels] || labels.en;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [packageKey, setPackageKey] = useState(selectedPackageKey);
  const [campaignName, setCampaignName] = useState(
    `${businessName} ${t.campaign}`
  );
  const [headline, setHeadline] = useState("");
  const [headlineNl, setHeadlineNl] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionNl, setDescriptionNl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [destinationUrl, setDestinationUrl] = useState("");
  const [ctaText, setCtaText] = useState(t.learnMore);
  const [ctaTextNl, setCtaTextNl] = useState("Meer informatie");

  const selectedPackage = packages.find((p) => p.key === packageKey);

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
    }).format(cents / 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Step 1: Create the campaign (draft status)
      const createResponse = await fetch("/api/ads/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessId,
          packageKey,
          name: campaignName,
          headline,
          headlineNl: headlineNl || headline,
          description: description || null,
          descriptionNl: descriptionNl || description || null,
          imageUrl: imageUrl || null,
          destinationUrl: destinationUrl || null,
          ctaText,
          ctaTextNl: ctaTextNl || ctaText,
        }),
      });

      if (!createResponse.ok) {
        const data = await createResponse.json();
        throw new Error(data.error || "Failed to create campaign");
      }

      const { campaignId } = await createResponse.json();

      // Step 2: Create Stripe checkout session
      const baseUrl = window.location.origin;
      const checkoutResponse = await fetch("/api/stripe/ads/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessId,
          campaignId,
          packageKey,
          successUrl: `${baseUrl}/${locale}/dashboard/business/${businessId}/advertising?success=true&campaign=${campaignId}`,
          cancelUrl: `${baseUrl}/${locale}/dashboard/business/${businessId}/advertising/new?package=${packageKey}&cancelled=true`,
        }),
      });

      if (!checkoutResponse.ok) {
        const data = await checkoutResponse.json();
        throw new Error(data.error || "Failed to create checkout session");
      }

      const { url } = await checkoutResponse.json();

      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err) {
      console.error("Campaign creation error:", err);
      setError(
        err instanceof Error
          ? err.message
          : t.somethingWentWrong
      );
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Package Selection */}
      <div className="bg-white rounded-xl border p-6 space-y-4">
        <div className="flex items-center gap-2 text-cpDark font-medium">
          <Package className="w-5 h-5 text-cpCoral" />
          {t.adPackage}
        </div>

        <Select value={packageKey} onValueChange={setPackageKey}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t.selectPackage} />
          </SelectTrigger>
          <SelectContent>
            {packages.map((pkg) => (
              <SelectItem key={pkg.key} value={pkg.key}>
                <div className="flex items-center gap-2">
                  {pkg.isPopular && <Star className="w-3 h-3 text-cpCoral" />}
                  <span>{pkg.name}</span>
                  <span className="text-slate-500">
                    - {formatPrice(pkg.priceCents)} / {pkg.durationDays} {t.days}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Campaign Details */}
      <div className="bg-white rounded-xl border p-6 space-y-4">
        <div className="flex items-center gap-2 text-cpDark font-medium">
          <Type className="w-5 h-5 text-cpCoral" />
          {t.campaignDetails}
        </div>

        <div className="space-y-4">
          {/* Campaign Name (internal) */}
          <div>
            <Label htmlFor="campaignName">
              {t.campaignName}{" "}
              <span className="text-slate-400 text-xs">
                ({t.internalOnly})
              </span>
            </Label>
            <Input
              id="campaignName"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder={t.campaignNamePlaceholder}
              required
            />
          </div>

          {/* Headline (English) */}
          <div>
            <Label htmlFor="headline">
              {t.headlineEnglish} *
            </Label>
            <Input
              id="headline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder={t.headlinePlaceholder}
              maxLength={100}
              required
            />
            <p className="text-xs text-slate-500 mt-1">
              {headline.length}/100 {t.characters}
            </p>
          </div>

          {/* Headline (Dutch) */}
          <div>
            <Label htmlFor="headlineNl">
              {t.headlineDutch}
            </Label>
            <Input
              id="headlineNl"
              value={headlineNl}
              onChange={(e) => setHeadlineNl(e.target.value)}
              placeholder={t.headlineNlPlaceholder}
              maxLength={100}
            />
            <p className="text-xs text-slate-500 mt-1">
              {t.optionalFallback}
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-xl border p-6 space-y-4">
        <div className="flex items-center gap-2 text-cpDark font-medium">
          <FileText className="w-5 h-5 text-cpCoral" />
          {t.description}{" "}
          <span className="text-slate-400 text-xs">
            ({t.optional})
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="description">
              {t.descriptionEnglish}
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t.descriptionPlaceholder}
              maxLength={255}
              rows={2}
            />
            <p className="text-xs text-slate-500 mt-1">
              {description.length}/255 {t.characters}
            </p>
          </div>

          <div>
            <Label htmlFor="descriptionNl">
              {t.descriptionDutch}
            </Label>
            <Textarea
              id="descriptionNl"
              value={descriptionNl}
              onChange={(e) => setDescriptionNl(e.target.value)}
              placeholder={t.descriptionNlPlaceholder}
              maxLength={255}
              rows={2}
            />
          </div>
        </div>
      </div>

      {/* Image & Link */}
      <div className="bg-white rounded-xl border p-6 space-y-4">
        <div className="flex items-center gap-2 text-cpDark font-medium">
          <ImageIcon className="w-5 h-5 text-cpCoral" />
          {t.imageAndLink}
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="imageUrl">
              {t.imageUrl}{" "}
              <span className="text-slate-400 text-xs">
                ({t.optional})
              </span>
            </Label>
            <Input
              id="imageUrl"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-xs text-slate-500 mt-1">
              {t.imageRecommended}
            </p>
          </div>

          <div>
            <Label htmlFor="destinationUrl">
              <div className="flex items-center gap-1">
                <LinkIcon className="w-3 h-3" />
                {t.destinationUrl}{" "}
                <span className="text-slate-400 text-xs">
                  ({t.optional})
                </span>
              </div>
            </Label>
            <Input
              id="destinationUrl"
              type="url"
              value={destinationUrl}
              onChange={(e) => setDestinationUrl(e.target.value)}
              placeholder="https://yourwebsite.com"
            />
            <p className="text-xs text-slate-500 mt-1">
              {t.destinationHint}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ctaText">
                {t.ctaEnglish}
              </Label>
              <Input
                id="ctaText"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                placeholder="Learn More"
                maxLength={50}
              />
            </div>
            <div>
              <Label htmlFor="ctaTextNl">
                {t.ctaDutch}
              </Label>
              <Input
                id="ctaTextNl"
                value={ctaTextNl}
                onChange={(e) => setCtaTextNl(e.target.value)}
                placeholder="Meer informatie"
                maxLength={50}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="bg-gradient-to-r from-cpCoral/10 to-cpCoral/10 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="font-medium text-cpDark">
              {t.readyToAdvertise}
            </p>
            <p className="text-sm text-slate-600">
              {t.paymentInfo
                .replace("{price}", selectedPackage ? formatPrice(selectedPackage.priceCents) : "...")
                .replace("{days}", String(selectedPackage?.durationDays || "..."))}
            </p>
          </div>

          <Button
            type="submit"
            size="lg"
            className="bg-cpCoral hover:bg-cpCoral/90 gap-2"
            disabled={isLoading || !headline}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t.loading}
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4" />
                {t.continueToPayment}
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
