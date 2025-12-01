import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAccess } from "@/lib/auth/admin-api";
import { getAdminPlaces } from "@/db/queries/admin";

// GET /api/admin/places - List all places with filtering
export async function GET(request: NextRequest) {
  const auth = await verifyAdminAccess(request);
  if (!auth.authorized) return auth.response;

  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "50", 10);
  const offset = parseInt(searchParams.get("offset") || "0", 10);
  const countryId = searchParams.get("countryId");
  const cityId = searchParams.get("cityId");
  const categoryId = searchParams.get("categoryId");
  const isVerified = searchParams.get("isVerified");
  const isPremium = searchParams.get("isPremium");

  try {
    const result = await getAdminPlaces({
      limit,
      offset,
      countryId: countryId ? parseInt(countryId, 10) : undefined,
      cityId: cityId ? parseInt(cityId, 10) : undefined,
      categoryId: categoryId ? parseInt(categoryId, 10) : undefined,
      isVerified: isVerified ? isVerified === "true" : undefined,
      isPremium: isPremium ? isPremium === "true" : undefined,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching places:", error);
    return NextResponse.json(
      { error: "Failed to fetch places" },
      { status: 500 }
    );
  }
}
