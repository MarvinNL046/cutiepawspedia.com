"use client";

/**
 * Category Selector Component
 *
 * Allows businesses to select categories for their places with plan-based limits.
 * Uses checkboxes for selection and enforces maxCategories based on subscription plan.
 */

import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tag, Loader2, Check, AlertCircle, Crown, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PlanKey } from "@/lib/plans/config";

interface Category {
  id: number;
  slug: string;
  icon: string | null;
  labelKey: string;
}

interface CategorySelectorProps {
  businessId: number;
  placeId: number;
  maxCategories: number;
  planKey: PlanKey;
  locale: string;
}

const labels = {
  en: {
    title: "Categories",
    description: "Select categories that best describe your business",
    usage: "categories selected",
    of: "of",
    save: "Save Categories",
    saving: "Saving...",
    saved: "Saved!",
    upgrade: "Upgrade for more",
    error: "Failed to save categories",
    loading: "Loading categories...",
    noCategoriesAvailable: "No categories available",
    planLimit: "Your plan allows",
    category: "category",
    categories: "categories",
  },
  nl: {
    title: "Categorieën",
    description: "Selecteer categorieën die je bedrijf het beste beschrijven",
    usage: "categorieën geselecteerd",
    of: "van",
    save: "Categorieën Opslaan",
    saving: "Opslaan...",
    saved: "Opgeslagen!",
    upgrade: "Upgrade voor meer",
    error: "Opslaan mislukt",
    loading: "Categorieën laden...",
    noCategoriesAvailable: "Geen categorieën beschikbaar",
    planLimit: "Je abonnement staat toe",
    category: "categorie",
    categories: "categorieën",
  },
  de: {
    title: "Kategorien",
    description: "Wählen Sie Kategorien, die Ihr Unternehmen am besten beschreiben",
    usage: "Kategorien ausgewählt",
    of: "von",
    save: "Kategorien Speichern",
    saving: "Speichern...",
    saved: "Gespeichert!",
    upgrade: "Upgrade für mehr",
    error: "Speichern fehlgeschlagen",
    loading: "Kategorien werden geladen...",
    noCategoriesAvailable: "Keine Kategorien verfügbar",
    planLimit: "Ihr Plan erlaubt",
    category: "Kategorie",
    categories: "Kategorien",
  },
};

export function CategorySelector({
  businessId,
  placeId,
  maxCategories,
  planKey,
  locale,
}: CategorySelectorProps) {
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [initialIds, setInitialIds] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const t = labels[locale as keyof typeof labels] || labels.en;

  // Check if there are unsaved changes
  const hasChanges =
    selectedIds.size !== initialIds.size ||
    [...selectedIds].some((id) => !initialIds.has(id));

  // Load categories
  const loadCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `/api/dashboard/business/${businessId}/places/${placeId}/categories`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to load categories");
      }
      setAllCategories(data.allCategories || []);

      const selectedSet = new Set<number>(
        (data.selectedCategories || []).map((c: Category) => c.id)
      );
      setSelectedIds(selectedSet);
      setInitialIds(new Set(selectedSet));
    } catch (err) {
      console.error("Error loading categories:", err);
      setError("Failed to load categories");
    } finally {
      setIsLoading(false);
    }
  }, [businessId, placeId]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  // Toggle category selection
  const toggleCategory = (categoryId: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        // Check if at limit
        if (next.size >= maxCategories) {
          return prev;
        }
        next.add(categoryId);
      }
      return next;
    });
    setSaveStatus("idle");
  };

  // Save categories
  const saveCategories = async () => {
    try {
      setIsSaving(true);
      setSaveStatus("saving");
      setError(null);

      const response = await fetch(
        `/api/dashboard/business/${businessId}/places/${placeId}/categories`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ categoryIds: [...selectedIds] }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save categories");
      }

      const data = await response.json();
      const newSelectedSet = new Set<number>(
        (data.selectedCategories || []).map((c: Category) => c.id)
      );
      setSelectedIds(newSelectedSet);
      setInitialIds(new Set(newSelectedSet));
      setSaveStatus("saved");

      // Reset status after 2 seconds
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (err) {
      console.error("Error saving categories:", err);
      setError(err instanceof Error ? err.message : "Failed to save");
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
    }
  };

  const usagePercentage = (selectedIds.size / maxCategories) * 100;
  const atLimit = selectedIds.size >= maxCategories;

  if (isLoading) {
    return (
      <Card className="bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20">
        <CardContent className="py-12">
          <div className="flex flex-col items-center justify-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-cpCoral" />
            <p className="text-sm text-muted-foreground dark:text-cpCream/60">{t.loading}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-foreground dark:text-cpCream">
              <Tag className="h-5 w-5 text-cpCoral" />
              {t.title}
            </CardTitle>
            <CardDescription className="mt-1 dark:text-cpCream/70">{t.description}</CardDescription>
          </div>
          <Badge
            variant="outline"
            className={cn(
              planKey === "ELITE"
                ? "bg-purple-100 text-purple-700 border-purple-300"
                : planKey === "PRO"
                  ? "bg-amber-100 text-amber-700 border-amber-300"
                  : planKey === "STARTER"
                    ? "bg-blue-100 text-blue-700 border-blue-300"
                    : "bg-slate-100 text-slate-700 border-slate-300"
            )}
          >
            {planKey}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Usage indicator */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground dark:text-cpCream/70">
              {selectedIds.size} {t.of} {maxCategories} {t.usage}
            </span>
            {atLimit && planKey !== "ELITE" && (
              <Button
                variant="ghost"
                size="sm"
                className="text-cpCoral hover:text-cpCoral/80 gap-1"
              >
                <Crown className="h-3 w-3" />
                {t.upgrade}
              </Button>
            )}
          </div>
          <Progress value={usagePercentage} className="h-2" />
        </div>

        {/* Category list */}
        {allCategories.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground dark:text-cpCream/60">
            {t.noCategoriesAvailable}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {allCategories.map((category) => {
              const isSelected = selectedIds.has(category.id);
              const isDisabled = !isSelected && atLimit;

              return (
                <div
                  key={category.id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                    isSelected
                      ? "bg-cpCoral/10 dark:bg-cpCoral/20 border-cpCoral"
                      : isDisabled
                        ? "bg-muted dark:bg-cpSurface border-border dark:border-cpAmber/20 opacity-50 cursor-not-allowed"
                        : "hover:bg-muted dark:hover:bg-cpSurface/50 border-border dark:border-cpAmber/30"
                  )}
                  onClick={() => !isDisabled && toggleCategory(category.id)}
                >
                  <div
                    className={cn(
                      "flex items-center justify-center w-5 h-5 rounded border transition-colors",
                      isSelected
                        ? "bg-cpCoral border-cpCoral text-white"
                        : "border-muted-foreground/40 dark:border-cpCream/40"
                    )}
                  >
                    {isSelected && <Check className="h-3 w-3" />}
                  </div>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isSelected ? "text-foreground dark:text-cpCream" : "text-foreground/80 dark:text-cpCream/80"
                    )}
                  >
                    {category.labelKey}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        {/* Save button */}
        <div className="flex items-center justify-between pt-4 border-t border-border dark:border-cpAmber/20">
          <p className="text-sm text-muted-foreground dark:text-cpCream/60">
            {t.planLimit} {maxCategories}{" "}
            {maxCategories === 1 ? t.category : t.categories}
          </p>
          <Button
            onClick={saveCategories}
            disabled={!hasChanges || isSaving}
            className={cn(
              "min-w-[140px]",
              saveStatus === "saved"
                ? "bg-green-600 hover:bg-green-600"
                : "bg-cpCoral hover:bg-cpCoral/90"
            )}
          >
            {saveStatus === "saving" ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {t.saving}
              </>
            ) : saveStatus === "saved" ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                {t.saved}
              </>
            ) : (
              t.save
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
