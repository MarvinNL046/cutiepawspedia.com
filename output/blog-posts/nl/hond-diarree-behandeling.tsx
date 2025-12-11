import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import PhotoCredit from '@/components/PhotoCredit';
import BetweenContentAd from '@/components/BetweenContentAd';
import BlogSidebarAd from '@/components/BlogSidebarAd';

export const metadata: Metadata = {
  title: 'Hond heeft diarree: oorzaken, behandeling en preventie | CutiePawsPedia',
  description: 'Jouw hond heeft diarree? Ontdek de oorzaken, effectieve behandelingen en preventiemogelijkheden. Praktisch advies van experts voor een gezonde hondendarm.',
  keywords: 'hond diarree, dunne ontlasting hond, hond buikpijn, diarree hond behandelen, hond waterdunne ontlasting',
  openGraph: {
    title: 'Hond heeft diarree: oorzaken, behandeling en preventie',
    description: 'Praktisch advies over diarree bij honden: van oorzaken tot effectieve behandeling en preventie.',
    images: ['/images/blog/hond-diarree-behandeling.jpg'],
    type: 'article',
  },
};

export default function HondDiarreeBehandeling() {
  return (
    <div className="min-h-screen bg-cpCream dark:bg-cpCharcoal">
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block bg-cpCoral text-white px-4 py-1 rounded-full text-sm font-semibold">
                Dierengezondheid
              </span>
            </div>

            {/* Article Header */}
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-cpCharcoal dark:text-cpCream mb-4">
                Hond heeft diarree: oorzaken, behandeling en preventie
              </h1>
              <div className="flex items-center text-cpCharcoal/70 dark:text-cpCream/70 text-sm space-x-4">
                <time dateTime="2025-01-15">15 januari 2025</time>
                <span>•</span>
                <span>8 min leestijd</span>
              </div>
            </header>

            {/* Featured Image */}
            <div className="mb-8 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=600&fit=crop"
                alt="Zieke hond rust op deken"
                width={1200}
                height={600}
                className="w-full h-auto"
                priority
              />
              <PhotoCredit
                photographerName="Karsten Winegeart"
                photographerUrl="https://unsplash.com/@karsten116"
                platform="Unsplash"
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-xl text-cpCharcoal/80 dark:text-cpCream/80 mb-6">
                Diarree bij honden is een van de meest voorkomende gezondheidsproblemen waar baasjes mee te maken krijgen. Het kan variëren van een eenmalige zachte ontlasting tot ernstige, langdurige buikproblemen. In dit artikel ontdek je alles over de oorzaken, behandelingen en hoe je diarree bij je hond kunt voorkomen.
              </p>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Wat is diarree bij honden precies?
              </h2>
              <p>
                Diarree bij honden betekent dat je hond dunne, waterige of ongeformde ontlasting heeft. De frequentie kan toenemen en je hond moet vaker naar buiten. Er zijn twee hoofdvormen:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Acute diarree:</strong> komt plotseling en duurt korter dan 2 weken</li>
                <li><strong>Chronische diarree:</strong> duurt langer dan 2-3 weken</li>
              </ul>
              <p>
                Diarree is geen ziekte op zich, maar een symptoom dat aangeeft dat er iets niet in orde is met het spijsverteringssysteem van je hond. Het kan variëren van mild en tijdelijk tot ernstig en levensgevaarlijk, afhankelijk van de onderliggende oorzaak.
              </p>

              <BetweenContentAd />

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                De meest voorkomende oorzaken van diarree
              </h2>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                1. Voedingsgerelateerde oorzaken
              </h3>
              <p>
                <strong>Plotselinge voedingsverandering</strong> is een veelvoorkomende oorzaak. Als je te snel van voeding wisselt, kan de darm van je hond het niet goed verwerken. Ook kan je hond diarree krijgen van:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Bedorven voedsel of restjes van tafel</li>
                <li>Het eten van vuilnis of onverteerbare voorwerpen</li>
                <li>Voedselallergieën of -intoleranties</li>
                <li>Te veel vet in het voer</li>
                <li>Giftige planten of voedingsmiddelen (chocolade, uien, druiven)</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                2. Infecties en parasieten
              </h3>
              <p>
                Bacteriële, virale of parasitaire infecties zijn belangrijke oorzaken van diarree:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Parvo-virus:</strong> zeer besmettelijk en gevaarlijk, vooral bij puppy's</li>
                <li><strong>Wormen:</strong> spoelwormen, lintwormen, zweepwormen</li>
                <li><strong>Giardia:</strong> microscopische parasiet die darminfecties veroorzaakt</li>
                <li><strong>Salmonella of E. coli:</strong> bacteriële infecties</li>
                <li><strong>Rotavirus:</strong> vooral bij jonge honden</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                3. Medische aandoeningen
              </h3>
              <p>
                Verschillende ziekten kunnen chronische diarree veroorzaken:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Inflammatoire darmziekte (IBD):</strong> chronische ontsteking van de darmwand</li>
                <li><strong>Pancreatitis:</strong> ontsteking van de alvleesklier</li>
                <li><strong>Lever- of nierziekten:</strong> beïnvloeden de spijsvertering</li>
                <li><strong>Exocriene pancreasinsufficiëntie:</strong> te weinig spijsverteringsenzymen</li>
                <li><strong>Kanker:</strong> darmtumoren of lymfoom</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                4. Stress en gedragsfactoren
              </h3>
              <p>
                Emotionele stress kan ook diarree veroorzaken. Denk aan:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Verhuizing of veranderingen in de omgeving</li>
                <li>Scheiding van het baasje</li>
                <li>Kennismaken met nieuwe huisdieren</li>
                <li>Luid geluid (vuurwerk, onweer)</li>
                <li>Dierenarts- of kennelbezoek</li>
              </ul>

              <BetweenContentAd />

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Wanneer moet je naar de dierenarts?
              </h2>
              <p>
                Niet alle diarree vereist direct een bezoek aan de dierenarts. Ga echter wel direct naar de dierenarts als je hond:
              </p>
              <div className="bg-cpCoral/10 border-l-4 border-cpCoral p-6 rounded-r-lg mb-6">
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Bloed in de ontlasting heeft</strong> (rood of zwart/teerachtig)</li>
                  <li><strong>Braakt</strong> en niet wil eten of drinken</li>
                  <li><strong>Slap en lusteloos is</strong> of pijn lijkt te hebben</li>
                  <li><strong>Koorts heeft</strong> (temperatuur boven 39,5°C)</li>
                  <li><strong>Een puppy</strong> of <strong>senior hond</strong> is (kwetsbaarder voor uitdroging)</li>
                  <li><strong>Diarree heeft die langer dan 24-48 uur aanhoudt</strong></li>
                  <li><strong>Tekenen van uitdroging</strong> vertoont (droge neus, verminderde huidelasticiteit)</li>
                  <li><strong>Een onderliggende chronische ziekte heeft</strong></li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Effectieve behandeling van diarree bij honden
              </h2>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Thuisbehandeling voor milde diarree
              </h3>
              <p>
                Als je hond zich verder gezond gedraagt en geen alarmerende symptomen heeft, kun je deze stappen proberen:
              </p>

              <div className="bg-cpAmber/10 border-l-4 border-cpAmber p-6 rounded-r-lg mb-6">
                <h4 className="font-bold text-lg mb-3">Stap 1: Vasten (12-24 uur)</h4>
                <p className="mb-3">
                  Geef je volwassen hond 12-24 uur geen voer om de darm tot rust te laten komen. Puppy's mogen maximaal 4-6 uur vasten. Zorg wel dat je hond altijd toegang heeft tot schoon water.
                </p>

                <h4 className="font-bold text-lg mb-3">Stap 2: Zachte voeding introduceren</h4>
                <p className="mb-3">
                  Begin met kleine porties zacht, verteerbaar voedsel:
                </p>
                <ul className="list-disc pl-6 mb-3">
                  <li><strong>Gekookte rijst met gekookte kip</strong> (zonder vel en vet)</li>
                  <li><strong>Gekookte aardappel met magere kwark</strong></li>
                  <li><strong>Speciaal veterinair dieetvoer</strong> voor darmproblemen</li>
                  <li><strong>Pompoen uit blik</strong> (niet de gekruide taartmix!)</li>
                </ul>

                <h4 className="font-bold text-lg mb-3">Stap 3: Geleidelijk terugkeren naar normaal voer</h4>
                <p>
                  Als de ontlasting verbetert, ga je geleidelijk terug naar het normale voer. Meng over 3-5 dagen steeds meer normaal voer door het zachte dieet tot je volledig terug bent bij het normale voer.
                </p>
              </div>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Probiotica en ondersteunende middelen
              </h3>
              <p>
                Probiotica kunnen helpen de darmflora te herstellen. Er zijn speciale hondenspecifieke probiotica verkrijgbaar bij dierenwinkels en dierenartsen. Ook kunnen natuurlijke middelen zoals:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Slippery elm bark:</strong> verzachtend voor de darmwand</li>
                <li><strong>Kaoline-pectine:</strong> helpt ontlasting te binden</li>
                <li><strong>Kurkuma:</strong> ontstekingsremmend (in kleine hoeveelheden)</li>
              </ul>
              <p className="italic text-cpCharcoal/70 dark:text-cpCream/70">
                Let op: Raadpleeg altijd eerst je dierenarts voordat je supplementen of alternatieve behandelingen geeft.
              </p>

              <BetweenContentAd />

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Medische behandeling door de dierenarts
              </h3>
              <p>
                Bij ernstigere gevallen of chronische diarree kan de dierenarts verschillende behandelingen voorschrijven:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Infuustherapie:</strong> bij uitdroging</li>
                <li><strong>Antibiotica:</strong> bij bacteriële infecties</li>
                <li><strong>Ontwormingsmiddelen:</strong> bij parasieten</li>
                <li><strong>Anti-ontstekingsmiddelen:</strong> bij IBD</li>
                <li><strong>Specifiek dieetvoer:</strong> voor langdurige darmproblemen</li>
                <li><strong>Medicatie tegen misselijkheid:</strong> om braken te stoppen</li>
              </ul>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Preventie: diarree voorkomen bij je hond
              </h2>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                1. Consistente voeding
              </h3>
              <p>
                Geef je hond hoogwaardig voer en verander niet plotseling van merk. Als je wilt wisselen, doe dit dan geleidelijk over 7-10 dagen door het nieuwe voer steeds meer te mengen met het oude.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                2. Regelmatige ontwormingskuren
              </h3>
              <p>
                Ontworm je hond volgens het advies van je dierenarts. Volwassen honden meestal 4x per jaar, puppy's vaker. Dit voorkomt parasitaire infecties die diarree kunnen veroorzaken.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                3. Vaccinaties up-to-date houden
              </h3>
              <p>
                Zorg dat je hond gevaccineerd is tegen virussen zoals parvo. Dit is vooral belangrijk voor puppy's en honden die veel contact hebben met andere honden.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                4. Let op wat je hond eet
              </h3>
              <p>
                Voorkom dat je hond:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Vuilnis eet of in de compostbak graaft</li>
                <li>Dingen van de grond eet tijdens wandelingen</li>
                <li>Restjes van tafel krijgt (vooral vette of gekruide gerechten)</li>
                <li>Toegang heeft tot giftige planten of voedingsmiddelen</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                5. Stressmanagement
              </h3>
              <p>
                Verminder stress bij je hond door:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Een vaste dagelijkse routine aan te houden</li>
                <li>Geleidelijk te wennen aan nieuwe situaties</li>
                <li>Voldoende beweging en mentale stimulatie te bieden</li>
                <li>Een veilige, rustige plek te creëren waar je hond zich kan terugtrekken</li>
              </ul>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Speciale aandachtspunten per levensfase
              </h2>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Diarree bij puppy's
              </h3>
              <p>
                Puppy's zijn extra gevoelig voor diarree en dehydratie. Ze hebben nog een immatuur immuunsysteem en kunnen snel achteruit gaan. Bij puppy's is het extra belangrijk om:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Niet langer dan 4-6 uur te vasten</li>
                <li>Direct naar de dierenarts te gaan bij aanhoudende diarree</li>
                <li>Extra alert te zijn op tekenen van uitdroging</li>
                <li>Regelmatig te ontwormen en te vaccineren</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Diarree bij oude honden
              </h3>
              <p>
                Senior honden kunnen ook sneller ernstig ziek worden van diarree. Bij oudere honden moet je extra opletten omdat diarree een symptoom kan zijn van ernstigere onderliggende aandoeningen zoals nierziekten, leverzieken of kanker.
              </p>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Conclusie: Luister naar je hond
              </h2>
              <p>
                Diarree bij honden is vaak mild en tijdelijk, maar kan soms wijzen op ernstigere problemen. Als eigenaar ken jij je hond het beste. Vertrouw op je gevoel en zoek tijdig hulp als je hond zich niet goed voelt of als de diarree langer aanhoudt.
              </p>
              <p>
                Met de juiste aanpak, goede voeding en preventieve zorg kun je veel darmklachten voorkomen en je hond een gezond en gelukkig leven bieden.
              </p>

              {/* FAQ Section */}
              <div className="mt-12 bg-cpSurface dark:bg-cpCharcoal/50 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mb-6">
                  Veelgestelde vragen
                </h2>
                <div className="space-y-4">
                  <details className="group">
                    <summary className="font-semibold text-lg cursor-pointer text-cpCharcoal dark:text-cpCream hover:text-cpCoral transition-colors">
                      Hoe lang mag diarree bij een hond duren?
                    </summary>
                    <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80 pl-4">
                      Milde diarree mag maximaal 24-48 uur duren. Als de diarree langer aanhoudt, je hond bloed in de ontlasting heeft, braakt, of slap en lusteloos is, moet je direct naar de dierenarts.
                    </p>
                  </details>

                  <details className="group">
                    <summary className="font-semibold text-lg cursor-pointer text-cpCharcoal dark:text-cpCream hover:text-cpCoral transition-colors">
                      Mag ik mijn hond menselijke anti-diarree middelen geven?
                    </summary>
                    <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80 pl-4">
                      Nee, geef nooit menselijke medicijnen aan je hond zonder overleg met de dierenarts. Sommige medicijnen die voor mensen veilig zijn, kunnen giftig zijn voor honden. De dierenarts kan veilige alternatieven voorschrijven.
                    </p>
                  </details>

                  <details className="group">
                    <summary className="font-semibold text-lg cursor-pointer text-cpCharcoal dark:text-cpCream hover:text-cpCoral transition-colors">
                      Wat is het beste thuisdieet bij diarree?
                    </summary>
                    <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80 pl-4">
                      Een zacht dieet van gekookte rijst met gekookte kip (zonder vel en vet) is het meest effectief. Begin met kleine porties en bouw dit geleidelijk op. Ook gekookte aardappel met magere kwark of speciaal veterinair dieetvoer werkt goed.
                    </p>
                  </details>

                  <details className="group">
                    <summary className="font-semibold text-lg cursor-pointer text-cpCharcoal dark:text-cpCream hover:text-cpCoral transition-colors">
                      Is bloederige diarree bij honden altijd ernstig?
                    </summary>
                    <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80 pl-4">
                      Ja, bloederige diarree moet altijd serieus worden genomen. Het kan wijzen op ernstige aandoeningen zoals parvo-virus, parasieten, darmontsteking of zelfs tumoren. Neem direct contact op met je dierenarts bij bloed in de ontlasting.
                    </p>
                  </details>

                  <details className="group">
                    <summary className="font-semibold text-lg cursor-pointer text-cpCharcoal dark:text-cpCream hover:text-cpCoral transition-colors">
                      Kan stress echt diarree veroorzaken bij honden?
                    </summary>
                    <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80 pl-4">
                      Ja, emotionele stress kan absoluut diarree veroorzaken. Honden hebben een gevoelig spijsverteringssysteem dat beïnvloed wordt door stress. Veranderingen in de omgeving, scheiding, luid geluid of nieuwe situaties kunnen tijdelijke diarree veroorzaken.
                    </p>
                  </details>
                </div>
              </div>

              {/* Related Articles */}
              <div className="mt-12 bg-cpAmber/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mb-6">
                  Gerelateerde artikelen
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link
                    href="/gids/hondengezondheid/wormen-hond-herkennen-behandelen"
                    className="p-4 bg-white dark:bg-cpCharcoal/30 rounded-xl hover:shadow-lg transition-shadow"
                  >
                    <h3 className="font-semibold text-cpCharcoal dark:text-cpCream hover:text-cpCoral transition-colors">
                      Wormen bij honden: herkennen en behandelen
                    </h3>
                  </Link>
                  <Link
                    href="/gids/hondengezondheid/hond-eet-niet-oorzaken"
                    className="p-4 bg-white dark:bg-cpCharcoal/30 rounded-xl hover:shadow-lg transition-shadow"
                  >
                    <h3 className="font-semibold text-cpCharcoal dark:text-cpCream hover:text-cpCoral transition-colors">
                      Hond eet niet: 10 veelvoorkomende oorzaken
                    </h3>
                  </Link>
                  <Link
                    href="/gids/hondenvoeding/beste-voeding-gevoelige-maag"
                    className="p-4 bg-white dark:bg-cpCharcoal/30 rounded-xl hover:shadow-lg transition-shadow"
                  >
                    <h3 className="font-semibold text-cpCharcoal dark:text-cpCream hover:text-cpCoral transition-colors">
                      Beste voeding voor honden met gevoelige maag
                    </h3>
                  </Link>
                  <Link
                    href="/gids/puppyverzorging/puppy-zindelijk-maken"
                    className="p-4 bg-white dark:bg-cpCharcoal/30 rounded-xl hover:shadow-lg transition-shadow"
                  >
                    <h3 className="font-semibold text-cpCharcoal dark:text-cpCream hover:text-cpCoral transition-colors">
                      Puppy zindelijk maken: complete gids
                    </h3>
                  </Link>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-cpCharcoal/10 dark:border-cpCream/10">
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-cpCoral/10 text-cpCoral rounded-full text-sm font-medium">
                    hond diarree
                  </span>
                  <span className="px-4 py-2 bg-cpCoral/10 text-cpCoral rounded-full text-sm font-medium">
                    dunne ontlasting
                  </span>
                  <span className="px-4 py-2 bg-cpCoral/10 text-cpCoral rounded-full text-sm font-medium">
                    hondengezondheid
                  </span>
                  <span className="px-4 py-2 bg-cpCoral/10 text-cpCoral rounded-full text-sm font-medium">
                    buikpijn hond
                  </span>
                  <span className="px-4 py-2 bg-cpCoral/10 text-cpCoral rounded-full text-sm font-medium">
                    dierenarts
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              <BlogSidebarAd />

              {/* Quick Navigation */}
              <div className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-2xl p-6">
                <h3 className="font-bold text-lg text-cpCharcoal dark:text-cpCream mb-4">
                  Snel navigeren
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#oorzaken" className="text-cpCoral hover:underline">
                      Oorzaken van diarree
                    </a>
                  </li>
                  <li>
                    <a href="#wanneer-dierenarts" className="text-cpCoral hover:underline">
                      Wanneer naar de dierenarts?
                    </a>
                  </li>
                  <li>
                    <a href="#behandeling" className="text-cpCoral hover:underline">
                      Behandeling thuis
                    </a>
                  </li>
                  <li>
                    <a href="#preventie" className="text-cpCoral hover:underline">
                      Preventie tips
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Hond heeft diarree: oorzaken, behandeling en preventie",
            "description": "Jouw hond heeft diarree? Ontdek de oorzaken, effectieve behandelingen en preventiemogelijkheden. Praktisch advies van experts voor een gezonde hondendarm.",
            "image": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=600&fit=crop",
            "datePublished": "2025-01-15",
            "dateModified": "2025-01-15",
            "author": {
              "@type": "Organization",
              "name": "CutiePawsPedia"
            },
            "publisher": {
              "@type": "Organization",
              "name": "CutiePawsPedia",
              "logo": {
                "@type": "ImageObject",
                "url": "https://cutiepawspedia.nl/logo.png"
              }
            }
          })
        }}
      />
    </div>
  );
}
