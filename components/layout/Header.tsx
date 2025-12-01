"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Menu, User, LogOut, Settings } from "lucide-react";
import { useAuth, isAuthConfigured } from "@/lib/auth/use-auth";

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
  const user = useAuth();

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

          {/* Auth / User Menu - only show when auth is configured */}
          {isAuthConfigured && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline max-w-[100px] truncate">
                    {user.displayName || user.primaryEmail?.split("@")[0]}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/handler/account-settings" className="gap-2">
                    <Settings className="h-4 w-4" />
                    Account Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/handler/sign-out" className="gap-2 text-red-600">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : isAuthConfigured ? (
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/handler/sign-in">Sign In</Link>
              </Button>
              <Button size="sm" className="bg-cpPink hover:bg-cpPink/90" asChild>
                <Link href="/handler/sign-up">Sign Up</Link>
              </Button>
            </div>
          ) : null}

          {/* CTA Button - always show for non-logged in users */}
          {!user && (
            <Button size="sm" className="bg-cpPink hover:bg-cpPink/90 hidden sm:flex" asChild>
              <Link href={`/${locale}/for-businesses`}>List Your Business</Link>
            </Button>
          )}

          {/* Mobile Menu */}
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
