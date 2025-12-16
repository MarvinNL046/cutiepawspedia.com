/**
 * Dynamic Toxicity Page - Programmatic SEO
 * Generates 5,000-10,000 pages from CSV data
 * URL: /nl/is-{slug}-giftig-voor-{animal}
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, Phone, Clock, CheckCircle, Info, ChevronRight } from "lucide-react";
import {
  getToxicityPageData,
  getAllToxicityPageParams,
  getRelatedSubstances,
  getMostDangerousSubstances,
} from "@/lib/toxicity/data";
import {
  Animal,
  TOXICITY_CONFIG,
  ANIMAL_DISPLAY,
  TYPE_DISPLAY,
} from "@/lib/toxicity/types";
import { FoodGuideBreadcrumb } from "@/components/seo/FoodGuideBreadcrumb";
import { generateToxicityContent } from "@/lib/toxicity/content-generator";

// Static params for all combinations
export async function generateStaticParams() {
  const params = getAllToxicityPageParams();
  // Add locale
  return params.map(p => ({
    locale: 'nl',
    slug: p.slug,
    animal: p.animal,
  }));
}

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
    animal: string;
  }>;
}

// Generate metadata with SEO optimization
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, animal } = await params;
  const pageData = getToxicityPageData(slug, animal as Animal);

  if (!pageData) {
    return { title: "Niet gevonden" };
  }

  const { substance } = pageData;
  const animalDisplay = ANIMAL_DISPLAY[animal as Animal];
  const config = TOXICITY_CONFIG[substance.toxicity_level];

  const title = `Is ${substance.name} Giftig voor ${animalDisplay.singular.charAt(0).toUpperCase() + animalDisplay.singular.slice(1)}en? | ${config.label}`;
  const description = `${substance.name} is ${config.label.toLowerCase()} voor ${animal}. Ontdek symptomen, wat te doen bij inname, en wanneer naar de dierenarts. Complete gids voor huisdiereigenaren.`;

  return {
    title,
    description,
    robots: pageData.shouldIndex
      ? { index: true, follow: true }
      : { index: false, follow: true },
    alternates: {
      canonical: pageData.canonicalUrl,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: pageData.canonicalUrl,
    },
  };
}

export default async function ToxicityPage({ params }: PageProps) {
  const { slug, animal } = await params;
  const pageData = getToxicityPageData(slug, animal as Animal);

  if (!pageData) {
    notFound();
  }

  const { substance } = pageData;
  const animalDisplay = ANIMAL_DISPLAY[animal as Animal];
  const config = TOXICITY_CONFIG[substance.toxicity_level];
  const typeDisplay = TYPE_DISPLAY[substance.type];

  // Generate AI content (cached)
  const content = await generateToxicityContent(substance, animal as Animal);

  // Get related substances for internal linking
  const relatedSubstances = getRelatedSubstances(substance, animal as Animal, 6);
  const mostDangerous = getMostDangerousSubstances(animal as Animal, 5);

  // JSON-LD FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // Article schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Is ${substance.name} Giftig voor ${animalDisplay.singular.charAt(0).toUpperCase() + animalDisplay.singular.slice(1)}en?`,
    description: content.tldr,
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
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
  };

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="bg-background dark:bg-cpCharcoal min-h-screen">
        {/* Hero Section - Color based on toxicity */}
        <section className={`${config.bgColor} border-b ${config.borderColor}`}>
          <div className="container mx-auto max-w-4xl px-4 py-12">
            {/* Breadcrumb */}
            <FoodGuideBreadcrumb
              items={[
                { name: "Voedselgids", href: "/nl/voedselgids" },
                { name: animal === 'honden' ? "Giftig voor Honden" : "Giftig voor Katten", href: `/nl/giftig-voor-${animal}` },
              ]}
              currentPage={substance.name}
            />

            {/* Toxicity Badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{config.icon}</span>
              <span className={`text-sm font-bold ${config.color} uppercase tracking-wide`}>
                {config.label} voor {animal}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
              Is {substance.name} Giftig voor {animalDisplay.singular.charAt(0).toUpperCase() + animalDisplay.singular.slice(1)}en?
            </h1>

            {/* TL;DR Box */}
            <div className={`${config.bgColor} rounded-2xl p-6 border-2 ${config.borderColor}`}>
              <h2 className={`text-xl font-bold ${config.color} mb-2`}>
                TL;DR - Kort Antwoord
              </h2>
              <p className={`${config.color}`}>
                {content.tldr}
              </p>
            </div>

            {/* Quick Info Pills */}
            <div className="flex flex-wrap gap-2 mt-6">
              <span className="px-3 py-1 bg-white/50 dark:bg-black/20 rounded-full text-sm">
                {typeDisplay}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm ${config.bgColor} ${config.color} border ${config.borderColor}`}>
                {config.label}
              </span>
            </div>
          </div>
        </section>

        {/* Emergency Contact Strip */}
        {substance.toxicity_level === 'hoog' && (
          <section className="bg-red-600 dark:bg-red-700 text-white py-4">
            <div className="container mx-auto max-w-4xl px-4 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Phone className="h-6 w-6" />
                <div>
                  <p className="font-bold">Noodgeval? Bel direct de dierenarts!</p>
                  <p className="text-sm text-white/80">Spoed Dierenarts Nederland: 0900-8844</p>
                </div>
              </div>
              <Link
                href="/nl/dierenarts-zoeken"
                className="bg-white text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Vind Dierenarts
              </Link>
            </div>
          </section>
        )}

        {/* Main Content */}
        <article className="container mx-auto max-w-4xl px-4 py-12">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {/* Introduction */}
            <section className="mb-12">
              <p className="text-lg text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                {content.introduction}
              </p>
            </section>

            {/* Why Dangerous */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-2">
                <AlertTriangle className={`h-6 w-6 ${config.color}`} />
                Waarom is {substance.name} {substance.toxicity_level === 'hoog' ? 'Gevaarlijk' : 'Schadelijk'} voor {animalDisplay.singular.charAt(0).toUpperCase() + animalDisplay.singular.slice(1)}en?
              </h2>
              <div className={`${config.bgColor} rounded-xl p-6 border ${config.borderColor}`}>
                <p className={`${config.color}`}>{content.whyDangerous}</p>
              </div>
            </section>

            {/* Symptoms */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-2">
                <Info className="h-6 w-6 text-blue-500" />
                Symptomen van {substance.name} Vergiftiging bij {animalDisplay.singular.charAt(0).toUpperCase() + animalDisplay.singular.slice(1)}en
              </h2>
              <div className="grid md:grid-cols-2 gap-3 not-prose">
                {content.symptoms.map((symptom, index) => (
                  <div key={index} className="flex items-start gap-3 bg-card dark:bg-cpSurface/50 rounded-lg p-4">
                    <AlertTriangle className={`h-5 w-5 ${config.color} mt-0.5 flex-shrink-0`} />
                    <span className="text-foreground dark:text-cpCream">{symptom}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* What To Do */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-emerald-500" />
                Wat te Doen als {animalDisplay.possessive} {substance.name} Heeft Gegeten
              </h2>
              <ol className="space-y-3 not-prose">
                {content.whatToDo.map((step, index) => (
                  <li key={index} className="flex items-start gap-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4">
                    <span className="flex items-center justify-center w-6 h-6 bg-emerald-500 text-white rounded-full text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-foreground dark:text-cpCream">{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* When to Vet */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-2">
                <Clock className="h-6 w-6 text-amber-500" />
                Wanneer Direct naar de Dierenarts?
              </h2>
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
                <ul className="space-y-2 not-prose">
                  {content.whenToVet.map((reason, index) => (
                    <li key={index} className="flex items-start gap-2 text-amber-800 dark:text-amber-200">
                      <ChevronRight className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">
                Veelgestelde Vragen over {substance.name} en {animalDisplay.singular.charAt(0).toUpperCase() + animalDisplay.singular.slice(1)}en
              </h2>
              <div className="space-y-4 not-prose">
                {content.faqs.map((faq, index) => (
                  <details key={index} className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpBorder">
                    <summary className="px-6 py-4 cursor-pointer font-medium text-foreground dark:text-cpCream hover:bg-muted/50 dark:hover:bg-cpSurface rounded-xl">
                      {faq.question}
                    </summary>
                    <div className="px-6 py-4 border-t border-border dark:border-cpBorder text-muted-foreground dark:text-cpCream/80">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* Related Substances - Internal Linking */}
            {relatedSubstances.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">
                  Gerelateerde Giftige Stoffen voor {animalDisplay.singular.charAt(0).toUpperCase() + animalDisplay.singular.slice(1)}en
                </h2>
                <div className="grid md:grid-cols-3 gap-3 not-prose">
                  {relatedSubstances.map((related) => {
                    const relConfig = TOXICITY_CONFIG[related.toxicity_level];
                    return (
                      <Link
                        key={related.slug}
                        href={`/nl/is-${related.slug}-giftig-voor-${animal}`}
                        className={`${relConfig.bgColor} rounded-xl p-4 border ${relConfig.borderColor} hover:shadow-md transition-shadow`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span>{relConfig.icon}</span>
                          <span className={`text-xs font-medium ${relConfig.color}`}>{relConfig.label}</span>
                        </div>
                        <p className="font-medium text-foreground dark:text-cpCream">
                          {related.name}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Most Dangerous - Internal Linking */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">
                Top 5 Gevaarlijkste Stoffen voor {animalDisplay.singular.charAt(0).toUpperCase() + animalDisplay.singular.slice(1)}en
              </h2>
              <div className="flex flex-wrap gap-2 not-prose">
                {mostDangerous.map((dangerous) => (
                  <Link
                    key={dangerous.slug}
                    href={`/nl/is-${dangerous.slug}-giftig-voor-${animal}`}
                    className="inline-flex items-center gap-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors"
                  >
                    {TOXICITY_CONFIG[dangerous.toxicity_level].icon} {dangerous.name}
                  </Link>
                ))}
              </div>
            </section>

            {/* Disclaimer */}
            <section className="bg-muted/50 dark:bg-cpSurface/30 rounded-xl p-6 text-sm text-muted-foreground dark:text-cpCream/60">
              <p>
                <strong>Disclaimer:</strong> {content.disclaimer}
              </p>
            </section>
          </div>
        </article>

        {/* AdSense Safe Placement Area */}
        <aside className="container mx-auto max-w-4xl px-4 pb-12">
          <div className="bg-muted/30 dark:bg-cpSurface/20 rounded-xl p-8 text-center">
            <p className="text-xs text-muted-foreground mb-2">Advertentie</p>
            {/* AdSense code hier plaatsen */}
            <div className="h-24 flex items-center justify-center text-muted-foreground">
              {/* AdSense slot */}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
