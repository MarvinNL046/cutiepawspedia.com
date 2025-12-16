/**
 * Privacy Policy Page
 *
 * CACHING STRATEGY: Force Static
 * - Legal content rarely changes
 * - revalidate: 86400 (24 hours)
 */

import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, Lock, Database, Cookie, Mail, UserCheck, Globe } from "lucide-react";

export const dynamic = "force-static";
export const revalidate = 86400;

const BASE_URL = process.env.APP_BASE_URL || "https://cutiepawspedia.com";
const SITE_NAME = "CutiePawsPedia";

const metadataTranslations = {
  en: {
    title: "Privacy Policy",
    description: `Read ${SITE_NAME}'s privacy policy. Learn how we collect, use, and protect your personal information when using our pet services directory.`,
  },
  nl: {
    title: "Privacybeleid",
    description: `Lees het privacybeleid van ${SITE_NAME}. Ontdek hoe we uw persoonlijke gegevens verzamelen, gebruiken en beschermen bij het gebruik van onze huisdierservices directory.`,
  },
  de: {
    title: "Datenschutzrichtlinie",
    description: `Lesen Sie die Datenschutzrichtlinie von ${SITE_NAME}. Erfahren Sie, wie wir Ihre persönlichen Daten bei der Nutzung unseres Haustierservice-Verzeichnisses sammeln, verwenden und schützen.`,
  },
};

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = metadataTranslations[locale as keyof typeof metadataTranslations] || metadataTranslations.en;

  return {
    title: t.title,
    description: t.description,
    openGraph: {
      title: t.title,
      description: t.description,
      url: `${BASE_URL}/${locale}/privacy-policy`,
      type: "website",
      locale: locale === "nl" ? "nl_NL" : locale === "de" ? "de_DE" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/privacy-policy`,
      languages: {
        en: `${BASE_URL}/en/privacy-policy`,
        nl: `${BASE_URL}/nl/privacy-policy`,
        de: `${BASE_URL}/de/privacy-policy`,
      },
    },
  };
}

const translations = {
  en: {
    badge: "Privacy Policy",
    title: "Privacy Policy",
    lastUpdated: "Last updated",
    date: "December 7, 2024",
    intro: "At CutiePawsPedia, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.",

    sections: [
      {
        icon: "database",
        title: "Information We Collect",
        content: [
          "**Personal Information**: When you register an account, claim a business, or contact us, we may collect your name, email address, phone number, and other contact details.",
          "**Business Information**: If you list a business, we collect business name, address, contact information, photos, and service descriptions.",
          "**Usage Data**: We automatically collect information about how you interact with our website, including pages visited, time spent, and features used.",
          "**Device Information**: We collect information about your device, browser type, IP address, and operating system.",
        ],
      },
      {
        icon: "eye",
        title: "How We Use Your Information",
        content: [
          "To provide and maintain our services, including displaying business listings and enabling user reviews.",
          "To process your account registration and manage your subscription plans.",
          "To communicate with you about updates, marketing, and promotional offers (with your consent).",
          "To analyze usage patterns and improve our website and services.",
          "To detect, prevent, and address technical issues and fraudulent activity.",
        ],
      },
      {
        icon: "lock",
        title: "Data Security",
        content: [
          "We implement appropriate technical and organizational security measures to protect your personal information.",
          "Data is encrypted in transit using SSL/TLS protocols.",
          "Access to personal data is restricted to authorized personnel only.",
          "We regularly review and update our security practices to ensure your data remains protected.",
        ],
      },
      {
        icon: "cookie",
        title: "Cookies and Tracking",
        content: [
          "We use cookies and similar tracking technologies to enhance your browsing experience.",
          "**Essential Cookies**: Required for the website to function properly.",
          "**Analytics Cookies**: Help us understand how visitors interact with our website.",
          "**Marketing Cookies**: Used to deliver relevant advertisements (with your consent).",
          "You can manage your cookie preferences through your browser settings.",
        ],
      },
      {
        icon: "globe",
        title: "Data Sharing and Disclosure",
        content: [
          "We do not sell your personal information to third parties.",
          "We may share data with service providers who assist in operating our website (hosting, analytics, payment processing).",
          "We may disclose information if required by law or to protect our rights and safety.",
          "Business listing information is publicly visible to help pet owners find services.",
        ],
      },
      {
        icon: "usercheck",
        title: "Your Rights (GDPR)",
        content: [
          "**Right to Access**: You can request a copy of the personal data we hold about you.",
          "**Right to Rectification**: You can request correction of inaccurate personal data.",
          "**Right to Erasure**: You can request deletion of your personal data under certain circumstances.",
          "**Right to Portability**: You can request your data in a structured, commonly used format.",
          "**Right to Object**: You can object to processing of your personal data for marketing purposes.",
          "To exercise these rights, contact us at hello@cutiepawspedia.com",
        ],
      },
      {
        icon: "shield",
        title: "Data Retention",
        content: [
          "We retain personal data only for as long as necessary to fulfill the purposes outlined in this policy.",
          "Account data is retained while your account is active and for a reasonable period thereafter.",
          "Business listing data may be retained to maintain the integrity of our directory.",
          "You can request deletion of your data at any time by contacting us.",
        ],
      },
    ],

    contact: {
      title: "Contact Us",
      content: "If you have questions about this Privacy Policy or want to exercise your rights, please contact us:",
      email: "hello@cutiepawspedia.com",
    },

    changes: {
      title: "Changes to This Policy",
      content: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the \"Last updated\" date.",
    },
  },
  nl: {
    badge: "Privacybeleid",
    title: "Privacybeleid",
    lastUpdated: "Laatst bijgewerkt",
    date: "7 december 2024",
    intro: "Bij CutiePawsPedia nemen we uw privacy serieus. Dit Privacybeleid legt uit hoe we uw informatie verzamelen, gebruiken, delen en beschermen wanneer u onze website bezoekt.",

    sections: [
      {
        icon: "database",
        title: "Informatie die We Verzamelen",
        content: [
          "**Persoonlijke Informatie**: Wanneer u een account registreert, een bedrijf claimt of contact met ons opneemt, verzamelen we mogelijk uw naam, e-mailadres, telefoonnummer en andere contactgegevens.",
          "**Bedrijfsinformatie**: Als u een bedrijf vermeldt, verzamelen we bedrijfsnaam, adres, contactgegevens, foto's en servicebeschrijvingen.",
          "**Gebruiksgegevens**: We verzamelen automatisch informatie over hoe u met onze website interacteert, inclusief bezochte pagina's, bestede tijd en gebruikte functies.",
          "**Apparaatinformatie**: We verzamelen informatie over uw apparaat, browsertype, IP-adres en besturingssysteem.",
        ],
      },
      {
        icon: "eye",
        title: "Hoe We Uw Informatie Gebruiken",
        content: [
          "Om onze diensten te leveren en te onderhouden, inclusief het weergeven van bedrijfsvermeldingen en het mogelijk maken van gebruikersbeoordelingen.",
          "Om uw accountregistratie te verwerken en uw abonnementsplannen te beheren.",
          "Om met u te communiceren over updates, marketing en promotionele aanbiedingen (met uw toestemming).",
          "Om gebruikspatronen te analyseren en onze website en diensten te verbeteren.",
          "Om technische problemen en frauduleuze activiteiten te detecteren, voorkomen en aan te pakken.",
        ],
      },
      {
        icon: "lock",
        title: "Gegevensbeveiliging",
        content: [
          "We implementeren passende technische en organisatorische beveiligingsmaatregelen om uw persoonlijke informatie te beschermen.",
          "Gegevens worden versleuteld tijdens overdracht met SSL/TLS-protocollen.",
          "Toegang tot persoonlijke gegevens is beperkt tot alleen geautoriseerd personeel.",
          "We beoordelen en updaten regelmatig onze beveiligingspraktijken om ervoor te zorgen dat uw gegevens beschermd blijven.",
        ],
      },
      {
        icon: "cookie",
        title: "Cookies en Tracking",
        content: [
          "We gebruiken cookies en vergelijkbare trackingtechnologieën om uw browse-ervaring te verbeteren.",
          "**Essentiële Cookies**: Vereist om de website correct te laten functioneren.",
          "**Analytische Cookies**: Helpen ons te begrijpen hoe bezoekers met onze website interacteren.",
          "**Marketing Cookies**: Worden gebruikt om relevante advertenties te leveren (met uw toestemming).",
          "U kunt uw cookievoorkeuren beheren via uw browserinstellingen.",
        ],
      },
      {
        icon: "globe",
        title: "Gegevens Delen en Openbaarmaking",
        content: [
          "We verkopen uw persoonlijke informatie niet aan derden.",
          "We delen mogelijk gegevens met dienstverleners die helpen bij het beheren van onze website (hosting, analytics, betalingsverwerking).",
          "We kunnen informatie openbaar maken indien wettelijk vereist of om onze rechten en veiligheid te beschermen.",
          "Bedrijfsvermeldingsinformatie is publiekelijk zichtbaar om huisdiereigenaren te helpen diensten te vinden.",
        ],
      },
      {
        icon: "usercheck",
        title: "Uw Rechten (AVG)",
        content: [
          "**Recht op Toegang**: U kunt een kopie opvragen van de persoonlijke gegevens die we over u bewaren.",
          "**Recht op Rectificatie**: U kunt correctie van onjuiste persoonlijke gegevens verzoeken.",
          "**Recht op Wissing**: U kunt onder bepaalde omstandigheden verwijdering van uw persoonlijke gegevens verzoeken.",
          "**Recht op Overdraagbaarheid**: U kunt uw gegevens opvragen in een gestructureerd, veelgebruikt formaat.",
          "**Recht van Bezwaar**: U kunt bezwaar maken tegen de verwerking van uw persoonlijke gegevens voor marketingdoeleinden.",
          "Om deze rechten uit te oefenen, neem contact met ons op via hello@cutiepawspedia.com",
        ],
      },
      {
        icon: "shield",
        title: "Gegevensbewaring",
        content: [
          "We bewaren persoonlijke gegevens alleen zo lang als nodig is om de in dit beleid beschreven doelen te vervullen.",
          "Accountgegevens worden bewaard zolang uw account actief is en voor een redelijke periode daarna.",
          "Bedrijfsvermeldingsgegevens kunnen worden bewaard om de integriteit van onze directory te behouden.",
          "U kunt op elk moment verwijdering van uw gegevens verzoeken door contact met ons op te nemen.",
        ],
      },
    ],

    contact: {
      title: "Contact",
      content: "Als u vragen heeft over dit Privacybeleid of uw rechten wilt uitoefenen, neem dan contact met ons op:",
      email: "hello@cutiepawspedia.com",
    },

    changes: {
      title: "Wijzigingen in Dit Beleid",
      content: "We kunnen dit Privacybeleid van tijd tot tijd bijwerken. We zullen u op de hoogte stellen van eventuele wijzigingen door het nieuwe beleid op deze pagina te plaatsen en de datum \"Laatst bijgewerkt\" bij te werken.",
    },
  },
  de: {
    badge: "Datenschutzrichtlinie",
    title: "Datenschutzrichtlinie",
    lastUpdated: "Zuletzt aktualisiert",
    date: "7. Dezember 2024",
    intro: "Bei CutiePawsPedia nehmen wir Ihre Privatsphäre ernst. Diese Datenschutzrichtlinie erklärt, wie wir Ihre Informationen sammeln, verwenden, weitergeben und schützen, wenn Sie unsere Website besuchen.",

    sections: [
      {
        icon: "database",
        title: "Informationen, die Wir Sammeln",
        content: [
          "**Persönliche Informationen**: Wenn Sie ein Konto registrieren, ein Unternehmen beanspruchen oder uns kontaktieren, erfassen wir möglicherweise Ihren Namen, Ihre E-Mail-Adresse, Telefonnummer und andere Kontaktdaten.",
          "**Unternehmensinformationen**: Wenn Sie ein Unternehmen listen, erfassen wir Unternehmensname, Adresse, Kontaktinformationen, Fotos und Servicebeschreibungen.",
          "**Nutzungsdaten**: Wir erfassen automatisch Informationen darüber, wie Sie mit unserer Website interagieren, einschließlich besuchter Seiten, verbrachter Zeit und genutzter Funktionen.",
          "**Geräteinformationen**: Wir erfassen Informationen über Ihr Gerät, Browsertyp, IP-Adresse und Betriebssystem.",
        ],
      },
      {
        icon: "eye",
        title: "Wie Wir Ihre Informationen Verwenden",
        content: [
          "Um unsere Dienste bereitzustellen und zu warten, einschließlich der Anzeige von Unternehmenseinträgen und der Ermöglichung von Nutzerbewertungen.",
          "Um Ihre Kontoregistrierung zu verarbeiten und Ihre Abonnementpläne zu verwalten.",
          "Um mit Ihnen über Updates, Marketing und Werbeangebote zu kommunizieren (mit Ihrer Zustimmung).",
          "Um Nutzungsmuster zu analysieren und unsere Website und Dienste zu verbessern.",
          "Um technische Probleme und betrügerische Aktivitäten zu erkennen, zu verhindern und zu beheben.",
        ],
      },
      {
        icon: "lock",
        title: "Datensicherheit",
        content: [
          "Wir implementieren angemessene technische und organisatorische Sicherheitsmaßnahmen zum Schutz Ihrer persönlichen Informationen.",
          "Daten werden bei der Übertragung mit SSL/TLS-Protokollen verschlüsselt.",
          "Der Zugang zu persönlichen Daten ist auf autorisiertes Personal beschränkt.",
          "Wir überprüfen und aktualisieren regelmäßig unsere Sicherheitspraktiken, um sicherzustellen, dass Ihre Daten geschützt bleiben.",
        ],
      },
      {
        icon: "cookie",
        title: "Cookies und Tracking",
        content: [
          "Wir verwenden Cookies und ähnliche Tracking-Technologien, um Ihr Browsing-Erlebnis zu verbessern.",
          "**Essentielle Cookies**: Erforderlich für das ordnungsgemäße Funktionieren der Website.",
          "**Analytische Cookies**: Helfen uns zu verstehen, wie Besucher mit unserer Website interagieren.",
          "**Marketing-Cookies**: Werden verwendet, um relevante Werbung zu liefern (mit Ihrer Zustimmung).",
          "Sie können Ihre Cookie-Einstellungen über Ihre Browsereinstellungen verwalten.",
        ],
      },
      {
        icon: "globe",
        title: "Datenweitergabe und Offenlegung",
        content: [
          "Wir verkaufen Ihre persönlichen Informationen nicht an Dritte.",
          "Wir teilen möglicherweise Daten mit Dienstleistern, die beim Betrieb unserer Website helfen (Hosting, Analytics, Zahlungsabwicklung).",
          "Wir können Informationen offenlegen, wenn dies gesetzlich vorgeschrieben ist oder um unsere Rechte und Sicherheit zu schützen.",
          "Unternehmenseinträge sind öffentlich sichtbar, um Tierbesitzern bei der Suche nach Diensten zu helfen.",
        ],
      },
      {
        icon: "usercheck",
        title: "Ihre Rechte (DSGVO)",
        content: [
          "**Auskunftsrecht**: Sie können eine Kopie der personenbezogenen Daten anfordern, die wir über Sie gespeichert haben.",
          "**Recht auf Berichtigung**: Sie können die Korrektur unrichtiger personenbezogener Daten verlangen.",
          "**Recht auf Löschung**: Sie können unter bestimmten Umständen die Löschung Ihrer personenbezogenen Daten verlangen.",
          "**Recht auf Datenübertragbarkeit**: Sie können Ihre Daten in einem strukturierten, gängigen Format anfordern.",
          "**Widerspruchsrecht**: Sie können der Verarbeitung Ihrer personenbezogenen Daten für Marketingzwecke widersprechen.",
          "Um diese Rechte auszuüben, kontaktieren Sie uns unter hello@cutiepawspedia.com",
        ],
      },
      {
        icon: "shield",
        title: "Datenaufbewahrung",
        content: [
          "Wir bewahren personenbezogene Daten nur so lange auf, wie es zur Erfüllung der in dieser Richtlinie beschriebenen Zwecke erforderlich ist.",
          "Kontodaten werden aufbewahrt, solange Ihr Konto aktiv ist, und für einen angemessenen Zeitraum danach.",
          "Unternehmenseinträge können aufbewahrt werden, um die Integrität unseres Verzeichnisses zu wahren.",
          "Sie können jederzeit die Löschung Ihrer Daten verlangen, indem Sie uns kontaktieren.",
        ],
      },
    ],

    contact: {
      title: "Kontakt",
      content: "Wenn Sie Fragen zu dieser Datenschutzrichtlinie haben oder Ihre Rechte ausüben möchten, kontaktieren Sie uns bitte:",
      email: "hello@cutiepawspedia.com",
    },

    changes: {
      title: "Änderungen dieser Richtlinie",
      content: "Wir können diese Datenschutzrichtlinie von Zeit zu Zeit aktualisieren. Wir werden Sie über Änderungen informieren, indem wir die neue Richtlinie auf dieser Seite veröffentlichen und das Datum \"Zuletzt aktualisiert\" aktualisieren.",
    },
  },
};

const iconMap = {
  database: Database,
  eye: Eye,
  lock: Lock,
  cookie: Cookie,
  globe: Globe,
  usercheck: UserCheck,
  shield: Shield,
};

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-gradient-to-b from-cpCream to-white dark:from-cpCharcoal dark:to-cpSurface">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-cpCoral/10 text-cpCoral border-cpCoral/20 dark:bg-cpCoral/20 dark:border-cpCoral/30">
              <Shield className="h-3.5 w-3.5 mr-1" />
              {t.badge}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t.title}
            </h1>
            <p className="text-muted-foreground">
              {t.lastUpdated}: {t.date}
            </p>
          </div>

          {/* Intro */}
          <Card className="mb-8 border-border bg-card">
            <CardContent className="pt-6">
              <p className="text-foreground leading-relaxed">
                {t.intro}
              </p>
            </CardContent>
          </Card>

          {/* Sections */}
          <div className="space-y-6">
            {t.sections.map((section, index) => {
              const IconComponent = iconMap[section.icon as keyof typeof iconMap];
              return (
                <Card key={index} className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-foreground">
                      <div className="w-10 h-10 rounded-lg bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-cpCoral" />
                      </div>
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <span className="text-cpCoral mt-1">•</span>
                          <span
                            className="text-muted-foreground"
                            dangerouslySetInnerHTML={{
                              __html: item
                                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact Section */}
          <Card className="mt-8 border-cpCoral/20 dark:border-cpCoral/30 bg-cpCoral/5 dark:bg-cpCoral/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-foreground">
                <div className="w-10 h-10 rounded-lg bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-cpCoral" />
                </div>
                {t.contact.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-3">{t.contact.content}</p>
              <a
                href={`mailto:${t.contact.email}`}
                className="text-cpCoral hover:underline font-medium"
              >
                {t.contact.email}
              </a>
            </CardContent>
          </Card>

          {/* Changes Section */}
          <Card className="mt-6 border-border bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">{t.changes.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t.changes.content}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
