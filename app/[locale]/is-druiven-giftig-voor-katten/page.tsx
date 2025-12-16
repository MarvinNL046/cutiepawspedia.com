/**
 * Pet Toxicity Canonical Page: Druiven (Grapes) - Katten (Cats)
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
  title: "Is Druiven Giftig voor Katten? | Symptomen & Wat Te Doen",
  description: "Druiven zijn giftig voor katten en kunnen acuut nierfalen veroorzaken. Minder bekend dan bij honden maar even gevaarlijk. Herken symptomen en weet wat te doen.",
  keywords: [
    "druiven giftig voor katten",
    "kat druiven gegeten",
    "druiven katten nierfalen",
    "giftig fruit katten",
    "druiven toxiciteit katten",
    "spoed dierenarts kat",
    "druiven vergiftiging kat",
    "kat fruit gegeten"
  ],
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "Is Druiven Giftig voor Katten? Nierschade Risico",
    description: "Druiven zijn giftig voor katten en kunnen acuut nierfalen veroorzaken. Minder bekend dan bij honden maar even gevaarlijk.",
    type: "article",
  },
};

export default function IsDruivenGiftigVoorKatten() {
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
            currentPage="Druiven voor Katten"
          />

          <div className="flex items-center gap-2 mb-4">
            <Grape className="h-6 w-6 text-red-600" />
            <span className="text-sm font-medium text-red-600">Giftig Fruit voor Katten</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
            Is Druiven Giftig voor Katten?
          </h1>

          {/* TL;DR Verdict Box */}
          <div className="bg-red-600 dark:bg-red-700 rounded-2xl p-6 mb-6 shadow-lg">
            <div className="flex items-start gap-4">
              <XCircle className="h-10 w-10 text-white flex-shrink-0" />
              <div>
                <p className="text-2xl font-bold text-white mb-2">
                  Ja - Giftig voor katten
                </p>
                <p className="text-white/95 text-lg leading-relaxed">
                  Druiven zijn giftig voor katten en kunnen acuut nierfalen veroorzaken, net zoals bij honden. Hoewel katten minder snel fruit eten dan honden, kan zelfs een kleine hoeveelheid druiven gevaarlijk zijn. De exacte giftige stof in druiven is nog onbekend, maar de effecten op de nieren zijn wetenschappelijk bewezen.
                </p>
              </div>
            </div>
          </div>

          {/* Emergency CTA */}
          <div className="bg-red-100 dark:bg-red-900/30 border-2 border-red-400 dark:border-red-700 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-700 dark:text-red-400 flex-shrink-0" />
              <div>
                <p className="text-foreground dark:text-cpCream font-bold mb-2">Je kat heeft druiven gegeten?</p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  Neem onmiddellijk contact op met je dierenarts. Druivenvergiftiging vereist snelle professionele veterinaire zorg om nierschade te voorkomen.
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
                Vind direct een dierenarts →
              </Link>
            </Button>
          </div>

          <p className="text-muted-foreground dark:text-cpCream/80 text-sm">
            Deze pagina bevat belangrijke informatie over druivenvergiftiging bij katten, symptomen, behandeling en preventie.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">
        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Waarom Zijn Druiven Giftig voor Katten?
          </h2>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            De giftigheid van druiven bij katten is minder bekend dan bij honden, maar onderzoek toont aan dat katten ook acuut nierfalen kunnen ontwikkelen na het eten van druiven. Hoewel katten natuurlijk geen grote fruiteters zijn en minder vaak druiven eten dan honden, zijn ze niet immuun voor de toxische effecten.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Het probleem is dat wetenschappers nog steeds niet precies weten welke stof in druiven de vergiftiging veroorzaakt. Dit maakt het moeilijk om te voorspellen welke katten gevoelig zijn en hoeveel druiven gevaarlijk is. Sommige katten worden ziek van een paar druiven, terwijl andere schijnbaar geen symptomen krijgen. Maar omdat er geen veilige hoeveelheid bekend is, moeten alle druiven worden vermeden.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Katten zijn vaak kieskeuriger dan honden en eten minder snel "menselijk" voedsel, maar sommige katten zijn nieuwsgierig naar druiven of kunnen per ongeluk druivensap of producten met druiven innemen. Zelfs kleine hoeveelheden kunnen potentieel gevaarlijk zijn.
          </p>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-5 mb-6">
            <p className="text-sm text-foreground dark:text-cpCream font-medium mb-2">
              Let op: Alle druivenproducten zijn gevaarlijk
            </p>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              Niet alleen verse druiven, maar ook rozijnen (gedroogde druiven), druivensap, en producten met druiven (zoals sommige bakverpakkingen) zijn giftig voor katten. Rozijnen zijn extra gevaarlijk omdat de toxische stof geconcentreerd is in de gedroogde vorm.
            </p>
          </div>
        </section>

        {/* Toxicity Details */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <AlertTriangle className="h-7 w-7 text-red-600" />
            Wat Maakt Druiven Zo Gevaarlijk?
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-red-300/30 p-6 mb-6">
            <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
              Belangrijke feiten over druivenvergiftiging bij katten:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Onbekende toxische stof</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Wetenschappers weten niet precies welke verbinding in druiven giftig is</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Acuut nierfalen</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">De toxine veroorzaakt plotselinge nierschade die zonder behandeling fataal kan zijn</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Onvoorspelbare gevoeligheid</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Sommige katten reageren op kleine hoeveelheden, andere lijken toleranter - maar alle druiven moeten worden vermeden</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Alle druivensoorten</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Rode, groene, zaadloze druiven - allemaal even gevaarlijk</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Ook verwerkte producten</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Rozijnen, druivensap, wijndruiven - alles met druiven is risicovol</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800/50 rounded-xl p-5">
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Geen veilige hoeveelheid:</strong> Omdat de gevoeligheid verschilt per kat en de toxische stof onbekend is, is er geen bewezen "veilige" hoeveelheid druiven voor katten. Zelfs één druif kan theoretisch gevaarlijk zijn. Het veiligste is om katten volledig weg te houden van druiven en druivenproducten.
            </p>
          </div>
        </section>

        {/* Symptoms */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Symptomen van Druivenvergiftiging bij Katten
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Symptomen kunnen binnen enkele uren tot dagen na inname optreden. Vroege symptomen zijn vaak maag-darmgerelateerd, gevolgd door tekenen van nierfalen:
          </p>

          <div className="space-y-4 mb-6">
            {/* Early symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-cpAmber" />
                Eerste Symptomen (6-12 uur na inname)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Braken</strong> (vaak binnen 6-12 uur)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Diarree</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Verminderde eetlust</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Lusteloosheid</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Buikpijn</strong> (opgekrulde houding, niet willen bewegen)</span>
                </li>
              </ul>
            </div>

            {/* Progressive symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-red-300/30 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Latere Symptomen (24-72 uur - Nierfalen)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Verhoogde dorst</strong> (polydipsie)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Meer of minder plassen</strong> (veranderende urineproductie)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Uitdroging</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Zwakte en trillende spieren</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Pijn in niergebied</strong> (gevoelige rug/buik)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Verminderde of gestopte urineproductie</strong> (ernstig nierfalen)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Bewusteloosheid</strong> (in zeer ernstige gevallen)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-5">
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Belangrijk:</strong> Niet alle katten die druiven eten worden ziek, maar omdat er geen manier is om te voorspellen welke katten gevoelig zijn, moet je ALTIJD contact opnemen met je dierenarts als je kat druiven heeft gegeten - zelfs zonder symptomen.
            </p>
          </div>
        </section>

        {/* What To Do */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Heart className="h-7 w-7 text-cpCoral" />
            Wat Te Doen Als Je Kat Druiven Heeft Gegeten
          </h2>

          <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-400 dark:border-red-700 rounded-xl p-6 mb-6">
            <p className="text-foreground dark:text-cpCream font-bold mb-4 text-lg">
              Onmiddellijke actie - Dit is belangrijk:
            </p>
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Bel onmiddellijk je dierenarts</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Vertel hoeveel druiven je kat heeft gegeten en wanneer. Zelfs als je kat nog geen symptomen heeft, is snel handelen belangrijk.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Verwijder alle druiven uit de buurt</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Zorg dat je kat niet meer druiven kan eten. Ruim alle druiven en druivenproducten op.
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
                    Laat de dierenarts beslissen of braken opwekken veilig en nuttig is. Bij katten kan dit gevaarlijk zijn zonder professionele begeleiding.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  4
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Noteer details</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Schrijf op: hoeveel druiven, welk type (rode/groene), hoe lang geleden, en of je kat braakte of andere symptomen heeft.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  5
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Ga direct naar de dierenarts als geadviseerd</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    De dierenarts zal waarschijnlijk willen dat je direct komt voor onderzoek en behandeling. Wacht niet af.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl border border-cpCoral/30 dark:border-cpCoral/20 p-5">
            <p className="text-sm text-foreground dark:text-cpCream mb-3">
              <strong>Behandeling door de dierenarts:</strong> Bij recente inname kan de dierenarts mogelijk braken opwekken om de druiven te verwijderen. Actieve kool kan helpen om toxinen te binden. Intensieve vloeistoftherapie via infuus is belangrijk om nierfalen te voorkomen. Je kat moet mogelijk meerdere dagen gehospitaliseerd worden voor nierfunctiemonitoring via bloedtesten.
            </p>
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Prognose:</strong> Met snelle behandeling kunnen veel katten volledig herstellen. Zonder behandeling of bij late behandeling is het risico op blijvende nierschade aanzienlijk.
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
              Altijd - Bij elke verdenking van druiveninname
            </p>
            <p className="text-foreground dark:text-cpCream/90 mb-4">
              Neem contact op met je dierenarts als:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je kat <strong>druiven of rozijnen</strong> heeft gegeten (elke hoeveelheid)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je <strong>vermoedt</strong> dat je kat druiven heeft gegeten</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je kat <strong>symptomen</strong> vertoont na contact met druiven</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je kat producten met druiven heeft gegeten (cake, muffins, etc.)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je <strong>twijfelt</strong> - beter veilig dan sorry</span>
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
              Vind Direct een Dierenarts in je Buurt
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Heb je nu advies nodig? Vind snel een dierenarts of 24-uurs spoedkliniek bij jou in de buurt.
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
            Preventie: Houd Druiven Weg van Katten
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Preventie is de beste bescherming. Zo voorkom je dat je kat in contact komt met druiven:
          </p>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-4">Preventiemaatregelen:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Bewaar druiven buiten bereik</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Leg druiven in gesloten fruitmanden of koelkasten waar katten niet bij kunnen</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Ruim direct op</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Gevallen druiven of rozijnen meteen opruimen voordat je kat ze vindt</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Let op bij bakken</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Producten met rozijnen (cake, muffins, koekjes) ook veilig opbergen</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Waarschuw huisgenoten en gasten</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Vertel familie en bezoekers dat katten geen druiven mogen hebben</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Check ingrediëntenlijsten</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Sommige "menselijke" snacks bevatten druiven of rozijnen - lees labels</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-300 dark:border-emerald-800/50 p-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
              <Grape className="h-5 w-5 text-emerald-600" />
              Veilige Fruitalternatieven voor Katten
            </h3>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
              Deze fruitjes zijn veilig voor katten (in kleine hoeveelheden als traktatie):
            </p>
            <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Meloen (kleine stukjes)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Watermeloen (zaadloos)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Banaan (zeer kleine hoeveelheid)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Blauwe bessen
              </li>
            </ul>
            <p className="text-xs text-muted-foreground dark:text-cpCream/70 mt-3">
              <strong>Let op:</strong> Katten zijn carnivoren en fruit is geen noodzakelijk onderdeel van hun dieet. Geef altijd maar kleine hoeveelheden als traktatie.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veelgestelde Vragen over Druiven en Katten
          </h2>
          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Waarom zijn druiven giftig voor katten maar niet voor mensen?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Katten hebben een andere stofwisseling dan mensen. Wat voor ons veilig is, kan voor katten giftig zijn. De exacte stof in druiven die toxisch is voor katten (en honden) is nog onbekend, maar het effect op hun nieren is wetenschappelijk bewezen. Mensen kunnen deze stof wel verwerken zonder problemen.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Mijn kat heeft aan een druif gelikt, is dat gevaarlijk?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Het risico van alleen likken is waarschijnlijk laag, maar omdat we de exacte toxische dosis niet kennen, is het verstandig om toch je dierenarts te bellen voor advies. De dierenarts kan inschatten of monitoring nodig is. Bij twijfel altijd bellen - beter veilig dan sorry.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Zijn rozijnen gevaarlijker dan verse druiven?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, rozijnen worden vaak als gevaarlijker beschouwd omdat de toxische stof geconcentreerd is in de gedroogde vorm. Een rozijn bevat dezelfde hoeveelheid toxine als een verse druif, maar in een veel kleiner volume. Dit betekent dat een kat makkelijker meer toxine binnenkrijgt met rozijnen. Beide moeten volledig worden vermeden.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kan mijn kat herstellen van druivenvergiftiging?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                De prognose hangt af van hoe snel behandeling start. Met zeer snelle interventie (binnen enkele uren) en agressieve vloeistoftherapie kunnen veel katten volledig herstellen. Zonder behandeling of bij late behandeling is het risico op blijvende nierschade of overlijden aanzienlijk. Daarom is snelle actie zo cruciaal.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Waarom is de giftige stof in druiven nog onbekend?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ondanks jaren van onderzoek hebben wetenschappers de exacte verbinding nog niet geïdentificeerd. Dit maakt druivenvergiftiging extra moeilijk om te begrijpen en voorspellen. Wel weten we zeker dat druiven nierschade veroorzaken bij sommige katten en honden. Totdat we meer weten, is de veiligste aanpak om alle druiven volledig te vermijden.
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
              Deze informatie is uitsluitend bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies. Als je kat druiven heeft gegeten, neem dan onmiddellijk contact op met een dierenarts. Elke kat is anders en alleen een dierenarts kan een juiste diagnose stellen en behandeling adviseren op basis van je specifieke situatie. De informatie op deze pagina is gebaseerd op veterinaire kennis en wetenschappelijke bronnen.
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
            "headline": "Is Druiven Giftig voor Katten? Nierschade Risico",
            "description": "Druiven zijn giftig voor katten en kunnen acuut nierfalen veroorzaken. Minder bekend dan bij honden maar even gevaarlijk.",
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
              "@id": "https://cutiepawspedia.com/nl/is-druiven-giftig-voor-katten"
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
                "name": "Waarom zijn druiven giftig voor katten maar niet voor mensen?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Katten hebben een andere stofwisseling dan mensen. Wat voor ons veilig is, kan voor katten giftig zijn. De exacte stof in druiven die toxisch is voor katten is nog onbekend, maar het effect op hun nieren is wetenschappelijk bewezen."
                }
              },
              {
                "@type": "Question",
                "name": "Mijn kat heeft aan een druif gelikt, is dat gevaarlijk?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Het risico van alleen likken is waarschijnlijk laag, maar omdat we de exacte toxische dosis niet kennen, is het verstandig om toch je dierenarts te bellen voor advies. Bij twijfel altijd bellen - beter veilig dan sorry."
                }
              },
              {
                "@type": "Question",
                "name": "Zijn rozijnen gevaarlijker dan verse druiven?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ja, rozijnen worden vaak als gevaarlijker beschouwd omdat de toxische stof geconcentreerd is in de gedroogde vorm. Een rozijn bevat dezelfde hoeveelheid toxine als een verse druif, maar in een veel kleiner volume."
                }
              },
              {
                "@type": "Question",
                "name": "Kan mijn kat herstellen van druivenvergiftiging?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "De prognose hangt af van hoe snel behandeling start. Met zeer snelle interventie (binnen enkele uren) en agressieve vloeistoftherapie kunnen veel katten volledig herstellen. Zonder behandeling of bij late behandeling is het risico op blijvende nierschade of overlijden aanzienlijk."
                }
              },
              {
                "@type": "Question",
                "name": "Waarom is de giftige stof in druiven nog onbekend?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ondanks jaren van onderzoek hebben wetenschappers de exacte verbinding nog niet geïdentificeerd. Dit maakt druivenvergiftiging extra moeilijk om te begrijpen en voorspellen. Totdat we meer weten, is de veiligste aanpak om alle druiven volledig te vermijden."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
