"use client";

import { ScrollReveal } from "@/components/ScrollReveal";

export function ProductOverview() {
  return (
    <section className="bg-white pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-20">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-wider text-[#7FB5B0] mb-4">
            Product
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E293B] leading-[1.1] mb-8">
            The full picture
          </h1>
          <div className="space-y-5 text-[#64748B] text-lg leading-relaxed">
            <p>
              Betty replaces the patchwork of search tools, knowledge bases, and
              &ldquo;ask the expert&rdquo; workflows that most organizations depend on. She
              unifies everything your company knows — across databases, documents,
              conversations, and code — into a single intelligence layer that
              every employee can query.
            </p>
            <p>
              Built on a knowledge-first architecture, Betty checks her own
              47K+ item knowledge graph before ever calling an external LLM.
              The result: faster answers, lower costs, and complete data
              sovereignty. No cloud dependency. No data leaving your
              infrastructure.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
