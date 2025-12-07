/**
 * About Page - Static information page
 *
 * CACHING STRATEGY: Force Static
 * - Content rarely changes, can be fully static
 * - revalidate: 86400 (24 hours) for occasional content updates
 * - Optimal performance with pre-rendered content
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Target, Users, Star, Globe, Shield, Check } from "lucide-react";

// Static page with daily revalidation - content rarely changes
export const dynamic = "force-static";
export const revalidate = 86400;

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

const translations = {
  en: {
    badge: "About Us",
    title: "About CutiePawsPedia",
    intro: "CutiePawsPedia is the world's leading directory for pet services. We connect pet owners with trusted businesses that care for their furry, feathered, and scaly friends.",
    mission: {
      title: "Our Mission",
      content: "To make finding quality pet care simple, transparent, and trustworthy. Every pet deserves the best care, and every pet owner deserves peace of mind.",
    },
    vision: {
      title: "Our Vision",
      content: "To become the most trusted global platform where pet owners and pet service providers connect, fostering a community built on quality, transparency, and love for animals.",
    },
    offer: {
      title: "What We Offer",
      items: [
        "Comprehensive listings of pet services worldwide",
        "Verified reviews from real pet owners",
        "Easy comparison of services and prices",
        "Direct contact with businesses",
        "Multi-language support (English, Dutch, German)",
        "Free and premium business listings",
      ],
    },
    values: {
      title: "Our Values",
      items: [
        { icon: "heart", title: "Pet-First", description: "Every decision we make puts the wellbeing of pets first." },
        { icon: "shield", title: "Trust", description: "We build trust through transparency and verified reviews." },
        { icon: "users", title: "Community", description: "We foster a caring community of pet lovers and businesses." },
        { icon: "star", title: "Quality", description: "We maintain high standards for all listed businesses." },
      ],
    },
  },
  nl: {
    badge: "Over Ons",
    title: "Over CutiePawsPedia",
    intro: "CutiePawsPedia is 's werelds toonaangevende directory voor huisdierservices. We verbinden huisdiereigenaren met vertrouwde bedrijven die voor hun harige, gevederde en geschubde vrienden zorgen.",
    mission: {
      title: "Onze Missie",
      content: "Het vinden van kwalitatieve huisdierverzorging eenvoudig, transparant en betrouwbaar maken. Elk huisdier verdient de beste zorg, en elke huisdiereigenaar verdient gemoedsrust.",
    },
    vision: {
      title: "Onze Visie",
      content: "Het meest vertrouwde wereldwijde platform worden waar huisdiereigenaren en huisdierserviceproviders verbinden, en een gemeenschap bouwen gebaseerd op kwaliteit, transparantie en liefde voor dieren.",
    },
    offer: {
      title: "Wat We Bieden",
      items: [
        "Uitgebreide vermeldingen van huisdierservices wereldwijd",
        "Geverifieerde beoordelingen van echte huisdiereigenaren",
        "Eenvoudige vergelijking van diensten en prijzen",
        "Direct contact met bedrijven",
        "Meertalige ondersteuning (Engels, Nederlands, Duits)",
        "Gratis en premium bedrijfsvermeldingen",
      ],
    },
    values: {
      title: "Onze Waarden",
      items: [
        { icon: "heart", title: "Huisdier-Eerst", description: "Elke beslissing die we nemen stelt het welzijn van huisdieren voorop." },
        { icon: "shield", title: "Vertrouwen", description: "We bouwen vertrouwen door transparantie en geverifieerde beoordelingen." },
        { icon: "users", title: "Gemeenschap", description: "We bevorderen een zorgzame gemeenschap van dierenliefhebbers en bedrijven." },
        { icon: "star", title: "Kwaliteit", description: "We handhaven hoge standaarden voor alle vermelde bedrijven." },
      ],
    },
  },
  de: {
    badge: "Über Uns",
    title: "Über CutiePawsPedia",
    intro: "CutiePawsPedia ist das weltweit führende Verzeichnis für Tierdienstleistungen. Wir verbinden Tierbesitzer mit vertrauenswürdigen Unternehmen, die sich um ihre pelzigen, gefiederten und schuppigen Freunde kümmern.",
    mission: {
      title: "Unsere Mission",
      content: "Die Suche nach qualitativ hochwertiger Tierpflege einfach, transparent und vertrauenswürdig zu machen. Jedes Tier verdient die beste Pflege, und jeder Tierbesitzer verdient Seelenfrieden.",
    },
    vision: {
      title: "Unsere Vision",
      content: "Die vertrauenswürdigste globale Plattform zu werden, auf der sich Tierbesitzer und Tierdienstleister verbinden und eine Gemeinschaft aufbauen, die auf Qualität, Transparenz und Tierliebe basiert.",
    },
    offer: {
      title: "Was Wir Bieten",
      items: [
        "Umfassende Einträge von Tierdienstleistungen weltweit",
        "Verifizierte Bewertungen von echten Tierbesitzern",
        "Einfacher Vergleich von Dienstleistungen und Preisen",
        "Direkter Kontakt mit Unternehmen",
        "Mehrsprachige Unterstützung (Englisch, Niederländisch, Deutsch)",
        "Kostenlose und Premium-Unternehmenseinträge",
      ],
    },
    values: {
      title: "Unsere Werte",
      items: [
        { icon: "heart", title: "Tier-Zuerst", description: "Jede Entscheidung, die wir treffen, stellt das Wohlbefinden der Tiere an erste Stelle." },
        { icon: "shield", title: "Vertrauen", description: "Wir bauen Vertrauen durch Transparenz und verifizierte Bewertungen auf." },
        { icon: "users", title: "Gemeinschaft", description: "Wir fördern eine fürsorgliche Gemeinschaft von Tierliebhabern und Unternehmen." },
        { icon: "star", title: "Qualität", description: "Wir halten hohe Standards für alle gelisteten Unternehmen aufrecht." },
      ],
    },
  },
};

const iconMap = {
  heart: Heart,
  shield: Shield,
  users: Users,
  star: Star,
};

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-gradient-to-b from-cpCream to-white dark:from-cpCharcoal dark:to-cpSurface">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-cpCoral/10 text-cpCoral border-cpCoral/20 dark:bg-cpCoral/20 dark:border-cpCoral/30">
              <Heart className="h-3.5 w-3.5 mr-1" />
              {t.badge}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.intro}
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-foreground">
                  <div className="w-10 h-10 rounded-lg bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center">
                    <Target className="h-5 w-5 text-cpCoral" />
                  </div>
                  {t.mission.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t.mission.content}</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-foreground">
                  <div className="w-10 h-10 rounded-lg bg-cpAmber/10 dark:bg-cpAmber/20 flex items-center justify-center">
                    <Globe className="h-5 w-5 text-cpAmber" />
                  </div>
                  {t.vision.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t.vision.content}</p>
              </CardContent>
            </Card>
          </div>

          {/* What We Offer */}
          <Card className="mb-12 border-border bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">{t.offer.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid sm:grid-cols-2 gap-3">
                {t.offer.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-cpCoral mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Our Values */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">{t.values.title}</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {t.values.items.map((value, index) => {
                const IconComponent = iconMap[value.icon as keyof typeof iconMap];
                return (
                  <Card key={index} className="border-border bg-card">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center shrink-0">
                          <IconComponent className="h-5 w-5 text-cpCoral" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{value.title}</h3>
                          <p className="text-sm text-muted-foreground">{value.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
