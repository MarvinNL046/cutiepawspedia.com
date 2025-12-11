import Image from "next/image";
import Link from "next/link";
import PhotoCredit from "@/components/PhotoCredit";
import BetweenContentAd from "@/components/BetweenContentAd";
import BlogSidebarAd from "@/components/BlogSidebarAd";

export const metadata = {
  title: "Hond ruikt uit zijn bek: oorzaken en oplossingen | CutiePawsPedia",
  description: "Heeft je hond een slechte adem? Ontdek alle oorzaken van mondgeur bij honden, van tandproblemen tot ernstige ziektes, en leer hoe je het kunt aanpakken.",
  keywords: "hond stinkende adem, slechte adem hond, hond mondgeur, tandverzorging hond, tandplak hond",
  openGraph: {
    title: "Hond ruikt uit zijn bek: oorzaken en oplossingen",
    description: "Complete gids over mondgeur bij honden en effectieve oplossingen",
    images: [{ url: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=1200&h=630&fit=crop" }],
  },
};

export default function HondRuiktUitBek() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Hond ruikt uit zijn bek: oorzaken en oplossingen",
            description: "Ontdek waarom je hond uit zijn bek ruikt en wat je eraan kunt doen. Van tandproblemen tot voedingsaanpassingen.",
            image: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=1200&h=630&fit=crop",
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
              Hond ruikt uit zijn bek: oorzaken en oplossingen
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-8">
              <time dateTime="2025-12-11">11 december 2025</time>
              <span>•</span>
              <span>11 min leestijd</span>
            </div>

            {/* Featured Image */}
            <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=1200&h=800&fit=crop"
                alt="Hond met open bek die zijn tanden laat zien"
                fill
                className="object-cover"
                priority
              />
            </div>
            <PhotoCredit
              photographerName="Richard Brutyo"
              photographerUrl="https://unsplash.com/@richardbrutyo"
              platform="Unsplash"
              className="mb-8"
            />

            {/* Intro */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                Deins je achteruit als je hond je enthousiast begroet met zijn gezicht vlak bij het jouwe? Slechte adem bij honden is een veelvoorkomend probleem, maar het is niet normaal en zeker niet iets waar je "gewoon mee moet leven". Sterker nog, een stinkende hondenadem kan een teken zijn van ernstige gezondheidsproblemen. In deze uitgebreide gids ontdek je alle oorzaken van mondgeur bij honden en wat je eraan kunt doen - van eenvoudige thuisoplossingen tot professionele behandelingen.
              </p>
            </div>

            {/* Main Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Hoe ruikt een gezonde hondenadem?
              </h2>
              <p>
                Laten we eerst een belangrijke misvatting uit de wereld helpen: <strong>een gezonde hondenadem zou niet stinken</strong>. Ja, een hond ruikt niet zoals een mens na het poetsen, maar het zou ook geen vuilnisemmer-geur moeten zijn.
              </p>
              <p>
                Een gezonde hondenadem is:
              </p>
              <ul>
                <li>Neutraal tot licht muskusachtig</li>
                <li>Niet walgelijk of overweldigend</li>
                <li>Geen reden om weg te duiken als je hond in je gezicht ademt</li>
              </ul>
              <p>
                Als je je neus ophaalt bij je hond's adem, is er waarschijnlijk iets aan de hand dat aandacht verdient.
              </p>

              <BetweenContentAd />

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                De 10 meest voorkomende oorzaken van slechte adem
              </h2>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                1. Tandplak en tandsteen
              </h3>
              <p>
                <strong>De nummer 1 oorzaak - goed voor 80% van alle gevallen!</strong>
              </p>
              <p>
                Net als bij mensen ontstaat tandplak wanneer bacteriën, voedselresten en speeksel zich ophopen op de tanden. Zonder regelmatig poetsen verhardt tandplak tot tandsteen (ook wel tandteen genoemd) - die harde, geel-bruine aanslag die je op de tanden ziet.
              </p>
              <p>
                <strong>Waarom stinkt het?</strong> De bacteriën in tandplak produceren zwavelverbindingen die een verschrikkelijke geur afgeven.
              </p>
              <p>
                <strong>Andere symptomen:</strong>
              </p>
              <ul>
                <li>Geel-bruine aanslag op tanden, vooral bij de kaaklijnen</li>
                <li>Rood, gezwollen tandvlees</li>
                <li>Bloedend tandvlees bij eten of kauwen</li>
                <li>Verminderde eetlust (pijnlijk kauwen)</li>
                <li>Kwijlen</li>
                <li>Voorkeur voor zacht voer</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                2. Tandvleesontsteking (gingivitis)
              </h3>
              <p>
                Als tandplak niet wordt verwijderd, ontstaat gingivitis - een ontsteking van het tandvlees. Dit is het beginstadium van tandvleesziekte en is gelukkig nog omkeerbaar met goede verzorging.
              </p>
              <p>
                <strong>Herkenning:</strong>
              </p>
              <ul>
                <li>Helderrood tandvlees (gezond tandvlees is lichtroze)</li>
                <li>Gezwollen tandvleesrand</li>
                <li>Bloeden bij aanraking</li>
                <li>Sterke, metaalachtige geur</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                3. Parodontitis (ernstige tandvleesziekte)
              </h3>
              <p>
                Als gingivitis niet wordt behandeld, ontwikkelt het zich tot parodontitis - een ernstige, <strong>onomkeerbare</strong> tandvleesziekte waarbij het bot en weefsel rond de tanden worden aangetast.
              </p>
              <p>
                <strong>Gevolgen:</strong>
              </p>
              <ul>
                <li>Terugtrekking van het tandvlees</li>
                <li>Losse of uitvallende tanden</li>
                <li>Abcessen (pus-zakjes)</li>
                <li>Botverlies in de kaak</li>
                <li>Bacteriën kunnen via de bloedbaan naar hart, lever en nieren reizen</li>
              </ul>
              <p>
                <strong>Geur:</strong> Extreem walgelijk, soms met een zoete, rottende geur.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                4. Gebroken of geabsedeerde tanden
              </h3>
              <p>
                Gebroken tanden kunnen geïnfecteerd raken, wat leidt tot abcessen - pijnlijke zakjes vol pus.
              </p>
              <p>
                <strong>Oorzaken van gebroken tanden:</strong>
              </p>
              <ul>
                <li>Kauwen op te harde voorwerpen (stenen, harde botten, hout)</li>
                <li>Trauma (bijvoorbeeld aanrijding, val)</li>
                <li>Natuurlijke tandverzwakking bij oudere honden</li>
              </ul>
              <p>
                <strong>Symptomen:</strong>
              </p>
              <ul>
                <li>Zichtbare gebroken tand</li>
                <li>Zwelling onder het oog of op de kaak</li>
                <li>Extreme pijn bij aanraking</li>
                <li>Weigering te eten aan één kant van de bek</li>
                <li>Zeer sterke, rottende geur</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                5. Orale tumoren
              </h3>
              <p>
                Tumoren in de mond kunnen gezwellen, bloedingen en necrotisch weefsel veroorzaken, wat allemaal bijdraagt aan een verschrikkelijke geur.
              </p>
              <p>
                <strong>Typen:</strong>
              </p>
              <ul>
                <li><strong>Melanoom:</strong> Donkere groei, vooral bij honden met donker tandvlees</li>
                <li><strong>Squamous cell carcinoom:</strong> Kan op tandvlees, tong of amandelen voorkomen</li>
                <li><strong>Fibrosarcoom:</strong> Agressieve tumor van bindweefsel</li>
              </ul>
              <p>
                <strong>Symptomen:</strong>
              </p>
              <ul>
                <li>Zichtbare groei of zwelling in de mond</li>
                <li>Bloeden uit de mond</li>
                <li>Moeite met eten of kauwen</li>
                <li>Gewichtsverlies</li>
                <li>Losse tanden zonder duidelijke reden</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                6. Nierziekte
              </h3>
              <p>
                Wanneer de nieren niet goed functioneren, kunnen afvalstoffen zoals ureum zich ophopen in het bloed. Dit kan een <strong>ammoniak-geur</strong> geven aan de adem.
              </p>
              <p>
                <strong>Andere symptomen:</strong>
              </p>
              <ul>
                <li>Verhoogde dorst en plassen</li>
                <li>Verminderde eetlust</li>
                <li>Gewichtsverlies</li>
                <li>Braken (vooral 's ochtends)</li>
                <li>Lethargie</li>
                <li>Bleke tandvlezen</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                7. Diabetes
              </h3>
              <p>
                Bij diabetes kan het lichaam glucose niet goed verwerken, waardoor het overschakelt op vetverbranding. Dit proces produceert ketonen, die een <strong>zoete, fruitige of acetone-achtige geur</strong> geven aan de adem.
              </p>
              <p>
                <strong>Andere symptomen:</strong>
              </p>
              <ul>
                <li>Verhoogde dorst en plassen</li>
                <li>Toegenomen eetlust maar gewichtsverlies</li>
                <li>Lethargie</li>
                <li>Cataract (wazig ogen)</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                8. Maag- en darmproblemen
              </h3>
              <p>
                Maagzuur reflux, gastro-intestinale obstructies of andere spijsverteringsproblemen kunnen leiden tot zure, rottende geur.
              </p>
              <p>
                <strong>Oorzaken:</strong>
              </p>
              <ul>
                <li>Voedselintolerantie of allergie</li>
                <li>Megaesophagus (vergrote slokdarm)</li>
                <li>Inflammatory Bowel Disease (IBD)</li>
                <li>Maagzweren</li>
              </ul>
              <p>
                <strong>Symptomen:</strong>
              </p>
              <ul>
                <li>Braken of regurgiteren</li>
                <li>Diarree of constipatie</li>
                <li>Opgezwollen buik</li>
                <li>Verminderde eetlust</li>
                <li>Gewichtsverlies</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                9. Dieet en voeding
              </h3>
              <p>
                Sommige voedingsmiddelen kunnen tijdelijk slechte adem veroorzaken:
              </p>
              <ul>
                <li><strong>Vis-gebaseerd voer:</strong> Kan een sterke visgeur achterlaten</li>
                <li><strong>Rauw vlees:</strong> Kan bacteriële groei bevorderen</li>
                <li><strong>Eten van vuil/mest:</strong> Ja, sommige honden doen dit (coprofagie)</li>
                <li><strong>Eten van dode dieren of afval:</strong> Tijdens wandelingen</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                10. Iets vastzittend in de tanden
              </h3>
              <p>
                Soms zit er simpelweg iets vast tussen de tanden of in het tandvlees:
              </p>
              <ul>
                <li>Stukje bot</li>
                <li>Stuk hout of stok</li>
                <li>Hard voer</li>
                <li>Haar (bij honden die zichzelf of andere huisdieren likken)</li>
              </ul>
              <p>
                Als dit niet wordt verwijderd, ontstaat er bacteriële groei en infectie, wat tot een sterke geur leidt.
              </p>

              <BetweenContentAd />

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Wanneer moet je naar de dierenarts?
              </h2>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Ga onmiddellijk als
              </h3>
              <ul>
                <li>De adem ruikt naar <strong>ammoniak of urine</strong> (kan nierziekte zijn)</li>
                <li>De adem ruikt <strong>zoet of fruitig</strong> (kan diabetes zijn)</li>
                <li>Je ziet <strong>bloed uit de mond</strong> komen</li>
                <li>Je hond <strong>weigert te eten</strong> of kan niet eten vanwege pijn</li>
                <li>Er is een <strong>zichtbare zwelling</strong> in het gezicht of onder de ogen</li>
                <li>Je hond vertoont tekenen van <strong>extreme pijn</strong></li>
                <li>Er zijn andere symptomen zoals <strong>braken, diarree, lethargie</strong></li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Maak binnen enkele dagen een afspraak als
              </h3>
              <ul>
                <li>De slechte adem aanhoudt ondanks thuiszorg</li>
                <li>Je zichtbare tandplak of tandsteen ziet</li>
                <li>Het tandvlees rood of gezwollen is</li>
                <li>Je hond kwijlt of paws aan zijn bek</li>
                <li>Er is een verandering in eetgewoonten</li>
              </ul>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Wat doet de dierenarts?
              </h2>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Mondonderzoek
              </h3>
              <p>
                De dierenarts zal grondig de mond inspecteren:
              </p>
              <ul>
                <li>Tanden controleren op tandplak, tandsteen, scheuren</li>
                <li>Tandvlees beoordelen op kleur, zwelling, bloedingen</li>
                <li>Zoeken naar tumoren, zweren of groeivormen</li>
                <li>Controleren of er iets vastzit</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Aanvullend onderzoek
              </h3>
              <ul>
                <li><strong>Bloedonderzoek:</strong> Om nier- en leverfunctie te checken, glucose te meten</li>
                <li><strong>Urineonderzoek:</strong> Bij verdenking op nierziekte of diabetes</li>
                <li><strong>Röntgenfoto's van de mond:</strong> Om tandwortelinfecties en botverlies te detecteren</li>
                <li><strong>Biopsie:</strong> Bij verdenking op tumor</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Professionele tandreinigings
              </h3>
              <p>
                Dit is vaak de belangrijkste behandeling bij tandproblemen:
              </p>
              <ol>
                <li><strong>Anesthesie:</strong> Je hond wordt onder narcose gebracht (veiliger en minder stressvol)</li>
                <li><strong>Grondige inspectie:</strong> Elke tand wordt individueel beoordeeld</li>
                <li><strong>Scaling:</strong> Verwijderen van tandplak en tandsteen boven én onder de tandvleeslijn</li>
                <li><strong>Polishing:</strong> Gladmaken van het tandoppervlak om nieuwe aanhechting te vertragen</li>
                <li><strong>Trekken indien nodig:</strong> Te beschadigde tanden worden verwijderd</li>
                <li><strong>Antibiotica:</strong> Bij infecties</li>
              </ol>
              <p>
                <strong>Kosten:</strong> €200-€800 afhankelijk van de ernst en aantal tanden dat getrokken moet worden.
              </p>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Thuisbehandeling en preventie
              </h2>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                1. Dagelijks tandenpoetsen
              </h3>
              <p>
                <strong>De gouden standaard!</strong> Dagelijks poetsen reduceert tandplak met 80-90%.
              </p>
              <p>
                <strong>Hoe te beginnen:</strong>
              </p>
              <ol>
                <li>Gebruik een <strong>honden-tandpasta</strong> (nooit menselijke tandpasta - xylitol is giftig!)</li>
                <li>Kies een zachte honden-tandenborstel of vingerborstel</li>
                <li>Begin met je hond gewend maken aan aanraken van bek en tanden</li>
                <li>Start met enkele tanden en bouw het langzaam op</li>
                <li>Focus op de buitenkant van de tanden (waar het meeste tandplak zit)</li>
                <li>Maak het positief met beloningen!</li>
              </ol>
              <p>
                <strong>Frequentie:</strong> Dagelijks is ideaal, minimaal 3x per week voor effect.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                2. Dentale kauwspeeltjes en traktaties
              </h3>
              <p>
                <strong>Effectieve opties:</strong>
              </p>
              <ul>
                <li><strong>VOHC-goedgekeurd:</strong> Producten met Veterinary Oral Health Council zegel (zoals Greenies, OraVet)</li>
                <li><strong>Dentale kauwbotten:</strong> Speciaal ontworpen om tandplak mechanisch te verwijderen</li>
                <li><strong>Rubberen speeltjes met ribbels:</strong> Helpen tandplak weg te masseren</li>
                <li><strong>Rawhide-alternatieven:</strong> Zoals kauwrolletjes van buffelshuid of herten gewei</li>
              </ul>
              <p>
                <strong>Vermijd:</strong> Te harde items zoals stenen, echte botten (kunnen tanden breken), of stokken (splinters).
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                3. Speciale voeding
              </h3>
              <ul>
                <li><strong>Tandverzorging-brokken:</strong> Groter en harder, mechanisch reinigend effect (bijv. Hill's t/d, Royal Canin Dental)</li>
                <li><strong>Enzymatisch voer:</strong> Bevat enzymen die tandplakvorming tegengaan</li>
                <li><strong>Droogvoer boven natvoer:</strong> Nat voer plakt meer aan tanden</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                4. Mondwater en gels voor honden
              </h3>
              <ul>
                <li><strong>Toevoeging aan drinkwater:</strong> Enzymatisch mondwater reduceert bacteriën</li>
                <li><strong>Tandgels:</strong> Smeer direct op tanden en tandvlees (geen poetsen nodig)</li>
                <li><strong>Spray:</strong> Eenvoudig in de mond sprayen</li>
              </ul>
              <p>
                <strong>Let op:</strong> Deze zijn aanvullingen, geen vervanging voor poetsen!
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                5. Regelmatige controles
              </h3>
              <ul>
                <li><strong>Thuis:</strong> Check wekelijks de tanden en tandvlees van je hond</li>
                <li><strong>Dierenarts:</strong> Jaarlijkse controle, bij oudere honden (>7 jaar) halfjaarlijks</li>
                <li><strong>Professionele reiniging:</strong> Afhankelijk van ras en genetica, elke 1-3 jaar</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                6. Dieet aanpassingen
              </h3>
              <ul>
                <li>Vermijd suikerhoudende traktaties</li>
                <li>Geef verse groenten zoals wortel (natuurlijke tandenborstel)</li>
                <li>Overweeg probiotica voor orale gezondheid</li>
                <li>Zorg voor voldoende vers water</li>
              </ul>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Natuurlijke remedies en huismiddeltjes
              </h2>
              <p>
                <strong>Let op:</strong> Deze zijn aanvullingen, geen vervanging voor veterinaire zorg!
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                1. Kokosolie
              </h3>
              <p>
                Heeft antibacteriële eigenschappen. Geef ½-1 theelepel per dag of smeer op tanden.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                2. Peterselie
              </h3>
              <p>
                Verse peterselie heeft chlorofyl dat geurenneutraliserend werkt. Fijnhakken en door voer mengen.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                3. Yoghurt met levende culturen
              </h3>
              <p>
                Probiotica kunnen helpen de mondflora in balans te brengen. Geef ongezoete, natuurlijke yoghurt.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                4. Appelciderazijn
              </h3>
              <p>
                Verdunde appelciderazijn (1 theelepel per liter water) kan bacteriën helpen bestrijden.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Waarschuwing
              </h3>
              <p>
                Gebruik <strong>NOOIT</strong>:
              </p>
              <ul>
                <li>Menselijke tandpasta (xylitol is dodelijk giftig!)</li>
                <li>Onverdunde etherische oliën</li>
                <li>Citroensap (te zuur)</li>
                <li>Bakpoeder (kan maagproblemen veroorzaken)</li>
              </ul>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Ras-specifieke aandachtspunten
              </h2>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Kleine rassen (Chihuahua, Yorkshire Terrier, Poedel)
              </h3>
              <ul>
                <li>Verhoogd risico op tandproblemen</li>
                <li>Tanden staan vaak krap op elkaar</li>
                <li>Genetische aanleg voor vroeg tandsteen</li>
                <li><strong>Actie:</strong> Extra intensieve mondverzorging nodig vanaf jonge leeftijd</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Brachycefale rassen (Bulldogs, Mopshonden, Boxers)
              </h3>
              <ul>
                <li>Tanden staan vaak scheef of overlappen</li>
                <li>Meer kans op voedselretentie</li>
                <li>Ademhalingsproblemen kunnen speekselproductie beïnvloeden</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Grote rassen (Duitse Dog, Labrador)
              </h3>
              <ul>
                <li>Minder vatbaar voor tandproblemen dan kleine rassen</li>
                <li>Maar grotere kans op gebroken tanden door kauwen op harde objecten</li>
              </ul>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                De kosten van nalatigheid
              </h2>
              <p>
                Slechte mondgezondheid gaat verder dan alleen een stinkende adem. Onbehandelde tandproblemen kunnen leiden tot:
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Gezondheidsproblemen
              </h3>
              <ul>
                <li><strong>Hartproblemen:</strong> Bacteriën kunnen via de bloedbaan het hart infecteren</li>
                <li><strong>Lever- en nierbeschadiging:</strong> Chronische infecties belasten organen</li>
                <li><strong>Verzwakt immuunsysteem:</strong> Het lichaam vecht constant tegen infecties</li>
                <li><strong>Chronische pijn:</strong> Tandpijn is constant en slopend</li>
                <li><strong>Kaakfracturen:</strong> Bij ernstig botverlies</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Financiële kosten
              </h3>
              <ul>
                <li>Professionele reiniging: €200-€400</li>
                <li>Reiniging + extraheren tanden: €400-€800</li>
                <li>Behandeling abcessen: €500-€1500</li>
                <li>Behandeling hartproblemen: €2000+</li>
              </ul>
              <p>
                Preventie is goedkoper: dagelijks poetsen kost €50/jaar aan supplies!
              </p>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Conclusie: investeer in een frisse adem
              </h2>
              <p>
                Een stinkende hondenadem is géén normaal onderdeel van het hebben van een hond. In de meeste gevallen is het een teken van tandproblemen die behandeld en voorkomen kunnen worden.
              </p>
              <p>
                <strong>Belangrijkste takeaways:</strong>
              </p>
              <ul>
                <li>Slechte adem is meestal veroorzaakt door tandplak en tandsteen (80%)</li>
                <li>Dagelijks tandenpoetsen is de beste preventie</li>
                <li>Regelmatige veterinaire controles zijn essentieel</li>
                <li>Vroege interventie voorkomt ernstige problemen</li>
                <li>Sommige geurprofielen (ammoniak, zoet) wijzen op systemische ziektes</li>
              </ul>
              <p>
                Begin vandaag nog met een mondverzorgingsroutine! Je hond zal je dankbaar zijn (al laat hij het misschien niet meteen blijken tijdens het eerste poetsen), en je zult genieten van adem-in-je-gezicht-begroetingen zonder achteruit te moeten deinzen.
              </p>
              <p>
                <strong>Onthoud:</strong> Een gezonde mond = een gezonde hond = een gelukkig baasje!
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
                      Hoe vaak moet ik de tanden van mijn hond poetsen?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <div className="p-4 bg-white dark:bg-gray-700 rounded-b-lg">
                    <p className="text-gray-700 dark:text-gray-300">
                      Ideaal is dagelijks poetsen, net zoals bij mensen. Dit voorkomt dat tandplak verhardt tot tandsteen. Als dagelijks niet haalbaar is, probeer dan minimaal 3-4 keer per week. Minder dan 3x per week heeft helaas weinig effect omdat tandplak binnen 24-48 uur begint te verharden. Begin met één keer per dag en maak er een vast onderdeel van je routine van (bijvoorbeeld na de avondwandeling). Gebruik positieve versterking met beloningen om het een aangename ervaring te maken. De eerste weken zijn het moeilijkst, maar de meeste honden raken eraan gewend.
                    </p>
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer list-none p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Zijn dentale traktaties een goede vervanging voor tandenpoetsen?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <div className="p-4 bg-white dark:bg-gray-700 rounded-b-lg">
                    <p className="text-gray-700 dark:text-gray-300">
                      Nee, dentale traktaties zijn een waardevolle aanvulling, maar geen vervanging voor tandenpoetsen. Tandpasta en mechanisch poetsen verwijderen tandplak veel effectiever dan alleen kauwen. Denk eraan zoals bij mensen: kauwen op een appel helpt, maar vervangt poetsen niet. Dentale traktaties kunnen wel helpen als je hond absoluut niet wil poetsen, maar ze zijn minder effectief. Kies altijd voor VOHC-goedgekeurde producten (Veterinary Oral Health Council), want die zijn wetenschappelijk getest. Combineer voor beste resultaten: dagelijks poetsen + dagelijks dentale traktatie.
                    </p>
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer list-none p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Is narcose voor tandreinigings echt nodig?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <div className="p-4 bg-white dark:bg-gray-700 rounded-b-lg">
                    <p className="text-gray-700 dark:text-gray-300">
                      Ja, narcose is absoluut nodig voor een professionele tandreinigings en wordt sterk aanbevolen door dierenartsen wereldwijd. Hier is waarom: (1) De belangrijkste reiniging gebeurt ONDER de tandvleeslijn, wat pijnlijk is en alleen mogelijk onder narcose, (2) Röntgenfoto's van tandwortels kunnen alleen onder narcose worden gemaakt, (3) Grondige inspectie van elke tand en het tandvlees is niet mogelijk bij een wakkere, bewegende hond, (4) Tandreinigings zonder narcose (vaak aangeboden door groomers) verwijdert alleen zichtbare tandplak maar doet niets aan de onderliggende problemen. Moderne anesthesie is zeer veilig, vooral met pre-anesthetisch bloedonderzoek om risico's te minimaliseren. De voordelen wegen ruim op tegen de kleine risico's.
                    </p>
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer list-none p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Mijn hond heeft geen tanden meer verloren maar heeft wel slechte adem, is dat erg?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <div className="p-4 bg-white dark:bg-gray-700 rounded-b-lg">
                    <p className="text-gray-700 dark:text-gray-300">
                      Ja, slechte adem is altijd een teken dat er iets niet in orde is, ongeacht of tanden uitvallen of niet. Vaak zijn de problemen ONDER het tandvlees, waar je ze niet kunt zien. Bacteriën kunnen in tandvleeszakjes zitten, in tandwortels, of er kan sprake zijn van vroege tandvleesziekte. Ook kunnen systemische problemen (nieren, diabetes, maag) slechte adem veroorzaken zonder dat er tanden uitvallen. Sommige honden hebben genetisch sterkere tanden maar nog steeds tandvleesontstekingen. Laat je hond controleren door een dierenarts, inclusief bloedonderzoek om systemische oorzaken uit te sluiten. "Geen uitgevallen tanden" betekent helaas niet "geen tandproblemen".
                    </p>
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer list-none p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Vanaf welke leeftijd moet ik beginnen met tandverzorging?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <div className="p-4 bg-white dark:bg-gray-700 rounded-b-lg">
                    <p className="text-gray-700 dark:text-gray-300">
                      Begin zo jong mogelijk, idealiter als puppy! Hoewel puppy's hun melktanden nog kwijtraken (rond 4-6 maanden), is het cruciaal om ze al jong te laten wennen aan mondverzorging. Dit maakt het veel gemakkelijker als hun blijvende tanden doorkomen. Begin met simpelweg je vinger in de bek stoppen, dan een vingerborstel met wat kippenbouillon, en uiteindelijk echte tandpasta. Maak het een positieve ervaring met veel lof en beloningen. Tegen de tijd dat je puppy 6 maanden oud is en alle blijvende tanden heeft, zou hij gewend moeten zijn aan dagelijks poetsen. Voor volwassen honden: het is nooit te laat om te beginnen! Het kost meer geduld, maar is zeker mogelijk.
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
                  href="/gids/hondenverzorging/gezondheid-ziekte"
                  className="p-6 bg-cpSurface dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-semibold text-lg text-cpCharcoal dark:text-cpCream mb-2">
                    Gezondheid en ziektepreventie bij honden
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Alles over het gezond houden van je hond
                  </p>
                </Link>
                <Link
                  href="/gids/hondenverzorging/verzorging-hygiene"
                  className="p-6 bg-cpSurface dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-semibold text-lg text-cpCharcoal dark:text-cpCream mb-2">
                    Verzorging en hygiëne voor honden
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Complete gids voor dagelijkse verzorging
                  </p>
                </Link>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-12 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                hondengezondheid
              </span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                tandverzorging
              </span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                slechte adem
              </span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                tandplak
              </span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                tandenpoetsen
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
                    Hoe ruikt gezonde adem?
                  </a>
                  <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-cpCoral transition-colors">
                    10 oorzaken van slechte adem
                  </a>
                  <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-cpCoral transition-colors">
                    Wanneer naar de dierenarts?
                  </a>
                  <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-cpCoral transition-colors">
                    Thuisbehandeling
                  </a>
                  <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-cpCoral transition-colors">
                    Preventie tips
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
