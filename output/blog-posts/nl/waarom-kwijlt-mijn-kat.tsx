import Image from "next/image";
import Link from "next/link";
import { PhotoCredit } from "@/components/blog/PhotoCredit";
import { BetweenContentAd } from "@/components/ads/AdSlot";
import { BlogSidebarAd } from "@/components/ads/BlogSidebarAd";
import { Calendar, Clock, Tag } from "lucide-react";

export const metadata = {
  title: "Waarom kwijlt mijn kat? 7 mogelijke oorzaken | CutiePawsPedia",
  description: "Ontdek waarom je kat kwijlt: van onschuldige redenen zoals ontspanning tot zorgsignalen zoals tandproblemen of misselijkheid. Complete gids met oplossingen.",
  keywords: ["kat kwijlt", "kwijlen kat", "speeksel kat", "kat kwijnend", "hypersalivatie kat"],
  openGraph: {
    title: "Waarom kwijlt mijn kat? 7 mogelijke oorzaken",
    description: "Complete overzicht van waarom katten kwijlen: normale redenen, alarmsignalen en wanneer je naar de dierenarts moet.",
    type: "article",
    publishedTime: "2025-12-11T10:00:00Z",
    authors: ["CutiePawsPedia Team"],
  },
};

export default function KatKwijltArticle() {
  return (
    <article className="min-h-screen bg-cpCream dark:bg-cpCharcoal">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full">
        <Image
          src="https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=2000"
          alt="Close-up van kat gezicht"
          fill
          className="object-cover"
          priority
        />
        <PhotoCredit
          photographerName="Manja Vitolic"
          photographerUrl="https://unsplash.com/@madhatterzone"
          source="unsplash"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cpCharcoal/80 via-cpCharcoal/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto max-w-4xl">
            <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-cpCharcoal dark:text-cpCream bg-cpCoral rounded-full">
              Dierengezondheid
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-cpCream mb-4">
              Waarom kwijlt mijn kat? 7 mogelijke oorzaken
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
                Je bemerkt plotseling natte plekken waar je kat heeft gelegen, of je ziet druppels speeksel aan zijn kin hangen. Kwijlen is ongebruikelijk gedrag voor katten – in tegenstelling tot honden doen ze dit normaal gesproken niet. Dus wanneer je kat wél begint te kwijlen, wil je natuurlijk weten: is dit normaal of reden tot zorg?
              </p>

              <p>
                In deze complete gids ontdek je de 7 meest voorkomende redenen waarom katten kwijlen, leer je het verschil tussen onschuldige en zorgelijke oorzaken, en wanneer je actie moet ondernemen.
              </p>

              <div className="bg-cpAmber/10 dark:bg-cpAmber/20 border-l-4 border-cpAmber rounded-r-lg p-6 my-8">
                <h3 className="text-lg font-semibold text-cpCharcoal dark:text-cpCream mt-0 mb-2">
                  ⚠️ Let op: acute noodsituaties
                </h3>
                <p className="mb-0">
                  Plotseling overmatig kwijlen gecombineerd met kokhalzen, ademhalingsproblemen, blauwe tandvlees of collaps is een veterinaire noodsituatie. Bel direct de dierenarts of noodlijn!
                </p>
              </div>

              <h2>Is kwijlen bij katten normaal?</h2>

              <p>
                In tegenstelling tot honden, die regelmatig kwijlen (vooral bepaalde rassen), is <strong>kwijlen bij katten zeldzaam</strong> en meestal een signaal dat er iets aan de hand is – goed of slecht.
              </p>

              <p>
                Het kwijlen (medisch: hypersalivatie of ptyalisme) wordt veroorzaakt door overmatige speekselproductie of onvermogen om speeksel door te slikken. Een kleine hoeveelheid kwijl kan onschuldig zijn, maar overmatig of plotseling kwijlen verdient altijd aandacht.
              </p>

              <h2>De 7 meest voorkomende oorzaken van kwijlen bij katten</h2>

              <h3>1. Ontspanning en gelukzaligheid ✅ (Onschuldig)</h3>

              <p>
                <strong>De meest onschuldige reden:</strong> Sommige katten kwijlen een klein beetje wanneer ze extreem ontspannen en gelukkig zijn – meestal tijdens aaien, knuffelen of spinnen.
              </p>

              <p><strong>Herkenbare kenmerken:</strong></p>
              <ul>
                <li>Gebeurt alleen tijdens intens genotsvolle momenten (op schoot, aaien)</li>
                <li>Kleine hoeveelheid vocht (geen overdreven kwijl)</li>
                <li>Kat spint luid en lijkt volledig ontspannen</li>
                <li>Stopt zodra het aaien stopt</li>
                <li>Geen andere symptomen</li>
                <li>Is altijd zo geweest (consistent gedrag)</li>
              </ul>

              <p><strong>Actie nodig?</strong> Nee, dit is volkomen normaal en zelfs een compliment! Het betekent dat je kat zich volledig veilig en gelukkig voelt bij jou.</p>

              <BetweenContentAd sponsorAd={null} />

              <h3>2. Tandproblemen en mondziektes 🚨 (Veelvoorkomend & zorgelijk)</h3>

              <p>
                <strong>De meest voorkomende medische oorzaak</strong> van kwijlen bij katten zijn tandproblemen. Pijn, ontstekingen of irritatie in de mond stimuleren speekselproductie.
              </p>

              <p><strong>Mogelijke tandproblemen:</strong></p>
              <ul>
                <li><strong>Tandvleesontsteking (gingivitis):</strong> Rood, gezwollen tandvlees dat bloedt</li>
                <li><strong>Paradontitis:</strong> Ernstige tandvleesbeschadiging en tanduitval</li>
                <li><strong>FORL (katten-cariës):</strong> Pijnlijke tanderosie (komt voor bij 30-70% van katten)</li>
                <li><strong>Tandabces:</strong> Infectie in tandwortel, zeer pijnlijk</li>
                <li><strong>Stomatitis:</strong> Chronische ontstekingen in gehele mond, zeer pijnlijk</li>
                <li><strong>Gebroken tand of kies:</strong> Door trauma of oud worden</li>
              </ul>

              <p><strong>Herkenbare symptomen:</strong></p>
              <ul>
                <li>Kwijlen (soms met bloedsporen)</li>
                <li>Onaangename adem (sterk en penetrant)</li>
                <li>Moeilijk eten of eten uit bek laten vallen</li>
                <li>Voorkeur voor zacht voer boven brokjes</li>
                <li>Met poot tegen mond vegen</li>
                <li>Verminderde verzorging (vuile vacht)</li>
                <li>Gewichtsverlies</li>
              </ul>

              <p><strong>Actie nodig:</strong> Ja, maak spoedig een afspraak met de dierenarts. Tandproblemen zijn pijnlijk en kunnen leiden tot systemische infecties. Behandeling kan tandreiniging onder narcose, extracties of medicatie omvatten.</p>

              <h3>3. Misselijkheid en maagproblemen 🤢 (Zorgelijk)</h3>

              <p>
                Katten kwijlen vaak als ze misselijk zijn – het is een voorbode van braken.
              </p>

              <p><strong>Mogelijke oorzaken van misselijkheid:</strong></p>
              <ul>
                <li><strong>Haarballetjes:</strong> Vastzittende haarkluwens in maag/darm</li>
                <li><strong>Maagdarmstoornissen:</strong> IBD, gastritis, pancreatitis</li>
                <li><strong>Nierziekte:</strong> Ophoping van toxines veroorzaakt misselijkheid</li>
                <li><strong>Leverziekte:</strong> Hepatische lipidose of andere leveraandoeningen</li>
                <li><strong>Vergiftiging:</strong> Giftige planten (lelies!), chemicaliën, mensenmedicatie</li>
                <li><strong>Reisziekte:</strong> Auto reizen (zeldzaam maar mogelijk)</li>
              </ul>

              <p><strong>Herkenbare symptomen:</strong></p>
              <ul>
                <li>Kwijlen gevolgd door braken</li>
                <li>Lippen likken en slikken</li>
                <li>Onrustig gedrag</li>
                <li>Verminderde eetlust</li>
                <li>Lethargie</li>
              </ul>

              <p><strong>Actie nodig:</strong> Ja, vooral als kwijlen gepaard gaat met braken, diarree, lethargie of weigeren te eten. Bij vermoeden van vergiftiging: direct naar dierenarts of dierenartsnnoodlijn!</p>

              <BetweenContentAd sponsorAd={null} />

              <h3>4. Voorwerp vast in mond of keel 🚨 (Noodsituatie)</h3>

              <p>
                Een <strong>vreemd voorwerp</strong> dat vastzit in de mond, tanden of keel veroorzaakt irritatie en extreme speekselproductie.
              </p>

              <p><strong>Mogelijke voorwerpen:</strong></p>
              <ul>
                <li>Botfragment, visgraat of kippenbotje</li>
                <li>Naald of draad (katten spelen hiermee!)</li>
                <li>Stuk speelgoed</li>
                <li>Splinter of grasspriet</li>
                <li>Elastiekje om tong gewikkeld</li>
              </ul>

              <p><strong>Herkenbare symptomen:</strong></p>
              <ul>
                <li>Plotseling excessief kwijlen</li>
                <li>Met poten constant naar mond klauwen</li>
                <li>Kokhalzen of wurggeluiden</li>
                <li>Weigeren te eten/drinken</li>
                <li>Open mond, uitgestoken tong</li>
                <li>Paniek en stress</li>
              </ul>

              <p><strong>Actie nodig:</strong> Direct naar dierenarts! Probeer niet zelf voorwerp te verwijderen (kan dieper duwen of verwonding veroorzaken). Dit is potentieel levensbedredigend als het ademhaling belemmert.</p>

              <h3>5. Vergiftiging of giftige substanties 🧪 (Zeer zorgelijk)</h3>

              <p>
                Contact met <strong>giftige stoffen</strong> veroorzaakt vaak kwijlen als eerste symptoom.
              </p>

              <p><strong>Veelvoorkomende kattengiften:</strong></p>
              <ul>
                <li><strong>Planten:</strong> Lelies (zeer giftig!), dieffenbachia, philodendron, azalea</li>
                <li><strong>Mensenmedicatie:</strong> Paracetamol, ibuprofen, antidepressiva</li>
                <li><strong>Huishoudchemicaliën:</strong> Bleekmiddel, ongediertebestrijding, reinigingsmiddelen</li>
                <li><strong>Topische producten:</strong> Vlobehandeling voor honden (permethrine – DODELIJK voor katten!)</li>
                <li><strong>Voedsel:</strong> Chocola, ui, knoflook, druiven, xylitol</li>
                <li><strong>Essential oils:</strong> Veel oliën zijn giftig voor katten</li>
              </ul>

              <p><strong>Herkenbare symptomen:</strong></p>
              <ul>
                <li>Overmatig kwijlen met schuimvorming</li>
                <li>Braken of diarree</li>
                <li>Tremoren of stuiptrekkingen</li>
                <li>Verwijde of vernauwde pupillen</li>
                <li>Ademhalingsproblemen</li>
                <li>Zwakte of collaps</li>
                <li>Veranderd gedrag of desoriëntatie</li>
              </ul>

              <p><strong>Actie nodig:</strong> SPOED! Bel direct dierenarts of gifnoodlijn. Neem indien mogelijk de verpakking mee. Probeer NIET zelf braken op te wekken.</p>

              <div className="bg-cpCoral/10 dark:bg-cpCoral/20 border-l-4 border-cpCoral rounded-r-lg p-6 my-8">
                <h3 className="text-lg font-semibold text-cpCharcoal dark:text-cpCream mt-0 mb-2">
                  🚨 Lelies zijn dodelijk voor katten
                </h3>
                <p className="mb-0">
                  ALLE delen van lelies (bloem, blad, stuifmeel, stengel) zijn extreem giftig voor katten. Zelfs het drinken van water uit een vaas met lelies kan acuut nierfalen veroorzaken. Binnen 24-48 uur spoed naar dierenarts bij contact!
                </p>
              </div>

              <BetweenContentAd sponsorAd={null} />

              <h3>6. Medicatie en bijwerkingen 💊 (Belangrijk om te weten)</h3>

              <p>
                Sommige <strong>medicijnen</strong> hebben kwijlen als bijwerking, vooral als de kat de medicijn proeft.
              </p>

              <p><strong>Medicijnen die kwijlen veroorzaken:</strong></p>
              <ul>
                <li>Bittere medicijnen (antibiotica, wormmiddelen)</li>
                <li>Bepaalde pijnstillers</li>
                <li>Kalmerende middelen</li>
                <li>Sommige parasitaire preventie middelen</li>
              </ul>

              <p><strong>Actie nodig:</strong> Overleg met dierenarts of medicijn met voer gemengd kan worden of in andere vorm beschikbaar is. Tijdelijk kwijlen (5-10 minuten) na medicatie is normaal, maar blijvend kwijlen niet.</p>

              <h3>7. Ademhalingsproblemen en koorts 🌡️ (Ernstig)</h3>

              <p>
                <strong>Bovenste luchtwegproblemen</strong> of koorts kunnen kwijlen veroorzaken, vooral bij ademhaling door de mond.
              </p>

              <p><strong>Mogelijke oorzaken:</strong></p>
              <ul>
                <li>Kattenverkoudheid (herpes, calici virus)</li>
                <li>Astma of luchtweginfectie</li>
                <li>Hitte-uitputting</li>
                <li>Extreme stress of paniek</li>
              </ul>

              <p><strong>Herkenbare symptomen:</strong></p>
              <ul>
                <li>Kwijlen met open mond ademhaling</li>
                <li>Niezen, hoesten</li>
                <li>Koorts (>39°C)</li>
                <li>Lethargie</li>
                <li>Verminderde eetlust</li>
              </ul>

              <p><strong>Actie nodig:</strong> Ja, bij ademhalingsproblemen of koorts altijd dierenarts raadplegen.</p>

              <h2>Wanneer direct naar de dierenarts?</h2>

              <p>
                Zoek onmiddellijk veterinaire hulp bij:
              </p>

              <ul>
                <li>🚨 Plotseling excessief kwijlen met schuimvorming</li>
                <li>🚨 Kwijlen + moeite met ademen of blauwe tandvlees</li>
                <li>🚨 Kwijlen + stuipen, tremoren of collaps</li>
                <li>🚨 Vermoeden van vergiftiging of vreemd voorwerp</li>
                <li>🚨 Kwijlen met bloederig speeksel</li>
                <li>🚨 Kwijlen + extreme pijn (janken, agressie)</li>
                <li>⚠️ Kwijlen langer dan 24 uur</li>
                <li>⚠️ Kwijlen + weigeren te eten/drinken</li>
                <li>⚠️ Kwijlen + braken, diarree, lethargie</li>
              </ul>

              <h2>Diagnose: wat doet de dierenarts?</h2>

              <p>
                Om de oorzaak van kwijlen te bepalen, kan je dierenarts:
              </p>

              <ol>
                <li><strong>Anamnese:</strong> Vragen over symptomen, tijdsduur, recente veranderingen</li>
                <li><strong>Lichamelijk onderzoek:</strong> Algehele conditie check</li>
                <li><strong>Mondonderzoek:</strong> Inspectie van tanden, tandvlees, tong, keel (vaak onder sedatie)</li>
                <li><strong>Temperatuur meting:</strong> Controle op koorts</li>
                <li><strong>Bloedonderzoek:</strong> Check nier-, leverfunctie, elektrolyten</li>
                <li><strong>Röntgenfoto's:</strong> Bij vermoeden van vreemd voorwerp of tandproblemen</li>
                <li><strong>Toxicologie testen:</strong> Bij vermoeden van vergiftiging</li>
              </ol>

              <h2>Thuis verzorging bij mild kwijlen</h2>

              <p>
                Als kwijlen mild is en je kat verder normaal doet (eet, drinkt, speelt):
              </p>

              <ul>
                <li>✅ <strong>Monitor nauwlettend:</strong> Houd symptomen en gedrag bij</li>
                <li>✅ <strong>Check mond voorzichtig:</strong> Kijk of je iets ziet vastzitten (doe dit ALLEEN als kat kalm is)</li>
                <li>✅ <strong>Bied zacht voer aan:</strong> Als kat moeite heeft met eten</li>
                <li>✅ <strong>Houd kin droog:</strong> Dep voorzichtig schoon om huidirritatie te voorkomen</li>
                <li>✅ <strong>Verwijder potentiële giftige stoffen:</strong> Planten, chemicaliën uit bereik</li>
                <li>✅ <strong>Bel dierenarts voor advies</strong> als je twijfelt</li>
              </ul>

              <h2>Preventie: kwijlen voorkomen</h2>

              <ul>
                <li>🦷 <strong>Regelmatige tandcontroles:</strong> Jaarlijkse check bij dierenarts, overweeg tandreiniging</li>
                <li>🦷 <strong>Tandhygiëne thuis:</strong> Poetsen met kattentandpasta of dental treats</li>
                <li>🌿 <strong>Gifvrije omgeving:</strong> Verwijder giftige planten en chemicaliën</li>
                <li>💊 <strong>Medicatie veilig toedienen:</strong> Vraag dierenarts om tips bij moeilijk te geven medicijnen</li>
                <li>🎾 <strong>Veilig speelgoed:</strong> Controleer op loshangende delen, geen naald/draad</li>
                <li>🍽️ <strong>Veilig voer:</strong> Geen gekookte botten, visgraten of mensenmedicatie</li>
              </ul>

              <h2>Veelgestelde vragen</h2>

              <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 mb-4">
                <summary className="font-semibold text-cpCharcoal dark:text-cpCream cursor-pointer">
                  Mijn kat kwijlt alleen als ik hem aai. Is dat normaal?
                </summary>
                <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80">
                  Ja, als het een kleine hoeveelheid is en alleen gebeurt tijdens intens genieten (aaien, spinnen), is dit volkomen normaal. Het is een teken van extreme ontspanning en geluk. Zolang er geen andere symptomen zijn, is dit onschuldig gedrag.
                </p>
              </details>

              <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 mb-4">
                <summary className="font-semibold text-cpCharcoal dark:text-cpCream cursor-pointer">
                  Kan stress kwijlen bij katten veroorzaken?
                </summary>
                <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80">
                  Ja, extreme stress of paniek (bijvoorbeeld tijdens autorit of dierenarts bezoek) kan kortdurend kwijlen veroorzaken. Dit stopt meestal zodra de stressor verdwijnt. Blijvend kwijlen of andere symptomen vereisen wel veterinair onderzoek.
                </p>
              </details>

              <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 mb-4">
                <summary className="font-semibold text-cpCharcoal dark:text-cpCream cursor-pointer">
                  Hoe weet ik of kwijlen normaal of ernstig is?
                </summary>
                <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80">
                  Normaal: Kleine hoeveelheid tijdens aaien/geluk, geen andere symptomen, is altijd zo geweest. Ernstig: Plotseling begonnen, overmatig, gepaard met andere symptomen (braken, pijn, lethargie), of veranderd eetgedrag. Bij twijfel altijd dierenarts raadplegen.
                </p>
              </details>

              <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 mb-4">
                <summary className="font-semibold text-cpCharcoal dark:text-cpCream cursor-pointer">
                  Kan een haarbal kwijlen veroorzaken?
                </summary>
                <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80">
                  Ja, een vastzittende haarbal kan misselijkheid en kwijlen veroorzaken, vaak gevolgd door kokhalzen en opgeven van de haarbal. Help preventie met regelmatig borstelen, haarbal-pasta, en voldoende vezels in voeding.
                </p>
              </details>

              <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 mb-4">
                <summary className="font-semibold text-cpCharcoal dark:text-cpCream cursor-pointer">
                  Is kwijlen bij kittens normaal?
                </summary>
                <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80">
                  Kittens kunnen kwijlen tijdens het doorkomen van tanden (3-6 maanden), maar dit is mild en tijdelijk. Overmatig kwijlen bij kittens kan wijzen op geboortefout (zoals hazenlip) of infectie. Laat altijd controleren bij dierenarts.
                </p>
              </details>

              <h2>Conclusie: kwijlen bij katten verdient altijd aandacht</h2>

              <p>
                In tegenstelling tot honden is kwijlen bij katten niet normaal – behalve in zeer specifieke situaties zoals extreme ontspanning. In de meeste gevallen wijst kwijlen op een onderliggend probleem dat aandacht verdient.
              </p>

              <p>
                Of het nu gaat om tandproblemen (meest voorkomend), misselijkheid, een vreemd voorwerp of vergiftiging – vroege herkenning en behandeling maken het verschil. Vertrouw op je intuïtie als katteneigenaar en aarzel niet om de dierenarts te bellen bij twijfel.
              </p>

              <p>
                💙 <em>Jouw kat rekent op jou om signalen te herkennen en actie te ondernemen. Wees alert en zorg goed voor die kleine kwijler!</em>
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-cpCharcoal/10 dark:border-cpCream/10">
                <Tag className="w-4 h-4 text-cpCharcoal/60 dark:text-cpCream/60" />
                <span className="text-sm text-cpCharcoal/60 dark:text-cpCream/60">Tags:</span>
                <Link href="/nl/gids/dierengezondheid" className="text-sm px-3 py-1 bg-cpCoral/10 hover:bg-cpCoral/20 dark:bg-cpCoral/20 dark:hover:bg-cpCoral/30 text-cpCharcoal dark:text-cpCream rounded-full transition-colors">
                  Dierengezondheid
                </Link>
                <Link href="/nl/gids/kattenverzorging" className="text-sm px-3 py-1 bg-cpCoral/10 hover:bg-cpCoral/20 dark:bg-cpCoral/20 dark:hover:bg-cpCoral/30 text-cpCharcoal dark:text-cpCream rounded-full transition-colors">
                  Kattenverzorging
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
                  href="/nl/gids/dierengezondheid/tandverzorging-kat"
                  className="block p-6 bg-cpSurface dark:bg-cpCharcoal/50 rounded-xl hover:shadow-lg transition-all border border-cpCharcoal/5 dark:border-cpCream/5 hover:border-cpCoral/20"
                >
                  <h4 className="font-semibold text-cpCharcoal dark:text-cpCream mb-2">
                    Tandverzorging bij katten: complete gids
                  </h4>
                  <p className="text-sm text-cpCharcoal/70 dark:text-cpCream/70">
                    Leer hoe je de tanden van je kat gezond houdt en tandproblemen voorkomt.
                  </p>
                </Link>

                <Link
                  href="/nl/gids/dierengezondheid/giftige-planten-katten"
                  className="block p-6 bg-cpSurface dark:bg-cpCharcoal/50 rounded-xl hover:shadow-lg transition-all border border-cpCharcoal/5 dark:border-cpCream/5 hover:border-cpCoral/20"
                >
                  <h4 className="font-semibold text-cpCharcoal dark:text-cpCream mb-2">
                    Giftige planten voor katten: complete lijst
                  </h4>
                  <p className="text-sm text-cpCharcoal/70 dark:text-cpCream/70">
                    Welke planten zijn giftig voor katten en hoe bescherm je je kat?
                  </p>
                </Link>

                <Link
                  href="/nl/gids/huisdiergedrag/kattengedrag-begrijpen"
                  className="block p-6 bg-cpSurface dark:bg-cpCharcoal/50 rounded-xl hover:shadow-lg transition-all border border-cpCharcoal/5 dark:border-cpCream/5 hover:border-cpCoral/20"
                >
                  <h4 className="font-semibold text-cpCharcoal dark:text-cpCream mb-2">
                    Kattengedrag begrijpen: lichaamstaal en signalen
                  </h4>
                  <p className="text-sm text-cpCharcoal/70 dark:text-cpCream/70">
                    Leer de subtiele signalen van je kat te herkennen en beter communiceren.
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
                    Is kwijlen normaal?
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    7 oorzaken
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Wanneer naar dierenarts?
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Thuis verzorging
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Preventie
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
                  <Link href="/nl/gids/kattenverzorging" className="block text-cpCoral hover:text-cpAmber transition-colors text-sm">
                    → Kattenverzorging
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
            "headline": "Waarom kwijlt mijn kat? 7 mogelijke oorzaken",
            "description": "Ontdek waarom je kat kwijlt: van onschuldige redenen zoals ontspanning tot zorgsignalen zoals tandproblemen of misselijkheid. Complete gids met oplossingen.",
            "image": "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=2000",
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
              "@id": "https://cutiepawspedia.nl/nl/blog/waarom-kwijlt-mijn-kat"
            },
            "keywords": "kat kwijlt, kwijlen kat, speeksel kat, kat kwijnend, hypersalivatie kat",
            "articleSection": "Dierengezondheid",
            "wordCount": 1950
          })
        }}
      />
    </article>
  );
}
