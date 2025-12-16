import { Metadata } from 'next';
import Link from 'next/link';
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: 'Is Bloeddrukmedicatie Giftig voor Honden? | Toxiciteit & Symptomen',
  description: 'Bloeddrukmedicatie zoals ACE-remmers en bètablokkers is zeer giftig voor honden. Leer de symptomen, gevaren en wat te doen bij vermoeden van vergiftiging.',
  keywords: 'bloeddrukmedicatie honden, ACE-remmers giftig, bètablokkers honden, medicijnvergiftiging honden, bloeddrukpillen toxisch',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Is Bloeddrukmedicatie Giftig voor Honden?',
    description: 'Bloeddrukmedicatie zoals ACE-remmers en bètablokkers is zeer giftig voor honden. Leer de symptomen herkennen en wat te doen.',
    type: 'article',
    locale: 'nl_NL',
  },
};

export default function IsBloeddrukMedicatieGiftigVoorHonden() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Is Bloeddrukmedicatie Giftig voor Honden?',
    description: 'Uitgebreide informatie over de toxiciteit van bloeddrukmedicatie voor honden, inclusief symptomen en behandeling.',
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
        name: 'Wat gebeurt er als mijn hond bloeddrukmedicatie inneemt?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Bloeddrukmedicatie veroorzaakt een gevaarlijke daling van de bloeddruk bij honden. Symptomen zijn onder andere zwakte, verwardheid, flauwvallen en in ernstige gevallen shock. Dit is een medisch noodgeval dat onmiddellijke veterinaire zorg vereist.',
        },
      },
      {
        '@type': 'Question',
        name: 'Welke bloeddrukmedicijnen zijn het gevaarlijkst voor honden?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ACE-remmers (zoals enalapril, lisinopril) en bètablokkers (zoals metoprolol, atenolol) zijn beide zeer gevaarlijk voor honden. Calciumkanaalblokkers zoals amlodipine kunnen ook ernstige vergiftiging veroorzaken. Zelfs één pil kan bij kleine honden levensbedreigende effecten hebben.',
        },
      },
      {
        '@type': 'Question',
        name: 'Hoe snel treden symptomen op na inname?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Symptomen kunnen binnen 30 minuten tot 2 uur optreden, afhankelijk van het type medicijn en de hoeveelheid. Sommige preparaten met vertraagde afgifte kunnen pas na 4-6 uur symptomen veroorzaken. Wacht niet op symptomen - neem direct contact op met je dierenarts.',
        },
      },
      {
        '@type': 'Question',
        name: 'Kan mijn hond herstellen van bloeddrukmedicijnvergiftiging?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Met snelle en adequate veterinaire behandeling kunnen veel honden volledig herstellen. De prognose hangt af van de hoeveelheid ingenomen medicijn, hoe snel behandeling wordt gestart, en de algehele gezondheid van je hond. Uitstellen van behandeling verkleint de kans op volledig herstel aanzienlijk.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wat moet ik doen als ik denk dat mijn hond bloeddrukmedicatie heeft gegeten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Neem onmiddellijk contact op met je dierenarts of een dierennoodlijn. Probeer niet zelf braken op te wekken. Houd de verpakking bij de hand om de naam en sterkte van het medicijn door te geven. Snelle actie is cruciaal - elke minuut telt.',
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
          currentPage="Bloeddrukmedicatie voor Honden"
        />

        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Is Bloeddrukmedicatie Giftig voor Honden?
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
                Hoog Risico - Medisch Noodgeval
              </h3>
              <p className="text-red-700">
                <strong>Ja, bloeddrukmedicatie is zeer giftig voor honden.</strong> ACE-remmers, bètablokkers en calciumkanaalblokkers kunnen levensbedreigende bloeddrukdaling veroorzaken. Zelfs één pil kan bij kleine honden ernstige vergiftiging veroorzaken. Bij vermoeden van inname: bel onmiddellijk je dierenarts.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="prose prose-emerald max-w-none">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Waarom is Bloeddrukmedicatie Gevaarlijk voor Honden?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Bloeddrukmedicatie wordt bij mensen gebruikt om hoge bloeddruk te verlagen en het hart te ontlasten. Deze medicijnen werken echter ook bij honden, waar ze juist een gevaarlijk lage bloeddruk kunnen veroorzaken. Honden hebben over het algemeen een lagere bloeddruk dan mensen, waardoor ze veel gevoeliger zijn voor deze medicijnen.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Er zijn verschillende soorten bloeddrukverlagende medicijnen, elk met eigen risico's:
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>ACE-remmers</strong> (zoals enalapril, lisinopril, ramipril) verlagen de bloeddruk door bloedvaten te verwijden. Bij honden kan dit leiden tot een gevaarlijke bloeddrukdaling, flauwvallen en nierschade. Deze medicijnen worden soms ook aan honden voorgeschreven, maar alleen in nauwkeurig afgemeten doseringen onder veterinair toezicht.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Bètablokkers</strong> (zoals metoprolol, atenolol, bisoprolol) vertragen de hartslag en verminderen de kracht waarmee het hart pompt. Bij honden kan dit leiden tot een gevaarlijk trage hartslag (bradycardie), lage bloeddruk en mogelijk hartstilstand. Symptomen kunnen uren aanhouden omdat deze medicijnen langzaam uit het lichaam verdwijnen.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Calciumkanaalblokkers</strong> (zoals amlodipine, diltiazem, verapamil) ontspannen bloedvaten en vertragen de hartslag. Bij honden kunnen ze ernstige bloeddrukdaling, hartritmestoornissen en orgaanschade veroorzaken. Deze vergiftigingen zijn vaak het ernstigst en vereisen intensieve veterinaire zorg.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Het grootste gevaar is dat deze medicijnen vaak in hoge doseringen worden voorgeschreven voor mensen. Eén pil voor een volwassen mens kan voor een hond al een overdosis betekenen, vooral voor kleine rassen. Bovendien hebben veel van deze medicijnen een zoete coating, waardoor honden ze graag opeten als ze de kans krijgen.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Symptomen van Bloeddrukmedicijnvergiftiging
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            De symptomen van bloeddrukmedicijnvergiftiging bij honden kunnen variëren afhankelijk van het type medicijn en de hoeveelheid die is ingenomen. Let op de volgende tekenen:
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Milde tot matige symptomen:</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Sufheid en vermoeidheid</li>
              <li>Verminderde eetlust</li>
              <li>Zwakte in de poten, strompelen</li>
              <li>Verwardheid, desoriëntatie</li>
              <li>Verhoogde dorst</li>
              <li>Trillen of beven</li>
              <li>Koude poten en oren (slechte doorbloeding)</li>
              <li>Ongewoon kalm of apathisch gedrag</li>
            </ul>
          </div>

          <div className="bg-red-50 p-6 rounded-lg mb-6 border-l-4 border-red-500">
            <h3 className="text-xl font-semibold text-red-900 mb-3">Ernstige symptomen (medisch noodgeval):</h3>
            <ul className="list-disc pl-6 space-y-2 text-red-800">
              <li>Flauwvallen of ineenstorten</li>
              <li>Zeer trage of onregelmatige hartslag</li>
              <li>Oppervlakkige of moeizame ademhaling</li>
              <li>Bleke of blauwe tandvlees</li>
              <li>Stuipen of toevallen</li>
              <li>Braken (soms met bloed)</li>
              <li>Extreme zwakte, niet kunnen opstaan</li>
              <li>Bewusteloosheid</li>
              <li>Shock (koude poten, snelle ademhaling, zwakke pols)</li>
            </ul>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            De timing van symptomen varieert per medicijn. Sommige bloeddrukverlagende medicijnen werken binnen 30 minuten, terwijl preparaten met vertraagde afgifte pas na enkele uren effect kunnen hebben. Symptomen kunnen 12 tot 24 uur aanhouden of langer, afhankelijk van het type medicijn.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Wat Te Doen Bij Vermoeden van Vergiftiging
          </h2>
          <div className="bg-emerald-50 p-6 rounded-lg mb-6 border-l-4 border-emerald-500">
            <h3 className="text-xl font-semibold text-emerald-900 mb-3">Actieplan bij inname:</h3>
            <ol className="list-decimal pl-6 space-y-3 text-gray-700">
              <li>
                <strong>Bel onmiddellijk je dierenarts of een dierennoodlijn.</strong> Elke minuut telt bij bloeddrukmedicijnvergiftiging. Wacht niet tot symptomen optreden.
              </li>
              <li>
                <strong>Houd de verpakking bij de hand.</strong> Noteer de naam van het medicijn, de sterkte (mg) en hoeveel pillen er mogelijk zijn ingenomen. Deze informatie is cruciaal voor de behandeling.
              </li>
              <li>
                <strong>Probeer NIET zelf braken op te wekken.</strong> Bij lage bloeddruk kan braken gevaarlijk zijn en ademhalingsproblemen veroorzaken.
              </li>
              <li>
                <strong>Houd je hond rustig en warm.</strong> Voorkom dat je hond rent of speelt. Leg een deken over je hond als hij koud aanvoelt.
              </li>
              <li>
                <strong>Observeer nauwkeurig.</strong> Let op ademhaling, hartslag (voel aan de binnenkant van de achterpoot), tandvleeskleur en alertheid. Deel deze informatie met de dierenarts.
              </li>
              <li>
                <strong>Vervoer veilig naar de dierenarts.</strong> Laat je hond niet zelf lopen als hij zwak is. Draag hem voorzichtig naar de auto en houd hem tijdens de rit rustig.
              </li>
              <li>
                <strong>Wees voorbereid op intensieve behandeling.</strong> Je hond moet waarschijnlijk meerdere uren tot dagen in de dierenkliniek blijven voor monitoring en ondersteunende zorg.
              </li>
            </ol>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Wanneer Contact Opnemen met de Dierenarts
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Bij bloeddrukmedicijnvergiftiging geldt: <strong>neem altijd onmiddellijk contact op met je dierenarts.</strong> Dit vereist professionele veterinaire beoordeling. Specifieke situaties waarbij contact noodzakelijk is:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>Je hebt gezien dat je hond een bloeddrukpil heeft opgegeten, ook als hij nog geen symptomen vertoont</li>
            <li>Je vermoedt dat je hond toegang heeft gehad tot bloeddrukmedicatie (lege verpakking, pillen op de grond)</li>
            <li>Je hond vertoont een of meer van de bovengenoemde symptomen</li>
            <li>Je hond is flauwgevallen of zeer zwak</li>
            <li>De tandvlezen zijn bleek of blauw</li>
            <li>De hartslag is abnormaal traag of onregelmatig</li>
            <li>Je hond reageert niet goed of is verward</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            Bloeddrukmedicijnvergiftiging is een tijdkritisch noodgeval. Hoe sneller de behandeling begint, hoe groter de kans op volledig herstel. Wacht nooit tot de volgende dag of tot je hond "wel beter wordt" - dat kan fataal zijn.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Preventietips
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Voorkom dat je hond toegang krijgt tot bloeddrukmedicatie met deze praktische tips:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>Bewaar alle medicijnen in een hoog, afgesloten kastje waar je hond niet bij kan</li>
            <li>Gebruik kinderveilige medicijndoosjes, maar vertrouw daar niet volledig op - honden kunnen deze soms openbreken</li>
            <li>Neem je medicijnen nooit in het bijzijn van je hond - ze kunnen gevallen pillen snel opeten</li>
            <li>Gooi lege verpakkingen en blisters direct weg in een afvalcontainer buiten het bereik van je hond</li>
            <li>Als je een pil laat vallen, zoek deze onmiddellijk - honden zijn snel en nieuwsgierig</li>
            <li>Waarschuw huisgenoten, bezoekers en oppas over de gevaren van medicijnen voor honden</li>
            <li>Als je zelf bloeddrukmedicatie gebruikt, overweeg een medicijnalarm zodat je nooit pillen vergeet op te bergen</li>
            <li>Bewaar je medicijnen niet op het nachtkastje of in handtassen waar je hond bij kan</li>
            <li>Als ouderen in huis wonen, help hen met veilige medicijnopslag - honden kunnen zelfs medicijndoosjes omgooien</li>
            <li>Bij logeerpartijen of als je met je hond op reis gaat, zorg voor veilige opslag van alle medicijnen</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Veelgestelde Vragen
          </h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Wat gebeurt er als mijn hond bloeddrukmedicatie inneemt?
              </h3>
              <p className="text-gray-700">
                Bloeddrukmedicatie veroorzaakt een gevaarlijke daling van de bloeddruk bij honden. Symptomen zijn onder andere zwakte, verwardheid, flauwvallen en in ernstige gevallen shock. Dit is een medisch noodgeval dat onmiddellijke veterinaire zorg vereist.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Welke bloeddrukmedicijnen zijn het gevaarlijkst voor honden?
              </h3>
              <p className="text-gray-700">
                ACE-remmers (zoals enalapril, lisinopril) en bètablokkers (zoals metoprolol, atenolol) zijn beide zeer gevaarlijk voor honden. Calciumkanaalblokkers zoals amlodipine kunnen ook ernstige vergiftiging veroorzaken. Zelfs één pil kan bij kleine honden levensbedreigende effecten hebben.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Hoe snel treden symptomen op na inname?
              </h3>
              <p className="text-gray-700">
                Symptomen kunnen binnen 30 minuten tot 2 uur optreden, afhankelijk van het type medicijn en de hoeveelheid. Sommige preparaten met vertraagde afgifte kunnen pas na 4-6 uur symptomen veroorzaken. Wacht niet op symptomen - neem direct contact op met je dierenarts.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Kan mijn hond herstellen van bloeddrukmedicijnvergiftiging?
              </h3>
              <p className="text-gray-700">
                Met snelle en adequate veterinaire behandeling kunnen veel honden volledig herstellen. De prognose hangt af van de hoeveelheid ingenomen medicijn, hoe snel behandeling wordt gestart, en de algehele gezondheid van je hond. Uitstellen van behandeling verkleint de kans op volledig herstel aanzienlijk.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Wat moet ik doen als ik denk dat mijn hond bloeddrukmedicatie heeft gegeten?
              </h3>
              <p className="text-gray-700">
                Neem onmiddellijk contact op met je dierenarts of een dierennoodlijn. Probeer niet zelf braken op te wekken. Houd de verpakking bij de hand om de naam en sterkte van het medicijn door te geven. Snelle actie is cruciaal - elke minuut telt.
              </p>
            </div>
          </div>

          {/* Medical Disclaimer */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mt-8">
            <h3 className="text-lg font-semibold text-amber-900 mb-2">Medische Disclaimer</h3>
            <p className="text-amber-800 text-sm">
              Deze informatie is bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies. Bij vermoeden van vergiftiging of gezondheidsproblemen bij je hond, neem altijd onmiddellijk contact op met je dierenarts of een dierennoodlijn. Elke situatie is uniek en vereist professionele beoordeling.
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
