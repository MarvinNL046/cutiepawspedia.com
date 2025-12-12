"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Check, AlertCircle, Globe, Instagram, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface ProfileFormData {
  name: string;
  username: string;
  bio: string;
  location: string;
  websiteUrl: string;
  socialLinks: Record<string, string>;
  preferredLocale: string;
  isPublic: boolean;
}

interface ProfileSettingsFormProps {
  profile: ProfileFormData;
  locale: string;
}

export function ProfileSettingsForm({ profile, locale }: ProfileSettingsFormProps) {
  const router = useRouter();
  const t = useTranslations("profile");

  const [formData, setFormData] = useState<ProfileFormData>(profile);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [usernameStatus, setUsernameStatus] = useState<"idle" | "checking" | "available" | "unavailable">("idle");

  // Debounced username check
  const checkUsername = useCallback(async (username: string) => {
    if (!username || username.length < 3) {
      setUsernameStatus("idle");
      return;
    }

    setUsernameStatus("checking");

    try {
      const response = await fetch(`/api/profile/username/check?username=${encodeURIComponent(username)}`);
      const data = await response.json();
      setUsernameStatus(data.available ? "available" : "unavailable");
    } catch {
      setUsernameStatus("idle");
    }
  }, []);

  // Check username when it changes (debounced)
  useEffect(() => {
    if (formData.username === profile.username) {
      setUsernameStatus("idle");
      return;
    }

    const timer = setTimeout(() => {
      checkUsername(formData.username);
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.username, profile.username, checkUsername]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name || undefined,
          username: formData.username || undefined,
          bio: formData.bio || null,
          location: formData.location || null,
          websiteUrl: formData.websiteUrl || null,
          socialLinks: Object.keys(formData.socialLinks).length > 0 ? formData.socialLinks : null,
          preferredLocale: formData.preferredLocale,
          isPublic: formData.isPublic,
        }),
      });

      if (response.ok) {
        setStatus("success");
        router.refresh();
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        const data = await response.json();
        console.error("Profile update error:", data);
        setStatus("error");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateSocialLink = (platform: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }));
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name & Username */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">{t("name")}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder={t("namePlaceholder")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">{t("username")}</Label>
              <div className="relative">
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "") }))}
                  placeholder={t("usernamePlaceholder")}
                  className={cn(
                    usernameStatus === "available" && "border-green-500 pr-10",
                    usernameStatus === "unavailable" && "border-red-500 pr-10"
                  )}
                />
                {usernameStatus === "checking" && (
                  <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-slate-400" />
                )}
                {usernameStatus === "available" && (
                  <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                )}
                {usernameStatus === "unavailable" && (
                  <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-red-500" />
                )}
              </div>
              <p className="text-xs text-slate-500">
                {usernameStatus === "available" && <span className="text-green-600">{t("usernameAvailable")}</span>}
                {usernameStatus === "unavailable" && <span className="text-red-600">{t("usernameUnavailable")}</span>}
                {usernameStatus === "checking" && <span>{t("usernameChecking")}</span>}
                {usernameStatus === "idle" && <span>{t("usernameHelp")}{formData.username || "username"}</span>}
              </p>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">{t("bio")}</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value.slice(0, 500) }))}
              placeholder={t("bioPlaceholder")}
              rows={3}
            />
            <p className="text-xs text-slate-500">
              {t("bioHelp")} ({formData.bio.length}/500)
            </p>
          </div>

          {/* Location & Website */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="location">{t("location")}</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                placeholder={t("locationPlaceholder")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">{t("website")}</Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="website"
                  type="url"
                  value={formData.websiteUrl}
                  onChange={(e) => setFormData((prev) => ({ ...prev, websiteUrl: e.target.value }))}
                  placeholder={t("websitePlaceholder")}
                  className="pl-9"
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <Label>{t("socialLinksTitle")}</Label>
            <div className="grid gap-3">
              <div className="relative">
                <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  value={formData.socialLinks.instagram || ""}
                  onChange={(e) => updateSocialLink("instagram", e.target.value)}
                  placeholder={t("instagram")}
                  className="pl-9"
                />
              </div>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  value={formData.socialLinks.facebook || ""}
                  onChange={(e) => updateSocialLink("facebook", e.target.value)}
                  placeholder={t("facebook")}
                  className="pl-9"
                />
              </div>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  value={formData.socialLinks.tiktok || ""}
                  onChange={(e) => updateSocialLink("tiktok", e.target.value)}
                  placeholder={t("tiktok")}
                  className="pl-9"
                />
              </div>
            </div>
          </div>

          {/* Language Preference */}
          <div className="space-y-2">
            <Label htmlFor="language">{t("language")}</Label>
            <Select
              value={formData.preferredLocale}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, preferredLocale: value }))}
            >
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="nl">Nederlands</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Profile Visibility */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <p className="font-medium text-cpDark">{t("profileVisibility")}</p>
              <p className="text-sm text-slate-500">{t("profileVisibilityHelp")}</p>
            </div>
            <Switch
              checked={formData.isPublic}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isPublic: checked }))}
            />
          </div>

          {/* Status Messages */}
          {status === "success" && (
            <Alert className="border-green-200 bg-green-50">
              <Check className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">{t("saved")}</AlertDescription>
            </Alert>
          )}

          {status === "error" && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{t("error")}</AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || usernameStatus === "unavailable"}
            className="bg-cpCoral hover:bg-cpCoral/90"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {t("saving")}
              </>
            ) : (
              t("save")
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
