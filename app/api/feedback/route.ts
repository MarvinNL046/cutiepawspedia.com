import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/email/resend";
import { db } from "@/db";
import { feedback } from "@/db/schema";
import {
  getClientIP,
  createRateLimiter,
  rateLimitExceededResponse,
} from "@/lib/rateLimit";

// Rate limiter: max 5 feedback submissions per hour per IP
const feedbackRateLimiter = createRateLimiter({
  maxRequests: 5,
  windowMs: 60 * 60 * 1000, // 1 hour
});

// Validation schema
const feedbackSchema = z.object({
  feedback: z.string().min(5, "Feedback must be at least 5 characters").max(2000),
  email: z.string().email().optional().or(z.literal("")),
  type: z.enum(["bug", "idea", "other"]),
});

const typeLabels = {
  bug: "🐛 Bug Report",
  idea: "💡 Feature Idea",
  other: "💬 General Feedback",
};

/**
 * POST /api/feedback
 * Handle feedback submissions from the feedback ribbon
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    const rateLimitResult = await feedbackRateLimiter(clientIP);

    if (!rateLimitResult.allowed) {
      return rateLimitExceededResponse(
        "Too many feedback submissions. Please try again later."
      );
    }

    const body = await request.json();
    const result = feedbackSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { feedback: feedbackText, email, type } = result.data;

    // Get user agent and page info from headers
    const userAgent = request.headers.get("user-agent") || "Unknown";
    const referer = request.headers.get("referer") || "Unknown";

    // Send email to admin
    const adminEmail = process.env.FEEDBACK_EMAIL || process.env.CONTACT_EMAIL || "hello@cutiepawspedia.com";

    // Save feedback to database
    try {
      await db.insert(feedback).values({
        type,
        message: feedbackText,
        email: email || null,
        page: referer,
        userAgent,
        ipAddress: clientIP,
      });
    } catch (dbError) {
      console.error("Failed to save feedback to database:", dbError);
      // Continue anyway - email is the primary delivery method
    }

    const emailResult = await sendEmail({
      from: "CutiePawsPedia <noreply@cutiepawspedia.com>",
      to: adminEmail,
      replyTo: email || undefined,
      subject: `[Feedback] ${typeLabels[type]}`,
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

            <div style="background-color: ${type === 'bug' ? '#FEE2E2' : type === 'idea' ? '#FEF3C7' : '#DBEAFE'}; padding: 12px 16px; border-radius: 8px; margin-bottom: 20px;">
              <strong style="font-size: 18px;">${typeLabels[type]}</strong>
            </div>

            <h3 style="color: #4B5563; margin-top: 25px;">Feedback</h3>
            <div style="background-color: #F9FAFB; padding: 20px; border-radius: 8px; margin: 10px 0;">
              <p style="margin: 0; white-space: pre-wrap;">${feedbackText}</p>
            </div>

            ${email ? `
            <h3 style="color: #4B5563; margin-top: 25px;">Contact</h3>
            <div style="background-color: #F9FAFB; padding: 15px; border-radius: 8px; margin: 10px 0;">
              <a href="mailto:${email}" style="color: #FF8C73;">${email}</a>
            </div>
            ` : ''}

            <h3 style="color: #4B5563; margin-top: 25px;">Technical Details</h3>
            <div style="background-color: #F9FAFB; padding: 15px; border-radius: 8px; margin: 10px 0; font-size: 12px; color: #6B7280;">
              <p style="margin: 0 0 5px 0;"><strong>Page:</strong> ${referer}</p>
              <p style="margin: 0 0 5px 0;"><strong>IP:</strong> ${clientIP}</p>
              <p style="margin: 0;"><strong>User Agent:</strong> ${userAgent}</p>
            </div>

            ${email ? `
            <p style="margin-top: 20px;">
              <a href="mailto:${email}?subject=Re: Your feedback on CutiePawsPedia" style="display: inline-block; background-color: #FF8C73; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;">
                Reply to User
              </a>
            </p>
            ` : ''}

            <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">

            <p style="color: #6B7280; font-size: 12px;">
              This feedback was submitted via the CutiePawsPedia feedback ribbon.
            </p>
          </body>
        </html>
      `,
      tags: [
        { name: "type", value: "feedback" },
        { name: "feedback-type", value: type },
      ],
    });

    if (!emailResult.success) {
      console.error("Failed to send feedback email:", emailResult.error);
      return NextResponse.json(
        { error: "Failed to submit feedback. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for your feedback!",
    });
  } catch (error) {
    console.error("Feedback submission error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
