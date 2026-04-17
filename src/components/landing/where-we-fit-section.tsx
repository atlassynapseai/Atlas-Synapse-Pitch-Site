"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useInView, animate, useMotionValue } from "framer-motion";
import { LANDING } from "@/lib/landing-palette";
import { SectionHeader } from "./section-header";

const E: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Pane = {
  num: string;
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  tone: "dark" | "light";
  accent: string;
  /** Visual component for the right side */
  Visual: React.ComponentType<{ tone: "dark" | "light" }>;
};

/* ── Visuals ───────────────────────────────────────────────── */

function ObserveVisual({ tone }: { tone: "dark" | "light" }) {
  const textMuted = tone === "dark" ? "text-white/55" : "text-black/55";
  const textStrong = tone === "dark" ? "text-white" : "text-black/85";
  const cardBg = tone === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const border = tone === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const ref = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.3, once: false });

  const captured = useMotionValue(4287);
  const capturedText = React.useSyncExternalStore(
    (cb) => captured.on("change", cb),
    () => `${Math.round(captured.get()).toLocaleString()}`,
    () => "4,287",
  );

  React.useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      animate(captured, captured.get() + Math.floor(Math.random() * 6 + 2), { duration: 1, ease: "linear" });
    }, 1200);
    return () => clearInterval(id);
  }, [inView, captured]);

  const events = [
    { t: "0.12s", kind: "prompt", agent: "intake_bot" },
    { t: "0.18s", kind: "response", agent: "intake_bot" },
    { t: "0.24s", kind: "tool_call", agent: "scheduler" },
    { t: "0.31s", kind: "response", agent: "scheduler" },
    { t: "0.47s", kind: "prompt", agent: "legal_research" },
  ];

  return (
    <div ref={ref} className="rounded-2xl p-5" style={{ background: cardBg, border: `1px solid ${border}` }}>
      <div className="mb-4 flex items-baseline gap-2">
        <span className={`text-[36px] font-extrabold tabular-nums tracking-tight ${textStrong}`}>
          {capturedText}
        </span>
        <span className={`font-mono text-[11px] ${textMuted}`}>events captured today</span>
      </div>
      <div className="space-y-1 font-mono text-[10px]">
        {events.map((e, i) => (
          <motion.div
            key={e.t}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className={`flex items-center gap-3 ${textMuted}`}
          >
            <span className="w-[40px]">{e.t}</span>
            <span className="flex-1">{e.agent}</span>
            <span
              className="rounded px-1.5 py-[1px] font-semibold uppercase"
              style={{ color: "#A78BFA", background: "rgba(167,139,250,0.12)" }}
            >
              {e.kind}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function EvaluateVisual({ tone }: { tone: "dark" | "light" }) {
  const textMuted = tone === "dark" ? "text-white/55" : "text-black/55";
  const textStrong = tone === "dark" ? "text-white" : "text-black/85";
  const cardBg = tone === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const border = tone === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

  const checks = [
    { label: "Factual accuracy", score: 94, tone: "pass" as const },
    { label: "Policy compliance", score: 100, tone: "pass" as const },
    { label: "Tone match", score: 88, tone: "pass" as const },
    { label: "Cost efficiency", score: 62, tone: "warn" as const },
    { label: "Hallucination risk", score: 34, tone: "fail" as const },
  ];

  return (
    <div className="rounded-2xl p-5" style={{ background: cardBg, border: `1px solid ${border}` }}>
      <div className="mb-4 flex items-center justify-between">
        <span className={`font-mono text-[10px] uppercase tracking-[0.14em] ${textMuted}`}>
          Evaluation pass · query q_7f23a1
        </span>
        <span className="font-mono text-[10px] text-[#86A97F]">+0.8s</span>
      </div>
      <div className="space-y-3">
        {checks.map((c, i) => {
          const color = c.tone === "pass" ? "#86A97F" : c.tone === "warn" ? "#D4A35C" : "#C97070";
          return (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="mb-1 flex items-center justify-between">
                <span className={`text-[12px] font-medium ${textStrong}`}>{c.label}</span>
                <span className="font-mono text-[11px] font-bold tabular-nums" style={{ color }}>
                  {c.score}
                </span>
              </div>
              <div
                className="h-[3px] overflow-hidden rounded-full"
                style={{ background: tone === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${c.score}%` }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1.1, delay: i * 0.08 + 0.2, ease: "easeOut" }}
                  className="h-full"
                  style={{ background: color }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function EnforceVisual({ tone }: { tone: "dark" | "light" }) {
  const textMuted = tone === "dark" ? "text-white/55" : "text-black/55";
  const textStrong = tone === "dark" ? "text-white" : "text-black/85";
  const cardBg = tone === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const border = tone === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

  const rules = [
    { name: "Cross-check legal citations vs Westlaw", agent: "Legal Research", hits: 47 },
    { name: "Flag cost-per-query above $0.18", agent: "All agents", hits: 12 },
    { name: "Block expired-pricing quotes", agent: "Billing Bot", hits: 3 },
    { name: "Escalate >2 client reschedules", agent: "Scheduler", hits: 8 },
  ];

  return (
    <div className="rounded-2xl p-5" style={{ background: cardBg, border: `1px solid ${border}` }}>
      <div className="mb-4 flex items-center justify-between">
        <span className={`font-mono text-[10px] uppercase tracking-[0.14em] ${textMuted}`}>
          Active guardrails
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold text-[#86A97F]">
          <span className="h-1 w-1 animate-pulse rounded-full bg-[#86A97F]" />
          4 active
        </span>
      </div>
      <div className="space-y-2">
        {rules.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="flex items-start gap-3 rounded-lg p-2.5"
            style={{
              background: tone === "dark" ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.02)",
              border: `1px solid ${tone === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
            }}
          >
            <span
              className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
              style={{ background: "rgba(134,169,127,0.14)", color: "#86A97F" }}
            >
              ✓
            </span>
            <div className="min-w-0 flex-1">
              <p className={`truncate text-[12px] font-medium ${textStrong}`}>{r.name}</p>
              <p className={`font-mono text-[10px] ${textMuted}`}>
                {r.agent} · {r.hits} hits/wk
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Panes ─────────────────────────────────────────────────── */

const panes: Pane[] = [
  {
    num: "01",
    eyebrow: "Observe",
    title: (
      <>
        We see <span className="italic">everything</span><br />
        your AI does.
      </>
    ),
    body: "From the moment you connect us, Atlas captures every prompt, response, tool call, and decision, in real time, across every agent, every integration, every model.",
    tone: "dark",
    accent: "#A78BFA",
    Visual: ObserveVisual,
  },
  {
    num: "02",
    eyebrow: "Evaluate",
    title: (
      <>
        Then we <span className="italic">grade</span> it<br />
        against your rules.
      </>
    ),
    body: "Every interaction runs through an evaluation layer: factual accuracy, policy match, cost profile, hallucination risk. The output is a plain-English score you can act on.",
    tone: "light",
    accent: "#4B3E82",
    Visual: EvaluateVisual,
  },
  {
    num: "03",
    eyebrow: "Enforce",
    title: (
      <>
        When it breaks,<br />
        we <span className="italic">fix it</span> forever.
      </>
    ),
    body: "A failed check once is an incident. Twice is a pattern. Atlas turns patterns into guardrails, applied automatically to every future query, with no developer required.",
    tone: "dark",
    accent: "#86A97F",
    Visual: EnforceVisual,
  },
];

/* ── Parallax diamonds background ──────────────────────────── */

function ParallaxDiamonds({ progress }: { progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const y1 = useTransform(progress, [0, 1], [-80, 80]);
  const y2 = useTransform(progress, [0, 1], [60, -60]);
  const y3 = useTransform(progress, [0, 1], [-40, 40]);
  const rot1 = useTransform(progress, [0, 1], [-2, 3]);
  const rot2 = useTransform(progress, [0, 1], [4, -4]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.svg
        style={{ y: y1, rotate: rot1 }}
        className="absolute -left-20 top-[8%] h-[420px] w-[420px] opacity-60"
        viewBox="0 0 400 400"
      >
        <polygon
          points="20,200 200,20 380,200 200,380"
          fill="rgba(167,139,250,0.05)"
          stroke="rgba(167,139,250,0.12)"
          strokeWidth="1.5"
        />
      </motion.svg>
      <motion.svg
        style={{ y: y2, rotate: rot2 }}
        className="absolute -right-24 top-[35%] h-[380px] w-[380px] opacity-50"
        viewBox="0 0 400 400"
      >
        <polygon
          points="20,200 200,20 380,200 200,380"
          fill="rgba(143,164,184,0.05)"
          stroke="rgba(143,164,184,0.12)"
          strokeWidth="1.5"
        />
      </motion.svg>
      <motion.svg
        style={{ y: y3 }}
        className="absolute left-[45%] bottom-[5%] h-[300px] w-[300px] opacity-40"
        viewBox="0 0 400 400"
      >
        <polygon
          points="20,200 200,20 380,200 200,380"
          fill="rgba(245,158,11,0.03)"
          stroke="rgba(245,158,11,0.08)"
          strokeWidth="1.5"
        />
      </motion.svg>
    </div>
  );
}

/* ── Section ───────────────────────────────────────────────── */

export function WhereWeFitSection() {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      id="where-we-fit"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: LANDING.differentiators.gradient }}
    >
      {/* Grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black, transparent)",
        }}
      />
      <ParallaxDiamonds progress={scrollYProgress} />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pt-24 md:px-12 lg:pt-32">
        <SectionHeader
          number="02"
          eyebrow="Where we fit"
          title={
            <>
              The <span className="text-[#A78BFA]">translation layer</span><br />
              between your AI and you.
            </>
          }
          subtitle="Every AI agent produces a stream of raw data no business owner was ever meant to read. Atlas turns that stream into one sentence: what happened, what to do, what we already fixed."
          tone="dark"
          accent="#A78BFA"
        />
      </div>

      {/* Alternating panes */}
      <div className="relative z-10 mt-20 flex flex-col lg:mt-28">
        {panes.map((pane, i) => (
          <Pane key={pane.num} pane={pane} index={i} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}

/* ── Pane component with scroll parallax slide ─────────────── */

function Pane({ pane, index, progress }: { pane: Pane; index: number; progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const isDark = pane.tone === "dark";
  const paneRef = React.useRef<HTMLDivElement | null>(null);

  // Per-pane scroll progress
  const { scrollYProgress: paneProgress } = useScroll({
    target: paneRef,
    offset: ["start end", "end start"],
  });

  // Opposite-side slide based on flip
  const flip = index % 2 === 1;
  const textX = useTransform(paneProgress, [0, 0.5, 1], [flip ? 80 : -80, 0, flip ? -40 : 40]);
  const visualX = useTransform(paneProgress, [0, 0.5, 1], [flip ? -80 : 80, 0, flip ? 40 : -40]);
  const bgShift = useTransform(paneProgress, [0, 1], [30, -30]);

  const bg = isDark
    ? "linear-gradient(180deg, #0A0E17 0%, #0E1424 100%)"
    : "linear-gradient(180deg, #FAF8F5 0%, #F1EDE6 100%)";
  const textColor = isDark ? "text-white" : "text-[#1B1464]";
  const subColor = isDark ? "text-white/55" : "text-[#2D1B69]/55";
  const eyebrowColor = isDark ? "text-white/45" : "text-[#2D1B69]/50";
  const ruleColor = isDark ? "rgba(255,255,255,0.15)" : "rgba(27,20,100,0.15)";

  return (
    <div
      ref={paneRef}
      className="relative overflow-hidden"
      style={{ background: bg }}
    >
      {/* Subtle top/bottom edge glow */}
      <motion.div
        style={{ y: bgShift }}
        className="pointer-events-none absolute inset-x-0 -top-20 h-40"
        aria-hidden
      >
        <div
          className="h-full w-full"
          style={{
            background: `radial-gradient(ellipse 50% 60% at 50% 50%, ${pane.accent}14 0%, transparent 70%)`,
          }}
        />
      </motion.div>

      <div className="relative mx-auto grid w-full max-w-[1400px] items-center gap-12 px-6 py-24 md:px-12 lg:grid-cols-2 lg:gap-20 lg:py-32">
        {/* Text */}
        <motion.div style={{ x: textX }} className={`flex flex-col ${flip ? "lg:order-2" : ""}`}>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[14px] font-bold tracking-[0.14em]" style={{ color: pane.accent }}>
              {pane.num}
            </span>
            <span className="h-px w-20" style={{ background: ruleColor }} />
            <span className={`font-mono text-[12px] font-semibold uppercase tracking-[0.18em] ${eyebrowColor}`}>
              / {pane.eyebrow}
            </span>
          </div>

          <h3 className={`mt-6 text-[40px] font-extrabold leading-[1.04] tracking-[-0.03em] md:text-[54px] lg:text-[64px] ${textColor}`}>
            {pane.title}
          </h3>

          <p className={`mt-5 max-w-[520px] text-[17px] leading-[1.6] md:text-[18px] ${subColor}`}>
            {pane.body}
          </p>
        </motion.div>

        {/* Visual */}
        <motion.div style={{ x: visualX }} className={flip ? "lg:order-1" : ""}>
          <pane.Visual tone={pane.tone} />
        </motion.div>
      </div>
    </div>
  );
}
