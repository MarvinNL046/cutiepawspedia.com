"use client";

/**
 * Business Step - Business details form
 */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Building2 } from "lucide-react";
import type { OnboardingData } from "../OnboardingWizard";

interface BusinessStepProps {
  locale: string;
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack?: () => void;
  labels: { back: string; next: string };
}

interface Country {
  id: number;
  name: string;
  code: string;
  slug: string;
}

export function BusinessStep({
  locale,
  data,
  updateData,
  onNext,
  onBack,
  labels,
}: BusinessStepProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch countries
  useEffect(() => {
    fetch("/api/locations/countries")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data.countries || []);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const translations = {
    en: {
      title: "Tell Us About Your Business",
      description: "This information will be shown on your business profile.",
      businessName: "Business Name",
      businessNamePlaceholder: "e.g., Happy Paws Pet Hotel",
      businessNameRequired: "Business name is required",
      businessDescription: "Description",
      businessDescriptionPlaceholder: "Tell pet owners about your services...",
      businessDescriptionRequired: "Description is required",
      businessPhone: "Phone Number",
      businessPhonePlaceholder: "+31 6 12345678",
      businessEmail: "Email Address",
      businessEmailPlaceholder: "contact@yourbusiness.com",
      businessEmailRequired: "Email is required",
      businessWebsite: "Website (optional)",
      businessWebsitePlaceholder: "https://www.yourbusiness.com",
      country: "Country",
      countryPlaceholder: "Select country",
      countryRequired: "Please select a country",
    },
    nl: {
      title: "Vertel Ons Over Je Bedrijf",
      description: "Deze informatie wordt getoond op je bedrijfsprofiel.",
      businessName: "Bedrijfsnaam",
      businessNamePlaceholder: "bijv. Happy Paws Dierenpension",
      businessNameRequired: "Bedrijfsnaam is verplicht",
      businessDescription: "Beschrijving",
      businessDescriptionPlaceholder: "Vertel huisdiereigenaren over je diensten...",
      businessDescriptionRequired: "Beschrijving is verplicht",
      businessPhone: "Telefoonnummer",
      businessPhonePlaceholder: "+31 6 12345678",
      businessEmail: "E-mailadres",
      businessEmailPlaceholder: "contact@jouwbedrijf.nl",
      businessEmailRequired: "E-mail is verplicht",
      businessWebsite: "Website (optioneel)",
      businessWebsitePlaceholder: "https://www.jouwbedrijf.nl",
      country: "Land",
      countryPlaceholder: "Selecteer land",
      countryRequired: "Selecteer een land",
    },
    de: {
      title: "Erzähle Uns Von Deinem Unternehmen",
      description: "Diese Informationen werden auf deinem Unternehmensprofil angezeigt.",
      businessName: "Unternehmensname",
      businessNamePlaceholder: "z.B. Happy Paws Tierhotel",
      businessNameRequired: "Unternehmensname ist erforderlich",
      businessDescription: "Beschreibung",
      businessDescriptionPlaceholder: "Erzähle Tierbesitzern von deinen Dienstleistungen...",
      businessDescriptionRequired: "Beschreibung ist erforderlich",
      businessPhone: "Telefonnummer",
      businessPhonePlaceholder: "+49 123 456789",
      businessEmail: "E-Mail-Adresse",
      businessEmailPlaceholder: "kontakt@deinunternehmen.de",
      businessEmailRequired: "E-Mail ist erforderlich",
      businessWebsite: "Website (optional)",
      businessWebsitePlaceholder: "https://www.deinunternehmen.de",
      country: "Land",
      countryPlaceholder: "Land auswählen",
      countryRequired: "Bitte wähle ein Land",
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!data.businessName.trim()) {
      newErrors.businessName = t.businessNameRequired;
    }
    if (!data.businessDescription.trim()) {
      newErrors.businessDescription = t.businessDescriptionRequired;
    }
    if (!data.businessEmail.trim()) {
      newErrors.businessEmail = t.businessEmailRequired;
    }
    if (!data.countryId) {
      newErrors.country = t.countryRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  const handleCountryChange = (countryId: string) => {
    const country = countries.find((c) => c.id === parseInt(countryId));
    updateData({
      countryId: parseInt(countryId),
      countryName: country?.name,
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full bg-cpPink/10 flex items-center justify-center mx-auto mb-4">
          <Building2 className="w-6 h-6 text-cpPink" />
        </div>
        <h2 className="text-xl font-semibold text-cpDark dark:text-white mb-2">
          {t.title}
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          {t.description}
        </p>
      </div>

      <div className="space-y-4">
        {/* Business Name */}
        <div>
          <Label htmlFor="businessName">{t.businessName} *</Label>
          <Input
            id="businessName"
            value={data.businessName}
            onChange={(e) => updateData({ businessName: e.target.value })}
            placeholder={t.businessNamePlaceholder}
            className={errors.businessName ? "border-red-500" : ""}
          />
          {errors.businessName && (
            <p className="text-sm text-red-500 mt-1">{errors.businessName}</p>
          )}
        </div>

        {/* Country */}
        <div>
          <Label htmlFor="country">{t.country} *</Label>
          <Select
            value={data.countryId?.toString()}
            onValueChange={handleCountryChange}
            disabled={isLoading}
          >
            <SelectTrigger className={errors.country ? "border-red-500" : ""}>
              <SelectValue placeholder={t.countryPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.id} value={country.id.toString()}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.country && (
            <p className="text-sm text-red-500 mt-1">{errors.country}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="businessDescription">{t.businessDescription} *</Label>
          <Textarea
            id="businessDescription"
            value={data.businessDescription}
            onChange={(e) => updateData({ businessDescription: e.target.value })}
            placeholder={t.businessDescriptionPlaceholder}
            rows={4}
            className={errors.businessDescription ? "border-red-500" : ""}
          />
          {errors.businessDescription && (
            <p className="text-sm text-red-500 mt-1">{errors.businessDescription}</p>
          )}
        </div>

        {/* Phone & Email */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="businessPhone">{t.businessPhone}</Label>
            <Input
              id="businessPhone"
              type="tel"
              value={data.businessPhone}
              onChange={(e) => updateData({ businessPhone: e.target.value })}
              placeholder={t.businessPhonePlaceholder}
            />
          </div>
          <div>
            <Label htmlFor="businessEmail">{t.businessEmail} *</Label>
            <Input
              id="businessEmail"
              type="email"
              value={data.businessEmail}
              onChange={(e) => updateData({ businessEmail: e.target.value })}
              placeholder={t.businessEmailPlaceholder}
              className={errors.businessEmail ? "border-red-500" : ""}
            />
            {errors.businessEmail && (
              <p className="text-sm text-red-500 mt-1">{errors.businessEmail}</p>
            )}
          </div>
        </div>

        {/* Website */}
        <div>
          <Label htmlFor="businessWebsite">{t.businessWebsite}</Label>
          <Input
            id="businessWebsite"
            type="url"
            value={data.businessWebsite}
            onChange={(e) => updateData({ businessWebsite: e.target.value })}
            placeholder={t.businessWebsitePlaceholder}
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        {onBack ? (
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {labels.back}
          </Button>
        ) : (
          <div />
        )}
        <Button onClick={handleNext} className="bg-cpPink hover:bg-cpPink/90">
          {labels.next}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
