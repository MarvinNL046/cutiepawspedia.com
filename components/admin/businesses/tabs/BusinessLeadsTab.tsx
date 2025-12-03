"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Mail, Phone, MessageSquare, Calendar, Search } from "lucide-react";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  source: string | null;
  placeName: string | null;
  placeId: number;
  createdAt: Date;
}

interface BusinessLeadsTabProps {
  businessId: number;
  initialLeads: Lead[];
  initialTotal: number;
}

export function BusinessLeadsTab({
  businessId,
  initialLeads,
  initialTotal,
}: BusinessLeadsTabProps) {
  const [leads, setLeads] = useState(initialLeads);
  const [total, setTotal] = useState(initialTotal);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("all");
  const pageSize = 10;

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        limit: pageSize.toString(),
        offset: (page * pageSize).toString(),
      });

      if (searchQuery) params.set("search", searchQuery);
      if (dateRange !== "all") {
        const now = new Date();
        let fromDate: Date;
        switch (dateRange) {
          case "7d":
            fromDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            break;
          case "30d":
            fromDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            break;
          case "90d":
            fromDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
            break;
          default:
            fromDate = new Date(0);
        }
        params.set("from", fromDate.toISOString());
      }

      const res = await fetch(`/api/admin/businesses/${businessId}/leads?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch leads");

      const data = await res.json();
      setLeads(data.leads);
      setTotal(data.total);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLeads();
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchQuery, dateRange]);

  const totalPages = Math.ceil(total / pageSize);

  const formatDate = (date: Date) => {
    const now = new Date();
    const leadDate = new Date(date);
    const diff = now.getTime() - leadDate.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;

    return leadDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: leadDate.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Leads</CardTitle>
        <CardDescription>
          {total} lead{total !== 1 ? "s" : ""} received for this business
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center mb-4">
          <div className="relative w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(0);
              }}
              className="pl-9"
            />
          </div>

          <Select
            value={dateRange}
            onValueChange={(value) => {
              setDateRange(value);
              setPage(0);
            }}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>

          <p className="text-sm text-muted-foreground ml-auto">
            {total} lead{total !== 1 ? "s" : ""}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No leads found.</p>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contact</TableHead>
                  <TableHead>Listing</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{lead.name}</div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          <a href={`mailto:${lead.email}`} className="hover:text-cpAqua">
                            {lead.email}
                          </a>
                        </div>
                        {lead.phone && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            <a href={`tel:${lead.phone}`} className="hover:text-cpAqua">
                              {lead.phone}
                            </a>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{lead.placeName || "—"}</span>
                    </TableCell>
                    <TableCell>
                      {lead.message ? (
                        <p className="text-sm text-muted-foreground line-clamp-2 max-w-[300px]">
                          {lead.message}
                        </p>
                      ) : (
                        <span className="text-muted-foreground text-sm">No message</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {lead.source ? (
                        <Badge variant="outline" className="text-xs">
                          {lead.source}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(lead.createdAt)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
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
      </CardContent>
    </Card>
  );
}
