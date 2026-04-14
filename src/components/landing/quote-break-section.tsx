"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const QUOTE_BG = "#1A1520";

type WordItem = {
  text: string;
  tier: 1 | 2 | 3;
  line: 1 | 2;
  highlight?: "gold" | "purple";
  color?: string;
};

const words: WordItem[] = [
  { text: "If", tier: 1, line: 1 },
  { text: "you'd", tier: 1, line: 1 },
  { text: "never", tier: 2, line: 1 },
  { text: "skip", tier: 2, line: 1 },
  { text: "HR", tier: 3, line: 1, highlight: "gold" },
  { text: "for", tier: 1, line: 1 },
  { text: "your", tier: 1, line: 1 },
  { text: "team,", tier: 2, line: 1 },
  { text: "don't", tier: 3, line: 2, color: "#E24B4A" },
  { text: "skip", tier: 2, line: 2 },
  { text: "it", tier: 1, line: 2 },
  { text: "for", tier: 1, line: 2 },
  { text: "your AI", tier: 3, line: 2, highlight: "purple" },
];

/** Desktop cumulative start delays (ms) — matches spec sequence + breaths + line gap */
const DELAYS_MS_DESKTOP = [0, 30, 70, 110, 170, 200, 230, 270, 360, 400, 430, 460, 530];

/** Mobile: shorter drops, faster stagger, ~0.8s total feel */
const DELAYS_MS_MOBILE = [0, 20, 46, 72, 118, 138, 158, 188, 248, 276, 298, 318, 368];

const tierConfig = {
  1: {
    spring: { type: "spring" as const, damping: 14, stiffness: 400, mass: 0.2 },
    staggerMs: 30,
    yDesktop: -12,
    yMobile: -8,
    opacityTo: 0.7,
    scaleFrom: 1,
    scaleTo: 1,
  },
  2: {
    spring: { type: "spring" as const, damping: 10, stiffness: 300, mass: 0.4 },
    staggerMs: 40,
    yDesktop: -25,
    yMobile: -16,
    opacityTo: 1,
    scaleFrom: 0.95,
    scaleTo: 1,
  },
  3: {
    spring: { type: "spring" as const, damping: 7, stiffness: 250, mass: 0.7 },
    staggerMs: 40,
    yDesktop: -40,
    yMobile: -24,
    opacityTo: 1,
    scaleFrom: 0.88,
    scaleTo: 1,
  },
};

type Particle = { left: string; top: string; size: number; gold: boolean; duration: number; delay: number; dx: string; dy: string };

const PARTICLES_DESKTOP: Particle[] = [
  { left: "8%", top: "18%", size: 5, gold: true, duration: 18, delay: 0, dx: "14px", dy: "-10px" },
  { left: "22%", top: "72%", size: 4, gold: false, duration: 22, delay: 1.2, dx: "-10px", dy: "12px" },
  { left: "78%", top: "12%", size: 6, gold: true, duration: 16, delay: 0.4, dx: "12px", dy: "14px" },
  { left: "88%", top: "55%", size: 4, gold: false, duration: 24, delay: 2, dx: "-14px", dy: "-8px" },
  { left: "14%", top: "45%", size: 5, gold: false, duration: 20, delay: 0.8, dx: "8px", dy: "10px" },
  { left: "42%", top: "8%", size: 4, gold: true, duration: 19, delay: 1.5, dx: "-12px", dy: "8px" },
  { left: "55%", top: "82%", size: 5, gold: false, duration: 17, delay: 0.2, dx: "10px", dy: "-12px" },
  { left: "92%", top: "28%", size: 4, gold: true, duration: 21, delay: 2.4, dx: "-8px", dy: "14px" },
  { left: "65%", top: "38%", size: 5, gold: true, duration: 23, delay: 1, dx: "12px", dy: "10px" },
  { left: "30%", top: "88%", size: 4, gold: false, duration: 15, delay: 1.8, dx: "-10px", dy: "-10px" },
];

const PARTICLES_MOBILE: Particle[] = [
  { left: "12%", top: "22%", size: 3, gold: true, duration: 16, delay: 0, dx: "10px", dy: "-8px" },
  { left: "78%", top: "18%", size: 3, gold: false, duration: 18, delay: 0.6, dx: "-8px", dy: "8px" },
  { left: "50%", top: "78%", size: 2, gold: true, duration: 17, delay: 1.2, dx: "8px", dy: "10px" },
  { left: "88%", top: "55%", size: 3, gold: false, duration: 15, delay: 0.3, dx: "-10px", dy: "-6px" },
  { left: "25%", top: "60%", size: 2, gold: false, duration: 19, delay: 1.5, dx: "6px", dy: "-8px" },
];

function PillGold({ children }: { children: React.ReactNode }) {
  return (
    <span className="quote-pill-gold inline-block rounded-lg border border-[rgba(232,168,56,0.4)] bg-[rgba(232,168,56,0.2)] px-2.5 py-0.5 text-[#E8A838]">
      {children}
    </span>
  );
}

function PillPurple({ children }: { children: React.ReactNode }) {
  return (
    <span className="quote-pill-purple inline-block rounded-lg border border-[rgba(127,119,221,0.4)] bg-[rgba(127,119,221,0.2)] px-2.5 py-0.5 text-[#7F77DD]">
      {children}
    </span>
  );
}

function ParticleField({ particles }: { particles: Particle[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p, i) => (
        <span
          key={i}
          className="quote-particle absolute rounded-full"
          style={
            {
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: p.gold ? "rgba(232,168,56,0.15)" : "rgba(127,119,221,0.15)",
              "--dx": p.dx,
              "--dy": p.dy,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

export function QuoteBreakSection() {
  const reduceMotion = useReducedMotion();
  /** Avoid hydration mismatch: assume desktop until mounted, then read matchMedia. */
  const [mobile, setMobile] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const fn = () => setMobile(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  const delaysMs = mobile ? DELAYS_MS_MOBILE : DELAYS_MS_DESKTOP;
  const lastWordStartSec = delaysMs[delaysMs.length - 1]! / 1000;
  const attributionDelaySec = reduceMotion ? 0.06 : lastWordStartSec + 0.72 + 0.2;

  return (
    <section
      id="quote-break"
      className="relative isolate overflow-x-clip px-5 py-[60px] md:px-8"
      style={{
        background: `
          radial-gradient(ellipse 70% 55% at 50% 45%, rgba(127, 119, 221, 0.06) 0%, transparent 55%),
          ${QUOTE_BG}
        `,
      }}
    >
      <ParticleField particles={mobile ? PARTICLES_MOBILE : PARTICLES_DESKTOP} />

      <div
        className="pointer-events-none absolute left-6 top-8 hidden h-px w-[120px] origin-left rotate-[35deg] md:block"
        style={{ background: "rgba(232,168,56,0.2)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-10 right-6 hidden h-px w-[120px] origin-right rotate-[35deg] md:block"
        style={{ background: "rgba(127,119,221,0.2)" }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-[900px] text-center">
        <p className="font-sans text-[32px] font-extrabold leading-[1.1] tracking-[-0.02em] text-white md:text-[54px]">
          {words.map((w, i) => {
            const cfg = tierConfig[w.tier];
            const delaySec = delaysMs[i]! / 1000;
            const y0 = mobile ? (w.tier === 1 ? cfg.yMobile : w.tier === 2 ? cfg.yMobile : cfg.yMobile) : w.tier === 1 ? cfg.yDesktop : w.tier === 2 ? cfg.yDesktop : cfg.yDesktop;
            const showBr = i > 0 && words[i - 1]!.line === 1 && w.line === 2;

            const inner =
              w.highlight === "gold" ? (
                <PillGold>{w.text}</PillGold>
              ) : w.highlight === "purple" ? (
                <PillPurple>{w.text}</PillPurple>
              ) : (
                <span style={w.color ? { color: w.color } : undefined}>{w.text}</span>
              );

            if (reduceMotion) {
              return (
                <React.Fragment key={`${w.text}-${i}`}>
                  {showBr ? <br /> : null}
                  <span className={cn("mr-[0.3em] inline-block", w.tier === 1 && "opacity-70")}>{inner}</span>
                </React.Fragment>
              );
            }

            return (
              <React.Fragment key={`${w.text}-${i}`}>
                {showBr ? <br className="block" /> : null}
                <motion.span
                  className="mr-[0.3em] inline-block align-top"
                  initial={{ y: y0, opacity: 0, scale: cfg.scaleFrom }}
                  whileInView={{ y: 0, opacity: cfg.opacityTo, scale: cfg.scaleTo }}
                  viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
                  transition={{
                    ...cfg.spring,
                    delay: delaySec,
                  }}
                >
                  {inner}
                </motion.span>
              </React.Fragment>
            );
          })}
        </p>

        <motion.div
          className="mx-auto mt-5 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{
            opacity: {
              duration: reduceMotion ? 0 : 0.15,
              delay: reduceMotion ? 0 : attributionDelaySec,
            },
            scale: {
              duration: reduceMotion ? 0 : 0.15,
              delay: reduceMotion ? 0 : attributionDelaySec,
            },
          }}
        >
          <div className="mb-4 h-px w-[60px] bg-[rgba(255,255,255,0.15)]" aria-hidden />
          <p className="text-[13px] font-medium tracking-[0.1em] text-[#6B7280]">ATLAS SYNAPSE</p>
        </motion.div>
      </div>
    </section>
  );
}
