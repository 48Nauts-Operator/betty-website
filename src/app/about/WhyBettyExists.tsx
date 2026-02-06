"use client";

import { ScrollReveal } from "@/components/ScrollReveal";

export function WhyBettyExists() {
  return (
    <section className="bg-[#F5F7FA] py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-20">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-wider text-[#7FB5B0] mb-3">
            Mission
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-8">
            Why Betty exists
          </h2>
        </ScrollReveal>

        <div className="space-y-5 text-[#64748B] text-lg leading-relaxed">
          <ScrollReveal delay={0.1}>
            <p>
              Organizations lose knowledge every day. People leave, context
              disappears, mistakes repeat. The same problems get solved
              again and again because nobody remembers — or can find — the
              solution from last time.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p>
              The best companies in the world can&rsquo;t answer a simple
              question: &ldquo;What do we collectively know?&rdquo; Their knowledge is
              trapped in email threads, Slack messages, documents nobody can
              find, and the heads of people who might leave tomorrow.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-[#1E293B] font-medium">
              Betty makes institutional amnesia impossible. Every insight,
              every decision, every lesson learned — preserved, connected,
              and available to everyone who needs it. Not as a static
              archive, but as an active intelligence that intervenes before
              you repeat a mistake or miss a connection.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
