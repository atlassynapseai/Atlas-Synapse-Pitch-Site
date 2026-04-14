"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { LANDING } from "@/lib/landing-palette";
import { WaitlistSignupForm } from "./waitlist-signup-form";

const E: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function WaitlistSection() {
  return (
    <section id="waitlist" className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4 py-14 md:px-8 lg:py-16" style={{ background: LANDING.waitlist.gradient }}>
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        <polygon
          points="720,-20 1180,40 1080,480 620,420"
          fill="rgba(255,255,255,0.025)"
          stroke="rgba(255,255,255,0.045)"
          strokeWidth="1"
        />
        <polygon
          points="80,520 420,480 520,900 40,940"
          fill="rgba(255,255,255,0.02)"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
        />
      </svg>
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(129,140,248,0.08) 0%, transparent 70%)" }} />

      <div className="relative z-10 mx-auto w-full max-w-[520px] text-center">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: E }}
          className="text-[28px] font-extrabold tracking-[-0.02em] text-white md:text-[40px]">
          Your AI agents are running unsupervised <span className="italic text-[#A78BFA]">right now.</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-3 text-[16px] text-[#E8D5F5]/50">
          Join the founding beta. Be the first to see what they&apos;re actually doing.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-8">
          <WaitlistSignupForm skin="dark" />
        </motion.div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="mt-8 text-[11px] text-[#E8D5F5]/30">
          Backed by CMU Swartz Center for Entrepreneurship
        </motion.p>
      </div>
    </section>
  );
}
