"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { Bot, CalendarClock, Scale, Search, Wallet } from "lucide-react";
import type { AgentDefinition } from "@/data/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { AccuracySparkline } from "./accuracy-sparkline";

const icons: Record<string, typeof Bot> = {
  "client-intake-bot": Bot,
  "document-reviewer": Scale,
  "scheduling-assistant": CalendarClock,
  "legal-research-agent": Search,
  "billing-follow-up-bot": Wallet,
};

function accuracyTone(pct: number) {
  if (pct > 90) return "text-[#2E7D32]";
  if (pct >= 80) return "text-[#E65100]";
  return "text-[#C62828]";
}

export function AgentOverviewTable({ agents, loading }: { agents: AgentDefinition[]; loading: boolean }) {
  const router = useRouter();
  /** Client-only anchor — `Date.now` runs in an effect, not during render (react-hooks/purity). */
  const [nowMs, setNowMs] = React.useState<number | null>(null);
  React.useLayoutEffect(() => {
    setNowMs(Date.now());
  }, []);
  if (loading) {
    return (
      <Card className="border-slate-200/80 p-4 dark:border-slate-800">
        <Skeleton className="mb-4 h-6 w-40" />
        <Skeleton className="h-48 w-full" />
      </Card>
    );
  }

  return (
    <>
      <Card className="hidden border-slate-200/80 dark:border-slate-800 md:block">
        <div className="border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <h2 className="text-base font-semibold text-[#1A3A5C] dark:text-slate-100">Agents</h2>
          <p className="text-sm text-slate-500">Click a row for detail, history, and charts.</p>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Agent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Accuracy</TableHead>
              <TableHead>Failures (7d)</TableHead>
              <TableHead>Cost (mo)</TableHead>
              <TableHead>Last active</TableHead>
              <TableHead className="text-right">7-day accuracy</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agents.map((a) => {
              const Icon = icons[a.id] ?? Bot;
              const last =
                nowMs === null
                  ? "…"
                  : formatDistanceToNow(new Date(nowMs - a.lastActiveMinutesAgo * 60 * 1000), {
                      addSuffix: true,
                    });
              return (
                <TableRow
                  key={a.id}
                  className="cursor-pointer"
                  onClick={() => router.push(`/dashboard/agents/${a.id}`)}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-900">
                        <Icon className="h-4 w-4 text-[#2E75B6]" />
                      </span>
                      <span className="font-medium text-slate-900 dark:text-slate-50">{a.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1.5 text-sm text-[#2E7D32]">
                      <span className="h-2 w-2 rounded-full bg-[#2E7D32]" />
                      Active
                    </span>
                  </TableCell>
                  <TableCell className={cn("font-semibold", accuracyTone(a.accuracyPct))}>
                    {a.accuracyPct.toFixed(1)}%
                  </TableCell>
                  <TableCell>{a.failuresLast7d}</TableCell>
                  <TableCell>${a.monthlyCostUsd.toLocaleString()}</TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-300">{last}</TableCell>
                  <TableCell className="text-right">
                    <AccuracySparkline values={a.accuracyTrend7d} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      <div className="space-y-3 md:hidden">
        <h2 className="text-base font-semibold text-[#1A3A5C] dark:text-slate-100">Agents</h2>
        {agents.map((a) => {
          const Icon = icons[a.id] ?? Bot;
          const last =
            nowMs === null
              ? "…"
              : formatDistanceToNow(new Date(nowMs - a.lastActiveMinutesAgo * 60 * 1000), {
                  addSuffix: true,
                });
          return (
            <Link key={a.id} href={`/dashboard/agents/${a.id}`}>
              <Card className="border-slate-200/80 p-4 dark:border-slate-800">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-900">
                      <Icon className="h-4 w-4 text-[#2E75B6]" />
                    </span>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-slate-50">{a.name}</p>
                      <p className="text-xs text-slate-500">Last active {last}</p>
                    </div>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-slate-500">Accuracy</p>
                    <p className={cn("font-semibold", accuracyTone(a.accuracyPct))}>{a.accuracyPct.toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Failures (7d)</p>
                    <p className="font-semibold">{a.failuresLast7d}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Cost (mo)</p>
                    <p className="font-semibold">${a.monthlyCostUsd.toLocaleString()}</p>
                  </div>
                  <div className="flex items-end justify-end">
                    <AccuracySparkline values={a.accuracyTrend7d} />
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
}
