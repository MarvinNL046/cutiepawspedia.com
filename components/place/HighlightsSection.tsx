import { Sparkles } from "lucide-react";
import { getHighlights, type PlaceData, type AIContent } from "@/lib/enrichment/ui";

interface HighlightsSectionProps {
  place: PlaceData;
  aiContent?: AIContent;
  locale?: string;
}

export function HighlightsSection({
  place,
  aiContent,
  locale = "en",
}: HighlightsSectionProps) {
  const highlights = getHighlights(place, aiContent, locale);

  // Don't render if no highlights
  if (highlights.length === 0) return null;

  return (
    <section className="mt-6 p-4 bg-gradient-to-br from-cpPink/5 to-cpAqua/5 rounded-xl">
      <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-cpYellow" />
        {locale === "nl" ? "Waarom mensen kiezen voor dit bedrijf" : "Why people choose this place"}
      </h3>
      <ul className="space-y-2">
        {highlights.map((highlight, index) => (
          <li
            key={index}
            className="flex items-start gap-2 text-sm text-slate-600"
          >
            <span className="text-cpPink font-medium shrink-0">
              {index + 1}.
            </span>
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
