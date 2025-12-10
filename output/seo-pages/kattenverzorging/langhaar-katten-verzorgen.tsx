import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Langhaar Katten Verzorgen: Tips Tegen Klitten [Complete Gids]',
  description: 'Leer hoe je langhaar katten verzorgt en klitten voorkomt. Praktische tips voor dagelijkse vachtverzorging van Perzische katten, Maine Coons en meer.',
  openGraph: {
    title: 'Langhaar Katten Verzorgen: Tips Tegen Klitten',
    description: 'Complete gids voor langhaar katten verzorging met expert tips tegen klitten en vachtverveling.',
  },
};

export default function LanghaarKattenVerzorenPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-cpYellow/10 to-cpPink/10">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text-coral">
            Langhaar Katten Verzorgen: Tips Tegen Klitten
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Langhaar katten zijn prachtig maar vereisen dagelijkse verzorging om klitten en
            vachtverveling te voorkomen. Ontdek hoe je de vacht van je Perzische kat, Maine Coon
            of Ragdoll gezond en glanzend houdt.
          </p>

          {/* Primary CTA */}
          <div className="bg-card rounded-2xl shadow-md p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4 text-cpAqua">
              Professionele vachtverzorging nodig?
            </h3>
            <p className="text-gray-700 mb-6">
              Bij ernstige klitten of vachtverveling is professionele hulp de veiligste optie.
              Vind ervaren kattentrimsalons die gespecialiseerd zijn in langhaar rassen bij jou
              in de buurt.
            </p>
            <a
              href="/nl/nederland"
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
              Waarom Vereisen Langhaar Katten Extra Verzorging?
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              Langhaar kattenrassen hebben een dubbele vacht met een zachte, wollige ondervacht en
              lange, zijdezachte dekvacht. Deze prachtige vacht klit veel sneller dan korte vacht
              en vereist dagelijkse aandacht om gezond te blijven.
            </p>

            <div className="bg-card rounded-2xl shadow-md p-8 mb-6">
              <h3 className="text-2xl font-bold mb-4 text-cpPink">
                Uitdagingen van Langhaar Vacht
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-cpAqua text-2xl mr-3">⚠</span>
                  <div>
                    <strong>Snelle klitvorming:</strong> Vooral rond oksels, buik, achterpoten
                    en achter de oren waar wrijving optreedt.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-cpAqua text-2xl mr-3">⚠</span>
                  <div>
                    <strong>Excessieve haarballen:</strong> Langhaar katten slikken meer haar in
                    tijdens zelfverzorging, wat kan leiden tot darmblokkades.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-cpAqua text-2xl mr-3">⚠</span>
                  <div>
                    <strong>Vachtverveling:</strong> Verwaarloosde klitten kunnen samensmelten
                    tot vervilte matten die tegen de huid trekken en pijn veroorzaken.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-cpAqua text-2xl mr-3">⚠</span>
                  <div>
                    <strong>Huidproblemen:</strong> Klitten houden vocht en vuil vast, wat leidt
                    tot huidirritatie en infecties.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-cpAqua text-2xl mr-3">⚠</span>
                  <div>
                    <strong>Verminderde mobiliteit:</strong> Ernstige verveling kan de beweging
                    van je kat belemmeren en stress veroorzaken.
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-cpPink/10 rounded-2xl p-6 border-l-4 border-cpPink">
              <p className="text-gray-700">
                <strong>Belangrijk:</strong> Langhaar katten kunnen zichzelf niet adequaat
                verzorgen. Jouw dagelijkse hulp is essentieel voor hun comfort en gezondheid.
                Verwaarlozing kan leiden tot dierenarts bezoeken en zelfs chirurgische verwijdering
                van klitten onder verdoving.
              </p>
            </div>
          </section>

          {/* Popular Long Hair Breeds */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-cpAqua">
              Populaire Langhaar Kattenrassen en Hun Verzorgingsbehoeften
            </h2>

            <div className="space-y-6">
              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-2xl font-bold mb-3 text-cpPink">
                  Perzische Kat
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Vachttype:</strong> Extra lang, dicht en zijdezacht met dikke ondervacht
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Verzorgingsfrequentie:</strong> Dagelijks 15-20 minuten borstelen
                </p>
                <p className="text-gray-700 mb-3">
                  Perzische katten hebben de meest intensieve verzorging nodig. Hun vacht klit
                  extreem snel en ze kunnen zichzelf niet goed verzorgen door hun platte gezicht.
                  Dagelijkse aandacht is absoluut essentieel.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Gebruik slicker brush en metalen kam dagelijks</li>
                  <li>Extra aandacht voor buik, oksels en achterpoten</li>
                  <li>Maandelijkse baden vaak nodig om vacht schoon te houden</li>
                  <li>Oogreinigingsroutine door tranen (flat face syndroom)</li>
                </ul>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-2xl font-bold mb-3 text-cpPink">
                  Maine Coon
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Vachttype:</strong> Halflang, waterafstotend met dikke ondervacht
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Verzorgingsfrequentie:</strong> 3-4 keer per week 10-15 minuten
                </p>
                <p className="text-gray-700 mb-3">
                  Maine Coons hebben een natuurlijk ruigere vacht die minder klit dan Perzische
                  katten, maar vereisen nog steeds regelmatige verzorging, vooral rond hals ("ruff")
                  en broek (achterpoten).
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Focus op nekruff en broek waar vacht het dikst is</li>
                  <li>Staart vereist voorzichtig kammen</li>
                  <li>Extra verzorging tijdens ruiperiodes (lente/herfst)</li>
                  <li>Teenhaar kan ook lang worden en vereist soms trimmen</li>
                </ul>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-2xl font-bold mb-3 text-cpPink">
                  Ragdoll
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Vachttype:</strong> Halflang, zijdezacht met minimale ondervacht
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Verzorgingsfrequentie:</strong> 2-3 keer per week 10 minuten
                </p>
                <p className="text-gray-700 mb-3">
                  Ragdolls hebben relatief onderhoudsvriendelijke vacht voor een langhaar ras.
                  Hun vacht heeft minder ondervacht waardoor klitten minder vaak voorkomen, maar
                  regelmatig borstelen blijft belangrijk.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Vacht klit vooral tijdens ruiperiodes</li>
                  <li>Let op klitten achter oren en in oksels</li>
                  <li>Zachte borstel voldoende voor dagelijks onderhoud</li>
                </ul>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-2xl font-bold mb-3 text-cpPink">
                  Noorse Boskat
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Vachttype:</strong> Dubbele vacht met waterafstotende dekvacht
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Verzorgingsfrequentie:</strong> 2-3 keer per week 10-15 minuten
                </p>
                <p className="text-gray-700 mb-3">
                  Noorse Boskatten hebben een natuurlijk zelfonderhoudende vacht, maar tijdens
                  ruiperiodes verliezen ze massaal ondervacht en vereisen intensieve verzorging.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Gebruik ondervacht kam tijdens rui</li>
                  <li>Vacht is seizoensgebonden - dikker in winter</li>
                  <li>Focus op kraag en broek</li>
                </ul>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-2xl font-bold mb-3 text-cpPink">
                  Siberische Kat
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Vachttype:</strong> Drievoudige vacht (guard hairs, awn hairs, down)
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Verzorgingsfrequentie:</strong> 3-4 keer per week 15 minuten
                </p>
                <p className="text-gray-700 mb-3">
                  Siberische katten hebben een unieke drielaagse vacht die zeer dicht is. Ze
                  verliezen massaal tijdens rui en hebben dan dagelijkse verzorging nodig.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Vacht verandert sterk tussen seizoenen</li>
                  <li>Lente rui is extreem - dagelijks borstelen nodig</li>
                  <li>Waterafstotende vacht - baden zelden nodig</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Daily Grooming Routine */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-cpAqua">
              Dagelijkse Verzorgingsroutine voor Langhaar Katten
            </h2>

            <div className="bg-card rounded-2xl shadow-md p-8">
              <ol className="space-y-6 text-gray-700">
                <li>
                  <strong className="text-cpPink text-lg">Stap 1: Voorbereiding (2 minuten)</strong>
                  <p className="mt-2 mb-3">
                    Kies een rustig moment wanneer je kat ontspannen is. Leg handdoek neer om losse
                    haren op te vangen. Verzamel alle benodigde borstels: slicker brush, metalen kam,
                    ondervacht kam. Voor meer borstelinformatie, zie onze gids over
                    <a href="/output/seo-pages/kattenverzorging/katten-borstelen" className="text-cpPink hover:underline"> kattenborstelen</a>.
                  </p>
                </li>

                <li>
                  <strong className="text-cpPink text-lg">Stap 2: Inspectie (1 minuut)</strong>
                  <p className="mt-2 mb-3">
                    Voel met je handen over de vacht op zoek naar klitten, vooral rond:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Achter de oren</li>
                    <li>Onder de oksels</li>
                    <li>Buik en lies</li>
                    <li>Achterpoten en broek</li>
                    <li>Staartbasis</li>
                  </ul>
                </li>

                <li>
                  <strong className="text-cpPink text-lg">Stap 3: Ontwarren (5 minuten)</strong>
                  <p className="mt-2 mb-3">
                    Gebruik je vingers of metalen kam om kleine klitten voorzichtig uit te werken.
                    Begin bij de punt van de klit en werk naar de huid toe. Gebruik nooit kracht -
                    dit doet pijn en maakt je kat angstig.
                  </p>
                  <p className="mt-2">
                    <strong>Bij hardnekkige klitten:</strong> Gebruik klittensnijder of knip
                    voorzichtig weg met schaar (parallel aan huid!). Zeer vervilte vacht vereist
                    professionele hulp.
                  </p>
                </li>

                <li>
                  <strong className="text-cpPink text-lg">Stap 4: Borstelen met slicker brush (5-7 minuten)</strong>
                  <p className="mt-2 mb-3">
                    Borstel in de richting van haargroei met lange, zachte bewegingen:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Start bij de kop, werk naar staart</li>
                    <li>Borstel rug, flanken, en zijkanten</li>
                    <li>Voorzichtig de buik (als je kat dit toelaat)</li>
                    <li>Poten en staart met extra voorzichtigheid</li>
                  </ul>
                </li>

                <li>
                  <strong className="text-cpPink text-lg">Stap 5: Kammen met metalen kam (3-5 minuten)</strong>
                  <p className="mt-2 mb-3">
                    Gebruik metalen kam voor afwerking en om te controleren of alle klitten weg zijn.
                    De kam moet soepel door de vacht glijden. Als je weerstand voelt, heb je een klit
                    gemist.
                  </p>
                </li>

                <li>
                  <strong className="text-cpPink text-lg">Stap 6: Ondervacht verwijderen (tijdens rui, 3-5 minuten)</strong>
                  <p className="mt-2 mb-3">
                    Tijdens ruiperiodes (voorjaar en najaar) gebruik je ondervacht kam of furminator
                    om losse ondervacht te verwijderen. Dit voorkomt haarballen en klitten. Gebruik
                    maximaal 2-3 keer per week - te vaak kan huid irriteren.
                  </p>
                </li>

                <li>
                  <strong className="text-cpPink text-lg">Stap 7: Belonen (1 minuut)</strong>
                  <p className="mt-2">
                    Geef traktaties en complimentjes. Maak verzorging tot een positieve, bindende
                    ervaring. Dit maakt toekomstige sessies makkelijker.
                  </p>
                </li>
              </ol>

              <div className="bg-cpYellow/10 rounded-xl p-4 mt-6">
                <p className="text-gray-700">
                  <strong>Tijdsinvestering:</strong> 15-20 minuten per dag voor Perzische katten,
                  10-15 minuten voor andere langhaar rassen. Tijdens rui kan dit 25-30 minuten worden.
                </p>
              </div>
            </div>
          </section>

          {/* Middle CTA */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-cpAqua/20 to-cpYellow/20 rounded-2xl shadow-md p-8 border-l-4 border-cpAqua">
              <h3 className="text-2xl font-bold mb-4 text-cpAqua">
                Ernstige klitten of geen tijd voor dagelijkse verzorging?
              </h3>
              <p className="text-gray-700 mb-6">
                Een professionele trimsalon kan helpen met leeuwtrimmen (body clip), klitverwijdering
                en gespecialiseerde vachtverzorging. Zij hebben ervaring met angstige katten en kunnen
                veilig zelfs zwaar vervilte vachten behandelen.
              </p>
              <a
                href="/nl/nederland"
                className="inline-block bg-cpAqua text-white rounded-xl px-6 py-3 font-semibold hover:-translate-y-1 transition-transform duration-200 shadow-lg"
              >
                Vind professionele kattentrimsalons
              </a>
            </div>
          </section>

          {/* Tools Guide */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-cpAqua">
              Essentiële Verzorgingstools voor Langhaar Katten
            </h2>

            <div className="space-y-4">
              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  1. Slicker Brush (Fijne Pinnen Borstel)
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Functie:</strong> Dagelijks basis borstelen, verwijderen losse haren,
                  kleine klitten ontwarren
                </p>
                <p className="text-gray-700 mb-3">
                  Een must-have voor elke langhaar kat eigenaar. De fijne, gebogen draadpinnen
                  dringen diep door in de vacht zonder de huid te beschadigen.
                </p>
                <p className="text-gray-700">
                  <strong>Let op:</strong> Gebruik zachte druk. Te hard borstelen kan huidirritatie
                  veroorzaken. Kies een model met ergonomisch handvat voor comfort tijdens lange
                  sessies.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  2. Metalen Kam (Wide & Fine Tooth)
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Functie:</strong> Klitdetectie, afwerking, precisiewerk rond gezicht
                </p>
                <p className="text-gray-700 mb-3">
                  Een metalen kam met zowel wijde als fijne tanden is essentieel. Wijde tanden voor
                  eerste doorgang en klitdetectie, fijne tanden voor afwerking en gezichtsreiniging.
                </p>
                <p className="text-gray-700">
                  <strong>Tip:</strong> Als de kam niet soepel door de vacht glijdt, heb je een
                  klit gemist. Ga terug met slicker brush.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  3. Ondervacht Kam / Furminator
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Functie:</strong> Verwijderen losse ondervacht tijdens ruiperiodes
                </p>
                <p className="text-gray-700 mb-3">
                  Essentieel tijdens voorjaar en najaar wanneer langhaar katten massaal ondervacht
                  verliezen. Kan verharing tot 90% reduceren.
                </p>
                <p className="text-gray-700">
                  <strong>Waarschuwing:</strong> Gebruik maximaal 2-3 keer per week en nooit op
                  vervilte vacht. Overmatig gebruik beschadigt dekvacht en irriteert huid.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  4. Klittensnijder (Dematting Tool)
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Functie:</strong> Veilig doorsnijden hardnekkige klitten
                </p>
                <p className="text-gray-700 mb-3">
                  Een gespecialiseerd gereedschap met scherpe, zaagtand-achtige messen die klitten
                  kunnen doorsnijden zonder de huid te raken.
                </p>
                <p className="text-gray-700">
                  <strong>Gebruik:</strong> Alleen voor kleine, hardnekkige klitten. Bij ernstige
                  verveling is professionele hulp veiliger. Werk altijd voorzichtig van buiten naar
                  binnen.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  5. Nagelknipper
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Functie:</strong> Nagelverzorging
                </p>
                <p className="text-gray-700 mb-3">
                  Lange nagels kunnen in de vacht haken en klitten verergeren. Regelmatig nagels
                  knippen is onderdeel van complete verzorging. Voor gedetailleerde instructies, zie
                  <a href="/output/seo-pages/kattenverzorging/kattennagels-knippen" className="text-cpPink hover:underline"> kattennagels knippen</a>.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  6. Kattenshampoo (optioneel maar nuttig)
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Functie:</strong> Grondige reiniging en ontvetting
                </p>
                <p className="text-gray-700 mb-3">
                  Langhaar katten, vooral lichte kleuren en Perzische katten, hebben soms baden
                  nodig om vacht schoon en geurvrij te houden. Gebruik alleen kattenvriendelijke
                  shampoo (pH 7).
                </p>
                <p className="text-gray-700">
                  <strong>Frequentie:</strong> Elke 6-8 weken of wanneer vacht vet/vuil aanvoelt.
                  Te frequent baden droogt huid uit.
                </p>
              </div>
            </div>
          </section>

          {/* Preventing Mats */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-cpAqua">
              Klitten Voorkomen: Proactieve Strategieën
            </h2>

            <div className="space-y-4">
              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  1. Consistente dagelijkse routine
                </h3>
                <p className="text-gray-700">
                  Het grootste geheim tegen klitten is consistentie. Dagelijks 15 minuten borstelen
                  voorkomt uren werk later en beschermt je kat tegen pijnlijke klitten. Maak het een
                  vaste routine op hetzelfde tijdstip elke dag.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  2. Focus op probleemgebieden
                </h3>
                <p className="text-gray-700 mb-3">
                  Sommige gebieden klitten sneller door wrijving en beweging:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li><strong>Achter de oren:</strong> Check en kam dagelijks</li>
                  <li><strong>Oksels:</strong> Waar voorpoten bewegen tegen lichaam</li>
                  <li><strong>Buik en lies:</strong> Vooral bij katten die veel liggen</li>
                  <li><strong>Achterpoten (broek):</strong> Waar poten bewegen</li>
                  <li><strong>Staartbasis:</strong> Rond het achterwerk</li>
                </ul>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  3. Dieet en voedingssupplementen
                </h3>
                <p className="text-gray-700">
                  Een gezonde vacht komt van binnenuit. Hoogwaardig kattenvoer rijk aan Omega-3 en
                  Omega-6 vetzuren houdt de vacht glanzend en vermindert klitten. Overweeg
                  supplements zoals visolie of speciale vachtconditioner als je kat droge, doffe
                  vacht heeft.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  4. Hydratatie en gezondheid
                </h3>
                <p className="text-gray-700">
                  Dehydratie leidt tot droge huid en vacht die sneller klit. Zorg dat je kat
                  voldoende water drinkt. Katten die nat voer eten, hebben vaak betere vachtkwaliteit
                  door extra vocht-inname. Voor andere
                  <a href="/output/seo-pages/kattenverzorging/kattenbak-training-kitten" className="text-cpPink hover:underline"> verzorgingstips</a>,
                  zie onze andere gidsen.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  5. Sanitaire trim (hygiëne trim)
                </h3>
                <p className="text-gray-700">
                  Bij langhaar katten kan het haar rond het achterwerk lang worden en vuil vangen,
                  wat klitten veroorzaakt. Een sanitaire trim (kort knippen van haar rond anus en
                  genitaliën) houdt dit gebied schoon. Dit kun je laten doen door een professional
                  of zelf voorzichtig met schaar.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  6. Overweeg seizoensgebonden trims
                </h3>
                <p className="text-gray-700">
                  In de zomer kan een professionele "leeuwentrim" (body clip waarbij lichaam kort
                  wordt geschoren maar kop, poten en staart lang blijven) je kat helpen koel te
                  blijven en onderhoud drastisch verminderen. Dit is vooral nuttig voor oudere
                  eigenaren of bij zeer actieve katten.
                </p>
              </div>
            </div>
          </section>

          {/* Dealing with Severe Mats */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-cpAqua">
              Wat Te Doen Bij Ernstige Klitten en Vachtverveling?
            </h2>

            <div className="bg-card rounded-2xl shadow-md p-8 mb-6">
              <h3 className="text-2xl font-bold mb-4 text-cpPink">
                Wanneer Klitten Ernstig Zijn
              </h3>
              <p className="text-gray-700 mb-4">
                Klitten worden "ernstig" wanneer ze:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                <li>Vast zitten tegen de huid en niet meer te bewegen zijn</li>
                <li>Meerdere klitten tot elkaar vergroeien (matten)</li>
                <li>De huid eronder rood, geïrriteerd of vochtig is</li>
                <li>Je kat pijn lijkt te hebben wanneer je het gebied aanraakt</li>
                <li>Beweging van ledematen belemmerd wordt</li>
              </ul>

              <div className="bg-cpPink/10 rounded-xl p-4">
                <p className="text-gray-700">
                  <strong>Waarschuwing:</strong> Probeer nooit ernstige klitten zelf weg te knippen
                  met een schaar. De huid onder klitten is vaak dun en kwetsbaar. Het risico op
                  snijwonden is hoog. Zoek altijd professionele hulp bij ernstige verveling.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  Professionele oplossingen
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>1. Professionele trimsalon:</strong> Ervaren groomers kunnen zelfs zwaar
                  vervilte katten veilig scheren met speciale tondeuses. Ze hebben technieken om
                  angstige katten rustig te houden.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>2. Dierenarts onder sedatie:</strong> Bij extreem angstige katten of zeer
                  ernstige verveling kan scheren onder lichte sedatie nodig zijn. Dit gebeurt bij
                  de dierenarts in een veilige omgeving.
                </p>
                <p className="text-gray-700">
                  <strong>3. Leeuwentrim (body clip):</strong> Complete scheerbeurt waarbij alleen
                  kop, poten en staartpunt lang blijven. Dit geeft je enkele maanden respijt om een
                  betere verzorgingsroutine op te bouwen terwijl de vacht teruggroeit.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  Nazorg na klitverwijdering
                </h3>
                <p className="text-gray-700 mb-3">
                  Na het verwijderen van klitten is de huid vaak geïrriteerd. Verzorg als volgt:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Controleer huid op rode plekken, schrammen of infecties</li>
                  <li>Laat geschoren gebieden met rust - masseer niet</li>
                  <li>Monitor je kat op overmatig likken (kan infectie veroorzaken)</li>
                  <li>Start zachte, dagelijkse borstelsessies zodra vacht 1-2 cm lang is</li>
                  <li>Bouw routine op voordat vacht volledig teruggroeit</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-cpAqua">
              Veelgestelde Vragen over Langhaar Katten Verzorging
            </h2>

            <div className="space-y-4">
              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  Hoe vaak moet ik mijn langhaar kat baden?
                </h3>
                <p className="text-gray-700">
                  De meeste langhaar katten hebben 4-6 baden per jaar nodig (elke 6-8 weken).
                  Perzische katten vereisen vaak maandelijkse baden door hun zeer lange, dichte
                  vacht die vet en vuil vasthoudt. Gebruik altijd kattenvriendelijke shampoo en
                  spoel grondig. Te frequent baden droogt de huid uit en maakt vacht brozer.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  Kan ik mijn langhaar kat laten scheren voor de zomer?
                </h3>
                <p className="text-gray-700">
                  Ja, een zomertrim kan comfortabel zijn maar katten hebben hun vacht ook nodig
                  voor temperatuurregulatie. Scheer nooit tot op de huid - laat minimaal 1cm haar
                  staan. De vacht isoleert ook tegen hitte en beschermt tegen zonverbranding. Een
                  professionele leeuwentrim is een goede balans tussen comfort en bescherming.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  Mijn kat haat borstelen, wat kan ik doen?
                </h3>
                <p className="text-gray-700">
                  Begin met korte sessies (2-3 minuten) en bouw langzaam op. Gebruik traktaties en
                  complimentjes. Probeer verschillende borstels - sommige katten vinden rubber
                  borstels prettiger. Borstel tijdens ontspannen momenten, niet tijdens spelen.
                  Overweeg professionele verzorging elke 6-8 weken en doe zelf alleen licht
                  onderhoud tussen bezoeken. Ook
                  <a href="/output/seo-pages/kattenverzorging/beste-kattenbakken" className="text-cpPink hover:underline"> andere verzorgingsaspecten</a>
                  kunnen makkelijker worden met geduld.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  Hoeveel kost professionele langhaar kat verzorging?
                </h3>
                <p className="text-gray-700">
                  Kosten variëren per regio en salon, maar verwacht €40-80 voor een complete
                  verzorgingsbeurt (bad, föhn, borstel, nagels knippen). Een leeuwentrim kost
                  €60-120. Bij ernstige verveling kan sedatie door dierenarts nodig zijn, wat
                  €100-200 kan kosten. Regelmatig onderhoud thuis voorkomt deze kosten.
                </p>
              </div>
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="mb-12">
            <div className="bg-gradient-to-br from-cpYellow to-cpPink rounded-2xl shadow-lg p-8 text-white text-center">
              <h3 className="text-3xl font-bold mb-4">
                Professionele Hulp Nodig?
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Of je nu hulp zoekt bij klitten, vachtverveling of gewoon een professionele
                verzorgingsbeurt wilt voor je langhaar kat - vind de beste kattentrimsalons en
                verzorgingsspecialisten bij jou in de buurt.
              </p>
              <a
                href="/nl/nederland"
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
            headline: 'Langhaar Katten Verzorgen: Tips Tegen Klitten',
            description: 'Complete gids voor langhaar katten verzorging met dagelijkse routines en tips tegen klitten.',
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
