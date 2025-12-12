"use client";

import { useState } from "react";
import NextLink from "next/link";
import { useTranslations } from "next-intl";

// Wrapper to disable prefetch for performance
const Link = ({ children, ...props }: React.ComponentProps<typeof NextLink>) => (
  <NextLink prefetch={false} {...props}>{children}</NextLink>
);
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
import { localeNames, type Locale } from "@/i18n/config";

interface HeaderProps {
  locale: string;
  variant?: "marketing" | "directory";
}

const locales: { code: Locale; label: string }[] = [
  { code: "en", label: localeNames.en },
  { code: "nl", label: localeNames.nl },
  { code: "de", label: localeNames.de },
  { code: "fr", label: localeNames.fr },
];

export function Header({ locale, variant = "marketing" }: HeaderProps) {
  const user = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = useTranslations("common");
  const tHeader = useTranslations("header");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2" aria-label="CutiePawsPedia - Go to homepage">
          <span className="text-2xl" role="img" aria-hidden="true">🐾</span>
          <span className="text-xl font-bold text-foreground">
            Cutie<span className="text-cpCoral">Paws</span>Pedia
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {variant === "marketing" ? (
            <>
              <Link
                href={`/${locale}`}
                className="text-sm font-medium text-muted-foreground hover:text-cpCoral transition-colors"
              >
                {t("home")}
              </Link>
              <Link
                href={`/${locale}/blog`}
                className="text-sm font-medium text-muted-foreground hover:text-cpCoral transition-colors"
              >
                {t("blog")}
              </Link>
              <Link
                href={`/${locale}/about`}
                className="text-sm font-medium text-muted-foreground hover:text-cpCoral transition-colors"
              >
                {t("about")}
              </Link>
              <Link
                href={`/${locale}/for-businesses`}
                className="text-sm font-medium text-muted-foreground hover:text-cpCoral transition-colors"
              >
                {t("forBusinesses")}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="text-sm font-medium text-muted-foreground hover:text-cpCoral transition-colors"
              >
                {t("contact")}
              </Link>
            </>
          ) : (
            <>
              <Link
                href={`/${locale}`}
                className="text-sm font-medium text-muted-foreground hover:text-cpCoral transition-colors"
              >
                {t("directory")}
              </Link>
              <Link
                href={`/${locale}/search`}
                className="text-sm font-medium text-muted-foreground hover:text-cpCoral transition-colors"
              >
                {t("search")}
              </Link>
              <Link
                href={`/${locale}/blog`}
                className="text-sm font-medium text-muted-foreground hover:text-cpCoral transition-colors"
              >
                {t("blog")}
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
                    {tHeader("myAccount")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/${locale}/account/notifications`} className="gap-2">
                    <Settings className="h-4 w-4" />
                    {tHeader("settings")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/handler/sign-out" className="gap-2 text-red-600">
                    <LogOut className="h-4 w-4" />
                    {tHeader("signOut")}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : isAuthConfigured ? (
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/handler/sign-in">{tHeader("signIn")}</Link>
              </Button>
              <Button size="sm" className="bg-cpCoral hover:bg-cpCoral/90" asChild>
                <Link href="/handler/sign-up">{tHeader("signUp")}</Link>
              </Button>
            </div>
          ) : null}

          {/* CTA Button - always show for non-logged in users */}
          {!user && (
            <Button size="sm" className="bg-cpCoral hover:bg-cpCoral/90 hidden sm:flex" asChild>
              <Link href={`/${locale}/for-businesses`}>{t("listYourBusiness")}</Link>
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
                  className="text-sm font-medium text-muted-foreground hover:text-cpCoral transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("home")}
                </Link>
                <Link
                  href={`/${locale}/blog`}
                  className="text-sm font-medium text-muted-foreground hover:text-cpCoral transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("blog")}
                </Link>
                <Link
                  href={`/${locale}/about`}
                  className="text-sm font-medium text-muted-foreground hover:text-cpCoral transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("about")}
                </Link>
                <Link
                  href={`/${locale}/for-businesses`}
                  className="text-sm font-medium text-muted-foreground hover:text-cpCoral transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("forBusinesses")}
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="text-sm font-medium text-muted-foreground hover:text-cpCoral transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("contact")}
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={`/${locale}`}
                  className="text-sm font-medium text-muted-foreground hover:text-cpCoral transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("directory")}
                </Link>
                <Link
                  href={`/${locale}/search`}
                  className="text-sm font-medium text-muted-foreground hover:text-cpCoral transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("search")}
                </Link>
                <Link
                  href={`/${locale}/blog`}
                  className="text-sm font-medium text-muted-foreground hover:text-cpCoral transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("blog")}
                </Link>
              </>
            )}

            {/* Mobile Auth Links */}
            {isAuthConfigured && user ? (
              <>
                <div className="border-t border-border pt-4 mt-2">
                  <Link
                    href={`/${locale}/account/favorites`}
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-cpCoral transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Heart className="h-4 w-4" />
                    {tHeader("myAccount")}
                  </Link>
                  <Link
                    href={`/${locale}/account/notifications`}
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-cpCoral transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4" />
                    {tHeader("settings")}
                  </Link>
                  <Link
                    href="/handler/sign-out"
                    className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LogOut className="h-4 w-4" />
                    {tHeader("signOut")}
                  </Link>
                </div>
              </>
            ) : isAuthConfigured ? (
              <div className="border-t border-border pt-4 mt-2 flex flex-col gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/handler/sign-in" onClick={() => setMobileMenuOpen(false)}>
                    {tHeader("signIn")}
                  </Link>
                </Button>
                <Button size="sm" className="bg-cpCoral hover:bg-cpCoral/90" asChild>
                  <Link href="/handler/sign-up" onClick={() => setMobileMenuOpen(false)}>
                    {tHeader("signUp")}
                  </Link>
                </Button>
              </div>
            ) : null}

            {/* Mobile CTA */}
            {!user && (
              <div className="border-t border-border pt-4 mt-2">
                <Button size="sm" className="bg-cpCoral hover:bg-cpCoral/90 w-full" asChild>
                  <Link href={`/${locale}/for-businesses`} onClick={() => setMobileMenuOpen(false)}>
                    {t("listYourBusiness")}
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
