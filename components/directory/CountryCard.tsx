import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

interface CountryCardProps {
  href: string;
  code: string;
  name: string;
}

/**
 * Consistent country card used across home and navigation.
 * Uses standardized styling: rounded-xl, shadow-sm hover:shadow-md, cpAqua accent.
 */
export function CountryCard({ href, code, name }: CountryCardProps) {
  return (
    <Link href={href} className="group block">
      <Card className="hover-lift hover:shadow-md hover:border-cpAqua/50">
        <CardContent className="p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
              {getCountryFlag(code)}
            </span>
            <span className="font-medium text-foreground group-hover:text-cpAqua transition-colors">
              {name}
            </span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-cpAqua group-hover:translate-x-0.5 transition-all duration-200" aria-hidden="true" />
        </CardContent>
      </Card>
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
