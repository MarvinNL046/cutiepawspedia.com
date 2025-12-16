import type { Metadata } from 'next';
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: 'Zijn Rozijnen Giftig voor Honden? Extra Gevaarlijk! | CutiePawsPedia',
  description: 'Rozijnen zijn extreem giftig voor honden - geconcentreerder dan druiven. Leer over het risico op nierfalen, symptomen en wat te doen bij inname.',
  keywords: 'rozijnen giftig honden, hond rozijnen gegeten, rozijnenvergiftiging, gedroogde druiven hond',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Zijn Rozijnen Giftig voor Honden? Extra Gevaarlijk!',
    description: 'Rozijnen zijn extreem giftig voor honden - nog gevaarlijker dan verse druiven. Ontdek waarom en wat je moet doen.',
    type: 'article',
    locale: 'nl_NL',
  },
};

export default function IsRozijnenGiftigVoorHondenPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'Zijn Rozijnen Giftig voor Honden?',
        description: 'Uitgebreide gids over rozijnenvergiftiging bij honden en waarom gedroogde druiven extra gevaarlijk zijn.',
        datePublished: '2025-12-15',
        dateModified: '2025-12-15',
        author: {
          '@type': 'Organization',
          name: 'CutiePawsPedia',
        },
        publisher: {
          '@type': 'Organization',
          name: 'CutiePawsPedia',
          logo: {
            '@type': 'ImageObject',
            url: 'https://cutiepawspedia.com/logo.png',
          },
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Waarom zijn rozijnen gevaarlijker dan verse druiven?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Rozijnen zijn geconcentreerde druiven waarbij het water is verwijderd. Dit betekent dat de giftige stof veel geconcentreerder aanwezig is in een kleiner volume. Daarnaast zijn rozijnen kleiner en gemakkelijker te eten in grotere hoeveelheden, wat het risico vergroot.',
            },
          },
          {
            '@type': 'Question',
            name: 'Hoeveel rozijnen kunnen dodelijk zijn?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Er is geen veilige hoeveelheid bekend. Sommige honden vertonen ernstige symptomen na slechts 3-5 rozijnen. De reactie is onvoorspelbaar en hangt af van individuele gevoeligheid. Behandel elke inname als noodgeval.',
            },
          },
          {
            '@type': 'Question',
            name: 'Welke producten bevatten rozijnen?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Rozijnen zitten in veel voedingsmiddelen: rozijnenbrood, fruitcake, ontbijtgranen, trail mix, koekjes, mueslirepen, kerstbrood en fruit-notenmixen. Controleer altijd ingrediëntenlabels.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wat zijn de eerste symptomen van rozijnenvergiftiging?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Braken is vaak het eerste symptom en kan binnen enkele uren optreden. Andere vroege tekenen zijn diarree, lethargie, verminderde eetlust en buikpijn. Symptomen van nierschade volgen binnen 24-72 uur.',
            },
          },
          {
            '@type': 'Question',
            name: 'Mijn hond at rozijnen uit een fruitcake, wat nu?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Neem onmiddellijk contact op met je dierenarts, zelfs als je hond nog geen symptomen vertoont. Noteer hoeveel cake en wanneer gegeten, en volg direct het advies van de dierenarts op. Tijd is cruciaal bij rozijnenvergiftiging.',
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-8">
          <FoodGuideBreadcrumb
            locale="nl"
            items={[
              { name: "Voedselgids", href: "/nl/voedselgids" },
              { name: "Giftige Stoffen", href: "/nl/giftige-stoffen" },
            ]}
            currentPage="Rozijnen voor Honden"
          />

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 mt-6">
            Zijn Rozijnen Giftig voor Honden?
          </h1>
        </header>

        {/* TL;DR Verdict Box */}
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 rounded-r-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-red-900 mb-2">Toxiciteit: HOOG - Extreem Gevaarlijk</h3>
              <p className="text-red-800">
                <strong>Ja, rozijnen zijn extreem giftig voor honden - nog gevaarlijker dan verse druiven.</strong> Rozijnen zijn gedroogde druiven waarbij de giftige stof is geconcentreerd. Zelfs een handjevol rozijnen kan acuut nierfalen veroorzaken dat dodelijk kan zijn. Rozijnen zitten ook in veel voedingsmiddelen zoals rozijnenbrood, ontbijtgranen en trail mix. Neem onmiddellijk contact op met je dierenarts als je hond rozijnen heeft gegeten.
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-8">
          <p className="text-xl text-gray-700 leading-relaxed">
            Rozijnen behoren tot de gevaarlijkste voedingsmiddelen voor honden en zijn nog toxischer dan verse druiven. Tijdens het droogproces wordt het water uit druiven verwijderd, waardoor de giftige stof geconcentreerd wordt in een kleiner volume. Dit maakt rozijnen bijzonder verraderlijk: een klein handjevol kan al levensgevaarlijk zijn. Bovendien zitten rozijnen verstopt in veel dagelijkse voedingsmiddelen zoals brood, ontbijtgranen en koekjes, waardoor het risico op accidentele inname groter is. Dit artikel legt uit waarom rozijnen zo gevaarlijk zijn en wat je moet doen als je hond ze heeft gegeten.
          </p>
        </div>

        {/* Why Dangerous Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-emerald-500 pb-2">
            Waarom zijn Rozijnen Extra Gevaarlijk voor Honden?
          </h2>

          <div className="bg-red-50 rounded-lg p-6 mb-6 border-l-4 border-red-500">
            <h3 className="text-xl font-semibold text-red-900 mb-3">Geconcentreerde Toxiciteit</h3>
            <p className="text-red-800 mb-4">
              Rozijnen zijn verse druiven waaruit het water is verwijderd. Dit concentratieproces maakt rozijnen bijzonder gevaarlijk:
            </p>
            <ul className="space-y-2 text-red-800">
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-2">•</span>
                <span><strong>4x meer geconcentreerd:</strong> Het duurt ongeveer 4 kg verse druiven om 1 kg rozijnen te maken - alle toxiciteit in 1/4 van het volume</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-2">•</span>
                <span><strong>Kleinere grootte:</strong> Rozijnen zijn kleiner en gemakkelijker te eten in grote hoeveelheden</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-2">•</span>
                <span><strong>Snellere absorptie:</strong> Gedroogd fruit kan sneller worden verteerd</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-2">•</span>
                <span><strong>Vaak toegevoegde suikers:</strong> Sommige rozijnen worden behandeld met extra suiker, wat de aantrekkelijkheid voor honden vergroot</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Dezelfde Nefrotoxische Werking</h3>
            <p className="text-gray-700 mb-4">
              Net als verse druiven veroorzaken rozijnen acuut nierfalen bij honden. De giftige stof (waarschijnlijk wijnsteenzuur) beschadigt de niertubuli, wat leidt tot:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-emerald-600 font-bold mr-2">→</span>
                <span>Directe schade aan niercellen (necrose)</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 font-bold mr-2">→</span>
                <span>Verminderde filterfunctie van de nieren</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 font-bold mr-2">→</span>
                <span>Ophoping van toxische afvalstoffen in het bloed</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 font-bold mr-2">→</span>
                <span>Mogelijk volledig nierfalen binnen 24-72 uur</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 font-bold mr-2">→</span>
                <span>Zonder behandeling: coma en overlijden</span>
              </li>
            </ul>
          </div>

          <div className="bg-yellow-50 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-yellow-900 mb-3">Verstopt in Dagelijks Voedsel</h3>
            <p className="text-yellow-800 mb-4">
              Rozijnen zijn gevaarlijk omdat ze in zoveel alledaagse producten zitten:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-yellow-900 mb-2">Bakproducten:</h4>
                <ul className="space-y-1 text-yellow-800 text-sm">
                  <li>• Rozijnenbrood en fruitbrood</li>
                  <li>• Kerstbrood en stollen</li>
                  <li>• Fruitcake</li>
                  <li>• Koekjes met rozijnen</li>
                  <li>• Scones en broodjes</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-yellow-900 mb-2">Ontbijt & Snacks:</h4>
                <ul className="space-y-1 text-yellow-800 text-sm">
                  <li>• Ontbijtgranen (muesli, granola)</li>
                  <li>• Trail mix en studentenhaver</li>
                  <li>• Mueslirepen</li>
                  <li>• Haver met rozijnen</li>
                  <li>• Fruit-notenmixen</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-orange-900 mb-2">Feestdagen = Extra Risico</h3>
            <p className="text-orange-800">
              Let extra op tijdens Kerstmis, Pasen en andere feestdagen wanneer rozijnenhoudende producten zoals stollen, kerstbrood, fruitcakes en hot cross buns op tafel staan. Honden kunnen deze producten van tafels pakken of krijgen ze van goedbedoelende gasten.
            </p>
          </div>
        </section>

        {/* Symptoms Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-emerald-500 pb-2">
            Symptomen van Rozijnenvergiftiging
          </h2>

          <p className="text-gray-700 mb-6">
            De symptomen van rozijnenvergiftiging zijn identiek aan druivenvergiftiging, maar kunnen sneller en heviger optreden door de hogere concentratie van de giftige stof.
          </p>

          <div className="space-y-6">
            <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-500">
              <h3 className="text-lg font-semibold text-yellow-900 mb-3">Vroege Tekenen (0-12 uur na inname)</h3>
              <ul className="space-y-2 text-yellow-800">
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">▸</span>
                  <span><strong>Braken:</strong> Vaak het eerste symptom, soms met zichtbare rozijnenstukjes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">▸</span>
                  <span><strong>Diarree:</strong> Kan waterig zijn of rozijnenresten bevatten</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">▸</span>
                  <span><strong>Verminderde eetlust:</strong> Weigert voedsel</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">▸</span>
                  <span><strong>Lethargie:</strong> Apathisch, wil niet spelen of bewegen</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">▸</span>
                  <span><strong>Buikpijn:</strong> Gespannen buik, kreunend gedrag, gebogen houding</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">▸</span>
                  <span><strong>Zwakte:</strong> Trillen, moeite met lopen</span>
                </li>
              </ul>
            </div>

            <div className="bg-orange-50 rounded-lg p-6 border-l-4 border-orange-500">
              <h3 className="text-lg font-semibold text-orange-900 mb-3">Nierschade Ontwikkeling (12-48 uur)</h3>
              <ul className="space-y-2 text-orange-800">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">▸</span>
                  <span><strong>Verhoogde dorst:</strong> Proberen te drinken maar lukt niet goed</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">▸</span>
                  <span><strong>Verminderde urineproductie:</strong> Minder vaak plassen, kleine hoeveelheden</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">▸</span>
                  <span><strong>Uitdroging:</strong> Droge neus, ingevallen ogen, elasticiteitsverlies huid</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">▸</span>
                  <span><strong>Slechte adem:</strong> Ammoniakachtige of ureum geur</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">▸</span>
                  <span><strong>Toenemende zwakte:</strong> Nauwelijks nog energie</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-500">
              <h3 className="text-lg font-semibold text-red-900 mb-3">Acuut Nierfalen (24-72 uur)</h3>
              <ul className="space-y-2 text-red-800">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">▸</span>
                  <span><strong>Anurie:</strong> Volledige stopzetting van urineproductie</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">▸</span>
                  <span><strong>Ernstige lethargie:</strong> Niet meer in staat te staan of lopen</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">▸</span>
                  <span><strong>Aanvallen:</strong> Epileptische stuipen door toxine-ophoping</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">▸</span>
                  <span><strong>Bloedingen:</strong> Bloed in braaksel of ontlasting</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">▸</span>
                  <span><strong>Bewusteloosheid:</strong> Coma</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">▸</span>
                  <span><strong>Overlijden:</strong> Zonder intensieve behandeling vaak fataal</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">Snelheid van symptomen</h3>
            <p className="text-purple-800">
              Door de hogere concentratie kunnen symptomen bij rozijnen soms sneller en ernstiger optreden dan bij verse druiven. Sommige honden vertonen symptomen al binnen enkele uren. Wacht niet af - snel handelen is belangrijk bij het voorkomen van blijvende nierschade.
            </p>
          </div>
        </section>

        {/* What To Do Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-emerald-500 pb-2">
            Wat Te Doen Als Je Hond Rozijnen Heeft Gegeten?
          </h2>

          <div className="bg-red-100 border-2 border-red-500 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-red-900 mb-3">⚠️ Direct actie vereist</h3>
            <p className="text-red-900 font-semibold mb-2">
              Rozijnenvergiftiging is een medisch noodgeval. De geconcentreerde toxiciteit betekent dat snelle behandeling belangrijk is.
            </p>
            <p className="text-red-900">
              Neem onmiddellijk contact op met je dierenarts, zelfs als je hond nog geen symptomen vertoont. Snelle behandeling verbetert de kansen op volledig herstel aanzienlijk.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Stapsgewijs Noodprotocol:</h3>
            <ol className="space-y-4">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold mr-3">1</span>
                <div>
                  <strong className="text-gray-900">BEL DIRECT JE DIERENARTS</strong>
                  <p className="text-gray-700 mt-1">Dit is een noodsituatie. Bel onmiddellijk, dag of nacht. Vertel: "Mijn hond heeft rozijnen gegeten" en geef details over hoeveelheid en tijdstip.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold mr-3">2</span>
                <div>
                  <strong className="text-gray-900">Verzamel Cruciale Informatie</strong>
                  <p className="text-gray-700 mt-1">
                    <strong>Noteer:</strong> Geschatte aantal rozijnen, bron (puur/in voedsel), tijdstip van inname, gewicht van je hond, eventuele zichtbare symptomen.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold mr-3">3</span>
                <div>
                  <strong className="text-gray-900">GEEN Zelf-Behandeling</strong>
                  <p className="text-gray-700 mt-1">Probeer NIET zelf je hond te laten braken. Dit moet onder veterinaire begeleiding gebeuren. Geef geen thuismiddelen - je verspilt kostbare tijd.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold mr-3">4</span>
                <div>
                  <strong className="text-gray-900">GA ONMIDDELLIJK naar de Kliniek</strong>
                  <p className="text-gray-700 mt-1">Volg de instructies van je dierenarts op. Meestal zullen ze zeggen: "Kom direct!" Houd je hond rustig tijdens transport, maar verlies geen tijd.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold mr-3">5</span>
                <div>
                  <strong className="text-gray-900">Neem Product Verpakking Mee (indien mogelijk)</strong>
                  <p className="text-gray-700 mt-1">Als je hond rozijnen uit een product heeft gegeten, neem de verpakking mee zodat de dierenarts kan zien hoeveel rozijnen erin zaten en of er andere ingrediënten zijn waar ze rekening mee moeten houden.</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
              <h3 className="text-lg font-semibold text-emerald-900 mb-2">✓ WEL Doen</h3>
              <ul className="space-y-1 text-emerald-800 text-sm">
                <li>• Direct dierenarts bellen</li>
                <li>• Noteer exacte hoeveelheid en tijd</li>
                <li>• Ga onmiddellijk naar kliniek</li>
                <li>• Observeer symptomen nauwkeurig</li>
                <li>• Bewaar productverpakking</li>
                <li>• Blijf rustig maar handel snel</li>
              </ul>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
              <h3 className="text-lg font-semibold text-red-900 mb-2">✗ NIET Doen</h3>
              <ul className="space-y-1 text-red-800 text-sm">
                <li>• Afwachten of symptomen optreden</li>
                <li>• Zelf braken induceren</li>
                <li>• Thuismiddelen geven</li>
                <li>• Google raadplegen i.p.v. dierenarts</li>
                <li>• Panikeren en tijd verspillen</li>
                <li>• Denken "het waren er maar een paar"</li>
              </ul>
            </div>
          </div>
        </section>

        {/* When to Contact Vet */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-emerald-500 pb-2">
            Behandeling door de Dierenarts
          </h2>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Intensieve Medische Interventie</h3>
            <p className="text-gray-700 mb-4">
              De behandeling van rozijnenvergiftiging is agressief en omvat meerdere stappen:
            </p>
            <div className="space-y-4">
              <div className="flex items-start bg-gray-50 p-4 rounded-lg">
                <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold mr-3 mt-1">1</span>
                <div>
                  <strong className="text-gray-900">Braken Induceren (Binnen 2-6 Uur)</strong>
                  <p className="text-gray-700 mt-1">De dierenarts geeft injecties (apomorfine of andere emetica) om braken op te wekken. Dit verwijdert zoveel mogelijk rozijnen uit de maag voordat ze worden opgenomen.</p>
                </div>
              </div>

              <div className="flex items-start bg-gray-50 p-4 rounded-lg">
                <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold mr-3 mt-1">2</span>
                <div>
                  <strong className="text-gray-900">Maag Spoelen (Indien Nodig)</strong>
                  <p className="text-gray-700 mt-1">Bij grote hoeveelheden of als braken niet voldoende effectief is, kan een maagspoeling worden uitgevoerd onder anesthesie.</p>
                </div>
              </div>

              <div className="flex items-start bg-gray-50 p-4 rounded-lg">
                <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold mr-3 mt-1">3</span>
                <div>
                  <strong className="text-gray-900">Actieve Kool Toediening</strong>
                  <p className="text-gray-700 mt-1">Meerdere doseringen actieve kool worden gegeven om resterende toxinen in maag en darmen te binden. Dit voorkomt verdere absorptie.</p>
                </div>
              </div>

              <div className="flex items-start bg-gray-50 p-4 rounded-lg">
                <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold mr-3 mt-1">4</span>
                <div>
                  <strong className="text-gray-900">Intensieve Infuustherapie (48-72 Uur)</strong>
                  <p className="text-gray-700 mt-1">Continue intraveneuze vloeistoffen om de nieren te ondersteunen, uitdroging te voorkomen en toxinen uit te spoelen. Dit is de belangrijkste behandeling om nierschade te voorkomen.</p>
                </div>
              </div>

              <div className="flex items-start bg-gray-50 p-4 rounded-lg">
                <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold mr-3 mt-1">5</span>
                <div>
                  <strong className="text-gray-900">Continue Monitoring</strong>
                  <p className="text-gray-700 mt-1">Regelmatige bloedtests (ureum, creatinine, elektrolyten), urineproductie meten, vitale functies monitoren. Meestal opname van 2-4 dagen nodig.</p>
                </div>
              </div>

              <div className="flex items-start bg-gray-50 p-4 rounded-lg">
                <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold mr-3 mt-1">6</span>
                <div>
                  <strong className="text-gray-900">Ondersteunende Medicatie</strong>
                  <p className="text-gray-700 mt-1">Anti-nausea medicijnen, maagbeschermers, en indien nodig medicijnen om urineproductie te stimuleren.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-yellow-900 mb-3">Prognose en Herstelkansen</h3>
            <div className="space-y-3 text-yellow-800">
              <div className="flex items-start">
                <span className="text-green-600 font-bold mr-2 text-2xl">✓</span>
                <div>
                  <strong>Zeer snelle behandeling:</strong>
                  <p className="text-sm">Uitstekende prognose - vaak volledig herstel zonder nierschade</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 font-bold mr-2 text-2xl">✓</span>
                <div>
                  <strong>Snelle behandeling:</strong>
                  <p className="text-sm">Zeer goede prognose met intensieve zorg</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-yellow-600 font-bold mr-2 text-2xl">⚠</span>
                <div>
                  <strong>Behandeling binnen een dag:</strong>
                  <p className="text-sm">Matige prognose - risico op nierschade aanwezig</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-orange-600 font-bold mr-2 text-2xl">⚠</span>
                <div>
                  <strong>Vertraagde behandeling of met symptomen:</strong>
                  <p className="text-sm">Gereserveerde prognose - mogelijk blijvende nierschade</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-red-600 font-bold mr-2 text-2xl">✗</span>
                <div>
                  <strong>Geen behandeling of ernstig nierfalen:</strong>
                  <p className="text-sm">Slechte prognose - vaak fataal</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Prevention Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-emerald-500 pb-2">
            Preventie: Houd Rozijnen Ver Weg
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-emerald-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-emerald-900 mb-3">Thuis Bewaren</h3>
              <ul className="space-y-2 text-emerald-800">
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">✓</span>
                  <span>Rozijnen in gesloten containers in hoge kasten</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">✓</span>
                  <span>Rozijnenbrood altijd in broodtrommel met deksel</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">✓</span>
                  <span>Ontbijtgranen buiten bereik van honden</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">✓</span>
                  <span>Gevallen rozijnen onmiddellijk opruimen</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">✓</span>
                  <span>Controleer ingrediënten van nieuwe producten</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Extra Waakzaamheid</h3>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Feestdagen: let op kerstbrood, stollen, fruitcakes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Gasten waarschuwen om geen rozijnen te voeren</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Kinderen leren over het gevaar</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Trail mix ver weg houden</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Afvalbakken met deksel gebruiken</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-500">
            <h3 className="text-lg font-semibold text-purple-900 mb-3">Veelvoorkomende Bronnen van Rozijnen</h3>
            <div className="grid md:grid-cols-3 gap-4 mt-3">
              <div>
                <h4 className="font-semibold text-purple-900 mb-2 text-sm">Bakwaren:</h4>
                <ul className="space-y-1 text-purple-800 text-xs">
                  <li>• Rozijnenbrood</li>
                  <li>• Krentenbollen</li>
                  <li>• Fruitcake</li>
                  <li>• Stollen</li>
                  <li>• Hot cross buns</li>
                  <li>• Koekjes</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-purple-900 mb-2 text-sm">Ontbijt:</h4>
                <ul className="space-y-1 text-purple-800 text-xs">
                  <li>• Muesli</li>
                  <li>• Granola</li>
                  <li>• Ontbijtgranen</li>
                  <li>• Havermout met rozijnen</li>
                  <li>• Mueslirepen</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-purple-900 mb-2 text-sm">Snacks:</h4>
                <ul className="space-y-1 text-purple-800 text-xs">
                  <li>• Trail mix</li>
                  <li>• Studentenhaver</li>
                  <li>• Fruit-notenmix</li>
                  <li>• Energierepen</li>
                  <li>• Gedroogd fruit mix</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-emerald-500 pb-2">
            Veelgestelde Vragen over Rozijnen en Honden
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Waarom zijn rozijnen gevaarlijker dan verse druiven?
              </h3>
              <p className="text-gray-700">
                Rozijnen zijn geconcentreerde druiven waarbij het water is verwijderd. Dit betekent dat de giftige stof (waarschijnlijk wijnsteenzuur) veel geconcentreerder aanwezig is in een kleiner volume - ongeveer 4x zo geconcentreerd. Daarnaast zijn rozijnen kleiner en gemakkelijker te eten in grotere hoeveelheden, wat het risico vergroot. De gedroogde vorm kan ook sneller worden verteerd en opgenomen.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Hoeveel rozijnen kunnen dodelijk zijn?
              </h3>
              <p className="text-gray-700">
                Er is geen veilige hoeveelheid bekend. Sommige honden vertonen ernstige symptomen na slechts 3-5 rozijnen, terwijl andere grotere hoeveelheden lijken te verdragen. De reactie is volledig onvoorspelbaar en hangt af van individuele gevoeligheid, grootte van de hond en mogelijk andere factoren. Behandel elke inname van rozijnen als noodgeval, ongeacht de hoeveelheid.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Welke producten bevatten rozijnen?
              </h3>
              <p className="text-gray-700">
                Rozijnen zitten in veel voedingsmiddelen: rozijnenbrood, fruitcake, kerstbrood, stollen, ontbijtgranen (muesli, granola), trail mix, studentenhaver, koekjes, mueslirepen, havermout met rozijnen, fruit-notenmixen en energierepen. Controleer altijd ingrediëntenlabels van voedingsmiddelen en wees extra alert tijdens feestdagen.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Wat zijn de eerste symptomen van rozijnenvergiftiging?
              </h3>
              <p className="text-gray-700">
                Braken is vaak het eerste symptoom en kan binnen enkele uren optreden, soms met zichtbare rozijnenstukjes. Andere vroege tekenen zijn diarree, lethargie, verminderde eetlust, buikpijn en zwakte. Deze symptomen kunnen binnen 6-12 uur verschijnen. Symptomen van nierschade zoals verminderde urineproductie, uitdroging en slechte adem volgen binnen 24-72 uur als niet behandeld wordt.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Mijn hond at rozijnen uit een fruitcake, wat nu?
              </h3>
              <p className="text-gray-700">
                Neem onmiddellijk contact op met je dierenarts, zelfs als je hond nog geen symptomen vertoont. Dit is een medisch noodgeval. Noteer hoeveel cake je hond ongeveer heeft gegeten en wanneer dit gebeurde. Neem de verpakking mee naar de dierenarts zodat ze kunnen zien hoeveel rozijnen in het product zaten. Volg direct het advies van de dierenarts op - meestal betekent dit direct naar de kliniek komen. Tijd is cruciaal bij rozijnenvergiftiging.
              </p>
            </div>
          </div>
        </section>

        {/* Medical Disclaimer */}
        <section className="mb-12">
          <div className="bg-gray-100 border-l-4 border-gray-400 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Medische Disclaimer</h3>
            <p className="text-gray-700 text-sm">
              De informatie op deze pagina is uitsluitend bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies, diagnose of behandeling. Rozijnenvergiftiging is een medisch noodgeval waarbij elke seconde telt. Neem bij elke inname van rozijnen door je hond onmiddellijk contact op met je dierenarts of de dierenartsenpraktijk met spoed, ongeacht de hoeveelheid. Snelle behandeling kan het verschil maken tussen volledig herstel en blijvende nierschade of overlijden. CutiePawsPedia is niet verantwoordelijk voor eventuele gevolgen van het gebruik van deze informatie.
            </p>
          </div>
        </section>

        {/* Related Safe Foods */}
        <RelatedSafeFoods
          locale="nl"
          animal="honden"
          foods={commonSafeFoods}
          title="Veilige snack alternatieven"
        />

        {/* Back to Overview Link */}
        <div className="text-center pt-8 border-t border-gray-200">
          <a
            href="/nl/giftige-stoffen-voor-huisdieren"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-semibold"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Terug naar Giftige Stoffen Overzicht
          </a>
        </div>
      </article>
    </>
  );
}
