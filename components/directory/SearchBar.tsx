"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Loader2 } from "lucide-react";

interface SearchBarProps {
  locale: string;
  placeholder?: string;
  className?: string;
  initialQuery?: string;
  initialLocation?: string;
  compact?: boolean;
}

export function SearchBar({
  locale,
  placeholder = "Search pet services...",
  className = "",
  initialQuery = "",
  initialLocation = "",
  compact = false,
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() && !location.trim()) return;

    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (location.trim()) params.set("city", location.trim().toLowerCase().replace(/\s+/g, "-"));

    startTransition(() => {
      router.push(`/${locale}/search?${params.toString()}`);
    });
  };

  if (compact) {
    return (
      <form onSubmit={handleSearch} className={`flex gap-2 ${className}`} role="search" aria-label="Search pet services">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-cpAmber/60" aria-hidden="true" />
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 rounded-xl bg-white dark:bg-cpSurface border-slate-200 dark:border-cpAmber/20 focus:border-cpCoral dark:focus:border-cpAmber"
            aria-label="Search query"
          />
        </div>
        <Button type="submit" size="icon" className="btn-coral rounded-xl" disabled={isPending} aria-label="Submit search">
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Search className="h-4 w-4" aria-hidden="true" />}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSearch} className={`cozy-search flex flex-col sm:flex-row gap-3 ${className}`} role="search" aria-label="Search pet services">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-cpAmber/60" aria-hidden="true" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-12 py-3 rounded-2xl bg-white dark:bg-cpSurface border-slate-200 dark:border-cpAmber/20 focus:border-cpCoral dark:focus:border-cpAmber focus:ring-cpCoral/20 dark:focus:ring-cpAmber/20"
          aria-label="Search query"
        />
      </div>
      <div className="relative flex-1">
        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-cpAmber/60" aria-hidden="true" />
        <Input
          type="text"
          placeholder="City or region..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="pl-12 py-3 rounded-2xl bg-white dark:bg-cpSurface border-slate-200 dark:border-cpAmber/20 focus:border-cpCoral dark:focus:border-cpAmber focus:ring-cpCoral/20 dark:focus:ring-cpAmber/20"
          aria-label="City or region"
        />
      </div>
      <Button type="submit" className="btn-coral px-8 py-3 rounded-2xl text-base font-semibold" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" aria-hidden="true" />
            Searching...
          </>
        ) : (
          "Search"
        )}
      </Button>
    </form>
  );
}
