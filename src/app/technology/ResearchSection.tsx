"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { FileText } from "lucide-react";

export function ResearchSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-wider text-[#7FB5B0] mb-3">
            Research
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-6">
            Research & Publications
          </h2>
          <p className="text-lg text-[#64748B] leading-relaxed mb-10 max-w-2xl">
            Research papers on TEEs, Confidential Computing, and
            privacy-first AI architecture — coming soon.
          </p>
        </ScrollReveal>

        <div className="space-y-4">
          <ScrollReveal delay={0.1}>
            <div className="rounded-xl border border-dashed border-[#D1D9E6] p-6 flex items-start gap-4">
              <FileText
                className="w-5 h-5 text-[#94A3B8] mt-0.5 flex-shrink-0"
                strokeWidth={1.5}
              />
              <div>
                <h3 className="font-medium text-[#94A3B8] mb-1">
                  Privacy-First Knowledge Routing in Enterprise AI Systems
                </h3>
                <p className="font-mono text-xs text-[#94A3B8]">
                  Coming 2026
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="rounded-xl border border-dashed border-[#D1D9E6] p-6 flex items-start gap-4">
              <FileText
                className="w-5 h-5 text-[#94A3B8] mt-0.5 flex-shrink-0"
                strokeWidth={1.5}
              />
              <div>
                <h3 className="font-medium text-[#94A3B8] mb-1">
                  Trusted Execution Environments for Organizational
                  Intelligence
                </h3>
                <p className="font-mono text-xs text-[#94A3B8]">
                  Coming 2026
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
