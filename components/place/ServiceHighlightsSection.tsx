/**
 * ServiceHighlightsSection - Display AI-generated service highlights
 *
 * Shows key service highlights/USPs from AI generation.
 * Designed to showcase what makes this business special.
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Award, Zap, Target } from "lucide-react";

interface ServiceHighlightsSectionProps {
  highlights: string[];
  placeName: string;
  locale?: string;
  className?: string;
}

// Rotate through different icons for variety
const icons = [
  <Sparkles key="sparkles" className="h-4 w-4" />,
  <Award key="award" className="h-4 w-4" />,
  <Zap key="zap" className="h-4 w-4" />,
  <Target key="target" className="h-4 w-4" />,
];

export function ServiceHighlightsSection({
  highlights,
  placeName,
  locale = "en",
  className = "",
}: ServiceHighlightsSectionProps) {
  // Don't render if no highlights
  if (!highlights || highlights.length === 0) {
    return null;
  }

  return (
    <Card className={`bg-gradient-to-br from-cpAmber/5 to-cpYellow/10 border-cpAmber/20 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-cpAmber" />
          {locale === "nl" ? "Waarom Kiezen" : "Why Choose Us"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {highlights.slice(0, 6).map((highlight, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="px-3 py-1.5 text-sm font-medium bg-white/80 hover:bg-white border-cpAmber/30 text-cpDark gap-1.5"
            >
              {icons[index % icons.length]}
              {highlight}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default ServiceHighlightsSection;
