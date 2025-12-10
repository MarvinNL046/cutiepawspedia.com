/**
 * SEO Landing Page: Wanneer naar de dierenarts
 * Pillar: Dierengezondheid (Pet Health)
 * Target: Dutch pet owners seeking guidance on veterinary emergencies
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Heart, Clock, Phone, ThermometerIcon, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "Wanneer naar de Dierenarts? 10 Waarschuwingssignalen 2025",
  description: "Herken wanneer je huisdier medische hulp nodig heeft: 10 waarschuwingssignalen, spoedgevallen en symptomen die je niet mag negeren. Vind snel een dierenarts.",
  keywords: [
    "wanneer naar dierenarts",
    "symptomen zieke hond",
    "symptomen zieke kat",
    "noodgevallen huisdier",
    "spoed dierenarts",
    "waarschuwingssignalen huisdier",
    "ziek huisdier",
    "dierenarts bellen"
  ],
  openGraph: {
    title: "Wanneer naar de Dierenarts? 10 Waarschuwingssignalen",
    description: "Herken de signalen dat je huisdier medische hulp nodig heeft. Complete gids met spoedgevallen en symptomen.",
    type: "article",
  },
};

export default function WanneerNaarDierenarts() {
  return (
    <div className="bg-background dark:bg-cpCharcoal">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent dark:to-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="h-6 w-6 text-cpCoral" />
            <span className="text-sm font-medium text-cpCoral">Dierengezondheid</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-4">
            Wanneer naar de Dierenarts? 10 Waarschuwingssignalen
          </h1>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6">
            Als huisdiereigenaar is het soms moeilijk in te schatten wanneer een symptoom ernstig genoeg is voor de dierenarts. Leer de waarschuwingssignalen herkennen die je niet mag negeren.
          </p>

          {/* Emergency CTA */}
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800/50 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3 mb-3">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0" />
              <div>
                <p className="text-foreground dark:text-cpCream font-bold mb-1">Noodgeval?</p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Bij acute nood (bewusteloosheid, ernstig letsel, vergiftiging): bel direct een dierenarts of spoedkliniek.
                </p>
              </div>
            </div>
            <Button
              asChild
              size="lg"
              className="bg-red-600 text-white hover:bg-red-700 rounded-xl w-full md:w-auto"
            >
              <Link href="/nl/nederland">
                Vind spoed-dierenarts bij jou in de buurt →
              </Link>
            </Button>
          </div>

          {/* Primary CTA */}
          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 border border-cpCoral/30 dark:border-cpCoral/20 rounded-2xl p-6">
            <p className="text-foreground dark:text-cpCream mb-3 font-medium">
              💚 Zorgen over de gezondheid van je huisdier?
            </p>
            <Button
              asChild
              size="lg"
              className="bg-cpCoral text-white hover:bg-cpCoral/90 rounded-xl w-full md:w-auto"
            >
              <Link href="/nl/nederland">
                Vind een dierenarts bij jou in de buurt →
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">
        {/* Introduction */}
        <section className="mb-12">
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Je huisdier kan niet met woorden zeggen wanneer het zich niet lekker voelt. Als eigenaar moet je daarom letten op veranderingen in gedrag, eetlust en lichamelijke conditie. Sommige symptomen zijn onschuldig en gaan vanzelf over, maar andere vereisen snelle medische aandacht.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            In deze gids leer je de 10 belangrijkste waarschuwingssignalen herkennen, wanneer iets spoed heeft en wanneer je even kunt afwachten. Bij twijfel: bel altijd je dierenarts voor advies.
          </p>
        </section>

        {/* Direct Spoed */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <AlertTriangle className="h-7 w-7 text-red-600" />
            Direct naar de Dierenarts: Spoedgevallen
          </h2>

          <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-800/50 rounded-2xl p-6 mb-6">
            <p className="text-foreground dark:text-cpCream font-semibold mb-4">
              Bij deze symptomen moet je ONMIDDELLIJK een dierenarts bellen of naar een spoedkliniek:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-white dark:bg-cpCharcoal/50 rounded-lg p-3">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Bewusteloosheid of stuipen</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Niet wakker te krijgen, flauwvallen, epileptische aanvallen</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white dark:bg-cpCharcoal/50 rounded-lg p-3">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Ernstige ademhalingsproblemen</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Blauw tandvlees, hijgen met open mond (katten), naar adem happen</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white dark:bg-cpCharcoal/50 rounded-lg p-3">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Vergiftiging</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Chocolade, druiven, rattengif, gif, medicijnen - alles wat giftig kan zijn</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white dark:bg-cpCharcoal/50 rounded-lg p-3">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Ernstig letsel of bloeding</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Auto-ongeluk, val van hoogte, diepe snijwonden, botbreuk</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white dark:bg-cpCharcoal/50 rounded-lg p-3">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Maagdraaiing (vooral grote honden)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Opgezette buik, kokhalzen zonder braken, rusteloosheid, speekselvloed</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white dark:bg-cpCharcoal/50 rounded-lg p-3">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Niet kunnen plassen (vooral katten)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Urinewegblokkade is levensgevaarlijk binnen 24-48 uur</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white dark:bg-cpCharcoal/50 rounded-lg p-3">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Oververhitting / hittestress</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Extreem hijgen, temperature >40°C, braken, bewustzijnsverlies</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-4">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 flex items-start gap-2">
              <Phone className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
              <span><strong>Tip:</strong> Heb het telefoonnummer van je dierenarts én de dichtstbijzijnde spoedkliniek altijd bij de hand. Sommige klinieken zijn 24/7 geopend, andere hebben wisselende spoeddiensten.</span>
            </p>
          </div>
        </section>

        {/* 10 Waarschuwingssignalen */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Activity className="h-7 w-7 text-cpCoral" />
            10 Waarschuwingssignalen: Bel je Dierenarts
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Deze symptomen zijn misschien niet direct levensgevaarlijk, maar vereisen wel medische aandacht binnen 24-48 uur:
          </p>

          <div className="space-y-6">
            {/* Waarschuwingssignaal 1 */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">1</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Weigeren van Eten en Drinken (>24 uur)</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Geen interesse in eten kan duiden op pijn, koorts, vergiftiging of orgaanproblemen. Bij jonge dieren en katten is dit extra zorgelijk.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Let op:</strong> Katten die >48 uur niet eten lopen risico op leververvetting</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Waarschuwingssignaal 2 */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">2</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Herhaaldelijk Braken of Diarree</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Eén keer braken is vaak onschuldig, maar bij herhaaldelijk braken (>3x), diarree met bloed, of beide samen: bel je dierenarts.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Spoed bij:</strong> Bloed in braaksel/ontlasting, uitdroging (droge neus, diep liggende ogen)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Waarschuwingssignaal 3 */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">3</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Lusteloosheid en Apathie</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Je huisdier is abnormaal stil, wil niet spelen, ligt veel, reageert nauwelijks. Dit is vaak een teken van pijn of ziekte.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Normaal gedrag:</strong> Kennen jullie je huisdier het beste - elke verandering is belangrijk</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Waarschuwingssignaal 4 */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">4</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Pijn of Kreupelheid</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Janken bij aanraking, moeite met opstaan, hinken, niet willen bewegen. Pijn wordt vaak goed verborgen.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Tekenen van pijn:</strong> Stijve houding, teruggetrokken gedrag, grommen bij aanraking, veranderde ademhaling</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Waarschuwingssignaal 5 */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">5</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Veranderingen in Plassen of Poepen</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Vaker, minder vaak, bloed in urine/ontlasting, persen zonder resultaat, ongelukjes in huis.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Spoed bij katten:</strong> Kater die niet kan plassen heeft binnen 24-48 uur hulp nodig (levensgevaarlijk)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Waarschuwingssignaal 6 */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">6</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Hoesten, Niezen of Ademhalingsproblemen</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Aanhoudend hoesten (>2 dagen), hijgen zonder aanleiding, neusvloed, of ademhaling met moeite.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Let op:</strong> Katten die met open mond ademhalen hebben vaak ernstige ademhalingsproblemen (spoed!)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Waarschuwingssignaal 7 */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">7</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Plotseling Gewichtsverlies of -toename</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Onverklaard gewichtsverlies (>10% in 1 maand) of plotselinge toename kan duiden op schildklier-, nier- of leverproblematiek.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Weeg regelmatig:</strong> Vooral bij oudere dieren - vroegtijdige detectie is cruciaal</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Waarschuwingssignaal 8 */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">8</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Oog- of Oorproblemen</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Rode ogen, tranen, dichtknijpen van oog, oorvloed, krabben aan oren, schuin houden van hoofd.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Waarschuwing:</strong> Oogproblemen kunnen snel verergeren en blijvende schade veroorzaken</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Waarschuwingssignaal 9 */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">9</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Huidproblemen of Bultjes</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Kale plekken, jeuk, rode huid, zwellingen, bultjes die groeien of niet genezen, wonden die open blijven.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Controle:</strong> Bultjes bij oudere dieren altijd laten controleren (vroege detectie van kanker)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Waarschuwingssignaal 10 */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">10</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Gedragsveranderingen</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Agressie, angst, desoriëntatie, verwarring, ronddwalen 's nachts, extreme dorst. Vooral bij oudere dieren kan dit op cognitieve achteruitgang duiden.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Ouderdom:</strong> Niet alles hoort bij ouder worden - pijn en ziekte kunnen goed behandeld worden</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Zorgen over de Gezondheid van je Huisdier?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Vind een betrouwbare dierenarts in jouw regio voor een gezondheidscheck of tweede mening.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-cpCoral hover:bg-white/90 rounded-xl"
            >
              <Link href="/nl/nederland">
                Bekijk dierenklinieken in jouw stad →
              </Link>
            </Button>
          </div>
        </section>

        {/* Extra Tips */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <ThermometerIcon className="h-7 w-7 text-cpCoral" />
            Wanneer Kun je Afwachten?
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <p className="text-foreground dark:text-cpCream/90 mb-4">
              Sommige symptomen zijn minder urgent en kun je 24-48 uur in de gaten houden voordat je de dierenarts belt:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="text-cpCoral mt-0.5">•</span>
                <span><strong>Eén keer braken:</strong> Als je huisdier daarna normaal eet en drinkt</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="text-cpCoral mt-0.5">•</span>
                <span><strong>Zachte ontlasting 1x:</strong> Zonder bloed, bij verder normaal gedrag</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="text-cpCoral mt-0.5">•</span>
                <span><strong>Licht niezen:</strong> Zonder neusvloed of koorts</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="text-cpCoral mt-0.5">•</span>
                <span><strong>Klein oppervlakkig wondje:</strong> Dat je zelf kunt reinigen en dat niet bloeit</span>
              </li>
            </ul>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-4">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              <strong>Gouden regel:</strong> Bij twijfel, bel altijd je dierenarts. Liever één keer te veel gebeld dan te laat hulp gezocht. Veel dierenartsen bieden gratis telefonisch advies.
            </p>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">
            Meer over Dierengezondheid
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/nl/dierengezondheid/vaccinaties-honden" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Vaccinaties voor Honden</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Schema, kosten en bijwerkingen →</p>
            </Link>
            <Link href="/nl/dierengezondheid/vlooien-teken-huisdieren" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Vlooien en Teken</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Preventie en behandeling →</p>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veelgestelde Vragen
          </h2>
          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Hoe meet ik de temperatuur van mijn huisdier?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Gebruik een digitale thermometer rectaal (in de anus). Normale temperatuur bij honden en katten is 38-39°C. Boven 39.5°C is koorts, boven 40°C is ernstig. Onder 37.5°C is te laag (onderkoeling). Laat iemand je helpen je huisdier vast te houden en smeer de thermometer in met vaseline.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Mijn huisdier heeft iets gegeten wat giftig kan zijn, wat nu?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Bel DIRECT je dierenarts of de Vergiftigingeninformatiecentrale (VIC) voor dieren. Geef aan: wat, hoeveel, wanneer. NIET laten braken tenzij de dierenarts dit adviseert (sommige stoffen doen meer schade bij braken). Bewaar verpakking of plantenresten. Veel vergiftigingen zijn beter te behandelen als je snel ingrijpt.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Wat moet ik doen bij een epileptische aanval?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Blijf kalm. Haal gevaarlijke voorwerpen uit de buurt. Raak je huisdier NIET aan (risico op bijten). Dim het licht en maak het stil. Film de aanval indien mogelijk (helpt de dierenarts). Duur de aanval langer dan 5 minuten of komen er meerdere aanvallen achter elkaar? Bel direct de spoedkliniek. Na de aanval kan je huisdier verward zijn - geef rust en water.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Wanneer is een bezoek aan de spoedkliniek nodig?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Spoedklinieken zijn voor acute levensbedreigende situaties: ernstig letsel, vergiftiging, bewusteloosheid, ernstige ademhalingsproblemen, maagdraaiing, urineretentie. Voor minder urgente zaken kun je vaak beter wachten tot je eigen dierenarts open is (continuïteit van zorg + kosten). Bij twijfel: bel eerst je eigen dierenarts voor advies, ook buiten openingstijden hebben veel praktijken een telefonische spoedlijn.
              </div>
            </details>
          </div>
        </section>

        {/* Tertiary CTA */}
        <section className="mb-8">
          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl border border-cpAmber/30 dark:border-cpAmber/20 p-6 text-center">
            <p className="text-foreground dark:text-cpCream mb-4">
              Op zoek naar meer informatie over huisdiergezondheid en -diensten?
            </p>
            <Button
              asChild
              variant="outline"
              className="border-cpAmber text-cpAmber hover:bg-cpAmber/10 rounded-xl"
            >
              <Link href="/nl/nederland">
                Ontdek alle huisdierservices →
              </Link>
            </Button>
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
            "headline": "Wanneer naar de Dierenarts? 10 Waarschuwingssignalen",
            "description": "Herken wanneer je huisdier medische hulp nodig heeft: 10 waarschuwingssignalen, spoedgevallen en symptomen die je niet mag negeren.",
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
            "datePublished": "2025-01-15",
            "dateModified": "2025-01-15",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://cutiepawspedia.com/nl/dierengezondheid/wanneer-naar-dierenarts"
            }
          })
        }}
      />
    </div>
  );
}
