import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Meerdere huisdieren in één huis: tips voor harmonie",
  description: "Leer hoe je honden en katten samen laat leven. Praktische tips voor het introduceren van nieuwe huisdieren en het behouden van harmonie in een multi-pet huishouden.",
  keywords: "meerdere huisdieren, hond en kat samen, nieuwe huisdier introduceren, multi-pet huishouden, harmonie huisdieren, tweede hond",
  openGraph: {
    title: "Meerdere huisdieren in één huis: tips voor harmonie",
    description: "Ontdek hoe je meerdere huisdieren succesvol samen laat leven. Van introductie tot dagelijks management. Vind een gedragstherapeut.",
    type: "article",
  },
};

export default function MeerdereHuisdierenPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cpYellow/10 via-cpPink/10 to-cpAqua/10 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl shadow-md p-8 md:p-12 border border-border dark:border-cpAmber/20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpYellow/10 border border-cpYellow/30 mb-6">
              <span className="text-2xl">🐾</span>
              <span className="text-sm font-medium text-foreground">Multi-Pet Specialist</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
              Meerdere huisdieren in één huis: tips voor harmonie
            </h1>
            <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-8">
              Een tweede hond of kat erbij? Ontdek hoe je nieuwe huisdieren succesvol introduceert en harmonie creëert in een multi-pet huishouden. Van eerste introductie tot dagelijks samenleven.
            </p>
            <Button
              size="lg"
              className="bg-cpYellow text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform shadow-lg"
              asChild
            >
              <Link href="/nl/netherlands">
                Vind een gedragstherapeut bij jou in de buurt →
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-8">
            Meerdere huisdieren in één huis kan een prachtige ervaring zijn - de dieren houden elkaar gezelschap en verrijken elkaars leven. Maar het kan ook complex zijn. Verkeerde introductie kan leiden tot langdurig conflict, stress en zelfs agressie. Met de juiste aanpak en geduld kunnen de meeste huisdieren leren vredig samen te leven. In dit artikel leer je stap voor stap hoe je dit succesvol aanpakt.
          </p>

          {/* Section 1 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Voor je begint: Belangrijke overwegingen
          </h2>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Compatibiliteit inschatten
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Niet alle huisdieren zijn geschikt voor multi-pet huishoudens. Overweeg:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Huidig huisdier:</strong> Is je hond of kat sociaal? Heeft hij/zij positieve ervaringen met soortgenoten? Agressiegeschiedenis?</li>
            <li><strong>Leeftijd en energie:</strong> Een jonge energieke puppy kan een oudere kat stressen. Match energieniveaus waar mogelijk</li>
            <li><strong>Persoonlijkheid:</strong> Een dominante hond + dominante hond = potentieel conflict. Een speelse kat + schuwe kat = stress</li>
            <li><strong>Ras en type:</strong> Sommige honden hebben hoge prooiaandrang (terriërs, jachthonden) - niet ideaal met katten of kleine dieren</li>
            <li><strong>Ruimte:</strong> Meerdere huisdieren vereisen voldoende ruimte voor ieders eigen plek</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Timing is alles
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
            Wacht minimaal 6 maanden na adoptie van je eerste huisdier voordat je een tweede neemt. Je eerste huisdier moet volledig gesetteld zijn, training onder de knie hebben, en een sterke band met jou hebben. Introduceren tijdens stressvolle periodes (verhuizing, baby verwachten, werkdruk) is vragen om problemen.
          </p>

          {/* CTA Middle */}
          <div className="bg-gradient-to-br from-cpAqua/10 to-cpYellow/10 rounded-2xl p-8 my-12 border border-cpAqua/30">
            <div className="flex items-start gap-4">
              <span className="text-4xl">🎯</span>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                  Professionele introductie-begeleiding
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
                  Een gedragstherapeut kan je begeleiden bij de introductie en potentiële problemen vroegtijdig signaleren. Vooral waardevol bij risicovolle combinaties.
                </p>
                <Button
                  className="bg-cpAqua text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
                  asChild
                >
                  <Link href="/nl/netherlands">
                    Bekijk gedragstherapeuten in jouw regio →
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Scenario 1: Twee honden introduceren
          </h2>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Stap 1: Eerste ontmoeting op neutraal terrein
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            NOOIT direct thuis introduceren - dit is het territorium van je huidige hond.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li>Kies een neutrale locatie: park, rustig veld, of breed trottoir</li>
            <li>Beide honden aan de lijn met twee begeleiders</li>
            <li>Start met parallel wandelen op veilige afstand (10-15 meter)</li>
            <li>Laat honden elkaars geur opnemen zonder direct contact</li>
            <li>Geleidelijk afstand verkleinen als lichaamstaal ontspannen blijft</li>
            <li>Eerste directe ontmoeting: kort, positief, eindig voordat ze het zat worden</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Stap 2: Positieve associaties creëren
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Tijdens de eerste ontmoetingen:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li>Beloon rustig gedrag bij aanwezigheid van andere hond met super lekkere snacks</li>
            <li>Houd ontmoetingen kort en positief (5-10 minuten eerste keer)</li>
            <li>Bouw langzaam op: meerdere korte ontmoetingen over dagen/weken</li>
            <li>Laat samen spelen alleen als BEIDE honden ontspannen en speelse lichaamstaal tonen</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Stap 3: Introductie thuis
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Pas wanneer meerdere neutrale ontmoetingen goed verlopen:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li>Verwijder eerst waardevolle items (speelgoed, kauwbotten, eetbakken)</li>
            <li>Laat nieuwe hond eerst tuin/huis verkennen zonder aanwezigheid huidige hond</li>
            <li>Breng dan beide honden samen, nog steeds aan lijn</li>
            <li>Laat los na 30 minuten rustig gedrag, maar blijf supervisen</li>
            <li>Eerste week: continu toezicht, gescheiden tijdens je afwezigheid</li>
            <li>Eigen slaapplekken, eetplekken en speelgoed voor beide honden</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Waarschuwingssignalen bij honden
          </h3>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 rounded-2xl p-6 mb-8">
            <h4 className="text-lg font-bold text-red-900 dark:text-red-200 mb-3">Stop de introductie als je ziet:</h4>
            <ul className="space-y-2 text-red-800 dark:text-red-300">
              <li>• Stijve lichaamstaal, intense starende blik</li>
              <li>• Lip optrekken, grommen, snauwen</li>
              <li>• Hackende haren, staart hoog en stijf</li>
              <li>• Achtervolgen zonder speelse onderbrekingen</li>
              <li>• Pesten of voortdurend dominantie tonen</li>
              <li>• Extreme angst (trillen, verstijven, proberen te vluchten)</li>
            </ul>
            <p className="text-red-800 dark:text-red-300 mt-4 font-medium">
              Bij deze signalen: neem meer tijd, werk aan desensibilisatie, overweeg professionele hulp.
            </p>
          </div>

          {/* Section 3 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Scenario 2: Twee katten introduceren
          </h2>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Stap 1: Isolatie en geur-uitwisseling (1-2 weken)
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Katten zijn territoriaal en introducties MOETEN langzaam. Start met complete isolatie:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li>Nieuwe kat in aparte kamer met eigen bakken, voer, speelgoed, krabpaal</li>
            <li>Ruil dagelijks geur: wrijf doek over beide katten en leg bij de ander</li>
            <li>Wissel kamer: nieuwe kat mag huis verkennen, huidige kat naar aparte ruimte</li>
            <li>Voer aan weerszijden van gesloten deur (associatie: andere kat = eten)</li>
            <li>Pas na minimaal 7 dagen naar volgende stap</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Stap 2: Visueel contact (1-2 weken)
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Gebruik baby gate of deur op kier:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li>Katten kunnen elkaar zien maar niet bij elkaar</li>
            <li>Voer geven tijdens visueel contact (positieve associatie)</li>
            <li>Speeltijd aan beide zijden van de barrière</li>
            <li>Blijf dit doen tot beide katten ontspannen zijn bij aanwezigheid van ander</li>
            <li>Dit kan 1-3 weken duren - haast je niet!</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Stap 3: Gecontroleerde fysieke ontmoeting
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Eindelijk direct contact:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li>Eerste sessie: 5-10 minuten, daarna weer scheiden</li>
            <li>Heb afleidingen klaar: speeltjes, snacks, laserpointje</li>
            <li>Laat katten elkaar verkennen in hun eigen tempo</li>
            <li>Bouw langzaam tijd samen op over dagen/weken</li>
            <li>Blijf toezicht houden - scheiding tijdens je afwezigheid eerste maand</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Essentiële voorzieningen bij meerdere katten
          </h3>
          <div className="bg-gradient-to-br from-cpPink/10 to-cpYellow/10 rounded-2xl p-6 mb-8 border border-cpPink/30">
            <h4 className="font-bold text-foreground dark:text-cpCream mb-3">Vuistregel: N + 1 van alles</h4>
            <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
              <li>• <strong>Kattenbakken:</strong> Aantal katten + 1 (2 katten = 3 bakken), in verschillende ruimtes</li>
              <li>• <strong>Voerbakken:</strong> Aparte locaties om conflict te vermijden</li>
              <li>• <strong>Waterbakken:</strong> Meerdere locaties door hele huis</li>
              <li>• <strong>Krabpalen:</strong> Minstens één per kat, bij ingangen en slaapplekken</li>
              <li>• <strong>Slaapplekken:</strong> Hoge en lage opties, verstopplekken</li>
              <li>• <strong>Speelgoed:</strong> Genoeg voor iedereen + interactief spelen met jou individueel</li>
            </ul>
          </div>

          {/* Section 4 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Scenario 3: Hond en kat introduceren
          </h2>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Voor je begint: Prooiaandrang testen
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
            Sommige honden hebben sterke prooiaandrang en zien katten als prooi. Test dit eerst veilig met kat achter hek of in kennel. Als je hond intense fixatie, janken, of jachtgedrag toont, is professionele begeleiding essentieel. Sommige honden zijn niet geschikt voor samenleven met katten.
          </p>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Stap 1: Isolatie en geur (zoals bij katten)
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Start met complete scheiding, geur uitwisseling, voeren aan weerszijden van deur. Duur: minimaal 1 week.
          </p>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Stap 2: Visueel contact met barrière
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Gebruik baby gate zodat ze elkaar zien maar niet kunnen bereiken:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li>Hond aan lijn, kat aan andere zijde van gate</li>
            <li>Beloon hond voor rustig gedrag en focus op jou (niet fixeren op kat)</li>
            <li>Train "kijk" commando: beloon wanneer hond naar jou kijkt ipv kat</li>
            <li>Blijf oefenen tot hond ontspannen kan zijn bij aanwezigheid kat</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Stap 3: Gecontroleerde ontmoeting
          </h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li>Hond aan lijn, kat vrij met vluchtroutes</li>
            <li>Kat moet kunnen ontsnappen naar hoge plekken (krabpaal, kast)</li>
            <li>Houd hond rustig, beloon voor negeren of rustig kijken naar kat</li>
            <li>Korte sessies, eindig terwijl het nog goed gaat</li>
            <li>Nooit kat achtervolgen toestaan - onderbreek meteen</li>
            <li>Bouw tijd samen op, blijf supervisen eerste 2-3 maanden</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Veiligheidsmaatregelen voor hond-kat combinaties
          </h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li>Baby gates om zones te creëren (kat-veilige zones)</li>
            <li>Hoge vluchtroutes voor kat (kasten, planken, krabpalen)</li>
            <li>Kattenbak en voer in hondvrije ruimte</li>
            <li>Nooit alleen laten samen eerste maanden</li>
            <li>Muilkorf overwegen bij honden met hoge prooiaandrang tijdens introductie</li>
          </ul>

          {/* Section 5 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Dagelijks management in multi-pet huishouden
          </h2>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Resources verdelen
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Conflict ontstaat vaak rond waardevolle resources:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Voeren:</strong> Aparte plekken, tegelijk voeren, niemand mag andermans bak leegeten</li>
            <li><strong>Speelgoed:</strong> Genoeg voor iedereen, roteer om jaloezie te voorkomen</li>
            <li><strong>Aandacht:</strong> Individuele tijd met elk huisdier dagelijks</li>
            <li><strong>Ruimte:</strong> Iedereen eigen slaapplek en veilige zone</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Individuele aandacht is cruciaal
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
            Elk huisdier verdient dagelijks one-on-one tijd met jou. Dit voorkomt jaloezie en versterkt je band. Voorbeelden: aparte wandelingen, individuele speeltijd, trainingsessies, knuffel tijd. Varieer wie eerst aandacht krijgt om geen hiërarchie te creëren.
          </p>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Conflict oplossen
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Kleine ruzies zijn normaal, maar je moet weten wanneer ingrijpen:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Normaal:</strong> Grommen als waarschuwing, korte standje, spel dat ruw lijkt maar beide partijen vrijwillig</li>
            <li><strong>Ingrijpen:</strong> Langdurige achtervolging, ene partij angstig, verwondingen, escalerend gedrag</li>
            <li><strong>Hoe:</strong> Afleiden met geluid, fysiek scheiden met barrière (NOOIT tussen vechters grijpen), time-out in aparte ruimtes</li>
            <li><strong>Daarna:</strong> Analyseer de trigger, vermijd herhaling, werk aan desensibilisatie</li>
          </ul>

          {/* Internal Links */}
          <div className="bg-cpYellow/10 border border-cpYellow/30 rounded-2xl p-6 my-8">
            <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-4">
              Meer over gedragsonderwerpen die kunnen helpen:
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/output/seo-pages/huisdiergedrag/agressie-honden" className="text-cpAqua hover:text-cpPink transition-colors font-medium">
                  → Agressie bij honden: oorzaken, signalen en aanpak
                </Link>
              </li>
              <li>
                <Link href="/output/seo-pages/huisdiergedrag/angst-huisdieren" className="text-cpAqua hover:text-cpPink transition-colors font-medium">
                  → Angst bij huisdieren: herkennen en behandelen
                </Link>
              </li>
              <li>
                <Link href="/output/seo-pages/huisdiergedrag/katten-krabben-meubels" className="text-cpAqua hover:text-cpPink transition-colors font-medium">
                  → Katten krabben aan meubels stoppen: effectieve tips
                </Link>
              </li>
            </ul>
          </div>

          {/* FAQ Section */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Veelgestelde vragen over meerdere huisdieren
          </h2>

          <div className="space-y-4 mb-12">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Hoelang duurt het voordat mijn huisdieren vrienden worden?
                <span className="text-cpYellow group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                Dit varieert enorm - van enkele weken tot maanden, soms langer. Sommige huisdieren worden beste vrienden binnen een maand, anderen tolereren elkaar na 6 maanden, en sommigen blijven op respectvolle afstand. Belangrijker dan "vrienden zijn" is vreedzaam samenleven. Doel is niet dat ze met elkaar spelen, maar dat ze gestrest-vrij in hetzelfde huis kunnen leven. Verwacht geen wonderen en respecteer hun individuele tempo.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Mijn nieuwe huisdier is aangekomen - mag ik de introductie versnellen?
                <span className="text-cpYellow group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                NEE. Introductie versnellen is de nummer 1 fout bij multi-pet huishoudens. Een mislukte eerste indruk kan maanden of zelfs jaren negatieve gevolgen hebben. Wat je nu wint aan tijd, verlies je later dubbel aan herstelwerk. Neem de volledige tijd voor elke stap. Bij katten kan het complete proces 2-3 maanden duren - dit is normaal. Geduld nu voorkomt levenslang conflict later.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Ze vechten af en toe - moet ik ze scheiden?
                <span className="text-cpYellow group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                Hangt af van de ernst. Kleine standjes (grommen, korte uitval, geen verwondingen) zijn normaal en onderdeel van grenzen stellen. Echte gevechten (verwondingen, paniek, escalatie, één partij angstig) vereisen ingrijpen. Bij ernstige gevechten: onmiddellijk scheiden, dierenarts voor verwondingen, gedragstherapeut raadplegen. Soms is permanente scheiding nodig bij incompatibele huisdieren. Professionele beoordeling is essentieel bij aanhoudend conflict.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kan ik een puppy/kitten bij een senior huisdier introduceren?
                <span className="text-cpYellow group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                Ja, maar met extra voorzichtigheid. Jonge dieren hebben veel energie en kunnen oudere, mogelijk pijnlijke huisdieren stressen of irriteren. Zorg voor: voldoende rusttijd en veilige ruimtes voor senior, beperk speeltijd tussen beiden, monitor voor tekenen van stress bij oudere dier, zorg dat puppy/kitten genoeg uitdaging krijgt zodat senior niet overlast heeft. De senior bepaalt het tempo - forceer geen interactie. Bij artritis of andere gezondheidsproblemen, overleg eerst met dierenarts.
              </div>
            </details>
          </div>
        </div>
      </article>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-br from-cpYellow via-cpYellow/90 to-cpPink py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
            <span className="inline-block px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
              🏡 Harmonieus multi-pet huis
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Succesvol meerdere huisdieren introduceren
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Een gedragstherapeut kan je begeleiden bij de introductie en helpen problemen vroegtijdig te voorkomen. Professionele hulp maakt het verschil tussen harmonie en conflict.
            </p>
            <Button
              size="lg"
              className="bg-white text-cpYellow hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 px-8 py-6 text-lg font-semibold rounded-2xl"
              asChild
            >
              <Link href="/nl/netherlands">
                Ontdek alle huisdierservices →
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Meerdere huisdieren in één huis: tips voor harmonie",
            "description": "Leer hoe je meerdere honden, katten of hond en kat succesvol introduceert. Praktische stap-voor-stap gids voor een harmonieus multi-pet huishouden.",
            "image": "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200",
            "author": {
              "@type": "Organization",
              "name": "CutiePawsPedia"
            },
            "publisher": {
              "@type": "Organization",
              "name": "CutiePawsPedia",
              "logo": {
                "@type": "ImageObject",
                "url": "https://cutiepawspedia.com/logo.png"
              }
            },
            "datePublished": "2025-01-15",
            "dateModified": "2025-01-15",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://cutiepawspedia.com/nl/huisdiergedrag/meerdere-huisdieren"
            }
          })
        }}
      />
    </div>
  );
}
