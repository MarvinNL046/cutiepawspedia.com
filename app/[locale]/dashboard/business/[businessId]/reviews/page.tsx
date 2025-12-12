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
    fr: {
      title: "Avis",
      description: "Consultez et répondez aux avis clients",
      totalReviews: "Total des Avis",
      acrossPlaces: "Sur tous vos établissements",
      avgRating: "Note Moyenne",
      outOf5: "Sur 5 étoiles",
      needsResponse: "Réponse Requise",
      noReply: "Avis sans réponse",
      customerReviews: "Avis Clients",
      viewRespond: "Consultez tous les avis et répondez à vos clients",
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
        <Card className="bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground dark:text-cpCream">{t.totalReviews}</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground dark:text-cpCream/60" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground dark:text-cpCream">{totalReviews}</div>
            <p className="text-xs text-muted-foreground dark:text-cpCream/60">
              {t.acrossPlaces}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground dark:text-cpCream">{t.avgRating}</CardTitle>
            <Star className="h-4 w-4 text-cpAmber fill-cpAmber" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground dark:text-cpCream">
              {avgRating > 0 ? avgRating.toFixed(1) : "-"}
            </div>
            <p className="text-xs text-muted-foreground dark:text-cpCream/60">
              {t.outOf5}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground dark:text-cpCream">{t.needsResponse}</CardTitle>
            <MessageSquare className="h-4 w-4 text-cpCoral" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground dark:text-cpCream">{pendingReplies}</div>
            <p className="text-xs text-muted-foreground dark:text-cpCream/60">
              {t.noReply}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Reviews Table */}
      <Card className="bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20">
        <CardHeader>
          <CardTitle className="text-foreground dark:text-cpCream">{t.customerReviews}</CardTitle>
          <CardDescription className="dark:text-cpCream/60">
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
