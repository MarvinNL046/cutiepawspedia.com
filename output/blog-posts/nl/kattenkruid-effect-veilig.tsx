import Image from "next/image";
import Link from "next/link";
import { PhotoCredit } from "@/components/blog/PhotoCredit";
import { BetweenContentAd } from "@/components/ads/AdSlot";
import { BlogSidebarAd } from "@/components/ads/BlogSidebarAd";
import { Calendar, Clock, Tag } from "lucide-react";

export const metadata = {
  title: "Kattenkruid: wat doet het en is het veilig? | CutiePawsPedia",
  description: "Alles over kattenkruid (catnip): hoe het werkt, waarom katten er gek op zijn, of het veilig is en hoe je het kunt gebruiken voor speelplezier en ontspanning.",
  keywords: ["kattenkruid", "catnip", "valeriaan kat", "kattenplanten", "kattenspeelgoed"],
  openGraph: {
    title: "Kattenkruid: wat doet het en is het veilig?",
    description: "Ontdek waarom katten dol zijn op kattenkruid, hoe het werkt en of het veilig is voor jouw kat.",
    type: "article",
    publishedTime: "2025-12-11T10:00:00Z",
    authors: ["CutiePawsPedia Team"],
  },
};

export default function KattenkruidArticle() {
  return (
    <article className="min-h-screen bg-cpCream dark:bg-cpCharcoal">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full">
        <Image
          src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2000"
          alt="Gelukkige kat met kattenkruid"
          fill
          className="object-cover"
          priority
        />
        <PhotoCredit
          photographerName="Jez Timms"
          photographerUrl="https://unsplash.com/@jeztimms"
          source="unsplash"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cpCharcoal/80 via-cpCharcoal/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto max-w-4xl">
            <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-cpCharcoal dark:text-cpCream bg-cpCoral rounded-full">
              Kattenverzorging
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-cpCream mb-4">
              Kattenkruid: wat doet het en is het veilig?
            </h1>
            <div className="flex flex-wrap gap-4 text-cpCream/80 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                11 december 2025
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                8 min leestijd
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-cpCharcoal dark:prose-headings:text-cpCream prose-p:text-cpCharcoal/80 dark:prose-p:text-cpCream/80 prose-a:text-cpCoral hover:prose-a:text-cpAmber">

              <p className="text-xl leading-relaxed">
                Heb je ooit gezien hoe jouw kat volkomen euforisch wordt van een plantje of speeltje met kattenkruid? Die gekke reacties – van rollen over de grond tot spinnend van geluk – zijn fascinerend om te zien. Maar wat is kattenkruid precies, hoe werkt het en is het eigenlijk wel veilig voor je kat?
              </p>

              <p>
                In deze complete gids duiken we in de wetenschap achter kattenkruid, ontdek je waarom sommige katten er gek op zijn (en andere niet), en leer je hoe je het veilig kunt gebruiken om je kat te entertainen en te ontspannen.
              </p>

              <h2>Wat is kattenkruid precies?</h2>

              <p>
                Kattenkruid, ook wel bekend als <strong>catnip</strong> of in het Latijn <em>Nepeta cataria</em>, is een kruidachtige plant uit de lipbloemenfamilie. Het groeit van nature in Europa en Azië, maar wordt tegenwoordig wereldwijd gekweekt vanwege zijn bijzondere effect op katten.
              </p>

              <p>
                De plant bevat een chemische stof genaamd <strong>nepetalacton</strong> die verantwoordelijk is voor de intense reactie die veel katten vertonen. Deze olie zit vooral in de bladeren, stengels en zaaddozen van de plant.
              </p>

              <div className="bg-cpCoral/10 dark:bg-cpCoral/20 border-l-4 border-cpCoral rounded-r-lg p-6 my-8">
                <h3 className="text-lg font-semibold text-cpCharcoal dark:text-cpCream mt-0 mb-2">
                  💡 Goed om te weten
                </h3>
                <p className="mb-0">
                  Ongeveer 70-80% van de katten reageert op kattenkruid. De gevoeligheid is genetisch bepaald, dus ongeveer 1 op de 3 katten heeft er helemaal niets mee. Dit is volkomen normaal!
                </p>
              </div>

              <BetweenContentAd sponsorAd={null} />

              <h2>Hoe werkt kattenkruid in de kattenbrein?</h2>

              <p>
                Wanneer een kat aan kattenkruid ruikt, bindt de nepetalacton zich aan receptoren in de neus. Deze receptoren stimuleren neuronen die signalen sturen naar verschillende delen van de hersenen, waaronder:
              </p>

              <ul>
                <li><strong>De olfactorische bulbus</strong> (reukcentrum) – verwerkt de geur</li>
                <li><strong>De amygdala</strong> (emotiecentrum) – reguleert emotionele reacties</li>
                <li><strong>De hypothalamus</strong> – beïnvloedt gedragsreacties</li>
              </ul>

              <p>
                Het resultaat? Een cascade van gedragingen die lijken op een kat in bronst of op jacht. Interessant genoeg imiteert nepetalacton de structuur van bepaalde feromonen, wat de intense reactie verklaart.
              </p>

              <h3>Typische reacties op kattenkruid</h3>

              <p>
                Katten die gevoelig zijn voor kattenkruid kunnen de volgende gedragingen vertonen:
              </p>

              <ol>
                <li><strong>Ruiken en snuffelen</strong> – eerst voorzichtig de geur opnemen</li>
                <li><strong>Kwijlen</strong> – overmatige speekselproductie door opwinding</li>
                <li><strong>Kopjes geven</strong> – met het hoofd tegen voorwerpen wrijven</li>
                <li><strong>Rollen en kronkelen</strong> – over de grond rollen terwijl ze spinnen</li>
                <li><strong>Hyperactiviteit</strong> – rennen, springen en wild spelen</li>
                <li><strong>Vocaliseren</strong> – miauwen of janken</li>
                <li><strong>Kneden</strong> – met pootjes "broodjes bakken"</li>
              </ol>

              <p>
                Deze reactie duurt meestal 5-15 minuten, waarna de kat tijdelijk ongevoelig wordt voor het kruid (ongeveer 30 minuten tot 2 uur). Dit is een natuurlijk beschermingsmechanisme.
              </p>

              <BetweenContentAd sponsorAd={null} />

              <h2>Is kattenkruid veilig voor katten?</h2>

              <p>
                Het korte antwoord: <strong>ja, kattenkruid is volledig veilig voor katten</strong> – zowel voor volwassen katten als oudere katten. Het is niet verslavend, niet giftig en veroorzaakt geen kater of bijwerkingen.
              </p>

              <h3>Wat als mijn kat te veel kattenkruid eet?</h3>

              <p>
                Hoewel kattenkruid veilig is, kan overmatige consumptie (eten in plaats van ruiken) leiden tot milde maagklachten:
              </p>

              <ul>
                <li>Misselijkheid of braken</li>
                <li>Lichte diarree</li>
                <li>Verminderde eetlust (tijdelijk)</li>
              </ul>

              <p>
                Deze symptomen zijn mild en verdwijnen vanzelf binnen enkele uren. De meeste katten zullen zichzelf reguleren en stoppen voordat ze te veel eten.
              </p>

              <div className="bg-cpAmber/10 dark:bg-cpAmber/20 border-l-4 border-cpAmber rounded-r-lg p-6 my-8">
                <h3 className="text-lg font-semibold text-cpCharcoal dark:text-cpCream mt-0 mb-2">
                  ⚠️ Let op bij kittens
                </h3>
                <p className="mb-0">
                  Kittens jonger dan 6 maanden reageren meestal niet op kattenkruid omdat hun geurreceptoren nog niet volledig ontwikkeld zijn. Het is niet gevaarlijk voor ze, maar gewoon zinloos om te gebruiken.
                </p>
              </div>

              <h2>Verschillende soorten kattenkruid producten</h2>

              <p>
                Kattenkruid is in verschillende vormen verkrijgbaar, elk met zijn eigen voordelen:
              </p>

              <h3>1. Gedroogd kattenkruid</h3>
              <p>
                De meest populaire vorm. Gedroogde bladeren kunnen gestrooid worden op krabtonen, speeltjes of speelmatjes. Bewaar het in een luchtdichte verpakking om de potentie te behouden.
              </p>

              <h3>2. Verse kattenkruid planten</h3>
              <p>
                Je kunt kattenkruid zelf kweken in een pot. Verse bladeren zijn vaak het meest potent. Katten kunnen eraan ruiken of kleine stukjes eten als gezonde snack.
              </p>

              <h3>3. Kattenkruid spray</h3>
              <p>
                Handige spray voor het besproeien van speeltjes, krabtonen of nieuwe plekken waar je wilt dat je kat naartoe gaat. Ideaal om oude speeltjes weer interessant te maken.
              </p>

              <h3>4. Gevulde speeltjes</h3>
              <p>
                Van muisjes tot visjes – speeltjes gevuld met kattenkruid zijn enorm populair en stimuleren natuurlijk jachtgedrag.
              </p>

              <BetweenContentAd sponsorAd={null} />

              <h2>Slimme manieren om kattenkruid te gebruiken</h2>

              <p>
                Kattenkruid is meer dan alleen entertainment. Hier zijn praktische toepassingen:
              </p>

              <h3>✅ Stressvermindering</h3>
              <p>
                Geef kattenkruid voor stressvolle situaties zoals een verhuizing, dierenarts bezoek of de komst van nieuwe huisgenoten. De euforische reactie gevolgd door ontspanning kan helpen angst te verminderen.
              </p>

              <h3>✅ Training en positieve versterking</h3>
              <p>
                Gebruik kattenkruid als beloning bij het <Link href="/nl/gids/huisdiertraining/kattentraining-basis">trainen van je kat</Link>. Bijvoorbeeld om de krabpaal aantrekkelijk te maken in plaats van de bank.
              </p>

              <h3>✅ Stimuleren van beweging</h3>
              <p>
                Voor binnenkatten of luie katten kan kattenkruid beweging en spel stimuleren. Stop het in interactief speelgoed voor extra motivatie.
              </p>

              <h3>✅ Nieuwe omgevingen vertrouwd maken</h3>
              <p>
                Besprenkle een nieuwe reismand, kattenbak of slaapmand met kattenkruid om het sneller vertrouwd te maken.
              </p>

              <div className="bg-cpCoral/10 dark:bg-cpCoral/20 border-l-4 border-cpCoral rounded-r-lg p-6 my-8">
                <h3 className="text-lg font-semibold text-cpCharcoal dark:text-cpCream mt-0 mb-2">
                  💡 Pro tip: gebruik met mate
                </h3>
                <p className="mb-0">
                  Bied kattenkruid niet dagelijks aan. 1-2 keer per week is ideaal om het speciaal te houden en "kattenkruid-moeheid" te voorkomen waarbij je kat er minder op reageert.
                </p>
              </div>

              <h2>Kattenkruid alternatieven: valeriaan en tatarian honeysuckle</h2>

              <p>
                Als jouw kat niet reageert op kattenkruid (of je wilt variatie), zijn er alternatieven:
              </p>

              <h3>Valeriaan (Valeriana officinalis)</h3>
              <p>
                Valeriaan heeft een vergelijkbaar effect op katten en werkt vaak bij katten die ongevoelig zijn voor catnip. Let op: de geur is voor mensen vrij onaangenaam (denk aan oude sokken), maar katten zijn er dol op!
              </p>

              <h3>Tatarian honeysuckle (Lonicera tatarica)</h3>
              <p>
                Dit hout van de Tataarse kamperfoelie bevat actinidine, een stof die vergelijkbare reacties oproept. Verkrijgbaar als stokjes die katten kunnen kauwen en bekrassen.
              </p>

              <h3>Matatabi (zilverstruik)</h3>
              <p>
                Een Aziatisch plantje dat in Japan populair is. Verkrijgbaar als stokjes of poeder. Studies tonen aan dat meer katten reageren op matatabi dan op catnip.
              </p>

              <h2>Veelgestelde vragen over kattenkruid</h2>

              <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 mb-4">
                <summary className="font-semibold text-cpCharcoal dark:text-cpCream cursor-pointer">
                  Kan mijn kat verslaafd raken aan kattenkruid?
                </summary>
                <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80">
                  Nee, kattenkruid is niet verslavend. Katten ontwikkelen geen fysieke of psychologische afhankelijkheid. De tijdelijke ongevoeligheid na blootstelling voorkomt juist overmatig gebruik.
                </p>
              </details>

              <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 mb-4">
                <summary className="font-semibold text-cpCharcoal dark:text-cpCream cursor-pointer">
                  Waarom reageert mijn kat niet op kattenkruid?
                </summary>
                <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80">
                  Ongeveer 30% van de katten mist het gen dat gevoeligheid voor nepetalacton veroorzaakt. Dit is erfelijk en volkomen normaal. Probeer alternatieven zoals valeriaan of matatabi.
                </p>
              </details>

              <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 mb-4">
                <summary className="font-semibold text-cpCharcoal dark:text-cpCream cursor-pointer">
                  Kunnen honden ook kattenkruid hebben?
                </summary>
                <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80">
                  Kattenkruid is veilig voor honden, maar ze reageren er zelden op zoals katten doen. Voor honden heeft het eerder een mild kalmerend effect. Het is niet schadelijk, maar ook niet bijzonder nuttig.
                </p>
              </details>

              <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 mb-4">
                <summary className="font-semibold text-cpCharcoal dark:text-cpCream cursor-pointer">
                  Hoe bewaar ik kattenkruid zodat het potent blijft?
                </summary>
                <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80">
                  Bewaar gedroogd kattenkruid in een luchtdichte container op een koele, donkere plek. Voor langdurige opslag kan het zelfs in de vriezer (behoudt potentie tot 2 jaar). Licht en lucht breken de essentiële oliën af.
                </p>
              </details>

              <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 mb-4">
                <summary className="font-semibold text-cpCharcoal dark:text-cpCream cursor-pointer">
                  Kan ik kattenkruid combineren met medicatie?
                </summary>
                <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80">
                  Over het algemeen is kattenkruid veilig te combineren met de meeste medicijnen. Bij twijfel of bij katten met gezondheidsklachten, raadpleeg eerst je dierenarts – vooral bij kalmerende medicatie of antidepressiva.
                </p>
              </details>

              <h2>Conclusie: kattenkruid is een veilig en leuk verrijkingsmiddel</h2>

              <p>
                Kattenkruid is een geweldige, natuurlijke manier om je kat te vermaken, te stimuleren en te ontspannen. Het is volledig veilig, niet verslavend en kan nuttig zijn voor training, stressvermindering en beweging.
              </p>

              <p>
                Of je nu verse planten kweekt, gedroogde bladeren strooit of speeltjes gevuld met catnip koopt – je kat zal je dankbaar zijn voor deze leuke verrijking. En zelfs als je kat er niet op reageert, zijn er leuke alternatieven zoals valeriaan en matatabi.
              </p>

              <p>
                Veel plezier met het verwennen van je kat met dit magische kruidje! 🌿😸
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-cpCharcoal/10 dark:border-cpCream/10">
                <Tag className="w-4 h-4 text-cpCharcoal/60 dark:text-cpCream/60" />
                <span className="text-sm text-cpCharcoal/60 dark:text-cpCream/60">Tags:</span>
                <Link href="/nl/gids/kattenverzorging" className="text-sm px-3 py-1 bg-cpCoral/10 hover:bg-cpCoral/20 dark:bg-cpCoral/20 dark:hover:bg-cpCoral/30 text-cpCharcoal dark:text-cpCream rounded-full transition-colors">
                  Kattenverzorging
                </Link>
                <Link href="/nl/gids/dierengezondheid" className="text-sm px-3 py-1 bg-cpCoral/10 hover:bg-cpCoral/20 dark:bg-cpCoral/20 dark:hover:bg-cpCoral/30 text-cpCharcoal dark:text-cpCream rounded-full transition-colors">
                  Dierengezondheid
                </Link>
                <span className="text-sm px-3 py-1 bg-cpCoral/10 text-cpCharcoal dark:bg-cpCoral/20 dark:text-cpCream rounded-full">
                  Kattengedrag
                </span>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-12 pt-8 border-t border-cpCharcoal/10 dark:border-cpCream/10">
              <h3 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mb-6">
                Gerelateerde artikelen
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link
                  href="/nl/gids/huisdiergedrag/kattengedrag-begrijpen"
                  className="block p-6 bg-cpSurface dark:bg-cpCharcoal/50 rounded-xl hover:shadow-lg transition-all border border-cpCharcoal/5 dark:border-cpCream/5 hover:border-cpCoral/20"
                >
                  <h4 className="font-semibold text-cpCharcoal dark:text-cpCream mb-2">
                    Kattengedrag begrijpen: lichaamstaal en communicatie
                  </h4>
                  <p className="text-sm text-cpCharcoal/70 dark:text-cpCream/70">
                    Leer de subtiele signalen van je kat te herkennen en beter communiceren met je viervoeter.
                  </p>
                </Link>

                <Link
                  href="/nl/gids/kattenverzorging/binnen-kat-verrijking"
                  className="block p-6 bg-cpSurface dark:bg-cpCharcoal/50 rounded-xl hover:shadow-lg transition-all border border-cpCharcoal/5 dark:border-cpCream/5 hover:border-cpCoral/20"
                >
                  <h4 className="font-semibold text-cpCharcoal dark:text-cpCream mb-2">
                    Binnenkat verrijking: 15 manieren om je kat te vermaken
                  </h4>
                  <p className="text-sm text-cpCharcoal/70 dark:text-cpCream/70">
                    Voorkom verveling bij binnenkatten met deze leuke en stimulerende activiteiten.
                  </p>
                </Link>

                <Link
                  href="/nl/gids/kattenverzorging/stress-bij-katten"
                  className="block p-6 bg-cpSurface dark:bg-cpCharcoal/50 rounded-xl hover:shadow-lg transition-all border border-cpCharcoal/5 dark:border-cpCream/5 hover:border-cpCoral/20"
                >
                  <h4 className="font-semibold text-cpCharcoal dark:text-cpCream mb-2">
                    Stress bij katten herkennen en verminderen
                  </h4>
                  <p className="text-sm text-cpCharcoal/70 dark:text-cpCream/70">
                    Ontdek de signalen van stress bij katten en effectieve oplossingen om je kat te kalmeren.
                  </p>
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <BlogSidebarAd sponsorAd={null} />

              {/* Quick Navigation */}
              <div className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-xl p-6 border border-cpCharcoal/5 dark:border-cpCream/5">
                <h3 className="font-semibold text-cpCharcoal dark:text-cpCream mb-4">
                  In dit artikel
                </h3>
                <nav className="space-y-2 text-sm">
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Wat is kattenkruid?
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Hoe werkt het?
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Is het veilig?
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Verschillende producten
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Slimme toepassingen
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Alternatieven
                  </a>
                </nav>
              </div>

              {/* Popular Categories */}
              <div className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-xl p-6 border border-cpCharcoal/5 dark:border-cpCream/5">
                <h3 className="font-semibold text-cpCharcoal dark:text-cpCream mb-4">
                  Populaire categorieën
                </h3>
                <div className="space-y-2">
                  <Link href="/nl/gids/kattenverzorging" className="block text-cpCoral hover:text-cpAmber transition-colors text-sm">
                    → Kattenverzorging
                  </Link>
                  <Link href="/nl/gids/dierengezondheid" className="block text-cpCoral hover:text-cpAmber transition-colors text-sm">
                    → Dierengezondheid
                  </Link>
                  <Link href="/nl/gids/huisdiergedrag" className="block text-cpCoral hover:text-cpAmber transition-colors text-sm">
                    → Huisdiergedrag
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Kattenkruid: wat doet het en is het veilig?",
            "description": "Alles over kattenkruid (catnip): hoe het werkt, waarom katten er gek op zijn, of het veilig is en hoe je het kunt gebruiken voor speelplezier en ontspanning.",
            "image": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2000",
            "datePublished": "2025-12-11T10:00:00Z",
            "dateModified": "2025-12-11T10:00:00Z",
            "author": {
              "@type": "Organization",
              "name": "CutiePawsPedia"
            },
            "publisher": {
              "@type": "Organization",
              "name": "CutiePawsPedia",
              "logo": {
                "@type": "ImageObject",
                "url": "https://cutiepawspedia.nl/logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://cutiepawspedia.nl/nl/blog/kattenkruid-effect-veilig"
            },
            "keywords": "kattenkruid, catnip, valeriaan kat, kattenplanten, kattenspeelgoed",
            "articleSection": "Kattenverzorging",
            "wordCount": 1850
          })
        }}
      />
    </article>
  );
}
