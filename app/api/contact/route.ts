import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail, addToNewsletterAudience } from "@/lib/email/resend";
import {
  getClientIP,
  createRateLimiter,
  rateLimitExceededResponse,
} from "@/lib/rateLimit";

// Rate limiter: max 3 contact messages per 10 minutes per IP
const contactRateLimiter = createRateLimiter({
  maxRequests: 3,
  windowMs: 10 * 60 * 1000, // 10 minutes
});

// Validation schema
const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
  subscribeNewsletter: z.boolean().optional(),
});

/**
 * POST /api/contact
 * Handle contact form submissions
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    const rateLimitResult = await contactRateLimiter(clientIP);

    if (!rateLimitResult.allowed) {
      return rateLimitExceededResponse(
        "Too many messages. Please wait a few minutes before trying again."
      );
    }

    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, subject, message, subscribeNewsletter } = result.data;

    // Send email to admin/support
    const adminEmail = process.env.CONTACT_EMAIL || "hello@cutiepawspedia.com";

    const emailResult = await sendEmail({
      from: "CutiePawsPedia <noreply@cutiepawspedia.com>",
      to: adminEmail,
      subject: `[Contact] ${subject}`,
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

            <h2 style="color: #1F2937;">New Contact Message</h2>

            <div style="background-color: #F9FAFB; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0 0 8px 0;"><strong>From:</strong> ${firstName} ${lastName}</p>
              <p style="margin: 0 0 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #FF8C73;">${email}</a></p>
              <p style="margin: 0;"><strong>Subject:</strong> ${subject}</p>
            </div>

            <h3 style="color: #4B5563; margin-top: 25px;">Message</h3>
            <div style="background-color: #F9FAFB; padding: 20px; border-radius: 8px; margin: 10px 0;">
              <p style="margin: 0; white-space: pre-wrap;">${message}</p>
            </div>

            <p style="margin-top: 20px;">
              <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="display: inline-block; background-color: #FF8C73; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;">
                Reply to ${firstName}
              </a>
            </p>

            <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">

            <p style="color: #6B7280; font-size: 12px;">
              This message was sent via the CutiePawsPedia contact form.
              <br>
              Newsletter opt-in: ${subscribeNewsletter ? "Yes" : "No"}
            </p>
          </body>
        </html>
      `,
      tags: [
        { name: "type", value: "contact-form" },
      ],
    });

    if (!emailResult.success) {
      console.error("Failed to send contact email:", emailResult.error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 }
      );
    }

    // Add to newsletter segment if opted in
    if (subscribeNewsletter) {
      const audienceResult = await addToNewsletterAudience({
        email,
        firstName,
        lastName,
      });

      if (audienceResult.success) {
        console.log(`✅ Contact ${email} added to newsletter segment`);
      } else {
        console.warn(`Failed to add contact to newsletter:`, audienceResult.error);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
