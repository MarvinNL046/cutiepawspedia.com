/**
 * Safe Food Page: Tonijn - Katten (Cats)
 * Type: Veilig voedsel (met mate)
 * Status: NOINDEX - interne link pagina
 * Locale: nl (Dutch)
 */

import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Info, AlertTriangle } from "lucide-react";
import { FoodGuideBreadcrumb } from "@/components/seo/FoodGuideBreadcrumb";

export const metadata: Metadata = {
  title: "Mag een Kat Tonijn Eten? | Veilig Voedsel voor Katten",
  description: "Ja, katten mogen tonijn eten, maar met mate. Te veel tonijn kan schadelijk zijn vanwege kwik. Lees meer over veilig tonijn voeren.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://cutiepawspedia.com/nl/veilige-voeding",
  },
  openGraph: {
    title: "Mag een Kat Tonijn Eten? | Veilig Voedsel",
    description: "Ja, katten mogen tonijn eten, maar met mate. Te veel tonijn kan schadelijk zijn vanwege kwik.",
    type: "article",
  },
};

export default function MagKatTonijnEten() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Hero Section - Green/Safe */}
      <section className="bg-gradient-to-b from-emerald-50 via-emerald-50/50 to-transparent dark:from-emerald-950/30 dark:via-emerald-950/10 dark:to-transparent border-b border-border dark:border-emerald-800/30">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <FoodGuideBreadcrumb
            items={[
              { name: "Voedselgids", href: "/nl/voedselgids" },
              { name: "Veilige Voeding", href: "/nl/veilige-voeding" },
            ]}
            currentPage="Tonijn voor Katten"
          />
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-6 w-6 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-600">Veilig voedsel voor katten (met mate)</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
            Mag een Kat Tonijn Eten?
          </h1>

          {/* Quick Answer Box */}
          <div className="bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/40 dark:to-green-900/40 rounded-2xl p-6 border-2 border-emerald-300 dark:border-emerald-700">
            <h2 className="text-xl font-bold text-emerald-800 dark:text-emerald-200 mb-2">
              Ja, tonijn is veilig voor katten - maar met mate
            </h2>
            <p className="text-emerald-700 dark:text-emerald-300">
              Tonijn is veilig voor katten als occasionele traktatie, maar mag geen dagelijks voedsel zijn. Te veel tonijn kan leiden tot kwikvergiftiging en voedingstekorten.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">
        <div className="prose prose-lg dark:prose-invert max-w-none">

          {/* Benefits Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-emerald-500" />
              Voordelen van Tonijn voor Katten
            </h2>

            <div className="grid md:grid-cols-2 gap-4 not-prose">
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Rijk aan eiwitten</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Tonijn bevat hoogwaardige eiwitten die katten nodig hebben.</p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Omega-3 vetzuren</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Goed voor de vacht, huid en gewrichten van je kat.</p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Smakelijke traktatie</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Katten zijn dol op de smaak van tonijn.</p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Vocht toevoegen</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Tonijn op water kan helpen bij vochtinname.</p>
              </div>
            </div>
          </section>

          {/* Warning Section - Important! */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border-2 border-amber-300 dark:border-amber-700">
              <h2 className="text-xl font-bold text-amber-800 dark:text-amber-200 mb-4 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6" />
                Waarschuwing: Te Veel Tonijn is Ongezond!
              </h2>
              <div className="space-y-3 text-amber-700 dark:text-amber-300">
                <p className="font-semibold">
                  Hoewel tonijn veilig is, zijn er belangrijke risico's bij te veel consumptie:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">•</span>
                    <span><strong>Kwikvergiftiging:</strong> Tonijn bevat kwik, dat zich ophoopt in het lichaam</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">•</span>
                    <span><strong>Voedingstekorten:</strong> Tonijn bevat niet alle voedingsstoffen die katten nodig hebben</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">•</span>
                    <span><strong>Verslaving:</strong> Katten kunnen "verslaafd" raken aan tonijn en ander voedsel weigeren</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">•</span>
                    <span><strong>Teveel vitamine E:</strong> Kan leiden tot yellow fat disease bij overmatig gebruik</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Tips Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-2">
              <Info className="h-6 w-6 text-blue-500" />
              Tips voor Veilig Tonijn Voeren
            </h2>

            <ul className="space-y-3 not-prose">
              <li className="flex items-start gap-3 bg-card dark:bg-cpSurface/50 rounded-lg p-4">
                <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-foreground dark:text-cpCream">Geef tonijn alleen als occasionele traktatie, maximaal 1-2 keer per week</span>
              </li>
              <li className="flex items-start gap-3 bg-card dark:bg-cpSurface/50 rounded-lg p-4">
                <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-foreground dark:text-cpCream">Kies voor tonijn op water, niet op olie of met zout</span>
              </li>
              <li className="flex items-start gap-3 bg-card dark:bg-cpSurface/50 rounded-lg p-4">
                <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-foreground dark:text-cpCream">Geef kleine hoeveelheden (1 eetlepel per keer)</span>
              </li>
              <li className="flex items-start gap-3 bg-card dark:bg-cpSurface/50 rounded-lg p-4">
                <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-foreground dark:text-cpCream">Vervang nooit volledig kattenvoer door tonijn - dit leidt tot tekorten</span>
              </li>
              <li className="flex items-start gap-3 bg-card dark:bg-cpSurface/50 rounded-lg p-4">
                <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-foreground dark:text-cpCream">Kies specifiek kattenvoer met tonijn als je regelmatig tonijn wilt geven</span>
              </li>
            </ul>
          </section>

          {/* Warning Box - Link to Toxic Foods */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-2xl p-6 border-2 border-red-300 dark:border-red-700">
              <h2 className="text-xl font-bold text-red-800 dark:text-red-200 mb-4 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6" />
                Gevaar: Deze Voedingsmiddelen Zijn Giftig voor Katten!
              </h2>
              <p className="text-red-700 dark:text-red-300 mb-4">
                Hoewel tonijn met mate veilig is, zijn er voedingsmiddelen die levensgevaarlijk zijn voor katten.
                Weet je wat je kat absoluut NOOIT mag eten?
              </p>
              <div className="flex flex-wrap gap-2">
                <Link href="/nl/is-lelie-giftig-voor-katten" className="inline-flex items-center gap-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors">
                  Lelie (dodelijk!)
                </Link>
                <Link href="/nl/is-paracetamol-giftig-voor-katten" className="inline-flex items-center gap-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors">
                  Paracetamol (dodelijk!)
                </Link>
                <Link href="/nl/is-ui-giftig-voor-katten" className="inline-flex items-center gap-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors">
                  Ui
                </Link>
                <Link href="/nl/is-knoflook-giftig-voor-katten" className="inline-flex items-center gap-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors">
                  Knoflook
                </Link>
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="bg-muted/50 dark:bg-cpSurface/30 rounded-xl p-6 text-sm text-muted-foreground dark:text-cpCream/60">
            <p>
              <strong>Disclaimer:</strong> Deze informatie is bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies.
              Bij twijfel over de voeding van je kat, raadpleeg altijd een dierenarts.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
