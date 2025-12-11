import Image from "next/image";
import Link from "next/link";
import PhotoCredit from "@/components/PhotoCredit";
import BetweenContentAd from "@/components/BetweenContentAd";
import BlogSidebarAd from "@/components/BlogSidebarAd";

export const metadata = {
  title: "Hond hijgt veel: normaal of alarmsignaal? | CutiePawsPedia",
  description: "Wanneer is hijgen bij honden normaal en wanneer moet je je zorgen maken? Ontdek alle oorzaken, van warmte tot hartproblemen, en wat je kunt doen.",
  keywords: "hond hijgt, hond ademt snel, hond kortademig, hijgen hond, oververhitting hond, hond pijn",
  openGraph: {
    title: "Hond hijgt veel: normaal of alarmsignaal?",
    description: "Complete gids over hijgen bij honden: wanneer het normaal is en wanneer je actie moet ondernemen",
    images: [{ url: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=630&fit=crop" }],
  },
};

export default function HondHijgtVeel() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Hond hijgt veel: normaal of alarmsignaal?",
            description: "Ontdek wanneer hijgen bij honden normaal is en wanneer het wijst op een medisch probleem.",
            image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=630&fit=crop",
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
              Hond hijgt veel: normaal of alarmsignaal?
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-8">
              <time dateTime="2025-12-11">11 december 2025</time>
              <span>•</span>
              <span>9 min leestijd</span>
            </div>

            {/* Featured Image */}
            <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=800&fit=crop"
                alt="Hond hijgt met tong uit de bek"
                fill
                className="object-cover"
                priority
              />
            </div>
            <PhotoCredit
              photographerName="Jamie Street"
              photographerUrl="https://unsplash.com/@jamie452"
              platform="Unsplash"
              className="mb-8"
            />

            {/* Intro */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                Is je hond aan het hijgen met zijn tong uit zijn bek? Dat is vaak volkomen normaal - honden hijgen om af te koelen en zuurstof binnen te krijgen. Maar wanneer wordt hijgen excessief? En hoe weet je of het een teken is van iets ernstigs? In deze uitgebreide gids leer je het verschil tussen normaal en zorgwekkend hijgen, zodat je weet wanneer je actie moet ondernemen.
              </p>
            </div>

            {/* Main Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Waarom hijgen honden?
              </h2>
              <p>
                Honden kunnen niet zweten zoals mensen dat doen. Ze hebben alleen zweetklieren in hun pootjes, wat niet genoeg is om hun hele lichaam te koelen. Daarom gebruiken honden hijgen als hun primaire koelmechanisme.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Hoe werkt hijgen?
              </h3>
              <p>
                Wanneer een hond hijgt:
              </p>
              <ul>
                <li>Ademt hij snel met open bek</li>
                <li>Verdampt vocht van de tong, mondholte en luchtwegen</li>
                <li>Koelt dit verdampingsproces het bloed af</li>
                <li>Wordt gekoeld bloed door het lichaam gepompt</li>
                <li>Daalt de totale lichaamstemperatuur</li>
              </ul>
              <p>
                Een gezonde hond ademt 10-35 keer per minuut in rust. Tijdens hijgen kan dit oplopen tot 100-350 ademhalingen per minuut!
              </p>

              <BetweenContentAd />

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Normale redenen voor hijgen
              </h2>
              <p>
                Deze situaties zijn volkomen normaal en geen reden tot bezorgdheid:
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                1. Na fysieke activiteit
              </h3>
              <p>
                Dit is de meest voorkomende en gezonde reden voor hijgen. Na een wandeling, rennen in het park of spelen heeft je hond zijn lichaamstemperatuur verhoogd en moet hij afkoelen.
              </p>
              <p>
                <strong>Normaal patroon:</strong> Hond begint te hijgen tijdens/na inspanning, kalmeert binnen 10-30 minuten rust af.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                2. Warm weer
              </h3>
              <p>
                Bij temperaturen boven 20°C beginnen veel honden te hijgen, zelfs zonder extra inspanning. Dit is hun manier om cool te blijven.
              </p>
              <p>
                <strong>Let op bij risicogroepen:</strong>
              </p>
              <ul>
                <li>Brachycefale rassen (korte snuiten): Bulldogs, Mopshonden, Shih Tzus</li>
                <li>Dik behaarde rassen: Husky's, Samojeden, Chow Chows</li>
                <li>Overgewichtige honden</li>
                <li>Oudere honden met hartproblemen</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                3. Opwinding en blijdschap
              </h3>
              <p>
                Honden hijgen ook van opwinding! Denk aan:
              </p>
              <ul>
                <li>Als je thuiskomt</li>
                <li>Voordat jullie gaan wandelen</li>
                <li>Bij het zien van andere honden</li>
                <li>Tijdens speelsessies</li>
              </ul>
              <p>
                Dit hijgen gaat vaak gepaard met een kwispelende staart, rondspringen en blije lichaamstaal.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                4. Stress of angst
              </h3>
              <p>
                Hijgen kan ook een stressrespons zijn. Situaties die stress veroorzaken:
              </p>
              <ul>
                <li>Dierenarts bezoek</li>
                <li>Auto rijden (bij honden met reisziekte)</li>
                <li>Vuurwerk of onweer</li>
                <li>Nieuwe omgevingen</li>
                <li>Scheiding van eigenaar</li>
              </ul>
              <p>
                <strong>Herkenning:</strong> Stress-hijgen gaat vaak gepaard met andere signalen zoals:
              </p>
              <ul>
                <li>Afgewende blik</li>
                <li>Platgelegde oren</li>
                <li>Staart tussen de benen</li>
                <li>Likken van lippen</li>
                <li>Trillende spieren</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                5. Dracht en lactatie
              </h3>
              <p>
                Zwangere en zogende teven hijgen meer door:
              </p>
              <ul>
                <li>Verhoogd metabolisme</li>
                <li>Extra gewicht tijdens dracht</li>
                <li>Melkproductie tijdens lactatie</li>
                <li>Hormonale veranderingen</li>
              </ul>

              <BetweenContentAd />

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Zorgwekkende oorzaken van hijgen
              </h2>
              <p>
                Deze situaties vereisen aandacht en mogelijk veterinaire zorg:
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                1. Oververhitting en hitteberoerte
              </h3>
              <p>
                <strong>Een levensbedreigende noodsituatie!</strong>
              </p>
              <p>
                Honden kunnen geen efficiënt warmte afvoeren bij extreme hitte. Hitteberoerte kan dodelijk zijn binnen 15-30 minuten.
              </p>
              <p>
                <strong>Symptomen van oververhitting:</strong>
              </p>
              <ul>
                <li>Excessief hijgen dat niet stopt</li>
                <li>Donkerrode of paarse tong en tandvlees</li>
                <li>Dikke, kleverig speeksel</li>
                <li>Braken of diarree</li>
                <li>Verwardheid of wankelen</li>
                <li>Collaps of bewusteloosheid</li>
              </ul>
              <p>
                <strong>Wat te doen bij hitteberoerte:</strong>
              </p>
              <ol>
                <li>Breng de hond naar een koele plek</li>
                <li>Geef kleine hoeveelheden koel (niet ijskoud!) water</li>
                <li>Leg natte handdoeken op hals, buik en poten</li>
                <li>Gebruik een ventilator</li>
                <li>Ga ONMIDDELLIJK naar de dierenarts, ook als de hond lijkt te herstellen</li>
              </ol>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                2. Hart- en longziekten
              </h3>
              <p>
                Hijgen kan wijzen op ademhalings- of hartproblemen, vooral als het gebeurt in rust of bij minimale inspanning.
              </p>
              <p>
                <strong>Hartziekten bij honden:</strong>
              </p>
              <ul>
                <li><strong>Hartklepafwijkingen:</strong> Vooral bij kleine rassen zoals Cavalier King Charles Spaniels</li>
                <li><strong>Gedilateerde cardiomyopathie:</strong> Vooral bij grote rassen zoals Dobermanns en Duitse Dogs</li>
                <li><strong>Hartwormen:</strong> In gebieden waar dit voorkomt</li>
              </ul>
              <p>
                <strong>Andere symptomen:</strong>
              </p>
              <ul>
                <li>Hijgen in rust of 's nachts</li>
                <li>Verminderde inspanningstolerantie</li>
                <li>Hoesten (vooral 's nachts)</li>
                <li>Blauwe tandvlezen</li>
                <li>Opgezwollen buik</li>
                <li>Flauwvallen</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                3. Pijn en ongemak
              </h3>
              <p>
                Honden hijgen vaak als ze pijn hebben, zelfs als er geen andere duidelijke signalen zijn.
              </p>
              <p>
                <strong>Mogelijke pijnoorzaken:</strong>
              </p>
              <ul>
                <li>Artrose of gewrichtspijn</li>
                <li>Buikpijn (maagdraaiing, pancreatitis, blaasontsteking)</li>
                <li>Verwondingen of trauma</li>
                <li>Tandpijn</li>
                <li>Interne bloedingen</li>
              </ul>
              <p>
                <strong>Extra pijnsignalen:</strong>
              </p>
              <ul>
                <li>Niet willen bewegen of staan</li>
                <li>Terugdeinzen bij aanraking</li>
                <li>Agressief gedrag (onkarakteristiek)</li>
                <li>Rusteloosheid, kan niet gaan liggen</li>
                <li>Verminderde eetlust</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                4. Ademhalingsaandoeningen
              </h3>
              <p>
                <strong>Larynxverlamming (verlamde strottenhoofd):</strong>
              </p>
              <p>
                Vooral bij oudere, grote rassen zoals Labrador Retrievers en Golden Retrievers. De strottenhoofd sluit niet goed, waardoor ademhalen moeilijk wordt.
              </p>
              <p>
                <strong>Symptomen:</strong>
              </p>
              <ul>
                <li>Luid, raspy hijgen ("roaring sound")</li>
                <li>Verergering bij warmte of inspanning</li>
                <li>Blauwe tandvlezen bij ernstige gevallen</li>
              </ul>
              <p>
                <strong>Brachycefaal syndroom:</strong>
              </p>
              <p>
                Kortsnutige rassen (Bulldogs, Mopshonden, Boxers) hebben van nature vernauwde luchtwegen en hijgen sneller.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                5. Cushing's syndroom (hyperadrenocorticisme)
              </h3>
              <p>
                Een hormonale aandoening waarbij de bijnierschors te veel cortisol produceert.
              </p>
              <p>
                <strong>Andere symptomen:</strong>
              </p>
              <ul>
                <li>Verhoogde dorst en plassen</li>
                <li>Toegenomen eetlust</li>
                <li>Opgezwollen, hangbuik</li>
                <li>Haarverlies (vooral symmetrisch)</li>
                <li>Dunne huid</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                6. Bloedarmoede (anemie)
              </h3>
              <p>
                Te weinig rode bloedcellen betekent minder zuurstof in het bloed. De hond compenseert door sneller te hijgen.
              </p>
              <p>
                <strong>Symptomen:</strong>
              </p>
              <ul>
                <li>Bleke tandvlezen</li>
                <li>Zwakte en lethargie</li>
                <li>Snelle vermoeidheid</li>
                <li>Snel hijgen bij minimale inspanning</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                7. Medicatie bijwerkingen
              </h3>
              <p>
                Sommige medicijnen kunnen hijgen veroorzaken als bijwerking:
              </p>
              <ul>
                <li>Prednison en andere steroïden</li>
                <li>Bepaalde pijnstillers</li>
                <li>Schildkliermedicatie (overdosering)</li>
              </ul>

              <BetweenContentAd />

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Wanneer direct naar de dierenarts?
              </h2>
              <p>
                Ga onmiddellijk naar een dierenarts of spoedeisende hulp als:
              </p>
              <ul>
                <li><strong>Blauwe of paarse tandvlezen/tong:</strong> Duidt op zuurstoftekort</li>
                <li><strong>Hijgen met piepende of raspende geluiden:</strong> Kan wijzen op luchtwegobstructie</li>
                <li><strong>Collaps of bewusteloosheid:</strong> Noodsituatie!</li>
                <li><strong>Braken of diarree samen met hijgen:</strong> Kan wijzen op vergiftiging of maagdraaiing</li>
                <li><strong>Hijgen met opgezwollen buik:</strong> Kan levensbedreigende maagdraaiing zijn</li>
                <li><strong>Tekenen van pijn:</strong> Janken, krimp in elkaar, agressie</li>
                <li><strong>Plotseling excessief hijgen zonder duidelijke reden:</strong> Vooral 's nachts of in rust</li>
                <li><strong>Hijgen na mogelijke vergiftiging:</strong> Bijvoorbeeld na eten van chocolade, druiven, xylitol</li>
              </ul>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Wat doet de dierenarts?
              </h2>
              <p>
                De dierenarts zal een grondige onderzoek doen:
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                1. Anamnese
              </h3>
              <ul>
                <li>Wanneer begon het hijgen?</li>
                <li>Zijn er andere symptomen?</li>
                <li>Wat is de recente activiteit geweest?</li>
                <li>Medicatie of dieetveranderingen?</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                2. Lichamelijk onderzoek
              </h3>
              <ul>
                <li>Lichaamstemperatuur meten</li>
                <li>Hart- en longauscultatie</li>
                <li>Controle van tandvleeskleur en capillaire vultijd</li>
                <li>Buikpalpatie</li>
                <li>Beoordeling van luchtwegen</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                3. Diagnostische tests
              </h3>
              <ul>
                <li><strong>Bloedonderzoek:</strong> Check voor anemie, infecties, orgaanfunctie, hormonen</li>
                <li><strong>Röntgenfoto's:</strong> Van hart en longen</li>
                <li><strong>ECG:</strong> Om hartritme te controleren</li>
                <li><strong>Echografie:</strong> Van hart of buikorganen</li>
                <li><strong>Laryngoscopie:</strong> Bij verdenking op larynxverlamming</li>
              </ul>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Preventie en thuiszorg
              </h2>
              <p>
                Zo houd je je hond veilig en comfortabel:
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Bij warm weer
              </h3>
              <ul>
                <li>Wandel in de vroege ochtend of late avond</li>
                <li>Geef altijd toegang tot vers, koel water</li>
                <li>Laat nooit een hond in een hete auto achter (zelfs geen 5 minuten!)</li>
                <li>Bied schaduw en koele rustplekken aan</li>
                <li>Overweeg een koelmat of -vest</li>
                <li>Vermijd intensieve inspanning bij temperaturen boven 25°C</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Gewichtsmanagement
              </h3>
              <p>
                Overgewichtige honden hijgen sneller. Houd je hond op een gezond gewicht door:
              </p>
              <ul>
                <li>Juiste porties voer</li>
                <li>Regelmatige beweging</li>
                <li>Beperken van tussendoortjes</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Stressreductie
              </h3>
              <ul>
                <li>Rustige omgeving tijdens stressvolle situaties</li>
                <li>Positieve conditionering voor dierenarts/auto</li>
                <li>Feromoonproducten (Adaptil)</li>
                <li>Thundershirt bij angst voor geluid</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Regelmatige controles
              </h3>
              <ul>
                <li>Jaarlijkse veterinaire check-ups</li>
                <li>Bij oudere honden (>7 jaar): halfjaarlijkse controles</li>
                <li>Hartscreening bij risicogroepen</li>
              </ul>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Specifieke aandacht voor risicogroepen
              </h2>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Brachycefale rassen
              </h3>
              <p>
                Bulldogs, Mopshonden, Frenchies, Bostons, Shih Tzus:
              </p>
              <ul>
                <li>Zijn extra gevoelig voor warmte</li>
                <li>Kunnen slechter hijgen door anatomische beperkingen</li>
                <li>Hebben vaak chirurgische correctie nodig (neusgat verwijding, zachte gehemelte verkleining)</li>
                <li>Moeten nooit zwaar inspannen bij warmte</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Grote rassen
              </h3>
              <p>
                Duitse Dogs, Dobermanns, Golden Retrievers:
              </p>
              <ul>
                <li>Verhoogd risico op gedilateerde cardiomyopathie</li>
                <li>Larynxverlamming bij oudere honden</li>
                <li>Regelmatige hartscreening aanbevolen</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Oudere honden
              </h3>
              <ul>
                <li>Verhoogd risico op hart- en longziekten</li>
                <li>Artrose kan pijn veroorzaken → hijgen</li>
                <li>Cognitieve dysfunctie kan leiden tot stress-hijgen</li>
              </ul>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Conclusie: ken je hond
              </h2>
              <p>
                Het belangrijkste advies is: <strong>ken het normale hijgpatroon van je hond</strong>. Elke hond is anders. Een Labrador hijgt natuurlijk meer dan een Chihuahua. Een jonge, energieke hond hijgt na spelen, een oude hond mogelijk al na een korte wandeling.
              </p>
              <p>
                <strong>Vuistregels:</strong>
              </p>
              <ul>
                <li>Hijgen na inspanning of bij warmte: meestal normaal</li>
                <li>Hijgen stopt binnen 10-30 minuten rust: normaal</li>
                <li>Hijgen in rust, 's nachts, of zonder reden: onderzoek nodig</li>
                <li>Hijgen met andere symptomen (braken, zwakte, blauwe tandvlezen): NOODGEVAL</li>
              </ul>
              <p>
                Bij twijfel: bel altijd je dierenarts. Het is beter om te voorzichtig te zijn dan een ernstig probleem te missen. Vroege detectie van hart-, long- of andere aandoeningen kan het verschil maken tussen een succesvolle behandeling en een slechte uitkomst.
              </p>
              <p>
                Wees de stem van je hond - hij kan je niet vertellen wat er mis is, maar zijn hijgen kan je veel vertellen!
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
                      Hoeveel hijgen is te veel hijgen?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <div className="p-4 bg-white dark:bg-gray-700 rounded-b-lg">
                    <p className="text-gray-700 dark:text-gray-300">
                      Normaal hijgen na inspanning moet binnen 10-30 minuten afnemen als je hond rust. Als je hond langer dan 30 minuten blijft hijgen zonder reden, of als het hijgen intenser wordt in plaats van minder, kan dit wijzen op een probleem. Let ook op de context: hijgen 's nachts in een koele kamer, hijgen zonder activiteit, of hijgen dat zo heftig is dat je hond niet kan eten of drinken, zijn allemaal tekenen dat er iets mis kan zijn.
                    </p>
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer list-none p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Waarom hijgt mijn hond 's nachts?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <div className="p-4 bg-white dark:bg-gray-700 rounded-b-lg">
                    <p className="text-gray-700 dark:text-gray-300">
                      Nachtelijk hijgen bij een normale kamertemperatuur is vaak een rode vlag. Mogelijke oorzaken zijn: (1) Hartproblemen - vocht opbouw in de longen verergert vaak 's nachts, (2) Pijn - artrose of andere pijn kan erger zijn na een dag rust, (3) Cushing's syndroom - nachtelijk hijgen is een klassiek symptoom, (4) Cognitieve dysfunctie bij oudere honden (hondenversie van dementie), (5) Angst of stress. Als je hond regelmatig 's nachts hijgt, maak dan een afspraak met de dierenarts voor een grondige check-up.
                    </p>
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer list-none p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Kan ik mijn hond iets geven om het hijgen te stoppen?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <div className="p-4 bg-white dark:bg-gray-700 rounded-b-lg">
                    <p className="text-gray-700 dark:text-gray-300">
                      Geef NOOIT medicatie aan je hond zonder overleg met een dierenarts. Hijgen is een symptoom, geen ziekte op zich. Het 'stoppen' van hijgen zonder de onderliggende oorzaak te behandelen kan gevaarlijk zijn. Bijvoorbeeld, als een hond hijgt door pijn en je onderdrukt het hijgen, behandel je de pijn niet en weet je niet dat je hond lijdt. De juiste aanpak is: identificeer de oorzaak, behandel die oorzaak, en het hijgen zal verminderen als onderdeel van het herstel. In geval van hitte, help dan door koeling, water, en schaduw - niet door medicatie.
                    </p>
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer list-none p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Mijn oude hond hijgt de laatste tijd veel meer, is dat normaal?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <div className="p-4 bg-white dark:bg-gray-700 rounded-b-lg">
                    <p className="text-gray-700 dark:text-gray-300">
                      Bij oudere honden is toegenomen hijgen vaak NIET normaal en verdient het onderzoek. Oudere honden hebben een verhoogd risico op: (1) Hartziekten - hartfalen ontwikkelt zich geleidelijk, (2) Larynxverlamming - vooral bij grote rassen boven de 10 jaar, (3) Artrose en gewrichtspijn - chronische pijn kan leiden tot meer hijgen, (4) Cushing's syndroom - komt vaker voor bij oudere honden, (5) Cognitieve dysfunctie - kan leiden tot angst en stress. Een senior check-up inclusief bloedonderzoek, hartonderzoek en gewrichtscontrole wordt sterk aanbevolen. Vroege detectie kan de kwaliteit van leven aanzienlijk verbeteren.
                    </p>
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer list-none p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Hoe weet ik of mijn hond oververhit is of gewoon warm heeft?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <div className="p-4 bg-white dark:bg-gray-700 rounded-b-lg">
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>Normale warmte:</strong> Hijgen met roze tong en tandvlees, hond is alert en responsieft, hijgen vermindert als de hond naar een koelere plek gaat. <strong>Oververhitting (noodgeval!):</strong> Donkerrode of paarse tong, dikke kleverig speeksel, wankelen of zwakte, braken, verwardheid, snelle hartslag (>120 slagen/minuut in rust), niet reageren op koeling binnen 5-10 minuten. Bij het eerste teken van oververhitting: onmiddellijk afkoelen en naar de dierenarts, zelfs als de hond lijkt te herstellen. Hitteberoerte kan vertraagde effecten hebben die dodelijk zijn.
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
                  href="/gids/hondenverzorging/eerste-hulp"
                  className="p-6 bg-cpSurface dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-semibold text-lg text-cpCharcoal dark:text-cpCream mb-2">
                    Eerste hulp voor honden
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Wat te doen in noodsituaties
                  </p>
                </Link>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-12 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                hond hijgt
              </span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                hondengezondheid
              </span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                oververhitting
              </span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                hartziekten hond
              </span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                noodgeval
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
                    Waarom hijgen honden?
                  </a>
                  <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-cpCoral transition-colors">
                    Normale redenen
                  </a>
                  <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-cpCoral transition-colors">
                    Zorgwekkende oorzaken
                  </a>
                  <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-cpCoral transition-colors">
                    Wanneer naar de dierenarts?
                  </a>
                  <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-cpCoral transition-colors">
                    Preventie en thuiszorg
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
