export type FeatureStatus = "done" | "in-dev" | "planned";

export interface Feature {
  name: string;
  description: string;
  status: FeatureStatus;
  icon: string;
}

export interface FeatureCategory {
  title: string;
  slug: string;
  features: Feature[];
}

export const featureCategories: FeatureCategory[] = [
  {
    title: "Core Intelligence",
    slug: "core-intelligence",
    features: [
      {
        name: "Intelligent Routing",
        description:
          "Betty-first architecture with confidence-based routing across 3 modes. 35-40% of queries answered without ever touching an LLM.",
        status: "done",
        icon: "Route",
      },
      {
        name: "Knowledge Management",
        description:
          "47K+ knowledge items including conversations, code, documents, and screenshots. Semantic, full-text, and hybrid search.",
        status: "done",
        icon: "BookOpen",
      },
      {
        name: "Multi-Agent Orchestration (CHAOS)",
        description:
          "Parallel execution with voting and consensus mechanisms. Multiple specialist agents collaborate on complex queries.",
        status: "done",
        icon: "Network",
      },
      {
        name: "Pattern Recognition",
        description:
          "Identifies patterns across code, conversations, errors, solutions, and workflows to surface actionable insights.",
        status: "done",
        icon: "Scan",
      },
    ],
  },
  {
    title: "Memory & Storage",
    slug: "memory-storage",
    features: [
      {
        name: "4-Database Architecture",
        description:
          "PostgreSQL for structured data, Neo4j for relationships, Qdrant for vectors, Redis for caching. Each database optimized for its role.",
        status: "done",
        icon: "Database",
      },
      {
        name: "Temporal Knowledge Graphs",
        description:
          "Graphiti integration for time-based relationship tracking. Understand how knowledge evolves over time.",
        status: "in-dev",
        icon: "GitBranch",
      },
      {
        name: "Advanced Search",
        description:
          "Full-text, semantic, hybrid, regex, and time-based queries. Find anything, any way you think about it.",
        status: "done",
        icon: "Search",
      },
    ],
  },
  {
    title: "Interfaces",
    slug: "interfaces",
    features: [
      {
        name: "Dashboard v2",
        description:
          "Modern React interface for knowledge management, analytics, and system administration.",
        status: "done",
        icon: "LayoutDashboard",
      },
      {
        name: "BettyGo Mobile",
        description:
          "iOS app with Tailscale VPN integration. Full knowledge access in the field, on the factory floor, or at the client site.",
        status: "in-dev",
        icon: "Smartphone",
      },
      {
        name: "API Access",
        description:
          "Full REST API for integration with existing enterprise systems, ERPs, and custom workflows.",
        status: "done",
        icon: "Plug",
      },
      {
        name: "Claude Code Integration",
        description:
          "Hooks system for developer workflows. Betty integrates directly into your development environment.",
        status: "done",
        icon: "Terminal",
      },
    ],
  },
  {
    title: "Security & Privacy",
    slug: "security-privacy",
    features: [
      {
        name: "Complete Offline Operation",
        description:
          "No cloud dependency required. Betty runs entirely within your infrastructure with zero external calls.",
        status: "done",
        icon: "WifiOff",
      },
      {
        name: "TEEs + Confidential Computing",
        description:
          "Hardware-level data isolation using Trusted Execution Environments. Not even the host machine can access your data.",
        status: "done",
        icon: "ShieldCheck",
      },
      {
        name: "Encryption",
        description:
          "End-to-end encryption at rest and in transit. JWT authentication for all API access.",
        status: "done",
        icon: "Lock",
      },
      {
        name: "Audit Logging",
        description:
          "Complete trail of every access, query, and action. Full accountability for compliance requirements.",
        status: "done",
        icon: "FileCheck",
      },
    ],
  },
];

export const roadmapPlanned: string[] = [
  "Predictive Intelligence",
  "Multi-Language Support",
  "Enterprise SSO / RBAC",
  "Knowledge Marketplace",
  "Voice Interface",
];
