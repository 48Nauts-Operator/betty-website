"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import type { FeatureCategory, FeatureStatus } from "@/data/features";
import {
  Route,
  BookOpen,
  Network,
  Scan,
  Database,
  GitBranch,
  Search,
  LayoutDashboard,
  Smartphone,
  Plug,
  Terminal,
  WifiOff,
  ShieldCheck,
  Lock,
  FileCheck,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Route,
  BookOpen,
  Network,
  Scan,
  Database,
  GitBranch,
  Search,
  LayoutDashboard,
  Smartphone,
  Plug,
  Terminal,
  WifiOff,
  ShieldCheck,
  Lock,
  FileCheck,
};

function StatusBadge({ status }: { status: FeatureStatus }) {
  if (status === "done") {
    return (
      <Badge
        variant="secondary"
        className="bg-[#22C55E]/10 text-[#22C55E] border-0 font-mono text-[10px] uppercase tracking-wider"
      >
        Implemented
      </Badge>
    );
  }
  if (status === "in-dev") {
    return (
      <Badge
        variant="secondary"
        className="bg-[#F59E0B]/10 text-[#F59E0B] border-0 font-mono text-[10px] uppercase tracking-wider"
      >
        In Development
      </Badge>
    );
  }
  return (
    <Badge
      variant="secondary"
      className="bg-[#94A3B8]/10 text-[#94A3B8] border-0 font-mono text-[10px] uppercase tracking-wider"
    >
      Planned
    </Badge>
  );
}

interface FeatureSectionProps {
  category: FeatureCategory;
  index: number;
}

export function FeatureSection({ category, index }: FeatureSectionProps) {
  const isGrey = index % 2 === 1;
  const isGrid = index === 0 || index === 3;

  return (
    <section className={isGrey ? "bg-[#F5F7FA]" : "bg-white"}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-wider text-[#7FB5B0] mb-3">
            {category.title}
          </p>
        </ScrollReveal>

        {isGrid ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {category.features.map((feature, i) => {
              const Icon = iconMap[feature.icon];
              return (
                <ScrollReveal key={feature.name} delay={i * 0.1}>
                  <div
                    className={`rounded-xl p-7 h-full ${
                      isGrey
                        ? "bg-white border border-[#E5E9F0] shadow-sm"
                        : "bg-[#F5F7FA]"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#2B4C7E]/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                        {Icon && (
                          <Icon
                            className="w-5 h-5 text-[#2B4C7E]"
                            strokeWidth={1.5}
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="font-semibold text-[#1E293B]">
                            {feature.name}
                          </h3>
                          <StatusBadge status={feature.status} />
                        </div>
                        <p className="text-sm text-[#64748B] leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4 mt-8">
            {category.features.map((feature, i) => {
              const Icon = iconMap[feature.icon];
              return (
                <ScrollReveal key={feature.name} delay={i * 0.1}>
                  <div
                    className={`rounded-xl p-6 flex items-start gap-5 ${
                      isGrey
                        ? "bg-white border border-[#E5E9F0] shadow-sm"
                        : "bg-[#F5F7FA]"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#2B4C7E]/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {Icon && (
                        <Icon
                          className="w-5 h-5 text-[#2B4C7E]"
                          strokeWidth={1.5}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                        <h3 className="font-semibold text-[#1E293B]">
                          {feature.name}
                        </h3>
                        <StatusBadge status={feature.status} />
                      </div>
                      <p className="text-sm text-[#64748B] leading-relaxed max-w-2xl">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
