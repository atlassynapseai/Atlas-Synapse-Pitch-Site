"use client";

import * as React from "react";
import Link from "next/link";
import { Plug } from "lucide-react";
import { agentsSeed } from "@/data/agents";
import { useAppStore } from "@/lib/store";
import { useFakeLoading } from "@/hooks/use-fake-loading";
import { AgentOverviewTable } from "@/components/dashboard/agent-overview-table";
import { IncidentsMiniFeed } from "@/components/dashboard/incidents-mini-feed";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const ready = useFakeLoading(440);
  /** Do not select `visibleAgents()`: it returns a new array every time and triggers an infinite re-render loop. */
  const disconnectedAgentIds = useAppStore((s) => s.disconnectedAgentIds);
  const agents = React.useMemo(
    () => agentsSeed.filter((a) => !disconnectedAgentIds.includes(a.id)),
    [disconnectedAgentIds],
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#1A3A5C] dark:text-slate-50">Agent overview</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Live snapshot for BrightPath Legal: quality, incidents, and spend in one place.
          </p>
        </div>
        <Button asChild className="bg-[#2E75B6] hover:bg-[#25649c]">
          <Link href="/dashboard/connect">
            <Plug className="mr-2 h-4 w-4" />
            Connect an agent
          </Link>
        </Button>
      </div>

      <SummaryCards agents={agents} loading={!ready} />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <AgentOverviewTable agents={agents} loading={!ready} />
        <IncidentsMiniFeed loading={!ready} />
      </div>
    </div>
  );
}
