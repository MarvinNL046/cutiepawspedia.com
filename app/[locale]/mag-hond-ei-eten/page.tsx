/**
 * Safe Food Page: Ei - Honden (Dogs)
 * Type: Veilig voedsel
 * Status: NOINDEX - interne link pagina
 * Locale: nl (Dutch)
 */

import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Info, AlertTriangle } from "lucide-react";
import { FoodGuideBreadcrumb } from "@/components/seo/FoodGuideBreadcrumb";

export const metadata: Metadata = {
  title: "Mag een Hond Ei Eten? | Veilig Voedsel voor Honden",
  description: "Ja, honden mogen gekookte eieren eten. Eieren zijn een uitstekende bron van eiwit en essentiële voedingsstoffen voor honden.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://cutiepawspedia.com/nl/veilige-voeding",
  },
  openGraph: {
    title: "Mag een Hond Ei Eten? | Veilig Voedsel",
    description: "Ja, honden mogen gekookte eieren eten. Eieren zijn rijk aan eiwitten en essentiële voedingsstoffen.",
    type: "article",
  },
};

export default function MagHondEiEten() {
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
            currentPage="Ei voor Honden"
          />
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-6 w-6 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-600">Veilig voedsel voor honden</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
            Mag een Hond Ei Eten?
          </h1>

          {/* Quick Answer Box */}
          <div className="bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/40 dark:to-green-900/40 rounded-2xl p-6 border-2 border-emerald-300 dark:border-emerald-700">
            <h2 className="text-xl font-bold text-emerald-800 dark:text-emerald-200 mb-2">
              Ja, gekookte eieren zijn uitstekend voor honden
            </h2>
            <p className="text-emerald-700 dark:text-emerald-300">
              Eieren zijn een volledige eiwitbron met essentiële aminozuren, vitamines en mineralen. Kook ze altijd - rauw eiwit bevat avidin dat biotine-opname blokkeert.
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
              Voordelen van Eieren voor Honden
            </h2>

            <div className="grid md:grid-cols-2 gap-4 not-prose">
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Volledig eiwit</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Bevat alle essentiële aminozuren die je hond nodig heeft voor spiermassa en herstel.</p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Rijk aan vitamines</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Vitamine A, B-vitamines (B12, riboflavine), D en E ondersteunen vele lichaamsfuncties.</p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Essentiële mineralen</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">IJzer, selenium, fosfor en zink voor sterke botten en immuunsysteem.</p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Gezonde vetten</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Omega-3 en omega-6 vetzuren voor een glanzende vacht en gezonde huid.</p>
              </div>
            </div>
          </section>

          {/* Tips Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-2">
              <Info className="h-6 w-6 text-blue-500" />
              Tips voor het Voeren van Eieren
            </h2>

            <ul className="space-y-3 not-prose">
              <li className="flex items-start gap-3 bg-card dark:bg-cpSurface/50 rounded-lg p-4">
                <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-foreground dark:text-cpCream">Kook eieren ALTIJD - rauw eiwit bevat avidin dat biotine blokkeert</span>
              </li>
              <li className="flex items-start gap-3 bg-card dark:bg-cpSurface/50 rounded-lg p-4">
                <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-foreground dark:text-cpCream">Voeg GEEN zout, peper, boter of kruiden toe tijdens het koken</span>
              </li>
              <li className="flex items-start gap-3 bg-card dark:bg-cpSurface/50 rounded-lg p-4">
                <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-foreground dark:text-cpCream">Hardgekookt, roerei of gepocheerd zijn allemaal veilige bereidingswijzen</span>
              </li>
              <li className="flex items-start gap-3 bg-card dark:bg-cpSurface/50 rounded-lg p-4">
                <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-foreground dark:text-cpCream">1 ei per dag voor kleine honden, 2 eieren voor grote honden (max)</span>
              </li>
            </ul>
          </section>

          {/* Warning Box - Link to Toxic Foods */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border-2 border-amber-300 dark:border-amber-700">
              <h2 className="text-xl font-bold text-amber-800 dark:text-amber-200 mb-4 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6" />
                Let op: Niet Alle Voedingsmiddelen zijn Veilig!
              </h2>
              <p className="text-amber-700 dark:text-amber-300 mb-4">
                Hoewel eieren veilig en gezond zijn, zijn bepaalde andere voedingsmiddelen levensgevaarlijk voor honden.
                Weet je welke je hond absoluut NIET mag eten?
              </p>
              <div className="flex flex-wrap gap-2">
                <Link href="/nl/is-ui-giftig-voor-honden" className="inline-flex items-center gap-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors">
                  Ui
                </Link>
                <Link href="/nl/is-knoflook-giftig-voor-honden" className="inline-flex items-center gap-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors">
                  Knoflook
                </Link>
                <Link href="/nl/is-xylitol-giftig-voor-honden" className="inline-flex items-center gap-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors">
                  Xylitol
                </Link>
                <Link href="/nl/is-chocolade-giftig-voor-honden" className="inline-flex items-center gap-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors">
                  Chocolade
                </Link>
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="bg-muted/50 dark:bg-cpSurface/30 rounded-xl p-6 text-sm text-muted-foreground dark:text-cpCream/60">
            <p>
              <strong>Disclaimer:</strong> Deze informatie is bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies.
              Bij twijfel over de voeding van je hond, raadpleeg altijd een dierenarts.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
