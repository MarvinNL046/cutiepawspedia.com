"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Gift, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewsletterForm } from "@/components/forms";
import { useTranslations } from "next-intl";

interface ExitIntentPopupProps {
  locale: string;
}

export function ExitIntentPopup({ locale }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const t = useTranslations("newsletter");

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      // Only trigger when mouse moves to top of viewport (leaving to address bar/tabs)
      if (e.clientY <= 5 && !hasShown) {
        // Check if already shown this session
        const alreadyShown = sessionStorage.getItem("exitPopupShown");
        if (!alreadyShown) {
          setIsVisible(true);
          setHasShown(true);
          sessionStorage.setItem("exitPopupShown", "true");
        }
      }
    },
    [hasShown]
  );

  useEffect(() => {
    // Check if already shown this session on mount
    const alreadyShown = sessionStorage.getItem("exitPopupShown");
    if (alreadyShown) {
      setHasShown(true);
      return;
    }

    // Small delay before activating to prevent immediate triggers
    const timeout = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 3000); // Wait 3 seconds before enabling

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseLeave]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-lg bg-card dark:bg-cpSurface rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Header with gradient */}
        <div className="relative bg-gradient-to-br from-cpCoral to-cpAmber p-8 text-center">
          {/* Decorative circles */}
          <div className="absolute top-4 left-4 w-16 h-16 border-2 border-white/20 rounded-full" />
          <div className="absolute bottom-4 right-8 w-8 h-8 border-2 border-white/10 rounded-full" />

          <div className="relative">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {t("waitMoment")}
            </h2>
            <p className="text-white/90">
              {t("dontMissTips")}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-foreground dark:text-cpCream mb-2">
              {t("subscribeNewsletter")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("receiveOffers")}
            </p>
          </div>

          {/* Newsletter form */}
          <div className="mb-6">
            <NewsletterForm
              variant="stacked"
              onSuccess={() => {
                setTimeout(handleClose, 2000);
              }}
            />
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-3 gap-4 text-center text-xs text-muted-foreground">
            <div>
              <span className="block text-lg mb-1">📧</span>
              {t("weeklyTips")}
            </div>
            <div>
              <span className="block text-lg mb-1">🎁</span>
              {t("exclusiveDeals")}
            </div>
            <div>
              <span className="block text-lg mb-1">🚫</span>
              {t("noSpam")}
            </div>
          </div>

          {/* Dismiss link */}
          <div className="text-center mt-6">
            <button
              onClick={handleClose}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("noThanks")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
