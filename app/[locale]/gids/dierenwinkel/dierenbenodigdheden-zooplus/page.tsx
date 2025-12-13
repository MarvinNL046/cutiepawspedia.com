import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ShoppingCart, Heart, Package } from "lucide-react";

import { GidsBreadcrumbs } from "@/components/gids";
export const metadata: Metadata = {
  title: "Dierenbenodigdheden bij Zooplus: Ruim Assortiment Online",
  description: "Bestel alle dierenbenodigdheden online bij Zooplus.nl. Van halsbanden tot krabpalen - alles voor jouw hond of kat met snelle levering en scherpe prijzen.",
  keywords: "zooplus, dierenbenodigdheden, hondenaccessoires, kattenaccessoires, krabpaal, halsband, hondenmand",
  openGraph: {
    title: "Dierenbenodigdheden Zooplus: Alles voor Hond & Kat Online",
    description: "Bestel alle dierenbenodigdheden voor je huisdier bij Zooplus. Breed assortiment, snelle levering en top kwaliteit.",
  },
};

export default function ZooplusDierenbenodigdhedenPage() {
  return (
    <>
    <GidsBreadcrumbs
        items={[
          { label: "Dierenwinkel", href: "/nl/gids/dierenwinkel" },
          { label: "Dierenbenodigdheden bij Zooplus" }
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
            Dierenbenodigdheden bij Zooplus: <span className="text-cpCoral">Alles voor Jouw Huisdier</span>
          </h1>

          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Zooplus.nl is jouw online dierenspeciaalzaak met het grootste assortiment dierenbenodigdheden in Nederland. Van luxe hondenmanden tot innovatieve krabpalen, van stijlvolle halsbanden tot praktische verzorgingsproducten - bij Zooplus vind je alles wat je hond of kat nodig heeft. Met meer dan 8.000 producten, scherpe prijzen en snelle levering is Zooplus dé online bestemming voor huisdiereigenaren.
          </p>

          {/* Primary CTA */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpAmber/20 shadow-sm">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
              Ontdek het ruime assortiment bij Zooplus
            </p>
            <a
              href="https://go.cutiepawspedia.com/zooplus.nl"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-block bg-cpCoral text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform font-medium shadow-md"
            >
              Bekijk alle dierenbenodigdheden bij Zooplus →
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-16">
        {/* Section 1: Waarom Zooplus */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
            Waarom Kiezen voor Zooplus Dierenbenodigdheden?
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-4 leading-relaxed">
            Als één van de grootste online dierenwinkels van Europa biedt Zooplus een unieke combinatie van kwaliteit, keuze en gemak. Met ruim 20 jaar ervaring weten zij precies wat huisdiereigenaren zoeken. Of je nu een speelse pup, een nieuwsgierige kitten, een ervaren senior hond of een verwende binnenkat hebt - bij Zooplus vind je precies de juiste producten.
          </p>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl p-6 border border-cpAmber/20 dark:border-cpAmber/10 my-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
              <Package className="h-5 w-5 text-cpAmber" />
              Voordelen van bestellen bij Zooplus:
            </h3>
            <ul className="space-y-2">
              {[
                "Meer dan 8.000 producten voor honden, katten en andere huisdieren",
                "Gratis verzending vanaf €49 (snelle levering binnen 2-4 werkdagen)",
                "Scherpe prijzen en regelmatige aanbiedingen",
                "Premium merken én betaalbare huismerken",
                "Handige autoship-service voor automatische bezorging",
                "Uitgebreide productbeschrijvingen en klantreviews",
                "Klantenservice die écht verstand heeft van huisdieren",
                "Veilig betalen met iDEAL, creditcard of PayPal",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpAmber flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 2: Hondenaccessoires */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Hondenaccessoires: Comfort en Stijl voor Jouw Hond
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Het assortiment hondenaccessoires bij Zooplus is enorm. Van praktische basisbenodigdheden tot luxe lifestyle-producten - je vindt er alles om jouw hond comfortabel, veilig en stijlvol te houden.
          </p>

          {/* Halsbanden & Riemen */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-cpCoral mb-3">Halsbanden, Riemen & Tuigjes</h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Een goede halsband of tuig is essentieel voor elke wandeling. Bij Zooplus vind je halsbanden in alle maten en stijlen: van stoere leren halsbanden tot kleurrijke nylon modellen met reflecterende strepen voor veiligheid in het donker. Voor honden die trekken zijn er comfortabele borsttuigjes die de druk gelijkmatig verdelen. Ook speciaal voor puppy's zijn er zachte, verstelbare halsbanden die meegroeien.
            </p>
            <p className="text-sm text-cpCoral font-medium">✓ Top merken: Hunter, Ruffwear, Julius-K9, Trixie</p>
          </div>

          {/* Manden & Kussens */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-cpCoral mb-3">Hondenmanden, Kussens & Dekens</h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Een comfortabele slaapplaats is cruciaal voor het welzijn van jouw hond. Zooplus biedt orthopedische manden voor oudere honden met gewrichtsproblemen, verwarmde kussens voor de winter, verkoelende matten voor de zomer, en luxe donutmanden waar honden heerlijk in kunnen kruipen. Voor kleine honden zijn er schattige iglo-mandjes, terwijl grote rassen kunnen genieten van XXL-formaten.
            </p>
            <p className="text-sm text-cpCoral font-medium">✓ Materialen: Memory foam, orthopedisch schuim, waterafstotend, wasbaar</p>
          </div>

          {/* Benches */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-cpCoral mb-3">Hondenbbenches & Transportboxen</h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Voor hondenbezitters die hun viervoeter willen trainen of veilig willen vervoeren, heeft Zooplus een uitgebreid assortiment benches en reismanden. Van inklapbare metalen benches voor thuis tot stevige auto-benches die voldoen aan de crashtest-normen. Ook zijn er zachte reistassen voor kleine honden en airline-approved transportboxen voor vliegreizen.
            </p>
            <p className="text-sm text-cpCoral font-medium">✓ Veilig, comfortabel en volgens de laatste veiligheidsnormen</p>
          </div>

          {/* Speelgoed */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-cpCoral mb-3">Hondensspeelgoed voor Beweging & Mentale Stimulatie</h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Spelen is essentieel voor een gelukkige en gezonde hond. Het speelgoedsortiment bij Zooplus omvat: klassieke apporteerspeeltjes zoals ballen en frisbees, interactief intelligentiespeelgoed zoals snuffelmatten en puzzels, bijtspeelgoed voor puppygebits, KONG's die je kunt vullen met snacks, en pluche knuffels voor honden die graag knuffelen. Voor waterliefhebbers zijn er drijvende speeltjes perfect voor het zwembad of strand.
            </p>
            <p className="text-sm text-cpCoral font-medium">✓ Duurzaam, veilig en geschikt voor alle speelstijlen</p>
          </div>
        </section>

        {/* Section 3: Kattenaccessoires */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Kattenaccessoires: Alles voor een Gelukkige Kat
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Katten zijn eigenwijze dieren met specifieke behoeften. Zooplus begrijpt dat en biedt een breed assortiment kattenproducten die inspelen op het natuurlijke gedrag van katten.
          </p>

          {/* Kattenbakken */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-cpCoral mb-3">Kattenbakken & Kattenbakaccessoires</h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Een goede kattenbak is het fundament van een schoon en geurvrij huis. Bij Zooplus vind je open kattenbakken voor katten die geen gesloten ruimte willen, overdekte kattenbakken voor privacy en minder geur, zelfreinigende kattenbakken voor maximaal gemak, grote kattenbakken voor Maine Coons en andere grote rassen, en hoek-kattenbakken die ruimte besparen. Vergeet ook de kattenbakvulling, schepjes en geurfilters niet!
            </p>
            <p className="text-sm text-cpCoral font-medium">✓ Van basic tot high-tech: voor iedere kat en elk budget</p>
          </div>

          {/* Krabpalen */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-cpCoral mb-3">Krabpalen & Kattenbomen</h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Krabben is natuurlijk gedrag voor katten en essentieel voor gezonde nagels en stressvermindering. Het Zooplus-assortiment bevat compacte krabpalen voor kleine ruimtes, meerdere verdiepingen-tellende kattenbomen voor actieve katten, XXL-krabpalen voor huishoudens met meerdere katten, hangmatten en holletjes voor dutjes, en sisal-, pluche- en kartonnen kraboppervlakken. Sommige modellen reiken tot het plafond voor katten die graag hoog klimmen.
            </p>
            <p className="text-sm text-cpCoral font-medium">✓ Bescherm je meubels en geef je kat een eigen territorium</p>
          </div>

          {/* Kattenspeelgoed */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-cpCoral mb-3">Kattenspeelgoed & Interactieve Spellen</h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Binnenkatten hebben extra mentale en fysieke stimulatie nodig. Bij Zooplus vind je hengelspeeltjes met veren voor de jachtinstinct, intelligentiespeelgoed zoals voerballen en labyrinten, laserpointers voor beweging, kattenkruid-speeltjes, elektronisch speelgoed dat beweegt, en krabkarton in leuke vormen. Perfect om verveling tegen te gaan en je kat actief te houden.
            </p>
            <p className="text-sm text-cpCoral font-medium">✓ Stimuleer het jachtinstinct en voorkom verveling</p>
          </div>

          {/* Transportboxen & Drinkfonteinen */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-cpCoral mb-3">Transportboxen & Drinkfonteinen</h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Voor dierenartsenbezoek of reizen zijn veilige transportboxen onmisbaar. Zooplus biedt harde plastic draagboxen die voldoen aan IATA-normen, zachte draagbare tassen voor korte tripjes, en rugzakken met raampjes voor avontuurlijke katten. Ook zijn er kattendrinkfonteinen die katten stimuleren meer water te drinken door stromend water - veel gezonder voor hun nieren.
            </p>
            <p className="text-sm text-cpCoral font-medium">✓ Veilig vervoer en gezonde hydratatie</p>
          </div>
        </section>

        {/* Middle CTA */}
        <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/5 dark:from-cpCoral/5 dark:to-cpAmber/5 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpAmber/20 my-8">
          <h3 className="font-bold text-foreground dark:text-cpCream mb-2">
            Klaar om te bestellen?
          </h3>
          <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
            Ontdek het volledige assortiment dierenbenodigdheden bij Zooplus. Gratis verzending vanaf €49 en snelle levering binnen 2-4 werkdagen.
          </p>
          <a
            href="https://go.cutiepawspedia.com/zooplus.nl"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-block bg-cpCoral text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform font-medium shadow-md text-sm"
          >
            Bestel nu bij Zooplus →
          </a>
        </div>

        {/* Section 4: Verzorgingsproducten */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
            Verzorgingsproducten voor Honden en Katten
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Een goed verzorgd huisdier is een gezond en gelukkig huisdier. Zooplus heeft alle essentiële verzorgingsproducten om jouw hond of kat er op zijn mooist uit te laten zien.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Shampoo & Vachtverzorging</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Speciale honden- en kattenshampoos voor alle vachttypen, conditioners voor een glanzende vacht, droogshampoo voor tussen de wasbeurten door, en anti-klit sprays. Ook voor gevoelige huid en allergieën zijn er hypoallergene varianten.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Borstels & Kammen</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Ontwarringsborstels voor langharen, slicker brushes voor onderlaagverwijdering, rubberen massageborstels voor kortharige rassen, en speciale ondervachtharken. Plus nagelscharen, nagelknipper en vijlen voor veilige nagelverzorging.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Gebit & Oorreininging</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Tandenborstels en tandpasta voor honden en katten, dental sticks, oordruppels en -reiniger, en speciale doekjes voor oog- en snuitverzorging. Preventie is beter dan genezen, ook bij huisdieren.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Parasieten & Bescherming</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Vlooienkamannen, tekenpincetten, preventieve sprays, en natuurlijke afweermiddelen. Ook beschermende kleding zoals regenjassen en winterjassen voor honden die het koud hebben.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Trainingsproducten */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
            Trainingsmateriaal voor Gehoorzaamheid & Tricks
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-4 leading-relaxed">
            Training is essentieel voor een goed opgevoede en sociaal aangepaste hond. Bij Zooplus vind je alle hulpmiddelen om jouw hond succesvol te trainen.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="text-xl font-bold text-cpCoral mb-3">Clickers & Fluitjes</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                Clicker training is een effectieve positieve trainingsmethode. Bij Zooplus vind je ergonomische clickers met polsband, verstelbare fluitjes voor afstandscommando's, en complete trainingskits met instructies.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="text-xl font-bold text-cpCoral mb-3">Beloningssnacks</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                Training werkt het beste met lekkere beloningen. Kies uit kleine trainingssnacks met weinig calorieën, freeze-dried vleessnacks voor maximale smaak, hypoallergene trainingstraktaties, en snackzakjes om beloningen bij de hand te hebben.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="text-xl font-bold text-cpCoral mb-3">Trainingslijnen</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                Voor herroeptraining zijn lange trainingslijnen essentieel. Verkrijgbaar in lengtes van 5m tot 20m, in lichtgewicht biothane of nylon. Perfect voor het oefenen van "kom" terwijl je hond toch controle behoudt.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="text-xl font-bold text-cpCoral mb-3">Agility & Obstakels</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                Voor sportieve honden zijn er tunnels, springbalken, slalompalen, wippen en andere agility-apparatuur. Leuk voor in de tuin en perfect voor mentale en fysieke uitdaging.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Voerbakken */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
            Voerbakken & Waterbakken: Functioneel en Stijlvol
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-4 leading-relaxed">
            Voerbakken zijn meer dan alleen een praktisch item - ze kunnen bijdragen aan de gezondheid en het comfort van jouw huisdier. Zooplus heeft een enorme keuze:
          </p>

          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <ul className="space-y-3">
              {[
                "**Automatische voerbakken**: Programmeerbaar voor vaste voedingstijden, perfect als je overdag werkt of voor dieetcontrole",
                "**Verhoogde voerbakken**: Ergonomisch voor grote honden of honden met nek- en rugproblemen, betere houding tijdens het eten",
                "**Anti-schrokbakken**: Met obstakels die je hond dwingen langzamer te eten, voorkomt verslikking en maagdraaiing",
                "**Reisbakken**: Opvouwbare siliconen bakken voor onderweg, lichtgewicht en ruimtebesparend",
                "**Design voerbakken**: Stijlvolle keramische of RVS-bakken die passen in je interieur",
                "**Voerbakstandaarden**: Verstelbare hoogtes die meegroeien met puppies of comfort bieden aan oudere dieren",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 7: Prijzen & Bezorging */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
            Prijzen, Aanbiedingen & Bezorgvoordelen
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-4 leading-relaxed">
            Een van de grootste voordelen van online bestellen bij Zooplus is het concurrerende prijsniveau. Dankzij hun grote schaal kunnen ze scherpe prijzen bieden zonder in te leveren op kwaliteit.
          </p>

          <div className="bg-cpAqua/10 dark:bg-cpAqua/5 rounded-2xl p-6 border border-cpAqua/20 dark:border-cpAqua/10 my-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-cpAqua" />
              Bestelvoordelen bij Zooplus:
            </h3>
            <ul className="space-y-2">
              {[
                "**Gratis verzending** vanaf €49 bestellwaarde (daaronder €3,99 verzendkosten)",
                "**Snelle levering** binnen 2-4 werkdagen (expresbezorging beschikbaar)",
                "**Autoship-korting**: Tot 5% korting bij automatische levering",
                "**Loyaliteitsprogramma**: Verzamel punten bij elke aankoop",
                "**Maandelijkse acties**: Verschillende producten elke maand in de aanbieding",
                "**Merkacties**: Regelmatig kortingen op premium merken",
                "**Nieuwsbriefvoordeel**: Extra kortingen voor nieuwsbriefabonnees",
                "**Retourrecht**: 100 dagen bedenktijd op de meeste producten",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpAqua flex-shrink-0 mt-0.5" />
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
          </div>

          <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed">
            De autoship-service is ideaal voor producten die je regelmatig nodig hebt, zoals voer, kattenbakvulling of snacks. Je bepaalt zelf de leverfrequentie en kunt op elk moment pauzeren, wijzigen of annuleren.
          </p>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veelgestelde Vragen over Zooplus Dierenbenodigdheden
          </h2>

          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Hoelang duurt de levering bij Zooplus?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Standaard levering duurt 2-4 werkdagen na verzending. Bestellingen die voor 15:00 uur worden geplaatst, worden meestal nog dezelfde dag verzonden. Er is ook een expresbezorgingsoptie beschikbaar voor spoedeisende bestellingen, waarbij levering binnen 1-2 werkdagen mogelijk is tegen een meerprijs.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Wat zijn de verzendkosten bij Zooplus?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Verzendkosten zijn €3,99 voor bestellingen onder €49. Vanaf €49 is de verzending gratis naar alle adressen in Nederland. Voor expreslevering betaal je een toeslag van €6,99, ongeacht het bestelbedrag. Dit maakt het voordeliger om je aankopen te bundelen en in één keer te bestellen.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kan ik mijn bestelling retourneren als mijn huisdier het niet leuk vindt?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, Zooplus biedt 100 dagen bedenktijd op de meeste producten (behalve voeding en hygiëneproducten die geopend zijn). Als je huisdier een product niet accepteert of als je om andere redenen niet tevreden bent, kun je het artikel retourneren voor een volledige terugbetaling of omruiling. De retourzending is gratis - je vraagt een retourlabel aan via het klantenportaal.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Wat is het verschil tussen de Autoship-service en een normale bestelling?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Met Autoship ontvang je automatisch je favoriete producten op vaste momenten (bijvoorbeeld elke 4, 6 of 8 weken) met een korting tot 5%. Je hoeft niet elke keer opnieuw te bestellen, en je kunt de levering op elk moment pauzeren, wijzigen of annuleren. Dit is vooral handig voor producten die regelmatig nodig zijn zoals voer, kattenbakvulling of trainingssnacks. Plus je bespaart geld door de korting!
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Verkoopt Zooplus ook producten voor andere huisdieren dan honden en katten?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, absoluut! Naast honden en katten biedt Zooplus ook een ruim assortiment voor knaagdieren (konijnen, cavia's, hamsters), vogels (parkieten, kanaries, papegaaien), vissen (aquariumvissen en vijvervissen), reptielen en schildpadden. Van kooien en aquaria tot speciaal voer en accessoires - ze hebben alles wat je nodig hebt voor een breed scala aan huisdieren.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Zijn de producten bij Zooplus van goede kwaliteit?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Zooplus verkoopt zowel gerenommeerde premium merken (zoals Royal Canin, Hill's, Ruffwear, Hunter) als hun eigen huismerken (Zooplus Exclusive, Concept for Life). De kwaliteit wordt streng gecontroleerd en voldoet aan Europese veiligheidsnormen. Klantreviews en ratings bij elk product helpen je om weloverwogen keuzes te maken. Bovendien kunnen producten die niet voldoen binnen 100 dagen geretourneerd worden.
              </div>
            </details>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-3xl p-8 md:p-12 shadow-xl text-center">
          <div className="max-w-2xl mx-auto">
            <Heart className="h-12 w-12 text-white mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Bestel Vandaag Nog bij Zooplus
            </h2>
            <p className="text-white/90 mb-6 text-lg">
              Ontdek meer dan 8.000 dierenbenodigdheden voor honden, katten en andere huisdieren. Gratis verzending vanaf €49, snelle levering en 100 dagen retourrecht. Geef jouw huisdier het beste!
            </p>
            <a
              href="https://go.cutiepawspedia.com/zooplus.nl"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-block bg-white text-cpCoral rounded-xl px-8 py-4 hover:-translate-y-1 transition-transform font-bold shadow-lg text-lg"
            >
              Bekijk het assortiment bij Zooplus →
            </a>
          </div>
        </section>

        {/* Schema.org Article Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "Dierenbenodigdheden bij Zooplus: Alles voor Jouw Huisdier",
              "description": "Bestel alle dierenbenodigdheden online bij Zooplus.nl. Van halsbanden tot krabpalen - alles voor jouw hond of kat met snelle levering en scherpe prijzen.",
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
                "@id": "https://cutiepawspedia.com/nl/gids/dierenwinkel/dierenbenodigdheden-zooplus"
              }
            })
          }}
        />
      </article>
    </div>
    </>
  );
}
