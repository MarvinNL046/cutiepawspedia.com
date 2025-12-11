/**
 * Blog Post: Kat heeft koorts - symptomen herkennen en handelen
 *
 * SEO-optimized Dutch blog post for CutiePawsPedia
 * Topic 26/50 - Category: dierengezondheid
 */

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag } from "lucide-react";
import { PhotoCredit } from "@/components/blog";
import { BlogSidebarAd, BetweenContentAd } from "@/components/ads";
import { EditorialByline } from "@/components/seo";

export const metadata: Metadata = {
  title: "Kat Koorts: Symptomen Herkennen & Handelen | CutiePawsPedia",
  description: "Heeft je kat koorts? Leer de symptomen herkennen, de normale lichaamstemperatuur, oorzaken van koorts en wanneer je naar de dierenarts moet. Complete gids voor kattenhouders.",
  openGraph: {
    title: "Kat heeft koorts: symptomen herkennen en handelen",
    description: "Heeft je kat koorts? Leer de symptomen herkennen, de normale lichaamstemperatuur, oorzaken van koorts en wanneer je naar de dierenarts moet.",
    type: "article",
    images: ["https://images.unsplash.com/photo-1573865526739-10c1de0a7ac5?w=1200&h=630&fit=crop"],
  },
};

export default function BlogPost() {
  const post = {
    title: "Kat heeft koorts: symptomen herkennen en handelen",
    excerpt: "Koorts bij katten is vaak een teken dat er iets niet goed is. Leer hoe je de symptomen herkent, wat de normale lichaamstemperatuur is en wanneer je actie moet ondernemen.",
    slug: "kat-koorts-symptomen",
    categoryName: "Dierengezondheid",
    publishedAt: new Date("2024-12-11"),
    readingTimeMinutes: 8,
    featuredImage: "https://images.unsplash.com/photo-1573865526739-10c1de0a7ac5?w=1200&h=630&fit=crop",
    featuredImageAlt: "Zieke kat ligt rustig op een deken",
    content: `Als je kat zich anders gedraagt dan normaal, warm aanvoelt of lusteloos is, kan koorts de oorzaak zijn. Koorts is een natuurlijke reactie van het immuunsysteem op infecties of ontstekingen. In dit artikel leer je hoe je koorts bij je kat herkent, wat de normale lichaamstemperatuur is en wanneer je hulp moet zoeken.

## Wat is de normale lichaamstemperatuur van een kat?

De normale lichaamstemperatuur van een volwassen kat ligt tussen de 38°C en 39,2°C. Dit is hoger dan bij mensen (36,5-37,5°C), dus een kat voelt normaal gesproken al warmer aan dan jijzelf.

Spreek van koorts bij katten vanaf:
- Lichte koorts: 39,3°C - 40°C
- Matige koorts: 40°C - 41°C
- Hoge koorts: boven 41°C (levensgevaarlijk!)

Wanneer de lichaamstemperatuur boven de 41,5°C stijgt, spreken we van hyperthermie. Dit is een medisch noodgeval waarbij direct ingrijpen noodzakelijk is om hersenbeschadiging of overlijden te voorkomen.

## Herkenbare symptomen van koorts bij katten

Katten zijn meesters in het verbergen van ziekte, maar er zijn duidelijke signalen die wijzen op koorts:

### Gedragsveranderingen

Je kat trekt zich terug in stille, donkere plekken zoals onder het bed of in een kast. Dit is instinctief gedrag om zichzelf te beschermen wanneer ze zich kwetsbaar voelen.

Verminderde activiteit is opvallend - een normaal speelse kat wordt ineens lusteloos en slaapt veel meer dan normaal. Ze springt niet meer op haar favoriete plekjes en vermijdt trappen.

Verandering in eetlust is een belangrijk signaal. De meeste katten met koorts hebben weinig tot geen interesse in voedsel, zelfs niet in hun favoriete traktaties.

### Fysieke symptomen

Warme oren en pootjes voelen aan alsof ze gloeiend zijn. De neus kan warmer en droger aanvoelen dan normaal, hoewel een droge neus op zich niet altijd duidt op ziekte.

Rillen of beven komt voor wanneer de koorts oploopt. Je kat probeert haar lichaam warm te krijgen, vergelijkbaar met koude rillingen bij mensen.

Snelle ademhaling (tachypneu) is te herkennen aan meer dan 40 ademhalingen per minuit in rust. Tel de ademhalingen gedurende 30 seconden en vermenigvuldig met 2.

Verhoogde hartslag gaat vaak gepaard met koorts. Een normale kattenhartslag ligt tussen 120-140 slagen per minuut, bij koorts kan dit oplopen tot 180-220 slagen per minuut.

### Andere waarneembare tekenen

Uitdroging is te herkennen doordat de huid minder elastisch is. Trek voorzichtig wat huid omhoog tussen de schouderbladen - bij een gezonde kat valt dit meteen terug, bij uitdroging blijft het staan.

Doffe vacht en ontstoken ogen kunnen wijzen op een infectie. De derde oogleden (vliesjes in de binnenhoeken) kunnen zichtbaar zijn.

Verandering in urine en ontlasting - donkere, sterk ruikende urine of diarree kunnen gepaard gaan met koorts.

## Oorzaken van koorts bij katten

### Infecties

Bacteriële infecties zoals urineweg infecties, tandvleesontsteking of abcessen door kattenbeten zijn veelvoorkomende oorzaken van koorts. Kattenbeten infecteren snel door de specifieke bacteriën in kattenspeksel.

Virale infecties zoals kattenziekte (Feline Panleukopenia Virus), kattengriep (herpesvirus, calicivirus) of FIV (Feline Immunodeficiency Virus) veroorzaken vaak koorts als eerste symptoom.

Parasitaire infecties door onder andere toxoplasmose of bloedparasieten kunnen langdurige koorts veroorzaken.

### Ontstekingen

Ontstekingen na operaties of verwondingen zijn normale reacties van het lichaam, maar vereisen monitoring om te zorgen dat ze niet uit de hand lopen.

Auto-immuunziekten waarbij het immuunsysteem gezonde cellen aanvalt, zoals SLE (Systemische Lupus Erythematosus).

Chronische ontstekingsziekten zoals IBD (Inflammatory Bowel Disease) veroorzaken vaak lichte, aanhoudende koorts.

### Andere oorzaken

Medicijnreacties op vaccins, antibiotica of pijnstillers kunnen koorts veroorzaken. Dit gebeurt meestal binnen 24-48 uur na toediening.

Tumoren en kanker kunnen "onverklaarde koorts" veroorzaken, vooral lymfomen en leukemie.

Oververhitting door te lang in een warme ruimte of auto blijven, vooral in de zomer.

## Hoe meet je de temperatuur van je kat?

Het meten van de lichaamstemperatuur bij een kat vereist geduld en een goede aanpak:

### Benodigdheden

- Digitale thermometer (bij voorkeur voor dieren)
- Vaseline of glijmiddel
- Handdoek om je kat in te wikkelen indien nodig
- Rustige omgeving zonder andere dieren
- Eventueel een helper

### Stap-voor-stap instructie

Bereid je kat voor door rustig tegen haar te praten en zachtjes te aaien. Kies een moment waarop ze al ontspannen is, niet na spelen of eten.

Wikkel je kat indien nodig losjes in een handdoek, alleen het achterwerk moet vrij blijven. Dit voorkomt krabben en geeft je kat een veilig gevoel.

Smeer de thermometer in met vaseline voor gemakkelijk inbrengen.

Til de staart voorzichtig op en breng de thermometer 1-2 cm in de anus. Doe dit langzaam en stop als je weerstand voelt.

Wacht op het piepsignaal (meestal 30-60 seconden bij digitale thermometers).

Trek de thermometer voorzichtig terug en lees de temperatuur af. Reinig de thermometer grondig met alcohol.

Beloon je kat met een traktatie voor het goede gedrag.

### Let op

Probeer nooit met geweld een temperatuur te meten. Als je kat te gestrest raakt, stop dan en raadpleeg je dierenarts. Maak nooit een rectale temperatuur op als er bloedverlies, diarree of anale problemen zijn.

## Wanneer moet je naar de dierenarts?

### Direct spoedgeval (binnen 1 uur)

- Temperatuur boven 41°C
- Temperatuur boven 40°C die langer dan 2 uur aanhoudt
- Koorts gecombineerd met bloeden, stuipen of bewustzijnsverlies
- Koorts bij kittens jonger dan 4 maanden
- Extreme lethargie waarbij je kat niet op aanraking reageert
- Moeilijk of hijgend ademen
- Blauwe tandvlees of tong (zuurstofgebrek)

### Binnen 24 uur naar de dierenarts

- Temperatuur tussen 39,5°C - 40,5°C die langer dan 12 uur aanhoudt
- Weigering om te eten of te drinken langer dan 24 uur
- Braken of diarree in combinatie met koorts
- Koorts na een kattenbeet of verwonding
- Koorts na vaccinatie die langer dan 48 uur aanhoudt
- Duidelijke pijn of ongemak

### Monitoring thuis mogelijk

- Lichte koorts (39,2°C - 39,5°C) waarbij je kat nog eet en drinkt
- Koorts na vaccinatie binnen 24 uur die stabiel blijft
- Je kat is alert en reageert normaal

Blijf wel elke 4-6 uur de temperatuur meten en monitor gedrag nauwkeurig.

## Eerste hulp bij koorts thuis

Terwijl je wacht op de afspraak met de dierenarts kun je het volgende doen:

### Verkoeling

Zorg voor een koele, rustige omgeving met goede ventilatie. Airconditioning of een ventilator op lage stand kunnen helpen, maar richt de luchtstroom niet direct op je kat.

Vochtige handdoek techniek: Dep je kat voorzichtig met een licht vochtige (niet natte!) handdoek op de pootjes, oksels en lies. Dit zijn gebieden waar de bloedvaten dicht aan de oppervlakte liggen.

Bied koel (niet ijskoud) water aan in meerdere bakjes door het huis.

### Hydratatie

Moedig drinken aan door vers water meerdere keren per dag te verversen. Sommige katten drinken liever stromend water uit een drinkfontein.

Voeg wat waterig nat voer toe aan het dieet om extra vocht binnen te krijgen.

Maak kippenbouillon (zonder ui of zout) en laat dit afkoelen. Sommige katten vinden dit lekkerder dan gewoon water.

### Rust en comfort

Creëer een rustige, donkere plek waar je kat zich kan terugtrekken zonder gestoord te worden door andere huisdieren of drukte.

Bied zachte dekens aan maar geef ook toegang tot koelere oppervlakken zoals tegels.

Beperk stress door routines zo normaal mogelijk te houden en vermijd luide geluiden.

## Wat doet de dierenarts?

Bij een bezoek aan de dierenarts voor koorts wordt een grondige aanpak gevolgd:

### Onderzoek

Een volledig lichamelijk onderzoek waarbij de dierenarts alle orgaansystemen controleert: hart, longen, buik, lymfeklieren, ogen, oren, mond en huid.

Temperatuurmeting ter bevestiging.

Vragen over gedragsveranderingen, eetlust, drinken, plassen en poepen om het grotere plaatje te begrijpen.

### Diagnostiek

Bloedonderzoek (hematologie en biochemie) geeft inzicht in ontstekingswaarden, orgaanfunctie, electrolyt balans en mogelijke infecties.

Urineonderzoek detecteert urineweginfecties, nierproblemen of diabetes.

Röntgenfoto's kunnen nodig zijn bij verdenking op longontsteking of andere interne problemen.

Echografie bij verdenking op tumoren of vocht in lichaamscaviteiten.

### Behandeling

Antibiotica bij bacteriële infecties, meestal breed-spectrum tot de cultuuruitslagen bekend zijn.

Ontstekingsremmers zoals anti-inflammatoire medicijnen of corticosteroïden afhankelijk van de oorzaak.

Infuustherapie bij uitdroging, vaak noodzakelijk wanneer je kat al dagen niet goed eet of drinkt.

Koortswerende medicijnen worden zelden gegeven omdat koorts een nuttig afweermechanisme is. Het wordt alleen toegepast bij levensbedreigende hoge koorts.

Ondersteunende zorg zoals voedingssupplementen, misselijkheidsremmers of pijnstilling.

## Preventie van koorts

Hoewel niet alle koorts te voorkomen is, kun je wel risico's verminderen:

### Vaccinaties

Houd vaccinaties op schema volgens het advies van je dierenarts. Kernvaccinaties beschermen tegen levensbedreigende ziekten die gepaard gaan met ernstige koorts.

### Tandverzorging

Regelmatige tandencontrole en gebitsverzorging voorkomt tandvleesontsteking en tandabcessen, een veel voorkomende oorzaak van koorts bij oudere katten.

Overweeg tandenborstel speciaal voor katten of dentale treats die tandplak verminderen.

### Binnenkat voordelen

Binnenkatten hebben minder kans op verwondingen, kattenbeten en parasitaire infecties die koorts veroorzaken.

Als je kat naar buiten gaat, controleer dan regelmatig op wonden of abcessen, vooral na vechtpartijen.

### Stress vermindering

Chronische stress onderdrukt het immuunsysteem waardoor infecties eerder optreden. Zorg voor een stabiele omgeving met voldoende speelgoed, rustplekken en aandacht.

## Veelgestelde vragen

### Kan ik menselijke koortsmedicijnen aan mijn kat geven?

Absoluut niet! Paracetamol en ibuprofen zijn giftig voor katten en kunnen binnen enkele uren tot leverfalen of bloedproblemen leiden. Zelfs kleine hoeveelheden kunnen dodelijk zijn. Gebruik alleen medicijnen die door je dierenarts zijn voorgeschreven.

### Hoe lang duurt koorts bij katten?

Dat hangt af van de oorzaak. Koorts door vaccinatie verdwijnt meestal binnen 24-48 uur. Bij bacteriële infecties duurt het 3-7 dagen met antibiotica. Virale infecties kunnen 1-2 weken aanhouden. Onbehandeld kan chronische koorts weken tot maanden duren.

### Kan een kat koorts krijgen van stress?

Stress op zich veroorzaakt geen koorts, maar kan het immuunsysteem verzwakken waardoor je kat gevoeliger wordt voor infecties die wel koorts veroorzaken. Chronische stress kan dus indirect bijdragen aan gezondheidsproblemen.

### Is een warme neus altijd een teken van koorts?

Nee, dat is een misvatting. De neustemperatuur varieert gedurende de dag en wordt beïnvloed door activiteit, weersomstandigheden en hydratatie. Een droge, warme neus hoort bij slapende katten. Alleen rectale temperatuurmeting geeft betrouwbare informatie.

### Kan mijn kat koorts overdragen op mensen of andere huisdieren?

Sommige oorzaken van koorts zijn besmettelijk tussen katten (zoals kattengriep), maar katten kunnen zelden infecties overdragen op mensen. Uitzonderingen zijn kattenkrabziekte en in zeldzame gevallen toxoplasmose. Was altijd je handen na contact met een zieke kat en houd zieke dieren gescheiden van andere huisdieren.

## Samenvatting

Koorts bij katten is een belangrijk waarschuwingssignaal dat niet genegeerd mag worden. Door de symptomen tijdig te herkennen - zoals lusteloos gedrag, warme oren, verminderde eetlust en snelle ademhaling - kun je snel handelen. Meet bij verdenking de temperatuur rectaal en raadpleeg bij twijfel altijd je dierenarts, vooral bij temperaturen boven 40°C of koorts bij kittens.

Met de juiste preventie, zoals vaccinaties en tandverzorging, en snelle actie bij ziekte kun je ervoor zorgen dat je kat gezond en gelukkig blijft. Vertrouw op je intuïtie als ervaren kattenhouder - je kent je kat het beste en merkt vaak als eerste wanneer er iets niet goed is.`,
    tags: ["kat koorts", "kat ziek", "temperatuur kat", "dierengezondheid", "symptomen kat", "dierenarts"],
    relatedPosts: [
      {
        slug: "katten-ziektes-herkennen",
        title: "Top 10 kattenziektes die je moet kennen",
        image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=250&fit=crop",
      },
      {
        slug: "eerste-hulp-kat",
        title: "EHBO voor katten: wat elke eigenaar moet weten",
        image: "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=400&h=250&fit=crop",
      },
      {
        slug: "kat-naar-dierenarts",
        title: "Wanneer moet je met je kat naar de dierenarts?",
        image: "https://images.unsplash.com/photo-1607675534049-c9c839e2b7d6?w=400&h=250&fit=crop",
      },
    ],
  };

  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
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

      {/* Featured Image */}
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
            photographerName="Paul Hanaoka"
            photographerUrl="https://unsplash.com/@plhnk"
            source="unsplash"
          />
        </div>
      </div>

      {/* Main Content */}
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
                  } else if (paragraph.startsWith("- ")) {
                    return (
                      <ul key={index} className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                        {paragraph.split("\n").map((item, i) => (
                          <li key={i}>{item.replace(/^- /, "")}</li>
                        ))}
                      </ul>
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

            {/* Tags */}
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

          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-20">
              <BlogSidebarAd sponsorAd={null} />
            </div>
          </aside>
        </div>
      </div>

      {/* Related Posts */}
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

      {/* Schema.org Article markup */}
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
