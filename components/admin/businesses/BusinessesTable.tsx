"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Loader2,
  Eye,
  MoreHorizontal,
  Building2,
  UserCheck,
  Search,
  LayoutDashboard,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Business {
  id: number;
  userId: number;
  name: string;
  contactEmail: string | null;
  contactPhone: string | null;
  status: string;
  plan: string;
  billingStatus: string;
  leadPriceCents: number | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  ownerEmail: string | null;
  ownerName: string | null;
  placesCount: number;
  leadsCount: number;
  leadsLast30Days: number;
}

interface BusinessesTableProps {
  initialBusinesses: Business[];
  initialTotal: number;
}

export function BusinessesTable({
  initialBusinesses,
  initialTotal,
}: BusinessesTableProps) {
  const router = useRouter();
  const [businesses, setBusinesses] = useState(initialBusinesses);
  const [total, setTotal] = useState(initialTotal);
  const [isLoading, setIsLoading] = useState(false);

  // Filters
  const [filters, setFilters] = useState({
    status: "",
    plan: "",
    billingStatus: "",
    search: "",
  });
  const [page, setPage] = useState(0);
  const pageSize = 20;

  // Search debounce
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchInput }));
      setPage(0);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetch businesses with filters
  const fetchBusinesses = async () => {
    setIsLoading(true);

    try {
      const params = new URLSearchParams();
      params.set("limit", pageSize.toString());
      params.set("offset", (page * pageSize).toString());

      if (filters.status) params.set("status", filters.status);
      if (filters.plan) params.set("plan", filters.plan);
      if (filters.billingStatus) params.set("billingStatus", filters.billingStatus);
      if (filters.search) params.set("search", filters.search);

      const res = await fetch(`/api/admin/businesses?${params.toString()}`);

      if (!res.ok) throw new Error("Failed to fetch businesses");

      const data = await res.json();
      setBusinesses(data.businesses);
      setTotal(data.total);
    } catch (error) {
      console.error("Error fetching businesses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinesses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.status, filters.plan, filters.billingStatus, filters.search, page]);

  const handleStatusChange = async (businessId: number, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/businesses/${businessId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "updateStatus", status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update business");

      setBusinesses((prev) =>
        prev.map((b) =>
          b.id === businessId ? { ...b, status: newStatus } : b
        )
      );
      router.refresh();
    } catch (error) {
      console.error("Error updating business:", error);
      alert("Failed to update business status");
    }
  };

  const resetFilters = () => {
    setFilters({ status: "", plan: "", billingStatus: "", search: "" });
    setSearchInput("");
    setPage(0);
  };

  const totalPages = Math.ceil(total / pageSize);

  const statusColors: Record<string, string> = {
    active: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    suspended: "bg-red-100 text-red-700",
  };

  // Plan colors for UPPERCASE keys (FREE, STARTER, PRO, ENTERPRISE)
  const planColors: Record<string, string> = {
    FREE: "bg-slate-100 text-slate-600",
    STARTER: "bg-cpCoral/20 text-cpCoral",
    PRO: "bg-cpAqua/20 text-cpAqua",
    ENTERPRISE: "bg-cpYellow/20 text-cpYellow",
  };

  // Format plan key to display name
  const formatPlanName = (planKey: string): string => {
    const planNames: Record<string, string> = {
      FREE: "Starter",
      STARTER: "Starter",
      PRO: "Pro",
      ENTERPRISE: "Enterprise",
    };
    return planNames[planKey] || planKey;
  };

  // Billing/Plan status colors for UPPERCASE keys (TRIAL, ACTIVE, EXPIRED, CANCELLED)
  const billingColors: Record<string, string> = {
    TRIAL: "bg-slate-100 text-slate-600",
    ACTIVE: "bg-green-100 text-green-700",
    EXPIRED: "bg-orange-100 text-orange-700",
    CANCELLED: "bg-red-100 text-red-700",
    // Legacy lowercase keys (for backwards compatibility)
    trial: "bg-slate-100 text-slate-600",
    paid: "bg-green-100 text-green-700",
    overdue: "bg-orange-100 text-orange-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="relative w-[250px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select
          value={filters.status || "all"}
          onValueChange={(value) => {
            setFilters((prev) => ({ ...prev, status: value === "all" ? "" : value }));
            setPage(0);
          }}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.plan || "all"}
          onValueChange={(value) => {
            setFilters((prev) => ({ ...prev, plan: value === "all" ? "" : value }));
            setPage(0);
          }}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Plans" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Plans</SelectItem>
            <SelectItem value="FREE">Starter</SelectItem>
            <SelectItem value="PRO">Pro</SelectItem>
            <SelectItem value="ENTERPRISE">Enterprise</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.billingStatus || "all"}
          onValueChange={(value) => {
            setFilters((prev) => ({ ...prev, billingStatus: value === "all" ? "" : value }));
            setPage(0);
          }}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Plan Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="TRIAL">Trial</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="EXPIRED">Expired</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="sm" onClick={resetFilters}>
          Reset
        </Button>

        <p className="text-sm text-muted-foreground ml-auto">
          {total} businesses
        </p>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : businesses.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">
          No businesses found matching your filters.
        </p>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Business</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Listings</TableHead>
                <TableHead>Leads</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Billing</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {businesses.map((business) => (
                <TableRow key={business.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded bg-slate-100">
                        <Building2 className="h-4 w-4 text-slate-600" />
                      </div>
                      <div>
                        <div className="font-medium">{business.name}</div>
                        {business.contactEmail && (
                          <div className="text-xs text-muted-foreground">
                            {business.contactEmail}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{business.ownerEmail || "-"}</div>
                    {business.ownerName && (
                      <div className="text-xs text-muted-foreground">
                        {business.ownerName}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-slate-100">
                      {business.placesCount}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <Badge
                        variant="secondary"
                        className={
                          business.leadsCount > 0
                            ? "bg-cpCoral/20 text-cpCoral border-0"
                            : "bg-slate-100"
                        }
                      >
                        {business.leadsCount} total
                      </Badge>
                      {business.leadsLast30Days > 0 && (
                        <span className="text-xs text-muted-foreground">
                          {business.leadsLast30Days} last 30d
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={planColors[business.plan] || "bg-slate-100"}
                    >
                      {formatPlanName(business.plan)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        billingColors[business.billingStatus] || "bg-slate-100"
                      }
                    >
                      {business.billingStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={statusColors[business.status] || "bg-slate-100"}
                    >
                      {business.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/en/admin/businesses/${business.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/en/dashboard/business/${business.id}`}>
                            <LayoutDashboard className="h-4 w-4 mr-2" />
                            Open Dashboard
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/en/admin/businesses/${business.id}?impersonate=true`}
                          >
                            <UserCheck className="h-4 w-4 mr-2" />
                            Impersonate
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {business.status !== "active" && (
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(business.id, "active")
                            }
                          >
                            Set Active
                          </DropdownMenuItem>
                        )}
                        {business.status !== "suspended" && (
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() =>
                              handleStatusChange(business.id, "suspended")
                            }
                          >
                            Suspend
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Page {page + 1} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={page >= totalPages - 1}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
