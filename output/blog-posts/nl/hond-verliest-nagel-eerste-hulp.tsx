/**
 * Blog Post: Hond verliest nagel - eerste hulp en nazorg
 * Category: dierengezondheid
 * Keywords: hond nagel eraf, hond nagel bloedt, nagelblessure hond
 */

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import { PhotoCredit } from "@/components/blog";
import { BetweenContentAd } from "@/components/ads";
import { BlogSidebarAd } from "@/components/ads";

export const metadata: Metadata = {
  title: "Hond Verliest Nagel: Eerste Hulp en Nazorg | CutiePawsPedia",
  description: "Wat te doen als je hond een nagel verliest? Complete gids voor eerste hulp, bloedingen stoppen en nazorg bij nagelblessures. Praktisch advies voor hondeneigenaren.",
  openGraph: {
    title: "Hond Verliest Nagel: Eerste Hulp en Nazorg",
    description: "Complete gids voor eerste hulp bij nagelblessures. Leer bloedingen stoppen en wanneer je naar de dierenarts moet.",
    type: "article",
    images: ["https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=630&fit=crop"],
  },
};

export default function BlogPost() {
  const publishDate = new Date("2025-01-08");
  const readingTime = 8;

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
          Hond Verliest Nagel: Eerste Hulp en Nazorg
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
            src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=800&fit=crop"
            alt="Hondenpoot met verzorgde nagels"
            fill
            className="object-cover"
            priority
          />
          <PhotoCredit
            photographerName="Karsten Winegeart"
            photographerUrl="https://unsplash.com/@karsten116"
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
                Een verloren nagel bij je hond kan een schrikmoment zijn. Bloedverlies, pijn en paniek - maar met de juiste eerste hulp kun je je hond snel helpen. Deze gids legt uit wat je moet doen als je hond een nagel verliest.
              </p>

              {/* Main Content */}
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <h2 id="heading-waarom-verliezen-honden-nagels" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Waarom Verliezen Honden Nagels?
                </h2>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Een nagel kan om verschillende redenen losraken of afbreken. Veelvoorkomende oorzaken zijn:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Te lange nagels die blijven haken achter tapijt, gaas of struikgewas</li>
                  <li>Trauma door rennen op hard oppervlak zoals beton of asfalt</li>
                  <li>Ongelukken waarbij de nagel blijft haken aan een deurkier of traliewerk</li>
                  <li>Zwakte door nagelbed infecties of schimmelinfecties</li>
                  <li>Weinig beweging waardoor nagels niet natuurlijk worden afgesleten</li>
                  <li>Honden met zwarte nagels waarbij de 'quick' moeilijk te zien is tijdens het knippen</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Het risico is groter bij actieve honden die veel buiten spelen, en bij rassen met snelgroeiende nagels zoals de Afghaanse Windhond of Basenji.
                </p>

                <BetweenContentAd testMode={true} />

                <h2 id="heading-herkennen-nagelblessure" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Herkennen van een Nagelblessure
                </h2>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Je hond zal niet altijd direct laten merken dat er iets mis is. Let op deze signalen:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Kreupel lopen of de poot optrekken tijdens het lopen</li>
                  <li>Voortdurend likken of bijten aan de poot</li>
                  <li>Bloedsporen op de vloer, mand of speelgoed</li>
                  <li>Zwelling of roodheid rond de nagel</li>
                  <li>Piepen of janken bij aanraking van de poot</li>
                  <li>Vermijden om gewicht op de aangedane poot te zetten</li>
                  <li>Zichtbaar gebroken of loshangende nagel</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Bij sommige honden breekt de nagel volledig af, terwijl bij andere de nagel slechts gedeeltelijk losraakt of scheurt. In beide gevallen is snelle actie belangrijk om infecties en verdere schade te voorkomen.
                </p>

                <h2 id="heading-eerste-hulp-stappen" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Eerste Hulp: Stap voor Stap
                </h2>

                <h3 id="heading-stap-1-blijf-kalm" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Stap 1: Blijf Kalm en Stel Je Hond Gerust
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Je hond voelt jouw nervositeit aan, dus blijf rustig en spreek op geruststellende toon. Bij angstige of pijnlijke honden kan een muilkorf nodig zijn om jezelf te beschermen tegen bijten - zelfs de liefste hond kan bijten wanneer hij pijn heeft.
                </p>

                <h3 id="heading-stap-2-stop-bloeding" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Stap 2: Stop de Bloeding
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Nagelbloedingen kunnen er dramatisch uitzien maar zijn meestal goed te stoppen:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Druk een schoon gaasje of tissue stevig op de nagel gedurende 3-5 minuten</li>
                  <li>Gebruik bloedstelpende poeder (zoals Kwik Stop) of maïzena als alternatief</li>
                  <li>Druk het poeder rechtstreeks op de bloedende nagel en houd druk</li>
                  <li>Bij aanhoudende bloeding: druk opnieuw aan gedurende 5 minuten</li>
                  <li>Vermijd dat je hond aan de poot likt - dit vertraagt de stolling</li>
                </ul>

                <BetweenContentAd testMode={true} />

                <h3 id="heading-stap-3-reinig-wond" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Stap 3: Reinig de Wond
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Zodra de bloeding gestopt is, is reiniging cruciaal om infecties te voorkomen:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Spoel de poot voorzichtig met lauw water om vuil en bloed te verwijderen</li>
                  <li>Gebruik verdunde jodium of chloorhexidine oplossing (verkrijgbaar bij dierenwinkel)</li>
                  <li>Gebruik GEEN alcohol of waterstofperoxide - dit beschadigt het weefsel</li>
                  <li>Dep de poot droog met een schone handdoek</li>
                  <li>Controleer of er geen splinters, grind of andere vreemde voorwerpen in de wond zitten</li>
                </ul>

                <h3 id="heading-stap-4-bescherm-poot" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Stap 4: Bescherm de Poot
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Een beschermende omhulling voorkomt verdere schade en infecties:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Wikkel gaas losjes om de teen met de beschadigde nagel</li>
                  <li>Gebruik hechtpleister of een zelfklevende zwachtel om het gaas vast te zetten</li>
                  <li>Zorg dat het verband niet te strak zit - je moet nog een vinger tussen verband en poot kunnen schuiven</li>
                  <li>Bescherm het verband tegen vocht met een plastic zak tijdens toiletbezoek buiten</li>
                  <li>Controleer het verband dagelijks op vocht, vuil of doorbloeding</li>
                </ul>

                <h2 id="heading-wanneer-naar-dierenarts" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Wanneer Moet Je Naar de Dierenarts?
                </h2>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  In sommige gevallen is professionele hulp noodzakelijk. Ga naar de dierenarts bij:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Bloeding die niet stopt na 15-20 minuten druk uitoefenen</li>
                  <li>De nagel hangt los maar is niet volledig afgebroken - deze moet mogelijk chirurgisch verwijderd worden</li>
                  <li>Zichtbare infectie: zwelling, pus, onaangename geur of verhoogde warmte</li>
                  <li>Je hond weigert de poot te gebruiken of laat extremen pijn zien</li>
                  <li>Meerdere nagels zijn beschadigd of afgebroken</li>
                  <li>Het nagelbed is blootgesteld en ziet er rauw of bloederig uit</li>
                  <li>Je hond heeft diabetes of een andere aandoening die genezing vertraagt</li>
                  <li>Symptomen verslechteren na 24-48 uur thuiszorg</li>
                </ul>

                <BetweenContentAd testMode={true} />

                <h2 id="heading-nazorg-herstel" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Nazorg en Herstel
                </h2>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  De genezing van een verloren nagel duurt gemiddeld 2-3 weken. In deze periode is goede nazorg essentieel:
                </p>

                <h3 id="heading-verbandwisseling" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Verbandwisseling
                </h3>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Verschoon het verband dagelijks of wanneer het vochtig of vuil wordt</li>
                  <li>Reinig de wond bij elke verbandwisseling met antiseptische oplossing</li>
                  <li>Let op tekenen van infectie: toegenomen zwelling, rode strepen, warmte of vocht</li>
                  <li>Gebruik een beschermende sok of bootie bij wandelingen buitenshuis</li>
                </ul>

                <h3 id="heading-pijnbestrijding" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Pijnbestrijding
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Je dierenarts kan pijnstillers voorschrijven zoals Metacam of Rimadyl. Geef NOOIT menselijke pijnstillers zoals paracetamol of ibuprofen - deze zijn giftig voor honden.
                </p>

                <h3 id="heading-activiteitsbeperking" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Activiteitsbeperking
                </h3>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Beperk hardlopen, springen en intensief spelen voor minimaal 1 week</li>
                  <li>Houd wandelingen kort en op zachte ondergrond zoals gras</li>
                  <li>Vermijd zwemmen totdat de wond volledig genezen is</li>
                  <li>Gebruik een beschermhoes bij honden die blijven likken</li>
                </ul>

                <h2 id="heading-preventie" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Preventie: Nagelblessures Voorkomen
                </h2>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  De beste behandeling is preventie. Volg deze tips om nagelblessures te voorkomen:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Knip nagels regelmatig (elke 3-4 weken) of laat dit doen door een professional</li>
                  <li>Leer de 'quick' herkennen - het levende deel van de nagel met bloedvaten en zenuwen</li>
                  <li>Bij zwarte nagels: knip voorzichtig kleine beetjes tegelijk en stop bij witte of roze verkleuring</li>
                  <li>Wandel regelmatig op beton of asfalt voor natuurlijke afslijting</li>
                  <li>Inspecteer poten en nagels wekelijks op scheuren, afbladdering of zwakke plekken</li>
                  <li>Houd de haren tussen de teenballetjes kort om haken te voorkomen</li>
                  <li>Gebruik beschermende booties bij intensieve activiteiten op ruw terrein</li>
                  <li>Zorg voor een uitgebalanceerd dieet met voldoende biotine voor sterke nagels</li>
                </ul>

                <h2 id="heading-wanneer-groeit-nagel-terug" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Wanneer Groeit de Nagel Terug?
                </h2>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Een volledig nieuwe nagel groeit meestal binnen 3-4 maanden aan. De nieuwe nagel kan aanvankelijk anders van kleur of vorm zijn, maar normaliseert zich meestal na verloop van tijd.
                </p>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  In zeldzame gevallen groeit de nagel scheef of helemaal niet terug, vooral wanneer het nagelbed ernstig beschadigd is. Dit is meestal geen probleem - veel honden leven comfortabel zonder één nagel. Bespreek eventuele zorgen met je dierenarts.
                </p>

                <h2 id="heading-eerste-hulp-kit" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  EHBO Kit voor Hondenpoten
                </h2>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Houd deze items bij de hand voor snelle eerste hulp bij nagelblessures:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Bloedstelpende poeder of maïzena</li>
                  <li>Steriel gaas en niet-klevende kompressen</li>
                  <li>Zelfklevende zwachtels (cohesief verband)</li>
                  <li>Antiseptische oplossing (chloorhexidine of verdunde jodium)</li>
                  <li>Wegwerphandschoenen</li>
                  <li>Pincet voor het verwijderen van splinters</li>
                  <li>Kleine schaar voor het knippen van verband</li>
                  <li>Beschermende pootsokken of booties</li>
                  <li>Telefoonnummer van je dierenarts en nooddierenarts</li>
                </ul>
              </div>

              {/* FAQ Section */}
              <div className="mt-12 pt-8 border-t border-border dark:border-cpAmber/10">
                <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">
                  Veelgestelde Vragen
                </h2>

                <div className="space-y-4">
                  <details className="group bg-secondary/50 dark:bg-cpSurface/50 rounded-lg p-4">
                    <summary className="font-medium text-foreground dark:text-cpCream cursor-pointer list-none flex items-center justify-between">
                      Is het normaal dat mijn hond kreupel loopt na een verloren nagel?
                      <span className="ml-4 text-cpCoral group-open:rotate-90 transition-transform">›</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground dark:text-cpCream/80 text-sm">
                      Ja, kreupel lopen is normaal gedurende de eerste 24-48 uur. De nagel bevat zenuwen en bloedvaten die pijnlijk zijn wanneer ze blootgesteld worden. Als het kreupelen langer aanhoudt of erger wordt, raadpleeg dan je dierenarts.
                    </p>
                  </details>

                  <details className="group bg-secondary/50 dark:bg-cpSurface/50 rounded-lg p-4">
                    <summary className="font-medium text-foreground dark:text-cpCream cursor-pointer list-none flex items-center justify-between">
                      Kan ik mijn hond laten wandelen met een beschadigde nagel?
                      <span className="ml-4 text-cpCoral group-open:rotate-90 transition-transform">›</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground dark:text-cpCream/80 text-sm">
                      Korte wandelingen op zachte ondergrond zoals gras zijn prima, maar vermijd harde ondergronden zoals asfalt of beton. Bescherm de poot met een bootie of sok om infecties te voorkomen. Beperk intensieve activiteiten tot de nagel volledig genezen is.
                    </p>
                  </details>

                  <details className="group bg-secondary/50 dark:bg-cpSurface/50 rounded-lg p-4">
                    <summary className="font-medium text-foreground dark:text-cpCream cursor-pointer list-none flex items-center justify-between">
                      Hoelang duurt het voordat de bloeding stopt?
                      <span className="ml-4 text-cpCoral group-open:rotate-90 transition-transform">›</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground dark:text-cpCream/80 text-sm">
                      Met bloedstelpende poeder of maïzena en constante druk stopt de bloeding meestal binnen 5-10 minuten. Zonder bloedstelpende middelen kan het 15-20 minuten duren. Als de bloeding na 20 minuten niet stopt, neem dan contact op met je dierenarts.
                    </p>
                  </details>

                  <details className="group bg-secondary/50 dark:bg-cpSurface/50 rounded-lg p-4">
                    <summary className="font-medium text-foreground dark:text-cpCream cursor-pointer list-none flex items-center justify-between">
                      Moet ik antibiotica geven na een nagelblessure?
                      <span className="ml-4 text-cpCoral group-open:rotate-90 transition-transform">›</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground dark:text-cpCream/80 text-sm">
                      Niet alle nagelblessures vereisen antibiotica. Bij een schone breuk en goede thuiszorg is het risico op infectie laag. Je dierenarts kan antibiotica voorschrijven als de wond vuil was, het nagelbed beschadigd is, of als er tekenen van infectie zijn.
                    </p>
                  </details>

                  <details className="group bg-secondary/50 dark:bg-cpSurface/50 rounded-lg p-4">
                    <summary className="font-medium text-foreground dark:text-cpCream cursor-pointer list-none flex items-center justify-between">
                      Wat als mijn hond blijft likken aan de poot?
                      <span className="ml-4 text-cpCoral group-open:rotate-90 transition-transform">›</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground dark:text-cpCream/80 text-sm">
                      Excessief likken vertraagt genezing en kan infecties veroorzaken. Gebruik een beschermkraag (Elizabethkraag), opblaasbare halsband, of bittere spray om likken te voorkomen. Sommige honden accepteren een beschermende sok beter dan een kraag.
                    </p>
                  </details>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Tag className="w-4 h-4 text-muted-foreground dark:text-cpCream/60" />
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                hond nagel eraf
              </span>
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                nagelblessure hond
              </span>
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                eerste hulp hond
              </span>
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                hond nagel bloedt
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
              href="/nl/gids/dierengezondheid/eerste-hulp-hond"
              className="group bg-card dark:bg-cpSurface/50 rounded-2xl overflow-hidden border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-md transition-all p-6"
            >
              <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors mb-2">
                Complete Eerste Hulp Gids voor Honden
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Wat te doen bij veelvoorkomende noodsituaties met je hond
              </p>
              <span className="text-cpCoral text-sm font-medium">Lees meer →</span>
            </Link>

            <Link
              href="/nl/gids/hondenverzorging/nagels-knippen"
              className="group bg-card dark:bg-cpSurface/50 rounded-2xl overflow-hidden border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-md transition-all p-6"
            >
              <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors mb-2">
                Hondennagels Knippen: Stap voor Stap
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Leer je hond veilig en stressvrij de nagels te knippen
              </p>
              <span className="text-cpCoral text-sm font-medium">Lees meer →</span>
            </Link>

            <Link
              href="/nl/gids/dierengezondheid/pootproblemen-hond"
              className="group bg-card dark:bg-cpSurface/50 rounded-2xl overflow-hidden border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-md transition-all p-6"
            >
              <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors mb-2">
                Veelvoorkomende Pootproblemen bij Honden
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Herkennen en behandelen van pootklachten
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
            headline: "Hond Verliest Nagel: Eerste Hulp en Nazorg",
            description: "Complete gids voor eerste hulp bij nagelblessures bij honden. Leer bloedingen stoppen en wanneer je naar de dierenarts moet.",
            image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=630&fit=crop",
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
