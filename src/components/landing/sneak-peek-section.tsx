"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { LANDING } from "@/lib/landing-palette";

const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const ACCENT_LINK = "#60A5FA";

const agentsHealth = [
  { name: "Client Intake Bot", accuracy: 91, tone: "green" as const },
  { name: "Document Reviewer", accuracy: 87, tone: "amber" as const },
  { name: "Scheduling Assistant", accuracy: 96, tone: "green" as const },
  { name: "Legal Research Agent", accuracy: 78, tone: "red" as const },
  { name: "Billing Follow-Up Bot", accuracy: 94, tone: "green" as const },
];

const donutSegments = [
  { pct: 0.45, color: "#F87171", label: "Incorrect information" },
  { pct: 0.3, color: "#A78BFA", label: "Hallucinated citations" },
  { pct: 0.15, color: "#FBBF24", label: "Policy violations" },
  { pct: 0.1, color: "#6B7280", label: "Other" },
];

const detailSparkline = [84, 82.5, 81, 79.8, 79, 78.2, 77.4];

function dotClass(tone: "green" | "amber" | "red") {
  if (tone === "green") return "bg-[#22C55E]";
  if (tone === "amber") return "bg-[#FBBF24]";
  return "bg-[#EF4444]";
}

function barColor(tone: "green" | "amber" | "red") {
  if (tone === "green") return "bg-[#22C55E]";
  if (tone === "amber") return "bg-[#FBBF24]";
  return "bg-[#EF4444]";
}

function textColor(tone: "green" | "amber" | "red") {
  if (tone === "green") return "text-[#4ADE80]";
  if (tone === "amber") return "text-[#FBBF24]";
  return "text-[#FCA5A5]";
}

/** Annulus sector path, angles in radians from +x axis (SVG default), sweep clockwise */
function donutWedgePath(cx: number, cy: number, rO: number, rI: number, a1: number, a2: number) {
  const large = Math.abs(a2 - a1) > Math.PI ? 1 : 0;
  const x1 = cx + rO * Math.cos(a1);
  const y1 = cy + rO * Math.sin(a1);
  const x2 = cx + rO * Math.cos(a2);
  const y2 = cy + rO * Math.sin(a2);
  const x3 = cx + rI * Math.cos(a2);
  const y3 = cy + rI * Math.sin(a2);
  const x4 = cx + rI * Math.cos(a1);
  const y4 = cy + rI * Math.sin(a1);
  return `M ${x1} ${y1} A ${rO} ${rO} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${rI} ${rI} 0 ${large} 0 ${x4} ${y4} Z`;
}

function buildDonutPaths() {
  const cx = 80;
  const cy = 80;
  const rO = 70;
  const rI = 46;
  const TAU = Math.PI * 2;
  let a = -Math.PI / 2;
  return donutSegments.map((seg) => {
    const a1 = a;
    a += seg.pct * TAU;
    const a2 = a;
    return { ...seg, d: donutWedgePath(cx, cy, rO, rI, a1, a2) };
  });
}

function MockBrowserChrome({
  url,
  children,
  size = "lg",
  className,
}: {
  url: string;
  children: React.ReactNode;
  size?: "lg" | "sm";
  className?: string;
}) {
  const isLg = size === "lg";
  return (
    <div
      className={cn("overflow-hidden border border-white/[0.06] bg-[#0D1117]", className)}
      style={{
        borderRadius: "12px 12px 8px 8px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
      }}
    >
      <div
        className={cn(
          "flex items-center border-b border-white/[0.06] bg-[#1C1F2E]",
          isLg ? "h-9 min-h-[36px] px-3" : "h-6 min-h-[24px] px-2",
        )}
      >
        <div className={cn("flex shrink-0", isLg ? "gap-[7px] pl-[12px]" : "gap-1 pl-2")}>
          <span className={cn("rounded-full bg-[#FF5F57]", isLg ? "h-2.5 w-2.5" : "h-2 w-2")} />
          <span className={cn("rounded-full bg-[#FEBC2E]", isLg ? "h-2.5 w-2.5" : "h-2 w-2")} />
          <span className={cn("rounded-full bg-[#28C840]", isLg ? "h-2.5 w-2.5" : "h-2 w-2")} />
        </div>
        <div className="flex flex-1 justify-center px-2">
          <div
            className={cn(
              "flex w-[60%] min-w-0 items-center justify-center rounded-lg bg-[#252838] font-mono text-[#9CA3AF]",
              isLg ? "px-2 py-1 text-[13px]" : "px-1.5 py-0.5 text-[10px]",
            )}
          >
            <span className="truncate">{url}</span>
          </div>
        </div>
      </div>
      <div className={cn("bg-[#0D1117]", isLg ? "p-4" : "p-3")}>{children}</div>
    </div>
  );
}

function FailureDonut({ inView }: { inView: boolean }) {
  const paths = React.useMemo(() => buildDonutPaths(), []);
  return (
    <div className="flex flex-col items-center">
      <p className="mb-3 text-center text-[10px] font-medium uppercase tracking-wider text-[#6B7280]">Failure Breakdown</p>
      <motion.svg width={160} height={160} viewBox="0 0 160 160" className="shrink-0" initial="hidden" animate={inView ? "show" : "hidden"}>
        {paths.map((p, i) => (
          <motion.path
            key={i}
            d={p.d}
            fill={p.color}
            stroke="rgba(0,0,0,0.15)"
            strokeWidth={0.5}
            variants={{
              hidden: { pathLength: 0, opacity: 0.3 },
              show: {
                pathLength: 1,
                opacity: 1,
                transition: { pathLength: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }, opacity: { duration: 0.25, delay: i * 0.12 } },
              },
            }}
          />
        ))}
        <circle cx={80} cy={80} r={38} fill="#0D1117" />
        <text x={80} y={78} textAnchor="middle" className="fill-white text-[26px] font-bold">
          25
        </text>
        <text x={80} y={96} textAnchor="middle" className="fill-[#6B7280] text-[11px]">
          incidents
        </text>
      </motion.svg>
      <ul className="mt-3 w-full max-w-[200px] space-y-1.5 text-[11px]">
        {donutSegments.map((s, i) => (
          <li key={i} className="flex items-center justify-between gap-2 text-[#9CA3AF]">
            <span className="flex min-w-0 items-center gap-1.5">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: s.color }} />
              <span className="truncate">{s.label}</span>
            </span>
            <span className="shrink-0 tabular-nums text-[#E5E7EB]">{Math.round(s.pct * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AgentHealthRow({
  agent,
  index,
  inView,
}: {
  agent: (typeof agentsHealth)[number];
  index: number;
  inView: boolean;
}) {
  return (
    <div
      className="flex h-12 min-h-[48px] items-center gap-3 rounded-[10px] border border-white/[0.06] bg-[#161B26] px-3"
    >
      <span className={cn("h-2 w-2 shrink-0 rounded-full", dotClass(agent.tone))} />
      <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-white">{agent.name}</span>
      <div className="flex w-[120px] shrink-0 items-center gap-2">
        <div className="h-1 w-[120px] overflow-hidden rounded-full bg-white/[0.08]">
          <motion.div
            className={cn("h-1 rounded-full", barColor(agent.tone))}
            initial={{ width: 0 }}
            animate={inView ? { width: `${agent.accuracy}%` } : { width: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
          />
        </div>
        <span className={cn("w-8 shrink-0 text-right text-[12px] font-semibold tabular-nums", textColor(agent.tone))}>
          {agent.accuracy}%
        </span>
      </div>
    </div>
  );
}

function OverallViewMock({ inView }: { inView: boolean }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <div className="rounded-[10px] border border-white/[0.06] bg-[#161B26] p-3">
          <p className="text-[11px] text-[#9CA3AF]">Agents Active</p>
          <p className="mt-1 flex items-center gap-2 text-xl font-bold text-white">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22C55E]" />
            </span>
            5
          </p>
        </div>
        <div className="rounded-[10px] border border-white/[0.06] bg-[#161B26] p-3">
          <p className="text-[11px] text-[#9CA3AF]">Overall Accuracy</p>
          <p className="mt-1 text-xl font-bold text-[#4ADE80]">89.2%</p>
          <p className="mt-0.5 text-[10px] text-[#86EFAC]/80">Up 2.1% vs last week</p>
        </div>
        <div className="rounded-[10px] border border-white/[0.06] bg-[#161B26] p-3">
          <p className="text-[11px] text-[#9CA3AF]">Incidents</p>
          <p className="mt-1 text-xl font-bold text-[#FBBF24]">25</p>
          <p className="mt-0.5 text-[10px] text-[#9CA3AF]">8 critical, 17 warning</p>
        </div>
        <div className="rounded-[10px] border border-white/[0.06] bg-[#161B26] p-3">
          <p className="text-[11px] text-[#9CA3AF]">Saved This Month</p>
          <p className="mt-1 text-[22px] font-bold leading-none text-[#FBBF24] sm:text-2xl">$12,353</p>
          <p className="mt-0.5 text-[10px] text-[#9CA3AF]">vs $14,200 baseline</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-[0.6] space-y-2">
          <p className="text-[10px] font-medium uppercase tracking-wider text-[#6B7280]">Agent health</p>
          <div className="space-y-2">
            {agentsHealth.map((a, i) => (
              <AgentHealthRow key={a.name} agent={a} index={i} inView={inView} />
            ))}
          </div>
        </div>
        <div className="flex flex-[0.4] justify-center lg:justify-end">
          <FailureDonut inView={inView} />
        </div>
      </div>

      <div className="flex flex-col gap-2 rounded-[10px] border border-white/[0.06] bg-[#161B26] px-3 py-2.5 text-[11px] leading-snug text-[#CBD5E1] sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-4">
        <div className="flex min-w-0 items-start gap-2">
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#EF4444]" />
          <span>
            <span className="tabular-nums text-[#9CA3AF]">2:14pm</span>, Legal Research Agent cited a non-existent court case
          </span>
        </div>
        <div className="flex min-w-0 items-start gap-2 sm:border-l sm:border-white/[0.06] sm:pl-4">
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#FBBF24]" />
          <span>
            <span className="tabular-nums text-[#9CA3AF]">11:22am</span>, Unverified citation in employment law research
          </span>
        </div>
        <a href="/dashboard/incidents" className="shrink-0 font-medium sm:ml-auto" style={{ color: ACCENT_LINK }}>
          View all
        </a>
      </div>
    </div>
  );
}

function InlineSparkline({ values }: { values: number[] }) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const pts = values
    .map((v, i) => `${4 + (i / (values.length - 1)) * 52},${28 - ((v - min) / range) * 18 - 6}`)
    .join(" ");
  const last = pts.split(" ").pop()!.split(",");
  return (
    <svg width={60} height={32} viewBox="0 0 60 32" className="shrink-0" aria-hidden>
      <polyline
        points={pts}
        fill="none"
        stroke="#FBBF24"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={Number(last[0])} cy={Number(last[1])} r="2" fill="#FBBF24" />
    </svg>
  );
}

function AgentLevelMock() {
  const cards = [
    {
      kind: "critical" as const,
      badge: "Critical",
      time: "Today 2:14pm",
      cost: "$0.08",
      summary:
        "Client asked about statute of limitations for medical malpractice in NJ. Bot stated 3 years. Actual limit is 2 years under N.J.S.A. 2A:14-2.",
      feedback: true,
    },
    {
      kind: "warning" as const,
      badge: "Warning",
      time: "Today 11:22am",
      cost: "$0.06",
      summary: "Rivera v. Apex Corp (2020) could not be verified. Possible hallucination.",
      feedback: false,
    },
    {
      kind: "passed" as const,
      badge: "Passed",
      time: "Yesterday 4:55pm",
      cost: "$0.05",
      summary: "Correctly summarized Smith v. Johnson (2019) regarding contractor liability.",
      feedback: false,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-[10px] border border-white/[0.06] bg-[#161B26] px-3 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-[18px] font-bold text-white">Legal Research Agent</h3>
          <span className="rounded-md bg-[#78350F]/50 px-2 py-0.5 text-[11px] font-semibold text-[#FCD34D]">Warning</span>
        </div>
        <p className="mt-1.5 text-[12px] text-[#9CA3AF]">78% accuracy, 12 failures, $421 cost this week</p>
        <div className="mt-2 flex items-center gap-2">
          <InlineSparkline values={detailSparkline} />
        </div>
      </div>

      <div className="space-y-3">
        {cards.map((c) => (
          <div
            key={c.badge + c.time}
            className={cn(
              "rounded-[10px] border border-white/[0.06] bg-[#161B26] p-3",
              c.kind === "critical" && "border-l-[3px] border-l-[#EF4444] bg-[#EF4444]/[0.08]",
              c.kind === "warning" && "border-l-[3px] border-l-[#FBBF24]",
              c.kind === "passed" && "border-l-[3px] border-l-[#22C55E]",
            )}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                  c.kind === "critical" && "bg-[#7F1D1D]/50 text-[#FCA5A5]",
                  c.kind === "warning" && "bg-[#78350F]/45 text-[#FDE68A]",
                  c.kind === "passed" && "bg-[#14532D]/45 text-[#86EFAC]",
                )}
              >
                {c.badge}
              </span>
              <div className="flex items-center gap-3 text-[11px] text-[#9CA3AF]">
                <span>{c.time}</span>
                <span className="font-medium text-[#E5E7EB]">{c.cost}</span>
              </div>
            </div>
            <p className="mt-2.5 text-[13px] font-normal leading-relaxed text-white">{c.summary}</p>
            {c.feedback ? (
              <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-white/[0.08] pt-2.5 text-[11px] text-[#9CA3AF]">
                <span>Was this alert correct?</span>
                <span className="inline-flex gap-1.5">
                  <span className="rounded border border-white/[0.1] bg-white/[0.05] px-2 py-0.5 text-[12px]">👍</span>
                  <span className="rounded border border-white/[0.1] bg-white/[0.05] px-2 py-0.5 text-[12px]">👎</span>
                </span>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 border-t border-white/[0.06] pt-3 text-[11px] text-[#9CA3AF]">
        <div className="flex flex-wrap items-center gap-1.5 text-white">
          <span>This week: 78%</span>
          <ArrowDown className="h-3.5 w-3.5 text-[#EF4444]" aria-hidden />
          <span className="text-[#EF4444]">from 84%</span>
        </div>
        <p>
          <span className="font-semibold text-[#A78BFA]">Recommendation:</span>{" "}
          <span className="text-[#9CA3AF]">Add verified case databases to reduce hallucinated citations</span>
        </p>
      </div>
    </div>
  );
}

function MiniRoiBars() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const heights = [32, 44, 52, 62, 72, 82, 94];
  return (
    <div ref={ref} className="mt-3 flex h-[72px] items-end gap-1">
      {heights.map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t bg-gradient-to-t from-[#166534] to-[#4ADE80]/90"
          initial={{ height: 0 }}
          animate={inView ? { height: `${h}%` } : { height: 0 }}
          transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  );
}

export function SneakPeekSection() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const leftMockRef = React.useRef<HTMLDivElement>(null);
  const leftInView = useInView(leftMockRef, { once: true, margin: "-12%" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });
  const rotateY = useTransform(scrollYProgress, [0, 1], [5, 0]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.45]);

  return (
    <section id="sneak-peek" ref={sectionRef} className="relative px-4 pb-10 pt-12 md:px-8 md:pb-11 md:pt-14 lg:pb-12 lg:pt-14" style={{ background: LANDING.sneak.gradient }}>
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        <polygon points="0,0 400,0 300,350 0,300" fill="rgba(99,102,241,0.07)" stroke="rgba(99,102,241,0.12)" strokeWidth="1.5" />
        <polygon points="700,0 1200,50 1100,400 650,350" fill="rgba(129,140,248,0.06)" stroke="rgba(129,140,248,0.1)" strokeWidth="1.5" />
        <polygon points="300,250 700,200 800,500 250,520" fill="rgba(45,27,105,0.04)" stroke="rgba(45,27,105,0.08)" strokeWidth="1" />
        <polygon points="1000,200 1500,150 1440,500 950,480" fill="rgba(167,139,250,0.06)" stroke="rgba(129,140,248,0.1)" strokeWidth="1" />
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EXPO_OUT }}
        className="relative z-10 mx-auto mb-6 w-full max-w-[1400px] px-5 md:px-10"
      >
        <p className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-[#B45309]">Product preview</p>
        <h2 className="mt-2 text-[38px] font-extrabold tracking-[-0.02em] text-[#1B1464] md:text-[52px] lg:text-[58px]">
          A look inside
        </h2>
        <p className="mt-2 max-w-[600px] text-[18px] text-[#3D4A5C]/80 md:text-[20px]">
          Read what your agents actually told people—in plain English.{" "}
          <span className="font-bold text-[#1B1464]">Critical mistakes surface as sentences, not buried in JSON.</span>
        </p>
      </motion.div>

      <div className="relative z-10 mx-auto mt-8 w-full max-w-[1320px] md:[perspective:1400px]">
        <motion.div style={{ opacity: glowOpacity }} className="pointer-events-none absolute -inset-8 hidden rounded-3xl bg-[#6366f1]/12 blur-[56px] md:block" />
        <motion.div style={{ rotateY }} className="relative">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-6">
            <motion.div
              className="flex min-w-0 flex-1 basis-0 flex-col"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mb-2 text-[11px] font-medium tracking-[0.05em] text-[#64748B] [font-variant:small-caps]">
                OVERALL VIEW
              </p>
              <div ref={leftMockRef}>
                <MockBrowserChrome url="app.atlassynapse.com/dashboard">
                  <OverallViewMock inView={leftInView} />
                </MockBrowserChrome>
              </div>
            </motion.div>

            <motion.div
              className="flex min-w-0 flex-1 basis-0 flex-col"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mb-2 text-[11px] font-medium tracking-[0.05em] text-[#64748B] [font-variant:small-caps]">
                AGENT LEVEL
              </p>
              <MockBrowserChrome url="app.atlassynapse.com/agents/legal-research">
                <AgentLevelMock />
              </MockBrowserChrome>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto mt-8 grid w-full max-w-[1320px] grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-4">
        {[
          {
            key: "roi",
            url: "app.atlassynapse.com/roi",
            delay: 0.08,
            body: (
              <>
                <p className="text-[9px] font-medium uppercase tracking-wider text-[#6B7280]">Monthly savings</p>
                <p className="mt-1.5 text-2xl font-bold text-[#FBBF24]">$12,353</p>
                <p className="text-[10px] text-[#9CA3AF]">saved vs $14,200 baseline</p>
                <MiniRoiBars />
              </>
            ),
          },
          {
            key: "alerts",
            url: "app.atlassynapse.com/alerts/inbox",
            delay: 0.14,
            body: (
              <>
                <p className="text-[9px] font-medium uppercase tracking-wider text-[#6B7280]">Inbox preview</p>
                <p className="mt-2 text-[10px] text-[#9CA3AF]">
                  <span className="font-semibold text-[#D1D5DB]">From:</span> Atlas Synapse Alerts
                </p>
                <p className="mt-1.5 text-[11px] font-semibold text-white">Subject: Critical, Legal Research Agent</p>
                <p className="mt-2 text-[11px] leading-relaxed text-[#CBD5E1]">
                  Your agent cited a court case that doesn&apos;t exist. Sent to a live client at 2:14pm.
                </p>
                <p className="mt-2 text-[11px] font-medium" style={{ color: ACCENT_LINK }}>
                  View full details
                </p>
              </>
            ),
          },
          {
            key: "reviews",
            url: "app.atlassynapse.com/reviews",
            delay: 0.2,
            body: (
              <>
                <p className="text-[9px] font-medium uppercase tracking-wider text-[#6B7280]">Performance review</p>
                <p className="mt-1.5 text-base font-bold text-white">Scheduling Assistant</p>
                <div className="mt-2 space-y-1 text-[11px]">
                  <p>
                    <span className="text-[#9CA3AF]">Accuracy: </span>
                    <span className="font-semibold text-[#4ADE80]">96%</span>
                  </p>
                  <p className="text-[#E5E7EB]">
                    <span className="text-[#9CA3AF]">Incidents: </span>1
                  </p>
                  <p>
                    <span className="text-[#9CA3AF]">Trend: </span>
                    <span className="font-semibold text-[#4ADE80]">↑ Improving</span>
                  </p>
                  <p>
                    <span className="text-[#9CA3AF]">ROI: </span>
                    <span className="font-semibold text-[#4ADE80]">Saved $2,289 vs $421 cost, +443%</span>
                  </p>
                </div>
                <div className="mt-2.5 rounded-lg border-l-2 border-[#A78BFA] bg-[#A78BFA]/[0.1] p-2">
                  <p className="text-[10px] leading-snug text-[#CBD5E1]">Consider expanding to handle rescheduling requests.</p>
                </div>
              </>
            ),
          },
        ].map((f) => (
          <motion.div
            key={f.key}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-6%" }}
            transition={{ duration: 0.55, delay: f.delay, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0 sm:flex-1"
          >
            <MockBrowserChrome url={f.url} size="sm">
              {f.body}
            </MockBrowserChrome>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
