import { subDays, subHours, subMinutes } from "date-fns";
import { AGENT_IDS, agentsSeed } from "./agents";
import { FAILURE_LIBRARY, PASS_SUMMARIES } from "./trace-summaries";
import type { Incident, RawTracePayload, Trace } from "./types";

/** Deterministic pseudo-random in [0,1) from string seed */
function hash01(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967296;
}

function costFor(seed: string): number {
  const r = hash01(seed);
  return Math.round((0.002 + r * (0.15 - 0.002)) * 1000) / 1000;
}

function rawPayload(agentName: string, passed: boolean, topic: string): RawTracePayload {
  return {
    input: `[Client message] ${topic}`,
    output: passed
      ? `Acknowledged the request, verified internal playbooks, and responded with approved language for ${agentName}.`
      : `Drafted a response using partially matched playbook text; confidence was lower than the review threshold.`,
    toolCalls: [
      {
        name: "lookup_playbook",
        args: JSON.stringify({ topic, workspace: "BrightPath Legal" }),
        result: passed
          ? JSON.stringify({ match: "high", policy_version: "2026.03" })
          : JSON.stringify({ match: "low", policy_version: "2026.03", warning: "verify_facts" }),
      },
      {
        name: "compose_reply",
        args: JSON.stringify({ tone: "professional", reading_level: "grade_10" }),
        result: JSON.stringify({ status: passed ? "sent" : "sent_with_flags" }),
      },
    ],
  };
}

interface AgentGenConfig {
  id: string;
  total: number;
  failSpecs: { summary: string; reason: string; severity: "critical" | "warning" }[];
}

function buildAgentTraces(cfg: AgentGenConfig): Trace[] {
  const passes = PASS_SUMMARIES[cfg.id] ?? [];
  const failLib = FAILURE_LIBRARY[cfg.id] ?? [];
  if (failLib.length !== cfg.failSpecs.length) {
    throw new Error(`Failure library mismatch for ${cfg.id}`);
  }

  /** Unique failure row indices — spaced across the trace list to avoid collisions */
  const sortedFailIdx: number[] = [];
  const failCount = failLib.length;
  const step = Math.max(1, Math.floor(cfg.total / (failCount + 1)));
  const offset = Math.floor(hash01(`${cfg.id}-fo`) * Math.min(3, step));
  for (let k = 0; k < failCount; k++) {
    const idx = Math.min(cfg.total - 1, offset + (k + 1) * step);
    if (!sortedFailIdx.includes(idx)) sortedFailIdx.push(idx);
  }
  let bump = 0;
  while (sortedFailIdx.length < failCount) {
    const idx = Math.min(cfg.total - 1, bump);
    if (!sortedFailIdx.includes(idx)) sortedFailIdx.push(idx);
    bump++;
  }
  sortedFailIdx.sort((a, b) => a - b);
  let failCursor = 0;

  const traces: Trace[] = [];
  for (let i = 0; i < cfg.total; i++) {
    const isFail = sortedFailIdx[failCursor] === i;
    if (isFail) failCursor++;

    const failOrder = sortedFailIdx.indexOf(i);
    const failSpec = isFail && failOrder >= 0 ? failLib[failOrder] : null;

    const summary = isFail && failSpec ? failSpec.summary : passes[i % passes.length];
    const passed = !isFail;
    const evaluationScore = passed
      ? Math.round((0.82 + hash01(`${cfg.id}-s-${i}`) * 0.17) * 100) / 100
      : Math.round((0.15 + hash01(`${cfg.id}-f-${i}`) * 0.4) * 100) / 100;

    const hoursBack = Math.floor(hash01(`${cfg.id}-t-${i}`) * 24 * 7);
    const mins = Math.floor(hash01(`${cfg.id}-m-${i}`) * 120);
    const days = Math.floor(hoursBack / 24);
    const hours = hoursBack % 24;
    const ts = subMinutes(subHours(subDays(new Date(), days), hours), mins);

    const id = `${cfg.id}-${i}`;
    const topic = summary.slice(0, 80).replace(/\n/g, " ");

    traces.push({
      id,
      agentId: cfg.id,
      timestamp: ts.toISOString(),
      summary,
      evaluationScore,
      passed,
      severity: isFail && failSpec ? failSpec.severity : undefined,
      failureReason: isFail && failSpec ? failSpec.reason : undefined,
      costUsd: costFor(id),
      raw: rawPayload(cfg.id, passed, topic),
    });
  }

  return traces.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
}

const genConfigs: AgentGenConfig[] = [
  {
    id: AGENT_IDS.intake,
    total: 34,
    failSpecs: FAILURE_LIBRARY[AGENT_IDS.intake],
  },
  {
    id: AGENT_IDS.doc,
    total: 54,
    failSpecs: FAILURE_LIBRARY[AGENT_IDS.doc],
  },
  {
    id: AGENT_IDS.schedule,
    total: 25,
    failSpecs: FAILURE_LIBRARY[AGENT_IDS.schedule],
  },
  {
    id: AGENT_IDS.research,
    total: 55,
    failSpecs: FAILURE_LIBRARY[AGENT_IDS.research],
  },
  {
    id: AGENT_IDS.billing,
    total: 33,
    failSpecs: FAILURE_LIBRARY[AGENT_IDS.billing],
  },
];

export const allTraces: Trace[] = genConfigs.flatMap(buildAgentTraces);

export function getTracesForAgent(agentId: string): Trace[] {
  return allTraces.filter((t) => t.agentId === agentId);
}

export function getTraceById(id: string): Trace | undefined {
  return allTraces.find((t) => t.id === id);
}

/** Incidents for global feed — aligned to failed traces */
export function buildIncidentsFromTraces(): Incident[] {
  const failed = allTraces.filter((t) => !t.passed);
  return failed.map((t, idx) => {
    const agent = agentsSeed.find((a) => a.id === t.agentId);
    return {
      id: `inc-${t.id}`,
      traceId: t.id,
      agentId: t.agentId,
      agentName: agent?.name ?? t.agentId,
      timestamp: t.timestamp,
      severity: t.severity ?? "warning",
      summary: t.summary.split(".")[0] + ".",
      status: hash01(`inc-st-${idx}`) > 0.35 ? "reviewed" : "new",
    };
  });
}

export const allIncidents: Incident[] = buildIncidentsFromTraces().sort(
  (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
);
