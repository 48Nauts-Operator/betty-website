"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Scale, Heart, Code, Zap, ArrowRight, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = { Scale, Heart, Code, Zap };

const previews = [
  {
    icon: "Scale",
    industry: "Legal",
    description: "Every precedent. Every clause. Instantly accessible.",
  },
  {
    icon: "Heart",
    industry: "Medical",
    description: "Patient context without the compliance risk.",
  },
  {
    icon: "Code",
    industry: "Software",
    description: "The decision from six months ago — and why.",
  },
  {
    icon: "Zap",
    industry: "Field Service",
    description: "The repair manual that already exists — found instantly.",
  },
];

export function UseCasePreview() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="font-mono text-xs uppercase tracking-wider text-[#7FB5B0] mb-3">
              Use Cases
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B]">
              Built for industries that can&rsquo;t afford to forget
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {previews.map((preview, i) => {
            const Icon = iconMap[preview.icon];
            return (
              <ScrollReveal key={preview.industry} delay={i * 0.1}>
                <div className="bg-[#F5F7FA] rounded-xl p-8 hover:bg-[#F0F4FF] transition-colors duration-300">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center mb-5">
                    <Icon
                      className="w-5 h-5 text-[#2B4C7E]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="font-semibold text-[#1E293B] text-lg mb-2">
                    {preview.industry}
                  </h3>
                  <p className="text-[#64748B] text-[15px] leading-relaxed">
                    {preview.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal>
          <div className="mt-10 text-center">
            <Link
              href="/use-cases"
              className="inline-flex items-center text-[#2B4C7E] font-medium hover:text-[#1E3A5F] transition-colors"
            >
              See All Use Cases
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
