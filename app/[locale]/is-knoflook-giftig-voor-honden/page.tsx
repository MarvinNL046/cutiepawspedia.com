import type { Metadata } from 'next';
import Link from 'next/link';
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: 'Is Knoflook Giftig voor Honden? Gevaren & Symptomen | CutiePawsPedia',
  description: 'Knoflook is giftig voor honden en kan bloedarmoede veroorzaken. Leer waarom Allium-groenten gevaarlijk zijn, welke symptomen je moet herkennen, en wat te doen bij inname.',
  keywords: 'knoflook giftig honden, hond knoflook gegeten, allium vergiftiging, bloedarmoede hond, symptomen knoflook hond, dierenarts spoed',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Is Knoflook Giftig voor Honden? Gevaren & Symptomen',
    description: 'Knoflook is giftig voor honden. Ontdek waarom, welke symptomen je moet herkennen en wat te doen bij inname.',
    type: 'article',
    locale: 'nl_NL',
  },
};

export default function KnoflookGiftigVoorHondenPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Is Knoflook Giftig voor Honden? Gevaren & Symptomen',
            description: 'Knoflook is giftig voor honden en kan bloedarmoede veroorzaken. Leer de symptomen herkennen en wat te doen bij inname.',
            author: {
              '@type': 'Organization',
              name: 'CutiePawsPedia',
            },
            datePublished: '2025-12-15',
            dateModified: '2025-12-15',
            image: 'https://cutiepawspedia.com/images/garlic-dogs-danger.jpg',
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
                name: 'Waarom is knoflook giftig voor honden?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Knoflook bevat stoffen die de rode bloedcellen van honden beschadigen, wat kan leiden tot bloedarmoede. Dit geldt voor alle vormen van knoflook: vers, gedroogd, poeder of gekookt. Neem altijd contact op met je dierenarts als je hond knoflook heeft gegeten.',
                },
              },
              {
                '@type': 'Question',
                name: 'Hoelang duren symptomen van knoflookvergiftiging?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Symptomen van knoflookvergiftiging kunnen enkele dagen na inname optreden en kunnen een week of langer aanhouden. De ernst hangt af van de hoeveelheid knoflook en de grootte van je hond. Professionele veterinaire zorg is altijd nodig.',
                },
              },
              {
                '@type': 'Question',
                name: 'Zijn uien ook giftig voor honden?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Ja, uien behoren tot dezelfde familie als knoflook (Allium) en zijn eveneens giftig voor honden. Dit geldt ook voor prei, bieslook en sjalotten. Alle Allium-groenten moeten vermeden worden.',
                },
              },
              {
                '@type': 'Question',
                name: 'Kan knoflookpoeder ook schadelijk zijn?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Ja, knoflookpoeder is geconcentreerd en daarom extra gevaarlijk voor honden. Een kleine hoeveelheid knoflookpoeder bevat meer van de schadelijke stoffen dan verse knoflook. Let daarom goed op bij gekruid eten.',
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
            currentPage="Knoflook voor Honden"
          />

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 mt-6">
            Is Knoflook Giftig voor Honden?
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
              <h2 className="text-2xl font-bold text-orange-900 mb-2">Ja - Knoflook is giftig voor honden</h2>
              <p className="text-gray-800 leading-relaxed">
                Knoflook behoort tot de <strong>Allium-familie</strong> en bevat stoffen die de rode bloedcellen van honden beschadigen.
                Dit kan leiden tot <strong>bloedarmoede (anemie)</strong>, zelfs bij matige hoeveelheden.
                Alle vormen van knoflook zijn gevaarlijk: <strong>vers, gedroogd, poeder, of gekookt</strong>.
                Symptomen kunnen enkele dagen na inname optreden.
                <strong className="text-orange-700"> Neem altijd contact op met je dierenarts als je hond knoflook heeft gegeten.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <section className="mb-12">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Knoflook wordt door veel mensen als gezond beschouwd en wordt vaak gebruikt in de keuken.
              Sommige huisdiereneigenaren denken zelfs dat knoflook gezond is voor honden, maar niets is minder waar.
              Knoflook is giftig voor honden en kan ernstige gezondheidsproblemen veroorzaken.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Het gevaarlijke aan knoflook zit hem in stoffen genaamd <strong>organosulfoxide-verbindingen</strong>,
              die de rode bloedcellen van honden beschadigen. Hierdoor kunnen de bloedcellen geen zuurstof meer
              vervoeren, wat leidt tot bloedarmoede. Deze schade is cumulatief, wat betekent dat ook kleine
              hoeveelheden over tijd schadelijk kunnen zijn.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Knoflook is deel van de Allium-familie, waar ook uien, prei, bieslook en sjalotten toe behoren.
              Alle leden van deze plantenfamilie zijn giftig voor honden. Het maakt niet uit in welke vorm:
              verse knoflook, gedroogde knoflook, knoflookpoeder of gekookte knoflook zijn allemaal schadelijk.
            </p>
          </div>
        </section>

        {/* Why Dangerous */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Waarom is Knoflook Gevaarlijk voor Honden?</h2>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold text-emerald-800 mb-4">Beschadiging van Rode Bloedcellen</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Knoflook bevat organosulfoxide-verbindingen die de rode bloedcellen van honden oxideren en beschadigen.
              Deze beschadigde bloedcellen kunnen geen zuurstof meer transporteren en worden afgebroken door het lichaam.
              Dit proces heet <strong>hemolytische anemie</strong> of bloedarmoede.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Het lichaam van je hond probeert nieuwe rode bloedcellen aan te maken, maar als de inname doorgaat
              of de hoeveelheid groot genoeg was, kan het lichaam dit niet bijhouden. Dit leidt tot vermoeidheid,
              zwakte en in ernstige gevallen orgaanfalen door zuurstoftekort.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-emerald-800 mb-4">De Allium-Familie</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Knoflook is een van de meest giftige leden van de Allium-familie voor honden.
              Andere gevaarlijke Allium-groenten zijn:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-xl">⚠️</span>
                <div>
                  <strong className="text-gray-900">Uien:</strong>
                  <span className="text-gray-700"> Zeer giftig, zowel rauw, gekookt als gedroogd. Ook uienpoeder is gevaarlijk.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-xl">⚠️</span>
                <div>
                  <strong className="text-gray-900">Prei:</strong>
                  <span className="text-gray-700"> Kan dezelfde symptomen veroorzaken als knoflook en uien.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-xl">⚠️</span>
                <div>
                  <strong className="text-gray-900">Bieslook:</strong>
                  <span className="text-gray-700"> Ook in kleine hoeveelheden schadelijk voor honden.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-xl">⚠️</span>
                <div>
                  <strong className="text-gray-900">Sjalotten:</strong>
                  <span className="text-gray-700"> Bevatten dezelfde schadelijke stoffen als knoflook en uien.</span>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Symptoms */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Symptomen van Knoflookvergiftiging bij Honden</h2>

          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg shadow-md p-6 mb-4">
            <p className="text-gray-800 mb-4 font-medium">
              Symptomen van knoflookvergiftiging kunnen enkele dagen na inname optreden.
              Let goed op de volgende signalen:
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-orange-700 mb-3">Vroege Symptomen</h3>
                <ul className="grid md:grid-cols-2 gap-2">
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
                    <span className="text-gray-700">Maagpijn en buikkrampen</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    <span className="text-gray-700">Verminderde eetlust</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    <span className="text-gray-700">Speekselen</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    <span className="text-gray-700">Knoflookgeur uit de bek</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-red-700 mb-3">Tekenen van Bloedarmoede</h3>
                <ul className="grid md:grid-cols-2 gap-2">
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">•</span>
                    <span className="text-gray-700">Vermoeidheid en lethargie</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">•</span>
                    <span className="text-gray-700">Bleke tandvlees en tong</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">•</span>
                    <span className="text-gray-700">Snelle ademhaling en hijgen</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">•</span>
                    <span className="text-gray-700">Verhoogde hartslag</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">•</span>
                    <span className="text-gray-700">Zwakte en wankelen</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">•</span>
                    <span className="text-gray-700">Donkere of rode urine</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">•</span>
                    <span className="text-gray-700">Geelzucht (gele huid/ogen)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">•</span>
                    <span className="text-gray-700">Flauwvallen of collaps</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-orange-100 border-l-4 border-orange-600 rounded p-4">
            <p className="text-orange-900 font-semibold">
              ⚠️ Symptomen kunnen pas enkele dagen na inname verschijnen. Neem altijd direct contact op met je dierenarts
              als je vermoedt dat je hond knoflook heeft gegeten, ook als er nog geen symptomen zijn.
            </p>
          </div>
        </section>

        {/* What To Do */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Wat Te Doen Als Je Hond Knoflook Heeft Gegeten?</h2>

          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-700 mb-6 leading-relaxed">
              Bij vermoeden van knoflookinname is snelle actie belangrijk. Volg deze stappen:
            </p>

            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  1
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Bel Direct Je Dierenarts</h3>
                  <p className="text-gray-700">
                    Neem onmiddellijk contact op met je dierenarts, ook als er nog geen symptomen zijn.
                    Vertel hoeveel knoflook je hond ongeveer heeft gegeten en wanneer dit gebeurde.
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
                    Probeer te achterhalen welke vorm van knoflook je hond heeft gegeten (vers, poeder, gekookt)
                    en hoeveel (bij benadering). Dit helpt de dierenarts bij het inschatten van de ernst.
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
                    De dierenarts kan adviseren om direct naar de kliniek te komen voor behandeling.
                    Dit kan bestaan uit braken opwekken, actieve kool toedienen of andere maatregelen.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  4
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Houd Je Hond in de Gaten</h3>
                  <p className="text-gray-700">
                    Observeer je hond goed de komende dagen. Let vooral op symptomen van bloedarmoede
                    zoals vermoeidheid, bleke tandvlees en snelle ademhaling.
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
                    Bij ernstige gevallen kan je hond opgenomen moeten worden voor bloedtransfusies,
                    infuustherapie of andere ondersteunende behandeling. Volg het advies van je dierenarts nauwkeurig op.
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
              Altijd contact opnemen bij vermoeden van knoflookinname!
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Omdat symptomen pas dagen later kunnen optreden, is het belangrijk om direct contact op te nemen
              met je dierenarts als je vermoedt dat je hond knoflook heeft gegeten. Vroege interventie kan
              ernstige complicaties voorkomen.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span className="text-gray-700">Kleine honden zijn gevoeliger dan grote honden</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span className="text-gray-700">Knoflookpoeder is geconcentreerder en gevaarlijker</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span className="text-gray-700">Herhaalde kleine innames kunnen zich ophopen</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span className="text-gray-700">Sommige hondenrassen zijn gevoeliger (o.a. Japanse rassen)</span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              <strong>Wacht niet tot symptomen verschijnen</strong> - preventieve veterinaire zorg kan levensreddend zijn.
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
                Keuken & Voedselopslag
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Bewaar knoflook buiten bereik van je hond</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Ruim knoflookschillen direct op tijdens koken</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Leg geen knoflook op lage tafels of aanrechten</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Gooi etensresten met knoflook in een afsluitbare vuilnisbak</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🍽️</span>
                Maaltijden & Tafelresten
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Geef je hond geen tafelresten met knoflook</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Controleer ingrediënten van mensenvoeding die je deelt</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Pas op met kant-en-klaar eten (vaak knoflookpoeder)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Leer kinderen geen eten met de hond te delen</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">⚕️</span>
                Supplementen & "Natuurlijke" Middelen
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Gebruik NOOIT knoflook als "natuurlijk" vlooienmiddel</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Raadpleeg altijd een dierenarts voor supplementen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Wees sceptisch over "natuurlijke" hondenmiddelen met knoflook</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Kies voor wetenschappelijk onderbouwde dierproducten</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🌱</span>
                Tuin & Groenten
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Omhein knoflookplanten in je tuin</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Let ook op wilde knoflook (daslook)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Houd je hond weg tijdens het tuinieren met Allium-planten</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Ruim afval van knoflookplanten direct op</span>
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
                <span>Waarom is knoflook giftig voor honden?</span>
                <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-4 leading-relaxed">
                Knoflook bevat stoffen die de rode bloedcellen van honden beschadigen, wat kan leiden tot bloedarmoede.
                Dit geldt voor alle vormen van knoflook: vers, gedroogd, poeder of gekookt.
                Het lichaam van honden kan deze stoffen niet goed afbreken, waardoor ze zich ophopen en schade veroorzaken.
                Neem altijd contact op met je dierenarts als je hond knoflook heeft gegeten.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-md p-6 group">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex justify-between items-center">
                <span>Hoelang duren symptomen van knoflookvergiftiging?</span>
                <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-4 leading-relaxed">
                Symptomen van knoflookvergiftiging kunnen enkele dagen na inname optreden en kunnen een week of langer aanhouden.
                De ernst hangt af van de hoeveelheid knoflook en de grootte van je hond. Professionele veterinaire zorg is altijd nodig,
                omdat bloedarmoede ernstige complicaties kan veroorzaken als het niet behandeld wordt.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-md p-6 group">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex justify-between items-center">
                <span>Zijn uien ook giftig voor honden?</span>
                <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-4 leading-relaxed">
                Ja, uien behoren tot dezelfde familie als knoflook (Allium) en zijn eveneens giftig voor honden.
                Dit geldt ook voor prei, bieslook en sjalotten. Alle Allium-groenten bevatten stoffen die de rode bloedcellen
                van honden beschadigen en moeten daarom vermeden worden. Zowel rauwe, gekookte als gedroogde vormen zijn gevaarlijk.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-md p-6 group">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex justify-between items-center">
                <span>Kan knoflookpoeder ook schadelijk zijn?</span>
                <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-4 leading-relaxed">
                Ja, knoflookpoeder is geconcentreerd en daarom extra gevaarlijk voor honden. Een kleine hoeveelheid knoflookpoeder
                bevat meer van de schadelijke stoffen dan verse knoflook. Let daarom goed op bij gekruid eten, babyvoeding,
                bouillonblokjes en kant-en-klaar maaltijden, waar vaak knoflookpoeder in verwerkt zit.
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
            <strong>Bij vermoeden van knoflookvergiftiging moet je altijd direct contact opnemen
            met je dierenarts of de dierennoodhulp.</strong> Vroege behandeling kan het verschil maken
            en ernstige complicaties zoals bloedarmoede voorkomen.
          </p>
        </section>
      </article>
    </div>
  );
}
