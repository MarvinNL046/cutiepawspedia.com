/**
 * Email Notification Templates v2
 *
 * Professional HTML/text email templates using the layout system.
 * Supports multiple locales (en, nl, de) with polished, conversion-focused copy.
 * Part of N2: Notifications v2 - Smart Logic, Pro Copy, Digests & Advanced Settings
 */

import type { EmailBuildResult, Locale, DEFAULT_LOCALE } from "./types";
import {
  buildBaseLayout,
  buildPlainTextLayout,
  buildButton,
  buildCard,
  buildStatsRow,
  buildStarRating,
  buildHeading,
  buildParagraph,
  buildList,
  buildDivider,
  BRAND,
  STYLES,
} from "./layout";

// ============================================================================
// TRANSLATIONS v2 (Professional Copy)
// ============================================================================

const translations: Record<Locale, Record<string, string>> = {
  en: {
    // ─── User Welcome ───
    welcome_subject: "Welcome to CutiePawsPedia! Let's find pet-friendly places together",
    welcome_preview: "Your account is ready - start exploring pet-friendly places near you",
    welcome_heading: "Welcome aboard! 🎉",
    welcome_intro: "Hi{userName}! Thanks for joining CutiePawsPedia - your guide to pet-friendly places.",
    welcome_body: "With your new account, you can now:",
    welcome_feature1: "Save your favorite pet-friendly places",
    welcome_feature2: "Write and share reviews",
    welcome_feature3: "Get updates when your saved places change",
    welcome_feature4: "Discover new places based on your preferences",
    welcome_cta: "Start Exploring",
    welcome_footer: "Questions? Just reply to this email - we're happy to help!",

    // ─── Review New ───
    reviewNew_subject: "Great news! {placeName} just got a new review",
    reviewNew_preview: "Someone left a {rating}-star review for your business",
    reviewNew_heading: "You've got a new review! 🎉",
    reviewNew_intro: "Great news! A customer just shared their experience at <strong>{placeName}</strong>.",
    reviewNew_from: "From",
    reviewNew_rating: "Rating",
    reviewNew_review: "What they said",
    reviewNew_cta: "View & Respond",
    reviewNew_footer: "Tip: Responding to reviews within 24 hours can increase customer loyalty by 33%!",

    // ─── Review Reply ───
    reviewReply_subject: "{businessName} just replied to your review",
    reviewReply_preview: "The business responded to your feedback",
    reviewReply_heading: "You got a reply! 💬",
    reviewReply_intro: "<strong>{businessName}</strong> took the time to respond to your review of <strong>{placeName}</strong>:",
    reviewReply_cta: "View Conversation",

    // ─── Lead New ───
    leadNew_subject: "New customer inquiry for {placeName} 📩",
    leadNew_preview: "{leadName} wants to get in touch with you",
    leadNew_heading: "Someone's interested! 🙌",
    leadNew_intro: "A potential customer just reached out about <strong>{placeName}</strong>. Here's their message:",
    leadNew_from: "Name",
    leadNew_email: "Email",
    leadNew_phone: "Phone",
    leadNew_message: "Message",
    leadNew_cta: "Reply Now",
    leadNew_footer: "Pro tip: Businesses that respond within 1 hour are 7x more likely to convert leads!",

    // ─── Claim Approved ───
    claimApproved_subject: "Congratulations! Your business claim is approved 🎉",
    claimApproved_preview: "You now have full control over your listing",
    claimApproved_heading: "Welcome aboard! 🚀",
    claimApproved_intro: "Great news! Your claim for <strong>{placeName}</strong> has been approved.",
    claimApproved_body: "You now have full access to:",
    claimApproved_feature1: "Update your business information",
    claimApproved_feature2: "Respond to customer reviews",
    claimApproved_feature3: "Receive and manage leads",
    claimApproved_feature4: "View analytics and insights",
    claimApproved_cta: "Go to Dashboard",

    // ─── Claim Rejected ───
    claimRejected_subject: "Update on your business claim request",
    claimRejected_preview: "We reviewed your claim for {placeName}",
    claimRejected_heading: "Claim Status Update",
    claimRejected_intro: "We've reviewed your claim for <strong>{placeName}</strong>.",
    claimRejected_body: "Unfortunately, we couldn't verify your connection to this business at this time.",
    claimRejected_reason: "Reason",
    claimRejected_help: "This could happen if:",
    claimRejected_help1: "The submitted documents didn't match our records",
    claimRejected_help2: "The business information couldn't be verified",
    claimRejected_help3: "Additional documentation is needed",
    claimRejected_cta: "Try Again with More Info",
    claimRejected_footer: "Need help? Reply to this email and we'll assist you personally.",

    // ─── Weekly Digest ───
    digest_subject: "📊 Your weekly recap: {businessName}",
    digest_preview: "{newLeadsCount} leads, {newReviewsCount} reviews this week",
    digest_heading: "Your Week in Numbers",
    digest_intro: "Here's how <strong>{businessName}</strong> performed this week:",
    digest_leads: "New Leads",
    digest_reviews: "New Reviews",
    digest_avgRating: "Avg. Rating",
    digest_cta: "View Full Dashboard",
    digest_noActivity: "Quiet week, but every business has them!",
    digest_noActivity_tip: "Keep your listing fresh with updated photos and descriptions to attract more customers.",

    // ─── Favorite Place Update ───
    favUpdate_subject: "📍 {placeName} has been updated",
    favUpdate_preview: "A place you saved has new information",
    favUpdate_heading: "Place Update Alert 🔔",
    favUpdate_intro: "Good news! <strong>{placeName}</strong>, one of your saved places, has been updated with new information.",
    favUpdate_changes: "What's new",
    favUpdate_cta: "See Updates",
    favUpdate_footer: "You're receiving this because you saved this place to your favorites.",
  },
  nl: {
    // ─── User Welcome ───
    welcome_subject: "Welkom bij CutiePawsPedia! Laten we samen diervriendelijke plekken ontdekken",
    welcome_preview: "Je account is klaar - ontdek diervriendelijke plekken bij jou in de buurt",
    welcome_heading: "Welkom aan boord! 🎉",
    welcome_intro: "Hoi{userName}! Bedankt voor je aanmelding bij CutiePawsPedia - je gids voor diervriendelijke plekken.",
    welcome_body: "Met je nieuwe account kun je nu:",
    welcome_feature1: "Je favoriete diervriendelijke plekken opslaan",
    welcome_feature2: "Reviews schrijven en delen",
    welcome_feature3: "Updates ontvangen wanneer je opgeslagen plekken veranderen",
    welcome_feature4: "Nieuwe plekken ontdekken op basis van je voorkeuren",
    welcome_cta: "Begin met Ontdekken",
    welcome_footer: "Vragen? Reageer gewoon op deze e-mail - we helpen je graag!",

    // ─── Review New ───
    reviewNew_subject: "Goed nieuws! {placeName} heeft een nieuwe review",
    reviewNew_preview: "Iemand gaf jouw bedrijf {rating} sterren",
    reviewNew_heading: "Je hebt een nieuwe review! 🎉",
    reviewNew_intro: "Geweldig nieuws! Een klant heeft zojuist zijn ervaring bij <strong>{placeName}</strong> gedeeld.",
    reviewNew_from: "Van",
    reviewNew_rating: "Beoordeling",
    reviewNew_review: "Wat ze zeiden",
    reviewNew_cta: "Bekijk & Reageer",
    reviewNew_footer: "Tip: Reageren op reviews binnen 24 uur kan klantloyaliteit met 33% verhogen!",

    // ─── Review Reply ───
    reviewReply_subject: "{businessName} heeft gereageerd op je review",
    reviewReply_preview: "Het bedrijf heeft op je feedback gereageerd",
    reviewReply_heading: "Je hebt een reactie! 💬",
    reviewReply_intro: "<strong>{businessName}</strong> nam de tijd om te reageren op je review van <strong>{placeName}</strong>:",
    reviewReply_cta: "Bekijk Gesprek",

    // ─── Lead New ───
    leadNew_subject: "Nieuwe aanvraag voor {placeName} 📩",
    leadNew_preview: "{leadName} wil contact met je opnemen",
    leadNew_heading: "Iemand is geïnteresseerd! 🙌",
    leadNew_intro: "Een potentiële klant heeft zojuist contact opgenomen over <strong>{placeName}</strong>. Dit is hun bericht:",
    leadNew_from: "Naam",
    leadNew_email: "E-mail",
    leadNew_phone: "Telefoon",
    leadNew_message: "Bericht",
    leadNew_cta: "Reageer Nu",
    leadNew_footer: "Pro tip: Bedrijven die binnen 1 uur reageren converteren 7x vaker leads!",

    // ─── Claim Approved ───
    claimApproved_subject: "Gefeliciteerd! Je bedrijfsclaim is goedgekeurd 🎉",
    claimApproved_preview: "Je hebt nu volledige controle over je vermelding",
    claimApproved_heading: "Welkom aan boord! 🚀",
    claimApproved_intro: "Geweldig nieuws! Je claim voor <strong>{placeName}</strong> is goedgekeurd.",
    claimApproved_body: "Je hebt nu volledige toegang tot:",
    claimApproved_feature1: "Je bedrijfsinformatie bijwerken",
    claimApproved_feature2: "Reageren op klantreviews",
    claimApproved_feature3: "Leads ontvangen en beheren",
    claimApproved_feature4: "Analyses en inzichten bekijken",
    claimApproved_cta: "Ga naar Dashboard",

    // ─── Claim Rejected ───
    claimRejected_subject: "Update over je bedrijfsclaim",
    claimRejected_preview: "We hebben je claim voor {placeName} beoordeeld",
    claimRejected_heading: "Claim Status Update",
    claimRejected_intro: "We hebben je claim voor <strong>{placeName}</strong> beoordeeld.",
    claimRejected_body: "Helaas konden we je connectie met dit bedrijf op dit moment niet verifiëren.",
    claimRejected_reason: "Reden",
    claimRejected_help: "Dit kan gebeuren als:",
    claimRejected_help1: "De ingediende documenten niet overeenkomen met onze gegevens",
    claimRejected_help2: "De bedrijfsinformatie niet geverifieerd kon worden",
    claimRejected_help3: "Aanvullende documentatie nodig is",
    claimRejected_cta: "Probeer Opnieuw met Meer Info",
    claimRejected_footer: "Hulp nodig? Reageer op deze e-mail en we helpen je persoonlijk.",

    // ─── Weekly Digest ───
    digest_subject: "📊 Je weekoverzicht: {businessName}",
    digest_preview: "{newLeadsCount} leads, {newReviewsCount} reviews deze week",
    digest_heading: "Je Week in Cijfers",
    digest_intro: "Zo presteerde <strong>{businessName}</strong> deze week:",
    digest_leads: "Nieuwe Leads",
    digest_reviews: "Nieuwe Reviews",
    digest_avgRating: "Gem. Beoordeling",
    digest_cta: "Bekijk Volledig Dashboard",
    digest_noActivity: "Rustige week, maar die heeft elk bedrijf!",
    digest_noActivity_tip: "Houd je vermelding fris met nieuwe foto's en beschrijvingen om meer klanten aan te trekken.",

    // ─── Favorite Place Update ───
    favUpdate_subject: "📍 {placeName} is bijgewerkt",
    favUpdate_preview: "Een opgeslagen plek heeft nieuwe informatie",
    favUpdate_heading: "Plek Update 🔔",
    favUpdate_intro: "Goed nieuws! <strong>{placeName}</strong>, een van je opgeslagen plekken, is bijgewerkt met nieuwe informatie.",
    favUpdate_changes: "Wat is er nieuw",
    favUpdate_cta: "Bekijk Updates",
    favUpdate_footer: "Je ontvangt dit omdat je deze plek hebt opgeslagen bij je favorieten.",
  },
  de: {
    // ─── User Welcome ───
    welcome_subject: "Willkommen bei CutiePawsPedia! Lassen Sie uns gemeinsam tierfreundliche Orte finden",
    welcome_preview: "Ihr Konto ist bereit - entdecken Sie tierfreundliche Orte in Ihrer Nähe",
    welcome_heading: "Willkommen an Bord! 🎉",
    welcome_intro: "Hallo{userName}! Danke, dass Sie sich bei CutiePawsPedia angemeldet haben - Ihrem Guide für tierfreundliche Orte.",
    welcome_body: "Mit Ihrem neuen Konto können Sie jetzt:",
    welcome_feature1: "Ihre Lieblings-tierfreundlichen Orte speichern",
    welcome_feature2: "Bewertungen schreiben und teilen",
    welcome_feature3: "Updates erhalten, wenn sich Ihre gespeicherten Orte ändern",
    welcome_feature4: "Neue Orte basierend auf Ihren Vorlieben entdecken",
    welcome_cta: "Jetzt Entdecken",
    welcome_footer: "Fragen? Antworten Sie einfach auf diese E-Mail - wir helfen Ihnen gerne!",

    // ─── Review New ───
    reviewNew_subject: "Tolle Neuigkeiten! {placeName} hat eine neue Bewertung",
    reviewNew_preview: "Jemand hat {rating} Sterne für Ihr Unternehmen vergeben",
    reviewNew_heading: "Sie haben eine neue Bewertung! 🎉",
    reviewNew_intro: "Großartige Neuigkeiten! Ein Kunde hat gerade seine Erfahrung bei <strong>{placeName}</strong> geteilt.",
    reviewNew_from: "Von",
    reviewNew_rating: "Bewertung",
    reviewNew_review: "Was sie sagten",
    reviewNew_cta: "Ansehen & Antworten",
    reviewNew_footer: "Tipp: Auf Bewertungen innerhalb von 24 Stunden zu antworten kann die Kundentreue um 33% steigern!",

    // ─── Review Reply ───
    reviewReply_subject: "{businessName} hat auf Ihre Bewertung geantwortet",
    reviewReply_preview: "Das Unternehmen hat auf Ihr Feedback reagiert",
    reviewReply_heading: "Sie haben eine Antwort! 💬",
    reviewReply_intro: "<strong>{businessName}</strong> hat sich die Zeit genommen, auf Ihre Bewertung von <strong>{placeName}</strong> zu antworten:",
    reviewReply_cta: "Gespräch Ansehen",

    // ─── Lead New ───
    leadNew_subject: "Neue Kundenanfrage für {placeName} 📩",
    leadNew_preview: "{leadName} möchte mit Ihnen in Kontakt treten",
    leadNew_heading: "Jemand ist interessiert! 🙌",
    leadNew_intro: "Ein potenzieller Kunde hat sich gerade wegen <strong>{placeName}</strong> gemeldet. Hier ist seine Nachricht:",
    leadNew_from: "Name",
    leadNew_email: "E-Mail",
    leadNew_phone: "Telefon",
    leadNew_message: "Nachricht",
    leadNew_cta: "Jetzt Antworten",
    leadNew_footer: "Profi-Tipp: Unternehmen, die innerhalb von 1 Stunde antworten, konvertieren 7x häufiger Leads!",

    // ─── Claim Approved ───
    claimApproved_subject: "Herzlichen Glückwunsch! Ihr Unternehmensanspruch wurde genehmigt 🎉",
    claimApproved_preview: "Sie haben jetzt volle Kontrolle über Ihren Eintrag",
    claimApproved_heading: "Willkommen an Bord! 🚀",
    claimApproved_intro: "Großartige Neuigkeiten! Ihr Anspruch für <strong>{placeName}</strong> wurde genehmigt.",
    claimApproved_body: "Sie haben jetzt vollen Zugang zu:",
    claimApproved_feature1: "Ihre Unternehmensinformationen aktualisieren",
    claimApproved_feature2: "Auf Kundenbewertungen antworten",
    claimApproved_feature3: "Leads empfangen und verwalten",
    claimApproved_feature4: "Analysen und Einblicke anzeigen",
    claimApproved_cta: "Zum Dashboard",

    // ─── Claim Rejected ───
    claimRejected_subject: "Update zu Ihrer Unternehmensanspruchsanfrage",
    claimRejected_preview: "Wir haben Ihren Anspruch für {placeName} überprüft",
    claimRejected_heading: "Anspruch Status Update",
    claimRejected_intro: "Wir haben Ihren Anspruch für <strong>{placeName}</strong> überprüft.",
    claimRejected_body: "Leider konnten wir Ihre Verbindung zu diesem Unternehmen derzeit nicht verifizieren.",
    claimRejected_reason: "Grund",
    claimRejected_help: "Dies kann passieren, wenn:",
    claimRejected_help1: "Die eingereichten Dokumente nicht mit unseren Aufzeichnungen übereinstimmen",
    claimRejected_help2: "Die Unternehmensinformationen nicht verifiziert werden konnten",
    claimRejected_help3: "Zusätzliche Dokumentation erforderlich ist",
    claimRejected_cta: "Erneut Versuchen mit Mehr Infos",
    claimRejected_footer: "Brauchen Sie Hilfe? Antworten Sie auf diese E-Mail und wir helfen Ihnen persönlich.",

    // ─── Weekly Digest ───
    digest_subject: "📊 Ihre Wochenzusammenfassung: {businessName}",
    digest_preview: "{newLeadsCount} Leads, {newReviewsCount} Bewertungen diese Woche",
    digest_heading: "Ihre Woche in Zahlen",
    digest_intro: "So hat <strong>{businessName}</strong> diese Woche abgeschnitten:",
    digest_leads: "Neue Leads",
    digest_reviews: "Neue Bewertungen",
    digest_avgRating: "Durchschn. Bewertung",
    digest_cta: "Vollständiges Dashboard Ansehen",
    digest_noActivity: "Ruhige Woche, aber die hat jedes Unternehmen!",
    digest_noActivity_tip: "Halten Sie Ihren Eintrag mit neuen Fotos und Beschreibungen aktuell, um mehr Kunden anzuziehen.",

    // ─── Favorite Place Update ───
    favUpdate_subject: "📍 {placeName} wurde aktualisiert",
    favUpdate_preview: "Ein gespeicherter Ort hat neue Informationen",
    favUpdate_heading: "Ort-Update 🔔",
    favUpdate_intro: "Gute Nachrichten! <strong>{placeName}</strong>, einer Ihrer gespeicherten Orte, wurde mit neuen Informationen aktualisiert.",
    favUpdate_changes: "Was gibt es Neues",
    favUpdate_cta: "Updates Ansehen",
    favUpdate_footer: "Sie erhalten dies, weil Sie diesen Ort zu Ihren Favoriten hinzugefügt haben.",
  },
};

// ============================================================================
// TRANSLATION HELPER
// ============================================================================

function t(locale: string, key: string, vars: Record<string, string | number> = {}): string {
  const lang = (locale as Locale) in translations ? (locale as Locale) : "en";
  let text = translations[lang][key] || translations.en[key] || key;

  // Replace variables
  Object.entries(vars).forEach(([k, v]) => {
    text = text.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
  });

  return text;
}

function getLocale(locale?: string): Locale {
  if (locale && locale in translations) {
    return locale as Locale;
  }
  return "en";
}

// ============================================================================
// FIELD LABEL TRANSLATIONS
// ============================================================================

const fieldLabels: Record<Locale, Record<string, string>> = {
  en: {
    openingHours: "Opening hours",
    phone: "Phone number",
    email: "Email address",
    website: "Website",
    description: "Description",
    avgRating: "Rating",
    status: "Status",
    address: "Address",
    name: "Business name",
  },
  nl: {
    openingHours: "Openingstijden",
    phone: "Telefoonnummer",
    email: "E-mailadres",
    website: "Website",
    description: "Beschrijving",
    avgRating: "Beoordeling",
    status: "Status",
    address: "Adres",
    name: "Bedrijfsnaam",
  },
  de: {
    openingHours: "Öffnungszeiten",
    phone: "Telefonnummer",
    email: "E-Mail-Adresse",
    website: "Website",
    description: "Beschreibung",
    avgRating: "Bewertung",
    status: "Status",
    address: "Adresse",
    name: "Firmenname",
  },
};

// ============================================================================
// TEMPLATE BUILDERS
// ============================================================================

/**
 * Build email for welcome notification (to new user)
 */
export function buildWelcomeEmail(params: {
  locale: string;
  userName?: string;
}): EmailBuildResult {
  const { userName } = params;
  const locale = getLocale(params.locale);
  const baseUrl = process.env.APP_BASE_URL || "https://cutiepawspedia.com";

  // Format name for greeting (add space before if name exists)
  const nameDisplay = userName ? ` ${userName}` : "";

  const subject = t(locale, "welcome_subject");
  const preview = t(locale, "welcome_preview");

  const features = [
    t(locale, "welcome_feature1"),
    t(locale, "welcome_feature2"),
    t(locale, "welcome_feature3"),
    t(locale, "welcome_feature4"),
  ];

  const bodyHtml = `
    ${buildHeading(t(locale, "welcome_heading"))}
    ${buildParagraph(t(locale, "welcome_intro", { userName: nameDisplay }))}

    ${buildCard(`
      <p style="margin: 0 0 ${STYLES.spacing.md} 0; font-weight: ${STYLES.fontWeight.semibold}; color: ${BRAND.colors.text};">
        ${t(locale, "welcome_body")}
      </p>
      ${buildList(features)}
    `, { accentColor: BRAND.colors.success })}

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: ${STYLES.spacing.xl} 0;">
      <tr>
        <td align="center">
          ${buildButton(t(locale, "welcome_cta"), `${baseUrl}/${locale}`)}
        </td>
      </tr>
    </table>

    ${buildParagraph(t(locale, "welcome_footer"), { muted: true, align: "center" })}
  `;

  const html = buildBaseLayout({
    subject,
    previewText: preview,
    bodyHtml,
    locale,
  });

  const text = buildPlainTextLayout({
    bodyText: `
${t(locale, "welcome_heading")}

${t(locale, "welcome_intro", { userName: nameDisplay }).replace(/<[^>]*>/g, "")}

${t(locale, "welcome_body")}
${features.map((f) => `• ${f}`).join("\n")}

${t(locale, "welcome_cta")}: ${baseUrl}/${locale}

${t(locale, "welcome_footer")}
    `.trim(),
    locale,
  });

  return { subject, html, text };
}

/**
 * Build email for new review notification (to business owner)
 */
export function buildReviewNewEmail(params: {
  locale: string;
  placeName: string;
  reviewerName: string;
  rating: number;
  reviewSnippet: string;
  dashboardUrl?: string;
}): EmailBuildResult {
  const { placeName, reviewerName, rating, reviewSnippet, dashboardUrl } = params;
  const locale = getLocale(params.locale);
  const baseUrl = process.env.APP_BASE_URL || "https://cutiepawspedia.com";

  const subject = t(locale, "reviewNew_subject", { placeName });
  const preview = t(locale, "reviewNew_preview", { rating });

  const bodyHtml = `
    ${buildHeading(t(locale, "reviewNew_heading"))}
    ${buildParagraph(t(locale, "reviewNew_intro", { placeName }))}

    ${buildCard(`
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding-bottom: ${STYLES.spacing.sm};">
            <strong>${t(locale, "reviewNew_from")}:</strong> ${reviewerName}
          </td>
        </tr>
        <tr>
          <td style="padding-bottom: ${STYLES.spacing.sm};">
            <strong>${t(locale, "reviewNew_rating")}:</strong> ${buildStarRating(rating)}
          </td>
        </tr>
        <tr>
          <td>
            <strong>${t(locale, "reviewNew_review")}:</strong>
            <p style="margin: ${STYLES.spacing.sm} 0 0 0; font-style: italic; color: ${BRAND.colors.text};">"${reviewSnippet}"</p>
          </td>
        </tr>
      </table>
    `, { accentColor: BRAND.colors.primary })}

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: ${STYLES.spacing.xl} 0;">
      <tr>
        <td align="center">
          ${buildButton(t(locale, "reviewNew_cta"), dashboardUrl || `${baseUrl}/dashboard`)}
        </td>
      </tr>
    </table>

    ${buildParagraph(t(locale, "reviewNew_footer"), { muted: true, align: "center" })}
  `;

  const html = buildBaseLayout({
    subject,
    previewText: preview,
    bodyHtml,
    locale,
  });

  const text = buildPlainTextLayout({
    bodyText: `
${t(locale, "reviewNew_heading")}

${t(locale, "reviewNew_intro", { placeName }).replace(/<[^>]*>/g, "")}

${t(locale, "reviewNew_from")}: ${reviewerName}
${t(locale, "reviewNew_rating")}: ${"★".repeat(rating)}${"☆".repeat(5 - rating)} (${rating}/5)

${t(locale, "reviewNew_review")}:
"${reviewSnippet}"

${t(locale, "reviewNew_cta")}: ${dashboardUrl || `${baseUrl}/dashboard`}

${t(locale, "reviewNew_footer")}
    `.trim(),
    locale,
  });

  return { subject, html, text };
}

/**
 * Build email for review reply notification (to user who wrote review)
 */
export function buildReviewReplyEmail(params: {
  locale: string;
  placeName: string;
  businessName: string;
  replySnippet: string;
  reviewUrl?: string;
}): EmailBuildResult {
  const { placeName, businessName, replySnippet, reviewUrl } = params;
  const locale = getLocale(params.locale);
  const baseUrl = process.env.APP_BASE_URL || "https://cutiepawspedia.com";

  const subject = t(locale, "reviewReply_subject", { businessName });
  const preview = t(locale, "reviewReply_preview");

  const bodyHtml = `
    ${buildHeading(t(locale, "reviewReply_heading"))}
    ${buildParagraph(t(locale, "reviewReply_intro", { businessName, placeName }))}

    ${buildCard(`
      <p style="margin: 0; font-style: italic; font-size: ${STYLES.fontSize.base}; color: ${BRAND.colors.text}; line-height: ${STYLES.lineHeight.relaxed};">
        "${replySnippet}"
      </p>
    `, { accentColor: BRAND.colors.success })}

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: ${STYLES.spacing.xl} 0;">
      <tr>
        <td align="center">
          ${buildButton(t(locale, "reviewReply_cta"), reviewUrl || baseUrl)}
        </td>
      </tr>
    </table>
  `;

  const html = buildBaseLayout({
    subject,
    previewText: preview,
    bodyHtml,
    locale,
  });

  const text = buildPlainTextLayout({
    bodyText: `
${t(locale, "reviewReply_heading")}

${t(locale, "reviewReply_intro", { businessName, placeName }).replace(/<[^>]*>/g, "")}

"${replySnippet}"

${t(locale, "reviewReply_cta")}: ${reviewUrl || baseUrl}
    `.trim(),
    locale,
  });

  return { subject, html, text };
}

/**
 * Build email for new lead notification (to business owner)
 *
 * NOTE: Pay-per-lead paywall has been disabled.
 * All leads now show full contact details without payment.
 * The isPaid parameter is kept for backwards compatibility but defaults to true.
 */
export function buildLeadNewEmail(params: {
  locale: string;
  placeName: string;
  leadName: string;
  leadEmail: string;
  leadPhone?: string;
  leadMessage?: string;
  dashboardUrl?: string;
  isPaid?: boolean; // Deprecated - kept for backwards compatibility, always treated as true
}): EmailBuildResult {
  const { placeName, leadName, leadEmail, leadPhone, leadMessage, dashboardUrl } = params;
  const locale = getLocale(params.locale);
  const baseUrl = process.env.APP_BASE_URL || "https://cutiepawspedia.com";

  const subject = t(locale, "leadNew_subject", { placeName });
  const preview = t(locale, "leadNew_preview", { leadName });

  const bodyHtml = `
    ${buildHeading(t(locale, "leadNew_heading"))}
    ${buildParagraph(t(locale, "leadNew_intro", { placeName }))}

    ${buildCard(`
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding-bottom: ${STYLES.spacing.sm};">
            <strong>${t(locale, "leadNew_from")}:</strong> ${leadName}
          </td>
        </tr>
        <tr>
          <td style="padding-bottom: ${STYLES.spacing.sm};">
            <strong>${t(locale, "leadNew_email")}:</strong>
            <a href="mailto:${leadEmail}" style="color: ${BRAND.colors.primary}; text-decoration: none;">${leadEmail}</a>
          </td>
        </tr>
        ${leadPhone ? `
        <tr>
          <td style="padding-bottom: ${STYLES.spacing.sm};">
            <strong>${t(locale, "leadNew_phone")}:</strong>
            <a href="tel:${leadPhone}" style="color: ${BRAND.colors.primary}; text-decoration: none;">${leadPhone}</a>
          </td>
        </tr>
        ` : ""}
        ${leadMessage ? `
        <tr>
          <td>
            <strong>${t(locale, "leadNew_message")}:</strong>
            <p style="margin: ${STYLES.spacing.sm} 0 0 0; color: ${BRAND.colors.text};">${leadMessage}</p>
          </td>
        </tr>
        ` : ""}
      </table>
    `, { accentColor: BRAND.colors.warning })}

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: ${STYLES.spacing.xl} 0;">
      <tr>
        <td align="center">
          ${buildButton(t(locale, "leadNew_cta"), dashboardUrl || `${baseUrl}/dashboard`)}
        </td>
      </tr>
    </table>

    ${buildParagraph(t(locale, "leadNew_footer"), { muted: true, align: "center" })}
  `;

  const html = buildBaseLayout({
    subject,
    previewText: preview,
    bodyHtml,
    locale,
  });

  const text = buildPlainTextLayout({
    bodyText: `
${t(locale, "leadNew_heading")}

${t(locale, "leadNew_intro", { placeName }).replace(/<[^>]*>/g, "")}

${t(locale, "leadNew_from")}: ${leadName}
${t(locale, "leadNew_email")}: ${leadEmail}
${leadPhone ? `${t(locale, "leadNew_phone")}: ${leadPhone}` : ""}
${leadMessage ? `${t(locale, "leadNew_message")}: ${leadMessage}` : ""}

${t(locale, "leadNew_cta")}: ${dashboardUrl || `${baseUrl}/dashboard`}

${t(locale, "leadNew_footer")}
    `.trim(),
    locale,
  });

  return { subject, html, text };
}

/**
 * Build email for claim approved notification (to claimer)
 */
export function buildClaimApprovedEmail(params: {
  locale: string;
  placeName: string;
  userName?: string;
  dashboardUrl?: string;
}): EmailBuildResult {
  const { placeName, dashboardUrl } = params;
  const locale = getLocale(params.locale);
  const baseUrl = process.env.APP_BASE_URL || "https://cutiepawspedia.com";

  const subject = t(locale, "claimApproved_subject");
  const preview = t(locale, "claimApproved_preview");

  const features = [
    t(locale, "claimApproved_feature1"),
    t(locale, "claimApproved_feature2"),
    t(locale, "claimApproved_feature3"),
    t(locale, "claimApproved_feature4"),
  ];

  const bodyHtml = `
    ${buildHeading(t(locale, "claimApproved_heading"))}
    ${buildParagraph(t(locale, "claimApproved_intro", { placeName }))}

    ${buildCard(`
      <p style="margin: 0 0 ${STYLES.spacing.md} 0; font-weight: ${STYLES.fontWeight.semibold}; color: ${BRAND.colors.text};">
        ${t(locale, "claimApproved_body")}
      </p>
      ${buildList(features)}
    `, { accentColor: BRAND.colors.success })}

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: ${STYLES.spacing.xl} 0;">
      <tr>
        <td align="center">
          ${buildButton(t(locale, "claimApproved_cta"), dashboardUrl || `${baseUrl}/dashboard`)}
        </td>
      </tr>
    </table>
  `;

  const html = buildBaseLayout({
    subject,
    previewText: preview,
    bodyHtml,
    locale,
  });

  const text = buildPlainTextLayout({
    bodyText: `
${t(locale, "claimApproved_heading")}

${t(locale, "claimApproved_intro", { placeName }).replace(/<[^>]*>/g, "")}

${t(locale, "claimApproved_body")}
${features.map((f) => `• ${f}`).join("\n")}

${t(locale, "claimApproved_cta")}: ${dashboardUrl || `${baseUrl}/dashboard`}
    `.trim(),
    locale,
  });

  return { subject, html, text };
}

/**
 * Build email for claim rejected notification (to claimer)
 */
export function buildClaimRejectedEmail(params: {
  locale: string;
  placeName: string;
  userName?: string;
  reason?: string;
}): EmailBuildResult {
  const { placeName, reason } = params;
  const locale = getLocale(params.locale);
  const baseUrl = process.env.APP_BASE_URL || "https://cutiepawspedia.com";

  const subject = t(locale, "claimRejected_subject");
  const preview = t(locale, "claimRejected_preview", { placeName });

  const helpItems = [
    t(locale, "claimRejected_help1"),
    t(locale, "claimRejected_help2"),
    t(locale, "claimRejected_help3"),
  ];

  const bodyHtml = `
    ${buildHeading(t(locale, "claimRejected_heading"))}
    ${buildParagraph(t(locale, "claimRejected_intro", { placeName }))}
    ${buildParagraph(t(locale, "claimRejected_body"))}

    ${reason ? buildCard(`
      <p style="margin: 0;">
        <strong>${t(locale, "claimRejected_reason")}:</strong> ${reason}
      </p>
    `, { accentColor: BRAND.colors.error }) : ""}

    ${buildCard(`
      <p style="margin: 0 0 ${STYLES.spacing.sm} 0; font-weight: ${STYLES.fontWeight.semibold};">
        ${t(locale, "claimRejected_help")}
      </p>
      ${buildList(helpItems)}
    `)}

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: ${STYLES.spacing.xl} 0;">
      <tr>
        <td align="center">
          ${buildButton(t(locale, "claimRejected_cta"), baseUrl, { variant: "outline" })}
        </td>
      </tr>
    </table>

    ${buildParagraph(t(locale, "claimRejected_footer"), { muted: true, align: "center" })}
  `;

  const html = buildBaseLayout({
    subject,
    previewText: preview,
    bodyHtml,
    locale,
  });

  const text = buildPlainTextLayout({
    bodyText: `
${t(locale, "claimRejected_heading")}

${t(locale, "claimRejected_intro", { placeName }).replace(/<[^>]*>/g, "")}

${t(locale, "claimRejected_body")}

${reason ? `${t(locale, "claimRejected_reason")}: ${reason}` : ""}

${t(locale, "claimRejected_help")}
${helpItems.map((h) => `• ${h}`).join("\n")}

${t(locale, "claimRejected_cta")}: ${baseUrl}

${t(locale, "claimRejected_footer")}
    `.trim(),
    locale,
  });

  return { subject, html, text };
}

/**
 * Build email for weekly digest (to business owner)
 */
export function buildDigestWeeklyEmail(params: {
  locale: string;
  businessName: string;
  userName?: string;
  newLeadsCount: number;
  newReviewsCount: number;
  averageRating?: number;
  dashboardUrl?: string;
}): EmailBuildResult {
  const { businessName, newLeadsCount, newReviewsCount, averageRating, dashboardUrl } = params;
  const locale = getLocale(params.locale);
  const baseUrl = process.env.APP_BASE_URL || "https://cutiepawspedia.com";

  const subject = t(locale, "digest_subject", { businessName });
  const preview = t(locale, "digest_preview", { newLeadsCount, newReviewsCount });
  const hasActivity = newLeadsCount > 0 || newReviewsCount > 0;

  const stats: Array<{ value: string | number; label: string; color: string }> = [
    { value: newLeadsCount, label: t(locale, "digest_leads"), color: BRAND.colors.primary },
    { value: newReviewsCount, label: t(locale, "digest_reviews"), color: BRAND.colors.primary },
  ];

  if (averageRating !== undefined) {
    stats.push({ value: averageRating.toFixed(1), label: t(locale, "digest_avgRating"), color: BRAND.colors.warning });
  }

  const bodyHtml = `
    ${buildHeading(t(locale, "digest_heading"), { align: "center" })}
    ${buildParagraph(t(locale, "digest_intro", { businessName }), { align: "center" })}

    ${hasActivity ? `
      ${buildCard(buildStatsRow(stats))}
    ` : `
      ${buildCard(`
        <p style="margin: 0; text-align: center; color: ${BRAND.colors.textMuted};">
          ${t(locale, "digest_noActivity")}
        </p>
        <p style="margin: ${STYLES.spacing.sm} 0 0 0; text-align: center; font-size: ${STYLES.fontSize.sm}; color: ${BRAND.colors.textMuted};">
          ${t(locale, "digest_noActivity_tip")}
        </p>
      `)}
    `}

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: ${STYLES.spacing.xl} 0;">
      <tr>
        <td align="center">
          ${buildButton(t(locale, "digest_cta"), dashboardUrl || `${baseUrl}/dashboard`)}
        </td>
      </tr>
    </table>
  `;

  const html = buildBaseLayout({
    subject,
    previewText: preview,
    bodyHtml,
    locale,
  });

  const text = buildPlainTextLayout({
    bodyText: `
${t(locale, "digest_heading")}

${t(locale, "digest_intro", { businessName }).replace(/<[^>]*>/g, "")}

${hasActivity ? `
${t(locale, "digest_leads")}: ${newLeadsCount}
${t(locale, "digest_reviews")}: ${newReviewsCount}
${averageRating ? `${t(locale, "digest_avgRating")}: ${averageRating.toFixed(1)}` : ""}
` : `${t(locale, "digest_noActivity")}

${t(locale, "digest_noActivity_tip")}`}

${t(locale, "digest_cta")}: ${dashboardUrl || `${baseUrl}/dashboard`}
    `.trim(),
    locale,
  });

  return { subject, html, text };
}

/**
 * Build email for favorite place update notification (to user)
 */
export function buildFavoritePlaceUpdateEmail(params: {
  locale: string;
  placeName: string;
  placeSlug: string;
  updatedFields: string[];
  updateSummary?: string;
  placeUrl?: string;
}): EmailBuildResult {
  const { placeName, placeSlug, updatedFields, updateSummary, placeUrl } = params;
  const locale = getLocale(params.locale);
  const baseUrl = process.env.APP_BASE_URL || "https://cutiepawspedia.com";
  const finalPlaceUrl = placeUrl || `${baseUrl}/place/${placeSlug}`;

  const subject = t(locale, "favUpdate_subject", { placeName });
  const preview = t(locale, "favUpdate_preview");

  // Convert field names to human-readable labels
  const labels = fieldLabels[locale] || fieldLabels.en;
  const humanReadableFields = updatedFields
    .map((field) => labels[field] || field)
    .filter(Boolean);

  const bodyHtml = `
    ${buildHeading(t(locale, "favUpdate_heading"))}
    ${buildParagraph(t(locale, "favUpdate_intro", { placeName }))}

    ${buildCard(`
      <p style="margin: 0 0 ${STYLES.spacing.sm} 0; font-weight: ${STYLES.fontWeight.semibold};">
        ${t(locale, "favUpdate_changes")}:
      </p>
      ${updateSummary
        ? `<p style="margin: 0; color: ${BRAND.colors.text};">${updateSummary}</p>`
        : buildList(humanReadableFields)
      }
    `, { accentColor: BRAND.colors.primary })}

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: ${STYLES.spacing.xl} 0;">
      <tr>
        <td align="center">
          ${buildButton(t(locale, "favUpdate_cta"), finalPlaceUrl)}
        </td>
      </tr>
    </table>

    ${buildParagraph(t(locale, "favUpdate_footer"), { muted: true, align: "center" })}
  `;

  const html = buildBaseLayout({
    subject,
    previewText: preview,
    bodyHtml,
    locale,
  });

  const text = buildPlainTextLayout({
    bodyText: `
${t(locale, "favUpdate_heading")}

${t(locale, "favUpdate_intro", { placeName }).replace(/<[^>]*>/g, "")}

${t(locale, "favUpdate_changes")}:
${updateSummary || humanReadableFields.map((f) => `• ${f}`).join("\n")}

${t(locale, "favUpdate_cta")}: ${finalPlaceUrl}

${t(locale, "favUpdate_footer")}
    `.trim(),
    locale,
  });

  return { subject, html, text };
}

// ============================================================================
// USER DIGEST v2 TRANSLATIONS (N2.4)
// ============================================================================

const userDigestTranslations: Record<Locale, Record<string, string>> = {
  en: {
    subject: "Your weekly pet places digest",
    preview: "{count} updates from your favorite places",
    heading: "Your Weekly Update",
    intro: "Here's what's been happening with your saved places:",
    favoritesSection: "Your Favorites",
    favoritesCount: "Places saved",
    updatedCount: "With updates",
    updatedFavoritesHeading: "Updates from Your Favorites",
    placeUpdated: "Updated fields",
    newReviews: "new reviews",
    rating: "rating",
    yourActivityHeading: "Your Activity",
    reviewsWritten: "Reviews written",
    helpfulVotes: "Helpful votes received",
    suggestedHeading: "Discover New Places",
    suggestedIntro: "Based on your favorites, you might also like:",
    cta: "Explore More",
    preferencesLink: "Manage notification preferences",
    noUpdates: "Your favorites are all up to date!",
    noUpdates_tip: "Explore more places to add to your collection.",
  },
  nl: {
    subject: "Je wekelijkse huisdierenplekken samenvatting",
    preview: "{count} updates van je favoriete plekken",
    heading: "Je Wekelijkse Update",
    intro: "Dit is wat er gebeurd is bij je opgeslagen plekken:",
    favoritesSection: "Je Favorieten",
    favoritesCount: "Opgeslagen plekken",
    updatedCount: "Met updates",
    updatedFavoritesHeading: "Updates van Je Favorieten",
    placeUpdated: "Bijgewerkte velden",
    newReviews: "nieuwe reviews",
    rating: "beoordeling",
    yourActivityHeading: "Je Activiteit",
    reviewsWritten: "Geschreven reviews",
    helpfulVotes: "Ontvangen nuttige stemmen",
    suggestedHeading: "Ontdek Nieuwe Plekken",
    suggestedIntro: "Op basis van je favorieten vind je misschien ook leuk:",
    cta: "Meer Ontdekken",
    preferencesLink: "Notificatie voorkeuren beheren",
    noUpdates: "Je favorieten zijn allemaal up-to-date!",
    noUpdates_tip: "Ontdek meer plekken om aan je collectie toe te voegen.",
  },
  de: {
    subject: "Ihre wöchentliche Haustierorte Zusammenfassung",
    preview: "{count} Updates von Ihren Lieblingsorten",
    heading: "Ihr Wöchentliches Update",
    intro: "Das ist passiert bei Ihren gespeicherten Orten:",
    favoritesSection: "Ihre Favoriten",
    favoritesCount: "Gespeicherte Orte",
    updatedCount: "Mit Updates",
    updatedFavoritesHeading: "Updates von Ihren Favoriten",
    placeUpdated: "Aktualisierte Felder",
    newReviews: "neue Bewertungen",
    rating: "Bewertung",
    yourActivityHeading: "Ihre Aktivität",
    reviewsWritten: "Geschriebene Bewertungen",
    helpfulVotes: "Erhaltene hilfreiche Stimmen",
    suggestedHeading: "Neue Orte Entdecken",
    suggestedIntro: "Basierend auf Ihren Favoriten könnten Ihnen auch gefallen:",
    cta: "Mehr Entdecken",
    preferencesLink: "Benachrichtigungseinstellungen verwalten",
    noUpdates: "Ihre Favoriten sind alle aktuell!",
    noUpdates_tip: "Entdecken Sie mehr Orte für Ihre Sammlung.",
  },
};

function tUser(locale: Locale, key: string, vars: Record<string, string | number> = {}): string {
  let text = userDigestTranslations[locale]?.[key] || userDigestTranslations.en[key] || key;
  Object.entries(vars).forEach(([k, v]) => {
    text = text.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
  });
  return text;
}

/**
 * Build email for user digest (weekly summary for users with favorites)
 * Part of N2.4: User Digest v2
 */
export function buildDigestUserEmail(params: {
  locale: string;
  userName?: string;
  favoritesCount: number;
  updatedFavoritesCount: number;
  updatedFavorites?: Array<{
    placeId: number;
    placeName: string;
    placeSlug: string;
    updatedFields: string[];
    newReviews?: number;
    newRating?: number;
  }>;
  userReviewCount?: number;
  userHelpfulVotes?: number;
  suggestedPlaces?: Array<{
    placeId: number;
    placeName: string;
    placeSlug: string;
    categoryName: string;
    avgRating?: number;
  }>;
  preferencesUrl?: string;
}): EmailBuildResult {
  const {
    favoritesCount,
    updatedFavoritesCount,
    updatedFavorites,
    userReviewCount,
    userHelpfulVotes,
    suggestedPlaces,
    preferencesUrl,
  } = params;
  const locale = getLocale(params.locale);
  const baseUrl = process.env.APP_BASE_URL || "https://cutiepawspedia.com";
  const hasUpdates = updatedFavoritesCount > 0;

  const subject = tUser(locale, "subject");
  const preview = tUser(locale, "preview", { count: updatedFavoritesCount });

  // Build favorites summary stats
  const favoriteStats = [
    { value: favoritesCount, label: tUser(locale, "favoritesCount"), color: BRAND.colors.primary },
    { value: updatedFavoritesCount, label: tUser(locale, "updatedCount"), color: BRAND.colors.success },
  ];

  // Build updated favorites list HTML
  let updatedFavoritesHtml = "";
  if (hasUpdates && updatedFavorites && updatedFavorites.length > 0) {
    const labels = fieldLabels[locale] || fieldLabels.en;
    updatedFavoritesHtml = updatedFavorites.slice(0, 5).map((place) => {
      const humanFields = place.updatedFields.map((f) => labels[f] || f).join(", ");
      return `
        <tr>
          <td style="padding: ${STYLES.spacing.sm} 0; border-bottom: 1px solid ${BRAND.colors.border};">
            <a href="${baseUrl}/place/${place.placeSlug}" style="color: ${BRAND.colors.primary}; text-decoration: none; font-weight: ${STYLES.fontWeight.semibold};">
              ${place.placeName}
            </a>
            <div style="font-size: ${STYLES.fontSize.sm}; color: ${BRAND.colors.textMuted}; margin-top: 4px;">
              ${tUser(locale, "placeUpdated")}: ${humanFields}
              ${place.newReviews ? ` • ${place.newReviews} ${tUser(locale, "newReviews")}` : ""}
              ${place.newRating ? ` • ${place.newRating.toFixed(1)} ${tUser(locale, "rating")}` : ""}
            </div>
          </td>
        </tr>
      `;
    }).join("");
  }

  // Build user activity stats
  const hasActivity = (userReviewCount && userReviewCount > 0) || (userHelpfulVotes && userHelpfulVotes > 0);
  let activityHtml = "";
  if (hasActivity) {
    const activityStats = [];
    if (userReviewCount) {
      activityStats.push({ value: userReviewCount, label: tUser(locale, "reviewsWritten"), color: BRAND.colors.primary });
    }
    if (userHelpfulVotes) {
      activityStats.push({ value: userHelpfulVotes, label: tUser(locale, "helpfulVotes"), color: BRAND.colors.success });
    }
    activityHtml = `
      ${buildHeading(tUser(locale, "yourActivityHeading"), { level: 2 })}
      ${buildCard(buildStatsRow(activityStats))}
    `;
  }

  // Build suggested places
  let suggestedHtml = "";
  if (suggestedPlaces && suggestedPlaces.length > 0) {
    const suggestedItems = suggestedPlaces.slice(0, 3).map((place) => `
      <tr>
        <td style="padding: ${STYLES.spacing.sm} 0; border-bottom: 1px solid ${BRAND.colors.border};">
          <a href="${baseUrl}/place/${place.placeSlug}" style="color: ${BRAND.colors.primary}; text-decoration: none; font-weight: ${STYLES.fontWeight.semibold};">
            ${place.placeName}
          </a>
          <div style="font-size: ${STYLES.fontSize.sm}; color: ${BRAND.colors.textMuted}; margin-top: 4px;">
            ${place.categoryName}${place.avgRating ? ` • ${buildStarRating(Math.round(place.avgRating))}` : ""}
          </div>
        </td>
      </tr>
    `).join("");

    suggestedHtml = `
      ${buildDivider()}
      ${buildHeading(tUser(locale, "suggestedHeading"), { level: 2 })}
      ${buildParagraph(tUser(locale, "suggestedIntro"))}
      ${buildCard(`
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          ${suggestedItems}
        </table>
      `)}
    `;
  }

  const bodyHtml = `
    ${buildHeading(tUser(locale, "heading"), { align: "center" })}
    ${buildParagraph(tUser(locale, "intro"), { align: "center" })}

    ${buildHeading(tUser(locale, "favoritesSection"), { level: 2 })}
    ${buildCard(buildStatsRow(favoriteStats))}

    ${hasUpdates && updatedFavoritesHtml ? `
      ${buildHeading(tUser(locale, "updatedFavoritesHeading"), { level: 2 })}
      ${buildCard(`
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          ${updatedFavoritesHtml}
        </table>
      `)}
    ` : `
      ${buildCard(`
        <p style="margin: 0; text-align: center; color: ${BRAND.colors.textMuted};">
          ${tUser(locale, "noUpdates")}
        </p>
        <p style="margin: ${STYLES.spacing.sm} 0 0 0; text-align: center; font-size: ${STYLES.fontSize.sm}; color: ${BRAND.colors.textMuted};">
          ${tUser(locale, "noUpdates_tip")}
        </p>
      `)}
    `}

    ${activityHtml}
    ${suggestedHtml}

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: ${STYLES.spacing.xl} 0;">
      <tr>
        <td align="center">
          ${buildButton(tUser(locale, "cta"), baseUrl)}
        </td>
      </tr>
    </table>

    ${preferencesUrl ? buildParagraph(`<a href="${preferencesUrl}" style="color: ${BRAND.colors.textMuted};">${tUser(locale, "preferencesLink")}</a>`, { muted: true, align: "center" }) : ""}
  `;

  const html = buildBaseLayout({
    subject,
    previewText: preview,
    bodyHtml,
    locale,
  });

  // Build plain text version
  let textContent = `
${tUser(locale, "heading")}

${tUser(locale, "intro")}

${tUser(locale, "favoritesSection")}
• ${tUser(locale, "favoritesCount")}: ${favoritesCount}
• ${tUser(locale, "updatedCount")}: ${updatedFavoritesCount}
`;

  if (hasUpdates && updatedFavorites) {
    const labels = fieldLabels[locale] || fieldLabels.en;
    textContent += `\n${tUser(locale, "updatedFavoritesHeading")}:\n`;
    updatedFavorites.slice(0, 5).forEach((place) => {
      const humanFields = place.updatedFields.map((f) => labels[f] || f).join(", ");
      textContent += `• ${place.placeName}: ${humanFields}\n`;
    });
  }

  if (hasActivity) {
    textContent += `\n${tUser(locale, "yourActivityHeading")}:\n`;
    if (userReviewCount) textContent += `• ${tUser(locale, "reviewsWritten")}: ${userReviewCount}\n`;
    if (userHelpfulVotes) textContent += `• ${tUser(locale, "helpfulVotes")}: ${userHelpfulVotes}\n`;
  }

  if (suggestedPlaces && suggestedPlaces.length > 0) {
    textContent += `\n${tUser(locale, "suggestedHeading")}:\n`;
    suggestedPlaces.slice(0, 3).forEach((place) => {
      textContent += `• ${place.placeName} (${place.categoryName})\n`;
    });
  }

  textContent += `\n${tUser(locale, "cta")}: ${baseUrl}`;

  const text = buildPlainTextLayout({
    bodyText: textContent.trim(),
    locale,
  });

  return { subject, html, text };
}

// ============================================================================
// ADMIN DIGEST TRANSLATIONS (N2.5)
// ============================================================================

const adminDigestTranslations: Record<Locale, Record<string, string>> = {
  en: {
    subject: "CutiePawsPedia Admin Digest: {periodStart} - {periodEnd}",
    preview: "{newPlaces} new places, {newReviews} reviews, {pendingClaims} pending claims",
    heading: "Admin Dashboard Digest",
    intro: "System activity summary for <strong>{periodStart}</strong> to <strong>{periodEnd}</strong>:",
    coreMetricsHeading: "Core Metrics",
    newPlaces: "New Places",
    newReviews: "New Reviews",
    newLeads: "New Leads",
    newUsers: "New Users",
    newBusinesses: "New Businesses",
    newClaims: "New Claims",
    pendingClaims: "Pending Claims",
    systemHealthHeading: "System Health",
    placesEnriched: "Places enriched",
    emailsSent: "Emails sent",
    errorCount: "Errors logged",
    topCategoriesHeading: "Top Categories",
    topCitiesHeading: "Top Cities",
    alertsHeading: "Alerts & Issues",
    alertWarning: "Warning",
    alertError: "Error",
    alertInfo: "Info",
    cta: "Go to Admin Dashboard",
    noAlerts: "No alerts this period. Everything is running smoothly!",
  },
  nl: {
    subject: "CutiePawsPedia Admin Samenvatting: {periodStart} - {periodEnd}",
    preview: "{newPlaces} nieuwe plekken, {newReviews} reviews, {pendingClaims} openstaande claims",
    heading: "Admin Dashboard Samenvatting",
    intro: "Systeemactiviteit samenvatting van <strong>{periodStart}</strong> tot <strong>{periodEnd}</strong>:",
    coreMetricsHeading: "Kernstatistieken",
    newPlaces: "Nieuwe Plekken",
    newReviews: "Nieuwe Reviews",
    newLeads: "Nieuwe Leads",
    newUsers: "Nieuwe Gebruikers",
    newBusinesses: "Nieuwe Bedrijven",
    newClaims: "Nieuwe Claims",
    pendingClaims: "Openstaande Claims",
    systemHealthHeading: "Systeemgezondheid",
    placesEnriched: "Plekken verrijkt",
    emailsSent: "E-mails verzonden",
    errorCount: "Fouten gelogd",
    topCategoriesHeading: "Top Categorieën",
    topCitiesHeading: "Top Steden",
    alertsHeading: "Waarschuwingen & Problemen",
    alertWarning: "Waarschuwing",
    alertError: "Fout",
    alertInfo: "Info",
    cta: "Ga naar Admin Dashboard",
    noAlerts: "Geen waarschuwingen deze periode. Alles draait soepel!",
  },
  de: {
    subject: "CutiePawsPedia Admin Zusammenfassung: {periodStart} - {periodEnd}",
    preview: "{newPlaces} neue Orte, {newReviews} Bewertungen, {pendingClaims} ausstehende Ansprüche",
    heading: "Admin Dashboard Zusammenfassung",
    intro: "Systemaktivität Zusammenfassung von <strong>{periodStart}</strong> bis <strong>{periodEnd}</strong>:",
    coreMetricsHeading: "Kernmetriken",
    newPlaces: "Neue Orte",
    newReviews: "Neue Bewertungen",
    newLeads: "Neue Leads",
    newUsers: "Neue Benutzer",
    newBusinesses: "Neue Unternehmen",
    newClaims: "Neue Ansprüche",
    pendingClaims: "Ausstehende Ansprüche",
    systemHealthHeading: "Systemzustand",
    placesEnriched: "Orte angereichert",
    emailsSent: "E-Mails gesendet",
    errorCount: "Fehler protokolliert",
    topCategoriesHeading: "Top Kategorien",
    topCitiesHeading: "Top Städte",
    alertsHeading: "Warnungen & Probleme",
    alertWarning: "Warnung",
    alertError: "Fehler",
    alertInfo: "Info",
    cta: "Zum Admin Dashboard",
    noAlerts: "Keine Warnungen in diesem Zeitraum. Alles läuft reibungslos!",
  },
};

function tAdmin(locale: Locale, key: string, vars: Record<string, string | number> = {}): string {
  let text = adminDigestTranslations[locale]?.[key] || adminDigestTranslations.en[key] || key;
  Object.entries(vars).forEach(([k, v]) => {
    text = text.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
  });
  return text;
}

/**
 * Build email for admin digest (system stats summary)
 * Part of N2.5: Admin Digest
 */
export function buildDigestAdminEmail(params: {
  locale: string;
  adminName?: string;
  periodStart: string;
  periodEnd: string;
  stats: {
    newPlaces: number;
    newReviews: number;
    newLeads: number;
    newUsers: number;
    newBusinesses: number;
    newClaims: number;
    pendingClaims: number;
    placesEnriched?: number;
    emailsSent?: number;
    errorCount?: number;
    topCategories?: Array<{ name: string; count: number }>;
    topCities?: Array<{ name: string; count: number }>;
  };
  alerts?: Array<{
    type: "warning" | "error" | "info";
    message: string;
    count?: number;
  }>;
  dashboardUrl?: string;
}): EmailBuildResult {
  const { periodStart, periodEnd, stats, alerts, dashboardUrl } = params;
  const locale = getLocale(params.locale);
  const baseUrl = process.env.APP_BASE_URL || "https://cutiepawspedia.com";

  const subject = tAdmin(locale, "subject", { periodStart, periodEnd });
  const preview = tAdmin(locale, "preview", {
    newPlaces: stats.newPlaces,
    newReviews: stats.newReviews,
    pendingClaims: stats.pendingClaims,
  });

  // Core metrics stats
  const coreMetrics = [
    { value: stats.newPlaces, label: tAdmin(locale, "newPlaces"), color: BRAND.colors.primary },
    { value: stats.newReviews, label: tAdmin(locale, "newReviews"), color: BRAND.colors.success },
    { value: stats.newLeads, label: tAdmin(locale, "newLeads"), color: BRAND.colors.warning },
  ];

  const secondaryMetrics = [
    { value: stats.newUsers, label: tAdmin(locale, "newUsers"), color: BRAND.colors.primary },
    { value: stats.newBusinesses, label: tAdmin(locale, "newBusinesses"), color: BRAND.colors.success },
    { value: stats.newClaims, label: tAdmin(locale, "newClaims"), color: BRAND.colors.warning },
  ];

  // Pending claims (highlighted if > 0)
  const pendingClaimsColor = stats.pendingClaims > 0 ? BRAND.colors.error : BRAND.colors.success;

  // System health metrics (if available)
  let systemHealthHtml = "";
  if (stats.placesEnriched !== undefined || stats.emailsSent !== undefined || stats.errorCount !== undefined) {
    const healthStats = [];
    if (stats.placesEnriched !== undefined) {
      healthStats.push({ value: stats.placesEnriched, label: tAdmin(locale, "placesEnriched"), color: BRAND.colors.primary });
    }
    if (stats.emailsSent !== undefined) {
      healthStats.push({ value: stats.emailsSent, label: tAdmin(locale, "emailsSent"), color: BRAND.colors.success });
    }
    if (stats.errorCount !== undefined) {
      healthStats.push({
        value: stats.errorCount,
        label: tAdmin(locale, "errorCount"),
        color: stats.errorCount > 10 ? BRAND.colors.error : BRAND.colors.textMuted,
      });
    }
    systemHealthHtml = `
      ${buildHeading(tAdmin(locale, "systemHealthHeading"), { level: 2 })}
      ${buildCard(buildStatsRow(healthStats))}
    `;
  }

  // Top categories/cities
  let topItemsHtml = "";
  if (stats.topCategories && stats.topCategories.length > 0) {
    const categoryItems = stats.topCategories.slice(0, 5).map((cat) => `
      <tr>
        <td style="padding: 4px 0;">${cat.name}</td>
        <td style="padding: 4px 0; text-align: right; font-weight: ${STYLES.fontWeight.semibold};">${cat.count}</td>
      </tr>
    `).join("");
    topItemsHtml += `
      ${buildHeading(tAdmin(locale, "topCategoriesHeading"), { level: 2 })}
      ${buildCard(`
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          ${categoryItems}
        </table>
      `)}
    `;
  }

  if (stats.topCities && stats.topCities.length > 0) {
    const cityItems = stats.topCities.slice(0, 5).map((city) => `
      <tr>
        <td style="padding: 4px 0;">${city.name}</td>
        <td style="padding: 4px 0; text-align: right; font-weight: ${STYLES.fontWeight.semibold};">${city.count}</td>
      </tr>
    `).join("");
    topItemsHtml += `
      ${buildHeading(tAdmin(locale, "topCitiesHeading"), { level: 2 })}
      ${buildCard(`
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          ${cityItems}
        </table>
      `)}
    `;
  }

  // Alerts section
  let alertsHtml = "";
  if (alerts && alerts.length > 0) {
    const alertItems = alerts.map((alert) => {
      const alertColor = alert.type === "error" ? BRAND.colors.error : alert.type === "warning" ? BRAND.colors.warning : BRAND.colors.primary;
      const alertLabel = tAdmin(locale, `alert${alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}`);
      return `
        <tr>
          <td style="padding: ${STYLES.spacing.sm} 0; border-bottom: 1px solid ${BRAND.colors.border};">
            <span style="display: inline-block; padding: 2px 8px; background: ${alertColor}20; color: ${alertColor}; border-radius: ${STYLES.radius.sm}; font-size: ${STYLES.fontSize.sm}; font-weight: ${STYLES.fontWeight.semibold};">
              ${alertLabel}
            </span>
            <span style="margin-left: 8px;">${alert.message}</span>
            ${alert.count ? `<span style="color: ${BRAND.colors.textMuted};"> (${alert.count}x)</span>` : ""}
          </td>
        </tr>
      `;
    }).join("");

    alertsHtml = `
      ${buildHeading(tAdmin(locale, "alertsHeading"), { level: 2 })}
      ${buildCard(`
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          ${alertItems}
        </table>
      `, { accentColor: BRAND.colors.warning })}
    `;
  } else {
    alertsHtml = `
      ${buildHeading(tAdmin(locale, "alertsHeading"), { level: 2 })}
      ${buildCard(`
        <p style="margin: 0; text-align: center; color: ${BRAND.colors.success};">
          ${tAdmin(locale, "noAlerts")}
        </p>
      `, { accentColor: BRAND.colors.success })}
    `;
  }

  const bodyHtml = `
    ${buildHeading(tAdmin(locale, "heading"), { align: "center" })}
    ${buildParagraph(tAdmin(locale, "intro", { periodStart, periodEnd }), { align: "center" })}

    ${buildHeading(tAdmin(locale, "coreMetricsHeading"), { level: 2 })}
    ${buildCard(buildStatsRow(coreMetrics))}
    ${buildCard(buildStatsRow(secondaryMetrics))}

    ${buildCard(`
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="text-align: center;">
            <span style="font-size: ${STYLES.fontSize.xl}; font-weight: ${STYLES.fontWeight.bold}; color: ${pendingClaimsColor};">
              ${stats.pendingClaims}
            </span>
            <br>
            <span style="font-size: ${STYLES.fontSize.sm}; color: ${BRAND.colors.textMuted};">
              ${tAdmin(locale, "pendingClaims")}
            </span>
          </td>
        </tr>
      </table>
    `, { accentColor: pendingClaimsColor })}

    ${systemHealthHtml}
    ${topItemsHtml}
    ${alertsHtml}

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: ${STYLES.spacing.xl} 0;">
      <tr>
        <td align="center">
          ${buildButton(tAdmin(locale, "cta"), dashboardUrl || `${baseUrl}/admin`)}
        </td>
      </tr>
    </table>
  `;

  const html = buildBaseLayout({
    subject,
    previewText: preview,
    bodyHtml,
    locale,
  });

  // Build plain text version
  let textContent = `
${tAdmin(locale, "heading")}

${tAdmin(locale, "intro", { periodStart, periodEnd }).replace(/<[^>]*>/g, "")}

${tAdmin(locale, "coreMetricsHeading")}:
• ${tAdmin(locale, "newPlaces")}: ${stats.newPlaces}
• ${tAdmin(locale, "newReviews")}: ${stats.newReviews}
• ${tAdmin(locale, "newLeads")}: ${stats.newLeads}
• ${tAdmin(locale, "newUsers")}: ${stats.newUsers}
• ${tAdmin(locale, "newBusinesses")}: ${stats.newBusinesses}
• ${tAdmin(locale, "newClaims")}: ${stats.newClaims}
• ${tAdmin(locale, "pendingClaims")}: ${stats.pendingClaims}
`;

  if (stats.placesEnriched !== undefined || stats.emailsSent !== undefined || stats.errorCount !== undefined) {
    textContent += `\n${tAdmin(locale, "systemHealthHeading")}:\n`;
    if (stats.placesEnriched !== undefined) textContent += `• ${tAdmin(locale, "placesEnriched")}: ${stats.placesEnriched}\n`;
    if (stats.emailsSent !== undefined) textContent += `• ${tAdmin(locale, "emailsSent")}: ${stats.emailsSent}\n`;
    if (stats.errorCount !== undefined) textContent += `• ${tAdmin(locale, "errorCount")}: ${stats.errorCount}\n`;
  }

  if (stats.topCategories && stats.topCategories.length > 0) {
    textContent += `\n${tAdmin(locale, "topCategoriesHeading")}:\n`;
    stats.topCategories.slice(0, 5).forEach((cat) => {
      textContent += `• ${cat.name}: ${cat.count}\n`;
    });
  }

  if (stats.topCities && stats.topCities.length > 0) {
    textContent += `\n${tAdmin(locale, "topCitiesHeading")}:\n`;
    stats.topCities.slice(0, 5).forEach((city) => {
      textContent += `• ${city.name}: ${city.count}\n`;
    });
  }

  textContent += `\n${tAdmin(locale, "alertsHeading")}:\n`;
  if (alerts && alerts.length > 0) {
    alerts.forEach((alert) => {
      const alertLabel = tAdmin(locale, `alert${alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}`);
      textContent += `• [${alertLabel}] ${alert.message}${alert.count ? ` (${alert.count}x)` : ""}\n`;
    });
  } else {
    textContent += tAdmin(locale, "noAlerts") + "\n";
  }

  textContent += `\n${tAdmin(locale, "cta")}: ${dashboardUrl || `${baseUrl}/admin`}`;

  const text = buildPlainTextLayout({
    bodyText: textContent.trim(),
    locale,
  });

  return { subject, html, text };
}
