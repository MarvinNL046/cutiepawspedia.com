/**
 * SEO Landing Page: Artritis bij huisdieren
 * Pillar 9 - Senior Huisdieren - Subpillar 3
 */

import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, AlertCircle, Activity, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Artritis bij Huisdieren: Herkennen & Behandelen | CutiePawsPedia",
  description: "Alles over artritis bij honden en katten. Leer symptomen herkennen, behandelmogelijkheden en pijnverlichting. Vind dierenartsen gespecialiseerd in artritis.",
  keywords: "artritis huisdieren, gewrichtspijn hond, artritis kat, gewrichtsontsteking, pijnverlichting huisdieren, artrose hond",
  openGraph: {
    title: "Artritis bij Huisdieren: Herkennen en Behandelen",
    description: "Praktische gids over artritis bij honden en katten. Symptomen, behandeling en pijnverlichting.",
    type: "article",
  },
};

export default function ArtritisHuisdierenPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent dark:to-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-6 w-6 text-cpCoral" />
            <span className="text-sm font-medium text-cpCoral">Senior Huisdieren</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
            Artritis bij Huisdieren: Herkennen en Behandelen
          </h1>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 leading-relaxed">
            Artritis is een veelvoorkomende aandoening bij oudere huisdieren die veel pijn kan veroorzaken. Leer de symptomen herkennen en ontdek welke behandelmogelijkheden er zijn om je huisdier comfortabel te houden.
          </p>
        </div>
      </section>

      {/* CTA 1 - Primary */}
      <section className="bg-card dark:bg-cpSurface/50 border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-2xl p-8 text-center shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-3">
              Vermoedt je artritis bij je huisdier?
            </h2>
            <p className="text-white/90 mb-6">
              Vind dierenartsen met expertise in gewrichtsaandoeningen en pijnmanagement
            </p>
            <Link
              href="/nl/netherlands"
              className="inline-block bg-white text-cpCoral px-8 py-3 rounded-xl font-semibold hover:-translate-y-1 transition-all shadow-md hover:shadow-xl"
            >
              Vind een Specialist →
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">
        <div className="prose prose-lg max-w-none">
          {/* Section 1: Wat is artritis? */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              Wat is Artritis bij Huisdieren?
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
              Artritis, ook wel gewrichtsontsteking genoemd, is een degeneratieve aandoening waarbij het kraakbeen in de gewrichten afneemt. Dit leidt tot pijn, stijfheid en verminderde mobiliteit. Hoewel het vaker voorkomt bij oudere dieren, kan het ook jonge huisdieren treffen.
            </p>
            <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl p-6 mb-6 border-l-4 border-cpCoral">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-cpCoral flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">
                    Belangrijke Feiten
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                    <li>• 20% van honden ouder dan 1 jaar heeft artritis</li>
                    <li>• 90% van katten ouder dan 12 jaar toont tekenen van artritis</li>
                    <li>• Vroege herkenning en behandeling kunnen progressie vertragen</li>
                    <li>• Artritis is niet te genezen, maar wel te managen</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Symptomen herkennen */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              Symptomen van Artritis Herkennen
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
              Huisdieren verbergen pijn vaak goed. Het is belangrijk om subtiele veranderingen in gedrag op te merken:
            </p>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-3">
              Bij Honden
            </h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Stijfheid:</strong> Vooral na slapen of lang liggen, verbetert vaak na bewegen
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Mank lopen:</strong> Voorzichtig lopen of een poot ontlasten
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Verminderde activiteit:</strong> Minder interesse in spelen, wandelen of traplopen
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Moeite met opstaan:</strong> Vooral na langdurig rusten
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Gedragsveranderingen:</strong> Prikkelbaarheid, terugtrekken, of agressie bij aanraking
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-3">
              Bij Katten
            </h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Verminderd springen:</strong> Niet meer naar favoriete hoge plekken springen
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Toiletproblemen:</strong> Moeite met in/uit kattenbak komen, ongelukjes
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Minder poetsen:</strong> Vacht wordt minder verzorgd, vooral moeilijk bereikbare plekken
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Veranderd slaapgedrag:</strong> Slapen op andere, makkelijker bereikbare plekken
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Verminderde activiteit:</strong> Minder spelen en jagen op speelgoed
                </span>
              </li>
            </ul>
          </section>

          {/* CTA 2 - Secondary */}
          <section className="my-12">
            <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl p-8 border-l-4 border-cpAmber">
              <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-3">
                Herken je deze symptomen?
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
                Vroege diagnose en behandeling kunnen een groot verschil maken. Vind een dierenarts bij jou in de buurt.
              </p>
              <Link
                href="/nl/netherlands"
                className="inline-block bg-cpAmber text-white px-6 py-3 rounded-xl font-semibold hover:-translate-y-1 transition-all"
              >
                Vind een Dierenarts →
              </Link>
            </div>
          </section>

          {/* Section 3: Diagnose */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              Hoe wordt Artritis Gediagnosticeerd?
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
              De dierenarts zal verschillende methoden gebruiken om artritis te diagnosticeren:
            </p>
            <div className="space-y-4 mb-6">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-semibold text-foreground dark:text-cpCream mb-2 flex items-center gap-2">
                  <span className="text-cpCoral">1.</span> Lichamelijk Onderzoek
                </h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  De dierenarts voelt de gewrichten, controleert de bewegelijkheid en let op pijnreacties. Bij katten is dit vaak uitdagender omdat ze pijn goed verbergen.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-semibold text-foreground dark:text-cpCream mb-2 flex items-center gap-2">
                  <span className="text-cpCoral">2.</span> Röntgenfoto's
                </h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Röntgenopnames kunnen veranderingen in de gewrichten laten zien zoals botafwijkingen, verminderde gewrichtsruimte en botwoekeringen (osteofyten).
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-semibold text-foreground dark:text-cpCream mb-2 flex items-center gap-2">
                  <span className="text-cpCoral">3.</span> Bloedonderzoek
                </h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Om andere aandoeningen uit te sluiten en om te controleren of pijnstillers veilig gegeven kunnen worden (nier- en leverfunctie).
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-semibold text-foreground dark:text-cpCream mb-2 flex items-center gap-2">
                  <span className="text-cpCoral">4.</span> Gewrichtsvloeistof Analyse
                </h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  In sommige gevallen kan gewrichtsvloeistof worden afgenomen om te onderzoeken op infecties of ontstekingen.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Behandelmogelijkheden */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-cpAmber" />
              Behandelmogelijkheden voor Artritis
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
              Hoewel artritis niet te genezen is, zijn er veel manieren om je huisdier comfortabel te houden:
            </p>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-3">
              1. Medicatie
            </h3>
            <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl p-6 mb-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground dark:text-cpCream/80">
                    <strong>NSAID's (ontstekingsremmers):</strong> Zoals Metacam, Previcox voor pijnverlichting en ontstekingsremming
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground dark:text-cpCream/80">
                    <strong>Pijnstillers:</strong> Zoals gabapentine of tramadol voor extra pijnverlichting
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground dark:text-cpCream/80">
                    <strong>Gewrichtsinjecties:</strong> Met cortison of hyaluronzuur voor langdurige verlichting
                  </span>
                </li>
              </ul>
            </div>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-3">
              2. Supplementen
            </h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Glucosamine en Chondroïtine:</strong> Helpen kraakbeen te behouden
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Omega-3 vetzuren:</strong> Anti-inflammatoire werking
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Groenlipmossel:</strong> Natuurlijke bron van glucosamine
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-3">
              3. Gewichtsmanagement
            </h3>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Overgewicht belast de gewrichten extra. Zelfs een klein gewichtsverlies kan een groot verschil maken in mobiliteit en pijn. Werk samen met je dierenarts aan een gezond gewicht.
            </p>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-3">
              4. Fysiotherapie en Beweging
            </h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Hydrotherapie:</strong> Zwemmen is een uitstekende low-impact oefening
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Massage:</strong> Helpt stijve spieren te ontspannen
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Gecontroleerde beweging:</strong> Regelmatige, zachte oefening voorkomt verstijving
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-3">
              5. Alternative Therapieën
            </h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Acupunctuur:</strong> Kan helpen bij pijnverlichting
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Laser therapie:</strong> Vermindert pijn en ontsteking
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Warmtebehandeling:</strong> Verwarmde bedden voor ontspanning van stijve gewrichten
                </span>
              </li>
            </ul>
          </section>

          {/* Section 5: Thuiszorg */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              Thuiszorg voor Huisdieren met Artritis
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
              Kleine aanpassingen thuis kunnen een groot verschil maken:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Orthopedische bedden voor betere gewrichtsondersteuning
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Anti-slip matten op gladde vloeren
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Lage kattenbakken met makkelijke toegang
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Verhoogde voer- en waterbakken (vooral voor honden)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Trapjes of loopplanken naar favoriete plekken
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Warmte (verwarmingskussens, infraroodlampen) voor stijve gewrichten
                </span>
              </li>
            </ul>
          </section>

          {/* Internal Links Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              Lees Ook Over Senior Huisdieren
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/seo/senior-huisdieren/oudere-hond-verzorgen"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20 hover:border-cpCoral transition-all"
              >
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">
                  Oudere Hond Verzorgen
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Speciale behoeften en tips voor je senior hond
                </p>
              </Link>
              <Link
                href="/seo/senior-huisdieren/katten-op-leeftijd"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20 hover:border-cpCoral transition-all"
              >
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">
                  Katten op Leeftijd
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Gezondheid, voeding en comfort voor oudere katten
                </p>
              </Link>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Veelgestelde Vragen
            </h2>
            <div className="space-y-4">
              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-foreground dark:text-cpCream">
                  Kan artritis genezen worden?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/70">
                  Nee, artritis is een degeneratieve aandoening die niet te genezen is. Maar met de juiste combinatie van medicatie, supplementen, gewichtsmanagement en aanpassingen thuis kan je huisdier nog jaren comfortabel leven met minimale pijn.
                </p>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-foreground dark:text-cpCream">
                  Welke honden hebben het grootste risico op artritis?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/70">
                  Grote rassen zoals Labrador Retrievers, Duitse Herders en Golden Retrievers hebben een hoger risico. Ook honden met overgewicht, vorige gewrichtsblessures of aangeboren afwijkingen zoals heup- of elleboogdysplasie lopen meer risico.
                </p>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-foreground dark:text-cpCream">
                  Zijn menselijke pijnstillers veilig voor huisdieren?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/70">
                  NEE! Geef nooit menselijke pijnstillers aan je huisdier zonder overleg met de dierenarts. Medicijnen zoals paracetamol en ibuprofen kunnen ernstig giftig zijn voor honden en katten. Gebruik alleen door de dierenarts voorgeschreven medicatie.
                </p>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-foreground dark:text-cpCream">
                  Hoeveel beweging is goed voor een huisdier met artritis?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/70">
                  Regelmatige, zachte beweging is belangrijk om gewrichten soepel te houden. Kortere, frequentere wandelingen zijn beter dan lange uitstapjes. Zwemmen is ideaal omdat het low-impact is. Vermijd springen, rennen en plotselinge bewegingen. Luister naar je huisdier en pas activiteit aan aan hun comfort.
                </p>
              </details>
            </div>
          </section>
        </div>
      </article>

      {/* CTA 3 - Tertiary */}
      <section className="bg-secondary dark:bg-cpCharcoal border-t border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-6xl px-4 py-16">
          <div className="relative overflow-hidden rounded-3xl shadow-xl bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ontdek Alle Huisdierservices
            </h2>
            <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
              Van dierenartsen tot fysiotherapeuten: vind de beste zorg voor je huisdier met artritis in jouw regio.
            </p>
            <Link
              href="/nl/netherlands"
              className="inline-block bg-white text-cpCoral px-8 py-4 rounded-2xl font-semibold hover:-translate-y-1 transition-all shadow-lg hover:shadow-xl text-lg"
            >
              Bekijk Alle Services →
            </Link>
          </div>
        </div>
      </section>

      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Artritis bij Huisdieren: Herkennen en Behandelen",
            description: "Alles over artritis bij honden en katten. Leer symptomen herkennen, behandelmogelijkheden en pijnverlichting.",
            author: {
              "@type": "Organization",
              name: "CutiePawsPedia",
            },
            publisher: {
              "@type": "Organization",
              name: "CutiePawsPedia",
              logo: {
                "@type": "ImageObject",
                url: "https://cutiepawspedia.com/logo.png",
              },
            },
            datePublished: "2024-01-15",
            dateModified: "2024-01-15",
          }),
        }}
      />
    </div>
  );
}
