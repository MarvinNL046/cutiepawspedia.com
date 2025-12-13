import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Heart, ShoppingCart, Info, Star } from "lucide-react";

import { GidsBreadcrumbs } from "@/components/gids";
export const metadata: Metadata = {
  title: "Beste Dierensnacks bij Zooplus.nl | Top Keuze 2024",
  description: "Ontdek het beste assortiment hondensnacks en kattensnacks bij zooplus.nl. Van Dreamies tot Dentastix - vind gezonde en lekkere snacks voor jouw huisdier.",
  keywords: "zooplus snacks, hondensnacks, kattensnacks, dreamies, dentastix, gezonde snacks hond, training treats",
  openGraph: {
    title: "Complete Dierensnacks Gids: Zooplus.nl Assortiment 2024",
    description: "Vergelijk de beste dierensnacks bij zooplus.nl en vind lekkere beloning voor jouw huisdier.",
  },
};

export default function ZooplusDierensnacksPage() {
  return (
    <>
    <GidsBreadcrumbs
        items={[
          { label: "Dierenwinkel", href: "/nl/gids/dierenwinkel" },
          { label: "Beste Dierensnacks bij Zooplus.nl" }
        ]}
      />
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent dark:to-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 dark:bg-cpCharcoal/60 border border-cpCoral/30 dark:border-cpAmber/20 mb-6">
            <Heart className="h-4 w-4 text-cpCoral" />
            <span className="text-sm font-medium text-foreground dark:text-cpCream">
              Zooplus.nl Snacks Specialist
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6 tracking-tight">
            Beste Dierensnacks bij <span className="text-cpCoral">Zooplus.nl</span>: Complete Gids 2024
          </h1>

          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Verwennen van je huisdier begint bij de juiste snacks! Bij zooplus.nl vind je een enorm assortiment aan hondensnacks en kattensnacks - van gezonde training treats tot smakelijke beloningen. In deze gids ontdek je de beste merken en keuzes voor jouw trouwe viervoeter.
          </p>

          {/* Primary CTA */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpAmber/20 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Star className="h-5 w-5 text-cpAmber fill-cpAmber" />
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Bekijk het volledige assortiment dierensnacks bij zooplus.nl
              </p>
            </div>
            <a
              href="https://go.cutiepawspedia.com/zooplus.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-cpCoral text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform font-medium shadow-md"
            >
              <ShoppingCart className="h-5 w-5" />
              Ontdek zooplus.nl snacks →
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-16">
        {/* Section 1: Waarom Zooplus voor snacks */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
            Waarom Kiezen voor Zooplus.nl Dierensnacks?
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-4 leading-relaxed">
            Zooplus.nl is Europa's grootste online dierenwinkel en biedt een ongeëvenaard assortiment aan dierensnacks. Van premium merken tot betaalbare opties - je vindt er alles wat je huisdier lekker vindt. Het voordeel? Gratis verzending vanaf €49, scherpe prijzen, en het gemak van thuisbezorging.
          </p>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl p-6 border border-cpAmber/20 dark:border-cpAmber/10 my-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
              <Info className="h-5 w-5 text-cpAmber" />
              Voordelen van bestellen bij zooplus.nl:
            </h3>
            <ul className="space-y-2">
              {[
                "Gratis verzending vanaf €49 (perfect voor voorraad aanleggen)",
                "Grootste assortiment dierensnacks in Nederland",
                "Scherpe prijzen en regelmatige kortingsacties",
                "Betrouwbare thuisbezorging binnen 2-5 werkdagen",
                "Klantenreviews bij elk product voor eerlijke feedback",
                "Eenvoudig retourneren binnen 100 dagen",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpAmber flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 2: Beste Hondensnacks */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Beste Hondensnacks bij Zooplus.nl
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Zooplus.nl heeft een enorm aanbod aan hondensnacks voor elke gelegenheid. Of je nu zoekt naar training treats, kauwsnacks voor het gebit, of gewoon een lekkere beloning - hier vind je de beste opties.
          </p>

          {/* Snack Category 1 - Dental Snacks */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-cpCoral mb-2">1. Dental Snacks (Gebitsverzorging)</h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              <strong>Top Merken:</strong> Pedigree Dentastix, Greenies, Whimzees
            </p>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Dental snacks zijn essentieel voor een gezond hondengebit. Dentastix zijn de meest populaire keuze - ze verwijderen tandplak en verkleinen tandsteen met tot 80%. Greenies hebben een unieke textuur die tot aan het tandvlees werkt, terwijl Whimzees volledig natuurlijk en plantaardig zijn (perfect voor allergische honden). Bij zooplus.nl vind je voordeelpakketten voor langdurig gebruik.
            </p>
            <p className="text-sm text-cpCoral font-medium">✓ Perfect voor: Dagelijkse gebitsverzorging, frisse adem, tandplak verwijdering</p>
          </div>

          {/* Snack Category 2 - Training Treats */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-cpCoral mb-2">2. Training Treats (Beloningssnoepjes)</h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              <strong>Top Merken:</strong> Rocco Training Sticks, Lukullus, Trixie Mini Bones
            </p>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Voor effectieve hondentraining heb je kleine, zachte snoepjes nodig die snel opgegeten worden. Rocco Training Sticks zijn ultra-smakelijk en klein genoeg om tientallen keren te belonen zonder dat je hond te veel calorieën binnenkrijgt. Lukullus biedt graanvrije opties voor gevoelige honden. Belangrijk bij training treats: laag in calorieën, hoog in smaak, en snel te kauwen.
            </p>
            <p className="text-sm text-cpCoral font-medium">✓ Perfect voor: Puppytraining, gehoorzaamheidstraining, trucjes aanleren</p>
          </div>

          {/* Snack Category 3 - Kauwsnacks */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-cpCoral mb-2">3. Natuurlijke Kauwsnacks</h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              <strong>Top Producten:</strong> Runderoren, kipfilet strips, runderhuiden, hertentakken
            </p>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Natuurlijke kauwsnacks zijn 100% puur vlees zonder toevoegingen - ideaal voor honden die langdurig willen kauwen. Runderoren zijn rijk aan chondroïtine (goed voor gewrichten), kipfilet strips zijn eiwitrijk en makkelijk verteerbaar, en hertentakken bieden urenlang kauwplezier zonder calorieën. Bij zooplus.nl vind je een enorme keuze aan gedroogde snacks van topkwaliteit.
            </p>
            <p className="text-sm text-cpCoral font-medium">✓ Perfect voor: Langdurig kauwplezier, natuurlijke beloning, eiwitrijke snack</p>
          </div>

          {/* Snack Category 4 - Kauwbotten */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-cpCoral mb-2">4. Kauwbotten en Bisonbotten</h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              <strong>Top Producten:</strong> Bisonbotten gevuld, rundermergsbeenderen, varkensoren
            </p>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Voor krachtige kauwers zijn botten de ultieme uitdaging. Gevulde bisonbotten met paté of pindakaas houden je hond urenlang bezig, mergsbeenderen zijn rijk aan vitamines en mineralen, en varkensoren zijn knapperig en lekker. Let op: altijd onder toezicht geven en kies de juiste maat voor je hond. Zooplus.nl biedt verschillende maten voor kleine tot grote rassen.
            </p>
            <p className="text-sm text-cpCoral font-medium">✓ Perfect voor: Krachtige kauwers, verveling tegengaan, uren kauwplezier</p>
          </div>

          {/* Middle CTA */}
          <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/5 dark:from-cpCoral/5 dark:to-cpAmber/5 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpAmber/20 my-8">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-2">
              Klaar om jouw hond te verwennen?
            </h3>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
              Bekijk het complete assortiment hondensnacks bij zooplus.nl en profiteer van gratis verzending vanaf €49. Perfect om voorraad aan te leggen!
            </p>
            <a
              href="https://go.cutiepawspedia.com/zooplus.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-cpCoral text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform font-medium shadow-md text-sm"
            >
              <ShoppingCart className="h-5 w-5" />
              Bekijk hondensnacks bij zooplus.nl →
            </a>
          </div>
        </section>

        {/* Section 3: Beste Kattensnacks */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Beste Kattensnacks bij Zooplus.nl
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Ook voor katten heeft zooplus.nl een uitgebreid assortiment aan snacks. Van knapperige Dreamies tot crèmige paté treats - elke kat vindt hier zijn favoriete beloning.
          </p>

          {/* Cat Snack 1 - Dreamies */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-cpCoral mb-2">1. Dreamies - De Klassieker</h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Dreamies zijn zonder twijfel de populairste kattensnacks in Nederland. Deze knapperige snoepjes met een zachte vulling zijn er in meer dan 10 smaken: kip, zalm, kaas, rund, tonijn, eend, en meer. Katten zijn er gek op! Bij zooplus.nl vind je voordeelpakketten met meerdere zakjes voor een scherpe prijs. Perfect voor dagelijkse beloningen of training.
            </p>
            <p className="text-sm text-cpCoral font-medium">✓ Perfect voor: Dagelijkse beloning, training, knapperig genot</p>
          </div>

          {/* Cat Snack 2 - Catisfactions */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-cpCoral mb-2">2. Catisfactions (Temptations)</h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Catisfactions, ook bekend als Temptations, zijn vergelijkbaar met Dreamies maar met een andere textuur en smaakcombinaties. Ze zijn iets groter en hebben een extra knapperige buitenkant. Verkrijgbaar in smaken zoals kalkoen, oceaanvis, kip & kaas, en rund. Veel katteneigenaren wisselen af tussen Dreamies en Catisfactions voor variatie.
            </p>
            <p className="text-sm text-cpCoral font-medium">✓ Perfect voor: Variatie in snacks, extra knapperig, smaakcombinaties</p>
          </div>

          {/* Cat Snack 3 - Felix */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-cpCoral mb-2">3. Felix Party Mix & Creamy Treats</h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Felix biedt twee soorten snacks: de Party Mix (knapperige mix van verschillende vormen en smaken) en Creamy Treats (romige paté in handige tubes). De Creamy Treats zijn ideaal voor katten die liever likken dan kauwen, en zijn ook perfect voor het geven van medicijnen (verstopt in de crème). Party Mix is geweldig voor katten die van variatie houden.
            </p>
            <p className="text-sm text-cpCoral font-medium">✓ Perfect voor: Variatie, romige textuur, medicijnen geven</p>
          </div>

          {/* Cat Snack 4 - Natural/Healthy */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-cpCoral mb-2">4. Natuurlijke Kattensnacks</h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              <strong>Top Producten:</strong> Cosma Snackies, Catessy Sticks, Freeze-dried Treats
            </p>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Voor katten met gevoelige magen of eigenaren die natuurlijke ingrediënten prefereren, zijn Cosma Snackies en Catessy Sticks uitstekende keuzes. Deze bevatten meer dan 95% puur vlees zonder granen, suikers of kunstmatige toevoegingen. Freeze-dried treats zijn gevriesdroogde pure vis of vlees - maximale smaak, minimale verwerking.
            </p>
            <p className="text-sm text-cpCoral font-medium">✓ Perfect voor: Natuurlijke ingrediënten, gevoelige katten, eiwitrijk</p>
          </div>
        </section>

        {/* Section 4: Gezonde vs Ongezonde Snacks */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
            Gezonde Snacks vs Ongezonde Snacks: Let Hierop
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-4 leading-relaxed">
            Niet alle snacks zijn even gezond voor je huisdier. Bij het kiezen van snacks is het belangrijk om de ingrediëntenlijst goed te lezen en te letten op suikers, kunstmatige toevoegingen en caloriegehalte.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-green-500/20 dark:border-green-500/20">
              <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-3">✓ Gezonde Snacks Kenmerken</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Vlees of vis als eerste ingrediënt</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Geen toegevoegde suikers</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Natuurlijke conservering</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Duidelijke ingrediëntenlijst</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Functioneel (gebit, gewrichten)</span>
                </li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-red-500/20 dark:border-red-500/20">
              <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-3">✗ Vermijd Deze Ingrediënten</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-red-500 flex-shrink-0 mt-0.5">✗</span>
                  <span>Suikers en siropen (diabetes risico)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-red-500 flex-shrink-0 mt-0.5">✗</span>
                  <span>Kunstmatige kleurstoffen (E-nummers)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-red-500 flex-shrink-0 mt-0.5">✗</span>
                  <span>Vlees bijproducten (onduidelijke kwaliteit)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-red-500 flex-shrink-0 mt-0.5">✗</span>
                  <span>Te veel graan (weinig voedingswaarde)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-red-500 flex-shrink-0 mt-0.5">✗</span>
                  <span>BHA/BHT (kunstmatige conservering)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl p-6 border border-cpAmber/20 dark:border-cpAmber/10">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-2 flex items-center gap-2">
              <Info className="h-5 w-5 text-cpAmber" />
              Gouden regel voor snacks
            </h3>
            <p className="text-muted-foreground dark:text-cpCream/70">
              Snacks mogen maximaal <strong>10% van de dagelijkse calorieënbehoefte</strong> van je huisdier uitmaken. Te veel snacks kan leiden tot overgewicht en onevenwichtige voeding. Pas de hoofdmaaltijd aan als je veel snacks geeft.
            </p>
          </div>
        </section>

        {/* Section 5: Training Snacks Tips */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
            Training Snacks: De Beste Tips voor Effectieve Training
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-4 leading-relaxed">
            Training treats zijn essentieel voor positieve bekrachtiging tijdens hondentraining. Maar niet alle snacks zijn geschikt voor training. Hier zijn de belangrijkste tips voor het kiezen en gebruiken van training snacks.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Klein Formaat</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Kies treats die klein genoeg zijn om snel op te eten (max 1-2 seconden). Grote snacks onderbreken de training te lang en geven te veel calorieën.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Hoge Smaakwaarde</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Training treats moeten extra smakelijk zijn om motivatie hoog te houden. Vlees-based treats werken beter dan graansnacks.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Zachte Textuur</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Zachte snacks worden sneller opgegeten dan harde. Perfect voor intensieve trainingsessies met veel herhalingen.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Laag in Calorieën</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Bij 50+ herhalingen per sessie kunnen calorieën snel oplopen. Kies treats met max 3-5 calorieën per stukje.
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground dark:text-cpCream/70">
            <strong>Pro-tip:</strong> Gebruik verschillende "waarde-niveaus" van treats. Reserve de allerlekkerste snacks voor moeilijke oefeningen of afleidende omgevingen. Voor simpele oefeningen thuis kunnen normale kibbles of minder spannende treats volstaan.
          </p>
        </section>

        {/* Section 6: Dental Snacks */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
            Dental Snacks: Gezonde Tanden en Fris Adem
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-4 leading-relaxed">
            Gebitsverzorging is cruciaal voor de algehele gezondheid van je huisdier. Dental snacks kunnen helpen bij het verwijderen van tandplak en het voorkomen van tandsteen, waardoor dure tandheelkundige behandelingen voorkomen kunnen worden.
          </p>

          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <h3 className="text-lg font-bold text-cpCoral mb-3">Hoe Werken Dental Snacks?</h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Dental snacks hebben een speciale textuur die tandplak mechanisch verwijdert tijdens het kauwen. De vezelige structuur werkt als een tandenborstel en masseert het tandvlees. Sommige bevatten ook ingrediënten die bacteriegroei remmen en adem verfrissen (zoals zink, peterselie, eucalyptus).
            </p>
          </div>

          <div className="bg-cpAqua/10 dark:bg-cpAqua/5 rounded-2xl p-6 border border-cpAqua/20 dark:border-cpAqua/10 mb-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3">Top Dental Snacks bij Zooplus.nl:</h3>
            <ul className="space-y-3">
              <li className="text-muted-foreground dark:text-cpCream/70">
                <strong className="text-cpCoral">Pedigree Dentastix Daily:</strong> Dagelijkse dental stick die klinisch bewezen tandplak vermindert met 80%. Verkrijgbaar voor kleine, middelgrote en grote honden.
              </li>
              <li className="text-muted-foreground dark:text-cpCream/70">
                <strong className="text-cpCoral">Greenies Original:</strong> Unieke textuur die tot aan het tandvlees werkt. Bevat natuurlijke ingrediënten en vitamines. VOHC geaccrediteerd.
              </li>
              <li className="text-muted-foreground dark:text-cpCream/70">
                <strong className="text-cpCoral">Whimzees:</strong> 100% natuurlijk, plantaardig, en graanvrij. Verkrijgbaar in verschillende vormen (tandenborstel, egel, krokodil) voor extra kauwplezier.
              </li>
            </ul>
          </div>

          <p className="text-sm text-muted-foreground dark:text-cpCream/70">
            <strong>Let op:</strong> Dental snacks zijn een aanvulling op, geen vervanging voor, regelmatig tandenpoetsen. Voor optimale mondgezondheid combineer je dental snacks met wekelijks poetsen en jaarlijkse controles bij de dierenarts.
          </p>
        </section>

        {/* Section 7: Prijzen en Aanbiedingen */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
            Prijzen en Aanbiedingen bij Zooplus.nl
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-4 leading-relaxed">
            Een van de grote voordelen van zooplus.nl is de scherpe prijsstelling en regelmatige kortingsacties. Door slim te winkelen en voorraad aan te leggen, bespaar je flink op dierensnacks.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-cpCoral/20 dark:border-cpAmber/20">
              <div className="text-2xl font-bold text-cpCoral mb-2">€49+</div>
              <p className="text-sm font-medium text-foreground dark:text-cpCream mb-1">Gratis Verzending</p>
              <p className="text-xs text-muted-foreground dark:text-cpCream/70">
                Bestel voor minimaal €49 en betaal geen verzendkosten. Perfect voor voorraad!
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-cpCoral/20 dark:border-cpAmber/20">
              <div className="text-2xl font-bold text-cpCoral mb-2">Tot 30%</div>
              <p className="text-sm font-medium text-foreground dark:text-cpCream mb-1">Korting op Voordeelpakketten</p>
              <p className="text-xs text-muted-foreground dark:text-cpCream/70">
                Grote verpakkingen en multipacks zijn vaak flink afgeprijsd t.o.v. losse zakjes.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-cpCoral/20 dark:border-cpAmber/20">
              <div className="text-2xl font-bold text-cpCoral mb-2">100 dagen</div>
              <p className="text-sm font-medium text-foreground dark:text-cpCream mb-1">Retourrecht</p>
              <p className="text-xs text-muted-foreground dark:text-cpCream/70">
                Niet tevreden? Retourneer binnen 100 dagen voor volledige terugbetaling.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-cpAmber/10 to-cpCoral/5 dark:from-cpAmber/5 dark:to-cpCoral/5 rounded-2xl p-6 border border-cpAmber/20 dark:border-cpAmber/10">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-2">💰 Bespaartips voor Dierensnacks</h3>
            <ul className="space-y-2">
              {[
                "Koop voordeelpakketten met meerdere zakjes (vaak 20-30% goedkoper)",
                "Check de 'Aanbiedingen' sectie voor tijdelijke kortingen",
                "Bestel voor €49+ om verzendkosten te besparen",
                "Schrijf in voor de nieuwsbrief voor exclusieve kortingscodes",
                "Combineer verschillende producten om aan €49 te komen",
              ].map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veelgestelde Vragen over Dierensnacks
          </h2>

          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Hoeveel snacks mag ik mijn hond of kat per dag geven?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Snacks mogen maximaal 10% van de dagelijkse calorieënbehoefte uitmaken. Voor een middelgrote hond (15kg) is dat ongeveer 150-200 calorieën aan snacks per dag. Voor een gemiddelde kat (4kg) ongeveer 40-50 calorieën. Lees altijd de verpakking voor aanbevolen hoeveelheden en pas de hoofdmaaltijd aan als je veel snacks geeft om overgewicht te voorkomen.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Zijn Dreamies en Dentastix gezond voor mijn huisdier?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Beide merken zijn veilig wanneer gegeven volgens aanbevolen hoeveelheden. Dreamies bevatten wel granen en suikers, dus geef ze met mate (3-15 stuks per dag afhankelijk van kattengrootte). Dentastix zijn specifiek ontwikkeld voor gebitsverzorging en bevatten vitamines, maar zijn geen vervanging voor tandenpoetsen. Voor dagelijks gebruik zijn deze snacks prima, maar wissel af met natuurlijke alternatieven zoals pure vleessnacks.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Wat zijn de beste training treats voor puppytraining?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Voor puppytraining heb je kleine, zachte snacks nodig die snel opgegeten worden. Top keuzes bij zooplus.nl zijn: Rocco Training Sticks (ultra-klein, zacht, verschillende smaken), Lukullus Training Treats (graanvrij, natuurlijk), en Trixie Mini Bones (kleine maat, betaalbaar). Voor puppy's onder 6 maanden kun je ook hun eigen brokjes gebruiken als beloning - dit voorkomt overvoeding en is het gezondst.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Mijn huisdier heeft een gevoelige maag - welke snacks zijn veilig?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Voor gevoelige magen kies je snacks met minimale ingrediënten en geen kunstmatige toevoegingen. Beste opties: Cosma Snackies (95% puur vlees), gevriesdroogde vleessnacks, gekookte kipfilet strips, of Lukullus Freeze-dried treats. Vermijd snacks met granen, suikers, kunstmatige kleurstoffen en conserveringsmiddelen. Start altijd met kleine hoeveelheden om te testen of je huisdier het goed verdraagt, en raadpleeg je dierenarts bij aanhoudende problemen.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Hoe lang zijn geopende zakjes snacks houdbaar?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Droge snacks (zoals Dreamies, Dentastix, training treats) zijn geopend 4-6 weken houdbaar bij goede bewaring in een afgesloten zak op een koele, droge plaats. Natuurlijke vleessnacks en kauwbotten blijven 2-3 maanden goed in luchtdichte containers. Let op: zachte/vochtige snacks (zoals paté treats) moet je binnen 48 uur gebruiken na openen. Ruik altijd even of snacks nog vers ruiken voordat je ze geeft - ranzig geworden vetten zijn ongezond.
              </div>
            </details>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-3xl p-8 md:p-12 shadow-xl text-center">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="h-6 w-6 text-white fill-white" />
              <Star className="h-6 w-6 text-white fill-white" />
              <Star className="h-6 w-6 text-white fill-white" />
              <Star className="h-6 w-6 text-white fill-white" />
              <Star className="h-6 w-6 text-white fill-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Bestel Dierensnacks bij Zooplus.nl
            </h2>
            <p className="text-white/90 mb-6 text-lg">
              Ontdek het grootste assortiment hondensnacks en kattensnacks in Nederland. Gratis verzending vanaf €49, scherpe prijzen, en thuisbezorging binnen 2-5 werkdagen. Verwennen begint nu!
            </p>
            <a
              href="https://go.cutiepawspedia.com/zooplus.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-cpCoral rounded-xl px-8 py-4 hover:-translate-y-1 transition-transform font-bold shadow-lg text-lg"
            >
              <ShoppingCart className="h-6 w-6" />
              Bekijk snacks bij zooplus.nl →
            </a>
            <p className="text-white/70 text-sm mt-4">
              Gratis verzending vanaf €49 | 100 dagen retourrecht | Klantenreviews bij elk product
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
              "headline": "Beste Dierensnacks bij Zooplus.nl: Complete Gids 2024",
              "description": "Ontdek het beste assortiment hondensnacks en kattensnacks bij zooplus.nl. Van Dreamies tot Dentastix - complete gids voor het kiezen van gezonde snacks.",
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
                "@id": "https://cutiepawspedia.com/nl/gids/dierenwinkel/dierensnacks-zooplus"
              }
            })
          }}
        />
      </article>
    </div>
    </>
  );
}
