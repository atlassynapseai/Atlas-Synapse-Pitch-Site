import { agentsSeed } from "@/data/agents";
import { allIncidents, allTraces } from "@/data/traces";

export type SearchHit =
  | { type: "agent"; id: string; label: string; href: string }
  | { type: "trace"; id: string; label: string; href: string }
  | { type: "incident"; id: string; label: string; href: string };

export function globalSearch(query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const hits: SearchHit[] = [];

  for (const a of agentsSeed) {
    if (a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)) {
      hits.push({ type: "agent", id: a.id, label: a.name, href: `/dashboard/agents/${a.id}` });
    }
  }

  for (const t of allTraces) {
    if (t.summary.toLowerCase().includes(q)) {
      hits.push({
        type: "trace",
        id: t.id,
        label: t.summary.slice(0, 72) + (t.summary.length > 72 ? "…" : ""),
        href: `/dashboard/agents/${t.agentId}?trace=${t.id}`,
      });
      if (hits.length > 40) break;
    }
  }

  for (const i of allIncidents) {
    if (i.summary.toLowerCase().includes(q) || i.agentName.toLowerCase().includes(q)) {
      hits.push({
        type: "incident",
        id: i.id,
        label: `${i.agentName}: ${i.summary}`,
        href: `/dashboard/agents/${i.agentId}?trace=${i.traceId}`,
      });
    }
  }

  return hits.slice(0, 12);
}
