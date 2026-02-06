"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { KnowledgeField } from "@/components/KnowledgeField";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white pt-16 overflow-hidden">
      {/* Living knowledge graph background */}
      <KnowledgeField />

      {/* Content — sits above the canvas */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#1E293B] leading-[1.1] tracking-tight"
        >
          Your organization&rsquo;s knowledge.
          <br />
          <span className="text-[#2B4C7E]">
            Always accessible. Always private.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="mt-8 text-lg md:text-xl text-[#64748B] leading-relaxed max-w-2xl mx-auto"
        >
          Betty unifies your company&rsquo;s entire knowledge and makes it
          available to every employee — from the field to the boardroom.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            asChild
            size="lg"
            className="bg-[#3A8F85] hover:bg-[#2D7A71] text-white font-semibold px-8 h-12 rounded-lg text-base"
          >
            <Link href="/about#contact">Request a Demo</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-[#2B4C7E] text-[#2B4C7E] hover:bg-[#2B4C7E] hover:text-white font-semibold px-8 h-12 rounded-lg text-base bg-white/80 backdrop-blur-sm"
          >
            <a href="#metrics">
              Learn More <ArrowDown className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Bottom fade line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E5E9F0] to-transparent z-10" />
    </section>
  );
}
