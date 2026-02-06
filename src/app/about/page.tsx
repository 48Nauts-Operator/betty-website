import { Metadata } from "next";
import { AboutHero } from "./AboutHero";
import { WhyBettyName } from "./WhyBettyName";
import { WhyBettyExists } from "./WhyBettyExists";
import { ContactSection } from "./ContactSection";

export const metadata: Metadata = {
  title: "About — Betty",
  description:
    "Built by Andre Wolke. 30+ years in technology. Engineer, builder, problem solver. One person building what should exist.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <WhyBettyName />
      <WhyBettyExists />
      <ContactSection />
    </>
  );
}
