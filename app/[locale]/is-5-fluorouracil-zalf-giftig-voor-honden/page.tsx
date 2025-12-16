import { Metadata } from 'next';
import Link from 'next/link';
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: 'Is 5-Fluorouracil Zalf Giftig voor Honden? | Extreem Gevaarlijk',
  description: '5-Fluorouracil zalf (Efudix) is extreem giftig voor honden. Zelfs zeer kleine hoeveelheden kunnen ernstige gezondheidsproblemen veroorzaken. Leer symptomen en wat te doen.',
  keywords: '5-fluorouracil honden, Efudix giftig, 5-FU zalf dodelijk, chemotherapie zalf honden, fluorouracil vergiftiging',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Is 5-Fluorouracil Zalf Giftig voor Honden? Extreem Gevaarlijk',
    description: '5-Fluorouracil zalf is extreem giftig voor honden. Zelfs zeer kleine hoeveelheden kunnen levensbedreigende effecten hebben. Onmiddellijke veterinaire zorg is essentieel.',
    type: 'article',
    locale: 'nl_NL',
  },
};

export default function Is5FluorouracilZalfGiftigVoorHonden() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Is 5-Fluorouracil Zalf Giftig voor Honden?',
    description: 'Kritieke informatie over de extreme toxiciteit van 5-Fluorouracil zalf voor honden - vaak fataal zelfs bij kleinste hoeveelheden.',
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
        name: 'Waarom is 5-Fluorouracil zo dodelijk voor honden?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '5-Fluorouracil (5-FU) is een chemotherapiemedicijn dat snel delende cellen aanvalt. Bij honden heeft dit een extreme toxiciteit - het vernietigt cellen in het beenmerg, maag-darmstelsel en zenuwstelsel. Honden kunnen dit medicijn niet metaboliseren zoals mensen. Zelfs een kleine hoeveelheid zalf (minder dan 1 gram) kan een kleine hond doden binnen 24-48 uur.',
        },
      },
      {
        '@type': 'Question',
        name: 'Hoe snel werkt 5-Fluorouracil vergiftiging bij honden?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Symptomen kunnen binnen 30 minuten tot 4 uur optreden na huid- of oraal contact. Ernstige neurologische symptomen zoals stuipen kunnen al binnen enkele uren ontstaan. Zonder onmiddellijke intensive care behandeling overlijden de meeste honden binnen 12-72 uur. Tijd is absoluut kritiek - elke minuut vertraging verkleint de overlevingskans.',
        },
      },
      {
        '@type': 'Question',
        name: 'Kan mijn hond overleven na 5-Fluorouracil contact?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'De prognose is zeer slecht. Zelfs met agressieve veterinaire behandeling overlijdt het merendeel van de honden. Overleving hangt af van de hoeveelheid blootstelling en hoe snel intensive care wordt gestart. Honden die de eerste 72 uur overleven, hebben nog steeds risico op late complicaties zoals beenmergfalen. Dit is een van de meest dodelijke vergiftigingen bij honden.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wat moet ik ONMIDDELLIJK doen als mijn hond 5-FU zalf heeft aangeraakt?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'BEL ONMIDDELLIJK je dierenarts - dit is een ABSOLUTE noodsituatie. Was voorzichtig het contactgebied met ruim water en zeep (draag handschoenen!). RACE naar de dichtstbijzijnde dierennoodkliniek - rijd snel maar veilig. Neem de verpakking mee. Bereid je voor op intensive care opname. Wacht geen seconde - dit kan het verschil zijn tussen leven en dood.',
        },
      },
      {
        '@type': 'Question',
        name: 'Waar wordt 5-Fluorouracil zalf voor gebruikt bij mensen?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '5-Fluorouracil zalf (merknamen: Efudix, Actikerall) wordt gebruikt voor behandeling van huidkanker en voorstadia daarvan (actinische keratose, basaalcelcarcinoom). Het wordt ook soms gebruikt voor wratten. De zalf wordt op de huid gesmeerd en blijft daar enkele weken. Voor honden is dit medicijn absoluut verboden en dodelijk gevaarlijk.',
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
        {/* Breadcrumb with JSON-LD Schema */}
        <FoodGuideBreadcrumb
          locale="nl"
          items={[
            { name: "Voedselgids", href: "/nl/voedselgids" },
            { name: "Giftige Stoffen", href: "/nl/giftige-stoffen" },
          ]}
          currentPage="5-Fluorouracil Zalf voor Honden"
        />

        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Is 5-Fluorouracil Zalf Giftig voor Honden?
        </h1>

        {/* TL;DR Verdict Box */}
        <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-xl font-bold text-red-900 mb-2">
                Extreem hoog risico - zeer gevaarlijk
              </h3>
              <p className="text-red-800 font-semibold">
                <strong>5-Fluorouracil (Efudix) is extreem gevaarlijk voor honden.</strong> Zelfs zeer kleine hoeveelheden kunnen ernstige gezondheidsproblemen veroorzaken. Contact via huid of mond kan leiden tot stuipen, beenmergproblemen en orgaanschade. De prognose is vaak slecht. Neem bij enig contact onmiddellijk contact op met je dierenarts - snelle actie is essentieel.
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Warning */}
        <div className="bg-red-600 text-white p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-3">Noodprotocol - wat te doen</h2>
          <p className="text-lg mb-3">
            Als je hond 5-Fluorouracil zalf heeft aangeraakt of gegeten:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-lg">
            <li><strong>Neem onmiddellijk contact op met je dierenarts of dierennoodlijn</strong></li>
            <li><strong>Was het contactgebied met water en zeep (draag handschoenen!)</strong></li>
            <li><strong>Ga direct naar de dichtstbijzijnde dierenarts</strong></li>
            <li><strong>Neem de verpakking mee</strong></li>
            <li><strong>Bereid je voor op intensive care opname</strong></li>
          </ol>
          <p className="text-lg mt-3 font-bold">
            Snelle actie is essentieel - dit is een ernstige noodsituatie
          </p>
        </div>

        {/* Main Content */}
        <div className="prose prose-emerald max-w-none">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Waarom is 5-Fluorouracil Zo Extreem Gevaarlijk?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            5-Fluorouracil (ook wel 5-FU genoemd) is een chemotherapiemedicijn dat bij mensen wordt gebruikt voor behandeling van verschillende soorten kanker en huidaandoeningen. In zalvorm (merknamen: Efudix, Actikerall) wordt het toegepast op de huid voor behandeling van actinische keratose en oppervlakkige basaalcelcarcinomen.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Voor honden is 5-Fluorouracil extreem gevaarlijk. De hoge toxiciteit komt door meerdere factoren:
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Metabolisme verschil:</strong> Mensen kunnen 5-Fluorouracil relatief snel afbreken via een enzym genaamd dihydropyrimidine dehydrogenase (DPD). Honden hebben dit enzym niet of in veel lagere concentraties. Dit betekent dat 5-FU veel langer in het lichaam van een hond blijft en cumulatieve schade veroorzaakt.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Werkingsmechanisme:</strong> 5-Fluorouracil remt de DNA-synthese en doodt snel delende cellen. Bij honden betekent dit dat cellen in het beenmerg (bloedcelproductie), maag-darmstelsel, en zenuwstelsel massaal afsterven. Dit leidt tot beenmergdepressie (geen aanmaak van bloedcellen), ernstige gastro-intestinale schade, en neurotoxiciteit.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Opname via huid:</strong> Honden kunnen 5-FU opnemen door simpelweg een behandeld huidgebied van hun eigenaar te likken, of door contact met gebruikte tubes, gaasjes of afval. De zalf wordt snel opgenomen via slijmvliezen (mond, neus) maar ook via de huid.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Zeer lage toxische drempel:</strong> Zelfs zeer kleine hoeveelheden kunnen ernstige gezondheidsproblemen veroorzaken. Honden zijn bijzonder gevoelig voor dit medicijn vanwege hun metabolisme.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            De combinatie van deze factoren maakt 5-Fluorouracil extreem gevaarlijk voor honden. Zelfs met veterinaire behandeling is de prognose vaak ongunstig.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Symptomen van 5-Fluorouracil Vergiftiging
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Symptomen ontwikkelen zich snel en zijn vaak catastrofaal. De tijdlijn varieert van 30 minuten tot enkele uren na blootstelling:
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Vroege symptomen (30 minuten - 4 uur):</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Braken (vaak heftig en aanhoudend)</li>
              <li>Diarree (kan snel bloederig worden)</li>
              <li>Extreme sufheid en zwakte</li>
              <li>Hyperactiviteit of extreme onrust (paradoxaal)</li>
              <li>Trillen of spiertrekkingen</li>
              <li>Kwijlen of schuimen uit de bek</li>
              <li>Buikpijn (gespannen buik, kreunend geluid)</li>
              <li>Verminderde of geen eetlust</li>
            </ul>
          </div>

          <div className="bg-red-50 p-6 rounded-lg mb-6 border-l-4 border-red-600">
            <h3 className="text-xl font-semibold text-red-900 mb-3">Ernstige symptomen (4-24 uur, vaak fataal):</h3>
            <ul className="list-disc pl-6 space-y-2 text-red-800">
              <li><strong>Neurologische crisis:</strong> Stuipen, toevallen (vaak meerdere en oncontroleerbaar)</li>
              <li><strong>Beenmergfalen:</strong> Ernstige bloedingsneiging (bloedneus, bloedend tandvlees, bloedvlekken op huid)</li>
              <li><strong>Gastro-intestinale catastrofe:</strong> Bloedig braken, ernstige bloedige diarree</li>
              <li><strong>Shock:</strong> Extreem bleke of blauwe tandvlezen, koude poten, zwakke pols</li>
              <li><strong>Hartritmestoornissen:</strong> Onregelmatige of zeer snelle hartslag</li>
              <li><strong>Hypothermie:</strong> Lage lichaamstemperatuur (koud aanvoelen)</li>
              <li><strong>Bewustzijnsverlies:</strong> Coma, niet meer reageren op prikkels</li>
              <li><strong>Ademhalingsproblemen:</strong> Zeer oppervlakkige ademhaling of stoppen met ademhalen</li>
              <li><strong>Multiorgaanfalen:</strong> Nieren, lever, beenmerg falen tegelijk</li>
            </ul>
          </div>

          <div className="bg-red-100 p-6 rounded-lg mb-6 border-2 border-red-600">
            <h3 className="text-xl font-semibold text-red-900 mb-3">Late fase (24-72 uur, vaak dodelijk zonder intensive care):</h3>
            <ul className="list-disc pl-6 space-y-2 text-red-900">
              <li>Panleukopenie (complete afwezigheid van witte bloedcellen, geen immuunsysteem)</li>
              <li>Trombocytopenie (geen bloedplaatjes, onstuitbare bloedingen)</li>
              <li>Septische shock (bacteriële infectie door geen afweer)</li>
              <li>Nierfalen (geen urineproductie)</li>
              <li>Leverfalen (geelzucht, coma)</li>
              <li>Overlijden binnen 12-72 uur in de meeste gevallen</li>
            </ul>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Kritieke waarschuwing:</strong> Zelfs honden die de eerste 72 uur overleven, kunnen nog steeds overlijden aan late complicaties zoals sepsis (bloedvergiftiging) door beenmergfalen. Intensieve monitoring en behandeling zijn noodzakelijk voor minimaal 7-10 dagen.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Wat Te Doen Bij Blootstelling - NOODPROTOCOL
          </h2>
          <div className="bg-emerald-50 p-6 rounded-lg mb-6 border-l-4 border-emerald-600">
            <h3 className="text-xl font-semibold text-emerald-900 mb-3">KRITIEK ACTIEPLAN - elke seconde telt:</h3>
            <ol className="list-decimal pl-6 space-y-4 text-gray-700">
              <li className="font-semibold">
                <strong className="text-red-600">Neem onmiddellijk contact op met je dierenarts of dierennoodlijn.</strong> Geef duidelijk aan: "Mijn hond heeft mogelijk 5-Fluorouracil aangeraakt - dit is een ernstige noodsituatie."
              </li>
              <li>
                <strong>Was het contactgebied VOORZICHTIG.</strong> Draag handschoenen (5-FU is ook gevaarlijk voor mensen!). Spoel met ruim lauw water en milde zeep gedurende 10-15 minuten. Vermijd schrobben wat opname kan versnellen.
              </li>
              <li>
                <strong>Ga direct naar de dichtstbijzijnde dierenarts of noodkliniek.</strong> Snelle actie is essentieel. Bel onderweg als je niet al hebt gebeld.
              </li>
              <li>
                <strong>Neem de verpakking mee.</strong> De dierenarts moet weten: exacte productnaam (Efudix, Actikerall), sterkte (percentage 5-FU, meestal 5%), en geschatte hoeveelheid contact.
              </li>
              <li>
                <strong>Probeer NIET zelf braken op te wekken.</strong> Dit kan de situatie verergeren door herhaald contact met giftige inhoud. Laat dit over aan de dierenarts die kan beslissen of dit veilig is.
              </li>
              <li>
                <strong>Houd je hond rustig en warm.</strong> Dek hem toe met een deken tijdens transport. Voorkom dat hij zich beweegt of agiteren wat opname kan versnellen.
              </li>
              <li>
                <strong>Bereid je voor op intensive care opname.</strong> Je hond zal waarschijnlijk opgenomen worden voor behandeling met onder andere infusen, anti-convulsiva, antibiotica en ondersteunende zorg.
              </li>
              <li>
                <strong>Bespreek de prognose met je dierenarts.</strong> 5-FU vergiftiging vereist intensieve veterinaire zorg. De dierenarts kan je informeren over de verwachte uitkomst en behandelingsmogelijkheden.
              </li>
            </ol>
          </div>

          <div className="bg-red-50 p-6 rounded-lg mb-6 border-l-4 border-red-500">
            <h3 className="text-xl font-semibold text-red-900 mb-3">WAT NIET TE DOEN:</h3>
            <ul className="list-disc pl-6 space-y-2 text-red-800">
              <li>Wacht NOOIT af om te zien of symptomen zich ontwikkelen - dat is te laat</li>
              <li>Geef GEEN huismiddeltjes zoals melk, brood of actieve kool (alleen dierenarts)</li>
              <li>Probeer NIET zelf braken op te wekken met zout of waterstofperoxide</li>
              <li>Raak de zalf NIET aan zonder handschoenen - het is ook gevaarlijk voor mensen</li>
              <li>Onderschat de ernst NIET - dit is een absolute noodsituatie</li>
            </ul>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Wanneer Contact Opnemen met de Dierenarts
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Bij 5-Fluorouracil: <strong className="text-red-600">neem altijd onmiddellijk contact op met je dierenarts.</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>Je vermoedt dat je hond een behandeld huidgebied heeft gelikt</li>
            <li>Je hond heeft contact gehad met een tube Efudix/Actikerall</li>
            <li>Je hond heeft een gaasje of verband met 5-FU zalf aangeraakt</li>
            <li>Je hebt een lege tube of verpakking in de buurt van je hond gevonden</li>
            <li>Je hond vertoont een of meer van de bovengenoemde symptomen</li>
            <li>Er is ENIGE mogelijkheid van contact - zelfs als je niet zeker weet</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
            Dit vereist onmiddellijke professionele veterinaire zorg. Snelle actie verbetert de prognose aanzienlijk.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Extreme Preventietips
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Als je of iemand in je huishouden 5-Fluorouracil zalf gebruikt, zijn extreme voorzorgsmaatregelen noodzakelijk:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-4">
            <li><strong>Isoleer je hond tijdens behandeling:</strong> Honden mogen GEEN toegang hebben tot kamers waar de zalf wordt toegepast of opgeslagen</li>
            <li><strong>Was handen grondig:</strong> Was handen minstens 2 keer met zeep na aanraken van de zalf, zelfs met handschoenen</li>
            <li><strong>Bedek behandelde huid volledig:</strong> Gebruik waterdichte verbanden en bedek met kleding. Honden mogen behandelde gebieden NOOIT kunnen likken</li>
            <li><strong>Bewaar in afgesloten metalen medicijnkist:</strong> Niet alleen in een kastje - gebruik een afgesloten kist waar honden absoluut niet bij kunnen</li>
            <li><strong>Gooi afval veilig weg:</strong> Gebruikte gaasjes, tubes, en verbanden ONMIDDELLIJK in een afgesloten plastic zak, in een buitencontainer waar honden niet bij kunnen</li>
            <li><strong>Was kleding apart:</strong> Kleding die in contact is geweest met de zalf apart wassen op hoge temperatuur</li>
            <li><strong>Reinig oppervlakken:</strong> Als de zalf op meubels, vloeren of andere oppervlakken komt, reinig grondig met water en zeep (draag handschoenen)</li>
            <li><strong>Waarschuw alle huisgenoten:</strong> Iedereen moet het extreme gevaar begrijpen en extreem voorzichtig zijn</li>
            <li><strong>Overweeg tijdelijke herhuisvesting:</strong> Bij langdurige behandeling, overweeg je hond tijdelijk bij familie/vrienden te laten verblijven</li>
            <li><strong>Programmeer noodnummers:</strong> Zorg dat je dierenarts en 24/7 dierennoodlijn geprogrammeerd staan in je telefoon</li>
            <li><strong>Houd waterstofperoxide in huis:</strong> Alleen op instructie van dierenarts te gebruiken, maar kan essentieel zijn in noodsituaties</li>
            <li><strong>Overweeg een alternatieve behandeling:</strong> Bespreek met je arts of er alternatieven zijn voor 5-FU als je honden in huis hebt</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Veelgestelde Vragen
          </h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Waarom is 5-Fluorouracil zo dodelijk voor honden?
              </h3>
              <p className="text-gray-700">
                5-Fluorouracil (5-FU) is een chemotherapiemedicijn dat snel delende cellen beïnvloedt. Bij honden heeft dit een zeer hoge toxiciteit - het kan cellen in het beenmerg, maag-darmstelsel en zenuwstelsel beschadigen. Honden kunnen dit medicijn niet metaboliseren zoals mensen. Zelfs zeer kleine hoeveelheden kunnen ernstige gezondheidsproblemen veroorzaken.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Hoe snel werkt 5-Fluorouracil vergiftiging bij honden?
              </h3>
              <p className="text-gray-700">
                Symptomen kunnen binnen enkele uren optreden na contact. Ernstige neurologische symptomen zoals stuipen kunnen zich snel ontwikkelen. Zonder snelle veterinaire behandeling is de prognose vaak ongunstig. Onmiddellijke veterinaire zorg is essentieel.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Kan mijn hond overleven na 5-Fluorouracil contact?
              </h3>
              <p className="text-gray-700">
                De prognose is vaak ongunstig. Zelfs met veterinaire behandeling kunnen ernstige complicaties optreden. De uitkomst hangt af van de hoeveelheid blootstelling en hoe snel behandeling wordt gestart. Honden die overleven, kunnen nog complicaties ontwikkelen. Dit vereist intensieve veterinaire zorg.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Wat moet ik ONMIDDELLIJK doen als mijn hond 5-FU zalf heeft aangeraakt?
              </h3>
              <p className="text-gray-700">
                Neem onmiddellijk contact op met je dierenarts - dit is een ernstige noodsituatie. Was voorzichtig het contactgebied met ruim water en zeep (draag handschoenen!). Ga direct naar de dichtstbijzijnde dierennoodkliniek. Neem de verpakking mee. Bereid je voor op intensive care opname. Snelle actie is essentieel.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Waar wordt 5-Fluorouracil zalf voor gebruikt bij mensen?
              </h3>
              <p className="text-gray-700">
                5-Fluorouracil zalf (merknamen: Efudix, Actikerall) wordt gebruikt voor behandeling van huidkanker en voorstadia daarvan (actinische keratose, basaalcelcarcinoom). Het wordt ook soms gebruikt voor wratten. De zalf wordt op de huid gesmeerd en blijft daar enkele weken. Voor honden is dit medicijn absoluut verboden en dodelijk gevaarlijk.
              </p>
            </div>
          </div>

          {/* Medical Disclaimer */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mt-8">
            <h3 className="text-lg font-semibold text-amber-900 mb-2">Medische Disclaimer</h3>
            <p className="text-amber-800 text-sm">
              Deze informatie is bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies. 5-Fluorouracil vergiftiging is een ernstige noodsituatie. Bij enig vermoeden van contact, neem onmiddellijk contact op met je dierenarts of dierennoodlijn. Snelle veterinaire zorg is essentieel.
            </p>
          </div>

          {/* Related Links */}
          <div className="mt-8 p-6 bg-emerald-50 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Gerelateerde Artikelen
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/nl/is-chocolade-giftig-voor-honden"
                  className="text-emerald-600 hover:text-emerald-700 hover:underline"
                >
                  Is Chocolade Giftig voor Honden?
                </Link>
              </li>
              <li>
                <Link
                  href="/nl/is-batterijen-giftig-voor-honden"
                  className="text-emerald-600 hover:text-emerald-700 hover:underline"
                >
                  Is Batterijen Giftig voor Honden?
                </Link>
              </li>
              <li>
                <Link
                  href="/nl/giftige-stoffen"
                  className="text-emerald-600 hover:text-emerald-700 hover:underline"
                >
                  Giftige Stoffen voor Honden
                </Link>
              </li>
            </ul>
          </div>

          {/* Safe Food Alternatives */}
          <RelatedSafeFoods
            locale="nl"
            animal="honden"
            foods={commonSafeFoods}
            title="Veilige snack alternatieven"
          />
        </div>
      </article>
    </>
  );
}
