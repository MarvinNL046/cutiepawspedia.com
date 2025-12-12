"use client";

/**
 * Plan Step - Select subscription plan
 */

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, Star, Crown, Sparkles, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { getActivePlans, formatPlanPrice, type PlanDefinition } from "@/lib/plans/config";
import type { OnboardingData } from "../OnboardingWizard";

interface PlanStepProps {
  locale: string;
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
  labels: { back: string; next: string };
}

const PLAN_ICONS = {
  FREE: Heart,
  STARTER: Sparkles,
  PRO: Crown,
  ELITE: Star,
};

export function PlanStep({
  locale,
  data,
  updateData,
  onNext,
  onBack,
  labels,
}: PlanStepProps) {
  const plans = getActivePlans();
  const isNl = locale === "nl";
  const isDe = locale === "de";
  const t = useTranslations("onboarding.planStep");

  const getFeaturesList = (plan: PlanDefinition): string[] => {
    const features: string[] = [];

    // Photos
    if (plan.features.maxPhotos > 0) {
      features.push(`${plan.features.maxPhotos} ${t("features.photos")}`);
    } else {
      features.push(t("features.noPhotos"));
    }

    // Categories
    features.push(
      `${plan.features.maxCategories} ${
        plan.features.maxCategories === 1 ? t("features.category") : t("features.categories")
      }`
    );

    // Contact info
    if (plan.features.canShowPhone) {
      features.push(t("features.contact"));
    }

    // Website
    if (plan.features.canShowWebsite) {
      features.push(t("features.website"));
    }

    // Description
    if (plan.features.canShowDescription) {
      features.push(t("features.description"));
    }

    // Analytics
    if (plan.features.hasAdvancedAnalytics) {
      features.push(t("features.advancedAnalytics"));
    } else if (plan.features.hasBasicAnalytics) {
      features.push(t("features.basicAnalytics"));
    }

    // ELITE features
    if (plan.features.hasVerifiedBadge) {
      features.push(t("features.verifiedBadge"));
    }
    if (plan.features.hasHomepageSpotlight) {
      features.push(t("features.homepageSpotlight"));
    }

    return features;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-cpDark dark:text-white mb-2">
          {t("title")}
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          {t("description")}
        </p>
      </div>

      {/* Plan Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {plans.map((plan) => {
          const isSelected = data.planKey === plan.key;
          const Icon = PLAN_ICONS[plan.key as keyof typeof PLAN_ICONS] || Heart;
          const planName = isNl ? plan.nameNl : isDe ? plan.name : plan.name;
          const features = getFeaturesList(plan);

          return (
            <button
              key={plan.key}
              onClick={() => updateData({ planKey: plan.key as OnboardingData["planKey"] })}
              className={cn(
                "relative p-5 rounded-xl border-2 text-left transition-all",
                isSelected
                  ? "border-cpCoral bg-cpCoral/5"
                  : "border-slate-200 dark:border-slate-700 hover:border-cpCoral/50",
                plan.isPopular && !isSelected && "border-cpCoral/30"
              )}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <span className="absolute -top-3 left-4 px-2 py-0.5 text-xs font-medium bg-cpCoral text-white rounded-full">
                  {t("popular")}
                </span>
              )}

              {/* Selected Badge */}
              {isSelected && (
                <span className="absolute -top-3 right-4 px-2 py-0.5 text-xs font-medium bg-green-500 text-white rounded-full">
                  {t("current")}
                </span>
              )}

              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                    isSelected ? "bg-cpCoral/20" : "bg-slate-100 dark:bg-slate-700"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5",
                      isSelected ? "text-cpCoral" : "text-slate-500"
                    )}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-semibold text-cpDark dark:text-white">
                      {planName}
                    </h3>
                    <span className="text-lg font-bold text-cpDark dark:text-white">
                      {plan.monthlyPriceCents === 0
                        ? t("freeForever")
                        : `${formatPlanPrice(plan.monthlyPriceCents, locale)}${t("perMonth")}`}
                    </span>
                  </div>

                  <ul className="mt-3 space-y-1.5">
                    {features.slice(0, 4).map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
                      >
                        <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
                        {feature}
                      </li>
                    ))}
                    {features.length > 4 && (
                      <li className="text-sm text-slate-500 dark:text-slate-500">
                        +{features.length - 4} more...
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {labels.back}
        </Button>
        <Button onClick={onNext} className="bg-cpCoral hover:bg-cpCoral/90">
          {labels.next}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
