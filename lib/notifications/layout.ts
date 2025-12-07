/**
 * Email Layout System v2
 *
 * Professional, responsive email templates with branding and localization.
 * Uses table-based layout for maximum email client compatibility.
 * Part of N2: Notifications v2 - Smart Logic, Pro Copy, Digests & Advanced Settings
 */

import type { Locale } from "./types";

// ============================================================================
// BRAND CONFIGURATION
// ============================================================================

export const BRAND = {
  name: "CutiePawsPedia",
  logo: "https://cutiepawspedia.com/logo.png", // Replace with actual CDN URL
  logoEmoji: "🐾",
  tagline: {
    en: "Find pet-friendly places near you",
    nl: "Vind diervriendelijke plekken bij jou in de buurt",
    de: "Finde tierfreundliche Orte in deiner Nähe",
  },
  colors: {
    primary: "#FF8C73", // Coral
    primaryDark: "#E67A63",
    secondary: "#1F2937", // Dark gray
    background: "#FFFFFF",
    cardBg: "#F9FAFB",
    text: "#1F2937",
    textMuted: "#6B7280",
    border: "#E5E7EB",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
  },
  social: {
    twitter: "https://twitter.com/cutiepawspedia",
    instagram: "https://instagram.com/cutiepawspedia",
    facebook: "https://facebook.com/cutiepawspedia",
  },
} as const;

// ============================================================================
// FOOTER TRANSLATIONS
// ============================================================================

const footerTranslations: Record<Locale, {
  unsubscribe: string;
  managePreferences: string;
  receivedBecause: string;
  allRights: string;
  address: string;
}> = {
  en: {
    unsubscribe: "Unsubscribe",
    managePreferences: "Manage email preferences",
    receivedBecause: "You received this email because you have an account at CutiePawsPedia.",
    allRights: "All rights reserved",
    address: "Netherlands",
  },
  nl: {
    unsubscribe: "Uitschrijven",
    managePreferences: "E-mailvoorkeuren beheren",
    receivedBecause: "Je ontvangt deze e-mail omdat je een account hebt bij CutiePawsPedia.",
    allRights: "Alle rechten voorbehouden",
    address: "Nederland",
  },
  de: {
    unsubscribe: "Abmelden",
    managePreferences: "E-Mail-Einstellungen verwalten",
    receivedBecause: "Sie erhalten diese E-Mail, weil Sie ein Konto bei CutiePawsPedia haben.",
    allRights: "Alle Rechte vorbehalten",
    address: "Niederlande",
  },
};

// ============================================================================
// STYLE SYSTEM
// ============================================================================

export const STYLES = {
  // Typography
  fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
  fontSize: {
    xs: "12px",
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "30px",
  },
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  lineHeight: {
    tight: "1.25",
    normal: "1.5",
    relaxed: "1.75",
  },

  // Spacing
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    "2xl": "48px",
  },

  // Border radius
  radius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    full: "9999px",
  },
} as const;

// ============================================================================
// COMPONENT BUILDERS
// ============================================================================

/**
 * Build a primary CTA button
 */
export function buildButton(text: string, href: string, options?: {
  variant?: "primary" | "secondary" | "outline";
  fullWidth?: boolean;
}): string {
  const variant = options?.variant || "primary";
  const fullWidth = options?.fullWidth || false;

  const baseStyle = `
    display: inline-block;
    padding: 14px 28px;
    font-size: ${STYLES.fontSize.base};
    font-weight: ${STYLES.fontWeight.semibold};
    text-decoration: none;
    border-radius: ${STYLES.radius.md};
    text-align: center;
    mso-padding-alt: 0;
    ${fullWidth ? "width: 100%; box-sizing: border-box;" : ""}
  `.trim().replace(/\s+/g, " ");

  const variantStyles = {
    primary: `background-color: ${BRAND.colors.primary}; color: #FFFFFF;`,
    secondary: `background-color: ${BRAND.colors.secondary}; color: #FFFFFF;`,
    outline: `background-color: transparent; color: ${BRAND.colors.primary}; border: 2px solid ${BRAND.colors.primary};`,
  };

  return `
    <!--[if mso]>
    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${href}" style="height:44px;v-text-anchor:middle;${fullWidth ? "width:100%;" : "width:180px;"}" arcsize="18%" ${variant === "primary" ? `fillcolor="${BRAND.colors.primary}"` : variant === "secondary" ? `fillcolor="${BRAND.colors.secondary}"` : `fillcolor="transparent"`} ${variant === "outline" ? `strokecolor="${BRAND.colors.primary}" strokeweight="2px"` : `stroke="f"`}>
    <w:anchorlock/>
    <center style="color:#${variant === "outline" ? BRAND.colors.primary.replace("#", "") : "ffffff"};font-family:sans-serif;font-size:16px;font-weight:600;">${text}</center>
    </v:roundrect>
    <![endif]-->
    <!--[if !mso]><!-->
    <a href="${href}" style="${baseStyle} ${variantStyles[variant]}" target="_blank">${text}</a>
    <!--<![endif]-->
  `.trim();
}

/**
 * Build a content card with optional border accent
 */
export function buildCard(content: string, options?: {
  accentColor?: string;
  padding?: string;
}): string {
  const accent = options?.accentColor;
  const padding = options?.padding || STYLES.spacing.lg;

  return `
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: ${STYLES.spacing.lg} 0;">
      <tr>
        <td style="
          background-color: ${BRAND.colors.cardBg};
          padding: ${padding};
          border-radius: ${STYLES.radius.md};
          ${accent ? `border-left: 4px solid ${accent};` : ""}
        ">
          ${content}
        </td>
      </tr>
    </table>
  `.trim();
}

/**
 * Build a stat display (number with label)
 */
export function buildStat(value: string | number, label: string, options?: {
  color?: string;
}): string {
  const color = options?.color || BRAND.colors.primary;

  return `
    <td align="center" style="padding: ${STYLES.spacing.md};">
      <div style="font-size: ${STYLES.fontSize["3xl"]}; font-weight: ${STYLES.fontWeight.bold}; color: ${color}; line-height: 1;">
        ${value}
      </div>
      <div style="font-size: ${STYLES.fontSize.sm}; color: ${BRAND.colors.textMuted}; margin-top: ${STYLES.spacing.xs};">
        ${label}
      </div>
    </td>
  `.trim();
}

/**
 * Build a stats row (multiple stats side by side)
 */
export function buildStatsRow(stats: Array<{ value: string | number; label: string; color?: string }>): string {
  const cells = stats.map((stat) => buildStat(stat.value, stat.label, { color: stat.color })).join("");

  return `
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: ${STYLES.spacing.lg} 0;">
      <tr>
        ${cells}
      </tr>
    </table>
  `.trim();
}

/**
 * Build star rating display
 */
export function buildStarRating(rating: number, options?: {
  size?: string;
  showNumeric?: boolean;
}): string {
  const size = options?.size || STYLES.fontSize.lg;
  const showNumeric = options?.showNumeric !== false;

  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  const stars = "★".repeat(fullStars) + (hasHalf ? "½" : "") + "☆".repeat(emptyStars);

  return `
    <span style="color: ${BRAND.colors.warning}; font-size: ${size}; letter-spacing: 2px;">
      ${stars}
    </span>
    ${showNumeric ? `<span style="color: ${BRAND.colors.textMuted}; font-size: ${STYLES.fontSize.sm}; margin-left: ${STYLES.spacing.sm};">(${rating.toFixed(1)})</span>` : ""}
  `.trim();
}

/**
 * Build a divider line
 */
export function buildDivider(): string {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: ${STYLES.spacing.xl} 0;">
      <tr>
        <td style="border-top: 1px solid ${BRAND.colors.border}; height: 1px; line-height: 1px; font-size: 1px;">&nbsp;</td>
      </tr>
    </table>
  `.trim();
}

// ============================================================================
// BASE LAYOUT BUILDER
// ============================================================================

export interface BaseLayoutOptions {
  subject: string;
  previewText: string;
  bodyHtml: string;
  locale: Locale;
  recipientEmail?: string;
  unsubscribeToken?: string;
}

/**
 * Build the base email layout with professional branding
 *
 * Features:
 * - Responsive table-based layout (works in all email clients)
 * - CutiePawsPedia branding (logo, colors)
 * - Localized footer with unsubscribe/manage preferences
 * - Preview text support
 * - Dark mode support hints
 * - MSO (Outlook) compatibility
 */
export function buildBaseLayout(options: BaseLayoutOptions): string {
  const { subject, previewText, bodyHtml, locale, recipientEmail, unsubscribeToken } = options;
  const baseUrl = process.env.APP_BASE_URL || "https://cutiepawspedia.com";
  const year = new Date().getFullYear();

  const ft = footerTranslations[locale] || footerTranslations.en;
  const tagline = BRAND.tagline[locale] || BRAND.tagline.en;

  // Unsubscribe URL with token if available
  const unsubscribeUrl = unsubscribeToken
    ? `${baseUrl}/unsubscribe?token=${unsubscribeToken}`
    : `${baseUrl}/${locale}/account/notifications`;

  const preferencesUrl = `${baseUrl}/${locale}/account/notifications`;

  return `
<!DOCTYPE html>
<html lang="${locale}" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${subject}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <style>
    table {border-collapse: collapse;}
    td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif; mso-line-height-rule: exactly;}
  </style>
  <![endif]-->
  <style>
    /* Reset styles */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
    a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }

    /* Responsive */
    @media screen and (max-width: 600px) {
      .email-container { width: 100% !important; max-width: 100% !important; }
      .fluid { max-width: 100% !important; height: auto !important; margin-left: auto !important; margin-right: auto !important; }
      .stack-column, .stack-column-center { display: block !important; width: 100% !important; max-width: 100% !important; direction: ltr !important; }
      .stack-column-center { text-align: center !important; }
      .center-on-narrow { text-align: center !important; display: block !important; margin-left: auto !important; margin-right: auto !important; float: none !important; }
      table.center-on-narrow { display: inline-block !important; }
      .mobile-padding { padding-left: 20px !important; padding-right: 20px !important; }
      .mobile-button { display: block !important; width: 100% !important; max-width: 100% !important; }
    }

    /* Dark mode */
    @media (prefers-color-scheme: dark) {
      .email-bg { background-color: #1a1a1a !important; }
      .darkmode-bg { background-color: #2d2d2d !important; }
      .darkmode-text { color: #f0f0f0 !important; }
      .darkmode-muted { color: #a0a0a0 !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #F3F4F6; font-family: ${STYLES.fontFamily};">
  <!-- Preview text (hidden) -->
  <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all;">
    ${previewText}
    ${"&nbsp;&zwnj;".repeat(30)}
  </div>

  <!-- Email wrapper -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #F3F4F6;" class="email-bg">
    <tr>
      <td align="center" style="padding: ${STYLES.spacing.xl} ${STYLES.spacing.md};">

        <!-- Email container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" class="email-container" style="max-width: 600px; width: 100%;">

          <!-- Header with logo -->
          <tr>
            <td style="padding: ${STYLES.spacing.lg} ${STYLES.spacing.xl}; text-align: center; background-color: ${BRAND.colors.background}; border-radius: ${STYLES.radius.lg} ${STYLES.radius.lg} 0 0;">
              <a href="${baseUrl}" style="text-decoration: none;">
                <span style="font-size: 32px; display: inline-block; vertical-align: middle;">${BRAND.logoEmoji}</span>
                <span style="font-size: ${STYLES.fontSize["2xl"]}; font-weight: ${STYLES.fontWeight.bold}; color: ${BRAND.colors.primary}; vertical-align: middle; margin-left: 8px;">
                  ${BRAND.name}
                </span>
              </a>
              <p style="margin: ${STYLES.spacing.sm} 0 0 0; font-size: ${STYLES.fontSize.sm}; color: ${BRAND.colors.textMuted};" class="darkmode-muted">
                ${tagline}
              </p>
            </td>
          </tr>

          <!-- Main content area -->
          <tr>
            <td style="background-color: ${BRAND.colors.background}; padding: ${STYLES.spacing.xl};" class="mobile-padding darkmode-bg">
              ${bodyHtml}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: ${BRAND.colors.background}; padding: ${STYLES.spacing.lg} ${STYLES.spacing.xl} ${STYLES.spacing.xl}; border-radius: 0 0 ${STYLES.radius.lg} ${STYLES.radius.lg};" class="darkmode-bg">
              <!-- Divider -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-top: 1px solid ${BRAND.colors.border}; padding-top: ${STYLES.spacing.lg};">

                    <!-- Footer links -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" style="padding-bottom: ${STYLES.spacing.md};">
                          <a href="${preferencesUrl}" style="color: ${BRAND.colors.primary}; text-decoration: none; font-size: ${STYLES.fontSize.sm}; margin: 0 ${STYLES.spacing.sm};">
                            ${ft.managePreferences}
                          </a>
                          <span style="color: ${BRAND.colors.border};">|</span>
                          <a href="${unsubscribeUrl}" style="color: ${BRAND.colors.textMuted}; text-decoration: none; font-size: ${STYLES.fontSize.sm}; margin: 0 ${STYLES.spacing.sm};">
                            ${ft.unsubscribe}
                          </a>
                        </td>
                      </tr>
                    </table>

                    <!-- Received because -->
                    <p style="margin: 0 0 ${STYLES.spacing.md} 0; font-size: ${STYLES.fontSize.xs}; color: ${BRAND.colors.textMuted}; text-align: center; line-height: ${STYLES.lineHeight.relaxed};" class="darkmode-muted">
                      ${ft.receivedBecause}
                      ${recipientEmail ? `<br>Sent to: ${recipientEmail}` : ""}
                    </p>

                    <!-- Copyright -->
                    <p style="margin: 0; font-size: ${STYLES.fontSize.xs}; color: ${BRAND.colors.textMuted}; text-align: center;" class="darkmode-muted">
                      &copy; ${year} ${BRAND.name}. ${ft.allRights}.
                      <br>${ft.address}
                    </p>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
        <!-- End email container -->

      </td>
    </tr>
  </table>
  <!-- End email wrapper -->
</body>
</html>
  `.trim();
}

// ============================================================================
// PLAIN TEXT LAYOUT BUILDER
// ============================================================================

export interface PlainTextLayoutOptions {
  bodyText: string;
  locale: Locale;
}

/**
 * Build plain text version of email
 */
export function buildPlainTextLayout(options: PlainTextLayoutOptions): string {
  const { bodyText, locale } = options;
  const baseUrl = process.env.APP_BASE_URL || "https://cutiepawspedia.com";
  const year = new Date().getFullYear();

  const ft = footerTranslations[locale] || footerTranslations.en;

  return `
${BRAND.logoEmoji} ${BRAND.name}
${BRAND.tagline[locale] || BRAND.tagline.en}

────────────────────────────────

${bodyText}

────────────────────────────────

${ft.managePreferences}: ${baseUrl}/${locale}/account/notifications
${ft.unsubscribe}: ${baseUrl}/${locale}/account/notifications

${ft.receivedBecause}

© ${year} ${BRAND.name}. ${ft.allRights}.
${ft.address}
  `.trim();
}

// ============================================================================
// HEADING BUILDERS
// ============================================================================

/**
 * Build a main heading (h1)
 */
export function buildHeading(text: string, options?: {
  level?: 1 | 2 | 3;
  align?: "left" | "center" | "right";
  color?: string;
}): string {
  const level = options?.level || 1;
  const align = options?.align || "left";
  const color = options?.color || BRAND.colors.secondary;

  const sizes = {
    1: STYLES.fontSize["2xl"],
    2: STYLES.fontSize.xl,
    3: STYLES.fontSize.lg,
  };

  const margins = {
    1: `0 0 ${STYLES.spacing.lg} 0`,
    2: `0 0 ${STYLES.spacing.md} 0`,
    3: `0 0 ${STYLES.spacing.sm} 0`,
  };

  const tag = `h${level}`;

  return `<${tag} style="margin: ${margins[level]}; font-size: ${sizes[level]}; font-weight: ${STYLES.fontWeight.bold}; color: ${color}; text-align: ${align}; line-height: ${STYLES.lineHeight.tight};" class="darkmode-text">${text}</${tag}>`;
}

/**
 * Build a paragraph
 */
export function buildParagraph(text: string, options?: {
  muted?: boolean;
  align?: "left" | "center" | "right";
}): string {
  const muted = options?.muted || false;
  const align = options?.align || "left";

  return `<p style="margin: 0 0 ${STYLES.spacing.md} 0; font-size: ${STYLES.fontSize.base}; color: ${muted ? BRAND.colors.textMuted : BRAND.colors.text}; text-align: ${align}; line-height: ${STYLES.lineHeight.relaxed};" class="${muted ? "darkmode-muted" : "darkmode-text"}">${text}</p>`;
}

/**
 * Build a list (bullet or numbered)
 */
export function buildList(items: string[], options?: {
  ordered?: boolean;
}): string {
  const ordered = options?.ordered || false;
  const tag = ordered ? "ol" : "ul";

  const listItems = items.map((item) => `
    <li style="margin-bottom: ${STYLES.spacing.xs}; color: ${BRAND.colors.text}; line-height: ${STYLES.lineHeight.normal};" class="darkmode-text">
      ${item}
    </li>
  `).join("");

  return `<${tag} style="margin: ${STYLES.spacing.md} 0; padding-left: ${STYLES.spacing.lg};">${listItems}</${tag}>`;
}
