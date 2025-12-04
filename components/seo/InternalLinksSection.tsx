/**
 * InternalLinksSection - SEO internal linking component
 *
 * Displays contextual internal links to improve site navigation and SEO.
 * Supports multiple display variants and grouped/flat layouts.
 */

import Link from "next/link";
import { ChevronRight, MapPin, Tag, Building2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type {
  InternalLinkItem,
  InternalLinkGroup,
  InternalLinksResult,
} from "@/lib/internalLinks/types";

export type InternalLinksVariant =
  | "default"
  | "compact"
  | "cards"
  | "badges"
  | "list";

interface InternalLinksSectionProps {
  /** Title for the section */
  title?: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Flat list of links */
  links?: InternalLinkItem[];
  /** Grouped links (will render multiple sections) */
  groups?: InternalLinkGroup[];
  /** Full result from getInternalLinksForPage */
  result?: InternalLinksResult;
  /** Visual variant */
  variant?: InternalLinksVariant;
  /** Additional CSS classes */
  className?: string;
  /** Maximum links to display per group */
  maxPerGroup?: number;
  /** Whether to show descriptions */
  showDescriptions?: boolean;
  /** Locale for text */
  locale?: string;
}

/**
 * Get icon for link type
 */
function getLinkIcon(type: InternalLinkItem["type"]) {
  switch (type) {
    case "city_category":
    case "place_city_category":
      return <Tag className="h-4 w-4 text-cpPink" />;
    case "category_city":
    case "country_city":
    case "place_city":
      return <MapPin className="h-4 w-4 text-cpAqua" />;
    case "place_related":
      return <Building2 className="h-4 w-4 text-cpYellow" />;
    default:
      return <ChevronRight className="h-4 w-4 text-slate-400" />;
  }
}

/**
 * Single link item component
 */
function LinkItem({
  link,
  showDescription = true,
  variant = "default",
}: {
  link: InternalLinkItem;
  showDescription?: boolean;
  variant?: InternalLinksVariant;
}) {
  if (variant === "badges") {
    return (
      <Link href={link.href}>
        <Badge
          variant="outline"
          className="cursor-pointer hover:bg-cpPink/10 hover:border-cpPink transition-colors"
        >
          {link.label}
        </Badge>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={link.href}
        className="text-sm text-slate-600 hover:text-cpPink transition-colors flex items-center gap-1"
      >
        <ChevronRight className="h-3 w-3" />
        {link.label}
      </Link>
    );
  }

  return (
    <Link
      href={link.href}
      className="group flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
    >
      <span className="mt-0.5">{getLinkIcon(link.type)}</span>
      <div className="flex-1 min-w-0">
        <span className="font-medium text-slate-900 group-hover:text-cpPink transition-colors">
          {link.label}
        </span>
        {showDescription && link.description && (
          <p className="text-xs text-muted-foreground mt-0.5 truncate">
            {link.description}
          </p>
        )}
      </div>
      <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-cpPink transition-colors mt-1" />
    </Link>
  );
}

/**
 * Render a group of links
 */
function LinkGroup({
  group,
  variant = "default",
  maxDisplay = 6,
  showDescriptions = true,
}: {
  group: InternalLinkGroup;
  variant?: InternalLinksVariant;
  maxDisplay?: number;
  showDescriptions?: boolean;
}) {
  const displayLinks = group.links.slice(0, group.maxDisplay || maxDisplay);

  if (variant === "cards") {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">{group.title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid gap-1">
            {displayLinks.map((link, index) => (
              <LinkItem
                key={`${link.href}-${index}`}
                link={link}
                showDescription={showDescriptions}
                variant="default"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === "badges") {
    return (
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3">
          {group.title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {displayLinks.map((link, index) => (
            <LinkItem
              key={`${link.href}-${index}`}
              link={link}
              variant="badges"
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-2">
          {group.title}
        </h3>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {displayLinks.map((link, index) => (
            <LinkItem
              key={`${link.href}-${index}`}
              link={link}
              variant="compact"
            />
          ))}
        </div>
      </div>
    );
  }

  // Default list variant
  return (
    <div>
      <h3 className="text-base font-semibold text-slate-900 mb-3">
        {group.title}
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-1">
        {displayLinks.map((link, index) => (
          <LinkItem
            key={`${link.href}-${index}`}
            link={link}
            showDescription={showDescriptions}
            variant="default"
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Main InternalLinksSection component
 */
export function InternalLinksSection({
  title,
  subtitle,
  links,
  groups,
  result,
  variant = "default",
  className = "",
  maxPerGroup = 6,
  showDescriptions = true,
}: InternalLinksSectionProps) {
  // Use result if provided, otherwise use links/groups
  const displayGroups = result?.groups || groups || [];
  const flatLinks = result?.links || links || [];

  // If no groups but have flat links, create a single group
  const effectiveGroups =
    displayGroups.length > 0
      ? displayGroups
      : flatLinks.length > 0
      ? [{ title: title || "", links: flatLinks }]
      : [];

  // Don't render if no links
  if (effectiveGroups.length === 0 || effectiveGroups.every((g) => g.links.length === 0)) {
    return null;
  }

  return (
    <section className={`${className}`}>
      {/* Section header (only if title provided and not using result) */}
      {title && !result && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
      )}

      {/* Render groups */}
      <div className={variant === "cards" ? "grid md:grid-cols-2 gap-4" : "space-y-6"}>
        {effectiveGroups.map((group, index) => (
          <LinkGroup
            key={`group-${index}`}
            group={group}
            variant={variant}
            maxDisplay={maxPerGroup}
            showDescriptions={showDescriptions}
          />
        ))}
      </div>
    </section>
  );
}

/**
 * Compact variant for sidebars and small spaces
 */
interface InternalLinksCompactProps {
  title?: string;
  links: InternalLinkItem[];
  className?: string;
  maxDisplay?: number;
}

export function InternalLinksCompact({
  title,
  links,
  className = "",
  maxDisplay = 5,
}: InternalLinksCompactProps) {
  if (links.length === 0) return null;

  const displayLinks = links.slice(0, maxDisplay);

  return (
    <div className={`bg-slate-50 rounded-lg p-4 ${className}`}>
      {title && (
        <h3 className="text-sm font-semibold text-slate-700 mb-3">{title}</h3>
      )}
      <div className="space-y-2">
        {displayLinks.map((link, index) => (
          <Link
            key={`${link.href}-${index}`}
            href={link.href}
            className="text-sm text-slate-600 hover:text-cpPink transition-colors flex items-center gap-2"
          >
            <ChevronRight className="h-3 w-3" />
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

/**
 * Badge-style links for inline usage
 */
interface InternalLinksBadgesProps {
  links: InternalLinkItem[];
  className?: string;
  maxDisplay?: number;
}

export function InternalLinksBadges({
  links,
  className = "",
  maxDisplay = 8,
}: InternalLinksBadgesProps) {
  if (links.length === 0) return null;

  const displayLinks = links.slice(0, maxDisplay);

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {displayLinks.map((link, index) => (
        <Link key={`${link.href}-${index}`} href={link.href}>
          <Badge
            variant="outline"
            className="cursor-pointer hover:bg-cpPink/10 hover:border-cpPink transition-colors"
          >
            {link.label}
          </Badge>
        </Link>
      ))}
    </div>
  );
}

export default InternalLinksSection;
