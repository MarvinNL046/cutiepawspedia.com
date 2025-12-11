import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Tag, Stethoscope, Search } from "lucide-react";
import { BetweenContentAd, BlogSidebarAd } from "@/components/ads";
import { PhotoCredit, TableOfContents } from "@/components/blog";
import { EditorialByline } from "@/components/seo";

export const metadata: Metadata = {
  title: "Hond overgewicht: herkennen, risico's en afvallen | CutiePawsPedia",
  description: "Hond te dik? Ontdek hoe je overgewicht herkent, welke gezondheidsrisico's er zijn en krijg een praktisch plan om je hond gezond te laten afvallen. Inclusief voedingstips en bewegingsschema.",
  keywords: "hond te dik, hond afvallen, overgewicht hond, hond dieet, gezond gewicht hond, hond obesitas",
  openGraph: {
    title: "Hond overgewicht: herkennen, risico's en afvallen | CutiePawsPedia",
    description: "Hond te dik? Ontdek hoe je overgewicht herkent en krijg een praktisch plan om je hond gezond te laten afvallen.",
    type: "article",
    locale: "nl_NL",
    images: [{
      url: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=1200&h=630&fit=crop",
      width: 1200,
      height: 630,
      alt: "Hond met overgewicht tijdens een wandeling"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hond overgewicht: herkennen, risico's en afvallen | CutiePawsPedia",
    description: "Hond te dik? Ontdek hoe je overgewicht herkent en krijg een praktisch plan om je hond gezond te laten afvallen.",
  },
  alternates: {
    canonical: "https://cutiepawspedia.com/nl/blog/hond-overgewicht-afvallen",
  },
};

const post = {
  title: "Hond overgewicht: herkennen, risico's en afvallen",
  content: `
Overgewicht bij honden is een groeiend probleem dat vaak onderschat wordt. Ongeveer 40-50% van de honden in westerse landen heeft overgewicht of obesitas, wat ernstige gevolgen kan hebben voor hun gezondheid en levensverwachting. Het goede nieuws? Met de juiste aanpak kan bijna elke hond gezond afvallen en een betere kwaliteit van leven krijgen. In dit artikel leer je hoe je overgewicht herkent, waarom het zo belangrijk is om in te grijpen, en krijg je een praktisch stappenplan om je hond te helpen afvallen.

## Hoe herken je overgewicht bij je hond?

Het herkennen van overgewicht kan lastig zijn, vooral omdat het vaak geleidelijk gaat. Wat begint als "wat extra gewicht" kan binnen een paar maanden uitgroeien tot obesitas. Er zijn verschillende manieren om te bepalen of je hond te zwaar is.

De **rib-test** is de meest praktische methode. Leg je handen plat op beide zijden van de ribbenkast van je hond, zonder te drukken. Bij een gezond gewicht voel je de ribben gemakkelijk zonder ze te zien. Als je moet drukken om de ribben te voelen, heeft je hond waarschijnlijk overgewicht. Als je de ribben kunt zien zonder te voelen, is je hond te mager.

De **taille-check** wordt gedaan door van bovenaf naar je staande hond te kijken. Een gezonde hond heeft een duidelijke taille-inham achter de ribben. Bij overgewicht ontbreekt deze inham en heeft de hond een rechtere lijn of zelfs een bolle vorm. Van opzij bekeken moet de buik hoger liggen dan de ribbenkast - een "opgetrokken buik". Een hangende of bolle buik duidt op overgewicht.

Body Condition Score (BCS) systemen gebruiken een schaal van 1-9 waarbij 1 extreem ondervoed is en 9 extreem obees. Een ideaal gewicht is 4-5: ribben voelbaar met lichte druk, taille zichtbaar, opgetrokken buik. Bij een score van 6-7 is er sprake van overgewicht, 8-9 van obesitas. Veel dierenartsen gebruiken dit systeem bij check-ups.

Let ook op gedragsveranderingen: minder energie, moeite met springen of traplopen, sneller buiten adem, verminderde interesse in spelen, of overmatig hijgen. Deze signalen kunnen duiden op dat het extra gewicht een last wordt voor je hond.

## Gezondheidsrisico's van overgewicht

Overgewicht is niet slechts een cosmetisch probleem - het heeft reële, ernstige gevolgen voor de gezondheid en het welzijn van je hond. Begrijpen van deze risico's kan motiveren om actie te ondernemen.

**Gewrichtsproblemen en arthritis** zijn veel voorkomende complicaties. Het extra gewicht belast de gewrichten, kraakbeen en botten. Dit versnelt slijtage en leidt tot pijnlijke arthritis, vooral in heupen, knieën en rug. Honden met overgewicht hebben tot 3x meer kans op gewrichtsproblemen. Dit creëert een vicieuze cirkel: pijn leidt tot minder beweging, wat weer leidt tot meer gewicht.

**Diabetes type 2** komt vaker voor bij honden met overgewicht. Overtollig vetweefsel zorgt voor insulineresistentie, waardoor de bloedsuikerspiegel te hoog wordt. Dit vereist levenslange medicatie en strenge dieetcontrole. Omkeerbaar in vroege stadia, maar permanent als het te lang duurt.

**Hart- en vaatziekten** worden verergerd door overgewicht. Het hart moet harder werken om het grotere lichaam van bloed te voorzien, wat leidt tot hoge bloeddruk en hartfalen op langere termijn. Obesitas verhoogt ook het cholesterolgehalte en het risico op trombose.

**Ademhalingsproblemen** ontstaan doordat vet zich afzet rond de luchtwegen en borst. Dit maakt ademhalen zwaarder, vooral bij inspanning of warm weer. Brachycefale rassen (platsnuitige honden zoals bulldogs) hebben hier extra last van.

**Verminderde levensverwachting** is misschien wel het meest alarmerende risico. Studies tonen aan dat honden met obesitas 2-3 jaar korter leven dan honden met een gezond gewicht. Dat zijn kostbare jaren die je samen kunt doorbrengen.

**Verhoogd operatierisico**, verminderde immuunfunctie, huidproblemen (plooien waar bacteriën groeien), urinewegproblemen, en sommige vormen van kanker komen ook vaker voor bij honden met overgewicht.

## De oorzaken van overgewicht bij honden

Begrijpen waarom je hond te zwaar is geworden is essentieel om het probleem effectief aan te pakken. Meestal is het een combinatie van factoren.

**Overvoeding** is de meest voorkomende oorzaak. Veel eigenaren geven meer voer dan de aanbevolen hoeveelheid, vullen de bak "op het oog" in plaats van te meten, of geven te vaak tussendoortjes. Een paar extra brokjes per dag lijkt weinig, maar kan over een jaar resulteren in een kilo extra gewicht.

**Verkeerde voedingskeuzes** spelen ook een rol. Honden eten graag, maar hun natuurlijke verzadigingsmechanisme werkt niet goed bij commercieel voer dat zeer smakelijk is gemaakt. Menselijk eten, vooral vet en suikerrijk voedsel, bevat veel meer calorieën dan hondenvoer. Een klein koekje voor een kleine hond kan equivalent zijn aan een heel burger voor een mens.

**Gebrek aan beweging** is een belangrijke factor. Veel honden krijgen onvoldoende dagelijkse beweging. Twee korte rondje van 10 minuten per dag is niet genoeg voor de meeste rassen. Honden hebben minstens 30-60 minuten actieve beweging per dag nodig, afhankelijk van leeftijd, ras en gezondheid.

**Leeftijd en metabolisme** veranderen natuurlijk. Oudere honden zijn vaak minder actief en hebben een langzamer metabolisme, maar krijgen soms dezelfde hoeveelheid voer als toen ze jonger waren. Castratie/sterilisatie verlaagt ook het metabolisme met ongeveer 20-30%, dus de voedingshoeveelheid moet worden aangepast.

**Medische oorzaken** zijn zeldzamer maar wel belangrijk. Hypothyreoïdie (trage schildklier), syndroom van Cushing (te veel cortisol), en sommige medicaties kunnen gewichtstoename veroorzaken. Als je hond aankomt ondanks redelijke voeding en beweging, laat dit dan medisch onderzoeken.

**Gedragsfactoren** zoals verveling kunnen leiden tot vragen om eten als vorm van entertainment. Sommige honden hebben geleerd dat bedelen werkt, vooral als ze met puppyogen kijken. Eigenaren geven dan toe uit liefde, zonder te beseffen dat dit schaadt.

## Een veilig en effectief afvalplan

Gewichtsverlies bij honden moet geleidelijk en gecontroleerd gebeuren. Te snel afvallen kan gevaarlijk zijn, vooral voor de lever. Het doel is 1-2% van het lichaamsgewicht per week te verliezen.

**Stap 1: Bepaal het streefgewicht.** Bespreek met je dierenarts wat een realistisch ideaal gewicht is voor je hond, gebaseerd op ras, leeftijd en bouw. Een Golden Retriever reu kan bijvoorbeeld een ideaal gewicht van 30-34 kg hebben, afhankelijk van zijn framegrootte.

**Stap 2: Bereken de dagelijkse calorie-inname.** Je dierenarts kan de benodigde calorieën berekenen voor gewichtsverlies. Meestal is dit 60-70% van de onderhoudsenergie voor het streefgewicht. Voor thuisberekening: vermenigvuldig het streefgewicht in kg met 30, tel 70 op, en verminder dit met 20-30% voor gewichtsverlies.

**Stap 3: Meet altijd het voer.** Gebruik een maatbeker of weegschaal. "Een handje" of "schatting" werkt niet. De aanbevolen hoeveelheid op de verpakking is vaak te veel omdat het gebaseerd is op actieve honden. Verdeel het voer over 2-3 maaltijden per dag om honger te verminderen.

**Stap 4: Kies het juiste voer.** Overwegen van speciaal "light" of gewichtscontrole voer dat minder calorieën maar meer vezels bevat, waardoor je hond zich voller voelt. Deze voeders bevatten ook voldoende eiwitten om spiermassa te behouden tijdens het afvallen.

**Stap 5: Beperk tussendoortjes drastisch.** Tussendoortjes mogen maximaal 10% van de dagelijkse calorieën zijn. Vervang hoogcalorische snacks door gezondere alternatieven: stukjes wortel, komkommer, groene bonen, of appel (zonder pitjes). Gebruik brokjes van de dagelijkse portie als trainingsbeloningen.

**Stap 6: Verhoog geleidelijk de beweging.** Begin met korte wandelingen en bouw langzaam op. Te veel te snel kan gewrichten beschadigen. Varieer met zwemmen (laag-impact), apporteren, of interactief speelgoed. Mentale stimulatie met snuffelmatten of puzzels kan ook helpen.

**Stap 7: Monitor en pas aan.** Weeg je hond wekelijks op hetzelfde moment van de dag (bijvoorbeeld 's ochtends voor eten). Noteer het gewicht in een logboek. Als er geen vooruitgang is na 2 weken, verlaag de calorieën met nog 10%. Als het te snel gaat (meer dan 2% per week), verhoog dan iets.

## Praktische tips voor succes

De theorie is één ding, maar de dagelijkse praktijk kan uitdagend zijn. Deze tips helpen je om vol te houden en obstakels te overwinnen.

**Betrek het hele gezin.** Iedereen moet dezelfde regels volgen. Als één persoon stiekem tussendoortjes geeft, saboteert dit het hele plan. Maak een duidelijke overeenkomst en hang een voedingsschema op de koelkast.

**Geef geen tafelresten.** Dit is moeilijk, vooral met smeekende ogen naar je kijkend tijdens het eten. Maar menselijk eten is vaak veel te calorierijk. Eén plakje kaas kan voor een kleine hond equivalent zijn aan een hele pizza voor een mens. Leer je hond om tijdens maaltijden in zijn mand te liggen.

**Verborgen calorieën opsporen.** Let op alle bronnen: kauwstaafjes, dentastix, botjes, trainingssnacks, medicijnen in voedsel verstopt. Tel alles mee in de dagelijkse calorieën. Eén varkensoortje kan 40-100 calorieën bevatten - voor een kleine hond is dat 10-20% van de dagelijkse behoefte.

**Maak eten interessanter.** Gebruik voederpuzzels, snuffelmatten, of verstop brokjes in de tuin. Dit vertraagt het eten, zorgt voor mentale stimulatie en kan maken dat je hond zich meer voldaan voelt. Bevriezen van voer in een Kong geeft langdurig knaagplezier.

**Houd een voedingsdagboek.** Schrijf alles op wat je hond eet en drinkt, inclusief snoepjes van bezoekers. Dit maakt je bewust van waar calorieën vandaan komen en helpt patronen te identificeren.

**Vier successen zonder eten.** Beloon vooruitgang met extra wandelingen, een nieuw speeltje, of extra aandacht in plaats van traktaties. Maak foto's om visuele vooruitgang te documenteren - dit kan zeer motiverend zijn.

**Wees geduldig en realistisch.** Gewichtsverlies duurt maanden, niet weken. Een hond die 5 kg moet afvallen heeft 3-6 maanden nodig. Er zullen plateaus zijn waar het gewicht even stabiliseert voordat het weer daalt. Dit is normaal.

## Wanneer professionele hulp zoeken

Hoewel veel honden thuis succesvol kunnen afvallen, zijn er situaties waarin professionele begeleiding essentieel is.

**Bij meer dan 20% overgewicht** is veterinaire supervisie cruciaal. Dit wordt beschouwd als obesitas en vereist een medisch afvalplan. De dierenarts kan ook onderliggende gezondheidsproblemen identificeren die het afvallen bemoeilijken.

**Als je hond medische problemen heeft** zoals diabetes, hartziekte of gewrichtsproblemen, moet gewichtsverlies zorgvuldig worden gemanageerd. Deze condities vereisen aangepast voer en mogelijk medicatie-aanpassingen tijdens het afvallen.

**Bij geen vooruitgang na 4-6 weken** consequente dieet en beweging is het verstandig om advies in te winnen. Er kan een medische oorzaak zijn, of de calorie-berekening klopt misschien niet. Hypothyreoïdie is een veel voorkomende, behandelbare oorzaak van gewichtstoename.

**Voor oudere honden of honden met beperkte mobiliteit** is een aangepaste aanpak nodig. Deze honden kunnen niet altijd veel bewegen en hebben vaak andere gezondheidsproblemen. Een specialist kan een veilig plan opstellen.

**Als je overweldigd bent** of niet weet waar te beginnen, kan een veterinaire voedingsdeskundige een gedetailleerd plan opstellen afgestemd op jouw hond. Sommige klinieken bieden gewichtsverlies programma's met regelmatige check-ins en ondersteuning.

**Voor voedingsadvies** kun je ook een dierenwinkel met gekwalificeerd personeel raadplegen, hoewel medische gevallen altijd naar een dierenarts moeten.

## De rol van beweging bij gewichtsverlies

Beweging is cruciaal, maar moet veilig en effectief worden opgezet. Voor honden met overgewicht gelden speciale overwegingen.

Begin voorzichtig, vooral als je hond lange tijd inactief is geweest. Start met 10-15 minuten per wandeling, 2-3x per dag. Verhoog elke week met 5 minuten tot je 30-60 minuten per dag bereikt. Let op tekenen van vermoeidheid: overmatig hijgen, stoppen, of lopen vertraagt.

**Zwemmen** is uitstekend voor honden met gewrichtsproblemen. Het is laag-impact maar wel intensief. Veel honden vinden het leuk en het is zacht voor de gewrichten. Begin met 5-10 minuten en bouw op. Sommige dierenfysiotherapeuten hebben onderwaterlandbanden.

**Apporteren en zoekspelletjes** verhogen de activiteit op een leuke manier. Begin met korte afstanden en bouw op. Dit combineert beweging met mentale stimulatie. Gebruik een bal of frisbee, maar overdrijf niet - te veel springen kan gewrichten belasten.

**Varieer de wandelroutes** om het interessant te houden. Verschillende omgevingen bieden nieuwe geuren en prikkels. Heuvelachtig terrein verbrand meer calorieën maar is intensiever, dus bouw dit geleidelijk op.

**Speeldata met andere honden** kunnen geweldig zijn als je hond sociaal is. Laat honden samen spelen onder supervisie. Let wel op dat honden met overgewicht minder conditie hebben en sneller moe worden.

**Vermijd overbelasting** bij warm weer. Honden met overgewicht hebben meer moeite met temperatuurregulatie. Wandel 's ochtends vroeg of 's avonds laat in de zomer. Zorg altijd voor water.

## Veelgestelde vragen

### Hoeveel zou mijn hond moeten wegen?

Dit hangt sterk af van het ras, geslacht en framegrootte. Gemiddelden per ras zijn beschikbaar, maar individuele variatie is groot. Een kleine Labrador vrouwtje kan 25 kg wegen, terwijl een grote reu 36 kg kan zijn - beide gezond. De beste methode is de rib-test en taille-check, niet alleen het getal op de weegschaal. Je dierenarts kan het beste beoordelen wat gezond is voor jouw specifieke hond gebaseerd op zijn bouw en conditie.

### Kan ik gewoon minder voer geven in plaats van light voer te kopen?

Technisch gezien wel, maar light voer heeft voordelen. Als je gewoon minder normaal voer geeft, krijgt je hond mogelijk te weinig essentiële voedingsstoffen, vitaminen en mineralen. Light voer is geformuleerd om alle benodigde voedingsstoffen te bieden bij minder calorieën, vaak door meer vezels en minder vet. Het helpt ook met verzadiging. Als je huidig voer wilt blijven gebruiken, bespreek dan met je dierenarts hoeveel je veilig kunt verminderen zonder tekorten te veroorzaken.

### Mijn hond bedelt constant om eten, hoe ga ik hiermee om?

Bedelen is aangeleerd gedrag dat tijd kost om af te leren. Negeer het volledig - geen oogcontact, geen praten, geen aandacht. Dit is moeilijk maar essentieel. Als je één keer toegeeft, versterk je het gedrag. Geef je hond alternatieve activiteiten tijdens je eigen maaltijden, zoals een gevulde Kong of kauwspeeltje. Verplaats zijn voerbak naar een andere kamer tijdens jouw eten. Beloon hem als hij rustig ligt zonder te bedelen. Het kan weken duren, maar volharding werkt.

### Is het normaal dat mijn hond vermoeid is tijdens het afvallen?

In het begin kan je hond iets minder energie hebben doordat hij minder calorieën binnenkrijgt. Dit zou mild en tijdelijk moeten zijn. Als je hond extreem vermoeid is, apathisch, of andere symptomen vertoont zoals braken of diarree, kan dit duiden op te snelle gewichtsverlies of een medisch probleem. Neem contact op met je dierenarts. Gezond gewichtsverlies zou niet moeten leiden tot een zichtbaar zieke of lijdende hond. Na een aanpassingsperiode zou je hond juist meer energie moeten krijgen naarmate het gewicht daalt.

### Hoelang duurt het voordat ik resultaten zie?

Je zou na 2-3 weken de eerste vooruitgang moeten zien op de weegschaal. Visuele veranderingen duren langer - vaak 4-6 weken voordat je echt verschil ziet in lichaamsomvang. Totale gewichtsverlies hangt af van hoeveel je hond moet afvallen. Bij een streef van 1% per week duurt 10% gewichtsverlies ongeveer 10 weken. Een hond van 30 kg die 3 kg moet afvallen (10%) heeft dus ongeveer 2,5 maand nodig bij een gezond tempo. Geduld is essentieel - te snel gaat ten koste van gezondheid.

## Conclusie

Overgewicht bij honden is een serieus gezondheidsprobleem, maar het is omkeerbaar met de juiste aanpak. Door het gewicht van je hond te monitoren, de oorzaken te begrijpen en een gestructureerd afvalplan te volgen, kun je de gezondheid en levensverwachting van je hond aanzienlijk verbeteren. Het vraagt toewijding, consistentie en soms doorzettingsvermogen, maar de beloning - een gezondere, vitaler en gelukkiger hond - is het meer dan waard.

Onthoud dat je niet alleen staat. Je dierenarts, dieetspecialisten en zelfs andere hondenbezitters kunnen ondersteuning en motivatie bieden. Het welzijn van je hond is de moeite waard, en elke stap in de juiste richting is een overwinning. Begin vandaag nog met kleine veranderingen, en jullie samen op weg naar een gezonder gewicht.

## Lees ook

- [Hondenvoeding: complete gids voor gezond voeren](/nl/gids/huisdiervoeding/hondenvoeding-gids)
- [Beweging voor honden: hoeveel heeft jouw ras nodig?](/nl/gids/huisdiertraining/hond-beweging-behoeften)
- [Senior honden verzorging: voeding en gezondheid](/nl/gids/senior-huisdieren/senior-hond-verzorging)
`,
  tags: ["hond overgewicht", "hond afvallen", "hondenvoeding", "hond gezondheid"],
  relatedPosts: ["hondenvoeding-gids", "hond-beweging-behoeften", "senior-hond-verzorging"]
};

export default function BlogPostPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Hond overgewicht: herkennen, risico's en afvallen",
            "description": "Hond te dik? Ontdek hoe je overgewicht herkent, welke gezondheidsrisico's er zijn en krijg een praktisch plan om je hond gezond te laten afvallen.",
            "image": "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=1200&h=630&fit=crop",
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
              "@id": "https://cutiepawspedia.com/nl/blog/hond-overgewicht-afvallen"
            }
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Hoeveel zou mijn hond moeten wegen?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Dit hangt sterk af van het ras, geslacht en framegrootte. De beste methode is de rib-test en taille-check, niet alleen het getal op de weegschaal. Je dierenarts kan het beste beoordelen wat gezond is voor jouw specifieke hond gebaseerd op zijn bouw en conditie."
                }
              },
              {
                "@type": "Question",
                "name": "Hoelang duurt het voordat ik resultaten zie?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Je zou na 2-3 weken de eerste vooruitgang moeten zien op de weegschaal. Visuele veranderingen duren langer - vaak 4-6 weken. Bij een gezond tempo van 1% per week duurt 10% gewichtsverlies ongeveer 10 weken."
                }
              }
            ]
          })
        }}
      />

      <div className="bg-background dark:bg-cpCharcoal min-h-screen">
        <div className="container mx-auto max-w-6xl px-4 pt-8">
          <Link href="/nl/blog" className="inline-flex items-center gap-2 text-muted-foreground dark:text-cpCream/70 hover:text-cpCoral transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Terug naar blog
          </Link>
        </div>

        <header className="container mx-auto max-w-6xl px-4 py-8">
          <span className="inline-block px-3 py-1 bg-cpCoral/10 dark:bg-cpCoral/20 text-cpCoral text-sm font-medium rounded-full mb-4">
            Huisdiervoeding
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
              9 min leestijd
            </span>
          </div>
          <EditorialByline locale="nl" />
        </header>

        <div className="container mx-auto max-w-6xl px-4 mb-8">
          <div className="relative aspect-video rounded-3xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1517849845537-4d257902454a?w=1200&h=630&fit=crop"
              alt="Hond met overgewicht ligt rustig op gras"
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

        <div className="container mx-auto max-w-6xl px-4 pb-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <article className="flex-1 min-w-0">
              <div className="bg-card dark:bg-cpSurface/30 rounded-3xl p-6 md:p-10 border border-border dark:border-cpAmber/10">
                <p className="text-lg text-foreground dark:text-cpCream font-medium mb-6 pb-6 border-b border-border dark:border-cpAmber/10">
                  Overgewicht bij honden is een ernstig gezondheidsprobleem dat de levensverwachting met 2-3 jaar kan verkorten. Leer hoe je overgewicht herkent, begrijp de risico's, en krijg een praktisch stappenplan om je hond gezond te laten afvallen.
                </p>

                <div className="text-center my-8">
                  <Link
                    href="/nl/netherlands/c/veterinary"
                    className="inline-flex items-center gap-2 bg-cpCoral text-white rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all shadow-lg hover:shadow-xl"
                  >
                    <Stethoscope className="w-5 h-5" />
                    Vind een dierenarts bij jou in de buurt
                  </Link>
                </div>

                <div className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: post.content.split('\n\n').map(para => {
                  if (para.startsWith('## ')) return `<h2 class="text-2xl font-bold mt-8 mb-4">${para.slice(3)}</h2>`;
                  if (para.startsWith('### ')) return `<h3 class="text-xl font-bold mt-6 mb-3">${para.slice(4)}</h3>`;
                  if (para.startsWith('**') && para.includes('**')) {
                    return `<p class="mb-4 leading-relaxed">${para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`;
                  }
                  if (para.trim()) return `<p class="mb-4 leading-relaxed">${para}</p>`;
                  return '';
                }).join('') }} />

                <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/10 dark:from-cpCoral/5 dark:to-cpAmber/5 rounded-2xl p-8 text-center my-12 border border-cpCoral/20">
                  <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-3">
                    Hulp nodig bij gewichtsverlies?
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/70 mb-6">
                    Vind dierenartsen en voedingsspecialisten in jouw buurt.
                  </p>
                  <Link
                    href="/nl/netherlands/c/veterinary"
                    className="inline-flex items-center gap-2 bg-cpCoral text-white rounded-xl px-6 py-3 font-semibold hover:-translate-y-1 transition-all"
                  >
                    Zoek een specialist →
                  </Link>
                </div>

                <BetweenContentAd testMode={true} />
              </div>

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
                    Vind de beste zorg voor jouw hond
                  </h2>
                  <p className="text-white/90 text-lg mb-6">
                    Ontdek dierenartsen en voedingsspecialisten bij jou in de buurt.
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
            </article>

            <aside className="lg:w-80 flex-shrink-0">
              <div className="sticky top-20 space-y-6">
                <TableOfContents
                  items={[
                    { id: "herkennen", text: "Hoe herken je overgewicht?", level: 2 },
                    { id: "risicos", text: "Gezondheidsrisico's", level: 2 },
                    { id: "oorzaken", text: "Oorzaken van overgewicht", level: 2 },
                    { id: "afvalplan", text: "Een veilig afvalplan", level: 2 },
                    { id: "tips", text: "Praktische tips", level: 2 },
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
