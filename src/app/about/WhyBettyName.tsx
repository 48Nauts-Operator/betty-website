"use client";

import { ScrollReveal } from "@/components/ScrollReveal";

export function WhyBettyName() {
  return (
    <section className="bg-white py-16 md:py-20 border-b border-[#E5E9F0]">
      <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-20">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-wider text-[#7FB5B0] mb-3">
            The Name
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B] mb-6">
            Why &ldquo;Betty&rdquo;?
          </h2>
        </ScrollReveal>

        <div className="space-y-4 text-[#64748B] text-base leading-relaxed">
          <ScrollReveal delay={0.1}>
            <p>
              Betty is named after{" "}
              <strong className="text-[#1E293B]">Betty Skelton</strong>{" "}
              (1926–2011) — the &ldquo;First Lady of Firsts.&rdquo;
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p>
              She set aviation records that stood for decades. She was the
              first woman to undergo NASA astronaut testing. She broke land
              speed records at Bonneville. She earned more automotive and
              aviation world records than any woman in history.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p>
              Betty Skelton didn&rsquo;t wait for permission. She didn&rsquo;t
              wait for the industry to be ready for her. She built her own
              path.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <p className="text-[#1E293B] font-medium">
              That&rsquo;s the spirit behind this project: don&rsquo;t wait for
              permission. Build what should exist.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
