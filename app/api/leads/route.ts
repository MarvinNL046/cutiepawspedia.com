import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { leads, places } from "@/db/schema";
import { eq } from "drizzle-orm";
import { sendLeadNotification } from "@/lib/email/resend";

// Lead submission schema
const leadSchema = z.object({
  placeId: z.number().int().positive(),
  name: z.string().min(2, "Name must be at least 2 characters").max(255),
  email: z.string().email("Invalid email address"),
  phone: z.string().max(50).optional(),
  message: z.string().max(2000).optional(),
  source: z.string().max(100).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = leadSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation error", details: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { placeId, name, email, phone, message, source } = result.data;

    // Check if database is available
    if (!db) {
      return NextResponse.json(
        { error: "Service temporarily unavailable" },
        { status: 503 }
      );
    }

    // Get place details for the notification
    const place = await db.query.places.findFirst({
      where: eq(places.id, placeId),
      with: {
        city: {
          with: {
            country: true,
          },
        },
      },
    });

    if (!place) {
      return NextResponse.json(
        { error: "Business not found" },
        { status: 404 }
      );
    }

    // Insert the lead
    const [newLead] = await db
      .insert(leads)
      .values({
        placeId,
        name,
        email,
        phone: phone || null,
        message: message || null,
        source: source || "website",
      })
      .returning();

    // Send email notification to the business
    if (place.email) {
      try {
        await sendLeadNotification({
          businessEmail: place.email,
          businessName: place.name,
          leadName: name,
          leadEmail: email,
          leadPhone: phone,
          leadMessage: message,
          placeName: place.name,
          placeCity: place.city?.name || "",
        });
      } catch (emailError) {
        // Log but don't fail the request if email fails
        console.error("Failed to send lead notification email:", emailError);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been sent successfully!",
        leadId: newLead.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry. Please try again." },
      { status: 500 }
    );
  }
}

// Get leads for a business (admin/business owner only - to be protected later)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const placeId = searchParams.get("placeId");

    if (!placeId) {
      return NextResponse.json(
        { error: "placeId is required" },
        { status: 400 }
      );
    }

    if (!db) {
      return NextResponse.json(
        { error: "Service temporarily unavailable" },
        { status: 503 }
      );
    }

    const placeLeads = await db.query.leads.findMany({
      where: eq(leads.placeId, parseInt(placeId, 10)),
      orderBy: (leads, { desc }) => [desc(leads.createdAt)],
      limit: 100,
    });

    return NextResponse.json({ leads: placeLeads });
  } catch (error) {
    console.error("Get leads error:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
