/**
 * Safe Food Page: Appel - Honden (Dogs)
 * Type: Veilig voedsel (maar pitjes zijn giftig!)
 * Status: NOINDEX - interne link pagina
 * Locale: nl (Dutch)
 */

import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Info, AlertTriangle } from "lucide-react";
import { FoodGuideBreadcrumb } from "@/components/seo/FoodGuideBreadcrumb";

export const metadata: Metadata = {
  title: "Mag een Hond Appel Eten? | Veilig Voedsel voor Honden",
  description: "Ja, honden mogen appel eten, maar zonder pitjes! Appels zijn gezond, maar de pitjes bevatten cyanide. Lees meer over veilig voeren.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://cutiepawspedia.com/nl/veilige-voeding",
  },
  openGraph: {
    title: "Mag een Hond Appel Eten? | Veilig Voedsel",
    description: "Ja, honden mogen appel eten, maar zonder pitjes! Appels zijn gezond, maar de pitjes bevatten cyanide.",
    type: "article",
  },
};

export default function MagHondAppelEten() {
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
            currentPage="Appel voor Honden"
          />
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-6 w-6 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-600">Veilig voedsel voor honden</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
            Mag een Hond Appel Eten?
          </h1>

          {/* Quick Answer Box */}
          <div className="bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/40 dark:to-green-900/40 rounded-2xl p-6 border-2 border-emerald-300 dark:border-emerald-700">
            <h2 className="text-xl font-bold text-emerald-800 dark:text-emerald-200 mb-2">
              Ja, appels zijn veilig voor honden (zonder pitjes!)
            </h2>
            <p className="text-emerald-700 dark:text-emerald-300">
              Appels zijn een gezonde snack voor honden, maar verwijder altijd de pitjes en het klokhuis. Appelpitjes bevatten kleine hoeveelheden cyanide.
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
              Voordelen van Appels voor Honden
            </h2>

            <div className="grid md:grid-cols-2 gap-4 not-prose">
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Rijk aan vitamines</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Bevat vitamine A en C voor een sterk immuunsysteem.</p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Goed voor tanden</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Helpt bij het schoonmaken van tanden en verfrist de adem.</p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Veel vezels</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Ondersteunt gezonde spijsvertering.</p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Laag in vet</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Gezonde snack voor oudere honden.</p>
              </div>
            </div>
          </section>

          {/* Warning Section - Apple Seeds */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-2xl p-6 border-2 border-red-300 dark:border-red-700">
              <h2 className="text-xl font-bold text-red-800 dark:text-red-200 mb-4 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6" />
                Belangrijk: Verwijder Altijd de Pitjes!
              </h2>
              <p className="text-red-700 dark:text-red-300 mb-3">
                <strong>Appelpitjes bevatten amygdaline</strong>, een stof die in het lichaam wordt omgezet in cyanide.
                Hoewel een enkel pitje niet levensgevaarlijk is, kunnen meerdere pitjes schadelijk zijn.
              </p>
              <ul className="text-red-700 dark:text-red-300 space-y-2 list-disc list-inside">
                <li>Verwijder altijd het klokhuis en alle pitjes</li>
                <li>Snijd de appel in veilige stukjes</li>
                <li>Laat je hond nooit een hele appel eten</li>
              </ul>
            </div>
          </section>

          {/* Tips Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-2">
              <Info className="h-6 w-6 text-blue-500" />
              Tips voor het Voeren van Appels
            </h2>

            <ul className="space-y-3 not-prose">
              <li className="flex items-start gap-3 bg-card dark:bg-cpSurface/50 rounded-lg p-4">
                <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-foreground dark:text-cpCream">Was de appel grondig om pesticiden te verwijderen</span>
              </li>
              <li className="flex items-start gap-3 bg-card dark:bg-cpSurface/50 rounded-lg p-4">
                <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-foreground dark:text-cpCream">Verwijder het klokhuis en alle pitjes volledig</span>
              </li>
              <li className="flex items-start gap-3 bg-card dark:bg-cpSurface/50 rounded-lg p-4">
                <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-foreground dark:text-cpCream">Snijd in kleine stukjes voor kleine honden</span>
              </li>
              <li className="flex items-start gap-3 bg-card dark:bg-cpSurface/50 rounded-lg p-4">
                <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-foreground dark:text-cpCream">Geef met mate - te veel appel kan diarree veroorzaken door de suikers</span>
              </li>
            </ul>
          </section>

          {/* Warning Box - Link to Toxic Foods */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border-2 border-amber-300 dark:border-amber-700">
              <h2 className="text-xl font-bold text-amber-800 dark:text-amber-200 mb-4 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6" />
                Let op: Veel Vruchten zijn Gevaarlijk!
              </h2>
              <p className="text-amber-700 dark:text-amber-300 mb-4">
                Hoewel appels (zonder pitjes) veilig zijn, zijn er veel andere voedingsmiddelen die zeer gevaarlijk zijn voor honden.
                Weet je wat je hond absoluut NIET mag eten?
              </p>
              <div className="flex flex-wrap gap-2">
                <Link href="/nl/is-druiven-giftig-voor-honden" className="inline-flex items-center gap-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors">
                  Druiven
                </Link>
                <Link href="/nl/is-chocolade-giftig-voor-honden" className="inline-flex items-center gap-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors">
                  Chocolade
                </Link>
                <Link href="/nl/is-xylitol-giftig-voor-honden" className="inline-flex items-center gap-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors">
                  Xylitol
                </Link>
                <Link href="/nl/is-ui-giftig-voor-honden" className="inline-flex items-center gap-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors">
                  Ui
                </Link>
                <Link href="/nl/is-knoflook-giftig-voor-honden" className="inline-flex items-center gap-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors">
                  Knoflook
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
