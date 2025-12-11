import type { Metadata } from 'next';
import Link from 'next/link';
import PhotoCredit from '@/components/PhotoCredit';
import BetweenContentAd from '@/components/ads/BetweenContentAd';
import BlogSidebarAd from '@/components/ads/BlogSidebarAd';

export const metadata: Metadata = {
  title: 'Nieuwe Kat in Huis: De Eerste 7 Dagen Succesvol Maken | CutiePawsPedia',
  description: 'Complete gids voor de eerste week met je nieuwe kat. Van introductie tot gewenning - alles wat je moet weten voor een soepele overgang.',
  keywords: 'nieuwe kat, kat wennen, kat introductie, kitten eerste dag, kat gewenning, nieuwe kat tips',
  openGraph: {
    title: 'Nieuwe Kat in Huis: De Eerste 7 Dagen | CutiePawsPedia',
    description: 'Maak de eerste week met je nieuwe kat een succes met deze complete dag-voor-dag gids.',
    type: 'article',
    publishedTime: '2025-01-15T13:00:00Z',
    authors: ['CutiePawsPedia Team'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Nieuwsgierige nieuwe kat verkent zijn nieuwe thuis'
      }
    ]
  }
};

export default function NieuweKatEersteWeekPage() {
  return (
    <main className="min-h-screen bg-cpCream dark:bg-cpCharcoal">
      <article className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block px-3 py-1 bg-cpCoral text-white text-sm font-semibold rounded-full">
                  Puppies & Kittens
                </span>
                <time className="text-sm text-cpCharcoal/60 dark:text-cpCream/60">
                  15 januari 2025
                </time>
                <span className="text-sm text-cpCharcoal/60 dark:text-cpCream/60">
                  • 12 min leestijd
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-cpCharcoal dark:text-cpCream mb-6 leading-tight">
                Nieuwe Kat in Huis: De Eerste 7 Dagen Succesvol Maken
              </h1>
            </header>

            {/* Featured Image */}
            <figure className="mb-8 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&h=600&fit=crop"
                alt="Nieuwsgierige nieuwe kat verkent voorzichtig zijn nieuwe thuis"
                className="w-full h-auto"
              />
              <PhotoCredit
                photographerName="Mikhail Vasilyev"
                photographerUrl="https://unsplash.com/@miklevasilyev"
                platform="Unsplash"
              />
            </figure>

            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-xl text-cpCharcoal/80 dark:text-cpCream/80 leading-relaxed">
                De eerste week met je nieuwe kat is cruciaal voor een succesvolle gewenning en een sterke band. Of je nu een kitten adopteert, een volwassen kat uit het asiel haalt, of een zwerfkat een thuis geeft - de eerste zeven dagen bepalen hoe snel je kat zich veilig en welkom voelt. In deze complete dag-voor-dag gids leer je precies wat je moet doen, welke fouten je moet vermijden, en hoe je de overgang zo soepel mogelijk maakt voor jullie beiden.
              </p>
            </div>

            {/* Main Content */}
            <div className="prose prose-lg max-w-none text-cpCharcoal dark:text-cpCream">
              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Voorbereiding: Voor Je Nieuwe Kat Aankomt
              </h2>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Essentiële Benodigdheden (€150-400)
              </h3>

              <div className="bg-cpSurface dark:bg-cpCharcoal/50 p-6 rounded-xl mb-6">
                <h4 className="text-xl font-semibold mb-4">Basis Essentials:</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Voer- en waterbak:</strong> RVS of keramiek (€10-30)</li>
                  <li><strong>Kattenbak + schep:</strong> Liefst 2 bakken (€15-50)</li>
                  <li><strong>Kattenbakvulling:</strong> Clumpingtype (€8-15/maand)</li>
                  <li><strong>Kattenvoer:</strong> Zelfde merk als vorig eigenaar/asiel (€20-50)</li>
                  <li><strong>Bench of reismand:</strong> Voor veilig vervoer (€20-80)</li>
                  <li><strong>Krabpaal:</strong> Verticaal en stevig (€25-100)</li>
                  <li><strong>Bed of deken:</strong> Zacht en wasbaar (€15-40)</li>
                  <li><strong>Speelgoed:</strong> Variatie van types (€15-40)</li>
                  <li><strong>ID-tag en halsband:</strong> Met jouw contactgegevens (€10-20)</li>
                </ul>
              </div>

              <div className="bg-cpSurface dark:bg-cpCharcoal/50 p-6 rounded-xl mb-6">
                <h4 className="text-xl font-semibold mb-4">Optioneel maar Aanbevolen:</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Feliway diffuser:</strong> Kalmerende feromonen (€30-40 + €15/vulling/maand)</li>
                  <li><strong>Kattenboom:</strong> Voor verticale ruimte (€50-200)</li>
                  <li><strong>Verstopplekken:</strong> Kartonnen dozen of kattentunnel (gratis-€30)</li>
                  <li><strong>Borstels:</strong> Voor vachtverzorging (€10-25)</li>
                  <li><strong>Nagelknipper:</strong> Voor kattenklauwen (€5-15)</li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Maak Je Huis Katveilig
              </h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Verwijder giftige planten:</strong> Lelie, azalea, oleander, kerstster, amaryllis</li>
                <li><strong>Verberg kabels:</strong> Elektriciteitskabels kunnen gevaarlijk zijn</li>
                <li><strong>Beveilig ramen:</strong> Zorg voor kattennetjes bij open ramen (val gevaar)</li>
                <li><strong>Sluit kleine ruimtes:</strong> Achter wasmachine, onder meubels waar kat vast kan zitten</li>
                <li><strong>Verberg chemicaliën:</strong> Schoonmaakmiddelen, medicijnen, antivries</li>
                <li><strong>Verwijder kleine objecten:</strong> Elastiekjes, paperclips, naaldjes</li>
                <li><strong>Check vuilnisbakken:</strong> Gebruik exemplaren met deksel</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Richt Een Startkamer In
              </h3>
              <p>
                De <strong>startkamer</strong> is een aparte, rustige ruimte waar je nieuwe kat de eerste dagen kan verblijven. Dit helpt overweldiging te voorkomen.
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Kies een rustige kamer:</strong> Kleine slaapkamer, studeerkamer of badkamer</li>
                <li><strong>Plaats essentials:</strong> Voer/water (1 hoek), kattenbak (andere hoek, minimaal 1,5m afstand)</li>
                <li><strong>Voeg comfort toe:</strong> Bed, dekens met geur van vorig huis (als mogelijk)</li>
                <li><strong>Verstopplekken:</strong> Kartonnen doos, opengesneden tunnel, ruimte onder bed</li>
                <li><strong>Verticale ruimte:</strong> Stoel, plank of lage kast om op te klimmen</li>
                <li><strong>Krabgelegenheid:</strong> Krabpaal of krabmat</li>
                <li><strong>Paar speeltjes:</strong> Niet te veel - start simpel</li>
              </ul>

              <BetweenContentAd />

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Dag 1: Aankomst en Eerste Indrukken
              </h2>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                De Reis Naar Huis
              </h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Gebruik een stevige bench:</strong> Geen losse doos of je armen</li>
                <li><strong>Dek de bench af:</strong> Handdoek over bench vermindert stress</li>
                <li><strong>Rijd rustig:</strong> Geen harde remmen, bochten of muziek</li>
                <li><strong>Praat zacht:</strong> Rustgevende stem kan helpen</li>
                <li><strong>Directe route:</strong> Geen tussenstops, ga direct naar huis</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Eerste Uren: De Startkamer
              </h3>
              <ol className="list-decimal pl-6 space-y-3 mb-6">
                <li><strong>Breng je kat direct naar de startkamer</strong> - niet door hele huis rondleiden</li>
                <li><strong>Open de bench rustig</strong> en laat je kat in eigen tempo naar buiten komen (kan 5 min - 2 uur duren)</li>
                <li><strong>Forceer niets</strong> - geen aaien, oppakken of aanstaren</li>
                <li><strong>Wijs voer, water en kattenbak aan</strong> door zacht te wijzen (niet forceren)</li>
                <li><strong>Ga uit de kamer</strong> en laat je kat 2-4 uur alleen om te verkennen</li>
                <li><strong>Bezoek kort</strong> (5-10 min) om waterbak bij te vullen en rustig te praten</li>
              </ol>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Wat Te Verwachten Dag 1
              </h3>
              <div className="bg-cpAmber/20 dark:bg-cpAmber/10 border-l-4 border-cpAmber p-6 rounded-lg my-8">
                <h4 className="text-xl font-semibold mb-3">Normaal Gedrag:</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Verstopt zich onder bed, in bench of achter meubels</li>
                  <li>Weigert te eten of drinken eerste 4-12 uur</li>
                  <li>Excessief grooming (stress reactie)</li>
                  <li>Mauwen, vooral 's nachts</li>
                  <li>Grote pupillen, lage houding, staart tussen benen</li>
                  <li>Niet poepen eerste 24-48 uur (stress)</li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Wat Je NIET Moet Doen Dag 1
              </h3>
              <div className="bg-cpCoral/10 dark:bg-cpCoral/20 border-l-4 border-cpCoral p-6 rounded-lg my-8">
                <ul className="list-disc pl-6 space-y-2">
                  <li>❌ Vrienden/familie uitnodigen om nieuwe kat te zien</li>
                  <li>❌ Hele huis laten verkennen</li>
                  <li>❌ Forceren uit verstopplek te komen</li>
                  <li>❌ Continu in kamer zijn of aanstaren</li>
                  <li>❌ Luide geluiden of muziek</li>
                  <li>❌ Andere huisdieren introduceren</li>
                  <li>❌ Kinderen alleen met kat laten</li>
                </ul>
              </div>

              <BetweenContentAd />

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Dag 2-3: Opbouw van Vertrouwen
              </h2>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Bezoekjes Verlengen
              </h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>3-4 bezoekjes per dag</strong> van 15-20 minuten</li>
                <li><strong>Breng een boek mee</strong> en lees hardop (kat went aan je stem)</li>
                <li><strong>Zit op de grond</strong> - minder intimiderend dan rechtop staan</li>
                <li><strong>Laat kat naar jou komen</strong> - steek hand uit maar forceer niet</li>
                <li><strong>Gebruik lekkernijen</strong> om positieve associatie te creëren (gooi ze, bied niet uit hand)</li>
                <li><strong>Speel zacht</strong> met speelgoed op afstand (kattenhengel)</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Eerste Aanrakingen
              </h3>
              <p>
                Als je kat <strong>naar jou toe komt</strong> (belangrijk - niet andersom!):
              </p>
              <ol className="list-decimal pl-6 space-y-3 mb-6">
                <li>Laat je kat aan je hand snuffelen zonder te bewegen</li>
                <li>Als hij kopjes geeft of langs je hand strijkt: aai zacht zijn wang/kin</li>
                <li>Vermijd bovenkant hoofd, rug of staart de eerste dagen</li>
                <li>Stop als kat wegloopt - respecteer grenzen</li>
                <li>Sessies kort houden (2-5 min)</li>
              </ol>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Voortgang Dag 2-3
              </h3>
              <div className="bg-cpSurface dark:bg-cpCharcoal/50 p-6 rounded-xl mb-6">
                <h4 className="text-xl font-semibold mb-4">Positieve Signalen:</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>✅ Eet en drinkt regelmatig (zelfs als je in kamer bent)</li>
                  <li>✅ Gebruikt kattenbak (plassen EN poepen)</li>
                  <li>✅ Verkent kamer wanneer jij er bent</li>
                  <li>✅ Ontspannen lichaamstaal (staart omhoog, oren naar voren)</li>
                  <li>✅ Speelt met speelgoed</li>
                  <li>✅ Spint voorzichtig</li>
                  <li>✅ Komt richting jou (nieuwsgierigheid)</li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Dag 4-5: Uitbreiding Territorium
              </h2>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Is Je Kat Klaar Voor Meer Ruimte?
              </h3>
              <p>
                <strong>Ga pas verder als je kat:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Regelmatig eet, drinkt en kattenbak gebruikt</li>
                <li>Actief door startkamer beweegt</li>
                <li>Laat zich vrijwillig aaien</li>
                <li>Speelt en nieuwsgierig is</li>
                <li>Niet meer constant verstopt zit</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Graduele Huisverkenning
              </h3>
              <ol className="list-decimal pl-6 space-y-3 mb-6">
                <li><strong>Open de deur van startkamer</strong> en laat je kat zelf naar buiten komen (forceer niet)</li>
                <li><strong>Begeleid eerste verkenning</strong> - volg je kat op afstand</li>
                <li><strong>Sluit deuren van kamers</strong> die nog niet veilig/toegankelijk zijn</li>
                <li><strong>Laat startkamer open</strong> als veilige thuisbasis - eten/drinken blijven daar</li>
                <li><strong>Eerste sessie: 30-60 minuten</strong> dan terug naar startkamer</li>
                <li><strong>Dag 5: Verleng naar 2-3 uur</strong> en meerdere sessies per dag</li>
                <li><strong>Voeg tweede kattenbak toe</strong> in andere kamer (regel: aantal katten + 1)</li>
              </ol>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Omgaan Met Angst Tijdens Verkenning
              </h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Plotseling geluid:</strong> Blijf kalm, praat zacht, laat kat vluchten naar startkamer</li>
                <li><strong>Vastlopen:</strong> Verleid met lekkernij of speelgoed, oppakken als laatste redmiddel</li>
                <li><strong>Extreem verstoppen:</strong> Geef tijd (uren), plaats voer/water dichtbij</li>
                <li><strong>Regressie:</strong> Als kat weer heel angstig wordt, terug naar startkamer voor 1-2 dagen</li>
              </ul>

              <BetweenContentAd />

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Dag 6-7: Routine en Integratie
              </h2>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Vestig een Dagelijks Ritme
              </h3>
              <p>
                Katten gedijen bij <strong>voorspelbaarheid</strong>. Creëer een vast dagschema:
              </p>

              <div className="bg-cpSurface dark:bg-cpCharcoal/50 p-6 rounded-xl mb-6">
                <h4 className="text-xl font-semibold mb-4">Voorbeeld Dagschema:</h4>
                <ul className="space-y-2">
                  <li><strong>7:00:</strong> Wakker, voeren, schone kattenbak</li>
                  <li><strong>7:30:</strong> 15 min spelen</li>
                  <li><strong>12:00:</strong> Middag voeren (als je kitten hebt)</li>
                  <li><strong>17:00:</strong> Interactief speeltijd (20-30 min)</li>
                  <li><strong>18:00:</strong> Avondvoer</li>
                  <li><strong>20:00:</strong> Rustige tijd samen, aaien, grooming</li>
                  <li><strong>22:00:</strong> Laatste speelsessie voor nacht</li>
                  <li><strong>23:00:</strong> Bedtijd (kat krijgt toegang tot slaapkamer of eigen ruimte)</li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Introductie Met Andere Huisdieren (Indien Van Toepassing)
              </h3>
              <p>
                <strong>NIET voor week 1 tenzij beide dieren extreem relaxed zijn!</strong> Idealiter wacht je 2-3 weken.
              </p>

              <p>
                Als je toch moet beginnen in week 1:
              </p>

              <div className="bg-cpAmber/20 dark:bg-cpAmber/10 border-l-4 border-cpAmber p-6 rounded-lg my-8">
                <h4 className="text-xl font-semibold mb-3">Geuruitwisseling (Dag 6-7):</h4>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Wrijf doek over nieuwe kat en laat bestaande huisdier eraan ruiken</li>
                  <li>Wissel beddengoed uit tussen dieren</li>
                  <li>Laat katten elkaar onder deur door ruiken (zonder visueel contact)</li>
                  <li>Voer beide dieren aan weerszijden van gesloten deur (positieve associatie)</li>
                  <li>Pas als beide relaxed zijn: visuele introductie via traliedeur/babygate</li>
                </ol>
              </div>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Kinderen en Nieuwe Kat
              </h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Leer kinderen kattenlichaamstaal:</strong> Oren plat = stop, staart zwiepen = geïrriteerd</li>
                <li><strong>Stel regels:</strong> Niet achtervolgen, niet oppakken zonder toestemming, zachte stem</li>
                <li><strong>Toezicht altijd:</strong> Vooral bij kinderen onder 8 jaar</li>
                <li><strong>Respecteer grenzen:</strong> Als kat wegloopt, hem laten gaan</li>
                <li><strong>Betrek kinderen bij verzorging:</strong> Helpen voeren, speeltijd (onder toezicht)</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Einde Week 1: Checklist
              </h3>
              <div className="bg-cpSurface dark:bg-cpCharcoal/50 p-6 rounded-xl mb-6">
                <p className="mb-4">Na 7 dagen zou je kat moeten:</p>
                <ul className="space-y-2">
                  <li>✅ Regelmatig eten en drinken</li>
                  <li>✅ Kattenbak gebruiken zonder problemen</li>
                  <li>✅ Vrij door (delen van) huis bewegen</li>
                  <li>✅ Nieuwsgierig en speels zijn</li>
                  <li>✅ Zich vrijwillig laten aaien door gezinsleden</li>
                  <li>✅ Normale grooming routine hebben</li>
                  <li>✅ Slapen in zichtbare plekken (niet constant verstopt)</li>
                  <li>✅ Communiceren (mauwen, spinnen)</li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Veelvoorkomende Problemen en Oplossingen
              </h2>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Probleem 1: Kat Weigert Te Eten
              </h3>
              <p>
                <strong>Normaal tot 24 uur</strong>, zorgwekkend na 48 uur.
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Oplossing:</strong> Gebruik exact hetzelfde voer als vorige locatie</li>
                <li>Warm voer licht op (30 sec magnetron) voor sterkere geur</li>
                <li>Probeer stinkend voer (tonijn, sardines) als noodoplossing</li>
                <li>Gebruik platte bord i.p.v. diepe bak (whiskerstress)</li>
                <li>Plaats voer in verstopplek bij kat</li>
                <li>Na 48 uur niet eten: bel dierenarts</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Probleem 2: Kat Gebruikt Kattenbak Niet
              </h3>
              <p>
                <strong>Plassen buiten bak:</strong> Vaak stress of verkeerde bak.
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Check bak:</strong> Groot genoeg? (1.5x lengte kat), schoon?</li>
                <li><strong>Check vulling:</strong> Zelfde type als vorige locatie? Geurvrij?</li>
                <li><strong>Locatie:</strong> Rustig, geen luide apparaten, voldoende privacy</li>
                <li><strong>Aantal bakken:</strong> Minimaal 2 in verschillende ruimtes</li>
                <li><strong>Medisch:</strong> Urineweginfectie? Na 3 dagen probleem: dierenarts</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Probleem 3: Excessief Mauwen 's Nachts
              </h3>
              <p>
                Normale aanpassingsreactie maar kan uitputtend zijn.
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Vermoei je kat:</strong> 30 min intensief spelen voor bedtijd</li>
                <li><strong>Voer voor slapen:</strong> Volle buik = slaperige kat</li>
                <li><strong>Nachtlampje:</strong> Katten kunnen angstig zijn in volledige duisternis</li>
                <li><strong>Witte ruis:</strong> Radio of fan maskeert huisgeluiden</li>
                <li><strong>Negeer mauwen:</strong> Reageren = belonen (maar check of alles ok is eerst)</li>
                <li><strong>Feliway:</strong> Kalmerende feromonen kunnen helpen</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Probleem 4: Blijft Verstopt Na 4-5 Dagen
              </h3>
              <p>
                Sommige katten hebben meer tijd nodig, vooral rescue katten of zeer schuwe rassen.
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Maak verstopplek aantrekkelijk:</strong> Voer, water en speelgoed dichtbij</li>
                <li><strong>Verklein territorium:</strong> Terug naar alleen startkamer</li>
                <li><strong>Gebruik Feliway:</strong> Vermindert angst</li>
                <li><strong>Speel rustige muziek:</strong> Klassieke muziek kalmeert</li>
                <li><strong>Forceer niet:</strong> Sommige katten hebben 2-3 weken nodig</li>
                <li><strong>Professionele hulp:</strong> Kattengedragstherapeut na 3 weken geen vooruitgang</li>
              </ul>

              <div className="bg-cpAmber/20 dark:bg-cpAmber/10 border-l-4 border-cpAmber p-6 rounded-lg my-8">
                <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mb-3">
                  Succesverhaal: Luna's Transformatie
                </h3>
                <p className="text-cpCharcoal/80 dark:text-cpCream/80">
                  "We adopteerden Luna (3 jaar, zwerfkat uit asiel) in februari. De eerste 48 uur kwam ze haar bench niet uit. We volgden de startkamer methode strikt - bench open laten, alleen rustig binnenkomen om water te verversen. Dag 3 kwam ze eindelijk tevoorschijn, maar dook direct onder het bed.
                  <br /><br />
                  We brachten haar voer onder het bed en lazen elke avond hardop in de kamer. Dag 5 zag ik haar voor het eerst op de vensterbank zitten. Dag 7 durfde ze de rest van het huis te verkennen (met deur open naar startkamer als vluchtweg). Nu, 3 maanden later, slaapt ze elke nacht op ons bed en is ze de meest aanhankelijke kat die we ooit hadden. Geduld was de sleutel - we lieten haar tempo bepalen en forceerden niets."
                  <br /><br />
                  <em>- Emma uit Groningen</em>
                </p>
              </div>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Na Week 1: De Komende Maanden
              </h2>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Week 2-4: Verdere Integratie
              </h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Introduceer nieuwe ervariging gradueel:</strong> Stofzuiger (eerst uit kamer, later in zelfde kamer), bezoek</li>
                <li><strong>Begin grooming routine:</strong> Borstelen, nagels checken (niet knippen tenzij nodig)</li>
                <li><strong>Eerste dierenarts bezoek:</strong> Check-up, vaccinaties, chippen (week 2-3)</li>
                <li><strong>Voltooi huisdierenintroductie:</strong> Als je andere dieren hebt</li>
                <li><strong>Experimenteer met spelen:</strong> Vind favoriete spelmethode</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Maand 2-6: Persoonlijkheid Ontvouwt
              </h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Je kat voelt zich nu echt thuis</li>
                <li>Werkelijke persoonlijkheid wordt zichtbaar (kan afwijken van eerste indrukken)</li>
                <li>Mogelijke regressie/gedragsproblementest grenzen (normaal)</li>
                <li>Band wordt sterker - meer vertrouwen en affectie</li>
                <li>Overweeg outdoor toegang als gewenst (na castratie/sterilisatie en volledige vaccinaties)</li>
              </ul>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Speciale Overwegingen
              </h2>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Kitten vs Volwassen Kat vs Senior
              </h3>

              <div className="space-y-6">
                <div className="bg-cpSurface dark:bg-cpCharcoal/50 p-6 rounded-xl">
                  <h4 className="text-xl font-semibold mb-3">Kitten (8-16 weken):</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Past zich sneller aan (3-5 dagen typisch)</li>
                    <li>Meer energie en speelsheid, minder angstig</li>
                    <li>Vereist meer toezicht (veiligheid)</li>
                    <li>Meer frequent voeren (3-4x per dag)</li>
                    <li>Kleinere kattenbak met lage rand</li>
                  </ul>
                </div>

                <div className="bg-cpSurface dark:bg-cpCharcoal/50 p-6 rounded-xl">
                  <h4 className="text-xl font-semibold mb-3">Volwassen Kat (1-7 jaar):</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Standaard tijdlijn (7-14 dagen)</li>
                    <li>Meer zelfstandig maar mogelijk meer angstig</li>
                    <li>Voorgeschiedenis belangrijk (trauma, eerdere eigenaren)</li>
                    <li>Voer 2x per dag</li>
                    <li>Mogelijk al getrainde gewoontes (kattenbak, krabben)</li>
                  </ul>
                </div>

                <div className="bg-cpSurface dark:bg-cpCharcoal/50 p-6 rounded-xl">
                  <h4 className="text-xl font-semibold mb-3">Senior Kat (7+ jaar):</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Kan langer duren (2-4 weken)</li>
                    <li>Meer rust nodig, minder actief</li>
                    <li>Mogelijk gezondheidsproblemen (artritis, nierproblemen)</li>
                    <li>Kattenbak met lage instap essentieel</li>
                    <li>Extra warme, zachte slaapplekken</li>
                    <li>Dierenarts check binnen eerste week aanbevolen</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Rescue/Asiel Kat vs Fokker
              </h3>

              <p>
                <strong>Asiel/Zwerfkat:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Mogelijk trauma of verwaarlozing</li>
                <li>Onbekende voorgeschiedenis</li>
                <li>Kan extremer angstig zijn of juist direct aanhankelijk</li>
                <li>Extra geduld vereist - kan weken tot maanden duren</li>
                <li>Onschatbaar gevoel van reddingdaad</li>
              </ul>

              <p>
                <strong>Fokker/Privé:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Bekend voorgeschiedenis en socialisatie</li>
                <li>Meestal snellere aanpassing</li>
                <li>Minder verassingen qua gedrag/gezondheid</li>
                <li>Kan verwend zijn of slechte gewoontes hebben geleerd</li>
              </ul>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Conclusie: Geduld is de Sleutel
              </h2>

              <p>
                De eerste week met je nieuwe kat legt de <strong>fundamenten voor een levenslange band</strong>. Door je kat de tijd en ruimte te geven om in eigen tempo te wennen, bouw je vertrouwen op dat jaren zal duren. Onthoud dat elke kat uniek is - sommige voelen zich na 3 dagen thuis, andere hebben 3 weken nodig. Beide zijn normaal.
              </p>

              <p>
                <strong>Belangrijkste punten om te onthouden:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Gebruik een startkamer voor de eerste 3-5 dagen</li>
                <li>Laat je kat in zijn eigen tempo naar jou toekomen - forceer niets</li>
                <li>Vestig vanaf dag 1 een voorspelbaar dagritme</li>
                <li>Verstopgedrag is normaal en gezond de eerste week</li>
                <li>Niet eten tot 24 uur is ok, langer dan 48 uur: dierenarts</li>
                <li>Breidt territorium gradueel uit wanneer kat tekenen van comfort toont</li>
                <li>Geduld, rust en consequentie zijn essentieel</li>
                <li>Elke kat is anders - respecteer het unieke tempo van jouw kat</li>
              </ul>

              <p>
                Met deze aanpak geef je je nieuwe kat de beste start in zijn nieuwe leven bij jou. De investering van tijd en geduld in deze eerste cruciale week betaalt zich uit in een gelukkige, zelfverzekerde kat die je volledig vertrouwt. Geniet van deze bijzondere tijd - je bouwt herinneringen voor het leven!
              </p>

              <div className="bg-cpCoral/10 dark:bg-cpCoral/20 border-l-4 border-cpCoral p-6 rounded-lg my-8">
                <p className="text-cpCharcoal dark:text-cpCream font-semibold">
                  💡 Wil je meer leren over kattengedrag en communicatie? Bekijk onze gids over <Link href="/gids/huisdiergedrag/kattengedrag-begrijpen" className="text-cpCoral hover:underline">kattengedrag en lichaamstaal begrijpen</Link>.
                </p>
              </div>
            </div>

            {/* FAQ Section */}
            <section className="mt-12 mb-12">
              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mb-6">
                Veelgestelde Vragen
              </h2>
              <div className="space-y-4">
                <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow">
                  <summary className="font-semibold text-lg text-cpCharcoal dark:text-cpCream">
                    Hoe lang duurt het voordat een nieuwe kat gewend is?
                  </summary>
                  <p className="mt-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Gemiddelde tijdlijn: kittens 3-5 dagen, volwassen katten 7-14 dagen, rescue katten 2-4 weken, senior katten 2-4 weken. Eerste basiscomfort (eten, drinken, kattenbak) verschijnt meestal binnen 3-5 dagen. Volledig thuis voelen en persoonlijkheid tonen: 2-6 maanden. Factoren die snelheid beïnvloeden: leeftijd, voorgeschiedenis, karakter, huishoudsituatie. Forceer nooit snellere aanpassing - geduld is essentieel.
                  </p>
                </details>

                <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow">
                  <summary className="font-semibold text-lg text-cpCharcoal dark:text-cpCream">
                    Moet ik mijn nieuwe kat de eerste nachten in een aparte kamer houden?
                  </summary>
                  <p className="mt-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Ja, een startkamer is sterk aanbevolen voor minimaal de eerste 3-5 nachten. Voordelen: voorkomt overweldiging, biedt veilige thuisbasis, makkelijker om eetgewoontes/kattenbakergebruik te monitoren, voorkomt dat kat zich in gevaarlijke plekken verstopt. Kies een rustige, kleinere ruimte (kleine slaapkamer, studeerkamer) met alle essentials. Kat mag naar eigen slaapkamer zodra hij volledig comfortabel is (meestal week 2), maar startkamer blijft beschikbaar als veilige haven.
                  </p>
                </details>

                <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow">
                  <summary className="font-semibold text-lg text-cpCharcoal dark:text-cpCream">
                    Is het normaal dat mijn nieuwe kat niet eet of drinkt?
                  </summary>
                  <p className="mt-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Ja, tot 24 uur niet eten is normaal stressreactie. Zorgwekkend na 48 uur niet eten (kan leiden tot lever problemen). Drinken: 12-24 uur ok, langer dan 36 uur is gevaarlijk. Wat te doen: gebruik exact hetzelfde voer als vorige locatie, warm voer licht op voor sterkere geur, probeer stinkend voer (tonijn, sardines), plaats voer in verstopplek, gebruik plat bord i.p.v. diepe bak. Bel dierenarts na 48 uur niet eten of 36 uur niet drinken, eerder bij andere symptomen (braken, diarree, lethargie).
                  </p>
                </details>

                <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow">
                  <summary className="font-semibold text-lg text-cpCharcoal dark:text-cpCream">
                    Wanneer kan ik mijn nieuwe kat introduceren aan mijn andere huisdieren?
                  </summary>
                  <p className="mt-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Idealiter wacht je 2-3 weken voordat je begint met actieve introductie. Week 1: geuruitwisseling alleen (ruiken onder deur, wissel beddengoed). Week 2: visuele introductie via babygate of deuropening met hek, voer aan beide kanten. Week 3-4: gecontroleerde face-to-face ontmoeting met toezicht, kort (5-10 min), bouw langzaam op. Forceer nooit - laat dieren tempo bepalen. Bij honden: hond aan lijn eerste ontmoetingen, beloon rustig gedrag. Volledige integratie: 4-8 weken of langer. Gebruik Feliway voor beide dieren tijdens proces.
                  </p>
                </details>

                <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow">
                  <summary className="font-semibold text-lg text-cpCharcoal dark:text-cpCream">
                    Wat als mijn nieuwe kat zich alleen maar verstopt?
                  </summary>
                  <p className="mt-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Verstopgedrag is volledig normaal de eerste 3-7 dagen. Wat te doen: laat je kat met rust, forceer niet uit verstopplek, plaats voer/water bij verstopplek, gebruik Feliway diffuser, lees hardop in kamer (kat went aan je stem), gooi lekkernijen richting verstopplek, wees geduldig. Zorgwekkend als: na 5-7 dagen nog steeds 100% verstopt zonder eten/drinken, agressief bij benadering, tekenen van ziekte. Dan: kleinere startkamer, overweeg dierenarts check, raadpleeg kattengedragstherapeut na 3 weken. Sommige zeer schuwe katten hebben 2-4 weken nodig - dit is ok.
                  </p>
                </details>
              </div>
            </section>

            {/* Related Articles */}
            <section className="mt-12 mb-12">
              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mb-6">
                Gerelateerde Artikelen
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link
                  href="/gids/huisdiergedrag/kattengedrag-begrijpen"
                  className="block bg-cpSurface dark:bg-cpCharcoal/50 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mb-2">
                    Kattengedrag Begrijpen: Lichaamstaal en Signalen
                  </h3>
                  <p className="text-cpCharcoal/70 dark:text-cpCream/70">
                    Leer de taal van je nieuwe kat verstaan voor een betere band vanaf dag 1.
                  </p>
                </Link>

                <Link
                  href="/gids/kattenverzorging/kattenbak-training"
                  className="block bg-cpSurface dark:bg-cpCharcoal/50 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mb-2">
                    Kattenbak Training: Complete Gids
                  </h3>
                  <p className="text-cpCharcoal/70 dark:text-cpCream/70">
                    Zorg dat je nieuwe kat de kattenbak correct gebruikt vanaf het begin.
                  </p>
                </Link>

                <Link
                  href="/gids/kattenverzorging/kattenvoer-kiezen"
                  className="block bg-cpSurface dark:bg-cpCharcoal/50 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mb-2">
                    Het Juiste Kattenvoer Kiezen
                  </h3>
                  <p className="text-cpCharcoal/70 dark:text-cpCream/70">
                    Ontdek welk voer het beste is voor je nieuwe kat of kitten.
                  </p>
                </Link>

                <Link
                  href="/gids/puppies-kittens/kitten-socialisatie"
                  className="block bg-cpSurface dark:bg-cpCharcoal/50 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mb-2">
                    Kitten Socialisatie: De Eerste 16 Weken
                  </h3>
                  <p className="text-cpCharcoal/70 dark:text-cpCream/70">
                    Als je een kitten hebt, leer hoe je hem socialiseert voor optimaal gedrag.
                  </p>
                </Link>
              </div>
            </section>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8">
              <span className="px-4 py-2 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream rounded-full text-sm">
                nieuwe kat
              </span>
              <span className="px-4 py-2 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream rounded-full text-sm">
                kat wennen
              </span>
              <span className="px-4 py-2 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream rounded-full text-sm">
                kat introductie
              </span>
              <span className="px-4 py-2 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream rounded-full text-sm">
                kitten eerste dag
              </span>
              <span className="px-4 py-2 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream rounded-full text-sm">
                kat gewenning
              </span>
              <span className="px-4 py-2 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream rounded-full text-sm">
                startkamer
              </span>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              <BlogSidebarAd />

              {/* Quick Links */}
              <div className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-cpCharcoal dark:text-cpCream mb-4">
                  Op deze Pagina
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#voorbereiding" className="text-cpCoral hover:underline">
                      Voorbereiding
                    </a>
                  </li>
                  <li>
                    <a href="#dag-1" className="text-cpCoral hover:underline">
                      Dag 1: Aankomst
                    </a>
                  </li>
                  <li>
                    <a href="#dag-2-3" className="text-cpCoral hover:underline">
                      Dag 2-3: Vertrouwen
                    </a>
                  </li>
                  <li>
                    <a href="#dag-4-5" className="text-cpCoral hover:underline">
                      Dag 4-5: Uitbreiding
                    </a>
                  </li>
                  <li>
                    <a href="#dag-6-7" className="text-cpCoral hover:underline">
                      Dag 6-7: Routine
                    </a>
                  </li>
                  <li>
                    <a href="#problemen" className="text-cpCoral hover:underline">
                      Problemen Oplossen
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {/* Schema.org Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'Nieuwe Kat in Huis: De Eerste 7 Dagen',
            description: 'Complete dag-voor-dag gids voor de eerste week met je nieuwe kat. Van introductie tot gewenning.',
            image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&h=630&fit=crop',
            totalTime: 'P7D',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Dag 1: Aankomst en Startkamer',
                text: 'Breng je kat direct naar een rustige startkamer met alle essentials. Laat hem in eigen tempo uit de bench komen.'
              },
              {
                '@type': 'HowToStep',
                name: 'Dag 2-3: Vertrouwen Opbouwen',
                text: 'Bezoek de startkamer 3-4x per dag voor 15-20 minuten. Laat je kat naar jou toekomen, forceer niets.'
              },
              {
                '@type': 'HowToStep',
                name: 'Dag 4-5: Territorium Uitbreiden',
                text: 'Open de deur en laat je kat het huis verkennen in eigen tempo, met startkamer als veilige thuisbasis.'
              },
              {
                '@type': 'HowToStep',
                name: 'Dag 6-7: Routine Vestigen',
                text: 'Creëer een vast dagschema voor voeren, spelen en samenzijn. Begin met huisdierenintroductie als van toepassing.'
              }
            ],
            datePublished: '2025-01-15T13:00:00Z',
            author: {
              '@type': 'Organization',
              name: 'CutiePawsPedia'
            }
          }),
        }}
      />
    </main>
  );
}
