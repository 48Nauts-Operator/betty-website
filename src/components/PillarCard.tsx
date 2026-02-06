"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { Database, Brain, Shield, type LucideIcon } from "lucide-react";

interface Pillar {
  icon: LucideIcon;
  title: string;
  description: string;
  featured?: boolean;
}

const pillars: Pillar[] = [
  {
    icon: Database,
    title: "Unified Knowledge",
    description:
      "Every employee gets access to everything the company knows. No silos. No \"ask Dave in accounting.\" One source of truth across every database, division, and country.",
  },
  {
    icon: Brain,
    title: "Active Intelligence",
    description:
      "Betty works for you. Research, drafting, analysis — she catches mistakes before they happen and surfaces insights you didn't know to ask for. Not a search engine. An active partner.",
    featured: true,
  },
  {
    icon: Shield,
    title: "100% Private",
    description:
      "Self-hosted. Trusted Execution Environments. Swiss data centers. Your data never leaves your infrastructure. Not a policy — an architecture.",
  },
];

export function PillarCards() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="font-mono text-xs uppercase tracking-wider text-[#7FB5B0] mb-3">
              Why Betty
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B]">
              Three pillars of organizational intelligence
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
          {pillars.map((pillar, i) => (
            <ScrollReveal key={pillar.title} delay={i * 0.12}>
              <div
                className={`rounded-xl border border-[#E5E9F0] p-8 shadow-sm hover:shadow-md transition-shadow duration-300 ${
                  pillar.featured
                    ? "bg-white md:scale-105 md:-mt-2 md:mb-[-8px] md:py-10 ring-1 ring-[#2B4C7E]/10"
                    : "bg-white"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${
                    pillar.featured
                      ? "bg-[#2B4C7E]/10"
                      : "bg-[#F5F7FA]"
                  }`}
                >
                  <pillar.icon
                    className={`w-6 h-6 ${
                      pillar.featured
                        ? "text-[#2B4C7E]"
                        : "text-[#3D6098]"
                    }`}
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-xl font-semibold text-[#1E293B] mb-3">
                  {pillar.title}
                </h3>
                <p className="text-[#64748B] leading-relaxed text-[15px]">
                  {pillar.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
