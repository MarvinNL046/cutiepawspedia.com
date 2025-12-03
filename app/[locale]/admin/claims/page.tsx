import { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth/admin";
import { getClaims, getClaimStats, type ClaimStatus } from "@/db/queries/claims";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ClipboardCheck,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  ExternalLink,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export const metadata: Metadata = {
  title: "Claims Review | Admin",
  description: "Review and manage place ownership claims",
};

interface ClaimsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ status?: string; page?: string }>;
}

function getStatusBadge(status: string) {
  switch (status) {
    case "pending":
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
          <Clock className="w-3 h-3 mr-1" />
          Pending
        </Badge>
      );
    case "approved":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          Approved
        </Badge>
      );
    case "rejected":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          <XCircle className="w-3 h-3 mr-1" />
          Rejected
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export default async function ClaimsPage({
  params,
  searchParams,
}: ClaimsPageProps) {
  const { locale } = await params;
  const { status, page } = await searchParams;
  const user = await requireAdmin(locale);

  const currentPage = parseInt(page || "1", 10);
  const limit = 20;
  const offset = (currentPage - 1) * limit;

  // Get claims with optional status filter
  const statusFilter = status as ClaimStatus | undefined;
  const { claims, total } = await getClaims({
    limit,
    offset,
    status: statusFilter,
  });

  const stats = await getClaimStats();
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader
        title="Claims Review"
        description="Review and manage place ownership claims"
        user={user}
        locale={locale}
      />

      <main className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Claims</CardDescription>
              <CardTitle className="text-2xl">{stats.total}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardDescription className="text-amber-700">Pending Review</CardDescription>
              <CardTitle className="text-2xl text-amber-700">{stats.pending}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-green-200 bg-green-50/50">
            <CardHeader className="pb-2">
              <CardDescription className="text-green-700">Approved</CardDescription>
              <CardTitle className="text-2xl text-green-700">{stats.approved}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-red-200 bg-red-50/50">
            <CardHeader className="pb-2">
              <CardDescription className="text-red-700">Rejected</CardDescription>
              <CardTitle className="text-2xl text-red-700">{stats.rejected}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          <Link href={`/${locale}/admin/claims`}>
            <Button variant={!status ? "default" : "outline"} size="sm">
              All ({stats.total})
            </Button>
          </Link>
          <Link href={`/${locale}/admin/claims?status=pending`}>
            <Button
              variant={status === "pending" ? "default" : "outline"}
              size="sm"
              className={status === "pending" ? "bg-amber-600 hover:bg-amber-700" : ""}
            >
              <Clock className="w-3 h-3 mr-1" />
              Pending ({stats.pending})
            </Button>
          </Link>
          <Link href={`/${locale}/admin/claims?status=approved`}>
            <Button
              variant={status === "approved" ? "default" : "outline"}
              size="sm"
              className={status === "approved" ? "bg-green-600 hover:bg-green-700" : ""}
            >
              <CheckCircle className="w-3 h-3 mr-1" />
              Approved ({stats.approved})
            </Button>
          </Link>
          <Link href={`/${locale}/admin/claims?status=rejected`}>
            <Button
              variant={status === "rejected" ? "default" : "outline"}
              size="sm"
              className={status === "rejected" ? "bg-red-600 hover:bg-red-700" : ""}
            >
              <XCircle className="w-3 h-3 mr-1" />
              Rejected ({stats.rejected})
            </Button>
          </Link>
        </div>

        {/* Claims Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5" />
              Claims
            </CardTitle>
            <CardDescription>
              {total} claim{total !== 1 ? "s" : ""} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            {claims.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <ClipboardCheck className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No claims found</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Place</TableHead>
                    <TableHead>Claimant</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {claims.map((claim) => (
                    <TableRow key={claim.id}>
                      <TableCell className="font-mono text-xs">
                        #{claim.id}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{claim.placeName}</p>
                          <p className="text-xs text-slate-500">
                            {claim.cityName}, {claim.countryName}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{claim.userName || "Unknown"}</p>
                          <p className="text-xs text-slate-500">{claim.userEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm capitalize">
                          {claim.businessRole || "Owner"}
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(claim.status)}</TableCell>
                      <TableCell className="text-sm text-slate-500">
                        {formatDistanceToNow(new Date(claim.createdAt), {
                          addSuffix: true,
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/${locale}/admin/claims/${claim.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              Review
                            </Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {currentPage > 1 && (
                  <Link
                    href={`/${locale}/admin/claims?page=${currentPage - 1}${status ? `&status=${status}` : ""}`}
                  >
                    <Button variant="outline" size="sm">
                      Previous
                    </Button>
                  </Link>
                )}
                <span className="flex items-center px-3 text-sm text-slate-600">
                  Page {currentPage} of {totalPages}
                </span>
                {currentPage < totalPages && (
                  <Link
                    href={`/${locale}/admin/claims?page=${currentPage + 1}${status ? `&status=${status}` : ""}`}
                  >
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
