/**
 * Profile Settings Page (P3)
 *
 * Allows users to:
 * - Edit their profile (name, username, bio, location, website, social links)
 * - Set profile visibility (public/private)
 * - View their badges
 */

import { redirect } from "next/navigation";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId, upsertUserFromStackAuth } from "@/db/queries/users";
import { getUserProfile } from "@/db/queries/userProfiles";
import { getBadgesForUser, getAllBadgeDefinitions } from "@/db/queries/badges";
import { getUserKarmaSummary } from "@/db/queries/karma";
import { ProfileSettingsForm } from "./ProfileSettingsForm";
import { BadgeDisplay } from "./BadgeDisplay";
import { DeleteAccountSection } from "./DeleteAccountSection";
import { TrustLevelBadge } from "@/components/profile/TrustLevelBadge";
import { User, Award, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";

interface ProfilePageProps {
  params: Promise<{ locale: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { locale } = await params;
  const t = await getTranslations("profile");

  // Check authentication
  if (!stackServerApp) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground dark:text-cpCream/60">Authentication not configured.</p>
      </div>
    );
  }

  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    redirect(`/handler/sign-in?after_auth_return_to=/${locale}/account/profile`);
  }

  // Get user from database, auto-sync if needed
  let user = await getUserByStackAuthId(stackUser.id);
  if (!user) {
    user = await upsertUserFromStackAuth({
      stackauthId: stackUser.id,
      email: stackUser.primaryEmail || "",
      name: stackUser.displayName,
      emailVerified: stackUser.primaryEmailVerified,
    });
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground dark:text-cpCream/60">Unable to load user data.</p>
      </div>
    );
  }

  // Get user profile, badges, and karma (with error handling for missing tables)
  let profile = null;
  let userBadges: Awaited<ReturnType<typeof getBadgesForUser>> = [];
  let allBadges: Awaited<ReturnType<typeof getAllBadgeDefinitions>> = [];
  let karmaSummary: Awaited<ReturnType<typeof getUserKarmaSummary>> = null;

  try {
    profile = await getUserProfile(user.id);
    userBadges = await getBadgesForUser(user.id);
    allBadges = await getAllBadgeDefinitions();
    karmaSummary = await getUserKarmaSummary(user.id);
  } catch (error) {
    console.error("Error loading profile/badges/karma:", error);
    // Continue with defaults - tables may not exist yet
  }

  // Separate earned and unearned badges
  const earnedBadgeKeys = new Set(userBadges.map((b) => b.badgeKey));
  const earnedBadges = userBadges.map((ub) => ({
    ...ub.badge,
    awardedAt: ub.awardedAt,
  }));
  const unearnedBadges = allBadges.filter((b) => !earnedBadgeKeys.has(b.key));

  return (
    <div className="max-w-3xl space-y-8">
      {/* Profile Settings */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <User className="h-6 w-6 text-cpCoral" />
          <h1 className="text-2xl font-bold text-foreground dark:text-cpCream">{t("title")}</h1>
        </div>

        <p className="text-muted-foreground dark:text-cpCream/70 mb-8">{t("subtitle")}</p>

        <ProfileSettingsForm
          profile={{
            name: profile?.name || "",
            username: profile?.username || "",
            bio: profile?.bio || "",
            location: profile?.location || "",
            websiteUrl: profile?.websiteUrl || "",
            socialLinks: (profile?.socialLinks as Record<string, string>) || {},
            preferredLocale: profile?.preferredLocale || "en",
            isPublic: profile?.isPublic ?? true,
          }}
          locale={locale}
        />
      </div>

      {/* Trust Level & Karma Section */}
      <Card className="bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground dark:text-cpCream">
            <Star className="h-5 w-5 text-cpCoral" />
            {t("trustLevelTitle")}
          </CardTitle>
          <CardDescription className="dark:text-cpCream/60">{t("trustLevelSubtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <TrustLevelBadge
              trustLevel={karmaSummary?.trustLevel ?? 0}
              trustLevelInfo={karmaSummary?.trustLevelInfo ?? null}
              karmaPoints={karmaSummary?.totalKarma ?? 0}
              nextLevel={karmaSummary?.nextLevel}
              locale={locale}
              showProgress
              size="lg"
            />
            <div className="text-sm text-muted-foreground dark:text-cpCream/60">
              {karmaSummary?.totalKarma ?? 0} {t("karmaPoints")}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badges Section */}
      <Card className="bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground dark:text-cpCream">
            <Award className="h-5 w-5 text-cpAmber" />
            {t("badgesTitle")}
          </CardTitle>
          <CardDescription className="dark:text-cpCream/60">{t("badgesSubtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          {earnedBadges.length === 0 && unearnedBadges.length === 0 ? (
            <p className="text-muted-foreground dark:text-cpCream/60 text-sm">{t("noBadgesYet")}</p>
          ) : (
            <div className="space-y-6">
              {/* Earned Badges */}
              {earnedBadges.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-foreground/80 dark:text-cpCream/80 mb-3">
                    {t("earnedBadges")} ({earnedBadges.length})
                  </h3>
                  <BadgeDisplay
                    badges={earnedBadges}
                    locale={locale}
                    showDates
                  />
                </div>
              )}

              {/* Unearned Badges */}
              {unearnedBadges.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-foreground/80 dark:text-cpCream/80 mb-3">
                    {t("availableBadges")} ({unearnedBadges.length})
                  </h3>
                  <BadgeDisplay
                    badges={unearnedBadges}
                    locale={locale}
                    dimmed
                  />
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Account Section */}
      <DeleteAccountSection userEmail={user.email} />
    </div>
  );
}
