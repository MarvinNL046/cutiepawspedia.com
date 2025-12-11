import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag } from "lucide-react";
import { PhotoCredit } from "@/components/blog/PhotoCredit";
import { BetweenContentAd } from "@/components/ads/AdSlot";
import { BlogSidebarAd } from "@/components/ads/BlogSidebarAd";

export const metadata: Metadata = {
  title: "Waarom trilt mijn hond? 7 oorzaken en wanneer naar de dierenarts | CutiePawsPedia",
  description: "Ontdek de 7 belangrijkste redenen waarom je hond trilt of bibbert. Van kou tot ziekte: leer wanneer je moet ingrijpen en wanneer naar de dierenarts.",
  keywords: "hond trilt, trillen hond, hond bibbert, waarom trilt hond, hond rilt, hond spiertrillingen",
  openGraph: {
    title: "Waarom trilt mijn hond? 7 oorzaken en wanneer naar de dierenarts",
    description: "Ontdek de 7 belangrijkste redenen waarom je hond trilt of bibbert. Van kou tot ziekte: leer wanneer je moet ingrijpen.",
    type: "article",
    images: ["https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=630&fit=crop"],
  },
};

export default function WaromTriltMijnHond() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Waarom trilt mijn hond? 7 oorzaken en wanneer naar de dierenarts",
            "description": "Ontdek de 7 belangrijkste redenen waarom je hond trilt of bibbert. Van kou tot ziekte: leer wanneer je moet ingrijpen en wanneer naar de dierenarts.",
            "image": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=630&fit=crop",
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
          Dierengezondheid
        </span>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-6 leading-tight max-w-4xl">
          Waarom trilt mijn hond? 7 oorzaken en wanneer naar de dierenarts
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
            src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=630&fit=crop"
            alt="Hond die bibbert of trilt"
            fill
            className="object-cover"
            priority
          />
          <PhotoCredit
            photographerName="Karsten Winegeart"
            photographerUrl="https://unsplash.com/@karsten116"
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
                Je ziet dat je hond trilt of bibbert en je vraagt je af wat er aan de hand is. Is het kou? Angst? Of iets ernstigs? In dit artikel leg ik je de 7 belangrijkste oorzaken uit en vertel ik je wanneer je direct naar de dierenarts moet.
              </p>

              <h2 id="waarom-trillen-honden" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                Waarom trillen honden?
              </h2>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Trillen of beven bij honden kan verschillende oorzaken hebben - van volkomen onschuldig tot verontrustend. Als baasje is het belangrijk om te weten wanneer het normaal is en wanneer je moet ingrijpen.
              </p>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Het goede nieuws: in de meeste gevallen is trillen tijdelijk en onschuldig. Maar er zijn situaties waarin je alert moet zijn. Laten we de zeven belangrijkste oorzaken doornemen.
              </p>

              <BetweenContentAd />

              <h2 id="1-kou-temperatuur" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                1. Kou: je hond heeft het gewoon koud
              </h2>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                De meest voorkomende reden waarom honden trillen is simpelweg kou. Net als mensen rillen honden om hun lichaamstemperatuur op peil te houden. Dit zie je vooral bij:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li>Kleine honden (Chihuahua's, Yorkshire Terriers)</li>
                <li>Honden met kort haar of weinig ondervacht</li>
                <li>Oudere honden met een tragere stofwisseling</li>
                <li>Na het zwemmen of een bad</li>
                <li>Bij koud of nat weer</li>
              </ul>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                <strong>Wat kun je doen?</strong> Zorg voor een warme plek in huis, gebruik eventueel een hondenjasje bij koud weer, en droog je hond goed af na het zwemmen. Als het trillen stopt zodra je hond weer warm is, was het gewoon kou.
              </p>

              <h2 id="2-angst-stress" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                2. Angst en stress
              </h2>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Emotionele spanning kan ook trillingen veroorzaken. Dit gebeurt vaak bij:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li>Vuurwerk en onweer</li>
                <li>Een bezoek aan de dierenarts</li>
                <li>Onbekende situaties of omgevingen</li>
                <li>Confrontaties met andere honden</li>
                <li>Luid geluid (stofzuiger, bouwlawaai)</li>
              </ul>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Je herkent angst-gerelateerd trillen vaak aan andere signalen zoals hijgen, ingeklemde staart, afgeplatte oren, of een gebogen houding.
              </p>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                <strong>Wat kun je doen?</strong> Blijf kalm, creëer een veilige plek voor je hond, en forceer niets. Overweeg gedragstraining of een Thunder Shirt voor angstige honden. Bij ernstige angst kan een diergedragsdeskundige helpen.
              </p>

              <BetweenContentAd />

              <h2 id="3-opwinding-blijdschap" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                3. Opwinding en blijdschap
              </h2>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Sommige honden trillen van pure opwinding - vooral wanneer je thuiskomt, voor het eten, of vlak voor een wandeling. Dit is meestal onschuldig en gaat over zodra de opwinding afneemt.
              </p>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Je ziet dit vaak bij enthousiaste, energieke rassen en jonge honden. Het trillen gaat dan gepaard met kwispelen, springen, en andere tekenen van vreugde.
              </p>

              <h2 id="4-pijn-ongemak" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                4. Pijn of ongemak
              </h2>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Trillen kan ook een teken zijn van pijn. Dit is vaak moeilijker te herkennen omdat honden hun pijn instinctief verbergen. Let op of het trillen gepaard gaat met:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li>Mank lopen of stijfheid</li>
                <li>Niet willen springen of traplopen</li>
                <li>Verminderde eetlust</li>
                <li>Teruggetrokken gedrag</li>
                <li>Janken of klagen</li>
              </ul>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                <strong>Let op:</strong> Als je vermoedt dat je hond pijn heeft, ga dan altijd naar de dierenarts. Geef nooit menselijke pijnstillers aan je hond - deze kunnen dodelijk zijn.
              </p>

              <BetweenContentAd />

              <h2 id="5-vergiftiging" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                5. Vergiftiging
              </h2>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Trillen kan een symptoom zijn van vergiftiging. Alarmerende signalen zijn:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li>Plotseling en hevig trillen</li>
                <li>Braken of diarree</li>
                <li>Overmatig kwijlen</li>
                <li>Verwarring of desoriëntatie</li>
                <li>Aanvallen of stuipen</li>
              </ul>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Veelvoorkomende giftige stoffen voor honden zijn chocolade, xylitol (kunstmatige zoetstof), druiven, ui, knoflook, rattengif, en bepaalde planten.
              </p>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                <strong>Actie vereist:</strong> Bij vermoeden van vergiftiging moet je DIRECT naar de dierenarts of een dierenartsenpraktijk met spoedeisende hulp. Elke minuut telt.
              </p>

              <h2 id="6-neurologische-aandoeningen" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                6. Neurologische aandoeningen
              </h2>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                In zeldzame gevallen kan trillen wijzen op een neurologische aandoening zoals:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li><strong>Shaker syndrome</strong>: chronisch trillen over het hele lichaam, vooral bij kleine witte honden</li>
                <li><strong>Epilepsie</strong>: kan beginnen met trillen voor een aanval</li>
                <li><strong>Distemper</strong>: virusziekte die trillingen kan veroorzaken (vooral bij ongevaccineerde honden)</li>
                <li><strong>Hersenaandoeningen</strong>: tumoren of ontstekingen</li>
              </ul>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Deze aandoeningen gaan vaak gepaard met andere symptomen zoals coördinatieproblemen, veranderingen in gedrag, of aanvallen.
              </p>

              <h2 id="7-ouderdom" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                7. Ouderdom en spierzwakte
              </h2>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Oudere honden kunnen gaan trillen door spierzwakte, artritis, of een verminderde lichaamstemperatuurregulatie. Dit is vooral zichtbaar in de achterpoten na inspanning of tijdens het staan.
              </p>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Lichte trillingen bij oudere honden zijn vaak normaal, maar verergering of nieuwe symptomen verdienen aandacht. Overleg met je dierenarts over pijnbestrijding, supplementen (zoals glucosamine), en aanpassingen in het dagelijks leven.
              </p>

              <BetweenContentAd />

              <h2 id="wanneer-naar-dierenarts" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                Wanneer moet je naar de dierenarts?
              </h2>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Ga direct naar de dierenarts als het trillen gepaard gaat met:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li>Braken, diarree, of andere tekenen van ziekte</li>
                <li>Lethargie of extreme zwakte</li>
                <li>Weigerachtigheid om te eten of drinken</li>
                <li>Aanvallen of stuipen</li>
                <li>Moeite met lopen of opstaan</li>
                <li>Veranderingen in gedrag of bewustzijn</li>
                <li>Blauw of bleek tandvlees</li>
                <li>Het trillen houdt langer dan 30 minuten aan zonder duidelijke oorzaak</li>
              </ul>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Plan ook een controle in als het trillen regelmatig terugkomt zonder duidelijke reden, of als je hond oud is en nieuw trilgedrag vertoont.
              </p>

              <h2 id="conclusie" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                Conclusie: ken je hond en vertrouw je gevoel
              </h2>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                In de meeste gevallen is trillen bij honden onschuldig - het resultaat van kou, opwinding, of lichte angst. Maar het is belangrijk om je hond goed te observeren en andere symptomen in de gaten te houden.
              </p>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Vertrouw op je intuïtie als baasje. Niemand kent je hond beter dan jij. Als iets niet klopt of als je je zorgen maakt, schroom dan niet om contact op te nemen met je dierenarts. Het is altijd beter om te voorzichtig te zijn dan te laat.
              </p>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Door je hond goed te observeren, zijn normale gedrag te kennen, en alert te blijven op veranderingen, zorg je ervoor dat je snel kunt handelen wanneer dat nodig is.
              </p>
            </div>

            {/* FAQ Section */}
            <div className="bg-card dark:bg-cpSurface/30 rounded-3xl p-6 md:p-10 border border-border dark:border-cpAmber/10 mt-8">
              <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">Veelgestelde vragen</h2>

              <details className="mb-4 pb-4 border-b border-border dark:border-cpAmber/10">
                <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer hover:text-cpCoral transition-colors">
                  Is het normaal dat mijn hond trilt tijdens het slapen?
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/80">
                  Ja, dat is volkomen normaal! Honden dromen net als mensen en kunnen tijdens de REM-slaapfase zachtjes trillen, bewegen, of zelfs kleine geluiden maken. Dit is een teken van gezonde hersenactiviteit. Alleen als het trillen extreem is of je hond moeilijk wakker te krijgen is, zou je je zorgen moeten maken.
                </p>
              </details>

              <details className="mb-4 pb-4 border-b border-border dark:border-cpAmber/10">
                <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer hover:text-cpCoral transition-colors">
                  Mijn hond trilt alleen in zijn achterpoten, wat betekent dat?
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/80">
                  Trillen in alleen de achterpoten komt vaak voor bij oudere honden en kan wijzen op spierzwakte, artritis, of neurologische problemen. Bij jonge honden kan het ook simpelweg vermoeidheid zijn na intensief spelen. Als het regelmatig voorkomt, laat het dan checken door een dierenarts om artritis of andere aandoeningen uit te sluiten.
                </p>
              </details>

              <details className="mb-4 pb-4 border-b border-border dark:border-cpAmber/10">
                <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer hover:text-cpCoral transition-colors">
                  Kan stress bij honden chronisch trillen veroorzaken?
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/80">
                  Ja, langdurige stress kan leiden tot chronisch trillen. Als je hond vaak in stressvolle situaties zit (bijvoorbeeld in een onrustig huishouden of met angstproblemen), kan het trillen structureel worden. Werk samen met een gedragstherapeut om de bron van stress aan te pakken en overweeg calming supplementen na overleg met je dierenarts.
                </p>
              </details>

              <details className="mb-4 pb-4 border-b border-border dark:border-cpAmber/10">
                <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer hover:text-cpCoral transition-colors">
                  Welke hondenrassen zijn gevoeliger voor trillen?
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/80">
                  Kleine rassen zoals Chihuahua's, Yorkshire Terriers, Italiaanse Windhonden, en Miniatuur Pinschers trillen vaker omdat ze sneller afkoelen en een hoger metabolisme hebben. Ook honden met kort haar of weinig lichaamsvet (Greyhounds, Whippets) zijn gevoeliger. White Dog Shaker Syndrome komt vooral voor bij kleine witte rassen zoals Maltezers en West Highland White Terriers.
                </p>
              </details>

              <details className="mb-4">
                <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer hover:text-cpCoral transition-colors">
                  Kan ik mijn hond iets geven om het trillen te stoppen?
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/80">
                  Geef nooit zomaar medicatie zonder overleg met een dierenarts. Als het trillen door kou komt, helpt opwarmen. Bij angst kunnen natural calming supplementen (zoals CBD olie of L-theanine) helpen, maar ook deze alleen na overleg met je dierenarts. Voor medische oorzaken moet de onderliggende aandoening behandeld worden - een dierenarts kan dan passende medicatie voorschrijven.
                </p>
              </details>
            </div>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Tag className="w-4 h-4 text-muted-foreground dark:text-cpCream/60" />
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                hond trilt
              </span>
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                trillen hond
              </span>
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                hond bibbert
              </span>
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                dierengezondheid
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
              href="/nl/gids/dierengezondheid/vaccinaties"
              className="group bg-card dark:bg-cpSurface/50 rounded-2xl overflow-hidden border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-md transition-all"
            >
              <div className="p-6">
                <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors mb-2">
                  Vaccinatieschema voor honden
                </h3>
                <span className="inline-flex items-center gap-1 text-cpCoral text-sm font-medium">
                  Lees meer
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>

            <Link
              href="/nl/gids/dierengezondheid/dierenarts-kiezen"
              className="group bg-card dark:bg-cpSurface/50 rounded-2xl overflow-hidden border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-md transition-all"
            >
              <div className="p-6">
                <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors mb-2">
                  Een goede dierenarts kiezen
                </h3>
                <span className="inline-flex items-center gap-1 text-cpCoral text-sm font-medium">
                  Lees meer
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>

            <Link
              href="/nl/gids/huisdiergedrag/hondengedrag-begrijpen"
              className="group bg-card dark:bg-cpSurface/50 rounded-2xl overflow-hidden border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-md transition-all"
            >
              <div className="p-6">
                <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors mb-2">
                  Begrijp het gedrag van je hond
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
