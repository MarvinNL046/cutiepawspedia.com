/**
 * FaqSection - FAQ Display Component with Structured Data
 *
 * Displays FAQ content in an accessible accordion format.
 * Supports JSON-LD structured data output for SEO.
 */

"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FAQItem } from "@/lib/ai/faq";
import { buildFaqJsonLd } from "@/lib/seo/faqSchema";
import { JsonLd } from "./JsonLd";

// =============================================================================
// TYPES
// =============================================================================

export interface FaqSectionProps {
  /** List of FAQ items to display */
  faqs: FAQItem[];
  /** Section heading */
  heading?: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether to include JSON-LD structured data */
  includeJsonLd?: boolean;
  /** Default number of items to show initially */
  initiallyExpanded?: number;
  /** Visual variant */
  variant?: "default" | "compact" | "cards";
  /** Locale for accessibility labels */
  locale?: string;
}

// =============================================================================
// FAQ ITEM COMPONENT
// =============================================================================

interface FaqItemProps {
  faq: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  variant?: "default" | "compact" | "cards";
}

function FaqItem({ faq, isOpen, onToggle, index, variant = "default" }: FaqItemProps) {
  const itemId = `faq-${index}`;
  const answerId = `faq-answer-${index}`;

  if (variant === "compact") {
    return (
      <div className="border-b border-border dark:border-cpAmber/20 last:border-b-0">
        <button
          onClick={onToggle}
          className="w-full py-3 text-left flex items-center justify-between gap-3 group"
          aria-expanded={isOpen}
          aria-controls={answerId}
          id={itemId}
        >
          <span className="text-sm font-medium text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors">
            {faq.question}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground dark:text-cpCream/60 flex-shrink-0 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>
        <div
          id={answerId}
          role="region"
          aria-labelledby={itemId}
          className={cn(
            "overflow-hidden transition-all duration-200",
            isOpen ? "max-h-96 pb-3" : "max-h-0"
          )}
        >
          <div
            className="text-sm text-muted-foreground dark:text-cpCream/70 prose prose-sm dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: faq.answerHtml }}
          />
        </div>
      </div>
    );
  }

  if (variant === "cards") {
    return (
      <div className="bg-card dark:bg-cpSurface/50 rounded-lg border border-border dark:border-cpAmber/20 overflow-hidden">
        <button
          onClick={onToggle}
          className="w-full p-4 text-left flex items-start justify-between gap-3 group hover:bg-muted/50 dark:hover:bg-cpSurface/80 transition-colors"
          aria-expanded={isOpen}
          aria-controls={answerId}
          id={itemId}
        >
          <div className="flex items-start gap-3">
            <HelpCircle className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
            <span className="font-medium text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors">
              {faq.question}
            </span>
          </div>
          <ChevronDown
            className={cn(
              "h-5 w-5 text-muted-foreground dark:text-cpCream/60 flex-shrink-0 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>
        <div
          id={answerId}
          role="region"
          aria-labelledby={itemId}
          className={cn(
            "overflow-hidden transition-all duration-200",
            isOpen ? "max-h-[500px]" : "max-h-0"
          )}
        >
          <div className="px-4 pb-4 pt-0 pl-12">
            <div
              className="text-muted-foreground dark:text-cpCream/70 prose prose-slate dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: faq.answerHtml }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="border-b border-border dark:border-cpAmber/20 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-4 text-left flex items-center justify-between gap-4 group"
        aria-expanded={isOpen}
        aria-controls={answerId}
        id={itemId}
      >
        <span className="font-medium text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors">
          {faq.question}
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-muted-foreground dark:text-cpCream/60 flex-shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        id={answerId}
        role="region"
        aria-labelledby={itemId}
        className={cn(
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-[500px] pb-4" : "max-h-0"
        )}
      >
        <div
          className="text-muted-foreground dark:text-cpCream/70 prose prose-slate dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: faq.answerHtml }}
        />
      </div>
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function FaqSection({
  faqs,
  heading,
  className = "",
  includeJsonLd = true,
  initiallyExpanded = 0,
  variant = "default",
  locale = "en",
}: FaqSectionProps) {
  // Initialize expanded state - first N items open by default
  const [expandedItems, setExpandedItems] = useState<Set<number>>(() => {
    const initial = new Set<number>();
    for (let i = 0; i < Math.min(initiallyExpanded, faqs.length); i++) {
      initial.add(i);
    }
    return initial;
  });

  // Don't render if no FAQs
  if (!faqs || faqs.length === 0) {
    return null;
  }

  const toggleItem = (index: number) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedItems(new Set(faqs.map((_, i) => i)));
  };

  const collapseAll = () => {
    setExpandedItems(new Set());
  };

  // Build JSON-LD schema
  const jsonLd = includeJsonLd ? buildFaqJsonLd(faqs) : null;

  // Default heading based on locale
  const defaultHeading =
    locale === "nl"
      ? "Veelgestelde vragen"
      : locale === "de"
      ? "Häufig gestellte Fragen"
      : "Frequently Asked Questions";

  const displayHeading = heading || defaultHeading;

  return (
    <section className={cn("faq-section", className)} aria-label={displayHeading}>
      {/* JSON-LD Structured Data */}
      {jsonLd && <JsonLd data={jsonLd} />}

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground dark:text-cpCream">{displayHeading}</h2>
        {faqs.length > 2 && (
          <div className="flex gap-2 text-xs">
            <button
              onClick={expandAll}
              className="text-muted-foreground dark:text-cpCream/60 hover:text-cpCoral transition-colors"
              aria-label={locale === "nl" ? "Alles uitklappen" : "Expand all"}
            >
              {locale === "nl" ? "Alles uitklappen" : "Expand all"}
            </button>
            <span className="text-muted dark:text-cpCream/30">|</span>
            <button
              onClick={collapseAll}
              className="text-muted-foreground dark:text-cpCream/60 hover:text-cpCoral transition-colors"
              aria-label={locale === "nl" ? "Alles inklappen" : "Collapse all"}
            >
              {locale === "nl" ? "Alles inklappen" : "Collapse all"}
            </button>
          </div>
        )}
      </div>

      {/* FAQ Items */}
      <div
        className={cn(
          variant === "cards" ? "space-y-3" : "divide-y divide-border dark:divide-cpAmber/20 border-t border-border dark:border-cpAmber/20"
        )}
      >
        {faqs.map((faq, index) => (
          <FaqItem
            key={index}
            faq={faq}
            isOpen={expandedItems.has(index)}
            onToggle={() => toggleItem(index)}
            index={index}
            variant={variant}
          />
        ))}
      </div>
    </section>
  );
}

// =============================================================================
// COMPACT VARIANT EXPORT
// =============================================================================

interface FaqCompactProps {
  faqs: FAQItem[];
  heading?: string;
  className?: string;
  includeJsonLd?: boolean;
  locale?: string;
}

export function FaqCompact({
  faqs,
  heading,
  className = "",
  includeJsonLd = false,
  locale = "en",
}: FaqCompactProps) {
  return (
    <FaqSection
      faqs={faqs}
      heading={heading}
      className={className}
      includeJsonLd={includeJsonLd}
      variant="compact"
      locale={locale}
    />
  );
}

// =============================================================================
// STATIC (NO JS) VERSION
// =============================================================================

interface FaqStaticProps {
  faqs: FAQItem[];
  heading?: string;
  className?: string;
  includeJsonLd?: boolean;
  locale?: string;
}

/**
 * Static FAQ display using native HTML details/summary
 * Use this for server-rendered pages without JS interaction
 */
export function FaqStatic({
  faqs,
  heading,
  className = "",
  includeJsonLd = true,
  locale = "en",
}: FaqStaticProps) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  const jsonLd = includeJsonLd ? buildFaqJsonLd(faqs) : null;
  const defaultHeading =
    locale === "nl"
      ? "Veelgestelde vragen"
      : locale === "de"
      ? "Häufig gestellte Fragen"
      : "Frequently Asked Questions";

  return (
    <section className={cn("faq-section", className)} aria-label={heading || defaultHeading}>
      {jsonLd && <JsonLd data={jsonLd} />}

      {heading && <h2 className="text-lg font-semibold text-foreground dark:text-cpCream mb-4">{heading}</h2>}

      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group border border-border dark:border-cpAmber/20 rounded-lg overflow-hidden bg-card dark:bg-cpSurface/50"
          >
            <summary className="cursor-pointer p-4 font-medium text-foreground dark:text-cpCream hover:text-cpCoral transition-colors list-none flex items-center justify-between">
              {faq.question}
              <ChevronDown className="h-5 w-5 text-muted-foreground dark:text-cpCream/60 transition-transform group-open:rotate-180" />
            </summary>
            <div className="px-4 pb-4">
              <div
                className="text-muted-foreground dark:text-cpCream/70 prose prose-slate dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: faq.answerHtml }}
              />
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export default FaqSection;
