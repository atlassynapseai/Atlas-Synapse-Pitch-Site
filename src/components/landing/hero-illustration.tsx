"use client";

import { motion } from "framer-motion";

const E: [number, number, number, number] = [0.16, 1, 0.3, 1];

function Line({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 py-[10px]">
      <span className="text-[16px]">{icon}</span>
      <span className="text-[17px] leading-snug md:text-[18px]">{children}</span>
    </div>
  );
}

export function HeroIllustration() {
  return (
    <div className="flex w-full max-w-[500px] flex-col gap-5">
      {/* Top card — Managed (teal) */}
      <motion.div
        initial={{ opacity: 0, y: 24, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: -1.5 }}
        transition={{ duration: 0.7, ease: E, delay: 0.5 }}
        className="rounded-2xl border border-[#6BACA4]/25 px-6 py-5"
        style={{ background: "rgba(107,172,164,0.08)" }}
      >
        <p className="mb-3 text-[13px] font-extrabold uppercase tracking-[0.1em] text-[#6BACA4]">
          Your employees
        </p>
        <div className="divide-y divide-[#6BACA4]/10">
          <Line icon="✓"><span className="font-semibold text-[#6BACA4]">Performance</span><span className="text-[#8DC5BE]"> reviewed</span></Line>
          <Line icon="✓"><span className="font-semibold text-[#6BACA4]">Incidents</span><span className="text-[#8DC5BE]"> tracked</span></Line>
          <Line icon="✓"><span className="font-semibold text-[#6BACA4]">ROI</span><span className="text-[#8DC5BE]"> measured</span></Line>
          <Line icon="✓"><span className="text-[#8DC5BE]">Someone is </span><span className="font-semibold text-[#6BACA4]">watching</span></Line>
        </div>
      </motion.div>

      {/* Bottom card — Unmanaged (orange) */}
      <motion.div
        initial={{ opacity: 0, y: 24, rotate: 1 }}
        animate={{ opacity: 1, y: 0, rotate: 1.5 }}
        transition={{ duration: 0.7, ease: E, delay: 0.65 }}
        className="rounded-2xl border border-[#D4845A]/25 px-6 py-5"
        style={{ background: "rgba(212,132,90,0.08)" }}
      >
        <p className="mb-3 text-[13px] font-extrabold uppercase tracking-[0.1em] text-[#D4845A]">
          Your AI agents
        </p>
        <div className="divide-y divide-[#D4845A]/10">
          <Line icon="?"><span className="text-[#E0A87C]">Performance </span><span className="font-semibold text-[#D4845A]">unknown</span></Line>
          <Line icon="?"><span className="text-[#E0A87C]">Failures </span><span className="font-semibold text-[#D4845A]">invisible</span></Line>
          <Line icon="?"><span className="text-[#E0A87C]">ROI </span><span className="font-semibold text-[#D4845A]">unmeasured</span></Line>
          <Line icon="✗"><span className="font-semibold text-[#D4845A]">Nobody</span><span className="text-[#E0A87C]"> is watching</span></Line>
        </div>
      </motion.div>
    </div>
  );
}
