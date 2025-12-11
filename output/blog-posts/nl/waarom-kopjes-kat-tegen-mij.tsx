import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import PhotoCredit from '@/components/PhotoCredit';
import BetweenContentAd from '@/components/BetweenContentAd';
import BlogSidebarAd from '@/components/BlogSidebarAd';

export const metadata: Metadata = {
  title: 'Waarom kopjes mijn kat tegen mij aan? 7 verrassende redenen | CutiePawsPedia',
  description: 'Ontdek waarom je kat kopjes geeft en wat dit gedrag betekent. Van territoriummarkering tot genegenheid: alle redenen achter dit schattige kattengedrag uitgelegd.',
  keywords: 'kat kopjes, kat knuffelen, kat genegenheid, kattengedrag, kat wrijft langs mij',
  openGraph: {
    title: 'Waarom kopjes mijn kat tegen mij aan? 7 verrassende redenen',
    description: 'Ontdek de fascinerende redenen waarom je kat kopjes geeft en wat dit gedrag echt betekent.',
    images: ['/images/blog/waarom-kopjes-kat.jpg'],
    type: 'article',
  },
};

export default function WaaromKopjesKatTegenMij() {
  return (
    <div className="min-h-screen bg-cpCream dark:bg-cpCharcoal">
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block bg-cpAmber text-white px-4 py-1 rounded-full text-sm font-semibold">
                Huisdiergedrag
              </span>
            </div>

            {/* Article Header */}
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-cpCharcoal dark:text-cpCream mb-4">
                Waarom kopjes mijn kat tegen mij aan? 7 verrassende redenen
              </h1>
              <div className="flex items-center text-cpCharcoal/70 dark:text-cpCream/70 text-sm space-x-4">
                <time dateTime="2025-01-15">15 januari 2025</time>
                <span>•</span>
                <span>7 min leestijd</span>
              </div>
            </header>

            {/* Featured Image */}
            <div className="mb-8 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=1200&h=600&fit=crop"
                alt="Kat geeft kopjes aan eigenaar"
                width={1200}
                height={600}
                className="w-full h-auto"
                priority
              />
              <PhotoCredit
                photographerName="Raul Varzar"
                photographerUrl="https://unsplash.com/@raulvarzar"
                platform="Unsplash"
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-xl text-cpCharcoal/80 dark:text-cpCream/80 mb-6">
                Als je een kat hebt, herken je het vast: je zit rustig op de bank en plotseling komt je kat naar je toe om haar kop tegen je been, arm of gezicht te wrijven. Dit lieve gedrag wordt ook wel 'bunting' of 'head bunting' genoemd. Maar waarom doen katten dit eigenlijk? In dit artikel ontdek je alle fascinerende redenen achter dit schattige kattengedrag.
              </p>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Wat is kopjes geven precies?
              </h2>
              <p>
                Kopjes geven is een gedrag waarbij een kat haar kop, wangen en soms zelfs haar hele lichaam tegen je, andere katten of voorwerpen aanwrijft. Dit wordt 'bunting' genoemd en is een natuurlijk en normaal kattengedrag. Het is belangrijk om dit niet te verwarren met het 'botsen' van koppen dat katten soms doen tijdens het spelen - kopjes geven is altijd zacht en liefdevol.
              </p>
              <p>
                Katten hebben speciale geurklieren (ook wel feromoonklieren genoemd) op verschillende plaatsen van hun lichaam, vooral rondom hun gezicht. Deze klieren bevinden zich:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Aan weerszijden van hun voorhoofd</li>
                <li>Op hun wangen</li>
                <li>Rond hun mond en kin</li>
                <li>Aan de basis van hun oren</li>
              </ul>
              <p>
                Wanneer je kat kopjes geeft, verspreidt ze deze feromonen. Deze geuren zijn voor mensen niet waarneembaar, maar vormen voor katten een belangrijk communicatiemiddel.
              </p>

              <BetweenContentAd />

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                7 redenen waarom je kat kopjes geeft
              </h2>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                1. Genegenheid en liefde tonen
              </h3>
              <p>
                De meest voor de hand liggende reden is simpelweg <strong>liefde en genegenheid</strong>. Als je kat kopjes tegen je geeft, is dit een teken van vertrouwen en affectie. Ze laat je weten dat ze zich veilig bij je voelt en je waardeert als haar mens.
              </p>
              <p>
                Dit gedrag zie je ook tussen katten die elkaar mogen - ze wrijven hun koppen tegen elkaar als begroeting en om hun sociale band te versterken. Als je kat dit bij jou doet, beschouwt ze je als onderdeel van haar sociale groep of 'familie'.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                2. Territoriummarkering: "Jij bent van mij"
              </h3>
              <p>
                Katten zijn territoriaal en kopjes geven is een manier om <strong>hun territorium te markeren</strong>. Door hun geur op jou achter te laten, claimen ze je eigenlijk als 'van hun'. Dit is geen bezitterig of negatief gedrag, maar eerder een compliment!
              </p>
              <p>
                Je kat markeert niet alleen jou, maar ook meubilair, deurkozijnen en andere voorwerpen in huis. Op deze manier creëert ze een vertrouwde geuromgeving waarin ze zich veilig en comfortabel voelt. Als je thuiskomt na een dag werken en je kat meteen kopjes komt geven, probeert ze haar geur weer op je aan te brengen nadat je vreemde geuren van buitenaf hebt opgedaan.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                3. Begroeting: "Hoi, ik ben blij je te zien!"
              </h3>
              <p>
                Kopjes geven is ook een <strong>begroetingsritueel</strong>. Als je thuiskomt na een afwezigheid (zelfs als het maar een paar uur was), gebruikt je kat dit gedrag om je welkom te heten. Het is haar manier om te zeggen: "Hoi! Ik heb je gemist en ben blij dat je terug bent."
              </p>
              <p>
                Dit gedrag is vergelijkbaar met hoe mensen elkaar begroeten met een omhelzing of handdruk. Voor katten is kopjes geven een respectvolle en liefdevolle manier om sociale contacten te onderhouden.
              </p>

              <BetweenContentAd />

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                4. Aandacht vragen
              </h3>
              <p>
                Soms geeft je kat kopjes omdat ze <strong>iets van je wil</strong>. Dit kan zijn:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Voedsel:</strong> Het is etenstijd en je kat wil je daar vriendelijk aan herinneren</li>
                <li><strong>Aandacht:</strong> Ze wil geaaid worden of met je spelen</li>
                <li><strong>De deur openen:</strong> Ze wil naar buiten of een kamer in</li>
                <li><strong>Haar bak is vies:</strong> Tijd om de kattenbak schoon te maken</li>
              </ul>
              <p>
                Als je kat kopjes geeft gevolgd door miauwen of je naar een bepaalde plek leidt, is dit een duidelijk signaal dat ze iets van je nodig heeft. Observeer haar gedrag goed om te begrijpen wat ze probeert te communiceren.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                5. Stress- en angstverlichting
              </h3>
              <p>
                Het afgeven van feromonen tijdens het kopjes geven heeft een <strong>kalmerend effect</strong> op katten. Als je kat gestrest is (bijvoorbeeld door een bezoek aan de dierenarts, een verhuizing of luid geluid), kan ze kopjes geven om zichzelf te kalmeren.
              </p>
              <p>
                De vertrouwde geur die ze achterlaat, helpt haar om zich veiliger en meer ontspannen te voelen. Door jou te markeren met haar geur, versterkt ze de band met iets bekends en veiligs (jou!), wat haar helpt om met stressvolle situaties om te gaan.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                6. Informatie verzamelen
              </h3>
              <p>
                Katten gebruiken hun uitstekende reukvermogen om <strong>informatie te verzamelen</strong>. Als je kat kopjes geeft en daarna aan je ruikt, is ze aan het ontdekken waar je bent geweest, wie of wat je hebt aangeraakt, en wat je hebt gedaan.
              </p>
              <p>
                Ben je bij een vriend geweest met een hond? Je kat ruikt het meteen. Dit gedrag is niet alleen nieuwsgierigheid, maar ook een manier voor je kat om haar omgeving en sociale wereld beter te begrijpen.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                7. Een gevoel van eigendom en comfort creëren
              </h3>
              <p>
                Door kopjes te geven aan voorwerpen en mensen in huis, creëert je kat een <strong>vertrouwde 'groepsgeur'</strong>. Alle leden van het huishouden (mensen en andere huisdieren) en voorwerpen worden gemarkeerd met een gemeenschappelijke geur die aangeeft dat ze tot dezelfde sociale groep behoren.
              </p>
              <p>
                Dit geeft je kat een gevoel van veiligheid en stabiliteit. Het is haar manier om haar 'kolonie' te definiëren en te onderhouden.
              </p>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Het verschil tussen kopjes geven en andere kattengedragingen
              </h2>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Kopjes geven vs. spinnen
              </h3>
              <p>
                Kopjes geven gaat vaak gepaard met <strong>spinnen</strong>. Als je kat tegen je aankruipt, kopjes geeft én spint, is ze zeer content en gelukkig. Spinnen is een vocale uitdrukking van tevredenheid, terwijl kopjes geven meer een fysieke en geurcommunicatie is.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Kopjes geven vs. duwen met de kop
              </h3>
              <p>
                Sommige katten 'duwen' met hun kop in plaats van zacht te wrijven. Dit kan een dringender verzoek zijn om aandacht of voedsel. Let op de context en je kat's lichaamstaal om te bepalen wat ze probeert te communiceren.
              </p>

              <BetweenContentAd />

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Hoe moet je reageren als je kat kopjes geeft?
              </h2>

              <div className="bg-cpAmber/10 border-l-4 border-cpAmber p-6 rounded-r-lg mb-6">
                <h3 className="font-bold text-lg mb-3">Positief reageren versterkt de band</h3>
                <p className="mb-3">
                  Kopjes geven is een positief gedrag dat je moet aanmoedigen. Hier zijn enkele manieren om te reageren:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Geef aandacht:</strong> Aai je kat zachtjes op haar favoriete plekken (vaak de kin, wangen of achter de oren)</li>
                  <li><strong>Praat vriendelijk:</strong> Gebruik een zachte, liefdevolle stem om je kat gerust te stellen</li>
                  <li><strong>Geef kopjes terug:</strong> Je kunt voorzichtig je voorhoofd tegen je kat's kop drukken om je liefde te tonen</li>
                  <li><strong>Laat haar leiden:</strong> Als je kat stopt met kopjes geven, forceer het niet. Respecteer haar grenzen</li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Wanneer is kopjes geven problematisch?
              </h2>
              <p>
                In de meeste gevallen is kopjes geven een normaal, gezond gedrag. Er zijn echter situaties waarin het op een probleem kan wijzen:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Overdreven kopjes geven:</strong> Als je kat obsessief kopjes geeft en niet kan stoppen, kan dit op angst of een dwangstoornis wijzen</li>
                <li><strong>Agressief gedrag:</strong> Als kopjes geven gepaard gaat met bijten, krassen of blazen, kan dit een teken van frustratie of pijn zijn</li>
                <li><strong>Plotselinge verandering:</strong> Als een kat die normaal geen kopjes gaf plotseling veel begint te doen (of andersom), kan dit wijzen op een medisch probleem of stress</li>
              </ul>
              <p>
                Raadpleeg een dierenarts of gedragsdeskundige als je zorgen hebt over het gedrag van je kat.
              </p>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Vergelijk met ander kattengedrag
              </h2>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Kneden (trappelen met de pootjes)
              </h3>
              <p>
                Net als kopjes geven, is <strong>kneden</strong> een teken van comfort en tevredenheid. Kittens kneden hun moeder tijdens het drinken om de melkproductie te stimuleren. Volwassen katten behouden dit gedrag als uiting van geluk en ontspanning.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Staart omhoog
              </h3>
              <p>
                Als je kat kopjes geeft met haar <strong>staart rechtop</strong>, is dit een extra positief signaal. Een rechtopstaande staart met een lichte krul aan de punt betekent dat je kat zich gelukkig, zelfverzekerd en vriendelijk voelt.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Langzaam knipperen
              </h3>
              <p>
                Als je kat kopjes geeft en je daarna aankijkt met <strong>langzame knippers</strong>, is dit de ultieme kattenkus. Het is haar manier om te zeggen: "Ik vertrouw je volledig en voel me ontspannen bij jou."
              </p>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Conclusie: Kopjes geven is een teken van liefde
              </h2>
              <p>
                Kopjes geven is een van de mooiste manieren waarop katten hun liefde, vertrouwen en genegenheid tonen. Het is een combinatie van territoriummarkering, communicatie en affectie die aangeeft dat je een belangrijke plek inneemt in het leven van je kat.
              </p>
              <p>
                De volgende keer dat je kat tegen je aan kopjes geeft, weet je dat dit veel meer betekent dan alleen een fysieke aanraking. Het is haar manier om te zeggen: "Jij bent mijn mens, ik hou van je, en ik voel me veilig bij jou."
              </p>
              <p>
                Geniet van deze liefdevolle momenten en koester de unieke band die je met je kat hebt!
              </p>

              {/* FAQ Section */}
              <div className="mt-12 bg-cpSurface dark:bg-cpCharcoal/50 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mb-6">
                  Veelgestelde vragen
                </h2>
                <div className="space-y-4">
                  <details className="group">
                    <summary className="font-semibold text-lg cursor-pointer text-cpCharcoal dark:text-cpCream hover:text-cpAmber transition-colors">
                      Waarom geeft mijn kat alleen bij mij kopjes en niet bij andere gezinsleden?
                    </summary>
                    <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80 pl-4">
                      Dit betekent waarschijnlijk dat je kat een sterkere band met jou heeft. Katten kiezen vaak een 'favoriete persoon' in het huishouden. Dit kan komen doordat jij degene bent die haar het meeste voedt, met haar speelt, of gewoon de persoon bent waarbij ze zich het meest comfortabel voelt.
                    </p>
                  </details>

                  <details className="group">
                    <summary className="font-semibold text-lg cursor-pointer text-cpCharcoal dark:text-cpCream hover:text-cpAmber transition-colors">
                      Is het normaal dat mijn kat kopjes geeft aan voorwerpen in plaats van aan mij?
                    </summary>
                    <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80 pl-4">
                      Ja, dit is volkomen normaal! Katten markeren graag hun hele territorium, inclusief meubilair, deurkozijnen en andere voorwerpen. Dit helpt hen om zich veilig en comfortabel te voelen in hun omgeving. Als je kat ook tegen jou kopjes geeft, is dat een extra bonus!
                    </p>
                  </details>

                  <details className="group">
                    <summary className="font-semibold text-lg cursor-pointer text-cpCharcoal dark:text-cpCream hover:text-cpAmber transition-colors">
                      Mijn kat gaf altijd kopjes maar is daar plotseling mee gestopt, waarom?
                    </summary>
                    <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80 pl-4">
                      Een plotselinge verandering in gedrag kan wijzen op stress, ziekte of pijn. Zijn er veranderingen geweest in je huis (nieuwe huisgenoot, verhuizing, nieuwe meubels)? Is je kat ouder geworden? Bij twijfel, raadpleeg een dierenarts om medische oorzaken uit te sluiten.
                    </p>
                  </details>

                  <details className="group">
                    <summary className="font-semibold text-lg cursor-pointer text-cpCharcoal dark:text-cpCream hover:text-cpAmber transition-colors">
                      Kan ik mijn kat leren om meer kopjes te geven?
                    </summary>
                    <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80 pl-4">
                      Je kunt dit gedrag aanmoedigen door positief te reageren wanneer je kat kopjes geeft: geef aandacht, aai haar, en praat vriendelijk. Sommige katten zijn van nature gewoon minder fysiek gericht dan anderen. Respecteer haar persoonlijkheid en forceer nooit affectie.
                    </p>
                  </details>

                  <details className="group">
                    <summary className="font-semibold text-lg cursor-pointer text-cpCharcoal dark:text-cpCream hover:text-cpAmber transition-colors">
                      Waarom geeft mijn kat kopjes en bijt ze dan zachtjes?
                    </summary>
                    <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80 pl-4">
                      Zachte 'love bites' na kopjes geven zijn normaal gedrag. Het is een vorm van sociale grooming en affectie. Als de beetjes echter pijnlijk worden, kan dit betekenen dat je kat overbewust is of dat het spelen te intens wordt. Trek je hand dan rustig terug en geef haar even ruimte.
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
                    href="/gids/kattengedrag/kat-spint-betekenis"
                    className="p-4 bg-white dark:bg-cpCharcoal/30 rounded-xl hover:shadow-lg transition-shadow"
                  >
                    <h3 className="font-semibold text-cpCharcoal dark:text-cpCream hover:text-cpAmber transition-colors">
                      Waarom spint mijn kat? Betekenis van spinnen
                    </h3>
                  </Link>
                  <Link
                    href="/gids/kattengedrag/staart-lichaamstaal"
                    className="p-4 bg-white dark:bg-cpCharcoal/30 rounded-xl hover:shadow-lg transition-shadow"
                  >
                    <h3 className="font-semibold text-cpCharcoal dark:text-cpCream hover:text-cpAmber transition-colors">
                      Staart lichaamstaal: wat zegt je kat?
                    </h3>
                  </Link>
                  <Link
                    href="/gids/kattengedrag/kneden-trappelen-betekenis"
                    className="p-4 bg-white dark:bg-cpCharcoal/30 rounded-xl hover:shadow-lg transition-shadow"
                  >
                    <h3 className="font-semibold text-cpCharcoal dark:text-cpCream hover:text-cpAmber transition-colors">
                      Waarom kneedt mijn kat? Trappelen uitgelegd
                    </h3>
                  </Link>
                  <Link
                    href="/gids/kattenverzorging/band-versterken-kat"
                    className="p-4 bg-white dark:bg-cpCharcoal/30 rounded-xl hover:shadow-lg transition-shadow"
                  >
                    <h3 className="font-semibold text-cpCharcoal dark:text-cpCream hover:text-cpAmber transition-colors">
                      Band versterken met je kat: 10 tips
                    </h3>
                  </Link>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-cpCharcoal/10 dark:border-cpCream/10">
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-cpAmber/10 text-cpAmber rounded-full text-sm font-medium">
                    kat kopjes
                  </span>
                  <span className="px-4 py-2 bg-cpAmber/10 text-cpAmber rounded-full text-sm font-medium">
                    kattengedrag
                  </span>
                  <span className="px-4 py-2 bg-cpAmber/10 text-cpAmber rounded-full text-sm font-medium">
                    kat genegenheid
                  </span>
                  <span className="px-4 py-2 bg-cpAmber/10 text-cpAmber rounded-full text-sm font-medium">
                    bunting
                  </span>
                  <span className="px-4 py-2 bg-cpAmber/10 text-cpAmber rounded-full text-sm font-medium">
                    kattenlichaamstaal
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              <BlogSidebarAd />

              {/* Quick Facts */}
              <div className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-2xl p-6">
                <h3 className="font-bold text-lg text-cpCharcoal dark:text-cpCream mb-4">
                  Snelle feiten
                </h3>
                <ul className="space-y-3 text-sm text-cpCharcoal/80 dark:text-cpCream/80">
                  <li className="flex items-start">
                    <span className="text-cpAmber mr-2">✓</span>
                    <span>Kopjes geven = teken van liefde en vertrouwen</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cpAmber mr-2">✓</span>
                    <span>Katten hebben geurklieren op hun gezicht</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cpAmber mr-2">✓</span>
                    <span>Territoriummarkering is normaal gedrag</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cpAmber mr-2">✓</span>
                    <span>Reageer positief om gedrag te versterken</span>
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
            "headline": "Waarom kopjes mijn kat tegen mij aan? 7 verrassende redenen",
            "description": "Ontdek waarom je kat kopjes geeft en wat dit gedrag betekent. Van territoriummarkering tot genegenheid: alle redenen achter dit schattige kattengedrag uitgelegd.",
            "image": "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=1200&h=600&fit=crop",
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
