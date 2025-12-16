/**
 * Safe Food Page: Pindakaas - Honden (Dogs)
 * Type: Veilig voedsel (MET waarschuwing over xylitol)
 * Status: NOINDEX - interne link pagina
 * Locale: nl (Dutch)
 */

import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Info, AlertTriangle } from "lucide-react";
import { FoodGuideBreadcrumb } from "@/components/seo/FoodGuideBreadcrumb";

export const metadata: Metadata = {
  title: "Mag een Hond Pindakaas Eten? | Let Op: Controleer Ingrediënten!",
  description: "Ja, honden mogen pindakaas eten, MAAR alleen zonder xylitol. Xylitol is levensgevaarlijk voor honden. Controleer altijd de ingrediëntenlijst!",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://cutiepawspedia.com/nl/veilige-voeding",
  },
  openGraph: {
    title: "Mag een Hond Pindakaas Eten? | Check Ingrediënten!",
    description: "Ja, honden mogen pindakaas eten, maar alleen zonder xylitol. Controleer altijd de ingrediënten!",
    type: "article",
  },
};

export default function MagHondPindakaasEten() {
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
            currentPage="Pindakaas voor Honden"
          />
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-6 w-6 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-600">Veilig voedsel voor honden</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
            Mag een Hond Pindakaas Eten?
          </h1>

          {/* Quick Answer Box */}
          <div className="bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/40 dark:to-green-900/40 rounded-2xl p-6 border-2 border-emerald-300 dark:border-emerald-700">
            <h2 className="text-xl font-bold text-emerald-800 dark:text-emerald-200 mb-2">
              Ja, maar controleer altijd de ingrediënten!
            </h2>
            <p className="text-emerald-700 dark:text-emerald-300">
              Pindakaas zonder xylitol is veilig en zelfs gezond voor honden. Het is belangrijk om altijd de ingrediëntenlijst te controleren.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">
        <div className="prose prose-lg dark:prose-invert max-w-none">

          {/* CRITICAL WARNING - Xylitol */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-red-100 to-rose-100 dark:from-red-900/40 dark:to-rose-900/40 rounded-2xl p-6 border-2 border-red-400 dark:border-red-700">
              <h2 className="text-xl font-bold text-red-800 dark:text-red-200 mb-4 flex items-center gap-2">
                <AlertTriangle className="h-7 w-7" />
                WAARSCHUWING: Controleer op Xylitol!
              </h2>
              <p className="text-red-700 dark:text-red-300 mb-4 font-semibold">
                Sommige pindakaas bevat xylitol, een kunstmatige zoetstof die EXTREEM giftig is voor honden.
                Zelfs kleine hoeveelheden kunnen dodelijk zijn!
              </p>
              <p className="text-red-700 dark:text-red-300 mb-4">
                Controleer <strong>ALTIJD</strong> de ingrediëntenlijst voordat je pindakaas aan je hond geeft.
                Zie je xylitol, xylose, birch sugar of E967? Geef het dan absoluut niet!
              </p>
              <Link
                href="/nl/is-xylitol-giftig-voor-honden"
                className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Lees meer over xylitol →
              </Link>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-emerald-500" />
              Voordelen van Pindakaas voor Honden
            </h2>

            <div className="grid md:grid-cols-2 gap-4 not-prose">
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Rijk aan eiwitten</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Pindakaas bevat gezonde eiwitten die goed zijn voor spieropbouw.</p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Gezonde vetten</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Bevat onverzadigde vetzuren die goed zijn voor vacht en huid.</p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Ideaal voor training</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Honden zijn dol op pindakaas - perfect als hoogwaardige beloning.</p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Vitaminen en mineralen</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Bevat vitamine E, B-vitamines, niacine en magnesium.</p>
              </div>
            </div>
          </section>

          {/* Tips Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-2">
              <Info className="h-6 w-6 text-blue-500" />
              Tips voor het Voeren van Pindakaas
            </h2>

            <ul className="space-y-3 not-prose">
              <li className="flex items-start gap-3 bg-card dark:bg-cpSurface/50 rounded-lg p-4">
                <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-foreground dark:text-cpCream">Controleer altijd op xylitol in de ingrediëntenlijst</span>
              </li>
              <li className="flex items-start gap-3 bg-card dark:bg-cpSurface/50 rounded-lg p-4">
                <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-foreground dark:text-cpCream">Kies voor natuurlijke pindakaas zonder toegevoegd zout of suiker</span>
              </li>
              <li className="flex items-start gap-3 bg-card dark:bg-cpSurface/50 rounded-lg p-4">
                <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-foreground dark:text-cpCream">Geef met mate - pindakaas is calorierijk (max 1 theelepel per dag)</span>
              </li>
              <li className="flex items-start gap-3 bg-card dark:bg-cpSurface/50 rounded-lg p-4">
                <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-foreground dark:text-cpCream">Gebruik het als beloning of in een Kong speeltje</span>
              </li>
              <li className="flex items-start gap-3 bg-card dark:bg-cpSurface/50 rounded-lg p-4">
                <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-foreground dark:text-cpCream">Let op tekenen van allergie (zeldzaam, maar mogelijk)</span>
              </li>
            </ul>
          </section>

          {/* Warning Box - Link to Toxic Foods */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border-2 border-amber-300 dark:border-amber-700">
              <h2 className="text-xl font-bold text-amber-800 dark:text-amber-200 mb-4 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6" />
                Let op: Deze Voedingsmiddelen zijn Giftig!
              </h2>
              <p className="text-amber-700 dark:text-amber-300 mb-4">
                Naast xylitol zijn er meer voedingsmiddelen die levensgevaarlijk zijn voor honden.
                Weet je wat je hond absoluut NIET mag eten?
              </p>
              <div className="flex flex-wrap gap-2">
                <Link href="/nl/is-xylitol-giftig-voor-honden" className="inline-flex items-center gap-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors">
                  Xylitol (levensgevaarlijk!)
                </Link>
                <Link href="/nl/is-chocolade-giftig-voor-honden" className="inline-flex items-center gap-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors">
                  Chocolade
                </Link>
                <Link href="/nl/is-druiven-giftig-voor-honden" className="inline-flex items-center gap-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors">
                  Druiven
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
