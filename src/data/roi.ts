import { agentsSeed, DASHBOARD_SUMMARY } from "./agents";

export interface AgentROI {
  agentId: string;
  agentName: string;
  baselineCostUsd: number;
  agentCostUsd: number;
  errorCostUsd: number;
  netSavingsUsd: number;
  roiPct: number;
}

export const agentROI: AgentROI[] = [
  {
    agentId: "client-intake-bot",
    agentName: "Client Intake Bot",
    baselineCostUsd: 4100,
    agentCostUsd: 512,
    errorCostUsd: 120,
    netSavingsUsd: 3468,
    roiPct: 577,
  },
  {
    agentId: "document-reviewer",
    agentName: "Document Reviewer",
    baselineCostUsd: 3800,
    agentCostUsd: 498,
    errorCostUsd: 340,
    netSavingsUsd: 2962,
    roiPct: 495,
  },
  {
    agentId: "scheduling-assistant",
    agentName: "Scheduling Assistant",
    baselineCostUsd: 2600,
    agentCostUsd: 286,
    errorCostUsd: 25,
    netSavingsUsd: 2289,
    roiPct: 700,
  },
  {
    agentId: "legal-research-agent",
    agentName: "Legal Research Agent",
    baselineCostUsd: 2200,
    agentCostUsd: 421,
    errorCostUsd: 560,
    netSavingsUsd: 1219,
    roiPct: 124,
  },
  {
    agentId: "billing-follow-up-bot",
    agentName: "Billing Follow-Up Bot",
    baselineCostUsd: 1500,
    agentCostUsd: 130,
    errorCostUsd: 85,
    netSavingsUsd: 1285,
    roiPct: 889,
  },
];

export const monthlySavingsTrend = [
  { month: "Jan 2026", savings: 9800, agentCost: 1620 },
  { month: "Feb 2026", savings: 11200, agentCost: 1740 },
  { month: "Mar 2026", savings: 12353, agentCost: 1847 },
];

export const roiSummary = {
  baselineMonthlyUsd: DASHBOARD_SUMMARY.baselineMonthlyUsd,
  agentCostMonthlyUsd: DASHBOARD_SUMMARY.agentCostMonthlyUsd,
  netSavingsMonthlyUsd: DASHBOARD_SUMMARY.netSavingsMonthlyUsd,
  roiPct: Math.round(
    ((DASHBOARD_SUMMARY.baselineMonthlyUsd - DASHBOARD_SUMMARY.agentCostMonthlyUsd) /
      DASHBOARD_SUMMARY.agentCostMonthlyUsd) *
      100,
  ),
};
