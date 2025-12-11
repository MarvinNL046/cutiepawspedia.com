import Image from "next/image";
import Link from "next/link";
import { PhotoCredit } from "@/components/blog/PhotoCredit";
import { BetweenContentAd } from "@/components/ads/AdSlot";
import { BlogSidebarAd } from "@/components/ads/BlogSidebarAd";
import { Calendar, Clock, Tag } from "lucide-react";

export const metadata = {
  title: "Hond heeft last van jeuk: 8 oorzaken en behandelingen | CutiePawsPedia",
  description: "Waarom krabt je hond de hele tijd? Ontdek de 8 meest voorkomende oorzaken van jeuk bij honden, herken de symptomen en leer effectieve behandelingen kennen.",
  keywords: ["hond jeuk", "hond krabt veel", "hond allergie", "jeukende hond", "huidproblemen hond"],
  openGraph: {
    title: "Hond heeft last van jeuk: 8 oorzaken en behandelingen",
    description: "Complete gids over jeuk bij honden: van voedselallergieën tot parasieten. Herken de oorzaak en vind de juiste oplossing.",
    type: "article",
    publishedTime: "2025-12-11T10:00:00Z",
    authors: ["CutiePawsPedia Team"],
  },
};

export default function HondJeukArticle() {
  return (
    <article className="min-h-screen bg-cpCream dark:bg-cpCharcoal">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full">
        <Image
          src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2000"
          alt="Hond krabt aan oor vanwege jeuk"
          fill
          className="object-cover"
          priority
        />
        <PhotoCredit
          photographerName="Karsten Winegeart"
          photographerUrl="https://unsplash.com/@karsten116"
          source="unsplash"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cpCharcoal/80 via-cpCharcoal/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto max-w-4xl">
            <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-cpCharcoal dark:text-cpCream bg-cpCoral rounded-full">
              Dierengezondheid
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-cpCream mb-4">
              Hond heeft last van jeuk: 8 oorzaken en behandelingen
            </h1>
            <div className="flex flex-wrap gap-4 text-cpCream/80 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                11 december 2025
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                10 min leestijd
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
                Zie je jouw hond constant krabben, bijten aan zijn poten of zich tegen het meubilair schuren? Jeuk bij honden is een van de meest voorkomende redenen waarom baasjes naar de dierenarts gaan. Het is frustrerend voor je hond én voor jou – want wie wil nu zijn beste vriend zien lijden?
              </p>

              <p>
                Het goede nieuws: jeuk is bijna altijd te behandelen zodra je de onderliggende oorzaak kent. In deze uitgebreide gids bespreken we de 8 meest voorkomende oorzaken van jeuk bij honden, hoe je ze herkent en welke behandelingen echt werken.
              </p>

              <div className="bg-cpAmber/10 dark:bg-cpAmber/20 border-l-4 border-cpAmber rounded-r-lg p-6 my-8">
                <h3 className="text-lg font-semibold text-cpCharcoal dark:text-cpCream mt-0 mb-2">
                  ⚠️ Wanneer direct naar de dierenarts?
                </h3>
                <p className="mb-0">
                  Ga direct naar de dierenarts als je hond: kale plekken heeft, open wonden krabt, bloederige huid heeft, zichtbaar ongemak of pijn toont, of als de jeuk gepaard gaat met andere symptomen zoals braken, diarree of lethargie.
                </p>
              </div>

              <h2>Waarom krabt mijn hond zo veel? De 8 hoofdoorzaken</h2>

              <h3>1. Vlooien – de nummer één boosdoener</h3>

              <p>
                <strong>Vlooien</strong> zijn verantwoordelijk voor ongeveer 50% van alle jeukklachten bij honden. Eén enkele vlooienbeet kan bij gevoelige honden al een allergische reactie veroorzaken die dagen aanhoudt.
              </p>

              <p><strong>Symptomen:</strong></p>
              <ul>
                <li>Intense jeuk vooral bij de staartwortel, buik en liezen</li>
                <li>Kleine zwarte puntjes in de vacht (vlooienpoep)</li>
                <li>Rode, geïrriteerde huid met mogelijke korsties</li>
                <li>Haaruitval door krabben</li>
              </ul>

              <p><strong>Behandeling:</strong></p>
              <ul>
                <li>Gebruik effectieve vlooienbehandeling (Nexgard, Bravecto, Simparica)</li>
                <li>Behandel ALLE huisdieren in huis</li>
                <li>Was beddengoed en stofzuig grondig (ook de auto!)</li>
                <li>Overweeg behandeling van de omgeving bij zware infestaties</li>
              </ul>

              <BetweenContentAd sponsorAd={null} />

              <h3>2. Voedselallergie of -intolerantie</h3>

              <p>
                Een <strong>voedselallergie</strong> ontwikkelt zich meestal geleidelijk en kan op elke leeftijd ontstaan, zelfs voor voer dat je hond al jaren eet.
              </p>

              <p><strong>Symptomen:</strong></p>
              <ul>
                <li>Chronische jeuk aan oren, poten, gezicht en buik</li>
                <li>Terugkerende oorontstekingen</li>
                <li>Maag-darmproblemen (diarree, braken)</li>
                <li>Rode, ontstoken huid</li>
                <li>Jeuk het hele jaar door (geen seizoensgebonden patroon)</li>
              </ul>

              <p><strong>Meest voorkomende allergenen:</strong> rund, kip, zuivel, tarwe, soja en maïs</p>

              <p><strong>Behandeling:</strong></p>
              <ul>
                <li>Eliminatiedieet onder begeleiding van dierenarts (8-12 weken)</li>
                <li>Hypoallergeen voer met gehydrolyseerd eiwit</li>
                <li>Novel protein dieet (nieuwe eiwitbron zoals hert, kangoeroe)</li>
                <li>Strikt volhouden – geen snacks of restjes!</li>
              </ul>

              <h3>3. Atopische dermatitis (omgevingsallergieën)</h3>

              <p>
                <strong>Atopie</strong> is een genetische aanleg om allergisch te reageren op omgevingsallergenen zoals pollen, huisstofmijt, schimmels of gras. Het komt vooral voor bij bepaalde rassen.
              </p>

              <p><strong>Risicorasssen:</strong> Franse Bulldog, Labrador, Golden Retriever, Duitse Herder, Boxer, Jack Russell Terrier</p>

              <p><strong>Symptomen:</strong></p>
              <ul>
                <li>Seizoensgebonden jeuk (lente/zomer) of het hele jaar door</li>
                <li>Intensief likken van poten (bruine verkleuring)</li>
                <li>Jeuk vooral aan gezicht, oren, poten en buik</li>
                <li>Terugkerende huid- en oorinfecties</li>
                <li>Rode, ontstoken huid tussen tenen</li>
              </ul>

              <p><strong>Behandeling:</strong></p>
              <ul>
                <li>Immunotherapie (allergieshots of druppels)</li>
                <li>Apoquel of Cytopoint (moderne anti-jeuk medicatie)</li>
                <li>Regelmatige shampoo's met verzachtende ingrediënten</li>
                <li>Omega-3 supplementen voor huidgezondheid</li>
                <li>Vermijd blootstelling waar mogelijk (binnen houden tijdens piekperiodes)</li>
              </ul>

              <BetweenContentAd sponsorAd={null} />

              <h3>4. Mijten en schurft</h3>

              <p>
                <strong>Mijten</strong> zijn microscopisch kleine parasieten die zich in of op de huid nestelen en intense jeuk veroorzaken.
              </p>

              <p><strong>Soorten:</strong></p>
              <ul>
                <li><strong>Sarcoptes (schurft):</strong> zeer besmettelijk, extreme jeuk, korstige huid</li>
                <li><strong>Demodex:</strong> meestal bij jonge honden of immuungecompromitteerd, kale plekken</li>
                <li><strong>Oormijt:</strong> jeuk en donkerbruin afscheiding in oren</li>
                <li><strong>Cheyletiella (wandelende roos):</strong> roos-achtige schilfers met jeuk</li>
              </ul>

              <p><strong>Behandeling:</strong></p>
              <ul>
                <li>Diagnose via huidkrabsel bij dierenarts</li>
                <li>Antiparasitaire behandeling (Bravecto, Simparica, ivermectine)</li>
                <li>Medische shampoo's</li>
                <li>Behandel alle huisdieren in contact</li>
              </ul>

              <h3>5. Bacteriële of schimmelinfecties</h3>

              <p>
                <strong>Huidinfecties</strong> ontstaan vaak als secundair probleem door andere oorzaken (allergie, verwonding, vocht).
              </p>

              <p><strong>Symptomen bacteriële infectie (pyodermie):</strong></p>
              <ul>
                <li>Rode, ontstoken huid met pustels (pukkel-achtige bultjes)</li>
                <li>Korstige plekken en haaruitval</li>
                <li>Kenmerkende "target lesions" (ronde rode plekken met korstje in het midden)</li>
                <li>Onaangename geur</li>
              </ul>

              <p><strong>Symptomen schimmelinfectie (vooral Malassezia):</strong></p>
              <ul>
                <li>Vettige, gelige huid met schilfers</li>
                <li>Sterke geur (gist-achtig of muf)</li>
                <li>Donkere verkleuring van de huid</li>
                <li>Vooral in huidplooien, oren en tussen tenen</li>
              </ul>

              <p><strong>Behandeling:</strong></p>
              <ul>
                <li>Antibiotica bij bacteriële infectie (2-4 weken)</li>
                <li>Antischimmel medicatie of shampoo bij gistinfectie</li>
                <li>Behandel onderliggende oorzaak om herhaling te voorkomen</li>
              </ul>

              <h3>6. Droge huid en huidverzorging</h3>

              <p>
                <strong>Droge huid</strong> kan ontstaan door te frequent baden, lage luchtvochtigheid, verwarmingslucht of voedingstekorten.
              </p>

              <p><strong>Symptomen:</strong></p>
              <ul>
                <li>Roos (witte schilfers in vacht)</li>
                <li>Doffe, brosse vacht</li>
                <li>Milde jeuk zonder zichtbare huidproblemen</li>
                <li>Huid voelt droog en schilferig aan</li>
              </ul>

              <p><strong>Behandeling:</strong></p>
              <ul>
                <li>Was niet vaker dan 1x per maand (tenzij medisch noodzakelijk)</li>
                <li>Gebruik hondenvriendelijke, hydraterende shampoo</li>
                <li>Voeg omega-3 visolie toe aan voeding (EPA/DHA)</li>
                <li>Overweeg luchtvochtigheid in huis verhogen (40-60%)</li>
                <li>Kwaliteitsvoer met voldoende essentiële vetzuren</li>
              </ul>

              <BetweenContentAd sponsorAd={null} />

              <h3>7. Contactallergie of irritatie</h3>

              <p>
                Sommige honden reageren op stoffen waarmee hun huid in contact komt, zoals bepaalde planten, chemicaliën of materialen.
              </p>

              <p><strong>Mogelijke triggers:</strong></p>
              <ul>
                <li>Reinigingsmiddelen op vloeren</li>
                <li>Synthetische tapijten of beddengoed</li>
                <li>Plantensap (brandnetels, berenklauw)</li>
                <li>Rubberen of plastic speelgoed</li>
                <li>Halsbanden van bepaalde materialen</li>
              </ul>

              <p><strong>Behandeling:</strong></p>
              <ul>
                <li>Identificeer en verwijder trigger</li>
                <li>Was beddengoed met hypoallergeen wasmiddel</li>
                <li>Spoel poten na wandelingen</li>
                <li>Kortdurend antihistaminica of corticosteroïden voor ernstige gevallen</li>
              </ul>

              <h3>8. Stress en gedrag (psychogene jeuk)</h3>

              <p>
                Sommige honden likken of krabben uit stress, angst of verveling – vergelijkbaar met nagelbijten bij mensen.
              </p>

              <p><strong>Symptomen:</strong></p>
              <ul>
                <li>Repetitief likken van een specifieke plek (vaak poten)</li>
                <li>Lick granuloma's (verdikking van huid door constant likken)</li>
                <li>Gebeurt vooral bij stress of verveling</li>
                <li>Geen zichtbare huidaandoening</li>
              </ul>

              <p><strong>Behandeling:</strong></p>
              <ul>
                <li>Meer mentale en fysieke stimulatie</li>
                <li>Behandel onderliggende angst of stress</li>
                <li>Gedragstherapie en positieve afleidingstechnieken</li>
                <li>Verrijking en interactief speelgoed</li>
                <li>In ernstige gevallen: gedragsdeskundige en mogelijk anti-angst medicatie</li>
              </ul>

              <h2>Diagnose: hoe bepaalt de dierenarts de oorzaak?</h2>

              <p>
                Je dierenarts zal verschillende stappen nemen om de oorzaak te achterhalen:
              </p>

              <ol>
                <li><strong>Anamnese:</strong> Vragen over symptomen, duur, seizoensgebondenheid, dieet</li>
                <li><strong>Lichamelijk onderzoek:</strong> Inspectie van huid, vacht, oren</li>
                <li><strong>Huidkrabsel:</strong> Onderzoek naar mijten en parasieten</li>
                <li><strong>Cytologie:</strong> Microscopisch onderzoek voor bacteriën en gist</li>
                <li><strong>Allergietesten:</strong> Bloedtest of huidtest bij vermoeden van atopie</li>
                <li><strong>Eliminatiedieet:</strong> Bij vermoeden van voedselallergie</li>
                <li><strong>Biopsie:</strong> In complexe of therapieresistente gevallen</li>
              </ol>

              <h2>Thuis hulp bieden: wat kan je zelf doen?</h2>

              <p>
                Terwijl je wacht op een diagnose of naast medische behandeling:
              </p>

              <div className="bg-cpCoral/10 dark:bg-cpCoral/20 rounded-xl p-6 my-8">
                <h3 className="text-lg font-semibold text-cpCharcoal dark:text-cpCream mt-0 mb-3">
                  ✅ Direct toe te passen tips:
                </h3>
                <ul className="mb-0 space-y-2">
                  <li>✓ Gebruik een <strong>beschermkraag</strong> om krabschade te voorkomen</li>
                  <li>✓ Koude compressen op ontstoken plekken (10-15 min)</li>
                  <li>✓ Havermouttbad (ongekoekte havermout in knijpkous, laten weken in bad)</li>
                  <li>✓ Vettige visolie (omega-3) toevoegen aan voeding</li>
                  <li>✓ Houd een <strong>jeukdagboek</strong> bij om patronen te herkennen</li>
                  <li>✓ Vermijd baden tenzij medisch geadviseerd (droogt huid uit)</li>
                </ul>
              </div>

              <h2>Preventie: jeuk voorkomen</h2>

              <ul>
                <li><strong>Jaarrond vlooienpreveneie</strong> – ook in winter!</li>
                <li><strong>Kwaliteitsvoer</strong> met essentiële vetzuren en huidondersteunende voedingsstoffen</li>
                <li><strong>Regelmatige verzorging</strong> – borstelen verwijdert dode haren en allergenen</li>
                <li><strong>Controleer regelmatig</strong> op beginnende huidproblemen</li>
                <li><strong>Hygiëne:</strong> was beddengoed regelmatig, stofzuig grondig</li>
                <li><strong>Spoel poten</strong> na wandelingen in hoog allergenseizoen</li>
              </ul>

              <h2>Veelgestelde vragen over jeuk bij honden</h2>

              <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 mb-4">
                <summary className="font-semibold text-cpCharcoal dark:text-cpCream cursor-pointer">
                  Kan ik mijn hond Benadryl geven tegen jeuk?
                </summary>
                <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80">
                  Benadryl (difenhydramine) wordt soms gebruikt bij milde allergie, maar raadpleeg altijd eerst je dierenarts voor de juiste dosering (1-2 mg/kg). Het werkt niet bij alle oorzaken van jeuk en is geen langetermijnoplossing.
                </p>
              </details>

              <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 mb-4">
                <summary className="font-semibold text-cpCharcoal dark:text-cpCream cursor-pointer">
                  Hoe lang duurt het voordat een hond ophoudt met krabben?
                </summary>
                <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80">
                  Dit hangt af van de oorzaak. Vlooienjeuk kan 2-4 weken aanhouden na eliminatie van vlooien. Voedselallergieën verbeteren vaak binnen 4-8 weken na dieetverandering. Atopie vereist vaak levenslange management.
                </p>
              </details>

              <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 mb-4">
                <summary className="font-semibold text-cpCharcoal dark:text-cpCream cursor-pointer">
                  Is kokosolic goed tegen jeuk bij honden?
                </summary>
                <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80">
                  Kokosolic kan mild hydraterend werken en heeft lichte antimicrobiële eigenschappen. Het helpt bij droge huid, maar is geen behandeling voor allergieën, infecties of parasieten. Gebruik het als aanvulling, niet als vervanging van medische behandeling.
                </p>
              </details>

              <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 mb-4">
                <summary className="font-semibold text-cpCharcoal dark:text-cpCream cursor-pointer">
                  Zijn korte haren honden gevoeliger voor jeuk?
                </summary>
                <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80">
                  Nee, maar jeuk is bij kortharige rassen vaak sneller zichtbaar. Rassen zoals Franse Bulldogs en Pitbulls hebben wel genetisch een hoger risico op huidproblemen en allergieën.
                </p>
              </details>

              <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 mb-4">
                <summary className="font-semibold text-cpCharcoal dark:text-cpCream cursor-pointer">
                  Wanneer is jeuk een teken van iets ernstigs?
                </summary>
                <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80">
                  Ga direct naar de dierenarts bij: plotselinge ernstige jeuk, kale plekken, bloedige huid, zwellingen, koorts, lethargie of als de jeuk niet reageert op eenvoudige maatregelen na 1-2 weken.
                </p>
              </details>

              <h2>Conclusie: jeuk is vrijwel altijd te behandelen</h2>

              <p>
                Chronische jeuk heeft enorme impact op de kwaliteit van leven van je hond. De goede nieuws is dat met de juiste diagnose en behandeling bijna alle jeukklachten goed te beheersen zijn.
              </p>

              <p>
                De sleutel is geduld en systematisch zoeken naar de oorzaak. Werk samen met je dierenarts, houd symptomen bij en volg behandelplannen consequent op. Met de juiste aanpak kan je hond weer comfortabel leven – zonder constant gekrab!
              </p>

              <p>
                💙 <em>Herken je deze symptomen bij jouw hond? Wacht niet te lang – hoe eerder je behandelt, hoe sneller je hond verlossing heeft!</em>
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-cpCharcoal/10 dark:border-cpCream/10">
                <Tag className="w-4 h-4 text-cpCharcoal/60 dark:text-cpCream/60" />
                <span className="text-sm text-cpCharcoal/60 dark:text-cpCream/60">Tags:</span>
                <Link href="/nl/gids/dierengezondheid" className="text-sm px-3 py-1 bg-cpCoral/10 hover:bg-cpCoral/20 dark:bg-cpCoral/20 dark:hover:bg-cpCoral/30 text-cpCharcoal dark:text-cpCream rounded-full transition-colors">
                  Dierengezondheid
                </Link>
                <Link href="/nl/gids/hondenverzorging" className="text-sm px-3 py-1 bg-cpCoral/10 hover:bg-cpCoral/20 dark:bg-cpCoral/20 dark:hover:bg-cpCoral/30 text-cpCharcoal dark:text-cpCream rounded-full transition-colors">
                  Hondenverzorging
                </Link>
                <span className="text-sm px-3 py-1 bg-cpCoral/10 text-cpCharcoal dark:bg-cpCoral/20 dark:text-cpCream rounded-full">
                  Hondgezondheid
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
                  href="/nl/gids/dierengezondheid/huidproblemen-hond"
                  className="block p-6 bg-cpSurface dark:bg-cpCharcoal/50 rounded-xl hover:shadow-lg transition-all border border-cpCharcoal/5 dark:border-cpCream/5 hover:border-cpCoral/20"
                >
                  <h4 className="font-semibold text-cpCharcoal dark:text-cpCream mb-2">
                    Huidproblemen bij honden: complete gids
                  </h4>
                  <p className="text-sm text-cpCharcoal/70 dark:text-cpCream/70">
                    Herken en behandel de meest voorkomende huidaandoeningen bij honden.
                  </p>
                </Link>

                <Link
                  href="/nl/gids/huisdiervoeding/voeding-gezonde-huid"
                  className="block p-6 bg-cpSurface dark:bg-cpCharcoal/50 rounded-xl hover:shadow-lg transition-all border border-cpCharcoal/5 dark:border-cpCream/5 hover:border-cpCoral/20"
                >
                  <h4 className="font-semibold text-cpCharcoal dark:text-cpCream mb-2">
                    Voeding voor een gezonde huid bij honden
                  </h4>
                  <p className="text-sm text-cpCharcoal/70 dark:text-cpCream/70">
                    Welke voedingsstoffen dragen bij aan een gezonde huid en vacht?
                  </p>
                </Link>

                <Link
                  href="/nl/gids/dierengezondheid/allergien-bij-honden"
                  className="block p-6 bg-cpSurface dark:bg-cpCharcoal/50 rounded-xl hover:shadow-lg transition-all border border-cpCharcoal/5 dark:border-cpCream/5 hover:border-cpCoral/20"
                >
                  <h4 className="font-semibold text-cpCharcoal dark:text-cpCream mb-2">
                    Allergieën bij honden herkennen en behandelen
                  </h4>
                  <p className="text-sm text-cpCharcoal/70 dark:text-cpCream/70">
                    Alles over voedselallergie, atopie en contactallergieën bij honden.
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
                    8 oorzaken van jeuk
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Diagnose proces
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Thuishulp tips
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
                  <Link href="/nl/gids/dierengezondheid" className="block text-cpCoral hover:text-cpAmber transition-colors text-sm">
                    → Dierengezondheid
                  </Link>
                  <Link href="/nl/gids/hondenverzorging" className="block text-cpCoral hover:text-cpAmber transition-colors text-sm">
                    → Hondenverzorging
                  </Link>
                  <Link href="/nl/gids/huisdiervoeding" className="block text-cpCoral hover:text-cpAmber transition-colors text-sm">
                    → Huisdiervoeding
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
            "headline": "Hond heeft last van jeuk: 8 oorzaken en behandelingen",
            "description": "Waarom krabt je hond de hele tijd? Ontdek de 8 meest voorkomende oorzaken van jeuk bij honden, herken de symptomen en leer effectieve behandelingen kennen.",
            "image": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2000",
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
              "@id": "https://cutiepawspedia.nl/nl/blog/hond-jeuk-oorzaken-behandeling"
            },
            "keywords": "hond jeuk, hond krabt veel, hond allergie, jeukende hond, huidproblemen hond",
            "articleSection": "Dierengezondheid",
            "wordCount": 2100
          })
        }}
      />
    </article>
  );
}
