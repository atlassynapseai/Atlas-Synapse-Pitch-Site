"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "./section-header";

const E: [number, number, number, number] = [0.16, 1, 0.3, 1];
const BG = "#1A1520";

type Principle = {
  num: string;
  headline: string;
  body: string;
  detail: string;
  accent: string;
};

const principles: Principle[] = [
  {
    num: "01",
    headline: "Plain English over JSON.",
    body: "Every flagged failure becomes a 2-3 sentence summary at a 10th-grade reading level. Identity stripped. Business impact first.",
    detail: "Example: \"Your bot told a customer the return window is 60 days. Your policy says 30.\" Not a hallucination score.",
    accent: "#A78BFA",
  },
  {
    num: "02",
    headline: "Built for the person who buys AI, not the person who builds it.",
    body: "Galileo, LangSmith, and Arize ship developer consoles. Atlas Synapse ships an HR dashboard for AI agents. Same data, business-owner surface.",
    detail: "Configurable by a salon owner or office manager. Zero code from the buyer.",
    accent: "#F59E0B",
  },
  {
    num: "03",
    headline: "Catch it before the customer does.",
    body: "Silent failure detection runs on every agent output, post-deploy, in production. Email arrives within 5 minutes of the incident.",
    detail: "Severity tiered. Deduplicated. Linked to the trace. Plain-English description in the email itself.",
    accent: "#8FA4B8",
  },
];

export function QuoteBreakSection() {
  return (
    <section id="quote-break" className="relative overflow-hidden" style={{ background: BG }}>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-24 md:px-12 lg:py-28">
        <SectionHeader
          number="06"
          eyebrow="What we stand for"
          title={
            <>
              Three principles<br />
              that decide every feature.
            </>
          }
          subtitle="We made a bet that the next 10 million companies running AI agents will not be staffed by AI engineers. These principles keep us honest to that bet."
          tone="dark"
          accent="#F59E0B"
        />

        <div className="mt-16 grid gap-5 md:grid-cols-3 md:gap-6">
          {principles.map((p, i) => (
            <motion.figure
              key={p.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.55, ease: E, delay: i * 0.08 }}
              className="relative flex flex-col rounded-2xl p-6"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="mb-4 flex items-baseline gap-3">
                <span className="font-mono text-[28px] font-extrabold tracking-tight" style={{ color: p.accent }}>
                  {p.num}
                </span>
                <span className="h-px flex-1 self-center" style={{ background: "rgba(255,255,255,0.12)" }} />
              </div>

              <h3 className="text-[20px] font-bold leading-[1.2] tracking-[-0.01em] text-white">
                {p.headline}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.65] text-white/65">{p.body}</p>

              <p className="mt-5 border-t pt-4 text-[12px] leading-[1.55] text-white/45"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                {p.detail}
              </p>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
