"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Star, MessageSquare, Send, Loader2, User, X } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ReviewReply {
  id: number;
  authorType: "business" | "admin";
  body: string;
  createdAt: Date | string;
}

// Drizzle ORM returns relations as either single objects or arrays
type DrizzleRelation<T> = T | T[] | { [x: string]: any } | { [x: string]: any }[] | null | undefined;
type DrizzleArray<T> = T[] | { [x: string]: any }[];

interface Review {
  id: number;
  rating: number;
  title: string | null;
  body: string;
  status: "pending" | "published" | "rejected" | "flagged";
  isFeatured: boolean;
  createdAt: Date | string;
  visitDate: Date | string | null;
  place: DrizzleRelation<{
    id: number;
    name: string;
    slug: string;
  }>;
  user: DrizzleRelation<{
    id: number;
    name: string | null;
    email: string | null;
  }>;
  replies: DrizzleArray<ReviewReply>;
}

// Helper to safely get relation value
function getRelation<T>(rel: DrizzleRelation<T>): T | null {
  if (!rel) return null;
  if (Array.isArray(rel)) return rel[0] as T || null;
  return rel as T;
}

interface BusinessReviewsTableProps {
  reviews: Review[];
  businessId: number;
}

export function BusinessReviewsTable({ reviews, businessId }: BusinessReviewsTableProps) {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localReviews, setLocalReviews] = useState(reviews);
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const renderStars = (rating: number) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "h-3 w-3",
            star <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
          )}
        />
      ))}
    </div>
  );

  const getStatusBadge = (status: Review["status"]) => {
    switch (status) {
      case "published":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Published</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case "flagged":
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Flagged</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleReply = async () => {
    if (!selectedReview || !replyText.trim()) return;

    setIsSubmitting(true);
    setSubmitMessage(null);
    try {
      const response = await fetch(`/api/reviews/${selectedReview.id}/replies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: replyText }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit reply");
      }

      const data = await response.json();

      // Update local state
      setLocalReviews((prev) =>
        prev.map((r) =>
          r.id === selectedReview.id
            ? {
                ...r,
                replies: [
                  ...r.replies,
                  {
                    id: data.reply.id,
                    authorType: data.reply.authorType,
                    body: replyText,
                    createdAt: new Date().toISOString(),
                  },
                ],
              }
            : r
        )
      );

      setSubmitMessage({ type: "success", text: "Reply posted successfully!" });
      setReplyText("");
      setTimeout(() => {
        setIsReplyOpen(false);
        setIsDetailOpen(false);
        setSubmitMessage(null);
      }, 1500);
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to post reply",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openReplyDialog = (review: Review) => {
    setSelectedReview(review);
    setReplyText("");
    setIsReplyOpen(true);
  };

  const publishedReviews = localReviews.filter((r) => r.status === "published");

  if (localReviews.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No reviews yet</p>
        <p className="text-sm mt-1">
          Reviews from your customers will appear here
        </p>
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Place</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Review</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {localReviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell className="font-medium">
                {getRelation(review.place)?.name || "Unknown"}
              </TableCell>
              <TableCell>
                <div className="text-sm">{getRelation(review.user)?.name || "Anonymous"}</div>
              </TableCell>
              <TableCell>{renderStars(review.rating)}</TableCell>
              <TableCell className="max-w-[200px]">
                {review.title && (
                  <p className="font-medium text-sm truncate">{review.title}</p>
                )}
                <p className="text-sm text-muted-foreground truncate">
                  {review.body}
                </p>
                {review.replies.length > 0 && (
                  <div className="flex items-center gap-1 mt-1 text-xs text-blue-600">
                    <MessageSquare className="h-3 w-3" />
                    <span>Replied</span>
                  </div>
                )}
              </TableCell>
              <TableCell>{getStatusBadge(review.status)}</TableCell>
              <TableCell className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedReview(review);
                      setIsDetailOpen(true);
                    }}
                  >
                    View
                  </Button>
                  {review.status === "published" && review.replies.length === 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openReplyDialog(review)}
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Review Details</DialogTitle>
            <DialogDescription>
              {selectedReview && getRelation(selectedReview.place)?.name || "Unknown place"}
            </DialogDescription>
          </DialogHeader>

          {selectedReview && (
            <div className="space-y-4">
              {/* Customer Info */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">
                    {getRelation(selectedReview.user)?.name || "Anonymous"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(selectedReview.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                {renderStars(selectedReview.rating)}
                <span className="font-medium">{selectedReview.rating}/5</span>
                {getStatusBadge(selectedReview.status)}
              </div>

              {/* Review Content */}
              <div className="space-y-2">
                {selectedReview.title && (
                  <h4 className="font-medium">{selectedReview.title}</h4>
                )}
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {selectedReview.body}
                </p>
                {selectedReview.visitDate && (
                  <p className="text-xs text-muted-foreground">
                    Visited:{" "}
                    {new Date(selectedReview.visitDate).toLocaleDateString()}
                  </p>
                )}
              </div>

              {/* Existing Replies */}
              {selectedReview.replies.length > 0 && (
                <div className="space-y-3 border-t pt-4">
                  <h4 className="text-sm font-medium">Your Response</h4>
                  {selectedReview.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="bg-blue-50 rounded-lg p-3 border border-blue-100"
                    >
                      <div className="flex items-center gap-2 mb-2 text-xs text-blue-700">
                        <MessageSquare className="h-3 w-3" />
                        <span>Business Response</span>
                        <span>·</span>
                        <span>
                          {formatDistanceToNow(new Date(reply.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                      <p className="text-sm">{reply.body}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply Button */}
              {selectedReview.status === "published" &&
                selectedReview.replies.length === 0 && (
                  <div className="border-t pt-4">
                    <Button
                      className="w-full"
                      onClick={() => openReplyDialog(selectedReview)}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Write a Response
                    </Button>
                  </div>
                )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog open={isReplyOpen} onOpenChange={setIsReplyOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Respond to Review</DialogTitle>
            <DialogDescription>
              Your response will be publicly visible under this review
            </DialogDescription>
          </DialogHeader>

          {selectedReview && (
            <div className="space-y-4">
              {/* Original Review Summary */}
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  {renderStars(selectedReview.rating)}
                  <span className="text-sm font-medium">
                    {getRelation(selectedReview.user)?.name || "Anonymous"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {selectedReview.body}
                </p>
              </div>

              {/* Reply Input */}
              <div className="space-y-2">
                <Textarea
                  placeholder="Thank you for your feedback..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={4}
                  maxLength={2000}
                />
                <p className="text-xs text-muted-foreground text-right">
                  {replyText.length}/2000 characters
                </p>
              </div>

              {/* Submit message */}
              {submitMessage && (
                <div className={cn(
                  "p-3 rounded-lg text-sm",
                  submitMessage.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                )}>
                  {submitMessage.text}
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsReplyOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleReply}
              disabled={isSubmitting || replyText.trim().length < 5}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Post Response
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
