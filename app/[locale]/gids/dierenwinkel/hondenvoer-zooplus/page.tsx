import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Heart, ShoppingCart, Info, Star, Truck, Euro } from "lucide-react";

import { GidsBreadcrumbs } from "@/components/gids";
export const metadata: Metadata = {
  title: "Hondenvoer bij Zooplus: Beste Merken & Kortingen 2024",
  description: "Bestel kwalitatief hondenvoer bij Zooplus. Royal Canin, Hill's, Wolf of Wilderness en meer. Gratis bezorging vanaf €39 + voordelige kortingen.",
  keywords: "zooplus hondenvoer, royal canin zooplus, hills hondenvoer, graanvrij hondenvoer, hondenvoer online bestellen",
  openGraph: {
    title: "Hondenvoer bij Zooplus | Grote Merken met Korting",
    description: "Ontdek het complete assortiment hondenvoer bij Zooplus met de beste merken en voordelige prijzen.",
  },
};

export default function HondenvoerZooplusPage() {
  return (
    <>
    <GidsBreadcrumbs
        items={[
          { label: "Dierenwinkel", href: "/nl/gids/dierenwinkel" },
          { label: "Hondenvoer bij Zooplus" }
        ]}
      />
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent dark:to-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 dark:bg-cpCharcoal/60 border border-cpCoral/30 dark:border-cpAmber/20 mb-6">
            <ShoppingCart className="h-4 w-4 text-cpCoral" />
            <span className="text-sm font-medium text-foreground dark:text-cpCream">
              Online Dierenwinkel
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6 tracking-tight">
            Hondenvoer bij Zooplus: <span className="text-cpCoral">Beste Merken met Korting</span>
          </h1>

          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Zooplus is dé grootste online dierenwinkel van Europa met een enorm assortiment hondenvoer. Van premium merken zoals Royal Canin en Hill's tot natuurlijke opties zoals Wolf of Wilderness en Purizon. Ontdek waarom miljoenen hondenbaasjes vertrouwen op Zooplus voor gezonde voeding.
          </p>

          {/* Primary CTA */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpAmber/20 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-cpAmber text-cpAmber" />
                <Star className="h-4 w-4 fill-cpAmber text-cpAmber" />
                <Star className="h-4 w-4 fill-cpAmber text-cpAmber" />
                <Star className="h-4 w-4 fill-cpAmber text-cpAmber" />
                <Star className="h-4 w-4 fill-cpAmber text-cpAmber" />
              </div>
              <span className="text-sm text-muted-foreground dark:text-cpCream/70">
                9.2/10 op Trustpilot
              </span>
            </div>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
              Gratis bezorging vanaf €39 • Veilig betalen • 30 dagen retourrecht
            </p>
            <a
              href="https://go.cutiepawspedia.com/zooplus.nl"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-block bg-cpCoral text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform font-medium shadow-md"
            >
              Bekijk alle hondenvoer bij Zooplus →
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-16">
        {/* Section 1: Waarom Zooplus kiezen */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
            Waarom Hondenvoer bij Zooplus Bestellen?
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-4 leading-relaxed">
            Zooplus is al meer dan 20 jaar de betrouwbare partner voor miljoenen huisdiereigenaren in Europa. Met een ongeëvenaard assortiment van meer dan 8.000 hondenvoer producten, van premium merken tot natuurlijke alternatieven, vind je bij Zooplus altijd het perfecte voer voor jouw hond.
          </p>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl p-6 border border-cpAmber/20 dark:border-cpAmber/10 my-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-cpAmber" />
              Voordelen van Zooplus:
            </h3>
            <ul className="space-y-2">
              {[
                "Gratis bezorging vanaf €39 naar heel Nederland",
                "Tot 50% korting op top merken hondenvoer",
                "Grootste assortiment: 8.000+ hondenvoer producten",
                "30 dagen retourrecht zonder gedoe",
                "Autoship service: nooit meer zonder voer",
                "Expert klantenservice en voedingsadvies",
                "Veilig betalen met iDEAL, PayPal of creditcard",
                "Snelle levering: vaak binnen 24-48 uur in huis",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpAmber flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 2: Top Merken bij Zooplus */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Top Hondenvoer Merken bij Zooplus
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Zooplus biedt alle toonaangevende merken hondenvoer, vaak tegen scherpe prijzen met extra kortingen. Hier zijn de meest populaire merken die je bij Zooplus vindt:
          </p>

          {/* Brand 1 - Royal Canin */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold text-cpCoral">Royal Canin</h3>
              <span className="bg-cpCoral/10 text-cpCoral text-xs font-medium px-3 py-1 rounded-full">
                Bestseller
              </span>
            </div>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Royal Canin is wereldleider in wetenschappelijk onderbouwde hondevoeding. Bij Zooplus vind je het complete assortiment: van rasspecifiek voer (Labrador, Golden Retriever, Duitse Herder) tot voer voor specifieke behoeften zoals spijsvertering, gewichtsbeheersing en huidproblemen.
            </p>
            <div className="flex items-center gap-2 mb-3">
              <Euro className="h-4 w-4 text-cpAmber" />
              <span className="text-sm text-muted-foreground dark:text-cpCream/70">
                Vanaf €3,99 per kg • Vaak tot 30% korting
              </span>
            </div>
            <p className="text-sm text-cpCoral font-medium">✓ Perfect voor: Rasspecifieke voeding, gezondheidsbehoeften, puppies en senioren</p>
          </div>

          {/* Brand 2 - Hill's */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold text-cpCoral">Hill's Science Plan</h3>
              <span className="bg-cpAqua/10 text-cpAqua text-xs font-medium px-3 py-1 rounded-full">
                Dierenarts Aanbevolen
              </span>
            </div>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Hill's Science Plan wordt ontwikkeld door dierenartsen en voedingsexperts. Bij Zooplus bestel je het volledige assortiment, inclusief het speciale dieetvoer (Prescription Diet) voor honden met medische aandoeningen zoals nieraandoeningen, allergieën of gewichtsproblemen.
            </p>
            <div className="flex items-center gap-2 mb-3">
              <Euro className="h-4 w-4 text-cpAmber" />
              <span className="text-sm text-muted-foreground dark:text-cpCream/70">
                Vanaf €4,49 per kg • Regelmatig kortingsacties
              </span>
            </div>
            <p className="text-sm text-cpCoral font-medium">✓ Perfect voor: Honden met gezondheidsaandoeningen, gevoelige magen, senior honden</p>
          </div>

          {/* Brand 3 - Wolf of Wilderness */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold text-cpCoral">Wolf of Wilderness</h3>
              <span className="bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium px-3 py-1 rounded-full">
                Graanvrij
              </span>
            </div>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Wolf of Wilderness is het eigen premium merk van Zooplus, geïnspireerd op de natuurlijke voeding van wolven. Met maar liefst 66% vlees, vis of gevogelte en 100% graanvrij is dit voer perfect voor honden die natuurlijke voeding nodig hebben. Verkrijgbaar in droogvoer, natvoer en freeze-dried varianten.
            </p>
            <div className="flex items-center gap-2 mb-3">
              <Euro className="h-4 w-4 text-cpAmber" />
              <span className="text-sm text-muted-foreground dark:text-cpCream/70">
                Vanaf €3,29 per kg • Beste prijs-kwaliteitverhouding
              </span>
            </div>
            <p className="text-sm text-cpCoral font-medium">✓ Perfect voor: Graanvrije voeding, natuurlijke ingrediënten, allergische honden</p>
          </div>

          {/* Brand 4 - Purizon */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold text-cpCoral">Purizon</h3>
              <span className="bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium px-3 py-1 rounded-full">
                70% Vlees
              </span>
            </div>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Purizon is het andere eigen premium merk van Zooplus met een hoog vleesgehalte (70%) en graanvrije receptuur. Verkrijgbaar in verschillende smaken zoals kip, zalm, lam en eend. De formule is geïnspireerd op de oorspronkelijke voeding van honden in het wild.
            </p>
            <div className="flex items-center gap-2 mb-3">
              <Euro className="h-4 w-4 text-cpAmber" />
              <span className="text-sm text-muted-foreground dark:text-cpCream/70">
                Vanaf €3,99 per kg • Exclusief bij Zooplus
              </span>
            </div>
            <p className="text-sm text-cpCoral font-medium">✓ Perfect voor: Actieve honden, vleesminnende honden, graanallergieën</p>
          </div>

          {/* Brand 5 - Eukanuba */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold text-cpCoral">Eukanuba</h3>
              <span className="bg-cpAmber/10 text-cpAmber text-xs font-medium px-3 py-1 rounded-full">
                Premium Kwaliteit
              </span>
            </div>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Eukanuba staat bekend om zijn hoogwaardige ingrediënten en gebalanceerde recepturen voor verschillende levensfasen en rassenmaten. Bij Zooplus vind je het volledige assortiment voor kleine, middelgrote en grote rassen, met speciale formules voor actieve honden.
            </p>
            <div className="flex items-center gap-2 mb-3">
              <Euro className="h-4 w-4 text-cpAmber" />
              <span className="text-sm text-muted-foreground dark:text-cpCream/70">
                Vanaf €4,19 per kg • Voordelige grote verpakkingen
              </span>
            </div>
            <p className="text-sm text-cpCoral font-medium">✓ Perfect voor: Alle levensfasen, sportieve honden, rassenmaten</p>
          </div>

          {/* Brand 6 - Concept for Life */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold text-cpCoral">Concept for Life</h3>
              <span className="bg-cpAmber/10 text-cpAmber text-xs font-medium px-3 py-1 rounded-full">
                Prijs/Kwaliteit
              </span>
            </div>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Concept for Life is het populaire eigen merk van Zooplus met een uitstekende prijs-kwaliteitverhouding. Verkrijgbaar in rasspecifieke formules (Labrador, Golden Retriever, Duitse Herder) en voor verschillende behoeften zoals gewichtsbeheersing en gevoelige spijsvertering.
            </p>
            <div className="flex items-center gap-2 mb-3">
              <Euro className="h-4 w-4 text-cpAmber" />
              <span className="text-sm text-muted-foreground dark:text-cpCream/70">
                Vanaf €2,99 per kg • Beste waar voor je geld
              </span>
            </div>
            <p className="text-sm text-cpCoral font-medium">✓ Perfect voor: Budget-bewuste baasjes, rasspecifieke voeding</p>
          </div>

          <a
            href="https://go.cutiepawspedia.com/zooplus.nl"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-block bg-cpCoral text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform font-medium shadow-md text-sm"
          >
            Ontdek alle merken bij Zooplus →
          </a>
        </section>

        {/* Middle CTA */}
        <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/5 dark:from-cpCoral/5 dark:to-cpAmber/5 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpAmber/20 my-12">
          <div className="flex items-center gap-3 mb-3">
            <Truck className="h-6 w-6 text-cpCoral" />
            <h3 className="font-bold text-foreground dark:text-cpCream">
              Gratis bezorging vanaf €39
            </h3>
          </div>
          <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
            Bestel nu en krijg je hondenvoer gratis thuisbezorgd. Vaak al binnen 24-48 uur in huis!
          </p>
          <a
            href="https://go.cutiepawspedia.com/zooplus.nl"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-block bg-cpCoral text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform font-medium shadow-md text-sm"
          >
            Start met winkelen bij Zooplus →
          </a>
        </div>

        {/* Section 3: Droogvoer vs Natvoer */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
            Droogvoer of Natvoer bij Zooplus?
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Zooplus heeft een enorm assortiment zowel droog- als natvoer. Beide soorten hebben hun voordelen en zijn verkrijgbaar van alle toonaangevende merken.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="text-xl font-bold text-cpCoral mb-3">Droogvoer bij Zooplus</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Voordelige grote verpakkingen (tot 15 kg)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Lang houdbaar en makkelijk te bewaren</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Helpt gebit schoon te houden</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Beste prijs per kg (€2,99 - €7,00)</span>
                </li>
              </ul>
              <p className="text-xs text-muted-foreground dark:text-cpCream/60">
                Populaire merken: Royal Canin, Hill's, Wolf of Wilderness, Purizon
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="text-xl font-bold text-cpCoral mb-3">Natvoer bij Zooplus</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Smaakvoller en aantrekkelijker voor kieskeurige honden</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Hogere vochtopname (70-80% water)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Makkelijker te kauwen voor oudere honden</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Voordelige voordeelverpakkingen bij Zooplus</span>
                </li>
              </ul>
              <p className="text-xs text-muted-foreground dark:text-cpCream/60">
                Populaire merken: Rocco, Wolf of Wilderness, Animonda, Royal Canin
              </p>
            </div>
          </div>

          <div className="bg-cpAqua/10 dark:bg-cpAqua/5 rounded-2xl p-6 border border-cpAqua/20 dark:border-cpAqua/10">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
              <Info className="h-5 w-5 text-cpAqua" />
              Tip: Combinatie van droog en natvoer
            </h3>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              Veel hondenbaasjes kiezen voor een combinatie: droogvoer als basis (voordelig en praktisch) en natvoer als topping of voor variatie. Bij Zooplus kun je eenvoudig beide soorten in één bestelling combineren en profiteert van gratis verzending vanaf €39.
            </p>
          </div>
        </section>

        {/* Section 4: Graanvrije Opties */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
            Graanvrij Hondenvoer bij Zooplus
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-4 leading-relaxed">
            Steeds meer hondenbaasjes kiezen voor graanvrije voeding, vooral voor honden met allergieën of intoleranties. Zooplus heeft een groot assortiment graanvrij hondenvoer van topmerken:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Wolf of Wilderness</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                100% graanvrij met 66% vlees, vis of gevogelte. Verkrijgbaar in 12+ smaken.
              </p>
              <p className="text-xs text-cpCoral font-medium">€3,29/kg • Bestseller</p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Purizon</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                70% vlees en graanvrij. Met verse kip, zalm, lam of eend als hoofdingrediënt.
              </p>
              <p className="text-xs text-cpCoral font-medium">€3,99/kg • Premium</p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Taste of the Wild</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                Graanvrij met wilde bizon, hert of gevogelte. Natuurlijke ingrediënten.
              </p>
              <p className="text-xs text-cpCoral font-medium">€4,49/kg • Natuurlijk</p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Acana Regionals</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                Biologisch verantwoord en graanvrij met 50-75% dierlijke ingrediënten.
              </p>
              <p className="text-xs text-cpCoral font-medium">€6,99/kg • Super Premium</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground dark:text-cpCream/70">
            Let op: Graanvrij voer is niet voor elke hond noodzakelijk. Overleg met je dierenarts of graanvrij voer geschikt is voor jouw hond. Voor meer info, bekijk onze{" "}
            <Link href="/nl/gids/huisdiervoeding/beste-hondenvoer" className="text-cpCoral hover:underline">
              complete gids over hondenvoer
            </Link>.
          </p>
        </section>

        {/* Section 5: Prijzen & Bezorging */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
            Prijzen en Bezorging bij Zooplus
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Een van de grootste voordelen van Zooplus is de scherpe prijsstelling. Door directe samenwerking met fabrikanten en grote volumes kan Zooplus vaak 20-50% korting bieden ten opzichte van fysieke dierenwinkels.
          </p>

          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-4">Bezorgkosten Nederland</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-border dark:border-cpAmber/20">
                <span className="text-sm text-muted-foreground dark:text-cpCream/70">Bestelling onder €39</span>
                <span className="font-medium text-foreground dark:text-cpCream">€3,95</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-border dark:border-cpAmber/20">
                <span className="text-sm text-muted-foreground dark:text-cpCream/70">Bestelling vanaf €39</span>
                <span className="font-bold text-green-600 dark:text-green-400">GRATIS</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground dark:text-cpCream/70">Levertijd</span>
                <span className="font-medium text-foreground dark:text-cpCream">2-4 werkdagen</span>
              </div>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl p-6 border border-cpAmber/20 dark:border-cpAmber/10 mb-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
              <Euro className="h-5 w-5 text-cpAmber" />
              Prijsvoorbeeld: Bespaar tot €150 per jaar
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
              <p className="flex justify-between">
                <span>Royal Canin Medium Adult 15kg bij fysieke winkel:</span>
                <span className="font-medium">€79,99</span>
              </p>
              <p className="flex justify-between">
                <span>Royal Canin Medium Adult 15kg bij Zooplus:</span>
                <span className="font-medium text-green-600 dark:text-green-400">€54,99</span>
              </p>
              <p className="flex justify-between border-t border-cpAmber/20 dark:border-cpAmber/10 pt-2 font-bold">
                <span>Besparing per zak:</span>
                <span className="text-cpCoral">€25,00</span>
              </p>
              <p className="text-xs pt-2">
                Bij 6 zakken per jaar bespaart je tot €150! Plus gratis verzending.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
            Autoship Service: Bespaar extra en altijd op tijd
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Met de Autoship-service van Zooplus ontvang je je hondenvoer automatisch op vaste tijdstippen (elke 2, 4, 6 of 8 weken). Voordelen:
          </p>
          <ul className="space-y-2 mb-4">
            {[
              "Extra 5% korting bovenop de normale korting",
              "Nooit meer zonder voer",
              "Altijd gratis bezorging (ook onder €39)",
              "Op elk moment aanpasbaar of opzegbaar",
              "Automatische betaling via jouw voorkeursmethode",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                <CheckCircle2 className="h-5 w-5 text-cpAmber flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 6: Speciale Dieetvoer */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
            Speciaal Dieetvoer bij Zooplus
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Heeft jouw hond specifieke gezondheidsbehoeften? Zooplus biedt een uitgebreid assortiment veterinair dieetvoer voor verschillende aandoeningen:
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 text-sm">Gevoelige Spijsvertering</h3>
              <p className="text-xs text-muted-foreground dark:text-cpCream/70 mb-2">
                Hill's i/d, Royal Canin Digestive Care, Purina Pro Plan Sensitive
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 text-sm">Gewichtsbeheersing</h3>
              <p className="text-xs text-muted-foreground dark:text-cpCream/70 mb-2">
                Royal Canin Weight Care, Hill's Metabolic, Concept for Life Light
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 text-sm">Allergieën & Huidproblemen</h3>
              <p className="text-xs text-muted-foreground dark:text-cpCream/70 mb-2">
                Hill's z/d, Royal Canin Hypoallergenic, Purina Pro Plan Sensitive Skin
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 text-sm">Nieren & Urinewegen</h3>
              <p className="text-xs text-muted-foreground dark:text-cpCream/70 mb-2">
                Hill's k/d, Royal Canin Renal, Specific CKD/CKW
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 text-sm">Gewrichten & Mobiliteit</h3>
              <p className="text-xs text-muted-foreground dark:text-cpCream/70 mb-2">
                Hill's j/d, Royal Canin Mobility, Eukanuba Joint Health
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 text-sm">Tandverzorging</h3>
              <p className="text-xs text-muted-foreground dark:text-cpCream/70 mb-2">
                Hill's t/d, Royal Canin Dental, Specific COD Dental
              </p>
            </div>
          </div>

          <div className="bg-cpAqua/10 dark:bg-cpAqua/5 rounded-2xl p-6 border border-cpAqua/20 dark:border-cpAqua/10">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 flex items-start gap-2">
              <Info className="h-5 w-5 text-cpAqua flex-shrink-0 mt-0.5" />
              <span>
                <strong>Belangrijk:</strong> Veterinair dieetvoer mag alleen worden gebruikt na overleg met je dierenarts. Veel dieetvoer vereist een recept. Zooplus biedt een makkelijke upload-functie voor dierenarts recepten tijdens het bestelproces.
              </span>
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veelgestelde Vragen over Zooplus Hondenvoer
          </h2>

          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Is Zooplus betrouwbaar voor het kopen van hondenvoer?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, Zooplus is zeer betrouwbaar en de grootste online dierenwinkel van Europa sinds 1999. Ze hebben een uitstekende reputatie met 9.2/10 op Trustpilot, veilige betaalmethoden, 30 dagen retourrecht en worden vertrouwd door miljoenen klanten in Europa. Alle producten zijn origineel en komen rechtstreeks van de fabrikant.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Hoe snel wordt hondenvoer van Zooplus bezorgd?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Bestellingen bij Zooplus worden meestal binnen 2-4 werkdagen bezorgd in Nederland. Bij bestellingen vóór 12:00 uur wordt je pakket vaak nog dezelfde dag verzonden. Gratis bezorging is beschikbaar bij bestellingen vanaf €39. Je ontvangt automatisch een track & trace code om je bestelling te volgen.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Waarom is hondenvoer bij Zooplus goedkoper?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Zooplus kan scherpe prijzen bieden door directe samenwerking met fabrikanten, grote inkoopvolumes en lage overheadkosten (geen fysieke winkels). Daarnaast organiseert Zooplus regelmatig kortingsacties en voordeelpakketten. Dit kan tot 20-50% besparing opleveren vergeleken met fysieke dierenwinkels, zonder concessies aan kwaliteit.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kan ik hondenvoer retourneren bij Zooplus?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, Zooplus biedt 30 dagen retourrecht. Als je hond het voer niet lust of als je om andere redenen niet tevreden bent, kun je het product binnen 30 dagen retourneren voor een volledige terugbetaling. Het retourproces is eenvoudig en klantvriendelijk via je account op de website.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Wat is het verschil tussen Wolf of Wilderness en Purizon?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Beide zijn eigen premium merken van Zooplus en zijn graanvrij. Wolf of Wilderness bevat 66% vlees/vis en is geïnspireerd op de natuurlijke voeding van wolven, verkrijgbaar in meer smaakvarianten. Purizon heeft een hoger vleesgehalte (70%) en een iets andere receptuur. Beide zijn uitstekende keuzes voor natuurlijke, graanvrije voeding tegen een scherpe prijs.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kan ik bij Zooplus ook BARF voer of rauw vlees bestellen?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, Zooplus heeft een uitgebreid assortiment BARF (Biologisch Appropriate Raw Food) producten, inclusief rauw vlees, vleesmixen, supplementen en BARF-toevoegingen. Ook freeze-dried BARF voer is beschikbaar. Let wel: rauw vlees wordt gekoeld verzonden en heeft speciale bezorgcondities.
              </div>
            </details>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-3xl p-8 md:p-12 shadow-xl text-center">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <ShoppingCart className="h-8 w-8 text-white" />
              <h2 className="text-3xl font-bold text-white">
                Bestel Nu Hondenvoer bij Zooplus
              </h2>
            </div>
            <p className="text-white/90 mb-6 text-lg">
              Ontdek meer dan 8.000 hondenvoer producten van topmerken zoals Royal Canin, Hill's en Wolf of Wilderness. Gratis bezorging vanaf €39 en tot 50% korting op geselecteerde merken.
            </p>
            <a
              href="https://go.cutiepawspedia.com/zooplus.nl"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-block bg-white text-cpCoral rounded-xl px-8 py-4 hover:-translate-y-1 transition-transform font-bold shadow-lg text-lg mb-4"
            >
              Shop nu bij Zooplus →
            </a>
            <div className="flex items-center justify-center gap-6 text-white/80 text-sm">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" />
                Gratis bezorging €39+
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" />
                30 dagen retour
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" />
                Veilig betalen
              </span>
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
              "headline": "Hondenvoer bij Zooplus: Beste Merken & Kortingen 2024",
              "description": "Complete gids over hondenvoer bij Zooplus. Ontdek Royal Canin, Hill's, Wolf of Wilderness en meer met gratis bezorging en kortingen.",
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
              "datePublished": "2024-01-15",
              "dateModified": "2024-01-15"
            })
          }}
        />
      </article>
    </div>
    </>
  );
}
