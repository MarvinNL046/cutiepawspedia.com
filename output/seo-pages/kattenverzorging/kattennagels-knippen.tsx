import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kattennagels Knippen: Veilig en Stressvrij [Stappenplan]',
  description: 'Leer hoe je kattennagels veilig knipt zonder pijn. Complete gids met stappenplan, tips tegen stress en wanneer je een professional nodig hebt.',
  openGraph: {
    title: 'Kattennagels Knippen: Veilig en Stressvrij',
    description: 'Stap-voor-stap handleiding voor veilig nagels knippen bij katten met expert tips.',
  },
};

export default function KattennagelsKnippenPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-cpYellow/10 to-cpAqua/10">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text-coral">
            Kattennagels Knippen: Veilig en Stressvrij
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Leer hoe je de nagels van je kat veilig en zonder stress knipt. Met de juiste techniek
            en voorbereiding wordt nagelknippen een routine die zowel jij als je kat kan verdragen.
          </p>

          {/* Primary CTA */}
          <div className="bg-card rounded-2xl shadow-md p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4 text-cpAqua">
              Liever professionele hulp?
            </h3>
            <p className="text-gray-700 mb-6">
              Vind ervaren kattentrimsalons en verzorgingsspecialisten die de nagels van je kat
              vakkundig en stressvrij kunnen knippen. Perfect als je kat niet meewerkt of als je
              zelf onzeker bent.
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

          {/* Why Trim Nails */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-cpAqua">
              Waarom Moet Je Kattennagels Knippen?
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              In de natuur slijten de nagels van katten vanzelf door klimmen, jagen en krabben.
              Binnenkatten hebben deze natuurlijke slijtage vaak niet, waardoor hun nagels te lang
              kunnen worden met ongemak en gezondheidsproblemen tot gevolg.
            </p>

            <div className="bg-card rounded-2xl shadow-md p-8 mb-6">
              <h3 className="text-2xl font-bold mb-4 text-cpPink">
                Voordelen van Regelmatig Nagelknippen
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-cpAqua text-2xl mr-3">✓</span>
                  <div>
                    <strong>Voorkomt ingegroeide nagels:</strong> Te lange nagels kunnen in de
                    voetballen groeien, wat pijnlijk is en infecties kan veroorzaken.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-cpAqua text-2xl mr-3">✓</span>
                  <div>
                    <strong>Beschermt meubels en vloeren:</strong> Scherpe nagels maken meer
                    krasschade aan meubels, gordijnen en houten vloeren.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-cpAqua text-2xl mr-3">✓</span>
                  <div>
                    <strong>Vermindert krabwonden:</strong> Kortere nagels veroorzaken minder
                    diepe krassen bij spelen of onbedoelde krabben.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-cpAqua text-2xl mr-3">✓</span>
                  <div>
                    <strong>Verbetert mobiliteit:</strong> Vooral oudere katten hebben last van
                    te lange nagels die het lopen bemoeilijken.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-cpAqua text-2xl mr-3">✓</span>
                  <div>
                    <strong>Voorkomt blijven haken:</strong> Lange nagels blijven haken in
                    tapijt, dekens en kleding, wat stress en pijn veroorzaakt.
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-cpYellow/10 rounded-2xl p-6 border-l-4 border-cpYellow">
              <p className="text-gray-700">
                <strong>Let op:</strong> Oudere katten en katten met artritis hebben vaak extra
                lange nagels omdat ze minder actief zijn. Regelmatige controle is bij hen
                essentieel voor comfort en mobiliteit.
              </p>
            </div>
          </section>

          {/* Understanding Nail Anatomy */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-cpAqua">
              Anatomie van de Kattennagel: De Quick Herkennen
            </h2>

            <div className="bg-card rounded-2xl shadow-md p-8 mb-6">
              <h3 className="text-2xl font-bold mb-4 text-cpPink">
                Wat is de Quick?
              </h3>
              <p className="text-gray-700 mb-4">
                De "quick" is het levende deel binnenin de nagel dat bloedvaten en zenuwen bevat.
                Als je hierin knipt, bloedt de nagel en heeft je kat pijn. Dit is de belangrijkste
                reden waarom veel eigenaren angstig zijn om nagels te knippen.
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Bij lichte nagels:</h4>
                  <p className="text-gray-700">
                    De quick is zichtbaar als een roze gebied binnenin de doorzichtige nagel. Knip
                    alleen het witte, gebogen puntje en blijf 2-3mm voor het roze gedeelte.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Bij donkere nagels:</h4>
                  <p className="text-gray-700">
                    De quick is niet zichtbaar. Knip voorzichtig kleine beetjes tegelijk en kijk
                    naar het knipvlak. Als je een donker puntje in het midden ziet, stop dan - je
                    nadert de quick.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-cpPink/10 rounded-2xl p-6 border-l-4 border-cpPink">
              <p className="text-gray-700">
                <strong>Gouden regel:</strong> Twijfel je? Knip dan minder. Het is veiliger om
                vaker kleine beetjes te knippen dan één keer te veel. Bij twijfel kun je altijd
                professionele hulp inschakelen.
              </p>
            </div>
          </section>

          {/* What You Need */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-cpAqua">
              Wat Heb Je Nodig? Benodigdheden Checklist
            </h2>

            <div className="space-y-4">
              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  1. Kattennagel Knipper
                </h3>
                <p className="text-gray-700 mb-3">
                  Er zijn twee hoofdtypes:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>
                    <strong>Schaar-type:</strong> Lijkt op een kleine schaar, makkelijk te
                    controleren, ideaal voor beginners.
                  </li>
                  <li>
                    <strong>Guillotine-type:</strong> De nagel gaat door een gat en een mesje
                    knipt van onderen, vereist meer ervaring maar zeer effectief.
                  </li>
                </ul>
                <p className="text-gray-700 mt-3">
                  <strong>Let op:</strong> Gebruik nooit menselijke nagelknippers - deze splitsen
                  de nagel en veroorzaken pijn.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  2. Bloedstelpende Middelen
                </h3>
                <p className="text-gray-700">
                  Houd bloedstelpend poeder (styptic powder) of maïzena bij de hand voor het geval
                  je per ongeluk in de quick knipt. Dit stopt bloedingen snel en voorkomt infecties.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  3. Beloningen en Afleidingen
                </h3>
                <p className="text-gray-700">
                  Traktaties, speelgoed of een likmat met nat voer kunnen je kat afleiden en het
                  nagel knippen tot een positieve ervaring maken.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  4. Goede Verlichting
                </h3>
                <p className="text-gray-700">
                  Zorg voor voldoende licht om de quick goed te kunnen zien. Een zaklamp of telefoon
                  lampje kan helpen bij donkere nagels.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  5. Handdoek (optioneel)
                </h3>
                <p className="text-gray-700">
                  Voor onwillige katten kan inbakeren in een handdoek ("purrito") helpen om ze rustig
                  te houden. Laat alleen de poot vrij die je op dat moment knipt.
                </p>
              </div>
            </div>
          </section>

          {/* Middle CTA */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-cpAqua/20 to-cpPink/20 rounded-2xl shadow-md p-8 border-l-4 border-cpAqua">
              <h3 className="text-2xl font-bold mb-4 text-cpAqua">
                Kat werkt niet mee of bang voor bloeden?
              </h3>
              <p className="text-gray-700 mb-6">
                Ervaren professionals kunnen de nagels van je kat snel en veilig knippen, ook bij
                angstige of agressieve katten. Zij beschikken over de juiste technieken en ervaring
                om stress te minimaliseren.
              </p>
              <a
                href="/nl/nederland"
                className="inline-block bg-cpAqua text-white rounded-xl px-6 py-3 font-semibold hover:-translate-y-1 transition-transform duration-200 shadow-lg"
              >
                Bekijk professionele kattenverzorgers
              </a>
            </div>
          </section>

          {/* Step-by-Step Guide */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-cpAqua">
              Stap-voor-Stap: Zo Knip Je Kattennagels Veilig
            </h2>

            <div className="bg-card rounded-2xl shadow-md p-8">
              <ol className="space-y-6 text-gray-700">
                <li>
                  <strong className="text-cpPink text-lg">Stap 1: Wen je kat aan pootmassage</strong>
                  <p className="mt-2">
                    Begin enkele dagen voordat je gaat knippen met het regelmatig masseren van de
                    pootjes. Druk zacht op de voetballen om de nagels uit te schuiven. Beloon je
                    kat met traktaties. Dit maakt de poten minder gevoelig.
                  </p>
                </li>
                <li>
                  <strong className="text-cpPink text-lg">Stap 2: Kies het juiste moment</strong>
                  <p className="mt-2">
                    Knip nagels wanneer je kat rustig en slaperig is, bijvoorbeeld na het eten of
                    na een speelsessie. Vermijd momenten waarop je kat actief of gespannen is. Net
                    als bij
                    <a href="/output/seo-pages/kattenverzorging/katten-borstelen" className="text-cpPink hover:underline"> borstelen</a>,
                    is timing essentieel voor succes.
                  </p>
                </li>
                <li>
                  <strong className="text-cpPink text-lg">Stap 3: Positioneer je kat comfortabel</strong>
                  <p className="mt-2">
                    Veel katten voelen zich veilig op schoot of op een zachte ondergrond. Sommige
                    mensen geven de voorkeur aan de kat op een tafel te zetten. Kies wat voor jullie
                    beiden het beste werkt. Zorg dat je makkelijk bij alle poten kunt.
                  </p>
                </li>
                <li>
                  <strong className="text-cpPink text-lg">Stap 4: Pak de poot zacht maar stevig vast</strong>
                  <p className="mt-2">
                    Houd de poot met één hand vast en druk zacht op de voetbal om de nagel uit te
                    schuiven. Gebruik niet te veel kracht - dit veroorzaakt weerstand. Spreek rustig
                    en geef complimentjes.
                  </p>
                </li>
                <li>
                  <strong className="text-cpPink text-lg">Stap 5: Identificeer de quick</strong>
                  <p className="mt-2">
                    Kijk goed naar de nagel in het licht. Bij lichte nagels zie je het roze gebied
                    van de quick. Bij donkere nagels kun je alleen het witte puntje veilig knippen.
                    Twijfel? Knip dan minder.
                  </p>
                </li>
                <li>
                  <strong className="text-cpPink text-lg">Stap 6: Knip snel en zelfverzekerd</strong>
                  <p className="mt-2">
                    Plaats de knipper loodrecht op de nagel (niet plat!) en knip in één vloeiende
                    beweging het gebogen puntje eraf. Blijf 2-3mm voor de quick. Een snelle, zekere
                    knip is comfortabeler dan langzaam knijpen.
                  </p>
                </li>
                <li>
                  <strong className="text-cpPink text-lg">Stap 7: Werk systematisch</strong>
                  <p className="mt-2">
                    Doe één poot volledig (5 nagels inclusief duimnagel aan de binnenkant) en beloon
                    je kat. Als je kat onrustig wordt, neem een pauze. Het is prima om over meerdere
                    sessies te verdelen - beter geduldig dan geforceerd.
                  </p>
                </li>
                <li>
                  <strong className="text-cpPink text-lg">Stap 8: Beloon rijkelijk</strong>
                  <p className="mt-2">
                    Geef na elke poot (of zelfs na elke nagel) een traktatie en complimentjes. Dit
                    bouwt positieve associaties op en maakt toekomstige sessies makkelijker.
                  </p>
                </li>
              </ol>
            </div>
          </section>

          {/* Frequency */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-cpAqua">
              Hoe Vaak Moet Je Kattennagels Knippen?
            </h2>

            <div className="space-y-4">
              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  Binnen katten: Elke 2-3 weken
                </h3>
                <p className="text-gray-700">
                  Katten die voornamelijk binnen leven hebben minimale natuurlijke nagelzorg. Hun
                  nagels groeien sneller dan ze slijten, vooral als er geen ruwe oppervlakken
                  beschikbaar zijn. Controleer de nagels elke 2 weken en knip wanneer ze beginnen
                  te krullen.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  Buiten katten: Elke 4-6 weken
                </h3>
                <p className="text-gray-700">
                  Katten die naar buiten gaan slijten hun nagels natuurlijk door klimmen en krabben
                  aan bomen. Ze hebben minder frequente controles nodig, maar check wel maandelijks
                  of de nagels niet te lang worden.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  Oudere katten: Elke 1-2 weken
                </h3>
                <p className="text-gray-700">
                  Oudere katten bewegen minder en gebruiken hun krabpaal minder vaak, waardoor nagels
                  sneller overlang worden. Ze kunnen ook moeite hebben met het intrekken van nagels,
                  wat ingegroeide nagels kan veroorzaken. Frequente controle is essentieel. Net als
                  bij
                  <a href="/output/seo-pages/kattenverzorging/langhaar-katten-verzorgen" className="text-cpPink hover:underline"> algemene verzorging</a>,
                  hebben oudere katten extra aandacht nodig.
                </p>
              </div>
            </div>
          </section>

          {/* What If You Cut Too Deep */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-cpAqua">
              Wat Als Je Per Ongeluk in de Quick Knipt?
            </h2>

            <div className="bg-card rounded-2xl shadow-md p-8">
              <p className="text-gray-700 mb-4">
                Zelfs de meest ervaren kattenverzorgers knippen soms per ongeluk te diep. Dit is
                pijnlijk voor je kat maar geen ramp als je snel handelt.
              </p>

              <h3 className="text-xl font-bold mb-3 text-cpPink">
                Stappen bij bloeden:
              </h3>
              <ol className="space-y-3 text-gray-700 mb-6">
                <li>
                  <strong>1. Blijf kalm:</strong> Je kat voelt jouw paniek aan. Spreek rustig en
                  geruststellen.
                </li>
                <li>
                  <strong>2. Breng bloedstelpend poeder aan:</strong> Doop de bloedende nagel in
                  styptic powder of maïzena en druk 30 seconden aan.
                </li>
                <li>
                  <strong>3. Geen bloedstelpend middel?</strong> Gebruik een schoon stukje toiletpapier
                  of gaas en houd 5-10 minuten druk op de nagel.
                </li>
                <li>
                  <strong>4. Geef extra traktaties:</strong> Beloon je kat extra om de negatieve
                  ervaring te compenseren.
                </li>
                <li>
                  <strong>5. Monitor de nagel:</strong> Controleer de volgende dagen op tekenen van
                  infectie (roodheid, zwelling, pus). Raadpleeg bij twijfel een dierenarts.
                </li>
              </ol>

              <div className="bg-cpPink/10 rounded-xl p-4">
                <p className="text-gray-700">
                  <strong>Belangrijk:</strong> De meeste kleine bloedingen stoppen binnen 5-10
                  minuten. Blijft de nagel langer bloeden of lijkt je kat erg pijn te hebben?
                  Neem contact op met je dierenarts.
                </p>
              </div>
            </div>
          </section>

          {/* Tips for Difficult Cats */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-cpAqua">
              Tips voor Katten die Niet Meewerken
            </h2>

            <div className="space-y-4">
              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  Bouw het geleidelijk op
                </h3>
                <p className="text-gray-700">
                  Probeer niet alle nagels in één keer te knippen. Begin met één nagel per dag en
                  bouw langzaam op. Sommige katten hebben weken nodig om te wennen. Geduld loont!
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  Gebruik de "purrito" techniek
                </h3>
                <p className="text-gray-700">
                  Wikkel je kat stevig maar niet te strak in een handdoek, zodat alleen de poot
                  die je knipt vrij is. Dit geeft je meer controle en voorkomt dat je kat wegrent
                  of krabt.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  Probeer verschillende tijdstippen
                </h3>
                <p className="text-gray-700">
                  Sommige katten zijn 's ochtends rustiger, andere juist 's avonds. Experimenteer
                  met verschillende momenten om te vinden wanneer je kat het meest ontspannen is.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  Werk samen met iemand
                </h3>
                <p className="text-gray-700">
                  Bij zeer onwillige katten kan het helpen als één persoon de kat vasthoudt en
                  afleid met traktaties, terwijl de ander knipt. Dit maakt het sneller en minder
                  stressvol.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  Overweeg professionele hulp
                </h3>
                <p className="text-gray-700">
                  Als je kat echt niet meewerkt of je bent bang om te bloeden, is er geen schande
                  in het inschakelen van professionals. Een trimsalon of dierenarts kan de nagels
                  snel en veilig knippen. Voor
                  <a href="/output/seo-pages/kattenverzorging/beste-kattenbakken" className="text-cpPink hover:underline"> andere verzorgingsbehoeften</a>
                  kun je ook terecht bij specialisten.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-cpAqua">
              Veelgestelde Vragen over Kattennagels Knippen
            </h2>

            <div className="space-y-4">
              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  Moet ik ook de achternagels knippen?
                </h3>
                <p className="text-gray-700">
                  Achternagels groeien vaak langzamer en slijten meer tijdens krabben en lopen. Veel
                  katten hebben alleen frontale nagelonderhoud nodig. Controleer wel maandelijks de
                  achternagels, vooral bij oudere katten. Knip alleen als ze overlang of krom zijn.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  Wat is het verschil tussen nagels knippen en ontnagelen?
                </h3>
                <p className="text-gray-700">
                  Nagels knippen is het inkorten van de nageltoppen en is vergelijkbaar met nagels
                  knippen bij mensen. Ontnagelen (declawing) is een operatie waarbij de laatste
                  teenkootjes worden geamputeerd - dit is in Nederland verboden en wordt beschouwd
                  als dierenmishandeling. Knip altijd alleen de punten!
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  Helpt een krabpaal tegen te lange nagels?
                </h3>
                <p className="text-gray-700">
                  Een krabpaal helpt bij het verwijderen van de buitenste dode nagellaag en houdt
                  nagels scherper, maar voorkomt niet dat ze te lang worden. Regelmatig knippen
                  blijft noodzakelijk, zelfs bij katten die veel krabben.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-cpPink">
                  Vanaf welke leeftijd kun je beginnen met nagels knippen?
                </h3>
                <p className="text-gray-700">
                  Je kunt al beginnen bij kittens vanaf 4-6 weken oud. Dit went ze aan de procedure
                  en maakt het later makkelijker. Gebruik speciale kitten nagelknippers en knip zeer
                  voorzichtig - kittennagels zijn heel klein en de quick is moeilijker te zien.
                  Voor meer kitten verzorgingstips, zie ook
                  <a href="/output/seo-pages/kattenverzorging/kattenbak-training-kitten" className="text-cpPink hover:underline"> kattenbak training</a>.
                </p>
              </div>
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="mb-12">
            <div className="bg-gradient-to-br from-cpPink to-cpYellow rounded-2xl shadow-lg p-8 text-white text-center">
              <h3 className="text-3xl font-bold mb-4">
                Liever een professional?
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Geen probleem! Vind ervaren kattenverzorgers, trimsalons en dierenartsen die de
                nagels van je kat vakkundig en zonder stress kunnen knippen. Perfect voor eigenaren
                die onzeker zijn of katten die niet meewerken.
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
            headline: 'Kattennagels Knippen: Veilig en Stressvrij',
            description: 'Complete gids voor veilig kattennagels knippen met stap-voor-stap instructies en tips tegen stress.',
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
