/**
 * Pet Toxicity Canonical Page: Dieffenbachia - Katten (Cats)
 * Type: Plant
 * Toxicity Level: MIDDEL (MEDIUM)
 * Locale: nl (Dutch)
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Flower2, Phone, Clock, Heart, AlertCircle } from "lucide-react";
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: "Is Dieffenbachia Giftig voor Katten? Matige Toxiciteit - CutiePawsPedia",
  description: "Dieffenbachia is matig giftig voor katten - veroorzaakt mond- en keelirritatie. Leer symptomen herkennen en wat te doen bij inname. Veiligheidsgids voor katteneigenaren.",
  keywords: [
    "dieffenbachia giftig voor katten",
    "dieffenbachia gevaarlijk katten",
    "kat dieffenbachia gegeten",
    "kamerplant giftig kat",
    "giftige planten katten",
    "dieffenbachia vergiftiging kat",
    "mondirritatie kat plant",
    "dieffenbachia toxiciteit katten",
    "kamerplanten katten"
  ],
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "Is Dieffenbachia Giftig voor Katten? Matige Toxiciteit",
    description: "Dieffenbachia is matig giftig voor katten - veroorzaakt mond- en keelirritatie. Herken symptomen en weet wat te doen.",
    type: "article",
  },
};

export default function IsDieffenbachiaGiftigVoorKatten() {
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
            currentPage="Dieffenbachia voor Katten"
          />
          <div className="flex items-center gap-2 mb-4">
            <Flower2 className="h-6 w-6 text-orange-600" />
            <span className="text-sm font-medium text-orange-600">Matig Giftige Kamerplant voor Katten</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
            Is Dieffenbachia Giftig voor Katten?
          </h1>

          {/* TL;DR Verdict Box - WARNING */}
          <div className="bg-orange-500 dark:bg-orange-600 rounded-2xl p-6 mb-6 shadow-lg">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-10 w-10 text-white flex-shrink-0" />
              <div>
                <p className="text-2xl font-bold text-white mb-2">
                  Ja - matig giftig
                </p>
                <p className="text-white/95 text-lg leading-relaxed">
                  Dieffenbachia is matig giftig voor katten. De plant bevat calciumoxalaat kristallen die bij contact met mond, keel en maag ernstige irritatie veroorzaken. Symptomen zijn kwijlen, mondpijn, slikproblemen en braken. Hoewel zelden levensbedreigend, is het zeer oncomfortabel en vereist het veterinaire zorg.
                </p>
              </div>
            </div>
          </div>

          {/* Emergency CTA */}
          <div className="bg-orange-100 dark:bg-orange-900/30 border-2 border-orange-400 dark:border-orange-700 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-orange-700 dark:text-orange-400 flex-shrink-0" />
              <div>
                <p className="text-foreground dark:text-cpCream font-bold mb-2">Je kat heeft dieffenbachia gegeten?</p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  Neem contact op met je dierenarts voor advies. Dieffenbachia veroorzaakt pijnlijke mondirritatie en kan slikproblemen geven. Vooral als je kat veel heeft gegeten of ernstige symptomen vertoont.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-foreground dark:text-cpCream">
                    <Phone className="inline h-4 w-4 mr-1" />
                    <strong>Dierenarts bellen voor advies</strong>
                  </p>
                  <p className="text-foreground dark:text-cpCream">
                    <Clock className="inline h-4 w-4 mr-1" />
                    <strong>Bij ernstige symptomen: direct naar dierenarts</strong>
                  </p>
                </div>
              </div>
            </div>
            <Button
              asChild
              size="lg"
              className="bg-orange-600 text-white hover:bg-orange-700 rounded-xl w-full md:w-auto"
            >
              <Link href="/nl/netherlands">
                Vind een dierenarts bij jou in de buurt →
              </Link>
            </Button>
          </div>

          <p className="text-muted-foreground dark:text-cpCream/80 text-sm">
            Deze pagina bevat belangrijke informatie over dieffenbachiavergiftiging bij katten, symptomen, behandeling en preventie.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">
        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Waarom Is Dieffenbachia Gevaarlijk voor Katten?
          </h2>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Dieffenbachia, ook wel "stomme riet" (dumb cane) genoemd, is een populaire kamerplant met grote, decoratieve bladeren. De plant bevat microscopisch kleine, naaldvormige calciumoxalaat kristallen in alle weefsels. Wanneer een kat op de plant kauwt, breken deze kristallen en doorboren ze de zachte weefsels van mond, tong en keel.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Het resultaat is onmiddellijke en intense pijn, vergelijkbaar met het inslikken van glassplinters. De kristallen veroorzaken niet alleen mechanische schade, maar geven ook giftige enzymen af die de irritatie verergeren. De naam "stomme riet" komt van het feit dat mensen en dieren die erop kauwen tijdelijk hun stem kunnen verliezen door de extreme zwelling in de keel.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Gelukkig eten de meeste katten niet veel van de plant - de onmiddellijke pijn zorgt ervoor dat ze snel stoppen met kauwen. Ernstige vergiftiging is zeldzaam, maar de symptomen zijn zeer oncomfortabel en vereisen vaak veterinaire behandeling voor pijnverlichting.
          </p>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-5 mb-6">
            <p className="text-sm text-foreground dark:text-cpCream font-medium mb-2">
              Let op: Calciumoxalaat kristallen werken onmiddellijk
            </p>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              De pijn treedt direct op bij contact. Je ziet vaak dat je kat onmiddellijk begint te kwijlen en met zijn poot aan zijn mond krabt. Dit is een goede zaak - het betekent dat je kat waarschijnlijk niet veel heeft ingeslikt. Toch is het belangrijk om je dierenarts te bellen voor advies.
            </p>
          </div>
        </section>

        {/* Toxicity Details */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <AlertTriangle className="h-7 w-7 text-orange-600" />
            Welke Delen van Dieffenbachia Zijn Giftig?
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-orange-300/30 p-6 mb-6">
            <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
              Bij dieffenbachia zijn <strong>alle delen giftig</strong>:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Bladeren (meest gevaarlijk)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Hoogste concentratie calciumoxalaat kristallen - grootste risico</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Stengels</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Bevatten ook kristallen, kunnen irritatie veroorzaken</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Wortels</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Ook ondergrondse delen zijn toxisch</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Planten sap</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Het melkachtige sap bevat kristallen en kan huidirritatie veroorzaken</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-300 dark:border-orange-800/50 rounded-xl p-5">
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Hoeveel is gevaarlijk?</strong> Omdat de kristallen onmiddellijke pijn veroorzaken, eten katten zelden grote hoeveelheden. Zelfs een klein beetje kauwen kan echter al ernstige mondirritatie geven. De ernst hangt af van hoeveel je kat heeft geknabbeld voordat de pijn begon.
            </p>
          </div>
        </section>

        {/* Symptoms */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Symptomen van Dieffenbachiavergiftiging bij Katten
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Symptomen treden onmiddellijk tot binnen enkele minuten op. De meeste symptomen zijn gerelateerd aan mond-, keel- en maagirritatie:
          </p>

          <div className="space-y-4 mb-6">
            {/* Immediate symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-cpAmber" />
                Onmiddellijke Symptomen (mond en keel)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Overmatig kwijlen</strong> (speekselvloed)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Poten in de mond</strong> (kat krabt aan mond)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Hoofdschudden</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Mondpijn</strong> (kat heeft moeite met eten)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Rode, geïrriteerde mond en tong</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Zwelling van lippen, tong en keel</strong></span>
                </li>
              </ul>
            </div>

            {/* Gastrointestinal symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-orange-300/30 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Maag-Darm Symptomen
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Braken</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Verlies van eetlust</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Diarree</strong> (minder vaak)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Slikproblemen</strong> (bij ernstige keelzwelling)</span>
                </li>
              </ul>
            </div>

            {/* Serious symptoms - RARE */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-red-300/30 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Ernstige Symptomen (zeldzaam, bij grote hoeveelheden)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Ademhalingsmoeilijkheden</strong> (bij ernstige keelzwelling)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Verhoogde hartslag</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Nierproblemen</strong> (zeer zeldzaam)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-5">
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Belangrijk:</strong> De meeste katten herstellen volledig binnen 24-48 uur met symptomatische behandeling. Ernstige complicaties zijn zeldzaam omdat katten meestal stoppen met eten zodra de pijn begint. Neem wel altijd contact op met je dierenarts voor pijnverlichting en ondersteuning.
            </p>
          </div>
        </section>

        {/* What To Do */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Heart className="h-7 w-7 text-cpCoral" />
            Wat Te Doen Als Je Kat Dieffenbachia Heeft Gegeten
          </h2>

          <div className="bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-400 dark:border-orange-700 rounded-xl p-6 mb-6">
            <p className="text-foreground dark:text-cpCream font-bold mb-4 text-lg">
              Volg deze Stappen:
            </p>
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Verwijder plantenresten uit de mond</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Verwijder voorzichtig eventuele dieffenbachia-resten uit de bek. Draag handschoenen - het sap kan ook jouw huid irriteren.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Spoel de mond voorzichtig</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Als je kat dit toelaat, spoel de mond voorzichtig met water om resterende kristallen te verwijderen. Forceer dit niet als je kat zich verzet.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Bied melk of yoghurt aan (optioneel)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Sommige dierenartsen adviseren een klein beetje melk of yoghurt te geven - het calcium kan helpen de oxalaat kristallen te binden. Vraag eerst advies aan je dierenarts.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                  4
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Bel je dierenarts</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Vertel dat je kat dieffenbachia heeft gegeten en beschrijf de symptomen. De dierenarts kan adviseren of je moet komen voor behandeling.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                  5
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Monitor je kat nauwlettend</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Houd je kat in de gaten voor verergerende symptomen zoals ademhalingsproblemen, extreme zwelling, of onvermogen om te drinken.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl border border-cpCoral/30 dark:border-cpCoral/20 p-5">
            <p className="text-sm text-foreground dark:text-cpCream mb-3">
              <strong>Behandeling door de dierenarts:</strong> De dierenarts kan de mond spoelen, pijnstillers geven, anti-inflammatoire medicatie voorschrijven, en bij ernstige zwelling medicatie geven om de zwelling te verminderen. Bij braken of uitdroging kan infuustherapie nodig zijn. De meeste katten kunnen na enkele uren naar huis.
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
              Neem contact op met je dierenarts als:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span>Je kat <strong>zichtbare zwelling</strong> in de mond of keel heeft</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span>Je kat <strong>moeite heeft met ademhalen of slikken</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span>Je kat <strong>blijft braken</strong> of niet wil drinken</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span>Je kat <strong>in duidelijke pijn</strong> is</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span>Symptomen <strong>na 24 uur nog niet verbeteren</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span>Je <strong>onzeker</strong> bent over de ernst van de situatie</span>
              </li>
            </ul>
          </div>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
            <p className="text-foreground dark:text-cpCream/90 mb-3">
              <strong>Contactgegevens:</strong>
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span><strong>Je eigen dierenarts</strong> (voor advies en afspraak)</span>
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
              Vind een Dierenarts in je Buurt
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Heb je advies nodig over je kat? Vind snel een dierenarts bij jou in de buurt.
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
            Preventie: Houd Dieffenbachia Veilig Weg van Katten
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Voorkom dat je kat in contact komt met dieffenbachia:
          </p>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-4">Preventiemaatregelen:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Verwijder dieffenbachia uit huis</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">De veiligste optie als je katten hebt - vervang door kattenvriendelijke planten</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Plaats buiten bereik</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Zet planten op hoge planken of in kamers waar katten niet komen. Let op: katten klimmen goed!</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Gebruik afschrikkingsmiddelen</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Citrusgeuren of speciale plantensprays kunnen katten ontmoedigen</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Bied kattengras aan</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Geef je kat een veilig alternatief om op te knabbelen</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Ruim afgevallen bladeren direct op</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Katten kunnen met gevallen bladeren spelen en erop kauwen</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-300 dark:border-emerald-800/50 p-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
              <Flower2 className="h-5 w-5 text-emerald-600" />
              Kattenvriendelijke Kamerplanten
            </h3>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
              Deze kamerplanten zijn veilig voor katten:
            </p>
            <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Kattengras
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Spinplant (Chlorophytum)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Calathea
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Peperplant (Peperomia)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Areca palm
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Bostert
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veelgestelde Vragen over Dieffenbachia en Katten
          </h2>
          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Waarom heet dieffenbachia "stomme riet"?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                De naam komt van het feit dat mensen en dieren die op de plant kauwen tijdelijk hun stem kunnen verliezen door de extreme zwelling in de keel. De calciumoxalaat kristallen veroorzaken zo'n ernstige irritatie dat spreken tijdelijk onmogelijk wordt - vandaar "stomme" riet. Bij katten is dit gelukkig zeldzaam omdat ze meestal snel stoppen met kauwen door de pijn.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Is dieffenbachia dodelijk voor katten?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Overlijden door dieffenbachia is zeer zeldzaam bij katten. De onmiddellijke pijn zorgt ervoor dat katten zelden grote hoeveelheden eten. Fatale gevallen komen alleen voor bij extreme keelzwelling die de luchtwegen blokkeert, of bij zeer grote hoeveelheden die nierproblemen veroorzaken. Met veterinaire zorg herstellen de meeste katten volledig binnen 1-2 dagen.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Hoe lang duren de symptomen?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Mondirritatie en kwijlen kunnen enkele uren tot een dag aanhouden. Zwelling bereikt meestal zijn piek binnen 2-4 uur en neemt dan geleidelijk af. Met behandeling (pijnstillers, anti-inflammatoire medicatie) voelen de meeste katten zich binnen 12-24 uur alweer veel beter. Volledig herstel duurt meestal 24-48 uur.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kunnen katten later nog problemen krijgen?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Langetermijn complicaties zijn zeldzaam. De meeste katten herstellen volledig zonder blijvende schade. In zeer zeldzame gevallen kan ernstige keelzwelling leiden tot littekenweesel dat slikproblemen veroorzaakt, maar dit komt bijna nooit voor. De overgrote meerderheid van katten heeft na herstel geen verdere problemen.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Welke andere kamerplanten bevatten calciumoxalaat?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Veel populaire kamerplanten bevatten calciumoxalaat kristallen en kunnen vergelijkbare symptomen veroorzaken: Philodendron, Monstera, Anthurium, Caladium, Alocasia, Colocasia, Spathiphyllum (vredeslelie), en Zantedeschia (Calla). Als je katten hebt, is het verstandig om deze planten te vermijden of ver buiten bereik te plaatsen.
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
              Deze informatie is uitsluitend bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies. Bij verdenking van dieffenbachiavergiftiging is het altijd verstandig om contact op te nemen met je dierenarts voor advies. Elke kat reageert anders, en alleen een dierenarts kan een juiste diagnose stellen en behandeling adviseren. De informatie op deze pagina is gebaseerd op veterinaire kennis en wetenschappelijke bronnen, maar dient niet als vervanging voor professionele medische zorg.
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
            "headline": "Is Dieffenbachia Giftig voor Katten? Matige Toxiciteit",
            "description": "Dieffenbachia is matig giftig voor katten - veroorzaakt mond- en keelirritatie. Leer symptomen herkennen en wat te doen bij inname.",
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
              "@id": "https://cutiepawspedia.com/nl/is-dieffenbachia-giftig-voor-katten"
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
                "name": "Waarom heet dieffenbachia 'stomme riet'?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "De naam komt van het feit dat mensen en dieren die op de plant kauwen tijdelijk hun stem kunnen verliezen door de extreme zwelling in de keel. De calciumoxalaat kristallen veroorzaken zo'n ernstige irritatie dat spreken tijdelijk onmogelijk wordt."
                }
              },
              {
                "@type": "Question",
                "name": "Is dieffenbachia dodelijk voor katten?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Overlijden door dieffenbachia is zeer zeldzaam bij katten. De onmiddellijke pijn zorgt ervoor dat katten zelden grote hoeveelheden eten. Met veterinaire zorg herstellen de meeste katten volledig binnen 1-2 dagen."
                }
              },
              {
                "@type": "Question",
                "name": "Hoe lang duren de symptomen?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Mondirritatie en kwijlen kunnen enkele uren tot een dag aanhouden. Met behandeling voelen de meeste katten zich binnen 12-24 uur alweer veel beter. Volledig herstel duurt meestal 24-48 uur."
                }
              },
              {
                "@type": "Question",
                "name": "Kunnen katten later nog problemen krijgen?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Langetermijn complicaties zijn zeldzaam. De meeste katten herstellen volledig zonder blijvende schade. De overgrote meerderheid van katten heeft na herstel geen verdere problemen."
                }
              },
              {
                "@type": "Question",
                "name": "Welke andere kamerplanten bevatten calciumoxalaat?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Veel populaire kamerplanten bevatten calciumoxalaat: Philodendron, Monstera, Anthurium, Caladium, Alocasia, Colocasia, Spathiphyllum (vredeslelie), en Zantedeschia (Calla)."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
