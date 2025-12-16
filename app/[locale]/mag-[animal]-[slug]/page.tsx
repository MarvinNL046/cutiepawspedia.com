/**
 * Synonym Route: "Mag {animal} {slug}"
 * Example: /nl/mag-hond-chocolade
 * Status: NOINDEX - points to canonical
 */

import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import {
  getSubstanceBySlug,
  getAllToxicityPageParams,
} from "@/lib/toxicity/data";
import { Animal, ANIMAL_DISPLAY } from "@/lib/toxicity/types";

export async function generateStaticParams() {
  const params = getAllToxicityPageParams();
  return params.map(p => ({
    locale: 'nl',
    animal: p.animal === 'honden' ? 'hond' : 'kat', // singular form
    slug: p.slug,
  }));
}

interface PageProps {
  params: Promise<{
    locale: string;
    animal: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, animal } = await params;
  const substance = getSubstanceBySlug(slug);

  if (!substance) {
    return { title: "Niet gevonden" };
  }

  // Map singular to plural
  const animalPlural = animal === 'hond' ? 'honden' : 'katten';
  const canonicalUrl = `https://cutiepawspedia.com/nl/is-${slug}-giftig-voor-${animalPlural}`;

  return {
    title: `Mag een ${animal.charAt(0).toUpperCase() + animal.slice(1)} ${substance.name}?`,
    description: `Ontdek of ${animal}en ${substance.name} mogen eten en wat de risico's zijn.`,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function MagAnimalSlugPage({ params }: PageProps) {
  const { locale, slug, animal } = await params;

  const substance = getSubstanceBySlug(slug);
  if (!substance) {
    notFound();
  }

  // Map singular to plural for redirect
  const animalPlural = animal === 'hond' ? 'honden' : 'katten';

  // Redirect to canonical URL
  redirect(`/${locale}/is-${slug}-giftig-voor-${animalPlural}`);
}
