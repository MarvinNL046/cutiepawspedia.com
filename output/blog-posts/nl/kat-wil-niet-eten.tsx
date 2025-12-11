import Image from "next/image";
import Link from "next/link";
import { PhotoCredit } from "@/components/blog/PhotoCredit";
import { BetweenContentAd } from "@/components/ads/AdSlot";
import { BlogSidebarAd } from "@/components/ads/BlogSidebarAd";
import { Calendar, Clock, Tag } from "lucide-react";

export const metadata = {
  title: "Kat wil niet eten: 6 redenen en wat je kunt doen | CutiePawsPedia",
  description: "Is je kat plotseling gestopt met eten? Ontdek de 6 meest voorkomende oorzaken, wanneer het ernstig is en effectieve oplossingen om je kat weer aan het eten te krijgen.",
  keywords: ["kat eet niet", "kat geen eetlust", "kat weigert eten", "kat wil niet eten", "anorexie kat"],
  openGraph: {
    title: "Kat wil niet eten: 6 redenen en wat je kunt doen",
    description: "Complete gids over eetlustverlies bij katten: van stress tot ziekte. Herken alarmsignalen en help je kat weer gezond eten.",
    type: "article",
    publishedTime: "2025-12-11T10:00:00Z",
    authors: ["CutiePawsPedia Team"],
  },
};

export default function KatWilNietEtenArticle() {
  return (
    <article className="min-h-screen bg-cpCream dark:bg-cpCharcoal">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full">
        <Image
          src="https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?q=80&w=2000"
          alt="Kat die niet wil eten kijkt naar voerbak"
          fill
          className="object-cover"
          priority
        />
        <PhotoCredit
          photographerName="Paul Hanaoka"
          photographerUrl="https://unsplash.com/@plhnk"
          source="unsplash"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cpCharcoal/80 via-cpCharcoal/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto max-w-4xl">
            <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-cpCharcoal dark:text-cpCream bg-cpCoral rounded-full">
              Huisdiervoeding
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-cpCream mb-4">
              Kat wil niet eten: 6 redenen en wat je kunt doen
            </h1>
            <div className="flex flex-wrap gap-4 text-cpCream/80 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                11 december 2025
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                9 min leestijd
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
                Je kat loopt langs zijn voerbak zonder een hap te nemen. De lekkerste natvoer blijft onaangeroerd. Voor kattenbaasjes is dit een van de meest zorgwekkende situaties – want katten kunnen niet lang zonder eten. Zelfs 24-48 uur vasten kan ernstige gezondheidsproblemen veroorzaken.
              </p>

              <p>
                Maar waarom weigert je kat ineens te eten? In deze gids bespreken we de 6 meest voorkomende oorzaken van eetlustverlies bij katten, leer je alarmsignalen herkennen en ontdek je wat je kunt doen om je kat weer aan het eten te krijgen.
              </p>

              <div className="bg-cpAmber/10 dark:bg-cpAmber/20 border-l-4 border-cpAmber rounded-r-lg p-6 my-8">
                <h3 className="text-lg font-semibold text-cpCharcoal dark:text-cpCream mt-0 mb-2">
                  🚨 Waarschuwing: lever lipidose
                </h3>
                <p className="mb-0">
                  Katten die langer dan 24-48 uur niet eten, lopen risico op <strong>hepatische lipidose</strong> (leververvetting) – een levensbedreigende aandoening. Dit geldt vooral voor overgewicht katten. Wacht niet te lang met een bezoek aan de dierenarts!
                </p>
              </div>

              <h2>Waarom is eetlustverlies bij katten zo gevaarlijk?</h2>

              <p>
                In tegenstelling tot honden kunnen katten niet lang zonder voedsel. Hun metabolisme is zo ingesteld dat bij gebrek aan voedsel het lichaam snel vet mobiliseert. Bij katten kan dit leiden tot:
              </p>

              <ul>
                <li><strong>Hepatische lipidose:</strong> Vet stapelt zich op in de lever, wat leverfalen veroorzaakt</li>
                <li><strong>Hypoglykemie:</strong> Gevaarlijk lage bloedsuikerspiegel</li>
                <li><strong>Dehydratie:</strong> Katten halen veel vocht uit hun voer</li>
                <li><strong>Immuunsuppressie:</strong> Verzwakte afweer</li>
                <li><strong>Spierverlies:</strong> Lichaam breekt spierweefsel af voor energie</li>
              </ul>

              <p>
                <strong>Belangrijk:</strong> Als je kat langer dan 24 uur niet eet (of zelfs minder bij kittens), neem dan contact op met je dierenarts.
              </p>

              <h2>De 6 meest voorkomende redenen waarom katten niet eten</h2>

              <h3>1. Ziekte of pijn</h3>

              <p>
                <strong>Medische problemen</strong> zijn de belangrijkste oorzaak van acuut eetlustverlies bij katten. Veel ziektes veroorzaken misselijkheid, pijn of ongemak waardoor katten stoppen met eten.
              </p>

              <p><strong>Mogelijke medische oorzaken:</strong></p>
              <ul>
                <li><strong>Tandproblemen:</strong> Tandvleesontsteking, tandabces, FORL (katten-cariës)</li>
                <li><strong>Infecties:</strong> Bovenste luchtwegen (kattenverkoudheid), koorts</li>
                <li><strong>Maag-darmproblemen:</strong> IBD, pancreatitis, obstipatie</li>
                <li><strong>Nierziekte:</strong> Chronische nierinsufficiëntie (veel bij oudere katten)</li>
                <li><strong>Hyperthyreoïdie:</strong> Overactieve schildklier (vaak met gewichtsverlies)</li>
                <li><strong>Diabetes:</strong> Onbehandelde suikerziekte</li>
                <li><strong>Kanker:</strong> Tumoren in mond, maag of darmen</li>
              </ul>

              <p><strong>Herkenbare signalen:</strong></p>
              <ul>
                <li>Lethargie, apathie of zich verstoppen</li>
                <li>Braken of diarree</li>
                <li>Excessief kwijlen of poten tegen mond vegen</li>
                <li>Gewichtsverlies</li>
                <li>Veranderde urinerings- of drinkgedrag</li>
                <li>Moeilijk kauwen of eten uit bek laten vallen</li>
              </ul>

              <p><strong>Wat te doen:</strong> Bij aanwezigheid van deze symptomen, direct naar de dierenarts voor diagnostiek.</p>

              <BetweenContentAd sponsorAd={null} />

              <h3>2. Stress en angst</h3>

              <p>
                Katten zijn <strong>zeer gevoelig voor stress</strong> en veranderingen in hun omgeving. Stress beïnvloedt hun eetlust vaak als eerste.
              </p>

              <p><strong>Veelvoorkomende stressoren:</strong></p>
              <ul>
                <li>Verhuizing of verbouwing</li>
                <li>Nieuwe huisgenoot (mens of dier)</li>
                <li>Verandering in dagelijkse routine</li>
                <li>Bezoek aan de dierenarts of cattery</li>
                <li>Luid lawaai (vuurwerk, bouwwerkzaamheden)</li>
                <li>Conflict met andere huisdieren</li>
                <li>Verandering van voer of voerbak locatie</li>
              </ul>

              <p><strong>Herkenbare signalen:</strong></p>
              <ul>
                <li>Verstop gedrag (onder bed, in kast)</li>
                <li>Overmatig zelf verzorgen of juist verwaarlozing</li>
                <li>Veranderde toilet gewoonten</li>
                <li>Agressief of overdreven schrikachtig gedrag</li>
                <li>Veelvuldig miauwen</li>
              </ul>

              <p><strong>Wat te doen:</strong></p>
              <ul>
                <li>Bied een veilige, rustige plek met voer en water</li>
                <li>Gebruik Feliway (synthetische gezichtferomonen)</li>
                <li>Handhaaf routine waar mogelijk</li>
                <li>Geef extra aandacht en geruststelling</li>
                <li>Bij aanhoudende stress: gedragsdeskundige raadplegen</li>
              </ul>

              <h3>3. Voervoorkeur en kieskeurigheid</h3>

              <p>
                Katten staan bekend om hun <strong>kieskeurige eetgedrag</strong>. Soms weigeren ze plots hun favoriete voer of accepteren ze geen nieuwe smaak.
              </p>

              <p><strong>Waarom katten kieskeurig zijn:</strong></p>
              <ul>
                <li>Evolutionair zijn katten verplichte carnivoren met specifieke voorkeuren</li>
                <li>Zeer gevoelig voor geur, textuur en temperatuur van voer</li>
                <li>"Neofobia" – argwaan tegenover nieuwe dingen</li>
                <li>Slecht geworden of bedorven voer (katten ruiken dit direct)</li>
                <li>Te snel van voermerk gewisseld</li>
              </ul>

              <p><strong>Wat te doen:</strong></p>
              <ul>
                <li>Warm natvoer licht op (lichaamstemperatuur verhoogt geur)</li>
                <li>Probeer verschillende texturen (paté, mousse, stukjes)</li>
                <li>Mix oud en nieuw voer bij overstap (geleidelijk over 7-10 dagen)</li>
                <li>Voeg smaakversterkers toe (beetje tonijnsap, kattensnoepjes)</li>
                <li>Vers voer 2-3x per dag (katten prefereren vers boven oud voer)</li>
                <li>Controleer vervaldatum en bewaartemperatuur</li>
              </ul>

              <div className="bg-cpCoral/10 dark:bg-cpCoral/20 border-l-4 border-cpCoral rounded-r-lg p-6 my-8">
                <h3 className="text-lg font-semibold text-cpCharcoal dark:text-cpCream mt-0 mb-2">
                  💡 Pro tip: voerbak hygiëne
                </h3>
                <p className="mb-0">
                  Katten zijn zeer reinlijke dieren. Een vieze voerbak of bak met restlucht van schoonmaakmiddel kan reden zijn om niet te eten. Was voerbakken dagelijks met water en milde zeep, spoel goed na.
                </p>
              </div>

              <BetweenContentAd sponsorAd={null} />

              <h3>4. Verminderde reukzin</h3>

              <p>
                De <strong>reukzin</strong> is cruciaal voor de eetlust van katten. Als ze niet kunnen ruiken, eten ze vaak niet.
              </p>

              <p><strong>Oorzaken van verminderd reukvermogen:</strong></p>
              <ul>
                <li>Bovenste luchtweginfectie (kattenverkoudheid)</li>
                <li>Verstopte neus door allergieën</li>
                <li>Nasale polypen of tumoren</li>
                <li>Ouderdom (natuurlijke achteruitgang reukzin)</li>
              </ul>

              <p><strong>Wat te doen:</strong></p>
              <ul>
                <li>Warm voer op om geur te versterken</li>
                <li>Gebruik zeer geurig voer (vis, lever)</li>
                <li>Stoom neus vrij met warme douche (kat in badkamer, niet onder douche)</li>
                <li>Houd neusgaten schoon met vochtige doek</li>
                <li>Bij infectie: antibiotica via dierenarts</li>
              </ul>

              <h3>5. Vaccins en medicatie</h3>

              <p>
                <strong>Bijwerkingen van vaccins of medicatie</strong> kunnen tijdelijk eetlustverlies veroorzaken.
              </p>

              <p><strong>Veelvoorkomende triggers:</strong></p>
              <ul>
                <li>Recente vaccinatie (normaal 24-48 uur)</li>
                <li>Antibiotica (maagklachten, smaakverandering)</li>
                <li>Pijnstillers of ontstekingsremmers</li>
                <li>Wormmiddelen</li>
                <li>Verdoving na operatie</li>
              </ul>

              <p><strong>Wat te doen:</strong></p>
              <ul>
                <li>Als dit binnen 48 uur na vaccinatie gebeurt, monitor nauwlettend</li>
                <li>Bied zacht, smakelijk voer aan</li>
                <li>Overleg met dierenarts of medicatie met voer gemengd kan worden</li>
                <li>Bij aanhoudend eetlustverlies (>48 uur): terugkeren naar dierenarts</li>
              </ul>

              <h3>6. Veranderingen in de eetomgeving</h3>

              <p>
                Katten hechten waarde aan <strong>consistentie en veiligheid</strong> tijdens het eten.
              </p>

              <p><strong>Mogelijke problemen:</strong></p>
              <ul>
                <li>Voerbak verplaatst (te dicht bij kattenbak of drukte)</li>
                <li>Nieuwe voerbak van ander materiaal</li>
                <li>Concurrentie met andere huisdieren</li>
                <li>Lawaaierige omgeving (wasmachine, kinderen)</li>
                <li>Oncomfortabele voerbak (te diep, te nauw)</li>
              </ul>

              <p><strong>Ideale voersituatie:</strong></p>
              <ul>
                <li>Rustige, veilige plek weg van kattenbak (minimaal 1-2 meter)</li>
                <li>Apart voeren bij meerdere katten (voorkom competitie)</li>
                <li>Brede, ondiepe bak (snorhaartjes mogen rand niet raken)</li>
                <li>Consistent tijdstip voor maaltijden</li>
                <li>Schoon water altijd beschikbaar (apart van voer)</li>
              </ul>

              <BetweenContentAd sponsorAd={null} />

              <h2>Stap-voor-stap plan: kat weer aan het eten krijgen</h2>

              <p>
                Als je hebt vastgesteld dat er geen acute medische noodtoestand is, probeer dan deze stappen:
              </p>

              <h3>Fase 1: Eerste 24 uur</h3>
              <ol>
                <li><strong>Observeer:</strong> Let op andere symptomen (braken, lethargie, pijn)</li>
                <li><strong>Temperatuur check:</strong> Normale temperatuur kat is 38-39°C</li>
                <li><strong>Bied verschillende opties:</strong> Natvoer, brokjes, verschillende smaken</li>
                <li><strong>Warm voer licht op:</strong> Tot lichaamstemperatuur voor betere geur</li>
                <li><strong>Monitor water inname:</strong> Zorg dat kat blijft drinken</li>
              </ol>

              <h3>Fase 2: Na 24 uur (als kat nog steeds niet eet)</h3>
              <ol>
                <li><strong>Contact dierenarts:</strong> Maak afspraak voor check-up</li>
                <li><strong>Probeer "irresistible" voer:</strong> Tonijn, gebakken kip, babyvoeding (zonder ui/knoflook)</li>
                <li><strong>Hand voeren:</strong> Kleine beetjes op vinger aanbieden</li>
                <li><strong>Gebruik geur-triggers:</strong> Voeg beetje visbouillon toe (zonder zout)</li>
                <li><strong>Creëer positieve associaties:</strong> Rustig praten, aaien tijdens aanbieden</li>
              </ol>

              <h3>Fase 3: Bij de dierenarts</h3>
              <p>Je dierenarts kan:</p>
              <ul>
                <li>Lichamelijk onderzoek uitvoeren</li>
                <li>Bloedonderzoek doen (nier-, lever- en schildklierfunctie)</li>
                <li>Mond- en tandcontrole</li>
                <li>Eetluststimulerende medicatie voorschrijven (mirtazapine, maropitant)</li>
                <li>Infuus geven bij dehydratie</li>
                <li>In extreme gevallen: voedingssonde plaatsen</li>
              </ul>

              <h2>Preventietips: gezonde eetgewoontes stimuleren</h2>

              <ul>
                <li>✅ <strong>Vaste routine:</strong> Voer op vaste tijden (2-3x per dag)</li>
                <li>✅ <strong>Verse voer:</strong> Verwijder onaangeroerd voer na 30 minuten</li>
                <li>✅ <strong>Kwaliteitsvoer:</strong> Vlees als eerste ingrediënt, minimaal bijproducten</li>
                <li>✅ <strong>Portieontrole:</strong> Voorkom overgewicht (maakt lipidose risico hoger)</li>
                <li>✅ <strong>Stressreductie:</strong> Rustige eetomgeving, meerdere voerplekken bij meerdere katten</li>
                <li>✅ <strong>Regelmatige check-ups:</strong> Jaarlijkse controle bij dierenarts, vaker bij senior katten</li>
                <li>✅ <strong>Mentale stimulatie:</strong> Gebruik voerpuzzels voor activiteit</li>
              </ul>

              <h2>Veelgestelde vragen</h2>

              <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 mb-4">
                <summary className="font-semibold text-cpCharcoal dark:text-cpCream cursor-pointer">
                  Hoelang kan een kat zonder eten?
                </summary>
                <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80">
                  Gezonde volwassen katten kunnen technisch 1-2 weken overleven zonder voedsel, maar levensbedreigende complicaties (hepatische lipidose) kunnen al optreden na 2-3 dagen. Neem altijd contact op met de dierenarts als je kat langer dan 24 uur niet eet.
                </p>
              </details>

              <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 mb-4">
                <summary className="font-semibold text-cpCharcoal dark:text-cpCream cursor-pointer">
                  Mijn kat eet alleen snoepjes, geen normaal voer. Wat nu?
                </summary>
                <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80">
                  Dit is een veelvoorkomend probleem. Stop met snoepjes geven en bied alleen regulier voer aan. Katten kunnen "honger-staking" houden, maar zullen uiteindelijk eten als ze honger krijgen (monitor wel goed en bezoek dierenarts na 24 uur). Overleg eventueel over geleidelijke afbouw met gemengd voer.
                </p>
              </details>

              <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 mb-4">
                <summary className="font-semibold text-cpCharcoal dark:text-cpCream cursor-pointer">
                  Is het normaal dat mijn kat na castratie niet eet?
                </summary>
                <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80">
                  Ja, het is normaal dat katten de eerste 12-24 uur na een operatie minder eetlust hebben door de verdoving en stress. Bied zacht, smakelijk voer aan. Als je kat na 24 uur nog steeds niet eet, neem dan contact op met de dierenarts.
                </p>
              </details>

              <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 mb-4">
                <summary className="font-semibold text-cpCharcoal dark:text-cpCream cursor-pointer">
                  Kan ik mijn kat dwangvoeden?
                </summary>
                <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80">
                  Dwangvoeden wordt afgeraden en kan gevaarlijk zijn (aspiratie-risico). Alleen een dierenarts kan veilig dwangvoeden met spuitvoeding of via een voedingssonde. Focus op het aantrekkelijk maken van voer en elimineer onderliggende oorzaken.
                </p>
              </details>

              <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 mb-4">
                <summary className="font-semibold text-cpCharcoal dark:text-cpCream cursor-pointer">
                  Mijn oude kat eet steeds minder. Is dat normaal?
                </summary>
                <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80">
                  Geleidelijke afname van eetlust kan voorkomen bij senior katten, maar is NIET normaal en moet altijd onderzocht worden. Oudere katten zijn gevoelig voor nierziekte, hyperthyreoïdie en tandproblemen. Plan een veterinair onderzoek inclusief bloedwerk.
                </p>
              </details>

              <h2>Conclusie: luister naar je kat</h2>

              <p>
                Eetlustverlies bij katten is altijd een waarschuwingssignaal dat je serieus moet nemen. Of het nu gaat om ziekte, stress of kieskeurigheid – vroege interventie kan het verschil maken tussen een klein probleem en een levensbedreigende situatie.
              </p>

              <p>
                Vertrouw op je intuïtie als katteneigenaar. Jij kent je kat het beste en weet wanneer iets niet klopt. Bij twijfel: neem contact op met je dierenarts. Het is beter om een keer te veel te bellen dan te laat.
              </p>

              <p>
                💙 <em>Jouw kat rekent op jou om zijn gezondheid te bewaken. Wees alert, handel snel en samen vind je de oplossing!</em>
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-cpCharcoal/10 dark:border-cpCream/10">
                <Tag className="w-4 h-4 text-cpCharcoal/60 dark:text-cpCream/60" />
                <span className="text-sm text-cpCharcoal/60 dark:text-cpCream/60">Tags:</span>
                <Link href="/nl/gids/huisdiervoeding" className="text-sm px-3 py-1 bg-cpCoral/10 hover:bg-cpCoral/20 dark:bg-cpCoral/20 dark:hover:bg-cpCoral/30 text-cpCharcoal dark:text-cpCream rounded-full transition-colors">
                  Huisdiervoeding
                </Link>
                <Link href="/nl/gids/dierengezondheid" className="text-sm px-3 py-1 bg-cpCoral/10 hover:bg-cpCoral/20 dark:bg-cpCoral/20 dark:hover:bg-cpCoral/30 text-cpCharcoal dark:text-cpCream rounded-full transition-colors">
                  Dierengezondheid
                </Link>
                <span className="text-sm px-3 py-1 bg-cpCoral/10 text-cpCharcoal dark:bg-cpCoral/20 dark:text-cpCream rounded-full">
                  Kattengezondheid
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
                  href="/nl/gids/huisdiervoeding/kattenvoeding-kiezen"
                  className="block p-6 bg-cpSurface dark:bg-cpCharcoal/50 rounded-xl hover:shadow-lg transition-all border border-cpCharcoal/5 dark:border-cpCream/5 hover:border-cpCoral/20"
                >
                  <h4 className="font-semibold text-cpCharcoal dark:text-cpCream mb-2">
                    Het juiste kattenvoer kiezen: complete gids
                  </h4>
                  <p className="text-sm text-cpCharcoal/70 dark:text-cpCream/70">
                    Ontdek welk voer het beste past bij jouw kat op basis van leeftijd, gezondheid en levensstijl.
                  </p>
                </Link>

                <Link
                  href="/nl/gids/dierengezondheid/stress-bij-katten"
                  className="block p-6 bg-cpSurface dark:bg-cpCharcoal/50 rounded-xl hover:shadow-lg transition-all border border-cpCharcoal/5 dark:border-cpCream/5 hover:border-cpCoral/20"
                >
                  <h4 className="font-semibold text-cpCharcoal dark:text-cpCream mb-2">
                    Stress bij katten herkennen en verminderen
                  </h4>
                  <p className="text-sm text-cpCharcoal/70 dark:text-cpCream/70">
                    Leer de signalen van stress bij katten en effectieve oplossingen om je kat te kalmeren.
                  </p>
                </Link>

                <Link
                  href="/nl/gids/dierengezondheid/nierziekte-bij-katten"
                  className="block p-6 bg-cpSurface dark:bg-cpCharcoal/50 rounded-xl hover:shadow-lg transition-all border border-cpCharcoal/5 dark:border-cpCream/5 hover:border-cpCoral/20"
                >
                  <h4 className="font-semibold text-cpCharcoal dark:text-cpCream mb-2">
                    Nierziekte bij katten: herkennen en behandelen
                  </h4>
                  <p className="text-sm text-cpCharcoal/70 dark:text-cpCream/70">
                    Alles over chronische nierinsufficiëntie bij katten en hoe je de levenskwaliteit kunt verbeteren.
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
                    Waarom zo gevaarlijk?
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    6 redenen
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Actieplan
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Preventie
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Veelgestelde vragen
                  </a>
                </nav>
              </div>

              {/* Popular Categories */}
              <div className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-xl p-6 border border-cpCharcoal/5 dark:border-cpCream/5">
                <h3 className="font-semibold text-cpCharcoal dark:text-cpCream mb-4">
                  Populaire categorieën
                </h3>
                <div className="space-y-2">
                  <Link href="/nl/gids/huisdiervoeding" className="block text-cpCoral hover:text-cpAmber transition-colors text-sm">
                    → Huisdiervoeding
                  </Link>
                  <Link href="/nl/gids/dierengezondheid" className="block text-cpCoral hover:text-cpAmber transition-colors text-sm">
                    → Dierengezondheid
                  </Link>
                  <Link href="/nl/gids/kattenverzorging" className="block text-cpCoral hover:text-cpAmber transition-colors text-sm">
                    → Kattenverzorging
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
            "headline": "Kat wil niet eten: 6 redenen en wat je kunt doen",
            "description": "Is je kat plotseling gestopt met eten? Ontdek de 6 meest voorkomende oorzaken, wanneer het ernstig is en effectieve oplossingen om je kat weer aan het eten te krijgen.",
            "image": "https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?q=80&w=2000",
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
              "@id": "https://cutiepawspedia.nl/nl/blog/kat-wil-niet-eten"
            },
            "keywords": "kat eet niet, kat geen eetlust, kat weigert eten, kat wil niet eten, anorexie kat",
            "articleSection": "Huisdiervoeding",
            "wordCount": 1950
          })
        }}
      />
    </article>
  );
}
