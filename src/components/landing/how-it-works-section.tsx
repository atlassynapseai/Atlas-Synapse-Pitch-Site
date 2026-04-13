"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { LANDING } from "@/lib/landing-palette";

const E: [number, number, number, number] = [0.16, 1, 0.3, 1];

const steps = [
  {
    num: "01",
    color: "#818CF8",
    label: "CONNECT",
    title: "Plug in your agents",
    body: "One click from Zapier, Make, or direct API. No code, no developer. Activity flows in under 3 minutes.",
    mockup: (
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#818CF8]/15 text-sm font-bold text-[#818CF8]">AS</div>
          <div><p className="text-sm font-semibold text-white">Atlas Synapse</p><p className="text-[10px] text-[#E8D5F5]/50">Monitoring & Evaluation</p></div>
          <span className="ml-auto rounded-md border border-[#818CF8]/40 px-3 py-1 text-[10px] font-bold text-[#818CF8]">Connect</span>
        </div>
        <div className="mt-2 flex gap-1.5">
          {["Zapier", "Make", "Direct"].map((p) => <span key={p} className="rounded bg-[#818CF8]/10 px-2 py-0.5 text-[9px] font-semibold text-[#818CF8]/70">{p}</span>)}
        </div>
      </div>
    ),
  },
  {
    num: "02",
    color: "#A78BFA",
    label: "WE WATCH",
    title: "Every output gets reviewed",
    body: "Our AI evaluates every agent response for accuracy. Catches the silent failures — wrong answers that look right.",
    mockup: (
      <div className="space-y-1.5">
        {[
          { pass: true, text: "Quoted $250 consult rate correctly" },
          { pass: false, text: "Cited a case that doesn't exist" },
          { pass: true, text: "Summarized 3 precedents accurately" },
        ].map((t, i) => (
          <div key={i} className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-1.5">
            <span className={cn("shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold", t.pass ? "bg-[#4ADE80]/15 text-[#4ADE80]" : "bg-[#F87171]/15 text-[#F87171]")}>{t.pass ? "✓ Pass" : "✗ Fail"}</span>
            <span className="text-[12px] text-[#E8D5F5]/70">{t.text}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: "03",
    color: "#F59E0B",
    label: "YOU SEE",
    title: "Plain English. Real ROI.",
    body: "What happened, why it matters, and exactly how much each agent saves — or costs — your business. No engineering degree needed.",
    mockup: (
      <div className="space-y-2">
        <div className="rounded-xl border border-[#F87171]/20 bg-[#F87171]/5 p-3">
          <p className="text-[10px] font-bold text-[#F87171]">⚠ Scheduling Assistant</p>
          <p className="mt-1 text-[12px] leading-relaxed text-[#E8D5F5]/70">Double-booked a client — misread timezone. Mountain vs Eastern.</p>
        </div>
        <div className="rounded-xl border border-[#F59E0B]/20 bg-[#F59E0B]/5 p-3">
          <p className="text-[10px] font-bold text-[#F59E0B]">$ ROI This Month</p>
          <div className="mt-1 flex items-center gap-4 text-[12px]">
            <span className="text-[#E8D5F5]/50">Before AI: <span className="font-bold text-white">$14,200</span></span>
            <span className="text-[#E8D5F5]/50">Now: <span className="font-bold text-white">$1,847</span></span>
            <span className="font-extrabold text-[#F59E0B]">Save $12,353</span>
          </div>
        </div>
      </div>
    ),
  },
];

export function HowItWorksSection() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <section id="how" ref={ref} className="relative w-full overflow-visible" style={{ background: LANDING.how.solid }}>
      {/* Strong diamond background */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        <polygon points="0,0 400,0 300,350 0,300" fill="rgba(129,140,248,0.06)" stroke="rgba(129,140,248,0.1)" strokeWidth="1.5" />
        <polygon points="700,0 1200,50 1100,400 650,350" fill="rgba(167,139,250,0.05)" stroke="rgba(167,139,250,0.08)" strokeWidth="1.5" />
        <polygon points="300,250 700,200 800,500 250,520" fill="rgba(129,140,248,0.04)" stroke="rgba(129,140,248,0.07)" strokeWidth="1" />
        <polygon points="1000,200 1500,150 1440,500 950,480" fill="rgba(232,213,245,0.04)" stroke="rgba(232,213,245,0.06)" strokeWidth="1" />
      </svg>

      <div className="relative mx-auto w-full max-w-[1400px] px-5 py-10 md:px-10 lg:py-14">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: E }}
          className="mb-6 md:mb-8">
          <p className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-[#818CF8]">How it works</p>
          <h2 className="mt-2 text-[38px] font-extrabold tracking-[-0.02em] text-white md:text-[52px] lg:text-[58px]">
            Three steps. <span className="text-[#F59E0B]">Full visibility.</span>
          </h2>
        </motion.div>

        <div className="grid gap-3 md:grid-cols-3 md:gap-4">
          {steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: E, delay: i * 0.12 }}
              className="group relative flex overflow-hidden rounded-2xl border border-white/[0.06]"
              style={{ background: "rgba(27,20,100,0.35)" }}>
              {/* Colored left stripe with step number */}
              <div className="flex w-12 shrink-0 flex-col items-center justify-start pt-5" style={{ background: `${step.color}12`, borderRight: `2px solid ${step.color}40` }}>
                <span className="text-[22px] font-extrabold" style={{ color: step.color }}>{step.num}</span>
              </div>
              <div className="flex-1 p-4 lg:p-5">
                <span className="inline-block rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: step.color, background: `${step.color}15` }}>{step.label}</span>
                <h3 className="mt-2 text-[20px] font-bold leading-tight text-white lg:text-[22px]">{step.title}</h3>
                <p className="mt-1.5 text-[13px] leading-[1.6] text-[#E8D5F5]/55">{step.body}</p>
                <div className="mt-3">{step.mockup}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
