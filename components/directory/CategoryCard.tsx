import Link from "next/link";

interface CategoryCardProps {
  href: string;
  icon: string;
  label: string;
  variant?: "default" | "compact";
}

/**
 * Modern category card with glassmorphism and gradient effects.
 * Inspired by postforge.ai and seogrove.ai design patterns.
 */
export function CategoryCard({ href, icon, label, variant = "default" }: CategoryCardProps) {
  if (variant === "compact") {
    return (
      <Link href={href} className="group">
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-card hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
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
      <div className="relative h-full rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 p-5 transition-all duration-300 hover:shadow-lg hover:shadow-cpPink/10 hover:-translate-y-1 hover:border-cpPink/30 overflow-hidden">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-cpPink/5 to-cpAqua/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <div className="relative text-center">
          {/* Icon with gradient background */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-cpPink/10 to-cpPink/5 mb-3 group-hover:scale-110 transition-transform duration-300">
            <span className="text-3xl">{icon}</span>
          </div>

          <h3 className="font-semibold text-foreground group-hover:text-cpPink transition-colors text-sm">
            {label}
          </h3>
        </div>
      </div>
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
