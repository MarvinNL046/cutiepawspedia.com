import type { Metadata } from 'next';
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: 'Is Xylitol Giftig voor Honden? Levensgevaarlijk Insuline Risico | CutiePawsPedia',
  description: 'Xylitol is extreem giftig voor honden en veroorzaakt acute insulineschok en leverfalen. Leer welke producten xylitol bevatten en wat te doen bij inname.',
  keywords: 'xylitol giftig honden, kunstmatige zoetstof hond, insulineschok hond, xylitol vergiftiging',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Is Xylitol Giftig voor Honden? Levensgevaarlijk Insuline Risico',
    description: 'Xylitol is extreem giftig voor honden en veroorzaakt acute insulineschok. Ontdek welke producten het bevatten.',
    type: 'article',
    locale: 'nl_NL',
  },
};

export default function IsXylitolGiftigVoorHondenPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'Is Xylitol Giftig voor Honden?',
        description: 'Uitgebreide gids over xylitolvergiftiging bij honden, insulineschok en leverfalen risico.',
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
            name: 'Wat is xylitol en waarom is het gevaarlijk?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Xylitol is een kunstmatige zoetstof die veilig is voor mensen maar extreem giftig voor honden. Bij honden veroorzaakt xylitol een snelle insuline-afgifte die leidt tot levensbedreigende hypoglykemie (lage bloedsuiker) en kan ook acuut leverfalen veroorzaken.',
            },
          },
          {
            '@type': 'Question',
            name: 'In welke producten zit xylitol?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Xylitol zit in kauwgom, suikervrije snoep, tandpasta, mondwater, pindakaas, proteïnerepen, vitamines, medicijnen, bakproducten en diabetische producten. Controleer altijd ingrediëntenlabels op xylitol, E967, of berk suiker.',
            },
          },
          {
            '@type': 'Question',
            name: 'Hoe snel werkt xylitol?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Xylitol werkt extreem snel - symptomen kunnen binnen 10-30 minuten optreden. Dit maakt xylitolvergiftiging tot een absolute noodsituatie waarbij elke seconde telt.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wat zijn de symptomen van xylitolvergiftiging?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Vroege symptomen zijn zwakte, braken, coördinatieproblemen en lethargie. Ernstige symptomen zijn aanvallen, bewusteloosheid, leverfalen en mogelijk overlijden. Symptomen kunnen binnen 30 minuten beginnen.',
            },
          },
          {
            '@type': 'Question',
            name: 'Kan mijn hond overleven na xylitol inname?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Met onmiddellijke behandeling (binnen 30-60 minuten) is de prognose goed. Hoe sneller de behandeling, hoe beter de overlevingskans. Zonder behandeling kan xylitolvergiftiging binnen enkele uren fataal zijn.',
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
        {/* Header */}
        <header className="mb-8">
          {/* Breadcrumb with JSON-LD Schema */}
          <FoodGuideBreadcrumb
            locale="nl"
            items={[
              { name: "Voedselgids", href: "/nl/voedselgids" },
              { name: "Giftige Stoffen", href: "/nl/giftige-stoffen" },
            ]}
            currentPage="Xylitol voor Honden"
          />

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Is Xylitol Giftig voor Honden?
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
              <h3 className="text-lg font-semibold text-red-900 mb-2">Toxiciteit: HOOG - Levensgevaarlijk</h3>
              <p className="text-red-800">
                <strong>Ja, xylitol is extreem giftig voor honden.</strong> Deze kunstmatige zoetstof veroorzaakt bij honden een snelle insuline-afgifte die leidt tot levensbedreigende hypoglykemie (lage bloedsuiker). Grotere hoeveelheden kunnen acuut leverfalen veroorzaken. Symptomen kunnen binnen 10-30 minuten optreden. Zelfs kleine hoeveelheden kunnen dodelijk zijn. Xylitol zit in veel producten zoals kauwgom, pindakaas, tandpasta en suikervrije snoep. Neem DIRECT contact op met je dierenarts bij elke inname - dit is een absolute noodsituatie.
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-8">
          <p className="text-xl text-gray-700 leading-relaxed">
            Xylitol is een van de gevaarlijkste stoffen voor honden en behoort tot de meest voorkomende oorzaken van plotselinge vergiftiging. Wat deze kunstmatige zoetstof zo verraderlijk maakt, is de snelheid waarmee het werkt en het feit dat het in zoveel alledaagse producten zit. Een enkel stukje kauwgom kan al dodelijk zijn voor een kleine hond. Xylitol veroorzaakt een dramatische insuline-afgifte die binnen minuten kan leiden tot levensbedreigende lage bloedsuiker, aanvallen en bewusteloosheid. Bij grotere hoeveelheden volgt acuut leverfalen. Dit artikel legt uit waarom xylitol zo gevaarlijk is, in welke producten het zit en wat je onmiddellijk moet doen bij inname.
          </p>
        </div>

        {/* Why Dangerous Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-emerald-500 pb-2">
            Waarom is Xylitol Levensgevaarlijk voor Honden?
          </h2>

          <div className="bg-red-50 rounded-lg p-6 mb-6 border-l-4 border-red-500">
            <h3 className="text-xl font-semibold text-red-900 mb-3">Dramatische Insuline Reactie</h3>
            <p className="text-red-800 mb-4">
              Bij mensen veroorzaakt xylitol weinig tot geen insuline-afgifte, waardoor het veilig is als zoetstof. Bij honden werkt xylitol totaal anders:
            </p>
            <ul className="space-y-3 text-red-800">
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-2">1.</span>
                <div>
                  <strong>Snelle absorptie:</strong> Xylitol wordt binnen 10-30 minuten volledig opgenomen in de bloedbaan
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-2">2.</span>
                <div>
                  <strong>Massale insuline-afgifte:</strong> De alvleesklier herkent xylitol als suiker en geeft grote hoeveelheden insuline af
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-2">3.</span>
                <div>
                  <strong>Acute hypoglykemie:</strong> De insuline verwijdert alle glucose uit het bloed, bloedsuiker daalt gevaarlijk snel
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-2">4.</span>
                <div>
                  <strong>Orgaanfalen:</strong> De hersenen en andere organen krijgen geen energie meer, wat leidt tot aanvallen, coma en mogelijk overlijden
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Leverfalen: Het Tweede Gevaar</h3>
            <p className="text-gray-700 mb-4">
              Bij grotere hoeveelheden xylitol (of soms zelfs bij kleinere hoeveelheden) kan ook acuut leverfalen optreden:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-orange-600 font-bold mr-2">•</span>
                <span><strong>Direct toxisch effect:</strong> Xylitol beschadigt levercellen direct</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 font-bold mr-2">•</span>
                <span><strong>Necrose:</strong> Levercellen sterven af (hepatische necrose)</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 font-bold mr-2">•</span>
                <span><strong>Timing:</strong> Leverfalen kan optreden binnen 12-72 uur na inname</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 font-bold mr-2">•</span>
                <span><strong>Ernstig risico:</strong> Leverfalen is vaak fataal, zelfs met intensieve behandeling</span>
              </li>
            </ul>
          </div>

          <div className="bg-yellow-50 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-yellow-900 mb-3">Extreem Snelle Werking</h3>
            <p className="text-yellow-800 mb-3">
              Xylitol werkt veel sneller dan de meeste andere giftige stoffen:
            </p>
            <div className="space-y-2 text-yellow-800">
              <div className="flex items-center bg-yellow-100 p-3 rounded">
                <span className="font-bold mr-2">10-30 min:</span>
                <span>Eerste symptomen (zwakte, braken)</span>
              </div>
              <div className="flex items-center bg-yellow-100 p-3 rounded">
                <span className="font-bold mr-2">30-60 min:</span>
                <span>Hypoglykemie bereikt kritieke waarden</span>
              </div>
              <div className="flex items-center bg-yellow-100 p-3 rounded">
                <span className="font-bold mr-2">1-2 uur:</span>
                <span>Risico op aanvallen en bewusteloosheid</span>
              </div>
              <div className="flex items-center bg-yellow-100 p-3 rounded">
                <span className="font-bold mr-2">12-72 uur:</span>
                <span>Mogelijk leverfalen bij grotere hoeveelheden</span>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-purple-900 mb-3">Producten met Xylitol - Overal Aanwezig</h3>
            <p className="text-purple-800 mb-4">
              Xylitol zit in steeds meer producten. Het wordt ook aangeduid als E967 of "berk suiker". Veel voorkomende bronnen:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold text-purple-900 mb-2">Voedingsmiddelen:</h4>
                <ul className="space-y-1 text-purple-800 text-sm">
                  <li>• Kauwgom (grootste risico!)</li>
                  <li>• Suikervrije snoep</li>
                  <li>• Pindakaas (sommige merken)</li>
                  <li>• Proteïnerepen</li>
                  <li>• Koekjes & bakproducten</li>
                  <li>• Chocolade (suikervrij)</li>
                  <li>• IJsjes (suikervrij)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-purple-900 mb-2">Gezondheidszorg:</h4>
                <ul className="space-y-1 text-purple-800 text-sm">
                  <li>• Tandpasta</li>
                  <li>• Mondwater</li>
                  <li>• Vitaminesupplementen</li>
                  <li>• Medicijnen (suikervrij)</li>
                  <li>• Keelpastilles</li>
                  <li>• Hoestdrank</li>
                  <li>• Neussprays</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-purple-900 mb-2">Andere:</h4>
                <ul className="space-y-1 text-purple-800 text-sm">
                  <li>• Diabetische producten</li>
                  <li>• Dieetproducten</li>
                  <li>• Energydrinks (suikervrij)</li>
                  <li>• Dropdrank</li>
                  <li>• Sommige medicijnen</li>
                  <li>• Cosmetica producten</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Symptoms Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-emerald-500 pb-2">
            Symptomen van Xylitolvergiftiging
          </h2>

          <p className="text-gray-700 mb-6">
            Symptomen van xylitolvergiftiging ontwikkelen zich extreem snel - vaak binnen 10-30 minuten. Er zijn twee fasen van symptomen: acute hypoglykemie en mogelijk leverfalen.
          </p>

          <div className="space-y-6">
            <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-500">
              <h3 className="text-lg font-semibold text-yellow-900 mb-3">Fase 1: Hypoglykemie (10-60 minuten)</h3>
              <p className="text-yellow-800 mb-3 text-sm italic">
                Deze symptomen worden veroorzaakt door extreem lage bloedsuiker en kunnen razendsnel optreden:
              </p>
              <ul className="space-y-2 text-yellow-800">
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">▸</span>
                  <span><strong>Zwakte en lethargie:</strong> Hond is slap, kan nauwelijks staan</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">▸</span>
                  <span><strong>Braken:</strong> Vaak een vroeg symptoom</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">▸</span>
                  <span><strong>Coördinatieproblemen:</strong> Wankelend lopen, struikelen</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">▸</span>
                  <span><strong>Verwarring:</strong> Gedesoriënteerd, reageert niet normaal</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">▸</span>
                  <span><strong>Trillen:</strong> Spiertrillingen door lage bloedsuiker</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">▸</span>
                  <span><strong>Bleek tandvlees:</strong> Door slechte circulatie</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-500">
              <h3 className="text-lg font-semibold text-red-900 mb-3">Fase 2: Ernstige Hypoglykemie (30-120 minuten)</h3>
              <p className="text-red-800 mb-3 text-sm italic">
                Zonder behandeling verergert de situatie snel tot levensbedreigende complicaties:
              </p>
              <ul className="space-y-2 text-red-800">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">▸</span>
                  <span><strong>Epileptische aanvallen:</strong> Stuipen door energietekort in de hersenen</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">▸</span>
                  <span><strong>Collaps:</strong> Volledig niet meer in staat te staan</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">▸</span>
                  <span><strong>Bewusteloosheid:</strong> Geen reactie meer op prikkels</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">▸</span>
                  <span><strong>Coma:</strong> Diepe bewusteloosheid</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">▸</span>
                  <span><strong>Overlijden:</strong> Zonder behandeling vaak fataal binnen enkele uren</span>
                </li>
              </ul>
            </div>

            <div className="bg-orange-50 rounded-lg p-6 border-l-4 border-orange-500">
              <h3 className="text-lg font-semibold text-orange-900 mb-3">Fase 3: Mogelijk Leverfalen (12-72 uur)</h3>
              <p className="text-orange-800 mb-3 text-sm italic">
                Bij grotere hoeveelheden kan leverfalen optreden, zelfs als de hypoglykemie is behandeld:
              </p>
              <ul className="space-y-2 text-orange-800">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">▸</span>
                  <span><strong>Geelzucht:</strong> Gele verkleuring van ogen, tandvlees en huid</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">▸</span>
                  <span><strong>Braken met bloed:</strong> Door leverbeschadiging</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">▸</span>
                  <span><strong>Bloedingsstoornissen:</strong> Spontane bloedingen, blauwe plekken</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">▸</span>
                  <span><strong>Zwarte ontlasting:</strong> Verteerd bloed in de ontlasting</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">▸</span>
                  <span><strong>Neurologische symptomen:</strong> Door toxine-ophoping (hepatische encefalopathie)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-red-100 border-2 border-red-500 rounded-lg p-6">
            <h3 className="text-xl font-bold text-red-900 mb-2">⚠️ Kritieke waarschuwing</h3>
            <p className="text-red-900 font-semibold">
              Xylitolvergiftiging vereist zeer snelle actie. Symptomen kunnen binnen 10-30 minuten optreden en zijn levensbedreigend. Wacht niet af of symptomen optreden - neem bij elke mogelijke inname van xylitol onmiddellijk contact op met je dierenarts. Snelle actie is cruciaal.
            </p>
          </div>
        </section>

        {/* What To Do Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-emerald-500 pb-2">
            Wat Te Doen Als Je Hond Xylitol Heeft Gegeten?
          </h2>

          <div className="bg-red-100 border-2 border-red-500 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-red-900 mb-3">⚠️ Absolute noodsituatie</h3>
            <p className="text-red-900 font-semibold mb-3">
              Xylitolvergiftiging is een van de snelste en gevaarlijkste vergiftigingen bij honden. Symptomen kunnen zeer snel optreden.
            </p>
            <p className="text-red-900 text-lg font-bold">
              Bel onmiddellijk je dierenarts
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Emergency Protocol (ALS je al hebt gebeld):</h3>
            <ol className="space-y-4">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mr-3">1</span>
                <div>
                  <strong className="text-gray-900">DIERENARTS BELLEN = PRIORITEIT #1</strong>
                  <p className="text-gray-700 mt-1">Zeg direct: "NOODGEVAL - Mijn hond heeft xylitol gegeten". Volg hun instructies EXACT op. Zij bepalen of je moet komen of ze eerst advies geven.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mr-3">2</span>
                <div>
                  <strong className="text-gray-900">Verzamel Info (TIJDENS telefoongesprek)</strong>
                  <p className="text-gray-700 mt-1">Terwijl je belt, kijk naar: Product naam, hoeveel gegeten, tijdstip (hoe lang geleden), gewicht van je hond. De dierenarts vraagt dit.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mr-3">3</span>
                <div>
                  <strong className="text-gray-900">DIRECT naar Kliniek (meestal)</strong>
                  <p className="text-gray-700 mt-1">In de meeste gevallen zal de dierenarts zeggen: "Kom DIRECT". Ga onmiddellijk - rij veilig maar snel. Dit is een levensbedreigende situatie.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mr-3">4</span>
                <div>
                  <strong className="text-gray-900">Monitor je Hond (tijdens transport)</strong>
                  <p className="text-gray-700 mt-1">Let op: zwakte, braken, trillen, coördinatieproblemen, aanvallen. Meld alles aan de dierenarts bij aankomst.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mr-3">5</span>
                <div>
                  <strong className="text-gray-900">Neem Product Verpakking Mee</strong>
                  <p className="text-gray-700 mt-1">Als mogelijk, neem de verpakking of label mee zodat de dierenarts exact kan zien hoeveel xylitol erin zat.</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
              <h3 className="text-lg font-semibold text-emerald-900 mb-2">✓ WEL Doen</h3>
              <ul className="space-y-1 text-emerald-800 text-sm">
                <li>• DIRECT dierenarts bellen</li>
                <li>• Productverpakking meenemen</li>
                <li>• Onmiddellijk naar kliniek (als instructie)</li>
                <li>• Rustig blijven maar SNEL handelen</li>
                <li>• Exact volgen wat dierenarts zegt</li>
              </ul>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
              <h3 className="text-lg font-semibold text-red-900 mb-2">✗ ABSOLUUT NIET Doen</h3>
              <ul className="space-y-1 text-red-800 text-sm">
                <li>• Afwachten of symptomen optreden</li>
                <li>• Eerst online zoeken naar advies</li>
                <li>• Zelf braken induceren zonder instructie</li>
                <li>• Suiker of honing geven (zonder instructie)</li>
                <li>• Denken "het was maar een klein stukje"</li>
                <li>• Tijd verspillen met schoonmaken</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Waarom Zo'n Haast?</h3>
            <p className="text-blue-800 mb-3">
              Xylitol werkt zeer snel:
            </p>
            <ul className="space-y-1 text-blue-800 text-sm">
              <li>• Absorptie en insuline-afgifte kan binnen minuten beginnen</li>
              <li>• Bloedsuiker kan snel kritiek laag worden</li>
              <li>• Risico op ernstige complicaties neemt toe met tijd</li>
              <li>• Behandeling voor symptomen geeft de beste kans op herstel</li>
              <li>• Snelle actie verbetert de behandelkansen aanzienlijk</li>
            </ul>
          </div>
        </section>

        {/* When to Contact Vet */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-emerald-500 pb-2">
            Behandeling door de Dierenarts
          </h2>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Urgente Medische Interventie</h3>
            <p className="text-gray-700 mb-4">
              De behandeling van xylitolvergiftiging is agressief en moet binnen minuten beginnen. Meestal bestaat de behandeling uit:
            </p>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <strong className="text-gray-900">1. Braken induceren (zo snel mogelijk)</strong>
                <p className="text-gray-700 mt-1 text-sm">
                  Als je snel op de kliniek bent, zal de dierenarts mogelijk braken opwekken om xylitol uit de maag te verwijderen voordat het wordt opgenomen.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <strong className="text-gray-900">2. Bloedsuiker stabiliseren (urgent)</strong>
                <p className="text-gray-700 mt-1 text-sm">
                  Intraveneuze glucose (suikeroplossing) wordt direct toegediend om de bloedsuiker omhoog te brengen. Dit wordt frequent gemonitord en bijgesteld.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <strong className="text-gray-900">3. Continue monitoring</strong>
                <p className="text-gray-700 mt-1 text-sm">
                  Bloedsuikerspiegel wordt regelmatig gemeten, leverfunctie tests om leverschade te detecteren, infuustherapie om uitdroging te voorkomen en toxinen uit te spoelen.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <strong className="text-gray-900">4. Leverbescherming</strong>
                <p className="text-gray-700 mt-1 text-sm">
                  Medicijnen om leverschade te voorkomen of te behandelen (zoals N-acetylcysteïne, SAMe), continue monitoring van leverenzymen.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <strong className="text-gray-900">5. Symptomatische Behandeling</strong>
                <p className="text-gray-700 mt-1 text-sm">
                  Anti-nausea medicatie bij braken, anti-epileptica bij aanvallen, bloedstolling monitoring en behandeling bij leverfalen.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-yellow-900 mb-3">Prognose: Tijd is Alles</h3>
            <div className="space-y-3 text-yellow-800">
              <div className="flex items-start">
                <span className="text-green-600 font-bold mr-2 text-2xl">✓</span>
                <div>
                  <strong>Snelle behandeling:</strong>
                  <p className="text-sm">Uitstekende prognose - vaak volledig herstel</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 font-bold mr-2 text-2xl">✓</span>
                <div>
                  <strong>Behandeling binnen enkele uren:</strong>
                  <p className="text-sm">Goede prognose met intensieve zorg</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-yellow-600 font-bold mr-2 text-2xl">⚠</span>
                <div>
                  <strong>Vertraagde behandeling:</strong>
                  <p className="text-sm">Risico op complicaties neemt toe</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-orange-600 font-bold mr-2 text-2xl">⚠</span>
                <div>
                  <strong>Behandeling na symptomen:</strong>
                  <p className="text-sm">Gereserveerde prognose - mogelijk hersenschade of leverfalen</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-red-600 font-bold mr-2 text-2xl">✗</span>
                <div>
                  <strong>Geen behandeling:</strong>
                  <p className="text-sm">Zeer slechte prognose - vaak fataal binnen enkele uren</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-emerald-900 mb-2">Opname en Herstel</h3>
            <p className="text-emerald-800">
              Honden met xylitolvergiftiging hebben meestal 24-72 uur intensieve zorg nodig in de kliniek. Bloedsuiker en leverfunctie moeten nauwlettend worden gemonitord. Volledig herstel kan enkele dagen tot weken duren, afhankelijk van de ernst van de vergiftiging.
            </p>
          </div>
        </section>

        {/* Prevention Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-emerald-500 pb-2">
            Preventie: Houd Xylitol Ver van Je Hond
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-emerald-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-emerald-900 mb-3">Bewustwording</h3>
              <ul className="space-y-2 text-emerald-800">
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">✓</span>
                  <span>Controleer ALLE ingrediëntenlabels op xylitol of E967</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">✓</span>
                  <span>Kauwgom is grootste risico - NOOIT binnen bereik</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">✓</span>
                  <span>Check pindakaas labels (sommige merken bevatten xylitol!)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">✓</span>
                  <span>Suikervrije producten = standaard controleren</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">✓</span>
                  <span>Tandpasta alleen in badkamerkast met deur</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Veilig Bewaren</h3>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Tassen en jassen opbergen (kauwgom in zakken!)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Medicijnkastjes altijd gesloten houden</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Gasten waarschuwen over tassen en kauwgom</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Snoep en proteïnerepen in gesloten kasten</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Afvalbak met deksel (geen uitgekauwd kauwgom!)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-500 mb-6">
            <h3 className="text-lg font-semibold text-red-900 mb-3">⚠️ Grootste Risicoproducten</h3>
            <p className="text-red-800 mb-3">Deze producten zijn EXTREEM gevaarlijk en moeten ALTIJD buiten bereik:</p>
            <ul className="grid md:grid-cols-2 gap-2 text-red-800 text-sm">
              <li>• Suikervrije kauwgom (1-2 stukjes = dodelijk!)</li>
              <li>• Sommige pindakaas merken (check label!)</li>
              <li>• Suikervrije snoep en snoeprepen</li>
              <li>• Tandpasta (vooral kindertandpasta)</li>
              <li>• Proteïne- en energierepen</li>
              <li>• Suikervrije koekjes en gebak</li>
              <li>• Mondwater en mondspoelmiddelen</li>
              <li>• Vitamine supplementen (kauwbaar)</li>
            </ul>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">Label Lezen: Wat Te Zoeken</h3>
            <p className="text-purple-800 mb-3">
              Xylitol kan verschillende namen hebben op ingrediëntenlijsten:
            </p>
            <ul className="space-y-1 text-purple-800">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span><strong>Xylitol</strong> - meest voorkomende naam</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span><strong>E967</strong> - E-nummer in EU</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span><strong>Berksuiker</strong> - natuurlijke bron naam</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span><strong>"Suikervrij"</strong> - vaak xylitol bevattend</span>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-emerald-500 pb-2">
            Veelgestelde Vragen over Xylitol en Honden
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Wat is xylitol en waarom is het gevaarlijk?
              </h3>
              <p className="text-gray-700">
                Xylitol is een kunstmatige zoetstof die veilig is voor mensen maar extreem giftig voor honden. Bij honden veroorzaakt xylitol een snelle en massale insuline-afgifte die leidt tot levensbedreigende hypoglykemie (lage bloedsuiker). Dit kan binnen 10-30 minuten tot aanvallen, bewusteloosheid en overlijden leiden. Grotere hoeveelheden kunnen ook acuut leverfalen veroorzaken. Zelfs kleine hoeveelheden (1 stukje kauwgom) kunnen dodelijk zijn.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                In welke producten zit xylitol?
              </h3>
              <p className="text-gray-700">
                Xylitol zit in veel producten: kauwgom (grootste risico), suikervrije snoep, sommige pindakaas merken, proteïnerepen, tandpasta, mondwater, vitamines, medicijnen (suikervrij), koekjes, bakproducten en diabetische producten. Controleer altijd ingrediëntenlabels op xylitol, E967, of "berk suiker". Elk "suikervrij" product is verdacht en moet worden gecontroleerd.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Hoe snel werkt xylitol?
              </h3>
              <p className="text-gray-700">
                Xylitol werkt extreem snel - het wordt binnen 10-30 minuten opgenomen in de bloedbaan. Symptomen zoals zwakte, braken en coördinatieproblemen kunnen binnen 10-30 minuten optreden. Ernstige symptomen zoals aanvallen en bewusteloosheid kunnen binnen 30-120 minuten volgen. Dit maakt xylitolvergiftiging tot een absolute noodsituatie waarbij elke seconde telt. Behandeling moet beginnen VOORDAT symptomen optreden voor de beste overlevingskans.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Wat zijn de symptomen van xylitolvergiftiging?
              </h3>
              <p className="text-gray-700">
                Vroege symptomen (10-60 min) zijn zwakte, braken, coördinatieproblemen, verwarring, trillen en bleek tandvlees. Ernstige symptomen (30-120 min) zijn epileptische aanvallen, collaps, bewusteloosheid en coma. Bij grotere hoeveelheden kan leverfalen optreden binnen 12-72 uur met geelzucht, bloedingen en neurologische problemen. Symptomen kunnen razendsnel optreden - wacht niet af, bel direct je dierenarts bij elke mogelijke inname.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Kan mijn hond overleven na xylitol inname?
              </h3>
              <p className="text-gray-700">
                Met onmiddellijke behandeling (binnen 30-60 minuten na inname) is de prognose goed en kunnen veel honden volledig herstellen. Hoe sneller de behandeling, hoe beter de overlevingskans. Behandeling bestaat uit braken induceren (binnen 10-30 min), glucose infuus om bloedsuiker te stabiliseren, en 24-72 uur intensieve monitoring. Zonder behandeling kan xylitolvergiftiging binnen enkele uren fataal zijn. TIJD IS CRUCIAAL - bel direct je dierenarts bij elke mogelijke inname.
              </p>
            </div>
          </div>
        </section>

        {/* Medical Disclaimer */}
        <section className="mb-12">
          <div className="bg-gray-100 border-l-4 border-gray-400 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Medische Disclaimer</h3>
            <p className="text-gray-700 text-sm">
              De informatie op deze pagina is uitsluitend bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies, diagnose of behandeling. Xylitolvergiftiging is een absolute medische noodsituatie waarbij elke seconde telt. Neem bij elke mogelijke inname van xylitol door je hond ONMIDDELLIJK contact op met je dierenarts of de dierenartsenpraktijk met spoed. Wacht NOOIT af of symptomen optreden - behandeling moet beginnen voordat symptomen zich manifesteren voor de beste overlevingskans. Bij twijfel moet je direct handelen en professionele hulp inschakelen. CutiePawsPedia is niet verantwoordelijk voor eventuele gevolgen van het gebruik van deze informatie.
            </p>
          </div>
        </section>

        {/* Safe Food Alternatives */}
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
