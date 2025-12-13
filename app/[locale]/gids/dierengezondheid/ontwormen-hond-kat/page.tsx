/**
 * SEO Landing Page: Ontwormen van hond en kat
 * Pillar: Dierengezondheid (Pet Health)
 * Target: Dutch pet owners seeking deworming information
 */

import type { Metadata } from "next";
import { GidsBreadcrumbs } from '@/components/gids';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertTriangle, Calendar, Pill, Info, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Ontwormen Hond en Kat: Hoe Vaak en Welke Middelen? 2025",
  description: "Complete gids voor ontwormen: hoe vaak moet je ontwormen, welke wormen komen voor, beste ontwormingsmiddelen en advies per leeftijd. Vind een dierenarts bij jou in de buurt.",
  keywords: [
    "ontwormen hond",
    "ontwormen kat",
    "ontwormingsmiddel",
    "hoe vaak ontwormen",
    "wormen bij hond",
    "wormen bij kat",
    "puppy ontwormen",
    "kitten ontwormen",
    "drontal",
    "panacur"
  ],
  openGraph: {
    title: "Ontwormen Hond en Kat: Hoe Vaak en Welke Middelen?",
    description: "Leer alles over ontwormen: frequentie, middelen en symptomen van wormenbesmetting.",
    type: "article",
  },
};

export default function OntwormenPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent dark:to-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="flex items-center gap-2 mb-4">
            <Pill className="h-6 w-6 text-cpCoral" />
            <span className="text-sm font-medium text-cpCoral">Dierengezondheid</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-4">
            Ontwormen van Hond en Kat: Hoe Vaak en Welke Middelen?
          </h1>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6">
            Wormen zijn veelvoorkomende parasieten bij honden en katten. Ontdek hoe vaak je moet ontwormen, welke wormen voorkomen en welke middelen het beste werken.
          </p>

          {/* Primary CTA */}
          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 border border-cpCoral/30 dark:border-cpCoral/20 rounded-2xl p-6 mb-6">
            <p className="text-foreground dark:text-cpCream mb-3 font-medium">
              💊 Tijd voor ontworming of advies?
            </p>
            <Button
              asChild
              size="lg"
              className="bg-cpCoral text-white hover:bg-cpCoral/90 rounded-xl w-full md:w-auto"
            >
              <Link href="/nl/netherlands">
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
            Ontwormen is een essentieel onderdeel van de gezondheidszorg voor je hond of kat. Wormen zijn inwendige parasieten die in de darmen, longen of andere organen kunnen leven. Ze kunnen niet alleen je huisdier ziek maken, maar sommige wormen (zoals spoelwormen) kunnen ook op mensen worden overgedragen, vooral kinderen.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Regelmatig ontwormen voorkomt ernstige gezondheidsproblemen en beschermt zowel je huisdier als je gezin. In deze gids lees je precies hoe vaak je moet ontwormen, welke middelen het beste werken en hoe je wormenbesmetting kunt herkennen.
          </p>
        </section>

        {/* Soorten Wormen */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Info className="h-7 w-7 text-cpCoral" />
            Welke Wormen Komen Voor bij Honden en Katten?
          </h2>

          <div className="space-y-4 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                Spoelwormen (Roundworms)
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <p><strong>Meest voorkomend bij:</strong> Puppy's en kittens (vaak al besmet vanaf geboorte)</p>
                <p><strong>Hoe besmet:</strong> Via moedermelk, besmet vlees, contact met besmette ontlasting</p>
                <p><strong>Symptomen:</strong> Opgezette buik, braken, diarree, matte vacht, groeistoornis</p>
                <p><strong>Risico voor mensen:</strong> Ja - vooral kinderen via zand/grond contact</p>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                Lintwormen (Tapeworms)
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <p><strong>Meest voorkomend bij:</strong> Honden en katten met vlooien</p>
                <p><strong>Hoe besmet:</strong> Door het inslikken van besmette vlooien of rauw vlees</p>
                <p><strong>Symptomen:</strong> Rijstkorrels in ontlasting, 'slee-rijden' (billen over grond schuiven), gewichtsverlies</p>
                <p><strong>Risico voor mensen:</strong> Minimaal (alleen bij inslikken van vlooien)</p>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                Haakwormen (Hookworms)
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <p><strong>Meest voorkomend bij:</strong> Honden die veel buiten komen</p>
                <p><strong>Hoe besmet:</strong> Via huid (poten) of inslikken van larven</p>
                <p><strong>Symptomen:</strong> Bloederige diarree, bloedarmoede, gewichtsverlies, zwakte</p>
                <p><strong>Risico voor mensen:</strong> Ja - kan huiduitslag veroorzaken</p>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                Zweepwormen (Whipworms)
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <p><strong>Meest voorkomend bij:</strong> Honden (zeldzaam bij katten)</p>
                <p><strong>Hoe besmet:</strong> Via besmette grond of ontlasting</p>
                <p><strong>Symptomen:</strong> Chronische diarree, gewichtsverlies, bloed in ontlasting</p>
                <p><strong>Risico voor mensen:</strong> Minimaal</p>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                Longwormen (Lungworms)
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <p><strong>Meest voorkomend bij:</strong> Katten die jagen (slakken/naaktslakken eten)</p>
                <p><strong>Hoe besmet:</strong> Via slakken, naaktslakken of besmette vogels/muizen</p>
                <p><strong>Symptomen:</strong> Hoesten, benauwdheid, lusteloosheid</p>
                <p><strong>Risico voor mensen:</strong> Nee</p>
              </div>
            </div>
          </div>
        </section>

        {/* Ontwormingsschema */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Calendar className="h-7 w-7 text-cpCoral" />
            Hoe Vaak Ontwormen? Advies per Leeftijd
          </h2>

          <div className="space-y-6 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-4">Puppy's en Kittens (0-6 maanden)</h3>
              <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-4 mb-4">
                <p className="text-sm font-semibold text-foreground dark:text-cpCream mb-2">Om de 2 weken tot 12 weken oud</p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Puppy's en kittens zijn vaak al besmet via de moeder en hebben een zwak immuunsysteem.</p>
              </div>
              <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground dark:text-cpCream mb-2">Maandelijks van 12 weken tot 6 maanden</p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Jonge dieren lopen nog steeds verhoogd risico op wormenbesmetting.</p>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-4">Volwassen Honden en Katten (6+ maanden)</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-lg p-4">
                  <p className="text-sm font-semibold text-foreground dark:text-cpCream mb-2">Hoog risico (om de 1-2 maanden)</p>
                  <ul className="space-y-1 text-sm text-muted-foreground dark:text-cpCream/70">
                    <li>• Jachthonden</li>
                    <li>• Katten die jagen</li>
                    <li>• Dieren met veel buitencontact</li>
                    <li>• Gezinnen met jonge kinderen</li>
                  </ul>
                </div>
                <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-lg p-4">
                  <p className="text-sm font-semibold text-foreground dark:text-cpCream mb-2">Gemiddeld risico (4x per jaar)</p>
                  <ul className="space-y-1 text-sm text-muted-foreground dark:text-cpCream/70">
                    <li>• Buitenkatten zonder jacht</li>
                    <li>• Honden met regelmatig contact met andere dieren</li>
                    <li>• Adviseer: elk seizoen</li>
                  </ul>
                </div>
              </div>
              <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-lg p-4 mt-4">
                <p className="text-sm font-semibold text-foreground dark:text-cpCream mb-2">Laag risico (2x per jaar)</p>
                <ul className="space-y-1 text-sm text-muted-foreground dark:text-cpCream/70">
                  <li>• Binnenkatten zonder buitencontact</li>
                  <li>• Honden met beperkt buitencontact</li>
                </ul>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-4">Drachtige/Zogende Moederdieren</h3>
              <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-4">
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  <strong>Belangrijk:</strong> Ontworm moederdieren voor de dekking, tijdens de dracht (week 6 bij honden) en tijdens het zogen (samen met de puppy's/kittens) om besmetting via moedermelk te voorkomen.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl border border-cpCoral/30 dark:border-cpCoral/20 p-4">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
              <span><strong>Advies:</strong> Bespreek met je dierenarts hoe vaak ontwormen het beste is voor jouw situatie. Een ontlastingsonderzoek kan helpen bepalen of je huisdier wormen heeft en welk ontwormingsschema nodig is.</span>
            </p>
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Bespreek je Ontwormingsschema met een Dierenarts
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Krijg persoonlijk advies en de juiste ontwormingsmiddelen voor jouw huisdier.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-cpCoral hover:bg-white/90 rounded-xl"
            >
              <Link href="/nl/netherlands">
                Bekijk dierenklinieken in jouw stad →
              </Link>
            </Button>
          </div>
        </section>

        {/* Ontwormingsmiddelen */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Pill className="h-7 w-7 text-cpCoral" />
            Welke Ontwormingsmiddelen Zijn het Beste?
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Er zijn verschillende ontwormingsmiddelen verkrijgbaar. De keuze hangt af van het type worm, leeftijd van je huisdier en risicoprofiel.
          </p>

          <div className="space-y-4 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream">Breed-spectrum tabletten</h3>
                <span className="text-xs bg-cpCoral/20 dark:bg-cpCoral/10 text-cpCoral px-3 py-1 rounded-full">Meest compleet</span>
              </div>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                Werken tegen meerdere soorten wormen in één behandeling. Ideaal voor reguliere ontworming.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-foreground dark:text-cpCream mb-2">Populaire merken honden:</p>
                  <ul className="space-y-1 text-sm text-muted-foreground dark:text-cpCream/70">
                    <li>• <strong>Drontal Plus</strong> - spoel-, lint-, haak- en zweepwormen</li>
                    <li>• <strong>Milbemax</strong> - breed spectrum inclusief longwormen</li>
                    <li>• <strong>Panacur</strong> - ook effectief tegen Giardia</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground dark:text-cpCream mb-2">Populaire merken katten:</p>
                  <ul className="space-y-1 text-sm text-muted-foreground dark:text-cpCream/70">
                    <li>• <strong>Drontal Kat</strong> - spoel- en lintwormen</li>
                    <li>• <strong>Milbemax Kat</strong> - breed spectrum</li>
                    <li>• <strong>Profender</strong> - spot-on (geen tablet)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">Spot-on middelen (druppels in nek)</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Handig voor katten die geen tabletten willen slikken. Ook geschikt voor jonge kittens vanaf 8 weken.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Profender</strong> - spoel- en lintwormen (katten)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Advocate</strong> - ook tegen vlooien en oormijt (honden en katten)</span>
                </li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">Pasta's en siropen</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Speciaal voor jonge puppy's en kittens vanaf 2 weken oud.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Panacur Pasta</strong> - voor puppy's/kittens en drachtige moederdieren</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Vitaminthe</strong> - mild ontwormingsmiddel op basis van plantenextracten</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-4">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              <strong>Let op:</strong> Ontwormingsmiddelen zijn geen preventie - ze doden alleen wormen die op dat moment aanwezig zijn. Gebruik alleen ontwormingsmiddelen die door je dierenarts zijn aanbevolen. De dosering moet precies kloppen op basis van gewicht.
            </p>
          </div>
        </section>

        {/* Symptomen */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <AlertTriangle className="h-7 w-7 text-cpCoral" />
            Symptomen van Wormenbesmetting
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <p className="text-foreground dark:text-cpCream/90 mb-4">
              Veel huisdieren met wormen vertonen geen symptomen, vooral in het begin. Toch zijn er waarschuwingssignalen:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-foreground dark:text-cpCream mb-3">Duidelijke symptomen:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                    <AlertTriangle className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
                    <span>Zichtbare wormen in ontlasting of rond anus ('rijstkorrels')</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                    <AlertTriangle className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
                    <span>Opgezette buik (vooral bij jonge dieren)</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                    <AlertTriangle className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
                    <span>'Slee-rijden' (billen over grond schuiven)</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                    <AlertTriangle className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
                    <span>Diarree of braken met wormen erin</span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground dark:text-cpCream mb-3">Algemene symptomen:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                    <AlertTriangle className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
                    <span>Gewichtsverlies ondanks goede eetlust</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                    <AlertTriangle className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
                    <span>Doffe, ruwe vacht</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                    <AlertTriangle className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
                    <span>Lusteloosheid en minder energie</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                    <AlertTriangle className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
                    <span>Hoesten (bij longwormen)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl border border-cpCoral/30 dark:border-cpCoral/20 p-4">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              <strong>Belangrijk:</strong> Als je symptomen ziet, neem dan contact op met je dierenarts. Een ontlastingsonderzoek kan uitwijzen welke wormen aanwezig zijn en welk middel het beste werkt.
            </p>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">
            Meer over Dierengezondheid
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/nl/gids/dierengezondheid/vlooien-teken-huisdieren" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Vlooien en Teken</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Preventie en behandeling van externe parasieten →</p>
            </Link>
            <Link href="/nl/gids/dierengezondheid/wanneer-naar-dierenarts" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Wanneer naar de Dierenarts?</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">10 waarschuwingssignalen bij huisdieren →</p>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veelgestelde Vragen over Ontwormen
          </h2>
          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Moet een binnenkat ook worden ontwormd?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, ook binnenkatten moeten regelmatig ontwormd worden, zij het minder vaak dan buitenkatten. Wormeieren kunnen binnenkomen via schoenen, kleding of andere huisdieren. Daarnaast kunnen vlooien lintwormen overdragen. Voor binnenkatten zonder risicofactoren volstaat 2x per jaar ontwormen, maar bespreek dit met je dierenarts.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kunnen mensen wormen krijgen van hun hond of kat?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, sommige wormen (vooral spoelwormen en haakwormen) kunnen van huisdier op mens worden overgedragen. Dit gebeurt vooral bij jonge kinderen die in contact komen met besmette grond of zand. Regelmatig ontwormen van je huisdier, goede hygiëne (handen wassen) en het dagelijks opruimen van ontlasting verkleinen dit risico aanzienlijk.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Werkt natuurlijke ontworming net zo goed?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Natuurlijke middelen zoals knoflook, pompoenpitten of bepaalde kruiden worden vaak aanbevolen, maar er is geen wetenschappelijk bewijs dat ze even effectief zijn als chemische ontwormingsmiddelen. Sommige kunnen zelfs schadelijk zijn (knoflook is giftig voor honden en katten). Voor betrouwbare ontworming is een door de dierenarts voorgeschreven middel de beste keuze.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kan ik mijn huisdier te vaak ontwormen?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ontwormingsmiddelen zijn over het algemeen veilig, maar onnodige behandeling kan leiden tot resistentie en belast het lichaam van je huisdier onnodig. Het is daarom belangrijk om een ontwormingsschema te volgen dat past bij het risicoprofiel van je huisdier. Een ontlastingsonderzoek kan helpen bepalen of ontworming echt nodig is.
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
              <Link href="/nl/netherlands">
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
            "headline": "Ontwormen Hond en Kat: Hoe Vaak en Welke Middelen?",
            "description": "Complete gids voor ontwormen: hoe vaak moet je ontwormen, welke wormen komen voor, beste ontwormingsmiddelen en advies per leeftijd.",
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
              "@id": "https://cutiepawspedia.com/nl/dierengezondheid/ontwormen-hond-kat"
            }
          })
        }}
      />

      <GidsBreadcrumbs
        items={[
          { label: "Dierengezondheid", href: "/nl/gids/dierengezondheid" },
          { label: "Ontwormen van hond en kat" }
        ]}
      />
    </div>
  );
}
