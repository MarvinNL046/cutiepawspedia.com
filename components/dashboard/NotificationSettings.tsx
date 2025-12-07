/**
 * Notification Settings Component
 *
 * Advanced notification settings UI with granular controls.
 * Part of N2: Notifications v2 - Advanced Settings
 */

"use client";

import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Bell, Mail, Heart, MessageSquare, Building2, FileText, Clock, Globe, Loader2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Supported locales
const LOCALES = [
  { value: "en", label: "English" },
  { value: "nl", label: "Nederlands" },
  { value: "de", label: "Deutsch" },
];

// Common timezones
const TIMEZONES = [
  { value: "Europe/Amsterdam", label: "Amsterdam (CET)" },
  { value: "Europe/London", label: "London (GMT)" },
  { value: "Europe/Berlin", label: "Berlin (CET)" },
  { value: "Europe/Paris", label: "Paris (CET)" },
  { value: "America/New_York", label: "New York (EST)" },
  { value: "America/Los_Angeles", label: "Los Angeles (PST)" },
  { value: "America/Chicago", label: "Chicago (CST)" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)" },
  { value: "Asia/Singapore", label: "Singapore (SGT)" },
  { value: "Australia/Sydney", label: "Sydney (AEST)" },
];

// Hours for quiet hours picker
const HOURS = Array.from({ length: 24 }, (_, i) => ({
  value: i.toString(),
  label: `${i.toString().padStart(2, "0")}:00`,
}));

export interface NotificationSettingsData {
  emailGeneral: boolean;
  emailReviews: boolean;
  emailFavorites: boolean;
  emailLeads: boolean;
  emailBusiness: boolean;
  emailDigest: boolean;
  locale: string | null;
  quietHoursEnabled: boolean;
  quietHoursStart: number | null;
  quietHoursEnd: number | null;
  timezone: string | null;
  maxEmailsPerWeek: number | null;
}

interface NotificationSettingsProps {
  initialSettings: NotificationSettingsData;
  onUpdate: (settings: Partial<NotificationSettingsData>) => Promise<{ success: boolean; error?: string }>;
  locale?: string;
}

export function NotificationSettings({ initialSettings, onUpdate, locale = "en" }: NotificationSettingsProps) {
  const [settings, setSettings] = useState<NotificationSettingsData>(initialSettings);
  const [isPending, startTransition] = useTransition();
  const [showSaved, setShowSaved] = useState(false);

  const handleUpdate = async (updates: Partial<NotificationSettingsData>) => {
    setSettings((prev) => ({ ...prev, ...updates }));

    startTransition(async () => {
      const result = await onUpdate(updates);
      if (result.success) {
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 2000);
      }
    });
  };

  const translations = {
    en: {
      title: "Email Notifications",
      description: "Control what emails you receive",
      general: "General Updates",
      generalDesc: "Platform news and updates",
      reviews: "Reviews & Replies",
      reviewsDesc: "Notifications when you get new reviews or replies",
      favorites: "Favorite Places",
      favoritesDesc: "Updates when your saved places have new information",
      leads: "Lead Notifications",
      leadsDesc: "Get notified when someone contacts your business",
      business: "Business Updates",
      businessDesc: "Claim approvals, status changes, and more",
      digest: "Weekly Digest",
      digestDesc: "Weekly summary of your activity and favorites",
      advanced: "Advanced Settings",
      advancedDesc: "Fine-tune your notification experience",
      language: "Email Language",
      languageDesc: "Choose your preferred email language",
      quietHours: "Quiet Hours",
      quietHoursDesc: "Pause notifications during specific hours",
      quietHoursEnabled: "Enable quiet hours",
      from: "From",
      to: "To",
      timezone: "Your Timezone",
      maxEmails: "Weekly Email Limit",
      maxEmailsDesc: "Maximum emails per week",
      unlimited: "Unlimited",
      saved: "Saved!",
    },
    nl: {
      title: "E-mail Notificaties",
      description: "Bepaal welke e-mails je ontvangt",
      general: "Algemene Updates",
      generalDesc: "Platform nieuws en updates",
      reviews: "Reviews & Reacties",
      reviewsDesc: "Notificaties wanneer je nieuwe reviews of reacties krijgt",
      favorites: "Favoriete Plekken",
      favoritesDesc: "Updates wanneer je opgeslagen plekken nieuwe informatie hebben",
      leads: "Lead Notificaties",
      leadsDesc: "Ontvang een bericht wanneer iemand contact opneemt met je bedrijf",
      business: "Bedrijfsupdates",
      businessDesc: "Claim goedkeuringen, statuswijzigingen en meer",
      digest: "Wekelijks Overzicht",
      digestDesc: "Wekelijkse samenvatting van je activiteit en favorieten",
      advanced: "Geavanceerde Instellingen",
      advancedDesc: "Stem je notificatie-ervaring af",
      language: "E-mailtaal",
      languageDesc: "Kies je voorkeurstaal voor e-mails",
      quietHours: "Stille Uren",
      quietHoursDesc: "Pauzeer notificaties tijdens specifieke uren",
      quietHoursEnabled: "Stille uren inschakelen",
      from: "Van",
      to: "Tot",
      timezone: "Jouw Tijdzone",
      maxEmails: "Wekelijkse E-maillimiet",
      maxEmailsDesc: "Maximum e-mails per week",
      unlimited: "Onbeperkt",
      saved: "Opgeslagen!",
    },
    de: {
      title: "E-Mail Benachrichtigungen",
      description: "Kontrollieren Sie, welche E-Mails Sie erhalten",
      general: "Allgemeine Updates",
      generalDesc: "Plattform-Neuigkeiten und Updates",
      reviews: "Bewertungen & Antworten",
      reviewsDesc: "Benachrichtigungen bei neuen Bewertungen oder Antworten",
      favorites: "Favorisierte Orte",
      favoritesDesc: "Updates wenn Ihre gespeicherten Orte neue Informationen haben",
      leads: "Lead-Benachrichtigungen",
      leadsDesc: "Benachrichtigung wenn jemand Ihr Unternehmen kontaktiert",
      business: "Unternehmens-Updates",
      businessDesc: "Anspruchsgenehmigungen, Statusänderungen und mehr",
      digest: "Wöchentliche Zusammenfassung",
      digestDesc: "Wöchentliche Zusammenfassung Ihrer Aktivitäten und Favoriten",
      advanced: "Erweiterte Einstellungen",
      advancedDesc: "Optimieren Sie Ihre Benachrichtigungserfahrung",
      language: "E-Mail Sprache",
      languageDesc: "Wählen Sie Ihre bevorzugte E-Mail-Sprache",
      quietHours: "Ruhezeiten",
      quietHoursDesc: "Pausieren Sie Benachrichtigungen während bestimmter Stunden",
      quietHoursEnabled: "Ruhezeiten aktivieren",
      from: "Von",
      to: "Bis",
      timezone: "Ihre Zeitzone",
      maxEmails: "Wöchentliches E-Mail-Limit",
      maxEmailsDesc: "Maximale E-Mails pro Woche",
      unlimited: "Unbegrenzt",
      saved: "Gespeichert!",
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <div className="space-y-6">
      {/* Saved indicator */}
      <div
        className={cn(
          "fixed top-4 right-4 z-50 flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow-lg transition-all duration-300",
          showSaved ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <CheckCircle className="h-4 w-4" />
        {t.saved}
      </div>

      {/* Email Categories */}
      <Card className="bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground dark:text-cpCream">
            <Bell className="h-5 w-5 text-cpCoral" />
            {t.title}
          </CardTitle>
          <CardDescription className="dark:text-cpCream/70">{t.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* General */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground dark:text-cpCream/60" />
              <div>
                <Label className="font-medium dark:text-cpCream">{t.general}</Label>
                <p className="text-sm text-muted-foreground dark:text-cpCream/60">{t.generalDesc}</p>
              </div>
            </div>
            <Switch
              checked={settings.emailGeneral}
              onCheckedChange={(checked) => handleUpdate({ emailGeneral: checked })}
              disabled={isPending}
            />
          </div>

          {/* Reviews */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-muted-foreground dark:text-cpCream/60" />
              <div>
                <Label className="font-medium dark:text-cpCream">{t.reviews}</Label>
                <p className="text-sm text-muted-foreground dark:text-cpCream/60">{t.reviewsDesc}</p>
              </div>
            </div>
            <Switch
              checked={settings.emailReviews}
              onCheckedChange={(checked) => handleUpdate({ emailReviews: checked })}
              disabled={isPending}
            />
          </div>

          {/* Favorites */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="h-5 w-5 text-muted-foreground dark:text-cpCream/60" />
              <div>
                <Label className="font-medium dark:text-cpCream">{t.favorites}</Label>
                <p className="text-sm text-muted-foreground dark:text-cpCream/60">{t.favoritesDesc}</p>
              </div>
            </div>
            <Switch
              checked={settings.emailFavorites}
              onCheckedChange={(checked) => handleUpdate({ emailFavorites: checked })}
              disabled={isPending}
            />
          </div>

          {/* Leads */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground dark:text-cpCream/60" />
              <div>
                <Label className="font-medium dark:text-cpCream">{t.leads}</Label>
                <p className="text-sm text-muted-foreground dark:text-cpCream/60">{t.leadsDesc}</p>
              </div>
            </div>
            <Switch
              checked={settings.emailLeads}
              onCheckedChange={(checked) => handleUpdate({ emailLeads: checked })}
              disabled={isPending}
            />
          </div>

          {/* Business */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-muted-foreground dark:text-cpCream/60" />
              <div>
                <Label className="font-medium dark:text-cpCream">{t.business}</Label>
                <p className="text-sm text-muted-foreground dark:text-cpCream/60">{t.businessDesc}</p>
              </div>
            </div>
            <Switch
              checked={settings.emailBusiness}
              onCheckedChange={(checked) => handleUpdate({ emailBusiness: checked })}
              disabled={isPending}
            />
          </div>

          {/* Digest */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-muted-foreground dark:text-cpCream/60" />
              <div>
                <Label className="font-medium dark:text-cpCream">{t.digest}</Label>
                <p className="text-sm text-muted-foreground dark:text-cpCream/60">{t.digestDesc}</p>
              </div>
            </div>
            <Switch
              checked={settings.emailDigest}
              onCheckedChange={(checked) => handleUpdate({ emailDigest: checked })}
              disabled={isPending}
            />
          </div>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Card className="bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground dark:text-cpCream">
            <Clock className="h-5 w-5 text-cpCoral" />
            {t.advanced}
          </CardTitle>
          <CardDescription className="dark:text-cpCream/70">{t.advancedDesc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email Language */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-muted-foreground dark:text-cpCream/60" />
              <div>
                <Label className="font-medium dark:text-cpCream">{t.language}</Label>
                <p className="text-sm text-muted-foreground dark:text-cpCream/60">{t.languageDesc}</p>
              </div>
            </div>
            <Select
              value={settings.locale || "en"}
              onValueChange={(value) => handleUpdate({ locale: value })}
              disabled={isPending}
            >
              <SelectTrigger className="w-full max-w-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LOCALES.map((loc) => (
                  <SelectItem key={loc.value} value={loc.value}>
                    {loc.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quiet Hours */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground dark:text-cpCream/60" />
                <div>
                  <Label className="font-medium dark:text-cpCream">{t.quietHours}</Label>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/60">{t.quietHoursDesc}</p>
                </div>
              </div>
              <Switch
                checked={settings.quietHoursEnabled}
                onCheckedChange={(checked) => handleUpdate({ quietHoursEnabled: checked })}
                disabled={isPending}
              />
            </div>

            {settings.quietHoursEnabled && (
              <div className="ml-8 space-y-4 p-4 bg-muted dark:bg-cpSurface rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="dark:text-cpCream">{t.from}</Label>
                    <Select
                      value={(settings.quietHoursStart ?? 22).toString()}
                      onValueChange={(value) => handleUpdate({ quietHoursStart: parseInt(value) })}
                      disabled={isPending}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {HOURS.map((hour) => (
                          <SelectItem key={hour.value} value={hour.value}>
                            {hour.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="dark:text-cpCream">{t.to}</Label>
                    <Select
                      value={(settings.quietHoursEnd ?? 8).toString()}
                      onValueChange={(value) => handleUpdate({ quietHoursEnd: parseInt(value) })}
                      disabled={isPending}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {HOURS.map((hour) => (
                          <SelectItem key={hour.value} value={hour.value}>
                            {hour.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="dark:text-cpCream">{t.timezone}</Label>
                  <Select
                    value={settings.timezone || "Europe/Amsterdam"}
                    onValueChange={(value) => handleUpdate({ timezone: value })}
                    disabled={isPending}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TIMEZONES.map((tz) => (
                        <SelectItem key={tz.value} value={tz.value}>
                          {tz.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          {/* Max Emails Per Week */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground dark:text-cpCream/60" />
              <div>
                <Label className="font-medium dark:text-cpCream">{t.maxEmails}</Label>
                <p className="text-sm text-muted-foreground dark:text-cpCream/60">{t.maxEmailsDesc}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Input
                type="number"
                value={settings.maxEmailsPerWeek ?? 50}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value >= 1 && value <= 1000) {
                    handleUpdate({ maxEmailsPerWeek: value });
                  }
                }}
                min={1}
                max={1000}
                step={5}
                className="w-24 dark:bg-cpSurface dark:border-cpAmber/30 dark:text-cpCream"
                disabled={isPending}
              />
              <span className="text-sm text-muted-foreground dark:text-cpCream/60">
                {locale === "nl" ? "e-mails per week" : locale === "de" ? "E-Mails pro Woche" : "emails per week"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {isPending && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-muted dark:bg-cpSurface text-foreground dark:text-cpCream px-4 py-2 rounded-lg shadow-lg">
          <Loader2 className="h-4 w-4 animate-spin" />
          Saving...
        </div>
      )}
    </div>
  );
}
