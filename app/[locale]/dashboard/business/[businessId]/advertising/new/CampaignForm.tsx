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
  const isNl = locale === "nl";

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [packageKey, setPackageKey] = useState(selectedPackageKey);
  const [campaignName, setCampaignName] = useState(
    `${businessName} ${isNl ? "Campagne" : "Campaign"}`
  );
  const [headline, setHeadline] = useState("");
  const [headlineNl, setHeadlineNl] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionNl, setDescriptionNl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [destinationUrl, setDestinationUrl] = useState("");
  const [ctaText, setCtaText] = useState(isNl ? "Meer informatie" : "Learn More");
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
          : isNl
          ? "Er is iets misgegaan"
          : "Something went wrong"
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
          <Package className="w-5 h-5 text-cpPink" />
          {isNl ? "Advertentiepakket" : "Ad Package"}
        </div>

        <Select value={packageKey} onValueChange={setPackageKey}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={isNl ? "Selecteer pakket" : "Select package"} />
          </SelectTrigger>
          <SelectContent>
            {packages.map((pkg) => (
              <SelectItem key={pkg.key} value={pkg.key}>
                <div className="flex items-center gap-2">
                  {pkg.isPopular && <Star className="w-3 h-3 text-cpPink" />}
                  <span>{pkg.name}</span>
                  <span className="text-slate-500">
                    - {formatPrice(pkg.priceCents)} / {pkg.durationDays}{" "}
                    {isNl ? "dagen" : "days"}
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
          <Type className="w-5 h-5 text-cpPink" />
          {isNl ? "Campagne Details" : "Campaign Details"}
        </div>

        <div className="space-y-4">
          {/* Campaign Name (internal) */}
          <div>
            <Label htmlFor="campaignName">
              {isNl ? "Campagne Naam" : "Campaign Name"}{" "}
              <span className="text-slate-400 text-xs">
                ({isNl ? "alleen voor jou zichtbaar" : "internal only"})
              </span>
            </Label>
            <Input
              id="campaignName"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder={isNl ? "Bijv. Zomer Campagne 2025" : "e.g. Summer Campaign 2025"}
              required
            />
          </div>

          {/* Headline (English) */}
          <div>
            <Label htmlFor="headline">
              {isNl ? "Kop (Engels)" : "Headline (English)"} *
            </Label>
            <Input
              id="headline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder={isNl ? "Bijv. De beste hondentrimmer!" : "e.g. The best dog groomer!"}
              maxLength={100}
              required
            />
            <p className="text-xs text-slate-500 mt-1">
              {headline.length}/100 {isNl ? "tekens" : "characters"}
            </p>
          </div>

          {/* Headline (Dutch) */}
          <div>
            <Label htmlFor="headlineNl">
              {isNl ? "Kop (Nederlands)" : "Headline (Dutch)"}
            </Label>
            <Input
              id="headlineNl"
              value={headlineNl}
              onChange={(e) => setHeadlineNl(e.target.value)}
              placeholder={isNl ? "Bijv. De beste hondentrimmer!" : "e.g. De beste hondentrimmer!"}
              maxLength={100}
            />
            <p className="text-xs text-slate-500 mt-1">
              {isNl
                ? "Optioneel - valt terug op Engelse tekst"
                : "Optional - falls back to English"}
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-xl border p-6 space-y-4">
        <div className="flex items-center gap-2 text-cpDark font-medium">
          <FileText className="w-5 h-5 text-cpPink" />
          {isNl ? "Beschrijving" : "Description"}{" "}
          <span className="text-slate-400 text-xs">
            ({isNl ? "optioneel" : "optional"})
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="description">
              {isNl ? "Beschrijving (Engels)" : "Description (English)"}
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                isNl
                  ? "Korte beschrijving van je dienst..."
                  : "Short description of your service..."
              }
              maxLength={255}
              rows={2}
            />
            <p className="text-xs text-slate-500 mt-1">
              {description.length}/255 {isNl ? "tekens" : "characters"}
            </p>
          </div>

          <div>
            <Label htmlFor="descriptionNl">
              {isNl ? "Beschrijving (Nederlands)" : "Description (Dutch)"}
            </Label>
            <Textarea
              id="descriptionNl"
              value={descriptionNl}
              onChange={(e) => setDescriptionNl(e.target.value)}
              placeholder={
                isNl
                  ? "Korte beschrijving van je dienst..."
                  : "Korte beschrijving..."
              }
              maxLength={255}
              rows={2}
            />
          </div>
        </div>
      </div>

      {/* Image & Link */}
      <div className="bg-white rounded-xl border p-6 space-y-4">
        <div className="flex items-center gap-2 text-cpDark font-medium">
          <ImageIcon className="w-5 h-5 text-cpPink" />
          {isNl ? "Afbeelding & Link" : "Image & Link"}
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="imageUrl">
              {isNl ? "Afbeelding URL" : "Image URL"}{" "}
              <span className="text-slate-400 text-xs">
                ({isNl ? "optioneel" : "optional"})
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
              {isNl
                ? "Aanbevolen: 300x250px of 728x90px"
                : "Recommended: 300x250px or 728x90px"}
            </p>
          </div>

          <div>
            <Label htmlFor="destinationUrl">
              <div className="flex items-center gap-1">
                <LinkIcon className="w-3 h-3" />
                {isNl ? "Bestemmings URL" : "Destination URL"}{" "}
                <span className="text-slate-400 text-xs">
                  ({isNl ? "optioneel" : "optional"})
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
              {isNl
                ? "Waar bezoekers naartoe gaan als ze klikken"
                : "Where visitors go when they click"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ctaText">
                CTA {isNl ? "(Engels)" : "(English)"}
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
                CTA {isNl ? "(Nederlands)" : "(Dutch)"}
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
      <div className="bg-gradient-to-r from-cpPink/10 to-cpCoral/10 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="font-medium text-cpDark">
              {isNl ? "Klaar om te adverteren?" : "Ready to advertise?"}
            </p>
            <p className="text-sm text-slate-600">
              {isNl
                ? `Je betaalt ${selectedPackage ? formatPrice(selectedPackage.priceCents) : "..."} voor ${selectedPackage?.durationDays || "..."} dagen adverteren`
                : `You'll pay ${selectedPackage ? formatPrice(selectedPackage.priceCents) : "..."} for ${selectedPackage?.durationDays || "..."} days of advertising`}
            </p>
          </div>

          <Button
            type="submit"
            size="lg"
            className="bg-cpPink hover:bg-cpPink/90 gap-2"
            disabled={isLoading || !headline}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {isNl ? "Laden..." : "Loading..."}
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4" />
                {isNl ? "Doorgaan naar Betaling" : "Continue to Payment"}
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
