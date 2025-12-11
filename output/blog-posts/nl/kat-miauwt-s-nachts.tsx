import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag } from "lucide-react";
import { PhotoCredit } from "@/components/blog/PhotoCredit";
import { BetweenContentAd } from "@/components/ads/AdSlot";
import { BlogSidebarAd } from "@/components/ads/BlogSidebarAd";

export const metadata: Metadata = {
  title: "Kat miauwt 's nachts: oorzaken en 5 oplossingen die werken | CutiePawsPedia",
  description: "Waarom miauwt je kat 's nachts? Ontdek de 5 belangrijkste oorzaken en effectieve oplossingen om weer rustig te kunnen slapen.",
  keywords: "kat miauwt nachts, kat jankt, kat slaapt niet, nachtelijk gemauw kat, kat wakker 's nachts",
  openGraph: {
    title: "Kat miauwt 's nachts: oorzaken en 5 oplossingen die werken",
    description: "Waarom miauwt je kat 's nachts? Ontdek de 5 belangrijkste oorzaken en effectieve oplossingen om weer rustig te kunnen slapen.",
    type: "article",
    images: ["https://images.unsplash.com/photo-1573865526739-10c1dd5e5e0b?w=1200&h=630&fit=crop"],
  },
};

export default function KatMiauwtSNachts() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Kat miauwt 's nachts: oorzaken en 5 oplossingen die werken",
            "description": "Waarom miauwt je kat 's nachts? Ontdek de 5 belangrijkste oorzaken en effectieve oplossingen om weer rustig te kunnen slapen.",
            "image": "https://images.unsplash.com/photo-1573865526739-10c1dd5e5e0b?w=1200&h=630&fit=crop",
            "datePublished": "2025-12-11",
            "dateModified": "2025-12-11",
            "author": {
              "@type": "Organization",
              "name": "CutiePawsPedia"
            },
            "publisher": {
              "@type": "Organization",
              "name": "CutiePawsPedia"
            }
          }),
        }}
      />

      {/* Back Link */}
      <div className="container mx-auto max-w-6xl px-4 pt-8">
        <Link
          href="/nl/blog"
          className="inline-flex items-center gap-2 text-muted-foreground dark:text-cpCream/70 hover:text-cpCoral dark:hover:text-cpCoral transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Terug naar blog
        </Link>
      </div>

      {/* Article Header */}
      <header className="container mx-auto max-w-6xl px-4 py-8">
        <span className="inline-block px-3 py-1 bg-cpCoral/10 dark:bg-cpCoral/20 text-cpCoral text-sm font-medium rounded-full mb-4">
          Huisdiergedrag
        </span>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-6 leading-tight max-w-4xl">
          Kat miauwt 's nachts: oorzaken en 5 oplossingen die werken
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-muted-foreground dark:text-cpCream/60 mb-4">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            11 december 2025
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            9 min leestijd
          </span>
        </div>
      </header>

      {/* Featured Image */}
      <div className="container mx-auto max-w-6xl px-4 mb-8">
        <div className="relative aspect-video rounded-3xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1573865526739-10c1dd5e5e0b?w=1200&h=630&fit=crop"
            alt="Kat die 's nachts miauwt"
            fill
            className="object-cover"
            priority
          />
          <PhotoCredit
            photographerName="Jia Ye"
            photographerUrl="https://unsplash.com/@jy_visual"
            source="unsplash"
          />
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="container mx-auto max-w-6xl px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Article Content */}
          <article className="flex-1 min-w-0">
            <div className="bg-card dark:bg-cpSurface/30 rounded-3xl p-6 md:p-10 border border-border dark:border-cpAmber/10">
              <p className="text-lg text-foreground dark:text-cpCream font-medium mb-6 pb-6 border-b border-border dark:border-cpAmber/10">
                Het is midden in de nacht en je wordt wakker van luid gemauw. Je kat roept, jankt, of miauwt alsof het leven ervan afhangt. Herkenbaar? Je bent niet alleen. In dit artikel ontdek je waarom katten 's nachts miauwen en - belangrijker nog - hoe je dit gedrag kunt stoppen.
              </p>

              <h2 id="waarom-miauwen-katten-nachts" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                Waarom miauwen katten 's nachts?
              </h2>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Katten zijn van nature crepusculair - dat betekent dat ze het meest actief zijn in de schemering (ochtend en avond). Hun natuurlijke jachtinstinct maakt ze wakker wanneer wij juist willen slapen. Maar er zijn meer redenen waarom je kat 's nachts miauwt:
              </p>

              <h3 id="honger-verveling" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                1. Honger of verveling
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Als je kat overdag veel slaapt en 's avonds zijn hoofdmaaltijd krijgt, heeft hij 's nachts misschien gewoon honger. Of hij verveelt zich en wil aandacht, spelen, of eten - en ontdekt dat miauwen jou uit bed krijgt.
              </p>

              <h3 id="medische-oorzaken" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                2. Medische oorzaken
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Nachtelijk gemauw kan ook wijzen op medische problemen:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li><strong>Schildklierprobleme (hyperthyreoïdie)</strong>: vooral bij oudere katten, veroorzaakt onrust en honger</li>
                <li><strong>Pijn of ongemak</strong>: artritis, tandpijn, of urinewegproblemen</li>
                <li><strong>Cognitieve disfunctie</strong>: vergelijkbaar met dementie bij mensen, komt voor bij katten ouder dan 10 jaar</li>
                <li><strong>Gehoorverlies</strong>: oudere katten horen zichzelf niet meer en miauwen luider</li>
              </ul>

              <BetweenContentAd />

              <h3 id="bromstigheid" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                3. Bromstigheid (bij ongecastreerde katten)
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Ongecastreerde katers en ongecastreerde poezen kunnen 's nachts extreem veel miauwen, vooral tijdens de bronstperiode. Het geluid is vaak doordringend en jankend - een roep naar een partner.
              </p>

              <h3 id="stress-angst" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                4. Stress of angst
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Veranderingen in de omgeving, nieuwe huisgenoten (mens of dier), verhuizingen, of een onveilig gevoel kunnen leiden tot nachtelijk gemauw. Sommige katten worden angstig in het donker of van bepaalde geluiden.
              </p>

              <h3 id="aandacht-zoeken" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                5. Aangeleerd gedrag (aandacht zoeken)
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Dit is vaak de belangrijkste reden. Als je in het verleden reageerde op nachtelijk gemauw (door op te staan, te voeren, of aandacht te geven), heeft je kat geleerd: "Als ik miauw, krijg ik wat ik wil." Dit gedrag is vervolgens versterkt.
              </p>

              <BetweenContentAd />

              <h2 id="oplossingen-nachtelijk-gemauw" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                5 effectieve oplossingen voor nachtelijk gemauw
              </h2>

              <h3 id="oplossing-1-energiepeil" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                Oplossing 1: Verhoog het energiepeil overdag
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Een vermoeide kat is een rustige kat. Zorg ervoor dat je kat overdag voldoende beweging en mentale stimulatie krijgt:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li>Speel 15-20 minuten intensief vóór het slapengaan</li>
                <li>Gebruik interactief speelgoed zoals hengels met veren</li>
                <li>Plaats krabpalen en klimstructuren voor fysieke activiteit</li>
                <li>Gebruik puzzelspelletjes of voerballen voor mentale uitdaging</li>
                <li>Overweeg een tweede kat voor gezelschap (indien geschikt)</li>
              </ul>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                <strong>Pro tip:</strong> Simuleer een "jacht" voor het slapengaan: spelen → vangen → eten → wassen → slapen. Dit volgt het natuurlijke ritme van een kat.
              </p>

              <h3 id="oplossing-2-voedingsschema" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                Oplossing 2: Pas het voedingsschema aan
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Honger is een belangrijke oorzaak van nachtelijk gemauw. Probeer deze aanpassingen:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li>Geef de hoofdmaaltijd vlak voor het slapengaan</li>
                <li>Verdeel het eten over meerdere kleine porties per dag</li>
                <li>Gebruik een automatische voerautomaat die 's nachts een kleine portie geeft</li>
                <li>Laat een kleine hoeveelheid droogvoer achter voor 's nachts</li>
              </ul>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Een volle maag zorgt voor een slaperige kat. Kies wel voor kwalitatief voer dat lang verzadigt.
              </p>

              <BetweenContentAd />

              <h3 id="oplossing-3-negeer-gedrag" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                Oplossing 3: Negeer het gedrag consequent
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Dit is de moeilijkste, maar ook effectiefste oplossing. Als het miauwen aangeleerd gedrag is (om aandacht of eten te krijgen), moet je het negeren:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li>Reageer absoluut niet op nachtelijk gemauw - geen oogcontact, geen praten, niet opstaan</li>
                <li>Verwacht dat het gedrag eerst erger wordt voordat het beter wordt (dit heet "extinction burst")</li>
                <li>Blijf volhouden - het kan 1-2 weken duren voordat het stopt</li>
                <li>Gebruik oordoppen of een white noise machine als hulpmiddel</li>
              </ul>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                <strong>Belangrijk:</strong> Zorg eerst dat je medische oorzaken hebt uitgesloten. Negeer nooit een kat die mogelijk pijn heeft of ziek is.
              </p>

              <h3 id="oplossing-4-comfortabele-slaapruimte" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                Oplossing 4: Creëer een comfortabele nachtelijke omgeving
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Maak de nacht prettig voor je kat:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li>Zorg voor een warm, zacht bed op een rustige plek</li>
                <li>Laat een nachtlampje branden als je kat bang is in het donker</li>
                <li>Zorg voor toegang tot water, kattenbak, en een kleine hoeveelheid voer</li>
                <li>Overweeg toegang tot een raam met uitzicht (kattenentertainment!)</li>
                <li>Gebruik Feliway (synthetische kattengeurferomonen) om stress te verminderen</li>
              </ul>

              <h3 id="oplossing-5-dierenarts" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                Oplossing 5: Bezoek de dierenarts
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Als het nachtelijke gemauw plotseling is begonnen, toegenomen in frequentie, of niet reageert op bovenstaande oplossingen, ga dan naar de dierenarts. Dit is vooral belangrijk als je kat:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li>Ouder is dan 10 jaar (check voor hyperthyreoïdie, nierziekte, cognitieve disfunctie)</li>
                <li>Ook overdag gedragsveranderingen vertoont</li>
                <li>Moeite heeft met lopen, eten, of de kattenbak gebruiken</li>
                <li>Gewicht verliest of meer drinkt dan normaal</li>
              </ul>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                De dierenarts kan onderliggende medische problemen uitsluiten of behandelen. In sommige gevallen kunnen medicijnen of supplementen helpen (bijvoorbeeld voor oudere katten met cognitieve disfunctie).
              </p>

              <h2 id="wat-niet-te-doen" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                Wat je NIET moet doen
              </h2>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li><strong>Niet straffen:</strong> Schreeuwen, met water spuiten, of fysieke straf maken het alleen maar erger en beschadigen jullie relatie</li>
                <li><strong>Niet inconsistent reageren:</strong> Soms wel en soms niet reageren versterkt het gedrag juist</li>
                <li><strong>Niet afsluiten zonder middelen:</strong> Als je de slaapkamerdeur sluit, zorg dan dat je kat toegang heeft tot water, voer, en de kattenbak</li>
                <li><strong>Niet zomaar sedativa geven:</strong> Alleen onder begeleiding van een dierenarts</li>
              </ul>

              <h2 id="conclusie" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                Conclusie: geduld en consistentie zijn de sleutel
              </h2>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Nachtelijk gemauw is frustrerend, maar bijna altijd op te lossen. De meest effectieve aanpak combineert meerdere strategieën: verminder de energie van je kat overdag, pas het voedingsschema aan, en negeer het nachtelijke gedrag consequent.
              </p>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Onthoud dat gedragsverandering tijd kost - wees geduldig en consistent. Als je medische oorzaken hebt uitgesloten en de bovenstaande tips volgt, zou je binnen 1-3 weken verbetering moeten zien.
              </p>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                En vergeet niet: katten zijn experts in het trainen van mensen. De vraag is niet of je kat jou traint, maar hoe bewust je daarvan bent. Met de juiste aanpak train jij straks je kat - en niet andersom!
              </p>
            </div>

            {/* FAQ Section */}
            <div className="bg-card dark:bg-cpSurface/30 rounded-3xl p-6 md:p-10 border border-border dark:border-cpAmber/10 mt-8">
              <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">Veelgestelde vragen</h2>

              <details className="mb-4 pb-4 border-b border-border dark:border-cpAmber/10">
                <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer hover:text-cpCoral transition-colors">
                  Hoelang duurt het voordat het nachtelijke gemauw stopt?
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/80">
                  Als het aangeleerd gedrag is en je consequent bent met negeren, zie je meestal binnen 1-2 weken verbetering. Het kan eerst erger worden (extinction burst) voordat het beter wordt. Houd vol! Bij medische oorzaken hangt het af van de behandeling. Bij ouderdomsklachten kan het langer duren of blijvend management vereisen.
                </p>
              </details>

              <details className="mb-4 pb-4 border-b border-border dark:border-cpAmber/10">
                <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer hover:text-cpCoral transition-colors">
                  Mag ik mijn kat 's nachts opsluiten in een andere kamer?
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/80">
                  Ja, dat kan, maar zorg dan wel voor water, een kattenbak, wat speelgoed, en eventueel een kleine hoeveelheid voer. Sommige katten wennen hier snel aan, andere niet. Begin geleidelijk door de deur eerst op een kier te laten en stap voor stap verder te sluiten. Gebruik geen opsluiting als straf - het moet een prettige, veilige ruimte zijn.
                </p>
              </details>

              <details className="mb-4 pb-4 border-b border-border dark:border-cpAmber/10">
                <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer hover:text-cpCoral transition-colors">
                  Helpt castratie tegen nachtelijk gemauw?
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/80">
                  Ja, als de oorzaak bromstigheid is. Ongecastreerde katten miauwen excessief om een partner aan te trekken. Na castratie vermindert of verdwijnt dit gedrag meestal binnen enkele weken. Castratie heeft ook andere gezondheidsvoordelen en voorkomt ongewenste nestjes. Bespreek timing en risico's met je dierenarts - idealiter wordt een kat tussen de 4-6 maanden gecastreerd.
                </p>
              </details>

              <details className="mb-4 pb-4 border-border dark:border-cpAmber/10">
                <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer hover:text-cpCoral transition-colors">
                  Kan een tweede kat helpen tegen nachtelijke verveling?
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/80">
                  Mogelijk, maar het is geen gegarandeerde oplossing. Sommige katten gedijen met een kattenmaatje en vermoeien elkaar, waardoor ze 's nachts rustiger zijn. Andere katten zijn liever alleen en een tweede kat kan juist stress veroorzaken. Neem deze beslissing niet lichtzinnig - het vereist een goede match qua leeftijd, energie, en karakter. Overweeg eerst een proefperiode via een opvang.
                </p>
              </details>

              <details className="mb-4">
                <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer hover:text-cpCoral transition-colors">
                  Zijn er natuurlijke calming supplementen die kunnen helpen?
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/80">
                  Ja, er zijn verschillende opties zoals Feliway (synthetische feromonen), Zylkene (melkproteïne), CBD olie, of L-theanine. Deze kunnen helpen bij angst-gerelateerd gemauw, maar zijn geen wondermiddel. Bespreek altijd eerst met je dierenarts welk supplement geschikt is en wat de juiste dosering is. Combineer supplementen met gedragsaanpassingen voor het beste resultaat.
                </p>
              </details>
            </div>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Tag className="w-4 h-4 text-muted-foreground dark:text-cpCream/60" />
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                kat miauwt nachts
              </span>
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                kat jankt
              </span>
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                nachtelijk gemauw
              </span>
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                kattengedrag
              </span>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-20">
              <BlogSidebarAd sponsorAd={null} />
            </div>
          </aside>
        </div>
      </div>

      {/* Related Articles */}
      <section className="bg-secondary/50 dark:bg-cpSurface/20 py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-8 text-center">
            Lees ook deze artikelen
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/nl/gids/huisdiergedrag/kattengedrag-begrijpen"
              className="group bg-card dark:bg-cpSurface/50 rounded-2xl overflow-hidden border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-md transition-all"
            >
              <div className="p-6">
                <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors mb-2">
                  Kattengedrag begrijpen en interpreteren
                </h3>
                <span className="inline-flex items-center gap-1 text-cpCoral text-sm font-medium">
                  Lees meer
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>

            <Link
              href="/nl/gids/kattenverzorging/kattenbak-training"
              className="group bg-card dark:bg-cpSurface/50 rounded-2xl overflow-hidden border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-md transition-all"
            >
              <div className="p-6">
                <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors mb-2">
                  Kattenbak training en probleemoplossing
                </h3>
                <span className="inline-flex items-center gap-1 text-cpCoral text-sm font-medium">
                  Lees meer
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>

            <Link
              href="/nl/gids/dierengezondheid/oudere-katten"
              className="group bg-card dark:bg-cpSurface/50 rounded-2xl overflow-hidden border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-md transition-all"
            >
              <div className="p-6">
                <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors mb-2">
                  Zorg voor oudere katten
                </h3>
                <span className="inline-flex items-center gap-1 text-cpCoral text-sm font-medium">
                  Lees meer
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
