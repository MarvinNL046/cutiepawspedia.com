import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, AlertTriangle, Phone, Info, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Giftig Voedsel voor Honden en Katten: Complete Lijst 2024",
  description: "Welk voedsel is giftig voor honden en katten? Ontdek de complete lijst met gevaarlijk voedsel, symptomen van vergiftiging en noodmaatregelen.",
  keywords: "giftig voedsel hond, giftig voedsel kat, gevaarlijk voedsel huisdier, chocolade hond, uien kat",
  openGraph: {
    title: "Giftig Voedsel voor Honden en Katten: Complete Lijst",
    description: "Bescherm je huisdier! Ontdek welk voedsel gevaarlijk is voor honden en katten en wat te doen bij vergiftiging.",
  },
};

export default function GiftigVoedselPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-red-50 via-cpCoral/5 to-transparent dark:from-red-900/10 dark:via-transparent dark:to-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800/30 mb-6">
            <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <span className="text-sm font-medium text-red-700 dark:text-red-300">
              Belangrijke Veiligheidsinformatie
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6 tracking-tight">
            Giftig Voedsel voor Honden en Katten: <span className="text-cpCoral">Complete Lijst</span>
          </h1>

          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Wat voor ons veilig en lekker is, kan levensgevaarlijk zijn voor onze huisdieren. Veel voorkomende voedingsmiddelen kunnen ernstige vergiftigingen veroorzaken bij honden en katten. In deze gids vind je een complete lijst van giftig voedsel, symptomen van vergiftiging en wat te doen in noodgevallen.
          </p>

          {/* Emergency Alert */}
          <div className="bg-red-100 dark:bg-red-900/20 rounded-2xl p-6 border-2 border-red-500 dark:border-red-700 mb-6">
            <div className="flex items-start gap-3">
              <Phone className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-red-900 dark:text-red-200 mb-2">
                  Noodgeval? Bel Direct!
                </h3>
                <p className="text-sm text-red-800 dark:text-red-300 mb-3">
                  Bij vermoeden van vergiftiging: bel onmiddellijk je dierenarts of de dierenambulance. Wacht niet af!
                </p>
                <p className="text-sm font-bold text-red-900 dark:text-red-200">
                  Vergiftigingsinformatie Dieren: 0900-1234 (€0,45/min)
                </p>
              </div>
            </div>
          </div>

          {/* Primary CTA */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpAmber/20 shadow-sm">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
              Vind direct een dierenarts bij jou in de buurt voor noodgevallen
            </p>
            <Link
              href="/nl/netherlands"
              className="inline-block bg-cpCoral text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform font-medium shadow-md"
            >
              Vind een dierenarts bij jou in de buurt →
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-16">
        {/* Section 1: Meest Giftige Voedingsmiddelen */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Top 10 Giftige Voedingsmiddelen voor Honden en Katten
          </h2>

          <div className="space-y-4">
            {/* 1. Chocolade */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-red-500">
              <div className="flex items-start gap-3">
                <X className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                    1. Chocolade en Cacao (Beide)
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/80 mb-2">
                    Bevat theobromine, giftig voor honden en katten. Hoe donkerder de chocolade, hoe gevaarlijker. Puur cacao is het meest toxisch.
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                    Symptomen: Braken, diarree, verhoogde hartslag, trillen, stuipen, mogelijk fataal
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Uien en Knoflook */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-red-500">
              <div className="flex items-start gap-3">
                <X className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                    2. Uien, Knoflook, Prei en Bieslook (Beide)
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/80 mb-2">
                    Alle Allium-soorten zijn giftig. Ze breken rode bloedcellen af en veroorzaken bloedarmoede. Katten zijn extra gevoelig.
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                    Symptomen: Zwakte, braken, bleek tandvlees, oranje/rode urine, ademhalingsproblemen
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Druiven en Rozijnen */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-red-500">
              <div className="flex items-start gap-3">
                <X className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                    3. Druiven en Rozijnen (Honden)
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/80 mb-2">
                    Kunnen acute nierfalen veroorzaken bij honden, zelfs in kleine hoeveelheden. De exacte giftige stof is onbekend.
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                    Symptomen: Braken, diarree, verminderde eetlust, buikpijn, verminderde urineproductie
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Xylitol */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-red-500">
              <div className="flex items-start gap-3">
                <X className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                    4. Xylitol (Kunstmatige Zoetstof) (Honden)
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/80 mb-2">
                    Zit in suikervrije kauwgom, snoep, tandpasta en sommige pindakaas. Veroorzaakt snelle insuline-afgifte en leverfalen.
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                    Symptomen: Braken, zwakte, trillen, stuipen, leverfalen (binnen 12-24u)
                  </p>
                </div>
              </div>
            </div>

            {/* 5. Avocado */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-red-500">
              <div className="flex items-start gap-3">
                <X className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                    5. Avocado (Beide)
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/80 mb-2">
                    Bevat persine, giftig voor honden en katten. Vooral de pit, schil en bladeren zijn gevaarlijk.
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                    Symptomen: Braken, diarree, ademhalingsproblemen, vochtophoping rond het hart
                  </p>
                </div>
              </div>
            </div>

            {/* 6. Alcohol */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-red-500">
              <div className="flex items-start gap-3">
                <X className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                    6. Alcohol (Beide)
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/80 mb-2">
                    Alle alcoholische dranken en producten met alcohol (ook rauwe deeg) zijn zeer gevaarlijk.
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                    Symptomen: Braken, desoriëntatie, stuipen, ademhalingsproblemen, coma, mogelijk fataal
                  </p>
                </div>
              </div>
            </div>

            {/* 7. Cafeïne */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-red-500">
              <div className="flex items-start gap-3">
                <X className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                    7. Cafeïne (Koffie, Thee, Energy Drinks) (Beide)
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/80 mb-2">
                    Bevat methylxanthines, vergelijkbaar met theobromine in chocolade. Ook in energiedranken.
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                    Symptomen: Hyperactiviteit, verhoogde hartslag, trillen, stuipen
                  </p>
                </div>
              </div>
            </div>

            {/* 8. Macadamia Noten */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-red-500">
              <div className="flex items-start gap-3">
                <X className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                    8. Macadamia Noten (Honden)
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/80 mb-2">
                    Kunnen ernstige zwakte veroorzaken. De exacte giftige stof is onbekend.
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                    Symptomen: Zwakte in achterpoten, braken, trillen, koorts
                  </p>
                </div>
              </div>
            </div>

            {/* 9. Rauw Vlees en Eieren */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpAmber">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-cpAmber flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                    9. Rauw Vlees, Vis en Eieren (Beide)
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/80 mb-2">
                    Risico op Salmonella en E. coli bacteriën. Rauw eiwit bevat avidine dat biotine-opname blokkeert.
                  </p>
                  <p className="text-sm text-cpAmber font-medium">
                    Symptomen: Braken, diarree, koorts. Bij langdurig gebruik: huidproblemen
                  </p>
                </div>
              </div>
            </div>

            {/* 10. Zuivelproducten */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpAmber">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-cpAmber flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                    10. Zuivelproducten (Melk, Kaas) (Beide)
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/80 mb-2">
                    Meeste volwassen honden en katten zijn lactose-intolerant en kunnen melk niet goed verteren.
                  </p>
                  <p className="text-sm text-cpAmber font-medium">
                    Symptomen: Diarree, braken, buikpijn, winderigheid
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Middle CTA */}
          <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/5 dark:from-cpCoral/5 dark:to-cpAmber/5 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpAmber/20 mt-8">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-2">
              Vragen over Veilig Voedsel?
            </h3>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
              Twijfel je of een bepaald voedingsmiddel veilig is? Vraag altijd advies aan je dierenarts. Voor meer informatie over gezonde voeding, bekijk onze gids over{" "}
              <Link href="/nl/gids/huisdiervoeding/beste-hondenvoer" className="text-cpCoral hover:underline">
                het beste hondenvoer
              </Link>.
            </p>
            <Link
              href="/nl/netherlands"
              className="inline-block bg-cpCoral text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform font-medium shadow-md text-sm"
            >
              Bekijk dierenartsen voor voedingsadvies →
            </Link>
          </div>
        </section>

        {/* Section 2: Extra Gevaarlijke Voedingsmiddelen */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Andere Gevaarlijke Voedingsmiddelen
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-cpCoral mb-3">Giftig voor Honden:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <X className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Suikervrije producten (xylitol)</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Noten (vooral macadamia, walnoot)</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Gezouten snacks (chips, zoutjes)</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Rauw deeg (alcohol productie)</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Appelpitten, kerspitten (cyanide)</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Rauwe aardappelen (solanine)</span>
                </li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-cpCoral mb-3">Giftig voor Katten:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <X className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Tonijn voor mensen (teveel natrium)</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Hondenvoer (tekort taurine)</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Citrusvruchten (maagklachten)</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Kokosolie in grote hoeveelheden</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Leverproducten (teveel vitamine A)</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Rauwe vis (thiaminase)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: Wat te doen bij vergiftiging */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Wat te Doen bij Vermoeden van Vergiftiging?
          </h2>

          <div className="bg-red-50 dark:bg-red-900/10 rounded-2xl p-6 border-2 border-red-500 dark:border-red-700 mb-6">
            <h3 className="font-bold text-red-900 dark:text-red-200 mb-4 flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Actieplan bij Vergiftiging
            </h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">1</span>
                <div>
                  <p className="font-medium text-red-900 dark:text-red-200">Bel direct je dierenarts of dierenambulance</p>
                  <p className="text-sm text-red-800 dark:text-red-300">Wacht niet af! Tijd is cruciaal bij vergiftiging.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">2</span>
                <div>
                  <p className="font-medium text-red-900 dark:text-red-200">Noteer wat je huisdier heeft gegeten</p>
                  <p className="text-sm text-red-800 dark:text-red-300">Hoeveel, hoe lang geleden, welk product? Neem verpakking mee indien mogelijk.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">3</span>
                <div>
                  <p className="font-medium text-red-900 dark:text-red-200">Laat NIET braken zonder overleg</p>
                  <p className="text-sm text-red-800 dark:text-red-300">Bij sommige vergiften kan braken de situatie verergeren. Volg altijd instructies van de dierenarts.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">4</span>
                <div>
                  <p className="font-medium text-red-900 dark:text-red-200">Ga direct naar de kliniek</p>
                  <p className="text-sm text-red-800 dark:text-red-300">Telefonisch advies is geen vervanging voor een fysiek onderzoek. Ga zo snel mogelijk naar de dierenarts.</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl p-6 border border-cpAmber/20 dark:border-cpAmber/10">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
              <Info className="h-5 w-5 text-cpAmber" />
              Belangrijke Nummers bij de Hand Houden:
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
              <li>• Je eigen dierenarts (spoednummer)</li>
              <li>• Dichtstbijzijnde dierenambulance (24/7)</li>
              <li>• Vergiftigingsinformatie Dieren: 0900-1234</li>
              <li>• Dierenkliniek met 24/7 spoedeisende hulp</li>
            </ul>
          </div>
        </section>

        {/* Section 4: Veilige Alternatieven */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veilige Tussendoortjes voor Honden en Katten
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Wil je je huisdier toch trakteren? Deze voedingsmiddelen zijn veilig in kleine hoeveelheden:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-4">Voor Honden:</h3>
              <ul className="space-y-2">
                {[
                  "Wortel (rauw of gekookt)",
                  "Appel (zonder pitjes en klokhuis)",
                  "Blauwe bessen",
                  "Watermeloen (zonder pitten)",
                  "Komkommer",
                  "Gare zoete aardappel",
                  "Gare kip (zonder bot)",
                  "Pindakaas (zonder xylitol!)",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-4">Voor Katten:</h3>
              <ul className="space-y-2">
                {[
                  "Gekookte kip (zonder bot)",
                  "Gekookte vis (zonder graat)",
                  "Gekookt ei (kleine hoeveelheid)",
                  "Kattengras",
                  "Gevriesdroogde vleessnacks",
                  "Kleine stukjes meloen",
                  "Komkommer (kleine stukjes)",
                  "Speciaal kattenijs (zonder melk)",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-sm text-muted-foreground dark:text-cpCream/70 mt-6">
            Let op: Treats en tussendoortjes mogen maximaal 10% van de dagelijkse calorie-inname vormen. Zie ook onze gids over{" "}
            <Link href="/nl/gids/huisdiervoeding/huisdier-afvallen" className="text-cpCoral hover:underline">
              gezond gewicht voor huisdieren
            </Link>.
          </p>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veelgestelde Vragen
          </h2>

          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Hoeveel chocolade is gevaarlijk voor mijn hond?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Dit hangt af van het soort chocolade en het gewicht van je hond. Als vuistregel: melkchocolade is minder toxisch dan pure chocolade. Voor een hond van 10 kg kan al 50 gram pure chocolade fataal zijn. Maar elke hoeveelheid chocolade is potentieel gevaarlijk - bel altijd direct je dierenarts als je hond chocolade heeft gegeten.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Mijn kat heeft per ongeluk een klein stukje ui gegeten, moet ik naar de dierenarts?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, neem altijd contact op met je dierenarts. Katten zijn zeer gevoelig voor uien en knoflook. Zelfs kleine hoeveelheden kunnen bloedarmoede veroorzaken. De symptomen kunnen pas na enkele dagen verschijnen, dus monitor je kat goed en volg het advies van de dierenarts.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Mag mijn hond pindakaas eten?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, maar controleer ALTIJD het etiket op xylitol! Sommige suikervrije pindakaas merken bevatten xylitol, wat zeer giftig is voor honden. Kies pindakaas zonder toegevoegde suiker, zout of xylitol. Geef in kleine hoeveelheden (1-2 theelepels voor een middelgrote hond) vanwege het hoge vetgehalte.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Hoelang na het eten van giftig voedsel verschijnen symptomen?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Dit verschilt per giftige stof. Sommige symptomen (zoals bij xylitol) kunnen binnen 30 minuten verschijnen. Andere (zoals bij uien) kunnen pas na 1-5 dagen zichtbaar worden. Wacht daarom nooit af maar bel altijd direct je dierenarts bij vermoeden van vergiftiging.
              </div>
            </details>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-3xl p-8 md:p-12 shadow-xl text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Twijfel? Neem Direct Contact Op
            </h2>
            <p className="text-white/90 mb-6 text-lg">
              Bij twijfel over veilig voedsel of vermoeden van vergiftiging, vind direct een dierenarts bij jou in de buurt. Snelle actie kan levens redden.
            </p>
            <Link
              href="/nl/netherlands"
              className="inline-block bg-white text-cpCoral rounded-xl px-8 py-4 hover:-translate-y-1 transition-transform font-bold shadow-lg text-lg"
            >
              Vind een dierenarts bij jou in de buurt →
            </Link>
          </div>
        </section>

        {/* Schema.org Article Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "Giftig Voedsel voor Honden en Katten: Complete Lijst",
              "description": "Complete gids over giftig en gevaarlijk voedsel voor honden en katten. Inclusief symptomen, noodmaatregelen en veilige alternatieven.",
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
              "datePublished": "2024-01-15",
              "dateModified": "2024-01-15"
            })
          }}
        />
      </article>
    </div>
  );
}
