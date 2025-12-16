import { Metadata } from 'next';
import Link from 'next/link';
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: 'Is Antivries Giftig voor Honden? | Symptomen & Wat Te Doen',
  description: 'Antivries (ethyleenglycol) is zeer gevaarlijk voor honden. De zoete smaak trekt honden aan en kan ernstige gezondheidsproblemen veroorzaken. Leer symptomen herkennen en wat te doen.',
  keywords: 'antivries honden giftig, ethyleenglycol vergiftiging, koelvloeistof toxisch, antivries dodelijk honden, glycol vergiftiging',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Is Antivries Giftig voor Honden?',
    description: 'Antivries is zeer gevaarlijk voor honden. De zoete smaak is misleidend en kan ernstige gezondheidsproblemen veroorzaken. Leer symptomen herkennen.',
    type: 'article',
    locale: 'nl_NL',
  },
};

export default function IsAntivriesGiftigVoorHonden() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Is Antivries Giftig voor Honden?',
    description: 'Uitgebreide informatie over de toxiciteit van antivries (ethyleenglycol) voor honden, inclusief symptomen en behandeling.',
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
        name: 'Waarom is antivries zo gevaarlijk voor honden?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Antivries bevat ethyleenglycol, een stof die in de lever wordt omgezet in giftige zuren die nierfalen veroorzaken. Het grote gevaar is de zoete smaak - honden drinken het vrijwillig. Zelfs kleine hoeveelheden kunnen ernstige gezondheidsproblemen veroorzaken. Snelle veterinaire hulp is cruciaal.',
        },
      },
      {
        '@type': 'Question',
        name: 'Hoe snel worden honden ziek van antivries?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Symptomen verlopen in drie fasen: Fase 1 (binnen uren): dronken gedrag, braken, dorst. Fase 2 (later): schijnbaar herstel maar interne schade. Fase 3 (na dag of langer): ernstig nierfalen, coma. Vroege behandeling is cruciaal voor het beste resultaat.',
        },
      },
      {
        '@type': 'Question',
        name: 'Hoeveel antivries is dodelijk voor honden?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Zeer kleine hoeveelheden kunnen al ernstige gezondheidsproblemen veroorzaken. De toxiciteit hangt af van het gewicht van de hond en de hoeveelheid ingenomen antivries. Omdat antivries zoet smaakt, drinken honden vaak meer dan veilig is. Neem bij elke verdenking contact op met een dierenarts.',
        },
      },
      {
        '@type': 'Question',
        name: 'Kan mijn hond overleven na antivries inname?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Overleving hangt af van snelheid van behandeling. Vroege veterinaire interventie verbetert de prognose aanzienlijk. Hoe sneller de behandeling start, hoe beter de kansen. Neem bij elke verdenking onmiddellijk contact op met een dierenarts.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wat is het antidotum voor antivries vergiftiging?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Het antidotum is fomepizole (4-methylpyrazole) of in noodgevallen ethanol (alcohol). Deze middelen blokkeren het enzym dat ethyleenglycol omzet in giftige stoffen. Fomepizole is veiliger en effectiever. De behandeling wordt gecombineerd met infusen en dialyse indien nodig. Alleen dierenartsen kunnen dit toedienen. Snelle behandeling verbetert de prognose.',
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
          currentPage="Antivries voor Honden"
        />

        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Is Antivries Giftig voor Honden?
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
                Zeer ernstig giftig - noodsituatie
              </h3>
              <p className="text-red-700">
                <strong>Ja, antivries (ethyleenglycol) is zeer giftig voor honden.</strong> De zoete smaak trekt honden aan, maar zelfs kleine hoeveelheden kunnen ernstige gezondheidsproblemen veroorzaken. Kan leiden tot nierfalen. Snelle veterinaire behandeling is cruciaal voor het beste resultaat. Bij vermoeden van inname: neem onmiddellijk contact op met je dierenarts.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="prose prose-emerald max-w-none">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Waarom is Antivries Zo Gevaarlijk voor Honden?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Antivries, ook wel koelvloeistof genoemd, is een van de meest voorkomende en gevaarlijke vergiftigingen bij honden. Het actieve ingrediënt is meestal ethyleenglycol, een kleurloze, geurloze vloeistof met een opvallend zoete smaak. Deze zoete smaak is precies wat antivries zo dodelijk maakt - honden drinken het vrijwillig en zelfs met smaak.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Het gevaar van ethyleenglycol ligt in wat er gebeurt nadat het is ingenomen:
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Snelle opname:</strong> Ethyleenglycol wordt zeer snel opgenomen in de bloedbaan via de maag en dunne darm. Binnen 30-60 minuten bereikt het zijn hoogste concentratie in het bloed. Dit betekent dat de stof al snel in het hele lichaam terechtkomt.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Giftige metabolieten:</strong> In de lever wordt ethyleenglycol afgebroken door een enzym genaamd alcohol dehydrogenase. Dit proces creëert echter extreem giftige metabolieten (afbraakproducten): glycolaldehyde, glycolzuur, glyoxylzuur en uiteindelijk oxaalzuur. Deze stoffen zijn veel giftiger dan ethyleenglycol zelf.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Nierschade mechanisme:</strong> Oxaalzuur bindt zich aan calcium in het bloed en vormt calciumoxalaat kristallen. Deze scherpe kristallen hopen zich op in de niertubuli (kleine buisjes in de nieren) en veroorzaken acute nierschade. De kristallen blokkeren letterlijk de nieren en vernietigen niercellen. Binnen 24-72 uur kan dit leiden tot compleet, onomkeerbaar nierfalen.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Metabole acidose:</strong> De giftige zuren die ontstaan, veroorzaken ook ernstige metabole acidose (verzuring van het bloed). Dit verstoort alle lichaamsfuncties en kan leiden tot shock, coma en overlijden.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Gevaarlijke hoeveelheden:</strong> Zelfs zeer kleine hoeveelheden kunnen ernstige gezondheidsproblemen veroorzaken. De toxiciteit hangt af van het gewicht van de hond en de hoeveelheid die is ingenomen. Omdat antivries zoet smaakt en honden het lekker vinden, drinken ze vaak meer dan veilig is.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Het grote probleem met antivriesvergiftiging is dat snelle behandeling cruciaal is. Zodra nierschade begint te ontstaan, kan dit moeilijk om te keren zijn. Vroege veterinaire interventie verbetert de prognose aanzienlijk.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Symptomen van Antivries Vergiftiging
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Antivriesvergiftiging verloopt in drie kenmerkende fasen. Het herkennen van de eerste fase is cruciaal voor overleving:
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Fase 1: Neurologische symptomen (30 min - 12 uur na inname)</h3>
            <p className="text-gray-700 mb-3">
              Deze fase lijkt op dronkenschap omdat ethyleenglycol werkt als alcohol op het zenuwstelsel:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Desoriëntatie en verwardheid, "dronken" gedrag</li>
              <li>Strompelen, wankelen, moeite met lopen</li>
              <li>Verhoogde dorst (polydipsie) - extreem veel drinken</li>
              <li>Verhoogd plassen (polyurie)</li>
              <li>Braken en misselijkheid</li>
              <li>Sufheid of juist hyperactiviteit</li>
              <li>Hoofdschudden</li>
              <li>Spiertrillingen</li>
              <li>In sommige gevallen: stuipen</li>
            </ul>
            <p className="text-emerald-700 font-semibold mt-3">
              Dit is het belangrijkste moment voor succesvolle behandeling. Neem onmiddellijk contact op met je dierenarts.
            </p>
          </div>

          <div className="bg-orange-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-orange-900 mb-3">Fase 2: Schijnbaar herstel (12-24 uur na inname)</h3>
            <p className="text-orange-800 mb-3">
              Een gevaarlijke fase waarin je hond lijkt te verbeteren, maar interne schade zich ontwikkelt:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-orange-800">
              <li>Neurologische symptomen verminderen</li>
              <li>Hond lijkt alerter en beter</li>
              <li>Verhoogde hartslag (tachycardie)</li>
              <li>Snelle ademhaling (tachypneu)</li>
              <li>Mogelijk lichte dehydratie</li>
            </ul>
            <p className="text-red-700 font-semibold mt-3">
              Let op: Ondanks verbetering vormen zich giftige kristallen in de nieren. Zonder behandeling kan nierfalen optreden.
            </p>
          </div>

          <div className="bg-red-50 p-6 rounded-lg mb-6 border-l-4 border-red-500">
            <h3 className="text-xl font-semibold text-red-900 mb-3">Fase 3: Ernstig nierfalen (24-72 uur na inname)</h3>
            <p className="text-red-800 mb-3">
              De nieren falen en toxines hopen zich op in het lichaam:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-red-800">
              <li>Zeer ernstig braken (vaak aanhoudend)</li>
              <li>Geen of zeer weinig urineproductie (oligurie/anurie)</li>
              <li>Extreme sufheid, lethargie</li>
              <li>Weigeren te eten of drinken</li>
              <li>Pijnlijke nieren (gespannen buik, kreunend geluid bij aanraking)</li>
              <li>Bleke of gelige tandvlezen</li>
              <li>Ulceraties (zweren) in de mond</li>
              <li>Zwakte, niet kunnen opstaan</li>
              <li>Stuipen of coma</li>
              <li>Onderkoeling (lage lichaamstemperatuur)</li>
              <li>Overlijden binnen 24-72 uur zonder dialyse</li>
            </ul>
            <p className="text-red-900 font-semibold mt-3">
              Belangrijk: Op dit punt is nierschade vaak moeilijk om te keren. Zelfs met dialyse is de prognose onzeker.
            </p>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Belangrijk:</strong> Niet alle honden doorlopen alle drie fasen duidelijk. Sommige honden verslechteren snel van fase 1 naar fase 3. De symptomen en timing kunnen ook variëren afhankelijk van de hoeveelheid ingenomen antivries en de grootte van je hond.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Wat Te Doen Bij Vermoeden van Vergiftiging
          </h2>
          <div className="bg-emerald-50 p-6 rounded-lg mb-6 border-l-4 border-emerald-500">
            <h3 className="text-xl font-semibold text-emerald-900 mb-3">NOODPROTOCOL - tijd is kritiek:</h3>
            <ol className="list-decimal pl-6 space-y-3 text-gray-700">
              <li>
                <strong className="text-red-600">Bel onmiddellijk je dierenarts of dierennoodlijn.</strong> Zeg expliciet: "Mijn hond heeft mogelijk antivries gedronken - dit is een noodsituatie." Tijd is letterlijk van levensbelang.
              </li>
              <li>
                <strong>Verzamel informatie snel:</strong> Hoeveel antivries is er weg? Hoe lang geleden heeft je hond het gedronken? Welk merk/type antivries (ethyleenglycol of propyleen glycol)? Houd de verpakking bij de hand.
              </li>
              <li>
                <strong>Probeer NIET zelf braken op te wekken</strong> tenzij de dierenarts dit expliciet instrueert. Dit kan alleen helpen binnen het eerste uur en moet veilig worden gedaan.
              </li>
              <li>
                <strong>Ga zo snel mogelijk naar de dierenarts.</strong> Ideaal binnen 2-4 uur na inname. Na 8 uur neemt de overlevingskans dramatisch af. Elke minuut telt. Rijd snel maar veilig.
              </li>
              <li>
                <strong>Houd je hond rustig tijdens transport.</strong> Stress kan de opname van het gif versnellen. Leg een deken over je hond als hij koud aanvoelt.
              </li>
              <li>
                <strong>Bereid je voor op onmiddellijke behandeling:</strong> Je hond krijgt waarschijnlijk direct een antidotum (fomepizole of ethanol), infusen en moet mogelijk dagenlang opgenomen worden voor dialyse en monitoring.
              </li>
              <li>
                <strong>Bereid je voor op hoge kosten.</strong> Antivriesbehandeling met dialyse kan duizenden euro's kosten. Bespreek dit direct met je dierenarts om realistische beslissingen te kunnen maken.
              </li>
              <li>
                <strong>Follow-up is essentieel.</strong> Zelfs na succesvolle behandeling moet nierfunctie wekenlang gemonitord worden. Bloedonderzoek is noodzakelijk om permanente nierschade uit te sluiten.
              </li>
            </ol>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg mb-6 border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold text-blue-900 mb-3">Behandeling door dierenarts:</h3>
            <ul className="list-disc pl-6 space-y-2 text-blue-800">
              <li><strong>Antidotum:</strong> Fomepizole (4-methylpyrazole) of ethanol. Dit blokkeert het enzym dat ethyleenglycol omzet in giftige stoffen. Moet binnen 8-12 uur gegeven worden.</li>
              <li><strong>Maagspoelingen/actieve kool:</strong> Alleen effectief binnen 1-2 uur na inname</li>
              <li><strong>Intensieve infuustherapie:</strong> Om de nieren te ondersteunen en toxines uit te spoelen</li>
              <li><strong>Bloedgasanalyse:</strong> Om acidose (verzuring) te monitoren en corrigeren</li>
              <li><strong>Dialyse:</strong> Bij ernstige gevallen om ethyleenglycol en toxines uit het bloed te verwijderen</li>
              <li><strong>Ondersteunende zorg:</strong> Anti-braak medicatie, pijnstilling, nutritionele ondersteuning</li>
              <li><strong>Opname:</strong> Meestal 3-7 dagen monitoring, soms langer</li>
            </ul>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Wanneer Contact Opnemen met de Dierenarts
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Bij antivriesvergiftiging geldt: <strong className="text-red-600">altijd en onmiddellijk contact opnemen.</strong> Dit is een absolute noodsituatie waarbij tijd letterlijk het verschil tussen leven en dood betekent.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>Je hebt gezien dat je hond antivries heeft gedronken of gelikt</li>
            <li>Je vermoedt dat je hond toegang heeft gehad tot antivries (gemorste vloeistof, open fles, garage)</li>
            <li>Je hond vertoont "dronken" gedrag zonder voor de hand liggende oorzaak</li>
            <li>Je hond drinkt en plast extreem veel</li>
            <li>Je hond braakt zonder duidelijke oorzaak en lijkt suf</li>
            <li>Je hond strompelt of heeft moeite met lopen</li>
            <li>Je hond produceert zeer weinig of geen urine</li>
            <li>Een of meer symptomen uit fase 1, 2 of 3 zijn aanwezig</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
            <strong>Gouden regel:</strong> Binnen 2-4 uur behandeling = 90% overlevingskans. Na 8 uur behandeling = minder dan 50% kans. Na 12-24 uur = vaak te laat voor volledig herstel. Wacht nooit af - bij twijfel, altijd bellen!
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Preventietips
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Preventie is levensreddend bij antivries. Neem deze maatregelen:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li><strong>Gebruik diervriendelijke antivries:</strong> Kies voor antivries op basis van propyleen glycol in plaats van ethyleenglycol. Propyleen glycol is veel minder toxisch (hoewel niet helemaal veilig). Merken vaak gelabeld als "pet-safe".</li>
            <li><strong>Bewaar antivries veilig:</strong> In afgesloten kasten of hoog op planken waar honden absoluut niet bij kunnen. Gebruik kindveilige doppen.</li>
            <li><strong>Ruim morsen onmiddellijk op:</strong> Zelfs kleine plassen antivries moeten direct worden schoongemaakt. Spoel met ruim water en droog af.</li>
            <li><strong>Controleer je auto regelmatig:</strong> Lekken in de koeling kunnen antivries op de oprit laten druppelen. Controleer regelmatig op groene, oranje of roze vlekken onder je auto.</li>
            <li><strong>Laat je hond niet los lopen in garages:</strong> Garages zijn een hotspot voor antivriesvergiftiging. Houd je hond aangelijnd of buiten de garage.</li>
            <li><strong>Lek geen antivries op straat:</strong> Als je radiator of koelsysteem controleert, lek vloeistof in een bak, niet op straat waar andere honden het kunnen drinken.</li>
            <li><strong>Gooi oude antivries veilig weg:</strong> Breng het naar een afvalverwerkingspunt. Gooi het NOOIT in de gootsteen, toilet of op de grond.</li>
            <li><strong>Waarschuw buren:</strong> Als je ziet dat buren antivries morsen of lekken hebben, waarschuw hen voor het gevaar voor huisdieren.</li>
            <li><strong>Let op in de winter:</strong> Tijdens koude periodes wordt meer antivries gebruikt en is de kans op lekken groter. Wees extra alert.</li>
            <li><strong>Controleer je hond na wandelingen:</strong> Als je in gebieden loopt waar auto's geparkeerd staan, controleer poten en snuit na afloop.</li>
            <li><strong>Programmeer noodnummers:</strong> Zorg dat je dierenarts en 24/7 dierennoodlijn in je telefoon staan voor directe toegang.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Veelgestelde Vragen
          </h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Waarom is antivries zo gevaarlijk voor honden?
              </h3>
              <p className="text-gray-700">
                Antivries bevat ethyleenglycol, een stof die in de lever wordt omgezet in giftige zuren die nierfalen veroorzaken. Het grote gevaar is de zoete smaak - honden drinken het vrijwillig. Zelfs kleine hoeveelheden (1-2 theelepels voor een kleine hond) kunnen dodelijk zijn. Zonder behandeling binnen 8-12 uur is nierfalen onomkeerbaar.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Hoe snel worden honden ziek van antivries?
              </h3>
              <p className="text-gray-700">
                Symptomen verlopen in drie fasen: Fase 1 (30 min - 12 uur): dronken gedrag, braken, dorst. Fase 2 (12-24 uur): schijnbaar herstel maar interne schade. Fase 3 (24-72 uur): ernstig nierfalen, coma, vaak fataal. De eerste fase is het tijdvenster voor succesvolle behandeling - daarna is de schade vaak onomkeerbaar.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Hoeveel antivries is dodelijk voor honden?
              </h3>
              <p className="text-gray-700">
                Zeer kleine hoeveelheden zijn al dodelijk. Voor een kleine hond (5 kg) kan 1-2 theelepels fataal zijn. Voor een middelgrote hond (20 kg) is 2-4 eetlepels dodelijk. Voor grote honden (40 kg) kan 5-8 eetlepels dodelijk zijn. Omdat antivries zoet smaakt, drinken honden vaak meer dan genoeg om te sterven.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Kan mijn hond overleven na antivries inname?
              </h3>
              <p className="text-gray-700">
                Overleving hangt volledig af van snelheid van behandeling. Binnen 2-4 uur na inname: 90-95% overlevingskans met antidotum. Na 8 uur: minder dan 50% kans. Na 12-24 uur: zelfs met behandeling vaak fataal door onomkeerbaar nierfalen. Tijd is absoluut kritiek - elke minuut telt letterlijk.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Wat is het antidotum voor antivries vergiftiging?
              </h3>
              <p className="text-gray-700">
                Het antidotum is fomepizole (4-methylpyrazole) of in noodgevallen ethanol (alcohol). Deze middelen blokkeren het enzym dat ethyleenglycol omzet in giftige stoffen. Fomepizole is veiliger en effectiever. Behandeling moet binnen 8-12 uur starten en wordt gecombineerd met infusen en dialyse indien nodig. Alleen dierenartsen kunnen dit toedienen.
              </p>
            </div>
          </div>

          {/* Medical Disclaimer */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mt-8">
            <h3 className="text-lg font-semibold text-amber-900 mb-2">Medische Disclaimer</h3>
            <p className="text-amber-800 text-sm">
              Deze informatie is bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies. Antivriesvergiftiging is een levensbedreigende noodsituatie waarbij elke minuut telt. Bij ENIG vermoeden van inname, neem ONMIDDELLIJK contact op met je dierenarts of dierennoodlijn. Behandeling binnen 2-4 uur is cruciaal voor overleving. Wacht nooit af - bij twijfel, altijd bellen!
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
