"use client";

import * as React from "react";
import { MockupFrame } from "./mockup-frame";

/**
 * Step 03: incident triage screen.
 * Plain-English verdict + recommended action + exposure impact.
 */
export function TriageMockup() {
  return (
    <MockupFrame url="app.atlassynapse.ai/incidents/inc_4f82d1">
      <div className="p-4" style={{ background: "#0A0E1C", minHeight: 420 }}>
        {/* Banner */}
        <div className="mb-3 flex items-center justify-between rounded-lg px-3 py-2.5"
          style={{ background: "rgba(201,112,112,0.09)", border: "1px solid rgba(201,112,112,0.25)" }}>
          <div className="flex items-center gap-2.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full"
              style={{ background: "#C97070" }}>
              <span className="font-mono text-[11px] font-bold text-white">!</span>
            </span>
            <div>
              <p className="text-[12px] font-bold text-[#D49090]">Critical incident</p>
              <p className="font-mono text-[10px] text-white/40">inc_4f82d1 · opened 2:14 PM · Legal Research Agent</p>
            </div>
          </div>
          <button className="rounded-md px-2.5 py-1 text-[11px] font-semibold"
            style={{ background: "#C97070", color: "white" }}>
            Acknowledge
          </button>
        </div>

        {/* Plain-English verdict */}
        <div className="mb-3 rounded-lg p-3.5" style={{ background: "#111726", border: "1px solid rgba(255,255,255,0.06)" }}>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">What happened (plain English)</span>
          <p className="mt-2 text-[14px] leading-relaxed text-white/90">
            Your Legal Research Agent cited a court case that does not exist in any legal database. It was hallucinated. The response also cost 38% more than a typical query for this agent.
          </p>
          <p className="mt-2 text-[12px] leading-relaxed text-white/55">
            Client [REDACTED] received this answer at 2:14 PM. No documents filed yet.
          </p>
        </div>

        {/* Recommended action */}
        <div className="mb-3 grid grid-cols-2 gap-3">
          <div className="rounded-lg p-3" style={{ background: "#111726", border: "1px solid rgba(255,255,255,0.06)" }}>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">Recommended</span>
            <p className="mt-1.5 text-[12px] font-semibold text-white">Contact the client directly.</p>
            <p className="mt-0.5 text-[11px] text-white/50">Retract the citation. Offer corrected research.</p>
            <button className="mt-2 rounded-md border px-2.5 py-1 text-[10px] font-semibold"
              style={{ borderColor: "rgba(143,164,184,0.35)", color: "#8FA4B8", background: "rgba(143,164,184,0.06)" }}>
              Draft retraction email →
            </button>
          </div>
          <div className="rounded-lg p-3" style={{ background: "#111726", border: "1px solid rgba(255,255,255,0.06)" }}>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">Exposure</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-[22px] font-extrabold tracking-tight text-white">1</span>
              <span className="text-[11px] text-white/50">client affected</span>
            </div>
            <p className="text-[11px] text-white/50">No documents filed yet · No public citation</p>
          </div>
        </div>

        {/* Guardrail added */}
        <div className="rounded-lg p-3" style={{ background: "rgba(143,164,184,0.05)", border: "1px solid rgba(143,164,184,0.2)" }}>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#8FA4B8]">✓ Guardrail added</span>
          </div>
          <p className="mt-1 text-[11px] text-white/70">
            Legal Research Agent will now cross-check every case citation against Westlaw before responding. Applied to all future queries.
          </p>
        </div>
      </div>
    </MockupFrame>
  );
}
