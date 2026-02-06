"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { ContactForm } from "@/components/ContactForm";
import { Mail, MapPin, Clock } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="bg-white py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left: info */}
          <div>
            <ScrollReveal>
              <p className="font-mono text-xs uppercase tracking-wider text-[#7FB5B0] mb-3">
                Contact
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-6">
                Get in touch
              </h2>
              <p className="text-[#64748B] leading-relaxed mb-8">
                Interested in Betty for your organization? We&rsquo;d love to
                understand your needs and show you what Betty can do.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <Mail
                    className="w-5 h-5 text-[#2B4C7E] mt-0.5"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p className="text-sm font-medium text-[#1E293B]">Email</p>
                    <a
                      href="mailto:hello@betty.swiss"
                      className="text-sm text-[#64748B] hover:text-[#2B4C7E] transition-colors"
                    >
                      hello@betty.swiss
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin
                    className="w-5 h-5 text-[#2B4C7E] mt-0.5"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p className="text-sm font-medium text-[#1E293B]">
                      Location
                    </p>
                    <p className="text-sm text-[#64748B]">Switzerland</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock
                    className="w-5 h-5 text-[#2B4C7E] mt-0.5"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p className="text-sm font-medium text-[#1E293B]">
                      Response Time
                    </p>
                    <p className="text-sm text-[#64748B]">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: form */}
          <ScrollReveal delay={0.15}>
            <ContactForm />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
