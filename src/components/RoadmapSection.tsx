"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { featureCategories, roadmapPlanned } from "@/data/features";
import { CheckCircle, Circle, Loader } from "lucide-react";

export function RoadmapSection() {
  const implemented = featureCategories
    .flatMap((c) => c.features)
    .filter((f) => f.status === "done");

  const inDev = featureCategories
    .flatMap((c) => c.features)
    .filter((f) => f.status === "in-dev");

  return (
    <section className="bg-[#F5F7FA] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="font-mono text-xs uppercase tracking-wider text-[#7FB5B0] mb-3">
              Roadmap
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B]">
              Where Betty is heading
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Implemented */}
          <ScrollReveal delay={0}>
            <div className="bg-white rounded-xl border border-[#E5E9F0] p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <CheckCircle
                  className="w-4 h-4 text-[#22C55E]"
                  strokeWidth={2}
                />
                <h3 className="font-semibold text-[#1E293B] text-sm">
                  Implemented
                </h3>
                <span className="font-mono text-xs text-[#94A3B8] ml-auto">
                  {implemented.length}
                </span>
              </div>
              <ul className="space-y-2.5">
                {implemented.map((f) => (
                  <li
                    key={f.name}
                    className="flex items-center gap-2 text-sm text-[#64748B]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] flex-shrink-0" />
                    {f.name}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* In Development */}
          <ScrollReveal delay={0.1}>
            <div className="bg-white rounded-xl border border-[#E5E9F0] p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <Loader
                  className="w-4 h-4 text-[#F59E0B]"
                  strokeWidth={2}
                />
                <h3 className="font-semibold text-[#1E293B] text-sm">
                  In Development
                </h3>
                <span className="font-mono text-xs text-[#94A3B8] ml-auto">
                  {inDev.length}
                </span>
              </div>
              <ul className="space-y-2.5">
                {inDev.map((f) => (
                  <li
                    key={f.name}
                    className="flex items-center gap-2 text-sm text-[#64748B]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] flex-shrink-0" />
                    {f.name}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Planned */}
          <ScrollReveal delay={0.2}>
            <div className="bg-white rounded-xl border border-[#E5E9F0] p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <Circle
                  className="w-4 h-4 text-[#94A3B8]"
                  strokeWidth={2}
                />
                <h3 className="font-semibold text-[#1E293B] text-sm">
                  Planned
                </h3>
                <span className="font-mono text-xs text-[#94A3B8] ml-auto">
                  {roadmapPlanned.length}
                </span>
              </div>
              <ul className="space-y-2.5">
                {roadmapPlanned.map((name) => (
                  <li
                    key={name}
                    className="flex items-center gap-2 text-sm text-[#64748B]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#94A3B8] flex-shrink-0" />
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
