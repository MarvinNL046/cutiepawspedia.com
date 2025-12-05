/**
 * PageIntro - Reusable SEO intro content component
 *
 * Displays AI-generated intro text with optional secondary text and bullets.
 * Supports multiple styling variants for different page types.
 */

import { CheckCircle2, Info, TrendingUp, Award, Star } from "lucide-react";
import type { AiContentResult } from "@/lib/seo";

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
}

const variantStyles: Record<PageIntroVariant, string> = {
  default: "bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700",
  pink: "bg-cpPink/10 dark:bg-cpPink/5 border-b border-cpPink/20 dark:border-cpPink/10",
  yellow: "bg-cpYellow/10 dark:bg-cpYellow/5 border-b border-cpYellow/20 dark:border-cpYellow/10",
  aqua: "bg-cpAqua/10 dark:bg-cpAqua/5 border-b border-cpAqua/20 dark:border-cpAqua/10",
  gradient: "bg-gradient-to-b from-cpPink/10 via-cpYellow/5 to-transparent dark:from-cpPink/5 dark:via-transparent dark:to-transparent border-b border-slate-200/50 dark:border-slate-700/50",
  white: "bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700",
  muted: "bg-muted/50 dark:bg-slate-800/50 border-b border-border",
};

const defaultIcons: Record<PageIntroVariant, React.ReactNode> = {
  default: <Info className="h-4 w-4 text-slate-500" />,
  pink: <Star className="h-4 w-4 text-cpPink" />,
  yellow: <Award className="h-4 w-4 text-cpYellow" />,
  aqua: <TrendingUp className="h-4 w-4 text-cpAqua" />,
  gradient: <Star className="h-4 w-4 text-cpPink" />,
  white: <Info className="h-4 w-4 text-slate-500" />,
  muted: <Info className="h-4 w-4 text-muted-foreground" />,
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
}: PageIntroProps) {
  const { intro, secondary, bullets, cta } = content;

  // Don't render if no content
  if (!intro && !secondary && (!bullets || bullets.length === 0)) {
    return null;
  }

  const displayIcon = icon ?? defaultIcons[variant];
  const BulletIcon = bulletIcon ?? <CheckCircle2 className="h-4 w-4 text-cpPink flex-shrink-0" />;

  return (
    <section className={`${variantStyles[variant]} ${className}`}>
      <div className="container mx-auto max-w-6xl px-4 py-6">
        {/* Main intro text */}
        {intro && (
          <p className="text-slate-700 dark:text-slate-300 mb-2 leading-relaxed">
            {intro}
          </p>
        )}

        {/* Secondary text */}
        {secondary && (
          <p className="text-sm text-muted-foreground mb-3">
            {secondary}
          </p>
        )}

        {/* Bullet points */}
        {showBullets && bullets && bullets.length > 0 && (
          <ul className="space-y-1.5 mt-4" role="list">
            {bullets.map((bullet, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
              >
                {BulletIcon}
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Note with icon */}
        {note && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
            {displayIcon}
            <span>{note}</span>
          </div>
        )}

        {/* Call to action */}
        {showCta && cta && (
          <p className="text-sm font-medium text-cpPink mt-4">
            {cta}
          </p>
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
      <p className="text-slate-600 dark:text-slate-400">{intro}</p>
      {secondary && (
        <p className="text-muted-foreground mt-1">{secondary}</p>
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
    <div className={`bg-white rounded-xl border p-6 shadow-sm ${className}`}>
      {(title || icon) && (
        <div className="flex items-center gap-2 mb-3">
          {icon}
          {title && (
            <h3 className="font-semibold text-cpDark">{title}</h3>
          )}
        </div>
      )}
      <p className="text-slate-600">{intro}</p>
      {secondary && (
        <p className="text-sm text-muted-foreground mt-2">{secondary}</p>
      )}
      {bullets && bullets.length > 0 && (
        <ul className="mt-4 space-y-2">
          {bullets.map((bullet, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-slate-600"
            >
              <CheckCircle2 className="h-4 w-4 text-cpPink flex-shrink-0 mt-0.5" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PageIntro;
