/**
 * Pet Toxicity Canonical Page: Chocolade (Chocolate) - Katten (Cats)
 * Type: Food
 * Toxicity Level: HOOG (HIGH)
 * Locale: nl (Dutch)
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Candy, Phone, Clock, Heart, XCircle } from "lucide-react";
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: "Is Chocolade Giftig voor Katten? | Symptomen & Wat Te Doen",
  description: "Chocolade is giftig voor katten door theobromine. Minder vaak gegeten dan bij honden maar even gevaarlijk. Herken symptomen en weet wat te doen bij chocoladevergiftiging.",
  keywords: [
    "chocolade giftig voor katten",
    "kat chocola gegeten",
    "theobromine katten",
    "chocolade vergiftiging kat",
    "pure chocola giftig katten",
    "spoed dierenarts kat",
    "chocolade toxiciteit katten",
    "kat cacao gegeten"
  ],
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "Is Chocolade Giftig voor Katten? Theobromine Vergiftiging",
    description: "Chocolade is giftig voor katten door theobromine. Minder vaak gegeten dan bij honden maar even gevaarlijk.",
    type: "article",
  },
};

export default function IsChocoladeGiftigVoorKatten() {
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
            currentPage="Chocolade voor Katten"
          />

          <div className="flex items-center gap-2 mb-4">
            <Candy className="h-6 w-6 text-red-600" />
            <span className="text-sm font-medium text-red-600">Giftig Voedsel voor Katten</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
            Is Chocolade Giftig voor Katten?
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
                  Chocolade is giftig voor katten door theobromine en cafeïne - stoffen die katten niet goed kunnen afbreken. Hoewel katten minder vaak chocolade eten dan honden (katten proeven geen zoet), is chocolade net zo gevaarlijk. Pure chocolade en cacaopoeder zijn het meest toxisch. Symptomen variëren van braken tot hartritmestoornissen en stuipen.
                </p>
              </div>
            </div>
          </div>

          {/* Warning CTA */}
          <div className="bg-red-100 dark:bg-red-900/30 border-2 border-red-400 dark:border-red-700 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-700 dark:text-red-400 flex-shrink-0" />
              <div>
                <p className="text-foreground dark:text-cpCream font-bold mb-2">Je kat heeft chocolade gegeten?</p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  Neem contact op met je dierenarts. Vertel welk type chocolade (melk, puur, wit) en hoeveel je kat heeft gegeten. Pure chocolade en cacaopoeder vereisen directe actie.
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
              className="bg-red-700 text-white hover:bg-red-800 rounded-xl w-full md:w-auto"
            >
              <Link href="/nl/netherlands">
                Vind een dierenarts →
              </Link>
            </Button>
          </div>

          <p className="text-muted-foreground dark:text-cpCream/80 text-sm">
            Deze pagina bevat belangrijke informatie over chocoladevergiftiging bij katten, symptomen, behandeling en preventie.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">
        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Waarom Is Chocolade Giftig voor Katten?
          </h2>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Chocolade bevat theobromine en cafeïne - twee stimulerende stoffen uit de cacaoboon. Mensen en honden kunnen deze stoffen relatief snel afbreken, maar katten metaboliseren theobromine extreem langzaam. Dit betekent dat zelfs kleine hoeveelheden chocolade kunnen ophopen in het lichaam van een kat en toxische effecten veroorzaken.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Het goede nieuws is dat katten evolutionair geen smaakpapillen hebben voor zoetigheid - ze kunnen letterlijk geen zoet proeven. Daarom zijn katten vaak niet geïnteresseerd in chocolade. Maar sommige katten zijn nieuwsgierig naar de geur of de textuur, en jonge katten kunnen per ongeluk chocolade eten. Ook kunnen katten chocoladeproducten eten die nog andere aantrekkelijke ingrediënten bevatten (zoals vet of melk).
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            De ernst van chocoladevergiftiging hangt af van het type chocolade (pure chocola = gevaarlijker), de hoeveelheid, en de grootte van je kat. Pure chocolade en bakchocolade bevatten de hoogste concentraties theobromine en zijn het meest giftig. Witte chocolade bevat bijna geen theobromine maar kan nog steeds maagproblemen veroorzaken.
          </p>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-5 mb-6">
            <p className="text-sm text-foreground dark:text-cpCream font-medium mb-2">
              Let op: Waarom eten katten minder vaak chocolade?
            </p>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              Katten zijn obligate carnivoren (pure vleeteters) en hebben genetisch geen TAS1R2-gen dat nodig is om zoet te proeven. Hierdoor zijn ze natuurlijk niet aangetrokken tot chocolade zoals honden of mensen. Maar katten kunnen nog steeds per ongeluk chocolade eten als ze nieuwsgierig zijn, of als chocolade gecombineerd is met andere geuren die ze wel aantrekkelijk vinden.
            </p>
          </div>
        </section>

        {/* Toxicity Details */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <AlertTriangle className="h-7 w-7 text-red-600" />
            Welke Chocoladesoorten Zijn Gevaarlijk?
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-red-300/30 p-6 mb-6">
            <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
              Niet alle chocolade is even gevaarlijk. Het theobromine-gehalte varieert per type:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Cacaopoeder en bakchocolade (ZEER GEVAARLIJK)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Hoogste theobromine-concentratie - al een klein beetje kan ernstig zijn</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Pure chocolade 70-90% (GEVAARLIJK)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Hoog theobromine-gehalte, zeer risicovol</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Halfvolle/melkchocolade (MATIG GEVAARLIJK)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Lager theobromine maar nog steeds giftig in grotere hoeveelheden</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpAmber text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Witte chocolade (LAAG RISICO)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Bijna geen theobromine, maar kan maagproblemen veroorzaken door vet/suiker</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800/50 rounded-xl p-5">
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Belangrijk:</strong> Ook al kunnen katten minder vaak chocolade eten dan honden, de toxische effecten zijn hetzelfde. Pure chocolade is het gevaarlijkst. Witte chocolade bevat bijna geen theobromine maar kan nog steeds maagproblemen geven. Bij twijfel altijd je dierenarts bellen.
            </p>
          </div>
        </section>

        {/* Symptoms */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Symptomen van Chocoladevergiftiging bij Katten
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Symptomen kunnen binnen 2-12 uur na inname optreden. De ernst hangt af van hoeveel en welk type chocolade je kat heeft gegeten:
          </p>

          <div className="space-y-4 mb-6">
            {/* Mild symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-cpAmber" />
                Milde Symptomen (Kleine Hoeveelheden)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Braken</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Diarree</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Verhoogde dorst</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Onrustig gedrag</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Hyperactiviteit</strong></span>
                </li>
              </ul>
            </div>

            {/* Moderate symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-orange-300/30 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Matige Symptomen (Grotere Hoeveelheden)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Snelle hartslag</strong> (tachycardie)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Snelle ademhaling</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Rusteloosheid en trillen</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Verhoogde lichaamstemperatuur</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span><strong>Toegenomen plassen</strong></span>
                </li>
              </ul>
            </div>

            {/* Severe symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-red-300/30 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-600" />
                Ernstige Symptomen (Hoge Doses - Noodgeval)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Hartritmestoornissen</strong> (abnormaal hartritme)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Spierstuiptrekkingen</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Stuipen/toevallen</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Coma</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Overlijden</strong> (in ernstige gevallen zonder behandeling)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-5">
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Belangrijk:</strong> De symptomen kunnen verergeren naarmate de theobromine zich ophoopt in het lichaam. Omdat katten theobromine zo langzaam afbreken, kunnen symptomen tot 72 uur aanhouden en verergeren. Vroege behandeling is cruciaal om ernstige complicaties te voorkomen.
            </p>
          </div>
        </section>

        {/* What To Do */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Heart className="h-7 w-7 text-cpCoral" />
            Wat Te Doen Als Je Kat Chocolade Heeft Gegeten
          </h2>

          <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-400 dark:border-red-700 rounded-xl p-6 mb-6">
            <p className="text-foreground dark:text-cpCream font-bold mb-4 text-lg">
              Volg deze stappen:
            </p>
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Bepaal welk type en hoeveel</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Probeer vast te stellen welk type chocolade (pure, melk, wit) en ongeveer hoeveel je kat heeft gegeten. Dit is belangrijke informatie voor de dierenarts.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Bel je dierenarts DIRECT</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Bel ook als je kat nog geen symptomen vertoont. De dierenarts kan bepalen of behandeling nodig is op basis van type chocolade en hoeveelheid.
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
                    Laat de dierenarts beslissen of braken opwekken veilig is. Bij katten kan dit gevaarlijk zijn zonder professionele supervisie.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  4
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Monitor symptomen</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Let op braken, diarree, onrustig gedrag, snelle hartslag of ademhaling. Noteer wanneer symptomen beginnen.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  5
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Volg dierenarts-advies op</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    De dierenarts kan adviseren om te monitoren thuis, of om direct naar de praktijk te komen voor behandeling.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl border border-cpCoral/30 dark:border-cpCoral/20 p-5">
            <p className="text-sm text-foreground dark:text-cpCream mb-3">
              <strong>Behandeling door de dierenarts:</strong> Als de inname recent was (binnen 2 uur), kan de dierenarts braken opwekken. Daarna krijgt je kat vaak actieve kool om de theobromine-opname te verminderen. Ondersteunende zorg bestaat uit infuus voor hydratatie, medicijnen tegen braken, en mogelijk medicijnen om de hartslag te stabiliseren. Bij ernstige symptomen (stuipen, hartritmestoornissen) is intensieve 24-uurs zorg nodig.
            </p>
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Prognose:</strong> Met snelle behandeling herstellen de meeste katten volledig. Omdat theobromine langzaam wordt afgebroken kan monitoring tot 72 uur nodig zijn. Zonder behandeling kunnen ernstige gevallen fataal zijn.
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
              Bel de dierenarts als:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je kat <strong>pure chocolade of cacaopoeder</strong> heeft gegeten (direct bellen!)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je kat <strong>melkchocolade</strong> heeft gegeten (schat hoeveel)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span>Je kat <strong>symptomen</strong> vertoont (braken, onrust, snelle hartslag)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span>Het om een <strong>kitten of kleine kat</strong> gaat (gevoeliger)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cpAmber mt-0.5">•</span>
                <span>Je <strong>twijfelt</strong> over de ernst</span>
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
            Preventie: Houd Chocolade Weg van Katten
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Gelukkig zijn de meeste katten niet geïnteresseerd in chocolade, maar preventie blijft belangrijk:
          </p>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-4">Preventiemaatregelen:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Bewaar chocolade veilig</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">In kasten of afgesloten containers waar katten niet bij kunnen</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Ruim direct op na gebruik</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Laat geen chocolade of chocoladerepen rondslingeren</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Let op tijdens feestdagen</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Pasen, Sinterklaas en Kerst zijn piekperioden voor chocolade in huis</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Waarschuw huisgenoten en kinderen</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Vertel iedereen dat katten geen chocolade mogen krijgen</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Let extra op bij bakken</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Cacaopoeder en pure chocolade zijn zeer giftig - houd katten uit de keuken tijdens bakken</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-300 dark:border-emerald-800/50 p-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
              <Candy className="h-5 w-5 text-emerald-600" />
              Veilige Traktaties voor Katten
            </h3>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
              In plaats van menselijk snoep, kies voor kattenvriendelijke snacks:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Commerciële kattensnacks
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Kleine stukjes gekookte kip of vis
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Kattengrassticks
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Vries-droogde vleessnacks voor katten
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veelgestelde Vragen over Chocolade en Katten
          </h2>
          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Waarom eten katten minder vaak chocolade dan honden?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Katten hebben geen TAS1R2-gen en kunnen daarom geen zoet proeven. Ze zijn evolutionair obligate carnivoren (pure vleeteters) en hebben geen behoefte aan zoete smaken. Daarom zijn katten van nature niet aangetrokken tot chocolade zoals honden of mensen. Maar sommige katten kunnen nog steeds per ongeluk chocolade eten uit nieuwsgierigheid, of als chocolade gemengd is met andere geuren die ze wel aantrekkelijk vinden (zoals vet).
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Is witte chocolade ook giftig voor katten?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Witte chocolade bevat bijna geen theobromine omdat het gemaakt is van cacaoboter (vet) en geen cacaopoeder. Daarom is het risico op theobromine-vergiftiging zeer laag. Echter, witte chocolade bevat veel vet en suiker, wat nog steeds maagproblemen, braken en diarree kan veroorzaken. Het is niet levensgevaarlijk zoals pure chocolade, maar nog steeds niet geschikt voor katten.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Mijn kat heeft aan melkchocolade gelikt, is dat gevaarlijk?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Een klein likje melkchocolade is waarschijnlijk niet gevaarlijk, maar het is verstandig om je kat te monitoren op symptomen en je dierenarts te bellen voor advies. De dierenarts kan inschatten of de hoeveelheid zorgwekkend is op basis van de grootte van je kat. Bij twijfel altijd bellen - beter veilig dan sorry.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Hoe lang duurt het voordat symptomen verschijnen?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Symptomen kunnen binnen 2-12 uur na inname optreden, afhankelijk van hoeveel chocolade je kat heeft gegeten. Omdat katten theobromine zo langzaam afbreken, kunnen symptomen tot 72 uur aanhouden en soms zelfs verergeren. Daarom is monitoring voor meerdere dagen belangrijk, en waarom vroege behandeling cruciaal is.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kunnen katten overlijden aan chocoladevergiftiging?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, in ernstige gevallen zonder behandeling kan chocoladevergiftiging fataal zijn. Dit gebeurt voornamelijk bij hoge doses pure chocolade of cacaopoeder. De toxische effecten op het hart en zenuwstelsel kunnen leiden tot hartritmestoornissen, stuipen, coma en overlijden. Met snelle veterinaire behandeling herstellen de meeste katten echter volledig. Daarom is vroege actie zo belangrijk.
              </div>
            </details>
          </div>
        </section>

        {/* Safe Food Alternatives */}
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
              Deze informatie is uitsluitend bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies. Als je kat chocolade heeft gegeten, neem dan contact op met een dierenarts voor advies specifiek voor jouw situatie. Elke kat is anders en alleen een dierenarts kan een juiste diagnose stellen en behandeling adviseren. De informatie op deze pagina is gebaseerd op veterinaire kennis en wetenschappelijke bronnen.
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
            "headline": "Is Chocolade Giftig voor Katten? Theobromine Vergiftiging",
            "description": "Chocolade is giftig voor katten door theobromine. Minder vaak gegeten dan bij honden maar even gevaarlijk.",
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
              "@id": "https://cutiepawspedia.com/nl/is-chocolade-giftig-voor-katten"
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
                "name": "Waarom eten katten minder vaak chocolade dan honden?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Katten hebben geen TAS1R2-gen en kunnen daarom geen zoet proeven. Ze zijn evolutionair obligate carnivoren (pure vleeteters) en hebben geen behoefte aan zoete smaken. Daarom zijn katten van nature niet aangetrokken tot chocolade."
                }
              },
              {
                "@type": "Question",
                "name": "Is witte chocolade ook giftig voor katten?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Witte chocolade bevat bijna geen theobromine omdat het gemaakt is van cacaoboter en geen cacaopoeder. Het risico op theobromine-vergiftiging is zeer laag. Echter, witte chocolade bevat veel vet en suiker, wat maagproblemen kan veroorzaken."
                }
              },
              {
                "@type": "Question",
                "name": "Mijn kat heeft aan melkchocolade gelikt, is dat gevaarlijk?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Een klein likje melkchocolade is waarschijnlijk niet gevaarlijk, maar het is verstandig om je kat te monitoren op symptomen en je dierenarts te bellen voor advies. Bij twijfel altijd bellen - beter veilig dan sorry."
                }
              },
              {
                "@type": "Question",
                "name": "Hoe lang duurt het voordat symptomen verschijnen?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Symptomen kunnen binnen 2-12 uur na inname optreden. Omdat katten theobromine zo langzaam afbreken, kunnen symptomen tot 72 uur aanhouden en soms zelfs verergeren. Daarom is monitoring voor meerdere dagen belangrijk."
                }
              },
              {
                "@type": "Question",
                "name": "Kunnen katten overlijden aan chocoladevergiftiging?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ja, in ernstige gevallen zonder behandeling kan chocoladevergiftiging fataal zijn. Dit gebeurt voornamelijk bij hoge doses pure chocolade of cacaopoeder. Met snelle veterinaire behandeling herstellen de meeste katten echter volledig."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
