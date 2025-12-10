import { NextResponse } from "next/server";
import { z } from "zod";
import {
  sendEmail,
  emailTemplates,
  isResendConfigured,
  addToNewsletterAudience
} from "@/lib/email/resend";

// Validation schema
const subscribeSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

/**
 * POST /api/email/subscribe
 * Subscribe to the newsletter and add to Resend Audience
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

    const { email, firstName, lastName } = result.data;

    // Add to Resend Audience for marketing emails
    const audienceResult = await addToNewsletterAudience({
      email,
      firstName,
      lastName
    });

    if (!audienceResult.success) {
      console.error("Failed to add to audience:", audienceResult.error);
      // Continue anyway - we can still send the welcome email
    }

    // Check if already subscribed
    if (audienceResult.alreadyExists) {
      return NextResponse.json({
        success: true,
        message: "You're already subscribed to our newsletter!",
        alreadySubscribed: true,
      });
    }

    // Send welcome email
    const emailResult = await sendEmail({
      ...emailTemplates.welcomeNewsletter(email),
      tags: [
        { name: "type", value: "newsletter-welcome" },
      ],
    });

    if (!emailResult.success) {
      // Contact was added to audience, but welcome email failed
      // This is still a success
      console.error("Welcome email failed, but contact added to audience");
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
