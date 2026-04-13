"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Loader2,
  ThumbsDown,
  ThumbsUp,
  Unplug,
} from "lucide-react";

import { getAgentById, agentsSeed } from "@/data/agents";
import { getTracesForAgent, allIncidents } from "@/data/traces";
import type { Trace, Severity } from "@/data/types";
import { useAppStore } from "@/lib/store";
import { useFakeLoading } from "@/hooks/use-fake-loading";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const dynamic = "force-dynamic";

/* ------------------------------------------------------------------ */
/*  Trace Card                                                        */
/* ------------------------------------------------------------------ */

function TraceCard({ trace }: { trace: Trace }) {
  const [expanded, setExpanded] = React.useState(false);
  const [feedback, setFeedback] = React.useState<"up" | "down" | null>(null);

  return (
    <div className="py-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
        <span>{format(new Date(trace.timestamp), "MMM d, yyyy · h:mm a")}</span>
        <Badge
          variant={
            trace.passed ? "success" : trace.severity === "critical" ? "danger" : "warning"
          }
        >
          {trace.passed
            ? "Passed"
            : trace.severity === "critical"
              ? "Failed — Critical"
              : "Failed — Caution"}
        </Badge>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-slate-800 dark:text-slate-100">
        {trace.summary}
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
        <span>Confidence: {trace.evaluationScore.toFixed(2)}</span>
        <span>${trace.costUsd.toFixed(3)}</span>
        {!trace.passed && (
          <span className="text-slate-400">Reason: {trace.failureReason}</span>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-xs transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900"
          onClick={() => setExpanded((p) => !p)}
        >
          {expanded ? (
            <ChevronUp className="h-3 w-3" />
          ) : (
            <ChevronDown className="h-3 w-3" />
          )}
          {expanded ? "Hide raw trace" : "View raw trace"}
        </button>

        {!trace.passed && (
          <span className="ml-auto flex items-center gap-1 text-xs text-slate-500">
            Was this alert correct?
            <button
              type="button"
              className={cn(
                "rounded p-1 transition-colors hover:bg-emerald-50 dark:hover:bg-emerald-950/40",
                feedback === "up" && "bg-emerald-50 text-[#2E7D32] dark:bg-emerald-950/40",
              )}
              onClick={() => {
                setFeedback("up");
                toast.success("Thanks for the feedback.");
              }}
            >
              <ThumbsUp className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              className={cn(
                "rounded p-1 transition-colors hover:bg-red-50 dark:hover:bg-red-950/40",
                feedback === "down" && "bg-red-50 text-[#C62828] dark:bg-red-950/40",
              )}
              onClick={() => {
                setFeedback("down");
                toast.success("Thanks for the feedback.");
              }}
            >
              <ThumbsDown className="h-3.5 w-3.5" />
            </button>
          </span>
        )}
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-4 text-xs text-slate-100">
              {JSON.stringify(trace.raw, null, 2)}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Charts                                                             */
/* ------------------------------------------------------------------ */

const COLORS = ["#C62828", "#6A1B9A", "#E65100", "#2E75B6"];

function PerformanceCharts({
  accuracyTrend,
  volumeByDay,
  costByDayUsd,
  failedTraces,
}: {
  accuracyTrend: number[];
  volumeByDay: number[];
  costByDayUsd: number[];
  failedTraces: Trace[];
}) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const accData = accuracyTrend.map((v, i) => ({ day: days[i], accuracy: v }));
  const volData = volumeByDay.map((v, i) => ({ day: days[i], volume: v }));
  const costData = costByDayUsd.map((v, i) => ({ day: days[i], cost: v }));

  const failureCategories = new Map<string, number>();
  for (const t of failedTraces) {
    const reason = t.failureReason ?? "Other";
    const short = reason.length > 40 ? reason.slice(0, 37) + "…" : reason;
    failureCategories.set(short, (failureCategories.get(short) ?? 0) + 1);
  }
  const pieData = Array.from(failureCategories.entries()).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="border-slate-200/80 dark:border-slate-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Accuracy over time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={accData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis domain={["dataMin - 3", 100]} tick={{ fontSize: 12 }} />
                <ReferenceLine y={85} stroke="#E65100" strokeDasharray="4 4" label={{ value: "85% threshold", fontSize: 10, fill: "#E65100" }} />
                <RTooltip />
                <Area type="monotone" dataKey="accuracy" stroke="#2E75B6" fill="#2E75B6" fillOpacity={0.15} strokeWidth={2} animationDuration={800} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 dark:border-slate-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Volume (traces per day)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <RTooltip />
                <Bar dataKey="volume" fill="#2E75B6" radius={[4, 4, 0, 0]} animationDuration={800} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 dark:border-slate-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Daily cost
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={costData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v}`} />
                <RTooltip formatter={(v) => `$${Number(v).toFixed(2)}`} />
                <Bar dataKey="cost" fill="#1A3A5C" radius={[4, 4, 0, 0]} animationDuration={800} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 dark:border-slate-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Failure breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-56 items-center justify-center gap-6">
            {pieData.length === 0 ? (
              <p className="text-sm text-slate-500">No failures this week.</p>
            ) : (
              <>
                <ResponsiveContainer width="50%" height="100%">
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={2} animationDuration={800}>
                      {pieData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <RTooltip />
                  </PieChart>
                </ResponsiveContainer>
                <ul className="space-y-1.5 text-xs">
                  {pieData.map((d, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-sm" style={{ background: COLORS[i % COLORS.length] }} />
                      <span className="max-w-[180px] truncate text-slate-700 dark:text-slate-300">{d.name}</span>
                      <span className="font-medium text-slate-900 dark:text-slate-100">{d.value}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Settings tab                                                       */
/* ------------------------------------------------------------------ */

function AgentSettings({
  agentId,
  agentName,
}: {
  agentId: string;
  agentName: string;
}) {
  const router = useRouter();
  const disconnectAgent = useAppStore((s) => s.disconnectAgent);
  const [alertsOn, setAlertsOn] = React.useState(true);
  const [threshold, setThreshold] = React.useState(85);
  const [channel, setChannel] = React.useState<"email" | "slack">("email");
  const [disconnectOpen, setDisconnectOpen] = React.useState(false);

  return (
    <div className="space-y-8">
      <Card className="border-slate-200/80 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-base">Alert preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Alerts enabled</p>
              <p className="text-xs text-slate-500">Receive notifications when this agent has incidents.</p>
            </div>
            <button
              type="button"
              className={cn(
                "relative h-6 w-11 rounded-full transition-colors",
                alertsOn ? "bg-[#2E75B6]" : "bg-slate-300 dark:bg-slate-700",
              )}
              onClick={() => {
                setAlertsOn((p) => !p);
                toast.success(alertsOn ? "Alerts disabled." : "Alerts enabled.");
              }}
            >
              <span
                className={cn(
                  "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                  alertsOn ? "left-[22px]" : "left-0.5",
                )}
              />
            </button>
          </div>
          <div>
            <p className="text-sm font-medium">Severity threshold</p>
            <p className="text-xs text-slate-500">Only alert when accuracy drops below this level.</p>
            <div className="mt-2 flex items-center gap-3">
              <input
                type="range"
                min={50}
                max={99}
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="flex-1 accent-[#2E75B6]"
              />
              <span className="w-12 text-right text-sm font-semibold">{threshold}%</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">Channel</p>
            <div className="mt-2 flex gap-2">
              {(["email", "slack"] as const).map((ch) => (
                <button
                  key={ch}
                  type="button"
                  className={cn(
                    "rounded-md border px-4 py-1.5 text-sm font-medium transition-colors",
                    channel === ch
                      ? "border-[#2E75B6] bg-[#2E75B6]/10 text-[#2E75B6]"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300",
                  )}
                  onClick={() => {
                    setChannel(ch);
                    toast.success(`Alerts will be sent via ${ch === "email" ? "email" : "Slack"}.`);
                  }}
                >
                  {ch === "email" ? "Email" : "Slack"}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-base">Agent information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Connected platform</span>
            <span className="font-medium">OpenAI</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="text-slate-500">Model</span>
            <span className="font-medium">GPT-4o</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="text-slate-500">Connected since</span>
            <span className="font-medium">Mar 15, 2026</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-red-200 dark:border-red-900/50">
        <CardHeader>
          <CardTitle className="text-base text-[#C62828]">Danger zone</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Disconnecting this agent removes it from your dashboard. Historical data is preserved.
          </p>
          <Dialog open={disconnectOpen} onOpenChange={setDisconnectOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" className="mt-4">
                <Unplug className="mr-2 h-4 w-4" />
                Disconnect {agentName}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Disconnect {agentName}?</DialogTitle>
                <DialogDescription>
                  This agent will be removed from your active dashboard. You can reconnect it
                  later from the Connect page.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDisconnectOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    disconnectAgent(agentId);
                    toast.success(`${agentName} disconnected.`);
                    setDisconnectOpen(false);
                    router.push("/dashboard");
                  }}
                >
                  Yes, disconnect
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AgentDetailPage() {
  const params = useParams<{ id: string }>();
  const ready = useFakeLoading(380);
  const agent = getAgentById(params.id);
  const traces = agent ? getTracesForAgent(agent.id) : [];
  const failedTraces = traces.filter((t) => !t.passed);
  const incidents = allIncidents.filter((i) => i.agentId === params.id);

  const [severityFilter, setSeverityFilter] = React.useState<"all" | Severity>("all");
  const filteredIncidents =
    severityFilter === "all"
      ? failedTraces
      : failedTraces.filter((t) => t.severity === severityFilter);

  if (!agent) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-slate-500">Agent not found.</p>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-10 w-full" />
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/dashboard" className="flex items-center gap-1 text-[#2E75B6] hover:underline">
          <ArrowLeft className="h-3.5 w-3.5" />
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200">{agent.name}</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#1A3A5C] dark:text-slate-50">
          {agent.name}
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{agent.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="success">Active</Badge>
          <Badge variant="outline">{agent.accuracyPct.toFixed(1)}% accuracy</Badge>
          <Badge variant="outline">{agent.failuresLast7d} failures (7d)</Badge>
          <Badge variant="outline">${agent.monthlyCostUsd}/mo</Badge>
          <Badge variant="outline">Last active: {agent.lastActiveMinutesAgo} min ago</Badge>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="activity" className="w-full">
        <TabsList>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Activity */}
        <TabsContent value="activity">
          <Card className="border-slate-200/80 dark:border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Recent activity</CardTitle>
              <p className="text-sm text-slate-500">{traces.length} traces over the past 7 days.</p>
            </CardHeader>
            <CardContent className="divide-y divide-slate-100 dark:divide-slate-800">
              {traces.slice(0, 20).map((t) => (
                <TraceCard key={t.id} trace={t} />
              ))}
              {traces.length > 20 && (
                <p className="py-4 text-center text-sm text-slate-500">
                  Showing 20 of {traces.length} traces.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Incidents */}
        <TabsContent value="incidents">
          <Card className="border-slate-200/80 dark:border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-base">Incidents</CardTitle>
                <p className="text-sm text-slate-500">
                  {failedTraces.length} failures in the past 7 days.
                </p>
              </div>
              <div className="flex gap-1">
                {(["all", "critical", "warning"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={cn(
                      "rounded-md px-3 py-1 text-xs font-medium transition-colors",
                      severityFilter === s
                        ? "bg-[#1A3A5C] text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300",
                    )}
                    onClick={() => setSeverityFilter(s)}
                  >
                    {s === "all" ? "All" : s === "critical" ? "Critical" : "Caution"}
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredIncidents.length === 0 ? (
                <div className="flex flex-col items-center py-12 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/40">
                    <svg className="h-6 w-6 text-[#2E7D32]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-200">No incidents match this filter</p>
                  <p className="text-xs text-slate-500">Try selecting a different severity.</p>
                </div>
              ) : (
                filteredIncidents.map((t) => <TraceCard key={t.id} trace={t} />)
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance */}
        <TabsContent value="performance">
          <PerformanceCharts
            accuracyTrend={agent.accuracyTrend7d}
            volumeByDay={agent.volumeByDay}
            costByDayUsd={agent.costByDayUsd}
            failedTraces={failedTraces}
          />
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings">
          <AgentSettings agentId={agent.id} agentName={agent.name} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
