"use client";

import * as React from "react";

/**
 * Browser-chrome frame shared across all dashboard mockups.
 * Desktop-only format. never phone.
 */
export function MockupFrame({
  url = "app.atlassynapse.ai",
  children,
  className = "",
}: {
  url?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`w-full overflow-hidden rounded-[14px] ${className}`}
      style={{
        background: "#0D1220",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(129,140,248,0.12), 0 0 80px rgba(129,140,248,0.08)",
      }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{ background: "#151A2E", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FF5F57" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28C840" }} />
        <div className="ml-3 flex-1 rounded-md px-3 py-1 font-mono text-[11px]"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}
        >
          {url}
        </div>
      </div>
      {children}
    </div>
  );
}
