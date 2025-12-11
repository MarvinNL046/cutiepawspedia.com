import Image from "next/image";
import Link from "next/link";
import PhotoCredit from "@/components/PhotoCredit";
import BetweenContentAd from "@/components/BetweenContentAd";
import BlogSidebarAd from "@/components/BlogSidebarAd";

export const metadata = {
  title: "Waarom snurkt mijn kat? Schattig of zorgwekkend? | CutiePawsPedia",
  description: "Is het snurken van je kat normaal of duidt het op een gezondheidsprobleem? Ontdek alle oorzaken van snurken bij katten en wanneer je moet ingrijpen.",
  keywords: "kat snurkt, snurkende kat, ademhaling kat, brachycefale kat, neus verstopping kat",
  openGraph: {
    title: "Waarom snurkt mijn kat? Schattig of zorgwekkend?",
    description: "Complete gids over snurken bij katten: van schattig tot symptoom",
    images: [{ url: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&h=630&fit=crop" }],
  },
};

export default function WaaromSnurktMijnKat() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Waarom snurkt mijn kat? Schattig of zorgwekkend?",
            description: "Ontdek wanneer het snurken van je kat normaal is en wanneer het een teken van een gezondheidsprobleem kan zijn.",
            image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&h=630&fit=crop",
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
              Waarom snurkt mijn kat? Schattig of zorgwekkend?
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-8">
              <time dateTime="2025-12-11">11 december 2025</time>
              <span>•</span>
              <span>8 min leestijd</span>
            </div>

            {/* Featured Image */}
            <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&h=800&fit=crop"
                alt="Slapende kat opgerold in een bal"
                fill
                className="object-cover"
                priority
              />
            </div>
            <PhotoCredit
              photographerName="Jenna Hamra"
              photographerUrl="https://unsplash.com/@jennahamra"
              platform="Unsplash"
              className="mb-8"
            />

            {/* Intro */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                Hoor je je kat zachtjes snurken tijdens zijn middagdutje? Het is ontegenzeggelijk schattig en velen van ons vinden het zelfs geruststellend. Maar is snurken bij katten normaal? In sommige gevallen wel, maar het kan ook een teken zijn van ademhalingsproblemen of andere gezondheidskwesties. In deze gids ontdek je alles over snurken bij katten: wanneer het onschuldig is en wanneer je actie moet ondernemen.
              </p>
            </div>

            {/* Main Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Waarom snurken katten?
              </h2>
              <p>
                Net zoals bij mensen ontstaat snurken wanneer de luchtwegen gedeeltelijk geblokkeerd raken tijdens de slaap. De luchtstroom zorgt voor trillingen in de zachte weefsels van de keel, neus of zachte gehemelte, wat dat karakteristieke snurkgeluid veroorzaakt.
              </p>
              <p>
                Bij katten kan snurken verschillende oorzaken hebben, variërend van volkomen onschuldige anatomische eigenschappen tot ernstige ademhalingsproblemen die medische aandacht vereisen.
              </p>

              <BetweenContentAd />

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Onschuldige oorzaken van snurken
              </h2>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                1. Slaaphouding
              </h3>
              <p>
                De meest voorkomende en meest onschuldige reden! Net zoals mensen snurken katten vaker in bepaalde houdingen:
              </p>
              <ul>
                <li><strong>Op de rug liggen:</strong> De tong valt naar achteren en kan de luchtwegen gedeeltelijk blokkeren</li>
                <li><strong>Nek in een vreemde hoek:</strong> Kan de luchtweg beperken</li>
                <li><strong>Helemaal opgerold:</strong> Drukt op de borst en luchtpijp</li>
              </ul>
              <p>
                <strong>Herkenning:</strong> Als je kat beweegt of zijn positie verandert en het snurken stopt, is de slaaphouding waarschijnlijk de oorzaak. Dit is volkomen normaal en ongevaarlijk.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                2. Diepe slaap
              </h3>
              <p>
                Katten doorlopen verschillende slaapfases, inclusief REM-slaap (Rapid Eye Movement) waarin ze dromen. Tijdens diepe slaap ontspannen alle spieren zich volledig, inclusief die in de keel. Dit kan leiden tot tijdelijk snurken.
              </p>
              <p>
                <strong>Herkenning:</strong> Je ziet misschien ook trillende snorharen, bewegende oogleden, of zelfs pootjes die bewegen alsof je kat aan het rennen is in zijn droom!
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                3. Overgewicht
              </h3>
              <p>
                Net als bij mensen kan overgewicht bij katten leiden tot snurken. Extra vetweefsel rond de keel en nek kan de luchtwegen vernauwen.
              </p>
              <p>
                <strong>Oplossing:</strong> Als je kat overgewicht heeft, kan een gezond dieet en meer beweging niet alleen het snurken verminderen, maar ook de algemene gezondheid verbeteren en het risico op diabetes en gewrichtsproblemen verlagen.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                4. Ouderdom
              </h3>
              <p>
                Oudere katten snurken vaker dan jonge katten. Dit komt doordat:
              </p>
              <ul>
                <li>Spieren en weefsels verslappen met de leeftijd</li>
                <li>De elasticiteit van de luchtwegen afneemt</li>
                <li>Vaak wat extra gewicht erbij komt</li>
              </ul>
              <p>
                Zolang je oudere kat geen andere symptomen vertoont, is dit meestal een onschuldige verandering.
              </p>

              <BetweenContentAd />

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Anatomische redenen: brachycefale katten
              </h2>
              <p>
                Sommige kattengezichten zijn genetisch geprogrammeerd om meer te snurken vanwege hun korte snuit en platte gezicht.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Rassen die vaak snurken
              </h3>
              <ul>
                <li><strong>Perzische katten:</strong> Het meest bekende platte-gezichtsras</li>
                <li><strong>Exotic Shorthair:</strong> Korte-haren versie van de Pers</li>
                <li><strong>Himalayan:</strong> Kruising tussen Perzisch en Siamese</li>
                <li><strong>Britse Korthaar:</strong> Hebben soms een korte snuit</li>
                <li><strong>Scottish Fold:</strong> Kunnen brachycefale kenmerken hebben</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Brachycefaal syndroom
              </h3>
              <p>
                Deze katten hebben vaak:
              </p>
              <ul>
                <li><strong>Vernauwde neusgaten:</strong> Minder luchtstroom door de neus</li>
                <li><strong>Lang zacht gehemelte:</strong> Hangt in de keel en blokkeert gedeeltelijk de luchtweg</li>
                <li><strong>Kleinere luchtwegen:</strong> Algemeen vernauwd luchtwegensysteem</li>
              </ul>
              <p>
                <strong>Belangrijk:</strong> Als je een brachycefale kat hebt, is licht snurken normaal. LET ECHTER OP voor tekenen van ademhalingsproblemen zoals moeite met ademhalen, blauwe tandvlezen, of uitputting na minimale inspanning.
              </p>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Medische oorzaken van snurken
              </h2>
              <p>
                Deze redenen vereisen veterinaire aandacht:
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                1. Bovenste luchtweginfectie
              </h3>
              <p>
                Kattenverkoudheid of andere infecties kunnen tijdelijk snurken veroorzaken door:
              </p>
              <ul>
                <li>Verstopte neus door slijm</li>
                <li>Gezwollen neusholtes</li>
                <li>Ontstoken keel</li>
              </ul>
              <p>
                <strong>Andere symptomen:</strong>
              </p>
              <ul>
                <li>Niezen</li>
                <li>Loopneus of ogen</li>
                <li>Verminderde eetlust</li>
                <li>Lethargie</li>
                <li>Koorts</li>
              </ul>
              <p>
                <strong>Behandeling:</strong> Meestal genezen lichte infecties vanzelf binnen 7-10 dagen. Bij aanhoudende symptomen of verslechtering, ga naar de dierenarts voor antibiotica of andere medicatie.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                2. Allergieën
              </h3>
              <p>
                Katten kunnen allergisch zijn voor:
              </p>
              <ul>
                <li>Pollen (net als mensen)</li>
                <li>Stof en huisstofmijt</li>
                <li>Sigarettenrook</li>
                <li>Bepaalde voedingsmiddelen</li>
                <li>Parfums of schoonmaakmiddelen</li>
              </ul>
              <p>
                Allergieën kunnen de neusholtes doen zwellen, wat leidt tot snurken.
              </p>
              <p>
                <strong>Andere symptomen:</strong>
              </p>
              <ul>
                <li>Niezen</li>
                <li>Jeuk (krabben, vooral rond gezicht)</li>
                <li>Tranende ogen</li>
                <li>Huiduitslag</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                3. Neuspoliepen of tumoren
              </h3>
              <p>
                Groeivormen in de neus of keel kunnen de luchtwegen blokkeren en snurken veroorzaken.
              </p>
              <p>
                <strong>Neuspoliepen:</strong> Goedaardige groeivormen die vaak bij jonge katten voorkomen.
              </p>
              <p>
                <strong>Tumoren:</strong> Kunnen goedaardig of kwaadaardig zijn, komen vaker voor bij oudere katten.
              </p>
              <p>
                <strong>Symptomen:</strong>
              </p>
              <ul>
                <li>Geleidelijk erger wordend snurken</li>
                <li>Moeite met ademhalen door de neus</li>
                <li>Neusbloedingen</li>
                <li>Gezichtszwelling</li>
                <li>Verminderde eetlust (ruiken is moeilijk)</li>
              </ul>
              <p>
                <strong>Diagnose en behandeling:</strong> Scoping van de luchtwegen, CT-scan, mogelijk chirurgische verwijdering.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                4. Astma
              </h3>
              <p>
                Kattenastma is een chronische ontstekingsziekte van de luchtwegen die kan leiden tot snurken, vooral tijdens slaap.
              </p>
              <p>
                <strong>Symptomen:</strong>
              </p>
              <ul>
                <li>Hoesten (lijkt soms op haarbal braken)</li>
                <li>Piepende ademhaling</li>
                <li>Snelle ademhaling</li>
                <li>Open bek ademhalen</li>
                <li>Moeite met ademhalen</li>
              </ul>
              <p>
                <strong>Behandeling:</strong> Inhalers (ja, echt!), ontstekingsremmers, vermijden van triggers.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                5. Hartziekten
              </h3>
              <p>
                In zeldzame gevallen kan snurken verband houden met hartproblemen die vocht in de longen veroorzaken.
              </p>
              <p>
                <strong>Symptomen:</strong>
              </p>
              <ul>
                <li>Snurken + moeite met ademhalen</li>
                <li>Verminderde activiteit</li>
                <li>Blauwe tandvlezen</li>
                <li>Opgezwollen buik</li>
                <li>Hoesten</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                6. Vreemd voorwerp in de neus
              </h3>
              <p>
                Nieuwsgierige katten kunnen soms grashalmen, zaden of andere kleine voorwerpen in hun neus krijgen.
              </p>
              <p>
                <strong>Symptomen:</strong>
              </p>
              <ul>
                <li>Plotseling beginnend snurken</li>
                <li>Poot tegen de neus wrijven</li>
                <li>Niezen</li>
                <li>Neusbloeding</li>
                <li>Eenzijdige neusuitvloed</li>
              </ul>
              <p>
                Dit is een noodgeval - ga onmiddellijk naar de dierenarts!
              </p>

              <BetweenContentAd />

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Wanneer moet je naar de dierenarts?
              </h2>
              <p>
                Maak een afspraak als:
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Rode vlaggen (ga direct)
              </h3>
              <ul>
                <li><strong>Moeite met ademhalen:</strong> Open bek ademhalen, hijgen, uitgestrekte nek</li>
                <li><strong>Blauwe of paarse tandvlezen:</strong> Duidt op zuurstoftekort</li>
                <li><strong>Collaps of bewusteloosheid:</strong> Noodgeval!</li>
                <li><strong>Plotseling, heftig snurken:</strong> Vooral met andere symptomen</li>
                <li><strong>Neusbloeding:</strong> Kan wijzen op trauma of tumor</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Maak een afspraak binnen enkele dagen als
              </h3>
              <ul>
                <li>Snurken geleidelijk erger wordt</li>
                <li>Je kat snurkt én andere symptomen vertoont (niezen, hoesten, verminderde eetlust)</li>
                <li>Snurken gaat gepaard met ademhalingsgeluiden tijdens de dag</li>
                <li>Je kat lijkt niet lekker in zijn vel te zitten</li>
                <li>Er is neusuitvloed of tranende ogen</li>
                <li>Je kat is een brachycefaal ras en vertoont tekenen van ademhalingsproblemen</li>
              </ul>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Wat doet de dierenarts?
              </h2>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Onderzoek
              </h3>
              <ul>
                <li><strong>Anamnese:</strong> Wanneer begon het snurken? Zijn er andere symptomen?</li>
                <li><strong>Fysiek onderzoek:</strong> Controle van neus, keel, longen en hart</li>
                <li><strong>Ademhalingsobservatie:</strong> Luisteren naar ademhalingsgeluiden</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Diagnostiek
              </h3>
              <ul>
                <li><strong>Röntgenfoto's:</strong> Van borst en kop om longen, hart en neustructuren te beoordelen</li>
                <li><strong>Bloedonderzoek:</strong> Check voor infecties, hartziekten</li>
                <li><strong>Rhinoscopy:</strong> Camera door de neus om te kijken naar poliepen, tumoren of vreemde voorwerpen</li>
                <li><strong>CT-scan:</strong> Bij verdenking op tumoren of complexe anatomische problemen</li>
              </ul>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Wat kun je thuis doen?
              </h2>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                1. Optimaliseer de slaapomgeving
              </h3>
              <ul>
                <li><strong>Verhoog het hoofd:</strong> Zorg voor een iets verhoogd kussen of bed</li>
                <li><strong>Comfortabele slaappositie:</strong> Geef je kat een bed waar hij niet helemaal opgerold hoeft te liggen</li>
                <li><strong>Schone lucht:</strong> Gebruik een luchtreiniger om allergenen te verminderen</li>
                <li><strong>Vochtigheid:</strong> Een luchtbevochtiger kan helpen als de lucht droog is</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                2. Gewichtsmanagement
              </h3>
              <p>
                Als je kat overgewicht heeft:
              </p>
              <ul>
                <li>Overleg met de dierenarts over een gezond afslankplan</li>
                <li>Geef juiste porties voer (meet het!)</li>
                <li>Stimuleer beweging met speeltjes</li>
                <li>Vermijd te veel traktaties</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                3. Reduceer allergenen
              </h3>
              <ul>
                <li>Stofzuig regelmatig</li>
                <li>Was beddengoed wekelijks</li>
                <li>Rook niet in huis</li>
                <li>Gebruik geurloze schoonmaakmiddelen</li>
                <li>Overweeg hypoallergeen kattenbakvulling</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                4. Monitor en documenteer
              </h3>
              <p>
                Houd bij:
              </p>
              <ul>
                <li>Hoe vaak je kat snurkt</li>
                <li>In welke houdingen</li>
                <li>Of het erger wordt</li>
                <li>Andere symptomen</li>
              </ul>
              <p>
                Je kunt zelfs een video maken om aan de dierenarts te laten zien - dit kan zeer waardevol zijn voor de diagnose!
              </p>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Speciale aandacht voor brachycefale katten
              </h2>
              <p>
                Als je een Perzische, Exotic Shorthair of andere platte-gezichtskat hebt:
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Wat is normaal voor hen?
              </h3>
              <ul>
                <li>Licht snurken tijdens slaap</li>
                <li>Af en toe een snurkend geluid tijdens de dag</li>
                <li>Luidruchtigere ademhaling dan andere katten</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Wanneer is het een probleem?
              </h3>
              <ul>
                <li>Constant moeite met ademhalen</li>
                <li>Uitputting na minimale inspanning</li>
                <li>Open bek ademhalen</li>
                <li>Blauwe tandvlezen</li>
                <li>Flauwvallen</li>
                <li>Geen interesse in spelen of bewegen</li>
              </ul>
              <p>
                In ernstige gevallen kan chirurgie nodig zijn om de neusgaten te verwijden of het zachte gehemelte te verkorten. Dit kan de levenskwaliteit aanzienlijk verbeteren!
              </p>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Conclusie: ken je kat
              </h2>
              <p>
                Snurken bij katten is vaak volkomen onschuldig - een schattig neveneffect van diepe slaap of een gekke slaaphouding. Maar het is belangrijk om je kat goed te kennen en veranderingen op te merken.
              </p>
              <p>
                <strong>Samengevat:</strong>
              </p>
              <ul>
                <li><strong>Waarschijnlijk onschuldig:</strong> Occasioneel snurken tijdens diepe slaap, stopt als de kat beweegt, geen andere symptomen</li>
                <li><strong>Monitor nauwlettend:</strong> Geleidelijk erger wordend snurken, brachycefale rassen met ademhalingsproblemen</li>
                <li><strong>Ga naar de dierenarts:</strong> Plotseling snurken met andere symptomen, moeite met ademhalen, blauwe tandvlezen, neusbloeding</li>
              </ul>
              <p>
                In de meeste gevallen is het snurken van je kat net zo onschuldig als het schattig is. Maar door alert te blijven en je kat goed te observeren, zorg je ervoor dat je eventuele problemen vroeg detecteert. Want een gezonde kat = een gelukkige kat = een gelukkige eigenaar!
              </p>
              <p>
                Dus geniet van die kleine snurkgeluidjes, maar blijf waakzaam. En als je twijfelt: bel je dierenarts. Ze zullen het waarderen dat je zo zorgzaam bent!
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
                      Is het normaal dat mijn kat plots is beginnen met snurken?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <div className="p-4 bg-white dark:bg-gray-700 rounded-b-lg">
                    <p className="text-gray-700 dark:text-gray-300">
                      Plotseling beginnend snurken kan verschillende oorzaken hebben. Als je kat verder gezond lijkt, kan het simpelweg zijn dat hij een nieuwe favoriete slaappositie heeft gevonden die snurken veroorzaakt, of dat hij wat gewicht is aangekomen. Echter, als het snurken gepaard gaat met andere symptomen zoals niezen, neusuitvloed, verminderde eetlust of ademhalingsmoeilijkheden, kan het wijzen op een bovenste luchtweginfectie, allergie, of zelfs iets ernstiger zoals een poliep of tumor. Monitor je kat enkele dagen. Als het snurken aanhoudt of verslechtert, of als er andere symptomen bijkomen, maak dan een afspraak met de dierenarts.
                    </p>
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer list-none p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Kunnen alle kattenrassen snurken of alleen platte-gezichtsrassen?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <div className="p-4 bg-white dark:bg-gray-700 rounded-b-lg">
                    <p className="text-gray-700 dark:text-gray-300">
                      Alle katten kunnen snurken, ongeacht het ras! Brachycefale rassen (Perzische, Exotic Shorthair, Himalayan) snurken vaker en luider vanwege hun korte snuiten en vernauwde luchtwegen, maar ook "gewone" huiskatten met een normale snuit kunnen snurken. Dit kan gebeuren door slaaphouding, diepe slaap, overgewicht, of gewoon individuele anatomische variaties. Sommige katten hebben van nature een wat smaller luchtweg of een langer zacht gehemelte, wat kan leiden tot snurken zonder dat ze een plat gezicht hebben. Dus ja, elke kat kan een snurker zijn!
                    </p>
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer list-none p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Hoe kan ik het verschil zien tussen snurken en moeite met ademhalen?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <div className="p-4 bg-white dark:bg-gray-700 rounded-b-lg">
                    <p className="text-gray-700 dark:text-gray-300">
                      Dit is een cruciale vraag. <strong>Normaal snurken:</strong> Gebeurt tijdens slaap, zachte tot matige geluiden, regelmatige ademhaling, kat is ontspannen, roze tandvlezen, stopt als de kat wakker wordt of van positie verandert. <strong>Ademhalingsproblemen:</strong> Ook tijdens waken, luide, raspende of piepende geluiden, onregelmatige ademhaling, kat strekt de nek uit of ademt met open bek, blauwe of paarse tandvlezen, kat lijkt in paniek of ongemakkelijk, de buik beweegt extreem mee met ademhaling. Als je ook maar enigszins twijfelt, ga dan ONMIDDELLIJK naar de dierenarts. Ademhalingsproblemen zijn een noodgeval!
                    </p>
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer list-none p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Kan snurken ervoor zorgen dat mijn kat wakker wordt of slecht slaapt?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <div className="p-4 bg-white dark:bg-gray-700 rounded-b-lg">
                    <p className="text-gray-700 dark:text-gray-300">
                      Mild snurken verstoort de slaap van katten meestal niet. Echter, ernstig snurken dat gepaard gaat met sleep apneu (korte periodes waarin de ademhaling stopt) kan de slaapkwaliteit verstoren. Je zou dit kunnen opmerken als je kat vaak wakker wordt, overdag erg slaperig is, rustelozer lijkt dan normaal, of als je ziet dat zijn ademhaling tijdens het slapen soms even stopt en dan weer begint met een luid snurk of snuiven. Dit komt vaker voor bij ernstig overgewichtige katten of katten met brachycefaal syndroom. Als je vermoedt dat het snurken de slaap van je kat verstoort, bespreek dit met je dierenarts.
                    </p>
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer list-none p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Is er medicatie of behandeling om snurken te stoppen?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <div className="p-4 bg-white dark:bg-gray-700 rounded-b-lg">
                    <p className="text-gray-700 dark:text-gray-300">
                      De behandeling hangt af van de oorzaak. <strong>Onschuldig snurken:</strong> Meestal geen behandeling nodig, focus op gewichtsmanagement en optimale slaaphouding. <strong>Infecties:</strong> Antibiotica of antivirale medicatie. <strong>Allergieën:</strong> Antihistaminica, vermijden van allergenen. <strong>Poliepen/tumoren:</strong> Chirurgische verwijdering. <strong>Brachycefaal syndroom:</strong> Bij ernstige gevallen kan chirurgie de neusgaten verwijden of het zachte gehemelte verkorten. <strong>Overgewicht:</strong> Dieet en beweging. Er is geen "snurk-stopende pil" - de sleutel is het identificeren en behandelen van de onderliggende oorzaak. Als snurken je kat's gezondheid of levenskwaliteit niet beïnvloedt, is behandeling vaak niet nodig.
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
                  href="/gids/kattenverzorging/gedrag-communicatie"
                  className="p-6 bg-cpSurface dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-semibold text-lg text-cpCharcoal dark:text-cpCream mb-2">
                    Gedrag en communicatie bij katten
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Begrijp wat je kat je probeert te vertellen
                  </p>
                </Link>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-12 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                kat snurkt
              </span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                kattengezondheid
              </span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                ademhaling kat
              </span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                brachycefaal
              </span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                perzische kat
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
                    Waarom snurken katten?
                  </a>
                  <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-cpCoral transition-colors">
                    Onschuldige oorzaken
                  </a>
                  <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-cpCoral transition-colors">
                    Brachycefale katten
                  </a>
                  <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-cpCoral transition-colors">
                    Medische oorzaken
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
