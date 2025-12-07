/**
 * Cookie Consent Banner
 *
 * GDPR-compliant cookie consent banner with:
 * - Accept All / Decline / Customize options
 * - Google Consent Mode v2 integration
 * - Localized text (NL/EN/DE)
 * - Responsive design
 * - Accessible (keyboard navigation, ARIA)
 *
 * Part of A1: AdSense Integration + Ad-free Members
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Cookie, Settings, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  shouldShowConsentBanner,
  setConsentState,
  initGoogleConsentMode,
  getConsentPreferences,
} from "@/lib/ads/consent";
import { cn } from "@/lib/utils";

interface CookieConsentBannerProps {
  locale?: string;
}

// Translations
const translations = {
  en: {
    title: "We value your privacy",
    description: "We use cookies to enhance your browsing experience, serve personalized ads, and analyze our traffic. By clicking \"Accept All\", you consent to our use of cookies.",
    acceptAll: "Accept All",
    decline: "Decline",
    customize: "Customize",
    savePreferences: "Save Preferences",
    essential: "Essential Cookies",
    essentialDesc: "Required for the website to function. Cannot be disabled.",
    analytics: "Analytics Cookies",
    analyticsDesc: "Help us understand how visitors interact with our website.",
    advertising: "Advertising Cookies",
    advertisingDesc: "Used to show you relevant ads and measure ad effectiveness.",
    learnMore: "Learn more in our",
    privacyPolicy: "Privacy Policy",
  },
  nl: {
    title: "Wij respecteren uw privacy",
    description: "Wij gebruiken cookies om uw browse-ervaring te verbeteren, gepersonaliseerde advertenties te tonen en ons verkeer te analyseren. Door op \"Alles accepteren\" te klikken, stemt u in met ons gebruik van cookies.",
    acceptAll: "Alles accepteren",
    decline: "Weigeren",
    customize: "Aanpassen",
    savePreferences: "Voorkeuren opslaan",
    essential: "Essentiële cookies",
    essentialDesc: "Vereist voor het functioneren van de website. Kan niet worden uitgeschakeld.",
    analytics: "Analytische cookies",
    analyticsDesc: "Helpen ons te begrijpen hoe bezoekers onze website gebruiken.",
    advertising: "Advertentiecookies",
    advertisingDesc: "Worden gebruikt om u relevante advertenties te tonen.",
    learnMore: "Meer informatie in ons",
    privacyPolicy: "Privacybeleid",
  },
  de: {
    title: "Wir respektieren Ihre Privatsphäre",
    description: "Wir verwenden Cookies, um Ihr Browsererlebnis zu verbessern, personalisierte Werbung anzuzeigen und unseren Datenverkehr zu analysieren. Durch Klicken auf \"Alle akzeptieren\" stimmen Sie unserer Verwendung von Cookies zu.",
    acceptAll: "Alle akzeptieren",
    decline: "Ablehnen",
    customize: "Anpassen",
    savePreferences: "Einstellungen speichern",
    essential: "Erforderliche Cookies",
    essentialDesc: "Für das Funktionieren der Website erforderlich. Kann nicht deaktiviert werden.",
    analytics: "Analyse-Cookies",
    analyticsDesc: "Helfen uns zu verstehen, wie Besucher unsere Website nutzen.",
    advertising: "Werbe-Cookies",
    advertisingDesc: "Werden verwendet, um Ihnen relevante Werbung anzuzeigen.",
    learnMore: "Mehr Informationen in unserer",
    privacyPolicy: "Datenschutzerklärung",
  },
};

export function CookieConsentBanner({ locale = "en" }: CookieConsentBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  // Initialize preferences from existing consent if available
  const [preferences, setPreferences] = useState(() => {
    if (typeof window !== "undefined") {
      const existingPrefs = getConsentPreferences();
      if (existingPrefs) {
        return {
          analytics: existingPrefs.analytics,
          advertising: existingPrefs.advertising,
        };
      }
    }
    return { analytics: true, advertising: true };
  });

  const t = translations[locale as keyof typeof translations] || translations.en;

  // Initialize on mount
  useEffect(() => {
    // Initialize Google Consent Mode first
    initGoogleConsentMode();

    // Check if banner should be shown
    if (shouldShowConsentBanner()) {
      // Small delay to prevent flash during hydration
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    setConsentState("granted", { analytics: true, advertising: true });
    setIsVisible(false);
  };

  const handleDecline = () => {
    setConsentState("denied", { analytics: false, advertising: false });
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    // If advertising is enabled, grant consent, otherwise deny
    const state = preferences.advertising ? "granted" : "denied";
    setConsentState(state, preferences);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consent-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Banner */}
      <div
        className={cn(
          "relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden",
          "animate-in slide-in-from-bottom-4 duration-300"
        )}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-cpCoral/10 rounded-lg">
              <Cookie className="h-6 w-6 text-cpCoral" />
            </div>
            <div className="flex-1">
              <h2 id="consent-title" className="text-lg font-semibold text-cpDark">
                {t.title}
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                {t.description}
              </p>
            </div>
          </div>
        </div>

        {/* Customize Panel */}
        {showCustomize && (
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 space-y-4">
            {/* Essential - Always on */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label className="font-medium text-cpDark">{t.essential}</Label>
                <p className="text-xs text-slate-500">{t.essentialDesc}</p>
              </div>
              <Switch checked disabled className="data-[state=checked]:bg-cpAqua" />
            </div>

            {/* Analytics */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label className="font-medium text-cpDark">{t.analytics}</Label>
                <p className="text-xs text-slate-500">{t.analyticsDesc}</p>
              </div>
              <Switch
                checked={preferences.analytics}
                onCheckedChange={(checked) => setPreferences((p) => ({ ...p, analytics: checked }))}
                className="data-[state=checked]:bg-cpAqua"
              />
            </div>

            {/* Advertising */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label className="font-medium text-cpDark">{t.advertising}</Label>
                <p className="text-xs text-slate-500">{t.advertisingDesc}</p>
              </div>
              <Switch
                checked={preferences.advertising}
                onCheckedChange={(checked) => setPreferences((p) => ({ ...p, advertising: checked }))}
                className="data-[state=checked]:bg-cpAqua"
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="px-6 py-4 flex flex-col sm:flex-row gap-2">
          {showCustomize ? (
            <>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowCustomize(false)}
              >
                <X className="h-4 w-4 mr-2" />
                {t.decline}
              </Button>
              <Button
                className="flex-1 bg-cpCoral hover:bg-cpCoral/90"
                onClick={handleSavePreferences}
              >
                <Check className="h-4 w-4 mr-2" />
                {t.savePreferences}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                className="sm:order-1"
                onClick={() => setShowCustomize(true)}
              >
                <Settings className="h-4 w-4 mr-2" />
                {t.customize}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="sm:order-2"
                onClick={handleDecline}
              >
                {t.decline}
              </Button>
              <Button
                size="sm"
                className="flex-1 sm:order-3 bg-cpCoral hover:bg-cpCoral/90"
                onClick={handleAcceptAll}
              >
                <Check className="h-4 w-4 mr-2" />
                {t.acceptAll}
              </Button>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-4 text-center">
          <p className="text-xs text-slate-400">
            {t.learnMore}{" "}
            <Link href={`/${locale}/privacy`} className="text-cpCoral hover:underline">
              {t.privacyPolicy}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
