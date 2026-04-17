"use client";

import * as React from "react";
import { motion, AnimatePresence, useInView, useMotionValue, animate } from "framer-motion";
import { MockupFrame } from "./mockup-frame";

/**
 * Atlas Console — what the user actually sees when they log in.
 * Single dashboard surface. Live agent overview, cost summary, activity feed,
 * incidents widget. Toast popups slide in periodically as new incidents fire.
 */

type Toast = {
  id: number;
  agent: string;
  severity: "critical" | "warning";
  message: string;
};

const TOAST_POOL: Omit<Toast, "id">[] = [
  { agent: "Legal Research Agent", severity: "critical", message: "Cited a court case that does not exist" },
  { agent: "Billing Bot", severity: "warning", message: "Quoted expired Q1 pricing to a customer" },
  { agent: "Scheduler", severity: "warning", message: "Allowed a double-booking for Tuesday 3pm" },
  { agent: "Doc Reviewer", severity: "critical", message: "NDA missing standard 2-year confidentiality" },
  { agent: "Legal Research Agent", severity: "warning", message: "Response cost 47% above per-query baseline" },
];

export function ConsoleMockup() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.2, once: false });

  /* Live ROI counter */
  const roi = useMotionValue(38412);
  const [roiDisplay, setRoiDisplay] = React.useState(38412);
  React.useEffect(() => {
    const unsub = roi.on("change", (v) => setRoiDisplay(Math.round(v)));
    return () => unsub();
  }, [roi]);
  React.useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      animate(roi, roi.get() + Math.floor(Math.random() * 90 + 30), { duration: 1.4, ease: "easeOut" });
    }, 2400);
    return () => clearInterval(id);
  }, [inView, roi]);

  /* Live event tick (drives activity feed jitter + agent oscillation) */
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setTick((t) => t + 1), 1700);
    return () => clearInterval(id);
  }, [inView]);

  /* Toast popups — fire every ~5s while in view */
  const [toasts, setToasts] = React.useState<Toast[]>([]);
  const toastIdRef = React.useRef(1);
  const poolIdxRef = React.useRef(0);

  React.useEffect(() => {
    if (!inView) return;
    const fire = () => {
      const pick = TOAST_POOL[poolIdxRef.current % TOAST_POOL.length];
      poolIdxRef.current++;
      const t: Toast = { id: toastIdRef.current++, ...pick };
      setToasts((prev) => [...prev, t].slice(-1));
      setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== t.id)), 4200);
    };
    const id = setInterval(fire, 5000);
    fire();
    return () => clearInterval(id);
  }, [inView]);

  const agents = [
    { name: "Client Intake Bot", role: "Customer service", health: 91, status: "ok", base: 91 },
    { name: "Legal Research", role: "Knowledge agent", health: 78, status: "review", base: 78 },
    { name: "Scheduler", role: "Calendar bot", health: 96, status: "ok", base: 96 },
    { name: "Billing Bot", role: "Pricing agent", health: 94, status: "ok", base: 94 },
    { name: "Doc Reviewer", role: "Contracts", health: 88, status: "watch", base: 88 },
  ];

  const activity = [
    { t: "now", agent: "intake_bot", verb: "answered", note: "refund window" },
    { t: "12s", agent: "scheduler", verb: "blocked", note: "double-book Tue 3pm" },
    { t: "44s", agent: "billing_bot", verb: "quoted", note: "$250 setup fee" },
    { t: "1m", agent: "doc_reviewer", verb: "redlined", note: "NDA section 4.2" },
    { t: "2m", agent: "intake_bot", verb: "escalated", note: "3rd reschedule" },
  ];

  return (
    <div ref={ref}>
      <MockupFrame url="app.atlassynapse.ai/console">
        <div className="relative" style={{ background: "#0A0E1C" }}>
          {/* Header strip */}
          <div className="flex items-center justify-between border-b px-5 py-3" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white/85">
                Atlas Console
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">
                AI workforce overview
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold text-[#86A97F]">
                <span className="h-1 w-1 animate-pulse rounded-full bg-[#86A97F]" />
                live
              </span>
              <span className="font-mono text-[10px] text-white/40">today</span>
            </div>
          </div>

          {/* KPI strip */}
          <div className="grid grid-cols-4 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
            {[
              { label: "Agents online", value: "5", sub: "all responding", color: "#A78BFA" },
              { label: "Open incidents", value: "2", sub: "1 critical", color: "#E879A6" },
              {
                label: "Prevented loss",
                value: `$${roiDisplay.toLocaleString()}`,
                sub: "this month",
                color: "#F59E0B",
              },
              { label: "Spend today", value: "$1.59 / qry", sub: "12% under target", color: "#86A97F" },
            ].map((k) => (
              <div key={k.label} className="px-4 py-3" style={{ background: "#0F1426" }}>
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/35">{k.label}</p>
                <p className="mt-1 font-mono text-[20px] font-extrabold tabular-nums leading-none" style={{ color: k.color }}>
                  {k.value}
                </p>
                <p className="mt-1 text-[10px] text-white/40">{k.sub}</p>
              </div>
            ))}
          </div>

          {/* Body grid: agent overview + side panels */}
          <div className="grid grid-cols-12 gap-3 p-4">
            {/* Agent overview cards */}
            <div className="col-span-7 rounded-lg" style={{ background: "#111726", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center justify-between border-b px-3 py-2.5" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">Your agents</span>
                <span className="font-mono text-[10px] text-white/35">5 of 5</span>
              </div>
              <div className="grid grid-cols-2 gap-2 p-2.5">
                {agents.map((a, i) => {
                  const jitter = Math.sin((tick + i) * 0.85) * 1.4;
                  const health = Math.max(0, Math.min(100, Math.round(a.base + jitter)));
                  const statusColor = a.status === "ok" ? "#86A97F" : a.status === "watch" ? "#D4A35C" : "#E879A6";
                  return (
                    <div
                      key={a.name}
                      className="rounded-md px-3 py-2.5"
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] font-bold text-white">{a.name}</span>
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: statusColor }} />
                      </div>
                      <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-white/35">{a.role}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="h-[4px] flex-1 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                          <motion.div
                            className="h-full rounded-full"
                            animate={{ width: `${health}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            style={{ background: statusColor }}
                          />
                        </div>
                        <motion.span
                          key={health}
                          initial={{ opacity: 0.5 }}
                          animate={{ opacity: 1 }}
                          className="font-mono text-[11px] font-bold tabular-nums"
                          style={{ color: statusColor }}
                        >
                          {health}%
                        </motion.span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right column: activity + recent incidents */}
            <div className="col-span-5 flex flex-col gap-3">
              {/* Live activity feed */}
              <div className="flex-1 rounded-lg" style={{ background: "#111726", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center justify-between border-b px-3 py-2.5" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">Activity</span>
                  <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold text-[#A78BFA]">
                    <span className="h-1 w-1 animate-pulse rounded-full bg-[#A78BFA]" />
                    streaming
                  </span>
                </div>
                <div className="p-2.5">
                  {activity.map((e, i) => (
                    <div key={i} className="flex items-baseline gap-2 py-1 font-mono text-[10px]">
                      <span className="w-[24px] shrink-0 text-white/35">{e.t}</span>
                      <span className="text-white/65">{e.agent}</span>
                      <span className="text-[#A78BFA]">{e.verb}</span>
                      <span className="truncate text-white/45">{e.note}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent incidents */}
              <div className="rounded-lg" style={{ background: "#111726", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center justify-between border-b px-3 py-2.5" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">Recent incidents</span>
                  <span className="font-mono text-[10px] text-[#E879A6]">2 open</span>
                </div>
                <div className="space-y-1.5 p-2.5">
                  <div
                    className="rounded-md px-2.5 py-1.5"
                    style={{ background: "rgba(232,121,166,0.08)", border: "1px solid rgba(232,121,166,0.25)" }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-[#E879A6]">critical</span>
                      <span className="font-mono text-[9px] text-white/40">2:14 PM</span>
                    </div>
                    <p className="mt-0.5 text-[11px] font-semibold text-white">Legal Research Agent</p>
                    <p className="text-[10px] text-white/50">Hallucinated case citation. 1 client affected.</p>
                  </div>
                  <div
                    className="rounded-md px-2.5 py-1.5"
                    style={{ background: "rgba(212,163,92,0.06)", border: "1px solid rgba(212,163,92,0.2)" }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-[#D4A35C]">warning</span>
                      <span className="font-mono text-[9px] text-white/40">1:47 PM</span>
                    </div>
                    <p className="mt-0.5 text-[11px] font-semibold text-white">Billing Bot</p>
                    <p className="text-[10px] text-white/50">Expired Q1 pricing quoted. 3x this week.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Toast popup layer — fires periodically with INCIDENT REPORTED */}
          <div className="pointer-events-none absolute right-4 top-16 z-50 w-[300px]">
            <AnimatePresence>
              {toasts.map((t) => {
                const isCrit = t.severity === "critical";
                const accent = isCrit ? "#E879A6" : "#D4A35C";
                return (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, x: 30, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 30, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden rounded-lg"
                    style={{
                      background: "rgba(20,16,32,0.96)",
                      border: `1px solid ${accent}40`,
                      boxShadow: `0 16px 40px rgba(0,0,0,0.6), 0 0 24px ${accent}30`,
                    }}
                  >
                    <div className="flex items-center gap-2 border-b px-3 py-1.5" style={{ borderColor: accent + "30", background: accent + "12" }}>
                      <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ background: accent }}>
                        !
                      </span>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: accent }}>
                        Incident reported
                      </span>
                      <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.1em]" style={{ color: accent }}>
                        {t.severity}
                      </span>
                    </div>
                    <div className="px-3 py-2">
                      <p className="text-[12px] font-bold text-white">{t.agent}</p>
                      <p className="mt-0.5 text-[11px] leading-snug text-white/65">{t.message}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <button className="rounded px-2 py-0.5 text-[10px] font-semibold text-white" style={{ background: accent }}>
                          Open
                        </button>
                        <span className="font-mono text-[9px] text-white/35">just now</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </MockupFrame>
    </div>
  );
}
