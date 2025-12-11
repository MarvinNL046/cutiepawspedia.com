import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Tag, Calendar } from 'lucide-react';
import BetweenContentAd from '@/components/ads/BetweenContentAd';
import BlogSidebarAd from '@/components/ads/BlogSidebarAd';
import PhotoCredit from '@/components/PhotoCredit';

export const metadata: Metadata = {
  title: 'Kattenbrokjes vs Natvoer: Wat is Beter voor Je Kat? | CutiePawsPedia',
  description: 'Ontdek het verschil tussen kattenbrokjes en natvoer. Vergelijk voordelen, nadelen en maak de juiste keuze voor je kat met deze uitgebreide gids.',
  keywords: 'kattenvoer vergelijken, brokjes of natvoer, beste kattenvoeding, droogvoer kat, natvoer kat, kattenvoeding kiezen',
  openGraph: {
    title: 'Kattenbrokjes vs Natvoer: Wat is Beter voor Je Kat?',
    description: 'Vergelijk kattenbrokjes en natvoer en ontdek wat het beste is voor jouw kat.',
    type: 'article',
    publishedTime: '2025-01-15T09:00:00Z',
    authors: ['CutiePawsPedia Team'],
    images: [{ url: 'https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2?w=1200&h=630&fit=crop' }],
  },
};

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-cpCream dark:bg-cpCharcoal">
      <article className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Category Badge */}
            <Link
              href="/blog/categorie/huisdiervoeding"
              className="inline-block mb-4 px-4 py-2 bg-cpAmber text-cpCharcoal rounded-full text-sm font-medium hover:bg-opacity-80 transition-colors"
            >
              Huisdiervoeding
            </Link>

            {/* Article Header */}
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-cpCharcoal dark:text-cpCream mb-4">
                Kattenbrokjes vs Natvoer: Wat is Beter voor Je Kat?
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-cpCharcoal/70 dark:text-cpCream/70 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime="2025-01-15">15 januari 2025</time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>8 min leestijd</span>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <div className="relative w-full h-[400px] mb-6 rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2?w=1200&h=800&fit=crop"
                alt="Kat eet uit voerbak met kattenbrokjes en natvoer"
                fill
                className="object-cover"
                priority
              />
            </div>
            <PhotoCredit
              photographerName="Jéan Béller"
              photographerUrl="https://unsplash.com/@jeanb"
              platform="Unsplash"
            />

            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-8 text-cpCharcoal dark:text-cpCream">
              <p className="lead text-xl mb-6">
                Een van de meest gestelde vragen door katteneigenaren: wat is beter voor mijn kat, kattenbrokjes of natvoer?
                Beide hebben voordelen en nadelen, en de beste keuze hangt af van verschillende factoren zoals de leeftijd van je kat,
                gezondheid, smaakvoorkeur en je budget. In deze uitgebreide gids vergelijken we beide soorten kattenvoer en helpen we
                je de juiste keuze te maken.
              </p>
            </div>

            {/* Main Content Sections */}
            <div className="prose prose-lg max-w-none text-cpCharcoal dark:text-cpCream">
              <h2 className="text-3xl font-bold mt-12 mb-6 text-cpCharcoal dark:text-cpCream">
                Wat zijn kattenbrokjes (droogvoer)?
              </h2>
              <p>
                Kattenbrokjes, ook wel droogvoer genoemd, zijn kleine, droge korrels die alle noodzakelijke voedingsstoffen bevatten
                die je kat nodig heeft. Ze hebben een lange houdbaarheid en zijn makkelijk te bewaren.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                Voordelen van kattenbrokjes
              </h3>
              <ul className="space-y-3 mb-6">
                <li><strong>Gemak:</strong> Makkelijk te doseren en kan de hele dag in de bak blijven staan zonder te bederven</li>
                <li><strong>Gebitsgezondheid:</strong> Het knabbelen op brokjes helpt tandsteen te verminderen</li>
                <li><strong>Economisch:</strong> Over het algemeen voordeliger dan natvoer</li>
                <li><strong>Lange houdbaarheid:</strong> Eenmaal geopend blijven brokjes weken tot maanden goed</li>
                <li><strong>Minder geur:</strong> Geurt minder sterk dan natvoer</li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                Nadelen van kattenbrokjes
              </h3>
              <ul className="space-y-3 mb-6">
                <li><strong>Laag vochtgehalte:</strong> Bevat slechts 10% vocht, wat te weinig is voor katten die van nature weinig drinken</li>
                <li><strong>Koolhydraten:</strong> Vaak hoog in koolhydraten, terwijl katten carnivoren zijn</li>
                <li><strong>Minder smakelijk:</strong> Sommige katten vinden brokjes minder lekker dan natvoer</li>
                <li><strong>Kan leiden tot obesitas:</strong> Katten kunnen brokjes snel opeten zonder verzadigd te raken</li>
              </ul>

              <BetweenContentAd />

              <h2 className="text-3xl font-bold mt-12 mb-6 text-cpCharcoal dark:text-cpCream">
                Wat is natvoer voor katten?
              </h2>
              <p>
                Natvoer voor katten bestaat uit vlees, vis of gevogelte in saus, gelei of paté. Het bevat 70-80% vocht en
                komt het dichtst bij het natuurlijke dieet van katten.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                Voordelen van natvoer
              </h3>
              <ul className="space-y-3 mb-6">
                <li><strong>Hoog vochtgehalte:</strong> Helpt katten gehydrateerd te blijven, essentieel voor nier- en blaasklierengezondheid</li>
                <li><strong>Hoog eiwitgehalte:</strong> Bevat meer dierlijk eiwit, wat natuurlijker is voor katten</li>
                <li><strong>Smaakvoller:</strong> Meeste katten vinden natvoer lekkerder door de geur en textuur</li>
                <li><strong>Minder calorieën per volume:</strong> Helpt bij gewichtsbeheersing</li>
                <li><strong>Geschikt voor oudere katten:</strong> Gemakkelijker te eten voor katten met gebitsproblemen</li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                Nadelen van natvoer
              </h3>
              <ul className="space-y-3 mb-6">
                <li><strong>Duurder:</strong> Significant duurder dan droogvoer</li>
                <li><strong>Korte houdbaarheid:</strong> Moet binnen enkele uren opgegeten worden, anders bederft het</li>
                <li><strong>Minder handig:</strong> Moet in de koelkast bewaard worden na opening</li>
                <li><strong>Geeft meer geur:</strong> Kan onprettig ruiken, vooral in warme omgevingen</li>
                <li><strong>Minder goed voor gebit:</strong> Draagt niet bij aan tandenreiniging</li>
              </ul>

              <BetweenContentAd />

              <h2 className="text-3xl font-bold mt-12 mb-6 text-cpCharcoal dark:text-cpCream">
                Vergelijkingstabel: brokjes vs natvoer
              </h2>
              <div className="overflow-x-auto mb-8">
                <table className="min-w-full bg-white dark:bg-cpSurface rounded-lg">
                  <thead>
                    <tr className="bg-cpAmber text-cpCharcoal">
                      <th className="px-6 py-3 text-left font-semibold">Aspect</th>
                      <th className="px-6 py-3 text-left font-semibold">Kattenbrokjes</th>
                      <th className="px-6 py-3 text-left font-semibold">Natvoer</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cpCharcoal/10 dark:divide-cpCream/10">
                    <tr>
                      <td className="px-6 py-4 font-medium">Vochtgehalte</td>
                      <td className="px-6 py-4">10%</td>
                      <td className="px-6 py-4">70-80%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium">Eiwitgehalte</td>
                      <td className="px-6 py-4">25-35%</td>
                      <td className="px-6 py-4">8-12% (maar meer per droog gewicht)</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium">Prijs</td>
                      <td className="px-6 py-4">€1-3 per dag</td>
                      <td className="px-6 py-4">€2-5 per dag</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium">Houdbaarheid</td>
                      <td className="px-6 py-4">Maanden</td>
                      <td className="px-6 py-4">2-3 uur na opening</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium">Gemak</td>
                      <td className="px-6 py-4">Hoog</td>
                      <td className="px-6 py-4">Gemiddeld</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium">Gebitsgezondheid</td>
                      <td className="px-6 py-4">Goed</td>
                      <td className="px-6 py-4">Neutraal</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-cpCharcoal dark:text-cpCream">
                Wat is het beste voor jouw kat?
              </h2>
              <p>
                De beste keuze hangt af van verschillende factoren:
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                Voor kittens (0-1 jaar)
              </h3>
              <p>
                Kittens hebben veel energie en voedingsstoffen nodig voor groei. Een combinatie van hoogwaardig natvoer en
                speciaal kittenvoer (brokjes) werkt het beste. Natvoer helpt ze gehydrateerd te blijven en brokjes ondersteunen
                de gebitsontwikkeling.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                Voor volwassen katten (1-7 jaar)
              </h3>
              <p>
                Voor gezonde volwassen katten werkt een combinatie van beide vaak het beste: natvoer voor hydratatie en
                brokjes voor gebitsgezondheid en gemak. Een veelgebruikte verdeling is 70% natvoer en 30% brokjes.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                Voor oudere katten (7+ jaar)
              </h3>
              <p>
                Oudere katten hebben vaak nood aan extra vocht voor niergezondheid en kunnen gebitsproblemen hebben.
                Natvoer is vaak de betere keuze, eventueel aangevuld met geweekte brokjes.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                Voor katten met gezondheidsproblemen
              </h3>
              <ul className="space-y-3 mb-6">
                <li><strong>Nierziekten:</strong> Natvoer voor extra hydratatie</li>
                <li><strong>Diabetes:</strong> Laag-koolhydraten natvoer</li>
                <li><strong>Overgewicht:</strong> Natvoer (lager in calorieën per volume)</li>
                <li><strong>Urinewegproblemen:</strong> Natvoer voor hydratatie</li>
                <li><strong>Gebitsproblemen:</strong> Natvoer of geweekte brokjes</li>
              </ul>

              <BetweenContentAd />

              <h2 className="text-3xl font-bold mt-12 mb-6 text-cpCharcoal dark:text-cpCream">
                De gouden middenweg: combineren
              </h2>
              <p>
                Veel dierenartsen en kattenexperts bevelen een combinatie aan. Dit geeft je het beste van beide werelden:
              </p>
              <ul className="space-y-3 mb-6">
                <li>Geef 's ochtends natvoer voor hydratatie</li>
                <li>Laat overdag een kleine hoeveelheid brokjes beschikbaar voor snacken</li>
                <li>Geef 's avonds weer natvoer als hoofdmaaltijd</li>
              </ul>
              <p>
                Deze aanpak zorgt voor voldoende vocht, ondersteunt de gebitsgezondheid, en is praktisch voor je dagelijkse
                routine. Let wel op de totale calorie-inname om overgewicht te voorkomen.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-cpCharcoal dark:text-cpCream">
                Waar moet je op letten bij het kiezen?
              </h2>
              <p>
                Of je nu kiest voor brokjes, natvoer of een combinatie, let op deze kwaliteitsindicatoren:
              </p>
              <ul className="space-y-3 mb-6">
                <li><strong>Vleesgehalte:</strong> Minimaal 30-40% vlees als eerste ingrediënt</li>
                <li><strong>Geen bijproducten:</strong> Vermijd vaag omschreven "dierlijke bijproducten"</li>
                <li><strong>Laag in granen:</strong> Katten zijn carnivoren en hebben weinig koolhydraten nodig</li>
                <li><strong>Geen kunstmatige toevoegingen:</strong> Vermijd kleurstoffen en smaakversterkers</li>
                <li><strong>Compleet en gebalanceerd:</strong> Check of het voer voldoet aan FEDIAF-normen</li>
                <li><strong>Geschikt voor leeftijd:</strong> Kitten-, adult- of seniorvoer afhankelijk van leeftijd</li>
              </ul>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-cpCharcoal dark:text-cpCream">
                Tips voor de overstap
              </h2>
              <p>
                Wil je switchen van brokjes naar natvoer of andersom? Doe dit geleidelijk:
              </p>
              <ol className="space-y-3 mb-6 list-decimal list-inside">
                <li>Meng eerst 25% nieuw voer met 75% oud voer gedurende 3-4 dagen</li>
                <li>Ga naar 50/50 voor nog eens 3-4 dagen</li>
                <li>Verhoog naar 75% nieuw voer en 25% oud voer</li>
                <li>Na 10-14 dagen kun je volledig overstappen</li>
              </ol>
              <p>
                Let op eventuele spijsverteringsproblemen zoals diarree of braken. Als deze aanhouden, raadpleeg je dierenarts.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-cpCharcoal dark:text-cpCream">
                Conclusie: wat is nu beter?
              </h2>
              <p>
                Er is geen absoluut antwoord op de vraag "wat is beter?" - beide hebben hun plaats in een gezond kattendieet.
                Natvoer komt het dichtst bij het natuurlijke dieet van katten en helpt met hydratatie, terwijl brokjes praktisch
                zijn en de gebitsgezondheid ondersteunen.
              </p>
              <p>
                Voor de meeste katten is een combinatie van beide ideaal: voornamelijk natvoer (60-70%) aangevuld met
                kwalitatief droogvoer (30-40%). Overleg altijd met je dierenarts over wat het beste is voor jouw specifieke kat,
                vooral als je kat gezondheidsproblemen heeft.
              </p>
              <p>
                Onthoud: de beste voeding is die voeding die je kat graag eet, die past bij jouw budget en levensstijl, en die
                je kat gezond en gelukkig houdt!
              </p>
            </div>

            {/* FAQ Section */}
            <div className="mt-12 bg-white dark:bg-cpSurface rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-6 text-cpCharcoal dark:text-cpCream">
                Veelgestelde vragen
              </h2>
              <div className="space-y-4">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-cpCream dark:bg-cpCharcoal rounded-lg hover:bg-cpAmber/20 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Kunnen katten alleen op brokjes leven?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="mt-4 px-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Ja, katten kunnen alleen op kwalitatief droogvoer leven, maar ze hebben dan wel extra water nodig. Zorg voor
                    meerdere drinkbakjes en overweeg een drinkfontein. Natvoer is echter beter voor hydratatie, vooral bij katten
                    die weinig drinken.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-cpCream dark:bg-cpCharcoal rounded-lg hover:bg-cpAmber/20 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Hoeveel natvoer moet ik per dag geven?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="mt-4 px-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Dit hangt af van het gewicht van je kat. Gemiddeld heeft een volwassen kat van 4-5 kg ongeveer 200-250 gram
                    natvoer per dag nodig, verdeeld over 2-3 porties. Controleer altijd de voedingsadviezen op de verpakking en
                    pas aan op basis van het gewicht en activiteitsniveau van je kat.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-cpCream dark:bg-cpCharcoal rounded-lg hover:bg-cpAmber/20 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Is goedkoop kattenvoer slecht voor mijn kat?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="mt-4 px-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Goedkoop kattenvoer bevat vaak meer granen, minder vlees en meer vulstoffen. Dit is niet direct slecht, maar
                    minder optimaal. Je kat kan er gezond op blijven, maar hoogwaardiger voer levert betere voeding en kan op
                    lange termijn gezondheidsproblemen voorkomen. Investeren in goed voer bespaart vaak geld op dierenarts kosten.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-cpCream dark:bg-cpCharcoal rounded-lg hover:bg-cpAmber/20 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Kan ik brokjes en natvoer door elkaar mengen?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="mt-4 px-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Ja, je kunt brokjes en natvoer mengen. Sommige katten vinden dit zelfs lekkerder. Het heeft geen negatieve
                    effecten op de vertering. Let wel op de totale calorie-inname om overgewicht te voorkomen, en houd er rekening
                    mee dat de brokjes hun knapperigheid verliezen als ze te lang nat blijven.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-cpCream dark:bg-cpCharcoal rounded-lg hover:bg-cpAmber/20 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Mijn kat wil alleen brokjes eten, is dat erg?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="mt-4 px-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Als je kat alleen brokjes wil eten, is dat niet direct een probleem als het hoogwaardig voer is en je kat
                    genoeg drinkt. Plaats meerdere waterbakken en overweeg een drinkfontein. Je kunt proberen je kat geleidelijk
                    te laten wennen aan natvoer door kleine hoeveelheden bij de brokjes te mengen, maar forceer het niet als je
                    kat het echt weigert.
                  </p>
                </details>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-12">
              <h2 className="text-3xl font-bold mb-6 text-cpCharcoal dark:text-cpCream">
                Gerelateerde artikelen
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link
                  href="/nl/gids/kattenvoeding/beste-kattenvoer-merken"
                  className="block p-6 bg-white dark:bg-cpSurface rounded-xl hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-2 text-cpCharcoal dark:text-cpCream">
                    De Beste Kattenvoer Merken van 2025
                  </h3>
                  <p className="text-cpCharcoal/70 dark:text-cpCream/70">
                    Vergelijk de top kattenvoer merken en ontdek welk merk het beste past bij jouw kat.
                  </p>
                </Link>

                <Link
                  href="/nl/gids/kattenvoeding/gezond-kattenvoer-herkennen"
                  className="block p-6 bg-white dark:bg-cpSurface rounded-xl hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-2 text-cpCharcoal dark:text-cpCream">
                    Gezond Kattenvoer Herkennen
                  </h3>
                  <p className="text-cpCharcoal/70 dark:text-cpCream/70">
                    Leer hoe je kwaliteit kattenvoer herkent aan de ingrediëntenlijst.
                  </p>
                </Link>

                <Link
                  href="/nl/gids/kattengezondheid/water-drinken-kat"
                  className="block p-6 bg-white dark:bg-cpSurface rounded-xl hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-2 text-cpCharcoal dark:text-cpCream">
                    Hoe Krijg Je Je Kat Meer Water te Drinken?
                  </h3>
                  <p className="text-cpCharcoal/70 dark:text-cpCream/70">
                    Tips en trucs om je kat te stimuleren meer water te drinken voor optimale gezondheid.
                  </p>
                </Link>

                <Link
                  href="/nl/gids/kattenvoeding/portiegrootte-kat"
                  className="block p-6 bg-white dark:bg-cpSurface rounded-xl hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-2 text-cpCharcoal dark:text-cpCream">
                    Hoeveel Moet Je Je Kat Voeren?
                  </h3>
                  <p className="text-cpCharcoal/70 dark:text-cpCream/70">
                    Bereken de juiste portiegrootte voor je kat om een gezond gewicht te behouden.
                  </p>
                </Link>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-12 flex flex-wrap gap-2">
              <span className="flex items-center gap-1 text-sm text-cpCharcoal/70 dark:text-cpCream/70">
                <Tag className="w-4 h-4" />
                Tags:
              </span>
              <Link href="/blog/tag/kattenvoer" className="px-3 py-1 bg-cpCream dark:bg-cpSurface rounded-full text-sm hover:bg-cpAmber transition-colors">
                kattenvoer
              </Link>
              <Link href="/blog/tag/brokjes" className="px-3 py-1 bg-cpCream dark:bg-cpSurface rounded-full text-sm hover:bg-cpAmber transition-colors">
                brokjes
              </Link>
              <Link href="/blog/tag/natvoer" className="px-3 py-1 bg-cpCream dark:bg-cpSurface rounded-full text-sm hover:bg-cpAmber transition-colors">
                natvoer
              </Link>
              <Link href="/blog/tag/kattenvoeding" className="px-3 py-1 bg-cpCream dark:bg-cpSurface rounded-full text-sm hover:bg-cpAmber transition-colors">
                kattenvoeding
              </Link>
              <Link href="/blog/tag/kat-gezondheid" className="px-3 py-1 bg-cpCream dark:bg-cpSurface rounded-full text-sm hover:bg-cpAmber transition-colors">
                kat gezondheid
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <BlogSidebarAd />

              {/* Quick Navigation */}
              <div className="bg-white dark:bg-cpSurface rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-cpCharcoal dark:text-cpCream">
                  Op deze pagina
                </h3>
                <nav className="space-y-2 text-sm">
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Wat zijn kattenbrokjes?
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Wat is natvoer?
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Vergelijkingstabel
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Wat is het beste voor jouw kat?
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Combineren van beide
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Waar op letten bij kiezen?
                  </a>
                </nav>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Kattenbrokjes vs Natvoer: Wat is Beter voor Je Kat?',
            description: 'Ontdek het verschil tussen kattenbrokjes en natvoer. Vergelijk voordelen, nadelen en maak de juiste keuze voor je kat.',
            image: 'https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2?w=1200&h=630&fit=crop',
            datePublished: '2025-01-15T09:00:00Z',
            dateModified: '2025-01-15T09:00:00Z',
            author: {
              '@type': 'Organization',
              name: 'CutiePawsPedia',
            },
            publisher: {
              '@type': 'Organization',
              name: 'CutiePawsPedia',
              logo: {
                '@type': 'ImageObject',
                url: 'https://cutiepawspedia.nl/logo.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://cutiepawspedia.nl/blog/kattenbrokjes-vs-natvoer',
            },
          }),
        }}
      />
    </div>
  );
}
