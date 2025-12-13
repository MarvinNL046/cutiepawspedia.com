/**
 * SEO Landing Page: Hondenstranden Nederland
 * Pillar: Reizen met Huisdieren
 */

import type { Metadata } from "next";
import { GidsBreadcrumbs } from '@/components/gids';
import Link from "next/link";
import { CheckCircle2, Waves, MapPin, Sun, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Hondenstranden Nederland 2025: complete gids per provincie",
  description: "Ontdek alle hondenstranden in Nederland. Van Zeeland tot Friesland: vind het perfecte strand waar je hond los mag lopen. Inclusief regels en tijden.",
  keywords: "hondenstrand nederland, hond strand, losloop strand hond, hondenstrand zeeland, hondenstrand noordzee",
  openGraph: {
    title: "Hondenstranden Nederland: complete gids per provincie",
    description: "Alle hondenstranden in Nederland op een rij. Vind het perfecte strand voor jou en je hond.",
    type: "article",
  },
};

export default function HondenstrandenNederlandPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 border border-cpCoral/30 mb-6">
            <Waves className="h-4 w-4 text-cpCoral" />
            <span className="text-sm font-medium text-cpCoral">Reizen met Huisdieren</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6 tracking-tight">
            Hondenstranden in Nederland: complete gids per provincie
          </h1>

          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-8 leading-relaxed">
            Een dagje strand met je hond is een feestje! Nederland heeft prachtige hondenstranden waar je viervoeter vrij kan rennen, zwemmen en spelen. Ontdek de beste hondenstranden per provincie, inclusief regels, voorzieningen en seizoenstijden.
          </p>

          {/* Primary CTA */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpCoral/10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                <Sun className="h-6 w-6 text-cpCoral" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">
                  Vakantie bij het strand?
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                  Vind een huisdiervriendelijk vakantiehuis bij een hondenstrand voor de perfecte strandvakantie.
                </p>
                <Button asChild className="bg-cpCoral text-white rounded-xl hover:-translate-y-1 transition-transform">
                  <Link href="/nl/gids/reizen-met-huisdieren/huisdiervriendelijke-vakantiehuizen">
                    Bekijk vakantiehuizen →
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">

        {/* Algemene regels */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Algemene regels voor hondenstranden
          </h2>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 border-l-4 border-cpAmber rounded-r-xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-cpAmber flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">
                  Let op: regels verschillen per gemeente
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  Elke gemeente bepaalt zelf waar en wanneer honden op het strand mogen komen. De meeste stranden hebben deze basisregels:
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-xl">☀️</span> Hoogseizoen (mei-september)
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Vaak alleen voor 10:00 en na 19:00</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Aangelijnd verplicht op drukke stranden</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Aparte hondenstranden beschikbaar</span>
                </li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-xl">🍂</span> Laagseizoen (oktober-april)
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Meestal hele dag toegankelijk</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Vaak losloop toegestaan</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Minder druk, ideaal voor honden</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
            <h3 className="font-semibold text-foreground dark:text-cpCream mb-3">
              Belangrijk om altijd bij je te hebben:
            </h3>
            <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground dark:text-cpCream/80">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span>Poepzakjes (verplicht!)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span>Voldoende water voor je hond</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span>Leiband (ook als losloop mag)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span>Handdoek om zout af te spoelen</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Hondenstranden per provincie */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <MapPin className="h-8 w-8 text-cpCoral" />
            Hondenstranden per provincie
          </h2>

          <div className="space-y-8">
            {/* Zeeland */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-4 flex items-center gap-2">
                <span className="text-3xl">🏖️</span> Zeeland
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                Zeeland heeft de meeste en beste hondenstranden van Nederland met kilometers aan zand.
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-cpCoral pl-4">
                  <h4 className="font-semibold text-foreground dark:text-cpCream mb-1">
                    Domburg - Hondenstrand
                  </h4>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    <strong>Seizoen:</strong> Hele jaar • <strong>Losloop:</strong> Ja (buiten hoogseizoen hele dag) •
                    <strong> Voorzieningen:</strong> Strandpaviljoen, douches, hondenspeeltuin
                  </p>
                </div>
                <div className="border-l-4 border-cpCoral pl-4">
                  <h4 className="font-semibold text-foreground dark:text-cpCream mb-1">
                    Cadzand-Bad - Hondenstrand
                  </h4>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    <strong>Seizoen:</strong> Hele jaar • <strong>Losloop:</strong> Ja •
                    <strong> Voorzieningen:</strong> Hondendouche, grote losloopzone, hondenbar
                  </p>
                </div>
                <div className="border-l-4 border-cpCoral pl-4">
                  <h4 className="font-semibold text-foreground dark:text-cpCream mb-1">
                    Renesse - Hondenstrand
                  </h4>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    <strong>Seizoen:</strong> Hele jaar • <strong>Losloop:</strong> Ja (oktober-april) •
                    <strong> Voorzieningen:</strong> Strandtent, parkeerplaats nabij
                  </p>
                </div>
                <div className="border-l-4 border-cpCoral pl-4">
                  <h4 className="font-semibold text-foreground dark:text-cpCream mb-1">
                    Westenschouwen - Hondenstrand
                  </h4>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    <strong>Seizoen:</strong> Hele jaar • <strong>Losloop:</strong> Ja •
                    <strong> Voorzieningen:</strong> Zeer rustig, ruime losloopzone
                  </p>
                </div>
              </div>
            </div>

            {/* Noord-Holland */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-4 flex items-center gap-2">
                <span className="text-3xl">🌊</span> Noord-Holland
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                Van Texel tot Zandvoort: diverse hondenstranden langs de Noordzeekust.
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-cpCoral pl-4">
                  <h4 className="font-semibold text-foreground dark:text-cpCream mb-1">
                    Texel - Paal 28
                  </h4>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    <strong>Seizoen:</strong> Hele jaar • <strong>Losloop:</strong> Ja •
                    <strong> Voorzieningen:</strong> Speciaal hondeneiland, groot hondenstrand
                  </p>
                </div>
                <div className="border-l-4 border-cpCoral pl-4">
                  <h4 className="font-semibold text-foreground dark:text-cpCream mb-1">
                    Egmond aan Zee - Hondenstrand Noord
                  </h4>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    <strong>Seizoen:</strong> Hele jaar • <strong>Losloop:</strong> Oktober-april •
                    <strong> Voorzieningen:</strong> Hondendouche, parkeren mogelijk
                  </p>
                </div>
                <div className="border-l-4 border-cpCoral pl-4">
                  <h4 className="font-semibold text-foreground dark:text-cpCream mb-1">
                    Zandvoort - Zuidstrand
                  </h4>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    <strong>Seizoen:</strong> Hele jaar • <strong>Losloop:</strong> Winter •
                    <strong> Voorzieningen:</strong> Strandtent, douches
                  </p>
                </div>
              </div>
            </div>

            {/* Zuid-Holland */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-4 flex items-center gap-2">
                <span className="text-3xl">🏄</span> Zuid-Holland
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                Hondenstranden bij populaire badplaatsen zoals Scheveningen en Hoek van Holland.
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-cpCoral pl-4">
                  <h4 className="font-semibold text-foreground dark:text-cpCream mb-1">
                    Scheveningen - Zuiderstrand
                  </h4>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    <strong>Seizoen:</strong> Hele jaar • <strong>Losloop:</strong> Winter •
                    <strong> Voorzieningen:</strong> Grote losloopzone, strandtent
                  </p>
                </div>
                <div className="border-l-4 border-cpCoral pl-4">
                  <h4 className="font-semibold text-foreground dark:text-cpCream mb-1">
                    Kijkduin - Hondenstrand
                  </h4>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    <strong>Seizoen:</strong> Hele jaar • <strong>Losloop:</strong> Oktober-mei •
                    <strong> Voorzieningen:</strong> Ruim strand, minder druk
                  </p>
                </div>
                <div className="border-l-4 border-cpCoral pl-4">
                  <h4 className="font-semibold text-foreground dark:text-cpCream mb-1">
                    Hoek van Holland - Hondenstrand
                  </h4>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    <strong>Seizoen:</strong> Hele jaar • <strong>Losloop:</strong> Ja (bepaalde zones) •
                    <strong> Voorzieningen:</strong> Hondendouche, grote zone
                  </p>
                </div>
              </div>
            </div>

            {/* Friesland */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-4 flex items-center gap-2">
                <span className="text-3xl">⛵</span> Friesland
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                IJsselmeerstranden met vaak rustiger water, ideaal voor honden die nog leren zwemmen.
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-cpCoral pl-4">
                  <h4 className="font-semibold text-foreground dark:text-cpCream mb-1">
                    Makkum - Hondenstrand
                  </h4>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    <strong>Seizoen:</strong> Hele jaar • <strong>Losloop:</strong> Ja •
                    <strong> Voorzieningen:</strong> Rustig water, losloopzone
                  </p>
                </div>
                <div className="border-l-4 border-cpCoral pl-4">
                  <h4 className="font-semibold text-foreground dark:text-cpCream mb-1">
                    Hindeloopen - IJsselmeerstrand
                  </h4>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    <strong>Seizoen:</strong> Hele jaar • <strong>Losloop:</strong> Ja •
                    <strong> Voorzieningen:</strong> Rustig, geschikt voor beginnende zwemmers
                  </p>
                </div>
              </div>
            </div>

            {/* Noord-Brabant */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-4 flex items-center gap-2">
                <span className="text-3xl">🏞️</span> Noord-Brabant
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                Zoetwaterstranden aan meren, vaak wat rustiger dan de Noordzee.
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-cpCoral pl-4">
                  <h4 className="font-semibold text-foreground dark:text-cpCream mb-1">
                    Biesbosch - Hondenstranden
                  </h4>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    <strong>Seizoen:</strong> Hele jaar • <strong>Losloop:</strong> Deels •
                    <strong> Voorzieningen:</strong> Natuurrijk, zoetwaterstrandjes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary CTA */}
        <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/10 dark:from-cpCoral/5 dark:to-cpAmber/5 rounded-2xl p-8 mb-12 border border-cpCoral/20">
          <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
            Hond vies van het strand?
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Vind een professionele trimsalon bij jou in de buurt voor een grondige wasbeurt en verzorging.
          </p>
          <Button asChild variant="outline" className="border-cpCoral text-cpCoral hover:bg-cpCoral hover:text-white rounded-xl">
            <Link href="/nl/netherlands">
              Vind een trimsalon →
            </Link>
          </Button>
        </div>

        {/* Tips */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Tips voor een veilig strandbezoek met je hond
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-cpCoral">1.</span> Spoel je hond af na het zwemmen
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                Zout zeewater droogt de huid van je hond uit en kan irritatie veroorzaken. Spoel je hond goed af met schoon water, vooral tussen de tenen. Veel hondenstranden hebben speciale hondendouches.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-cpCoral">2.</span> Pas op voor oververhitting
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                Honden kunnen snel oververhit raken op het strand. Neem een parasol of windscherm mee voor schaduw. Zorg voor voldoende fris drinkwater en vermijd de heetste uren van de dag (12:00-15:00).
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-cpCoral">3.</span> Leer je hond de terugroep
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                Op drukke hondenstranden is goede terugroep essentieel. Oefen dit vooraf. Laat je hond niet achter speelgoed van anderen aangaan en houd altijd overzicht. Bij twijfel: leiband om.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-cpCoral">4.</span> Let op getijden en stroming
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                Check vooraf de getijden. Bij eb zijn er vaak zandbanken en poelen waar honden heerlijk kunnen spelen. Bij vloed is er sterke stroming - laat je hond dan niet te ver zwemmen. Let vooral op bij muien (gevaarlijke stroming).
              </p>
            </div>
          </div>
        </section>

        {/* Internal links */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Lees ook
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/nl/gids/reizen-met-huisdieren/huisdiervriendelijke-vakantiehuizen"
              className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all group"
            >
              <h3 className="font-semibold text-foreground dark:text-cpCream group-hover:text-cpCoral mb-2">
                🏡 Vakantiehuizen
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Vind een huisdiervriendelijk vakantiehuis bij een hondenstrand →
              </p>
            </Link>

            <Link
              href="/nl/gids/reizen-met-huisdieren/reizen-hond-auto"
              className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all group"
            >
              <h3 className="font-semibold text-foreground dark:text-cpCream group-hover:text-cpCoral mb-2">
                🚗 Veilig reizen
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Tips voor veilig autorijden met je hond naar het strand →
              </p>
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veelgestelde vragen
          </h2>

          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Mag mijn hond overal los op het hondenstrand?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                Dat verschilt per strand. De meeste hondenstranden staan losloop toe buiten het hoogseizoen (oktober-april). In de zomer kunnen er beperkingen gelden. Check altijd de lokale regels vooraf. Honden moeten wel altijd onder controle blijven.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Is zeewater gevaarlijk voor mijn hond?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                Zeewater op zich is niet gevaarlijk, maar honden mogen er niet te veel van binnenkrijgen. Te veel zout water kan maagklachten en diarree veroorzaken. Zorg dat je hond voldoende fris drinkwater heeft zodat hij niet uit zee drinkt. Spoel je hond altijd af na het zwemmen.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Welk seizoen is het beste voor een strandbezoek met hond?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                Het laagseizoen (oktober-april) is ideaal: minder druk, hele dag toegang, vaak losloop toegestaan en geen gevaar voor oververhitting. De lente en herfst zijn perfecte perioden. Vermijd het strand bij extreme hitte in de zomer.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Wat moet ik doen als mijn hond bang is voor de zee?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                Begin rustig en dwing je hond niet. Laat hem eerst aan de rand snuffelen en wennen aan het geluid van de golven. Beloon rustig gedrag. Begin in het laagseizoen als het rustiger is. Sommige honden blijven liever op het droge - dat is ook prima! Niet alle honden hoeven te zwemmen.
              </div>
            </details>
          </div>
        </section>

        {/* Final CTA */}
        <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ontdek alle huisdierservices bij jou in de buurt
          </h3>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            Van trimsalons tot dierenartsen: vind betrouwbare professionals voor je huisdier.
          </p>
          <Button asChild size="lg" className="bg-white text-cpCoral hover:bg-white/90 rounded-xl">
            <Link href="/nl/netherlands">
              Bekijk alle services →
            </Link>
          </Button>
        </div>
      </article>

      {/* Schema.org markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Hondenstranden in Nederland: complete gids per provincie",
            "description": "Alle hondenstranden in Nederland op een rij. Van Zeeland tot Friesland met regels, voorzieningen en seizoenstijden.",
            "author": {
              "@type": "Organization",
              "name": "CutiePawsPedia"
            },
            "publisher": {
              "@type": "Organization",
              "name": "CutiePawsPedia",
              "logo": {
                "@type": "ImageObject",
                "url": "https://cutiepawspedia.com/logo.png"
              }
            },
            "datePublished": "2025-01-15",
            "dateModified": "2025-01-15"
          })
        }}
      />

      <GidsBreadcrumbs
        items={[
          { label: "Reizen met Huisdieren", href: "/nl/gids/reizen-met-huisdieren" },
          { label: "Hondenstranden in Nederland" }
        ]}
      />
    </div>
  );
}
