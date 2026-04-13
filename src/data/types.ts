export type Severity = "critical" | "warning";

export type AgentStatus = "active" | "paused";

export interface AgentDefinition {
  id: string;
  name: string;
  description: string;
  status: AgentStatus;
  /** Display accuracy % (0–100), consistent with trace set */
  accuracyPct: number;
  failuresLast7d: number;
  monthlyCostUsd: number;
  lastActiveMinutesAgo: number;
  /** Daily accuracy % for last 7 days, oldest → newest */
  accuracyTrend7d: number[];
  volumeByDay: number[];
  costByDayUsd: number[];
}

export interface RawTracePayload {
  input: string;
  output: string;
  toolCalls: { name: string; args: string; result: string }[];
}

export interface Trace {
  id: string;
  agentId: string;
  timestamp: string;
  summary: string;
  evaluationScore: number;
  passed: boolean;
  severity?: Severity;
  failureReason?: string;
  costUsd: number;
  raw: RawTracePayload;
}

export interface Incident {
  id: string;
  traceId: string;
  agentId: string;
  agentName: string;
  timestamp: string;
  severity: Severity;
  summary: string;
  status: "new" | "reviewed";
}
