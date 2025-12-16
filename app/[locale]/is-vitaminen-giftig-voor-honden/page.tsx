import { Metadata } from 'next';
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: 'Zijn Vitaminen Giftig voor Honden? | Vitamine D & IJzer Toxiciteit',
  description: 'Vitaminesupplementen kunnen giftig zijn voor honden, vooral vitamine D en ijzer. Leer welke vitaminen gevaarlijk zijn, symptomen en behandeling.',
  keywords: 'vitaminen honden giftig, vitamine D toxisch, ijzer vergiftiging honden, multivitaminen gevaarlijk, supplementen honden',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Zijn Vitaminen Giftig voor Honden?',
    description: 'Vitaminesupplementen, vooral vitamine D en ijzer, kunnen giftig zijn voor honden. Leer symptomen herkennen en wat te doen.',
    type: 'article',
    locale: 'nl_NL',
  },
};

export default function IsVitaminenGiftigVoorHonden() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Zijn Vitaminen Giftig voor Honden?',
    description: 'Uitgebreide informatie over de toxiciteit van vitaminesupplementen voor honden, inclusief vitamine D en ijzer vergiftiging.',
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
        name: 'Welke vitaminen zijn het gevaarlijkst voor honden?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Vitamine D en ijzer zijn het gevaarlijkst voor honden. Vitamine D kan nierfalen en orgaanschade veroorzaken, terwijl ijzer leverschade en maag-darmbloedingen kan veroorzaken. Ook vitamine A in hoge doses kan toxisch zijn. Wateropeenkombare vitaminen zoals B en C zijn over het algemeen veiliger omdat overmaat via urine wordt uitgescheiden.',
        },
      },
      {
        '@type': 'Question',
        name: 'Kan mijn hond ziek worden van mijn multivitaminen?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, vooral als de multivitamine ijzer of hoge doses vitamine D bevat. Zwangerschapsvitaminen zijn bijzonder gevaarlijk omdat ze veel ijzer bevatten. Zelfs normale multivitaminen kunnen bij kleine honden vergiftigingsverschijnselen veroorzaken als ze meerdere pillen innemen. Bewaar vitaminen altijd buiten bereik van honden.',
        },
      },
      {
        '@type': 'Question',
        name: 'Hoe snel worden symptomen zichtbaar na vitamine-inname?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Dit hangt af van het type vitamine. IJzervergiftiging toont vaak binnen 2-6 uur symptomen zoals braken en diarree. Vitamine D vergiftiging kan 12-48 uur duren voordat symptomen optreden, en nierschade kan zich pas na dagen ontwikkelen. Bij vermoeden van inname, wacht niet op symptomen maar neem direct contact op met je dierenarts.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is het veilig om mijn hond vitamine D supplementen te geven?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Geef je hond NOOIT menselijke vitamine D supplementen. Deze bevatten veel te hoge doses voor honden en kunnen ernstige nierschade veroorzaken. Alleen speciale hondenvoeding en door dierenartsen voorgeschreven supplementen in exacte doseringen zijn veilig. Menselijke supplementen zijn ontworpen voor mensen en kunnen voor honden dodelijk zijn.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wat moet ik doen als mijn hond vitaminen heeft gegeten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Neem onmiddellijk contact op met je dierenarts. Houd de verpakking bij de hand om te zien welke vitaminen en hoeveel erin zaten. Vertel de dierenarts hoeveel pillen je hond mogelijk heeft ingenomen. Probeer niet zelf braken op te wekken - dit kan gevaarlijk zijn bij bepaalde vitaminesoorten. Snelle actie verhoogt de kans op volledig herstel aanzienlijk.',
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
          currentPage="Vitaminen voor Honden"
        />

        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Zijn Vitaminen Giftig voor Honden?
        </h1>

        {/* TL;DR Verdict Box */}
        <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-orange-800 mb-2">
                Matig tot Hoog Risico - Afhankelijk van Type
              </h3>
              <p className="text-orange-700">
                <strong>Vitaminen kunnen gevaarlijk zijn voor honden, vooral vitamine D en ijzer.</strong> Terwijl wateropeenkombare vitaminen (B, C) relatief veilig zijn, kunnen vetoplosbare vitaminen (D, A) en mineralen zoals ijzer ernstige vergiftiging veroorzaken. Zwangerschapsvitaminen zijn bijzonder gevaarlijk door hun hoge ijzergehalte. Bij inname: neem contact op met je dierenarts.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="prose prose-emerald max-w-none">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Waarom Kunnen Vitaminen Gevaarlijk Zijn voor Honden?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Veel mensen denken dat vitaminen natuurlijk en veilig zijn, maar voor honden kunnen menselijke vitaminesupplementen gevaarlijk of zelfs dodelijk zijn. Het probleem ligt in de dosering en het type vitamine. Wat voor een volwassen mens een gezonde dagelijkse dosis is, kan voor een hond een ernstige overdosis betekenen.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Vitaminen worden onderverdeeld in twee categorieën met verschillende risico's:
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Wateropeenkombare vitaminen</strong> (vitamine B-complex en vitamine C) zijn over het algemeen minder gevaarlijk omdat overmaat via de urine wordt uitgescheiden. Toch kunnen zeer hoge doses maagproblemen, diarree en in extreme gevallen neurologische symptomen veroorzaken. Deze vitaminen worden meestal goed verdragen, maar zijn niet zonder risico.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Vetoplosbare vitaminen</strong> (A, D, E, K) worden opgeslagen in het lichaamsvet en de lever, en kunnen zich ophopen tot toxische niveaus. Van deze is <strong>vitamine D</strong> het gevaarlijkst voor honden. Vitamine D reguleert calcium- en fosforspiegels in het bloed. Te veel vitamine D veroorzaakt hyperkalciëmie (te veel calcium in het bloed), wat leidt tot nierfalen, hartritmestoornissen, maagdarmproblemen en mineralisatie van zachte weefsels.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Menselijke vitamine D supplementen bevatten vaak 1000-5000 IU per pil, terwijl honden slechts kleine hoeveelheden nodig hebben via hun voeding. Zelfs één vitamine D pil kan bij kleine honden levensbedreigende vergiftiging veroorzaken. De symptomen ontwikkelen zich vaak langzaam over 12-48 uur, maar de schade kan permanent zijn.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>IJzer</strong> is technisch gezien een mineraal maar zit in veel multivitaminen, vooral zwangerschapsvitaminen. IJzer is extreem giftig voor honden. Het veroorzaakt ernstige maag-darmbloedingen, leverschade en mogelijk orgaanfalen. Zwangerschapsvitaminen bevatten vaak 50-65 mg ijzer per pil - een kleine hond kan al symptomen vertonen bij 20-30 mg. Dit maakt zwangerschapsvitaminen tot een van de gevaarlijkste soorten supplementen voor honden.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Vitamine A</strong> kan in hoge doses levertoxiciteit veroorzaken, botproblemen en hypervitaminose A. Dit komt minder vaak voor dan vitamine D of ijzervergiftiging, maar kan wel bij chronische blootstelling aan hoge doses.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Het gevaar wordt vergroot doordat veel vitaminen een zoete coating hebben of als kauwbare tabletten verkrijgbaar zijn. Honden vinden deze vaak lekker en kunnen, als ze de kans krijgen, een hele fles leegeten.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Symptomen van Vitaminevergiftiging
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Symptomen variëren afhankelijk van het type vitamine of mineraal dat is ingenomen:
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">IJzervergiftiging (2-6 uur na inname):</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Braken (soms met bloed of donkerbruin materiaal)</li>
              <li>Bloedige diarree of zwarte ontlasting</li>
              <li>Buikpijn, gespannen buik</li>
              <li>Sufheid en zwakte</li>
              <li>Bleke tandvlezen</li>
              <li>Snelle hartslag</li>
              <li>In ernstige gevallen: shock, orgaanfalen</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Vitamine D vergiftiging (12-48 uur na inname):</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Verhoogde dorst en plassen (vroeg teken)</li>
              <li>Verminderde eetlust</li>
              <li>Braken en diarree</li>
              <li>Zwakte en sufheid</li>
              <li>Trillen of spiertrekkingen</li>
              <li>Tandvleesveranderingen (kunnen te veel calcium bevatten)</li>
              <li>Na dagen: nierfalen symptomen (weinig of geen urine, braken, extreme zwakte)</li>
            </ul>
          </div>

          <div className="bg-red-50 p-6 rounded-lg mb-6 border-l-4 border-red-500">
            <h3 className="text-xl font-semibold text-red-900 mb-3">Ernstige symptomen (medisch noodgeval):</h3>
            <ul className="list-disc pl-6 space-y-2 text-red-800">
              <li>Bloedbraken of bloederige diarree</li>
              <li>Geen of zeer weinig urineproductie (nierfalen)</li>
              <li>Stuipen of toevallen</li>
              <li>Ineenstorten of bewusteloosheid</li>
              <li>Extreme zwakte, niet kunnen opstaan</li>
              <li>Onregelmatige hartslag</li>
              <li>Shock (koude poten, bleke tandvlezen, snelle ademhaling)</li>
            </ul>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            Let op: Vitamine D vergiftiging kan vertraagde symptomen hebben. Je hond kan de eerste 12-24 uur normaal lijken, maar daarna snel achteruitgaan. Dit maakt het cruciaal om niet af te wachten maar onmiddellijk contact op te nemen met je dierenarts bij vermoeden van inname.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Wat Te Doen Bij Vermoeden van Vergiftiging
          </h2>
          <div className="bg-emerald-50 p-6 rounded-lg mb-6 border-l-4 border-emerald-500">
            <h3 className="text-xl font-semibold text-emerald-900 mb-3">Actieplan bij vitamine-inname:</h3>
            <ol className="list-decimal pl-6 space-y-3 text-gray-700">
              <li>
                <strong>Neem onmiddellijk contact op met je dierenarts.</strong> Wacht niet tot symptomen optreden, vooral niet bij vitamine D of ijzer. Snelle veterinaire behandeling verbetert de prognose aanzienlijk.
              </li>
              <li>
                <strong>Verzamel informatie.</strong> Houd de vitamineverpakking bij de hand. Let op: welke vitaminen/mineralen, hoeveel mg per pil, hoeveel pillen mogelijk ingenomen, en hoe lang geleden.
              </li>
              <li>
                <strong>Let speciaal op ijzer en vitamine D.</strong> Vertel de dierenarts of de vitaminen ijzer bevatten (check het etiket) en hoeveel mg ijzer per pil. Dit is cruciaal voor de behandeling.
              </li>
              <li>
                <strong>Probeer NIET zelf braken op te wekken.</strong> Bij ijzervergiftiging kan dit de maagwand verder beschadigen. Laat dit over aan de dierenarts die dit veilig kan doen als het nodig is.
              </li>
              <li>
                <strong>Houd je hond rustig.</strong> Voorkom rennen of spelen, wat de opname van vitaminen in de bloedbaan kan versnellen.
              </li>
              <li>
                <strong>Observeer nauwkeurig.</strong> Let op braken, diarree, veranderingen in drinkgedrag, zwakte of andere symptomen. Deel deze informatie met de dierenarts.
              </li>
              <li>
                <strong>Volg veterinaire instructies op.</strong> De dierenarts kan je vragen om direct te komen of eerst bepaalde stappen thuis te nemen. Volg hun advies nauwkeurig op.
              </li>
              <li>
                <strong>Bereid je voor op bloedonderzoek.</strong> Bij vitamine D of ijzer zal de dierenarts waarschijnlijk bloedonderzoek willen doen om de ernst te bepalen en behandeling te monitoren.
              </li>
            </ol>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Wanneer Contact Opnemen met de Dierenarts
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Bij vitaminevergiftiging hangt de urgentie af van het type vitamine:
          </p>
          <div className="bg-red-100 p-4 rounded-lg mb-4">
            <p className="text-red-900 font-semibold mb-2">ONMIDDELLIJK contact bij:</p>
            <ul className="list-disc pl-6 space-y-1 text-red-800">
              <li>Inname van vitamine D supplementen (hoge dosis)</li>
              <li>Inname van ijzerhoudende vitaminen, vooral zwangerschapsvitaminen</li>
              <li>Je hond heeft meerdere vitaminepillen gegeten</li>
              <li>Symptomen van bloedverlies (bloedig braken, donkere ontlasting)</li>
              <li>Extreme dorst en plassen (teken van vitamine D vergiftiging)</li>
            </ul>
          </div>
          <div className="bg-orange-100 p-4 rounded-lg mb-4">
            <p className="text-orange-900 font-semibold mb-2">Snel contact binnen 2-4 uur bij:</p>
            <ul className="list-disc pl-6 space-y-1 text-orange-800">
              <li>Inname van multivitaminen zonder ijzer</li>
              <li>Inname van B-complex of vitamine C</li>
              <li>Lichte symptomen zoals braken of diarree</li>
              <li>Je bent onzeker over wat je hond heeft ingenomen</li>
            </ul>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            Bij twijfel, neem altijd contact op met je dierenarts. Op basis van gewicht, type vitamine en hoeveelheid kan worden bepaald of behandeling nodig is. Bij onzekerheid is het beter om contact op te nemen voor professioneel advies.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Preventietips
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Voorkom vitaminevergiftiging met deze praktische maatregelen:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>Bewaar alle vitaminen en supplementen in een hoog, afgesloten kastje waar je hond niet bij kan</li>
            <li>Gebruik kinderveilige flessen, maar vertrouw daar niet volledig op - sommige honden kunnen deze openbreken</li>
            <li>Berg zwangerschapsvitaminen extra veilig op - deze zijn bijzonder gevaarlijk door hun hoge ijzergehalte</li>
            <li>Neem vitaminen nooit in het bijzijn van je hond - gevallen pillen worden snel opgegeten</li>
            <li>Als je een vitamine laat vallen, zoek deze onmiddellijk en grondig</li>
            <li>Bewaar vitaminen niet op nachtkastjes, keukentafels of andere toegankelijke plekken</li>
            <li>Gooi lege verpakkingen direct weg - zelfs restjes poeder of tabletten kunnen gevaarlijk zijn</li>
            <li>Geef je hond NOOIT menselijke vitaminen, zelfs niet in "kleine" doses</li>
            <li>Als je hond supplementen nodig heeft, gebruik dan alleen veterinaire producten in voorgeschreven doseringen</li>
            <li>Waarschuw gasten en oppassen om vitaminen veilig op te bergen</li>
            <li>Let extra op bij kinderen die kauwbare vitaminen gebruiken - deze zijn aantrekkelijk voor honden</li>
            <li>Controleer regelmatig of vitaminepotten goed gesloten zijn</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Veelgestelde Vragen
          </h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Welke vitaminen zijn het gevaarlijkst voor honden?
              </h3>
              <p className="text-gray-700">
                Vitamine D en ijzer zijn het gevaarlijkst voor honden. Vitamine D kan nierfalen en orgaanschade veroorzaken, terwijl ijzer leverschade en maag-darmbloedingen kan veroorzaken. Ook vitamine A in hoge doses kan toxisch zijn. Wateropeenkombare vitaminen zoals B en C zijn over het algemeen veiliger omdat overmaat via urine wordt uitgescheiden.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Kan mijn hond ziek worden van mijn multivitaminen?
              </h3>
              <p className="text-gray-700">
                Ja, vooral als de multivitamine ijzer of hoge doses vitamine D bevat. Zwangerschapsvitaminen zijn bijzonder gevaarlijk omdat ze veel ijzer bevatten. Zelfs normale multivitaminen kunnen bij kleine honden vergiftigingsverschijnselen veroorzaken als ze meerdere pillen innemen. Bewaar vitaminen altijd buiten bereik van honden.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Hoe snel worden symptomen zichtbaar na vitamine-inname?
              </h3>
              <p className="text-gray-700">
                Dit hangt af van het type vitamine. IJzervergiftiging toont vaak binnen 2-6 uur symptomen zoals braken en diarree. Vitamine D vergiftiging kan 12-48 uur duren voordat symptomen optreden, en nierschade kan zich pas na dagen ontwikkelen. Bij vermoeden van inname, wacht niet op symptomen maar neem direct contact op met je dierenarts.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is het veilig om mijn hond vitamine D supplementen te geven?
              </h3>
              <p className="text-gray-700">
                Geef je hond NOOIT menselijke vitamine D supplementen. Deze bevatten veel te hoge doses voor honden en kunnen ernstige nierschade veroorzaken. Alleen speciale hondenvoeding en door dierenartsen voorgeschreven supplementen in exacte doseringen zijn veilig. Menselijke supplementen zijn ontworpen voor mensen en kunnen voor honden dodelijk zijn.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Wat moet ik doen als mijn hond vitaminen heeft gegeten?
              </h3>
              <p className="text-gray-700">
                Neem onmiddellijk contact op met je dierenarts. Houd de verpakking bij de hand om te zien welke vitaminen en hoeveel erin zaten. Vertel de dierenarts hoeveel pillen je hond mogelijk heeft ingenomen. Probeer niet zelf braken op te wekken - dit kan gevaarlijk zijn bij bepaalde vitaminesoorten. Snelle actie verhoogt de kans op volledig herstel aanzienlijk.
              </p>
            </div>
          </div>

          {/* Safe Food Alternatives */}
          <RelatedSafeFoods
            locale="nl"
            animal="honden"
            foods={commonSafeFoods}
            title="Veilige snack alternatieven"
          />

          {/* Medical Disclaimer */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mt-8">
            <h3 className="text-lg font-semibold text-amber-900 mb-2">Medische Disclaimer</h3>
            <p className="text-amber-800 text-sm">
              Deze informatie is bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies. Bij vermoeden van vitaminevergiftiging of gezondheidsproblemen bij je hond, neem altijd contact op met je dierenarts. Geef je hond nooit menselijke vitaminen of supplementen zonder veterinair advies.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
