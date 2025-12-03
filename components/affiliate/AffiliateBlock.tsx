"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trackAffiliateClick } from "@/lib/analytics";
import {
  Shield,
  Heart,
  Home,
  ShoppingBag,
  Package,
  Dog,
  Dna,
  Pill,
  ExternalLink,
  Star,
  Sparkles,
} from "lucide-react";

export type AffiliateType =
  | "pet-insurance"
  | "pet-cremation"
  | "pet-hotels"
  | "pet-products"
  | "food-subscriptions"
  | "pet-sitting"
  | "dna-tests"
  | "vet-health";

interface AffiliateLink {
  name: string;
  url: string;
  description?: string;
  discount?: string;
  logo?: string;
}

interface AffiliateBlockProps {
  type: AffiliateType;
  variant?: "card" | "inline" | "banner" | "compact";
  className?: string;
  customLinks?: AffiliateLink[];
  trackingId?: string;
  categoryContext?: string; // For tracking which category page the affiliate was shown on
}

// Default affiliate data for each type
const affiliateData: Record<
  AffiliateType,
  {
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
    bgColor: string;
    links: AffiliateLink[];
  }
> = {
  "pet-insurance": {
    title: "Pet Insurance",
    description: "Protect your furry friend with comprehensive pet insurance coverage.",
    icon: Shield,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    links: [
      {
        name: "Lemonade Pet",
        url: "#",
        description: "Fast claims, customizable coverage",
        discount: "Get a free quote",
      },
      {
        name: "Healthy Paws",
        url: "#",
        description: "No annual or lifetime limits",
        discount: "Save 10%",
      },
      {
        name: "Embrace",
        url: "#",
        description: "Wellness rewards included",
        discount: "Up to 25% off",
      },
    ],
  },
  "pet-cremation": {
    title: "Pet Cremation Services",
    description: "Compassionate end-of-life care and memorial services for your beloved pet.",
    icon: Heart,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    links: [
      {
        name: "Paw & Petal",
        url: "#",
        description: "Individual cremation with memorial options",
      },
      {
        name: "Gateway Pet Memorial",
        url: "#",
        description: "Dignified pet cremation services",
      },
      {
        name: "Peaceful Paws",
        url: "#",
        description: "At-home pickup available",
      },
    ],
  },
  "pet-hotels": {
    title: "Pet Hotels & Boarding",
    description: "Find the perfect home-away-from-home for your pet while you travel.",
    icon: Home,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    links: [
      {
        name: "Rover Boarding",
        url: "#",
        description: "Trusted pet sitters & boarding",
        discount: "$20 off first booking",
      },
      {
        name: "Wag! Hotels",
        url: "#",
        description: "Premium pet hotel services",
        discount: "10% first stay",
      },
      {
        name: "PetSmart PetsHotel",
        url: "#",
        description: "Hotel with 24/7 care",
      },
    ],
  },
  "pet-products": {
    title: "Pet Products",
    description: "Quality products for your pet's comfort, health, and happiness.",
    icon: ShoppingBag,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    links: [
      {
        name: "Chewy",
        url: "#",
        description: "Everything for your pet",
        discount: "35% off first Autoship",
      },
      {
        name: "Amazon Pet",
        url: "#",
        description: "Wide selection, fast delivery",
      },
      {
        name: "Petco",
        url: "#",
        description: "Quality pet supplies",
        discount: "20% off orders $50+",
      },
    ],
  },
  "food-subscriptions": {
    title: "Pet Food Subscriptions",
    description: "Fresh, healthy food delivered to your door for your dog or cat.",
    icon: Package,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    links: [
      {
        name: "The Farmer's Dog",
        url: "#",
        description: "Fresh, human-grade dog food",
        discount: "50% off first box",
      },
      {
        name: "Nom Nom",
        url: "#",
        description: "Vet-formulated fresh meals",
        discount: "50% off trial",
      },
      {
        name: "Ollie",
        url: "#",
        description: "Customized fresh dog food",
        discount: "60% off first box",
      },
      {
        name: "Smalls (Cats)",
        url: "#",
        description: "Fresh cat food delivery",
        discount: "25% off first order",
      },
    ],
  },
  "pet-sitting": {
    title: "Pet Sitting & Dog Walking",
    description: "Trusted pet sitters and dog walkers in your neighborhood.",
    icon: Dog,
    color: "text-cpPink",
    bgColor: "bg-cpPink/10",
    links: [
      {
        name: "Rover",
        url: "#",
        description: "Nation's largest network of pet sitters",
        discount: "$20 off first booking",
      },
      {
        name: "Wag!",
        url: "#",
        description: "On-demand dog walking",
        discount: "First walk free",
      },
      {
        name: "Pawshake",
        url: "#",
        description: "Trusted local pet sitters",
        discount: "10% off first booking",
      },
    ],
  },
  "dna-tests": {
    title: "Pet DNA Tests",
    description: "Discover your pet's breed, health risks, and ancestry.",
    icon: Dna,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    links: [
      {
        name: "Embark",
        url: "#",
        description: "Most accurate dog DNA test",
        discount: "Up to $50 off",
      },
      {
        name: "Wisdom Panel",
        url: "#",
        description: "350+ breed detection",
        discount: "20% off",
      },
      {
        name: "Basepaws (Cats)",
        url: "#",
        description: "Cat DNA & health screening",
        discount: "15% off",
      },
    ],
  },
  "vet-health": {
    title: "Vet & Health Products",
    description: "Medications, supplements, and health products for your pet.",
    icon: Pill,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    links: [
      {
        name: "Chewy Pharmacy",
        url: "#",
        description: "Pet medications & prescriptions",
        discount: "35% off first Autoship",
      },
      {
        name: "1-800-PetMeds",
        url: "#",
        description: "America's Pet Health Resource",
        discount: "20% off + free shipping",
      },
      {
        name: "PetCareRx",
        url: "#",
        description: "Trusted pet pharmacy",
        discount: "25% off first order",
      },
    ],
  },
};

export function AffiliateBlock({
  type,
  variant = "card",
  className = "",
  customLinks,
  trackingId,
  categoryContext,
}: AffiliateBlockProps) {
  const data = affiliateData[type];
  const links = customLinks || data.links;
  const Icon = data.icon;

  // Add tracking parameter to URLs
  const getTrackedUrl = (url: string) => {
    if (!trackingId || url === "#") return url;
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}ref=${trackingId}`;
  };

  // Track affiliate click
  const handleAffiliateClick = (link: AffiliateLink, position: number) => {
    trackAffiliateClick({
      affiliateType: type,
      affiliateName: link.name,
      affiliateUrl: link.url,
      variant,
      categoryContext,
      position,
      hasDiscount: !!link.discount,
    });
  };

  // Compact variant - single line
  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-3 p-3 rounded-lg ${data.bgColor} ${className}`}>
        <Icon className={`h-5 w-5 ${data.color} shrink-0`} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-700 truncate">{data.title}</p>
        </div>
        <Button size="sm" variant="outline" className="shrink-0 gap-1" asChild>
          <a
            href={getTrackedUrl(links[0]?.url || "#")}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={() => links[0] && handleAffiliateClick(links[0], 0)}
          >
            Learn More <ExternalLink className="h-3 w-3" />
          </a>
        </Button>
      </div>
    );
  }

  // Banner variant - horizontal full-width
  if (variant === "banner") {
    return (
      <div className={`p-4 rounded-xl ${data.bgColor} ${className}`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className={`p-3 rounded-full bg-white shadow-sm`}>
            <Icon className={`h-6 w-6 ${data.color}`} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800 mb-1">{data.title}</h3>
            <p className="text-sm text-slate-600">{data.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {links.slice(0, 2).map((link, index) => (
              <Button
                key={link.name}
                size="sm"
                variant={index === 0 ? "default" : "outline"}
                className={index === 0 ? "bg-cpPink hover:bg-cpPink/90" : ""}
                asChild
              >
                <a
                  href={getTrackedUrl(link.url)}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  onClick={() => handleAffiliateClick(link, index)}
                >
                  {link.name}
                  {link.discount && (
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {link.discount}
                    </Badge>
                  )}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Inline variant - minimal styling
  if (variant === "inline") {
    return (
      <div className={`space-y-3 ${className}`}>
        <div className="flex items-center gap-2">
          <Icon className={`h-5 w-5 ${data.color}`} />
          <h4 className="font-medium text-slate-700">{data.title}</h4>
        </div>
        <div className="grid gap-2">
          {links.map((link, index) => (
            <a
              key={link.name}
              href={getTrackedUrl(link.url)}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={() => handleAffiliateClick(link, index)}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span className="font-medium text-slate-700 group-hover:text-cpPink transition-colors">
                  {link.name}
                </span>
                {link.discount && (
                  <Badge variant="secondary" className="text-xs bg-cpAqua/10 text-cpAqua">
                    {link.discount}
                  </Badge>
                )}
              </div>
              <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-cpPink transition-colors" />
            </a>
          ))}
        </div>
      </div>
    );
  }

  // Card variant (default) - full featured
  return (
    <Card className={`overflow-hidden hover-lift ${className}`}>
      <CardHeader className={`${data.bgColor} pb-4`}>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-white shadow-sm">
            <Icon className={`h-5 w-5 ${data.color}`} />
          </div>
          <div>
            <span className="text-lg">{data.title}</span>
            <Badge variant="outline" className="ml-2 text-xs border-slate-300">
              <Sparkles className="h-3 w-3 mr-1" />
              Partner
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-sm text-slate-600 mb-4">{data.description}</p>
        <div className="space-y-3">
          {links.map((link, index) => (
            <a
              key={link.name}
              href={getTrackedUrl(link.url)}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={() => handleAffiliateClick(link, index)}
              className="block p-3 rounded-lg border border-slate-200 hover:border-cpPink hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-slate-800 group-hover:text-cpPink transition-colors">
                      {link.name}
                    </span>
                    {index === 0 && (
                      <Badge className="bg-cpYellow/20 text-amber-700 border-cpYellow text-xs">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        Top Pick
                      </Badge>
                    )}
                  </div>
                  {link.description && (
                    <p className="text-sm text-slate-500">{link.description}</p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1">
                  {link.discount && (
                    <Badge className="bg-cpAqua/10 text-cpAqua border-cpAqua/30 text-xs whitespace-nowrap">
                      {link.discount}
                    </Badge>
                  )}
                  <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-cpPink transition-colors" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Pre-configured components for each affiliate type
export function PetInsuranceBlock(props: Omit<AffiliateBlockProps, "type">) {
  return <AffiliateBlock type="pet-insurance" {...props} />;
}

export function PetCremationBlock(props: Omit<AffiliateBlockProps, "type">) {
  return <AffiliateBlock type="pet-cremation" {...props} />;
}

export function PetHotelsBlock(props: Omit<AffiliateBlockProps, "type">) {
  return <AffiliateBlock type="pet-hotels" {...props} />;
}

export function PetProductsBlock(props: Omit<AffiliateBlockProps, "type">) {
  return <AffiliateBlock type="pet-products" {...props} />;
}

export function FoodSubscriptionsBlock(props: Omit<AffiliateBlockProps, "type">) {
  return <AffiliateBlock type="food-subscriptions" {...props} />;
}

export function PetSittingBlock(props: Omit<AffiliateBlockProps, "type">) {
  return <AffiliateBlock type="pet-sitting" {...props} />;
}

export function DnaTestsBlock(props: Omit<AffiliateBlockProps, "type">) {
  return <AffiliateBlock type="dna-tests" {...props} />;
}

export function VetHealthBlock(props: Omit<AffiliateBlockProps, "type">) {
  return <AffiliateBlock type="vet-health" {...props} />;
}

// Category-aware affiliate recommendation
export function CategoryAffiliateBlock({
  categorySlug,
  variant = "card",
  className = "",
}: {
  categorySlug: string;
  variant?: "card" | "inline" | "banner" | "compact";
  className?: string;
}) {
  // Map categories to relevant affiliate types
  const categoryAffiliateMap: Record<string, AffiliateType[]> = {
    "veterinarians": ["pet-insurance", "vet-health"],
    "vets": ["pet-insurance", "vet-health"],
    "pet-stores": ["pet-products", "food-subscriptions"],
    "pet-shops": ["pet-products", "food-subscriptions"],
    "groomers": ["pet-products", "pet-sitting"],
    "grooming": ["pet-products", "pet-sitting"],
    "boarding": ["pet-hotels", "pet-sitting"],
    "kennels": ["pet-hotels", "pet-sitting"],
    "pet-hotels": ["pet-hotels", "pet-insurance"],
    "dog-walkers": ["pet-sitting", "pet-insurance"],
    "pet-sitters": ["pet-sitting", "pet-hotels"],
    "trainers": ["pet-products", "pet-sitting"],
    "dog-training": ["pet-products", "dna-tests"],
    "cremation": ["pet-cremation"],
    "pet-cremation": ["pet-cremation"],
    "memorial": ["pet-cremation"],
    "shelters": ["pet-insurance", "pet-products"],
    "adoption": ["pet-insurance", "dna-tests"],
    "breeders": ["dna-tests", "pet-insurance"],
  };

  // Find matching affiliate types
  const matchedTypes = categoryAffiliateMap[categorySlug.toLowerCase()] || ["pet-insurance", "pet-products"];

  return (
    <div className={`space-y-4 ${className}`}>
      {matchedTypes.map((type) => (
        <AffiliateBlock key={type} type={type} variant={variant} categoryContext={categorySlug} />
      ))}
    </div>
  );
}
