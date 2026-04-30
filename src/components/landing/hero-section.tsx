"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "./magnetic-button";
import { LANDING } from "@/lib/landing-palette";

const E: [number, number, number, number] = [0.16, 1, 0.3, 1];

const UNIVERSITIES = [
  { name: "Oxford", style: "serif italic" as const },
  { name: "Carnegie Mellon", style: "smallcaps" as const },
  { name: "Northeastern", style: "smallcaps" as const },
  { name: "University of Virginia", style: "serif italic" as const },
  { name: "UW-Madison", style: "smallcaps" as const },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: LANDING.hero.gradient }}>
      {/* Subtle grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
        }}
      />

      {/* Soft pink + indigo glow corners for color variety */}
      <div
        className="pointer-events-none absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(232,121,166,0.12), transparent 70%)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 top-1/4 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(167,139,250,0.12), transparent 70%)" }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-32 pt-32 md:px-10 lg:pt-40">
        {/* Centered hero stack */}
        <div className="flex flex-col items-center text-center">
          {/* Meta rail */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: E, delay: 0.05 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <span
              className="rounded-full px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.18em]"
              style={{
                background: "rgba(245,158,11,0.12)",
                color: "#F59E0B",
                border: "1px solid rgba(245,158,11,0.3)",
              }}
            >
              Early access · April 2026
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
              Atlas Synapse · The HR Department for Your AI
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: E, delay: 0.1 }}
            className="mt-8 max-w-[1000px] text-[52px] font-extrabold leading-[0.96] tracking-[-0.04em] text-white md:text-[80px] lg:text-[104px]"
          >
            Every company has HR.
            <br />
            <span className="text-white/85">Your AI agents</span>{" "}
            <span className="italic" style={{ color: "#E879A6" }}>
              don&apos;t.
            </span>
          </motion.h1>

          {/* Supporting */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: E, delay: 0.22 }}
            className="mt-8 max-w-[680px] text-[18px] leading-[1.55] text-white/65 md:text-[20px]"
          >
            Atlas Synapse is the monitoring console that watches your AI agents the way HR
            watches employees. Performance reviews, incident reports, real dollar ROI. In
            plain English, for the person who buys AI, not the person who builds it.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: E, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <MagneticButton
              href="#waitlist"
              className="rounded-[12px] px-9 py-[18px] text-[15px] font-bold text-white transition-transform hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, #F59E0B 0%, #E879A6 100%)",
                boxShadow: "0 8px 32px rgba(232,121,166,0.28)",
              }}
            >
              Get notified at launch
            </MagneticButton>
            <MagneticButton
              href="https://atlassynapseai.com/MVP/demo"
              className="rounded-[12px] border px-9 py-[18px] text-[15px] font-bold text-white/85 transition-colors hover:bg-white/[0.04]"
              style={{ borderColor: "rgba(255,255,255,0.18)" }}
            >
              See live walkthrough &rarr;
            </MagneticButton>
            <MagneticButton
              href="/priority-access"
              className="rounded-[12px] border px-9 py-[18px] text-[15px] font-bold text-white/85 transition-colors hover:bg-white/[0.04]"
              style={{ borderColor: "rgba(255,255,255,0.18)" }}
            >
              Apply to beta
            </MagneticButton>
          </motion.div>

          {/* Built-by, centered with wordmark treatment */}
          <BuiltByStrip />
        </div>

        {/* "Meet the new employee" — clean two-card comparison, not sticky */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.7, ease: E }}
          className="relative mx-auto mt-28 max-w-[1100px]"
        >
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-12" style={{ background: "rgba(255,255,255,0.18)" }} />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-white/55">
              Meet the new employee
            </span>
            <span className="h-px w-12" style={{ background: "rgba(255,255,255,0.18)" }} />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            {/* PERSON card */}
            <ProfileCard
              tag="Existing employee"
              tagColor="#E879A6"
              gradient="linear-gradient(135deg, rgba(232,121,166,0.18), rgba(167,139,250,0.08))"
              ringColor="rgba(232,121,166,0.35)"
              avatar="SC"
              avatarBg="linear-gradient(135deg, #E879A6, #B8567E)"
              name="Sarah Chen"
              role="Senior Designer"
              fields={[
                { k: "Performance", v: "92%" },
                { k: "Last review", v: "Q1 2026" },
                { k: "Incidents (90d)", v: "0" },
                { k: "Comp", v: "$118,000 / yr" },
              ]}
              footer="Reviewed quarterly. HR file maintained by your ops team."
            />

            {/* AGENT card */}
            <ProfileCard
              tag="New employee · AI"
              tagColor="#F5C99B"
              gradient="linear-gradient(135deg, rgba(245,201,155,0.16), rgba(245,158,11,0.08))"
              ringColor="rgba(245,201,155,0.35)"
              avatar="AI"
              avatarBg="linear-gradient(135deg, #F5C99B, #D4823C)"
              name="Client Intake Bot"
              role="Customer Service Agent"
              fields={[
                { k: "Performance", v: "91%" },
                { k: "Last review", v: "This week" },
                { k: "Incidents (90d)", v: "3" },
                { k: "Comp", v: "$182 / mo" },
              ]}
              footer="Reviewed daily. HR file maintained by Atlas."
            />
          </div>

          <p className="mt-6 text-center text-[13px] leading-relaxed text-white/45">
            Same questions. Same scorecards. New kind of employee.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Profile card ──────────────────────────────────────────── */

function ProfileCard({
  tag,
  tagColor,
  gradient,
  ringColor,
  avatar,
  avatarBg,
  name,
  role,
  fields,
  footer,
}: {
  tag: string;
  tagColor: string;
  gradient: string;
  ringColor: string;
  avatar: string;
  avatarBg: string;
  name: string;
  role: string;
  fields: { k: string; v: string }[];
  footer: string;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-7"
      style={{
        background: gradient + ", #0E1322",
        border: `1px solid ${ringColor}`,
        boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
      }}
    >
      {/* Tag */}
      <div className="mb-5 flex items-center justify-between">
        <span
          className="rounded-full px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em]"
          style={{ background: tagColor + "1A", color: tagColor, border: `1px solid ${tagColor}40` }}
        >
          {tag}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">HR file</span>
      </div>

      {/* Avatar + name */}
      <div className="mb-6 flex items-center gap-4">
        <span
          className="flex h-14 w-14 items-center justify-center rounded-full text-[18px] font-bold text-white"
          style={{ background: avatarBg, boxShadow: "0 8px 20px rgba(0,0,0,0.35)" }}
        >
          {avatar}
        </span>
        <div>
          <p className="text-[18px] font-bold leading-tight text-white">{name}</p>
          <p className="text-[13px] text-white/55">{role}</p>
        </div>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-2 gap-x-5 gap-y-3">
        {fields.map((f) => (
          <div key={f.k} className="border-b pb-2" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/40">{f.k}</p>
            <p className="mt-0.5 text-[14px] font-semibold text-white">{f.v}</p>
          </div>
        ))}
      </div>

      <p className="mt-5 text-[12px] leading-relaxed text-white/45">{footer}</p>
    </div>
  );
}

/* ── Built-by strip ──────────────────────────────────────── */

function BuiltByStrip() {
  return (
    <div className="mt-14">
      <p className="text-center font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/35">
        Founded by alumni from
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
        {UNIVERSITIES.map((u) => (
          <Wordmark key={u.name} name={u.name} variant={u.style} />
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <span
          className="rounded-full border px-4 py-1.5 text-[11px] font-semibold"
          style={{
            borderColor: "rgba(245,158,11,0.35)",
            background: "rgba(245,158,11,0.06)",
            color: "rgba(245,158,11,0.9)",
          }}
        >
          Backed by CMU Swartz Center for Entrepreneurship
        </span>
      </div>
    </div>
  );
}

function Wordmark({ name, variant }: { name: string; variant: "serif italic" | "smallcaps" }) {
  if (variant === "serif italic") {
    return (
      <span
        className="text-[16px] italic text-white/85"
        style={{ fontFamily: "'Times New Roman', Georgia, serif", letterSpacing: "0.01em" }}
      >
        {name}
      </span>
    );
  }
  return (
    <span
      className="text-[12px] font-bold uppercase tracking-[0.16em] text-white/85"
      style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
    >
      {name}
    </span>
  );
}
