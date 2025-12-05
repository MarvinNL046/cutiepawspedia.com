import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId } from "@/db/queries";
import { getOrCreateNotificationSettings } from "@/db/queries/notifications";
import { DashboardHeader, NotificationSettings, type NotificationSettingsData } from "@/components/dashboard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Building2, Shield, CreditCard } from "lucide-react";
import { updateNotificationSettingsAction } from "./actions";

interface SettingsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  const { locale } = await params;

  // Get current user
  const stackUser = await stackServerApp?.getUser();
  if (!stackUser) return null;

  const dbUser = await getUserByStackAuthId(stackUser.id);
  if (!dbUser) return null;

  // Get notification settings
  const notificationSettings = await getOrCreateNotificationSettings(dbUser.id);
  const initialSettings: NotificationSettingsData = {
    emailGeneral: notificationSettings.emailGeneral,
    emailReviews: notificationSettings.emailReviews,
    emailFavorites: notificationSettings.emailFavorites,
    emailLeads: notificationSettings.emailLeads,
    emailBusiness: notificationSettings.emailBusiness,
    emailDigest: notificationSettings.emailDigest,
    locale: notificationSettings.locale,
    quietHoursEnabled: notificationSettings.quietHoursEnabled,
    quietHoursStart: notificationSettings.quietHoursStart,
    quietHoursEnd: notificationSettings.quietHoursEnd,
    timezone: notificationSettings.timezone,
    maxEmailsPerWeek: notificationSettings.maxEmailsPerWeek,
  };

  return (
    <>
      <DashboardHeader
        title="Settings"
        description="Manage your account and preferences"
      />

      <div className="p-6 space-y-6 max-w-3xl">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-cpPink" />
              Profile
            </CardTitle>
            <CardDescription>
              Your account information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  defaultValue={dbUser.name || ""}
                  placeholder="Your name"
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={dbUser.email}
                  disabled
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                <Building2 className="h-3 w-3 mr-1" />
                {dbUser.role === "admin" ? "Administrator" : "Business Account"}
              </Badge>
              <Badge variant="outline">
                Member since {new Date(dbUser.createdAt).toLocaleDateString()}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <NotificationSettings
          initialSettings={initialSettings}
          onUpdate={updateNotificationSettingsAction}
          locale={locale}
        />

        {/* Billing (Placeholder) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-cpYellow" />
              Billing
            </CardTitle>
            <CardDescription>
              Manage your subscription and billing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <p className="font-medium">Free Plan</p>
                <p className="text-sm text-slate-500">
                  Basic listing features
                </p>
              </div>
              <Button className="bg-cpPink hover:bg-cpPink/90">
                Upgrade to Premium
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-slate-600" />
              Security
            </CardTitle>
            <CardDescription>
              Manage your account security
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" asChild>
              <a href="/handler/account-settings">
                Manage Account in StackAuth
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
