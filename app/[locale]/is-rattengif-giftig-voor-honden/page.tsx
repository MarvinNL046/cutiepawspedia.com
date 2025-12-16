/**
 * Pet Toxicity Canonical Page: Rattengif (Rodenticide) - Honden (Dogs)
 * Type: Household
 * Toxicity Level: HOOG (HIGH)
 * Locale: nl (Dutch)
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Phone, Clock, Heart, XCircle } from "lucide-react";
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: "Is Rattengif Giftig voor Honden? | Symptomen & Wat Te Doen",
  description: "Rattengif is zeer giftig voor honden en kan bloedingen, nierfalen en neurologische schade veroorzaken. Herken symptomen en weet wat te doen bij inname.",
  keywords: [
    "rattengif giftig voor honden",
    "hond rattengif gegeten",
    "rattenvergift honden",
    "bloedingen hond rattengif",
    "nierfalen hond",
    "gif honden",
    "spoed dierenarts hond",
    "rattengif vergiftiging hond",
    "hondenveiligheid"
  ],
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "Is Rattengif Giftig voor Honden? Levensgevaarlijk",
    description: "Rattengif is extreem giftig voor honden - kan bloedingen en nierfalen veroorzaken. Noodgids voor hondeneigenaren.",
    type: "article",
  },
};

export default function IsRattengifGiftigVoorHonden() {
  return (
    <div className="bg-background dark:bg-cpCharcoal">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-red-50 via-red-50/50 to-transparent dark:from-red-950/30 dark:via-red-950/10 dark:to-transparent border-b border-border dark:border-red-800/30">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <span className="text-sm font-medium text-red-600">Zeer Giftig Huishoudelijk Gif voor Honden</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
            Is Rattengif Giftig voor Honden?
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
                  Rattengif (rodenticide) is zeer gevaarlijk voor honden. Het kan ernstige inwendige bloedingen, nierfalen, en neurologische schade veroorzaken. Zelfs kleine hoeveelheden kunnen ernstige gezondheidsproblemen veroorzaken. Snelle veterinaire hulp is cruciaal.
                </p>
              </div>
            </div>
          </div>

          {/* Emergency CTA */}
          <div className="bg-red-100 dark:bg-red-900/30 border-2 border-red-400 dark:border-red-700 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-700 dark:text-red-400 flex-shrink-0" />
              <div>
                <p className="text-foreground dark:text-cpCream font-bold mb-2">Noodgeval - Je hond heeft rattengif gegeten?</p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  Bel onmiddellijk je dierenarts of een 24-uurs spoedkliniek. Elke minuut telt. Neem de verpakking van het rattengif mee als je deze kunt vinden.
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
            Deze pagina bevat levensreddende informatie over rattengifvergiftiging bij honden, symptomen, behandeling en preventie.
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
          currentPage="Rattengif voor Honden"
        />

        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Waarom is Rattengif Zo Gevaarlijk voor Honden?
          </h2>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Rattengif (rodenticide) is ontworpen om knaagdieren te doden, maar is ook extreem gevaarlijk voor honden. Het gif wordt vaak in aantrekkelijke vormen gemaakt (blokjes, korrels, pasta) die voor honden lijken op speelgoed of voer. Honden kunnen rattengif eten dat is uitgelegd in huis, schuur, tuin of openbare ruimtes.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Het grootste gevaar is dat veel soorten rattengif vertraagd werken - symptomen kunnen pas 1-7 dagen na inname verschijnen. Tegen die tijd heeft het gif al ernstige schade aangericht aan het bloed en inwendige organen. Er zijn verschillende types rattengif met verschillende werkingsmechanismen, maar allemaal zijn ze gevaarlijk.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Secundaire vergiftiging is ook mogelijk: als je hond een vergiftigde muis of rat opeet, kan hij ook ziek worden. De hoeveelheid gif in één vergiftigde muis is meestal niet dodelijk, maar meerdere muizen kunnen gevaarlijk zijn.
          </p>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-5 mb-6">
            <p className="text-sm text-foreground dark:text-cpCream font-medium mb-2">
              Let op: Verschillende soorten rattengif
            </p>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              Er zijn meerdere types rattengif: anticoagulanten (bloedverdunners zoals warfarin, brodifacoum), cholecalciferol (vitamine D3), bromethaline (neurologisch gif), en fosfiden. Elk type heeft eigen symptomen en behandeling. Neem altijd de verpakking mee naar de dierenarts als dat mogelijk is.
            </p>
          </div>
        </section>

        {/* Toxicity Details */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <AlertTriangle className="h-7 w-7 text-red-600" />
            Hoe Werkt Rattengif bij Honden?
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-red-300/30 p-6 mb-6">
            <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
              De meest voorkomende types rattengif en hun effecten:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Anticoagulanten (80% van rattengif)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Remmen bloedstolling, veroorzaken inwendige bloedingen. Symptomen 1-7 dagen na inname. Zeer gevaarlijk.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Cholecalciferol (Vitamine D3)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Verhoogt calciumwaarden, leidt tot nierfalen. Symptomen binnen 12-36 uur. Zeer moeilijk te behandelen.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Bromethaline</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Neurologisch gif, veroorzaakt hersenoedeem. Symptomen binnen 2-7 dagen. Geen tegengif beschikbaar.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Fosfiden (minder vaak)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Produceert giftig gas in maag. Symptomen binnen 15 minuten tot 4 uur. Zeer acuut gevaarlijk.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800/50 rounded-xl p-5">
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Waarom zo gevaarlijk?</strong> De vertraagde werking van veel rattengif betekent dat eigenaren vaak te laat in actie komen. Ook kunnen honden grote hoeveelheden eten omdat het gif aantrekkelijk ruikt (vaak met pindakaas- of graanachtige geur). Dit is geen toeval - rattengif is gemaakt om aantrekkelijk te zijn voor knaagdieren, maar honden vallen er ook voor.
            </p>
          </div>
        </section>

        {/* Symptoms */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Symptomen van Rattengifvergiftiging bij Honden
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Symptomen variëren per type rattengif en kunnen binnen enkele uren tot een week verschijnen. Let op deze waarschuwingssignalen:
          </p>

          <div className="space-y-4 mb-6">
            {/* Anticoagulant symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-red-300/30 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Anticoagulant Rattengif (Bloedingen)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Bloedneus</strong> (spontaan neusbloeden)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Bloed in urine of ontlasting</strong> (donkere of rode urine/poep)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Bloedend tandvlees</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Blauwe plekken en bloedingen onder huid</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Zwakte, bleekheid, moeite met ademhalen</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Hoesten (bloeding in longen)</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Opgezwollen buik</strong> (inwendige bloedingen)</span>
                </li>
              </ul>
            </div>

            {/* Cholecalciferol symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-red-300/30 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Cholecalciferol (Vitamine D3) - Nierfalen
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Verminderde eetlust</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Overmatig drinken en plassen</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Braken en diarree</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Lusteloosheid en zwakte</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Verminderd of gestopt plassen</strong> (nierfalen)</span>
                </li>
              </ul>
            </div>

            {/* Bromethaline symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-red-300/30 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Bromethaline - Neurologische Symptomen
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Tremoren (trillen, beven)</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Stuipen en toevallen</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Verlamming van achterpoten</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Desoriëntatie en verwardheid</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Extreme lusteloosheid</strong></span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-5">
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Belangrijk:</strong> Symptomen kunnen 1-7 dagen duren voordat ze verschijnen, afhankelijk van het type rattengif. Als je vermoedt dat je hond rattengif heeft gegeten, wacht dan niet op symptomen - ga onmiddellijk naar de dierenarts. Vroege behandeling redt levens.
            </p>
          </div>
        </section>

        {/* What To Do */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Heart className="h-7 w-7 text-cpCoral" />
            Wat Te Doen Als Je Hond Rattengif Heeft Gegeten
          </h2>

          <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-400 dark:border-red-700 rounded-xl p-6 mb-6">
            <p className="text-foreground dark:text-cpCream font-bold mb-4 text-lg">
              Onmiddellijke Actie Vereist - Dit is een NOODGEVAL:
            </p>
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Bel onmiddellijk je dierenarts of spoedkliniek</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Vertel dat je hond rattengif heeft gegeten. Vraag of je direct moet komen. Elke minuut telt - vroege behandeling is cruciaal.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Neem de verpakking of restanten mee</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    De verpakking vertelt de dierenarts welk type rattengif je hond heeft gegeten. Dit bepaalt de behandeling. Maak foto's als je de verpakking niet kunt vinden.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Niet laten braken zonder toestemming dierenarts</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Bij sommige types rattengif (zoals fosfiden) kan braken gevaarlijk zijn. Laat je hond alleen braken als de dierenarts dit instrueert.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  4
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Noteer tijdstip van inname</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Vertel de dierenarts hoe lang geleden je hond het rattengif heeft gegeten (of wanneer je het ontdekte). Dit helpt bij de behandelkeuze.
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
                    Wacht niet op symptomen. Veel rattengif werkt vertraagd, maar de behandeling is het effectiefst als deze vroeg start - vaak voordat symptomen verschijnen.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl border border-cpCoral/30 dark:border-cpCoral/20 p-5">
            <p className="text-sm text-foreground dark:text-cpCream mb-3">
              <strong>Behandeling door de dierenarts:</strong> Afhankelijk van het type rattengif kan de dierenarts braken opwekken, actieve kool geven, een tegengif toedienen (vitamine K bij anticoagulanten), en ondersteunende zorg bieden. Je hond moet mogelijk meerdere dagen gehospitaliseerd worden voor monitoring en behandeling.
            </p>
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Prognose:</strong> Met snelle behandeling (binnen 2-4 uur) is de prognose vaak goed, vooral bij anticoagulant rattengif. Bij vertraagde behandeling of andere types rattengif kan de prognose slechter zijn. Elke minuut telt.
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
              ALTIJD - Bij elke verdenking van rattengif
            </p>
            <p className="text-foreground dark:text-cpCream/90 mb-4">
              Neem onmiddellijk contact op met de dierenarts als:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je <strong>vermoedt</strong> dat je hond rattengif heeft gegeten (zelfs zonder bewijs)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je hond in de buurt is geweest van uitgelegd rattengif</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je hond een dode muis of rat heeft opgegeten</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je hond nog geen symptomen vertoont (wacht hier niet op!)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je hond bloedingen, zwakte, neurologische symptomen of braakneigingen heeft</span>
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
            Preventie: Bescherm Je Hond Tegen Rattengif
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Rattengifvergiftiging is vaak te voorkomen met de juiste voorzorgsmaatregelen:
          </p>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-4">Preventiemaatregelen:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Gebruik veilige rattenvallen</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Kies voor klemvallen of elektronische vallen in plaats van gif. Honden kunnen daar niet bij.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Beveiligde gifboxen</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Als rattengif noodzakelijk is, gebruik dan alleen professionele, afsluitbare gifboxen waar honden niet bij kunnen</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Let op bij wandelingen</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Houd je hond aan de lijn in gebieden waar rattengif kan liggen (bermen, parkeergarages, industrieterreinen)</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Train "laat maar"</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Leer je hond om dingen die hij vindt niet zomaar op te eten zonder jouw toestemming</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Informeer buren</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Vertel buren dat je een hond hebt en vraag ze om beveiligde gifboxen te gebruiken</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Controleer de tuin regelmatig</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Kijk of er geen rattengif in je tuin is gegooid (helaas komt dit voor bij hondenconflicten)</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-300 dark:border-emerald-800/50 p-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-emerald-600" />
              Waarschuwingsborden Rattengif
            </h3>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              In Nederland moeten professionele ongediertebestrijders waarschuwingsborden plaatsen waar rattengif ligt. Let op deze borden bij wandelingen en houd je hond uit de buurt. De borden hebben meestal een blauwe achtergrond met afbeelding van een rat.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veelgestelde Vragen over Rattengif en Honden
          </h2>
          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Hoeveel rattengif is dodelijk voor een hond?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Dit hangt af van het type rattengif, het gewicht van je hond, en of de hond recent gegeten heeft. Zelfs kleine hoeveelheden kunnen gevaarlijk zijn. Een klein hondje kan al ziek worden van een half blokje rattengif. Grote honden kunnen meer verdragen, maar zijn nog steeds in gevaar. Ga ALTIJD naar de dierenarts bij verdenking van rattengif - wacht niet af.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kan mijn hond ziek worden van een vergiftigde muis?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, secundaire vergiftiging is mogelijk. Als je hond een vergiftigde muis opeet, krijgt hij een deel van het rattengif binnen. Eén muis bevat meestal niet genoeg gif om een hond te doden, maar meerdere muizen kunnen gevaarlijk zijn. Ook hangt het af van de grootte van je hond. Neem bij twijfel altijd contact op met je dierenarts.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Wanneer verschijnen symptomen van rattengifvergiftiging?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Dit varieert sterk per type rattengif. Anticoagulanten (meest voorkomend) kunnen 1-7 dagen duren voor symptomen verschijnen. Cholecalciferol (vitamine D3) veroorzaakt symptomen binnen 12-36 uur. Bromethaline kan 2-7 dagen duren. Fosfiden werken zeer snel (15 minuten tot 4 uur). Daarom moet je NIET wachten op symptomen - ga direct naar de dierenarts als je vermoedt dat je hond rattengif heeft gegeten.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Is er een tegengif voor rattengif?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Voor anticoagulant rattengif (meest voorkomend) is vitamine K een effectief tegengif. Je hond moet dit vaak weken tot maanden slikken. Voor andere types rattengif bestaat geen specifiek tegengif - behandeling is dan ondersteunend (vloeistoffen, anti-braakmiddelen, kalmberende middelen bij stuipen). Daarom is snelle behandeling zo belangrijk.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kan mijn hond volledig herstellen van rattengifvergiftiging?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Met vroege en agressieve behandeling kunnen veel honden volledig herstellen van anticoagulant rattengif. Bij andere types (cholecalciferol, bromethaline) kan permanente schade optreden aan nieren of zenuwstelsel. De prognose hangt af van het type gif, de hoeveelheid, en hoe snel behandeling start. Vroege behandeling (binnen 2-4 uur) geeft de beste kans op volledig herstel.
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
              Deze informatie is uitsluitend bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies. Bij elke verdenking van rattengifvergiftiging moet je onmiddellijk contact opnemen met een dierenarts of spoedkliniek. Rattengifvergiftiging is een medisch noodgeval waarbij elke minuut telt. De informatie op deze pagina is gebaseerd op veterinaire kennis en wetenschappelijke bronnen, maar elke hond is anders en alleen een dierenarts kan een juiste diagnose stellen en behandeling geven. Wacht nooit af - bel altijd direct bij verdenking van rattengifcontact.
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
            "headline": "Is Rattengif Giftig voor Honden? Levensgevaarlijk",
            "description": "Rattengif is extreem giftig voor honden - kan bloedingen, nierfalen en neurologische schade veroorzaken. Herken symptomen en weet wat te doen bij inname.",
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
              "@id": "https://cutiepawspedia.com/nl/is-rattengif-giftig-voor-honden"
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
                "name": "Hoeveel rattengif is dodelijk voor een hond?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Dit hangt af van het type rattengif, het gewicht van je hond, en of de hond recent gegeten heeft. Zelfs kleine hoeveelheden kunnen gevaarlijk zijn. Een klein hondje kan al ziek worden van een half blokje rattengif. Ga ALTIJD naar de dierenarts bij verdenking van rattengif - wacht niet af."
                }
              },
              {
                "@type": "Question",
                "name": "Kan mijn hond ziek worden van een vergiftigde muis?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ja, secundaire vergiftiging is mogelijk. Als je hond een vergiftigde muis opeet, krijgt hij een deel van het rattengif binnen. Eén muis bevat meestal niet genoeg gif om een hond te doden, maar meerdere muizen kunnen gevaarlijk zijn."
                }
              },
              {
                "@type": "Question",
                "name": "Wanneer verschijnen symptomen van rattengifvergiftiging?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Dit varieert sterk per type rattengif. Anticoagulanten kunnen 1-7 dagen duren. Cholecalciferol veroorzaakt symptomen binnen 12-36 uur. Bromethaline kan 2-7 dagen duren. Fosfiden werken zeer snel (15 minuten tot 4 uur). Wacht NIET op symptomen - ga direct naar de dierenarts."
                }
              },
              {
                "@type": "Question",
                "name": "Is er een tegengif voor rattengif?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Voor anticoagulant rattengif is vitamine K een effectief tegengif. Je hond moet dit vaak weken tot maanden slikken. Voor andere types rattengif bestaat geen specifiek tegengif - behandeling is dan ondersteunend."
                }
              },
              {
                "@type": "Question",
                "name": "Kan mijn hond volledig herstellen van rattengifvergiftiging?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Met vroege en agressieve behandeling kunnen veel honden volledig herstellen van anticoagulant rattengif. De prognose hangt af van het type gif, de hoeveelheid, en hoe snel behandeling start. Vroege behandeling (binnen 2-4 uur) geeft de beste kans op volledig herstel."
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
