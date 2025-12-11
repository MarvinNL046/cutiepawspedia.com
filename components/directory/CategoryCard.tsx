import Link from "next/link";

// Wrapper to disable prefetch for performance (prevents 300+ RSC requests)
const OptimizedLink = ({ children, ...props }: React.ComponentProps<typeof Link>) => (
  <Link prefetch={false} {...props}>{children}</Link>
);

interface CategoryCardProps {
  href: string;
  icon: string;
  label: string;
  variant?: "default" | "compact";
}

/**
 * Modern category card with glassmorphism and gradient effects.
 * Supports both light and dark cozy themes.
 */
export function CategoryCard({ href, icon, label, variant = "default" }: CategoryCardProps) {
  if (variant === "compact") {
    return (
      <OptimizedLink href={href} className="group">
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-card dark:bg-cpSurface/60 border border-border dark:border-cpAmber/20 hover:shadow-md hover:border-cpCoral/30 dark:hover:border-cpAmber/40 transition-all duration-300 hover:-translate-y-0.5">
          <span className="text-lg">{icon}</span>
          <span className="text-sm font-medium text-foreground dark:text-cpCream group-hover:text-cpCoral dark:group-hover:text-cpAmber transition-colors">
            {label}
          </span>
        </div>
      </OptimizedLink>
    );
  }

  return (
    <OptimizedLink href={href} className="group block">
      <div className="relative h-full rounded-3xl bg-card dark:bg-cpSurface/80 border border-border dark:border-cpAmber/20 p-5 transition-all duration-300 hover:shadow-lg hover:shadow-cpCoral/10 dark:hover:shadow-cpAmber/10 hover:-translate-y-1 hover:border-cpCoral/30 dark:hover:border-cpAmber/40 overflow-hidden shadow-sm">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-cpCoral/5 to-cpAmber/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <div className="relative text-center">
          {/* Icon with amber outlined circle - cozy theme */}
          <div className="category-circle mx-auto mb-3 group-hover:scale-110 group-hover:border-cpCoral transition-all duration-300">
            <span className="text-3xl">{icon}</span>
          </div>

          <h3 className="font-semibold text-foreground group-hover:text-cpCoral dark:group-hover:text-cpAmber transition-colors text-sm">
            {label}
          </h3>
        </div>
      </div>
    </OptimizedLink>
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
