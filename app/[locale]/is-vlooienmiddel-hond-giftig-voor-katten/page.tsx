/**
 * Pet Toxicity Canonical Page: Vlooienmiddel voor Honden (Permethrin) - Katten (Cats)
 * Type: Household
 * Toxicity Level: Hoog - Ernstig gevaarlijk
 * Locale: nl (Dutch)
 */

import type { Metadata } from "next";
import Link from "next/link";
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';
import { Button } from "@/components/ui/button";
import { AlertTriangle, Bug, Phone, Clock, Heart, XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Is Vlooienmiddel voor Honden Giftig voor Katten? | Symptomen & Wat Te Doen",
  description: "Vlooienmiddel voor honden met permetrine is zeer gevaarlijk voor katten. Leer de symptomen herkennen en wat je moet doen bij vermoeden van blootstelling.",
  keywords: [
    "permetrine giftig katten",
    "vlooienmiddel hond gevaarlijk katten",
    "kat permetrine vergiftiging",
    "tremoren kat vlooienmiddel",
    "hond vlooienbehandeling gevaarlijk katten",
    "spot-on hond giftig kat",
    "vlooiendruppels hond katten",
    "permetrine gevaarlijk katten"
  ],
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "Is Vlooienmiddel voor Honden Giftig voor Katten? | Symptomen & Wat Te Doen",
    description: "Vlooienmiddel voor honden met permetrine is zeer gevaarlijk voor katten. Leer de symptomen herkennen en wat je moet doen.",
    type: "article",
  },
};

export default function IsVlooienmiddelHondGiftigVoorKatten() {
  return (
    <div className="bg-background dark:bg-cpCharcoal">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-red-50 via-red-50/50 to-transparent dark:from-red-950/30 dark:via-red-950/10 dark:to-transparent border-b border-border dark:border-red-800/30">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <FoodGuideBreadcrumb
            locale="nl"
            items={[
              { name: "Voedselgids", href: "/nl/voedselgids" },
              { name: "Giftige Stoffen", href: "/nl/giftige-stoffen" },
            ]}
            currentPage="Vlooienmiddel Hond voor Katten"
          />
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <span className="text-sm font-medium text-red-600">Zeer giftig product voor katten - Levensgevaarlijk</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
            Is Vlooienmiddel voor Honden Giftig voor Katten?
          </h1>

          {/* TL;DR Verdict Box - CRITICAL WARNING */}
          <div className="bg-red-600 dark:bg-red-700 rounded-2xl p-6 mb-6 shadow-lg border-4 border-red-800">
            <div className="flex items-start gap-4">
              <XCircle className="h-10 w-10 text-white flex-shrink-0" />
              <div>
                <p className="text-2xl font-bold text-white mb-2">
                  Ja - Zeer gevaarlijk en levensbedreigend
                </p>
                <p className="text-white/95 text-lg leading-relaxed mb-3">
                  Vlooienmiddelen voor honden die <strong>permetrine</strong> bevatten zijn zeer giftig voor katten. Permetrine is een stof die katten niet kunnen afbreken. Het veroorzaakt tremoren, stuipen, oververhitting en kan tot ernstige gezondheidsproblemen leiden. Zelfs contact met een behandelde hond kan gevaarlijk zijn.
                </p>
                <p className="text-white font-bold text-xl">
                  ⚠️ Gebruik nooit vlooienmiddelen voor honden bij katten
                </p>
              </div>
            </div>
          </div>

          {/* Emergency CTA */}
          <div className="bg-red-100 dark:bg-red-900/30 border-2 border-red-400 dark:border-red-700 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-700 dark:text-red-400 flex-shrink-0" />
              <div>
                <p className="text-foreground dark:text-cpCream font-bold mb-2">Noodgeval - Je kat heeft permetrine gekregen of aangeraakt?</p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  Neem direct contact op met je dierenarts of een 24-uurs spoedkliniek. Was je kat met veel lauw water en milde zeep. Snelle actie is essentieel bij permetrine vergiftiging.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-foreground dark:text-cpCream">
                    <Phone className="inline h-4 w-4 mr-1" />
                    <strong>Dierenarts bellen NU</strong>
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
            Deze pagina bevat belangrijke informatie over permetrine vergiftiging bij katten, symptomen, behandeling en preventie.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">
        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Waarom is Permetrine Zeer Giftig voor Katten?
          </h2>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Permetrine is een veelgebruikt insecticide in vlooien- en tekenbehandelingen voor honden (spot-on druppels, sprays, halsbanden). Het is veilig voor honden maar <strong>extreem giftig voor katten</strong>. Het verschil zit in de stofwisseling: katten missen een belangrijk enzym (glucuronyl transferase) om permetrine af te breken. Hierdoor hoopt het gif zich op in het lichaam en bereikt toxische niveaus.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            De toxiciteit is zo ernstig dat zelfs kleine hoeveelheden permetrine dodelijk kunnen zijn. Een kat kan vergiftigd raken door:
          </p>
          <ul className="space-y-2 mb-4 ml-6">
            <li className="text-foreground dark:text-cpCream/90">• <strong>Direct gebruik</strong> van hondenvlooienmiddel op een kat (NOOIT doen!)</li>
            <li className="text-foreground dark:text-cpCream/90">• <strong>Contact met een behandelde hond</strong> (knuffelen, likken, slapen naast)</li>
            <li className="text-foreground dark:text-cpCream/90">• <strong>Likken van vacht</strong> waar permetrine op zit</li>
            <li className="text-foreground dark:text-cpCream/90">• <strong>Lopen over behandelde oppervlakken</strong> en daarna poten likken</li>
          </ul>
          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Permetrine veroorzaakt overmatige zenuwactiviteit, wat leidt tot tremoren (oncontroleerbaar trillen), stuipen, oververhitting en uiteindelijk orgaanfalen. Zonder snelle behandeling is het overlijdenspercentage zeer hoog.
          </p>

          <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-400 dark:border-red-700 rounded-xl p-5 mb-6">
            <p className="text-sm text-foreground dark:text-cpCream font-bold mb-2">
              ⚠️ Belangrijke waarschuwing
            </p>
            <p className="text-sm text-foreground dark:text-cpCream">
              Veel katteneigenaren zijn zich niet bewust dat vlooienmiddel voor honden zeer gevaarlijk is voor katten. Controleer altijd het etiket. Als er "alleen voor honden" of "permetrine" op staat, nooit bij katten gebruiken en houd katten weg van behandelde honden tot het product volledig droog is.
            </p>
          </div>
        </section>

        {/* Toxicity Details */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <AlertTriangle className="h-7 w-7 text-red-600" />
            Hoe Werkt Permetrine Vergiftiging bij Katten?
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-red-300/30 p-6 mb-6">
            <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
              Wat gebeurt er in het lichaam van een kat na blootstelling:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Opname via huid of maag (minuten tot uren)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Permetrine wordt snel opgenomen via de huid (vooral bij likken) of maag</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Ophoping in lichaam (katten kunnen het NIET afbreken)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Zonder het enzym glucuronyl transferase hoopt permetrine zich op tot giftige niveaus</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Zenuwoverstimulatie (1-12 uur na blootstelling)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Permetrine verstoort zenuwsignalen, veroorzaakt overmatige zenuwactiviteit</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Tremoren en stuipen</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Oncontroleerbaar trillen van spieren, toevallen, extreme oververhitting</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
<div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Orgaanfalen</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Zonder behandeling kunnen ernstige complicaties optreden zoals leverfalen, nierfalen en ademhalingsproblemen</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800/50 rounded-xl p-5">
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Waarom zo gevaarlijk?</strong> Katten missen specifiek het vermogen om permetrine af te breken. Wat voor honden veilig is, wordt in katten een oplopend gif dat zich verzamelt in het zenuwstelsel. De tremoren en stuipen kunnen zeer ernstig zijn en leiden tot oververhitting en uitputting.
            </p>
          </div>
        </section>

        {/* Symptoms */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Symptomen van Permetrine Vergiftiging bij Katten
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Symptomen verschijnen meestal binnen 1-12 uur na blootstelling en kunnen zeer snel verergeren:
          </p>

          <div className="space-y-4 mb-6">
            {/* Early symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-cpAmber" />
                Eerste Symptomen (1-6 uur na blootstelling)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Speekselvloed</strong> (excessief kwijlen)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Onrust en angst</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Braken</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Pupillen verwijden</strong> (grote pupillen)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Lichte spiertrillingen</strong></span>
                </li>
              </ul>
            </div>

            {/* Progressive symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-red-300/30 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Verergerende Symptomen (6-24 uur)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Intense tremoren</strong> (oncontroleerbaar trillen van hele lichaam)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Spierspasmen</strong> (spieren trekken heftig samen)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Coördinatieproblemen</strong> (wankelen, vallen)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Hyperactiviteit</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Verhoogde lichaamstemperatuur</strong> (oververhitting begint)</span>
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
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Ernstige symptomen
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Stuipen/toevallen</strong> (grand mal convulsies)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Extreme oververhitting</strong> (zeer ernstig)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Ademhalingsproblemen</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Blindheid</strong> (door hersenschade)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Coma</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Levensbedreigende complicaties</strong> zonder behandeling</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-5">
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Belangrijk:</strong> Symptomen kunnen zeer snel escaleren. Zelfs milde tremoren vereisen directe veterinaire aandacht. Neem onmiddellijk contact op met de dierenarts bij elke verdenking van permetrine blootstelling. Snelle actie is essentieel.
            </p>
          </div>
        </section>

        {/* What To Do */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Heart className="h-7 w-7 text-cpCoral" />
            Wat Te Doen Bij Permetrine Vergiftiging
          </h2>

          <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-400 dark:border-red-700 rounded-xl p-6 mb-6">
            <p className="text-foreground dark:text-cpCream font-bold mb-4 text-lg">
              Noodprotocol - Snelle actie vereist:
            </p>
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Was je kat direct (bij huidcontact)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Als permetrine op de huid zit, was je kat grondig met veel lauw water en milde zeep (geen shampoo met olie). Gebruik handschoenen. Droog daarna goed af.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Bel direct je dierenarts of spoedkliniek</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Vertel dat je kat blootgesteld is aan permetrine. Dit vereist onmiddellijke veterinaire zorg. Ga direct naar de kliniek.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Niet laten braken zonder toestemming</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Laat je kat niet braken zonder instructie van de dierenarts. Bij stuipen kan dit gevaarlijk zijn.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  4
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Neem verpakking mee</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Breng de verpakking van het vlooienmiddel mee - dit toont de exacte concentratie permetrine.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  5
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Ga direct naar de dierenarts</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Wacht niet af. Permetrine vergiftiging vereist spoedbehandeling. Snelle veterinaire zorg verbetert de prognose aanzienlijk.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl border border-cpCoral/30 dark:border-cpCoral/20 p-5">
            <p className="text-sm text-foreground dark:text-cpCream mb-3">
              <strong>Behandeling door de dierenarts:</strong> De dierenarts zal je kat grondig wassen, anti-epileptica geven om stuipen te stoppen, een infuus starten, en je kat actief koelen bij oververhitting. Intensieve monitoring en ondersteunende zorg kunnen nodig zijn. Er is geen specifiek tegengif - behandeling is ondersteunend.
            </p>
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Prognose:</strong> Met snelle en adequate behandeling kunnen veel katten herstellen. De exacte behandelduur varieert per individueel geval. Snelle veterinaire interventie verbetert de kansen op volledig herstel aanzienlijk.
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
              Dit vereist altijd onmiddellijke veterinaire hulp
            </p>
            <p className="text-foreground dark:text-cpCream/90 mb-4">
              Neem direct contact op bij:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span><strong>Elke verdenking</strong> van permetrine blootstelling</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je kat heeft <strong>contact gehad met een behandelde hond</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je hebt <strong>per ongeluk hondenvlooienmiddel</strong> op je kat gebruikt</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je kat vertoont <strong>trillen, stuipen of speekselvloed</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je kat is <strong>nog symptoomvrij</strong> (wacht niet af met contact opnemen)</span>
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
            Preventie: Bescherm Je Kat Tegen Permetrine
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-4">Kritieke Preventiemaatregelen:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">NOOIT hondenvlooienmiddel bij katten</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Controleer altijd het etiket. Als er "alleen voor honden" of "permetrine" staat, nooit bij katten gebruiken.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Scheid honden en katten na behandeling</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Houd katten 24-72 uur weg van behandelde honden tot het product volledig droog is en is ingetrokken</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Gebruik katveilige vlooienbehandeling</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Gebruik alleen producten die expliciet veilig zijn voor katten (fipronil, selamectine, imidacloprid - GEEN permetrine)</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Berg hondenvlooienmiddel veilig op</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Bewaar gescheiden van kattenvlooienmiddel om verwarring te voorkomen</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Overleg met dierenarts</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Vraag advies over veilige vlooienbestrijding in huishoudens met honden EN katten</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Informeer gasten en oppas</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Vertel iedereen die voor je kat zorgt over het permetrine gevaar</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-300 dark:border-emerald-800/50 p-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
              <Bug className="h-5 w-5 text-emerald-600" />
              Veilige Vlooienbestrijding voor Katten
            </h3>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
              Deze werkzame stoffen zijn veilig voor katten (vraag altijd advies aan dierenarts):
            </p>
            <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Fipronil (Frontline)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Selamectine (Stronghold)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Imidacloprid (Advantage)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Fluralaner (Bravecto voor katten)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Spinetoram (Cheristin)
              </li>
            </ul>
            <p className="text-sm text-foreground dark:text-cpCream mt-3 font-semibold">
              ⚠️ Controleer altijd dat het product specifiek voor katten is goedgekeurd
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veelgestelde Vragen over Permetrine en Katten
          </h2>
          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Waarom is permetrine dodelijk voor katten maar veilig voor honden?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Katten missen het enzym glucuronyl transferase dat permetrine afbreekt. Honden hebben dit enzym wel en kunnen permetrine veilig metaboliseren. In katten hoopt permetrine zich op tot toxische niveaus, terwijl honden het snel afbreken en uitscheiden. Dit is een biologisch verschil tussen de soorten.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kan mijn kat ziek worden van knuffelen met een behandelde hond?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja! Als de spot-on druppels nog niet volledig droog zijn, kan permetrine overdragen via contact. Katten kunnen het van de hondenvacht likken of het via hun eigen vacht opnemen. Houd katten altijd weg van behandelde honden tot het product volledig droog en ingetrokken is.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Is er een tegengif voor permetrine vergiftiging?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Nee, er bestaat GEEN specifiek tegengif voor permetrine. Behandeling is ondersteunend: grondig wassen, anti-epileptica om stuipen te stoppen, infuus, koeling bij oververhitting, en intensieve monitoring. Dit maakt snelle actie zo cruciaal - hoe eerder het gif van de huid/uit het lichaam is, hoe beter.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kan mijn kat herstellen van permetrine vergiftiging?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Met zeer snelle en agressieve behandeling kunnen katten herstellen, maar het is een langdurig en intensief proces (dagen tot weken). De prognose hangt af van de hoeveelheid permetrine, hoe snel behandeling start, en de ernst van de stuipen. Bij vertraagde behandeling of ernstige symptomen is de prognose slecht. Hersenschade door stuipen kan permanente neurologische problemen veroorzaken.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Welke vlooienmiddelen zijn veilig voor katten?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Veilige werkzame stoffen voor katten zijn: fipronil (Frontline), selamectine (Stronghold), imidacloprid (Advantage), fluralaner (Bravecto voor katten) en spinetoram (Cheristin). Gebruik alleen producten die expliciet "voor katten" op het etiket vermelden. Bij twijfel altijd de dierenarts raadplegen. Gebruik nooit producten met permetrine, permethrin of pyrethrin bij katten.
              </div>
            </details>
          </div>
        </section>

        {/* Related Safe Foods */}
        <RelatedSafeFoods
          locale="nl"
          animal="katten"
          foods={commonSafeFoods}
          title="Veilige snack alternatieven"
        />

        {/* Medical Disclaimer */}
        <section className="mb-8">
          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl border border-cpAmber/30 dark:border-cpAmber/20 p-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3">
              Medische Disclaimer
            </h3>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 leading-relaxed">
              Deze informatie is bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies. Bij vermoeden van permetrine vergiftiging dient altijd onmiddellijk contact te worden opgenomen met een dierenarts. Permetrine vergiftiging vereist spoedbehandeling voor de beste prognose. De informatie op deze pagina is gebaseerd op veterinaire kennis, maar elke kat is anders en alleen een dierenarts kan een juiste diagnose stellen en behandeling geven.
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
            "headline": "Is Vlooienmiddel voor Honden Giftig voor Katten?",
            "description": "Vlooienmiddel voor honden met permetrine is zeer gevaarlijk voor katten en kan ernstige symptomen veroorzaken. Belangrijke informatie voor katteneigenaren.",
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
              "@id": "https://cutiepawspedia.com/nl/is-vlooienmiddel-hond-giftig-voor-katten"
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
                "name": "Waarom is permetrine dodelijk voor katten maar veilig voor honden?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Katten missen het enzym glucuronyl transferase dat permetrine afbreekt. Honden hebben dit enzym wel. In katten hoopt permetrine zich op tot toxische niveaus."
                }
              },
              {
                "@type": "Question",
                "name": "Kan mijn kat ziek worden van knuffelen met een behandelde hond?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ja, als de spot-on druppels nog niet volledig droog zijn, kan permetrine overdragen via contact. Houd katten altijd weg van behandelde honden tot het product volledig droog is."
                }
              },
              {
                "@type": "Question",
                "name": "Is er een tegengif voor permetrine vergiftiging?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Nee, er bestaat GEEN specifiek tegengif voor permetrine. Behandeling is ondersteunend: grondig wassen, anti-epileptica, infuus, koeling bij oververhitting, en intensieve monitoring."
                }
              },
              {
                "@type": "Question",
                "name": "Kan mijn kat herstellen van permetrine vergiftiging?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Met zeer snelle en agressieve behandeling kunnen katten herstellen, maar het is een langdurig proces (dagen tot weken). De prognose hangt af van de hoeveelheid permetrine en hoe snel behandeling start."
                }
              },
              {
                "@type": "Question",
                "name": "Welke vlooienmiddelen zijn veilig voor katten?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Veilige werkzame stoffen voor katten zijn: fipronil (Frontline), selamectine (Stronghold), imidacloprid (Advantage), fluralaner (Bravecto voor katten). Gebruik ALLEEN producten die expliciet 'voor katten' vermelden. NOOIT permetrine bij katten."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
