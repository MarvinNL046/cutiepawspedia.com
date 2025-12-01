import { NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail, emailTemplates, isResendConfigured } from "@/lib/email/resend";

// Validation schema
const subscribeSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

/**
 * POST /api/email/subscribe
 * Subscribe to the newsletter
 */
export async function POST(request: Request) {
  try {
    // Check if Resend is configured
    if (!isResendConfigured) {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 503 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const result = subscribeSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email } = result.data;

    // Send welcome email
    const emailResult = await sendEmail(emailTemplates.welcomeNewsletter(email));

    if (!emailResult.success) {
      return NextResponse.json(
        { error: "Failed to subscribe. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to the newsletter!",
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
