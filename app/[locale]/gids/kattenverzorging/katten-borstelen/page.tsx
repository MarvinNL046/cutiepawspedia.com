import type { Metadata } from 'next';
import { GidsBreadcrumbs } from '@/components/gids';

export const metadata: Metadata = {
  title: 'Kattenborstelen: Hoe Vaak en Met Welke Borstel? [Gids]',
  description: 'Ontdek hoe vaak je je kat moet borstelen, welke borstel je nodig hebt en tips tegen klitten. Praktische gids voor korte en langhaar katten.',
  openGraph: {
    title: 'Kattenborstelen: Hoe Vaak en Met Welke Borstel?',
    description: 'Complete gids over kattenborstelen met expert tips voor elke vachttype.',
  },
};

export default function KattenBorstelenPage() {
  return (
    <div className="min-h-screen bg-background">
      <GidsBreadcrumbs
        items={[
          { label: "Kattenverzorging", href: "/nl/gids/kattenverzorging" },
          { label: "Katten borstelen" }
        ]}
      />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-cpAqua/10 to-cpPink/10">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text-coral">
            Kattenborstelen: Hoe Vaak en Met Welke Borstel?
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Regelmatig borstelen houdt de vacht van je kat gezond, voorkomt klitten en versterkt
            jullie band. Leer welke borstel je nodig hebt en hoe vaak je moet borstelen op basis
            van het vachttype van je kat.
          </p>

          {/* Primary CTA */}
          <div className="bg-card rounded-2xl shadow-md p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4 text-cpPink">
              Professionele kattenverzorging nodig?
            </h3>
            <p className="text-gray-700 mb-6">
              Bij hardnekkige klitten, vachtverveling of speciaal verzorgingsadvies kan een
              professionele kattentrimsalon helpen. Vind de beste trimspecialisten bij jou in de buurt.
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

          {/* Why Brushing Matters */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-cpAqua">
              Waarom is Kattenborstelen Belangrijk?
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              Katten zijn natuurlijk heel zindelijk en besteden veel tijd aan het verzorgen van hun
              vacht. Toch is jouw hulp onmisbaar voor een gezonde huid en vacht, vooral bij langhaar
              rassen zoals Perzische katten of Maine Coons.
            </p>

            <div className="bg-card rounded-2xl shadow-md p-8 mb-6">
              <h3 className="text-2xl font-bold mb-4 text-cpPink">
                Voordelen van Regelmatig Borstelen
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-cpAqua text-2xl mr-3">✓</span>
                  <div>
                    <strong>Voorkomt haarballen:</strong> Verwijdert losse haren voordat je kat
                    ze kan inslikken tijdens zelfverzorging.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-cpAqua text-2xl mr-3">✓</span>
                  <div>
                    <strong>Vermindert klitten:</strong> Vooral belangrijk voor langhaar katten -
                    klitten kunnen pijnlijk zijn en huidproblemen veroorzaken.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-cpAqua text-2xl mr-3">✓</span>
                  <div>
                    <strong>Stimuleert de bloedcirculatie:</strong> Borstelen masseert de huid
                    en stimuleert natuurlijke huidoliën voor een glanzende vacht.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-cpAqua text-2xl mr-3">✓</span>
                  <div>
                    <strong>Verkleint verharing in huis:</strong> Vang losse haren op de borstel
                    in plaats van op je bank en kleding.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-cpAqua text-2xl mr-3">✓</span>
                  <div>
                    <strong>Versterkt jullie band:</strong> Veel katten vinden borstelen
                    ontspannend en genieten van de aandacht.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-cpAqua text-2xl mr-3">✓</span>
                  <div>
                    <strong>Vroege detectie van problemen:</strong> Tijdens het borstelen kun je
                    parasieten, huidaandoeningen of knobbeltjes opsporen.
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Brushing Frequency */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-cpAqua">
              Hoe Vaak Moet Je Je Kat Borstelen?
            </h2>

            <div className="space-y-6">
              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-2xl font-bold mb-3 text-cpPink">
                  Korte Vacht (Brits Korthaar, Siamese, Burmees)
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Frequentie:</strong> 1-2 keer per week
                </p>
                <p className="text-gray-700 mb-3">
                  Korthaar katten verzorgen zichzelf goed, maar wekelijks borstelen helpt overtollig
                  haar te verwijderen en voorkomt haarballen. Tijdens de rui (voorjaar en najaar) kun
                  je beter dagelijks borstelen.
                </p>
                <p className="text-gray-700">
                  <strong>Tijdsinvestering:</strong> 5-10 minuten per sessie
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-2xl font-bold mb-3 text-cpPink">
                  Halflanghaar (Ragdoll, Maine Coon, Noorse Boskat)
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Frequentie:</strong> 3-4 keer per week
                </p>
                <p className="text-gray-700 mb-3">
                  Deze katten hebben een dichtere ondervacht die sneller verwart. Regelmatig borstelen
                  voorkomt klitten, vooral bij de staart, buik en achter de oren.
                </p>
                <p className="text-gray-700">
                  <strong>Tijdsinvestering:</strong> 10-15 minuten per sessie. Voor meer tips, zie ook
                  <a href="/output/seo-pages/kattenverzorging/langhaar-katten-verzorgen" className="text-cpPink hover:underline"> langhaar katten verzorgen</a>.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-2xl font-bold mb-3 text-cpPink">
                  Langhaar (Perzische kat, Himalaya, Angora)
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Frequentie:</strong> Dagelijks
                </p>
                <p className="text-gray-700 mb-3">
                  Langhaar katten vereisen de meeste verzorging. Hun lange, zijdezachte vacht klit
                  snel, vooral rond de hals, buik en achterste. Dagelijks borstelen is essentieel
                  om pijnlijke klitten te voorkomen.
                </p>
                <p className="text-gray-700">
                  <strong>Tijdsinvestering:</strong> 15-20 minuten per sessie
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-2xl font-bold mb-3 text-cpPink">
                  Naaktheid en Rex-rassen (Sphynx, Cornish Rex, Devon Rex)
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Frequentie:</strong> Speciale verzorging nodig
                </p>
                <p className="text-gray-700 mb-3">
                  Deze rassen hebben weinig tot geen vacht maar vereisen wel speciale huidverzorging.
                  Wekelijks wassen met een zachte doek en kattenvriendelijke shampoo is noodzakelijk
                  om talg en vuil te verwijderen.
                </p>
                <p className="text-gray-700">
                  <strong>Tijdsinvestering:</strong> 10-15 minuten per week voor huidverzorging
                </p>
              </div>
            </div>
          </section>

          {/* Middle CTA */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-cpPink/20 to-cpYellow/20 rounded-2xl shadow-md p-8 border-l-4 border-cpPink">
              <h3 className="text-2xl font-bold mb-4 text-cpPink">
                Hardnekkige klitten of vachtverveling?
              </h3>
              <p className="text-gray-700 mb-6">
                Sommige klitten zijn te stevig om zelf te verwijderen zonder je kat pijn te doen.
                Een professionele trimsalon kan helpen met specialistische verzorging en advies op maat.
              </p>
              <a
                href="/nl/netherlands"
                className="inline-block bg-cpPink text-white rounded-xl px-6 py-3 font-semibold hover:-translate-y-1 transition-transition duration-200 shadow-lg"
              >
                Vind kattentrimsalons en verzorgingsspecialisten
              </a>
            </div>
          </section>

          {/* Brush Types */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-cpAqua">
              Welke Borstel Heb Je Nodig? Overzicht per Type
            </h2>

            <div className="space-y-6">
              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-2xl font-bold mb-3 text-cpPink">
                  1. Slicker Brush (Fijne Pinnen Borstel)
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Beste voor:</strong> Langhaar en halflanghaar katten
                </p>
                <p className="text-gray-700 mb-3">
                  Een slicker brush heeft fijne, gebogen draadpinnen die ideaal zijn voor het
                  verwijderen van losse haren en het ontwarren van kleine klitten. De gebogen pinnen
                  dringen diep door in de vacht zonder de huid te beschadigen.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Perfect voor dagelijks gebruik bij langhaar katten</li>
                  <li>Verwijdert effectief losse ondervacht</li>
                  <li>Let op: gebruik zachte druk om huidirritatie te voorkomen</li>
                </ul>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-2xl font-bold mb-3 text-cpPink">
                  2. Metalen Kam (Wide-Tooth Comb)
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Beste voor:</strong> Alle vachttypen, vooral langhaar
                </p>
                <p className="text-gray-700 mb-3">
                  Een metalen kam met wijde tanden is essentieel voor het opsporen en voorzichtig
                  ontwarren van klitten. Het is het perfecte hulpmiddel voor precisiewerk rond
                  gevoelige gebieden zoals oren en gezicht.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Onmisbaar voor het controleren op klitten</li>
                  <li>Ideaal voor de afwerking na het borstelen</li>
                  <li>Veilig voor gebruik rond gevoelige plekken</li>
                </ul>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-2xl font-bold mb-3 text-cpPink">
                  3. Rubberen Borstel (Rubber Grooming Brush)
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Beste voor:</strong> Korthaar katten
                </p>
                <p className="text-gray-700 mb-3">
                  Een rubberen borstel met zachte noppen masseert de huid en verwijdert losse haren
                  effectief. De meeste katten vinden deze borstel prettig omdat het aanvoelt als
                  gestreeld worden.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Stimuleert de bloedcirculatie en natuurlijke oliën</li>
                  <li>Perfect voor katten die niet van borstelen houden</li>
                  <li>Makkelijk schoon te maken</li>
                </ul>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-2xl font-bold mb-3 text-cpPink">
                  4. Furminator / Ondervacht Kam
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Beste voor:</strong> Katten met dubbele vacht tijdens rui
                </p>
                <p className="text-gray-700 mb-3">
                  Een furminator is speciaal ontworpen om losse ondervacht te verwijderen zonder de
                  deklaag te beschadigen. Zeer effectief tijdens de rui, maar gebruik niet te vaak.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Reduceert verharing tot 90% tijdens ruiperiodes</li>
                  <li>Gebruik maximaal 1-2 keer per week</li>
                  <li>Niet geschikt voor langhaar katten met klitten</li>
                  <li>Altijd voorzichtig gebruiken - kan huidirritatie veroorzaken bij overmatig gebruik</li>
                </ul>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-2xl font-bold mb-3 text-cpPink">
                  5. Handschoen Borstel (Grooming Glove)
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Beste voor:</strong> Alle vachttypen, katten die niet van borstelen houden
                </p>
                <p className="text-gray-700 mb-3">
                  Een handschoen met zachte rubberen noppen waarmee je je kat kunt aaien terwijl je
                  losse haren verwijdert. Perfect voor het introduceren van katten aan borstellroutines.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Voelt aan als aaien, niet als borstelen</li>
                  <li>Ideaal voor angstige of onwillige katten</li>
                  <li>Geschikt voor gevoelige plekken zoals buik en poten</li>
                </ul>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-2xl font-bold mb-3 text-cpPink">
                  6. Klittensnijder / Dematting Tool
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Beste voor:</strong> Verwijderen van hardnekkige klitten
                </p>
                <p className="text-gray-700 mb-3">
                  Een gespecialiseerd gereedschap met scherpe tanden die veilig door klitten kunnen
                  snijden zonder de huid te beschadigen. Gebruik alleen bij hardnekkige klitten.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Laatste redmiddel voor klitten voordat je knipt</li>
                  <li>Vereist voorzichtig gebruik en ervaring</li>
                  <li>Raadpleeg een professional bij zeer vervilte vacht</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Brushing Technique */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-cpAqua">
              Stap-voor-Stap: Zo Borstel Je Je Kat Correct
            </h2>

            <div className="bg-card rounded-2xl shadow-md p-8">
              <ol className="space-y-6 text-gray-700">
                <li>
                  <strong className="text-cpPink text-lg">Stap 1: Kies het juiste moment</strong>
                  <p className="mt-2">
                    Borstel je kat wanneer hij rustig en ontspannen is, bijvoorbeeld na het eten of
                    tijdens een luie middag. Vermijd momenten wanneer je kat speels of gejaagd is.
                  </p>
                </li>
                <li>
                  <strong className="text-cpPink text-lg">Stap 2: Creëer een comfortabele omgeving</strong>
                  <p className="mt-2">
                    Kies een rustige plek zonder afleiding. Leg een handdoek neer om losse haren op
                    te vangen. Zorg dat je alle benodigde borstels bij de hand hebt.
                  </p>
                </li>
                <li>
                  <strong className="text-cpPink text-lg">Stap 3: Begin met aaien en inspectie</strong>
                  <p className="mt-2">
                    Start door je kat rustig te aaien en de vacht te inspecteren op klitten,
                    parasieten of huidproblemen. Dit helpt je kat te ontspannen en geeft je een
                    overzicht van probleemgebieden. Net als bij
                    <a href="/output/seo-pages/kattenverzorging/kattennagels-knippen" className="text-cpPink hover:underline"> nagels knippen</a>,
                    is een rustige start essentieel.
                  </p>
                </li>
                <li>
                  <strong className="text-cpPink text-lg">Stap 4: Borstel in de richting van de haargroei</strong>
                  <p className="mt-2">
                    Begin bij de kop en werk naar de staart toe. Gebruik lange, zachte bewegingen in
                    de richting van de haargroei. Borstel eerst de rug, dan de zijkanten, en tenslotte
                    buik en poten (als je kat dit toelaat).
                  </p>
                </li>
                <li>
                  <strong className="text-cpPink text-lg">Stap 5: Werk klitten voorzichtig uit</strong>
                  <p className="mt-2">
                    Als je een klit tegenkomt, probeer deze voorzichtig uit te kammen met je vingers
                    of een metalen kam. Werk van buiten naar binnen. Bij hardnekkige klitten kun je
                    een klittensnijder gebruiken of kiezen voor professionele hulp.
                  </p>
                </li>
                <li>
                  <strong className="text-cpPink text-lg">Stap 6: Besteed extra aandacht aan gevoelige zones</strong>
                  <p className="mt-2">
                    Achter de oren, onder de oksels, rond de hals en bij de staartbasis klitten katten
                    het snelst. Wees hier extra voorzichtig en gebruik een fijne kam of zachte borstel.
                  </p>
                </li>
                <li>
                  <strong className="text-cpPink text-lg">Stap 7: Beloon goed gedrag</strong>
                  <p className="mt-2">
                    Geef complimentjes en eventueel een kleine traktatie tijdens en na het borstelen.
                    Dit maakt borstelen tot een positieve ervaring die je kat gaat associëren met
                    aandacht en beloning.
                  </p>
                </li>
              </ol>
            </div>
          </section>

          {/* Tips for Reluctant Cats */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-cpAqua">
              Tips voor Katten die Niet van Borstelen Houden
            </h2>

            <div className="space-y-4">
              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  Start kort en vaak
                </h3>
                <p className="text-gray-700">
                  Begin met slechts 2-3 minuten borstelen per dag en bouw dit geleidelijk op. Korte,
                  frequente sessies zijn effectiever dan lange, stressvolle sessies. Wen je kat
                  langzaam aan de routine.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  Gebruik de juiste borstel
                </h3>
                <p className="text-gray-700">
                  Sommige katten vinden bepaalde borstels vervelend. Probeer verschillende types -
                  een handschoen borstel of rubberen borstel voelt vaak minder invasief aan dan
                  een slicker brush.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  Creëer positieve associaties
                </h3>
                <p className="text-gray-700">
                  Geef traktaties voor, tijdens en na het borstelen. Praat met een rustige stem en
                  hou pauzes als je kat onrustig wordt. Stop voordat je kat gefrustreerd raakt.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  Vermijd pijnlijke klitten
                </h3>
                <p className="text-gray-700">
                  Als borstelen pijnlijk is door klitten, wordt je kat afkerig. Laat ernstige
                  klitten eerst door een professional verwijderen. Voor
                  <a href="/output/seo-pages/kattenverzorging/beste-kattenbakken" className="text-cpPink hover:underline"> algemene verzorgingstips</a>
                  kun je ook professionele hulp inschakelen.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  Overweeg professionele verzorging
                </h3>
                <p className="text-gray-700">
                  Als je kat helemaal niet wil meewerken, kan een professionele trimsalon helpen.
                  Zij hebben ervaring met angstige katten en kunnen de vacht veilig en stressvrij
                  verzorgen.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-cpAqua">
              Veelgestelde Vragen over Kattenborstelen
            </h2>

            <div className="space-y-4">
              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  Kun je een kat te veel borstelen?
                </h3>
                <p className="text-gray-700">
                  Ja, overmatig borstelen kan de huid irriteren en de vacht beschadigen. Voor
                  langhaar katten is dagelijks borstelen prima, maar bij korthaar katten is 1-2 keer
                  per week meestal voldoende. Let op tekenen van huidirritatie zoals roodheid of
                  kaalheid.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  Wat doe je met hardnekkige klitten die niet uit te kammen zijn?
                </h3>
                <p className="text-gray-700">
                  Probeer de klit voorzichtig uit te werken met je vingers of een metalen kam. Als
                  dit niet lukt zonder je kat pijn te doen, kun je een klittensnijder gebruiken of
                  de klit voorzichtig wegknippen met een schaar (houd de schaar parallel aan de huid!).
                  Bij ernstige verveling is een professional de veiligste optie.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  Vanaf welke leeftijd kun je een kitten borstelen?
                </h3>
                <p className="text-gray-700">
                  Je kunt al beginnen vanaf 6-8 weken met zachte, speelse borstellsessies. Dit went
                  je kitten aan de routine en maakt het later makkelijker. Gebruik een zachte borstel
                  en houd sessies kort (2-3 minuten). Lees ook onze gids over
                  <a href="/output/seo-pages/kattenverzorging/kattenbak-training-kitten" className="text-cpPink hover:underline"> kattenbak training</a>
                  voor meer kitten verzorgingstips.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  Helpt borstelen tegen haaruitval?
                </h3>
                <p className="text-gray-700">
                  Normale haaruitval is een natuurlijk proces en kan niet volledig voorkomen worden.
                  Borstelen helpt wel om losse haren te verwijderen voordat ze op je meubels en kleding
                  belanden. Excessieve haaruitval met kale plekken kan wijzen op medische problemen en
                  verdient een bezoek aan de dierenarts.
                </p>
              </div>
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="mb-12">
            <div className="bg-gradient-to-br from-cpAqua to-cpPink rounded-2xl shadow-lg p-8 text-white text-center">
              <h3 className="text-3xl font-bold mb-4">
                Hulp nodig bij kattenverzorging?
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Of je nu advies zoekt over vachtverzorging, hardnekkige klitten hebt of gewoon je kat
                wilt laten verwennen - vind de beste kattentrimsalons en verzorgingsspecialisten bij
                jou in de buurt.
              </p>
              <a
                href="/nl/netherlands"
                className="inline-block bg-white text-cpAqua rounded-xl px-8 py-4 font-bold hover:-translate-y-1 transition-transform duration-200 shadow-lg"
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
            headline: 'Kattenborstelen: Hoe Vaak en Met Welke Borstel?',
            description: 'Complete gids over kattenborstelen met tips voor elke vachttype, borstelkeuze en frequentie.',
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
    </div>
  );
}
