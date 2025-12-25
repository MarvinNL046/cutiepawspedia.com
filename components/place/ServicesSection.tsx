"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { getServiceBadges, type ScrapedContent } from "@/lib/enrichment/ui";

interface ServicesSectionProps {
  categories?: Array<{ slug: string; labelKey: string }>;
  description?: string | null;
  scrapedContent?: ScrapedContent;
  locale?: string;
}

export function ServicesSection({
  categories,
  description,
  scrapedContent,
}: ServicesSectionProps) {
  const t = useTranslations("place");
  const services = getServiceBadges(categories, description, scrapedContent);

  // Don't render if no services
  if (services.length === 0) return null;

  return (
    <section className="mt-4">
      <h3 className="text-sm font-semibold text-foreground dark:text-cpCream mb-3">
        {t("services")}
      </h3>
      <div className="flex flex-wrap gap-2">
        {services.map((service) => (
          <Badge
            key={service}
            variant="outline"
            className="bg-muted dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 border-border dark:border-cpAmber/30 hover:bg-muted/80 dark:hover:bg-cpSurface/80"
          >
            {service}
          </Badge>
        ))}
      </div>
    </section>
  );
}
