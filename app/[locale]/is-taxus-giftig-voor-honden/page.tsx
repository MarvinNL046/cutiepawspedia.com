import type { Metadata } from 'next';
import Link from 'next/link';
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: 'Is Taxus Giftig voor Honden? | Symptomen & Wat Te Doen | CutiePawsPedia',
  description: 'Taxus (venijnboom) is extreem giftig voor honden. Leer over taxine-vergiftiging, symptomen, spoedzorg en wat te doen bij vermoeden van inname.',
  keywords: 'taxus giftig honden, venijnboom hond, taxine vergiftiging hond, giftige bomen hond, taxus baccata hond',
  openGraph: {
    title: 'Is Taxus Giftig voor Honden? Levensgevaarlijk - Wat Je Moet Weten',
    description: 'Taxus is extreem giftig voor honden. Alle delen kunnen ernstige gezondheidsproblemen veroorzaken. Symptomen, spoedzorg en preventiemaatregelen.',
    type: 'article',
    publishedTime: '2025-12-15T10:00:00Z',
    authors: ['CutiePawsPedia Team'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function IsTaxusGiftigVoorHondenPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Is Taxus Giftig voor Honden?',
    description: 'NOODGIDS: Uitgebreide informatie over de extreme giftigheid van taxus (venijnboom) voor honden, taxine-vergiftiging en levensreddende spoedzorg.',
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
        name: 'Is taxus giftig voor honden?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja - taxus is extreem giftig en levensgevaarlijk voor honden. Alle delen (bladeren, schors, naalden, zaden) bevatten taxine-alkaloïden die hartfalen kunnen veroorzaken. Zelfs kleine hoeveelheden kunnen ernstige gezondheidsproblemen veroorzaken. Dit vereist onmiddellijke veterinaire zorg.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wat maakt taxus zo gevaarlijk voor honden?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Taxus bevat taxine A en B - krachtige cardiotoxinen die het elektrische systeem van het hart verstoren en hartaritmieën veroorzaken. Er is geen tegengif. Zelfs kleine hoeveelheden kunnen ernstige hartstoornissen veroorzaken.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wat moet ik ONMIDDELLIJK doen als mijn hond taxus heeft gegeten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Neem onmiddellijk contact op met je dierenarts en ga direct naar de spoeddienst. Snelle actie is zeer belangrijk. Probeer niet zelf je hond te laten braken. Begin geen thuisbehandeling. Transport je hond direct naar de dichtsbijzijnde dierenkliniek met spoedzorg.',
        },
      },
      {
        '@type': 'Question',
        name: 'Hoeveel taxus is dodelijk voor een hond?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Zeer kleine hoeveelheden kunnen al ernstige problemen veroorzaken. Voor kleinere honden is nog minder nodig. Alle delen van de plant zijn extreem giftig, behalve het rode vruchtvlees (maar de zaden daarin zijn giftig).',
        },
      },
      {
        '@type': 'Question',
        name: 'Kan een hond overleven na taxus-vergiftiging?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Alleen met ONMIDDELLIJKE veterinaire spoedzorg binnen 30-60 minuten na inname. Zonder behandeling is de mortaliteit {'>'}90%. Met snelle interventie (maagspoelingen, actieve kool, intensieve hartmonitoring) kunnen sommige honden overleven, maar de prognose blijft gereserveerd.',
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
          currentPage="Taxus voor Honden"
        />

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Is Taxus Giftig voor Honden?
          </h1>
          <p className="text-xl text-red-600 font-semibold">
            Waarschuwing: Extreem giftig en levensgevaarlijk - snelle actie is cruciaal
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Laatst bijgewerkt: 15 december 2025
          </div>
        </header>

        {/* CRITICAL WARNING */}
        <div className="mb-8 p-6 bg-red-100 border-4 border-red-600 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-red-900 mb-3">Noodsituatie: Extreem giftig</h2>
              <p className="text-red-900 font-semibold mb-3">
                <strong>Taxus (venijnboom) is een van de meest giftige planten voor honden in Nederland.</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 text-red-900 font-medium">
                <li>Alle delen zijn levensgevaarlijk (bladeren, naalden, schors, zaden)</li>
                <li>Kan tot hartfalen leiden</li>
                <li>Zelfs kleine hoeveelheden kunnen ernstige problemen veroorzaken</li>
                <li>Er bestaat geen tegengif voor taxine-vergiftiging</li>
                <li>Neem direct contact op met je dierenarts bij vermoeden van inname</li>
              </ul>
              <div className="mt-4 p-4 bg-red-200 rounded border-2 border-red-700">
                <p className="text-red-900 font-bold text-lg">
                  Snelle actie is cruciaal - ga onmiddellijk naar de spoeddienst
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Waarom Is Taxus Zo Levensgevaarlijk voor Honden?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Taxus, ook bekend als <strong>venijnboom</strong> of <strong>taxusboom</strong> (wetenschappelijk: Taxus baccata), is een populaire haagplant in Nederlandse tuinen. De naam "venijnboom" zegt al genoeg: deze plant is extreem giftig en heeft door de eeuwen heen veel huisdieren en zelfs mensen gedood.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Alle delen van de taxus bevatten <strong>taxine-alkaloïden</strong> (vooral taxine A en B) – krachtige cardiotoxinen die het elektrische systeem van het hart verstoren. Deze giftige stoffen werken snel en kunnen binnen enkele uren leiden tot:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Ernstige hartaritmieën</strong> – onregelmatige hartslagen</li>
            <li><strong>Bradycardie</strong> – gevaarlijk trage hartslag</li>
            <li><strong>Ventriculaire fibrillatie</strong> – chaotische hartactiviteit</li>
            <li><strong>Plotselinge hartstilstand</strong> – binnen 2-5 uur na inname</li>
          </ul>

          <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-red-900 mb-2">Kritieke Feiten Over Taxine</h3>
            <ul className="list-disc pl-6 space-y-2 text-red-800">
              <li><strong>Er bestaat geen tegengif</strong> – behandeling is alleen ondersteunend</li>
              <li><strong>Gevaarlijke hoeveelheden</strong>: Zelfs kleine hoeveelheden kunnen ernstige problemen veroorzaken</li>
              <li><strong>Alle delen zijn giftig</strong>: naalden, bladeren, schors, hout, zaden (behalve het rode vruchtvlees)</li>
              <li><strong>Vergiftiging treedt snel op</strong>: symptomen kunnen binnen enkele uren optreden</li>
              <li><strong>Zonder behandeling</strong>: Zeer ernstige gevolgen</li>
              <li><strong>Zelfs dode takken blijven giftig</strong> – vergiftiging mogelijk door snoeihout</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Symptomen van Taxus-Vergiftiging bij Honden
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Symptomen kunnen zeer snel optreden en escaleren razendsnel. Let op <strong>ALLE</strong> van deze tekenen:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Vroege Symptomen (30 min - 2 uur)</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Kwijlen en speekselvloed</strong></li>
            <li><strong>Misselijkheid</strong></li>
            <li><strong>Braken</strong> – kan groen plantmateriaal bevatten</li>
            <li><strong>Diarree</strong></li>
            <li><strong>Buikpijn en krampen</strong></li>
            <li><strong>Rusteloosheid en angst</strong></li>
            <li><strong>Verwardheid en disorientatie</strong></li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Cardiotoxische Symptomen (1-3 uur)</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-red-700 font-semibold">
            <li><strong>Onregelmatige hartslag</strong> – voelbaar bij pols</li>
            <li><strong>Trage hartslag (bradycardie)</strong> – {'<'}60 slagen/min</li>
            <li><strong>Snelle hartslag (tachycardie)</strong> – {'>'}180 slagen/min</li>
            <li><strong>Zwakke pols</strong></li>
            <li><strong>Bleke of blauwe tandvlees</strong> (cyanose)</li>
            <li><strong>Koude ledematen</strong></li>
            <li><strong>Lage bloeddruk (hypotensie)</strong></li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Neurologische Symptomen</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-red-700 font-semibold">
            <li><strong>Tremors en spiertrillingen</strong></li>
            <li><strong>Ataxie</strong> – wankelende gang</li>
            <li><strong>Convulsies of stuipen</strong></li>
            <li><strong>Extreme zwakte en collaps</strong></li>
            <li><strong>Bewusteloosheid</strong></li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Terminale Symptomen (2-5 uur)</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-red-700 font-semibold">
            <li><strong>Ademhalingsproblemen</strong> – hijgen, moeite met ademhalen</li>
            <li><strong>Coma</strong></li>
            <li><strong>Hartstilstand</strong></li>
            <li><strong>Respiratoir falen</strong></li>
            <li><strong>Overlijden</strong> – vaak plotseling en binnen enkele uren</li>
          </ul>

          <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-red-900 mb-2">Waarschuwing: Plotselinge Dood</h3>
            <p className="text-red-800 font-semibold">
              In sommige gevallen kan taxus-vergiftiging leiden tot <strong>plotselinge dood zonder duidelijke symptomen</strong>. Een hond kan schijnbaar gezond lijken en binnen minuten collaps en overlijden door plotselinge hartstilstand. Dit maakt taxus een van de gevaarlijkste planten voor honden.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            NOODPROTOCOL: Wat Te Doen Bij Taxus-Inname
          </h2>
          <p className="text-red-700 font-bold leading-relaxed mb-4 text-lg">
            Taxus-vergiftiging is een veterinaire noodsituatie. Snelle actie is cruciaal.
          </p>

          <div className="bg-red-50 border-4 border-red-600 p-6 mb-6 rounded-lg">
            <h3 className="text-xl font-bold text-red-900 mb-4">Belangrijke stappen</h3>
            <ol className="list-decimal pl-6 space-y-3 text-red-900 font-semibold">
              <li>
                <strong>Bel direct je dierenarts</strong> – Bel tijdens transport. Meld dat het om taxus-vergiftiging gaat zodat de kliniek kan voorbereiden.
              </li>
              <li>
                <strong>Ga onmiddellijk naar de spoeddienst</strong> – Wacht niet op symptomen. Snelle actie verbetert de behandelkansen.
              </li>
              <li>
                <strong>Probeer niet zelf je hond te laten braken</strong> – Dit kan gevaarlijk zijn en verspilt kostbare tijd. Laat dit aan de dierenarts over.
              </li>
              <li>
                <strong>Verwijder plantenresten uit de mond</strong> – Alleen als dit veilig en snel kan.
              </li>
              <li>
                <strong>Neem plantmateriaal mee</strong> – Voor identificatie (gebruik handschoenen!).
              </li>
              <li>
                <strong>Monitor vitale functies tijdens transport</strong> – Ademhaling, hartslag, bewustzijn.
              </li>
              <li>
                <strong>Houd je hond warm</strong> – Dek je hond toe tijdens transport.
              </li>
              <li>
                <strong>Rijd veilig maar snel</strong> – Snelle actie is belangrijk.
              </li>
            </ol>
          </div>

          <div className="bg-gray-100 border-l-4 border-gray-600 p-6 mb-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">⚠️ Wat NIET Te Doen</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-800 font-medium">
              <li><strong>Niet</strong> wachten op symptomen – snelle actie is belangrijk</li>
              <li><strong>Niet</strong> zelf behandelen of thuisremedies proberen</li>
              <li><strong>Niet</strong> zelf braken opwekken zonder veterinair advies</li>
              <li><strong>Niet</strong> melk of andere vloeistoffen geven</li>
              <li><strong>Niet</strong> je hond alleen laten tijdens transport</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Veterinaire Noodbehandeling
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Taxus-vergiftiging vereist agressieve spoedzorg en intensieve monitoring. De dierenarts zal alles doen om je hond te stabiliseren:
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Medische Interventies</h3>
            <ul className="list-disc pl-6 space-y-2 text-blue-800">
              <li><strong>Onmiddellijke maagspoelingen</strong> – om plantmateriaal te verwijderen</li>
              <li><strong>Actieve kool (meerdere doses)</strong> – om toxines te binden en absorptie te minimaliseren</li>
              <li><strong>Infuustherapie</strong> – voor ondersteuning bloeddruk en hydratatie</li>
              <li><strong>Intensieve hartmonitoring (ECG)</strong> – continue monitoring van hartritmestoornissen</li>
              <li><strong>Antiaritmische medicatie</strong> – atropine voor bradycardie, lidocaïne voor ventriculaire aritmieën</li>
              <li><strong>Elektrische pacemaker</strong> – in extreme gevallen van ernstige bradycardie</li>
              <li><strong>Zuurstoftherapie</strong> – bij ademhalingsproblemen</li>
              <li><strong>Convulsiecontrole</strong> – anticonvulsiva bij stuipen</li>
              <li><strong>24-uur intensieve zorg</strong> – monitoring en ondersteuning</li>
              <li><strong>Cardiopulmonale reanimatie (CPR)</strong> – bij hartstilstand</li>
            </ul>
            <p className="text-blue-800 font-semibold mt-4">
              <strong>Prognose</strong>: Zelfs met agressieve behandeling is de prognose gereserveerd. Overleving hangt af van:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-blue-800 mt-2">
              <li>Hoeveelheid ingenomen plantmateriaal</li>
              <li>Tijd tussen inname en behandeling (hoe sneller hoe beter)</li>
              <li>Grootte en gezondheid van de hond</li>
              <li>Snelheid waarmee maaginhoud wordt verwijderd</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Preventiemaatregelen: Red Je Honds Leven
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            De enige effectieve bescherming tegen taxus-vergiftiging is volledige preventie:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Absolute Prioriteit: Verwijder Taxus</h3>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-6 rounded-r-lg">
            <p className="text-yellow-900 font-semibold mb-3">
              Als je honden hebt: verwijder alle taxusplanten uit je tuin. Dit is de enige manier om het risico volledig te elimineren.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-yellow-800">
              <li>Verwijder taxushagen en -bomen compleet (inclusief wortels)</li>
              <li>Vervang door hondenvrindelijke haagplanten (zie hieronder)</li>
              <li>Gooi snoeihout veilig weg – honden kunnen ook vergiftigd raken door oude takken</li>
              <li>Controleer buurtuinen – zorg dat je hond niet bij taxushagen kan</li>
              <li>Waarschuw wandelroutes – vermijd parken en gebieden met taxusbomen</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Als Je Taxus NIET Kunt Verwijderen</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            In sommige gevallen (huurwoning, gedeelde tuin, openbare ruimte) kun je taxus niet verwijderen. Implementeer dan deze maatregelen:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Fysieke barrière</strong> – Stevige omheining rond taxusplanten (minimaal 1,5m hoog)</li>
            <li><strong>Nooit onbegeleid buiten</strong> – Houd je hond altijd aan de lijn of onder supervisie</li>
            <li><strong>Intensieve training</strong> – Leer "laat maar" commando en beloon afstand houden</li>
            <li><strong>Regelmatige controle</strong> – Controleer dagelijks op afgevallen naalden/takken</li>
            <li><strong>Snoeihout onmiddellijk verwijderen</strong> – Zelfs dode takken blijven giftig</li>
            <li><strong>Overweeg verhuizen</strong> – Voor honden met hoge graaf-/kauwdrang</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Veilige Haagplanten Alternatieven</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Vervang taxushagen door deze hondenvrindelijke alternatieven:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Haagbeuk (Carpinus betulus)</strong> – Dicht, wintergroen, volledig veilig</li>
            <li><strong>Liguster (Ligustrum)</strong> – Snelgroeiend, wintergroen (mild irriterend maar niet dodelijk)</li>
            <li><strong>Buxus (Buxus sempervirens)</strong> – Klassieke haagplant (mild giftig maar niet dodelijk)</li>
            <li><strong>Hulst (Ilex)</strong> – Wintergroen (mild giftig maar niet dodelijk)</li>
            <li><strong>Laurier (Prunus laurocerasus)</strong> – Dichte haag (licht giftig maar niet dodelijk)</li>
          </ul>
          <p className="text-sm text-gray-600 italic mb-4">
            Opmerking: Hoewel sommige alternatieven "mild giftig" zijn, zijn ze incomparabel veiliger dan taxus en veroorzaken meestal alleen milde maagklachten bij inname.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Veelgestelde Vragen (FAQ)
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Is taxus giftig voor honden?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Ja - taxus is extreem giftig en levensgevaarlijk voor honden. Alle delen (bladeren, naalden, schors, hout, zaden) bevatten taxine A en B - krachtige cardiotoxinen die hartfalen kunnen veroorzaken. Zelfs kleine hoeveelheden kunnen ernstige gezondheidsproblemen veroorzaken. Het rode vruchtvlees is niet giftig, maar de zaden daarin wel. Dit vereist onmiddellijke veterinaire zorg.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Wat maakt taxus zo gevaarlijk voor honden?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Taxus bevat taxine A en B - krachtige cardiotoxinen die het elektrische systeem van het hart verstoren en ernstige hartaritmieën veroorzaken (bradycardie, ventriculaire fibrillatie). Er bestaat geen tegengif. De giftige stoffen werken snel en zonder behandeling zijn de gevolgen zeer ernstig. Zelfs met veterinaire zorg is de prognose gereserveerd.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Wat moet ik ONMIDDELLIJK doen als mijn hond taxus heeft gegeten?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Neem onmiddellijk contact op met je dierenarts en ga direct naar de spoeddienst. Snelle actie is cruciaal. Probeer niet zelf je hond te laten braken. Begin geen thuisbehandeling. Verwijder alleen plantenresten uit de mond als dit veilig en snel kan. Neem plantmateriaal mee voor identificatie. Monitor vitale functies (ademhaling, hartslag, bewustzijn) tijdens transport. Houd je hond warm. Wacht niet op symptomen.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Hoeveel taxus is dodelijk voor een hond?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Zeer kleine hoeveelheden kunnen al ernstige problemen veroorzaken. Voor kleinere honden is nog minder nodig. Alle delen van de plant zijn extreem giftig, behalve het rode vruchtvlees rondom de zaden (maar de zaden zelf zijn giftig). Zelfs snoeihout en dode takken blijven giftig.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Kan een hond overleven na taxus-vergiftiging?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Alleen met onmiddellijke veterinaire spoedzorg. Zonder behandeling zijn de gevolgen zeer ernstig. Met snelle interventie (maagspoelingen, actieve kool, intensieve hartmonitoring, antiaritmische medicatie) kunnen sommige honden overleven, maar de prognose blijft gereserveerd. Overleving hangt af van hoeveelheid ingenomen materiaal, snelheid van behandeling, en tijdige maagontlediging. Zelfs overlevers kunnen blijvende hartschade oplopen.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Conclusie: Taxus = Levensgevaar
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Taxus is een van de meest dodelijke planten voor honden in Nederland. Er is geen veilige hoeveelheid, geen tegengif, en zelfs met agressieve behandeling is de prognose onzeker.
          </p>
          <p className="text-red-700 font-bold leading-relaxed mb-4 text-lg">
            De enige effectieve bescherming: verwijder alle taxus uit je tuin.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Als je honden hebt en taxus in je tuin, neem vandaag nog actie. Vervang taxushagen door veilige alternatieven. Je honds leven kan ervan afhangen.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Bij vermoeden van inname: snelle actie is cruciaal. Bel direct je dierenarts en ga onmiddellijk naar de spoeddienst.
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
            Deze informatie is bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies, diagnose of behandeling. Taxus-vergiftiging is een levensbedreigende noodsituatie die onmiddellijke veterinaire spoedzorg vereist. Neem bij vermoeden van inname DIRECT contact op met een gekwalificeerde dierenarts of de dierenartsenspoeddienst. Elke minuut telt.
          </p>
        </div>

        {/* Emergency Contacts */}
        <div className="mt-8 p-6 bg-red-50 border-2 border-red-500 rounded-lg">
          <h3 className="text-lg font-semibold text-red-900 mb-4">Noodcontacten</h3>
          <ul className="space-y-3">
            <li className="text-red-800">
              <strong>Je eigen dierenarts</strong> – Neem direct contact op
            </li>
            <li className="text-red-800">
              <strong>Dierenartsen spoeddienst</strong> – 24/7 bereikbaar in je regio
            </li>
            <li className="text-red-800">
              <strong>Veterinair Toxicologisch Informatiecentrum</strong> – Voor advisering
            </li>
          </ul>
          <p className="text-red-700 font-bold mt-4">
            Bel altijd voor aankomst – zodat de kliniek kan voorbereiden op spoedzorg
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
              <Link href="/nl/veilige-haagplanten-honden" className="text-emerald-600 hover:text-emerald-700 hover:underline">
                Veilige Haagplanten voor Honden
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
