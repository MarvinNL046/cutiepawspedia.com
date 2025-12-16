/**
 * Pet Toxicity Canonical Page: Wasmiddel Pods - Honden (Dogs)
 * Type: Household
 * Toxicity Level: MIDDEL (MEDIUM)
 * Locale: nl (Dutch)
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Package, Phone, Clock, Heart, AlertCircle } from "lucide-react";
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: "Zijn Wasmiddel Pods Giftig voor Honden? Gevaarlijk - CutiePawsPedia",
  description: "Wasmiddel pods zijn giftig voor honden - geconcentreerde chemicaliën kunnen maag/darm irritatie, braken en ademhalingsproblemen veroorzaken. Herken symptomen en weet wat te doen.",
  keywords: [
    "wasmiddel pods giftig voor honden",
    "hond wasmiddel pod gegeten",
    "wasmachine capsules honden",
    "hond wasmiddel vergiftiging",
    "huishoudchemicaliën honden",
    "wasmiddel pods gevaarlijk",
    "hond zeep gegeten"
  ],
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "Zijn Wasmiddel Pods Giftig voor Honden? Gevaarlijk",
    description: "Wasmiddel pods zijn giftig voor honden - geconcentreerde chemicaliën veroorzaken irritatie. Veiligheidsgids voor hondeneigenaren.",
    type: "article",
  },
};

export default function IsWasmiddelPodsGiftigVoorHonden() {
  return (
    <div className="bg-background dark:bg-cpCharcoal">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-orange-50 via-orange-50/50 to-transparent dark:from-orange-950/30 dark:via-orange-950/10 dark:to-transparent border-b border-border dark:border-orange-800/30">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          {/* Breadcrumb with JSON-LD Schema */}
          <FoodGuideBreadcrumb
            locale="nl"
            items={[
              { name: "Voedselgids", href: "/nl/voedselgids" },
              { name: "Giftige Stoffen", href: "/nl/giftige-stoffen" },
            ]}
            currentPage="Wasmiddel Pods voor Honden"
          />

          <div className="flex items-center gap-2 mb-4">
            <Package className="h-6 w-6 text-orange-600" />
            <span className="text-sm font-medium text-orange-600">Giftig Huishoudproduct voor Honden</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
            Zijn Wasmiddel Pods Giftig voor Honden?
          </h1>

          {/* TL;DR Verdict Box */}
          <div className="bg-orange-600 dark:bg-orange-700 rounded-2xl p-6 mb-6 shadow-lg">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-10 w-10 text-white flex-shrink-0" />
              <div>
                <p className="text-2xl font-bold text-white mb-2">
                  Ja - Gevaarlijk
                </p>
                <p className="text-white/95 text-lg leading-relaxed">
                  Wasmiddel pods zijn giftig voor honden. De geconcentreerde chemicaliën in pods kunnen ernstige maag/darm irritatie, braken, diarree en ademhalingsproblemen veroorzaken. Het omhulsel lost snel op, waardoor het gif direct vrijkomt. Snelle actie is belangrijk.
                </p>
              </div>
            </div>
          </div>

          {/* Emergency CTA */}
          <div className="bg-orange-100 dark:bg-orange-900/30 border-2 border-orange-400 dark:border-orange-700 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-orange-700 dark:text-orange-400 flex-shrink-0" />
              <div>
                <p className="text-foreground dark:text-cpCream font-bold mb-2">Je hond heeft een wasmiddel pod gegeten?</p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  Bel onmiddellijk je dierenarts. Zelfs één pod kan gevaarlijk zijn. Laat je hond niet braken zonder toestemming van de dierenarts.
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
              className="bg-orange-700 text-white hover:bg-orange-800 rounded-xl w-full md:w-auto"
            >
              <Link href="/nl/netherlands">
                Vind direct een dierenarts →
              </Link>
            </Button>
          </div>

          <p className="text-muted-foreground dark:text-cpCream/80 text-sm">
            Deze pagina bevat belangrijke informatie over wasmiddel pods-vergiftiging bij honden, symptomen, behandeling en preventie.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">
        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Waarom Zijn Wasmiddel Pods Gevaarlijk voor Honden?
          </h2>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Wasmiddel pods (wasmachine capsules) zijn compact en geconcentreerd - één pod bevat dezelfde hoeveelheid wasmiddel als 30-50ml vloeibaar wasmiddel. Dit maakt ze effectief voor de was, maar ook extra gevaarlijk voor honden. Het oplosbare omhulsel breekt snel af in contact met speeksel of maagvocht, waardoor de geconcentreerde chemicaliën direct vrijkomen.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Honden worden aangetrokken door de geur, kleurrijke uitstraling en zachte textuur van pods. Ze lijken op speelgoed of snoep. Het omhulsel is gemaakt van polyvinylalcohol (PVA), wat irriterend is voor de maag. De wasmiddelchemicaliën zelf (oppervlakte-actieve stoffen, enzymen, parfums, bleek) zijn ook toxisch.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Het gevaar is dat het gif geconcentreerd is. Normaal wasmiddel wordt verdund in water, maar bij het eten van een pod komt de volle concentratie direct in het maag-darmstelsel. Dit kan ernstige irritatie, brandwonden en systemische effecten veroorzaken.
          </p>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-5 mb-6">
            <p className="text-sm text-foreground dark:text-cpCream font-medium mb-2">
              Let op: Pods zijn gevaarlijker dan gewoon wasmiddel
            </p>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              Door de extreme concentratie in pods is één pod veel gevaarlijker dan een paar slokjes gewoon wasmiddel. Ook het schuimende effect maakt pods extra problematisch - schuim kan in de luchtwegen terechtkomen.
            </p>
          </div>
        </section>

        {/* Toxicity Details */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <AlertTriangle className="h-7 w-7 text-orange-600" />
            Wat Zit Er in Wasmiddel Pods?
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-orange-300/30 p-6 mb-6">
            <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
              Gevaarlijke ingrediënten in wasmiddel pods:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Oppervlakte-actieve stoffen (tensiden)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Irriteren maag/darm, veroorzaken braken en diarree, produceren schuim</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Enzymen</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Breken eiwitten en vetten af - ook in levende weefsels (irriterend)</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Bleekmiddelen (in sommige pods)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Chemische brandwonden aan maag/slokdarm</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Parfums en kleurstoffen</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Allergische reacties mogelijk</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">PVA-omhulsel</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Lost snel op, irriteert maag</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-300 dark:border-orange-800/50 rounded-xl p-5">
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Schuimvorming is extra gevaarlijk:</strong> Wanneer de pod opengaat, ontstaat er veel schuim. Dit schuim kan worden ingeademd en in de luchtwegen terechtkomen, wat ademhalingsproblemen veroorzaakt. Ook kan schuim de maag uitrekken, wat extra ongemak geeft.
            </p>
          </div>
        </section>

        {/* Symptoms */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Symptomen van Wasmiddel Pods-Vergiftiging
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Symptomen verschijnen meestal binnen 15 minuten tot 2 uur na inname:
          </p>

          <div className="space-y-4 mb-6">
            {/* Mild symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-cpAmber" />
                Veelvoorkomende Symptomen
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Braken</strong> (vaak herhaaldelijk, soms met schuim)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Speekselvloed</strong> (excessief kwijlen)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Diarree</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Buikpijn</strong> (ineengedoken houding, janken)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Verlies van eetlust</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Lusteloosheid</strong></span>
                </li>
              </ul>
            </div>

            {/* Severe symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-orange-300/30 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Ernstigere Symptomen (Grote Hoeveelheid of Gevoelige Hond)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Hoesten en kokhalzen</strong> (schuim in luchtwegen)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Moeite met ademhalen</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Schuim uit mond en neus</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Brandwonden in mond</strong> (bij pods met bleek)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Uitdroging</strong> (door veel braken/diarree)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Zwakte en trillend</strong></span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-5">
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Belangrijk:</strong> De ernst hangt af van de grootte van je hond, het type pod (met of zonder bleek), en hoeveel je hond heeft gegeten. Kleine honden zijn kwetsbaarder. Neem altijd contact op met je dierenarts, zelfs bij milde symptomen.
            </p>
          </div>
        </section>

        {/* What To Do */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Heart className="h-7 w-7 text-cpCoral" />
            Wat Te Doen Als Je Hond een Wasmiddel Pod Heeft Gegeten
          </h2>

          <div className="bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-400 dark:border-orange-700 rounded-xl p-6 mb-6">
            <p className="text-foreground dark:text-cpCream font-bold mb-4 text-lg">
              Directe Actie Vereist:
            </p>
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Bel onmiddellijk je dierenarts</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Vertel welk type pod (merk, met of zonder bleek), hoe lang geleden, en of je hond al braakt. De dierenarts adviseert of je direct moet komen.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Niet laten braken zonder toestemming</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Door het schuim en de irriterende stoffen kan braken gevaarlijk zijn. Laat dit alleen doen als de dierenarts het instrueert.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Bied geen water of voer aan</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Wacht met water geven tot je dierenarts adviseert. Water kan het schuimen verergeren.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                  4
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Neem verpakking mee</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Breng de verpakking mee naar de dierenarts zodat ze de exacte ingrediënten kunnen zien.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                  5
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Monitor ademhaling</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Let op tekenen van ademhalingsproblemen (piepende ademhaling, schuim uit neus). Dit is een noodgeval.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl border border-cpCoral/30 dark:border-cpCoral/20 p-5">
            <p className="text-sm text-foreground dark:text-cpCream mb-3">
              <strong>Behandeling door de dierenarts:</strong> De dierenarts kan braken opwekken (alleen als inname zeer recent was), actieve kool geven (minder effectief bij pods), een infuus geven tegen uitdroging, anti-braakmiddelen toedienen, en medicatie geven om de maag te beschermen. Bij ademhalingsproblemen kan zuurstof nodig zijn.
            </p>
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Prognose:</strong> De meeste honden herstellen binnen 24-48 uur met ondersteunende zorg. Ernstige gevallen (veel braken, ademhalingsproblemen) kunnen langer duren. Permanente schade is zeldzaam maar mogelijk bij ernstige brandwonden.
            </p>
          </div>
        </section>

        {/* When to Contact Vet */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Wanneer Contact Opnemen met de Dierenarts?
          </h2>

          <div className="bg-orange-100 dark:bg-orange-900/30 border-2 border-orange-400 dark:border-orange-700 rounded-xl p-6 mb-6">
            <p className="text-foreground dark:text-cpCream font-bold mb-3 text-lg">
              Altijd - bij elke verdenking
            </p>
            <p className="text-foreground dark:text-cpCream/90 mb-4">
              Neem onmiddellijk contact op met de dierenarts als:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span>Je <strong>vermoedt</strong> dat je hond een pod heeft gegeten</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span>Je hond begint te <strong>braken of kwijlen</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span>Je hond <strong>schuim uit mond of neus</strong> heeft</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span>Je hond <strong>moeite heeft met ademhalen</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span>Symptomen <strong>niet verbeteren na 2-4 uur</strong></span>
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
                <span><strong>Je eigen dierenarts</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span><strong>Dierennoodhulp 24/7:</strong> 0900-0245</span>
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
              Heb je advies nodig? Vind snel een dierenarts bij jou in de buurt.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-cpCoral hover:bg-white/90 rounded-xl"
            >
              <Link href="/nl/netherlands">
                Vind dierenarts →
              </Link>
            </Button>
          </div>
        </section>

        {/* Prevention */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Preventie: Bescherm Je Hond Tegen Wasmiddel Pods
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Berg pods veilig op</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Bewaar in hoge, afgesloten kasten. Pods zijn kleurrijk en ruiken aantrekkelijk voor honden.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Sluit verpakking goed af</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Gebruik originele childproof verpakking</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Laat pods niet rondslingeren</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Doe pod direct in wasmachine, laat niet op wasmand of vloer liggen</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Overweeg gewoon wasmiddel</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Vloeibaar of poeder wasmiddel is minder geconcentreerd en dus minder gevaarlijk</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veelgestelde Vragen
          </h2>
          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Is één wasmiddel pod dodelijk voor een hond?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Eén pod is zelden dodelijk, maar kan wel ernstige ziekte veroorzaken. Kleine honden ({'<'}5kg) lopen meer risico op ernstige symptomen. De meeste honden herstellen met ondersteunende zorg, maar ga altijd naar de dierenarts bij inname.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Waarom is een wasmiddel pod gevaarlijker dan gewoon wasmiddel?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Pods bevatten 5-10x meer geconcentreerde chemicaliën dan dezelfde hoeveelheid vloeibaar wasmiddel. Het oplosbare omhulsel breekt snel af, waardoor alle chemicaliën tegelijk vrijkomen. Dit veroorzaakt ernstigere irritatie en meer schuimvorming.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kan ik mijn hond water laten drinken na het eten van een pod?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Bel eerst je dierenarts. Water kan het schuimen verergeren, wat ademhalingsproblemen kan veroorzaken. De dierenarts adviseert of water veilig is. Forceer nooit water als je hond niet wil drinken.
              </div>
            </details>
          </div>

          {/* Safe Food Alternatives */}
          <RelatedSafeFoods
            locale="nl"
            animal="honden"
            foods={commonSafeFoods}
            title="Veilige snack alternatieven"
          />
        </section>

        {/* Medical Disclaimer */}
        <section className="mb-8">
          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl border border-cpAmber/30 dark:border-cpAmber/20 p-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3">
              Medische Disclaimer
            </h3>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 leading-relaxed">
              Deze informatie is uitsluitend bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies. Bij wasmiddel pods-vergiftiging moet je altijd contact opnemen met een dierenarts. Alleen een dierenarts kan een juiste diagnose stellen en behandeling geven.
            </p>
          </div>
        </section>
      </article>

      {/* Schema.org Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Zijn Wasmiddel Pods Giftig voor Honden? Gevaarlijk",
            "description": "Wasmiddel pods zijn giftig voor honden - geconcentreerde chemicaliën kunnen maag/darm irritatie en ademhalingsproblemen veroorzaken.",
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
              "@id": "https://cutiepawspedia.com/nl/is-wasmiddel-pods-giftig-voor-honden"
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
                "name": "Is één wasmiddel pod dodelijk voor een hond?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Eén pod is zelden dodelijk, maar kan wel ernstige ziekte veroorzaken. Kleine honden lopen meer risico. De meeste honden herstellen met ondersteunende zorg, maar ga altijd naar de dierenarts bij inname."
                }
              },
              {
                "@type": "Question",
                "name": "Waarom is een wasmiddel pod gevaarlijker dan gewoon wasmiddel?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Pods bevatten 5-10x meer geconcentreerde chemicaliën dan dezelfde hoeveelheid vloeibaar wasmiddel. Het oplosbare omhulsel breekt snel af, waardoor alle chemicaliën tegelijk vrijkomen."
                }
              },
              {
                "@type": "Question",
                "name": "Kan ik mijn hond water laten drinken na het eten van een pod?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Bel eerst je dierenarts. Water kan het schuimen verergeren, wat ademhalingsproblemen kan veroorzaken. De dierenarts adviseert of water veilig is."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
