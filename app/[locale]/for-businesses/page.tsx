/**
 * For Businesses Page - Business pricing and signup
 *
 * CACHING STRATEGY: Force Static
 * - Pricing/features content is relatively static
 * - revalidate: 86400 (24 hours) for pricing updates
 * - Optimal performance for conversion-focused page
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Star,
  TrendingUp,
  Users,
  MessageSquare,
  BarChart3,
  Shield,
  Zap,
  Building2,
  Search,
  ArrowRight,
  Mail,
} from "lucide-react";

// Static page with daily revalidation - pricing rarely changes
export const dynamic = "force-static";
export const revalidate = 86400;

interface ForBusinessesPageProps {
  params: Promise<{ locale: string }>;
}

// Translations
const translations = {
  en: {
    badge: "For Pet Businesses",
    title: "Grow Your Pet Business with CutiePawsPedia",
    subtitle: "Connect with pet owners actively searching for services like yours. Only pay for real leads.",

    // How it works
    howItWorksTitle: "How It Works",
    howItWorksSteps: [
      { title: "Claim Your Listing", description: "Find your business and claim it for free. Already have a listing? Search for it below." },
      { title: "Complete Your Profile", description: "Add photos, services, opening hours, and showcase what makes you special." },
      { title: "Receive Leads", description: "Pet owners contact you directly. You only pay for actual leads received." },
    ],

    // Pricing
    pricingTitle: "Simple, Transparent Pricing",
    pricingSubtitle: "No monthly fees. Only pay when pet owners contact you.",

    freeTitle: "Free Listing",
    freeDescription: "Get discovered by pet owners",
    freePrice: "€0",
    freePriceNote: "forever",
    freeFeatures: [
      "Business profile page",
      "Contact information display",
      "Customer reviews & ratings",
      "Appear in search results",
      "Basic analytics",
    ],
    freeButton: "Claim Your Business",

    premiumTitle: "Premium Listing",
    premiumDescription: "Stand out and get more leads",
    premiumPrice: "€15",
    premiumPriceNote: "one-time upgrade",
    premiumFeatures: [
      "Everything in Free",
      "Featured in category listings",
      "Priority in search results",
      "Verified badge ✓",
      "Discounted lead pricing",
      "Advanced analytics dashboard",
    ],
    premiumButton: "Learn More",

    leadsTitle: "Pay-Per-Lead",
    leadsDescription: "Only pay for actual customer contacts",
    leadsPrice: "€2.50",
    leadsPriceNote: "per lead",
    leadsFeatures: [
      "Phone call clicks",
      "Email inquiries",
      "Website visits from listing",
      "Direction requests",
      "Premium: Only €1.50/lead",
    ],
    leadsButton: "See How It Works",

    // Benefits
    benefitsTitle: "Why Pet Businesses Choose Us",
    benefits: [
      { icon: "users", title: "Targeted Audience", description: "Reach pet owners actively searching for services in their area" },
      { icon: "trending", title: "Grow Your Business", description: "Increase visibility and attract new customers every month" },
      { icon: "shield", title: "Verified Reviews", description: "Build trust with authentic customer reviews and ratings" },
      { icon: "chart", title: "Track Performance", description: "See how many people view your listing and contact you" },
    ],

    // CTA
    ctaTitle: "Ready to Grow Your Business?",
    ctaSubtitle: "Join thousands of pet businesses already on CutiePawsPedia",
    ctaButton: "Search for Your Business",
    ctaHelp: "Need help? Contact us at",

    // Footer
    enterpriseTitle: "Enterprise & Multi-Location",
    enterpriseDescription: "Managing multiple locations or need custom solutions? Let's talk.",
    enterpriseButton: "Contact Sales",
  },
  nl: {
    badge: "Voor Bedrijven",
    title: "Laat Je Dierenbedrijf Groeien met CutiePawsPedia",
    subtitle: "Bereik huisdiereigenaren die actief zoeken naar diensten zoals de jouwe. Betaal alleen voor echte leads.",

    howItWorksTitle: "Hoe Het Werkt",
    howItWorksSteps: [
      { title: "Claim Je Vermelding", description: "Vind je bedrijf en claim het gratis. Al een vermelding? Zoek hieronder." },
      { title: "Vul Je Profiel Aan", description: "Voeg foto's, diensten, openingstijden toe en laat zien wat je bijzonder maakt." },
      { title: "Ontvang Leads", description: "Huisdiereigenaren nemen direct contact op. Je betaalt alleen voor ontvangen leads." },
    ],

    pricingTitle: "Eenvoudige, Transparante Prijzen",
    pricingSubtitle: "Geen maandelijkse kosten. Betaal alleen wanneer huisdiereigenaren contact opnemen.",

    freeTitle: "Gratis Vermelding",
    freeDescription: "Word gevonden door huisdiereigenaren",
    freePrice: "€0",
    freePriceNote: "altijd",
    freeFeatures: [
      "Bedrijfsprofiel pagina",
      "Contactgegevens weergave",
      "Klantbeoordelingen & ratings",
      "Verschijn in zoekresultaten",
      "Basis statistieken",
    ],
    freeButton: "Claim Je Bedrijf",

    premiumTitle: "Premium Vermelding",
    premiumDescription: "Val op en krijg meer leads",
    premiumPrice: "€15",
    premiumPriceNote: "eenmalige upgrade",
    premiumFeatures: [
      "Alles van Gratis",
      "Uitgelicht in categorieën",
      "Prioriteit in zoekresultaten",
      "Geverifieerd badge ✓",
      "Korting op lead prijzen",
      "Uitgebreid statistieken dashboard",
    ],
    premiumButton: "Meer Info",

    leadsTitle: "Betaal-Per-Lead",
    leadsDescription: "Betaal alleen voor daadwerkelijke klantcontacten",
    leadsPrice: "€2,50",
    leadsPriceNote: "per lead",
    leadsFeatures: [
      "Telefoon klikken",
      "E-mail aanvragen",
      "Website bezoeken via vermelding",
      "Routebeschrijvingen",
      "Premium: Slechts €1,50/lead",
    ],
    leadsButton: "Bekijk Hoe Het Werkt",

    benefitsTitle: "Waarom Dierenbedrijven Voor Ons Kiezen",
    benefits: [
      { icon: "users", title: "Gericht Publiek", description: "Bereik huisdiereigenaren die actief zoeken naar diensten in hun buurt" },
      { icon: "trending", title: "Groei Je Bedrijf", description: "Vergroot je zichtbaarheid en trek elke maand nieuwe klanten aan" },
      { icon: "shield", title: "Geverifieerde Reviews", description: "Bouw vertrouwen op met authentieke klantbeoordelingen" },
      { icon: "chart", title: "Volg Prestaties", description: "Zie hoeveel mensen je vermelding bekijken en contact opnemen" },
    ],

    ctaTitle: "Klaar Om Je Bedrijf Te Laten Groeien?",
    ctaSubtitle: "Sluit je aan bij duizenden dierenbedrijven op CutiePawsPedia",
    ctaButton: "Zoek Je Bedrijf",
    ctaHelp: "Hulp nodig? Neem contact op via",

    enterpriseTitle: "Zakelijk & Meerdere Locaties",
    enterpriseDescription: "Beheer je meerdere locaties of heb je maatwerkoplossingen nodig? Laten we praten.",
    enterpriseButton: "Neem Contact Op",
  },
  de: {
    badge: "Für Unternehmen",
    title: "Lassen Sie Ihr Tiergeschäft mit CutiePawsPedia wachsen",
    subtitle: "Erreichen Sie Tierbesitzer, die aktiv nach Dienstleistungen wie Ihren suchen. Zahlen Sie nur für echte Leads.",

    howItWorksTitle: "So Funktioniert Es",
    howItWorksSteps: [
      { title: "Eintrag Beanspruchen", description: "Finden Sie Ihr Unternehmen und beanspruchen Sie es kostenlos." },
      { title: "Profil Vervollständigen", description: "Fügen Sie Fotos, Dienstleistungen und Öffnungszeiten hinzu." },
      { title: "Leads Erhalten", description: "Tierbesitzer kontaktieren Sie direkt. Sie zahlen nur für erhaltene Leads." },
    ],

    pricingTitle: "Einfache, Transparente Preise",
    pricingSubtitle: "Keine monatlichen Gebühren. Zahlen Sie nur, wenn Tierbesitzer Sie kontaktieren.",

    freeTitle: "Kostenloser Eintrag",
    freeDescription: "Werden Sie von Tierbesitzern gefunden",
    freePrice: "€0",
    freePriceNote: "für immer",
    freeFeatures: [
      "Unternehmensprofil",
      "Kontaktinformationen",
      "Kundenbewertungen",
      "In Suchergebnissen erscheinen",
      "Basis-Analysen",
    ],
    freeButton: "Unternehmen Beanspruchen",

    premiumTitle: "Premium Eintrag",
    premiumDescription: "Heben Sie sich ab und erhalten Sie mehr Leads",
    premiumPrice: "€15",
    premiumPriceNote: "einmaliges Upgrade",
    premiumFeatures: [
      "Alles aus Kostenlos",
      "In Kategorien hervorgehoben",
      "Priorität in Suchergebnissen",
      "Verifiziertes Abzeichen ✓",
      "Ermäßigte Lead-Preise",
      "Erweitertes Analyse-Dashboard",
    ],
    premiumButton: "Mehr Erfahren",

    leadsTitle: "Pay-Per-Lead",
    leadsDescription: "Zahlen Sie nur für tatsächliche Kundenkontakte",
    leadsPrice: "€2,50",
    leadsPriceNote: "pro Lead",
    leadsFeatures: [
      "Telefonanruf-Klicks",
      "E-Mail-Anfragen",
      "Website-Besuche",
      "Routenanfragen",
      "Premium: Nur €1,50/Lead",
    ],
    leadsButton: "So Funktioniert Es",

    benefitsTitle: "Warum Tierunternehmen Uns Wählen",
    benefits: [
      { icon: "users", title: "Zielgruppe", description: "Erreichen Sie Tierbesitzer, die aktiv nach Dienstleistungen suchen" },
      { icon: "trending", title: "Wachstum", description: "Steigern Sie Ihre Sichtbarkeit und gewinnen Sie neue Kunden" },
      { icon: "shield", title: "Verifizierte Bewertungen", description: "Bauen Sie Vertrauen mit authentischen Bewertungen auf" },
      { icon: "chart", title: "Leistung Verfolgen", description: "Sehen Sie, wie viele Menschen Ihren Eintrag ansehen" },
    ],

    ctaTitle: "Bereit, Ihr Geschäft zu Erweitern?",
    ctaSubtitle: "Schließen Sie sich Tausenden von Tierunternehmen auf CutiePawsPedia an",
    ctaButton: "Unternehmen Suchen",
    ctaHelp: "Brauchen Sie Hilfe? Kontaktieren Sie uns unter",

    enterpriseTitle: "Enterprise & Mehrere Standorte",
    enterpriseDescription: "Verwalten Sie mehrere Standorte oder benötigen Sie individuelle Lösungen?",
    enterpriseButton: "Vertrieb Kontaktieren",
  },
};

const iconMap = {
  users: Users,
  trending: TrendingUp,
  shield: Shield,
  chart: BarChart3,
};

export default async function ForBusinessesPage({ params }: ForBusinessesPageProps) {
  const { locale } = await params;
  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4 bg-cpPink/10 text-cpPink border-cpPink/20">
            <Building2 className="h-3.5 w-3.5 mr-1" />
            {t.badge}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-cpDark mb-6">
            {t.title}
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            {t.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-cpPink hover:bg-cpPink/90">
              <Link href={`/${locale}`}>
                <Search className="h-4 w-4 mr-2" />
                {t.ctaButton}
              </Link>
            </Button>
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-cpDark text-center mb-10">{t.howItWorksTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {t.howItWorksSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 rounded-full bg-cpPink text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-cpDark mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-cpDark mb-2">{t.pricingTitle}</h2>
            <p className="text-slate-600">{t.pricingSubtitle}</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Free Listing */}
            <Card className="relative">
              <CardHeader>
                <CardTitle>{t.freeTitle}</CardTitle>
                <CardDescription>{t.freeDescription}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-cpDark">{t.freePrice}</span>
                  <span className="text-slate-500 ml-2">{t.freePriceNote}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600 mb-6">
                  {t.freeFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full" variant="outline">
                  <Link href={`/${locale}`}>
                    {t.freeButton}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Premium Listing */}
            <Card className="border-cpPink border-2 relative shadow-lg">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cpPink">
                <Star className="h-3 w-3 mr-1" />
                Popular
              </Badge>
              <CardHeader>
                <CardTitle>{t.premiumTitle}</CardTitle>
                <CardDescription>{t.premiumDescription}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-cpDark">{t.premiumPrice}</span>
                  <span className="text-slate-500 ml-2">{t.premiumPriceNote}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600 mb-6">
                  {t.premiumFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-cpPink mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full bg-cpPink hover:bg-cpPink/90">
                  <Link href={`/${locale}`}>
                    {t.premiumButton}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Pay-Per-Lead */}
            <Card className="relative bg-gradient-to-br from-slate-50 to-slate-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-cpYellow" />
                  {t.leadsTitle}
                </CardTitle>
                <CardDescription>{t.leadsDescription}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-cpDark">{t.leadsPrice}</span>
                  <span className="text-slate-500 ml-2">{t.leadsPriceNote}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600 mb-6">
                  {t.leadsFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-cpYellow mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full" variant="outline">
                  <Link href={`/${locale}`}>
                    {t.leadsButton}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Benefits */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-cpDark text-center mb-10">{t.benefitsTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {t.benefits.map((benefit, index) => {
              const IconComponent = iconMap[benefit.icon as keyof typeof iconMap];
              return (
                <Card key={index} className="border-slate-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-cpPink/10 flex items-center justify-center shrink-0">
                        <IconComponent className="h-5 w-5 text-cpPink" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-cpDark mb-1">{benefit.title}</h3>
                        <p className="text-sm text-slate-600">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Card className="bg-gradient-to-r from-cpPink/5 to-cpYellow/5 border-cpPink/20">
            <CardContent className="pt-8 pb-8">
              <h2 className="text-2xl font-bold text-cpDark mb-2">{t.ctaTitle}</h2>
              <p className="text-slate-600 mb-6">{t.ctaSubtitle}</p>
              <Button asChild size="lg" className="bg-cpPink hover:bg-cpPink/90">
                <Link href={`/${locale}`}>
                  <Search className="h-4 w-4 mr-2" />
                  {t.ctaButton}
                </Link>
              </Button>
              <p className="text-sm text-slate-500 mt-4">
                {t.ctaHelp}{" "}
                <a href="mailto:business@cutiepawspedia.com" className="text-cpPink hover:underline">
                  business@cutiepawspedia.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Enterprise Section */}
        <div className="max-w-2xl mx-auto text-center">
          <Card className="border-slate-300 bg-slate-50">
            <CardContent className="pt-6 pb-6">
              <h3 className="font-semibold text-cpDark mb-2">{t.enterpriseTitle}</h3>
              <p className="text-sm text-slate-600 mb-4">{t.enterpriseDescription}</p>
              <Button asChild variant="outline">
                <a href="mailto:enterprise@cutiepawspedia.com">
                  <Mail className="h-4 w-4 mr-2" />
                  {t.enterpriseButton}
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
