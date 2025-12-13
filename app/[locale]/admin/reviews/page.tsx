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
import { reviews, places, users } from "@/db/schema/directory";
import { MessageSquare, CheckCircle, XCircle, Flag, Clock, Star, Mail } from "lucide-react";
import Link from "next/link";
import { ReviewModerationActions } from "./ReviewModerationActions";

interface AdminReviewsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ status?: string }>;
}

export default async function AdminReviewsPage({ params, searchParams }: AdminReviewsPageProps) {
  const { locale } = await params;
  const { status: filterStatus } = await searchParams;
  const user = await requireAdmin(locale);

  if (!db) {
    return <div className="p-8 text-center">Database not available</div>;
  }

  // Get review stats
  const stats = await db
    .select({
      status: reviews.status,
      count: sql<number>`count(*)`,
    })
    .from(reviews)
    .groupBy(reviews.status);

  const statsByStatus = {
    pending: stats.find((s) => s.status === "pending")?.count || 0,
    published: stats.find((s) => s.status === "published")?.count || 0,
    rejected: stats.find((s) => s.status === "rejected")?.count || 0,
    flagged: stats.find((s) => s.status === "flagged")?.count || 0,
  };

  // Get reviews with filters
  const reviewsList = await db
    .select({
      id: reviews.id,
      rating: reviews.rating,
      title: reviews.title,
      body: reviews.body,
      status: reviews.status,
      isFeatured: reviews.isFeatured,
      createdAt: reviews.createdAt,
      placeName: places.name,
      placeSlug: places.slug,
      userName: users.name,
      userEmail: users.email,
    })
    .from(reviews)
    .leftJoin(places, eq(reviews.placeId, places.id))
    .leftJoin(users, eq(reviews.userId, users.id))
    .where(filterStatus ? eq(reviews.status, filterStatus as typeof reviews.$inferSelect["status"]) : undefined)
    .orderBy(desc(reviews.createdAt))
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
      case "published":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-700 border-0">
            <CheckCircle className="h-3 w-3 mr-1" />
            Published
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

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Review Moderation"
        description="Review and moderate user reviews"
        user={user}
        locale={locale}
      />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link href={`/${locale}/admin/reviews?status=pending`}>
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

          <Link href={`/${locale}/admin/reviews?status=published`}>
            <Card className={`cursor-pointer hover:border-green-500 transition-colors ${filterStatus === "published" ? "border-green-500 bg-green-50" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Published</p>
                    <p className="text-2xl font-bold text-green-600">{statsByStatus.published}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href={`/${locale}/admin/reviews?status=rejected`}>
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

          <Link href={`/${locale}/admin/reviews?status=flagged`}>
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
          <Link href={`/${locale}/admin/reviews`}>
            <Button variant={!filterStatus ? "default" : "outline"} size="sm">
              All
            </Button>
          </Link>
          <Link href={`/${locale}/admin/reviews?status=pending`}>
            <Button variant={filterStatus === "pending" ? "default" : "outline"} size="sm">
              Pending
            </Button>
          </Link>
          <Link href={`/${locale}/admin/reviews?status=flagged`}>
            <Button variant={filterStatus === "flagged" ? "default" : "outline"} size="sm">
              Flagged
            </Button>
          </Link>
        </div>

        {/* Reviews Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-cpAqua" />
              Reviews
            </CardTitle>
            <CardDescription>
              {filterStatus ? `Showing ${filterStatus} reviews` : "All reviews"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {reviewsList.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No reviews found
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rating</TableHead>
                    <TableHead>Review</TableHead>
                    <TableHead>Place</TableHead>
                    <TableHead>Reviewer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reviewsList.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell>
                        {renderStars(review.rating)}
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[300px]">
                          {review.title && (
                            <p className="font-medium truncate">{review.title}</p>
                          )}
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {review.body}
                          </p>
                          {review.isFeatured && (
                            <Badge variant="secondary" className="mt-1 bg-cpAqua/20 text-cpAqua">
                              Featured
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/${locale}/place/${review.placeSlug}`}
                          className="text-sm hover:underline font-medium"
                          target="_blank"
                        >
                          {review.placeName || "Unknown"}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{review.userName || "Anonymous"}</p>
                          {review.userEmail && (
                            <a
                              href={`mailto:${review.userEmail}`}
                              className="text-xs text-muted-foreground hover:text-cpAqua flex items-center gap-1"
                            >
                              <Mail className="h-3 w-3" />
                              {review.userEmail}
                            </a>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(review.status)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <ReviewModerationActions
                          reviewId={review.id}
                          currentStatus={review.status}
                          isFeatured={review.isFeatured}
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
