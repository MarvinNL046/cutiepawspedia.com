"use client";

/**
 * Place Step - Add first location (claim existing or create new)
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
import {
  ArrowLeft,
  MapPin,
  Search,
  Plus,
  Check,
  Building2,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { OnboardingData } from "../OnboardingWizard";

interface PlaceStepProps {
  locale: string;
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
  labels: { back: string; submit: string; submitting: string };
}

interface City {
  id: number;
  name: string;
  slug: string;
}

interface Category {
  id: number;
  labelKey: string;
  slug: string;
}

interface SearchResult {
  id: number;
  name: string;
  cityName: string;
  hasOwner: boolean;
}

type Mode = "choose" | "claim" | "create" | "confirm-claim";

export function PlaceStep({
  locale,
  data,
  updateData,
  onSubmit,
  onBack,
  isSubmitting,
  labels,
}: PlaceStepProps) {
  // If claimPlaceId is already set (from BusinessStep), start in confirm mode
  const [mode, setMode] = useState<Mode>(data.claimPlaceId ? "confirm-claim" : "choose");
  const [cities, setCities] = useState<City[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  // Claim mode state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedClaimPlace, setSelectedClaimPlace] = useState<SearchResult | null>(null);

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch categories on mount
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((result) => {
        setCategories(result.categories || []);
        setIsLoadingCategories(false);
      })
      .catch(() => setIsLoadingCategories(false));
  }, []);

  // Fetch cities when country changes
  useEffect(() => {
    if (data.countryId) {
      setIsLoadingCities(true);
      fetch(`/api/locations/cities?countryId=${data.countryId}`)
        .then((res) => res.json())
        .then((result) => {
          setCities(result.cities || []);
          setIsLoadingCities(false);
        })
        .catch(() => setIsLoadingCities(false));
    }
  }, [data.countryId]);

  // Search for existing places
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const res = await fetch(
        `/api/onboarding/search-places?q=${encodeURIComponent(searchQuery)}&countryId=${data.countryId}`
      );
      const result = await res.json();
      setSearchResults(result.places || []);
    } catch {
      setSearchResults([]);
    }
    setIsSearching(false);
  };

  const translations = {
    en: {
      title: "Add Your First Location",
      description: "You can claim an existing listing or create a new one.",
      chooseMode: {
        title: "How would you like to add your location?",
        claim: "Claim Existing Listing",
        claimDesc: "Your business is already on CutiePawsPedia? Claim it!",
        create: "Create New Listing",
        createDesc: "Your business is not listed yet? Add it now!",
      },
      claim: {
        title: "Find Your Business",
        searchPlaceholder: "Search by business name...",
        search: "Search",
        noResults: "No businesses found. Try a different search or create a new listing.",
        alreadyClaimed: "Already claimed",
        select: "Select",
        selected: "Selected",
        back: "Back to options",
      },
      confirmClaim: {
        title: "Claim Your Listing",
        description: "You're about to claim this existing listing:",
        confirmButton: "Claim & Complete",
        changeChoice: "Choose a different listing",
      },
      create: {
        title: "Create New Listing",
        placeName: "Location Name",
        placeNamePlaceholder: "e.g., Happy Paws Amsterdam",
        placeNameRequired: "Location name is required",
        city: "City",
        cityPlaceholder: "Select city",
        cityRequired: "Please select a city",
        address: "Address",
        addressPlaceholder: "Street address",
        categories: "Categories",
        categoriesPlaceholder: "Select categories",
        categoriesRequired: "Select at least one category",
        description: "Description",
        descriptionPlaceholder: "Describe this location...",
        back: "Back to options",
      },
    },
    nl: {
      title: "Voeg Je Eerste Locatie Toe",
      description: "Je kunt een bestaande vermelding claimen of een nieuwe aanmaken.",
      chooseMode: {
        title: "Hoe wil je je locatie toevoegen?",
        claim: "Claim Bestaande Vermelding",
        claimDesc: "Je bedrijf staat al op CutiePawsPedia? Claim het!",
        create: "Nieuwe Vermelding Aanmaken",
        createDesc: "Je bedrijf staat er nog niet bij? Voeg het nu toe!",
      },
      claim: {
        title: "Zoek Je Bedrijf",
        searchPlaceholder: "Zoek op bedrijfsnaam...",
        search: "Zoeken",
        noResults: "Geen bedrijven gevonden. Probeer een andere zoekterm of maak een nieuwe vermelding.",
        alreadyClaimed: "Al geclaimd",
        select: "Selecteer",
        selected: "Geselecteerd",
        back: "Terug naar opties",
      },
      confirmClaim: {
        title: "Claim Je Vermelding",
        description: "Je staat op het punt deze bestaande vermelding te claimen:",
        confirmButton: "Claim & Voltooien",
        changeChoice: "Kies een andere vermelding",
      },
      create: {
        title: "Nieuwe Vermelding Aanmaken",
        placeName: "Locatienaam",
        placeNamePlaceholder: "bijv. Happy Paws Amsterdam",
        placeNameRequired: "Locatienaam is verplicht",
        city: "Stad",
        cityPlaceholder: "Selecteer stad",
        cityRequired: "Selecteer een stad",
        address: "Adres",
        addressPlaceholder: "Straatnaam en huisnummer",
        categories: "Categorieën",
        categoriesPlaceholder: "Selecteer categorieën",
        categoriesRequired: "Selecteer minimaal één categorie",
        description: "Beschrijving",
        descriptionPlaceholder: "Beschrijf deze locatie...",
        back: "Terug naar opties",
      },
    },
    de: {
      title: "Füge Deinen Ersten Standort Hinzu",
      description: "Du kannst einen bestehenden Eintrag beanspruchen oder einen neuen erstellen.",
      chooseMode: {
        title: "Wie möchtest du deinen Standort hinzufügen?",
        claim: "Bestehenden Eintrag Beanspruchen",
        claimDesc: "Dein Unternehmen ist bereits auf CutiePawsPedia? Beanspruche es!",
        create: "Neuen Eintrag Erstellen",
        createDesc: "Dein Unternehmen ist noch nicht gelistet? Füge es jetzt hinzu!",
      },
      claim: {
        title: "Finde Dein Unternehmen",
        searchPlaceholder: "Nach Unternehmensnamen suchen...",
        search: "Suchen",
        noResults: "Keine Unternehmen gefunden. Versuche eine andere Suche oder erstelle einen neuen Eintrag.",
        alreadyClaimed: "Bereits beansprucht",
        select: "Auswählen",
        selected: "Ausgewählt",
        back: "Zurück zu den Optionen",
      },
      confirmClaim: {
        title: "Beanspruche Deinen Eintrag",
        description: "Du bist dabei, diesen bestehenden Eintrag zu beanspruchen:",
        confirmButton: "Beanspruchen & Abschließen",
        changeChoice: "Anderen Eintrag wählen",
      },
      create: {
        title: "Neuen Eintrag Erstellen",
        placeName: "Standortname",
        placeNamePlaceholder: "z.B. Happy Paws Berlin",
        placeNameRequired: "Standortname ist erforderlich",
        city: "Stadt",
        cityPlaceholder: "Stadt auswählen",
        cityRequired: "Bitte wähle eine Stadt",
        address: "Adresse",
        addressPlaceholder: "Straße und Hausnummer",
        categories: "Kategorien",
        categoriesPlaceholder: "Kategorien auswählen",
        categoriesRequired: "Wähle mindestens eine Kategorie",
        description: "Beschreibung",
        descriptionPlaceholder: "Beschreibe diesen Standort...",
        back: "Zurück zu den Optionen",
      },
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (mode === "claim" && !selectedClaimPlace) {
      newErrors.claim = "Please select a business to claim";
      setErrors(newErrors);
      return false;
    }

    if (mode === "create") {
      if (!data.placeName.trim()) {
        newErrors.placeName = t.create.placeNameRequired;
      }
      if (!data.cityId) {
        newErrors.city = t.create.cityRequired;
      }
      if (data.categoryIds.length === 0) {
        newErrors.categories = t.create.categoriesRequired;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      // If claiming, add the claim place ID to the data
      if (mode === "claim" && selectedClaimPlace) {
        updateData({ claimPlaceId: selectedClaimPlace.id } as any);
      }
      onSubmit();
    }
  };

  const handleCityChange = (cityId: string) => {
    const city = cities.find((c) => c.id === parseInt(cityId));
    updateData({
      cityId: parseInt(cityId),
      cityName: city?.name,
    });
  };

  const handleCategoryToggle = (categoryId: number) => {
    const currentIds = data.categoryIds;
    const maxCategories = 1; // FREE plan default, will be validated server-side

    if (currentIds.includes(categoryId)) {
      updateData({ categoryIds: currentIds.filter((id) => id !== categoryId) });
    } else if (currentIds.length < maxCategories) {
      updateData({ categoryIds: [...currentIds, categoryId] });
    }
  };

  // Confirm claim mode UI (when place was selected from BusinessStep)
  if (mode === "confirm-claim" && data.claimPlaceId) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
            <Check className="w-6 h-6 text-green-500" />
          </div>
          <h2 className="text-xl font-semibold text-cpDark dark:text-white mb-2">
            {t.confirmClaim.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            {t.confirmClaim.description}
          </p>
        </div>

        {/* Selected place card */}
        <div className="p-6 rounded-xl border-2 border-green-500/50 bg-green-50 dark:bg-green-900/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-cpCoral" />
            </div>
            <div>
              <h3 className="font-semibold text-cpDark dark:text-white text-lg">
                {data.claimPlaceName || data.placeName}
              </h3>
              <div className="flex items-center gap-1 text-slate-500">
                <MapPin className="h-4 w-4" />
                {data.claimCityName}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={() => {
              // Clear claim data and go back to choose
              updateData({ claimPlaceId: undefined, claimPlaceName: undefined, claimCityName: undefined });
              setMode("choose");
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.confirmClaim.changeChoice}
          </Button>
          <Button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="bg-cpCoral hover:bg-cpCoral/90"
          >
            {isSubmitting ? labels.submitting : t.confirmClaim.confirmButton}
          </Button>
        </div>
      </div>
    );
  }

  // Choose mode UI
  if (mode === "choose") {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-cpCoral/10 flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-6 h-6 text-cpCoral" />
          </div>
          <h2 className="text-xl font-semibold text-cpDark dark:text-white mb-2">
            {t.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            {t.description}
          </p>
        </div>

        <div className="text-center mb-4">
          <h3 className="font-medium text-cpDark dark:text-white">
            {t.chooseMode.title}
          </h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Claim existing */}
          <button
            onClick={() => setMode("claim")}
            className="p-6 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-cpCoral/50 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-cpAqua/10 flex items-center justify-center mb-3">
              <Search className="w-5 h-5 text-cpAqua" />
            </div>
            <h3 className="font-semibold text-cpDark dark:text-white mb-1">
              {t.chooseMode.claim}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {t.chooseMode.claimDesc}
            </p>
          </button>

          {/* Create new */}
          <button
            onClick={() => setMode("create")}
            className="p-6 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-cpCoral/50 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-cpCoral/10 flex items-center justify-center mb-3">
              <Plus className="w-5 h-5 text-cpCoral" />
            </div>
            <h3 className="font-semibold text-cpDark dark:text-white mb-1">
              {t.chooseMode.create}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {t.chooseMode.createDesc}
            </p>
          </button>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {labels.back}
          </Button>
          <div />
        </div>
      </div>
    );
  }

  // Claim mode UI
  if (mode === "claim") {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-cpDark dark:text-white mb-2">
            {t.claim.title}
          </h2>
        </div>

        {/* Search */}
        <div className="flex gap-2">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.claim.searchPlaceholder}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button onClick={handleSearch} disabled={isSearching}>
            {isSearching ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Results */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {searchResults.length === 0 && searchQuery && !isSearching && (
            <p className="text-sm text-slate-500 text-center py-4">
              {t.claim.noResults}
            </p>
          )}
          {searchResults.map((place) => (
            <button
              key={place.id}
              onClick={() => !place.hasOwner && setSelectedClaimPlace(place)}
              disabled={place.hasOwner}
              className={cn(
                "w-full p-4 rounded-lg border-2 text-left transition-all",
                place.hasOwner
                  ? "border-slate-200 bg-slate-50 opacity-60 cursor-not-allowed"
                  : selectedClaimPlace?.id === place.id
                    ? "border-cpCoral bg-cpCoral/5"
                    : "border-slate-200 hover:border-cpCoral/50"
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-cpDark dark:text-white">
                    {place.name}
                  </div>
                  <div className="text-sm text-slate-500">{place.cityName}</div>
                </div>
                {place.hasOwner ? (
                  <span className="text-xs text-slate-500 px-2 py-1 bg-slate-200 rounded">
                    {t.claim.alreadyClaimed}
                  </span>
                ) : selectedClaimPlace?.id === place.id ? (
                  <Check className="w-5 h-5 text-cpCoral" />
                ) : (
                  <span className="text-sm text-cpCoral">{t.claim.select}</span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={() => setMode("choose")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.claim.back}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedClaimPlace || isSubmitting}
            className="bg-cpCoral hover:bg-cpCoral/90"
          >
            {isSubmitting ? labels.submitting : labels.submit}
          </Button>
        </div>
      </div>
    );
  }

  // Create mode UI
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-cpDark dark:text-white mb-2">
          {t.create.title}
        </h2>
      </div>

      <div className="space-y-4">
        {/* Place Name */}
        <div>
          <Label htmlFor="placeName">{t.create.placeName} *</Label>
          <Input
            id="placeName"
            value={data.placeName}
            onChange={(e) => updateData({ placeName: e.target.value })}
            placeholder={t.create.placeNamePlaceholder}
            className={errors.placeName ? "border-red-500" : ""}
          />
          {errors.placeName && (
            <p className="text-sm text-red-500 mt-1">{errors.placeName}</p>
          )}
        </div>

        {/* City */}
        <div>
          <Label htmlFor="city">{t.create.city} *</Label>
          <Select
            value={data.cityId?.toString()}
            onValueChange={handleCityChange}
            disabled={isLoadingCities || cities.length === 0}
          >
            <SelectTrigger className={errors.city ? "border-red-500" : ""}>
              <SelectValue placeholder={t.create.cityPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city.id} value={city.id.toString()}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.city && (
            <p className="text-sm text-red-500 mt-1">{errors.city}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <Label htmlFor="address">{t.create.address}</Label>
          <Input
            id="address"
            value={data.placeAddress}
            onChange={(e) => updateData({ placeAddress: e.target.value })}
            placeholder={t.create.addressPlaceholder}
          />
        </div>

        {/* Categories */}
        <div>
          <Label>{t.create.categories} *</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryToggle(category.id)}
                className={cn(
                  "p-2 text-sm rounded-lg border transition-all",
                  data.categoryIds.includes(category.id)
                    ? "border-cpCoral bg-cpCoral/10 text-cpCoral"
                    : "border-slate-200 hover:border-cpCoral/50"
                )}
              >
                {category.labelKey}
              </button>
            ))}
          </div>
          {errors.categories && (
            <p className="text-sm text-red-500 mt-1">{errors.categories}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="placeDescription">{t.create.description}</Label>
          <Textarea
            id="placeDescription"
            value={data.placeDescription}
            onChange={(e) => updateData({ placeDescription: e.target.value })}
            placeholder={t.create.descriptionPlaceholder}
            rows={3}
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={() => setMode("choose")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t.create.back}
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-cpCoral hover:bg-cpCoral/90"
        >
          {isSubmitting ? labels.submitting : labels.submit}
        </Button>
      </div>
    </div>
  );
}
