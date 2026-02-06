import { Metadata } from "next";
import { useCases } from "@/data/useCases";
import { UseCaseDetail } from "./UseCaseDetail";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Use Cases — Betty",
  description:
    "How Betty works for legal, medical, software, and field service organizations. Real scenarios, real value.",
};

export default function UseCasesPage() {
  return (
    <>
      <section className="bg-white pt-32 pb-8 md:pt-40 md:pb-12">
        <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-20">
          <p className="font-mono text-xs uppercase tracking-wider text-[#7FB5B0] mb-4">
            Use Cases
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E293B] leading-[1.1] mb-6">
            How Betty works for you
          </h1>
          <p className="text-lg text-[#64748B] leading-relaxed">
            Betty adapts to the way your industry thinks, works, and
            complies. Here&rsquo;s what that looks like in practice.
          </p>
        </div>
      </section>

      {useCases.map((useCase, i) => (
        <UseCaseDetail key={useCase.industry} useCase={useCase} index={i} />
      ))}

      <CTASection />
    </>
  );
}
