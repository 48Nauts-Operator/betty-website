import { Metadata } from "next";
import { featureCategories } from "@/data/features";
import { FeatureSection } from "@/components/FeatureSection";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { RoadmapSection } from "@/components/RoadmapSection";
import { CTASection } from "@/components/CTASection";
import { ProductOverview } from "./ProductOverview";

export const metadata: Metadata = {
  title: "Product — Betty",
  description:
    "22 features across 4 categories. Intelligent routing, 4-database architecture, multi-agent orchestration, and enterprise-grade security.",
};

export default function ProductPage() {
  return (
    <>
      <ProductOverview />

      {featureCategories.map((category, index) => (
        <FeatureSection key={category.slug} category={category} index={index} />
      ))}

      <ArchitectureDiagram />
      <RoadmapSection />
      <CTASection />
    </>
  );
}
