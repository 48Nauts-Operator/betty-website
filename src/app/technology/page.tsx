import { Metadata } from "next";
import { SecurityStack } from "@/components/SecurityStack";
import { CTASection } from "@/components/CTASection";
import { TechPhilosophy } from "./TechPhilosophy";
import { ResearchSection } from "./ResearchSection";

export const metadata: Metadata = {
  title: "Technology — Betty",
  description:
    "How we keep your data safe. TEEs, Confidential Computing, Swiss data centers, and a knowledge-first architecture.",
};

export default function TechnologyPage() {
  return (
    <>
      <TechPhilosophy />

      <section className="bg-[#F5F7FA] py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-16">
            <p className="font-mono text-xs uppercase tracking-wider text-[#7FB5B0] mb-3">
              Security Stack
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B]">
              Privacy & security at every layer
            </h2>
            <p className="mt-4 text-lg text-[#64748B] max-w-xl mx-auto">
              Six layers of protection, from hardware to policy. Not a
              checkbox exercise — an architecture.
            </p>
          </div>
          <SecurityStack />
        </div>
      </section>

      <ResearchSection />
      <CTASection />
    </>
  );
}
