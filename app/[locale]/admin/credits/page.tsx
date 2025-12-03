import { Metadata } from "next";
import { requireAdmin } from "@/lib/auth/admin";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Coins, Building2, TrendingUp, TrendingDown } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { db } from "@/db";
import { businesses, creditTransactions } from "@/db/schema";
import { desc, sql, eq } from "drizzle-orm";
import { AdminCreditAdjustmentForm } from "./AdminCreditAdjustmentForm";

export const metadata: Metadata = {
  title: "Credits Management | Admin",
  description: "Manage business credits and transactions",
};

interface CreditsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}

async function getCreditsOverview() {
  if (!db) {
    return {
      totalCreditsInSystem: 0,
      totalBusinessesWithCredits: 0,
      recentTransactions: [],
      topBusinesses: [],
    };
  }

  const [totalResult, businessesWithCredits, recentTx, topBiz] = await Promise.all([
    // Total credits in system
    db
      .select({
        total: sql<number>`COALESCE(SUM(${businesses.creditBalanceCents}), 0)`,
      })
      .from(businesses),

    // Businesses with credits > 0
    db
      .select({ count: sql<number>`COUNT(*)` })
      .from(businesses)
      .where(sql`${businesses.creditBalanceCents} > 0`),

    // Recent transactions (last 20)
    db
      .select({
        id: creditTransactions.id,
        businessId: creditTransactions.businessId,
        amountCents: creditTransactions.amountCents,
        type: creditTransactions.type,
        description: creditTransactions.description,
        balanceAfterCents: creditTransactions.balanceAfterCents,
        createdAt: creditTransactions.createdAt,
        businessName: businesses.name,
      })
      .from(creditTransactions)
      .leftJoin(businesses, eq(creditTransactions.businessId, businesses.id))
      .orderBy(desc(creditTransactions.createdAt))
      .limit(20),

    // Top 10 businesses by credit balance
    db
      .select({
        id: businesses.id,
        name: businesses.name,
        creditBalanceCents: businesses.creditBalanceCents,
        status: businesses.status,
      })
      .from(businesses)
      .where(sql`${businesses.creditBalanceCents} > 0`)
      .orderBy(desc(businesses.creditBalanceCents))
      .limit(10),
  ]);

  return {
    totalCreditsInSystem: totalResult[0]?.total ?? 0,
    totalBusinessesWithCredits: Number(businessesWithCredits[0]?.count ?? 0),
    recentTransactions: recentTx,
    topBusinesses: topBiz,
  };
}

function getTransactionBadge(type: string, amount: number) {
  if (type === "purchase") {
    return (
      <Badge className="bg-green-100 text-green-700 border-green-200">
        <TrendingUp className="w-3 h-3 mr-1" />
        Purchase
      </Badge>
    );
  }
  if (type === "lead_charge") {
    return (
      <Badge className="bg-red-100 text-red-700 border-red-200">
        <TrendingDown className="w-3 h-3 mr-1" />
        Lead Charge
      </Badge>
    );
  }
  if (type === "refund") {
    return (
      <Badge className="bg-blue-100 text-blue-700 border-blue-200">
        Refund
      </Badge>
    );
  }
  if (type === "bonus") {
    return (
      <Badge className="bg-purple-100 text-purple-700 border-purple-200">
        Bonus
      </Badge>
    );
  }
  if (type === "premium_subscription") {
    return (
      <Badge className="bg-amber-100 text-amber-700 border-amber-200">
        Premium
      </Badge>
    );
  }
  return <Badge variant="outline">{type}</Badge>;
}

export default async function CreditsPage({ params }: CreditsPageProps) {
  const { locale } = await params;
  const user = await requireAdmin(locale);

  const data = await getCreditsOverview();

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader
        title="Credits Management"
        description="Monitor and manage business credit balances"
        user={user}
        locale={locale}
      />

      <main className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Credits in System</CardDescription>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Coins className="h-5 w-5 text-cpAqua" />
                €{(data.totalCreditsInSystem / 100).toFixed(2)}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Businesses with Credits</CardDescription>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Building2 className="h-5 w-5 text-cpPink" />
                {data.totalBusinessesWithCredits}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Recent Transactions</CardDescription>
              <CardTitle className="text-2xl">
                {data.recentTransactions.length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Manual Credit Adjustment */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-cpAqua" />
                Manual Adjustment
              </CardTitle>
              <CardDescription>
                Add or remove credits from a business account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminCreditAdjustmentForm locale={locale} />
            </CardContent>
          </Card>

          {/* Top Businesses by Credits */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Top Businesses by Credits</CardTitle>
              <CardDescription>
                Businesses with the highest credit balances
              </CardDescription>
            </CardHeader>
            <CardContent>
              {data.topBusinesses.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <Coins className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No businesses with credits</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Business</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.topBusinesses.map((biz) => (
                      <TableRow key={biz.id}>
                        <TableCell>
                          <div className="font-medium">{biz.name}</div>
                          <div className="text-xs text-slate-500">ID: #{biz.id}</div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              biz.status === "active"
                                ? "bg-green-50 text-green-700"
                                : "bg-slate-50"
                            }
                          >
                            {biz.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-mono font-medium">
                          €{((biz.creditBalanceCents ?? 0) / 100).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              Latest credit transactions across all businesses
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.recentTransactions.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <Coins className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No transactions yet</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Business</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Balance After</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.recentTransactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell className="font-mono text-xs">#{tx.id}</TableCell>
                      <TableCell>
                        <div className="font-medium">{tx.businessName || "Unknown"}</div>
                        <div className="text-xs text-slate-500">ID: #{tx.businessId}</div>
                      </TableCell>
                      <TableCell>{getTransactionBadge(tx.type, tx.amountCents)}</TableCell>
                      <TableCell className="max-w-[200px] truncate text-sm text-slate-600">
                        {tx.description || "-"}
                      </TableCell>
                      <TableCell
                        className={`text-right font-mono font-medium ${
                          tx.amountCents >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {tx.amountCents >= 0 ? "+" : ""}€{(tx.amountCents / 100).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        €{(tx.balanceAfterCents / 100).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-sm text-slate-500">
                        {formatDistanceToNow(new Date(tx.createdAt), {
                          addSuffix: true,
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
