import { redirect, notFound } from "next/navigation";
import { stackServerApp } from "@/stack";
import { getUserByStackAuthId } from "@/db/queries/users";
import { getBusinessById } from "@/db/queries/businesses";
import { getReviewsForBusiness } from "@/db/queries/reviews";
import { BusinessReviewsTable } from "./BusinessReviewsTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Star } from "lucide-react";

interface PageProps {
  params: Promise<{
    locale: string;
    businessId: string;
  }>;
}

export default async function BusinessReviewsPage({ params }: PageProps) {
  const { locale, businessId } = await params;
  const businessIdNum = parseInt(businessId, 10);

  if (isNaN(businessIdNum)) {
    notFound();
  }

  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    redirect(`/${locale}/handler/sign-in`);
  }

  const user = await getUserByStackAuthId(stackUser.id);
  if (!user) {
    redirect(`/${locale}/handler/sign-in`);
  }

  const business = await getBusinessById(businessIdNum);
  if (!business) {
    notFound();
  }

  // Verify user owns this business
  if (business.userId !== user.id) {
    redirect(`/${locale}/dashboard`);
  }

  // Fetch reviews for this business
  const reviews = await getReviewsForBusiness(businessIdNum, 50, 0);

  // Calculate stats
  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
    : 0;
  const pendingReplies = reviews.filter(
    (r) => r.replies && r.replies.length === 0 && r.status === "published"
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reviews</h1>
        <p className="text-muted-foreground">
          View and respond to customer reviews
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReviews}</div>
            <p className="text-xs text-muted-foreground">
              Across all your places
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {avgRating > 0 ? avgRating.toFixed(1) : "-"}
            </div>
            <p className="text-xs text-muted-foreground">
              Out of 5 stars
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Needs Response</CardTitle>
            <MessageSquare className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReplies}</div>
            <p className="text-xs text-muted-foreground">
              Reviews without a reply
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Reviews Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
          <CardDescription>
            View all reviews and respond to your customers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BusinessReviewsTable
            reviews={reviews}
            businessId={businessIdNum}
          />
        </CardContent>
      </Card>
    </div>
  );
}
