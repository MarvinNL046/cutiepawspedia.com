/**
 * SEO Landing Page: Vliegen met huisdier
 * Pillar: Reizen met Huisdieren
 */

import type { Metadata } from "next";
import { GidsBreadcrumbs } from '@/components/gids';
import Link from "next/link";
import { CheckCircle2, Plane, Euro, AlertCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Vliegen met huisdier: regels, kosten en tips (2025) | CutiePawsPedia",
  description: "Alles over vliegen met je hond of kat: welke regels gelden, wat zijn de kosten en hoe bereid je je huisdier voor? Complete gids met tips per luchtvaartmaatschappij.",
  keywords: "vliegen met hond, vliegen met kat, huisdier vliegtuig, vliegtuig hond kosten, huisdier meenemen vliegtuig",
  openGraph: {
    title: "Vliegen met huisdier: complete gids voor 2025",
    description: "Regels, kosten en praktische tips voor vliegen met je hond of kat. Van documentatie tot voorbereiding.",
    type: "article",
  },
};

export default function VliegenMetHuisdierPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 border border-cpCoral/30 mb-6">
            <Plane className="h-4 w-4 text-cpCoral" />
            <span className="text-sm font-medium text-cpCoral">Reizen met Huisdieren</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6 tracking-tight">
            Vliegen met huisdier: regels, kosten en tips
          </h1>

          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-8 leading-relaxed">
            Vliegen met je hond of kat vraagt om goede voorbereiding. Van de juiste documentatie tot het kiezen van de beste luchtvaartmaatschappij - deze complete gids helpt je stap voor stap op weg naar een vlotte reis.
          </p>

          {/* Primary CTA */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpCoral/10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                <FileText className="h-6 w-6 text-cpCoral" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">
                  Reischeck voor je vlucht nodig?
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                  Vind een dierenarts bij jou in de buurt voor vaccinaties, gezondheidscertificaat en reisadvies.
                </p>
                <Button asChild className="bg-cpCoral text-white rounded-xl hover:-translate-y-1 transition-transform">
                  <Link href="/nl/netherlands">
                    Vind een dierenarts →
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">

        {/* Basisregels */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Mag je huisdier mee in de cabine of het ruim?
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Cabine */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-2xl">🧳</span>
                In de cabine
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                Voor kleine honden en katten (meestal tot 8 kg inclusief reistas)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Zachte reistas onder de stoel</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Maximaal 40x30x20 cm (per maatschappij)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Huisdier blijft in tas tijdens vlucht</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Minder stress voor huisdier</span>
                </li>
              </ul>
            </div>

            {/* Ruim */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-2xl">📦</span>
                In het ruim
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                Voor grotere honden (boven 8 kg) en grotere reisbenches
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>IATA-goedgekeurde vliegtuigbench</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Geventileerd en veilig bagageruim</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Water en voer voorzieningen</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Kan stressvoller zijn voor dier</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 border-l-4 border-cpAmber rounded-r-xl p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-cpAmber flex-shrink-0 mt-1" />
              <div>
                <p className="text-foreground dark:text-cpCream/90 text-sm leading-relaxed mb-2">
                  <strong>Let op:</strong> Sommige rassen (platte neuzen zoals Mopshonden, Perzen) mogen niet vliegen vanwege ademhalingsproblemen. Check dit altijd vooraf bij de luchtvaartmaatschappij.
                </p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Ook geleidehonden en assistentiehonden hebben vaak andere regels en mogen meestal gratis mee in de cabine.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Kosten */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Euro className="h-8 w-8 text-cpCoral" />
            Wat kost vliegen met je huisdier?
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl overflow-hidden border border-border dark:border-cpAmber/20 mb-6">
            <table className="w-full">
              <thead className="bg-cpCoral/10 dark:bg-cpCoral/20">
                <tr>
                  <th className="text-left p-4 font-semibold text-foreground dark:text-cpCream">
                    Luchtvaartmaatschappij
                  </th>
                  <th className="text-left p-4 font-semibold text-foreground dark:text-cpCream">
                    Cabine
                  </th>
                  <th className="text-left p-4 font-semibold text-foreground dark:text-cpCream">
                    Ruim
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border dark:divide-cpAmber/10">
                <tr>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/80">KLM</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/80">€50-75 (Europa)</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/80">€100-200</td>
                </tr>
                <tr>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/80">Transavia</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/80">€50 (max 10kg)</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/80">Niet toegestaan</td>
                </tr>
                <tr>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/80">Lufthansa</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/80">€60-70</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/80">€150-300</td>
                </tr>
                <tr>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/80">Air France</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/80">€40-125</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/80">€100-200</td>
                </tr>
                <tr>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/80">Ryanair</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/80" colSpan={2}>
                    Geen huisdieren toegestaan (behalve assistentiehonden)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-muted-foreground dark:text-cpCream/70 italic">
            Prijzen zijn indicatief en kunnen variëren per route, seizoen en gewicht van je huisdier. Check altijd de actuele prijzen bij de luchtvaartmaatschappij.
          </p>
        </section>

        {/* Secondary CTA */}
        <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/10 dark:from-cpCoral/5 dark:to-cpAmber/5 rounded-2xl p-8 mb-12 border border-cpCoral/20">
          <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
            Toch liever je huisdier thuislaten?
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Vind een betrouwbaar dierenpension bij jou in de buurt voor liefdevolle opvang tijdens je reis.
          </p>
          <Button asChild variant="outline" className="border-cpCoral text-cpCoral hover:bg-cpCoral hover:text-white rounded-xl">
            <Link href="/nl/netherlands">
              Vind een dierenpension →
            </Link>
          </Button>
        </div>

        {/* Benodigde documenten */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Welke documenten heb je nodig?
          </h2>

          <div className="space-y-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-cpCoral">📋</span> Binnen de EU
              </h3>
              <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>EU-huisdierpaspoort</strong> met identificatiegegevens en vaccinaties</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Geldige rabiësvaccinatie</strong> (minimaal 21 dagen voor vertrek)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Microchip</strong> (of tatoeage van voor 3 juli 2011)</span>
                </li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-cpCoral">🌍</span> Buiten de EU
              </h3>
              <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Gezondheidscertificaat</strong> van officiële dierenarts (binnen 10 dagen voor vertrek)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Rabiës-titertest</strong> (voor sommige landen zoals VS, Japan)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Importvergunning</strong> (voor sommige landen vereist)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Extra vaccinaties</strong> (bijv. tegen lintworm voor VK, Ierland)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 border-l-4 border-cpAmber rounded-r-xl p-6 mt-6">
            <p className="text-sm text-foreground dark:text-cpCream/90">
              <strong>Belangrijk:</strong> Begin minstens 3-4 maanden van tevoren met de voorbereidingen, vooral voor reizen buiten de EU. Sommige vaccinaties en tests hebben wachttijden.
            </p>
          </div>
        </section>

        {/* Voorbereiding tips */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Hoe bereid je je huisdier voor?
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-cpCoral">1.</span> Wen je huisdier aan de reisbench
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                Begin weken van tevoren. Laat je huisdier erin slapen, eten en spelen. Maak het een fijne plek met een vertrouwde deken en speeltjes. Oefen met korte autoritten met de bench.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-cpCoral">2.</span> Bezoek de dierenarts
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                Plan een reischeck. Bespreek of vliegen veilig is voor je huisdier. Vraag naar kalmeringsmiddelen als je huisdier erg angstig is (hoewel dit vaak wordt afgeraden). Zorg dat alle vaccinaties up-to-date zijn.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-cpCoral">3.</span> Voer je huisdier licht
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                Geef 4-6 uur voor vertrek een lichte maaltijd. Geef wel voldoende water tot 2 uur voor vertrek. Dit vermindert de kans op misselijkheid en ongelukjes tijdens de vlucht.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-cpCoral">4.</span> Maak een informatiepakketje
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                Bevestig aan de bench: je contactgegevens, contactgegevens bestemming, foto van je huisdier, voedingsinstructies, medicatie indien nodig, en gezondheidsinformatie. Dit helpt personeel bij noodgevallen.
              </p>
            </div>
          </div>
        </section>

        {/* Internal links */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Lees ook
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/nl/gids/reizen-met-huisdieren/buitenland-reizen-huisdier"
              className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all group"
            >
              <h3 className="font-semibold text-foreground dark:text-cpCream group-hover:text-cpCoral mb-2">
                🌍 Checklist buitenland
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Complete checklist voor reizen naar het buitenland met je huisdier →
              </p>
            </Link>

            <Link
              href="/nl/gids/reizen-met-huisdieren/reizen-hond-auto"
              className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all group"
            >
              <h3 className="font-semibold text-foreground dark:text-cpCream group-hover:text-cpCoral mb-2">
                🚗 Reizen in de auto
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Tips voor veilig en comfortabel autorijden met je hond →
              </p>
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veelgestelde vragen
          </h2>

          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kan mijn hond mee in de cabine?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                Dat hangt af van het gewicht en de luchtvaartmaatschappij. De meeste airlines accepteren honden tot 8 kg (inclusief tas) in de cabine. De tas moet onder de stoel passen (meestal max 40x30x20 cm). Grotere honden moeten in het ruim reizen.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Welke documenten heb ik nodig voor vliegen binnen Europa?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                Voor reizen binnen de EU heb je nodig: een EU-huisdierpaspoort, een geldige rabiësvaccinatie (minimaal 21 dagen oud), en een microchip. Controleer altijd de specifieke eisen van het bestemmingsland.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Wat kost het om met een huisdier te vliegen?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                De kosten variëren per luchtvaartmaatschappij en bestemming. Binnen Europa betaal je gemiddeld €50-75 voor cabine en €100-200 voor het ruim. Intercontinentale vluchten zijn duurder (€200-500). Budget ook geld voor documentatie, dierenarts en een goede reisbench.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Zijn er rassen die niet mogen vliegen?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                Ja, veel luchtvaartmaatschappijen weigeren platte-neus rassen (brachycefale rassen) zoals Mopshonden, Bulldogs, Perzen en Britten. Deze rassen hebben een verhoogd risico op ademhalingsproblemen tijdens de vlucht. Check altijd vooraf of je ras is toegestaan.
              </div>
            </details>
          </div>
        </section>

        {/* Final CTA */}
        <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ontdek alle huisdierservices bij jou in de buurt
          </h3>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            Van dierenartsen tot dierenpensions: vind betrouwbare professionals voor je huisdier.
          </p>
          <Button asChild size="lg" className="bg-white text-cpCoral hover:bg-white/90 rounded-xl">
            <Link href="/nl/netherlands">
              Bekijk alle services →
            </Link>
          </Button>
        </div>
      </article>

      {/* Schema.org markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Vliegen met huisdier: regels, kosten en tips",
            "description": "Complete gids voor vliegen met je hond of kat. Alle regels, kosten per maatschappij en praktische voorbereidingstips.",
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
            "dateModified": "2025-01-15"
          })
        }}
      />

      <GidsBreadcrumbs
        items={[
          { label: "Reizen met Huisdieren", href: "/nl/gids/reizen-met-huisdieren" },
          { label: "Vliegen met huisdier" }
        ]}
      />
    </div>
  );
}
