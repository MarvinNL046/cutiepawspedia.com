/**
 * Pet Toxicity Canonical Page: Tulp (Tulip) - Katten (Cats)
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
  title: "Is Tulp Giftig voor Katten? Matige Toxiciteit - CutiePawsPedia",
  description: "Tulpen zijn matig giftig voor katten - vooral de bol is gevaarlijk. Leer symptomen herkennen en wat te doen bij inname. Veiligheidsinformatie voor katteneigenaren.",
  keywords: [
    "tulp giftig voor katten",
    "tulpen gevaarlijk katten",
    "kat tulp gegeten",
    "tulpenbol giftig kat",
    "giftige planten katten",
    "tulp vergiftiging kat",
    "tulp toxiciteit katten",
    "voorjaarsbloemen katten",
    "lentebloemen giftig katten"
  ],
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "Is Tulp Giftig voor Katten? Matige Toxiciteit",
    description: "Tulpen zijn matig giftig voor katten - vooral de bol is gevaarlijk. Herken symptomen en weet wat te doen bij inname.",
    type: "article",
  },
};

export default function IsTulpGiftigVoorKatten() {
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
            currentPage="Tulp voor Katten"
          />
          <div className="flex items-center gap-2 mb-4">
            <Flower2 className="h-6 w-6 text-orange-600" />
            <span className="text-sm font-medium text-orange-600">Matig Giftige Plant voor Katten</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
            Is Tulp Giftig voor Katten?
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
                  Tulpen zijn matig giftig voor katten. De tulpenbol bevat de hoogste concentratie giftige stoffen (tulipaline A en B), maar ook bladeren, stengels en bloemen kunnen irritatie veroorzaken. Inname leidt meestal tot maag-darmklachten en mondirritatie, maar is zelden levensgevaarlijk.
                </p>
              </div>
            </div>
          </div>

          {/* Emergency CTA */}
          <div className="bg-orange-100 dark:bg-orange-900/30 border-2 border-orange-400 dark:border-orange-700 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-orange-700 dark:text-orange-400 flex-shrink-0" />
              <div>
                <p className="text-foreground dark:text-cpCream font-bold mb-2">Je kat heeft tulp gegeten?</p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  Hoewel tulpen niet zo gevaarlijk zijn als lelies, kun je het beste contact opnemen met je dierenarts voor advies. Vooral als je kat een tulpenbol heeft gegeten of ernstige symptomen vertoont.
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
            Deze pagina bevat belangrijke informatie over tulpvergiftiging bij katten, symptomen, behandeling en preventie.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">
        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Waarom Zijn Tulpen Gevaarlijk voor Katten?
          </h2>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Tulpen zijn populaire voorjaarsbloemen in Nederlandse huishoudens en tuinen. Helaas bevatten ze giftige stoffen die voor katten schadelijk zijn. De toxische verbindingen tulipaline A en B zitten in alle delen van de plant, maar de concentratie is het hoogst in de tulpenbol.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Het goede nieuws is dat tulpen doorgaans minder gevaarlijk zijn dan sommige andere giftige planten zoals lelies. De meeste katten die tulp eten krijgen maag-darmklachten en mondirritatie, maar herstellen volledig met symptomatische behandeling. Ernstige vergiftiging komt zelden voor.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Wel is het belangrijk om op te letten tijdens het voorjaar en vooral rond bloembollentijd. Katten kunnen uit nieuwsgierigheid aan tulpen knabbelen of – erger nog – opgegraven tulpenbollen als speeltje zien en erop kauwen.
          </p>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-5 mb-6">
            <p className="text-sm text-foreground dark:text-cpCream font-medium mb-2">
              Let op: De tulpenbol is het meest giftig
            </p>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              Terwijl bladeren en bloemen ook irritatie kunnen veroorzaken, bevat de bol de hoogste concentratie giftige stoffen. Katten die aan opgegraven bollen knabbelen of deze opeten lopen het grootste risico op vergiftiging.
            </p>
          </div>
        </section>

        {/* Toxicity Details */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <AlertTriangle className="h-7 w-7 text-orange-600" />
            Welke Delen van de Tulp Zijn Giftig?
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-orange-300/30 p-6 mb-6">
            <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
              Bij tulpen zijn <strong>alle delen giftig</strong>, maar in verschillende mate:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Tulpenbol (meest giftig)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Hoogste concentratie tulipaline A en B - grootste risico op vergiftiging</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Bladeren en stengels</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Bevatten lagere concentraties, maar kunnen nog steeds irritatie veroorzaken</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Bloemen</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Ook de kleurrijke bloemen bevatten giftige stoffen</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Water in de vaas</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Water waarin tulpen staan kan toxische stoffen bevatten</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-300 dark:border-orange-800/50 rounded-xl p-5">
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Hoeveel is gevaarlijk?</strong> De toxiciteit hangt af van hoeveel je kat heeft gegeten en welk deel van de plant. Een paar blaadjes zal meestal alleen milde maagklachten veroorzaken, terwijl het eten van een hele tulpenbol ernstigere symptomen kan geven. Neem bij twijfel altijd contact op met je dierenarts.
            </p>
          </div>
        </section>

        {/* Symptoms */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Symptomen van Tulpvergiftiging bij Katten
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Symptomen treden meestal binnen enkele uren na inname op. De ernst hangt af van hoeveel je kat heeft gegeten. Let op de volgende signalen:
          </p>

          <div className="space-y-4 mb-6">
            {/* Mild symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-cpAmber" />
                Milde Symptomen (meest voorkomend)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Kwijlen en speekselvloed</strong> (mondirritatie)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Braken</strong> (vaak herhaaldelijk)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Diarree</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Verlies van eetlust</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Lusteloosheid</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Rode of geïrriteerde lippen en mond</strong></span>
                </li>
              </ul>
            </div>

            {/* More serious symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-orange-300/30 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Ernstigere Symptomen (bij grotere hoeveelheden)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Verhoogde hartslag</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Ademhalingsmoeilijkheden</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Huidirritatie</strong> (bij contact)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Depressie en apathie</strong></span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-5">
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Belangrijk:</strong> De meeste katten herstellen volledig van tulpvergiftiging met de juiste zorg. Ernstige complicaties zijn zeldzaam, maar neem altijd contact op met je dierenarts als je kat tulp heeft gegeten of als symptomen aanhouden.
            </p>
          </div>
        </section>

        {/* What To Do */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Heart className="h-7 w-7 text-cpCoral" />
            Wat Te Doen Als Je Kat Tulp Heeft Gegeten
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
                    Verwijder voorzichtig eventuele tulpenresten uit de mond van je kat. Spoel de mond met een beetje water als je kat dit toelaat.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Bel je dierenarts voor advies</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Vertel welk deel van de tulp je kat heeft gegeten (bol, blad, bloem) en hoeveel ongeveer. De dierenarts kan inschatten of behandeling nodig is.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">NIET laten braken zonder toestemming</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Probeer je kat niet zelf te laten braken. Dit kan soms meer schade veroorzaken. Laat dit aan de dierenarts over.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                  4
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Monitor je kat nauwlettend</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Houd je kat in de gaten voor symptomen zoals braken, diarree of lusteloosheid. Noteer wanneer de symptomen beginnen.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                  5
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Ga naar dierenarts bij ernstige symptomen</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Bij aanhoudend braken, diarree, ademhalingsproblemen of andere verontrustende symptomen moet je direct naar de dierenarts.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl border border-cpCoral/30 dark:border-cpCoral/20 p-5">
            <p className="text-sm text-foreground dark:text-cpCream mb-3">
              <strong>Behandeling door de dierenarts:</strong> De dierenarts kan braken opwekken als de inname recent was, actieve kool geven om resterende giftige stoffen te binden, en symptomatische behandeling geven (zoals infuus bij uitdroging door braken/diarree). De meeste katten herstellen binnen 24-48 uur.
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
                <span>Je kat een <strong>tulpenbol</strong> heeft gegeten (hoogste risico)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span>Je kat <strong>meer dan een paar blaadjes</strong> heeft opgegeten</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span>Je kat <strong>aanhoudend braakt</strong> (meer dan 2-3 keer)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span>Je kat <strong>ernstige diarree</strong> heeft</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span>Je kat <strong>niet wil eten of drinken</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span>Je kat <strong>lusteloosheid of zwakte</strong> vertoont</span>
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
            Preventie: Houd Tulpen Veilig Weg van Katten
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Voorkom dat je kat in contact komt met tulpen met deze praktische tips:
          </p>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-4">Preventiemaatregelen:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Plaats tulpenboeketten buiten bereik</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Zet vazen met tulpen op hoge plekken waar je kat niet bij kan, zoals kasten of hoge planken</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Bescherm tulpenbollen in de tuin</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Plant tulpenbollen diep en bedek met gaas. Houd je kat binnen tijdens het planten van bollen</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Let op met verse tulpen</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Ruim afgevallen blaadjes en bloemen direct op. Katten kunnen ermee spelen en erop kauwen</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Bied kattengras aan</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Geef je kat een veilig alternatief om op te kauwen, zoals kattengras of kattenplanten</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Overweeg kattenveilige voorjaarsbloemen</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Kies voor veilige alternatieven zoals rozen, gerbera's of zonnebloemen</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-300 dark:border-emerald-800/50 p-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
              <Flower2 className="h-5 w-5 text-emerald-600" />
              Veilige Voorjaarsbloemen voor Katten
            </h3>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
              Deze voorjaarsbloemen zijn veilig voor katten:
            </p>
            <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Rozen
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Gerbera's
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Zonnebloemen
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Orchideeën
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Viooltjes
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Afrikaantjes
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veelgestelde Vragen over Tulpen en Katten
          </h2>
          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Zijn alle soorten tulpen giftig voor katten?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, alle soorten tulpen bevatten de giftige stoffen tulipaline A en B. Dit geldt voor alle tulpenvariëteiten, of het nu vroege tulpen, late tulpen, papegaaientulpen of botanische tulpen zijn. De bol is altijd het meest giftige deel, ongeacht de soort.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Wat is het verschil tussen tulpen en lelies voor katten?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Tulpen zijn matig giftig en veroorzaken meestal maag-darmklachten en mondirritatie. Lelies daarentegen zijn extreem giftig voor katten en kunnen acuut nierfalen veroorzaken, wat zonder behandeling fataal kan zijn. Tulpvergiftiging is vervelend maar zelden levensbedreigend, terwijl lelievergiftiging altijd een noodgeval is.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Mijn kat heeft aan tulpenbladeren gesnuffeld, is dat gevaarlijk?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Alleen snuffelen is meestal niet gevaarlijk. De giftige stoffen moeten worden ingeslikt om problemen te veroorzaken. Let wel op of je kat ook heeft geknabbeld of gekauwd. Als je kat alleen heeft gesnuffeld en geen symptomen vertoont, is er waarschijnlijk geen reden tot zorg. Monitor je kat wel de komende uren.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Hoe lang duren de symptomen van tulpvergiftiging?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                De meeste katten herstellen binnen 24-48 uur met de juiste zorg. Milde symptomen zoals kwijlen en lichte maagklachten kunnen binnen een paar uur verdwijnen. Bij ernstigere symptomen (aanhoudend braken, diarree) kan herstel 1-2 dagen duren. Als je kat na 48 uur nog steeds symptomen heeft, neem dan contact op met je dierenarts.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Zijn tulpen ook giftig voor honden?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, tulpen zijn ook giftig voor honden en veroorzaken vergelijkbare symptomen zoals maag-darmklachten, kwijlen en braken. Net als bij katten is de tulpenbol het meest giftige deel. Honden hebben soms de neiging om opgegraven bollen op te graven en erop te kauwen, dus let ook bij honden goed op tijdens de bollenplantperiode.
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
              Deze informatie is uitsluitend bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies. Bij verdenking van tulpvergiftiging is het altijd verstandig om contact op te nemen met je dierenarts voor advies. Elke kat reageert anders, en alleen een dierenarts kan een juiste diagnose stellen en behandeling adviseren. De informatie op deze pagina is gebaseerd op veterinaire kennis en wetenschappelijke bronnen, maar dient niet als vervanging voor professionele medische zorg.
            </p>
          </div>
        </section>

        <RelatedSafeFoods
          locale="nl"
          animal="katten"
          foods={commonSafeFoods}
          title="Veilige snack alternatieven"
        />
      </article>

      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Is Tulp Giftig voor Katten? Matige Toxiciteit",
            "description": "Tulpen zijn matig giftig voor katten - vooral de bol is gevaarlijk. Leer symptomen herkennen en wat te doen bij inname.",
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
              "@id": "https://cutiepawspedia.com/nl/is-tulp-giftig-voor-katten"
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
                "name": "Zijn alle soorten tulpen giftig voor katten?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ja, alle soorten tulpen bevatten de giftige stoffen tulipaline A en B. Dit geldt voor alle tulpenvariëteiten. De bol is altijd het meest giftige deel, ongeacht de soort."
                }
              },
              {
                "@type": "Question",
                "name": "Wat is het verschil tussen tulpen en lelies voor katten?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Tulpen zijn matig giftig en veroorzaken meestal maag-darmklachten. Lelies daarentegen zijn extreem giftig voor katten en kunnen acuut nierfalen veroorzaken. Tulpvergiftiging is vervelend maar zelden levensbedreigend, terwijl lelievergiftiging altijd een noodgeval is."
                }
              },
              {
                "@type": "Question",
                "name": "Mijn kat heeft aan tulpenbladeren gesnuffeld, is dat gevaarlijk?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Alleen snuffelen is meestal niet gevaarlijk. De giftige stoffen moeten worden ingeslikt om problemen te veroorzaken. Als je kat alleen heeft gesnuffeld en geen symptomen vertoont, is er waarschijnlijk geen reden tot zorg."
                }
              },
              {
                "@type": "Question",
                "name": "Hoe lang duren de symptomen van tulpvergiftiging?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "De meeste katten herstellen binnen 24-48 uur met de juiste zorg. Milde symptomen kunnen binnen een paar uur verdwijnen. Bij ernstigere symptomen kan herstel 1-2 dagen duren."
                }
              },
              {
                "@type": "Question",
                "name": "Zijn tulpen ook giftig voor honden?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ja, tulpen zijn ook giftig voor honden en veroorzaken vergelijkbare symptomen zoals maag-darmklachten, kwijlen en braken. Net als bij katten is de tulpenbol het meest giftige deel."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
