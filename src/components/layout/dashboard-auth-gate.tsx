"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";

export function DashboardAuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  React.useEffect(() => {
    if (!isAuthenticated) router.replace("/login");
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <p className="text-sm text-slate-500">Checking your session…</p>
      </div>
    );
  }

  return <>{children}</>;
}
