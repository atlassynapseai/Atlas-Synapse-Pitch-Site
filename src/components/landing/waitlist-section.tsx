"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { LANDING } from "@/lib/landing-palette";

const E: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function WaitlistSection() {
  const addWaitlistEmail = useAppStore((s) => s.addWaitlistEmail);
  const [email, setEmail] = React.useState("");
  const [state, setState] = React.useState<"idle" | "loading" | "done">("idle");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state !== "idle") return;
    if (!email.trim() || !email.includes("@")) return;
    try {
      const existing = JSON.parse(localStorage.getItem("atlas-waitlist-emails") ?? "[]") as string[];
      if (existing.includes(email.trim())) { setState("done"); return; }
      existing.push(email.trim());
      localStorage.setItem("atlas-waitlist-emails", JSON.stringify(existing));
    } catch { /* demo */ }
    addWaitlistEmail(email.trim());
    setState("loading");
    setTimeout(() => setState("done"), 600);
  }

  return (
    <section id="waitlist" className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4 py-14 md:px-8 lg:py-16" style={{ background: LANDING.waitlist.gradient }}>
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(129,140,248,0.08) 0%, transparent 70%)" }} />

      <div className="relative z-10 mx-auto w-full max-w-[500px] text-center">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: E }}
          className="text-[28px] font-extrabold tracking-[-0.02em] text-white md:text-[40px]">
          Your AI agents are running unsupervised <span className="italic text-[#A78BFA]">right now.</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-3 text-[16px] text-[#E8D5F5]/50">
          Join the founding beta. Be the first to see what they&apos;re actually doing.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-8">
          <AnimatePresence mode="wait">
            {state !== "done" ? (
              <motion.form key="form" onSubmit={onSubmit} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} className="space-y-3">
                <input id="waitlist-email" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="h-14 w-full rounded-[12px] border border-[#818CF8]/25 bg-[#1C1658]/45 px-5 text-[16px] text-white placeholder-[#E8D5F5]/30 outline-none transition-shadow focus:shadow-[0_0_0_3px_rgba(129,140,248,0.2)]" />
                <button type="submit" disabled={state === "loading"}
                  className="flex h-14 w-full items-center justify-center rounded-[12px] text-[16px] font-bold text-white transition-transform hover:scale-[1.02] disabled:opacity-70"
                  style={{ background: "linear-gradient(135deg, #2D1B69, #818CF8)", boxShadow: "0 4px 24px rgba(129,140,248,0.2)" }}>
                  {state === "loading" ? <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : "Join the Waitlist"}
                </button>
              </motion.form>
            ) : (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex flex-col items-center gap-3 py-6">
                <svg width="56" height="56" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="30" fill="none" stroke="#818CF8" strokeWidth="2" strokeOpacity="0.3" />
                  <motion.path d="M20 32 L28 40 L44 24" fill="none" stroke="#818CF8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.2 }} />
                </svg>
                <p className="text-lg font-bold text-white">You&apos;re in.</p>
                <p className="text-sm text-[#E8D5F5]/50">We&apos;ll be in touch when the beta opens.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="mt-8 text-[11px] text-[#E8D5F5]/30">
          Backed by CMU Swartz Center for Entrepreneurship
        </motion.p>
      </div>
    </section>
  );
}
