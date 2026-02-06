"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { KnowledgeField } from "@/components/KnowledgeField";

export function ComingSoon() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }
    
    // For now, just simulate success
    // TODO: Connect to actual email service (Mailchimp, ConvertKit, etc.)
    console.log("Subscribe:", email);
    setSubmitted(true);
    setError("");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <KnowledgeField />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="flex items-center gap-3">
            <svg
              width="48"
              height="48"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 4C12 4 8 10 8 16C8 22 12 26 16 28V36H24V28C28 26 32 22 32 16C32 10 28 4 20 4Z"
                fill="#3A8F85"
                fillOpacity="0.2"
              />
              <path
                d="M20 8C14 8 11 12 11 16C11 20 14 23 17 24.5V32H23V24.5C26 23 29 20 29 16C29 12 26 8 20 8Z"
                stroke="#3A8F85"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="20" cy="16" r="4" fill="#3A8F85" />
            </svg>
            <span className="text-3xl font-bold text-white">
              Betty<span className="text-[#3A8F85]">.</span>
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-bold text-white text-center mb-4"
        >
          Something{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A8F85] to-[#7FB5B0]">
            intelligent
          </span>{" "}
          is coming
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl text-[#94A3B8] text-center max-w-xl mb-12"
        >
          Your AI-powered knowledge assistant that answers instantly from your
          own data — without sending everything to the cloud.
        </motion.p>

        {/* Subscribe form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-[#64748B] focus:outline-none focus:border-[#3A8F85] focus:ring-1 focus:ring-[#3A8F85] transition-all"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-[#3A8F85] text-white font-semibold hover:bg-[#2D7A70] transition-colors whitespace-nowrap"
              >
                Notify Me
              </button>
            </form>
          ) : (
            <div className="text-center py-4 px-6 rounded-lg bg-[#3A8F85]/20 border border-[#3A8F85]/30">
              <p className="text-[#7FB5B0] font-medium">
                ✓ You&apos;re on the list! We&apos;ll notify you when Betty launches.
              </p>
            </div>
          )}
          {error && (
            <p className="mt-2 text-sm text-red-400 text-center">{error}</p>
          )}
        </motion.div>

        {/* Features preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 flex flex-wrap justify-center gap-6 text-sm text-[#64748B]"
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3A8F85]" />
            Knowledge-first AI
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3A8F85]" />
            Local-first privacy
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3A8F85]" />
            50ms responses
          </span>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-0 right-0 text-center text-sm text-[#475569]">
        © 2026 Betty AI · A{" "}
        <a
          href="https://21nauts.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#3A8F85] hover:underline"
        >
          21nauts
        </a>{" "}
        product
      </div>
    </div>
  );
}
