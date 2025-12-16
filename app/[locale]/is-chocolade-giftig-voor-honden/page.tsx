import type { Metadata } from 'next';
import Link from 'next/link';
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: 'Is Chocolade Giftig voor Honden? Gevaren & Symptomen | CutiePawsPedia',
  description: 'Chocolade is zeer giftig voor honden door theobromine en cafeïne. Leer de symptomen herkennen, wat te doen bij inname, en hoe je je hond beschermt tegen chocoladevergiftiging.',
  keywords: 'chocolade giftig honden, hond chocolade gegeten, theobromine vergiftiging, chocoladevergiftiging hond, symptomen chocolade hond, dierenarts spoed',
  robots: 'index, follow',
  openGraph: {
    title: 'Is Chocolade Giftig voor Honden? Gevaren & Symptomen',
    description: 'Chocolade is zeer giftig voor honden. Ontdek waarom, welke symptomen je moet herkennen en wat te doen bij inname.',
    type: 'article',
    locale: 'nl_NL',
  },
};

export default function ChocoladeGiftigVoorHondenPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Is Chocolade Giftig voor Honden? Gevaren & Symptomen',
            description: 'Chocolade is zeer giftig voor honden door theobromine en cafeïne. Leer de symptomen herkennen en wat te doen bij inname.',
            author: {
              '@type': 'Organization',
              name: 'CutiePawsPedia',
            },
            datePublished: '2025-01-15',
            dateModified: '2025-01-15',
            image: 'https://cutiepawspedia.com/images/chocolate-dogs-danger.jpg',
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
                name: 'Hoeveel chocolade is dodelijk voor een hond?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Dit hangt af van het type chocolade, de grootte van je hond en de hoeveelheid. Donkere chocolade en pure chocolade zijn het gevaarlijkst omdat ze meer theobromine bevatten. Neem altijd direct contact op met je dierenarts als je hond chocolade heeft gegeten, ongeacht de hoeveelheid.',
                },
              },
              {
                '@type': 'Question',
                name: 'Hoe snel krijgt een hond symptomen na het eten van chocolade?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Symptomen van chocoladevergiftiging kunnen binnen 6 tot 12 uur na inname optreden, maar soms verschijnen ze al eerder. De ernst en snelheid van symptomen hangt af van het type chocolade en de hoeveelheid die je hond heeft gegeten.',
                },
              },
              {
                '@type': 'Question',
                name: 'Wat moet ik doen als mijn hond chocolade heeft gegeten?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Bel onmiddellijk je dierenarts of de dierennoodhulp. Noteer welk type chocolade je hond heeft gegeten en hoeveel (bij benadering). Laat je hond niet braken tenzij een dierenarts dit adviseert. Houd je hond rustig en in de gaten tot je professionele hulp krijgt.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is witte chocolade ook gevaarlijk voor honden?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Witte chocolade bevat veel minder theobromine dan andere chocoladesoorten, maar kan nog steeds gevaarlijk zijn door het hoge vetgehalte en suikergehalte. Dit kan leiden tot maagdarmproblemen en in ernstige gevallen pancreatitis. Contact met je dierenarts wordt altijd aanbevolen.',
                },
              },
              {
                '@type': 'Question',
                name: 'Kunnen honden sterven door chocolade te eten?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Ja, chocoladevergiftiging kan dodelijk zijn voor honden, vooral bij kleine honden of bij inname van grote hoeveelheden donkere chocolade. Theobromine en cafeïne kunnen leiden tot ernstige complicaties zoals hartritmestoornissen, aanvallen en orgaanfalen. Snelle veterinaire hulp is cruciaal.',
                },
              },
            ],
          }),
        }}
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
            currentPage="Chocolade voor Honden"
          />

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Is Chocolade Giftig voor Honden?
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Voedsel</span>
            <span>•</span>
            <span>Honden</span>
            <span>•</span>
            <span className="text-red-600 font-semibold">Hoog Toxisch</span>
          </div>
        </header>

        {/* TL;DR Verdict Box */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 rounded-lg p-6 mb-8 shadow-md">
          <div className="flex items-start gap-4">
            <div className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-2xl font-bold">
              !
            </div>
            <div>
              <h2 className="text-2xl font-bold text-red-900 mb-2">Ja - Chocolade is ernstig giftig voor honden</h2>
              <p className="text-gray-800 leading-relaxed">
                Chocolade bevat <strong>theobromine en cafeïne</strong>, stoffen die zeer giftig zijn voor honden.
                Honden kunnen deze stoffen veel langzamer afbreken dan mensen, waardoor ze zich ophopen in hun lichaam.
                <strong> Pure en donkere chocolade zijn het gevaarlijkst</strong> vanwege het hoge theobromine-gehalte.
                Zelfs kleine hoeveelheden kunnen leiden tot ernstige gezondheidsproblemen.
                <strong className="text-red-700"> Neem bij elke inname direct contact op met je dierenarts.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <section className="mb-12">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Honden worden vaak aangetrokken door de geur en smaak van chocolade. Voor mensen is chocolade een lekkernij,
              maar voor onze viervoeters kan het levensgevaarlijk zijn. Elk jaar belanden duizenden honden bij de dierenarts
              vanwege chocoladevergiftiging, vooral rond feestdagen zoals Pasen, Sinterklaas en Kerstmis.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Het gevaarlijke aan chocolade zit hem in twee stoffen: <strong>theobromine</strong> en <strong>cafeïne</strong>.
              Terwijl mensen deze stoffen relatief snel kunnen afbreken en verwerken, hebben honden hier veel meer moeite mee.
              Hun lichaam breekt theobromine veel langzamer af, waardoor de giftige stof langer in hun systeem blijft en zich
              kan ophopen tot gevaarlijke niveaus.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              De ernst van een chocoladevergiftiging hangt af van verschillende factoren: het type chocolade, de hoeveelheid
              die gegeten is, en de grootte en gewicht van je hond. Kleine honden lopen een groter risico omdat zelfs een
              kleine hoeveelheid chocolade relatief veel theobromine voor hun lichaamsgewicht betekent.
            </p>
          </div>
        </section>

        {/* Why Dangerous */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Waarom is Chocolade Gevaarlijk voor Honden?</h2>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold text-emerald-800 mb-4">Theobromine en Cafeïne</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Theobromine is een stimulerende stof die voorkomt in cacaoplanten en dus in alle chocoladeproducten.
              Bij mensen wordt theobromine snel afgebroken door de lever, maar bij honden gaat dit proces veel langzamer.
              Hierdoor stapelt de stof zich op in het bloed en de organen, wat leidt tot vergiftigingsverschijnselen.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Cafeïne, ook aanwezig in chocolade, heeft een vergelijkbaar effect. Beide stoffen beïnvloeden het
              zenuwstelsel, het hart en de nieren van je hond. Ze kunnen leiden tot hyperactiviteit, verhoogde
              hartslag, tremoren, aanvallen en in ernstige gevallen hartfalen of de dood.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-emerald-800 mb-4">Verschillende Soorten Chocolade</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Niet alle chocolade is even gevaarlijk. Het theobromine-gehalte verschilt sterk per type:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold text-xl">⚠️</span>
                <div>
                  <strong className="text-gray-900">Pure/Bakchocolade:</strong>
                  <span className="text-gray-700"> Bevat het meeste theobromine en is het gevaarlijkst. Al een kleine hoeveelheid kan ernstige symptomen veroorzaken.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-xl">⚠️</span>
                <div>
                  <strong className="text-gray-900">Donkere Chocolade:</strong>
                  <span className="text-gray-700"> Hoog theobromine-gehalte. Zeer gevaarlijk voor honden van alle maten.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-600 font-bold text-xl">⚠️</span>
                <div>
                  <strong className="text-gray-900">Melkchocolade:</strong>
                  <span className="text-gray-700"> Bevat minder theobromine dan donkere chocolade, maar kan nog steeds gevaarlijk zijn, vooral bij grotere hoeveelheden.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-400 font-bold text-xl">⚠️</span>
                <div>
                  <strong className="text-gray-900">Witte Chocolade:</strong>
                  <span className="text-gray-700"> Bevat zeer weinig theobromine, maar wel veel vet en suiker. Kan leiden tot maagdarmproblemen en pancreatitis.</span>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Symptoms */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Symptomen van Chocoladevergiftiging bij Honden</h2>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg shadow-md p-6 mb-4">
            <p className="text-gray-800 mb-4 font-medium">
              Symptomen kunnen binnen 6 tot 12 uur na inname optreden, maar soms al eerder.
              De symptomen variëren van mild tot levensgevaarlijk, afhankelijk van de hoeveelheid chocolade:
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-orange-700 mb-3">Milde tot Matige Symptomen</h3>
                <ul className="grid md:grid-cols-2 gap-2">
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    <span className="text-gray-700">Hyperactiviteit en rusteloosheid</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    <span className="text-gray-700">Overmatige dorst en urineren</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    <span className="text-gray-700">Braken en misselijkheid</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    <span className="text-gray-700">Diarree</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    <span className="text-gray-700">Hijgen en verhoogde ademhaling</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    <span className="text-gray-700">Opgeblazen gevoel</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-red-700 mb-3">Ernstige Symptomen (Spoedeisend)</h3>
                <ul className="grid md:grid-cols-2 gap-2">
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">•</span>
                    <span className="text-gray-700">Snelle of onregelmatige hartslag</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">•</span>
                    <span className="text-gray-700">Tremoren en spiertrillingen</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">•</span>
                    <span className="text-gray-700">Aanvallen en stuipen</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">•</span>
                    <span className="text-gray-700">Verhoogde lichaamstemperatuur</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">•</span>
                    <span className="text-gray-700">Verwardheid en desoriëntatie</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">•</span>
                    <span className="text-gray-700">Bewustzijnsverlies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">•</span>
                    <span className="text-gray-700">Coma en hartfalen</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-red-100 border-l-4 border-red-600 rounded p-4">
            <p className="text-red-900 font-semibold">
              ⚠️ Bij elk symptoom, ongeacht de ernst, moet je direct contact opnemen met je dierenarts.
              Wacht niet tot de symptomen verergeren.
            </p>
          </div>
        </section>

        {/* What To Do */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Wat Te Doen Als Je Hond Chocolade Heeft Gegeten?</h2>

          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-700 mb-6 leading-relaxed">
              Snelheid is cruciaal bij chocoladevergiftiging. Volg deze stappen onmiddellijk:
            </p>

            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  1
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Blijf Kalm en Verzamel Informatie</h3>
                  <p className="text-gray-700">
                    Probeer vast te stellen welk type chocolade je hond heeft gegeten (melk, donker, puur)
                    en hoeveel (bij benadering). Bewaar de verpakking als mogelijk.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  2
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Bel Direct Je Dierenarts</h3>
                  <p className="text-gray-700">
                    Neem onmiddellijk telefonisch contact op met je dierenarts of de dierennoodhulp.
                    Geef door welk type chocolade en hoeveel je hond heeft gegeten, en het gewicht van je hond.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  3
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Volg Veterinair Advies Op</h3>
                  <p className="text-gray-700">
                    De dierenarts zal je vertellen of je direct naar de kliniek moet komen.
                    Sommige gevallen vereisen onmiddellijke behandeling zoals het opwekken van braken of magspoeling.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  4
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Laat Je Hond NIET Zelf Braken</h3>
                  <p className="text-gray-700">
                    Probeer je hond niet zelf aan het braken te krijgen, tenzij een dierenarts dit expliciet adviseert.
                    Verkeerd uitgevoerd kan dit meer schade aanrichten.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  5
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Houd Je Hond Rustig en Observeer</h3>
                  <p className="text-gray-700">
                    Houd je hond rustig en warm terwijl je wacht op instructies of naar de kliniek gaat.
                    Let goed op eventuele symptomen zoals trillen, braken of veranderingen in gedrag.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  6
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Breng Je Hond Direct naar de Dierenarts</h3>
                  <p className="text-gray-700">
                    Als de dierenarts dit adviseert, breng je hond zo snel mogelijk naar de kliniek.
                    Neem indien mogelijk de chocoladeverpakking mee voor referentie.
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
              Altijd contact opnemen, ongeacht de hoeveelheid!
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Zelfs als je hond maar een klein stukje chocolade heeft gegeten, is het altijd verstandig om
              contact op te nemen met je dierenarts. Zij kunnen inschatten hoe ernstig de situatie is op basis van:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span className="text-gray-700">Het type chocolade (puur, donker, melk, wit)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span className="text-gray-700">De geschatte hoeveelheid die gegeten is</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span className="text-gray-700">Het gewicht en de grootte van je hond</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span className="text-gray-700">Hoe lang geleden de inname was</span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              <strong>Vooral bij donkere chocolade of pure chocolade</strong> is snelle actie essentieel.
              Kleine honden, pups en oudere honden lopen extra risico.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Noodcontacten</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-2xl">📞</span>
                <div>
                  <strong className="text-gray-900">Je Eigen Dierenarts</strong>
                  <p className="text-gray-600">Bel altijd eerst je eigen dierenarts tijdens praktijkuren</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-2xl">📞</span>
                <div>
                  <strong className="text-gray-900">Dierennoodhulp (24/7)</strong>
                  <p className="text-gray-600">Buiten kantooruren kun je terecht bij de dierennoodhulp in je regio</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-2xl">ℹ️</span>
                <div>
                  <strong className="text-gray-900">Nationaal Vergiftigingen Informatie Centrum (NVIC)</strong>
                  <p className="text-gray-600">Voor mensen: 030-2748888 (niet voor huisdieren, bel je dierenarts)</p>
                </div>
              </li>
            </ul>
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
                  <span className="text-gray-700">Bewaar chocolade in gesloten kasten op hoogte</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Leg chocolade nooit op lage tafels of aanrechten</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Gooi chocoladeverpakkingen direct in een afvalemmertje met deksel</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Controleer tassen en jaszakken na boodschappen</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">👨‍👩‍👧‍👦</span>
                Educatie Familie & Gasten
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Leg kinderen uit dat chocolade gevaarlijk is voor honden</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Informeer bezoekers over de chocoladeverbod voor je hond</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Leer kinderen geen eten te delen met de hond</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Maak afspraken over waar eten wel en niet mag liggen</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🎄</span>
                Extra Voorzichtigheid bij Feestdagen
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Sinterklaas: chocoladeletters en pepernoten veilig opbergen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Kerst: adventskalenders buiten bereik houden</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Pasen: chocolade-eieren en hazen veilig opslaan</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Verjaardagen: cadeaus met chocolade gelijk opruimen</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🐕</span>
                Veilige Alternatieven
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Gebruik speciaal hondenkoekjes als traktatie</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Carob (johannesbroodpoeder) is een veilig alternatief</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Verse groenten en fruit (appel, wortel) als gezonde snack</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Koop speciaal voor honden gemaakte "chocolade" snoepjes</span>
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
                <span>Hoeveel chocolade is dodelijk voor een hond?</span>
                <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-4 leading-relaxed">
                Dit hangt af van het type chocolade, de grootte van je hond en de hoeveelheid.
                Donkere chocolade en pure chocolade zijn het gevaarlijkst omdat ze meer theobromine bevatten.
                Neem altijd direct contact op met je dierenarts als je hond chocolade heeft gegeten,
                ongeacht de hoeveelheid. Zij kunnen inschatten of behandeling nodig is.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-md p-6 group">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex justify-between items-center">
                <span>Hoe snel krijgt een hond symptomen na het eten van chocolade?</span>
                <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-4 leading-relaxed">
                Symptomen van chocoladevergiftiging kunnen binnen 6 tot 12 uur na inname optreden,
                maar soms verschijnen ze al eerder. De ernst en snelheid van symptomen hangt af van het
                type chocolade en de hoeveelheid die je hond heeft gegeten. Let altijd goed op je hond
                de eerste 24 uur na inname en neem bij elk symptoom contact op met je dierenarts.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-md p-6 group">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex justify-between items-center">
                <span>Wat moet ik doen als mijn hond chocolade heeft gegeten?</span>
                <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-4 leading-relaxed">
                Bel onmiddellijk je dierenarts of de dierennoodhulp. Noteer welk type chocolade je hond heeft
                gegeten en hoeveel (bij benadering). Laat je hond niet braken tenzij een dierenarts dit adviseert.
                Houd je hond rustig en in de gaten tot je professionele hulp krijgt. Snelheid is cruciaal bij
                chocoladevergiftiging.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-md p-6 group">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex justify-between items-center">
                <span>Is witte chocolade ook gevaarlijk voor honden?</span>
                <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-4 leading-relaxed">
                Witte chocolade bevat veel minder theobromine dan andere chocoladesoorten, maar kan nog steeds
                gevaarlijk zijn door het hoge vetgehalte en suikergehalte. Dit kan leiden tot maagdarmproblemen
                en in ernstige gevallen pancreatitis (alvleesklierontsteking). Contact met je dierenarts wordt
                altijd aanbevolen, ook bij witte chocolade.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-md p-6 group">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex justify-between items-center">
                <span>Kunnen honden sterven door chocolade te eten?</span>
                <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-4 leading-relaxed">
                Ja, chocoladevergiftiging kan dodelijk zijn voor honden, vooral bij kleine honden of bij inname
                van grote hoeveelheden donkere chocolade. Theobromine en cafeïne kunnen leiden tot ernstige
                complicaties zoals hartritmestoornissen, aanvallen en orgaanfalen. Snelle veterinaire hulp is
                cruciaal om de kans op een goede afloop te maximaliseren.
              </p>
            </details>
          </div>
        </section>

        {/* Related Articles */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Gerelateerde Artikelen</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/nl/giftige-stoffen"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold text-emerald-800 mb-2">Giftige Stoffen voor Honden</h3>
              <p className="text-gray-600 text-sm">Overzicht van alle gevaarlijke stoffen voor honden</p>
            </Link>

            <Link
              href="/nl/is-xylitol-giftig-voor-honden"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold text-emerald-800 mb-2">Is Xylitol Giftig voor Honden?</h3>
              <p className="text-gray-600 text-sm">Een andere veelvoorkomende en gevaarlijke stof</p>
            </Link>

            <Link
              href="/nl/is-druiven-giftig-voor-honden"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold text-emerald-800 mb-2">Zijn Druiven Giftig voor Honden?</h3>
              <p className="text-gray-600 text-sm">Fruit dat zeer gevaarlijk kan zijn voor honden</p>
            </Link>

            <Link
              href="/nl/is-ui-giftig-voor-honden"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold text-emerald-800 mb-2">Is Ui Giftig voor Honden?</h3>
              <p className="text-gray-600 text-sm">Een keukeningrediënt dat giftig is voor honden</p>
            </Link>

            <Link
              href="/nl/is-knoflook-giftig-voor-honden"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold text-emerald-800 mb-2">Is Knoflook Giftig voor Honden?</h3>
              <p className="text-gray-600 text-sm">Waarom knoflook gevaarlijk is voor je hond</p>
            </Link>

            <Link
              href="/nl/is-avocado-giftig-voor-honden"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold text-emerald-800 mb-2">Is Avocado Giftig voor Honden?</h3>
              <p className="text-gray-600 text-sm">De risico's van avocado voor honden</p>
            </Link>
          </div>

          {/* Safe Food Alternatives */}
          <RelatedSafeFoods
            locale="nl"
            animal="honden"
            foods={commonSafeFoods}
            title="Veilige snack alternatieven"
          />
        </section>

        {/* Medical Disclaimer */}
        <section className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">⚕️ Medische Disclaimer</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            De informatie op deze pagina is alleen bedoeld voor educatieve doeleinden en vervangt geen
            professioneel veterinair advies, diagnose of behandeling. Raadpleeg altijd een erkende dierenarts
            voor specifieke vragen over de gezondheid van je huisdier.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>Bij spoedeisende situaties zoals chocoladevergiftiging moet je altijd direct contact opnemen
            met je dierenarts of de dierennoodhulp.</strong> Wacht nooit af of de symptomen vanzelf overgaan.
            Snelle actie kan het verschil maken tussen leven en dood.
          </p>
        </section>
      </article>
    </div>
  );
}
