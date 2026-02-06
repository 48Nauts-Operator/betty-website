import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Betty",
  description: "Betty privacy policy. How we handle your data.",
};

export default function PrivacyPage() {
  return (
    <section className="bg-white pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-20">
        <p className="font-mono text-xs uppercase tracking-wider text-[#7FB5B0] mb-4">
          Legal
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1E293B] leading-[1.1] mb-10">
          Privacy Policy
        </h1>

        <div className="space-y-8 text-[#64748B] leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold text-[#1E293B] mb-3">
              What We Collect
            </h2>
            <p>
              We collect only the information you provide through our contact
              form: your name, email address, company name, and message. We do
              not use tracking cookies, analytics scripts, or third-party data
              collection tools on this website.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#1E293B] mb-3">
              How We Use It
            </h2>
            <p>
              Contact form submissions are used solely to respond to your
              inquiry and to understand whether Betty is a good fit for your
              organization. We do not sell, share, or distribute your
              information to third parties.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#1E293B] mb-3">
              Data Storage
            </h2>
            <p>
              All data is stored in Switzerland, subject to Swiss data
              protection law (nDSG) and compliant with the EU General Data
              Protection Regulation (GDPR). We retain contact form data only
              as long as necessary to fulfill the purpose for which it was
              collected.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#1E293B] mb-3">
              Your Rights (GDPR)
            </h2>
            <p>You have the right to:</p>
            <ul className="mt-3 space-y-2 ml-5">
              <li className="list-disc">
                Access the personal data we hold about you
              </li>
              <li className="list-disc">
                Request correction of inaccurate data
              </li>
              <li className="list-disc">Request deletion of your data</li>
              <li className="list-disc">
                Object to or restrict processing of your data
              </li>
              <li className="list-disc">
                Request data portability
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#1E293B] mb-3">
              Betty Product Privacy
            </h2>
            <p>
              Betty, the product, is self-hosted within your organization&rsquo;s
              infrastructure. We have no access to your organizational data.
              Betty processes data locally using Trusted Execution Environments
              and Confidential Computing. No data leaves your infrastructure
              during normal operation.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#1E293B] mb-3">
              Contact
            </h2>
            <p>
              For any privacy-related questions or to exercise your rights,
              contact us at{" "}
              <a
                href="mailto:hello@betty.swiss"
                className="text-[#2B4C7E] hover:text-[#1E3A5F] font-medium transition-colors"
              >
                hello@betty.swiss
              </a>
              .
            </p>
          </div>

          <div className="pt-4 border-t border-[#E5E9F0]">
            <p className="text-sm text-[#94A3B8]">
              Last updated: February 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
