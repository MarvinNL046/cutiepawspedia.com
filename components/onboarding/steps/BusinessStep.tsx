"use client";

/**
 * Business Step - Business details form with search/claim functionality
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
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
import { ArrowLeft, ArrowRight, Building2, Search, Loader2, Check, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OnboardingData } from "../OnboardingWizard";

interface PlaceSuggestion {
  id: number;
  name: string;
  cityName: string;
  hasOwner: boolean;
}

interface BusinessStepProps {
  locale: string;
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack?: () => void;
  onClaimPlace?: (placeId: number, placeName: string, cityName: string) => void;
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
  onClaimPlace,
  labels,
}: BusinessStepProps) {
  const t = useTranslations("onboarding.businessStep");
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Search state
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  // Debounced search for existing places
  const searchPlaces = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsSearching(true);
    try {
      const countryParam = data.countryId ? `&countryId=${data.countryId}` : "";
      const res = await fetch(`/api/onboarding/search-places?q=${encodeURIComponent(query)}${countryParam}`);
      const result = await res.json();
      setSuggestions(result.places || []);
      setShowSuggestions(true);
    } catch {
      setSuggestions([]);
    }
    setIsSearching(false);
  }, [data.countryId]);

  // Handle business name change with debounced search
  const handleBusinessNameChange = (value: string) => {
    updateData({ businessName: value });

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Debounce search
    searchTimeoutRef.current = setTimeout(() => {
      searchPlaces(value);
    }, 300);
  };

  // Handle selecting a place to claim
  const handleSelectPlace = (place: PlaceSuggestion) => {
    if (place.hasOwner) return;
    setShowSuggestions(false);
    if (onClaimPlace) {
      onClaimPlace(place.id, place.name, place.cityName);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!data.businessName.trim()) {
      newErrors.businessName = t("businessNameRequired");
    }
    if (!data.businessDescription.trim()) {
      newErrors.businessDescription = t("businessDescriptionRequired");
    }
    if (!data.businessEmail.trim()) {
      newErrors.businessEmail = t("businessEmailRequired");
    }
    if (!data.countryId) {
      newErrors.country = t("countryRequired");
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
        <div className="w-12 h-12 rounded-full bg-cpCoral/10 flex items-center justify-center mx-auto mb-4">
          <Building2 className="w-6 h-6 text-cpCoral" />
        </div>
        <h2 className="text-xl font-semibold text-cpDark dark:text-white mb-2">
          {t("title")}
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          {t("description")}
        </p>
      </div>

      <div className="space-y-4">
        {/* Business Name with Search */}
        <div className="relative" ref={inputRef}>
          <Label htmlFor="businessName">{t("businessName")} *</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              id="businessName"
              value={data.businessName}
              onChange={(e) => handleBusinessNameChange(e.target.value)}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              placeholder={t("businessNamePlaceholder")}
              className={cn("pl-10", errors.businessName ? "border-red-500" : "")}
            />
            {isSearching && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-slate-400" />
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">{t("searchHint")}</p>
          {errors.businessName && (
            <p className="text-sm text-red-500 mt-1">{errors.businessName}</p>
          )}

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg max-h-64 overflow-y-auto">
              <div className="p-2 text-xs text-slate-500 border-b border-slate-100 dark:border-slate-700">
                {t("existingListingsFound")}
              </div>
              {suggestions.map((place) => (
                <button
                  key={place.id}
                  type="button"
                  onClick={() => handleSelectPlace(place)}
                  disabled={place.hasOwner}
                  className={cn(
                    "w-full p-3 text-left flex items-center justify-between gap-2 transition-colors",
                    place.hasOwner
                      ? "opacity-50 cursor-not-allowed bg-slate-50 dark:bg-slate-900"
                      : "hover:bg-cpCoral/5 cursor-pointer"
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-cpDark dark:text-white truncate">
                      {place.name}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <MapPin className="h-3 w-3" />
                      {place.cityName}
                    </div>
                  </div>
                  {place.hasOwner ? (
                    <span className="text-xs text-slate-500 px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded shrink-0">
                      {t("alreadyClaimed")}
                    </span>
                  ) : (
                    <span className="text-xs text-cpCoral font-medium px-2 py-1 bg-cpCoral/10 rounded shrink-0">
                      {t("claimThis")}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Country */}
        <div>
          <Label htmlFor="country">{t("country")} *</Label>
          <Select
            value={data.countryId?.toString()}
            onValueChange={handleCountryChange}
            disabled={isLoading}
          >
            <SelectTrigger className={errors.country ? "border-red-500" : ""}>
              <SelectValue placeholder={t("countryPlaceholder")} />
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
          <Label htmlFor="businessDescription">{t("businessDescription")} *</Label>
          <Textarea
            id="businessDescription"
            value={data.businessDescription}
            onChange={(e) => updateData({ businessDescription: e.target.value })}
            placeholder={t("businessDescriptionPlaceholder")}
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
            <Label htmlFor="businessPhone">{t("businessPhone")}</Label>
            <Input
              id="businessPhone"
              type="tel"
              value={data.businessPhone}
              onChange={(e) => updateData({ businessPhone: e.target.value })}
              placeholder={t("businessPhonePlaceholder")}
            />
          </div>
          <div>
            <Label htmlFor="businessEmail">{t("businessEmail")} *</Label>
            <Input
              id="businessEmail"
              type="email"
              value={data.businessEmail}
              onChange={(e) => updateData({ businessEmail: e.target.value })}
              placeholder={t("businessEmailPlaceholder")}
              className={errors.businessEmail ? "border-red-500" : ""}
            />
            {errors.businessEmail && (
              <p className="text-sm text-red-500 mt-1">{errors.businessEmail}</p>
            )}
          </div>
        </div>

        {/* Website */}
        <div>
          <Label htmlFor="businessWebsite">{t("businessWebsite")}</Label>
          <Input
            id="businessWebsite"
            type="url"
            value={data.businessWebsite}
            onChange={(e) => updateData({ businessWebsite: e.target.value })}
            placeholder={t("businessWebsitePlaceholder")}
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
        <Button onClick={handleNext} className="bg-cpCoral hover:bg-cpCoral/90">
          {labels.next}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
