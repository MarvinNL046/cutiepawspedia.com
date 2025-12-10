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
  Mail,
  Phone,
  FileText,
  ShieldCheck,
  Send,
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
          Wacht op Review
        </Badge>
      );
    case "verification_sent":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <Send className="w-3 h-3 mr-1" />
          Code Verzonden
        </Badge>
      );
    case "verified":
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
          <ShieldCheck className="w-3 h-3 mr-1" />
          Geverifieerd
        </Badge>
      );
    case "approved":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          Goedgekeurd
        </Badge>
      );
    case "rejected":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          <XCircle className="w-3 h-3 mr-1" />
          Afgewezen
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

function getVerificationMethodBadge(method: string | null) {
  if (!method) return null;
  switch (method) {
    case "email_domain":
      return (
        <Badge variant="secondary" className="bg-cyan-50 text-cyan-700">
          <Mail className="w-3 h-3 mr-1" />
          Email
        </Badge>
      );
    case "phone":
      return (
        <Badge variant="secondary" className="bg-violet-50 text-violet-700">
          <Phone className="w-3 h-3 mr-1" />
          Telefoon
        </Badge>
      );
    case "document":
      return (
        <Badge variant="secondary" className="bg-orange-50 text-orange-700">
          <FileText className="w-3 h-3 mr-1" />
          Document
        </Badge>
      );
    case "manual":
      return (
        <Badge variant="secondary" className="bg-gray-100 text-gray-700">
          <ShieldCheck className="w-3 h-3 mr-1" />
          Handmatig
        </Badge>
      );
    default:
      return <Badge variant="secondary">{method}</Badge>;
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Totaal</CardDescription>
              <CardTitle className="text-2xl">{stats.total}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardDescription className="text-amber-700">Wacht op Review</CardDescription>
              <CardTitle className="text-2xl text-amber-700">{stats.pending}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-blue-200 bg-blue-50/50">
            <CardHeader className="pb-2">
              <CardDescription className="text-blue-700">Code Verzonden</CardDescription>
              <CardTitle className="text-2xl text-blue-700">{stats.verificationSent}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-purple-200 bg-purple-50/50">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-700">Geverifieerd</CardDescription>
              <CardTitle className="text-2xl text-purple-700">{stats.verified}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-green-200 bg-green-50/50">
            <CardHeader className="pb-2">
              <CardDescription className="text-green-700">Goedgekeurd</CardDescription>
              <CardTitle className="text-2xl text-green-700">{stats.approved}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-red-200 bg-red-50/50">
            <CardHeader className="pb-2">
              <CardDescription className="text-red-700">Afgewezen</CardDescription>
              <CardTitle className="text-2xl text-red-700">{stats.rejected}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          <Link href={`/${locale}/admin/claims`}>
            <Button variant={!status ? "default" : "outline"} size="sm">
              Alle ({stats.total})
            </Button>
          </Link>
          <Link href={`/${locale}/admin/claims?status=pending`}>
            <Button
              variant={status === "pending" ? "default" : "outline"}
              size="sm"
              className={status === "pending" ? "bg-amber-600 hover:bg-amber-700" : ""}
            >
              <Clock className="w-3 h-3 mr-1" />
              Wacht op Review ({stats.pending})
            </Button>
          </Link>
          <Link href={`/${locale}/admin/claims?status=verification_sent`}>
            <Button
              variant={status === "verification_sent" ? "default" : "outline"}
              size="sm"
              className={status === "verification_sent" ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              <Send className="w-3 h-3 mr-1" />
              Code Verzonden ({stats.verificationSent})
            </Button>
          </Link>
          <Link href={`/${locale}/admin/claims?status=verified`}>
            <Button
              variant={status === "verified" ? "default" : "outline"}
              size="sm"
              className={status === "verified" ? "bg-purple-600 hover:bg-purple-700" : ""}
            >
              <ShieldCheck className="w-3 h-3 mr-1" />
              Geverifieerd ({stats.verified})
            </Button>
          </Link>
          <Link href={`/${locale}/admin/claims?status=approved`}>
            <Button
              variant={status === "approved" ? "default" : "outline"}
              size="sm"
              className={status === "approved" ? "bg-green-600 hover:bg-green-700" : ""}
            >
              <CheckCircle className="w-3 h-3 mr-1" />
              Goedgekeurd ({stats.approved})
            </Button>
          </Link>
          <Link href={`/${locale}/admin/claims?status=rejected`}>
            <Button
              variant={status === "rejected" ? "default" : "outline"}
              size="sm"
              className={status === "rejected" ? "bg-red-600 hover:bg-red-700" : ""}
            >
              <XCircle className="w-3 h-3 mr-1" />
              Afgewezen ({stats.rejected})
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
                    <TableHead>Methode</TableHead>
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
                      <TableCell>
                        {getVerificationMethodBadge(claim.verificationMethod)}
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
