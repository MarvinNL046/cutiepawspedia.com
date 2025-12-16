/**
 * Pet Toxicity Canonical Page: Slakkenkorrels (Slug Pellets/Metaldehyde) - Honden (Dogs)
 * Type: Household
 * Toxicity Level: HOOG (HIGH)
 * Locale: nl (Dutch)
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Bug, Phone, Clock, Heart, XCircle } from "lucide-react";
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: "Zijn Slakkenkorrels Giftig voor Honden? Zeer Gevaarlijk - CutiePawsPedia",
  description: "Slakkenkorrels (metaldehyde) zijn zeer giftig voor honden - kunnen tremoren, stuipen en hersenschade veroorzaken. Herken symptomen en weet wat te doen bij inname. Spoedeisende informatie.",
  keywords: [
    "slakkenkorrels giftig voor honden",
    "hond slakkenkorrels gegeten",
    "metaldehyde vergiftiging hond",
    "stuipen hond slakkengif",
    "tremoren hond",
    "gif honden tuin",
    "spoed dierenarts hond",
    "slakkenbestrijding honden veilig"
  ],
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "Zijn Slakkenkorrels Giftig voor Honden? Zeer Gevaarlijk",
    description: "Slakkenkorrels zijn zeer giftig voor honden - kunnen tremoren en stuipen veroorzaken. Noodgids voor hondeneigenaren.",
    type: "article",
  },
};

export default function IsSlakkenkorrelsGiftigVoorHonden() {
  return (
    <div className="bg-background dark:bg-cpCharcoal">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-red-50 via-red-50/50 to-transparent dark:from-red-950/30 dark:via-red-950/10 dark:to-transparent border-b border-border dark:border-red-800/30">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="flex items-center gap-2 mb-4">
            <Bug className="h-6 w-6 text-red-600" />
            <span className="text-sm font-medium text-red-600">Zeer Giftig Tuinproduct voor Honden</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
            Zijn Slakkenkorrels Giftig voor Honden?
          </h1>

          {/* TL;DR Verdict Box - URGENT WARNING */}
          <div className="bg-red-600 dark:bg-red-700 rounded-2xl p-6 mb-6 shadow-lg">
            <div className="flex items-start gap-4">
              <XCircle className="h-10 w-10 text-white flex-shrink-0" />
              <div>
                <p className="text-2xl font-bold text-white mb-2">
                  Ja - Zeer giftig
                </p>
                <p className="text-white/95 text-lg leading-relaxed">
                  Slakkenkorrels (vooral met metaldehyde) zijn extreem gevaarlijk voor honden. Ze kunnen al binnen 1-3 uur tremoren (trillen), stuipen, oververhitting en hersenschade veroorzaken. Zelfs kleine hoeveelheden kunnen levensgevaarlijk zijn. Dit is een medisch noodgeval.
                </p>
              </div>
            </div>
          </div>

          {/* Emergency CTA */}
          <div className="bg-red-100 dark:bg-red-900/30 border-2 border-red-400 dark:border-red-700 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-700 dark:text-red-400 flex-shrink-0" />
              <div>
                <p className="text-foreground dark:text-cpCream font-bold mb-2">Noodgeval - Je hond heeft slakkenkorrels gegeten?</p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  Bel ONMIDDELLIJK je dierenarts of een 24-uurs spoedkliniek. Symptomen kunnen zeer snel optreden (binnen 1-3 uur). Neem de verpakking mee.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-foreground dark:text-cpCream">
                    <Phone className="inline h-4 w-4 mr-1" />
                    <strong>Dierenarts bellen</strong>
                  </p>
                  <p className="text-foreground dark:text-cpCream">
                    <Clock className="inline h-4 w-4 mr-1" />
                    <strong>Dierennoodhulp (24/7): 0900-0245</strong>
                  </p>
                </div>
              </div>
            </div>
            <Button
              asChild
              size="lg"
              className="bg-red-700 text-white hover:bg-red-800 rounded-xl w-full md:w-auto"
            >
              <Link href="/nl/netherlands">
                Vind direct een spoed-dierenarts →
              </Link>
            </Button>
          </div>

          <p className="text-muted-foreground dark:text-cpCream/80 text-sm">
            Deze pagina bevat levensreddende informatie over slakkenkorrels-vergiftiging bij honden, symptomen, behandeling en preventie.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">
        {/* Breadcrumb with JSON-LD Schema */}
        <FoodGuideBreadcrumb
          locale="nl"
          items={[
            { name: "Voedselgids", href: "/nl/voedselgids" },
            { name: "Giftige Stoffen", href: "/nl/giftige-stoffen" },
          ]}
          currentPage="Slakkenkorrels voor Honden"
        />

        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Waarom Zijn Slakkenkorrels Zo Gevaarlijk voor Honden?
          </h2>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Slakkenkorrels zijn populaire tuinproducten om slakken en naaktslakken te bestrijden. Het werkzame bestanddeel is meestal <strong>metaldehyde</strong>, een extreem giftige stof voor honden. Het probleem is dat slakkenkorrels vaak aantrekkelijk zijn voor honden - ze ruiken zoet (soms met toegevoegd suiker of graan) en zien eruit als voer.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Metaldehyde heeft een zeer krachtig effect op het zenuwstelsel van honden. Het veroorzaakt overmatige zenuwactiviteit, wat leidt tot tremoren (trillen), stuipen, en potentieel dodelijke oververhitting. Symptomen kunnen zeer snel optreden - vaak al binnen 1-3 uur na inname.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Het gevaarlijke is dat honden vaak grote hoeveelheden slakkenkorrels kunnen eten voordat de eigenaar het opmerkt. In de tuin gestrooid gif is gemakkelijk toegankelijk, en de aantrekkelijke geur trekt honden aan. Zelfs honden die normaal niet snel iets opeten kunnen in de verleiding komen.
          </p>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-5 mb-6">
            <p className="text-sm text-foreground dark:text-cpCream font-medium mb-2">
              Let op: Niet alle slakkenkorrels zijn even giftig
            </p>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              Er bestaan ook slakkenkorrels op basis van ijzerfosfaat, die veel veiliger zijn voor huisdieren. Deze zijn nog steeds irriterend bij inname maar veel minder gevaarlijk dan metaldehyde. Check altijd de verpakking - als er "metaldehyde" op staat, is dit extreem gevaarlijk voor honden.
            </p>
          </div>
        </section>

        {/* Toxicity Details */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <AlertTriangle className="h-7 w-7 text-red-600" />
            Hoe Werkt Metaldehyde-Vergiftiging?
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-red-300/30 p-6 mb-6">
            <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
              Wat gebeurt er in het lichaam van je hond na inname van metaldehyde:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Snelle absorptie (15-60 minuten)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Metaldehyde wordt snel opgenomen in de maag en darmen</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Zenuwprikkeling (1-3 uur)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Overmatige zenuwactiviteit veroorzaakt tremoren en spiertrekkingen</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Stuipen en convulsies</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Ernstige zenuwoverstimulatie leidt tot oncontroleerbare stuipen</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Oververhitting (hyperthermie)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Spiertremoren en stuipen veroorzaken extreme lichaamswarmte ({'>'}41°C)</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Orgaanschade</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Lever-, nier- en hersenschade door oververhitting en directe gifwerking</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800/50 rounded-xl p-5">
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Waarom zo snel dodelijk?</strong> De combinatie van zenuwoverstimulatie en extreme oververhitting kan binnen enkele uren tot orgaanfalen en overlijden leiden. De stuipen zijn zo intens dat ze zelfstandig fataal kunnen zijn, zelfs met medische behandeling. Daarom is ZEER snelle interventie cruciaal.
            </p>
          </div>
        </section>

        {/* Symptoms */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Symptomen van Slakkenkorrels-Vergiftiging bij Honden
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Symptomen verschijnen meestal binnen 1-3 uur na inname en kunnen zeer snel verergeren. Let op deze waarschuwingssignalen:
          </p>

          <div className="space-y-4 mb-6">
            {/* Early symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-cpAmber" />
                Eerste Symptomen (15 minuten - 3 uur)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Speekselvloed</strong> (excessief kwijlen)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Braken</strong> (vaak met blauw/groene slakkenkorrels zichtbaar)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Onrust en angst</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Lichte tremoren</strong> (trillen van spieren)</span>
                </li>
              </ul>
            </div>

            {/* Progressive symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-red-300/30 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Verergerende Symptomen (1-4 uur)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Heftige tremoren</strong> (oncontroleerbaar trillen van hele lichaam)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Spierspasmen en -trekkingen</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Hyperactiviteit en desoriëntatie</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Verwijde pupillen</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Verhoogde hartslag en ademhaling</strong></span>
                </li>
              </ul>
            </div>

            {/* Severe symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-red-300/30 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-600" />
                Levensbedreigende Symptomen (2-6 uur)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Stuipen/toevallen</strong> (grand mal convulsies)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Extreme oververhitting</strong> (lichaam voelt zeer heet aan)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Cyanose</strong> (blauwe tong/tandvlees door zuurstofgebrek)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Ademhalingsproblemen</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Coma</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Overlijden</strong> (door hersenschade, orgaanfalen of oververhitting)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-5">
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Belangrijk:</strong> Symptomen kunnen zeer snel escaleren van mild trillen naar levensbedreigende stuipen. Wacht NOOIT af - ga bij elke verdenking van slakkenkorrels-inname ONMIDDELLIJK naar de dierenarts, zelfs als je hond nog maar mild trilt.
            </p>
          </div>
        </section>

        {/* What To Do */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Heart className="h-7 w-7 text-cpCoral" />
            Wat Te Doen Als Je Hond Slakkenkorrels Heeft Gegeten
          </h2>

          <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-400 dark:border-red-700 rounded-xl p-6 mb-6">
            <p className="text-foreground dark:text-cpCream font-bold mb-4 text-lg">
              EXTREME SPOED - Elke Seconde Telt:
            </p>
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Bel ONMIDDELLIJK je dierenarts</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Vertel dat je hond slakkenkorrels (metaldehyde) heeft gegeten. Dit is een extreem spoedeisend noodgeval. Vraag of je direct moet komen - het antwoord is altijd JA.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Neem verpakking mee</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Neem de verpakking van de slakkenkorrels mee zodat de dierenarts kan zien welke stof en hoeveelheid het bevat. Dit is cruciaal voor de behandeling.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">NIET zelf laten braken</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Doe NIETS zonder toestemming van de dierenarts. Bij stuipen kan braken zeer gevaarlijk zijn. Laat de dierenarts dit afhandelen.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  4
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Houd je hond rustig en koel</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Voorkom extra stress. Als je hond oververhit is, bevochtig hem voorzichtig met lauwwarm (NIET koud) water tijdens het transport.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  5
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Ga DIRECT naar de dierenarts</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Vertrek onmiddellijk, zelfs als je hond nog geen symptomen heeft. Bij metaldehyde telt elke minuut. Laat iemand anders rijden als je hond stuipen heeft.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl border border-cpCoral/30 dark:border-cpCoral/20 p-5">
            <p className="text-sm text-foreground dark:text-cpCream mb-3">
              <strong>Behandeling door de dierenarts:</strong> De dierenarts zal proberen braken op te wekken (als inname kort geleden was en je hond nog geen stuipen heeft), actieve kool geven, je hond een infuus geven, anti-epileptica toedienen om stuipen te stoppen, en je hond actief koelen als hij oververhit is. Je hond moet waarschijnlijk 24-72 uur intensief gemonitord worden.
            </p>
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Prognose:</strong> Met zeer snelle behandeling (binnen 1-2 uur) kunnen honden herstellen. Bij vertraagde behandeling of ernstige stuipen is de prognose slecht. Hersenschade door oververhitting kan permanente gevolgen hebben.
            </p>
          </div>
        </section>

        {/* When to Contact Vet */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Wanneer Contact Opnemen met de Dierenarts?
          </h2>

          <div className="bg-red-100 dark:bg-red-900/30 border-2 border-red-400 dark:border-red-700 rounded-xl p-6 mb-6">
            <p className="text-foreground dark:text-cpCream font-bold mb-3 text-lg">
              ALTIJD - Dit is ALTIJD een noodgeval
            </p>
            <p className="text-foreground dark:text-cpCream/90 mb-4">
              Bel ONMIDDELLIJK de dierenarts als:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je <strong>VERMOEDT</strong> dat je hond slakkenkorrels heeft gegeten</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je hond nog geen symptomen heeft (wacht hier NIET op!)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je hond licht begint te trillen of speekselt</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je hond stuipen of tremoren heeft</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je hond oververhit aanvoelt</span>
              </li>
            </ul>
          </div>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
            <p className="text-foreground dark:text-cpCream/90 mb-3">
              <strong>Noodcontactgegevens:</strong>
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span><strong>Je eigen dierenarts</strong> (heb het nummer altijd bij de hand)</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span><strong>Dierennoodhulp 24/7:</strong> 0900-0245 (€0,90 per minuut)</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span><strong>Dichtstbijzijnde 24-uurs spoedkliniek</strong> (zoek dit van tevoren op!)</span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Vind Direct een Dierenarts in je Buurt
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Heb je nu een noodgeval? Vind snel een dierenarts of 24-uurs spoedkliniek bij jou in de buurt.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-cpCoral hover:bg-white/90 rounded-xl"
            >
              <Link href="/nl/netherlands">
                Vind spoeddierenarts →
              </Link>
            </Button>
          </div>
        </section>

        {/* Prevention */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Preventie: Bescherm Je Hond Tegen Slakkenkorrels
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Slakkenkorrels-vergiftiging is volledig te voorkomen met deze maatregelen:
          </p>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-4">Preventiemaatregelen:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Gebruik ALLEEN huisdiervriendelijke slakkenkorrels</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Kies voor producten op basis van ijzerfosfaat (ferramol). Deze zijn veel veiliger voor huisdieren dan metaldehyde.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Houd honden weg na uitstrooien</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Zelfs ijzerfosfaat-korrels kunnen maagklachten veroorzaken. Houd honden minimaal 24 uur weg uit behandelde gebieden.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Gebruik alternatieve slakkenbestrijding</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Overweeg biervallen, koperstrips, schors, zout barrières of handmatig verzamelen.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Berg slakkenkorrels veilig op</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Bewaar verpakkingen buiten bereik van honden, in afgesloten kasten. Honden kunnen zakken openknabbelen.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Informeer buren</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Vraag buren om huisdiervriendelijke slakkenkorrels te gebruiken als je hond in hun tuin kan komen.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Controleer de tuin regelmatig</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Kijk of er geen slakkenkorrels zichtbaar zijn voordat je je hond naar buiten laat.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-300 dark:border-emerald-800/50 p-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
              <Bug className="h-5 w-5 text-emerald-600" />
              Huisdiervriendelijke Alternatieven
            </h3>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
              Deze slakkenbestrijdingsmethoden zijn veilig voor honden:
            </p>
            <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> IJzerfosfaat slakkenkorrels (veiliger)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Biervallen
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Koperstrips rond planten
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Eieren- of koffiegrondbarrières
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Handmatig verzamelen
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Natuurlijke vijanden (egels, vogels)
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veelgestelde Vragen over Slakkenkorrels en Honden
          </h2>
          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Hoeveel slakkenkorrels is dodelijk voor een hond?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Bij metaldehyde kunnen al kleine hoeveelheden dodelijk zijn. Voor een kleine hond (5 kg) kan 1-2 gram metaldehyde (ongeveer een theelepel slakkenkorrels) al gevaarlijk zijn. Grote honden kunnen meer verdragen maar zijn nog steeds ernstig in gevaar. Ga bij elke inname ONMIDDELLIJK naar de dierenarts - wacht niet af.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Zijn ijzerfosfaat slakkenkorrels veilig voor honden?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                IJzerfosfaat slakkenkorrels zijn VEEL veiliger dan metaldehyde, maar niet volledig onschadelijk. Bij inname kunnen ze maagklachten, braken en diarree veroorzaken. Grote hoeveelheden kunnen nog steeds gevaarlijk zijn. Ze zijn echter een veel betere keuze voor huishoudens met honden. Houd honden toch minimaal 24 uur weg na uitstrooien.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Hoe snel moet ik naar de dierenarts bij slakkenkorrels?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                ONMIDDELLIJK - zelfs als je hond nog geen symptomen heeft. Metaldehyde werkt zeer snel (symptomen binnen 1-3 uur) en kan binnen enkele uren dodelijk zijn. De behandeling is het meest effectief als deze start VOORDAT symptomen optreden. Elke minuut vertraging vermindert de overlevingskans. Bel direct en ga meteen op weg.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Is er een tegengif voor metaldehyde?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Nee, er bestaat geen specifiek tegengif voor metaldehyde. Behandeling is ondersteunend: braken opwekken (vroeg), actieve kool, infuus, anti-epileptica om stuipen te stoppen, en actieve koeling bij oververhitting. Daarom is ZEER snelle behandeling zo cruciaal - hoe eerder het gif uit het lichaam is, hoe beter de prognose.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kan mijn hond herstellen van slakkenkorrels-vergiftiging?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Met zeer snelle en agressieve behandeling kunnen honden herstellen. Als behandeling binnen 1-2 uur start en stuipen voorkomen of snel gestopt kunnen worden, is de prognose redelijk. Bij vertraagde behandeling, ernstige stuipen of extreme oververhitting is de prognose slecht. Hersenschade door oververhitting kan permanente neurologische problemen veroorzaken.
              </div>
            </details>
          </div>
        </section>

        {/* Medical Disclaimer */}
        <section className="mb-8">
          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl border border-cpAmber/30 dark:border-cpAmber/20 p-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3">
              Medische Disclaimer
            </h3>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 leading-relaxed">
              Deze informatie is uitsluitend bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies. Bij elke verdenking van slakkenkorrels-vergiftiging moet je ONMIDDELLIJK contact opnemen met een dierenarts of spoedkliniek. Metaldehyde vergiftiging is een extreem spoedeisend medisch noodgeval waarbij elke seconde telt. De informatie op deze pagina is gebaseerd op veterinaire kennis en wetenschappelijke bronnen, maar elke hond is anders en alleen een dierenarts kan een juiste diagnose stellen en behandeling geven. Wacht nooit af - bel altijd direct bij verdenking van slakkenkorrels-inname.
            </p>
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
            "headline": "Zijn Slakkenkorrels Giftig voor Honden? Zeer Gevaarlijk",
            "description": "Slakkenkorrels (metaldehyde) zijn zeer giftig voor honden - kunnen tremoren, stuipen en hersenschade veroorzaken. Herken symptomen en weet wat te doen bij inname.",
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
            "datePublished": "2025-12-15",
            "dateModified": "2025-12-15",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://cutiepawspedia.com/nl/is-slakkenkorrels-giftig-voor-honden"
            }
          })
        }}
      />

      {/* Schema.org FAQ Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Hoeveel slakkenkorrels is dodelijk voor een hond?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Bij metaldehyde kunnen al kleine hoeveelheden dodelijk zijn. Voor een kleine hond (5 kg) kan 1-2 gram metaldehyde al gevaarlijk zijn. Ga bij elke inname ONMIDDELLIJK naar de dierenarts - wacht niet af."
                }
              },
              {
                "@type": "Question",
                "name": "Zijn ijzerfosfaat slakkenkorrels veilig voor honden?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "IJzerfosfaat slakkenkorrels zijn VEEL veiliger dan metaldehyde, maar niet volledig onschadelijk. Bij inname kunnen ze maagklachten veroorzaken. Ze zijn echter een veel betere keuze voor huishoudens met honden."
                }
              },
              {
                "@type": "Question",
                "name": "Hoe snel moet ik naar de dierenarts bij slakkenkorrels?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "ONMIDDELLIJK - zelfs als je hond nog geen symptomen heeft. Metaldehyde werkt zeer snel en kan binnen enkele uren dodelijk zijn. De behandeling is het meest effectief als deze start VOORDAT symptomen optreden."
                }
              },
              {
                "@type": "Question",
                "name": "Is er een tegengif voor metaldehyde?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Nee, er bestaat geen specifiek tegengif voor metaldehyde. Behandeling is ondersteunend: braken opwekken, actieve kool, anti-epileptica om stuipen te stoppen, en koeling bij oververhitting."
                }
              },
              {
                "@type": "Question",
                "name": "Kan mijn hond herstellen van slakkenkorrels-vergiftiging?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Met zeer snelle en agressieve behandeling kunnen honden herstellen. Als behandeling binnen 1-2 uur start, is de prognose redelijk. Bij vertraagde behandeling of ernstige stuipen is de prognose slecht."
                }
              }
            ]
          })
        }}
      />

      {/* Safe Food Alternatives */}
      <div className="container mx-auto max-w-4xl px-4 pb-12">
        <RelatedSafeFoods
          locale="nl"
          animal="honden"
          foods={commonSafeFoods}
          title="Veilige snack alternatieven"
        />
      </div>
    </div>
  );
}
