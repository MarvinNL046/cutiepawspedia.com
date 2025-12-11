import Image from "next/image";
import Link from "next/link";
import PhotoCredit from "@/components/PhotoCredit";
import BetweenContentAd from "@/components/BetweenContentAd";
import BlogSidebarAd from "@/components/BlogSidebarAd";

export const metadata = {
  title: "Kat drinkt veel water: wanneer is het te veel? | CutiePawsPedia",
  description: "Maakt jouw kat zich zorgen omdat je kat veel water drinkt? Ontdek wanneer het normaal is en wanneer je naar de dierenarts moet. Inclusief oorzaken en oplossingen.",
  keywords: "kat drinkt veel, kat dorst, polydipsie kat, kat veel plassen, nierziekte kat, diabetes kat",
  openGraph: {
    title: "Kat drinkt veel water: wanneer is het te veel?",
    description: "Complete gids over verhoogde waterconsumptie bij katten en wanneer je je zorgen moet maken",
    images: [{ url: "https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=1200&h=630&fit=crop" }],
  },
};

export default function KatDrinktVeelWater() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Kat drinkt veel water: wanneer is het te veel?",
            description: "Ontdek wanneer verhoogde waterconsumptie bij katten normaal is en wanneer het een teken van ziekte kan zijn.",
            image: "https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=1200&h=630&fit=crop",
            datePublished: "2025-12-11",
            dateModified: "2025-12-11",
            author: {
              "@type": "Organization",
              name: "CutiePawsPedia",
            },
          }),
        }}
      />

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Category Badge */}
            <Link
              href="/blog/categorie/dierengezondheid"
              className="inline-block px-4 py-1 bg-cpAmber/10 dark:bg-cpAmber/20 text-cpAmber rounded-full text-sm font-medium hover:bg-cpAmber/20 dark:hover:bg-cpAmber/30 transition-colors mb-4"
            >
              Dierengezondheid
            </Link>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-cpCharcoal dark:text-cpCream mb-4">
              Kat drinkt veel water: wanneer is het te veel?
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-8">
              <time dateTime="2025-12-11">11 december 2025</time>
              <span>•</span>
              <span>10 min leestijd</span>
            </div>

            {/* Featured Image */}
            <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=1200&h=800&fit=crop"
                alt="Kat drinkt water uit een kom"
                fill
                className="object-cover"
                priority
              />
            </div>
            <PhotoCredit
              photographerName="Jody Parks"
              photographerUrl="https://unsplash.com/@jodyparks"
              platform="Unsplash"
              className="mb-8"
            />

            {/* Intro */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                Merk je dat je vaker de waterbak van je kat moet bijvullen? Of zie je je kat opvallend vaak bij de waterkraan? Verhoogde waterconsumptie bij katten kan volkomen normaal zijn, maar het kan ook een eerste waarschuwingssignaal van een onderliggende aandoening zijn. In deze uitgebreide gids ontdek je wanneer je je zorgen moet maken en wat je kunt doen.
              </p>
            </div>

            {/* Main Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Hoeveel water is normaal voor een kat?
              </h2>
              <p>
                Voordat we kunnen bepalen wat 'veel' is, moeten we weten wat normaal is. De gemiddelde kat drinkt:
              </p>
              <ul>
                <li><strong>40-60 ml per kg lichaamsgewicht per dag</strong></li>
                <li>Een kat van 4 kg: 160-240 ml per dag (ongeveer een klein glas)</li>
                <li>Een kat van 6 kg: 240-360 ml per dag</li>
              </ul>
              <p>
                <strong>Belangrijke nuance:</strong> Katten die nat voer eten, drinken vaak minder omdat nat voer al 70-80% vocht bevat. Katten op droogvoer drinken meer omdat droogvoer slechts 10% vocht bevat.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Wanneer is het te veel?
              </h3>
              <p>
                Medisch gezien spreken we van polydipsie (overmatig drinken) wanneer een kat meer dan <strong>100 ml per kg lichaamsgewicht per dag</strong> drinkt. Voor een gemiddelde kat van 5 kg is dat meer dan 500 ml (een halve liter) per dag.
              </p>
              <p>
                <strong>Praktische waarschuwingssignalen:</strong>
              </p>
              <ul>
                <li>Je moet de waterbak meer dan 2x per dag bijvullen</li>
                <li>Je kat drinkt uit ongebruikelijke bronnen (kraan, douche, toiletpot)</li>
                <li>De kattenbak moet veel vaker verschoond worden</li>
                <li>Er zijn grote natte plekken in de kattenbak</li>
              </ul>

              <BetweenContentAd />

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Normale oorzaken van verhoogde dorst
              </h2>
              <p>
                Niet elke verhoging van waterconsumptie is zorgwekkend. Deze factoren zijn volkomen normaal:
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                1. Warm weer en verhoogde activiteit
              </h3>
              <p>
                Tijdens warme zomerdagen of na intensief spelen kan je kat meer drinken om vochtverlies te compenseren. Dit is normaal en gezond gedrag.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                2. Verandering van nat naar droogvoer
              </h3>
              <p>
                Als je bent overgestapt van nat voer naar droogvoer, zal je kat significant meer gaan drinken. Dit is een gezonde aanpassing omdat droogvoer veel minder vocht bevat.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                3. Zout of gekruid voer
              </h3>
              <p>
                Heeft je kat toevallig een stukje kaas of chips gegeten? Zoutrijk voedsel zorgt voor verhoogde dorst. Dit normaliseert meestal binnen 24 uur.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                4. Lactatie (zogende katten)
              </h3>
              <p>
                Katten die kittens zogen hebben een veel hogere vochtbehoefte voor de melkproductie. Dit is volkomen normaal en zelfs essentieel.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                5. Nieuwe waterbron of waterfonteintje
              </h3>
              <p>
                Sommige katten drinken meer als het water verser is of beweegt. Een nieuw waterfonteintje kan leiden tot verhoogde waterconsumptie, wat eigenlijk positief is!
              </p>

              <BetweenContentAd />

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Medische oorzaken: wanneer naar de dierenarts?
              </h2>
              <p>
                Als de verhoogde dorst langer dan 2-3 dagen aanhoudt zonder duidelijke verklaring, kan het wijzen op een medisch probleem. Dit zijn de meest voorkomende aandoeningen:
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                1. Chronische nierziekte (CKD)
              </h3>
              <p>
                <strong>Meest voorkomende oorzaak bij oudere katten</strong>
              </p>
              <p>
                Chronische nierziekte is een sluipmoordenaar bij katten, vooral boven de 10 jaar. Beschadigde nieren kunnen afvalstoffen niet meer goed filteren, waardoor het lichaam probeert te compenseren door meer te drinken en te plassen.
              </p>
              <p>
                <strong>Andere symptomen:</strong>
              </p>
              <ul>
                <li>Gewichtsverlies</li>
                <li>Verminderde eetlust</li>
                <li>Braken (vooral 's ochtends)</li>
                <li>Doffe vacht</li>
                <li>Slechte adem (ammoniak-geur)</li>
                <li>Lethargie</li>
              </ul>
              <p>
                <strong>Diagnose:</strong> Bloedonderzoek (creatinine en ureum) en urineonderzoek.
              </p>
              <p>
                <strong>Behandeling:</strong> Speciaaldiet, vochttherapie, medicatie. Vroege detectie kan de levensverwachting aanzienlijk verlengen.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                2. Diabetes mellitus (suikerziekte)
              </h3>
              <p>
                <strong>Vooral bij overgewichtige katten</strong>
              </p>
              <p>
                Bij diabetes kan het lichaam glucose niet goed reguleren. Overtollige glucose wordt via de urine afgevoerd, wat water met zich meeneemt. De kat drinkt veel om dit vochtverlies te compenseren.
              </p>
              <p>
                <strong>Andere symptomen:</strong>
              </p>
              <ul>
                <li>Toegenomen eetlust maar toch gewichtsverlies</li>
                <li>Grote plassen in de kattenbak</li>
                <li>Lethargie en zwakte</li>
                <li>Doffe, vette vacht</li>
                <li>Zoete geur van de adem</li>
              </ul>
              <p>
                <strong>Diagnose:</strong> Bloedonderzoek (glucose) en urineonderzoek.
              </p>
              <p>
                <strong>Behandeling:</strong> Insuline-injecties, dieetaanpassing, gewichtsmanagement. Met goede behandeling kunnen diabetische katten een normaal leven leiden.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                3. Hyperthyreoïdie (overactieve schildklier)
              </h3>
              <p>
                <strong>Vaak bij katten boven de 8 jaar</strong>
              </p>
              <p>
                Een overactieve schildklier verhoogt het metabolisme, wat leidt tot verhoogde dorst en frequenter urineren.
              </p>
              <p>
                <strong>Andere symptomen:</strong>
              </p>
              <ul>
                <li>Gewichtsverlies ondanks toegenomen eetlust</li>
                <li>Hyperactiviteit en rusteloosheid</li>
                <li>Braken en diarree</li>
                <li>Vachtproblemen</li>
                <li>Snelle hartslag</li>
              </ul>
              <p>
                <strong>Diagnose:</strong> Bloedonderzoek (T4-spiegel).
              </p>
              <p>
                <strong>Behandeling:</strong> Medicatie, radioactief jodium therapie, of speciaaldiet.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                4. Leverziekte
              </h3>
              <p>
                Leverbeschadiging kan ook leiden tot verhoogde dorst en urine-productie.
              </p>
              <p>
                <strong>Andere symptomen:</strong>
              </p>
              <ul>
                <li>Geelzucht (gele ogen/tandvlees)</li>
                <li>Braken</li>
                <li>Diarree</li>
                <li>Gewichtsverlies</li>
                <li>Opgezwollen buik</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                5. Blaasontsteking of urineweginfectie
              </h3>
              <p>
                Bij een urineweginfectie kan je kat vaker naar de kattenbak gaan en compenserend meer drinken.
              </p>
              <p>
                <strong>Andere symptomen:</strong>
              </p>
              <ul>
                <li>Vaak naar de bak maar weinig plassen</li>
                <li>Pijn bij plassen (miauwt in de bak)</li>
                <li>Bloed in de urine</li>
                <li>Plassen buiten de bak</li>
                <li>Likken van de geslachtsdelen</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                6. Stress en gedragsproblemen
              </h3>
              <p>
                In zeldzame gevallen kan psychogene polydipsie optreden - overmatig drinken zonder lichamelijke oorzaak, vaak door stress of verveling.
              </p>

              <BetweenContentAd />

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Hoe meet je de waterconsumptie van je kat?
              </h2>
              <p>
                Als je vermoedt dat je kat te veel drinkt, is het belangrijk om dit objectief te meten voordat je naar de dierenarts gaat:
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Stappenplan voor het meten
              </h3>
              <ol>
                <li><strong>Isoleer waterinname:</strong> Zorg dat je kat alleen uit zijn eigen bak kan drinken (geen toilet, kraan, etc.)</li>
                <li><strong>Meet 's ochtends:</strong> Vul de waterbak met een afgemeten hoeveelheid water (bijvoorbeeld 500 ml)</li>
                <li><strong>Meet 24 uur later:</strong> Meet hoeveel water er nog in de bak zit</li>
                <li><strong>Bereken consumptie:</strong> Beginhoeveelheid - resterende hoeveelheid = dagelijkse consumptie</li>
                <li><strong>Herhaal 3 dagen:</strong> Doe dit 3 dagen achter elkaar voor een gemiddelde</li>
                <li><strong>Bereken per kg:</strong> Deel de totale consumptie door het lichaamsgewicht van je kat</li>
              </ol>
              <p>
                <strong>Voorbeeld:</strong>
              </p>
              <ul>
                <li>Kat weegt 5 kg</li>
                <li>Drinkt gemiddeld 600 ml per dag</li>
                <li>600 ml ÷ 5 kg = 120 ml/kg/dag</li>
                <li><strong>Conclusie:</strong> Dit is boven de normale grens (60 ml/kg) en wijst op polydipsie</li>
              </ul>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Wat doet de dierenarts?
              </h2>
              <p>
                Als je met verhoogde dorst naar de dierenarts gaat, zal deze meestal het volgende protocol volgen:
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                1. Anamnese (vragenlijst)
              </h3>
              <ul>
                <li>Hoe lang drinkt de kat al veel?</li>
                <li>Hoeveel drinkt de kat ongeveer?</li>
                <li>Zijn er andere symptomen?</li>
                <li>Wat eet de kat (nat/droog)?</li>
                <li>Zijn er recent veranderingen geweest?</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                2. Lichamelijk onderzoek
              </h3>
              <ul>
                <li>Gewicht en lichaamsconditie</li>
                <li>Hydratatiestatus (huidplooi test)</li>
                <li>Palpatie van nieren, lever, blaas</li>
                <li>Controle van de schildklier</li>
                <li>Tandvlees en mondholte</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                3. Bloedonderzoek
              </h3>
              <p>
                Een volledig bloedbeeld met focus op:
              </p>
              <ul>
                <li><strong>Nierfunctie:</strong> Creatinine, ureum, SDMA</li>
                <li><strong>Glucose:</strong> Voor diabetes screening</li>
                <li><strong>Schildklierhormonen:</strong> T4 (bij katten >8 jaar)</li>
                <li><strong>Leverwaarden:</strong> ALT, AST, bilirubin</li>
                <li><strong>Elektrolyten:</strong> Natrium, kalium, chloride</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                4. Urineonderzoek
              </h3>
              <ul>
                <li>Soortelijk gewicht (concentratievermogen)</li>
                <li>Glucose in urine (diabetes)</li>
                <li>Proteïne (nierziekte)</li>
                <li>Bacteriën en witte bloedcellen (infectie)</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                5. Aanvullend onderzoek (indien nodig)
              </h3>
              <ul>
                <li>Echografie van buikorganen</li>
                <li>Röntgenfoto's</li>
                <li>Bloeddrukmeting</li>
              </ul>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Wat kun je thuis doen?
              </h2>
              <p>
                Terwijl je wacht op een afspraak bij de dierenarts of naast medische behandeling:
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Zorg voor altijd vers water
              </h3>
              <p>
                Zelfs als je kat veel drinkt, moet je ervoor zorgen dat er altijd schoon, vers water beschikbaar is. Dehydratie is gevaarlijk, vooral bij nierziekte.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Overweeg meerdere waterbakken
              </h3>
              <p>
                Plaats waterbakken op verschillende plekken in huis. Sommige katten drinken meer als water gemakkelijk bereikbaar is.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Probeer een waterfonteintje
              </h3>
              <p>
                Veel katten drinken liever stromend water. Een fonteintje kan de waterinname zelfs verhogen, wat bij nierziekte juist wenselijk is.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Overweeg nat voer
              </h3>
              <p>
                Als je kat droogvoer eet, kan overstappen naar nat voer helpen om de vochtinname te verhogen via voedsel. Dit is vooral belangrijk bij nierziekte.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Monitor de kattenbak nauwlettend
              </h3>
              <p>
                Let op veranderingen in:
              </p>
              <ul>
                <li>Frequentie van plassen</li>
                <li>Grootte van de plasplekken</li>
                <li>Kleur van de urine</li>
                <li>Geur van de urine</li>
              </ul>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Wanneer is het een noodgeval?
              </h2>
              <p>
                Ga <strong>direct</strong> naar de dierenarts als je deze symptomen ziet:
              </p>
              <ul>
                <li><strong>Helemaal niet meer drinken</strong> na een periode van veel drinken</li>
                <li><strong>Braken en niet meer eten</strong> gedurende meer dan 24 uur</li>
                <li><strong>Lethargie of bewusteloosheid</strong></li>
                <li><strong>Stuiptrekkingen</strong></li>
                <li><strong>Bloederige urine</strong></li>
                <li><strong>Helemaal niet meer kunnen plassen</strong> (vooral katers!)</li>
                <li><strong>Snelle, oppervlakkige ademhaling</strong></li>
                <li><strong>Bleke of gele tandvlezen</strong></li>
              </ul>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Prognose: wat kun je verwachten?
              </h2>
              <p>
                De prognose hangt sterk af van de onderliggende oorzaak:
              </p>
              <ul>
                <li><strong>Diabetes:</strong> Goed behandelbaar met insuline en dieet. Veel katten leven jaren met diabetes.</li>
                <li><strong>Hyperthyreoïdie:</strong> Uitstekende prognose met behandeling. Vaak volledig te genezen met radioactieve jodiumtherapie.</li>
                <li><strong>Blaasontsteking:</strong> Geneest meestal binnen 1-2 weken met antibiotica.</li>
                <li><strong>Chronische nierziekte:</strong> Niet te genezen maar wel te managen. Vroege detectie kan jaren toevoegen aan de levensverwachting.</li>
                <li><strong>Leverziekte:</strong> Varieert sterk afhankelijk van de oorzaak en ernst.</li>
              </ul>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Preventie: kun je het voorkomen?
              </h2>
              <p>
                Hoewel niet alle oorzaken te voorkomen zijn, kun je het risico verkleinen:
              </p>
              <ul>
                <li><strong>Jaarlijkse controles:</strong> Vooral bij katten boven de 7 jaar, inclusief bloedonderzoek</li>
                <li><strong>Gezond gewicht:</strong> Voorkom overgewicht om diabetes te voorkomen</li>
                <li><strong>Kwalitatief voer:</strong> Kies voer met hoogwaardig eiwit om nieren te beschermen</li>
                <li><strong>Voldoende vocht:</strong> Stimuleer waterinname door nat voer of fonteintjes</li>
                <li><strong>Stressreductie:</strong> Minimaliseer stress in het huishouden</li>
                <li><strong>Regelmatige tandverzorging:</strong> Tandproblemen kunnen orgaanschade veroorzaken</li>
              </ul>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Conclusie: luister naar je intuïtie
              </h2>
              <p>
                Als eigenaar ken je je kat het beste. Als je intuïtie zegt dat er iets niet klopt, vertrouw daar dan op. Verhoogde dorst kan een vroeg waarschuwingssignaal zijn van ernstige aandoeningen die beter te behandelen zijn als ze vroeg worden ontdekt.
              </p>
              <p>
                <strong>Belangrijkste takeaways:</strong>
              </p>
              <ul>
                <li>Normaal: 40-60 ml/kg/dag</li>
                <li>Zorgwekkend: >100 ml/kg/dag of plotselinge verdubbeling</li>
                <li>Meet objectief gedurende 3 dagen</li>
                <li>Raadpleeg een dierenarts bij twijfel</li>
                <li>Vroege detectie redt levens</li>
              </ul>
              <p>
                Met waakzaamheid en tijdige actie kun je ervoor zorgen dat je kat een lang en gezond leven leidt!
              </p>
            </div>

            {/* FAQ Section */}
            <div className="mt-16 bg-cpSurface dark:bg-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mb-6">
                Veelgestelde vragen
              </h2>
              <div className="space-y-4">
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer list-none p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Mijn kat drinkt uit de toiletpot, is dat gevaarlijk?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <div className="p-4 bg-white dark:bg-gray-700 rounded-b-lg">
                    <p className="text-gray-700 dark:text-gray-300">
                      Ja, dit kan gevaarlijk zijn om meerdere redenen. Toiletwater kan schoonmaakmiddelen, blokjes of bacteriën bevatten die schadelijk zijn voor je kat. Bovendien kan dit gedrag erop wijzen dat je kat meer wil drinken dan er in zijn waterbak beschikbaar is, wat een teken kan zijn van polydipsie. Sluit altijd het deksel van de toilet en zorg voor voldoende verse waterbakken. Als je kat blijft zoeken naar alternatieve waterbronnen, overweeg dan een waterfonteintje of laat hem controleren door een dierenarts.
                    </p>
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer list-none p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Kan een kat te veel water drinken en daar ziek van worden?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <div className="p-4 bg-white dark:bg-gray-700 rounded-b-lg">
                    <p className="text-gray-700 dark:text-gray-300">
                      In theorie kan extreme waterintoxicatie optreden (hyponatremie), maar dit is extreem zeldzaam bij katten. Het zou betekenen dat een kat in zeer korte tijd enorme hoeveelheden water drinkt, wat bijna nooit voorkomt. Het grotere probleem is dat overmatig drinken meestal een symptoom is van een onderliggende ziekte (zoals nierziekte of diabetes), niet de oorzaak. Als je kat veel drinkt, is het niet het drinken zelf dat schadelijk is, maar de onderliggende conditie die onderzocht moet worden.
                    </p>
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer list-none p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Hoe lang kan ik wachten voordat ik naar de dierenarts ga?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <div className="p-4 bg-white dark:bg-gray-700 rounded-b-lg">
                    <p className="text-gray-700 dark:text-gray-300">
                      Als de verhoogde dorst gepaard gaat met andere symptomen (braken, lethargie, gewichtsverlies), ga dan binnen 24-48 uur naar de dierenarts. Als je kat alleen meer drinkt maar verder normaal lijkt, observeer dan 3-5 dagen terwijl je de waterconsumptie meet. Als het aanhoudt of verergert, maak een afspraak. Bij noodsymptomen (helemaal niet meer eten/drinken, bewusteloosheid, stuipen), ga onmiddellijk naar een spoedkliniek. Vroege detectie van ziektes zoals nierziekte kan jaren toevoegen aan de levensverwachting, dus wacht niet te lang.
                    </p>
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer list-none p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Zijn er kattenbakken die automatisch urine meten?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <div className="p-4 bg-white dark:bg-gray-700 rounded-b-lg">
                    <p className="text-gray-700 dark:text-gray-300">
                      Ja! Er zijn inmiddels slimme kattenbakken en monitoring systemen beschikbaar, zoals de PrettyLitter (kleurveranderend kattenbakvulling dat gezondheidsproblemen detecteert), Petivity Smart Litterbox (meet gewicht en gedrag), en de Tailio (weegt elke kattenbakgang). Deze systemen kunnen helpen bij vroege detectie van gezondheidsproblemen door veranderingen in urine-frequentie en -volume te monitoren. Ze zijn vooral handig als je meerdere katten hebt of je kat veel alleen is. Let wel: ze vervangen geen veterinaire zorg, maar kunnen wel waardevolle data leveren.
                    </p>
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer list-none p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Drinkt mijn kat genoeg als ik hem nooit zie drinken?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <div className="p-4 bg-white dark:bg-gray-700 rounded-b-lg">
                    <p className="text-gray-700 dark:text-gray-300">
                      Veel katten drinken 's nachts of wanneer hun eigenaren weg zijn, dus het is normaal dat je je kat niet altijd ziet drinken. Om te controleren of je kat genoeg drinkt: (1) markeer het waterniveau in de bak 's ochtends en controleer 's avonds of het gedaald is, (2) eet je kat nat voer? Dan drinkt hij minder maar krijgt vocht via voedsel, (3) controleer de kattenbak - regelmatige, goed gevormde plasklonten wijzen op voldoende hydratatie, (4) check de huidplooitest - knijp zacht in de nekvel; de huid moet direct terugspringen. Bij twijfel, laat de dierenarts een hydratiecontrole doen tijdens de jaarlijkse check-up.
                    </p>
                  </div>
                </details>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mb-6">
                Gerelateerde artikelen
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link
                  href="/gids/kattenverzorging/gezondheid-ziekte"
                  className="p-6 bg-cpSurface dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-semibold text-lg text-cpCharcoal dark:text-cpCream mb-2">
                    Gezondheid en ziektepreventie bij katten
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Alles over het gezond houden van je kat
                  </p>
                </Link>
                <Link
                  href="/gids/kattenverzorging/voeding-dieet"
                  className="p-6 bg-cpSurface dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-semibold text-lg text-cpCharcoal dark:text-cpCream mb-2">
                    Voeding en dieet voor katten
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    De juiste voeding voor een gezonde kat
                  </p>
                </Link>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-12 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                kattengezondheid
              </span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                polydipsie
              </span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                nierziekte kat
              </span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                diabetes kat
              </span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                dierenarts
              </span>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              <BlogSidebarAd />

              {/* Quick Navigation */}
              <div className="bg-cpSurface dark:bg-gray-800 rounded-xl p-6">
                <h3 className="font-semibold text-cpCharcoal dark:text-cpCream mb-4">
                  In dit artikel
                </h3>
                <nav className="space-y-2 text-sm">
                  <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-cpCoral transition-colors">
                    Hoeveel water is normaal?
                  </a>
                  <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-cpCoral transition-colors">
                    Normale oorzaken
                  </a>
                  <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-cpCoral transition-colors">
                    Medische oorzaken
                  </a>
                  <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-cpCoral transition-colors">
                    Waterconsumptie meten
                  </a>
                  <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-cpCoral transition-colors">
                    Wanneer naar de dierenarts?
                  </a>
                </nav>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
