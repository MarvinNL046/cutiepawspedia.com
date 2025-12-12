"use client";

import { useState, useEffect } from "react";
import { X, Store, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface StickyBottomBannerProps {
  className?: string;
  locale?: string;
}

const content = {
  nl: {
    business: {
      title: "Heb je een dierenzaak?",
      subtitle: "Claim gratis je vermelding en bereik meer klanten",
      cta: "Claim Nu",
      link: "/voor-bedrijven",
    },
    affiliate: {
      title: "Tot 40% korting op huisdiervoeding!",
      subtitle: "Bij onze partner Zooplus - Europa's #1 dierenwinkel",
      cta: "Shop Nu",
      link: "https://www.zooplus.nl",
      isExternal: true,
    },
  },
  en: {
    business: {
      title: "Own a pet business?",
      subtitle: "Claim your free listing and reach more customers",
      cta: "Claim Now",
      link: "/for-businesses",
    },
    affiliate: {
      title: "Up to 40% off pet food!",
      subtitle: "At our partner Zooplus - Europe's #1 pet store",
      cta: "Shop Now",
      link: "https://www.zooplus.com",
      isExternal: true,
    },
  },
  de: {
    business: {
      title: "Besitzen Sie ein Tiergeschäft?",
      subtitle: "Beanspruchen Sie Ihren kostenlosen Eintrag",
      cta: "Jetzt Beanspruchen",
      link: "/fuer-unternehmen",
    },
    affiliate: {
      title: "Bis zu 40% Rabatt auf Tierfutter!",
      subtitle: "Bei unserem Partner Zooplus - Europas #1 Tiershop",
      cta: "Jetzt Shoppen",
      link: "https://www.zooplus.de",
      isExternal: true,
    },
  },
  fr: {
    business: {
      title: "Vous avez une animalerie?",
      subtitle: "Réclamez gratuitement votre fiche",
      cta: "Réclamer",
      link: "/pour-entreprises",
    },
    affiliate: {
      title: "Jusqu'à 40% de réduction!",
      subtitle: "Chez notre partenaire Zooplus",
      cta: "Acheter",
      link: "https://www.zooplus.fr",
      isExternal: true,
    },
  },
};

export function StickyBottomBanner({ className, locale = "nl" }: StickyBottomBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showAffiliate, setShowAffiliate] = useState(false);

  // Get content for current locale
  const localeContent = content[locale as keyof typeof content] || content.nl;
  const currentContent = showAffiliate ? localeContent.affiliate : localeContent.business;

  // Rotate between business CTA and affiliate (if we have affiliate deals)
  useEffect(() => {
    // Only show affiliate 30% of the time
    setShowAffiliate(Math.random() < 0.3);
  }, []);

  // Show banner after scrolling down 400px
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldShow = scrollY > 400;

      if (shouldShow && !isDismissed) {
        setIsVisible(true);
      } else if (!shouldShow) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  // Check localStorage for dismissed state
  useEffect(() => {
    const dismissed = localStorage.getItem("stickyBottomBannerDismissed");
    if (dismissed) {
      const dismissedTime = parseInt(dismissed, 10);
      // Show again after 1 hour
      if (Date.now() - dismissedTime < 60 * 60 * 1000) {
        setIsDismissed(true);
      }
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    localStorage.setItem("stickyBottomBannerDismissed", Date.now().toString());
  };

  if (!isVisible || isDismissed) return null;

  const LinkComponent = currentContent.isExternal ? "a" : Link;
  const linkProps = currentContent.isExternal
    ? { href: currentContent.link, target: "_blank", rel: "noopener noreferrer sponsored" }
    : { href: `/${locale}${currentContent.link}` };

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 transform transition-all duration-500 ease-out",
        isVisible ? "translate-y-0" : "translate-y-full",
        className
      )}
    >
      {/* Solid background for good contrast in all themes */}
      <div className="relative bg-cpCharcoal dark:bg-cpCharcoal border-t border-cpCoral/30 shadow-lg shadow-black/30">
        {/* Decorative top line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cpCoral to-transparent" />

        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Content */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {/* Icon */}
              <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-cpCoral/20 flex-shrink-0">
                {showAffiliate ? (
                  <Sparkles className="h-5 w-5 text-cpCoral" />
                ) : (
                  <Store className="h-5 w-5 text-cpCoral" />
                )}
              </div>

              {/* Text - Always light text on dark background */}
              <div className="min-w-0">
                <p className="text-cpCream font-semibold text-sm sm:text-base truncate">
                  {currentContent.title}
                </p>
                <p className="text-cpCream/70 text-xs sm:text-sm truncate">
                  {currentContent.subtitle}
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <LinkComponent
              {...linkProps}
              className="flex items-center gap-2 px-4 py-2 bg-cpCoral hover:bg-cpCoral/90 text-cpCharcoal font-semibold rounded-full transition-all duration-200 hover:scale-105 flex-shrink-0 text-sm sm:text-base"
            >
              <span>{currentContent.cta}</span>
              <ArrowRight className="h-4 w-4" />
            </LinkComponent>

            {/* Dismiss button */}
            <button
              onClick={handleDismiss}
              className="p-2 hover:bg-cpCream/10 rounded-full transition-colors flex-shrink-0"
              aria-label="Dismiss banner"
            >
              <X className="h-4 w-4 text-cpCream/70 hover:text-cpCream" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
