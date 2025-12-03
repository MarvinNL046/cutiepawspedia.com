import { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import { getClaimById } from "@/db/queries/claims";
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
  ArrowLeft,
  Clock,
  CheckCircle,
  XCircle,
  User,
  MapPin,
  FileText,
  Calendar,
  ExternalLink,
  Building2,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { ClaimReviewForm } from "./ClaimReviewForm";

export const metadata: Metadata = {
  title: "Review Claim | Admin",
  description: "Review place ownership claim",
};

interface ClaimDetailPageProps {
  params: Promise<{ locale: string; claimId: string }>;
}

function getStatusBadge(status: string) {
  switch (status) {
    case "pending":
      return (
        <Badge className="bg-amber-100 text-amber-800 border-amber-300">
          <Clock className="w-3 h-3 mr-1" />
          Pending Review
        </Badge>
      );
    case "approved":
      return (
        <Badge className="bg-green-100 text-green-800 border-green-300">
          <CheckCircle className="w-3 h-3 mr-1" />
          Approved
        </Badge>
      );
    case "rejected":
      return (
        <Badge className="bg-red-100 text-red-800 border-red-300">
          <XCircle className="w-3 h-3 mr-1" />
          Rejected
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export default async function ClaimDetailPage({
  params,
}: ClaimDetailPageProps) {
  const { locale, claimId } = await params;
  const user = await requireAdmin(locale);

  const claimIdNum = parseInt(claimId, 10);
  if (isNaN(claimIdNum)) {
    notFound();
  }

  const claim = await getClaimById(claimIdNum);
  if (!claim) {
    notFound();
  }

  const isPending = claim.status === "pending";

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader
        title={`Claim #${claim.id}`}
        description={`Review claim for ${claim.placeName}`}
        user={user}
        locale={locale}
      />

      <main className="p-6 space-y-6">
        {/* Back Button */}
        <Link href={`/${locale}/admin/claims`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Claims
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Claim Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Place Details */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-cpPink" />
                      Place Being Claimed
                    </CardTitle>
                    <CardDescription>Details of the place</CardDescription>
                  </div>
                  {getStatusBadge(claim.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <h3 className="font-semibold text-lg">{claim.placeName}</h3>
                  <p className="text-slate-600">
                    {claim.cityName}, {claim.countryName}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    Place ID: #{claim.placeId}
                  </p>
                </div>
                <Link
                  href={`/${locale}/places/${claim.placeSlug || claim.placeId}`}
                  target="_blank"
                  className="inline-flex items-center text-cpAqua hover:underline"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View Place Listing
                </Link>
              </CardContent>
            </Card>

            {/* Claimant Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-cpAqua" />
                  Claimant Information
                </CardTitle>
                <CardDescription>Who is making this claim</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Name</p>
                    <p className="font-medium">{claim.userName || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="font-medium">{claim.userEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Role</p>
                    <p className="font-medium capitalize">
                      {claim.businessRole || "Owner"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">User ID</p>
                    <p className="font-mono text-sm">#{claim.userId}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Claim Notes & Proof */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-slate-600" />
                  Claim Details
                </CardTitle>
                <CardDescription>Notes and supporting documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Claimant&apos;s Notes</p>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-slate-700 whitespace-pre-wrap">
                      {claim.notes || "No notes provided"}
                    </p>
                  </div>
                </div>

                {claim.proofDocumentUrl && (
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Proof Document</p>
                    <Link
                      href={claim.proofDocumentUrl}
                      target="_blank"
                      className="inline-flex items-center text-cpAqua hover:underline"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View Document
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Review History (if reviewed) */}
            {claim.reviewedAt && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-slate-600" />
                    Review Decision
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-500">Reviewed By</p>
                      <p className="font-medium">{claim.reviewerEmail || "Unknown"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Reviewed At</p>
                      <p className="font-medium">
                        {format(new Date(claim.reviewedAt), "PPp")}
                      </p>
                    </div>
                  </div>
                  {claim.adminNotes && (
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Admin Notes</p>
                      <div className="bg-slate-50 rounded-lg p-4">
                        <p className="text-slate-700 whitespace-pre-wrap">
                          {claim.adminNotes}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Review Actions */}
          <div className="space-y-6">
            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-slate-600" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-cpPink mt-2" />
                    <div>
                      <p className="text-sm font-medium">Claim Submitted</p>
                      <p className="text-xs text-slate-500">
                        {format(new Date(claim.createdAt), "PPp")}
                      </p>
                      <p className="text-xs text-slate-400">
                        {formatDistanceToNow(new Date(claim.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                  {claim.reviewedAt && (
                    <div className="flex gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          claim.status === "approved" ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                      <div>
                        <p className="text-sm font-medium capitalize">
                          Claim {claim.status}
                        </p>
                        <p className="text-xs text-slate-500">
                          {format(new Date(claim.reviewedAt), "PPp")}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Review Form (only for pending claims) */}
            {isPending && (
              <Card className="border-2 border-amber-200 bg-amber-50/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-amber-600" />
                    Review Claim
                  </CardTitle>
                  <CardDescription>
                    Approve to create business and link place
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ClaimReviewForm claimId={claim.id} locale={locale} />
                </CardContent>
              </Card>
            )}

            {/* Info Box */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <h4 className="font-medium text-blue-900 mb-2">
                  What happens on approval?
                </h4>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>• A business account is created for the user</li>
                  <li>• The place is linked to their business</li>
                  <li>• The place is marked as verified</li>
                  <li>• The user can now manage the listing</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
