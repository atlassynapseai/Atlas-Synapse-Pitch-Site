"use client";

import * as React from "react";
import { MockupFrame } from "./mockup-frame";

/**
 * Step 01: integration connection flow with webhook event stream.
 * Left: connected sources. Right: live event log.
 */
export function IntegrationMockup() {
  const sources = [
    { name: "Zapier", status: "connected" as const, events: "1,247" },
    { name: "Make.com", status: "connected" as const, events: "843" },
    { name: "OpenAI API", status: "connected" as const, events: "9,204" },
    { name: "Anthropic", status: "connected" as const, events: "4,118" },
    { name: "n8n", status: "connecting" as const, events: "-" },
  ];

  const events = [
    { t: "00:00.12", src: "OpenAI", kind: "completion", status: "ok" as const },
    { t: "00:00.34", src: "Zapier", kind: "webhook.fired", status: "ok" as const },
    { t: "00:00.51", src: "Anthropic", kind: "tool_use", status: "flagged" as const },
    { t: "00:01.08", src: "OpenAI", kind: "completion", status: "ok" as const },
    { t: "00:01.22", src: "Make.com", kind: "webhook.fired", status: "ok" as const },
    { t: "00:01.47", src: "OpenAI", kind: "function_call", status: "ok" as const },
  ];

  return (
    <MockupFrame url="app.atlassynapse.ai/integrations">
      <div className="grid grid-cols-12 gap-3 p-4" style={{ background: "#0A0E1C", minHeight: 380 }}>
        {/* Sources */}
        <div className="col-span-5 rounded-lg" style={{ background: "#111726", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-between border-b px-3 py-2.5" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">Connected sources</span>
            <span className="font-mono text-[10px] font-semibold text-[#86A97F]">4 / 5</span>
          </div>
          <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
            {sources.map((s) => {
              const ok = s.status === "connected";
              return (
                <div key={s.name} className="flex items-center justify-between px-3 py-2.5"
                  style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${ok ? "" : "animate-pulse"}`}
                      style={{ background: ok ? "#86A97F" : "#D4A35C" }}
                    />
                    <span className="text-[12px] font-medium text-white/85">{s.name}</span>
                  </div>
                  <span className="font-mono text-[10px] text-white/40">{s.events}</span>
                </div>
              );
            })}
          </div>
          <div className="border-t px-3 py-2.5" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            <button className="w-full rounded-md border px-2.5 py-1.5 text-[11px] font-semibold"
              style={{ borderColor: "rgba(129,140,248,0.4)", color: "#A78BFA", background: "rgba(129,140,248,0.06)" }}>
              + Add integration
            </button>
          </div>
        </div>

        {/* Event stream */}
        <div className="col-span-7 rounded-lg" style={{ background: "#111726", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-between border-b px-3 py-2.5" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">Event stream</span>
            <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold text-[#8FA4B8]">
              <span className="h-1 w-1 animate-pulse rounded-full bg-[#8FA4B8]" />
              streaming
            </span>
          </div>
          <div className="p-3 font-mono text-[11px]">
            {events.map((e, i) => {
              const c = e.status === "flagged" ? "#D4A35C" : "#86A97F";
              return (
                <div key={i} className="flex items-center gap-3 py-1">
                  <span className="w-[56px] shrink-0 text-white/35">{e.t}</span>
                  <span className="w-[80px] shrink-0 text-white/70">{e.src}</span>
                  <span className="flex-1 text-white/55">{e.kind}</span>
                  <span className="rounded px-1.5 py-[1px] text-[9px] font-bold uppercase tracking-[0.08em]"
                    style={{ color: c, background: c + "1A" }}>
                    {e.status}
                  </span>
                </div>
              );
            })}
            <div className="mt-1 flex items-center gap-2 py-1 text-white/30">
              <span className="h-1 w-1 animate-pulse rounded-full bg-white/40" />
              <span>awaiting next event…</span>
            </div>
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}
