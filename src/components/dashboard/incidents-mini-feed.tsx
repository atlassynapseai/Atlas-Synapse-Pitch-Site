"use client";

import Link from "next/link";
import { format } from "date-fns";
import { allIncidents } from "@/data/traces";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function IncidentsMiniFeed({ loading }: { loading: boolean }) {
  const latest = allIncidents.slice(0, 5);

  if (loading) {
    return (
      <Card className="border-slate-200/80 dark:border-slate-800">
        <CardHeader>
          <Skeleton className="h-5 w-40" />
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-slate-200/80 dark:border-slate-800">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base font-semibold text-[#1A3A5C] dark:text-slate-100">Recent incidents</CardTitle>
        <Link href="/dashboard/incidents" className="text-sm font-medium text-[#2E75B6] hover:underline">
          View all
        </Link>
      </CardHeader>
      <CardContent className="space-y-0 px-0">
        {latest.map((inc, idx) => (
          <div key={inc.id}>
            <Link
              href={`/dashboard/agents/${inc.agentId}?trace=${inc.traceId}`}
              className="block px-6 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/60"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs text-slate-500">
                  {format(new Date(inc.timestamp), "MMM d, h:mm a")} · {inc.agentName}
                </p>
                <Badge variant={inc.severity === "critical" ? "danger" : "warning"}>
                  {inc.severity === "critical" ? "Critical" : "Caution"}
                </Badge>
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-slate-800 dark:text-slate-100">{inc.summary}</p>
            </Link>
            {idx < latest.length - 1 && <Separator />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
