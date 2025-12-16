/**
 * Pet Toxicity Canonical Page: Rozijnen (Raisins) - Katten (Cats)
 * Type: Food
 * Toxicity Level: HOOG (HIGH)
 * Locale: nl (Dutch)
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Grape, Phone, Clock, Heart, XCircle } from "lucide-react";
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: "Is Rozijnen Giftig voor Katten? | Symptomen & Wat Te Doen - CutiePawsPedia",
  description: "Rozijnen zijn zeer giftig voor katten - geconcentreerde toxine kan acuut nierfalen veroorzaken. Gevaarlijker dan druiven. Herken symptomen en weet wat te doen.",
  keywords: [
    "rozijnen giftig voor katten",
    "kat rozijnen gegeten",
    "rozijnen katten nierfalen",
    "gedroogde druiven giftig katten",
    "rozijnen toxiciteit katten",
    "spoed dierenarts kat",
    "rozijnen vergiftiging kat",
    "kat krenten gegeten"
  ],
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "Is Rozijnen Giftig voor Katten? Extra Gevaarlijk",
    description: "Rozijnen zijn zeer giftig voor katten - geconcentreerde toxine kan acuut nierfalen veroorzaken. Gevaarlijker dan verse druiven.",
    type: "article",
  },
};

export default function IsRozijnenGiftigVoorKatten() {
  return (
    <div className="bg-background dark:bg-cpCharcoal">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-red-50 via-red-50/50 to-transparent dark:from-red-950/30 dark:via-red-950/10 dark:to-transparent border-b border-border dark:border-red-800/30">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          {/* Breadcrumb with JSON-LD Schema */}
          <FoodGuideBreadcrumb
            locale="nl"
            items={[
              { name: "Voedselgids", href: "/nl/voedselgids" },
              { name: "Giftige Stoffen", href: "/nl/giftige-stoffen" },
            ]}
            currentPage="Rozijnen voor Katten"
          />

          <div className="flex items-center gap-2 mb-4">
            <Grape className="h-6 w-6 text-red-600" />
            <span className="text-sm font-medium text-red-600">Zeer Giftig Voedsel voor Katten</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
            Is Rozijnen Giftig voor Katten?
          </h1>

          {/* TL;DR Verdict Box */}
          <div className="bg-red-600 dark:bg-red-700 rounded-2xl p-6 mb-6 shadow-lg">
            <div className="flex items-start gap-4">
              <XCircle className="h-10 w-10 text-white flex-shrink-0" />
              <div>
                <p className="text-2xl font-bold text-white mb-2">
                  Ja - Zeer giftig en gevaarlijk
                </p>
                <p className="text-white/95 text-lg leading-relaxed">
                  Rozijnen (gedroogde druiven) zijn zeer giftig voor katten en nog gevaarlijker dan verse druiven. Door het droogproces is de giftige stof geconcentreerd, waardoor een kleine hoeveelheid rozijnen ernstiger kan zijn dan een grotere hoeveelheid druiven. Rozijnen kunnen acuut nierfalen veroorzaken dat zonder behandeling fataal is.
                </p>
              </div>
            </div>
          </div>

          {/* Emergency CTA */}
          <div className="bg-red-100 dark:bg-red-900/30 border-2 border-red-400 dark:border-red-700 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-700 dark:text-red-400 flex-shrink-0" />
              <div>
                <p className="text-foreground dark:text-cpCream font-bold mb-2">Noodgeval - Je kat heeft rozijnen gegeten?</p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  Neem onmiddellijk contact op met je dierenarts of een 24-uurs spoedkliniek. Rozijnen zijn zeer gevaarlijk voor katten. Snelle actie verbetert de behandelkansen aanzienlijk.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-foreground dark:text-cpCream">
                    <Phone className="inline h-4 w-4 mr-1" />
                    <strong>Dierenarts direct bellen</strong>
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
            Deze pagina bevat levensreddende informatie over rozijnenvergiftiging bij katten, symptomen, behandeling en preventie.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">
        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Waarom Zijn Rozijnen Zo Gevaarlijk voor Katten?
          </h2>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Rozijnen zijn gedroogde druiven en bevatten dezelfde toxische stof als verse druiven - maar in veel hogere concentratie. Tijdens het droogproces verdampt het water, maar de giftige verbinding blijft achter in geconcentreerde vorm. Dit maakt rozijnen per gewicht veel gevaarlijker dan verse druiven.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Het grote risico met rozijnen is dat ze vaak verstopt zitten in voedselproducten: muffins, cakes, koekjes, brood, ontbijtgranen, en snoep. Een kat die normaal geen fruit eet kan toch per ongeluk rozijnen binnenkrijgen via deze producten. Bovendien zijn rozijnen klein en gemakkelijk te eten - een kat kan snel meerdere rozijnen innemen voordat je het doorhebt.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Net zoals bij druiven is de exacte giftige stof in rozijnen nog onbekend, maar de effecten zijn wetenschappelijk bewezen: acuut nierfalen dat binnen 24-72 uur kan optreden. De gevoeligheid verschilt per kat, maar omdat we geen veilige dosis kennen, moeten alle rozijnen strikt worden vermeden.
          </p>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-5 mb-6">
            <p className="text-sm text-foreground dark:text-cpCream font-medium mb-2">
              Let op: Rozijnen verstopt in voedsel
            </p>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              Rozijnen zitten vaak in: krenten/krentenbollen, rozijnenbrood, muesli, ontbijtgranen, koekjes (havermout-rozijn), cakes, muffins, trail mix, kerststol, en sommige soorten snoep. Check altijd ingrediëntenlijsten voordat je iets aan je kat geeft of laat liggen waar je kat bij kan.
            </p>
          </div>
        </section>

        {/* Toxicity Details */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <AlertTriangle className="h-7 w-7 text-red-600" />
            Waarom Zijn Rozijnen Gevaarlijker dan Druiven?
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-red-300/30 p-6 mb-6">
            <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
              Rozijnen vs. Druiven - waarom het verschil ertoe doet:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Geconcentreerde toxine</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Door waterverlies is de giftige stof 3-4x geconcentreerder per gram rozijn vs. druif</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Kleinere grootte</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Rozijnen zijn kleiner en makkelijker om meerdere tegelijk te eten</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Verstopt in voedsel</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Rozijnen zitten vaak verwerkt in bakverpakkingen die aantrekkelijk kunnen zijn voor katten</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Sneller effect</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Door de hogere concentratie kunnen symptomen sneller en heviger zijn</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Lagere veilige drempel</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Minder rozijnen nodig om toxische effecten te veroorzaken</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800/50 rounded-xl p-5">
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Hoe gevaarlijk?</strong> Bij honden wordt geschat dat zelfs 5-10 rozijnen al nierfalen kunnen veroorzaken bij kleine honden. Voor katten is de exacte toxische dosis onbekend, maar gezien hun kleinere formaat en gevoelige stofwisseling is zelfs een enkele rozijn potentieel gevaarlijk. Neem NOOIT het risico - elke rozijn is te veel.
            </p>
          </div>
        </section>

        {/* Symptoms */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Symptomen van Rozijnenvergiftiging bij Katten
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Symptomen kunnen binnen enkele uren tot dagen na inname optreden. Door de hogere concentratie kunnen symptomen sneller en heviger zijn dan bij druiven:
          </p>

          <div className="space-y-4 mb-6">
            {/* Early symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-cpAmber" />
                Eerste Symptomen (2-12 uur na inname)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Braken</strong> (vaak herhaaldelijk, kan rozijnresten bevatten)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Diarree</strong> (soms met bloed)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Extreme lusteloosheid</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Weigering van voedsel</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Buikpijn</strong> (gekromde houding, vermijden van aanraking)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Speekselvloed</strong></span>
                </li>
              </ul>
            </div>

            {/* Progressive symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-red-300/30 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Ernstige Symptomen (12-72 uur - Acuut Nierfalen)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Extreme dorst</strong> (polydipsie)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Verminderde urineproductie</strong> of helemaal niet meer plassen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Pijnlijke buik</strong> (vooral niergebied)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Uitdroging</strong> (droge tandvlees, ingevallen ogen)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Zwakte en trillingen</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Verwardheid of desoriëntatie</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Stuipen (in zeer ernstige gevallen)</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Bewusteloosheid en overlijden</strong></span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-5">
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Belangrijk:</strong> Wacht niet af om te zien of symptomen ontwikkelen. Door de geconcentreerde toxine in rozijnen kunnen symptomen snel ernstig worden. Bij elke verdenking van rozijneninname moet je direct de dierenarts bellen, ook als je kat nog geen symptomen vertoont.
            </p>
          </div>
        </section>

        {/* What To Do */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Heart className="h-7 w-7 text-cpCoral" />
            Wat Te Doen Als Je Kat Rozijnen Heeft Gegeten
          </h2>

          <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-400 dark:border-red-700 rounded-xl p-6 mb-6">
            <p className="text-foreground dark:text-cpCream font-bold mb-4 text-lg">
              Noodgeval - Onmiddellijke actie vereist:
            </p>
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Bel onmiddellijk je dierenarts</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Vertel hoeveel rozijnen je kat heeft gegeten (schatting) en wanneer. Dit is een medisch noodgeval - zelfs één rozijn vereist directe actie.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Verwijder alle rozijnen</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Zorg dat je kat geen toegang meer heeft tot rozijnen of producten met rozijnen. Ruim alles op.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Niet zelf braken opwekken</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Alleen de dierenarts kan veilig beslissen of en hoe braken moet worden opgewekt. Bij katten is dit extra gecompliceerd.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  4
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Verzamel informatie</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Noteer: aantal rozijnen (schatting), tijdstip van inname, welk product (als relevant), en alle symptomen die je ziet.
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
                    Volg het advies van de dierenarts op - meestal zal dit zijn om direct te komen. Hoe sneller de behandeling, hoe beter de overlevingskans.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl border border-cpCoral/30 dark:border-cpCoral/20 p-5">
            <p className="text-sm text-foreground dark:text-cpCream mb-3">
              <strong>Behandeling door de dierenarts:</strong> Bij recente inname kan de dierenarts braken opwekken. Daarna krijgt je kat vaak actieve kool om resterende toxinen te binden. De belangrijkste behandeling is intensieve intraveneuze vloeistoftherapie om de nieren door te spoelen en nierfalen te voorkomen. Je kat moet vaak opgenomen worden voor intensieve monitoring en behandeling.
            </p>
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Prognose:</strong> Hoe sneller de behandeling start, hoe beter de kans op volledig herstel. Snelle behandeling heeft de beste prognose. Zonder behandeling kan acuut nierfalen optreden met ernstige gevolgen.
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
              Bij elke verdenking direct contact opnemen
            </p>
            <p className="text-foreground dark:text-cpCream/90 mb-4">
              Bel de dierenarts direct als:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je kat <strong>rozijnen</strong> heeft gegeten (zelfs één)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je kat producten met rozijnen heeft gegeten (brood, koekjes, cake, etc.)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je <strong>vermoedt</strong> dat je kat rozijnen heeft gegeten</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je kat symptomen vertoont na mogelijk contact met rozijnen</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je <strong>twijfelt</strong> - bij rozijnen altijd bellen!</span>
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
                <span><strong>Dichtstbijzijnde 24-uurs spoedkliniek</strong></span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Vind Direct een Spoed-Dierenarts
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
            Preventie: Bescherm Je Kat tegen Rozijnen
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Preventie is essentieel omdat rozijnen zo gevaarlijk zijn. Zo bescherm je je kat:
          </p>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-4">Preventiemaatregelen:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Bewaar rozijnen volledig afgesloten</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">In kasten of koelkast waar je kat absoluut niet bij kan</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Check alle bakverpakkingen</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Brood, koekjes, cakes, muffins, krentenbollen - alles met rozijnen/krenten veilig opbergen</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Ruim direct op</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Gevallen rozijnen of kruimels met rozijnen onmiddellijk opruimen</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Waarschuw huisgenoten en gasten</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Vertel iedereen dat rozijnen levensgevaarlijk zijn voor katten</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Let op tijdens feestdagen</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Kerst en Pasen zijn piekmomenten voor rozijnproducten (kerststol, krentenbollen)</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Lees ingrediëntenlijsten</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Sommige onverwachte producten bevatten rozijnen (bepaalde granola, trail mix, sommige broden)</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-300 dark:border-emerald-800/50 p-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
              <Grape className="h-5 w-5 text-emerald-600" />
              Veilige Snacks voor Katten
            </h3>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
              In plaats van menselijk eten met rozijnen, kies voor kattenvriendelijke snacks:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Speciaal kattenvoer snacks
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Kleine stukjes gekookte kip (zonder kruiden)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Kattengrassticks
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Commerciële kattentraktaties
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veelgestelde Vragen over Rozijnen en Katten
          </h2>
          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Hoeveel rozijnen zijn gevaarlijk voor een kat?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Er is geen bekende "veilige" hoeveelheid. Omdat de toxische stof onbekend is en de gevoeligheid per kat verschilt, moet je ervan uitgaan dat zelfs één rozijn gevaarlijk kan zijn. Bij honden is aangetoond dat al 5-10 rozijnen acuut nierfalen kunnen veroorzaken, en katten zijn kleiner en mogelijk gevoeliger. Behandel elke rozijn als potentieel levensgevaarlijk.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Zijn krenten hetzelfde als rozijnen?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, krenten zijn kleine gedroogde druiven, net zoals rozijnen. Ze zijn even giftig voor katten. Krentenbollen, krentenbrood en andere producten met krenten zijn dus ook gevaarlijk. Krenten kunnen zelfs gevaarlijker zijn omdat ze zo klein zijn en een kat er makkelijk meerdere kan eten zonder dat je het direct doorhebt.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Mijn kat heeft een koekje met rozijnen gegeten, moet ik in paniek raken?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Neem onmiddellijk contact op met je dierenarts. Blijf kalm maar handel snel. De dierenarts kan inschatten hoeveel rozijnen er waarschijnlijk in het koekje zaten en of directe behandeling nodig is. Hoe sneller je belt en behandeling krijgt, hoe beter de prognose. Wacht niet af om te zien of symptomen ontstaan - bij rozijnen is snelle actie cruciaal.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Waarom veroorzaken rozijnen nierfalen?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Het exacte mechanisme is nog onbekend. Wetenschappers weten dat een stof in druiven (en geconcentreerd in rozijnen) direct de niertubuli beschadigt, waardoor de nieren niet meer kunnen functioneren. Dit leidt tot acuut nierfalen waarbij afvalstoffen ophopen in het bloed. Zonder intensieve behandeling met vloeistoftherapie is dit meestal fataal. Onderzoek gaat nog steeds door om de precieze toxische stof te identificeren.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kan een kat volledig herstellen van rozijnenvergiftiging?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Met zeer snelle behandeling (binnen enkele uren) kunnen veel katten volledig herstellen. De sleutel is intensieve intraveneuze vloeistoftherapie om de nieren door te spoelen voordat blijvende schade optreedt. Hoe langer je wacht, hoe meer nierschade er is en hoe slechter de prognose. Bij late behandeling kan blijvende nierschade of overlijden optreden. Daarom is onmiddellijke actie zo levensreddend.
              </div>
            </details>
          </div>
        </section>

        {/* Medical Disclaimer */}
        {/* Safe Food Alternatives */}
        <RelatedSafeFoods
          locale="nl"
          animal="katten"
          foods={commonSafeFoods}
          title="Veilige snack alternatieven"
        />

        <section className="mb-8">
          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl border border-cpAmber/30 dark:border-cpAmber/20 p-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3">
              Medische Disclaimer
            </h3>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 leading-relaxed">
              Deze informatie is uitsluitend bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies. Bij elke verdenking van rozijnenvergiftiging moet je onmiddellijk contact opnemen met een dierenarts of spoedkliniek. Rozijnenvergiftiging is een medisch noodgeval waarbij snelle actie belangrijk is. De informatie op deze pagina is gebaseerd op veterinaire kennis en wetenschappelijke bronnen, maar elke kat is anders en alleen een dierenarts kan een juiste diagnose stellen en behandeling geven. Wacht niet af - bel altijd direct bij verdenking van rozijneninname.
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
            "headline": "Is Rozijnen Giftig voor Katten? Extra Gevaarlijk",
            "description": "Rozijnen zijn zeer giftig voor katten - geconcentreerde toxine kan acuut nierfalen veroorzaken. Gevaarlijker dan verse druiven.",
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
              "@id": "https://cutiepawspedia.com/nl/is-rozijnen-giftig-voor-katten"
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
                "name": "Hoeveel rozijnen zijn gevaarlijk voor een kat?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Er is geen bekende veilige hoeveelheid. Omdat de toxische stof onbekend is en de gevoeligheid per kat verschilt, moet je ervan uitgaan dat zelfs één rozijn gevaarlijk kan zijn. Behandel elke rozijn als potentieel levensgevaarlijk."
                }
              },
              {
                "@type": "Question",
                "name": "Zijn krenten hetzelfde als rozijnen?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ja, krenten zijn kleine gedroogde druiven, net zoals rozijnen. Ze zijn even giftig voor katten. Krentenbollen, krentenbrood en andere producten met krenten zijn dus ook gevaarlijk."
                }
              },
              {
                "@type": "Question",
                "name": "Mijn kat heeft een koekje met rozijnen gegeten, moet ik in paniek raken?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Bel ONMIDDELLIJK je dierenarts. Raak niet in paniek, maar handel snel. De dierenarts kan inschatten hoeveel rozijnen er waarschijnlijk in het koekje zaten en of directe behandeling nodig is. Hoe sneller je belt en behandeling krijgt, hoe beter de prognose."
                }
              },
              {
                "@type": "Question",
                "name": "Waarom veroorzaken rozijnen nierfalen?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Het exacte mechanisme is nog onbekend. Wetenschappers weten dat een stof in druiven (en geconcentreerd in rozijnen) direct de niertubuli beschadigt, waardoor de nieren niet meer kunnen functioneren. Dit leidt tot acuut nierfalen waarbij afvalstoffen ophopen in het bloed."
                }
              },
              {
                "@type": "Question",
                "name": "Kan een kat volledig herstellen van rozijnenvergiftiging?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Met zeer snelle behandeling (binnen enkele uren) kunnen veel katten volledig herstellen. De sleutel is intensieve intraveneuze vloeistoftherapie om de nieren door te spoelen voordat blijvende schade optreedt. Hoe langer je wacht, hoe meer nierschade er is en hoe slechter de prognose."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
