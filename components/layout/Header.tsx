"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Menu } from "lucide-react";

interface HeaderProps {
  locale: string;
  variant?: "marketing" | "directory";
}

const locales = [
  { code: "en", label: "English" },
  { code: "nl", label: "Nederlands" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
];

export function Header({ locale, variant = "marketing" }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <span className="text-2xl">🐾</span>
          <span className="text-xl font-bold text-cpDark">
            Cutie<span className="text-cpPink">Paws</span>Pedia
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {variant === "marketing" ? (
            <>
              <Link
                href={`/${locale}`}
                className="text-sm font-medium text-slate-600 hover:text-cpPink transition-colors"
              >
                Home
              </Link>
              <Link
                href={`/${locale}/about`}
                className="text-sm font-medium text-slate-600 hover:text-cpPink transition-colors"
              >
                About
              </Link>
              <Link
                href={`/${locale}/for-businesses`}
                className="text-sm font-medium text-slate-600 hover:text-cpPink transition-colors"
              >
                For Businesses
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="text-sm font-medium text-slate-600 hover:text-cpPink transition-colors"
              >
                Contact
              </Link>
            </>
          ) : (
            <>
              <Link
                href={`/${locale}`}
                className="text-sm font-medium text-slate-600 hover:text-cpPink transition-colors"
              >
                Directory
              </Link>
              <Link
                href={`/${locale}/search`}
                className="text-sm font-medium text-slate-600 hover:text-cpPink transition-colors"
              >
                Search
              </Link>
            </>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline uppercase">{locale}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {locales.map((l) => (
                <DropdownMenuItem key={l.code} asChild>
                  <Link href={`/${l.code}`}>{l.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* CTA Button */}
          <Button size="sm" className="bg-cpPink hover:bg-cpPink/90 hidden sm:flex">
            List Your Business
          </Button>

          {/* Mobile Menu */}
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
