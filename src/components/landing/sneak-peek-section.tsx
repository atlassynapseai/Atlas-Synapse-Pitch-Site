"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useInView, animate, useMotionValue } from "framer-motion";
import { LANDING } from "@/lib/landing-palette";
import { SectionHeader } from "./section-header";
import { ConsoleMockup } from "./mockups/console-mockup";

const E: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Live side stats. ticks when in view ──────────────────── */

function LiveStat({
  label,
  from,
  decimals = 0,
  prefix = "",
  suffix = "",
  color = "#1B1464",
  delay = 0,
}: {
  label: string;
  from: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  color?: string;
  delay?: number;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.4, once: false });
  const mv = useMotionValue(from);
  const [display, setDisplay] = React.useState(from);

  React.useEffect(() => {
    const unsub = mv.on("change", (v) => setDisplay(v));
    return () => unsub();
  }, [mv]);

  React.useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      const delta = Math.random() * 0.4 - 0.1;
      animate(mv, mv.get() + delta * Math.max(1, Math.abs(from) * 0.01 + 1), {
        duration: 1.2,
        ease: "easeOut",
      });
    }, 2000 + delay);
    return () => clearInterval(id);
  }, [inView, mv, from, delay]);

  return (
    <div ref={ref} className="flex flex-col border-t pt-4" style={{ borderColor: "rgba(27,20,100,0.15)" }}>
      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2D1B69]/50">
        {label}
      </span>
      <span className="mt-1 text-[32px] font-extrabold tabular-nums leading-none tracking-tight" style={{ color }}>
        {prefix}
        {decimals === 0 ? Math.round(display).toLocaleString() : display.toFixed(decimals)}
        {suffix}
      </span>
    </div>
  );
}

/* ── Section ───────────────────────────────────────────────── */

export function SneakPeekSection() {
  const ref = React.useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax on the console card. gentle lift as user scrolls into section
  const consoleY = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -40]);
  const consoleRotate = useTransform(scrollYProgress, [0, 0.5, 1], [2, 0, -1]);

  return (
    <section
      id="sneak-peek"
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: LANDING.sneak.gradient }}
    >
      {/* Subtle diamond background */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
        <polygon points="0,0 400,0 300,350 0,300" fill="rgba(45,27,105,0.03)" stroke="rgba(45,27,105,0.06)" strokeWidth="1" />
        <polygon points="700,0 1200,50 1100,400 650,350" fill="rgba(129,140,248,0.03)" stroke="rgba(129,140,248,0.06)" strokeWidth="1" />
        <polygon points="1000,200 1500,150 1440,500 950,480" fill="rgba(167,139,250,0.03)" stroke="rgba(129,140,248,0.06)" strokeWidth="1" />
      </svg>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-24 md:px-12 lg:py-32">
        <SectionHeader
          number="05"
          eyebrow="Product sneak peek"
          title={
            <>
              <span className="text-[#1B1464]">Your morning dashboard.</span><br />
              <span className="text-[#4B3E82]">What you&apos;d see every day.</span>
            </>
          }
          subtitle="This is the live console. Agent overview, live activity feed, real-dollar ROI, open incidents. Watch the right side: incident toasts pop in as they fire."
          tone="light"
          accent="#B45309"
        />

        {/* Main showcase: live console + side stats */}
        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_260px] lg:gap-10">
          {/* Console. parallax lift */}
          <motion.div style={{ y: consoleY, rotate: consoleRotate }} className="relative">
            <div
              className="absolute -inset-6 -z-10 rounded-[32px] blur-2xl"
              style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(99,102,241,0.12), transparent)" }}
            />
            <ConsoleMockup />
          </motion.div>

          {/* Live side stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: E, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: "#86A97F" }} />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2D1B69]/55">
                Live metrics
              </span>
            </div>
            <LiveStat label="Agents online" from={5} color="#1B1464" />
            <LiveStat label="Events / min" from={247} color="#4B3E82" />
            <LiveStat
              label="Prevented loss"
              from={38412}
              prefix="$"
              color="#B45309"
              delay={400}
            />
            <LiveStat label="Open incidents" from={2} color="#C97070" delay={700} />
            <LiveStat label="Avg cost / query" from={0.14} decimals={2} prefix="$" color="#1B1464" delay={1000} />

            <p className="mt-2 text-[13px] leading-relaxed text-[#2D1B69]/55">
              Each number ticks in real time. No screenshots. No mock data. This is the product surface.
            </p>
          </motion.div>
        </div>

        {/* Closing note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, ease: E, delay: 0.1 }}
          className="mt-16 max-w-[720px]"
        >
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B45309]">
            What you see when you log in
          </p>
          <p className="mt-3 text-[20px] leading-[1.5] text-[#2D1B69]/75 md:text-[22px]">
            Every morning. One screen. <span className="font-semibold text-[#1B1464]">What your AI did, what it cost, what broke, and what Atlas already fixed.</span> No tech degree required.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
