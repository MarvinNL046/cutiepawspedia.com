/**
 * Terms of Service Page
 *
 * CACHING STRATEGY: Force Static
 * - Legal content rarely changes
 * - revalidate: 86400 (24 hours)
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  UserCheck,
  Building2,
  MessageSquare,
  CreditCard,
  AlertTriangle,
  Scale,
  Mail,
  ShieldCheck,
  Ban,
} from "lucide-react";

export const dynamic = "force-static";
export const revalidate = 86400;

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

const translations = {
  en: {
    badge: "Terms of Service",
    title: "Terms of Service",
    lastUpdated: "Last updated",
    date: "December 7, 2024",
    intro: "Welcome to CutiePawsPedia. By accessing or using our website, you agree to be bound by these Terms of Service. Please read them carefully before using our services.",

    sections: [
      {
        icon: "usercheck",
        title: "Acceptance of Terms",
        content: [
          "By accessing and using CutiePawsPedia, you accept and agree to be bound by these Terms of Service.",
          "If you do not agree to these terms, please do not use our website or services.",
          "We reserve the right to modify these terms at any time. Continued use after changes constitutes acceptance.",
          "You must be at least 18 years old or have parental consent to use our services.",
        ],
      },
      {
        icon: "building",
        title: "Business Listings",
        content: [
          "Business owners can claim and manage their listings on CutiePawsPedia.",
          "You are responsible for ensuring all business information is accurate and up-to-date.",
          "We reserve the right to remove or modify listings that violate our guidelines or contain false information.",
          "Premium subscription features are subject to their respective plan terms and pricing.",
          "Business listings may be publicly visible to help pet owners find services.",
        ],
      },
      {
        icon: "message",
        title: "User Reviews and Content",
        content: [
          "Users may submit reviews and ratings for businesses listed on our platform.",
          "Reviews must be honest, based on genuine experiences, and comply with our content guidelines.",
          "We prohibit fake reviews, spam, harassment, hate speech, and illegal content.",
          "We reserve the right to remove reviews that violate our guidelines without prior notice.",
          "By submitting content, you grant us a non-exclusive license to display and use it on our platform.",
        ],
      },
      {
        icon: "creditcard",
        title: "Subscription and Payments",
        content: [
          "Subscription plans are billed on a monthly or annual basis as selected.",
          "Payments are processed securely through our payment provider (Stripe).",
          "Subscriptions automatically renew unless cancelled before the renewal date.",
          "Refunds are handled according to our refund policy. Contact us for specific inquiries.",
          "We reserve the right to change pricing with reasonable notice to subscribers.",
        ],
      },
      {
        icon: "ban",
        title: "Prohibited Activities",
        content: [
          "Using the service for any illegal or unauthorized purpose.",
          "Submitting false, misleading, or fraudulent information.",
          "Attempting to interfere with the proper functioning of the website.",
          "Scraping, crawling, or collecting data without permission.",
          "Impersonating another person or business.",
          "Posting content that infringes on intellectual property rights.",
        ],
      },
      {
        icon: "shield",
        title: "Intellectual Property",
        content: [
          "All content on CutiePawsPedia, including logos, text, and design, is our intellectual property.",
          "You may not reproduce, distribute, or create derivative works without written permission.",
          "User-submitted content remains the property of the respective users.",
          "Trademarks and service marks displayed are the property of their respective owners.",
        ],
      },
      {
        icon: "alert",
        title: "Disclaimers and Limitations",
        content: [
          "CutiePawsPedia is provided \"as is\" without warranties of any kind.",
          "We do not guarantee the accuracy, completeness, or reliability of business listings or reviews.",
          "We are not responsible for the quality of services provided by listed businesses.",
          "Our liability is limited to the maximum extent permitted by law.",
          "We are not liable for any indirect, incidental, or consequential damages.",
        ],
      },
      {
        icon: "scale",
        title: "Governing Law and Disputes",
        content: [
          "These Terms are governed by the laws of the Netherlands.",
          "Any disputes shall be resolved through negotiation in good faith.",
          "If negotiation fails, disputes may be submitted to the competent courts in the Netherlands.",
          "You agree to attempt informal dispute resolution before pursuing legal action.",
        ],
      },
    ],

    contact: {
      title: "Contact Us",
      content: "If you have questions about these Terms of Service, please contact us:",
      email: "hello@cutiepawspedia.com",
    },

    termination: {
      title: "Termination",
      content: "We may terminate or suspend your access to our services at any time, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason at our sole discretion.",
    },
  },
  nl: {
    badge: "Gebruiksvoorwaarden",
    title: "Gebruiksvoorwaarden",
    lastUpdated: "Laatst bijgewerkt",
    date: "7 december 2024",
    intro: "Welkom bij CutiePawsPedia. Door onze website te bezoeken of te gebruiken, gaat u akkoord met deze Gebruiksvoorwaarden. Lees ze zorgvuldig door voordat u onze diensten gebruikt.",

    sections: [
      {
        icon: "usercheck",
        title: "Aanvaarding van Voorwaarden",
        content: [
          "Door CutiePawsPedia te bezoeken en te gebruiken, aanvaardt u en gaat u akkoord met deze Gebruiksvoorwaarden.",
          "Als u niet akkoord gaat met deze voorwaarden, gebruik dan onze website of diensten niet.",
          "We behouden ons het recht voor deze voorwaarden op elk moment te wijzigen. Voortgezet gebruik na wijzigingen betekent aanvaarding.",
          "U moet minimaal 18 jaar oud zijn of ouderlijke toestemming hebben om onze diensten te gebruiken.",
        ],
      },
      {
        icon: "building",
        title: "Bedrijfsvermeldingen",
        content: [
          "Bedrijfseigenaren kunnen hun vermeldingen op CutiePawsPedia claimen en beheren.",
          "U bent verantwoordelijk voor het zorgen dat alle bedrijfsinformatie accuraat en up-to-date is.",
          "We behouden ons het recht voor vermeldingen te verwijderen of te wijzigen die onze richtlijnen schenden of valse informatie bevatten.",
          "Premium abonnementsfuncties zijn onderworpen aan hun respectieve planvoorwaarden en prijzen.",
          "Bedrijfsvermeldingen kunnen publiekelijk zichtbaar zijn om huisdiereigenaren te helpen diensten te vinden.",
        ],
      },
      {
        icon: "message",
        title: "Gebruikersbeoordelingen en Content",
        content: [
          "Gebruikers kunnen beoordelingen en ratings indienen voor bedrijven op ons platform.",
          "Beoordelingen moeten eerlijk zijn, gebaseerd op echte ervaringen en voldoen aan onze contentrichtlijnen.",
          "We verbieden nepbeoordelingen, spam, intimidatie, haatspraak en illegale content.",
          "We behouden ons het recht voor beoordelingen te verwijderen die onze richtlijnen schenden zonder voorafgaande kennisgeving.",
          "Door content in te dienen, verleent u ons een niet-exclusieve licentie om deze op ons platform weer te geven en te gebruiken.",
        ],
      },
      {
        icon: "creditcard",
        title: "Abonnement en Betalingen",
        content: [
          "Abonnementsplannen worden maandelijks of jaarlijks gefactureerd zoals geselecteerd.",
          "Betalingen worden veilig verwerkt via onze betalingsprovider (Stripe).",
          "Abonnementen worden automatisch verlengd tenzij opgezegd vóór de verlengingsdatum.",
          "Terugbetalingen worden afgehandeld volgens ons terugbetalingsbeleid. Neem contact met ons op voor specifieke vragen.",
          "We behouden ons het recht voor prijzen te wijzigen met redelijke kennisgeving aan abonnees.",
        ],
      },
      {
        icon: "ban",
        title: "Verboden Activiteiten",
        content: [
          "De dienst gebruiken voor illegale of ongeautoriseerde doeleinden.",
          "Valse, misleidende of frauduleuze informatie indienen.",
          "Proberen de goede werking van de website te verstoren.",
          "Scrapen, crawlen of verzamelen van gegevens zonder toestemming.",
          "Zich voordoen als een andere persoon of bedrijf.",
          "Content plaatsen die inbreuk maakt op intellectuele eigendomsrechten.",
        ],
      },
      {
        icon: "shield",
        title: "Intellectueel Eigendom",
        content: [
          "Alle content op CutiePawsPedia, inclusief logo's, tekst en ontwerp, is ons intellectueel eigendom.",
          "U mag niet reproduceren, verspreiden of afgeleide werken maken zonder schriftelijke toestemming.",
          "Door gebruikers ingediende content blijft eigendom van de respectieve gebruikers.",
          "Weergegeven handelsmerken en dienstmerken zijn eigendom van hun respectieve eigenaren.",
        ],
      },
      {
        icon: "alert",
        title: "Disclaimers en Beperkingen",
        content: [
          "CutiePawsPedia wordt geleverd \"zoals het is\" zonder garanties van welke aard dan ook.",
          "We garanderen niet de nauwkeurigheid, volledigheid of betrouwbaarheid van bedrijfsvermeldingen of beoordelingen.",
          "We zijn niet verantwoordelijk voor de kwaliteit van diensten die door vermelde bedrijven worden geleverd.",
          "Onze aansprakelijkheid is beperkt tot het maximaal wettelijk toegestane.",
          "We zijn niet aansprakelijk voor indirecte, incidentele of gevolgschade.",
        ],
      },
      {
        icon: "scale",
        title: "Toepasselijk Recht en Geschillen",
        content: [
          "Deze Voorwaarden worden beheerst door het recht van Nederland.",
          "Geschillen worden opgelost door onderhandeling te goeder trouw.",
          "Als onderhandeling mislukt, kunnen geschillen worden voorgelegd aan de bevoegde rechtbanken in Nederland.",
          "U gaat akkoord met het proberen van informele geschillenbeslechting voordat u juridische stappen onderneemt.",
        ],
      },
    ],

    contact: {
      title: "Contact",
      content: "Als u vragen heeft over deze Gebruiksvoorwaarden, neem dan contact met ons op:",
      email: "hello@cutiepawspedia.com",
    },

    termination: {
      title: "Beëindiging",
      content: "We kunnen uw toegang tot onze diensten op elk moment beëindigen of opschorten, zonder voorafgaande kennisgeving, voor gedrag waarvan we geloven dat het deze Voorwaarden schendt of schadelijk is voor andere gebruikers, ons of derden, of om elke andere reden naar eigen goeddunken.",
    },
  },
  de: {
    badge: "Nutzungsbedingungen",
    title: "Nutzungsbedingungen",
    lastUpdated: "Zuletzt aktualisiert",
    date: "7. Dezember 2024",
    intro: "Willkommen bei CutiePawsPedia. Durch den Zugriff auf oder die Nutzung unserer Website stimmen Sie diesen Nutzungsbedingungen zu. Bitte lesen Sie diese sorgfältig durch, bevor Sie unsere Dienste nutzen.",

    sections: [
      {
        icon: "usercheck",
        title: "Annahme der Bedingungen",
        content: [
          "Durch den Zugriff auf und die Nutzung von CutiePawsPedia akzeptieren Sie diese Nutzungsbedingungen und stimmen ihnen zu.",
          "Wenn Sie diesen Bedingungen nicht zustimmen, nutzen Sie bitte unsere Website oder Dienste nicht.",
          "Wir behalten uns das Recht vor, diese Bedingungen jederzeit zu ändern. Die fortgesetzte Nutzung nach Änderungen gilt als Zustimmung.",
          "Sie müssen mindestens 18 Jahre alt sein oder die Zustimmung der Eltern haben, um unsere Dienste zu nutzen.",
        ],
      },
      {
        icon: "building",
        title: "Unternehmenseinträge",
        content: [
          "Unternehmensinhaber können ihre Einträge auf CutiePawsPedia beanspruchen und verwalten.",
          "Sie sind dafür verantwortlich, dass alle Unternehmensinformationen korrekt und aktuell sind.",
          "Wir behalten uns das Recht vor, Einträge zu entfernen oder zu ändern, die gegen unsere Richtlinien verstoßen oder falsche Informationen enthalten.",
          "Premium-Abonnementfunktionen unterliegen den jeweiligen Planbedingungen und Preisen.",
          "Unternehmenseinträge können öffentlich sichtbar sein, um Tierbesitzern bei der Suche nach Diensten zu helfen.",
        ],
      },
      {
        icon: "message",
        title: "Nutzerbewertungen und Inhalte",
        content: [
          "Nutzer können Bewertungen und Ratings für Unternehmen auf unserer Plattform einreichen.",
          "Bewertungen müssen ehrlich sein, auf echten Erfahrungen basieren und unseren Inhaltsrichtlinien entsprechen.",
          "Wir verbieten gefälschte Bewertungen, Spam, Belästigung, Hassrede und illegale Inhalte.",
          "Wir behalten uns das Recht vor, Bewertungen, die gegen unsere Richtlinien verstoßen, ohne vorherige Ankündigung zu entfernen.",
          "Durch das Einreichen von Inhalten gewähren Sie uns eine nicht-exklusive Lizenz zur Anzeige und Nutzung auf unserer Plattform.",
        ],
      },
      {
        icon: "creditcard",
        title: "Abonnement und Zahlungen",
        content: [
          "Abonnementpläne werden monatlich oder jährlich wie ausgewählt abgerechnet.",
          "Zahlungen werden sicher über unseren Zahlungsanbieter (Stripe) abgewickelt.",
          "Abonnements verlängern sich automatisch, es sei denn, sie werden vor dem Verlängerungsdatum gekündigt.",
          "Rückerstattungen werden gemäß unserer Rückerstattungsrichtlinie behandelt. Kontaktieren Sie uns bei spezifischen Anfragen.",
          "Wir behalten uns das Recht vor, Preise mit angemessener Vorankündigung an Abonnenten zu ändern.",
        ],
      },
      {
        icon: "ban",
        title: "Verbotene Aktivitäten",
        content: [
          "Nutzung des Dienstes für illegale oder nicht autorisierte Zwecke.",
          "Einreichung falscher, irreführender oder betrügerischer Informationen.",
          "Versuch, die ordnungsgemäße Funktion der Website zu stören.",
          "Scraping, Crawling oder Sammeln von Daten ohne Genehmigung.",
          "Sich als andere Person oder Unternehmen ausgeben.",
          "Veröffentlichung von Inhalten, die geistige Eigentumsrechte verletzen.",
        ],
      },
      {
        icon: "shield",
        title: "Geistiges Eigentum",
        content: [
          "Alle Inhalte auf CutiePawsPedia, einschließlich Logos, Text und Design, sind unser geistiges Eigentum.",
          "Sie dürfen ohne schriftliche Genehmigung nicht reproduzieren, verbreiten oder abgeleitete Werke erstellen.",
          "Von Nutzern eingereichte Inhalte bleiben Eigentum der jeweiligen Nutzer.",
          "Angezeigte Marken und Dienstleistungsmarken sind Eigentum ihrer jeweiligen Inhaber.",
        ],
      },
      {
        icon: "alert",
        title: "Haftungsausschlüsse und Einschränkungen",
        content: [
          "CutiePawsPedia wird \"wie besehen\" ohne jegliche Garantien bereitgestellt.",
          "Wir garantieren nicht die Genauigkeit, Vollständigkeit oder Zuverlässigkeit von Unternehmenseinträgen oder Bewertungen.",
          "Wir sind nicht verantwortlich für die Qualität der von gelisteten Unternehmen erbrachten Dienstleistungen.",
          "Unsere Haftung ist auf das gesetzlich zulässige Maximum beschränkt.",
          "Wir haften nicht für indirekte, zufällige oder Folgeschäden.",
        ],
      },
      {
        icon: "scale",
        title: "Anwendbares Recht und Streitigkeiten",
        content: [
          "Diese Bedingungen unterliegen dem Recht der Niederlande.",
          "Streitigkeiten werden durch Verhandlungen in gutem Glauben gelöst.",
          "Scheitern Verhandlungen, können Streitigkeiten den zuständigen Gerichten in den Niederlanden vorgelegt werden.",
          "Sie stimmen zu, eine informelle Streitbeilegung zu versuchen, bevor Sie rechtliche Schritte einleiten.",
        ],
      },
    ],

    contact: {
      title: "Kontakt",
      content: "Wenn Sie Fragen zu diesen Nutzungsbedingungen haben, kontaktieren Sie uns bitte:",
      email: "hello@cutiepawspedia.com",
    },

    termination: {
      title: "Kündigung",
      content: "Wir können Ihren Zugang zu unseren Diensten jederzeit ohne vorherige Ankündigung beenden oder aussetzen, wenn wir der Meinung sind, dass Ihr Verhalten gegen diese Bedingungen verstößt oder für andere Nutzer, uns oder Dritte schädlich ist, oder aus jedem anderen Grund nach unserem alleinigen Ermessen.",
    },
  },
};

const iconMap = {
  usercheck: UserCheck,
  building: Building2,
  message: MessageSquare,
  creditcard: CreditCard,
  ban: Ban,
  shield: ShieldCheck,
  alert: AlertTriangle,
  scale: Scale,
};

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-gradient-to-b from-cpCream to-white dark:from-cpCharcoal dark:to-cpSurface">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-cpAmber/10 text-cpAmber border-cpAmber/20 dark:bg-cpAmber/20 dark:border-cpAmber/30">
              <FileText className="h-3.5 w-3.5 mr-1" />
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
                      <div className="w-10 h-10 rounded-lg bg-cpAmber/10 dark:bg-cpAmber/20 flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-cpAmber" />
                      </div>
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <span className="text-cpAmber mt-1">•</span>
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Termination Section */}
          <Card className="mt-8 border-cpCoral/20 dark:border-cpCoral/30 bg-cpCoral/5 dark:bg-cpCoral/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-foreground">
                <div className="w-10 h-10 rounded-lg bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-cpCoral" />
                </div>
                {t.termination.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t.termination.content}</p>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="mt-6 border-cpAmber/20 dark:border-cpAmber/30 bg-cpAmber/5 dark:bg-cpAmber/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-foreground">
                <div className="w-10 h-10 rounded-lg bg-cpAmber/10 dark:bg-cpAmber/20 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-cpAmber" />
                </div>
                {t.contact.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-3">{t.contact.content}</p>
              <a
                href={`mailto:${t.contact.email}`}
                className="text-cpAmber hover:underline font-medium"
              >
                {t.contact.email}
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
