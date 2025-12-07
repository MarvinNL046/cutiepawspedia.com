"use server";

import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId } from "@/db/queries/users";
import { createClaim, canClaimPlace } from "@/db/queries/claims";
import { getPlaceById } from "@/db/queries/listings";
import { sendNewClaimNotification } from "@/lib/email/resend";
import { claimsRateLimiter } from "@/lib/rateLimit";
import { logAuditEvent } from "@/db/queries/auditLogs";

interface CreateClaimInput {
  placeId: number;
  businessName: string;
  website?: string;
  contactEmail: string;
  contactPhone?: string;
  businessRole: string;
  message?: string;
}

interface CreateClaimResult {
  success: boolean;
  claimId?: number;
  error?: string;
}

export async function createPlaceClaimAction(
  input: CreateClaimInput
): Promise<CreateClaimResult> {
  try {
    // Auth check - get user from session, not from client input
    const stackUser = await stackServerApp?.getUser();
    if (!stackUser) {
      return { success: false, error: "Please sign in to submit a claim" };
    }

    const user = await getUserByStackAuthId(stackUser.id);
    if (!user) {
      return { success: false, error: "User not found" };
    }

    // Validate input
    if (!input.placeId) {
      return { success: false, error: "Missing required fields" };
    }

    // Rate limiting: max 3 claims per day per user
    const rateLimitResult = await claimsRateLimiter(user.id.toString());
    if (!rateLimitResult.allowed) {
      console.warn(
        `Rate limit exceeded for claims - userId: ${user.id}`
      );
      return {
        success: false,
        error: "Too many claim submissions. Please try again tomorrow.",
      };
    }

    if (!input.businessName?.trim()) {
      return { success: false, error: "Business name is required" };
    }

    if (!input.businessRole?.trim()) {
      return { success: false, error: "Business role is required" };
    }

    if (input.message && input.message.length > 2000) {
      return { success: false, error: "Message is too long (max 2000 characters)" };
    }

    // Check if place can be claimed
    const canClaim = await canClaimPlace(input.placeId);
    if (!canClaim.canClaim) {
      return { success: false, error: canClaim.reason || "This place cannot be claimed" };
    }

    // Get place info for the notification email
    const place = await getPlaceById(input.placeId);

    if (!place) {
      return { success: false, error: "Place not found" };
    }

    // Build the notes field with all claim details
    const notesData = {
      businessName: input.businessName,
      website: input.website,
      contactEmail: input.contactEmail,
      contactPhone: input.contactPhone,
      businessRole: input.businessRole,
      message: input.message,
      submittedAt: new Date().toISOString(),
    };

    // Create the claim
    const claim = await createClaim({
      placeId: input.placeId,
      userId: user.id,
      businessRole: input.businessRole,
      notes: JSON.stringify(notesData),
    });

    // Log CLAIM_CREATED audit event
    logAuditEvent({
      actorUserId: user.id,
      actorRole: "public",
      eventType: "CLAIM_CREATED",
      targetType: "claim",
      targetId: claim.id,
      metadata: {
        placeId: input.placeId,
        businessName: input.businessName,
        businessRole: input.businessRole,
      },
    });

    // Send admin notification email
    try {
      // Extract city info (handle potential array/object type from Drizzle)
      const city = Array.isArray(place.city) ? place.city[0] : place.city;
      const cityName = city?.name || "Unknown";
      const countryName = city?.country?.name || "Unknown";

      await sendNewClaimNotification({
        claimId: claim.id,
        placeName: place.name as string,
        placeAddress: (place.address as string | null) || undefined,
        placeCity: cityName,
        placeCountry: countryName,
        userName: user.name || undefined,
        userEmail: user.email,
        businessName: input.businessName,
        businessRole: input.businessRole,
        message: input.message,
      });
    } catch (emailError) {
      // Don't fail the claim if email fails
      console.error("Failed to send claim notification email:", emailError);
    }

    return { success: true, claimId: claim.id };
  } catch (error) {
    console.error("Error creating claim:", error);

    if (error instanceof Error) {
      // Handle known errors
      if (error.message.includes("pending claim")) {
        return { success: false, error: "You already have a pending claim for this place" };
      }
      return { success: false, error: error.message };
    }

    return { success: false, error: "An unexpected error occurred" };
  }
}
