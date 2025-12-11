import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag } from "lucide-react";
import { PhotoCredit } from "@/components/blog/PhotoCredit";
import { BetweenContentAd } from "@/components/ads/AdSlot";
import { BlogSidebarAd } from "@/components/ads/BlogSidebarAd";

export const metadata: Metadata = {
  title: "Kat verliest veel haar: normaal of reden tot zorg? | CutiePawsPedia",
  description: "Ontdek wanneer haarverlies bij katten normaal is en wanneer het een teken is van een probleem. Inclusief tips voor betere vachtverzorging.",
  keywords: "kat verliest haar, kat verharing, kale plekken kat, kat haren uitval, kat rui",
  openGraph: {
    title: "Kat verliest veel haar: normaal of reden tot zorg?",
    description: "Ontdek wanneer haarverlies bij katten normaal is en wanneer het een teken is van een probleem.",
    type: "article",
    images: ["https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&h=630&fit=crop"],
  },
};

export default function KatVerliestVeelHaar() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Kat verliest veel haar: normaal of reden tot zorg?",
            "description": "Ontdek wanneer haarverlies bij katten normaal is en wanneer het een teken is van een probleem.",
            "image": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&h=630&fit=crop",
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
          Kattenverzorging
        </span>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-6 leading-tight max-w-4xl">
          Kat verliest veel haar: normaal of reden tot zorg?
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-muted-foreground dark:text-cpCream/60 mb-4">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            11 december 2025
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            8 min leestijd
          </span>
        </div>
      </header>

      {/* Featured Image */}
      <div className="container mx-auto max-w-6xl px-4 mb-8">
        <div className="relative aspect-video rounded-3xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&h=630&fit=crop"
            alt="Kat met mooie vacht"
            fill
            className="object-cover"
            priority
          />
          <PhotoCredit
            photographerName="Mikhail Vasilyev"
            photographerUrl="https://unsplash.com/@miklevasilyev"
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
                Je vindt overal kattenharen - op de bank, je kleding, de vloer. Je vraagt je af: is dit normaal of verliest mijn kat te veel haar? In dit artikel ontdek je wanneer haarverlies bij katten normaal is, welke oorzaken er zijn voor overmatig haarverlies, en wat je eraan kunt doen.
              </p>

              <h2 id="normale-haarverlies" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                Normale haarverlies bij katten
              </h2>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Alle katten verliezen voortdurend een beetje haar - dit is een natuurlijk proces waarbij oude haren vervangen worden door nieuwe. De hoeveelheid haarverlies varieert echter enorm:
              </p>

              <h3 id="seizoensgebonden-rui" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                Seizoensgebonden rui
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Katten ruien normaal gesproken twee keer per jaar:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li><strong>Lente (maart-mei)</strong>: De dikke wintervacht wordt afgestoten</li>
                <li><strong>Herfst (september-november)</strong>: De lichte zomervacht wordt vervangen door een dikkere wintervacht</li>
              </ul>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Tijdens deze periodes kan het lijken alsof je kat extreem veel haar verliest - dit is normaal. De rui duurt 2-4 weken.
              </p>

              <h3 id="binnenkatten-vs-buitenkatten" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                Binnenkatten vs buitenkatten
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Binnenkatten hebben vaak een minder uitgesproken seizoensrui door kunstlicht en constante temperaturen. Ze kunnen het hele jaar door gelijkmatig haar verliezen. Buitenkatten volgen het natuurlijke ruipatroon strenger.
              </p>

              <BetweenContentAd />

              <h2 id="oorzaken-overmatig-haarverlies" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                7 oorzaken van overmatig haarverlies
              </h2>

              <h3 id="oorzaak-1-stress" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                1. Stress en angst
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Stress is een veelvoorkomende oorzaak van overmatig haarverlies. Katten onder stress kunnen:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li>Zichzelf excessief likken (overgrooming), wat kale plekken veroorzaakt</li>
                <li>Meer haar verliezen door hormonale veranderingen</li>
                <li>Haarplukken of aan hun vacht trekken</li>
              </ul>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                <strong>Stressfactoren:</strong> verhuizing, nieuwe huisgenoten, veranderingen in routine, luide geluiden, conflict met andere huisdieren.
              </p>

              <h3 id="oorzaak-2-allergieën" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                2. Allergieën en huidproblemen
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Allergische reacties kunnen leiden tot jeuk, waardoor je kat zich meer krabt en likt:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li><strong>Voedselallergie</strong>: allergisch voor bepaalde proteïnen (kip, rund, vis)</li>
                <li><strong>Vlooienallergie</strong>: ook één vlooienbeet kan extreme jeuk veroorzaken</li>
                <li><strong>Omgevingsallergieën</strong>: pollen, stof, schoonmaakmiddelen</li>
                <li><strong>Contact allergie</strong>: bepaalde materialen, tapijten, textiel</li>
              </ul>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Symptomen: rode huid, kale plekken (vooral rond nek, buik, staart), constante krabben of likken.
              </p>

              <BetweenContentAd />

              <h3 id="oorzaak-3-parasieten" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                3. Parasieten (vlooien, mijt, ringworm)
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Parasieten zijn een belangrijke oorzaak van haarverlies:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li><strong>Vlooien</strong>: zwarte puntjes in de vacht, jeuk, kale plekken</li>
                <li><strong>Oormijtjes</strong>: donkere afscheiding in oren, krabben aan oren</li>
                <li><strong>Ringworm</strong>: schimmelinfectie met cirkelvormige kale plekken</li>
                <li><strong>Demodex mijt</strong>: veroorzaakt haaruitval rondom ogen, oren, poten</li>
              </ul>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                <strong>Let op:</strong> Ringworm is besmettelijk voor mensen! Ga direct naar de dierenarts bij vermoeden.
              </p>

              <h3 id="oorzaak-4-hormonale-problemen" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                4. Hormonale aandoeningen
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Hormonale onevenwichtigheden kunnen leiden tot symmetrisch haarverlies (aan beide kanten van het lichaam):
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li><strong>Hyperthyreoïdie</strong>: overactieve schildklier (vooral bij oudere katten)</li>
                <li><strong>Diabetes</strong>: slechte vachtkwaliteit en haarverlies</li>
                <li><strong>Ziekte van Cushing</strong>: te veel cortisol (zeldzaam bij katten)</li>
              </ul>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Deze aandoeningen gaan vaak gepaard met andere symptomen zoals gewichtsverlies, toegenomen dorst, of lethargie.
              </p>

              <h3 id="oorzaak-5-voeding" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                5. Slechte voeding of tekorten
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Een tekort aan essentiële voedingsstoffen kan leiden tot een doffe, droge vacht en overmatig haarverlies:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li><strong>Proteïnetekort</strong>: katten zijn carnivoren en hebben veel dierlijk eiwit nodig</li>
                <li><strong>Omega-3 en omega-6 vetzuren</strong>: belangrijk voor gezonde huid en vacht</li>
                <li><strong>Vitamine A, E, en B-vitamines</strong>: essentieel voor haargroei</li>
                <li><strong>Zink en biotin</strong>: ondersteunen huid- en vachtgezondheid</li>
              </ul>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Goedkoop kattenvoer met veel granen en weinig vlees kan deze tekorten veroorzaken.
              </p>

              <h3 id="oorzaak-6-overgewicht" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                6. Overgewicht en verminderde verzorging
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Katten met overgewicht kunnen bepaalde delen van hun lichaam niet goed bereiken om te poetsen. Dit leidt tot een minder gezonde vacht, klitten, en uiteindelijk haarverlies. Ook oudere katten met artritis kunnen moeite hebben met verzorging.
              </p>

              <BetweenContentAd />

              <h3 id="oorzaak-7-medicatie" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                7. Medicatie en behandelingen
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Sommige medicijnen kunnen haarverlies als bijwerking hebben:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li>Chemotherapie (bij behandeling van kanker)</li>
                <li>Steroïden op lange termijn</li>
                <li>Bepaalde antibiotica</li>
              </ul>

              <h2 id="wanneer-naar-dierenarts" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                Wanneer moet je naar de dierenarts?
              </h2>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Ga naar de dierenarts als je het volgende opmerkt:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li><strong>Kale plekken</strong>: met name cirkelvormige kale plekken</li>
                <li><strong>Rode, geïrriteerde huid</strong> of schilfers</li>
                <li><strong>Overmatig krabben of likken</strong></li>
                <li><strong>Symmetrisch haarverlies</strong> (aan beide kanten)</li>
                <li><strong>Haarverlies buiten de normale ruiperiode</strong></li>
                <li><strong>Andere symptomen</strong>: gewichtsverlies, lethargie, toegenomen dorst, gedragsveranderingen</li>
                <li><strong>Zwellingen of wondjes</strong> op de huid</li>
              </ul>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                De dierenarts kan de oorzaak vaststellen door middel van huidschrape, bloedonderzoek, of vachtonderzoek en de juiste behandeling voorschrijven.
              </p>

              <h2 id="tips-gezonde-vacht" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                Tips voor een gezonde vacht en minder haarverlies
              </h2>

              <h3 id="tip-1-borstelen" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                1. Regelmatig borstelen
              </h3>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li><strong>Kortharige katten</strong>: 2-3 keer per week</li>
                <li><strong>Langharige katten</strong>: dagelijks</li>
                <li><strong>Tijdens rui</strong>: dagelijks voor alle katten</li>
              </ul>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Regelmatig borstelen verwijdert losse haren voordat ze door het huis waaien, stimuleert de doorbloeding, en verdeelt natuurlijke huidoliën.
              </p>

              <h3 id="tip-2-voeding" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                2. Hoogwaardig kattenvoer
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Kies kattenvoer met:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li>Hoog percentage dierlijk eiwit (minstens 30-40%)</li>
                <li>Omega-3 en omega-6 vetzuren (zalm, lijnzaad)</li>
                <li>Minimaal granen en vulstoffen</li>
                <li>Geen kunstmatige kleurstoffen of smaakmakers</li>
              </ul>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Overweeg supplementen zoals visolie of biotine na overleg met de dierenarts.
              </p>

              <h3 id="tip-3-stressreductie" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                3. Verminder stress
              </h3>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li>Zorg voor voldoende speeltijd en verrijking</li>
                <li>Creëer rustige plekken om te schuilen</li>
                <li>Gebruik Feliway (synthetische feromonen) bij veranderingen</li>
                <li>Houd routines consistent</li>
                <li>Geef voldoende aandacht en affectie</li>
              </ul>

              <h3 id="tip-4-vlooienpreventie" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                4. Consequente vlooienpreventie
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Gebruik maandelijks een effectief vlooienmiddel, ook voor binnenkatten. Vlooien kunnen via schoenen of kleding naar binnen komen.
              </p>

              <h2 id="conclusie" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                Conclusie: let op patronen en veranderingen
              </h2>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Een zekere mate van haarverlies is bij katten volkomen normaal, vooral tijdens de rui. Maar als het haarverlies gepaard gaat met kale plekken, huidproblemen, of gedragsveranderingen, is het tijd voor een bezoek aan de dierenarts.
              </p>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Met goede vachtverzorging, kwalitatief voer, stressreductie, en regelmatige gezondheidscontroles houd je de vacht van je kat in optimale conditie. En vergeet niet: een beetje kattenhaar op je kleding is een klein prijsje voor alle liefde en gezelligheid die ze ons geven!
              </p>
            </div>

            {/* FAQ Section */}
            <div className="bg-card dark:bg-cpSurface/30 rounded-3xl p-6 md:p-10 border border-border dark:border-cpAmber/10 mt-8">
              <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">Veelgestelde vragen</h2>

              <details className="mb-4 pb-4 border-b border-border dark:border-cpAmber/10">
                <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer hover:text-cpCoral transition-colors">
                  Welke kattenrassen verliezen het meeste haar?
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/80">
                  Langharige rassen zoals Maine Coon, Noorse Boskat, en Perzische kat verliezen de meeste zichtbare haren. Ook rassen met dichte ondervacht zoals de Britse Korthaar ruien hevig. Katten die het minste verliezen zijn de Sphynx (haarloos), Russisch Blauw, Bengaal, en Siamees.
                </p>
              </details>

              <details className="mb-4 pb-4 border-b border-border dark:border-cpAmber/10">
                <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer hover:text-cpCoral transition-colors">
                  Helpt baden tegen overmatig haarverlies?
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/80">
                  Baden kan helpen om losse haren te verwijderen tijdens de rui, maar de meeste katten hebben geen regelmatige baden nodig - ze verzorgen zichzelf. Baden kan zelfs stress veroorzaken (wat haarverlies verergert). Borstel liever regelmatig. Overweeg alleen baden bij langharige katten die klitten hebben of bij medische huidproblemen (op aanraden van dierenarts).
                </p>
              </details>

              <details className="mb-4 pb-4 border-b border-border dark:border-cpAmber/10">
                <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer hover:text-cpCoral transition-colors">
                  Kan castratie haarverlies beïnvloeden?
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/80">
                  Castratie kan de vachtkwaliteit licht veranderen - sommige katten krijgen een iets zachtere, dikkere vacht na castratie door hormonale veranderingen. Dit is normaal en niet schadelijk. Castratie vermindert wel stress-gerelateerd haarverlies bij katten die territoriumgedrag of bronstgedrag vertoonden.
                </p>
              </details>

              <details className="mb-4 pb-4 border-b border-border dark:border-cpAmber/10">
                <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer hover:text-cpCoral transition-colors">
                  Groeien kale plekken weer aan?
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/80">
                  Dat hangt af van de oorzaak. Bij normale rui, stress-gerelateerd likken, of tijdelijke aandoeningen groeit de vacht meestal binnen 2-3 maanden volledig terug na behandeling. Bij permanente schade aan haarzakjes (littekens, zware brandwonden, bepaalde huidziektes) kan de vacht niet meer teruggroeien. Vroege behandeling vergroot de kans op volledig herstel.
                </p>
              </details>

              <details className="mb-4">
                <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer hover:text-cpCoral transition-colors">
                  Zijn er supplementen die helpen tegen haarverlies?
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/80">
                  Ja, verschillende supplementen kunnen de vachtkwaliteit verbeteren: omega-3 visolie (EPA/DHA), biotine, zink, vitamine E, en darmgezondheid-probiotica. Deze helpen vooral bij voedingstekorten. Bespreek altijd met je dierenarts welke supplementen geschikt zijn en de juiste dosering. Supplementen zijn geen vervanging voor kwalitatief basisvoer en behandelen niet de onderliggende medische oorzaken.
                </p>
              </details>
            </div>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Tag className="w-4 h-4 text-muted-foreground dark:text-cpCream/60" />
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                kat verliest haar
              </span>
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                kat verharing
              </span>
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                kale plekken kat
              </span>
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                vachtverzorging
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
              href="/nl/gids/kattenverzorging/kat-borstelen"
              className="group bg-card dark:bg-cpSurface/50 rounded-2xl overflow-hidden border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-md transition-all"
            >
              <div className="p-6">
                <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors mb-2">
                  Je kat correct borstelen: complete gids
                </h3>
                <span className="inline-flex items-center gap-1 text-cpCoral text-sm font-medium">
                  Lees meer
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>

            <Link
              href="/nl/gids/huisdiervoeding/kattenvoer-kiezen"
              className="group bg-card dark:bg-cpSurface/50 rounded-2xl overflow-hidden border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-md transition-all"
            >
              <div className="p-6">
                <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors mb-2">
                  Het beste kattenvoer kiezen
                </h3>
                <span className="inline-flex items-center gap-1 text-cpCoral text-sm font-medium">
                  Lees meer
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>

            <Link
              href="/nl/gids/dierengezondheid/huidproblemen-kat"
              className="group bg-card dark:bg-cpSurface/50 rounded-2xl overflow-hidden border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-md transition-all"
            >
              <div className="p-6">
                <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors mb-2">
                  Huidproblemen bij katten herkennen
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
