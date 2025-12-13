import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Heart, ShoppingCart, Info, Star } from "lucide-react";

import { GidsBreadcrumbs } from "@/components/gids";
export const metadata: Metadata = {
  title: "Kattenvoer bij Zooplus.nl: Ruim Assortiment & Beste Prijzen",
  description: "Bestel premium kattenvoer bij Zooplus.nl. Gratis verzending vanaf €49, top merken als Royal Canin, Purizon en Cosma. Graanvrij, nat- en droogvoer voor elke kat.",
  keywords: "kattenvoer zooplus, kattenvoer online bestellen, royal canin kattenvoer, graanvrij kattenvoer, kitten voer, natvoer katten",
  openGraph: {
    title: "Kattenvoer Online bij Zooplus.nl - Top Merken & Gratis Verzending",
    description: "Bestel premium kattenvoer bij Zooplus.nl. Grootste assortiment, beste prijzen en gratis verzending vanaf €49.",
  },
};

export default function KattenvoerZooplusPage() {
  return (
    <>
    <GidsBreadcrumbs
        items={[
          { label: "Dierenwinkel", href: "/nl/gids/dierenwinkel" },
          { label: "Kattenvoer bij Zooplus.nl" }
        ]}
      />
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent dark:to-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 dark:bg-cpCharcoal/60 border border-cpCoral/30 dark:border-cpAmber/20 mb-6">
            <ShoppingCart className="h-4 w-4 text-cpCoral" />
            <span className="text-sm font-medium text-foreground dark:text-cpCream">
              Online Dierenwinkel #1 in Nederland
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6 tracking-tight">
            Kattenvoer bij Zooplus.nl: <span className="text-cpCoral">Premium Kwaliteit met Gratis Verzending</span>
          </h1>

          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Ontdek het grootste assortiment kattenvoer bij Zooplus.nl. Van premium merken als Royal Canin en Hill's tot natuurlijk graanvrij voer van Purizon en Cosma. Gratis verzending vanaf €49 en altijd de beste prijzen voor jouw kat.
          </p>

          {/* Primary CTA */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpAmber/20 shadow-sm">
            <div className="flex items-start gap-3 mb-4">
              <Star className="h-5 w-5 text-cpAmber flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm font-medium text-foreground dark:text-cpCream mb-1">
                  Voordelen van bestellen bij Zooplus.nl:
                </p>
                <ul className="text-sm text-muted-foreground dark:text-cpCream/70 space-y-1">
                  <li>✓ Gratis verzending vanaf €49</li>
                  <li>✓ Grootste assortiment kattenvoer van Nederland</li>
                  <li>✓ Top merken tegen de beste prijzen</li>
                  <li>✓ Snelle levering binnen 2-4 werkdagen</li>
                </ul>
              </div>
            </div>
            <a
              href="https://go.cutiepawspedia.com/zooplus.nl"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-block w-full text-center bg-cpCoral text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform font-medium shadow-md"
            >
              Bekijk het volledige assortiment bij Zooplus.nl →
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-16">
        {/* Section 1: Waarom Zooplus kiezen */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
            Waarom Kattenvoer Bestellen bij Zooplus.nl?
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-4 leading-relaxed">
            Zooplus.nl is Europa's grootste online dierenwinkel en heeft zich gespecialiseerd in kwalitatief hoogstaand kattenvoer voor elke kat. Of je nu op zoek bent naar premium droogvoer, smaakvolle natvoer, graanvrije opties of speciaal dieetvoer - bij Zooplus vind je precies wat jouw kat nodig heeft.
          </p>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl p-6 border border-cpAmber/20 dark:border-cpAmber/10 my-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
              <Info className="h-5 w-5 text-cpAmber" />
              Belangrijkste voordelen van Zooplus.nl:
            </h3>
            <ul className="space-y-2">
              {[
                "Grootste online assortiment kattenvoer in de Benelux met meer dan 5000+ producten",
                "Gratis verzending bij bestellingen vanaf €49 - altijd scherpe prijzen",
                "Top merken zoals Royal Canin, Hill's Science Plan, Purizon, Applaws en Cosma",
                "Snelle levering binnen 2-4 werkdagen rechtstreeks bij je thuis",
                "Klantenservice die je helpt met persoonlijk voedingsadvies",
                "Veilig betalen met iDEAL, creditcard of achteraf betalen",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpAmber flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed">
            Met meer dan 20 jaar ervaring en miljoenen tevreden klanten in Europa, is Zooplus.nl de betrouwbare keuze voor kattenbaasjes die het beste willen voor hun huisdier. De webshop biedt niet alleen een enorm assortiment, maar ook uitgebreide productinformatie, klantreviews en voedingsadviezen om je te helpen de juiste keuze te maken.
          </p>
        </section>

        {/* Section 2: Top Kattenvoer Merken bij Zooplus */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Top Kattenvoer Merken bij Zooplus.nl
          </h2>

          {/* Brand 1 */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-cpCoral mb-2">1. Royal Canin - Wetenschappelijk Onderbouwd Kattenvoer</h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Royal Canin is wereldwijd erkend voor zijn wetenschappelijk onderbouwde voedingsoplossingen. Bij Zooplus vind je het complete assortiment: van rasspecifiek voer (Persian, British Shorthair, Maine Coon) tot voer voor specifieke behoeften zoals Indoor, Sterilised en Senior. Royal Canin gebruikt hoogwaardige ingrediënten en past de brokgrootte en textuur aan voor optimale eetbaarheid.
            </p>
            <p className="text-sm text-cpCoral font-medium">✓ Perfect voor: Rasspecifieke behoeften, indoor katten, gesteriliseerde katten</p>
          </div>

          {/* Brand 2 */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-cpCoral mb-2">2. Hill's Science Plan - Premium Gezondheidsvoer</h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Hill's Science Plan wordt ontwikkeld door dierenartsen en staat bekend om zijn klinisch geteste formules. Het assortiment bij Zooplus omvat voer voor kittens, volwassen katten en seniors, met speciale lijnen voor gewichtsbeheersing, urineweggezondheid en gevoelige spijsvertering. Hill's gebruikt alleen hoogwaardige ingrediënten zonder kunstmatige kleurstoffen.
            </p>
            <p className="text-sm text-cpCoral font-medium">✓ Perfect voor: Katten met gezondheidsproblemen, gewichtsbeheersing, senior katten</p>
          </div>

          {/* Brand 3 */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-cpCoral mb-2">3. Purizon - Natuurlijk Graanvrij Kattenvoer</h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Purizon is het premium graanvrije merk van Zooplus met een hoog vleesgehalte (70-85%). De recepturen zijn geïnspireerd op het natuurlijke dieet van katten met verse kip, zalm, lam of eend als hoofdingrediënt. Perfect voor katten met graanintolerantie of baasjes die kiezen voor natuurlijke voeding zonder kunstmatige toevoegingen.
            </p>
            <p className="text-sm text-cpCoral font-medium">✓ Perfect voor: Graanvrije voeding, natuurlijke ingrediënten, actieve katten</p>
          </div>

          {/* Brand 4 */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-cpCoral mb-2">4. Applaws - Premium Natuurlijk Natvoer</h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Applaws staat bekend om zijn 100% natuurlijke ingrediënten en hoge vleesgehalte (tot 75% in natvoer). Bij Zooplus vind je zowel smakelijke natvoer blikjes als krokante droogvoer brokken. Applaws gebruikt alleen vis of vlees uit duurzame bronnen en voegt geen kunstmatige kleurstoffen, smaakstoffen of conserveringsmiddelen toe.
            </p>
            <p className="text-sm text-cpCoral font-medium">✓ Perfect voor: Kieskeurige katten, natuurlijke voeding, hoog eiwitgehalte</p>
          </div>

          {/* Brand 5 */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-cpCoral mb-2">5. Cosma - Premium Natvoer met Pure Ingrediënten</h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Cosma is een premium natvoer merk exclusief verkrijgbaar bij Zooplus. Cosma Original bestaat uit 100% pure vis of vlees in eigen bouillon, zonder toevoegingen. Cosma Thai biedt exotische smaken zoals kip met papaja of tonijn met pompoen. Perfect voor katten die van variatie houden en puur natuurlijk voer verdienen.
            </p>
            <p className="text-sm text-cpCoral font-medium">✓ Perfect voor: Pure ingrediënten, variatie in smaken, verwennerij</p>
          </div>

          {/* Brand 6 */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-cpCoral mb-2">6. Concept for Life - Uitgebalanceerd All-round Kattenvoer</h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Concept for Life is het huismerk van Zooplus met uitstekende prijs-kwaliteitverhouding. Het assortiment biedt specifieke formules voor indoor katten, gesteriliseerde katten, katten met overgewicht en senior katten. De voedingsmiddelen bevatten hoogwaardige ingrediënten, taurine voor een gezonde hartfunctie en prebiotica voor gezonde spijsvertering.
            </p>
            <p className="text-sm text-cpCoral font-medium">✓ Perfect voor: Budget-friendly premium voer, dagelijkse voeding, alle levensfasen</p>
          </div>

          {/* Middle CTA */}
          <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/5 dark:from-cpCoral/5 dark:to-cpAmber/5 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpAmber/20 my-8">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-2 flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-cpCoral" />
              Ontdek het volledige kattenvoer assortiment
            </h3>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
              Bekijk meer dan 5000+ kattenvoer producten bij Zooplus.nl. Van budget-friendly tot super-premium, van kitten tot senior, van droogvoer tot natvoer - er is altijd een perfecte match voor jouw kat.
            </p>
            <a
              href="https://go.cutiepawspedia.com/zooplus.nl"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-block bg-cpCoral text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform font-medium shadow-md text-sm"
            >
              Shop kattenvoer bij Zooplus.nl met gratis verzending →
            </a>
          </div>
        </section>

        {/* Section 3: Droogvoer vs Natvoer */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
            Droogvoer of Natvoer voor je Kat: Wat Kies je bij Zooplus?
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-4 leading-relaxed">
            Bij Zooplus.nl vind je zowel uitgebreid droogvoer als natvoer assortiment. Beide soorten voer hebben hun eigen voordelen, en veel kattenbaasjes kiezen voor een combinatie van beide voor optimale voeding en variatie.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="text-xl font-bold text-cpCoral mb-3">Droogvoer (Brokken)</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Zeer voordelig en lang houdbaar (tot 6 maanden na opening)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Helpt bij gebitsverzorging door schurend effect</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Gemakkelijk te doseren en bewaren</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Hogere energiedichtheid - kleinere porties nodig</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Ideaal voor katten die de hele dag grazen</span>
                </li>
              </ul>
              <p className="text-xs text-muted-foreground dark:text-cpCream/60 italic">
                Top droogvoer merken bij Zooplus: Royal Canin, Purizon, Hill's Science Plan
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="text-xl font-bold text-cpCoral mb-3">Natvoer (Blikken/Zakjes/Bakjes)</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Veel smaakvoller en aantrekkelijker voor kieskeurige katten</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Hoge vochtopname (75-80%) - goed voor nieren en urinewegen</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Makkelijker te verteren voor katten met gevoelige magen</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Perfect voor senior katten of katten met tandproblemen</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Enorme variatie in smaken en texturen beschikbaar</span>
                </li>
              </ul>
              <p className="text-xs text-muted-foreground dark:text-cpCream/60 italic">
                Top natvoer merken bij Zooplus: Cosma, Applaws, Royal Canin natvoer, Animonda
              </p>
            </div>
          </div>

          <div className="bg-cpAqua/10 dark:bg-cpAqua/5 rounded-2xl p-5 border border-cpAqua/20 dark:border-cpAqua/10">
            <h4 className="font-bold text-foreground dark:text-cpCream mb-2">💡 Expert Tip: Combineer Droog- en Natvoer</h4>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              Veel dierenartsen adviseren een combinatie van beide: droogvoer als basis (goed voor gebit en lang houdbaar) en natvoer als toevoeging voor extra vochtinname en smaakbeleving. Bij Zooplus.nl kun je eenvoudig voorraden van beide bestellen met gratis verzending vanaf €49.
            </p>
          </div>
        </section>

        {/* Section 4: Graanvrij Kattenvoer */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
            Graanvrij Kattenvoer bij Zooplus: Voor Katten met Allergieën
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-4 leading-relaxed">
            Steeds meer kattenbaasjes kiezen voor graanvrij kattenvoer. Katten zijn van nature carnivoren (vleeseters) en hebben granen niet nodig in hun dieet. Graanvrij voer bevat meer vlees en vis, en minder koolhydraten, wat beter aansluit bij het natuurlijke dieet van katten.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Voor wie?</h3>
              <ul className="text-sm text-muted-foreground dark:text-cpCream/70 space-y-1">
                <li>• Katten met graanallergieën</li>
                <li>• Gevoelige spijsvertering</li>
                <li>• Huidproblemen</li>
                <li>• Voedselintolerantie</li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Voordelen</h3>
              <ul className="text-sm text-muted-foreground dark:text-cpCream/70 space-y-1">
                <li>• Hoog vleesgehalte (70-85%)</li>
                <li>• Minder allergische reacties</li>
                <li>• Betere spijsvertering</li>
                <li>• Natuurlijke ingrediënten</li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Top merken</h3>
              <ul className="text-sm text-muted-foreground dark:text-cpCream/70 space-y-1">
                <li>• Purizon (70-85% vlees)</li>
                <li>• Applaws (75% vlees)</li>
                <li>• Concept for Life Graanvrij</li>
                <li>• Wild Freedom</li>
              </ul>
            </div>
          </div>

          <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
            Bij Zooplus.nl vind je een enorme selectie graanvrije kattenvoer opties in verschillende prijsklassen. Van budget-friendly Concept for Life tot super-premium Purizon en Applaws - er is voor elk budget en elke smaakvoorkeur een passende optie.
          </p>
        </section>

        {/* Section 5: Speciaal Voer */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
            Speciaal Kattenvoer voor Elke Levensfase en Behoefte
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Bij Zooplus.nl vind je niet alleen standaard kattenvoer, maar ook een breed assortiment speciaal voer voor specifieke behoeften en levensfasen van je kat.
          </p>

          <div className="space-y-4">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-cpCoral mb-2">🐱 Kitten Voer (0-12 maanden)</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                Kittens groeien razendsnel en hebben extra energie, eiwitten en mineralen nodig voor gezonde ontwikkeling. Kitten voer bevat kleinere brokjes of zachte paté voor melktandjes.
              </p>
              <p className="text-xs text-cpCoral font-medium">Top keuzes: Royal Canin Kitten, Hill's Science Plan Kitten, Concept for Life Kitten</p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-cpCoral mb-2">🏠 Indoor Kattenvoer</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                Indoor katten bewegen minder en hebben een trager metabolisme. Indoor voer bevat minder calorieën, extra vezels voor haarballen en ingrediënten voor gezonde stoelgang.
              </p>
              <p className="text-xs text-cpCoral font-medium">Top keuzes: Royal Canin Indoor, Purizon Indoor, Concept for Life Indoor</p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-cpCoral mb-2">⚖️ Sterilised / Gesteriliseerd Kattenvoer</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                Gesteriliseerde katten hebben 30% meer risico op overgewicht. Sterilised voer bevat minder calorieën en vet, met extra vezels voor verzadiging en L-carnitine voor vetverbranding.
              </p>
              <p className="text-xs text-cpCoral font-medium">Top keuzes: Royal Canin Sterilised, Hill's Science Plan Sterilised Cat, Purizon Sterilised</p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-cpCoral mb-2">👴 Senior Kattenvoer (7+ jaar)</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                Oudere katten hebben andere voedingsbehoeften: minder calorieën, extra antioxidanten voor het immuunsysteem, glucosamine voor gewrichten en gemakkelijk verteerbare eiwitten.
              </p>
              <p className="text-xs text-cpCoral font-medium">Top keuzes: Hill's Science Plan Mature Adult 7+, Royal Canin Ageing 12+, Concept for Life Senior</p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-cpCoral mb-2">💊 Dieetvoer voor Gezondheidsproblemen</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                Zooplus biedt ook veterinair dieetvoer voor katten met nierproblemen, blaasgruis, diabetes, voedselallergie of spijsverteringsproblemen. Altijd in overleg met je dierenarts te gebruiken.
              </p>
              <p className="text-xs text-cpCoral font-medium">Top keuzes: Hill's Prescription Diet, Royal Canin Veterinary Diet, Specific</p>
            </div>
          </div>
        </section>

        {/* Section 6: Prijzen en Bezorging */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
            Prijzen en Bezorgvoordelen bij Zooplus.nl
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Een van de grootste voordelen van bestellen bij Zooplus.nl zijn de scherpe prijzen en het bezorggemak. Door hun grote inkoopvolume en directe samenwerking met fabrikanten kan Zooplus vaak lagere prijzen aanbieden dan fysieke dierenwinkels.
          </p>

          <div className="bg-gradient-to-br from-cpAmber/10 to-cpCoral/5 dark:from-cpAmber/5 dark:to-cpCoral/5 rounded-2xl p-6 border border-cpAmber/20 dark:border-cpAmber/10 mb-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-4">Bezorgvoordelen</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <ShoppingCart className="h-5 w-5 text-cpAmber flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground dark:text-cpCream text-sm mb-1">Gratis Verzending vanaf €49</p>
                  <p className="text-xs text-muted-foreground dark:text-cpCream/70">Bestel voldoende voorraad en bespaar op verzendkosten</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpAmber flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground dark:text-cpCream text-sm mb-1">Snelle Levering 2-4 Werkdagen</p>
                  <p className="text-xs text-muted-foreground dark:text-cpCream/70">Track & Trace om je bestelling te volgen</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="h-5 w-5 text-cpAmber flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground dark:text-cpCream text-sm mb-1">Tot 50% Korting op Acties</p>
                  <p className="text-xs text-muted-foreground dark:text-cpCream/70">Regelmatig aanbiedingen op populaire merken</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-cpAmber flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground dark:text-cpCream text-sm mb-1">14 Dagen Bedenktijd</p>
                  <p className="text-xs text-muted-foreground dark:text-cpCream/70">Niet tevreden? Gemakkelijk retourneren</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
            <h4 className="font-bold text-foreground dark:text-cpCream mb-3">Prijsvoorbeelden (indicatief)</h4>
            <div className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
              <div className="flex justify-between">
                <span>• Royal Canin Indoor 27 (2kg droogvoer)</span>
                <span className="font-medium">€15-20</span>
              </div>
              <div className="flex justify-between">
                <span>• Purizon Kitten Kip & Vis (400g droogvoer)</span>
                <span className="font-medium">€5-8</span>
              </div>
              <div className="flex justify-between">
                <span>• Cosma Original in Jelly (6x170g natvoer)</span>
                <span className="font-medium">€8-12</span>
              </div>
              <div className="flex justify-between">
                <span>• Hill's Science Plan Adult (1,5kg droogvoer)</span>
                <span className="font-medium">€12-18</span>
              </div>
              <div className="flex justify-between">
                <span>• Applaws Kip Natvoer (24x156g blikjes)</span>
                <span className="font-medium">€25-35</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground dark:text-cpCream/60 italic mt-3">
              * Prijzen zijn indicatief en kunnen variëren. Bekijk actuele prijzen op Zooplus.nl
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veelgestelde Vragen over Kattenvoer Bestellen bij Zooplus
          </h2>

          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Is kattenvoer bij Zooplus.nl goedkoper dan in de winkel?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, door hun grote inkoopvolume en lagere operationele kosten kan Zooplus vaak 10-30% lagere prijzen aanbieden dan fysieke dierenwinkels. Daarnaast zijn er regelmatig kortingsacties en aanbiedingen, en profiteer je van gratis verzending bij bestellingen vanaf €49. Dit maakt online bestellen bij Zooplus vaak voordeliger, vooral als je grotere hoeveelheden bestelt.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Hoe snel wordt mijn kattenvoer bezorgd?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Zooplus.nl levert binnen 2-4 werkdagen in Nederland. Je ontvangt een Track & Trace code om je bestelling te volgen. Bij bestellingen voor 23:59 uur wordt je pakket meestal de volgende werkdag verzonden. Houd er rekening mee dat bezorgtijden kunnen variëren tijdens piekperiodes of bij leveranciersbeperkingen van specifieke producten.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Welk kattenvoer is het beste volgens klanten van Zooplus?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Op basis van klantreviews op Zooplus.nl zijn de topfavorieten: Royal Canin (voor rasspecifiek en wetenschappelijk onderbouwd voer), Cosma Original (voor pure natvoer zonder toevoegingen), Purizon (voor graanvrij droogvoer met hoog vleesgehalte), en Applaws (voor natuurlijk natvoer). De beste keuze hangt echter af van jouw kat's leeftijd, gezondheid en smaakvoorkeur. Lees altijd de productreviews en voedingsadviezen op Zooplus.nl.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kan ik gratis samples of proefpakketten krijgen?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Zooplus biedt regelmatig proefpakketten en kleinere verpakkingen aan waarmee je nieuwe merken kunt uitproberen zonder direct een grote zak te kopen. Check de "Proefpakketten" categorie op de website. Sommige merken zoals Purizon en Concept for Life bieden ook kleinere testformaten aan (400g-800g). Dit is ideaal om te testen of je kat het nieuwe voer lekker vindt voordat je een grote voorraad bestelt.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Is graanvrij kattenvoer altijd beter?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Niet per se. Graanvrij voer is vooral nuttig voor katten met graanallergie of intolerantie. Katten zijn wel carnivoren, maar kunnen ook kleinere hoeveelheden granen goed verteren. Het belangrijkste is dat vlees of vis de hoofdingrediënt is en het voer een goede balans heeft van eiwitten, vetten en essentiële voedingsstoffen. Bij twijfel kun je altijd contact opnemen met de klantenservice van Zooplus of je dierenarts raadplegen.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Wat is het verschil tussen normaal voer en veterinair dieetvoer?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Veterinair dieetvoer (zoals Hill's Prescription Diet of Royal Canin Veterinary Diet) is speciaal ontwikkeld voor katten met specifieke gezondheidsproblemen zoals nierproblemen, diabetes, blaasgruis of voedselallergie. Deze voedingsmiddelen bevatten aangepaste hoeveelheden eiwitten, mineralen of specifieke ingrediënten om de aandoening te ondersteunen. Gebruik veterinair dieetvoer altijd in overleg met je dierenarts en niet zonder diagnose.
              </div>
            </details>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-3xl p-8 md:p-12 shadow-xl text-center">
          <div className="max-w-2xl mx-auto">
            <ShoppingCart className="h-12 w-12 text-white mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Bestel Premium Kattenvoer bij Zooplus.nl
            </h2>
            <p className="text-white/90 mb-6 text-lg">
              Ontdek meer dan 5000+ kattenvoer producten van topmerken. Gratis verzending vanaf €49, scherpe prijzen en snelle levering binnen 2-4 werkdagen. Geef jouw kat de voeding die ze verdient!
            </p>
            <a
              href="https://go.cutiepawspedia.com/zooplus.nl"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-block bg-white text-cpCoral rounded-xl px-8 py-4 hover:-translate-y-1 transition-transform font-bold shadow-lg text-lg"
            >
              Shop nu bij Zooplus.nl met gratis verzending →
            </a>
            <p className="text-white/70 text-sm mt-4">
              ✓ Gratis verzending vanaf €49 • ✓ 14 dagen bedenktijd • ✓ Veilig betalen met iDEAL
            </p>
          </div>
        </section>

        {/* Schema.org Article Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "Kattenvoer bij Zooplus.nl: Premium Kwaliteit met Gratis Verzending",
              "description": "Bestel premium kattenvoer bij Zooplus.nl. Grootste assortiment van Nederland met top merken als Royal Canin, Purizon, Cosma en Hill's. Gratis verzending vanaf €49.",
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
              "dateModified": "2024-01-15",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://cutiepawspedia.com/nl/gids/dierenwinkel/kattenvoer-zooplus"
              }
            })
          }}
        />

        {/* Schema.org FAQPage Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Is kattenvoer bij Zooplus.nl goedkoper dan in de winkel?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ja, door hun grote inkoopvolume en lagere operationele kosten kan Zooplus vaak 10-30% lagere prijzen aanbieden dan fysieke dierenwinkels. Daarnaast zijn er regelmatig kortingsacties en aanbiedingen, en profiteer je van gratis verzending bij bestellingen vanaf €49."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Hoe snel wordt mijn kattenvoer bezorgd?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Zooplus.nl levert binnen 2-4 werkdagen in Nederland. Je ontvangt een Track & Trace code om je bestelling te volgen. Bij bestellingen voor 23:59 uur wordt je pakket meestal de volgende werkdag verzonden."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Welk kattenvoer is het beste volgens klanten van Zooplus?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Op basis van klantreviews zijn de topfavorieten: Royal Canin (voor rasspecifiek voer), Cosma Original (voor pure natvoer), Purizon (voor graanvrij droogvoer), en Applaws (voor natuurlijk natvoer). De beste keuze hangt af van jouw kat's leeftijd, gezondheid en smaakvoorkeur."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is graanvrij kattenvoer altijd beter?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Niet per se. Graanvrij voer is vooral nuttig voor katten met graanallergie of intolerantie. Het belangrijkste is dat vlees of vis de hoofdingrediënt is en het voer een goede balans heeft van eiwitten, vetten en essentiële voedingsstoffen."
                  }
                }
              ]
            })
          }}
        />
      </article>
    </div>
    </>
  );
}
