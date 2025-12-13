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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/db";
import { eq, desc, sql, ne } from "drizzle-orm";
import { reviewPhotos, businessPhotos, places, reviews, users, businesses } from "@/db/schema/directory";
import { getReviewPhotoUrl } from "@/lib/storage/reviewPhotos";
import { getBusinessPhotoUrl } from "@/lib/storage/businessPhotos";
import { Camera, CheckCircle, XCircle, Flag, Clock, Building2, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PhotoModerationActions } from "./PhotoModerationActions";
import { BusinessPhotoActions } from "./BusinessPhotoActions";

interface AdminPhotosPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ status?: string; tab?: string }>;
}

export default async function AdminPhotosPage({ params, searchParams }: AdminPhotosPageProps) {
  const { locale } = await params;
  const { status: filterStatus, tab = "review" } = await searchParams;
  const user = await requireAdmin(locale);

  if (!db) {
    return <div className="p-8 text-center">Database not available</div>;
  }

  // Get review photo stats
  const reviewStats = await db
    .select({
      status: reviewPhotos.status,
      count: sql<number>`count(*)`,
    })
    .from(reviewPhotos)
    .groupBy(reviewPhotos.status);

  const reviewStatsByStatus = {
    pending: reviewStats.find((s) => s.status === "pending")?.count || 0,
    approved: reviewStats.find((s) => s.status === "approved")?.count || 0,
    rejected: reviewStats.find((s) => s.status === "rejected")?.count || 0,
    flagged: reviewStats.find((s) => s.status === "flagged")?.count || 0,
  };

  // Get business photo stats
  const businessStats = await db
    .select({
      status: businessPhotos.status,
      count: sql<number>`count(*)`,
    })
    .from(businessPhotos)
    .groupBy(businessPhotos.status);

  const businessStatsByStatus = {
    active: businessStats.find((s) => s.status === "active")?.count || 0,
    deleted: businessStats.find((s) => s.status === "deleted")?.count || 0,
  };

  // Get review photos with filters
  const reviewPhotosList = await db
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
    .where(filterStatus && tab === "review" ? eq(reviewPhotos.status, filterStatus as typeof reviewPhotos.$inferSelect["status"]) : undefined)
    .orderBy(desc(reviewPhotos.createdAt))
    .limit(50);

  // Get business photos (only active ones by default, show all if filter)
  const businessPhotosList = await db
    .select({
      id: businessPhotos.id,
      storageKey: businessPhotos.storageKey,
      mimeType: businessPhotos.mimeType,
      status: businessPhotos.status,
      isPrimary: businessPhotos.isPrimary,
      altText: businessPhotos.altText,
      caption: businessPhotos.caption,
      createdAt: businessPhotos.createdAt,
      placeName: places.name,
      placeSlug: places.slug,
      businessName: businesses.name,
      uploaderName: users.name,
      uploaderEmail: users.email,
    })
    .from(businessPhotos)
    .leftJoin(places, eq(businessPhotos.placeId, places.id))
    .leftJoin(businesses, eq(businessPhotos.businessId, businesses.id))
    .leftJoin(users, eq(businessPhotos.uploadedBy, users.id))
    .where(filterStatus === "deleted" && tab === "business" ? eq(businessPhotos.status, "deleted") : ne(businessPhotos.status, "deleted"))
    .orderBy(desc(businessPhotos.createdAt))
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
      case "active":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-700 border-0">
            <CheckCircle className="h-3 w-3 mr-1" />
            Active
          </Badge>
        );
      case "deleted":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-700 border-0">
            <XCircle className="h-3 w-3 mr-1" />
            Deleted
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Photo Management"
        description="Review and manage all photos on the platform"
        user={user}
        locale={locale}
      />

      <div className="p-6 space-y-6">
        <Tabs defaultValue={tab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="review" asChild>
              <Link href={`/${locale}/admin/photos?tab=review`} className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Review Photos
                {reviewStatsByStatus.pending > 0 && (
                  <Badge variant="destructive" className="ml-1 text-xs">
                    {reviewStatsByStatus.pending}
                  </Badge>
                )}
              </Link>
            </TabsTrigger>
            <TabsTrigger value="business" asChild>
              <Link href={`/${locale}/admin/photos?tab=business`} className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Business Photos
                <Badge variant="secondary" className="ml-1 text-xs">
                  {businessStatsByStatus.active}
                </Badge>
              </Link>
            </TabsTrigger>
          </TabsList>

          {/* Review Photos Tab */}
          <TabsContent value="review" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Link href={`/${locale}/admin/photos?tab=review&status=pending`}>
                <Card className={`cursor-pointer hover:border-yellow-500 transition-colors ${filterStatus === "pending" ? "border-yellow-500 bg-yellow-50" : ""}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Pending</p>
                        <p className="text-2xl font-bold text-yellow-600">{reviewStatsByStatus.pending}</p>
                      </div>
                      <Clock className="h-8 w-8 text-yellow-500" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href={`/${locale}/admin/photos?tab=review&status=approved`}>
                <Card className={`cursor-pointer hover:border-green-500 transition-colors ${filterStatus === "approved" ? "border-green-500 bg-green-50" : ""}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Approved</p>
                        <p className="text-2xl font-bold text-green-600">{reviewStatsByStatus.approved}</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href={`/${locale}/admin/photos?tab=review&status=rejected`}>
                <Card className={`cursor-pointer hover:border-red-500 transition-colors ${filterStatus === "rejected" ? "border-red-500 bg-red-50" : ""}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Rejected</p>
                        <p className="text-2xl font-bold text-red-600">{reviewStatsByStatus.rejected}</p>
                      </div>
                      <XCircle className="h-8 w-8 text-red-500" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href={`/${locale}/admin/photos?tab=review&status=flagged`}>
                <Card className={`cursor-pointer hover:border-orange-500 transition-colors ${filterStatus === "flagged" ? "border-orange-500 bg-orange-50" : ""}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Flagged</p>
                        <p className="text-2xl font-bold text-orange-600">{reviewStatsByStatus.flagged}</p>
                      </div>
                      <Flag className="h-8 w-8 text-orange-500" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Filter Actions */}
            <div className="flex items-center gap-2">
              <Link href={`/${locale}/admin/photos?tab=review`}>
                <Button variant={!filterStatus ? "default" : "outline"} size="sm">
                  All
                </Button>
              </Link>
              <Link href={`/${locale}/admin/photos?tab=review&status=pending`}>
                <Button variant={filterStatus === "pending" ? "default" : "outline"} size="sm">
                  Pending
                </Button>
              </Link>
              <Link href={`/${locale}/admin/photos?tab=review&status=flagged`}>
                <Button variant={filterStatus === "flagged" ? "default" : "outline"} size="sm">
                  Flagged
                </Button>
              </Link>
            </div>

            {/* Review Photos Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-cpAqua" />
                  Review Photos
                </CardTitle>
                <CardDescription>
                  User-generated photos from reviews that need moderation
                </CardDescription>
              </CardHeader>
              <CardContent>
                {reviewPhotosList.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No review photos found
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
                      {reviewPhotosList.map((photo) => (
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
                              <Link
                                href={`/${locale}/place/${photo.placeSlug}`}
                                className="font-medium hover:underline"
                                target="_blank"
                              >
                                {photo.placeName || "Unknown Place"}
                              </Link>
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
          </TabsContent>

          {/* Business Photos Tab */}
          <TabsContent value="business" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg">
              <Link href={`/${locale}/admin/photos?tab=business`}>
                <Card className={`cursor-pointer hover:border-green-500 transition-colors ${!filterStatus || filterStatus !== "deleted" ? "border-green-500 bg-green-50" : ""}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Active</p>
                        <p className="text-2xl font-bold text-green-600">{businessStatsByStatus.active}</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href={`/${locale}/admin/photos?tab=business&status=deleted`}>
                <Card className={`cursor-pointer hover:border-red-500 transition-colors ${filterStatus === "deleted" ? "border-red-500 bg-red-50" : ""}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Deleted</p>
                        <p className="text-2xl font-bold text-red-600">{businessStatsByStatus.deleted}</p>
                      </div>
                      <XCircle className="h-8 w-8 text-red-500" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Filter Actions */}
            <div className="flex items-center gap-2">
              <Link href={`/${locale}/admin/photos?tab=business`}>
                <Button variant={!filterStatus || filterStatus !== "deleted" ? "default" : "outline"} size="sm">
                  Active
                </Button>
              </Link>
              <Link href={`/${locale}/admin/photos?tab=business&status=deleted`}>
                <Button variant={filterStatus === "deleted" ? "default" : "outline"} size="sm">
                  Deleted
                </Button>
              </Link>
            </div>

            {/* Business Photos Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-cpAqua" />
                  Business Photos
                </CardTitle>
                <CardDescription>
                  Photos uploaded by business owners - no moderation required
                </CardDescription>
              </CardHeader>
              <CardContent>
                {businessPhotosList.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No business photos found
                  </p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-20">Preview</TableHead>
                        <TableHead>Place / Business</TableHead>
                        <TableHead>Uploader</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {businessPhotosList.map((photo) => (
                        <TableRow key={photo.id}>
                          <TableCell>
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted">
                              <Image
                                src={getBusinessPhotoUrl(photo.storageKey)}
                                alt={photo.altText || "Business photo"}
                                fill
                                className="object-cover"
                                sizes="64px"
                              />
                              {photo.isPrimary && (
                                <div className="absolute top-0 right-0 bg-cpAqua text-white text-[10px] px-1 rounded-bl">
                                  Primary
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <Link
                                href={`/${locale}/place/${photo.placeSlug}`}
                                className="font-medium hover:underline"
                                target="_blank"
                              >
                                {photo.placeName || "Unknown Place"}
                              </Link>
                              <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                                {photo.businessName || "Unknown Business"}
                              </p>
                              {photo.caption && (
                                <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                                  {photo.caption}
                                </p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm">{photo.uploaderName || "Business Owner"}</p>
                              <p className="text-xs text-muted-foreground">{photo.uploaderEmail}</p>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(photo.status)}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(photo.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            {photo.status === "active" && (
                              <BusinessPhotoActions photoId={photo.id} />
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
