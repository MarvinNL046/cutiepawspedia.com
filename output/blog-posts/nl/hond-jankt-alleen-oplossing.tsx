/**
 * Blog Post: Hond jankt als hij alleen is - zo los je het op
 *
 * SEO-optimized Dutch blog post for CutiePawsPedia
 * Topic 29/50 - Category: huisdiertraining
 */

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag } from "lucide-react";
import { PhotoCredit } from "@/components/blog";
import { BlogSidebarAd, BetweenContentAd } from "@/components/ads";
import { EditorialByline } from "@/components/seo";

export const metadata: Metadata = {
  title: "Hond Jankt Als Hij Alleen Is: Oplossingen Verlatingsangst | 2024",
  description: "Heeft je hond verlatingsangst? Leer waarom honden janken bij alleen zijn en ontdek effectieve stap-voor-stap oplossingen om verlatingsangst te overwinnen. Inclusief trainingsschema.",
  openGraph: {
    title: "Hond jankt als hij alleen is: zo los je het op",
    description: "Heeft je hond verlatingsangst? Leer waarom honden janken bij alleen zijn en ontdek effectieve oplossingen met trainingsschema.",
    type: "article",
    images: ["https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?w=1200&h=630&fit=crop"],
  },
};

export default function BlogPost() {
  const post = {
    title: "Hond jankt als hij alleen is: zo los je het op",
    excerpt: "Janken, huilen, blaffen of destructief gedrag wanneer je hond alleen is, zijn tekenen van verlatingsangst. Ontdek waarom dit gebeurt en leer stap-voor-stap hoe je je hond leert om kalm alleen te blijven.",
    slug: "hond-jankt-alleen-oplossing",
    categoryName: "Huisdiertraining",
    publishedAt: new Date("2024-12-11"),
    readingTimeMinutes: 11,
    featuredImage: "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?w=1200&h=630&fit=crop",
    featuredImageAlt: "Trieste hond kijkt uit het raam",
    content: `Het gehuil en geblaf van je hond zodra je de deur uit gaat is hartverscheurend en kan leiden tot klachten van buren. Verlatingsangst is een veelvoorkomend maar behandelbaar probleem. In dit artikel leer je de oorzaken kennen en krijg je een bewezen trainingsprogramma om je hond te helpen kalm alleen te blijven.

## Wat is verlatingsangst bij honden?

Verlatingsangst, ook wel separatieangst genoemd, is een gedragsstoornis waarbij honden extreme stress ervaren wanneer ze gescheiden worden van hun eigenaar of van mensen in het algemeen.

### Symptomen van verlatingsangst

Vocalisatie is het meest opvallende symptoom. Je hond jankt, huilt, blaft of huilt vrijwel continu vanaf het moment dat je vertrekt tot je terugkomt. Buren klagen vaak over geluidsoverlast.

Destructief gedrag richt zich meestal op vertrekpunten - krassen aan deuren, bijten op deurposten, vernielen van schoenen of kleding die naar jou ruikt. Dit gedrag komt voort uit wanhoop om bij je te komen.

Ongelukjes in huis gebeuren zelfs bij zindelijke honden. Stress beïnvloedt de spijsvertering en controle over blaas en darmen. Dit is geen wraakactie maar een fysiologische stress reactie.

Hyperactiviteit bij thuiskomst gaat verder dan normale enthousiaste begroeting. Je hond is buiten zichzelf van blijdschap, kan niet kalmeren, springt excessief, draait rondjes.

Lichamelijke symptomen zijn hypersalivatie (extreem kwijlen), hijgen, trillen, opgezette pupillen. Sommige honden braken van de stress.

Schaduw gedrag voor vertrek - je hond volgt je van kamer naar kamer, wordt angstig bij voorbereidende handelingen (jas pakken, sleutels grijpen).

### Verschil tussen verveling en verlatingsangst

Verveling ontstaat na uren alleen zijn. De hond is rustig het eerste uur maar begint destructief gedrag of vocaliseren na 4-6 uur.

Verlatingsangst ontstaat binnen minuten na vertrek. Peak angst is meestal binnen 30 minuten. Het gedrag stopt zodra je thuiskomt.

Bij verveling helpen mentale stimulatie en fysieke vermoeidheid. Bij verlatingsangst is dit niet voldoende - er is systematische gedragstherapie nodig.

## Oorzaken van verlatingsangst

### Vroege ervaringen

Puppies die te vroeg van hun moeder zijn gescheiden (voor 8 weken) missen cruciale socialisatie. Ze leren niet om alleen te zijn en ontwikkelen overmatige afhankelijkheid.

Puppies die altijd gezelschap hadden (geen tijd alleen tijdens socialisatie periode) ontwikkelen geen zelfvertrouwen voor solitude.

### Traumatische scheiding

Honden uit asielen hebben vaak verlatingsangst door eerdere abandonment. Ze zijn in het verleden in de steek gelaten en leven in constante angst dat dit weer gebeurt.

Plotseling veranderde routine - bijvoorbeeld student-eigenaar die naar fulltime baan gaat, of pensioen waardoor eigenaar plots vaak weg is.

Verlies van een gezinslid (mens of dier) creëert hypervigilantie en angst dat ook andere geliefden verdwijnen.

### Hyperattachment (overmatige hechting)

Sommige honden ontwikkelen ongezonde afhankelijkheid. Ze functioneren alleen wanneer hun "veilige persoon" aanwezig is.

Dit wordt vaak onbedoeld versterkt door:
- Constante fysieke nabijheid
- Altijd reageren op aandacht vragen
- Hond overal mee naartoe nemen
- Excessief dramatische vertrekken en thuiskomsten

### Genetische aanleg

Bepaalde rassen zijn gevoeliger: herders (Duitse herder, Belgische herder), retriever rassen, speelgoed rassen (Cavalier King Charles Spaniel, Havanezer).

Deze rassen zijn gefokt voor nauwe samenwerking met mensen en kunnen eenzaamheid moeilijker verdragen.

### Medische factoren

Pijn of ongemak kan angst verergeren. Een hond met artritis voelt zich kwetsbaarder alleen.

Hormonale veranderingen - ongecastreerde honden kunnen verhoogde stress hebben.

Cognitieve disfunctie bij oudere honden (hondenversie van dementie) veroorzaakt desoriëntatie en angst bij alleen zijn.

## Hoe ernstig is de verlatingsangst van je hond?

### Lichte verlatingsangst

- Licht janken of piepen eerste 5-10 minuten
- Lichte onrust (ijsberen)
- Hond kalmeert binnen 30 minuten
- Geen destructie of ongelukjes
- Normale begroeting bij thuiskomst

Prognose: Uitstekend met basale training (2-4 weken)

### Matige verlatingsangst

- Aanhoudend blaffen/huilen 30-60 minuten
- Destructief gedrag aan deuren of ramen
- Occasionele ongelukjes
- Hypersalivatie en ijsberen
- Zeer intense begroeting

Prognose: Goed met gedragstherapie (6-12 weken)

### Ernstige verlatingsangst

- Non-stop vocalisatie vanaf vertrek tot thuiskomst
- Significante destructie (deurkozijnen, meubels)
- Regelmatige ongelukjes ondanks zindelijkheid
- Zelfverwondend gedrag (nagels bloeden van krabben)
- Weigering eten tot eigenaar terug is
- Fysieke symptomen (braken, diarree)

Prognose: Behandelbaar met professionele hulp + medicatie (3-6 maanden)

## Stap-voor-stap trainingsplan

### Fase 1: Basis voorbereidingen (Week 1-2)

#### Creëer positieve alleentijd associaties

Speciale alleen-tijd treats die je hond ALLEEN krijgt wanneer je weggaat. Denk aan:
- Kong gevuld met bevroren pindakaas en brokken
- Vullbare speeltjes met leverworst
- Lange kauwsnacks (bully sticks, gedroogde pezen)
- LickiMat met nat voer of yoghurt

De hond mag deze alleen krijgen bij jouw vertrek en je haalt ze weg bij thuiskomst.

#### Vertrekritueel neutraliseren

Verlatingsangst begint vaak bij voorbereidende handelingen (sleutels, jas, schoenen). Desensitiseer dit:

1. Pak sleutels, leg neer, negeer hond
2. Doe jas aan, blijf 10 minuten zitten, trek uit
3. Schoenen aan, loop naar deur, kom terug, schoenen uit
4. Herhaal random door de dag (10-15x)

Doel: Deze handelingen hebben geen voorspellende waarde meer voor vertrek.

#### Creëer een veilige ruimte

Kies een benchtrain of specifieke kamer waar je hond zich veilig voelt. Dit moet een positieve plek zijn, geen straf.

Bench training stappen:
- Bench open, gooi treats erin, laat hond verkennen
- Voer maaltijden in bench (deur open)
- Sluit deur voor 5 seconden tijdens maaltijd
- Verleng tijd geleidelijk tot 30 minuten

Sommige honden voelen zich veiliger in bench (hol-gevoel), anderen hebben juist meer ruimte nodig.

### Fase 2: Graduele verlatingsexposure (Week 3-6)

Dit is de cruciale fase. Het principe is graduele desensitisatie - je hond leert dat alleen zijn niet eng is.

#### Week 3: Absences within sight

1. Sta op, loop naar andere kant kamer, kom terug (5 seconden)
2. Herhaal 10x met tussenpauzes
3. Loop naar andere kamer (deur open), kom terug (10 seconden)
4. Verleng tot 30 seconden
5. Werk op tot 2 minuten

Beloon kalm gedrag, niet opgewonden gedrag. Negeer janken totaal.

#### Week 4: Out of sight absences

1. Loop naar andere kamer, sluit deur, open meteen (5 seconden)
2. Verleng tot 30 seconden
3. Doe normale activiteiten in andere kamer (1 minuut)
4. Werk op tot 5 minuten
5. Dan 10 minuten

Timing is cruciaal: kom terug VOORDAT je hond angstig wordt. Als je te lang wacht en hij begint te janken, ben je te snel gegaan.

#### Week 5: Voorbereidende handelingen + kort vertrek

1. Doe jas aan, sleutels pakken, naar deur lopen, kom terug
2. Open deur, stap over drempel, kom terug (10 seconden)
3. Stap buiten, sluit deur, direct terug (15 seconden)
4. Werk op tot 1 minuut buiten
5. Dan 2 minuten, 5 minuten

Gebruik randomisatie - niet altijd even lang, varieer tussen 30 seconden en 5 minuten.

#### Week 6: Langere absences

1. 10 minuten vertrek
2. 15 minuten
3. 30 minuten
4. 45 minuten
5. 1 uur

Laat een camera achter om gedrag te monitoren. Als je hond begint te stressen, ga terug naar kortere tijden.

### Fase 3: Real-life verlatingssituaties (Week 7-12)

#### Graduele verlenging

Week 7: 1-2 uur
Week 8: 2-3 uur
Week 9: 3-4 uur
Week 10-12: Werk op tot volledige werkdag (8 uur)

Belangrijk: Dit zijn geen lineaire progressies. Sommige dagen ga je "terug" in moeilijkheid om zelfvertrouwen te behouden.

#### Varieer vertrekpatronen

Ga niet altijd op dezelfde tijd weg. Verlatingsangst kan gekoppeld worden aan specifieke tijden (ochtend werkroutine).

Varieer wat je doet voordat je vertrekt. Soms douchen, soms niet. Soms ontbijten eerst, soms niet.

#### Introducer onvoorspelbaarheid

Kom soms onverwachts terug na 20 minuten, dan weer pas na 4 uur. Dit leert je hond dat je terugkomst onvoorspelbaar maar gegarandeerd is.

## Ondersteunende strategieën

### Fysieke uitputting voor vertrek

Lange wandeling of intensieve speelsessie 30-60 minuten voor vertrek. Een vermoeide hond is een rustige hond.

Maar: fysieke vermoeidheid alleen lost verlatingsangst niet op. Het helpt alleen in combinatie met gedragstherapie.

### Mentale stimulatie

Voederpuzzels en snuffelmatten geven mentale vermoeidheid. 15 minuten snuffelwerk = 1 uur wandelen qua vermoeidheid.

Rotatie van speeltjes - laat slechts 2-3 speeltjes per keer beschikbaar, wissel elke 3 dagen. Dit houdt interesse.

### Achtergrondgeluid

TV of radio op lage volume maskeert buitengeluiden en creëert illusie van aanwezigheid.

Speciale kalmeringsmuziek: "Through a Dog's Ear" is wetenschappelijk getest en verlaagt stress.

White noise machines maskeren triggers (buren, verkeer) die angst kunnen verhogen.

### Feromoon therapie

Adaptil (synthetisch moederferomoon) kan helpen bij milde angst. Verkrijgbaar als:
- Diffuser (dekt 50m²)
- Spray (op bench, dekens)
- Halsband

Begin 1 week voor training en gebruik gedurende gehele programma (3 maanden).

### Supplementen en natuurlijke hulpmiddelen

L-theanine (aminozuur uit thee) bevordert kalmte zonder slaperigheid.

CBD olie voor honden - vroege onderzoeken tonen veelbelovende resultaten voor angst, maar kies altijd veterinaire grade producten.

Bach bloesem remedies - Rescue Remedy is populair maar wetenschappelijk bewijs is beperkt.

Melatonine (0,1mg per kg lichaamsgewicht) kan helpen bij angst, vooral 's avonds.

Overleg altijd met dierenarts voordat je supplementen geeft.

### Medicatie (voor ernstige gevallen)

Bij ernstige verlatingsangst kan medicatie noodzakelijk zijn om gedragstherapie mogelijk te maken.

Clomipramine (Clomicalm) - tricyclisch antidepressivum, dagelijkse inname, werkt na 4-6 weken.

Fluoxetine (Prozac voor honden) - SSRI, dagelijkse inname, werkt na 4-8 weken.

Trazodone - snel werkend (1-2 uur), wordt gegeven voor specifieke verlatingssituaties.

Alprazolam (Xanax) - benzodiazepine voor acute angst, alleen voor noodgevallen.

Medicatie is altijd ondersteuning bij gedragstherapie, nooit als enige behandeling.

## Wat NIET te doen

### Straffen

Straffen voor destructief gedrag of ongelukjes verergert angst. Je hond gedraagt zich niet slecht expres - hij is in paniek.

Straffen leert je hond dat thuiskomst = negatieve ervaring, wat de stress bij je volgende vertrek verhoogt.

### Dramatische vertrekken/thuiskomsten

"Dag zeggen" met omhelzingen en "mama mist je!" verhoogt emotionele lading van vertrek.

Bij thuiskomst: extreem enthousiaste begroetingen leren je hond dat je afwezigheid een grote gebeurtenis is.

Ideaal: negeer je hond 5-10 minuten bij thuiskomst tot hij gekalmeerd is. Dan rustig begroeten.

### Te snel te veel

Het grootste probleem in training is ongeduld. Je hond moet elk niveau beheersen voordat je verder gaat.

Als je te snel gaat en je hond gaat in volle paniek, ben je weken progress kwijt en moet je opnieuw beginnen.

### Nieuwe hond aanschaffen als "gezelschap"

Dit lost verlatingsangst niet op. Je hond is gehecht aan jou, niet aan dieren in het algemeen. Je krijgt nu mogelijk twee honden met verlatingsangst.

Alleen overwegen als verlatingsangst eerst opgelost is en je om andere redenen een tweede hond wilt.

### Stoppen met werk/activiteiten

Je leven aanpassen rond de angst van je hond versterkt het probleem. Je hond moet leren dat alleen zijn normaal en veilig is.

## Hulp van professionals

### Gedragstherapeut

Een gecertificeerd hondengedragstherapeut (vaak dierenarts met specialisatie) kan:
- Nauwkeurig de ernst van angst bepalen
- Persoonlijk trainingsplan maken
- Medicatie voorschrijven indien nodig
- Troubleshooten wanneer training stagneert

Zoek iemand met certificering (COAPE, AVSAB, IAABC).

### Doggy daycare

Tijdelijke oplossing tijdens training. Je hond is overdag onder supervisie en socialisatie met andere honden.

Nadeel: Dit lost het onderliggende probleem niet op en kan afhankelijkheid van constante gezelschap creëren.

### Hondenoppas of vriendfamilie

Een tijdelijke oplossing maar pas op dat je hond niet gewoon zijn angst overzet naar de oppas.

## Prognose en verwachtingen

### Realistische tijdslijn

Lichte verlatingsangst: 4-8 weken met consistente training
Matige verlatingsangst: 3-6 maanden
Ernstige verlatingsangst: 6-12 maanden

Dit zijn gemiddelden - sommige honden gaan sneller, anderen langzamer.

### Terugval

Verlatingsangst kan terugkomen bij:
- Grote levensveranderingen (verhuizing, nieuw gezinslid)
- Traumatische gebeurtenis tijdens alleen zijn (inbraak, brand alarm)
- Lange periode van niet alleen zijn (vakantie)

Bij terugval: hervat training vanaf laatste succesvol niveau, niet vanaf begin.

### Levenslange management

Sommige honden hebben levenslange ondersteuning nodig. Dit betekent:
- Continue gebruik van kalmerende strategieën
- Periodieke "opfris" training
- Vermijden van te lange alleen periodes (max 6-8 uur)
- Mogelijk permanente lage dosis medicatie

Dit is oké - het doel is kwaliteit van leven voor jou en je hond, niet perfectie.

## Speciale situaties

### Verlatingsangst bij puppies

Puppies kunnen verlatingsangst ontwikkelen als ze nooit alleen leren zijn.

Preventie: Begin training vanaf dag 1. Laat puppy vanaf 8 weken dagelijks korte periodes alleen (begin 5 minuten, werk op tot 2 uur tegen 4 maanden oud).

### Geadopteerde asielhonden

Asielhonden hebben vaak verlatingsangst door eerdere abandonment trauma.

Wees extra geduldig. Het kan 6-12 maanden duren voordat ze zich veilig voelen. Forceer geen afstand - laat ze initiatief nemen.

### Oudere honden met nieuwe verlatingsangst

Plotselinge verlatingsangst bij oudere honden (7+ jaar) kan wijzen op:
- Cognitieve disfunctie (honden dementie)
- Pijn/ongemak (artritis) waardoor ze zich kwetsbaar voelen
- Verlies van zintuigen (gehoor, zicht) wat onzekerheid creëert

Veterinaire check is essentieel voordat gedragstherapie start.

## Veelgestelde vragen

### Hoe weet ik of mijn hond verlatingsangst heeft of gewoon verveeld is?

Plaats een camera en observeer wanneer het gedrag start. Verlatingsangst = binnen 20-30 minuten na vertrek, peak stress vroeg. Verveling = na uren, toenemend gedrag. Bij verlatingsangst stopt gedrag direct bij thuiskomst, bij verveling gaat hond rustig door met destructief gedrag.

### Kan ik mijn hond leren met verlatingsangst terwijl ik fulltime werk?

Dit is uitdagend maar mogelijk. Weekend training voor basisvaardigheden, gebruik doggy daycare of oppas tijdens werkuren terwijl je thuis bent in weekenden/avonden voor gestructureerde training. Overweeg parttime werken of thuiswerken eerste 2-3 maanden.

### Maakt een tweede hond het beter?

Alleen als verlatingsangst mild is en gerelateerd aan algemene eenzaamheid (niet specifiek aan jou). Voor meeste honden met verlatingsangst maakt een tweede hond geen verschil - ze zijn gehecht aan jou, niet aan andere dieren. Los eerst verlatingsangst op voordat je een tweede hond overweegt.

### Mijn hond heeft alleen verlatingsangst van mij, niet van andere gezinsleden. Waarom?

Hyperattachment aan één persoon komt vaak voor. Deze hond is over-gehecht geraakt aan jou specifiek. Oplossing: Andere gezinsleden moeten primaire verzorgers worden (voeren, wandelen, trainen) gedurende 2-3 maanden om de afhankelijkheid te herverdelen.

### Is er een verschil tussen rassen in verlatingsangst?

Ja, bepaalde rassen zijn gevoeliger. Herders (Duitse herder, Belgische herder, Australische herder) door nauwe werk binding. Retrievers door "mensen-pleasend" karakter. Speelgoed rassen (Cavalier, Havanezer) door fokken voor gezelschap. Maar elke hond, ongeacht ras, kan verlatingsangst ontwikkelen.

## Samenvatting

Verlatingsangst is een veelvoorkomend maar behandelbaar probleem waarbij honden extreme stress ervaren bij scheiding van hun eigenaar. Symptomen variëren van janken en destructief gedrag tot ongelukjes en zelfverwondend gedrag.

Succesvolle behandeling bestaat uit graduele desensitisatie waarbij je hond leert dat alleen zijn veilig is. Dit proces vereist geduld en consistentie en kan 4-12 weken tot 6-12 maanden duren afhankelijk van de ernst.

Ondersteunende strategieën zoals fysieke vermoeidheid, mentale stimulatie, feromoon therapie en in ernstige gevallen medicatie kunnen het herstel versnellen. Vermijd straffen, dramatische vertrekken en te snelle progressie.

Met de juiste aanpak en professionele ondersteuning wanneer nodig, kunnen de meeste honden leren om kalm en comfortabel alleen te zijn, wat de levenskwaliteit voor zowel hond als eigenaar dramatisch verbetert.`,
    tags: ["hond jankt", "verlatingsangst", "hond huilt", "alleen thuislaten", "hondentraining", "gedragsproblemen"],
    relatedPosts: [
      {
        slug: "hond-alleen-thuislaten",
        title: "Hond alleen thuislaten: complete gids voor beginners",
        image: "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=400&h=250&fit=crop",
      },
      {
        slug: "hond-bench-trainen",
        title: "Bench training voor honden: stap-voor-stap uitleg",
        image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=250&fit=crop",
      },
      {
        slug: "hond-gedragsproblemen",
        title: "Top 10 hondengedragsproblemen en oplossingen",
        image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=250&fit=crop",
      },
    ],
  };

  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      <div className="container mx-auto max-w-6xl px-4 pt-8">
        <Link
          href="/nl/blog"
          className="inline-flex items-center gap-2 text-muted-foreground dark:text-cpCream/70 hover:text-cpCoral dark:hover:text-cpCoral transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Terug naar blog
        </Link>
      </div>

      <header className="container mx-auto max-w-6xl px-4 py-8">
        <span className="inline-block px-3 py-1 bg-cpCoral/10 dark:bg-cpCoral/20 text-cpCoral text-sm font-medium rounded-full mb-4">
          {post.categoryName}
        </span>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-6 leading-tight max-w-4xl">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-muted-foreground dark:text-cpCream/60 mb-4">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            11 december 2024
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {post.readingTimeMinutes} min leestijd
          </span>
        </div>

        <EditorialByline updatedAt={post.publishedAt} locale="nl" />
      </header>

      <div className="container mx-auto max-w-6xl px-4 mb-8">
        <div className="relative aspect-video rounded-3xl overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.featuredImageAlt}
            fill
            className="object-cover"
            priority
          />
          <PhotoCredit
            photographerName="Hannah Lim"
            photographerUrl="https://unsplash.com/@hannahlim"
            source="unsplash"
          />
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <article className="flex-1 min-w-0">
            <div className="bg-card dark:bg-cpSurface/30 rounded-3xl p-6 md:p-10 border border-border dark:border-cpAmber/10">
              <p className="text-lg text-foreground dark:text-cpCream font-medium mb-6 pb-6 border-b border-border dark:border-cpAmber/10">
                {post.excerpt}
              </p>

              <div className="prose prose-lg max-w-none dark:prose-invert">
                {post.content.split("\n\n").map((paragraph, index) => {
                  if (paragraph.startsWith("## ")) {
                    const text = paragraph.replace("## ", "");
                    return (
                      <h2 key={index} className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
                        {text}
                      </h2>
                    );
                  } else if (paragraph.startsWith("### ")) {
                    const text = paragraph.replace("### ", "");
                    return (
                      <h3 key={index} className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3">
                        {text}
                      </h3>
                    );
                  } else if (paragraph.startsWith("#### ")) {
                    const text = paragraph.replace("#### ", "");
                    return (
                      <h4 key={index} className="text-lg font-bold text-foreground dark:text-cpCream mt-4 mb-2">
                        {text}
                      </h4>
                    );
                  } else if (paragraph.trim()) {
                    return (
                      <p key={index} className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>

              <BetweenContentAd testMode={true} />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Tag className="w-4 h-4 text-muted-foreground dark:text-cpCream/60" />
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>

          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-20">
              <BlogSidebarAd sponsorAd={null} />
            </div>
          </aside>
        </div>
      </div>

      <section className="bg-secondary/50 dark:bg-cpSurface/20 py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-8 text-center">
            Gerelateerde Artikelen
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {post.relatedPosts.map((related, index) => (
              <article
                key={index}
                className="group bg-card dark:bg-cpSurface/50 rounded-2xl overflow-hidden border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-md transition-all"
              >
                <Link href={`/nl/gids/${related.slug}`}>
                  <div className="relative h-40">
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors line-clamp-2 mb-2">
                      {related.title}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-cpCoral text-sm font-medium">
                      Lees meer
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            image: post.featuredImage,
            datePublished: post.publishedAt.toISOString(),
            dateModified: post.publishedAt.toISOString(),
            author: {
              "@type": "Organization",
              name: "CutiePawsPedia",
            },
            publisher: {
              "@type": "Organization",
              name: "CutiePawsPedia",
              logo: {
                "@type": "ImageObject",
                url: "https://cutiepawspedia.com/logo.png",
              },
            },
          }),
        }}
      />
    </div>
  );
}
