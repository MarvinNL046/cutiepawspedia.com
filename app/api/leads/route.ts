import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { leads, places } from "@/db/schema";
import { eq } from "drizzle-orm";
import { sendNotification } from "@/lib/notifications";
import { chargeForLead } from "@/db/queries/credits";
import {
  getLeadPriceForBusiness,
  shouldAutoCharge,
} from "@/lib/pricing/getLeadPriceForBusiness";
import {
  getClientIP,
  leadsRateLimiter,
  rateLimitExceededResponse,
} from "@/lib/rateLimit";
import { logAuditEvent } from "@/db/queries/auditLogs";

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
    // Rate limiting: max 5 leads per 10 minutes per IP
    const clientIP = getClientIP(request);
    const rateLimitResult = await leadsRateLimiter(clientIP);

    if (!rateLimitResult.allowed) {
      console.warn(`Rate limit exceeded for leads from IP: ${clientIP}`);
      return rateLimitExceededResponse(
        "Too many lead submissions. Please wait a few minutes before trying again."
      );
    }

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

    // Get place details for the notification and business for charging
    const place = await db.query.places.findFirst({
      where: eq(places.id, placeId),
      with: {
        city: {
          with: {
            country: true,
          },
        },
        business: true, // Include business for auto-charging
      },
    });

    if (!place) {
      return NextResponse.json(
        { error: "Business not found" },
        { status: 404 }
      );
    }

    // Extract business from Drizzle relation (can be object or array)
    const business = Array.isArray(place.business) ? place.business[0] : place.business;

    // Insert the lead (include businessId for denormalization)
    const [newLead] = await db
      .insert(leads)
      .values({
        placeId,
        businessId: place.businessId, // Denormalized for quick lookups
        name,
        email,
        phone: phone || null,
        message: message || null,
        source: source || "website",
      })
      .returning();

    // Log LEAD_CREATED audit event
    logAuditEvent({
      actorRole: "public",
      eventType: "LEAD_CREATED",
      targetType: "lead",
      targetId: newLead.id,
      metadata: {
        placeId,
        businessId: place.businessId,
        source: source || "website",
      },
      ipAddress: clientIP,
    });

    // Auto-charge credits if business has auto-charge enabled
    let chargeResult: { success: boolean; error?: string } | null = null;
    if (business && shouldAutoCharge(business)) {
      // Calculate lead price using pricing engine
      const leadPriceCents = getLeadPriceForBusiness({
        business: business,
        place: { isPremium: place.isPremium, premiumLevel: place.premiumLevel },
      });

      // Attempt to charge credits
      chargeResult = await chargeForLead({
        businessId: business.id,
        leadId: newLead.id,
        priceCents: leadPriceCents,
      });

      if (chargeResult.success) {
        // Log LEAD_CHARGED audit event
        logAuditEvent({
          actorBusinessId: business.id,
          actorRole: "system",
          eventType: "LEAD_CHARGED",
          targetType: "lead",
          targetId: newLead.id,
          metadata: {
            placeId,
            priceCents: leadPriceCents,
          },
          ipAddress: clientIP,
        });
      } else {
        // Log the failure but don't block lead creation
        console.warn(
          `Failed to charge credits for lead ${newLead.id}:`,
          chargeResult.error
        );
      }
    }

    // Send email notification to the business
    if (place.email) {
      const baseUrl = process.env.APP_BASE_URL || "https://cutiepawspedia.com";
      sendNotification({
        type: "LEAD_NEW",
        leadId: newLead.id,
        placeId: place.id,
        placeName: place.name,
        businessEmail: place.email,
        businessId: place.businessId ?? undefined,
        leadName: name,
        leadEmail: email,
        leadPhone: phone,
        leadMessage: message,
        dashboardUrl: place.businessId ? `${baseUrl}/dashboard/business/${place.businessId}` : undefined,
      }).catch((emailError) => {
        // Log but don't fail the request if email fails
        console.error("Failed to send lead notification email:", emailError);
      });
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
