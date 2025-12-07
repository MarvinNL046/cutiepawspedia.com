import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Map } from "lucide-react";

interface ProvinceCardProps {
  href: string;
  name: string;
  code?: string | null;
  cityCount?: number;
  placeCount?: number;
}

/**
 * Consistent province/state/region card used across country pages.
 * Uses standardized styling: rounded-xl, shadow-sm hover:shadow-md, cpAqua accent.
 */
export function ProvinceCard({ href, name, code, cityCount, placeCount }: ProvinceCardProps) {
  return (
    <Link href={href} className="group block">
      <Card className="hover-lift hover:shadow-md hover:border-cpAqua/50 h-full">
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Map className="h-4 w-4 text-muted-foreground group-hover:text-cpAqua transition-colors" aria-hidden="true" />
              <div className="flex flex-col">
                <span className="font-medium text-foreground group-hover:text-cpAqua transition-colors">
                  {name}
                </span>
                {(cityCount !== undefined || code) && (
                  <span className="text-xs text-muted-foreground">
                    {code && <span className="font-mono">{code}</span>}
                    {code && cityCount !== undefined && " · "}
                    {cityCount !== undefined && `${cityCount} ${cityCount === 1 ? "city" : "cities"}`}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {placeCount !== undefined && placeCount > 0 && (
                <span className="text-xs text-muted-foreground bg-cpAqua/10 px-2 py-0.5 rounded-full">
                  {placeCount}
                </span>
              )}
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-cpAqua group-hover:translate-x-0.5 transition-all duration-200" aria-hidden="true" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
