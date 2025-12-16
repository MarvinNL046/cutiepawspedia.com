import type { Metadata } from 'next';
import Link from 'next/link';
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: 'Is Cafeïne Giftig voor Honden? Koffie, Thee & Energiedrankjes | CutiePawsPedia',
  description: 'Cafeïne is zeer giftig voor honden. Leer over de gevaren van koffie, thee en energiedrankjes, symptomen herkennen, en wat te doen bij inname.',
  keywords: 'cafeine giftig honden, hond koffie gedronken, cafeïne vergiftiging, thee energiedrank hond, symptomen cafeine hond, dierenarts spoed',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Is Cafeïne Giftig voor Honden? Koffie, Thee & Energiedrankjes',
    description: 'Cafeïne is zeer giftig voor honden. Ontdek waarom, welke symptomen je moet herkennen en wat te doen bij inname.',
    type: 'article',
    locale: 'nl_NL',
  },
};

export default function CafeineGiftigVoorHondenPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Is Cafeïne Giftig voor Honden? Koffie, Thee & Energiedrankjes',
            description: 'Cafeïne is zeer giftig voor honden. Leer over symptomen en wat te doen bij inname van koffie, thee of energiedrankjes.',
            author: {
              '@type': 'Organization',
              name: 'CutiePawsPedia',
            },
            datePublished: '2025-12-15',
            dateModified: '2025-12-15',
            image: 'https://cutiepawspedia.com/images/caffeine-dogs-danger.jpg',
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
                name: 'Waarom is cafeïne giftig voor honden?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Honden kunnen cafeïne veel moeilijker afbreken dan mensen. Cafeïne stimuleert het zenuwstelsel en het hart, wat bij honden leidt tot hyperactiviteit, verhoogde hartslag, tremoren en in ernstige gevallen aanvallen en hartfalen. Neem altijd contact op met je dierenarts als je hond cafeïne heeft ingenomen.',
                },
              },
              {
                '@type': 'Question',
                name: 'Hoelang duren symptomen van cafeïnevergiftiging?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Symptomen van cafeïnevergiftiging kunnen 1 tot 2 uur na inname optreden en kunnen 12 uur of langer aanhouden. Cafeïne blijft lang in het systeem van honden omdat ze het langzaam afbreken. Professionele veterinaire zorg is altijd nodig.',
                },
              },
              {
                '@type': 'Question',
                name: 'Zijn koffiebonen gevaarlijker dan gebrouwen koffie?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Ja, koffiebonen en koffieprut bevatten veel meer cafeïne dan gebrouwen koffie en zijn daarom gevaarlijker. Ook gebruikt koffieprut dat honden in de tuin vinden kan nog veel cafeïne bevatten. Energiedrankjes en cafeïnepillen zijn ook zeer geconcentreerd en extreem gevaarlijk.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is thee ook gevaarlijk voor honden?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Ja, thee bevat cafeïne en is ook gevaarlijk voor honden, hoewel meestal minder geconcentreerd dan koffie. Groene thee, zwarte thee en vooral matcha bevatten significante hoeveelheden cafeïne. Ook theezakjes kunnen een verstikkingsgevaar vormen als ze worden ingeslikt.',
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
            currentPage="Cafeïne voor Honden"
          />

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 mt-6">
            Is Cafeïne Giftig voor Honden?
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
              <h2 className="text-2xl font-bold text-red-900 mb-2">Ja, cafeïne is zeer giftig voor honden</h2>
              <p className="text-gray-800 leading-relaxed">
                Cafeïne is <strong>extreem gevaarlijk</strong> voor honden en komt voor in koffie, thee, energiedrankjes, chocolade en sommige medicijnen.
                Honden kunnen cafeïne veel moeilijker afbreken dan mensen, waardoor het zich ophoopt in hun systeem.
                Typische symptomen zijn <strong>hyperactiviteit, verhoogde hartslag, tremoren en aanvallen</strong>.
                <strong> Koffiebonen en energiedrankjes zijn bijzonder gevaarlijk</strong> vanwege hun hoge cafeïneconcentratie.
                In ernstige gevallen kan cafeïnevergiftiging leiden tot <strong>hartritmestoornissen en de dood</strong>.
                <strong className="text-red-700"> Neem onmiddellijk contact op met je dierenarts als je hond cafeïne heeft ingenomen!</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <section className="mb-12">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Voor veel mensen is een kopje koffie of thee onmisbaar om de dag te beginnen. Maar wat voor ons
              een energieboost is, kan voor honden levensgevaarlijk zijn. Cafeïne is een stimulerend middel dat
              het zenuwstelsel en het hart beïnvloedt, en honden zijn hier veel gevoeliger voor dan mensen.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Het probleem is dat honden <strong>cafeïne veel langzamer afbreken</strong> dan mensen. Waar cafeïne
              bij mensen binnen enkele uren uit het lichaam is, kan het bij honden 12 uur of langer blijven circuleren.
              Dit leidt tot een ophoping die ernstige vergiftigingsverschijnselen kan veroorzaken, zoals hyperactiviteit,
              tremoren, verhoogde hartslag en in extreme gevallen aanvallen en hartfalen.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Cafeïne komt niet alleen voor in koffie en thee. Ook <strong>energiedrankjes, cola, chocolade, sommige medicijnen</strong>
              en zelfs <strong>gebruikte koffieprut</strong> bevatten cafeïne. Koffiebonen en cafeïnepillen zijn bijzonder gevaarlijk
              vanwege hun geconcentreerde vorm. Het is essentieel om alle cafeïnehoudende producten veilig buiten bereik
              van je hond te bewaren.
            </p>
          </div>
        </section>

        {/* Why Dangerous */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Waarom is Cafeïne Gevaarlijk voor Honden?</h2>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold text-emerald-800 mb-4">Cafeïne als Stimulerend Middel</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Cafeïne is een methylxanthine, net als theobromine in chocolade. Het werkt als een krachtig stimulerend
              middel op verschillende systemen in het lichaam van je hond:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span className="text-gray-700"><strong>Centraal Zenuwstelsel:</strong> Veroorzaakt hyperactiviteit, rusteloosheid en in ernstige gevallen aanvallen</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span className="text-gray-700"><strong>Cardiovasculair Systeem:</strong> Verhoogt hartslag en bloeddruk, kan leiden tot hartritmestoornissen</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span className="text-gray-700"><strong>Maag-Darmkanaal:</strong> Veroorzaakt braken, diarree en maagklachten</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span className="text-gray-700"><strong>Spieren:</strong> Leidt tot tremoren, spiertrillingen en stijfheid</span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Omdat honden cafeïne veel langzamer metaboliseren, blijft het langer in hun systeem en stapelt het
              zich op tot toxische niveaus. Dit maakt cafeïnevergiftiging bijzonder gevaarlijk.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-emerald-800 mb-4">Cafeïnebronnen van Meest naar Minst Gevaarlijk</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold text-xl">⚠️</span>
                <div>
                  <strong className="text-gray-900">Cafeïnepillen/Tabletten:</strong>
                  <span className="text-gray-700"> Extreem geconcentreerd. Een enkele pil kan dodelijk zijn voor een kleine hond.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold text-xl">⚠️</span>
                <div>
                  <strong className="text-gray-900">Koffiebonen:</strong>
                  <span className="text-gray-700"> Zeer hoge cafeïneconcentratie. Al een paar bonen kunnen ernstige symptomen veroorzaken.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold text-xl">⚠️</span>
                <div>
                  <strong className="text-gray-900">Energiedrankjes:</strong>
                  <span className="text-gray-700"> Zeer hoge cafeïnedosis, vaak gecombineerd met andere stimulerende stoffen zoals taurine.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-xl">⚠️</span>
                <div>
                  <strong className="text-gray-900">Koffieprut/Gemalen Koffie:</strong>
                  <span className="text-gray-700"> Bevat nog veel cafeïne. Honden kunnen dit in de tuin vinden als je het als composteert.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-xl">⚠️</span>
                <div>
                  <strong className="text-gray-900">Espresso/Sterke Koffie:</strong>
                  <span className="text-gray-700"> Hoge cafeïneconcentratie per volume. Gevaarlijker dan gewone koffie.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-600 font-bold text-xl">⚠️</span>
                <div>
                  <strong className="text-gray-900">Thee (Zwart/Groen):</strong>
                  <span className="text-gray-700"> Bevat cafeïne, maar meestal minder dan koffie. Matcha bevat veel cafeïne.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-600 font-bold text-xl">⚠️</span>
                <div>
                  <strong className="text-gray-900">Cola & Frisdrank:</strong>
                  <span className="text-gray-700"> Bevat cafeïne en veel suiker. Bij grote hoeveelheden gevaarlijk.</span>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Symptoms */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Symptomen van Cafeïnevergiftiging bij Honden</h2>

          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg shadow-md p-6 mb-4">
            <p className="text-gray-800 mb-4 font-medium">
              Symptomen kunnen binnen 1 tot 2 uur na inname optreden en 12 uur of langer aanhouden:
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-orange-700 mb-3">Vroege Symptomen (Binnen 1-2 Uur)</h3>
                <ul className="grid md:grid-cols-2 gap-2">
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    <span className="text-gray-700">Hyperactiviteit en rusteloosheid</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    <span className="text-gray-700">Verhoogde hartslag (tachycardie)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    <span className="text-gray-700">Hijgen en snelle ademhaling</span>
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
                    <span className="text-gray-700">Overmatige dorst en urineren</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-red-700 mb-3">Ernstige Symptomen (Hoge Doses)</h3>
                <ul className="grid md:grid-cols-2 gap-2">
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
                    <span className="text-gray-700">Hartritmestoornissen (aritmie)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">•</span>
                    <span className="text-gray-700">Hoge bloeddruk (hypertensie)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">•</span>
                    <span className="text-gray-700">Verhoogde lichaamstemperatuur</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">•</span>
                    <span className="text-gray-700">Collaps en bewustzijnsverlies</span>
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
              Cafeïnevergiftiging kan snel levensgevaarlijk worden. Neem bij elk vermoeden van cafeïne-inname
              onmiddellijk contact op met je dierenarts.
            </p>
          </div>
        </section>

        {/* What To Do */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Wat Te Doen Als Je Hond Cafeïne Heeft Ingenomen?</h2>

          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-700 mb-6 leading-relaxed">
              Snelle actie is cruciaal bij cafeïnevergiftiging. Volg deze stappen onmiddellijk:
            </p>

            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  1
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Bel Direct Je Dierenarts</h3>
                  <p className="text-gray-700">
                    Neem onmiddellijk contact op met je dierenarts of de dierennoodhulp. Vertel wat je hond
                    heeft ingenomen (koffie, thee, energiedrank, etc.) en hoeveel (bij benadering).
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  2
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Verzamel Belangrijke Informatie</h3>
                  <p className="text-gray-700">
                    Noteer welke cafeïnebron (koffie, thee, energiedrank, koffiebonen), hoeveel, hoe lang geleden,
                    en het gewicht van je hond. Als het koffie was: espresso of filterkoffie?
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
                    De dierenarts kan adviseren om braken op te wekken als de inname recent was (binnen 30-60 minuten),
                    of om direct naar de kliniek te komen. Wek NOOIT zelf braken op zonder toestemming van een dierenarts.
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
                    Let goed op symptomen zoals hyperactiviteit, verhoogde hartslag, tremoren en braken.
                    Houd je hond rustig en koel, vooral als de lichaamstemperatuur stijgt.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  5
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Verwachte Behandeling</h3>
                  <p className="text-gray-700">
                    Er is geen specifiek tegengif voor cafeïne. Behandeling bestaat uit ondersteunende zorg:
                    braken opwekken, actieve kool toedienen, infuustherapie, medicijnen om hartslag te verlagen,
                    anti-convulsiva bij aanvallen, en monitoring van vitale functies.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  6
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Herstelperiode</h3>
                  <p className="text-gray-700">
                    Symptomen kunnen 12-36 uur aanhouden omdat cafeïne langzaam wordt afgebroken.
                    Volg alle instructies van je dierenarts nauwkeurig op en houd je hond rustig tijdens herstel.
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
              Altijd contact opnemen bij cafeïne-inname!
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Neem direct contact op met je dierenarts als je vermoedt dat je hond cafeïne heeft ingenomen,
              ook als er nog geen symptomen zijn. Vroege interventie kan levensreddend zijn en het ongemak
              voor je hond aanzienlijk verminderen.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">⚠️</span>
                <span className="text-gray-700"><strong>Spoedeisend:</strong> Je hond heeft koffiebonen, cafeïnepillen of energiedrankjes ingenomen</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 font-bold">⚠️</span>
                <span className="text-gray-700"><strong>Zeer urgent:</strong> Je hond vertoont symptomen zoals tremoren, aanvallen of hartritmestoornissen</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">⚠️</span>
                <span className="text-gray-700"><strong>Urgent:</strong> Je hond heeft koffie, thee of cola gedronken</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span className="text-gray-700">Kleine honden en pups zijn extra gevoelig</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span className="text-gray-700">Symptomen kunnen pas na enkele uren verschijnen maar dan snel verergeren</span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              <strong>Wacht niet af</strong> - cafeïne blijft lang in het systeem en symptomen kunnen uren aanhouden.
              Vroege behandeling voorkomt ernstige complicaties.
            </p>
          </div>
        </section>

        {/* Prevention Tips */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Preventie: Hoe Bescherm Je Je Hond?</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">☕</span>
                Koffie & Thee
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Laat nooit koffie of thee onbeheerd achter</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Ruim gebruikt koffieprut direct op (niet in tuin!)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Bewaar koffiebonen in gesloten containers op hoogte</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Gooi theezakjes direct weg in gesloten vuilnisbak</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                Energiedrankjes & Cola
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Bewaar energiedrankjes buiten bereik van honden</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Laat geen open blikjes staan tijdens sport/activiteiten</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Let op gemorste vloeistoffen - ruim direct op</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Waarschuw tieners over de gevaren voor honden</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">💊</span>
                Medicijnen & Supplementen
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Bewaar cafeïnepillen veilig in medicijnkast</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Let op pijnstillers met cafeïne (bijv. Excedrin)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Controleer ingrediënten van pre-workout supplementen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Raadpleeg dierenarts over alle medicijnen in huis</span>
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
                  <span className="text-gray-700">Leer kinderen geen koffie/thee te delen met honden</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Waarschuw gasten en oppas over cafeïnegevaar</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Let extra op tijdens werkdagen (koffiemomenten)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-gray-700">Controleer de omgeving na ontbijt/pauzes</span>
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
                <span>Waarom is cafeïne giftig voor honden?</span>
                <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-4 leading-relaxed">
                Honden kunnen cafeïne veel moeilijker afbreken dan mensen. Cafeïne stimuleert het zenuwstelsel en het hart,
                wat bij honden leidt tot hyperactiviteit, verhoogde hartslag, tremoren en in ernstige gevallen aanvallen en
                hartfalen. Omdat cafeïne lang in hun systeem blijft (12 uur of langer), stapelt het zich op tot toxische niveaus.
                Neem altijd contact op met je dierenarts als je hond cafeïne heeft ingenomen.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-md p-6 group">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex justify-between items-center">
                <span>Hoelang duren symptomen van cafeïnevergiftiging?</span>
                <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-4 leading-relaxed">
                Symptomen van cafeïnevergiftiging kunnen 1 tot 2 uur na inname optreden en kunnen 12 uur of langer aanhouden.
                In sommige gevallen kunnen symptomen zelfs 24-36 uur aanwezig blijven. Cafeïne blijft lang in het systeem van
                honden omdat ze het langzaam afbreken. Professionele veterinaire zorg is altijd nodig, en je hond moet goed
                gemonitord worden tijdens de hele herstelperiode.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-md p-6 group">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex justify-between items-center">
                <span>Zijn koffiebonen gevaarlijker dan gebrouwen koffie?</span>
                <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-4 leading-relaxed">
                Ja, koffiebonen en koffieprut bevatten veel meer cafeïne dan gebrouwen koffie en zijn daarom gevaarlijker.
                Een handvol koffiebonen kan een dodelijke dosis cafeïne bevatten voor een kleine hond. Ook gebruikt koffieprut
                dat in de tuin wordt gecomposteerd kan nog veel cafeïne bevatten. Energiedrankjes en cafeïnepillen zijn ook
                zeer geconcentreerd en extreem gevaarlijk. Gooi koffieprut altijd weg in een gesloten vuilnisbak, niet in de tuin.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-md p-6 group">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex justify-between items-center">
                <span>Is thee ook gevaarlijk voor honden?</span>
                <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-4 leading-relaxed">
                Ja, thee bevat cafeïne en is ook gevaarlijk voor honden, hoewel meestal minder geconcentreerd dan koffie.
                Groene thee, zwarte thee en vooral matcha bevatten significante hoeveelheden cafeïne. Ook theezakjes kunnen
                een verstikkingsgevaar vormen als ze worden ingeslikt. Kruidenthee zonder cafeïne (zoals kamille of rooibos)
                is veiliger, maar het is het beste om helemaal geen thee aan honden te geven. Bewaar theezakjes altijd buiten bereik.
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
            <strong>Bij vermoeden van cafeïnevergiftiging moet je altijd direct contact opnemen
            met je dierenarts of de dierennoodhulp.</strong> Cafeïnevergiftiging kan levensgevaarlijk zijn
            en vereist onmiddellijke medische zorg. Vroege behandeling kan het verschil maken tussen herstel
            en ernstige complicaties.
          </p>
        </section>
      </article>
    </div>
  );
}
