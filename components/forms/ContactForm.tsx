"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface ContactFormProps {
  translations: {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
    submit: string;
    newsletter?: string;
    success?: string;
    error?: string;
  };
}

export function ContactForm({ translations: t }: ContactFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
    subscribeNewsletter: false,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
          subscribeNewsletter: false,
        });
      } else {
        setStatus("error");
        setErrorMessage(data.error || t.error || "Something went wrong");
      }
    } catch {
      setStatus("error");
      setErrorMessage(t.error || "Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
          <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {t.success || "Message sent!"}
        </h3>
        <p className="text-muted-foreground mb-4">
          We&apos;ll get back to you within 24 hours.
        </p>
        <Button
          variant="outline"
          onClick={() => setStatus("idle")}
          className="border-cpCoral text-cpCoral hover:bg-cpCoral/10"
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === "error" && (
        <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-lg text-red-600 dark:text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          name="firstName"
          placeholder={t.firstName}
          value={formData.firstName}
          onChange={handleChange}
          required
          disabled={status === "loading"}
          className="border-border bg-background"
        />
        <Input
          name="lastName"
          placeholder={t.lastName}
          value={formData.lastName}
          onChange={handleChange}
          required
          disabled={status === "loading"}
          className="border-border bg-background"
        />
      </div>

      <Input
        name="email"
        type="email"
        placeholder={t.email}
        value={formData.email}
        onChange={handleChange}
        required
        disabled={status === "loading"}
        className="border-border bg-background"
      />

      <Input
        name="subject"
        placeholder={t.subject}
        value={formData.subject}
        onChange={handleChange}
        required
        disabled={status === "loading"}
        className="border-border bg-background"
      />

      <textarea
        name="message"
        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm min-h-[120px] focus:outline-none focus:ring-2 focus:ring-cpCoral/50 focus:border-cpCoral disabled:opacity-50"
        placeholder={t.message}
        value={formData.message}
        onChange={handleChange}
        required
        disabled={status === "loading"}
      />

      {/* Newsletter opt-in */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="subscribeNewsletter"
          checked={formData.subscribeNewsletter}
          onCheckedChange={(checked) =>
            setFormData((prev) => ({
              ...prev,
              subscribeNewsletter: checked === true,
            }))
          }
          disabled={status === "loading"}
        />
        <Label
          htmlFor="subscribeNewsletter"
          className="text-sm text-muted-foreground cursor-pointer"
        >
          {t.newsletter || "Subscribe to our newsletter for pet care tips and updates"}
        </Label>
      </div>

      <Button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-cpCoral hover:bg-cpCoral/90 text-white"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4 mr-2" />
            {t.submit}
          </>
        )}
      </Button>
    </form>
  );
}
