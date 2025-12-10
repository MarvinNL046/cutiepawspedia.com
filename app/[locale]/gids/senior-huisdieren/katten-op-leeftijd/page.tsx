/**
 * SEO Landing Page: Katten op leeftijd
 * Pillar 9 - Senior Huisdieren - Subpillar 2
 */

import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Heart, Clock, Droplet } from "lucide-react";

export const metadata: Metadata = {
  title: "Katten op Leeftijd: Gezondheid, Voeding & Comfort | CutiePawsPedia",
  description: "Alles over de zorg voor oudere katten. Ontdek tips voor voeding, gezondheid en comfort voor je senior kat. Vind dierenartsen gespecialiseerd in bejaarde katten.",
  keywords: "katten op leeftijd, senior kat, oude kat, bejaarde kat, kattenzorg, oudere kat verzorgen",
  openGraph: {
    title: "Katten op Leeftijd: Gezondheid, Voeding en Comfort",
    description: "Praktische tips voor het verzorgen van je oudere kat. Vind gespecialiseerde dierenartsen voor senior katten.",
    type: "article",
  },
};

export default function KattenOpLeeftijdPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpAmber/10 via-cpCoral/5 to-transparent dark:from-cpAmber/5 dark:via-transparent dark:to-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="h-6 w-6 text-cpAmber" />
            <span className="text-sm font-medium text-cpAmber">Senior Huisdieren</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
            Katten op Leeftijd: Gezondheid, Voeding en Comfort
          </h1>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 leading-relaxed">
            Oudere katten hebben speciale zorg nodig om gezond en gelukkig te blijven. Ontdek hoe je je senior kat de beste kwaliteit van leven kunt bieden in hun gouden jaren.
          </p>
        </div>
      </section>

      {/* CTA 1 - Primary */}
      <section className="bg-card dark:bg-cpSurface/50 border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <div className="bg-gradient-to-br from-cpAmber via-cpAmber/90 to-cpCoral rounded-2xl p-8 text-center shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-3">
              Zoek je een dierenarts voor je senior kat?
            </h2>
            <p className="text-white/90 mb-6">
              Vind dierenartsen met ervaring in geriatrische kattenzorg bij jou in de buurt
            </p>
            <Link
              href="/nl/netherlands"
              className="inline-block bg-white text-cpAmber px-8 py-3 rounded-xl font-semibold hover:-translate-y-1 transition-all shadow-md hover:shadow-xl"
            >
              Vind een Dierenarts →
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">
        <div className="prose prose-lg max-w-none">
          {/* Section 1: Wanneer is een kat senior? */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 flex items-center gap-3">
              <Clock className="h-8 w-8 text-cpCoral" />
              Wanneer is een Kat een Senior?
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
              Katten worden over het algemeen als senior beschouwd vanaf 11 jaar. De levensfase wordt vaak als volgt ingedeeld:
            </p>
            <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl p-6 mb-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground dark:text-cpCream/80">
                    <strong>Volwassen (3-6 jaar):</strong> In de bloei van hun leven
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground dark:text-cpCream/80">
                    <strong>Mature (7-10 jaar):</strong> Begin van veroudering, vergelijkbaar met mens van 40-56 jaar
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground dark:text-cpCream/80">
                    <strong>Senior (11-14 jaar):</strong> Oudere kat, vergelijkbaar met mens van 60-72 jaar
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground dark:text-cpCream/80">
                    <strong>Geriatrisch (15+ jaar):</strong> Zeer oude kat, vergelijkbaar met mens van 76+ jaar
                  </span>
                </li>
              </ul>
            </div>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed">
              Met goede zorg kunnen binnenkatten 15-20 jaar of ouder worden. Het is belangrijk om te weten dat katten experts zijn in het verbergen van pijn en ziekte, waardoor regelmatige controles essentieel zijn.
            </p>
          </section>

          {/* Section 2: Veelvoorkomende gezondheidsproblemen */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              Veelvoorkomende Gezondheidsproblemen bij Oudere Katten
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
              Oudere katten zijn gevoeliger voor bepaalde aandoeningen. Vroege herkenning en behandeling kunnen het verschil maken:
            </p>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-3">
              Top Gezondheidsproblemen
            </h3>
            <div className="space-y-4 mb-6">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-semibold text-foreground dark:text-cpCream mb-2">
                  1. Chronische Nierziekte (CNI)
                </h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                  Een van de meest voorkomende aandoeningen bij oudere katten. Let op verhoogde dorst, vaker urineren en gewichtsverlies.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-semibold text-foreground dark:text-cpCream mb-2">
                  2. Schildklieraandoeningen (Hyperthyreoïdie)
                </h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                  Overactieve schildklier komt vaak voor. Symptomen: gewichtsverlies ondanks goede eetlust, hyperactiviteit, braken.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-semibold text-foreground dark:text-cpCream mb-2">
                  3. Diabetes Mellitus
                </h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                  Vooral bij katten met overgewicht. Symptomen: verhoogde dorst en urineproductie, gewichtsverlies.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-semibold text-foreground dark:text-cpCream mb-2">
                  4. Artritis en Gewrichtsproblemen
                </h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                  Veel voorkomend maar vaak onopgemerkt. Let op verminderde activiteit, moeite met springen, vermijden van hoogtes.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-semibold text-foreground dark:text-cpCream mb-2">
                  5. Tandproblemen
                </h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                  Tandsteen en tandvleesontsteking kunnen leiden tot pijn en weigering van voedsel. Regelmatige tandcontroles zijn essentieel.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Voeding voor senior katten */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 flex items-center gap-3">
              <Droplet className="h-8 w-8 text-cpAmber" />
              Voeding Aanpassen voor je Senior Kat
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
              De voedingsbehoeften van katten veranderen met de leeftijd. De juiste voeding ondersteunt gezondheid en vitaliteit.
            </p>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-3">
              Belangrijke Voedingstips
            </h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Hoogwaardig eiwit:</strong> Katten blijven carnivoren; kies voor voeding met minstens 30-35% eiwit
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Voldoende vocht:</strong> Natvoer helpt nieren en blaas gezond te houden
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Makkelijk verteerbaar:</strong> Kleinere, frequentere maaltijden kunnen helpen
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Gewichtscontrole:</strong> Zowel over- als ondergewicht zijn problematisch
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Supplementen:</strong> Omega-3 voor gewrichten, antioxidanten voor cognitieve functie
                </span>
              </li>
            </ul>

            <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl p-6 mb-6 border-l-4 border-cpAmber">
              <p className="text-muted-foreground dark:text-cpCream/80">
                <strong>Let op:</strong> Bij nierziekte, diabetes of andere aandoeningen kan therapeutisch dieetvoer nodig zijn. Bespreek dit altijd met je dierenarts.
              </p>
            </div>
          </section>

          {/* CTA 2 - Secondary */}
          <section className="my-12">
            <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl p-8 border-l-4 border-cpAmber">
              <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-3">
                Hulp nodig bij de zorg voor je senior kat?
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
                Vind dierenartsen met expertise in geriatrische kattenzorg en andere gespecialiseerde diensten.
              </p>
              <Link
                href="/nl/netherlands"
                className="inline-block bg-cpAmber text-white px-6 py-3 rounded-xl font-semibold hover:-translate-y-1 transition-all"
              >
                Bekijk Dierenklinieken →
              </Link>
            </div>
          </section>

          {/* Section 4: Comfort en omgeving */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              Comfort en Aanpassingen in Huis
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
              Kleine veranderingen kunnen het leven van je oudere kat aanzienlijk verbeteren:
            </p>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-3">
              Aanpassingen voor Senior Katten
            </h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Lage kattenbak:</strong> Met lage instap voor katten met artritis
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Extra kattenbakken:</strong> Op elke verdieping om ongelukjes te voorkomen
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Verwarmde slaapplaatsen:</strong> Oudere katten houden van warmte voor stijve gewrichten
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Trappen of hellingen:</strong> Naar favoriete plekken zoals vensterbanken
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Anti-slip matten:</strong> Bij voerbakken en op gladde vloeren
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Nachtlampjes:</strong> Voor katten met verminderd gezichtsvermogen
                </span>
              </li>
            </ul>
          </section>

          {/* Section 5: Mentale gezondheid */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              Mentale Stimulatie en Gedrag
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
              Oudere katten kunnen veranderingen in gedrag vertonen. Het is belangrijk om hen mentaal actief te houden:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Zachte speelsessies aangepast aan hun energieniveau
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Puzzelspeelgoed met snacks voor mentale uitdaging
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Dagelijkse routine behouden voor gevoel van veiligheid
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Extra aandacht en aaibehoeften - oudere katten zoeken vaak meer contact
                </span>
              </li>
            </ul>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed">
              Gedragsveranderingen zoals verwarring, 's nachts miauwen of ongelukjes kunnen duiden op <Link href="/seo/senior-huisdieren/dementie-honden-katten" className="text-cpCoral hover:underline">cognitieve disfunctie</Link>. Bespreek dit met je dierenarts.
            </p>
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
                  Hoe vaak moet mijn senior kat naar de dierenarts?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/70">
                  Voor katten van 11-14 jaar wordt aangeraden om minstens twee keer per jaar een check-up te doen. Voor katten ouder dan 15 jaar kan drie tot vier keer per jaar nodig zijn, afhankelijk van eventuele gezondheidsproblemen.
                </p>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-foreground dark:text-cpCream">
                  Welke bloedtesten zijn belangrijk voor senior katten?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/70">
                  Een senior bloedprofiel omvat meestal: nierwaarden (creatinine, ureum), leverfunctie, schildklierfunctie (T4), glucose, en elektrolyten. Ook een urineonderzoek is belangrijk om nierziekte vroeg op te sporen.
                </p>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-foreground dark:text-cpCream">
                  Hoeveel moet een senior kat drinken?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/70">
                  Een gezonde kat drinkt ongeveer 50-100 ml water per kg lichaamsgewicht per dag. Verhoogde dorst kan wijzen op nierziekte, diabetes of hyperthyreoïdie. Zorg voor meerdere drinkbakken en overweeg een drinkfontein - katten drinken vaak meer van stromend water.
                </p>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-foreground dark:text-cpCream">
                  Wat zijn tekenen dat mijn kat pijn heeft?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/70">
                  Katten verbergen pijn goed. Let op: verminderde activiteit, minder springen, verandering in toiletgedrag, minder poetsen, slapen op ongewone plekken, vermijden van aanraking, of agressie. Neem contact op met je dierenarts bij deze signalen.
                </p>
              </details>
            </div>
          </section>
        </div>
      </article>

      {/* CTA 3 - Tertiary */}
      <section className="bg-secondary dark:bg-cpCharcoal border-t border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-6xl px-4 py-16">
          <div className="relative overflow-hidden rounded-3xl shadow-xl bg-gradient-to-br from-cpAmber via-cpAmber/90 to-cpCoral p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ontdek Alle Huisdierservices
            </h2>
            <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
              Van dierenartsen tot kattenpensions en trimsalons: vind de beste zorg voor je kat in jouw regio.
            </p>
            <Link
              href="/nl/netherlands"
              className="inline-block bg-white text-cpAmber px-8 py-4 rounded-2xl font-semibold hover:-translate-y-1 transition-all shadow-lg hover:shadow-xl text-lg"
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
            headline: "Katten op Leeftijd: Gezondheid, Voeding en Comfort",
            description: "Alles over de zorg voor oudere katten. Ontdek tips voor voeding, gezondheid en comfort voor je senior kat.",
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
