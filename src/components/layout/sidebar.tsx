"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  AlertTriangle,
  LineChart,
  FileText,
  Store,
  Settings,
  Plug,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/incidents", label: "Incidents", icon: AlertTriangle },
  { href: "/dashboard/roi", label: "Savings & ROI", icon: LineChart },
  { href: "/dashboard/reviews", label: "Performance reviews", icon: FileText },
  { href: "/dashboard/marketplace", label: "Marketplace", icon: Store },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/dashboard/connect", label: "Connect an agent", icon: Plug },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-56 shrink-0 border-r border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-950/80 md:block">
      <div className="flex h-14 items-center border-b border-slate-200 px-4 dark:border-slate-800">
        <Link href="/dashboard" className="text-sm font-semibold text-[#1A3A5C] dark:text-slate-100">
          Atlas Synapse
        </Link>
      </div>
      <nav className="space-y-0.5 p-3">
        {nav.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/dashboard" ? pathname === "/dashboard" : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-slate-100 text-[#1A3A5C] dark:bg-slate-900 dark:text-slate-50"
                  : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900/60",
              )}
            >
              <Icon className="h-4 w-4 opacity-80" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
