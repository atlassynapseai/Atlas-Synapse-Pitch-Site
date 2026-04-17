"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { LANDING } from "@/lib/landing-palette";
import { SectionHeader } from "./section-header";
import { IntegrationMockup } from "./mockups/integration-mockup";
import { EvalMockup } from "./mockups/eval-mockup";
import { TriageMockup } from "./mockups/triage-mockup";

const E: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Step = {
  num: string;
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  bullets: string[];
  Mockup: React.ComponentType;
  flip: boolean;
};

const steps: Step[] = [
  {
    num: "01",
    eyebrow: "Connect",
    title: (
      <>
        Wire it up once.<br />
        Never touch it again.
      </>
    ),
    body: "Connect your AI tools through the integrations you already use. Zapier, Make, n8n, direct API. No code. No developer. Events start flowing in minutes.",
    bullets: ["5-minute setup · no engineer needed", "Works with any LLM or agent framework", "Every event captured from the moment you connect"],
    Mockup: IntegrationMockup,
    flip: false,
  },
  {
    num: "02",
    eyebrow: "Watch",
    title: (
      <>
        Every prompt.<br />
        Every response. <span className="text-[#8FA4B8]">Every check.</span>
      </>
    ),
    body: "We run every AI interaction through Atlas' evaluation layer: fact-checking, policy matching, cost analysis, hallucination scoring. All before you ever need to look.",
    bullets: ["Factual-accuracy checks against real sources", "Policy + tone + compliance scans", "Cost-per-query baselines and anomaly flags"],
    Mockup: EvalMockup,
    flip: true,
  },
  {
    num: "03",
    eyebrow: "Act",
    title: (
      <>
        When something breaks,<br />
        you&apos;ll <span className="text-[#F59E0B]">know.</span>
      </>
    ),
    body: "The moment a check fails, we tell you what happened in plain English: which agent, which client, which action to take, and whether we already applied a guardrail.",
    bullets: ["Plain-English incident summaries", "Suggested recovery action (draft retraction, notify client)", "Automatic guardrail on recurring failures"],
    Mockup: TriageMockup,
    flip: false,
  },
];

export function HowItWorksSection() {
  return (
    <section id="how" className="relative w-full overflow-hidden" style={{ background: LANDING.how.solid }}>
      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(27,20,100,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(27,20,100,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, black, transparent)",
        }}
      />
      {/* Soft pink corner glow */}
      <div
        className="pointer-events-none absolute -right-32 top-32 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(232,121,166,0.18), transparent 70%)" }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-24 md:px-12 lg:py-32">
        <SectionHeader
          number="03"
          eyebrow="How it works"
          title={
            <>
              Three things,<br />
              on autopilot.
            </>
          }
          subtitle="Connect your agents once. Atlas watches them forever. When something breaks, you'll know before your client does."
          tone="light"
          accent="#B8567E"
        />

        <div className="mt-20 space-y-28 lg:space-y-36">
          {steps.map((step, i) => (
            <StepBlock key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepBlock({ step, index }: { step: Step; index: number }) {
  const text = (
    <motion.div
      initial={{ opacity: 0, x: step.flip ? 40 : -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: E }}
      className="flex flex-col justify-center"
    >
      <div className="flex items-center gap-3">
        <span className="font-mono text-[48px] font-extrabold leading-none tracking-tight md:text-[64px]" style={{ color: "rgba(27,20,100,0.1)" }}>
          {step.num}
        </span>
        <div className="flex flex-col">
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: "#B8567E" }}>
            / {step.eyebrow}
          </span>
          <span className="mt-1 h-px w-20" style={{ background: "rgba(27,20,100,0.2)" }} />
        </div>
      </div>

      <h3 className="mt-6 text-[36px] font-extrabold leading-[1.04] tracking-[-0.025em] md:text-[48px] lg:text-[56px]" style={{ color: "#1B1464" }}>
        {step.title}
      </h3>

      <p className="mt-5 max-w-[520px] text-[17px] leading-[1.6] md:text-[18px]" style={{ color: "rgba(45,27,105,0.65)" }}>
        {step.body}
      </p>

      <ul className="mt-6 space-y-2.5">
        {step.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2.5 text-[14px]" style={{ color: "rgba(45,27,105,0.75)" }}>
            <svg viewBox="0 0 16 16" className="mt-[5px] h-3 w-3 shrink-0" fill="none">
              <circle cx="8" cy="8" r="6" stroke="#B8567E" strokeWidth="1.5" />
              <path d="M5 8l2 2 4-4" stroke="#B8567E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );

  const visual = (
    <motion.div
      initial={{ opacity: 0, x: step.flip ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: E, delay: 0.1 }}
      className={step.flip ? "lg:order-1" : ""}
    >
      <step.Mockup />
    </motion.div>
  );

  return (
    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <div className={step.flip ? "lg:order-2" : ""}>{text}</div>
      {visual}
    </div>
  );
}
