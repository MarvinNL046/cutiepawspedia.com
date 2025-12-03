"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Eye, Trash2, Star, CheckCircle, XCircle, Flag, Award } from "lucide-react";
import { useRouter } from "next/navigation";

type ReviewStatus = "pending" | "published" | "rejected" | "flagged";

interface Review {
  id: number;
  rating: number;
  title: string | null;
  body: string;
  status: ReviewStatus;
  isFeatured: boolean;
  locale: string;
  visitDate: string | null;
  createdAt: Date;
  updatedAt: Date;
  placeId: number;
  placeName: string | null;
  placeSlug: string | null;
  userId: number;
  userEmail: string | null;
  userName: string | null;
}

interface StatusCounts {
  pending: number;
  published: number;
  rejected: number;
  flagged: number;
}

interface ReviewsTableProps {
  initialReviews: Review[];
  initialTotal: number;
}

export function ReviewsTable({
  initialReviews,
  initialTotal,
}: ReviewsTableProps) {
  const router = useRouter();
  const [reviews, setReviews] = useState(initialReviews);
  const [total, setTotal] = useState(initialTotal);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<ReviewStatus | "all">("all");
  const [statusCounts, setStatusCounts] = useState<StatusCounts | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const [page, setPage] = useState(0);
  const pageSize = 20;

  const fetchReviews = async () => {
    setIsLoading(true);

    try {
      const params = new URLSearchParams();
      params.set("limit", pageSize.toString());
      params.set("offset", (page * pageSize).toString());
      params.set("includeCounts", "true");
      if (statusFilter !== "all") {
        params.set("status", statusFilter);
      }

      const res = await fetch(`/api/admin/reviews?${params.toString()}`);

      if (!res.ok) throw new Error("Failed to fetch reviews");

      const data = await res.json();
      setReviews(data.reviews);
      setTotal(data.total);
      if (data.statusCounts) {
        setStatusCounts(data.statusCounts);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, statusFilter]);

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete review");

      setReviews((prev) => prev.filter((r) => r.id !== id));
      setTotal((prev) => prev - 1);
      setIsDetailOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Failed to delete review");
    }
  };

  const handleModerate = async (id: number, action: "approve" | "reject" | "flag" | "toggle_featured") => {
    setActionLoading(`${action}-${id}`);
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      if (!res.ok) throw new Error("Failed to moderate review");

      const data = await res.json();

      // Update the review in state
      setReviews((prev) =>
        prev.map((r) =>
          r.id === id
            ? { ...r, status: data.review.status, isFeatured: data.review.isFeatured }
            : r
        )
      );

      // Update selected review if viewing detail
      if (selectedReview?.id === id) {
        setSelectedReview((prev) =>
          prev ? { ...prev, status: data.review.status, isFeatured: data.review.isFeatured } : null
        );
      }

      // Refresh counts
      fetchReviews();
    } catch (error) {
      console.error("Error moderating review:", error);
      alert("Failed to moderate review");
    } finally {
      setActionLoading(null);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const getStatusBadge = (status: ReviewStatus) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case "published":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Published</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>;
      case "flagged":
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Flagged</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="space-y-4">
      {/* Filters and Stats */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">{total} reviews</p>
          {statusCounts && (
            <div className="flex gap-2 text-xs">
              <span className="text-yellow-600">{statusCounts.pending} pending</span>
              <span className="text-green-600">{statusCounts.published} published</span>
              <span className="text-orange-600">{statusCounts.flagged} flagged</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filter:</span>
          <Select
            value={statusFilter}
            onValueChange={(value) => {
              setStatusFilter(value as ReviewStatus | "all");
              setPage(0);
            }}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="flagged">Flagged</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">
          No reviews found.
        </p>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Place</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Review</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-1">
                      {review.isFeatured && (
                        <Award className="h-4 w-4 text-yellow-500" />
                      )}
                      {review.placeName || "Unknown place"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{review.userName || "Anonymous"}</div>
                    <div className="text-xs text-muted-foreground">
                      {review.userEmail || "-"}
                    </div>
                  </TableCell>
                  <TableCell>{renderStars(review.rating)}</TableCell>
                  <TableCell className="max-w-[200px]">
                    {review.title && (
                      <p className="font-medium text-sm truncate">{review.title}</p>
                    )}
                    {review.body ? (
                      <p className="truncate text-sm text-muted-foreground">{review.body}</p>
                    ) : (
                      <span className="text-muted-foreground text-sm italic">
                        No content
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(review.status)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      {/* Quick action buttons */}
                      {review.status === "pending" && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => handleModerate(review.id, "approve")}
                            disabled={actionLoading === `approve-${review.id}`}
                            title="Approve"
                          >
                            {actionLoading === `approve-${review.id}` ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <CheckCircle className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleModerate(review.id, "reject")}
                            disabled={actionLoading === `reject-${review.id}`}
                            title="Reject"
                          >
                            {actionLoading === `reject-${review.id}` ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <XCircle className="h-4 w-4" />
                            )}
                          </Button>
                        </>
                      )}
                      {review.status === "published" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                          onClick={() => handleModerate(review.id, "flag")}
                          disabled={actionLoading === `flag-${review.id}`}
                          title="Flag"
                        >
                          {actionLoading === `flag-${review.id}` ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Flag className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          setSelectedReview(review);
                          setIsDetailOpen(true);
                        }}
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Page {page + 1} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={page >= totalPages - 1}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Details</DialogTitle>
            <DialogDescription>
              Full review content and moderation actions
            </DialogDescription>
          </DialogHeader>
          {selectedReview && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Place
                  </h4>
                  <p className="font-medium">
                    {selectedReview.placeName || "Unknown place"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    User
                  </h4>
                  <p>{selectedReview.userName || "Anonymous"}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedReview.userEmail || "-"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Rating
                  </h4>
                  <div className="flex items-center gap-2">
                    {renderStars(selectedReview.rating)}
                    <span className="font-medium">{selectedReview.rating}/5</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Status
                  </h4>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(selectedReview.status)}
                    {selectedReview.isFeatured && (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        <Award className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Date
                  </h4>
                  <p>
                    {new Date(selectedReview.createdAt).toLocaleDateString(
                      undefined,
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>
                {selectedReview.visitDate && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Visit Date
                    </h4>
                    <p>
                      {new Date(selectedReview.visitDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t pt-4">
                {selectedReview.title && (
                  <div className="mb-2">
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">
                      Title
                    </h4>
                    <p className="font-medium">{selectedReview.title}</p>
                  </div>
                )}
                <h4 className="text-sm font-medium text-muted-foreground mb-2">
                  Review
                </h4>
                {selectedReview.body ? (
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="whitespace-pre-wrap">{selectedReview.body}</p>
                  </div>
                ) : (
                  <p className="text-muted-foreground italic">
                    No review text provided
                  </p>
                )}
              </div>

              {/* Moderation Actions */}
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">
                  Moderation Actions
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedReview.status === "pending" && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-600 border-green-200 hover:bg-green-50"
                        onClick={() => handleModerate(selectedReview.id, "approve")}
                        disabled={actionLoading === `approve-${selectedReview.id}`}
                      >
                        {actionLoading === `approve-${selectedReview.id}` ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <CheckCircle className="h-4 w-4 mr-2" />
                        )}
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => handleModerate(selectedReview.id, "reject")}
                        disabled={actionLoading === `reject-${selectedReview.id}`}
                      >
                        {actionLoading === `reject-${selectedReview.id}` ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <XCircle className="h-4 w-4 mr-2" />
                        )}
                        Reject
                      </Button>
                    </>
                  )}
                  {selectedReview.status === "published" && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-orange-600 border-orange-200 hover:bg-orange-50"
                        onClick={() => handleModerate(selectedReview.id, "flag")}
                        disabled={actionLoading === `flag-${selectedReview.id}`}
                      >
                        {actionLoading === `flag-${selectedReview.id}` ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Flag className="h-4 w-4 mr-2" />
                        )}
                        Flag for Review
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={selectedReview.isFeatured ? "text-gray-600" : "text-yellow-600 border-yellow-200 hover:bg-yellow-50"}
                        onClick={() => handleModerate(selectedReview.id, "toggle_featured")}
                        disabled={actionLoading === `toggle_featured-${selectedReview.id}`}
                      >
                        {actionLoading === `toggle_featured-${selectedReview.id}` ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Award className="h-4 w-4 mr-2" />
                        )}
                        {selectedReview.isFeatured ? "Unfeature" : "Mark Featured"}
                      </Button>
                    </>
                  )}
                  {selectedReview.status === "flagged" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-green-600 border-green-200 hover:bg-green-50"
                      onClick={() => handleModerate(selectedReview.id, "approve")}
                      disabled={actionLoading === `approve-${selectedReview.id}`}
                    >
                      {actionLoading === `approve-${selectedReview.id}` ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <CheckCircle className="h-4 w-4 mr-2" />
                      )}
                      Approve (Unflag)
                    </Button>
                  )}
                  {selectedReview.status === "rejected" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-green-600 border-green-200 hover:bg-green-50"
                      onClick={() => handleModerate(selectedReview.id, "approve")}
                      disabled={actionLoading === `approve-${selectedReview.id}`}
                    >
                      {actionLoading === `approve-${selectedReview.id}` ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <CheckCircle className="h-4 w-4 mr-2" />
                      )}
                      Re-approve
                    </Button>
                  )}

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Review?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this review? This action
                          cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(selectedReview.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
