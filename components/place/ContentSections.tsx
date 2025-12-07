/**
 * ContentSections - Display AI-generated content sections
 *
 * Renders additional content sections from AI generation to add depth
 * and reduce thin content issues. Supports sections like:
 * - "What to Expect"
 * - "Services Overview"
 * - "Why Choose This Business"
 * - "Local Relevance"
 */

import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, MapPin, Star, CheckCircle2 } from "lucide-react";
import type { AiContentStructure } from "@/db/schema/ai";

interface ContentSectionsProps {
  content: AiContentStructure;
  placeName: string;
  locale?: string;
  className?: string;
}

// Get icon based on section heading
function getSectionIcon(heading: string) {
  const headingLower = heading.toLowerCase();

  if (headingLower.includes("expect") || headingLower.includes("verwacht")) {
    return <Sparkles className="h-5 w-5 text-cpAmber" />;
  }
  if (headingLower.includes("service") || headingLower.includes("dienst")) {
    return <CheckCircle2 className="h-5 w-5 text-cpCoral" />;
  }
  if (headingLower.includes("why") || headingLower.includes("waarom") || headingLower.includes("choose") || headingLower.includes("kies")) {
    return <Star className="h-5 w-5 text-cpYellow" />;
  }
  if (headingLower.includes("local") || headingLower.includes("location") || headingLower.includes("locatie") || headingLower.includes("bereik")) {
    return <MapPin className="h-5 w-5 text-cpAqua" />;
  }
  return <Sparkles className="h-5 w-5 text-cpAmber" />;
}

export function ContentSections({
  content,
  placeName,
  locale = "en",
  className = ""
}: ContentSectionsProps) {
  const { sections } = content;

  // Don't render if no sections
  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {sections.map((section, index) => (
        <Card
          key={index}
          className="bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20 overflow-hidden"
        >
          <CardContent className="p-5">
            {/* Section header with icon */}
            <div className="flex items-center gap-2 mb-3">
              {getSectionIcon(section.heading)}
              <h3 className="font-semibold text-foreground dark:text-cpCream">
                {section.heading}
              </h3>
            </div>

            {/* Section content */}
            <p className="text-muted-foreground dark:text-cpCream/70 leading-relaxed">
              {section.content}
            </p>
          </CardContent>
        </Card>
      ))}

      {/* Local relevance section if available (from enhanced AI content) */}
      {(content as AiContentStructure & { localRelevance?: string }).localRelevance && (
        <Card className="bg-gradient-to-r from-cpAqua/10 to-cpCoral/10 dark:from-cpAqua/5 dark:to-cpCoral/5 border-cpAqua/20 dark:border-cpAqua/10 overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-5 w-5 text-cpAqua" />
              <h3 className="font-semibold text-foreground dark:text-cpCream">
                {locale === "nl" ? "Locatie & Bereikbaarheid" : "Location & Accessibility"}
              </h3>
            </div>
            <p className="text-muted-foreground dark:text-cpCream/70 leading-relaxed">
              {(content as AiContentStructure & { localRelevance?: string }).localRelevance}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default ContentSections;
