"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface NewsletterFormProps {
  variant?: "inline" | "stacked";
  className?: string;
}

export function NewsletterForm({ variant = "inline", className = "" }: NewsletterFormProps) {
  const t = useTranslations("newsletter");
  const tForms = useTranslations("forms");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setStatus("error");
      setMessage(tForms("required"));
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/email/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || t("success"));
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || t("error"));
      }
    } catch {
      setStatus("error");
      setMessage(t("error"));
    }
  };

  if (status === "success") {
    return (
      <div className={`flex items-center gap-2 text-cpAqua animate-fade-in ${className}`}>
        <div className="animate-bounce-in">
          <CheckCircle className="h-5 w-5" aria-hidden="true" />
        </div>
        <span className="font-medium animate-slide-up">{message}</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className={variant === "inline" ? "flex gap-2" : "space-y-3"}>
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" aria-hidden="true" />
          <Input
            type="email"
            placeholder={t("placeholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            disabled={status === "loading"}
          />
        </div>
        <Button
          type="submit"
          disabled={status === "loading"}
          className={`bg-cpCoral hover:bg-cpCoral/90 ${variant === "stacked" ? "w-full" : ""}`}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" aria-hidden="true" />
              {tForms("sending")}
            </>
          ) : (
            tForms("subscribe")
          )}
        </Button>
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 text-red-600 text-sm mt-2" role="alert">
          <AlertCircle className="h-4 w-4" aria-hidden="true" />
          <span>{message}</span>
        </div>
      )}
    </form>
  );
}
