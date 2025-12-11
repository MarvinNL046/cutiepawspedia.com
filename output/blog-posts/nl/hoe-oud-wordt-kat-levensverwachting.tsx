import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Tag, Stethoscope, Search, Heart } from "lucide-react";
import { BetweenContentAd, BlogSidebarAd } from "@/components/ads";
import { PhotoCredit, TableOfContents } from "@/components/blog";
import { EditorialByline } from "@/components/seo";

const post = {
  title: "Hoe oud wordt een kat? Levensverwachting per ras",
  content: `
Hoelang leeft een kat eigenlijk? Deze vraag houdt veel katteneigenaren bezig. De gemiddelde levensverwachting van een kat ligt tussen de 12 en 18 jaar, maar sommige katten worden wel 20 jaar of ouder. De levensduur hangt af van verschillende factoren: ras, leefomgeving, voeding, en gezondheidszorg. In deze uitgebreide gids ontdek je alles over de levensverwachting van katten.

## Gemiddelde levensverwachting van katten

De levensverwachting van katten is de afgelopen decennia aanzienlijk toegenomen dankzij betere veterinaire zorg, voeding, en bewustzijn bij eigenaren.

**Binnenkatten**: 12-18 jaar (soms tot 20+ jaar)
**Buitenkatten**: 7-10 jaar (significant korter door risico's)
**Raskatten**: Variabel per ras (zie verderop in dit artikel)
**Huiskatten (mix)**: 15-17 jaar gemiddeld

Het verschil tussen binnen- en buitenkatten is opvallend. Buitenkatten lopen meer risico op ongelukken, ziektes, gevechten met andere dieren, en blootstelling aan parasieten. Binnenkatten leven in een gecontroleerde, veilige omgeving en ontvangen meestal betere preventieve zorg.

## Factoren die de levensverwachting beïnvloeden

### 1. Genetica en ras

Sommige kattenrassen hebben genetisch een langere of kortere levensverwachting. Raskatten hebben soms erfelijke aandoeningen die hun levensduur kunnen verkorten, terwijl kruislingen vaak profiteren van 'hybride vitaliteit' - ze erven een diverser genetisch materiaal dat ze resistenter maakt tegen bepaalde ziektes.

### 2. Voeding en gewicht

Obesitas is een groeiend probleem bij katten en verkort de levensduur aanzienlijk. Overgewicht verhoogt het risico op diabetes, hartproblemen, gewrichtsproblemen en bepaalde kankers. Een kat met een gezond gewicht leeft gemiddeld 2-3 jaar langer dan een zwaarlijvige kat.

Kwalitatief hoogwaardig kattenvoer met de juiste balans van eiwitten, vetten en voedingsstoffen is essentieel. Katten zijn obligate carnivoren - ze hebben dierlijk eiwit nodig om te floreren.

### 3. Medische zorg

Preventieve gezondheidszorg heeft enorme impact op de levensduur:

- **Jaarlijkse controles**: Vroege detectie van ziektes verhoogt behandelsucces
- **Vaccinaties**: Beschermen tegen levensbedreigende ziektes
- **Parasitencontrole**: Wormen en vlooien kunnen ernstige gezondheidsproblemen veroorzaken
- **Tandverzorging**: Tandproblemen leiden tot systemische infecties
- **Sterilisatie/castratie**: Verhoogt levensverwachting met 1-2 jaar en voorkomt bepaalde kankers

### 4. Leefomgeving

**Binnenkatten** zijn beschermd tegen:
- Verkeersongelukken (grootste risico voor buitenkatten)
- Aanvallen door andere dieren (honden, wilde dieren)
- Infectieziektes van andere katten
- Vergiftiging door bestrijdingsmiddelen of giftige planten
- Verdwalen of gestolen worden

**Buitenkatten** hebben wel voordelen zoals meer beweging en mentale stimulatie, maar de risico's wegen meestal zwaarder dan de voordelen.

### 5. Mentale en fysieke stimulatie

Katten die mentaal en fysiek gestimuleerd worden, leven vaak langer en gezonder. Verveling kan leiden tot stress, depressie en gedragsproblemen. Zorg voor:

- Interactief speelgoed
- Klim- en krabmogelijkheden
- Verstopplekjes en observatiepunten
- Dagelijkse speelsessies
- Rotatie van speelgoed voor blijvende interesse

## Levensverwachting per kattenras

Hier is een overzicht van de gemiddelde levensverwachting van populaire kattenrassen:

### Raskatten met lange levensduur

**Siamees**: 15-20 jaar
Deze elegante, spraakzame katten behoren tot de langstlevende rassen. Ze zijn relatief gezond maar kunnen gevoelig zijn voor ademhalingsproblemen en tandproblemen.

**Ragdoll**: 15-18 jaar
Deze grote, zachte katten met blauwe ogen zijn over het algemeen gezond. Let wel op hypertrofische cardiomyopathie (HCM), een hartkwaal die bij dit ras voorkomt.

**Birmaan**: 14-18 jaar
Birmaanse katten zijn robuust en hebben weinig ras-specifieke gezondheidsproblemen. Ze zijn sociale katten die goed gedijen met regelmatige interactie.

**Russisch Blauw**: 15-20 jaar
Dit ras staat bekend om zijn lange levensduur en goede gezondheid. Ze zijn over het algemeen niet kieskeurig met voeding en hebben weinig erfelijke problemen.

**Maine Coon**: 12-15 jaar
Ondanks hun imposante grootte (tot 10 kg), leven Maine Coons behoorlijk lang. Let op HCM en heupverwrichtingen, die bij dit ras voorkomen.

### Raskatten met gemiddelde levensduur

**Britse Korthaar**: 12-17 jaar
Deze robuuste, relaxte katten zijn over het algemeen gezond maar kunnen gevoelig zijn voor obesitas. Gewichtsbeheer is cruciaal.

**Perzische kat**: 12-16 jaar
Perzen vereisen intensieve verzorging vanwege hun lange vacht. Ze zijn gevoelig voor ademhalingsproblemen door hun platte gezicht, nieraandoeningen en oogproblemen.

**Bengaal**: 12-16 jaar
Deze energieke, exotisch ogende katten zijn meestal gezond maar kunnen gevoelig zijn voor spijsverteringsproblemen en HCM.

**Abessijn**: 12-15 jaar
Intelligente, actieve katten die gevoelig kunnen zijn voor nierproblemen en progressieve retina atrofie (oogziekte).

**Noorse Boskat**: 14-16 jaar
Gezonde, robuuste katten met dichte vacht. Let op HCM en heupverwrichtingen.

### Raskatten met kortere levensduur

**Manx**: 8-14 jaar
Deze staartloze katten kunnen gezondheidsproblemen hebben gerelateerd aan het gen dat hun korte staart veroorzaakt, waaronder ruggenmergproblemen.

**Scottish Fold**: 11-14 jaar
Hun karakteristieke gevouwen oren zijn het gevolg van een genetische afwijking die ook gewrichtsproblemen (osteochondrodysplasie) kan veroorzaken.

**Sphynx**: 8-14 jaar
Haarloos en daardoor gevoelig voor huid problemen, kou en zonverbranding. Vereist speciale zorg maar kan bij goede verzorging wel ouder worden.

## Hoe oud is mijn kat in mensenjaren?

De oude "1 kattenjaar = 7 mensenjaren" regel klopt niet. Katten ontwikkelen sneller in het begin en vertragen dan. Hier is een nauwkeuriger overzicht:

- **1 jaar**: 15 mensenjaren (adolescentie)
- **2 jaar**: 24 mensenjaren (jong volwassen)
- **3 jaar**: 28 mensenjaren
- **4 jaar**: 32 mensenjaren
- **5-10 jaar**: +4 mensenjaren per kattenjaar (volwassen)
- **11-15 jaar**: +3 mensenjaren per kattenjaar (senior)
- **16+ jaar**: Hoogbejaard, elk jaar is een prestatie

Een 10-jarige kat is dus ongeveer 56 in mensenjaren, terwijl een 15-jarige kat ongeveer 76 is. Dit helpt om hun gezondheidsbehoeften in perspectief te plaatsen.

## Hoe help je je kat een lang leven te leiden?

### Optimale voeding

- **Kwalitatief vlees-gebaseerd voer**: Hoog eiwitgehalte, laag koolhydraten
- **Portiecontrole**: Voorkom obesitas door aanbevolen porties te volgen
- **Vers water**: Meerdere waterbakken stimuleren drinken (belangrijk voor nieren)
- **Overweeg natvoer**: Helpt bij hydratatie en voorkomt urinewegproblemen
- **Leeftijdsspecifiek voer**: Kitten-, adult- en seniorenvoer hebben verschillende samenstellingen

### Preventieve gezondheidszorg

- **Jaarlijkse controles**: Vanaf 7 jaar twee keer per jaar
- **Vaccinaties up-to-date houden**: Bescherm tegen kattengriep, niesziekte, en meer
- **Tandhygiëne**: Regelmatig poetsen of speciale tandverzorgingsproducten
- **Parasieten preventie**: Maandelijkse behandeling tegen wormen en vlooien
- **Vroege detectie**: Let op veranderingen in gedrag, eetlust, of energieniveau

### Veilige leefomgeving

- **Binnen houden**: Of veilig buiten onder toezicht
- **Ramen en balkons beveiligen**: Val van hoogte is levensgevaarlijk
- **Giftige planten verwijderen**: Lelies, ficus, aloë vera zijn dodelijk voor katten
- **Kleine voorwerpen opruimen**: Katten kunnen inslikken
- **Gebalanceerde temperatuur**: Katten kunnen oververhitten of onderkoeld raken

### Mentale en fysieke activiteit

- **Dagelijks spelen**: Minstens 15-20 minuten actief spel
- **Verticale ruimte**: Krabpalen, katten bomen, planken aan de muur
- **Puzzel feeders**: Stimuleren natuurlijk jachtgedrag
- **Vensterplekken**: Katten kijken graag naar buiten
- **Rotatie van speelgoed**: Houdt interesse levend

### Stress reductie

- **Voorspelbare routine**: Katten zijn gewoontedieren
- **Eigen veilige plek**: Ergens waar ze zich kunnen terugtrekken
- **Geleidelijke veranderingen**: Nieuwe situaties langzaam introduceren
- **Feromoon diffusers**: Kunnen helpen bij stressvermindering
- **Meerdere katten**: Zorg voor voldoende bronnen (bakken, eten, water)

## Tekenen dat je kat ouder wordt

Vanaf ongeveer 7-10 jaar begint een kat senior te worden. Let op deze veranderingen:

**Fysieke veranderingen**:
- Grijs worden van vacht rond snuit en ogen
- Minder flexibiliteit en stijvere bewegingen
- Gewichtsverlies of toename
- Vacht wordt minder glanzend
- Nagels worden dikker en brozer

**Gedragsveranderingen**:
- Meer slapen (hoewel katten al 16 uur per dag slapen)
- Minder spelen en jagen
- Veranderingen in miauwpatronen
- Verwardheid of desoriëntatie
- Verandering in toilet gewoonten

**Gezondheidsproblemen bij oudere katten**:
- Nierziekte (zeer vaak bij oude katten)
- Hyperthyreoïdie (overactieve schildklier)
- Artritis en gewrichtspijn
- Diabetes
- Cognitieve achteruitgang (vergelijkbaar met dementie)
- Tandproblemen
- Kanker

## Wanneer naar de dierenarts?

Regelmatige controles zijn essentieel, maar ga ook naar de dierenarts bij:

🚨 **Acuut (spoed)**:
- Niet eten of drinken langer dan 24 uur
- Braken of diarree langer dan een dag
- Moeite met ademhalen
- Bloedverlies
- Plotselinge verlamming
- Stuiptrekkingen
- Extreme lethargie
- Niet kunnen plassen

⚠️ **Binnen een week**:
- Veranderingen in eet- of drinkgedrag
- Gewichtsverlies of toename
- Verandering in toilet gewoonten
- Hoesten of niezen die aanhoudt
- Krabben of likken dat niet stopt
- Gedragsveranderingen

## Record brekende katten

De oudste kat ooit geregistreerd was **Creme Puff** uit Texas, die 38 jaar en 3 dagen werd (1967-2005). Andere opmerkelijke oude katten:

- **Granpa Rex Allen**: 34 jaar (ook eigenaar van Creme Puff)
- **Baby**: 38 jaar (niet officieel geverifieerd)
- **Puss**: 36 jaar (UK, 1903-1939)

Deze uitzonderlijke gevallen tonen aan dat met optimale zorg, genetisch geluk en een beschermde omgeving, katten veel ouder kunnen worden dan de gemiddelde levensverwachting.

## Conclusie

De levensverwachting van je kat hangt af van veel factoren, maar met de juiste zorg kun je een enorme positieve impact maken. Binnenkatten met goede voeding, preventieve gezondheidszorg, mentale stimulatie en een veilige omgeving kunnen gemakkelijk 15-18 jaar worden, en soms zelfs 20+.

Begin met de basis: kwalitatief voer, jaarlijkse controles, vaccinaties, en veel liefde. Let op veranderingen naarmate je kat ouder wordt en pas de zorg aan. Een goede dierenarts is je partner in het verzorgen van je kat door alle levensfases heen.

Onthoud: elke extra dag met je kat is een geschenk. Door te investeren in preventieve zorg en een gezonde levensstijl, geef je je kat de beste kans op een lang, gelukkig leven.

## Veelgestelde vragen

### Worden binnenkatten echt ouder dan buitenkatten?

Ja, binnenkatten leven gemiddeld bijna dubbel zo lang als buitenkatten. Binnenkatten worden 12-18 jaar oud, terwijl buitenkatten gemiddeld 7-10 jaar leven. De belangrijkste risico's voor buitenkatten zijn verkeersongelukken (meest voorkomende doodsoorzaak), gevechten met andere dieren, infectieziektes, vergiftiging, en extreme weersomstandigheden. Een compromis is een beveiligde buitenruimte (catio) of begeleide buiten tijd.

### Vanaf welke leeftijd is een kat senior?

Katten worden over het algemeen als senior beschouwd vanaf 7-10 jaar oud. Vanaf 11 jaar zijn ze echt bejaard, en 15+ jaar is hoogbejaard. Dit is vergelijkbaar met een mens van 56 jaar (7 jaar), 60 jaar (10 jaar), en 76+ jaar (15+ jaar). Seniorenkatten hebben andere zorgbehoeften, zoals twee keer per jaar controles, aangepast voer, en mogelijk supplementen voor gewrichten.

### Welk kattenras wordt het oudst?

De Siamees en Russisch Blauw behoren tot de langstlevende rassen met een levensverwachting van 15-20 jaar. Ook Birmaanse katten, Ragdolls en Huiskatten (mixed breed) worden vaak oud. Gemengde raskatten hebben vaak het voordeel van genetische diversiteit, wat ze resistenter maakt tegen erfelijke ziektes. Het ras is echter maar één factor - voeding, zorg en omgeving zijn minstens zo belangrijk.

### Hoe merk ik dat mijn kat aan het einde van zijn leven is?

Tekenen dat een kat zijn laatste levensfase nadert zijn: extreem gewichtsverlies, weigeren van eten en drinken, isolatie en zich terugtrekken, moeite met lopen of opstaan, incontinentie, hijgen of moeite met ademhalen, koude poten, extreem suf of niet responsief. Bespreek quality of life met je dierenarts - pijn management en waardig afscheid zijn belangrijke overwegingen in deze moeilijke fase.

### Kan ik iets doen om de levensduur van mijn kat te verlengen?

Ja, absoluut. De belangrijkste factoren die je kunt beïnvloeden zijn: houd je kat binnen (of veilig buiten), zorg voor kwalitatief voer in de juiste hoeveelheid, jaarlijkse dierenarts controles, vaccinaties en parasieten preventie up-to-date, tandverzorging, genoeg beweging en mentale stimulatie, en stress reductie. Katten met optimale zorg leven gemiddeld 3-5 jaar langer dan katten zonder goede zorg.

### Moet ik het voer aanpassen naarmate mijn kat ouder wordt?

Ja, oudere katten hebben andere voedingsbehoeften. Seniorenkatten (7+ jaar) hebben vaak voer nodig met meer eiwitten van hoge kwaliteit maar minder calorieën om obesitas te voorkomen. Ze kunnen ook baat hebben bij supplementen voor gewrichten, extra vezels voor vertering, en gemakkelijk verteerbare ingrediënten. Katten met nierziekten (vaak bij oudere katten) hebben speciaal nierdieet nodig. Bespreek de beste voedingsoptie met je dierenarts.

## Lees ook

- [Complete gids: een goede dierenarts voor je kat vinden](/nl/gids/dierengezondheid/dierenarts-kat-kiezen)
- [Senior kat: 8 tekenen dat je kat ouder wordt](/nl/gids/senior-huisdieren/kat-ouder-worden-tekenen)
- [Beste kattenvoer 2025: top 10 merken vergeleken](/nl/gids/huisdiervoeding/beste-kattenvoer-vergelijking)
`,
  tags: ["levensverwachting kat", "hoe oud kat", "kat leeftijd", "kattenrassen", "oude kat"]
};

export const metadata: Metadata = {
  title: "Hoe Oud Wordt een Kat? Levensverwachting per Ras | CutiePawsPedia",
  description: "Hoe oud wordt een kat? Ontdek de levensverwachting per ras, factoren die invloed hebben, en hoe je je kat helpt een lang en gezond leven te leiden. Complete gids 2025.",
  keywords: "levensverwachting kat, hoe oud wordt kat, kat leeftijd, kattenrassen levensduur, binnenkat vs buitenkat, oude kat, kat jaren mensenjaren",
  openGraph: {
    title: "Hoe Oud Wordt een Kat? Levensverwachting per Ras",
    description: "Ontdek de levensverwachting per kattenras en hoe je je kat helpt een lang en gezond leven te leiden. Complete gids met tips.",
    type: "article",
    locale: "nl_NL",
    images: [{
      url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&h=630&fit=crop",
      width: 1200,
      height: 630,
      alt: "Gezonde oudere kat met glanzende vacht - levensverwachting en zorg voor katten"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hoe Oud Wordt een Kat? Levensverwachting per Ras",
    description: "Ontdek de levensverwachting per kattenras en hoe je je kat helpt lang en gezond te leven.",
  },
  alternates: {
    canonical: "https://cutiepawspedia.com/nl/blog/hoe-oud-wordt-kat-levensverwachting",
  },
};

export default function BlogPostPage() {
  return (
    <>
      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Hoe oud wordt een kat? Levensverwachting per ras",
            "description": "Ontdek de levensverwachting per kattenras, factoren die invloed hebben, en hoe je je kat helpt een lang en gezond leven te leiden.",
            "image": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&h=630&fit=crop",
            "author": {
              "@type": "Organization",
              "name": "CutiePawsPedia",
              "url": "https://cutiepawspedia.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "CutiePawsPedia",
              "logo": {
                "@type": "ImageObject",
                "url": "https://cutiepawspedia.com/logo.png"
              }
            },
            "datePublished": "2025-12-11",
            "dateModified": "2025-12-11",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://cutiepawspedia.com/nl/blog/hoe-oud-wordt-kat-levensverwachting"
            }
          })
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Worden binnenkatten echt ouder dan buitenkatten?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ja, binnenkatten leven gemiddeld bijna dubbel zo lang als buitenkatten. Binnenkatten worden 12-18 jaar oud, terwijl buitenkatten gemiddeld 7-10 jaar leven vanwege risico's zoals verkeersongelukken, gevechten, en ziektes."
                }
              },
              {
                "@type": "Question",
                "name": "Vanaf welke leeftijd is een kat senior?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Katten worden als senior beschouwd vanaf 7-10 jaar oud. Vanaf 11 jaar zijn ze bejaard, en 15+ jaar is hoogbejaard. Seniorenkatten hebben aangepaste zorgbehoeften zoals twee keer per jaar controles en aangepast voer."
                }
              },
              {
                "@type": "Question",
                "name": "Welk kattenras wordt het oudst?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "De Siamees en Russisch Blauw behoren tot de langstlevende rassen met een levensverwachting van 15-20 jaar. Ook Birmaanse katten, Ragdolls en Huiskatten worden vaak oud dankzij genetische diversiteit."
                }
              }
            ]
          })
        }}
      />

      <div className="bg-background dark:bg-cpCharcoal min-h-screen">
        <div className="container mx-auto max-w-6xl px-4 pt-8">
          <Link
            href="/nl/blog"
            className="inline-flex items-center gap-2 text-muted-foreground dark:text-cpCream/70 hover:text-cpCoral transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Terug naar blog
          </Link>
        </div>

        <header className="container mx-auto max-w-6xl px-4 py-8">
          <span className="inline-block px-3 py-1 bg-cpCoral/10 dark:bg-cpCoral/20 text-cpCoral text-sm font-medium rounded-full mb-4">
            Dierengezondheid
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground dark:text-cpCream/60 mb-4">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              11 december 2025
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              14 min leestijd
            </span>
          </div>
          <EditorialByline locale="nl" />
        </header>

        <div className="container mx-auto max-w-6xl px-4 mb-8">
          <div className="relative aspect-video rounded-3xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&h=630&fit=crop"
              alt="Gezonde oudere kat met glanzende vacht"
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

        <div className="container mx-auto max-w-6xl px-4 pb-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <article className="flex-1 min-w-0">
              <div className="bg-card dark:bg-cpSurface/30 rounded-3xl p-6 md:p-10 border border-border dark:border-cpAmber/10">

                <div className="prose prose-lg max-w-none dark:prose-invert">
                  {/* Content rendered from markdown */}
                </div>

                <div className="text-center my-8">
                  <Link
                    href="/nl/netherlands/c/veterinary"
                    className="inline-flex items-center gap-2 bg-cpCoral text-white rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all shadow-lg hover:shadow-xl"
                  >
                    <Stethoscope className="w-5 h-5" />
                    Vind een dierenarts bij jou in de buurt
                  </Link>
                </div>

                <BetweenContentAd testMode={true} />

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <section className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-3xl p-8 md:p-12 text-center shadow-xl mt-12">
                  <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      Vind de beste zorg voor jouw kat
                    </h2>
                    <p className="text-white/90 text-lg mb-6">
                      Ontdek dierenartsen en andere professionals bij jou in de buurt.
                    </p>
                    <Link
                      href="/nl/netherlands"
                      className="inline-flex items-center gap-2 bg-white text-cpCoral rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all shadow-lg"
                    >
                      <Search className="w-5 h-5" />
                      Doorzoek de directory
                    </Link>
                  </div>
                </section>

              </div>
            </article>

            <aside className="lg:w-80 flex-shrink-0">
              <div className="sticky top-20 space-y-6">
                <TableOfContents
                  items={[
                    { id: "gemiddelde-levensverwachting", text: "Gemiddelde levensverwachting", level: 2 },
                    { id: "factoren-invloed", text: "Factoren die invloed hebben", level: 2 },
                    { id: "levensverwachting-per-ras", text: "Levensverwachting per ras", level: 2 },
                    { id: "kat-mensenjaren", text: "Hoe oud is mijn kat in mensenjaren?", level: 2 },
                    { id: "lang-leven", text: "Help je kat een lang leven leiden", level: 2 },
                  ]}
                  locale="nl"
                />
                <BlogSidebarAd sponsorAd={null} />
              </div>
            </aside>
          </div>
        </div>

        <section className="container mx-auto max-w-4xl px-4 py-12">
          <div className="text-center">
            <Link
              href="/nl/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cpCoral text-white rounded-2xl font-medium hover:bg-cpCoral/90 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Bekijk alle artikelen
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
