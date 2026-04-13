"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { LANDING } from "@/lib/landing-palette";

const E: [number, number, number, number] = [0.16, 1, 0.3, 1];

const items = [
  {
    label: "Agent Performance Reviews",
    sub: "Weekly accuracy, failures, trends",
    color: "#A78BFA",
    bg: "linear-gradient(155deg, rgba(32,22,52,0.98) 0%, rgba(18,12,32,0.99) 100%)",
    border: "rgba(167,139,250,0.5)",
    rotate: "-2.5deg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.8" className="h-7 w-7">
        <path d="M9 17v-2m3 2v-4m3 4v-6m-9 8h12a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Silent Failure Detection",
    sub: "Catches wrong answers that look right",
    color: "#F87171",
    bg: "linear-gradient(155deg, rgba(32,22,52,0.98) 0%, rgba(18,12,32,0.99) 100%)",
    border: "rgba(248,113,113,0.45)",
    rotate: "2deg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#F87171" strokeWidth="1.8" className="h-7 w-7">
        <path d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Business ROI Engine",
    sub: "Actual dollars, not token counts",
    color: "#FBBF24",
    bg: "linear-gradient(155deg, rgba(32,22,52,0.98) 0%, rgba(18,12,32,0.99) 100%)",
    border: "rgba(251,191,36,0.45)",
    rotate: "-1deg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="1.8" className="h-7 w-7">
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Trace Logging & Audit",
    sub: "Every action, immutable, auditable",
    color: "#34D399",
    bg: "linear-gradient(155deg, rgba(32,22,52,0.98) 0%, rgba(18,12,32,0.99) 100%)",
    border: "rgba(52,211,153,0.45)",
    rotate: "2.5deg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="1.8" className="h-7 w-7">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Agent Marketplace",
    sub: "Browse & deploy verified agents",
    color: "#C084FC",
    bg: "linear-gradient(155deg, rgba(32,22,52,0.98) 0%, rgba(18,12,32,0.99) 100%)",
    border: "rgba(192,132,252,0.5)",
    rotate: "-1.5deg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#C084FC" strokeWidth="1.8" className="h-7 w-7">
        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 2.3c-.5.5-.1 1.3.6 1.3H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function HrOrbitSection() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="relative px-5 py-10 md:px-10 lg:py-14"
      style={{ background: LANDING.hrOrbit.gradient }}
    >
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        <polygon points="0,0 450,30 350,380 0,340" fill="rgba(129,140,248,0.06)" stroke="rgba(129,140,248,0.1)" strokeWidth="1.5" />
        <polygon points="700,0 1440,50 1440,420 650,370" fill="rgba(167,139,250,0.05)" stroke="rgba(167,139,250,0.08)" strokeWidth="1.5" />
        <polygon points="300,200 700,160 800,450 250,480" fill="rgba(99,102,241,0.04)" stroke="rgba(129,140,248,0.07)" strokeWidth="1" />
        <polygon points="950,150 1440,100 1440,400 900,380" fill="rgba(129,140,248,0.05)" stroke="rgba(167,139,250,0.07)" strokeWidth="1" />
        <polygon points="80,320 380,290 450,520 50,550" fill="rgba(79,70,229,0.04)" stroke="rgba(129,140,248,0.06)" strokeWidth="1" />
        <polygon points="500,0 800,60 720,280 440,240" fill="rgba(129,140,248,0.04)" stroke="rgba(129,140,248,0.07)" strokeWidth="1" />
      </svg>

      <div className="relative z-10 mx-auto w-full max-w-[1400px]">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: E }}
          className="mb-10 md:mb-12">
          <p className="text-[14px] font-extrabold uppercase tracking-[0.12em] text-[#A78BFA]">What we replace</p>
          <h2 className="mt-2 text-[40px] font-extrabold tracking-[-0.02em] text-[#F5F3FF] md:text-[54px] lg:text-[62px]">
            The <span className="text-[#C4B5FD]">AI Management</span> Stack
          </h2>
          <p className="mt-2 max-w-[500px] text-[17px] leading-[1.6] text-[#E8D5F5]/75 md:text-[18px]">
            Everything <span className="font-bold text-[#A78BFA]">HR</span> does for your human team — we do for your AI agents.
          </p>
        </motion.div>

        {/* Desktop — scattered sticky notes with icons */}
        <div className="relative hidden min-h-[300px] md:block">
          {/* Row 1: 3 notes */}
          <div className="grid grid-cols-3 gap-5">
            {items.slice(0, 3).map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20, rotate: 0 }}
                animate={inView ? { opacity: 1, y: 0, rotate: item.rotate } : {}}
                transition={{ duration: 0.5, ease: E, delay: i * 0.12 }}
                className="rounded-2xl border px-5 py-5 shadow-[0_16px_48px_rgba(0,0,0,0.45)]"
                style={{
                  background: item.bg,
                  borderColor: item.border,
                  marginTop: i === 1 ? "-10px" : i === 2 ? "14px" : "0",
                }}
              >
                <div
                  className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border"
                  style={{ background: `${item.color}18`, borderColor: `${item.color}35` }}
                >
                  {item.icon}
                </div>
                <p className="text-[19px] font-bold leading-tight" style={{ color: item.color }}>{item.label}</p>
                <p className="mt-1.5 text-[13px] leading-snug text-[#D4C4EC]/85">{item.sub}</p>
              </motion.div>
            ))}
          </div>
          {/* Row 2: 2 notes offset */}
          <div className="mt-5 grid grid-cols-3 gap-5">
            <div />
            {items.slice(3).map((item, i) => (
              <motion.div key={i + 3}
                initial={{ opacity: 0, y: 20, rotate: 0 }}
                animate={inView ? { opacity: 1, y: 0, rotate: item.rotate } : {}}
                transition={{ duration: 0.5, ease: E, delay: 0.36 + i * 0.12 }}
                className="rounded-2xl border px-5 py-5 shadow-[0_16px_48px_rgba(0,0,0,0.45)]"
                style={{
                  background: item.bg,
                  borderColor: item.border,
                  marginTop: i === 0 ? "-6px" : "8px",
                }}
              >
                <div
                  className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border"
                  style={{ background: `${item.color}18`, borderColor: `${item.color}35` }}
                >
                  {item.icon}
                </div>
                <p className="text-[19px] font-bold leading-tight" style={{ color: item.color }}>{item.label}</p>
                <p className="mt-1.5 text-[13px] leading-snug text-[#D4C4EC]/85">{item.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="space-y-3 md:hidden">
          {items.map((item, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, ease: E, delay: i * 0.1 }}
              className="rounded-2xl border px-5 py-4 shadow-[0_12px_36px_rgba(0,0,0,0.4)]"
              style={{ background: item.bg, borderColor: item.border, transform: `rotate(${item.rotate})` }}
            >
              <div
                className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl border"
                style={{ background: `${item.color}18`, borderColor: `${item.color}35` }}
              >
                {item.icon}
              </div>
              <p className="text-[17px] font-bold leading-tight" style={{ color: item.color }}>{item.label}</p>
              <p className="mt-1 text-[13px] leading-snug text-[#D4C4EC]/85">{item.sub}</p>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 text-center text-[19px] italic leading-relaxed text-[#E8D5F5]/45 lg:text-[21px]">
          If you&apos;d never skip HR for your team — don&apos;t skip it for your AI.
        </motion.p>
      </div>
    </section>
  );
}
