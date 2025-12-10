/**
 * Contact Page - Static contact form page
 *
 * CACHING STRATEGY: Force Static
 * - Form content is static, submission is client-side
 * - revalidate: 86400 (24 hours) for occasional updates
 * - Optimal performance with pre-rendered content
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Clock, MessageSquare, HelpCircle, Send } from "lucide-react";
import { ContactForm } from "@/components/forms";

// Static page with daily revalidation - content rarely changes
export const dynamic = "force-static";
export const revalidate = 86400;

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

const translations = {
  en: {
    badge: "Contact Us",
    title: "Get in Touch",
    subtitle: "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",

    form: {
      title: "Send us a message",
      description: "Fill out the form and we'll get back to you within 24 hours.",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      subject: "Subject",
      message: "Your message...",
      submit: "Send Message",
      newsletter: "Subscribe to our newsletter for pet care tips and updates",
      success: "Message sent successfully!",
      error: "Something went wrong. Please try again.",
    },

    info: {
      email: {
        title: "Email",
        general: "General inquiries",
        generalEmail: "hello@cutiepawspedia.com",
        support: "Support",
        supportEmail: "hello@cutiepawspedia.com",
        business: "Business listings",
        businessEmail: "hello@cutiepawspedia.com",
      },
      location: {
        title: "Location",
        address: "Amsterdam, Netherlands",
        note: "We operate primarily online",
      },
      hours: {
        title: "Response Time",
        time: "Within 24 hours",
        note: "Monday - Friday",
      },
    },

    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          question: "How do I claim my business listing?",
          answer: "Visit the For Businesses page and follow the steps to claim and verify your business.",
        },
        {
          question: "How can I leave a review?",
          answer: "Navigate to the business page and click on 'Write a Review'. You'll need to create an account first.",
        },
        {
          question: "Is it free to list my business?",
          answer: "Yes! Basic listings are completely free. We also offer premium plans with additional features.",
        },
      ],
    },
  },
  nl: {
    badge: "Contact",
    title: "Neem Contact Op",
    subtitle: "Heeft u vragen? We horen graag van u. Stuur ons een bericht en we reageren zo snel mogelijk.",

    form: {
      title: "Stuur ons een bericht",
      description: "Vul het formulier in en we nemen binnen 24 uur contact met u op.",
      firstName: "Voornaam",
      lastName: "Achternaam",
      email: "E-mail",
      subject: "Onderwerp",
      message: "Uw bericht...",
      submit: "Verstuur Bericht",
      newsletter: "Schrijf je in voor onze nieuwsbrief met tips voor huisdierverzorging",
      success: "Bericht succesvol verzonden!",
      error: "Er is iets misgegaan. Probeer het opnieuw.",
    },

    info: {
      email: {
        title: "E-mail",
        general: "Algemene vragen",
        generalEmail: "hello@cutiepawspedia.com",
        support: "Ondersteuning",
        supportEmail: "hello@cutiepawspedia.com",
        business: "Bedrijfsvermeldingen",
        businessEmail: "hello@cutiepawspedia.com",
      },
      location: {
        title: "Locatie",
        address: "Amsterdam, Nederland",
        note: "We opereren voornamelijk online",
      },
      hours: {
        title: "Reactietijd",
        time: "Binnen 24 uur",
        note: "Maandag - Vrijdag",
      },
    },

    faq: {
      title: "Veelgestelde Vragen",
      items: [
        {
          question: "Hoe claim ik mijn bedrijfsvermelding?",
          answer: "Bezoek de Voor Bedrijven pagina en volg de stappen om uw bedrijf te claimen en te verifiëren.",
        },
        {
          question: "Hoe kan ik een beoordeling achterlaten?",
          answer: "Ga naar de bedrijfspagina en klik op 'Schrijf een Beoordeling'. U moet eerst een account aanmaken.",
        },
        {
          question: "Is het gratis om mijn bedrijf te vermelden?",
          answer: "Ja! Basis vermeldingen zijn volledig gratis. We bieden ook premium abonnementen met extra functies.",
        },
      ],
    },
  },
  de: {
    badge: "Kontakt",
    title: "Kontaktieren Sie Uns",
    subtitle: "Haben Sie Fragen? Wir freuen uns von Ihnen zu hören. Senden Sie uns eine Nachricht und wir antworten so schnell wie möglich.",

    form: {
      title: "Senden Sie uns eine Nachricht",
      description: "Füllen Sie das Formular aus und wir melden uns innerhalb von 24 Stunden bei Ihnen.",
      firstName: "Vorname",
      lastName: "Nachname",
      email: "E-Mail",
      subject: "Betreff",
      message: "Ihre Nachricht...",
      submit: "Nachricht Senden",
      newsletter: "Abonnieren Sie unseren Newsletter mit Tipps zur Tierpflege",
      success: "Nachricht erfolgreich gesendet!",
      error: "Etwas ist schief gelaufen. Bitte versuchen Sie es erneut.",
    },

    info: {
      email: {
        title: "E-Mail",
        general: "Allgemeine Anfragen",
        generalEmail: "hello@cutiepawspedia.com",
        support: "Support",
        supportEmail: "hello@cutiepawspedia.com",
        business: "Unternehmenseinträge",
        businessEmail: "hello@cutiepawspedia.com",
      },
      location: {
        title: "Standort",
        address: "Amsterdam, Niederlande",
        note: "Wir arbeiten hauptsächlich online",
      },
      hours: {
        title: "Antwortzeit",
        time: "Innerhalb von 24 Stunden",
        note: "Montag - Freitag",
      },
    },

    faq: {
      title: "Häufig Gestellte Fragen",
      items: [
        {
          question: "Wie beanspruche ich meinen Unternehmenseintrag?",
          answer: "Besuchen Sie die Für Unternehmen Seite und folgen Sie den Schritten, um Ihr Unternehmen zu beanspruchen und zu verifizieren.",
        },
        {
          question: "Wie kann ich eine Bewertung abgeben?",
          answer: "Gehen Sie zur Unternehmensseite und klicken Sie auf 'Bewertung schreiben'. Sie müssen zuerst ein Konto erstellen.",
        },
        {
          question: "Ist es kostenlos, mein Unternehmen einzutragen?",
          answer: "Ja! Basis-Einträge sind komplett kostenlos. Wir bieten auch Premium-Pläne mit zusätzlichen Funktionen an.",
        },
      ],
    },
  },
};

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-gradient-to-b from-cpCream to-white dark:from-cpCharcoal dark:to-cpSurface">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-cpCoral/10 text-cpCoral border-cpCoral/20 dark:bg-cpCoral/20 dark:border-cpCoral/30">
              <MessageSquare className="h-3.5 w-3.5 mr-1" />
              {t.badge}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          {/* Main Content */}
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Send className="h-5 w-5 text-cpCoral" />
                    {t.form.title}
                  </CardTitle>
                  <CardDescription>{t.form.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm translations={t.form} />
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-4">
              {/* Email Card */}
              <Card className="border-border bg-card">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-cpCoral" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-foreground">{t.info.email.title}</h3>
                      <div className="space-y-1 text-sm">
                        <p className="text-muted-foreground">{t.info.email.general}</p>
                        <a href={`mailto:${t.info.email.generalEmail}`} className="text-cpCoral hover:underline block">
                          {t.info.email.generalEmail}
                        </a>
                      </div>
                      <div className="space-y-1 text-sm pt-2">
                        <p className="text-muted-foreground">{t.info.email.business}</p>
                        <a href={`mailto:${t.info.email.businessEmail}`} className="text-cpCoral hover:underline block">
                          {t.info.email.businessEmail}
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location Card */}
              <Card className="border-border bg-card">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-cpAmber/10 dark:bg-cpAmber/20 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-cpAmber" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{t.info.location.title}</h3>
                      <p className="text-muted-foreground">{t.info.location.address}</p>
                      <p className="text-sm text-muted-foreground/70 mt-1">{t.info.location.note}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Response Time Card */}
              <Card className="border-border bg-card">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                      <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{t.info.hours.title}</h3>
                      <p className="text-muted-foreground">{t.info.hours.time}</p>
                      <p className="text-sm text-muted-foreground/70 mt-1">{t.info.hours.note}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
                <HelpCircle className="h-6 w-6 text-cpCoral" />
                {t.faq.title}
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {t.faq.items.map((item, index) => (
                <Card key={index} className="border-border bg-card">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-foreground mb-2">{item.question}</h3>
                    <p className="text-sm text-muted-foreground">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
