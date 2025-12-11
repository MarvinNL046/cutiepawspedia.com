/**
 * Blog Post: Kat plast buiten de bak: oorzaken en oplossingen
 * Category: huisdiergedrag
 * Keywords: kat plast naast bak, kat onzindelijk, kat markeren
 */

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Kat Plast Buiten de Bak: Oorzaken & Oplossingen | CutiePawsPedia",
  description: "Waarom plast jouw kat buiten de kattenbak? Ontdek de 7 meest voorkomende oorzaken en effectieve oplossingen om dit gedrag te stoppen.",
  openGraph: {
    title: "Kat Plast Buiten de Bak: Oorzaken & Oplossingen",
    description: "Waarom plast jouw kat buiten de kattenbak? Ontdek de 7 meest voorkomende oorzaken en effectieve oplossingen.",
    type: "article",
    images: ["https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&h=630&fit=crop"],
  },
};

export default function BlogPost() {
  const publishDate = "11 december 2024";
  const readingTime = 10;
  const photographerName = "Jae Park";
  const photographerUrl = "https://unsplash.com/@jaehunpark";

  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Back Link */}
      <div className="container mx-auto max-w-6xl px-4 pt-8">
        <Link
          href="/nl/blog"
          className="inline-flex items-center gap-2 text-muted-foreground dark:text-cpCream/70 hover:text-cpCoral dark:hover:text-cpCoral transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Terug naar blog
        </Link>
      </div>

      {/* Article Header */}
      <header className="container mx-auto max-w-6xl px-4 py-8">
        {/* Category */}
        <span className="inline-block px-3 py-1 bg-cpCoral/10 dark:bg-cpCoral/20 text-cpCoral text-sm font-medium rounded-full mb-4">
          Huisdiergedrag
        </span>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-6 leading-tight max-w-4xl">
          Kat Plast Buiten de Bak: Oorzaken en Oplossingen
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 text-muted-foreground dark:text-cpCream/60 mb-4">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {publishDate}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {readingTime} min leestijd
          </span>
        </div>
      </header>

      {/* Featured Image with Photo Credit */}
      <div className="container mx-auto max-w-6xl px-4 mb-8">
        <div className="relative aspect-video rounded-3xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&h=800&fit=crop"
            alt="Kat zit bij kattenbak en kijkt nieuwsgierig"
            fill
            className="object-cover"
            priority
          />
          {/* Photo Credit Overlay */}
          <a
            href={photographerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 right-3 flex items-center gap-1.5 text-white/80 text-xs bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5 hover:bg-black/60 hover:text-white transition-all"
          >
            <span>📷</span>
            <span>{photographerName}</span>
            <span className="opacity-50">•</span>
            <span className="opacity-75">Unsplash</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Article Content - Main Column */}
          <article className="flex-1 min-w-0">
            <div className="bg-card dark:bg-cpSurface/30 rounded-3xl p-6 md:p-10 border border-border dark:border-cpAmber/10">
              {/* Excerpt */}
              <p className="text-lg text-foreground dark:text-cpCream font-medium mb-6 pb-6 border-b border-border dark:border-cpAmber/10">
                Een kat die buiten de kattenbak plast is een van de meest frustrerende problemen voor katteneigenaren. Maar voordat je boos wordt, is het belangrijk om te begrijpen dat je kat dit niet doet om je te pesten. Er is altijd een reden – of het nu medisch, gedragsmatig of omgevingsgerelateerd is.
              </p>

              {/* Main Content */}
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <h2 id="heading-verschil-plassen-markeren" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Verschil Tussen Plassen en Markeren
                </h2>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Eerst is het belangrijk om het verschil te kennen tussen onzindelijk zijn en markeren:
                </p>

                <h3 id="heading-onzindelijk-plassen" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Onzindelijk Plassen
                </h3>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Kat hurkt op horizontaal oppervlak (vloer, bed, bank)</li>
                  <li>Grotere hoeveelheid urine</li>
                  <li>Meestal op zachte oppervlakken</li>
                  <li>Geen specifiek patroon</li>
                </ul>

                <h3 id="heading-markeergedrag" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Markeergedrag
                </h3>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Kat staat rechtop en spuit op verticaal oppervlak (muren, meubels)</li>
                  <li>Kleinere hoeveelheid urine</li>
                  <li>Vaak bij ramen, deuren of nieuwe voorwerpen</li>
                  <li>Trillende staart tijdens het spuiten</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Het is cruciaal om dit onderscheid te maken, omdat de oplossingen verschillen. In dit artikel richten we ons vooral op onzindelijk plassen.
                </p>

                {/* Ad 1 */}
                <div className="my-8 p-6 bg-cpAmber/5 dark:bg-cpAmber/10 border-2 border-dashed border-cpAmber/30 dark:border-cpAmber/40 rounded-2xl text-center">
                  <p className="text-sm text-muted-foreground dark:text-cpCream/60 mb-2">Advertentie</p>
                  <p className="text-cpCoral font-medium">🐱 Premium kattenbakken met geurcontrole</p>
                </div>

                <h2 id="heading-medische-oorzaken" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Medische Oorzaken: Stap 1 is Altijd de Dierenarts
                </h2>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong className="text-cpCoral">BELANGRIJK:</strong> Ga altijd eerst naar de dierenarts! Veel medische problemen kunnen leiden tot onzindelijkheid:
                </p>

                <h3 id="heading-urineweginfectie" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  1. Urineweginfectie (UTI)
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Symptomen:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Vaak kleine beetjes plassen</li>
                  <li>Moeite met plassen of pijn tijdens plassen</li>
                  <li>Bloed in de urine</li>
                  <li>Veel likken van de genitaliën</li>
                </ul>

                <h3 id="heading-blaasgruis" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  2. Blaasgruis of Blaasstenen
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Kristallen of stenen in de blaas kunnen zeer pijnlijk zijn. Je kat associeert de pijn met de kattenbak en mijdt deze daarom.
                </p>

                <h3 id="heading-nierziekte" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  3. Nierziekte
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Vooral bij oudere katten. Nierziekte leidt tot meer urine produceren, waardoor je kat het niet op tijd naar de bak haalt.
                </p>

                <h3 id="heading-diabetes" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  4. Diabetes
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Leidt tot overmatige dorst en plassen. Combinatie van meer drinken en meer plassen kan leiden tot ongelukjes.
                </p>

                <h3 id="heading-artritis" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  5. Artritis of Gewrichtspijn
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Oudere katten met gewrichtspijn vinden het moeilijk om in/uit de bak te klimmen, vooral als de rand hoog is.
                </p>

                {/* Ad 2 */}
                <div className="my-8 p-6 bg-cpAmber/5 dark:bg-cpAmber/10 border-2 border-dashed border-cpAmber/30 dark:border-cpAmber/40 rounded-2xl text-center">
                  <p className="text-sm text-muted-foreground dark:text-cpCream/60 mb-2">Advertentie</p>
                  <p className="text-cpCoral font-medium">🏥 Dierenartscontrole? Vind een specialist bij jou in de buurt</p>
                </div>

                <h2 id="heading-gedragsoorzaken" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Gedragsmatige Oorzaken
                </h2>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Als de dierenarts medische problemen heeft uitgesloten, zijn dit de meest voorkomende gedragsmatige oorzaken:
                </p>

                <h3 id="heading-vieze-bak" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  1. Vieze Kattenbak
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Katten zijn extreem schoon. Een bak die jij "nog wel oké" vindt, kan voor je kat al te vies zijn.
                </p>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Oplossing:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Schep minimaal 2x per dag de bak</li>
                  <li>Ververs het grit volledig elke week</li>
                  <li>Was de bak maandelijks met milde zeep</li>
                  <li>Gebruik genoeg grit (7-10 cm diep)</li>
                </ul>

                <h3 id="heading-verkeerde-locatie" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  2. Verkeerde Locatie van de Bak
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Katten willen privacy, maar ook veiligheid. Een bak op een drukke plek of in een "val" (hoek zonder ontsnappingsroute) wordt gemeden.
                </p>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Oplossing:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Plaats de bak op een rustige, toegankelijke plek</li>
                  <li>Niet naast de voerbak (katten willen scheiden)</li>
                  <li>Niet in een doodlopende hoek</li>
                  <li>Bij meerdere verdiepingen: bak per verdieping</li>
                </ul>

                <h3 id="heading-te-weinig-bakken" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  3. Te Weinig Kattenbakken
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  De gouden regel: <strong>Aantal katten + 1 = aantal bakken</strong>
                </p>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Dus bij 2 katten heb je minimaal 3 bakken nodig. Sommige katten willen niet naar een bak die al gebruikt is door een andere kat.
                </p>

                <h3 id="heading-verkeerde-bak-type" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  4. Verkeerde Type Kattenbak
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Gesloten bakken:</strong> Vangen geuren op. Wat voor jou handig is (geen geur in huis), is voor je kat juist vies.
                </p>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Te kleine bakken:</strong> Je kat moet makkelijk kunnen draaien en graven.
                </p>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Oplossing:</strong> Probeer een grote, open bak. Veel katten prefereren dit.
                </p>

                <h3 id="heading-verkeerd-grit" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  5. Verkeerd Type Grit
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Katten kunnen kieskeurig zijn over de textuur van het grit. Geparfumeerd grit kan te overweldigend zijn voor hun gevoelige neus.
                </p>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Oplossing:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Gebruik ongeparfumeerd, klontvormd grit</li>
                  <li>Fijn grit (lijkt op zand) wordt vaak geprefereerd</li>
                  <li>Bij verandering van merk: geleidelijk overstappen</li>
                </ul>

                {/* Ad 3 */}
                <div className="my-8 p-6 bg-cpAmber/5 dark:bg-cpAmber/10 border-2 border-dashed border-cpAmber/30 dark:border-cpAmber/40 rounded-2xl text-center">
                  <p className="text-sm text-muted-foreground dark:text-cpCream/60 mb-2">Advertentie</p>
                  <p className="text-cpCoral font-medium">🧹 Beste kattengrit 2024: onze top 5 vergelijking</p>
                </div>

                <h3 id="heading-stress-angst" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  6. Stress en Angst
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Veranderingen in het huishouden kunnen stress veroorzaken:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Verhuizing of verbouwing</li>
                  <li>Nieuw huisdier of gezinslid</li>
                  <li>Verandering in routine</li>
                  <li>Conflict met andere katten</li>
                  <li>Luide geluiden (vuurwerk, bouw)</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Oplossing:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Gebruik Feliway (synthetische kattenferomonen)</li>
                  <li>Creëer veilige, rustige plekken</li>
                  <li>Houd routine zo stabiel mogelijk</li>
                  <li>Overweeg gedragstherapie bij ernstige stress</li>
                </ul>

                <h2 id="heading-stap-voor-stap-plan" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Stap-voor-Stap Actieplan
                </h2>

                <h3 id="heading-stap-1" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Stap 1: Dierenarts (Binnen 48 Uur)
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Maak een afspraak voor een volledige check-up inclusief urineonderzoek. Sluit medische oorzaken uit voordat je aan gedragsverandering begint.
                </p>

                <h3 id="heading-stap-2" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Stap 2: Grondige Reiniging
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Reinig alle plekken waar je kat heeft geplast met een enzymreiniger. Normale schoonmaakmiddelen verwijderen de geur niet voor de gevoelige neus van je kat.
                </p>

                <h3 id="heading-stap-3" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Stap 3: Optimaliseer de Kattenbak Situatie
                </h3>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Voeg extra bakken toe (n+1 regel)</li>
                  <li>Vervang grit volledig</li>
                  <li>Overweeg grotere, open bakken</li>
                  <li>Verplaats bakken naar rustigere locaties</li>
                  <li>Schep minimaal 2x per dag</li>
                </ul>

                <h3 id="heading-stap-4" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Stap 4: Maak "Probleemplekken" Onaantrekkelijk
                </h3>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Bedek plekken tijdelijk met aluminiumfolie of plastic</li>
                  <li>Plaats voerbakjes op plekken waar geplast wordt (katten plassen niet bij voer)</li>
                  <li>Gebruik citrusgeur (katten vinden dit onaangenaam)</li>
                </ul>

                <h3 id="heading-stap-5" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Stap 5: Positieve Bekrachtiging
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Beloon je kat uitbundig wanneer hij/zij de bak gebruikt. Gebruik snoepjes, aandacht of spel. Straf NOOIT – dit verergert het probleem alleen maar.
                </p>

                <h2 id="heading-wanneer-specialist" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Wanneer een Gedragsspecialist Inschakelen?
                </h2>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Overweeg professionele hulp als:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Het probleem na 4-6 weken niet verbetert</li>
                  <li>Het probleem verergert</li>
                  <li>Je meerdere katten hebt en niet weet welke het doet</li>
                  <li>Er sprake is van markeergedrag in plaats van onzindelijkheid</li>
                  <li>Je uitgeput raakt en je relatie met je kat lijdt</li>
                </ul>

                <h2 id="heading-preventie" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Preventie: Voorkomen is Beter dan Genezen
                </h2>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Houd de kattenbak altijd schoon</li>
                  <li>Jaarlijkse controles bij de dierenarts</li>
                  <li>Genoeg bakken voor alle katten</li>
                  <li>Stressvolle situaties minimaliseren</li>
                  <li>Let op vroege signalen van ongemak</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Vergeet niet: een kat die buiten de bak plast is niet stout – hij probeert je iets te vertellen. Met geduld, begrip en de juiste aanpak los je dit probleem op.
                </p>
              </div>

              {/* FAQ Section */}
              <div className="mt-12 pt-8 border-t border-border dark:border-cpAmber/10">
                <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">
                  Veelgestelde Vragen
                </h2>

                <div className="space-y-4">
                  <details className="group bg-secondary/50 dark:bg-cpSurface/50 rounded-xl p-4">
                    <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer list-none flex justify-between items-center">
                      Waarom plast mijn kat opeens op mijn bed?
                      <span className="text-cpCoral">+</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                      Dit kan verschillende oorzaken hebben: stress, een vieze kattenbak, of een medisch probleem. Je bed ruikt sterk naar jou, wat troostend kan zijn voor een stressvolle kat. Start met een dierenarts bezoek en zorg dat de kattenbak optimaal is.
                    </p>
                  </details>

                  <details className="group bg-secondary/50 dark:bg-cpSurface/50 rounded-xl p-4">
                    <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer list-none flex justify-between items-center">
                      Hoe verwijder ik de geur van kattenurine?
                      <span className="text-cpCoral">+</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                      Gebruik een enzymreiniger speciaal voor huisdiergeur (bijv. Simple Solution, Biodor). Deze breken de urinezuren af die geur veroorzaken. Normale schoonmaakmiddelen of parfums maskeren alleen de geur tijdelijk. Dep nooit – dit duwt de urine dieper in het materiaal.
                    </p>
                  </details>

                  <details className="group bg-secondary/50 dark:bg-cpSurface/50 rounded-xl p-4">
                    <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer list-none flex justify-between items-center">
                      Moet ik mijn kat straffen als hij buiten de bak plast?
                      <span className="text-cpCoral">+</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                      NEE! Straffen maakt het alleen maar erger. Je kat begrijpt niet waarom hij gestraft wordt en raakt alleen maar meer gestrest. Dit kan leiden tot meer onzindelijkheid en een beschadigde band tussen jullie. Focus op het vinden en oplossen van de onderliggende oorzaak.
                    </p>
                  </details>

                  <details className="group bg-secondary/50 dark:bg-cpSurface/50 rounded-xl p-4">
                    <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer list-none flex justify-between items-center">
                      Hoe lang duurt het voordat het probleem is opgelost?
                      <span className="text-cpCoral">+</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                      Dit hangt af van de oorzaak. Bij een medisch probleem zie je vaak verbetering binnen dagen na behandeling. Bij gedragsproblemen kan het 2-6 weken duren. Wees geduldig en consistent. Sommige gevallen vereisen langere aanpassing of professionele hulp.
                    </p>
                  </details>

                  <details className="group bg-secondary/50 dark:bg-cpSurface/50 rounded-xl p-4">
                    <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer list-none flex justify-between items-center">
                      Kan een gecastreerde/gesteriliseerde kat nog steeds markeren?
                      <span className="text-cpCoral">+</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                      Ja, hoewel markeren veel minder voorkomt bij gecastreerde/gesteriliseerde katten. Stress, territoriumconflicten, of medische problemen kunnen nog steeds markeergedrag veroorzaken. Als je kat markeert (spuiten op verticale oppervlakken), is vaak een andere aanpak nodig dan bij onzindelijkheid.
                    </p>
                  </details>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Tag className="w-4 h-4 text-muted-foreground dark:text-cpCream/60" />
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                kat plast naast bak
              </span>
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                kat onzindelijk
              </span>
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                kat markeren
              </span>
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                kattengedrag
              </span>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-20 space-y-6">
              {/* Related Articles */}
              <div className="bg-card dark:bg-cpSurface/30 rounded-2xl p-6 border border-border dark:border-cpAmber/10">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-4">
                  Gerelateerde Artikelen
                </h3>
                <div className="space-y-3">
                  <Link
                    href="/nl/gids/huisdiergedrag/katten"
                    className="block text-sm text-cpCoral hover:underline"
                  >
                    → Kattengedrag Begrijpen
                  </Link>
                  <Link
                    href="/nl/gids/kattenverzorging/gezondheid"
                    className="block text-sm text-cpCoral hover:underline"
                  >
                    → Kattengezondheid Gids
                  </Link>
                  <Link
                    href="/nl/gids/kattenverzorging/stress"
                    className="block text-sm text-cpCoral hover:underline"
                  >
                    → Stress bij Katten Herkennen
                  </Link>
                </div>
              </div>

              {/* Sidebar Ad */}
              <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/10 dark:from-cpCoral/20 dark:to-cpAmber/20 rounded-2xl p-6 border-2 border-dashed border-cpCoral/30 dark:border-cpCoral/40">
                <p className="text-xs text-muted-foreground dark:text-cpCream/60 mb-2">
                  Advertentie
                </p>
                <p className="font-bold text-foreground dark:text-cpCream mb-2">
                  Kattenbak Problemen?
                </p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Enzymreinigers • Feliway • Expert advies
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Kat Plast Buiten de Bak: Oorzaken en Oplossingen",
            description: "Waarom plast jouw kat buiten de kattenbak? Ontdek de 7 meest voorkomende oorzaken en effectieve oplossingen om dit gedrag te stoppen.",
            image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&h=630&fit=crop",
            datePublished: "2024-12-11",
            author: {
              "@type": "Organization",
              name: "CutiePawsPedia",
            },
          }),
        }}
      />
    </div>
  );
}
