"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { LANDING } from "@/lib/landing-palette";

function borderStrong(hex: string) {
  return `color-mix(in srgb, ${hex} 68%, transparent)`;
}

type Note = {
  label: string;
  description: string;
  bg: string;
  border: string;
  titleColor: string;
  descColor: string;
  stripBg: string;
  stripLine1: React.ReactNode;
  stripLine2: React.ReactNode;
  rotateDeg: number;
  icon: React.ReactNode;
};

const creamCtx = "#5C4A32";
const creamDark = "#3A2D20";
const purpleCtx = "#4B3A78";
const purpleDark = "#2E1065";
const purpleArrow = "#7C3AED";
const coralCtx = "#6B3030";
const coralDark = "#5C1515";
const greenCtx = "#06402F";
const greenDark = "#022C22";
const goldCtx = "#6B3A0C";
const goldDark = "#5C2E08";
const goldMuted = "rgba(92, 46, 8, 0.42)";
const blueCtx = "#1E3A6E";
const blueDark = "#0F2547";

const notes: Note[] = [
  {
    label: "Plug & Play",
    description: "One click. No code. No developer.",
    bg: "#F0EBE1",
    border: "#A89880",
    titleColor: "#5C4A32",
    descColor: "#6D5D4A",
    stripBg: "#E2DBCF",
    rotateDeg: 1.2,
    stripLine1: (
      <span className="text-[12px] font-medium leading-snug" style={{ color: creamCtx }}>
        🔌 Connected via{" "}
        <span className="font-semibold" style={{ color: creamDark, fontWeight: 600 }}>
          Zapier
        </span>
      </span>
    ),
    stripLine2: (
      <span className="mt-0.5 block text-[12px] font-normal leading-snug" style={{ color: creamCtx }}>
        Client Intake Bot · Live in{" "}
        <span className="font-semibold" style={{ color: creamDark, fontWeight: 600 }}>
          2 minutes
        </span>
      </span>
    ),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#5C4A32" strokeWidth="1.75" className="h-7 w-7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22v-5" />
        <path d="M9 12V7a1 1 0 011-1h4a1 1 0 011 1v5" />
        <path d="M7 12h10" />
        <path d="M8 7V4a2 2 0 012-2h4a2 2 0 012 2v3" />
      </svg>
    ),
  },
  {
    label: "Agent Performance Reviews",
    description: "Weekly accuracy, failures, trends",
    bg: "#D8D0F0",
    border: "#6D28D9",
    titleColor: "#3B0764",
    descColor: "#4C3A68",
    stripBg: "#C8BEE4",
    rotateDeg: -2.2,
    stripLine1: (
      <span className="text-[12px] font-medium leading-snug" style={{ color: purpleCtx }}>
        📋 Scheduling Assistant — Week of Apr 7
      </span>
    ),
    stripLine2: (
      <span className="mt-0.5 block text-[12px] font-normal leading-snug" style={{ color: purpleCtx }}>
        <span className="font-semibold" style={{ color: purpleDark, fontWeight: 600 }}>
          96% accuracy
        </span>
        <span> · 1 incident · </span>
        <span className="font-semibold" style={{ color: purpleDark, fontWeight: 600 }}>
          Improving{" "}
        </span>
        <span className="font-semibold" style={{ color: purpleArrow, fontWeight: 600 }}>
          ↑
        </span>
      </span>
    ),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#4C1D95" strokeWidth="1.8" className="h-7 w-7">
        <path
          d="M9 17v-2m3 2v-4m3 4v-6m-9 8h12a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Silent Failure Detection",
    description: "Catches wrong answers that look right",
    bg: "#FEC8C1",
    border: "#BE123C",
    titleColor: "#7F1D1D",
    descColor: "#7C2D2D",
    stripBg: "#E8A89E",
    rotateDeg: 2.1,
    stripLine1: (
      <span className="text-[12px] font-medium leading-snug" style={{ color: coralCtx }}>
        🚨{" "}
        <span className="font-semibold" style={{ color: coralDark, fontWeight: 600 }}>
          2:14pm
        </span>
        {" — "}Legal Research Agent
      </span>
    ),
    stripLine2: (
      <span className="mt-0.5 block text-[12px] font-normal leading-snug" style={{ color: coralCtx }}>
        Cited a court case that{" "}
        <span className="font-semibold" style={{ color: coralDark, fontWeight: 600 }}>
          doesn&apos;t exist
        </span>
      </span>
    ),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#991B1B" strokeWidth="1.8" className="h-7 w-7">
        <path
          d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Trace Logging & Audit",
    description: "Every action, immutable, auditable",
    bg: "#A7F3D0",
    border: "#047857",
    titleColor: "#064E3B",
    descColor: "#0D5C45",
    stripBg: "#8FDCC0",
    rotateDeg: -1.8,
    stripLine1: (
      <span className="text-[12px] font-medium leading-snug" style={{ color: greenCtx }}>
        📝 Client Intake Bot · Today{" "}
        <span className="font-semibold" style={{ color: greenDark, fontWeight: 600 }}>
          3:41pm
        </span>
      </span>
    ),
    stripLine2: (
      <span className="mt-0.5 block text-[12px] font-normal leading-snug" style={{ color: greenCtx }}>
        Quoted{" "}
        <span className="font-semibold" style={{ color: greenDark, fontWeight: 600 }}>
          $250
        </span>{" "}
        consult rate ·{" "}
        <span className="font-semibold" style={{ color: greenDark, fontWeight: 600 }}>
          ✓ Correct
        </span>
      </span>
    ),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#065F46" strokeWidth="1.8" className="h-7 w-7">
        <path
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Business ROI Engine",
    description: "Actual dollars, not token counts",
    bg: "#FDE68A",
    border: "#B45309",
    titleColor: "#78350F",
    descColor: "#854D0E",
    stripBg: "#E8CF6E",
    rotateDeg: 1.4,
    stripLine1: <span className="text-[12px] font-medium leading-snug" style={{ color: goldCtx }}>💰 This month</span>,
    stripLine2: (
      <span className="mt-0.5 block text-[12px] font-normal leading-snug" style={{ color: goldCtx }}>
        Before AI:{" "}
        <span className="font-semibold" style={{ color: goldDark, fontWeight: 600 }}>
          $14,200
        </span>{" "}
        <span style={{ color: goldMuted }}>→</span> Now:{" "}
        <span className="font-semibold" style={{ color: goldDark, fontWeight: 600 }}>
          $1,847
        </span>
      </span>
    ),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#92400E" strokeWidth="1.8" className="h-7 w-7">
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Agent Marketplace",
    description: "Browse & deploy verified agents",
    bg: "#BFDBFE",
    border: "#1D4ED8",
    titleColor: "#1E3A8A",
    descColor: "#1E4976",
    stripBg: "#A8C8F0",
    rotateDeg: -1.6,
    stripLine1: <span className="text-[12px] font-medium leading-snug" style={{ color: blueCtx }}>🏪 SmartScheduler Pro</span>,
    stripLine2: (
      <span className="mt-0.5 block text-[12px] font-normal leading-snug" style={{ color: blueCtx }}>
        <span className="font-semibold" style={{ color: blueDark, fontWeight: 600 }}>
          94% accuracy
        </span>
        <span> · 12K evaluations · </span>
        <span className="font-semibold" style={{ color: blueDark, fontWeight: 600 }}>
          $49/mo
        </span>
      </span>
    ),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#1E40AF" strokeWidth="1.8" className="h-7 w-7">
        <path
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 2.3c-.5.5-.1 1.3.6 1.3H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

/** Playful vertical nudge per column (both rows) */
function rowWrapStyle(col: number): React.CSSProperties {
  if (col === 0) return { marginTop: "6px" };
  if (col === 1) return { marginTop: "-12px" };
  return { marginTop: "10px" };
}

function StickyCard({ note, index }: { note: Note; index: number }) {
  const b = borderStrong(note.border);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: note.rotateDeg }}
      whileInView={{ opacity: 1, y: 0, rotate: note.rotateDeg }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
      whileHover={{
        y: -4,
        rotate: note.rotateDeg,
        boxShadow: "0 22px 50px rgba(0,0,0,0.28)",
        transition: { duration: 0.2 },
      }}
      className="rounded-2xl border-2 px-5 py-5 shadow-[0_14px_40px_rgba(0,0,0,0.22)] ring-1 ring-black/[0.04]"
      style={{
        background: note.bg,
        borderColor: b,
      }}
    >
      <div
        className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border-2"
        style={{
          background: note.label === "Plug & Play" ? "rgba(255,252,245,0.88)" : "rgba(255,255,255,0.72)",
          borderColor: b,
        }}
      >
        {note.icon}
      </div>
      <p className="text-[19px] font-bold leading-tight" style={{ color: note.titleColor }}>
        {note.label}
      </p>
      <p className="mt-1.5 text-[13px] font-medium leading-snug" style={{ color: note.descColor }}>
        {note.description}
      </p>
      <div className="mt-4 rounded-lg px-3 py-2.5" style={{ background: note.stripBg }}>
        <div>{note.stripLine1}</div>
        <div>{note.stripLine2}</div>
      </div>
    </motion.div>
  );
}

export function HowItWorksSection() {
  return (
    <section
      id="how"
      className="relative w-full overflow-visible pt-10 md:pt-14"
      style={{ background: LANDING.how.solid }}
    >
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        <polygon
          points="820,-40 1280,20 1180,420 680,380"
          fill="rgba(255,255,255,0.025)"
          stroke="rgba(255,255,255,0.045)"
          strokeWidth="1"
        />
        <polygon
          points="-60,320 280,280 380,720 -120,760"
          fill="rgba(255,255,255,0.02)"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
        />
        <polygon
          points="1080,480 1520,520 1420,920 980,860"
          fill="rgba(255,255,255,0.022)"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1"
        />
      </svg>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pb-10 md:px-10 lg:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-10 md:mb-12"
        >
          <p className="text-[15px] font-extrabold uppercase tracking-[0.05em] text-[#818CF8] md:text-[16px]">How it works</p>
          <h2 className="mt-3 text-[40px] font-extrabold leading-[1.08] tracking-[-0.02em] md:text-[54px] lg:text-[62px]">
            <span className="block text-white">Connect. We watch. You see.</span>
            <span className="mt-1 block text-[#F59E0B]">Here&apos;s what that gives you.</span>
          </h2>
          <p className="mt-3 max-w-[560px] text-[17px] leading-relaxed text-[#9CA3AF] md:text-[18px]">
            Everything HR does for your human team. We do the same for your AI agents.
          </p>
        </motion.div>

        <div className="relative hidden min-h-[320px] md:block">
          <div className="grid grid-cols-3 gap-5 md:gap-6">
            {notes.slice(0, 3).map((note, i) => (
              <div key={note.label} style={rowWrapStyle(i)}>
                <StickyCard note={note} index={i} />
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-3 gap-5 md:mt-7 md:gap-6">
            {notes.slice(3, 6).map((note, i) => (
              <div key={note.label} style={rowWrapStyle(i)}>
                <StickyCard note={note} index={i + 3} />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 md:hidden">
          {notes.map((note, i) => (
            <StickyCard key={note.label} note={note} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
