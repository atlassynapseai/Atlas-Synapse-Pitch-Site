export interface MarketplaceAgent {
  id: string;
  name: string;
  category: string;
  description: string;
  verified: boolean;
  accuracyPct: number;
  evaluations: number;
  price: string;
  rating: number;
  reviews: number;
}

export const marketplaceAgents: MarketplaceAgent[] = [
  {
    id: "mp-smartscheduler",
    name: "SmartScheduler Pro",
    category: "Scheduling",
    description:
      "AI-powered appointment scheduling with conflict detection, timezone handling, and multi-calendar sync. Built for professional services firms.",
    verified: true,
    accuracyPct: 94,
    evaluations: 12400,
    price: "$49/mo",
    rating: 4.7,
    reviews: 238,
  },
  {
    id: "mp-legaldraft",
    name: "LegalDraft AI",
    category: "Legal",
    description:
      "Drafts initial contract markups, identifies missing clauses, and flags non-standard terms against your playbook. Trained on commercial agreements.",
    verified: true,
    accuracyPct: 88,
    evaluations: 8200,
    price: "$129/mo",
    rating: 4.4,
    reviews: 156,
  },
  {
    id: "mp-invoicebot",
    name: "InvoiceBot 3.0",
    category: "Finance",
    description:
      "Automates payment reminders, reconciles outstanding balances, and generates collection-prevention nudges in plain, client-friendly language.",
    verified: true,
    accuracyPct: 96,
    evaluations: 15800,
    price: "$0.03/interaction",
    rating: 4.8,
    reviews: 412,
  },
  {
    id: "mp-clientconcierge",
    name: "Client Concierge",
    category: "Customer Service",
    description:
      "Handles inbound client inquiries, routes to the right department, captures intake details, and books initial consultations automatically.",
    verified: true,
    accuracyPct: 91,
    evaluations: 22100,
    price: "$79/mo",
    rating: 4.5,
    reviews: 327,
  },
  {
    id: "mp-compliancewatch",
    name: "ComplianceWatch",
    category: "Legal",
    description:
      "Monitors regulatory updates across jurisdictions and flags when your existing policies or contracts may need revision.",
    verified: true,
    accuracyPct: 85,
    evaluations: 4600,
    price: "$199/mo",
    rating: 4.2,
    reviews: 89,
  },
  {
    id: "mp-docusort",
    name: "DocuSort Express",
    category: "Operations",
    description:
      "Classifies, tags, and routes uploaded documents to the correct matter or department. Integrates with common DMS platforms.",
    verified: true,
    accuracyPct: 92,
    evaluations: 9300,
    price: "$0.05/document",
    rating: 4.6,
    reviews: 201,
  },
  {
    id: "mp-hrscreen",
    name: "HR Screener",
    category: "Human Resources",
    description:
      "Pre-screens job applications against role requirements, generates candidate summaries, and schedules first-round interviews.",
    verified: true,
    accuracyPct: 89,
    evaluations: 6700,
    price: "$99/mo",
    rating: 4.3,
    reviews: 142,
  },
  {
    id: "mp-meetingnotes",
    name: "MeetingMind",
    category: "Operations",
    description:
      "Joins virtual meetings, generates structured summaries with action items, and distributes follow-up tasks to attendees automatically.",
    verified: true,
    accuracyPct: 93,
    evaluations: 18500,
    price: "$39/mo",
    rating: 4.7,
    reviews: 534,
  },
];

export const marketplaceCategories = [
  "All",
  "Scheduling",
  "Legal",
  "Finance",
  "Customer Service",
  "Operations",
  "Human Resources",
];
