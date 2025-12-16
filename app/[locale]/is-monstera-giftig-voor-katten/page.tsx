import type { Metadata } from 'next';
import Link from 'next/link';
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: 'Is Monstera Giftig voor Katten? Wat Je Moet Weten | CutiePawsPedia',
  description: 'Ontdek of monstera giftig is voor katten. Leer over symptomen van monstera-vergiftiging, eerste hulp bij inname, en hoe je jouw kat veilig houdt bij kamerplanten.',
  keywords: 'monstera giftig katten, gatenplant katten, monstera deliciosa kat, kamerplant giftig kat, plantenvergiftiging kat',
  openGraph: {
    title: 'Is Monstera Giftig voor Katten? Symptomen & Veiligheid',
    description: 'Complete gids over monstera en katten: giftigheid, symptomen, eerste hulp en preventiemaatregelen.',
    type: 'article',
    publishedTime: '2025-12-15T10:00:00Z',
    authors: ['CutiePawsPedia Team'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function IsMonsteraGiftigVoorKattenPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Is Monstera Giftig voor Katten?',
    description: 'Uitgebreide informatie over de giftigheid van monstera (gatenplant) voor katten, symptomen en veiligheidsmaatregelen.',
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
        name: 'Wat maakt monstera giftig voor katten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Monstera bevat calciumoxalaatkristallen in alle delen van de plant. Deze naaldvormige kristallen kunnen bij kauwen of inname irritatie veroorzaken aan de mond, keel en maag-darmkanaal van katten.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wat moet ik doen als mijn kat van monstera heeft gegeten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Verwijder plantenresten uit de mond van je kat, spoel de mond voorzichtig met water, bied vers water aan en neem direct contact op met je dierenarts, zelfs bij milde symptomen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Zijn alle monstera-soorten giftig voor katten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, alle soorten monstera (Monstera deliciosa, Monstera adansonii, etc.) bevatten calciumoxalaatkristallen en zijn giftig voor katten. Het giftigheidsgehalte is vergelijkbaar tussen verschillende soorten.',
        },
      },
      {
        '@type': 'Question',
        name: 'Kan een kat sterven van monstera-vergiftiging?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Monstera wordt geclassificeerd als licht giftig voor katten. Hoewel dodelijke vergiftigingen zeldzaam zijn, kan ernstige inname leiden tot ademhalingsproblemen en dehydratie die medische interventie vereisen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Hoe houd ik mijn kat weg bij monstera?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Plaats de monstera buiten het bereik van katten (hoge plantenstandaarden, hangende potten), gebruik natuurlijke afweermiddelen zoals citrusgeur, bied kattengras als alternatief, en overweeg kattenvrindelijke planten zoals spinneplant of kattenpalm.',
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
        {/* Breadcrumb */}
        <FoodGuideBreadcrumb
          locale="nl"
          items={[
            { name: "Voedselgids", href: "/nl/voedselgids" },
            { name: "Giftige Stoffen", href: "/nl/giftige-stoffen" },
          ]}
          currentPage="Monstera voor Katten"
        />

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Is Monstera Giftig voor Katten?
          </h1>
          <p className="text-xl text-gray-600">
            Alles wat je moet weten over de gatenplant en de veiligheid van jouw kat
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
              <h2 className="text-lg font-semibold text-orange-900 mb-2">Giftigheid: Laag tot Matig</h2>
              <p className="text-orange-800">
                <strong>Ja, monstera is giftig voor katten.</strong> De plant bevat calciumoxalaatkristallen die milde tot matige mond- en maagirritatie kunnen veroorzaken. Hoewel zelden levensbedreigend, vereist inname altijd contact met een dierenarts. Symptomen zijn kwijlen, braken en mond-ongemak.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Waarom Is Monstera Gevaarlijk voor Katten?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Monstera, ook wel bekend als gatenplant of Monstera deliciosa, is een populaire kamerplant die helaas giftig is voor katten. De plant bevat in alle delen (bladeren, stengels, wortels) <strong>calciumoxalaatkristallen</strong> – microscopisch kleine, naaldvormige kristallen die bij contact met het slijmvlies mechanische en chemische irritatie veroorzaken.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Wanneer een kat aan de monstera kauwt of ervan eet, penetreren deze kristallen het zachte weefsel in de mond, keel en maag-darmkanaal. Dit leidt tot onmiddellijke pijn, zwelling en ontstekingsreacties. De irritatie is meestal mild tot matig, maar kan bij grotere inname ernstiger worden.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Gelukkig zijn de meeste katten afkerig van de bittere smaak van monstera, waardoor ze vaak snel stoppen met kauwen. Dit natuurlijke afweermechanisme voorkomt dat katten grote hoeveelheden innemen. Echter, nieuwsgierige jonge katten of speelse kittens kunnen toch genoeg innemen om symptomen te ontwikkelen.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Symptomen van Monstera-Vergiftiging bij Katten
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Symptomen treden meestal binnen enkele uren na inname op. De ernst hangt af van de hoeveelheid ingenomen plantmateriaal:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Milde Symptomen (Meest Voorkomend)</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Kwijlen en speekselvloed</strong> – vaak het eerste teken</li>
            <li><strong>Mond- en lipongemak</strong> – kat wrijft met poot over mond</li>
            <li><strong>Rode, gezwollen mond en tong</strong></li>
            <li><strong>Moeite met slikken</strong></li>
            <li><strong>Poten om de mond</strong> – poging om irritatie te verlichten</li>
            <li><strong>Verlies van eetlust</strong></li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Matige Symptomen</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Braken</strong> – soms met plantmateriaal</li>
            <li><strong>Diarree</strong></li>
            <li><strong>Keelzwelling</strong> die ademhaling kan bemoeilijken</li>
            <li><strong>Verminderde activiteit en lethargie</strong></li>
            <li><strong>Weigering te eten of drinken</strong></li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Ernstige Symptomen (Zeldzaam)</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Ernstige keelzwelling</strong> die ademhaling belemmert</li>
            <li><strong>Aanhoudend braken</strong> leidend tot dehydratie</li>
            <li><strong>Extreme zwakte</strong></li>
            <li><strong>Ademhalingsproblemen</strong> – hijgen, moeite met ademhalen</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Wat Te Doen Als Je Kat Monstera Heeft Gegeten
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Snel handelen is belangrijk, zelfs bij milde symptomen. Volg deze stappen:
          </p>

          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-emerald-900 mb-3">Eerste Hulp Stappen</h3>
            <ol className="list-decimal pl-6 space-y-3 text-gray-800">
              <li>
                <strong>Verwijder plantenresten</strong> – Haal voorzichtig zichtbare plantenresten uit de mond van je kat. Gebruik geen harde voorwerpen die extra schade kunnen veroorzaken.
              </li>
              <li>
                <strong>Spoel de mond</strong> – Spoel de mond van je kat voorzichtig met koel water om calciumoxalaatkristallen te verwijderen. Forceer je kat niet om water te slikken.
              </li>
              <li>
                <strong>Bied water aan</strong> – Geef toegang tot vers drinkwater om verdere spoeling te bevorderen.
              </li>
              <li>
                <strong>Niet laten braken</strong> – Probeer niet je kat te laten braken, tenzij een dierenarts dit adviseert. Braken kan de irritatie verergeren.
              </li>
              <li>
                <strong>Neem direct contact op met je dierenarts</strong> – Zelfs bij milde symptomen. Vermeld hoeveel je kat mogelijk heeft gegeten en welke symptomen je hebt waargenomen.
              </li>
              <li>
                <strong>Monitor je kat nauwlettend</strong> – Let op veranderingen in ademhaling, zwelling of verslechtering van symptomen tijdens transport naar de dierenarts.
              </li>
            </ol>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Wanneer Direct Naar De Dierenarts?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Neem <strong>onmiddellijk</strong> contact op met je dierenarts of de dierenartsenspoeddienst als je een van deze tekenen waarneemt:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li>Zichtbare zwelling van tong, keel of gezicht</li>
            <li>Moeite met ademhalen, hijgen of verstikking</li>
            <li>Aanhoudend of hevig braken (meer dan 2-3 keer)</li>
            <li>Zwakte, flauwvallen of onvermogen te staan</li>
            <li>Bloederige diarree of braassel</li>
            <li>Symptomen die aanhouden of verslechteren</li>
            <li>Weigering te drinken, risico op dehydratie</li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Veterinaire Behandeling</h3>
            <p className="text-blue-800">
              De dierenarts kan de volgende behandelingen bieden: spoelen van de mond met melk of yoghurt om kristallen te neutraliseren, pijnstillers voor mond- en keelirrritatie, anti-braak medicatie, infuustherapie bij dehydratie, en monitoring van ademhaling en zwelling. De meeste katten herstellen volledig met ondersteunende zorg.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Preventiemaatregelen: Houd Je Kat Veilig
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Preventie is de beste bescherming tegen monstera-vergiftiging:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Praktische Tips</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Plaats monstera buiten bereik</strong> – Gebruik hoge plantenstandaarden, hangpotten of kamers waar je kat geen toegang toe heeft</li>
            <li><strong>Gebruik natuurlijke afweermiddelen</strong> – Spray citrusgeur (citroen, sinaasappel) rond de plant; katten haten deze geur</li>
            <li><strong>Bied alternatieven</strong> – Kattengras, kattenment of spinneplant als veilig alternatief om op te kauwen</li>
            <li><strong>Training en afleiding</strong> – Train je kat met "nee" commando's en bied speeltjes als afleiding</li>
            <li><strong>Overweeg kattenvrindelijke planten</strong> – Vervang monstera door veilige planten zoals spinneplant, Boston varen, kattenpalm of orchideeën</li>
            <li><strong>Controleer afgevallen bladeren</strong> – Verwijder direct afgevallen bladeren die op de grond liggen</li>
            <li><strong>Bescherm jonge planten</strong> – Jonge monstera's met zachte bladeren zijn aantrekkelijker voor katten</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Veilige Alternatieven</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Als je van planten houdt maar een kat hebt, overweeg deze kattenvrindelijke alternatieven:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Spinneplant (Chlorophytum comosum)</strong> – 100% veilig en gemakkelijk te verzorgen</li>
            <li><strong>Boston varen</strong> – Niet giftig en voegt groen toe</li>
            <li><strong>Kattenpalm (Chamaedorea elegans)</strong> – Veilig en elegant</li>
            <li><strong>Orchideeën</strong> – Mooi en niet giftig voor katten</li>
            <li><strong>Kattengras</strong> – Speciaal voor katten om veilig op te kauwen</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Veelgestelde Vragen (FAQ)
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Wat maakt monstera giftig voor katten?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Monstera bevat calciumoxalaatkristallen in alle delen van de plant. Deze naaldvormige kristallen kunnen bij kauwen of inname irritatie veroorzaken aan de mond, keel en maag-darmkanaal van katten. De kristallen penetreren het slijmvlies en veroorzaken mechanische en chemische schade.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Wat moet ik doen als mijn kat van monstera heeft gegeten?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Verwijder plantenresten uit de mond van je kat, spoel de mond voorzichtig met water, bied vers water aan en neem direct contact op met je dierenarts, zelfs bij milde symptomen. Probeer je kat niet te laten braken tenzij een dierenarts dit adviseert.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Zijn alle monstera-soorten giftig voor katten?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Ja, alle soorten monstera (Monstera deliciosa, Monstera adansonii, Monstera obliqua, etc.) bevatten calciumoxalaatkristallen en zijn giftig voor katten. Het giftigheidsgehalte is vergelijkbaar tussen verschillende soorten, hoewel de concentratie kan variëren.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Kan een kat sterven van monstera-vergiftiging?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Monstera wordt geclassificeerd als licht tot matig giftig voor katten. Hoewel dodelijke vergiftigingen zeer zeldzaam zijn, kan ernstige inname leiden tot ademhalingsproblemen door keelzwelling en dehydratie door aanhoudend braken. Deze complicaties kunnen levensbedreigend zijn zonder medische behandeling, maar met snelle veterinaire zorg is de prognose uitstekend.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Hoe houd ik mijn kat weg bij monstera?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Plaats de monstera buiten het bereik van katten (hoge plantenstandaarden, hangende potten, afgesloten kamers), gebruik natuurlijke afweermiddelen zoals citrusgeur rondom de plant, bied kattengras als veilig alternatief om op te kauwen, en overweeg kattenvrindelijke planten zoals spinneplant of kattenpalm. Training met "nee" commando's en positieve versterking kan ook helpen.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Conclusie: Monstera en Katten
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Monstera is giftig voor katten door de aanwezigheid van calciumoxalaatkristallen, maar de vergiftiging is meestal mild tot matig. De meeste katten herstellen volledig met snelle veterinaire zorg. Preventie door de plant buiten bereik te plaatsen of te vervangen door kattenvrindelijke alternatieven is de beste strategie.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Als je houdt van je monstera én je kat, zorg dan voor veilige plaatsing en constante monitoring. Bij twijfel of symptomen: neem altijd contact op met je dierenarts.
          </p>
        </div>

        {/* Related Safe Foods */}
        <RelatedSafeFoods
          locale="nl"
          animal="katten"
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
              <Link href="/nl/giftige-planten-katten" className="text-emerald-600 hover:text-emerald-700 hover:underline">
                Complete Lijst: Giftige Planten voor Katten
              </Link>
            </li>
            <li>
              <Link href="/nl/veilige-kamerplanten-katten" className="text-emerald-600 hover:text-emerald-700 hover:underline">
                Veilige Kamerplanten voor Katten
              </Link>
            </li>
            <li>
              <Link href="/nl/eerste-hulp-kat-vergiftiging" className="text-emerald-600 hover:text-emerald-700 hover:underline">
                Eerste Hulp bij Katvergiftiging
              </Link>
            </li>
          </ul>
        </div>
      </article>
    </>
  );
}
