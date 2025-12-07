import { Resend } from "resend";

// Check if Resend is configured
const apiKey = process.env.RESEND_API_KEY;
export const isResendConfigured = Boolean(apiKey);

// Create Resend client (only if configured)
function createResendClient() {
  if (!apiKey) {
    console.warn("Resend not configured - email features will be disabled");
    return null;
  }
  return new Resend(apiKey);
}

export const resend = createResendClient();

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
}) {
  if (!resend) {
    console.warn("Resend not configured - email not sent");
    return { success: false, error: "Email service not configured" };
  }

  try {
    const { data, error } = await resend.emails.send(options);

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
