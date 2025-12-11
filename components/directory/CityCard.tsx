import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, MapPin } from "lucide-react";

// Wrapper to disable prefetch for performance (prevents 300+ RSC requests)
const OptimizedLink = ({ children, ...props }: React.ComponentProps<typeof Link>) => (
  <Link prefetch={false} {...props}>{children}</Link>
);

interface CityCardProps {
  href: string;
  name: string;
  placeCount?: number;
}

/**
 * Consistent city card used across country and navigation pages.
 * Uses standardized styling: rounded-xl, shadow-sm hover:shadow-md, cpCoral accent.
 */
export function CityCard({ href, name, placeCount }: CityCardProps) {
  return (
    <OptimizedLink href={href} className="group block">
      <Card className="hover-lift hover:shadow-md hover:border-cpCoral/50 h-full">
        <CardContent className="p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-muted-foreground group-hover:text-cpCoral transition-colors" aria-hidden="true" />
            <span className="font-medium text-foreground group-hover:text-cpCoral transition-colors">
              {name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {placeCount !== undefined && placeCount > 0 && (
              <span className="text-xs text-muted-foreground">{placeCount}</span>
            )}
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-cpCoral group-hover:translate-x-0.5 transition-all duration-200" aria-hidden="true" />
          </div>
        </CardContent>
      </Card>
    </OptimizedLink>
  );
}
