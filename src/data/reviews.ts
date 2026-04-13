import { agentsSeed } from "./agents";

export interface PerformanceReview {
  id: string;
  agentId: string;
  agentName: string;
  period: string;
  periodStart: string;
  periodEnd: string;
  headline: string;
  executiveSummary: string;
  accuracy: number;
  volume: number;
  failures: number;
  costUsd: number;
  incidents: string[];
  trend: "improving" | "stable" | "declining";
  recommendations: string[];
}

export const performanceReviews: PerformanceReview[] = [
  {
    id: "rev-intake-w1",
    agentId: "client-intake-bot",
    agentName: "Client Intake Bot",
    period: "Mar 31 – Apr 6, 2026",
    periodStart: "2026-03-31",
    periodEnd: "2026-04-06",
    headline: "91% accuracy, 3 incidents, $134 cost",
    executiveSummary:
      "The Client Intake Bot handled 363 interactions this week with strong accuracy. Three failures surfaced — one critical (incorrect statute of limitations cited to a live prospect) and two warnings (overpromised turnaround, incorrect practice area claim). Volume was consistent with the prior week and cost remained within budget.",
    accuracy: 91,
    volume: 363,
    failures: 3,
    costUsd: 134,
    incidents: [
      "Apr 2: Cited 3-year statute of limitations for NJ malpractice — actual limit is 2 years (critical).",
      "Apr 4: Promised same-day demand letter at $95 flat without confirming attorney availability (warning).",
      "Apr 5: Stated BrightPath does not handle ERISA appeals — incorrect (warning).",
    ],
    trend: "improving",
    recommendations: [
      "Add jurisdiction-specific statute of limitations to the playbook context window to prevent citation errors.",
      "Require turnaround and pricing promises to include a 'subject to availability' qualifier.",
      "Update the practice area list in the intake knowledge base to include ERISA benefits work.",
    ],
  },
  {
    id: "rev-doc-w1",
    agentId: "document-reviewer",
    agentName: "Document Reviewer",
    period: "Mar 31 – Apr 6, 2026",
    periodStart: "2026-03-31",
    periodEnd: "2026-04-06",
    headline: "87% accuracy, 7 incidents, $112 cost",
    executiveSummary:
      "The Document Reviewer processed 151 contract reviews. Seven failures were flagged — three critical (hallucinated clause, wrong arbitration details, missed liability cap) and four warnings (oversimplified enforceability, missed auto-renewal, wrong entity in guaranty, ignored exhibit requirements). Accuracy has declined slightly over the past two weeks, warranting attention.",
    accuracy: 87,
    volume: 151,
    failures: 7,
    costUsd: 112,
    incidents: [
      "Apr 1: Invented 'Section 4.8 — Environmental Indemnity' in an asset purchase agreement (critical).",
      "Apr 2: Reported arbitration as 'AAA rules, New York seat' — agreement specified JAMS in Chicago (critical).",
      "Apr 3: Missed limitation-of-liability cap in Section 9.3 of a SaaS agreement (critical).",
      "Apr 3: Oversimplified non-compete enforceability analysis across jurisdictions (warning).",
      "Apr 4: Missed auto-renewal and 60-day notice requirement in Section 6 (warning).",
      "Apr 5: Confused two similarly named LLCs in the guaranty signature block (warning).",
      "Apr 6: Stated NDA allowed unrestricted sharing — Exhibit B required acknowledgments (warning).",
    ],
    trend: "declining",
    recommendations: [
      "Investigate prompt drift — accuracy has dropped 2 points in 14 days. Consider pinning the model version.",
      "Add section-reference validation to reduce hallucinated clause citations.",
      "Include exhibit and schedule cross-referencing as a mandatory step in the review workflow.",
    ],
  },
  {
    id: "rev-sched-w1",
    agentId: "scheduling-assistant",
    agentName: "Scheduling Assistant",
    period: "Mar 31 – Apr 6, 2026",
    periodStart: "2026-03-31",
    periodEnd: "2026-04-06",
    headline: "96% accuracy, 1 incident, $71 cost",
    executiveSummary:
      "The Scheduling Assistant booked 280 appointments with excellent reliability. One warning-level failure involved a timezone conversion error between Eastern and Mountain Time. Cost remains the lowest of all agents. Performance has been steadily improving over the past three weeks.",
    accuracy: 96,
    volume: 280,
    failures: 1,
    costUsd: 71,
    incidents: [
      "Apr 3: Offered 9:00 a.m. Eastern slots to a Phoenix client without converting to Mountain Time (warning).",
    ],
    trend: "improving",
    recommendations: [
      "Add explicit timezone detection based on client profile location to prevent conversion mismatches.",
      "Consider extending this agent to handle rescheduling workflows since booking accuracy is high.",
    ],
  },
  {
    id: "rev-research-w1",
    agentId: "legal-research-agent",
    agentName: "Legal Research Agent",
    period: "Mar 31 – Apr 6, 2026",
    periodStart: "2026-03-31",
    periodEnd: "2026-04-06",
    headline: "78% accuracy, 12 incidents, $103 cost",
    executiveSummary:
      "The Legal Research Agent completed 65 research tasks this week with the lowest accuracy of any agent. Eight critical failures involved hallucinated case citations, fabricated legal standards, or incorrect court attributions. Four warnings involved oversimplified doctrine summaries and outdated authority. This agent poses the highest reputational risk in the current fleet.",
    accuracy: 78,
    volume: 65,
    failures: 12,
    costUsd: 103,
    incidents: [
      "Apr 1: Invented a 'BrightPath rule' for summary judgment that does not exist (critical).",
      "Apr 1: Cited a fabricated '2025 Third Circuit case' with a nonexistent citation (critical).",
      "Apr 2: Quoted 'Smith v. Jones, 1998 WL 1234567' — appears fabricated (critical).",
      "Apr 3: Claimed Miranda established a 6-year SOL for civil rights claims (critical).",
      "Apr 3: Overstated Troxel v. Granville as barring all grandparent visitation (critical).",
      "Apr 4: Listed 4 'key cases' on 12(b)(6) motions — 2 were fabricated (critical).",
      "Apr 4: Invented a 'BrightPath exception' to attorney-client privilege (critical).",
      "Apr 5: Invented 'Restatement (Fourth) of Federal Procedure' (critical).",
      "Apr 5: Cited overruled PA workers' comp case without flagging negative treatment (warning).",
      "Apr 5: Mixed Illinois RPC 1.6 with ABA Model Rule numbering (warning).",
      "Apr 6: Gave one-word 'no' to inevitable disclosure question without noting split authority (warning).",
      "Apr 6: Misattributed Ninth Circuit holding to the Eleventh Circuit (warning).",
    ],
    trend: "declining",
    recommendations: [
      "URGENT: Consider pausing this agent for client-facing research until hallucination rates improve.",
      "Add a citation verification step that cross-references any case name against a legal database before returning results.",
      "Restrict the agent to conceptual overviews only — flag any response that includes a specific case citation for human review.",
      "Evaluate switching to a model with stronger factual grounding or adding retrieval-augmented generation for case law lookups.",
    ],
  },
  {
    id: "rev-billing-w1",
    agentId: "billing-follow-up-bot",
    agentName: "Billing Follow-Up Bot",
    period: "Mar 31 – Apr 6, 2026",
    periodStart: "2026-03-31",
    periodEnd: "2026-04-06",
    headline: "94% accuracy, 2 incidents, $31 cost",
    executiveSummary:
      "The Billing Follow-Up Bot sent 101 payment reminders and confirmations with strong accuracy. Two failures surfaced — one critical (sent incorrect balance from a merged matter record) and one warning (referenced unauthorized collections fees). Cost is minimal and the agent continues to perform reliably.",
    accuracy: 94,
    volume: 101,
    failures: 2,
    costUsd: 31,
    incidents: [
      "Apr 2: Sent $6,800 balance reminder to a client whose actual balance was $4,200 — pulled from merged matter (critical).",
      "Apr 5: Referenced 'collections fees of 18% per month' not in BrightPath's fee schedule (warning).",
    ],
    trend: "stable",
    recommendations: [
      "Add a balance-verification step that cross-checks the billing system before sending any dollar amount to a client.",
      "Remove any reference to collections fee percentages from the agent's template library — use only approved fee schedule language.",
    ],
  },
];
