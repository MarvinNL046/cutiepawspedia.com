/**
 * Categories API
 *
 * GET /api/categories
 * Returns all categories for place selection
 */

import { NextResponse } from "next/server";
import { getCategories } from "@/db/queries/listings";

export async function GET() {
  try {
    const categories = await getCategories();

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
