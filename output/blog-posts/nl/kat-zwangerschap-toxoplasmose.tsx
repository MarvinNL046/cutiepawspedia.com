/**
 * Blog Post: Kat en zwangerschap - toxoplasmose voorkomen
 * Category: dierengezondheid
 * Keywords: kat zwanger, toxoplasmose, zwanger met kat
 */

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import { PhotoCredit } from "@/components/blog";
import { BetweenContentAd } from "@/components/ads";
import { BlogSidebarAd } from "@/components/ads";

export const metadata: Metadata = {
  title: "Kat en Zwangerschap: Toxoplasmose Veilig Voorkomen | CutiePawsPedia",
  description: "Zwanger en een kat in huis? Leer hoe je toxoplasmose voorkomt en veilig met je kat omgaat tijdens de zwangerschap. Praktische tips voor aanstaande moeders.",
  openGraph: {
    title: "Kat en Zwangerschap: Toxoplasmose Voorkomen",
    description: "Complete gids voor veilig samenleven met je kat tijdens zwangerschap. Voorkom toxoplasmose zonder je kat weg te doen.",
    type: "article",
    images: ["https://images.unsplash.com/photo-1573865526739-10c1d3a1f0e3?w=1200&h=630&fit=crop"],
  },
};

export default function BlogPost() {
  const publishDate = new Date("2025-01-08");
  const readingTime = 10;

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
          Dierengezondheid
        </span>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-6 leading-tight max-w-4xl">
          Kat en Zwangerschap: Toxoplasmose Voorkomen
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-muted-foreground dark:text-cpCream/60 mb-4">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {publishDate.toLocaleDateString("nl-NL", { year: "numeric", month: "long", day: "numeric" })}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {readingTime} min leestijd
          </span>
        </div>
      </header>

      {/* Featured Image */}
      <div className="container mx-auto max-w-6xl px-4 mb-8">
        <div className="relative aspect-video rounded-3xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1573865526739-10c1d3a1f0e3?w=1200&h=800&fit=crop"
            alt="Zwangere vrouw met kat"
            fill
            className="object-cover"
            priority
          />
          <PhotoCredit
            photographerName="Alicia Petresc"
            photographerUrl="https://unsplash.com/@alicia_petresc"
            source="unsplash"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Article Content */}
          <article className="flex-1 min-w-0">
            <div className="bg-card dark:bg-cpSurface/30 rounded-3xl p-6 md:p-10 border border-border dark:border-cpAmber/10">
              {/* Excerpt */}
              <p className="text-lg text-foreground dark:text-cpCream font-medium mb-6 pb-6 border-b border-border dark:border-cpAmber/10">
                Zwanger en een kat in huis? Toxoplasmose is een veelgehoorde zorg, maar je hoeft je kat niet weg te doen. Met de juiste voorzorgsmaatregelen kun je veilig samenleven. Deze gids vertelt je alles over toxoplasmose en hoe je risico's minimaliseert.
              </p>

              {/* Main Content */}
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <h2 id="heading-wat-is-toxoplasmose" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Wat is Toxoplasmose?
                </h2>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Toxoplasmose is een infectie veroorzaakt door de parasiet Toxoplasma gondii. Deze parasiet komt wereldwijd voor en kan verschillende diersoorten en mensen infecteren. Katten spelen een bijzondere rol omdat zij de enige dieren zijn waarin de parasiet zich kan voortplanten.
                </p>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Voor de meeste gezonde mensen is toxoplasmose onschuldig en vaak zelfs onopgemerkt. Maar tijdens zwangerschap kan een eerste infectie ernstige gevolgen hebben voor de ongeboren baby, waaronder oogproblemen, hersenafwijkingen en in zeldzame gevallen een miskraam.
                </p>

                <h3 id="heading-hoe-werkt-besmetting" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Hoe Werkt Besmetting?
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  De parasiet verspreidt zich via oocysten (een soort 'eitjes') die katten uitscheiden in hun ontlasting. Deze oocysten worden pas besmettelijk na 1-5 dagen buiten het lichaam. Besmetting gebeurt vooral door:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Het eten van rauw of onvoldoende verhit vlees (grootste risico!)</li>
                  <li>Contact met besmette kattenbak uitwerpselen (minimaal risico bij goede hygiëne)</li>
                  <li>Ongewassen groenten en fruit met gronddeeltjes</li>
                  <li>Tuinieren in grond besmet met kattenfeces</li>
                  <li>Besmette grond aan handen na spelen van kinderen</li>
                </ul>

                <div className="bg-cpAmber/10 dark:bg-cpAmber/20 border-l-4 border-cpAmber rounded-lg p-4 my-6">
                  <p className="text-foreground dark:text-cpCream font-medium mb-2">
                    ⚠️ Belangrijk om te Weten
                  </p>
                  <p className="text-muted-foreground dark:text-cpCream/80 text-sm">
                    Onderzoek toont aan dat toxoplasmose vaker wordt overgedragen via rauw vlees en besmet voedsel dan via katten. Het risico van je eigen binnenkat is zeer klein, vooral als je voorzorgsmaatregelen neemt.
                  </p>
                </div>

                <BetweenContentAd testMode={true} />

                <h2 id="heading-ben-je-al-immuun" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Ben Je Al Immuun?
                </h2>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Ongeveer 30-50% van de Nederlandse bevolking is al immuun voor toxoplasmose door een eerdere (vaak onopgemerkte) infectie. Als je eerder bent besmet, ben je beschermd en loopt je baby geen risico.
                </p>

                <h3 id="heading-toxoplasmose-test" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Toxoplasmose Test
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Vraag je verloskundige of huisarts om een bloedtest (IgG en IgM antistoffen test). Deze test bepaalt of je:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li><strong>IgG positief, IgM negatief:</strong> Je bent immuun - geen zorgen!</li>
                  <li><strong>IgG negatief, IgM negatief:</strong> Je bent niet immuun - neem voorzorgsmaatregelen</li>
                  <li><strong>IgG positief, IgM positief:</strong> Mogelijk recente infectie - aanvullend onderzoek nodig</li>
                  <li><strong>IgG negatief, IgM positief:</strong> Verse infectie - direct contact met specialist</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Deze test wordt niet standaard gedaan bij zwangerschapscontroles in Nederland, maar is op aanvraag beschikbaar. In België en Frankrijk is de test wel standaard.
                </p>

                <h2 id="heading-voorzorgsmaatregelen" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Voorzorgsmaatregelen tijdens Zwangerschap
                </h2>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Met deze maatregelen minimaliseer je het risico op toxoplasmose aanzienlijk:
                </p>

                <h3 id="heading-kattenbak-hygiëne" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Kattenbak Hygiëne
                </h3>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li><strong>Laat iemand anders de bak verschonen:</strong> Vraag je partner, huisgenoot of familielid om deze taak over te nemen</li>
                  <li><strong>Verschoon dagelijks:</strong> Oocysten worden pas na 1-5 dagen besmettelijk, dus dagelijkse verschoning voorkomt besmetting</li>
                  <li><strong>Draag handschoenen:</strong> Als je het toch zelf moet doen, draag altijd wegwerphandschoenen</li>
                  <li><strong>Was handen grondig:</strong> Altijd na elk contact met de kattenbak, ook met handschoenen</li>
                  <li><strong>Gebruik schepbaar kattenbakvulling:</strong> Dit maakt dagelijks verschonen makkelijker</li>
                  <li><strong>Overweeg een zelfreinigende kattenbak:</strong> Deze verwijdert afval automatisch</li>
                </ul>

                <BetweenContentAd testMode={true} />

                <h3 id="heading-voeding-kat" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Voeding van Je Kat
                </h3>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Voer alleen commercieel kattenvoer (blik of brokken) - geen rauw vlees</li>
                  <li>Voorkom dat je kat jaagt op muizen of vogels (houd binnenshuis)</li>
                  <li>Rauw voer zoals BARF-diëten verhogen het risico - vermijd tijdens zwangerschap</li>
                  <li>Diepgevroren rauw vlees (&lt; -12°C gedurende 24 uur) doodt de parasiet grotendeels</li>
                </ul>

                <h3 id="heading-algemene-hygiëne" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Algemene Hygiëne
                </h3>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Was handen altijd na het aaien van je kat, vooral voor het eten</li>
                  <li>Houd je kat van aanrechtbladen en eettafels</li>
                  <li>Laat je kat niet uit je bord eten of je gezicht likken</li>
                  <li>Poets wonden van kattenkrabben of beten meteen met zeep en water</li>
                  <li>Vermijd het knuffelen van vreemde katten of zwerfkatten</li>
                </ul>

                <h3 id="heading-tuin-en-voeding" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Tuin en Voeding
                </h3>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li><strong>Draag tuinhandschoenen:</strong> Altijd bij tuinieren waar katten kunnen zijn geweest</li>
                  <li><strong>Was groenten en fruit grondig:</strong> Schil of kook indien mogelijk</li>
                  <li><strong>Eet geen rauw vlees:</strong> Tartaar, carpaccio, ossenhaas saignant zijn taboe</li>
                  <li><strong>Verhit vlees goed:</strong> Kerntemperatuur minimaal 65-70°C gedurende enkele minuten</li>
                  <li><strong>Vermijd rauwe rookvleeswaren:</strong> Zoals Italiaans salami en Parmaham</li>
                  <li><strong>Diepvries vlees:</strong> -12°C voor 24 uur of -20°C voor 48 uur doodt parasieten</li>
                  <li><strong>Was snijplanken en messen:</strong> Na contact met rauw vlees</li>
                </ul>

                <BetweenContentAd testMode={true} />

                <h2 id="heading-symptomen-en-diagnose" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Symptomen en Diagnose
                </h2>

                <h3 id="heading-symptomen-moeder" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Symptomen bij de Moeder
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Toxoplasmose geeft vaak geen of milde griepachtige symptomen:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Vermoeidheid en algemeen ziek gevoel</li>
                  <li>Lichte koorts</li>
                  <li>Gezwollen lymfeklieren (vooral in de nek)</li>
                  <li>Spierpijn en hoofdpijn</li>
                  <li>Keelpijn</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Omdat deze symptomen lijken op verkoudheid of griep, blijft toxoplasmose vaak onopgemerkt. Bij twijfel tijdens zwangerschap: laat altijd bloedonderzoek doen.
                </p>

                <h3 id="heading-gevolgen-baby" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Gevolgen voor de Baby
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Het risico en de ernst hangen af van het moment van infectie:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li><strong>Eerste trimester:</strong> Laag overdrachtsrisico (10-15%), maar als het gebeurt is de impact ernstiger</li>
                  <li><strong>Tweede trimester:</strong> Gemiddeld overdrachtsrisico (25-30%), matige ernst</li>
                  <li><strong>Derde trimester:</strong> Hoog overdrachtsrisico (60-80%), maar meestal milde of geen symptomen</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Mogelijke gevolgen voor de baby:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Oogproblemen (retinochoroïditis) - kan tot blindheid leiden</li>
                  <li>Neurologische problemen (vertraagde ontwikkeling, epilepsie)</li>
                  <li>Gehoorbeschadiging</li>
                  <li>Hersenafwijkingen (hydrocephalus, calcificaties)</li>
                  <li>Vergrote lever en milt</li>
                  <li>In zeer zeldzame gevallen: miskraam of doodgeboorte</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Gelukkig kunnen veel problemen worden voorkomen of beperkt met vroege diagnose en behandeling.
                </p>

                <h2 id="heading-behandeling" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Behandeling tijdens Zwangerschap
                </h2>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Bij diagnose van een acute toxoplasmose-infectie tijdens zwangerschap:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li><strong>Spiramycine:</strong> Antibioticum dat veilig is tijdens zwangerschap, vermindert overdracht naar baby met 60%</li>
                  <li><strong>Pyrimethamine + sulfadiazine:</strong> Bij bevestigde infectie van de baby (na 18 weken)</li>
                  <li><strong>Foliumzuur supplement:</strong> Ter ondersteuning van de behandeling</li>
                  <li><strong>Regelmatige echo's en bloedtests:</strong> Om de ontwikkeling van de baby te monitoren</li>
                  <li><strong>Vruchtwaterpunctie (amniocentese):</strong> Om te controleren of de baby besmet is (vanaf week 18)</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Snelle behandeling vermindert het risico op overdracht en ernstige gevolgen aanzienlijk. Dit is waarom vroege detectie zo belangrijk is.
                </p>

                <h2 id="heading-moet-kat-weg" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Moet Mijn Kat Weg?
                </h2>

                <div className="bg-cpCoral/10 dark:bg-cpCoral/20 border-l-4 border-cpCoral rounded-lg p-6 my-6">
                  <p className="text-foreground dark:text-cpCream font-bold text-lg mb-3">
                    Nee, je hoeft je kat niet weg te doen!
                  </p>
                  <p className="text-muted-foreground dark:text-cpCream/80">
                    Met de juiste voorzorgsmaatregelen is het risico minimaal. Veel vrouwen hebben zonder problemen zwangerschappen doorgemaakt met katten in huis. Het wegnemen van stress door afstand van je huisdier weegt vaak niet op tegen het kleine restrisico.
                  </p>
                </div>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Belangrijke overwegingen:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Binnenkatten die alleen commercieel voer krijgen hebben een laag risico</li>
                  <li>Als je al jaren een kat hebt, ben je waarschijnlijk al immuun</li>
                  <li>Het risico via rauw vlees is groter dan via je kat</li>
                  <li>De emotionele binding met je kat is waardevol voor je welzijn tijdens zwangerschap</li>
                  <li>Na de bevalling kan je baby gewend raken aan de kat (goed voor het immuunsysteem)</li>
                </ul>

                <h2 id="heading-kat-na-geboorte" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Kat en Baby na de Geboorte
                </h2>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Na de geboorte is toxoplasmose geen zorg meer voor je baby (tenzij je zelf tijdens de zwangerschap bent besmet). Wel moet je zorgen voor een veilige kennismaking:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Laat de kat rustig wennen aan de nieuwe situatie en geuren</li>
                  <li>Laat de kat nooit onbeheerd bij de baby</li>
                  <li>Plaats een kattengaas over de wieg of ledikant</li>
                  <li>Houd de kattenbak uit de buurt van de babykamer</li>
                  <li>Was handen na aaien van de kat en voor aanraken van de baby</li>
                  <li>Geef de kat positieve aandacht zodat jaloezie wordt voorkomen</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Kinderen die opgroeien met huisdieren hebben bewezen een sterker immuunsysteem en minder kans op allergieën.
                </p>
              </div>

              {/* FAQ Section */}
              <div className="mt-12 pt-8 border-t border-border dark:border-cpAmber/10">
                <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">
                  Veelgestelde Vragen
                </h2>

                <div className="space-y-4">
                  <details className="group bg-secondary/50 dark:bg-cpSurface/50 rounded-lg p-4">
                    <summary className="font-medium text-foreground dark:text-cpCream cursor-pointer list-none flex items-center justify-between">
                      Kan ik toxoplasmose krijgen door mijn kat te aaien?
                      <span className="ml-4 text-cpCoral group-open:rotate-90 transition-transform">›</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground dark:text-cpCream/80 text-sm">
                      Nee, door aaien alleen kun je geen toxoplasmose krijgen. De parasiet zit alleen in kattenfeces. Wel is het verstandig om na aaien je handen te wassen voordat je eet, vooral als je kat buiten is geweest en mogelijk pootjes heeft bevuild.
                    </p>
                  </details>

                  <details className="group bg-secondary/50 dark:bg-cpSurface/50 rounded-lg p-4">
                    <summary className="font-medium text-foreground dark:text-cpCream cursor-pointer list-none flex items-center justify-between">
                      Moet ik mijn kat laten testen op toxoplasmose?
                      <span className="ml-4 text-cpCoral group-open:rotate-90 transition-transform">›</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground dark:text-cpCream/80 text-sm">
                      Dit wordt meestal niet aanbevolen. Een positieve test betekent alleen dat je kat ooit besmet is geweest, niet dat hij nu besmettelijk is. Katten scheiden de parasiet meestal maar 1-3 weken uit in hun leven. Focus liever op goede hygiëne.
                    </p>
                  </details>

                  <details className="group bg-secondary/50 dark:bg-cpSurface/50 rounded-lg p-4">
                    <summary className="font-medium text-foreground dark:text-cpCream cursor-pointer list-none flex items-center justify-between">
                      Is een nieuwe kitten riskanter dan een oude kat?
                      <span className="ml-4 text-cpCoral group-open:rotate-90 transition-transform">›</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground dark:text-cpCream/80 text-sm">
                      Jonge kittens die voor het eerst in contact komen met de parasiet kunnen de oocysten wel uitscheiden. Een kat die je al jarenlang hebt, is waarschijnlijk al besmet geweest en zal niet opnieuw uitscheiden. Toch adviseren experts om tijdens zwangerschap geen nieuwe kitten te nemen.
                    </p>
                  </details>

                  <details className="group bg-secondary/50 dark:bg-cpSurface/50 rounded-lg p-4">
                    <summary className="font-medium text-foreground dark:text-cpCream cursor-pointer list-none flex items-center justify-between">
                      Wat als ik per ongeluk de kattenbak heb verschoond?
                      <span className="ml-4 text-cpCoral group-open:rotate-90 transition-transform">›</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground dark:text-cpCream/80 text-sm">
                      Eén keer de kattenbak verschonen betekent niet automatisch besmetting, vooral als je handen hebt gewassen. Oocysten hebben 1-5 dagen nodig om besmettelijk te worden, dus dagelijks verschonen is relatief veilig. Bij zorgen kun je je huisarts vragen om een bloedtest.
                    </p>
                  </details>

                  <details className="group bg-secondary/50 dark:bg-cpSurface/50 rounded-lg p-4">
                    <summary className="font-medium text-foreground dark:text-cpCream cursor-pointer list-none flex items-center justify-between">
                      Biedt borstvoeding bescherming tegen toxoplasmose?
                      <span className="ml-4 text-cpCoral group-open:rotate-90 transition-transform">›</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground dark:text-cpCream/80 text-sm">
                      Nee, toxoplasmose wordt niet via moedermelk overgedragen. Als je tijdens zwangerschap bent besmet, is de baby al tijdens de zwangerschap mogelijk besmet geraakt. Borstvoeding is veilig en wordt juist aangemoedigd voor het immuunsysteem van je baby.
                    </p>
                  </details>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Tag className="w-4 h-4 text-muted-foreground dark:text-cpCream/60" />
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                kat zwanger
              </span>
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                toxoplasmose
              </span>
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                zwanger met kat
              </span>
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                toxoplasmose voorkomen
              </span>
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

      {/* Related Articles */}
      <section className="bg-secondary/50 dark:bg-cpSurface/20 py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-8 text-center">
            Gerelateerde Artikelen
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/nl/gids/dierengezondheid/kat-gezondheid"
              className="group bg-card dark:bg-cpSurface/50 rounded-2xl overflow-hidden border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-md transition-all p-6"
            >
              <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors mb-2">
                Complete Kattengezondheid Gids
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Alles over veelvoorkomende ziektes en preventie bij katten
              </p>
              <span className="text-cpCoral text-sm font-medium">Lees meer →</span>
            </Link>

            <Link
              href="/nl/gids/kattenverzorging/hygiëne"
              className="group bg-card dark:bg-cpSurface/50 rounded-2xl overflow-hidden border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-md transition-all p-6"
            >
              <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors mb-2">
                Kattenbak Hygiëne: Complete Gids
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Hoe houd je de kattenbak schoon en gezond voor jou en je kat
              </p>
              <span className="text-cpCoral text-sm font-medium">Lees meer →</span>
            </Link>

            <Link
              href="/nl/gids/huisdiergedrag/kat-en-baby"
              className="group bg-card dark:bg-cpSurface/50 rounded-2xl overflow-hidden border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-md transition-all p-6"
            >
              <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors mb-2">
                Kat Voorbereiden op een Baby
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Stappen voor een soepele kennismaking tussen kat en baby
              </p>
              <span className="text-cpCoral text-sm font-medium">Lees meer →</span>
            </Link>
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
            headline: "Kat en Zwangerschap: Toxoplasmose Voorkomen",
            description: "Complete gids voor veilig samenleven met je kat tijdens zwangerschap. Leer hoe je toxoplasmose voorkomt zonder je kat weg te doen.",
            image: "https://images.unsplash.com/photo-1573865526739-10c1d3a1f0e3?w=1200&h=630&fit=crop",
            datePublished: publishDate.toISOString(),
            dateModified: publishDate.toISOString(),
            author: {
              "@type": "Organization",
              name: "CutiePawsPedia",
            },
            publisher: {
              "@type": "Organization",
              name: "CutiePawsPedia",
              logo: {
                "@type": "ImageObject",
                url: "https://cutiepawspedia.nl/logo.png",
              },
            },
          }),
        }}
      />
    </div>
  );
}
