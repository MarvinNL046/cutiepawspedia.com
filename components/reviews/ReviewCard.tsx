"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Award, MessageSquare, ChevronDown, ChevronUp, User, GraduationCap, BadgeCheck } from "lucide-react";
import { RatingStars } from "./RatingStars";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface ReviewReply {
  id: number;
  authorType: "business" | "admin";
  body: string;
  createdAt: string | Date;
  authorName?: string | null;
}

export interface ReviewData {
  id: number;
  rating: number;
  title: string | null;
  body: string;
  visitDate?: string | Date | null;
  createdAt: string | Date;
  isFeatured?: boolean;
  user?: {
    name: string | null;
    image?: string | null;
    trustLevel?: number;
    karmaPoints?: number;
    // E-E-A-T Expert fields
    isExpert?: boolean;
    professionalTitle?: string | null;
    credentials?: string[];
    expertiseAreas?: string[];
    yearsExperience?: number | null;
  } | null;
  replies?: ReviewReply[];
}

interface ReviewCardProps {
  review: ReviewData;
  className?: string;
  showReplies?: boolean;
}

export function ReviewCard({
  review,
  className,
  showReplies = true,
}: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAllReplies, setShowAllReplies] = useState(false);

  const userName = review.user?.name || "Anonymous";
  const userInitial = userName.charAt(0).toUpperCase();
  const hasLongBody = review.body && review.body.length > 300;
  const displayBody = hasLongBody && !isExpanded
    ? review.body.substring(0, 300) + "..."
    : review.body;

  const visibleReplies = showAllReplies
    ? review.replies
    : review.replies?.slice(0, 1);

  return (
    <div
      className={cn(
        "border rounded-lg p-4 space-y-3",
        review.isFeatured && "border-yellow-200 bg-yellow-50/30",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            {review.user?.image && (
              <AvatarImage src={review.user.image} alt={userName} />
            )}
            <AvatarFallback className="bg-primary/10 text-primary">
              {userInitial}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-sm">{userName}</span>
              {/* Expert Badge - E-E-A-T Signal */}
              {review.user?.isExpert && (
                <ExpertBadge
                  professionalTitle={review.user.professionalTitle}
                  credentials={review.user.credentials}
                  yearsExperience={review.user.yearsExperience}
                />
              )}
              {/* Trust Level Badge */}
              {review.user?.trustLevel !== undefined && review.user.trustLevel >= 2 && !review.user.isExpert && (
                <TrustLevelIcon level={review.user.trustLevel} />
              )}
              {review.isFeatured && (
                <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                  <Award className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>
                {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
              </span>
              {review.visitDate && (
                <>
                  <span>·</span>
                  <span>
                    Visited {new Date(review.visitDate).toLocaleDateString(undefined, {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        <RatingStars rating={review.rating} size="sm" />
      </div>

      {/* Content */}
      <div className="space-y-2">
        {review.title && (
          <h4 className="font-medium">{review.title}</h4>
        )}
        {review.body && (
          <div>
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {displayBody}
            </p>
            {hasLongBody && (
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-xs"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="h-3 w-3 mr-1" />
                    Show less
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3 w-3 mr-1" />
                    Read more
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Replies */}
      {showReplies && review.replies && review.replies.length > 0 && (
        <div className="space-y-2 pt-2 border-t">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MessageSquare className="h-3 w-3" />
            <span>
              {review.replies.length} {review.replies.length === 1 ? "response" : "responses"}
            </span>
          </div>
          {visibleReplies?.map((reply) => (
            <ReplyCard key={reply.id} reply={reply} />
          ))}
          {review.replies.length > 1 && (
            <Button
              variant="link"
              size="sm"
              className="h-auto p-0 text-xs"
              onClick={() => setShowAllReplies(!showAllReplies)}
            >
              {showAllReplies
                ? "Show fewer responses"
                : `View all ${review.replies.length} responses`}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

function ReplyCard({ reply }: { reply: ReviewReply }) {
  const isBusinessReply = reply.authorType === "business";

  return (
    <div className="ml-4 pl-4 border-l-2 border-muted">
      <div className="flex items-center gap-2 mb-1">
        <div
          className={cn(
            "flex items-center gap-1 text-xs font-medium",
            isBusinessReply ? "text-blue-600" : "text-purple-600"
          )}
        >
          <User className="h-3 w-3" />
          {isBusinessReply ? "Business Owner" : "Admin"}
        </div>
        <span className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
        </span>
      </div>
      <p className="text-sm text-muted-foreground">{reply.body}</p>
    </div>
  );
}

// Trust level icon with tooltip
function TrustLevelIcon({ level }: { level: number }) {
  const levelData: Record<number, { icon: string; label: string; color: string }> = {
    2: { icon: "⭐", label: "Contributor", color: "text-blue-600" },
    3: { icon: "🏆", label: "Trusted Reviewer", color: "text-amber-600" },
    4: { icon: "💎", label: "Expert", color: "text-purple-600" },
    5: { icon: "👑", label: "Legend", color: "text-orange-600" },
  };

  const data = levelData[level];
  if (!data) return null;

  return (
    <span
      className={cn("text-sm cursor-help", data.color)}
      title={data.label}
    >
      {data.icon}
    </span>
  );
}

// Expert badge with credentials tooltip (E-E-A-T)
interface ExpertBadgeProps {
  professionalTitle?: string | null;
  credentials?: string[];
  yearsExperience?: number | null;
}

function ExpertBadge({ professionalTitle, credentials, yearsExperience }: ExpertBadgeProps) {
  const hasCredentials = credentials && credentials.length > 0;
  const displayTitle = professionalTitle || "Pet Care Expert";

  // Build tooltip content
  const tooltipLines: string[] = [];
  if (professionalTitle) {
    tooltipLines.push(professionalTitle);
  }
  if (yearsExperience && yearsExperience > 0) {
    tooltipLines.push(`${yearsExperience}+ years experience`);
  }
  if (hasCredentials) {
    tooltipLines.push("Credentials: " + credentials.slice(0, 3).join(", "));
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant="secondary"
            className="text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 cursor-help gap-1"
          >
            <GraduationCap className="h-3 w-3" />
            <span className="hidden sm:inline">{displayTitle}</span>
            <span className="sm:hidden">Expert</span>
            <BadgeCheck className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
          </Badge>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="max-w-xs bg-white dark:bg-cpSurface border shadow-lg p-3"
        >
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-medium text-emerald-700 dark:text-emerald-300">
              <GraduationCap className="h-4 w-4" />
              <span>Verified Expert</span>
            </div>
            {tooltipLines.length > 0 ? (
              <ul className="text-sm text-muted-foreground space-y-0.5">
                {tooltipLines.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                Verified pet care professional
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Compact version for listing
export function ReviewCardCompact({ review }: { review: ReviewData }) {
  const userName = review.user?.name || "Anonymous";

  return (
    <div className="flex items-start gap-3 py-3 border-b last:border-0">
      <RatingStars rating={review.rating} size="sm" />
      <div className="flex-1 min-w-0">
        {review.title && (
          <p className="font-medium text-sm truncate">{review.title}</p>
        )}
        <p className="text-xs text-muted-foreground line-clamp-2">
          {review.body}
        </p>
        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
          <span>{userName}</span>
          <span>·</span>
          <span>
            {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
          </span>
        </div>
      </div>
    </div>
  );
}
