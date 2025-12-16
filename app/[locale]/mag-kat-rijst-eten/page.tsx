/**
 * Safe Food Page: Rijst - Katten (Cats)
 * Type: Veilig voedsel
 * Status: NOINDEX - interne link pagina
 * Locale: nl (Dutch)
 */

import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Info, AlertTriangle } from "lucide-react";
import { FoodGuideBreadcrumb } from "@/components/seo/FoodGuideBreadcrumb";

export const metadata: Metadata = {
  title: "Mag een Kat Rijst Eten? | Veilig Voedsel voor Katten",
  description: "Ja, katten mogen rijst eten. Gekookte rijst is veilig en wordt vaak aanbevolen bij maagklachten. Lees meer over de voordelen en tips.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://cutiepawspedia.com/nl/veilige-voeding",
  },
  openGraph: {
    title: "Mag een Kat Rijst Eten? | Veilig Voedsel",
    description: "Ja, katten mogen rijst eten. Gekookte rijst is veilig en wordt vaak aanbevolen bij maagklachten.",
    type: "article",
  },
};

export default function MagKatRijstEten() {
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
            currentPage="Rijst voor Katten"
          />
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-6 w-6 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-600">Veilig voedsel voor katten</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
            Mag een Kat Rijst Eten?
          </h1>

          {/* Quick Answer Box */}
          <div className="bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/40 dark:to-green-900/40 rounded-2xl p-6 border-2 border-emerald-300 dark:border-emerald-700">
            <h2 className="text-xl font-bold text-emerald-800 dark:text-emerald-200 mb-2">
              Ja, gekookte rijst is veilig voor katten in kleine hoeveelheden
            </h2>
            <p className="text-emerald-700 dark:text-emerald-300">
              Rijst is een veilig voedsel voor katten en wordt vaak aanbevolen bij maagklachten. Let op: katten zijn carnivoren en hebben vooral eiwit nodig.
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
              Voordelen van Rijst voor Katten
            </h2>

            <div className="grid md:grid-cols-2 gap-4 not-prose">
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Gemakkelijk te verteren</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Rijst is zacht voor de maag en ideaal bij diarree of maagklachten.</p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Goed voor maagklachten</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Dierenartsen bevelen rijst aan als onderdeel van een bland dieet.</p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Weinig allergenen</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Rijst veroorzaakt zelden allergische reacties bij katten.</p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Energiebron</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Koolhydraten in rijst geven energie als tijdelijk supplement.</p>
              </div>
            </div>
          </section>

          {/* Tips Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-2">
              <Info className="h-6 w-6 text-blue-500" />
              Tips voor het Voeren van Rijst
            </h2>

            <ul className="space-y-3 not-prose">
              <li className="flex items-start gap-3 bg-card dark:bg-cpSurface/50 rounded-lg p-4">
                <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-foreground dark:text-cpCream">Kook de rijst goed door zonder zout of kruiden</span>
              </li>
              <li className="flex items-start gap-3 bg-card dark:bg-cpSurface/50 rounded-lg p-4">
                <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-foreground dark:text-cpCream">Witte rijst is makkelijker verteerbaar dan bruine rijst</span>
              </li>
              <li className="flex items-start gap-3 bg-card dark:bg-cpSurface/50 rounded-lg p-4">
                <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-foreground dark:text-cpCream">Rijst is geen volledig voedsel - katten hebben vooral eiwit nodig</span>
              </li>
              <li className="flex items-start gap-3 bg-card dark:bg-cpSurface/50 rounded-lg p-4">
                <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-foreground dark:text-cpCream">Geef met mate als supplement, niet als hoofdvoeding</span>
              </li>
            </ul>
          </section>

          {/* Warning Box - Link to Toxic Foods */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border-2 border-amber-300 dark:border-amber-700">
              <h2 className="text-xl font-bold text-amber-800 dark:text-amber-200 mb-4 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6" />
                Let op: Niet Alle Voedsel is Veilig!
              </h2>
              <p className="text-amber-700 dark:text-amber-300 mb-4">
                Hoewel rijst veilig is, zijn bepaalde voedingsmiddelen levensgevaarlijk voor katten.
                Weet je welke voeding je kat absoluut NIET mag eten?
              </p>
              <div className="flex flex-wrap gap-2">
                <Link href="/nl/is-chocolade-giftig-voor-katten" className="inline-flex items-center gap-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors">
                  Chocolade
                </Link>
                <Link href="/nl/is-ui-giftig-voor-katten" className="inline-flex items-center gap-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors">
                  Ui
                </Link>
                <Link href="/nl/is-knoflook-giftig-voor-katten" className="inline-flex items-center gap-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors">
                  Knoflook
                </Link>
                <Link href="/nl/is-lelie-giftig-voor-katten" className="inline-flex items-center gap-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors">
                  Lelie
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
