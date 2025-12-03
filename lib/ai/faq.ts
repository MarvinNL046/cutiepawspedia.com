/**
 * FAQ Utilities
 *
 * Helpers for extracting and generating FAQ content.
 */

import type { AiContentStructure } from "@/db/schema/ai";

/**
 * FAQ Item structure
 */
export interface FAQItem {
  question: string;
  answerHtml: string;
}

/**
 * Extract FAQs from AI content structure
 * Safely parses and returns FAQ items
 */
export function extractFaqsFromAiContent(content: AiContentStructure | null | undefined): FAQItem[] {
  if (!content || !content.faqs || !Array.isArray(content.faqs)) {
    return [];
  }

  return content.faqs
    .filter((faq) => faq && typeof faq.question === "string" && typeof faq.answer === "string")
    .map((faq) => ({
      question: faq.question.trim(),
      // Wrap answer in paragraph if not already HTML
      answerHtml: wrapInParagraph(faq.answer.trim()),
    }));
}

/**
 * Wrap text in paragraph tags if not already wrapped
 */
function wrapInParagraph(text: string): string {
  // If already starts with HTML tag, return as-is
  if (text.startsWith("<p>") || text.startsWith("<") && text.includes(">")) {
    return text;
  }
  return `<p>${text}</p>`;
}

/**
 * Generate default FAQs for different page types
 * Used as fallback when AI-generated FAQs are not available
 */
export function generateDefaultFaqs(params: {
  type: "city" | "category" | "place" | "combo" | "best" | "top" | "country";
  locale: string;
  placeName?: string;
  categoryName?: string;
  cityName?: string;
  countryName?: string;
}): FAQItem[] {
  const { type, locale, placeName, categoryName, cityName, countryName } = params;

  const isNl = locale === "nl";

  // City page FAQs
  if (type === "city" && cityName) {
    if (isNl) {
      return [
        {
          question: `Waar vind ik dierenartsen in ${cityName}?`,
          answerHtml: `<p>Op CutiePawsPedia vindt u een overzicht van dierenartsen in ${cityName}. U kunt filteren op locatie en beoordelingen om de beste dierenarts voor uw huisdier te vinden.</p>`,
        },
        {
          question: `Welke huisdierservices zijn beschikbaar in ${cityName}?`,
          answerHtml: `<p>${cityName} biedt diverse huisdierservices zoals dierenartsen, trimsalons, hondenhotels, dierenwinkels en meer. Bekijk ons overzicht voor de complete lijst.</p>`,
        },
        {
          question: `Hoe kies ik de juiste huisdierservice in ${cityName}?`,
          answerHtml: `<p>Bekijk de beoordelingen en recensies van andere huisdiereigenaren. Let op locatie, openingstijden en aangeboden diensten die passen bij de behoeften van uw huisdier.</p>`,
        },
      ];
    }
    return [
      {
        question: `Where can I find pet services in ${cityName}?`,
        answerHtml: `<p>CutiePawsPedia provides a comprehensive directory of pet services in ${cityName}. You can filter by category and ratings to find the best services for your pet.</p>`,
      },
      {
        question: `What types of pet services are available in ${cityName}?`,
        answerHtml: `<p>${cityName} offers various pet services including veterinarians, groomers, pet hotels, pet stores, and more. Browse our directory for the complete list.</p>`,
      },
      {
        question: `How do I choose the right pet service in ${cityName}?`,
        answerHtml: `<p>Check reviews and ratings from other pet owners. Consider location, opening hours, and the specific services offered that match your pet's needs.</p>`,
      },
    ];
  }

  // Category page FAQs
  if ((type === "category" || type === "combo") && categoryName) {
    const location = cityName || countryName || "";
    if (isNl) {
      return [
        {
          question: `Hoeveel ${categoryName.toLowerCase()} zijn er in ${location}?`,
          answerHtml: `<p>Op CutiePawsPedia vindt u een actueel overzicht van alle ${categoryName.toLowerCase()} in ${location}. Het aantal kan variëren naarmate er nieuwe bedrijven worden toegevoegd.</p>`,
        },
        {
          question: `Hoe vind ik de beste ${categoryName.toLowerCase()} in ${location}?`,
          answerHtml: `<p>Bekijk onze "Beste" pagina voor de hoogst beoordeelde ${categoryName.toLowerCase()}. U kunt ook filteren op locatie en beoordelingen lezen van andere huisdiereigenaren.</p>`,
        },
        {
          question: `Wat moet ik weten bij het kiezen van ${categoryName.toLowerCase()}?`,
          answerHtml: `<p>Let op ervaring, kwalificaties, recensies en de specifieke diensten die worden aangeboden. Neem contact op om vragen te stellen over uw specifieke behoeften.</p>`,
        },
      ];
    }
    return [
      {
        question: `How many ${categoryName.toLowerCase()} are in ${location}?`,
        answerHtml: `<p>CutiePawsPedia provides an up-to-date directory of ${categoryName.toLowerCase()} in ${location}. The number may vary as new businesses are added.</p>`,
      },
      {
        question: `How do I find the best ${categoryName.toLowerCase()} in ${location}?`,
        answerHtml: `<p>Check our "Best" page for the highest-rated ${categoryName.toLowerCase()}. You can also filter by location and read reviews from other pet owners.</p>`,
      },
      {
        question: `What should I know when choosing ${categoryName.toLowerCase()}?`,
        answerHtml: `<p>Consider experience, qualifications, reviews, and the specific services offered. Contact them directly to ask questions about your specific needs.</p>`,
      },
    ];
  }

  // Place page FAQs
  if (type === "place" && placeName) {
    if (isNl) {
      return [
        {
          question: `Hoe kan ik contact opnemen met ${placeName}?`,
          answerHtml: `<p>U vindt de contactgegevens van ${placeName} op deze pagina, inclusief telefoonnummer en indien beschikbaar het e-mailadres. U kunt ook het contactformulier gebruiken om direct een bericht te sturen.</p>`,
        },
        {
          question: `Wat zijn de openingstijden van ${placeName}?`,
          answerHtml: `<p>Neem direct contact op met ${placeName} voor actuele openingstijden. Deze kunnen variëren op feestdagen en in vakantieperiodes.</p>`,
        },
        {
          question: `Kan ik een review achterlaten voor ${placeName}?`,
          answerHtml: `<p>Ja, u kunt een review achterlaten om andere huisdiereigenaren te helpen. Deel uw ervaring en help anderen bij het maken van hun keuze.</p>`,
        },
      ];
    }
    return [
      {
        question: `How can I contact ${placeName}?`,
        answerHtml: `<p>You can find ${placeName}'s contact details on this page, including phone number and email if available. You can also use the contact form to send a message directly.</p>`,
      },
      {
        question: `What are the opening hours of ${placeName}?`,
        answerHtml: `<p>Please contact ${placeName} directly for current opening hours. Hours may vary on holidays and during vacation periods.</p>`,
      },
      {
        question: `Can I leave a review for ${placeName}?`,
        answerHtml: `<p>Yes, you can leave a review to help other pet owners. Share your experience and help others make their choice.</p>`,
      },
    ];
  }

  // Best/Top page FAQs
  if ((type === "best" || type === "top") && categoryName) {
    if (isNl) {
      return [
        {
          question: `Hoe wordt de ranking van ${categoryName.toLowerCase()} bepaald?`,
          answerHtml: `<p>De ranking is gebaseerd op beoordelingen en recensies van gebruikers, gecombineerd met andere kwaliteitsfactoren zoals responsiviteit en completheid van het profiel.</p>`,
        },
        {
          question: `Hoe vaak wordt de ranking bijgewerkt?`,
          answerHtml: `<p>De ranking wordt regelmatig bijgewerkt op basis van nieuwe recensies en beoordelingen om de meest actuele informatie te bieden.</p>`,
        },
      ];
    }
    return [
      {
        question: `How is the ranking of ${categoryName.toLowerCase()} determined?`,
        answerHtml: `<p>The ranking is based on user ratings and reviews, combined with other quality factors such as responsiveness and profile completeness.</p>`,
      },
      {
        question: `How often is the ranking updated?`,
        answerHtml: `<p>The ranking is updated regularly based on new reviews and ratings to provide the most current information.</p>`,
      },
    ];
  }

  // Country page FAQs
  if (type === "country" && countryName) {
    if (isNl) {
      return [
        {
          question: `Hoeveel huisdierservices zijn er in ${countryName}?`,
          answerHtml: `<p>CutiePawsPedia biedt een groeiende directory van huisdierservices in ${countryName}. Het aantal wordt regelmatig bijgewerkt naarmate er nieuwe bedrijven worden toegevoegd.</p>`,
        },
        {
          question: `Welke steden in ${countryName} worden gedekt?`,
          answerHtml: `<p>We dekken de belangrijkste steden en regio's in ${countryName}. Gebruik de zoekfunctie of browse per stad om huisdierservices in uw omgeving te vinden.</p>`,
        },
      ];
    }
    return [
      {
        question: `How many pet services are in ${countryName}?`,
        answerHtml: `<p>CutiePawsPedia provides a growing directory of pet services in ${countryName}. The number is regularly updated as new businesses are added.</p>`,
      },
      {
        question: `Which cities in ${countryName} are covered?`,
        answerHtml: `<p>We cover major cities and regions in ${countryName}. Use the search function or browse by city to find pet services in your area.</p>`,
      },
    ];
  }

  // Default fallback
  return [];
}

/**
 * Check if content has valid FAQs
 */
export function hasValidFaqs(content: AiContentStructure | null | undefined): boolean {
  const faqs = extractFaqsFromAiContent(content);
  return faqs.length >= 2;
}
