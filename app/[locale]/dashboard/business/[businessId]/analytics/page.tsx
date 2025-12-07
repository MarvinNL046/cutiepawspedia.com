/**
 * Analytics Page - Business performance analytics dashboard
 *
 * Features depend on plan level:
 * - STARTER: Basic stats (views, leads, month over month)
 * - PRO/ELITE: Full analytics with charts, trends, device/source breakdown
 */

import { notFound } from "next/navigation";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId } from "@/db/queries/users";
import { getBusinessById, getBusinessByIdForUser } from "@/db/queries/businesses";
import { DashboardHeader, AnalyticsDashboard } from "@/components/dashboard";
import { type PlanKey } from "@/lib/plans/config";

interface AnalyticsPageProps {
  params: Promise<{ locale: string; businessId: string }>;
}

export default async function AnalyticsPage({ params }: AnalyticsPageProps) {
  const { locale, businessId } = await params;
  const businessIdNum = parseInt(businessId, 10);

  if (isNaN(businessIdNum)) {
    notFound();
  }

  // Get current user
  const stackUser = await stackServerApp?.getUser();
  if (!stackUser) return null;

  const dbUser = await getUserByStackAuthId(stackUser.id);
  if (!dbUser) return null;

  // Get business with ownership check (admin bypass)
  let business;
  if (dbUser.role === "admin") {
    business = await getBusinessById(businessIdNum);
  } else {
    business = await getBusinessByIdForUser({
      businessId: businessIdNum,
      userId: dbUser.id,
    });
  }

  if (!business) notFound();

  const planKey = (business.planKey || "FREE") as PlanKey;

  const labels = {
    en: {
      title: "Analytics",
      description: "Track your business performance and visitor insights",
    },
    nl: {
      title: "Statistieken",
      description: "Volg de prestaties van je bedrijf en bezoekersgegevens",
    },
    de: {
      title: "Statistiken",
      description: "Verfolgen Sie Ihre Geschäftsleistung und Besuchereinblicke",
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

      <div className="flex-1 overflow-auto p-6">
        <AnalyticsDashboard
          businessId={businessIdNum}
          planKey={planKey}
          locale={locale}
        />
      </div>
    </>
  );
}
