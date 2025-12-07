"use client";

/**
 * Business Onboarding Wizard
 *
 * Multi-step wizard with state management and progress tracking.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, User, Building2, CreditCard, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

import { AccountStep } from "./steps/AccountStep";
import { BusinessStep } from "./steps/BusinessStep";
import { PlanStep } from "./steps/PlanStep";
import { PlaceStep } from "./steps/PlaceStep";

interface OnboardingWizardProps {
  locale: string;
  stepLabels: {
    account: string;
    business: string;
    plan: string;
    place: string;
  };
  isLoggedIn: boolean;
  userId?: number;
  userEmail?: string;
  initialPlan?: "FREE" | "STARTER" | "PRO" | "ELITE";
}

export interface OnboardingData {
  // Account step
  userId?: number;
  userEmail?: string;

  // Business step
  businessName: string;
  businessDescription: string;
  businessPhone: string;
  businessEmail: string;
  businessWebsite: string;
  countryId?: number;
  countryName?: string;

  // Plan step
  planKey: "FREE" | "STARTER" | "PRO" | "ELITE";

  // Place step
  placeName: string;
  placeDescription: string;
  placeAddress: string;
  cityId?: number;
  cityName?: string;
  categoryIds: number[];

  // Claim mode (when claiming existing place)
  claimPlaceId?: number;
  claimPlaceName?: string;
  claimCityName?: string;
}

const STEPS = ["account", "business", "plan", "place"] as const;
type Step = (typeof STEPS)[number];

const STEP_ICONS = {
  account: User,
  business: Building2,
  plan: CreditCard,
  place: MapPin,
};

export function OnboardingWizard({
  locale,
  stepLabels,
  isLoggedIn,
  userId,
  userEmail,
  initialPlan,
}: OnboardingWizardProps) {
  const router = useRouter();

  // Start at step 2 (business) if already logged in
  const [currentStep, setCurrentStep] = useState<Step>(
    isLoggedIn ? "business" : "account"
  );

  const [data, setData] = useState<OnboardingData>({
    userId,
    userEmail,
    businessName: "",
    businessDescription: "",
    businessPhone: "",
    businessEmail: userEmail || "",
    businessWebsite: "",
    planKey: initialPlan || "FREE",
    placeName: "",
    placeDescription: "",
    placeAddress: "",
    categoryIds: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentStepIndex = STEPS.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / STEPS.length) * 100;

  const updateData = (updates: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }));
    setError(null);
  };

  const goToNextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < STEPS.length) {
      setCurrentStep(STEPS[nextIndex]);
    }
  };

  const goToPrevStep = () => {
    // Skip plan step if plan was pre-selected
    if (currentStep === "place" && initialPlan) {
      setCurrentStep("business");
      return;
    }

    const prevIndex = currentStepIndex - 1;
    // Don't go back to account if logged in
    if (prevIndex >= 0 && !(isLoggedIn && STEPS[prevIndex] === "account")) {
      setCurrentStep(STEPS[prevIndex]);
    }
  };

  const handleAccountComplete = (newUserId: number, email: string) => {
    updateData({ userId: newUserId, userEmail: email, businessEmail: email });
    goToNextStep();
  };

  const handleBusinessComplete = () => {
    // Skip plan step if plan was pre-selected from URL
    if (initialPlan) {
      setCurrentStep("place");
    } else {
      goToNextStep();
    }
  };

  // Handle claiming an existing place from BusinessStep
  const handleClaimPlace = (placeId: number, placeName: string, cityName: string) => {
    updateData({
      claimPlaceId: placeId,
      claimPlaceName: placeName,
      claimCityName: cityName,
      placeName: placeName,
    });
    // Skip plan step if plan was pre-selected, go to place step in claim mode
    if (initialPlan) {
      setCurrentStep("place");
    } else {
      goToNextStep(); // Go to plan step
    }
  };

  const handlePlanComplete = () => {
    goToNextStep();
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/onboarding/business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create business");
      }

      // If paid plan, redirect to Stripe checkout
      if (result.requiresPayment && result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
        return;
      }

      // For FREE plan, redirect to the new business dashboard
      router.push(`/${locale}/dashboard/business/${result.businessId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setIsSubmitting(false);
    }
  };

  const translations = {
    en: {
      back: "Back",
      next: "Continue",
      submit: "Complete Registration",
      submitting: "Creating your business...",
    },
    nl: {
      back: "Terug",
      next: "Doorgaan",
      submit: "Registratie Voltooien",
      submitting: "Je bedrijf wordt aangemaakt...",
    },
    de: {
      back: "Zurück",
      next: "Weiter",
      submit: "Registrierung Abschließen",
      submitting: "Dein Unternehmen wird erstellt...",
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <div className="space-y-8">
      {/* Progress Steps */}
      <div className="flex justify-between items-center mb-2">
        {STEPS.map((step, index) => {
          const Icon = STEP_ICONS[step];
          const isActive = step === currentStep;
          const isComplete = index < currentStepIndex;
          const isDisabled = isLoggedIn && step === "account";

          return (
            <div
              key={step}
              className={cn(
                "flex flex-col items-center gap-2 flex-1",
                isDisabled && "opacity-50"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                  isComplete
                    ? "bg-green-500 text-white"
                    : isActive
                      ? "bg-cpCoral text-white"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                )}
              >
                {isComplete ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-medium text-center",
                  isActive
                    ? "text-cpCoral"
                    : isComplete
                      ? "text-green-600 dark:text-green-400"
                      : "text-slate-500 dark:text-slate-400"
                )}
              >
                {stepLabels[step]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <Progress value={progress} className="h-2" />

      {/* Step Content */}
      <Card className="border-slate-200 dark:border-slate-700">
        <CardContent className="pt-6">
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          {currentStep === "account" && (
            <AccountStep
              locale={locale}
              onComplete={handleAccountComplete}
              initialPlan={initialPlan}
            />
          )}

          {currentStep === "business" && (
            <BusinessStep
              locale={locale}
              data={data}
              updateData={updateData}
              onNext={handleBusinessComplete}
              onBack={isLoggedIn ? undefined : goToPrevStep}
              onClaimPlace={handleClaimPlace}
              labels={{ back: t.back, next: t.next }}
            />
          )}

          {currentStep === "plan" && (
            <PlanStep
              locale={locale}
              data={data}
              updateData={updateData}
              onNext={handlePlanComplete}
              onBack={goToPrevStep}
              labels={{ back: t.back, next: t.next }}
            />
          )}

          {currentStep === "place" && (
            <PlaceStep
              locale={locale}
              data={data}
              updateData={updateData}
              onSubmit={handleFinalSubmit}
              onBack={goToPrevStep}
              isSubmitting={isSubmitting}
              labels={{
                back: t.back,
                submit: t.submit,
                submitting: t.submitting,
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
