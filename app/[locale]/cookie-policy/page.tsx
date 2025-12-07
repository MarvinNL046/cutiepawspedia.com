/**
 * Cookie Policy Page
 *
 * CACHING STRATEGY: Force Static
 * - Legal content rarely changes
 * - revalidate: 86400 (24 hours)
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cookie, Settings, BarChart3, Target, Shield, Mail } from "lucide-react";

export const dynamic = "force-static";
export const revalidate = 86400;

interface CookiePolicyPageProps {
  params: Promise<{ locale: string }>;
}

const translations = {
  en: {
    badge: "Cookie Policy",
    title: "Cookie Policy",
    lastUpdated: "Last updated",
    date: "December 7, 2024",
    intro: "This Cookie Policy explains how CutiePawsPedia uses cookies and similar tracking technologies when you visit our website. By using our website, you consent to the use of cookies as described in this policy.",

    whatAreCookies: {
      title: "What Are Cookies?",
      content: "Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners. Cookies help us remember your preferences, understand how you use our site, and improve your overall experience.",
    },

    sections: [
      {
        icon: "settings",
        title: "Essential Cookies",
        description: "Required for the website to function properly",
        required: true,
        cookies: [
          {
            name: "session",
            purpose: "Maintains your logged-in state and session information",
            duration: "Session",
          },
          {
            name: "csrf_token",
            purpose: "Protects against cross-site request forgery attacks",
            duration: "Session",
          },
          {
            name: "locale",
            purpose: "Remembers your language preference",
            duration: "1 year",
          },
          {
            name: "cookie_consent",
            purpose: "Stores your cookie consent preferences",
            duration: "1 year",
          },
        ],
      },
      {
        icon: "chart",
        title: "Analytics Cookies",
        description: "Help us understand how visitors interact with our website",
        required: false,
        cookies: [
          {
            name: "Plausible Analytics",
            purpose: "Privacy-friendly analytics to understand site usage",
            duration: "Session",
          },
        ],
      },
      {
        icon: "target",
        title: "Marketing Cookies",
        description: "Used to deliver relevant advertisements",
        required: false,
        cookies: [
          {
            name: "Google AdSense",
            purpose: "Displays personalized advertisements based on your interests",
            duration: "Varies",
          },
        ],
      },
    ],

    manageCookies: {
      title: "Managing Your Cookie Preferences",
      content: [
        "You can control and manage cookies in various ways:",
        "**Browser Settings**: Most browsers allow you to refuse or accept cookies, delete existing cookies, and set preferences for certain websites.",
        "**Cookie Consent Banner**: When you first visit our site, you can choose which types of cookies to accept through our consent banner.",
        "**Opt-Out Links**: For third-party cookies like Google AdSense, you can opt out through their respective privacy settings.",
      ],
      warning: "Please note that disabling certain cookies may affect the functionality of our website.",
    },

    thirdParty: {
      title: "Third-Party Cookies",
      content: "Some cookies are placed by third-party services that appear on our pages. We do not control these cookies. The third-party providers we work with include:",
      providers: [
        { name: "Google AdSense", purpose: "Advertising", link: "https://policies.google.com/privacy" },
        { name: "Plausible Analytics", purpose: "Analytics", link: "https://plausible.io/privacy" },
        { name: "StackAuth", purpose: "Authentication", link: "https://stack-auth.com/privacy" },
      ],
    },

    contact: {
      title: "Contact Us",
      content: "If you have questions about our use of cookies, please contact us:",
      email: "hello@cutiepawspedia.com",
    },

    changes: {
      title: "Changes to This Policy",
      content: "We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the \"Last updated\" date.",
    },
  },
  nl: {
    badge: "Cookiebeleid",
    title: "Cookiebeleid",
    lastUpdated: "Laatst bijgewerkt",
    date: "7 december 2024",
    intro: "Dit Cookiebeleid legt uit hoe CutiePawsPedia cookies en vergelijkbare trackingtechnologieën gebruikt wanneer u onze website bezoekt. Door onze website te gebruiken, stemt u in met het gebruik van cookies zoals beschreven in dit beleid.",

    whatAreCookies: {
      title: "Wat Zijn Cookies?",
      content: "Cookies zijn kleine tekstbestanden die op uw apparaat worden geplaatst wanneer u een website bezoekt. Ze worden veel gebruikt om websites efficiënter te laten werken en informatie te verstrekken aan website-eigenaren. Cookies helpen ons uw voorkeuren te onthouden, te begrijpen hoe u onze site gebruikt en uw algehele ervaring te verbeteren.",
    },

    sections: [
      {
        icon: "settings",
        title: "Essentiële Cookies",
        description: "Vereist voor het correct functioneren van de website",
        required: true,
        cookies: [
          {
            name: "session",
            purpose: "Behoudt uw ingelogde status en sessie-informatie",
            duration: "Sessie",
          },
          {
            name: "csrf_token",
            purpose: "Beschermt tegen cross-site request forgery-aanvallen",
            duration: "Sessie",
          },
          {
            name: "locale",
            purpose: "Onthoudt uw taalvoorkeur",
            duration: "1 jaar",
          },
          {
            name: "cookie_consent",
            purpose: "Slaat uw cookietoestemmingsvoorkeuren op",
            duration: "1 jaar",
          },
        ],
      },
      {
        icon: "chart",
        title: "Analytische Cookies",
        description: "Helpen ons te begrijpen hoe bezoekers met onze website interacteren",
        required: false,
        cookies: [
          {
            name: "Plausible Analytics",
            purpose: "Privacyvriendelijke analytics om sitegebruik te begrijpen",
            duration: "Sessie",
          },
        ],
      },
      {
        icon: "target",
        title: "Marketing Cookies",
        description: "Worden gebruikt om relevante advertenties te leveren",
        required: false,
        cookies: [
          {
            name: "Google AdSense",
            purpose: "Toont gepersonaliseerde advertenties op basis van uw interesses",
            duration: "Varieert",
          },
        ],
      },
    ],

    manageCookies: {
      title: "Uw Cookievoorkeuren Beheren",
      content: [
        "U kunt cookies op verschillende manieren beheren en controleren:",
        "**Browserinstellingen**: De meeste browsers stellen u in staat om cookies te weigeren of te accepteren, bestaande cookies te verwijderen en voorkeuren in te stellen voor bepaalde websites.",
        "**Cookietoestemmingsbanner**: Wanneer u onze site voor het eerst bezoekt, kunt u via onze toestemmingsbanner kiezen welke soorten cookies u accepteert.",
        "**Opt-out Links**: Voor cookies van derden zoals Google AdSense kunt u zich afmelden via hun respectievelijke privacy-instellingen.",
      ],
      warning: "Houd er rekening mee dat het uitschakelen van bepaalde cookies de functionaliteit van onze website kan beïnvloeden.",
    },

    thirdParty: {
      title: "Cookies van Derden",
      content: "Sommige cookies worden geplaatst door diensten van derden die op onze pagina's verschijnen. Wij hebben geen controle over deze cookies. De externe providers waarmee we samenwerken zijn onder andere:",
      providers: [
        { name: "Google AdSense", purpose: "Adverteren", link: "https://policies.google.com/privacy" },
        { name: "Plausible Analytics", purpose: "Analytics", link: "https://plausible.io/privacy" },
        { name: "StackAuth", purpose: "Authenticatie", link: "https://stack-auth.com/privacy" },
      ],
    },

    contact: {
      title: "Contact",
      content: "Als u vragen heeft over ons gebruik van cookies, neem dan contact met ons op:",
      email: "hello@cutiepawspedia.com",
    },

    changes: {
      title: "Wijzigingen in Dit Beleid",
      content: "We kunnen dit Cookiebeleid van tijd tot tijd bijwerken. We zullen u op de hoogte stellen van eventuele wijzigingen door het nieuwe beleid op deze pagina te plaatsen en de datum \"Laatst bijgewerkt\" bij te werken.",
    },
  },
  de: {
    badge: "Cookie-Richtlinie",
    title: "Cookie-Richtlinie",
    lastUpdated: "Zuletzt aktualisiert",
    date: "7. Dezember 2024",
    intro: "Diese Cookie-Richtlinie erklärt, wie CutiePawsPedia Cookies und ähnliche Tracking-Technologien verwendet, wenn Sie unsere Website besuchen. Durch die Nutzung unserer Website stimmen Sie der Verwendung von Cookies wie in dieser Richtlinie beschrieben zu.",

    whatAreCookies: {
      title: "Was Sind Cookies?",
      content: "Cookies sind kleine Textdateien, die auf Ihrem Gerät platziert werden, wenn Sie eine Website besuchen. Sie werden häufig verwendet, um Websites effizienter zu gestalten und Informationen an Website-Betreiber zu liefern. Cookies helfen uns, Ihre Präferenzen zu speichern, zu verstehen, wie Sie unsere Website nutzen, und Ihre Gesamterfahrung zu verbessern.",
    },

    sections: [
      {
        icon: "settings",
        title: "Essentielle Cookies",
        description: "Erforderlich für das ordnungsgemäße Funktionieren der Website",
        required: true,
        cookies: [
          {
            name: "session",
            purpose: "Erhält Ihren Anmeldestatus und Sitzungsinformationen",
            duration: "Sitzung",
          },
          {
            name: "csrf_token",
            purpose: "Schützt vor Cross-Site-Request-Forgery-Angriffen",
            duration: "Sitzung",
          },
          {
            name: "locale",
            purpose: "Speichert Ihre Sprachpräferenz",
            duration: "1 Jahr",
          },
          {
            name: "cookie_consent",
            purpose: "Speichert Ihre Cookie-Einwilligungseinstellungen",
            duration: "1 Jahr",
          },
        ],
      },
      {
        icon: "chart",
        title: "Analytische Cookies",
        description: "Helfen uns zu verstehen, wie Besucher mit unserer Website interagieren",
        required: false,
        cookies: [
          {
            name: "Plausible Analytics",
            purpose: "Datenschutzfreundliche Analysen zur Nutzung der Website",
            duration: "Sitzung",
          },
        ],
      },
      {
        icon: "target",
        title: "Marketing-Cookies",
        description: "Werden verwendet, um relevante Werbung zu liefern",
        required: false,
        cookies: [
          {
            name: "Google AdSense",
            purpose: "Zeigt personalisierte Werbung basierend auf Ihren Interessen",
            duration: "Variiert",
          },
        ],
      },
    ],

    manageCookies: {
      title: "Ihre Cookie-Einstellungen Verwalten",
      content: [
        "Sie können Cookies auf verschiedene Weise steuern und verwalten:",
        "**Browser-Einstellungen**: Die meisten Browser ermöglichen es Ihnen, Cookies abzulehnen oder zu akzeptieren, vorhandene Cookies zu löschen und Präferenzen für bestimmte Websites festzulegen.",
        "**Cookie-Einwilligungsbanner**: Bei Ihrem ersten Besuch auf unserer Website können Sie über unser Einwilligungsbanner wählen, welche Arten von Cookies Sie akzeptieren.",
        "**Opt-Out-Links**: Für Drittanbieter-Cookies wie Google AdSense können Sie sich über deren jeweilige Datenschutzeinstellungen abmelden.",
      ],
      warning: "Bitte beachten Sie, dass das Deaktivieren bestimmter Cookies die Funktionalität unserer Website beeinträchtigen kann.",
    },

    thirdParty: {
      title: "Cookies von Drittanbietern",
      content: "Einige Cookies werden von Drittanbieterdiensten gesetzt, die auf unseren Seiten erscheinen. Wir haben keine Kontrolle über diese Cookies. Die Drittanbieter, mit denen wir zusammenarbeiten, sind:",
      providers: [
        { name: "Google AdSense", purpose: "Werbung", link: "https://policies.google.com/privacy" },
        { name: "Plausible Analytics", purpose: "Analysen", link: "https://plausible.io/privacy" },
        { name: "StackAuth", purpose: "Authentifizierung", link: "https://stack-auth.com/privacy" },
      ],
    },

    contact: {
      title: "Kontakt",
      content: "Wenn Sie Fragen zu unserer Verwendung von Cookies haben, kontaktieren Sie uns bitte:",
      email: "hello@cutiepawspedia.com",
    },

    changes: {
      title: "Änderungen dieser Richtlinie",
      content: "Wir können diese Cookie-Richtlinie von Zeit zu Zeit aktualisieren. Wir werden Sie über Änderungen informieren, indem wir die neue Richtlinie auf dieser Seite veröffentlichen und das Datum \"Zuletzt aktualisiert\" aktualisieren.",
    },
  },
};

const iconMap = {
  settings: Settings,
  chart: BarChart3,
  target: Target,
};

export default async function CookiePolicyPage({ params }: CookiePolicyPageProps) {
  const { locale } = await params;
  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-gradient-to-b from-cpCream to-white dark:from-cpCharcoal dark:to-cpSurface">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-cpCoral/10 text-cpCoral border-cpCoral/20 dark:bg-cpCoral/20 dark:border-cpCoral/30">
              <Cookie className="h-3.5 w-3.5 mr-1" />
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

          {/* What Are Cookies */}
          <Card className="mb-8 border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-foreground">
                <div className="w-10 h-10 rounded-lg bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center">
                  <Cookie className="h-5 w-5 text-cpCoral" />
                </div>
                {t.whatAreCookies.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t.whatAreCookies.content}</p>
            </CardContent>
          </Card>

          {/* Cookie Types */}
          <div className="space-y-6 mb-8">
            {t.sections.map((section, index) => {
              const IconComponent = iconMap[section.icon as keyof typeof iconMap];
              return (
                <Card key={index} className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-foreground">
                        <div className="w-10 h-10 rounded-lg bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center">
                          <IconComponent className="h-5 w-5 text-cpCoral" />
                        </div>
                        <div>
                          <span>{section.title}</span>
                          <p className="text-sm font-normal text-muted-foreground mt-0.5">
                            {section.description}
                          </p>
                        </div>
                      </div>
                      {section.required ? (
                        <Badge variant="secondary" className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                          Required
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">
                          Optional
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 px-3 text-foreground font-medium">Cookie</th>
                            <th className="text-left py-2 px-3 text-foreground font-medium">Purpose</th>
                            <th className="text-left py-2 px-3 text-foreground font-medium">Duration</th>
                          </tr>
                        </thead>
                        <tbody>
                          {section.cookies.map((cookie, cookieIndex) => (
                            <tr key={cookieIndex} className="border-b border-border/50 last:border-0">
                              <td className="py-2 px-3 font-mono text-xs text-cpCoral">{cookie.name}</td>
                              <td className="py-2 px-3 text-muted-foreground">{cookie.purpose}</td>
                              <td className="py-2 px-3 text-muted-foreground whitespace-nowrap">{cookie.duration}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Managing Cookies */}
          <Card className="mb-8 border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-foreground">
                <div className="w-10 h-10 rounded-lg bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center">
                  <Settings className="h-5 w-5 text-cpCoral" />
                </div>
                {t.manageCookies.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-4">
                {t.manageCookies.content.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-cpCoral mt-1">•</span>
                    <span
                      className="text-muted-foreground"
                      dangerouslySetInnerHTML={{
                        __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
                      }}
                    />
                  </li>
                ))}
              </ul>
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800/30">
                <p className="text-amber-800 dark:text-amber-200 text-sm flex items-start gap-2">
                  <Shield className="h-4 w-4 mt-0.5 shrink-0" />
                  {t.manageCookies.warning}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Third Party Cookies */}
          <Card className="mb-8 border-border bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">{t.thirdParty.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{t.thirdParty.content}</p>
              <div className="space-y-2">
                {t.thirdParty.providers.map((provider, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <span className="font-medium text-foreground">{provider.name}</span>
                      <span className="text-muted-foreground ml-2">({provider.purpose})</span>
                    </div>
                    <a
                      href={provider.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cpCoral hover:underline text-sm"
                    >
                      Privacy Policy →
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

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
