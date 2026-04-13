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
  /** Prefer selecting `disconnectedAgentIds` + `useMemo` — this returns a new array each call (not safe as a Zustand selector). */
  visibleAgents: () => AgentDefinition[];
};

type WaitlistState = {
  waitlistEmails: string[];
  addWaitlistEmail: (email: string) => void;
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

      waitlistEmails: [],
      addWaitlistEmail: (email) =>
        set((s) => ({
          waitlistEmails: s.waitlistEmails.includes(email) ? s.waitlistEmails : [...s.waitlistEmails, email],
        })),
    }),
    {
      name: "atlas-synapse-demo",
      partialize: (s) => ({
        isAuthenticated: s.isAuthenticated,
        userEmail: s.userEmail,
        userName: s.userName,
        disconnectedAgentIds: s.disconnectedAgentIds,
        waitlistEmails: s.waitlistEmails,
      }),
    },
  ),
);
