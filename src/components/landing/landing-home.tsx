"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowRight, CheckCircle2, Shield, TrendingUp, Zap } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/theme-toggle";

const fade = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.45 },
};

export function LandingHome() {
  const addWaitlistEmail = useAppStore((s) => s.addWaitlistEmail);
  const [email, setEmail] = React.useState("");

  function onWaitlist(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email.");
      return;
    }
    addWaitlistEmail(email.trim());
    try {
      const existing = JSON.parse(localStorage.getItem("atlas-waitlist-emails") ?? "[]") as string[];
      if (!existing.includes(email.trim())) existing.push(email.trim());
      localStorage.setItem("atlas-waitlist-emails", JSON.stringify(existing));
    } catch {
      /* demo only */
    }
    toast.success("You're on the list! We'll reach out soon.");
    setEmail("");
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="text-sm font-semibold tracking-tight text-[#1A3A5C] dark:text-slate-100">
            Atlas Synapse
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-slate-600 dark:text-slate-300 md:flex">
            <a href="#problem" className="hover:text-[#1A3A5C] dark:hover:text-white">
              Why it matters
            </a>
            <a href="#how" className="hover:text-[#1A3A5C] dark:hover:text-white">
              How it works
            </a>
            <a href="#features" className="hover:text-[#1A3A5C] dark:hover:text-white">
              Highlights
            </a>
            <a href="#waitlist" className="hover:text-[#1A3A5C] dark:hover:text-white">
              Waitlist
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
              <Link href="/login">See the demo</Link>
            </Button>
            <Button asChild size="sm" className="bg-[#1A3A5C] hover:bg-[#14314d]">
              <a href="#waitlist">Join the beta waitlist</a>
            </Button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 pb-20 pt-16 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-medium text-[#2E75B6]">Atlas Synapse</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-[#1A3A5C] dark:text-white md:text-5xl">
            The HR Department for Your AI
          </h1>
          <p className="mt-4 text-balance text-lg text-slate-600 dark:text-slate-300">
            Monitor, evaluate, and manage your AI agents in plain English. Know when they fail. Know if they&apos;re
            worth it.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-[#1A3A5C] px-8 hover:bg-[#14314d]">
              <a href="#waitlist">Join the beta waitlist</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="px-8">
              <Link href="/login">
                See the demo <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          {...fade}
          className="mx-auto mt-16 grid max-w-5xl gap-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/40 md:grid-cols-3"
        >
          <div className="rounded-xl border border-slate-200/80 bg-white p-4 text-left shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Snapshot</p>
            <p className="mt-2 text-2xl font-semibold text-[#1A3A5C] dark:text-white">Plain English</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Every output summarized the way a partner would explain it to a client.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200/80 bg-white p-4 text-left shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Business view</p>
            <p className="mt-2 text-2xl font-semibold text-[#1A3A5C] dark:text-white">Accuracy & cost</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Quality, failures, and dollars, not internal engineering metrics.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200/80 bg-white p-4 text-left shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Quiet problems</p>
            <p className="mt-2 text-2xl font-semibold text-[#1A3A5C] dark:text-white">Silent misses</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Catch wrong answers before they become reputational or legal risk.
            </p>
          </div>
        </motion.div>
      </section>

      <section id="problem" className="border-y border-slate-200/80 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-4">
          <motion.h2 {...fade} className="text-center text-2xl font-semibold text-[#1A3A5C] dark:text-white">
            The AI gap is a business gap
          </motion.h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                stat: "95%",
                cite: "MIT",
                text: "of AI projects show zero measurable return, often because nobody is watching quality after launch.",
              },
              {
                stat: "40%+",
                cite: "Gartner",
                text: "of agent-style AI initiatives are expected to wash out by 2027 without operational guardrails.",
              },
              {
                stat: "20+",
                cite: "Industry",
                text: "monitoring tools exist, but almost all speak engineer. Owners still fly blind on reliability and ROI.",
              },
            ].map((c) => (
              <motion.div key={c.stat} {...fade}>
                <Card className="h-full border-slate-200/80 dark:border-slate-800">
                  <CardContent className="p-6">
                    <p className="text-4xl font-semibold text-[#1A3A5C] dark:text-white">{c.stat}</p>
                    <p className="mt-1 text-xs font-medium uppercase text-slate-500">{c.cite}</p>
                    <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{c.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="mx-auto max-w-6xl px-4 py-20">
        <motion.h2 {...fade} className="text-center text-2xl font-semibold text-[#1A3A5C] dark:text-white">
          How it works
        </motion.h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "Connect your agents",
              body: "One guided step: we pull activity in read-only mode for the platforms you already use.",
              icon: Zap,
            },
            {
              step: "2",
              title: "We review every output",
              body: "Our system reads each response like a careful reviewer: what happened, what was right, what was risky.",
              icon: Shield,
            },
            {
              step: "3",
              title: "You see the truth plainly",
              body: "Dashboards, savings, and weekly briefings written for owners, not buried in technical logs.",
              icon: TrendingUp,
            },
          ].map((s) => (
            <motion.div key={s.step} {...fade} className="relative rounded-2xl border border-slate-200/80 p-6 dark:border-slate-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A3A5C] text-sm font-bold text-white">
                {s.step}
              </div>
              <s.icon className="mt-4 h-6 w-6 text-[#2E75B6]" />
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="features" className="border-y border-slate-200/80 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-4">
          <motion.h2 {...fade} className="text-center text-2xl font-semibold text-[#1A3A5C] dark:text-white">
            Built for judgment, not jargon
          </motion.h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {[
              {
                title: "Plain-English translation",
                body: "Turn dense activity into short narratives anyone on the leadership team can understand and act on.",
                mock: "“The assistant gave a wrong filing deadline; flagged as critical.”",
              },
              {
                title: "Business savings engine",
                body: "Compare what the work used to cost people-hours versus what you spend running agents today.",
                mock: "“About $12k saved this month vs your baseline workload cost.”",
              },
              {
                title: "Silent miss detection",
                body: "Spot confident wrong answers, policy drift, and client-facing risk before it hits your brand.",
                mock: "“Three client chats included incorrect fee language.”",
              },
            ].map((f) => (
              <motion.div key={f.title} {...fade}>
                <Card className="overflow-hidden border-slate-200/80 dark:border-slate-800">
                  <div className="aspect-[4/3] bg-gradient-to-br from-[#1A3A5C] to-[#2E75B6] p-6 text-white">
                    <p className="text-sm opacity-90">Product preview</p>
                    <p className="mt-4 text-sm font-medium leading-relaxed">{f.mock}</p>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-[#1A3A5C] dark:text-white">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{f.body}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <motion.div {...fade} className="rounded-2xl border border-slate-200/80 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-950">
          <p className="text-sm font-medium text-[#6A1B9A]">Social proof</p>
          <h2 className="mt-2 text-xl font-semibold text-[#1A3A5C] dark:text-white">
            Backed by CMU Swartz Center for Entrepreneurship
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Team roots across research and applied programs, including collaborations with CMU, Oxford, UW-Madison,
            and UVA.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 opacity-80 grayscale">
            {["CMU", "Oxford", "UW-Madison", "UVA"].map((uni) => (
              <span key={uni} className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {uni}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="waitlist" className="border-t border-slate-200/80 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto max-w-lg px-4 text-center">
          <motion.h2 {...fade} className="text-2xl font-semibold text-[#1A3A5C] dark:text-white">
            Join the beta waitlist
          </motion.h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            We&apos;re onboarding a small group of legal and professional services teams. No spam: one thoughtful note
            when your slot opens.
          </p>
          <motion.form {...fade} onSubmit={onWaitlist} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <div className="flex-1 text-left">
              <Label htmlFor="email" className="sr-only">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
              />
            </div>
            <Button type="submit" className="h-11 bg-[#1A3A5C] hover:bg-[#14314d]">
              Join waitlist
            </Button>
          </motion.form>
          <p className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-500">
            <CheckCircle2 className="h-4 w-4 text-[#2E7D32]" />
            Demo mode stores your email locally in this browser only.
          </p>
        </div>
      </section>

      <footer className="border-t border-slate-200/80 py-10 dark:border-slate-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} Atlas Synapse LLC</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#features" className="hover:text-[#1A3A5C] dark:hover:text-white">
              Features
            </a>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <a href="#" className="hover:text-[#1A3A5C] dark:hover:text-white">
              About
            </a>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <a href="#" className="hover:text-[#1A3A5C] dark:hover:text-white">
              Privacy (placeholder)
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
