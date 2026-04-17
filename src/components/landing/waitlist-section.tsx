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

      <div className="relative z-10 mx-auto w-full max-w-[600px]">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: E }}
          className="text-center">
          <h2 className="text-[28px] font-extrabold tracking-[-0.02em] text-white md:text-[40px]">
            Your AI agents are running unsupervised <span className="italic text-[#A78BFA]">right now.</span>
          </h2>
          <p className="mt-3 text-[16px] text-[#E8D5F5]/50">
            Join 200+ business owners already on the list. We&apos;ll tell you the moment we launch.
          </p>
        </motion.div>

        {/* Primary: Waitlist track */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 rounded-2xl border border-[#818CF8]/15 bg-white/[0.04] p-6">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#818CF8]/60">Join the Waitlist</p>
          <WaitlistSignupForm skin="dark" />
          <p className="mt-3 text-center text-[11px] text-[#E8D5F5]/25">No spam. Just one email when we go live.</p>
        </motion.div>

        {/* Secondary: Beta Tester track */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.28 }}
          className="mt-4 flex flex-col items-center gap-3 rounded-2xl border border-[#F59E0B]/15 bg-[#F59E0B]/[0.04] p-5 text-center">
          <p className="text-[15px] font-semibold text-[#F59E0B]">Want hands-on early access?</p>
          <p className="text-[14px] leading-relaxed text-[#E8D5F5]/50">
            Apply to become a founding beta tester. Limited spots. Beta testers get one-on-one onboarding and help shape the product.
          </p>
          <a href="/priority-access"
            className="mt-1 inline-flex items-center gap-2 rounded-[10px] border border-[#F59E0B]/35 bg-[#F59E0B]/10 px-6 py-2.5 text-[14px] font-bold text-[#F59E0B] transition-colors hover:bg-[#F59E0B]/20">
            Apply to Beta Test →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
