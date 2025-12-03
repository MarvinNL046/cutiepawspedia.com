import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAccess, logAdminAction } from "@/lib/auth/admin-api";
import { getBusinessById, updateBusiness, deleteBusiness } from "@/db/queries/businesses";
import { updateBusinessSchema, businessNotesSchema } from "@/lib/validations/admin";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/admin/businesses/[id] - Get a single business with full details
export async function GET(request: NextRequest, context: RouteContext) {
  const auth = await verifyAdminAccess(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  const businessId = parseInt(id, 10);

  if (isNaN(businessId)) {
    return NextResponse.json({ error: "Invalid business ID" }, { status: 400 });
  }

  try {
    const business = await getBusinessById(businessId);

    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    return NextResponse.json({ business });
  } catch (error) {
    console.error("Error fetching business:", error);
    return NextResponse.json(
      { error: "Failed to fetch business" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/businesses/[id] - Update a business
export async function PUT(request: NextRequest, context: RouteContext) {
  const auth = await verifyAdminAccess(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  const businessId = parseInt(id, 10);

  if (isNaN(businessId)) {
    return NextResponse.json({ error: "Invalid business ID" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const validated = updateBusinessSchema.parse(body);

    // Convert empty strings to null for optional fields
    const updateData = {
      ...validated,
      contactEmail: validated.contactEmail === "" ? null : validated.contactEmail,
    };

    const business = await updateBusiness(businessId, updateData);

    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    await logAdminAction("UPDATE", "business", businessId, auth.user.id, validated);

    return NextResponse.json({ business });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 }
      );
    }
    console.error("Error updating business:", error);
    return NextResponse.json(
      { error: "Failed to update business" },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/businesses/[id] - Quick actions (status change, notes update)
export async function PATCH(request: NextRequest, context: RouteContext) {
  const auth = await verifyAdminAccess(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  const businessId = parseInt(id, 10);

  if (isNaN(businessId)) {
    return NextResponse.json({ error: "Invalid business ID" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { action, ...params } = body;

    let business;

    switch (action) {
      case "updateStatus":
        business = await updateBusiness(businessId, { status: params.status });
        await logAdminAction("STATUS_CHANGE", "business", businessId, auth.user.id, {
          newStatus: params.status,
        });
        break;

      case "updatePlan":
        business = await updateBusiness(businessId, {
          plan: params.plan,
          billingStatus: params.billingStatus,
        });
        await logAdminAction("PLAN_CHANGE", "business", businessId, auth.user.id, {
          newPlan: params.plan,
          newBillingStatus: params.billingStatus,
        });
        break;

      case "updateNotes":
        const validated = businessNotesSchema.parse(params);
        business = await updateBusiness(businessId, { notes: validated.notes });
        await logAdminAction("NOTES_UPDATE", "business", businessId, auth.user.id);
        break;

      default:
        return NextResponse.json(
          { error: "Invalid action" },
          { status: 400 }
        );
    }

    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    return NextResponse.json({ business });
  } catch (error) {
    console.error("Error updating business:", error);
    return NextResponse.json(
      { error: "Failed to update business" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/businesses/[id] - Delete a business
export async function DELETE(request: NextRequest, context: RouteContext) {
  const auth = await verifyAdminAccess(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  const businessId = parseInt(id, 10);

  if (isNaN(businessId)) {
    return NextResponse.json({ error: "Invalid business ID" }, { status: 400 });
  }

  try {
    // Check if business exists first
    const existing = await getBusinessById(businessId);
    if (!existing) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    await deleteBusiness(businessId);
    await logAdminAction("DELETE", "business", businessId, auth.user.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting business:", error);
    return NextResponse.json(
      { error: "Failed to delete business" },
      { status: 500 }
    );
  }
}
