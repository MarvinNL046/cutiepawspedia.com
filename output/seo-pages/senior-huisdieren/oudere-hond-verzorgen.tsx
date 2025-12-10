/**
 * SEO Landing Page: Oudere hond verzorgen
 * Pillar 9 - Senior Huisdieren - Subpillar 1
 */

import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Heart, Calendar, Stethoscope } from "lucide-react";

export const metadata: Metadata = {
  title: "Oudere Hond Verzorgen: Speciale Behoeften & Tips | CutiePawsPedia",
  description: "Leer hoe je je oudere hond de beste zorg geeft. Van voeding tot gezondheid: ontdek tips voor een gelukkige seniorhond. Vind dierenartsen gespecialiseerd in senior honden.",
  keywords: "oudere hond verzorgen, senior hond, bejaarde hond, hond op leeftijd, oude hond zorg, senior hond tips",
  openGraph: {
    title: "Oudere Hond Verzorgen: Speciale Behoeften & Tips",
    description: "Praktische tips voor het verzorgen van je oudere hond. Vind dierenartsen en diensten voor senior honden.",
    type: "article",
  },
};

export default function OudereHondVerzorgenPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent dark:to-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="h-6 w-6 text-cpCoral" />
            <span className="text-sm font-medium text-cpCoral">Senior Huisdieren</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
            Oudere Hond Verzorgen: Speciale Behoeften en Tips
          </h1>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 leading-relaxed">
            Wanneer je hond ouder wordt, veranderen zijn behoeften. Met de juiste zorg en aandacht kan je senior hond nog jarenlang gelukkig en comfortabel leven. Ontdek alles over de verzorging van oudere honden.
          </p>
        </div>
      </section>

      {/* CTA 1 - Primary */}
      <section className="bg-card dark:bg-cpSurface/50 border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-2xl p-8 text-center shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-3">
              Zoek je een dierenarts voor je senior hond?
            </h2>
            <p className="text-white/90 mb-6">
              Vind gespecialiseerde dierenartsen en klinieken bij jou in de buurt
            </p>
            <Link
              href="/nl/nederland"
              className="inline-block bg-white text-cpCoral px-8 py-3 rounded-xl font-semibold hover:-translate-y-1 transition-all shadow-md hover:shadow-xl"
            >
              Vind een Dierenarts →
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">
        <div className="prose prose-lg max-w-none">
          {/* Section 1: Wanneer is je hond senior? */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 flex items-center gap-3">
              <Calendar className="h-8 w-8 text-cpAmber" />
              Wanneer is je Hond een Senior?
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
              De leeftijd waarop een hond als senior wordt beschouwd, hangt af van zijn ras en grootte. Over het algemeen geldt:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Kleine rassen (tot 10 kg):</strong> vanaf 10-12 jaar
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Middelgrote rassen (10-25 kg):</strong> vanaf 8-10 jaar
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Grote rassen (25-40 kg):</strong> vanaf 6-8 jaar
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Reuzenrassen (boven 40 kg):</strong> vanaf 5-6 jaar
                </span>
              </li>
            </ul>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed">
              Let op de eerste tekenen van veroudering: minder energie, grijze haren rond de snuit, stijvere bewegingen na het slapen, en veranderingen in eetlust of gedrag.
            </p>
          </section>

          {/* Section 2: Voeding voor senior honden */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              Voeding Aanpassen voor je Oudere Hond
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
              De voedingsbehoeften van je hond veranderen naarmate hij ouder wordt. Een aangepaste voeding kan helpen om gezondheid en vitaliteit te behouden.
            </p>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-3">
              Belangrijke Voedingsaanpassingen
            </h3>
            <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl p-6 mb-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground dark:text-cpCream/80">
                    <strong>Minder calorieën:</strong> Oudere honden zijn vaak minder actief en hebben dus minder energie nodig
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground dark:text-cpCream/80">
                    <strong>Meer eiwitten:</strong> Hoogwaardig eiwit helpt spiermassa te behouden
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground dark:text-cpCream/80">
                    <strong>Gewrichtsondersteuning:</strong> Voeding met glucosamine en chondroïtine voor gezonde gewrichten
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground dark:text-cpCream/80">
                    <strong>Omega-3 vetzuren:</strong> Voor een gezonde vacht en huid, en anti-inflammatoire werking
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground dark:text-cpCream/80">
                    <strong>Makkelijk verteerbaar:</strong> Kies voeding die zacht is voor de spijsvertering
                  </span>
                </li>
              </ul>
            </div>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed">
              Overleg altijd met je dierenarts voordat je grote veranderingen aanbrengt in het dieet van je hond. Zij kunnen persoonlijk advies geven op basis van de specifieke behoeften van je hond.
            </p>
          </section>

          {/* Section 3: Beweging en Activiteit */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              Beweging: De Juiste Balans Vinden
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
              Hoewel oudere honden minder energie hebben, blijft regelmatige beweging essentieel voor hun gezondheid. Het gaat erom de juiste balans te vinden tussen activiteit en rust.
            </p>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-3">
              Tips voor Veilige Beweging
            </h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Kortere, maar frequentere wandelingen in plaats van lange uitstapjes
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Pas het tempo aan aan de mogelijkheden van je hond
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Zwemmen kan een uitstekende low-impact oefening zijn
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Let op tekenen van vermoeidheid en pas de activiteit aan
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Vermijd wandelingen in extreme hitte of kou
                </span>
              </li>
            </ul>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed">
              Mentale stimulatie is ook belangrijk. <Link href="/nl/nederland" className="text-cpCoral hover:underline">Zoekspelletjes en puzzelspeelgoed</Link> kunnen je senior hond mentaal actief houden zonder fysieke belasting.
            </p>
          </section>

          {/* CTA 2 - Secondary */}
          <section className="my-12">
            <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-2xl p-8 border-l-4 border-cpCoral">
              <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-3">
                Hulp nodig bij de verzorging van je senior hond?
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
                Van dierenartsen tot gespecialiseerde trimmerijen: vind de beste zorg voor je oudere hond bij jou in de buurt.
              </p>
              <Link
                href="/nl/nederland"
                className="inline-block bg-cpCoral text-white px-6 py-3 rounded-xl font-semibold hover:-translate-y-1 transition-all"
              >
                Bekijk Dierenklinieken →
              </Link>
            </div>
          </section>

          {/* Section 4: Gezondheidscontroles */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 flex items-center gap-3">
              <Stethoscope className="h-8 w-8 text-cpCoral" />
              Regelmatige Gezondheidscontroles
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
              Preventieve gezondheidszorg wordt nog belangrijker wanneer je hond ouder wordt. Regelmatige check-ups bij de dierenarts kunnen problemen vroegtijdig opsporen.
            </p>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-3">
              Aanbevolen Controles voor Senior Honden
            </h3>
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20 mb-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground dark:text-cpCream/80">
                    <strong>Halfjaarlijkse controles:</strong> In plaats van jaarlijks voor vroege detectie
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground dark:text-cpCream/80">
                    <strong>Bloedonderzoek:</strong> Om nier- en leverfunctie te controleren
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground dark:text-cpCream/80">
                    <strong>Gebitsverzorging:</strong> Tandsteen kan leiden tot ernstige gezondheidsproblemen
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground dark:text-cpCream/80">
                    <strong>Oog- en oorcontroles:</strong> Oudere honden zijn gevoeliger voor infecties
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground dark:text-cpCream/80">
                    <strong>Gewichtscontrole:</strong> Overgewicht belast gewrichten extra
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 5: Comfort thuis */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              Comfort en Aanpassingen Thuis
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
              Kleine aanpassingen in huis kunnen het leven van je senior hond een stuk comfortabeler maken. Denk aan:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Een orthopedische hondenmand voor betere ondersteuning van gewrichten
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Anti-slip matten op gladde vloeren om uitglijden te voorkomen
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Verhoogde voer- en waterbakken om de nek te ontlasten
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Een trapje of loopplank naar de bank of het bed
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Goede verlichting voor honden met verminderd gezichtsvermogen
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
                href="/seo/senior-huisdieren/katten-op-leeftijd"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20 hover:border-cpCoral transition-all"
              >
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">
                  Katten op Leeftijd
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Speciale zorg voor oudere katten: gezondheid, voeding en comfort
                </p>
              </Link>
              <Link
                href="/seo/senior-huisdieren/artritis-huisdieren"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20 hover:border-cpCoral transition-all"
              >
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">
                  Artritis bij Huisdieren
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Herkennen en behandelen van gewrichtsproblemen
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
                  Hoe vaak moet ik met mijn senior hond naar de dierenarts?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/70">
                  Voor senior honden wordt aangeraden om minstens twee keer per jaar naar de dierenarts te gaan in plaats van eenmaal per jaar. Dit stelt de dierenarts in staat om eventuele gezondheidsproblemen vroeg te detecteren en te behandelen.
                </p>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-foreground dark:text-cpCream">
                  Wat is het beste voer voor een oudere hond?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/70">
                  Kies voor seniorvoeding met minder calorieën maar hoogwaardig eiwit om spiermassa te behouden. Voeding met toegevoegde glucosamine en omega-3 vetzuren ondersteunt gezonde gewrichten. Bespreek de specifieke behoeften van je hond altijd met je dierenarts.
                </p>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-foreground dark:text-cpCream">
                  Hoeveel beweging heeft mijn senior hond nodig?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/70">
                  Dit hangt af van de individuele conditie van je hond. Over het algemeen zijn kortere, frequentere wandelingen beter dan lange uitstapjes. Let op signalen van vermoeidheid en pas het tempo aan. Zwemmen kan een goede low-impact oefening zijn.
                </p>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-foreground dark:text-cpCream">
                  Welke tekenen duiden op pijn bij een oudere hond?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/70">
                  Tekenen van pijn kunnen zijn: moeite met opstaan, mank lopen, minder actief zijn, verlies van eetlust, veranderingen in gedrag zoals prikkelbaarheid, en vermijding van springen of traplopen. Neem contact op met je dierenarts als je deze signalen opmerkt.
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
              Van dierenartsen tot trimsalons en dierenpensions: vind de beste zorg voor je huisdier in jouw regio.
            </p>
            <Link
              href="/nl/nederland"
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
            headline: "Oudere Hond Verzorgen: Speciale Behoeften en Tips",
            description: "Leer hoe je je oudere hond de beste zorg geeft. Van voeding tot gezondheid: ontdek tips voor een gelukkige seniorhond.",
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
