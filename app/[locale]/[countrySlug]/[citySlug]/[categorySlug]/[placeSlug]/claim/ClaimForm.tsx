"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { createPlaceClaimAction } from "./actions";

interface ClaimFormProps {
  placeId: number;
  placeName: string;
  userEmail: string;
  locale: string;
  returnUrl: string;
}

const labels = {
  en: {
    formTitle: "Your Information",
    businessName: "Business Name",
    businessNamePlaceholder: "Your business or company name",
    website: "Website (optional)",
    websitePlaceholder: "https://www.example.com",
    contactEmail: "Contact Email",
    contactPhone: "Contact Phone (optional)",
    contactPhonePlaceholder: "+1 234 567 8900",
    businessRole: "Your Role",
    businessRolePlaceholder: "e.g., Owner, Manager, Authorized Representative",
    message: "Additional Information (optional)",
    messagePlaceholder: "Tell us why you're claiming this business and any additional details that might help verify your ownership.",
    confirm: "I confirm that I am authorized to represent this business and that the information provided is accurate.",
    submit: "Submit Claim",
    submitting: "Submitting...",
    success: "Claim Submitted Successfully!",
    successDesc: "We've received your claim and will review it within 2-3 business days. You'll receive an email notification once your claim is processed.",
    backToPlace: "Back to Business Page",
    error: "Something went wrong",
  },
  nl: {
    formTitle: "Jouw Gegevens",
    businessName: "Bedrijfsnaam",
    businessNamePlaceholder: "Je bedrijfs- of handelsnaam",
    website: "Website (optioneel)",
    websitePlaceholder: "https://www.voorbeeld.nl",
    contactEmail: "E-mailadres",
    contactPhone: "Telefoonnummer (optioneel)",
    contactPhonePlaceholder: "+31 6 12345678",
    businessRole: "Jouw Rol",
    businessRolePlaceholder: "bijv. Eigenaar, Manager, Gemachtigde",
    message: "Aanvullende Informatie (optioneel)",
    messagePlaceholder: "Vertel ons waarom je dit bedrijf claimt en eventuele aanvullende details die kunnen helpen bij de verificatie.",
    confirm: "Ik bevestig dat ik gemachtigd ben om dit bedrijf te vertegenwoordigen en dat de verstrekte informatie juist is.",
    submit: "Claim Indienen",
    submitting: "Bezig met indienen...",
    success: "Claim Succesvol Ingediend!",
    successDesc: "We hebben je claim ontvangen en zullen deze binnen 2-3 werkdagen beoordelen. Je ontvangt een e-mail zodra je claim is verwerkt.",
    backToPlace: "Terug naar Bedrijfspagina",
    error: "Er is iets misgegaan",
  },
  de: {
    formTitle: "Ihre Informationen",
    businessName: "Unternehmensname",
    businessNamePlaceholder: "Ihr Unternehmens- oder Firmenname",
    website: "Website (optional)",
    websitePlaceholder: "https://www.beispiel.de",
    contactEmail: "Kontakt-E-Mail",
    contactPhone: "Telefonnummer (optional)",
    contactPhonePlaceholder: "+49 123 456789",
    businessRole: "Ihre Rolle",
    businessRolePlaceholder: "z.B. Inhaber, Manager, Bevollmächtigter",
    message: "Zusätzliche Informationen (optional)",
    messagePlaceholder: "Erklären Sie, warum Sie diesen Eintrag beanspruchen und geben Sie zusätzliche Details an, die bei der Verifizierung helfen können.",
    confirm: "Ich bestätige, dass ich berechtigt bin, dieses Unternehmen zu vertreten, und dass die angegebenen Informationen korrekt sind.",
    submit: "Antrag Einreichen",
    submitting: "Wird eingereicht...",
    success: "Antrag Erfolgreich Eingereicht!",
    successDesc: "Wir haben Ihren Antrag erhalten und werden ihn innerhalb von 2-3 Werktagen prüfen. Sie erhalten eine E-Mail-Benachrichtigung, sobald Ihr Antrag bearbeitet wurde.",
    backToPlace: "Zurück zur Geschäftsseite",
    error: "Etwas ist schief gelaufen",
  },
};

export function ClaimForm({
  placeId,
  placeName,
  userEmail,
  locale,
  returnUrl,
}: ClaimFormProps) {
  const router = useRouter();
  const t = labels[locale as keyof typeof labels] || labels.en;

  const [formData, setFormData] = useState({
    businessName: placeName,
    website: "",
    contactEmail: userEmail,
    contactPhone: "",
    businessRole: "",
    message: "",
    confirmed: false,
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.confirmed) {
      setErrorMessage("Please confirm that you are authorized to represent this business.");
      return;
    }

    if (!formData.businessName.trim()) {
      setErrorMessage("Business name is required.");
      return;
    }

    if (!formData.businessRole.trim()) {
      setErrorMessage("Your role is required.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const result = await createPlaceClaimAction({
        placeId,
        businessName: formData.businessName,
        website: formData.website || undefined,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone || undefined,
        businessRole: formData.businessRole,
        message: formData.message || undefined,
      });

      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(result.error || t.error);
      }
    } catch {
      setStatus("error");
      setErrorMessage(t.error);
    }
  };

  // Success state
  if (status === "success") {
    return (
      <Card className="border-cpAqua/30 bg-cpAqua/5">
        <CardContent className="pt-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cpAqua/20 mb-4">
            <CheckCircle className="h-8 w-8 text-cpAqua" />
          </div>
          <h3 className="text-xl font-semibold text-cpDark mb-2">{t.success}</h3>
          <p className="text-slate-600 mb-6">{t.successDesc}</p>
          <Button
            variant="outline"
            onClick={() => router.push(returnUrl + "?claim=pending")}
          >
            {t.backToPlace}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.formTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Business Name */}
          <div className="space-y-2">
            <Label htmlFor="businessName">{t.businessName} *</Label>
            <Input
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder={t.businessNamePlaceholder}
              required
            />
          </div>

          {/* Website */}
          <div className="space-y-2">
            <Label htmlFor="website">{t.website}</Label>
            <Input
              id="website"
              name="website"
              type="url"
              value={formData.website}
              onChange={handleChange}
              placeholder={t.websitePlaceholder}
            />
          </div>

          {/* Contact Email */}
          <div className="space-y-2">
            <Label htmlFor="contactEmail">{t.contactEmail} *</Label>
            <Input
              id="contactEmail"
              name="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={handleChange}
              required
            />
          </div>

          {/* Contact Phone */}
          <div className="space-y-2">
            <Label htmlFor="contactPhone">{t.contactPhone}</Label>
            <Input
              id="contactPhone"
              name="contactPhone"
              type="tel"
              value={formData.contactPhone}
              onChange={handleChange}
              placeholder={t.contactPhonePlaceholder}
            />
          </div>

          {/* Business Role */}
          <div className="space-y-2">
            <Label htmlFor="businessRole">{t.businessRole} *</Label>
            <Input
              id="businessRole"
              name="businessRole"
              value={formData.businessRole}
              onChange={handleChange}
              placeholder={t.businessRolePlaceholder}
              required
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">{t.message}</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t.messagePlaceholder}
              rows={4}
              maxLength={2000}
            />
          </div>

          {/* Confirmation Checkbox */}
          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
            <input
              type="checkbox"
              id="confirmed"
              name="confirmed"
              checked={formData.confirmed}
              onChange={handleChange}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-cpPink focus:ring-cpPink"
            />
            <Label htmlFor="confirmed" className="text-sm text-slate-600 cursor-pointer">
              {t.confirm}
            </Label>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <p className="text-sm">{errorMessage}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={status === "loading" || !formData.confirmed}
            className="w-full bg-cpPink hover:bg-cpPink/90"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {t.submitting}
              </>
            ) : (
              t.submit
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
