import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAccess, logAdminAction } from "@/lib/auth/admin-api";
import { getCategoryById, updateCategory, deleteCategory } from "@/db/queries/admin";
import { updateCategorySchema } from "@/lib/validations/admin";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/admin/categories/[id] - Get a single category
export async function GET(request: NextRequest, context: RouteContext) {
  const auth = await verifyAdminAccess(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  const categoryId = parseInt(id, 10);

  if (isNaN(categoryId)) {
    return NextResponse.json({ error: "Invalid category ID" }, { status: 400 });
  }

  try {
    const category = await getCategoryById(categoryId);

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ category });
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { error: "Failed to fetch category" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/categories/[id] - Update a category
export async function PUT(request: NextRequest, context: RouteContext) {
  const auth = await verifyAdminAccess(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  const categoryId = parseInt(id, 10);

  if (isNaN(categoryId)) {
    return NextResponse.json({ error: "Invalid category ID" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const validated = updateCategorySchema.parse(body);

    const category = await updateCategory(categoryId, validated);

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    logAdminAction("UPDATE", "category", categoryId, auth.user.id, validated);

    return NextResponse.json({ category });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 }
      );
    }
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/categories/[id] - Delete a category
export async function DELETE(request: NextRequest, context: RouteContext) {
  const auth = await verifyAdminAccess(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  const categoryId = parseInt(id, 10);

  if (isNaN(categoryId)) {
    return NextResponse.json({ error: "Invalid category ID" }, { status: 400 });
  }

  try {
    await deleteCategory(categoryId);

    logAdminAction("DELETE", "category", categoryId, auth.user.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: "Failed to delete category. It may have places associated with it." },
      { status: 500 }
    );
  }
}
