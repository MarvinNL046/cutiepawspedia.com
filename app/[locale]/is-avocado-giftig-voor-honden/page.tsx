import type { Metadata } from 'next';
import Link from 'next/link';
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: 'Is Avocado Giftig voor Honden? Persin & Risico\'s | CutiePawsPedia',
  description: 'Avocado bevat persin en kan maagklachten veroorzaken bij honden. Leer over de risico\'s, symptomen en wat te doen als je hond avocado heeft gegeten.',
  keywords: 'avocado giftig honden, hond avocado gegeten, persin vergiftiging, avocado pit gevaar, symptomen avocado hond, dierenarts',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Is Avocado Giftig voor Honden? Persin & Risico\'s',
    description: 'Avocado bevat persin dat gevaarlijk kan zijn voor honden. Ontdek de risico\'s en wat te doen bij inname.',
    type: 'article',
    locale: 'nl_NL',
  },
};

export default function AvocadoGiftigVoorHondenPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Is Avocado Giftig voor Honden? Persin & Risico\'s',
            description: 'Avocado bevat persin en kan maagklachten veroorzaken bij honden. Leer over symptomen en wat te doen bij inname.',
            author: {
              '@type': 'Organization',
              name: 'CutiePawsPedia',
            },
            datePublished: '2025-12-15',
            dateModified: '2025-12-15',
            image: 'https://cutiepawspedia.com/images/avocado-dogs-danger.jpg',
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
                name: 'Is avocado giftig voor honden?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Avocado bevat persin, een stof die maagklachten kan veroorzaken bij honden. Hoewel honden minder gevoelig zijn dan sommige andere dieren, kan avocado nog steeds braken en diarree veroorzaken. Neem contact op met je dierenarts als je hond avocado heeft gegeten.',
                },
              },
              {
                '@type': 'Question',
                name: 'Wat is persin en waarom is het gevaarlijk?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Persin is een natuurlijke schimmeldodende stof die in avocado\'s voorkomt, vooral in het blad, de schil en de pit. Bij honden kan persin maagdarmproblemen veroorzaken zoals braken en diarree. Het hoogste persingehalte zit in de pit en het blad.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is de avocadopit gevaarlijk voor honden?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Ja, de avocadopit is zeer gevaarlijk. Naast persin vormt de pit een verstikkings- en verstopping gevaar. Een ingeslikt pit kan de luchtwegen of darmen blokkeren, wat levensbedreigend is. Zorg dat je hond nooit toegang heeft tot avocadopitten.',
                },
              },
              {
                '@type': 'Question',
                name: 'Kunnen honden een beetje avocado eten?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Het is het beste om avocado helemaal te vermijden. Hoewel kleine hoeveelheden vruchtvlees soms geen problemen geven, is het risico aanwezig en varieert de gevoeligheid per hond. Er zijn veiligere alternatieven voor gezonde vetten in de voeding van je hond.',
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
            currentPage="Avocado voor Honden"
          />

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 mt-6">
            Is Avocado Giftig voor Honden?
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Voedsel</span>
            <span>•</span>
            <span>Honden</span>
            <span>•</span>
            <span className="text-yellow-600 font-semibold">Laag tot Middel Toxisch</span>
          </div>
        </header>

        {/* TL;DR Verdict Box */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 rounded-lg p-6 mb-8 shadow-md">
          <div className="flex items-start gap-4">
            <div className="bg-yellow-500 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-2xl font-bold">
              ⚠
            </div>
            <div>
              <h2 className="text-2xl font-bold text-yellow-900 mb-2">Avocado kan schadelijk zijn voor honden</h2>
              <p className="text-gray-800 leading-relaxed">
                Avocado bevat <strong>persin</strong>, een stof die maagklachten kan veroorzaken bij honden.
                Hoewel honden minder gevoelig zijn dan sommige andere dieren, kan avocado nog steeds <strong>braken en diarree</strong> veroorzaken.
                De <strong>avocadopit is bijzonder gevaarlijk</strong> vanwege verstikkings- en verstoppingsgevaar, naast een hoog persingehalte.
                Ook de schil en bladeren bevatten veel persin en moeten vermeden worden.
                <strong className="text-yellow-700"> Neem contact op met je dierenarts als je hond avocado heeft gegeten.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <section className="mb-12">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Avocado is een populaire en gezonde vrucht voor mensen, rijk aan gezonde vetten en voedingsstoffen.
              Veel eigenaren vragen zich af of ze dit "superfood" ook met hun hond kunnen delen.
              Hoewel avocado minder giftig is voor honden dan voor bijvoorbeeld vogels en paarden, kunnen ze nog steeds
              maagdarmproblemen veroorzaken.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Het belangrijkste risico komt van <strong>persin</strong>, een natuurlijke schimmeldodende stof die in alle delen
              van de avocadoplant voorkomt. Honden zijn relatief resistent tegen persin vergeleken met andere dieren,
              maar kunnen er nog steeds last van krijgen. De concentratie persin varieert sterk tussen verschillende delen
              van de vrucht.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Naast persin vormt de <strong>avocadopit een groot gevaar</strong>. De pit kan verstikking veroorzaken of
              de darmen blokkeren, wat levensbedreigend is. Daarom raden dierenartsen aan om avocado helemaal te vermijden,
              ondanks dat kleine hoeveelheden vruchtvlees bij sommige honden weinig problemen lijken te geven.
            </p>
          </div>
        </section>

        {/* Why Dangerous */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Waarom Kan Avocado Gevaarlijk Zijn voor Honden?</h2>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold text-emerald-800 mb-4">Persin: De Giftige Stof</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Persin is een natuurlijk pesticideachtige stof die de avocadoplant produceert om zich te beschermen tegen
              schimmels en parasieten. Bij mensen is persin harmless, maar veel dieren zijn er gevoelig voor.
              Honden zijn gelukkig minder gevoelig dan vogels, paarden of konijnen, maar kunnen er nog steeds
              maagdarmproblemen van krijgen.
            </p>
            <p className="text-gray-700 leading-relaxed">
              De concentratie persin varieert sterk: de pit en bladeren bevatten de hoogste concentraties,
              gevolgd door de schil. Het vruchtvlees bevat het minste persin, maar kan nog steeds problemen veroorzaken,
              vooral bij gevoelige honden of grotere hoeveelheden.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-emerald-800 mb-4">Gevaren van Verschillende Delen</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold text-xl">⚠️</span>
                <div>
                  <strong className="text-gray-900">De Pit:</strong>
                  <span className="text-gray-700"> Zeer gevaarlijk! Verstikkingsgevaar, darmblokkade en hoog persingehalte. Nooit toegang geven aan honden.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-xl">⚠️</span>
                <div>
                  <strong className="text-gray-900">Bladeren en Stengels:</strong>
                  <span className="text-gray-700"> Hoge persinconcentratie. Vermijd contact, vooral bij planten in huis of tuin.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-600 font-bold text-xl">⚠️</span>
                <div>
                  <strong className="text-gray-900">De Schil:</strong>
                  <span className="text-gray-700"> Bevat meer persin dan het vruchtvlees. Ook moeilijk verteerbaar.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-500 font-bold text-xl">⚠️</span>
                <div>
                  <strong className="text-gray-900">Het Vruchtvlees:</strong>
                  <span className="text-gray-700"> Laagste persingehalte, maar kan nog steeds maagklachten veroorzaken. Hoog vetgehalte kan tot pancreatitis leiden.</span>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Symptoms */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Symptomen van Avocado-inname bij Honden</h2>

          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg shadow-md p-6 mb-4">
            <p className="text-gray-800 mb-4 font-medium">
              Symptomen kunnen variëren van mild (bij kleine hoeveelheden vruchtvlees) tot ernstig (bij pit-inslikking):
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-yellow-700 mb-3">Maagdarmproblemen</h3>
                <ul className="grid md:grid-cols-2 gap-2">
                  <li className="flex items-center gap-2">
                    <span className="text-yellow-500">•</span>
                    <span className="text-gray-700">Braken</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-yellow-500">•</span>
                    <span className="text-gray-700">Diarree</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-yellow-500">•</span>
                    <span className="text-gray-700">Buikpijn en krampen</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-yellow-500">•</span>
                    <span className="text-gray-700">Verminderde eetlust</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-yellow-500">•</span>
                    <span className="text-gray-700">Opgezwollen buik</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-yellow-500">•</span>
                    <span className="text-gray-700">Ongemak en rusteloosheid</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-red-700 mb-3">Ernstige Symptomen (Pit-inslikking of Grote Hoeveelheden)</h3>
                <ul className="grid md:grid-cols-2 gap-2">
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">•</span>
                    <span className="text-gray-700">Verstikking en moeite met ademen</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">•</span>
                    <span className="text-gray-700">Darmblokkade (constipatie, geen ontlasting)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">•</span>
                    <span className="text-gray-700">Heftig braken</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">•</span>
                    <span className="text-gray-700">Lethargie en zwakte</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">•</span>
                    <span className="text-gray-700">Hartproblemen (zeldzaam)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">•</span>
                    <span className="text-gray-700">Vloeistofophoping (zeldzaam)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-100 border-l-4 border-yellow-600 rounded p-4">
            <p className="text-yellow-900 font-semibold">
              ⚠️ Als je vermoedt dat je hond de avocadopit heeft ingeslikt, neem dan onmiddellijk contact op met je dierenarts.
              Dit is een spoedeisende situatie die direct ingrijpen vereist!
            </p>
          </div>
        </section>

        {/* What To Do */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Wat Te Doen Als Je Hond Avocado Heeft Gegeten?</h2>

          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-700 mb-6 leading-relaxed">
              Je actie hangt af van wat je hond precies heeft gegeten. Volg deze stappen:
            </p>

            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  1
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Bepaal Wat Er Gegeten Is</h3>
                  <p className="text-gray-700">
                    Heeft je hond alleen vruchtvlees gegeten, of ook de pit, schil of bladeren?
                    De pit is het gevaarlijkst en vereist onmiddellijke actie.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  2
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Bel Je Dierenarts</h3>
                  <p className="text-gray-700">
                    Neem contact op met je dierenarts, vooral als je hond de pit heeft ingeslikt of grote hoeveelheden
                    heeft gegeten. Bij pit-inslikking is dit spoedeisend!
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  3
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Geef Informatie Door</h3>
                  <p className="text-gray-700">
                    Vertel de dierenarts hoeveel je hond heeft gegeten, welk deel (vruchtvlees/pit/schil),
                    wanneer dit gebeurde, en of er al symptomen zijn.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  4
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Volg Veterinair Advies</h3>
                  <p className="text-gray-700">
                    Bij kleine hoeveelheden vruchtvlees kan monitoring thuis voldoende zijn.
                    Bij pit-inslikking moet je waarschijnlijk direct naar de kliniek voor röntgenfoto's en mogelijk chirurgie.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  5
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Observeer Je Hond</h3>
                  <p className="text-gray-700">
                    Houd je hond de komende 24-48 uur goed in de gaten. Let op tekenen van maagdarmproblemen,
                    verstikking of darmblokkade. Neem bij elk symptoom direct contact op met je dierenarts.
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
              Direct bellen bij deze situaties:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">⚠️</span>
                <span className="text-gray-700"><strong>Je hond heeft de avocadopit ingeslikt</strong> - Dit is spoedeisend!</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 font-bold">⚠️</span>
                <span className="text-gray-700">Je hond heeft grote hoeveelheden avocado gegeten</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">⚠️</span>
                <span className="text-gray-700">Je hond vertoont symptomen zoals braken of diarree</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">⚠️</span>
                <span className="text-gray-700">Je hond heeft bladeren of schil gegeten</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span className="text-gray-700">Je bent onzeker over de hoeveelheid of het risico</span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Kleine honden, pups en honden met een gevoelig maag-darmstelsel lopen extra risico.
              <strong> Bij twijfel altijd bellen</strong> - het is beter om voorzichtig te zijn.
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
                Veilige Opslag
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Bewaar avocado's buiten bereik van je hond</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Gooi avocadopitten in een gesloten vuilnisbak</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Ruim schillen en resten direct op</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Leg geen avocado op lage tafels of aanrechten</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🌱</span>
                Avocadoplanten
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Houd avocadoplanten buiten bereik van huisdieren</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Bladeren bevatten veel persin - vermijd contact</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Afgevallen bladeren direct opruimen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Kies voor huisdiervriendelijke planten</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🍽️</span>
                Veilige Alternatieven
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Gebruik visolie voor gezonde omega-3 vetten</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Pompoen is een veilig en gezond alternatief</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Zoete aardappel bevat gezonde voedingsstoffen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Raadpleeg je dierenarts voor voedingsadvies</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">👨‍👩‍👧‍👦</span>
                Educatie & Bewustzijn
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Leer kinderen geen avocado te delen met de hond</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Waarschuw gasten over de gevaren</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Let extra op bij picknicks en barbecues</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Controleer de tuin op gevallen vruchten</span>
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
                <span>Is avocado giftig voor honden?</span>
                <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-4 leading-relaxed">
                Avocado bevat persin, een stof die maagklachten kan veroorzaken bij honden. Hoewel honden minder gevoelig
                zijn dan sommige andere dieren, kan avocado nog steeds braken en diarree veroorzaken. De pit is het gevaarlijkst
                vanwege verstikkings- en verstoppingsgevaar. Het is het beste om avocado helemaal te vermijden.
                Neem contact op met je dierenarts als je hond avocado heeft gegeten.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-md p-6 group">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex justify-between items-center">
                <span>Wat is persin en waarom is het gevaarlijk?</span>
                <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-4 leading-relaxed">
                Persin is een natuurlijke schimmeldodende stof die in avocado's voorkomt, vooral in het blad, de schil en de pit.
                Bij honden kan persin maagdarmproblemen veroorzaken zoals braken en diarree. Het hoogste persingehalte zit in de pit
                en het blad. Hoewel honden relatief resistent zijn, kunnen ze er nog steeds ziek van worden.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-md p-6 group">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex justify-between items-center">
                <span>Is de avocadopit gevaarlijk voor honden?</span>
                <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-4 leading-relaxed">
                Ja, de avocadopit is zeer gevaarlijk. Naast het hoge persingehalte vormt de pit een ernstig verstikkings- en
                verstoppingsgevaar. Een ingeslikt pit kan de luchtwegen of darmen blokkeren, wat levensbedreigend is en
                vaak chirurgie vereist. Zorg dat je hond nooit toegang heeft tot avocadopitten en gooi ze direct weg in een
                gesloten vuilnisbak.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-md p-6 group">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex justify-between items-center">
                <span>Kunnen honden een beetje avocado eten?</span>
                <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-4 leading-relaxed">
                Het is het beste om avocado helemaal te vermijden. Hoewel kleine hoeveelheden vruchtvlees soms geen problemen
                geven, is het risico aanwezig en varieert de gevoeligheid per hond. Daarnaast bevat avocado veel vet, wat
                tot pancreatitis kan leiden. Er zijn veiligere alternatieven voor gezonde vetten in de voeding van je hond,
                zoals visolie. Raadpleeg je dierenarts voor voedingsadvies.
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
            <strong>Bij vermoeden dat je hond de avocadopit heeft ingeslikt, moet je onmiddellijk contact opnemen
            met je dierenarts of de dierennoodhulp.</strong> Dit is een spoedeisende situatie. Ook bij andere vormen
            van avocado-inname kun je beter voorzichtig zijn en advies inwinnen.
          </p>
        </section>
      </article>
    </div>
  );
}
