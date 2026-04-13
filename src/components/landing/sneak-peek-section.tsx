"use client";

import * as React from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { LANDING } from "@/lib/landing-palette";

const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const agents = [
  { name: "Client Intake Bot", accuracy: 91, failures: 3, status: "active" as const },
  { name: "Document Reviewer", accuracy: 87, failures: 7, status: "active" as const },
  { name: "Scheduling Assistant", accuracy: 96, failures: 1, status: "active" as const },
  { name: "Legal Research Agent", accuracy: 78, failures: 12, status: "warning" as const },
  { name: "Billing Follow-Up Bot", accuracy: 94, failures: 2, status: "active" as const },
];

const incidents = [
  { severity: "critical" as const, text: "Hallucinated case citation — Williams v. State (2021)" },
  { severity: "warning" as const, text: "Wrong statute of limitations quoted for NJ malpractice" },
  { severity: "critical" as const, text: "Fabricated 'Restatement (Fourth) of Federal Procedure'" },
];

const traces = [
  { passed: true, summary: "Correctly retrieved and summarized Smith v. Johnson (2019) for client consultation on liability question." },
  { passed: false, severity: "critical", summary: "Cited Williams v. State (2021) as establishing precedent for negligence claims. This case does not exist. Hallucinated citation." },
  { passed: false, severity: "warning", summary: "Quoted statute of limitations as 3 years for medical malpractice in NJ. Actual limit is 2 years under N.J.S.A. 2A:14-2." },
  { passed: true, summary: "Accurately summarized three relevant employment law precedents for wrongful termination inquiry." },
];

const sparklineData = [82, 80.5, 79.2, 78.8, 78, 77.6, 78.1];

function BrowserChrome({ url, children, className }: { url: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0F1219]", className)} style={{ boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)" }}>
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3" style={{ background: "linear-gradient(180deg, #2a2a2a, #1e1e1e)" }}>
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        </div>
        <div className="ml-4 flex-1 rounded-md bg-[#1a1a2e] px-3 py-1.5 font-mono text-[11px] text-[#9CA3AF]">
          {url}
        </div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function AccuracyColor({ v }: { v: number }) {
  const c = v > 90 ? "text-[#2E7D32]" : v >= 85 ? "text-[#F59E0B]" : "text-[#C62828]";
  return <span className={cn("font-bold", c)}>{v}%</span>;
}

function AgentOverviewTab() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { label: "AGENTS ACTIVE", value: "5" },
          { label: "ACCURACY", value: "89.2%" },
          { label: "INCIDENTS", value: "25" },
          { label: "SAVED THIS MONTH", value: "$12,353" },
        ].map((m) => (
          <div key={m.label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
            <p className="text-[10px] font-medium uppercase tracking-wider text-[#6B7280]">{m.label}</p>
            <p className="mt-1.5 text-[22px] font-bold text-white">{m.value}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] text-[10px] font-medium uppercase tracking-wider text-[#6B7280]">
                <th className="pb-2.5 text-left">Agent</th>
                <th className="pb-2.5 text-left">Accuracy</th>
                <th className="pb-2.5 text-left">Failures</th>
                <th className="pb-2.5 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((a) => (
                <tr key={a.name} className={cn("border-b border-white/[0.04]", a.status === "warning" && "bg-[#C62828]/[0.06]")}>
                  <td className="py-2.5 font-medium text-white">{a.name}</td>
                  <td className="py-2.5"><AccuracyColor v={a.accuracy} /></td>
                  <td className="py-2.5 text-[#9CA3AF]">{a.failures}</td>
                  <td className="py-2.5">
                    {a.status === "active" ? (
                      <span className="flex items-center gap-1.5 text-[#2E7D32]">
                        <span className="status-dot-ping relative h-2 w-2 rounded-full bg-[#2E7D32]" />Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-[#E65100]">
                        <span className="relative h-2 w-2 rounded-full bg-[#E65100]" />Warning
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full shrink-0 space-y-2.5 md:w-[240px]">
          <p className="text-[10px] font-medium uppercase tracking-wider text-[#6B7280]">Latest incidents</p>
          {incidents.map((inc, i) => (
            <div key={i} className={cn("rounded-xl border-l-[3px] bg-white/[0.02] p-3", inc.severity === "critical" ? "border-l-[#C62828]" : "border-l-[#F59E0B]")}>
              <span className={cn(
                "inline-block rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase",
                inc.severity === "critical" ? "bg-[#C62828]/20 text-[#C62828]" : "bg-[#F59E0B]/20 text-[#F59E0B]",
              )}>
                {inc.severity}
              </span>
              <p className="mt-1.5 text-xs leading-snug text-[#9CA3AF]">{inc.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AgentDetailTab() {
  const min = Math.min(...sparklineData);
  const max = Math.max(...sparklineData);
  const range = max - min || 1;
  const points = sparklineData
    .map((v, i) => `${(i / (sparklineData.length - 1)) * 100},${100 - ((v - min) / range) * 80 - 10}`)
    .join(" ");
  const lastPt = points.split(" ").pop()!.split(",");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="text-lg font-bold text-white">Legal Research Agent</h3>
        <span className="rounded-md bg-[#C62828]/20 px-2.5 py-1 text-xs font-bold text-[#C62828]">78% accuracy</span>
        <span className="text-xs text-[#9CA3AF]">12 incidents</span>
        <div className="ml-auto">
          <svg viewBox="0 0 100 60" className="h-10 w-24">
            <polyline points={points} fill="none" stroke="#C62828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={lastPt[0]} cy={lastPt[1]} r="3" fill="#C62828" />
          </svg>
        </div>
      </div>
      <div className="space-y-3">
        {traces.map((t, i) => (
          <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="flex items-center gap-2">
              {t.passed ? (
                <span className="rounded bg-[#2E7D32]/20 px-2 py-0.5 text-[10px] font-bold text-[#2E7D32]">✓ Passed</span>
              ) : (
                <span className={cn(
                  "rounded px-2 py-0.5 text-[10px] font-bold uppercase",
                  t.severity === "critical" ? "bg-[#C62828]/20 text-[#C62828]" : "bg-[#E65100]/20 text-[#E65100]",
                )}>
                  ✗ {t.severity}
                </span>
              )}
            </div>
            <p className="mt-2.5 text-sm leading-relaxed text-[#d1d5db]">{t.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function RoiBarChart() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const bars = [38, 52, 68, 75, 82, 88, 94];
  return (
    <div ref={ref} className="mt-4 flex items-end gap-1.5" style={{ height: "100px" }}>
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t bg-[#2E7D32]/50 transition-all duration-700 ease-out"
          style={{ height: inView ? `${h}%` : "0%", transitionDelay: `${i * 80}ms` }}
        />
      ))}
    </div>
  );
}

export function SneakPeekSection() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const [tab, setTab] = React.useState<"overview" | "detail">("overview");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });
  const rotateY = useTransform(scrollYProgress, [0, 1], [6, 0]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.5]);

  return (
    <section id="sneak-peek" ref={sectionRef} className="relative px-4 py-14 md:px-8 lg:py-16" style={{ background: LANDING.sneak.solid }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EXPO_OUT }}
        className="mx-auto mb-8 w-full max-w-[1400px] px-5 md:px-10"
      >
        <p className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-[#F59E0B]">Product preview</p>
        <h2 className="mt-2 text-[38px] font-extrabold tracking-[-0.02em] text-white md:text-[52px] lg:text-[58px]">
          A look inside
        </h2>
        <p className="mt-2 max-w-[520px] text-[18px] text-[#E8D5F5]/50 md:text-[20px]">
          This is what managing your AI workforce looks like. <span className="font-bold text-white">Real data, real layout.</span>
        </p>
      </motion.div>

      {/* Main browser mockup */}
      <div className="relative mx-auto mt-12 w-full max-w-[1000px] md:[perspective:1200px]">
        <motion.div style={{ opacity: glowOpacity }} className="pointer-events-none absolute -inset-10 hidden rounded-3xl bg-accent/15 blur-[60px] md:block" />
        <motion.div style={{ rotateY }} className="relative">
          <BrowserChrome url="app.atlassynapse.com/dashboard">
            <div className="mb-5 flex gap-2">
              {(["overview", "detail"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cn(
                    "rounded-full px-5 py-2 text-xs font-medium transition-colors",
                    tab === t
                      ? "bg-accent text-white"
                      : "bg-white/[0.06] text-[#9CA3AF] hover:bg-white/[0.1]",
                  )}
                >
                  {t === "overview" ? "Agent Overview" : "Agent Detail"}
                </button>
              ))}
            </div>

            <div className="relative min-h-[400px] md:min-h-[440px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0"
                >
                  {tab === "overview" ? <AgentOverviewTab /> : <AgentDetailTab />}
                </motion.div>
              </AnimatePresence>
            </div>
          </BrowserChrome>
        </motion.div>
      </div>

      {/* Two smaller frames */}
      <div className="mx-auto mt-10 flex w-full max-w-[1000px] flex-col gap-[4%] md:flex-row">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EXPO_OUT }}
          className="flex-1"
        >
          <BrowserChrome url="app.atlassynapse.com/roi">
            <p className="text-[10px] font-medium uppercase tracking-wider text-[#6B7280]">Monthly savings</p>
            <p className="mt-2 text-3xl font-bold text-white">$12,353</p>
            <p className="text-xs text-[#9CA3AF]">saved this month vs $14,200 baseline</p>
            <RoiBarChart />
          </BrowserChrome>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EXPO_OUT, delay: 0.15 }}
          className="flex-1"
        >
          <BrowserChrome url="app.atlassynapse.com/reviews">
            <p className="text-[10px] font-medium uppercase tracking-wider text-[#6B7280]">Performance Review</p>
            <p className="mt-2 text-xl font-bold text-white">Scheduling Assistant</p>
            <div className="mt-4 space-y-2.5 text-sm">
              <div className="flex justify-between"><span className="text-[#9CA3AF]">Accuracy</span><span className="font-bold text-[#2E7D32]">96%</span></div>
              <div className="flex justify-between"><span className="text-[#9CA3AF]">Incidents</span><span className="font-bold text-white">1</span></div>
              <div className="flex justify-between"><span className="text-[#9CA3AF]">Trend</span><span className="font-bold text-[#2E7D32]">↑ Improving</span></div>
            </div>
            <div className="mt-4 rounded-xl border-l-[3px] border-l-[#7F77DD] bg-[#7F77DD]/[0.08] p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7F77DD]">Recommendation</p>
              <p className="mt-1 text-xs leading-relaxed text-[#d1d5db]">
                Consider expanding to handle rescheduling requests.
              </p>
            </div>
          </BrowserChrome>
        </motion.div>
      </div>
    </section>
  );
}
