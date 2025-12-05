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
import { getUserByStackAuthId } from "@/db/queries/users";
import { getUserProfile } from "@/db/queries/userProfiles";
import { getBadgesForUser, getAllBadgeDefinitions } from "@/db/queries/badges";
import { ProfileSettingsForm } from "./ProfileSettingsForm";
import { BadgeDisplay } from "./BadgeDisplay";
import { User, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface ProfilePageProps {
  params: Promise<{ locale: string }>;
}

// Translations
const t = {
  en: {
    title: "Profile Settings",
    subtitle: "Manage your public profile and personal information",
    badgesTitle: "Your Badges",
    badgesSubtitle: "Achievements you've earned",
    noBadges: "You haven't earned any badges yet. Start reviewing places to earn your first badge!",
    earnedBadges: "Earned",
    availableBadges: "Available to earn",
  },
  nl: {
    title: "Profiel Instellingen",
    subtitle: "Beheer je openbare profiel en persoonlijke informatie",
    badgesTitle: "Jouw Badges",
    badgesSubtitle: "Behaalde prestaties",
    noBadges: "Je hebt nog geen badges verdiend. Begin met het reviewen van plekken om je eerste badge te verdienen!",
    earnedBadges: "Verdiend",
    availableBadges: "Beschikbaar om te verdienen",
  },
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { locale } = await params;
  const text = locale === "nl" ? t.nl : t.en;

  // Check authentication
  if (!stackServerApp) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">Authentication not configured.</p>
      </div>
    );
  }

  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    redirect(`/handler/sign-in?after_auth_return_to=/${locale}/account/profile`);
  }

  const user = await getUserByStackAuthId(stackUser.id);
  if (!user) {
    redirect(`/handler/sign-in?after_auth_return_to=/${locale}/account/profile`);
  }

  // Get user profile and badges
  const profile = await getUserProfile(user.id);
  const userBadges = await getBadgesForUser(user.id);
  const allBadges = await getAllBadgeDefinitions();

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
          <User className="h-6 w-6 text-cpPink" />
          <h1 className="text-2xl font-bold text-cpDark">{text.title}</h1>
        </div>

        <p className="text-slate-600 mb-8">{text.subtitle}</p>

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

      {/* Badges Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-cpYellow" />
            {text.badgesTitle}
          </CardTitle>
          <CardDescription>{text.badgesSubtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          {earnedBadges.length === 0 && unearnedBadges.length === 0 ? (
            <p className="text-slate-500 text-sm">{text.noBadges}</p>
          ) : (
            <div className="space-y-6">
              {/* Earned Badges */}
              {earnedBadges.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-3">
                    {text.earnedBadges} ({earnedBadges.length})
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
                  <h3 className="text-sm font-medium text-slate-700 mb-3">
                    {text.availableBadges} ({unearnedBadges.length})
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
    </div>
  );
}
