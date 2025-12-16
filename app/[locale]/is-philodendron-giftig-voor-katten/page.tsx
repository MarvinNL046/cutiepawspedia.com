/**
 * Pet Toxicity Canonical Page: Philodendron - Katten (Cats)
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
  title: "Is Philodendron Giftig voor Katten? Symptomen & Wat Te Doen - CutiePawsPedia",
  description: "Philodendron is matig giftig voor katten - calciumoxalaat kristallen veroorzaken mond- en keelirritatie. Herken symptomen en weet wat te doen. Gids voor katteneigenaren.",
  keywords: [
    "philodendron giftig voor katten",
    "philodendron gevaarlijk katten",
    "kat philodendron gegeten",
    "kamerplant giftig kat",
    "giftige planten katten",
    "philodendron vergiftiging kat",
    "mondirritatie kat plant",
    "philodendron toxiciteit katten",
    "monstera katten"
  ],
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "Is Philodendron Giftig voor Katten? Matige Toxiciteit",
    description: "Philodendron is matig giftig voor katten - calciumoxalaat kristallen veroorzaken mond- en keelirritatie. Herken symptomen en weet wat te doen.",
    type: "article",
  },
};

export default function IsPhilodendronGiftigVoorKatten() {
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
            currentPage="Philodendron voor Katten"
          />
          <div className="flex items-center gap-2 mb-4">
            <Flower2 className="h-6 w-6 text-orange-600" />
            <span className="text-sm font-medium text-orange-600">Matig Giftige Kamerplant voor Katten</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
            Is Philodendron Giftig voor Katten?
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
                  Philodendron (inclusief populaire soorten zoals Monstera) is matig giftig voor katten. De plant bevat calciumoxalaat kristallen die scherp zijn als naaldjes en mond, tong en keel irriteren. Dit veroorzaakt kwijlen, pijn, zwelling en soms braken. Hoewel zelden fataal, is het pijnlijk en vereist het vaak veterinaire zorg.
                </p>
              </div>
            </div>
          </div>

          {/* Emergency CTA */}
          <div className="bg-orange-100 dark:bg-orange-900/30 border-2 border-orange-400 dark:border-orange-700 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-orange-700 dark:text-orange-400 flex-shrink-0" />
              <div>
                <p className="text-foreground dark:text-cpCream font-bold mb-2">Je kat heeft philodendron gegeten?</p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  Neem contact op met je dierenarts voor advies. Philodendron veroorzaakt pijnlijke mond- en keelirritatie. Bij ernstige symptomen of veel inname is directe veterinaire zorg nodig.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-foreground dark:text-cpCream">
                    <Phone className="inline h-4 w-4 mr-1" />
                    <strong>Dierenarts bellen voor advies</strong>
                  </p>
                  <p className="text-foreground dark:text-cpCream">
                    <Clock className="inline h-4 w-4 mr-1" />
                    <strong>Bij ernstige zwelling: direct naar dierenarts</strong>
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
            Deze pagina bevat belangrijke informatie over philodendronvergiftiging bij katten, symptomen, behandeling en preventie.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">
        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Waarom Zijn Philodendrons Gevaarlijk voor Katten?
          </h2>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Philodendron is een zeer populaire groep kamerplanten met meer dan 400 soorten, waaronder bekende variëteiten zoals Monstera deliciosa (gatenplant), Philodendron scandens (klimop philodendron), en Philodendron bipinnatifidum. Al deze soorten bevatten onoplosbare calciumoxalaat kristallen - microscopisch kleine, naaldvormige structuren die in alle plantdelen zitten.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Wanneer een kat op een philodendron kauwt, breken deze kristallen en penetreren ze de zachte weefsels van mond, tong, keel en slokdarm. Het effect is vergelijkbaar met het inslikken van honderden kleine glassplintertjes. De kristallen veroorzaken niet alleen mechanische schade, maar geven ook proteolytische enzymen af die de irritatie en ontstekingsreactie versterken.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            De onmiddellijke en intense pijn zorgt er gelukkig voor dat de meeste katten snel stoppen met kauwen. Hierdoor eten ze zelden grote hoeveelheden. Desondanks kan zelfs een kleine hap mondirritatie, kwijlen en zwelling veroorzaken die veterinaire behandeling vereist.
          </p>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-5 mb-6">
            <p className="text-sm text-foreground dark:text-cpCream font-medium mb-2">
              Let op: Alle Philodendron-soorten zijn giftig
            </p>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              Dit geldt voor alle soorten philodendrons, inclusief Monstera (gatenplant), Pothos (ook wel "Devil's ivy" genoemd), Anthurium, en andere verwante aroid-planten. Ze bevatten allemaal calciumoxalaat kristallen en veroorzaken vergelijkbare symptomen bij katten.
            </p>
          </div>
        </section>

        {/* Toxicity Details */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <AlertTriangle className="h-7 w-7 text-orange-600" />
            Welke Delen van Philodendron Zijn Giftig?
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-orange-300/30 p-6 mb-6">
            <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
              Bij philodendron zijn <strong>alle delen giftig</strong>:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Bladeren (meest aantrekkelijk voor katten)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Hoogste concentratie kristallen - katten knabbelen vaak aan hangende bladeren</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Stengels en ranken</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Bevatten ook kristallen, vooral bij klimmende soorten</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Luchtwortels</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Monstera en andere klimmers hebben luchtwortels die ook giftig zijn</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Planten sap</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Het sap bevat kristallen en kan huid- en oogirritatie veroorzaken</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Jonge scheuten</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Nieuwe groei is vaak extra aantrekkelijk voor katten maar even giftig</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-300 dark:border-orange-800/50 rounded-xl p-5">
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Hoeveel is gevaarlijk?</strong> Zelfs een klein beetje knabbelen kan al symptomen veroorzaken. De onmiddellijke pijn voorkomt meestal dat katten veel eten. De ernst van de symptomen hangt af van hoeveel je kat heeft geknabbeld en hoe gevoelig je individuele kat is voor de kristallen.
            </p>
          </div>
        </section>

        {/* Symptoms */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Symptomen van Philodendronvergiftiging bij Katten
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Symptomen treden meestal snel op. De calciumoxalaat kristallen veroorzaken onmiddellijke lokale irritatie:
          </p>

          <div className="space-y-4 mb-6">
            {/* Immediate oral symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-cpAmber" />
                Onmiddellijke Symptomen (mond en keel)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Intense mondpijn</strong> (kat schudt hoofd, krabt aan mond)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Excessief kwijlen</strong> (vaak met schuim)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Poten in de mond</strong> (kat probeert irritatie te verwijderen)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Rode, geïrriteerde tong en tandvlees</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Zwelling van lippen, tong en mond</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Onmiddellijk verlies van interesse in eten</strong></span>
                </li>
              </ul>
            </div>

            {/* Progressive symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-orange-300/30 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Progressieve Symptomen (enkele uren later)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Braken</strong> (vaak met plantenresten)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Slikproblemen</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Keelzwelling</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Weigering om te eten of drinken</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Lusteloosheid</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Diarree</strong> (minder vaak)</span>
                </li>
              </ul>
            </div>

            {/* Serious symptoms - RARE */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-red-300/30 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Ernstige Symptomen (zeldzaam, grote hoeveelheden)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Ademhalingsmoeilijkheden</strong> (bij ernstige keelzwelling - SPOED!)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Uitdroging</strong> (door onvermogen om te drinken)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Nierproblemen</strong> (zeer zeldzaam, bij zeer grote hoeveelheden)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-5">
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Belangrijk:</strong> De meeste katten herstellen met symptomatische behandeling. Ernstige complicaties zijn zeer zeldzaam en komen alleen voor bij extreme keelzwelling die de luchtwegen blokkeert. De onmiddellijke pijn zorgt er meestal voor dat katten niet veel eten.
            </p>
          </div>
        </section>

        {/* What To Do */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Heart className="h-7 w-7 text-cpCoral" />
            Wat Te Doen Als Je Kat Philodendron Heeft Gegeten
          </h2>

          <div className="bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-400 dark:border-orange-700 rounded-xl p-6 mb-6">
            <p className="text-foreground dark:text-cpCream font-bold mb-4 text-lg">
              Volg deze Eerste Hulp Stappen:
            </p>
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Verwijder plantenresten voorzichtig</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Verwijder zichtbare plantenresten uit de mond. Gebruik handschoenen - het sap kan ook jouw huid irriteren. Wees voorzichtig om niet meer schade te veroorzaken.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Spoel de mond met water</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Als je kat het toelaat, spoel de mond voorzichtig met lauw water om calciumoxalaat kristallen te verwijderen. Gebruik een spuit zonder naald of vochtige doek.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Overweeg zuivelproducten (vraag dierenarts)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Een klein beetje melk, room of yoghurt kan helpen - het calcium bindt met oxalaat. Bel eerst je dierenarts voor advies.
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
                    Beschrijf de symptomen en hoeveel je kat ongeveer heeft gegeten. De dierenarts adviseert of je moet komen.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                  5
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Monitor ademhaling en zwelling</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Let goed op ademhaling en keelzwelling. Als je kat moeite heeft met ademhalen, ga ONMIDDELLIJK naar de spoedkliniek.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl border border-cpCoral/30 dark:border-cpCoral/20 p-5">
            <p className="text-sm text-foreground dark:text-cpCream mb-3">
              <strong>Behandeling door de dierenarts:</strong> De dierenarts kan pijnstillers geven, de mond spoelen met specifieke oplossingen, anti-inflammatoire medicatie voorschrijven om zwelling te verminderen, en bij braken of uitdroging infuustherapie geven. Bij ernstige keelzwelling kunnen corticosteroïden nodig zijn. De meeste katten kunnen na enkele uren naar huis met medicatie.
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
                <span>Je kat <strong>zichtbare zwelling</strong> in mond, tong of keel heeft</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span>Je kat <strong>moeite heeft met ademhalen</strong> (SPOED - ga direct!)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span>Je kat <strong>niet kan slikken</strong> of kwijlt blijft</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span>Je kat <strong>blijft braken</strong> of weigert te drinken</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span>Je kat <strong>veel heeft gegeten</strong> van de plant</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span>Symptomen <strong>niet verbeteren of verslechteren</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span>Je <strong>twijfelt</strong> over de ernst - beter te voorzichtig dan te laat</span>
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
                <span><strong>Je eigen dierenarts</strong> (voor advies en behandeling)</span>
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
            Preventie: Houd Philodendrons Veilig Weg van Katten
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Voorkom dat je kat in contact komt met philodendrons:
          </p>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-4">Effectieve Preventiemaatregelen:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Vervang door kattenvriendelijke planten</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">De veiligste optie - kies planten die niet giftig zijn voor katten</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Hang planten hoog op</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Gebruik hangmanden of hoge plankenkasten. Let op: katten kunnen goed klimmen en springen!</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Gebruik afgescheiden ruimtes</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Plaats philodendrons in kamers waar katten geen toegang toe hebben</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Train je kat met afschrikkingsmiddelen</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Citrusgeuren, bitterspray, of aluminium folie rond de pot kunnen helpen</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Bied alternatieven aan</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Kattengras of andere veilige planten geven je kat iets anders om op te knabbelen</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Ruim gevallen bladeren direct op</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Oude bladeren en plantenresten zijn even giftig - verwijder deze meteen</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Snoeien en verzorgen met voorzichtigheid</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Houd katten weg tijdens het verzorgen, ruim snoeiafval onmiddellijk op</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-300 dark:border-emerald-800/50 p-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
              <Flower2 className="h-5 w-5 text-emerald-600" />
              Veilige Kamerplant Alternatieven
            </h3>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
              Deze planten zijn veilig voor katten en even mooi:
            </p>
            <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
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
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Kattengras
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Orchideeën
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Bromelias
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veelgestelde Vragen over Philodendron en Katten
          </h2>
          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Is Monstera even giftig als Philodendron?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, Monstera deliciosa (gatenplant) behoort tot de familie van aroid-planten en bevat dezelfde calciumoxalaat kristallen als philodendrons. Monstera veroorzaakt identieke symptomen - mondirritatie, kwijlen, zwelling en pijn. Alle Monstera-soorten moeten als giftig voor katten worden beschouwd.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Wat is het verschil met Pothos (Devil's ivy)?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Pothos (Epipremnum aureum) wordt vaak verward met philodendron omdat ze er visueel op lijken. Beide planten bevatten calciumoxalaat kristallen en zijn even giftig voor katten. De symptomen en behandeling zijn identiek. Als je een hangplant met hartvormige bladeren hebt, controleer of het philodendron of pothos is - beide zijn giftig.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kan philodendronvergiftiging dodelijk zijn?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Fatale afloop is zeer zeldzaam. De onmiddellijke pijn voorkomt dat katten veel eten. Overlijden komt alleen voor bij extreme keelzwelling die de luchtwegen blokkeert, of bij zeer grote hoeveelheden die nierproblemen veroorzaken. Met veterinaire zorg herstellen vrijwel alle katten volledig. Wel is het zeer oncomfortabel en vereist het vaak behandeling.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Hoe lang duurt het herstel?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                De meeste katten voelen zich snel beter met symptomatische behandeling. Mondirritatie kan enkele dagen aanhouden. Volledige genezing van zwelling en irritatie gebeurt meestal binnen enkele dagen. Bij ernstige keelzwelling kan herstel langer duren. Langetermijn complicaties zijn zeer zeldzaam.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Helpt het geven van melk echt?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Het calcium in melk of yoghurt kan helpen de oxalaatkristallen te binden, waardoor ze minder irriterend worden. Dit is een traditionele eerste hulp methode die sommige dierenartsen aanbevelen. Geef echter alleen kleine hoeveelheden (een theelepel) en alleen als je kat dit wil drinken. Bel altijd eerst je dierenarts voor advies - dit vervangt geen veterinaire behandeling.
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
              Deze informatie is uitsluitend bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies. Bij verdenking van philodendronvergiftiging is het altijd verstandig om contact op te nemen met je dierenarts voor advies. Elke kat reageert anders, en alleen een dierenarts kan een juiste diagnose stellen en behandeling adviseren. De informatie op deze pagina is gebaseerd op veterinaire kennis en wetenschappelijke bronnen, maar dient niet als vervanging voor professionele medische zorg.
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
            "headline": "Is Philodendron Giftig voor Katten? Matige Toxiciteit",
            "description": "Philodendron is matig giftig voor katten - calciumoxalaat kristallen veroorzaken mond- en keelirritatie. Herken symptomen en weet wat te doen.",
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
              "@id": "https://cutiepawspedia.com/nl/is-philodendron-giftig-voor-katten"
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
                "name": "Is Monstera even giftig als Philodendron?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ja, Monstera deliciosa (gatenplant) behoort tot de familie van aroid-planten en bevat dezelfde calciumoxalaat kristallen als philodendrons. Monstera veroorzaakt identieke symptomen."
                }
              },
              {
                "@type": "Question",
                "name": "Wat is het verschil met Pothos (Devil's ivy)?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Pothos wordt vaak verward met philodendron. Beide planten bevatten calciumoxalaat kristallen en zijn even giftig voor katten. De symptomen en behandeling zijn identiek."
                }
              },
              {
                "@type": "Question",
                "name": "Kan philodendronvergiftiging dodelijk zijn?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Fatale afloop is zeer zeldzaam. De onmiddellijke pijn voorkomt dat katten veel eten. Met veterinaire zorg herstellen vrijwel alle katten volledig."
                }
              },
              {
                "@type": "Question",
                "name": "Hoe lang duurt het herstel?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "De meeste katten voelen zich binnen 12-24 uur al beter met symptomatische behandeling. Volledige genezing van zwelling en irritatie duurt meestal 24-48 uur."
                }
              },
              {
                "@type": "Question",
                "name": "Helpt het geven van melk echt?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Het calcium in melk of yoghurt kan helpen de oxalaatkristallen te binden. Dit is een traditionele eerste hulp methode, maar bel altijd eerst je dierenarts voor advies."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
