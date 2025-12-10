/**
 * SEO Landing Page: Reizen met hond in de auto
 * Pillar: Reizen met Huisdieren
 */

import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Car, Shield, AlertTriangle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Reizen met hond in de auto: veilige tips (2025) | CutiePawsPedia",
  description: "Ontdek hoe je veilig met je hond in de auto reist. Praktische tips voor autogordels, benches en lange ritten. Vind dierenpensions voor je vakantie.",
  keywords: "hond auto, reizen met hond, autogordel hond, bench hond, autozitje hond, veilig reizen hond",
  openGraph: {
    title: "Reizen met hond in de auto: complete veiligheidsgids",
    description: "Alles wat je moet weten over veilig autorijden met je hond. Van wettelijke eisen tot praktische tips.",
    type: "article",
  },
};

export default function ReizenHondAutoPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 border border-cpCoral/30 mb-6">
            <Car className="h-4 w-4 text-cpCoral" />
            <span className="text-sm font-medium text-cpCoral">Reizen met Huisdieren</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6 tracking-tight">
            Reizen met hond in de auto: tips voor een veilige rit
          </h1>

          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-8 leading-relaxed">
            Veilig en comfortabel reizen met je hond in de auto vraagt om goede voorbereiding. Deze complete gids helpt je om je hond op de juiste manier te vervoeren, van wettelijke eisen tot praktische tips voor lange autotrips.
          </p>

          {/* Primary CTA */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpCoral/10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                <Heart className="h-6 w-6 text-cpCoral" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">
                  Op vakantie met je hond?
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                  Vind een betrouwbaar dierenpension bij jou in de buurt voor als je hond niet mee kan.
                </p>
                <Button asChild className="bg-cpCoral text-white rounded-xl hover:-translate-y-1 transition-transform">
                  <Link href="/nl/netherlands">
                    Vind een dierenpension →
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">

        {/* Wettelijke eisen */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Shield className="h-8 w-8 text-cpCoral" />
            Wettelijke eisen voor honden in de auto
          </h2>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 border-l-4 border-cpAmber rounded-r-xl p-6 mb-6">
            <p className="text-foreground dark:text-cpCream/90 leading-relaxed mb-4">
              In Nederland is het wettelijk verplicht om je hond goed vast te zetten in de auto. Volgens artikel 5.2.38 van het Voertuigreglement mag een dier de bestuurder niet hinderen of gevaar opleveren. Een losse hond in de auto kan een bekeuring opleveren van €140.
            </p>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              Belangrijker dan de boete: een onveilig vervoerde hond kan bij een ongeluk ernstig gewond raken of zelfs door de voorruit vliegen.
            </p>
          </div>

          <h3 className="text-xl font-semibold text-foreground dark:text-cpCream mb-4">
            Goedgekeurde veiligheidsmethoden:
          </h3>

          <ul className="space-y-3 mb-6">
            {[
              "Autobench of reiskooi in de kofferbak",
              "Autogordel of tuigje met gordelbevestiging",
              "Scheidingsrek tussen achterbank en kofferbak",
              "Speciaal autozitje voor kleine honden"
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground dark:text-cpCream/80">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* De beste opties vergeleken */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Autobench, autogordel of scheidingsrek?
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Autobench */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">
                🏠 Autobench
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                Veiligste optie voor middelgrote tot grote honden. Geeft de hond zijn eigen ruimte.
              </p>
              <div className="text-sm space-y-2">
                <p className="text-green-600 dark:text-green-400">✓ Maximale veiligheid</p>
                <p className="text-green-600 dark:text-green-400">✓ Comfortabel voor hond</p>
                <p className="text-orange-600 dark:text-orange-400">− Neemt veel ruimte in</p>
              </div>
            </div>

            {/* Autogordel */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">
                🦺 Autogordel
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                Praktisch voor kleinere honden of korte ritten. Let op crashtest certificering.
              </p>
              <div className="text-sm space-y-2">
                <p className="text-green-600 dark:text-green-400">✓ Ruimtebesparend</p>
                <p className="text-green-600 dark:text-green-400">✓ Betaalbaar</p>
                <p className="text-orange-600 dark:text-orange-400">− Minder veilig bij crash</p>
              </div>
            </div>

            {/* Scheidingsrek */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">
                🔲 Scheidingsrek
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                Ideaal voor meerdere honden of zeer grote honden. Kofferbak wordt hondenruimte.
              </p>
              <div className="text-sm space-y-2">
                <p className="text-green-600 dark:text-green-400">✓ Voor grote honden</p>
                <p className="text-green-600 dark:text-green-400">✓ Meerdere honden mogelijk</p>
                <p className="text-orange-600 dark:text-orange-400">− Minder comfortabel</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground dark:text-cpCream/70 italic">
            Tip: Kies een systeem dat is getest volgens ECE R17 of een vergelijkbare crashtest norm voor maximale veiligheid.
          </p>
        </section>

        {/* Secondary CTA */}
        <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/10 dark:from-cpCoral/5 dark:to-cpAmber/5 rounded-2xl p-8 mb-12 border border-cpCoral/20">
          <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
            Hond kan niet mee op reis?
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Ontdek betrouwbare dierenartsen bij jou in de buurt voor een reischeck voordat je op vakantie gaat.
          </p>
          <Button asChild variant="outline" className="border-cpCoral text-cpCoral hover:bg-cpCoral hover:text-white rounded-xl">
            <Link href="/nl/netherlands">
              Bekijk dierenartsen →
            </Link>
          </Button>
        </div>

        {/* Tips voor lange autoritten */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Tips voor lange autoritten met je hond
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-cpCoral">1.</span> Plan regelmatige pauzes
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                Neem elke 2 uur een pauze van minimaal 15 minuten. Laat je hond uitlaten, water drinken en even bewegen. Dit voorkomt stress en wagenziekte. Gebruik een flexilijn voor veiligheid bij parkeerplaatsen.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-cpCoral">2.</span> Geef niet te veel eten vooraf
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                Voed je hond 2-3 uur voor vertrek een lichte maaltijd. Een volle maag kan leiden tot wagenziekte. Geef wel voldoende water, maar niet te veel vlak voor vertrek. Neem voor lange ritten een reisvoerbak mee.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-cpCoral">3.</span> Zorg voor goede ventilatie
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                Honden kunnen snel oververhit raken. Zet de airco op een comfortabele temperatuur (niet te koud) en zorg voor voldoende frisse lucht. Laat je hond NOOIT alleen achter in een geparkeerde auto, zelfs niet 'even'.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-cpCoral">4.</span> Wen je hond rustig aan de auto
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                Begin met korte ritjes en bouw langzaam op. Maak de auto positief met lekkernijen en speelgoed. Sommige honden krijgen spanning of wagenziekte - oefen dit van tevoren en overleg zo nodig met je dierenarts over anti-misselijkheid medicatie.
              </p>
            </div>
          </div>
        </section>

        {/* Checklist */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Checklist: dit neem je mee
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
            <ul className="grid md:grid-cols-2 gap-3">
              {[
                "Water en reisdrinkbak",
                "Vertrouwde deken of kussen",
                "Vuilniszakjes voor uitwerpselen",
                "Leiband en reserveleiband",
                "Favoriete speelgoed",
                "Eventueel medicatie",
                "Paspoort en vaccinatieboekje",
                "Hondenpenning met contactgegevens",
                "Handdoek (voor natte poten)",
                "Snacks en kauwgoed tegen verveling"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground dark:text-cpCream/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Wagenziekte */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Wat doe je bij wagenziekte?
          </h2>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl p-6 mb-6 border-l-4 border-cpAmber">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-cpAmber flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">
                  Herken de signalen
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80 text-sm mb-3">
                  Wagenziekte komt vooral voor bij jonge honden en kan verbeteren met de leeftijd. Signalen zijn: excessief kwijlen, onrust, janken, gapen, of overgeven.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li className="flex items-start gap-2">
                    <span className="text-cpCoral">•</span>
                    <span>Laat je hond naar voren kijken in plaats van opzij</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cpCoral">•</span>
                    <span>Open een raampje voor frisse lucht</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cpCoral">•</span>
                    <span>Overweeg medicatie van de dierenarts (Cerenia)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cpCoral">•</span>
                    <span>Gebruik gemberkoekjes als natuurlijk middel</span>
                  </li>
                </ul>
              </div>
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
              href="/nl/gids/reizen-met-huisdieren/vliegen-met-huisdier"
              className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all group"
            >
              <h3 className="font-semibold text-foreground dark:text-cpCream group-hover:text-cpCoral mb-2">
                ✈️ Vliegen met huisdier
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Alles over regels, kosten en tips voor vliegen met je hond of kat →
              </p>
            </Link>

            <Link
              href="/nl/gids/reizen-met-huisdieren/buitenland-reizen-huisdier"
              className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all group"
            >
              <h3 className="font-semibold text-foreground dark:text-cpCream group-hover:text-cpCoral mb-2">
                🌍 Naar het buitenland
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Checklist voor reizen naar het buitenland met je huisdier →
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
                Mag mijn hond los in de auto?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                Nee, een losse hond in de auto is niet toegestaan in Nederland en kan een bekeuring van €140 opleveren. Belangrijker: het is gevaarlijk voor je hond en andere inzittenden bij een ongeval of plotselinge remming.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Wat is de veiligste manier om mijn hond te vervoeren?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                Een crashtest-gecertificeerde autobench in de kofferbak is de veiligste optie. Voor kleinere honden kan ook een goed autogordel met harnas werken, mits deze voldoet aan veiligheidsnormen zoals ECE R17.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Hoe vaak moet ik pauzeren tijdens een lange autorit?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                Neem minimaal elke 2 uur een pauze van 15-20 minuten. Laat je hond uitlaten, water drinken en even bewegen. Bij warm weer of jonge/oude honden is elk uur pauzeren aan te raden.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kan ik iets geven tegen wagenziekte?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                Ja, overleg met je dierenarts over anti-misselijkheid medicatie zoals Cerenia. Natuurlijke alternatieven zijn gemberkoekjes of CBD-olie (in overleg met dierenarts). Belangrijk is ook je hond rustig aan autorijden te laten wennen.
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
            Van dierenpensions tot hondentrainers: vind betrouwbare professionals voor je huisdier.
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
            "headline": "Reizen met hond in de auto: tips voor een veilige rit",
            "description": "Complete gids voor veilig autorijden met je hond. Wettelijke eisen, beste vervoersopties en praktische tips voor lange ritten.",
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
    </div>
  );
}
