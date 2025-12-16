/**
 * Pet Toxicity Canonical Page: Ui (Onion) - Honden (Dogs)
 * Type: Food
 * Toxicity Level: MIDDEL (MODERATE)
 * Locale: nl (Dutch)
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Apple, Phone, Clock, Heart, AlertCircle } from "lucide-react";
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: "Is Ui Giftig voor Honden? Gevaar van Uien - CutiePawsPedia",
  description: "Ui is giftig voor honden en beschadigt rode bloedcellen, wat bloedarmoede kan veroorzaken. Herken symptomen en weet wat te doen als je hond ui heeft gegeten.",
  keywords: [
    "ui giftig voor honden",
    "uien gevaarlijk honden",
    "hond ui gegeten",
    "bloedarmoede honden ui",
    "giftig voedsel honden",
    "ui vergiftiging hond",
    "rode bloedcellen honden",
    "uientoxiciteit honden"
  ],
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "Is Ui Giftig voor Honden? Gevaar van Uien",
    description: "Ui is giftig voor honden en beschadigt rode bloedcellen, wat bloedarmoede kan veroorzaken. Belangrijke informatie voor hondeneigenaren.",
    type: "article",
  },
};

export default function IsUiGiftigVoorHonden() {
  return (
    <div className="bg-background dark:bg-cpCharcoal">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-orange-50 via-orange-50/50 to-transparent dark:from-orange-950/30 dark:via-orange-950/10 dark:to-transparent border-b border-border dark:border-orange-800/30">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <FoodGuideBreadcrumb
            locale="nl"
            items={[
              { name: "Voedselgids", href: "/nl/voedselgids" },
              { name: "Giftige Stoffen", href: "/nl/giftige-stoffen" },
            ]}
            currentPage="Ui voor Honden"
          />

          <div className="flex items-center gap-2 mb-4 mt-6">
            <Apple className="h-6 w-6 text-orange-600" />
            <span className="text-sm font-medium text-orange-600">Giftig Voedsel voor Honden</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
            Is Ui Giftig voor Honden?
          </h1>

          {/* TL;DR Verdict Box */}
          <div className="bg-orange-500 dark:bg-orange-600 rounded-2xl p-6 mb-6 shadow-lg">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-10 w-10 text-white flex-shrink-0" />
              <div>
                <p className="text-2xl font-bold text-white mb-2">
                  Ja - Giftig (matig tot hoog)
                </p>
                <p className="text-white/95 text-lg leading-relaxed">
                  Ui is giftig voor honden in alle vormen - rauw, gekookt, gedroogd of poeder. Uien bevatten stoffen die rode bloedcellen beschadigen, wat kan leiden tot bloedarmoede (anemie). Zelfs kleine hoeveelheden kunnen schadelijk zijn, vooral bij herhaalde inname. Grotere hoeveelheden kunnen gevaarlijk zijn.
                </p>
              </div>
            </div>
          </div>

          {/* Warning CTA */}
          <div className="bg-orange-100 dark:bg-orange-900/30 border-2 border-orange-400 dark:border-orange-700 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-orange-700 dark:text-orange-400 flex-shrink-0" />
              <div>
                <p className="text-foreground dark:text-cpCream font-bold mb-2">Je hond heeft ui gegeten?</p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  Bel direct je dierenarts, vooral als je hond een grote hoeveelheid heeft gegeten of een kleine hond is. Uivergiftiging kan serieus zijn en symptomen kunnen pas na enkele dagen optreden. Vroegtijdige behandeling is belangrijk.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-foreground dark:text-cpCream">
                    <Phone className="inline h-4 w-4 mr-1" />
                    <strong>Dierenarts bellen voor advies</strong>
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
                Vind een dierenarts in je buurt →
              </Link>
            </Button>
          </div>

          <p className="text-muted-foreground dark:text-cpCream/80 text-sm">
            Deze pagina bevat belangrijke informatie over uivergiftiging bij honden, symptomen, behandeling en preventie.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">
        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Waarom Is Ui Giftig voor Honden?
          </h2>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Uien behoren tot de Allium-familie (samen met knoflook, prei, bieslook en sjalot) en zijn giftig voor honden. Ze bevatten verbindingen genaamd thiosulfaten en organosulfiden die voor mensen onschadelijk zijn, maar die honden niet kunnen afbreken.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Deze stoffen beschadigen de rode bloedcellen van je hond, waardoor ze uit elkaar vallen (oxidatieve schade). Dit leidt tot bloedarmoede (te weinig gezonde rode bloedcellen), wat betekent dat je hond minder zuurstof door zijn lichaam kan transporteren. In ernstige gevallen kan dit levensbedreigend zijn.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Het gevaarlijke aan uivergiftiging is dat symptomen vaak pas na 1-4 dagen optreden, wanneer de schade aan de rode bloedcellen al is aangericht. Daarom is het belangrijk om direct contact op te nemen met je dierenarts als je hond ui heeft gegeten, ook als hij nog geen symptomen vertoont.
          </p>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-5 mb-6">
            <p className="text-sm text-foreground dark:text-cpCream font-medium mb-2">
              Let op: Alle vormen van ui zijn giftig
            </p>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              Rauwe ui, gekookte ui, gebakken ui, gedroogde ui en uienpoeder zijn allemaal giftig voor honden. Ook voedsel bereid met ui (zoals soep, saus, pizza, brood met ui) kan gevaarlijk zijn. De toxische stoffen blijven actief na verhitting of drogen.
            </p>
          </div>
        </section>

        {/* Toxicity Details */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <AlertTriangle className="h-7 w-7 text-orange-600" />
            Hoe Beschadigt Ui de Rode Bloedcellen?
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-orange-300/30 p-6 mb-6">
            <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
              Het vergiftigingsproces verloopt in stappen:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-xl flex-shrink-0">1.</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Inname van ui</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Hond eet voedsel met ui (rauw, gekookt, poeder of gedroogd)</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-xl flex-shrink-0">2.</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Opname in bloedbaan</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Thiosulfaten worden opgenomen vanuit de maag en darmen</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-xl flex-shrink-0">3.</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Oxidatieve schade aan rode bloedcellen</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">De gifstoffen veroorzaken chemische schade aan hemoglobine (zuurstofdrager)</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-xl flex-shrink-0">4.</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Hemolyse (uiteenvallen bloedcellen)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Beschadigde rode bloedcellen worden afgebroken of barsten</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-xl flex-shrink-0">5.</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Bloedarmoede (anemie)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Te weinig gezonde rode bloedcellen → zuurstoftekort in het lichaam</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-300 dark:border-orange-800/50 rounded-xl p-5">
            <p className="text-sm text-foreground dark:text-cpCream mb-2">
              <strong>Hoeveel ui is gevaarlijk?</strong> De toxiciteit hangt af van het gewicht van je hond en de hoeveelheid gegeten ui. Zelfs kleine hoeveelheden kunnen bij herhaalde inname cumulatieve schade veroorzaken. Er bestaat geen bekende veilige dosering. Neem bij twijfel altijd contact op met je dierenarts.
            </p>
          </div>
        </section>

        {/* Symptoms */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Symptomen van Uivergiftiging bij Honden
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Symptomen treden meestal pas op na 1-4 dagen na inname, wanneer de rode bloedcellen beschadigd zijn en bloedarmoede ontstaat. Dit maakt uivergiftiging verraderlijk - je hond lijkt aanvankelijk normaal maar wordt geleidelijk zieker:
          </p>

          <div className="space-y-4 mb-6">
            {/* Early symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-cpAmber" />
                Vroege Symptomen (24-48 uur na inname)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5">•</span>
                  <span><strong>Maag-darmklachten</strong> (braken, diarree, buikpijn)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5">•</span>
                  <span><strong>Verlies van eetlust</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5">•</span>
                  <span><strong>Lusteloosheid</strong> (minder actief dan normaal)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5">•</span>
                  <span><strong>Speekselvloed</strong></span>
                </li>
              </ul>
            </div>

            {/* Progressive symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-orange-300/30 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Symptomen van Bloedarmoede (2-7 dagen na inname)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Bleke tandvlees en tong</strong> (in plaats van gezond roze)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Zwakte en vermoeidheid</strong> (snel moe, wil niet wandelen)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Snelle ademhaling</strong> (hijgen zonder inspanning)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Verhoogde hartslag</strong> (hart moet harder werken)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Donkere of roodbruine urine</strong> (afgebroken rode bloedcellen)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Geelzucht</strong> (gelige verkleuring ogen en tandvlees)</span>
                </li>
              </ul>
            </div>

            {/* Severe symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-red-300/30 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Ernstige Symptomen (Bij Zware Vergiftiging)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Bewusteloosheid of flauwvallen</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Toevallen</strong> (stuipen)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Extreme zwakte</strong> (kan niet meer staan)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Orgaanfalen</strong> (nieren, lever)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-5">
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Belangrijk:</strong> Symptomen kunnen vertraagd optreden en geleidelijk verergeren. Als je hond ui heeft gegeten, wacht niet op symptomen - bel direct je dierenarts. Vroege behandeling voorkomt ernstige bloedarmoede en verhoogt de kans op volledig herstel aanzienlijk.
            </p>
          </div>
        </section>

        {/* What To Do */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Heart className="h-7 w-7 text-cpCoral" />
            Wat Te Doen Als Je Hond Ui Heeft Gegeten
          </h2>

          <div className="bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-400 dark:border-orange-700 rounded-xl p-6 mb-6">
            <p className="text-foreground dark:text-cpCream font-bold mb-4 text-lg">
              Direct actie vereist:
            </p>
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Bel onmiddellijk je dierenarts</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Neem direct contact op met je dierenarts en vertel hoeveel ui je hond ongeveer heeft gegeten, wanneer dit was, en wat het gewicht van je hond is. Dit helpt de dierenarts inschatten hoe ernstig de situatie is.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Probeer NIET zelf te laten braken</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Laat je hond alleen braken als de dierenarts dit expliciet instrueert. Braken kan in bepaalde situaties gevaarlijk zijn en moet onder medische begeleiding gebeuren.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Ga naar de dierenarts als geadviseerd</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Als de dierenarts je vraagt te komen, doe dit dan direct. Als de inname recent was (binnen 1-2 uur), kan de dierenarts braken opwekken of actieve kool geven om verdere opname te voorkomen.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                  4
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Monitor je hond nauwgezet</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Houd je hond de komende 5-7 dagen scherp in de gaten. Let op tandvleeskleur (bleke tandvlees = bloedarmoede), urinekleur (donkere urine = bloedcelafbraak), energieniveau en eetlust. Bij enig zorgsignaal meteen de dierenarts bellen.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                  5
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Volg alle behandelinstructies op</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Als je hond behandeling nodig heeft, volg dan alle instructies van de dierenarts nauwgezet op. Dit kan bloedonderzoek, infuustherapie of ziekenhuisopname omvatten.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl border border-cpCoral/30 dark:border-cpCoral/20 p-5">
            <p className="text-sm text-foreground dark:text-cpCream mb-3">
              <strong>Behandeling door de dierenarts:</strong> Behandeling hangt af van hoelang geleden je hond ui heeft gegeten en hoeveel. Vroege behandeling kan braken opwekken, actieve kool, en infuustherapie omvatten. Bij bloedarmoede kan je hond ziekenhuisopname, bloedtransfusies en ondersteunende zorg nodig hebben. Bloedonderzoek monitort de rode bloedcellen gedurende meerdere dagen.
            </p>
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Prognose:</strong> Met vroege behandeling is de prognose meestal goed. Milde vergiftiging herstelt vaak volledig binnen 1-2 weken. Ernstige bloedarmoede kan langer duren (2-4 weken) en intensievere behandeling vereisen. De prognose hangt sterk af van hoeveel ui is gegeten en hoe snel behandeling start.
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
              Altijd direct contact opnemen bij:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span><strong>Elke vorm van ui-inname</strong> - bel altijd, ook als je hond zich nog normaal gedraagt</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span><strong>Bleke tandvlees of tong</strong> (teken van bloedarmoede)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span><strong>Donkere of roodbruine urine</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span><strong>Extreme vermoeidheid of zwakte</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span><strong>Snelle ademhaling of verhoogde hartslag</strong> in rust</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span><strong>Geelzucht</strong> (gele verkleuring ogen/tandvlees)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span><strong>Bewusteloosheid of toevallen</strong> (spoed!)</span>
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
              Maak je zorgen om je hond? Vind snel een dierenarts bij jou in de buurt.
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
            Preventie: Ui Weghouden van Honden
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            De beste manier om uivergiftiging te voorkomen is door ui volledig uit het dieet van je hond te weren:
          </p>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-4">Preventiemaatregelen:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Geen tafelrestjes met ui</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Geef nooit menselijk eten met ui aan je hond - ook niet "een heel klein beetje"</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Let op verwerkte producten</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Veel kant-en-klaar eten bevat ui of uienpoeder: babyfood, soepen, sauzen, bouillon, chips</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Bewaar ui veilig</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Zorg dat rauwe uien, knoflook en andere Alliums buiten bereik van je hond zijn</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Waarschuw gasten</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Zorg dat bezoekers weten dat ze je hond geen voedsel mogen geven</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Let op pizza, hamburgers en andere fastfood</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Deze bevatten vaak ui en zijn zeer aantrekkelijk voor honden</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-300 dark:border-emerald-800/50 p-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
              <Apple className="h-5 w-5 text-emerald-600" />
              Let Ook Op Deze Giftige Alliums
            </h3>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
              Alle planten in de Allium-familie zijn giftig voor honden:
            </p>
            <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
              <li className="flex items-center gap-2">
                <span className="text-orange-600">•</span> Ui (alle soorten)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-600">•</span> Knoflook (nog giftiger!)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-600">•</span> Prei
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-600">•</span> Bieslook
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-600">•</span> Sjalot
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-600">•</span> Lente-ui
              </li>
            </ul>
          </div>
        </section>

        {/* Related Safe Foods */}
        <RelatedSafeFoods
          locale="nl"
          animal="honden"
          foods={commonSafeFoods}
          title="Veilige snack alternatieven"
        />

        {/* Related Articles */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">
            Meer over Giftig Voedsel en Dierengezondheid
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/nl/is-chocolade-giftig-voor-honden" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Is Chocolade Giftig voor Honden?</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Gevaarlijk voedsel voor honden →</p>
            </Link>
            <Link href="/nl/gids/dierengezondheid" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Dierengezondheid Gids</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Complete gids voor een gezonde hond →</p>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veelgestelde Vragen over Ui en Honden
          </h2>
          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Is gekookte ui ook giftig voor honden?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, gekookte ui is net zo giftig als rauwe ui. Koken vernietigt de toxische verbindingen (thiosulfaten) niet - ze blijven volledig actief. Ook gebakken ui, gekarameliseerde ui, gedroogde ui en uienpoeder zijn giftig. Alle bereidingsvormen van ui zijn gevaarlijk voor honden.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Hoeveel ui is gevaarlijk voor mijn hond?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                De toxische dosis is ongeveer 5 gram ui per kilogram lichaamsgewicht. Voor een kleine hond van 5 kg is dit slechts 25 gram (ongeveer één kleine ui). Voor een grote hond van 30 kg zou dit 150 gram zijn (ongeveer 1-2 middelgrote uien). Maar ook kleinere hoeveelheden kunnen bij herhaalde inname cumulatieve schade veroorzaken. Neem bij twijfel altijd contact op met je dierenarts.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Wanneer verschijnen symptomen na het eten van ui?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Dit is verraderlijk: symptomen treden meestal pas op na 1-4 dagen na inname. Je hond kan aanvankelijk normaal lijken, maar geleidelijk zieker worden naarmate de rode bloedcellen beschadigd raken en bloedarmoede ontstaat. Daarom is het zo belangrijk om direct contact op te nemen met je dierenarts als je hond ui heeft gegeten, ook als hij nog geen symptomen vertoont. Vroege behandeling kan ernstige bloedarmoede voorkomen.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kan mijn hond herstellen van uivergiftiging?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, met snelle en adequate behandeling herstellen de meeste honden volledig van uivergiftiging. Milde vergiftiging herstelt vaak binnen 1-2 weken. Bij ernstige bloedarmoede kan herstel 2-4 weken duren en intensievere behandeling (zoals bloedtransfusies) nodig zijn. De prognose hangt sterk af van hoeveel ui is gegeten, het gewicht van je hond, en hoe snel behandeling start. Vroege interventie is cruciaal voor een goede uitkomst.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Is uienpoeder ook gevaarlijk?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, uienpoeder is zelfs geconcentreerder en daarom potentieel gevaarlijker dan verse ui. Veel kant-en-klaar voedsel en kruiden bevatten uienpoeder: babyfood, bouillonblokjes, soeppoeders, smaakmakers, en sommige hondensnacks van lage kwaliteit. Lees altijd ingrediëntenlijsten zorgvuldig en geef nooit menselijk eten aan je hond zonder te controleren op ui of uienpoeder.
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
              Deze informatie is uitsluitend bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies. Bij verdenking van uivergiftiging moet je ONMIDDELLIJK contact opnemen met een dierenarts. Uivergiftiging kan ernstig zijn en symptomen treden vaak vertraagd op. De informatie op deze pagina is gebaseerd op veterinaire kennis en wetenschappelijke bronnen, maar elke hond is anders en alleen een dierenarts kan een juiste diagnose stellen en behandeling geven. Bij twijfel, neem altijd contact op met je dierenarts.
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
            "headline": "Is Ui Giftig voor Honden? Gevaar van Uien",
            "description": "Ui is giftig voor honden en beschadigt rode bloedcellen, wat bloedarmoede kan veroorzaken. Herken symptomen en weet wat te doen als je hond ui heeft gegeten.",
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
              "@id": "https://cutiepawspedia.com/nl/is-ui-giftig-voor-honden"
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
                "name": "Is gekookte ui ook giftig voor honden?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ja, gekookte ui is net zo giftig als rauwe ui. Koken vernietigt de toxische verbindingen (thiosulfaten) niet - ze blijven volledig actief. Ook gebakken ui, gekarameliseerde ui, gedroogde ui en uienpoeder zijn giftig. Alle bereidingsvormen van ui zijn gevaarlijk voor honden."
                }
              },
              {
                "@type": "Question",
                "name": "Hoeveel ui is gevaarlijk voor mijn hond?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "De toxische dosis is ongeveer 5 gram ui per kilogram lichaamsgewicht. Voor een kleine hond van 5 kg is dit slechts 25 gram (ongeveer één kleine ui). Voor een grote hond van 30 kg zou dit 150 gram zijn (ongeveer 1-2 middelgrote uien). Maar ook kleinere hoeveelheden kunnen bij herhaalde inname cumulatieve schade veroorzaken."
                }
              },
              {
                "@type": "Question",
                "name": "Wanneer verschijnen symptomen na het eten van ui?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Dit is verraderlijk: symptomen treden meestal pas op na 1-4 dagen na inname. Je hond kan aanvankelijk normaal lijken, maar geleidelijk zieker worden naarmate de rode bloedcellen beschadigd raken en bloedarmoede ontstaat. Daarom is het zo belangrijk om direct contact op te nemen met je dierenarts als je hond ui heeft gegeten, ook als hij nog geen symptomen vertoont."
                }
              },
              {
                "@type": "Question",
                "name": "Kan mijn hond herstellen van uivergiftiging?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ja, met snelle en adequate behandeling herstellen de meeste honden volledig van uivergiftiging. Milde vergiftiging herstelt vaak binnen 1-2 weken. Bij ernstige bloedarmoede kan herstel 2-4 weken duren en intensievere behandeling (zoals bloedtransfusies) nodig zijn. De prognose hangt sterk af van hoeveel ui is gegeten, het gewicht van je hond, en hoe snel behandeling start."
                }
              },
              {
                "@type": "Question",
                "name": "Is uienpoeder ook gevaarlijk?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ja, uienpoeder is zelfs geconcentreerder en daarom potentieel gevaarlijker dan verse ui. Veel kant-en-klaar voedsel en kruiden bevatten uienpoeder: babyfood, bouillonblokjes, soeppoeders, smaakmakers, en sommige hondensnacks van lage kwaliteit. Lees altijd ingrediëntenlijsten zorgvuldig."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
