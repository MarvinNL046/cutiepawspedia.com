import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAccess, logAdminAction } from "@/lib/auth/admin-api";
import { getBusinesses, createBusiness } from "@/db/queries/businesses";
import { createBusinessSchema } from "@/lib/validations/admin";

// GET /api/admin/businesses - List all businesses with filters
export async function GET(request: NextRequest) {
  const auth = await verifyAdminAccess(request);
  if (!auth.authorized) return auth.response;

  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "50", 10);
  const offset = parseInt(searchParams.get("offset") || "0", 10);
  const status = searchParams.get("status") as "active" | "pending" | "suspended" | null;
  const plan = searchParams.get("plan") as "free" | "starter" | "pro" | "enterprise" | null;
  const billingStatus = searchParams.get("billingStatus") as "trial" | "paid" | "overdue" | "cancelled" | null;
  const search = searchParams.get("search") || undefined;

  try {
    const result = await getBusinesses({
      limit,
      offset,
      status: status || undefined,
      plan: plan || undefined,
      billingStatus: billingStatus || undefined,
      search,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching businesses:", error);
    return NextResponse.json(
      { error: "Failed to fetch businesses" },
      { status: 500 }
    );
  }
}

// POST /api/admin/businesses - Create a new business
export async function POST(request: NextRequest) {
  const auth = await verifyAdminAccess(request);
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const validated = createBusinessSchema.parse(body);

    const business = await createBusiness(validated);

    await logAdminAction("CREATE", "business", business.id, auth.user.id, validated);

    return NextResponse.json({ business }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 }
      );
    }
    console.error("Error creating business:", error);
    return NextResponse.json(
      { error: "Failed to create business" },
      { status: 500 }
    );
  }
}
