import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag } from "lucide-react";
import { PhotoCredit } from "@/components/blog/PhotoCredit";
import { BetweenContentAd } from "@/components/ads/AdSlot";
import { BlogSidebarAd } from "@/components/ads/BlogSidebarAd";

export const metadata: Metadata = {
  title: "Hond eet gras: 5 redenen en wanneer je moet ingrijpen | CutiePawsPedia",
  description: "Ontdek waarom honden gras eten en of dit schadelijk is. Leer de 5 belangrijkste redenen kennen en wanneer je naar de dierenarts moet.",
  keywords: "hond eet gras, waarom eet hond gras, hond grazen, hond braakt gras, hond eet planten",
  openGraph: {
    title: "Hond eet gras: 5 redenen en wanneer je moet ingrijpen",
    description: "Ontdek waarom honden gras eten en of dit schadelijk is. Leer de 5 belangrijkste redenen kennen.",
    type: "article",
    images: ["https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&h=630&fit=crop"],
  },
};

export default function HondEetGras() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Hond eet gras: 5 redenen en wanneer je moet ingrijpen",
            "description": "Ontdek waarom honden gras eten en of dit schadelijk is. Leer de 5 belangrijkste redenen kennen en wanneer je naar de dierenarts moet.",
            "image": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&h=630&fit=crop",
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
          Hond eet gras: 5 redenen en wanneer je moet ingrijpen
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-muted-foreground dark:text-cpCream/60 mb-4">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            11 december 2025
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            7 min leestijd
          </span>
        </div>
      </header>

      {/* Featured Image */}
      <div className="container mx-auto max-w-6xl px-4 mb-8">
        <div className="relative aspect-video rounded-3xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&h=630&fit=crop"
            alt="Hond in het gras"
            fill
            className="object-cover"
            priority
          />
          <PhotoCredit
            photographerName="Jamie Street"
            photographerUrl="https://unsplash.com/@jamie452"
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
                Je ziet je hond gretig gras eten tijdens de wandeling en vraagt je af: is dit normaal? Waarom doen honden dit? En moet ik me zorgen maken? In dit artikel ontdek je de 5 belangrijkste redenen waarom honden gras eten, wanneer het onschuldig is, en wanneer je moet ingrijpen.
              </p>

              <h2 id="is-gras-eten-normaal" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                Is gras eten normaal gedrag bij honden?
              </h2>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Ja, gras eten is heel gewoon bij honden. Onderzoek toont aan dat <strong>60-80% van alle honden regelmatig gras eet</strong>. Het is instinctief gedrag dat teruggaat tot hun wilde voorouders, wolven, die ook plantaardig materiaal aten.
              </p>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                In de meeste gevallen is gras eten onschuldig en zelfs nuttig. Maar er zijn situaties waarin het kan wijzen op een probleem. Laten we de vijf belangrijkste redenen doornemen.
              </p>

              <BetweenContentAd />

              <h2 id="5-redenen-gras-eten" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                5 redenen waarom honden gras eten
              </h2>

              <h3 id="reden-1-spijsvertering" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                1. Maagklachten en spijsverteringshulp
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                De meest voorkomende reden: je hond heeft last van zijn maag en probeert dit op te lossen door gras te eten. Het gras prikkelt de maag, waardoor de hond moet braken en zich beter voelt.
              </p>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                <strong>Waarom werkt dit?</strong> Gras bevat vezels die de maagwand irriteren en braakreflex activeren. Dit helpt om gal, slijm, of onverteerbaar voedsel uit de maag te krijgen. Na het braken voelt je hond zich vaak opgelucht.
              </p>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                <strong>Let op:</strong> Als je hond vaak gras eet en braakt (meer dan 1-2 keer per week), kan dit wijzen op een chronisch maagprobleem zoals gastritis of reflux. Bespreek dit met je dierenarts.
              </p>

              <h3 id="reden-2-voedingsvezels" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                2. Behoefte aan vezels
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Honden hebben vezels nodig voor een gezonde spijsvertering. Als hun voer niet genoeg vezels bevat, zoeken ze dit zelf in de vorm van gras.
              </p>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Gras bevat onverteerbare plantenvezels die helpen bij:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li>Regelmatige stoelgang en voorkomen van verstopping</li>
                <li>Voeden van goede darmbacteriën</li>
                <li>Verbeteren van de darmgezondheid</li>
                <li>Langzamer doorgeven van voedsel (langer verzadigd gevoel)</li>
              </ul>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                <strong>Oplossing:</strong> Als je hond veel gras eet maar niet braakt, overweeg dan hondenvoer met meer vezels of voeg groenten toe zoals gekookte pompoen, wortel, of groene bonen.
              </p>

              <BetweenContentAd />

              <h3 id="reden-3-verveling-gewoonte" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                3. Verveling of gewoonte
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Sommige honden eten gras simpelweg omdat ze het lekker vinden, zich vervelen, of het een gewoonte is geworden. Net zoals sommige mensen nagelbijten uit verveling, kunnen honden gras eten uit gewoonte.
              </p>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Je herkent dit aan:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li>Je hond eet gras rustig en genietend, zonder braakneigingen</li>
                <li>Het gebeurt vooral tijdens wandelingen als er weinig anders te doen is</li>
                <li>Je hond kiest specifieke soorten gras (blijkbaar lekkerder!)</li>
                <li>Het gebeurt niet uit nood, maar meer als snack</li>
              </ul>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                <strong>Oplossing:</strong> Zorg voor meer mentale en fysieke stimulatie - langer wandelen, nieuwe routes nemen, snuffelspelletjes, en meer interactief speelgoed.
              </p>

              <h3 id="reden-4-voedingstekorten" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                4. Voedingstekorten (pica-gedrag)
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                In zeldzame gevallen kan excessief gras eten wijzen op voedingstekorten. Dit heet "pica" - het eten van dingen die geen voedsel zijn omdat het lichaam iets mist.
              </p>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Mogelijke tekorten die gras eten kunnen veroorzaken:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li><strong>IJzer</strong>: belangrijk voor rode bloedcellen</li>
                <li><strong>Foliumzuur (B9)</strong>: te vinden in groene bladgroenten</li>
                <li><strong>Chlorofyl</strong>: het groene pigment in planten</li>
                <li><strong>Enzymen</strong>: helpen bij spijsvertering</li>
              </ul>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                <strong>Let op:</strong> Pica-gedrag kan ook neurologisch of gedragsmatig van aard zijn (angst, dwang). Als je hond obsessief gras eet of ook andere niet-eetbare dingen consumeert (stenen, hout, aarde), raadpleeg een dierenarts.
              </p>

              <h3 id="reden-5-instinct" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                5. Evolutionair instinct
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Honden stammen af van wolven, die zowel vlees als plantaardig materiaal eten. Wolven eten het volledige karkas van hun prooi, inclusief de maaginhoud met half verteerde planten. Ze eten ook seizoensgebonden bessen, wortels, en gras.
              </p>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Dit instinct zit nog steeds in honden - ze zijn omnivoren (alleseters) en niet strikte carnivoren. Een beetje groen in het dieet is natuurlijk voor ze.
              </p>

              <BetweenContentAd />

              <h2 id="is-gras-eten-schadelijk" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                Is gras eten schadelijk voor honden?
              </h2>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                In de meeste gevallen is gras eten onschadelijk. Maar er zijn risico's waar je op moet letten:
              </p>

              <h3 id="risico-pesticiden" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                1. Pesticiden en chemicaliën
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Het grootste risico is vergiftigd gras. Gras dat is behandeld met onkruidverdelgers, pesticiden, of kunstmest kan giftig zijn voor honden. Symptomen van vergiftiging:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li>Overmatig braken en diarree</li>
                <li>Kwijlen en speekselvloed</li>
                <li>Lethargie of zwakte</li>
                <li>Trillen of stuiptrekkingen</li>
                <li>Ademhalingsproblemen</li>
              </ul>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                <strong>Preventie:</strong> Laat je hond geen gras eten in parken of tuinen waar recent is gespoten. Let op waarschuwingsborden. Kies veilige plekken voor wandelingen.
              </p>

              <h3 id="risico-parasieten" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                2. Parasieten en bacteriën
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Gras kan besmet zijn met parasieteieren (wormen) of bacteriën van de ontlasting van andere dieren. Zorg voor regelmatige ontwormingen en ontmoedig gras eten in gebieden met veel hondenpoep.
              </p>

              <h3 id="risico-giftige-planten" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                3. Giftige planten
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Sommige planten die tussen het gras groeien zijn giftig:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li>Boterbloemen</li>
                <li>Narcissen en tulpen</li>
                <li>Oleander</li>
                <li>Hortensia</li>
                <li>Lijsterbes</li>
              </ul>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Houd je hond in de gaten en leer hem welke planten hij mag negeren. Train het "laat" commando.
              </p>

              <h2 id="wanneer-naar-dierenarts" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                Wanneer moet je naar de dierenarts?
              </h2>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Ga naar de dierenarts als:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li>Je hond dagelijks gras eet en braakt (meer dan 2-3 keer per week)</li>
                <li>Er bloed zit in het braaksel</li>
                <li>Je hond letargisch is, pijn lijkt te hebben, of andere symptomen vertoont</li>
                <li>Het gras eten obsessief wordt (pica-gedrag)</li>
                <li>Je hond ook andere niet-eetbare dingen consumeert</li>
                <li>Er gewichtsverlies of veranderingen in eetlust zijn</li>
                <li>Je vermoedt vergiftiging door chemicaliën op het gras</li>
              </ul>

              <h2 id="tips-preventie" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                Tips om overmatig gras eten te voorkomen
              </h2>

              <h3 id="tip-1-voeding" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                1. Verbeter het dieet
              </h3>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li>Kies hondenvoer met voldoende vezels (3-5%)</li>
                <li>Voeg groenten toe: pompoen, wortel, groene bonen, broccoli</li>
                <li>Overweeg probiotica voor darmgezondheid</li>
                <li>Deel het eten over meerdere kleinere porties per dag</li>
              </ul>

              <h3 id="tip-2-kattengras" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                2. Bied veilig gras aan
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Kweek hondenveilig gras thuis (kattengras werkt ook voor honden). Dit is onbehandeld, schoon, en veilig. Je kunt het kopen bij dierenwinkels of zelf kweken met zaadjes.
              </p>

              <h3 id="tip-3-afleiding" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                3. Bied afleidingen tijdens wandelingen
              </h3>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li>Neem traktaties mee en beloon als je hond het gras negeert</li>
                <li>Speel onderweg spelletjes (apporteren, verstoppen zoeken)</li>
                <li>Train het "laat" of "nee" commando</li>
                <li>Wissel wandelroutes af voor meer interesse</li>
              </ul>

              <h3 id="tip-4-dierenarts-controle" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                4. Regelmatige gezondheidscontroles
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Laat je hond jaarlijks controleren. Bloedonderzoek kan voedingstekorten of onderliggende maagproblemen aan het licht brengen voordat ze ernstig worden.
              </p>

              <h2 id="conclusie" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                Conclusie: begrijp waarom, blijf alert
              </h2>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Gras eten is in de meeste gevallen normaal en onschuldig gedrag bij honden. Het kan helpen bij maagklachten, vezelbehoefte vervullen, of gewoon een leuk tijdverdrijf zijn.
              </p>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                De sleutel is om je hond goed te observeren: eet hij af en toe een hapje gras of is het obsessief? Braakt hij vaak na het gras eten? Zijn er andere symptomen?
              </p>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Let op pesticiden en giftige planten, zorg voor kwalitatief voer met voldoende vezels, en raadpleeg een dierenarts bij zorgen. Dan kun je je hond rustig zijn gang laten gaan tijdens jullie wandelingen!
              </p>
            </div>

            {/* FAQ Section */}
            <div className="bg-card dark:bg-cpSurface/30 rounded-3xl p-6 md:p-10 border border-border dark:border-cpAmber/10 mt-8">
              <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">Veelgestelde vragen</h2>

              <details className="mb-4 pb-4 border-b border-border dark:border-cpAmber/10">
                <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer hover:text-cpCoral transition-colors">
                  Moet ik mijn hond stoppen met gras eten?
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/80">
                  Niet per se. Als je hond af en toe een beetje gras eet en gezond lijkt, is dit normaal gedrag. Stop hem alleen als het gras behandeld is met chemicaliën, als er giftige planten tussen staan, of als het obsessief wordt. Bij frequente braakneigingen na gras eten is het verstandig om dit te beperken en een dierenarts te raadplegen.
                </p>
              </details>

              <details className="mb-4 pb-4 border-b border-border dark:border-cpAmber/10">
                <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer hover:text-cpCoral transition-colors">
                  Welk type gras is het veiligst voor honden?
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/80">
                  Jong, mals gras is het veiligst - het is zachter en minder scherp. Vermijd scherpe grassprieten die de keel kunnen irriteren. "Hondengras" of "kattengras" (eigenlijk graangrassen zoals tarwe, haver, gerst) is ideaal en kan je thuis kweken. Dit is onbehandeld en specifiek voor huisdieren geteeld.
                </p>
              </details>

              <details className="mb-4 pb-4 border-b border-border dark:border-cpAmber/10">
                <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer hover:text-cpCoral transition-colors">
                  Waarom eet mijn hond gras maar braakt hij niet?
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/80">
                  Dit is heel normaal! Ongeveer 25% van de honden die gras eten braakt niet achteraf. Deze honden eten gras voor andere redenen: vezelbehoefte, smaak, verveling, of gewoon omdat het lekker is. Zolang je hond gezond lijkt en het niet obsessief doet, is dit onschuldig gedrag.
                </p>
              </details>

              <details className="mb-4 pb-4 border-b border-border dark:border-cpAmber/10">
                <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer hover:text-cpCoral transition-colors">
                  Kan gras eten leiden tot wormen?
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/80">
                  Ja, dat is mogelijk. Gras kan besmet zijn met parasieteieren uit de ontlasting van besmette dieren. Vooral in drukbezochte hondenparken of gebieden met veel wilde dieren is dit risico groter. Preventie: regelmatige ontwormingskuren (elke 3-6 maanden), vermijd gras eten in gebieden met veel hondenpoep, en laat regelmatig ontlastingsonderzoek doen bij de dierenarts.
                </p>
              </details>

              <details className="mb-4">
                <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer hover:text-cpCoral transition-colors">
                  Zijn er hondenrassen die meer gras eten dan andere?
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/80">
                  Er is geen wetenschappelijk bewijs dat bepaalde rassen meer gras eten, maar individuele honden verschillen wel. Jonge, energieke honden lijken vaker gras te eten uit verveling. Honden die buiten zijn opgegroeid of werkrassen met jachtinstinct kunnen meer interesse hebben in gras en planten. Uiteindelijk is het meer een individuele voorkeur dan een rassenkenmerk.
                </p>
              </details>
            </div>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Tag className="w-4 h-4 text-muted-foreground dark:text-cpCream/60" />
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                hond eet gras
              </span>
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                waarom eet hond gras
              </span>
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                hond grazen
              </span>
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                hondengedrag
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
              href="/nl/gids/huisdiergedrag/hondengedrag-begrijpen"
              className="group bg-card dark:bg-cpSurface/50 rounded-2xl overflow-hidden border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-md transition-all"
            >
              <div className="p-6">
                <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors mb-2">
                  Hondengedrag begrijpen en interpreteren
                </h3>
                <span className="inline-flex items-center gap-1 text-cpCoral text-sm font-medium">
                  Lees meer
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>

            <Link
              href="/nl/gids/huisdiervoeding/hondenbrokken-kiezen"
              className="group bg-card dark:bg-cpSurface/50 rounded-2xl overflow-hidden border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-md transition-all"
            >
              <div className="p-6">
                <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors mb-2">
                  Het beste hondenvoer kiezen
                </h3>
                <span className="inline-flex items-center gap-1 text-cpCoral text-sm font-medium">
                  Lees meer
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>

            <Link
              href="/nl/gids/dierengezondheid/spijsverteringsproblemen"
              className="group bg-card dark:bg-cpSurface/50 rounded-2xl overflow-hidden border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-md transition-all"
            >
              <div className="p-6">
                <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors mb-2">
                  Spijsverteringsproblemen bij honden
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
