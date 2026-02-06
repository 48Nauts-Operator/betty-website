import Link from "next/link";
import { SwissFlag } from "@/components/SwissFlag";

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#E5E9F0]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand column */}
          <div>
            <Link href="/" className="flex items-center gap-0.5 mb-3">
              <span className="text-lg font-bold text-[#2B4C7E] tracking-tight">
                Betty
              </span>
              <span className="text-[#7FB5B0] text-lg leading-none translate-y-[1px]">
                .
              </span>
            </Link>
            <p className="text-sm text-[#64748B] leading-relaxed max-w-[240px]">
              Organizational Intelligence.
              <br />
              <span className="inline-flex items-center gap-1"><SwissFlag size={12} /> Swiss-made.</span> Self-hosted. Private.
            </p>
          </div>

          {/* Product column */}
          <div>
            <h4 className="font-semibold text-[#1E293B] text-sm mb-4">
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/product"
                  className="text-sm text-[#64748B] hover:text-[#2B4C7E] transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/use-cases"
                  className="text-sm text-[#64748B] hover:text-[#2B4C7E] transition-colors"
                >
                  Use Cases
                </Link>
              </li>
              <li>
                <Link
                  href="/technology"
                  className="text-sm text-[#64748B] hover:text-[#2B4C7E] transition-colors"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-[#64748B] hover:text-[#2B4C7E] transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect column */}
          <div>
            <h4 className="font-semibold text-[#1E293B] text-sm mb-4">
              Connect
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@betty.swiss"
                  className="text-sm text-[#64748B] hover:text-[#2B4C7E] transition-colors"
                >
                  hello@betty.swiss
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/andrewolke"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#64748B] hover:text-[#2B4C7E] transition-colors"
                >
                  @andrewolke
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/andrewolke"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#64748B] hover:text-[#2B4C7E] transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[#E5E9F0] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#94A3B8]">
            &copy; {new Date().getFullYear()} Betty &middot; <span className="inline-flex items-center gap-1"><SwissFlag size={11} /> Swiss-made</span>
          </p>
          <Link
            href="/privacy"
            className="text-xs text-[#94A3B8] hover:text-[#64748B] transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
