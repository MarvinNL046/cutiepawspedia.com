"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Send } from "lucide-react";
import { RatingStars } from "./RatingStars";
import { PhotoUploader, type PhotoPreview } from "./PhotoUploader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const reviewFormSchema = z.object({
  rating: z.number().min(1, "Please select a rating").max(5),
  title: z.string().max(255).optional(),
  body: z
    .string()
    .min(10, "Review must be at least 10 characters")
    .max(5000, "Review cannot exceed 5000 characters"),
  visitDate: z.string().optional(),
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;

interface ReviewFormProps {
  placeId: number;
  placeName: string;
  onSuccess?: () => void;
  isLoggedIn?: boolean;
}

export function ReviewForm({
  placeId,
  placeName,
  onSuccess,
  isLoggedIn = false,
}: ReviewFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photos, setPhotos] = useState<PhotoPreview[]>([]);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      rating: 0,
      title: "",
      body: "",
      visitDate: "",
    },
  });

  const watchedRating = form.watch("rating");

  // Handle photos change from PhotoUploader
  const handlePhotosChange = useCallback((newPhotos: PhotoPreview[]) => {
    setPhotos(newPhotos);
  }, []);

  // Upload photos for a review
  const uploadPhotos = async (reviewId: number): Promise<boolean> => {
    const validPhotos = photos.filter((p) => p.status === "pending" && !p.error);
    if (validPhotos.length === 0) return true;

    // Update photos to uploading status
    setPhotos((prev) =>
      prev.map((p) =>
        p.status === "pending" && !p.error ? { ...p, status: "uploading" as const } : p
      )
    );

    try {
      const formData = new FormData();
      for (const photo of validPhotos) {
        formData.append("photos", photo.file);
      }

      const response = await fetch(`/api/reviews/${reviewId}/photos`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to upload photos");
      }

      // Update photo statuses
      setPhotos((prev) =>
        prev.map((p) => {
          if (p.status === "uploading") {
            const uploaded = result.uploaded?.find(
              (_: unknown, i: number) => validPhotos[i]?.id === p.id
            );
            if (uploaded) {
              return { ...p, status: "success" as const, uploadedKey: uploaded.id };
            }
            const error = result.errors?.find(
              (e: { filename: string }) => e.filename === p.file.name
            );
            if (error) {
              return { ...p, status: "error" as const, error: error.error };
            }
          }
          return p;
        })
      );

      return true;
    } catch (error) {
      // Mark all uploading photos as errored
      setPhotos((prev) =>
        prev.map((p) =>
          p.status === "uploading"
            ? { ...p, status: "error" as const, error: "Upload failed" }
            : p
        )
      );
      console.error("Photo upload error:", error);
      return false;
    }
  };

  const onSubmit = async (data: ReviewFormValues) => {
    if (!isLoggedIn) {
      toast({
        title: "Sign in required",
        description: "Please sign in to leave a review",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          placeId,
          rating: data.rating,
          title: data.title || null,
          body: data.body,
          visitDate: data.visitDate || null,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit review");
      }

      // Upload photos if any
      const hasPhotos = photos.some((p) => p.status === "pending" && !p.error);
      if (hasPhotos && result.review?.id) {
        const photosUploaded = await uploadPhotos(result.review.id);
        if (!photosUploaded) {
          toast({
            title: "Review submitted, but some photos failed",
            description: "Your review was saved. Some photos could not be uploaded.",
            variant: "destructive",
          });
        }
      }

      toast({
        title: "Review submitted!",
        description: hasPhotos
          ? "Your review and photos are pending moderation."
          : "Your review is pending moderation and will be published soon.",
      });

      form.reset();
      setPhotos([]);
      router.refresh();
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit review",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <Card className="bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20">
        <CardHeader>
          <CardTitle className="text-lg text-foreground dark:text-cpCream">Write a Review</CardTitle>
          <CardDescription className="dark:text-cpCream/70">
            Share your experience at {placeName}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-muted-foreground dark:text-cpCream/70 mb-4">
              Please sign in to leave a review
            </p>
            <Button
              onClick={() => router.push("/handler/sign-in")}
              className="bg-cpCoral hover:bg-cpCoral/90"
            >
              Sign In to Review
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20">
      <CardHeader>
        <CardTitle className="text-lg text-foreground dark:text-cpCream">Write a Review</CardTitle>
        <CardDescription className="dark:text-cpCream/70">
          Share your experience at {placeName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Rating */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Rating *</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-3">
                      <RatingStars
                        rating={field.value ?? 0}
                        size="lg"
                        interactive
                        onChange={field.onChange}
                      />
                      {watchedRating > 0 && (
                        <span className="text-sm font-medium">
                          {watchedRating} / 5
                        </span>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Summarize your experience"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Optional headline for your review</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Review Body */}
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Review *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell others about your experience..."
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {(field.value ?? "").length}/5000 characters (minimum 10)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Visit Date */}
            <FormField
              control={form.control}
              name="visitDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>When did you visit?</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      max={new Date().toISOString().split("T")[0]}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Optional - helps others understand context</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Photos */}
            <div className="space-y-2">
              <FormLabel>Add Photos</FormLabel>
              <PhotoUploader
                photos={photos}
                onPhotosChange={handlePhotosChange}
                disabled={isSubmitting}
              />
              <FormDescription>
                Optional - share photos of your experience (max 5)
              </FormDescription>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-cpCoral hover:bg-cpCoral/90"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Review
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground dark:text-cpCream/60 mt-2">
                Your review will be published after moderation
              </p>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
