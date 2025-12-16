import { Metadata } from 'next';
import Link from 'next/link';
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: 'Is ADHD Medicatie Giftig voor Honden? | Symptomen & Wat Te Doen',
  description: 'ADHD medicatie zoals Ritalin en Concerta is zeer giftig voor honden. Stimulanten veroorzaken gevaarlijke hartproblemen en hyperthermie. Leer symptomen en wat te doen.',
  keywords: 'ADHD medicatie honden, Ritalin giftig, Concerta honden, amfetamine vergiftiging, stimulanten toxisch honden',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Is ADHD Medicatie Giftig voor Honden?',
    description: 'ADHD medicatie zoals Ritalin en Concerta is zeer giftig voor honden. Amfetamines veroorzaken levensbedreigende hartproblemen.',
    type: 'article',
    locale: 'nl_NL',
  },
};

export default function IsADHDMedicatieGiftigVoorHonden() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Is ADHD Medicatie Giftig voor Honden?',
    description: 'Uitgebreide informatie over de toxiciteit van ADHD medicatie en amfetamines voor honden, inclusief symptomen en noodbehandeling.',
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
        name: 'Wat maakt ADHD medicatie zo giftig voor honden?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ADHD medicatie bevat stimulanten zoals methylfenidaat (Ritalin) of amfetamines die het centrale zenuwstelsel en hart sterk stimuleren. Bij honden veroorzaakt dit gevaarlijk hoge hartslag, hoge bloeddruk, hyperthermie (oververhitting) en mogelijk hartstilstand. Honden zijn veel gevoeliger voor deze medicijnen dan mensen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Hoe snel worden honden ziek van ADHD medicatie?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Symptomen kunnen binnen 15-30 minuten optreden. ADHD medicatie wordt snel opgenomen in de bloedbaan. Hyperactiviteit, trillen en verhoogde hartslag zijn vaak de eerste tekenen. Zonder behandeling kunnen ernstige symptomen zoals stuipen en hartritmestoornissen zich binnen enkele uren ontwikkelen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Kan één ADHD pil mijn hond doden?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, zelfs één ADHD pil kan levensbedreigende vergiftiging veroorzaken, vooral bij kleine honden. De menselijke dosering is veel te hoog voor honden. Een enkele pil Ritalin of Concerta kan bij kleine honden fatale hartritmestoornissen, stuipen of hyperthermie veroorzaken. Dit is altijd een medisch noodgeval.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wat is de behandeling voor ADHD medicijnvergiftiging?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Behandeling vereist onmiddellijke veterinaire zorg en omvat vaak maagspoelingen of medicijnen om braken op te wekken (alleen binnen 1-2 uur na inname), actieve kool, infusen, medicijnen om hartslag en bloeddruk te controleren, koeling bij hyperthermie en mogelijk sedatie bij extreme agitatie. Opname in de dierenkliniek is meestal noodzakelijk.',
        },
      },
      {
        '@type': 'Question',
        name: 'Hoe lang blijven symptomen aanhouden?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Symptomen kunnen 12-24 uur aanhouden, afhankelijk van het type medicijn. Preparaten met vertraagde afgifte (zoals Concerta XL) kunnen tot 36 uur effecten veroorzaken. Zelfs na verbetering is monitoring noodzakelijk, omdat late complicaties zoals hartritmestoornissen kunnen optreden.',
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
          currentPage="ADHD Medicatie voor Honden"
        />

        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Is ADHD Medicatie Giftig voor Honden?
        </h1>

        {/* TL;DR Verdict Box */}
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Hoog Risico - Levensbedreigende Noodsituatie
              </h3>
              <p className="text-red-700">
                <strong>Ja, ADHD medicatie is zeer giftig voor honden.</strong> Stimulanten zoals Ritalin, Concerta en amfetamines veroorzaken gevaarlijke hartproblemen, hyperthermie en stuipen. Zelfs kleine hoeveelheden kunnen levensbedreigende effecten hebben. Bij vermoeden van inname: neem onmiddellijk contact op met je dierenarts.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="prose prose-emerald max-w-none">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Waarom is ADHD Medicatie Zo Gevaarlijk voor Honden?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            ADHD medicatie behoort tot de meest gevaarlijke huishoudelijke vergiftigingen bij honden. Deze medicijnen bevatten krachtige stimulanten die het centrale zenuwstelsel en het cardiovasculaire systeem extreem stimuleren. Wat voor mensen een therapeutisch effect heeft, veroorzaakt bij honden een levensbedreigende overstimulatie.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            De belangrijkste ADHD medicijnen en hun gevaren:
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Methylfenidaat</strong> (Ritalin, Concerta, Medikinet) is een krachtige stimulant die dopamine en noradrenaline niveaus verhoogt. Bij honden veroorzaakt dit een gevaarlijk hoge hartslag (tachycardie), hoge bloeddruk (hypertensie), hyperthermie (lichaamstemperatuur kan oplopen tot 41-42°C), en overmatige stimulatie van het zenuwstelsel. Dit kan leiden tot hartritmestoornissen, stuipen en orgaanschade.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Amfetamines en dextroamfetamine</strong> (Adderall, Dexedrine) hebben vergelijkbare maar vaak nog sterkere effecten. Deze medicijnen kunnen extreme agitatie, hallucinaties, agressie, hyperthermie en levensbedreigende hartritmestoornissen veroorzaken. Amfetamines blijven langer in het lichaam dan methylfenidaat, wat betekent dat symptomen 24-36 uur kunnen aanhouden.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Lisdexamfetamine</strong> (Elvanse, Vyvanse) wordt in het lichaam omgezet in dextroamfetamine. Dit betekent een langzamer begin maar een langere werkingsduur. Bij honden kan dit leiden tot verlengde toxiciteit die intensieve monitoring vereist.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Het grootste probleem is dat ADHD medicatie voor kinderen en volwassenen wordt gedoseerd - doses die voor een mens normaal zijn, zijn voor een hond massaal overdoseerd. Een enkele pil voor een kind kan een kleine hond doden. Daarnaast hebben veel ADHD medicijnen een zoete coating of zijn als kauwbare tabletten verkrijgbaar, wat ze aantrekkelijk maakt voor honden.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            De toxiciteit wordt verergerd doordat veel ADHD medicijnen preparaten met vertraagde afgifte zijn (zoals Concerta XL). Dit betekent dat de medicatie gedurende 8-12 uur geleidelijk vrijkomt, wat langdurige symptomen veroorzaakt en behandeling bemoeilijkt.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Symptomen van ADHD Medicijnvergiftiging
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            ADHD medicijnvergiftiging veroorzaakt snel ernstige symptomen. De symptomen kunnen binnen 15-30 minuten optreden en escaleren snel:
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Vroege symptomen (15-60 minuten):</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Extreme hyperactiviteit, onrustig heen en weer lopen</li>
              <li>Hijgen, verhoogde ademhalingssnelheid</li>
              <li>Verhoogde hartslag (voelbaar aan borst of binnenkant achterpoot)</li>
              <li>Verwijde pupillen (zeer grote, zwarte ogen)</li>
              <li>Trillen of beven van het hele lichaam</li>
              <li>Overmatig kwijlen</li>
              <li>Braken of diarree</li>
              <li>Verhoogde dorst</li>
              <li>Nerveus, alert, overreactief gedrag</li>
            </ul>
          </div>

          <div className="bg-red-50 p-6 rounded-lg mb-6 border-l-4 border-red-500">
            <h3 className="text-xl font-semibold text-red-900 mb-3">Ernstige symptomen (1-4 uur, medisch noodgeval):</h3>
            <ul className="list-disc pl-6 space-y-2 text-red-800">
              <li>Stuipen of toevallen (mogelijk meerdere)</li>
              <li>Hyperthermie - lichaamstemperatuur boven 40°C (heet aanvoelen, zeer warm)</li>
              <li>Hartritmestoornissen (onregelmatige hartslag)</li>
              <li>Extreme agitatie, mogelijk agressief gedrag</li>
              <li>Hallucinaties (bijten naar dingen die er niet zijn, starend gedrag)</li>
              <li>Spiertrillingen of rigiditeit</li>
              <li>Blauwe tandvlees (zuurstofgebrek)</li>
              <li>Bloedneus of bloedend tandvlees</li>
              <li>Ineenstorten of bewusteloosheid</li>
              <li>Shock (koude poten, zwakke pols, snel hijgen)</li>
              <li>Hartstilstand</li>
            </ul>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            Bij preparaten met vertraagde afgifte kunnen symptomen in golven komen - je hond lijkt te verbeteren maar verslechtert dan weer als meer medicijn vrijkomt. Dit maakt het cruciaal om je hond langdurig te laten monitoren, zelfs als hij aanvankelijk lijkt te verbeteren.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Wat Te Doen Bij Vermoeden van Vergiftiging
          </h2>
          <div className="bg-emerald-50 p-6 rounded-lg mb-6 border-l-4 border-emerald-500">
            <h3 className="text-xl font-semibold text-emerald-900 mb-3">Noodprotocol bij ADHD medicijn inname:</h3>
            <ol className="list-decimal pl-6 space-y-3 text-gray-700">
              <li>
                <strong>Bel ONMIDDELLIJK je dierenarts of dierennoodlijn.</strong> Dit is een absolute noodsituatie. Vertel dat je hond ADHD medicatie heeft ingenomen - dit heeft prioriteit. Elke minuut vertraging vermindert de overlevingskans.
              </li>
              <li>
                <strong>Geef exacte informatie.</strong> Welk medicijn (Ritalin, Concerta, etc.), hoeveel pillen, welke sterkte (mg), en hoe lang geleden. Is het een preparaat met vertraagde afgifte? Deze informatie is essentieel.
              </li>
              <li>
                <strong>Probeer NIET zelf braken op te wekken.</strong> Bij stimulantvergiftiging kan dit gevaarlijk zijn door het risico op stuipen of aspiratie. Laat dit over aan de dierenarts.
              </li>
              <li>
                <strong>Vervoer je hond DIRECT naar de dierenarts.</strong> Elke minuut telt. Rijd veilig maar snel. Houd je hond rustig en koel tijdens transport (airconditioning aan).
              </li>
              <li>
                <strong>Houd je hond koel.</strong> Als je hond warm aanvoelt, gebruik een koele (niet ijskoude) natte handdoek op poten en buik. Hyperthermie is een groot gevaar bij ADHD medicijnvergiftiging.
              </li>
              <li>
                <strong>Voorkom verwondingen bij stuipen.</strong> Als je hond stuipen krijgt tijdens transport, bescherm zijn hoofd met een kussen of handdoek. Probeer NIET zijn tong vast te houden.
              </li>
              <li>
                <strong>Neem de verpakking mee.</strong> Dit helpt de dierenarts de exacte toxiciteit te bepalen en de juiste behandeling te kiezen.
              </li>
              <li>
                <strong>Bereid je voor op intensieve behandeling.</strong> Je hond zal waarschijnlijk opgenomen moeten worden voor 12-48 uur monitoring en ondersteunende zorg. ADHD medicijnvergiftiging vereist vaak intensive care.
              </li>
            </ol>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Wanneer Contact Opnemen met de Dierenarts
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Bij ADHD medicijnvergiftiging: <strong>neem altijd onmiddellijk contact op met je dierenarts.</strong> Dit is een ernstige vergiftiging die professionele veterinaire zorg vereist. Specifieke situaties:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>Je hebt gezien dat je hond een ADHD pil heeft opgegeten - zelfs als het seconden geleden is</li>
            <li>Je vermoedt dat je hond toegang heeft gehad tot ADHD medicatie (verpakking aangetroffen, pillen vermist)</li>
            <li>Je hond vertoont een of meer symptomen van stimulantvergiftiging</li>
            <li>Je hond is extreem hyperactief, kan niet stil zitten</li>
            <li>Je merkt trillen, stuipen of ongecontroleerde bewegingen</li>
            <li>Je hond voelt warm aan of hijgt extreem</li>
            <li>De hartslag voelt abnormaal snel of onregelmatig</li>
            <li>Je hond is agressief of vertoont hallucinaties</li>
            <li>Bewusteloosheid of ineenstorten</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            Wacht niet af bij ADHD medicijnvergiftiging. Zelfs als je hond nog normaal lijkt, kunnen symptomen snel escaleren. Snelle veterinaire behandeling verbetert de prognose aanzienlijk en kan blijvende schade helpen voorkomen.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Preventietips
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            ADHD medicatie is zo gevaarlijk dat extreme voorzichtigheid geboden is:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>Bewaar ADHD medicatie ALTIJD in een afgesloten medicijnkastje hoog boven bereik van je hond</li>
            <li>Gebruik kindveilige verpakkingen, maar vertrouw daar niet volledig op - honden kunnen deze soms openbreken</li>
            <li>Geef kinderen met ADHD hun medicatie onder toezicht en controleer dat ze de pil hebben ingeslikt</li>
            <li>Als een kind een pil laat vallen, zoek deze ONMIDDELLIJK - honden zijn razendnel</li>
            <li>Bewaar ADHD medicatie nooit op nachtkastjes, salontafels, keukentafels of andere toegankelijke plekken</li>
            <li>Gooi lege blisters en verpakkingen direct weg in een afvalcontainer buiten bereik</li>
            <li>Als je hond speels of nieuwsgierig is, overweeg een medicijnkluis voor extra veiligheid</li>
            <li>Waarschuw alle gezinsleden, bezoekers en oppassen over het extreme gevaar van deze medicijnen</li>
            <li>Bij schoolgaande kinderen: controleer rugzakken en jaszakken regelmatig op losse pillen</li>
            <li>Neem ADHD medicatie nooit in het bijzijn van je hond - ze associëren pillen innemen met aandacht en kunnen ze opzoeken</li>
            <li>Als je met je hond op reis gaat, berg medicijnen op in een afgesloten koffer of tas</li>
            <li>Programmeer het nummer van je dierenarts en een dierennoodlijn in je telefoon voor snelle toegang</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Veelgestelde Vragen
          </h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Wat maakt ADHD medicatie zo giftig voor honden?
              </h3>
              <p className="text-gray-700">
                ADHD medicatie bevat stimulanten zoals methylfenidaat (Ritalin) of amfetamines die het centrale zenuwstelsel en hart sterk stimuleren. Bij honden veroorzaakt dit gevaarlijk hoge hartslag, hoge bloeddruk, hyperthermie (oververhitting) en mogelijk hartstilstand. Honden zijn veel gevoeliger voor deze medicijnen dan mensen.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Hoe snel worden honden ziek van ADHD medicatie?
              </h3>
              <p className="text-gray-700">
                Symptomen kunnen binnen 15-30 minuten optreden. ADHD medicatie wordt snel opgenomen in de bloedbaan. Hyperactiviteit, trillen en verhoogde hartslag zijn vaak de eerste tekenen. Zonder behandeling kunnen ernstige symptomen zoals stuipen en hartritmestoornissen zich binnen enkele uren ontwikkelen.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Kan één ADHD pil mijn hond doden?
              </h3>
              <p className="text-gray-700">
                Ja, zelfs één ADHD pil kan levensbedreigende vergiftiging veroorzaken, vooral bij kleine honden. De menselijke dosering is veel te hoog voor honden. Zelfs kleine hoeveelheden kunnen ernstige hartritmestoornissen, stuipen of hyperthermie veroorzaken. Dit vereist onmiddellijke veterinaire zorg.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Wat is de behandeling voor ADHD medicijnvergiftiging?
              </h3>
              <p className="text-gray-700">
                Behandeling vereist onmiddellijke veterinaire zorg en kan bestaan uit decontaminatie (indien tijdig), actieve kool, infusen, medicijnen om hartslag en bloeddruk te controleren, koeling bij hyperthermie en mogelijk sedatie bij extreme agitatie. Opname in de dierenkliniek is meestal noodzakelijk.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Hoe lang blijven symptomen aanhouden?
              </h3>
              <p className="text-gray-700">
                Symptomen kunnen 12-24 uur aanhouden, afhankelijk van het type medicijn. Preparaten met vertraagde afgifte (zoals Concerta XL) kunnen tot 36 uur effecten veroorzaken. Zelfs na verbetering is monitoring noodzakelijk, omdat late complicaties zoals hartritmestoornissen kunnen optreden.
              </p>
            </div>
          </div>

          {/* Medical Disclaimer */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mt-8">
            <h3 className="text-lg font-semibold text-amber-900 mb-2">Medische Disclaimer</h3>
            <p className="text-amber-800 text-sm">
              Deze informatie is bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies. ADHD medicijnvergiftiging is een medisch noodgeval - bij vermoeden van inname, neem onmiddellijk contact op met je dierenarts of een dierennoodlijn. Snelle actie is essentieel bij deze ernstige vergiftiging.
            </p>
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
