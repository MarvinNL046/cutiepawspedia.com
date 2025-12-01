import { NextResponse } from "next/server";
import { z } from "zod";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId, canUserEditListing, updateListing } from "@/db/queries";

// Zod schema for listing update validation
const updateListingSchema = z.object({
  listingId: z.number().int().positive("Invalid listing ID"),
  name: z
    .string()
    .min(1, "Business name is required")
    .max(255, "Business name too long"),
  address: z
    .string()
    .max(500, "Address too long")
    .optional()
    .transform((val) => val || ""),
  website: z
    .string()
    .max(500, "Website URL too long")
    .optional()
    .transform((val) => val || "")
    .refine(
      (val) => !val || val.startsWith("http://") || val.startsWith("https://"),
      "Website must start with http:// or https://"
    ),
  phone: z
    .string()
    .max(50, "Phone number too long")
    .optional()
    .transform((val) => val || ""),
  description: z
    .string()
    .max(2000, "Description too long")
    .optional()
    .transform((val) => val || ""),
});

export async function PUT(request: Request) {
  try {
    // Check authentication
    if (!stackServerApp) {
      return NextResponse.json(
        { error: "Authentication not configured" },
        { status: 503 }
      );
    }

    const stackUser = await stackServerApp.getUser();
    if (!stackUser) {
      return NextResponse.json(
        { error: "Unauthorized - Please sign in" },
        { status: 401 }
      );
    }

    // Get database user
    const dbUser = await getUserByStackAuthId(stackUser.id);
    if (!dbUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check role
    if (!["business", "admin"].includes(dbUser.role)) {
      return NextResponse.json(
        { error: "Access denied - Business account required" },
        { status: 403 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = updateListingSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map((e) => e.message).join(", ");
      return NextResponse.json(
        { error: `Validation failed: ${errors}` },
        { status: 400 }
      );
    }

    const { listingId, name, address, website, phone, description } = validationResult.data;

    // Check authorization - user must own listing or be admin
    const canEdit = await canUserEditListing(dbUser.id, listingId);
    if (!canEdit) {
      return NextResponse.json(
        { error: "Access denied - You can only edit your own listings" },
        { status: 403 }
      );
    }

    // Update the listing
    const updatedListing = await updateListing(listingId, {
      name,
      address,
      website,
      phone,
      description,
    });

    if (!updatedListing) {
      return NextResponse.json(
        { error: "Failed to update listing" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      listing: {
        id: updatedListing.id,
        name: updatedListing.name,
        address: updatedListing.address,
        website: updatedListing.website,
        phone: updatedListing.phone,
        description: updatedListing.description,
        updatedAt: updatedListing.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error updating listing:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
