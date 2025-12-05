import { redirect } from "next/navigation";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId } from "@/db/queries/users";
import { getOrCreateNotificationSettings } from "@/db/queries/notifications";
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

  const user = await getUserByStackAuthId(stackUser.id);
  if (!user) {
    redirect(`/handler/sign-in?after_auth_return_to=/${locale}/account/notifications`);
  }

  // Get or create notification settings
  const settings = await getOrCreateNotificationSettings(user.id);

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
