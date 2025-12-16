import type { Metadata } from 'next';
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: 'Zijn Druiven Giftig voor Honden? Acuut Nierfalen Risico | CutiePawsPedia',
  description: 'Druiven zijn zeer giftig voor honden en kunnen acute nierschade veroorzaken. Leer de symptomen, wat je moet doen bij inname en hoe je je hond beschermt.',
  keywords: 'druiven giftig honden, hond druiven gegeten, druivenvergiftiging, nierfalen hond',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Zijn Druiven Giftig voor Honden? Acuut Nierfalen Risico',
    description: 'Druiven zijn zeer giftig voor honden en kunnen acute nierschade veroorzaken. Ontdek de symptomen en noodmaatregelen.',
    type: 'article',
    locale: 'nl_NL',
  },
};

export default function IsDruivenGiftigVoorHondenPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'Zijn Druiven Giftig voor Honden?',
        description: 'Uitgebreide gids over druivenvergiftiging bij honden, het risico op nierfalen en noodmaatregelen.',
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
            name: 'Waarom zijn druiven giftig voor honden?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'De exacte giftige stof in druiven is nog niet geïdentificeerd, maar druiven kunnen acuut nierfalen veroorzaken bij honden. Zelfs kleine hoeveelheden kunnen ernstige nierschade veroorzaken die tot blijvende gezondheidsproblemen of overlijden kan leiden.',
            },
          },
          {
            '@type': 'Question',
            name: 'Zijn alle druiven gevaarlijk?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja, alle soorten druiven zijn gevaarlijk: rode, groene, met of zonder pitten, biologisch of conventioneel. Ook producten met druiven zoals druivensap of wijn zijn giftig voor honden.',
            },
          },
          {
            '@type': 'Question',
            name: 'Hoeveel druiven zijn dodelijk?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Er is geen veilige hoeveelheid bekend. Sommige honden krijgen nierschade na slechts enkele druiven, terwijl andere honden grotere hoeveelheden lijken te verdragen. Omdat de reactie onvoorspelbaar is, moet elke inname als medisch noodgeval worden behandeld.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wat zijn de symptomen van druivenvergiftiging?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Vroege symptomen zijn braken, diarree, lethargie en verminderde eetlust binnen 12-24 uur. Tekenen van nierschade zoals verminderde of geen urine, buikpijn en uitdroging volgen binnen 24-72 uur.',
            },
          },
          {
            '@type': 'Question',
            name: 'Kan mijn hond herstellen van druivenvergiftiging?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Met vroege behandeling kunnen veel honden volledig herstellen. Zonder behandeling of bij ernstige nierschade kan druivenvergiftiging dodelijk zijn. Snelle actie binnen de eerste uren na inname is cruciaal.',
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
            currentPage="Druiven voor Honden"
          />

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Zijn Druiven Giftig voor Honden?
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
              <h3 className="text-lg font-semibold text-red-900 mb-2">Toxiciteit: HOOG - Zeer Gevaarlijk</h3>
              <p className="text-red-800">
                <strong>Ja, druiven zijn zeer giftig voor honden.</strong> Druiven kunnen acuut nierfalen veroorzaken, wat levensbedreigend is. Zelfs kleine hoeveelheden kunnen ernstige nierschade veroorzaken. De exacte giftige stof is nog onbekend, maar de gevolgen zijn goed gedocumenteerd. Neem onmiddellijk contact op met je dierenarts als je hond druiven heeft gegeten.
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-8">
          <p className="text-xl text-gray-700 leading-relaxed">
            Druiven behoren tot de gevaarlijkste voedingsmiddelen voor honden, omdat ze acuut nierfalen kunnen veroorzaken. Wat het extra verraderlijk maakt, is dat wetenschappers nog steeds niet precies weten welke stof in druiven de toxiciteit veroorzaakt. Sommige honden krijgen ernstige vergiftigingsverschijnselen na slechts een paar druiven, terwijl andere grotere hoeveelheden lijken te verdragen. Deze onvoorspelbaarheid maakt elke inname van druiven een medisch noodgeval. Dit artikel legt uit waarom druiven zo gevaarlijk zijn, welke symptomen wijzen op nierschade en wat je direct moet doen.
          </p>
        </div>

        {/* Why Dangerous Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-emerald-500 pb-2">
            Waarom zijn Druiven Gevaarlijk voor Honden?
          </h2>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Mysterieuze Toxiciteit</h3>
            <p className="text-gray-700 mb-4">
              Ondanks jarenlang onderzoek is de exacte giftige stof in druiven nog niet geïdentificeerd. Verschillende theorieën zijn onderzocht, waaronder pesticiden, schimmels, salicylaten en natuurlijke chemicaliën in de druif zelf, maar geen enkele heeft de toxiciteit volledig verklaard.
            </p>
            <p className="text-gray-700">
              Recent onderzoek (2021) suggereert dat wijnsteenzuur en kaliumbitartraat mogelijk verantwoordelijk zijn voor de nefrotoxiciteit (niergifte), maar definitief bewijs ontbreekt nog. Wat we wel weten is dat druiven acuut nierfalen kunnen veroorzaken, en dat dit levensgevaarlijk is.
            </p>
          </div>

          <div className="bg-red-50 rounded-lg p-6 mb-6 border-l-4 border-red-500">
            <h3 className="text-xl font-semibold text-red-900 mb-3">Acuut Nierfalen: Het Grootste Gevaar</h3>
            <p className="text-red-800 mb-4">
              De meest ernstige complicatie van druivenvergiftiging is acuut nierfalen. Binnen 24-72 uur na inname kunnen de nieren van een hond ernstig beschadigd raken of volledig stoppen met functioneren.
            </p>
            <p className="text-red-800 mb-4">
              <strong>Hoe werkt het?</strong>
            </p>
            <ul className="space-y-2 text-red-800">
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-2">1.</span>
                <span>De giftige stof in druiven veroorzaakt directe schade aan de niertubuli (kleine buisjes in de nieren)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-2">2.</span>
                <span>Dit leidt tot necrose (afsterven) van niercellen</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-2">3.</span>
                <span>De nieren verliezen hun vermogen om afvalstoffen te filteren en urine te produceren</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-2">4.</span>
                <span>Toxische afvalstoffen stapelen zich op in het bloed (uremie)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-2">5.</span>
                <span>Zonder behandeling kan dit leiden tot coma en overlijden</span>
              </li>
            </ul>
          </div>

          <div className="bg-yellow-50 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-yellow-900 mb-3">Onvoorspelbare Reactie</h3>
            <p className="text-yellow-800 mb-4">
              Wat druivenvergiftiging extra gevaarlijk maakt, is de onvoorspelbaarheid:
            </p>
            <ul className="space-y-2 text-yellow-800">
              <li className="flex items-start">
                <span className="text-yellow-600 font-bold mr-2">•</span>
                <span><strong>Geen veilige hoeveelheid:</strong> Sommige honden krijgen nierschade na slechts 1-2 druiven</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 font-bold mr-2">•</span>
                <span><strong>Individuele gevoeligheid:</strong> Niet alle honden reageren hetzelfde, maar je kunt niet voorspellen hoe je hond reageert</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 font-bold mr-2">•</span>
                <span><strong>Alle druivensoorten:</strong> Rode, groene, biologische, conventionele - allemaal even gevaarlijk</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 font-bold mr-2">•</span>
                <span><strong>Verwerkte producten:</strong> Druivensap, wijn en producten met druiven zijn ook giftig</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
            <p className="text-emerald-900">
              <strong>Belangrijk:</strong> Omdat er geen veilige hoeveelheid bekend is en de reactie onvoorspelbaar, moet elke inname van druiven als medisch noodgeval worden behandeld, ongeacht de hoeveelheid.
            </p>
          </div>
        </section>

        {/* Symptoms Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-emerald-500 pb-2">
            Symptomen van Druivenvergiftiging
          </h2>

          <p className="text-gray-700 mb-6">
            Symptomen van druivenvergiftiging ontwikkelen zich in verschillende fasen. Vroege herkenning en behandeling zijn cruciaal voor een goede prognose.
          </p>

          <div className="space-y-6">
            <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-500">
              <h3 className="text-lg font-semibold text-yellow-900 mb-3">Fase 1: Vroege Symptomen (0-12 uur)</h3>
              <ul className="space-y-2 text-yellow-800">
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">▸</span>
                  <span>Braken (vaak binnen enkele uren)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">▸</span>
                  <span>Diarree (soms met stukjes druif zichtbaar)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">▸</span>
                  <span>Verminderde eetlust</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">▸</span>
                  <span>Lethargie en zwakte</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">▸</span>
                  <span>Buikpijn (gespannen buik, kreunend gedrag)</span>
                </li>
              </ul>
            </div>

            <div className="bg-orange-50 rounded-lg p-6 border-l-4 border-orange-500">
              <h3 className="text-lg font-semibold text-orange-900 mb-3">Fase 2: Ontwikkeling Nierschade (12-24 uur)</h3>
              <ul className="space-y-2 text-orange-800">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">▸</span>
                  <span>Verminderde urineproductie</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">▸</span>
                  <span>Uitdroging ondanks toegang tot water</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">▸</span>
                  <span>Verhoogde dorst (proberen te drinken maar lukt niet)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">▸</span>
                  <span>Toenemende zwakte en apathie</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">▸</span>
                  <span>Slechte adem (ureum geur)</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-500">
              <h3 className="text-lg font-semibold text-red-900 mb-3">Fase 3: Acuut Nierfalen (24-72 uur)</h3>
              <ul className="space-y-2 text-red-800">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">▸</span>
                  <span>Volledige anurie (geen urineproductie meer)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">▸</span>
                  <span>Ernstige lethargie tot bewusteloosheid</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">▸</span>
                  <span>Braken en diarree met bloed</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">▸</span>
                  <span>Trillingen en spierschokken</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">▸</span>
                  <span>Aanvallen (epileptische stuipen)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">▸</span>
                  <span>Coma en mogelijk overlijden</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">Let op</h3>
            <p className="text-purple-800">
              Niet alle honden doorlopen alle fasen. Sommige honden vertonen alleen milde symptomen, terwijl andere snel verslechteren. Wacht niet af tot ernstige symptomen optreden - neem bij elke inname van druiven direct contact op met je dierenarts.
            </p>
          </div>
        </section>

        {/* What To Do Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-emerald-500 pb-2">
            Wat Te Doen Als Je Hond Druiven Heeft Gegeten?
          </h2>

          <div className="bg-red-100 border-2 border-red-500 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-red-900 mb-3">⚠️ Direct actie vereist</h3>
            <p className="text-red-900 font-semibold">
              Druivenvergiftiging is een medisch noodgeval. Snelle actie is belangrijk bij het voorkomen van blijvende nierschade. Neem onmiddellijk contact op met je dierenarts, ook als je hond nog geen symptomen vertoont.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Stapsgewijs Actieplan:</h3>
            <ol className="space-y-4">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold mr-3">1</span>
                <div>
                  <strong className="text-gray-900">Bel onmiddellijk je dierenarts</strong>
                  <p className="text-gray-700 mt-1">Tijd is cruciaal. Neem direct contact op, ook buiten kantooruren. Vertel hoeveel druiven je hond ongeveer heeft gegeten en wanneer dit gebeurde.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold mr-3">2</span>
                <div>
                  <strong className="text-gray-900">Verzamel belangrijke informatie</strong>
                  <p className="text-gray-700 mt-1">Noteer: aantal druiven (schatting), type (rode/groene), tijdstip van inname, gewicht van je hond, en eventuele symptomen die al zichtbaar zijn.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold mr-3">3</span>
                <div>
                  <strong className="text-gray-900">Probeer NIET zelf te laten braken</strong>
                  <p className="text-gray-700 mt-1">Laat braken alleen induceren door een dierenarts. Thuismethoden kunnen gevaarlijk zijn en tijd verspillen. De dierenarts kan veilig braken opwekken op de kliniek.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold mr-3">4</span>
                <div>
                  <strong className="text-gray-900">Ga direct naar de kliniek</strong>
                  <p className="text-gray-700 mt-1">Volg het advies van je dierenarts op. Bij druivenvergiftiging is snelle behandeling binnen de eerste uren essentieel om nierschade te voorkomen.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold mr-3">5</span>
                <div>
                  <strong className="text-gray-900">Monitor je hond nauwlettend</strong>
                  <p className="text-gray-700 mt-1">Let op tekenen van braken, diarree, lethargie, verminderde urineproductie en gedragsveranderingen. Meld alles aan de dierenarts.</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Waarom Zo'n Haast?</h3>
            <p className="text-blue-800">
              Als braken snel kan worden opgewekt, kunnen de meeste druiven uit de maag worden verwijderd voordat de giftige stof volledig is opgenomen. Vroege behandeling kan het verschil maken tussen volledig herstel en blijvende nierschade.
            </p>
          </div>
        </section>

        {/* When to Contact Vet */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-emerald-500 pb-2">
            Behandeling door de Dierenarts
          </h2>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Medische Interventies</h3>
            <p className="text-gray-700 mb-4">
              De behandeling van druivenvergiftiging hangt af van het tijdstip van inname en de ernst van de symptomen:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-emerald-600 font-bold mr-2">1.</span>
                <span><strong>Braken induceren (binnen 2-6 uur):</strong> De dierenarts geeft medicatie om braken op te wekken en de druiven uit de maag te verwijderen</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 font-bold mr-2">2.</span>
                <span><strong>Actieve kool toedienen:</strong> Bindt resterende toxinen in het maag-darmstelsel om verdere absorptie te voorkomen</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 font-bold mr-2">3.</span>
                <span><strong>Intensieve infuustherapie (24-72 uur):</strong> Intraveneuze vloeistoffen om de nieren te ondersteunen, uitdroging te voorkomen en toxinen uit te spoelen</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 font-bold mr-2">4.</span>
                <span><strong>Nierfunctie monitoring:</strong> Regelmatige bloedtests om nierfunctie te controleren (ureum, creatinine, elektrolyten)</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 font-bold mr-2">5.</span>
                <span><strong>Urineproductie bijhouden:</strong> Meet hoeveel urine de hond produceert om nierfunctie te monitoren</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 font-bold mr-2">6.</span>
                <span><strong>Ondersteunende zorg:</strong> Medicijnen tegen misselijkheid, maagbescherming, en behandeling van andere symptomen</span>
              </li>
            </ul>
          </div>

          <div className="bg-yellow-50 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-yellow-900 mb-3">Prognose en Herstel</h3>
            <p className="text-yellow-800 mb-4">
              De prognose hangt sterk af van hoe snel de behandeling wordt gestart:
            </p>
            <ul className="space-y-2 text-yellow-800">
              <li className="flex items-start">
                <span className="text-yellow-600 font-bold mr-2">✓</span>
                <span><strong>Behandeling binnen 6 uur:</strong> Zeer goede prognose, vaak volledig herstel</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 font-bold mr-2">✓</span>
                <span><strong>Behandeling binnen 12-24 uur:</strong> Goede kans op herstel met intensieve zorg</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 font-bold mr-2">⚠</span>
                <span><strong>Behandeling na 24 uur of met nierschade:</strong> Gereserveerde prognose, mogelijk blijvende nierschade</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-2">✗</span>
                <span><strong>Geen behandeling of ernstig nierfalen:</strong> Vaak fataal</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
            <p className="text-emerald-900">
              <strong>Hersteltijd:</strong> Honden die succesvol worden behandeld hebben meestal 48-72 uur intensieve zorg nodig. Nierfunctie wordt vaak enkele dagen tot weken gemonitord om te verzekeren dat volledig herstel optreedt.
            </p>
          </div>
        </section>

        {/* Prevention Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-emerald-500 pb-2">
            Preventie: Houd Druiven Buiten Bereik
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-emerald-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-emerald-900 mb-3">In Huis</h3>
              <ul className="space-y-2 text-emerald-800">
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">✓</span>
                  <span>Bewaar druiven in gesloten koelkasten of hoge kasten</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">✓</span>
                  <span>Leg fruitschalen met druiven buiten bereik van je hond</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">✓</span>
                  <span>Ruim gevallen druiven direct op</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">✓</span>
                  <span>Wees extra alert bij druivenseizoen (zomer/herfst)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">✓</span>
                  <span>Controleer ingrediëntenlijsten van voedingsmiddelen</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Buiten & Social</h3>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Let op druiven/rozijnen in parken en picknickgebieden</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Waarschuw vrienden en familie om geen druiven te voeren</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Leer kinderen dat druiven gevaarlijk zijn voor honden</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Train "laat maar" commando voor gevonden eten</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Vermijd wandelingen in wijngaarden tijdens oogsttijd</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-orange-50 rounded-lg p-6 border-l-4 border-orange-500">
            <h3 className="text-lg font-semibold text-orange-900 mb-2">Let Ook Op Deze Producten</h3>
            <p className="text-orange-800 mb-3">
              Druiven zijn niet alleen gevaarlijk in hun natuurlijke vorm. Let ook op:
            </p>
            <ul className="space-y-1 text-orange-800">
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Rozijnen (gedroogde druiven - nog geconcentreerder!)</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Druivensap en -concentraat</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Wijn en alcoholische dranken met druiven</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Fruit mengsels met druiven</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Bakproducten met rozijnen (fruitbrood, rozijnenbrood)</span>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-emerald-500 pb-2">
            Veelgestelde Vragen over Druiven en Honden
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Waarom zijn druiven giftig voor honden?
              </h3>
              <p className="text-gray-700">
                De exacte giftige stof in druiven is nog niet geïdentificeerd, maar druiven kunnen acuut nierfalen veroorzaken bij honden. Recent onderzoek wijst op wijnsteenzuur als mogelijke oorzaak. Zelfs kleine hoeveelheden kunnen ernstige nierschade veroorzaken die tot blijvende gezondheidsproblemen of overlijden kan leiden. De onvoorspelbare reactie maakt elke inname gevaarlijk.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Zijn alle druiven gevaarlijk?
              </h3>
              <p className="text-gray-700">
                Ja, alle soorten druiven zijn gevaarlijk: rode, groene, met of zonder pitten, biologisch of conventioneel. Ook gedroogde druiven (rozijnen), druivensap, wijn en producten met druiven zijn giftig voor honden. Er is geen verschil in toxiciteit tussen verschillende druivensoorten - ze zijn allemaal even gevaarlijk.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Hoeveel druiven zijn dodelijk?
              </h3>
              <p className="text-gray-700">
                Er is geen veilige hoeveelheid bekend. Sommige honden krijgen ernstige nierschade na slechts enkele druiven, terwijl andere honden grotere hoeveelheden lijken te verdragen zonder symptomen. Deze onvoorspelbare reactie betekent dat je nooit kunt weten hoe je hond zal reageren. Behandel daarom elke inname van druiven, ongeacht de hoeveelheid, als medisch noodgeval.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Wat zijn de symptomen van druivenvergiftiging?
              </h3>
              <p className="text-gray-700">
                Vroege symptomen zijn braken, diarree, lethargie en verminderde eetlust binnen 12-24 uur na inname. Tekenen van nierschade zoals verminderde of geen urine, buikpijn en uitdroging volgen binnen 24-72 uur. Ernstige gevallen kunnen leiden tot volledig nierfalen met bewusteloosheid, aanvallen en mogelijk overlijden. Vroege behandeling is cruciaal.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Kan mijn hond herstellen van druivenvergiftiging?
              </h3>
              <p className="text-gray-700">
                Met vroege behandeling (binnen 6 uur na inname) kunnen veel honden volledig herstellen. Behandeling bestaat uit braken induceren, actieve kool toedienen en intensieve infuustherapie om de nieren te ondersteunen. Zonder behandeling of bij ernstige nierschade kan druivenvergiftiging dodelijk zijn. De prognose is het best wanneer de behandeling direct wordt gestart, voordat nierschade optreedt.
              </p>
            </div>
          </div>
        </section>

        {/* Medical Disclaimer */}
        <section className="mb-12">
          <div className="bg-gray-100 border-l-4 border-gray-400 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Medische Disclaimer</h3>
            <p className="text-gray-700 text-sm">
              De informatie op deze pagina is uitsluitend bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies, diagnose of behandeling. Neem bij elke inname van druiven door je hond onmiddellijk contact op met je dierenarts of de dierenartsenpraktijk met spoed. Druivenvergiftiging is een medisch noodgeval waarbij snelle behandeling levensreddend kan zijn. Bij twijfel moet je direct handelen en professionele hulp inschakelen. CutiePawsPedia is niet verantwoordelijk voor eventuele gevolgen van het gebruik van deze informatie.
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
