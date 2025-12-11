/**
 * Blog Post: Waarom spint mijn kat? De wetenschap achter het spinnen
 * Category: huisdiergedrag
 * Keywords: kat spint, spinnen kat, kat snort
 */

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Waarom Spint Mijn Kat? De Wetenschap Achter het Spinnen | CutiePawsPedia",
  description: "Ontdek waarom katten spinnen, wat het betekent, en de fascinerende wetenschap achter dit unieke geluid. Van geluk tot genezing – alles over katten spinnen.",
  openGraph: {
    title: "Waarom Spint Mijn Kat? De Wetenschap Achter het Spinnen",
    description: "Ontdek waarom katten spinnen, wat het betekent, en de fascinerende wetenschap achter dit unieke geluid.",
    type: "article",
    images: ["https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=1200&h=630&fit=crop"],
  },
};

export default function BlogPost() {
  const publishDate = "11 december 2024";
  const readingTime = 7;

  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      <div className="container mx-auto max-w-6xl px-4 pt-8">
        <Link href="/nl/blog" className="inline-flex items-center gap-2 text-muted-foreground dark:text-cpCream/70 hover:text-cpCoral dark:hover:text-cpCoral transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Terug naar blog
        </Link>
      </div>

      <header className="container mx-auto max-w-6xl px-4 py-8">
        <span className="inline-block px-3 py-1 bg-cpCoral/10 dark:bg-cpCoral/20 text-cpCoral text-sm font-medium rounded-full mb-4">
          Huisdiergedrag
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-6 leading-tight max-w-4xl">
          Waarom Spint Mijn Kat? De Wetenschap Achter het Spinnen
        </h1>
        <div className="flex flex-wrap items-center gap-6 text-muted-foreground dark:text-cpCream/60">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {publishDate}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {readingTime} min leestijd
          </span>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl px-4 mb-8">
        <div className="relative aspect-video rounded-3xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=1200&h=800&fit=crop"
            alt="Tevreden spinnende kat wordt geaaid"
            fill
            className="object-cover"
            priority
          />
          <a
            href="https://unsplash.com/@paul_hanaoka"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 right-3 flex items-center gap-1.5 text-white/80 text-xs bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5 hover:bg-black/60 hover:text-white transition-all"
          >
            <span>📷</span>
            <span>Paul Hanaoka</span>
            <span className="opacity-50">•</span>
            <span className="opacity-75">Unsplash</span>
          </a>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <article className="flex-1 min-w-0">
            <div className="bg-card dark:bg-cpSurface/30 rounded-3xl p-6 md:p-10 border border-border dark:border-cpAmber/10">
              <p className="text-lg text-foreground dark:text-cpCream font-medium mb-6 pb-6 border-b border-border dark:border-cpAmber/10">
                Het spinnen van een kat is een van de meest herkenbare en geliefde geluiden in de dierenwereld. Maar waarom doen katten dit eigenlijk? En wat betekent het? De wetenschap achter spinnen is fascinerender dan je zou denken – van communicatie tot zelfgenezing.
              </p>

              <div className="prose prose-lg max-w-none dark:prose-invert">
                <h2 id="heading-hoe-werkt-spinnen" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Hoe Werkt Spinnen Eigenlijk?
                </h2>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Lange tijd was het een mysterie hoe katten precies spinnen. We weten nu dat het komt door snelle samentrekkingen van de spieren in het strottenhoofd (larynx):
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>De spieren trillen 25-150 keer per seconde</li>
                  <li>Dit veroorzaakt een vibratie in de stembanden</li>
                  <li>Bij zowel in- als uitademen ontstaat het spinnende geluid</li>
                  <li>Katten kunnen spinnen en tegelijkertijd eten, drinken of ademen</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Interessant feit:</strong> Niet alle katachtigen kunnen spinnen. Grote katten zoals leeuwen en tijgers kunnen brullen maar niet spinnen. Kleinere katachtigen zoals huiskatten, puma's en cheetahs kunnen wel spinnen maar niet brullen!
                </p>

                <div className="my-8 p-6 bg-cpAmber/5 dark:bg-cpAmber/10 border-2 border-dashed border-cpAmber/30 dark:border-cpAmber/40 rounded-2xl text-center">
                  <p className="text-sm text-muted-foreground dark:text-cpCream/60 mb-2">Advertentie</p>
                  <p className="text-cpCoral font-medium">😸 Gelukkige katten beginnen met goed voer</p>
                </div>

                <h2 id="heading-waarom-katten-spinnen" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  De 7 Redenen Waarom Katten Spinnen
                </h2>

                <h3 id="heading-reden-1-geluk" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  1. Geluk en Tevredenheid
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Dit is de meest bekende reden – en vaak klopt het! Katten spinnen vaak wanneer ze:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Geaaid worden op hun favoriete plekjes</li>
                  <li>Lekker liggen te zonnen</li>
                  <li>Knuffelen met hun baasje</li>
                  <li>Net gegeten hebben en voldaan zijn</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Een tevreden, spinnende kat op je schoot is het ultieme compliment – je kat voelt zich veilig en gelukkig bij jou.
                </p>

                <h3 id="heading-reden-2-moeder-kitten" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  2. Moeder-Kitten Communicatie
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Kittens beginnen al binnen een paar dagen na de geboorte te spinnen:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Moederkatten spinnen om kittens gerust te stellen tijdens het voeden</li>
                  <li>Kittens spinnen terug om te laten weten: "Alles is goed, ik drink lekker"</li>
                  <li>Spinnen creëert een band tussen moeder en kittens</li>
                  <li>Volwassen katten behouden dit gedrag richting hun menselijke "ouders"</li>
                </ul>

                <h3 id="heading-reden-3-aandacht-vragen" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  3. Aandacht of Voedsel Vragen
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Katten hebben geleerd dat spinnen werkt als communicatiemiddel:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Een spinnende kat die om je benen loopt bij etenstijd zegt eigenlijk: "Voederen, alsjeblieft!"</li>
                  <li>Sommige katten hebben een "solicitation purr" – een speciaal spin-miauw geluid</li>
                  <li>Dit geluid heeft een frequentie die lijkt op een huilende baby (!) en activeert onze zorgreactie</li>
                </ul>

                <h3 id="heading-reden-4-stress-angst" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  4. Stress, Angst of Pijn
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Verrassend: katten spinnen ook in stressvolle situaties:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Bij de dierenarts</li>
                  <li>Tijdens bevalling</li>
                  <li>Wanneer ze gewond of ziek zijn</li>
                  <li>In hun laatste momenten van het leven</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Waarom? Spinnen lijkt een zelfgeruststelling te zijn – een manier om zichzelf te kalmeren, zoals wij neuriën of zingen wanneer we nerveus zijn.
                </p>

                <div className="my-8 p-6 bg-cpAmber/5 dark:bg-cpAmber/10 border-2 border-dashed border-cpAmber/30 dark:border-cpAmber/40 rounded-2xl text-center">
                  <p className="text-sm text-muted-foreground dark:text-cpCream/60 mb-2">Advertentie</p>
                  <p className="text-cpCoral font-medium">🏥 Kattenzorgverzekering vanaf €8 per maand</p>
                </div>

                <h3 id="heading-reden-5-genezing" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  5. Zelfgenezing en Herstel
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Dit is misschien wel het meest fascinerende aspect van spinnen. Wetenschappelijk onderzoek suggereert dat spinnen daadwerkelijk helpt bij genezing:
                </p>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>De genezende frequenties:</strong>
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Katten spinnen tussen 25-150 Hz</li>
                  <li>Frequenties tussen 25-50 Hz bevorderen botgenezing en dichtheid</li>
                  <li>Frequenties tussen 100-200 Hz helpen bij pijnverlichting</li>
                  <li>Trillingen kunnen weefselherstel stimuleren</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Feit:</strong> Katten hebben een uitzonderlijk laag percentage botbreuken en een sneller herstel dan andere dieren van vergelijkbare grootte. Spinnen zou hier een rol in kunnen spelen!
                </p>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Voor mensen:</strong> Onderzoek toont aan dat het aaien van een spinnende kat kan:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Bloeddruk verlagen</li>
                  <li>Stress verminderen</li>
                  <li>Angst verminderen</li>
                  <li>Het risico op hart- en vaatziekten verlagen</li>
                </ul>

                <h3 id="heading-reden-6-territorium" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  6. Territorium Markeren
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Wanneer je kat spinnend tegen je aan wrijft, doet hij eigenlijk twee dingen:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Geurklieren in het gezicht laten feromonen achter: "Dit is van mij!"</li>
                  <li>Spinnen bekrachtigt deze sociale binding</li>
                  <li>Het is een vriendelijke manier van claimen – jij bent onderdeel van zijn roedel</li>
                </ul>

                <h3 id="heading-reden-7-sociale-band" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  7. Sociale Verbinding en Verzoening
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Katten gebruiken spinnen ook in sociale interacties met andere katten:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Na een conflict kan spinnen een verzoenend gebaar zijn</li>
                  <li>Katten die samen opgroeien spinnen vaak samen</li>
                  <li>Het versterkt de sociale band binnen een kattengroep</li>
                </ul>

                <h2 id="heading-soorten-spinnen" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Verschillende Soorten Spinnen
                </h2>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Niet alle spinsessies zijn hetzelfde! Ervaren katteneigenaren leren de nuances herkennen:
                </p>

                <h3 id="heading-tevreden-spin" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Het Tevreden Spinnen
                </h3>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Laag volume, constant ritme</li>
                  <li>Ontspannen lichaamshouding</li>
                  <li>Half dichtgeknepen ogen</li>
                  <li>Soms met kneden (breadmaking)</li>
                </ul>

                <h3 id="heading-aandacht-spin" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Het "Ik Wil Iets" Spinnen
                </h3>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Hoger volume, urgent</li>
                  <li>Afgewisseld met miauwen</li>
                  <li>Actieve lichaamshouding</li>
                  <li>Oogcontact en om aandacht vragen</li>
                </ul>

                <h3 id="heading-stress-spin" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Het Stress-Spinnen
                </h3>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Lager volume, onregelmatig</li>
                  <li>Gespannen lichaamshouding</li>
                  <li>Grote pupillen, oren naar achteren</li>
                  <li>Vaak gecombineerd met andere stress-signalen</li>
                </ul>

                <div className="my-8 p-6 bg-cpAmber/5 dark:bg-cpAmber/10 border-2 border-dashed border-cpAmber/30 dark:border-cpAmber/40 rounded-2xl text-center">
                  <p className="text-sm text-muted-foreground dark:text-cpCream/60 mb-2">Advertentie</p>
                  <p className="text-cpCoral font-medium">🐈 Kattengedrag cursus: begrijp je kat beter</p>
                </div>

                <h2 id="heading-wanneer-zorgen" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Wanneer Moet je je Zorgen Maken?
                </h2>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Hoewel spinnen meestal positief is, zijn er situaties waarin het een waarschuwing kan zijn:
                </p>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Ga naar de dierenarts als:</strong>
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Je kat plots veel meer of minder spint dan normaal</li>
                  <li>Spinnen gepaard gaat met andere symptomen (niet eten, braken, lethargie)</li>
                  <li>Het spinnen klinkt abnormaal of hortend</li>
                  <li>Je kat spint terwijl hij zich verstopt of teruggetrokken gedrag vertoont</li>
                  <li>Spinnen lijkt moeizaam of gepaard te gaan met ademhalingsproblemen</li>
                </ul>

                <h2 id="heading-katten-zonder-spin" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Waarom Spint Mijn Kat Niet?
                </h2>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Sommige katten spinnen gewoon minder dan andere, en dat is volkomen normaal:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Sommige katten spinnen zo zacht dat je het niet hoort (maar wel voelt)</li>
                  <li>Bepaalde rassen spinnen natuurlijk minder</li>
                  <li>Katten die vroeg gescheiden zijn van hun moeder hebben het misschien niet geleerd</li>
                  <li>Sommige katten tonen hun genegenheid op andere manieren (langzaam knipperen, hoofdstoten)</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Let op:</strong> Als een kat die normaal spint plots stopt, kan dit wijzen op pijn of ziekte. Laat dit altijd checken door een dierenarts.
                </p>

                <h2 id="heading-menselijk-spinnen" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Kunnen Mensen "Spinnen"?
                </h2>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Hoewel we niet kunnen spinnen zoals katten, is de wetenschap achter spinnen zo interessant dat het wordt onderzocht voor medische toepassingen:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li><strong>Triltherapie:</strong> Gebruikt vergelijkbare frequenties voor botdichtheid bij osteoporose</li>
                  <li><strong>Pijnmanagement:</strong> Vibratie-apparaten voor chronische pijn</li>
                  <li><strong>Sportgeneeskunde:</strong> Herstel na blessures versnellen</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Katten hebben ons onbewust misschien een belangrijk genezingsmechanisme laten zien!
                </p>

                <h2 id="heading-maximaliseer-spin" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Hoe Maximaliseer je het Spinnen van je Kat?
                </h2>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Aai je kat op zijn favoriete plekjes (kin, wangen, achter de oren)</li>
                  <li>Creëer een rustige, veilige omgeving</li>
                  <li>Respecteer je kat wanneer hij geen aandacht wil</li>
                  <li>Zorg voor een consistente routine</li>
                  <li>Speel regelmatig met je kat om een band op te bouwen</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Onthoud:</strong> Een spinnende kat is meestal een gelukkige kat. Geniet van dit bijzondere geluid – het is een van de mooiste geluiden die de natuur ons gegeven heeft! 🐱💚
                </p>
              </div>

              {/* FAQ Section */}
              <div className="mt-12 pt-8 border-t border-border dark:border-cpAmber/10">
                <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">Veelgestelde Vragen</h2>

                <div className="space-y-4">
                  <details className="group bg-secondary/50 dark:bg-cpSurface/50 rounded-xl p-4">
                    <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer list-none flex justify-between items-center">
                      Waarom spint mijn kat en bijt hij me dan?
                      <span className="text-cpCoral">+</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                      Dit wordt "love biting" genoemd. Je kat is zo opgewonden van de aandacht dat hij niet weet hoe hij zijn gevoelens moet uiten. Het is meestal speels, niet agressief. Stop met aaien zodra je dit gedrag ziet en geef je kat ruimte om te kalmeren.
                    </p>
                  </details>

                  <details className="group bg-secondary/50 dark:bg-cpSurface/50 rounded-xl p-4">
                    <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer list-none flex justify-between items-center">
                      Kunnen katten en spinnen tegelijk ademen?
                      <span className="text-cpCoral">+</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                      Ja! In tegenstelling tot wat vroeger gedacht werd, kunnen katten spinnen tijdens zowel in- als uitademen. Ze kunnen zelfs eten, drinken en spinnen tegelijk – het interfereert niet met hun normale ademhaling.
                    </p>
                  </details>

                  <details className="group bg-secondary/50 dark:bg-cpSurface/50 rounded-xl p-4">
                    <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer list-none flex justify-between items-center">
                      Waarom kneedt mijn kat terwijl hij spint?
                      <span className="text-cpCoral">+</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                      Kneden (ook wel "brood maken" genoemd) is gedrag uit kittenheid. Kittens kneden de buik van hun moeder om melkproductie te stimuleren. Volwassen katten behouden dit gedrag als ze zich extreem gelukkig en veilig voelen – het is het ultieme compliment!
                    </p>
                  </details>

                  <details className="group bg-secondary/50 dark:bg-cpSurface/50 rounded-xl p-4">
                    <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer list-none flex justify-between items-center">
                      Spinnen alle katachtigen?
                      <span className="text-cpCoral">+</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                      Nee. De meeste kleine en middelgrote katachtigen kunnen spinnen (huiskatten, puma's, cheetahs, lynxen). Grote katten zoals leeuwen, tijgers en jaguars kunnen brullen maar niet spinnen. Dit heeft te maken met verschillen in de anatomie van het strottenhoofd.
                    </p>
                  </details>

                  <details className="group bg-secondary/50 dark:bg-cpSurface/50 rounded-xl p-4">
                    <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer list-none flex justify-between items-center">
                      Is het slecht als mijn kat te veel spint?
                      <span className="text-cpCoral">+</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                      Meestal niet! Sommige katten spinnen gewoon veel. Let wel op als het spinnen plots veel meer wordt en gepaard gaat met andere gedragsveranderingen – dit kan wijzen op stress of pijn. Bij twijfel altijd de dierenarts raadplegen.
                    </p>
                  </details>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Tag className="w-4 h-4 text-muted-foreground dark:text-cpCream/60" />
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">kat spint</span>
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">spinnen kat</span>
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">kattengedrag</span>
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">kat wetenschap</span>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-20 space-y-6">
              <div className="bg-card dark:bg-cpSurface/30 rounded-2xl p-6 border border-border dark:border-cpAmber/10">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-4">Gerelateerde Artikelen</h3>
                <div className="space-y-3">
                  <Link href="/nl/gids/huisdiergedrag/katten" className="block text-sm text-cpCoral hover:underline">
                    → Kattengedrag Ontcijferd
                  </Link>
                  <Link href="/nl/gids/kattenverzorging/communicatie" className="block text-sm text-cpCoral hover:underline">
                    → Kattentaal: Wat Zegt je Kat?
                  </Link>
                  <Link href="/nl/gids/kattenverzorging/welzijn" className="block text-sm text-cpCoral hover:underline">
                    → Gelukkige Kat: 10 Tekenen
                  </Link>
                </div>
              </div>

              <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/10 dark:from-cpCoral/20 dark:to-cpAmber/20 rounded-2xl p-6 border-2 border-dashed border-cpCoral/30 dark:border-cpCoral/40">
                <p className="text-xs text-muted-foreground dark:text-cpCream/60 mb-2">Advertentie</p>
                <p className="font-bold text-foreground dark:text-cpCream mb-2">Kattengedrag Cursus</p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">Leer je kat beter begrijpen • Online • Expert-led</p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Waarom Spint Mijn Kat? De Wetenschap Achter het Spinnen",
            description: "Ontdek waarom katten spinnen, wat het betekent, en de fascinerende wetenschap achter dit unieke geluid. Van geluk tot genezing – alles over katten spinnen.",
            image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=1200&h=630&fit=crop",
            datePublished: "2024-12-11",
            author: { "@type": "Organization", name: "CutiePawsPedia" },
          }),
        }}
      />
    </div>
  );
}
