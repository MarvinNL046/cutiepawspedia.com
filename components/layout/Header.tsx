"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Menu, X, User, LogOut, Settings, Heart } from "lucide-react";
import { useAuth, isAuthConfigured } from "@/lib/auth/use-auth";
import { ThemeToggle } from "@/components/theme";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2" aria-label="CutiePawsPedia - Go to homepage">
          <span className="text-2xl" role="img" aria-hidden="true">🐾</span>
          <span className="text-xl font-bold text-foreground">
            Cutie<span className="text-cpPink">Paws</span>Pedia
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {variant === "marketing" ? (
            <>
              <Link
                href={`/${locale}`}
                className="text-sm font-medium text-muted-foreground hover:text-cpPink transition-colors"
              >
                Home
              </Link>
              <Link
                href={`/${locale}/blog`}
                className="text-sm font-medium text-muted-foreground hover:text-cpPink transition-colors"
              >
                Blog
              </Link>
              <Link
                href={`/${locale}/about`}
                className="text-sm font-medium text-muted-foreground hover:text-cpPink transition-colors"
              >
                About
              </Link>
              <Link
                href={`/${locale}/for-businesses`}
                className="text-sm font-medium text-muted-foreground hover:text-cpPink transition-colors"
              >
                For Businesses
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="text-sm font-medium text-muted-foreground hover:text-cpPink transition-colors"
              >
                Contact
              </Link>
            </>
          ) : (
            <>
              <Link
                href={`/${locale}`}
                className="text-sm font-medium text-muted-foreground hover:text-cpPink transition-colors"
              >
                Directory
              </Link>
              <Link
                href={`/${locale}/search`}
                className="text-sm font-medium text-muted-foreground hover:text-cpPink transition-colors"
              >
                Search
              </Link>
              <Link
                href={`/${locale}/blog`}
                className="text-sm font-medium text-muted-foreground hover:text-cpPink transition-colors"
              >
                Blog
              </Link>
            </>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2" aria-label="Select language">
                <Globe className="h-4 w-4" aria-hidden="true" />
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
                <Button variant="ghost" size="sm" className="gap-2" aria-label="User menu">
                  <User className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline max-w-[100px] truncate">
                    {user.displayName || user.primaryEmail?.split("@")[0]}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/${locale}/account/favorites`} className="gap-2">
                    <Heart className="h-4 w-4" />
                    My Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/${locale}/account/notifications`} className="gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
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

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {variant === "marketing" ? (
              <>
                <Link
                  href={`/${locale}`}
                  className="text-sm font-medium text-muted-foreground hover:text-cpPink transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href={`/${locale}/blog`}
                  className="text-sm font-medium text-muted-foreground hover:text-cpPink transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href={`/${locale}/about`}
                  className="text-sm font-medium text-muted-foreground hover:text-cpPink transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href={`/${locale}/for-businesses`}
                  className="text-sm font-medium text-muted-foreground hover:text-cpPink transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  For Businesses
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="text-sm font-medium text-muted-foreground hover:text-cpPink transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={`/${locale}`}
                  className="text-sm font-medium text-muted-foreground hover:text-cpPink transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Directory
                </Link>
                <Link
                  href={`/${locale}/search`}
                  className="text-sm font-medium text-muted-foreground hover:text-cpPink transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Search
                </Link>
                <Link
                  href={`/${locale}/blog`}
                  className="text-sm font-medium text-muted-foreground hover:text-cpPink transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </Link>
              </>
            )}

            {/* Mobile Auth Links */}
            {isAuthConfigured && user ? (
              <>
                <div className="border-t border-border pt-4 mt-2">
                  <Link
                    href={`/${locale}/account/favorites`}
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-cpPink transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Heart className="h-4 w-4" />
                    My Account
                  </Link>
                  <Link
                    href={`/${locale}/account/notifications`}
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-cpPink transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                  <Link
                    href="/handler/sign-out"
                    className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Link>
                </div>
              </>
            ) : isAuthConfigured ? (
              <div className="border-t border-border pt-4 mt-2 flex flex-col gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/handler/sign-in" onClick={() => setMobileMenuOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                <Button size="sm" className="bg-cpPink hover:bg-cpPink/90" asChild>
                  <Link href="/handler/sign-up" onClick={() => setMobileMenuOpen(false)}>
                    Sign Up
                  </Link>
                </Button>
              </div>
            ) : null}

            {/* Mobile CTA */}
            {!user && (
              <div className="border-t border-border pt-4 mt-2">
                <Button size="sm" className="bg-cpPink hover:bg-cpPink/90 w-full" asChild>
                  <Link href={`/${locale}/for-businesses`} onClick={() => setMobileMenuOpen(false)}>
                    List Your Business
                  </Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
