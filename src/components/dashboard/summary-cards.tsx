"use client";

import { ArrowDownRight, ArrowUpRight, DollarSign, ShieldAlert, Users } from "lucide-react";
import { DASHBOARD_SUMMARY } from "@/data/agents";
import type { AgentDefinition } from "@/data/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CountUp } from "./count-up";

function derived(agents: AgentDefinition[]) {
  if (agents.length === 0) {
    return { avg: 0, incidents: 0, critical: 0, warning: 0 };
  }
  const avg = agents.reduce((a, x) => a + x.accuracyPct, 0) / agents.length;
  const incidents = agents.reduce((a, x) => a + x.failuresLast7d, 0);
  const crRatio =
    DASHBOARD_SUMMARY.incidentsThisWeek > 0
      ? DASHBOARD_SUMMARY.incidentsCritical / DASHBOARD_SUMMARY.incidentsThisWeek
      : 0;
  const critical = Math.min(incidents, Math.round(incidents * crRatio));
  const warning = Math.max(0, incidents - critical);
  return { avg, incidents, critical, warning };
}

export function SummaryCards({ agents, loading }: { agents: AgentDefinition[]; loading: boolean }) {
  const d = derived(agents);
  const delta = DASHBOARD_SUMMARY.overallAccuracyDeltaVsLastWeek;
  const DeltaIcon = delta >= 0 ? ArrowUpRight : ArrowDownRight;

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="border-slate-200/80 dark:border-slate-800">
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20" />
              <Skeleton className="mt-2 h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Card className="border-slate-200/80 dark:border-slate-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Active agents</CardTitle>
          <Users className="h-4 w-4 text-[#2E75B6]" />
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-semibold tracking-tight text-[#1A3A5C] dark:text-slate-50">
              {agents.length}
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-[#2E7D32] dark:bg-emerald-950/40 dark:text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2E7D32]" />
              Active
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">BrightPath workspace</p>
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 dark:border-slate-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Overall accuracy</CardTitle>
          <DeltaIcon className={`h-4 w-4 ${delta >= 0 ? "text-[#2E7D32]" : "text-[#E65100]"}`} />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-semibold tracking-tight text-[#1A3A5C] dark:text-slate-50">
            <CountUp value={d.avg} decimals={1} suffix="%" />
          </div>
          <p className="mt-1 text-xs text-slate-500">
            {delta >= 0 ? "Up" : "Down"} {Math.abs(delta).toFixed(1)} pts vs last week (firm-wide view)
          </p>
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 dark:border-slate-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Incidents this week</CardTitle>
          <ShieldAlert className="h-4 w-4 text-[#E65100]" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-semibold tracking-tight text-[#1A3A5C] dark:text-slate-50">{d.incidents}</div>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge variant="danger">{d.critical} critical</Badge>
            <Badge variant="warning">{d.warning} caution</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 dark:border-slate-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Monthly savings</CardTitle>
          <DollarSign className="h-4 w-4 text-[#2E7D32]" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-semibold tracking-tight text-[#1A3A5C] dark:text-slate-50">
            $<CountUp value={DASHBOARD_SUMMARY.netSavingsMonthlyUsd} decimals={0} />
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span>
              vs ${DASHBOARD_SUMMARY.baselineMonthlyUsd.toLocaleString()} baseline workload cost
            </span>
            <Badge variant="success">+{DASHBOARD_SUMMARY.roiVsBaselinePct}% vs baseline</Badge>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Agent spend this month: ${DASHBOARD_SUMMARY.agentCostMonthlyUsd.toLocaleString()}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
