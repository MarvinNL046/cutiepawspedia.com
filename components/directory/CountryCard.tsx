import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Wrapper to disable prefetch for performance (prevents 300+ RSC requests)
const OptimizedLink = ({ children, ...props }: React.ComponentProps<typeof Link>) => (
  <Link prefetch={false} {...props}>{children}</Link>
);

interface CountryCardProps {
  href: string;
  code: string;
  name: string;
}

/**
 * Modern country card with subtle gradient and hover effects.
 * Uses cozy theme colors (cpCoral, cpAmber, cpCream, cpCharcoal).
 */
export function CountryCard({ href, code, name }: CountryCardProps) {
  return (
    <OptimizedLink href={href} className="group block">
      <div className="relative rounded-2xl bg-card dark:bg-cpSurface/50 border border-border dark:border-cpAmber/20 p-4 transition-all duration-300 hover:shadow-lg hover:shadow-cpCoral/10 hover:-translate-y-1 hover:border-cpCoral/30 dark:hover:border-cpAmber/40 overflow-hidden">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-cpCoral/5 to-cpAmber/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <div className="relative flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Flag with gradient background */}
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-cpCoral/10 to-cpAmber/5 group-hover:scale-110 transition-transform duration-300">
              <span className="text-xl">{getCountryFlag(code)}</span>
            </div>
            <span className="font-semibold text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors">
              {name}
            </span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground dark:text-cpCream/60 group-hover:text-cpCoral group-hover:translate-x-1 transition-all duration-300" aria-hidden="true" />
        </div>
      </div>
    </OptimizedLink>
  );
}

/**
 * Convert ISO country code to flag emoji
 */
export function getCountryFlag(code: string): string {
  const codePoints = code
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
