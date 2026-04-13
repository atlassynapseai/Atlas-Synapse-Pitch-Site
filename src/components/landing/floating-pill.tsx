"use client";

import * as React from "react";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function FloatingPill() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = React.useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setVisible(v > 300));

  function handleClick() {
    const el = document.getElementById("waitlist");
    if (el) { el.scrollIntoView({ behavior: "smooth" }); setTimeout(() => { document.getElementById("waitlist-email")?.focus(); }, 700); }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3 }} whileHover={{ scale: 1.04 }} onClick={handleClick}
          className="fixed bottom-5 right-5 z-50 flex h-[48px] items-center gap-2 rounded-full border border-[#818CF8]/25 px-5 text-[13px] font-bold text-white shadow-lg"
          style={{ background: "linear-gradient(135deg, #2D1B69, #818CF8)" }}>
          <span className="pointer-events-none absolute inset-0 rounded-full border border-[#818CF8]/20" style={{ animation: "pill-ring 4s ease-out infinite" }} />
          Join Beta
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15"><ArrowUpRight className="h-3 w-3" /></span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
