import type { Metadata } from 'next';
import Link from 'next/link';
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: 'Is Narcis Giftig voor Honden? Symptomen & Veiligheid | CutiePawsPedia',
  description: 'Ontdek of narcissen giftig zijn voor honden. Leer over lycorine-vergiftiging, symptomen, eerste hulp en hoe je jouw hond veilig houdt bij voorjaarsplanten.',
  keywords: 'narcis giftig honden, narcissen hond, lentebloemen hond giftig, bolgewassen hond, lycorine vergiftiging hond',
  openGraph: {
    title: 'Is Narcis Giftig voor Honden? Wat Eigenaren Moeten Weten',
    description: 'Complete gids over narcissen en honden: giftigheid, symptomen, eerste hulp en preventiemaatregelen.',
    type: 'article',
    publishedTime: '2025-12-15T10:00:00Z',
    authors: ['CutiePawsPedia Team'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function IsNarcisGiftigVoorHondenPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Is Narcis Giftig voor Honden?',
    description: 'Uitgebreide informatie over de giftigheid van narcissen voor honden, symptomen van lycorine-vergiftiging en veiligheidsmaatregelen.',
    datePublished: '2025-12-15',
    dateModified: '2025-12-15',
    author: {
      '@type': 'Organization',
      name: 'CutiePawsPedia',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Zijn narcissen giftig voor honden?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, narcissen zijn matig giftig voor honden. Alle delen van de plant bevatten giftige alkaloïden, vooral lycorine. De bol is het meest giftig en kan ernstige maag-darmklachten, hartproblemen en neurologische symptomen veroorzaken.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wat maakt narcissen gevaarlijk voor honden?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Narcissen bevatten lycorine en andere alkaloïden die het spijsverteringsstelsel irriteren, braken veroorzaken en in ernstige gevallen hartaritmieën en neurologische problemen kunnen veroorzaken. De bol bevat de hoogste concentratie giftige stoffen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wat moet ik doen als mijn hond narcis heeft gegeten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Neem onmiddellijk contact op met je dierenarts of de dierenartsenspoeddienst. Probeer niet je hond te laten braken zonder veterinair advies. Verwijder plantenresten uit de mond en monitor symptomen zoals kwijlen, braken, diarree of zwakte.',
        },
      },
      {
        '@type': 'Question',
        name: 'Welke delen van de narcis zijn het meest giftig?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'De bol (bulb) is het meest giftig, met de hoogste concentratie lycorine. Bladeren, stengels en bloemen bevatten ook giftige stoffen, maar in lagere concentraties. Zelfs het water in een vaas met narcissen kan giftig zijn.',
        },
      },
      {
        '@type': 'Question',
        name: 'Kan een hond sterven van narcis-vergiftiging?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, in ernstige gevallen kan narcis-vergiftiging fataal zijn, vooral bij inname van bollen. Snelle veterinaire behandeling is essentieel. De prognose is goed met snelle interventie, maar vertraagde behandeling kan leiden tot ernstige complicaties of overlijden.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <article className="max-w-4xl mx-auto px-4 py-8">
        <FoodGuideBreadcrumb
          locale="nl"
          items={[
            { name: "Voedselgids", href: "/nl/voedselgids" },
            { name: "Giftige Stoffen", href: "/nl/giftige-stoffen" },
          ]}
          currentPage="Narcis voor Honden"
        />

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Is Narcis Giftig voor Honden?
          </h1>
          <p className="text-xl text-gray-600">
            Alles wat je moet weten over narcissen en de veiligheid van jouw hond
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Laatst bijgewerkt: 15 december 2025
          </div>
        </header>

        {/* TL;DR Verdict */}
        <div className="mb-8 p-6 bg-orange-50 border-l-4 border-orange-500 rounded-r-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-orange-900 mb-2">Giftigheid: Matig tot Hoog</h2>
              <p className="text-orange-800">
                <strong>Ja, narcissen zijn giftig voor honden.</strong> Alle delen van de plant bevatten lycorine en andere alkaloïden, waarbij de bol het meest giftig is. Inname kan leiden tot ernstige maag-darmklachten, hartproblemen en neurologische symptomen. Neem bij vermoeden van inname onmiddellijk contact op met je dierenarts.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Waarom Zijn Narcissen Gevaarlijk voor Honden?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Narcissen (Narcissus spp.), ook wel paaslelie of paasbloem genoemd, zijn populaire voorjaarsbloemen die helaas matig tot zeer giftig zijn voor honden. Alle delen van de plant bevatten <strong>lycorine</strong> en andere giftige alkaloïden zoals galantamine en narcissine.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Lycorine</strong> is een fenanthridine-alkaloïde dat als natuurlijk pesticicide fungeert om de plant te beschermen tegen vraat. Bij honden veroorzaakt lycorine ernstige maag-darmirritatie, braakneigingen en kan het in hogere doses het cardiovasculaire en centrale zenuwstelsel beïnvloeden.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            De <strong>bol (bulb)</strong> bevat de hoogste concentratie van deze giftige stoffen en vormt het grootste risico. Honden die in de tuin graven kunnen bollen opgraven en eraan kauwen, wat tot ernstige vergiftiging kan leiden. Maar ook bladeren, stengels, bloemen en zelfs het water in een vaas met narcissen bevatten giftige stoffen.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Symptomen van Narcis-Vergiftiging bij Honden
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Symptomen treden meestal binnen enkele uren na inname op. De ernst hangt af van de hoeveelheid ingenomen plantmateriaal en welk deel van de plant:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Milde tot Matige Symptomen (Bladeren/Bloemen)</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Kwijlen en speekselvloed</strong> – vaak het eerste teken</li>
            <li><strong>Misselijkheid</strong></li>
            <li><strong>Braken</strong> – soms hevig en aanhoudend</li>
            <li><strong>Diarree</strong> – kan bloederig zijn</li>
            <li><strong>Buikpijn en krampen</strong> – hond toont ongemak</li>
            <li><strong>Verlies van eetlust</strong></li>
            <li><strong>Lethargie en zwakte</strong></li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Ernstige Symptomen (Bollen of Grote Hoeveelheden)</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Aanhoudend hevig braken</strong> leidend tot dehydratie</li>
            <li><strong>Bloederige diarree</strong></li>
            <li><strong>Tremors en spiertrillingen</strong></li>
            <li><strong>Hartaritmieën</strong> – onregelmatige hartslag</li>
            <li><strong>Lage bloeddruk (hypotensie)</strong></li>
            <li><strong>Convulsies of stuipen</strong> (zeldzaam maar ernstig)</li>
            <li><strong>Ademhalingsproblemen</strong></li>
            <li><strong>Shock en collaps</strong></li>
            <li><strong>Extreme zwakte of bewusteloosheid</strong></li>
          </ul>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-red-900 mb-2">Waarschuwing: Bollen Zijn Zeer Giftig</h3>
            <p className="text-red-800">
              De bol van de narcis bevat de hoogste concentratie lycorine en andere alkaloïden. Inname van een hele bol of grote delen ervan kan levensbedreigend zijn en vereist <strong>onmiddellijke veterinaire spoedzorg</strong>. Symptomen kunnen snel escaleren van braken naar hartproblemen en neurologische complicaties.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Wat Te Doen Als Je Hond Narcis Heeft Gegeten
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Narcis-vergiftiging is een veterinaire urgentie. Snel handelen kan levensreddend zijn:
          </p>

          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-emerald-900 mb-3">Noodprotocol</h3>
            <ol className="list-decimal pl-6 space-y-3 text-gray-800">
              <li>
                <strong>Bel onmiddellijk je dierenarts</strong> – Narcis-vergiftiging vereist professionele behandeling. Bel tijdens transport.
              </li>
              <li>
                <strong>Verwijder plantenresten</strong> – Haal voorzichtig zichtbare plantenresten uit de mond van je hond.
              </li>
              <li>
                <strong>Niet zelf laten braken</strong> – Probeer je hond niet zelf te laten braken. Dit kan gevaarlijk zijn en verslechtering veroorzaken. Alleen een dierenarts kan veilig braken opwekken.
              </li>
              <li>
                <strong>Verzamel informatie</strong> – Noteer welk deel van de plant is gegeten (blad, bloem, bol), hoeveel ongeveer, en hoe lang geleden.
              </li>
              <li>
                <strong>Neem plantmateriaal mee</strong> – Neem een monster van de plant mee naar de dierenarts voor identificatie.
              </li>
              <li>
                <strong>Monitor vitale functies</strong> – Let op ademhaling, hartslag, bewustzijn tijdens transport.
              </li>
              <li>
                <strong>Bied geen eten of drinken aan</strong> – Tenzij de dierenarts dit adviseert.
              </li>
            </ol>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Wanneer Direct Naar De Dierenarts?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Ga <strong>onmiddellijk</strong> naar de dierenarts of dierenartsenspoeddienst als je een van deze tekenen waarneemt:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li>Je weet of vermoedt dat je hond een narcisbol heeft gegeten</li>
            <li>Hevig of aanhoudend braken</li>
            <li>Bloederige diarree of braassel</li>
            <li>Tremors, spiertrillingen of convulsies</li>
            <li>Zwakte, flauwvallen of collaps</li>
            <li>Onregelmatige hartslag of ademhaling</li>
            <li>Bleke tandvlees (teken van shock)</li>
            <li>Bewusteloosheid of verminderd bewustzijn</li>
            <li>Symptomen die niet verbeteren of verslechteren</li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Veterinaire Behandeling</h3>
            <p className="text-blue-800 mb-3">
              De dierenarts kan de volgende behandelingen bieden voor narcis-vergiftiging:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-blue-800">
              <li><strong>Braken opwekken</strong> – indien inname recent was en hond stabiel is</li>
              <li><strong>Maagspoeling</strong> – om plantmateriaal te verwijderen</li>
              <li><strong>Actieve kool</strong> – om resterende toxines te binden</li>
              <li><strong>Infuustherapie</strong> – voor hydratatie en ondersteuning</li>
              <li><strong>Anti-braak medicatie</strong> – om braken te controleren</li>
              <li><strong>Maagbeschermers</strong> – om maagirrritatie te verminderen</li>
              <li><strong>Hartmonitoring</strong> – bij cardiotoxische symptomen</li>
              <li><strong>Antiaritmische medicatie</strong> – bij hartritmestoornissen</li>
              <li><strong>Neurologische ondersteuning</strong> – bij tremors of convulsies</li>
              <li><strong>Ziekenhuisopname</strong> – voor ernstige gevallen met 24-uur monitoring</li>
            </ul>
            <p className="text-blue-800 mt-3">
              <strong>Prognose</strong>: Met snelle behandeling is de prognose goed, zelfs bij ernstige vergiftiging. Vertraagde behandeling verhoogt het risico op complicaties of overlijden.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Preventiemaatregelen: Houd Je Hond Veilig
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Preventie is de beste bescherming tegen narcis-vergiftiging:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">In De Tuin</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Omhein narcissenvelden</strong> – Gebruik tuinhekjes rond narcisperken waar honden niet bij kunnen</li>
            <li><strong>Train "laat maar" commando</strong> – Leer je hond planten met rust te laten</li>
            <li><strong>Supervisie buiten</strong> – Houd jonge of nieuwsgierige honden altijd in de gaten</li>
            <li><strong>Bollen diep planten</strong> – Plant bollen op voldoende diepte om opgraven te voorkomen</li>
            <li><strong>Bescherm pas geplante bollen</strong> – Gebruik kippengaas of plantenrekken over vers geplante bollen</li>
            <li><strong>Verwijder verwelkte bloemen</strong> – Haal narcissen weg als ze beginnen te verwelken en aantrekkelijker worden</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Binnen</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Plaats vazen buiten bereik</strong> – Hoge tafels of kasten waar honden niet bij kunnen</li>
            <li><strong>Wissel vaaswater regelmatig</strong> – Ook het water bevat opgeloste toxines</li>
            <li><strong>Ruim afgevallen bladeren/bloemen op</strong> – Controleer dagelijks onder vazen</li>
            <li><strong>Vermijd narcissen met jonge honden</strong> – Puppies en jonge honden kauwen graag</li>
            <li><strong>Overweeg hondenvrindelijke alternatieven</strong> – Zie hieronder voor veilige voorjaarsbloemen</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Veilige Voorjaarsbloemen Alternatieven</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Als je van voorjaarsbloemen houdt maar een hond hebt, overweeg deze hondenvrindelijke alternatieven:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Viooltjes (Viola)</strong> – Veilig en kleurrijk</li>
            <li><strong>Sleutelbloemen (Primula)</strong> – Niet giftig voor honden</li>
            <li><strong>Gerbera's</strong> – Veilige snijbloemen</li>
            <li><strong>Zonnebloemen</strong> – Groot en hondenvrindelijk</li>
            <li><strong>Roosjes</strong> – Doornen zijn irriterend maar niet giftig</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Andere Giftige Voorjaarsbloemen</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Let ook op deze giftige voorjaarsbloemen en bollen:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Tulpen</strong> – Vooral bollen zijn giftig (tulipaline)</li>
            <li><strong>Hyacinten</strong> – Bollen bevatten alkaloïden</li>
            <li><strong>Krokussen (herfst)</strong> – Zeer giftig colchicine</li>
            <li><strong>Lelies</strong> – Extreem giftig, vooral voor katten</li>
            <li><strong>Sneeuwklokjes</strong> – Bevatten galantamine</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Veelgestelde Vragen (FAQ)
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Zijn narcissen giftig voor honden?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Ja, narcissen zijn matig tot zeer giftig voor honden. Alle delen van de plant bevatten giftige alkaloïden, vooral lycorine. De bol is het meest giftig en kan ernstige maag-darmklachten, hartproblemen en neurologische symptomen veroorzaken. Zelfs het water in een vaas met narcissen kan giftig zijn.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Wat maakt narcissen gevaarlijk voor honden?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Narcissen bevatten lycorine en andere alkaloïden (galantamine, narcissine) die het spijsverteringsstelsel ernstig irriteren, braakneigingen veroorzaken en in hogere doses het cardiovasculaire systeem (hartaritmieën) en centrale zenuwstelsel (tremors, convulsies) kunnen beïnvloeden. De bol bevat de hoogste concentratie van deze giftige stoffen.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Wat moet ik doen als mijn hond narcis heeft gegeten?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Neem onmiddellijk contact op met je dierenarts of de dierenartsenspoeddienst. Verwijder plantenresten uit de mond, maar probeer niet zelf je hond te laten braken zonder veterinair advies. Noteer welk deel van de plant is gegeten en hoeveel, en neem plantmateriaal mee voor identificatie. Monitor vitale functies tijdens transport.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Welke delen van de narcis zijn het meest giftig?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                De <strong>bol (bulb)</strong> is het meest giftig, met de hoogste concentratie lycorine en andere alkaloïden. Bladeren, stengels en bloemen bevatten ook giftige stoffen, maar in lagere concentraties. Zelfs het water in een vaas met narcissen kan giftig zijn door opgeloste toxines. Honden die in de tuin graven lopen het grootste risico door blootstelling aan bollen.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Kan een hond sterven van narcis-vergiftiging?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Ja, in ernstige gevallen kan narcis-vergiftiging fataal zijn, vooral bij inname van bollen of grote hoeveelheden plantmateriaal. Complicaties zoals ernstige dehydratie, hartaritmieën, convulsies en shock kunnen levensbedreigend zijn. Snelle veterinaire behandeling is essentieel. Met snelle interventie is de prognose goed, maar vertraagde behandeling verhoogt het risico op ernstige complicaties of overlijden aanzienlijk.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Conclusie: Narcissen en Honden
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Narcissen zijn matig tot zeer giftig voor honden, vooral de bollen. Inname vereist altijd veterinaire zorg. Met snelle behandeling is de prognose goed, maar preventie is de beste strategie.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Als je narcissen in je tuin of huis hebt, zorg dan voor veilige plaatsing, training en constante supervisie. Overweeg hondenvrindelijke voorjaarsbloemen als alternatief. Bij vermoeden van inname: bel direct je dierenarts – elke minuut telt.
          </p>
        </div>

        <RelatedSafeFoods
          locale="nl"
          animal="honden"
          foods={commonSafeFoods}
          title="Veilige snack alternatieven"
        />

        {/* Medical Disclaimer */}
        <div className="mt-12 p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Medische Disclaimer</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Deze informatie is bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies, diagnose of behandeling. Neem bij twijfel over de gezondheid van je huisdier altijd contact op met een gekwalificeerde dierenarts. In noodgevallen: bel direct je dierenarts of de dierenartsenspoeddienst.
          </p>
        </div>

        {/* Related Links */}
        <div className="mt-8 p-6 bg-emerald-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Gerelateerde Artikelen</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/nl/giftige-planten-honden" className="text-emerald-600 hover:text-emerald-700 hover:underline">
                Complete Lijst: Giftige Planten voor Honden
              </Link>
            </li>
            <li>
              <Link href="/nl/veilige-tuinplanten-honden" className="text-emerald-600 hover:text-emerald-700 hover:underline">
                Veilige Tuinplanten voor Honden
              </Link>
            </li>
            <li>
              <Link href="/nl/eerste-hulp-hond-vergiftiging" className="text-emerald-600 hover:text-emerald-700 hover:underline">
                Eerste Hulp bij Hondvergiftiging
              </Link>
            </li>
          </ul>
        </div>
      </article>
    </>
  );
}
