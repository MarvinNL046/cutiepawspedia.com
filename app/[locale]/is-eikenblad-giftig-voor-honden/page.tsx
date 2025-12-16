/**
 * Pet Toxicity Canonical Page: Eikenblad/Eikels - Honden (Dogs)
 * Type: Plant
 * Toxicity Level: MIDDEL (MODERATE)
 * Locale: nl (Dutch)
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TreeDeciduous, Phone, Clock, Heart, AlertCircle } from "lucide-react";
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: "Is Eikenblad en Eikels Giftig voor Honden? Tannines en Nierschade - CutiePawsPedia",
  description: "Eikenbladeren en eikels bevatten tannines die giftig zijn voor honden. Grote hoeveelheden kunnen maagproblemen en nierschade veroorzaken. Herken symptomen en weet wat te doen.",
  keywords: [
    "eikenblad giftig voor honden",
    "eikels giftig honden",
    "hond eikels gegeten",
    "tannines honden",
    "nierschade eikels",
    "eikenboom gevaarlijk honden",
    "herfst vergiftiging honden",
    "eikel vergiftiging symptomen",
    "hond eikenbladeren"
  ],
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "Is Eikenblad en Eikels Giftig voor Honden? Tannines en Nierschade",
    description: "Eikenbladeren en eikels bevatten tannines die giftig zijn voor honden. Grote hoeveelheden kunnen maagproblemen en nierschade veroorzaken.",
    type: "article",
  },
};

export default function IsEikenbladGiftigVoorHonden() {
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
            currentPage="Eikenblad voor Honden"
          />

          <div className="flex items-center gap-2 mb-4">
            <TreeDeciduous className="h-6 w-6 text-orange-600" />
            <span className="text-sm font-medium text-orange-600">Matige Giftigheid voor Honden</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
            Is Eikenblad en Eikels Giftig voor Honden?
          </h1>

          {/* TL;DR Verdict Box */}
          <div className="bg-orange-500 dark:bg-orange-600 rounded-2xl p-6 mb-6 shadow-lg">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-10 w-10 text-white flex-shrink-0" />
              <div>
                <p className="text-2xl font-bold text-white mb-2">
                  Ja - Matig giftig
                </p>
                <p className="text-white/95 text-lg leading-relaxed">
                  Eikenbladeren en eikels bevatten tannines (looizuren) die giftig zijn voor honden. Kleine hoeveelheden zijn meestal niet gevaarlijk, maar grote hoeveelheden of regelmatige inname kunnen ernstige maagdarmproblemen en nierschade veroorzaken. Jonge eikenbladeren en groene eikels zijn het meest giftig.
                </p>
              </div>
            </div>
          </div>

          {/* Warning CTA */}
          <div className="bg-orange-100 dark:bg-orange-900/30 border-2 border-orange-400 dark:border-orange-700 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-orange-700 dark:text-orange-400 flex-shrink-0" />
              <div>
                <p className="text-foreground dark:text-cpCream font-bold mb-2">Je hond heeft veel eikels of eikenbladeren gegeten?</p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  Neem contact op met je dierenarts voor advies. Let op symptomen zoals braken, diarree en buikpijn. Bij veel eikels of ernstige symptomen: direct naar de dierenarts.
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
                Vind een dierenarts →
              </Link>
            </Button>
          </div>

          <p className="text-muted-foreground dark:text-cpCream/80 text-sm">
            Deze pagina bevat belangrijke informatie over eikelvergiftiging bij honden, symptomen, behandeling en preventie.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">
        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Waarom Zijn Eikels en Eikenbladeren Giftig voor Honden?
          </h2>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Eikenbomen zijn overal in Nederland te vinden - in parken, bossen en tuinen. In het najaar vallen er duizenden eikels en bladeren op de grond, die nieuwsgierige honden kunnen aantrekken. Helaas bevatten alle delen van de eikenboom tannines (looizuren), die in grote hoeveelheden giftig zijn voor honden.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Het goede nieuws is dat eikelvergiftiging meestal pas ontstaat na het eten van veel eikels of bladeren. Eén of twee eikels zijn zelden een probleem. Maar sommige honden vinden eikels lekker en kunnen er grote hoeveelheden van eten, vooral in de herfst wanneer ze overal op de grond liggen.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            De tannines in eikels en bladeren irriteren de maag en darmen en kunnen bij hoge doses de nieren beschadigen. Jonge, groene eikels en verse lentebladeren bevatten de hoogste concentraties tannines en zijn dus het meest giftig.
          </p>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-5 mb-6">
            <p className="text-sm text-foreground dark:text-cpCream font-medium mb-2">
              Let op: Wanneer is het risico het grootst?
            </p>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              Het grootste risico is in de herfst (september-november) wanneer eikels massaal van de bomen vallen. Ook het voorjaar (april-mei) is risicovol vanwege jonge, giftige bladeren. Honden die graag kauwen of verveling hebben lopen meer risico.
            </p>
          </div>
        </section>

        {/* Toxicity Details */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <AlertTriangle className="h-7 w-7 text-orange-600" />
            Welke Delen van de Eik Zijn Giftig?
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-orange-300/30 p-6 mb-6">
            <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
              Alle delen van de eikenboom bevatten tannines:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Eikels (vooral groene/jonge)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Hoog tanningehalte, kunnen maag en nieren irriteren</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Jonge bladeren (lentebladeren)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Hoogste tanninconcentratie in verse groene bladeren</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Knoppen en jonge twijgen</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Ook giftig, maar honden eten deze minder vaak</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Schors</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Bevat ook tannines, maar in lagere concentraties</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-300 dark:border-orange-800/50 rounded-xl p-5">
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Hoeveel is gevaarlijk?</strong> De toxische dosis hangt af van de grootte van je hond. Voor een kleine hond kunnen al 5-10 eikels problemen veroorzaken, terwijl een grote hond meer kan verdragen. Toch is het verstandig om je hond altijd te weerhouden van het eten van eikels - de precieze giftigheid verschilt per eikenboomsoort.
            </p>
          </div>
        </section>

        {/* Symptoms */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Symptomen van Eikelvergiftiging bij Honden
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Symptomen kunnen binnen enkele uren tot enkele dagen na inname optreden,afhankelijk van hoeveel de hond heeft gegeten. Herken de waarschuwingssignalen:
          </p>

          <div className="space-y-4 mb-6">
            {/* Mild symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-cpAmber" />
                Milde Symptomen (Maag-Darmklachten)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Braken</strong> (soms met stukjes eikel)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Diarree</strong> (kan bloederig zijn)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Buikpijn</strong> (stijve houding, niet willen bewegen)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Verminderde eetlust</strong></span>
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
                Ernstige Symptomen (Nierschade)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Verhoogde dorst</strong> (polydipsie)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Meer of minder plassen</strong> (verandering in urine)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Donkere of bloederige urine</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Uitdroging</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Zwakte en apathie</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Nierfalen</strong> (in ernstige gevallen)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-5">
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Belangrijk:</strong> Niet elke hond die eikels eet wordt ziek. Veel hangt af van de hoeveelheid en de gevoeligheid van je hond. Maar als je ziet dat je hond veel eikels heeft gegeten of symptomen vertoont, neem dan altijd contact op met je dierenarts.
            </p>
          </div>
        </section>

        {/* What To Do */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Heart className="h-7 w-7 text-cpCoral" />
            Wat Te Doen Als Je Hond Eikels Heeft Gegeten
          </h2>

          <div className="bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-400 dark:border-orange-700 rounded-xl p-6 mb-6">
            <p className="text-foreground dark:text-cpCream font-bold mb-4 text-lg">
              Volg deze stappen:
            </p>
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Schat in hoeveel je hond heeft gegeten</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Probeer te bepalen of het om één of twee eikels gaat (meestal geen probleem) of om veel eikels (meer zorgelijk).
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
                    Beschrijf hoeveel eikels je hond heeft gegeten en of er al symptomen zijn. De dierenarts kan inschatten of behandeling nodig is.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Laat niet zelf braken zonder toestemming</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Alleen de dierenarts kan veilig braken opwekken. Doe dit niet zelf - het kan gevaarlijk zijn.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                  4
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Monitor je hond op symptomen</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Let op braken, diarree, buikpijn of veranderingen in drinkgedrag en plassen. Noteer wanneer symptomen beginnen.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                  5
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Volg het advies van de dierenarts op</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Afhankelijk van de situatie kan de dierenarts adviseren om naar de praktijk te komen, thuis te monitoren, of specifieke behandeling te starten.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl border border-cpCoral/30 dark:border-cpCoral/20 p-5">
            <p className="text-sm text-foreground dark:text-cpCream mb-3">
              <strong>Behandeling door de dierenarts:</strong> Als je hond veel eikels heeft gegeten, kan de dierenarts braken opwekken (als de inname recent was) of actieve kool geven om toxinen te binden. Bij symptomen kan ondersteunende zorg nodig zijn zoals infuus voor hydratatie, medicijnen tegen braken, en nierfunctiemonitoring.
            </p>
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Prognose:</strong> De meeste honden herstellen volledig als ze op tijd behandeld worden en de hoeveelheid niet te groot was. Ernstige nierschade is zeldzaam maar kan voorkomen bij langdurige of massale inname.
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
              Bel de dierenarts als:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span>Je hond <strong>veel eikels</strong> heeft gegeten (meer dan een paar)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span>Je hond <strong>symptomen</strong> vertoont (braken, diarree, buikpijn)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span>Het om een <strong>kleine hond of puppy</strong> gaat (gevoeliger)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span>Je hond <strong>groene (jonge) eikels</strong> heeft gegeten</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span>Je <strong>twijfelt</strong> of het gevaarlijk is</span>
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
                <span><strong>Je eigen dierenarts</strong> (heb het nummer altijd bij de hand)</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span><strong>Dierennoodhulp 24/7:</strong> 0900-0245 (€0,90 per minuut)</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span><strong>Vergiftigingsinformatie:</strong> Bij twijfel altijd bellen</span>
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
              Heb je advies nodig? Vind snel een dierenarts bij jou in de buurt voor hulp en begeleiding.
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
            Preventie: Bescherm Je Hond tegen Eikelvergiftiging
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Preventie is de beste aanpak. Zo voorkom je dat je hond eikels eet:
          </p>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-4">Preventiemaatregelen:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Verwijder eikels uit je tuin</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Vooral in de herfst regelmatig eikels opruimen voordat je hond ze vindt</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Let op tijdens wandelingen</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Houd je hond in de gaten bij eikenbomen en voorkom dat hij eikels oppakt</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Train "laat maar" commando</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Leer je hond om gevonden voorwerpen los te laten op commando</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Bied afleidingsmateriaal</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Zorg voor veilig kauwspeelgoed en snacks tijdens wandelingen</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Extra opletten in herfst en lente</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Dit zijn de seizoenen met het hoogste risico (vallende eikels en jonge bladeren)</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-300 dark:border-emerald-800/50 p-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
              <TreeDeciduous className="h-5 w-5 text-emerald-600" />
              Veilige Bomen en Planten
            </h3>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
              Deze bomen en struiken zijn veilig voor honden:
            </p>
            <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Esdoorn
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Wilg
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Els
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Linde (in matiging)
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veelgestelde Vragen over Eikels en Honden
          </h2>
          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Zijn alle soorten eikenbomen even giftig?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, alle eikenboomsoorten bevatten tannines en kunnen giftig zijn voor honden. Sommige soorten bevatten hogere concentraties dan andere, maar het is het veiligst om je hond van alle eikenbomen weg te houden. Rode eik (Quercus rubra) staat bekend als extra giftig.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Mijn hond heeft één eikel gegeten, moet ik me zorgen maken?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Eén eikel is zelden een probleem voor een gezonde hond. Monitor je hond wel op symptomen zoals braken of diarree. Als je hond klein is, een puppy is, of symptomen vertoont, bel dan je dierenarts voor advies. Bij twijfel is het altijd veiliger om te bellen.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kunnen eikels een darmobstructie veroorzaken?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, naast de toxische effecten van tannines kunnen eikels ook een fysieke darmobstructie veroorzaken, vooral bij kleine honden. Eikels zijn hard en kunnen de darm blokkeren. Symptomen zijn braken, buikpijn, niet kunnen poepen en lusteloosheid. Dit is een noodgeval dat onmiddellijke dierenartshulp vereist.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Zijn gedroogde eikels minder giftig dan verse?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Gedroogde, bruine eikels bevatten iets lagere tanninconcentraties dan jonge groene eikels, maar ze zijn nog steeds giftig. Het verschil is niet groot genoeg om gedroogde eikels als "veilig" te beschouwen. Alle eikels moeten worden vermeden, ongeacht hun rijpheid.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kunnen andere dieren ook ziek worden van eikels?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, eikels zijn ook giftig voor paarden, runderen, geiten en schapen. Wilde dieren zoals eekhoorns en varkens kunnen eikels eten omdat hun spijsverteringssysteem beter is aangepast om tannines te verwerken. Huisdieren zoals honden en katten missen deze aanpassing en zijn daarom gevoeliger voor tannine-vergiftiging.
              </div>
            </details>
          </div>
        </section>

        <RelatedSafeFoods
          locale="nl"
          animal="honden"
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
              Deze informatie is uitsluitend bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies. Als je hond eikels heeft gegeten en symptomen vertoont, of als je twijfelt over de veiligheid, neem dan altijd contact op met een dierenarts. Elke hond reageert anders en alleen een dierenarts kan een juiste diagnose stellen en behandeling adviseren op basis van je specifieke situatie.
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
            "headline": "Is Eikenblad en Eikels Giftig voor Honden? Tannines en Nierschade",
            "description": "Eikenbladeren en eikels bevatten tannines die giftig zijn voor honden. Grote hoeveelheden kunnen maagproblemen en nierschade veroorzaken.",
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
              "@id": "https://cutiepawspedia.com/nl/is-eikenblad-giftig-voor-honden"
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
                "name": "Zijn alle soorten eikenbomen even giftig?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ja, alle eikenboomsoorten bevatten tannines en kunnen giftig zijn voor honden. Sommige soorten bevatten hogere concentraties dan andere, maar het is het veiligst om je hond van alle eikenbomen weg te houden."
                }
              },
              {
                "@type": "Question",
                "name": "Mijn hond heeft één eikel gegeten, moet ik me zorgen maken?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Eén eikel is zelden een probleem voor een gezonde hond. Monitor je hond wel op symptomen zoals braken of diarree. Als je hond klein is, een puppy is, of symptomen vertoont, bel dan je dierenarts voor advies."
                }
              },
              {
                "@type": "Question",
                "name": "Kunnen eikels een darmobstructie veroorzaken?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ja, naast de toxische effecten van tannines kunnen eikels ook een fysieke darmobstructie veroorzaken, vooral bij kleine honden. Eikels zijn hard en kunnen de darm blokkeren. Dit is een noodgeval dat onmiddellijke dierenartshulp vereist."
                }
              },
              {
                "@type": "Question",
                "name": "Zijn gedroogde eikels minder giftig dan verse?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Gedroogde, bruine eikels bevatten iets lagere tanninconcentraties dan jonge groene eikels, maar ze zijn nog steeds giftig. Het verschil is niet groot genoeg om gedroogde eikels als veilig te beschouwen."
                }
              },
              {
                "@type": "Question",
                "name": "Kunnen andere dieren ook ziek worden van eikels?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ja, eikels zijn ook giftig voor paarden, runderen, geiten en schapen. Wilde dieren zoals eekhoorns en varkens kunnen eikels eten omdat hun spijsverteringssysteem beter is aangepast om tannines te verwerken."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
