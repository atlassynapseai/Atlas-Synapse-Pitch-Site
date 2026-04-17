"use client";

import * as React from "react";
import { MockupFrame } from "./mockup-frame";

/**
 * Step 02: live prompt/response evaluation split view.
 * Top: incoming prompt. Bottom: AI response with Atlas eval checks.
 */
export function EvalMockup() {
  const checks = [
    { label: "Factual accuracy", status: "fail" as const, note: "Cited case not found in Westlaw DB" },
    { label: "Policy compliance", status: "pass" as const, note: "No PII or confidential terms" },
    { label: "Tone consistency", status: "pass" as const, note: "Matches brand voice profile" },
    { label: "Cost efficiency", status: "warn" as const, note: "2,847 tokens, above avg for this query" },
  ];

  return (
    <MockupFrame url="app.atlassynapse.ai/live/legal-research-agent">
      <div className="p-4" style={{ background: "#0A0E1C", minHeight: 420 }}>
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: "#8FA4B8" }} />
            <span className="text-[12px] font-semibold text-white">Legal Research Agent</span>
            <span className="rounded px-1.5 py-[2px] font-mono text-[9px] font-bold uppercase tracking-[0.08em]"
              style={{ background: "rgba(143,164,184,0.1)", color: "#8FA4B8" }}>
              live
            </span>
          </div>
          <span className="font-mono text-[10px] text-white/35">query_id: q_7f23a1</span>
        </div>

        {/* Prompt */}
        <div className="mb-2 rounded-lg px-3 py-2.5" style={{ background: "#111726", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="mb-1 flex items-center gap-2">
            <span className="rounded px-1.5 py-[1px] font-mono text-[9px] font-bold uppercase tracking-[0.08em]"
              style={{ background: "rgba(167,139,250,0.12)", color: "#A78BFA" }}>
              prompt
            </span>
            <span className="font-mono text-[10px] text-white/35">2:14:03 PM</span>
          </div>
          <p className="text-[12px] leading-snug text-white/80">
            &ldquo;Find precedent for tenant-habitability claim in California small-claims court, specifically around mold disclosure.&rdquo;
          </p>
        </div>

        {/* Response */}
        <div className="mb-3 rounded-lg px-3 py-2.5" style={{ background: "#111726", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="mb-1 flex items-center gap-2">
            <span className="rounded px-1.5 py-[1px] font-mono text-[9px] font-bold uppercase tracking-[0.08em]"
              style={{ background: "rgba(134,169,127,0.1)", color: "#86A97F" }}>
              response
            </span>
            <span className="font-mono text-[10px] text-white/35">+1.2s · 2,847 tokens</span>
          </div>
          <p className="text-[12px] leading-snug text-white/80">
            &ldquo;Primary precedent is <span className="rounded px-1 py-[1px] font-semibold" style={{ background: "rgba(201,112,112,0.14)", color: "#D49090" }}>Smith v. Jones (Cal. 2023)</span>, which established a five-factor disclosure test…&rdquo;
          </p>
        </div>

        {/* Eval checks */}
        <div className="rounded-lg" style={{ background: "#111726", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="border-b px-3 py-2" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">Atlas evaluation</span>
          </div>
          <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
            {checks.map((c) => {
              const color = c.status === "pass" ? "#86A97F" : c.status === "warn" ? "#D4A35C" : "#C97070";
              const icon = c.status === "pass" ? "✓" : c.status === "warn" ? "!" : "✕";
              return (
                <div key={c.label} className="flex items-start gap-3 px-3 py-2"
                  style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                  <span className="mt-[2px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-bold"
                    style={{ background: color + "1A", color }}>
                    {icon}
                  </span>
                  <div className="flex-1">
                    <p className="text-[11px] font-semibold text-white/85">{c.label}</p>
                    <p className="text-[10px] text-white/45">{c.note}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}
