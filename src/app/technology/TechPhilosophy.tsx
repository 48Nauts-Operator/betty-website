"use client";

import { ScrollReveal } from "@/components/ScrollReveal";

export function TechPhilosophy() {
  return (
    <section className="bg-white pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-20">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-wider text-[#7FB5B0] mb-4">
            Technology
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E293B] leading-[1.1] mb-10">
            How we keep your data safe
          </h1>
        </ScrollReveal>

        <div className="space-y-6 text-[#64748B] text-lg leading-relaxed">
          <ScrollReveal delay={0.1}>
            <p>
              <strong className="text-[#1E293B]">Knowledge-first routing.</strong>{" "}
              Betty checks her own knowledge graph before ever calling an
              external LLM. 35–40% of queries are answered directly from
              internal knowledge — faster, cheaper, and with zero data
              exposure. When an LLM is needed, Betty includes full context so
              the model can give a precise answer without fishing for
              information.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p>
              <strong className="text-[#1E293B]">
                Privacy by architecture, not by policy.
              </strong>{" "}
              Most enterprise AI products promise data privacy through
              policies and contracts. Betty delivers it through engineering.
              Trusted Execution Environments, hardware-level isolation,
              encryption during processing — these aren&rsquo;t features we added
              after the fact. They&rsquo;re how the system was designed from day
              one.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p>
              <strong className="text-[#1E293B]">
                Why self-hosted matters.
              </strong>{" "}
              Your data, your infrastructure, your control. Betty runs
              entirely within your environment — Swiss data centers, your own
              servers, or private cloud. There are no calls to external
              endpoints. No data exfiltration vectors. No shared tenancy.
              When we say private, we mean it architecturally.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <p>
              <strong className="text-[#1E293B]">LLM transparency.</strong>{" "}
              Full disclosure of which models run, where they run, and
              exactly what data they see. No black boxes. No hidden
              third-party calls. Every LLM interaction is logged, auditable,
              and fully within your control.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
