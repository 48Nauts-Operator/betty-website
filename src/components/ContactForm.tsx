"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, CheckCircle } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-12 h-12 text-[#3A8F85] mx-auto mb-4" strokeWidth={1.5} />
        <h3 className="text-xl font-semibold text-[#1E293B] mb-2">
          Message sent
        </h3>
        <p className="text-[#64748B]">
          We respond within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="space-y-6 max-w-lg mx-auto"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm text-[#1E293B]">
            Name
          </Label>
          <Input
            id="name"
            required
            placeholder="Your name"
            className="h-11 border-[#E5E9F0] focus:border-[#2B4C7E] focus:ring-[#2B4C7E]/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm text-[#1E293B]">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            required
            placeholder="you@company.com"
            className="h-11 border-[#E5E9F0] focus:border-[#2B4C7E] focus:ring-[#2B4C7E]/20"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="company" className="text-sm text-[#1E293B]">
          Company
        </Label>
        <Input
          id="company"
          placeholder="Company name"
          className="h-11 border-[#E5E9F0] focus:border-[#2B4C7E] focus:ring-[#2B4C7E]/20"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message" className="text-sm text-[#1E293B]">
          Message
        </Label>
        <Textarea
          id="message"
          required
          rows={5}
          placeholder="Tell us about your organization and what you're looking for..."
          className="border-[#E5E9F0] focus:border-[#2B4C7E] focus:ring-[#2B4C7E]/20 resize-none"
        />
      </div>
      <Button
        type="submit"
        className="bg-[#3A8F85] hover:bg-[#2D7A71] text-white font-semibold px-8 h-11 rounded-lg w-full sm:w-auto"
      >
        Send Message
        <Send className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
}
