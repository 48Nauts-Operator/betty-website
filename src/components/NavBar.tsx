"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BettyIcon } from "@/components/BettyLogo";

const navLinks = [
  { href: "/product", label: "Product" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "/technology", label: "Technology" },
  { href: "/about", label: "About" },
];

export function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E5E9F0]">
      <nav className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <BettyIcon size={24} className="text-[#2B4C7E]" />
          <span className="text-xl font-bold text-[#2B4C7E] tracking-tight">
            Betty
          </span>
          <span className="text-[#7FB5B0] text-xl leading-none translate-y-[1px] -ml-1.5">
            .
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors duration-200",
                pathname === link.href
                  ? "text-[#2B4C7E] border-b-2 border-[#2B4C7E] pb-0.5"
                  : "text-[#64748B] hover:text-[#2B4C7E]"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button
            asChild
            className="bg-[#3A8F85] hover:bg-[#2D7A71] text-white font-semibold px-6 h-9 rounded-lg"
          >
            <Link href="/about#contact">Contact</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#2B4C7E] p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-[#E5E9F0] px-6 pb-6 pt-2">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "text-base font-medium py-2 transition-colors",
                  pathname === link.href
                    ? "text-[#2B4C7E]"
                    : "text-[#64748B] hover:text-[#2B4C7E]"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              className="bg-[#3A8F85] hover:bg-[#2D7A71] text-white font-semibold mt-2 h-11 rounded-lg"
            >
              <Link href="/about#contact" onClick={() => setMobileOpen(false)}>
                Contact
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
