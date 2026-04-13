"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { HeroIllustration } from "./hero-illustration";
import { MagneticButton } from "./magnetic-button";
import { LANDING } from "@/lib/landing-palette";

const E: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden" style={{ background: LANDING.hero.gradient }}>
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        <polygon points="-80,0 380,0 280,450 -80,400" fill="rgba(129,140,248,0.06)" stroke="rgba(129,140,248,0.1)" strokeWidth="1.5" />
        <polygon points="900,0 1600,0 1600,500 1100,280" fill="rgba(167,139,250,0.05)" stroke="rgba(167,139,250,0.08)" strokeWidth="1.5" />
        <polygon points="450,500 950,420 1080,800 350,880" fill="rgba(232,213,245,0.04)" stroke="rgba(232,213,245,0.07)" strokeWidth="1" />
        <polygon points="0,450 250,380 350,700 0,780" fill="rgba(129,140,248,0.05)" stroke="rgba(129,140,248,0.09)" strokeWidth="1" />
        <polygon points="600,0 900,80 800,350 500,280" fill="rgba(245,158,11,0.02)" stroke="rgba(245,158,11,0.04)" strokeWidth="1" />
      </svg>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] flex-col lg:flex-row lg:items-center lg:gap-6">
        {/* Left: text */}
        <div className="flex flex-1 flex-col justify-center px-5 pt-16 md:px-10 lg:py-12 lg:pr-0">
          {/* Pill */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: E, delay: 0.05 }}
            className="animate-breathe-glow mb-4 w-fit rounded-full border border-[#818CF8]/25 px-4 py-1.5 text-[11px] font-bold tracking-[0.08em] text-[#818CF8]">
            FOUNDING BETA OPENING SOON
          </motion.div>

          {/* Headline */}
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: E, delay: 0.1 }}
            className="text-[40px] font-extrabold leading-[1.02] tracking-[-0.03em] text-white md:text-[58px] lg:text-[70px]">
            Every company<br />has HR.
          </motion.h1>
          <motion.h2 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: E, delay: 0.18 }}
            className="mt-1 text-[40px] font-extrabold leading-[1.02] tracking-[-0.03em] text-[#A78BFA] md:text-[58px] lg:text-[70px]">
            Your AI agents <span className="text-[#F59E0B]">don&apos;t.</span>
          </motion.h2>

          {/* Subline */}
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: E, delay: 0.26 }}
            className="mt-4 max-w-[520px] text-[17px] leading-[1.7] text-[#E8D5F5]/70 md:text-[18px]">
            Atlas Synapse monitors your AI agents the way HR manages employees: <span className="font-bold text-[#F59E0B]">performance reviews</span>, <span className="font-bold text-[#F59E0B]">incident reports</span>, <span className="font-bold text-[#F59E0B]">ROI tracking</span>. Built for business owners, not engineers.
          </motion.p>

          {/* CTAs: centered, color-coded to draw the eye */}
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: E, delay: 0.34 }}
            className="mt-7 flex flex-wrap items-center gap-3">
            <MagneticButton href="#waitlist"
              className="rounded-[12px] px-10 py-4 text-[16px] font-bold text-white transition-transform hover:scale-[1.03]"
              style={{ background: "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)", boxShadow: "0 4px 32px rgba(245,158,11,0.3)" }}>
              Join the Waitlist
            </MagneticButton>
            <MagneticButton href="#sneak-peek"
              className="rounded-[12px] border-2 border-[#818CF8]/30 bg-[#818CF8]/10 px-10 py-4 text-[16px] font-bold text-[#C4B5FD] transition-colors hover:border-[#818CF8]/50 hover:bg-[#818CF8]/20">
              See What It Looks Like
            </MagneticButton>
          </motion.div>

          {/* Social proof */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 flex flex-wrap items-center gap-2 pb-6 text-[11px] font-medium uppercase tracking-[0.1em] text-[#E8D5F5]/35 lg:pb-0">
            <span>Built by a team from</span>
            {["CMU", "Oxford", "UW-Madison", "UVA"].map((u, i) => (
              <span key={u}><span className="text-[#E8D5F5]/55">{u}</span>{i < 3 && <span className="mx-1">&middot;</span>}</span>
            ))}
          </motion.div>
        </div>

        {/* Right: floating contrast cards */}
        <div className="flex flex-1 items-center justify-center px-5 pb-10 pt-6 md:px-10 lg:pb-0 lg:pt-0">
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}
