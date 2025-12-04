"use client";

import { useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useAuth, isAuthConfigured } from "@/lib/auth/use-auth";
import { stackClientApp } from "@/lib/auth/stack-client";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  placeId: number;
  initialIsFavorite?: boolean;
  variant?: "default" | "icon" | "card";
  className?: string;
}

export function FavoriteButton({
  placeId,
  initialIsFavorite = false,
  variant = "default",
  className,
}: FavoriteButtonProps) {
  const user = useAuth();
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isPending, startTransition] = useTransition();

  const handleToggleFavorite = async () => {
    // If not logged in, redirect to sign in
    if (!isAuthConfigured || !user) {
      // Store intended action in sessionStorage for after login
      sessionStorage.setItem("pendingFavorite", JSON.stringify({ placeId }));

      toast({
        title: "Sign in required",
        description: "Please sign in to save places to your favorites.",
      });

      // Redirect to sign in
      stackClientApp.redirectToSignIn();
      return;
    }

    // Optimistic update
    const previousState = isFavorite;
    setIsFavorite(!isFavorite);

    startTransition(async () => {
      try {
        const response = await fetch("/api/favorites", {
          method: previousState ? "DELETE" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ placeId }),
        });

        const data = await response.json();

        if (!response.ok) {
          // Revert optimistic update
          setIsFavorite(previousState);
          toast({
            variant: "destructive",
            title: "Error",
            description: data.error || "Failed to update favorites",
          });
          return;
        }

        // Show success toast
        toast({
          title: previousState ? "Removed from favorites" : "Added to favorites",
          description: previousState
            ? "This place has been removed from your saved places."
            : "This place has been saved to your favorites!",
        });
      } catch (error) {
        // Revert optimistic update
        setIsFavorite(previousState);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong. Please try again.",
        });
      }
    });
  };

  // Icon-only variant for cards
  if (variant === "icon") {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleToggleFavorite();
        }}
        disabled={isPending}
        className={cn(
          "p-2 rounded-full transition-all duration-200",
          "hover:bg-cpPink/10 focus:outline-none focus:ring-2 focus:ring-cpPink/50",
          isFavorite
            ? "text-cpPink"
            : "text-slate-400 hover:text-cpPink",
          isPending && "opacity-50 cursor-not-allowed",
          className
        )}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          className={cn(
            "h-5 w-5 transition-all duration-200",
            isFavorite && "fill-cpPink"
          )}
        />
      </button>
    );
  }

  // Card overlay variant (for PlaceCard)
  if (variant === "card") {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleToggleFavorite();
        }}
        disabled={isPending}
        className={cn(
          "absolute top-2 right-2 z-20 p-2 rounded-full",
          "bg-white/80 backdrop-blur-sm shadow-md",
          "transition-all duration-200",
          "hover:bg-white hover:scale-110",
          isFavorite
            ? "text-cpPink"
            : "text-slate-400 hover:text-cpPink",
          isPending && "opacity-50 cursor-not-allowed",
          className
        )}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          className={cn(
            "h-4 w-4 transition-all duration-200",
            isFavorite && "fill-cpPink"
          )}
        />
      </button>
    );
  }

  // Default button variant
  return (
    <Button
      variant={isFavorite ? "default" : "outline"}
      size="sm"
      onClick={handleToggleFavorite}
      disabled={isPending}
      className={cn(
        isFavorite
          ? "bg-cpPink hover:bg-cpPink/90 text-white"
          : "border-cpPink text-cpPink hover:bg-cpPink/10",
        className
      )}
    >
      <Heart
        className={cn(
          "h-4 w-4 mr-2",
          isFavorite && "fill-white"
        )}
      />
      {isFavorite ? "Saved" : "Save"}
    </Button>
  );
}
