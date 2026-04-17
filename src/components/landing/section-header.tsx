"use client";

import * as React from "react";
import { motion } from "framer-motion";

const E: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Tone = "dark" | "light";

export function SectionHeader({
  number,
  eyebrow,
  title,
  subtitle,
  tone = "dark",
  accent = "#F59E0B",
  align = "left",
}: {
  number: string;
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  tone?: Tone;
  accent?: string;
  align?: "left" | "center";
}) {
  const titleColor = tone === "dark" ? "text-white" : "text-[#0A0E17]";
  const eyebrowColor = tone === "dark" ? "text-white/70" : "text-black/65";
  const subColor = tone === "dark" ? "text-white/60" : "text-black/60";
  const ruleColor = tone === "dark" ? "rgba(255,255,255,0.25)" : "rgba(10,14,23,0.25)";

  return (
    <div className={align === "center" ? "text-center" : ""}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.5, ease: E }}
        className={`flex items-baseline gap-5 ${align === "center" ? "justify-center" : ""}`}
      >
        <span
          className="font-mono text-[28px] font-extrabold tracking-[-0.02em] md:text-[34px]"
          style={{ color: accent }}
        >
          {number}
        </span>
        <span
          className="h-[2px] w-[60px] self-center"
          style={{ background: accent, opacity: 0.5 }}
        />
        <span
          className={`font-mono text-[14px] font-bold uppercase tracking-[0.22em] ${eyebrowColor}`}
        >
          {eyebrow}
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, ease: E, delay: 0.05 }}
        className={`mt-6 text-[44px] font-extrabold leading-[1.02] tracking-[-0.035em] md:text-[64px] lg:text-[80px] ${titleColor}`}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, ease: E, delay: 0.12 }}
          className={`mt-5 max-w-[640px] text-[17px] leading-[1.6] md:text-[19px] ${subColor} ${align === "center" ? "mx-auto" : ""}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
