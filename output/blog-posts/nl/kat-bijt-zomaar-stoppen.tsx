import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Tag, Calendar } from 'lucide-react';
import BetweenContentAd from '@/components/ads/BetweenContentAd';
import BlogSidebarAd from '@/components/ads/BlogSidebarAd';
import PhotoCredit from '@/components/PhotoCredit';

export const metadata: Metadata = {
  title: 'Kat Bijt Zomaar: 6 Redenen en Hoe Stop Je Het? | CutiePawsPedia',
  description: 'Ontdek waarom je kat zomaar bijt en leer effectieve methoden om bijtgedrag te stoppen. Complete gids met oorzaken, oplossingen en preventiemaatregelen.',
  keywords: 'kat bijt, bijtende kat, agressieve kat, kattengedrag, kat bijt plots, kat aanvallen stoppen',
  openGraph: {
    title: 'Kat Bijt Zomaar: Waarom en Hoe Stop Je Het?',
    description: 'Praktische gids om te begrijpen waarom je kat bijt en hoe je dit gedrag kunt stoppen.',
    type: 'article',
    publishedTime: '2025-01-13T11:00:00Z',
    authors: ['CutiePawsPedia Team'],
    images: [{ url: 'https://images.unsplash.com/photo-1573865526739-10c1deaeef4a?w=1200&h=630&fit=crop' }],
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
                Kat Bijt Zomaar: 6 Redenen en Hoe Stop Je Het?
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-cpCharcoal/70 dark:text-cpCream/70 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime="2025-01-13">13 januari 2025</time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>10 min leestijd</span>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <div className="relative w-full h-[400px] mb-6 rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1573865526739-10c1deaeef4a?w=1200&h=800&fit=crop"
                alt="Kat met gespitste oren kijkt alert"
                fill
                className="object-cover"
                priority
              />
            </div>
            <PhotoCredit
              photographerName="Amber Kipp"
              photographerUrl="https://unsplash.com/@sadmax"
              platform="Unsplash"
            />

            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-8 text-cpCharcoal dark:text-cpCream">
              <p className="lead text-xl mb-6">
                Je aait je kat, alles lijkt rustig en gezellig, en dan ineens - hap! Je kat bijt zomaar in je hand of arm.
                Voor veel katteneigenaren is dit verwarrend en soms pijnlijk gedrag. Waarom doet je kat dit? En belangrijker nog,
                hoe kun je het stoppen? In deze uitgebreide gids onderzoeken we de redenen achter bijtgedrag bij katten en geven
                we praktische tips om dit gedrag te verminderen of te stoppen.
              </p>
            </div>

            {/* Main Content Sections */}
            <div className="prose prose-lg max-w-none text-cpCharcoal dark:text-cpCream">
              <h2 className="text-3xl font-bold mt-12 mb-6 text-cpCharcoal dark:text-cpCream">
                Waarom bijten katten? 6 Belangrijke redenen
              </h2>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                1. Overprikkeling (Petting-Induced Aggression)
              </h3>
              <p>
                Dit is een van de meest voorkomende redenen waarom katten plots bijten tijdens het aaien. Katten hebben een
                lagere tolerantie voor aanraking dan bijvoorbeeld honden. Wat begint als een prettige aai-sessie kan snel
                overgaan in overprikkeling, waarbij je kat het gevoel krijgt dat het te veel wordt.
              </p>
              <p><strong>Waarschuwingssignalen voor overprikkeling:</strong></p>
              <ul className="space-y-2 mb-6">
                <li>Staart begint te zwiepen of klapwiekt</li>
                <li>Oren draaien naar achteren of plat tegen het hoofd</li>
                <li>Pupillen verwijden zich</li>
                <li>Huid/spieren trillen of rimpelen (vooral langs de rug)</li>
                <li>Lichaam verstijft</li>
                <li>Kat stopt met spinnen</li>
                <li>Hoofd draait naar je hand toe</li>
              </ul>
              <p>
                Deze signalen kunnen snel op elkaar volgen. Leer ze herkennen en stop met aaien zodra je ze ziet.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                2. Speelgedrag dat te grof wordt
              </h3>
              <p>
                Jonge katten en kittens leren door te spelen hoe ze moeten jagen en vechten. In het wild zouden ze dit doen
                met nestgenoten, die terugbijten wanneer het te grof wordt. Als jouw handen het speelgoed zijn geworden, heeft
                je kat niet geleerd waar de grenzen liggen.
              </p>
              <p><strong>Kenmerken van speelgedrag:</strong></p>
              <ul className="space-y-2 mb-6">
                <li>Vooral bij kittens en jonge katten (onder 2 jaar)</li>
                <li>Kat valt je voeten of handen aan vanuit een hinderlaag</li>
                <li>Pupillen zijn verwijd (jagend)</li>
                <li>Lichaamstaal is niet defensief, maar actief en energiek</li>
                <li>Gebeurt vaak bij plotse bewegingen</li>
              </ul>

              <BetweenContentAd />

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                3. Angst of defensief gedrag
              </h3>
              <p>
                Een bange kat kan bijten uit zelfverdediging. Dit gebeurt vaak als de kat zich in het nauw gedreven voelt,
                pijn heeft, of in een stressvolle situatie zit (zoals bij de dierenarts, na verhuizing, of bij nieuwe mensen/dieren).
              </p>
              <p><strong>Signalen van angstgedrag:</strong></p>
              <ul className="space-y-2 mb-6">
                <li>Kat maakt zich klein of probeert weg te komen</li>
                <li>Oren plat tegen het hoofd</li>
                <li>Blazen, grommen of spuwen</li>
                <li>Pupillen volledig verwijd</li>
                <li>Staart dicht tegen het lichaam of opgezwollen</li>
                <li>Rug kan gebogen zijn</li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                4. Pijn of ziekte
              </h3>
              <p>
                Katten zijn meesters in het verbergen van pijn. Een kat die normaal gesproken vriendelijk is maar plots begint
                te bijten, kan ergens pijn hebben. Dit kan komen door artritis, tandproblemen, blaasontsteking, of andere
                medische aandoeningen.
              </p>
              <p><strong>Let op deze tekenen:</strong></p>
              <ul className="space-y-2 mb-6">
                <li>Plots veranderd gedrag bij een normaal vriendelijke kat</li>
                <li>Bijten op specifieke plekken (bijv. buik, poten, staart)</li>
                <li>Verminderde activiteit of eetlust</li>
                <li>Meer tijd doorbrengen met zich verstoppen</li>
                <li>Veranderd verzorgingsgedrag (meer of minder)</li>
              </ul>
              <p>
                <strong>Belangrijk:</strong> Als je kat plots agressief wordt zonder duidelijke reden, maak dan een afspraak
                bij de dierenarts om medische oorzaken uit te sluiten.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                5. Omgeleide agressie (Redirected Aggression)
              </h3>
              <p>
                Dit is een gevaarlijke vorm van agressie waarbij je kat opgewonden of gefrustreerd is door iets (bijvoorbeeld
                een andere kat buiten het raam), maar deze agressie richt op jou omdat jij toevallig in de buurt bent.
              </p>
              <p><strong>Situaties die dit veroorzaken:</strong></p>
              <ul className="space-y-2 mb-6">
                <li>Kat ziet andere kat buiten door het raam</li>
                <li>Vreemde geuren of geluiden die spanning veroorzaken</li>
                <li>Kat wordt gestoord tijdens jachtgedrag</li>
                <li>Na een stressvolle gebeurtenis (dierenarts, stofzuigen, etc.)</li>
              </ul>
              <p>
                Omgeleide agressie kan intensief en gevaarlijk zijn. De kat is in "vechten of vluchten" modus en kan ernstig
                bijten en krabben.
              </p>

              <BetweenContentAd />

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                6. Communicatie: "Stop daarmee!"
              </h3>
              <p>
                Soms bijten katten als laatste waarschuwing. Ze hebben wellicht al subtiele signalen gegeven (oren naar
                achteren, staart zwiepen, zich terugtrekken), maar die werden genegeerd. De beet is dan hun manier om duidelijk
                te communiceren: "Ik wil dit niet!"
              </p>
              <p>
                Dit gebeurt vaak in situaties zoals:
              </p>
              <ul className="space-y-2 mb-6">
                <li>Nagels knippen</li>
                <li>Borstelen (vooral bij klitten)</li>
                <li>Medicijnen geven</li>
                <li>Gedwongen knuffelen of vasthouden</li>
              </ul>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-cpCharcoal dark:text-cpCream">
                Hoe stop je bijtgedrag? 10 Effectieve strategieën
              </h2>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                1. Leer de waarschuwingssignalen herkennen
              </h3>
              <p>
                De beste manier om gebeten te worden te voorkomen is door te stoppen voordat je kat tot bijten overgaat.
                Bestudeer de lichaamstaal van je kat en reageer onmiddellijk op de eerste signalen van ongemak.
              </p>
              <p><strong>Actieplan:</strong></p>
              <ul className="space-y-2 mb-6">
                <li>Stop met aaien zodra de staart begint te zwiepen</li>
                <li>Trek je hand langzaam terug als oren naar achteren gaan</li>
                <li>Geef je kat ruimte als het lichaam verstijft</li>
                <li>Neem video's van aai-sessies om signalen te leren herkennen</li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                2. Gebruik de "15-seconden regel"
              </h3>
              <p>
                Veel katten hebben een beperkte tolerantie voor aaien. Probeer om je aai-sessies kort te houden - maximaal
                15 seconden - en stop dan. Als je kat meer wil, zal het duidelijk aangeven door tegen je hand te duwen of
                te kopjes te geven.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                3. Vermijd bepaalde "trigger zones"
              </h3>
              <p>
                Veel katten hebben gevoelige zones die ze niet graag aangeraakt zien. De meeste katten vinden het prettig
                om geaaid te worden op:
              </p>
              <ul className="space-y-2 mb-4">
                <li>✓ Hoofd en wangen</li>
                <li>✓ Onder de kin</li>
                <li>✓ Basis van de oren</li>
              </ul>
              <p>Vermijd vaak:</p>
              <ul className="space-y-2 mb-6">
                <li>✗ Buik (zeer gevoelig gebied)</li>
                <li>✗ Poten en voeten</li>
                <li>✗ Staart en staartbasis</li>
                <li>✗ Rug naar staart toe</li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                4. Handen zijn geen speelgoed
              </h3>
              <p>
                Train je kat van jongs af aan dat handen en voeten geen speelgoed zijn. Als je kat tijdens het spelen bijt:
              </p>
              <ul className="space-y-2 mb-6">
                <li>Stop onmiddellijk met bewegen (beweging stimuleert het jachtinstinct)</li>
                <li>Maak een hoog "Au!" geluid (imiteert pijn, zoals een nestgenoot zou doen)</li>
                <li>Trek je hand langzaam terug</li>
                <li>Negeer je kat 5-10 minuten (geen aandacht, geen oogcontact)</li>
                <li>Hervat spelen met geschikt speelgoed, niet je handen</li>
              </ul>

              <BetweenContentAd />

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                5. Zorg voor voldoende speeltijd en energie-afvoer
              </h3>
              <p>
                Veel bijtgedrag komt voort uit opgeslagen energie en verveling, vooral bij jonge katten. Zorg voor:
              </p>
              <ul className="space-y-2 mb-6">
                <li>2-3 actieve speelsessies per dag (10-15 minuten elk)</li>
                <li>Gebruik interactief speelgoed zoals hengels en lasers</li>
                <li>Puzzelvoer en snuffelspelletjes voor mentale stimulatie</li>
                <li>Kattenboom of klimstructuren voor fysieke uitdaging</li>
                <li>Raam-perches voor entertainment (vogels kijken)</li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                6. Gebruik positieve bekrachtiging
              </h3>
              <p>
                Beloon gewenst gedrag in plaats van ongewenst gedrag te straffen. Wanneer je kat rustig is en niet bijt:
              </p>
              <ul className="space-y-2 mb-6">
                <li>Geef een snoepje</li>
                <li>Gebruik een klikker om rustig gedrag te markeren</li>
                <li>Geef zachte complimenten met kalme stem</li>
                <li>Speel op rustige momenten</li>
              </ul>
              <p>
                <strong>Nooit straffen:</strong> Slaan, schreeuwen of je kat met water besproeien verergert alleen angst en
                agressie. Dit werkt niet en beschadigt jullie band.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                7. Creëer een veilige omgeving
              </h3>
              <p>
                Zorg dat je kat plekken heeft waar het zich veilig en rustig kan voelen:
              </p>
              <ul className="space-y-2 mb-6">
                <li>Meerdere verstopplekken (kattenhuisjes, dozen, kattentunnels)</li>
                <li>Verhoogde plekken (katten voelen zich veiliger op hoogte)</li>
                <li>Rustige zones weg van drukke huishoudelijke activiteit</li>
                <li>Eigen territorium waar de kat met rust gelaten kan worden</li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                8. Socialisatie bij kittens
              </h3>
              <p>
                Als je een kitten hebt, is vroege socialisatie cruciaal. Kittens die tussen 3-14 weken positieve ervaringen
                hebben met mensen, andere katten en nieuwe situaties, ontwikkelen minder snel bijtgedrag.
              </p>
              <ul className="space-y-2 mb-6">
                <li>Laat het kitten omgaan met verschillende mensen</li>
                <li>Wen het kitten aan verschillende aanrakingen (poten, staart, oren)</li>
                <li>Speel met geschikt speelgoed, nooit handen</li>
                <li>Beloon rustig gedrag</li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                9. Overweeg een tweede kat
              </h3>
              <p>
                Voor jonge, energieke katten kan een speelmaatje van gelijke leeftijd helpen. Katten leren van elkaar wat
                te grof is en kunnen hun energie op elkaar afreageren in plaats van op jou. Let wel:
              </p>
              <ul className="space-y-2 mb-6">
                <li>Introduceer nieuwe katten langzaam en gecontroleerd</li>
                <li>Kies katten met vergelijkbare energie-niveaus</li>
                <li>Niet alle katten zijn geschikt voor samenwonen</li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                10. Raadpleeg experts bij hardnekkig gedrag
              </h3>
              <p>
                Als het bijtgedrag ernstig is, frequent voorkomt, of niet verbetert met bovenstaande strategieën, schakel
                dan professionele hulp in:
              </p>
              <ul className="space-y-2 mb-6">
                <li><strong>Dierenarts:</strong> Sluit medische oorzaken uit (pijn, ziekte)</li>
                <li><strong>Gedragstherapeut:</strong> Gecertificeerde kattengedragdeskundige kan specifiek advies geven</li>
                <li><strong>Feromoontherapie:</strong> Feliway kan helpen bij stress-gerelateerde agressie</li>
              </ul>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-cpCharcoal dark:text-cpCream">
                Wat doe je direct na een beet?
              </h2>
              <ol className="space-y-3 mb-6 list-decimal list-inside">
                <li><strong>Blijf kalm:</strong> Schreeuw niet en trek je hand niet snel terug (dit kan jachtinstinct triggeren)</li>
                <li><strong>Stop met bewegen:</strong> Maak je hand slap en beweeg niet</li>
                <li><strong>Trek je langzaam terug:</strong> Als de grip loskomt, trek langzaam en rustig terug</li>
                <li><strong>Negeer je kat:</strong> Geen oogcontact, geen praten, geen aandacht (5-10 min)</li>
                <li><strong>Was de wond:</strong> Reinig met zeep en water, desinfecteer met jodium of alcohol</li>
                <li><strong>Monitor infectie:</strong> Kattenbeten kunnen infecties veroorzaken. Bij roodheid, zwelling of pijn: arts raadplegen</li>
              </ol>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-cpCharcoal dark:text-cpCream">
                Veelgemaakte fouten die bijtgedrag verergeren
              </h2>
              <ul className="space-y-3 mb-6">
                <li><strong>Te lang aaien:</strong> Respecteer de grenzen van je kat en hou sessies kort</li>
                <li><strong>Handen als speelgoed gebruiken:</strong> Leert kat dat bijten in handen oké is</li>
                <li><strong>Negeren van waarschuwingssignalen:</strong> Leer lichaamstaal en reageer tijdig</li>
                <li><strong>Straffen:</strong> Verhoogt angst en agressie, werkt niet</li>
                <li><strong>Inconsistent zijn:</strong> Soms wel, soms niet toestaan verwarren de kat</li>
                <li><strong>Te weinig speeltijd:</strong> Energie moet ergens naartoe</li>
                <li><strong>Medische problemen negeren:</strong> Pijn kan oorzaak zijn van agressie</li>
              </ul>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-cpCharcoal dark:text-cpCream">
                Conclusie: Geduld en begrip zijn essentieel
              </h2>
              <p>
                Bijtgedrag bij katten is frustrerend, maar bijna altijd te verbeteren met de juiste aanpak. De sleutel is om
                de oorzaak te begrijpen en consistent te reageren. Katten bijten niet "zomaar" - er is altijd een reden, of
                het nu overprikkeling, spel, angst of pijn is.
              </p>
              <p>
                Met geduld, observatie en de juiste technieken kun je het bijtgedrag verminderen en een gezondere, veiligere
                relatie met je kat opbouwen. Onthoud: katten communiceren anders dan mensen. Leer hun taal te spreken en
                respecteer hun grenzen, dan zal het bijtgedrag aanzienlijk verminderen.
              </p>
              <p>
                Als het gedrag plots verandert of zeer agressief wordt, raadpleeg dan altijd een dierenarts om medische
                problemen uit te sluiten, en overweeg professionele gedragstherapie voor hardnekkige gevallen.
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
                      Waarom bijt mijn kat me terwijl ik hem aai en hij spint?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="mt-4 px-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Dit heet "petting-induced aggression" of overprikkeling. Spinnen betekent niet altijd geluk - het kan ook
                    een zelfkalmerende reactie zijn. Je kat genoot in het begin van het aaien, maar raakte overprikkeld. Leer
                    de subtiele waarschuwingssignalen te herkennen (staart zwiept, oren naar achteren) en stop met aaien voordat
                    de beet komt.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-cpCream dark:bg-cpCharcoal rounded-lg hover:bg-cpAmber/20 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Is het normaal dat mijn kitten constant bijt?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="mt-4 px-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Ja, kittens bijten vaak tijdens het spelen omdat ze leren jagen en hun grenzen verkennen. Echter, het is
                    belangrijk om ze nu al te leren dat bijten in mensenhanden niet oké is. Gebruik speelgoed in plaats van je
                    handen, stop met spelen als het kitten bijt, en geef "Au!" feedback. Katten die als kitten niet geleerd
                    hebben dat bijten pijn doet, kunnen als volwassen kat blijven bijten.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-cpCream dark:bg-cpCharcoal rounded-lg hover:bg-cpAmber/20 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Mijn kat begon plots te bijten, wat moet ik doen?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="mt-4 px-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Plotse gedragsverandering kan duiden op een medisch probleem. Maak een afspraak bij de dierenarts om pijn,
                    ziekte of andere medische aandoeningen uit te sluiten. Katten verbergen pijn vaak en agressie kan hun manier
                    zijn om te zeggen "raak me niet aan, het doet zeer". Artritis, tandproblemen, blaasontsteking en andere
                    aandoeningen kunnen bijtgedrag veroorzaken.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-cpCream dark:bg-cpCharcoal rounded-lg hover:bg-cpAmber/20 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Helpt het om mijn kat te straffen na het bijten?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="mt-4 px-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Nee, straffen werkt niet bij katten en kan het probleem verergeren. Katten begrijpen niet dat straf gerelateerd
                    is aan hun gedrag en kunnen angstiger en agressiever worden. In plaats van straffen, gebruik positieve
                    bekrachtiging (belonen van gewenst gedrag), negeer ongewenst gedrag, en zorg voor voldoende speeltijd en
                    energie-afvoer. Focus op het voorkomen van bijtgedrag door waarschuwingssignalen te herkennen.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-cpCream dark:bg-cpCharcoal rounded-lg hover:bg-cpAmber/20 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Kunnen kattenbeten gevaarlijk zijn?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="mt-4 px-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Ja, kattenbeten kunnen leiden tot infecties. Kattengebitten zijn scherp en smal, waardoor bacteriën diep in
                    het weefsel terechtkomen. Ongeveer 50% van kattenbeten raakt geïnfecteerd. Was de wond onmiddellijk met water
                    en zeep, desinfecteer met jodium, en monitor op tekenen van infectie (roodheid, zwelling, warmte, pus). Bij
                    diepe beten of tekenen van infectie, raadpleeg een arts. Kattenbeten kunnen leiden tot cellulitis of zelfs
                    sepsis als ze niet behandeld worden.
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
                  href="/nl/gids/kattengedrag/kattenlichaamstaal-begrijpen"
                  className="block p-6 bg-white dark:bg-cpSurface rounded-xl hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-2 text-cpCharcoal dark:text-cpCream">
                    Kattenlichaamstaal Begrijpen
                  </h3>
                  <p className="text-cpCharcoal/70 dark:text-cpCream/70">
                    Leer de signalen en lichaamstaal van je kat te lezen voor betere communicatie.
                  </p>
                </Link>

                <Link
                  href="/nl/gids/kattengedrag/kat-speelt-te-grof"
                  className="block p-6 bg-white dark:bg-cpSurface rounded-xl hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-2 text-cpCharcoal dark:text-cpCream">
                    Kat Speelt Te Grof: Hoe Maak Je het Rustiger?
                  </h3>
                  <p className="text-cpCharcoal/70 dark:text-cpCream/70">
                    Praktische tips om grof speelgedrag bij katten te verminderen.
                  </p>
                </Link>

                <Link
                  href="/nl/gids/kattengedrag/kitten-opvoeden-tips"
                  className="block p-6 bg-white dark:bg-cpSurface rounded-xl hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-2 text-cpCharcoal dark:text-cpCream">
                    Kitten Opvoeden: Complete Gids
                  </h3>
                  <p className="text-cpCharcoal/70 dark:text-cpCream/70">
                    Leer je kitten vanaf het begin goede gewoontes en voorkom probleemgedrag.
                  </p>
                </Link>

                <Link
                  href="/nl/gids/kattengedrag/agressieve-kat-kalmeren"
                  className="block p-6 bg-white dark:bg-cpSurface rounded-xl hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-2 text-cpCharcoal dark:text-cpCream">
                    Agressieve Kat Kalmeren: 8 Bewezen Methoden
                  </h3>
                  <p className="text-cpCharcoal/70 dark:text-cpCream/70">
                    Effectieve technieken om een agressieve kat te kalmeren en stress te verminderen.
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
              <Link href="/blog/tag/kat-bijt" className="px-3 py-1 bg-cpCream dark:bg-cpSurface rounded-full text-sm hover:bg-cpAmber transition-colors">
                kat bijt
              </Link>
              <Link href="/blog/tag/kattengedrag" className="px-3 py-1 bg-cpCream dark:bg-cpSurface rounded-full text-sm hover:bg-cpAmber transition-colors">
                kattengedrag
              </Link>
              <Link href="/blog/tag/agressieve-kat" className="px-3 py-1 bg-cpCream dark:bg-cpSurface rounded-full text-sm hover:bg-cpAmber transition-colors">
                agressieve kat
              </Link>
              <Link href="/blog/tag/kat-training" className="px-3 py-1 bg-cpCream dark:bg-cpSurface rounded-full text-sm hover:bg-cpAmber transition-colors">
                kat training
              </Link>
              <Link href="/blog/tag/kattenlichaamstaal" className="px-3 py-1 bg-cpCream dark:bg-cpSurface rounded-full text-sm hover:bg-cpAmber transition-colors">
                kattenlichaamstaal
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
                    Waarom bijten katten?
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Hoe stop je bijtgedrag?
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Wat doe je na een beet?
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Veelgemaakte fouten
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
            headline: 'Kat Bijt Zomaar: 6 Redenen en Hoe Stop Je Het?',
            description: 'Ontdek waarom je kat zomaar bijt en leer effectieve methoden om bijtgedrag te stoppen.',
            image: 'https://images.unsplash.com/photo-1573865526739-10c1deaeef4a?w=1200&h=630&fit=crop',
            datePublished: '2025-01-13T11:00:00Z',
            dateModified: '2025-01-13T11:00:00Z',
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
              '@id': 'https://cutiepawspedia.nl/blog/kat-bijt-zomaar-stoppen',
            },
          }),
        }}
      />
    </div>
  );
}
