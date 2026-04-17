"use client";

import * as React from "react";

/**
 * Anatomy of an incident. 3-stage diagram.
 * Raw agent output → Atlas analysis layer → Plain-English alert.
 * Used in where-we-fit section. Not browser-framed. it's a systems diagram.
 */
export function AnatomyMockup() {
  return (
    <div className="w-full">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch">
        {/* Stage 1. raw agent output */}
        <Stage
          label="Raw agent output"
          tag="BEFORE"
          tagColor="#C97070"
          body={
            <div className="font-mono text-[10px] leading-relaxed text-white/55">
              <p>{"{"}</p>
              <p className="pl-3">&ldquo;model&rdquo;: &ldquo;gpt-4o&rdquo;,</p>
              <p className="pl-3">&ldquo;tokens_in&rdquo;: 412,</p>
              <p className="pl-3">&ldquo;tokens_out&rdquo;: 2435,</p>
              <p className="pl-3">&ldquo;latency_ms&rdquo;: 1284,</p>
              <p className="pl-3">&ldquo;response&rdquo;: &ldquo;...Smith v.</p>
              <p className="pl-3">Jones (Cal. 2023)...&rdquo;,</p>
              <p className="pl-3">&ldquo;finish&rdquo;: &ldquo;stop&rdquo;</p>
              <p>{"}"}</p>
            </div>
          }
        />

        <Arrow />

        {/* Stage 2. analysis layer */}
        <Stage
          label="Atlas analysis layer"
          tag="DURING"
          tagColor="#8FA4B8"
          accent
          body={
            <div className="space-y-1.5">
              {[
                { t: "Citation check", v: "fail" },
                { t: "PII scan", v: "pass" },
                { t: "Cost delta vs baseline", v: "+38%" },
                { t: "Policy match", v: "pass" },
                { t: "Hallucination score", v: "0.87" },
              ].map((r) => (
                <div key={r.t} className="flex items-center justify-between text-[10px]">
                  <span className="text-white/55">{r.t}</span>
                  <span className="font-mono font-bold"
                    style={{ color: r.v === "fail" || r.v === "0.87" ? "#C97070" : r.v === "pass" ? "#86A97F" : "#D4A35C" }}>
                    {r.v}
                  </span>
                </div>
              ))}
            </div>
          }
        />

        <Arrow />

        {/* Stage 3. plain-English alert */}
        <Stage
          label="Plain-English alert"
          tag="AFTER"
          tagColor="#86A97F"
          body={
            <div className="text-[12px] leading-snug text-white/85">
              <p className="font-semibold text-white">Legal bot hallucinated a case citation.</p>
              <p className="mt-2 text-white/55">
                One client affected. No filing yet. Recommend direct retraction.
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[10px] font-semibold"
                style={{ background: "rgba(134,169,127,0.1)", color: "#86A97F" }}>
                ✓ Guardrail applied
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}

function Stage({
  label,
  tag,
  tagColor,
  body,
  accent = false,
}: {
  label: string;
  tag: string;
  tagColor: string;
  body: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className="flex flex-col rounded-xl p-4"
      style={{
        background: accent ? "rgba(143,164,184,0.04)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${accent ? "rgba(143,164,184,0.25)" : "rgba(255,255,255,0.08)"}`,
      }}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em]" style={{ color: tagColor }}>
          {tag}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/35">{label}</span>
      </div>
      <div className="flex-1">{body}</div>
    </div>
  );
}

function Arrow() {
  return (
    <div className="hidden items-center justify-center lg:flex">
      <svg viewBox="0 0 24 12" className="w-6" fill="none">
        <path d="M1 6 H20 M16 2 L22 6 L16 10" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
