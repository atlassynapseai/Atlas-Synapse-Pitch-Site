"use client";

import * as React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { toast } from "sonner";
import { CheckCircle2, Filter } from "lucide-react";

import { agentsSeed } from "@/data/agents";
import { allIncidents } from "@/data/traces";
import type { Severity } from "@/data/types";
import { useFakeLoading } from "@/hooks/use-fake-loading";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function IncidentsPage() {
  const ready = useFakeLoading(400);
  const [agentFilter, setAgentFilter] = React.useState("all");
  const [sevFilter, setSevFilter] = React.useState<"all" | Severity>("all");
  const [reviewed, setReviewed] = React.useState<Set<string>>(
    () => new Set(allIncidents.filter((i) => i.status === "reviewed").map((i) => i.id)),
  );

  const filtered = allIncidents.filter((i) => {
    if (agentFilter !== "all" && i.agentId !== agentFilter) return false;
    if (sevFilter !== "all" && i.severity !== sevFilter) return false;
    return true;
  });

  function markAllReviewed() {
    const next = new Set(reviewed);
    for (const i of filtered) next.add(i.id);
    setReviewed(next);
    toast.success(`${filtered.length} incidents marked as reviewed.`);
  }

  if (!ready) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-[#1A3A5C] dark:text-slate-50">
            Incident feed
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            All flagged failures across every agent ({allIncidents.length} total).
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={markAllReviewed}
          className="shrink-0"
        >
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Mark all as reviewed
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-slate-200/80 dark:border-slate-800">
        <CardContent className="flex flex-wrap items-center gap-3 p-4">
          <Filter className="h-4 w-4 text-slate-400" />

          <select
            value={agentFilter}
            onChange={(e) => setAgentFilter(e.target.value)}
            className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-900"
          >
            <option value="all">All agents</option>
            {agentsSeed.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>

          <div className="flex gap-1">
            {(["all", "critical", "warning"] as const).map((s) => (
              <button
                key={s}
                type="button"
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                  sevFilter === s
                    ? "bg-[#1A3A5C] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300",
                )}
                onClick={() => setSevFilter(s)}
              >
                {s === "all" ? "All" : s === "critical" ? "Critical" : "Caution"}
              </button>
            ))}
          </div>

          <span className="ml-auto text-xs text-slate-500">
            {filtered.length} matching
          </span>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-slate-200/80 dark:border-slate-800">
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Time</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead className="min-w-[300px]">Description</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-12 text-center text-sm text-slate-500">
                    No incidents match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((inc) => {
                  const isReviewed = reviewed.has(inc.id);
                  return (
                    <TableRow key={inc.id} className="group">
                      <TableCell className="whitespace-nowrap text-xs text-slate-500">
                        {format(new Date(inc.timestamp), "MMM d, h:mm a")}
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/dashboard/agents/${inc.agentId}`}
                          className="text-sm font-medium text-[#2E75B6] hover:underline"
                        >
                          {inc.agentName}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            inc.severity === "critical" ? "danger" : "warning"
                          }
                        >
                          {inc.severity === "critical" ? "Critical" : "Caution"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/dashboard/agents/${inc.agentId}?trace=${inc.traceId}`}
                          className="line-clamp-2 text-sm text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
                        >
                          {inc.summary}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {isReviewed ? (
                          <Badge variant="default">Reviewed</Badge>
                        ) : (
                          <button
                            type="button"
                            className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                            onClick={() => {
                              const next = new Set(reviewed);
                              next.add(inc.id);
                              setReviewed(next);
                              toast.success("Marked as reviewed.");
                            }}
                          >
                            New: mark reviewed
                          </button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
