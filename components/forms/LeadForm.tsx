"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { trackLeadSubmitted } from "@/lib/analytics";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import { Send, Loader2, CheckCircle, AlertCircle, MessageSquare, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

interface LeadFormProps {
  placeId: number;
  placeName: string;
  placeSlug?: string;
  category?: string;
  city?: string;
  country?: string;
  variant?: "card" | "inline" | "modal";
  onSuccess?: () => void;
  className?: string;
  locale?: string;
}

export function LeadForm({
  placeId,
  placeName,
  placeSlug,
  category,
  city,
  country,
  variant = "card",
  onSuccess,
  className = "",
  locale = "en",
}: LeadFormProps) {
  const t = useTranslations("leadForm");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // reCAPTCHA hook for spam protection
  const { executeRecaptcha, isConfigured: recaptchaConfigured } = useRecaptcha();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      // Get reCAPTCHA token before submitting
      let recaptchaToken: string | null = null;
      if (recaptchaConfigured) {
        recaptchaToken = await executeRecaptcha("lead_form");
        if (!recaptchaToken) {
          console.warn("Failed to get reCAPTCHA token, proceeding anyway");
        }
      }

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          placeId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          message: formData.message || undefined,
          source: "place_page",
          recaptchaToken, // Include token for server-side verification
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit inquiry");
      }

      // Track successful lead submission
      trackLeadSubmitted({
        placeId,
        placeName,
        placeSlug: placeSlug || "",
        category,
        city,
        country,
        hasMessage: !!formData.message,
        hasPhone: !!formData.phone,
        source: "place_page",
      });

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
      onSuccess?.();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Reset error state when user starts typing
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  // Success state with animation
  if (status === "success") {
    return (
      <Card className={`border-green-500/50 dark:border-green-400/50 bg-green-50 dark:bg-green-900/20 animate-fade-in ${className}`}>
        <CardContent className="p-6 text-center">
          <div className="animate-bounce-in">
            <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-semibold text-foreground dark:text-cpCream mb-2 animate-slide-up">
            {t("messageSent")}
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/70 mb-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            {t("inquirySent", { placeName })}
          </p>
          <Button
            variant="outline"
            onClick={() => setStatus("idle")}
            className="border-cpCoral text-cpCoral hover:bg-cpCoral/10 dark:border-cpCoral dark:hover:bg-cpCoral/20 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            {t("sendAnother")}
          </Button>
        </CardContent>
      </Card>
    );
  }

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Error Message */}
      {status === "error" && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-lg flex items-start gap-2" role="alert">
          <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-red-700 dark:text-red-300">{errorMessage}</p>
        </div>
      )}

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">{t("yourName")}</Label>
        <Input
          id="name"
          name="name"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">{t("emailAddress")}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone">{t("phoneNumber")}</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+1 (555) 000-0000"
          value={formData.phone}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message">{t("message")}</Label>
        <Textarea
          id="message"
          name="message"
          placeholder={t("messagePlaceholder")}
          value={formData.message}
          onChange={handleChange}
          rows={4}
          disabled={isSubmitting}
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-cpCoral hover:bg-cpCoral/90 gap-2"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            {t("sending")}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            {t("sendInquiry")}
          </>
        )}
      </Button>

      {/* Privacy note with reCAPTCHA disclosure */}
      <p className="text-xs text-muted-foreground dark:text-cpCream/60 text-center">
        {recaptchaConfigured && (
          <span className="flex items-center justify-center gap-1 mb-1">
            <ShieldCheck className="h-3 w-3 text-green-500 dark:text-green-400" />
            {t("protectedBy")}
          </span>
        )}
        {t("bySubmitting")}{" "}
        <a href="/privacy" className="text-cpCoral hover:underline">
          {t("privacyPolicy")}
        </a>
        {recaptchaConfigured && (
          <>
            {" "}{t("andGoogle")}{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cpCoral hover:underline"
            >
              {t("privacyPolicy")}
            </a>{" "}
            &{" "}
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cpCoral hover:underline"
            >
              Terms
            </a>
          </>
        )}
      </p>
    </form>
  );

  // Card variant (default)
  if (variant === "card") {
    return (
      <Card className={`bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20 ${className}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground dark:text-cpCream">
            <MessageSquare className="h-5 w-5 text-cpCoral" aria-hidden="true" />
            {t("contactTitle", { placeName })}
          </CardTitle>
          <CardDescription className="dark:text-cpCream/70">
            {t("sendInquiryDesc")}
          </CardDescription>
        </CardHeader>
        <CardContent>{formContent}</CardContent>
      </Card>
    );
  }

  // Inline variant
  return <div className={className}>{formContent}</div>;
}
