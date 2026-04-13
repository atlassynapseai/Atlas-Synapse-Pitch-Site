"use client";

import * as React from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Download,
  FileText,
  Minus,
} from "lucide-react";

import { performanceReviews, type PerformanceReview } from "@/data/reviews";
import { useFakeLoading } from "@/hooks/use-fake-loading";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const trendConfig = {
  improving: { icon: ArrowUp, color: "text-[#2E7D32]", bg: "bg-emerald-50 dark:bg-emerald-950/40", label: "Improving" },
  stable: { icon: Minus, color: "text-[#2E75B6]", bg: "bg-blue-50 dark:bg-blue-950/40", label: "Stable" },
  declining: { icon: ArrowDown, color: "text-[#C62828]", bg: "bg-red-50 dark:bg-red-950/40", label: "Declining" },
} as const;

function ReviewReport({ review, onClose }: { review: PerformanceReview; onClose: () => void }) {
  const tc = trendConfig[review.trend];
  const TrendIcon = tc.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="space-y-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Performance Review
          </p>
          <h2 className="mt-1 text-xl font-semibold text-[#1A3A5C] dark:text-white">
            {review.agentName}
          </h2>
          <p className="text-sm text-slate-500">{review.period}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              toast.success("PDF downloaded (demo only; no actual file created).");
            }}
          >
            <Download className="mr-2 h-4 w-4" />
            Export as PDF
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Back to list
          </Button>
        </div>
      </div>

      {/* Executive summary */}
      <Card className="border-slate-200/80 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-base">Executive summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            {review.executiveSummary}
          </p>
        </CardContent>
      </Card>

      {/* Key metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Accuracy", value: `${review.accuracy}%` },
          { label: "Volume", value: review.volume.toLocaleString() },
          { label: "Failures", value: String(review.failures) },
          { label: "Cost", value: `$${review.costUsd}` },
        ].map((m) => (
          <Card key={m.label} className="border-slate-200/80 dark:border-slate-800">
            <CardContent className="p-5">
              <p className="text-xs font-medium text-slate-500">{m.label}</p>
              <p className="mt-1 text-2xl font-semibold text-[#1A3A5C] dark:text-white">
                {m.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Incidents */}
      <Card className="border-slate-200/80 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-base">Incidents this period</CardTitle>
        </CardHeader>
        <CardContent>
          {review.incidents.length === 0 ? (
            <p className="text-sm text-slate-500">No incidents this period.</p>
          ) : (
            <ul className="space-y-2">
              {review.incidents.map((inc, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C62828]" />
                  {inc}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Trend */}
      <Card className="border-slate-200/80 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-base">Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium", tc.bg, tc.color)}>
            <TrendIcon className="h-4 w-4" />
            {tc.label}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="border-[#6A1B9A]/20 dark:border-purple-900/40">
        <CardHeader>
          <CardTitle className="text-base">
            <span className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-[#6A1B9A]/10">
                <FileText className="h-3.5 w-3.5 text-[#6A1B9A]" />
              </span>
              Recommendations
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {review.recommendations.map((rec, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#6A1B9A]/10 text-xs font-semibold text-[#6A1B9A]">
                  {i + 1}
                </span>
                {rec}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function ReviewsPage() {
  const ready = useFakeLoading(420);
  const [selected, setSelected] = React.useState<PerformanceReview | null>(null);

  if (!ready) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-36" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {selected ? (
          <ReviewReport
            key={selected.id}
            review={selected}
            onClose={() => setSelected(null)}
          />
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-2xl font-semibold text-[#1A3A5C] dark:text-slate-50">
                Performance reviews
              </h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Weekly HR-style reports, one per agent. See what each agent did, how well, what
                went wrong, and whether it&apos;s improving.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {performanceReviews.map((r) => {
                const tc = trendConfig[r.trend];
                const TrendIcon = tc.icon;
                return (
                  <Card
                    key={r.id}
                    className="cursor-pointer border-slate-200/80 transition-shadow hover:shadow-md dark:border-slate-800"
                    onClick={() => setSelected(r)}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">
                            {r.agentName}
                          </p>
                          <p className="text-xs text-slate-500">{r.period}</p>
                        </div>
                        <div
                          className={cn(
                            "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                            tc.bg,
                            tc.color,
                          )}
                        >
                          <TrendIcon className="h-3 w-3" />
                          {tc.label}
                        </div>
                      </div>
                      <Separator className="my-3" />
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        {r.headline}
                      </p>
                      <Button variant="link" size="sm" className="mt-3 h-auto p-0 text-[#2E75B6]">
                        View report <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
