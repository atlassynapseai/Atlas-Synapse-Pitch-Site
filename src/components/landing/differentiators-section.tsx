"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { LANDING } from "@/lib/landing-palette";

const E: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Card 1: JSON trace (kept as-is) ── */

const jsonText = `{
  "agent": "client_intake_bot",
  "eval": {
    "hallucination_score": 0.87,
    "grounding": "FAILED",
    "policy_adherence": false,
    "cited_policy": "return_window",
    "expected": "30_days",
    "actual_output": "60_days"
  }
}`;

function Typewriter({ text, active }: { text: string; active: boolean }) {
  const [displayed, setDisplayed] = React.useState("");
  const idx = React.useRef(0);
  React.useEffect(() => {
    if (!active) return;
    idx.current = 0;
    setDisplayed("");
    const id = setInterval(() => {
      idx.current++;
      if (idx.current > text.length) { clearInterval(id); return; }
      setDisplayed(text.slice(0, idx.current));
    }, 12);
    return () => clearInterval(id);
  }, [active, text]);
  return (
    <span className="whitespace-pre-wrap font-mono text-[11px] leading-[1.5] text-[#818CF8]/50">
      {displayed}
      {displayed.length < text.length && <span className="animate-pulse text-[#F59E0B]">▌</span>}
    </span>
  );
}

function JsonLeft({ active }: { active: boolean }) {
  return (
    <div className="rounded-xl bg-[#080615] p-3">
      <div className="mb-1.5 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-[#F87171]/50" />
        <span className="h-2 w-2 rounded-full bg-[#FBBF24]/50" />
        <span className="h-2 w-2 rounded-full bg-[#4ADE80]/50" />
        <span className="ml-2 text-[9px] text-[#E8D5F5]/25">evaluation_output.json</span>
      </div>
      <Typewriter text={jsonText} active={active} />
    </div>
  );
}

/* ── Card 2: Developer metrics dashboard mockup ── */

function DashboardLeft() {
  const bars = [6.2, 5.8, 7.1, 6.9, 5.4, 7.8, 6.6];
  const max = Math.max(...bars);
  return (
    <div className="rounded-xl bg-[#080615] p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#E8D5F5]/30">Fleet Cost Analytics · All Agents</span>
        <span className="rounded bg-[#818CF8]/10 px-1.5 py-0.5 text-[8px] font-bold text-[#818CF8]/50">LIVE</span>
      </div>
      <div className="space-y-1 font-mono text-[11px] text-[#E8D5F5]/35">
        <div className="flex justify-between"><span>scheduling_assistant</span><span className="text-[#E8D5F5]/50">$286/mo</span></div>
        <div className="flex justify-between"><span>legal_research_v2</span><span className="text-[#E8D5F5]/50">$421/mo</span></div>
        <div className="flex justify-between"><span>client_intake_bot</span><span className="text-[#E8D5F5]/50">$512/mo</span></div>
        <div className="flex justify-between border-t border-white/[0.04] pt-1"><span>Total fleet cost</span><span className="font-bold text-[#E8D5F5]/60">$1,847/mo</span></div>
      </div>
      <div className="mt-2.5">
        <p className="mb-1 text-[9px] text-[#E8D5F5]/20">daily cost (7d, $/day)</p>
        <div className="flex items-end gap-[3px]" style={{ height: "32px" }}>
          {bars.map((h, i) => (
            <div key={i} className="flex-1 rounded-t bg-[#818CF8]/20" style={{ height: `${(h / max) * 100}%` }} />
          ))}
        </div>
      </div>
      <div className="mt-2 border-t border-white/[0.04] pt-1.5 font-mono text-[10px] text-[#E8D5F5]/30">
        Avg latency: <span className="text-[#E8D5F5]/45">340ms</span> · Error rate: <span className="text-[#E8D5F5]/45">11.2%</span>
      </div>
    </div>
  );
}

/* ── Card 3: Slack-style eng alert ── */

function SlackLeft() {
  return (
    <div className="rounded-xl bg-[#080615] p-3">
      {/* Channel header */}
      <div className="mb-2 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#E8D5F5]/20" />
        <span className="text-[11px] font-bold text-[#E8D5F5]/40"># eng-alerts</span>
        <span className="ml-auto rounded bg-[#F87171]/10 px-1.5 py-0.5 text-[8px] font-bold text-[#F87171]/50">847 unread</span>
      </div>
      {/* Message */}
      <div className="rounded-lg border-l-[3px] border-l-[#FBBF24]/30 bg-white/[0.02] p-2.5">
        <div className="mb-1.5 flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-[#E8D5F5]/10 text-[8px] font-bold text-[#E8D5F5]/40">B</div>
          <span className="text-[10px] font-bold text-[#E8D5F5]/45">AlertBot</span>
          <span className="text-[9px] text-[#E8D5F5]/20">2:14 PM</span>
        </div>
        <div className="space-y-0.5 text-[10px] leading-[1.5] text-[#E8D5F5]/35">
          <p className="font-semibold text-[#FBBF24]/60">⚠ P3: Hallucination detected</p>
          <p>Agent: <span className="text-[#E8D5F5]/45">legal_research_v2</span></p>
          <p>Type: <span className="text-[#E8D5F5]/45">ungrounded_citation</span></p>
          <p>Assigned: <span className="text-[#E8D5F5]/45">backlog</span></p>
          <p>ETA: <span className="text-[#E8D5F5]/45">next sprint</span></p>
          <p>Customer notified: <span className="font-semibold text-[#F87171]/50">no</span></p>
        </div>
      </div>
      {/* Action buttons */}
      <div className="mt-2 flex gap-2">
        <span className="rounded border border-white/[0.04] px-2 py-0.5 text-[9px] text-[#E8D5F5]/20">Mark as read</span>
        <span className="rounded border border-white/[0.04] px-2 py-0.5 text-[9px] text-[#E8D5F5]/20">Snooze</span>
      </div>
    </div>
  );
}

/* ── Word reveal for right side ── */

function WordReveal({ text, active }: { text: string; active: boolean }) {
  const words = text.split(" ");
  const [c, setC] = React.useState(0);
  React.useEffect(() => {
    if (!active) return;
    setC(0);
    const t = setTimeout(() => {
      let i = 0;
      const id = setInterval(() => {
        i++;
        if (i > words.length) { clearInterval(id); return; }
        setC(i);
      }, 35);
      return () => clearInterval(id);
    }, 400);
    return () => clearTimeout(t);
  }, [active, words.length]);
  return (
    <span className="text-[16px] leading-[1.7] text-white lg:text-[17px]">
      {words.map((w, i) => (
        <span key={i} className={cn("inline-block transition-opacity duration-150", i < c ? "opacity-100" : "opacity-0")}>
          {w}{i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}

/* ── Panel data ── */

interface Comparison {
  title: string;
  paneColor: string;
  borderColor: string;
  leftType: "json" | "dashboard" | "slack";
  us: string;
  context: string;
}

const comparisons: Comparison[] = [
  {
    title: "PLAIN-ENGLISH TRANSLATION",
    paneColor: "rgba(129,140,248,0.1)",
    borderColor: "rgba(129,140,248,0.28)",
    leftType: "json",
    us: "Your intake bot told a customer the return window is 60 days. Your actual policy says 30. Flagged as critical: wrong information sent to a live customer.",
    context: "Same data. One is for engineers. One is for you.",
  },
  {
    title: "BUSINESS ROI, NOT TOKEN COSTS",
    paneColor: "rgba(245,158,11,0.08)",
    borderColor: "rgba(245,158,11,0.22)",
    leftType: "dashboard",
    us: "You're spending $1,847/mo on 5 agents. Your scheduling assistant ($286/mo) saves you $2,289 (great ROI). But your legal research agent ($421/mo) caused $560 in error corrections, and it's costing more than it's worth.",
    context: "Token counts don't pay the bills. ROI does.",
  },
  {
    title: "SILENT FAILURE DETECTION",
    paneColor: "rgba(248,113,113,0.08)",
    borderColor: "rgba(248,113,113,0.22)",
    leftType: "slack",
    us: 'Email to you at 2:15pm: "Your legal research agent cited a court case that doesn\'t exist: Williams v. State (2021). Flagged as critical. The client received this 4 minutes ago."',
    context: "You find out in seconds. Not sprints.",
  },
];

/* ── Comparison panel ── */

function ComparisonPanel({ comp }: { comp: Comparison }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <div ref={ref} className="relative overflow-hidden rounded-2xl border" style={{ background: comp.paneColor, borderColor: comp.borderColor }}>
      <div className="absolute bottom-0 left-0 top-0 w-[3px]" style={{ background: `linear-gradient(180deg, ${comp.borderColor}, transparent)` }} />
      <div className="p-4 lg:p-5">
        <p className="mb-3 text-[12px] font-extrabold uppercase tracking-[0.1em] text-[#F59E0B]">{comp.title}</p>
        <div className="grid items-start gap-3 md:grid-cols-[1fr_40px_1fr]">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: E }}
          >
            {comp.leftType === "json" && <JsonLeft active={inView} />}
            {comp.leftType === "dashboard" && <DashboardLeft />}
            {comp.leftType === "slack" && <SlackLeft />}
          </motion.div>
          <div className="hidden items-center justify-center md:flex">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10 text-lg font-bold text-[#F59E0B]">→</div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: E, delay: 0.1 }}
            className="rounded-xl border-l-[3px] border-l-[#F59E0B]/55 bg-[#1B1464]/45 p-3 ring-1 ring-white/[0.06]"
          >
            <WordReveal text={comp.us} active={inView} />
            <p className="mt-2 text-[11px] font-semibold text-[#F59E0B]/75">{comp.context}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ── Section ── */

export function DifferentiatorsSection() {
  return (
    <section className="relative" style={{ background: LANDING.differentiators.gradient }}>
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        <polygon points="0,0 350,30 280,350 0,320" fill="rgba(232,213,245,0.05)" stroke="rgba(232,213,245,0.09)" strokeWidth="1.5" />
        <polygon points="800,50 1300,0 1440,300 900,350" fill="rgba(129,140,248,0.06)" stroke="rgba(129,140,248,0.1)" strokeWidth="1.5" />
        <polygon points="400,300 750,250 850,550 350,580" fill="rgba(167,139,250,0.04)" stroke="rgba(167,139,250,0.08)" strokeWidth="1" />
        <polygon points="1050,350 1440,300 1440,600 1000,580" fill="rgba(245,158,11,0.04)" stroke="rgba(245,158,11,0.07)" strokeWidth="1" />
      </svg>
      <div className="relative z-10 mx-auto max-w-[1400px] px-5 py-8 md:px-10 md:py-9 lg:py-11">
        {/* Left-aligned heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: E }}
        >
          <p className="text-[14px] font-extrabold uppercase tracking-[0.12em] text-[#F59E0B]">Why we&apos;re different</p>
          <h2 className="mt-2 text-[40px] font-extrabold tracking-[-0.02em] text-white md:text-[56px] lg:text-[64px]">
            Current tools? Built by <span className="text-[#F87171]">engineers</span>,<br />for <span className="text-[#F87171]">engineers</span>.
          </h2>
          <p className="mt-3 max-w-[640px] text-[18px] leading-[1.6] text-[#E8D5F5]/60 md:text-[20px]">
            We&apos;re <span className="font-bold text-[#F59E0B]">business owners</span> who built this for <span className="font-bold text-[#F59E0B]">business owners</span>. Every screen, every alert, and every number is designed so you can <span className="font-bold text-white">act on it immediately</span>.
          </p>
        </motion.div>
        <div className="mt-8 flex flex-col gap-3">
          {comparisons.map((comp, i) => (
            <ComparisonPanel key={i} comp={comp} />
          ))}
        </div>
      </div>
    </section>
  );
}
