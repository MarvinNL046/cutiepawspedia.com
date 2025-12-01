import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAccess, logAdminAction } from "@/lib/auth/admin-api";
import { createCategory, getCategoriesWithStats } from "@/db/queries/admin";
import { createCategorySchema } from "@/lib/validations/admin";

// GET /api/admin/categories - List all categories
export async function GET(request: NextRequest) {
  const auth = await verifyAdminAccess(request);
  if (!auth.authorized) return auth.response;

  try {
    const categories = await getCategoriesWithStats();
    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// POST /api/admin/categories - Create a category
export async function POST(request: NextRequest) {
  const auth = await verifyAdminAccess(request);
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const validated = createCategorySchema.parse(body);

    const category = await createCategory(validated);

    logAdminAction("CREATE", "category", category.id, auth.user.id, {
      slug: category.slug,
      labelKey: category.labelKey,
    });

    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 }
      );
    }
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
