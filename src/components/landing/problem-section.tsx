"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/use-count-up";
import { LANDING } from "@/lib/landing-palette";

const E: [number, number, number, number] = [0.16, 1, 0.3, 1];

function Stat({ target, suffix, label, direction, delay }: {
  target: number; suffix: string; label: string; direction: "left" | "bottom" | "right"; delay: number;
}) {
  const { value, ref } = useCountUp(target);
  const initial = direction === "left" ? { opacity: 0, x: -40 } : direction === "right" ? { opacity: 0, x: 40 } : { opacity: 0, y: 30 };

  return (
    <motion.div initial={initial} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: E, delay }}
      className="flex-1 rounded-2xl border border-[#2D1B69]/10 bg-white/50 p-6 text-center">
      <span ref={ref} className="text-[52px] font-extrabold leading-none tracking-tight text-[#1B1464] md:text-[68px] lg:text-[84px]">
        {Math.round(value)}<span className="text-[#F59E0B]">{suffix}</span>
      </span>
      <p className="mx-auto mt-3 max-w-[240px] text-[15px] leading-relaxed text-[#2D1B69]/60">{label}</p>
    </motion.div>
  );
}

export function ProblemSection() {
  return (
    <section className="relative px-5 py-10 md:px-10 lg:py-14" style={{ background: LANDING.problem.solid }}>
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        <polygon points="0,0 400,40 300,350 0,300" fill="rgba(45,27,105,0.05)" stroke="rgba(45,27,105,0.08)" strokeWidth="1.5" />
        <polygon points="700,0 1200,60 1100,380 650,320" fill="rgba(232,213,245,0.35)" stroke="rgba(232,213,245,0.5)" strokeWidth="1.5" />
        <polygon points="350,200 700,160 800,420 300,450" fill="rgba(45,27,105,0.04)" stroke="rgba(45,27,105,0.06)" strokeWidth="1" />
        <polygon points="1000,100 1440,50 1440,350 950,380" fill="rgba(129,140,248,0.06)" stroke="rgba(129,140,248,0.09)" strokeWidth="1" />
      </svg>

      <div className="relative mx-auto w-full max-w-[1400px]">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: E }}>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[14px] font-bold tracking-[0.14em] text-[#F59E0B]">01</span>
            <span className="h-px w-20 bg-[#2D1B69]/20" />
            <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-[#2D1B69]/50">
              The problem
            </span>
          </div>
          <h2 className="mt-5 text-[44px] font-extrabold leading-[1.02] tracking-[-0.035em] text-[#1B1464] md:text-[64px] lg:text-[80px]">
            The <span className="text-[#F59E0B]">$47 billion</span><br />
            blind spot.
          </h2>
          <p className="mt-5 max-w-[540px] text-[18px] leading-[1.55] text-[#2D1B69]/55">
            Companies are pouring money into AI agents. Nobody is checking if they actually work.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-3">
          <Stat target={95} suffix="%" label="of AI projects show zero measurable return after deployment" direction="left" delay={0} />
          <Stat target={40} suffix="%+" label="of agent-style AI initiatives expected to fail by 2027" direction="bottom" delay={0.12} />
          <Stat target={20} suffix="+" label="monitoring tools exist, all built for engineers, none for business owners" direction="right" delay={0.24} />
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.38 }}
          className="mt-10 grid gap-4 border-t border-[#2D1B69]/10 pt-8 md:grid-cols-2 md:gap-6">
          <div>
            <p className="text-[17px] leading-[1.75] text-[#2D1B69]/70">
              Your AI agent told a client the wrong refund window. Your legal bot cited a case that doesn&apos;t exist. Your sales assistant quoted a price that expired last quarter.
            </p>
            <p className="mt-3 text-[17px] leading-[1.75] text-[#2D1B69]/70">
              Nobody flagged any of it, because nobody was watching.
            </p>
          </div>
          <div className="flex flex-col justify-center rounded-2xl border border-[#2D1B69]/08 bg-white/40 p-5">
            <p className="text-[14px] font-semibold uppercase tracking-[0.08em] text-[#2D1B69]/40">The market reality</p>
            <p className="mt-2 text-[17px] leading-relaxed text-[#2D1B69]/70">
              The AI agent market is{" "}
              <span className="font-bold text-[#1B1464]">$7.6B today</span>, growing to{" "}
              <span className="font-bold text-[#F59E0B]">$47B by 2030</span>. The tools to monitor it are all built for engineers.{" "}
              <span className="font-semibold text-[#1B1464]">These aren&apos;t edge cases. They&apos;re what happens when AI runs without oversight.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
