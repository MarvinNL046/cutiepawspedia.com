"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReviewForm } from "./ReviewForm";
import { Star, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";

interface Review {
  id: number;
  rating: number;
  title: string | null;
  body: string | null;
  createdAt: Date;
  user: { name: string | null } | { name: string | null }[] | null;
  replies?: { id: number; body: string; authorType: string }[];
}

interface ReviewSectionProps {
  placeId: number;
  placeName: string;
  reviews: Review[];
  isLoggedIn: boolean;
  locale: string;
}

export function ReviewSection({
  placeId,
  placeName,
  reviews,
  isLoggedIn,
  locale,
}: ReviewSectionProps) {
  const [showForm, setShowForm] = useState(false);

  const labels = {
    en: {
      reviews: "Reviews",
      writeReview: "Write a Review",
      hideForm: "Cancel",
      noReviews: "No reviews yet. Be the first!",
      businessResponse: "Business Response",
      adminResponse: "Admin Response",
    },
    nl: {
      reviews: "Beoordelingen",
      writeReview: "Schrijf een Review",
      hideForm: "Annuleren",
      noReviews: "Nog geen reviews. Wees de eerste!",
      businessResponse: "Reactie van bedrijf",
      adminResponse: "Reactie van beheerder",
    },
  };

  const t = labels[locale as keyof typeof labels] || labels.en;

  return (
    <Card className="bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-foreground dark:text-cpCream">{t.reviews}</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowForm(!showForm)}
          className="gap-1 dark:border-cpAmber/30 dark:text-cpCream dark:hover:bg-cpAmber/10"
        >
          {showForm ? (
            <>
              {t.hideForm}
              <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              {t.writeReview}
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        {/* Review Form - Collapsible */}
        {showForm && (
          <div className="mb-6 pb-6 border-b border-border dark:border-cpAmber/20">
            <ReviewForm
              placeId={placeId}
              placeName={placeName}
              isLoggedIn={isLoggedIn}
              onSuccess={() => setShowForm(false)}
            />
          </div>
        )}

        {/* Reviews List */}
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-border dark:border-cpAmber/10 pb-4 last:border-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= review.rating ? "fill-cpAmber text-cpAmber" : "text-muted-foreground/30 dark:text-cpCream/20"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground dark:text-cpCream/60">
                    {(() => {
                      const user = Array.isArray(review.user) ? review.user[0] : review.user;
                      return user?.name || "Anonymous";
                    })()}
                  </span>
                  <span className="text-xs text-muted-foreground/60 dark:text-cpCream/50">
                    {new Date(review.createdAt).toLocaleDateString(locale, { year: "numeric", month: "short", day: "numeric" })}
                  </span>
                </div>
                {review.title && <p className="font-medium text-foreground dark:text-cpCream mb-1">{review.title}</p>}
                {review.body && <p className="text-muted-foreground dark:text-cpCream/70">{review.body}</p>}
                {review.replies && review.replies.length > 0 && (
                  <div className="mt-3 pl-4 border-l-2 border-cpCoral/30">
                    {review.replies.map((reply) => (
                      <div key={reply.id} className="bg-muted dark:bg-cpSurface/50 rounded p-3 mt-2">
                        <p className="text-xs text-cpCoral font-medium mb-1">
                          {reply.authorType === "business" ? t.businessResponse : t.adminResponse}
                        </p>
                        <p className="text-sm text-muted-foreground dark:text-cpCream/70">{reply.body}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-muted-foreground/30 dark:text-cpCream/20 mx-auto mb-3" />
            <p className="text-muted-foreground dark:text-cpCream/60">{t.noReviews}</p>
            {!showForm && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowForm(true)}
                className="mt-4 gap-1 dark:border-cpAmber/30 dark:text-cpCream dark:hover:bg-cpAmber/10"
              >
                {t.writeReview}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
