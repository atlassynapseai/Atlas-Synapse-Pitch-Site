"use client";

import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";
import { DashboardAuthGate } from "./dashboard-auth-gate";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <DashboardAuthGate>
      <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar />
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </DashboardAuthGate>
  );
}
