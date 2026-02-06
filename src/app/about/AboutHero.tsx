"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ExternalLink } from "lucide-react";

export function AboutHero() {
  return (
    <section className="bg-white pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-20">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-wider text-[#7FB5B0] mb-4">
            About
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E293B] leading-[1.1] mb-10">
            Built by Andre Wolke
          </h1>
        </ScrollReveal>

        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Andre's photo */}
          <ScrollReveal delay={0.1}>
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden flex-shrink-0">
              <Image
                src="/andre.jpg"
                alt="Andre Wolke"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 128px, 160px"
                priority
              />
            </div>
          </ScrollReveal>

          <div className="space-y-5 text-[#64748B] text-base leading-relaxed">
            <ScrollReveal delay={0.15}>
              <p>
                Electronic engineer by training, builder by nature. 30+ years
                in technology — started with hardware, built networks, designed
                enterprise systems, and never really stopped tinkering. Still
                3D-printing circuit boards for fun.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p>
                Spent the past decade and a half deep in blockchain — pioneered
                education programmes, introduced smart contract auditing early
                on, built liquidation infrastructure for crypto assets, and
                served as CTO across multiple ventures. Somewhere in there,
                a few genuine firsts happened quietly.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <p>
                Now building Betty. One person, working closely with AI,
                turning years of seeing how organizations lose knowledge into
                something that actually fixes it. No large team. No VC circus.
                Just real engineering and a problem worth solving.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="font-medium text-[#1E293B]">
                Build what should exist.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.35}>
              <div className="flex items-center gap-6 pt-2">
                <a
                  href="https://x.com/andrewolke"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#2B4C7E] hover:text-[#1E3A5F] font-medium inline-flex items-center gap-1.5 transition-colors"
                >
                  @andrewolke
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://linkedin.com/in/andrewolke"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#2B4C7E] hover:text-[#1E3A5F] font-medium inline-flex items-center gap-1.5 transition-colors"
                >
                  LinkedIn
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
