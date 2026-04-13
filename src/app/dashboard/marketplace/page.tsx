"use client";

import * as React from "react";
import { toast } from "sonner";
import { CheckCircle2, Search, Star } from "lucide-react";

import {
  marketplaceAgents,
  marketplaceCategories,
  type MarketplaceAgent,
} from "@/data/marketplace";
import { useFakeLoading } from "@/hooks/use-fake-loading";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function MarketplacePage() {
  const ready = useFakeLoading(400);
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState("All");

  const filtered = marketplaceAgents.filter((a) => {
    if (category !== "All" && a.category !== category) return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      return (
        a.name.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  if (!ready) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-52" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-60" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-[#1A3A5C] dark:text-slate-50">
              Verified Agent Marketplace
            </h1>
            <Badge variant="ai">Coming Soon</Badge>
          </div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Browse pre-verified AI agents with performance scores, failure rates, and cost profiles
            — before you deploy.
          </p>
        </div>
      </div>

      {/* Search & filter */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search agents…"
            className="h-9 pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-1">
          {marketplaceCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                category === cat
                  ? "bg-[#1A3A5C] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300",
              )}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.length === 0 ? (
          <p className="col-span-full py-16 text-center text-sm text-slate-500">
            No agents match your search.
          </p>
        ) : (
          filtered.map((a) => <AgentCard key={a.id} agent={a} />)
        )}
      </div>
    </div>
  );
}

function AgentCard({ agent }: { agent: MarketplaceAgent }) {
  return (
    <Card className="flex flex-col border-slate-200/80 transition-shadow hover:shadow-md dark:border-slate-800">
      <CardContent className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-medium text-slate-900 dark:text-white">{agent.name}</p>
            <Badge variant="outline" className="mt-1">
              {agent.category}
            </Badge>
          </div>
          {agent.verified && (
            <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-[#2E7D32] dark:bg-emerald-950/40 dark:text-emerald-300">
              <CheckCircle2 className="h-3 w-3" />
              Verified
            </span>
          )}
        </div>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {agent.description}
        </p>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              {agent.accuracyPct}% accuracy across{" "}
              {agent.evaluations.toLocaleString()} evaluations
            </span>
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3.5 w-3.5",
                  i < Math.round(agent.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-slate-300 dark:text-slate-700",
                )}
              />
            ))}
            <span className="ml-1 text-xs text-slate-500">
              {agent.rating} ({agent.reviews})
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[#1A3A5C] dark:text-white">
              {agent.price}
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="sm" disabled className="opacity-60">
                    Deploy
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Coming in Phase 2</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
