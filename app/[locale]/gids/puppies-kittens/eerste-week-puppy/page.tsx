import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Eerste Week Met Je Nieuwe Puppy: Dag-voor-Dag Gids 2024",
  description: "De eerste week met je puppy thuis? Volg deze dag-voor-dag gids voor zindelijkheid, voeding, slapen en socialisatie. Vind hondentrainers bij jou in de buurt.",
  keywords: "eerste week puppy, puppy eerste dagen, nieuwe puppy thuis, puppy zindelijk, puppy slapen",
  openGraph: {
    title: "Eerste Week Met Je Nieuwe Puppy: Complete Dag-voor-Dag Gids",
    description: "Praktische gids voor de eerste zeven dagen met je nieuwe puppy. Van zindelijkheid tot slapen en voeding.",
  },
};

export default function EersteWeekPuppyPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-cpYellow/10 via-cpPink/10 to-cpAqua/10">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpYellow/10 border border-cpYellow/30 text-cpYellow text-sm font-medium mb-6">
              <span>🐶</span>
              Dag-voor-Dag Gids
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
              Eerste Week Met Je Nieuwe Puppy
            </h1>
            <p className="text-xl text-muted-foreground dark:text-cpCream/80 mb-8">
              De eerste week is cruciaal voor een goede start. Ontdek wat je elke dag kunt verwachten en hoe je je puppy helpt wennen aan zijn nieuwe thuis.
            </p>
          </div>

          {/* Primary CTA */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl shadow-md p-6 border border-cpYellow/20">
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground dark:text-cpCream mb-4">
                Meld je puppy aan voor een puppycursus!
              </p>
              <Button
                asChild
                className="bg-cpYellow text-cpCharcoal rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
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
              headline: "Eerste Week Met Je Nieuwe Puppy: Dag-voor-Dag Gids",
              description: "Complete gids voor de eerste zeven dagen met een nieuwe puppy, inclusief tips voor zindelijkheid, voeding en socialisatie.",
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
              Gefeliciteerd met je nieuwe puppy! De eerste week is een belangrijke periode waarin je puppy went aan zijn nieuwe
              omgeving, familie en routine. Deze dag-voor-dag gids helpt je om de eerste zeven dagen zo soepel mogelijk te laten verlopen.
            </p>
          </div>

          {/* Pre-arrival preparation */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Voor De Grote Dag: Voorbereiding
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              Voordat je puppy thuiskomt, zorg je dat alles klaar staat. Dit voorkomt stress voor jou én je puppy.
            </p>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20 mb-6">
              <h3 className="text-xl font-bold text-cpPink mb-4">✅ Laatste Checklist</h3>
              <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
                <li>✓ Hondenmand of bench met dekentje</li>
                <li>✓ Voer- en waterbak op vaste plek</li>
                <li>✓ Puppy voer (hetzelfde merk als fokker gebruikt)</li>
                <li>✓ Speelgoed en kauwtjes</li>
                <li>✓ Halsband, lijn en penning met contactgegevens</li>
                <li>✓ Zindelijkheidstraining matten binnen</li>
                <li>✓ Gevaarlijke voorwerpen opgeruimd</li>
                <li>✓ Contactgegevens dierenarts bij de hand</li>
                <li>✓ Vrije dagen genomen voor eerste week</li>
              </ul>
            </div>

            <p className="text-muted-foreground dark:text-cpCream/80">
              <strong>Lees meer:</strong>{" "}
              <Link href="/nl/gids/puppies-kittens/puppy-proof-huis" className="text-cpPink hover:text-cpPink/80 underline">
                Puppy-proofing: je huis veilig maken voor een puppy
              </Link>
            </p>
          </section>

          {/* Day 1 */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-cpPink/20 to-cpYellow/20 rounded-xl p-6 mb-6">
              <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-2">
                Dag 1: De Thuiskomst 🏠
              </h2>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 italic m-0">
                De spannendste dag voor jullie allebei!
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground dark:text-cpCream mb-3">
                  's Ochtends / Ophalen
                </h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80">
                  <li>Haal je puppy <strong>vroeg op de dag</strong> op, zodat hij de hele dag kan wennen</li>
                  <li>Neem een <strong>dekentje mee met geur van moeder</strong> voor comfort</li>
                  <li>Laat hem <strong>plasje doen</strong> voordat je in de auto stapt</li>
                  <li>Hou de autorit <strong>rustig</strong>: iemand naast de puppy in reismand of op schoot</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground dark:text-cpCream mb-3">
                  Middag / Thuis
                </h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80">
                  <li>Direct naar de <strong>plasplek buiten</strong> - beloon als hij gaat!</li>
                  <li>Laat hem <strong>rustig rondsnuffelen</strong> in huis (1 of 2 kamers)</li>
                  <li>Wijs hem zijn <strong>mand, voerbakken en speelgoed</strong> aan</li>
                  <li>Geef <strong>geen groot welkomstfeest</strong> - te veel prikkels maken hem angstig</li>
                  <li>Laat hem <strong>zelf het tempo bepalen</strong> bij het verkennen</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground dark:text-cpCream mb-3">
                  Avond / Eerste Nacht
                </h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80">
                  <li>Laatste <strong>plaspauze rond 22:00-23:00</strong></li>
                  <li>Zet zijn bench/mand <strong>dicht bij je bed</strong> voor de eerste nachten</li>
                  <li>Verwacht <strong>gehuil of gejank</strong> - hij mist moeder en nestgenoten</li>
                  <li>Stel hem <strong>niet te veel gerust</strong> (beloon geen gehuil), maar wees wel aanwezig</li>
                  <li>Misschien moet hij <strong>'s nachts plassen</strong> - jonge puppy's kunnen het nog niet lang ophouden</li>
                </ul>
              </div>
            </div>

            <div className="bg-cpYellow/10 rounded-xl p-6 border border-cpYellow/30 mt-6">
              <p className="font-semibold text-cpYellow mb-2">💡 Tip voor de eerste nacht</p>
              <p className="text-sm text-foreground dark:text-cpCream/80 m-0">
                Gebruik een <strong>warmtekruik</strong> (niet te heet!) en een <strong>tikkende wekker</strong> in zijn mand.
                Dit simuleert de warmte en hartslag van moeder en nestgenoten en helpt hem rustiger slapen.
              </p>
            </div>
          </section>

          {/* Day 2-3 */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-cpYellow/20 to-cpAqua/20 rounded-xl p-6 mb-6">
              <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-2">
                Dag 2-3: Routine Opbouwen 📅
              </h2>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 italic m-0">
                Structuur geeft veiligheid
              </p>
            </div>

            <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
              Vanaf dag 2 begin je met het opbouwen van een <strong>vaste routine</strong>. Puppy's houden van voorspelbaarheid
              en leren snel patronen herkennen.
            </p>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20 mb-6">
              <h3 className="text-lg font-bold text-cpAqua mb-4">Voorbeeld Dagschema</h3>
              <div className="space-y-3 text-sm">
                <div className="flex gap-4">
                  <span className="font-bold text-cpPink min-w-16">07:00</span>
                  <span className="text-muted-foreground dark:text-cpCream/80">Wakker, direct naar buiten (plassen)</span>
                </div>
                <div className="flex gap-4">
                  <span className="font-bold text-cpPink min-w-16">07:15</span>
                  <span className="text-muted-foreground dark:text-cpCream/80">Ontbijt (puppy voer + water)</span>
                </div>
                <div className="flex gap-4">
                  <span className="font-bold text-cpPink min-w-16">07:45</span>
                  <span className="text-muted-foreground dark:text-cpCream/80">Naar buiten (plassen na eten)</span>
                </div>
                <div className="flex gap-4">
                  <span className="font-bold text-cpPink min-w-16">08:00</span>
                  <span className="text-muted-foreground dark:text-cpCream/80">Speeltijd (10-15 min)</span>
                </div>
                <div className="flex gap-4">
                  <span className="font-bold text-cpPink min-w-16">08:30</span>
                  <span className="text-muted-foreground dark:text-cpCream/80">Dutje in bench (puppy's slapen 18-20 uur!)</span>
                </div>
                <div className="flex gap-4">
                  <span className="font-bold text-cpPink min-w-16">10:30</span>
                  <span className="text-muted-foreground dark:text-cpCream/80">Wakker, direct naar buiten</span>
                </div>
                <div className="flex gap-4">
                  <span className="font-bold text-cpPink min-w-16">11:00</span>
                  <span className="text-muted-foreground dark:text-cpCream/80">Speeltijd + korte wandeling</span>
                </div>
                <div className="flex gap-4">
                  <span className="font-bold text-cpPink min-w-16">12:00</span>
                  <span className="text-muted-foreground dark:text-cpCream/80">Lunch, daarna naar buiten</span>
                </div>
                <div className="flex gap-4">
                  <span className="font-bold text-cpPink min-w-16">...</span>
                  <span className="text-muted-foreground dark:text-cpCream/80 italic">Herhaal patroon: eten → buiten → spelen → slapen</span>
                </div>
                <div className="flex gap-4">
                  <span className="font-bold text-cpPink min-w-16">22:30</span>
                  <span className="text-muted-foreground dark:text-cpCream/80">Laatste plaspauze, daarna naar bed</span>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-foreground dark:text-cpCream mb-4">
              Focus Punten Dag 2-3:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80">
              <li>
                <strong>Zindelijkheidstraining</strong> - Naar buiten: na wakker worden, na eten, na spelen, voor slapen
              </li>
              <li>
                <strong>Belonen</strong> - Overdreven blij als hij buiten plast! Traktatie + compliment
              </li>
              <li>
                <strong>Ongelukjes binnen</strong> - Niet boos worden, gewoon opruimen. Hij leert het nog
              </li>
              <li>
                <strong>Bench training</strong> - Korte periodes in bench, altijd positief (snack erbij)
              </li>
              <li>
                <strong>Naam leren</strong> - Gebruik zijn naam vaak in positieve context + beloning
              </li>
            </ul>
          </section>

          {/* Secondary CTA */}
          <div className="bg-gradient-to-br from-cpAqua/20 to-cpPink/20 rounded-2xl shadow-md p-8 border border-cpAqua/30 mb-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-4">
                Hulp nodig bij opvoeding?
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
                Een puppycursus helpt je én je puppy met socialisatie en basiscommando's. Vind professionele trainers bij jou in de buurt.
              </p>
              <Button
                asChild
                className="bg-cpAqua text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
              >
                <Link href="/nl/netherlands">Bekijk hondentrainers →</Link>
              </Button>
            </div>
          </div>

          {/* Day 4-5 */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-cpAqua/20 to-cpPink/20 rounded-xl p-6 mb-6">
              <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-2">
                Dag 4-5: Socialisatie Begint 👥
              </h2>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 italic m-0">
                Voorzichtig nieuwe ervaringen opdoen
              </p>
            </div>

            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              Je puppy voelt zich nu wat meer thuis. Het is tijd om <strong>heel voorzichtig</strong> te beginnen met
              socialisatie. Belangrijk: wacht met grote avonturen tot na de volledige vaccinatiereeks!
            </p>

            <h3 className="text-xl font-semibold text-foreground dark:text-cpCream mb-4">
              Veilige Socialisatie-activiteiten:
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-bold text-cpPink mb-2">✅ Wel Doen</h4>
                <ul className="space-y-1 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>• Verschillende geluiden thuis (stofzuiger, tv, muziek)</li>
                  <li>• Bezoek van 1-2 rustige mensen</li>
                  <li>• Korte autoritjes (wennen aan auto)</li>
                  <li>• Verschillende ondergronden (gras, tegels, tapijt)</li>
                  <li>• Speelgoed van verschillende materialen</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-bold text-red-500 mb-2">❌ Nog Niet</h4>
                <ul className="space-y-1 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>• Hondenparken of drukke plekken</li>
                  <li>• Contact met onbekende honden</li>
                  <li>• Lange wandelingen (max 5 min per levensmaand)</li>
                  <li>• Drukke winkelstraten</li>
                  <li>• Grote groepen mensen</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-xl p-6 mb-6">
              <p className="font-bold text-red-700 dark:text-red-400 mb-2">⚠️ Vaccinatieschema</p>
              <p className="text-sm text-red-600 dark:text-red-300 m-0">
                Je puppy is <strong>NIET volledig beschermd</strong> tot ongeveer 16 weken (na laatste prik). Vermijd
                plekken waar veel honden komen tot die tijd. Vraag je dierenarts naar het volledige vaccinatieschema.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-foreground dark:text-cpCream mb-4">
              Basiscommando's Oefenen:
            </h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              Begin met <strong>heel korte training sessies</strong> (2-3 minuten) meerdere keren per dag:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80">
              <li><strong>"Zit"</strong> - Snack boven zijn neus, beweeg naar achteren → hij gaat zitten → belonen!</li>
              <li><strong>"Kom"</strong> - Zeg naam + "kom", hurk, armens open → beloon als hij komt</li>
              <li><strong>"Blaas"</strong> - Laat iets los uit zijn bek → ruil voor traktatie</li>
            </ul>
          </section>

          {/* Day 6-7 */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-cpPink/20 to-cpYellow/20 rounded-xl p-6 mb-6">
              <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-2">
                Dag 6-7: Vertrouwen Groeit 💪
              </h2>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 italic m-0">
                Je puppy voelt zich steeds meer thuis
              </p>
            </div>

            <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
              Aan het einde van de eerste week merk je dat je puppy <strong>meer zelfvertrouwen</strong> heeft. Hij kent zijn
              plekjes in huis, begint zijn naam te herkennen en de routine wordt duidelijker.
            </p>

            <h3 className="text-xl font-semibold text-foreground dark:text-cpCream mb-4">
              Wat Je Kunt Verwachten:
            </h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">😴</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Betere slaap</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    Waarschijnlijk slaapt hij nu een stuk beter 's nachts (misschien zelfs door!)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">🎾</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Meer energie</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    Nu hij zich thuis voelt, wordt hij actiever en speelser
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">🚽</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Eerste zindelijkheidssucces</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    Hij begint het patroon te snappen: buiten = goed, binnen = niet fijn
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">❤️</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Hechting met jou</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    Je puppy volgt je nu vaker en zoekt contact
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-foreground dark:text-cpCream mb-4">
              Focus Punten Week 1 Afsluiten:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80">
              <li>
                <strong>Evalueer de routine</strong> - Werkt het schema? Pas aan waar nodig
              </li>
              <li>
                <strong>Dierenarts afspraak</strong> - Maak een afspraak voor eerste controle en vaccinaties
              </li>
              <li>
                <strong>Puppycursus zoeken</strong> - Begin na volledige vaccinaties (meestal 12-16 weken)
              </li>
              <li>
                <strong>Verzekering afsluiten</strong> - Nu is het goedkoop, vóór problemen ontstaan
              </li>
              <li>
                <strong>Alleen-zijn oefenen</strong> - Begin met 1-2 minuten, bouw langzaam op
              </li>
            </ul>
          </section>

          {/* Common challenges */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Veelvoorkomende Uitdagingen Eerste Week
            </h2>
            <div className="space-y-6">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-cpPink mb-3">😢 Huilen 's Nachts</h3>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                  <strong>Normaal!</strong> Hij mist moeder en nestgenoten. Geef het tijd, blijf rustig en consequent.
                </p>
                <p className="text-sm text-foreground dark:text-cpCream/80">
                  <strong>Oplossing:</strong> Bench naast je bed, warmtekruik, tikkende klok. Ga niet bij elk geluidje
                  meteen naar hem toe - dat beloont het gedrag.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-cpPink mb-3">💩 Ongelukjes Binnen</h3>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                  <strong>Verwacht!</strong> Puppy's kunnen het nog niet lang ophouden. Jonge puppy's moeten elk uur!
                </p>
                <p className="text-sm text-foreground dark:text-cpCream/80">
                  <strong>Oplossing:</strong> Vaker naar buiten (elke 1-2 uur), direct na eten/spelen/slapen. Overdreven
                  belonen als het buiten lukt. Nooit straffen voor binnen-ongelukjes.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-cpPink mb-3">🦷 Bijten en Kauwen</h3>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                  <strong>Normaal spelgedrag!</strong> Puppy's verkennen met hun bek. Ze hebben ook last van tandjes.
                </p>
                <p className="text-sm text-foreground dark:text-cpCream/80">
                  <strong>Oplossing:</strong> Zeg "au!" en stop met spelen als hij in handen bijt. Geef direct een speeltje
                  als alternatief. Beloon zacht spelen. Veel kauwtjes en speelgoed aanbieden.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-cpPink mb-3">🍽️ Niet Eten</h3>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                  Stress kan eetlust verminderen de eerste dagen. Ook nieuwe omgeving en voer kan reden zijn.
                </p>
                <p className="text-sm text-foreground dark:text-cpCream/80">
                  <strong>Oplossing:</strong> Gebruik hetzelfde voer als fokker. Bied 3-4 kleine maaltijden per dag.
                  Als hij na 2 dagen nog niet eet, bel dierenarts. Vers water altijd beschikbaar!
                </p>
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
                  Hoelang duurt het voor een puppy zindelijk is?
                  <span className="text-cpYellow group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  Gemiddeld zijn puppy's <strong>zindelijk rond 4-6 maanden</strong>, maar dit varieert sterk. Kleine rassen
                  duren vaak langer. Consequentie is cruciaal: vaste tijden naar buiten, direct na eten/slapen/spelen, en
                  overdreven belonen als het buiten lukt. Ongelukjes gebeuren tot ongeveer 6-8 maanden.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Mag mijn puppy al wandelen in de eerste week?
                  <span className="text-cpYellow group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  <strong>Korte wandelingen in eigen tuin zijn prima</strong>, maar vermijd plekken waar veel honden komen
                  tot na volledige vaccinaties (16 weken). Jonge puppy's zijn gevoelig voor virussen zoals parvo en
                  hondenziekte. Regel: <strong>5 minuten wandelen per levensmaand</strong> (8 weken oud = 10 min wandelen).
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Hoeveel moet een puppy slapen?
                  <span className="text-cpYellow group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  Jonge puppy's slapen <strong>18-20 uur per dag</strong>! Dit is normaal en essentieel voor hun groei en
                  ontwikkeling. Ze zijn vaak 1-2 uur wakker, dan weer 2-3 uur slapen. Forceer dutjes in de bench zodat ze
                  leren tot rust te komen. Overmoeide puppy's zijn vaak hyperactief en bijterig.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Wanneer moet ik naar de dierenarts in de eerste week?
                  <span className="text-cpYellow group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  Plan een <strong>controle binnen 2-3 dagen</strong> na thuiskomst, zelfs als alles goed lijkt. De
                  dierenarts controleert gezondheid, vaccins, chip en geeft advies over voeding en ontworming. Ga
                  <strong>direct</strong> bij: braken, diarree langer dan 12 uur, niet eten/drinken, apathie, of
                  hoesten/niezen.
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
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20 hover:border-cpYellow/40 transition-all group"
              >
                <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpYellow mb-2">
                  Puppy kopen tips →
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Alle informatie over het kopen van een puppy, van fokker selectie tot voorbereiding.
                </p>
              </Link>
              <Link
                href="/nl/gids/puppies-kittens/puppy-proof-huis"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20 hover:border-cpYellow/40 transition-all group"
              >
                <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpYellow mb-2">
                  Puppy-proofing je huis →
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Maak je huis veilig voor een nieuwsgierige puppy met deze complete checklist.
                </p>
              </Link>
            </div>
          </section>

          {/* Tertiary CTA */}
          <div className="bg-gradient-to-br from-cpYellow/10 to-cpPink/10 rounded-2xl shadow-md p-8 border border-cpYellow/30 text-center">
            <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-4">
              Klaar voor de volgende stappen?
            </h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
              Vind dierenartsen, hondentrainers, trimsalons en meer bij jou in de buurt.
            </p>
            <Button
              asChild
              className="bg-cpYellow text-cpCharcoal rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
            >
              <Link href="/nl/netherlands">Ontdek alle huisdierservices →</Link>
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}
