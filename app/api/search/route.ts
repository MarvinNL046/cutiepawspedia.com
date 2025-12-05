import { NextRequest, NextResponse } from "next/server";
import { searchPlaces } from "@/db/queries";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const query = searchParams.get("q") || undefined;
  const citySlug = searchParams.get("city") || undefined;
  const countrySlug = searchParams.get("country") || undefined;
  const categorySlug = searchParams.get("category") || undefined;
  const sortBy = (searchParams.get("sort") as "relevance" | "rating" | "name" | "newest") || "relevance";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "12", 10);

  const offset = (page - 1) * limit;

  try {
    const results = await searchPlaces({
      query,
      citySlug,
      countrySlug,
      categorySlug,
      limit,
      offset,
      sortBy,
      premiumFirst: true,
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Failed to search places", places: [], total: 0, hasMore: false },
      { status: 500 }
    );
  }
}
