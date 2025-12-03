import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface CategoryCardProps {
  href: string;
  icon: string;
  label: string;
  variant?: "default" | "compact";
}

/**
 * Consistent category card used across home, city, and listing pages.
 * Uses standardized styling: rounded-xl, shadow-sm hover:shadow-md, cpPink accent.
 */
export function CategoryCard({ href, icon, label, variant = "default" }: CategoryCardProps) {
  if (variant === "compact") {
    return (
      <Link href={href} className="group">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border bg-white hover:border-cpPink/50 hover:shadow-sm transition-all">
          <span className="text-lg">{icon}</span>
          <span className="text-sm font-medium text-cpDark group-hover:text-cpPink transition-colors">
            {label}
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link href={href} className="group block">
      <Card className="h-full hover-lift hover:shadow-md hover:border-cpPink/50">
        <CardContent className="p-4 text-center">
          <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">
            {icon}
          </div>
          <h3 className="font-medium text-foreground group-hover:text-cpPink transition-colors text-sm">
            {label}
          </h3>
        </CardContent>
      </Card>
    </Link>
  );
}

/**
 * Standard icon map for categories
 */
export function getCategoryIcon(icon: string | null): string {
  const icons: Record<string, string> = {
    hotel: "🏨",
    "pet-hotels": "🏨",
    vet: "🩺",
    veterinarians: "🩺",
    grooming: "✂️",
    training: "🐕",
    shop: "🛒",
    "pet-shops": "🛒",
    walking: "🚶",
    "dog-walking": "🚶",
    boarding: "🏠",
    daycare: "☀️",
    emergency: "🚨",
  };
  return icons[icon || ""] || "🐾";
}
