/**
 * SEO Landing Page: Vlooien en teken bij huisdieren
 * Pillar: Dierengezondheid (Pet Health)
 * Target: Dutch pet owners seeking parasite prevention information
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Bug, Shield, AlertTriangle, Calendar, Droplets } from "lucide-react";

export const metadata: Metadata = {
  title: "Vlooien en Teken bij Huisdieren: Preventie en Behandeling 2025",
  description: "Effectieve preventie en behandeling van vlooien en teken bij honden en katten. Ontdek de beste middelen, wanneer te behandelen en hoe besmetting te voorkomen.",
  keywords: [
    "vlooien hond",
    "teken kat",
    "vlooienbestrijding",
    "tekenbestrijding",
    "parasietenpreventie",
    "vlooienmiddel",
    "tekenmiddel",
    "bravecto",
    "frontline",
    "vlooien verwijderen"
  ],
  openGraph: {
    title: "Vlooien en Teken bij Huisdieren: Preventie en Behandeling",
    description: "Complete gids voor het voorkomen en behandelen van vlooien en teken bij honden en katten.",
    type: "article",
  },
};

export default function VlooienTekenPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent dark:to-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="flex items-center gap-2 mb-4">
            <Bug className="h-6 w-6 text-cpCoral" />
            <span className="text-sm font-medium text-cpCoral">Dierengezondheid</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-4">
            Vlooien en Teken bij Huisdieren: Preventie en Behandeling
          </h1>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6">
            Vlooien en teken zijn vervelende parasieten die je hond of kat ziek kunnen maken. Leer hoe je ze herkent, voorkomt en effectief behandelt.
          </p>

          {/* Primary CTA */}
          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 border border-cpCoral/30 dark:border-cpCoral/20 rounded-2xl p-6 mb-6">
            <p className="text-foreground dark:text-cpCream mb-3 font-medium">
              🐾 Hulp nodig bij vlooien of teken?
            </p>
            <Button
              asChild
              size="lg"
              className="bg-cpCoral text-white hover:bg-cpCoral/90 rounded-xl w-full md:w-auto"
            >
              <Link href="/nl/netherlands">
                Vind een dierenarts bij jou in de buurt →
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">
        {/* Introduction */}
        <section className="mb-12">
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Vlooien en teken zijn externe parasieten die het hele jaar door kunnen voorkomen, maar vooral actief zijn van maart tot november. Ze kunnen niet alleen voor jeuk en ongemak zorgen, maar ook ernstige ziektes overbrengen zoals de ziekte van Lyme, babesiose en vlooienbandallergie.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Preventie is beter dan genezen: met de juiste maatregelen en behandeling kun je je hond of kat het hele jaar door beschermen tegen deze vervelende parasieten.
          </p>
        </section>

        {/* Vlooien Herkennen */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Bug className="h-7 w-7 text-cpCoral" />
            Vlooien Herkennen en Symptomen
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-4">Hoe zie je vlooien?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Kleine, bruine insecten die snel door de vacht bewegen (2-3mm)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Zwarte 'korreltjes' in de vacht (vlooienpoep)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Vooral actief bij de staartaanzet, nek en oksels</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Gebruik een vlooienkam over wit papier om te controleren</span>
                </li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-4">Symptomen van vlooien</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <AlertTriangle className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
                  <span>Overmatig krabben, bijten en likken</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <AlertTriangle className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
                  <span>Kale plekken, vooral bij staartaanzet</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <AlertTriangle className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
                  <span>Huidirritatie, rode bultjes, korst</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <AlertTriangle className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
                  <span>Bloedarmoede bij ernstige besmetting (vooral bij jonge dieren)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl border border-cpCoral/30 dark:border-cpCoral/20 p-4">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              <strong>Belangrijk:</strong> Voor elke vlo die je ziet, leven er 95-100 vlooien in verschillende levensstadia in je huis (eieren, larven, poppen). Behandel daarom altijd ook de omgeving!
            </p>
          </div>
        </section>

        {/* Teken Herkennen */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Shield className="h-7 w-7 text-cpCoral" />
            Teken Herkennen en Gevaren
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-4">Hoe zie je teken?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Klein, plat insect (2-3mm) met 8 poten - wordt groter na bloedzuigen</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Voelt als klein bultje in de vacht</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Vaak te vinden rond kop, oren, nek en tussen tenen</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Controleer je huisdier dagelijks na wandelingen in natuur</span>
                </li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-4">Ziektes overgebracht door teken</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <AlertTriangle className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
                  <span><strong>Ziekte van Lyme (Borreliose):</strong> koorts, kreupelheid, gewrichtspijn</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <AlertTriangle className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
                  <span><strong>Babesiose:</strong> bloedarmoede, koorts, lusteloosheid</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <AlertTriangle className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
                  <span><strong>Anaplasmose:</strong> koorts, braken, diarree</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <AlertTriangle className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
                  <span><strong>Ehrlichiose:</strong> bloedplaatjes daling, bloedingen</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-4 mb-6">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
              <span><strong>Let op:</strong> Verwijder teken binnen 24 uur om de kans op ziekteoverbrenging te minimaliseren. Draai de teek niet, maar trek rustig en recht omhoog met een tekentang.</span>
            </p>
          </div>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
            <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-4">Hoe verwijder je een teek veilig?</h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-foreground dark:text-cpCream/90">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cpCoral/20 dark:bg-cpCoral/10 flex items-center justify-center text-cpCoral font-bold text-xs">1</span>
                <span>Gebruik een speciale tekentang of tekenhaak (verkrijgbaar bij dierenarts of dierenwinkel)</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-foreground dark:text-cpCream/90">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cpCoral/20 dark:bg-cpCoral/10 flex items-center justify-center text-cpCoral font-bold text-xs">2</span>
                <span>Grijp de teek zo dicht mogelijk bij de huid (niet in het lijf knijpen!)</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-foreground dark:text-cpCream/90">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cpCoral/20 dark:bg-cpCoral/10 flex items-center justify-center text-cpCoral font-bold text-xs">3</span>
                <span>Trek rustig en recht omhoog zonder te draaien</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-foreground dark:text-cpCream/90">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cpCoral/20 dark:bg-cpCoral/10 flex items-center justify-center text-cpCoral font-bold text-xs">4</span>
                <span>Controleer of de kop mee is gekomen (zwart puntje)</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-foreground dark:text-cpCream/90">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cpCoral/20 dark:bg-cpCoral/10 flex items-center justify-center text-cpCoral font-bold text-xs">5</span>
                <span>Desinfecteer de bijtwond en houd deze 2-3 weken in de gaten</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Hulp Nodig bij Parasieten?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Vind een dierenarts in jouw regio voor effectieve vlooien- en tekenbestrijding.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-cpCoral hover:bg-white/90 rounded-xl"
            >
              <Link href="/nl/netherlands">
                Bekijk dierenklinieken in jouw stad →
              </Link>
            </Button>
          </div>
        </section>

        {/* Preventie */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Shield className="h-7 w-7 text-cpCoral" />
            Preventie: De Beste Bescherming
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Preventie is effectiever en goedkoper dan behandeling. Hier zijn de meest effectieve preventiemiddelen:
          </p>

          <div className="space-y-6 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-4 flex items-center gap-2">
                <Droplets className="h-5 w-5 text-cpCoral" />
                Spot-On Middelen (druppels in de nek)
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-foreground dark:text-cpCream mb-2">Voordelen:</p>
                  <ul className="space-y-1">
                    <li className="text-sm text-muted-foreground dark:text-cpCream/70 flex items-start gap-2">
                      <span className="text-cpCoral">✓</span> Makkelijk toe te dienen
                    </li>
                    <li className="text-sm text-muted-foreground dark:text-cpCream/70 flex items-start gap-2">
                      <span className="text-cpCoral">✓</span> Werkt 4-8 weken
                    </li>
                    <li className="text-sm text-muted-foreground dark:text-cpCream/70 flex items-start gap-2">
                      <span className="text-cpCoral">✓</span> Beschermt tegen vlooien en teken
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground dark:text-cpCream mb-2">Populaire merken:</p>
                  <ul className="space-y-1">
                    <li className="text-sm text-muted-foreground dark:text-cpCream/70">• Frontline (4 weken)</li>
                    <li className="text-sm text-muted-foreground dark:text-cpCream/70">• Advantage (4 weken, alleen vlooien)</li>
                    <li className="text-sm text-muted-foreground dark:text-cpCream/70">• Advantix (4 weken, honden)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-cpCoral" />
                Tabletten (oraal)
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-foreground dark:text-cpCream mb-2">Voordelen:</p>
                  <ul className="space-y-1">
                    <li className="text-sm text-muted-foreground dark:text-cpCream/70 flex items-start gap-2">
                      <span className="text-cpCoral">✓</span> Zeer effectief
                    </li>
                    <li className="text-sm text-muted-foreground dark:text-cpCream/70 flex items-start gap-2">
                      <span className="text-cpCoral">✓</span> Werkt 1-3 maanden
                    </li>
                    <li className="text-sm text-muted-foreground dark:text-cpCream/70 flex items-start gap-2">
                      <span className="text-cpCoral">✓</span> Niet afspoelbaar door zwemmen
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground dark:text-cpCream mb-2">Populaire merken:</p>
                  <ul className="space-y-1">
                    <li className="text-sm text-muted-foreground dark:text-cpCream/70">• Bravecto (12 weken)</li>
                    <li className="text-sm text-muted-foreground dark:text-cpCream/70">• NexGard (4 weken)</li>
                    <li className="text-sm text-muted-foreground dark:text-cpCream/70">• Simparica (5 weken)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-4">
                Halsbanden
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-foreground dark:text-cpCream mb-2">Voordelen:</p>
                  <ul className="space-y-1">
                    <li className="text-sm text-muted-foreground dark:text-cpCream/70 flex items-start gap-2">
                      <span className="text-cpCoral">✓</span> Langdurige werking (6-8 maanden)
                    </li>
                    <li className="text-sm text-muted-foreground dark:text-cpCream/70 flex items-start gap-2">
                      <span className="text-cpCoral">✓</span> Waterdicht
                    </li>
                    <li className="text-sm text-muted-foreground dark:text-cpCream/70 flex items-start gap-2">
                      <span className="text-cpCoral">✓</span> Geen tabletten nodig
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground dark:text-cpCream mb-2">Populaire merken:</p>
                  <ul className="space-y-1">
                    <li className="text-sm text-muted-foreground dark:text-cpCream/70">• Seresto (8 maanden)</li>
                    <li className="text-sm text-muted-foreground dark:text-cpCream/70">• Scalibor (6 maanden, honden)</li>
                  </ul>
                  <p className="text-xs text-muted-foreground dark:text-cpCream/60 mt-2">Let op: niet geschikt voor alle katten</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl border border-cpCoral/30 dark:border-cpCoral/20 p-4">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              <strong>Advies:</strong> Vraag altijd advies aan je dierenarts voordat je een nieuw middel gebruikt. Sommige hondenmiddelen zijn giftig voor katten! Begin met preventie in maart en blijf doorgaan tot november (of het hele jaar voor optimale bescherming).
            </p>
          </div>
        </section>

        {/* Behandeling */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Droplets className="h-7 w-7 text-cpCoral" />
            Behandeling bij Besmetting
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-4">Stap-voor-stap plan bij vlooienbesmetting:</h3>
            <ol className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold text-xs">1</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Behandel alle huisdieren</p>
                  <p className="text-muted-foreground dark:text-cpCream/70">Gebruik een effectief vlooienmiddel op alle honden en katten in huis, ook als ze geen symptomen tonen.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold text-xs">2</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Was alle textiel op 60°C</p>
                  <p className="text-muted-foreground dark:text-cpCream/70">Dierenbed, dekens, kussens, hondenjas - alles wat mogelijk besmet is.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold text-xs">3</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Stofzuig grondig dagelijks</p>
                  <p className="text-muted-foreground dark:text-cpCream/70">Vloeren, meubels, kieren, plinten - overal waar vlooieneieren kunnen zitten. Gooi de stofzuigerzak daarna meteen weg.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold text-xs">4</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Gebruik omgevingsspray</p>
                  <p className="text-muted-foreground dark:text-cpCream/70">Speciale vlooienspray voor de woning (bijv. Indorex) doodt eieren en larven. Eén behandeling werkt 12 maanden.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold text-xs">5</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Herhaal na 2 weken</p>
                  <p className="text-muted-foreground dark:text-cpCream/70">Behandel je huisdier opnieuw na 2 weken om nieuw uitgekomen vlooien te doden.</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-4">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              <strong>Let op:</strong> Het kan 2-3 maanden duren voordat een vlooienplaag volledig onder controle is. Wees geduldig en volg het behandelplan consequent. Bij aanhoudende problemen, raadpleeg je dierenarts.
            </p>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">
            Meer over Dierengezondheid
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/nl/gids/dierengezondheid/ontwormen-hond-kat" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Ontwormen van Hond en Kat</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Lees hoe vaak en met welke middelen je moet ontwormen →</p>
            </Link>
            <Link href="/nl/gids/dierengezondheid/wanneer-naar-dierenarts" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Wanneer naar de Dierenarts?</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">10 waarschuwingssignalen bij huisdieren →</p>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veelgestelde Vragen over Vlooien en Teken
          </h2>
          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kunnen binnenkatten ook vlooien krijgen?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, ook binnenkatten kunnen vlooien krijgen. Vlooien kunnen binnenkomen via open ramen, op kleding of schoenen van mensen, of via andere huisdieren. Als je kat toegang heeft tot een balkon, terras of tuin is het risico nog groter. Preventie is ook voor binnenkatten verstandig, vooral in de zomermaanden.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Waarom blijven vlooien terugkomen na behandeling?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Dit komt omdat de meeste vlooienmiddelen alleen volwassen vlooien doden, niet de eieren en poppen in de omgeving. Deze ontwikkelen zich in 2-3 weken tot nieuwe vlooien. Daarom is het belangrijk om ook de omgeving grondig te behandelen en de behandeling na 2 weken te herhalen om de cyclus te doorbreken.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Welk vlooienmiddel is het beste?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Er is geen "beste" middel voor iedereen. Het hangt af van je huisdier, levensstijl en budget. Tabletten zoals Bravecto zijn zeer effectief en praktisch (12 weken bescherming). Spot-ons zoals Frontline zijn betaalbaarder maar moet je vaker aanbrengen. Halsbanden zoals Seresto zijn handig voor wie tabletten niet kan toedienen. Vraag je dierenarts om advies op maat.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Hoe lang duurt het voordat een vlooienmiddel werkt?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                De meeste vlooienmiddelen beginnen binnen 24 uur te werken en doden 95-100% van de vlooien binnen 48 uur. Let op: je kunt nog wel vlooien zien in de eerste dagen, omdat vlooien uit de omgeving je huisdier blijven bespringen. Deze sterven dan wel snel. Volledige controle over een vlooienplaag duurt meestal 2-3 maanden.
              </div>
            </details>
          </div>
        </section>

        {/* Tertiary CTA */}
        <section className="mb-8">
          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl border border-cpAmber/30 dark:border-cpAmber/20 p-6 text-center">
            <p className="text-foreground dark:text-cpCream mb-4">
              Op zoek naar meer informatie over huisdiergezondheid en -diensten?
            </p>
            <Button
              asChild
              variant="outline"
              className="border-cpAmber text-cpAmber hover:bg-cpAmber/10 rounded-xl"
            >
              <Link href="/nl/netherlands">
                Ontdek alle huisdierservices →
              </Link>
            </Button>
          </div>
        </section>
      </article>

      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Vlooien en Teken bij Huisdieren: Preventie en Behandeling",
            "description": "Effectieve preventie en behandeling van vlooien en teken bij honden en katten. Ontdek de beste middelen, wanneer te behandelen en hoe besmetting te voorkomen.",
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
            "dateModified": "2025-01-15",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://cutiepawspedia.com/nl/dierengezondheid/vlooien-teken-huisdieren"
            }
          })
        }}
      />
    </div>
  );
}
