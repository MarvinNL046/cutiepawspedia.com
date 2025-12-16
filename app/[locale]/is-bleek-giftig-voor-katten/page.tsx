/**
 * Pet Toxicity Canonical Page: Bleek (Bleach) - Katten (Cats)
 * Type: Household
 * Toxicity Level: MIDDEL (MEDIUM)
 * Locale: nl (Dutch)
 */

import type { Metadata } from "next";
import Link from "next/link";
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';
import { Button } from "@/components/ui/button";
import { AlertTriangle, Droplets, Phone, Clock, Heart, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Is Bleek Giftig voor Katten? Gevaarlijk bij Inname - CutiePawsPedia",
  description: "Bleek is giftig voor katten - kan irritatie aan maag, darm en luchtwegen veroorzaken. Herken symptomen en weet wat te doen bij contact of inname. Belangrijke veiligheidsinformatie.",
  keywords: [
    "bleek giftig voor katten",
    "kat bleek gedronken",
    "chloor katten gevaarlijk",
    "bleek irritatie kat",
    "maagirritatie kat",
    "schoonmaakmiddelen katten",
    "huishoudchemicaliën katten",
    "kat schoonmaakmiddel gelikt"
  ],
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "Is Bleek Giftig voor Katten? Gevaarlijk bij Inname",
    description: "Bleek is giftig voor katten - kan irritatie aan maag en luchtwegen veroorzaken. Veiligheidsgids voor katteneigenaren.",
    type: "article",
  },
};

export default function IsBleekGiftigVoorKatten() {
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
            currentPage="Bleek voor Katten"
          />
          <div className="flex items-center gap-2 mb-4">
            <Droplets className="h-6 w-6 text-orange-600" />
            <span className="text-sm font-medium text-orange-600">Giftig Huishoudchemisch Product voor Katten</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
            Is Bleek Giftig voor Katten?
          </h1>

          {/* TL;DR Verdict Box - WARNING */}
          <div className="bg-orange-600 dark:bg-orange-700 rounded-2xl p-6 mb-6 shadow-lg">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-10 w-10 text-white flex-shrink-0" />
              <div>
                <p className="text-2xl font-bold text-white mb-2">
                  Ja - Gevaarlijk bij inname
                </p>
                <p className="text-white/95 text-lg leading-relaxed">
                  Bleek (chloor) is giftig voor katten. Het kan ernstige irritatie veroorzaken aan mond, keel, slokdarm, maag en luchtwegen. Verdunde bleek (zoals schoonmaakmiddelen) is minder gevaarlijk maar kan nog steeds klachten geven. Ingeademde dampen kunnen ook schadelijk zijn.
                </p>
              </div>
            </div>
          </div>

          {/* Emergency CTA */}
          <div className="bg-orange-100 dark:bg-orange-900/30 border-2 border-orange-400 dark:border-orange-700 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-orange-700 dark:text-orange-400 flex-shrink-0" />
              <div>
                <p className="text-foreground dark:text-cpCream font-bold mb-2">Je kat heeft bleek gedronken of gelikt?</p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  Bel direct je dierenarts voor advies. Bij geconcentreerde bleek of grote hoeveelheden is een bezoek noodzakelijk. Bij verdunde bleek hangt het af van de hoeveelheid.
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
                Vind direct een dierenarts →
              </Link>
            </Button>
          </div>

          <p className="text-muted-foreground dark:text-cpCream/80 text-sm">
            Deze pagina bevat belangrijke informatie over bleek-vergiftiging bij katten, symptomen, behandeling en preventie.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">
        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Waarom is Bleek Gevaarlijk voor Katten?
          </h2>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Bleek (natriumhypochloriet/chloor) is een veelgebruikt schoonmaakmiddel dat giftig is voor katten. Het komt voor in huishoudbleek, schoonmaakmiddelen, zwembadchemicaliën, en ontsmettingsmiddelen. Katten kunnen in contact komen met bleek door te lopen over schoon gemaakte vloeren en daarna hun poten te likken, of door direct te drinken uit een emmer of WC-pot.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            De ernst van bleek-vergiftiging hangt af van de concentratie en hoeveelheid. <strong>Geconcentreerde bleek</strong> (zoals pure huishoudbleek) is zeer irriterend en kan ernstige brandwonden veroorzaken aan mond, keel en maag. <strong>Verdunde bleek</strong> (zoals schoonmaakmiddelen met 1-5% bleek) is minder gevaarlijk maar kan nog steeds klachten geven.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Een extra risico is dat katten door hun groominggedrag (zichzelf wassen) bleekresiduen van hun vacht kunnen oplikken. Ook kunnen ze de dampen inademen, wat irritatie aan de luchtwegen veroorzaakt. Bleek kan ook huidirritatie geven bij direct contact.
          </p>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-5 mb-6">
            <p className="text-sm text-foreground dark:text-cpCream font-medium mb-2">
              Let op: Concentratie maakt het verschil
            </p>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              Pure huishoudbleek (5-10% natriumhypochloriet) is veel gevaarlijker dan verdunde schoonmaakmiddelen (0,1-1% bleek). Een paar likken van verdunde bleek veroorzaken meestal milde symptomen, terwijl pure bleek ernstige brandwonden kan geven.
            </p>
          </div>
        </section>

        {/* Toxicity Details */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <AlertTriangle className="h-7 w-7 text-orange-600" />
            Hoe Werkt Bleek-Vergiftiging bij Katten?
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-orange-300/30 p-6 mb-6">
            <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
              Effecten van bleek op verschillende delen van het lichaam:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Mond en keel</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Chemische brandwonden, pijnlijke zwelling, speekselvloed. Bij geconcentreerde bleek kunnen weefsels wit worden.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Slokdarm en maag</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Irritatie van slijmvliezen, braken, buikpijn. Bij ernstige gevallen beschadiging van maagslijmvlies.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Luchtwegen</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Irritatie door dampen, hoesten, moeite met ademhalen. Bij inademen van veel dampen mogelijk longschade.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Huid en ogen</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Roodheid, irritatie, brandwonden bij direct contact. Ogen kunnen rood en tranend worden.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-300 dark:border-orange-800/50 rounded-xl p-5">
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Waarom is bleek zo irriterend?</strong> Bleek is een sterk oxiderend middel dat weefsels beschadigt. Het vernietigt eiwitten en vetten in cellen, wat leidt tot chemische brandwonden. De ernst hangt af van concentratie, hoeveelheid en contacttijd.
            </p>
          </div>
        </section>

        {/* Symptoms */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Symptomen van Bleek-Vergiftiging bij Katten
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Symptomen kunnen binnen enkele minuten tot uren optreden, afhankelijk van de concentratie en hoeveelheid:
          </p>

          <div className="space-y-4 mb-6">
            {/* Mild symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-cpAmber" />
                Milde Symptomen (Verdunde Bleek, Kleine Hoeveelheden)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Speekselvloed</strong> (kwijlen)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Lippen likken en met poot over mond wrijven</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Braken</strong> (1-2 keer)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Verminderde eetlust</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Lichte roodheid rond mond</strong></span>
                </li>
              </ul>
            </div>

            {/* Moderate symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-orange-300/30 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Matige Symptomen (Meer Geconcentreerde Bleek of Grotere Hoeveelheid)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Herhaaldelijk braken</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Duidelijke pijn in mond/keel</strong> (moeite met slikken)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Verbrande of witte plekken in mond</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Hoesten of niezen</strong> (bij inademing dampen)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Buikpijn</strong> (ineengedoken houding)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Lusteloosheid</strong></span>
                </li>
              </ul>
            </div>

            {/* Severe symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-red-300/30 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                Ernstige Symptomen (Geconcentreerde Bleek, Grote Hoeveelheden) - SPOED
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Ernstige chemische brandwonden in mond/keel</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Moeite met ademhalen</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Bloedig braken</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Collaps of shock</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Onvermogen om te drinken/eten</strong></span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-5">
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Belangrijk:</strong> Ook bij milde symptomen is het verstandig om contact op te nemen met je dierenarts voor advies. Ze kunnen inschatten of een bezoek noodzakelijk is of dat je thuis kunt monitoren.
            </p>
          </div>
        </section>

        {/* What To Do */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Heart className="h-7 w-7 text-cpCoral" />
            Wat Te Doen Als Je Kat Bleek Heeft Gedronken of Gelikt
          </h2>

          <div className="bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-400 dark:border-orange-700 rounded-xl p-6 mb-6">
            <p className="text-foreground dark:text-cpCream font-bold mb-4 text-lg">
              Onmiddellijke Actie - Doe Dit Direct:
            </p>
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Verwijder je kat van de bleek</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Haal je kat direct weg van de bleekbron. Zorg dat hij niet meer kan drinken of likken.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Spoel de mond VOORZICHTIG met water</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Laat je kat een paar keer voorzichtig water drinken (NIET forceren!) of bied nat voer aan. Dit verdunt de bleek. Gebruik GEEN melk - dit is een mythe.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Niet laten braken</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Laat je kat nooit braken bij bleek-inname. Dit veroorzaakt extra schade aan slokdarm en keel. Laat dit aan de dierenarts over.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                  4
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Bel je dierenarts voor advies</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Vertel welk product je kat heeft ingenomen, de concentratie (check etiket), en de geschatte hoeveelheid. De dierenarts adviseert of een bezoek nodig is.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                  5
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Bij huidcontact: spoel met water</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Als bleek op de huid of vacht zit, spoel dit 10-15 minuten met lauw water. Gebruik geen zeep of shampoo, dit kan de irritatie verergeren.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl border border-cpCoral/30 dark:border-cpCoral/20 p-5">
            <p className="text-sm text-foreground dark:text-cpCream mb-3">
              <strong>Behandeling door de dierenarts:</strong> De dierenarts kan pijnstillers geven, de mond inspecteren op brandwonden, ondersteunende zorg bieden (infuus bij braken), en in ernstige gevallen medicatie geven om de maag te beschermen. Bij ernstige brandwonden kan je kat opgenomen moeten worden.
            </p>
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Prognose:</strong> Bij verdunde bleek en kleine hoeveelheden is de prognose meestal goed - symptomen verdwijnen binnen 24-48 uur. Bij geconcentreerde bleek of grote hoeveelheden kunnen brandwonden weken duren om te genezen.
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
              Bel altijd voor advies, ga direct naar de dierenarts bij:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span>Inname van <strong>geconcentreerde bleek</strong> (pure huishoudbleek)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span>Inname van <strong>meer dan een paar likjes</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span><strong>Herhaaldelijk braken</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span><strong>Zichtbare brandwonden</strong> in mond of op tong</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span><strong>Moeite met slikken of ademhalen</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span><strong>Extreme speekselvloed</strong> of kwijlen</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span>Symptomen die <strong>niet verbeteren na 2-4 uur</strong></span>
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
              Heb je advies nodig over bleek-vergiftiging? Vind snel een dierenarts bij jou in de buurt.
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
            Preventie: Bescherm Je Kat Tegen Bleek
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Voorkom bleek-vergiftiging met deze veiligheidsmaatregelen:
          </p>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-4">Preventiemaatregelen:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Berg bleek veilig op</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Bewaar schoonmaakmiddelen in afgesloten kasten buiten bereik van katten</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Sluit WC-deksel</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Veel katten drinken uit de WC - houd het deksel dicht, vooral na gebruik van WC-reiniger</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Laat vloeren drogen</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Houd katten uit de kamer tot de vloer droog is na dweillen met bleek</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Spoel goed na</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Spoel oppervlakken goed na met schoon water na gebruik van bleekmiddelen</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Gebruik katvriendelijke alternatieven</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Overweeg azijn, baking soda of speciale huisdierveilige schoonmaakmiddelen</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Laat emmers niet onbeheerd staan</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Leeg en ruim schoonmaakemmers direct op - katten kunnen erin klimmen of eruit drinken</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-300 dark:border-emerald-800/50 p-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
              <Droplets className="h-5 w-5 text-emerald-600" />
              Veilige Schoonmaakalternatieven voor Katten
            </h3>
            <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Witte azijn (verdund)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Baking soda
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Citroensap
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Huisdierveilige reinigingsmiddelen
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Stoomreinigers
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Gewoon water met groene zeep
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veelgestelde Vragen over Bleek en Katten
          </h2>
          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Is verdunde bleek veilig voor katten?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Nee, zelfs verdunde bleek is niet "veilig" maar wel minder gevaarlijk dan geconcentreerde bleek. Een paar likjes van een schoongemaakt oppervlak veroorzaken meestal milde symptomen (speekselvloed, licht braken). Laat vloeren altijd goed drogen en spoel na met schoon water. Bij twijfel bel je dierenarts.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kan ik melk geven als mijn kat bleek heeft gedronken?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Nee, dit is een mythe. Melk helpt niet bij bleek-vergiftiging en kan de situatie zelfs verergeren door braken te veroorzaken. Geef alleen schoon water (niet forceren) of bied nat voer aan om de bleek te verdunnen. Bel daarna direct je dierenarts voor advies.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kunnen bleekvampen schadelijk zijn voor katten?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, het inademen van bleekvampen kan irritatie veroorzaken aan neus, keel en luchtwegen. Symptomen zijn niezen, hoesten, tranende ogen en moeite met ademhalen. Zorg voor goede ventilatie bij gebruik van bleek en houd katten uit de ruimte tot de lucht weer schoon is. Bij aanhoudende symptomen contact opnemen met dierenarts.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Hoe lang duren symptomen van bleek-vergiftiging?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Bij milde vergiftiging (verdunde bleek, klein hoeveelheid) verdwijnen symptomen meestal binnen 24-48 uur. Bij matige vergiftiging kan het 3-7 dagen duren. Bij ernstige brandwonden kunnen weken nodig zijn voor volledig herstel. De mond en keel kunnen gevoelig blijven, waardoor je kat tijdelijk zachter voer nodig heeft.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Waarom drinken katten uit de WC?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Katten worden aangetrokken door het frisse, koude water in de WC. Voor hen is het gewoon een grote waterbak. Dit is gevaarlijk als er WC-reiniger of bleek in zit. Voorkom dit door het deksel altijd dicht te houden en zorg voor verse drinkbakken op meerdere plekken in huis (katten zijn kieskeurig over hun water).
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
              Deze informatie is uitsluitend bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies. Bij bleek-vergiftiging moet je altijd contact opnemen met een dierenarts voor persoonlijk advies. De informatie op deze pagina is gebaseerd op veterinaire kennis en wetenschappelijke bronnen, maar elke kat is anders en alleen een dierenarts kan een juiste diagnose stellen en behandeling geven. Bij twijfel altijd bellen voor advies.
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
            "headline": "Is Bleek Giftig voor Katten? Gevaarlijk bij Inname",
            "description": "Bleek is giftig voor katten - kan irritatie aan maag, darm en luchtwegen veroorzaken. Herken symptomen en weet wat te doen bij contact of inname.",
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
              "@id": "https://cutiepawspedia.com/nl/is-bleek-giftig-voor-katten"
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
                "name": "Is verdunde bleek veilig voor katten?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Nee, zelfs verdunde bleek is niet 'veilig' maar wel minder gevaarlijk dan geconcentreerde bleek. Een paar likjes veroorzaken meestal milde symptomen. Laat vloeren altijd goed drogen en spoel na met schoon water."
                }
              },
              {
                "@type": "Question",
                "name": "Kan ik melk geven als mijn kat bleek heeft gedronken?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Nee, dit is een mythe. Melk helpt NIET bij bleek-vergiftiging en kan de situatie verergeren. Geef alleen schoon water of nat voer. Bel direct je dierenarts voor advies."
                }
              },
              {
                "@type": "Question",
                "name": "Kunnen bleekvampen schadelijk zijn voor katten?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ja, het inademen van bleekvampen kan irritatie veroorzaken aan luchtwegen. Symptomen zijn niezen, hoesten en tranende ogen. Zorg voor goede ventilatie bij gebruik van bleek."
                }
              },
              {
                "@type": "Question",
                "name": "Hoe lang duren symptomen van bleek-vergiftiging?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Bij milde vergiftiging verdwijnen symptomen meestal binnen 24-48 uur. Bij matige vergiftiging kan het 3-7 dagen duren. Bij ernstige brandwonden kunnen weken nodig zijn voor volledig herstel."
                }
              },
              {
                "@type": "Question",
                "name": "Waarom drinken katten uit de WC?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Katten worden aangetrokken door het frisse, koude water in de WC. Voorkom dit door het deksel altijd dicht te houden en zorg voor verse drinkbakken op meerdere plekken in huis."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
