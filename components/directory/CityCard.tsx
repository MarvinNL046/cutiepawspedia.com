import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, MapPin } from "lucide-react";

interface CityCardProps {
  href: string;
  name: string;
  placeCount?: number;
}

/**
 * Consistent city card used across country and navigation pages.
 * Uses standardized styling: rounded-xl, shadow-sm hover:shadow-md, cpPink accent.
 */
export function CityCard({ href, name, placeCount }: CityCardProps) {
  return (
    <Link href={href} className="group block">
      <Card className="hover-lift hover:shadow-md hover:border-cpPink/50 h-full">
        <CardContent className="p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-muted-foreground group-hover:text-cpPink transition-colors" aria-hidden="true" />
            <span className="font-medium text-foreground group-hover:text-cpPink transition-colors">
              {name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {placeCount !== undefined && placeCount > 0 && (
              <span className="text-xs text-muted-foreground">{placeCount}</span>
            )}
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-cpPink group-hover:translate-x-0.5 transition-all duration-200" aria-hidden="true" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
