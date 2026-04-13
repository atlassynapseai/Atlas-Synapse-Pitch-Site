"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  Cell,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DollarSign, TrendingUp } from "lucide-react";

import { roiSummary, agentROI, monthlySavingsTrend } from "@/data/roi";
import { useFakeLoading } from "@/hooks/use-fake-loading";
import { CountUp } from "@/components/dashboard/count-up";

import { Badge } from "@/components/ui/badge";
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

const PIE_COLORS = ["#2E75B6", "#1A3A5C", "#6A1B9A", "#2E7D32", "#E65100"];

export default function RoiPage() {
  const ready = useFakeLoading(420);

  const costPieData = agentROI.map((a) => ({
    name: a.agentName,
    value: a.agentCostUsd,
  }));

  if (!ready) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-52" />
        <div className="grid gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[#1A3A5C] dark:text-slate-50">
          Savings & ROI
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          What your AI agents cost to run versus what they save.
        </p>
      </div>

      {/* Headline card */}
      <Card className="border-[#2E7D32]/30 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/20">
        <CardContent className="flex flex-col items-start gap-2 p-6 md:flex-row md:items-center md:gap-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2E7D32]/10">
            <DollarSign className="h-6 w-6 text-[#2E7D32]" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Your AI agents saved this month
            </p>
            <p className="text-3xl font-semibold text-[#1A3A5C] dark:text-white">
              $<CountUp value={roiSummary.netSavingsMonthlyUsd} decimals={0} />
            </p>
          </div>
          <Badge variant="success" className="text-sm">
            +{roiSummary.roiPct}% ROI
          </Badge>
        </CardContent>
      </Card>

      {/* Summary row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-slate-200/80 dark:border-slate-800">
          <CardContent className="p-5">
            <p className="text-xs font-medium text-slate-500">Baseline workload cost</p>
            <p className="mt-1 text-2xl font-semibold text-[#1A3A5C] dark:text-white">
              ${roiSummary.baselineMonthlyUsd.toLocaleString()}/mo
            </p>
            <p className="mt-1 text-xs text-slate-500">What these tasks cost before AI</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200/80 dark:border-slate-800">
          <CardContent className="p-5">
            <p className="text-xs font-medium text-slate-500">Current agent cost</p>
            <p className="mt-1 text-2xl font-semibold text-[#1A3A5C] dark:text-white">
              ${roiSummary.agentCostMonthlyUsd.toLocaleString()}/mo
            </p>
            <p className="mt-1 text-xs text-slate-500">Total spend running all agents</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200/80 dark:border-slate-800">
          <CardContent className="p-5">
            <p className="text-xs font-medium text-slate-500">Net savings</p>
            <p className="mt-1 text-2xl font-semibold text-[#2E7D32]">
              ${roiSummary.netSavingsMonthlyUsd.toLocaleString()}/mo
            </p>
            <p className="mt-1 text-xs text-slate-500">Baseline minus agent cost</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200/80 dark:border-slate-800">
          <CardContent className="p-5">
            <p className="text-xs font-medium text-slate-500">ROI</p>
            <p className="mt-1 text-2xl font-semibold text-[#2E7D32]">
              +{roiSummary.roiPct}%
            </p>
            <p className="mt-1 text-xs text-slate-500">Return vs agent spend</p>
          </CardContent>
        </Card>
      </div>

      {/* Per-agent P&L */}
      <Card className="border-slate-200/80 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-base">Per-agent profit & loss</CardTitle>
        </CardHeader>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Agent</TableHead>
                <TableHead className="text-right">Task cost before AI</TableHead>
                <TableHead className="text-right">Agent cost</TableHead>
                <TableHead className="text-right">Error cost</TableHead>
                <TableHead className="text-right">Net savings</TableHead>
                <TableHead className="text-right">ROI</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agentROI.map((r) => (
                <TableRow key={r.agentId}>
                  <TableCell className="font-medium">{r.agentName}</TableCell>
                  <TableCell className="text-right">
                    ${r.baselineCostUsd.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    ${r.agentCostUsd.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-[#E65100]">
                    ${r.errorCostUsd.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-[#2E7D32]">
                    ${r.netSavingsUsd.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="success">+{r.roiPct}%</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-slate-200/80 dark:border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Monthly savings trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlySavingsTrend}
                  margin={{ top: 8, right: 8, left: -8, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-slate-200 dark:stroke-slate-800"
                  />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${Number(v) / 1000}k`} />
                  <RTooltip formatter={(v) => `$${Number(v).toLocaleString()}`} />
                  <Bar
                    dataKey="savings"
                    name="Net savings"
                    fill="#2E7D32"
                    radius={[4, 4, 0, 0]}
                    animationDuration={800}
                  />
                  <Bar
                    dataKey="agentCost"
                    name="Agent cost"
                    fill="#E65100"
                    radius={[4, 4, 0, 0]}
                    animationDuration={800}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 dark:border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Cost per agent (share of total)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-56 items-center gap-4">
              <ResponsiveContainer width="50%" height="100%">
                <PieChart>
                  <Pie
                    data={costPieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={2}
                    animationDuration={800}
                  >
                    {costPieData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <RTooltip formatter={(v) => `$${v}`} />
                </PieChart>
              </ResponsiveContainer>
              <ul className="space-y-2 text-xs">
                {costPieData.map((d, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-sm"
                      style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
                    />
                    <span className="text-slate-700 dark:text-slate-300">{d.name}</span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                      ${d.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
