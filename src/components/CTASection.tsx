"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { SwissFlag } from "@/components/SwissFlag";

export function CTASection() {
  return (
    <section className="bg-[#F5F7FA] py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-6">
            Ready to unify your organization&rsquo;s knowledge?
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button
              asChild
              size="lg"
              className="bg-[#3A8F85] hover:bg-[#2D7A71] text-white font-semibold px-8 h-12 rounded-lg text-base"
            >
              <Link href="/about#contact">Request a Demo</Link>
            </Button>
            <a
              href="mailto:hello@betty.swiss"
              className="text-[#64748B] hover:text-[#2B4C7E] transition-colors font-medium"
            >
              hello@betty.swiss
            </a>
          </div>

          <p className="text-sm text-[#94A3B8] font-mono tracking-wide inline-flex items-center justify-center gap-1.5">
            <SwissFlag size={13} /> Swiss-made &middot; Self-hosted &middot; GDPR compliant
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
