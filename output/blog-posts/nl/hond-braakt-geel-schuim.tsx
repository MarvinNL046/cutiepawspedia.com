import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Tag, Calendar, AlertTriangle } from 'lucide-react';
import BetweenContentAd from '@/components/ads/BetweenContentAd';
import BlogSidebarAd from '@/components/ads/BlogSidebarAd';
import PhotoCredit from '@/components/PhotoCredit';

export const metadata: Metadata = {
  title: 'Hond Braakt Geel Schuim: 7 Oorzaken en Wat Te Doen | CutiePawsPedia',
  description: 'Ontdek waarom je hond geel schuim braakt, wanneer het gevaarlijk is en wat je kunt doen. Uitgebreide gids met behandeltips en preventiemaatregelen.',
  keywords: 'hond braakt, hond overgeven, geel braaksel hond, hond braakt schuim, hond gele gal, hondenziekte',
  openGraph: {
    title: 'Hond Braakt Geel Schuim: Oorzaken en Wat Te Doen',
    description: 'Praktische gids over waarom honden geel schuim braken en wanneer je naar de dierenarts moet.',
    type: 'article',
    publishedTime: '2025-01-14T10:30:00Z',
    authors: ['CutiePawsPedia Team'],
    images: [{ url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=630&fit=crop' }],
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
              href="/blog/categorie/dierengezondheid"
              className="inline-block mb-4 px-4 py-2 bg-cpCoral text-white rounded-full text-sm font-medium hover:bg-opacity-80 transition-colors"
            >
              Dierengezondheid
            </Link>

            {/* Article Header */}
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-cpCharcoal dark:text-cpCream mb-4">
                Hond Braakt Geel Schuim: 7 Oorzaken en Wat Te Doen
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-cpCharcoal/70 dark:text-cpCream/70 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime="2025-01-14">14 januari 2025</time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>9 min leestijd</span>
                </div>
              </div>
            </header>

            {/* Alert Box */}
            <div className="mb-8 p-6 bg-cpCoral/10 border-l-4 border-cpCoral rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-cpCoral flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-cpCharcoal dark:text-cpCream mb-2">Let op: Wanneer naar de dierenarts?</h3>
                  <p className="text-cpCharcoal/80 dark:text-cpCream/80 text-sm">
                    Braken kan onschuldig zijn, maar ook wijzen op ernstige problemen. Ga direct naar de dierenarts als je hond:
                    herhaaldelijk braakt (meer dan 2x per dag), bloed in het braaksel heeft, zeer lethargisch is, koorts heeft,
                    of als het braken gepaard gaat met andere ernstige symptomen.
                  </p>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative w-full h-[400px] mb-6 rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=800&fit=crop"
                alt="Hond ligt ziek op de grond"
                fill
                className="object-cover"
                priority
              />
            </div>
            <PhotoCredit
              photographerName="Karsten Winegeart"
              photographerUrl="https://unsplash.com/@karsten116"
              platform="Unsplash"
            />

            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-8 text-cpCharcoal dark:text-cpCream">
              <p className="lead text-xl mb-6">
                Het kan best verontrustend zijn: je komt thuis en ziet dat je hond geel schuim heeft gebraakt. Of misschien zie je
                het gebeuren en vraag je je af wat er aan de hand is. Geel braaksel bij honden is eigenlijk vrij vaak voorkomend en
                kan verschillende oorzaken hebben, van onschuldig tot ernstig. In deze uitgebreide gids leggen we uit waarom honden
                geel schuim braken, wanneer je je zorgen moet maken, en wat je kunt doen om je hond te helpen.
              </p>
            </div>

            {/* Main Content Sections */}
            <div className="prose prose-lg max-w-none text-cpCharcoal dark:text-cpCream">
              <h2 className="text-3xl font-bold mt-12 mb-6 text-cpCharcoal dark:text-cpCream">
                Wat is dat gele schuim precies?
              </h2>
              <p>
                Het gele schuim dat je hond braakt is <strong>gal</strong> (ook wel galvloeistof genoemd). Gal is een
                geel-groene vloeistof die wordt geproduceerd door de lever en opgeslagen in de galblaas. Het helpt bij de
                vertering van vetten in de dunne darm.
              </p>
              <p>
                Wanneer je hond braakt op een lege maag, komt er vaak gal mee naar boven omdat er geen voedsel is om te braken.
                De schuimige textuur ontstaat doordat de gal wordt gemengd met lucht en maagsappen. Dit verklaart waarom het
                braaksel schuimig en geel (of soms groenig) kan zijn.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-cpCharcoal dark:text-cpCream">
                7 Veelvoorkomende oorzaken van geel braken
              </h2>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                1. Lege maag (Bilious Vomiting Syndrome)
              </h3>
              <p>
                Dit is veruit de meest voorkomende en onschuldige oorzaak. Wanneer de maag van je hond te lang leeg is, kan
                gal irritatie veroorzaken aan de maagwand, wat leidt tot braken. Dit gebeurt vaak 's ochtends vroeg of laat
                in de middag als er veel tijd zit tussen maaltijden.
              </p>
              <p><strong>Herkenningspunten:</strong></p>
              <ul className="space-y-2 mb-6">
                <li>Gebeurt meestal 's ochtends of tussen maaltijden</li>
                <li>Hond voelt zich verder goed en eet normaal na het braken</li>
                <li>Komt periodiek voor, maar niet dagelijks</li>
                <li>Alleen geel schuim, geen voedsel of bloed</li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                2. Te snel eten of drinken
              </h3>
              <p>
                Honden die hun voer verslinden of grote hoeveelheden water in één keer opdrinken, kunnen daarna braken. De
                maag kan de snelle toestroom niet aan, wat resulteert in het uitwerpen van voedsel, water en gal.
              </p>
              <p><strong>Herkenningspunten:</strong></p>
              <ul className="space-y-2 mb-6">
                <li>Braken kort na het eten of drinken (binnen 10-30 minuten)</li>
                <li>Braaksel bevat deels onverteerd voedsel</li>
                <li>Hond wil vaak daarna meteen weer eten</li>
              </ul>

              <BetweenContentAd />

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                3. Voedselintolerantie of allergie
              </h3>
              <p>
                Sommige honden kunnen gevoelig zijn voor bepaalde ingrediënten in hun voer, zoals granen, kip of rundvlees.
                Dit kan maagirritatie veroorzaken en leiden tot braken van gal.
              </p>
              <p><strong>Herkenningspunten:</strong></p>
              <ul className="space-y-2 mb-6">
                <li>Regelmatig braken na bepaalde maaltijden</li>
                <li>Mogelijk ook diarree of huidproblemen</li>
                <li>Symptomen verbeteren bij wijziging van voer</li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                4. Maag-darmproblemen (gastritis)
              </h3>
              <p>
                Ontstekingen van de maag (gastritis) kunnen veroorzaakt worden door het eten van bedorven voedsel, gif,
                planten of door medicijnen. Dit irriteert de maagwand en kan leiden tot braken van gal.
              </p>
              <p><strong>Herkenningspunten:</strong></p>
              <ul className="space-y-2 mb-6">
                <li>Herhaaldelijk braken, ook met lege maag</li>
                <li>Verminderde eetlust</li>
                <li>Mogelijk buikpijn (hond is onrustig, kreunt)</li>
                <li>Mogelijk ook diarree</li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                5. Pancreatitis (alvleesklierontsteking)
              </h3>
              <p>
                Dit is een ernstigere aandoening waarbij de alvleesklier ontstoken raakt. Dit kan veroorzaakt worden door
                vet voedsel, trauma of infecties. Het is een pijnlijke conditie die dierenarts behandeling vereist.
              </p>
              <p><strong>Herkenningspunten:</strong></p>
              <ul className="space-y-2 mb-6">
                <li>Herhaaldelijk braken van geel schuim</li>
                <li>Buikpijn (hond heeft gebogen houding)</li>
                <li>Diarree</li>
                <li>Koorts en lethargie</li>
                <li>Verminderde eetlust</li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                6. Opgegeten vreemde voorwerpen
              </h3>
              <p>
                Honden zijn nieuwsgierig en eten soms dingen die niet bedoeld zijn als voedsel: sokken, speelgoed, stokken,
                of ander afval. Dit kan een verstopping veroorzaken of de maag irriteren, wat leidt tot braken.
              </p>
              <p><strong>Herkenningspunten:</strong></p>
              <ul className="space-y-2 mb-6">
                <li>Herhaaldelijk braken zonder verbetering</li>
                <li>Mogelijk geen ontlasting</li>
                <li>Buikpijn en opgezette buik</li>
                <li>Lethargie en weigering om te eten</li>
              </ul>

              <BetweenContentAd />

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                7. Andere medische aandoeningen
              </h3>
              <p>
                Geel braken kan ook een symptoom zijn van ernstigere aandoeningen zoals:
              </p>
              <ul className="space-y-2 mb-6">
                <li><strong>Lever- of nierproblemen:</strong> Opbouw van toxines kan braken veroorzaken</li>
                <li><strong>Bijnierziekte (Addison):</strong> Hormonale problemen beïnvloeden de spijsvertering</li>
                <li><strong>Darmparasieten:</strong> Wormen kunnen maag-darmirritatie veroorzaken</li>
                <li><strong>Infecties:</strong> Virussen zoals parvo kunnen ernstig braken veroorzaken</li>
                <li><strong>Kanker:</strong> Tumoren in het spijsverteringsstelsel</li>
              </ul>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-cpCharcoal dark:text-cpCream">
                Wanneer moet je naar de dierenarts?
              </h2>
              <p>
                Niet elk geval van geel braken is een noodgeval, maar er zijn situaties waarin je direct contact moet opnemen
                met je dierenarts:
              </p>

              <div className="bg-cpCoral/10 border-l-4 border-cpCoral p-6 rounded-lg my-6">
                <h3 className="font-bold text-lg mb-3 text-cpCharcoal dark:text-cpCream">🚨 Direct naar de dierenarts bij:</h3>
                <ul className="space-y-2">
                  <li>✓ Herhaaldelijk braken (meer dan 2-3 keer op een dag)</li>
                  <li>✓ Bloed in het braaksel (rood of bruin/zwart)</li>
                  <li>✓ Tekenen van pijn (kermen, gebukte houding, niet willen bewegen)</li>
                  <li>✓ Lethargie, zwakte of desoriëntatie</li>
                  <li>✓ Weigeren om te eten of drinken voor meer dan 12-24 uur</li>
                  <li>✓ Diarree in combinatie met braken</li>
                  <li>✓ Opgezette, harde buik</li>
                  <li>✓ Bleke tandvlees</li>
                  <li>✓ Koorts (rectale temperatuur boven 39,5°C)</li>
                  <li>✓ Je hond is een puppy of senior (kwetsbaarder)</li>
                  <li>✓ Je vermoedt dat je hond iets giftigs of een vreemd voorwerp heeft gegeten</li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-cpCharcoal dark:text-cpCream">
                Wat kun je zelf doen?
              </h2>
              <p>
                Als je hond één keer geel schuim braakt maar zich verder goed voelt, kun je de volgende stappen proberen:
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                1. Geef de maag rust (12-24 uur vasten)
              </h3>
              <p>
                Stop tijdelijk met voeren om de maag tot rust te laten komen. Geef wel kleine hoeveelheden water om
                dehydratie te voorkomen. Voor volwassen honden kan een vast van 12-24 uur helpen. Voor puppy's: maximaal
                6-12 uur vasten.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                2. Introduceer langzaam mild voedsel
              </h3>
              <p>
                Na het vasten, begin met kleine porties mild voedsel:
              </p>
              <ul className="space-y-2 mb-6">
                <li>Gekookte witte rijst met gekookte kip (zonder vel en botten)</li>
                <li>Gekookte aardappel met mager gehakt</li>
                <li>Pompoenbrij (zonder specerijen)</li>
              </ul>
              <p>
                Geef 4-6 kleine maaltijden per dag in plaats van 1-2 grote maaltijden. Als je hond dit goed verdraagt,
                bouw dan geleidelijk terug naar normaal voer over 3-5 dagen.
              </p>

              <BetweenContentAd />

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                3. Pas de voedingstijden aan
              </h3>
              <p>
                Als je hond vooral 's ochtends braakt door een lege maag, probeer dan:
              </p>
              <ul className="space-y-2 mb-6">
                <li>Geef een kleine snack voor het slapengaan</li>
                <li>Geef meteen na het wakker worden een kleine hoeveelheid voer</li>
                <li>Verdeel de dagelijkse portie over 3-4 kleinere maaltijden</li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                4. Gebruik een anti-schrokbak
              </h3>
              <p>
                Als je hond te snel eet, kan een anti-schrokbak of puzzelfeeder helpen om het eten te vertragen. Dit
                voorkomt dat je hond grote happen neemt die het braken kunnen veroorzaken.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                5. Zorg voor voldoende water
              </h3>
              <p>
                Houd je hond gehydrateerd door altijd vers water beschikbaar te hebben. Als je hond veel braakt, kan
                dehydratie een probleem worden. Bied kleine hoeveelheden water aan (ijsblokjes werken ook goed).
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-cpCharcoal dark:text-cpCream">
                Preventiemaatregelen
              </h2>
              <p>
                Om herhaling te voorkomen, kun je deze maatregelen nemen:
              </p>
              <ul className="space-y-3 mb-6">
                <li><strong>Vaste voedingstijden:</strong> Geef op vaste tijden te eten, verdeeld over de dag</li>
                <li><strong>Kwalitatief voer:</strong> Kies voor goed verteerbaar, hoogwaardig hondenvoer</li>
                <li><strong>Geleidelijke voerveranderingen:</strong> Schakel langzaam over naar nieuw voer (7-10 dagen)</li>
                <li><strong>Vermijd tafelresten:</strong> Vooral vette en gekruide menselijke voeding</li>
                <li><strong>Toezicht buiten:</strong> Voorkom dat je hond afval of planten eet tijdens wandelingen</li>
                <li><strong>Regelmatige ontworming:</strong> Houd het ontwormingsschema aan</li>
                <li><strong>Stressreductie:</strong> Verminder stress en angst waar mogelijk</li>
              </ul>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-cpCharcoal dark:text-cpCream">
                Wat zal de dierenarts doen?
              </h2>
              <p>
                Als je naar de dierenarts gaat, kun je het volgende verwachten:
              </p>
              <ol className="space-y-3 mb-6 list-decimal list-inside">
                <li><strong>Anamnese:</strong> Vragen over symptomen, eetpatroon, mogelijke blootstelling aan giftige stoffen</li>
                <li><strong>Lichamelijk onderzoek:</strong> Controle van temperatuur, hartslag, tandvlees, buik</li>
                <li><strong>Diagnostische tests:</strong> Mogelijk bloedonderzoek, röntgenfoto's, echografie</li>
                <li><strong>Behandeling:</strong> Afhankelijk van de diagnose, zoals anti-braak medicatie, infuus, antibiotica, of chirurgie bij verstopping</li>
              </ol>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-cpCharcoal dark:text-cpCream">
                Conclusie
              </h2>
              <p>
                Geel braken bij honden is vaak onschuldig en kan veroorzaakt worden door een lege maag. In de meeste
                gevallen kun je dit oplossen door de voedingstijden aan te passen en de maag rust te geven. Echter, als het
                braken herhaaldelijk voorkomt, gepaard gaat met andere symptomen, of als je hond zichtbaar onwel is, is het
                belangrijk om contact op te nemen met je dierenarts.
              </p>
              <p>
                Let altijd goed op je hond en vertrouw op je intuïtie. Niemand kent je hond beter dan jij. Als iets niet
                goed voelt, aarzel dan niet om professionele hulp te zoeken. Vroege interventie kan het verschil maken tussen
                een simpele behandeling en een ernstig gezondheidsprobleem.
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
                      Is geel braken altijd een teken van ziekte?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="mt-4 px-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Nee, geel braken is niet altijd een teken van ziekte. Het komt vaak voor bij honden met een lege maag en is
                    dan onschuldig. Als je hond zich verder goed voelt, eet, speelt en actief is, is er meestal geen reden tot
                    bezorgdheid. Echter, als het regelmatig voorkomt of gepaard gaat met andere symptomen, is het verstandig om
                    de dierenarts te raadplegen.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-cpCream dark:bg-cpCharcoal rounded-lg hover:bg-cpAmber/20 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Hoe lang mag mijn hond vasten na het braken?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="mt-4 px-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Voor volwassen honden is 12-24 uur vasten veilig en vaak effectief om de maag tot rust te laten komen. Voor
                    puppy's jonger dan 6 maanden is maximaal 6-12 uur vasten veilig. Zorg altijd dat je hond wel toegang heeft
                    tot kleine hoeveelheden water om dehydratie te voorkomen. Als je hond na het vasten opnieuw braakt bij het
                    introduceren van voedsel, neem dan contact op met je dierenarts.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-cpCream dark:bg-cpCharcoal rounded-lg hover:bg-cpAmber/20 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Kan ik mijn hond medicijnen tegen braken geven?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="mt-4 px-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Geef nooit menselijke medicijnen aan je hond zonder overleg met een dierenarts. Veel medicijnen die veilig
                    zijn voor mensen kunnen giftig zijn voor honden. Als je hond vaak braakt, kan de dierenarts specifieke
                    anti-braak medicatie voorschrijven zoals Cerenia of metoclopramide. Deze medicijnen behandelen alleen het
                    symptoom, niet de onderliggende oorzaak, dus het is belangrijk om de oorzaak te achterhalen.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-cpCream dark:bg-cpCharcoal rounded-lg hover:bg-cpAmber/20 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Wat is het verschil tussen braken en kokhalzen?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="mt-4 px-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Braken komt uit de maag en wordt voorafgegaan door kokhalzen, waarbij de buikspieren samentrekken. Het
                    braaksel bevat meestal verteerd voedsel, gal of schuim. Kokhalzen (regurgitatie) komt uit de slokdarm en
                    gebeurt meestal snel zonder waarschuwing. Het materiaal is onverteerd voedsel dat nog niet in de maag is
                    geweest. Beide kunnen wijzen op gezondheidsproblemen en verdienen aandacht.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-cpCream dark:bg-cpCharcoal rounded-lg hover:bg-cpAmber/20 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Mijn hond braakt elke ochtend geel schuim, is dit normaal?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="mt-4 px-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Dit is waarschijnlijk "Bilious Vomiting Syndrome" - braken door een lege maag. Het is relatief onschuldig
                    maar kan verholpen worden door de voedingstijden aan te passen. Geef een kleine snack voor het slapengaan
                    en voer je hond meteen 's ochtends vroeg. Als dit niet helpt of als je hond andere symptomen vertoont,
                    raadpleeg dan je dierenarts om onderliggende maagproblemen uit te sluiten.
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
                  href="/nl/gids/hondengezondheid/hond-diarree-behandelen"
                  className="block p-6 bg-white dark:bg-cpSurface rounded-xl hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-2 text-cpCharcoal dark:text-cpCream">
                    Hond Heeft Diarree: Oorzaken en Behandeling
                  </h3>
                  <p className="text-cpCharcoal/70 dark:text-cpCream/70">
                    Ontdek wat je kunt doen als je hond diarree heeft en wanneer je naar de dierenarts moet.
                  </p>
                </Link>

                <Link
                  href="/nl/gids/hondengezondheid/tekenen-zieke-hond"
                  className="block p-6 bg-white dark:bg-cpSurface rounded-xl hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-2 text-cpCharcoal dark:text-cpCream">
                    10 Tekenen dat Je Hond Ziek Is
                  </h3>
                  <p className="text-cpCharcoal/70 dark:text-cpCream/70">
                    Leer de waarschuwingssignalen herkennen die aangeven dat je hond medische aandacht nodig heeft.
                  </p>
                </Link>

                <Link
                  href="/nl/gids/hondenvoeding/beste-hondenvoer-gevoelige-maag"
                  className="block p-6 bg-white dark:bg-cpSurface rounded-xl hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-2 text-cpCharcoal dark:text-cpCream">
                    Beste Hondenvoer voor Gevoelige Maag
                  </h3>
                  <p className="text-cpCharcoal/70 dark:text-cpCream/70">
                    Vergelijk hondenvoer merken die geschikt zijn voor honden met maagproblemen.
                  </p>
                </Link>

                <Link
                  href="/nl/gids/hondengezondheid/eerste-hulp-hond"
                  className="block p-6 bg-white dark:bg-cpSurface rounded-xl hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-2 text-cpCharcoal dark:text-cpCream">
                    Eerste Hulp Bij Honden: Complete Gids
                  </h3>
                  <p className="text-cpCharcoal/70 dark:text-cpCream/70">
                    Leer wat je moet doen in noodsituaties met je hond.
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
              <Link href="/blog/tag/hond-braakt" className="px-3 py-1 bg-cpCream dark:bg-cpSurface rounded-full text-sm hover:bg-cpAmber transition-colors">
                hond braakt
              </Link>
              <Link href="/blog/tag/hondengezondheid" className="px-3 py-1 bg-cpCream dark:bg-cpSurface rounded-full text-sm hover:bg-cpAmber transition-colors">
                hondengezondheid
              </Link>
              <Link href="/blog/tag/dierenarts" className="px-3 py-1 bg-cpCream dark:bg-cpSurface rounded-full text-sm hover:bg-cpAmber transition-colors">
                dierenarts
              </Link>
              <Link href="/blog/tag/maagproblemen" className="px-3 py-1 bg-cpCream dark:bg-cpSurface rounded-full text-sm hover:bg-cpAmber transition-colors">
                maagproblemen
              </Link>
              <Link href="/blog/tag/noodgeval" className="px-3 py-1 bg-cpCream dark:bg-cpSurface rounded-full text-sm hover:bg-cpAmber transition-colors">
                noodgeval
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
                    Wat is geel schuim?
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    7 Oorzaken van geel braken
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Wanneer naar dierenarts?
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Wat kun je zelf doen?
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Preventiemaatregelen
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
            headline: 'Hond Braakt Geel Schuim: 7 Oorzaken en Wat Te Doen',
            description: 'Ontdek waarom je hond geel schuim braakt, wanneer het gevaarlijk is en wat je kunt doen.',
            image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=630&fit=crop',
            datePublished: '2025-01-14T10:30:00Z',
            dateModified: '2025-01-14T10:30:00Z',
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
              '@id': 'https://cutiepawspedia.nl/blog/hond-braakt-geel-schuim',
            },
          }),
        }}
      />
    </div>
  );
}
