"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { agentsSeed } from "@/data/agents";
import type { AgentDefinition } from "@/data/types";

type AuthState = {
  isAuthenticated: boolean;
  userEmail: string | null;
  userName: string;
  signIn: (email: string, _password?: string) => void;
  signOut: () => void;
};

type WorkspaceState = {
  disconnectedAgentIds: string[];
  disconnectAgent: (id: string) => void;
  /** Demo: reset disconnected agents */
  resetAgents: () => void;
  /** Prefer selecting `disconnectedAgentIds` + `useMemo`. This returns a new array each call (not safe as a Zustand selector). */
  visibleAgents: () => AgentDefinition[];
};

export type WaitlistSignup = { name: string; email: string };

type WaitlistState = {
  waitlistSignups: WaitlistSignup[];
  addWaitlistSignup: (entry: WaitlistSignup) => void;
};

export type AppStore = AuthState & WorkspaceState & WaitlistState;

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      userEmail: null,
      userName: "Jordan Lee",
      signIn: (email) => set({ isAuthenticated: true, userEmail: email }),
      signOut: () => set({ isAuthenticated: false, userEmail: null }),

      disconnectedAgentIds: [],
      disconnectAgent: (id) =>
        set((s) => ({
          disconnectedAgentIds: Array.from(new Set(s.disconnectedAgentIds.concat(id))),
        })),
      resetAgents: () => set({ disconnectedAgentIds: [] }),
      visibleAgents: () => agentsSeed.filter((a) => !get().disconnectedAgentIds.includes(a.id)),

      waitlistSignups: [],
      addWaitlistSignup: (entry) =>
        set((s) => {
          const email = entry.email.trim().toLowerCase();
          if (s.waitlistSignups.some((x) => x.email.toLowerCase() === email)) return s;
          return { waitlistSignups: [...s.waitlistSignups, { name: entry.name.trim(), email }] };
        }),
    }),
    {
      name: "atlas-synapse-demo-v2",
      partialize: (s) => ({
        isAuthenticated: s.isAuthenticated,
        userEmail: s.userEmail,
        userName: s.userName,
        disconnectedAgentIds: s.disconnectedAgentIds,
        waitlistSignups: s.waitlistSignups,
      }),
    },
  ),
);
