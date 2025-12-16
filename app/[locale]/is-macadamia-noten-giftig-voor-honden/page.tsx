import type { Metadata } from 'next';
import Link from 'next/link';
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: 'Zijn Macadamia Noten Giftig voor Honden? Symptomen & Risico\'s | CutiePawsPedia',
  description: 'Macadamia noten zijn giftig voor honden en veroorzaken zwakte en tremoren. Leer de symptomen herkennen, wat te doen bij inname, en hoe je je hond beschermt.',
  keywords: 'macadamia noten giftig honden, hond macadamia gegeten, noten vergiftiging, zwakte tremoren hond, symptomen macadamia hond, dierenarts spoed',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Zijn Macadamia Noten Giftig voor Honden? Symptomen & Risico\'s',
    description: 'Macadamia noten zijn giftig voor honden. Ontdek waarom, welke symptomen je moet herkennen en wat te doen bij inname.',
    type: 'article',
    locale: 'nl_NL',
  },
};

export default function MacadamiaNotenGiftigVoorHondenPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Zijn Macadamia Noten Giftig voor Honden? Symptomen & Risico\'s',
            description: 'Macadamia noten zijn giftig voor honden en veroorzaken zwakte en tremoren. Leer de symptomen herkennen en wat te doen bij inname.',
            author: {
              '@type': 'Organization',
              name: 'CutiePawsPedia',
            },
            datePublished: '2025-12-15',
            dateModified: '2025-12-15',
            image: 'https://cutiepawspedia.com/images/macadamia-dogs-danger.jpg',
            publisher: {
              '@type': 'Organization',
              name: 'CutiePawsPedia',
              logo: {
                '@type': 'ImageObject',
                url: 'https://cutiepawspedia.com/logo.png',
              },
            },
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Waarom zijn macadamia noten giftig voor honden?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Macadamia noten bevatten een nog onbekende toxische stof die het zenuwstelsel van honden beïnvloedt. Dit leidt tot zwakte in de achterpoten, tremoren en andere neurologische symptomen. Neem altijd contact op met je dierenarts als je hond macadamia noten heeft gegeten.',
                },
              },
              {
                '@type': 'Question',
                name: 'Hoe snel krijgt een hond symptomen na het eten van macadamia noten?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Symptomen van macadamia notenvergiftiging treden meestal op binnen 12 uur na inname. De meeste honden vertonen binnen 3 tot 6 uur al tekenen van zwakte, vooral in de achterpoten. Herstel vindt doorgaans plaats binnen 24 tot 48 uur met goede veterinaire zorg.',
                },
              },
              {
                '@type': 'Question',
                name: 'Zijn macadamia noten dodelijk voor honden?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Macadamia notenvergiftiging is zelden dodelijk, maar kan wel zeer oncomfortabel en beangstigend zijn voor je hond. De symptomen zoals zwakte en tremoren zijn tijdelijk, maar veterinaire zorg is altijd nodig om complicaties te voorkomen en je hond comfortabel te houden.',
                },
              },
              {
                '@type': 'Question',
                name: 'Zijn andere noten ook gevaarlijk voor honden?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Ja, verschillende noten zijn gevaarlijk voor honden. Walnoten kunnen schimmels bevatten die giftig zijn. Amandelen zijn moeilijk verteerbaar. Pecannoten kunnen ook problemen veroorzaken. Het is het veiligst om alle noten te vermijden en alleen hondenspecifieke snacks te geven.',
                },
              },
            ],
          }),
        }}
      />

      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="mb-8">
          <FoodGuideBreadcrumb
            locale="nl"
            items={[
              { name: "Voedselgids", href: "/nl/voedselgids" },
              { name: "Giftige Stoffen", href: "/nl/giftige-stoffen" },
            ]}
            currentPage="Macadamia Noten voor Honden"
          />

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 mt-6">
            Zijn Macadamia Noten Giftig voor Honden?
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Voedsel</span>
            <span>•</span>
            <span>Honden</span>
            <span>•</span>
            <span className="text-orange-600 font-semibold">Middel Toxisch</span>
          </div>
        </header>

        {/* TL;DR Verdict Box */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-500 rounded-lg p-6 mb-8 shadow-md">
          <div className="flex items-start gap-4">
            <div className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-2xl font-bold">
              !
            </div>
            <div>
              <h2 className="text-2xl font-bold text-orange-900 mb-2">Ja, macadamia noten zijn giftig voor honden</h2>
              <p className="text-gray-800 leading-relaxed">
                Macadamia noten bevatten een <strong>onbekende toxische stof</strong> die het zenuwstelsel van honden beïnvloedt.
                Typische symptomen zijn <strong>zwakte in de achterpoten, tremoren en onvermogen om te lopen</strong>.
                Deze symptomen treden meestal op binnen <strong>12 uur na inname</strong>.
                Hoewel zelden dodelijk, is macadamia notenvergiftiging zeer oncomfortabel en beangstigend voor je hond.
                <strong className="text-orange-700"> Neem altijd direct contact op met je dierenarts als je hond macadamia noten heeft gegeten.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <section className="mb-12">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Macadamia noten zijn een populaire en dure lekkernij voor mensen, maar zeer gevaarlijk voor honden.
              Ondanks jarenlang onderzoek is de exacte toxische stof in macadamia noten nog steeds niet geïdentificeerd.
              Wat wel duidelijk is, is dat zelfs kleine hoeveelheden ernstige symptomen kunnen veroorzaken bij honden.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Het meest karakteristieke symptom van macadamia notenvergiftiging is <strong>zwakte in de achterpoten</strong>.
              Honden kunnen niet meer goed lopen, wankelen of zelfs helemaal niet meer kunnen opstaan.
              Dit gaat vaak gepaard met <strong>tremoren (trillingen)</strong>, braken en verhoogde lichaamstemperatuur.
              De symptomen zijn tijdelijk, maar zeer verontrustend om te zien.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Interessant genoeg lijken alleen honden gevoelig te zijn voor macadamia noten. Andere dieren,
              waaronder katten en mensen, vertonen geen vergiftigingsverschijnselen. Dit maakt macadamia noten
              een uniek gevaar specifiek voor honden, en daarom is het cruciaal om ze altijd buiten bereik te houden.
            </p>
          </div>
        </section>

        {/* Why Dangerous */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Waarom zijn Macadamia Noten Gevaarlijk voor Honden?</h2>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold text-emerald-800 mb-4">De Onbekende Toxine</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Ondanks uitgebreid onderzoek is de exacte toxische stof in macadamia noten nog steeds niet geïdentificeerd.
              Wat wetenschappers wel weten is dat de stof het <strong>zenuwstelsel</strong> van honden beïnvloedt,
              wat leidt tot spierzwakte en neurologische symptomen. De toxine lijkt vooral de perifere zenuwen te
              beïnvloeden die de spieren van de achterpoten aansturen.
            </p>
            <p className="text-gray-700 leading-relaxed">
              De toxine lijkt zich te concentreren in de noot zelf en blijft actief, ongeacht of de noten rauw,
              geroosterd of verwerkt zijn in producten zoals koekjes of chocolade. Dit betekent dat alle vormen
              van macadamia noten vermeden moeten worden.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-emerald-800 mb-4">Risicofactoren</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-xl">⚠️</span>
                <div>
                  <strong className="text-gray-900">Kleine Honden:</strong>
                  <span className="text-gray-700"> Zijn gevoeliger omdat een kleine hoeveelheid noten relatief meer toxine betekent voor hun lichaamsgewicht.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-xl">⚠️</span>
                <div>
                  <strong className="text-gray-900">Gecombineerd met Chocolade:</strong>
                  <span className="text-gray-700"> Macadamia noten in chocoladeproducten zijn extra gevaarlijk vanwege de dubbele toxiciteit.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-xl">⚠️</span>
                <div>
                  <strong className="text-gray-900">Gezouten Noten:</strong>
                  <span className="text-gray-700"> Het extra zout kan leiden tot natriumvergiftiging bovenop de macadamia-toxiciteit.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-xl">⚠️</span>
                <div>
                  <strong className="text-gray-900">Hoog Vetgehalte:</strong>
                  <span className="text-gray-700"> Kan pancreatitis (alvleesklierontsteking) veroorzaken, vooral bij gevoelige honden.</span>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Symptoms */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Symptomen van Macadamia Notenvergiftiging bij Honden</h2>

          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg shadow-md p-6 mb-4">
            <p className="text-gray-800 mb-4 font-medium">
              Symptomen treden meestal op binnen 3 tot 12 uur na inname en kunnen 12 tot 48 uur aanhouden:
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-orange-700 mb-3">Neurologische Symptomen (Meest Voorkomend)</h3>
                <ul className="grid md:grid-cols-2 gap-2">
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    <span className="text-gray-700">Zwakte in de achterpoten</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    <span className="text-gray-700">Onvermogen om te staan of lopen</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    <span className="text-gray-700">Wankelen en verlies van coördinatie</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    <span className="text-gray-700">Tremoren en spiertrillingen</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    <span className="text-gray-700">Lethargie en vermoeidheid</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    <span className="text-gray-700">Depressie en apathie</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-orange-700 mb-3">Andere Symptomen</h3>
                <ul className="grid md:grid-cols-2 gap-2">
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    <span className="text-gray-700">Braken</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    <span className="text-gray-700">Verhoogde lichaamstemperatuur (koorts)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    <span className="text-gray-700">Buikpijn en ongemak</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    <span className="text-gray-700">Stijve gewrichten</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    <span className="text-gray-700">Verhoogde hartslag</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    <span className="text-gray-700">Bleke tandvlees (bij ernstiger gevallen)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-white rounded p-4 border-l-4 border-orange-500">
              <p className="text-gray-800 font-semibold mb-2">🎯 Het Klassieke Macadamia Beeld:</p>
              <p className="text-gray-700">
                Een hond die niet meer kan opstaan of lopen, vooral met de achterpoten, tremoren vertoont en
                binnen 12 uur na het eten van macadamia noten deze symptomen ontwikkelt.
              </p>
            </div>
          </div>

          <div className="bg-orange-100 border-l-4 border-orange-600 rounded p-4">
            <p className="text-orange-900 font-semibold">
              ⚠️ Hoewel macadamia notenvergiftiging zelden dodelijk is, zijn de symptomen zeer verontrustend.
              Neem altijd direct contact op met je dierenarts voor begeleiding en behandeling.
            </p>
          </div>
        </section>

        {/* What To Do */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Wat Te Doen Als Je Hond Macadamia Noten Heeft Gegeten?</h2>

          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-700 mb-6 leading-relaxed">
              Snelle actie kan het verschil maken in het comfort en herstel van je hond. Volg deze stappen:
            </p>

            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  1
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Bel Onmiddellijk Je Dierenarts</h3>
                  <p className="text-gray-700">
                    Neem direct contact op met je dierenarts, ook als er nog geen symptomen zijn.
                    Vertel hoeveel noten je hond ongeveer heeft gegeten en wanneer dit gebeurde.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  2
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Verzamel Informatie</h3>
                  <p className="text-gray-700">
                    Noteer het aantal noten (bij benadering), of ze rauw of geroosterd waren,
                    of er chocolade bij zat, en hoe lang geleden de inname was.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  3
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Volg Veterinair Advies</h3>
                  <p className="text-gray-700">
                    De dierenarts kan adviseren om braken op te wekken als de inname recent was,
                    of om direct naar de kliniek te komen voor monitoring en ondersteunende zorg.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  4
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Monitor Je Hond Nauwkeurig</h3>
                  <p className="text-gray-700">
                    Houd je hond de komende 12-48 uur in de gaten. Let vooral op zwakte in de poten,
                    tremoren, braken en veranderingen in gedrag. Noteer alle symptomen die je ziet.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  5
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Mogelijke Behandeling</h3>
                  <p className="text-gray-700">
                    Er is geen specifiek tegengif. Behandeling bestaat uit ondersteunende zorg:
                    infuustherapie, medicijnen tegen braken, koortswerende middelen en rust.
                    De meeste honden herstellen volledig binnen 24-48 uur.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* When to Contact Vet */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Wanneer Contact Opnemen met de Dierenarts?</h2>

          <div className="bg-emerald-50 border-l-4 border-emerald-600 rounded-lg p-6">
            <p className="text-lg font-semibold text-emerald-900 mb-4">
              Altijd contact opnemen bij macadamia noten inname!
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Zelfs als je hond nog geen symptomen vertoont, is het belangrijk om direct contact op te nemen
              met je dierenarts. Vroege interventie kan het ongemak verminderen en complicaties voorkomen.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span className="text-gray-700">Symptomen kunnen pas na enkele uren verschijnen</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span className="text-gray-700">Kleine honden zijn extra gevoelig</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span className="text-gray-700">Combinatie met chocolade verergert de situatie</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span className="text-gray-700">Het onvermogen om te lopen is zeer beangstigend voor eigenaren en honden</span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              <strong>Neem vooral direct contact op als je hond:</strong> Zwakte in de poten vertoont, niet meer kan lopen,
              tremoren heeft, braak of verhoogde temperatuur.
            </p>
          </div>
        </section>

        {/* Prevention Tips */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Preventie: Hoe Bescherm Je Je Hond?</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🏠</span>
                Veilige Opslag Thuis
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Bewaar macadamia noten in gesloten kasten op hoogte</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Leg nooit noten op lage tafels of aanrechten</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Ruim notenschalen direct op na gebruik</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Gooi lege verpakkingen in een afsluitbare vuilnisbak</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🍪</span>
                Bakproducten & Snacks
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Controleer ingrediënten van koekjes en gebak</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Pas op met witte chocolade macadamia koekjes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Houd traktaties met noten buiten bereik</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Leer kinderen geen gebak te delen met de hond</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🎁</span>
                Feestdagen & Cadeaus
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Macadamia noten zijn populaire kerstcadeaus - extra voorzichtig</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Berg notenmanden direct op na ontvangst</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Waarschuw gasten over de gevaren</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Houd honden weg tijdens het uitpakken van cadeaus</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🥜</span>
                Veilige Alternatieven
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Gebruik speciale hondenkoekjes als traktatie</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Pindakaas kan veilig zijn (controleer op xylitol!)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Verse groenten als gezonde snack (wortel, komkommer)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Raadpleeg je dierenarts over veilige snackopties</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Veelgestelde Vragen</h2>

          <div className="space-y-4">
            <details className="bg-white rounded-lg shadow-md p-6 group">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex justify-between items-center">
                <span>Waarom zijn macadamia noten giftig voor honden?</span>
                <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-4 leading-relaxed">
                Macadamia noten bevatten een nog onbekende toxische stof die het zenuwstelsel van honden beïnvloedt.
                Dit leidt tot zwakte in de achterpoten, tremoren en andere neurologische symptomen. Ondanks jarenlang
                onderzoek is de exacte toxine nog niet geïdentificeerd. Wat wel bekend is, is dat alleen honden
                gevoelig lijken te zijn voor deze vergiftiging. Neem altijd contact op met je dierenarts als je hond
                macadamia noten heeft gegeten.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-md p-6 group">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex justify-between items-center">
                <span>Hoe snel krijgt een hond symptomen na het eten van macadamia noten?</span>
                <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-4 leading-relaxed">
                Symptomen van macadamia notenvergiftiging treden meestal op binnen 12 uur na inname.
                De meeste honden vertonen binnen 3 tot 6 uur al tekenen van zwakte, vooral in de achterpoten.
                Herstel vindt doorgaans plaats binnen 24 tot 48 uur met goede veterinaire zorg. Het is belangrijk
                om je hond de eerste 48 uur nauwlettend in de gaten te houden.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-md p-6 group">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex justify-between items-center">
                <span>Zijn macadamia noten dodelijk voor honden?</span>
                <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-4 leading-relaxed">
                Macadamia notenvergiftiging is zelden dodelijk, maar kan wel zeer oncomfortabel en beangstigend zijn
                voor je hond. De symptomen zoals zwakte en tremoren zijn tijdelijk, maar veterinaire zorg is altijd
                nodig om complicaties te voorkomen en je hond comfortabel te houden tijdens het herstel. Met goede
                zorg herstellen de meeste honden volledig zonder blijvende schade.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-md p-6 group">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex justify-between items-center">
                <span>Zijn andere noten ook gevaarlijk voor honden?</span>
                <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-4 leading-relaxed">
                Ja, verschillende noten zijn gevaarlijk voor honden. Walnoten kunnen schimmels bevatten die giftig zijn.
                Amandelen zijn moeilijk verteerbaar en kunnen darmproblemen veroorzaken. Pecannoten kunnen ook problemen
                geven. Pinda's zijn technisch gezien geen noten maar peulvruchten en zijn meestal veilig in kleine
                hoeveelheden, maar controleer altijd op xylitol in pindakaas. Het is het veiligst om alle noten te
                vermijden en alleen hondenspecifieke snacks te geven.
              </p>
            </details>
          </div>
        </section>

        {/* Related Safe Foods */}
        <RelatedSafeFoods
          locale="nl"
          animal="honden"
          foods={commonSafeFoods}
          title="Veilige snack alternatieven"
        />

        {/* Medical Disclaimer */}
        <section className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">⚕️ Medische Disclaimer</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            De informatie op deze pagina is alleen bedoeld voor educatieve doeleinden en vervangt geen
            professioneel veterinair advies, diagnose of behandeling. Raadpleeg altijd een erkende dierenarts
            voor specifieke vragen over de gezondheid van je huisdier.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>Bij vermoeden van macadamia notenvergiftiging moet je altijd direct contact opnemen
            met je dierenarts of de dierennoodhulp.</strong> Hoewel zelden dodelijk, kunnen de symptomen
            zeer verontrustend zijn en heeft je hond veterinaire zorg nodig voor comfort en veilig herstel.
          </p>
        </section>
      </article>
    </div>
  );
}
