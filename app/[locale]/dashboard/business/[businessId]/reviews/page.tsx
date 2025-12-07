import { redirect, notFound } from "next/navigation";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId, getBusinessByIdForUser } from "@/db/queries";
import { getBusinessById } from "@/db/queries/businesses";
import { getReviewsForBusiness } from "@/db/queries/reviews";
import { BusinessReviewsTable } from "./BusinessReviewsTable";
import { DashboardHeader } from "@/components/dashboard";
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

  const stackUser = await stackServerApp?.getUser();
  if (!stackUser) {
    redirect(`/${locale}/handler/sign-in`);
  }

  const user = await getUserByStackAuthId(stackUser.id);
  if (!user) {
    redirect(`/${locale}/handler/sign-in`);
  }

  // Get business with ownership check (admin bypass)
  let business;
  if (user.role === "admin") {
    business = await getBusinessById(businessIdNum);
  } else {
    business = await getBusinessByIdForUser({ businessId: businessIdNum, userId: user.id });
  }

  if (!business) {
    notFound();
  }

  // Fetch reviews for this business
  const reviews = await getReviewsForBusiness(businessIdNum, { limit: 50 });

  // Calculate stats
  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
    : 0;
  const pendingReplies = reviews.filter(
    (r) => r.replies && r.replies.length === 0 && r.status === "published"
  ).length;

  const labels = {
    en: {
      title: "Reviews",
      description: "View and respond to customer reviews",
      totalReviews: "Total Reviews",
      acrossPlaces: "Across all your places",
      avgRating: "Average Rating",
      outOf5: "Out of 5 stars",
      needsResponse: "Needs Response",
      noReply: "Reviews without a reply",
      customerReviews: "Customer Reviews",
      viewRespond: "View all reviews and respond to your customers",
    },
    nl: {
      title: "Reviews",
      description: "Bekijk en reageer op klantbeoordelingen",
      totalReviews: "Totaal Reviews",
      acrossPlaces: "Over al je locaties",
      avgRating: "Gemiddelde Beoordeling",
      outOf5: "Van de 5 sterren",
      needsResponse: "Reactie Nodig",
      noReply: "Reviews zonder reactie",
      customerReviews: "Klantbeoordelingen",
      viewRespond: "Bekijk alle reviews en reageer op je klanten",
    },
    de: {
      title: "Bewertungen",
      description: "Kundenbewertungen anzeigen und beantworten",
      totalReviews: "Gesamte Bewertungen",
      acrossPlaces: "Über alle Standorte",
      avgRating: "Durchschnittsbewertung",
      outOf5: "Von 5 Sternen",
      needsResponse: "Antwort erforderlich",
      noReply: "Bewertungen ohne Antwort",
      customerReviews: "Kundenbewertungen",
      viewRespond: "Alle Bewertungen anzeigen und antworten",
    },
  };
  const t = labels[locale as keyof typeof labels] || labels.en;

  return (
    <>
      <DashboardHeader
        title={t.title}
        description={t.description}
        businessId={businessIdNum}
        locale={locale}
      />

      <div className="flex-1 overflow-auto p-6 space-y-6">

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.totalReviews}</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReviews}</div>
            <p className="text-xs text-muted-foreground">
              {t.acrossPlaces}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.avgRating}</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {avgRating > 0 ? avgRating.toFixed(1) : "-"}
            </div>
            <p className="text-xs text-muted-foreground">
              {t.outOf5}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.needsResponse}</CardTitle>
            <MessageSquare className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReplies}</div>
            <p className="text-xs text-muted-foreground">
              {t.noReply}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Reviews Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t.customerReviews}</CardTitle>
          <CardDescription>
            {t.viewRespond}
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
    </>
  );
}
