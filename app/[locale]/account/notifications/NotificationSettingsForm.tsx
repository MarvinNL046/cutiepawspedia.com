"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { updateNotificationSettingsAction } from "./actions";
import {
  Mail,
  MessageSquare,
  Heart,
  Briefcase,
  Users,
  CalendarDays,
  Check,
  Loader2,
} from "lucide-react";

interface NotificationSettingsFormProps {
  initialSettings: {
    emailGeneral: boolean;
    emailReviews: boolean;
    emailFavorites: boolean;
    emailLeads: boolean;
    emailBusiness: boolean;
    emailDigest: boolean;
    locale?: string;
  };
}

interface SettingItem {
  key: keyof Omit<NotificationSettingsFormProps["initialSettings"], "locale">;
  label: string;
  description: string;
  icon: typeof Mail;
}

const settingItems: SettingItem[] = [
  {
    key: "emailGeneral",
    label: "General Updates",
    description: "Platform announcements and important updates",
    icon: Mail,
  },
  {
    key: "emailReviews",
    label: "Reviews & Replies",
    description: "Notifications when you receive reviews or replies",
    icon: MessageSquare,
  },
  {
    key: "emailFavorites",
    label: "Saved Places",
    description: "Updates about places you've saved",
    icon: Heart,
  },
  {
    key: "emailLeads",
    label: "Leads & Inquiries",
    description: "New customer inquiries for your business",
    icon: Users,
  },
  {
    key: "emailBusiness",
    label: "Business Updates",
    description: "Claim status, verification, and business-related emails",
    icon: Briefcase,
  },
  {
    key: "emailDigest",
    label: "Weekly Digest",
    description: "Weekly summary of your business activity",
    icon: CalendarDays,
  },
];

export function NotificationSettingsForm({
  initialSettings,
}: NotificationSettingsFormProps) {
  const [settings, setSettings] = useState(initialSettings);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggle = (key: keyof typeof initialSettings) => {
    if (key === "locale") return;
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    setShowSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const result = await updateNotificationSettingsAction({
      emailGeneral: settings.emailGeneral,
      emailReviews: settings.emailReviews,
      emailFavorites: settings.emailFavorites,
      emailLeads: settings.emailLeads,
      emailBusiness: settings.emailBusiness,
      emailDigest: settings.emailDigest,
      locale: settings.locale,
    });

    setIsSubmitting(false);

    if (result.success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      setError(result.error || "Failed to save settings");
    }
  };

  const hasChanges =
    settings.emailGeneral !== initialSettings.emailGeneral ||
    settings.emailReviews !== initialSettings.emailReviews ||
    settings.emailFavorites !== initialSettings.emailFavorites ||
    settings.emailLeads !== initialSettings.emailLeads ||
    settings.emailBusiness !== initialSettings.emailBusiness ||
    settings.emailDigest !== initialSettings.emailDigest;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg border border-slate-200 divide-y divide-slate-200">
        {settingItems.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-cpPink/10 rounded-lg">
                <item.icon className="h-5 w-5 text-cpPink" />
              </div>
              <div>
                <Label htmlFor={item.key} className="text-sm font-medium text-cpDark cursor-pointer">
                  {item.label}
                </Label>
                <p className="text-sm text-slate-500 mt-0.5">{item.description}</p>
              </div>
            </div>
            <Switch
              id={item.key}
              checked={settings[item.key]}
              onCheckedChange={() => handleToggle(item.key)}
            />
          </div>
        ))}
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      {showSuccess && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-600 flex items-center gap-2">
          <Check className="h-4 w-4" />
          Settings saved successfully!
        </div>
      )}

      <div className="flex items-center justify-end gap-4">
        {hasChanges && (
          <span className="text-sm text-slate-500">You have unsaved changes</span>
        )}
        <Button
          type="submit"
          disabled={isSubmitting || !hasChanges}
          className="bg-cpPink hover:bg-cpPink/90 text-white"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Preferences"
          )}
        </Button>
      </div>
    </form>
  );
}
