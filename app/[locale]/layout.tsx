import { Header, Footer } from "@/components/layout";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  return (
    <div className="flex min-h-screen flex-col">
      <Header locale={locale} variant="directory" />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
