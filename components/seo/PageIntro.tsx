/**
 * PageIntro - Reusable SEO intro content component
 *
 * Displays AI-generated intro text with optional secondary text and bullets.
 * Supports multiple styling variants for different page types.
 */

import { CheckCircle2, Info, TrendingUp, Award, Star } from "lucide-react";
import type { AiContentResult } from "@/lib/seo";
import { EditorialByline } from "./AuthorByline";

export type PageIntroVariant =
  | "default"
  | "pink"
  | "yellow"
  | "aqua"
  | "gradient"
  | "white"
  | "muted";

interface PageIntroProps {
  /** AI-generated content result */
  content: AiContentResult;
  /** Visual variant for styling */
  variant?: PageIntroVariant;
  /** Optional icon to display */
  icon?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Whether to show bullets (default: true if present) */
  showBullets?: boolean;
  /** Whether to show CTA (default: true if present) */
  showCta?: boolean;
  /** Custom bullet icon */
  bulletIcon?: React.ReactNode;
  /** Optional additional note text */
  note?: string;
  /** Locale for text direction and formatting */
  locale?: string;
  /** Show editorial byline for E-E-A-T (default: true) */
  showEditorialByline?: boolean;
  /** Last updated date for content freshness signal */
  updatedAt?: Date | string;
}

const variantStyles: Record<PageIntroVariant, string> = {
  default: "bg-muted dark:bg-cpSurface/50 border-b border-border dark:border-cpAmber/20",
  pink: "bg-cpCoral/10 dark:bg-cpCoral/5 border-b border-cpCoral/20 dark:border-cpCoral/10",
  yellow: "bg-cpAmber/10 dark:bg-cpAmber/5 border-b border-cpAmber/20 dark:border-cpAmber/10",
  aqua: "bg-cpCoral/10 dark:bg-cpCoral/5 border-b border-cpCoral/20 dark:border-cpCoral/10",
  gradient: "bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent dark:to-transparent border-b border-border dark:border-cpAmber/20",
  white: "bg-card dark:bg-cpSurface/50 border-b border-border dark:border-cpAmber/20",
  muted: "bg-muted/50 dark:bg-cpSurface/50 border-b border-border dark:border-cpAmber/20",
};

const defaultIcons: Record<PageIntroVariant, React.ReactNode> = {
  default: <Info className="h-4 w-4 text-muted-foreground dark:text-cpCream/60" />,
  pink: <Star className="h-4 w-4 text-cpCoral" />,
  yellow: <Award className="h-4 w-4 text-cpAmber" />,
  aqua: <TrendingUp className="h-4 w-4 text-cpCoral" />,
  gradient: <Star className="h-4 w-4 text-cpCoral" />,
  white: <Info className="h-4 w-4 text-muted-foreground dark:text-cpCream/60" />,
  muted: <Info className="h-4 w-4 text-muted-foreground dark:text-cpCream/60" />,
};

/**
 * Reusable component for displaying AI-generated page intro content
 */
export function PageIntro({
  content,
  variant = "default",
  icon,
  className = "",
  showBullets = true,
  showCta = true,
  bulletIcon,
  note,
  locale,
  showEditorialByline = true,
  updatedAt,
}: PageIntroProps) {
  const { intro, secondary, bullets, cta } = content;

  // Don't render if no content
  if (!intro && !secondary && (!bullets || bullets.length === 0)) {
    return null;
  }

  const displayIcon = icon ?? defaultIcons[variant];
  const BulletIcon = bulletIcon ?? <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0" />;

  return (
    <section className={`${variantStyles[variant]} ${className}`}>
      <div className="container mx-auto max-w-6xl px-4 py-6">
        {/* Main intro text */}
        {intro && (
          <p className="text-foreground dark:text-cpCream/90 mb-2 leading-relaxed">
            {intro}
          </p>
        )}

        {/* Secondary text */}
        {secondary && (
          <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
            {secondary}
          </p>
        )}

        {/* Bullet points */}
        {showBullets && bullets && bullets.length > 0 && (
          <ul className="space-y-1.5 mt-4" role="list">
            {bullets.map((bullet, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70"
              >
                {BulletIcon}
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Note with icon */}
        {note && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-cpCream/70 mt-3">
            {displayIcon}
            <span>{note}</span>
          </div>
        )}

        {/* Call to action */}
        {showCta && cta && (
          <p className="text-sm font-medium text-cpCoral mt-4">
            {cta}
          </p>
        )}

        {/* Editorial byline for E-E-A-T trust signals */}
        {showEditorialByline && (
          <EditorialByline
            updatedAt={updatedAt}
            locale={locale}
            className="mt-4 pt-3 border-t border-border/50 dark:border-cpAmber/10"
          />
        )}
      </div>
    </section>
  );
}

/**
 * Compact inline version of PageIntro for smaller spaces
 */
interface PageIntroInlineProps {
  intro: string;
  secondary?: string;
  className?: string;
}

export function PageIntroInline({
  intro,
  secondary,
  className = "",
}: PageIntroInlineProps) {
  if (!intro) return null;

  return (
    <div className={`text-sm ${className}`}>
      <p className="text-muted-foreground dark:text-cpCream/70">{intro}</p>
      {secondary && (
        <p className="text-muted-foreground dark:text-cpCream/60 mt-1">{secondary}</p>
      )}
    </div>
  );
}

/**
 * Card-style intro for featured sections
 */
interface PageIntroCardProps {
  content: AiContentResult;
  title?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function PageIntroCard({
  content,
  title,
  icon,
  className = "",
}: PageIntroCardProps) {
  const { intro, secondary, bullets } = content;

  if (!intro) return null;

  return (
    <div className={`bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 shadow-sm ${className}`}>
      {(title || icon) && (
        <div className="flex items-center gap-2 mb-3">
          {icon}
          {title && (
            <h3 className="font-semibold text-foreground dark:text-cpCream">{title}</h3>
          )}
        </div>
      )}
      <p className="text-muted-foreground dark:text-cpCream/70">{intro}</p>
      {secondary && (
        <p className="text-sm text-muted-foreground dark:text-cpCream/60 mt-2">{secondary}</p>
      )}
      {bullets && bullets.length > 0 && (
        <ul className="mt-4 space-y-2">
          {bullets.map((bullet, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70"
            >
              <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PageIntro;
