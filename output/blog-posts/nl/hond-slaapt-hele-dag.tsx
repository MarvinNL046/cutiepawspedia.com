import Image from "next/image";
import Link from "next/link";
import { PhotoCredit } from "@/components/blog/PhotoCredit";
import { BetweenContentAd } from "@/components/ads/AdSlot";
import { BlogSidebarAd } from "@/components/ads/BlogSidebarAd";
import { Calendar, Clock, Tag } from "lucide-react";

export const metadata = {
  title: "Hond slaapt de hele dag: is dat normaal? | CutiePawsPedia",
  description: "Moet je je zorgen maken als je hond de hele dag slaapt? Ontdek hoeveel slaap normaal is per leeftijd, wanneer overmatig slapen zorgwekkend is en wat je kunt doen.",
  keywords: ["hond slaapt veel", "hond moe", "hoeveel slaap hond", "hond slaapt de hele dag", "lethargie hond"],
  openGraph: {
    title: "Hond slaapt de hele dag: is dat normaal?",
    description: "Complete gids over slaapgedrag bij honden: normaal slaapaantal per leeftijd, alarmsignalen en wanneer je naar de dierenarts moet.",
    type: "article",
    publishedTime: "2025-12-11T10:00:00Z",
    authors: ["CutiePawsPedia Team"],
  },
};

export default function HondSlaaptHeleDagArticle() {
  return (
    <article className="min-h-screen bg-cpCream dark:bg-cpCharcoal">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full">
        <Image
          src="https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?q=80&w=2000"
          alt="Hond slaapt vredig op bank"
          fill
          className="object-cover"
          priority
        />
        <PhotoCredit
          photographerName="Krista Mangulsone"
          photographerUrl="https://unsplash.com/@crisserbug"
          source="unsplash"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cpCharcoal/80 via-cpCharcoal/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto max-w-4xl">
            <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-cpCharcoal dark:text-cpCream bg-cpCoral rounded-full">
              Huisdiergedrag
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-cpCream mb-4">
              Hond slaapt de hele dag: is dat normaal?
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
                Je kijkt naar je hond die al de hele dag op de bank ligt te slapen. Is dit normaal gedrag of reden tot zorg? Moet je hond niet meer bewegen? Het korte antwoord: honden slapen inderdaad veel meer dan mensen – maar hoeveel is te veel?
              </p>

              <p>
                In deze complete gids ontdek je hoeveel slaap normaal is voor honden van verschillende leeftijden, leer je het verschil tussen gezond slapen en lethargie, en wanneer je actie moet ondernemen.
              </p>

              <h2>Hoeveel slaapt een hond gemiddeld?</h2>

              <p>
                Een <strong>volwassen hond slaapt gemiddeld 12-14 uur per dag</strong>. Dit klinkt misschien veel, maar is volkomen normaal en gezond. Honden hebben een ander slaappatroon dan mensen:
              </p>

              <ul>
                <li><strong>Polyfasisch slaappatroon:</strong> Honden slapen in meerdere korte sessies verspreid over de dag</li>
                <li><strong>Lichte slaap:</strong> Veel van die 12-14 uur is lichte slaap of doezelen</li>
                <li><strong>REM-slaap:</strong> Slechts 10% van hun slaap is diepe REM-slaap (bij mensen 25%)</li>
                <li><strong>Alert blijven:</strong> Evolutionair zijn honden geprogrammeerd om vaak wakker te worden</li>
              </ul>

              <div className="bg-cpCoral/10 dark:bg-cpCoral/20 rounded-xl p-6 my-8">
                <h3 className="text-lg font-semibold text-cpCharcoal dark:text-cpCream mt-0 mb-3">
                  📊 Normaal slaappatroon per leeftijd
                </h3>
                <ul className="mb-0 space-y-2">
                  <li><strong>Puppy (0-6 maanden):</strong> 18-20 uur per dag</li>
                  <li><strong>Adolescent (6-18 maanden):</strong> 14-16 uur per dag</li>
                  <li><strong>Volwassen (1-7 jaar):</strong> 12-14 uur per dag</li>
                  <li><strong>Senior (7+ jaar):</strong> 14-16 uur per dag</li>
                  <li><strong>Geriatrisch (10+ jaar):</strong> 16-18 uur per dag</li>
                </ul>
              </div>

              <h2>Waarom slapen honden zoveel?</h2>

              <h3>Evolutionaire redenen</h3>
              <p>
                In de natuur jagen wilde honden in korte, intense bursts gevolgd door lange rustperiodes. Dit patroon zit nog steeds in het DNA van onze huishonden, ook al hoeven ze niet meer te jagen voor hun voedsel.
              </p>

              <h3>Energiebehoud</h3>
              <p>
                Honden zijn zeer actief wanneer ze wakker zijn. Alle energie die ze gebruiken tijdens spelen, wandelen en mentale stimulatie moet hersteld worden door slaap.
              </p>

              <h3>Hersenverwerking</h3>
              <p>
                Tijdens slaap verwerken honden nieuwe ervaringen, consolideren ze herinneringen en herstellen ze mentaal – net zoals bij mensen.
              </p>

              <BetweenContentAd sponsorAd={null} />

              <h2>Verschil tussen gezond slapen en lethargie</h2>

              <p>
                Het is cruciaal om onderscheid te maken tussen <strong>normaal slaapgedrag</strong> en <strong>lethargie</strong> (abnormale slaperigheid die wijst op gezondheidsproblemen).
              </p>

              <h3>Normaal slaapgedrag:</h3>
              <ul>
                <li>✅ Hond wordt alert en energiek bij stimuli (deurbel, ritseling van voedbak)</li>
                <li>✅ Enthousiast bij wandeling of speeltijd</li>
                <li>✅ Normale eetlust en drinkgedrag</li>
                <li>✅ Slaapt op vaste tijden (overdag, na maaltijden)</li>
                <li>✅ Actief en speels wanneer wakker</li>
                <li>✅ Reageert op interactie en commando's</li>
              </ul>

              <h3>Lethargie (reden tot zorg):</h3>
              <ul>
                <li>❌ Moeilijk wakker te maken of blijft slaperig na wakker worden</li>
                <li>❌ Geen interesse in favoriete activiteiten (wandelen, speeltjes)</li>
                <li>❌ Verminderde eetlust of drinken</li>
                <li>❌ Slap, zwak of weigert op te staan</li>
                <li>❌ Andere symptomen: braken, diarree, pijn, koorts</li>
                <li>❌ Plotselinge verandering in slaappatroon</li>
              </ul>

              <div className="bg-cpAmber/10 dark:bg-cpAmber/20 border-l-4 border-cpAmber rounded-r-lg p-6 my-8">
                <h3 className="text-lg font-semibold text-cpCharcoal dark:text-cpCream mt-0 mb-2">
                  🚨 Direct naar dierenarts bij:
                </h3>
                <p className="mb-0">
                  Plotselinge extreme slaperigheid, moeilijk wakker te maken, weigert te eten/drinken, braken of diarree, pijn signalen (janken, gespannen houding), bleek tandvlees of tong, of ademhalingsproblemen.
                </p>
              </div>

              <h2>Medische redenen voor overmatig slapen</h2>

              <p>
                Als je hond plotseling meer gaat slapen of lethargisch lijkt, kunnen onderliggende gezondheidsproblemen de oorzaak zijn:
              </p>

              <h3>1. Infecties en koorts</h3>
              <p>
                Bacteriële of virale infecties (kennel hoest, baarmoederontsteking, Lyme ziekte) veroorzaken koorts en zwakte. Lichaam gebruikt energie om infectie te bestrijden.
              </p>

              <h3>2. Pijn of artrose</h3>
              <p>
                Chronische pijn, vooral artrose bij oudere honden, leidt tot verminderde activiteit en meer slapen. Honden verbergen pijn vaak goed.
              </p>

              <h3>3. Schildklierprobleme (hypothyreoïdie)</h3>
              <p>
                Een trage schildklier vertraagt het metabolisme, wat leidt tot lethargie, gewichtstoename en huidproblemen. Komt vooral voor bij middelgrote tot grote rassen.
              </p>

              <h3>4. Hart- en longproblemen</h3>
              <p>
                Hartaandoeningen of longproblemen verminderen zuurstoftoevoer, waardoor hond snel moe wordt en meer rust nodig heeft.
              </p>

              <h3>5. Diabetes</h3>
              <p>
                Onbehandelde diabetes veroorzaakt energieverlies, lethargie, overmatig drinken en plassen, en gewichtsverlies ondanks goede eetlust.
              </p>

              <h3>6. Anemie (bloedarmoede)</h3>
              <p>
                Te weinig rode bloedcellen betekent verminderde zuurstoftransport. Symptomen: bleek tandvlees, zwakte, snelle ademhaling, lethargie.
              </p>

              <h3>7. Lever- of nierziekte</h3>
              <p>
                Chronische lever- of nierziekte leidt tot ophoping van toxines, wat lethargie, verminderde eetlust en braken veroorzaakt.
              </p>

              <h3>8. Medicatie bijwerkingen</h3>
              <p>
                Sommige medicijnen (pijnstillers, kalmerende middelen, antihistaminica) hebben slaperigheid als bijwerking.
              </p>

              <BetweenContentAd sponsorAd={null} />

              <h2>Gedragsmatige redenen voor veel slapen</h2>

              <p>
                Niet alle overmatig slapen wijst op ziekte. Soms zijn er gedragsmatige of omgevingsfactoren:
              </p>

              <h3>1. Verveling</h3>
              <p>
                Honden zonder voldoende mentale of fysieke stimulatie slapen uit verveling. Als er niets te doen is, is slapen de makkelijkste optie.
              </p>

              <p><strong>Oplossing:</strong></p>
              <ul>
                <li>Langere of meer uitdagende wandelingen</li>
                <li>Interactief speelgoed en voerpuzzels</li>
                <li>Training en nieuwe trucs leren</li>
                <li>Socialisatie met andere honden (hondenweides, speeldates)</li>
              </ul>

              <h3>2. Depressie of angst</h3>
              <p>
                Ja, honden kunnen depressief worden door verlies van familielid (mens of dier), verhuizing of chronische stress. Symptomen lijken op lethargie.
              </p>

              <p><strong>Oplossing:</strong></p>
              <ul>
                <li>Meer kwaliteitstijd en aandacht</li>
                <li>Vaste routine voor zekerheid</li>
                <li>Positieve versterking en beloningen</li>
                <li>Overweeg gedragsdeskundige of angstwerende medicatie</li>
              </ul>

              <h3>3. Weersomstandigheden</h3>
              <p>
                Extreme hitte of kou kan honden slaperig maken. In warme periodes conserveren honden energie door meer te slapen.
              </p>

              <h3>4. Leeftijd gerelateerd</h3>
              <p>
                Puppy's en senior honden hebben gewoon meer slaap nodig voor groei en herstel. Dit is volkomen normaal.
              </p>

              <h2>Slaapbehoeften per hondentype</h2>

              <h3>Grote rassen vs kleine rassen</h3>
              <p>
                <strong>Grote rassen</strong> (zoals Mastiffs, Great Danes) slapen vaak meer (16-18 uur) omdat hun lichaam meer energie gebruikt voor basisfuncties.
              </p>

              <p>
                <strong>Kleine rassen</strong> (zoals Chihuahua's, Yorkshire Terriers) zijn vaak actiever en slapen 12-14 uur.
              </p>

              <h3>Werkende rassen vs gezelschapshonden</h3>
              <p>
                <strong>Werkende rassen</strong> (Border Collie, Australische Herder) hebben mentale en fysieke uitdaging nodig. Zonder voldoende stimulatie kunnen ze meer gaan slapen uit verveling.
              </p>

              <p>
                <strong>Gezelschapshonden</strong> (Cavalier King Charles Spaniel, Shih Tzu) zijn vaak tevreden met relaxen en slapen van nature meer.
              </p>

              <BetweenContentAd sponsorAd={null} />

              <h2>Wanneer moet je naar de dierenarts?</h2>

              <p>
                Maak een afspraak met de dierenarts als je één of meer van deze signalen ziet:
              </p>

              <ul>
                <li>🔴 <strong>Plotselinge verandering:</strong> Hond die normaal actief is, slaapt ineens veel meer</li>
                <li>🔴 <strong>Moeilijk wakker maken:</strong> Hond reageert niet op normale stimuli</li>
                <li>🔴 <strong>Geen interesse in eten/drinken:</strong> Weigert voer of water meer dan 24 uur</li>
                <li>🔴 <strong>Andere symptomen:</strong> Braken, diarree, hoesten, moeilijk ademen</li>
                <li>🔴 <strong>Pijn signalen:</strong> Janken, niet willen bewegen, gevoelig bij aanraking</li>
                <li>🔴 <strong>Gedragsverandering:</strong> Verwardheid, desoriëntatie, agressie</li>
                <li>🔴 <strong>Gewichtsverlies:</strong> Onverklaard gewichtsverlies ondanks normale eetlust</li>
              </ul>

              <p>
                Je dierenarts kan onderzoek doen via:
              </p>
              <ul>
                <li>Lichamelijk onderzoek en temperatuurmeting</li>
                <li>Bloedonderzoek (schildklier, nier, lever, bloedbeeld)</li>
                <li>Urineonderzoek</li>
                <li>Röntgenfoto's of echo</li>
                <li>Specifieke testen (Lyme, Ehrlichia, etc.)</li>
              </ul>

              <h2>Tips voor gezonde slaapgewoonten</h2>

              <h3>✅ Creëer een comfortabele slaapomgeving</h3>
              <ul>
                <li>Zacht, ondersteunend hondenbed (belangrijk voor oudere honden met artrose)</li>
                <li>Rustige plek zonder teveel drukte of lawaai</li>
                <li>Goede temperatuurregeling (niet te warm, niet te koud)</li>
              </ul>

              <h3>✅ Vaste routine</h3>
              <ul>
                <li>Vaste tijden voor wandelen, eten en spelen</li>
                <li>Voorspelbare dag-nachtritme</li>
                <li>Rustperiode na maaltijden (voorkomt maagdraaiing)</li>
              </ul>

              <h3>✅ Voldoende beweging en mentale stimulatie</h3>
              <ul>
                <li>Dagelijkse wandelingen aangepast aan leeftijd en conditie</li>
                <li>Speeltijd en sociale interactie</li>
                <li>Hersenwerk: training, puzzels, nieuw speelgoed</li>
              </ul>

              <h3>✅ Gezonde voeding</h3>
              <ul>
                <li>Kwaliteitsvoer aangepast aan leeftijd en activiteitsniveau</li>
                <li>Vermijd overgewicht (veroorzaakt meer slaperigheid en gezondheidsproblemen)</li>
                <li>Vaste voertijden</li>
              </ul>

              <h2>Veelgestelde vragen</h2>

              <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 mb-4">
                <summary className="font-semibold text-cpCharcoal dark:text-cpCream cursor-pointer">
                  Dromen honden net als mensen?
                </summary>
                <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80">
                  Ja! Honden hebben REM-slaap waarin ze dromen. Je ziet dit aan bewegende poten (alsof ze rennen), geluiden maken, of oogbewegingen onder gesloten oogleden. Wek een dromende hond niet plotseling – ze kunnen gedesoriënteerd en angstig wakker worden.
                </p>
              </details>

              <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 mb-4">
                <summary className="font-semibold text-cpCharcoal dark:text-cpCream cursor-pointer">
                  Moet ik mijn hond wakker maken als hij de hele dag slaapt?
                </summary>
                <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80">
                  Nee, laat slapende honden liggen – tenzij je vermoedt lethargie in plaats van normaal slapen. Test door zachtjes te roepen of favoriete speeltje te laten zien. Gezonde hond wordt dan alert. Lethargische hond reageert nauwelijks.
                </p>
              </details>

              <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 mb-4">
                <summary className="font-semibold text-cpCharcoal dark:text-cpCream cursor-pointer">
                  Is het normaal dat mijn puppy 20 uur per dag slaapt?
                </summary>
                <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80">
                  Ja, absoluut! Puppy's hebben 18-20 uur slaap nodig voor gezonde groei en hersenontwikkeling. Ze gaan van hyperactief spelen naar diep slapen binnen minuten. Dit is volkomen normaal en essentieel.
                </p>
              </details>

              <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 mb-4">
                <summary className="font-semibold text-cpCharcoal dark:text-cpCream cursor-pointer">
                  Slapen honden 's nachts door?
                </summary>
                <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80">
                  De meeste volwassen honden slapen 's nachts 8-10 uur door, mits ze een vaste routine hebben en voldoende beweging overdag krijgen. Puppy's en oude honden moeten vaak 's nachts nog naar buiten. Train een consistente slaap-routine vanaf jonge leeftijd.
                </p>
              </details>

              <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 mb-4">
                <summary className="font-semibold text-cpCharcoal dark:text-cpCream cursor-pointer">
                  Kan mijn hond te veel slapen?
                </summary>
                <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80">
                  "Te veel" slapen is altijd relatief. Als je hond plotseling meer gaat slapen dan normaal (voor hem), alert en energiek is wanneer wakker, en geen andere symptomen heeft, is er waarschijnlijk niets aan de hand. Blijvende verandering of lethargie = dierenarts.
                </p>
              </details>

              <h2>Conclusie: ken je hond en let op veranderingen</h2>

              <p>
                Het is volkomen normaal dat honden 12-14 uur per dag slapen – en puppy's en seniors zelfs nog meer. De sleutel is om <strong>je eigen hond te kennen</strong> en alert te zijn op plotselinge veranderingen in slaappatroon.
              </p>

              <p>
                Een hond die graag slaapt maar enthousiast en alert is tijdens wandelingen en speeltijd is gezond. Een hond die plotseling lethargisch wordt, moeilijk wakker te maken is of andere symptomen vertoont, verdient aandacht van een dierenarts.
              </p>

              <p>
                💤 <em>Vertrouw op je intuïtie als hondeneigenaar. Jij kent je hond het beste en ziet als eerste wanneer iets niet klopt!</em>
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-cpCharcoal/10 dark:border-cpCream/10">
                <Tag className="w-4 h-4 text-cpCharcoal/60 dark:text-cpCream/60" />
                <span className="text-sm text-cpCharcoal/60 dark:text-cpCream/60">Tags:</span>
                <Link href="/nl/gids/huisdiergedrag" className="text-sm px-3 py-1 bg-cpCoral/10 hover:bg-cpCoral/20 dark:bg-cpCoral/20 dark:hover:bg-cpCoral/30 text-cpCharcoal dark:text-cpCream rounded-full transition-colors">
                  Huisdiergedrag
                </Link>
                <Link href="/nl/gids/dierengezondheid" className="text-sm px-3 py-1 bg-cpCoral/10 hover:bg-cpCoral/20 dark:bg-cpCoral/20 dark:hover:bg-cpCoral/30 text-cpCharcoal dark:text-cpCream rounded-full transition-colors">
                  Dierengezondheid
                </Link>
                <span className="text-sm px-3 py-1 bg-cpCoral/10 text-cpCharcoal dark:bg-cpCoral/20 dark:text-cpCream rounded-full">
                  Hondengedrag
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
                  href="/nl/gids/huisdiergedrag/hondengedrag-begrijpen"
                  className="block p-6 bg-cpSurface dark:bg-cpCharcoal/50 rounded-xl hover:shadow-lg transition-all border border-cpCharcoal/5 dark:border-cpCream/5 hover:border-cpCoral/20"
                >
                  <h4 className="font-semibold text-cpCharcoal dark:text-cpCream mb-2">
                    Hondengedrag begrijpen: lichaamstaal en communicatie
                  </h4>
                  <p className="text-sm text-cpCharcoal/70 dark:text-cpCream/70">
                    Leer de signalen van je hond te herkennen en beter communiceren met je viervoeter.
                  </p>
                </Link>

                <Link
                  href="/nl/gids/senior-huisdieren/oudere-hond-verzorging"
                  className="block p-6 bg-cpSurface dark:bg-cpCharcoal/50 rounded-xl hover:shadow-lg transition-all border border-cpCharcoal/5 dark:border-cpCream/5 hover:border-cpCoral/20"
                >
                  <h4 className="font-semibold text-cpCharcoal dark:text-cpCream mb-2">
                    Oudere hond verzorgen: complete gids
                  </h4>
                  <p className="text-sm text-cpCharcoal/70 dark:text-cpCream/70">
                    Alles over de behoeften van senior honden: van voeding tot comfort en gezondheidszorg.
                  </p>
                </Link>

                <Link
                  href="/nl/gids/puppies-kittens/puppy-slaaptraining"
                  className="block p-6 bg-cpSurface dark:bg-cpCharcoal/50 rounded-xl hover:shadow-lg transition-all border border-cpCharcoal/5 dark:border-cpCream/5 hover:border-cpCoral/20"
                >
                  <h4 className="font-semibold text-cpCharcoal dark:text-cpCream mb-2">
                    Puppy slaaptraining: doorslapen in 7 stappen
                  </h4>
                  <p className="text-sm text-cpCharcoal/70 dark:text-cpCream/70">
                    Leer je puppy gezonde slaapgewoonten met deze bewezen methode.
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
                    Hoeveel slapen honden?
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Normaal vs lethargie
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Medische oorzaken
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Gedragsoorzaken
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Wanneer naar dierenarts?
                  </a>
                </nav>
              </div>

              {/* Popular Categories */}
              <div className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-xl p-6 border border-cpCharcoal/5 dark:border-cpCream/5">
                <h3 className="font-semibold text-cpCharcoal dark:text-cpCream mb-4">
                  Populaire categorieën
                </h3>
                <div className="space-y-2">
                  <Link href="/nl/gids/huisdiergedrag" className="block text-cpCoral hover:text-cpAmber transition-colors text-sm">
                    → Huisdiergedrag
                  </Link>
                  <Link href="/nl/gids/dierengezondheid" className="block text-cpCoral hover:text-cpAmber transition-colors text-sm">
                    → Dierengezondheid
                  </Link>
                  <Link href="/nl/gids/hondenverzorging" className="block text-cpCoral hover:text-cpAmber transition-colors text-sm">
                    → Hondenverzorging
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
            "headline": "Hond slaapt de hele dag: is dat normaal?",
            "description": "Moet je je zorgen maken als je hond de hele dag slaapt? Ontdek hoeveel slaap normaal is per leeftijd, wanneer overmatig slapen zorgwekkend is en wat je kunt doen.",
            "image": "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?q=80&w=2000",
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
              "@id": "https://cutiepawspedia.nl/nl/blog/hond-slaapt-hele-dag"
            },
            "keywords": "hond slaapt veel, hond moe, hoeveel slaap hond, hond slaapt de hele dag, lethargie hond",
            "articleSection": "Huisdiergedrag",
            "wordCount": 1900
          })
        }}
      />
    </article>
  );
}
