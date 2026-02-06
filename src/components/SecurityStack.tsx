"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import {
  Cpu,
  ShieldCheck,
  Globe,
  MapPin,
  Container,
  Eye,
  type LucideIcon,
} from "lucide-react";

interface SecurityRow {
  icon: LucideIcon;
  layer: string;
  technology: string;
  description: string;
}

const securityStack: SecurityRow[] = [
  {
    icon: Cpu,
    layer: "Hardware Isolation",
    technology: "Trusted Execution Environments (TEEs)",
    description:
      "Code runs in protected CPU enclaves — not even the host can access it.",
  },
  {
    icon: ShieldCheck,
    layer: "Data Protection",
    technology: "Confidential Computing",
    description:
      "Data encrypted even during processing, not just at rest.",
  },
  {
    icon: Globe,
    layer: "Network Security",
    technology: "Tailscale VPN (BettyGo)",
    description:
      "Secure remote access with zero public endpoints.",
  },
  {
    icon: MapPin,
    layer: "Hosting",
    technology: "Swiss Data Centers",
    description: "Full GDPR compliance under Swiss law.",
  },
  {
    icon: Container,
    layer: "Execution",
    technology: "E2B / Daytona",
    description: "Isolated, ephemeral containers for every task.",
  },
  {
    icon: Eye,
    layer: "LLM Transparency",
    technology: "Full Disclosure",
    description:
      "Which models, where they run, what data they see — always.",
  },
];

export function SecurityStack() {
  return (
    <div className="space-y-4">
      {securityStack.map((row, i) => (
        <ScrollReveal key={row.layer} delay={i * 0.08}>
          <div className="bg-white rounded-xl border border-[#E5E9F0] p-6 flex items-start gap-5 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-11 h-11 rounded-lg bg-[#2B4C7E]/8 flex items-center justify-center flex-shrink-0">
              <row.icon
                className="w-5 h-5 text-[#2B4C7E]"
                strokeWidth={1.5}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                <span className="font-mono text-xs uppercase tracking-wider text-[#94A3B8]">
                  {row.layer}
                </span>
                <span className="hidden sm:inline text-[#D1D9E6]">/</span>
                <span className="font-semibold text-[#1E293B] text-sm">
                  {row.technology}
                </span>
              </div>
              <p className="text-sm text-[#64748B] leading-relaxed">
                {row.description}
              </p>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
