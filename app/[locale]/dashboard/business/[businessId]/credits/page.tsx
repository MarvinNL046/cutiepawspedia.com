/**
 * Credits Overview Page - Balance, stats, and transaction history
 */

import { notFound } from "next/navigation";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId, getBusinessByIdForUser, getCreditBalance, getCreditStats } from "@/db/queries";
import { getBusinessById } from "@/db/queries/businesses";
import { getTransactionHistory } from "@/db/queries/credits";
import { DashboardHeader } from "@/components/dashboard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CreditCard,
  TrendingDown,
  MessageSquare,
  Calculator,
  Info,
  ArrowUpCircle,
  ArrowDownCircle,
  Gift,
  RefreshCw,
  Crown,
  Calendar,
} from "lucide-react";

interface CreditsPageProps {
  params: Promise<{ locale: string; businessId: string }>;
}

export default async function CreditsPage({ params }: CreditsPageProps) {
  const { locale, businessId } = await params;
  const businessIdNum = parseInt(businessId, 10);

  // Get current user
  const stackUser = await stackServerApp?.getUser();
  if (!stackUser) return null;

  const dbUser = await getUserByStackAuthId(stackUser.id);
  if (!dbUser) return null;

  // Get business with ownership check (admin bypass)
  let business;
  if (dbUser.role === "admin") {
    business = await getBusinessById(businessIdNum);
  } else {
    business = await getBusinessByIdForUser({ businessId: businessIdNum, userId: dbUser.id });
  }

  if (!business) notFound();

  // Get credit data
  const [balance, stats, { transactions, total: transactionCount }] = await Promise.all([
    getCreditBalance(businessIdNum),
    getCreditStats(businessIdNum, 30),
    getTransactionHistory(businessIdNum, { limit: 20 }),
  ]);

  const labels = {
    en: {
      title: "Credits",
      description: "Your credit balance and transaction history",
      currentBalance: "Current Balance",
      availableCredits: "Available credits",
      spentLast30Days: "Spent (30 days)",
      leadsCharged: "Leads Charged",
      avgCostPerLead: "Avg. Cost/Lead",
      transactionHistory: "Transaction History",
      noTransactions: "No transactions yet",
      noTransactionsDesc: "When you purchase credits or receive leads, your transactions will appear here.",
      date: "Date",
      type: "Type",
      description_col: "Description",
      amount: "Amount",
      balance: "Balance",
      stripeComingSoon: "Stripe Integration Coming Soon",
      stripeComingSoonDesc: "In the next phase, you'll be able to purchase credits directly via Stripe. Stay tuned!",
      typeLabels: {
        purchase: "Purchase",
        lead_charge: "Lead Charge",
        refund: "Refund",
        bonus: "Bonus",
        premium_subscription: "Premium",
      },
    },
    nl: {
      title: "Credits",
      description: "Je creditsaldo en transactiegeschiedenis",
      currentBalance: "Huidig Saldo",
      availableCredits: "Beschikbare credits",
      spentLast30Days: "Uitgegeven (30 dagen)",
      leadsCharged: "Leads Gefactureerd",
      avgCostPerLead: "Gem. Kosten/Lead",
      transactionHistory: "Transactiegeschiedenis",
      noTransactions: "Nog geen transacties",
      noTransactionsDesc: "Wanneer je credits koopt of leads ontvangt, verschijnen je transacties hier.",
      date: "Datum",
      type: "Type",
      description_col: "Beschrijving",
      amount: "Bedrag",
      balance: "Saldo",
      stripeComingSoon: "Stripe Integratie Binnenkort",
      stripeComingSoonDesc: "In de volgende fase kun je credits rechtstreeks via Stripe kopen. Blijf op de hoogte!",
      typeLabels: {
        purchase: "Aankoop",
        lead_charge: "Lead Kosten",
        refund: "Terugbetaling",
        bonus: "Bonus",
        premium_subscription: "Premium",
      },
    },
    de: {
      title: "Guthaben",
      description: "Ihr Guthaben und Transaktionsverlauf",
      currentBalance: "Aktuelles Guthaben",
      availableCredits: "Verfügbare Credits",
      spentLast30Days: "Ausgegeben (30 Tage)",
      leadsCharged: "Berechnete Leads",
      avgCostPerLead: "Durchschn. Kosten/Lead",
      transactionHistory: "Transaktionsverlauf",
      noTransactions: "Noch keine Transaktionen",
      noTransactionsDesc: "Wenn Sie Credits kaufen oder Leads erhalten, erscheinen Ihre Transaktionen hier.",
      date: "Datum",
      type: "Typ",
      description_col: "Beschreibung",
      amount: "Betrag",
      balance: "Guthaben",
      stripeComingSoon: "Stripe Integration kommt bald",
      stripeComingSoonDesc: "In der nächsten Phase können Sie Credits direkt über Stripe kaufen. Bleiben Sie dran!",
      typeLabels: {
        purchase: "Kauf",
        lead_charge: "Lead Gebühr",
        refund: "Erstattung",
        bonus: "Bonus",
        premium_subscription: "Premium",
      },
    },
    fr: {
      title: "Crédits",
      description: "Votre solde et historique des transactions",
      currentBalance: "Solde Actuel",
      availableCredits: "Crédits disponibles",
      spentLast30Days: "Dépensé (30 jours)",
      leadsCharged: "Prospects Facturés",
      avgCostPerLead: "Coût Moy./Prospect",
      transactionHistory: "Historique des Transactions",
      noTransactions: "Pas encore de transactions",
      noTransactionsDesc: "Lorsque vous achetez des crédits ou recevez des prospects, vos transactions apparaîtront ici.",
      date: "Date",
      type: "Type",
      description_col: "Description",
      amount: "Montant",
      balance: "Solde",
      stripeComingSoon: "Intégration Stripe bientôt disponible",
      stripeComingSoonDesc: "Dans la prochaine phase, vous pourrez acheter des crédits directement via Stripe. Restez connecté !",
      typeLabels: {
        purchase: "Achat",
        lead_charge: "Frais Prospect",
        refund: "Remboursement",
        bonus: "Bonus",
        premium_subscription: "Premium",
      },
    },
  };

  const t = labels[locale as keyof typeof labels] || labels.en;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "purchase":
        return <ArrowUpCircle className="h-4 w-4 text-green-500" />;
      case "lead_charge":
        return <ArrowDownCircle className="h-4 w-4 text-red-500" />;
      case "refund":
        return <RefreshCw className="h-4 w-4 text-blue-500" />;
      case "bonus":
        return <Gift className="h-4 w-4 text-cpCoral" />;
      case "premium_subscription":
        return <Crown className="h-4 w-4 text-cpYellow" />;
      default:
        return <CreditCard className="h-4 w-4 text-slate-500" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const label = t.typeLabels[type as keyof typeof t.typeLabels] || type;
    switch (type) {
      case "purchase":
        return <Badge className="bg-green-100 text-green-700 border-green-300">{label}</Badge>;
      case "lead_charge":
        return <Badge className="bg-red-100 text-red-600 border-red-300">{label}</Badge>;
      case "refund":
        return <Badge className="bg-blue-100 text-blue-600 border-blue-300">{label}</Badge>;
      case "bonus":
        return <Badge className="bg-cpCoral/20 text-cpCoral border-cpCoral">{label}</Badge>;
      case "premium_subscription":
        return <Badge className="bg-cpYellow/20 text-cpYellow border-cpYellow">{label}</Badge>;
      default:
        return <Badge variant="secondary">{label}</Badge>;
    }
  };

  const formatCurrency = (cents: number) => {
    const dollars = cents / 100;
    return new Intl.NumberFormat(locale === "nl" ? "nl-NL" : locale === "de" ? "de-DE" : "en-US", {
      style: "currency",
      currency: "EUR",
    }).format(dollars);
  };

  return (
    <>
      <DashboardHeader
        title={t.title}
        description={t.description}
        businessId={businessIdNum}
        locale={locale}
      />

      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Stripe Coming Soon Alert */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>{t.stripeComingSoon}</AlertTitle>
          <AlertDescription>{t.stripeComingSoonDesc}</AlertDescription>
        </Alert>

        {/* Balance and Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Current Balance - Large */}
          <Card className="lg:col-span-2 bg-gradient-to-br from-cpCoral/10 to-cpAqua/10 border-cpCoral/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {t.currentBalance}
              </CardTitle>
              <CreditCard className="h-5 w-5 text-cpCoral" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-cpDark">
                {formatCurrency(balance.balanceCents)}
              </div>
              <p className="text-sm text-slate-500 mt-1">{t.availableCredits}</p>
            </CardContent>
          </Card>

          {/* Spent Last 30 Days */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {t.spentLast30Days}
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cpDark">
                {formatCurrency(stats.spentLast30Days)}
              </div>
            </CardContent>
          </Card>

          {/* Leads Charged */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {t.leadsCharged}
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-cpCoral" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cpDark">{stats.leadsCharged}</div>
              <p className="text-xs text-slate-500">
                {t.avgCostPerLead}: {formatCurrency(stats.avgCostPerLead)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-cpAqua" />
              {t.transactionHistory}
            </CardTitle>
            <CardDescription>
              {transactionCount > 0
                ? `${transactionCount} ${locale === "nl" ? "transacties" : locale === "de" ? "Transaktionen" : "transactions"}`
                : t.noTransactions}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cpYellow/10 mb-4">
                  <CreditCard className="h-8 w-8 text-cpYellow" />
                </div>
                <h3 className="text-lg font-semibold text-cpDark mb-2">{t.noTransactions}</h3>
                <p className="text-slate-600">{t.noTransactionsDesc}</p>
              </div>
            ) : (
              <>
                {/* Mobile Card Layout */}
                <div className="md:hidden space-y-3">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="border rounded-lg p-3 space-y-2">
                      {/* Header: Type + Amount */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(tx.type)}
                          {getTypeBadge(tx.type)}
                        </div>
                        <span
                          className={`font-medium ${
                            tx.amountCents >= 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {tx.amountCents >= 0 ? "+" : ""}
                          {formatCurrency(tx.amountCents)}
                        </span>
                      </div>

                      {/* Description */}
                      {(tx.description || tx.placeName) && (
                        <div className="text-sm">
                          <span className="text-slate-600">{tx.description || "-"}</span>
                          {tx.placeName && (
                            <span className="text-slate-400 ml-1">· {tx.placeName}</span>
                          )}
                        </div>
                      )}

                      {/* Footer: Date + Balance */}
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(tx.createdAt).toLocaleDateString(locale, {
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        <span>{t.balance}: {formatCurrency(tx.balanceAfterCents)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Table Layout */}
                <div className="hidden md:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t.date}</TableHead>
                        <TableHead>{t.type}</TableHead>
                        <TableHead>{t.description_col}</TableHead>
                        <TableHead className="text-right">{t.amount}</TableHead>
                        <TableHead className="text-right">{t.balance}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((tx) => (
                        <TableRow key={tx.id}>
                          <TableCell>
                            <div className="flex items-center gap-1 text-sm text-slate-600">
                              <Calendar className="h-3 w-3" />
                              {new Date(tx.createdAt).toLocaleDateString(locale, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getTypeIcon(tx.type)}
                              {getTypeBadge(tx.type)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-slate-600">
                              {tx.description || "-"}
                            </span>
                            {tx.placeName && (
                              <div className="text-xs text-slate-400">{tx.placeName}</div>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <span
                              className={`font-medium ${
                                tx.amountCents >= 0 ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {tx.amountCents >= 0 ? "+" : ""}
                              {formatCurrency(tx.amountCents)}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <span className="text-slate-600">
                              {formatCurrency(tx.balanceAfterCents)}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
