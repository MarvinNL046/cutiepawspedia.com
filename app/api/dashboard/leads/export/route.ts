import { NextResponse } from "next/server";
import { z } from "zod";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId, getLeadsForExport } from "@/db/queries";
import type { LeadPeriodFilter } from "@/db/queries/dashboard";

// Zod schema for export parameters
const exportParamsSchema = z.object({
  listingId: z.coerce.number().int().positive().optional(),
  period: z.enum(["7days", "30days", "all"]).optional().default("all"),
});

/**
 * Generate CSV content from leads data
 */
function generateCSV(
  leads: Awaited<ReturnType<typeof getLeadsForExport>>
): string {
  // CSV header
  const headers = [
    "Date",
    "Listing",
    "Name",
    "Email",
    "Phone",
    "Message",
    "Source",
  ];

  // Escape CSV field (handle commas, quotes, newlines)
  const escapeField = (value: string | null | undefined): string => {
    if (value === null || value === undefined) return "";
    const str = String(value);
    // If contains comma, quote, or newline, wrap in quotes and escape internal quotes
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  // Generate rows
  const rows = leads.map((lead) => [
    escapeField(new Date(lead.createdAt).toISOString().split("T")[0]),
    escapeField(lead.place?.name || "Unknown"),
    escapeField(lead.name),
    escapeField(lead.email),
    escapeField(lead.phone),
    escapeField(lead.message),
    escapeField(lead.source),
  ]);

  // Combine header and rows
  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  return csvContent;
}

export async function GET(request: Request) {
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
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check role
    if (!["business", "admin"].includes(dbUser.role)) {
      return NextResponse.json(
        { error: "Access denied - Business account required" },
        { status: 403 }
      );
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const params = {
      listingId: searchParams.get("listingId") || undefined,
      period: searchParams.get("period") || "all",
    };

    const validationResult = exportParamsSchema.safeParse(params);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid parameters" },
        { status: 400 }
      );
    }

    const { listingId, period } = validationResult.data;

    // Get leads for export
    const leads = await getLeadsForExport(dbUser.id, {
      listingId,
      period: period as LeadPeriodFilter,
    });

    // Generate CSV
    const csv = generateCSV(leads);

    // Generate filename with date
    const dateStr = new Date().toISOString().split("T")[0];
    const filename = `leads-export-${dateStr}.csv`;

    // Return as downloadable file
    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Error exporting leads:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
