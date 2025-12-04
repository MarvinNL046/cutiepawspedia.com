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
      <h3 className="text-sm font-semibold text-slate-900 mb-3">
        {locale === "nl" ? "Diensten & Aanbod" : "Services & Offerings"}
      </h3>
      <div className="flex flex-wrap gap-2">
        {services.map((service) => (
          <Badge
            key={service}
            variant="outline"
            className="bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
          >
            {service}
          </Badge>
        ))}
      </div>
    </section>
  );
}
