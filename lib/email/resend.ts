import { Resend } from "resend";

// Check if Resend is configured
const apiKey = process.env.RESEND_API_KEY;
export const isResendConfigured = Boolean(apiKey);

// Resend Segment ID for CutiePawsPedia newsletter
// Segments replaced Audiences in Resend's new system
const NEWSLETTER_SEGMENT_ID = "7bdb130e-e541-459b-b451-6a53926ec889";

// Create Resend client (only if configured)
function createResendClient() {
  if (!apiKey) {
    console.warn("Resend not configured - email features will be disabled");
    return null;
  }
  return new Resend(apiKey);
}

export const resend = createResendClient();

// =============================================================================
// SEGMENT / NEWSLETTER FUNCTIONS
// =============================================================================

/**
 * Add a contact to the CutiePawsPedia newsletter segment
 * Uses Resend's new Segments system (replaces deprecated Audiences)
 *
 * Flow:
 * 1. Create contact (or get existing)
 * 2. Add contact to segment
 */
export async function addToNewsletterAudience(data: {
  email: string;
  firstName?: string;
  lastName?: string;
}) {
  if (!resend) {
    console.warn("Resend not configured - contact not added to segment");
    return { success: false, error: "Email service not configured" };
  }

  try {
    // Step 1: Create contact (or it may already exist)
    const { data: contact, error: createError } = await resend.contacts.create({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      unsubscribed: false,
    });

    // If contact already exists, that's fine - we'll still add to segment
    if (createError && !createError.message?.includes("already exists")) {
      console.error("Failed to create contact:", createError);
      return { success: false, error: createError.message };
    }

    const isExistingContact = createError?.message?.includes("already exists");
    if (isExistingContact) {
      console.log(`Contact ${data.email} already exists`);
    }

    // Step 2: Add contact to the newsletter segment using SDK
    // Can use email directly - no need to fetch contactId first
    const { data: segmentData, error: segmentError } =
      await resend.contacts.segments.add({
        email: data.email,
        segmentId: NEWSLETTER_SEGMENT_ID,
      });

    if (segmentError) {
      // If already in segment, that's fine
      if (segmentError.message?.includes("already")) {
        console.log(`Contact ${data.email} already in segment`);
        return { success: true, alreadyExists: true };
      }
      console.error("Failed to add contact to segment:", segmentError);
      // Contact was created, just segment addition failed - partial success
      return { success: true, warning: "Contact created but segment addition failed" };
    }

    console.log(`✅ Added ${data.email} to newsletter segment`);
    return {
      success: true,
      alreadyExists: isExistingContact,
      data: segmentData,
    };
  } catch (error) {
    console.error("Error adding contact to segment:", error);
    return { success: false, error: "Failed to add contact to segment" };
  }
}

/**
 * Remove a contact from the newsletter segment (unsubscribe)
 * Note: This removes from segment and marks contact as globally unsubscribed
 */
export async function removeFromNewsletterAudience(email: string) {
  if (!resend) {
    return { success: false, error: "Email service not configured" };
  }

  try {
    // Remove from segment using SDK
    const { error: removeError } = await resend.contacts.segments.remove({
      email,
      segmentId: NEWSLETTER_SEGMENT_ID,
    });

    if (removeError && !removeError.message?.includes("not found")) {
      console.error("Failed to remove from segment:", removeError);
    }

    // Also mark contact as unsubscribed globally
    await resend.contacts.update({
      email,
      unsubscribed: true,
    });

    console.log(`✅ Removed ${email} from newsletter segment and marked as unsubscribed`);
    return { success: true };
  } catch (error) {
    console.error("Error removing contact from segment:", error);
    return { success: false, error: "Failed to remove contact" };
  }
}

// Email templates
export const emailTemplates = {
  /**
   * Welcome email for newsletter subscribers
   */
  welcomeNewsletter: (email: string) => ({
    from: "CutiePawsPedia <hello@cutiepawspedia.com>",
    to: email,
    subject: "Welcome to CutiePawsPedia Newsletter! 🐾",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1F2937; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #FF8C73; margin-bottom: 10px;">🐾 CutiePawsPedia</h1>
          </div>

          <h2 style="color: #1F2937;">Welcome to our newsletter!</h2>

          <p>Thank you for subscribing to the CutiePawsPedia newsletter. You'll now receive:</p>

          <ul style="color: #4B5563;">
            <li>Tips for finding the best pet services in your area</li>
            <li>New listings and featured businesses</li>
            <li>Exclusive deals and promotions</li>
            <li>Pet care tips and advice</li>
          </ul>

          <p style="margin-top: 30px;">
            <a href="https://cutiepawspedia.com" style="display: inline-block; background-color: #FF8C73; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;">
              Explore CutiePawsPedia
            </a>
          </p>

          <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">

          <p style="color: #6B7280; font-size: 12px;">
            You received this email because you subscribed to our newsletter.
            <br>
            <a href="https://cutiepawspedia.com/unsubscribe" style="color: #FF8C73;">Unsubscribe</a>
          </p>
        </body>
      </html>
    `,
  }),

  /**
   * Lead notification email for businesses
   */
  leadNotification: (data: {
    businessEmail: string;
    businessName: string;
    leadName: string;
    leadEmail: string;
    leadPhone?: string;
    message?: string;
  }) => ({
    from: "CutiePawsPedia <hello@cutiepawspedia.com>",
    to: data.businessEmail,
    subject: `New inquiry for ${data.businessName}! 📬`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1F2937; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #FF8C73; margin-bottom: 10px;">🐾 CutiePawsPedia</h1>
          </div>

          <h2 style="color: #1F2937;">You have a new inquiry!</h2>

          <div style="background-color: #F9FAFB; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>From:</strong> ${data.leadName}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.leadEmail}" style="color: #FF8C73;">${data.leadEmail}</a></p>
            ${data.leadPhone ? `<p><strong>Phone:</strong> ${data.leadPhone}</p>` : ""}
            ${data.message ? `<p><strong>Message:</strong><br>${data.message}</p>` : ""}
          </div>

          <p>Reply directly to this inquiry to connect with your potential customer!</p>

          <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">

          <p style="color: #6B7280; font-size: 12px;">
            This inquiry was submitted through CutiePawsPedia.
          </p>
        </body>
      </html>
    `,
  }),
};

// Helper function to send emails
export async function sendEmail(options: {
  from: string;
  to: string;
  subject: string;
  html: string;
  tags?: { name: string; value: string }[];
}) {
  if (!resend) {
    console.warn("Resend not configured - email not sent");
    return { success: false, error: "Email service not configured" };
  }

  try {
    const { data, error } = await resend.emails.send({
      ...options,
      tags: [
        { name: "platform", value: "cutiepawspedia" },
        ...(options.tags || []),
      ],
    });

    if (error) {
      console.error("Failed to send email:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: "Failed to send email" };
  }
}

// Send lead notification to business
export async function sendLeadNotification(data: {
  businessEmail: string;
  businessName: string;
  leadName: string;
  leadEmail: string;
  leadPhone?: string;
  leadMessage?: string;
  placeName: string;
  placeCity: string;
}) {
  const template = emailTemplates.leadNotification({
    businessEmail: data.businessEmail,
    businessName: data.businessName,
    leadName: data.leadName,
    leadEmail: data.leadEmail,
    leadPhone: data.leadPhone,
    message: data.leadMessage,
  });

  return sendEmail(template);
}

// Verification email translations
const verificationEmailTranslations = {
  nl: {
    subject: (placeName: string) => `Verificatiecode voor ${placeName}`,
    title: "Bevestig je eigendom",
    intro: (placeName: string, placeCity: string) =>
      `Je hebt een claim aangevraagd voor <strong>${placeName}</strong> in ${placeCity}.`,
    instruction: "Gebruik onderstaande verificatiecode om je eigendom te bevestigen:",
    validUntil: (expiry: string) => `<strong>Let op:</strong> Deze code is geldig tot ${expiry}.`,
    ignore: "Heb je deze claim niet aangevraagd? Dan kun je deze email negeren.",
    footer: "Dit is een automatisch bericht van CutiePawsPedia.",
    dateLocale: "nl-NL",
  },
  en: {
    subject: (placeName: string) => `Verification code for ${placeName}`,
    title: "Confirm your ownership",
    intro: (placeName: string, placeCity: string) =>
      `You have requested to claim <strong>${placeName}</strong> in ${placeCity}.`,
    instruction: "Use the verification code below to confirm your ownership:",
    validUntil: (expiry: string) => `<strong>Note:</strong> This code is valid until ${expiry}.`,
    ignore: "If you did not request this claim, you can ignore this email.",
    footer: "This is an automated message from CutiePawsPedia.",
    dateLocale: "en-US",
  },
  de: {
    subject: (placeName: string) => `Verifizierungscode für ${placeName}`,
    title: "Bestätigen Sie Ihr Eigentum",
    intro: (placeName: string, placeCity: string) =>
      `Sie haben einen Anspruch auf <strong>${placeName}</strong> in ${placeCity} gestellt.`,
    instruction: "Verwenden Sie den folgenden Verifizierungscode, um Ihr Eigentum zu bestätigen:",
    validUntil: (expiry: string) => `<strong>Hinweis:</strong> Dieser Code ist gültig bis ${expiry}.`,
    ignore: "Wenn Sie diesen Anspruch nicht gestellt haben, können Sie diese E-Mail ignorieren.",
    footer: "Dies ist eine automatische Nachricht von CutiePawsPedia.",
    dateLocale: "de-DE",
  },
  fr: {
    subject: (placeName: string) => `Code de vérification pour ${placeName}`,
    title: "Confirmez votre propriété",
    intro: (placeName: string, placeCity: string) =>
      `Vous avez demandé à revendiquer <strong>${placeName}</strong> à ${placeCity}.`,
    instruction: "Utilisez le code de vérification ci-dessous pour confirmer votre propriété :",
    validUntil: (expiry: string) => `<strong>Remarque :</strong> Ce code est valide jusqu'au ${expiry}.`,
    ignore: "Si vous n'avez pas fait cette demande, vous pouvez ignorer cet e-mail.",
    footer: "Ceci est un message automatique de CutiePawsPedia.",
    dateLocale: "fr-FR",
  },
};

type SupportedLocale = keyof typeof verificationEmailTranslations;

// Send claim verification code email
export async function sendClaimVerificationCode(data: {
  to: string;
  code: string;
  placeName: string;
  placeCity: string;
  expiresAt: Date;
  locale?: string;
}) {
  // Get translations for locale, fallback to 'en'
  const locale = (data.locale && data.locale in verificationEmailTranslations
    ? data.locale
    : "en") as SupportedLocale;
  const t = verificationEmailTranslations[locale];

  const formattedExpiry = data.expiresAt.toLocaleString(t.dateLocale, {
    dateStyle: "long",
    timeStyle: "short",
  });

  return sendEmail({
    from: "CutiePawsPedia <noreply@cutiepawspedia.com>",
    to: data.to,
    subject: t.subject(data.placeName),
    tags: [
      { name: "type", value: "claim-verification" },
      { name: "locale", value: locale },
    ],
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1F2937; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #FF8C73; margin-bottom: 10px;">🐾 CutiePawsPedia</h1>
          </div>

          <h2 style="color: #1F2937;">${t.title}</h2>

          <p>${t.intro(data.placeName, data.placeCity)}</p>

          <p>${t.instruction}</p>

          <div style="background-color: #F3F4F6; padding: 30px; border-radius: 12px; text-align: center; margin: 30px 0;">
            <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #1F2937; font-family: monospace;">
              ${data.code}
            </div>
          </div>

          <p style="color: #6B7280; font-size: 14px;">
            ${t.validUntil(formattedExpiry)}
          </p>

          <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">

          <p style="color: #6B7280; font-size: 12px;">
            ${t.ignore}
            <br><br>
            ${t.footer}
          </p>
        </body>
      </html>
    `,
  });
}

// Send new claim notification to admin
export async function sendNewClaimNotification(data: {
  claimId: number;
  placeName: string;
  placeAddress?: string;
  placeCity: string;
  placeCountry: string;
  userName?: string;
  userEmail: string;
  businessName: string;
  businessRole: string;
  message?: string;
}) {
  const adminEmail = process.env.ADMIN_CLAIMS_EMAIL || "hello@cutiepawspedia.com";
  const adminUrl = process.env.APP_BASE_URL || "https://cutiepawspedia.com";

  return sendEmail({
    from: "CutiePawsPedia <hello@cutiepawspedia.com>",
    to: adminEmail,
    subject: `[New Claim] ${data.placeName} - ${data.placeCity}`,
    tags: [
      { name: "type", value: "admin-notification" },
      { name: "action", value: "new-claim" },
    ],
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1F2937; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #FF8C73; margin-bottom: 10px;">🐾 CutiePawsPedia</h1>
          </div>

          <h2 style="color: #1F2937;">New Place Claim Request</h2>

          <div style="background-color: #FEF3C7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #F59E0B;">
            <strong>Claim ID:</strong> #${data.claimId}
          </div>

          <h3 style="color: #4B5563; margin-top: 25px;">Place Details</h3>
          <div style="background-color: #F9FAFB; padding: 20px; border-radius: 8px; margin: 10px 0;">
            <p style="margin: 0 0 8px 0;"><strong>Name:</strong> ${data.placeName}</p>
            ${data.placeAddress ? `<p style="margin: 0 0 8px 0;"><strong>Address:</strong> ${data.placeAddress}</p>` : ""}
            <p style="margin: 0;"><strong>Location:</strong> ${data.placeCity}, ${data.placeCountry}</p>
          </div>

          <h3 style="color: #4B5563; margin-top: 25px;">Claimant Information</h3>
          <div style="background-color: #F9FAFB; padding: 20px; border-radius: 8px; margin: 10px 0;">
            <p style="margin: 0 0 8px 0;"><strong>Name:</strong> ${data.userName || "Not provided"}</p>
            <p style="margin: 0 0 8px 0;"><strong>Email:</strong> <a href="mailto:${data.userEmail}" style="color: #FF8C73;">${data.userEmail}</a></p>
            <p style="margin: 0 0 8px 0;"><strong>Business Name:</strong> ${data.businessName}</p>
            <p style="margin: 0;"><strong>Role:</strong> ${data.businessRole}</p>
          </div>

          ${data.message ? `
          <h3 style="color: #4B5563; margin-top: 25px;">Message</h3>
          <div style="background-color: #F9FAFB; padding: 20px; border-radius: 8px; margin: 10px 0;">
            <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
          </div>
          ` : ""}

          <p style="margin-top: 30px;">
            <a href="${adminUrl}/en/admin/claims" style="display: inline-block; background-color: #FF8C73; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;">
              Review Claim in Admin Panel
            </a>
          </p>

          <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">

          <p style="color: #6B7280; font-size: 12px;">
            This is an automated notification from CutiePawsPedia.
          </p>
        </body>
      </html>
    `,
  });
}
