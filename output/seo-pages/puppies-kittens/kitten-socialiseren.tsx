import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Kitten Socialiseren: Tips voor een Sociale Kat | Gids 2024",
  description: "Leer hoe je je kitten socialiseert voor een zelfverzekerde, sociale kat. Tips voor wennen aan mensen, geluiden en situaties. Vind kattenservices bij jou in de buurt.",
  keywords: "kitten socialiseren, kitten opvoeden, kitten gedrag, sociale kat, kitten wennen",
  openGraph: {
    title: "Kitten Socialiseren: Complete Gids voor een Sociale Kat",
    description: "Praktische tips om je kitten te socialiseren en op te voeden tot een zelfverzekerde, sociale kat.",
  },
};

export default function KittenSocialiserenPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-cpPink/10 via-cpAqua/10 to-cpYellow/10">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpPink/10 border border-cpPink/30 text-cpPink text-sm font-medium mb-6">
              <span>🐱</span>
              Socialisatie Gids
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
              Kitten Socialiseren: Tips voor een Sociale Kat
            </h1>
            <p className="text-xl text-muted-foreground dark:text-cpCream/80 mb-8">
              De eerste maanden zijn cruciaal voor de ontwikkeling van je kitten. Ontdek hoe je je kitten socialiseert voor een zelfverzekerde, sociale kat die zich prettig voelt in verschillende situaties.
            </p>
          </div>

          {/* Primary CTA */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl shadow-md p-6 border border-cpPink/20">
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground dark:text-cpCream mb-4">
                Zoek je professionele hulp bij gedragsproblemen?
              </p>
              <Button
                asChild
                className="bg-cpPink text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
              >
                <Link href="/nl/nederland">Vind gedragsdeskundigen bij jou in de buurt →</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-16">
        {/* Schema.org Article Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Kitten Socialiseren: Tips voor een Sociale Kat",
              description: "Complete gids voor het socialiseren van kittens, inclusief tijdlijn, technieken en veelgemaakte fouten.",
              author: {
                "@type": "Organization",
                name: "CutiePawsPedia",
              },
              datePublished: "2024-01-01",
              dateModified: new Date().toISOString(),
            }),
          }}
        />

        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <div className="bg-cpAqua/10 border-l-4 border-cpAqua rounded-r-xl p-6 mb-12">
            <p className="text-lg text-foreground dark:text-cpCream m-0">
              Socialisatie is het proces waarbij je kitten leert omgaan met mensen, dieren, geluiden en situaties.
              Een goed gesocialiseerde kat is zelfverzekerd, ontspannen en makkelijk in de omgang. De <strong>kritieke
              periode is tussen 2 en 7 weken</strong>, maar socialisatie blijft belangrijk tot ongeveer 14 weken.
            </p>
          </div>

          {/* Section 1: Waarom socialiseren? */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Waarom Is Socialisatie Zo Belangrijk?
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              De eerste weken en maanden van een kittens leven bepalen voor een groot deel hoe het later reageert op
              nieuwe situaties. Een goed gesocialiseerd kitten:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6">
              <li>Is <strong>minder angstig</strong> voor nieuwe mensen, dieren en situaties</li>
              <li>Kan beter <strong>omgaan met stress</strong> (dierenarts, verhuizing, vakantie)</li>
              <li>Is <strong>vriendelijker en socialer</strong> naar mensen en andere huisdieren</li>
              <li>Heeft <strong>minder gedragsproblemen</strong> zoals agressie of angst</li>
              <li>Is <strong>makkelijker te verzorgen</strong> (nagels knippen, borstelen, medicijnen geven)</li>
            </ul>

            <div className="bg-cpYellow/10 rounded-xl p-6 border border-cpYellow/30 mb-6">
              <p className="font-semibold text-cpYellow mb-2">💡 Kritieke Socialisatieperiode</p>
              <p className="text-sm text-foreground dark:text-cpCream/80 m-0">
                Tussen <strong>2-7 weken</strong> is de belangrijkste periode. Daarna blijft socialisatie belangrijk tot
                ongeveer 14 weken. Wat een kitten niet meemaakt in deze periode, kan later angst opwekken.
              </p>
            </div>
          </section>

          {/* Section 2: Socialisatie tijdlijn */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Socialisatie Tijdlijn
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
              Kittens ontwikkelen zich snel. Hier is wat je kunt verwachten en waar je op moet focussen in elke fase:
            </p>

            <div className="space-y-6">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border-l-4 border-cpPink">
                <h3 className="text-xl font-bold text-cpPink mb-3">0-2 Weken: Neonatale Periode</h3>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                  Kittens zijn blind en doof, volledig afhankelijk van moeder. Deze periode doorbrengt het kitten bij de fokker.
                </p>
                <p className="text-sm text-foreground dark:text-cpCream/80 italic">
                  Jij: Nog geen rol. Kitten is bij moeder en fokker.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border-l-4 border-cpAqua">
                <h3 className="text-xl font-bold text-cpAqua mb-3">2-7 Weken: Primaire Socialisatie</h3>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                  <strong>Meest kritieke periode!</strong> Kittens leren omgaan met mensen, andere katten en hun omgeving.
                  Ogen en oren openen, ze beginnen te spelen en te verkennen.
                </p>
                <p className="text-sm font-semibold text-foreground dark:text-cpCream mb-2">Fokker's rol:</p>
                <ul className="text-sm text-muted-foreground dark:text-cpCream/80 list-disc list-inside space-y-1 mb-3">
                  <li>Dagelijks zachtjes aanraken en optillen (vanaf week 2)</li>
                  <li>Kittens laten wennen aan verschillende mensen (jong/oud, man/vrouw)</li>
                  <li>Blootstellen aan huishoudgeluiden (stofzuiger, tv, deurbel)</li>
                  <li>Spelen met nestgenoten voor sociale vaardigheden</li>
                </ul>
                <p className="text-sm text-foreground dark:text-cpCream/80 italic">
                  Jij: Kies een fokker die dit serieus neemt! Vraag ernaar bij bezoek.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border-l-4 border-cpYellow">
                <h3 className="text-xl font-bold text-cpYellow mb-3">7-12 Weken: Secundaire Socialisatie</h3>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                  <strong>Jouw belangrijkste periode!</strong> Vanaf week 8-12 komt het kitten naar jou. Nu is het moment
                  om hem kennis te laten maken met de grote wereld.
                </p>
                <p className="text-sm font-semibold text-foreground dark:text-cpCream mb-2">Jouw rol:</p>
                <ul className="text-sm text-muted-foreground dark:text-cpCream/80 list-disc list-inside space-y-1">
                  <li>Dagelijks positief contact met verschillende mensen</li>
                  <li>Blootstelling aan huishoudgeluiden en situaties</li>
                  <li>Voorzichtig wennen aan huisdieren (indien aanwezig)</li>
                  <li>Spelen en positieve ervaringen creëren</li>
                  <li>Begin met verzorging (borstelen, pootjes aanraken)</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border-l-4 border-cpPink">
                <h3 className="text-xl font-bold text-cpPink mb-3">12-14 Weken: Laatste Socialisatie Window</h3>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                  De kritieke periode sluit zich. Alles wat je nu nog kunt laten zien, helpt later.
                </p>
                <ul className="text-sm text-muted-foreground dark:text-cpCream/80 list-disc list-inside space-y-1">
                  <li>Blijf positieve ervaringen creëren</li>
                  <li>Oefen dierenarts-simulaties (in reismand, pootjes bekijken)</li>
                  <li>Laat verschillende bezoekers kennismaken</li>
                  <li>Begin met nagels knippen en tandenpoetsen</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3: Praktische socialisatie tips */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Praktische Socialisatie Tips
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
              Socialisatie hoeft niet moeilijk te zijn. Het gaat om <strong>positieve ervaringen</strong> in kleine stapjes.
              Hier zijn concrete tips:
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-4">
                  1. Wennen Aan Mensen
                </h3>
                <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20 mb-4">
                  <p className="font-semibold text-cpPink mb-3">Wat te doen:</p>
                  <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                    <li>• Laat <strong>verschillende mensen</strong> kennismaken (kinderen, mannen, vrouwen, ouderen)</li>
                    <li>• Vraag bezoekers rustig te blijven, laat kitten naar hen toe komen</li>
                    <li>• Geef bezoekers <strong>traktaties</strong> om aan kitten te geven</li>
                    <li>• Laat mensen met verschillende stemmen en geuren (parfum, sigaret) kennis maken</li>
                    <li>• Zorg voor <strong>positieve associaties</strong>: bezoeker = leuk = snack</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-4">
                  2. Wennen Aan Geluiden
                </h3>
                <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20 mb-4">
                  <p className="font-semibold text-cpPink mb-3">Wat te doen:</p>
                  <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                    <li>• Begin met <strong>zacht volume</strong>, bouw langzaam op</li>
                    <li>• Stofzuiger, föhn, blender, wasmachine - laat hem wennen terwijl jij rustig blijft</li>
                    <li>• Speel <strong>opname van geluiden</strong> (onweer, vuurwerk, bel) op lage volume</li>
                    <li>• Geef <strong>traktaties tijdens geluiden</strong> voor positieve associatie</li>
                    <li>• Let op tekenen van angst - als hij bang is, ga een stap terug</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-4">
                  3. Wennen Aan Aanraken en Verzorging
                </h3>
                <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20 mb-4">
                  <p className="font-semibold text-cpPink mb-3">Wat te doen:</p>
                  <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                    <li>• Raak <strong>dagelijks pootjes, oren, staart en buik</strong> aan (zachtjes!)</li>
                    <li>• Oefen <strong>mond openen</strong> (voor tandenpoetsen en medicijnen later)</li>
                    <li>• Laat hem wennen aan <strong>borstelen</strong> (start met zachte borstel, korte sessies)</li>
                    <li>• Raak <strong>nagels aan</strong> en oefen met nagelknipper (eerst alleen aanraken, later knippen)</li>
                    <li>• Maak alles <strong>positief</strong> met traktaties en complimentjes</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-4">
                  4. Wennen Aan Reismand en Dierenarts
                </h3>
                <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20 mb-4">
                  <p className="font-semibold text-cpPink mb-3">Wat te doen:</p>
                  <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                    <li>• Laat de <strong>reismand open staan</strong> met zacht dekentje en snacks erin</li>
                    <li>• Voer hem soms <strong>in de reismand</strong> zodat hij hem associeert met iets leuks</li>
                    <li>• Maak <strong>korte autoritjes</strong> die niet eindigen bij de dierenarts</li>
                    <li>• Oefen thuis <strong>dierenarts-handelingen</strong>: op tafel, in oren kijken, pootjes bekijken</li>
                    <li>• Bezoek dierenarts <strong>voor kennismaking</strong> zonder prik (alleen snacks en aaien)</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-4">
                  5. Wennen Aan Andere Huisdieren
                </h3>
                <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20 mb-4">
                  <p className="font-semibold text-cpPink mb-3">Wat te doen:</p>
                  <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                    <li>• Gebruik eerst <strong>geur-introductie</strong>: wissel dekentjes tussen dieren uit</li>
                    <li>• Laat ze elkaar <strong>door traliedeur zien</strong> voordat je ze laat ontmoeten</li>
                    <li>• Eerste echte ontmoeting: kitten in bench, andere dier mag kijken</li>
                    <li>• Geleidelijk meer contact, <strong>altijd onder toezicht</strong></li>
                    <li>• Geef beide dieren <strong>traktaties</strong> bij rustig gedrag rond elkaar</li>
                    <li>• Gun ieder dier <strong>eigen ruimte</strong> om terug te trekken</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Secondary CTA */}
          <div className="bg-gradient-to-br from-cpAqua/20 to-cpYellow/20 rounded-2xl shadow-md p-8 border border-cpAqua/30 mb-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-4">
                Gedragsproblemen bij je kat?
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
                Professionele kattengedragsdeskundigen kunnen helpen bij angst, agressie en andere gedragsproblemen.
              </p>
              <Button
                asChild
                className="bg-cpAqua text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
              >
                <Link href="/nl/nederland">Vind gedragsdeskundigen →</Link>
              </Button>
            </div>
          </div>

          {/* Section 4: Veelgemaakte fouten */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Veelgemaakte Fouten Bij Socialisatie
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
              Goed bedoeld is niet altijd goed gedaan. Deze fouten komen vaak voor:
            </p>

            <div className="space-y-4">
              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-xl p-6">
                <h3 className="font-bold text-red-700 dark:text-red-400 mb-2">❌ Te Snel Teveel</h3>
                <p className="text-sm text-red-600 dark:text-red-300 m-0">
                  Kittens raken snel overweldigd. Introduceer nieuwe dingen <strong>één voor één</strong>, niet allemaal
                  tegelijk. Let op signalen van stress (wegduiken, blazen, grote ogen).
                </p>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-xl p-6">
                <h3 className="font-bold text-red-700 dark:text-red-400 mb-2">❌ Angst Negeren</h3>
                <p className="text-sm text-red-600 dark:text-red-300 m-0">
                  Als je kitten bang is, forceer dan niets. Ga een stap terug, maak het makkelijker. Angst negeren of
                  "erdoorheen werken" maakt het erger.
                </p>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-xl p-6">
                <h3 className="font-bold text-red-700 dark:text-red-400 mb-2">❌ Geen Positieve Versterking</h3>
                <p className="text-sm text-red-600 dark:text-red-300 m-0">
                  Vergeet niet te <strong>belonen</strong>! Traktaties, spelen en complimentjes maken nieuwe ervaringen
                  positief. Zonder positieve associatie leert je kitten niets.
                </p>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-xl p-6">
                <h3 className="font-bold text-red-700 dark:text-red-400 mb-2">❌ Te Laat Beginnen</h3>
                <p className="text-sm text-red-600 dark:text-red-300 m-0">
                  De kritieke periode is <strong>kort</strong> (2-14 weken). Begin direct na thuiskomst! Elke dag telt.
                  Na 14 weken is socialisatie nog steeds mogelijk, maar veel moeilijker.
                </p>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-xl p-6">
                <h3 className="font-bold text-red-700 dark:text-red-400 mb-2">❌ Straffen Bij Angst</h3>
                <p className="text-sm text-red-600 dark:text-red-300 m-0">
                  Blazen, wegduiken of krabben komt uit angst. <strong>Straf dit nooit!</strong> Dit maakt je kitten
                  alleen maar banger. Gebruik beloning voor gewenst gedrag.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Socialisatie checklist */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Socialisatie Checklist
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
              Gebruik deze checklist om bij te houden waar je kitten al aan gewend is:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-cpPink mb-4">👥 Mensen</h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>□ Mannen en vrouwen</li>
                  <li>□ Kinderen (rustig en luidruchtig)</li>
                  <li>□ Ouderen</li>
                  <li>□ Mensen met baard/hoed/bril</li>
                  <li>□ Verschillende geuren en stemmen</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-cpPink mb-4">🔊 Geluiden</h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>□ Stofzuiger</li>
                  <li>□ Föhn / mixer / blender</li>
                  <li>□ Deurbel / telefoon</li>
                  <li>□ Televisie / muziek</li>
                  <li>□ Onweer / vuurwerk (opname)</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmbar/20">
                <h3 className="font-bold text-cpPink mb-4">✋ Aanraken</h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>□ Pootjes en nagels</li>
                  <li>□ Oren (in kijken)</li>
                  <li>□ Mond (tandjes bekijken)</li>
                  <li>□ Staart</li>
                  <li>□ Buik</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-cpPink mb-4">🧼 Verzorging</h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>□ Borstelen</li>
                  <li>□ Nagels knippen</li>
                  <li>□ Tandenpoetsen</li>
                  <li>□ Reismand in/uit</li>
                  <li>□ Dierenarts bezoek</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-cpPink mb-4">🏠 Situaties</h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>□ Verschillende kamers in huis</li>
                  <li>□ In de auto</li>
                  <li>□ Bezoekers thuis</li>
                  <li>□ Alleen zijn (korte periodes)</li>
                  <li>□ Andere huisdieren</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-cpPink mb-4">🎾 Objecten</h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>□ Verschillende speelgoed</li>
                  <li>□ Krabpaal</li>
                  <li>□ Verschillende ondergronden</li>
                  <li>□ Papier / plastic zakken</li>
                  <li>□ Dozen en tunnels</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Veelgestelde Vragen
            </h2>
            <div className="space-y-4">
              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Kan ik een oudere kat nog socialiseren?
                  <span className="text-cpPink group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  Ja, maar het is <strong>moeilijker en tijdrovender</strong>. De kritieke periode (2-14 weken) is het makkelijkst,
                  maar katten blijven hun hele leven leren. Gebruik <strong>positieve versterking</strong>, ga in heel kleine stapjes
                  en heb geduld. Sommige katten zullen nooit volledig sociaal worden, maar je kunt wel vooruitgang boeken.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Mijn kitten is bang voor alles, wat nu?
                  <span className="text-cpPink group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  Sommige kittens zijn van nature angstig of hebben slechte ervaringen gehad. Ga <strong>super langzaam</strong>,
                  forceer niets en gebruik veel positieve versterking. Begin met de <strong>makkelijkste dingen</strong> eerst
                  (rustige persoon, zacht geluid) en bouw heel geleidelijk op. Overweeg hulp van een kattengedragsdeskundige.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Hoelang moet ik elke dag socialiseren?
                  <span className="text-cpPink group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  Socialisatie hoeft geen uren per dag. <strong>Korte, positieve sessies</strong> werken beter dan lange. Bijvoorbeeld:
                  2-3 keer per dag 5-10 minuten oefenen met aanraken, geluiden of bezoekers. Maak het onderdeel van je dagelijkse
                  routine (tijdens voederen, spelen, knuffelen). Kwaliteit is belangrijker dan kwantiteit.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Mijn kitten blaast naar nieuwe mensen, is dat normaal?
                  <span className="text-cpPink group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  Blazen komt uit <strong>angst of onzekerheid</strong>. Het is een waarschuwing: "blijf uit mijn buurt!". Dit is
                  normaal bij kittens die nog niet goed gesocialiseerd zijn. <strong>Forceer niets</strong>. Laat bezoekers het kitten
                  negeren, geef hem ruimte en tijd. Gebruik traktaties om positieve associaties te creëren. Als het blijft, zoek dan
                  hulp van een gedragsdeskundige.
                </div>
              </details>
            </div>
          </section>

          {/* Related Articles */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Lees Ook
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/nl/puppies-kittens/kitten-aanschaffen"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20 hover:border-cpPink/40 transition-all group"
              >
                <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpPink mb-2">
                  Kitten aanschaffen →
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Complete checklist en voorbereiding voor het aanschaffen van een kitten.
                </p>
              </Link>
              <Link
                href="/nl/puppies-kittens/eerste-week-puppy"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20 hover:border-cpPink/40 transition-all group"
              >
                <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpPink mb-2">
                  Eerste week met puppy →
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Dag-voor-dag gids voor de eerste zeven dagen met je nieuwe puppy thuis.
                </p>
              </Link>
            </div>
          </section>

          {/* Tertiary CTA */}
          <div className="bg-gradient-to-br from-cpPink/10 to-cpAqua/10 rounded-2xl shadow-md p-8 border border-cpPink/30 text-center">
            <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-4">
              Zoek je professionele kattenservices?
            </h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
              Vind dierenartsen, kattenpensions, gedragsdeskundigen en meer bij jou in de buurt.
            </p>
            <Button
              asChild
              className="bg-cpPink text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
            >
              <Link href="/nl/nederland">Ontdek alle huisdierservices →</Link>
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}
