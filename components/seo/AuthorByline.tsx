/**
 * AuthorByline - E-E-A-T Author Attribution Component
 *
 * Displays author information with credentials for SEO and trust signals.
 * Supports both editorial content and user-generated reviews.
 */

import { GraduationCap, BadgeCheck, Calendar, Clock, PenLine } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface Author {
  name: string;
  title?: string;
  avatar?: string;
  bio?: string;
  credentials?: string[];
  expertiseAreas?: string[];
  yearsExperience?: number;
  isVerified?: boolean;
  profileUrl?: string;
}

interface AuthorBylineProps {
  /** Author information */
  author: Author;
  /** Publication date */
  publishedAt?: Date | string;
  /** Last updated date */
  updatedAt?: Date | string;
  /** Locale for formatting */
  locale?: string;
  /** Display variant */
  variant?: "default" | "compact" | "expanded";
  /** Additional CSS classes */
  className?: string;
}

/**
 * Format date for display
 */
function formatDate(date: Date | string, locale: string = "en"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(locale === "nl" ? "nl-NL" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * AuthorByline component for E-E-A-T signals
 */
export function AuthorByline({
  author,
  publishedAt,
  updatedAt,
  locale = "en",
  variant = "default",
  className = "",
}: AuthorBylineProps) {
  const isNl = locale === "nl";
  const initial = author.name.charAt(0).toUpperCase();
  const hasCredentials = author.credentials && author.credentials.length > 0;

  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-2 text-sm text-muted-foreground ${className}`}>
        <PenLine className="h-3.5 w-3.5" />
        <span>
          {isNl ? "Door" : "By"}{" "}
          <span className="font-medium text-foreground">{author.name}</span>
          {author.title && (
            <span className="hidden sm:inline">, {author.title}</span>
          )}
        </span>
        {author.isVerified && (
          <BadgeCheck className="h-3.5 w-3.5 text-emerald-500" />
        )}
        {updatedAt && (
          <>
            <span className="text-muted-foreground/50">·</span>
            <span>
              {isNl ? "Bijgewerkt" : "Updated"} {formatDate(updatedAt, locale)}
            </span>
          </>
        )}
      </div>
    );
  }

  if (variant === "expanded") {
    return (
      <div className={`border rounded-xl p-4 bg-muted/30 dark:bg-cpSurface/30 ${className}`}>
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 border-2 border-background">
            {author.avatar && (
              <AvatarImage src={author.avatar} alt={author.name} />
            )}
            <AvatarFallback className="bg-cpCoral/20 text-cpCoral text-lg font-semibold">
              {initial}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-semibold text-foreground">{author.name}</h4>
              {author.isVerified && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge
                        variant="secondary"
                        className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 gap-1"
                      >
                        <BadgeCheck className="h-3 w-3" />
                        {isNl ? "Geverifieerd" : "Verified"}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      {isNl
                        ? "Geverifieerde expert met gecontroleerde referenties"
                        : "Verified expert with confirmed credentials"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            {author.title && (
              <p className="text-sm text-muted-foreground mt-0.5">
                {author.title}
                {author.yearsExperience && author.yearsExperience > 0 && (
                  <span> · {author.yearsExperience}+ {isNl ? "jaar ervaring" : "years experience"}</span>
                )}
              </p>
            )}
            {author.bio && (
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                {author.bio}
              </p>
            )}
            {hasCredentials && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {author.credentials!.slice(0, 3).map((cred, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="text-xs bg-background/50"
                  >
                    <GraduationCap className="h-3 w-3 mr-1" />
                    {cred}
                  </Badge>
                ))}
              </div>
            )}
            {/* Date info */}
            {(publishedAt || updatedAt) && (
              <div className="flex items-center gap-3 mt-3 pt-3 border-t text-xs text-muted-foreground">
                {publishedAt && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{isNl ? "Gepubliceerd" : "Published"}: {formatDate(publishedAt, locale)}</span>
                  </div>
                )}
                {updatedAt && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{isNl ? "Bijgewerkt" : "Updated"}: {formatDate(updatedAt, locale)}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Avatar className="h-10 w-10">
        {author.avatar && (
          <AvatarImage src={author.avatar} alt={author.name} />
        )}
        <AvatarFallback className="bg-cpCoral/20 text-cpCoral">
          {initial}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-sm">{author.name}</span>
          {author.isVerified && (
            <Badge
              variant="secondary"
              className="text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 gap-1"
            >
              <BadgeCheck className="h-3 w-3" />
              {isNl ? "Expert" : "Expert"}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {author.title && <span>{author.title}</span>}
          {author.title && updatedAt && <span>·</span>}
          {updatedAt && (
            <span>{isNl ? "Bijgewerkt" : "Updated"} {formatDate(updatedAt, locale)}</span>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Editorial team byline for AI-generated content
 */
interface EditorialBylineProps {
  updatedAt?: Date | string;
  locale?: string;
  className?: string;
}

export function EditorialByline({
  updatedAt,
  locale = "en",
  className = "",
}: EditorialBylineProps) {
  const isNl = locale === "nl";

  return (
    <div className={`flex items-center gap-2 text-sm text-muted-foreground ${className}`}>
      <div className="flex -space-x-2">
        <Avatar className="h-6 w-6 border-2 border-background">
          <AvatarFallback className="bg-cpCoral/20 text-cpCoral text-xs">C</AvatarFallback>
        </Avatar>
        <Avatar className="h-6 w-6 border-2 border-background">
          <AvatarFallback className="bg-cpAmber/20 text-cpAmber text-xs">P</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <span className="font-medium text-foreground">
          {isNl ? "CutiePawsPedia Redactie" : "CutiePawsPedia Editorial"}
        </span>
        <span className="mx-1">·</span>
        <span>
          {isNl ? "Geverifieerde Informatie" : "Verified Information"}
        </span>
        {updatedAt && (
          <>
            <span className="mx-1">·</span>
            <span>{formatDate(updatedAt, locale)}</span>
          </>
        )}
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <BadgeCheck className="h-4 w-4 text-emerald-500" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p className="text-sm">
              {isNl
                ? "Deze informatie is gecontroleerd door ons redactieteam van huisdierexperts."
                : "This information has been reviewed by our editorial team of pet care experts."}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

/**
 * Source citation component for E-E-A-T
 */
interface SourceCitationProps {
  sources: {
    name: string;
    url?: string;
    type?: "official" | "research" | "expert" | "community";
  }[];
  locale?: string;
  className?: string;
}

export function SourceCitation({
  sources,
  locale = "en",
  className = "",
}: SourceCitationProps) {
  const isNl = locale === "nl";

  if (!sources || sources.length === 0) return null;

  const typeLabels = {
    official: isNl ? "Officieel" : "Official",
    research: isNl ? "Onderzoek" : "Research",
    expert: isNl ? "Expert" : "Expert",
    community: isNl ? "Community" : "Community",
  };

  const typeColors = {
    official: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    research: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    expert: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    community: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  };

  return (
    <div className={`border-t pt-4 mt-4 ${className}`}>
      <h4 className="text-sm font-medium text-muted-foreground mb-2">
        {isNl ? "Bronnen" : "Sources"}
      </h4>
      <ul className="space-y-1.5">
        {sources.map((source, i) => (
          <li key={i} className="flex items-center gap-2 text-sm">
            {source.type && (
              <Badge variant="secondary" className={`text-xs ${typeColors[source.type]}`}>
                {typeLabels[source.type]}
              </Badge>
            )}
            {source.url ? (
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cpCoral hover:underline"
              >
                {source.name}
              </a>
            ) : (
              <span className="text-muted-foreground">{source.name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AuthorByline;
