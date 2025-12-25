"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ChevronDown, ChevronUp, Info } from "lucide-react";
import { getBestAboutText, type PlaceData, type AIContent, type ScrapedContent } from "@/lib/enrichment/ui";

interface AboutSectionProps {
  place: PlaceData;
  aiContent?: AIContent;
  scrapedContent?: ScrapedContent;
  locale?: string;
}

export function AboutSection({ place, aiContent, scrapedContent }: AboutSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const t = useTranslations("place");
  const tCommon = useTranslations("common");

  const { text, source } = getBestAboutText(place, aiContent, scrapedContent);

  // Check if text is long enough to warrant expand/collapse
  const isLongText = text.length > 400;
  const shouldTruncate = isLongText && !expanded;

  // Truncate text at sentence boundary if needed
  const displayText = shouldTruncate
    ? truncateAtSentence(text, 350)
    : text;

  return (
    <Card className="bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-foreground dark:text-cpCream">
          {t("about", { name: place.name })}
          {source === "enriched" && (
            <span className="text-xs font-normal text-cpCoral bg-cpCoral/10 dark:bg-cpCoral/20 px-2 py-0.5 rounded-full">
              {t("fromWebsite")}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main about text */}
        <div className="relative">
          <p className="text-muted-foreground dark:text-cpCream/70 leading-relaxed whitespace-pre-line">
            {displayText}
          </p>
          {shouldTruncate && (
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card dark:from-cpSurface/50 to-transparent pointer-events-none" />
          )}
        </div>

        {/* Expand/Collapse button */}
        {isLongText && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="text-cpCoral hover:text-cpCoral/80 hover:bg-cpCoral/5 dark:hover:bg-cpCoral/10 gap-1 -ml-2"
          >
            {expanded ? (
              <>
                {t("showLess")}
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                {tCommon("readMore")}
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        )}

        {/* AI content bullets if available */}
        {aiContent?.bullets && aiContent.bullets.length > 0 && (
          <ul className="space-y-2 pt-2 border-t border-border dark:border-cpAmber/20">
            {aiContent.bullets.map((bullet, index) => (
              <li key={index} className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                <CheckCircle className="h-4 w-4 text-cpCoral shrink-0 mt-0.5" />
                <span className="text-sm">{bullet}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Source attribution */}
        {source === "enriched" && (
          <p className="text-xs text-muted-foreground dark:text-cpCream/60 flex items-center gap-1 pt-2">
            <Info className="h-3 w-3" />
            {t("basedOnWebsite")}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function truncateAtSentence(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;

  const truncated = text.substring(0, maxLength);
  const lastPeriod = truncated.lastIndexOf(".");
  const lastQuestion = truncated.lastIndexOf("?");
  const lastExclaim = truncated.lastIndexOf("!");

  const lastBoundary = Math.max(lastPeriod, lastQuestion, lastExclaim);

  if (lastBoundary > maxLength * 0.5) {
    return text.substring(0, lastBoundary + 1);
  }

  // Fallback: truncate at word boundary
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace > maxLength * 0.8) {
    return text.substring(0, lastSpace) + "...";
  }

  return truncated + "...";
}
