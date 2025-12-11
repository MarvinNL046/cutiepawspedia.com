import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Tag, Calendar } from 'lucide-react';
import BetweenContentAd from '@/components/ads/BetweenContentAd';
import BlogSidebarAd from '@/components/ads/BlogSidebarAd';
import PhotoCredit from '@/components/PhotoCredit';

export const metadata: Metadata = {
  title: 'Waarom Likt Mijn Hond Mijn Gezicht? 5 Verrassende Verklaringen | CutiePawsPedia',
  description: 'Ontdek waarom honden je gezicht likken. Van liefde tot communicatie - leer de 5 redenen achter dit gedrag en wanneer je het moet ontmoedigen.',
  keywords: 'hond likt gezicht, hond likt, likgedrag hond, waarom likt hond, hond gedrag, hond communicatie',
  openGraph: {
    title: 'Waarom Likt Mijn Hond Mijn Gezicht? 5 Verklaringen',
    description: 'Begrijp waarom je hond je gezicht likt en wat dit gedrag betekent.',
    type: 'article',
    publishedTime: '2025-01-11T08:30:00Z',
    authors: ['CutiePawsPedia Team'],
    images: [{ url: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=1200&h=630&fit=crop' }],
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
              href="/blog/categorie/huisdiergedrag"
              className="inline-block mb-4 px-4 py-2 bg-cpCoral text-white rounded-full text-sm font-medium hover:bg-opacity-80 transition-colors"
            >
              Huisdiergedrag
            </Link>

            {/* Article Header */}
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-cpCharcoal dark:text-cpCream mb-4">
                Waarom Likt Mijn Hond Mijn Gezicht? 5 Verrassende Verklaringen
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-cpCharcoal/70 dark:text-cpCream/70 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime="2025-01-11">11 januari 2025</time>
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
                src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=1200&h=800&fit=crop"
                alt="Hond likt gezicht van eigenaar"
                fill
                className="object-cover"
                priority
              />
            </div>
            <PhotoCredit
              photographerName="Alvan Nee"
              photographerUrl="https://unsplash.com/@alvannee"
              platform="Unsplash"
            />

            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-8 text-cpCharcoal dark:text-cpCream">
              <p className="lead text-xl mb-6">
                Je komt thuis en wordt begroet door een enthousiast likfestijn in je gezicht. Of je zit rustig op de bank en
                plots begint je hond je gezicht te likken. Voor veel hondeneigenaren is dit herkenbaar gedrag, maar wat betekent
                het eigenlijk? Waarom likken honden onze gezichten? Is het liefde, gewoon een gewoonte, of heeft het een diepere
                betekenis? In dit artikel duiken we in de 5 belangrijkste redenen waarom honden dit doen en wat je eraan kunt
                doen als je het gedrag wilt stoppen.
              </p>
            </div>

            {/* Main Content Sections */}
            <div className="prose prose-lg max-w-none text-cpCharcoal dark:text-cpCream">
              <h2 className="text-3xl font-bold mt-12 mb-6 text-cpCharcoal dark:text-cpCream">
                5 Redenen waarom honden je gezicht likken
              </h2>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                1. Genegenheid en liefde tonen
              </h3>
              <p>
                De meest romantische verklaring - en deels waar! Wanneer honden je gezicht likken, kan dit inderdaad een teken
                van genegenheid zijn. Dit gedrag heeft zijn oorsprong in puppygedrag: jonge hondjes likken de snuit van hun
                moeder om aandacht en voedsel te vragen. Als volwassen hond blijft dit likken een manier om een band te uiten.
              </p>
              <p>
                Wanneer je hond je gezicht likt en daarbij ontspannen is, met een kwispelende staart en zachte ogen, is het
                waarschijnlijk een uiting van liefde en verbondenheid. Het vrijmaken van endorfines tijdens het likken maakt je
                hond (en mogelijk jou) ook gelukkig, wat de band versterkt.
              </p>
              <p><strong>Herkenningspunten van genegenheid-likken:</strong></p>
              <ul className="space-y-2 mb-6">
                <li>Rustige, ontspannen lichaamstaal</li>
                <li>Zachte, langzame likkenbewegingen</li>
                <li>Kwispelende staart in neutrale positie</li>
                <li>Gebeurt meestal na afwezigheid of tijdens rustige momenten</li>
                <li>Hond zoekt oogcontact en nabijheid</li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                2. Je smaakt gewoon heel lekker
              </h3>
              <p>
                Dit klinkt misschien minder romantisch, maar het is een belangrijke reden: je gezicht (en vooral je mond) heeft
                interessante smaken voor je hond. Honden hebben een uitstekende reukzin en proeven dingen die voor ons onmerkbaar
                zijn.
              </p>
              <p><strong>Wat smaakt je hond op je gezicht?</strong></p>
              <ul className="space-y-2 mb-6">
                <li><strong>Zout van zweet:</strong> Honden vinden de zoute smaak van menselijk zweet aantrekkelijk</li>
                <li><strong>Resten van voedsel:</strong> Etensresten rond je mond zijn onweerstaanbaar</li>
                <li><strong>Huidoliën en crèmes:</strong> Gezichtscrèmes, make-up en andere producten</li>
                <li><strong>Je unieke geur:</strong> Elke persoon heeft een eigen geur die honden fascinerend vinden</li>
              </ul>
              <p>
                Als je hond vooral na het eten je gezicht likt, of gericht je mond en lippen likt, is de kans groot dat het om
                de smaak gaat!
              </p>

              <BetweenContentAd />

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                3. Aandacht vragen
              </h3>
              <p>
                Honden zijn slimme dieren die snel leren welk gedrag leidt tot aandacht. Als je hond je gezicht likt en jij
                reageert - of het nu positief is (aaien, praten) of negatief (wegduwen, "nee" zeggen) - heeft je hond geleerd
                dat likken aandacht oplevert.
              </p>
              <p>
                Voor honden is alle aandacht beter dan géén aandacht. Zelfs als je je hond wegduwt of corrigeert, interpreteert
                hij dit als interactie. Dit kan een zichzelf versterkende cyclus worden: hond likt → krijgt aandacht → likt
                vaker.
              </p>
              <p><strong>Situaties waar likken voor aandacht gebruikt wordt:</strong></p>
              <ul className="space-y-2 mb-6">
                <li>Je bent bezig met je telefoon of laptop en negeert je hond</li>
                <li>Je hond wil spelen of naar buiten</li>
                <li>Rond etenstijd of wandeltijd</li>
                <li>Je hond is verveeld of heeft energie over</li>
                <li>Je hebt andere huisdieren aandacht gegeven maar je hond niet</li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                4. Onderdanigheid en respect tonen
              </h3>
              <p>
                In hondenroedels likken ondergeschikte honden de snuit van de roedelleider als teken van respect en
                onderdanigheid. Door jouw gezicht te likken, erkent je hond jou als de leider en toont onderworpenheid.
              </p>
              <p>
                Dit is meestal positief gedrag en toont aan dat je hond je respecteert. Het komt vooral voor bij honden met een
                meer onderdanig karakter of in situaties waar de hond zich onzeker voelt en geruststelling zoekt.
              </p>
              <p><strong>Tekenen dat het om onderdanigheid gaat:</strong></p>
              <ul className="space-y-2 mb-6">
                <li>Hond heeft lage lichaamshouding</li>
                <li>Oren naar achteren of plat</li>
                <li>Staart laag of tussen de benen</li>
                <li>Vermijdt direct oogcontact</li>
                <li>Gebeurt na correctie of in nieuwe/onzekere situaties</li>
                <li>Vaak gecombineerd met andere onderdanige signalen (op rug rollen, plassen)</li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                5. Stress of onzekerheid uiten
              </h3>
              <p>
                Niet alle gezichtslikken is positief. Soms likken honden uit stress, angst of onzekerheid. Likken kan een
                zelfkalmerende actie zijn, vergelijkbaar met hoe mensen op hun nagels bijten of friemelen wanneer ze nerveus zijn.
              </p>
              <p>
                Als je hond je gezicht likt in stressvolle situaties - tijdens een onweersbui, bij de dierenarts, als er vreemden
                in huis zijn, of na een verhuizing - kan het een manier zijn om zichzelf te kalmeren en troost bij jou te zoeken.
              </p>
              <p><strong>Signalen dat likken door stress komt:</strong></p>
              <ul className="space-y-2 mb-6">
                <li>Herhaaldelijk, dwangmatig likken</li>
                <li>Gespannen lichaamshouding</li>
                <li>Gapen, lippen likken, pupillen verwijd</li>
                <li>Hijgen zonder dat het warm is</li>
                <li>Oren naar achteren, staart laag</li>
                <li>Gebeurt in duidelijk stressvolle situaties</li>
                <li>Hond zoekt excessief nabijheid en kan niet ontspannen</li>
              </ul>

              <BetweenContentAd />

              <h2 className="text-3xl font-bold mt-12 mb-6 text-cpCharcoal dark:text-cpCream">
                Is het gezond om je hond je gezicht te laten likken?
              </h2>
              <p>
                Dit is een vraag die veel mensen zich stellen. Het korte antwoord: het hangt ervan af.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                Risico's van gezichtslikken
              </h3>
              <ul className="space-y-3 mb-6">
                <li>
                  <strong>Bacteriën:</strong> Hondenmonden bevatten bacteriën die potentieel schadelijk kunnen zijn voor mensen,
                  vooral als je een verzwakt immuunsysteem hebt. Voorbeelden zijn Campylobacter, Salmonella en E. coli.
                </li>
                <li>
                  <strong>Parasieten:</strong> Honden kunnen parasieten zoals Giardia of wormen overdragen via speeksel.
                </li>
                <li>
                  <strong>Infecties:</strong> Als je open wonden, sneetjes of jeukende huid in je gezicht hebt, kunnen bacteriën
                  infecties veroorzaken.
                </li>
                <li>
                  <strong>Allergieën:</strong> Sommige mensen kunnen allergisch reageren op hondenspeeksel.
                </li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                Veiliger manier van likken toestaan
              </h3>
              <p>
                Als je het gedrag leuk vindt maar gezondheidsrisico's wilt minimaliseren:
              </p>
              <ul className="space-y-2 mb-6">
                <li>Laat je hond je handen likken in plaats van je gezicht</li>
                <li>Was je gezicht en handen na likken</li>
                <li>Voorkom dat je hond je mond en neus likt</li>
                <li>Zorg voor goede tandverzorging bij je hond (verminderen bacteriën)</li>
                <li>Houd je hond gezond met regelmatige ontworming en vaccinaties</li>
                <li>Kinderen, ouderen en mensen met verzwakt immuunsysteem: extra voorzichtig</li>
              </ul>

              <p className="bg-cpAmber/10 border-l-4 border-cpAmber p-4 rounded-lg my-6">
                <strong>Let op:</strong> Als je zwanger bent, een auto-immuunziekte hebt, chemotherapie ondergaat, of andere
                immuunsysteem problemen hebt, overleg dan met je arts over de veiligheid van contact met hondenspeeksel.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-cpCharcoal dark:text-cpCream">
                Hoe stop je overmatig gezichtslikken?
              </h2>
              <p>
                Als je het likgedrag wilt ontmoedigen of stoppen, hier zijn effectieve strategieën:
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                1. Geef geen aandacht aan het likken
              </h3>
              <p>
                De meest effectieve methode: negeer je hond volledig als hij begint te likken.
              </p>
              <ul className="space-y-2 mb-6">
                <li>Draai je gezicht weg of sta op en loop weg</li>
                <li>Geen oogcontact, geen praten, geen aanraken</li>
                <li>Wacht tot je hond stopt, dan geef je aandacht</li>
                <li>Wees consistent - als je soms wel en soms geen aandacht geeft, versterkt dat het gedrag</li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                2. Bied een alternatief gedrag aan
              </h3>
              <p>
                Train je hond om iets anders te doen in plaats van likken:
              </p>
              <ul className="space-y-2 mb-6">
                <li>Leer je hond het commando "zit" of "poot geven" en beloon dit</li>
                <li>Als je hond wil likken, vraag een alternatief gedrag en beloon</li>
                <li>Geef een speeltje of kauwbot als afleiding</li>
                <li>Train "naar je plekje" commando voor rustige momenten</li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                3. Gebruik positieve bekrachtiging
              </h3>
              <p>
                Beloon je hond wanneer hij NIET likt:
              </p>
              <ul className="space-y-2 mb-6">
                <li>Geef snoepjes en complimenten wanneer je hond rustig bij je zit zonder te likken</li>
                <li>Beloon kalm begroetingsgedrag zonder likken</li>
                <li>Gebruik een klikker om gewenst gedrag te markeren</li>
              </ul>

              <BetweenContentAd />

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                4. Vermijd situaties die likken triggeren
              </h3>
              <ul className="space-y-2 mb-6">
                <li>Was je gezicht na het eten om voedselresten te verwijderen</li>
                <li>Vermijd dat je hond je gezicht kan bereiken tijdens begroetingen (kniel niet)</li>
                <li>Zorg voor voldoende speeltijd om energie kwijt te raken</li>
                <li>Geef mentale stimulatie via puzzels en training</li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                5. Spreek een commando uit
              </h3>
              <p>
                Train een "genoeg" of "stop" commando:
              </p>
              <ol className="space-y-2 mb-6 list-decimal list-inside">
                <li>Als je hond begint te likken, zeg kalm "genoeg"</li>
                <li>Draai je weg en negeer je hond kort</li>
                <li>Als je hond stopt, beloon met aandacht of snoepje</li>
                <li>Herhaal consistent tot je hond het commando begrijpt</li>
              </ol>

              <p>
                <strong>Belangrijk:</strong> Gebruik nooit fysieke straf of negatieve bekrachtiging. Wegduwen, schreeuwen of
                straffen verergert vaak het gedrag en beschadigt jullie band.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-cpCharcoal dark:text-cpCream">
                Wanneer is overmatig likken een probleem?
              </h2>
              <p>
                In sommige gevallen kan overmatig likken wijzen op een gezondheidsprobleem:
              </p>
              <ul className="space-y-3 mb-6">
                <li>
                  <strong>Dwangmatig likken:</strong> Als je hond zichzelf of voorwerpen excessief likt, kan dit wijzen op
                  obsessief-compulsief gedrag (OCD).
                </li>
                <li>
                  <strong>Tandproblemen:</strong> Honden met pijnlijke tanden of tandvlees kunnen meer likken.
                </li>
                <li>
                  <strong>Spijsverteringsproblemen:</strong> Maag-darmproblemen kunnen leiden tot overmatig likken.
                </li>
                <li>
                  <strong>Chronische stress:</strong> Continue stress of angst kan leiden tot dwangmatig likgedrag.
                </li>
                <li>
                  <strong>Neurologische problemen:</strong> In zeldzame gevallen kunnen hersenafwijkingen leiden tot abnormaal gedrag.
                </li>
              </ul>
              <p>
                <strong>Wanneer naar de dierenarts?</strong> Als het likken plots verandert (veel meer of anders), obsessief wordt,
                gepaard gaat met andere symptomen (geen eetlust, lethargie, braken), of als gedragsveranderingen opvallen, neem
                dan contact op met je dierenarts.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-cpCharcoal dark:text-cpCream">
                Conclusie
              </h2>
              <p>
                Honden likken je gezicht om verschillende redenen: genegenheid, smaak, aandacht vragen, respect tonen, of om
                stress te verlichten. Het is meestal onschuldig gedrag dat past bij de natuurlijke communicatie van honden. Of je
                het toestaat is een persoonlijke keuze, maar wees je bewust van mogelijke gezondheidsrisico's, vooral voor
                kwetsbare personen.
              </p>
              <p>
                Als je het gedrag wilt verminderen, gebruik dan positieve training methoden: negeer het likken, bied alternatieven
                aan, en beloon gewenst gedrag. Wees consistent en geduldig - gedragsverandering kost tijd.
              </p>
              <p>
                Het belangrijkste is dat je de communicatie van je hond begrijpt. Of je het likken nu tolereert of niet, het is
                een manier waarop je hond met je probeert te verbinden. Door zijn gedrag te begrijpen, kun je beter inspelen op
                zijn behoeften en een sterkere band opbouwen.
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
                      Betekent het dat mijn hond van me houdt als hij mijn gezicht likt?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="mt-4 px-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Ja, in veel gevallen is gezichtslikken een teken van genegenheid en verbondenheid. Vooral als je hond ontspannen
                    is, met een kwispelende staart en zachte oogcontact, is het waarschijnlijk een uiting van liefde. Echter, honden
                    kunnen ook om andere redenen likken (smaak, aandacht, onderdanigheid), dus context is belangrijk. Als je hond
                    vaak bij je wil zijn, ontspannen is in je nabijheid en andere tekenen van gehechtheid toont, kun je er zeker
                    van zijn dat hij van je houdt - met of zonder likken!
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-cpCream dark:bg-cpCharcoal rounded-lg hover:bg-cpAmber/20 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Kunnen hondenkussen ziek maken?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="mt-4 px-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Het risico is laag voor gezonde volwassenen, maar niet nul. Hondenmonden bevatten bacteriën die potentieel
                    schadelijk kunnen zijn, vooral voor mensen met verzwakte immuunsystemen, jonge kinderen, ouderen, of mensen met
                    open wonden. Infecties zijn zeldzaam maar kunnen voorkomen. Als je je hond laat likken, was dan je gezicht en
                    handen daarna, voorkom likken van je mond en neus, en zorg voor goede tandverzorging bij je hond. Bij
                    gezondheidsproblemen of zwangerschap: overleg met je arts.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-cpCream dark:bg-cpCharcoal rounded-lg hover:bg-cpAmber/20 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Waarom likt mijn hond vooral 's ochtends mijn gezicht?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="mt-4 px-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Ochtendlikken kan verschillende redenen hebben: (1) Je hond is blij je te zien na de nacht, (2) Je gezicht heeft
                    meer zout en geur opgebouwd tijdens het slapen, wat aantrekkelijk is, (3) Je hond wil je wakker maken voor voer
                    of een wandeling, (4) Het is een onderdeel geworden van jullie ochtendritueel. Als je dit wilt verminderen,
                    negeer het likken en beloon je hond pas als hij rustig is. Zorg ook voor vaste voer- en wandeltijden zodat je
                    hond niet zo wanhopig je aandacht probeert te trekken.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-cpCream dark:bg-cpCharcoal rounded-lg hover:bg-cpAmber/20 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Mijn hond likt obsessief - moet ik me zorgen maken?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="mt-4 px-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Ja, obsessief likken kan wijzen op een probleem. Het kan een teken zijn van dwangmatig gedrag (OCD), chronische
                    stress, pijn, spijsverteringsproblemen of neurologische aandoeningen. Als je hond oncontroleerbaar likt
                    (zichzelf, voorwerpen, of jou), moeilijk te stoppen is, of als het gedrag plots is veranderd, raadpleeg dan je
                    dierenarts. Een volledig lichamelijk onderzoek kan medische oorzaken uitsluiten, en indien nodig kan een
                    gedragstherapeut helpen bij het aanpakken van angst- of dwangproblemen.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-cpCream dark:bg-cpCharcoal rounded-lg hover:bg-cpAmber/20 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Hoe stop ik mijn hond met likken zonder hem te kwetsen?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="mt-4 px-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    De beste methode is positieve training zonder straf: (1) Negeer het likken volledig - draai weg, geen
                    oogcontact, geen praten, (2) Belooning alternatief gedrag zoals "zit" of "poot geven", (3) Geef aandacht pas
                    wanneer je hond rustig is en niet likt, (4) Wees consistent - altijd dezelfde reactie, (5) Zorg voor voldoende
                    speeltijd en mentale stimulatie. Gebruik NOOIT fysieke straf, schreeuwen of geweld. Dit beschadigt jullie band
                    en verergert vaak het gedrag. Geduld en consistentie zijn essentieel - gedragsverandering kost tijd.
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
                  href="/nl/gids/hondengedrag/hondenlichaamstaal-begrijpen"
                  className="block p-6 bg-white dark:bg-cpSurface rounded-xl hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-2 text-cpCharcoal dark:text-cpCream">
                    Hondenlichaamstaal Begrijpen: Complete Gids
                  </h3>
                  <p className="text-cpCharcoal/70 dark:text-cpCream/70">
                    Leer de signalen en lichaamstaal van je hond te lezen voor betere communicatie.
                  </p>
                </Link>

                <Link
                  href="/nl/gids/hondengedrag/hond-gedragsproblemen-oplossen"
                  className="block p-6 bg-white dark:bg-cpSurface rounded-xl hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-2 text-cpCharcoal dark:text-cpCream">
                    Hond Gedragsproblemen Oplossen met Positieve Training
                  </h3>
                  <p className="text-cpCharcoal/70 dark:text-cpCream/70">
                    Effectieve methoden om ongewenst gedrag aan te pakken zonder straf.
                  </p>
                </Link>

                <Link
                  href="/nl/gids/hondengedrag/hond-aandacht-vragen"
                  className="block p-6 bg-white dark:bg-cpSurface rounded-xl hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-2 text-cpCharcoal dark:text-cpCream">
                    Waarom Vraagt Mijn Hond Constant Aandacht?
                  </h3>
                  <p className="text-cpCharcoal/70 dark:text-cpCream/70">
                    Begrijp waarom je hond aandacht zoekt en leer het op een gezonde manier te managen.
                  </p>
                </Link>

                <Link
                  href="/nl/gids/hondentraining/basis-commando-training"
                  className="block p-6 bg-white dark:bg-cpSurface rounded-xl hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-2 text-cpCharcoal dark:text-cpCream">
                    Basis Commando's Trainen: Step-by-Step Gids
                  </h3>
                  <p className="text-cpCharcoal/70 dark:text-cpCream/70">
                    Leer je hond essentiële commando's met positieve bekrachtiging.
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
              <Link href="/blog/tag/hond-likt" className="px-3 py-1 bg-cpCream dark:bg-cpSurface rounded-full text-sm hover:bg-cpAmber transition-colors">
                hond likt
              </Link>
              <Link href="/blog/tag/hondengedrag" className="px-3 py-1 bg-cpCream dark:bg-cpSurface rounded-full text-sm hover:bg-cpAmber transition-colors">
                hondengedrag
              </Link>
              <Link href="/blog/tag/honden-communicatie" className="px-3 py-1 bg-cpCream dark:bg-cpSurface rounded-full text-sm hover:bg-cpAmber transition-colors">
                honden communicatie
              </Link>
              <Link href="/blog/tag/hondenlichaamstaal" className="px-3 py-1 bg-cpCream dark:bg-cpSurface rounded-full text-sm hover:bg-cpAmber transition-colors">
                hondenlichaamstaal
              </Link>
              <Link href="/blog/tag/hond-training" className="px-3 py-1 bg-cpCream dark:bg-cpSurface rounded-full text-sm hover:bg-cpAmber transition-colors">
                hond training
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
                    5 Redenen voor likken
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Is het gezond?
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Hoe stop je het?
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Wanneer is het een probleem?
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
            headline: 'Waarom Likt Mijn Hond Mijn Gezicht? 5 Verrassende Verklaringen',
            description: 'Ontdek waarom honden je gezicht likken. Van liefde tot communicatie - leer de 5 redenen achter dit gedrag.',
            image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=1200&h=630&fit=crop',
            datePublished: '2025-01-11T08:30:00Z',
            dateModified: '2025-01-11T08:30:00Z',
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
              '@id': 'https://cutiepawspedia.nl/blog/waarom-likt-hond-gezicht',
            },
          }),
        }}
      />
    </div>
  );
}
