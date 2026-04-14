"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { isValidName, isValidEmailShape, normalizeName } from "@/lib/waitlist-validation";
import { supabase } from "@/lib/supabase";

const PRIORITY_HREF =
  "mailto:company@atlassynapseai.com?subject=Priority%20access%20%E2%80%94%20waitlist&body=Please%20share%20your%20company%20name%20and%20why%20you%E2%80%99d%20like%20early%20access.";

type Skin = "dark" | "light";

async function verifyEmailDomain(email: string): Promise<{ ok: true } | { ok: false; code: string }> {
  try {
    const res = await fetch("/api/waitlist/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim().toLowerCase() }),
    });
    const data = (await res.json()) as { ok?: boolean; code?: string };
    if (data.ok) return { ok: true };
    return { ok: false, code: typeof data.code === "string" ? data.code : "unknown" };
  } catch {
    return { ok: false, code: "network" };
  }
}

function errorMessage(code: string): string {
  switch (code) {
    case "invalid_format":
    case "invalid_domain":
      return "Use a real work email (no disposable inboxes).";
    case "no_mx":
      return "That domain doesn’t accept mail yet. Double-check the address.";
    case "dns_unavailable":
    case "network":
      return "Couldn’t verify the domain. Check your connection and try again.";
    default:
      return "Something went wrong. Try again in a moment.";
  }
}

const LS_KEY = "atlas-waitlist-signups";

function persistSignup(name: string, email: string) {
  try {
    const raw = localStorage.getItem(LS_KEY);
    const list = (raw ? JSON.parse(raw) : []) as { name: string; email: string }[];
    const e = email.trim().toLowerCase();
    if (!list.some((x) => x.email === e)) list.push({ name: normalizeName(name), email: e });
    localStorage.setItem(LS_KEY, JSON.stringify(list));
  } catch {
    /* demo */
  }
}

async function saveToSupabase(name: string, email: string) {
  try {
    if (!supabase) {
      console.warn("Supabase not configured - data saved to localStorage only");
      return false;
    }
    const { error } = await supabase.from("waitlist_signups").insert([
      {
        name: normalizeName(name),
        email: email.trim().toLowerCase(),
        created_at: new Date().toISOString(),
      },
    ]);
    if (error) {
      console.error("Supabase error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Failed to save to Supabase:", err);
    return false;
  }
}

export function WaitlistSignupForm({ skin, className }: { skin: Skin; className?: string }) {
  const addWaitlistSignup = useAppStore((s) => s.addWaitlistSignup);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [state, setState] = React.useState<"idle" | "loading" | "done">("idle");

  const isDark = skin === "dark";
  const field =
    isDark
      ? "w-full border-0 border-b border-white/15 bg-transparent py-3.5 text-[16px] text-white outline-none placeholder:text-[#E8D5F5]/35 focus:border-[#A78BFA]/70 focus:ring-0"
      : "w-full border-0 border-b border-slate-300 bg-transparent py-3.5 text-[16px] text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#1A3A5C] focus:ring-0 dark:border-slate-600 dark:text-slate-100 dark:placeholder:text-slate-500";
  const shell =
    isDark
      ? "rounded-2xl border border-white/[0.08] bg-[#1C1658]/25 px-4 pt-1 pb-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm md:px-5"
      : "rounded-2xl border border-slate-200/90 bg-white/80 px-4 pt-1 pb-4 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-950/50 md:px-5";
  const btn =
    isDark
      ? "mt-5 flex h-12 w-full items-center justify-center rounded-xl text-[15px] font-bold text-white transition-transform hover:scale-[1.01] disabled:opacity-60"
      : "mt-5 flex h-12 w-full items-center justify-center rounded-xl text-[15px] font-bold text-white transition-transform hover:scale-[1.01] disabled:opacity-60 bg-[#1A3A5C] hover:bg-[#14314d]";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (state !== "idle") return;
    const n = normalizeName(name);
    const em = email.trim().toLowerCase();
    if (!isValidName(n)) {
      setError("Add your full name (at least two characters).");
      return;
    }
    if (!isValidEmailShape(em)) {
      setError("Enter a valid email on a real domain (no disposable addresses).");
      return;
    }
    setState("loading");
    const verified = await verifyEmailDomain(em);
    if (!verified.ok) {
      setState("idle");
      setError(errorMessage(verified.code));
      return;
    }
    try {
      const raw = localStorage.getItem(LS_KEY);
      const list = (raw ? JSON.parse(raw) : []) as { name: string; email: string }[];
      if (list.some((x) => x.email === em)) {
        setState("done");
        return;
      }
    } catch {
      /* */
    }
    persistSignup(n, em);
    await saveToSupabase(n, em);
    addWaitlistSignup({ name: n, email: em });
    setState("done");
  }

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {state !== "done" ? (
          <motion.div key="form" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.2 }}>
            <form onSubmit={onSubmit} className={shell} noValidate>
              <div className="flex flex-col gap-0 md:flex-row md:items-stretch md:gap-6">
                <label
                  className={`group flex-1 md:border-r md:pr-6 ${isDark ? "md:border-white/[0.08]" : "md:border-slate-200 dark:md:border-slate-600"}`}
                >
                  <span className="sr-only">Full name</span>
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    inputMode="text"
                    spellCheck={false}
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError(null);
                    }}
                    className={field}
                    disabled={state === "loading"}
                  />
                </label>
                <label className="flex-1">
                  <span className="sr-only">Email</span>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="Work email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(null);
                    }}
                    className={field}
                    disabled={state === "loading"}
                  />
                </label>
              </div>
              {error ? (
                <p className={`mt-3 text-left text-[13px] leading-snug ${isDark ? "text-amber-200/90" : "text-amber-700 dark:text-amber-300"}`} role="alert">
                  {error}
                </p>
              ) : null}
              <button
                type="submit"
                disabled={state === "loading"}
                className={btn}
                style={
                  isDark
                    ? { background: "linear-gradient(135deg, #2D1B69, #818CF8)", boxShadow: "0 4px 24px rgba(129,140,248,0.2)" }
                    : undefined
                }
              >
                {state === "loading" ? <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : "Join the waitlist"}
              </button>
            </form>
            <p className={`mt-5 text-center text-[13px] ${isDark ? "text-[#E8D5F5]/45" : "text-slate-600 dark:text-slate-400"}`}>
              Need a faster lane?{" "}
              <a
                href={PRIORITY_HREF}
                className={`font-semibold underline decoration-1 underline-offset-4 ${isDark ? "text-[#C4B5FD] decoration-[#C4B5FD]/40 hover:text-white" : "text-[#1A3A5C] decoration-[#1A3A5C]/30 hover:underline dark:text-[#A78BFA]"}`}
              >
                Request priority access
              </a>
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex flex-col items-center gap-3 py-6"
          >
            <svg width="56" height="56" viewBox="0 0 64 64" aria-hidden>
              <circle cx="32" cy="32" r="30" fill="none" stroke={isDark ? "#818CF8" : "#1A3A5C"} strokeWidth="2" strokeOpacity="0.3" />
              <motion.path
                d="M20 32 L28 40 L44 24"
                fill="none"
                stroke={isDark ? "#818CF8" : "#1A3A5C"}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </svg>
            <p className={`text-lg font-bold ${isDark ? "text-white" : "text-[#1A3A5C] dark:text-white"}`}>You&apos;re on the list.</p>
            <p className={`text-sm ${isDark ? "text-[#E8D5F5]/50" : "text-slate-600 dark:text-slate-400"}`}>We&apos;ll reach out when your spot opens.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
