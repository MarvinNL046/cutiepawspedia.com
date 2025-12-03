/**
 * FAQ JSON-LD Schema Builder
 *
 * Generates FAQPage structured data for search engines.
 * https://schema.org/FAQPage
 */

import type { FAQItem } from "@/lib/ai/faq";

/**
 * Build FAQPage JSON-LD schema for FAQ content
 * @see https://developers.google.com/search/docs/appearance/structured-data/faqpage
 */
export function buildFaqJsonLd(faqs: FAQItem[]): object | null {
  // Need at least 2 FAQs for valid FAQPage schema
  if (!faqs || faqs.length < 2) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: stripHtmlTags(faq.answerHtml),
      },
    })),
  };
}

/**
 * Build FAQPage JSON-LD with rich HTML answers
 * Use this when you want to preserve formatting in the answer
 */
export function buildFaqJsonLdWithHtml(faqs: FAQItem[]): object | null {
  if (!faqs || faqs.length < 2) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        // Google allows limited HTML in answers
        text: faq.answerHtml,
      },
    })),
  };
}

/**
 * Strip HTML tags from string for plain text answer
 */
function stripHtmlTags(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Backwards-compatible alias for buildFaqJsonLd
 */
export function faqPageSchema(faqs: FAQItem[]): object | null {
  return buildFaqJsonLd(faqs);
}
