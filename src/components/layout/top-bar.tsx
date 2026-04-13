"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, LogOut, Search, User } from "lucide-react";
import { allIncidents } from "@/data/traces";
import { WORKSPACE_NAME } from "@/data/agents";
import { globalSearch, type SearchHit } from "@/lib/search-index";
import { useAppStore } from "@/lib/store";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";

export function TopBar() {
  const router = useRouter();
  const userEmail = useAppStore((s) => s.userEmail);
  const userName = useAppStore((s) => s.userName);
  const signOut = useAppStore((s) => s.signOut);
  const [q, setQ] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const hits = React.useMemo(() => globalSearch(q), [q]);

  const unread = allIncidents.filter((i) => i.status === "new").length;

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <Link href="/dashboard" className="text-sm font-semibold text-[#1A3A5C] md:hidden dark:text-slate-100">
        Atlas Synapse
      </Link>
      <div className="hidden items-center gap-2 text-sm text-slate-600 dark:text-slate-300 md:flex">
        <span className="font-medium text-slate-900 dark:text-slate-100">{WORKSPACE_NAME}</span>
      </div>
      <div className="relative mx-auto flex max-w-md flex-1">
        <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
        <Input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="Search agents, activity, incidents…"
          className="h-9 pl-9"
          aria-label="Search"
        />
        {open && q.trim() && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-72 overflow-auto rounded-md border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-800 dark:bg-slate-950">
            {hits.length === 0 ? (
              <p className="px-3 py-2 text-sm text-slate-500">No matches.</p>
            ) : (
              hits.map((h: SearchHit) => (
                <button
                  key={`${h.type}-${h.id}`}
                  type="button"
                  className="flex w-full flex-col items-start gap-0.5 px-3 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-900"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    router.push(h.href);
                    setQ("");
                    setOpen(false);
                  }}
                >
                  <span className="text-xs font-medium uppercase text-slate-400">{h.type}</span>
                  <span className="text-slate-800 dark:text-slate-100">{h.label}</span>
                </button>
              ))
            )}
          </div>
        )}
      </div>
      <div className="flex items-center gap-1">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="relative h-9 w-9" aria-label="Notifications">
          <Bell className="h-4 w-4" />
          {unread > 0 && (
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#C62828] px-1 text-[10px] font-bold text-white">
              {unread > 9 ? "9+" : unread}
            </span>
          )}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-[#1A3A5C] text-xs text-white">
                  {userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium">{userName}</span>
                <span className="text-xs font-normal text-slate-500">{userEmail}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="flex cursor-pointer items-center gap-2">
                <User className="h-4 w-4" />
                Profile & settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-[#C62828] focus:text-[#C62828]"
              onClick={() => {
                signOut();
                router.push("/login");
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
