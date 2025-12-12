"use client";

import { useTranslations } from "next-intl";
import { Sparkles } from "lucide-react";
import { getHighlights, type PlaceData, type AIContent } from "@/lib/enrichment/ui";

interface HighlightsSectionProps {
  place: PlaceData;
  aiContent?: AIContent;
}

export function HighlightsSection({
  place,
  aiContent,
}: HighlightsSectionProps) {
  const t = useTranslations("place");
  const highlights = getHighlights(place, aiContent);

  // Don't render if no highlights
  if (highlights.length === 0) return null;

  return (
    <section className="mt-6 p-4 bg-gradient-to-br from-cpCoral/5 to-cpAmber/5 dark:from-cpCoral/10 dark:to-cpAmber/10 rounded-xl border border-cpCoral/10 dark:border-cpAmber/20">
      <h3 className="text-sm font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-cpAmber" />
        {t("whyPeopleChoose")}
      </h3>
      <ul className="space-y-2">
        {highlights.map((highlight, index) => (
          <li
            key={index}
            className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70"
          >
            <span className="text-cpCoral font-medium shrink-0">
              {index + 1}.
            </span>
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
