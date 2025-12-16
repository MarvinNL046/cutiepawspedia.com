import type { Metadata } from 'next';
import Link from 'next/link';
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: 'Is Batterijen Giftig voor Honden? Symptomen & Spoedhulp',
  description: 'Batterijen zijn zeer giftig voor honden door bijtende chemicaliën en zware metalen. Ontdek de symptomen van batterijvergiftiging en wat te doen als je hond een batterij heeft ingeslikt.',
  keywords: 'batterijen giftig honden, hond batterij ingeslikt, knoopcel batterij hond, lithium batterij hond, batterijvergiftiging hond, alkali batterij',
  openGraph: {
    title: 'Is Batterijen Giftig voor Honden? Levensreddende Info',
    description: 'Batterijen kunnen levensbedreigende brandwonden en vergiftiging veroorzaken bij honden. Leer de symptomen en spoedmaatregelen.',
    type: 'article',
    publishedTime: '2025-12-15',
    modifiedTime: '2025-12-15',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function IsBatterijenGiftigVoorHonden() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Is Batterijen Giftig voor Honden?',
    description: 'Uitgebreide informatie over batterijvergiftiging bij honden, inclusief symptomen en spoedeisende behandeling',
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
        name: 'Wat gebeurt er als een hond een batterij inslikt?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Als een hond een batterij inslikt, kunnen binnen 15-30 minuten ernstige chemische brandwonden ontstaan in de slokdarm en maag. Knoopcel batterijen zijn het gevaarlijkst en kunnen een elektrische stroom genereren die weefsel vernietigt. Symptomen zijn kwijlen, braken, buikpijn en ademhalingsproblemen. Dit is een levensbedreigende noodsituatie - ga ONMIDDELLIJK naar de dierenarts.',
        },
      },
      {
        '@type': 'Question',
        name: 'Welke batterijen zijn het gevaarlijkst voor honden?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Lithium knoopcel batterijen (zoals CR2032) zijn het gevaarlijkst voor honden. Ze genereren een elektrische stroom die ernstige chemische brandwonden veroorzaakt binnen 15-30 minuten. Alkali batterijen (AA, AAA, D) bevatten bijtend kaliumhydroxide. Auto-accu\'s bevatten geconcentreerd zwavelzuur. Alle batterijen zijn gevaarlijk en vereisen directe veterinaire hulp.',
        },
      },
      {
        '@type': 'Question',
        name: 'Hoe snel moet ik naar de dierenarts als mijn hond een batterij heeft ingeslikt?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ONMIDDELLIJK - elke minuut telt bij batterijvergiftiging. Chemische brandwonden kunnen binnen 15-30 minuten ernstige schade aanrichten. Bel direct je dierenarts terwijl je onderweg bent. Knoopcel batterijen zijn het meest urgent - er is vaak maar 30-60 minuten tijd voordat permanente schade optreedt. Dit is ALTIJD een noodsituatie.',
        },
      },
      {
        '@type': 'Question',
        name: 'Kan een hond een batterij overleven?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, veel honden overleven batterijvergiftiging met snelle en adequate behandeling. De prognose hangt af van het batterijtype, hoe lang de batterij in het lichaam is, en hoe snel behandeling wordt gestart. Knoopcel batterijen hebben de slechtste prognose als ze niet binnen 1-2 uur worden verwijderd. Met spoedeisende chirurgie en intensieve zorg kunnen veel honden volledig herstellen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Moet ik mijn hond laten braken als hij een batterij heeft ingeslikt?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'NEE - laat je hond NOOIT zelf braken na het inslikken van een batterij. Braken kan de batterij laten verschuiven en meer schade veroorzaken, of de bijtende chemicaliën kunnen extra brandwonden maken in de slokdarm. Alleen een dierenarts kan beslissen of braken opwekken veilig is, of dat chirurgische verwijdering nodig is. Ga direct naar de dierenarts.',
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
          currentPage="Batterijen voor Honden"
        />

        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Is Batterijen Giftig voor Honden?
        </h1>

        {/* TL;DR Verdict Box */}
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
          <h2 className="text-xl font-bold text-red-900 mb-2">
            Risico: Zeer hoog - Levensbedreigende noodsituatie
          </h2>
          <p className="text-red-800">
            <strong>Knoopcel Batterijen (CR2032, etc.):</strong> Zeer gevaarlijk - Chemische brandwonden kunnen snel ontstaan
            <br />
            <strong>Alkali Batterijen (AA, AAA, D):</strong> Zeer gevaarlijk - Bijtend kaliumhydroxide, weefselvernietiging
            <br />
            <strong>Lithium Batterijen:</strong> ZEER GEVAARLIJK - Brand- en explosiegevaar, zware metaalvergiftiging
            <br />
            <strong>Auto-accu's:</strong> EXTREEM GEVAARLIJK - Geconcentreerd zwavelzuur
            <br />
            <strong>SPOED:</strong> Elke batterij is een noodgeval - GA ONMIDDELLIJK NAAR DE DIERENARTS!
          </p>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Waarom Zijn Batterijen Zo Gevaarlijk voor Honden?
          </h2>
          <p className="text-gray-700 mb-4">
            Batterijen behoren tot de gevaarlijkste voorwerpen die een hond kan inslikken. Ze veroorzaken schade op drie manieren:
          </p>
          <ol className="list-decimal pl-6 mb-4 text-gray-700 space-y-3">
            <li>
              <strong>Bijtende Chemicaliën:</strong> Batterijen bevatten alkalische of zure stoffen (kaliumhydroxide, zwavelzuur) die ernstige chemische brandwonden veroorzaken aan weefsels in de bek, slokdarm, maag en darmen.
            </li>
            <li>
              <strong>Elektrische Stroom:</strong> Knoopcel batterijen genereren een elektrische stroom wanneer ze in contact komen met lichaamsvocht. Dit veroorzaakt elektrolyse die weefsel vernietigt binnen 15-30 minuten.
            </li>
            <li>
              <strong>Zware Metalen:</strong> Batterijen bevatten toxische metalen zoals lood, kwik, lithium, nikkel en cadmium die vergiftiging veroorzaken.
            </li>
          </ol>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Verschillende Soorten Batterijen en Hun Gevaren:
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>
              <strong>Lithium Knoopcel Batterijen (CR2032, CR2025, etc.):</strong> EXTREEM GEVAARLIJK - Genereren elektrische stroom, veroorzaken ernstige brandwonden binnen 15-30 minuten, hoogste mortaliteit
            </li>
            <li>
              <strong>Alkali Batterijen (AA, AAA, C, D, 9V):</strong> ZEER GEVAARLIJK - Bevatten kaliumhydroxide, zeer bijtend, kan slokdarm en maag perforeren
            </li>
            <li>
              <strong>Lithium Batterijen (cilindervorm):</strong> ZEER GEVAARLIJK - Kunnen overmatig verhitten, brand of explosie in het lichaam
            </li>
            <li>
              <strong>Nikkel-Cadmium/Nikkel-Metaalhydride (oplaadbaar):</strong> GEVAARLIJK - Bevatten toxische zware metalen
            </li>
            <li>
              <strong>Auto-accu's (Lood-Zuur):</strong> EXTREEM GEVAARLIJK - Geconcentreerd zwavelzuur, enorme chemische brandwonden
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Symptomen van Batterijvergiftiging bij Honden
          </h2>
          <p className="text-gray-700 mb-4">
            Symptomen kunnen snel verschijnen (binnen 15-30 minuten) en variëren afhankelijk van het batterijtype en de locatie:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Vroege Symptomen (Eerste Uur):
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Excessief kwijlen of schuim uit de bek</li>
            <li>Wrijven met poten aan de bek</li>
            <li>Braken (soms met bloed)</li>
            <li>Weigering om te eten of drinken</li>
            <li>Moeite met slikken</li>
            <li>Rochelen of hoesten</li>
            <li>Onrust en pijn</li>
            <li>Brandwonden zichtbaar in de bek of op de tong</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Matige Symptomen (1-6 Uur):
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Zwarte of bloederige ontlasting</li>
            <li>Bloederig braken</li>
            <li>Extreme buikpijn</li>
            <li>Koorts</li>
            <li>Snelle of moeizame ademhaling</li>
            <li>Verhoogde hartslag</li>
            <li>Bleke of gele tandvlees</li>
            <li>Zwakte en lethargie</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Ernstige Symptomen (6+ Uur of Later):
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Shock (koude poten, bleke tandvlees, zwakke pols)</li>
            <li>Perforatie van slokdarm of maag (levensbedreigende)</li>
            <li>Ademhalingsproblemen of verstikking</li>
            <li>Bewusteloosheid of coma</li>
            <li>Stuipen of convulsies</li>
            <li>Orgaanfalen (nier, lever)</li>
            <li>Sepsis (bloedvergiftiging)</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Wat Te Doen Als Je Hond Een Batterij Heeft Ingeslikt
          </h2>
          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
            <p className="text-red-900 font-bold mb-3">
              Dit is een levensbedreigende noodsituatie - Snelle actie vereist
            </p>
            <ol className="list-decimal pl-6 space-y-3 text-red-900">
              <li>
                <strong>Bel onmiddellijk je dierenarts</strong> - Bel terwijl je naar de kliniek rijdt
              </li>
              <li>
                <strong>Identificeer de batterij</strong> - Probeer het type, merk en grootte te achterhalen (knoopcel is het gevaarlijkst)
              </li>
              <li>
                <strong>Ga direct naar de dierenarts</strong> - Wacht niet op symptomen, chemische brandwonden kunnen snel ontstaan
              </li>
              <li>
                <strong>Laat je hond niet braken</strong> - Dit kan meer schade veroorzaken en is gevaarlijk bij batterijen
              </li>
              <li>
                <strong>Geef geen voedsel, water of melk</strong> - Dit kan de reactie versnellen
              </li>
              <li>
                <strong>Monitor ademhaling</strong> - Zorg dat luchtwegen vrij blijven
              </li>
              <li>
                <strong>Breng de batterijverpakking mee</strong> - Voor identificatie van chemische samenstelling
              </li>
              <li>
                <strong>Wees voorbereid op spoedeisende chirurgie</strong> - Vaak is directe verwijdering nodig
              </li>
            </ol>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Behandeling van Batterijvergiftiging
          </h2>
          <p className="text-gray-700 mb-4">
            De dierenarts zal onmiddellijk actie ondernemen:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Diagnostiek:
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Röntgenfoto's om de locatie van de batterij te bepalen</li>
            <li>Bloedonderzoek voor orgaanfunctie en zware metalen</li>
            <li>Endoscopie om weefselschade te beoordelen</li>
            <li>ECG bij hartritmestoornissen</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Spoedbehandeling:
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>
              <strong>Endoscopische verwijdering:</strong> Voorkeursmethode voor batterijen in slokdarm of maag (binnen 1-2 uur)
            </li>
            <li>
              <strong>Chirurgische verwijdering:</strong> Bij knoopcel batterijen of als endoscopie niet mogelijk is
            </li>
            <li>
              <strong>Neutralisatie:</strong> Spoelen met water of neutraliserende oplossingen (alleen door dierenarts)
            </li>
            <li>
              <strong>Infuus:</strong> Voor hydratie en ondersteuning van nieren (helpt toxines uitscheiden)
            </li>
            <li>
              <strong>Pijnbestrijding:</strong> Opioïden voor ernstige pijn
            </li>
            <li>
              <strong>Antibiotica:</strong> Preventie van infecties bij brandwonden
            </li>
            <li>
              <strong>Maagbescherming:</strong> Medicijnen om maagzuur te verminderen
            </li>
            <li>
              <strong>Intensieve monitoring:</strong> 24-48 uur observatie voor complicaties
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Langetermijnbehandeling:
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Behandeling van slokdarm of maagperforaties (indien opgetreden)</li>
            <li>Chelatietherapie voor zware metaalvergiftiging</li>
            <li>Gespecialiseerde voeding via sonde bij slokdarmstenose</li>
            <li>Follow-up endoscopieën om genezing te monitoren</li>
            <li>Herhaalde bloedtests voor orgaanfunctie</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Prognose en Herstel
          </h2>
          <p className="text-gray-700 mb-4">
            De prognose hangt af van verschillende factoren:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>
              <strong>Snelheid van behandeling:</strong> Snelle veterinaire hulp verbetert de prognose aanzienlijk
            </li>
            <li>
              <strong>Batterijtype:</strong> Knoopcel = slechtste prognose, AA/AAA = beter met snelle behandeling
            </li>
            <li>
              <strong>Locatie:</strong> Slokdarm = meest kritisch, maag = beter als snel verwijderd
            </li>
            <li>
              <strong>Complicaties:</strong> Perforaties en sepsis verlagen overlevingskans aanzienlijk
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Preventietips: Houd Batterijen Veilig Weg Van Je Hond
          </h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              <strong>Berg batterijen veilig op</strong> - In afgesloten laden of kasten op hoogte
            </li>
            <li>
              <strong>Controleer afstandsbedieningen en speelgoed</strong> - Zorg dat batterijvakjes goed gesloten zijn en niet gemakkelijk geopend kunnen worden
            </li>
            <li>
              <strong>Gooi oude batterijen direct weg</strong> - In een afvalemmer met deksel buiten bereik
            </li>
            <li>
              <strong>Pas op met knoopcel batterijen</strong> - Deze zitten in horloges, sleutels, weegschalen, en LED-kaarsen
            </li>
            <li>
              <strong>Controleer de vloer</strong> - Batterijen kunnen uit apparaten rollen tijdens vervanging
            </li>
            <li>
              <strong>Leer kinderen batterijveiligheid</strong> - Zorg dat kinderen batterijen niet laten rondslingeren
            </li>
            <li>
              <strong>Gebruik veilige speelgoed</strong> - Kies hondenspeelgoed zonder batterijen waar mogelijk
            </li>
            <li>
              <strong>Controleer kerstversiering</strong> - LED-kaarsen en lichtjes bevatten vaak knoopcel batterijen
            </li>
            <li>
              <strong>Ruim onmiddellijk op</strong> - Als een apparaat kapot gaat, verwijder direct de batterijen
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Veelgestelde Vragen
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Wat gebeurt er als een hond een batterij inslikt?
          </h3>
          <p className="text-gray-700 mb-4">
            Als een hond een batterij inslikt, kunnen binnen 15-30 minuten ernstige chemische brandwonden ontstaan in de slokdarm en maag. Knoopcel batterijen zijn het gevaarlijkst en kunnen een elektrische stroom genereren die weefsel vernietigt. Symptomen zijn kwijlen, braken, buikpijn en ademhalingsproblemen. Dit is een levensbedreigende noodsituatie - ga ONMIDDELLIJK naar de dierenarts.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Welke batterijen zijn het gevaarlijkst voor honden?
          </h3>
          <p className="text-gray-700 mb-4">
            Lithium knoopcel batterijen (zoals CR2032) zijn het gevaarlijkst voor honden. Ze genereren een elektrische stroom die ernstige chemische brandwonden veroorzaakt binnen 15-30 minuten. Alkali batterijen (AA, AAA, D) bevatten bijtend kaliumhydroxide. Auto-accu's bevatten geconcentreerd zwavelzuur. Alle batterijen zijn gevaarlijk en vereisen directe veterinaire hulp.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Hoe snel moet ik naar de dierenarts als mijn hond een batterij heeft ingeslikt?
          </h3>
          <p className="text-gray-700 mb-4">
            Onmiddellijk - snelle actie is essentieel bij batterijvergiftiging. Chemische brandwonden kunnen snel ernstige schade aanrichten. Bel direct je dierenarts terwijl je onderweg bent. Dit vereist altijd spoedbehandeling.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Kan een hond een batterij overleven?
          </h3>
          <p className="text-gray-700 mb-4">
            Ja, veel honden overleven batterijvergiftiging met snelle en adequate behandeling. De prognose hangt af van het batterijtype, hoe lang de batterij in het lichaam is, en hoe snel behandeling wordt gestart. Knoopcel batterijen hebben de slechtste prognose als ze niet binnen 1-2 uur worden verwijderd. Met spoedeisende chirurgie en intensieve zorg kunnen veel honden volledig herstellen.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Moet ik mijn hond laten braken als hij een batterij heeft ingeslikt?
          </h3>
          <p className="text-gray-700 mb-4">
            Nee - laat je hond niet zelf braken na het inslikken van een batterij. Braken kan de batterij laten verschuiven en meer schade veroorzaken, of de bijtende chemicaliën kunnen extra brandwonden maken in de slokdarm. Alleen een dierenarts kan beslissen of braken opwekken veilig is, of dat chirurgische verwijdering nodig is. Ga direct naar de dierenarts.
          </p>

          {/* Medical Disclaimer */}
          <div className="bg-gray-50 border-l-4 border-gray-400 p-6 mt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Medische Disclaimer
            </h3>
            <p className="text-gray-700 text-sm">
              Deze informatie is bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies. Batterijvergiftiging is een levensbedreigende noodsituatie die onmiddellijke veterinaire interventie vereist. Als je vermoedt dat je hond een batterij heeft ingeslikt, ga dan ONMIDDELLIJK naar de dierenarts of de dichtstbijzijnde dierenartsenpraktijk voor spoedeisende gevallen. Elke minuut telt - aarzelen kan fataal zijn.
            </p>
          </div>

          {/* Related Links */}
          <div className="mt-8 p-6 bg-emerald-50 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Gerelateerde Artikelen
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/nl/is-lijm-giftig-voor-honden"
                  className="text-emerald-600 hover:text-emerald-700 hover:underline"
                >
                  Is Lijm Giftig voor Honden?
                </Link>
              </li>
              <li>
                <Link
                  href="/nl/is-verf-giftig-voor-honden"
                  className="text-emerald-600 hover:text-emerald-700 hover:underline"
                >
                  Is Verf Giftig voor Honden?
                </Link>
              </li>
              <li>
                <Link
                  href="/nl/giftige-metalen-huisdieren"
                  className="text-emerald-600 hover:text-emerald-700 hover:underline"
                >
                  Giftige Metalen voor Huisdieren
                </Link>
              </li>
            </ul>
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
