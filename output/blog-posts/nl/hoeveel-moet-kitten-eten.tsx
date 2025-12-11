/**
 * Blog Post: Hoeveel moet een kitten eten per dag?
 *
 * SEO-optimized Dutch blog post for CutiePawsPedia
 * Topic 30/50 - Category: puppies-kittens
 */

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag } from "lucide-react";
import { PhotoCredit } from "@/components/blog";
import { BlogSidebarAd, BetweenContentAd } from "@/components/ads";
import { EditorialByline } from "@/components/seo";

export const metadata: Metadata = {
  title: "Hoeveel Moet Een Kitten Eten Per Dag? Complete Voedingsschema 2024",
  description: "Leer precies hoeveel een kitten moet eten per dag op basis van leeftijd en gewicht. Inclusief voedingsschema, beste voedingssoorten en veelgemaakte fouten. Complete gids voor kittenvoeding.",
  openGraph: {
    title: "Hoeveel moet een kitten eten per dag?",
    description: "Leer precies hoeveel een kitten moet eten per dag op basis van leeftijd en gewicht. Inclusief voedingsschema en beste voedingssoorten.",
    type: "article",
    images: ["https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&h=630&fit=crop"],
  },
};

export default function BlogPost() {
  const post = {
    title: "Hoeveel moet een kitten eten per dag?",
    excerpt: "De juiste voeding in de eerste levensmaanden bepaalt de gezondheid van je kat voor de rest van zijn leven. Ontdek precies hoeveel, hoe vaak en wat je kitten moet eten op basis van leeftijd en ontwikkelingsfase.",
    slug: "hoeveel-moet-kitten-eten",
    categoryName: "Puppies & Kittens",
    publishedAt: new Date("2024-12-11"),
    readingTimeMinutes: 12,
    featuredImage: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&h=630&fit=crop",
    featuredImageAlt: "Schattig kitten eet uit voerbakje",
    content: `Het opgroeien van een kitten gaat razendsnel. In slechts één jaar transformeert een 100 gram wiegje in een volwassen kat van 3-5 kilo. Deze explosieve groei vereist de juiste voeding in de juiste hoeveelheden op het juiste moment. Te veel voeden leidt tot overgewicht, te weinig belemmert de ontwikkeling. In dit artikel leer je precies hoeveel jouw kitten moet eten.

## Waarom is kittenvoeding anders dan volwassen kattenvoeding?

Kittens hebben specifieke voedingsbehoeften die drastisch verschillen van volwassen katten.

### Hogere caloriebehoefte

Kittens hebben 2-3x meer calorieën nodig per kilogram lichaamsgewicht dan volwassen katten. Een groeiend kitten verbruikt energie voor:
- Celdeling en weefselopbouw
- Botontwikkeling en spierpopulatie
- Immuunsysteem ontwikkeling
- Hersenen en zenuwstelsel vorming
- Spelen en verkennen (kittens zijn hyperactief)

Een 3 maand oud kitten van 1,5 kg heeft ongeveer 300 kcal per dag nodig, terwijl een volwassen kat van 4 kg slechts 240 kcal nodig heeft.

### Hogere eiwitbehoefte

Kittens hebben minimaal 30% eiwit in hun dieet nodig (volwassen katten 26%). Eiwit is essentieel voor spieropbouw, enzymproductie en immuunsysteemontwikkeling.

Kwalitatief dierlijk eiwit (kip, kalkoen, zalm) is cruciaal. Plantaardig eiwit uit granen is voor katten (obligate carnivoren) minder goed verteerbaar en bevat niet alle essentiële aminozuren.

### Specifieke nutriënten voor groei

DHA (docosahexaeenzuur) - Omega-3 vetzuur essentieel voor hersenontwikkeling en zicht. Kittens kunnen dit niet zelf produceren.

Taurine - Essentieel aminozuur voor hart, ogen en reproductie. Tekort leidt tot blindheid en hartproblemen. Kittens hebben 50% meer taurine nodig dan volwassen katten.

Calcium en fosfor - Correcte verhouding (1.2:1) is cruciaal voor botvorming. Te veel calcium belemmert de opname van andere mineralen, te weinig leidt tot zwakke botten.

Vitamine A - Katten kunnen bètacaroteen niet omzetten in vitamine A en moeten dit direct uit voeding halen.

### Kleinere maag, frequenter eten

De maag van een kitten is relatief klein. Ze kunnen niet grote hoeveelheden tegelijk eten zoals volwassen katten. Daarom hebben ze 3-6 kleine maaltijden per dag nodig in plaats van 1-2 grote porties.

## Voedingsschema per leeftijd

### 0-4 weken: Moedermelk periode

In deze fase drinken kittens uitsluitend moedermelk of kittenmelkvervangers.

Natuurlijke moedermelk:
- Ideale samenstelling met antilichamen (colostrum eerste 24-48 uur)
- Kittens drinken 8-12x per dag
- Gewichtstoename: 10-15 gram per dag

Als moedermelk niet beschikbaar is (wees of verworpen):
- Gebruik specifieke kittenmelkvervangers (Royal Canin Babycat Milk, Beaphar Lactol)
- NOOIT koemelk geven (lactose-intolerantie, diarree, dehydratie)
- Voeden met fles elke 2-3 uur, ook 's nachts
- Warming tot 37-38°C (lichaamstemperatuur)

Gewicht monitoring is cruciaal - weeg dagelijks. Normale groei is verdubbeling van geboortegewicht na 7-10 dagen.

### 4-8 weken: Speenperiode

Vanaf week 4 begin je geleidelijk vast voedsel te introduceren terwijl moedermelk nog steeds hoofdvoedsel is.

Week 4-5:
- Introduceer kittenpaté (zeer fijn, zacht)
- Meng met water of kittenmelk tot soep-consistentie
- Aanbieden 3-4x per dag in platte schoteltjes
- Kittens maken rommeltje - dat hoort erbij!
- Moedermelk blijft 70% van voeding

Week 6-7:
- Verhoog vaste voedsel naar 50% van totale voeding
- Dikkere consistentie (minder water)
- Introduceer kleine hoeveelheden zachte kibbles (optioneel)
- 4 maaltijden per dag vaste voedsel
- Moedermelk op aanvraag

Week 8:
- Volledige overstap naar vast voedsel
- Geen moedermelk meer nodig (natuurlijk spenen rond deze tijd)
- 4 maaltijden per dag
- Vrij toegang tot vers water

Dagelijkse hoeveelheid (week 8): 180-220 kcal per dag (ongeveer 50-60 gram droog voer of 150-180 gram nat voer).

### 2-3 maanden: Snelle groei fase

Dit is de fase van explosieve groei. Kittens zijn extreem actief en hun caloriebehoefte is op het hoogst.

Dagelijkse hoeveelheid:
- 1,0 kg kitten: 250 kcal/dag (70g droog of 210g nat)
- 1,5 kg kitten: 330 kcal/dag (95g droog of 280g nat)
- 2,0 kg kitten: 400 kcal/dag (115g droog of 340g nat)

Voedingsfrequentie: 4 maaltijden per dag
- 7:00 uur - ontbijt
- 12:00 uur - lunch
- 17:00 uur - avondeten
- 22:00 uur - late snack

Of: ad libitum (vrije toegang) als je kitten geen neiging tot overeten heeft. Meeste kittens reguleren zelf goed.

### 4-6 maanden: Puberteit en vertraging groei

Groeisnelheid vertraagt lichtjes maar caloriebehoefte blijft hoog.

Dagelijkse hoeveelheid:
- 2,5 kg kitten: 450 kcal/dag (130g droog of 380g nat)
- 3,0 kg kitten: 500 kcal/dag (145g droog or 420g nat)
- 3,5 kg kitten: 540 kcal/dag (155g droog of 460g nat)

Voedingsfrequentie: Reduceren naar 3 maaltijden per dag
- 7:00 uur - ontbijt
- 13:00 uur - lunch
- 19:00 uur - diner

Rond 6 maanden worden kittens geslachtsrijp. Overweeg castratie/sterilisatie. Dit vermindert metabolisme met 20-30%, dus pas voedselhoeveelheid aan na de operatie.

### 7-12 maanden: Overgang naar volwassen voeding

Groei vertraagt verder. Rond 9-12 maanden bereiken de meeste katten 80-90% van volwassen gewicht.

Dagelijkse hoeveelheid:
- 3,5 kg kitten: 480 kcal/dag (140g droog of 400g nat)
- 4,0 kg kitten: 500 kcal/dag (145g droog of 420g nat)
- 4,5 kg kitten: 520 kcal/dag (150g droog of 440g nat)

Voedingsfrequentie: 2-3 maaltijden per dag mogelijk
- Grotere kittens kunnen naar 2 maaltijden
- Kleinere rassen (Singapura, Devon Rex) beter 3 maaltijden

Tussen 10-12 maanden: Geleidelijke overgang naar volwassen kattenvoer:
- Week 1-2: 75% kitten / 25% volwassen
- Week 3-4: 50% kitten / 50% volwassen
- Week 5-6: 25% kitten / 75% volwassen
- Week 7: 100% volwassen voeding

Let op: Grote rassen (Maine Coon, Ragdoll, Noorse Boskat) blijven groeien tot 18-24 maanden en hebben langer kittenvoer nodig.

## Nat voer vs. droog voer vs. gecombineerd

### Nat voer (paté, stukjes in saus/gelei)

Voordelen:
- Hoog vochtgehalte (75-80%) - uitstekend voor hydratie
- Hoger eiwitgehalte, lager koolhydraten
- Smakelijker voor veeleisende eters
- Natuurlijker voor carnivoren
- Helpt voorkomen urinewegproblemen

Nadelen:
- Duurder
- Korter houdbaar na opening (24u koelkast)
- Bederft sneller in voerbak (max 30 min bij kamertemperatuur)
- Tandsteen preventie beperkt

Beste keuze voor: Kittens jonger dan 3 maanden, kittens met voorkeur voor nat voer, dehydratie gevoelige katten.

### Droog voer (kibbles)

Voordelen:
- Goedkoper
- Makkelijker te bewaren en portioneren
- Kan langer in bak blijven staan (geschikt voor ad libitum)
- Helpt tandsteen voorkomen door kauwen

Nadelen:
- Laag vochtgehalte (10%) - risico op dehydratie
- Hoger in koolhydraten (20-40%)
- Sommige kittens eten te snel en braken
- Kan leiden tot overgewicht door calorie dichtheid

Beste keuze voor: Gezonde kittens vanaf 3 maanden met goede drinkgewoonten.

### Gecombineerd (mix van nat en droog)

Dit is de meest aanbevolen optie door veel dierenartsen.

Voorbeeld schema:
- Ochtend: Nat voer (1/3 dagelijkse hoeveelheid)
- Middag: Droog voer (1/3 dagelijkse hoeveelheid)
- Avond: Nat voer (1/3 dagelijkse hoeveelheid)

Of:
- 70% nat voer voor vochtinname en smaak
- 30% droog voer voor tandgezondheid

Voordelen van mix:
- Beste van beide werelden
- Vochtinname gewaarborgd
- Variatie voorkomt veeleisend eetgedrag
- Flexibiliteit in schema

### BARF (biologisch appropriate raw food)

Sommige eigenaren kiezen voor rauwe voeding (rauw vlees, organen, botten).

Let op:
- Risico op bacteriële infecties (Salmonella, E. coli)
- Vereist grondige kennis van voedingsbehoeften
- Moet supplementen bevatten (taurine, calcium)
- Niet aanbevolen voor zeer jonge kittens (<3 maanden)
- Overleg altijd met gespecialiseerde dierenarts

## Hoe bereken je de exacte hoeveelheid?

### Stap 1: Bepaal huidige gewicht

Weeg je kitten wekelijks op nauwkeurige weegschaal. Baby-weegschalen werken perfect voor jonge kittens.

### Stap 2: Bepaal RER (Resting Energy Requirement)

Formule: 70 x (gewicht in kg)^0.75 = RER in kcal

Voorbeeld: 2 kg kitten
70 x (2)^0.75 = 70 x 1.68 = 118 kcal RER

### Stap 3: Pas aan voor groeifactor

Kittens: RER x 2.5 tot 3.0

Voorbeeld: 2 kg kitten
118 kcal x 2.5 = 295 kcal per dag (minimaal)
118 kcal x 3.0 = 354 kcal per dag (zeer actief)

Gemiddeld: 320 kcal per dag voor deze kitten.

### Stap 4: Converteer naar grammage voer

Check voedselverpakking voor kcal per 100g of per cup.

Voorbeeld:
- Droog voer: 380 kcal per 100g
- Voor 320 kcal: (320 / 380) x 100 = 84 gram per dag

- Nat voer: 90 kcal per 100g
- Voor 320 kcal: (320 / 90) x 100 = 356 gram per dag

### Stap 5: Verdeel over maaltijden

84 gram droog / 4 maaltijden = 21 gram per maaltijd
356 gram nat / 4 maaltijden = 89 gram per maaltijd

### Stap 6: Monitor en pas aan

Weeg wekelijks. Gezonde groei:
- 2-4 maanden: 50-100 gram per week
- 4-6 maanden: 30-50 gram per week
- 6-9 maanden: 20-30 gram per week

Te snelle groei? Reduceer 10%. Te langzame groei? Verhoog 10%.

## Body Condition Score (BCS) voor kittens

### Ideaal gewicht (BCS 5/9)

Visueel:
- Duidelijke taille achter de ribben (bovenaanzicht)
- Lichte buikinkeeping (zijaanzicht)

Voelbaar:
- Ribben voelbaar met lichte druk
- Geen dikke vetlaag over ribben
- Buik niet hangend

### Ondergewicht (BCS 1-4/9)

Visueel:
- Ribben duidelijk zichtbaar
- Diepe buikinkeeping
- Geen vetlaag voelbaar

Actie: Verhoog voedsel met 15-20%, dierenarts consult bij BCS 1-2.

### Overgewicht (BCS 6-9/9)

Visueel:
- Geen taille zichtbaar
- Hangende buik
- Afgeronde lichaamsvorm

Voelbaar:
- Ribben moeilijk te voelen door vetlaag

Actie: Reduceer voedsel met 10%, meer speeltijd. Let op: jonge kittens kunnen "mollig" lijken tijdens groeispurts - dit is normaal als BCS niet hoger dan 6 is.

## Veelgemaakte voedingsfouten

### Fout 1: Te vroeg naar volwassen voeding

Volwassen kattenvoer bevat te weinig calorieën en essentiële groeistoffen. Dit leidt tot:
- Groeiachterstand
- Zwakke botten
- Onderdrukt immuunsysteem
- Gedragsproblemen door energie tekort

Gebruik altijd specifiek kittenvoer tot minimaal 10-12 maanden (18 maanden voor grote rassen).

### Fout 2: Ad libitum voeden bij vraatzuchtige kittens

Sommige kittens hebben geen "uit" knop en eten tot ze braken. Dit leidt tot:
- Juvenile obesitas
- Maagdarmproblemen
- Verhoogd risico op diabetes en artritis op latere leeftijd

Oplossing: Portie controle met 3-4 vaste maaltijden per dag.

### Fout 3: Te weinig water aanbieden

Kittens op voornamelijk droog voer hebben veel water nodig maar drinken vaak te weinig omdat ze:
- Geen dorst gevoel ontwikkeld hebben
- Spelend en vergetend zijn
- Water smakeloos vinden

Gevolgen:
- Dehydratie
- Urineweginfecties
- Nierproblemen

Oplossing: Meerdere waterbakken, drinkfontein, nat voer toevoegen, water in voer mengen.

### Fout 4: Melk geven aan kittens

Veel mensen denken dat kittens melk nodig hebben. Dit is onjuist:
- Na spenen verdwijnt lactase enzym (nodig voor melkvertering)
- Koemelk veroorzaakt diarree, buikpijn, dehydratie
- Geen voedingswaarde voor grespeende kittens

Uitzonderingen: Speciale kattenmelk (lactosevrij) kan als traktatie, maar is niet noodzakelijk.

### Fout 5: Mensen voedsel geven

Veel mensen voedsel is giftig of ongezond voor katten:

Giftig:
- Ui en knoflook (beschadigt rode bloedcellen)
- Chocolade (theobromine vergiftiging)
- Druiven/rozijnen (nierfalen)
- Xylitol (kunstmatige zoetstof, dodelijk)
- Avocado (persin toxisch voor katten)

Ongezond:
- Gekruid vlees (zout, kruiden schadelijk)
- Gefrituurde producten (te vet)
- Zuivelproducten (lactose intolerantie)
- Rauwe vis (thiaminase vernietigt vitamine B1)

Veilige traktaties (kleine hoeveelheden):
- Gekookte kip zonder huid/kruiden
- Gekookte vis (zalm, tonijn)
- Gekookt ei

Max 10% van dagelijkse calorieën als traktaties.

### Fout 6: Onregelmatige voedingstijden

Kittens hebben routine nodig:
- Onvoorspelbare voedingstijden veroorzaken stress
- Verhoogd risico op vraatzuchtig gedrag
- Maag-darm problemen

Oplossing: Vaste tijden elke dag, zelfs in weekenden.

## Speciale situaties

### Kittens met diarree

Diarree is veelvoorkomend bij jonge kittens door:
- Voedselwisseling te snel
- Parasitaire infecties
- Bacteriële infecties
- Voedselintolerantie

Actie:
- Handhaafd vochtinname (belangrijk!)
- Gastro-intestinaal dieet van dierenarts
- Kleine, frequente maaltijden
- Dierenarts bij langer dan 24u of bloederige diarree

### Kittens die niet willen eten

Oorzaken:
- Stress (nieuwe omgeving, scheiding van moeder)
- Ziekte (verkoudheid vermindert reukvermogen)
- Voedsel temperatuur (te koud uit koelkast)
- Voedsel niet lekker

Oplossing:
- Verwarm voedsel tot lichaamstemp (37°C)
- Voeg smaakversterkers toe (tonijnsap, kippenbouillon)
- Handfeeding (vinger met paté)
- Meerdere merken/smaken proberen
- Dierenarts als langer dan 12-24u niet eten (kittens kunnen snel leververvetting ontwikkelen)

### Meervoudige kittens (nestgenoten)

Bij meerdere kittens:
- Aparte voerbakken (minimaal 1 per kitten + 1 extra)
- Voldoende afstand tussen bakken (1-2 meter)
- Monitor individuele voedselinname
- Zwakkere kitten mogelijk apart voeren

Let op dominantie - sterkere kitten steelt voedsel van zwakkere. Dit leidt tot groeiverschillen.

### Kitten met allergie/intolerantie

Symptomen:
- Chronische diarree
- Braken
- Huiduitslag, jeuk
- Oorontstekingen
- Haar verlies

Meest voorkomende allergenen:
- Rundvlees
- Zuivel
- Vis
- Tarwe/gluten

Oplossing: Hypoallergeen of hydrolysed protein dieet onder begeleiding dierenarts.

## Water inname en hydratie

Hoeveel water heeft een kitten nodig?
- Vuistregel: 50-60 ml water per kg lichaamsgewicht per dag
- 2 kg kitten: 100-120 ml water per dag

Bij nat voer (75% vocht): Voedsel levert 75% van vocht behoefte
Bij droog voer (10% vocht): Voedsel levert slechts 10% - actief drinken essentieel

### Tips om kittens meer te laten drinken

Waterfontein - Stromend water trekt nieuwsgierige kittens aan. Bonus: houdt water frisser.

Meerdere waterbakken - Plaats bakken op verschillende locaties, niet naast kattenbak of voerbak.

Grote, brede bakken - Katten haten als hun snorharen de rand raken. Wijde, ondiepe bakken werken beter.

Dagelijks vers water - Ververs minimaal 1x per dag, poets bak wekelijks.

Smaak toevoegen - Paar druppels tonijnsap of kippenbouillon (zonder ui/zout) maken water aantrekkelijker.

IJs blokjes - Sommige kittens spelen met ijs en likken eraan.

### Tekenen van dehydratie

- Elasticiteit van huid verminderd (tent test: huid blijft staan)
- Droge tandvlees
- Verzonken ogen
- Lethargie
- Donkere urine

Dehydratie bij kittens is gevaarlijk en vereist spoed veterinaire zorg (infuus).

## Supplementen en vitamines

Bij hoogwaardige commerciële kittenvoeding zijn supplementen meestal niet nodig. Het voer is al compleet gebalanceerd.

Uitzonderingen waar supplementen nuttig kunnen zijn:
- Weeskittens op flesvoeding (multivitamine supplementen)
- Kittens op BARF dieet (calcium, taurine)
- Kittens met malabsorptie aandoeningen

Gevaarlijke supplementen:
- Teveel calcium (botten groeiafwijkingen)
- Teveel vitamine A (bot deformities)
- Teveel vitamine D (calcium opname probleem)

Overleg altijd met dierenarts voordat je supplementen geeft. More is not better - overmatige vitamines kunnen toxisch zijn.

## Wanneer naar de dierenarts?

Consulteer dierenarts bij:
- Geen gewichtstoename na 1 week
- Gewichtsverlies
- Weigering eten langer dan 12-24 uur
- Braken meer dan 2x per dag
- Diarree langer dan 24 uur of bloederig
- Lethargie, niet spelen
- Opgezette buik
- Moeilijk ademen

Jonge kittens kunnen snel achteruit gaan bij ziekte. Vroege interventie is cruciaal.

## Veelgestelde vragen

### Kan ik mijn kitten te veel voeren?

Bij zeer jonge kittens (<4 maanden) is dit zeldzaam omdat ze zeer actief metabolisme hebben. Vanaf 4-6 maanden kan overvoeding leiden tot obesitas. Monitor BCS wekelijks en pas aan indien nodig. Sommige rassen (British Shorthair, Ragdoll) zijn gevoeliger voor overgewicht.

### Moet ik 's nachts voeren?

Bij kittens jonger dan 4 weken: ja, elke 2-3 uur inclusief 's nachts met flesvoeding. Vanaf 8 weken: niet nodig. Je laatste voeding kan rond 22:00-23:00 uur, dan slapen ze door tot 7:00 uur. Bij aanhoudend nachtelijk maauwen: mogelijk te weinig calorieën overdag of gedragsprobleem.

### Hoe lang kan een kitten zonder eten?

Kittens jonger dan 6 weken: Niet langer dan 4-6 uur zonder gevaarlijke hypoglykemie. Kittens 2-6 maanden: Max 12-24 uur voor risico op leververvetting (hepatische lipidose). Weiger voer langer dan dit is veterinaire spoedgeval.

### Mijn kitten eet te snel en braakt. Wat nu?

Oplossingen: Gebruik langzaam voer bakken (met obstakels), verdeel maaltijden in kleinere porties meer frequent, maak brokken nat zodat ze opzwellen voor inname in plaats van in maag, voer kittens apart als er competitie is met nestgenoten. Bij aanhoudend braken (>2x per week): dierenarts consult.

### Wanneer overstappen van kitten naar volwassen voeding?

Meeste katten: 10-12 maanden. Grote rassen (Maine Coon, Ragdoll, Noorse Boskat, Savannah): 15-18 maanden. Doe geleidelijke overgang over 3-4 weken door mengen. Let op gewicht en energie level - te vroege switch kan groeistop veroorzaken.

## Samenvatting

Correcte kittenvoeding is fundamenteel voor levenslange gezondheid. Kittens hebben 2-3x meer calorieën nodig per kg lichaamsgewicht dan volwassen katten, met minimaal 30% eiwit en specifieke nutriënten zoals DHA, taurine, en calcium in juiste verhoudingen.

Voedingshoeveelheid varieert per leeftijd: van 250 kcal/dag voor een 2-maanden oude kitten tot 500+ kcal/dag voor een 6-maanden oude kitten. Gebruik de formule RER x 2.5-3.0 om exacte behoefte te berekenen, en pas aan op basis van wekelijkse gewichtscontrole.

Combinatie van nat voer (voor hydratie) en droog voer (voor tandgezondheid) wordt door de meeste dierenartsen aanbevolen. Vermijd algemene fouten zoals te vroeg overstappen naar volwassen voer, onvoldoende water, en mensen voedsel geven.

Monitor je kitten wekelijks met BCS, zorg voor vaste voedingstijden en raadpleeg een dierenarts bij twijfel over groei of gezondheid. Met de juiste voeding leg je de basis voor een lang en gezond kattenleven.`,
    tags: ["kitten voeding", "kitten eten", "kitten voedingsschema", "kittenvoer", "hoeveel voer kitten", "gezonde kitten"],
    relatedPosts: [
      {
        slug: "kitten-opvoeding-basis",
        title: "Complete gids voor kitten opvoeding: eerste weken thuis",
        image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&h=250&fit=crop",
      },
      {
        slug: "kitten-zindelijk-maken",
        title: "Kitten zindelijk maken: stap-voor-stap uitleg",
        image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=250&fit=crop",
      },
      {
        slug: "beste-kattenvoer",
        title: "Het beste kattenvoer: complete koopgids 2024",
        image: "https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2?w=400&h=250&fit=crop",
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
            photographerName="Jie Qi"
            photographerUrl="https://unsplash.com/@jiehao"
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
