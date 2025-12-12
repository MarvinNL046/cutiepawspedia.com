/**
 * CTASection - Display AI-generated call-to-action
 *
 * Shows a compelling CTA message from AI generation to encourage
 * user engagement (contact, visit, book appointment).
 */

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, MessageSquare, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";

interface CTASectionProps {
  cta: string;
  placeName: string;
  phone?: string | null;
  locale?: string;
  className?: string;
}

export function CTASection({
  cta,
  placeName,
  phone,
  locale = "en",
  className = "",
}: CTASectionProps) {
  const t = useTranslations("place");
  // Don't render if no CTA
  if (!cta || cta.length === 0) {
    return null;
  }

  return (
    <Card className={`bg-gradient-to-r from-cpCoral to-cpCoral/80 border-cpCoral text-white overflow-hidden ${className}`}>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* CTA Text */}
          <div className="flex-1">
            <p className="text-lg font-medium leading-relaxed">
              {cta}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 shrink-0">
            {phone && (
              <Button
                asChild
                variant="secondary"
                className="bg-white text-cpCoral hover:bg-white/90 gap-2"
              >
                <a href={`tel:${phone}`}>
                  <Phone className="h-4 w-4" />
                  {t("callNow")}
                </a>
              </Button>
            )}
            <Button
              asChild
              variant="secondary"
              className="bg-white/20 text-white border-white/30 hover:bg-white/30 gap-2"
            >
              <a href="#inquiry-form">
                <MessageSquare className="h-4 w-4" />
                {t("contact")}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CTASection;
