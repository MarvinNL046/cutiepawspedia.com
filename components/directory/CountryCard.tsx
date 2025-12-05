import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface CountryCardProps {
  href: string;
  code: string;
  name: string;
}

/**
 * Modern country card with subtle gradient and hover effects.
 * Inspired by postforge.ai and seogrove.ai design patterns.
 */
export function CountryCard({ href, code, name }: CountryCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="relative rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 p-4 transition-all duration-300 hover:shadow-lg hover:shadow-cpAqua/10 hover:-translate-y-1 hover:border-cpAqua/30 overflow-hidden">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-cpAqua/5 to-cpPink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <div className="relative flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Flag with gradient background */}
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-cpAqua/10 to-cpAqua/5 group-hover:scale-110 transition-transform duration-300">
              <span className="text-xl">{getCountryFlag(code)}</span>
            </div>
            <span className="font-semibold text-foreground group-hover:text-cpAqua transition-colors">
              {name}
            </span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-cpAqua group-hover:translate-x-1 transition-all duration-300" aria-hidden="true" />
        </div>
      </div>
    </Link>
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
