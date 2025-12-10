import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Puppy-Proofing: Je Huis Veilig Maken voor een Puppy 2024",
  description: "Maak je huis veilig voor je nieuwe puppy met deze complete puppy-proofing checklist. Voorkom gevaren en ongelukken. Vind hondenservices bij jou in de buurt.",
  keywords: "puppy proof huis, huis veilig maken puppy, puppy gevaren, puppy voorbereiding, huis kindklaar",
  openGraph: {
    title: "Puppy-Proofing: Complete Gids om Je Huis Veilig te Maken",
    description: "Praktische checklist om je huis puppy-proof te maken en gevaren te voorkomen.",
  },
};

export default function PuppyProofHuisPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-cpAqua/10 via-cpPink/10 to-cpYellow/10">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpAqua/10 border border-cpAqua/30 text-cpAqua text-sm font-medium mb-6">
              <span>🏠</span>
              Veiligheid Checklist
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
              Puppy-Proofing: Je Huis Veilig Maken
            </h1>
            <p className="text-xl text-muted-foreground dark:text-cpCream/80 mb-8">
              Puppy's zijn nieuwsgierig en kauwen op alles. Voorkom ongelukken en schade door je huis puppy-proof te maken
              met deze complete kamer-voor-kamer checklist.
            </p>
          </div>

          {/* Primary CTA */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl shadow-md p-6 border border-cpAqua/20">
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground dark:text-cpCream mb-4">
                Puppy bijna thuis? Schrijf je in voor een puppycursus!
              </p>
              <Button
                asChild
                className="bg-cpAqua text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
              >
                <Link href="/nl/netherlands">Vind hondentrainers bij jou in de buurt →</Link>
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
              headline: "Puppy-Proofing: Je Huis Veilig Maken voor een Puppy",
              description: "Complete gids om je huis puppy-proof te maken, inclusief kamer-voor-kamer checklist en veelvoorkomende gevaren.",
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
          <div className="bg-cpYellow/10 border-l-4 border-cpYellow rounded-r-xl p-6 mb-12">
            <p className="text-lg text-foreground dark:text-cpCream m-0">
              Een puppy ziet je huis als één grote speeltuin vol interessante dingen om te verkennen, kauwen en in te klimmen.
              Wat voor jou veilig lijkt, kan levensgevaarlijk zijn voor een nieuwsgierige pup. Deze gids helpt je alle gevaren
              te spotten en je huis puppy-proof te maken.
            </p>
          </div>

          {/* Section 1: Waarom puppy-proofing? */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Waarom Is Puppy-Proofing Zo Belangrijk?
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              Puppy's hebben geen besef van gevaar. Ze verkennen alles met hun bek, klimmen overal op en passen in de
              kleinste ruimtes. Zonder puppy-proofing risico's:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6">
              <li><strong>Vergiftiging</strong> - Schoonmaakmiddelen, planten, chocolade, medicijnen</li>
              <li><strong>Verstikking</strong> - Kleine voorwerpen, plastic zakken, touwen</li>
              <li><strong>Elektrische schok</strong> - Kauwen op kabels en stekkers</li>
              <li><strong>Vallen</strong> - Van trappen, balkon, uit ramen</li>
              <li><strong>Verstopping</strong> - Sokken, speelgoed, botjes</li>
            </ul>

            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-xl p-6 mb-6">
              <p className="font-bold text-red-700 dark:text-red-400 mb-2">⚠️ Eerste Hulp Bij Honden</p>
              <p className="text-sm text-red-600 dark:text-red-300 m-0">
                Bewaar het <strong>telefoonnummer van je dierenarts en de dierenambuance</strong> bij de hand.
                Bij vergiftiging: bel DIRECT, laat NIET overgeven zonder overleg, en neem verpakking mee naar dierenarts.
              </p>
            </div>
          </section>

          {/* Section 2: Algemene puppy-proofing tips */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Algemene Puppy-Proofing Principes
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
              Voordat we kamer voor kamer gaan, hier zijn de <strong>gouden regels</strong> voor het hele huis:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-cpPink mb-4">1. Denk als een Puppy 🐶</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Ga op handen en knieën door je huis. Wat zie je? Wat kun je bereiken? Dit helpt je gevaren te spotten
                  die je staand niet ziet.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-cpPink mb-4">2. Alles Kan Kauwen 🦷</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Puppy's kauwen op kabels, schoenen, meubelpoten, planten - alles. Verwacht dit en bescherm je spullen.
                  Geef genoeg kauwtjes als alternatief.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-cpPink mb-4">3. Veilige Zone Maken 🚪</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Beperk toegang tot bepaalde kamers met babyhekjes. Je hoeft niet het hele huis puppy-proof te maken
                  als hij alleen in bepaalde ruimtes komt.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-cpPink mb-4">4. Toezicht is Cruciaal 👀</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Puppy-proofing is geen vervanging voor toezicht! Laat je puppy nooit lang zonder toezicht rondlopen,
                  zeker niet in de eerste maanden.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Kamer voor kamer checklist */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Kamer-voor-Kamer Checklist
            </h2>

            {/* Woonkamer */}
            <div className="mb-10">
              <div className="bg-gradient-to-r from-cpPink/20 to-cpYellow/20 rounded-xl p-6 mb-6">
                <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-2">
                  🛋️ Woonkamer
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 italic m-0">
                  Waar de meeste tijd wordt doorgebracht
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20 mb-4">
                <h4 className="font-bold text-cpAqua mb-3">✅ Te Doen:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>□ <strong>Kabels beveiligen</strong> - Gebruik kabelgoten of bitter spray tegen kauwen</li>
                  <li>□ <strong>Planten verplaatsen</strong> - Veel planten zijn giftig (zie lijst hieronder)</li>
                  <li>□ <strong>Kleine voorwerpen opruimen</strong> - Afstandsbedieningen, brillen, sieraden uit bereik</li>
                  <li>□ <strong>Meubelpoten beschermen</strong> - Met bitter spray of beschermhoezen</li>
                  <li>□ <strong>Gordijnkoorden ophangen</strong> - Verstikkingsgevaar en speelverleiding</li>
                  <li>□ <strong>Prullenbak met deksel</strong> - Of in kast, puppy's eten alles uit de prullenbak</li>
                  <li>□ <strong>Schoenen opbergen</strong> - In kast, niet op de grond</li>
                  <li>□ <strong>Boeken uit bereik</strong> - Onderkant boekenplanken = kauwmateriaal</li>
                </ul>
              </div>
            </div>

            {/* Keuken */}
            <div className="mb-10">
              <div className="bg-gradient-to-r from-cpYellow/20 to-cpAqua/20 rounded-xl p-6 mb-6">
                <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-2">
                  🍳 Keuken
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 italic m-0">
                  Vol gevaren en verleidingen
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20 mb-4">
                <h4 className="font-bold text-cpAqua mb-3">✅ Te Doen:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>□ <strong>Kastsloten installeren</strong> - Voor kasten met schoonmaakmiddelen, afval, voedsel</li>
                  <li>□ <strong>Prullenbak afschermen</strong> - In kast of met deksel, geen open bak</li>
                  <li>□ <strong>Gevaarlijk voedsel opbergen</strong> - Chocolade, uien, druiven, xylitol (zie lijst)</li>
                  <li>□ <strong>Messen en scherp gereedschap</strong> - Hoog of in afgesloten la</li>
                  <li>□ <strong>Hete pannen buiten bereik</strong> - Gebruik achterste pitten, panhendels naar achteren</li>
                  <li>□ <strong>Vaatwastablet veilig opbergen</strong> - Zeer giftig voor honden</li>
                  <li>□ <strong>Plastic zakken opbergen</strong> - Verstikkingsgevaar</li>
                  <li>□ <strong>Vloer schoon houden</strong> - Kruimels en afval direct opruimen</li>
                </ul>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-500">
                <h4 className="font-bold text-red-700 dark:text-red-400 mb-3">🚫 Giftig Voedsel voor Honden</h4>
                <div className="grid grid-cols-2 gap-2 text-sm text-red-600 dark:text-red-300">
                  <div>• Chocolade (zeer giftig!)</div>
                  <div>• Uien en knoflook</div>
                  <div>• Druiven en rozijnen</div>
                  <div>• Avocado</div>
                  <div>• Xylitol (in suikervrij)</div>
                  <div>• Macadamianoten</div>
                  <div>• Alcohol</div>
                  <div>• Cafeïne</div>
                </div>
              </div>
            </div>

            {/* Slaapkamer */}
            <div className="mb-10">
              <div className="bg-gradient-to-r from-cpAqua/20 to-cpPink/20 rounded-xl p-6 mb-6">
                <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-2">
                  🛏️ Slaapkamer
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 italic m-0">
                  Veel kleine gevaren
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20 mb-4">
                <h4 className="font-bold text-cpAqua mb-3">✅ Te Doen:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>□ <strong>Sokken en ondergoed opbergen</strong> - Populair kauw- en slikobject!</li>
                  <li>□ <strong>Sieraden veilig opbergen</strong> - Klein en glanzend = interessant</li>
                  <li>□ <strong>Medicijnen in afgesloten kast</strong> - Geen pillen op nachtkastje</li>
                  <li>□ <strong>Schoenen in kast</strong> - Vooral lederen schoenen zijn populair</li>
                  <li>□ <strong>Kabels van opladers</strong> - Uit bereik of beschermen</li>
                  <li>□ <strong>Kleine voorwerpen</strong> - Munten, knopen, speldjes, elastiekjes opruimen</li>
                  <li>□ <strong>Wasmand met deksel</strong> - Of in kast, anders wordt het kauwspeelgoed</li>
                </ul>
              </div>
            </div>

            {/* Badkamer */}
            <div className="mb-10">
              <div className="bg-gradient-to-r from-cpPink/20 to-cpAqua/20 rounded-xl p-6 mb-6">
                <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-2">
                  🚿 Badkamer
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 italic m-0">
                  Gevaarlijke chemicaliën
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20 mb-4">
                <h4 className="font-bold text-cpAqua mb-3">✅ Te Doen:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>□ <strong>WC-deksel altijd dicht</strong> - Verdrinken in toilet komt voor!</li>
                  <li>□ <strong>Medicijnen in kast met slot</strong> - Nooit op wastafel of plank</li>
                  <li>□ <strong>Schoonmaakmiddelen opbergen</strong> - Bleek, WC-reiniger, ontstopper zijn giftig</li>
                  <li>□ <strong>Cosmetica buiten bereik</strong> - Make-up, parfum, haarlak bevatten gevaarlijke stoffen</li>
                  <li>□ <strong>Tandpasta opbergen</strong> - Xylitol in tandpasta is giftig</li>
                  <li>□ <strong>Scheermesjes veilig</strong> - In afgesloten doosje of la</li>
                  <li>□ <strong>Prullenbak met deksel</strong> - Of in kast, bevat vaak gevaarlijke dingen</li>
                  <li>□ <strong>Elektrische apparaten uit stopcontact</strong> - Föhn, scheerapparaat, steiltang</li>
                </ul>
              </div>
            </div>

            {/* Tuin/Balkon */}
            <div className="mb-10">
              <div className="bg-gradient-to-r from-cpYellow/20 to-cpPink/20 rounded-xl p-6 mb-6">
                <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-2">
                  🌳 Tuin / Balkon
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 italic m-0">
                  Buitengevaren en ontsnappingsroutes
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20 mb-4">
                <h4 className="font-bold text-cpAqua mb-3">✅ Te Doen:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>□ <strong>Schutting/hek controleren</strong> - Gaten dichten, hoogte minimaal 1.5m</li>
                  <li>□ <strong>Giftige planten verwijderen</strong> - Zie lijst hieronder</li>
                  <li>□ <strong>Vijver afschermen</strong> - Met gaas of hekje, verdrinkingsgevaar</li>
                  <li>□ <strong>Gereedschap opbergen</strong> - Hark, schep, schaar kunnen verwonden</li>
                  <li>□ <strong>Bestrijdingsmiddelen veilig</strong> - Slakkenkorrels, onkruidverdelger, kunstmest zijn giftig</li>
                  <li>□ <strong>Composthoop afschermen</strong> - Kan giftige schimmels bevatten</li>
                  <li>□ <strong>Balkonhekken controleren</strong> - Gaten dichten waar puppy doorheen kan</li>
                  <li>□ <strong>Bloempotten stabiel</strong> - Voorkomen dat ze omvallen</li>
                </ul>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-500">
                <h4 className="font-bold text-red-700 dark:text-red-400 mb-3">🚫 Giftige Tuinplanten voor Honden</h4>
                <div className="grid grid-cols-2 gap-2 text-sm text-red-600 dark:text-red-300">
                  <div>• Oleander (zeer giftig!)</div>
                  <div>• Rhododendron</div>
                  <div>• Taxus (zeer giftig!)</div>
                  <div>• Buxus</div>
                  <div>• Hortensia</div>
                  <div>• Narcis, tulp, hyacint (bollen)</div>
                  <div>• Klimop</div>
                  <div>• Maretak</div>
                </div>
              </div>
            </div>
          </section>

          {/* Secondary CTA */}
          <div className="bg-gradient-to-br from-cpPink/20 to-cpYellow/20 rounded-2xl shadow-md p-8 border border-cpPink/30 mb-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-4">
                Alles klaar voor je nieuwe puppy?
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
                Vind professionele hondentrainers, dierenartsen en meer bij jou in de buurt.
              </p>
              <Button
                asChild
                className="bg-cpPink text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
              >
                <Link href="/nl/netherlands">Bekijk alle hondenservices →</Link>
              </Button>
            </div>
          </div>

          {/* Section 4: Puppy-proof producten */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Handige Puppy-Proof Producten
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
              Sommige producten maken puppy-proofing een stuk makkelijker:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-cpPink mb-3">🚪 Babyhekjes</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Beperk toegang tot bepaalde kamers (trap, keuken, kantoor). Kies stabiele hekjes die puppy niet kan omduwen.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-cpPink mb-3">🔌 Kabelgoten</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Bescherm elektrische kabels tegen kauwen. Plastic goten of speciale kabel-beschermers werken goed.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-cpPink mb-3">🧴 Bitter Spray</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Spray met bittere smaak voor meubelpoten, kabels, schoenen. Puppy's vinden de smaak vies en leren het te vermijden.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-cpPink mb-3">🔒 Kastsloten</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Kindveilige kastsloten voor keukenkastjes en kasten met gevaarlijke inhoud (schoonmaakmiddelen, medicijnen).
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-cpPink mb-3">🧸 Veel Kauwtjes</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Geef puppy veilige alternatieven om op te kauwen: rubber speelgoed, Kong, puppy-kluiven. Dit vermindert kauwen op spullen.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-cpPink mb-3">📦 Bench / Hondenmand</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Een veilige plek waar puppy kan zijn als je niet kunt toezicht houden. Zorg dat bench positief is, geen straf.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Wat te doen bij ongelukken */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Wat Te Doen Bij Ongelukken?
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
              Zelfs met de beste voorbereiding kunnen ongelukken gebeuren. Zo handel je:
            </p>

            <div className="space-y-4">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border-l-4 border-red-500">
                <h3 className="font-bold text-red-700 dark:text-red-400 mb-3">🚨 Vergiftiging</h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>1. <strong>Bel DIRECT de dierenarts</strong> - Zelfs als je niet zeker weet wat hij heeft gegeten</li>
                  <li>2. <strong>Laat NIET overgeven</strong> zonder overleg - Sommige stoffen doen meer schade bij braken</li>
                  <li>3. <strong>Neem verpakking mee</strong> - Dierenarts moet weten wat hij heeft ingenomen</li>
                  <li>4. <strong>Noteer tijdstip</strong> - Wanneer heeft hij het gegeten?</li>
                  <li>5. <strong>Blijf rustig</strong> - Paniek helpt niet, volg instructies dierenarts</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border-l-4 border-cpYellow">
                <h3 className="font-bold text-cpYellow mb-3">⚡ Elektrische Schok</h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>1. <strong>Schakel stroom UIT</strong> voordat je puppy aanraakt</li>
                  <li>2. <strong>Controleer ademhaling en hartslag</strong></li>
                  <li>3. <strong>Bel direct dierenarts</strong> - Ook als hij lijkt ok, inwendige schade is mogelijk</li>
                  <li>4. <strong>Geef eerste hulp</strong> indien nodig (beademing, hartmassage)</li>
                  <li>5. <strong>Naar spoed dierenarts</strong> - Elektrische schok kan vertraagde effecten hebben</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border-l-4 border-cpAqua">
                <h3 className="font-bold text-cpAqua mb-3">🍴 Iets Ingeslikt</h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>1. <strong>Probeer NIET zelf te verwijderen</strong> uit keel - Kan erger maken</li>
                  <li>2. <strong>Open bek voorzichtig</strong> - Kijk of je ziet wat het is</li>
                  <li>3. <strong>Bel dierenarts</strong> - Beschrijf wat hij heeft ingeslikt en hoe groot</li>
                  <li>4. <strong>Let op symptomen</strong> - Braken, apathie, geen ontlasting = direct naar dierenarts</li>
                  <li>5. <strong>Röntgenfoto kan nodig zijn</strong> - Om te zien waar object zit</li>
                </ul>
              </div>
            </div>

            <div className="bg-cpPink/10 rounded-xl p-6 border border-cpPink/30 mt-6">
              <p className="font-semibold text-cpPink mb-2">📞 Belangrijk: Noteer deze Nummers</p>
              <ul className="text-sm text-foreground dark:text-cpCream/80 space-y-1">
                <li>• <strong>Je eigen dierenarts</strong>: _______________</li>
                <li>• <strong>Spoed dierenarts</strong> (buiten kantoortijden): _______________</li>
                <li>• <strong>Dierenambuance</strong>: _______________</li>
                <li>• <strong>Vergiftigingen Informatie Centrum Dier</strong>: 0900-2021213</li>
              </ul>
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
                  Moet ik het hele huis puppy-proof maken?
                  <span className="text-cpAqua group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  Nee, dat hoeft niet. <strong>Beperk toegang</strong> met babyhekjes tot de ruimtes waar je puppy mag komen
                  (woonkamer, keuken, gang bijvoorbeeld). Maak alleen die ruimtes puppy-proof. Slaapkamers, kantoor, badkamer
                  kunnen afgesloten blijven. Dit scheelt veel werk en je hoeft minder op te ruimen.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Hoe lang moet ik mijn huis puppy-proof houden?
                  <span className="text-cpAqua group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  De <strong>eerste 6-12 maanden zijn cruciaal</strong>. Puppy's kauwen vooral tijdens tandenwisseling (4-7 maanden).
                  Na een jaar wordt het beter, maar sommige honden blijven hun hele leven nieuwsgierig. Houd gevaarlijke dingen
                  (medicijnen, schoonmaakmiddelen, giftig voedsel) altijd buiten bereik, ook bij volwassen honden.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Mijn puppy kauwt nog steeds op alles, help!
                  <span className="text-cpAqua group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  Kauwen is <strong>normaal gedrag</strong>, vooral tijdens tandenwisseling. Zorg voor <strong>genoeg alternatieven</strong>:
                  Kong speelgoed gevuld met voer, puppykluiven, rubber speelgoed. Wissel af zodat het interessant blijft. Als hij op
                  iets kauwt wat niet mag: zeg rustig "nee", geef direct een toegestaan kauwtje, en beloon als hij daarop kauwt.
                  <strong>Toezicht is cruciaal</strong> - puppy's leren snel als je consequent bent.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Werkt bitter spray echt tegen kauwen?
                  <span className="text-cpAqua group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  Bij <strong>de meeste honden wel</strong>, maar niet bij allemaal. Sommige puppy's leren snel dat bitter = vies
                  en laten het met rust. Anderen trekken zich er niets van aan. Probeer het op één object eerst (meubelpoot,
                  kabel) en kijk of het werkt. Gebruik het <strong>in combinatie met alternatieven</strong> - geef hem iets anders
                  om op te kauwen. Bitter spray alleen is geen oplossing, training en toezicht zijn belangrijker.
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
                href="/nl/gids/puppies-kittens/puppy-kopen-tips"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20 hover:border-cpAqua/40 transition-all group"
              >
                <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpAqua mb-2">
                  Puppy kopen tips →
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Complete gids over het kopen van een puppy, van fokker selectie tot voorbereiding.
                </p>
              </Link>
              <Link
                href="/nl/gids/puppies-kittens/eerste-week-puppy"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20 hover:border-cpAqua/40 transition-all group"
              >
                <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpAqua mb-2">
                  Eerste week met puppy →
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Dag-voor-dag gids voor de eerste zeven dagen met je nieuwe puppy thuis.
                </p>
              </Link>
            </div>
          </section>

          {/* Tertiary CTA */}
          <div className="bg-gradient-to-br from-cpAqua/10 to-cpPink/10 rounded-2xl shadow-md p-8 border border-cpAqua/30 text-center">
            <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-4">
              Huis puppy-proof? Zoek professionele hulp!
            </h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
              Vind dierenartsen, hondentrainers, trimsalons en meer bij jou in de buurt.
            </p>
            <Button
              asChild
              className="bg-cpAqua text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
            >
              <Link href="/nl/netherlands">Ontdek alle huisdierservices →</Link>
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}
