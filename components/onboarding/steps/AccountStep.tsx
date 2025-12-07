"use client";

/**
 * Account Step - Sign in or create account
 */

import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";

interface AccountStepProps {
  locale: string;
  onComplete: (userId: number, email: string) => void;
  initialPlan?: string;
}

export function AccountStep({ locale, initialPlan }: AccountStepProps) {
  const translations = {
    en: {
      title: "Create or Sign In to Your Account",
      description: "You need an account to register your business on CutiePawsPedia.",
      signIn: "Sign In",
      signInDesc: "Already have an account? Sign in to continue.",
      signUp: "Create Account",
      signUpDesc: "New to CutiePawsPedia? Create a free account.",
    },
    nl: {
      title: "Maak een Account of Log In",
      description: "Je hebt een account nodig om je bedrijf te registreren op CutiePawsPedia.",
      signIn: "Inloggen",
      signInDesc: "Heb je al een account? Log in om door te gaan.",
      signUp: "Account Aanmaken",
      signUpDesc: "Nieuw bij CutiePawsPedia? Maak een gratis account aan.",
    },
    de: {
      title: "Konto Erstellen oder Anmelden",
      description: "Du benötigst ein Konto, um dein Unternehmen bei CutiePawsPedia zu registrieren.",
      signIn: "Anmelden",
      signInDesc: "Hast du bereits ein Konto? Melde dich an um fortzufahren.",
      signUp: "Konto Erstellen",
      signUpDesc: "Neu bei CutiePawsPedia? Erstelle ein kostenloses Konto.",
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  // Redirect to auth with return URL, preserving the plan parameter
  const planParam = initialPlan ? `?plan=${initialPlan}` : "";
  const returnUrl = `/${locale}/onboarding/business${planParam}`;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-cpDark dark:text-white mb-2">
          {t.title}
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          {t.description}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Sign In */}
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-cpCoral/50 transition-colors">
          <div className="w-12 h-12 rounded-full bg-cpCoral/10 flex items-center justify-center mb-4">
            <LogIn className="w-6 h-6 text-cpCoral" />
          </div>
          <h3 className="font-semibold text-cpDark dark:text-white mb-2">
            {t.signIn}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            {t.signInDesc}
          </p>
          <Button asChild className="w-full bg-cpCoral hover:bg-cpCoral/90">
            <a href={`/handler/sign-in?after_auth_return_to=${encodeURIComponent(returnUrl)}`}>
              {t.signIn}
            </a>
          </Button>
        </div>

        {/* Sign Up */}
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-cpAqua/50 transition-colors">
          <div className="w-12 h-12 rounded-full bg-cpAqua/10 flex items-center justify-center mb-4">
            <UserPlus className="w-6 h-6 text-cpAqua" />
          </div>
          <h3 className="font-semibold text-cpDark dark:text-white mb-2">
            {t.signUp}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            {t.signUpDesc}
          </p>
          <Button asChild variant="outline" className="w-full border-cpAqua text-cpAqua hover:bg-cpAqua/10">
            <a href={`/handler/sign-up?after_auth_return_to=${encodeURIComponent(returnUrl)}`}>
              {t.signUp}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
