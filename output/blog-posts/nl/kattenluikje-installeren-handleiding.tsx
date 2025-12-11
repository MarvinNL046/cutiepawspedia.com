import type { Metadata } from 'next';
import Link from 'next/link';
import PhotoCredit from '@/components/PhotoCredit';
import BetweenContentAd from '@/components/ads/BetweenContentAd';
import BlogSidebarAd from '@/components/ads/BlogSidebarAd';

export const metadata: Metadata = {
  title: 'Kattenluikje Installeren: Complete Handleiding 2025 | CutiePawsPedia',
  description: 'Stap-voor-stap handleiding voor het installeren van een kattenluikje. Van deur tot muur, met chip of zonder. Complete gids met tips en fouten die je moet vermijden.',
  keywords: 'kattenluik, kattenluikje plaatsen, kattendeur, kattenluikje installeren, chipkattenluikje, kattenluik deur',
  openGraph: {
    title: 'Kattenluikje Installeren: Complete Handleiding | CutiePawsPedia',
    description: 'Leer hoe je een kattenluikje installeert in deur, muur of glas. Stap-voor-stap met chipherkenning en isolatie.',
    type: 'article',
    publishedTime: '2025-01-15T11:00:00Z',
    authors: ['CutiePawsPedia Team'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1529257414772-1960b7bea4eb?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Kat gebruikt kattenluikje om naar buiten te gaan'
      }
    ]
  }
};

export default function KattenluikjeInstallerenPage() {
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
                  Kattenverzorging
                </span>
                <time className="text-sm text-cpCharcoal/60 dark:text-cpCream/60">
                  15 januari 2025
                </time>
                <span className="text-sm text-cpCharcoal/60 dark:text-cpCream/60">
                  • 10 min leestijd
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-cpCharcoal dark:text-cpCream mb-6 leading-tight">
                Kattenluikje Installeren: Complete Handleiding 2025
              </h1>
            </header>

            {/* Featured Image */}
            <figure className="mb-8 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1529257414772-1960b7bea4eb?w=1200&h=600&fit=crop"
                alt="Kat gebruikt modern kattenluikje om naar buiten te gaan"
                className="w-full h-auto"
              />
              <PhotoCredit
                photographerName="Yuliya Ufimtseva"
                photographerUrl="https://unsplash.com/@yulivka"
                platform="Unsplash"
              />
            </figure>

            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-xl text-cpCharcoal/80 dark:text-cpCream/80 leading-relaxed">
                Een kattenluikje biedt je kat vrijheid om naar binnen en buiten te gaan wanneer hij wil, zonder dat jij constant de deur hoeft te openen. Modern kattenluikjes met chipherkenning zorgen er zelfs voor dat alleen jouw kat toegang heeft. In deze complete gids leer je stap voor stap hoe je een kattenluikje installeert in verschillende materialen, welk type het beste bij jou past, en welke veelgemaakte fouten je moet vermijden.
              </p>
            </div>

            {/* Main Content */}
            <div className="prose prose-lg max-w-none text-cpCharcoal dark:text-cpCream">
              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Soorten Kattenluikjes: Welke Kiezen?
              </h2>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                1. Handmatig Kattenluikje (€15-40)
              </h3>
              <p>
                Het meest eenvoudige type met een klapdeur die beide kanten op draait.
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Voordelen:</strong> Goedkoop, geen batterijen nodig, eenvoudig</li>
                <li><strong>Nadelen:</strong> Elk dier kan naar binnen, minder veilig</li>
                <li><strong>Beste voor:</strong> Rustige buitenwijk zonder zwerfkatten</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                2. Magnetisch Kattenluikje (€30-60)
              </h3>
              <p>
                Kat draagt magneet aan halsband die het slot opent.
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Voordelen:</strong> Selectieve toegang, relatief goedkoop</li>
                <li><strong>Nadelen:</strong> Magneet kan kwijtraken, halsband risico</li>
                <li><strong>Beste voor:</strong> Enkele kat, budget-oplossing met selectiviteit</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                3. Chipkattenluikje (€80-200) ⭐ AANBEVOLEN
              </h3>
              <p>
                Leest de chip van je kat (identificatiechip) en geeft alleen jouw kat toegang.
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Voordelen:</strong> Veiligste optie, geen halsband nodig, maximale controle</li>
                <li><strong>Nadelen:</strong> Duurder, batterijen nodig (6-12 maanden)</li>
                <li><strong>Beste voor:</strong> Meerwaarde, stedelijk gebied, maximale veiligheid</li>
                <li><strong>Top merken:</strong> SureFlap (€130-200), PetSafe (€80-120), Cat Mate (€90-150)</li>
              </ul>

              <BetweenContentAd />

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                4. Smart Kattenluikje met App (€180-350)
              </h3>
              <p>
                Hoogste technologie met smartphone app voor monitoring.
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Voordelen:</strong> Tijdschema's, notificaties, activiteitenlog, remote sluiten</li>
                <li><strong>Nadelen:</strong> Duur, WiFi nodig, technische problemen mogelijk</li>
                <li><strong>Beste voor:</strong> Tech-liefhebbers, controle op afstand, meerdere katten monitoren</li>
                <li><strong>Top model:</strong> SureFlap Microchip Connect (€250-350)</li>
              </ul>

              <div className="bg-cpSurface dark:bg-cpCharcoal/50 p-6 rounded-xl my-8">
                <h4 className="text-xl font-semibold mb-4">Onze Aanbeveling</h4>
                <p>
                  Voor de meeste kattenbezitters is een <strong>chipkattenluikje van het middenklasse</strong> (€100-150) de beste keuze. Het biedt uitstekende veiligheid zonder onnodige complexiteit. Populaire modellen:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li><strong>SureFlap Microchip Cat Flap:</strong> €130-160, betrouwbaar, tot 32 katten programmeerbaar</li>
                  <li><strong>PetSafe Microchip Cat Flap:</strong> €80-110, goede prijs-kwaliteit</li>
                  <li><strong>Cat Mate Elite Microchip:</strong> €90-120, stil mechanisme</li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Voorbereiding: Wat Heb Je Nodig?
              </h2>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Gereedschap en Materialen
              </h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Kattenluikje:</strong> Met alle meegeleverde onderdelen</li>
                <li><strong>Decoupeerzaag of stikzaag:</strong> Voor houten deur (€30-80)</li>
                <li><strong>Boorstoof:</strong> Voor starter gaten (€20-50)</li>
                <li><strong>Verschillende boren:</strong> Houtzaagkroon voor ronde hoeken (optioneel, €15-30)</li>
                <li><strong>Potlood en meetlint:</strong> Voor markeren</li>
                <li><strong>Waterpas:</strong> Voor rechte installatie</li>
                <li><strong>Schroefmachine:</strong> Voor bevestiging</li>
                <li><strong>Siliconenkit:</strong> Voor afdichting en weerbestendigheid (€5-10)</li>
                <li><strong>Kitspuit:</strong> Voor nette afwerking (€5-15)</li>
                <li><strong>Schuurpapier:</strong> Voor gladde randen (€3-5)</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Kosten Overzicht
              </h3>
              <div className="bg-cpAmber/10 p-6 rounded-xl mb-6">
                <ul className="space-y-2">
                  <li><strong>Kattenluikje:</strong> €15-350 (afhankelijk van type)</li>
                  <li><strong>Gereedschap (eenmalig):</strong> €60-180 (als je niets hebt)</li>
                  <li><strong>Materialen (kit, schroeven):</strong> €10-20</li>
                  <li><strong>Professionele installatie:</strong> €50-120 (optioneel)</li>
                  <li><strong>Totaal DIY:</strong> €85-550</li>
                  <li><strong>Totaal met installateur:</strong> €135-670</li>
                </ul>
              </div>

              <BetweenContentAd />

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Stap-voor-Stap: Kattenluikje in Houten Deur
              </h2>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Stap 1: Bepaal de Juiste Hoogte
              </h3>
              <p>
                De onderkant van het kattenluikje moet op de juiste hoogte zitten:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Meet je kat:</strong> Vanaf grond tot onderkant buik (niet borst)</li>
                <li><strong>Algemene regel:</strong> 10-15 cm vanaf de grond voor volwassen katten</li>
                <li><strong>Voor kittens:</strong> Start lager (5-8 cm) en pas aan naarmate ze groeien</li>
                <li><strong>Let op drempels:</strong> Houd rekening met hoogteverschil binnen/buiten</li>
                <li><strong>Meerdere katten:</strong> Richt je op de kleinste kat</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Stap 2: Markeer de Opening
              </h3>
              <ol className="list-decimal pl-6 space-y-3 mb-6">
                <li>Plak de meegeleverde papieren sjabloon op de deur op de juiste hoogte</li>
                <li>Gebruik een waterpas om te controleren of het recht hangt</li>
                <li>Trek de omtrek van de opening over met potlood</li>
                <li>Markeer de hoekpunten duidelijk</li>
                <li>Verwijder het sjabloon en controleer alle lijnen</li>
              </ol>
              <p>
                <strong>Tip:</strong> Meet twee keer, zaag één keer! Controleer alle afmetingen voordat je begint te zagen.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Stap 3: Boor Starter Gaten
              </h3>
              <ol className="list-decimal pl-6 space-y-3 mb-6">
                <li>Boor in elk hoekpunt een gat met een 10mm boor</li>
                <li>Boor door de hele deurdikte heen</li>
                <li>Deze gaten dienen als startpunt voor de zaag</li>
                <li>Houd de boormachine recht om scheve gaten te voorkomen</li>
              </ol>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Stap 4: Zaag de Opening
              </h3>
              <ol className="list-decimal pl-6 space-y-3 mb-6">
                <li>Steek het zaagblad van de decoupeerzaag door een van de geboorde gaten</li>
                <li>Zaag langzaam langs de gemarkeerde lijn van hoek naar hoek</li>
                <li>Houd de zaag recht en loodrecht op de deur</li>
                <li>Zaag binnenin de lijn (liever te klein dan te groot - je kunt altijd bijwerken)</li>
                <li>Ondersteun het uitgeznagde stuk voordat het loskomt om scheuren te voorkomen</li>
                <li>Herhaal aan de andere kant van de deur als deze dik is</li>
              </ol>
              <p>
                <strong>Veiligheidstip:</strong> Draag veiligheidsbril en werk op een stabiel oppervlak.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Stap 5: Schuur en Werk Af
              </h3>
              <ol className="list-decimal pl-6 space-y-3 mb-6">
                <li>Schuur alle randen glad met schuurpapier (korrel 120-180)</li>
                <li>Verwijder splinters en oneffenheden</li>
                <li>Maak de opening schoon van zaagsel en stof</li>
                <li>Pas het kattenluikje in de opening om de pasvorm te controleren</li>
                <li>Werk bij waar nodig (beter strak dan te los)</li>
              </ol>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Stap 6: Bevestig het Kattenluikje
              </h3>
              <ol className="list-decimal pl-6 space-y-3 mb-6">
                <li>Verdeel het kattenluikje in binnendeel en buitendeel</li>
                <li>Breng een dun lijntje siliconenkit aan rondom de opening aan beide kanten</li>
                <li>Plaats het buitenframe in de opening van buitenaf</li>
                <li>Plaats het binnenframe van binnenuit, zodat ze elkaar vastklemmen</li>
                <li>Draai de meegeleverde schroeven handvast (niet te strak - kan plastic beschadigen)</li>
                <li>Controleer of het kattenluikje waterpas en recht zit</li>
                <li>Verwijder overtollige kit met vochtige doek</li>
                <li>Laat de kit 24 uur uitharden voordat je het luikje gebruikt</li>
              </ol>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Stap 7: Test en Programmeer (Chipluikje)
              </h3>
              <ol className="list-decimal pl-6 space-y-3 mb-6">
                <li>Plaats batterijen (meestal 4x AA)</li>
                <li>Volg de instructies om de chip van je kat te programmeren</li>
                <li>Meestal: Houd programmeerknop ingedrukt terwijl kat door luikje gaat</li>
                <li>Test of alleen je kat toegang krijgt</li>
                <li>Stel eventuele tijdslots of vergrendeling in</li>
                <li>Controleer of het klapdeurje soepel beweegt</li>
              </ol>

              <BetweenContentAd />

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Kattenluikje in Muur Installeren
              </h2>

              <p>
                Een muurinstallatie is complexer dan een deur, maar biedt voordelen zoals betere isolatie en stevigere bevestiging.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Extra Benodigdheden
              </h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Slijptol of slagboormachine:</strong> Voor steenachtig materiaal</li>
                <li><strong>Steenzaagblad of diamantboor:</strong> Voor snijden door steen/beton</li>
                <li><strong>Tunnelverlengstuk:</strong> Voor dikke muren (€30-80, afhankelijk van dikte)</li>
                <li><strong>Extra cement of mortel:</strong> Voor afwerking (€10-20)</li>
                <li><strong>Isolatiemateriaal:</strong> Voor tunnel (€15-25)</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Werkwijze (Samenvatting)
              </h3>
              <ol className="list-decimal pl-6 space-y-3 mb-6">
                <li><strong>Markeer de opening:</strong> Zelfde proces als bij deur, maar aan buitenkant van muur</li>
                <li><strong>Boor pilotgaten:</strong> Door hele muurdikte heen om buitenkant te markeren</li>
                <li><strong>Zaag/boor de opening:</strong> Van binnen naar buiten EN van buiten naar binnen</li>
                <li><strong>Installeer tunnel:</strong> Voor muren dikker dan 7-10 cm</li>
                <li><strong>Bevestig kattenluikje:</strong> Met muurpluggen en lange schroeven</li>
                <li><strong>Werk af met cement:</strong> Vul gaten en kieren rondom tunnel</li>
                <li><strong>Isoleer de tunnel:</strong> Voorkom tocht en warmteverlies</li>
              </ol>

              <div className="bg-cpCoral/10 dark:bg-cpCoral/20 border-l-4 border-cpCoral p-6 rounded-lg my-8">
                <p className="text-cpCharcoal dark:text-cpCream font-semibold">
                  ⚠️ Let op: Muurinstallatie is complex. Overweeg een professional in te huren (€80-150) als je geen ervaring hebt met metselen of boren in beton. Verkeerde installatie kan structurele schade veroorzaken.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Kattenluikje in Glas Installeren
              </h2>

              <p>
                Installatie in glas (raam, glazen deur) vereist <strong>altijd een professional</strong>. Je kunt dit niet zelf doen zonder het glas te vervangen.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Twee Opties
              </h3>

              <div className="bg-cpSurface dark:bg-cpCharcoal/50 p-6 rounded-xl mb-6">
                <h4 className="text-xl font-semibold mb-4">Optie 1: Vervang het Glasvenster (€150-400)</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Glazenier maakt nieuw glas met uitgesneden opening voor kattenluikje</li>
                  <li>Professionele installatie van glas én kattenluikje</li>
                  <li>Goede isolatie mogelijk met dubbel glas</li>
                  <li><strong>Kosten:</strong> €200-400 afhankelijk van glastype en grootte</li>
                </ul>
              </div>

              <div className="bg-cpSurface dark:bg-cpCharcoal/50 p-6 rounded-xl mb-6">
                <h4 className="text-xl font-semibold mb-4">Optie 2: Tijdelijk Paneel (€50-150)</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Vervang raam tijdelijk met houten/PVC paneel met kattenluikje</li>
                  <li>Goedkoper maar minder mooi en slechtere isolatie</li>
                  <li>Geschikt voor huurwoningen (reversibel)</li>
                  <li>Kan zelf gemaakt worden met multiplex en verfbehandeling</li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Je Kat Leren het Kattenluikje Te Gebruiken
              </h2>

              <p>
                Sommige katten begrijpen het meteen, andere hebben training nodig.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Trainingsplan (1-2 Weken)
              </h3>

              <ol className="list-decimal pl-6 space-y-4 mb-6">
                <li>
                  <strong>Dag 1-3: Blokkeer klapdeur open</strong>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Gebruik tape of klemmen om het klapdeurje volledig open te houden</li>
                    <li>Laat je kat door de opening lopen zonder weerstand</li>
                    <li>Beloon met lekkernij elke keer dat hij erdoorheen gaat</li>
                  </ul>
                </li>
                <li>
                  <strong>Dag 4-7: Klapdeur half open</strong>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Laat het klapdeurje halverwege los</li>
                    <li>Moedig je kat aan om zelf tegen de deur te duwen</li>
                    <li>Blijf belonen bij elke succesvolle poging</li>
                  </ul>
                </li>
                <li>
                  <strong>Dag 8-14: Volledig functioneel</strong>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Laat het klapdeurje volledig los</li>
                    <li>Je kat moet nu zelf duwen om door te gaan</li>
                    <li>Blijf sporadisch belonen om gedrag te versterken</li>
                  </ul>
                </li>
              </ol>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Extra Trainingstips
              </h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Gebruik lekkernijen:</strong> Lokken van de andere kant</li>
                <li><strong>Kattenmuisje:</strong> Speel met speeltje door de opening</li>
                <li><strong>Tijd en geduld:</strong> Forceer nooit, laat kat in eigen tempo gaan</li>
                <li><strong>Beide richtingen oefenen:</strong> Naar buiten én naar binnen</li>
                <li><strong>Geen alternatief:</strong> Sluit andere uitgangen tijdelijk af</li>
                <li><strong>Kattengeluiden:</strong> Speel kattenmiauwgeluiden af buiten om nieuwsgierigheid te wekken</li>
              </ul>

              <div className="bg-cpAmber/20 dark:bg-cpAmber/10 border-l-4 border-cpAmber p-6 rounded-lg my-8">
                <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mb-3">
                  Succesverhaal: Milo's Leerproces
                </h3>
                <p className="text-cpCharcoal/80 dark:text-cpCream/80">
                  "Onze Milo (5 jaar, Noorse boskat) was zeer argwanend voor het nieuwe kattenluikje. De eerste week wilde hij er niet doorheen, zelfs niet als we het volledig openhielden. We plaatsten zijn voerbak aan de andere kant van het luikje tijdens eten, waardoor hij gedwongen was erdoorheen te gaan. Na 3 dagen deed hij het zelfstandig. Een week later gebruikte hij het zonder aarzeling, zelfs met het klapdeurje dicht. Nu, 6 maanden later, gaat hij tientallen keren per dag door. Het geheim was geduld en positieve bekrachtiging met lekkers."
                  <br /><br />
                  <em>- Lisa uit Utrecht</em>
                </p>
              </div>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                8 Veelgemaakte Fouten en Hoe Ze Te Vermijden
              </h2>

              <div className="space-y-6">
                <div className="bg-cpSurface dark:bg-cpCharcoal/50 p-6 rounded-xl">
                  <h4 className="text-xl font-semibold mb-3">1. Te Hoog of Te Laag Geïnstalleerd</h4>
                  <p><strong>Probleem:</strong> Kat kan er niet comfortabel doorheen.</p>
                  <p><strong>Oplossing:</strong> Meet je kat vanaf grond tot buik, niet borst. 10-15 cm vanaf grond is ideaal.</p>
                </div>

                <div className="bg-cpSurface dark:bg-cpCharcoal/50 p-6 rounded-xl">
                  <h4 className="text-xl font-semibold mb-3">2. Geen Afdichting Met Kit</h4>
                  <p><strong>Probleem:</strong> Tocht, warmteverlies, waterschade.</p>
                  <p><strong>Oplossing:</strong> Gebruik altijd weerbestendige siliconenkit rondom alle naden.</p>
                </div>

                <div className="bg-cpSurface dark:bg-cpCharcoal/50 p-6 rounded-xl">
                  <h4 className="text-xl font-semibold mb-3">3. Opening Te Groot Gezaagd</h4>
                  <p><strong>Probleem:</strong> Kattenluikje past niet, grote gaten rondom.</p>
                  <p><strong>Oplossing:</strong> Zaag altijd binnenin de lijn. Je kunt uitbreiden maar niet krimpen.</p>
                </div>

                <div className="bg-cpSurface dark:bg-cpCharcoal/50 p-6 rounded-xl">
                  <h4 className="text-xl font-semibold mb-3">4. Verkeerde Richting Klapdeur</h4>
                  <p><strong>Probleem:</strong> Klapdeur zwaait verkeerde kant op.</p>
                  <p><strong>Oplossing:</strong> Let op installatie-instructies - buitenframe heeft meestal label "OUTSIDE".</p>
                </div>

                <div className="bg-cpSurface dark:bg-cpCharcoal/50 p-6 rounded-xl">
                  <h4 className="text-xl font-semibold mb-3">5. Geen Tunnelverlengstuk Bij Dikke Muur</h4>
                  <p><strong>Probleem:</strong> Kat kan niet door diepe opening, tocht.</p>
                  <p><strong>Oplossing:</strong> Bij muren >7 cm altijd tunnelverlengstuk gebruiken.</p>
                </div>

                <div className="bg-cpSurface dark:bg-cpCharcoal/50 p-6 rounded-xl">
                  <h4 className="text-xl font-semibold mb-3">6. Chip Niet Juist Geprogrammeerd</h4>
                  <p><strong>Probleem:</strong> Luikje opent niet voor je kat.</p>
                  <p><strong>Oplossing:</strong> Volg programmeerinstructies exact, test uitgebreid, check batterijen.</p>
                </div>

                <div className="bg-cpSurface dark:bg-cpCharcoal/50 p-6 rounded-xl">
                  <h4 className="text-xl font-semibold mb-3">7. Forceren Bij Training</h4>
                  <p><strong>Probleem:</strong> Kat ontwikkelt angst voor het luikje.</p>
                  <p><strong>Oplossing:</strong> Geduld en positieve bekrachtiging. Laat kat in eigen tempo leren.</p>
                </div>

                <div className="bg-cpSurface dark:bg-cpCharcoal/50 p-6 rounded-xl">
                  <h4 className="text-xl font-semibold mb-3">8. Geen Onderhoud</h4>
                  <p><strong>Probleem:</strong> Luikje gaat piepen, batterijen leeglopen onverwacht.</p>
                  <p><strong>Oplossing:</strong> Check batterijen om de 6 maanden, smeer scharnieren jaarlijks.</p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Onderhoud en Problemen Oplossen
              </h2>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Regulier Onderhoud
              </h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Maandelijks:</strong> Reinig klapdeur en frame met vochtige doek</li>
                <li><strong>Elk half jaar:</strong> Vervang batterijen (zelfs als ze nog werken)</li>
                <li><strong>Jaarlijks:</strong> Smeer scharnieren met siliconenspray, check kit op scheuren</li>
                <li><strong>Check regelmatig:</strong> Magnetische strips (niet beschadigd), afdichting intact</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Veelvoorkomende Problemen
              </h3>

              <div className="space-y-4">
                <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 cursor-pointer">
                  <summary className="font-semibold text-lg">Luikje opent niet voor mijn kat</summary>
                  <ul className="mt-4 list-disc pl-6 space-y-2">
                    <li>Check batterijen (vervang voor de zekerheid)</li>
                    <li>Herprogrammeer de chip van je kat</li>
                    <li>Controleer of de chip van je kat werkt (scan bij dierenarts)</li>
                    <li>Zorg dat je kat dicht genoeg bij sensor komt (5-7 cm)</li>
                  </ul>
                </details>

                <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 cursor-pointer">
                  <summary className="font-semibold text-lg">Klapdeur is te stijf of te los</summary>
                  <ul className="mt-4 list-disc pl-6 space-y-2">
                    <li>De meeste luikjes hebben een instelbare weerstandsknop</li>
                    <li>Draai rechtsom voor meer weerstand, linksom voor minder</li>
                    <li>Te stijf? Smeer scharnieren met siliconenspray</li>
                    <li>Te los? Vervang magnetische strips</li>
                  </ul>
                </details>

                <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 cursor-pointer">
                  <summary className="font-semibold text-lg">Tocht komt door het luikje</summary>
                  <ul className="mt-4 list-disc pl-6 space-y-2">
                    <li>Check of afdichtingsrubber intact is (vervang indien nodig)</li>
                    <li>Versterk magnetische sluiting met extra magneet</li>
                    <li>Breng extra kit aan rond het frame</li>
                    <li>Overweeg borstelsluiting toevoegen voor extra isolatie</li>
                  </ul>
                </details>

                <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 cursor-pointer">
                  <summary className="font-semibold text-lg">Andere katten komen binnen</summary>
                  <ul className="mt-4 list-disc pl-6 space-y-2">
                    <li>Chipluikje: Controleer dat alleen jouw katten geprogrammeerd zijn</li>
                    <li>Test of het luikje daadwerkelijk vergrendelt voor onbekende katten</li>
                    <li>Stel tijdslot in (alleen open tijdens bepaalde uren)</li>
                    <li>Upgrade naar dubbel vergrendelingssysteem</li>
                  </ul>
                </details>
              </div>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Conclusie: Vrijheid Voor Je Kat, Gemak Voor Jou
              </h2>

              <p>
                Een goed geïnstalleerd kattenluikje biedt <strong>jaren van gemak en vrijheid</strong>. Met de juiste voorbereiding, gereedschap en geduld kun je dit project zelf succesvol afronden en honderden euro's besparen op professionele installatie.
              </p>

              <p>
                <strong>Belangrijkste punten om te onthouden:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Kies een <strong>chipkattenluikje</strong> voor optimale veiligheid (€100-150)</li>
                <li>Meet twee keer, zaag één keer - juiste hoogte is cruciaal</li>
                <li>Gebruik altijd siliconenkit voor weerbestendigheid</li>
                <li>Bij twijfel over muur/glas installatie: schakel een professional in</li>
                <li>Train je kat geduldig in stappen - de meeste katten leren binnen 1-2 weken</li>
                <li>Onderhoud regelmatig voor langdurige werking</li>
              </ul>

              <p>
                Met een kattenluikje geef je je kat de vrijheid om zijn natuurlijke gedrag te uitleven terwijl jij niet meer constant de deur hoeft te openen. Een investering die zichzelf dubbel en dwars terugbetaalt in gemak en kattentevredenheid!
              </p>

              <div className="bg-cpCoral/10 dark:bg-cpCoral/20 border-l-4 border-cpCoral p-6 rounded-lg my-8">
                <p className="text-cpCharcoal dark:text-cpCream font-semibold">
                  💡 Overweeg je je kat binnen te houden? Lees onze gids over <Link href="/blog/indoor-outdoor-kat-voordelen" className="text-cpCoral hover:underline">indoor vs outdoor katten</Link> om een weloverwogen keuze te maken.
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
                    Hoeveel kost het om een kattenluikje te laten installeren?
                  </summary>
                  <p className="mt-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Kosten variëren per type installatie: Houten deur €50-80, PVC deur €60-100, muur €80-150, glas €150-400 (incl. nieuw glas met opening). Totale kosten inclusief kattenluikje (chipversie €100-150): deur €150-230, muur €180-300, glas €250-550. DIY bespaart €50-120 aan arbeidskosten, maar vereist gereedschap (€60-180 eenmalig).
                  </p>
                </details>

                <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow">
                  <summary className="font-semibold text-lg text-cpCharcoal dark:text-cpCream">
                    Welk kattenluikje is het beste?
                  </summary>
                  <p className="mt-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Voor de meeste kattenbezitters is de SureFlap Microchip Cat Flap (€130-160) de beste keuze: betrouwbare chipherkenning, tot 32 katten programmeerbaar, duurzaam, goede isolatie, lange batterijlevensduur. Budget alternatief: PetSafe Microchip Cat Flap (€80-110). Premium keuze met app: SureFlap Microchip Connect (€250-350) voor tijdschema's en monitoring. Vermijd eenvoudige handmatige luikjes (€15-40) in stedelijke gebieden vanwege veiligheidsrisico's.
                  </p>
                </details>

                <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow">
                  <summary className="font-semibold text-lg text-cpCharcoal dark:text-cpCream">
                    Hoe lang duurt installatie van een kattenluikje?
                  </summary>
                  <p className="mt-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Tijdsduur hangt af van materiaal en ervaring: Houten deur (1-2 uur voor eerste keer, 45 min met ervaring), PVC deur (1.5-2 uur, voorzichtiger zagen nodig), muur (3-5 uur, inclusief tunnelinstallatie en afwerking), glas (professional, 2-4 uur voor glas vervangen + installatie). Voorbereiding (gereedschap verzamelen, meten): 30-60 min. Training van je kat: 1-2 weken. Plan een vrije dag voor eerste installatie.
                  </p>
                </details>

                <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow">
                  <summary className="font-semibold text-lg text-cpCharcoal dark:text-cpCream">
                    Kan ik een kattenluikje zelf installeren of moet ik een professional inhuren?
                  </summary>
                  <p className="mt-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Je kunt het zelf doen in: houten deur (met basaal gereedschap en instructies), PVC deur (met zorg, plastic kan scheuren). Schakel professional in voor: muur (complex, risico op structurele schade, €80-150), glas (vereist altijd nieuw glas, €150-400), huurwoning (reversibiliteit en aansprakelijkheid), geen ervaring met elektrisch gereedschap. De meeste kattenbezitters kunnen met geduld en deze handleiding succesvol een deurinstallatie doen. Totale besparing DIY: €50-120.
                  </p>
                </details>

                <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow">
                  <summary className="font-semibold text-lg text-cpCharcoal dark:text-cpCream">
                    Wat als mijn kat niet door het kattenluikje wil?
                  </summary>
                  <p className="mt-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Dit is normaal en oplosbaar met training: Week 1: houd klapdeur volledig open, lok met lekkernijen, beloon elk gebruik. Week 2: laat klapdeur halverwege los, moedig zelf duwen aan. Week 3: volledig functioneel, blijf sporadisch belonen. Extra tips: voerbak aan andere kant plaatsen, speelgoed door opening spelen, geen alternatieve uitgangen, kattengeluiden buiten afspelen. 90% van de katten leert binnen 1-2 weken. Bij extreme angst: raadpleeg kattengedragstherapeut.
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
                  href="/blog/indoor-outdoor-kat-voordelen"
                  className="block bg-cpSurface dark:bg-cpCharcoal/50 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mb-2">
                    Indoor vs Outdoor Kat: Voor- en Nadelen
                  </h3>
                  <p className="text-cpCharcoal/70 dark:text-cpCream/70">
                    Ontdek of je kat binnen moet blijven of naar buiten mag voor een weloverwogen beslissing.
                  </p>
                </Link>

                <Link
                  href="/gids/kattenverzorging/kat-chippen-kosten"
                  className="block bg-cpSurface dark:bg-cpCharcoal/50 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mb-2">
                    Kat Chippen: Kosten en Procedure
                  </h3>
                  <p className="text-cpCharcoal/70 dark:text-cpCream/70">
                    Alles over het chippen van je kat, nodig voor chipkattenluikjes.
                  </p>
                </Link>

                <Link
                  href="/gids/kattenverzorging/kattenveilige-tuin"
                  className="block bg-cpSurface dark:bg-cpCharcoal/50 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mb-2">
                    Kattenveilige Tuin Maken: Complete Gids
                  </h3>
                  <p className="text-cpCharcoal/70 dark:text-cpCream/70">
                    Maak je tuin veilig voor je kat met kattennetten en catio's.
                  </p>
                </Link>

                <Link
                  href="/gids/huisdiergedrag/kattengedrag-begrijpen"
                  className="block bg-cpSurface dark:bg-cpCharcoal/50 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mb-2">
                    Kattengedrag Begrijpen
                  </h3>
                  <p className="text-cpCharcoal/70 dark:text-cpCream/70">
                    Leer je kat beter begrijpen om training en gewenning makkelijker te maken.
                  </p>
                </Link>
              </div>
            </section>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8">
              <span className="px-4 py-2 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream rounded-full text-sm">
                kattenluik
              </span>
              <span className="px-4 py-2 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream rounded-full text-sm">
                kattenluikje plaatsen
              </span>
              <span className="px-4 py-2 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream rounded-full text-sm">
                kattendeur
              </span>
              <span className="px-4 py-2 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream rounded-full text-sm">
                chipkattenluikje
              </span>
              <span className="px-4 py-2 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream rounded-full text-sm">
                DIY huisdieren
              </span>
              <span className="px-4 py-2 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream rounded-full text-sm">
                kattenveiligheid
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
                    <a href="#soorten" className="text-cpCoral hover:underline">
                      Soorten Kattenluikjes
                    </a>
                  </li>
                  <li>
                    <a href="#voorbereiding" className="text-cpCoral hover:underline">
                      Voorbereiding
                    </a>
                  </li>
                  <li>
                    <a href="#installatie-deur" className="text-cpCoral hover:underline">
                      Installatie in Deur
                    </a>
                  </li>
                  <li>
                    <a href="#installatie-muur" className="text-cpCoral hover:underline">
                      Installatie in Muur
                    </a>
                  </li>
                  <li>
                    <a href="#training" className="text-cpCoral hover:underline">
                      Kat Trainen
                    </a>
                  </li>
                  <li>
                    <a href="#fouten" className="text-cpCoral hover:underline">
                      Veelgemaakte Fouten
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
            name: 'Kattenluikje Installeren: Complete Handleiding',
            description: 'Stap-voor-stap handleiding voor het installeren van een kattenluikje. Van deur tot muur, met chip of zonder.',
            image: 'https://images.unsplash.com/photo-1529257414772-1960b7bea4eb?w=1200&h=630&fit=crop',
            totalTime: 'PT2H',
            estimatedCost: {
              '@type': 'MonetaryAmount',
              currency: 'EUR',
              value: '150'
            },
            tool: [
              { '@type': 'HowToTool', name: 'Decoupeerzaag' },
              { '@type': 'HowToTool', name: 'Boormachine' },
              { '@type': 'HowToTool', name: 'Siliconenkit' }
            ],
            supply: [
              { '@type': 'HowToSupply', name: 'Kattenluikje met chip' },
              { '@type': 'HowToSupply', name: 'Schroeven' },
              { '@type': 'HowToSupply', name: 'Kit' }
            ],
            step: [
              {
                '@type': 'HowToStep',
                name: 'Bepaal de juiste hoogte',
                text: 'Meet je kat vanaf grond tot onderkant buik. Algemene regel: 10-15 cm vanaf de grond.'
              },
              {
                '@type': 'HowToStep',
                name: 'Markeer de opening',
                text: 'Gebruik het meegeleverde sjabloon en markeer de opening met potlood.'
              },
              {
                '@type': 'HowToStep',
                name: 'Boor starter gaten',
                text: 'Boor in elk hoekpunt een gat met een 10mm boor door de hele deurdikte.'
              },
              {
                '@type': 'HowToStep',
                name: 'Zaag de opening',
                text: 'Zaag langzaam langs de gemarkeerde lijn met een decoupeerzaag.'
              },
              {
                '@type': 'HowToStep',
                name: 'Bevestig het kattenluikje',
                text: 'Breng siliconenkit aan, plaats het frame en draai schroeven handvast.'
              }
            ],
            datePublished: '2025-01-15T11:00:00Z',
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
