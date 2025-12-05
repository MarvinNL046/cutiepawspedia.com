import { redirect } from "next/navigation";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId, upsertUserFromStackAuth } from "@/db/queries/users";
import { getOrCreateNotificationSettings, DEFAULT_NOTIFICATION_SETTINGS } from "@/db/queries/notifications";
import { NotificationSettingsForm } from "./NotificationSettingsForm";
import { Bell } from "lucide-react";

interface NotificationsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function NotificationsPage({ params }: NotificationsPageProps) {
  const { locale } = await params;

  // Check authentication (already checked in layout, but double-check)
  if (!stackServerApp) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">Authentication not configured.</p>
      </div>
    );
  }

  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    redirect(`/handler/sign-in?after_auth_return_to=/${locale}/account/notifications`);
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
        <p className="text-slate-600">Unable to load user data.</p>
      </div>
    );
  }

  // Get or create notification settings (with fallback for missing table)
  let settings;
  try {
    settings = await getOrCreateNotificationSettings(user.id);
  } catch (error) {
    console.error("Error loading notification settings:", error);
    // Use defaults if table doesn't exist yet
    settings = { ...DEFAULT_NOTIFICATION_SETTINGS, id: 0, userId: user.id, createdAt: new Date(), updatedAt: new Date() };
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Bell className="h-6 w-6 text-cpPink" />
        <h1 className="text-2xl font-bold text-cpDark">Email Notifications</h1>
      </div>

      <p className="text-slate-600 mb-8">
        Manage your email preferences. Choose which types of emails you want to receive.
      </p>

      <NotificationSettingsForm
        initialSettings={{
          emailGeneral: settings.emailGeneral,
          emailReviews: settings.emailReviews,
          emailFavorites: settings.emailFavorites,
          emailLeads: settings.emailLeads,
          emailBusiness: settings.emailBusiness,
          emailDigest: settings.emailDigest,
          locale: settings.locale || undefined,
        }}
      />
    </div>
  );
}
