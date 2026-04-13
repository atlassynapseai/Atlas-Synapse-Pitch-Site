import type { AgentDefinition } from "./types";

export const WORKSPACE_NAME = "BrightPath Legal";

export const AGENT_IDS = {
  intake: "client-intake-bot",
  doc: "document-reviewer",
  schedule: "scheduling-assistant",
  research: "legal-research-agent",
  billing: "billing-follow-up-bot",
} as const;

/** Headline dashboard figures (internally consistent with trace generator) */
export const DASHBOARD_SUMMARY = {
  totalAgents: 5,
  overallAccuracyPct: 89.2,
  overallAccuracyDeltaVsLastWeek: 1.4,
  incidentsThisWeek: 25,
  incidentsCritical: 8,
  incidentsWarning: 17,
  baselineMonthlyUsd: 14200,
  agentCostMonthlyUsd: 1847,
  netSavingsMonthlyUsd: 12353,
  roiVsBaselinePct: 87,
} as const;

export const agentsSeed: AgentDefinition[] = [
  {
    id: AGENT_IDS.intake,
    name: "Client Intake Bot",
    description: "Handles initial client inquiries via chat.",
    status: "active",
    accuracyPct: 91,
    failuresLast7d: 3,
    monthlyCostUsd: 512,
    lastActiveMinutesAgo: 2,
    accuracyTrend7d: [88.5, 89.1, 90.2, 90.8, 91.0, 90.4, 91.2],
    volumeByDay: [48, 52, 45, 61, 55, 49, 53],
    costByDayUsd: [18.2, 19.4, 16.8, 22.1, 20.0, 17.9, 19.2],
  },
  {
    id: AGENT_IDS.doc,
    name: "Document Reviewer",
    description: "Reviews contracts for key clauses.",
    status: "active",
    accuracyPct: 87,
    failuresLast7d: 7,
    monthlyCostUsd: 498,
    lastActiveMinutesAgo: 14,
    accuracyTrend7d: [89.0, 88.2, 87.5, 86.8, 87.2, 86.9, 87.0],
    volumeByDay: [22, 19, 24, 21, 23, 20, 22],
    costByDayUsd: [16.1, 14.2, 17.8, 15.5, 16.9, 14.8, 16.0],
  },
  {
    id: AGENT_IDS.schedule,
    name: "Scheduling Assistant",
    description: "Books consultations and follow-ups.",
    status: "active",
    accuracyPct: 96,
    failuresLast7d: 1,
    monthlyCostUsd: 286,
    lastActiveMinutesAgo: 6,
    accuracyTrend7d: [94.8, 95.2, 95.6, 96.1, 95.9, 96.0, 96.2],
    volumeByDay: [38, 41, 36, 44, 40, 39, 42],
    costByDayUsd: [9.8, 10.4, 9.1, 11.2, 10.1, 9.9, 10.5],
  },
  {
    id: AGENT_IDS.research,
    name: "Legal Research Agent",
    description: "Retrieves case law and summarizes holdings.",
    status: "active",
    accuracyPct: 78,
    failuresLast7d: 12,
    monthlyCostUsd: 421,
    lastActiveMinutesAgo: 38,
    accuracyTrend7d: [82.0, 80.5, 79.2, 78.8, 78.0, 77.6, 78.1],
    volumeByDay: [9, 8, 11, 10, 9, 8, 10],
    costByDayUsd: [14.2, 13.1, 16.8, 15.0, 14.5, 13.8, 15.2],
  },
  {
    id: AGENT_IDS.billing,
    name: "Billing Follow-Up Bot",
    description: "Sends payment reminders and balance notices.",
    status: "active",
    accuracyPct: 94,
    failuresLast7d: 2,
    monthlyCostUsd: 130,
    lastActiveMinutesAgo: 112,
    accuracyTrend7d: [93.0, 93.4, 93.8, 94.1, 94.0, 93.9, 94.2],
    volumeByDay: [14, 15, 13, 16, 14, 15, 14],
    costByDayUsd: [4.2, 4.5, 3.9, 5.0, 4.3, 4.6, 4.2],
  },
];

export function getAgentById(id: string): AgentDefinition | undefined {
  return agentsSeed.find((a) => a.id === id);
}
