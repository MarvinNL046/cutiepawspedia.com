import { Badge } from "@/components/ui/badge";
import { getServiceBadges } from "@/lib/enrichment/ui";

interface ServicesSectionProps {
  categories?: Array<{ slug: string; labelKey: string }>;
  description?: string | null;
  locale?: string;
}

export function ServicesSection({
  categories,
  description,
  locale = "en",
}: ServicesSectionProps) {
  const services = getServiceBadges(categories, description);

  // Don't render if no services
  if (services.length === 0) return null;

  return (
    <section className="mt-4">
      <h3 className="text-sm font-semibold text-foreground dark:text-cpCream mb-3">
        {locale === "nl" ? "Diensten & Aanbod" : "Services & Offerings"}
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
