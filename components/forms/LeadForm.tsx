"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { trackLeadSubmitted } from "@/lib/analytics";
import { Send, Loader2, CheckCircle, AlertCircle, MessageSquare } from "lucide-react";

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
}: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    try {
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
      <Card className={`border-cpAqua/50 bg-cpAqua/5 animate-fade-in ${className}`}>
        <CardContent className="p-6 text-center">
          <div className="animate-bounce-in">
            <CheckCircle className="h-12 w-12 text-cpAqua mx-auto mb-4" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2 animate-slide-up">
            Message Sent!
          </h3>
          <p className="text-muted-foreground mb-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Your inquiry has been sent to {placeName}. They will contact you soon.
          </p>
          <Button
            variant="outline"
            onClick={() => setStatus("idle")}
            className="border-cpAqua text-cpAqua hover:bg-cpAqua/10 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    );
  }

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Error Message */}
      {status === "error" && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2" role="alert">
          <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-red-700">{errorMessage}</p>
        </div>
      )}

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Your Name *</Label>
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
        <Label htmlFor="email">Email Address *</Label>
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
        <Label htmlFor="phone">Phone Number (optional)</Label>
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
        <Label htmlFor="message">Message (optional)</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us what you're looking for..."
          value={formData.message}
          onChange={handleChange}
          rows={4}
          disabled={isSubmitting}
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-cpPink hover:bg-cpPink/90 gap-2"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            Send Inquiry
          </>
        )}
      </Button>

      {/* Privacy note */}
      <p className="text-xs text-slate-500 text-center">
        By submitting, you agree to our{" "}
        <a href="/privacy" className="text-cpPink hover:underline">
          Privacy Policy
        </a>
      </p>
    </form>
  );

  // Card variant (default)
  if (variant === "card") {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-cpPink" aria-hidden="true" />
            Contact {placeName}
          </CardTitle>
          <CardDescription>
            Send an inquiry directly to this business
          </CardDescription>
        </CardHeader>
        <CardContent>{formContent}</CardContent>
      </Card>
    );
  }

  // Inline variant
  return <div className={className}>{formContent}</div>;
}
