import { requireAdmin } from "@/lib/auth/admin";
import { AdminHeader } from "@/components/admin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/db";
import { eq, desc, sql } from "drizzle-orm";
import { reviewPhotos, places, reviews, users } from "@/db/schema/directory";
import { getReviewPhotoUrl } from "@/lib/storage/reviewPhotos";
import { Camera, CheckCircle, XCircle, Flag, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PhotoModerationActions } from "./PhotoModerationActions";

interface AdminPhotosPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ status?: string }>;
}

export default async function AdminPhotosPage({ params, searchParams }: AdminPhotosPageProps) {
  const { locale } = await params;
  const { status: filterStatus } = await searchParams;
  const user = await requireAdmin(locale);

  // Get photo stats
  const stats = await db
    .select({
      status: reviewPhotos.status,
      count: sql<number>`count(*)`,
    })
    .from(reviewPhotos)
    .groupBy(reviewPhotos.status);

  const statsByStatus = {
    pending: stats.find((s) => s.status === "pending")?.count || 0,
    approved: stats.find((s) => s.status === "approved")?.count || 0,
    rejected: stats.find((s) => s.status === "rejected")?.count || 0,
    flagged: stats.find((s) => s.status === "flagged")?.count || 0,
  };

  // Get photos with filters
  const photos = await db
    .select({
      id: reviewPhotos.id,
      storageKey: reviewPhotos.storageKey,
      mimeType: reviewPhotos.mimeType,
      status: reviewPhotos.status,
      createdAt: reviewPhotos.createdAt,
      placeName: places.name,
      placeSlug: places.slug,
      reviewTitle: reviews.title,
      reviewBody: reviews.body,
      uploaderName: users.name,
      uploaderEmail: users.email,
    })
    .from(reviewPhotos)
    .leftJoin(places, eq(reviewPhotos.placeId, places.id))
    .leftJoin(reviews, eq(reviewPhotos.reviewId, reviews.id))
    .leftJoin(users, eq(reviewPhotos.userId, users.id))
    .where(filterStatus ? eq(reviewPhotos.status, filterStatus as typeof reviewPhotos.$inferSelect["status"]) : undefined)
    .orderBy(desc(reviewPhotos.createdAt))
    .limit(50);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 border-0">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-700 border-0">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-700 border-0">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      case "flagged":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-700 border-0">
            <Flag className="h-3 w-3 mr-1" />
            Flagged
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Photo Moderation"
        description="Review and moderate user-uploaded photos"
        user={user}
        locale={locale}
      />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link href={`/${locale}/admin/photos?status=pending`}>
            <Card className={`cursor-pointer hover:border-yellow-500 transition-colors ${filterStatus === "pending" ? "border-yellow-500 bg-yellow-50" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">{statsByStatus.pending}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href={`/${locale}/admin/photos?status=approved`}>
            <Card className={`cursor-pointer hover:border-green-500 transition-colors ${filterStatus === "approved" ? "border-green-500 bg-green-50" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Approved</p>
                    <p className="text-2xl font-bold text-green-600">{statsByStatus.approved}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href={`/${locale}/admin/photos?status=rejected`}>
            <Card className={`cursor-pointer hover:border-red-500 transition-colors ${filterStatus === "rejected" ? "border-red-500 bg-red-50" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Rejected</p>
                    <p className="text-2xl font-bold text-red-600">{statsByStatus.rejected}</p>
                  </div>
                  <XCircle className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href={`/${locale}/admin/photos?status=flagged`}>
            <Card className={`cursor-pointer hover:border-orange-500 transition-colors ${filterStatus === "flagged" ? "border-orange-500 bg-orange-50" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Flagged</p>
                    <p className="text-2xl font-bold text-orange-600">{statsByStatus.flagged}</p>
                  </div>
                  <Flag className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Filter Actions */}
        <div className="flex items-center gap-2">
          <Link href={`/${locale}/admin/photos`}>
            <Button variant={!filterStatus ? "default" : "outline"} size="sm">
              All
            </Button>
          </Link>
          <Link href={`/${locale}/admin/photos?status=pending`}>
            <Button variant={filterStatus === "pending" ? "default" : "outline"} size="sm">
              Pending
            </Button>
          </Link>
          <Link href={`/${locale}/admin/photos?status=flagged`}>
            <Button variant={filterStatus === "flagged" ? "default" : "outline"} size="sm">
              Flagged
            </Button>
          </Link>
        </div>

        {/* Photos Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-cpAqua" />
              Photos
            </CardTitle>
            <CardDescription>
              {filterStatus ? `Showing ${filterStatus} photos` : "All photos"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {photos.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No photos found
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Preview</TableHead>
                    <TableHead>Place / Review</TableHead>
                    <TableHead>Uploader</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {photos.map((photo) => (
                    <TableRow key={photo.id}>
                      <TableCell>
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted">
                          <Image
                            src={getReviewPhotoUrl(photo.storageKey)}
                            alt="Photo preview"
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{photo.placeName || "Unknown Place"}</p>
                          <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                            {photo.reviewTitle || photo.reviewBody?.slice(0, 50) || "No review content"}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{photo.uploaderName || "Anonymous"}</p>
                          <p className="text-xs text-muted-foreground">{photo.uploaderEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(photo.status)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(photo.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <PhotoModerationActions
                          photoId={photo.id}
                          currentStatus={photo.status}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
