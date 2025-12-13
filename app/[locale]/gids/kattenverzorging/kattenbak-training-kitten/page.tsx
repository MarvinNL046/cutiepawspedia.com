import type { Metadata } from 'next';
import { GidsBreadcrumbs } from '@/components/gids';

export const metadata: Metadata = {
  title: 'Kattenbak Training voor Kittens: Complete Gids 2024',
  description: 'Leer je kitten in 5 stappen de kattenbak te gebruiken. Praktische tips tegen ongelukjes en problemen. Vind kattentrimsalons bij jou in de buurt.',
  openGraph: {
    title: 'Kattenbak Training voor Kittens: Complete Gids',
    description: 'Complete handleiding voor succesvolle kattenbak training. Inclusief probleemoplossing en expert tips.',
  },
};

export default function KattenbakTrainingKittenPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-cpPink/10 to-cpYellow/10">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text-coral">
            Kattenbak Training voor Kittens: Complete Gids
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Een kitten leren de kattenbak te gebruiken is essentieel voor een harmonieus samenleven.
            Ontdek onze stap-voor-stap methode voor succesvolle zindelijkheidstraining.
          </p>

          {/* Primary CTA */}
          <div className="bg-card rounded-2xl shadow-md p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4 text-cpAqua">
              Hulp nodig bij kattenverzorging?
            </h3>
            <p className="text-gray-700 mb-6">
              Vind professionele kattentrimsalons en verzorgingsspecialisten in jouw buurt voor
              persoonlijk advies over zindelijkheidstraining en gedragsproblemen.
            </p>
            <a
              href="/nl/netherlands"
              className="inline-block bg-cpPink text-white rounded-xl px-6 py-3 font-semibold hover:-translate-y-1 transition-transform duration-200 shadow-lg"
            >
              Vind een kattentrimsalon bij jou in de buurt
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-16">
        <div className="max-w-4xl mx-auto px-4">

          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-cpAqua">
              Waarom is kattenbak training belangrijk?
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              Kittens hebben een natuurlijk instinct om hun uitwerpselen te begraven, maar ze moeten
              wel leren waar dit hoort te gebeuren. De meeste kittens zijn al deels getraind door hun
              moeder, maar jouw rol als eigenaar is cruciaal voor succesvolle zindelijkheid.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Goede kattenbak training voorkomt niet alleen ongelukjes in huis, maar draagt ook bij
              aan het welzijn van je kitten. Een stressvolle toiletsituatie kan leiden tot
              gedragsproblemen en zelfs gezondheidsissues.
            </p>
          </section>

          {/* 5-Step Method */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-cpAqua">
              5 Stappen voor Succesvolle Kattenbak Training
            </h2>

            <div className="space-y-6">
              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-2xl font-bold mb-3 text-cpPink">
                  Stap 1: Kies de juiste kattenbak
                </h3>
                <p className="text-gray-700 mb-3">
                  Voor kittens is een lage instap essentieel. Kies een bak van minimaal 1,5x de lengte
                  van je kitten. Vermijd overdekte bakken in het begin - kittens vinden openheid vaak
                  minder bedreigend.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Minimale rand van 5-7 cm voor kleine kittens</li>
                  <li>Plastic materiaal dat makkelijk schoon te maken is</li>
                  <li>Voldoende ruimte om te draaien en graven</li>
                </ul>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-2xl font-bold mb-3 text-cpPink">
                  Stap 2: Selecteer geschikt kattenbakvulling
                </h3>
                <p className="text-gray-700 mb-3">
                  Kittens zijn gevoelig voor geurtjes en texturen. Kies klonterend, geurvrij vulling
                  met fijne korrels die zacht zijn voor gevoelige pootjes.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Bentoniet of plantaardig klonterend kattenbakvulling</li>
                  <li>Laagje van 5-7 cm diep</li>
                  <li>Vermijd geparfumeerde varianten bij jonge kittens</li>
                </ul>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-2xl font-bold mb-3 text-cpPink">
                  Stap 3: Plaats de kattenbak strategisch
                </h3>
                <p className="text-gray-700 mb-3">
                  De locatie van de kattenbak is cruciaal voor succesvolle training. Kittens hebben
                  privacy nodig, maar moeten de bak wel gemakkelijk kunnen vinden.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Rustige plek zonder veel verkeer</li>
                  <li>Weg van eet- en drinkbakken (minimaal 1 meter afstand)</li>
                  <li>Makkelijk bereikbaar vanuit alle kamers</li>
                  <li>Bij meerdere verdiepingen: één bak per verdieping</li>
                </ul>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-2xl font-bold mb-3 text-cpPink">
                  Stap 4: Introduceer je kitten aan de kattenbak
                </h3>
                <p className="text-gray-700 mb-3">
                  Plaats je kitten in de kattenbak kort na het eten, na het spelen en direct na het
                  wakker worden. Dit zijn natuurlijke momenten waarop kittens moeten.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Laat je kitten het vulling zelf ontdekken door te ruiken en graven</li>
                  <li>Gebruik geen dwang - laat het een positieve ervaring zijn</li>
                  <li>Beloon met zachte stem en aai wanneer de bak wordt gebruikt</li>
                  <li>Herhaal dit 6-8 keer per dag in de eerste week</li>
                </ul>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-2xl font-bold mb-3 text-cpPink">
                  Stap 5: Blijf consequent en positief
                </h3>
                <p className="text-gray-700 mb-3">
                  Consequentie is de sleutel tot succes. Houd een vast schema aan en reageer positief
                  op correct gedrag.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Schep de kattenbak minimaal 2x per dag</li>
                  <li>Verschoon het vulling volledig elke 1-2 weken</li>
                  <li>Bestraf nooit bij ongelukjes - dit werkt averechts</li>
                  <li>Reinig ongelukjes met enzymatische reiniger om geuren te verwijderen</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Middle CTA */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-cpYellow/20 to-cpAqua/20 rounded-2xl shadow-md p-8 border-l-4 border-cpAqua">
              <h3 className="text-2xl font-bold mb-4 text-cpAqua">
                Problemen met zindelijkheidstraining?
              </h3>
              <p className="text-gray-700 mb-6">
                Soms hebben kittens extra begeleiding nodig. Een gedragsdeskundige of kattenverzorger
                kan helpen bij hardnekkige zindelijkheidsproblemen en stress bij je kitten.
              </p>
              <a
                href="/nl/netherlands"
                className="inline-block bg-cpAqua text-white rounded-xl px-6 py-3 font-semibold hover:-translate-y-1 transition-transform duration-200 shadow-lg"
              >
                Bekijk dierenartsen en gedragsdeskundigen
              </a>
            </div>
          </section>

          {/* Common Problems */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-cpAqua">
              Veelvoorkomende Problemen en Oplossingen
            </h2>

            <div className="space-y-6">
              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  Kitten plast of poept naast de bak
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Mogelijke oorzaken:</strong>
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                  <li>Kattenbak te klein of te vies</li>
                  <li>Verkeerde locatie (te druk, te ver weg)</li>
                  <li>Medisch probleem zoals urineweginfectie</li>
                  <li>Stress of angst</li>
                </ul>
                <p className="text-gray-700">
                  <strong>Oplossing:</strong> Schep vaker, probeer een andere locatie, en raadpleeg
                  een dierenarts als het probleem aanhoudt. Lees ook onze gids over
                  <a href="/output/seo-pages/kattenverzorging/beste-kattenbakken" className="text-cpPink hover:underline"> de beste kattenbakken</a>
                  om te bepalen of een andere bak beter zou passen.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  Kitten graaft maar doet niets in de bak
                </h3>
                <p className="text-gray-700 mb-3">
                  Dit is normaal gedrag - je kitten oefent het graafgedrag maar is nog niet klaar om
                  te gaan. Laat je kitten rustig de bak verkennen zonder druk uit te oefenen.
                </p>
                <p className="text-gray-700">
                  <strong>Oplossing:</strong> Wees geduldig en probeer het na 15-30 minuten opnieuw.
                  Kittens hebben tijd nodig om te wennen aan de routine.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  Kitten eet het kattenbakvulling
                </h3>
                <p className="text-gray-700 mb-3">
                  Jonge kittens kunnen nieuwsgierig zijn en vulling proeven. Dit is meestal onschuldig
                  maar moet wel ontmoedigd worden.
                </p>
                <p className="text-gray-700">
                  <strong>Oplossing:</strong> Schakel over naar natuurlijk, eetbaar vulling zoals
                  maisvulling of houtvezelvulling. Houd je kitten in de gaten en haal het voorzichtig
                  uit de mond als je het ziet gebeuren.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  Meerdere kittens gebruiken de bak niet
                </h3>
                <p className="text-gray-700 mb-3">
                  Bij meerdere kittens is territoriumgedrag een belangrijke factor. Elke kat heeft
                  behoefte aan voldoende toiletvoorzieningen.
                </p>
                <p className="text-gray-700">
                  <strong>Oplossing:</strong> De regel is: aantal katten + 1 kattenbak. Voor 2 kittens
                  heb je dus minimaal 3 bakken nodig, verspreid over verschillende locaties.
                </p>
              </div>
            </div>
          </section>

          {/* Tips for Success */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-cpAqua">
              Extra Tips voor Succesvolle Training
            </h2>

            <div className="bg-card rounded-2xl shadow-md p-8">
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <span className="text-cpPink text-2xl mr-3">✓</span>
                  <div>
                    <strong>Begin vroeg:</strong> Start met kattenbak training zodra je kitten
                    thuiskomt, idealiter rond 8-12 weken oud.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-cpPink text-2xl mr-3">✓</span>
                  <div>
                    <strong>Vermijd stress:</strong> Houd andere huisdieren en kinderen weg tijdens
                    toiletmomenten. Voor meer verzorgingstips, zie onze gids over
                    <a href="/output/seo-pages/kattenverzorging/langhaar-katten-verzorgen" className="text-cpPink hover:underline"> langhaar katten verzorgen</a>.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-cpPink text-2xl mr-3">✓</span>
                  <div>
                    <strong>Beloon goed gedrag:</strong> Gebruik zachte complimenten en aai wanneer
                    de bak correct wordt gebruikt.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-cpPink text-2xl mr-3">✓</span>
                  <div>
                    <strong>Hou de bak schoon:</strong> Kittens zijn extreem schoon en weigeren een
                    vieze bak te gebruiken. Ook
                    <a href="/output/seo-pages/kattenverzorging/katten-borstelen" className="text-cpPink hover:underline"> regelmatig borstelen</a>
                    helpt je kitten zich schoon te voelen.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-cpPink text-2xl mr-3">✓</span>
                  <div>
                    <strong>Wees geduldig:</strong> Sommige kittens leren sneller dan anderen.
                    Consistentie en geduld zijn belangrijker dan snelheid.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-cpPink text-2xl mr-3">✓</span>
                  <div>
                    <strong>Monitor de gezondheid:</strong> Let op veranderingen in toiletgedrag -
                    dit kan wijzen op gezondheidsproblemen. Bij lange nagels kunnen
                    <a href="/output/seo-pages/kattenverzorging/kattennagels-knippen" className="text-cpPink hover:underline"> kattennagels knippen</a>
                    ook helpen bij comfort in de kattenbak.
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-cpAqua">
              Veelgestelde Vragen over Kattenbak Training
            </h2>

            <div className="space-y-4">
              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  Hoe lang duurt het om een kitten zindelijk te maken?
                </h3>
                <p className="text-gray-700">
                  De meeste kittens leren de kattenbak te gebruiken binnen 1-2 weken na thuiskomst.
                  Sommige kittens pakken het binnen enkele dagen op, terwijl anderen 3-4 weken nodig
                  hebben. Consistentie en positieve versterking versnellen het proces aanzienlijk.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  Kan ik mijn kitten straffen voor ongelukjes?
                </h3>
                <p className="text-gray-700">
                  Nee, straffen werkt averechts en kan angst en stress veroorzaken. Kittens begrijpen
                  het verband niet tussen straf en het ongelukje. Dit leidt vaak tot meer problemen.
                  Gebruik in plaats daarvan positieve versterking wanneer de bak wel correct wordt gebruikt.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  Hoeveel kattenbakken heb ik nodig?
                </h3>
                <p className="text-gray-700">
                  De basisregel is: aantal katten + 1 kattenbak. Voor één kitten zijn dus minimaal
                  2 bakken ideaal, vooral in een groot huis of met meerdere verdiepingen. Dit geeft
                  je kitten altijd toegang tot een schone toiletvoorziening.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  Wanneer moet ik een dierenarts raadplegen?
                </h3>
                <p className="text-gray-700">
                  Raadpleeg een dierenarts als je kitten plotseling stopt met het gebruik van de
                  kattenbak, meerdere keren per dag kleine beetjes plast, bloed in de urine heeft,
                  of tekenen van pijn toont bij het toiletbezoek. Dit kunnen symptomen zijn van
                  urineweginfecties of andere medische problemen.
                </p>
              </div>
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="mb-12">
            <div className="bg-gradient-to-br from-cpPink to-cpYellow rounded-2xl shadow-lg p-8 text-white text-center">
              <h3 className="text-3xl font-bold mb-4">
                Klaar om je kitten te trainen?
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Ontdek alle huisdierservices in jouw regio - van kattentrimsalons tot gedragsdeskundigen
                en dierenartsen die je kunnen helpen bij elke stap van je kattenverzorging.
              </p>
              <a
                href="/nl/netherlands"
                className="inline-block bg-white text-cpPink rounded-xl px-8 py-4 font-bold hover:-translate-y-1 transition-transform duration-200 shadow-lg"
              >
                Ontdek alle huisdierservices
              </a>
            </div>
          </section>

        </div>
      </article>

      {/* Schema.org Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Kattenbak Training voor Kittens: Complete Gids',
            description: 'Leer je kitten in 5 stappen de kattenbak te gebruiken met praktische tips tegen ongelukjes en problemen.',
            author: {
              '@type': 'Organization',
              name: 'CutiePawsPedia',
            },
            publisher: {
              '@type': 'Organization',
              name: 'CutiePawsPedia',
            },
            datePublished: '2024-01-15',
            dateModified: '2024-01-15',
          }),
        }}
      />

      <GidsBreadcrumbs
        items={[
          { label: "Kattenverzorging", href: "/nl/gids/kattenverzorging" },
          { label: "Kattenbak training voor kittens" }
        ]}
      />
    </div>
  );
}
