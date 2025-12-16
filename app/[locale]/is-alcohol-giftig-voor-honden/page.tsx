import type { Metadata } from 'next';
import Link from 'next/link';
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: 'Is Alcohol Giftig voor Honden? Ethanol Vergiftiging & Symptomen | CutiePawsPedia',
  description: 'Alcohol is zeer giftig voor honden en kan leiden tot ethanol vergiftiging. Leer de symptomen herkennen, wat te doen bij inname, en hoe je je hond beschermt.',
  keywords: 'alcohol giftig honden, hond alcohol gedronken, ethanol vergiftiging, alcoholvergiftiging hond, symptomen alcohol hond, dierenarts spoed',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Is Alcohol Giftig voor Honden? Ethanol Vergiftiging & Symptomen',
    description: 'Alcohol is zeer giftig voor honden. Ontdek waarom, welke symptomen je moet herkennen en wat te doen bij inname.',
    type: 'article',
    locale: 'nl_NL',
  },
};

export default function AlcoholGiftigVoorHondenPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Is Alcohol Giftig voor Honden? Ethanol Vergiftiging & Symptomen',
            description: 'Alcohol is zeer giftig voor honden en kan leiden tot ethanol vergiftiging. Leer de symptomen herkennen en wat te doen bij inname.',
            author: {
              '@type': 'Organization',
              name: 'CutiePawsPedia',
            },
            datePublished: '2025-12-15',
            dateModified: '2025-12-15',
            image: 'https://cutiepawspedia.com/images/alcohol-dogs-danger.jpg',
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
                name: 'Waarom is alcohol zo gevaarlijk voor honden?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Honden zijn veel gevoeliger voor alcohol dan mensen. Hun lichaam kan ethanol slecht verwerken, waardoor zelfs kleine hoeveelheden ernstige vergiftigingsverschijnselen kunnen veroorzaken. Alcohol beïnvloedt het centraal zenuwstelsel en kan leiden tot ademhalingsproblemen, coma en de dood.',
                },
              },
              {
                '@type': 'Question',
                name: 'Hoelang duurt het voordat symptomen van alcoholvergiftiging verschijnen?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Symptomen van alcoholvergiftiging bij honden kunnen binnen 30 tot 60 minuten na inname optreden. In sommige gevallen verschijnen symptomen nog sneller. Neem altijd onmiddellijk contact op met je dierenarts als je vermoedt dat je hond alcohol heeft ingenomen.',
                },
              },
              {
                '@type': 'Question',
                name: 'Kan alcohol dodelijk zijn voor honden?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Ja, alcohol kan dodelijk zijn voor honden, vooral bij kleine honden of grotere hoeveelheden. Ethanol vergiftiging kan leiden tot ademhalingsproblemen, bloedsuikerdaling, hypothermie en uiteindelijk coma en overlijden. Alcoholvergiftiging is een levensbedreigende noodsituatie.',
                },
              },
              {
                '@type': 'Question',
                name: 'Zitten er ook andere producten met alcohol waar ik op moet letten?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Ja, let ook op producten zoals mondwater, parfum, aftershave, ontsmettingsmiddelen, handdesinfecterende gel, rotend fruit, en rauwe brooddeeg (gist produceert alcohol). Al deze producten kunnen ethanol bevatten en zijn gevaarlijk voor honden.',
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
            currentPage="Alcohol voor Honden"
          />

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 mt-6">
            Is Alcohol Giftig voor Honden?
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Voedsel/Drank</span>
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
              <h2 className="text-2xl font-bold text-red-900 mb-2">Ja, alcohol is zeer giftig voor honden</h2>
              <p className="text-gray-800 leading-relaxed">
                Alcohol (ethanol) is <strong>extreem gevaarlijk</strong> voor honden. Hun lichaam kan ethanol veel moeilijker verwerken dan dat van mensen.
                <strong> Zelfs kleine hoeveelheden kunnen leiden tot ernstige vergiftiging</strong> met symptomen zoals desoriëntatie,
                braken, ademhalingsproblemen en bewustzijnsverlies. In ernstige gevallen kan alcoholvergiftiging leiden tot
                <strong> coma en de dood</strong>. Let ook op verborgen alcoholbronnen zoals mondwater, rauwe brooddeeg en rotend fruit.
                <strong className="text-red-700"> Alcoholvergiftiging is een levensbedreigende noodsituatie - bel onmiddellijk je dierenarts!</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <section className="mb-12">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Wat voor mensen een ontspannend drankje kan zijn, is voor honden een levensgevaarlijke gif.
              Honden zijn veel gevoeliger voor alcohol dan mensen en kunnen zelfs bij kleine hoeveelheden
              ernstige gezondheidsschade oplopen. Helaas gebeurt alcoholvergiftiging bij honden vaker dan je zou denken,
              vooral tijdens feestjes, barbecues en de feestdagen.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Het gevaarlijke aan alcohol zit hem in <strong>ethanol</strong>, de werkzame stof in alcoholische dranken.
              Honden kunnen ethanol veel moeilijker afbreken dan mensen. Hun lever is niet uitgerust om deze stof
              efficiënt te verwerken, waardoor ethanol langer in hun systeem blijft en meer schade aanricht.
              Het beïnvloedt het <strong>centraal zenuwstelsel</strong>, de ademhaling en de bloedsuikerspiegel.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Naast alcoholische dranken zijn er ook andere producten met ethanol waar je op moet letten:
              mondwater, parfum, ontsmettingsmiddelen, handgel en zelfs <strong>rauwe brooddeeg</strong> (de gist produceert alcohol).
              Ook rotend fruit kan ethanol bevatten. Het is cruciaal om je hond altijd weg te houden van alle
              vormen van alcohol en producten die ethanol bevatten.
            </p>
          </div>
        </section>

        {/* Why Dangerous */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Waarom is Alcohol Zo Gevaarlijk voor Honden?</h2>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold text-emerald-800 mb-4">Ethanol Vergiftiging</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Ethanol is de werkzame stof in alle alcoholische dranken. Bij honden wordt ethanol geabsorbeerd via
              de maag en dunne darm en komt snel in de bloedbaan terecht. Omdat honden ethanol veel langzamer
              afbreken dan mensen, stapelt het zich op en beïnvloedt het verschillende orgaansystemen:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span className="text-gray-700"><strong>Centraal Zenuwstelsel:</strong> Veroorzaakt desoriëntatie, coördinatieverlies en bewustzijnsverlies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span className="text-gray-700"><strong>Ademhalingssysteem:</strong> Remt de ademhaling, kan leiden tot zuurstoftekort</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span className="text-gray-700"><strong>Metabolisme:</strong> Veroorzaakt gevaarlijke bloedsuikerdaling (hypoglycemie)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span className="text-gray-700"><strong>Lichaamstemperatuur:</strong> Kan leiden tot onderkoeling (hypothermie)</span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              De combinatie van deze effecten maakt alcoholvergiftiging levensgevaarlijk en vereist onmiddellijke
              medische behandeling.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-emerald-800 mb-4">Verborgen Alcoholbronnen</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold text-xl">⚠️</span>
                <div>
                  <strong className="text-gray-900">Rauwe Brooddeeg:</strong>
                  <span className="text-gray-700"> De gist fermenteert en produceert ethanol in de warme maag. Kan ook maagdilatatie veroorzaken.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-xl">⚠️</span>
                <div>
                  <strong className="text-gray-900">Mondwater & Parfum:</strong>
                  <span className="text-gray-700"> Bevatten vaak hoge concentraties ethanol. Zelfs kleine hoeveelheden zijn gevaarlijk.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-xl">⚠️</span>
                <div>
                  <strong className="text-gray-900">Handdesinfecterende Gel:</strong>
                  <span className="text-gray-700"> Bevat vaak 60-95% ethanol. Zeer gevaarlijk bij inname.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-xl">⚠️</span>
                <div>
                  <strong className="text-gray-900">Rotend Fruit:</strong>
                  <span className="text-gray-700"> Fermentatie produceert ethanol. Let op gevallen fruit in de tuin.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-600 font-bold text-xl">⚠️</span>
                <div>
                  <strong className="text-gray-900">Alcoholische Desserts:</strong>
                  <span className="text-gray-700"> Rum baba, tiramisu, eierlikeur gebak - allemaal gevaarlijk.</span>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Symptoms */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Symptomen van Alcoholvergiftiging bij Honden</h2>

          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg shadow-md p-6 mb-4">
            <p className="text-gray-800 mb-4 font-medium">
              Symptomen kunnen binnen 30 tot 60 minuten na inname optreden. De ernst hangt af van de hoeveelheid en het lichaamsgewicht:
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-orange-700 mb-3">Vroege Symptomen (Milde Vergiftiging)</h3>
                <ul className="grid md:grid-cols-2 gap-2">
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    <span className="text-gray-700">Desoriëntatie en verwardheid</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    <span className="text-gray-700">Wankelen en coördinatieverlies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    <span className="text-gray-700">Luide ademhaling en hijgen</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    <span className="text-gray-700">Braken en misselijkheid</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    <span className="text-gray-700">Overmatig speekselen</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    <span className="text-gray-700">Alcoholgeur uit de bek</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-red-700 mb-3">Ernstige Symptomen (Levensgevaarlijk)</h3>
                <ul className="grid md:grid-cols-2 gap-2">
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">•</span>
                    <span className="text-gray-700">Tremoren en aanvallen</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">•</span>
                    <span className="text-gray-700">Extreme lethargie of bewusteloosheid</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">•</span>
                    <span className="text-gray-700">Langzame of moeizame ademhaling</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">•</span>
                    <span className="text-gray-700">Lage lichaamstemperatuur (hypothermie)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">•</span>
                    <span className="text-gray-700">Lage bloedsuikerspiegel (hypoglycemie)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">•</span>
                    <span className="text-gray-700">Lage hartslag</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">•</span>
                    <span className="text-gray-700">Coma</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">•</span>
                    <span className="text-gray-700">Hartfalen en de dood</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-red-100 border-l-4 border-red-600 rounded p-4">
            <p className="text-red-900 font-semibold">
              Alcoholvergiftiging is een levensbedreigende medische noodsituatie. Neem onmiddellijk contact op met je dierenarts
              of de dierennoodhulp als je vermoedt dat je hond alcohol heeft ingenomen.
            </p>
          </div>
        </section>

        {/* What To Do */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Wat Te Doen Als Je Hond Alcohol Heeft Gedronken?</h2>

          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-700 mb-6 leading-relaxed">
              Dit is een SPOEDEISENDE situatie. Elke minuut telt. Volg deze stappen onmiddellijk:
            </p>

            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  1
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Bel direct je dierenarts</h3>
                  <p className="text-gray-700">
                    Dit is een levensbedreigende situatie. Bel onmiddellijk je dierenarts of de dierennoodhulp.
                    Zeg dat het om alcoholvergiftiging gaat - dit is een spoedgeval!
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  2
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Verzamel Cruciale Informatie</h3>
                  <p className="text-gray-700">
                    Welk type alcohol (bier, wijn, sterkedrank), hoeveel (bij benadering), het alcoholpercentage,
                    hoe lang geleden de inname was, en het gewicht van je hond. Deze informatie is cruciaal voor behandeling.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  3
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Niet zelf braken opwekken</h3>
                  <p className="text-gray-700">
                    Wek NOOIT zelf braken op bij alcoholvergiftiging. Dit kan leiden tot aspiratie (alcohol in de longen)
                    of andere complicaties. Alleen een dierenarts kan veilig bepalen wat te doen.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  4
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Ga direct naar de dierenartskliniek</h3>
                  <p className="text-gray-700">
                    Verlies geen tijd. Breng je hond onmiddellijk naar de dichtstbijzijnde dierennoodkliniek.
                    Houd je hond warm tijdens transport (alcohol kan onderkoeling veroorzaken).
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  5
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Monitor Vitale Functies</h3>
                  <p className="text-gray-700">
                    Let op ademhaling, bewustzijn en lichaamstemperatuur tijdens transport. Informeer de dierenarts
                    direct als je hond bewusteloos raakt of stopt met ademen.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  6
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Verwachte Behandeling</h3>
                  <p className="text-gray-700">
                    De dierenarts zal waarschijnlijk infuustherapie geven, bloedsuikerspiegels monitoren,
                    lichaamstemperatuur stabiliseren en mogelijk actieve kool toedienen. Ernstige gevallen kunnen
                    opname vereisen met zuurstoftherapie en intensieve monitoring.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* When to Contact Vet */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Wanneer Contact Opnemen met de Dierenarts?</h2>

          <div className="bg-red-50 border-l-4 border-red-600 rounded-lg p-6">
            <p className="text-lg font-semibold text-red-900 mb-4">
              Alcoholvergiftiging vereist altijd onmiddellijke veterinaire hulp
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Bij elk vermoeden van alcoholinname moet je onmiddellijk handelen. Wacht niet op symptomen -
              tegen de tijd dat symptomen verschijnen, is de alcohol al geabsorbeerd en kan de situatie snel verslechteren.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">⚠️</span>
                <span className="text-gray-700">Zelfs een kleine hoeveelheid alcohol kan dodelijk zijn voor kleine honden</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">⚠️</span>
                <span className="text-gray-700">Symptomen kunnen snel verslechteren - elke minuut telt</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">⚠️</span>
                <span className="text-gray-700">Zonder behandeling kan alcoholvergiftiging leiden tot coma en overlijden</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">⚠️</span>
                <span className="text-gray-700">Vroege interventie kan levensreddend zijn</span>
              </li>
            </ul>
            <p className="text-red-900 font-bold text-lg">
              Neem direct contact op met je dierenarts. Dit is een medisch noodgeval dat onmiddellijke professionele beoordeling vereist.
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
                  <span className="text-gray-700">Bewaar alcohol altijd in gesloten kasten</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Laat geen glazen met alcohol onbeheerd achter</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Ruim morsen direct op</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Gooi lege blikjes/flessen direct weg in gesloten bak</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🎉</span>
                Feesten & Evenementen
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Houd honden weg van feesttafels met alcohol</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Waarschuw gasten om geen alcohol te delen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Controleer de omgeving na het feest op gemorste alcohol</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Overweeg je hond in een veilige ruimte te houden tijdens feesten</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🧴</span>
                Andere Alcoholproducten
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Bewaar mondwater, parfum en aftershave buiten bereik</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Houd handdesinfecterende gel op hoogte</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Sluit ontsmettingsmiddelen veilig af</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Let op producten met alcoholgeur</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🍞</span>
                Keuken & Voedsel
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Bewaar rauwe brooddeeg buiten bereik (fermenteert tot alcohol)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Geef geen alcoholische desserts of sauzen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Ruim rotend fruit in de tuin op</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Let op gevallen appels en ander fruit in herfst</span>
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
                <span>Waarom is alcohol zo gevaarlijk voor honden?</span>
                <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-4 leading-relaxed">
                Honden zijn veel gevoeliger voor alcohol dan mensen. Hun lichaam kan ethanol slecht verwerken,
                waardoor zelfs kleine hoeveelheden ernstige vergiftigingsverschijnselen kunnen veroorzaken.
                Alcohol beïnvloedt het centraal zenuwstelsel, remt de ademhaling, veroorzaakt bloedsuikerdaling
                en kan leiden tot onderkoeling. In ernstige gevallen kan het leiden tot coma en de dood.
                Alcoholvergiftiging is een medisch noodgeval.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-md p-6 group">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex justify-between items-center">
                <span>Hoelang duurt het voordat symptomen van alcoholvergiftiging verschijnen?</span>
                <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-4 leading-relaxed">
                Symptomen van alcoholvergiftiging bij honden kunnen binnen 30 tot 60 minuten na inname optreden.
                In sommige gevallen verschijnen symptomen nog sneller, vooral bij sterke drank of kleine honden.
                De symptomen kunnen snel verslechteren, daarom is het cruciaal om onmiddellijk contact op te nemen
                met je dierenarts als je vermoedt dat je hond alcohol heeft ingenomen, ook als er nog geen symptomen zijn.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-md p-6 group">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex justify-between items-center">
                <span>Kan alcohol dodelijk zijn voor honden?</span>
                <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-4 leading-relaxed">
                Ja, alcohol kan dodelijk zijn voor honden, vooral bij kleine honden of grotere hoeveelheden.
                Ethanol vergiftiging kan leiden tot ademhalingsproblemen, bloedsuikerdaling, hypothermie en
                uiteindelijk coma en overlijden. Alcoholvergiftiging is een levensbedreigende noodsituatie die
                onmiddellijke veterinaire zorg vereist. Met snelle behandeling kunnen veel honden herstellen,
                maar elke minuut telt.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-md p-6 group">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex justify-between items-center">
                <span>Zitten er ook andere producten met alcohol waar ik op moet letten?</span>
                <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-4 leading-relaxed">
                Ja, let ook op producten zoals mondwater, parfum, aftershave, ontsmettingsmiddelen,
                handdesinfecterende gel (vaak 60-95% ethanol), rauwe brooddeeg (gist produceert alcohol tijdens fermentatie),
                en rotend fruit. Al deze producten kunnen ethanol bevatten en zijn gevaarlijk voor honden.
                Bewaar ze altijd buiten bereik en wees extra voorzichtig na gebruik.
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
            <strong className="text-red-700">Alcoholvergiftiging is een levensbedreigende noodsituatie.
            Neem onmiddellijk contact op met je dierenarts of de dierennoodhulp als je vermoedt dat je hond alcohol heeft ingenomen.
            Wacht niet op symptomen.</strong> Vroege behandeling kan levensreddend zijn.
          </p>
        </section>
      </article>
    </div>
  );
}
