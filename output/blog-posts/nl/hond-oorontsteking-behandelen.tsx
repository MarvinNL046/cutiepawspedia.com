import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BetweenContentAd } from '@/components/ads/BetweenContentAd';
import { BlogSidebarAd } from '@/components/ads/BlogSidebarAd';
import { PhotoCredit } from '@/components/PhotoCredit';

export const metadata: Metadata = {
  title: 'Hond Oorontsteking: Herkennen, Behandelen & Voorkomen | CutiePawsPedia',
  description: 'Is je hond zijn hoofd aan het schudden of krabt hij aan zijn oren? Leer de tekenen van oorontsteking bij honden herkennen en hoe je het effectief behandelt.',
  keywords: 'hond oorontsteking, hond schudt hoofd, hond jeuk oren, otitis hond, oorinfectie hond, hond pijnlijke oren',
  openGraph: {
    title: 'Hond Oorontsteking: Herkennen en Behandelen',
    description: 'Ontdek hoe je oorontsteking bij je hond herkent en wat je eraan kunt doen.',
    type: 'article',
    publishedTime: '2025-01-15T10:00:00Z',
    authors: ['CutiePawsPedia'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Hond met oorontsteking'
      }
    ]
  }
};

export default function HondOorontstekingPage() {
  return (
    <article className="min-h-screen bg-cpCream dark:bg-cpCharcoal">
      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Hond heeft last van oorontsteking: herkennen en behandelen',
            description: 'Uitgebreide gids over het herkennen en behandelen van oorontsteking bij honden',
            image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1200&h=630&fit=crop',
            datePublished: '2025-01-15T10:00:00Z',
            dateModified: '2025-01-15T10:00:00Z',
            author: {
              '@type': 'Organization',
              name: 'CutiePawsPedia'
            },
            publisher: {
              '@type': 'Organization',
              name: 'CutiePawsPedia',
              logo: {
                '@type': 'ImageObject',
                url: 'https://cutiepawspedia.nl/logo.png'
              }
            }
          })
        }}
      />

      {/* Hero Section */}
      <header className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1600&h=900&fit=crop"
          alt="Hond met oorontsteking die zijn hoofd schuin houdt"
          fill
          className="object-cover"
          priority
        />
        <PhotoCredit
          photographerName="Karsten Winegeart"
          photographerUrl="https://unsplash.com/@karsten116"
          platform="Unsplash"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cpCharcoal/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1 bg-cpCoral text-white text-sm font-semibold rounded-full mb-4">
              Dierengezondheid
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Hond heeft last van oorontsteking: herkennen en behandelen
            </h1>
            <div className="flex items-center text-cpCream/80 text-sm">
              <time dateTime="2025-01-15">15 januari 2025</time>
              <span className="mx-3">•</span>
              <span>8 minuten leestijd</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:flex md:gap-8">
        {/* Article Content */}
        <main className="md:w-2/3">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-xl text-cpCharcoal/80 dark:text-cpCream/80 leading-relaxed">
              Schudt je hond voortdurend zijn hoofd of krabt hij wanhopig aan zijn oren? Dan kan er sprake zijn van een oorontsteking. Dit komt bij honden helaas vaak voor en kan behoorlijk vervelend zijn. In deze gids leer je alles over het herkennen, behandelen en voorkomen van oorontsteking bij jouw trouwe viervoeter.
            </p>

            <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
              Wat is oorontsteking bij honden?
            </h2>
            <p>
              Oorontsteking, ook wel otitis genoemd, is een ontsteking van het oor die op verschillende plekken kan voorkomen. Bij honden komt oorontsteking van de uitwendige gehoorgang (otitis externa) het meest voor. Dit is het deel van het oor dat loopt van de oorschelp tot het trommelvlies.
            </p>
            <p>
              De ontsteking kan worden veroorzaakt door bacterien, gisten, parasieten (zoals oormijt), allergieën of vreemde voorwerpen in het oor. Sommige hondenrassen zijn gevoeliger voor oorontstekingen dan andere, vooral rassen met hangende oren zoals Cocker Spaniels, Basset Hounds en Golden Retrievers.
            </p>

            <BetweenContentAd />

            <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
              Herkenbare symptomen van oorontsteking
            </h2>
            <p>
              Een oorontsteking herken je aan een combinatie van gedragsveranderingen en fysieke signalen. Let op de volgende tekenen:
            </p>
            <ul className="space-y-2">
              <li><strong>Kopschudden:</strong> Je hond schudt voortdurend of regelmatig met zijn hoofd</li>
              <li><strong>Oorjeukt:</strong> Hij krabt intensief aan of achter zijn oren, soms zelfs tot bloeden toe</li>
              <li><strong>Hoofd schuin houden:</strong> De kop wordt scheef gehouden, vaak aan de kant van het aangedane oor</li>
              <li><strong>Geur:</strong> Een onaangename, vaak zoetlige of zure geur uit het oor</li>
              <li><strong>Afscheiding:</strong> Geel, bruin of zwart oorsmeer, soms met pus of bloed</li>
              <li><strong>Roodheid en zwelling:</strong> Het binnenste van de oorschelp ziet rood en geïrriteerd uit</li>
              <li><strong>Pijn:</strong> Je hond reageert gevoelig wanneer je zijn oor aanraakt of erbij in de buurt komt</li>
              <li><strong>Gedragsverandering:</strong> Hij is minder actief, lusteloos of geïrriteerd</li>
            </ul>
            <p>
              Zie je een of meerdere van deze symptomen? Neem dan contact op met je dierenarts voor een grondige controle.
            </p>

            <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
              Oorzaken van oorontsteking
            </h2>
            <p>
              Oorontsteking bij honden kan verschillende oorzaken hebben. Het is belangrijk om de onderliggende oorzaak te achterhalen, anders blijft de ontsteking terugkomen. De meest voorkomende oorzaken zijn:
            </p>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              1. Bacteriële of gistinfecties
            </h3>
            <p>
              Bacteriën en gisten groeien graag in een warm, vochtig milieu. De oorkanalen van honden bieden hiervoor helaas ideale omstandigheden, vooral bij rassen met hangende oren of bij honden die vaak zwemmen.
            </p>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              2. Allergieën
            </h3>
            <p>
              Voedselallergieën en omgevingsallergieën (zoals hooikoorts) kunnen oorontstekingen veroorzaken. De allergische reactie zorgt voor ontstekingen en jeuk, waardoor je hond gaat krabben en secundaire infecties kan oplopen.
            </p>

            <BetweenContentAd />

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              3. Oormijt
            </h3>
            <p>
              Oormijt zijn microscopisch kleine parasieten die in de gehoorgang leven. Ze veroorzaken intense jeuk en je ziet vaak donkere, kruimelige afscheiding in het oor. Oormijt is besmettelijk tussen dieren.
            </p>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              4. Vreemde voorwerpen
            </h3>
            <p>
              Grassprieten, zaden of andere kleine voorwerpen kunnen in het oor terechtkomen tijdens het wandelen of spelen. Dit veroorzaakt irritatie en kan leiden tot ontstekingen.
            </p>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              5. Anatomie en omgeving
            </h3>
            <p>
              Honden met hangende oren, veel haar in de gehoorgang of kleine oorkanalen hebben een verhoogd risico. Ook honden die veel zwemmen of in vochtige omgevingen leven, zijn gevoeliger.
            </p>

            <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
              Behandeling door de dierenarts
            </h2>
            <p>
              Een bezoek aan de dierenarts is essentieel bij vermoeden van oorontsteking. Probeer het nooit zelf te behandelen zonder diagnose, want de verkeerde behandeling kan de situatie verergeren.
            </p>
            <p>
              De dierenarts zal het volgende doen:
            </p>
            <ul className="space-y-2">
              <li><strong>Onderzoek:</strong> Het oor wordt onderzocht met een otoscoop om de gehoorgang en het trommelvlies te bekijken</li>
              <li><strong>Uitstrijkje:</strong> Een monster van het oorsmeer wordt onder de microscoop bekeken om de oorzaak te bepalen</li>
              <li><strong>Reiniging:</strong> Bij ernstige vervuiling wordt het oor professioneel gereinigd, soms onder sedatie</li>
              <li><strong>Medicatie:</strong> Afhankelijk van de oorzaak krijg je oordruppels of -zalf met antibiotica, antischimmelmiddel of ontstekingsremmer</li>
              <li><strong>Pijnstilling:</strong> Bij veel pijn kunnen pijnstillers worden voorgeschreven</li>
              <li><strong>Follow-up:</strong> Een controleafspraak om te checken of de behandeling aanslaat</li>
            </ul>

            <BetweenContentAd />

            <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
              Thuiszorg tijdens behandeling
            </h2>
            <p>
              Naast de veterinaire behandeling kun je thuis veel doen om je hond te helpen genezen:
            </p>
            <ul className="space-y-2">
              <li><strong>Medicatie toedienen:</strong> Volg precies de instructies van de dierenarts, ook als het oor er beter uitziet</li>
              <li><strong>Oren droog houden:</strong> Vermijd zwemmen en zorg dat er geen water in de oren komt tijdens het wassen</li>
              <li><strong>Kraag gebruiken:</strong> Gebruik indien nodig een beschermkraag om te voorkomen dat je hond zijn oren beschadigt door krabben</li>
              <li><strong>Comfort bieden:</strong> Zorg voor extra rust en een zachte slaapplaats</li>
              <li><strong>Monitoren:</strong> Houd de symptomen goed in de gaten en meld verslechteringen direct</li>
              <li><strong>Niet zelf reinigen:</strong> Reinig de oren alleen als de dierenarts dit heeft aangegeven en met de juiste producten</li>
            </ul>

            <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
              Preventie: oorontstekingen voorkomen
            </h2>
            <p>
              Voorkomen is beter dan genezen. Met deze tips verminder je de kans op oorontstekingen aanzienlijk:
            </p>
            <ul className="space-y-2">
              <li><strong>Regelmatige controle:</strong> Check de oren wekelijks op roodheid, geur of afscheiding</li>
              <li><strong>Droog houden:</strong> Droog de oren goed na zwemmen of wassen, eventueel met watten</li>
              <li><strong>Professionele reiniging:</strong> Laat de oren tijdens trimsessies of bij de dierenarts reinigen</li>
              <li><strong>Haar trimmen:</strong> Bij rassen met veel oorhaar kan trimmen helpen (laat dit door een professional doen)</li>
              <li><strong>Allergiemanagement:</strong> Als je hond allergieën heeft, werk dan aan het beheersen hiervan</li>
              <li><strong>Goede voeding:</strong> Een gezond dieet ondersteunt het immuunsysteem</li>
              <li><strong>Geen wattenstaafjes:</strong> Gebruik nooit wattenstaafjes in het oor, dit duwt vuil dieper en kan schade veroorzaken</li>
            </ul>

            <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
              Wanneer moet je direct naar de dierenarts?
            </h2>
            <p>
              In sommige gevallen is spoed geboden. Neem onmiddellijk contact op met de dierenarts bij:
            </p>
            <ul className="space-y-2">
              <li>Zeer acute, ernstige pijn waarbij je hond zijn hoofd niet meer kan aanraken</li>
              <li>Bloederige afscheiding uit het oor</li>
              <li>Plotselinge gehoorstoornissen of balansstoornissen</li>
              <li>Zwelling aan de buitenkant van het hoofd nabij het oor</li>
              <li>Hoge koorts in combinatie met oorproblemen</li>
              <li>Symptomen die niet verbeteren na 2-3 dagen behandeling</li>
              <li>Terugkerende oorontstekingen (meer dan 2-3 keer per jaar)</li>
            </ul>

            <div className="bg-cpAmber/10 dark:bg-cpAmber/5 border-l-4 border-cpAmber p-6 my-8 rounded-r-lg">
              <h3 className="text-lg font-semibold text-cpCharcoal dark:text-cpCream mb-2">
                Let op: chronische oorontstekingen
              </h3>
              <p className="text-cpCharcoal/80 dark:text-cpCream/80">
                Blijven oorontstekingen terugkomen? Dan is er mogelijk een onderliggende oorzaak zoals allergieën, schildklierproblemen of anatomische afwijkingen. Bespreek met je dierenarts of nader onderzoek of een verwijzing naar een specialist nodig is.
              </p>
            </div>

            {/* FAQ Section */}
            <div className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 my-12">
              <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mb-6">
                Veelgestelde vragen
              </h2>
              <div className="space-y-4">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-white dark:bg-cpCharcoal rounded-lg hover:bg-cpCream/50 dark:hover:bg-cpCharcoal/80 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Kan een oorontsteking bij honden vanzelf overgaan?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <p className="px-4 pb-4 text-cpCharcoal/70 dark:text-cpCream/70">
                    Nee, een oorontsteking gaat vrijwel nooit vanzelf over. Zonder behandeling kan de ontsteking verergeren, zich verspreiden naar het middenoor of binnenoor, en leiden tot blijvende gehoorstoornissen of chronische pijn. Vroege behandeling door een dierenarts is essentieel.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-white dark:bg-cpCharcoal rounded-lg hover:bg-cpCream/50 dark:hover:bg-cpCharcoal/80 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Hoe lang duurt het voordat een oorontsteking genezen is?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <p className="px-4 pb-4 text-cpCharcoal/70 dark:text-cpCream/70">
                    Bij een ongecompliceerde oorontsteking zie je meestal binnen 3-5 dagen verbetering. De volledige behandeling duurt vaak 7-14 dagen. Chronische of ernstige gevallen kunnen langer duren. Belangrijk is om de volledige kuur af te maken, ook als de symptomen al verdwenen lijken.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-white dark:bg-cpCharcoal rounded-lg hover:bg-cpCream/50 dark:hover:bg-cpCharcoal/80 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Zijn oorontstekingen besmettelijk voor andere honden?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <p className="px-4 pb-4 text-cpCharcoal/70 dark:text-cpCream/70">
                    Dat hangt af van de oorzaak. Bacteriële en gistinfecties zijn niet besmettelijk. Oormijt daarentegen is wel besmettelijk tussen honden en andere huisdieren. Als je meerdere dieren hebt en een van hen heeft oormijt, is het verstandig om alle dieren te behandelen.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-white dark:bg-cpCharcoal rounded-lg hover:bg-cpCream/50 dark:hover:bg-cpCharcoal/80 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Mag ik menselijke oordruppels gebruiken voor mijn hond?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <p className="px-4 pb-4 text-cpCharcoal/70 dark:text-cpCream/70">
                    Nee, absoluut niet! Menselijke oordruppels kunnen schadelijk zijn voor honden en de situatie verergeren. De pH-waarde en samenstelling zijn anders. Gebruik alleen medicatie die specifiek door een dierenarts is voorgeschreven voor jouw hond. Verkeerde medicatie kan blijvende gehoorschade veroorzaken.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-white dark:bg-cpCharcoal rounded-lg hover:bg-cpCream/50 dark:hover:bg-cpCharcoal/80 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Wat kost de behandeling van een oorontsteking?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <p className="px-4 pb-4 text-cpCharcoal/70 dark:text-cpCream/70">
                    De kosten variëren tussen €50 en €200 voor een eenvoudige oorontsteking, inclusief consult, diagnostiek en medicatie. Bij chronische of complexe gevallen waarbij specialistisch onderzoek of zware reiniging onder narcose nodig is, kunnen de kosten oplopen tot €500 of meer. Een goede dierenverzekering kan helpen deze kosten te dekken.
                  </p>
                </details>
              </div>
            </div>

            {/* Related Articles */}
            <div className="bg-cpCoral/5 dark:bg-cpCoral/10 rounded-lg p-6 my-12">
              <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mb-4">
                Gerelateerde artikelen
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/gids/dierengezondheid/hond-jeuk-vacht"
                    className="text-cpCoral hover:text-cpCoral/80 dark:text-cpCoral dark:hover:text-cpCoral/80 font-medium transition-colors flex items-center group"
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Hond heeft jeuk: oorzaken en oplossingen
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gids/dierengezondheid/hond-dierenarts-bezoek"
                    className="text-cpCoral hover:text-cpCoral/80 dark:text-cpCoral dark:hover:text-cpCoral/80 font-medium transition-colors flex items-center group"
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Wanneer moet je met je hond naar de dierenarts?
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gids/hondenrassen/gevoelige-honden"
                    className="text-cpCoral hover:text-cpCoral/80 dark:text-cpCoral dark:hover:text-cpCoral/80 font-medium transition-colors flex items-center group"
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Hondenrassen gevoelig voor gezondheidsproblemen
                  </Link>
                </li>
              </ul>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-cpCharcoal/10 dark:border-cpCream/10">
              <span className="px-3 py-1 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream text-sm rounded-full">
                hond oorontsteking
              </span>
              <span className="px-3 py-1 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream text-sm rounded-full">
                otitis hond
              </span>
              <span className="px-3 py-1 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream text-sm rounded-full">
                hond schudt hoofd
              </span>
              <span className="px-3 py-1 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream text-sm rounded-full">
                hond jeuk oren
              </span>
              <span className="px-3 py-1 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream text-sm rounded-full">
                dierengezondheid
              </span>
            </div>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="md:w-1/3 mt-12 md:mt-0">
          <div className="sticky top-8">
            <BlogSidebarAd />
          </div>
        </aside>
      </div>
    </article>
  );
}
