"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import type { UseCase } from "@/data/useCases";
import {
  Scale,
  Heart,
  Code,
  Zap,
  CheckCircle,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = { Scale, Heart, Code, Zap };

interface UseCaseDetailProps {
  useCase: UseCase;
  index: number;
}

export function UseCaseDetail({ useCase, index }: UseCaseDetailProps) {
  const isGrey = index % 2 === 1;
  const Icon = iconMap[useCase.icon];

  return (
    <section className={isGrey ? "bg-[#F5F7FA]" : "bg-white"}>
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#2B4C7E]/8 flex items-center justify-center">
              {Icon && (
                <Icon
                  className="w-5 h-5 text-[#2B4C7E]"
                  strokeWidth={1.5}
                />
              )}
            </div>
            <p className="font-mono text-xs uppercase tracking-wider text-[#7FB5B0]">
              {useCase.industry}
            </p>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B] mb-10">
            {useCase.headline}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-8">
            <ScrollReveal delay={0.1}>
              <div>
                <h3 className="font-semibold text-[#1E293B] text-sm uppercase tracking-wide mb-3">
                  The Problem
                </h3>
                <p className="text-[#64748B] leading-relaxed">
                  {useCase.problem}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div>
                <h3 className="font-semibold text-[#1E293B] text-sm uppercase tracking-wide mb-3">
                  Betty in Action
                </h3>
                <p className="text-[#64748B] leading-relaxed">
                  {useCase.scenario}
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="space-y-8">
            <ScrollReveal delay={0.15}>
              <div>
                <h3 className="font-semibold text-[#1E293B] text-sm uppercase tracking-wide mb-4">
                  Key Benefits
                </h3>
                <ul className="space-y-3">
                  {useCase.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle
                        className="w-4 h-4 text-[#3A8F85] mt-0.5 flex-shrink-0"
                        strokeWidth={2}
                      />
                      <span className="text-sm text-[#64748B] leading-relaxed">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <div
                className={`rounded-xl p-5 ${
                  isGrey ? "bg-white" : "bg-[#F5F7FA]"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck
                    className="w-4 h-4 text-[#2B4C7E]"
                    strokeWidth={1.5}
                  />
                  <h3 className="font-semibold text-[#1E293B] text-sm">
                    Privacy & Compliance
                  </h3>
                </div>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  {useCase.tech}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
