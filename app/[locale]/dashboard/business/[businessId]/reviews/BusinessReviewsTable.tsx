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
            star <= rating ? "text-cpAmber fill-cpAmber" : "text-muted-foreground/30 dark:text-cpCream/30"
          )}
        />
      ))}
    </div>
  );

  const getStatusBadge = (status: Review["status"]) => {
    switch (status) {
      case "published":
        return <Badge variant="outline" className="bg-cpCoral/10 text-cpCoral border-cpCoral/30 dark:bg-cpCoral/20">Published</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-cpAmber/10 text-cpAmber border-cpAmber/30 dark:bg-cpAmber/20">Pending</Badge>;
      case "flagged":
        return <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/30 dark:bg-orange-500/20">Flagged</Badge>;
      default:
        return <Badge variant="outline" className="dark:border-cpAmber/30 dark:text-cpCream">{status}</Badge>;
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
      <div className="text-center py-8 text-muted-foreground dark:text-cpCream/60">
        <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50 text-cpCoral" />
        <p className="text-foreground dark:text-cpCream">No reviews yet</p>
        <p className="text-sm mt-1">
          Reviews from your customers will appear here
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-4">
        {localReviews.map((review) => (
          <div key={review.id} className="border border-border dark:border-cpAmber/20 rounded-lg p-4 space-y-3 bg-card dark:bg-cpSurface/30">
            {/* Header: Place + Status */}
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm truncate text-foreground dark:text-cpCream">
                  {getRelation(review.place)?.name || "Unknown"}
                </p>
                <p className="text-xs text-muted-foreground dark:text-cpCream/60">
                  {getRelation(review.user)?.name || "Anonymous"} · {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                </p>
              </div>
              {getStatusBadge(review.status)}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              {renderStars(review.rating)}
              <span className="text-sm font-medium text-foreground dark:text-cpCream">{review.rating}/5</span>
            </div>

            {/* Review Content */}
            <div className="space-y-1">
              {review.title && (
                <p className="font-medium text-sm text-foreground dark:text-cpCream">{review.title}</p>
              )}
              <p className="text-sm text-muted-foreground dark:text-cpCream/60 line-clamp-2">
                {review.body}
              </p>
            </div>

            {/* Replied indicator */}
            {review.replies.length > 0 && (
              <div className="flex items-center gap-1 text-xs text-cpCoral">
                <MessageSquare className="h-3 w-3" />
                <span>Replied</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-1">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 dark:border-cpAmber/30 dark:text-cpCream dark:hover:bg-cpAmber/10"
                onClick={() => {
                  setSelectedReview(review);
                  setIsDetailOpen(true);
                }}
              >
                View
              </Button>
              {review.status === "published" && review.replies.length === 0 && (
                <Button
                  size="sm"
                  className="flex-1 bg-cpCoral hover:bg-cpCoral/90"
                  onClick={() => openReplyDialog(review)}
                >
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Reply
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow className="border-border dark:border-cpAmber/20">
              <TableHead className="text-muted-foreground dark:text-cpCream/70">Place</TableHead>
              <TableHead className="text-muted-foreground dark:text-cpCream/70">Customer</TableHead>
              <TableHead className="text-muted-foreground dark:text-cpCream/70">Rating</TableHead>
              <TableHead className="text-muted-foreground dark:text-cpCream/70">Review</TableHead>
              <TableHead className="text-muted-foreground dark:text-cpCream/70">Status</TableHead>
              <TableHead className="text-muted-foreground dark:text-cpCream/70">Date</TableHead>
              <TableHead className="text-right text-muted-foreground dark:text-cpCream/70">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {localReviews.map((review) => (
              <TableRow key={review.id} className="border-border dark:border-cpAmber/10">
                <TableCell className="font-medium text-foreground dark:text-cpCream">
                  {getRelation(review.place)?.name || "Unknown"}
                </TableCell>
                <TableCell>
                  <div className="text-sm text-foreground dark:text-cpCream">{getRelation(review.user)?.name || "Anonymous"}</div>
                </TableCell>
                <TableCell>{renderStars(review.rating)}</TableCell>
                <TableCell className="max-w-[200px]">
                  {review.title && (
                    <p className="font-medium text-sm truncate text-foreground dark:text-cpCream">{review.title}</p>
                  )}
                  <p className="text-sm text-muted-foreground dark:text-cpCream/60 truncate">
                    {review.body}
                  </p>
                  {review.replies.length > 0 && (
                    <div className="flex items-center gap-1 mt-1 text-xs text-cpCoral">
                      <MessageSquare className="h-3 w-3" />
                      <span>Replied</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>{getStatusBadge(review.status)}</TableCell>
                <TableCell className="text-xs text-muted-foreground dark:text-cpCream/60">
                  {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="dark:text-cpCream dark:hover:bg-cpAmber/10"
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
                        className="dark:border-cpAmber/30 dark:text-cpCream dark:hover:bg-cpAmber/10"
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
      </div>

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto dark:bg-cpSurface dark:border-cpAmber/20">
          <DialogHeader>
            <DialogTitle className="text-foreground dark:text-cpCream">Review Details</DialogTitle>
            <DialogDescription className="dark:text-cpCream/60">
              {selectedReview && getRelation(selectedReview.place)?.name || "Unknown place"}
            </DialogDescription>
          </DialogHeader>

          {selectedReview && (
            <div className="space-y-4">
              {/* Customer Info */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-cpCoral" />
                </div>
                <div>
                  <p className="font-medium text-foreground dark:text-cpCream">
                    {getRelation(selectedReview.user)?.name || "Anonymous"}
                  </p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/60">
                    {formatDistanceToNow(new Date(selectedReview.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                {renderStars(selectedReview.rating)}
                <span className="font-medium text-foreground dark:text-cpCream">{selectedReview.rating}/5</span>
                {getStatusBadge(selectedReview.status)}
              </div>

              {/* Review Content */}
              <div className="space-y-2">
                {selectedReview.title && (
                  <h4 className="font-medium text-foreground dark:text-cpCream">{selectedReview.title}</h4>
                )}
                <p className="text-sm text-muted-foreground dark:text-cpCream/60 whitespace-pre-line">
                  {selectedReview.body}
                </p>
                {selectedReview.visitDate && (
                  <p className="text-xs text-muted-foreground dark:text-cpCream/50">
                    Visited:{" "}
                    {new Date(selectedReview.visitDate).toLocaleDateString()}
                  </p>
                )}
              </div>

              {/* Existing Replies */}
              {selectedReview.replies.length > 0 && (
                <div className="space-y-3 border-t border-border dark:border-cpAmber/20 pt-4">
                  <h4 className="text-sm font-medium text-foreground dark:text-cpCream">Your Response</h4>
                  {selectedReview.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="bg-cpCoral/5 dark:bg-cpCoral/10 rounded-lg p-3 border border-cpCoral/20 dark:border-cpCoral/30"
                    >
                      <div className="flex items-center gap-2 mb-2 text-xs text-cpCoral">
                        <MessageSquare className="h-3 w-3" />
                        <span>Business Response</span>
                        <span>·</span>
                        <span>
                          {formatDistanceToNow(new Date(reply.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-foreground dark:text-cpCream">{reply.body}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply Button */}
              {selectedReview.status === "published" &&
                selectedReview.replies.length === 0 && (
                  <div className="border-t border-border dark:border-cpAmber/20 pt-4">
                    <Button
                      className="w-full bg-cpCoral hover:bg-cpCoral/90"
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
        <DialogContent className="dark:bg-cpSurface dark:border-cpAmber/20">
          <DialogHeader>
            <DialogTitle className="text-foreground dark:text-cpCream">Respond to Review</DialogTitle>
            <DialogDescription className="dark:text-cpCream/60">
              Your response will be publicly visible under this review
            </DialogDescription>
          </DialogHeader>

          {selectedReview && (
            <div className="space-y-4">
              {/* Original Review Summary */}
              <div className="bg-muted/50 dark:bg-cpCharcoal/50 rounded-lg p-3 border border-border dark:border-cpAmber/20">
                <div className="flex items-center gap-2 mb-2">
                  {renderStars(selectedReview.rating)}
                  <span className="text-sm font-medium text-foreground dark:text-cpCream">
                    {getRelation(selectedReview.user)?.name || "Anonymous"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground dark:text-cpCream/60 line-clamp-3">
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
                  className="dark:bg-cpCharcoal/50 dark:border-cpAmber/30 dark:text-cpCream dark:placeholder:text-cpCream/40"
                />
                <p className="text-xs text-muted-foreground dark:text-cpCream/50 text-right">
                  {replyText.length}/2000 characters
                </p>
              </div>

              {/* Submit message */}
              {submitMessage && (
                <div className={cn(
                  "p-3 rounded-lg text-sm",
                  submitMessage.type === "success"
                    ? "bg-cpCoral/10 text-cpCoral dark:bg-cpCoral/20"
                    : "bg-red-500/10 text-red-500 dark:bg-red-500/20"
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
              className="dark:border-cpAmber/30 dark:text-cpCream dark:hover:bg-cpAmber/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleReply}
              disabled={isSubmitting || replyText.trim().length < 5}
              className="bg-cpCoral hover:bg-cpCoral/90"
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
